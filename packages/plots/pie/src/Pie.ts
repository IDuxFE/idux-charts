import { defineComponent, h } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs, useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { useDefaultPieOption } from './useDefaultPieOption'

import { pieChartProps, usePieOption } from './usePieOption'
import type { PieChartProps } from './usePieOption'

export default withChartProps<PieChartProps>()(
  defineComponent({
    name: 'IxPieChart',
    inheritAttrs: false,
    props: pieChartProps as any,
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const reactiveAttrs = useReactiveAttrs(attrs)
      const legacy = usePieOption(props as PieSeriesOption, reactiveAttrs)
      const { option, automatic } = useDefaultPieOption(
        props as PieChartProps,
        reactiveAttrs,
        legacy,
      )
      return () =>
        h(IxChart, {
          ...mergeAttrs(option.value, listeners),
          ref: 'chart',
          key: automatic.value ? 'automatic' : 'explicit',
        })
    },
  }),
)
