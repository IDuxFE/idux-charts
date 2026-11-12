import { defineComponent } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'

import { useReactiveAttrs, withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, renderPlot } from '../../shared/usePlotRender'

import { useDefaultPieOption } from './useDefaultPieOption'

import { pieChartProps, usePieOption } from './usePieOption'
import type { PieChartProps } from './usePieOption'

export default withChartProps<PieChartProps>()(
  defineComponent({
    name: 'IxPieChart',
    inheritAttrs: false,
    props: pieChartProps as any,
    methods: plotInstanceMethods,
    // @ts-ignore
    setup(props, context) {
      const reactiveAttrs = useReactiveAttrs(context.attrs)
      const legacy = usePieOption(props as PieSeriesOption, reactiveAttrs)
      const { option, automatic } = useDefaultPieOption(
        props as PieChartProps,
        reactiveAttrs,
        legacy,
        context,
      )
      return () => renderPlot(option.value, context, automatic.value ? 'automatic' : 'explicit')
    },
  }),
)
