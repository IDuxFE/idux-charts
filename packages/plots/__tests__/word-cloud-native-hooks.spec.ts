import { afterEach, describe, expect, it, vi } from 'vitest'
import { graphic, Model, registerLayout, registerPostUpdate } from 'echarts/core'
import { createWordCloudOption } from '../word-cloud'
import { installWordCloudMotion, motionAmplitude } from '../word-cloud/src/motion'
import { installWordCloudLayout } from '../word-cloud/src/wordCloudLayout'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerPostUpdate: vi.fn(),
  registerLayout: vi.fn(),
  registerVisual: vi.fn(),
}))

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

function motionFixture() {
  installWordCloudMotion()
  const update = vi.mocked(registerPostUpdate).mock.calls.at(-1)![0]
  const option = (
    createWordCloudOption({ motion: true, data: [{ name: 'Word', value: 1 }] }).series as any[]
  )[0]
  const path = new graphic.Rect({ shape: { x: -10, y: -10, width: 20, height: 20 } })
  const symbol = new graphic.Group()
  symbol.add(path)
  const dom = document.createElement('div')
  const zr = { on: vi.fn(), off: vi.fn(), wakeUp: vi.fn() }
  const view = { dispose: vi.fn(), remove: vi.fn() }
  const model = {
    option,
    isAnimationEnabled: () => true,
    getRawValue: () => 1,
    getData: () => ({
      each: (callback: (index: number) => void) => callback(0),
      getId: () => 'word',
      getItemGraphicEl: () => symbol,
    }),
  }
  const ecModel = {
    eachRawSeriesByType: (_type: string, callback: (model: unknown) => void) => callback(model),
    isSeriesFiltered: () => false,
  }
  const api = {
    isSSR: () => false,
    getDom: () => dom,
    getZr: () => zr,
    getViewOfSeriesModel: () => view,
  }
  const sync = () => update(ecModel as any, api as any)
  const animator = () => path.animators.find(item => item.scope === 'ix-word-cloud-motion')!
  return { option, path, symbol, zr, view, sync, animator }
}

describe('word cloud native hook boundaries', () => {
  it('uses unit scale without a native transform and restarts a completed clip', () => {
    const { symbol, path, view, sync, animator, zr } = motionFixture()
    vi.spyOn(symbol, 'getComputedTransform').mockReturnValue(null!)
    try {
      sync()
      const first = animator()
      expect(first.getClip()).toBeTruthy()
      expect(Math.hypot(path.x, path.y)).toBeCloseTo((12 * 0.85) / Math.sqrt(2))
      vi.spyOn(first, 'getClip').mockReturnValue(null!)
      const pauseAnimator = vi.spyOn(first, 'pause')
      const resumeAnimator = vi.spyOn(first, 'resume')
      const pause = zr.on.mock.calls.find(([name]) => name === 'globalout')![1]
      pause()
      expect(pauseAnimator).not.toHaveBeenCalled()
      expect(resumeAnimator).not.toHaveBeenCalled()
      expect(zr.wakeUp).toHaveBeenCalled()
      sync()
      expect(animator()).not.toBe(first)
      expect(animator().getClip()).toBeTruthy()
    } finally {
      view.dispose()
    }
  })

  it.each([
    [0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
  ])('skips motion for a collapsed transform %j', (...matrix) => {
    const { symbol, path, view, sync } = motionFixture()
    vi.spyOn(symbol, 'getComputedTransform').mockReturnValue(matrix)
    try {
      sync()
      expect(path.animators).toHaveLength(0)
      expect([path.x, path.y]).toEqual([0, 0])
    } finally {
      view.dispose()
    }
  })

  it('accepts a synchronous initial media notification before a series is attached', () => {
    const media = {
      matches: false,
      addEventListener: vi.fn((_name, listener) => listener()),
      removeEventListener: vi.fn(),
    }
    vi.stubGlobal('matchMedia', () => media)
    const { sync, animator, view } = motionFixture()
    try {
      sync()
      expect(media.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
      expect(animator().getClip()).toBeTruthy()
    } finally {
      view.dispose()
    }
    expect(media.removeEventListener).toHaveBeenCalledWith(
      'change',
      media.addEventListener.mock.calls[0]![1],
    )
  })

  it('returns zero amplitude when a native settings object omits the amplitude', () => {
    const settings = (createWordCloudOption({ motion: true }).series as any[])[0].__ixWordCloud
    settings.motion.amplitude = undefined
    expect(motionAmplitude(settings, 1)).toBe(0)
  })

  it('falls back to native names, default label positioning and absent border styles', () => {
    installWordCloudLayout()
    const stage = (vi.mocked(registerLayout).mock.calls as unknown[][]).at(-1)![1] as any
    const option = (
      createWordCloudOption({ data: [{ name: 'Native name', value: 1 }] }).series as any[]
    )[0]
    option.__ixWordCloud.rows[0].label.position = undefined
    option.__ixWordCloud.rows[0].label.distance = undefined
    const visuals: Record<string, unknown> = { style: { fill: '#123456' } }
    const layouts: number[][] = []
    const itemModel = new Model(option.data[0])
    const getModel = itemModel.getModel.bind(itemModel)
    vi.spyOn(itemModel, 'getModel').mockImplementation((...args: any[]) => {
      const result = getModel(...(args as Parameters<typeof getModel>))
      if (args[0] === 'itemStyle') vi.spyOn(result, 'getItemStyle').mockReturnValue({})
      return result
    })
    const data = {
      each: (callback: (index: number) => void) => callback(0),
      getRawIndex: () => 0,
      getItemModel: () => itemModel,
      getItemVisual: (_index: number, key: string) => visuals[key],
      getLayout: () => undefined,
      getName: () => 'Native name',
      getId: () => 'native',
      setItemLayout: (_index: number, point: number[]) => layouts.push(point),
      setItemVisual: (_index: number, key: string, value: unknown) => (visuals[key] = value),
    }
    const model = {
      option,
      getData: () => data,
      getRawValue: () => 1,
      getFormattedLabel: vi.fn(() => undefined),
      coordinateSystem: { pointToData: (point: number[]) => point },
    }
    stage.reset(model, {}, { getWidth: () => 640, getHeight: () => 360 })
    expect(model.getFormattedLabel).toHaveBeenCalledWith(0, 'emphasis')
    expect(layouts.at(-1)).toEqual([320, 180])
    expect(visuals.symbolSize).toEqual([expect.any(Number), expect.any(Number)])
    expect((visuals.symbolSize as number[]).every(size => size > 0)).toBe(true)
  })
})
