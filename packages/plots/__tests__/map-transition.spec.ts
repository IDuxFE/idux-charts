import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import type { EChartsType } from 'echarts/core'
import { init, use } from 'echarts/core'
import { GeoComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import { createMapTransition } from '../map'
import { registerTestMaps, testMapName } from './fixtures/map'

function setup(animation = true) {
  const parent = document.createElement('div')
  parent.style.backgroundColor = '#123456'
  const dom = document.createElement('div')
  parent.append(dom)
  document.body.append(parent)
  const option: any = {
    animation,
    animationDurationUpdate: 800,
    animationEasingUpdate: 'linear',
    backgroundColor: 'transparent',
    geo: [{ map: 'old', zoom: 2, center: [10, 20] }],
  }
  const events = new Map<string, Set<() => void>>()
  const covers = new Set<any>()
  let disposed = false
  const zr = {
    storage: { getDisplayList: vi.fn(() => [] as { zlevel: number }[]) },
    add: vi.fn((cover: any) => covers.add(cover)),
    remove: vi.fn((cover: any) => covers.delete(cover)),
    isDisposed: () => disposed,
  }
  const chart = {
    getDom: () => dom,
    getWidth: () => 600,
    getHeight: () => 400,
    getOption: () => option,
    getZr: () => zr,
    isDisposed: () => disposed,
    on: vi.fn((event: string, handler: () => void) => {
      if (!events.has(event)) events.set(event, new Set())
      events.get(event)!.add(handler)
    }),
    off: vi.fn((event: string, handler: () => void) => events.get(event)?.delete(handler)),
    setOption: vi.fn((next: any) => {
      const { geo, ...rest } = next
      Object.assign(option, rest)
      if (geo) Object.assign(option.geo[0], geo)
    }),
  } as unknown as EChartsType
  return {
    chart,
    option,
    zr,
    covers,
    events,
    disposeChart() {
      disposed = true
      covers.clear()
    },
    finish() {
      for (const handler of events.get('finished') ?? []) handler()
    },
    expectClean() {
      expect(covers.size).toBe(0)
      expect(events.get('finished')?.size ?? 0).toBe(0)
      expect(events.get('rendered')?.size ?? 0).toBe(0)
      expect(vi.getTimerCount()).toBe(0)
    },
  }
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  document.body.replaceChildren()
})

it.each(['drilldown', 'back'] as const)(
  'runs %s around the update and restores the new map animation settings',
  async direction => {
    const item = setup()
    const transition = createMapTransition(() => item.chart)
    const update = vi.fn(() => {
      item.option.geo[0] = { map: 'next', zoom: 3 }
      item.option.animationDurationUpdate = 900
    })
    const pending = transition.run(direction, update)
    expect(update).not.toHaveBeenCalled()
    expect(item.option.geo[0].zoom).toBeCloseTo(2 * (direction === 'back' ? 0.82 : 1.35))
    expect([...item.covers][0].style.fill).toBe('rgb(18, 52, 86)')
    await vi.runAllTimersAsync()
    await expect(pending).resolves.toBe(true)
    expect(update).toHaveBeenCalledOnce()
    expect(item.option.geo[0]).toMatchObject({ map: 'next', zoom: 3 })
    expect(item.option).toMatchObject({
      animation: true,
      animationDurationUpdate: 900,
      animationEasingUpdate: 'linear',
    })
    item.expectClean()
  },
)

it('finishes from native events without retaining its timeout or listener', async () => {
  const item = setup()
  const pending = createMapTransition(() => item.chart).run('drilldown', () => {
    item.option.geo[0].zoom = 1
  })
  item.finish()
  await Promise.resolve()
  await Promise.resolve()
  item.finish()
  await expect(pending).resolves.toBe(true)
  item.expectClean()
})

