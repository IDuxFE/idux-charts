import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import type { SeriesModel } from 'echarts/core'
import { init, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { expect, it } from 'vitest'

import {
  getLineSampleValue,
  installCategoryLineInterpolation,
} from '../line/src/categoryLineInterpolation'

it('draws interpolated samples while returning original values to event consumers after updates', () => {
  use([LineChart, GridComponent, SVGRenderer, installCategoryLineInterpolation])
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 300 })
  const original = { value: null, missingReason: 'offline' }
  try {
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: {},
      series: [
        {
          type: 'line',
          ixLineHasInterpolation: true,
          data: [1, { value: null, ixLineInterpolation: { sample: original, coordinate: 2 } }, 3],
        },
      ],
    })
    const model = (
      chart as unknown as { getModel(): { getSeriesByIndex(index: number): SeriesModel } }
    ).getModel()
    const series = model.getSeriesByIndex(0)
    expect(series.getData().get('y', 1)).toBe(2)
    expect(series.getDataParams(1)).toMatchObject({ data: original, value: null, dataIndex: 1 })
    expect(series.getDataParams(0)).toMatchObject({ data: 1, value: 1 })
    chart.setOption({
      series: [
        { data: [4, { value: null, ixLineInterpolation: { sample: null, coordinate: 5 } }, 6] },
      ],
    })
    expect(series.getData().get('y', 1)).toBe(5)
    expect(series.getDataParams(1)).toMatchObject({ data: null, value: null })
    chart.setOption({ series: [{ ixLineHasInterpolation: false, data: [7, 8, 9] }] })
    expect(series.getDataParams(1)).toMatchObject({ data: 8, value: 8 })
    expect(chart.renderToSVGString()).toContain('<svg')
  } finally {
    chart.dispose()
  }
})

it('retains scalar, tuple and date samples and unwraps object values', () => {
  const date = new Date('2026-01-01')
  for (const sample of [undefined, null, 0, '3', [1, 2], date])
    expect(getLineSampleValue(sample)).toBe(sample)
  expect(getLineSampleValue({ value: 0 })).toBe(0)
})
