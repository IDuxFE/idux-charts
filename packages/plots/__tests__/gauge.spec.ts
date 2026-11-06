import { describe, expect, it } from 'vitest'
import type { CustomSeriesOption } from 'echarts/charts'
import { createGaugeOption } from '../gauge'
import type { GaugeChartProps } from '../gauge'

function render(props: GaugeChartProps, width = 180, height = 110) {
  const series = (createGaugeOption(props).series as CustomSeriesOption[])[0]!
  const renderItem = series.renderItem!
  return renderItem({} as never, { getWidth: () => width, getHeight: () => height } as never) as any
}
describe('gauge presentation', () => {
  it('keeps text sizing stable when changing dial size', () => {
    const large = render({ value: 72 })
    const medium = render({ value: 72, size: 'md' }, 144, 90)
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