it('a newer transition prevents the older update from running', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  const oldUpdate = vi.fn()
  const old = transition.run('drilldown', oldUpdate)
  const latestUpdate = vi.fn()
  const latest = transition.run('back', latestUpdate)
  await vi.runAllTimersAsync()
  await expect(old).resolves.toBe(false)
  await expect(latest).resolves.toBe(true)
  expect(oldUpdate).not.toHaveBeenCalled()
  expect(latestUpdate).toHaveBeenCalledOnce()
  item.expectClean()
})

it('cancels the incoming animation without rolling back the committed map', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  const pending = transition.run('back', () => {
    item.option.geo[0] = { map: 'next', zoom: 1 }
  })
  await vi.advanceTimersByTimeAsync(560)
  transition.cancel()
  await expect(pending).resolves.toBe(false)
  expect(item.option.geo[0].map).toBe('next')
  expect(item.option.animationDurationUpdate).toBe(800)
  item.expectClean()
})

it('restores the original viewport on cancellation before update, without cumulative zoom', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  for (let index = 0; index < 4; index++) {
    const update = vi.fn()
    const pending = transition.run('drilldown', update)
    transition.cancel()
    await expect(pending).resolves.toBe(false)
    expect(update).not.toHaveBeenCalled()
    expect(item.option.geo[0]).toMatchObject({ zoom: 2, center: [10, 20] })
    item.expectClean()
  }
})

it('is safe to cancel from a synchronous native finished callback', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  const native = vi.mocked(item.chart.setOption).getMockImplementation()!
  let calls = 0
  vi.mocked(item.chart.setOption).mockImplementation((...args: any[]) => {
    if (++calls > 20) throw new Error('recursive cancellation')
    native(...(args as Parameters<typeof native>))
    if (args[0].animation === false) item.finish()
  })
  const update = vi.fn()
  const pending = transition.run('drilldown', update)
  item.chart.on('finished', () => transition.cancel())
  expect(() => transition.cancel()).not.toThrow()
  await expect(pending).resolves.toBe(false)
  expect(update).not.toHaveBeenCalled()
  // Remove the consumer's listener before checking helper-owned resources.
  item.events.get('finished')!.clear()
  item.expectClean()
})

it('propagates update failures and releases the cover', async () => {
  const item = setup()
  const error = new Error('update failed')
  const pending = createMapTransition(() => item.chart).run('drilldown', () => {
    throw error
  })
  const result = expect(pending).rejects.toBe(error)
  await vi.runAllTimersAsync()
  await result
  item.expectClean()
})

it('propagates native animation failures rather than treating them as completion', async () => {
  const item = setup()
  const error = new Error('setOption failed')
  vi.mocked(item.chart.setOption).mockImplementationOnce(() => {
    throw error
  })
  const update = vi.fn()
  await expect(createMapTransition(() => item.chart).run('drilldown', update)).rejects.toBe(error)
  expect(update).not.toHaveBeenCalled()
  item.expectClean()
})

it.each(['duration', 'preference', 'animation'] as const)('skips motion for %s', async reason => {
  const item = setup(reason !== 'animation')
  if (reason === 'preference') vi.stubGlobal('matchMedia', () => ({ matches: true }))
  const transition = createMapTransition(() => item.chart, {
    duration: reason === 'duration' ? 0 : undefined,
  })
  const update = vi.fn()
  await expect(transition.run('back', update)).resolves.toBe(true)
  expect(update).toHaveBeenCalledOnce()
  expect(item.chart.setOption).not.toHaveBeenCalled()
  item.expectClean()
})

it('disposes pending work safely after the chart has been destroyed', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  const update = vi.fn()
  const pending = transition.run('drilldown', update)
  item.disposeChart()
  transition.dispose()
  await expect(pending).resolves.toBe(false)
  await expect(transition.run('back', update)).resolves.toBe(false)
  expect(update).not.toHaveBeenCalled()
  item.expectClean()
})

