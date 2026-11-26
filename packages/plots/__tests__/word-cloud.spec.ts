import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { color, init } from 'echarts/core'
import type { EChartsOption } from 'echarts'
import { createWordCloudOption, IxWordCloudChart } from '../word-cloud'
import type { WordCloudChartProps, WordCloudChartPublicProps } from '../word-cloud'
import type { ChartPublicProps } from '@idux/charts-core'
import { cloudExtent, cloudNodesCollide, cloudSize, layoutCloud } from '../word-cloud/src/layout'
import type { CloudNode } from '../word-cloud/src/layout'
import { createWordCloudSelection } from '../word-cloud/src/selection'
import { reserveMotion } from '../word-cloud/src/motion'

function render(
  props: WordCloudChartProps,
  check: (chart: ReturnType<typeof init>, data: any) => void,
  theme?: Parameters<typeof init>[1],
) {
  const chart = init(null, theme, { renderer: 'svg', ssr: true, width: 640, height: 360 })
  try {
    chart.setOption(createWordCloudOption({ ...props, animation: false }))
    chart.renderToSVGString()
    check(chart, (chart as any).getModel().getSeriesByIndex(0)?.getData())
  } finally {
    chart.dispose()
  }
}
const source = [
  { id: 'a', name: '数据分析', value: 100, eventId: 'business-a' },
  { id: 'b', name: '可视化', value: 60 },
  { id: 'c', name: '用户体验', value: 0 },
]

