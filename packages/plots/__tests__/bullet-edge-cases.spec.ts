import { init } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import { createBulletOption } from '../bullet'
import { createPlotUpdater } from '../shared/plotOptions'
import type { BulletChartProps } from '../bullet'

type LabelFormatter = Exclude<
  NonNullable<NonNullable<BulletChartProps['label']>['formatter']>,
  string
>

function withChart(props: BulletChartProps, inspect: (chart: ReturnType<typeof init>) => void) {
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
  try {
    chart.setOption(createBulletOption({ ...props, animation: false }))
    chart.renderToSVGString()
    inspect(chart)
  } finally {
    chart.dispose()
  }
}

function missingLabel(chart: ReturnType<typeof init>, index = 0) {
  const model = (chart as any).getModel()
  return model
    .getSeriesByIndex(1)
    .getData()
    .getItemGraphicEl(index)
    ?.children()
    .find((item: any) => item.name === 'value-label-anchor')
    ?.getTextContent()
}

describe('bullet native data-item label baseline', () => {
  it('hides a valid row label above the inherited show setting', () => {
    withChart(
      {
        data: [{ name: 'A', value: 50, label: { show: false } }],
        label: { show: true },
      },
      chart => {
        const bar = (chart as any).getModel().getSeriesByIndex(0).getData().getItemGraphicEl(0)
        expect(bar.getTextContent()?.ignore !== false).toBe(true)
      },
    )
  })

  it('enables a valid row formatter above the inherited hidden setting', () => {
    withChart(
      {
        data: [
          { name: 'A', value: 50, label: { show: true, formatter: '{b}: {c}', color: '#ff0000' } },
        ],
        label: { show: false },
      },
      chart => {
        const label = (chart as any)
          .getModel()
          .getSeriesByIndex(0)
          .getData()
          .getItemGraphicEl(0)
          .getTextContent()
        expect(label.ignore).toBe(false)
        expect(label.style.text).toBe('A: 50')
        expect(label.style.fill).toBe('#ff0000')
      },
    )
  })
})

describe('bullet data-item label contract for missing measurements', () => {
  it('allows a missing row to hide the inherited label', () => {
    withChart(
      {
        data: [{ name: 'Offline', value: null, label: { show: false } }],
        label: { show: true },
      },
      chart => {
        expect(missingLabel(chart) != null).toBe(false)
      },
    )
  })

  it('allows a missing row to enable its own label', () => {
    withChart(
      {
        data: [{ name: 'Offline', value: null, label: { show: true, formatter: 'Offline' } }],
        label: { show: false },
      },
      chart => {
        expect(missingLabel(chart)?.style.text).toBe('Offline')
      },
    )
  })

  it('uses row formatter and style above the inherited label configuration', () => {
    withChart(
      {
        data: [
          { name: 'Offline', value: null, label: { formatter: 'Row status', color: '#ff0000' } },
        ],
        label: { show: true, formatter: 'Series status', color: '#0000ff' },
      },
      chart => {
        const label = missingLabel(chart)
        expect.soft(label?.style.text).toBe('Row status')
        expect.soft(label?.style.fill).toBe('#ff0000')
      },
    )
  })

  it.each([NaN, Infinity, -Infinity])('normalizes %s in both formatter value and data', value => {
    const formatter = vi.fn<LabelFormatter>(() => 'Offline')
    const data = { name: 'Offline', value, target: 80, missingReason: 'Collection failed' }
    withChart({ data: [data], label: { show: true, formatter } }, () => {
      expect(formatter).toHaveBeenCalled()
      for (const [params] of formatter.mock.calls) {
        expect(params.value).toBeNull()
        expect(params.data).toMatchObject({ ...data, value: null })
      }
      // Normalization must not replace the caller's original measurement.
      expect(Object.is(data.value, value)).toBe(true)
    })
  })
})

