import { convertArray } from '@idux/charts-core'
import { init } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'
import { createCategoryBarOption } from '../bar/src/createCategoryBarOption'
import { createBulletOption } from '../bullet'
import { bindCategoryLabelTooltip } from '../shared/categoryLabel'

const name = `华东区域${'超长类别名称'.repeat(40)}<生产集群02>`
const bar = () =>
  createCategoryBarOption(
    { categories: [name], layout: 'horizontal' },
    { data: [50] },
    {},
    600,
    {},
    false,
    () => undefined,
  ).option

describe('long category labels', () => {
  it('reserves only the actual short-label width', () => {
    const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 600, height: 280 })
    try {
      const option = createBulletOption({ data: [{ name: '类别1', value: 50 }] })
      chart.setOption(option)
      const start = chart.convertToPixel({ xAxisIndex: 0 }, 0) as number
      expect(start).toBeLessThan(100)
      delete convertArray(option.yAxis)[0]!.axisLabel!.width
      chart.setOption(option, { notMerge: true })
      expect(chart.convertToPixel({ xAxisIndex: 0 }, 0)).toBeCloseTo(start)
    } finally {
      chart.dispose()
    }
  })
  it.each([bar, () => createBulletOption({ data: [{ name, value: 50 }] })])(
    'limits rendered labels without changing their source or collapsing the plot',
    build => {
      const option = build()
      expect(convertArray(option.yAxis)[0]).toMatchObject({
        data: [name],
        triggerEvent: true,
        axisLabel: { width: 186, overflow: 'truncate' },
      })
      const chart = init(null, undefined, { renderer: 'svg', ssr: true, width: 600, height: 280 })
      try {
        chart.setOption(option)
        const svg = chart.renderToSVGString()
        expect(svg).toContain('...')
        expect(svg).not.toContain(name)
        const start = chart.convertToPixel({ xAxisIndex: 0 }, 0) as number
        const end = chart.convertToPixel({ xAxisIndex: 0 }, 50) as number
        expect(start).toBeLessThan(300)
        expect(end - start).toBeGreaterThan(150)
      } finally {
        chart.dispose()
      }
    },
  )

  it.each([null, 0, 50])(
    'shows the raw category name for value %s and cleans up listeners',
    value => {
      const chart = init(document.createElement('div'), undefined, {
        renderer: 'svg',
        width: 600,
        height: 280,
      })
      try {
        chart.setOption(createBulletOption({ data: [{ name, value }], animation: false }))
        const dispatch = vi.spyOn(chart, 'dispatchAction').mockImplementation(() => undefined)
        const cleanup = bindCategoryLabelTooltip(chart)
        const event = {
          componentType: 'yAxis',
          componentIndex: 0,
          targetType: 'axisLabel',
          value: name,
          event: { offsetX: 50, offsetY: 60 },
        }
        chart.trigger('mouseover', event as never)
        expect(dispatch).toHaveBeenLastCalledWith(
          expect.objectContaining({
            type: 'showTip',
            x: 50,
            y: 60,
            tooltip: expect.objectContaining({ confine: true }),
          }),
        )
        const tooltip = dispatch.mock.calls[0]![0].tooltip as { formatter: () => string }
        const host = document.createElement('div')
        host.innerHTML = tooltip.formatter()
        expect(host.querySelector('.charts-tooltips-category')?.textContent).toBe(name)
        expect(host.querySelector('生产集群02')).toBeNull()
        chart.trigger('mouseout', event as never)
        expect(dispatch).toHaveBeenLastCalledWith({ type: 'hideTip' })
        cleanup()
        dispatch.mockClear()
        chart.trigger('mouseover', event as never)
        expect(dispatch).not.toHaveBeenCalled()
      } finally {
        chart.dispose()
      }
    },
  )

  it('preserves caller axis styling and hover opt-outs', () => {
    const axis = { triggerEvent: false, axisLabel: { width: 120, overflow: 'break' as const } }
    expect(createBulletOption({ data: [{ name, value: 1 }], yAxis: axis }).yAxis).toMatchObject(
      axis,
    )
    expect(
      createCategoryBarOption(
        { categories: [name], layout: 'horizontal' },
        { data: [1] },
        { yAxis: axis },
        600,
        {},
        false,
        () => undefined,
      ).option.yAxis,
    ).toMatchObject(axis)
  })
})
