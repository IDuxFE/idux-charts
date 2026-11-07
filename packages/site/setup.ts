import { h, type App, type Plugin } from 'vue'
import { IxThemeProvider } from '@idux/components/theme'
import { chartTheme, plotTheme, isDark } from './theme'
import './theme.css'
import { loadDemoFont } from './demoFont'

import '@idux/cdk/index.css'
import '@idux/components/index.full.css'
import '@idux/pro/index.css'
import './demo.css'

import type { ArchiveLoaderVueSetup } from '@idux/archive-loader-vue'
import {
  CHART_THEME_TOKEN,
  PLOT_THEME_TOKEN,
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
  renderApp: children =>
    h(
      IxThemeProvider,
      { presetTheme: isDark.value ? 'dark' : 'default', hashed: false },
      { default: () => children },
    ),
  setupApp(app: App) {
    plugins.forEach(plugin => app.use(plugin))
    app.provide(CHART_THEME_TOKEN, chartTheme)
    app.provide(PLOT_THEME_TOKEN, plotTheme)
  },
}

export default setup
