import { BarChart, CustomChart } from 'echarts/charts'
import {
  GridComponent,
  GraphicComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
} from 'echarts/components'
import { LabelLayout } from 'echarts/features'
import { createInstall } from '@idux/charts-core'
import type { InstallableChart } from '@idux/charts-core'
import Bullet from './src/Bullet'
import { installBarShadow } from '../bar/src/barShadow'
import { installBulletDecal } from './src/bulletDecal'
import { installBulletLayout } from './src/bulletLayout'
import { installBulletVisual } from './src/bulletVisual'

export const IxBulletChart: InstallableChart<typeof Bullet> = createInstall(Bullet, [
  BarChart,
  CustomChart,
  installBulletLayout,
  installBulletVisual,
  installBulletDecal,
  installBarShadow,
  LabelLayout,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  GridComponent,
  GraphicComponent,
  TooltipComponent,
])
export { createBulletOption } from './src/createBulletOption'
export type {
  BulletChartProps,
  BulletChartPublicProps,
  BulletChartDataItem,
  BulletRange,
} from './src/createBulletOption'
export { PLOT_THEME_TOKEN, type PlotTheme, type PlotTextStyle } from '../shared/plotTheme'
