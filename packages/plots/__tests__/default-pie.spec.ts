import type { PieChartProps } from '../pie/src/usePieOption'
import { mount } from '@vue/test-utils'
import { defineComponent, h, shallowRef, shallowReactive } from 'vue'
import { useDefaultPieOption } from '../pie/src/useDefaultPieOption'
import { PIE_CHART_TOKEN } from '../pie/src/usePieOption'
import { describe, expect, it, vi } from 'vitest'
import { createDefaultPieOption } from '../pie/src/createDefaultPieOption'

vi.mock('echarts/core', async () => {
  const actual = await vi.importActual<typeof import('echarts/core')>('echarts/core')
  return {
    ...actual,
    format: {
      ...actual.format,
      getTextRect: (
        text: string,
        _font: string,
        _align: unknown,
        _vertical: unknown,
        _padding: unknown,
        rich: Record<string, { width?: number }> = {},
      ) => ({
        width: [...text.matchAll(/\{([^|]+)\|([^}]*)\}|([^{}]+)/g)].reduce(
          (sum, match) =>
            sum +
            (match[1] ? (rich[match[1]]?.width ?? match[2]!.length * 8) : match[3]!.length * 8),
          0,
        ),
        height: 12,
      }),
    },
  }
})

const tokens = {
  fontFamily: 'Arial',
  colorErrorText: '#f00',
  colorTextInfo: '#666',
  colorInfoContainerBgDisabled: '#eee',
}
const size = { width: 480, height: 180 }
const build = (data: Parameters<typeof createDefaultPieOption>[0]) =>
  createDefaultPieOption(data, size, tokens)

describe('built-in pie data semantics', () => {
  it('isolates decoration data and excludes missing values from the summary', () => {
    const input = [
      { name: 'A', value: 10 },
      { name: 'B', value: null, missingReason: '<offline>' },
    ]
    const before = structuredClone(input)
    const option = build(input) as any
    expect(input).toEqual(before)
    expect(option.title).toMatchObject({ show: false, text: '' })
    expect(option.series[2].name).toBe('')
    expect(option.series.map((s: any) => s.data.length)).toEqual([1, 1, 2])
    expect(option.series[2].data[1]).toMatchObject({ value: 0, tooltip: { show: false } })
    expect(option.legend[0].formatter('B')).toContain('–')
    const tooltip = option.legend[0].tooltip.formatter({ name: 'B' })
    expect(tooltip).toContain('&lt;offline&gt;')
    expect(tooltip).not.toContain('<offline>')
  })

  it('distinguishes valid zero, empty data and entirely missing data', () => {
    const zero = build([{ name: 'A', value: 0 }]) as any
    expect(zero.series[1].data[0].value).toBe(1)
    expect(zero.series[2].stillShowZeroSum).toBe(false)
    expect(zero.series[2].itemStyle.borderWidth).toBe(0)
    for (const input of [[], [{ name: 'A', value: null }]]) {
      const option = build(input) as any
      expect(option.series[1].data[0].value).toBe(0)
      expect(option.title.show).toBe(false)
    }
  })

  it('keeps independent series arrays when data shrinks and retains caller item styles', () => {
    const option = build([
      { name: 'A', value: 3, itemStyle: { color: '#123456', borderWidth: 4 } },
    ]) as any
    expect(option.series[2].data).toHaveLength(1)
    expect(option.series[2].data[0].itemStyle).toMatchObject({ color: '#123456', borderWidth: 4 })
    expect(option.legend[0].data[0].itemStyle.color).toBe('#123456')
  })
})

