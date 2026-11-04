import { defineComponent, h } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs, useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { pieChartProps, usePieOption } from './usePieOption'
import type { PieChartProps } from './usePieOption'

export default withChartProps<PieChartProps>()(
  defineComponent({
    name: 'IxPieChart',
    inheritAttrs: false,
    props: pieChartProps as any,
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const mergedProps = usePieOption(props as PieSeriesOption, useReactiveAttrs(attrs))
      return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
    },
  }),
)
