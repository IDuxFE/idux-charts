import { describe, expect, it } from 'vitest'
import { getBarLinearColors, LinearDirection } from '../bar/src/getBarLinearColors'
import { useLinearGradient } from '../line/src/useLinearGradient'
import { useLineStyleColor } from '../line/src/useLineStyleColor'
import { getLineChartAreaStripeImgEl } from '../line/src/useLineChartAreaStripe'

describe('gradient and stripe helpers', () => {
  it.each([
    [LinearDirection.horizontal, [0, 0, 1, 0]],
    [LinearDirection.vertical, [0, 0, 0, 1]],
    [LinearDirection.reverseHorizontal, [1, 0, 0, 0]],
    [LinearDirection.reverseVertical, [0, 1, 0, 0]],
  ] as const)(
    'keeps the palette and gradient direction for preset %s',
    (direction, coordinates) => {
      const colors = getBarLinearColors(direction)
      expect(colors).toHaveLength(12)
      expect(colors.map(color => [color.x, color.y, color.x2, color.y2])).toEqual(
        Array.from({ length: 12 }, () => [...coordinates]),
      )
      expect(colors[0].colorStops).toEqual([
        { offset: 0, color: '#458FFF' },
        { offset: 1, color: '#8FBFFF' },
      ])
    },
  )

  it('accepts custom coordinates without sharing mutable palette entries across calls', () => {
    const config = { type: 'linear' as const, x: 0.2, y: 0.3, x2: 0.8, y2: 0.9 }
    const first = getBarLinearColors(config)
    expect(first[0]).toMatchObject(config)
    first[0].colorStops[0].color = 'red'
    expect(getBarLinearColors(config)[0].colorStops[0].color).toBe('#458FFF')
  })

  it('fades area colors downwards and line colors towards both edges', () => {
    expect(useLinearGradient('#ff0000')).toMatchObject({
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        { offset: 0, color: 'rgba(255, 0, 0, 0.3)' },
        { offset: 0.5, color: 'rgba(255, 0, 0, 0.2)' },
        { offset: 1, color: 'rgba(255, 0, 0, 0)' },
      ],
    })
    const line = useLineStyleColor('#ff0000')
    expect(line).toMatchObject({
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        { offset: 0, color: 'rgba(255, 0, 0, 0.1)' },
        { offset: 0.2, color: 'rgba(255, 0, 0, 0.9)' },
        { offset: 0.5, color: 'rgb(255, 0, 0)' },
        { offset: 0.8, color: 'rgba(255, 0, 0, 0.9)' },
        { offset: 1, color: 'rgba(255, 0, 0, 0.1)' },
      ],
    })
  })

  it('creates an encoded stripe SVG with caller dimensions and color', () => {
    const image = getLineChartAreaStripeImgEl({ width: 3, height: 120, color: '#ff0000' })
    const svg = decodeURIComponent(image.src.slice('data:image/svg+xml,'.length))
    expect(svg).toContain("width='6'")
    expect(svg).toContain("height='120'")
    expect(svg).toContain('rgba(255, 0, 0, 0.3)')
    expect(image.src).not.toContain('<svg')
  })
})

it('exports single gradients with default, preset and custom directions without shared state', async () => {
  const { getBarLinearColor, LinearDirection: Direction } = await import('../bar')
  expect(getBarLinearColor('red', 'blue')).toEqual({
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      { offset: 0, color: 'red' },
      { offset: 1, color: 'blue' },
    ],
  })
  for (const direction of [
    Direction.horizontal,
    Direction.vertical,
    Direction.reverseHorizontal,
    Direction.reverseVertical,
  ]) {
    expect(getBarLinearColor('#458FFF', '#8FBFFF', direction)).toEqual(
      getBarLinearColors(direction)[0],
    )
  }
  const config = { type: 'linear' as const, x: 0.1, y: 0.2, x2: 0.8, y2: 0.9, global: true }
  const gradient = getBarLinearColor('red', 'blue', config)
  expect(gradient).toMatchObject(config)
  gradient.colorStops[0].color = 'black'
  gradient.x = 5
  expect(getBarLinearColor('red', 'blue', config).colorStops[0].color).toBe('red')
  expect(config.x).toBe(0.1)
})
