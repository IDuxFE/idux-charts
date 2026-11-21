import type { ChartOption } from '@idux/charts-core'
import { defineComponent } from 'vue-demi'
import { withChartProps } from '@idux/charts-core'
import { plotInstanceMethods, usePlotRender } from '../../shared/usePlotRender'
import { createMapOption, mapProps, type MapChartProps } from './createMapOption'
import loadingIcon from '../assets/loading.svg?raw'
export default withChartProps<MapChartProps>()(
  defineComponent({
    name: 'IxMapChart',
    inheritAttrs: false,
    props: [...mapProps],
    methods: plotInstanceMethods,
    setup(props, context) {
      return usePlotRender(
        context,
        () => props,
        input => createMapOption(input as MapChartProps) as ChartOption,
        loadingIcon,
      )
    },
  }),
)
