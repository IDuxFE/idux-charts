import { mergeAxisOption, createCartesianTooltip } from '../../shared/cartesian'
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { LineSeriesOption } from 'echarts/charts'
import { cloneDeep, get, merge, set } from 'lodash-es'

import { isVertical, convertArray, filterEmptyProps, CHART_THEME_TOKEN } from '@idux/charts-core'
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
  props: LineSeriesOption,
  attrsInput: LineChartProps | ShallowRef<LineChartProps>,
): ComputedRef<LineChartProps> {
  const providedTheme = inject(CHART_THEME_TOKEN, undefined)
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
    // Preserve Seer's original light pointer; other themes own their colors.
    if (
      (option.theme ?? unref(providedTheme) ?? 'seer') === 'seer' &&
      get(option, ['tooltip', 'axisPointer', 'lineStyle', 'color']) === undefined
    ) {
      set(option, ['tooltip', 'axisPointer', 'lineStyle', 'color'], '#D3D7DE')
    }

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
