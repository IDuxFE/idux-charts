import { CustomChart, LineChart } from 'echarts/charts'

import { GraphicComponent } from 'echarts/components'

import { createInstall } from '@idux/charts-core'

import Line from './src/Line'
import { installCategoryLineGapClipping } from './src/categoryLineGapClipping'
import { installCategoryLineInterpolation } from './src/categoryLineInterpolation'
import { installSingleAreaStripe } from './src/useLineChartAreaStripe'

const IxLineChart = createInstall(Line, [
  LineChart,
  CustomChart,
  GraphicComponent,
  installCategoryLineInterpolation,
  installCategoryLineGapClipping,
  installSingleAreaStripe,
])

export { IxLineChart }
export {
  useLineOption,
  LINE_CHART_TOKEN,
  type LineChartProps,
  type LineChartPublicProps,
} from './src/useLineOption'
export { useLinearGradient } from './src/useLinearGradient'
export { useLineStyleColor } from './src/useLineStyleColor'
export {
  getLineChartAreaStripeImgEl,
  useLineChartAreaStripe,
  type LineChartAreaStripeOption,
} from './src/useLineChartAreaStripe'

export type { LineChartDataItem } from './src/categoryLineData'
