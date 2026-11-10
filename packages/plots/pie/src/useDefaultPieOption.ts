import type { PlotTextStyle } from '../../shared/plotTheme'
import { usePlotTheme, mergePlotTheme } from '../../shared/plotTheme'
import { useLegendWheel } from '../../shared/useLegendWheel'
import type { LegendWheelRegion } from '../../shared/useLegendWheel'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  watch,
  inject,
  getCurrentInstance,
} from 'vue-demi'
import type { ShallowRef } from 'vue-demi'
import { merge } from 'lodash-es'

import { createDefaultPieOption } from './createDefaultPieOption'
import { PIE_CHART_TOKEN } from './usePieOption'
import type { PieChartProps } from './usePieOption'

// Only caller-owned geometry leaves the built-in layout. Presentation options
// are merged and measured by the builder instead of selecting another renderer.
const positionKeys = ['left', 'right', 'top', 'bottom', 'width', 'height', 'orient'] as const
export function useDefaultPieOption(
  props: PieChartProps,
  attrs: ShallowRef<PieChartProps>,
  legacy: ShallowRef<PieChartProps>,
) {
  const defaults = inject(PIE_CHART_TOKEN, null)
  const plotTheme = usePlotTheme(() => mergePlotTheme(defaults?.plotTheme, props.plotTheme))
  const instance = getCurrentInstance()
  const element = () => (instance?.proxy?.$refs.chart as { $el?: HTMLElement } | undefined)?.$el
  const legendRow = shallowRef(0)
  watch(
    () => props.data,
    () => {
      legendRow.value = 0
    },
  )
  const size = shallowRef({ width: 480, height: 180 })
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
  const measure = () => {
    const el = element()
    if (!el) return
    if (el.clientWidth > 0 && el.clientHeight > 0) {
      size.value = { width: el.clientWidth, height: el.clientHeight }
    }
    const css = getComputedStyle(el)
    tokens.value = {
      fontFamily: css.fontFamily || 'Arial, sans-serif',
      colorErrorText: css.getPropertyValue('--ix-color-error-text').trim() || '#cf171d',
      colorTextInfo: css.getPropertyValue('--ix-color-text-info').trim() || '#6f7785',
      colorInfoContainerBgDisabled:
        css.getPropertyValue('--ix-color-info-container-bg-disabled').trim() || '#e1e5eb',
    }
  }
  let observer: ResizeObserver | undefined
  let observedElement: HTMLElement | undefined
  const observe = () => {
    const el = element()
    bindLegendWheel(automatic.value ? el : undefined)
    if (el === observedElement) return
    observer?.disconnect()
    observedElement = el
    measure()
    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        if (attrs.value.autoResize !== false) measure()
      })
      observer.observe(el)
    }
  }
  onMounted(observe)
  onUpdated(observe)
  watch(
    () => attrs.value.autoResize,
    enabled => {
      if (enabled !== false) measure()
    },
  )
  onBeforeUnmount(() => observer?.disconnect())
  const layout = computed(() => {
    if (!automatic.value) return { option: legacy.value, wheel: undefined }
    const settings = merge({}, defaults, attrs.value)
    let wheel: LegendWheelRegion | undefined
    const preset = createDefaultPieOption(
      props.data ?? defaults?.data ?? [],
      size.value,
      tokens.value,
      String(props.name ?? defaults?.name ?? ''),
      '',
      props.align ?? defaults?.align,
      {
        plotTheme: plotTheme.value,
        textStyle: settings.textStyle as PlotTextStyle | undefined,
        seriesStyle: props.seriesStyle ?? defaults?.seriesStyle,
        page: {
          row: legendRow.value,
          onChange: row => {
            legendRow.value = row
          },
          onWheelRegion: region => {
            wheel = region
          },
        },
        title: settings.title as import('echarts/components').TitleComponentOption | undefined,
        legend:
          settings.legend === null
            ? { show: false }
            : (settings.legend as import('echarts/components').LegendComponentOption | undefined),
        radius: props.radius ?? defaults?.radius,
        roseType: props.roseType ?? defaults?.roseType,
        clockwise: props.clockwise ?? defaults?.clockwise,
        label: props.label ?? defaults?.label,
        markArea: props.markArea ?? defaults?.markArea,
        color: Array.isArray(settings.color) ? (settings.color as string[]) : undefined,
      },
    )
    // The builder owns component arrays and geometry; native presentation
    // overrides have already been applied to every generated component.
    delete settings.title
    delete settings.legend
    const result = merge({}, preset, settings)
    delete result.align
    delete result.layoutMode
    delete result.seriesStyle
    delete result.plotTheme
    return { option: result, wheel }
  })
  const bindLegendWheel = useLegendWheel(() => layout.value.wheel)
  const option = computed(() => layout.value.option)
  return { option, automatic }
}
