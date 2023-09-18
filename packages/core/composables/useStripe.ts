/**
 * @file 柱状图条纹使用
 */
import { type BarSeriesOption } from 'echarts/charts'
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
    // 分隔线
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
  // 柱状图的数据
  series: {
    name: string
    data: number[]
  }
  // 柱状图以及条纹的颜色
  color: string
  // 条纹的偏移量，酌情设置，影响条纹的位置
  offset?: [number, number]
  // 条纹的大小
  size?: [number, number]
  // 条纹的旋转角度
  rotate?: number
}): BarSeriesOption[] {
  return [
    {
      type: 'bar',
      name: series.name,
      data: series.data,
      z: 0,
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
