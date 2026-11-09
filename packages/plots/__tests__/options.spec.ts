import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'
import type { ComputedRef } from 'vue'
import { useBarOption, BAR_CHART_TOKEN } from '../bar/src/useBarOption'
import { useLineOption, LINE_CHART_TOKEN } from '../line/src/useLineOption'
import { usePieOption, PIE_CHART_TOKEN } from '../pie/src/usePieOption'

function setup(
  useOption: (props: any, attrs: any) => ComputedRef<any>,
  props: any,
  attrs: any = {},
  provide = {},
) {
  let option!: ComputedRef<any>
  const wrapper = mount(
    defineComponent({
      setup() {
        option = useOption(props, attrs)
        return () => h('div')
      },
    }),
    { global: { provide } },
  )
  return { option, wrapper }
}

for (const [name, useOption, token] of [
  ['bar', useBarOption, BAR_CHART_TOKEN],
  ['line', useLineOption, LINE_CHART_TOKEN],
] as const) {
  describe(`${name} option`, () => {
    it('builds vertical and horizontal axes without mutating inputs', () => {
      const props = { data: [10, 20], name: 'Visits' }
      const attrs = { xAxis: { data: ['A', 'B'] }, title: { text: 'Title' }, dataZoom: {} }
      const original = structuredClone({ props, attrs })
      const { option, wrapper } = setup(useOption, props, attrs)
      expect(option.value).toMatchObject({
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        grid: { top: 56, bottom: 64 },
        series: [{ type: name, data: [10, 20], name: 'Visits' }],
      })
      expect(option.value.legend).toBeUndefined()
      expect({ props, attrs }).toEqual(original)
      wrapper.unmount()
      const horizontal = setup(useOption, props, { yAxis: { data: ['A', 'B'] } })
      expect(horizontal.option.value).toMatchObject({
        xAxis: { type: 'value' },
        yAxis: { type: 'category' },
      })
      horizontal.wrapper.unmount()
    })

    it('merges injected defaults, caller options and per-series overrides', () => {
      const { option, wrapper } = setup(
        useOption,
        { data: [1], stack: 'total', label: undefined },
        {
          title: { text: 'Title' },
          dataZoom: {},
          grid: { top: 10, bottom: 12 },
          series: [
            { name: 'A', data: [2] },
            { name: 'B', data: [3], stack: 'other' },
          ],
        },
        { [token]: { grid: { left: 75 }, tooltip: { backgroundColor: 'red' } } },
      )
      expect(option.value.grid).toMatchObject({ top: 10, bottom: 12, left: 75 })
      expect(option.value.tooltip.backgroundColor).toBe('red')
      expect(option.value.series).toMatchObject([
        { type: name, data: [2], stack: 'total' },
        { type: name, data: [3], stack: 'other' },
      ])
      expect(option.value.legend).toBeDefined()
      wrapper.unmount()
    })

    it('accepts object series and hides legends explicitly for multiple series', () => {
      const attrs = reactive<any>({ series: { name: 'A', data: [2] } })
      const { option, wrapper } = setup(useOption, {}, attrs)
      expect(option.value.series).toMatchObject([{ type: name, name: 'A', data: [2] }])
      expect(option.value.legend).toBeUndefined()
      attrs.series = [
        { name: 'A', data: [2] },
        { name: 'B', data: [3] },
      ]
      expect(option.value.legend).toBeDefined()
      attrs.legend = false
      expect(option.value.legend).toBeUndefined()
      wrapper.unmount()
    })

    it('formats units, gives valueFormatter precedence and preserves custom formatter', () => {
      const attrs = reactive<any>({ xAxis: { data: ['A'] }, yAxis: { name: '次' } })
      const { option, wrapper } = setup(useOption, {}, attrs)
      const params = [{ name: 'A', seriesName: 'Visits', value: 12, color: '#123456' }]
      expect(option.value.tooltip.formatter([])).toBe('')
      expect(option.value.tooltip.formatter(params)).toContain('12 次')
      attrs.tooltip = { valueFormatter: (value: number) => `${value}%` }
      expect(option.value.tooltip.formatter(params)).toContain('12%')
      expect(option.value.tooltip.formatter(params)).not.toContain('12 次')
      const formatter = vi.fn(() => 'custom')
      attrs.tooltip.formatter = formatter
      expect(option.value.tooltip.formatter).toBe(formatter)
      wrapper.unmount()
    })

    it('updates nested data and accepts an empty dataset', async () => {
      const props = reactive({ data: [1, 2] })
      const { option, wrapper } = setup(useOption, props)
      expect(option.value.series[0].data).toEqual([1, 2])
      props.data[0] = 8
      await nextTick()
      expect(option.value.series[0].data).toEqual([8, 2])
      props.data = []
      expect(option.value.series[0].data).toEqual([])
      wrapper.unmount()
    })
  })
}

