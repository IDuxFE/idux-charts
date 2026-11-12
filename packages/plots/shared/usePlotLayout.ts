import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowRef,
  watch,
} from 'vue-demi'
import { cloneDeep, isEqual } from 'lodash-es'
import type { EChartsType } from 'echarts/core'
import type { LegendComponentOption } from 'echarts/components'
import { convertArray } from '@idux/charts-core'
import type { ChartProps } from '@idux/charts-core'
import { categoryZoomUpdate } from './categoryZoom'
import type { CategoryZoomConfig } from './categoryZoom'

export function usePlotSize(
  active: () => boolean,
  autoResize: () => boolean,
  initial = { width: 0, height: 0 },
  onMeasure?: (element: HTMLElement) => void,
) {
  const instance = getCurrentInstance()
  const element = shallowRef<HTMLElement>()
  const width = shallowRef(initial.width)
  const height = shallowRef(initial.height)
  const size = computed(() => ({ width: width.value, height: height.value }))
  let observed: HTMLElement | undefined
  let observer: ResizeObserver | undefined
  const measure = (root: HTMLElement) => {
    if (root.clientWidth > 0 && root.clientHeight > 0) {
      width.value = root.clientWidth
      height.value = root.clientHeight
    }
    onMeasure?.(root)
  }
  const sync = () => {
    const target = active()
      ? (instance?.proxy?.$refs.chart as { $el?: HTMLElement } | undefined)?.$el
      : undefined
    if (target !== element.value) {
      element.value = target
      if (target) measure(target)
      else {
        width.value = initial.width
        height.value = initial.height
      }
    }
    const root = autoResize() ? target : undefined
    if (root === observed) return
    observer?.disconnect()
    observed = root
    if (root && typeof ResizeObserver !== 'undefined') {
      measure(root)
      observer = new ResizeObserver(() => {
        if (observed === root) measure(root)
      })
      observer.observe(root)
    }
  }
  onMounted(sync)
  onUpdated(sync)
  watch(autoResize, sync)
  onBeforeUnmount(() => observer?.disconnect())
  return { element, size, width }
}

type InteractionConfig = { zoom?: CategoryZoomConfig; legend?: unknown; selection?: unknown }

export function createPlotInteraction() {
  let chart: EChartsType | undefined
  let previous: InteractionConfig | undefined
  return {
    getChart: () => chart,
    setChart: (instance: EChartsType) => {
      chart = instance
    },
    read(config?: InteractionConfig): Pick<ChartProps, 'dataZoom' | 'legend' | 'series'> {
      const keep = (key: keyof InteractionConfig) =>
        config?.[key] !== undefined && isEqual(config[key], previous?.[key])
      const zoom = categoryZoomUpdate(config?.zoom, previous?.zoom)
      const legend = keep('legend')
      const selection = keep('selection')
      previous = cloneDeep(config)
      if (!(zoom || legend || selection) || !chart || chart.isDisposed()) return {}
      const current = chart.getOption() as ChartProps
      return {
        dataZoom: zoom?.(current.dataZoom),
        legend: legend ? current.legend : undefined,
        series: selection ? current.series : undefined,
      }
    },
  }
}

export function categoryInteraction(
  input: { categories?: string[]; referenceLine?: { name?: string }; name?: string | number },
  attrs: ChartProps,
  layout?: string,
): InteractionConfig {
  const axis = layout?.startsWith('horizontal') ? attrs.yAxis : attrs.xAxis
  return {
    zoom: {
      categories: input.categories,
      layout,
      axisId: convertArray(axis)[0]?.id,
      dataZoom: attrs.dataZoom,
    },
    legend: {
      option: legendSelectionConfig(attrs.legend),
      names: convertArray(attrs.series).map(item => item.name ?? input.name),
      name: input.name,
      reference: input.referenceLine?.name,
    },
  }
}

export function legendSelectionConfig(legend: ChartProps['legend']) {
  const options = Array.isArray(legend) ? legend : [legend ?? {}]
  return options.map(item => ({
    id: item.id,
    selected: item.selected,
    selectedMode: item.selectedMode,
    names: item.data?.map(entry => (typeof entry === 'string' ? entry : entry.name)),
  }))
}

export function restoreLegendSelection(option: ChartProps, current: ChartProps['legend']) {
  if (!current || !option.legend) return
  const live = convertArray(current)
  const restore = (legend: LegendComponentOption, index: number) => {
    const previous =
      legend.id === undefined ? live[index] : live.find(item => item.id === legend.id)
    return previous?.selected ? { ...legend, selected: previous.selected } : legend
  }
  option.legend = Array.isArray(option.legend)
    ? option.legend.map(restore)
    : restore(option.legend, 0)
}
