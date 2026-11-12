import { mount } from '@vue/test-utils'
import type { EChartsType } from 'echarts/core'
import { afterEach, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'
import type { Component } from 'vue'

import { IxChart } from '../../core/components'
import {
  BAR_CHART_TOKEN,
  LINE_CHART_TOKEN,
  IxBarChart,
  IxGaugeChart,
  IxLineChart,
  IxLiquidFillChart,
  IxPieChart,
  IxRadarChart,
  createRadarOption,
} from '../index'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

function mountChart(
  component: Component,
  input: Record<string, any>,
  provide?: Record<symbol, any>,
) {
  const props = reactive(input)
  const ready = vi.fn<(chart: EChartsType) => void>()
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(component, {
          ref: 'chart',
          initOption: { renderer: 'svg', width: 480, height: 240 },
          autoResize: false,
          animation: false,
          onReady: ready,
          ...props,
        }),
    }),
    { global: { provide } },
  )
  wrappers.push(wrapper)
  return {
    props,
    ready,
    get chart() {
      return ready.mock.lastCall![0]
    },
    get option(): any {
      return this.chart.getOption()
    },
    get exposed(): EChartsType | undefined {
      return (wrapper.vm.$refs.chart as InstanceType<typeof IxChart>).getEChartsInstance()
    },
  }
}

it('applies a change to only setOptionOpts and removes unmatched series', async () => {
  const item = mountChart(IxChart, {
    xAxis: { data: ['A'] },
    yAxis: {},
    series: [
      { id: 'one', type: 'bar', data: [1] },
      { id: 'two', type: 'bar', data: [2] },
    ],
  })
  item.props.series.pop()
  await nextTick()
  expect(item.option.series).toHaveLength(2)
  item.props.setOptionOpts = { replaceMerge: ['series'] }
  await nextTick()
  expect(item.option.series.map((series: { id: string }) => series.id)).toEqual(['one'])
})

it('clears a native title without touching the remaining chart option', async () => {
  const item = mountChart(IxChart, { title: { text: 'Before' }, backgroundColor: '#123456' })
  item.props.title = null
  await nextTick()
  expect(item.option.title).toEqual([])
  expect(item.option.backgroundColor).toBe('#123456')
})

it.each([
  ['bar', IxBarChart, undefined],
  ['line', IxLineChart, undefined],
  ['area', IxLineChart, 'striped'],
] as const)(
  '%s preserves zoom and selection on data refresh and removes stale series',
  async (_, component, area) => {
    const item = mountChart(component, {
      categories: ['A', 'B', 'C', 'D', 'E'],
      ...(area && { area }),
      series: [
        { name: 'One', data: [1, 2, 3, 4, 5] },
        { name: 'Two', data: [5, 4, 3, 2, 1] },
      ],
      dataZoom: [{ id: 'zoom', type: 'inside' }],
      legend: {},
      setOptionOpts: { notMerge: false },
    })
    const original = item.chart
    original.dispatchAction({ type: 'dataZoom', dataZoomId: 'zoom', start: 25, end: 75 })
    original.dispatchAction({ type: 'legendUnSelect', name: 'Two' })
    item.props.series[0].data = [2, 3, 4, 5, 6]
    await nextTick()
    expect(item.option.dataZoom[0]).toMatchObject({ start: 25, end: 75 })
    expect(item.option.legend[0].selected.Two).toBe(false)
    item.props.series.pop()
    await nextTick()
    expect(item.option.series.map((series: { name: string }) => series.name)).toEqual(['One'])
    expect(item.option.dataZoom[0]).toMatchObject({ start: 25, end: 75 })
    item.props.series = []
    await nextTick()
    expect(item.option.series).toEqual([])
    expect(item.chart).toBe(original)
  },
)

it('mounts Radar before dimensions are ready and applies partial native overrides', async () => {
  const data = [{ name: 'One', value: [10, 20, 30] }]
  const radar = { splitNumber: 3 }
  const tooltip = { confine: false }
  const item = mountChart(IxRadarChart, { data, radar, tooltip })
  expect(item.option.series).toEqual([])
  const indicator = ['A', 'B', 'C'].map(name => ({ name, max: 100 }))
  item.props.indicator = indicator
  await nextTick()
  expect(item.option.radar[0]).toMatchObject({ indicator, splitNumber: 3 })
  expect(item.option.series[0].data).toEqual(data)
  expect(item.option.tooltip[0]).toMatchObject({ confine: false, formatter: expect.any(Function) })
  expect(createRadarOption({ radar, indicator, data, tooltip })).toMatchObject({
    radar: { indicator, splitNumber: 3 },
    series: [{ data }],
    tooltip: { confine: false, formatter: expect.any(Function) },
  })
})

