import type { XAXisComponentOption } from 'echarts'
import type { ChartProps } from '@idux/charts-core'
import type { LineSeriesOption } from 'echarts/charts'
import type { EChartsType } from 'echarts/core'
import { color as echartsColor } from 'echarts/core'
import { convertArray, getAlphaColor } from '@idux/charts-core'
import { pick } from 'lodash-es'

import { appendLegendGraphics, createCategoryLegend } from '../../shared/categoryLegend'
import { mergeCartesianGrid, mergeAxisOption } from '../../shared/cartesian'
import { mergePlotOptions } from '../../shared/plotOptions'
import { seerGradientStartColors } from '../../shared/linearColors'
import { defaultDarkMissingBackgroundColor } from '../../shared/plotTheme'
import type { PlotTheme } from '../../shared/plotTheme'
import { createReferenceSeries, referenceLegendIcon } from '../../shared/referenceLine'
import type { ReferenceLine } from '../../shared/referenceLine'
import {
  createCategoryLineTooltip,
  createMissingBands,
  measurement,
  normalizeLineData,
} from './categoryLineData'
import { getLineSampleValue } from './categoryLineInterpolation'
import type { InterpolatedLineItem, InterpolatedLineSeries } from './categoryLineInterpolation'
import { createSingleAreaStripe, createStackedAreaStripe } from './useLineChartAreaStripe'
import { useLineStyleColor } from './useLineStyleColor'
import type { LineChartProps } from './useLineOption'

export interface CategoryLineProps {
  /** Enables the category layout. Values are matched to the labels by index. */
  categories?: string[]
  /** Enables a gradient area fill or a striped area fill. */
  area?: boolean | 'striped'
  referenceLine?: ReferenceLine
  zeroText?: string
  plotTheme?: PlotTheme
}

