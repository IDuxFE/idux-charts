import { type App, type Plugin } from 'vue'

// eslint-disable-next-line import/no-unassigned-import
import '@idux/cdk/index.css'
// eslint-disable-next-line import/no-unassigned-import
import '@idux/components/style/core/reset.default.css'
// eslint-disable-next-line import/no-unassigned-import
import '@idux/components/style/core/reset-scroll.default.css'

import { type ArchiveLoaderVueSetup } from '@idux/archive-loader-vue'
import { IxBarChart, IxChart, IxLineChart, IxPieChart } from '@idux/charts'

const plugins = [IxChart, IxBarChart, IxLineChart, IxPieChart] as unknown as Plugin[]

const setup: ArchiveLoaderVueSetup = {
  setupApp(app: App) {
    plugins.forEach(plugin => app.use(plugin))
  },
}

export default setup
