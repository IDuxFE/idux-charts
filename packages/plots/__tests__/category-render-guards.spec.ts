import { registerProcessor } from 'echarts/core'
import { expect, it, vi } from 'vitest'
import { installCategoryLineInterpolation } from '../line/src/categoryLineInterpolation'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerProcessor: vi.fn(),
}))

it('leaves an interpolated series unchanged when its encoding has no Y dimension', () => {
  installCategoryLineInterpolation()
  const calls = vi.mocked(registerProcessor).mock.calls as unknown as Array<
    [number, { reset: (series: unknown) => void }]
  >
  const reset = calls.at(-1)![1].reset
  const setData = vi.fn()
  const mapDimension = vi.fn(() => undefined)
  reset({ option: { ixLineHasInterpolation: true }, getData: () => ({ mapDimension }), setData })
  expect(mapDimension).toHaveBeenCalledExactlyOnceWith('y')
  expect(setData).not.toHaveBeenCalled()
})
