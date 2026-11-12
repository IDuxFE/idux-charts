import { BarChart, CustomChart, LineChart } from 'echarts/charts'

import { GraphicComponent } from 'echarts/components'

import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'

import Bar from './src/Bar'
import { installBarShadow } from './src/barShadow'

const IxBarChart: InstallableChart<typeof Bar> = createInstall(Bar, [
  BarChart,
  CustomChart,
  LineChart,
  GraphicComponent,
  installBarShadow,
])

export { IxBarChart }
export {
  useBarOption,
  BAR_CHART_TOKEN,
  type BarChartDataItem,
  type BarChartProps,
  type BarChartPublicProps,
} from './src/useBarOption'

export { getBarLinearColors, getBarLinearColor, LinearDirection } from './src/getBarLinearColors'

export type { BarReferenceLine } from './src/createCategoryBarOption'

export { PLOT_THEME_TOKEN, type PlotTheme, type PlotTextStyle } from '../shared/plotTheme'
