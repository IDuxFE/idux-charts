import { graphic, registerPostUpdate } from 'echarts/core'
import type { ElementEvent } from 'echarts/core'
import type { Box, CloudNode } from './layout'
import type { WordCloudSeries, WordCloudSettings } from './types'

type MotionAPI = Parameters<Parameters<typeof registerPostUpdate>[0]>[1]
type MotionView = ReturnType<MotionAPI['getViewOfSeriesModel']>
type MotionSeries = Parameters<MotionAPI['getViewOfSeriesModel']>[0]
type MotionPath = ReturnType<InstanceType<typeof graphic.Group>['childAt']>

export function motionAmplitude(settings: WordCloudSettings, value: number) {
  if (!settings.motion?.amplitudeRatio.some(ratio => ratio > 0)) return 0
  const weight =
    settings.max === settings.min
      ? 0.5
      : Math.max(0, Math.min(1, (value - settings.min) / (settings.max - settings.min)))
  return (settings.motion?.amplitude ?? 0) * (1 - weight * 0.3)
}

/** Overlap permits free motion; reserve only viewport space in that mode. */
export function reserveMotion(node: CloudNode, amplitude: number, allowOverlap = false): CloudNode {
  if (!amplitude) return node
  const expand = (box: Box): Box => ({
    x: box.x - amplitude,
    y: box.y - amplitude,
    width: box.width + amplitude * 2,
    height: box.height + amplitude * 2,
  })
  if (allowOverlap) return { ...node, viewportBounds: expand(node.bounds) }
  return {
    ...node,
    overlapArea: node.body.width * node.body.height,
    body: expand(node.body),
    bounds: expand(node.bounds),
    labels: node.labels.map(expand),
  }
}

function wordHash(id: string) {
  let hash = 2166136261
  for (let index = 0; index < id.length; index++)
    hash = Math.imul(hash ^ id.charCodeAt(index), 16777619)
  hash = Math.imul(hash ^ (hash >>> 16), 2246822507)
  hash = Math.imul(hash ^ (hash >>> 13), 3266489909)
  return (hash ^ (hash >>> 16)) >>> 0
}

