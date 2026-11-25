import { init } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import { createBulletOption } from '../bullet'
import { bindBulletHover } from '../bullet/src/bulletHover'
import { createBulletLabel } from '../bullet/src/bulletLabel'
import { resolveBulletModel } from '../bullet/src/resolveBulletModel'
import { applyLegacyRangeLabels } from '../bullet/src/legacyRangeLabels'
import { bindCategoryLabelTooltip } from '../shared/categoryLabel'

const params = { dataIndex: 0, seriesIndex: 1, seriesId: 'bullet-decorations' } as any

function textStyle(label: ReturnType<ReturnType<typeof createBulletLabel>['render']>) {
  const text = label?.textContent
  if (!text) throw new Error('Expected an attached label')
  return text.style
}

describe('Bullet label compatibility', () => {
  it.each([
    ['outside', 'right'],
    ['end', 'right'],
    ['start', 'left'],
    ['insideStart', 'insideLeft'],
    ['insideEnd', 'insideRight'],
    ['middle', 'inside'],
  ])('supports the native %s label position for missing-value anchors', (position, expected) => {
    const { model } = resolveBulletModel({
      data: [{ name: 'Offline', value: null }],
      label: { show: true, position: position as any, rotate: 30, color: 'inherit' },
    })
    const label = createBulletLabel(model!).render(params)!
    expect(label.textConfig).toMatchObject({ position: expected, rotation: Math.PI / 6 })
    expect(textStyle(label)?.text).toBe('–')
    expect(textStyle(label)?.fill).toBe(model!.rows[0]!.actualColor)
  })

  it('formats scalar labels and preserves explicit hiding', () => {
    const { model } = resolveBulletModel({ value: 42, label: { show: true } })
    expect(textStyle(createBulletLabel(model!).render(params))?.text).toBe('42')
    model!.props.label = { show: false }
    expect(createBulletLabel(model!).render(params)).toBeUndefined()
    model!.props.label = { show: true, formatter: '{b}: {c}' }
    expect(textStyle(createBulletLabel(model!).render(params))?.text).toBe(': 42')
  })

  it.each([false, true])(
    'respects legacy endpoint visibility, custom formatters and label colors (overlap: %s)',
    hideOverlap => {
      const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
      try {
        const option = createBulletOption({
          data: [{ name: 'A', value: 50 }],
          ranges: [{ upper: 50 }, { upper: 100 }],
          animation: false,
          xAxis: {
            axisLabel: {
              showMinLabel: false,
              showMaxLabel: false,
              hideOverlap,
              formatter: (value: number) => `Threshold ${value}`,
              color: () => '#ff0000',
            },
          },
        })
        applyLegacyRangeLabels(option)
        chart.setOption(option)
        const svg = chart.renderToSVGString()
        expect(svg).toContain('Threshold 50')
        expect(svg).not.toContain('Threshold 0')
        expect(svg).not.toContain('Threshold 100')
        expect(svg).toContain('#ff0000')
        // Removing the custom range series is a supported native takeover.
        expect(() => applyLegacyRangeLabels({ series: [{ type: 'bar', data: [1] }] })).not.toThrow()
      } finally {
        chart.dispose()
      }
    },
  )

  it('clips legacy label ticks outside the visible numeric scale', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      const option = createBulletOption({
        data: [{ name: 'A', value: 50 }],
        ranges: [{ upper: 100 }],
        animation: false,
        xAxis: { axisLabel: { customValues: [-100, 0, 50, 100, 200], formatter: undefined } },
      })
      applyLegacyRangeLabels(option)
      chart.setOption(option)
      const svg = chart.renderToSVGString()
      expect(svg).not.toContain('>-100<')
      expect(svg).not.toContain('>200<')
      expect(svg).toContain('>50<')
    } finally {
      chart.dispose()
    }
  })
})

describe('category label tooltip event boundaries', () => {
  it('ignores unrelated/incomplete events and respects native tooltip opt-outs', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 280,
    })
    try {
      chart.setOption(
        createBulletOption({ data: [{ name: '<Offline>', value: null }], animation: false }),
      )
      const dispatch = vi.spyOn(chart, 'dispatchAction').mockImplementation(() => undefined)
      const cleanup = bindCategoryLabelTooltip(chart)
      const event = {
        componentType: 'yAxis',
        targetType: 'axisLabel',
        value: '<Offline>',
        event: { offsetX: 20, offsetY: 30 },
      }
      for (const input of [
        {},
        { ...event, componentType: 'series' },
        { ...event, targetType: 'axisName' },
        { ...event, value: null },
        { ...event, event: undefined },
        { ...event, event: { offsetX: 20 } },
      ])
        chart.trigger('mouseover', input as never)
      expect(dispatch).not.toHaveBeenCalled()
      chart.setOption({ yAxis: { tooltip: { show: true } } })
      chart.trigger('mouseover', event as never)
      expect(dispatch).not.toHaveBeenCalled()
      chart.setOption({ yAxis: { tooltip: { show: false }, triggerEvent: false } })
      chart.trigger('mouseover', event as never)
      expect(dispatch).not.toHaveBeenCalled()
      chart.setOption({ yAxis: { triggerEvent: true }, tooltip: { renderMode: 'richText' } })
      chart.trigger('mouseover', event as never)
      const action = dispatch.mock.calls.at(-1)![0] as any
      expect(action.tooltip.formatter()).toBe('<Offline>')
      cleanup()
      expect(dispatch).toHaveBeenLastCalledWith({ type: 'hideTip' })
      chart.dispose()
      expect(cleanup).not.toThrow()
    } finally {
      if (!chart.isDisposed()) chart.dispose()
    }
  })
})

