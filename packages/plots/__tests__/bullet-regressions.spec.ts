import { init } from 'echarts/core'
import { describe, expect, it } from 'vitest'
import { createBulletOption } from '../bullet'
import { createCategoryBarOption } from '../bar/src/createCategoryBarOption'

describe('Bullet native rendering regressions', () => {
  it('builds a gradient for a non-preset plot theme color', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({ value: 42, plotTheme: { color: '#123456' }, animation: false }),
      )
      const fill = (chart as any)
        .getModel()
        .getSeriesByIndex(0)
        .getData()
        .getItemVisual(0, 'style').fill
      expect(fill.colorStops).toEqual([
        { offset: 0, color: expect.any(String) },
        { offset: 1, color: '#123456' },
      ])
      expect(fill.colorStops[0].color).not.toBe('#123456')
      expect(chart.renderToSVGString()).toContain('linearGradient')
    } finally {
      chart.dispose()
    }
  })

  it('keeps the hover texture free of the native bar shadow during a real refresh', () => {
    const chart = init(document.createElement('div'), undefined, {
      renderer: 'svg',
      width: 500,
      height: 280,
    })
    try {
      chart.setOption(createBulletOption({ value: 42, animation: false }))
      const bar = (chart as any).getModel().getSeriesByIndex(0).getData().getItemGraphicEl(0)
      bar.useState('emphasis')
      chart.getZr().refreshImmediately()
      const decal = bar.getDecalElement()
      expect(decal).toBeDefined()
      expect(decal.style).toMatchObject({ shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0 })
      expect(bar.style.shadowBlur).toBeGreaterThan(0)
      bar.clearStates()
      chart.getZr().refreshImmediately()
      expect(bar.getDecalElement()).toBeNull()
    } finally {
      chart.dispose()
    }
  })

  it.each([0, 42])('keeps single segmented tracks visible for value %i', value => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 500, height: 280 })
    try {
      chart.setOption(
        createBulletOption({
          value,
          ranges: [{ upper: 30 }, { upper: 60 }],
          xAxis: { max: 100 },
          animation: false,
        }),
      )
      const group = (chart as any).getModel().getSeriesByIndex(1).getData().getItemGraphicEl(0)
      const tracks = group.children().filter((item: any) => item.name.startsWith('track-'))
      expect(tracks).toHaveLength(3)
      for (const track of tracks) expect(track.style.opacity).toBe(1)
    } finally {
      chart.dispose()
    }
  })

  it('keeps zero values available to above-layout tooltips', () => {
    const option = createBulletOption({
      data: [{ name: 'A', value: 0 }],
      layout: 'horizontal-above',
    })
    const formatter = (option.tooltip as any).formatter
    const tooltip = formatter({ dataIndex: 0 })
    expect(tooltip).toContain('实际值')
    expect(tooltip).toContain('0')
  })

  it.each([{}, { splitAreaColor: '#101112', borderColor: '#202122', textColor: '#303132' }])(
    'supports horizontal dark sliders with theme overrides %j',
    plotTheme => {
      const option = createBulletOption({
        data: [{ name: 'A', value: 42 }],
        darkMode: true,
        plotTheme,
        dataZoom: { type: 'slider', orient: 'horizontal', yAxisIndex: 0 },
      })
      expect(option.dataZoom).toEqual([
        expect.objectContaining({
          orient: 'horizontal',
          height: 16,
          bottom: 4,
          backgroundColor: plotTheme.splitAreaColor ?? '#171A1F',
          borderColor: plotTheme.borderColor ?? '#3C424D',
          handleStyle: { color: plotTheme.textColor ?? '#C2C7D1', borderColor: '#689FFF' },
        }),
      ])
    },
  )
})

it.each([
  [0, 280],
  [20, 0],
  [300, 264],
])(
  'bounds above-category labels before and after measuring container width %i',
  (width, expected) => {
    const { option } = createCategoryBarOption(
      { categories: ['A'], layout: 'horizontal-above' },
      { data: [42] },
      {},
      width!,
      {},
      false,
      () => undefined,
    )
    expect(option.yAxis).toMatchObject({ axisLabel: { width: expected } })
  },
)
