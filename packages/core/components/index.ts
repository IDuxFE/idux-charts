import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

import Chart from './Chart'
import { createInstall } from '../utils'

createInstall(Chart, [
  DataZoomComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,

  LabelLayout,
  UniversalTransition,

  SVGRenderer,
])

const IxChart = Chart

export { IxChart }
export { CHART_TOKEN, type ChartProps } from './Chart'
