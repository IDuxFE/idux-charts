import { graphic } from 'echarts/core'
import { expect, it, vi } from 'vitest'
import { createLineGeometryAdapter } from '../line/src/echartsLineGeometry'

it('falls back to native drawing for unknown elements and unsupported animation shapes', () => {
  const adapter = createLineGeometryAdapter()
  for (const unknown of [null, {}, { type: 'ec-polygon', shape: {} }, new graphic.Rect()]) {
    expect(adapter.path(unknown)).toBeUndefined()
  }
  const polygon = new graphic.Polygon()
  polygon.shape.points = []
  polygon.type = 'ec-polygon'
  const draw = vi.fn()
  polygon.buildPath = draw
  expect(adapter.path(polygon)).toBe(polygon)
  adapter.alignBaseline(polygon, true)
  const wrapped = polygon.buildPath
  adapter.alignBaseline(polygon, true)
  expect(polygon.buildPath).toBe(wrapped)
  for (const shape of [
    {},
    { points: null },
    { connectNulls: true, points: [0, 1], stackedOnPoints: {} },
    { connectNulls: true, points: [0, 1, NaN], stackedOnPoints: [0, 1, 2] },
    { connectNulls: true, points: [[0, 1]], stackedOnPoints: [[0, 1]] },
  ]) {
    polygon.buildPath({} as never, shape as never)
    expect(draw.mock.lastCall![1]).toBe(shape)
  }
  adapter.alignBaseline(polygon, false)
  expect(polygon.buildPath).toBe(draw)
  adapter.alignBaseline(polygon, false)
  expect(polygon.buildPath).toBe(draw)
})
