import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive, shallowRef } from 'vue'
import type { EChartsType } from 'echarts/core'

vi.mock('echarts/core', () => ({ init: vi.fn(), use: vi.fn() }))
vi.mock('../useResizeObserver', () => ({ useResizeObserver: vi.fn() }))
import { init } from 'echarts/core'
import { useChart } from '../useChart'

function createInstance() {
  const events = new Map<string, Set<(...args: unknown[]) => void>>()
  return {
    group: '',
    setOption: vi.fn(),
    dispose: vi.fn(),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn((name: string, handler: (...args: unknown[]) => void) => {
      if (!events.has(name)) events.set(name, new Set())
      events.get(name)!.add(handler)
    }),
    off: vi.fn((name: string, handler: (...args: unknown[]) => void) =>
      events.get(name)?.delete(handler),
    ),
    emit: (name: string, ...args: unknown[]) =>
      [...(events.get(name) ?? [])].forEach(fn => fn(...args)),
  }
}
const instances: ReturnType<typeof createInstance>[] = []
const wrappers: ReturnType<typeof mount>[] = []
function setup(options: any, listeners?: () => Record<string, Function>) {
  let chart!: ReturnType<typeof useChart>
  const wrapper = mount(
    defineComponent({
      setup() {
        chart = useChart(options, listeners)
        return () => h('div', { ref: chart.containerRef })
      },
    }),
  )
  wrappers.push(wrapper)
  return {
    wrapper,
    get chart() {
      return chart
    },
  }
}
beforeEach(() => {
  instances.length = 0
  vi.mocked(init)
    .mockReset()
    .mockImplementation(() => {
      const instance = createInstance()
      instances.push(instance)
      return instance as unknown as EChartsType
    })
})
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

describe('useChart lifecycle', () => {
  it('initializes with defaults, filters wrapper options, and releases its instance', async () => {
    const ready = vi.fn()
    const options = reactive({
      series: [{ type: 'bar', data: [1] }],
      class: 'chart',
      style: { height: '300px' },
      autoResize: true,
      group: 'linked',
      loading: false,
      setOptionOpts: { notMerge: true },
      onReady: ready,
      onClick: vi.fn(),
    })
    const { wrapper, chart } = setup(options)
    expect(init).toHaveBeenCalledWith(chart.containerRef.value, 'seer', undefined)
    expect(instances[0].setOption).toHaveBeenCalledExactlyOnceWith(
      { series: options.series },
      { notMerge: true },
    )
    expect(ready).toHaveBeenCalledExactlyOnceWith(instances[0])
    await nextTick()
    expect(instances[0].group).toBe('linked')
    wrapper.unmount()
    expect(instances[0].dispose).toHaveBeenCalledTimes(1)
    expect(chart.chartRef.value).toBeUndefined()
  })

  it('updates deep data and ref replacements but skips equal options and event-only changes', async () => {
    const options = shallowRef<any>({ series: [{ type: 'bar', data: [1] }] })
    setup(options)
    options.value = { series: [{ type: 'bar', data: [1] }] }
    await nextTick()
    expect(instances[0].setOption).toHaveBeenCalledTimes(1)
    options.value = reactive({ series: [{ type: 'bar', data: [2] }] })
    await nextTick()
    options.value.series[0].data[0] = 8
    await nextTick()
    expect(instances[0].setOption).toHaveBeenCalledTimes(3)
    expect(instances[0].setOption.mock.lastCall?.[0].series[0].data).toEqual([8])
    options.value.onClick = vi.fn()
    await nextTick()
    expect(instances[0].setOption).toHaveBeenCalledTimes(3)
  })

  it('shows default and custom loading without pushing loading to setOption', async () => {
    const options = reactive<any>({ loading: true })
    setup(options)
    await nextTick()
    expect(instances[0].showLoading).toHaveBeenLastCalledWith({ text: '加载中...' })
    options.loading = { text: 'Working', color: 'red' }
    await nextTick()
    expect(instances[0].showLoading).toHaveBeenLastCalledWith({ text: 'Working', color: 'red' })
    options.loading = false
    await nextTick()
    expect(instances[0].hideLoading).toHaveBeenCalledTimes(1)
    expect(instances[0].setOption).toHaveBeenCalledTimes(1)
  })

  it.each(['theme', 'initOption'] as const)(
    'reinitializes on %s and restores data, loading, group and events',
    async key => {
      const ready = vi.fn()
      const click = vi.fn()
      const options = reactive<any>({
        series: [{ type: 'bar', data: [2] }],
        loading: true,
        group: 'linked',
        onReady: ready,
        onClick: click,
      })
      const { chart } = setup(options)
      options[key] = key === 'theme' ? 'dark' : { renderer: 'canvas' }
      await nextTick()
      expect(instances).toHaveLength(2)
      expect(instances[0].dispose).toHaveBeenCalledTimes(1)
      expect(chart.chartRef.value).toBe(instances[1])
      expect(instances[1].setOption.mock.lastCall?.[0]).toEqual({ series: options.series })
      expect(instances[1].showLoading).toHaveBeenCalledWith({ text: '加载中...' })
      expect(instances[1].group).toBe('linked')
      instances[1].emit('click', { name: 'A', value: 2 })
      expect(click).toHaveBeenCalledExactlyOnceWith({ name: 'A', value: 2 })
      expect(ready).toHaveBeenCalledTimes(2)
    },
  )

  it('updates and clears group membership', async () => {
    const options = reactive<any>({ group: 'first' })
    setup(options)
    options.group = 'second'
    await nextTick()
    expect(instances[0].group).toBe('second')
    options.group = undefined
    await nextTick()
    expect(instances[0].group).toBe('')
  })

  it('uses current setOptionOpts and keeps initOption out of chart options', async () => {
    const options = reactive<any>({
      initOption: { renderer: 'svg' },
      series: [{ data: [1] }],
      setOptionOpts: { notMerge: true },
    })
    setup(options)
    expect(instances[0].setOption.mock.calls[0][0]).toEqual({ series: [{ data: [1] }] })
    options.setOptionOpts = { replaceMerge: ['series'] }
    options.series = [{ data: [2] }]
    await nextTick()
    expect(instances[0].setOption).toHaveBeenLastCalledWith(
      { series: [{ data: [2] }] },
      { replaceMerge: ['series'] },
    )
  })
})

it('does not reinitialize for equivalent init options but observes nested changes', async () => {
  const options = reactive<any>({ initOption: { renderer: 'svg' }, series: [{ data: [1] }] })
  setup(options)
  options.initOption = { renderer: 'svg' }
  options.series = [{ data: [2] }]
  await nextTick()
  expect(instances).toHaveLength(1)
  options.initOption.renderer = 'canvas'
  await nextTick()
  expect(instances).toHaveLength(2)
  expect(instances[0].dispose).toHaveBeenCalledTimes(1)
})
