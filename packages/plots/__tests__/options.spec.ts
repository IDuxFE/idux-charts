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
