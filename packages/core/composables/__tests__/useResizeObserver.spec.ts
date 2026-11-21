import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { effectScope, computed, shallowRef, nextTick } from 'vue'

import { useResizeObserver } from '../useResizeObserver'

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(640)
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(320)
  vi.useFakeTimers()
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
    setTimeout(() => callback(0), 16),
  )
  vi.stubGlobal('cancelAnimationFrame', (handle: number) => clearTimeout(handle))
})
afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('resizes the current instance after replacement and disconnects on cleanup', async () => {
  const callbacks: Function[] = []
  const disconnect = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: Function) {
        callbacks.push(callback)
      }
      observe() {}
      disconnect = disconnect
    },
  )
  const container = document.createElement('div')
  const first = { resize: vi.fn() }
  const second = { resize: vi.fn() }
  const chart = shallowRef<any>(first)
  const scope = effectScope()
  scope.run(() =>
    useResizeObserver(
      shallowRef(container),
      chart,
      computed(() => true),
    ),
  )
  chart.value = second
  await nextTick()
  callbacks[0]([{ target: container }])
  expect(second.resize).not.toHaveBeenCalled()
  vi.advanceTimersByTime(16)
  expect(first.resize).not.toHaveBeenCalled()
  expect(second.resize).toHaveBeenCalledTimes(1)
  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(0)
  callbacks[0]([{ target: container }])
  vi.advanceTimersByTime(16)
  expect(second.resize).toHaveBeenCalledTimes(1)
  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(640)
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(0)
  callbacks[0]([{ target: container }])
  vi.advanceTimersByTime(16)
  expect(second.resize).toHaveBeenCalledTimes(1)
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(320)
  callbacks[0]([{ target: container }])
  vi.advanceTimersByTime(16)
  expect(second.resize).toHaveBeenCalledTimes(2)
  scope.stop()
  expect(disconnect).toHaveBeenCalled()
  vi.unstubAllGlobals()
})

it('shares an observer and disconnects only after the final listener is removed', async () => {
  const { onResize, offResize } = await import('../useResizeObserver')
  let callback!: (entries: { target: HTMLElement }[]) => void
  const observe = vi.fn()
  const disconnect = vi.fn()
  const observer = vi.fn(function (this: any, cb: typeof callback) {
    callback = cb
    this.observe = observe
    this.disconnect = disconnect
  })
  vi.stubGlobal('ResizeObserver', observer)
  const el = document.createElement('div')
  const first = vi.fn()
  const second = vi.fn()
  try {
    onResize(undefined, first)
    onResize(el, undefined)
    onResize(el, first)
    onResize(el, second)
    expect(observer).toHaveBeenCalledTimes(1)
    callback([{ target: el }])
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(1)
    offResize(el, first)
    offResize(el, first)
    callback([{ target: el }])
    expect(first).toHaveBeenCalledTimes(1)
    expect(second).toHaveBeenCalledTimes(2)
    expect(disconnect).not.toHaveBeenCalled()
    offResize(el, second)
    expect(disconnect).toHaveBeenCalledTimes(1)
  } finally {
    offResize(el, first)
    offResize(el, second)
    vi.unstubAllGlobals()
  }
})

it('honors autoResize changes and cancels queued callbacks after cleanup', async () => {
  const callbacks: Function[] = []
  const disconnect = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: Function) {
        callbacks.push(callback)
      }
      observe() {}
      disconnect = disconnect
    },
  )
  vi.useFakeTimers()
  const enabled = shallowRef(false)
  const instance = { resize: vi.fn() }
  const scope = effectScope()
  try {
    scope.run(() =>
      useResizeObserver(
        shallowRef(document.createElement('div')),
        shallowRef<any>(instance),
        computed(() => enabled.value),
      ),
    )
    await nextTick()
    expect(callbacks).toHaveLength(0)
    enabled.value = true
    await nextTick()
    expect(callbacks).toHaveLength(1)
    callbacks[0]([{}])
    callbacks[0]([{}])
    expect(instance.resize).not.toHaveBeenCalled()
    vi.advanceTimersByTime(16)
    expect(instance.resize).toHaveBeenCalledTimes(1)
    callbacks[0]([{}])
    enabled.value = false
    await nextTick()
    vi.runAllTimers()
    expect(instance.resize).toHaveBeenCalledTimes(1)
    expect(disconnect).toHaveBeenCalledTimes(1)
    enabled.value = true
    await nextTick()
    callbacks[1]([{}])
    vi.advanceTimersByTime(16)
    expect(instance.resize).toHaveBeenCalledTimes(2)
    callbacks[1]([{}])
    scope.stop()
    vi.runAllTimers()
    expect(instance.resize).toHaveBeenCalledTimes(2)
    expect(disconnect).toHaveBeenCalledTimes(2)
  } finally {
    scope.stop()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  }
})

it('does not observe absent containers/instances or resize a replaced instance from a queued frame', async () => {
  let delivery!: (entries: object[]) => void
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: typeof delivery) {
        delivery = callback
      }
      observe() {}
      disconnect() {}
    },
  )
  const host = shallowRef<HTMLElement>()
  const instance = { resize: vi.fn() }
  const chart = shallowRef<any>()
  const scope = effectScope()
  scope.run(() =>
    useResizeObserver(
      host,
      chart,
      computed(() => true),
    ),
  )
  host.value = document.createElement('div')
  await nextTick()
  chart.value = instance
  await nextTick()
  delivery([{ target: host.value }])
  chart.value = undefined
  // Deliver the pending animation frame before Vue flushes watcher cleanup.
  vi.advanceTimersByTime(16)
  expect(instance.resize).not.toHaveBeenCalled()
  await nextTick()
  scope.stop()
})
