import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type LineSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { lineChartProps, useLineOption, type LineChartProps } from './useLineOption'

type ILineChartProps = Omit<HTMLAttributes, keyof LineChartProps> & LineChartProps

export default defineComponent<ILineChartProps>({
  name: 'IxLineChart',
  inheritAttrs: false,
  props: lineChartProps as any,
  setup(props, { attrs }) {
    const mergedProps = useLineOption(props as LineSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value))
  },
})
