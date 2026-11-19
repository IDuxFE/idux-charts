import type { DefaultLabelFormatterCallbackParams } from 'echarts'
import type { BarSeriesOption } from 'echarts/charts'
import type { ChartProps } from '@idux/charts-core'
import { BarChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { init, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { describe, expect, it } from 'vitest'

import { withBarLabels } from '../bar/src/barLabel'

function format(bar: BarSeriesOption, dataIndex: number) {
  const formatter = bar.label?.formatter
  if (typeof formatter !== 'function') throw new Error('Expected label formatter')
  return formatter({ dataIndex } as DefaultLabelFormatterCallbackParams)
}

const defaults = (bars: BarSeriesOption[], horizontal = false) =>
  withBarLabels(bars, horizontal, () => undefined)

describe('bar label defaults', () => {
  it.each([false, true])(
    'renders stack totals and moves them after hiding the last series (horizontal: %s)',
    horizontal => {
      use([BarChart, GridComponent, LegendComponent, SVGRenderer])
      const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 300 })
      try {
        chart.setOption({
          animation: false,
          legend: {},
          xAxis: horizontal
            ? { type: 'value', show: false }
            : { type: 'category', data: ['A', 'B'], show: false },
          yAxis: horizontal
            ? { type: 'category', data: ['A', 'B'], show: false }
            : { type: 'value', show: false },
          series: withBarLabels(
            [
              { type: 'bar', name: 'First', stack: 'total', data: [12, 8] },
              { type: 'bar', name: 'Last', stack: 'total', data: [23, null] },
            ],
            horizontal,
            () => chart.getOption().legend as ChartProps['legend'],
          ),
        })
        const texts = () => {
          const svg = new DOMParser().parseFromString(chart.renderToSVGString(), 'image/svg+xml')
          return [...svg.querySelectorAll('text')].map(item => item.textContent)
        }
        expect(texts()).toEqual(expect.arrayContaining(['35', '8']))
        expect(texts()).not.toContain('12')
        chart.dispatchAction({ type: 'legendUnSelect', name: 'Last' })
        expect(texts()).toEqual(expect.arrayContaining(['12', '8']))
        expect(texts()).not.toContain('35')
      } finally {
        chart.dispose()
      }
    },
  )

  it.each([false, true])(
    'labels basic bars and hides grouped bars (horizontal: %s)',
    horizontal => {
      const position = horizontal ? 'right' : 'top'
      expect(defaults([{ data: [0, 2] }], horizontal)[0]?.label).toEqual({ show: true, position })
      expect(defaults([{ data: [1] }, { data: [2] }], horizontal).map(bar => bar.label)).toEqual([
        { show: false, position },
        { show: false, position },
      ])
    },
  )

  it.each([false, true])(
    'shows one stack total per category, including zeros and missing last segments (horizontal: %s)',
    horizontal => {
      const bars = defaults(
        [
          { stack: 'total', data: [2, 0, { value: '3' }, null, NaN] },
          { stack: 'total', data: [3, 0, null, null, Infinity] },
        ],
        horizontal,
      )
      expect(bars.map(bar => bar.label)).toMatchObject([
        { show: true, position: horizontal ? 'right' : 'top' },
        { show: true, position: horizontal ? 'right' : 'top' },
      ])
      expect([0, 1, 2, 3, 4].map(i => bars.map(bar => format(bar, i)))).toEqual([
        ['', '5'],
        ['', '0'],
        ['3', ''],
        ['', ''],
        ['', ''],
      ])
    },
  )

  it('recalculates totals and their owner when legend selection changes', () => {
    const selected = { B: true }
    const bars = withBarLabels(
      [
        { name: 'A', stack: 'total', data: [2] },
        { name: 'B', stack: 'total', data: [3] },
      ],
      false,
      () => ({ selected }),
    )
    expect(bars.map(bar => format(bar, 0))).toEqual(['', '5'])
    selected.B = false
    expect(bars.map(bar => format(bar, 0))).toEqual(['2', ''])
  })

  it('hides grouped stacks and keeps explicit label overrides without mutating inputs', () => {
    const input: BarSeriesOption[] = [
      { stack: 'a', data: [1], label: { show: true, color: 'red' } },
      { stack: 'b', data: [2] },
    ]
    const original = structuredClone(input)
    expect(defaults(input).map(bar => bar.label)).toEqual([
      { show: true, position: 'top', color: 'red' },
      { show: false, position: 'top' },
    ])
    expect(input).toEqual(original)
    const formatter = () => 'custom'
    expect(
      defaults([{ stack: 'a', label: { show: false, position: 'inside', formatter } }])[0]?.label,
    ).toEqual({ show: false, position: 'inside', formatter })
  })
})