describe('pie option', () => {
  it('does not leak the alignment control into ECharts options', () => {
    const { option, wrapper } = setup(
      usePieOption,
      { data: [], align: 'bottom-end' },
      { align: 'bottom-end' },
    )
    expect(option.value).not.toHaveProperty('align')
    expect(option.value.series[0]).not.toHaveProperty('align')
    wrapper.unmount()
  })
  it('computes and updates the total and name, including empty data', () => {
    const props = reactive({
      data: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
      ],
      name: 'Visits',
    })
    const { option, wrapper } = setup(usePieOption, props)
    expect(option.value.title).toMatchObject({ text: '30', subtext: 'Visits' })
    props.data[0].value = 40
    expect(option.value.title.text).toBe('60')
    props.data = []
    expect(option.value.title.text).toBe('0')
    wrapper.unmount()
  })

  it('preserves explicit titles, supports hiding the title and injected defaults', () => {
    const attrs = reactive<any>({ title: { text: 'Custom', subtext: 'Details' } })
    const { option, wrapper } = setup(usePieOption, { data: [] }, attrs, {
      [PIE_CHART_TOKEN]: { radius: ['30%', '70%'], legend: { right: '20%' } },
    })
    expect(option.value.title).toMatchObject({ text: 'Custom', subtext: 'Details' })
    expect(option.value.legend.right).toBe('20%')
    attrs.title = null
    expect(option.value.title).toBeUndefined()
    wrapper.unmount()
  })

  it('supports series-only data and computes its total', () => {
    const { option, wrapper } = setup(
      usePieOption,
      {},
      {
        series: {
          name: 'Visits',
          data: [
            { name: 'A', value: 5 },
            { name: 'B', value: 7 },
          ],
        },
      },
    )
    expect(option.value.series).toMatchObject([{ type: 'pie', data: [{ value: 5 }, { value: 7 }] }])
    expect(option.value.title.text).toBe('12')
    wrapper.unmount()
  })

  it('formats single and array tooltip parameters and handles empty input', () => {
    const { option, wrapper } = setup(usePieOption, { data: [] })
    const formatter = option.value.tooltip.formatter
    const params = { name: 'A', seriesName: 'Visits', value: 12, color: '#123456' }
    expect(formatter(params)).toContain('12')
    expect(formatter([params])).toBe(formatter(params))
    expect(formatter([])).toBe('')
    expect(formatter(undefined)).toBe('')
    wrapper.unmount()
  })
})

it.each([
  [{}, '0'],
  [{ data: [] }, '0'],
  [{ data: [10, 20] }, '30'],
  [
    {
      data: [
        { name: 'missing', value: '-' },
        { name: 'valid', value: 5 },
      ],
    },
    '5',
  ],
])('handles missing, empty, numeric and missing-value pie data: %j', (props, expected) => {
  const { option, wrapper } = setup(usePieOption, props)
  expect(option.value.title.text).toBe(expected)
  wrapper.unmount()
})

for (const [name, useOption] of [
  ['bar', useBarOption],
  ['line', useLineOption],
] as const) {
  describe(`${name} multi-axis regression`, () => {
    it('refreshes unit bindings when series props change without changing attributes', () => {
      const props = reactive({ data: [10], yAxisIndex: 0 })
      const { option, wrapper } = setup(useOption, props, {
        xAxis: { data: ['A'] },
        yAxis: [{ name: 'ms' }, { name: '%' }],
      })
      const params = [{ name: 'A', value: 10, seriesIndex: 0 }]
      expect(option.value.tooltip.formatter(params)).toContain('10 ms')
      props.yAxisIndex = 1
      expect(option.value.tooltip.formatter(params)).toContain('10 %')
      wrapper.unmount()
    })
    it('preserves array axes, bindings, units and gradient markers without mutating inputs', () => {
      const attrs = {
        xAxis: [{ data: ['A'] }],
        yAxis: [{ name: 'ms' }, { id: 'ratio', name: '%', type: 'log' }],
        series: [{ data: [10] }, { data: [20], yAxisIndex: 1 }, { data: [30], yAxisId: 'ratio' }],
      }
      const original = structuredClone(attrs)
      const { option, wrapper } = setup(useOption, {}, attrs)
      expect(option.value.xAxis).toMatchObject([{ type: 'category' }])
      expect(option.value.yAxis).toMatchObject([{ type: 'value' }, { type: 'log' }])
      const html = option.value.tooltip.formatter(
        [2, 0, 1].map(seriesIndex => ({
          name: 'A',
          seriesName: `S${seriesIndex}`,
          seriesIndex,
          value: 10,
          color: { colorStops: [{ color: 'transparent' }, { color: '#458FFF' }] },
        })),
      )
      const host = document.createElement('div')
      host.innerHTML = html
      expect(
        [...host.querySelectorAll('.charts-tooltips-item-value')].map(el => el.textContent),
      ).toEqual(['10 %', '10 ms', '10 %'])
      expect(
        (host.querySelector('.charts-tooltips-item-border') as HTMLElement).style.background,
      ).toBe('rgb(69, 143, 255)')
      expect(attrs).toEqual(original)
      wrapper.unmount()
    })
    it('updates axis shape and units, supports horizontal axes and formatter precedence', () => {
      const attrs = reactive<any>({ xAxis: { data: ['A'] }, yAxis: { name: 'ms' } })
      const { option, wrapper } = setup(useOption, { data: [10] }, attrs)
      const param = { name: 'A', seriesName: 'S', seriesIndex: 0, dataIndex: 0, value: 10 }
      expect(option.value.tooltip.formatter(param)).toContain('10 ms')
      attrs.xAxis = [{ name: 'MB' }, { name: '%' }]
      attrs.yAxis = [{ data: ['A'] }]
      attrs.series = [{ xAxisIndex: 1, data: [10] }]
      expect(option.value.xAxis).toMatchObject([{ type: 'value' }, { type: 'value' }])
      expect(option.value.yAxis).toMatchObject([{ type: 'category' }])
      expect(option.value.tooltip.formatter(param)).toContain('10 %')
      attrs.tooltip = { valueFormatter: (value: number) => `${value} custom` }
      expect(option.value.tooltip.formatter(param)).toContain('10 custom')
      const custom = () => 'override'
      attrs.tooltip = { formatter: custom }
      expect(option.value.tooltip.formatter).toBe(custom)
      wrapper.unmount()
    })
  })
}

