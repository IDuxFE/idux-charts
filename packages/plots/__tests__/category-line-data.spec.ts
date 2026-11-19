import type { CustomSeriesRenderItem } from 'echarts/types/dist/shared'
import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import { convertArray } from '@idux/charts-core'
import { describe, expect, it } from 'vitest'
import {
  createCategoryLineTooltip,
  createMissingBands,
  measurement,
  normalizeLineData,
} from '../line/src/categoryLineData'
import { createCategoryLineOption } from '../line/src/createCategoryLineOption'

describe('category line missing data', () => {
  it('distinguishes numeric strings and zero from invalid, blank, tuple and date samples', () => {
    expect(['0', ' 2.5 ', '-3', 0].map(measurement)).toEqual([0, 2.5, -3, 0])
    for (const value of ['', '  ', 'unknown', NaN, Infinity, null, undefined, [1, 2], new Date()])
      expect(measurement(value)).toBeUndefined()
    const reported: Array<number | undefined> = []
    expect(
      normalizeLineData([{ value: '' }, { value: '4' }], ['A', 'B', 'C'], (_, value) =>
        reported.push(value),
      ),
    ).toEqual([{ value: null }, { value: '4' }, null])
    expect(reported).toEqual([undefined, 4, undefined])
  })

  it('handles missing rendering contexts, fractional and negative band sizes', () => {
    const draw = (layer: boolean, params: object, api: object) => {
      const band = createMissingBands([1], [1], 'red', layer ? { z: 2 } : undefined, false)
      return (band.renderItem as CustomSeriesRenderItem)(params as never, api as never)
    }
    const params = { coordSys: { type: 'cartesian2d', x: 0, y: 10, width: 100, height: 50 } }
    const api = { value: () => 1, coord: () => [30, 0], size: () => [-0.5, 0] }
    expect(draw(true, params, api)).toMatchObject({
      shape: { x: 29.75, y: 10, width: 0.5, height: 50 },
    })
    expect(draw(false, params, api)).toBeUndefined()
    expect(draw(true, {}, api)).toBeUndefined()
    expect(draw(true, params, { ...api, size: undefined })).toBeUndefined()
    expect(draw(true, params, { ...api, coord: () => [] })).toBeUndefined()
    expect(draw(true, params, { ...api, size: () => [] })).toMatchObject({ shape: { width: 0 } })
    expect(draw(true, params, { ...api, size: () => [500, 0] })).toMatchObject({
      shape: { width: 100 },
    })
  })

  it('formats bound axis units, explicit value formatters and band-only tooltip anchors safely', () => {
    const categories = ['A', 'B', 'C']
    const values = [
      [1, null, 3],
      [0, { value: null, missingReason: 'offline' }, 2],
    ]
    const lines = [{ name: 'One', yAxisId: '42' }, { name: 'Two' }]
    const format = createCategoryLineTooltip(
      categories,
      lines,
      values,
      [{ name: 'ms' }, { id: 42, name: 'kbps' }],
      [1],
    )
    const tip = (input: unknown) =>
      format(input as DefaultLabelFormatterCallbackParams, '', () => undefined)
    expect(tip({ dataIndex: 0, seriesIndex: 0 })).toContain('1 kbps')
    expect(tip({ dataIndex: 0 })).toBe('')
    expect(tip({ value: [1], seriesId: 'ix-line-missing' })).toContain('offline')
    expect(tip({ value: [0], seriesId: 'ix-line-missing' })).toContain('>A<')
    expect(tip([])).toBe('')
    expect(tip({ dataIndex: 99, seriesIndex: 0 })).toBe('')
    const custom = createCategoryLineTooltip(
      categories,
      lines,
      values,
      undefined,
      [],
      (value, index) => `${value}@${index}`,
    )
    expect(
      custom(
        { dataIndex: 0, seriesIndex: 1 } as DefaultLabelFormatterCallbackParams,
        '',
        () => undefined,
      ),
    ).toContain('0@0')
    const scalar = createCategoryLineTooltip(categories, [{ name: 'Raw' }], [[0]], undefined, [])
    expect(
      scalar(
        { dataIndex: 0, seriesIndex: 0 } as DefaultLabelFormatterCallbackParams,
        '',
        () => undefined,
      ),
    ).toContain('>0<')
  })

  it('bounds reference ranges, preserves explicit limits and honors native interpolation/marker styles', () => {
    const build = (props = {}, attrs = {}, dark = false) =>
      createCategoryLineOption(
        { categories: ['A', 'B', 'C'], ...props },
        { data: [0, 0, 0] },
        attrs,
        500,
        {},
        dark,
        () => undefined,
      ).option
    const option = build({ referenceLine: { value: -5 } })
    const axis = convertArray(option.yAxis)[0]!
    if (typeof axis.min !== 'function' || typeof axis.max !== 'function')
      throw new Error('Expected reference bounds')
    expect(axis.min({ min: NaN, max: 10 })).toBe(-5)
    expect(axis.min({ min: -10, max: 10 })).toBe(-10)
    expect(axis.max({ min: -10, max: NaN })).toBe(1)
    expect(axis.max({ min: -10, max: 10 })).toBe(10)
    expect(
      convertArray(
        build({ referenceLine: { value: -5 } }, { yAxis: { min: -20, max: 20 } }).yAxis,
      )[0],
    ).toMatchObject({ min: -20, max: 20 })
    const input = {
      series: [
        {
          data: [{ value: 1, symbol: 'diamond' }, null, 3],
          smooth: true,
          lineStyle: { color: 'red' },
          showSymbol: false,
        },
      ],
    }
    expect(build({ area: true }, input).series).toMatchObject([
      { data: [{ symbol: 'none' }, { symbol: 'circle', itemStyle: { color: 'red' } }, 3] },
      {},
    ])
    const native = build(
      {},
      {
        series: [
          {
            data: [1, null, 3],
            stack: 's',
            connectNulls: false,
            showSymbol: true,
            symbol: 'diamond',
          },
        ],
      },
    )
    expect(convertArray(native.series)[0]).toMatchObject({
      connectNulls: false,
      data: [1, null, 3],
    })
  })
})