describe('Bullet native configuration boundaries', () => {
  it('keeps native series takeover for invalid generated scales and non-slider zoom', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      const native = [{ type: 'bar' as const, data: [1, 2] }]
      const invalid = createBulletOption({ xAxis: { min: 100, max: 0 }, series: native })
      expect(invalid.series).toEqual(native)
      expect(invalid.xAxis).toEqual({ min: 100, max: 0 })
      const zoom = { type: 'inside' as const, yAxisIndex: 0, start: 10, end: 60 }
      expect(
        createBulletOption({ data: [{ name: 'A', value: 42 }], dataZoom: zoom }).dataZoom,
      ).toEqual([zoom])
    } finally {
      warn.mockRestore()
    }
  })

  it('handles empty or stale tooltip parameters and missing targets', () => {
    const option = createBulletOption({ data: [{ name: 'A', value: 42 }] })
    const format = (option.tooltip as any).formatter
    expect(format([])).toBe('')
    expect(format({ dataIndex: 99 })).toBe('')
    expect(format({ dataIndex: 0 })).toContain('42')
    expect(format({ dataIndex: 0 })).not.toContain('目标值')
  })

  it('delegates auto width to ECharts while retaining visible tracks and custom-color targets', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          data: [{ name: 'A', value: 42, target: 80 }],
          barWidth: 'auto',
          targetColor: '#123456',
          itemStyle: { color: '#123456' },
          animation: false,
        }),
      )
      const svg = chart.renderToSVGString()
      expect(svg).toContain('#123456')
      expect(svg).not.toContain('NaN')
      const model = (chart as any).getModel()
      expect(model.getSeriesByIndex(0).getData().getItemLayout(0).height).toBeGreaterThan(0)
      expect(model.getSeriesByIndex(1).getData().getItemGraphicEl(0).children()).not.toHaveLength(0)
    } finally {
      chart.dispose()
    }
  })
})

describe('Bullet global extensions do not interfere with native charts', () => {
  it('leaves unrelated hover events and range guides alone', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 280,
    })
    try {
      chart.setOption(createBulletOption({ value: 42, target: 85, animation: false }))
      // The component's hover adapter must ignore axes, unrelated series and events without a row.
      bindBulletHover(chart)
      const dispatch = vi.spyOn(chart, 'dispatchAction').mockImplementation(() => undefined)
      for (const event of [
        {},
        { seriesId: 'unrelated', dataIndex: 0 },
        { seriesId: 'bullet-ranges', dataIndex: 0 },
        { seriesId: 'bullet' },
      ]) {
        chart.trigger('mouseover', event as never)
        chart.trigger('mouseout', event as never)
      }
      expect(dispatch).not.toHaveBeenCalled()
    } finally {
      chart.dispose()
    }
  })

  it('preserves native custom-series colors when no Bullet bar is present', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption({
        animation: false,
        series: [
          {
            id: 'bullet-decorations',
            type: 'custom',
            coordinateSystem: 'none',
            data: [1],
            itemStyle: { color: '#123456' },
            renderItem: () => ({
              type: 'rect',
              shape: { x: 10, y: 10, width: 40, height: 30 },
              style: { fill: '#123456' },
            }),
          },
        ],
      })
      expect(chart.renderToSVGString()).toContain('#123456')
      expect(
        (chart as any).getModel().getSeriesByIndex(0).getData().getItemVisual(0, 'style').fill,
      ).toBe('#123456')
    } finally {
      chart.dispose()
    }
  })
})

describe('Bullet viewport clipping', () => {
  it('does not draw above-track categories or targets outside an unfiltered zoom window', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          layout: 'horizontal-above',
          data: Array.from({ length: 5 }, (_, i) => ({
            name: `Row${i}`,
            value: 40 + i,
            target: 80,
          })),
          darkMode: true,
          animation: false,
          dataZoom: {
            type: 'inside',
            yAxisIndex: 0,
            startValue: 2,
            endValue: 3,
            filterMode: 'none',
          },
        }),
      )
      const svg = chart.renderToSVGString()
      expect(svg).toContain('Row2')
      expect(svg).toContain('Row3')
      for (const name of ['Row0', 'Row1', 'Row4']) expect(svg).not.toContain(name)
      const model = (chart as any).getModel()
      for (const layer of [1, 2]) {
        expect(model.getSeriesByIndex(layer).getData().getItemGraphicEl(0)).toBeUndefined()
        expect(model.getSeriesByIndex(layer).getData().getItemGraphicEl(2)).toBeDefined()
      }
    } finally {
      chart.dispose()
    }
  })
})
