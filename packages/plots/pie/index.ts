import { PieChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Pie from './src/Pie'

const IxPieChart = createInstall(Pie, [PieChart])

export { IxPieChart }
export {
  usePieOption,
  PIE_CHART_TOKEN,
  type PieChartProps,
  type PieChartPublicProps,
} from './src/usePieOption'
