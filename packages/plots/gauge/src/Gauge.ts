import type { PropType } from 'vue-demi'
import type { PlotTextStyle } from '../../shared/plotTheme'
import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { createGaugeOption, gaugeProps } from './createGaugeOption'
import type { GaugeChartProps } from './createGaugeOption'

export default withChartProps<GaugeChartProps>()(
  defineComponent({
    name: 'IxGaugeChart',
    inheritAttrs: false,
    props: {
      ...Object.fromEntries(gaugeProps.map(key => [key, null])),
      valueTextStyle: Object as PropType<PlotTextStyle>,
      labelTextStyle: Object as PropType<PlotTextStyle>,
    },
    methods: plotInstanceMethods,
    setup(props, context) {
      return usePlotRender(
        context,
        () => props,
        input => createGaugeOption(input as GaugeChartProps),
      )
    },
  }),
)
