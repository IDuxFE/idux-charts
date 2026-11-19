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

it('ignores modified/outside/consumed wheels, supports scaled bottom regions and rebinding', () => {
  const scrollBy = vi.fn()
  let region: ReturnType<Parameters<typeof useLegendWheel>[0]> = undefined
  let bind!: ReturnType<typeof useLegendWheel>
  const wrapper = mount(
    defineComponent({
      setup() {
        bind = useLegendWheel(() => region)
        return () => h('div')
      },
    }),
  )
  wrappers.push(wrapper)
  const host = wrapper.element as HTMLElement
  const rect = vi
    .spyOn(host, 'getBoundingClientRect')
    .mockReturnValue(new DOMRect(10, 20, 400, 300))
  Object.defineProperties(host, { clientWidth: { value: 200 }, clientHeight: { value: 150 } })
  bind(host)
  bind(host)
  const fire = (options: WheelEventInit = {}, consumed = false) => {
    const event = new WheelEvent('wheel', {
      cancelable: true,
      deltaY: 10,
      clientX: 110,
      clientY: 220,
      ...options,
    })
    if (consumed) event.preventDefault()
    host.dispatchEvent(event)
    return event
  }
  fire()
  region = { left: 0, width: 200, height: 100, scrollBy }
  for (const options of [
    { ctrlKey: true },
    { deltaY: 0 },
    { deltaX: 100 },
    { clientX: 9 },
    { clientX: 410 },
    { clientY: 0 },
    { clientY: 320 },
  ])
    fire(options)
  fire({}, true)
  rect.mockReturnValueOnce(new DOMRect(0, 0, 0, 100))
  fire()
  expect(scrollBy).not.toHaveBeenCalled()
  expect(fire().defaultPrevented).toBe(true)
  expect(scrollBy).toHaveBeenCalledExactlyOnceWith(1)
  const tooltip = document.createElement('div')
  tooltip.className = 'charts-tooltips-columns'
  host.append(tooltip)
  tooltip.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 10 }))
  expect(scrollBy).toHaveBeenCalledTimes(1)
  bind(undefined)
  fire()
  expect(scrollBy).toHaveBeenCalledTimes(1)
})
