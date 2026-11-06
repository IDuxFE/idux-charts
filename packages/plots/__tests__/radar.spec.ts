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
    expect(createRadarOption({ clockwise: true, data: [[1, 2, 3, 4]] }).series).toMatchObject([
      { data: [[1, 4, 3, 2]] },
    ])
    expect(data[0]!.value).toEqual([1, 2, 3, 4])
    expect(indicator.map(item => item.name)).toEqual(['A', 'B', 'C', 'D'])
    expect(createRadarOption({ indicator, data }).series).toMatchObject([{ data }])
  })

  it('preserves zero measurements and handles empty inputs', () => {
    expect(createRadarOption({ clockwise: true }).radar).toMatchObject({ indicator: [] })
    expect(createRadarOption({ clockwise: true, data: [] }).series).toMatchObject([{ data: [] }])
    expect(
      createRadarOption({ clockwise: true, data: [{ value: [0, 0, 0] }] }).series,
    ).toMatchObject([{ data: [{ value: [0, 0, 0] }] }])
  })
})
