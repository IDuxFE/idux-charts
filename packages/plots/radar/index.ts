import { RadarChart } from 'echarts/charts'
import { RadarComponent } from 'echarts/components'
import { createInstall } from '@idux/charts-core'
import Radar from './src/Radar'
export const IxRadarChart = createInstall(Radar, [RadarChart, RadarComponent])
export { createRadarOption } from './src/createRadarOption'
export type { RadarChartProps, RadarChartPublicProps } from './src/createRadarOption'