describe('pie block alignment', () => {
  const data = ['A', 'B', 'C', 'D', 'E', 'F'].map(name => ({ name, value: 10 }))
  const aligned = (align: import('../pie/src/usePieOption').PieChartAlign) =>
    createDefaultPieOption(data, size, tokens, undefined, undefined, align) as any

  it('aligns all nine positions and puts the pie after the summary for end', () => {
    const base = createDefaultPieOption(data, size, tokens) as any
    const start = aligned('top-start')
    const r = start.series[0].radius
    const middle = aligned('center')
    const xFree = 2 * (middle.series[0].center[0] - start.series[0].center[0])
    expect(xFree).toBeGreaterThan(0)
    for (const [row, y] of [
      ['top', r],
      ['center', 90],
      ['bottom', 180 - r],
    ] as const) {
      for (const [column, factor] of [
        ['start', 0],
        ['center', 0.5],
        ['end', 1],
      ] as const) {
        const option = aligned(
          row === 'center' && column === 'center'
            ? 'center'
            : (`${row}-${column}` as import('../pie/src/usePieOption').PieChartAlign),
        )
        const dx = column === 'end' ? xFree - base.title.left : xFree * factor
        const cx = column === 'end' ? size.width - r : r + xFree * factor
        const dy = y - 90
        expect(
          option.series.every((series: any) => series.center[0] === cx && series.center[1] === y),
        ).toBe(true)
        if (column === 'end') {
          expect(option.legend[0].left).toBeLessThan(option.legend[1].left)
          expect(option.legend[1].left).toBeLessThan(cx - r)
          expect(option.legend.map((legend: any) => legend.data)).toEqual(
            base.legend.map((legend: any) => legend.data),
          )
        }
        expect(option.title.left).toBeCloseTo(base.title.left + dx)
        expect(option.title.top).toBeCloseTo(base.title.top + dy)
        option.legend.forEach((legend: any, index: number) => {
          expect(legend.left).toBeCloseTo(base.legend[index].left + dx)
          expect(legend.top).toBeCloseTo(base.legend[index].top + dy)
        })
      }
    }
  })

  it('pins overflowing content to the start rather than giving it negative coordinates', () => {
    const option = createDefaultPieOption(
      data,
      { width: 80, height: 30 },
      tokens,
      undefined,
      undefined,
      'bottom-end',
    ) as any
    expect(option.series[0].center[0] - option.series[0].radius).toBeGreaterThanOrEqual(0)
    expect(option.title.top).toBeGreaterThanOrEqual(0)
  })
})

describe('visible content and responsive shapes', () => {
  const data = Array.from({ length: 6 }, (_, i) => ({ name: `Item ${i}`, value: i + 1 }))
  it('centers just the pie when title and legend are hidden', () => {
    for (const size of [
      { width: 480, height: 180 },
      { width: 240, height: 240 },
    ]) {
      const option = createDefaultPieOption(data, size, tokens, '', '', 'center', {
        title: { show: false },
        legend: { show: false },
      }) as any
      expect(
        option.series.every(
          (s: any) => s.center[0] === size.width / 2 && s.center[1] === size.height / 2,
        ),
      ).toBe(true)
      expect(option.legend.every((l: any) => !l.show)).toBe(true)
    }
  })
  it('keeps a supplied title when the legend is hidden without inventing totals', () => {
    const option = createDefaultPieOption(data, size, tokens, 'Assets', '', 'center', {
      title: { text: 'Provided by business' },
      legend: { show: false },
    }) as any
    expect(option.title.text).toBe('Provided by business')
    expect(option.title.show).toBe(true)
    expect(option.series[2].center[0]).toBeLessThan(size.width / 2)
    expect(option.series[2].name).toBe('Assets')
  })
  it('uses a single scrollable legend for narrow or crowded layouts and clears the other column', () => {
    const many = Array.from({ length: 30 }, (_, i) => ({ name: `Item ${i}`, value: i }))
    const option = createDefaultPieOption(
      many,
      { width: 280, height: 180 },
      tokens,
      '',
      '',
      'center',
    ) as any
    expect(option.legend[0]).toMatchObject({
      type: 'scroll',
      show: true,
      height: 148,
      pageIconSize: 0,
    })
    expect(option.legend[0].data).toHaveLength(30)
    expect(option.legend[1]).toMatchObject({ show: false, data: [] })
    expect(option.legend[0].top).toBeGreaterThanOrEqual(0)
    expect(option.legend[0].pageFormatter()).toBe('')
    expect(option.graphic[3]).toMatchObject({ ignore: false, silent: true })
    expect(option.graphic[4]).toMatchObject({ ignore: false, silent: false })
  })
  it('fits ring and rose radii to the plot area and retains zero placeholders', () => {
    for (const roseType of [undefined, 'area'] as const) {
      const option = createDefaultPieOption(
        data.map(item => ({ ...item, value: 0 })),
        size,
        tokens,
        '',
        '',
        'center',
        {
          radius: ['70%', '80%'],
          roseType,
          legend: { show: false },
          color: ['#123456'],
        },
      ) as any
      expect(option.series[2].center[0]).toBeCloseTo(240)
      expect(option.series[2].center[1]).toBeCloseTo(90)
      expect(option.series[2].roseType).toBe(roseType ?? null)
      expect(option.series[2].radius[0]).toBeCloseTo(63)
      expect(option.series[2].radius[1]).toBe(72)
      expect(option.series[1].radius).toEqual(option.series[2].radius)
      expect(option.series[1].data[0].value).toBe(1)
      expect(option.series[2].data[0].itemStyle.color).toBe('#123456')
    }
  })
})