describe('word cloud', () => {
  it('retains native tooltip options in the public prop contract', () => {
    expectTypeOf<WordCloudChartPublicProps['tooltip']>().toEqualTypeOf<
      ChartPublicProps['tooltip']
    >()
    expectTypeOf<WordCloudChartPublicProps['color']>().toEqualTypeOf<EChartsOption['color']>()
    expectTypeOf<WordCloudChartPublicProps['title']>().toEqualTypeOf<ChartPublicProps['title']>()
  })
  it('exports the installable component and keeps caller data immutable', () => {
    expect(IxWordCloudChart.name).toBe('IxWordCloudChart')
    const frozen = structuredClone(source)
    const before = structuredClone(frozen)
    const option = createWordCloudOption({ data: frozen })
    expect(frozen).toEqual(before)
    expect((option.series as any[])[0]).toMatchObject({ type: 'graph', edges: [], roam: false })
  })
  it.each(['text', 'rect', 'circle'] as const)(
    'renders native nodes and scalar values (%s)',
    shape => {
      const formatter = vi.fn((params: any) => String(params.value))
      render({ shape, data: source, label: { formatter } }, (chart, data) => {
        expect(chart.renderToSVGString()).toContain('>100<')
        expect(chart.renderToSVGString()).not.toContain('NaN')
        expect(formatter).toHaveBeenCalledWith(
          expect.objectContaining({
            value: 100,
            data: expect.objectContaining({ eventId: 'business-a' }),
          }),
        )
        expect(data.getItemGraphicEl(0)).toBeDefined()
        expect(data.getItemLayout(0).every(Number.isFinite)).toBe(true)
        expect(data.getItemVisual(0, 'symbolSize')[0]).toBeGreaterThan(0)
      })
    },
  )
  it('defaults rectangular tags to a 2px radius and no selection border', () => {
    render(
      {
        shape: 'rect',
        selectedMode: 'single',
        data: [{ name: 'Rounded', value: 1 }],
      },
      (chart, data) => {
        expect(data.getItemVisual(0, 'symbol')).toContain('A2,2')
        const svg = chart.renderToSVGString()
        expect(svg).toMatch(/A[\d.]+ [\d.]+/)
        expect(data.getItemGraphicEl(0).childAt(0).states.select.style.lineWidth).toBe(0)
        chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
        chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 0 })
        expect(chart.renderToSVGString()).toMatch(/A[\d.]+ [\d.]+/)
      },
    )
  })
  it.each([0, 6])('allows overriding the default radius (%s) and selection border', radius => {
    render(
      {
        shape: 'rect',
        itemStyle: { borderRadius: radius },
        select: { itemStyle: { borderWidth: 3, borderColor: '#123456' } },
        data: [{ name: 'Custom', value: 1 }],
      },
      (_chart, data) => {
        expect(data.getItemVisual(0, 'symbol')).toEqual(
          radius
            ? expect.stringContaining(`A${radius},${radius}`)
            : expect.stringContaining('path://M0,0H'),
        )
        expect(data.getItemGraphicEl(0).childAt(0).states.select.style).toMatchObject({
          lineWidth: 3,
          stroke: '#123456',
        })
      },
    )
  })
  it.each([0, 2, 6])('keeps rectangular strokes uniform at radius %s', radius => {
    render(
      {
        shape: 'rect',
        symbolSize: [180, 40],
        itemStyle: { borderRadius: radius, borderWidth: 0.6 },
        data: [{ name: 'Wide rectangle', value: 1 }],
      },
      (chart, data) => {
        const path = data.getItemGraphicEl(0).childAt(0)
        const transform = path.getComputedTransform()
        expect(Math.hypot(transform[0], transform[1])).toBeCloseTo(
          Math.hypot(transform[2], transform[3]),
        )
        expect(path.style.lineWidth).toBe(0.6)
        expect(chart.renderToSVGString()).not.toContain('NaN')
      },
    )
  })
  it('defaults rect colors to translucent backgrounds and opaque white-text interaction states', () => {
    render(
      {
        shape: 'rect',
        selectedMode: 'single',
        categories: [{ name: 'Risk', itemStyle: { color: '#db4c35' } }],
        data: [{ name: 'A', value: 1, category: 'Risk' }],
      },
      (_chart, data) => {
        const path = data.getItemGraphicEl(0).childAt(0)
        expect(path.style).toMatchObject({ fill: '#db4c35', opacity: 0.15 })
        expect(path.getTextContent().style.opacity).toBe(1)
        // SSR has no interaction frame loop; apply native states directly.
        for (const state of ['emphasis', 'select'] as const) {
          path.useState(state)
          path.getTextContent().useState(state)
          expect(path.style).toMatchObject({ fill: '#db4c35', opacity: 1 })
          expect(path.getTextContent().style.fill).toBe('#fff')
          path.clearStates()
          path.getTextContent().clearStates()
        }
      },
    )
  })
  it('derives opaque legend colors and names from categories without manual legend data', () => {
    render(
      {
        shape: 'rect',
        legend: { bottom: 0 },
        categories: [{ name: 'Risk', itemStyle: { color: '#db4c35' } }],
        data: [{ name: 'A', value: 1, category: 'Risk' }],
      },
      (chart, data) => {
        const legendModel = (chart as any).getModel().getComponent('legend')
        expect(legendModel.getData().map((item: any) => item.get('name'))).toEqual(['Risk'])
        const icons: any[] = []
        ;(chart as any).getViewOfComponentModel(legendModel).group.traverse((el: any) => {
          if (el.style?.fill === '#db4c35') icons.push(el)
        })
        expect(icons.length).toBeGreaterThan(0)
        for (const icon of icons) expect(icon.style.opacity ?? 1).toBe(1)
        expect(data.getItemGraphicEl(0).childAt(0).style.opacity).toBe(0.15)
        chart.dispatchAction({ type: 'legendUnSelect', name: 'Risk' })
        expect(chart.renderToSVGString()).not.toContain('>A<')
      },
    )
  })
  it('preserves explicit rect opacity and interaction styles', () => {
    render(
      {
        shape: 'rect',
        itemStyle: { color: '#123456', opacity: 0.4 },
        emphasis: { itemStyle: { color: '#abcdef', opacity: 0.8 }, label: { color: '#000' } },
        select: { itemStyle: { opacity: 0.7 }, label: { color: '#111' } },
        data: [{ name: 'A', value: 1 }],
      },
      (_chart, data) => {
        const path = data.getItemGraphicEl(0).childAt(0)
        expect(path.style.opacity).toBe(0.4)
        expect(path.states.emphasis.style).toMatchObject({ fill: '#abcdef', opacity: 0.8 })
        expect(path.states.select.style.opacity).toBe(0.7)
        expect(path.getTextContent().states.emphasis.style.fill).toBe('#000')
        expect(path.getTextContent().states.select.style.fill).toBe('#111')
      },
    )
  })
  it('honors native dimensions, item overrides, categories and legend filtering', () => {
    render(
      {
        shape: 'rect',
        symbolSize: value => [Number(value) + 80, 40],
        categories: [
          { name: 'Risk', label: { color: '#ff0000' }, itemStyle: { color: '#ffeeee' } },
          { name: 'Safe' },
        ],
        legend: { data: ['Risk', 'Safe'] },
        data: [
          { name: 'A', value: 40, category: 'Risk', itemStyle: { color: '#123456' } },
          { name: 'B', value: 20, category: 'Safe' },
        ],
      },
      (chart, data) => {
        const path = data.getItemGraphicEl(0).childAt(0)
        expect(path.scaleX).toBe(path.scaleY)
        const bounds = path.getBoundingRect().clone()
        bounds.applyTransform(path.getLocalTransform())
        expect(bounds.width).toBeCloseTo(120)
        expect(bounds.height).toBeCloseTo(40)
        expect(data.getItemGraphicEl(0).childAt(0).getTextContent().style.fill).toBe('#ff0000')
        expect(data.getItemVisual(0, 'style').fill).toBe('#123456')
        chart.dispatchAction({ type: 'legendUnSelect', name: 'Risk' })
        expect(chart.renderToSVGString()).not.toContain('>A<')
        expect(chart.renderToSVGString()).toContain('>B<')
      },
    )
  })
  it('preserves layouts during native highlight and selection and resizes without invalid coordinates', () => {
    render(
      {
        data: source,
        selectedMode: 'multiple',
        emphasis: { label: { color: '#fff', backgroundColor: '#1f6bff', padding: [2, 4] } },
      },
      (chart, data) => {
        const before = source.map((_, index) => [...data.getItemLayout(index)])
        chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
        chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 1 })
        expect(source.map((_, index) => data.getItemLayout(index))).toEqual(before)
        chart.resize({ width: 280, height: 180 })
        expect(chart.renderToSVGString()).not.toContain('NaN')
        chart.resize({ width: 640, height: 360 })
        expect(source.map((_, index) => data.getItemLayout(index))).toEqual(before)
      },
    )
  })
  it('skips invalid weights without changing original indices and handles empty containers', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      render(
        {
          data: [
            { name: 'Invalid', value: NaN },
            { name: 'Valid', value: 1 },
          ],
        },
        (chart, data) => {
          expect(data.getItemGraphicEl(0)).toBeUndefined()
          expect(data.getRawIndex(1)).toBe(1)
          expect(chart.renderToSVGString()).toContain('Valid')
        },
      )
      expect(createWordCloudOption({ gap: -1 }).series).toEqual([])
      expect(
        createWordCloudOption({
          data: [
            { id: 'a', name: 'A', value: 1 },
            { id: 'a', name: 'B', value: 2 },
          ],
        }).series,
      ).toEqual([])
      render({ data: [] }, chart => expect(chart.renderToSVGString()).not.toContain('NaN'))
    } finally {
      warning.mockRestore()
    }
  })
  it('uses replacement series without validating cloud-only inputs', () => {
    const series = [{ type: 'graph' as const, data: [{ name: 'Custom', value: 1, x: 0, y: 0 }] }]
    expect(createWordCloudOption({ gap: -10, series }).series).toEqual(series)
  })
  it.each(['text', 'rect', 'circle'] as const)(
    'uses the shared tooltip markup and raw value formatting (%s)',
    shape => {
      const valueFormatter = vi.fn((value: unknown) => `${value} 次`)
      render(
        {
          shape,
          name: '词频',
          data: [{ name: '完整名称 <完整>', value: 0 }],
          label: { width: 24, overflow: 'truncate' },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#458FFF' },
                { offset: 1, color: '#8FBFFF' },
              ],
            },
          },
          tooltip: { valueFormatter, confine: true },
        },
        chart => {
          const option = chart.getOption() as any
          const model = (chart as any).getModel().getSeriesByIndex(0)
          const host = document.createElement('div')
          host.innerHTML = option.tooltip[0].formatter(model.getDataParams(0))
          expect(host.querySelector('.charts-tooltips-title')?.textContent).toBe('完整名称 <完整>')
          expect(host.querySelector('.charts-tooltips-item-name')?.textContent).toBe('词频')
          expect(host.querySelector('.charts-tooltips-item-value')?.textContent).toBe('0 次')
          expect(
            (host.querySelector('.charts-tooltips-item-border') as HTMLElement).style.background,
          ).toBe('rgb(69, 143, 255)')
          expect(host.querySelector('完整')).toBeNull()
          expect(valueFormatter).toHaveBeenCalledWith(0, 0)
          expect(option.tooltip[0].confine).toBe(true)
        },
      )
    },
  )
  it('preserves native caller tooltip formatters', () => {
    const formatter = vi.fn(() => 'Custom tooltip')
    const option = createWordCloudOption({ data: source, tooltip: { formatter } })
    expect((option.tooltip as any).formatter).toBe(formatter)
    expect(
      (createWordCloudOption({ data: source, tooltip: { formatter: '{b}: {c}' } }).tooltip as any)
        .formatter,
    ).toBe('{b}: {c}')
  })
  it('inherits native palette colors without painting text-node backgrounds', () => {
    render({ data: source, color: ['#123456'] }, (_chart, data) => {
      const path = data.getItemGraphicEl(0).childAt(0)
      expect(path.style.opacity).toBe(0)
      expect(path.getTextContent().style.fill).toBe('#123456')
      expect(path.getTextContent().style.opacity).toBeGreaterThanOrEqual(0.35)
      expect(path.getTextContent().style.opacity).toBeLessThanOrEqual(1)
    })
  })
  it('highlights text with the native color lift and restores its weighted opacity', () => {
    render({ data: source, color: ['#458fff'] }, (_chart, data) => {
      for (let index = 0; index < data.count(); index++) {
        const path = data.getItemGraphicEl(index).childAt(0)
        const text = path.getTextContent()
        const opacity = text.style.opacity
        text.useState('emphasis')
        expect(text.style).toMatchObject({ fill: color.lift('#458fff', -0.1), opacity: 1 })
        expect(path.style.opacity).toBe(0)
        text.clearStates()
        expect(text.style).toMatchObject({ fill: '#458fff', opacity })
      }
    })
  })
  it('preserves series, category and item text emphasis overrides', () => {
    render(
      {
        data: source.map((row, index) => ({
          ...row,
          category: index === 1 ? 0 : undefined,
          ...(index === 2 ? { emphasis: { label: { color: '#abcdef', opacity: 0.8 } } } : {}),
        })),
        emphasis: { label: { color: '#123456', opacity: 0.6 } },
        categories: [{ name: 'Category', emphasis: { label: { color: '#654321', opacity: 0.7 } } }],
      },
      (_chart, data) => {
        for (const [index, fill, opacity] of [
          [0, '#123456', 0.6],
          [1, '#654321', 0.7],
          [2, '#abcdef', 0.8],
        ] as const) {
          const text = data.getItemGraphicEl(index).childAt(0).getTextContent()
          text.useState('emphasis')
          expect(text.style).toMatchObject({ fill, opacity })
        }
      },
    )
  })
  it('keeps search label styles independent of hover without enabling selection', () => {
    const props: WordCloudChartProps = {
      data: source,
    }
    render(props, (chart, data) => {
      const layouts = source.map((_, index) => [...data.getItemLayout(index)])
      chart.setOption(
        createWordCloudOption({
          ...props,
          animation: false,
          data: source.map((row, index) => ({
            ...row,
            ...(index === 2
              ? { label: { color: '#fff', opacity: 1, backgroundColor: '#458fff' } }
              : {}),
          })),
        }),
        { notMerge: true },
      )
      const series = (chart as any).getModel().getSeriesByIndex(0)
      const updated = series.getData()
      expect(series.getSelectedDataIndices()).toEqual([])
      expect(source.map((_, index) => updated.getItemLayout(index))).toEqual(layouts)
      const text = updated.getItemGraphicEl(2).childAt(0).getTextContent()
      text.useState('emphasis')
      expect(text.style).toMatchObject({
        fill: color.lift('#fff', -0.1),
        backgroundColor: '#458fff',
        padding: [2, 4],
        borderRadius: 2,
        opacity: 1,
      })
      text.clearStates()
      expect(text.style).toMatchObject({ fill: '#fff', backgroundColor: '#458fff', opacity: 1 })
      chart.setOption(createWordCloudOption({ ...props, animation: false }), { notMerge: true })
      const restored = (chart as any).getModel().getSeriesByIndex(0).getData()
      expect(restored.getItemGraphicEl(2).childAt(0).getTextContent().style).toMatchObject({
        backgroundColor: 'transparent',
        padding: [2, 4],
        borderRadius: 2,
        opacity: 0.35,
      })
      expect(source.map((_, index) => restored.getItemLayout(index))).toEqual(layouts)
    })
  })
  it('maps text opacity to weights while preserving native overrides', () => {
    const read = (props: WordCloudChartProps) => {
      const result = new Map<string, number>()
      render(props, (_chart, data) => {
        for (let index = 0; index < data.count(); index++) {
          result.set(
            data.getId(index),
            data.getItemGraphicEl(index).childAt(0).getTextContent().style.opacity,
          )
        }
      })
      return result
    }
    const original = read({ data: source })
    expect(original.get('a')).toBe(1)
    expect(original.get('b')).toBeCloseTo(0.74)
    expect(original.get('c')).toBe(0.35)
    expect(read({ data: [...source].reverse() })).toEqual(original)
    expect([...read({ data: source.slice(1) }).values()]).toEqual([1, 0.35])
    for (const value of [0, 25]) {
      expect([...read({ data: source.map(row => ({ ...row, value })) }).values()]).toEqual([
        1, 1, 1,
      ])
    }
    expect([...read({ data: [source[0]!] }).values()]).toEqual([1])
    expect([...read({ data: source, label: { opacity: 1 } }).values()]).toEqual([1, 1, 1])
    expect([
      ...read({
        data: source.map((row, index) => ({
          ...row,
          category: 0,
          ...(index === 0 ? { label: { opacity: 0.9 } } : {}),
        })),
        label: { opacity: 1 },
        categories: [{ name: 'Category', label: { opacity: 0.6 } }],
      }).values(),
    ]).toEqual([0.9, 0.6, 0.6])
    for (const shape of ['rect', 'circle'] as const) {
      expect([...read({ data: source, shape }).values()]).toEqual([1, 1, 1])
    }
  })
  it.each(
    (['text', 'rect', 'circle'] as const).flatMap(shape =>
      [undefined, 'dark'].map(theme => ({ shape, theme })),
    ),
  )('uses the plot theme palette through native visuals ($shape, $theme)', ({ shape, theme }) => {
    render(
      {
        shape,
        data: source.map((row, index) => ({ ...row, category: index % 2 })),
        categories: [{ name: 'Risk' }, { name: 'Safe' }],
        plotTheme: { palette: ['#123456', '#abcdef'], color: '#ff0000' },
      },
      (_chart, data) => {
        expect(data.getItemVisual(0, 'style').fill).toBe('#123456')
        expect(data.getItemVisual(1, 'style').fill).toBe('#abcdef')
        if (shape === 'text') {
          const path = data.getItemGraphicEl(0).childAt(0)
          expect(path.style.opacity).toBe(0)
          expect(path.getTextContent().style.fill).toBe('#123456')
        }
      },
      theme,
    )
  })
  it('keeps native single-series coloring for uncategorized nodes', () => {
    render({ data: source, plotTheme: { palette: ['#123456', '#abcdef'] } }, (_chart, data) => {
      expect(source.map((_, index) => data.getItemVisual(index, 'style').fill)).toEqual([
        '#123456',
        '#123456',
        '#123456',
      ])
    })
  })
  it.each([
    [{ color: ['#345678'] }, '#345678'],
    [{ itemStyle: { color: '#456789' } }, '#456789'],
    [{ categories: [{ name: 'Risk', itemStyle: { color: '#56789a' } }] }, '#56789a'],
    [{ data: [{ name: 'A', value: 1, category: 0, itemStyle: { color: '#6789ab' } }] }, '#6789ab'],
  ] satisfies [Partial<WordCloudChartProps>, string][])(
    'preserves explicit colors over the plot theme palette (%j)',
    (overrides, expected) => {
      render(
        {
          shape: 'rect',
          plotTheme: { palette: ['#123456'] },
          categories: [{ name: 'Risk' }],
          data: [{ name: 'A', value: 1, category: 0 }],
          ...overrides,
        },
        (_chart, data) => expect(data.getItemVisual(0, 'style').fill).toBe(expected),
      )
    },
  )
  it('restores native item selection by id while honoring explicit caller changes', () => {
    const selection = createWordCloudSelection()
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 640, height: 360 })
    const apply = (data = source) => {
      const option = createWordCloudOption({ data, selectedMode: 'multiple', animation: false })
      selection.apply(option)
      chart.setOption(option, { notMerge: true })
      return (chart as any).getModel().getSeriesByIndex(0)
    }
    try {
      apply()
      selection.bind(chart)
      chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 1 })
      expect(apply().isSelected(1)).toBe(true)
      const changed = source.map(item => ({ ...item, selected: false }))
      expect(apply(changed).isSelected(1)).toBe(false)
    } finally {
      chart.dispose()
    }
  })
  it('does not affect unrelated graph series', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 640, height: 360 })
    try {
      chart.setOption({
        series: [
          {
            type: 'graph',
            data: [{ name: 'Native', value: 1, x: 10, y: 20 }],
            symbolSize: 18,
            label: { show: true, formatter: '{b}' },
          },
        ],
      })
      expect(chart.renderToSVGString()).toContain('Native')
      const data = (chart as any).getModel().getSeriesByIndex(0).getData()
      expect(data.getItemLayout(0)).toEqual([10, 20])
      expect(data.getItemVisual(0, 'symbolSize')).toBe(18)
    } finally {
      chart.dispose()
    }
  })
  it('measures native rich labels and reserves larger emphasis text', () => {
    render(
      {
        shape: 'rect',
        data: source,
        label: {
          formatter: '{word|{b}}',
          fontSize: 18,
          padding: [4, 8],
          rich: { word: { fontSize: 28, padding: [2, 4] } },
        },
        emphasis: { label: { fontSize: 32, padding: [8, 12] } },
      },
      (_chart, data) => {
        const boxes = source.map((_, index) => {
          const symbol = data.getItemGraphicEl(index).childAt(0)
          const label = symbol.getTextContent()
          const box = label.getBoundingRect().clone()
          box.applyTransform(label.getComputedTransform())
          expect(data.getItemVisual(index, 'symbolSize')[0]).toBeGreaterThanOrEqual(
            label.getBoundingRect().width,
          )
          return box
        })
        boxes.forEach((box, index) =>
          boxes.slice(index + 1).forEach(other => expect(box.intersect(other)).toBe(false)),
        )
      },
    )
  })
})

