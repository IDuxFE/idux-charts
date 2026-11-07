import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { DefaultLabelFormatterCallbackParams } from 'echarts'

import type { LineSeriesOption } from 'echarts/charts'
import { cloneDeep, get, merge, set, isFunction } from 'lodash-es'

import { isVertical, convertArray, filterEmptyProps, useTooltipsFormatter } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'

export const lineChartProps = [
  'data',
  'areaStyle',
  'label',
  'name',
  'markArea',
  'smooth',
  'stack',
] as const

export interface LineChartProps
  extends
    BaseChartOption<LineSeriesOption>,
    AdditionalChartOption,
    Pick<LineSeriesOption, (typeof lineChartProps)[number]> {}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type LineChartPublicProps = KnownProps<LineChartProps>

export const LINE_CHART_TOKEN: InjectionKey<LineChartProps> = Symbol('LINE_CHART_TOKEN')

const defaultProps: LineChartProps = {
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
    axisPointer: {
      lineStyle: {
        type: 'dashed',
        color: '#D3D7DE',
      },
    },
  },
}

const defaultCategoryAxis = {
  type: 'category',
}

const defaultValueAxis = {
  type: 'value',
}

export function useLineOption(
  props: LineSeriesOption,
  attrsInput: LineChartProps | ShallowRef<LineChartProps>,
): ComputedRef<LineChartProps> {
  const injectProps = inject(LINE_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<LineSeriesOption>(() => {
    const option = filterEmptyProps(props)
    option.type = 'line'
    return option
  })

  const mergedOption = computed(() => {
    const attrs = unref(attrsInput)
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

    const tooltipFormatter = get(option, ['tooltip', 'formatter'])
    // 如果没有配置tooltip.formatter，则给个默认的
    if (!tooltipFormatter) {
      // value的处理：如果有配置valueFormatter，优先使用valueFormatter，然后是坐标轴名称
      const valueFormatter = get(option, ['tooltip', 'valueFormatter'])
      const yAxisName = get(option, ['yAxis', 'name'])
      set(option, ['tooltip', 'formatter'], (params: DefaultLabelFormatterCallbackParams[]) => {
        if (!params?.length) {
          return ''
        }

        const title = params[0]!.name
        const list = params.map(param => {
          return {
            name: param.seriesName ?? '',
            value: isFunction(valueFormatter)
              ? valueFormatter(param.value)
              : yAxisName
                ? `${param.value} ${yAxisName}`
                : param.value,
            color: typeof param.color === 'string' ? param.color : undefined,
          }
        })

        return useTooltipsFormatter(title, list)
      })
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
      option.series = seriesOption ? [seriesOption] : []
    } else {
      option.series = convertArray(series).map(item => merge({}, seriesOption, item))
    }

    return option
  })
}