describe('pie fills available space', () => {
  const data = Array.from({ length: 6 }, (_, index) => ({
    name: `Category ${index}`,
    value: index + 1,
  }))
  it('grows when the legend is hidden and shrinks again when restored', () => {
    const size = { width: 480, height: 300 }
    const visible = createDefaultPieOption(data, size, tokens, '', '', 'center') as any
    const hidden = createDefaultPieOption(data, size, tokens, '', '', 'center', {
      legend: { show: false },
    }) as any
    expect(hidden.series[2].radius).toBeGreaterThan(visible.series[2].radius)
    expect(hidden.series[0].radius * 2).toBe(284)
    expect(hidden.series[2].radius).toBe(130)
    expect(hidden.series[2].center).toEqual([240, 150])
    expect(
      (createDefaultPieOption(data, size, tokens, '', '', 'center') as any).series[2].radius,
    ).toBe(visible.series[2].radius)
  })
  it('fits both wide and tall containers without stretching and respects explicit small radii', () => {
    for (const size of [
      { width: 240, height: 480 },
      { width: 480, height: 240 },
    ]) {
      const option = createDefaultPieOption(data, size, tokens, '', '', 'center', {
        legend: { show: false },
      }) as any
      expect(option.series[0].radius).toBe(112)
      expect(option.series[2].radius).toBe(100)
      expect(option.series[2].center).toEqual([size.width / 2, size.height / 2])
      const fixed = createDefaultPieOption(data, size, tokens, '', '', 'center', {
        legend: { show: false },
        radius: 40,
      }) as any
      expect(fixed.series[2].radius).toEqual([0, 40])
    }
  })
})

it('preserves the Basic baseline and grows with a fixed halo across container sizes', () => {
  const data = ['A', 'B', 'C', 'D', 'E', 'F'].map(name => ({ name, value: 10 }))
  for (const [width, height, radius] of [
    [480, 180, 60],
    [600, 240, 80],
    [600, 300, 90],
    [800, 600, 120],
  ]) {
    const option = createDefaultPieOption(
      data,
      { width: width!, height: height! },
      tokens,
      '',
      '',
      'center',
    ) as any
    expect(option.series[2].radius).toBe(radius)
    expect(option.series[0].radius).toBe(radius! + 12)
  }
})

