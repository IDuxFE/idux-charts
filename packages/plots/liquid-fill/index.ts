import { CustomChart } from 'echarts/charts'
import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'
import LiquidFill from './src/LiquidFill'
export const IxLiquidFillChart: InstallableChart<typeof LiquidFill> = createInstall(LiquidFill, [
  CustomChart,
])
export { createLiquidFillOption } from './src/createLiquidFillOption'
export type { LiquidFillChartProps, LiquidFillChartPublicProps } from './src/createLiquidFillOption'
