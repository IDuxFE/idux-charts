import { PLOT_THEME_TOKEN } from '../shared/plotTheme'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'

vi.mock('echarts/core', async () => ({
  ...(await vi.importActual<typeof import('echarts/core')>('echarts/core')),
  init: vi.fn(),
}))
vi.mock('../../core/composables/useResizeObserver', () => ({ useResizeObserver: vi.fn() }))
import { init } from 'echarts/core'
import { IxChart } from '../../core/components'
import Bar from '../bar/src/Bar'
import Line from '../line/src/Line'
import Pie from '../pie/src/Pie'
import Radar from '../radar/src/Radar'
import Gauge from '../gauge/src/Gauge'
import LiquidFill from '../liquid-fill/src/LiquidFill'

const instances: {
  getOption: ReturnType<typeof vi.fn>
  setOption: ReturnType<typeof vi.fn>
  dispose: ReturnType<typeof vi.fn>
  showLoading: ReturnType<typeof vi.fn>
  hideLoading: ReturnType<typeof vi.fn>
  on: ReturnType<typeof vi.fn>
  off: ReturnType<typeof vi.fn>
}[] = []
const wrappers: ReturnType<typeof mount>[] = []
beforeEach(() => {
  instances.length = 0
  vi.mocked(init)
    .mockReset()
    .mockImplementation(() => {
      const instance = {
        getOption: vi.fn(() => ({ darkMode: false })),
        setOption: vi.fn(),
        dispose: vi.fn(),
        showLoading: vi.fn(),
        hideLoading: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
      }
      instances.push(instance)
      return instance as unknown as ReturnType<typeof init>
    })
})
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

for (const [name, component] of [
  ['core', IxChart],
  ['bar', Bar],
  ['line', Line],
  ['pie', Pie],
  ['radar', Radar],
  ['gauge', Gauge],
  ['liquid-fill', LiquidFill],
] as const) {
  describe(`${name} attribute forwarding`, () => {
    it('reacts to attribute-only updates, removal and theme reinitialization', async () => {
      const attrs = reactive<Record<string, any>>({
        style: { height: '300px' },
        class: 'test-chart',
        loading: false,
        ...(name === 'core'
          ? { series: [{ type: 'bar', data: [1] }] }
          : name === 'gauge' || name === 'liquid-fill'
            ? { value: 50 }
            : name === 'radar'
              ? {
                  indicator: ['A', 'B', 'C'].map(name => ({ name, max: 100 })),
                  data: [{ name: 'One', value: [20, 30, 40] }],
                }
              : { data: name === 'pie' ? [{ name: 'A', value: 1 }] : [1] }),
        title: { text: 'Before' },
      })
      const wrapper = mount(defineComponent({ setup: () => () => h(component, attrs) }))
      wrappers.push(wrapper)
      await nextTick()
      expect(wrapper.find('.test-chart').attributes('style')).toContain('height: 300px')
      expect(instances[0].setOption.mock.lastCall?.[0].title.text).toBe('Before')
      attrs.title = { text: 'After' }
      attrs.loading = { text: 'Waiting' }
      await nextTick()
      expect(instances[0].setOption.mock.lastCall?.[0].title.text).toBe('After')
      expect(instances[0].showLoading).toHaveBeenLastCalledWith({ text: 'Waiting' })
      attrs.loading = false
      await nextTick()
      expect(instances[0].hideLoading).toHaveBeenCalledTimes(2)
      const click = vi.fn()
      attrs.onClick = click
      await nextTick()
      const handler = instances[0].on.mock.lastCall?.[1]
      handler({ name: 'A' })
      expect(click).toHaveBeenCalledExactlyOnceWith({ name: 'A' })
      delete attrs.onClick
      await nextTick()
      expect(instances[0].off).toHaveBeenCalledWith('click', handler)
      attrs['init-option'] = { renderer: 'svg' }
      attrs['set-option-opts'] = { notMerge: true }
      await nextTick()
      expect(init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'seer', { renderer: 'svg' })
      expect(instances[1].setOption.mock.lastCall?.[1]).toEqual({ notMerge: true })
      delete attrs['init-option']
      await nextTick()
      attrs.theme = 'dark'
      await nextTick()
      expect(instances).toHaveLength(4)
      expect(instances[0].dispose).toHaveBeenCalledTimes(1)
      expect(instances[3].setOption.mock.lastCall?.[0].title.text).toBe('After')
      expect(init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'dark', undefined)
    })
  })
}

