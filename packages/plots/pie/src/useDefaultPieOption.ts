import type { PlotTextStyle } from '../../shared/plotTheme'
import { usePlotTheme } from '../../shared/plotTheme'
import { useLegendWheel } from '../../shared/useLegendWheel'
import type { LegendWheelRegion } from '../../shared/useLegendWheel'
import { computed, shallowRef, watch, inject } from 'vue-demi'
import type { ShallowRef } from 'vue-demi'
import { isEqual } from 'lodash-es'
import type { EChartsType } from 'echarts/core'
import { convertArray } from '@idux/charts-core'

import { createDefaultPieOption } from './createDefaultPieOption'
import { PIE_CHART_TOKEN, pieChartProps } from './usePieOption'
import type { PieChartProps } from './usePieOption'
import {
  createPlotInteraction,
  legendSelectionConfig,
  restoreLegendSelection,
  usePlotSize,
} from '../../shared/usePlotLayout'
import { createPlotUpdater, mergePlotOptions, resolvePlotInput } from '../../shared/plotOptions'
import type { PlotContext } from '../../shared/usePlotRender'

// Only caller-owned geometry leaves the built-in layout. Presentation options
// are merged and measured by the builder instead of selecting another renderer.
const positionKeys = ['left', 'right', 'top', 'bottom', 'width', 'height', 'orient'] as const
export function useDefaultPieOption(
  props: PieChartProps,
  attrs: ShallowRef<PieChartProps>,
  legacy: ShallowRef<PieChartProps>,
  context?: PlotContext,
) {
  const defaults = inject(PIE_CHART_TOKEN, null)
  const input = computed(() => resolvePlotInput(defaults, props, attrs.value, pieChartProps))
  const plotTheme = usePlotTheme(() => input.value.props.plotTheme)
  const legendRow = shallowRef(0)
  const names = computed(() =>
    (input.value.props.data ?? []).map((item, index) =>
      String(
        item && typeof item === 'object' && 'name' in item ? (item.name ?? index + 1) : index + 1,
      ),
    ),
  )
  watch(names, (next, previous) => {
    if (!isEqual(next, previous)) legendRow.value = 0
  })
  const tokens = shallowRef({
    fontFamily: 'Arial, sans-serif',
    colorErrorText: '#cf171d',
    colorTextInfo: '#6f7785',
    colorInfoContainerBgDisabled: '#e1e5eb',
  })
  const automatic = computed(() => {
    const mode = props.layoutMode ?? defaults?.layoutMode
    if (mode === 'native') return false
    // Explicit native geometry always wins, including in auto mode.
    if (mode === 'auto') {
      return [props, attrs.value, defaults].every(
        source =>
          !source ||
          (!['center', 'series', 'dataset', 'graphic'].some(key => source[key] !== undefined) &&
            !Array.isArray(source.title) &&
            !Array.isArray(source.legend)),
      )
    }
    // New layout is opt-in: every 1.0.0 call without new layout controls keeps
    // the native series, theme defaults and automatically generated total.
    const aligned = props.align !== undefined || defaults?.align !== undefined
    if (!aligned) return false
    return [props, attrs.value, defaults].every(source => {
      if (!source) return true
      if (['center', 'series', 'dataset', 'graphic'].some(key => source[key] !== undefined))
        return false
      return ['title', 'legend'].every(key => {
        const value = source[key]
        return (
          !Array.isArray(value) &&
          (!value ||
            !positionKeys.some(field => (value as Record<string, unknown>)[field] !== undefined))
        )
      })
    })
  })
  const { element, size } = usePlotSize(
    () => automatic.value,
    () => input.value.attrs.autoResize !== false,
    { width: 480, height: 180 },
    root => {
      const css = getComputedStyle(root)
      const next = {
        fontFamily: css.fontFamily || 'Arial, sans-serif',
        colorErrorText: css.getPropertyValue('--ix-color-error-text').trim() || '#cf171d',
        colorTextInfo: css.getPropertyValue('--ix-color-text-info').trim() || '#6f7785',
        colorInfoContainerBgDisabled:
          css.getPropertyValue('--ix-color-info-container-bg-disabled').trim() || '#e1e5eb',
      }
      if (!isEqual(tokens.value, next)) tokens.value = next
    },
  )
  const interaction = createPlotInteraction()
  const update = createPlotUpdater()
  const onReady = (chart: EChartsType) => {
    interaction.setChart(chart)
    const ready = input.value.attrs.onReady ?? context?.listeners?.ready
    ready?.(chart)
  }
  const layout = computed(() => {
    if (!automatic.value) {
      interaction.read()
      update()
      return { option: legacy.value, wheel: undefined }
    }
    const {
      props,
      attrs: { title, legend, ...settings },
    } = input.value
    const data = props.data ?? []
    const current = interaction.read({
      legend: { option: legendSelectionConfig(legend), names: names.value },
      selection: {
        names: names.value,
        mode: props.seriesStyle?.selectedMode,
        selected: data.map(item =>
          item && typeof item === 'object' && 'selected' in item ? item.selected : undefined,
        ),
      },
    })
    let wheel: LegendWheelRegion | undefined
    const preset = createDefaultPieOption(
      data,
      size.value,
      tokens.value,
      String(props.name ?? ''),
      '',
      props.align,
      {
        plotTheme: plotTheme.value,
        textStyle: settings.textStyle as PlotTextStyle | undefined,
        seriesStyle: props.seriesStyle,
        page: {
          row: legendRow.value,
          onChange: row => {
            legendRow.value = row
          },
          onWheelRegion: region => {
            wheel = region
          },
        },
        title: title as import('echarts/components').TitleComponentOption | undefined,
        legend:
          legend === null
            ? { show: false }
            : (legend as import('echarts/components').LegendComponentOption | undefined),
        radius: props.radius,
        roseType: props.roseType,
        clockwise: props.clockwise,
        label: props.label,
        markArea: props.markArea,
        color: Array.isArray(settings.color) ? (settings.color as string[]) : undefined,
      },
    )
    restoreLegendSelection(preset, current.legend)
    const selectedSeries = convertArray(current.series).find(item => item.id === 'ix-pie-data')
    const dataSeries = convertArray(preset.series).find(item => item.id === 'ix-pie-data')
    if (dataSeries && selectedSeries && 'selectedMap' in selectedSeries) {
      Object.assign(dataSeries, { selectedMap: selectedSeries.selectedMap })
    }
    const result = mergePlotOptions<PieChartProps>(preset, settings)
    return { option: { ...update(result)!, onReady }, wheel }
  })
  const bindLegendWheel = useLegendWheel(() => layout.value.wheel)
  watch(element, bindLegendWheel)
  const option = computed(() => layout.value.option)
  return { option, automatic }
}
