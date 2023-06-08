import { defineComponent, type HTMLAttributes, h } from 'vue-demi'

import { type LineSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs } from '@idux/charts-core'

import { lineChartProps, useLineOption, type LineChartProps } from './useLineOption'

export default defineComponent<Omit<HTMLAttributes, keyof LineChartProps> & LineChartProps>({
  name: 'IxLineChart',
  inheritAttrs: false,
  props: lineChartProps as any,
  // @ts-ignore
  setup(props, { attrs, listeners }) {
    const mergedProps = useLineOption(props as LineSeriesOption, attrs)
    return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
  },
})
