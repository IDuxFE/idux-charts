import { registerVisual } from 'echarts/core'
import { expect, it, vi } from 'vitest'
import { installBarShadow, withBarShadows } from '../bar/src/barShadow'
vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerVisual: vi.fn(),
}))

it('handles absent layouts/styles, transparent fills and selective shadow overrides', () => {
  expect(withBarShadows({})).toEqual({})
  expect(withBarShadows({ series: { type: 'line' } })).toMatchObject({ series: { type: 'line' } })
  expect(withBarShadows({ series: { type: 'bar' } })).toMatchObject({
    series: { itemStyle: { shadowBlur: -1 } },
  })
  installBarShadow()
  const calls = vi.mocked(registerVisual).mock.calls as unknown as Array<
    [number, { reset: (series: unknown) => void }]
  >
  const reset = calls.at(-1)![1].reset
  let style: object | undefined = undefined
  const items = [
    { fill: 'transparent', shadowColor: 'auto', shadowBlur: -1 },
    { fill: 'red', shadowColor: 'blue', shadowBlur: -1 },
    { fill: 'not-a-color', shadowColor: 'auto', shadowBlur: 8 },
    { fill: 'red', shadowColor: 'blue', shadowBlur: 4 },
  ]
  const data = {
    getVisual: () => style,
    each: (visit: (i: number) => void) => items.forEach((_, i) => visit(i)),
    getItemVisual: (i: number) => items[i],
    ensureUniqueItemVisual: (i: number) => items[i],
    getItemLayout: () => undefined,
  }
  reset({ getData: () => data })
  expect(items[0]!.shadowBlur).toBe(-1)
  style = { fill: 'transparent', shadowColor: 'auto', shadowBlur: -1 }
  reset({ getData: () => data })
  expect(items).toMatchObject([
    { shadowColor: undefined, shadowBlur: 0 },
    { shadowColor: 'blue', shadowBlur: 0 },
    { shadowColor: undefined, shadowBlur: 8 },
    { shadowColor: 'blue', shadowBlur: 4 },
  ])
})
