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
import { createPlotUpdater } from './plotOptions'
import {
  createPlotInteraction,
  legendSelectionConfig,
  restoreLegendSelection,
} from './usePlotLayout'

export type PlotContext = Pick<SetupContext, 'attrs'> & { listeners?: Record<string, Function> }

export function renderPlot(option: ChartProps, context: PlotContext, key?: string) {
  return h(IxChart, { ...mergeAttrs(option, context.listeners), ref: 'chart', key })
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
) {
  const attrs = useReactiveAttrs(context.attrs)
  const theme = usePlotTheme(
    () => (props().plotTheme ?? attrs.value.plotTheme) as PlotTheme | undefined,
  )
  const update = createPlotUpdater()
  const interaction = createPlotInteraction()
  const onReady = (chart: EChartsType) => {
    interaction.setChart(chart)
    const ready = attrs.value.onReady ?? context.listeners?.ready
    if (typeof ready === 'function') ready(chart)
  }
  const option = computed(() => {
    const input = { ...attrs.value, ...filterEmptyProps(props()), plotTheme: theme.value }
    const generated = createOption(input)
    const { legend } = interaction.read({
      legend: generated.legend && {
        option: legendSelectionConfig(input.legend),
        names: convertArray(generated.series).map(series => ({
          name: series.name,
          items: Array.isArray(series.data)
            ? series.data.map(item =>
                item && typeof item === 'object' && 'name' in item ? item.name : undefined,
              )
            : undefined,
        })),
      },
    })
    restoreLegendSelection(generated, legend)
    const { controls } = splitChartOptions(input)
    return { ...update({ ...generated, ...controls })!, onReady }
  })
  return () => renderPlot(option.value, context)
}
