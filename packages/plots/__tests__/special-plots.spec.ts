import { describe, expect, it } from 'vitest'
import type { CustomSeriesOption } from 'echarts/charts'
import { createGaugeOption } from '../gauge'
import { createLiquidFillOption } from '../liquid-fill'
import { createRadarOption } from '../radar'

function render(option: { series?: unknown }, width = 200, height = 200) {
  const series = (option.series as CustomSeriesOption[])[0]!
  const renderItem = series.renderItem!
  return renderItem(
    {} as Parameters<typeof renderItem>[0],
    {
      getWidth: () => width,
      getHeight: () => height,
    } as Parameters<typeof renderItem>[1],
  ) as any
}

describe('measurement charts', () => {
  for (const [name, create] of [
    ['gauge', createGaugeOption],
    ['liquid-fill', createLiquidFillOption],
  ] as const) {
    it(`${name}: distinguishes zero, missing and invalid ranges`, () => {
      expect(create({ value: 0 }).series).toHaveLength(1)
      for (const value of [undefined, null, NaN, Infinity])
        expect(create({ value }).series).toEqual([])
      expect(create({ value: 20, min: 100, max: 100 }).series).toEqual([])
      expect(create({ value: 20, min: 100, max: 0 }).series).toEqual([])
      expect(create({ value: 20, max: Infinity }).series).toEqual([])
    })
  }
  it('gauge includes threshold boundaries in the preceding segment and rejects invalid segments', () => {
    const segments = [
      { upper: 0.5, color: 'red', label: 'Low' },
      { upper: 1, color: 'green', label: 'High' },
    ]
    const tree = render(createGaugeOption({ value: 50, segments }))
    expect(tree.children.at(-1).style.text).toBe('Low')
    expect(render(createGaugeOption({ value: 51, segments })).children.at(-1).style.text).toBe(
      'High',
    )
    for (const invalid of [
      [segments[0]!],
      [...segments].reverse(),
      [{ upper: NaN, color: 'red' }],
    ]) {
      expect(createGaugeOption({ value: 50, segments: invalid }).series).toEqual([])
    }
  })
  it('clamps geometry while preserving the original measurement text', () => {
    const tree = render(createLiquidFillOption({ value: 150 }))
    expect(tree.children[2].children[0].type).toBe('circle')
    expect(tree.children[3].style.text).toBe('{value|150}{unit| %}')
    expect(render(createLiquidFillOption({ value: -10 })).children[2].children).toEqual([])
  })
  it('uses two clipped animated waves only for intermediate values', () => {
    const tree = render(createLiquidFillOption({ value: 50 }))
    expect(tree.children[2].clipPath.type).toBe('circle')
    expect(tree.children[2].children).toHaveLength(2)
    expect(tree.children[2].children[0].keyframeAnimation.loop).toBe(true)
    const still = render(createLiquidFillOption({ value: 50, waveAnimation: false }))
    expect(still.children[2].children[0].keyframeAnimation).toBeUndefined()
    expect(render(createLiquidFillOption({ value: 0 })).children[2].children).toEqual([])
  })
  it('keeps the gradient anchored while phase keyframes move the wave surface', () => {
    const tree = render(createLiquidFillOption({ value: 50 }))
    const wave = tree.children[2].children[1]
    expect(wave.style.fill).toMatchObject({ x: 0, y: 0, x2: 1, y2: 0 })
    const frames = wave.keyframeAnimation.keyframes
    expect(frames[4].shape.points.map((point: number[]) => point[0])).toEqual(
      frames[0].shape.points.map((point: number[]) => point[0]),
    )
    expect(frames[4].shape.points[0][1]).not.toBeCloseTo(frames[0].shape.points[0][1])
    frames[0].shape.points.forEach((point: number[], index: number) => {
      expect(frames.at(-1).shape.points[index][1]).toBeCloseTo(point[1]!)
    })
    expect(tree.children[0].shape.r).toBe(64)
    expect(render(createLiquidFillOption({ value: 50 }), 800, 600).children[0].shape.r).toBe(64)
    expect(
      render(createLiquidFillOption({ value: 50, radius: 88 }), 800, 600).children[0].shape.r,
    ).toBe(88)
    const zero = render(createLiquidFillOption({ value: 0, zeroColor: '#123456' }))
    expect(zero.children[1].style.fill.colorStops[1].color).toBe('rgb(18, 52, 86)')
  })
  it('keeps numeric typography for custom units and supports hiding the unit', () => {
    const percentage = render(createLiquidFillOption({ value: 48 })).children[3].style
    const capacity = render(createLiquidFillOption({ value: 48, max: 64, unit: 'GB' })).children[3]
      .style
    expect(capacity.text).toBe('{value|48}{unit| GB}')
    expect(capacity.rich).toEqual(percentage.rich)
    expect(render(createLiquidFillOption({ value: 48, unit: '' })).children[3].style.text).toBe(
      '{value|48}',
    )
  })
  it('recomputes geometry for the viewport and accepts non-percent formatting', () => {
    const option = createLiquidFillOption({
      value: 5,
      max: 10,
      valueFormatter: value => `${value} GB`,
    })
    expect(render(option, 300, 300).children[0].shape.r).toBeGreaterThan(
      render(option, 100, 100).children[0].shape.r,
    )
    expect(render(option).children[3].style.text).toBe('5 GB')
  })
  it('radar keeps indicator/data order and does not mutate input during dimension reduction', () => {
    const indicator = [
      { name: 'A', max: 25 },
      { name: 'B', max: 50 },
      { name: 'C', max: 10 },
    ]
    const data = [{ name: 'One', value: [10, 20, 5] }]
    const option = createRadarOption({ indicator, data, area: true })
    expect(option.radar).toMatchObject({ indicator })
    expect(option.series).toMatchObject([{ data, areaStyle: { opacity: 0.12 } }])
    expect(createRadarOption({ indicator: indicator.slice(0, 2), data: [] }).series).toMatchObject([
      { data: [] },
    ])
    expect(data[0]!.value).toEqual([10, 20, 5])
  })
})
