import type { XAXisComponentOption, YAXisComponentOption } from 'echarts'
import type { EChartsType } from 'echarts/core'
import type { BarSeriesOption, CustomSeriesOption } from 'echarts/charts'
import { pick } from 'lodash-es'
import { convertArray, filterEmptyProps, getAlphaColor, getTooltipsColor } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import { defaultDarkMissingBackgroundColor } from '../../shared/plotTheme'
import { mergeCartesianGrid } from '../../shared/cartesian'
import { mergePlotOptions } from '../../shared/plotOptions'
import { createPlotTooltipFormatter } from '../../shared/plotTooltip'
import type { PlotTooltipParams } from '../../shared/plotTooltip'
import type { PlotTheme } from '../../shared/plotTheme'
import { createReferenceSeries, referenceLegendIcon } from '../../shared/referenceLine'
import type { ReferenceLine } from '../../shared/referenceLine'
import type { LegendWheelRegion } from '../../shared/useLegendWheel'

import { appendLegendGraphics, createCategoryLegend } from '../../shared/categoryLegend'
import {
  categoryBarId,
  countBarColumns,
  getAboveCategoryLabels,
  getAboveLabelPadding,
  getBarHoverWidth,
  getBarWidthForCount,
  getCategoryZoom,
  getMissingBarWidth,
  getVisibleBarWidth,
  targetsBarZoomAxis,
} from './categoryBarWidth'
import { getBarLinearColors, LinearDirection } from './getBarLinearColors'
import type { BarChartProps } from './useBarOption'

export type BarReferenceLine = ReferenceLine

export interface CategoryBarProps {
  /** Opts into the category layout. Data items correspond to these labels by index. */
  categories?: string[]
  layout?: 'vertical' | 'horizontal' | 'horizontal-above'
  referenceLine?: BarReferenceLine
  /** Optional message to display inside the plot when all values are zero. */
  zeroText?: string
  plotTheme?: PlotTheme
}

function isDataItem(item: unknown): item is { value?: unknown } {
  return !!item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date)
}

function scalarValue(item: unknown) {
  return isDataItem(item) ? item.value : item
}

function isMissing(value: unknown) {
  return (
    value == null ||
    (typeof value === 'string' && !value.trim()) ||
    ((typeof value === 'number' || typeof value === 'string') && !Number.isFinite(Number(value)))
  )
}

function normalizeDataItem(item: NonNullable<BarSeriesOption['data']>[number]) {
  if (!isMissing(scalarValue(item))) return item
  return isDataItem(item) ? { ...item, value: null } : null
}

function missingReason(item: unknown) {
  return item &&
    typeof item === 'object' &&
    'missingReason' in item &&
    typeof item.missingReason === 'string'
    ? item.missingReason
    : undefined
}