it('cancels if the chart instance changes before the map update', async () => {
  const item = setup()
  let chart = item.chart
  const transition = createMapTransition(() => chart)
  const update = vi.fn()
  const pending = transition.run('drilldown', update)
  chart = setup().chart
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(false)
  expect(update).not.toHaveBeenCalled()
  item.expectClean()
})

it('commits initial state without a chart and reports cancellation while awaiting rendering', async () => {
  const transition = createMapTransition(() => undefined)
  const update = vi.fn()
  await expect(transition.run('drilldown', update)).resolves.toBe(true)
  let release!: () => void
  const pending = transition.run(
    'back',
    () =>
      new Promise<void>(resolve => {
        release = resolve
      }),
  )
  transition.cancel()
  release()
  await expect(pending).resolves.toBe(false)
})

it('runs against a real ECharts SVG instance and removes the native cover', async () => {
  vi.useRealTimers()
  use([GeoComponent, SVGRenderer])
  registerTestMaps()
  const dom = document.createElement('div')
  document.body.append(dom)
  const chart = init(dom, undefined, { renderer: 'svg', width: 600, height: 400 })
  chart.setOption({ animation: true, animationDurationUpdate: 20, geo: { map: testMapName } })
  const transition = createMapTransition(() => chart, { duration: 1 })
  const roots = chart.getZr().storage.getRoots().length
  try {
    await expect(
      transition.run('drilldown', () => {
        chart.setOption({ geo: { map: `${testMapName}-other`, zoom: 1.5 } })
      }),
    ).resolves.toBe(true)
    expect((chart.getOption().geo as { map: string; zoom: number }[])[0]).toMatchObject({
      map: `${testMapName}-other`,
      zoom: 1.5,
    })
    expect(chart.getZr().storage.getRoots()).toHaveLength(roots)
    expect(chart.getOption().animationDurationUpdate).toBe(20)
  } finally {
    transition.dispose()
    chart.dispose()
  }
})

it.each(['option', 'chart', 'fallback'] as const)('uses the %s cover background', async source => {
  const item = setup()
  item.chart.getDom().parentElement!.style.backgroundColor = 'transparent'
  if (source === 'chart') item.option.backgroundColor = '#234567'
  const transition = createMapTransition(
    () => item.chart,
    source === 'option' ? { backgroundColor: '#345678' } : {},
  )
  const pending = transition.run('drilldown', () => {})
  expect([...item.covers][0].style.fill).toBe(
    source === 'option' ? '#345678' : source === 'chart' ? '#234567' : '#FFFFFF',
  )
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(true)
  item.expectClean()
})

it('does not update an already disposed chart, and supports initial state without geo or DOM', async () => {
  const dead = setup()
  dead.disposeChart()
  const update = vi.fn()
  await expect(createMapTransition(() => dead.chart).run('back', update)).resolves.toBe(false)
  expect(update).not.toHaveBeenCalled()
  for (const mode of ['geo', 'dom']) {
    const item = setup()
    if (mode === 'geo') item.option.geo = []
    else vi.spyOn(item.chart, 'getDom').mockReturnValue(null as unknown as HTMLElement)
    await expect(createMapTransition(() => item.chart).run('drilldown', update)).resolves.toBe(true)
    expect(item.chart.setOption).not.toHaveBeenCalled()
    item.expectClean()
  }
  expect(update).toHaveBeenCalledTimes(2)
})

it('overrides phase delays and restores global and per-geo animation settings after map changes', async () => {
  const item = setup()
  Object.assign(item.option, { animationDelayUpdate: 180 })
  Object.assign(item.option.geo[0], {
    animationDurationUpdate: 900,
    animationDelayUpdate: 90,
    animationEasingUpdate: 'linear',
  })
  const pending = createMapTransition(() => item.chart, { duration: 20 }).run('back', () => {
    item.option.animationDelayUpdate = 220
    item.option.geo[0] = {
      map: 'next',
      zoom: 4,
      center: null,
      animation: true,
      animationDurationUpdate: 160,
      animationDelayUpdate: 37,
      animationEasingUpdate: 'quarticIn',
    }
  })
  expect(item.option.animationDelayUpdate).toBe(0)
  expect(item.option.geo[0]).toMatchObject({ animationDurationUpdate: 20, animationDelayUpdate: 0 })
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(true)
  expect(item.option.animationDelayUpdate).toBe(220)
  expect(item.option.geo[0]).toMatchObject({
    map: 'next',
    zoom: 4,
    center: null,
    animation: true,
    animationDurationUpdate: 160,
    animationDelayUpdate: 37,
    animationEasingUpdate: 'quarticIn',
  })
  item.expectClean()
})

