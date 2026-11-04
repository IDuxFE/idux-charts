import type { App, Plugin } from 'vue'

import '@idux/cdk/index.css'
import '@idux/components/default.css'
import '@idux/components/switch/theme/default.css'
import '@idux/components/switch/style/index.css'
import '@idux/components/style/core/reset.css'
import '@idux/components/style/core/reset-scroll.css'

import type { ArchiveLoaderVueSetup } from '@idux/archive-loader-vue'
import { IxBarChart, IxChart, IxLineChart, IxPieChart } from '@idux/charts'

const plugins = [IxChart, IxBarChart, IxLineChart, IxPieChart] as unknown as Plugin[]

const setup: ArchiveLoaderVueSetup = {
  setupApp(app: App) {
    plugins.forEach(plugin => app.use(plugin))
  },
}

export default setup
