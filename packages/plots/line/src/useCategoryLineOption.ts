import { computed, watch } from 'vue-demi'
import type { EChartsType } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import { pick } from 'lodash-es'

import { useLegendWheel } from '../../shared/useLegendWheel'
import { usePlotDark, usePlotTheme } from '../../shared/plotTheme'
import { categoryInteraction, createPlotInteraction, usePlotSize } from '../../shared/usePlotLayout'
import { createPlotUpdater } from '../../shared/plotOptions'
import type { PlotContext } from '../../shared/usePlotRender'
import { createCategoryLineOption } from './createCategoryLineOption'
import { lineChartProps } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export function useCategoryLineOption(
  inputs: () => { props: LineChartProps; attrs: LineChartProps },
  context: PlotContext,
) {
  const preset = computed(() => inputs().props.categories !== undefined)
  const theme = usePlotTheme(() => inputs().props.plotTheme)
  const dark = usePlotDark(() => inputs().attrs)
  const { element, width } = usePlotSize(
    () => preset.value,
    () => inputs().attrs.autoResize !== false,
  )
  const interaction = createPlotInteraction()
  const update = createPlotUpdater()
  const layout = computed(() => {
    if (!preset.value) {
      interaction.read()
      update()
      return undefined
    }
    const { props, attrs } = inputs()
    const current = interaction.read(categoryInteraction(props, attrs))
    return createCategoryLineOption(
      props,
      pick(props, lineChartProps) as LineSeriesOption,
      attrs,
      width.value,
      theme.value,
      dark.value,
      interaction.getChart,
      current,
    )
  })
  const bindLegendWheel = useLegendWheel(() => layout.value?.wheel)
  watch(element, bindLegendWheel)
  const onReady = (chart: EChartsType) => {
    interaction.setChart(chart)
    const ready = inputs().attrs.onReady ?? context.listeners?.ready
    ready?.(chart)
  }
  return computed(() => {
    const option = update(layout.value?.option)
    return option && { ...option, onReady }
  })
}