it('keeps the cover above custom canvas layers and resizes it with the chart', async () => {
  const item = setup()
  item.zr.storage.getDisplayList.mockReturnValue([{ zlevel: 7 }, { zlevel: 2 }])
  const pending = createMapTransition(() => item.chart).run('drilldown', () => {})
  const cover = [...item.covers][0]
  expect(cover.zlevel).toBe(8)
  vi.spyOn(item.chart, 'getWidth').mockReturnValue(800)
  vi.spyOn(item.chart, 'getHeight').mockReturnValue(500)
  for (const handler of item.events.get('rendered')!) handler()
  expect(cover.shape).toMatchObject({ width: 800, height: 500 })
  for (const handler of item.events.get('rendered')!) handler()
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(true)
  item.expectClean()
})

it('releases resources while an update is pending and does not overwrite a newer completed map', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  let release!: () => void
  const old = transition.run(
    'drilldown',
    () =>
      new Promise<void>(resolve => {
        release = resolve
      }),
  )
  await vi.advanceTimersByTimeAsync(560)
  expect(release).toBeTypeOf('function')
  transition.cancel()
  await Promise.resolve()
  await Promise.resolve()
  item.expectClean()
  const latest = transition.run('back', () => {
    item.option.geo[0] = { map: 'latest', zoom: 4 }
  })
  await vi.runAllTimersAsync()
  await expect(latest).resolves.toBe(true)
  release()
  await expect(old).resolves.toBe(false)
  expect(item.option.geo[0]).toMatchObject({ map: 'latest', zoom: 4 })
  item.expectClean()
})

it('serializes a new run started inside a native callback until viewport restoration is complete', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  const native = vi.mocked(item.chart.setOption).getMockImplementation()!
  let insideNative = false,
    started = false
  let latest!: Promise<boolean>
  vi.mocked(item.chart.setOption).mockImplementation((...args: any[]) => {
    if (insideNative) throw new Error('native setOption reentry')
    insideNative = true
    try {
      native(...(args as Parameters<typeof native>))
      if (!started && args[0].animation === false) {
        started = true
        latest = transition.run('back', () => {
          item.option.geo[0] = { map: 'latest', zoom: 3 }
        })
      }
    } finally {
      insideNative = false
    }
  })
  const oldUpdate = vi.fn()
  const old = transition.run('drilldown', oldUpdate)
  await vi.runAllTimersAsync()
  await expect(old).resolves.toBe(false)
  await expect(latest).resolves.toBe(true)
  expect(oldUpdate).not.toHaveBeenCalled()
  expect(item.option.geo[0]).toMatchObject({ map: 'latest', zoom: 3 })
  item.expectClean()
})

it.each(['geo', 'animation', 'geo-animation'] as const)(
  'skips the incoming phase after update removes %s',
  async mode => {
    const item = setup()
    let callsAtUpdate = 0
    const pending = createMapTransition(() => item.chart).run('drilldown', () => {
      if (mode === 'geo') item.option.geo = []
      else if (mode === 'animation') item.option.animation = false
      else item.option.geo[0].animation = false
      callsAtUpdate = vi.mocked(item.chart.setOption).mock.calls.length
    })
    await vi.runAllTimersAsync()
    await expect(pending).resolves.toBe(true)
    expect(item.chart.setOption).toHaveBeenCalledTimes(callsAtUpdate)
    item.expectClean()
  },
)

