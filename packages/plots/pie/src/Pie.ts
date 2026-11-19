import loadingIcon from '../assets/loading.svg?raw'
import ringLoadingIcon from '../assets/loading-ring.svg?raw'
import roseLoadingIcon from '../assets/loading-rose.svg?raw'
import { defineComponent } from 'vue-demi'

import type { PieSeriesOption } from 'echarts/charts'

import { convertArray, useReactiveAttrs, withChartProps } from '@idux/charts-core'
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
      return () => {
        const allSeries = convertArray(option.value.series)
        // Automatic layouts prepend background and zero-state decoration series.
        const series = (
          automatic.value ? allSeries.find(series => series.id === 'ix-pie-data') : allSeries[0]
        ) as PieSeriesOption | undefined
        const radius = series?.radius ?? (props as PieChartProps).radius
        const rose = series?.roseType ?? (props as PieChartProps).roseType
        const icon = rose
          ? roseLoadingIcon
          : Array.isArray(radius) && parseFloat(String(radius[0])) > 0
            ? ringLoadingIcon
            : loadingIcon
        return renderPlot(option.value, context, automatic.value ? 'automatic' : 'explicit', icon)
      }
    },
  }),
)
