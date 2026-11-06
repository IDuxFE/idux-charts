import { describe, expect, it } from 'vitest'
import type { CustomSeriesOption } from 'echarts/charts'
import { createGaugeOption } from '../gauge'
import { createLiquidFillOption } from '../liquid-fill'
import { createRadarOption } from '../radar'
import { mergePlotTheme } from '../shared/plotTheme'

function children(option: { series?: unknown }) {
  const series = (option.series as CustomSeriesOption[])[0]!
  return (
    series.renderItem!(
      {} as never,
      {
        getWidth: () => 300,
        getHeight: () => 300,
      } as never,
    ) as any
  ).children
}

it('merges theme fields without mutating inputs or retaining old palette entries', () => {
  const base = { palette: ['red', 'green'], textColor: 'black' }
  expect(mergePlotTheme(base, { palette: ['blue'], textColor: undefined })).toEqual({
    palette: ['blue'],
    textColor: 'black',
  })
  expect(base.palette).toEqual(['red', 'green'])
})

for (const [name, create] of [
  ['gauge', createGaugeOption],
  ['liquid', createLiquidFillOption],
] as const) {
  describe(`${name} text and theme`, () => {
    it('uses role styles above root styles and theme, with legacy explicit colors winning', () => {
      const plotTheme = { textColor: '#111111', fontFamily: 'Theme Font' }
      const tree = children(
        create({
          value: 50,
          plotTheme,
          textStyle: { fontSize: 20 },
          valueTextStyle: { fontSize: 28, color: '#222222' },
          labelTextStyle: { fontSize: 15, color: '#333333' },
        }),
      )
      expect(tree.at(-2).style).toMatchObject({
        fontSize: 28,
        fill: '#222222',
        fontFamily: 'Theme Font',
      })
      expect(tree.at(-1).style).toMatchObject({ fontSize: 15, fill: '#333333' })
      const explicit = children(
        create({
          value: 50,
          plotTheme,
          textColor: '#444444',
          valueTextStyle: { color: '#222222' },
        }),
      )
      expect(explicit.at(-2).style.fill).toBe('#444444')
    })
  })
}

it('styles liquid numbers and units independently', () => {
  const tree = children(
    createLiquidFillOption({
      value: 50,
      valueTextStyle: { fontSize: 26, fontFamily: 'Numbers' },
      unitTextStyle: { fontSize: 11, color: 'red' },
    }),
  )
  expect(tree.at(-2).style.rich.value).toMatchObject({ fontSize: 26, fontFamily: 'Numbers' })
  expect(tree.at(-2).style.rich.unit).toMatchObject({ fontSize: 11, fill: 'red' })
})

it('themes radar coordinates without replacing indicators or changing source data', () => {
  const indicator = [{ name: 'A', max: 100 }]
  const option = createRadarOption({
    indicator,
    plotTheme: {
      palette: ['red'],
      borderColor: 'blue',
      secondaryTextColor: 'white',
      splitAreaColor: 'black',
    },
  })
  expect(option.color).toEqual(['red'])
  expect(option.radar).toMatchObject({
    indicator,
    axisName: { color: 'white' },
    axisLine: { lineStyle: { color: 'blue' } },
    splitArea: { areaStyle: { color: ['black', 'transparent'] } },
  })
})

it('allows radar root typography to override theme without losing axis defaults', () => {
  expect(
    createRadarOption({
      plotTheme: { fontFamily: 'Theme', secondaryTextColor: 'red' },
      textStyle: { fontFamily: 'Local', fontSize: 18, color: 'blue' },
    }).radar,
  ).toMatchObject({ axisName: { fontFamily: 'Local', fontSize: 18, color: 'blue' } })
})
