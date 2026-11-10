import type { BarSeriesOption } from 'echarts/charts'
import type { DataZoomComponentOption } from 'echarts/components'
import type { EChartsType } from 'echarts/core'
import type { YAXisComponentOption } from 'echarts'
import { isEqual } from 'lodash-es'
import { convertArray } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'

import type { BarChartProps } from './useBarOption'

function barColumnKey(bar: BarSeriesOption, index: number) {
  return bar.stack ? `stack:${bar.stack}` : index
}

export function countBarColumns(bars: BarSeriesOption[]) {
  return new Set(bars.map(barColumnKey)).size
}

export function getBarHoverWidth(
  bars: BarSeriesOption[],
  legend: ChartProps['legend'],
  bandWidth?: number,
) {
  const legends = convertArray(legend)
  const columns = new Map<
    ReturnType<typeof barColumnKey>,
    { width: number; min: number; max: number }
  >()
  const toNumber = (value: number | string | undefined, extent = bandWidth ?? NaN) =>
    typeof value === 'string' && value.trim().endsWith('%')
      ? (parseFloat(value) * extent) / 100
      : Number(value)
  let gap = 0.3
  for (const [index, bar] of bars.entries()) {
    const name = bar.name
    if (name && legends.some(item => item.selected?.[name] === false)) continue
    const key = barColumnKey(bar, index)
    const column = columns.get(key) ?? { width: 0, min: 1, max: Infinity }
    column.width ||= toNumber(bar.barWidth) || 0
    column.min = toNumber(bar.barMinWidth) || column.min
    column.max = toNumber(bar.barMaxWidth) || column.max
    columns.set(key, column)
    const ratio = toNumber(bar.barGap, 1)
    if (Number.isFinite(ratio)) gap = ratio
  }
  const widths = [...columns.values()].map(({ width, min, max }) =>
    Math.max(min, Math.min(width || 6, max)),
  )
  return widths.reduce(
    (sum, width, index) => sum + width * (index === widths.length - 1 ? 1 : 1 + gap),
    12,
  )
}

export function categoryBarId(index: number) {
  return `ix-category-bar-${index}`
}

export function targetsBarZoomAxis(
  zoom: DataZoomComponentOption,
  axis: 'x' | 'y',
  id?: string | number,
) {
  const axisIndex = axis === 'x' ? zoom.xAxisIndex : zoom.yAxisIndex
  const axisId = axis === 'x' ? zoom.xAxisId : zoom.yAxisId
  if (axisIndex != null) return axisIndex === 'all' || convertArray(axisIndex).includes(0)
  return id != null && convertArray(axisId).some(target => String(target) === String(id))
}

export function getCategoryZoom(
  zoom: ChartProps['dataZoom'],
  horizontal: boolean,
  categoryAxisId?: string | number,
) {
  return convertArray(zoom).find(item =>
    targetsBarZoomAxis(item, horizontal ? 'y' : 'x', categoryAxisId),
  )
}

export function getVisibleBarWidth(
  categories: string[],
  zoom?: DataZoomComponentOption,
  resolved = false,
) {
  const last = categories.length - 1
  const endpoint = (i: 0 | 1, value: unknown, percent: number | undefined) => {
    const fromValue =
      resolved || (value != null && (percent == null || zoom?.rangeMode?.[i] === 'value'))
    const index = typeof value === 'string' ? categories.indexOf(value) : value
    return fromValue && typeof index === 'number' && index >= 0
      ? Math.min(index, last)
      : Math.round((last * (percent ?? i * 100)) / 100)
  }
  const start = endpoint(0, zoom?.startValue, zoom?.start)
  const end = endpoint(1, zoom?.endValue, zoom?.end)
  return getBarWidthForCount(Math.abs(end - start) + 1)
}

export function getBarWidthForCount(visibleCount: number) {
  if (visibleCount <= 3) return 20
  return visibleCount <= 5 ? 10 : 6
}

export function getMissingBarWidth(columns: number, bandWidth = Infinity) {
  return Math.min(bandWidth / 2, 10 + columns * 10)
}

export function getAboveLabelPadding(thickness: number) {
  return [0, 0, thickness / 2 + 5, 0]
}

