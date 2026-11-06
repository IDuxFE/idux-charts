declare module 'vue' {
  export interface GlobalComponents {
    IxChart: (typeof import('@idux/charts-core'))['IxChart']
    IxBarChart: (typeof import('@idux/charts-plots'))['IxBarChart']
    IxLineChart: (typeof import('@idux/charts-plots'))['IxLineChart']
    IxRadarChart: (typeof import('@idux/charts-plots'))['IxRadarChart']
    IxGaugeChart: (typeof import('@idux/charts-plots'))['IxGaugeChart']
    IxLiquidFillChart: (typeof import('@idux/charts-plots'))['IxLiquidFillChart']
    IxPieChart: (typeof import('@idux/charts-plots'))['IxPieChart']
  }
}

export {}
