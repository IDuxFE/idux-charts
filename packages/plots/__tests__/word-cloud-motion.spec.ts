import { describe, expect, it, vi } from 'vitest'
import { graphic, init } from 'echarts/core'
import { createWordCloudOption } from '../word-cloud'
import type { WordCloudChartProps } from '../word-cloud'
import { cloudNodesCollide, layoutCloud } from '../word-cloud/src/layout'
import type { CloudNode } from '../word-cloud/src/layout'
import { reserveMotion } from '../word-cloud/src/motion'

function renderMotion(
  check: (
    chart: ReturnType<typeof init>,
    dom: HTMLElement,
    media: MediaQueryList,
  ) => void | Promise<void>,
  options: { mediaMode?: 'modern' | 'legacy' | 'none'; reduced?: boolean } = {},
) {
  const media = Object.assign(new EventTarget(), {
    matches: options.reduced ?? false,
  }) as unknown as MediaQueryList
  if (options.mediaMode === 'legacy') {
    Object.assign(media, {
      addEventListener: undefined,
      removeEventListener: undefined,
      addListener: vi.fn(listener =>
        EventTarget.prototype.addEventListener.call(media, 'change', listener),
      ),
      removeListener: vi.fn(listener =>
        EventTarget.prototype.removeEventListener.call(media, 'change', listener),
      ),
    })
  }
  vi.stubGlobal('matchMedia', options.mediaMode === 'none' ? undefined : () => media)
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const chart = init(dom, undefined, { renderer: 'svg', width: 640, height: 360 })
  const props: WordCloudChartProps = {
    motion: true,
    animationDuration: 0,
    animationDurationUpdate: 0,
    data: [
      { id: 'a', name: 'Analysis', value: 100 },
      { id: 'b', name: 'Experience', value: 30 },
    ],
  }
  chart.setOption(createWordCloudOption(props))
  return Promise.resolve()
    .then(() => check(chart, dom, media))
    .finally(() => {
      if (!chart.isDisposed()) chart.dispose()
      dom.remove()
      vi.unstubAllGlobals()
    })
}

const pathOf = (chart: ReturnType<typeof init>, index = 0) =>
  (chart as any).getModel().getSeriesByIndex(0).getData().getItemGraphicEl(index).childAt(0)
const animatorOf = (path: any) =>
  path.animators.find((animator: any) => animator.scope === 'ix-word-cloud-motion')

