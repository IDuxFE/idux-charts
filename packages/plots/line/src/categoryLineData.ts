import type { LineSeriesOption, CustomSeriesOption } from 'echarts/charts'
import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import type { TooltipComponentOption } from 'echarts/components'
import type { ChartProps } from '@idux/charts-core'
import { convertArray, getTooltipsColor, useTooltipsFormatter } from '@idux/charts-core'
import { escape } from 'lodash-es'

import { getLineSampleValue } from './categoryLineInterpolation'

export type LineChartDataItem = Extract<
  NonNullable<LineSeriesOption['data']>[number],
  { value?: unknown }
> & {
  missingReason?: string
}

type LineData = NonNullable<LineSeriesOption['data']>

export function measurement(item: LineData[number]) {
  const value = getLineSampleValue(item)
  if (typeof value === 'string' && !value.trim()) return undefined
  return (typeof value === 'number' || typeof value === 'string') && Number.isFinite(Number(value))
    ? Number(value)
    : undefined
}

export function normalizeLineData(data: LineData | undefined, categories: string[]): LineData {
  return categories.map((_, index) => {
    const item = data?.[index]
    if (measurement(item) !== undefined) return item
    return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)
      ? { ...item, value: null }
      : null
  })
}

export const missingBandId = 'ix-line-missing'

export interface MissingBandSeries extends CustomSeriesOption {
  maskLines?: boolean
}

export function createMissingBands(
  missing: number[],
  bandSlots: number[],
  color: string,
  layer: Pick<CustomSeriesOption, 'z' | 'zlevel'> | undefined,
  maskLines: boolean,
): MissingBandSeries {
  const visibleSlots = new Set(bandSlots)
  return {
    id: missingBandId,
    type: 'custom',
    encode: { x: 0, y: -1, tooltip: [] },
    data: missing.map(index => [index]),
    // Keep an axis-tooltip anchor even when every line has a null value here.
    animation: false,
    clip: true,
    silent: true,
    maskLines,
    ...layer,
    renderItem: (params, api) => {
      if (!layer || params.coordSys?.type !== 'cartesian2d') return
      const grid = params.coordSys as {
        type: string
        x: number
        y: number
        width: number
        height: number
      }
      const index = api.value(0)
      if (!visibleSlots.has(Number(index))) return
      const [x] = api.coord([index, 0])
      const size = api.size?.([1, 0], [index, 0])
      if (!Array.isArray(size) || x === undefined) return
      // A category occupies one sample spacing, even when zoom changes that spacing.
      const width = Math.min(grid.width, Math.abs(size[0] ?? 0))
      // Align adjacent slots to the same pixel edge so the grid cannot show through a seam.
      const left = width >= 1 ? Math.round(x - width / 2) : x - width / 2
      const right = width >= 1 ? Math.round(x + width / 2) : x + width / 2
      return {
        type: 'rect',
        shape: { x: left, y: grid.y, width: right - left, height: grid.height },
        style: { fill: color },
        emphasisDisabled: true,
      }
    },
  }
}

type TooltipFormatter = Exclude<NonNullable<TooltipComponentOption['formatter']>, string>

export function createCategoryLineTooltip(
  categories: string[],
  lines: LineSeriesOption[],
  values: LineData[],
  yAxis: ChartProps['yAxis'],
  missing: number[],
  valueFormatter?: (value: number, dataIndex: number) => string,
): TooltipFormatter {
  const axes = convertArray(yAxis)
  const titles = new Map<number, string>()
  for (let start = 0; start < missing.length;) {
    let end = start
    while (missing[end + 1] === missing[end]! + 1) end++
    const first = missing[start]!
    const last = missing[end]!
    const title = first === last ? categories[first]! : `${categories[first]} – ${categories[last]}`
    for (let index = start; index <= end; index++) titles.set(missing[index]!, title)
    start = end + 1
  }

  return (input: DefaultLabelFormatterCallbackParams | DefaultLabelFormatterCallbackParams[]) => {
    const params = convertArray(input)
    const line = params.find(param => (param.seriesIndex ?? Infinity) < lines.length)
    const band = params.find(param => param.seriesId === missingBandId)
    const index = line?.dataIndex ?? (Array.isArray(band?.value) ? Number(band.value[0]) : -1)
    if (index < 0 || index >= categories.length) return ''
    const rows = params.flatMap(param => {
      const series = lines[param.seriesIndex ?? -1]
      const sample = values[param.seriesIndex ?? -1]?.[index]
      const value = measurement(sample)
      if (!series || value === undefined) return []
      const axis =
        series.yAxisId == null
          ? axes[series.yAxisIndex ?? 0]
          : axes.find(axis => axis.id != null && String(axis.id) === String(series.yAxisId))
      const formatted =
        valueFormatter?.(value, index) ?? (axis?.name ? `${value} ${axis.name}` : value)
      return [
        {
          name: escape(String(series.name)),
          value: escape(String(formatted)),
          color: getTooltipsColor(param.color),
        },
      ]
    })
    // Collect reasons from the original samples even if ECharts omits nulls from the tooltip.
    const reasons = new Set<string>()
    if (titles.has(index)) {
      for (const samples of values) {
        const item = samples[index] as LineChartDataItem | undefined
        if (item?.missingReason && measurement(item) === undefined) reasons.add(item.missingReason)
      }
    }
    const title = escape(band ? (titles.get(index) ?? categories[index]!) : categories[index]!)
    const details = [...reasons].map(reason => `<div>${escape(reason)}</div>`).join('')
    return (
      useTooltipsFormatter(title, rows, 10) +
      (details
        ? `<div style="max-width: 240px; white-space: normal; overflow-wrap: anywhere; margin-top: 8px; font-size: 12px; opacity: 0.72;">${details}</div>`
        : '')
    )
  }
}
