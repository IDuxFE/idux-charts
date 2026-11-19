import { mount } from '@vue/test-utils'
import { computed, defineComponent, h, shallowRef, nextTick } from 'vue'
import { expect, it, vi } from 'vitest'
import type { EChartsType } from 'echarts/core'
import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import { useCategoryLineOption } from '../line/src/useCategoryLineOption'
import { useBarOption } from '../bar/src/useBarOption'
import type { BarChartProps } from '../bar/src/useBarOption'

it('forwards category-line readiness and falls back when no ready listener is installed', async () => {
  const ready = vi.fn()
  let option!: ReturnType<typeof useCategoryLineOption>
  const attrs = shallowRef({ onReady: ready })
  const wrapper = mount(
    defineComponent({
      setup() {
        option = useCategoryLineOption(
          () => ({ props: { categories: ['A'], data: [1] }, attrs: attrs.value }),
          { attrs: {} },
        )
        const Child = defineComponent({ render: () => h('div') })
        return () => h(Child, { ref: 'chart' })
      },
    }),
  )
  try {
    await nextTick()
    const wheel = new WheelEvent('wheel', { deltaY: 100, cancelable: true })
    wrapper.element.dispatchEvent(wheel)
    expect(wheel.defaultPrevented).toBe(false)
    const chart = { isDisposed: () => false, getOption: () => ({}) } as unknown as EChartsType
    option.value!.onReady!(chart)
    expect(ready).toHaveBeenCalledExactlyOnceWith(chart)
    attrs.value = { onReady: undefined as never }
    expect(() => option.value!.onReady!(chart)).not.toThrow()
  } finally {
    wrapper.unmount()
  }
})

it('native bar stack labels read live selection and fall back before the chart model exists', () => {
  const attrs = shallowRef<BarChartProps>({ series: [{ name: 'A', data: [3], stack: 's' }] })
  let model: object | null = { legend: [{ selected: { A: false } }] }
  let option!: ReturnType<typeof useBarOption>
  const wrapper = mount(
    defineComponent({
      setup() {
        option = useBarOption(
          computed(() => ({})),
          attrs,
          () => ({ getOption: () => model }) as unknown as EChartsType,
        )
        return () => h('div')
      },
    }),
  )
  try {
    const bar = (option.value.series as any[])[0]
    const format = () =>
      bar.label.formatter({ dataIndex: 0 } as DefaultLabelFormatterCallbackParams)
    expect(format()).toBe('')
    model = null
    expect(format()).toBe('3')
  } finally {
    wrapper.unmount()
  }
})
