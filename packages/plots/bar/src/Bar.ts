import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type BarSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { barChartProps, useBarOption, type BarChartProps } from './useBarOption'

type IBarChartProps = Omit<HTMLAttributes, keyof BarChartProps> & BarChartProps

export default defineComponent<IBarChartProps>({
  name: 'IxBarChart',
  inheritAttrs: false,
  props: barChartProps as any,
  setup(props, { attrs }) {
    const mergedProps = useBarOption(props as BarSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value))
  },
})