describe('cloud placement', () => {
  const node = (index: number, circle: boolean): CloudNode => ({
    index,
    id: String(index),
    value: index,
    body: { x: -20, y: -20, width: 40, height: 40 },
    bounds: { x: -20, y: -20, width: 40, height: 40 },
    labels: [],
    circle,
  })
  it.each([false, true])('is deterministic, bounded and collision-free (circle: %s)', circle => {
    const nodes = Array.from({ length: 30 }, (_, index) => node(index, circle))
    const frame = { x: 16, y: 16, width: 600, height: 320 }
    const placed = layoutCloud(nodes, frame, 8, 0)
    expect(placed).toHaveLength(30)
    expect(layoutCloud([...nodes].reverse(), frame, 8, 0)).toEqual(placed)
    placed.forEach((a, index) =>
      placed.slice(index + 1).forEach(b => expect(cloudNodesCollide(a, b, 8, 0)).toBe(false)),
    )
    expect(layoutCloud(nodes, { x: 0, y: 0, width: 10, height: 10 }, 8, 0)).toEqual([])
  })
  const rect = (x: number, y = 0) => ({
    ...node(0, false),
    rect: true,
    x,
    y,
    body: { x: -50, y: -25, width: 100, height: 50 },
    bounds: { x: -50, y: -25, width: 100, height: 50 },
    labels: [{ x: -20, y: -8, width: 40, height: 16 }],
  })
  it.each([0, 0.3])('keeps separated rectangles at least 8px apart (overlap %s)', overlap => {
    for (const gap of [0, 4, 8]) {
      expect(cloudNodesCollide(rect(0), rect(100), gap, overlap)).toBe(true)
      expect(cloudNodesCollide(rect(0), rect(107.99), gap, overlap)).toBe(true)
      expect(cloudNodesCollide(rect(0), rect(108), gap, overlap)).toBe(false)
      expect(cloudNodesCollide(rect(0), rect(0, 57.99), gap, overlap)).toBe(true)
      expect(cloudNodesCollide(rect(0), rect(0, 58), gap, overlap)).toBe(false)
    }
    expect(cloudNodesCollide(rect(0), rect(108), 24, overlap)).toBe(true)
    expect(cloudNodesCollide(rect(0), rect(124), 24, overlap)).toBe(false)
  })
  it('requires at least 6px intersection on both axes and caps background area', () => {
    for (const depth of [0.1, 1, 2, 5.99]) {
      expect(cloudNodesCollide(rect(0), rect(100 - depth), 0, 0.3)).toBe(true)
      expect(cloudNodesCollide(rect(0), rect(94, 50 - depth), 0, 0.3)).toBe(true)
    }
    expect(cloudNodesCollide(rect(0), rect(94), 0, 0.3)).toBe(false)
    expect(cloudNodesCollide(rect(0), rect(94, 44), 0, 0.3)).toBe(false)
    expect(cloudNodesCollide(rect(0), rect(80), 16, 0.2)).toBe(false)
    expect(cloudNodesCollide(rect(0), rect(80), 16, 0.19)).toBe(true)
    expect(cloudNodesCollide(rect(0), rect(94), 16, 0)).toBe(true)
  })
  it('allows backgrounds to cover labels when rectangle overlap is enabled', () => {
    const a = rect(0)
    const b = rect(80)
    a.labels = [{ x: 30, y: -8, width: 20, height: 16 }]
    expect(cloudNodesCollide(a, b, 0, 0.3)).toBe(false)
    expect(cloudNodesCollide(b, a, 0, 0.3)).toBe(false)
    expect(cloudNodesCollide(a, b, 0, 0)).toBe(true)
  })
  it('keeps overlap layout compact with motion while reserving viewport space', () => {
    const nodes = Array.from({ length: 11 }, (_, index) => ({
      ...rect(0),
      index,
      id: String(index),
      value: index,
    }))
    const frame = { x: 0, y: 0, width: 800, height: 500 }
    const still = layoutCloud(nodes, frame, 8, 0.12)
    const floating = layoutCloud(
      nodes.map(node => reserveMotion(node, 10, true)),
      frame,
      8,
      0.12,
    )
    expect(floating.map(node => [node.x, node.y])).toEqual(still.map(node => [node.x, node.y]))
    expect(
      floating.some((node, index) =>
        floating
          .slice(index + 1)
          .some(other => Math.abs(node.x - other.x) < 100 && Math.abs(node.y - other.y) < 50),
      ),
    ).toBe(true)
    for (const node of floating) {
      expect(node.body).toEqual(nodes[node.index]!.body)
      const bounds = node.viewportBounds!
      expect(node.x + bounds.x).toBeGreaterThanOrEqual(0)
      expect(node.y + bounds.y).toBeGreaterThanOrEqual(0)
      expect(node.x + bounds.x + bounds.width).toBeLessThanOrEqual(frame.width)
      expect(node.y + bounds.y + bounds.height).toBeLessThanOrEqual(frame.height)
    }
  })
  it.each([0, 0.3])(
    'places rect tags with actual spacing and overlap constraints (%s)',
    overlap => {
      const nodes = Array.from({ length: 20 }, (_, index) => ({
        ...rect(0),
        index,
        id: String(index),
        value: index,
      }))
      const frame = { x: 0, y: 0, width: 640, height: 400 }
      const placed = layoutCloud(nodes, frame, 0, overlap)
      expect(placed.length).toBeGreaterThan(5)
      expect(layoutCloud(nodes.slice().reverse(), frame, 0, overlap)).toEqual(placed)
      placed.forEach(a => {
        const partners = placed.filter(
          b => a !== b && Math.abs(a.x - b.x) < 100 && Math.abs(a.y - b.y) < 50,
        )
        expect(partners.length).toBeLessThanOrEqual(2)
      })
      let overlapping = 0
      placed.forEach((a, index) =>
        placed.slice(index + 1).forEach(b => {
          const dx = Math.abs(a.x - b.x)
          const dy = Math.abs(a.y - b.y)
          if (dx < 100 && dy < 50) {
            overlapping++
            expect(100 - dx).toBeGreaterThanOrEqual(6)
            expect(50 - dy).toBeGreaterThanOrEqual(6)
            expect((100 - dx) * (50 - dy)).toBeLessThanOrEqual(5000 * overlap)
          } else {
            expect(dx >= 108 || dy >= 58).toBe(true)
          }
        }),
      )
      if (overlap) expect(overlapping).toBeGreaterThan(0)
    },
  )
  it('maps weights and circular area, including zero and identical weights', () => {
    expect(cloudSize(0, 0, 0, [12, 48])).toBe(12)
    expect(cloudSize(1, 1, 1, [12, 48])).toBe(30)
    expect(cloudSize(50, 0, 100, [10, 30], true) ** 2).toBeCloseTo(500)
  })
  it('permits limited background overlap while protecting labels, including outside circle labels', () => {
    const base = node(0, false)
    base.body = { x: -50, y: -25, width: 100, height: 50 }
    base.labels = [{ x: -10, y: -5, width: 20, height: 10 }]
    const a = { ...base, x: 0, y: 0 }
    expect(cloudNodesCollide(a, { ...base, x: 80, y: 0 }, 0, 0.25)).toBe(false)
    expect(cloudNodesCollide(a, { ...base, x: 60, y: 0 }, 0, 0.25)).toBe(true)
    const circle = { ...node(0, true), labels: [{ x: -80, y: -50, width: 160, height: 10 }] }
    expect(cloudNodesCollide({ ...circle, x: 0, y: 0 }, { ...circle, x: 100, y: 0 }, 0, 0)).toBe(
      true,
    )
  })
})

