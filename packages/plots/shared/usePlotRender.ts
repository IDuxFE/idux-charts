import { usePlotTheme } from './plotTheme'
import type { PlotTheme } from './plotTheme'
import { computed, h, isVue2 } from 'vue-demi'
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
import { useCategoryLabelTooltip } from './categoryLabel'
import type { CategoryZoomConfig } from './categoryZoom'
import {
  createPlotInteraction,
  legendSelectionConfig,
  restoreLegendSelection,
} from './usePlotLayout'

export type PlotContext = Pick<SetupContext, 'attrs' | 'slots'> & {
  listeners?: Record<string, Function>
}

export function renderPlot(
  option: ChartProps,
  context: PlotContext,
  key?: string,
  loadingIcon?: string,
) {
  const settings = typeof option.loading === 'object' ? option.loading : undefined
  const loading = option.loading && { ...settings, icon: settings?.icon ?? loadingIcon }
  // Evaluate in IxChart's render so reactive slot content is independent of option generation.
  const slots = { default: () => context.slots.default?.() }
  return h(
    IxChart,
    {
      ...mergeAttrs({ ...option, loading }, context.listeners),
      ref: 'chart',
      key,
      // Vue 2 stores slot functions in VNode data; Vue 3 receives them as children.
      ...(isVue2 ? { scopedSlots: slots } : {}),
    },
    isVue2 ? undefined : slots,
  )
}

export const plotInstanceMethods: ChartInstanceMethods = {
  getEChartsInstance(this: { $refs: Record<string, unknown> }) {
    return (this.$refs.chart as ChartInstanceMethods | undefined)?.getEChartsInstance()
  },
}

interface PlotRenderSettings {
  onReady?: (chart: EChartsType) => void
  loadingIcon?: string | (() => string)
  mergeDataUpdates?: boolean
  resetOnDataIdentityChange?: boolean
  categoryLabelTooltip?: boolean
  zoomConfig?: (input: ChartProps) => CategoryZoomConfig | undefined
}

export function usePlotRender(
  context: PlotContext,
  props: () => ChartProps,
  createOption: (input: ChartProps) => ChartOption,
  settings: string | PlotRenderSettings = {},
) {
  const {
    onReady: onPlotReady,
    loadingIcon,
    mergeDataUpdates = false,
    resetOnDataIdentityChange = false,
    categoryLabelTooltip = false,
    zoomConfig,
  } = typeof settings === 'string' ? { loadingIcon: settings } : settings
  const attrs = useReactiveAttrs(context.attrs)
  const theme = usePlotTheme(
    () => (props().plotTheme ?? attrs.value.plotTheme) as PlotTheme | undefined,
  )
  const update = createPlotUpdater(mergeDataUpdates, resetOnDataIdentityChange)
  const interaction = createPlotInteraction()
  const bindCategoryLabels = useCategoryLabelTooltip()
  let previousInput: ChartProps | undefined
  let generatedOption: ChartOption
  const onReady = (chart: EChartsType) => {
    interaction.setChart(chart)
    onPlotReady?.(chart)
    if (categoryLabelTooltip) bindCategoryLabels(chart)
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
      const { legend, dataZoom } = interaction.read({
        zoom: zoomConfig?.(input),
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
      if (dataZoom && generatedOption.dataZoom) generatedOption.dataZoom = dataZoom
    }
    return { ...update({ ...cloneDeep(generatedOption), ...controls })!, onReady }
  })
  return () =>
    renderPlot(
      option.value,
      context,
      undefined,
      typeof loadingIcon === 'function' ? loadingIcon() : loadingIcon,
    )
}
