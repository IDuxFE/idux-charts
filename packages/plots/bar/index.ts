import { BarChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Bar from './src/Bar'

createInstall(Bar, [BarChart])

const IxBarChart = Bar

export { IxBarChart }
export { useBarOption, BAR_CHART_TOKEN, type BarChartProps } from './src/useBarOption'

export { getBarLinearColors } from './src/getBarLinearColors';
