import { defineComponent, h } from 'vue-demi'

import type { BarSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs, useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { barChartProps, useBarOption } from './useBarOption'
import type { BarChartProps } from './useBarOption'

export default withChartProps<BarChartProps>()(
  defineComponent({
    name: 'IxBarChart',
    inheritAttrs: false,
    props: barChartProps as any,
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const mergedProps = useBarOption(props as BarSeriesOption, useReactiveAttrs(attrs))
      return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
    },
  }),
)