export function createCategoryBarOption(
  props: CategoryBarProps,
  seriesProps: BarSeriesOption,
  attrs: BarChartProps,
  width: number,
  theme: PlotTheme,
  dark: boolean,
  getChart: () => EChartsType | undefined,
  current: Pick<ChartProps, 'dataZoom' | 'legend'> = {},
): {
  option: ChartProps
  wheel?: LegendWheelRegion
  aboveMissingRows?: ReadonlyMap<number, boolean>
} {
  const { categories = [], layout = 'vertical', referenceLine, zeroText } = props
  const horizontal = layout !== 'vertical'
  const above = layout === 'horizontal-above'
  const {
    series,
    legend,
    tooltip: tooltipInput,
    xAxis,
    yAxis,
    grid,
    dataZoom,
    loading,
    ...rest
  } = attrs
  const tooltip = convertArray(tooltipInput)[0]
  const tooltipRowsPerColumn = 10
  const bars = (series === undefined ? [{}] : convertArray(series)).map(item =>
    mergePlotOptions<BarSeriesOption>(filterEmptyProps(seriesProps), item, { type: 'bar' }),
  )
  const hasData = bars.some(bar => bar.data?.length)
  const multiColumnTooltip = bars.length > tooltipRowsPerColumn && !tooltip?.formatter
  const runtime = rest
  if (!categories.length || !hasData) return { option: { ...runtime, loading } }

  const columns = countBarColumns(bars)
  const xAxisInput = convertArray(xAxis)[0]
  const yAxisInput = convertArray(yAxis)[0]
  const categoryInput = horizontal ? yAxisInput : xAxisInput
  const currentZoom = convertArray(current.dataZoom)
  const boundZoom =
    dataZoom === undefined
      ? undefined
      : convertArray(dataZoom).map((item, index) => {
          const hasAxis = [item.xAxisIndex, item.yAxisIndex, item.xAxisId, item.yAxisId].some(
            target => target != null,
          )
          return {
            ...item,
            ...(!hasAxis && (horizontal ? { yAxisIndex: 0 } : { xAxisIndex: 0 })),
            ...pick(currentZoom[index], ['start', 'end', 'startValue', 'endValue']),
          }
        })
  const secondaryText = theme.secondaryTextColor ?? '#A1A7B3'
  const trackColor = theme.mutedColor ?? (dark ? '#3C424D' : 'rgba(143, 162, 191, 0.18)')
  const errorColor = theme.errorColor ?? (dark ? '#FF957B' : '#F5654F')
  const missingColor =
    theme.missingBackgroundColor ??
    (dark ? defaultDarkMissingBackgroundColor : getAlphaColor(errorColor, 0.12))
  const colors = getBarLinearColors(
    horizontal ? LinearDirection.reverseHorizontal : LinearDirection.vertical,
  )
  const defaultWidth =
    columns > 1
      ? 6
      : getVisibleBarWidth(categories, getCategoryZoom(boundZoom, horizontal, categoryInput?.id))
  const barSeries: BarSeriesOption[] = bars.map((bar, index) => {
    const data = categories.map((_, i) => normalizeDataItem(bar.data?.[i]))
    return {
      barGap: '30%',
      barMinHeight: 0,
      emphasis: { disabled: true },
      label: { show: false },
      showBackground: above,
      backgroundStyle: { color: trackColor },
      z: 2,
      ...bar,
      id: bar.id ?? categoryBarId(index),
      barWidth: bar.barWidth ?? defaultWidth,
      name: bar.name ?? (bars.length === 1 ? 'Value' : `Series ${index + 1}`),
      data,
    }
  })
  const allZero = barSeries.every(bar =>
    bar.data?.every(item => {
      const value = scalarValue(item)
      return (
        (typeof value === 'number' || typeof value === 'string') &&
        !isMissing(value) &&
        Number(value) === 0
      )
    }),
  )
  const missingIndices = new Set(
    categories.flatMap((_, index) =>
      barSeries.some(bar => isMissing(scalarValue(bar.data?.[index]))) ? [index] : [],
    ),
  )
  const backgroundZ = Math.min(...barSeries.map(bar => bar.z ?? 2)) - 1
  // Native backgrounds also paint null points. When a track chart contains missing
  // categories, draw the valid tracks and missing bands separately.
  const drawTracks = above && missingIndices.size > 0 && barSeries.some(bar => bar.showBackground)
  const bands: CustomSeriesOption[] = missingIndices.size
    ? [
        {
          type: 'custom',
          // The bands follow the category axis without affecting the value axis.
          encode: horizontal ? { y: 0, x: -1 } : { x: 0, y: -1 },
          data: categories.flatMap((_, index) =>
            drawTracks || missingIndices.has(index) ? [[index]] : [],
          ),
          clip: true,
          silent: true,
          animation: false,
          zlevel: Math.min(...barSeries.map(bar => bar.zlevel ?? 0)),
          z: backgroundZ,
          renderItem: (params, api) => {
            if (params.coordSys?.type !== 'cartesian2d') return
            const grid = params.coordSys as {
              type: string
              x: number
              y: number
              width: number
              height: number
            }
            const index = api.value(0)
            const value = horizontal ? [0, index] : [index, 0]
            const [x, y] = api.coord(value)
            const size = api.size?.(horizontal ? [0, 1] : [1, 0], value)
            if (!Array.isArray(size) || x === undefined || y === undefined) return
            const bandSize = Math.abs(size[horizontal ? 1 : 0] ?? 0)
            const missing = missingIndices.has(Number(index))
            const trackWidth = () => {
              const visible = bandSize ? Math.round(grid.height / bandSize) : categories.length
              const barWidth = columns > 1 ? 6 : getBarWidthForCount(visible)
              return (
                getBarHoverWidth(
                  bars.map(bar => ({ ...bar, barWidth: bar.barWidth ?? barWidth })),
                  undefined,
                  bandSize,
                ) - 12
              )
            }
            const thickness = missing ? getMissingBarWidth(columns, bandSize) : trackWidth()
            return {
              type: 'rect',
              shape: horizontal
                ? { x: grid.x, y: y - thickness / 2, width: grid.width, height: thickness }
                : { x: x - thickness / 2, y: grid.y, width: thickness, height: grid.height },
              style: {
                fill: missing ? missingColor : (barSeries[0]?.backgroundStyle?.color ?? trackColor),
              },
              emphasisDisabled: true,
            }
          },
        },
      ]
    : []
  const reference =
    referenceLine && Number.isFinite(referenceLine.value) ? referenceLine : undefined
  const referenceColor = reference?.color ?? errorColor
  const referenceSeries = reference
    ? [
        createReferenceSeries(reference, referenceColor, {
          axis: horizontal ? 'xAxis' : 'yAxis',
          z: backgroundZ,
          zlevel: Math.min(...barSeries.map(bar => bar.zlevel ?? 0)),
        }),
      ]
    : []
  const legendVisible =
    (Array.isArray(legend) || legend?.show !== false) &&
    (bars.length > 1 || !!reference?.name || !!legend)
  const legendData = [
    ...barSeries.map(bar => ({ name: String(bar.name), icon: 'roundRect' })),
    ...(reference?.name ? [{ name: reference.name, icon: referenceLegendIcon }] : []),
  ]
  const {
    legend: mergedLegend,
    height: legendBottom,
    pager,
    wheel,
  } = legendVisible
    ? createCategoryLegend(legendData, legend, width, theme, dark, getChart, current.legend)
    : { legend: undefined, height: 0, pager: undefined, wheel: undefined }
  const zoomColor = theme.color ?? '#689FFF'
  const darkSlider = dark
    ? {
        backgroundColor: theme.splitAreaColor ?? '#171A1F',
        borderColor: theme.borderColor ?? '#3C424D',
        fillerColor: getAlphaColor(zoomColor, 0.24),
        handleStyle: { color: theme.textColor ?? '#C2C7D1', borderColor: zoomColor },
        moveHandleStyle: { color: zoomColor },
        dataBackground: {
          lineStyle: { color: secondaryText },
          areaStyle: { color: secondaryText },
        },
        selectedDataBackground: {
          lineStyle: { color: zoomColor },
          areaStyle: { color: zoomColor },
        },
      }
    : {}
  const zoom = boundZoom?.map(item => {
    if (item.type && item.type !== 'slider') return item
    const orient =
      item.orient ??
      (targetsBarZoomAxis(item, 'y', yAxisInput?.id) &&
      !targetsBarZoomAxis(item, 'x', xAxisInput?.id)
        ? 'vertical'
        : 'horizontal')
    return {
      type: 'slider' as const,
      ...(orient === 'vertical'
        ? { width: 16, right: 4, height: 'ph' } // Use the grid height instead of the theme's 16px slider height.
        : { height: 16, top: 'auto', bottom: legendBottom + 4 }),
      brushSelect: false,
      showDetail: false,
      showDataShadow: true,
      ...darkSlider,
      ...item,
      orient,
    }
  })
  const bottomSlider = zoom?.some(item => item.type === 'slider' && item.orient === 'horizontal')
  const rightSlider = zoom?.some(item => item.type === 'slider' && item.orient === 'vertical')
  const barThickness = getBarHoverWidth(barSeries, undefined) - 12
  const aboveMissingRows =
    above && missingIndices.size && categoryInput?.axisLabel?.padding === undefined
      ? new Map(
          Array.from(missingIndices, index => [
            index,
            barSeries.some(bar => !isMissing(scalarValue(bar.data?.[index]))),
          ]),
        )
      : undefined
  const categoryAxis = {
    type: 'category' as const,
    data: aboveMissingRows
      ? getAboveCategoryLabels(
          categories,
          aboveMissingRows,
          getMissingBarWidth(columns),
          barThickness,
          categoryInput?.axisLabel,
        )
      : categories,
    inverse: horizontal,
    boundaryGap: true,
    axisLabel: horizontal
      ? {
          width: above ? Math.max(0, Math.min(280, width ? width - 36 : 280)) : 186,
          overflow: 'truncate' as const,
          ...(above
            ? {
                inside: true,
                align: 'left' as const,
                verticalAlign: 'bottom' as const,
                margin: 0,
                padding: getAboveLabelPadding(barThickness),
              }
            : {}),
        }
      : { hideOverlap: true },
    ...(above ? { axisLine: { show: false }, axisTick: { show: false } } : {}),
  }
  const valueAxis = {
    type: 'value' as const,
    show: !above,
    ...(allZero || above || reference
      ? {
          max: ({ max }: { max: number }) => {
            const upper = Math.max(Number.isFinite(max) ? max : 0, reference?.value ?? 0)
            return upper > 0 ? (above ? upper * 1.13 : upper) : 1
          },
        }
      : {}),
    ...(reference && reference.value < 0
      ? {
          min: ({ min }: { min: number }) =>
            Math.min(Number.isFinite(min) ? min : 0, reference.value),
        }
      : {}),
  }
  const value = horizontal ? xAxisInput : yAxisInput
  const categoryLabels = { type: 'category' as const, data: categoryAxis.data }
  const graphic: ChartProps['graphic'] =
    attrs.graphic ??
    (allZero && !above && zeroText
      ? {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'middle',
              silent: true,
              z: 3,
              style: { text: zeroText, fill: secondaryText, fontSize: 12 },
            },
          ],
        }
      : undefined)
  const option: ChartProps = {
    ...runtime,
    loading,
    color: attrs.color ?? theme.palette ?? colors,
    grid: mergeCartesianGrid(
      {
        top: attrs.title ? 44 : 24,
        bottom: 12 + legendBottom + (bottomSlider ? 24 : 0),
        left: 16,
        right: rightSlider ? 44 : 20,
      },
      grid,
    ),
    xAxis: horizontal
      ? mergePlotOptions<XAXisComponentOption>(valueAxis, xAxisInput)
      : mergePlotOptions<XAXisComponentOption>(categoryAxis, xAxisInput, categoryLabels),
    yAxis: horizontal
      ? mergePlotOptions<YAXisComponentOption>(categoryAxis, yAxisInput, categoryLabels)
      : mergePlotOptions<YAXisComponentOption>(valueAxis, yAxisInput),
    dataZoom: zoom,
    legend: mergedLegend,
    ...(pager ? { graphic: appendLegendGraphics(graphic, pager) } : graphic ? { graphic } : {}),
    series: [
      ...(drawTracks ? barSeries.map(bar => ({ ...bar, showBackground: false })) : barSeries),
      ...referenceSeries,
      ...bands,
    ],
    tooltip: mergePlotOptions<NonNullable<ChartProps['tooltip']>>(
      {
        trigger: 'axis',
        ...(multiColumnTooltip
          ? {
              enterable: true,
              position: (point, _params, _dom, _rect, { viewSize, contentSize }) => [
                Math.min(point[0]! + 12, Math.max(0, viewSize[0] - contentSize[0])),
                Math.min(point[1]! + 12, viewSize[1] - legendBottom - contentSize[1] - 4),
              ],
            }
          : {}),
        axisPointer: {
          type: 'line',
          z: backgroundZ,
          lineStyle: {
            type: 'solid',
            width: getBarHoverWidth(barSeries, mergedLegend),
            color: missingIndices.size
              ? 'transparent'
              : dark
                ? getAlphaColor(secondaryText, 0.25)
                : 'rgba(129,130,136,0.2)',
          },
        },
        formatter: createPlotTooltipFormatter(
          (input: PlotTooltipParams) => {
            const params = convertArray(input).filter(param => param.seriesType === 'bar')
            if (!params.length) return
            const reasons: string[] = []
            const rows = params.flatMap(param => {
              const measurement = scalarValue(param.data)
              if (isMissing(measurement)) {
                const reason = missingReason(param.data)
                const prefix = bars.length > 1 ? `${param.seriesName ?? ''}: ` : ''
                reasons.push(`${prefix}${reason || '–'}`)
                return []
              }
              const formatted =
                (typeof measurement === 'number' || typeof measurement === 'string') &&
                typeof tooltip?.valueFormatter === 'function'
                  ? tooltip.valueFormatter(Number(measurement), param.dataIndex)
                  : value?.name
                    ? `${measurement} ${value.name}`
                    : measurement
              return [
                {
                  name: param.seriesName ?? '',
                  value: String(formatted),
                  color: getTooltipsColor(param.color),
                },
              ]
            })
            return { title: params[0]!.name, rows, notes: reasons }
          },
          { rowsPerColumn: tooltipRowsPerColumn, notesWidth: 220, notesInsideWhenEmpty: true },
        ),
      },
      tooltip,
      multiColumnTooltip && width > 24
        ? {
            extraCssText: `--ix-chart-tooltip-columns-max-width: ${width - 24}px;${tooltip?.extraCssText ?? ''}`,
          }
        : undefined,
    ),
  }
  return { option, wheel, aboveMissingRows }
}
