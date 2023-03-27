import type { App } from 'vue'

import { BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components'
import { use, registerTheme } from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { seerTheme } from '@idux/charts'

const install = (_: App) => {
  // 注册必须的组件
  use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DataZoomComponent,
    LegendComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    PieChart,
    BarChart,
  ])

  // 主题 seer 主题
  registerTheme('seer', seerTheme)
}

export const chart = {
  install,
}