it('honors per-geo animation disable, normalizes invalid durations and missing zoom values', async () => {
  const disabled = setup()
  disabled.option.geo[0].animation = false
  await expect(createMapTransition(() => disabled.chart).run('back', () => {})).resolves.toBe(true)
  expect(disabled.chart.setOption).not.toHaveBeenCalled()
  disabled.expectClean()
  const item = setup()
  delete item.option.geo[0].zoom
  const pending = createMapTransition(() => item.chart, { duration: Number.NaN }).run(
    'drilldown',
    () => {
      item.option.geo[0] = { map: 'next' }
    },
  )
  expect(item.option.animationDurationUpdate).toBe(480)
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(true)
  expect(item.option.geo[0].zoom).toBe(1)
  item.expectClean()
})

it('cleans up initialization and restoration failures without poisoning subsequent runs', async () => {
  const item = setup()
  const transition = createMapTransition(() => item.chart)
  vi.spyOn(item.chart, 'getZr').mockImplementationOnce(() => {
    throw new Error('renderer unavailable')
  })
  await expect(transition.run('back', () => {})).rejects.toThrow('renderer unavailable')
  item.expectClean()
  const pending = transition.run('drilldown', () => {})
  vi.mocked(item.chart.setOption).mockImplementationOnce(() => {
    throw new Error('restore failed')
  })
  const rejected = expect(pending).rejects.toThrow('restore failed')
  transition.cancel()
  await rejected
  item.expectClean()
  const latest = transition.run('back', () => {})
  await vi.runAllTimersAsync()
  await expect(latest).resolves.toBe(true)
  item.expectClean()
})

it('does not mutate the old chart after an update replaces its instance', async () => {
  const item = setup()
  let chart = item.chart
  const transition = createMapTransition(() => chart)
  const pending = transition.run('back', () => {
    chart = setup().chart
  })
  await vi.runAllTimersAsync()
  await expect(pending).resolves.toBe(false)
  item.expectClean()
})

it.each(['outgoing-animation', 'incoming-camera'] as const)(
  'stops native mutations when cancelled during %s',
  async stage => {
    const item = setup()
    const transition = createMapTransition(() => item.chart)
    const native = vi.mocked(item.chart.setOption).getMockImplementation()!
    let cancelled = false
    vi.mocked(item.chart.setOption).mockImplementation((...args: any[]) => {
      native(...(args as Parameters<typeof native>))
      const next = args[0]
      const target =
        stage === 'outgoing-animation'
          ? next.animation === true && next.animationDurationUpdate === 800
          : item.option.geo[0].map === 'next' && next.animation === false && next.geo?.zoom !== 3
      if (!cancelled && target) {
        cancelled = true
        transition.cancel()
      }
    })
    const update = vi.fn(() => {
      item.option.geo[0] = { map: 'next', zoom: 3 }
    })
    const pending = transition.run('drilldown', update)
    await vi.runAllTimersAsync()
    await expect(pending).resolves.toBe(false)
    expect(cancelled).toBe(true)
    expect(item.option.geo[0]).toMatchObject(
      stage === 'outgoing-animation' ? { map: 'old', zoom: 2 } : { map: 'next', zoom: 3 },
    )
    expect(update).toHaveBeenCalledTimes(stage === 'outgoing-animation' ? 0 : 1)
    item.expectClean()
  },
)

it('ignores a late outgoing completion without detaching the incoming listener', async () => {
  const item = setup()
  const pending = createMapTransition(() => item.chart).run('back', () => {})
  const oldFinish = [...item.events.get('finished')!][0]!
  item.finish()
  await Promise.resolve()
  await Promise.resolve()
  expect(item.events.get('finished')!.size).toBe(1)
  oldFinish()
  expect(item.events.get('finished')!.size).toBe(1)
  item.finish()
  await expect(pending).resolves.toBe(true)
  item.expectClean()
})
