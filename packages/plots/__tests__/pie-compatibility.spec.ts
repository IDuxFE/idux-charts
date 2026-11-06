import type { PieSeriesOption } from 'echarts/charts'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, shallowReactive, shallowRef } from 'vue'
import { expect, it } from 'vitest'
import { useDefaultPieOption } from '../pie/src/useDefaultPieOption'
import { PIE_CHART_TOKEN, usePieOption } from '../pie/src/usePieOption'
import type { PieChartProps } from '../pie/src/usePieOption'
import { usePieOption as usePieOption1_0 } from './fixtures/usePieOption1_0'
import type { PieChartProps as LegacyPieProps } from './fixtures/usePieOption1_0'

// Functions have separate identities in the frozen implementation; compare their
// output separately, while preserving every serializable option in the comparison.
const serializable = (option: unknown) => JSON.parse(JSON.stringify(option))

for (const [name, presentation] of [
  ['data only', {}],
  ['title and legend styling', { title: { textStyle: { color: 'red' } }, legend: { show: false } }],
  ['hidden title', { title: null }],
  ['palette and theme', { color: ['red', 'blue'], theme: 'dark' }],
  ['explicit native series', { series: [{ type: 'pie', radius: ['40%', '70%'] }] }],
  [
    'dataset',
    {
      dataset: {
        source: [
          ['A', 10],
          ['B', 20],
        ],
      },
    },
  ],
] as const) {
  it(`preserves 1.0.0 options and reactive updates for ${name}`, async () => {
    const props = shallowReactive<LegacyPieProps>({
      data: [{ name: 'A', value: 10 }],
      name: 'Total',
    })
    const attrs = shallowRef<LegacyPieProps>(presentation as LegacyPieProps)
    let current!: ReturnType<typeof useDefaultPieOption>
    let baseline!: ReturnType<typeof usePieOption1_0>
    const wrapper = mount(
      defineComponent({
        setup() {
          baseline = usePieOption1_0(props as PieSeriesOption, attrs)
          current = useDefaultPieOption(props, attrs, usePieOption(props as PieSeriesOption, attrs))
          return () => h('div')
        },
      }),
    )
    try {
      for (const value of [10, 0, 25]) {
        props.data = [{ name: 'A', value }]
        await nextTick()
        expect(current.automatic.value).toBe(false)
        expect(serializable(current.option.value)).toEqual(serializable(baseline.value))
        const params = { name: 'A', seriesName: 'Total', value, color: 'red' }
        expect((current.option.value.tooltip as any).formatter(params)).toEqual(
          (baseline.value.tooltip as any).formatter(params),
        )
      }
    } finally {
      wrapper.unmount()
    }
  })
}

it('preserves 1.0.0 injected defaults until new layout controls opt in', () => {
  const props = shallowReactive<LegacyPieProps & Pick<PieChartProps, 'align' | 'layoutMode'>>({
    data: [{ name: 'A', value: 10 }],
  })
  const attrs = shallowRef({})
  let current!: ReturnType<typeof useDefaultPieOption>
  let baseline!: ReturnType<typeof usePieOption1_0>
  const wrapper = mount(
    defineComponent({
      setup() {
        baseline = usePieOption1_0(props as PieSeriesOption, attrs)
        current = useDefaultPieOption(props, attrs, usePieOption(props as PieSeriesOption, attrs))
        return () => h('div')
      },
    }),
    {
      global: {
        provide: {
          [PIE_CHART_TOKEN as symbol]: { radius: ['70%', '80%'], title: { text: 'Preset' } },
        },
      },
    },
  )
  try {
    expect(current.automatic.value).toBe(false)
    expect(serializable(current.option.value)).toEqual(serializable(baseline.value))
    props.align = 'center'
    expect(current.automatic.value).toBe(true)
    props.layoutMode = 'native'
    expect(current.automatic.value).toBe(false)
    props.align = undefined
    props.layoutMode = 'auto'
    expect(current.automatic.value).toBe(true)
  } finally {
    wrapper.unmount()
  }
})
