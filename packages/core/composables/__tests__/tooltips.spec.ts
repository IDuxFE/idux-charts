import { describe, expect, it } from 'vitest'
import { getTooltipsColor, useTooltipsFormatter } from '../useTooltips'
import { useStripeBarSeries, useStripeBarTooltip } from '../useStripe'

describe('tooltip output', () => {
  it('renders the title, names, values and color markers in order', () => {
    const host = document.createElement('div')
    host.innerHTML = useTooltipsFormatter('Monday', [
      { name: 'Visits', value: 0, color: '#458fff' },
      { name: 'Sales', value: '12%' },
    ])
    expect(host.querySelector('.charts-tooltips-title')?.textContent).toBe('Monday')
    expect(
      [...host.querySelectorAll('.charts-tooltips-item-name')].map(el => el.textContent),
    ).toEqual(['Visits', 'Sales'])
    expect(
      [...host.querySelectorAll('.charts-tooltips-item-value')].map(el => el.textContent),
    ).toEqual(['0', '12%'])
    expect(
      (host.querySelector('.charts-tooltips-item-border') as HTMLElement).style.background,
    ).toBe('rgb(69, 143, 255)')
    expect(useTooltipsFormatter('Empty', [])).not.toContain('charts-tooltips-item-name')
  })

  it('excludes auxiliary stripe series from tooltip values', () => {
    const formatter = useStripeBarTooltip('次').formatter
    expect(formatter([])).toBe('')
    const html = formatter([
      { name: 'A', seriesName: 'Visits', value: 12, color: 'red' },
      { name: 'A', seriesName: '', value: 99, color: 'red' },
    ])
    expect(html).toContain('12 次')
    expect(html).not.toContain('99')
  })

  it('keeps stripe overlays silent and aligned with their data series', () => {
    const series = { name: 'Visits', data: [1, 2] }
    const result = useStripeBarSeries({
      series,
      color: 'red',
      offset: [2, 3],
      size: [4, 5],
      rotate: 30,
    })
    expect(result).toMatchObject([
      { type: 'bar', name: 'Visits', data: [1, 2] },
      {
        type: 'pictorialBar',
        silent: true,
        data: [1, 2],
        symbolOffset: [2, 3],
        symbolSize: [4, 5],
        symbolRotate: 30,
      },
    ])
    expect(series).toEqual({ name: 'Visits', data: [1, 2] })
  })
})

describe('gradient tooltip colors', () => {
  it.each([
    [['#8FBFFF', '#458FFF'], '#458FFF'],
    [['#458FFF', '#8FBFFF'], '#458FFF'],
    [['black', '#ffffff'], 'black'],
    [['rgb(100%,100%,100%)', '#888888'], '#888888'],
    [['hsl(0, 0%, 100%)', '#123'], '#123'],
    [['rgba(0,0,0,0)', '#458FFF'], '#458FFF'],
    [['rgba(0,0,0,0.2)', 'rgba(50,100,200,0.9)'], 'rgba(50,100,200,0.9)'],
    [['invalid', 'transparent'], ''],
    [[], ''],
  ])('selects a visible color from %j', (colors, expected) => {
    expect(getTooltipsColor({ colorStops: colors.map(color => ({ color })) })).toBe(expected)
  })
  it('preserves plain colors and handles missing values', () => {
    expect(getTooltipsColor('red')).toBe('red')
    expect(getTooltipsColor(null)).toBe('')
    expect(getTooltipsColor({})).toBe('')
  })
})
