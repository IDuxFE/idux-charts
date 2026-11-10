import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  unref,
} from 'vue-demi'
import type { EChartsType } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import { CHART_THEME_TOKEN, convertArray } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import { cloneDeep, isEqual, pick } from 'lodash-es'

import { useLegendWheel } from '../../shared/useLegendWheel'
import { usePlotTheme } from '../../shared/plotTheme'
import { createCategoryLineOption } from './createCategoryLineOption'
import { lineChartProps } from './useLineOption'
import type { LineChartProps } from './useLineOption'

export function useCategoryLineOption(
  input: LineChartProps,
  getAttrs: () => LineChartProps,
  ready?: (chart: EChartsType) => void,
) {
  const preset = computed(() => input.categories !== undefined)
  const instance = getCurrentInstance()
  const providedTheme = inject(CHART_THEME_TOKEN, undefined)
  const theme = usePlotTheme(() => input.plotTheme)
  const width = shallowRef(0)
  let chart: EChartsType | undefined
  let observed: HTMLElement | undefined
  let observer: ResizeObserver | undefined

  const measure = (element: HTMLElement) => {
    width.value = element.clientWidth
  }
  const observe = () => {
    const element = (instance?.proxy?.$refs.chart as { $el?: HTMLElement } | undefined)?.$el
    const root = preset.value ? element : undefined
    bindLegendWheel(root)
    if (root) measure(root)
    const auto = getAttrs().autoResize !== false ? root : undefined
    if (auto === observed) return
    observer?.disconnect()
    observed = auto
    if (auto && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => measure(auto))
      observer.observe(auto)
    }
  }
  onMounted(observe)
  onUpdated(observe)
  onBeforeUnmount(() => observer?.disconnect())

  const controls = computed(() => {
    const { dataZoom, legend, series, xAxis } = getAttrs()
    return cloneDeep({
      zoom: { categories: input.categories, axis: convertArray(xAxis)[0]?.id, dataZoom },
      legend,
      names: convertArray(series).map(item => item.name ?? input.name),
      name: input.name,
      reference: input.referenceLine?.name,
    })
  })
  let previous: typeof controls.value | undefined
  const layout = computed(() => {
    if (!preset.value) {
      previous = undefined
      return undefined
    }
    const attrs = getAttrs()
    const config = controls.value
    const current =
      previous && chart && !chart.isDisposed() ? (chart.getOption() as ChartProps) : undefined
    const keepZoom = isEqual(config.zoom, previous?.zoom)
    const keepLegend =
      isEqual(config.legend, previous?.legend) &&
      isEqual(config.names, previous?.names) &&
      config.name === previous?.name &&
      config.reference === previous?.reference
    previous = config
    const chartTheme = attrs.theme ?? unref(providedTheme)
    const dark =
      typeof attrs.darkMode === 'boolean'
        ? attrs.darkMode
        : chartTheme === 'dark' ||
          (!!chartTheme &&
            typeof chartTheme === 'object' &&
            'darkMode' in chartTheme &&
            chartTheme.darkMode === true)
    return createCategoryLineOption(
      input,
      pick(input, lineChartProps) as LineSeriesOption,
      attrs,
      width.value,
      theme.value,
      dark,
      () => chart,
      {
        dataZoom: keepZoom ? current?.dataZoom : undefined,
        legend: keepLegend ? current?.legend : undefined,
      },
    )
  })
  const bindLegendWheel = useLegendWheel(() => layout.value?.wheel)
  const onReady = (current: EChartsType) => {
    chart = current
    ;(getAttrs().onReady ?? ready)?.(current)
  }
  return computed(() => layout.value && { ...layout.value.option, onReady })
}
