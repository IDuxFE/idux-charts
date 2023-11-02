import { getAlphaColor } from '@idux/charts-core'
import { graphic, LinearGradientObject } from 'echarts/core'

export function useLinearGradient(color: string = '#458FFF'): LinearGradientObject {
  return new graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: getAlphaColor(color, 0.3),
    },
    {
      offset: 0.5,
      color: getAlphaColor(color, 0.2),
    },
    {
      offset: 1,
      color: getAlphaColor(color, 0),
    },
  ])
}
