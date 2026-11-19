import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import type { EChartsType } from 'echarts/core'
import { convertArray } from '@idux/charts-core'
import { describe, expect, it } from 'vitest'

import { createCategoryBarOption } from '../bar/src/createCategoryBarOption'
import type { BarChartProps } from '../bar/src/useBarOption'

const categories = ['A', 'B', 'C', 'D', 'E', 'F']

function build(attrs: BarChartProps, layout?: BarChartProps['layout']) {
  return createCategoryBarOption(
    { categories, layout },
    { data: [1, 2, 3, 4, 5, 6] },
    attrs,
    600,
    {},
    false,
    () => undefined,
  ).option
}

describe('category bar option', () => {
  it('uses opaque muted text on dark horizontal-above tracks and preserves label overrides', () => {
    const labelFor = (dark: boolean, theme = {}, label: BarChartProps['label'] = undefined) => {
      const { option } = createCategoryBarOption(
        { categories: ['A'], layout: 'horizontal-above' },
        { data: [10], label },
        {},
        600,
        theme,
        dark,
        () => undefined,
      )
      const bar = convertArray(option.series)[0]!
      return bar.type === 'bar' ? bar.label : undefined
    }
    expect(labelFor(true)).toMatchObject({
      show: true,
      position: 'right',
      color: '#B2B8C2',
    })
    expect(labelFor(true, { textColor: '#FFFFFF' })).toHaveProperty('color', '#B2B8C2')
    expect(
      labelFor(true, { textColor: '#FFFFFF' }, { color: '#FFFF00', show: false }),
    ).toMatchObject({ color: '#FFFF00', show: false })
    expect(labelFor(false)).not.toHaveProperty('color')
  })

  it('keeps stack labels working while a theme change clears the chart model', () => {
    const { option } = createCategoryBarOption(
      { categories: ['A'] },
      { stack: 'total' },
      { series: [{ data: [2] }, { data: [3] }] },
      600,
      {},
      false,
      () => ({ getOption: () => null }) as unknown as EChartsType,
    )
    const bar = convertArray(option.series)[1]!
    if (bar.type !== 'bar' || typeof bar.label?.formatter !== 'function')
      throw new Error('Expected stack label formatter')
    expect(bar.label.formatter({ dataIndex: 0 } as DefaultLabelFormatterCallbackParams)).toBe('5')
  })

  it.each(['vertical', 'horizontal', 'horizontal-above'] as const)(
    'applies default labels in the %s layout and merges caller styles',
    layout => {
      const option = build({ series: [{ data: [1], label: { color: 'red' } }] }, layout)
      expect(convertArray(option.series)[0]).toMatchObject({
        label: { show: true, position: layout === 'vertical' ? 'top' : 'right', color: 'red' },
      })
      const grouped = build({ series: [{ data: [1] }, { data: [2] }] }, layout)
      expect(convertArray(grouped.series).slice(0, 2)).toMatchObject([
        { label: { show: false } },
        { label: { show: false } },
      ])
    },
  )

  it('keeps missing reasons and valid zero values across the bar and tooltip', () => {
    const missing = { missingReason: '<offline>', itemStyle: { color: '#123456' } }
    const data = [missing, NaN, Infinity, '-', { value: 0, missingReason: 'Ignore this' }]
    const option = build({ series: [{ name: 'Reported', data }] })

    expect(option.series).toMatchObject([
      { type: 'bar', data: [{ ...missing, value: null }, null, null, null, { value: 0 }, null] },
      { type: 'custom', data: [[0], [1], [2], [3], [5]] },
    ])
    expect(missing).not.toHaveProperty('value')
    const bar = convertArray(option.series)[0]!
    const formatter = convertArray(option.tooltip)[0]?.formatter
    if (typeof formatter !== 'function' || bar.type !== 'bar')
      throw new Error('Expected bar tooltip')
    const showTip = (index: number) =>
      formatter(
        {
          data: bar.data?.[index],
          dataIndex: index,
          seriesType: 'bar',
          seriesName: 'Reported',
          name: categories[index],
        } as DefaultLabelFormatterCallbackParams,
        '',
        () => undefined,
      )
    expect(showTip(0)).toContain('&lt;offline&gt;')
    expect(showTip(0)).not.toContain('[object Object]')
    expect(showTip(4)).toContain('>0<')
    expect(showTip(4)).not.toContain('Ignore this')
  })

  it('defaults only unbound zooms to the category axis', () => {
    const option = build(
      {
        xAxis: { id: 'values' },
        yAxis: { id: 'categories' },
        dataZoom: [
          { type: 'inside', xAxisIndex: 0 },
          { type: 'inside', xAxisId: 'values', startValue: 2, endValue: 3 },
          { type: 'slider', yAxisId: 'categories', startValue: 0, endValue: 2 },
          { type: 'inside' },
        ],
      },
      'horizontal',
    )
    const zooms = convertArray(option.dataZoom)
    expect(zooms[0]).toEqual({ type: 'inside', xAxisIndex: 0 })
    expect(zooms[1]).toEqual({ type: 'inside', xAxisId: 'values', startValue: 2, endValue: 3 })
    expect(zooms[2]).toHaveProperty('yAxisId', 'categories')
    expect(zooms[2]).not.toHaveProperty('yAxisIndex')
    expect(zooms[3]).toEqual({ type: 'inside', yAxisIndex: 0 })
    expect(option.series).toMatchObject([{ type: 'bar', barWidth: 20 }])
    const valueZoom = build({ dataZoom: { yAxisIndex: 0, start: 20 } })
    expect(valueZoom.dataZoom).toMatchObject([{ yAxisIndex: 0, orient: 'vertical' }])
    expect(valueZoom.grid).toMatchObject({ right: 44, bottom: 12 })
    expect(valueZoom.series).toMatchObject([{ type: 'bar', barWidth: 6 }])
  })
})