it.each([
  [IxBarChart, BAR_CHART_TOKEN],
  [IxLineChart, LINE_CHART_TOKEN],
] as const)(
  'uses chart defaults in both modes and reserves category labels for categories',
  (component, token) => {
    const provide = { [token]: { title: { text: 'Injected' }, tooltip: { confine: true } } }
    const props = { data: [1, 2, 3], xAxis: { data: ['Custom'] } }
    const native = mountChart(
      component,
      { ...props, legend: { show: true }, grid: { top: 0 } },
      provide,
    )
    expect(native.option.title[0].text).toBe('Injected')
    expect(native.option.grid[0].top).toBe(0)
    expect(native.option.legend[0].show).toBe(true)
    const category = mountChart(component, { ...props, categories: ['A', 'B', 'C'] }, provide)
    expect(category.option.title[0].text).toBe('Injected')
    expect(category.option.xAxis[0].data).toEqual(['A', 'B', 'C'])
    expect(category.option.tooltip[0].confine).toBe(true)
  },
)

it.each([
  ['native Bar', IxBarChart, false],
  ['native Line', IxLineChart, false],
  ['category Bar', IxBarChart, true],
  ['category Line', IxLineChart, true],
] as const)('%s respects caller-owned grid bounds', async (_, component, category) => {
  const bounds = { top: 56, bottom: 52, left: 56, right: 32 }
  const item = mountChart(component, {
    data: [10, 20, 30],
    ...(category ? { categories: ['A', 'B', 'C'] } : { xAxis: { data: ['A', 'B', 'C'] } }),
    grid: { ...bounds, containLabel: false },
  })
  expect(item.option.grid[0]).toMatchObject({ ...bounds, outerBoundsMode: 'none' })
  expect(item.chart.convertToPixel({ yAxisIndex: 0 }, 0)).toBe(240 - bounds.bottom)

  const outerBounds = { left: 60, right: 36, top: 60, bottom: 56 }
  item.props.grid = { ...bounds, containLabel: false, outerBounds, outerBoundsContain: 'all' }
  await nextTick()
  expect(item.option.grid[0]).toMatchObject({
    outerBoundsMode: 'auto',
    outerBoundsContain: 'all',
    outerBounds,
  })
  expect(item.chart.convertToPixel({ yAxisIndex: 0 }, 0)).toBeLessThan(240 - bounds.bottom)

  item.props.grid = [
    { ...bounds, containLabel: false },
    { ...bounds, containLabel: false, outerBoundsMode: 'same', outerBoundsClampWidth: '50%' },
  ]
  await nextTick()
  expect(item.option.grid).toMatchObject([
    { ...bounds, outerBoundsMode: 'none' },
    { ...bounds, outerBoundsMode: 'same', outerBoundsClampWidth: '50%' },
  ])
})

it('replaces the entire shorthand data array and computes Pie totals from the final series', async () => {
  for (const component of [IxBarChart, IxLineChart, IxPieChart]) {
    const item = mountChart(component, { data: [1, 2, 3], series: [{ data: [9] }] })
    expect(item.option.series[0].data).toEqual([9])
    if (component === IxPieChart) {
      expect(item.option.title[0].text).toBe('9')
      item.props.title = null
      await nextTick()
      expect(item.option.title).toEqual([])
    }
  }
})

it('clears removed automatic Pie styles and retains legend selections when values change', async () => {
  const item = mountChart(IxPieChart, {
    layoutMode: 'auto',
    data: [
      { name: 'A', value: 1 },
      { name: 'B', value: 2 },
    ],
    seriesStyle: { emphasis: { focus: 'self' } },
  })
  const series = () =>
    item.option.series.find((series: { id: string }) => series.id === 'ix-pie-data')
  expect(series().emphasis.focus).toBe('self')
  item.chart.dispatchAction({ type: 'legendUnSelect', name: 'B' })
  delete item.props.seriesStyle
  item.props.legend = { itemGap: 8 }
  item.props.data = [
    { name: 'A', value: 3 },
    { name: 'B', value: 4 },
  ]
  await nextTick()
  expect(series().emphasis.focus).toBeUndefined()
  expect(item.option.legend[0].selected.B).toBe(false)
})

it('feeds the measured dimension to native tooltip formatters and escapes their results', () => {
  const valueFormatter = vi.fn(() => 'R&D < 10')
  const item = mountChart(IxLineChart, {
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    data: [['2026-11-12', 10]],
    tooltip: { valueFormatter },
  })
  const html = item.option.tooltip[0].formatter({
    name: 'R&D < 10',
    seriesIndex: 0,
    dataIndex: 0,
    value: ['2026-11-12', 10],
  })
  expect(valueFormatter).toHaveBeenCalledWith(10, 0)
  expect(html.match(/R&amp;D &lt; 10/g)).toHaveLength(2)
})