/** Own only the symbol's offset. Graph owns its parent's layout position and scale. */
function createMotion(api: MotionAPI, view: MotionView) {
  const dom = api.getDom()
  const document = dom.ownerDocument
  const media = document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)')
  const entries = new Map<
    MotionPath,
    {
      animator: ReturnType<MotionPath['animate']>
      signature: string
    }
  >()
  let settings: WordCloudSettings | undefined
  const zr = api.getZr()
  let hoveredTarget: ElementEvent['target'] | undefined
  const isWordHovered = () => {
    let target = hoveredTarget
    while (target) {
      if (entries.has(target)) return true
      target = target.__hostTarget ?? target.parent
    }
    return false
  }

  const clear = () => {
    for (const [path] of entries) {
      path.stopAnimation('ix-word-cloud-motion')
      path.attr({ x: 0, y: 0 })
    }
    entries.clear()
    hoveredTarget = undefined
  }
  const pause = () => {
    if (media?.matches) {
      clear()
      return
    }
    const paused =
      document.hidden ||
      dom.getAttribute('aria-busy') === 'true' ||
      (isWordHovered() && settings?.motion?.pauseOnHover)
    for (const { animator } of entries.values()) {
      if (!animator.getClip()) continue
      if (paused) animator.pause()
      else animator.resume()
    }
    if (!paused && entries.size) api.getZr().wakeUp()
  }
  const move = (event: ElementEvent) => {
    hoveredTarget = event.target
    pause()
  }
  const leave = () => {
    hoveredTarget = undefined
    pause()
  }
  const reduced = () => {
    if (media?.matches) clear()
    else if (series) sync(series, seriesFiltered)
  }
  let seriesFiltered = false
  let series: MotionSeries | undefined
  const sync = (model: MotionSeries, filtered = false) => {
    series = model
    seriesFiltered = filtered
    settings = (model.option as WordCloudSeries).__ixWordCloud
    const motion = settings?.motion
    if (!motion || !motion.amplitude || filtered || !model.isAnimationEnabled() || media?.matches) {
      clear()
      return
    }
    const ratioScale = Math.max(...motion.amplitudeRatio)
    if (!ratioScale) {
      clear()
      return
    }
    const rx = motion.amplitudeRatio[0] / ratioScale
    const ry = motion.amplitudeRatio[1] / ratioScale
    const ratioLength = Math.hypot(rx, ry)
    const retained = new Set<MotionPath>()
    const data = model.getData()
    data.each(index => {
      const symbol = data.getItemGraphicEl(index) as InstanceType<typeof graphic.Group> | undefined
      // Native graph Symbol keeps its path (and attached label) as the first child.
      const path = symbol?.childAt(0) as MotionPath | undefined
      if (!path) return
      retained.add(path)
      const hash = wordHash(data.getId(index))
      const amplitude = motionAmplitude(settings!, Number(model.getRawValue(index)))
      // Normalize relative axis weights without exceeding the configured radius.
      const amplitudeX = (amplitude * rx) / ratioLength
      const amplitudeY = (amplitude * ry) / ratioLength
      const duration = motion.duration * (0.8 + (hash % 401) / 1000)
      const matrix = symbol!.getComputedTransform()
      const scaleX = matrix ? Math.hypot(matrix[0]!, matrix[1]!) : 1
      const scaleY = matrix ? Math.hypot(matrix[2]!, matrix[3]!) : 1
      if (!scaleX || !scaleY) return
      const signature = JSON.stringify([amplitudeX, amplitudeY, duration, scaleX, scaleY])
      const previous = entries.get(path)
      if (previous?.signature === signature && previous.animator.getClip()) return
      path.stopAnimation('ix-word-cloud-motion')
      const phase =
        previous && amplitudeX > 0 && amplitudeY > 0
          ? Math.atan2((path.y * scaleY) / amplitudeY, (path.x * scaleX) / amplitudeX)
          : (hash / 0x100000000) * Math.PI * 2
      const direction = hash % 2 ? 1 : -1
      const offset = (progress: number) => ({
        x: (Math.cos(phase + progress * Math.PI * 2 * direction) * amplitudeX) / scaleX,
        y: (Math.sin(phase + progress * Math.PI * 2 * direction) * amplitudeY) / scaleY,
      })
      path.attr(offset(0))
      const animator = path.animate('', true)
      animator.scope = 'ix-word-cloud-motion'
      // Small linear segments approximate a balanced orbit with a continuous loop seam.
      for (let step = 1; step <= 48; step++)
        animator.when((duration * step) / 48, offset(step / 48))
      animator.start('linear')
      entries.set(path, { animator, signature })
    })
    for (const [path] of entries) {
      if (retained.has(path)) continue
      path.stopAnimation('ix-word-cloud-motion')
      path.attr({ x: 0, y: 0 })
      entries.delete(path)
    }
    pause()
  }
  zr.on('mousemove', move)
  zr.on('globalout', leave)
  document.addEventListener('visibilitychange', pause)
  if (media?.addEventListener) media.addEventListener('change', reduced)
  else media?.addListener(reduced)
  const observer = new MutationObserver(pause)
  observer.observe(dom, { attributes: true, attributeFilter: ['aria-busy'] })

  // Graph's view lifetime also covers direct createWordCloudOption consumers.
  // Keep cleanup here instead of retaining chart instances in global DOM listeners.
  const dispose = view.dispose
  view.dispose = function (...args) {
    clear()
    observer.disconnect()
    zr.off('mousemove', move)
    zr.off('globalout', leave)
    document.removeEventListener('visibilitychange', pause)
    if (media?.removeEventListener) media.removeEventListener('change', reduced)
    else media?.removeListener(reduced)
    dispose.apply(this, args)
  }
  const remove = view.remove
  view.remove = function (...args) {
    clear()
    remove.apply(this, args)
  }
  return { sync }
}

export function installWordCloudMotion() {
  const controllers = new WeakMap<MotionView, ReturnType<typeof createMotion>>()
  registerPostUpdate((ecModel, api) => {
    if (api.isSSR() || !api.getDom()) return
    ecModel.eachRawSeriesByType('graph', model => {
      const view = api.getViewOfSeriesModel(model)
      let controller = controllers.get(view)
      if (!controller && (model.option as WordCloudSeries).__ixWordCloud?.motion) {
        controller = createMotion(api, view)
        controllers.set(view, controller)
      }
      controller?.sync(model, ecModel.isSeriesFiltered(model))
    })
  })
}
