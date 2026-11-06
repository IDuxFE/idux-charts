import { GraphicComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Pie from './src/Pie'

const IxPieChart = createInstall(Pie, [PieChart, GraphicComponent])

export { IxPieChart }
export {
  usePieOption,
  PIE_CHART_TOKEN,
  type PieChartProps,
  type PieSeriesStyle,
  type PieChartAlign,
  type PieChartDataItem,
  type PieChartPublicProps,
} from './src/usePieOption'
