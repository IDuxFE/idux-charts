import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type BarSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { barChartProps, useBarOption, type BarChartProps } from './useBarOption'

export default defineComponent<Omit<HTMLAttributes, keyof BarChartProps> & BarChartProps>({
  name: 'IxBarChart',
  inheritAttrs: false,
  props: barChartProps as any,
  // @ts-ignore
  setup(props, { attrs, listeners }) {
    const mergedProps = useBarOption(props as BarSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
  },
})
