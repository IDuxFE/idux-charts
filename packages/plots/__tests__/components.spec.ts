import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'

vi.mock('echarts/core', async () => ({
  ...(await vi.importActual<typeof import('echarts/core')>('echarts/core')),
  init: vi.fn(),
}))
vi.mock('../../core/composables/useResizeObserver', () => ({ useResizeObserver: vi.fn() }))
import { init } from 'echarts/core'
import { IxChart } from '../../core/components'
import Bar from '../bar/src/Bar'
import Line from '../line/src/Line'
import Pie from '../pie/src/Pie'

const instances: {
  setOption: ReturnType<typeof vi.fn>
  dispose: ReturnType<typeof vi.fn>
  showLoading: ReturnType<typeof vi.fn>
  hideLoading: ReturnType<typeof vi.fn>
  on: ReturnType<typeof vi.fn>
  off: ReturnType<typeof vi.fn>
}[] = []
const wrappers: ReturnType<typeof mount>[] = []
beforeEach(() => {
  instances.length = 0
  vi.mocked(init)
    .mockReset()
    .mockImplementation(() => {
      const instance = {
        setOption: vi.fn(),
        dispose: vi.fn(),
        showLoading: vi.fn(),
        hideLoading: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
      }
      instances.push(instance)
      return instance as unknown as ReturnType<typeof init>
    })
})
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

for (const [name, component] of [
  ['core', IxChart],
  ['bar', Bar],
  ['line', Line],
  ['pie', Pie],
] as const) {
  describe(`${name} attribute forwarding`, () => {
    it('reacts to attribute-only updates, removal and theme reinitialization', async () => {
      const attrs = reactive<Record<string, any>>({
        style: { height: '300px' },
        class: 'test-chart',
        loading: false,
        ...(name === 'core'
          ? { series: [{ type: 'bar', data: [1] }] }
          : { data: name === 'pie' ? [{ name: 'A', value: 1 }] : [1] }),
        title: { text: 'Before' },
      })
      const wrapper = mount(defineComponent({ setup: () => () => h(component, attrs) }))
      wrappers.push(wrapper)
      await nextTick()
      expect(wrapper.find('.test-chart').attributes('style')).toContain('height: 300px')
      expect(instances[0].setOption.mock.lastCall?.[0].title.text).toBe('Before')
      attrs.title = { text: 'After' }
      attrs.loading = { text: 'Waiting' }
      await nextTick()
      expect(instances[0].setOption.mock.lastCall?.[0].title.text).toBe('After')
      expect(instances[0].showLoading).toHaveBeenLastCalledWith({ text: 'Waiting' })
      attrs.loading = false
      await nextTick()
      expect(instances[0].hideLoading).toHaveBeenCalledTimes(2)
      const click = vi.fn()
      attrs.onClick = click
      await nextTick()
      const handler = instances[0].on.mock.lastCall?.[1]
      handler({ name: 'A' })
      expect(click).toHaveBeenCalledExactlyOnceWith({ name: 'A' })
      delete attrs.onClick
      await nextTick()
      expect(instances[0].off).toHaveBeenCalledWith('click', handler)
      attrs['init-option'] = { renderer: 'svg' }
      attrs['set-option-opts'] = { notMerge: true }
      await nextTick()
      expect(init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'seer', { renderer: 'svg' })
      expect(instances[1].setOption.mock.lastCall?.[1]).toEqual({ notMerge: true })
      delete attrs['init-option']
      await nextTick()
      attrs.theme = 'dark'
      await nextTick()
      expect(instances).toHaveLength(4)
      expect(instances[0].dispose).toHaveBeenCalledTimes(1)
      expect(instances[3].setOption.mock.lastCall?.[0].title.text).toBe('After')
      expect(init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'dark', undefined)
    })
  })
}
