import { color, version as echartsVersion } from 'echarts/core'
import type { MapSeriesOption, ScatterSeriesOption, LinesSeriesOption } from 'echarts/charts'
import type { GeoComponentOption, VisualMapComponentOption } from 'echarts/components'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'
import type { PlotTheme } from '../../shared/plotTheme'
import { mergeNativePlotOptions } from '../../shared/plotOptions'
import { getLinearColor, LinearDirection } from '../../shared/linearColors'
import { createPlotTooltipFormatter, type PlotTooltipParams } from '../../shared/plotTooltip'

export type MapCoordinate = [number, number]
export interface MapDataItem {
  name: string
  /** GeoJSON region name; defaults to name. */
  region?: string
  value?: number | null
  coordinate?: MapCoordinate
  color?: string
  symbol?: 'circle' | 'pin'
}
export interface MapLineItem {
  from: string
  to: string
  coords: [MapCoordinate, MapCoordinate]
  value?: number | null
  color?: string
  metrics?: { name: string; value: number | string; unit?: string }[]
}
export interface MapPiece {
  min?: number
  max?: number
  value?: number
  label: string
  color: string
}
type MapOption = BaseChartOption<
  | MapSeriesOption
  | ScatterSeriesOption
  | LinesSeriesOption
  | GeoComponentOption
  | VisualMapComponentOption
