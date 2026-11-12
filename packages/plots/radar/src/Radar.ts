import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { createRadarOption, radarProps } from './createRadarOption'
import type { RadarChartProps } from './createRadarOption'

export default withChartProps<RadarChartProps>()(
  defineComponent({
    name: 'IxRadarChart',
    inheritAttrs: false,
    props: [...radarProps],
    methods: plotInstanceMethods,
    setup(props, context) {
      return usePlotRender(
        context,
        () => props,
        input =>
          createRadarOption({
            ...input,
            area: input.area === '' || input.area === true,
            clockwise: input.clockwise === '' || input.clockwise === true,
          } as RadarChartProps),
      )
    },
  }),
)
