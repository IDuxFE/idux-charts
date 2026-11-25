import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import type { CustomSeriesRenderItem } from 'echarts/types/dist/shared'
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

  it.each(['vertical', 'horizontal', 'horizontal-above'] as const)(
    'hides zero labels only in the above layout (%s)',
    layout => {
      const zero = { value: 0, label: { show: true, color: 'red' } }
      const option = build({ series: [{ data: [0, zero, '0', 2, null, -1] }] }, layout)
      const bar = convertArray(option.series)[0]!
      expect(bar).toMatchObject({
        data:
          layout === 'horizontal-above'
            ? [
                { value: 0, label: { show: false } },
                { value: 0, label: { show: false, color: 'red' } },
                { value: '0', label: { show: false } },
                2,
                null,
                -1,
              ]
            : [0, zero, '0', 2, null, -1],
      })
      expect(zero.label.show).toBe(true)
    },
  )

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

describe('category bar rendering boundaries', () => {
  it.each(['vertical', 'horizontal', 'horizontal-above'] as const)(
    'draws missing bands with category geometry in the %s layout',
    layout => {
      const option = build({ series: [{ data: [1, null, 3, 4, 5, 6] }] }, layout)
      const band = convertArray(option.series).find(series => series.type === 'custom')!
      if (band.type !== 'custom' || typeof band.renderItem !== 'function')
        throw new Error('Expected missing band')
      const render = (
        index: number,
        size: unknown = [40, 30],
        coord = [100, 70],
        type = 'cartesian2d',
      ) =>
        (band.renderItem as CustomSeriesRenderItem)(
          {
            coordSys: { type, x: 10, y: 20, width: 400, height: 180 },
          } as unknown as Parameters<CustomSeriesRenderItem>[0],
          {
            value: () => index,
            coord: () => coord,
            size: () => size,
          } as unknown as Parameters<CustomSeriesRenderItem>[1],
        )
      const missing = render(1)
      expect(missing).toMatchObject({ type: 'rect', emphasisDisabled: true })
      expect(missing).toMatchObject(
        layout === 'vertical'
          ? { shape: { y: 20, height: 180 } }
          : { shape: { x: 10, width: 400 } },
      )
      expect(render(1, null)).toBeUndefined()
      expect(render(1, [40, 30], [], 'polar')).toBeUndefined()
      expect(render(1, [40, 30], [])).toBeUndefined()
      if (layout === 'horizontal-above') {
        expect(convertArray(option.series)[0]).toMatchObject({ showBackground: false })
        expect(render(0)).toMatchObject({
          shape: { x: 10, width: 400 },
          style: { fill: 'rgba(143, 162, 191, 0.18)' },
        })
        expect(render(0, [40, 0])).toMatchObject({ type: 'rect' })
      }
    },
  )

  it('keeps reference lines inside automatic bounds, including empty and negative ranges', () => {
    for (const layout of ['vertical', 'horizontal-above'] as const) {
      const { option } = createCategoryBarOption(
        { categories: ['A'], layout, referenceLine: { value: -5 } },
        { data: [0] },
        {},
        600,
        {},
        false,
        () => undefined,
      )
      const axis = convertArray(layout === 'vertical' ? option.yAxis : option.xAxis)[0]!
      if (typeof axis.max !== 'function' || typeof axis.min !== 'function')
        throw new Error('Expected bounds')
      expect(axis.min({ min: -2, max: 10 })).toBe(-5)
      expect(axis.min({ min: NaN, max: 10 })).toBe(-5)
      expect(axis.min({ min: -8, max: 10 })).toBe(-8)
      expect(axis.max({ min: 0, max: NaN })).toBe(1)
      expect(axis.max({ min: 0, max: 10 })).toBeCloseTo(layout === 'vertical' ? 10 : 11.3)
    }
  })

  it('places multi-column tooltips inside the viewport and formats values and missing reasons', () => {
    const series = Array.from({ length: 11 }, (_, index) => ({
      name: `Series ${index}`,
      data: [index],
    }))
    const option = build({
      series,
      tooltip: { valueFormatter: value => `${value} units`, extraCssText: 'color:red;' },
    })
    const tooltip = convertArray(option.tooltip)[0]!
    expect(tooltip).toMatchObject({
      enterable: true,
      extraCssText: '--ix-chart-tooltip-columns-max-width: 576px;color:red;',
    })
    if (typeof tooltip.position !== 'function' || typeof tooltip.formatter !== 'function')
      throw new Error('Expected tooltip callbacks')
    expect(
      tooltip.position([590, 290], {} as never, null as never, null as never, {
        viewSize: [600, 300],
        contentSize: [200, 100],
      }),
    ).toEqual([400, 130])
    const tip = tooltip.formatter(
      [
        { seriesType: 'bar', seriesName: 'Series 0', data: 0, dataIndex: 0, name: 'A' },
        {
          seriesType: 'bar',
          seriesName: 'Series 1',
          data: { value: null, missingReason: '<offline>' },
          dataIndex: 0,
          name: 'A',
        },
        { seriesType: 'bar', data: null, dataIndex: 0, name: 'A' },
        { seriesType: 'line', data: 99, dataIndex: 0, name: 'A' },
      ] as DefaultLabelFormatterCallbackParams[],
      '',
      () => undefined,
    )
    expect(tip).toContain('0 units')
    expect(tip).toContain('Series 1: &lt;offline&gt;')
    expect(tip).toContain(': –')
    expect(tip).not.toContain('99')
    expect(
      tooltip.formatter(
        { seriesType: 'line' } as DefaultLabelFormatterCallbackParams,
        '',
        () => undefined,
      ),
    ).toBe('')
    const custom = () => 'custom'
    expect(
      convertArray(build({ series, tooltip: { formatter: custom } }).tooltip)[0],
    ).toMatchObject({ formatter: custom })
    expect(
      convertArray(build({ series, tooltip: { formatter: custom } }).tooltip)[0],
    ).not.toHaveProperty('position')
  })
})