>
export interface MapChartProps extends MapOption, AdditionalChartOption {
  /** Name previously registered with echarts.registerMap. */
  map: string
  mode?: 'status' | 'density' | 'lines'
  data?: MapDataItem[]
  lines?: MapLineItem[]
  pieces?: MapPiece[]
  metricName?: string
  unit?: string
  roam?: boolean | 'scale' | 'move'
  showLabel?: boolean
  plotTheme?: PlotTheme
}
export type MapChartPublicProps = KnownProps<MapChartProps>
export const mapProps = [
  'map',
  'mode',
  'data',
  'lines',
  'pieces',
  'metricName',
  'unit',
  'roam',
  'showLabel',
  'plotTheme',
] as const
export const defaultMapPieces: MapPiece[] = [
  { min: 801, label: '>800', color: '#214EB0' },
  { min: 601, max: 800, label: '601–800', color: '#4089FF' },
  { min: 401, max: 600, label: '401–600', color: '#6BA5FF' },
  { min: 201, max: 400, label: '201–400', color: '#98C6FF' },
  { min: 1, max: 200, label: '1–200', color: '#BFDEFF' },
  { value: 0, label: '0', color: '#E5F2FF' },
]
const statusColors = ['#8F1806', '#DF4934', '#FF9141', '#FFC343', '#FFE392']
const finite = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)
/** Apply the screenshot's 20% blue overlay without replacing the density fill. */
function hoverColor(color: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return color
  return (
    '#' +
    [28, 78, 255]
      .map((channel, index) =>
        Math.round(parseInt(color.slice(index * 2 + 1, index * 2 + 3), 16) * 0.8 + channel * 0.2)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}
function densityLabelColor(color: string, fallback: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return fallback
  const luminance = [0.299, 0.587, 0.114].reduce(
    (sum, weight, index) => sum + parseInt(color.slice(index * 2 + 1, index * 2 + 3), 16) * weight,
    0,
  )
  return luminance < 150 ? '#FFFFFF' : fallback
}
/** Match the native ECharts pin curves, with a consistent 7px white center. */
function pinSymbol(fill: string, border: boolean) {
  const scale = 28 / 24.4
  const r = 8.4 * scale
  const dy = 3.6 * scale
  const cy = r
  const dx = Math.sqrt(r * r - dy * dy)
  const tangentX = dy / r
  const tangentY = dx / r
  const cp = r * 0.6
  const cp2 = r * 0.7
  const path = `M${14 - dx} ${cy + dy}A${r} ${r} 0 1 1 ${14 + dx} ${cy + dy}C${14 + dx - tangentX * cp} ${cy + dy + tangentY * cp} 14 ${28 - cp2} 14 28C14 ${28 - cp2} ${14 - dx + tangentX * cp} ${cy + dy + tangentY * cp} ${14 - dx} ${cy + dy}Z`
  const safeFill = fill.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  return `image://data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="${safeFill}"${border ? ' stroke="#FFFFFF" stroke-width="1"' : ''} d="${path}"/><circle cx="14" cy="${cy}" r="3.5" fill="#FFFFFF"/></svg>`,
  )}`
}
/** Use the dominant axis so curved paths retain the endpoint alpha values. */
function lineGradient(coords: MapLineItem['coords'], lineColor: string) {
  const [[fromX, fromY], [toX, toY]] = coords
  const direction =
    Math.abs(toX - fromX) >= Math.abs(toY - fromY)
      ? toX >= fromX
        ? LinearDirection.horizontal
        : LinearDirection.reverseHorizontal
      : toY >= fromY
        ? LinearDirection.reverseVertical
        : LinearDirection.vertical
  return getLinearColor(color.modifyAlpha(lineColor, 0.08), lineColor, direction)
}

export function createMapOption(props: MapChartProps): MapOption {
  const {
    map,
    mode = 'status',
    data = [],
    lines = [],
    metricName = '',
    unit = '',
    plotTheme: theme = {},
  } = props
  const pieces = props.pieces ?? defaultMapPieces
  const baseColor = theme.mapAreaColor ?? theme.mutedColor ?? '#CDD9E7'
  const borderColor = theme.mapBorderColor ?? '#FFFFFF'
  const blue = theme.color ?? '#4089FF'
  const colorFor = (item: MapDataItem, index: number) =>
    item.color ??
    theme.palette?.[index % theme.palette.length] ??
    statusColors[index % statusColors.length]!
  const densityColor = (value: number) =>
    pieces.find(piece =>
      piece.value !== undefined
        ? value === piece.value
        : value >= (piece.min ?? -Infinity) && value <= (piece.max ?? Infinity),
    )?.color ?? baseColor
  const points = data.filter(item => item.coordinate?.length === 2 && item.coordinate.every(finite))
  const series: NonNullable<MapOption['series']> =
    mode === 'density'
      ? [
          {
            id: 'map-density',
            type: 'map',
            map,
            geoIndex: 0,
            data: data.map(item => ({
              name: item.region ?? item.name,
              value: finite(item.value) ? item.value : undefined,
              label: {
                color: finite(item.value)
                  ? densityLabelColor(densityColor(item.value), blue)
                  : blue,
              },
              emphasis: {
                itemStyle: {
                  areaColor: hoverColor(
                    finite(item.value)
                      ? densityColor(item.value)
                      : (theme.mapEmptyColor ?? '#F0F3F7'),
                  ),
                },
              },
            })),
          },
        ]
      : [
          ...(mode === 'lines'
            ? [
                {
                  id: 'map-lines',
                  type: 'lines' as const,
                  coordinateSystem: 'geo' as const,
                  z: 3,
                  effect: { show: true, period: 5, trailLength: 0.15, symbolSize: 4, color: blue },
                  lineStyle: {
                    color: blue,
                    width: 1.5,
                    opacity: 1,
                    type: [6, 4],
                    curveness: 0.5,
                  },
                  emphasis: { lineStyle: { width: 3, opacity: 1, type: [6, 4] } },
                  data: lines
                    .filter(
                      item =>
                        item.coords.length === 2 &&
                        item.coords.every(coord => coord.length === 2 && coord.every(finite)),
                    )
                    .map(item => ({
                      name: `${item.from} – ${item.to}`,
                      coords: item.coords,
                      value: item.value ?? undefined,
                      lineStyle: {
                        color: lineGradient(item.coords, item.color ?? blue),
                        // Reverse westbound curves so both directions bow upward.
                        curveness: item.coords[1][0] < item.coords[0][0] ? -0.5 : 0.5,
                      },
                      effect: { color: item.color ?? blue },
                      metrics: item.metrics,
                    })),
                },
              ]
            : []),
          {
            id: 'map-points',
            type: 'scatter',
            coordinateSystem: 'geo',
            z: 4,
            symbol: mode === 'status' ? 'pin' : 'circle',
            // ECharts centers the stroke on the symbol edge: 10 + 4 = 14px overall.
            symbolSize: mode === 'status' ? 28 : mode === 'lines' ? 10 : 12,
            itemStyle: { borderColor, borderWidth: mode === 'status' ? 1 : 4, opacity: 1 },
            ...(mode === 'lines' ? { emphasis: { scale: false } } : {}),
            label: {
              show: props.showLabel ?? mode === 'lines',
              position: 'bottom',
              distance: mode === 'lines' ? 2 : 8,
              color: theme.secondaryTextColor ?? '#6F7785',
              fontSize: 12,
              fontWeight: 'normal',
              lineHeight: 20,
              backgroundColor: theme.mapLabelBackgroundColor ?? '#FFFFFF',
              padding: [4, 8],
              borderRadius: 12,
              formatter: '{b}',
            },
            data: points.map(item => ({
              name: item.name,
              ...(item.symbol
                ? {
                    symbol: item.symbol,
                    symbolSize: item.symbol === 'pin' ? 28 : mode === 'lines' ? 10 : 12,
                  }
                : {}),
              ...((mode === 'status' && (!item.symbol || item.symbol === 'pin')) ||
              (mode === 'lines' && item.symbol === 'pin')
                ? {
                    symbol: pinSymbol(
                      mode === 'status'
                        ? colorFor(item, data.indexOf(item))
                        : (item.color ?? '#12A679'),
                      mode === 'status',
                    ),
                    symbolOffset: [0, '-50%'],
                    ...(mode === 'lines'
                      ? { label: { position: 'top' as const, distance: 2 } }
                      : {}),
                  }
                : {}),
              value: [...item.coordinate!, finite(item.value) ? item.value : '-'],
              itemStyle: {
                color:
                  mode === 'status' ? colorFor(item, data.indexOf(item)) : (item.color ?? blue),
                ...(mode === 'lines' && (!item.symbol || item.symbol === 'circle')
                  ? { color: '#FFFFFF', borderColor: item.color ?? '#006EFF' }
                  : {}),
              },
            })),
          },
        ]
  const generated: MapOption = {
    ...(theme.fontFamily ? { textStyle: { fontFamily: theme.fontFamily } } : {}),
    geo: {
      map,
      roam: props.roam ?? true,
      // ECharts 5 lacks preserveAspect; its center/size layout keeps geometry intact.
      ...(Number(echartsVersion.split('.')[0]) >= 6
        ? { left: '12%', right: '6%', top: 24, bottom: 24, preserveAspect: 'contain' as const }
        : { layoutCenter: ['50%', '48%'], layoutSize: '90%' }),
      label: { show: mode === 'density' && props.showLabel !== false, color: blue, fontSize: 10 },
      itemStyle: {
        areaColor: mode === 'density' ? (theme.mapEmptyColor ?? '#F0F3F7') : baseColor,
        borderColor,
        borderWidth: 0.6,
        ...(mode === 'density'
          ? {}
          : { shadowColor: theme.mapShadowColor ?? '#BCD2E8', shadowBlur: 2, shadowOffsetY: 3 }),
      },
      emphasis: {
        label: { show: props.showLabel !== false, color: theme.textColor ?? '#1C4EFF' },
        itemStyle: { areaColor: hoverColor(baseColor) },
      },
      select: { disabled: true },
      regions:
        mode === 'status'
          ? data.map((item, index) => ({
              name: item.region ?? item.name,
              itemStyle: { areaColor: colorFor(item, index), opacity: 0.45 },
              emphasis: { itemStyle: { areaColor: colorFor(item, index), opacity: 0.65 } },
            }))
          : [],
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      formatter: createPlotTooltipFormatter((params: PlotTooltipParams) => {
        const item = Array.isArray(params) ? params[0] : params
        if (!item) return
        const datum = item.data as { metrics?: MapLineItem['metrics'] } | undefined
        const region =
          mode === 'status'
            ? data.find(datum => (datum.region ?? datum.name) === item.name)
            : undefined
        const value = region ? region.value : Array.isArray(item.value) ? item.value[2] : item.value
        return {
          title: item.seriesType === 'lines' ? (item.name ?? '') : metricName,
          rows:
            item.seriesType === 'lines' && datum?.metrics?.length
              ? datum.metrics.map(metric => ({
                  name: metric.name,
                  value: `${metric.value}${metric.unit ? ' ' + metric.unit : ''}`,
                  color: blue,
                }))
              : [
                  {
                    name: region?.name ?? item.name ?? '',
                    value: finite(value) ? `${value}${unit ? ' ' + unit : ''}` : '-',
                    color: blue,
                  },
                ],
        }
      }),
    },
    visualMap:
      mode === 'density'
        ? {
            type: 'piecewise',
            seriesIndex: 0,
            pieces,
            left: 16,
            bottom: 16,
            selectedMode: false,
            itemSymbol: 'roundRect',
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 10,
            padding: 12,
            backgroundColor: theme.mapLabelBackgroundColor ?? '#FFFFFF',
            borderColor: theme.borderColor ?? '#E1E5EB',
            borderWidth: 1,
            textStyle: { color: theme.secondaryTextColor ?? '#6F7785' },
            outOfRange: { color: theme.mapEmptyColor ?? '#F0F3F7' },
          }
        : mode === 'status'
          ? {
              type: 'piecewise',
              inverse: true,
              seriesIndex: [],
              pieces: data.map((item, index) => ({
                value: index,
                label: `${item.name}    ${finite(item.value) ? item.value : '-'}`,
                color: colorFor(item, index),
              })),
              selectedMode: false,
              left: 16,
              bottom: 16,
              itemSymbol: 'roundRect',
              itemWidth: 12,
              itemHeight: 12,
              itemGap: 10,
              padding: 12,
              backgroundColor: theme.mapLabelBackgroundColor ?? '#FFFFFF',
              borderColor: theme.borderColor ?? '#E1E5EB',
              borderWidth: 1,
              textStyle: { color: theme.secondaryTextColor ?? '#6F7785' },
            }
          : undefined,
    series,
  }
  return mergeNativePlotOptions(generated, props, mapProps)
}
