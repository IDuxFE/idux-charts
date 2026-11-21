import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, reactive, shallowRef } from 'vue'
import type { EChartsType } from 'echarts/core'

vi.mock('echarts/core', () => ({ init: vi.fn(), use: vi.fn() }))
vi.mock('../useResizeObserver', () => ({ useResizeObserver: vi.fn() }))
import { init } from 'echarts/core'
import { useChart } from '../useChart'
import { CHART_THEME_TOKEN } from '../../themes/token'

function createInstance() {
  const events = new Map<string, Set<(...args: unknown[]) => void>>()
  return {
    group: '',
    getWidth: vi.fn(() => 640),
    getHeight: vi.fn(() => 320),
    getOption: vi.fn(() => ({ darkMode: false })),
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

it.each(['setOption', 'getOption', 'on'] as const)(
  'disposes a partially initialized instance when %s fails and reports the original error',
  operation => {
    const failed = createInstance()
    const error = new Error(`Failed ${operation}`)
    failed[operation].mockImplementationOnce(() => {
      throw error
    })
    vi.mocked(init).mockReturnValueOnce(failed as unknown as EChartsType)
    const onError = vi.fn()
    const ready = vi.fn()
    let chart!: ReturnType<typeof useChart>
    const app = createApp({
      setup() {
        chart = useChart({ loading: true, onReady: ready })
        return () => h('div', { ref: chart.containerRef })
      },
    })
    app.config.errorHandler = onError
    try {
      app.mount(document.createElement('div'))
      expect(onError.mock.calls[0][0]).toBe(error)
      expect(chart.chartRef.value).toBeUndefined()
      expect(failed.dispose).toHaveBeenCalledOnce()
      expect(ready).not.toHaveBeenCalled()
    } finally {
      app.unmount()
    }
    expect(failed.dispose).toHaveBeenCalledOnce()
  },
)

it('cleans up a failed theme rebuild and can be mounted again without stale event handlers', async () => {
  const error = new Error('Invalid rebuilt option')
  const options = reactive({ theme: 'seer', onClick: vi.fn() })
  const onError = vi.fn()
  const app = createApp({
    setup() {
      const chart = useChart(options)
      return () => h('div', { ref: chart.containerRef })
    },
  })
  app.config.errorHandler = onError
  try {
    app.mount(document.createElement('div'))
    const failed = createInstance()
    failed.setOption.mockImplementationOnce(() => {
      throw error
    })
    vi.mocked(init).mockReturnValueOnce(failed as unknown as EChartsType)
    options.theme = 'dark'
    await nextTick()
    expect(onError.mock.calls[0][0]).toBe(error)
    expect(instances[0].dispose).toHaveBeenCalledOnce()
    expect(failed.dispose).toHaveBeenCalledOnce()
  } finally {
    app.unmount()
  }
  const { wrapper } = setup(options)
  instances.at(-1)!.emit('click')
  expect(options.onClick).toHaveBeenCalledOnce()
  wrapper.unmount()
})

describe('useChart lifecycle', () => {
  it('inherits reactive application themes while preserving explicit overrides', async () => {
    const theme = shallowRef('dark')
    const local = reactive<{ theme?: string }>({})
    const wrapper = mount(
      defineComponent({
        setup() {
          const chart = useChart(local)
          return () => h('div', { ref: chart.containerRef })
        },
      }),
      { global: { provide: { [CHART_THEME_TOKEN as symbol]: theme } } },
    )
    wrappers.push(wrapper)
    expect(vi.mocked(init).mock.calls.at(-1)?.[1]).toBe('dark')
    theme.value = 'seer'
    await nextTick()
    expect(instances[0].dispose).toHaveBeenCalledOnce()
    expect(vi.mocked(init).mock.calls.at(-1)?.[1]).toBe('seer')
    local.theme = 'custom'
    await nextTick()
    const count = instances.length
    theme.value = 'dark'
    await nextTick()
    expect(instances).toHaveLength(count)
    expect(vi.mocked(init).mock.calls.at(-1)?.[1]).toBe('custom')
    local.theme = undefined
    await nextTick()
    expect(vi.mocked(init).mock.calls.at(-1)?.[1]).toBe('dark')
  })

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

  it('uses a dark loading illustration and preserves explicit styles', async () => {
    const options = reactive<any>({ loading: false })
    const { wrapper } = setup(options)
    instances[0].getOption.mockReturnValue({ darkMode: true })
    options.loading = true
    await nextTick()
    const overlay = wrapper.get('.ix-chart-loading')
    expect(overlay.attributes('style')).toContain('background: rgb(10, 12, 15)')
    expect(overlay.attributes('style')).toContain('color: rgb(244, 248, 255)')
    expect(decodeURIComponent(overlay.get('img').attributes('src')!)).toContain('#465163')
    options.loading = { maskColor: 'transparent', textColor: 'red' }
    await nextTick()
    expect(overlay.attributes('style')).toContain('background: transparent')
    expect(overlay.attributes('style')).toContain('color: red')
  })

  it('shows default and custom loading without updating or recreating the chart', async () => {
    const options = reactive<any>({ loading: true })
    const { wrapper } = setup(options)
    await nextTick()
    expect(wrapper.get('[role="status"]').text()).toBe('Loading...')
    options.loading = { text: 'Working', color: 'red' }
    await nextTick()
    expect(wrapper.get('[role="status"]').text()).toBe('Working')
    expect(decodeURIComponent(wrapper.get('img').attributes('src')!)).toContain('fill="red"')
    options.loading = false
    await nextTick()
    expect(wrapper.find('[role="status"]').exists()).toBe(false)
    expect(wrapper.attributes('aria-busy')).toBeUndefined()
    expect(instances).toHaveLength(1)
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
      const { chart, wrapper } = setup(options)
      options[key] = key === 'theme' ? 'dark' : { renderer: 'canvas' }
      await nextTick()
      expect(instances).toHaveLength(2)
      expect(instances[0].dispose).toHaveBeenCalledTimes(1)
      expect(chart.chartRef.value).toBe(instances[1])
      expect(instances[1].setOption.mock.lastCall?.[0]).toEqual({ series: options.series })
      expect(wrapper.findAll('.ix-chart-loading')).toHaveLength(1)
      expect(wrapper.get('[role="status"]').text()).toBe('Loading...')
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

it('updates chart-local tooltip theme state from resolved ECharts options', async () => {
  const options = reactive({ darkMode: false })
  const { wrapper } = setup(options)
  expect(wrapper.attributes('data-ix-chart-theme')).toBe('light')
  instances[0]!.getOption.mockReturnValue({ darkMode: true })
  options.darkMode = true
  await nextTick()
  expect(wrapper.attributes('data-ix-chart-theme')).toBe('dark')
  instances[0]!.getOption.mockReturnValue({ darkMode: false })
  options.darkMode = false
  await nextTick()
  expect(wrapper.attributes('data-ix-chart-theme')).toBe('light')
})

it('ignores option/theme updates when the component has no chart container', async () => {
  const options = reactive({ theme: 'light', title: { text: 'Before' } })
  const wrapper = mount(
    defineComponent({
      setup() {
        useChart(options)
        return () => h('span', options.title.text)
      },
    }),
  )
  wrappers.push(wrapper)
  options.theme = 'dark'
  options.title.text = 'After'
  await nextTick()
  expect(init).not.toHaveBeenCalled()
  expect(wrapper.text()).toBe('After')
})

it('retains the viewport while rebuilding a hidden chart and honors explicit init sizes', async () => {
  const options = reactive<any>({ theme: 'seer' })
  const { chart } = setup(options)
  options.theme = 'dark'
  await nextTick()
  expect(init).toHaveBeenLastCalledWith(chart.containerRef.value, 'dark', {
    width: 640,
    height: 320,
  })
  options.initOption = { width: 800, height: 400, renderer: 'canvas' }
  await nextTick()
  expect(init).toHaveBeenLastCalledWith(chart.containerRef.value, 'dark', options.initOption)
})
