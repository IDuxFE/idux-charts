import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import { CustomChart, LineChart } from 'echarts/charts'
import { GraphicComponent, GridComponent, TooltipComponent } from 'echarts/components'
import { init, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import type { CustomSeriesRenderItem } from 'echarts/types/dist/shared'
import { convertArray } from '@idux/charts-core'
import { describe, expect, it } from 'vitest'

import { installCategoryLineGapClipping } from '../line/src/categoryLineGapClipping'
import { createCategoryLineOption } from '../line/src/createCategoryLineOption'
import type { LineChartProps } from '../line/src/useLineOption'
import { getLinearColors, LinearDirection } from '../shared/linearColors'

const categories = ['A', 'B', 'C', 'D', 'E', 'F']

function build(props: LineChartProps, attrs: LineChartProps) {
  return createCategoryLineOption(
    { categories, ...props },
    {},
    attrs,
    600,
    {},
    false,
    () => undefined,
  ).option
}

describe('category line option', () => {
  it('cycles the bar palette for line and legend colors', () => {
    const palette = getLinearColors(LinearDirection.vertical).map(
      color => color.colorStops[0]!.color,
    )
    const series = Array.from({ length: palette.length + 2 }, () => ({ data: [1, 2, 3, 4, 5, 6] }))
    const option = build({}, { series })
    expect(convertArray(option.series).map(line => line.itemStyle?.color)).toEqual([
      ...palette,
      ...palette.slice(0, 2),
    ])
  })

  it('marks an isolated gap without reporting an interpolated value in the tooltip', () => {
    const reason = '<offline>'
    const data = [1, { value: null, missingReason: reason }, 3, 4, 5, 6]
    const option = build({}, { series: [{ name: 'Flow', data }] })
    const [line] = convertArray(option.series)
    expect(line).toMatchObject({
      type: 'line',
      connectNulls: true,
      data,
      markPoint: { data: [{ coord: [1, 2] }] },
    })
    const formatter = convertArray(option.tooltip)[0]?.formatter
    if (typeof formatter !== 'function') throw new Error('Expected line tooltip')
    const result = formatter(
      { dataIndex: 1, seriesIndex: 0 } as DefaultLabelFormatterCallbackParams,
      '',
      () => undefined,
    )
    expect(result).toContain('&lt;offline&gt;')
    expect(result).toContain('>B<')
    expect(result).not.toContain('class="charts-tooltips-item"')
    expect(result).not.toContain('>2<')
  })

  it('formats a missing range without hard-coded language and resolves numeric axis IDs', () => {
    const option = build(
      {},
      {
        yAxis: [
          { id: 'rate', name: 'Kbps' },
          { id: '42', name: 'ms' },
        ],
        series: [
          { name: 'Flow', data: [1, null, null, 4, 5, 6] },
          { name: 'Latency', yAxisId: 42, data: [1, 0, 3, 4, 5, 6] },
        ],
      },
    )
    const formatter = convertArray(option.tooltip)[0]?.formatter
    if (typeof formatter !== 'function') throw new Error('Expected line tooltip')
    const result = formatter(
      [
        { dataIndex: 1, seriesIndex: 1 },
        { value: [1], seriesId: 'ix-line-missing', seriesIndex: 2 },
      ] as DefaultLabelFormatterCallbackParams[],
      '',
      () => undefined,
    )
    expect(result).toContain('>B – C<')
    expect(result).toContain('>0 ms<')
    expect(result).not.toContain('>Flow<')
  })

  it('uses one sample spacing per gap and preserves valid values in other series', () => {
    const option = build(
      {},
      {
        series: [{ data: [1, null, null, 4, 0, null] }, { data: [1, 2, 3, 4, 5, 6] }],
      },
    )
    const [line, valid, bands] = convertArray(option.series)
    expect(line).toMatchObject({
      type: 'line',
      connectNulls: true,
      data: [1, null, null, 4, 0, null],
    })
    expect(valid).toMatchObject({ type: 'line', connectNulls: false, data: [1, 2, 3, 4, 5, 6] })
    expect(bands).toMatchObject({
      type: 'custom',
      z: 2,
      maskLines: true,
      data: [[1], [2], [5]],
      encode: { y: -1 },
    })
    if (bands?.type !== 'custom' || typeof bands.renderItem !== 'function')
      throw new Error('Expected band renderer')
    const render = bands.renderItem
    const draw = (width: number) =>
      render(
        {
          coordSys: { type: 'cartesian2d', x: 0, y: 10, width: 500, height: 200 },
        } as unknown as Parameters<CustomSeriesRenderItem>[0],
        {
          value: () => 1,
          coord: () => [100, 0],
          size: () => [width, 0],
        } as unknown as Parameters<CustomSeriesRenderItem>[1],
      )
    expect(draw(20)).toMatchObject({
      shape: { x: 90, y: 10, width: 20, height: 200 },
      style: { fill: 'rgba(254,237,234,1)' },
    })
    expect(draw(40)).toMatchObject({ shape: { x: 80, y: 10, width: 40, height: 200 } })
  })

  it('marks each isolated outage and shades only the continuous missing slots', () => {
    const option = build(
      { categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] },
      {
        series: [
          { data: [1, null, 3, 4, null, null, 7, null, 9] },
          { data: [9, 8, 7, 6, null, null, 3, null, 1], yAxisIndex: 1 },
        ],
      },
    )
    const [first, second, bands] = convertArray(option.series)
    expect(first).toMatchObject({ markPoint: { data: [{ coord: [1, 2] }, { coord: [7, 8] }] } })
    expect(second).toMatchObject({ markPoint: { data: [{ coord: [7, 2] }] } })
    expect(bands).toMatchObject({ data: [[1], [4], [5], [7]] })
    if (bands?.type !== 'custom' || typeof bands.renderItem !== 'function')
      throw new Error('Expected band renderer')
    const render = bands.renderItem
    const draw = (slot: number) =>
      render(
        {
          coordSys: { type: 'cartesian2d', x: 0, y: 10, width: 500, height: 200 },
        } as unknown as Parameters<CustomSeriesRenderItem>[0],
        {
          value: () => slot,
          coord: () => [100, 0],
          size: () => [20, 0],
        } as unknown as Parameters<CustomSeriesRenderItem>[1],
      )
    expect(draw(1)).toBeUndefined()
    expect(draw(4)).toMatchObject({ type: 'rect' })
    expect(draw(5)).toMatchObject({ type: 'rect' })
    expect(draw(7)).toBeUndefined()
  })

  it('draws a single stacked gap and only lists reported values in the tooltip', () => {
    const reason = 'Collector offline'
    const data = [2, { value: null, missingReason: reason }, 6, 8, 10, 12]
    const option = build(
      { area: 'striped' },
      {
        series: [
          { name: 'Flow', data, stack: 'total', itemStyle: { color: '#20CC94' } },
          { name: 'Other', data: [1, 0, 5, 7, 9, 11], stack: 'total' },
        ],
      },
    )
    const [line, valid, band] = convertArray(option.series)
    expect(line).toMatchObject({
      showSymbol: true,
      showAllSymbol: true,
      symbol: 'none',
      data: [
        2,
        {
          value: null,
          ixLineInterpolation: { sample: { value: null, missingReason: reason }, coordinate: 4 },
          symbol: 'circle',
          symbolSize: 9,
          itemStyle: { color: '#20CC94', borderColor: '#FFFFFF', borderWidth: 3 },
        },
        6,
        8,
        10,
        12,
      ],
    })
    expect(valid).toMatchObject({ showSymbol: false, data: [1, 0, 5, 7, 9, 11] })
    expect(band).toMatchObject({ type: 'custom', data: [[1]] })
    const formatter = convertArray(option.tooltip)[0]?.formatter
    if (typeof formatter !== 'function') throw new Error('Expected line tooltip')
    const result = formatter(
      [
        { dataIndex: 1, seriesIndex: 0, value: 4 },
        { dataIndex: 1, seriesIndex: 1, value: 0 },
      ] as DefaultLabelFormatterCallbackParams[],
      '',
      () => undefined,
    )
    expect(result).toContain('>Other<')
    expect(result).toContain('>0<')
    expect(result).toContain(reason)
    expect(result).not.toContain('>Flow<')
    expect(result).not.toContain('>4<')
    const resultWithoutMissingSeries = formatter(
      [{ dataIndex: 1, seriesIndex: 1, value: 0 }] as DefaultLabelFormatterCallbackParams[],
      '',
      () => undefined,
    )
    expect(resultWithoutMissingSeries).toBe(result)
  })

  it('uses a covering band only when every series is missing at the same samples', () => {
    const data = [1, null, null, 4, 5, 6]
    const option = build(
      { area: true },
      {
        series: [
          { data, stack: 'total' },
          { data, stack: 'total' },
        ],
      },
    )
    expect(option.series).toMatchObject([
      { type: 'line', data, connectNulls: true },
      { type: 'line', data, connectNulls: true },
      { type: 'custom', data: [[1], [2]], z: 4 },
    ])
  })

  it('shares the same area boundary on both sides of a stacked outage', () => {
    use([
      LineChart,
      CustomChart,
      GraphicComponent,
      GridComponent,
      TooltipComponent,
      SVGRenderer,
      installCategoryLineGapClipping,
    ])
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 300 })
    try {
      chart.setOption(
        build(
          { area: true },
          {
            animation: false,
            legend: { show: false },
            series: [
              { stack: 'total', data: [3, 4, null, null, 6, 5], areaStyle: { color: '#FFC145' } },
              { stack: 'total', data: [5, 6, null, null, 7, 8], areaStyle: { color: '#F5654F' } },
            ],
          },
        ),
      )
      const svg = new DOMParser().parseFromString(chart.renderToSVGString(), 'image/svg+xml')
      const vertices = (color: string) => {
        const path = svg.querySelector(`path[fill="${color}"]`)?.getAttribute('d') ?? ''
        return [...path.matchAll(/[ML]([\d.-]+)[ ,]([\d.-]+)/g)].map(([, x, y]) => [x, y])
      }
      const lower = vertices('#FFC145')
      const upper = vertices('#F5654F')
      expect(lower).toHaveLength(8)
      expect(upper).toHaveLength(8)
      expect(upper.slice(4).reverse()).toEqual(lower.slice(0, 4))
    } finally {
      chart.dispose()
    }
  })

  it('uses two tinted stripes throughout a stacked area', () => {
    const option = build(
      { area: 'striped' },
      { series: [{ data: [1, 2, 3, 4, 5, 6], stack: 'total', itemStyle: { color: '#458FFF' } }] },
    )
    const [line] = convertArray(option.series)
    const fill = line?.type === 'line' ? line.areaStyle?.color : undefined
    expect(fill).toMatchObject({ imageWidth: 4, imageHeight: 1, repeat: 'repeat' })
    if (typeof fill !== 'object' || !('image' in fill) || typeof fill.image !== 'string')
      throw new Error('Expected a repeating stripe image')
    const svg = decodeURIComponent(fill.image)
    expect(svg).toContain("width='2' height='1' fill='rgba(69, 143, 255, 0.3)'")
    expect(svg).toContain("x='2' width='2' height='1' fill='rgba(69, 143, 255, 0.21)'")
  })

  it('gives each single-series stripe a width of 2px and a shared fade', () => {
    const option = build({ area: 'striped' }, { series: [{ data: [1, 2, 3, 4, 5, 6] }] })
    const [line] = convertArray(option.series)
    const fill = line?.type === 'line' ? line.areaStyle?.color : undefined
    expect(fill).toMatchObject({ imageWidth: 4, repeat: 'repeat' })
    if (typeof fill !== 'object' || !('image' in fill) || typeof fill.image !== 'string')
      throw new Error('Expected a repeating stripe image')
    const svg = decodeURIComponent(fill.image)
    expect(svg).toContain("width='2' height='128' fill='url(#fade)'")
    expect(svg).toContain("x='2' width='2' height='128' fill='url(#fade)' opacity='0.7'")
    expect(svg).toContain("offset='100%' stop-color='rgba(69, 143, 255, 0)'")
  })

  it('retains zero values, native series styles and the named reference line', () => {
    const data = categories.map(() => 0)
    const option = build(
      { area: true, zeroText: 'No activity', referenceLine: { name: 'Threshold', value: 5 } },
      {
        dataZoom: { type: 'slider' },
        series: [{ name: 'Flow', data, areaStyle: { opacity: 0.5 } }],
      },
    )
    expect(option.series).toMatchObject([
      { type: 'line', data, areaStyle: { color: { type: 'linear' }, opacity: 0.5 } },
      { type: 'line', name: 'Threshold', markLine: { data: [{ yAxis: 5 }] } },
    ])
    expect(option.legend).toMatchObject({ data: [{ name: 'Flow' }, { name: 'Threshold' }] })
    expect(option.dataZoom).toMatchObject([{ xAxisIndex: 0 }])
    expect(option.graphic).toMatchObject([{ style: { text: 'No activity' } }])
  })
})
