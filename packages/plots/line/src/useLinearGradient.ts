import { graphic, LinearGradientObject } from 'echarts/core'

export function useLinearGradient(): LinearGradientObject {
  return new graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(69, 143, 255, 0.35)',
    },
    {
      offset: 0.5,
      color: 'rgba(69, 143, 255, 0.2)',
    },
    {
      offset: 1,
      color: 'rgba(69, 143, 255, 0.00)',
    },
  ])
}