it('uses the shared gradient marker color for native pie tooltips', () => {
  const { option, wrapper } = setup(usePieOption, { data: [] })
  expect(
    option.value.tooltip.formatter({
      name: 'P',
      value: 1,
      color: {
        colorStops: [{ color: 'transparent' }, { color: 'red' }],
      },
    }),
  ).toContain('background: red')
  wrapper.unmount()
})

it('preserves the Seer light pointer and inherits other theme colors and caller overrides', () => {
  const attrs = reactive<any>({ xAxis: { data: ['A'] } })
  const { option, wrapper } = setup(useLineOption, {}, attrs)
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBe('#D3D7DE')
  attrs.theme = 'dark'
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBeUndefined()
  attrs.theme = { darkMode: true, tooltip: { axisPointer: { lineStyle: { color: 'purple' } } } }
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBeUndefined()
  attrs.tooltip = { axisPointer: { lineStyle: { color: 'red' } } }
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBe('red')
  delete attrs.tooltip
  delete attrs.theme
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBe('#D3D7DE')
  wrapper.unmount()
})

it('resolves time-axis values and units from the bound value axis', () => {
  const { option, wrapper } = setup(
    useLineOption,
    {},
    {
      xAxis: { type: 'time' },
      yAxis: { name: 'ms' },
      series: [{ data: [[1730000000000, 10]] }],
    },
  )
  expect(option.value.yAxis.type).toBe('value')
  const html = option.value.tooltip.formatter([
    {
      name: 'Monday',
      seriesIndex: 0,
      value: [1730000000000, 10],
      encode: { x: [0], y: [1] },
    },
  ])
  expect(html).toContain('10 ms')
  expect(html).not.toContain('1730000000000')
  wrapper.unmount()
})

it('resolves units independently for series with different grid orientations', () => {
  const { option, wrapper } = setup(
    useLineOption,
    {},
    {
      xAxis: [{ type: 'time' }, { id: 'horizontal', type: 'value', name: 'MB' }],
      yAxis: [
        { type: 'value', name: 'ms' },
        { type: 'category', data: ['A'] },
      ],
      series: [{ data: [10] }, { xAxisId: 'horizontal', yAxisIndex: 1, data: [20] }],
    },
  )
  const html = option.value.tooltip.formatter([
    { name: 'A', seriesIndex: 1, value: 20 },
    { name: 'A', seriesIndex: 0, value: 10 },
  ])
  expect(html).toContain('20 MB')
  expect(html).toContain('10 ms')
  wrapper.unmount()
})

it('uses the merged line theme when choosing pointer defaults', () => {
  const attrs = reactive<any>({ xAxis: { data: ['A'] } })
  const { option, wrapper } = setup(useLineOption, {}, attrs, {
    [LINE_CHART_TOKEN as symbol]: { theme: 'dark' },
  })
  expect(option.value.theme).toBe('dark')
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBeUndefined()
  attrs.theme = 'seer'
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBe('#D3D7DE')
  attrs.tooltip = { axisPointer: { lineStyle: { color: 'red' } } }
  expect(option.value.tooltip.axisPointer.lineStyle.color).toBe('red')
  wrapper.unmount()
})
