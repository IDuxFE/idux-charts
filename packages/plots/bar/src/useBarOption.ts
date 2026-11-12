import {
  applyCartesianLegend,
  applyCartesianTooltip,
  cartesianGridBounds,
  mergeAxisOption,
  reserveCartesianSpace,
} from '../../shared/cartesian'
import { mergePlotOptions, resolvePlotInput } from '../../shared/plotOptions'
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { BarSeriesOption } from 'echarts/charts'
import { get, omit, set } from 'lodash-es'

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
export const barPlotProps = [...barChartProps, ...categoryBarProps] as const

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
    ...cartesianGridBounds,
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
  return computed(() => {
    const { props: seriesProps, attrs } = resolvePlotInput(
      injectProps,
      filterEmptyProps(unref(props)) as BarChartProps,
      unref(attrsInput),
      barPlotProps,
    )
    const option = mergePlotOptions<BarChartProps>(defaultProps, attrs)
    const seriesOption = {
      emphasis: { disabled: true },
      ...omit(seriesProps, categoryBarProps),
      type: 'bar',
    } as BarSeriesOption
    reserveCartesianSpace(option, defaultProps, attrs)
    const { xAxis, yAxis, series } = option
    const [defaultXAxis, defaultYAxis] = isVertical(option)
      ? [defaultCategoryAxis, defaultValueAxis]
      : [defaultValueAxis, defaultCategoryAxis]

    option.xAxis = mergeAxisOption(defaultXAxis, xAxis)
    option.yAxis = mergeAxisOption(defaultYAxis, yAxis)

    option.series =
      series === undefined
        ? [seriesOption]
        : convertArray(series).map(item => mergePlotOptions(seriesOption, item))
    applyCartesianLegend(option, attrs.legend)
    if (
      !Array.isArray(option.tooltip) &&
      get(option, ['tooltip', 'axisPointer', 'lineStyle', 'width']) === undefined
    ) {
      const axisPointerWidth =
        (option.series.length || 1) * defaultBarWidth * (1 + defaultBarGap) + 8
      set(option, ['tooltip', 'axisPointer', 'lineStyle', 'width'], axisPointerWidth)
    }
    applyCartesianTooltip(option)

    return option
  })
}
