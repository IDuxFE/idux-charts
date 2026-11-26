declare module 'vue' {
  export interface GlobalComponents {
    IxChart: (typeof import('@idux/charts-core'))['IxChart']
    IxBarChart: (typeof import('@idux/charts-plots'))['IxBarChart']
    IxLineChart: (typeof import('@idux/charts-plots'))['IxLineChart']
    IxRadarChart: (typeof import('@idux/charts-plots'))['IxRadarChart']
    IxWordCloudChart: (typeof import('@idux/charts-plots'))['IxWordCloudChart']
    IxBulletChart: (typeof import('@idux/charts-plots'))['IxBulletChart']
    IxGaugeChart: (typeof import('@idux/charts-plots'))['IxGaugeChart']
    IxLiquidFillChart: (typeof import('@idux/charts-plots'))['IxLiquidFillChart']
    IxMapChart: (typeof import('@idux/charts-plots'))['IxMapChart']
    IxPieChart: (typeof import('@idux/charts-plots'))['IxPieChart']
  }
}

export {}
