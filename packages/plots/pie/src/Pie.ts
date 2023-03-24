import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type PieSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { pieChartProps, usePieOption, type PieChartProps } from './usePieOption'

type IPieChartProps = Omit<HTMLAttributes, keyof PieChartProps> & PieChartProps

export default defineComponent<IPieChartProps>({
  name: 'IxPieChart',
  inheritAttrs: false,
  props: pieChartProps as any,
  setup(props, { attrs }) {
    const mergedProps = usePieOption(props as PieSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value))
  },
})
