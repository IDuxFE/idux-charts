import { defineComponent, h } from 'vue-demi'

import type { LineSeriesOption } from 'echarts/charts'

import { IxChart, mergeAttrs, useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { lineChartProps, useLineOption } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export default withChartProps<LineChartProps>()(
  defineComponent({
    name: 'IxLineChart',
    inheritAttrs: false,
    props: lineChartProps as any,
    // @ts-ignore
    setup(props, { attrs, listeners }) {
      const mergedProps = useLineOption(props as LineSeriesOption, useReactiveAttrs(attrs))
      return () => h(IxChart, mergeAttrs(mergedProps.value, listeners))
    },
  }),
)
