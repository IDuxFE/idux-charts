import { describe, expect, it } from 'vitest'
import { valueRatio } from '../shared/value'

describe('measurement normalization', () => {
  it('handles finite ranges whose subtraction overflows', () => {
    const max = Number.MAX_VALUE
    expect(valueRatio(0, -max, max)).toBe(0.5)
    expect(valueRatio(max / 2, -max, max)).toBe(0.75)
    expect(valueRatio(-max, -max, max)).toBe(0)
    expect(valueRatio(max, -max, max)).toBe(1)
  })
  it('clamps before subtraction and preserves very small valid ranges', () => {
    expect(valueRatio(Number.MAX_VALUE, -Number.MAX_VALUE, 0)).toBe(1)
    expect(valueRatio(0, 0, Number.MIN_VALUE)).toBe(0)
    expect(valueRatio(Number.MIN_VALUE, 0, Number.MIN_VALUE)).toBe(1)
  })
})
