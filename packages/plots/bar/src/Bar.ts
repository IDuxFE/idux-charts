import { computed, defineComponent, inject, watch } from 'vue-demi'
import { pick } from 'lodash-es'
import type { EChartsType } from 'echarts/core'

import { useReactiveAttrs, withChartProps } from '@idux/charts-core'

import { createCategoryBarOption } from './createCategoryBarOption'
import { withBarShadows } from './barShadow'
import { syncCategoryBarWidths } from './categoryBarWidth'
import { barChartProps, barPlotProps, BAR_CHART_TOKEN, useBarOption } from './useBarOption'
import type { BarChartProps } from './useBarOption'
import { usePlotDark, usePlotTheme } from '../../shared/plotTheme'
import { useLegendWheel } from '../../shared/useLegendWheel'
import { categoryInteraction, createPlotInteraction, usePlotSize } from '../../shared/usePlotLayout'
import { createPlotUpdater, resolvePlotInput } from '../../shared/plotOptions'
import { plotInstanceMethods, renderPlot } from '../../shared/usePlotRender'
import type { PlotContext } from '../../shared/usePlotRender'

export default withChartProps<BarChartProps>()(
  defineComponent({
    name: 'IxBarChart',
    inheritAttrs: false,
    props: [...barPlotProps] as any,
    methods: plotInstanceMethods,
    // @ts-ignore
    setup(props, context: PlotContext) {
      const reactiveAttrs = useReactiveAttrs(context.attrs)
      const input = props as BarChartProps
      const series = computed(() => pick(input, barChartProps))
      const legacy = useBarOption(series, reactiveAttrs)
      const defaults = inject(BAR_CHART_TOKEN, null)
      const resolved = computed(() =>
        resolvePlotInput<BarChartProps>(defaults, input, reactiveAttrs.value, barPlotProps),
      )
      const preset = computed(() => resolved.value.props.categories !== undefined)
      const plotTheme = usePlotTheme(() => resolved.value.props.plotTheme)
      const dark = usePlotDark(() => resolved.value.attrs)
      const { element, width } = usePlotSize(
        () => preset.value,
        () => resolved.value.attrs.autoResize !== false,
      )
      const interaction = createPlotInteraction()
      const update = createPlotUpdater()
      const layout = computed(() => {
        if (!preset.value) {
          interaction.read()
          update()
          return { option: legacy.value, wheel: undefined, aboveMissingRows: undefined }
        }
        const { props, attrs } = resolved.value
        const current = interaction.read(categoryInteraction(props, attrs, props.layout))
        const next = createCategoryBarOption(
          props,
          pick(props, barChartProps),
          attrs,
          width.value,
          plotTheme.value,
          dark.value,
          interaction.getChart,
          current,
        )
        return { ...next, option: update(next.option)! }
      })
      const bindLegendWheel = useLegendWheel(() => layout.value.wheel)
      watch(element, bindLegendWheel)
      const option = computed(() => withBarShadows(layout.value.option))
      const onCategoryReady = (chart: EChartsType) => {
        interaction.setChart(chart)
        const syncWidth = () => {
          const { props, attrs } = resolved.value
          syncCategoryBarWidths(chart, props, attrs, layout.value.aboveMissingRows)
        }
        chart.on('datazoom', syncWidth)
        chart.on('legendselectchanged', syncWidth)
        chart.on('legendselected', syncWidth)
        chart.on('legendunselected', syncWidth)
        let measuredLayout = layout.value
        let measuredWidth = chart.getWidth()
        let measuredHeight = chart.getHeight()
        chart.on('rendered', () => {
          const width = chart.getWidth()
          const height = chart.getHeight()
          if (
            measuredLayout === layout.value &&
            measuredWidth === width &&
            measuredHeight === height
          )
            return
          measuredLayout = layout.value
          measuredWidth = width
          measuredHeight = height
          // The band size is resolved during layout. Apply geometry updates after rendering.
          queueMicrotask(() => {
            if (!chart.isDisposed()) syncWidth()
          })
        })
        syncWidth()
        const onReady = resolved.value.attrs.onReady ?? context.listeners?.ready
        onReady?.(chart)
      }
      return () =>
        renderPlot(
          preset.value ? { ...option.value, onReady: onCategoryReady } : option.value,
          context,
          preset.value ? 'category' : 'native',
        )
    },
  }),
)
