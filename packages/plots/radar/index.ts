import { RadarChart } from 'echarts/charts'
import { RadarComponent } from 'echarts/components'
import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'
import Radar from './src/Radar'
export const IxRadarChart: InstallableChart<typeof Radar> = createInstall(Radar, [
  RadarChart,
  RadarComponent,
])
export { createRadarOption } from './src/createRadarOption'
export type { RadarChartProps, RadarChartPublicProps } from './src/createRadarOption'
