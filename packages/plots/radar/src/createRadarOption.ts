import type { PlotTheme, PlotTextStyle } from '../../shared/plotTheme'
import type { RadarSeriesOption } from 'echarts/charts'
import type { RadarComponentOption } from 'echarts/components'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'
import { convertArray, getTooltipsColor } from '@idux/charts-core'
import { mergeNativePlotOptions, mergePlotOptions } from '../../shared/plotOptions'
import { createPlotTooltipFormatter } from '../../shared/plotTooltip'
import type { PlotTooltipParams } from '../../shared/plotTooltip'

export const radarProps = [
  'indicator',
  'data',
  'area',
  'gridStyle',
  'splitNumber',
  'radius',
  'center',
  'clockwise',
  'plotTheme',
] as const

export interface RadarChartProps
  extends BaseChartOption<RadarSeriesOption | RadarComponentOption>, AdditionalChartOption {
  plotTheme?: PlotTheme
  indicator?: RadarComponentOption['indicator']
  data?: RadarSeriesOption['data']
  area?: boolean
  gridStyle?: 'line' | 'area'
  splitNumber?: number
  radius?: RadarComponentOption['radius']
  center?: RadarComponentOption['center']
  /** Place indicators clockwise from the first axis, keeping values aligned. */
  clockwise?: boolean
}
export type RadarChartPublicProps = KnownProps<RadarChartProps>

/** Reverse axes and values together without mutating caller-owned data. */
export function createRadarOption(
  props: RadarChartProps,
): BaseChartOption<RadarSeriesOption | RadarComponentOption> {
  const theme = props.plotTheme ?? {}
  const reorder = <T extends unknown[]>(items: T): T =>
    (items.length > 1 ? [items[0]!, ...items.slice(1).reverse()] : [...items]) as T
  const primaryRadar = Array.isArray(props.radar) ? props.radar[0] : props.radar
  const indicator = primaryRadar?.indicator ?? props.indicator ?? []
  const data = props.data ?? []
  const clockwise = props.clockwise && props.series === undefined
  const orderedIndicator = clockwise ? reorder(indicator) : indicator
  const firstRadar = mergePlotOptions<RadarComponentOption>(
    {
      center: props.center ?? ['50%', '50%'],
      axisNameGap: 16,
      radius: props.radius ?? '65%',
      splitNumber: props.splitNumber ?? 5,
      axisName: {
        color: theme.secondaryTextColor ?? theme.textColor ?? '#6F7785',
        fontSize: 12,
        ...(theme.fontFamily ? { fontFamily: theme.fontFamily } : {}),
        ...(props.textStyle as PlotTextStyle | undefined),
      },
      axisLine: { lineStyle: { color: theme.borderColor ?? '#D8DDE5' } },
      splitLine: { lineStyle: { color: theme.splitLineColor ?? '#E1E5EB' } },
      splitArea: {
        show: props.gridStyle !== 'line',
        areaStyle: { color: [theme.splitAreaColor ?? '#F6F8FA', 'transparent'] },
      },
    },
    primaryRadar,
    { indicator: orderedIndicator },
  )
  const radar = Array.isArray(props.radar)
    ? props.radar.map((axis, index) => (index === 0 ? firstRadar : axis))
    : firstRadar
  const coordinates = convertArray(radar)
  const radarFor = (series?: RadarSeriesOption) =>
    series?.radarId === undefined
      ? coordinates[series?.radarIndex ?? 0]
      : coordinates.find(item => String(item.id) === String(series.radarId))
  const defaultSeries: RadarSeriesOption = {
    id: 'radar',
    type: 'radar',
    symbol: 'circle',
    symbolSize: 7,
    lineStyle: { width: 2 },
    areaStyle: { opacity: props.area ? 0.12 : 0 },
    data: clockwise
      ? data.map(item =>
          Array.isArray(item)
            ? reorder(item)
            : { ...item, value: item.value ? reorder(item.value) : item.value },
        )
      : data,
  }
  const series = (props.series === undefined ? [defaultSeries] : convertArray(props.series)).filter(
    item => radarFor(item)?.indicator?.length,
  )
  const generated: BaseChartOption<RadarSeriesOption | RadarComponentOption> = {
    ...(theme.palette ? { color: theme.palette } : theme.color ? { color: [theme.color] } : {}),
    ...(theme.fontFamily || theme.textColor
      ? { textStyle: { fontFamily: theme.fontFamily, color: theme.textColor } }
      : {}),
    tooltip: {
      trigger: 'item',
      confine: true,
      formatter: createPlotTooltipFormatter((params: PlotTooltipParams) => {
        const item = Array.isArray(params) ? params[0] : params
        if (!item || !Array.isArray(item.value)) return
        const values = item.value
        return {
          title: item.name ?? '',
          rows: (radarFor(series[item.seriesIndex ?? 0])?.indicator ?? []).map((axis, index) => ({
            name: axis.name ?? '',
            value: String(values[index] ?? '-'),
            color: getTooltipsColor(item.color),
          })),
        }
      }),
    },
    legend: { bottom: 0, icon: 'roundRect', itemWidth: 12, itemHeight: 12 },
    radar,
    series,
  }
  return mergeNativePlotOptions(generated, props, [...radarProps, 'radar', 'series'])
}
