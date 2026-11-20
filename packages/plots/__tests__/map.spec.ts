import { describe, expect, it } from 'vitest'
import { createMapOption, defaultMapPieces } from '../map'

describe('map options', () => {
  it.each(['status', 'density', 'lines'] as const)(
    'enables map navigation by default for %s',
    mode => {
      expect(createMapOption({ map: 'test', mode }).geo).toMatchObject({ roam: true })
      expect(createMapOption({ map: 'test', mode, roam: false }).geo).toMatchObject({ roam: false })
    },
  )

  it.each([
    {
      coords: [
        [0, 0],
        [100, 10],
      ],
      direction: { x: 0, y: 0, x2: 1, y2: 0 },
    },
    {
      coords: [
        [100, 10],
        [0, 0],
      ],
      direction: { x: 1, y: 0, x2: 0, y2: 0 },
    },
    {
      coords: [
        [10, -30],
        [12, 40],
      ],
      direction: { x: 0, y: 1, x2: 0, y2: 0 },
    },
    {
      coords: [
        [12, 40],
        [10, -30],
      ],
      direction: { x: 0, y: 0, x2: 0, y2: 1 },
    },
  ])('fades each route toward its destination: $coords', ({ coords, direction }) => {
    const lines = [
      {
        from: 'From',
        to: 'To',
        coords: coords as [[number, number], [number, number]],
        color: '#FF9141',
      },
    ]
    const original = JSON.stringify(lines)
    const option = createMapOption({ map: 'test', mode: 'lines', lines })
    expect(option.series).toMatchObject([
      {
        lineStyle: { type: [6, 4], opacity: 1 },
        emphasis: { lineStyle: { width: 3, opacity: 1, type: [6, 4] } },
        data: [
          {
            lineStyle: {
              color: {
                type: 'linear',
                ...direction,
                colorStops: [
                  { offset: 0, color: 'rgba(255,145,65,0.08)' },
                  { offset: 1, color: '#FF9141' },
                ],
              },
            },
            effect: { color: '#FF9141' },
          },
        ],
      },
      { type: 'scatter' },
    ])
    expect(JSON.stringify(lines)).toBe(original)
  })

  it('bows eastbound and westbound routes upward while preserving their gradient direction', () => {
    const option = createMapOption({
      map: 'world',
      mode: 'lines',
      lines: [
        {
          from: 'Frankfurt',
          to: 'Beijing',
          coords: [
            [8.68, 50.11],
            [116.46, 39.92],
          ],
        },
        {
          from: 'Japan',
          to: 'Beijing',
          coords: [
            [139.69, 35.69],
            [116.46, 39.92],
          ],
        },
      ],
    })
    expect(option.series).toMatchObject([
      {
        data: [
          {
            coords: [
              [8.68, 50.11],
              [116.46, 39.92],
            ],
            lineStyle: { curveness: 0.5, color: { x: 0, x2: 1 } },
          },
          {
            coords: [
              [139.69, 35.69],
              [116.46, 39.92],
            ],
            lineStyle: { curveness: -0.5, color: { x: 1, x2: 0 } },
          },
        ],
      },
      { type: 'scatter' },
    ])
  })

  it('renders flight nodes with white centers and colored rings while preserving pins', () => {
    const option = createMapOption({
      map: 'world',
      mode: 'lines',
      data: [
        { name: 'Node', coordinate: [10, 30], color: '#4083FF' },
        { name: 'Pin', coordinate: [20, 40], symbol: 'pin', color: '#10A879' },
        { name: 'Default node', coordinate: [30, 50], symbol: 'circle' },
      ],
    })
    expect(option.series).toMatchObject([
      {},
      {
        symbolSize: 10,
        itemStyle: { borderWidth: 4, opacity: 1 },
        emphasis: { scale: false },
        label: {
          color: '#6F7785',
          fontSize: 12,
          fontWeight: 'normal',
          lineHeight: 20,
          distance: 2,
        },
        data: [
          { itemStyle: { color: '#FFFFFF', borderColor: '#4083FF' } },
          {
            symbol: expect.stringContaining('image://data:image/svg+xml,'),
            symbolOffset: [0, '-50%'],
            label: { position: 'top', distance: 2 },
            itemStyle: { color: '#10A879' },
          },
          { symbolSize: 10, itemStyle: { color: '#FFFFFF', borderColor: '#006EFF' } },
        ],
      },
    ])
  })

  it('keeps regions and coordinate markers aligned without mutating caller data', () => {
    const data = [
      {
        name: 'Site',
        region: 'Province',
        value: 0,
        coordinate: [100, 30] as [number, number],
        color: '#FF9141',
      },
    ]
    const before = JSON.stringify(data)
    const option = createMapOption({ map: 'china', data })
    expect(option.geo).toMatchObject({
      map: 'china',
      regions: [{ name: 'Province', itemStyle: { areaColor: '#FF9141' } }],
    })
    expect(option.series).toMatchObject([
      {
        type: 'scatter',
        data: [{ name: 'Site', value: [100, 30, 0], itemStyle: { color: '#FF9141' } }],
      },
    ])
    expect(option.visualMap).toMatchObject({
      seriesIndex: [],
      pieces: [{ label: 'Site    0', color: '#FF9141' }],
    })
    expect(JSON.stringify(data)).toBe(before)
  })

  it('separates zero from missing values and assigns each count to exactly one density range', () => {
    for (const value of [0, 1, 200, 201, 400, 401, 600, 601, 800, 801, 1670]) {
      const matching = defaultMapPieces.filter(piece =>
        piece.value !== undefined
          ? piece.value === value
          : value >= (piece.min ?? -Infinity) && value <= (piece.max ?? Infinity),
      )
      expect(matching).toHaveLength(1)
    }
    const option = createMapOption({
      map: 'china',
      mode: 'density',
      data: [
        { name: 'Zero', value: 0 },
        { name: 'Missing', value: null },
      ],
    })
    expect(option.series).toMatchObject([
      {
        data: [
          { name: 'Zero', value: 0, emphasis: { itemStyle: { areaColor: '#bdd1ff' } } },
          { name: 'Missing', value: undefined },
        ],
      },
    ])
    expect(option.visualMap).toMatchObject({ seriesIndex: 0 })
  })

  it.each([undefined, null, NaN, 0, 12])(
    'only appends the tooltip unit to numeric values: %s',
    value => {
      const option = createMapOption({ map: 'world', mode: 'density', unit: '台' })
      const formatter = (option.tooltip as { formatter: (params: unknown) => string }).formatter
      const host = document.createElement('div')
      host.innerHTML = formatter({ name: 'Canada', value })
      const text = host.textContent ?? ''
      if (typeof value === 'number' && Number.isFinite(value)) {
        expect(text).toContain(`${value} 台`)
      } else {
        expect(text).toContain('-')
        expect(text).not.toContain('台')
      }
    },
  )

  it('replaces arrays and series while merging native geo and tooltip fields', () => {
    const series = [{ type: 'scatter' as const, data: [] }]
    const option = createMapOption({
      map: 'custom',
      mode: 'lines',
      series,
      geo: { roam: 'scale', layoutSize: '75%' },
      tooltip: { show: false },
    })
    expect(option.geo).toMatchObject({ map: 'custom', roam: 'scale', layoutSize: '75%' })
    expect(option.tooltip).toMatchObject({ show: false, confine: true })
    expect(option.series).toEqual(series)
    expect(option.series).not.toBe(series)
  })

  it('filters invalid coordinates without losing regions and creates metric tooltips safely', () => {
    const option = createMapOption({
      map: 'world',
      mode: 'lines',
      data: [{ name: 'Invalid', coordinate: [NaN, 10] }],
      lines: [
        {
          from: '<b>A</b>',
          to: 'B',
          coords: [
            [0, 0],
            [1, 1],
          ],
          metrics: [{ name: '<script>x</script>', value: 0, unit: 'ms' }],
        },
      ],
    })
    expect(option.series).toMatchObject([
      { type: 'lines', data: [{ name: '<b>A</b> – B' }] },
      { data: [] },
    ])
    const formatter = (option.tooltip as { formatter: (params: unknown) => string }).formatter
    const host = document.createElement('div')
    host.innerHTML = formatter({
      seriesType: 'lines',
      name: '<b>A</b> – B',
      data: { metrics: [{ name: '<script>x</script>', value: 0, unit: 'ms' }] },
    })
    expect(host.querySelector('b, script')).toBeNull()
    expect(host.textContent).toContain('0 ms')
    expect(formatter([])).toBe('')
    expect(createMapOption({ map: 'world', mode: 'lines' }).series).toMatchObject([
      { data: [] },
      { data: [] },
    ])
  })
})
