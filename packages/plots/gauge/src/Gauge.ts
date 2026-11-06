import type { PropType } from 'vue-demi'
import type { PlotTextStyle } from '../../shared/plotTheme'
import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { usePlotRender } from '../../shared/usePlotRender'
import { createGaugeOption } from './createGaugeOption'
import type { GaugeChartProps } from './createGaugeOption'

export default withChartProps<GaugeChartProps>()(
  defineComponent({
    name: 'IxGaugeChart',
    inheritAttrs: false,
    props: {
      valueTextStyle: Object as PropType<PlotTextStyle>,
      labelTextStyle: Object as PropType<PlotTextStyle>,
      value: null,
      min: null,
      max: null,
      segments: null,
      label: null,
      valueFormatter: null,
      color: null,
      size: null,
      valueFontSize: null,
      valueFontFamily: null,
      labelColor: null,
      textColor: null,
      backgroundColor: null,
    },
    setup(props, context) {
      return usePlotRender(context, attrs =>
        createGaugeOption({
          ...props,
          plotTheme: attrs.plotTheme,
          textStyle: attrs.textStyle,
        } as GaugeChartProps),
      )
    },
  }),
)
