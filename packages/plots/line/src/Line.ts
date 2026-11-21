import type { SlotsType, VNode } from 'vue-demi'
import lineLoadingIcon from '../assets/loading-line.svg?raw'
import areaLoadingIcon from '../assets/loading-area.svg?raw'
import { computed, defineComponent, inject } from 'vue-demi'

import type { LineSeriesOption } from 'echarts/charts'
import { pick } from 'lodash-es'

import { convertArray, useReactiveAttrs, withChartProps } from '@idux/charts-core'
import { resolvePlotInput } from '../../shared/plotOptions'
import { plotInstanceMethods, renderPlot } from '../../shared/usePlotRender'

import { useCategoryLineOption } from './useCategoryLineOption'
import { lineChartProps, linePlotProps, LINE_CHART_TOKEN, useLineOption } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export default withChartProps<LineChartProps>()(
  defineComponent({
    name: 'IxLineChart',
    inheritAttrs: false,
    slots: Object as SlotsType<{ default?: () => VNode[] }>,
    props: {
      ...Object.fromEntries(lineChartProps.map(key => [key, null])),
      categories: Array,
      area: [Boolean, String],
      referenceLine: Object,
      zeroText: String,
      plotTheme: Object,
    },
    methods: plotInstanceMethods,
    // @ts-ignore
    setup(props, context) {
      const reactiveAttrs = useReactiveAttrs(context.attrs)
      const legacy = useLineOption(
        computed(() => pick(props, lineChartProps) as LineSeriesOption),
        reactiveAttrs,
      )
      const defaults = inject(LINE_CHART_TOKEN, null)
      const input = computed(() =>
        resolvePlotInput(defaults, props as LineChartProps, reactiveAttrs.value, linePlotProps),
      )
      const preset = useCategoryLineOption(() => input.value, context)
      return () => {
        const option = preset.value ?? legacy.value
        const area =
          convertArray(option.series).some(
            series => series.type === 'line' && !!series.areaStyle,
          ) ||
          input.value.props.area ||
          input.value.props.areaStyle
        return renderPlot(
          option,
          context,
          preset.value ? 'category' : 'native',
          area ? areaLoadingIcon : lineLoadingIcon,
        )
      }
    },
  }),
)