export function createCategoryLineOption(
  props: CategoryLineProps,
  baseSeries: LineSeriesOption,
  attrs: LineChartProps,
  width: number,
  theme: PlotTheme,
  dark: boolean,
  getChart: () => EChartsType | undefined,
  current: Pick<ChartProps, 'dataZoom' | 'legend'> = {},
) {
  const { categories = [], area, referenceLine, zeroText } = props
  const { series, xAxis, yAxis, legend, grid, tooltip, dataZoom, graphic, ...rest } = attrs
  const tooltipInput = convertArray(tooltip)[0]
  const runtime = rest
  const inputs = series === undefined ? [{}] : convertArray(series)
  const lines = inputs.map(item => mergePlotOptions<LineSeriesOption>(baseSeries, item))
  if (!categories.length || !lines.some(line => line.data?.length)) {
    return { option: runtime as ChartProps, wheel: undefined }
  }

  const nativeColors = Array.isArray(attrs.color)
    ? (attrs.color as Array<NonNullable<NonNullable<LineSeriesOption['itemStyle']>['color']>>)
    : theme.palette
  const errorColor = theme.errorColor ?? (dark ? '#FF957B' : '#F5654F')
  const textColor = theme.secondaryTextColor ?? (dark ? '#C2C7D1' : '#6F7785')
  const missingCounts = new Uint32Array(categories.length)
  let allZero = true
  const values = lines.map(line =>
    normalizeLineData(line.data, categories, (index, value) => {
      if (value === undefined) missingCounts[index] = missingCounts[index]! + 1
      if (value !== 0) allZero = false
    }),
  )
  const missing: number[] = []
  missingCounts.forEach((count, index) => {
    if (count) missing.push(index)
  })
  const isGap = (data: NonNullable<LineSeriesOption['data']>, index: number) =>
    getLineSampleValue(data[index]) == null
  const pointSlots = new Set(
    missing.filter(
      slot =>
        slot > 0 &&
        slot < categories.length - 1 &&
        !missingCounts[slot - 1] &&
        !missingCounts[slot + 1] &&
        !lines.some(
          (line, index) => line.stack && line.connectNulls === false && isGap(values[index]!, slot),
        ),
    ),
  )
  const bandSlots = missing.filter(slot => !pointSlots.has(slot))
  // Shared outages can cover all lines with one layer. Mixed outages keep the
  // band behind the lines and mask each line only at its own missing slots.
  const coverGaps =
    bandSlots.length > 0 &&
    bandSlots.every(index => missingCounts[index] === lines.length) &&
    lines.every(line => line.connectNulls !== false)
  const maskLines = bandSlots.length > 0 && !coverGaps
  const lineSeries = lines.map((line, index): InterpolatedLineSeries => {
    const color = nativeColors?.[index % nativeColors.length]
    const itemColor = line.itemStyle?.color ?? color
    const stroke =
      typeof itemColor === 'string'
        ? itemColor
        : (index === 0 && theme.color) ||
          seerGradientStartColors[index % seerGradientStartColors.length]!
    const data = values[index]!
    let areaStyle: LineSeriesOption['areaStyle'] = area
      ? {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: getAlphaColor(stroke, 0.3) },
              { offset: 1, color: getAlphaColor(stroke, line.stack ? 0.16 : 0.03) },
            ],
          },
        }
      : undefined
    if (area === 'striped' && !line.areaStyle?.color) {
      areaStyle = line.stack ? createStackedAreaStripe(stroke) : createSingleAreaStripe(stroke)
    }
    const pointValues = new Map<number, number>()
    for (const slot of pointSlots) {
      if (!isGap(data, slot)) continue
      const left = measurement(data[slot - 1])
      const right = measurement(data[slot + 1])
      if (left !== undefined && right !== undefined) pointValues.set(slot, left / 2 + right / 2)
    }
    const marker = {
      symbol: 'circle',
      // ECharts centers the 3px stroke on the symbol edge, for a 12px outer diameter.
      symbolSize: 9,
      label: { show: false },
      itemStyle: {
        color: typeof line.lineStyle?.color === 'string' ? line.lineStyle.color : stroke,
        opacity: 1,
        borderColor: '#FFFFFF',
        borderWidth: 3,
        shadowColor: 'rgba(30, 35, 43, 0.16)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
      },
    }
    // Native symbols sit on the smoothed curve and follow the stack as its height changes.
    // The drawing coordinate is separate from the sample used in callbacks.
    const inlinePoints =
      (line.stack || (line.smooth && !tooltipInput?.formatter)) &&
      line.connectNulls !== false &&
      !line.markPoint &&
      pointValues.size > 0
    return {
      showSymbol: false,
      connectNulls:
        coverGaps ||
        pointValues.size > 0 ||
        (maskLines && bandSlots.some(slot => isGap(data, slot))),
      ...line,
      type: 'line',
      id: line.id ?? `ix-line-series-${index}`,
      name: line.name ?? (lines.length === 1 ? 'Value' : `Series ${index + 1}`),
      data,
      itemStyle: { color: color ?? stroke, ...line.itemStyle },
      lineStyle: {
        color:
          itemColor && typeof itemColor !== 'string' && typeof itemColor !== 'function'
            ? itemColor
            : useLineStyleColor(stroke),
        ...line.lineStyle,
      },
      areaStyle: areaStyle ? { ...areaStyle, ...line.areaStyle } : line.areaStyle,
      ...(inlinePoints && {
        ixLineHasInterpolation: true as const,
        showSymbol: true,
        showAllSymbol: true,
        symbol: line.showSymbol ? line.symbol : 'none',
        data: data.map((item, dataIndex) => {
          const coordinate = pointValues.get(dataIndex)
          if (coordinate !== undefined) {
            const sample = line.data?.[dataIndex]
            return {
              ...marker,
              value: getLineSampleValue(sample),
              ixLineInterpolation: { sample, coordinate },
              emphasis: { disabled: true },
            } satisfies InterpolatedLineItem & NonNullable<LineSeriesOption['data']>[number]
          }
          return !line.showSymbol && item && typeof item === 'object' && 'symbol' in item
            ? { ...item, symbol: 'none' }
            : item
        }),
      }),
      markPoint:
        line.markPoint ??
        (pointValues.size > 0 && !inlinePoints
          ? {
              silent: true,
              ...marker,
              data: Array.from(pointValues, ([slot, value]) => ({
                name: categories[slot]!,
                coord: [slot, value],
              })),
            }
          : undefined),
    }
  })
  const missingColor =
    theme.missingBackgroundColor ??
    (dark ? defaultDarkMissingBackgroundColor : echartsColor.lerp(0.12, ['#FFFFFF', errorColor]))
  const bandLayer = !bandSlots.length
    ? undefined
    : coverGaps
      ? {
          z: Math.max(...lineSeries.map(line => line.z ?? 3)) + 1,
          zlevel: Math.max(...lineSeries.map(line => line.zlevel ?? 0)),
        }
      : { z: 2 }
  const reference =
    referenceLine && Number.isFinite(referenceLine.value) ? referenceLine : undefined
  const referenceColor = reference?.color ?? errorColor
  const legendVisible =
    (Array.isArray(legend) || legend?.show !== false) &&
    (lines.length > 1 || !!reference?.name || !!legend)
  const entries = [
    ...lineSeries.map(line => ({ name: String(line.name), icon: 'roundRect' })),
    ...(reference?.name ? [{ name: reference.name, icon: referenceLegendIcon }] : []),
  ]
  const {
    legend: layoutLegend,
    height: legendHeight,
    pager,
    wheel,
  } = legendVisible
    ? createCategoryLegend(
        entries,
        legend,
        width,
        theme,
        dark,
        getChart,
        current.legend,
        'ix-line-legend',
      )
    : { legend: undefined, height: 0, pager: undefined, wheel: undefined }
  const currentZoom = convertArray(current.dataZoom)
  const sliderTrack = theme.splitAreaColor ?? (dark ? '#171A1F' : '#EAEFF5')
  const sliderShadow = dark ? (theme.mutedColor ?? '#525966') : '#D3D7DE'
  const sliderColor = theme.color ?? '#689FFF'
  const sliderPreview = {
    lineStyle: { opacity: 0 },
    areaStyle: { color: sliderShadow, opacity: 1 },
  }
  const zoom =
    dataZoom === undefined
      ? undefined
      : convertArray(dataZoom).map((item, index) => ({
          ...(item.type !== 'inside'
            ? {
                type: 'slider' as const,
                height: 16,
                bottom: legendHeight + 4,
                brushSelect: false,
                showDetail: false,
                showDataShadow: true,
                backgroundColor: sliderTrack,
                borderColor: 'transparent',
                fillerColor: getAlphaColor(sliderColor, dark ? 0.24 : 0.16),
                moveHandleSize: 0,
                handleStyle: {
                  color: sliderTrack,
                  borderColor: theme.borderColor ?? (dark ? '#68707D' : '#B9C0CB'),
                },
                dataBackground: sliderPreview,
                selectedDataBackground: sliderPreview,
              }
            : {}),
          ...([item.xAxisId, item.xAxisIndex, item.yAxisId, item.yAxisIndex].every(
            axis => axis == null,
          ) && { xAxisIndex: 0 }),
          ...item,
          ...pick(currentZoom[index], ['start', 'end', 'startValue', 'endValue']),
        }))
  const hasSlider = zoom?.some(item => item.type === 'slider')
  const referenceValue = reference?.value ?? 0
  const valueAxis = mergeAxisOption({ type: 'value' }, yAxis)
  const firstAxis = convertArray(valueAxis)[0]
  if (firstAxis) {
    if ((allZero || reference) && firstAxis.max === undefined) {
      firstAxis.max = ({ max }) => Math.max(Number.isFinite(max) ? max : 0, referenceValue) || 1
    }
    if (referenceValue < 0 && firstAxis.min === undefined) {
      firstAxis.min = ({ min }) => Math.min(Number.isFinite(min) ? min : 0, referenceValue)
    }
  }
  const zeroGraphic =
    !graphic && allZero && zeroText
      ? [
          {
            type: 'text' as const,
            left: 'center',
            top: 'middle',
            silent: true,
            z: 3,
            style: { text: zeroText, fill: textColor, fontSize: 12 },
          },
        ]
      : []
  const categoryAxis = convertArray(xAxis)[0] as
    | Extract<XAXisComponentOption, { type?: 'category' }>
    | undefined
  const option: ChartProps = {
    ...runtime,
    grid: mergeCartesianGrid(
      {
        top: attrs.title ? 56 : 36,
        bottom: 12 + legendHeight + (hasSlider ? 24 : 0),
        left: 18,
        right: 20,
      },
      grid,
    ),
    xAxis: mergePlotOptions<XAXisComponentOption>(
      { boundaryGap: false, axisLabel: { hideOverlap: true } },
      categoryAxis,
      { type: 'category', data: categories },
    ),
    yAxis: valueAxis,
    legend: layoutLegend,
    dataZoom: zoom,
    graphic:
      pager || zeroGraphic.length
        ? appendLegendGraphics(graphic, [...zeroGraphic, ...(pager ?? [])])
        : graphic,
    series: [
      ...lineSeries,
      ...(reference
        ? [createReferenceSeries(reference, referenceColor, { axis: 'yAxis', z: 1, zlevel: 0 })]
        : []),
      ...(missing.length
        ? [createMissingBands(missing, bandSlots, missingColor, bandLayer, maskLines)]
        : []),
    ],
    tooltip: mergePlotOptions<NonNullable<ChartProps['tooltip']>>(
      {
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { type: 'dashed' } },
        formatter: createCategoryLineTooltip(
          categories,
          lineSeries,
          values,
          valueAxis,
          missing,
          tooltipInput?.valueFormatter,
        ),
      },
      tooltipInput,
    ),
  }
  return { option, wheel }
}
