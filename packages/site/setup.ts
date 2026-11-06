import type { App, Plugin } from 'vue'
import { loadDemoFont } from './demoFont'

import '@idux/cdk/index.css'
import '@idux/components/index.full.css'
import '@idux/pro/index.css'
import './demo.css'

import type { ArchiveLoaderVueSetup } from '@idux/archive-loader-vue'
import {
  IxBarChart,
  IxChart,
  IxLineChart,
  IxPieChart,
  IxRadarChart,
  IxLiquidFillChart,
  IxGaugeChart,
} from '@idux/charts'

const plugins = [
  IxChart,
  IxBarChart,
  IxLineChart,
  IxPieChart,
  IxRadarChart,
  IxLiquidFillChart,
  IxGaugeChart,
] as unknown as Plugin[]

loadDemoFont().catch(() => {})

const setup: ArchiveLoaderVueSetup = {
  setupApp(app: App) {
    plugins.forEach(plugin => app.use(plugin))
  },
}

export default setup
