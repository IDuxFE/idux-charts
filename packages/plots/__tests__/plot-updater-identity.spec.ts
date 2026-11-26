import { expect, it } from 'vitest'
import { createPlotUpdater } from '../shared/plotOptions'

it('merges scalar data updates but resets when switching to item identities', () => {
  const update = createPlotUpdater(true, true)
  const scalar = (data: number[]) => ({ series: [{ type: 'graph' as const, data }] })
  expect(update(scalar([1, 2]))?.setOptionOpts?.notMerge).toBe(true)
  expect(update(scalar([3, 4]))?.setOptionOpts?.notMerge).toBe(false)
  expect(
    update({ series: [{ type: 'graph', data: [{ id: 'a', value: 3 }] }] })?.setOptionOpts?.notMerge,
  ).toBe(true)
  expect(update({ series: [{ type: 'graph' }] })?.setOptionOpts?.notMerge).toBe(true)
  expect(update({ series: [{ type: 'graph' }] })?.setOptionOpts?.notMerge).toBe(false)
})

it.each([
  [{ series: [{ type: 'graph' as const }] }, { series: { type: 'graph' as const } }],
  [{ series: { type: 'graph' as const } }, { series: [{ type: 'graph' as const }] }],
])('resets native component snapshots when their container type changes', (before, after) => {
  const update = createPlotUpdater()
  update({ ...before, setOptionOpts: { notMerge: false } })
  expect(update({ ...after, setOptionOpts: { notMerge: false } })?.setOptionOpts?.notMerge).toBe(
    true,
  )
})
