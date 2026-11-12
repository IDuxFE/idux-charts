import type { PlotTheme } from '../../shared/plotTheme'
import { computed, inject, unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, ShallowRef } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'
import { clearChartComponent, mergePlotOptions, resolvePlotInput } from '../../shared/plotOptions'

import {
  convertArray,
  filterEmptyProps,
  useTooltipsFormatter,
  getTooltipsColor,
} from '@idux/charts-core'
import type {
  AdditionalChartOption,
  BaseChartOption,
  ChartProps,
  KnownProps,
} from '@idux/charts-core'

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
    Omit<KnownProps<BaseChartOption<PieSeriesOption>>, 'title'>,
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
  title?: ChartProps['title']
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
    formatter: params => {
      const item = Array.isArray(params) ? params[0] : params
      if (!item) return ''
      const title = item.name
      const list = [
        {
          name: item.seriesName ?? '',
          value: String(item.value ?? ''),
          color: getTooltipsColor(item.color),
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
  return computed(() => {
    const { props: input, attrs } = resolvePlotInput(
      injectProps,
      filterEmptyProps(props as PieChartProps),
      unref(attrsInput),
      pieChartProps,
    )
    const {
      align: _align,
      layoutMode: _mode,
      seriesStyle,
      plotTheme: _theme,
      ...nativeProps
    } = input
    const option = mergePlotOptions<PieChartProps>(defaultProps, attrs)
    const seriesOption = mergePlotOptions<PieSeriesOption>(
      seriesStyle,
      nativeProps as PieSeriesOption,
      { type: 'pie' },
    )
    const { series } = option
    option.series =
      series === undefined
        ? [seriesOption]
        : convertArray(series).map(item => mergePlotOptions(seriesOption, item))
    for (const item of option.series ?? []) {
      if (item.roseType && item.clockwise === undefined) item.clockwise = true
    }
    if (attrs.title === null) {
      clearChartComponent(option, 'title')
    } else if (option.title && !Array.isArray(option.title)) {
      if (option.title.text === undefined) {
        const total = option.series
          .flatMap(item => item.data ?? [])
          .reduce<number>((sum, item) => {
            const value = Number(
              typeof item === 'object' && item !== null && 'value' in item ? item.value : item,
            )
            return sum + (Number.isFinite(value) ? value : 0)
          }, 0)
        option.title.text = String(total)
      }
      option.title.subtext ??= String(seriesOption.name ?? '')
    }
    return option
  })
}