describe('pie shape and presentation layout', () => {
  const categories = (count: number) =>
    Array.from({ length: count }, (_, i) => ({ name: `A${i}`, value: i + 1 }))
  it('fits compact explicit radii without shrinking the main chart for its background', () => {
    const option = createDefaultPieOption(
      categories(6),
      { width: 84, height: 84 },
      tokens,
      '',
      '',
      'center',
      {
        radius: 36,
        legend: { show: false },
      },
    ) as any
    expect(option.series[2].radius).toEqual([0, 36])
    expect(option.series[0].radius).toBe(42)
    expect(option.series[2].center).toEqual([42, 42])
  })
  it('uses up to three columns and pages only the overflowing last column', () => {
    for (const [count, lengths] of [
      [4, [4, 0, 0]],
      [6, [3, 3, 0]],
      [12, [4, 4, 4]],
      [15, [4, 4, 7]],
    ] as const) {
      const option = createDefaultPieOption(
        categories(count),
        { width: 720, height: 240 },
        tokens,
        '',
        '',
        'center-start',
        { legend: { itemGap: 16 } },
      ) as any
      expect(option.legend.map((item: any) => item.data.length)).toEqual(lengths)
      expect(option.legend.filter((item: any) => item.show && item.type === 'scroll')).toHaveLength(
        count > 12 ? 1 : 0,
      )
    }
  })
  it('measures native font size and item spacing and includes a subtitle in the block', () => {
    const option = createDefaultPieOption(categories(4), size, tokens, '', '', 'center', {
      title: { text: '554', subtext: 'Assets', textStyle: { fontSize: 28 }, itemGap: 8 },
      legend: { itemGap: 8, textStyle: { fontSize: 24 } },
    }) as any
    expect(option.title.subtext).toBe('Assets')
    expect(option.legend[0].textStyle.rich.label.fontSize).toBe(24)
    expect(option.legend[0].textStyle.lineHeight).toBe(24)
    expect(option.legend[0].itemGap).toBe(8)
    expect(option.legend[0].top).toBeGreaterThan(option.title.top + 28)
  })
  it('draws a single caller-owned center label for zero values and clears ring decorations for a rose', () => {
    for (const roseType of [undefined, 'radius'] as const) {
      const option = createDefaultPieOption(
        [{ name: 'A', value: 0 }],
        size,
        tokens,
        '',
        '',
        'center',
        {
          radius: ['88%', '100%'],
          roseType,
          label: { show: true, position: 'center', formatter: () => 'Business total: 0' },
        },
      ) as any
      expect(option.graphic[2].style.text).toBe('Business total: 0')
      expect(option.graphic[0].invisible).toBe(Boolean(roseType))
      expect(option.series[2].label.show).toBe(false)
      expect(option.series[1].data[0].value).toBe(1)
    }
  })
})

it('applies injected data and series presentation for automatic layout', () => {
  let result: ReturnType<typeof useDefaultPieOption>
  const props = shallowRef({})
  const wrapper = mount(
    defineComponent({
      setup() {
        result = useDefaultPieOption(props.value, shallowRef({}), shallowRef({}))
        return () => h('div')
      },
    }),
    {
      global: {
        provide: {
          [PIE_CHART_TOKEN as symbol]: {
            align: 'center',
            name: 'Injected name',
            data: [{ name: 'A', value: 10 }],
            label: { position: 'inside', show: true },
          },
        },
      },
    },
  )
  expect(result!.automatic.value).toBe(true)
  expect((result!.option.value.series as any)[2]).toMatchObject({
    name: 'Injected name',
    data: [{ name: 'A', value: 10 }],
    label: { position: 'inside', show: true },
  })
  wrapper.unmount()
})

it('builds main-series annotations without applying them to decorative series', () => {
  const label = { show: true, position: 'outside' as const }
  const markArea = { silent: true }
  const option = createDefaultPieOption(
    [{ name: 'A', value: 1 }],
    size,
    tokens,
    '',
    '',
    undefined,
    {
      label,
      markArea,
    },
  )
  const series = option.series as import('echarts/charts').PieSeriesOption[]
  expect(series.find(item => item.id === 'ix-pie-data')).toMatchObject({ label, markArea })
  for (const decoration of series.filter(item => item.id !== 'ix-pie-data')) {
    expect(decoration.label).toEqual({ show: false })
    expect(decoration.markArea).toBeUndefined()
  }
})

