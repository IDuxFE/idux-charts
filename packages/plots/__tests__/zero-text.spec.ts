import { describe, expect, it } from 'vitest'
import { createCategoryBarOption } from '../bar/src/createCategoryBarOption'
import { createCategoryLineOption } from '../line/src/createCategoryLineOption'

for (const [name, create] of [
  ['bar', createCategoryBarOption],
  ['line', createCategoryLineOption],
] as const) {
  describe(`${name} zero text color`, () => {
    it('does not treat an empty dataset as all-zero measurements', () => {
      const { option } = create(
        { categories: ['A'], zeroText: 'No activity' },
        {},
        { series: [{ data: [] }] },
        600,
        {},
        false,
        () => undefined,
      )
      expect(option.graphic).toBeUndefined()
    })
    it.each([
      [false, undefined, '#A1A7B3'],
      [true, undefined, '#808999'],
      [false, '#123456', '#123456'],
      [true, '#123456', '#123456'],
    ] as const)('resolves dark=%s and override=%s', (dark, secondaryTextColor, fill) => {
      const { option } = create(
        { categories: ['A'], zeroText: 'No activity' },
        {},
        { series: [{ data: [0] }] },
        600,
        { secondaryTextColor },
        dark,
        () => undefined,
      )
      const graphic = option.graphic
      const elements = Array.isArray(graphic)
        ? graphic
        : graphic && 'elements' in graphic
          ? graphic.elements
          : undefined
      expect(elements).toMatchObject([{ style: { text: 'No activity', fill } }])
    })
  })
}
