import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive } from 'vue'

vi.mock('vue-demi', async () => ({ ...(await vi.importActual<any>('vue')), isVue2: true }))
vi.mock('echarts/core', () => ({ init: vi.fn(), use: vi.fn() }))
vi.mock('../useResizeObserver', () => ({ useResizeObserver: vi.fn() }))

import { init } from 'echarts/core'

import { useChart } from '../useChart'

function setup(options: any, listeners = {}) {
  const events = new Map<string, Set<Function>>()
  const instance = {
    setOption: vi.fn(),
    dispose: vi.fn(),
    hideLoading: vi.fn(),
    showLoading: vi.fn(),
    on: vi.fn((name, handler) => {
      if (!events.has(name)) events.set(name, new Set())
      events.get(name)!.add(handler)
    }),
    off: vi.fn((name, handler) => events.get(name)?.delete(handler)),
  }
  vi.mocked(init).mockReturnValue(instance as any)
  const wrapper = mount(
    defineComponent({
      setup() {
        const { containerRef } = useChart(options, listeners)
        return () => h('div', { ref: containerRef })
      },
    }),
  )
  return {
    wrapper,
    instance,
    emit: (name: string) => [...(events.get(name) ?? [])].forEach(fn => fn()),
  }
}

describe('chart events', () => {
  it('forwards Vue 2 events and reserves ready for initialization', () => {
    const click = vi.fn()
    const ready = vi.fn()
    const once = vi.fn()
    const { wrapper, instance, emit } = setup({}, { click, ready, '~dblclick': once })
    emit('click')
    emit('dblclick')
    emit('dblclick')
    expect(click).toHaveBeenCalledTimes(1)
    expect(once).toHaveBeenCalledTimes(1)
    expect(ready).toHaveBeenCalledWith(instance)
    expect(instance.on.mock.calls.some(([name]) => name === 'ready')).toBe(false)
    wrapper.unmount()
  })

  it('replaces and removes handlers without rearming unchanged once handlers', async () => {
    const old = vi.fn()
    const replacement = vi.fn()
    const once = vi.fn()
    const options = reactive<any>({ onClick: old, onDblclickOnce: once })
    const { wrapper, emit } = setup(options)
    emit('dblclick')
    options.onClick = replacement
    await nextTick()
    emit('click')
    emit('dblclick')
    expect(old).not.toHaveBeenCalled()
    expect(replacement).toHaveBeenCalledTimes(1)
    expect(once).toHaveBeenCalledTimes(1)
    delete options.onClick
    await nextTick()
    emit('click')
    expect(replacement).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })
})
