import {
  inject,
  shallowRef,
  watch,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  computed,
  watchEffect,
  unref,
  isVue2,
} from 'vue-demi'
import type { Ref, ShallowRef } from 'vue-demi'

import { PictorialBarChart } from 'echarts/charts'
import { init, use } from 'echarts/core'
import type { EChartsType, SetOptionOpts } from 'echarts/core'
import { isEqual, cloneDeep } from 'lodash-es'
import { createChartLoading } from './chartLoading'

// Register the pictorial series used by stripe helpers.
use([PictorialBarChart])

import { createTooltipTheme } from './tooltipTheme'
import { useResizeObserver } from './useResizeObserver'
import type { ChartProps } from '../types'
import { CHART_THEME_TOKEN } from '../themes/token'
import { isChartEvent, replaceChartComponent, splitChartOptions } from '../utils/chartOptions'
import { restoreChartInteraction, restoreGeoInteraction } from '../utils/chartInteraction'

export type MaybeRef<T> = T | Ref<T>

export function useChart<U extends ChartProps>(
  options: MaybeRef<U>,
  listeners?: Record<string, Function> | (() => Record<string, Function>),
): {
  containerRef: ShallowRef<HTMLDivElement | undefined>
  chartRef: ShallowRef<EChartsType | undefined>
} {
  const getListeners = () => (typeof listeners === 'function' ? listeners() : listeners)
  const containerRef = shallowRef<HTMLDivElement>()
  const chartRef = shallowRef<EChartsType>()
  const prevRestOptions = shallowRef<U>()
  let prevSetOptionOpts: SetOptionOpts | undefined

  const mergedAutoResize = computed(() => unref(options).autoResize ?? true)
  const mergedGroup = computed(() => unref(options).group)
  const mergedInitOption = computed(() => unref(options).initOption)
  const mergedLoading = computed(() => unref(options).loading)
  const mergedSetOptionOpts = computed(() => {
    const { setOptionOpts, title } = unref(options)
    return title === null ? replaceChartComponent(setOptionOpts, 'title') : setOptionOpts
  })
  const providedTheme = inject(CHART_THEME_TOKEN, undefined)
  const mergedTheme = computed(() => unref(options).theme ?? unref(providedTheme) ?? 'seer')

  let boundEvents: { name: string; handler: Function; once: boolean; wrapped: any }[] = []

  const syncEvents = (instance: EChartsType, events: [string, Function, boolean][]) => {
    boundEvents = boundEvents.filter(bound => {
      const retained = events.some(
        ([name, handler, once]) =>
          name === bound.name && handler === bound.handler && once === bound.once,
      )
      if (!retained) {
        instance.off(bound.name, bound.wrapped)
      }
      return retained
    })
    events.forEach(([name, handler, once]) => {
      if (
        boundEvents.some(
          bound => bound.name === name && bound.handler === handler && bound.once === once,
        )
      ) {
        return
      }
      const wrapped = (...args: any[]) => {
        if (once) {
          instance.off(name, wrapped)
        }
        handler(...args)
      }
      boundEvents.push({ name, handler, once, wrapped })
      instance.on(name, wrapped)
    })
  }

  const tooltipTheme = createTooltipTheme(() => containerRef.value)
  const loadingOverlay = createChartLoading()

  const initChart = (initialOption?: ChartProps, initOption = mergedInitOption.value) => {
    const container = containerRef.value
    if (!container) {
      return
    }

    const currOptions = unref(options)
    const { restOptions, events } = processOptions(currOptions, getListeners())
    const instance = init(container, mergedTheme.value, initOption)
    // Own the instance only after setup succeeds. A failed first render must not
    // leave an unreachable instance registered on the container.
    try {
      instance.on('rendered', tooltipTheme.rendered)
      instance.setOption(
        tooltipTheme.prepare(initialOption ?? restOptions),
        mergedSetOptionOpts.value,
      )
      tooltipTheme.sync(instance)
      syncEvents(instance, events)
      prevRestOptions.value = cloneDeep(restOptions) as U
      prevSetOptionOpts = cloneDeep(mergedSetOptionOpts.value)
    } catch (error) {
      instance.dispose()
      boundEvents = []
      loadingOverlay.remove()
      throw error
    }
    chartRef.value = instance

    const onReady = currOptions.onReady || getListeners()?.ready
    if (onReady) {
      onReady(instance)
    }
  }

  const destroyChart = () => {
    loadingOverlay.remove()
    if (chartRef.value) {
      chartRef.value.dispose()
      chartRef.value = undefined
      boundEvents = []
    }
  }

  onMounted(() => initChart())
  onBeforeUnmount(() => destroyChart())
  // Vue attrs and Vue 2 listeners are refreshed during component updates.
  onUpdated(() => {
    if (chartRef.value) {
      syncEvents(chartRef.value, processOptions(unref(options), getListeners()).events)
    }
  })

  watch(
    [() => cloneDeep(mergedTheme.value), () => cloneDeep(mergedInitOption.value)],
    ([theme, initOption], [previousTheme, previousInitOption]) => {
      if (isEqual(theme, previousTheme) && isEqual(initOption, previousInitOption)) {
        return
      }
      const instance = chartRef.value
      if (!instance) return
      const { restOptions } = processOptions(unref(options), getListeners())
      const initialOption = restoreChartInteraction(instance, prevRestOptions.value, restOptions)
      // Hidden tabs have no measurable canvas. Keep the last valid viewport until
      // ResizeObserver can measure it again, while honoring explicit init sizes.
      const rebuildInitOption = containerRef.value?.getClientRects().length
        ? mergedInitOption.value
        : { width: instance.getWidth(), height: instance.getHeight(), ...mergedInitOption.value }
      destroyChart()
      initChart(initialOption, rebuildInitOption)
    },
  )

  watch(
    () => unref(options),
    currOptions => {
      const instance = chartRef.value
      if (!instance) {
        return
      }

      const { restOptions, events } = processOptions(currOptions, getListeners())
      syncEvents(instance, events)

      const setOptionOpts = mergedSetOptionOpts.value
      const updateChanged = !isEqual(setOptionOpts, prevSetOptionOpts)
      if (updateChanged || !isEqual(restOptions, prevRestOptions.value)) {
        const next = setOptionOpts?.notMerge
          ? restoreGeoInteraction(instance, prevRestOptions.value, restOptions)
          : restOptions
        instance.setOption(tooltipTheme.prepare(next), setOptionOpts)
        if (updateChanged || restOptions.darkMode !== prevRestOptions.value?.darkMode) {
          tooltipTheme.sync(instance)
        } else {
          tooltipTheme.rendered()
        }
        prevRestOptions.value = cloneDeep(restOptions) as U
        prevSetOptionOpts = cloneDeep(setOptionOpts)
      }
    },
    {
      deep: true,
    },
  )

  watchEffect(() => {
    const group = mergedGroup.value
    if (chartRef.value) {
      chartRef.value.group = group ?? ''
    }
  })

  watchEffect(() => {
    const instance = chartRef.value
    if (!instance) {
      return
    }

    if (!mergedLoading.value) {
      loadingOverlay.remove()
      return
    }
    // Track option changes too: SVG colors must update when darkMode changes in place.
    const currentOptions = unref(options)
    loadingOverlay.update(containerRef.value!, mergedLoading.value, {
      ...currentOptions,
      ...instance.getOption(),
    })
    instance.dispatchAction?.({ type: 'hideTip' })
  })

  useResizeObserver(containerRef, chartRef, mergedAutoResize)

  return { containerRef, chartRef }
}

function processOptions(options: ChartProps, listeners: Record<string, Function> = {}) {
  const { option: restOptions, controls } = splitChartOptions(options)
  if (restOptions.title === null) delete restOptions.title
  const events: [string, Function, boolean][] = []
  Object.keys(controls).forEach(key => {
    if (key === 'onReady' || !isChartEvent(key)) {
      return
    }
    const handler = controls[key] as Function
    if (handler) {
      const isOnce = key.endsWith('Once')
      // onClick => click; onClickOnce => click
      const endIndex = isOnce ? key.length - 4 : undefined
      const eventName = key.charAt(2).toLowerCase() + key.substring(3, endIndex)
      events.push([eventName, handler, isOnce])
    }
  })

  if (isVue2) {
    Object.keys(listeners).forEach(key => {
      if (key === 'ready' || key === '~ready') {
        return
      }

      const handler = listeners[key] as Function
      if (handler) {
        const isOnce = key.startsWith('~')
        // click => click
        // ~click => click
        const startIndex = isOnce ? 1 : 0
        const eventName = key.substring(startIndex)
        events.push([eventName, handler, isOnce])
      }
    })
  }
  return { restOptions, events }
}
