import { type ComputedRef, type InjectionKey, computed, inject } from 'vue-demi'

import { type BarSeriesOption } from 'echarts/charts'
import { cloneDeep, get, set, merge } from 'lodash-es'

import {
  type AdditionalChartOption,
  type BaseChartOption,
  isVertical,
  convertArray,
  filterEmptyProps,
} from '@idux/charts-core'

export const barChartProps = [
  'data',
  'barGap',
  'barWidth',
  'label',
  'name',
  'markArea',
  'stack',
] as const

export interface BarChartProps
  extends BaseChartOption<BarSeriesOption>,
    AdditionalChartOption,
    Pick<BarSeriesOption, (typeof barChartProps)[number]> {}

export const BAR_CHART_TOKEN: InjectionKey<BarChartProps> = Symbol('BAR_CHART_TOKEN')

const defaultProps: BarChartProps = {
  grid: {
    top: 32,
    bottom: 32,
    left: 32,
    right: 32,
    containLabel: true,
  },
  legend: {
    bottom: 0,
    itemGap: 40,
  },
  tooltip: {
    trigger: 'axis',
  },
}

const defaultBarGap = 0.2
const defaultBarWidth = 10

const defaultCategoryAxis = {
  type: 'category',
}

const defaultValueAxis = {
  type: 'value',
}

export function useBarOption(
  props: BarSeriesOption,
  attrs: BarChartProps,
): ComputedRef<BarChartProps> {
  const injectProps = inject(BAR_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<BarSeriesOption>(() => {
    const option = filterEmptyProps(props)
    option.type = 'bar'
    return option
  })

  const mergedOption = computed(() => {
    const option = merge({}, mergedDefaultProps, attrs)
    if (attrs.title && !get(attrs, ['grid', 'top'])) {
      // 如果有 title, 额外增加 24px
      const top = get(mergedDefaultProps, ['grid', 'top'], 32) + 24
      set(option, ['grid', 'top'], top)
    }
    if (attrs.dataZoom && !get(attrs, ['grid', 'bottom'])) {
      // 如果有 dataZoom, 额外增加 32px
      const bottom = get(mergedDefaultProps, ['grid', 'bottom'], 32) + 32
      set(option, ['grid', 'bottom'], bottom)
    }
    const legend = get(attrs, ['legend'])
    const series = convertArray(get(attrs, ['series']))
    // @ts-ignore
    if (legend === false || series.length <= 1) {
      set(option, ['legend'], undefined)
    }
    if (!get(option, ['tooltip', 'axisPointer', 'lineStyle', 'width'])) {
      // 当 series 为空时，默认为 1
      const seriesLength = convertArray(attrs.series).length || 1
      const axisPointerWidth = seriesLength * defaultBarWidth * (1 + defaultBarGap) + 8
      set(option, ['tooltip', 'axisPointer', 'lineStyle', 'width'], axisPointerWidth)
    }
    return option
  })

  return computed(() => {
    const option = { ...mergedOption.value }
    const seriesOption = mergedSeriesOption.value

    const { xAxis, yAxis, series } = option

    const [defaultXAxis, defaultYAxis] = isVertical(option)
      ? [defaultCategoryAxis, defaultValueAxis]
      : [defaultValueAxis, defaultCategoryAxis]

    option.xAxis = merge(cloneDeep(defaultXAxis), xAxis)
    option.yAxis = merge(cloneDeep(defaultYAxis), yAxis)

    if (!series) {
      option.series = [seriesOption]
    } else {
      option.series = convertArray(series).map(item => merge({}, seriesOption, item))
    }

    return option
  })
}
