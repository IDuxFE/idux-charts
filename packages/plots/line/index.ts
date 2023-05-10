import { LineChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Line from './src/Line'

createInstall(Line, [LineChart])

const IxLineChart = Line

export { IxLineChart }
export { useLineOption, LINE_CHART_TOKEN, type LineChartProps } from './src/useLineOption'
export { useLinearGradient } from './src/useLinearGradient'
