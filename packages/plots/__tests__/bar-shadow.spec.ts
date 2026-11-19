import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { init, use } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import { describe, expect, it } from 'vitest'

import { installBarShadow, withBarShadows } from '../bar/src/barShadow'

use([BarChart, GridComponent, SVGRenderer, installBarShadow])

function render(horizontal: boolean, width: number, itemStyle?: BarSeriesOption['itemStyle']) {
  const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 300 })
  const option = (barWidth: number) =>
    withBarShadows({
      animation: false,
      xAxis: horizontal ? { type: 'value' } : { type: 'category', data: ['A', 'B'] },
      yAxis: horizontal ? { type: 'category', data: ['A', 'B'] } : { type: 'value' },
      series: [
        { type: 'bar', barWidth, data: [100, 1], itemStyle: { color: '#458FFF', ...itemStyle } },
      ],
    })
  chart.setOption(option(width))
  return {
    chart,
    resize: (barWidth: number) => chart.setOption(option(barWidth)),
    shadows: () => {
      const svg = new DOMParser().parseFromString(chart.renderToSVGString(), 'image/svg+xml')
      return [...svg.querySelectorAll('path[filter]')].map(path => {
        const id = path.getAttribute('filter')!.slice(5, -1)
        return svg.getElementById(id)!.querySelector('feDropShadow')!
      })
    },
  }
}

describe('bar shadows', () => {
  it.each([true, false])('fades around thin and short bars (horizontal: %s)', horizontal => {
    const { chart, resize, shadows } = render(horizontal, 6)
    try {
      const thin = shadows()
      expect(thin).toHaveLength(2)
      expect(Number(thin[0]!.getAttribute('stdDeviation')!.split(' ')[0])).toBeCloseTo(1.8)
      for (const shadow of thin) {
        expect(shadow.getAttribute('dx')).toBe('0')
        expect(shadow.getAttribute('dy')).toBe('0')
        expect(shadow.getAttribute('flood-color')).toBe('rgb(69,143,255)')
        expect(shadow.getAttribute('flood-opacity')).toBe('0.16')
      }
      expect(Number(thin[1]!.getAttribute('stdDeviation')!.split(' ')[0])).toBeLessThan(1.8)
      resize(20)
      expect(Number(shadows()[0]!.getAttribute('stdDeviation')!.split(' ')[0])).toBe(6)
    } finally {
      chart.dispose()
    }
  })

  it('preserves explicit shadow overrides', () => {
    const { chart, shadows } = render(false, 6, {
      shadowBlur: 4,
      shadowOffsetX: 2,
      shadowOffsetY: 3,
      shadowColor: 'rgba(255,0,0,0.4)',
    })
    try {
      for (const shadow of shadows()) {
        expect(shadow.getAttribute('stdDeviation')).toBe('2 2')
        expect(shadow.getAttribute('dx')).toBe('2')
        expect(shadow.getAttribute('dy')).toBe('3')
        expect(shadow.getAttribute('flood-color')).toBe('rgb(255,0,0)')
        expect(shadow.getAttribute('flood-opacity')).toBe('0.4')
      }
    } finally {
      chart.dispose()
    }
  })
})
