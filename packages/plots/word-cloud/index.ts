import { GraphChart } from 'echarts/charts'
import {
  GraphicComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'
import WordCloud from './src/WordCloud'
import { installWordCloudLayout } from './src/wordCloudLayout'
import { installWordCloudMotion } from './src/motion'

export const IxWordCloudChart: InstallableChart<typeof WordCloud> = createInstall(WordCloud, [
  GraphChart,
  installWordCloudLayout,
  installWordCloudMotion,
  LabelLayout,
  GraphicComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
])
export { createWordCloudOption } from './src/createWordCloudOption'
export type {
  WordCloudChartProps,
  WordCloudChartPublicProps,
  WordCloudChartDataItem,
  WordCloudShape,
  WordCloudMotion,
} from './src/types'
export { PLOT_THEME_TOKEN, type PlotTheme, type PlotTextStyle } from '../shared/plotTheme'