export function getAboveCategoryLabels(
  categories: string[],
  missingRows: ReadonlyMap<number, boolean>,
  missingWidth: number,
  barWidth: number,
  axisLabel?: YAXisComponentOption['axisLabel'],
) {
  const { align = 'left', verticalAlign = 'bottom' } = axisLabel ?? {}
  return categories.map((value, index) => {
    const hasReportedValue = missingRows.get(index)
    if (hasReportedValue === undefined) return value
    const thickness = hasReportedValue ? Math.max(barWidth, missingWidth) : missingWidth
    // ECharts reads category item alignment from its own style rather than the axis label.
    return { value, textStyle: { align, verticalAlign, padding: getAboveLabelPadding(thickness) } }
  })
}

export function syncCategoryBarWidths(
  chart: EChartsType,
  props: BarChartProps,
  attrs: BarChartProps,
  aboveMissingRows?: ReadonlyMap<number, boolean>,
) {
  const categories = props.categories ?? []
  if (!categories.length) return

  const current = chart.getOption() as ChartProps
  const horizontal = props.layout?.startsWith('horizontal') ?? false
  const categoryAxis = convertArray(horizontal ? current.yAxis : current.xAxis)[0]
  const zoom = getCategoryZoom(current.dataZoom, horizontal, categoryAxis?.id)
  const bars = convertArray(current.series).filter(
    (item): item is BarSeriesOption => item.type === 'bar',
  )
  if (!bars.length) return
  const barWidth =
    zoom && countBarColumns(bars) === 1 ? getVisibleBarWidth(categories, zoom, true) : undefined
  const configured = convertArray(attrs.series)
  const updates = bars.flatMap((item, index) =>
    barWidth !== undefined &&
    item.barWidth !== barWidth &&
    (configured[index]?.barWidth ?? props.barWidth) === undefined
      ? [{ id: item.id ?? categoryBarId(index), barWidth }]
      : [],
  )
  const pointer = convertArray(current.tooltip)[0]?.axisPointer
  const customWidth = convertArray(attrs.tooltip)[0]?.axisPointer?.lineStyle?.width
  const axis = horizontal ? { yAxisIndex: 0 } : { xAxisIndex: 0 }
  const [first, next] = [chart.convertToPixel(axis, 0), chart.convertToPixel(axis, 1)]
  const bandWidth =
    typeof first === 'number' && typeof next === 'number' ? Math.abs(next - first) : undefined
  const updatedBars = bars.map(bar => ({ ...bar, ...updates.find(item => item.id === bar.id) }))
  const hoverWidth = getBarHoverWidth(updatedBars, current.legend, bandWidth)
  const updatePointer =
    pointer?.type === 'line' && customWidth === undefined && pointer.lineStyle?.width !== hoverWidth
  let yAxis: ChartProps['yAxis']
  const axisLabel = convertArray(attrs.yAxis)[0]?.axisLabel
  if (props.layout === 'horizontal-above' && axisLabel?.padding === undefined) {
    const currentAxis = convertArray(current.yAxis)[0]
    const thickness = getBarHoverWidth(updatedBars, undefined, bandWidth) - 12
    const padding = getAboveLabelPadding(thickness)
    const data =
      aboveMissingRows &&
      getAboveCategoryLabels(
        categories,
        aboveMissingRows,
        getMissingBarWidth(countBarColumns(bars), bandWidth),
        thickness,
        axisLabel,
      )
    const updatePadding = !isEqual(padding, currentAxis?.axisLabel?.padding)
    const updateLabels =
      data && currentAxis?.type === 'category' && !isEqual(data, currentAxis.data)
    if (updatePadding || updateLabels) {
      yAxis = {
        ...(updatePadding ? { axisLabel: { padding } } : {}),
        ...(updateLabels ? { data } : {}),
      }
    }
  }
  // Merge geometry without resetting the zoom window or legend selection.
  if (updates.length || updatePointer || yAxis) {
    chart.setOption({
      ...(updates.length ? { series: updates } : {}),
      ...(updatePointer ? { tooltip: { axisPointer: { lineStyle: { width: hoverWidth } } } } : {}),
      ...(yAxis ? { yAxis } : {}),
    })
  }
}
