import { BarChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Bar from './src/Bar'

const IxBarChart = createInstall(Bar, [BarChart])

export { IxBarChart }
export {
  useBarOption,
  BAR_CHART_TOKEN,
  type BarChartProps,
  type BarChartPublicProps,
} from './src/useBarOption'

export { getBarLinearColors, getBarLinearColor, LinearDirection } from './src/getBarLinearColors'
