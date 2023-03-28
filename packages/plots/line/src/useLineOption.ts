import { type InjectionKey, computed, inject } from 'vue-demi'

import { type LineSeriesOption } from 'echarts/charts'
import { cloneDeep, get, merge, set } from 'lodash-es'

import {
  type AdditionalChartOption,
  type BaseChartOption,
  isVertical,
  convertArray,
} from '@idux/charts-core'

export const lineChartProps = ['data', 'name', 'label', 'markArea', 'smooth'] as const

export interface LineChartProps
  extends BaseChartOption<LineSeriesOption>,
    AdditionalChartOption,
    Pick<LineSeriesOption, (typeof lineChartProps)[number]> {}

export const LINE_CHART_TOKEN: InjectionKey<LineChartProps> = Symbol('LINE_CHART_TOKEN')

const defaultProps: LineChartProps = {
  style: 'width:100%; height:300px;',
  grid: {
    top: 32,
    bottom: 32,
    left: 24,
    right: 24,
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

const defaultCategoryAxis = {
  type: 'category',
}

const defaultValueAxis = {
  type: 'value',
}

export function useLineOption(props: LineSeriesOption, attrs: LineChartProps) {
  const injectProps = inject(LINE_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<LineSeriesOption>(() => {
    const { data = [] } = props
    return { ...props, type: 'line', data }
  })

  const mergedOption = computed(() => {
    const option = merge(mergedDefaultProps, attrs)

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
