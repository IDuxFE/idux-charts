import { graphic, type EChartsType } from 'echarts/core'

export type MapTransitionDirection = 'drilldown' | 'back'
export interface MapTransitionOptions {
  /** Duration of each phase in milliseconds. Defaults to 480; reduced motion skips both phases. */
  duration?: number
  /** Defaults to the chart background or the nearest non-transparent DOM background. */
  backgroundColor?: string
}
export interface MapTransition {
  /** Apply prepared map/data changes between native camera transitions. Await reactive rendering here. */
  run(direction: MapTransitionDirection, update: () => void | Promise<void>): Promise<boolean>
  /** Cancel the pending transition. An update that has already started is not rolled back. */
  cancel(): void
  /** Cancel and release resources; subsequent runs return false without calling update. */
  dispose(): void
}

type ChartOption = ReturnType<EChartsType['getOption']>
const animationFields = [
  'animation',
  'animationDurationUpdate',
  'animationEasingUpdate',
  'animationDelayUpdate',
] as const
type GeoViewport = { zoom?: number; center?: (number | string)[] | null } & Partial<
  Pick<ChartOption, (typeof animationFields)[number]>
>
type Cover = InstanceType<typeof graphic.Rect>
interface ActiveTransition {
  chart: EChartsType
  stopWaiting?: () => void
  removeCover?: () => void
  restoreAnimation?: () => void
  restoreViewport?: () => void
  cleanup?: Promise<void>
}

function firstGeo(chart: EChartsType) {
  return (chart.getOption().geo as GeoViewport[] | undefined)?.[0]
}

function backgroundColor(chart: EChartsType) {
  const visible = (color: unknown): color is string =>
    typeof color === 'string' && color !== 'transparent' && !/rgba\([^)]*,\s*0\s*\)$/.test(color)
  const background = chart.getOption().backgroundColor
  if (visible(background)) return background
  const win = chart.getDom().ownerDocument.defaultView
  for (let node: HTMLElement | null = chart.getDom(); node; node = node.parentElement) {
    const color = win?.getComputedStyle(node).backgroundColor
    if (visible(color)) return color
  }
  return '#FFFFFF'
}

/**
 * Transition the first geo without owning geometry, requests or application state.
 * Starting another run cancels the previous run. Load/register maps before calling run;
 * update only commits the prepared configuration and waits for the chart to render it.
 */
