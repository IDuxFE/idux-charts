import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type PieSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { pieChartProps, usePieOption, type PieChartProps } from './usePieOption'

export default defineComponent<Omit<HTMLAttributes, keyof PieChartProps> & PieChartProps>({
  name: 'IxPieChart',
  inheritAttrs: false,
  props: pieChartProps as any,
  // @ts-ignore
  setup(props, { attrs, listeners }) {
    const mergedProps = usePieOption(props as PieSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
  },
})
