// Frozen from main 371aa00 (1.0.0). Update only for an explicitly approved compatibility change.
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, ShallowRef } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'
import { merge, get, set, cloneDeep } from 'lodash-es'

import { convertArray, filterEmptyProps, useTooltipsFormatter } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'

export const pieChartProps = [
  'data',
  'center',
  'label',
  'name',
  'markArea',
  'radius',
  'roseType',
] as const

export interface PieChartProps
  extends
    BaseChartOption<PieSeriesOption>,
    AdditionalChartOption,
    Pick<PieSeriesOption, (typeof pieChartProps)[number]> {}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type PieChartPublicProps = KnownProps<PieChartProps>

// Share the public injection key so both implementations receive identical defaults.
import { PIE_CHART_TOKEN } from '../../pie/src/usePieOption'

const defaultProps: PieChartProps = {
  legend: {
    orient: 'vertical',
    itemGap: 16,
    right: '0',
    bottom: '8%',
    height: '80%',
  },
  title: {
    textStyle: {
      fontSize: '30px',
    },
    top: 'center',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(251, 253, 255, 0.88)',
    formatter: params => {
      const item = Array.isArray(params) ? params[0] : params
      if (!item) return ''
      const title = item.name
      const list = [
        {
          name: item.seriesName ?? '',
          value: String(item.value ?? ''),
          color: typeof item.color === 'string' ? item.color : undefined,
        },
      ]

      return useTooltipsFormatter(title, list)
    },
  },
}

export function usePieOption(
  props: PieSeriesOption,
  attrsInput: PieChartProps | ShallowRef<PieChartProps>,
): ComputedRef<PieChartProps> {
  const injectProps = inject(PIE_CHART_TOKEN, null)
  const mergedDefaultProps = merge(cloneDeep(defaultProps), injectProps)

  const mergedSeriesOption = computed<PieSeriesOption>(() => {
    const option = filterEmptyProps(props)
    option.type = 'pie'
    return option
  })

  const total = computed(() => {
    const attrs = unref(attrsInput)
    const data =
      mergedSeriesOption.value.data ??
      convertArray(attrs.series).flatMap(series => series.data ?? [])
    return data.reduce<number>((sum, item) => {
      const value = Number(
        typeof item === 'object' && item !== null && 'value' in item ? item.value : item,
      )
      return sum + (Number.isFinite(value) ? value : 0)
    }, 0)
  })

  const mergedOption = computed(() => {
    const attrs = unref(attrsInput)
    const option = merge({}, mergedDefaultProps, attrs)
    if (attrs.title !== null) {
      if (!get(option, ['title', 'text'])) {
        set(option, ['title', 'text'], `${total.value}`)
      }
      if (!get(option, ['title', 'subtext'])) {
        set(option, ['title', 'subtext'], `${mergedSeriesOption.value.name || ''}`)
      }
    } else {
      option.title = undefined
    }
    return option
  })

  return computed(() => {
    const option = { ...mergedOption.value }
    const seriesOption = mergedSeriesOption.value
    const { series } = unref(attrsInput)
    if (!series) {
      option.series = [seriesOption]
    } else {
      option.series = convertArray(series).map(item => merge({}, seriesOption, item))
    }
    return option
  })
}
