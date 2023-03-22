import { type ComputedRef, type Ref, watch } from 'vue-demi'

import { throttle, type EChartsType } from 'echarts/core'

export function useResizeObserver(
  containerRef: Ref<HTMLElement | undefined>,
  chartRef: Ref<EChartsType | undefined>,
  mergedAutoResize: ComputedRef<boolean | undefined>,
): void {
  let listener: ResizeListener | undefined

  watch(
    [containerRef, chartRef, mergedAutoResize],
    ([container, instance, autoResize], _, cleanup) => {
      if (!container || !instance) {
        return
      }

      if (autoResize) {
        listener ??= throttle(() => instance.resize(), 16)
        onResize(container, listener)
      } else {
        offResize(container, listener)
      }

      cleanup(() => offResize(container, listener))
    },
  )
}

export type ResizeListener = (entry: ResizeObserverEntry) => void

const resizeMap = new Map<Element, { listeners: ResizeListener[]; ro: ResizeObserver }>()

export function onResize(
  el: Element | null | undefined,
  listener: ResizeListener | undefined,
  options?: ResizeObserverOptions,
): void {
  if (!el || !listener) {
    return
  }

  if (resizeMap.has(el)) {
    resizeMap.get(el)!.listeners.push(listener)
  } else {
    const listeners = [listener]
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => listeners.forEach(fn => fn(entry)))
    })
    ro.observe(el, options)
    resizeMap.set(el, { listeners, ro })
  }
}

export function offResize(
  el: Element | null | undefined,
  listener: ResizeListener | undefined,
): void {
  if (!el || !listener || !resizeMap.has(el)) {
    return
  }

  const { listeners, ro } = resizeMap.get(el)!
  const listenerIndex = listeners.indexOf(listener)
  if (listenerIndex > -1) {
    listeners.splice(listenerIndex, 1)
    if (listeners.length === 0) {
      ro.disconnect()
      resizeMap.delete(el)
    }
  }
}
