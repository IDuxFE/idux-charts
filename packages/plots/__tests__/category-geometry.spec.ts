import type { ChartProps } from '@idux/charts-core'
import type { EChartsType } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import {
  getAboveCategoryLabels,
  getBarHoverWidth,
  getCategoryZoom,
  getMissingBarWidth,
  getVisibleBarWidth,
  syncCategoryBarWidths,
} from '../bar/src/categoryBarWidth'
import { categoryZoomUpdate, targetsCategoryZoomAxis } from '../shared/categoryZoom'

const categories = ['A', 'B', 'C', 'D', 'E', 'F']
function chartFor(option: ChartProps, pixels: unknown[] = [0, 40]) {
  const setOption = vi.fn((update: ChartProps) => {
    if (update.yAxis)
      option.yAxis = {
        ...(Array.isArray(option.yAxis) ? option.yAxis[0] : option.yAxis),
        ...update.yAxis,
      } as ChartProps['yAxis']
    if (update.tooltip) option.tooltip = update.tooltip
    if (update.series) option.series = update.series
  })
  const chart = {
    getOption: () => option,
    convertToPixel: vi.fn((_axis, index: number) => pixels[index]),
    setOption,
  }
  return { ...chart, instance: chart as unknown as EChartsType }
}

describe('category bar geometry', () => {
  it('constrains percentage widths and stacked columns while excluding hidden series', () => {
    expect(
      getBarHoverWidth(
        [
          { name: 'hidden', barWidth: 100 },
          { stack: 'total', barWidth: '50%', barMaxWidth: 12, barGap: '50%' },
          { stack: 'total', barMinWidth: 15 },
          { barWidth: 2, barMinWidth: 4 },
        ],
        { selected: { hidden: false } },
        40,
      ),
    ).toBe(38.5)
    expect(
      getBarHoverWidth([{ barWidth: 20, barMaxWidth: 10, barGap: 0 }, { barWidth: 5 }], undefined),
    ).toBe(27)
    expect(getMissingBarWidth(3, 20)).toBe(10)
    expect(
      getAboveCategoryLabels(
        ['A', 'B', 'C'],
        new Map([
          [0, false],
          [1, true],
        ]),
        20,
        30,
        { align: 'right', verticalAlign: 'middle' },
      ),
    ).toEqual([
      {
        value: 'A',
        textStyle: { align: 'right', verticalAlign: 'middle', padding: [0, 0, 15, 0] },
      },
      {
        value: 'B',
        textStyle: { align: 'right', verticalAlign: 'middle', padding: [0, 0, 20, 0] },
      },
      'C',
    ])
  })

  it('resolves named, reversed, invalid and explicitly value-based zoom windows', () => {
    expect(getVisibleBarWidth(categories, { startValue: 'B', endValue: 'D' })).toBe(20)
    expect(getVisibleBarWidth(categories, { startValue: 100, endValue: 4 })).toBe(20)
    expect(getVisibleBarWidth(categories, { startValue: 5, endValue: 2 })).toBe(10)
    expect(getVisibleBarWidth(categories, { startValue: 'unknown', start: 0, end: 100 })).toBe(6)
    expect(
      getVisibleBarWidth(categories, {
        start: 0,
        end: 100,
        startValue: 2,
        endValue: 3,
        rangeMode: ['value', 'value'],
      }),
    ).toBe(20)
    expect(getCategoryZoom([{ xAxisIndex: 1 }, { yAxisId: '7' }], true, 7)).toEqual({
      yAxisId: '7',
    })
  })

  it('updates horizontal-above labels and pointer geometry once without resetting selection or zoom', () => {
    const option: ChartProps = {
      yAxis: { type: 'category', data: categories },
      series: [{ type: 'bar', id: 'first', data: [1, null], barWidth: 10 }],
      tooltip: { axisPointer: { type: 'line', lineStyle: { width: 1 } } },
    }
    const chart = chartFor(option)
    const missing = new Map([
      [0, true],
      [1, false],
    ])
    const props = { categories, layout: 'horizontal-above' as const }
    syncCategoryBarWidths(chart.instance, props, {}, missing)
    expect(chart.setOption).toHaveBeenCalledExactlyOnceWith({
      tooltip: { axisPointer: { lineStyle: { width: 22 } } },
      yAxis: {
        axisLabel: { padding: [0, 0, 10, 0] },
        data: [
          {
            value: 'A',
            textStyle: { align: 'left', verticalAlign: 'bottom', padding: [0, 0, 15, 0] },
          },
          {
            value: 'B',
            textStyle: { align: 'left', verticalAlign: 'bottom', padding: [0, 0, 15, 0] },
          },
          ...categories.slice(2),
        ],
      },
    })
    // Simulate the chart model's merged pointer type before the next update.
    option.tooltip = { axisPointer: { type: 'line', lineStyle: { width: 22 } } }
    syncCategoryBarWidths(chart.instance, props, {}, missing)
    expect(chart.setOption).toHaveBeenCalledTimes(1)
    expect(chart.convertToPixel).toHaveBeenCalledWith({ yAxisIndex: 0 }, 0)
  })

  it('updates padding independently, respects caller padding/widths and ignores absent geometry', () => {
    const chart = chartFor(
      { yAxis: { axisLabel: { padding: [0, 0, 0, 0] } }, series: [{ type: 'bar', barWidth: 8 }] },
      [undefined, undefined],
    )
    syncCategoryBarWidths(chart.instance, { categories, layout: 'horizontal-above' }, {})
    expect(chart.setOption).toHaveBeenCalledExactlyOnceWith({
      yAxis: { axisLabel: { padding: [0, 0, 9, 0] } },
    })
    chart.setOption.mockClear()
    syncCategoryBarWidths(
      chart.instance,
      { categories, layout: 'horizontal-above' },
      { yAxis: { axisLabel: { padding: 0 } } },
    )
    expect(chart.setOption).not.toHaveBeenCalled()
    const empty = chartFor({ series: [{ type: 'line' }] })
    syncCategoryBarWidths(empty.instance, {}, {})
    syncCategoryBarWidths(empty.instance, { categories }, {})
    expect(empty.setOption).not.toHaveBeenCalled()
    const zoomed = chartFor({
      xAxis: {},
      dataZoom: { xAxisIndex: 0, startValue: 0, endValue: 1 },
      series: [{ type: 'bar', barWidth: 6 }],
    })
    syncCategoryBarWidths(zoomed.instance, { categories, barWidth: 6 }, {})
    syncCategoryBarWidths(zoomed.instance, { categories }, { series: [{ barWidth: 6 }] })
    expect(zoomed.setOption).not.toHaveBeenCalled()
  })
})

