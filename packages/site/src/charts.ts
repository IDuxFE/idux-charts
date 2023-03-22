import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components'
import { use, registerTheme } from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { seerTheme } from '@idux/charts'

// 注册必须的组件
use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  PieChart,
])

registerTheme('seer', seerTheme)
