import { PieChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Pie from './src/Pie'

createInstall(Pie, [PieChart])

const IxPieChart = Pie

export { IxPieChart }
export { usePieOption, PIE_CHART_TOKEN, type PieChartProps } from './src/usePieOption'