it.each([IxGaugeChart, IxLiquidFillChart])(
  'normalizes native template attrs and separates plot and chart backgrounds',
  component => {
    const item = mountChart(component, {
      value: 25,
      backgroundColor: '#123456',
      'chart-background-color': '#abcdef',
      'text-style': { fontSize: 41 },
    })
    expect(item.option.backgroundColor).toBe('#abcdef')
    expect(item.option.textStyle.fontSize).toBe(41)
    expect(item.option['text-style']).toBeUndefined()
  },
)

it('exposes the same instance as onReady for every chart, including after reinitialization', async () => {
  const components = [
    IxChart,
    IxBarChart,
    IxLineChart,
    IxPieChart,
    IxRadarChart,
    IxGaugeChart,
    IxLiquidFillChart,
  ]
  for (const component of components) {
    const item = mountChart(component, {})
    const original = item.chart
    expect(item.exposed).toBe(original)
    item.props.theme = 'dark'
    await nextTick()
    expect(original.isDisposed()).toBe(true)
    expect(item.exposed).toBe(item.chart)
    expect(item.ready).toHaveBeenCalledTimes(2)
  }
})

it.each([
  ['bar', IxBarChart, { layout: 'horizontal' }],
  ['line', IxLineChart, {}],
  ['stacked area', IxLineChart, { area: 'striped', stack: 'total' }],
] as const)(
  '%s keeps a historical window and follows the latest edge on append',
  async (_, component, extra) => {
    const item = mountChart(component, {
      ...extra,
      categories: ['A', 'B', 'C', 'D', 'E', 'F'],
      data: [1, 2, 3, 4, 5, 6],
      dataZoom: { id: 'window', type: 'inside', start: 0, end: 100 },
    })
    const window = () => item.option.dataZoom[0]
    item.chart.dispatchAction({
      type: 'dataZoom',
      dataZoomId: 'window',
      startValue: 1,
      endValue: 3,
    })
    item.props.categories.push('G', 'H')
    item.props.data.push(7, 8)
    await nextTick()
    expect(window()).toMatchObject({ startValue: 1, endValue: 3 })

    item.chart.dispatchAction({
      type: 'dataZoom',
      dataZoomId: 'window',
      startValue: 5,
      endValue: 7,
    })
    item.props.categories = [...item.props.categories, 'I', 'J']
    item.props.data = [...item.props.data, 9, 10]
    await nextTick()
    expect(window()).toMatchObject({ startValue: 7, endValue: 9 })

    item.props.categories.push('K')
    item.props.data.push(11)
    item.props.dataZoom = { id: 'window', type: 'inside', startValue: 0, endValue: 2 }
    await nextTick()
    expect(window()).toMatchObject({ startValue: 0, endValue: 2 })
  },
)

it.each([IxChart, IxLineChart])(
  'restores zoom and legend state on theme changes',
  async component => {
    const categories = ['A', 'B', 'C', 'D', 'E']
    const item = mountChart(component, {
      ...(component === IxChart
        ? { xAxis: { type: 'category', data: categories }, yAxis: { type: 'value' } }
        : { categories }),
      legend: {},
      series: [
        { name: 'Alpha', type: 'line', data: [1, 2, 3, 4, 5] },
        { name: 'Beta', type: 'line', data: [2, 4, 6, 8, 10] },
      ],
      dataZoom: { id: 'window', type: 'inside', startValue: 0, endValue: 4 },
    })
    const oldChart = item.chart
    oldChart.dispatchAction({ type: 'dataZoom', dataZoomId: 'window', startValue: 1, endValue: 3 })
    oldChart.dispatchAction({ type: 'legendUnSelect', name: 'Beta' })
    item.props.theme = 'dark'
    await nextTick()
    expect(oldChart.isDisposed()).toBe(true)
    expect(item.option.dataZoom[0]).toMatchObject({ startValue: 1, endValue: 3 })
    expect(item.option.legend[0].selected.Beta).toBe(false)

    item.props.theme = 'seer'
    item.props.dataZoom = { id: 'window', type: 'inside', startValue: 0, endValue: 2 }
    item.props.legend = { selected: { Beta: true } }
    await nextTick()
    expect(item.option.dataZoom[0]).toMatchObject({ startValue: 0, endValue: 2 })
    expect(item.option.legend[0].selected.Beta).toBe(true)
  },
)