describe('word cloud boundary regressions', () => {
  it('rejects sparse size ranges with an actionable diagnostic', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const sizeRange: [number, number] = [12, 48]
      Reflect.deleteProperty(sizeRange, 0)
      expect(createWordCloudOption({ sizeRange }).series).toEqual([])
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('sizeRange'))
    } finally {
      warn.mockRestore()
    }
  })

  it('normalizes large datasets without spreading weights into function arguments', () => {
    const values = Array.from({ length: 200_000 }, (_, value) => value)
    expect(cloudExtent(values)).toEqual([0, 199_999])
    expect(cloudExtent([])).toEqual([0, 0])
    expect(cloudExtent([10, 20, 0])).toEqual([0, 20])
  })

  it('bounds spatial indexing for huge finite gaps and geometry', () => {
    const node: CloudNode = {
      index: 0,
      id: 'a',
      value: 1,
      circle: false,
      body: { x: -20, y: -20, width: 40, height: 40 },
      bounds: { x: -20, y: -20, width: 40, height: 40 },
      labels: [],
    }
    const nodes = [node, { ...node, id: 'b', index: 1 }]
    const frame = { x: 0, y: 0, width: 640, height: 360 }
    expect(layoutCloud(nodes, frame, 1e100, 0)).toHaveLength(1)
    expect(layoutCloud(nodes, { ...frame, width: Infinity }, 4, 0)).toEqual([])
    expect(layoutCloud([{ ...node, bounds: { ...node.bounds, x: NaN } }], frame, 4, 0)).toEqual([])
    const huge = {
      ...node,
      body: { x: -1e6, y: -1e6, width: 2e6, height: 2e6 },
      bounds: { x: -1e6, y: -1e6, width: 2e6, height: 2e6 },
    }
    const placed = layoutCloud(
      [huge, { ...huge, id: 'b', index: 1 }],
      { x: 0, y: 0, width: 5e6, height: 5e6 },
      4,
      0,
    )
    expect(placed).toHaveLength(1)
    expect(placed[0]!.x).toBe(2.5e6)
  })
})

