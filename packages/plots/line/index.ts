import { LineChart } from 'echarts/charts'

import { createInstall } from '@idux/charts-core'

import Line from './src/Line'

const IxLineChart = createInstall(Line, [LineChart])

export { IxLineChart }
export {
  useLineOption,
  LINE_CHART_TOKEN,
  type LineChartProps,
  type LineChartPublicProps,
} from './src/useLineOption'
export { useLinearGradient } from './src/useLinearGradient'
export { useLineStyleColor } from './src/useLineStyleColor'
export * from './src/useLineChartAreaStripe'
