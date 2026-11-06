import { CustomChart } from 'echarts/charts'
import { createInstall } from '@idux/charts-core'
import LiquidFill from './src/LiquidFill'
export const IxLiquidFillChart = createInstall(LiquidFill, [CustomChart])
export { createLiquidFillOption } from './src/createLiquidFillOption'
export type { LiquidFillChartProps, LiquidFillChartPublicProps } from './src/createLiquidFillOption'
