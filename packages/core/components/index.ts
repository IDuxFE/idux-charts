import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

import Chart from './Chart'
import { createInstall } from '../utils'

const IxChart = createInstall(Chart, [
  DataZoomComponent,
  LegendComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,

  LabelLayout,
  UniversalTransition,

  SVGRenderer,
])

export { IxChart }