it('themes decorations and patches only main-series presentation without replacing data', () => {
  const seriesStyle = { itemStyle: { borderWidth: 4 }, emphasis: { scale: false } }
  const option = createDefaultPieOption(
    [{ name: 'A', value: 10 }],
    size,
    tokens,
    '',
    '',
    undefined,
    {
      plotTheme: { color: '#ff0000', textColor: '#eeeeee', fontFamily: 'Theme Font' },
      seriesStyle,
    },
  ) as any
  expect(option.series[2].itemStyle.borderWidth).toBe(4)
  expect(option.series[2].data[0]).toMatchObject({
    name: 'A',
    value: 10,
    itemStyle: { color: '#ff0000' },
  })
  expect(option.series[0].itemStyle.borderWidth).toBe(0)
  expect(option.graphic[0].style.stroke).toContain('255, 0, 0')
  expect(option.legend[0].textStyle.rich.value.color).toBe('#eeeeee')
  expect(seriesStyle).toEqual({ itemStyle: { borderWidth: 4 }, emphasis: { scale: false } })
})

it('keeps explicit automatic mode stable for palette/theme changes and honors native geometry', () => {
  const props = shallowReactive<PieChartProps>({
    data: [{ name: 'A', value: 1 }],
    layoutMode: 'auto',
  })
  const attrs = shallowRef<PieChartProps>({ color: ['red'], theme: 'dark' })
  let result: ReturnType<typeof useDefaultPieOption>
  const wrapper = mount(
    defineComponent({
      setup() {
        result = useDefaultPieOption(props, attrs, shallowRef({ series: [] }))
        return () => h('div')
      },
    }),
  )
  expect(result!.automatic.value).toBe(true)
  expect((result!.option.value.series as any)[2].data[0].itemStyle.color).toBe('red')
  props.layoutMode = undefined
  expect(result!.automatic.value).toBe(false)
  props.layoutMode = 'auto'
  attrs.value = { series: [] }
  expect(result!.automatic.value).toBe(false)
  attrs.value = { legend: [{ show: false }] }
  expect(result!.automatic.value).toBe(false)
  attrs.value = { title: [{ text: 'Native' }] }
  expect(result!.automatic.value).toBe(false)
  attrs.value = {}
  props.layoutMode = 'native'
  expect(result!.automatic.value).toBe(false)
  wrapper.unmount()
})

it('themes plain titles and legend labels and inherits root center typography', () => {
  const buildPresentation = (presentation: Parameters<typeof createDefaultPieOption>[6]) =>
    createDefaultPieOption(
      [{ name: 'A', value: 10 }],
      size,
      tokens,
      '',
      '',
      'center',
      presentation,
    ) as any
  const option = buildPresentation({
    plotTheme: { textColor: '#112233', secondaryTextColor: '#445566' },
    title: { text: 'Assets' },
    textStyle: { fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
    label: { position: 'center', formatter: 'Total' },
  })
  expect(option.title.textStyle.color).toBe('#112233')
  expect(option.legend[0].textStyle.color).toBe('#445566')
  expect(option.graphic.find((item: any) => item.id === 'ix-pie-center-label').style).toMatchObject(
    {
      fill: '#112233',
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 28,
    },
  )
  const local = buildPresentation({
    plotTheme: { textColor: 'red', secondaryTextColor: 'blue' },
    title: { text: 'Assets', textStyle: { color: 'green' } },
    legend: { textStyle: { color: 'purple' } },
  })
  expect(local.title.textStyle.color).toBe('green')
  expect(local.legend[0].textStyle.color).toBe('purple')
})

it('keeps the reference pie radius when wide legend content still fits beside the halo', () => {
  const option = createDefaultPieOption(
    Array.from({ length: 6 }, (_, index) => ({ name: `Item${index}`, value: index + 1 })),
    size,
    tokens,
    '',
    '',
    'center-start',
    { legend: { textStyle: { rich: { label: { width: 45 }, value: { width: 66 } } } } },
  ) as any
  expect(option.series[2].radius).toBe(60)
  expect(option.series[0].radius).toBe(72)
  expect(option.legend[0].left).toBe(167)
})
