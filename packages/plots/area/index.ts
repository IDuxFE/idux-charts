import { createInstall } from '@idux/charts-core'
import Area from './src/Area'

export const IxAreaChart = createInstall(Area, [])
export type {
  LineChartProps as AreaChartProps,
  LineChartPublicProps as AreaChartPublicProps,
  LineChartDataItem as AreaChartDataItem,
} from '../line'
export { PLOT_THEME_TOKEN, type PlotTheme, type PlotTextStyle } from '../shared/plotTheme'
