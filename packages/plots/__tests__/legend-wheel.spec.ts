import { mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import { defineComponent, h, onMounted, shallowRef } from 'vue'
import { useLegendWheel } from '../shared/useLegendWheel'
import { createChartLoading } from '../../core/composables/chartLoading'

const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

it('ignores wheel events from loading content and resumes paging after loading', () => {
  const scrollBy = vi.fn()
  const wrapper = mount(
    defineComponent({
      setup() {
        const host = shallowRef<HTMLElement>()
        const bind = useLegendWheel(() => ({ left: 0, top: 0, width: 200, height: 150, scrollBy }))
        onMounted(() => bind(host.value))
        return () => h('div', { ref: host })
      },
    }),
  )
  wrappers.push(wrapper)
  const host = wrapper.element as HTMLElement
  vi.spyOn(host, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 200, 150))
  Object.defineProperties(host, { clientWidth: { value: 200 }, clientHeight: { value: 150 } })
  const loading = createChartLoading()
  const wheel = (target: Element, deltaY = 120) => {
    const event = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY,
      clientX: 50,
      clientY: 50,
    })
    target.dispatchEvent(event)
    return event
  }
  try {
    expect(wheel(host).defaultPrevented).toBe(true)
    expect(scrollBy).toHaveBeenLastCalledWith(1)
    scrollBy.mockClear()
    loading.update(host, true, {})
    for (const selector of [
      '.ix-chart-loading',
      '.ix-chart-loading img',
      '.ix-chart-loading span',
    ]) {
      expect(wheel(host.querySelector(selector)!).defaultPrevented).toBe(false)
    }
    expect(scrollBy).not.toHaveBeenCalled()
    loading.update(host, false, {})
    expect(wheel(host, -120).defaultPrevented).toBe(true)
    expect(scrollBy).toHaveBeenCalledExactlyOnceWith(-1)
    wrapper.unmount()
    wheel(host)
    expect(scrollBy).toHaveBeenCalledTimes(1)
  } finally {
    loading.remove()
  }
})
