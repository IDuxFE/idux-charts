import type { BarSeriesOption } from 'echarts/charts'

import { useTooltipsFormatter } from './useTooltips'

export function useStripe({
  data = [],
  color = '',
  offset = [0, 0],
  rotate = -20,
  size = [2, 8],
}: {
  data: number[]
  color: string
  size?: [number, number]
  offset?: [number, number]
  rotate?: number
}): BarSeriesOption {
  return {
    name: '',
    data: data,
    // @ts-ignore
    type: 'pictorialBar',
    symbolRotate: rotate,
    silent: true,
    itemStyle: {
      color: color,
      opacity: 0,
    },
    emphasis: {
      itemStyle: {
        opacity: 1,
      },
    },
    symbolRepeat: 'fixed',
    symbolMargin: 2,
    symbol: 'rect',
    symbolClip: true,
    symbolSize: size,
    symbolPosition: 'start',
    symbolOffset: offset,
    z: 1,
    animationEasing: 'elasticOut',
  }
}

export function useStripeBarTooltip(unit: string) {
  return {
    axisPointer: {
      lineStyle: {
        opacity: 0.6,
      },
    },
    formatter: function (params: any) {
      if (!params?.length) {
        return ''
      }

      const title = params[0].name

      const list = params
        .filter((item: any) => !!item.seriesName)
        .map((param: any) => {
          return {
            name: param.seriesName,
            value: `${param.value} ${unit}`,
            color: param.color,
          }
        })

      return useTooltipsFormatter(title, list)
    },
  }
}

export function useStripeBarSeries({
  series,
  color,
  offset = [0, 0],
  rotate,
  size,
}: {
  // Bar series to overlay with stripes.
  series: {
    name: string
    data: number[]
  }
  // Stripe color.
  color: string
  // Stripe offset in pixels.
  offset?: [number, number]
  // Stripe symbol dimensions.
  size?: [number, number]
  // Stripe symbol rotation in degrees.
  rotate?: number
}): BarSeriesOption[] {
  return [
    {
      type: 'bar',
      z: 0,
      ...series,
    },
    useStripe({
      data: series.data,
      offset: offset,
      color,
      rotate,
      size,
    }),
  ]
}

export function useStripeArea() {
  return {
    aria: {
      enabled: true,
      decal: {
        show: true,
        decals: [
          {
            color: 'white',
            dashArrayX: [1, 0],
            dashArrayY: [6, 0], // The first value controls stripe spacing.
            symbolSize: 0.5, // 0.5 splits the stripe and the gap evenly.
            rotation: Math.PI / 2, // Keep the stripes vertical.
          },
        ],
      },
    },
  }
}
