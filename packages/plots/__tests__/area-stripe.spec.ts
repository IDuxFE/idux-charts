import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, shallowRef } from 'vue'
import { useLineChartAreaStripe } from '../line/src/useLineChartAreaStripe'

afterEach(() => vi.unstubAllGlobals())
it('observes an initial element, follows element/color changes, and disconnects on unmount', async () => {
  const observe = vi.fn()
  const disconnect = vi.fn(function (this: unknown) {
    expect(this).toBe(observers[0])
  })
  let callback!: () => void
  const observers: unknown[] = []
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = observe
      disconnect = disconnect
      constructor(cb: () => void) {
        callback = cb
        observers.push(this)
      }
    },
  )
  const first = document.createElement('div')
  const second = document.createElement('div')
  vi.spyOn(first, 'getBoundingClientRect').mockReturnValue({ height: 100 } as DOMRect)
  const rect = vi.spyOn(second, 'getBoundingClientRect').mockReturnValue({ height: 200 } as DOMRect)
  const target = shallowRef(first)
  const color = shallowRef('#ff0000')
  let stripe!: ReturnType<typeof useLineChartAreaStripe>
  const wrapper = mount(
    defineComponent({
      setup() {
        stripe = useLineChartAreaStripe(target, color)
        return () => h('div')
      },
    }),
  )
  try {
    expect(observe).toHaveBeenCalledWith(first)
    expect(
      decodeURIComponent(stripe.lineChartAreaStripeConfig.value.areaStyle.color.image.src),
    ).toContain("height='100'")
    target.value = second
    await nextTick()
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(observe).toHaveBeenLastCalledWith(second)
    color.value = '#00ff00'
    await nextTick()
    expect(
      decodeURIComponent(stripe.lineChartAreaStripeConfig.value.areaStyle.color.image.src),
    ).toContain('rgba(0, 255, 0, 0.3)')
    rect.mockReturnValue({ height: 240 } as DOMRect)
    callback()
    expect(
      decodeURIComponent(stripe.lineChartAreaStripeConfig.value.areaStyle.color.image.src),
    ).toContain("height='240'")
  } finally {
    wrapper.unmount()
  }
  expect(disconnect).toHaveBeenCalledTimes(3)
})
