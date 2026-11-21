import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import {
  createCommentVNode,
  createTextVNode,
  defineComponent,
  Fragment,
  Text,
  h,
  nextTick,
  ref,
} from 'vue'

vi.mock('echarts/core', async () => ({
  ...(await vi.importActual<typeof import('echarts/core')>('echarts/core')),
  init: vi.fn(),
}))
vi.mock('../../composables/useResizeObserver', () => ({ useResizeObserver: vi.fn() }))

import { init } from 'echarts/core'
import { IxChart } from '../index'

const wrappers: ReturnType<typeof mount>[] = []
const dispose = vi.fn()
beforeEach(() => {
  vi.mocked(init)
    .mockReset()
    .mockImplementation(container => {
      // Model ECharts owning and clearing its host during initialization and disposal.
      container!.innerHTML = '<svg data-chart="true"></svg>'
      return {
        getOption: () => ({}),
        getWidth: () => 640,
        getHeight: () => 320,
        setOption: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        dispose: () => {
          container!.innerHTML = ''
          dispose()
        },
      } as any
    })
  dispose.mockClear()
})
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

it('keeps slot content outside the ECharts host and preserves it during theme recreation', async () => {
  const click = vi.fn()
  const wrapper = mount(IxChart, {
    attrs: { theme: 'seer', style: { height: '300px' }, 'aria-label': 'Sales' },
    slots: { default: () => h('button', { onClick: click }, 'Retry') },
  })
  wrappers.push(wrapper)
  const host = wrapper.get('.ix-chart-canvas').element
  const button = wrapper.get('button').element
  expect(init).toHaveBeenCalledWith(host, 'seer', undefined)
  expect(host.contains(button)).toBe(false)
  expect(host.getAttribute('aria-label')).toBe('Sales')
  await wrapper.get('button').trigger('click')
  expect(click).toHaveBeenCalledTimes(1)

  await wrapper.setProps({ theme: 'dark' })
  expect(init).toHaveBeenCalledTimes(2)
  expect(dispose).toHaveBeenCalledTimes(1)
  expect(wrapper.get('button').element).toBe(button)
  expect(wrapper.find('[data-chart]').exists()).toBe(true)
})

it('adds, updates and removes overlays without recreating the chart or blocking empty slots', async () => {
  const visible = ref(false)
  const label = ref('No data')
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(
          IxChart,
          {},
          {
            default: () => [
              h(Fragment, {}, visible.value ? [h('p', label.value)] : [createCommentVNode('v-if')]),
            ],
          },
        ),
    }),
  )
  wrappers.push(wrapper)
  expect(wrapper.find('.ix-chart-overlay').exists()).toBe(false)
  visible.value = true
  await nextTick()
  expect(wrapper.get('.ix-chart-overlay').text()).toBe('No data')
  label.value = 'Load failed'
  await nextTick()
  expect(wrapper.get('p').text()).toBe('Load failed')
  visible.value = false
  await nextTick()
  expect(wrapper.find('.ix-chart-overlay').exists()).toBe(false)
  expect(init).toHaveBeenCalledTimes(1)
  expect(dispose).not.toHaveBeenCalled()
})

it('renders ordinary empty elements and multiple roots while omitting an unused overlay', () => {
  const wrapper = mount(IxChart)
  wrappers.push(wrapper)
  expect(wrapper.find('.ix-chart-overlay').exists()).toBe(false)
  const withContent = mount(IxChart, {
    slots: { default: () => [h('div', { class: 'custom' }), h('p', 'test')] },
  })
  wrappers.push(withContent)
  expect(withContent.get('.ix-chart-content').element.children).toHaveLength(2)
  expect(withContent.find('.custom').exists()).toBe(true)
})

it.each([
  ['Slot notice', true],
  ['   ', false],
  ['', false],
] as const)(
  'handles plain text slot content %j without leaving an empty overlay',
  (value, visible) => {
    const wrapper = mount(IxChart, { slots: { default: () => [createTextVNode(value)] } })
    wrappers.push(wrapper)
    expect(wrapper.find('.ix-chart-overlay').exists()).toBe(visible)
    if (visible) expect(wrapper.get('.ix-chart-content').text()).toBe(value)
  },
)

it('does not mask the chart for fragments or text nodes without children', () => {
  const wrapper = mount(IxChart, { slots: { default: () => [h(Fragment), h(Text)] } })
  wrappers.push(wrapper)
  expect(wrapper.find('.ix-chart-overlay').exists()).toBe(false)
  expect(wrapper.find('[data-chart]').exists()).toBe(true)
})
