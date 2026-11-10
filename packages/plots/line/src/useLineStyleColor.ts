import type { Color as ZRColor } from 'echarts'

import { getAlphaColor } from '@idux/charts-core'

export function useLineStyleColor(color: string = '#458FFF') {
  return {
    // Fade the line toward both ends.
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: getAlphaColor(color, 0.1),
      },
      {
        offset: 0.2,
        color: getAlphaColor(color, 0.9),
      },
      {
        offset: 0.5,
        color: getAlphaColor(color, 1),
      },
      {
        offset: 0.8,
        color: getAlphaColor(color, 0.9),
      },
      {
        offset: 1,
        color: getAlphaColor(color, 0.1),
      },
    ],
    globalCoord: false,
  } as ZRColor
}
