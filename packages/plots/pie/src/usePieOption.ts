import type { PlotTheme } from '../../shared/plotTheme'
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'
import { merge, get, set, cloneDeep } from 'lodash-es'

import { convertArray, filterEmptyProps, useTooltipsFormatter } from '@idux/charts-core'
import type { AdditionalChartOption, BaseChartOption, KnownProps } from '@idux/charts-core'

export const pieChartProps = [
  'align',
  'layoutMode',
  'seriesStyle',
  'plotTheme',
  'data',
  'center',
  'label',
  'name',
  'markArea',
  'radius',
  'roseType',
  'clockwise',
] as const

export interface PieChartProps
  extends
    BaseChartOption<PieSeriesOption>,
    AdditionalChartOption,
    Pick<
      PieSeriesOption,
      Exclude<
        (typeof pieChartProps)[number],
        'data' | 'align' | 'layoutMode' | 'seriesStyle' | 'plotTheme'
      >
    > {
  /** Align the complete built-in pie layout inside its container. */
  align?: PieChartAlign
  /** Omit both layoutMode and align to preserve 1.0.0 rendering; auto opts into built-in layout. */
  layoutMode?: 'auto' | 'native'
  seriesStyle?: PieSeriesStyle
  plotTheme?: PlotTheme
  data?: Array<NonNullable<PieSeriesOption['data']>[number] | PieChartDataItem>
}

/** Main-series presentation only; data and geometry stay under the layout's control. */
export type PieSeriesStyle = Pick<
  PieSeriesOption,
  'itemStyle' | 'labelLine' | 'emphasis' | 'blur' | 'select' | 'selectedMode'
>

export type PieChartAlign =
  | 'center'
  | `${'top' | 'bottom'}-${'start' | 'center' | 'end'}`
  | `center-${'start' | 'end'}`

/** Optional source diagnostics survive zero and missing-value rendering. */
export type PieChartDataItem = Omit<
  Extract<NonNullable<PieSeriesOption['data']>[number], { name?: unknown }>,
  'value'
> & {
  value?: Extract<NonNullable<PieSeriesOption['data']>[number], { name?: unknown }>['value'] | null
  missingReason?: string
}

/** Named caller-facing props for component declarations; defaults are not resolved. */
export type PieChartPublicProps = KnownProps<PieChartProps>

export const PIE_CHART_TOKEN: InjectionKey<PieChartProps> = Symbol('PIE_CHART_TOKEN')

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
    const {
      layoutMode: _mode,
      seriesStyle,
      plotTheme: _theme,
      ...nativeProps
    } = props as PieChartProps
    const option = merge(
      {},
      seriesStyle ?? injectProps?.seriesStyle,
      filterEmptyProps(nativeProps),
    ) as PieSeriesOption
    delete (option as PieChartProps).align
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
    delete option.align
    delete option.layoutMode
    delete option.seriesStyle
    delete option.plotTheme
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
    for (const item of option.series ?? []) {
      if (item.roseType && item.clockwise === undefined) item.clockwise = true
    }
    return option
  })
}
