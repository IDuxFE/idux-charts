import type { PropType } from 'vue-demi'
import type { PlotTextStyle } from '../../shared/plotTheme'
import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { usePlotRender } from '../../shared/usePlotRender'
import { createLiquidFillOption } from './createLiquidFillOption'
import type { LiquidFillChartProps } from './createLiquidFillOption'

export default withChartProps<LiquidFillChartProps>()(
  defineComponent({
    name: 'IxLiquidFillChart',
    inheritAttrs: false,
    props: {
      valueTextStyle: Object as PropType<PlotTextStyle>,
      labelTextStyle: Object as PropType<PlotTextStyle>,
      unitTextStyle: Object as PropType<PlotTextStyle>,
      value: null,
      min: null,
      max: null,
      label: null,
      unit: null,
      valueFormatter: null,
      color: null,
      zeroColor: null,
      radius: null,
      waveAnimation: null,
      textColor: null,
      backgroundColor: null,
    },
    setup(props, context) {
      return usePlotRender(context, attrs =>
        createLiquidFillOption({
          ...props,
          textStyle: attrs.textStyle,
          plotTheme: attrs.plotTheme,
        } as LiquidFillChartProps),
      )
    },
  }),
)
