import { describe, expect, it } from 'vitest'
import type { CustomSeriesOption } from 'echarts/charts'
import { createGaugeOption } from '../gauge'
import type { GaugeChartProps } from '../gauge'

function render(props: GaugeChartProps, width = 162, height = 110) {
  const series = (createGaugeOption(props).series as CustomSeriesOption[])[0]!
  const renderItem = series.renderItem!
  return renderItem({} as never, { getWidth: () => width, getHeight: () => height } as never) as any
}
describe('gauge presentation', () => {
  it.each([
    {
      size: 'lg' as const,
      width: 162,
      height: 110,
      diameter: 150,
      thickness: 11,
      innerDiameter: 128,
      shadowInnerDiameter: 116,
      gradientDiameter: 100,
      sweep: 190,
    },
    {
      size: 'md' as const,
      width: 134,
      height: 90,
      diameter: 126,
      thickness: 7,
      innerDiameter: 112,
      shadowInnerDiameter: 104,
      gradientDiameter: 88,
      sweep: 210,
    },
  ])(
    'uses the specified $size dial geometry',
    ({
      size,
      width,
      height,
      diameter,
      thickness,
      innerDiameter,
      shadowInnerDiameter,
      gradientDiameter,
      sweep,
    }) => {
      const tree = render({ value: 72, size }, width, height)
      const shadow = tree.children[0].shape
      const track = tree.children[1].shape
      const progress = tree.children[2].shape
      expect(shadow.r * 2).toBe(width)
      expect(track.r * 2).toBe(diameter)
      expect(track.r0 * 2).toBe(innerDiameter)
      expect(shadow.r0 * 2).toBe(shadowInnerDiameter)
      expect(track.r - track.r0).toBe(thickness)
      expect(progress.r - progress.r0).toBe(thickness)
      expect(((track.endAngle - track.startAngle) * 180) / Math.PI).toBeCloseTo(sweep)
      expect((track.startAngle + track.endAngle) / 2).toBeCloseTo((270 * Math.PI) / 180)
      expect(progress.endAngle).toBeCloseTo(track.startAngle + (sweep * Math.PI * 0.72) / 180)
      expect(shadow.cy + shadow.r * Math.sin(track.endAngle)).toBeLessThanOrEqual(height + 1e-10)
      const points = tree.children.at(-3).shape.points
      const distance = ([x, y]: number[]) => Math.hypot(x - shadow.cx, y - shadow.cy)
      expect(distance(points[0]) * 2).toBeCloseTo(gradientDiameter)
      expect(distance(points[101])).toBeCloseTo(gradientDiameter / 2 + 6)
    },
  )
  it('keeps text sizing stable when changing dial size', () => {
    const large = render({ value: 72 })
    const medium = render({ value: 72, size: 'md' }, 134, 90)
    expect(large.children.at(-2).style.fontSize).toBe(32)
    expect(medium.children.at(-2).style.fontSize).toBe(32)
    expect(medium.children[0].shape.r).toBeLessThan(large.children[0].shape.r)
    expect(
      render({ value: 0, valueFormatter: () => '高危', label: '' }).children.at(-2).style,
    ).toMatchObject({ text: '高危', fontSize: 16 })
  })
  it('uses gradient bands and explicit typography and label colors', () => {
    const tree = render({
      value: 65,
      segments: [
        { upper: 0.65, color: '#4089FF', label: '充足' },
        { upper: 1, color: '#FF6B57' },
      ],
      valueFontSize: 24,
      valueFontFamily: 'serif',
      labelColor: '#666666',
    })
    expect(tree.children[2].style.fill.colorStops).toHaveLength(2)
    expect(tree.children.at(-3).style.stroke.colorStops).toHaveLength(2)
    expect(tree.children.at(-2).style).toMatchObject({ fontSize: 24, fontFamily: 'serif' })
    expect(tree.children.at(-1).style).toMatchObject({ text: '充足', fill: '#666666' })
  })
  it('clamps non-percent geometry but preserves the original value', () => {
    const full = render({ value: 64, max: 64 })
    const overflow = render({ value: 80, max: 64 })
    expect(overflow.children[2].shape).toEqual(full.children[2].shape)
    expect(overflow.children.at(-2).style.text).toBe('80')
    expect(render({ value: -10 }).children[2].shape).toEqual(render({ value: 0 }).children[2].shape)
  })
})
