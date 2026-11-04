import { expect, expectTypeOf, it } from 'vitest'
import { defineComponent } from 'vue'
import type { SlotsType, VNode } from 'vue'

import { withChartProps } from '../withChartProps'

it('adds configuration props while preserving inferred events, slots and setup bindings', () => {
  const Original = defineComponent({
    props: { label: String },
    emits: { change: (value: number) => Number.isFinite(value) },
    slots: Object as SlotsType<{ default: (props: { value: number }) => VNode[] }>,
    setup: () => ({ focus: () => 42 }),
  })
  const Chart = withChartProps<{ autoResize?: boolean; [key: string]: any }>()(Original)
  type Instance = InstanceType<typeof Chart>
  type OriginalInstance = InstanceType<typeof Original>

  expect(Chart).toBe(Original)
  expectTypeOf<Instance['$props']['autoResize']>().toEqualTypeOf<boolean | undefined>()
  expectTypeOf<Instance['$props']['label']>().toEqualTypeOf<string | undefined>()
  expectTypeOf<Instance['$props']['onChange']>().toEqualTypeOf<
    OriginalInstance['$props']['onChange']
  >()
  expectTypeOf<Instance['$emit']>().toEqualTypeOf<OriginalInstance['$emit']>()
  expectTypeOf<Instance['$slots']>().toEqualTypeOf<OriginalInstance['$slots']>()
  expectTypeOf<Instance['focus']>().toEqualTypeOf<OriginalInstance['focus']>()
  expectTypeOf<Parameters<Instance['$emit']>>().toEqualTypeOf<[event: 'change', value: number]>()
  expectTypeOf<Parameters<Instance['$slots']['default']>>().toEqualTypeOf<[{ value: number }]>()
})
