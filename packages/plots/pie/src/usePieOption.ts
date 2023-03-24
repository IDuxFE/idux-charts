import { type InjectionKey, computed, inject } from 'vue-demi'

import { type PieSeriesOption } from 'echarts/charts'
import { merge, get, set, cloneDeep } from 'lodash-es'

import { convertArray, type AdditionalChartOption, type BaseChartOption } from '@idux/charts-core'

export interface PieChartProps extends BaseChartOption<PieSeriesOption>, AdditionalChartOption {
  data?: PieSeriesOption['data']
  name?: PieSeriesOption['name']
  radius?: PieSeriesOption['radius']
  roseType?: PieSeriesOption['roseType']
}

export const pieChartProps = ['data', 'name', 'radius', 'roseType'] as const

export const PIE_CHART_TOKEN: InjectionKey<PieChartProps> = Symbol('PIE_CHART_TOKEN')

const defaultProps: PieChartProps = {
  style: 'width:400px; height:200px;',
  legend: {
    orient: 'vertical',
    itemGap: 4,
    right: 16,
  },
  title: {
    textStyle: {
      fontSize: '30px',
    },
  },
  tooltip: { trigger: 'item' },
}

export function usePieOption(props: PieSeriesOption, attrs: PieChartProps) {
  const injectProps = inject(PIE_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<PieSeriesOption>(() => {
    const { data = [], radius = '80%' } = props
    return { ...props, type: 'pie', data, radius }
  })

  const total = computed(() =>
    // @ts-ignore
    mergedSeriesOption.value.data!.reduce((curr, next) => curr + next.value, 0),
  )

  const mergedOption = computed(() => {
    const option = merge(mergedDefaultProps, attrs)
    if (attrs.title) {
      if (!get(option, ['title', 'text'])) {
        set(option, ['title', 'text'], `${total.value}`)
      }
    } else {
      option.title = undefined
    }
    return option
  })

  return computed(() => {
    const option = mergedOption.value
    const seriesOption = mergedSeriesOption.value
    const { series } = attrs
    if (!series) {
      option.series = [seriesOption]
    } else {
      option.series = convertArray(series).map(item => merge({}, seriesOption, item))
    }
    return option
  })
}
