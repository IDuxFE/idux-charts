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

import type { LineSeriesOption } from 'echarts/charts'
import { get, omit, set } from 'lodash-es'

import { isVertical, convertArray, filterEmptyProps, CHART_THEME_TOKEN } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'

import type { CategoryLineProps } from './createCategoryLineOption'
import type { LineChartDataItem } from './categoryLineData'

type LineChartData = Array<NonNullable<LineSeriesOption['data']>[number] | LineChartDataItem>
type LineChartSeriesOption = Omit<LineSeriesOption, 'data'> & { data?: LineChartData }

export const lineChartProps = [
  'data',
  'areaStyle',
  'label',
  'name',
  'markArea',
  'smooth',
  'stack',
] as const
const lineLayoutProps = ['categories', 'area', 'referenceLine', 'zeroText', 'plotTheme'] as const
export const linePlotProps = [...lineChartProps, ...lineLayoutProps] as const

export interface LineChartProps
  extends
    BaseChartOption<LineChartSeriesOption>,
    AdditionalChartOption,
    CategoryLineProps,
    Pick<LineSeriesOption, Exclude<(typeof lineChartProps)[number], 'data'>> {
  data?: LineChartData
}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type LineChartPublicProps = KnownProps<LineChartProps>

export const LINE_CHART_TOKEN: InjectionKey<LineChartProps> = Symbol('LINE_CHART_TOKEN')

const defaultProps: LineChartProps = {
  grid: {
    top: 32,
    bottom: 32,
    left: 32,
    right: 32,
    ...cartesianGridBounds,
  },
  legend: {
    // Use a color swatch in place of the native line legend icon.
    icon: 'rect',
    bottom: 0,
    itemGap: 40,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
}

const defaultCategoryAxis = {
  type: 'category' as const,
}

const defaultValueAxis = {
  type: 'value' as const,
}

export function useLineOption(
  props: LineSeriesOption | ComputedRef<LineSeriesOption>,
  attrsInput: LineChartProps | ShallowRef<LineChartProps>,
): ComputedRef<LineChartProps> {
  const providedTheme = inject(CHART_THEME_TOKEN, undefined)
  const injectProps = inject(LINE_CHART_TOKEN, null)
  return computed(() => {
    const { props: seriesProps, attrs } = resolvePlotInput(
      injectProps,
      filterEmptyProps(unref(props)) as LineChartProps,
      unref(attrsInput),
      linePlotProps,
    )
    const option = mergePlotOptions<LineChartProps>(defaultProps, attrs)
    const seriesOption = { ...omit(seriesProps, lineLayoutProps), type: 'line' } as LineSeriesOption
    // Preserve Seer's original light pointer; other themes own their colors.
    if (
      (option.theme ?? unref(providedTheme) ?? 'seer') === 'seer' &&
      !Array.isArray(option.tooltip) &&
      get(option, ['tooltip', 'axisPointer', 'lineStyle', 'color']) === undefined
    ) {
      set(option, ['tooltip', 'axisPointer', 'lineStyle', 'color'], '#D3D7DE')
    }

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
    applyCartesianTooltip(option)

    return option
  })
}
