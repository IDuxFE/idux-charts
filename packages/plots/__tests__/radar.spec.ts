import { describe, expect, it } from 'vitest'
import { createRadarOption } from '../radar'

describe('radar clockwise layout', () => {
  it('keeps axis values aligned, preserves item styling and leaves inputs unchanged', () => {
    const indicator = ['A', 'B', 'C', 'D'].map(name => ({ name, max: 25 }))
    const data = [{ name: 'One', value: [1, 2, 3, 4], lineStyle: { width: 3 } }]
    const option = createRadarOption({ indicator, data, clockwise: true, center: ['50%', 145] })
    expect(option.radar).toMatchObject({
      indicator: [indicator[0], indicator[3], indicator[2], indicator[1]],
      center: ['50%', 145],
    })
    expect(option.series).toMatchObject([{ data: [{ ...data[0], value: [1, 4, 3, 2] }] }])
    expect(
      createRadarOption({ indicator, clockwise: true, data: [[1, 2, 3, 4]] }).series,
    ).toMatchObject([{ data: [[1, 4, 3, 2]] }])
    expect(data[0]!.value).toEqual([1, 2, 3, 4])
    expect(indicator.map(item => item.name)).toEqual(['A', 'B', 'C', 'D'])
    expect(createRadarOption({ indicator, data }).series).toMatchObject([{ data }])
  })

  it('preserves zero measurements and handles empty inputs', () => {
    expect(createRadarOption({ clockwise: true }).radar).toMatchObject({ indicator: [] })
    expect(createRadarOption({ clockwise: true, data: [] }).series).toEqual([])
    expect(createRadarOption({ clockwise: true, data: [[1, 2, 3]] }).series).toEqual([])
    expect(
      createRadarOption({
        indicator: ['A', 'B', 'C'].map(name => ({ name })),
        clockwise: true,
        data: [{ value: [0, 0, 0] }],
      }).series,
    ).toMatchObject([{ data: [{ value: [0, 0, 0] }] }])
  })
})

describe('radar default tooltip', () => {
  it.each([false, true])('matches indicator names and values with clockwise=%s', clockwise => {
    const option = createRadarOption({
      indicator: ['A', 'B', 'C'].map(name => ({ name })),
      clockwise,
    })
    const tooltip = option.tooltip as { formatter: (params: unknown) => string }
    const host = document.createElement('div')
    host.innerHTML = tooltip.formatter({
      name: 'Object',
      value: clockwise ? [0, 30, 20] : [0, 20, 30],
      color: '#458fff',
    })
    expect(host.querySelector('.charts-tooltips-title')?.textContent).toBe('Object')
    expect(
      [...host.querySelectorAll('.charts-tooltips-item')].map(row => [
        row.querySelector('.charts-tooltips-item-name')?.textContent,
        row.querySelector('.charts-tooltips-item-value')?.textContent,
      ]),
    ).toEqual(
      clockwise
        ? [
            ['A', '0'],
            ['C', '30'],
            ['B', '20'],
          ]
        : [
            ['A', '0'],
            ['B', '20'],
            ['C', '30'],
          ],
    )
    expect(
      (host.querySelector('.charts-tooltips-item-border') as HTMLElement).style.background,
    ).toBe('rgb(69, 143, 255)')
  })

  it('escapes text and handles absent measurements and empty callbacks', () => {
    const option = createRadarOption({ indicator: [{ name: '<b>Axis</b>' }, { name: 'Missing' }] })
    const tooltip = option.tooltip as { formatter: (params: unknown) => string }
    const host = document.createElement('div')
    host.innerHTML = tooltip.formatter([{ name: '<img src=x>', value: ['<script>'], color: 'red' }])
    expect(host.querySelector('img, script, b')).toBeNull()
    expect(host.querySelector('.charts-tooltips-title')?.textContent).toBe('<img src=x>')
    expect(
      [...host.querySelectorAll('.charts-tooltips-item-value')].map(el => el.textContent),
    ).toEqual(['<script>', '-'])
    expect(tooltip.formatter([])).toBe('')
    expect(tooltip.formatter({})).toBe('')
  })
})

it('uses the shared gradient marker color for radar tooltips', () => {
  const option = createRadarOption({ indicator: [{ name: 'A' }] })
  const tooltip = option.tooltip as { formatter: (params: unknown) => string }
  expect(
    tooltip.formatter({
      name: 'R',
      value: [1],
      color: {
        colorStops: [{ color: 'transparent' }, { color: 'red' }],
      },
    }),
  ).toContain('background: red')
})
