declare module 'vue' {
  export interface GlobalComponents {
    IxChart: typeof import('@idux/charts-core')['IxChart']
    IxBarChart: typeof import('@idux/charts-plots')['IxBarChart']
    IxLineChart: typeof import('@idux/charts-plots')['IxLineChart']
    IxPieChart: typeof import('@idux/charts-plots')['IxPieChart']
  }
}

export {}
