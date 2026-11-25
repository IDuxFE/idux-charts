import { init } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import { createBulletOption } from '../bullet'
import { applyLegacyRangeLabels } from '../bullet/src/legacyRangeLabels'

// Exercise the version-detection seam; the packed consumer matrix also runs ECharts 5.
vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  version: '5.4.3',
}))

describe('ECharts 5 Bullet range labels', () => {
  it('automatically replaces unsupported native custom tick labels with rendered labels', () => {
    const option = createBulletOption({
      data: [{ name: 'A', value: 42 }],
      ranges: [{ upper: 30 }, { upper: 100 }],
      animation: false,
      xAxis: { axisLabel: { formatter: 'Threshold {value}' } },
    })
    expect(option.xAxis).toMatchObject({ axisLabel: { show: false } })
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(option)
      const svg = chart.renderToSVGString()
      expect(svg).toContain('Threshold 30')
      expect(svg).toContain('Threshold 100')
    } finally {
      chart.dispose()
    }
  })

  it.each([undefined, { type: 'rect', shape: { x: 0, y: 0, width: 10, height: 10 } }])(
    'preserves a caller range renderer returning %j',
    rendered => {
      const option: any = {
        xAxis: { axisLabel: { customValues: [0, 100] } },
        series: [{ id: 'bullet-ranges', type: 'custom', renderItem: () => rendered }],
      }
      applyLegacyRangeLabels(option)
      expect(option.series[0].renderItem({}, {})).toBe(rendered)
    },
  )
})
