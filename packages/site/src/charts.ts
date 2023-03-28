import { type App, type Plugin } from 'vue'

import { IxBarChart, IxChart, IxLineChart, IxPieChart } from '@idux/charts'

const plugins = [IxChart, IxBarChart, IxLineChart, IxPieChart] as unknown as Plugin[]

const install = (app: App) => {
  plugins.forEach(plugin => app.use(plugin))
}

export const chart = {
  install,
}