describe('word cloud motion', () => {
  it('moves the native symbol and attached label without changing layout; survives zero-duration updates', async () => {
    await renderMotion(chart => {
      const path = pathOf(chart)
      const parent = [path.parent.x, path.parent.y]
      const animator = animatorOf(path)
      const initial = [path.x, path.y]
      animator.getClip().onframe(0.25)
      expect([path.x, path.y]).not.toEqual(initial)
      expect([path.parent.x, path.parent.y]).toEqual(parent)
      expect(path.getTextContent()).toBeDefined()
      const offset = [path.x, path.y]
      chart.resize({ width: 500 })
      const next = animatorOf(pathOf(chart))
      expect(next.getLoop()).toBe(true)
      expect(next.getClip()).toBeTruthy()
      expect(pathOf(chart).x).toBeCloseTo(offset[0])
      expect(pathOf(chart).y).toBeCloseTo(offset[1])
      chart.setOption(
        createWordCloudOption({ motion: false, data: [{ id: 'a', name: 'Analysis', value: 80 }] }),
      )
      expect(animatorOf(pathOf(chart))).toBeUndefined()
      expect([pathOf(chart).x, pathOf(chart).y]).toEqual([0, 0])
    })
  })

  it('floats overlapping rects independently without spreading out their base layout', async () => {
    await renderMotion(chart => {
      const props: WordCloudChartProps = {
        shape: 'rect',
        symbolSize: [100, 40],
        overlap: 0.12,
        animationDuration: 0,
        animationDurationUpdate: 0,
        motion: { amplitude: 10, duration: 5000, pauseOnHover: false },
        data: Array.from({ length: 11 }, (_, index) => ({
          id: `event-${index}`,
          name: `Tag ${index}`,
          value: 1,
        })),
      }
      chart.setOption(createWordCloudOption(props))
      const data = (chart as any).getModel().getSeriesByIndex(0).getData()
      const positions = props.data!.map((_, index) => [...data.getItemLayout(index)])
      expect(
        positions.some((a, index) =>
          positions
            .slice(index + 1)
            .some(b => Math.abs(a[0] - b[0]) < 100 && Math.abs(a[1] - b[1]) < 40),
        ),
      ).toBe(true)
      const signatures = props.data!.map((_, index) => {
        const path = pathOf(chart, index)
        const animator = animatorOf(path)
        expect(animator.getMaxTime()).toBeGreaterThanOrEqual(4000)
        expect(animator.getMaxTime()).toBeLessThanOrEqual(6000)
        animator.getClip().onframe(0.25)
        return JSON.stringify([animator.getMaxTime(), path.x, path.y])
      })
      expect(new Set(signatures).size).toBe(props.data!.length)
      chart.setOption(createWordCloudOption({ ...props, motion: false }))
      const still = (chart as any).getModel().getSeriesByIndex(0).getData()
      expect(props.data!.map((_, index) => still.getItemLayout(index))).toEqual(positions)
    })
  })

  it('balances horizontal and vertical travel over a complete motion cycle', async () => {
    await renderMotion(chart => {
      for (let index = 0; index < 2; index++) {
        const path = pathOf(chart, index)
        const animator = animatorOf(path)
        const matrix = path.parent.getComputedTransform()
        const scaleX = matrix ? Math.hypot(matrix[0], matrix[1]) : 1
        const scaleY = matrix ? Math.hypot(matrix[2], matrix[3]) : 1
        const x: number[] = [],
          y: number[] = []
        for (let step = 0; step < 48; step++) {
          animator.getClip().onframe(step / 48)
          x.push(path.x * scaleX)
          y.push(path.y * scaleY)
          expect(Math.hypot(x[step]!, y[step]!)).toBeLessThanOrEqual(12)
        }
        expect(Math.max(...x) - Math.min(...x)).toBeCloseTo(Math.max(...y) - Math.min(...y), 3)
      }
    })
  })

  it.each([
    [2, 1],
    [1, 2],
    [1, 0],
    [0, 1],
    [0, 0],
  ] as [number, number][])('supports axis amplitude ratios [%s, %s]', async (xRatio, yRatio) => {
    await renderMotion(chart => {
      const props: WordCloudChartProps = {
        motion: { amplitude: 10, amplitudeRatio: [xRatio, yRatio] },
        animationDuration: 0,
        animationDurationUpdate: 0,
        data: [{ id: 'axis-test', name: 'Axis test', value: 1 }],
      }
      chart.setOption(createWordCloudOption(props))
      const path = pathOf(chart)
      const animator = animatorOf(path)
      if (xRatio === 0 && yRatio === 0) {
        expect(animator).toBeUndefined()
        expect([path.x, path.y]).toEqual([0, 0])
        return
      }
      const xs: number[] = [],
        ys: number[] = []
      for (let step = 0; step < 48; step++) {
        animator.getClip().onframe(step / 48)
        xs.push(path.x)
        ys.push(path.y)
        expect(Number.isFinite(path.x + path.y)).toBe(true)
        expect(Math.hypot(path.x, path.y)).toBeLessThanOrEqual(10)
      }
      const xTravel = Math.max(...xs) - Math.min(...xs)
      const yTravel = Math.max(...ys) - Math.min(...ys)
      if (!xRatio) expect(xTravel).toBe(0)
      else if (!yRatio) expect(yTravel).toBe(0)
      else expect(xTravel / yTravel).toBeCloseTo(xRatio / yRatio, 3)
      chart.setOption(
        createWordCloudOption({ ...props, motion: { amplitude: 10, amplitudeRatio: [1, 0] } }),
      )
      animatorOf(pathOf(chart)).getClip().onframe(0.5)
      expect(Number.isFinite(pathOf(chart).x)).toBe(true)
      expect(pathOf(chart).y).toBe(0)
    })
  })

  it('pauses in place on hover, loading and hidden pages, and resumes the same animation', async () => {
    await renderMotion(async (chart, dom) => {
      const path = pathOf(chart)
      const animator = animatorOf(path)
      animator.getClip().onframe(0.3)
      const position = [path.x, path.y]
      dom.dispatchEvent(new Event('pointerenter'))
      expect(animator.isPaused()).toBe(false)
      const zr = chart.getZr()
      zr.trigger('mousemove', {})
      expect(animator.isPaused()).toBe(false)
      zr.trigger('mousemove', { target: path })
      expect(animator.isPaused()).toBe(true)
      expect([path.x, path.y]).toEqual(position)
      zr.trigger('mousemove', { target: path.getTextContent() })
      expect(animator.isPaused()).toBe(true)
      zr.trigger('mousemove', { target: new graphic.Rect() })
      expect(animator.isPaused()).toBe(false)
      zr.trigger('mousemove', { target: path })
      zr.trigger('globalout', {})
      expect(animator.isPaused()).toBe(false)
      dom.setAttribute('aria-busy', 'true')
      await Promise.resolve()
      expect(animator.isPaused()).toBe(true)
      dom.removeAttribute('aria-busy')
      await Promise.resolve()
      expect(animator.isPaused()).toBe(false)
      const descriptor = Object.getOwnPropertyDescriptor(document, 'hidden')
      try {
        Object.defineProperty(document, 'hidden', { configurable: true, value: true })
        document.dispatchEvent(new Event('visibilitychange'))
        expect(animator.isPaused()).toBe(true)
        Object.defineProperty(document, 'hidden', { configurable: true, value: false })
        document.dispatchEvent(new Event('visibilitychange'))
        expect(animator.isPaused()).toBe(false)
      } finally {
        if (descriptor) Object.defineProperty(document, 'hidden', descriptor)
        else Reflect.deleteProperty(document, 'hidden')
      }
      expect(animatorOf(path)).toBe(animator)
    })
  })

  it('honors reduced motion dynamically and releases listeners and animators on disposal', async () => {
    await renderMotion((chart, dom, media) => {
      const removeZr = vi.spyOn(chart.getZr(), 'off')
      const removeMedia = vi.spyOn(media, 'removeEventListener')
      const removeDocument = vi.spyOn(document, 'removeEventListener')
      const path = pathOf(chart)
      Object.assign(media, { matches: true })
      media.dispatchEvent(new Event('change'))
      expect(animatorOf(path)).toBeUndefined()
      expect([path.x, path.y]).toEqual([0, 0])
      Object.assign(media, { matches: false })
      media.dispatchEvent(new Event('change'))
      expect(animatorOf(path).getClip()).toBeTruthy()
      chart.dispose()
      expect(animatorOf(path)).toBeUndefined()
      expect(removeZr).toHaveBeenCalledWith('mousemove', expect.any(Function))
      expect(removeZr).toHaveBeenCalledWith('globalout', expect.any(Function))
      expect(removeMedia).toHaveBeenCalledWith('change', expect.any(Function))
      expect(removeDocument).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
      vi.restoreAllMocks()
    })
  })

  it('does not resume a filtered series when reduced motion is disabled', async () => {
    await renderMotion((chart, _dom, media) => {
      chart.setOption(
        createWordCloudOption({
          name: 'Cloud',
          motion: true,
          animationDuration: 0,
          legend: { data: ['Cloud'] },
          data: [{ id: 'a', name: 'Word', value: 1 }],
        }),
      )
      const path = pathOf(chart)
      chart.dispatchAction({ type: 'legendUnSelect', name: 'Cloud' })
      expect(animatorOf(path)).toBeUndefined()
      Object.assign(media, { matches: true })
      media.dispatchEvent(new Event('change'))
      Object.assign(media, { matches: false })
      media.dispatchEvent(new Event('change'))
      expect(animatorOf(path)).toBeUndefined()
      chart.dispatchAction({ type: 'legendSelect', name: 'Cloud' })
      expect(animatorOf(pathOf(chart))?.getClip()).toBeTruthy()
    })
  })

  it('supports legacy media listeners and removes the same listener on disposal', async () => {
    await renderMotion(
      (chart, _dom, media) => {
        expect(media.addListener).toHaveBeenCalledWith(expect.any(Function))
        const listener = vi.mocked(media.addListener).mock.calls[0]![0]
        Object.assign(media, { matches: true })
        media.dispatchEvent(new Event('change'))
        expect(animatorOf(pathOf(chart))).toBeUndefined()
        Object.assign(media, { matches: false })
        media.dispatchEvent(new Event('change'))
        expect(animatorOf(pathOf(chart))).toBeDefined()
        chart.dispose()
        expect(media.removeListener).toHaveBeenCalledWith(listener)
      },
      { mediaMode: 'legacy' },
    )
  })

  it('starts static under reduced motion and resumes after the preference changes', async () => {
    await renderMotion(
      (chart, _dom, media) => {
        expect(animatorOf(pathOf(chart))).toBeUndefined()
        chart.getZr().trigger('mousemove', { target: pathOf(chart) })
        expect(animatorOf(pathOf(chart))).toBeUndefined()
        Object.assign(media, { matches: false })
        media.dispatchEvent(new Event('change'))
        expect(animatorOf(pathOf(chart))?.getLoop()).toBe(true)
      },
      { reduced: true },
    )
  })

  it('runs and disposes when matchMedia is unavailable', async () => {
    await renderMotion(
      chart => {
        const path = pathOf(chart)
        expect(animatorOf(path)?.getLoop()).toBe(true)
        chart.dispose()
        expect(animatorOf(path)).toBeUndefined()
      },
      { mediaMode: 'none' },
    )
  })

  it('does not animate words that cannot fit and releases removed word animations', async () => {
    await renderMotion(chart => {
      const removed = pathOf(chart, 1)
      chart.setOption(
        createWordCloudOption({
          motion: { pauseOnHover: false },
          animationDurationUpdate: 0,
          data: [
            { id: 'a', name: 'Analysis', value: 100 },
            { id: 'huge', name: 'Too big', value: 1, symbolSize: 2000 },
          ],
        }),
      )
      expect(animatorOf(removed)).toBeUndefined()
      expect([removed.x, removed.y]).toEqual([0, 0])
      const data = (chart as any).getModel().getSeriesByIndex(0).getData()
      expect(data.getItemGraphicEl(1)).toBeUndefined()
      const path = pathOf(chart)
      chart.getZr().trigger('mousemove', { target: path })
      expect(animatorOf(path).isPaused()).toBe(false)
    })
  })

  it('retains an active floating animator during animated native presentation updates', async () => {
    await renderMotion(chart => {
      const path = pathOf(chart)
      const animator = animatorOf(path)
      chart.setOption(
        createWordCloudOption({
          motion: true,
          animationDuration: 0,
          animationDurationUpdate: 500,
          silent: true,
          data: [
            { id: 'a', name: 'Analysis', value: 100 },
            { id: 'b', name: 'Experience', value: 30 },
          ],
        }),
      )
      expect(pathOf(chart)).toBe(path)
      expect(animatorOf(path)).toBe(animator)
      expect(animator.getClip()).toBeTruthy()
    })
  })

  it('keeps animation=false as the master switch and validates motion without losing the cloud', () => {
    const settings = (props: WordCloudChartProps) =>
      (
        createWordCloudOption({
          ...props,
          data: [{ name: 'Word', value: 1 }],
        }).series as any[]
      )[0].__ixWordCloud
    expect(settings({ motion: true, animation: false }).motion).toBeUndefined()
    expect(settings({ motion: true }).motion).toEqual({
      amplitude: 12,
      amplitudeRatio: [1, 1],
      duration: 6000,
      pauseOnHover: true,
    })
    expect(settings({ motion: { amplitude: 0 } }).motion.amplitude).toBe(0)
    expect(settings({ motion: { amplitude: 20 } }).motion.amplitude).toBe(20)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      for (const motion of [
        { amplitude: -1 },
        { amplitude: 21 },
        { duration: 0 },
        { duration: Infinity },
        ...[[1], [1, 2, 3], [-1, 1], [NaN, 1], [1, Infinity], 'invalid'].map(amplitudeRatio => ({
          amplitudeRatio: amplitudeRatio as [number, number],
        })),
      ]) {
        const result = settings({ motion })
        expect(result.motion).toBeUndefined()
        expect(result.rows).toHaveLength(1)
      }
      expect(warn).toHaveBeenCalledTimes(10)
    } finally {
      warn.mockRestore()
    }
  })

  it.each([false, true])(
    'reserves collision and viewport space for the whole cycle (circle=%s)',
    circle => {
      const nodes: CloudNode[] = Array.from({ length: 15 }, (_, index) => ({
        id: String(index),
        index,
        value: 20 - index,
        circle,
        body: { x: -20, y: -20, width: 40, height: 40 },
        bounds: { x: -30, y: -20, width: 60, height: 40 },
        labels: [{ x: -30, y: -8, width: 60, height: 16 }],
      }))
      const amplitude = 8
      const placed = layoutCloud(
        nodes.map(node => reserveMotion(node, amplitude)),
        { x: 0, y: 0, width: 500, height: 300 },
        4,
        0,
      )
      expect(placed).toHaveLength(nodes.length)
      for (let frame = 0; frame < 24; frame++) {
        const actual = placed.map(node => {
          const phase = (frame / 24) * Math.PI * 2 + node.index
          return {
            ...nodes[node.index]!,
            x: node.x + amplitude * Math.cos(phase),
            y: node.y + amplitude * Math.sin(phase),
          }
        })
        actual.forEach((node, index) => {
          expect(node.x + node.bounds.x).toBeGreaterThanOrEqual(0)
          expect(node.y + node.bounds.y).toBeGreaterThanOrEqual(0)
          expect(node.x + node.bounds.x + node.bounds.width).toBeLessThanOrEqual(500)
          expect(node.y + node.bounds.y + node.bounds.height).toBeLessThanOrEqual(300)
          actual
            .slice(index + 1)
            .forEach(other => expect(cloudNodesCollide(node, other, 4, 0)).toBe(false))
        })
      }
    },
  )
})