describe('word cloud native boundary contracts', () => {
  it('keeps generated IDs distinct from caller IDs and duplicate names', () => {
    const series = (
      createWordCloudOption({
        data: [
          { id: 'ix-word:Same:0', name: 'Explicit', value: 1 },
          { name: 'Same', value: 2 },
          { name: 'Same', value: 3 },
        ],
      }).series as any[]
    )[0]
    expect(series.data.map((row: any) => row.id)).toEqual([
      'ix-word:Same:0',
      'ix-word:Same:0:',
      'ix-word:Same:1',
    ])
  })

  it.each(['text', 'circle'] as const)(
    'diagnoses ignored overlap without discarding %s nodes',
    shape => {
      const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
      try {
        const series = (
          createWordCloudOption({ shape, overlap: 0.2, data: source }).series as any[]
        )[0]
        expect(series.__ixWordCloud.overlap).toBe(0)
        expect(series.data).toHaveLength(source.length)
        expect(warning).toHaveBeenCalledWith(expect.stringContaining('only applies to rect'))
      } finally {
        warning.mockRestore()
      }
    },
  )

  it('handles tooltip batches, malformed values and absent native colors', () => {
    const formatter = (createWordCloudOption({ data: source }).tooltip as any).formatter
    const item = { name: '<Word>', value: 0, dataIndex: 0 }
    expect(formatter([item])).toContain('&lt;Word&gt;')
    expect(formatter(item)).toContain('0')
    for (const params of [[], undefined, { ...item, value: NaN }, { ...item, value: '1' }])
      expect(formatter(params)).toBe('')
  })

  it.each(['text', 'rect', 'circle'] as const)(
    'uses dark default text and bubble colors (%s)',
    shape => {
      const series = (
        createWordCloudOption({ shape, darkMode: true, data: source }).series as any[]
      )[0]
      expect(series.data[0].label.color).toBe(shape === 'text' ? 'inherit' : '#E7EDF7')
      if (shape === 'circle') expect(series.itemStyle.color).toMatch(/^rgba\(/)
    },
  )

  it.each([0, -1, NaN, Infinity, [20, 0], [20, 30]].map(symbolSize => ({ symbolSize })))(
    'skips malformed circle sizes ($symbolSize) and deduplicates warnings on resize',
    ({ symbolSize }) => {
      const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const chart = init(document.createElement('div'), undefined, {
        renderer: 'svg',
        width: 640,
        height: 360,
      })
      try {
        chart.setOption(
          createWordCloudOption({
            animation: false,
            shape: 'circle',
            data: [
              { name: 'Invalid', value: 10, symbolSize },
              { name: 'Valid', value: 1 },
              { name: 'Also valid', value: 2 },
            ],
          }),
        )
        const data = (chart as any).getModel().getSeriesByIndex(0).getData()
        expect(data.getItemGraphicEl(0)).toBeUndefined()
        expect(data.getItemGraphicEl(1)).toBeDefined()
        const diagnostics = () =>
          warning.mock.calls.filter(([message]) => String(message).includes('invalid symbolSize'))
        expect(diagnostics()).toHaveLength(1)
        expect(diagnostics()[0]![0]).toContain('indices 0')
        chart.resize({ width: 500 })
        expect(diagnostics()).toHaveLength(1)
      } finally {
        chart.dispose()
        warning.mockRestore()
      }
    },
  )

  it('reserves visible text bounds even when an explicit symbol is smaller', () => {
    render(
      {
        data: [{ name: 'A long visible label', value: 1, symbolSize: 8 }],
        label: { fontSize: 24 },
      },
      (_chart, data) => {
        const path = data.getItemGraphicEl(0).childAt(0)
        expect(data.getItemVisual(0, 'symbolSize')[0]).toBeGreaterThan(8)
        expect(path.getTextContent().getBoundingRect().width).toBeGreaterThan(8)
      },
    )
  })

  it.each([false, true])(
    'supports hidden and empty labels without phantom geometry (hidden=%s)',
    hidden => {
      render(
        {
          shape: 'rect',
          data: source,
          label: hidden ? { show: false } : { formatter: () => '' },
          emphasis: { label: { show: false } },
        },
        (chart, data) => {
          expect(data.getItemLayout(0).every(Number.isFinite)).toBe(true)
          expect(chart.renderToSVGString()).not.toContain('NaN')
          expect(data.getItemGraphicEl(0)).toBeDefined()
        },
      )
    },
  )

  it.each([0, 6, [4, 12], [4, 8, 2], [4, 8, 2, 10]].map(padding => ({ padding })))(
    'measures native padding forms ($padding) and numeric symbol sizes',
    ({ padding }) => {
      render(
        { data: [{ name: 'Padded', value: 1 }], symbolSize: 12, label: { padding } },
        (chart, data) => {
          expect(chart.renderToSVGString()).toContain('Padded')
          expect(chart.renderToSVGString()).not.toContain('NaN')
          expect(data.getItemVisual(0, 'symbolSize').every((value: number) => value >= 12)).toBe(
            true,
          )
        },
      )
    },
  )
})

it.each([[], [0], [8]].map(padding => ({ padding })))(
  'hides non-finite geometry from unsupported native padding ($padding) without painting a hit target',
  ({ padding }) => {
    render(
      { data: [{ name: 'Unsupported padding', value: 1 }], symbolSize: 12, label: { padding } },
      (chart, data) => {
        expect(data.getItemGraphicEl(0)).toBeUndefined()
        expect(chart.renderToSVGString()).not.toContain('NaN')
        expect(chart.renderToSVGString()).not.toContain('Unsupported padding')
      },
    )
  },
)

it('handles a measurement cache overflow and recovers from an oversized cloud', () => {
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 640, height: 360 })
  try {
    chart.setOption(
      createWordCloudOption({
        animation: false,
        shape: 'rect',
        symbolSize: [1000, 1000],
        data: Array.from({ length: 1100 }, (_, index) => ({
          id: String(index),
          name: `Word ${index}`,
          value: 1,
        })),
      }),
    )
    const data = (chart as any).getModel().getSeriesByIndex(0).getData()
    expect(data.count()).toBe(1100)
    expect(data.getItemGraphicEl(0)).toBeUndefined()
    chart.setOption(
      createWordCloudOption({
        animation: false,
        shape: 'rect',
        symbolSize: [120, 30],
        data: [{ id: 'recovered', name: 'Recovered', value: 1 }],
      }),
    )
    expect(chart.renderToSVGString()).toContain('Recovered')
    expect(chart.renderToSVGString()).not.toContain('NaN')
  } finally {
    chart.dispose()
  }
})

