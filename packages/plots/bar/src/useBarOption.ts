import { type InjectionKey, computed, inject } from 'vue-demi'

import { type BarSeriesOption } from 'echarts/charts'
import { cloneDeep, get, merge, set } from 'lodash-es'

import {
  type AdditionalChartOption,
  type BaseChartOption,
  isVertical,
  convertArray,
} from '@idux/charts-core'

export interface BarChartProps extends BaseChartOption<BarSeriesOption>, AdditionalChartOption {
  data?: BarSeriesOption['data']
  name?: BarSeriesOption['name']
  barGap?: BarSeriesOption['barGap']
  barWidth?: BarSeriesOption['barWidth']
  label?: BarSeriesOption['label']
  markArea?: BarSeriesOption['markArea']
}

export const pieChartProps = ['data', 'name', 'barGap', 'barWidth', 'label', 'markArea'] as const

export const BAR_CHART_TOKEN: InjectionKey<BarChartProps> = Symbol('BAR_CHART_TOKEN')

const defaultProps: BarChartProps = {
  style: 'width:100%; height:300px;',
  grid: {
    top: 32,
    bottom: 32,
    left: 24,
    right: 24,
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
}

const defaultMarkArea = {
  label: {
    show: true,
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

export function useBarOption(props: BarSeriesOption, attrs: BarChartProps) {
  const injectProps = inject(BAR_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<BarSeriesOption>(() => {
    const { data = [], barGap = defaultBarGap, barWidth = defaultBarWidth, markArea } = props
    const mergedMarkArea = merge(cloneDeep(defaultMarkArea), markArea)
    return { ...props, type: 'bar', data, barGap, barWidth, markArea: mergedMarkArea }
  })

  const mergedOption = computed(() => {
    const option = merge(mergedDefaultProps, attrs)
    if (attrs.title && !get(attrs, ['grid', 'top'])) {
      // 如果有 title，额外增加 32px
      const top = get(mergedDefaultProps, ['grid', 'top'], 32) + 32
      set(option, ['grid', 'top'], top)
    }
    if (attrs.dataZoom && !get(attrs, ['grid', 'bottom'])) {
      // 如果有 title，额外增加 32px
      const bottom = get(mergedDefaultProps, ['grid', 'bottom'], 32) + 32
      set(option, ['grid', 'bottom'], bottom)
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
    const option = mergedOption.value
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
