import { graphic, registerPostUpdate } from 'echarts/core'
import { expect, it, vi } from 'vitest'
import { createSingleAreaStripe, installSingleAreaStripe } from '../line/src/useLineChartAreaStripe'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerPostUpdate: vi.fn(),
}))

it('refits animated stripes on finished, cancels obsolete listeners and skips empty geometry', () => {
  installSingleAreaStripe()
  const update = vi.mocked(registerPostUpdate).mock.lastCall![0]
  const fill = createSingleAreaStripe('red').color
  const polygon = new graphic.Polygon({
    shape: {
      points: [
        [0, 20],
        [50, 20],
        [50, 80],
      ],
    },
  })
  polygon.type = 'ec-polygon'
  const dirty = vi.spyOn(polygon, 'dirtyStyle')
  const on = vi.fn()
  const off = vi.fn()
  let height = 100
  const api = {
    on,
    off,
    getHeight: () => height,
    getViewOfSeriesModel: () => ({
      group: {
        traverse: (visit: (el: object) => void) => {
          visit(new graphic.Rect())
          visit(polygon)
        },
      },
    }),
  }
  const series = { option: { areaStyle: { color: fill } } }
  const model = { eachSeriesByType: (_type: string, visit: (s: object) => void) => visit(series) }
  const run = () => update(model as never, api as never)
  run()
  expect(fill.imageHeight).toBe(100)
  expect(decodeURIComponent(fill.image)).toContain("y1='20' x2='0' y2='80'")
  expect(dirty).toHaveBeenCalledTimes(1)
  const first = on.mock.lastCall![1]
  run()
  expect(off).toHaveBeenCalledWith('finished', first)
  expect(dirty).toHaveBeenCalledTimes(1)
  height = 200
  on.mock.lastCall![1]()
  expect(fill.imageHeight).toBe(200)
  polygon.setShape({ points: [] })
  run()
  expect(fill.imageHeight).toBe(200)
  height = 0
  run()
  expect(fill.imageHeight).toBe(200)
  series.option.areaStyle.color = 'red' as never
  run()
  expect(on).toHaveBeenCalledTimes(4)
})
