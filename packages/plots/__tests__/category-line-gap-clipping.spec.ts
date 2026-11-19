import { graphic, registerPostUpdate } from 'echarts/core'
import { describe, expect, it, vi } from 'vitest'

import { installCategoryLineGapClipping } from '../line/src/categoryLineGapClipping'
import { missingBandId } from '../line/src/categoryLineData'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  registerPostUpdate: vi.fn(),
}))

function fixture() {
  installCategoryLineGapClipping()
  const update = vi.mocked(registerPostUpdate).mock.lastCall![0]
  const line = new graphic.Polyline()
  line.type = 'ec-polyline'
  const polygon = new graphic.Polygon()
  polygon.type = 'ec-polygon'
  const unrelated = new graphic.Rect()
  const series = { option: { data: [1, null, null, 4], stack: 'total' } }
  let bands: object[] = []
  const view = {
    group: {
      traverse: (visit: (element: object) => void) => [line, polygon, unrelated].forEach(visit),
    },
  }
  const api = { getWidth: () => 100, getHeight: () => 60, getViewOfSeriesModel: vi.fn(() => view) }
  const model = {
    getSeriesByType: () => bands,
    eachRawSeriesByType: (_type: string, visit: (s: object) => void) => visit(series),
  }
  return {
    line,
    polygon,
    unrelated,
    series,
    api,
    setBands(slots: { index: number; x: number; width: number }[], maskLines = true) {
      bands = [
        {
          id: missingBandId,
          option: { maskLines },
          getData: () => ({
            mapDimension: () => 'x',
            get: (_dimension: string, index: number) => slots[index]!.index,
            eachItemGraphicEl: (visit: (el: object, index: number) => void) => {
              visit(new graphic.Circle(), 0)
              slots.forEach((slot, index) => visit(new graphic.Rect({ shape: slot }), index))
            },
          }),
        },
      ]
    },
    clearBands: () => {
      bands = []
    },
    update: () =>
      update(
        model as unknown as Parameters<typeof update>[0],
        api as unknown as Parameters<typeof update>[1],
      ),
  }
}

const paths = (line: InstanceType<typeof graphic.Polyline>) =>
  (line.getClipPath() as InstanceType<typeof graphic.CompoundPath>).shape.paths.map(
    path => path.shape,
  )

describe('category line gap clipping', () => {
  it('sorts visible bands and clips only missing samples, then clears stale clips after data updates', () => {
    const f = fixture()
    f.setBands([
      { index: 2, x: 60, width: 20 },
      { index: 1, x: 20, width: 20 },
      { index: 0, x: 0, width: 10 },
    ])
    f.update()
    expect(paths(f.line)).toMatchObject([
      { x: 0, width: 20, height: 60 },
      { x: 40, width: 20, height: 60 },
      { x: 80, width: 20, height: 60 },
    ])
    expect(f.unrelated.getClipPath()).toBeUndefined()
    f.series.option.data = [1, 2, 3, 4]
    f.update()
    expect(f.line.getClipPath()).toBeNull()
    expect(f.polygon.getClipPath()).toBeNull()
    f.series.option.data = [1, null, null, 4]
    f.update()
    expect(f.line.getClipPath()).toBeTruthy()
    f.clearBands()
    f.update()
    expect(f.line.getClipPath()).toBeNull()
    f.api.getViewOfSeriesModel.mockClear()
    f.update()
    expect(f.api.getViewOfSeriesModel).not.toHaveBeenCalled()
  })

  it('clips a fully missing window and removes clips when masking is disabled', () => {
    const f = fixture()
    f.setBands([{ index: 1, x: -20, width: 150 }])
    f.update()
    expect(paths(f.line)).toEqual([])
    f.setBands([], false)
    f.update()
    expect(f.line.getClipPath()).toBeNull()
    const ownClip = new graphic.Rect()
    f.line.setClipPath(ownClip)
    f.update()
    expect(f.line.getClipPath()).toBe(ownClip)
    f.api.getViewOfSeriesModel.mockReturnValueOnce(undefined as never)
    expect(() => f.update()).not.toThrow()
  })

  it('aligns missing stacked area vertices without changing source geometry or wrapping twice', () => {
    const f = fixture()
    const draw = vi.fn()
    f.polygon.buildPath = draw
    f.setBands([{ index: 1, x: 20, width: 20 }])
    f.update()
    const wrapped = f.polygon.buildPath
    f.update()
    expect(f.polygon.buildPath).toBe(wrapped)
    const baseline = new Float32Array([0, 50, 20, 50, 40, 50])
    const shape = {
      points: [0, 10, NaN, NaN, 40, 20],
      stackedOnPoints: baseline,
      connectNulls: true,
    }
    f.polygon.buildPath({} as never, shape as never)
    expect(Array.from(draw.mock.lastCall![1].stackedOnPoints)).toEqual([0, 50, NaN, NaN, 40, 50])
    expect(Array.from(baseline)).toEqual([0, 50, 20, 50, 40, 50])
    for (const unchanged of [
      { ...shape, connectNulls: false },
      { ...shape, points: [0, 10] },
      { ...shape, points: [0, 10, 20, 15, 40, 20] },
    ]) {
      f.polygon.buildPath({} as never, unchanged as never)
      expect(draw.mock.lastCall![1]).toBe(unchanged)
    }
  })
})

it('clears clipping if an existing series loses its data', () => {
  const f = fixture()
  f.setBands([{ index: 1, x: 20, width: 20 }])
  f.update()
  expect(f.line.getClipPath()).toBeTruthy()
  f.series.option.data = undefined as never
  f.update()
  expect(f.line.getClipPath()).toBeNull()
})