describe('bullet missing-label rendering updates', () => {
  it('formats a missing label only for the layer that displays it', () => {
    const formatter = vi.fn<LabelFormatter>(() => 'Offline')
    withChart(
      { data: [{ name: 'A', value: null, target: 80 }], label: { show: true, formatter } },
      chart => {
        expect(missingLabel(chart)?.style.text).toBe('Offline')
        expect(formatter).toHaveBeenCalledOnce()
      },
    )
  })

  it('adds and removes row labels across merged updates', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    const update = createPlotUpdater(true)
    const apply = (show: boolean) => {
      const { setOptionOpts, ...option } = update(
        createBulletOption({
          data: [{ name: 'A', value: null, label: { show, formatter: 'Offline' } }],
          label: { show: true },
          animation: false,
        }),
      )!
      chart.setOption(option, setOptionOpts)
      chart.renderToSVGString()
    }
    try {
      apply(false)
      expect(missingLabel(chart)).toBeUndefined()
      apply(true)
      expect(missingLabel(chart)?.style.text).toBe('Offline')
      apply(false)
      expect(missingLabel(chart)).toBeUndefined()
    } finally {
      chart.dispose()
    }
  })
})

describe('bullet tooltip color across native and custom series', () => {
  it.each([0, 1])('retains the native callback color when hovering row %i decorations', index => {
    const colors = ['#ff0000', '#00ff00']
    const option = createBulletOption({
      data: [
        { name: 'A', value: 40, target: 80 },
        { name: 'B', value: 60, target: 90 },
      ],
      itemStyle: { color: params => colors[params.dataIndex]! },
      animation: false,
    })
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(option)
      chart.renderToSVGString()
      const model = (chart as any).getModel()
      const formatter = (option.tooltip as any).formatter as (params: unknown) => string
      const getActualMarker = (series: number) => {
        const host = document.createElement('div')
        host.innerHTML = formatter(model.getSeriesByIndex(series).getDataParams(index))
        return host.querySelector<HTMLElement>('.charts-tooltips-item-border')?.style.background
      }
      const barColor = getActualMarker(0)
      const expected = document.createElement('span')
      expected.style.background = colors[index]!
      expect(barColor).toBe(expected.style.background)
      expect.soft(getActualMarker(1)).toBe(barColor)
      expect.soft(getActualMarker(2)).toBe(barColor)
    } finally {
      chart.dispose()
    }
  })
})

describe('bullet visual colors during zoom and shared-option reuse', () => {
  it('matches native colors by raw row index after category filtering and updates', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      for (const color of ['#ff0000', '#00ff00']) {
        const option = createBulletOption({
          data: [
            { name: 'A', value: 20 },
            { name: 'B', value: 50, target: 80 },
            { name: 'C', value: 70 },
          ],
          itemStyle: { color: params => (params.dataIndex === 1 ? color : '#0000ff') },
          dataZoom: { type: 'slider', yAxisIndex: 0, startValue: 1, endValue: 1 },
          animation: false,
        })
        chart.setOption(option)
        chart.renderToSVGString()
        const model = (chart as any).getModel()
        const formatter = (option.tooltip as any).formatter as (params: unknown) => string
        const markers = [0, 1, 2].map(index => {
          const params = model.getSeriesByIndex(index).getDataParams(0)
          expect(params.dataIndex).toBe(1)
          const host = document.createElement('div')
          host.innerHTML = formatter(params)
          return host.querySelector<HTMLElement>('.charts-tooltips-item-border')?.style.background
        })
        const expected = document.createElement('span')
        expected.style.background = color
        expect(markers).toEqual([
          expected.style.background,
          expected.style.background,
          expected.style.background,
        ])
      }
    } finally {
      chart.dispose()
    }
  })

  it('keeps colors local to each chart without rerunning user color callbacks for tooltips', () => {
    let color = '#ff0000'
    const callback = vi.fn(() => color)
    const option = createBulletOption({
      value: 50,
      target: 80,
      itemStyle: { color: callback },
      animation: false,
    })
    const charts = [0, 1].map(() =>
      init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 }),
    )
    try {
      charts[0]!.setOption(option)
      color = '#00ff00'
      charts[1]!.setOption(option)
      const calls = callback.mock.calls.length
      charts.forEach((chart, index) => {
        chart.renderToSVGString()
        const model = (chart as any).getModel()
        const formatter = (option.tooltip as any).formatter as (params: unknown) => string
        const expected = document.createElement('span')
        expected.style.background = index === 0 ? '#ff0000' : '#00ff00'
        for (const layer of [0, 1, 2]) {
          const host = document.createElement('div')
          host.innerHTML = formatter(model.getSeriesByIndex(layer).getDataParams(0))
          expect(
            host.querySelector<HTMLElement>('.charts-tooltips-item-border')?.style.background,
          ).toBe(expected.style.background)
        }
      })
      expect(callback.mock.calls).toHaveLength(calls)
    } finally {
      charts.forEach(chart => chart.dispose())
    }
  })
})
