import { type InjectionKey, computed, inject } from 'vue-demi'

import { type PieSeriesOption } from 'echarts/charts'
import { cloneDeep, merge } from 'lodash-es'

import { type AdditionalChartOption, type BaseChartOption } from '@idux/charts-core'

export interface PieChartProps extends BaseChartOption<PieSeriesOption>, AdditionalChartOption {
  data?: PieSeriesOption['data']
  name?: PieSeriesOption['name']
  radius?: PieSeriesOption['radius']
  roseType?: PieSeriesOption['roseType']
}

export const pieChartProps = ['data', 'name', 'radius', 'roseType', 'tooltip'] as const

export const PIE_CHART_TOKEN: InjectionKey<PieChartProps> = Symbol('PIE_CHART_TOKEN')

const defaultProps: PieChartProps = {
  style: 'width:400px; height:200px;',

  legend: {
    orient: 'vertical',
    itemGap: 4,
    right: 16,
    textStyle: { width: '120px' },
  },
  tooltip: { trigger: 'item' },
}

export function usePieOption(props: PieSeriesOption, attrs: PieChartProps) {
  const injectProps = inject(PIE_CHART_TOKEN, null)
  const mergedDefaultProps = injectProps
    ? merge(cloneDeep(defaultProps), injectProps)
    : cloneDeep(defaultProps)

  const mergedOption = computed(() => merge(mergedDefaultProps, attrs))

  const mergedSeriesOption = computed<PieSeriesOption>(() => {
    const { data = [], radius = '80%' } = props
    return { ...props, type: 'pie', data, radius }
  })

  return computed(() => {
    const option = mergedOption.value
    const seriesOption = mergedSeriesOption.value

    const title = option.title

    if (title) {
      // @ts-ignore
      title!.text ??= seriesOption.data!.reduce((curr, next) => curr + next.value, 0)
    }

    if (!option.series) {
      option.series = [seriesOption]
    } else {
      option.series = merge([seriesOption], option.series)
    }

    return option
  })
}
