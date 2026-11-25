import { describe, expect, it, vi } from 'vitest'
import { init } from 'echarts/core'
import type { CustomSeriesOption } from 'echarts/charts'
import { createBulletOption, IxBulletChart } from '../bullet'
import type { BulletChartProps } from '../bullet'
import { createPlotUpdater } from '../shared/plotOptions'
import { bindBulletHover } from '../bullet/src/bulletHover'
import { applyLegacyRangeLabels } from '../bullet/src/legacyRangeLabels'

const ranges = [
  { upper: 30, color: '#FF6B57' },
  { upper: 60, color: '#FFC343' },
  { upper: 100, color: '#18C894' },
]
function actualBar(chart: ReturnType<typeof init>, index = 0): any {
  return (chart as any).getModel().getSeriesByIndex(0).getData().getItemGraphicEl(index)
}

function rowElements(chart: ReturnType<typeof init>, index = 0): any[] {
  const model = (chart as any).getModel()
  const decorations = model.getSeriesByIndex(1).getData().getItemGraphicEl(index)?.children() ?? []
  const targets = (
    model.getSeriesByIndex(2).getData().getItemGraphicEl(index)?.children() ?? []
  ).filter((item: any) => item.name !== 'hatching')
  const bar = actualBar(chart, index)
  if (!bar) return [...decorations, ...targets]
  return [...decorations, { name: 'actual', shape: bar.shape, style: bar.style }, ...targets]
}

function children(props: BulletChartProps): any[] {
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 400, height: 200 })
  try {
    chart.setOption(
      createBulletOption({
        ...props,
        animation: false,
        grid: { top: 0, bottom: 0, left: 0, right: 0, containLabel: false },
      }),
    )
    chart.renderToSVGString()
    return rowElements(chart)
  } finally {
    chart.dispose()
  }
}

