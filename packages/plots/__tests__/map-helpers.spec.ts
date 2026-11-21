import { describe, expect, expectTypeOf, it } from 'vitest'
import { init, registerMap, use } from 'echarts/core'
import { MapChart, ScatterChart, LinesChart } from 'echarts/charts'
import type { ScatterSeriesOption, LinesSeriesOption } from 'echarts/charts'
import { GeoComponent, VisualMapComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import {
  createMapOption,
  createMapPieces,
  getMapPieceColor,
  createMapNodes,
  createMapLines,
  createMapRegions,
  createMapVisualMap,
  defaultMapPieces,
  type MapNodeItem,
  type MapRouteItem,
  type MapChartPublicProps,
} from '../map'

const nodes: MapNodeItem[] = [
  { id: 'a', name: 'Same name', coordinate: [10, 10] },
  { id: 'b', name: 'Same name', coordinate: [20, 20] },
]
const tooltipText = (series: ScatterSeriesOption | LinesSeriesOption, datum: unknown) => {
  const formatter = (series.tooltip as { formatter: (param: unknown) => string }).formatter
  const host = document.createElement('div')
  host.innerHTML = formatter({ data: datum })
  return host
}

describe('native map configuration generators', () => {
  it('generates sorted native pieces from thresholds without mutating input', () => {
    const input = [
      { value: 0, color: '#FFE392' },
      { value: 700, color: '#8F1806' },
      { value: 500, color: '#DF4934' },
    ]
    const before = JSON.stringify(input)
    const pieces = createMapPieces(input, { zeroColor: '#CDD9E7' })
    expect(pieces).toEqual([
      { gt: 700, label: '>700', color: '#8F1806' },
      { gt: 500, lte: 700, label: '(500, 700]', color: '#DF4934' },
      { gt: 0, lte: 500, label: '(0, 500]', color: '#FFE392' },
      { value: 0, label: '0', color: '#CDD9E7' },
    ])
    expect(JSON.stringify(input)).toBe(before)
    for (const [value, color] of [
      [701, '#8F1806'],
      [700, '#DF4934'],
      [500.1, '#DF4934'],
      [500, '#FFE392'],
      [0.1, '#FFE392'],
      [0, '#CDD9E7'],
      [-1, '#F0F3F7'],
      [null, '#F0F3F7'],
      [NaN, '#F0F3F7'],
    ] as const)
      expect(getMapPieceColor(value, pieces)).toBe(color)
    expect(getMapPieceColor(0, createMapPieces(input))).toBe('#FFE392')
    expect(getMapPieceColor(undefined, pieces, '#123456')).toBe('#123456')
    expect(
      createMapRegions([{ region: 'A', value: 700 }], { pieces })[0]?.itemStyle?.areaColor,
    ).toBe('#DF4934')
  })

  it('handles fractional thresholds and rejects ambiguous boundaries', () => {
    expect(createMapPieces([])).toEqual([])
    const pieces = createMapPieces([
      { value: 0.5, color: '#abc' },
      { value: 0, color: '#def' },
    ])
    expect(pieces[1]).toMatchObject({ gt: 0, lte: 0.5, label: '(0, 0.5]' })
    expect(() =>
      createMapPieces([
        { value: 1, color: '' },
        { value: 1, color: '' },
      ]),
    ).toThrow('finite and unique')
    expect(() => createMapPieces([{ value: Infinity, color: '' }])).toThrow('finite and unique')
    const signed = createMapPieces(
      [
        { value: -10, color: '#abc' },
        { value: 0, color: '#def' },
      ],
      { zeroColor: '#123' },
    )
    expect(getMapPieceColor(0, signed)).toBe('#123')
    expect(getMapPieceColor(-1, signed)).toBe('#abc')
  })

  it('returns native series and accepts additional native series types in the public contract', () => {
    expectTypeOf(createMapNodes(nodes)).toEqualTypeOf<ScatterSeriesOption>()
    expectTypeOf(createMapLines([])).toEqualTypeOf<LinesSeriesOption>()
    expectTypeOf<{ id: string; name: string }>().not.toExtend<MapNodeItem>()
    expectTypeOf<{ source: string; target: string }>().toExtend<MapRouteItem>()
    expectTypeOf<{
      source: string
      target: string
      coords: [[number, number], [number, number]]
    }>().not.toExtend<MapRouteItem>()
    const raw = { type: 'effectScatter' as const, coordinateSystem: 'geo', data: [[5, 5]] }
    const input: MapChartPublicProps = {
      geo: { map: 'test' },
      series: [createMapNodes(nodes), raw],
    }
    expect(createMapOption(input).series).toMatchObject([{ type: 'scatter' }, raw])
  })

  it('preserves transparent gradients, dashed styles and upward arcs in both directions', () => {
    const series = createMapLines(
      [
        { source: 'a', target: 'b' },
        { source: 'b', target: 'a' },
      ],
      {
        nodes,
        animated: true,
        lineStyle: { curveness: 0.5, color: '#FF9141' },
      },
    )
    const gradient = {
      type: 'linear',
      colorStops: [
        { offset: 0, color: 'rgba(255,145,65,0.2)' },
        { offset: 1, color: '#FF9141' },
      ],
    }
    expect(series).toMatchObject({
      type: 'lines',
      coordinateSystem: 'geo',
      stateAnimation: { duration: 80 },
      effect: { show: true, period: 5, trailLength: 0.15, color: '#FF9141' },
      lineStyle: { width: 1, type: [3, 2] },
      emphasis: { lineStyle: { width: 2, type: [6, 4] } },
      data: [
        { lineStyle: { color: { ...gradient, x: 0, x2: 1 }, curveness: 0.5 } },
        { lineStyle: { color: { ...gradient, x: 1, x2: 0 }, curveness: -0.5 } },
      ],
    })
  })

  it('allows fixed curvature, solid lines, callbacks and explicit animation overrides', () => {
    const route: MapRouteItem = {
      from: 'A',
      to: 'B',
      coords: [
        [1, 2],
        [3, 4],
      ],
      color: '#123456',
    }
    expect(
      createMapLines([route], {
        gradient: false,
        curveDirection: 'fixed',
        animated: true,
        lineStyle: { curveness: -0.4, type: 'solid' },
        effect: { show: false },
      }),
    ).toMatchObject({
      effect: { show: false },
      lineStyle: { type: 'solid' },
      data: [{ lineStyle: { color: '#123456', curveness: -0.4 }, effect: { color: '#123456' } }],
    })
    const color = () => '#abcdef'
    const series = createMapLines(
      [
        {
          from: 'A',
          to: 'B',
          coords: [
            [1, 2],
            [3, 4],
          ],
        },
      ],
      { lineStyle: { color } },
    )
    expect(series.lineStyle?.color).toBe(color)
    expect(series.data).toMatchObject([{ lineStyle: { curveness: 0.2 } }])
    expect(createMapLines([]).effect).toMatchObject({ show: false })
  })

  it('does not mutate inputs and keeps regions independent from site data', () => {
    const input = [{ region: 'Province', name: 'Total', value: 99, color: '#FF0000' }]
    const before = JSON.stringify({ nodes, input })
    const series = [
      createMapLines([{ source: 'a', target: 'b' }], { nodes }),
      createMapNodes(nodes),
    ]
    const geo = { map: 'test', regions: createMapRegions(input) }
    const option = createMapOption({ geo, series })
    expect(option.geo).toMatchObject({
      regions: [{ name: 'Province', itemStyle: { areaColor: '#FF0000' } }],
    })
    expect(option.series).toMatchObject([
      {
        data: [
          {
            coords: [
              [10, 10],
              [20, 20],
            ],
          },
        ],
      },
      { data: [{ id: 'a' }, { id: 'b' }] },
    ])
    expect(JSON.stringify({ nodes, input })).toBe(before)
    expect(option.series).not.toBe(series)
  })

  it('rebuilds endpoints from current node coordinates and skips unresolved or invalid endpoints', () => {
    const moved = [{ ...nodes[0]!, coordinate: [30, 40] as [number, number] }, nodes[1]!]
    expect(createMapLines([{ source: 'a', target: 'b' }], { nodes: moved }).data).toMatchObject([
      {
        coords: [
          [30, 40],
          [20, 20],
        ],
      },
    ])
    const invalid = [{ ...nodes[0]!, coordinate: [NaN, 10] as [number, number] }]
    expect(createMapNodes(invalid).data).toEqual([])
    expect(
      createMapLines(
        [
          { source: 'a', target: 'missing' },
          { source: 'a', target: 'a' },
          {
            from: 'A',
            to: 'B',
            coords: [
              [1, 2],
              [3, 4],
            ],
          },
        ],
        { nodes: invalid },
      ).data,
    ).toMatchObject([
      {
        name: 'A – B',
        coords: [
          [1, 2],
          [3, 4],
        ],
      },
    ])
  })

  it('rejects ambiguous identities only in the data supplied to each generator', () => {
    expect(() => createMapNodes([nodes[0]!, nodes[0]!])).toThrow('Duplicate map node id')
    expect(() => createMapLines([], { nodes: [nodes[0]!, nodes[0]!] })).toThrow(
      'Duplicate map node id',
    )
    expect(() => createMapRegions([{ region: 'A' }, { region: 'A' }])).toThrow(
      'Duplicate map region',
    )
  })

  it('provides circle and pin defaults while preserving native styling and data colors', () => {
    expect(
      createMapNodes([{ ...nodes[0]!, symbol: 'pin', color: '#123456' }], {
        label: { show: false },
      }),
    ).toMatchObject({
      label: { show: false },
      data: [
        { symbol: expect.stringContaining('image://'), symbolSize: 28, symbolOffset: [0, '-50%'] },
      ],
    })
    expect(
      createMapNodes([{ ...nodes[0]!, symbol: 'circle' }], { symbol: 'pin' }).data,
    ).toMatchObject([{ symbol: 'circle', symbolSize: 12 }])
    expect(
      createMapNodes(nodes, {
        symbolSize: 22,
        symbol: 'diamond',
        label: { position: 'top' },
        itemStyle: { borderWidth: 4 },
      }),
    ).toMatchObject({
      symbolSize: 22,
      symbol: 'diamond',
      label: { position: 'top' },
      itemStyle: { borderWidth: 4 },
      data: [{ id: 'a' }, { id: 'b' }],
    })
  })

  it('calculates fractional classification and hover styles independently of native visualMap', () => {
    const regions = createMapRegions(
      [
        { region: 'A', value: 200.5 },
        { region: 'B', value: null },
      ],
      { pieces: defaultMapPieces },
    )
    expect(regions).toMatchObject([
      { itemStyle: { areaColor: '#98C6FF' }, emphasis: { itemStyle: { areaColor: '#7faeff' } } },
      { itemStyle: { areaColor: '#F0F3F7' } },
    ])
    expect(createMapVisualMap(defaultMapPieces, { right: 20 })).toMatchObject({
      type: 'piecewise',
      seriesIndex: [],
      pieces: defaultMapPieces,
      right: 20,
    })
    const visualMap = { type: 'continuous' as const, min: 0, max: 10 }
    expect(createMapOption({ geo: { map: 'test' }, visualMap }).visualMap).toEqual(visualMap)
  })

  it('uses explicit themes and allows native tooltip callbacks to override generated formatters', () => {
    const formatter = () => 'Custom tooltip'
    expect(
      createMapNodes(nodes, {
        tooltip: { formatter },
        plotTheme: { color: '#112233', secondaryTextColor: '#445566' },
      }),
    ).toMatchObject({
      itemStyle: { color: '#112233' },
      label: { color: '#445566', lineHeight: 20, fontWeight: 'normal' },
      tooltip: { formatter },
    })
    expect(createMapRegions([{ region: 'A' }], { tooltip: { formatter } })).toMatchObject([
      { tooltip: { formatter } },
    ])
  })

  it('escapes tooltip content, preserves zero, and formats missing metrics without units', () => {
    const series = createMapNodes([{ ...nodes[0]!, name: '<b>Display</b>', value: 0 }], {
      metricName: 'Assets',
      unit: '台',
    })
    const host = tooltipText(series, series.data![0])
    expect(host.querySelector('b')).toBeNull()
    expect(host.textContent).toContain('<b>Display</b>')
    expect(host.textContent).toContain('0 台')
    const metrics = createMapLines([
      {
        from: 'A',
        to: 'B',
        coords: [
          [1, 2],
          [3, 4],
        ],
        metrics: [{ name: 'Latency', value: null, unit: 'ms' }],
      },
    ])
    expect(tooltipText(metrics, metrics.data![0]).textContent).not.toContain('ms')
    expect(tooltipText(metrics, metrics.data![0]).textContent).toContain('A – B')
    const regions = createMapRegions([{ region: 'A', name: 'Total', value: 0 }], { unit: '台' })
    const formatter = regions[0]!.tooltip!.formatter as () => string
    host.innerHTML = formatter()
    expect(host.textContent).toContain('Total')
    expect(host.textContent).toContain('0 台')
  })

  it('renders generated regions, nodes and routes alongside a handwritten native series', () => {
    use([MapChart, ScatterChart, LinesChart, GeoComponent, VisualMapComponent, SVGRenderer])
    registerMap('native-test', {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'A' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [0, 0],
                [30, 0],
                [30, 30],
                [0, 30],
                [0, 0],
              ],
            ],
          },
        },
      ],
    })
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 400 })
    try {
      chart.setOption(
        createMapOption({
          animation: false,
          geo: {
            map: 'native-test',
            regions: createMapRegions([{ region: 'A', color: '#123456' }]),
          },
          series: [
            createMapNodes(nodes, { itemStyle: { color: '#654321' } }),
            createMapLines([{ source: 'a', target: 'b' }], {
              nodes,
              lineStyle: { color: '#abcdef' },
            }),
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'diamond',
              data: [[15, 15]],
              itemStyle: { color: '#fedcba' },
            },
          ],
        }),
      )
      const svg = chart.renderToSVGString()
      for (const color of ['#123456', '#654321', '#abcdef', '#fedcba']) expect(svg).toContain(color)
      expect(svg).toContain('<linearGradient')
      expect(svg).toContain('stop-opacity="0.2"')
    } finally {
      chart.dispose()
    }
  })
})
