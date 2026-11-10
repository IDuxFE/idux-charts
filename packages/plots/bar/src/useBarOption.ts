import { mergeAxisOption, createCartesianTooltip } from '../../shared/cartesian'
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { BarSeriesOption } from 'echarts/charts'
import { cloneDeep, get, set, merge } from 'lodash-es'

import { isVertical, convertArray, filterEmptyProps } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'

import type { CategoryBarProps } from './createCategoryBarOption'

export const categoryBarProps = [
  'categories',
  'layout',
  'referenceLine',
  'zeroText',
  'plotTheme',
] as const

export const barChartProps = [
  'data',
  'barGap',
  'barWidth',
  'label',
  'name',
  'markArea',
  'stack',
] as const

type NativeBarData = NonNullable<BarSeriesOption['data']>

/** A category value may carry a reason when its measurement is missing. */
export type BarChartDataItem = Extract<NativeBarData[number], { value?: unknown }> & {
  missingReason?: string
}

type BarChartData = Array<NativeBarData[number] | BarChartDataItem>
type BarChartSeriesOption = Omit<BarSeriesOption, 'data'> & { data?: BarChartData }

export interface BarChartProps
  extends
    BaseChartOption<BarChartSeriesOption>,
    AdditionalChartOption,
    CategoryBarProps,
    Pick<BarSeriesOption, Exclude<(typeof barChartProps)[number], 'data'>> {
  data?: BarChartData
}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type BarChartPublicProps = KnownProps<BarChartProps>

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
  type: 'category' as const,
}

const defaultValueAxis = {
  type: 'value' as const,
}

export function useBarOption(
  props: BarSeriesOption | ComputedRef<BarSeriesOption>,
  attrsInput: BarChartProps | ShallowRef<BarChartProps>,
): ComputedRef<BarChartProps> {
  const injectProps = inject(BAR_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<BarSeriesOption>(() => {
    const option = filterEmptyProps(unref(props))
    option.type = 'bar'

    // Disable the native hover highlight unless the caller configures it.
    if (!option.emphasis) {
      option.emphasis = {
        disabled: true,
      }
    }

    return option
  })

  const mergedOption = computed(() => {
    const attrs = unref(attrsInput)
    const option = merge({}, mergedDefaultProps, attrs)
    if (attrs.title && !get(attrs, ['grid', 'top'])) {
      // Reserve room for the title.
      const top = get(mergedDefaultProps, ['grid', 'top'], 32) + 24
      set(option, ['grid', 'top'], top)
    }
    if (attrs.dataZoom && !get(attrs, ['grid', 'bottom'])) {
      // Reserve room for the zoom slider.
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

    option.xAxis = mergeAxisOption(defaultXAxis, xAxis)
    option.yAxis = mergeAxisOption(defaultYAxis, yAxis)

    if (!series) {
      option.series = seriesOption ? [seriesOption] : []
    } else {
      option.series = convertArray(series).map(item => merge({}, seriesOption, item))
    }

    if (!get(option, ['tooltip', 'formatter'])) {
      option.tooltip = { ...option.tooltip, formatter: createCartesianTooltip(option) }
    }

    return option
  })
}