describe('bullet chart', () => {
  it('exports an installable component', () => {
    expect(IxBulletChart.name).toBe('IxBulletChart')
    expect(IxBulletChart.install).toBeTypeOf('function')
  })
  it('renders above labels and values through zoom, missing and zero states, and resize', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 600, height: 340 })
    const data = Array.from({ length: 50 }, (_, index) => ({
      name: `服务器终端（200.200.1.${index + 1}）`,
      value: index === 46 ? null : index === 47 ? 0 : 50,
      target: 80,
    }))
    const elements = (name: string) => {
      const data = (chart as any).getModel().getSeriesByIndex(1).getData()
      return Array.from({ length: data.count() }, (_, index) => {
        const bar = actualBar(chart, index)
        const custom = rowElements(chart, index)
        if (name === 'actual') return bar
        if (name === 'value-label')
          return bar?.getTextContent()
            ? bar
            : custom.find(item => item.name === 'value-label-anchor')
        return custom.find(item => item.name === name)
      }).filter(Boolean) as any[]
    }
    try {
      const option = createBulletOption({
        layout: 'horizontal-above',
        data,
        ranges,
        label: { formatter: params => `${params.value}%` },
        animation: false,
        dataZoom: { type: 'slider', yAxisIndex: 0, startValue: 0, endValue: 4 },
        xAxis: { max: 100 },
      })
      expect(option.yAxis).toMatchObject({ show: false })
      chart.setOption(option)
      let svg = chart.renderToSVGString()
      expect(svg).toContain('服务器终端（200.200.1.1）')
      expect(svg).not.toContain('服务器终端（200.200.1.6）')
      expect(elements('value-label')).toHaveLength(5)
      const label = elements('category-label')[0]!
      const track = elements('track-0')[0]!
      expect(label.style.x).toBe(track.shape.x)
      expect(label.style.y).toBe(track.shape.y - 2)
      const actual = elements('actual')[0]!
      const valueLabel = elements('value-label')[0]
      expect(valueLabel.shape).toMatchObject({ x: actual.shape.x, width: actual.shape.width })
      expect(valueLabel.textConfig).toMatchObject({ position: 'right', distance: 2 })
      expect(valueLabel.shape.x + valueLabel.shape.width).toBeLessThan(
        track.shape.x + track.shape.width,
      )
      chart.dispatchAction({ type: 'dataZoom', startValue: 45, endValue: 49 })
      svg = chart.renderToSVGString()
      expect(svg).toContain('服务器终端（200.200.1.50）')
      expect(svg).not.toContain('服务器终端（200.200.1.1）')
      expect(elements('value-label').map(item => item.getTextContent().style.text)).toEqual([
        '50%',
        '50%',
        '50%',
      ])
      expect(elements('missing')).toHaveLength(1)
      expect(svg).not.toContain('>–<')
      expect(elements('value-label-anchor')).toHaveLength(0)
      chart.resize({ width: 280, height: 340 })
      expect(chart.renderToSVGString()).not.toContain('NaN')
      expect(elements('category-label')[0].style.width).toBeLessThan(280)
      chart.setOption(
        createBulletOption({
          layout: 'horizontal-above',
          data: [{ name: 'Zero', value: 0, target: 80 }],
          animation: false,
        }),
        { notMerge: true },
      )
      chart.renderToSVGString()
      expect(elements('value-label')).toHaveLength(0)
      expect(elements('category-label')).toHaveLength(1)
      expect(elements('target')[0].style.opacity).toBe(1)
      expect(elements('track-0')[0].style.opacity).toBe(1)
      chart.setOption(
        createBulletOption({
          layout: 'horizontal-above',
          data: [{ name: 'Zero', value: 50, target: 80 }],
          animation: false,
        }),
      )
      chart.renderToSVGString()
      expect(elements('value-label')[0].getTextContent().style.text).toBe('50')
    } finally {
      chart.dispose()
    }
  })
  it('applies native label options and removes attached text when labels are disabled', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const source = { name: 'A', value: 50, target: 80 }
    const apply = (
      label?: BulletChartProps['label'],
      layout: BulletChartProps['layout'] = 'horizontal-above',
    ) => {
      chart.setOption(
        createBulletOption({
          data: [source],
          animation: false,
          layout,
          label: { formatter: params => `${params.value}%`, ...label },
          xAxis: { max: 100 },
        }),
        { notMerge: true },
      )
      return chart.renderToSVGString()
    }
    const anchor = () => {
      const bar = actualBar(chart)
      return bar?.getTextContent() && !bar.getTextContent().ignore ? bar : undefined
    }
    try {
      expect(apply()).toContain('50%')
      expect(apply({ show: false })).not.toContain('50%')
      expect(anchor()).toBeUndefined()
      expect(chart.renderToSVGString()).toContain('A<')
      expect(
        apply(
          {
            show: true,
            position: 'left',
            distance: 12,
            offset: [0, 5],
            color: '#ff0000',
            fontSize: 16,
            fontWeight: 'bold',
            formatter: '{a}/{b}/{c}',
          },
          'horizontal',
        ),
      ).toContain('实际值/A/50')
      const host = anchor()
      expect(host.textConfig).toMatchObject({ position: 'left', distance: 12, offset: [0, 5] })
      const text = host.getTextContent()
      const bounds = text.getBoundingRect().clone()
      bounds.applyTransform(text.getComputedTransform())
      expect(bounds.x + bounds.width).toBeCloseTo(host.shape.x - 12)
      expect(chart.renderToSVGString()).toContain('fill="#ff0000"')
      expect(chart.renderToSVGString()).toContain('font-size:16px')
      const formatter = vi.fn((params: { value: unknown }) => `Value: ${params.value}`)
      expect(apply({ formatter, position: 'top', rotate: 15 })).toContain('Value: 50')
      expect(formatter).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'A', value: 50, dataIndex: 0, data: source }),
      )
      expect(anchor().textConfig.rotation).toBeCloseTo(Math.PI / 12)
      const rich = apply({
        formatter: '{amount|{c}}',
        rich: { amount: { color: '#00ff00', fontSize: 20 } },
      })
      expect(rich).toContain('50<')
      expect(rich).toContain('fill="#00ff00"')
      expect(rich).toContain('font-size:20px')
    } finally {
      chart.dispose()
    }
  })
  it.each([false, true])(
    'preserves the existing hover hatching alongside native emphasis (disabled: %s)',
    disabled => {
      const chart = init(document.createElement('div'), undefined, {
        renderer: 'svg',
        width: 500,
        height: 280,
      })
      try {
        chart.setOption(
          createBulletOption({
            value: 75,
            target: 85,
            animation: false,
            emphasis: { disabled, itemStyle: { borderWidth: 2, borderColor: '#ff0000' } },
          }),
        )
        bindBulletHover(chart)
        const bar = actualBar(chart)
        expect(bar.style.decal).toBeUndefined()
        expect(!!bar.states.emphasis.style.decal).toBe(!disabled)
        expect(bar.states.emphasis.style).toMatchObject({ lineWidth: 2, stroke: '#ff0000' })
        if (!disabled) {
          bar.useState('emphasis')
          bar.update()
          const decal = bar.getDecalElement()
          expect(decal.getUpdatedPathProxy(true).data).toEqual(bar.getUpdatedPathProxy(true).data)
          bar.clearStates()
          bar.update()
          expect(bar.style.decal).toBeUndefined()
        }
      } finally {
        chart.dispose()
      }
    },
  )

  it('respects current series and data item emphasis settings when hovering tracks', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 280,
    })
    const props: BulletChartProps = {
      data: [
        { name: 'A', value: 50, target: 80 },
        { name: 'B', value: 60, target: 80, emphasis: { disabled: false } },
      ],
      emphasis: { disabled: true },
      animation: false,
    }
    try {
      chart.setOption(createBulletOption(props))
      bindBulletHover(chart)
      const hover = (type: 'mouseover' | 'mouseout', index: number) => {
        const track = (chart as any)
          .getModel()
          .getSeriesByIndex(1)
          .getData()
          .getItemGraphicEl(index)
          .children()
          .find((item: any) => item.name === 'track-0')
        chart.getZr().trigger(type, { target: track, topTarget: track })
      }
      hover('mouseover', 0)
      expect(actualBar(chart, 0).hoverState ?? 0).toBe(0)
      hover('mouseout', 0)
      hover('mouseover', 1)
      expect(actualBar(chart, 1).hoverState).toBe(2)
      hover('mouseout', 1)
      expect(actualBar(chart, 1).hoverState).toBe(0)
      props.emphasis = { disabled: false }
      chart.setOption(createBulletOption(props))
      hover('mouseover', 0)
      expect(actualBar(chart, 0).hoverState).toBe(2)
      hover('mouseout', 0)
      expect(actualBar(chart, 0).hoverState).toBe(0)
      props.emphasis = { disabled: true }
      chart.setOption(createBulletOption(props))
      hover('mouseover', 0)
      expect(actualBar(chart, 0).hoverState ?? 0).toBe(0)
      hover('mouseout', 0)
      expect(actualBar(chart, 0).hoverState ?? 0).toBe(0)
    } finally {
      chart.dispose()
    }
  })

  it('keeps native hover decals inside the animated bar, including rounded corners', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 80,
    })
    const update = createPlotUpdater(true)
    const apply = (value: number, animation: boolean) => {
      const { setOptionOpts, ...option } = update(
        createBulletOption({
          value,
          itemStyle: { borderRadius: 4 },
          animation,
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'linear',
          xAxis: { max: 100 },
        }),
      )!
      chart.setOption(option, setOptionOpts)
    }
    try {
      apply(48, false)
      const bar = actualBar(chart)
      bar.useState('emphasis')
      bar.update()
      expect(bar.getDecalElement().getUpdatedPathProxy(true).data).toEqual(
        bar.getUpdatedPathProxy(true).data,
      )
      expect(bar.shape.r).toBe(4)
      bar.clearStates()
      apply(75, true)
      bar.useState('emphasis')
      for (const time of [0.25, 0.5, 0.75, 1]) {
        bar.animators
          .find((animator: any) => animator.targetName === 'shape')
          .getClip()
          .onframe(time)
        bar.update()
        expect(bar.getDecalElement().getUpdatedPathProxy(true).data).toEqual(
          bar.getUpdatedPathProxy(true).data,
        )
      }
    } finally {
      chart.dispose()
    }
  })

  it('uses native bar labels, styles, states and markers without replacing series', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const labelLayout = vi.fn(() => ({ hideOverlap: true }))
    const color = vi.fn(() => '#8352cc')
    try {
      chart.setOption(
        createBulletOption({
          data: [
            { name: 'A', value: 50, target: 80 },
            {
              name: 'B',
              value: 70,
              itemStyle: { color: '#20ad87' },
              label: { formatter: 'Row {c}' },
            },
          ],
          animation: false,
          label: { show: true, formatter: '{b}: {c}' },
          labelLayout,
          itemStyle: { color, borderRadius: [0, 4, 4, 0], opacity: 0.8 },
          emphasis: {
            focus: 'self',
            itemStyle: { borderColor: '#ff0000', borderWidth: 2 },
            label: { formatter: 'Hover {c}' },
          },
          blur: { itemStyle: { opacity: 0.2 } },
          select: { itemStyle: { borderColor: '#00ff00', borderWidth: 3 } },
          selectedMode: 'single',
          markLine: {
            symbol: 'none',
            label: { formatter: 'Benchmark {c}' },
            data: [{ xAxis: 80 }],
          },
          markPoint: { data: [{ name: 'A', coord: [50, 'A'], value: 50 }] },
          markArea: { data: [[{ xAxis: 20 }, { xAxis: 30 }]] },
        }),
      )
      const svg = chart.renderToSVGString()
      expect((chart as any).getModel().getSeriesByIndex(0).subType).toBe('bar')
      expect(svg).toContain('A: 50')
      expect(svg).toContain('Row 70')
      expect(svg).toContain('Benchmark 80')
      expect(labelLayout).toHaveBeenCalled()
      expect(color).toHaveBeenCalledWith(expect.objectContaining({ value: 50, name: 'A' }))
      expect(actualBar(chart).style).toMatchObject({ fill: '#8352cc', opacity: 0.8 })
      expect(actualBar(chart).shape.r).toEqual([0, 4, 4, 0])
      expect(actualBar(chart, 1).style.fill).toBe('#20ad87')
      expect(actualBar(chart).states.emphasis.style).toMatchObject({
        stroke: '#ff0000',
        lineWidth: 2,
      })
      expect(actualBar(chart).states.blur.style).toMatchObject({ opacity: 0.2 })
      expect(actualBar(chart).states.select.style).toMatchObject({
        stroke: '#00ff00',
        lineWidth: 3,
      })
      chart.dispatchAction({ type: 'select', seriesId: 'bullet', dataIndex: 1 })
      expect((chart as any).getModel().getSeriesByIndex(0).isSelected(1)).toBe(true)
      chart.dispatchAction({ type: 'unselect', seriesId: 'bullet', dataIndex: 1 })
      expect((chart as any).getModel().getSeriesByIndex(0).isSelected(1)).toBe(false)
      const target = rowElements(chart).find(item => item.name === 'target')
      expect(target.z).toBeGreaterThan(actualBar(chart).z)
    } finally {
      chart.dispose()
    }
  })

  it('clears native label, style and marker overrides when returning to defaults', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const update = createPlotUpdater(true)
    const apply = (props: BulletChartProps) => {
      const { setOptionOpts, ...option } = update(
        createBulletOption({ value: 50, target: 80, animation: false, ...props }),
      )!
      chart.setOption(option, setOptionOpts)
      return chart.renderToSVGString()
    }
    try {
      expect(
        apply({
          label: { show: true, formatter: 'Custom {c}' },
          itemStyle: { color: '#abcdef', borderRadius: 4 },
          markLine: { data: [{ xAxis: 60 }] },
        }),
      ).toContain('Custom 50')
      const svg = apply({})
      expect(svg).not.toContain('Custom 50')
      expect(svg).not.toContain('#abcdef')
      expect(actualBar(chart).shape.r).toBe(0)
      expect((chart as any).getModel().getSeriesByIndex(0).get('markLine')).toEqual([])
    } finally {
      chart.dispose()
    }
  })

  it('renders the actual bar inside a doubled track and a 1.5x target line', () => {
    const tree = children({ value: 75, target: 85 })
    expect(tree[0].shape).toMatchObject({ x: 0, y: 92, width: 400, height: 16 })
    expect(tree[1].shape).toMatchObject({ x: 0, y: 96, width: 300, height: 8 })
    expect(tree.at(-1).shape).toMatchObject({ x: 339.5, y: 94, width: 1, height: 12 })
  })
  it('uses independent interval colors with inclusive upper boundaries', () => {
    const tree = children({ value: 60, target: 85, ranges })
    expect(tree.slice(0, 3).map(item => item.shape.width)).toEqual([120, 120, 160])
    expect(tree[3].style.fill).toBe('#FFC343')
    expect(tree.at(-1).style.fill).toBe('#18C894')
    expect(children({ value: 60, ranges, itemStyle: { color: 'red' } })[3].style.fill).toBe('red')
  })
  it('keeps a 1px minimum for tiny nonzero values and clamps overflow', () => {
    expect(children({ value: 1, target: 10000, xAxis: { max: 10000 } })[1].shape.width).toBe(1)
    expect(children({ value: 150, target: 200, xAxis: { max: 100 } })[1].shape.width).toBe(400)
    expect(children({ value: -100, xAxis: { min: -100, max: 100 } })[1].shape).toMatchObject({
      x: 200,
      width: -200,
    })
    expect(children({ value: NaN, target: Infinity })).toEqual([])
  })
  it('distinguishes all-zero single and grouped states from missing values', () => {
    const single = children({ value: 0, target: 85 })
    expect(single.find(item => item.name === 'actual').shape.width).toBe(0)
    expect(single.some(item => item.name === 'empty-label')).toBe(false)
    expect(children({ value: 0, zeroText: '' }).some(item => item.name === 'empty-label')).toBe(
      false,
    )
    expect(
      children({ value: 0, zeroText: 'No activity' }).find(item => item.name === 'empty-label')
        .style.text,
    ).toBe('No activity')
    expect(
      children({ value: null, target: 85, zeroText: 'No activity' }).map(item => item.name),
    ).toEqual(['track-0', 'target'])
    expect(children({ value: null })).toEqual([])
    const props = {
      data: [
        { name: 'A', value: 0, target: 80 },
        { name: 'B', value: 0 },
      ],
      ranges,
    }
    expect(
      children(props)
        .filter(item => item.type === 'rect')
        .every(item => item.shape.width === 0 || item.style.opacity === 0),
    ).toBe(true)
    expect(createBulletOption(props).graphic).toMatchObject([{ style: { text: '' } }])
    expect(createBulletOption({ ...props, zeroText: 'No activity' }).graphic).toMatchObject([
      { style: { text: 'No activity' } },
    ])
    expect(createBulletOption({ ...props, zeroText: '' }).graphic).toMatchObject([
      { style: { text: '' } },
    ])
    expect(createBulletOption({ data: [{ name: 'A', value: null }] }).graphic).toMatchObject([
      { style: { text: '' } },
    ])
  })
  it.each([
    [{ barWidth: '20%' }, 40],
    [{ barWidth: '10%', barMinWidth: '20%' }, 40],
    [{ barWidth: '50%', barMaxWidth: '15%' }, 30],
  ] as const)('uses native width options %j for bars, tracks and targets', (width, expected) => {
    const tree = children({ data: [{ name: 'A', value: 50, target: 80 }], ...width })
    expect(tree.find(item => item.name === 'actual').shape.height).toBeCloseTo(expected)
    expect(tree.find(item => item.name === 'track-0').shape.height).toBeCloseTo(expected * 2)
    expect(tree.find(item => item.name === 'target').shape.height).toBeCloseTo(expected * 1.5)
  })

  it('uses the native palette and native item styles without a color shortcut', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 400, height: 200 })
    const palette = ['#8352cc', '#20ad87']
    try {
      const option = createBulletOption({
        data: [
          { name: 'A', value: 50 },
          { name: 'B', value: 70, itemStyle: { color: '#20ad87' } },
        ],
        color: palette,
        animation: false,
      })
      expect(option.color).toEqual(palette)
      chart.setOption(option)
      chart.renderToSVGString()
      expect(actualBar(chart).style.fill).toBe('#8352cc')
      expect(actualBar(chart, 1).style.fill).toBe('#20ad87')
      expect(palette).toEqual(['#8352cc', '#20ad87'])
    } finally {
      chart.dispose()
    }
  })

  it('uses grouped mode for one item, grows sparse bars and keeps half-band end gaps', () => {
    const props = { data: [{ name: 'A', value: 50, target: 80 }], value: 10 }
    const option = createBulletOption(props)
    expect(option.xAxis).toMatchObject({ show: true })
    expect(
      (option.series as CustomSeriesOption[]).find(item => item.id === 'bullet')!.data,
    ).toMatchObject([{ name: 'A', value: 50, target: 80 }])
    expect(option.yAxis).toMatchObject({ data: ['A'], inverse: true })
    const tree = children(props)
    expect(tree[0].shape).toMatchObject({ y: 88, height: 24 })
    expect(tree[1].shape).toMatchObject({ y: 92, width: 200, height: 16 })
    expect(children({ ...props, barWidth: 10 })[1].shape.height).toBe(10)
    expect(createBulletOption({ data: [] }).yAxis).toMatchObject({ data: [] })
    expect(createBulletOption({ data: [], zeroText: 'No activity' }).graphic).toMatchObject([
      { style: { text: '' } },
    ])
  })
  it.each([null, undefined, NaN, Infinity])(
    'renders a full-width missing band for grouped value %s, keeping valid targets',
    value => {
      const props = { data: [{ name: 'A', value, target: 80 }], ranges }
      const tree = children(props)
      expect(tree.map(item => item.name)).toEqual(['missing', 'target'])
      expect(tree[0].shape).toMatchObject({ x: 0, width: 400, height: 24 })
      expect(tree[0].style.fill).toBe('rgba(245, 101, 79, 0.12)')
      expect(children({ data: [{ name: 'A', value }] }).map(item => item.name)).toEqual(['missing'])
      expect(
        children({ data: [{ name: 'A', value: 0 }] }).some(item => item.name === 'missing'),
      ).toBe(false)
      expect((createBulletOption(props).tooltip as any).formatter({ dataIndex: 0 })).toContain('–')
    },
  )
  it('uses the bar missing colors and respects theme overrides and bar width', () => {
    const props = { data: [{ name: 'A', value: null }], barWidth: 10 }
    expect(children({ ...props, darkMode: true })[0]).toMatchObject({
      shape: { height: 20 },
      style: { fill: '#361A1B' },
    })
    expect(
      children({ ...props, plotTheme: { missingBackgroundColor: 'pink' } })[0].style.fill,
    ).toBe('pink')
    expect(children({ ...props, plotTheme: { errorColor: '#FF0000' } })[0].style.fill).toBe(
      'rgba(255, 0, 0, 0.12)',
    )
  })
  it('renders missing categories after zoom and clears the band when data recovers', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const update = createPlotUpdater(true)
    const apply = (value: number | null) => {
      const { setOptionOpts, ...option } = update(
        createBulletOption({
          data: [
            { name: 'A', value: 50 },
            { name: 'B', value, missingReason: '<offline>' },
          ],
          ranges,
          animation: false,
          dataZoom: { type: 'slider', yAxisIndex: 0, startValue: 1, endValue: 1 },
        }),
      )!
      chart.setOption(option, setOptionOpts)
      return chart.renderToSVGString()
    }
    const bands = () =>
      chart
        .getZr()
        .storage.getDisplayList()
        .filter(item => item.name === 'missing')
    try {
      expect(apply(null)).not.toContain('NaN')
      expect(bands()).toHaveLength(1)
      expect((bands()[0] as any).shape.width).toBeGreaterThan(300)
      apply(50)
      expect(bands()).toHaveLength(0)
      apply(null)
      expect(bands()).toHaveLength(1)
    } finally {
      chart.dispose()
    }
  })
  it('sizes native bars and tracks together after category zoom', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          data: Array.from({ length: 50 }, (_, index) => ({ name: `类别${index + 1}`, value: 50 })),
          animation: false,
          dataZoom: { type: 'slider', yAxisIndex: 0, startValue: 0, endValue: 4 },
        }),
      )
      chart.renderToSVGString()
      expect(actualBar(chart).shape.height).toBe(8)
      chart.dispatchAction({ type: 'dataZoom', startValue: 20, endValue: 20 })
      chart.renderToSVGString()
      expect(actualBar(chart).shape.height).toBe(16)
      expect(rowElements(chart).find(item => item.name === 'track-0').shape.height).toBe(24)
    } finally {
      chart.dispose()
    }
  })
  it.each([
    { xAxis: { min: 1, max: 1 } },
    { xAxis: { min: NaN } },
    { xAxis: { max: Infinity } },
    { ranges: [...ranges, ranges[0]!] },
    { ranges: [{ upper: 101, color: 'red' }], xAxis: { max: 100 } },
  ])('rejects invalid bounds or ranges %j', props => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      expect(createBulletOption({ value: 50, ...props }).series).toEqual([])
      expect(warn).toHaveBeenCalledOnce()
      expect(warn.mock.calls[0]![0]).toMatch(/^\[IxBulletChart\]/)
    } finally {
      warn.mockRestore()
    }
  })
  it.each([
    [{ xAxis: { min: NaN } }, 'xAxis.min must be finite'],
    [{ xAxis: { max: Infinity } }, 'xAxis.max must be finite'],
    [{ xAxis: { min: 10, max: 5 } }, 'xAxis.max must be greater than xAxis.min (10)'],
    [{ ranges: [{ upper: NaN }] }, 'ranges[0].upper must be finite'],
    [{ ranges: [{ upper: 20 }, { upper: 20 }] }, 'ranges[1].upper must be greater than 20'],
    [
      { xAxis: { max: 10 }, ranges: [{ upper: 20 }] },
      'ranges[0].upper must not exceed xAxis.max (10)',
    ],
  ] as const)('identifies the invalid field in %j', (props, message) => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      expect(createBulletOption(props as BulletChartProps).series).toEqual([])
      expect(warn).toHaveBeenCalledWith(expect.stringContaining(message))
      // An error in one call must not poison a subsequent valid build.
      expect(createBulletOption({ value: 20 }).series).toEqual(
        expect.arrayContaining([expect.objectContaining({ type: 'bar' })]),
      )
      expect(warn).toHaveBeenCalledOnce()
    } finally {
      warn.mockRestore()
    }
  })
  it('does not warn for missing measurements, zeros or an empty grouped dataset', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      for (const props of [
        { value: null },
        { value: NaN },
        { value: 0 },
        { data: [] },
        { data: [{ name: 'A', value: Infinity }] },
      ])
        createBulletOption(props)
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })
  it.each([
    { inverse: true },
    { max: 200 },
    { min: -100, max: 200 },
    { min: -100, max: 200, inverse: true },
  ])('aligns bars, targets and guides with native axis %j', xAxis => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      for (const grouped of [false, true]) {
        chart.setOption(
          createBulletOption({
            ...(grouped
              ? { data: [{ name: 'A', value: 25, target: 25 }] }
              : { value: 25, target: 25 }),
            xAxis,
            ranges: [{ upper: 25 }, { upper: 100 }],
            animation: false,
          }),
          { notMerge: true },
        )
        chart.renderToSVGString()
        const list = chart.getZr().storage.getDisplayList() as any[]
        const actual = actualBar(chart)
        const target = list.find(item => item.name === 'target')
        const pixel = (value: number) => chart.convertToPixel({ xAxisIndex: 0 }, value) as number
        expect(Math.min(actual.shape.x, actual.shape.x + actual.shape.width)).toBeCloseTo(
          Math.min(pixel(0), pixel(25)),
        )
        expect(Math.abs(actual.shape.width)).toBeCloseTo(Math.abs(pixel(25) - pixel(0)))
        expect(target.shape.x + 0.5).toBeCloseTo(pixel(25))
        if (grouped) {
          expect(list.find(item => item.name === 'range-0-boundary').shape.x1).toBeCloseTo(
            pixel(25),
          )
        } else {
          const tracks = list.filter(item => item.name?.startsWith('track-'))
          const left = Math.min(...tracks.map(item => item.shape.x))
          const right = Math.max(...tracks.map(item => item.shape.x + item.shape.width))
          expect(tracks.reduce((sum, item) => sum + item.shape.width, 0)).toBeCloseTo(right - left)
          expect(left).toBeCloseTo(Math.min(pixel(xAxis.min ?? 0), pixel(xAxis.max ?? 100)))
          expect(right).toBeCloseTo(Math.max(pixel(xAxis.min ?? 0), pixel(xAxis.max ?? 100)))
        }
      }
    } finally {
      chart.dispose()
    }
  })
  it.each([false, true])('clips overflow to native bounds (inverse: %s)', inverse => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          value: 150,
          target: -20,
          xAxis: { min: 10, max: 100, inverse },
          animation: false,
        }),
      )
      chart.renderToSVGString()
      const list = chart.getZr().storage.getDisplayList() as any[]
      const actual = actualBar(chart)
      const target = list.find(item => item.name === 'target')
      const start = chart.convertToPixel({ xAxisIndex: 0 }, 10) as number
      const end = chart.convertToPixel({ xAxisIndex: 0 }, 100) as number
      expect(Math.min(actual.shape.x, actual.shape.x + actual.shape.width)).toBeCloseTo(
        Math.min(start, end),
      )
      expect(Math.abs(actual.shape.width)).toBeCloseTo(Math.abs(end - start))
      expect(target.shape.x + 0.5).toBeCloseTo(start)
    } finally {
      chart.dispose()
    }
  })
  it('uses native numeric axis bounds for the bullet scale and range validation', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const option = createBulletOption({
        value: 225,
        target: 275,
        xAxis: { min: 200, max: 300 },
        ranges: [{ upper: 250 }, { upper: 300 }],
      })
      expect(option.xAxis).toMatchObject({ min: 200, max: 300 })
      expect(option.series).not.toEqual([])
      expect(warn).not.toHaveBeenCalled()
      expect(
        createBulletOption({ value: 225, xAxis: { min: 200, max: 300 }, ranges: [{ upper: 150 }] })
          .series,
      ).toEqual([])
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('must be greater than 200'))
      warn.mockClear()
      expect(createBulletOption({ value: 50, xAxis: { max: NaN } }).series).toEqual([])
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('xAxis.max must be finite'))
    } finally {
      warn.mockRestore()
    }
  })

  it.each(['Completion', 7])('uses native naming (%s) and formatters', name => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 80 })
    try {
      const option = createBulletOption({
        value: 40,
        target: 60,
        name,
        label: { show: true, formatter: '{a}:{c}' },
        tooltip: { valueFormatter: value => `native:${value}` },
        animation: false,
      })
      chart.setOption(option)
      expect(chart.renderToSVGString()).toContain(`${name}:40`)
      const html = (option.tooltip as any).formatter({ dataIndex: 0 })
      expect(html).toContain(String(name))
      expect(html).toContain('native:40')
      expect(html).toContain('native:60')
    } finally {
      chart.dispose()
    }
  })

  it('infers a finite scale including targets and ranges', () => {
    expect(createBulletOption({ value: 200, target: 500 }).xAxis).toMatchObject({ max: 500 })
    expect(
      createBulletOption({ value: 1, ranges: [{ upper: 300, color: 'red' }] }).xAxis,
    ).toMatchObject({ max: 300 })
  })
  it.each([
    { min: 'dataMin', max: 'dataMax' },
    { min: () => -20, max: () => 140 },
  ] satisfies BulletChartProps['xAxis'][])('leaves dynamic axis ticks to ECharts (%j)', xAxis => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 600, height: 280 })
    const labels = (withRanges: boolean) => {
      const option = createBulletOption({
        data: [{ name: 'A', value: 72, target: 85 }],
        ranges: withRanges ? ranges : [],
        xAxis: {
          ...xAxis,
          axisLabel: { formatter: '{value}%', showMinLabel: true, showMaxLabel: true },
        },
        animation: false,
      })
      expect((option.xAxis as any).axisLabel.customValues).toBeUndefined()
      chart.setOption(option, { notMerge: true })
      chart.renderToSVGString()
      return chart
        .getZr()
        .storage.getDisplayList()
        .filter(item => item.type === 'tspan' && (item as any).style.text.endsWith('%'))
        .map(item => (item as any).style.text)
    }
    try {
      const dynamicLabels = labels(true)
      expect(dynamicLabels.length).toBeGreaterThan(1)
      if (xAxis.max === 'dataMax') {
        // Range guides contribute the zero baseline to ECharts' data extent.
        expect(dynamicLabels[0]).toBe('0%')
        expect(dynamicLabels.at(-1)).toBe('72%')
      } else {
        expect(dynamicLabels).toEqual(labels(false))
        expect(dynamicLabels[0]).toBe('-20%')
        expect(dynamicLabels.at(-1)).toBe('140%')
      }
    } finally {
      chart.dispose()
    }
  })

  it.each([false, true])('aligns axis labels with changing ranges (legacy: %s)', legacy => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const update = createPlotUpdater(true)
    const apply = (bounds: number[], xAxis: Record<string, unknown> = {}) => {
      const snapshot = createBulletOption({
        data: [{ name: 'A', value: 72, target: 85 }],
        ranges: bounds.map(upper => ({ upper })),
        xAxis: { axisLabel: { formatter: '{value}%' }, ...xAxis },
        animation: false,
      })
      if (legacy) applyLegacyRangeLabels(snapshot)
      const { setOptionOpts, ...option } = update(snapshot)!
      chart.setOption(option, setOptionOpts)
      chart.renderToSVGString()
      return chart
        .getZr()
        .storage.getDisplayList()
        .filter(item => item.type === 'tspan' && (item as any).style.text.endsWith('%'))
        .map(item => (item as any).style.text)
    }
    try {
      expect(apply([60, 80, 100])).toEqual(['0%', '60%', '80%', '100%'])
      expect(apply([45.5, 75])).toEqual(['0%', '45.5%', '75%', '100%'])
      expect(apply([60, 80, 100], { interval: 25 })).toEqual(['0%', '25%', '50%', '75%', '100%'])
      expect(apply([60, 80, 100], { splitNumber: 2 })).toEqual(['0%', '50%', '100%'])
      expect(
        apply([60, 80, 100], {
          axisLabel: { customValues: [0, 40, 100], formatter: '{value}%' },
        }),
      ).toEqual(['0%', '40%', '100%'])
      expect(apply([60, 80, 100], { min: -20, max: 120, inverse: true })).toEqual([
        '-20%',
        '60%',
        '80%',
        '100%',
        '120%',
      ])
      expect(apply([60, 80, 100], { axisLabel: { show: false } })).toEqual([])
      expect(apply([])).toEqual(['0%', '30%', '60%', '90%', '100%'])
    } finally {
      chart.dispose()
    }
  })
  it.each([false, true])('avoids overlapping range labels after resizing (legacy: %s)', legacy => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 640, height: 280 })
    const labels = () =>
      chart
        .getZr()
        .storage.getDisplayList()
        .filter(item => item.type === 'tspan' && (item as any).style.text.endsWith('%'))
    const bounds = (item: ReturnType<typeof labels>[number]) => {
      const rect = item.getBoundingRect().clone()
      if (item.transform) rect.applyTransform(item.transform)
      return rect
    }
    const apply = (inverse = false, hideOverlap?: boolean) => {
      const option = createBulletOption({
        data: [{ name: 'A', value: 72, target: 85 }],
        ranges: (hideOverlap === false ? [49, 50, 51, 100] : [1, 20, 30, 49, 50, 51, 99, 100]).map(
          upper => ({ upper }),
        ),
        xAxis: {
          inverse,
          axisLabel: {
            formatter: '{value}%',
            fontSize: 14,
            ...(hideOverlap !== undefined && { hideOverlap }),
          },
        },
        animation: false,
      })
      if (legacy) applyLegacyRangeLabels(option)
      chart.setOption(option, { notMerge: true })
    }
    try {
      for (const inverse of [false, true]) {
        apply(inverse)
        const counts: number[] = []
        for (const width of [640, 240, 400, 640]) {
          chart.resize({ width })
          chart.renderToSVGString()
          const visible = labels()
          counts.push(visible.length)
          expect(visible.length).toBeGreaterThanOrEqual(2)
          expect(visible.length).toBeLessThan(9)
          for (let i = 0; i < visible.length; i++) {
            for (let j = i + 1; j < visible.length; j++) {
              expect(bounds(visible[i]!).intersect(bounds(visible[j]!))).toBe(false)
            }
          }
          expect(visible.map(item => (item as any).style.text)).toEqual(
            expect.arrayContaining(['0%', '100%']),
          )
          expect(
            chart
              .getZr()
              .storage.getDisplayList()
              .filter(item => item.name?.endsWith('-boundary')),
          ).toHaveLength(8)
        }
        expect(counts[1]).toBeLessThan(counts[0]!)
        expect(counts[3]).toBe(counts[0])
      }
      apply(false, false)
      chart.renderToSVGString()
      expect(labels()).toHaveLength(5)
    } finally {
      chart.dispose()
    }
  })
  it('uses theme and row overrides, formatting and escaped tooltip labels', () => {
    const option = createBulletOption({
      data: [{ name: '<script>', value: 75, target: 85, itemStyle: { color: 'green' } }],
      plotTheme: { color: 'red' },
      label: { formatter: params => `${params.value}%` },
      name: '<actual>',
      tooltip: { valueFormatter: value => `${value}%` },
    })
    const formatter = (option.tooltip as any).formatter
    const html = formatter({ dataIndex: 0 })
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;actual&gt;')
    expect(html).toContain('75%')
    expect(html).toContain('85%')
    expect(html).toContain('background: green')
    expect(html).toContain('background: red')
    expect(formatter([])).toBe('')
    expect(formatter({ dataIndex: 20 })).toBe('')
    const missing = createBulletOption({
      data: [{ name: 'A', value: null, target: 80, missingReason: '<offline>' }],
    })
    expect((missing.tooltip as any).formatter({ dataIndex: 0 })).toContain('&lt;offline&gt;')
  })
  it('preserves input and lets native arrays replace generated arrays', () => {
    const props = { data: [{ name: 'A', value: 20 }], ranges, grid: { right: 24 } }
    const before = structuredClone(props)
    const option = createBulletOption(props)
    expect(option.grid).toMatchObject({ right: 24 })
    expect(props).toEqual(before)
    expect(createBulletOption({ ...props, series: [], tooltip: { show: false } })).toMatchObject({
      series: [],
      tooltip: { show: false },
    })
  })
  it('renders the final range guide when its upper bound equals the scale maximum', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({ data: [{ name: 'A', value: 50 }], ranges, xAxis: { max: 100 } }),
      )
      chart.renderToSVGString()
      const guide = chart
        .getZr()
        .storage.getDisplayList()
        .find(element => {
          const line = element as unknown as {
            shape: { x1?: number; x2?: number; y1?: number; y2?: number }
            style: { stroke?: string; lineDash?: number[] }
          }
          return (
            element.type === 'line' &&
            line.style.stroke === ranges[2]!.color &&
            line.style.lineDash?.length === 2 &&
            line.shape.x1 === chart.convertToPixel({ xAxisIndex: 0 }, 100) &&
            line.shape.x2 === line.shape.x1 &&
            line.shape.y1 === 16 &&
            line.shape.y2! > line.shape.y1!
          )
        })
      expect(guide).toBeDefined()
    } finally {
      chart.dispose()
    }
  })
  it.each([{ ranges: [] }, { ranges }])(
    'renders the slider data preview with ranges %j',
    ({ ranges }) => {
      const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
      try {
        chart.setOption(
          createBulletOption({
            data: Array.from({ length: 50 }, (_, index) => ({
              name: `类别${index + 1}`,
              value: 20 + ((index * 17) % 80),
            })),
            ranges,
            dataZoom: {
              type: 'slider',
              yAxisIndex: 0,
              startValue: 0,
              endValue: 4,
              filterMode: 'filter',
            },
          }),
        )
        chart.renderToSVGString()
        const previews = chart
          .getZr()
          .storage.getDisplayList()
          .filter(
            element => element.type === 'polyline' && (element as any).shape.points.length >= 50,
          )
        expect(previews.length).toBeGreaterThan(0)
        const points = (previews[0] as any).shape.points as number[][]
        expect(new Set(points.map(point => point[1])).size).toBeGreaterThan(1)
      } finally {
        chart.dispose()
      }
    },
  )
  it.each([0, 24, 49])('keeps only the selected category when zoomed to row %i', index => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          data: Array.from({ length: 50 }, (_, index) => ({
            name: `类别${index + 1}`,
            value: 20 + index,
            target: 80,
          })),
          ranges,
          dataZoom: { type: 'slider', yAxisIndex: 0, startValue: 0, endValue: 4 },
        }),
      )
      chart.dispatchAction({ type: 'dataZoom', startValue: index, endValue: index })
      const svg = chart.renderToSVGString()
      expect(svg).toContain(`类别${index + 1}<`)
      const seriesData = (chart as any).getModel().getSeriesByIndex(0).getData()
      expect(seriesData.count()).toBe(1)
      expect(actualBar(chart).shape.height).toBe(16)
      expect(svg).toContain('#FF6B57')
      expect(svg).not.toContain('NaN')
    } finally {
      chart.dispose()
    }
  })
  it('shows five categories and scrolls to later categories with range guides intact', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          data: Array.from({ length: 50 }, (_, index) => ({ name: `类别${index + 1}`, value: 50 })),
          ranges,
          dataZoom: {
            type: 'slider',
            yAxisIndex: 0,
            startValue: 0,
            endValue: 4,
            filterMode: 'filter',
          },
        }),
      )
      const initial = chart.renderToSVGString()
      expect(initial).toContain('类别1<')
      expect(initial).toContain('类别5<')
      expect(initial).not.toContain('类别6<')
      chart.dispatchAction({ type: 'dataZoom', startValue: 45, endValue: 49 })
      const scrolled = chart.renderToSVGString()
      expect(scrolled).toContain('类别46<')
      expect(scrolled).toContain('类别50<')
      expect(scrolled).not.toContain('类别1<')
      expect(scrolled).toContain('#FF6B57')
      expect(scrolled).not.toContain('NaN')
    } finally {
      chart.dispose()
    }
  })
  it.each([false, true])(
    'animates values through zero without replacing shapes (grouped: %s)',
    grouped => {
      const chart = init(document.createElement('div'), undefined, {
        renderer: 'svg',
        width: 500,
        height: 280,
      })
      const update = createPlotUpdater(true)
      const apply = (value: number, target: number, animation: boolean) => {
        const option = update(
          createBulletOption({
            ...(grouped ? { data: [{ name: 'A', value, target }] } : { value, target }),
            animation,
            animationDurationUpdate: 1000,
            animationEasingUpdate: 'linear',
            xAxis: { max: 100 },
          }),
        )!
        expect(option.setOptionOpts?.notMerge).toBe(false)
        const { setOptionOpts, ...snapshot } = option
        chart.setOption(snapshot, setOptionOpts)
      }
      const actual = () => actualBar(chart)
      try {
        apply(75, 85, false)
        const bar = actual()
        const width = bar.shape.width
        apply(0, 60, true)
        expect(actual()).toBe(bar)
        expect(bar.shape.width).toBe(width)
        const animator = bar.animators.find((item: any) => item.targetName === 'shape')
        expect(animator).toBeDefined()
        const clip = animator.getClip()
        clip.onframe(0.5)
        expect(bar.shape.width).toBeGreaterThan(0)
        expect(bar.shape.width).toBeLessThan(width)
        clip.onframe(1)
        expect(bar.shape.width).toBe(0)
        apply(50, 80, true)
        expect(actual()).toBe(bar)
        expect(bar.animators.some((item: any) => item.targetName === 'shape')).toBe(true)
      } finally {
        chart.dispose()
      }
    },
  )
  it('removes a category slider without restarting series animations', () => {
    const update = createPlotUpdater(true)
    update(
      createBulletOption({
        data: [
          { name: 'A', value: 50 },
          { name: 'B', value: 30 },
        ],
        dataZoom: { type: 'slider', yAxisIndex: 0 },
      }),
    )
    const option = update(createBulletOption({ data: [{ name: 'A', value: 50 }] }))!
    expect(option.setOptionOpts).toMatchObject({ notMerge: false, replaceMerge: ['dataZoom'] })
    expect(option.dataZoom).toEqual([])
  })
  it('animates target movement and category additions, removal and reorder', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 280,
    })
    const update = createPlotUpdater(true)
    const apply = (names: string[], target: number, animation: boolean) => {
      const option = update(
        createBulletOption({
          data: names.map(name => ({ name, value: 50, target })),
          animation,
          animationDurationUpdate: 1000,
          xAxis: { max: 100 },
        }),
      )!
      expect(option.setOptionOpts?.notMerge).toBe(false)
      const { setOptionOpts, ...snapshot } = option
      chart.setOption(snapshot, setOptionOpts)
    }
    const element = (index: number, name: string) =>
      name === 'actual'
        ? actualBar(chart, index)
        : (chart as any)
            .getModel()
            .getSeriesByIndex(2)
            .getData()
            .getItemGraphicEl(index)
            ?.children()
            .find((child: any) => child.name === name)
    try {
      apply(['A', 'B'], 80, false)
      const barA = element(0, 'actual')
      const targetA = element(0, 'target')
      const oldY = barA.shape.y
      const oldX = targetA.shape.x
      apply(['C', 'B', 'A'], 60, true)
      expect(element(2, 'actual')).toBe(barA)
      expect(element(2, 'target')).toBe(targetA)
      expect(barA.shape.y).toBe(oldY)
      expect(targetA.shape.x).toBe(oldX)
      barA.animators
        .find((item: any) => item.targetName === 'shape')
        .getClip()
        .onframe(0.5)
      targetA.animators
        .find((item: any) => item.targetName === 'shape')
        .getClip()
        .onframe(0.5)
      expect(barA.shape.y).not.toBe(oldY)
      expect(targetA.shape.x).toBeLessThan(oldX)
      expect(element(0, 'actual').animators.length).toBeGreaterThan(0)
      apply(['A'], 90, true)
      expect(element(0, 'actual')).toBe(barA)
      expect(barA.animators.some((item: any) => item.targetName === 'shape')).toBe(true)
    } finally {
      chart.dispose()
    }
  })
  it('renders real ECharts SVG and removes stale ranges and zero text after updates', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({ data: [{ name: 'A', value: 0 }], ranges, zeroText: 'No activity' }),
        {
          notMerge: true,
        },
      )
      expect(chart.renderToSVGString()).toContain('No activity')
      chart.setOption(createBulletOption({ data: [{ name: 'A', value: 50, target: 80 }] }), {
        notMerge: true,
      })
      const svg = chart.renderToSVGString()
      expect(svg).toContain('<linearGradient')
      expect(svg).not.toContain('No activity')
      expect(svg).not.toContain('NaN')
      chart.resize({ width: 300, height: 180 })
      expect(chart.renderToSVGString()).not.toContain('NaN')
    } finally {
      chart.dispose()
    }
  })
})
