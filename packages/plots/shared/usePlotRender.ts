import { usePlotTheme } from './plotTheme'
import type { PlotTheme } from './plotTheme'
import { computed, h } from 'vue-demi'
import type { SetupContext } from 'vue-demi'
import {
  filterEmptyProps,
  convertArray,
  IxChart,
  mergeAttrs,
  splitChartOptions,
  useReactiveAttrs,
} from '@idux/charts-core'
import type { ChartInstanceMethods, ChartOption, ChartProps } from '@idux/charts-core'
import type { EChartsType } from 'echarts/core'
import { cloneDeep, isEqual } from 'lodash-es'
import { createPlotUpdater } from './plotOptions'
import {
  createPlotInteraction,
  legendSelectionConfig,
  restoreLegendSelection,
} from './usePlotLayout'

export type PlotContext = Pick<SetupContext, 'attrs'> & { listeners?: Record<string, Function> }

export function renderPlot(
  option: ChartProps,
  context: PlotContext,
  key?: string,
  loadingIcon?: string,
) {
  const settings = typeof option.loading === 'object' ? option.loading : undefined
  const loading = option.loading && { ...settings, icon: settings?.icon ?? loadingIcon }
  return h(IxChart, { ...mergeAttrs({ ...option, loading }, context.listeners), ref: 'chart', key })
}

export const plotInstanceMethods: ChartInstanceMethods = {
  getEChartsInstance(this: { $refs: Record<string, unknown> }) {
    return (this.$refs.chart as ChartInstanceMethods | undefined)?.getEChartsInstance()
  },
}

export function usePlotRender(
  context: PlotContext,
  props: () => ChartProps,
  createOption: (input: ChartProps) => ChartOption,
  loadingIcon?: string,
) {
  const attrs = useReactiveAttrs(context.attrs)
  const theme = usePlotTheme(
    () => (props().plotTheme ?? attrs.value.plotTheme) as PlotTheme | undefined,
  )
  const update = createPlotUpdater()
  const interaction = createPlotInteraction()
  let previousInput: ChartProps | undefined
  let generatedOption: ChartOption
  const onReady = (chart: EChartsType) => {
    interaction.setChart(chart)
    const ready = attrs.value.onReady ?? context.listeners?.ready
    if (typeof ready === 'function') ready(chart)
  }
  const option = computed(() => {
    const input = { ...attrs.value, ...filterEmptyProps(props()), plotTheme: theme.value }
    const { option: plotInput, controls } = splitChartOptions(input)
    // Controls must not recreate formatter/renderItem closures or restart a plot.
    // Keep a snapshot to detect nested mutations, including Vue 2 attrs updates.
    if (!previousInput || !isEqual(plotInput, previousInput)) {
      generatedOption = createOption(plotInput)
      previousInput = cloneDeep(plotInput)
      const { legend } = interaction.read({
        legend: generatedOption.legend && {
          option: legendSelectionConfig(input.legend),
          names: convertArray(generatedOption.series).map(series => ({
            name: series.name,
            items: Array.isArray(series.data)
              ? series.data.map(item =>
                  item && typeof item === 'object' && 'name' in item ? item.name : undefined,
                )
              : undefined,
          })),
        },
      })
      restoreLegendSelection(generatedOption, legend)
    }
    return { ...update({ ...cloneDeep(generatedOption), ...controls })!, onReady }
  })
  return () => renderPlot(option.value, context, undefined, loadingIcon)
}
