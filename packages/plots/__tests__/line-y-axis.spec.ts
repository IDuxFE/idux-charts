import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { describe, expect, it } from 'vitest'
import { LineChart } from 'echarts/charts'
import { GraphicComponent, GridComponent } from 'echarts/components'
import { init, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import type { ChartProps } from '@idux/charts-core'
import { seerTheme } from '../../core/themes/seer'
import { createCategoryLineOption } from '../line/src/createCategoryLineOption'
import { alignLineYAxisNames } from '../line/src/lineYAxis'
import { useLineOption } from '../line/src/useLineOption'

use([LineChart, GraphicComponent, GridComponent, SVGRenderer])

for (const mode of ['native', 'category'] as const) {
  for (const margin of [undefined, 0, 16]) {
    it(`left-aligns the ${mode} line's right Y-axis name with long tick labels (margin=${margin})`, () => {
      const attrs = {
        animation: false,
        xAxis: { data: ['A', 'B'] },
        yAxis: [
          { name: '左', max: 400 },
          { name: 'Mbps', max: 400000, axisLabel: margin === undefined ? {} : { margin } },
        ],
        series: [{ data: [100, 200] }, { data: [200, 300], yAxisIndex: 1 }],
      }
      const before = structuredClone(attrs)
      let option!: ChartProps
      const wrapper = mount(
        defineComponent({
          setup() {
            option =
              mode === 'native'
                ? useLineOption({}, attrs).value
                : createCategoryLineOption(
                    { categories: ['A', 'B'] },
                    {},
                    attrs,
                    600,
                    {},
                    false,
                    () => undefined,
                  ).option
            return () => h('div')
          },
        }),
      )
      const chart = init(null, seerTheme, { renderer: 'svg', ssr: true, width: 600, height: 300 })
      try {
        chart.setOption({ ...option, legend: undefined, tooltip: undefined })
        const svg = new DOMParser().parseFromString(chart.renderToSVGString(), 'image/svg+xml')
        const texts = [...svg.querySelectorAll('text')]
        const right = texts.find(text => text.textContent === 'Mbps')!
        const left = texts.find(text => text.textContent === '左')!
        expect(right.getAttribute('text-anchor')).toBe('start')
        // Compare rendered positions so label width cannot hide a misplaced name.
        const x = (text: Element) =>
          Number(text.getAttribute('x') ?? 0) +
          Number(text.getAttribute('transform')?.match(/translate\(([-\d.]+)/)?.[1] ?? 0)
        const rightTick = texts
          .filter(text => text.textContent === '400,000')
          .sort((a, b) => x(b) - x(a))[0]!
        expect(rightTick.getAttribute('text-anchor')).toBe('start')
        expect(x(right)).toBeCloseTo(x(rightTick), 3)
        expect(left.getAttribute('text-anchor')).toBe('middle')
        expect(attrs).toEqual(before)
      } finally {
        chart.dispose()
        wrapper.unmount()
      }
    })
  }
}

describe('line Y-axis name defaults', () => {
  it('handles explicit positions and each grid independently', () => {
    const axes = alignLineYAxisNames([
      { position: 'right' },
      {},
      {},
      { gridIndex: 1 },
      { gridIndex: 1 },
      { position: 'left' },
    ])
    expect(axes.map(axis => axis.nameTextStyle?.align)).toEqual([
      'left',
      undefined,
      'left',
      undefined,
      'left',
      undefined,
    ])
    expect(alignLineYAxisNames({ position: 'right' }).nameTextStyle?.align).toBe('left')
  })

  it('preserves custom name styles, centered names and rotated names', () => {
    const custom = {
      position: 'right' as const,
      nameTextStyle: { align: 'right' as const, padding: [1, 2, 3, 4], color: 'red' },
    }
    expect(alignLineYAxisNames(custom)).toEqual(custom)
    for (const axis of [
      { position: 'right' as const, nameLocation: 'middle' as const },
      { position: 'right' as const, nameRotate: 90 },
    ]) {
      expect(alignLineYAxisNames(axis)).toEqual(axis)
    }
  })
})
