import type { PropType } from 'vue-demi'
import type { PlotTextStyle } from '../../shared/plotTheme'
import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { createLiquidFillOption, liquidFillProps } from './createLiquidFillOption'
import type { LiquidFillChartProps } from './createLiquidFillOption'

export default withChartProps<LiquidFillChartProps>()(
  defineComponent({
    name: 'IxLiquidFillChart',
    inheritAttrs: false,
    props: {
      ...Object.fromEntries(liquidFillProps.map(key => [key, null])),
      valueTextStyle: Object as PropType<PlotTextStyle>,
      labelTextStyle: Object as PropType<PlotTextStyle>,
      unitTextStyle: Object as PropType<PlotTextStyle>,
    },
    methods: plotInstanceMethods,
    setup(props, context) {
      return usePlotRender(
        context,
        () => props,
        input => createLiquidFillOption(input as LiquidFillChartProps),
      )
    },
  }),
)
