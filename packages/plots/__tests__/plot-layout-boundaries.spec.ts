import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import type { EChartsType } from 'echarts/core'
import type { ChartProps } from '@idux/charts-core'
import { expect, it, vi } from 'vitest'
import {
  createPlotInteraction,
  legendSelectionConfig,
  restoreLegendSelection,
  usePlotSize,
} from '../shared/usePlotLayout'

it('measures visible plot refs, ignores stale observers and restores fallback size when disabled', async () => {
  const callbacks: Array<() => void> = []
  const disconnect = vi.fn()
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(callback: () => void) {
        callbacks.push(callback)
      }
      observe() {}
      disconnect = disconnect
    },
  )
  const active = ref(true)
  const autoResize = ref(true)
  const Child = defineComponent({ render: () => h('div') })
  let size!: ReturnType<typeof usePlotSize>
  const measured = vi.fn()
  const wrapper = mount(
    defineComponent({
      setup() {
        size = usePlotSize(
          () => active.value,
          () => autoResize.value,
          { width: 10, height: 20 },
          measured,
        )
        return () => h('section', active.value ? [h(Child, { ref: 'chart' })] : [])
      },
    }),
  )
  try {
    expect(size.size.value).toEqual({ width: 10, height: 20 })
    const element = wrapper.find('div').element
    Object.defineProperties(element, { clientWidth: { value: 400 }, clientHeight: { value: 200 } })
    callbacks[0]!()
    expect(size.size.value).toEqual({ width: 400, height: 200 })
    autoResize.value = false
    await nextTick()
    expect(disconnect).toHaveBeenCalledTimes(1)
    active.value = false
    await nextTick()
    callbacks[0]!()
    expect(size.size.value).toEqual({ width: 10, height: 20 })
    expect(size.element.value).toBeUndefined()
    expect(measured).toHaveBeenCalledWith(element)
  } finally {
    wrapper.unmount()
    vi.unstubAllGlobals()
  }
})

it('restores legend selection by ID and invalidates cached interactions when caller intent changes', () => {
  expect(legendSelectionConfig({ data: ['A', { name: 'B' }, {}] })).toMatchObject([
    { names: ['A', 'B', undefined] },
  ])
  const option: ChartProps = { legend: [{ id: 'second' }, { id: 'unknown' }, {}] }
  restoreLegendSelection(option, [{ id: 'first' }, { id: 'second', selected: { B: false } }])
  expect(option.legend).toEqual([{ id: 'second', selected: { B: false } }, { id: 'unknown' }, {}])
  const interaction = createPlotInteraction()
  const chart = {
    isDisposed: vi.fn(() => false),
    getOption: () => ({
      legend: { selected: { A: false } },
      series: [{ selectedMap: { A: true } }],
    }),
  }
  interaction.setChart(chart as unknown as EChartsType)
  expect(interaction.getChart()).toBe(chart)
  expect(interaction.read({ legend: {}, selection: {} })).toEqual({})
  expect(interaction.read({ legend: {}, selection: {} })).toMatchObject({
    legend: { selected: { A: false } },
    series: [{ selectedMap: { A: true } }],
  })
  expect(interaction.read({ legend: { names: ['B'] } })).toEqual({})
  chart.isDisposed.mockReturnValue(true)
  expect(interaction.read({ legend: { names: ['B'] } })).toEqual({})
})