describe('growing category zoom windows', () => {
  const old = { categories: ['A', 'B', 'C', 'D'], dataZoom: { xAxisIndex: 0 } }
  const append = { ...old, categories: [...old.categories, 'E', 'F'] }
  it('keeps open, historical and trailing windows in their intended positions', () => {
    const update = categoryZoomUpdate(append, old)!
    expect(update([{ xAxisIndex: 0 }, { xAxisIndex: 1, start: 20 }])).toEqual([
      { xAxisIndex: 0, start: 0, end: 100, startValue: undefined, endValue: undefined },
      { xAxisIndex: 1, start: 20 },
    ])
    expect(update({ xAxisIndex: 0, startValue: 'C', endValue: 'D' })).toMatchObject([
      { startValue: 4, endValue: 5 },
    ])
    expect(update({ xAxisIndex: 0, startValue: 'B', endValue: 'C' })).toMatchObject([
      { startValue: 1, endValue: 2 },
    ])
    expect(
      update({ xAxisIndex: 0, startValue: 'unknown', endValue: 100, start: 33, end: 67 }),
    ).toMatchObject([{ startValue: 1, endValue: 2 }])
    expect(update(undefined)).toEqual([])
  })
  it('preserves horizontal ID-bound windows and refuses incompatible domain changes', () => {
    const previous = { ...old, layout: 'horizontal', axisId: 7, dataZoom: { yAxisId: '7' } }
    const update = categoryZoomUpdate({ ...previous, categories: append.categories }, previous)!
    expect(update({ yAxisId: '7', start: 33 })).toMatchObject([{ startValue: 3, endValue: 5 }])
    for (const next of [
      { ...append, categories: ['X', 'B', 'C', 'D', 'E'] },
      { ...append, categories: ['A'] },
      { ...append, categories: undefined },
      { ...append, layout: 'horizontal' },
      { ...append, axisId: 'new' },
      { ...append, dataZoom: { xAxisIndex: 1 } },
    ])
      expect(categoryZoomUpdate(next, old)).toBeUndefined()
    expect(categoryZoomUpdate(append, { ...old, categories: [] })).toBeUndefined()
    expect(categoryZoomUpdate(old, old)!({ xAxisIndex: 0, start: 20 })).toEqual({
      xAxisIndex: 0,
      start: 20,
    })
    expect(targetsCategoryZoomAxis({ xAxisIndex: 'all' }, 'x')).toBe(true)
    expect(targetsCategoryZoomAxis({ xAxisId: ['4'] }, 'x', 4)).toBe(true)
    expect(targetsCategoryZoomAxis({}, 'y')).toBe(false)
  })
})
