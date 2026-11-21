import { describe, expect, expectTypeOf, it } from 'vitest'
import { createMapOption, defaultMapPieces, type MapChartPublicProps } from '../map'
import { matchesMapPiece } from '../map/src/mapStyle'

describe('map options', () => {
  it('exposes native geo and series without business-specific fields', () => {
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('map')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('roam')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('mode')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('data')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('lines')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('pieces')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('showLabel')
    expectTypeOf<MapChartPublicProps>().not.toHaveProperty('layers')
    expectTypeOf<MapChartPublicProps>().toHaveProperty('series')
    expectTypeOf<MapChartPublicProps>().toHaveProperty('geo')
  })

  it('renders only a navigable base map when series are omitted', () => {
    const option = createMapOption({ geo: { map: 'test' } })
    expect(option.geo).toMatchObject({
      map: 'test',
      roam: true,
      regions: [],
      itemStyle: { shadowColor: '#BCD2E8', shadowBlur: 2, shadowOffsetY: 3 },
    })
    expect(option.series).toEqual([])
    expect(createMapOption({ geo: { map: 'test', roam: false } }).geo).toMatchObject({
      roam: false,
    })
  })

  it('assigns each nonnegative integer or fractional count to exactly one default range', () => {
    for (const value of [
      0, 0.1, 1, 200, 200.5, 201, 400, 400.5, 401, 600, 600.5, 601, 800, 800.5, 801, 1670,
    ]) {
      expect(defaultMapPieces.filter(piece => matchesMapPiece(value, piece))).toHaveLength(1)
    }
    expect(defaultMapPieces.some(piece => matchesMapPiece(-1, piece))).toBe(false)
  })

  it('applies theme typography and native ECharts 6 map bounds', () => {
    const option = createMapOption({
      geo: { map: 'test' },
      plotTheme: { fontFamily: 'Test Sans', palette: ['#123456', '#abcdef'] },
    })
    expect(option.textStyle).toMatchObject({ fontFamily: 'Test Sans' })
    expect(option.color).toEqual(['#123456', '#abcdef'])
    expect(option.geo).toMatchObject({
      left: '12%',
      right: '6%',
      top: 24,
      bottom: 24,
      preserveAspect: 'contain',
    })
    expect(option.geo).not.toHaveProperty('layoutCenter')
    expect(option.geo).not.toHaveProperty('layoutSize')
  })

  it('merges native geo and tooltip fields while replacing series without mutating inputs', () => {
    const series = [{ type: 'scatter' as const, data: [] }]
    const option = createMapOption({
      series,
      geo: { map: 'custom', roam: 'scale', layoutSize: '75%' },
      tooltip: { show: false },
    })
    expect(option.geo).toMatchObject({ map: 'custom', roam: 'scale', layoutSize: '75%' })
    expect(option.tooltip).toMatchObject({ show: false, confine: true })
    expect(option.series).toEqual(series)
    expect(option.series).not.toBe(series)
  })
})
