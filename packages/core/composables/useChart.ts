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
import type { EChartsType } from 'echarts/core'
import { isEqual, cloneDeep, isBoolean } from 'lodash-es'

// Register the pictorial series used by stripe helpers.
use([PictorialBarChart])

import { createTooltipTheme } from './tooltipTheme'
import { useResizeObserver } from './useResizeObserver'
import type { ChartProps } from '../types'
import { CHART_THEME_TOKEN } from '../themes/token'

export type MaybeRef<T> = T | Ref<T>

const defaultLoading = { text: 'Loading...' }

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

  const mergedAutoResize = computed(() => unref(options).autoResize ?? true)
  const mergedGroup = computed(() => unref(options).group)
  const mergedInitOption = computed(() => unref(options).initOption)
  const mergedLoading = computed(() => unref(options).loading)
  const mergedSetOptionOpts = computed(() => unref(options).setOptionOpts)
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

  const initChat = () => {
    const container = containerRef.value
    if (!container) {
      return
    }

    const instance = init(container, mergedTheme.value, mergedInitOption.value)

    instance.on('rendered', tooltipTheme.rendered)

    const currOptions = unref(options)
    const { restOptions, events } = processOptions(currOptions, getListeners(), false)

    instance.setOption(tooltipTheme.prepare(restOptions), mergedSetOptionOpts.value)
    tooltipTheme.sync(instance)
    prevRestOptions.value = cloneDeep(restOptions) as U

    syncEvents(instance, events)

    const onReady = currOptions.onReady || getListeners()?.ready
    if (onReady) {
      onReady(instance)
    }

    chartRef.value = instance
  }

  const destroyChart = () => {
    if (chartRef.value) {
      chartRef.value.dispose()
      chartRef.value = undefined
      boundEvents = []
    }
  }

  onMounted(() => initChat())
  onBeforeUnmount(() => destroyChart())
  // Vue attrs and Vue 2 listeners are refreshed during component updates.
  onUpdated(() => {
    if (chartRef.value) {
      syncEvents(chartRef.value, processOptions(unref(options), getListeners(), false).events)
    }
  })

  watch(
    () => unref(options),
    currOptions => {
      const instance = chartRef.value
      if (!instance) {
        return
      }

      const { restOptions, events } = processOptions(currOptions, getListeners(), false)
      syncEvents(instance, events)

      if (!isEqual(restOptions, prevRestOptions.value)) {
        instance.setOption(tooltipTheme.prepare(restOptions), mergedSetOptionOpts.value)
        if (restOptions.darkMode !== prevRestOptions.value?.darkMode) {
          tooltipTheme.sync(instance)
        } else {
          tooltipTheme.rendered()
        }
        prevRestOptions.value = cloneDeep(restOptions) as U
      }
    },
    {
      deep: true,
    },
  )

  watch(
    [() => cloneDeep(mergedTheme.value), () => cloneDeep(mergedInitOption.value)],
    ([theme, initOption], [previousTheme, previousInitOption]) => {
      if (isEqual(theme, previousTheme) && isEqual(initOption, previousInitOption)) {
        return
      }
      destroyChart()
      initChat()
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

    const loading = mergedLoading.value

    if (loading) {
      const defaults =
        instance.getOption().darkMode === true
          ? { ...defaultLoading, textColor: '#F4F8FF', maskColor: 'rgba(10, 12, 15, 0.8)' }
          : defaultLoading
      instance.showLoading(isBoolean(loading) ? defaults : { ...defaults, ...loading })
    } else {
      instance.hideLoading()
    }
  })

  useResizeObserver(containerRef, chartRef, mergedAutoResize)

  return { containerRef, chartRef }
}

function isEvent(key: string) {
  return /^on[^a-z]/.test(key)
}

const ignoreOptions = [
  'class',
  'style',
  'autoResize',
  'initOption',
  'group',
  'loading',
  'setOptionOpts',
  'theme',
  'onReady',
]

function processOptions(
  options: ChartProps,
  listeners: Record<string, Function> = {},
  isIgnoreEvent = true,
) {
  const restOptions: ChartProps = {}
  const events: [string, Function, boolean][] = []
  Object.keys(options).forEach(key => {
    if (ignoreOptions.includes(key)) {
      return
    }
    if (isEvent(key)) {
      if (isIgnoreEvent) {
        return
      }
      const handler = options[key] as Function
      if (handler) {
        const isOnce = key.endsWith('Once')
        // onClick => click
        // onClickOnce => click
        const endIndex = isOnce ? key.length - 4 : undefined
        const eventName = key.charAt(2).toLowerCase() + key.substring(3, endIndex)
        events.push([eventName, handler, isOnce])
      }
      return
    }
    restOptions[key] = options[key]
  })

  if (isVue2 && !isIgnoreEvent) {
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
