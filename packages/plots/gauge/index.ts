import { GaugeChart, CustomChart } from 'echarts/charts'
import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'
import Gauge from './src/Gauge'
export const IxGaugeChart: InstallableChart<typeof Gauge> = createInstall(Gauge, [
  GaugeChart,
  CustomChart,
])
export { createGaugeOption } from './src/createGaugeOption'
export type { GaugeChartProps, GaugeChartPublicProps } from './src/createGaugeOption'
export type { GaugeSegment } from './src/createGaugeOption'
