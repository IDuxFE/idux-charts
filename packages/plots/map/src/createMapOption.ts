import { version as echartsVersion } from 'echarts/core'
import { omit } from 'lodash-es'
import { splitChartOptions, type ChartProps } from '@idux/charts-core'
import { mergePlotOptions } from '../../shared/plotOptions'
import { hoverColor } from './mapStyle'
import type { MapChartProps, MapOption } from './types'

export type * from './types'
export { createMapPieces, defaultMapPieces } from './mapDefaults'
export {
  createMapNodes,
  createMapLines,
  createMapRegions,
  createMapVisualMap,
  getMapPieceColor,
} from './mapHelpers'

export const mapProps = ['plotTheme'] as const

/** Style the base map and compose native ECharts options without translating series. */
export function createMapOption(props: MapChartProps): MapOption {
  const { plotTheme: theme = {} } = props
  const areaColor = theme.mapAreaColor ?? theme.mutedColor ?? '#CDD9E7'
  const { option } = splitChartOptions(omit(props, mapProps) as ChartProps)
  return mergePlotOptions<MapOption>(
    {
      ...(theme.fontFamily ? { textStyle: { fontFamily: theme.fontFamily } } : {}),
      color: theme.palette ?? [theme.color ?? '#4089FF'],
      geo: {
        roam: true,
        ...(Number(echartsVersion.split('.')[0]) >= 6
          ? { left: '12%', right: '6%', top: 24, bottom: 24, preserveAspect: 'contain' as const }
          : { layoutCenter: ['50%', '48%'], layoutSize: '90%' }),
        label: { show: false, color: theme.color ?? '#4089FF', fontSize: 10 },
        itemStyle: {
          areaColor,
          borderColor: theme.mapBorderColor ?? '#FFFFFF',
          borderWidth: 0.6,
          shadowColor: theme.mapShadowColor ?? '#BCD2E8',
          shadowBlur: 2,
          shadowOffsetY: 3,
        },
        emphasis: { label: { show: false }, itemStyle: { areaColor: hoverColor(areaColor) } },
        select: { disabled: true },
        regions: [],
      },
      tooltip: { trigger: 'item', confine: true },
      series: [],
    },
    option as Partial<MapOption>,
  )
}
