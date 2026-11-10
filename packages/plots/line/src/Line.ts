import { computed, defineComponent, h } from 'vue-demi'

import type { LineSeriesOption } from 'echarts/charts'
import { pick } from 'lodash-es'

import { IxChart, mergeAttrs, useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { useCategoryLineOption } from './useCategoryLineOption'
import { lineChartProps, useLineOption } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export default withChartProps<LineChartProps>()(
  defineComponent({
    name: 'IxLineChart',
    inheritAttrs: false,
    props: {
      ...Object.fromEntries(lineChartProps.map(key => [key, null])),
      categories: Array,
      area: [Boolean, String],
      referenceLine: Object,
      zeroText: String,
      plotTheme: Object,
    },
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const reactiveAttrs = useReactiveAttrs(attrs)
      const legacy = useLineOption(
        computed(() => pick(props, lineChartProps) as LineSeriesOption),
        reactiveAttrs,
      )
      const preset = useCategoryLineOption(
        props as LineChartProps,
        () => reactiveAttrs.value,
        listeners?.ready,
      )
      return () =>
        h(IxChart, {
          ...mergeAttrs(preset.value ?? legacy.value, listeners),
          ref: 'chart',
          key: preset.value ? 'category' : 'native',
        })
    },
  }),
)