export function createMapTransition(
  getChart: () => EChartsType | undefined,
  options: MapTransitionOptions = {},
): MapTransition {
  let active: ActiveTransition | undefined
  let disposed = false
  let generation = 0
  let pendingCleanup: Promise<void> | undefined

  const current = (task: ActiveTransition) =>
    active === task && !task.chart.isDisposed() && getChart() === task.chart

  const restoreAnimation = (task: ActiveTransition) => {
    const restore = task.restoreAnimation
    task.restoreAnimation = undefined
    if (!task.chart.isDisposed()) restore?.()
  }
  const restoreViewport = (task: ActiveTransition) => {
    const restore = task.restoreViewport
    task.restoreViewport = undefined
    if (!task.chart.isDisposed()) restore?.()
  }
  const captureViewport = (task: ActiveTransition) => {
    const geo = firstGeo(task.chart)
    const viewport = { zoom: geo?.zoom ?? 1, center: geo?.center?.slice() ?? geo?.center }
    task.restoreViewport = () =>
      task.chart.setOption({ animation: false, geo: { animation: false, ...viewport } })
  }
  const cleanup = (task: ActiveTransition): Promise<void> => {
    if (task.cleanup) return task.cleanup
    // Detach before native callbacks can synchronously cancel or start another run.
    active = undefined
    task.stopWaiting?.()
    // Native finished/rendered callbacks can run inside setOption. Restore on the
    // next microtask, and make newer runs await it before capturing their state.
    task.cleanup = Promise.resolve().then(() => {
      try {
        restoreViewport(task)
      } finally {
        try {
          restoreAnimation(task)
        } finally {
          const remove = task.removeCover
          task.removeCover = undefined
          remove?.()
        }
      }
    })
    const settled = () => {
      pendingCleanup = undefined
    }
    pendingCleanup = task.cleanup.then(settled, settled)
    return task.cleanup
  }
  const cancel = () => {
    generation++
    if (!active) return
    const task = active
    void cleanup(task)
  }

  // Keep the caller's animation settings for each side of the map change. The update
  // may replace these settings, so capture again before the incoming phase.
  const captureAnimation = (task: ActiveTransition) => {
    const option = task.chart.getOption()
    const geo = firstGeo(task.chart)
    const animation = Object.fromEntries(animationFields.map(field => [field, option[field]]))
    const geoAnimation = Object.fromEntries(animationFields.map(field => [field, geo?.[field]]))
    task.restoreAnimation = () => task.chart.setOption({ ...animation, geo: geoAnimation })
  }
  const animate = (task: ActiveTransition, zoom: number, duration: number) =>
    new Promise<void>((resolve, reject) => {
      const chart = task.chart
      const release = () => {
        clearTimeout(timer)
        chart.off('finished', finish)
        if (task.stopWaiting === finish) task.stopWaiting = undefined
      }
      const finish = () => {
        release()
        resolve()
      }
      const timer = setTimeout(finish, duration + 80)
      task.stopWaiting = finish
      chart.on('finished', finish)
      try {
        const animation = {
          animation: true,
          animationDurationUpdate: duration,
          animationDelayUpdate: 0,
          animationEasingUpdate: 'cubicOut' as const,
        }
        chart.setOption({ ...animation, geo: { ...animation, zoom } })
      } catch (cause) {
        release()
        reject(cause)
      }
    })

  return {
    async run(direction, update) {
      cancel()
      const id = generation
      if (pendingCleanup) await pendingCleanup
      if (disposed || id !== generation) return false
      const chart = getChart()
      if (chart?.isDisposed()) return false
      // Initial mounting and callers without a geo still commit their prepared state.
      if (!chart || !firstGeo(chart)) {
        await update()
        return !disposed && id === generation
      }
      const task: ActiveTransition = { chart }
      active = task
      let completed = false
      try {
        const option: ChartOption = chart.getOption()
        const dom = chart.getDom()
        const win = dom?.ownerDocument.defaultView
        const reduced = win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        const requestedDuration = options.duration ?? 480
        const duration =
          !dom || reduced || option.animation === false || firstGeo(chart)?.animation === false
            ? 0
            : Math.max(0, Number.isFinite(requestedDuration) ? requestedDuration : 480)
        if (duration > 0) {
          captureAnimation(task)
          captureViewport(task)
          const zr = chart.getZr()
          const cover: Cover = new graphic.Rect({
            shape: { x: 0, y: 0, width: chart.getWidth(), height: chart.getHeight() },
            style: { fill: options.backgroundColor ?? backgroundColor(chart), opacity: 0 },
            silent: true,
            z: 100000,
            zlevel:
              zr.storage.getDisplayList().reduce((max, item) => Math.max(max, item.zlevel), 0) + 1,
          })
          const resize = () => {
            const width = chart.getWidth(),
              height = chart.getHeight()
            if (cover.shape.width !== width || cover.shape.height !== height)
              cover.attr({ shape: { width, height } })
          }
          chart.on('rendered', resize)
          task.removeCover = () => {
            chart.off('rendered', resize)
            cover.stopAnimation()
            if (!chart.isDisposed()) zr.remove(cover)
          }
          zr.add(cover)
          cover.animateTo({ style: { opacity: 1 } }, { duration, easing: 'cubicInOut' })
          await animate(
            task,
            (firstGeo(chart)?.zoom ?? 1) * (direction === 'back' ? 0.82 : 1.35),
            duration,
          )
          if (!current(task)) return false
          restoreViewport(task)
          if (!current(task)) return false
          restoreAnimation(task)
          if (!current(task)) return false

          await update()
          if (!current(task)) return false
          if (
            firstGeo(chart) &&
            chart.getOption().animation !== false &&
            firstGeo(chart)?.animation !== false
          ) {
            captureAnimation(task)
            captureViewport(task)
            const zoom = firstGeo(chart)?.zoom ?? 1
            chart.setOption({
              animation: false,
              geo: { animation: false, zoom: zoom * (direction === 'back' ? 1.06 : 0.94) },
            })
            if (!current(task)) return false
            zr.add(cover)
            cover.animateTo({ style: { opacity: 0 } }, { duration, easing: 'cubicOut' })
            await animate(task, zoom, duration)
          }
        } else {
          await update()
        }
        completed = current(task)
      } finally {
        await cleanup(task)
      }
      return completed && id === generation && !chart.isDisposed() && getChart() === chart
    },
    cancel,
    dispose() {
      disposed = true
      cancel()
    },
  }
}