it('clears saved selection when replacing generated series', () => {
  const selection = createWordCloudSelection()
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 640, height: 360 })
  const cloud = () =>
    createWordCloudOption({ data: source, selectedMode: 'multiple', animation: false })
  try {
    const initial = cloud()
    selection.apply(initial)
    chart.setOption(initial)
    selection.bind(chart)
    chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 0 })
    expect((selection.apply(cloud()).series as any[])[0].data[0].selected).toBe(true)
    selection.apply({ series: { type: 'graph', data: [] } })
    expect((selection.apply(cloud()).series as any[])[0].data[0].selected).toBeUndefined()
    selection.apply({})
  } finally {
    chart.dispose()
  }
})

it('preserves input order for equal-priority nodes with identical IDs', () => {
  const node: CloudNode = {
    id: 'same',
    index: 0,
    value: 1,
    circle: false,
    body: { x: -10, y: -10, width: 20, height: 20 },
    bounds: { x: -10, y: -10, width: 20, height: 20 },
    labels: [],
  }
  const placed = layoutCloud(
    [node, { ...node, index: 1 }],
    { x: 0, y: 0, width: 200, height: 200 },
    4,
    0,
  )
  expect(placed.map(item => item.index)).toEqual([0, 1])
  expect(cloudNodesCollide(placed[0]!, placed[1]!, 4, 0)).toBe(false)
})

it.each([
  {},
  { selected: [] },
  { selected: [{ seriesIndex: 0, dataType: 'edge', dataIndex: [0] }] },
])('clears node selection when the native event has no matching node indices (%j)', event => {
  const selection = createWordCloudSelection()
  const cloud = () => createWordCloudOption({ data: [{ id: 'a', name: 'Word', value: 1 }] })
  const initial = cloud()
  ;(initial.series as any[])[0].data[0].selected = true
  selection.apply(initial)
  const chart = { getOption: () => initial, dispatchAction: vi.fn(), on: vi.fn() }
  selection.bind(chart as any)
  expect(chart.dispatchAction).toHaveBeenCalledWith(
    { type: 'select', batch: [{ seriesIndex: 0, dataType: 'node', dataIndex: 0 }] },
    { silent: true },
  )
  chart.on.mock.calls[0]![1](event)
  expect((selection.apply(cloud()).series as any[])[0].data[0].selected).toBe(false)
})