it('radar toggles direction without mutating data and restores defaults after an override is removed', async () => {
  const data = [{ name: 'One', value: [10, 20, 30] }]
  const attrs = reactive<Record<string, any>>({
    indicator: ['A', 'B', 'C'].map(name => ({ name, max: 100 })),
    data,
    clockwise: '',
    area: '',
  })
  wrappers.push(mount(defineComponent({ setup: () => () => h(Radar, attrs) })))
  await nextTick()
  const option = () => instances[0].setOption.mock.lastCall![0]
  expect(option().radar.indicator.map((item: { name: string }) => item.name)).toEqual([
    'A',
    'C',
    'B',
  ])
  expect(option().series[0].data[0].value).toEqual([10, 30, 20])
  expect(option().series[0].areaStyle.opacity).toBe(0.12)
  attrs.clockwise = false
  attrs.area = false
  await nextTick()
  expect(option().series[0].data[0].value).toEqual([10, 20, 30])
  expect(option().series[0].areaStyle.opacity).toBe(0)
  attrs.radar = { indicator: [{ name: 'Override', max: 50 }] }
  await nextTick()
  expect(option().radar).toEqual(attrs.radar)
  delete attrs.radar
  attrs.data = []
  await nextTick()
  expect(option().radar.indicator).toHaveLength(3)
  expect(option().series[0].data).toEqual([])
  expect(instances[0].setOption.mock.lastCall![1]).toMatchObject({ notMerge: true })
  expect(data[0]!.value).toEqual([10, 20, 30])
})

for (const [name, component] of [
  ['gauge', Gauge],
  ['liquid-fill', LiquidFill],
] as const) {
  it(`${name} clears missing measurements and restores generated series after overrides`, async () => {
    const attrs = reactive<Record<string, any>>({ value: 50 })
    wrappers.push(mount(defineComponent({ setup: () => () => h(component, attrs) })))
    await nextTick()
    const last = () => instances[0].setOption.mock.lastCall!
    expect(last()[0].series).toHaveLength(1)
    attrs.value = null
    await nextTick()
    expect(last()[0].series).toEqual([])
    expect(last()[1]).toEqual({ notMerge: true })
    attrs.value = 0
    attrs.series = [{ type: 'custom', data: [99] }]
    attrs['set-option-opts'] = { notMerge: false, lazyUpdate: true }
    await nextTick()
    expect(last()[0].series).toEqual(attrs.series)
    expect(last()[1]).toEqual({ notMerge: false, lazyUpdate: true })
    delete attrs.series
    delete attrs['set-option-opts']
    await nextTick()
    expect(last()[0].series[0]).toMatchObject({ id: name, data: [0] })
    expect(last()[1]).toEqual({ notMerge: true })
  })
}

it('gauge rebuilds when props used only by renderItem change', async () => {
  const attrs = reactive({
    value: 50,
    size: 'lg' as 'lg' | 'md',
    valueFontSize: 24,
    labelColor: '#111111',
  })
  wrappers.push(mount(defineComponent({ setup: () => () => h(Gauge, attrs) })))
  await nextTick()
  const previous = instances[0].setOption.mock.lastCall![0].series[0]
  const calls = instances[0].setOption.mock.calls.length
  attrs.size = 'md'
  attrs.valueFontSize = 18
  attrs.labelColor = '#222222'
  await nextTick()
  expect(instances[0].setOption.mock.calls.length).toBeGreaterThan(calls)
  const current = instances[0].setOption.mock.lastCall![0].series[0]
  const render = (series: any) =>
    series.renderItem({}, { getWidth: () => 240, getHeight: () => 180 }).children
  expect(render(current).at(-2).style.fontSize).toBe(18)
  expect(render(current).at(-1).style.fill).toBe('#222222')
  expect(render(previous).at(-2).style.fontSize).toBe(24)
})

it('updates and removes a reactive global plot theme without leaking tokens to ECharts', async () => {
  const theme = reactive({ textColor: '#123456', fontFamily: 'Global Font' })
  const attrs = reactive<Record<string, any>>({ value: 50, 'plot-theme': { textColor: '#abcdef' } })
  wrappers.push(
    mount(defineComponent({ setup: () => () => h(Gauge, attrs) }), {
      global: { provide: { [PLOT_THEME_TOKEN as symbol]: theme } },
    }),
  )
  await nextTick()
  const option = () => instances[0].setOption.mock.lastCall![0]
  const valueStyle = () =>
    option()
      .series[0].renderItem(
        {},
        {
          getWidth: () => 300,
          getHeight: () => 300,
        },
      )
      .children.at(-2).style
  expect(valueStyle().fill).toBe('#abcdef')
  delete attrs['plot-theme']
  theme.textColor = '#654321'
  await nextTick()
  expect(valueStyle()).toMatchObject({ fill: '#654321', fontFamily: 'Global Font' })
  expect(option()).not.toHaveProperty('plotTheme')
  expect(option()).not.toHaveProperty('plot-theme')
})

it('applies local Pie styles in native mode without leaking wrapper controls', async () => {
  const attrs = reactive<Record<string, any>>({
    layoutMode: 'native',
    data: [{ name: 'A', value: 10 }],
    seriesStyle: { itemStyle: { borderWidth: 5 }, emphasis: { scale: false } },
    plotTheme: { color: 'red' },
  })
  wrappers.push(mount(defineComponent({ setup: () => () => h(Pie, attrs) })))
  await nextTick()
  const option = instances[0].setOption.mock.lastCall![0]
  expect(option.series).toHaveLength(1)
  expect(option.series[0]).toMatchObject({
    type: 'pie',
    data: [{ name: 'A', value: 10 }],
    itemStyle: { borderWidth: 5 },
    emphasis: { scale: false },
  })
  for (const key of ['layoutMode', 'seriesStyle', 'plotTheme']) {
    expect(option).not.toHaveProperty(key)
    expect(option.series[0]).not.toHaveProperty(key)
  }
})
