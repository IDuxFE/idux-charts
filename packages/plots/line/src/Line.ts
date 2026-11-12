import { computed, defineComponent, inject } from 'vue-demi'

import type { LineSeriesOption } from 'echarts/charts'
import { pick } from 'lodash-es'

import { useReactiveAttrs, withChartProps } from '@idux/charts-core'
import { resolvePlotInput } from '../../shared/plotOptions'
import { plotInstanceMethods, renderPlot } from '../../shared/usePlotRender'

import { useCategoryLineOption } from './useCategoryLineOption'
import { lineChartProps, linePlotProps, LINE_CHART_TOKEN, useLineOption } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export default withChartProps<LineChartProps>()(
  defineComponent({
    name: 'IxLineChart',
    inheritAttrs: false,
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
      return () =>
        renderPlot(preset.value ?? legacy.value, context, preset.value ? 'category' : 'native')
    },
  }),
)
