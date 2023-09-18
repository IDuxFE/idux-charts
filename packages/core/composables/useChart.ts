import {
  shallowRef,
  watch,
  onMounted,
  onBeforeUnmount,
  type Ref,
  type ShallowRef,
  computed,
  watchEffect,
  unref,
  isVue2,
} from 'vue-demi'

import { init, type EChartsType, use } from 'echarts/core'
import { isEqual, cloneDeep, isBoolean } from 'lodash-es'
import { PictorialBarChart } from 'echarts/charts'

// 这个图形需要单独注册
use([PictorialBarChart])

import { useResizeObserver } from './useResizeObserver'
import { type ChartProps } from '../types'

export type MaybeRef<T> = T | Ref<T>

const defaultLoading = { text: '加载中...' }

export function useChart<U extends ChartProps>(
  options: MaybeRef<U>,
  listeners?: Record<string, Function>,
): {
  containerRef: ShallowRef<HTMLDivElement | undefined>
  chartRef: ShallowRef<EChartsType | undefined>
} {
  const containerRef = shallowRef<HTMLDivElement>()
  const chartRef = shallowRef<EChartsType>()
  const prevRestOptions = shallowRef<U>()

  const mergedAutoResize = computed(() => unref(options).autoResize ?? true)
  const mergedGroup = computed(() => unref(options).group)
  const mergedInitOption = computed(() => unref(options).initOption)
  const mergedLoading = computed(() => unref(options).loading)
  const mergedSetOptionOpts = computed(() => unref(options).setOptionOpts)
  const mergedTheme = computed(() => unref(options).theme ?? 'seer')

  const initChat = () => {
    const container = containerRef.value
    if (!container) {
      return
    }

    const instance = init(container, mergedTheme.value, mergedInitOption.value)

    const currOptions = unref(options)
    const { restOptions, events } = processOptions(currOptions, listeners, false)

    instance.setOption(restOptions, mergedSetOptionOpts.value)
    prevRestOptions.value = cloneDeep(restOptions) as U

    events.forEach(([eventName, handler, once]) => {
      let mergedHandler = handler as any
      if (once) {
        mergedHandler = (...args: any[]) => {
          handler(...args)
          instance.off(eventName, mergedHandler)
        }
      }
      instance.on(eventName, mergedHandler)
    })

    const onReady = currOptions.onReady || listeners?.ready
    if (onReady) {
      onReady(instance)
    }

    chartRef.value = instance
  }

  const destroyChart = () => {
    if (chartRef.value) {
      chartRef.value.dispose()
      chartRef.value = undefined
    }
  }

  onMounted(() => initChat())
  onBeforeUnmount(() => destroyChart())

  watch(
    () => unref(options),
    currOptions => {
      const instance = chartRef.value
      if (!instance) {
        return
      }

      const { restOptions } = processOptions(currOptions)

      if (!isEqual(restOptions, prevRestOptions.value)) {
        instance.setOption(restOptions, mergedSetOptionOpts.value)
        prevRestOptions.value = cloneDeep(restOptions) as U
      }
    },
    {
      deep: true,
    },
  )

  watch([mergedTheme, mergedInitOption], () => {
    destroyChart()
    initChat()
  })

  watchEffect(() => {
    const group = mergedGroup.value
    if (group && chartRef.value) {
      chartRef.value.group = group
    }
  })

  watchEffect(() => {
    const instance = chartRef.value
    if (!instance) {
      return
    }

    const loading = mergedLoading.value

    if (loading) {
      instance.showLoading(isBoolean(loading) ? defaultLoading : { ...defaultLoading, ...loading })
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
      if (key !== 'ready') {
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
