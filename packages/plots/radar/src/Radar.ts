import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { usePlotRender } from '../../shared/usePlotRender'
import { createRadarOption } from './createRadarOption'
import type { RadarChartProps } from './createRadarOption'

export default withChartProps<RadarChartProps>()(
  defineComponent({
    name: 'IxRadarChart',
    inheritAttrs: false,
    props: {
      indicator: null,
      data: null,
      area: null,
      gridStyle: null,
      splitNumber: null,
      radius: null,
      center: null,
      clockwise: null,
    },
    setup(props, context) {
      return usePlotRender(context, attrs =>
        createRadarOption({
          ...props,
          plotTheme: attrs.plotTheme,
          textStyle: attrs.textStyle,
          area: props.area === '' || props.area === true,
          clockwise: props.clockwise === '' || props.clockwise === true,
        } as RadarChartProps),
      )
    },
  }),
)
