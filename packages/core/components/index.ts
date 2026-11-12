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
import type { InstallableChart } from '../utils'

const IxChart: InstallableChart<typeof Chart> = createInstall(Chart, [
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
