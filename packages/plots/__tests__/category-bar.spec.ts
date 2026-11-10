import type { DefaultLabelFormatterCallbackParams } from 'echarts'
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
