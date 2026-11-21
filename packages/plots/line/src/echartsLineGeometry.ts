import type { graphic } from 'echarts/core'

type LinePath = InstanceType<typeof graphic.Polygon>
type FlatPoints = number[] | Float32Array | Float64Array

function flatPoints(value: unknown): value is FlatPoints {
  return (
    (Array.isArray(value) || value instanceof Float32Array || value instanceof Float64Array) &&
    value.length % 2 === 0 &&
    (!value.length || typeof value[0] === 'number')
  )
}

/** Isolate ECharts 5/6 internal line geometry. Unknown versions keep native rendering. */
export function createLineGeometryAdapter() {
  const originals = new WeakMap<LinePath, LinePath['buildPath']>()
  return {
    path(element: unknown): LinePath | undefined {
      if (!element || typeof element !== 'object') return
      const path = element as LinePath
      if (
        (path.type !== 'ec-polyline' && path.type !== 'ec-polygon') ||
        !path.shape ||
        !flatPoints(path.shape.points) ||
        !['buildPath', 'dirtyShape', 'getClipPath', 'setClipPath', 'removeClipPath'].every(
          key => typeof (path as unknown as Record<string, unknown>)[key] === 'function',
        )
      )
        return
      return path
    },
    alignBaseline(path: LinePath, enabled: boolean) {
      const original = originals.get(path)
      if (!enabled) {
        if (original) {
          path.buildPath = original
          originals.delete(path)
          path.dirtyShape()
        }
        return
      }
      if (path.type !== 'ec-polygon' || original) return
      const buildPath = path.buildPath
      originals.set(path, buildPath)
      path.buildPath = (context, shape) => {
        // Animations can supply a new shape after registration. Validate every draw.
        const candidate = shape as unknown as Record<string, unknown>
        const { points, stackedOnPoints, connectNulls } = candidate
        if (
          !connectNulls ||
          !flatPoints(points) ||
          !flatPoints(stackedOnPoints) ||
          points.length !== stackedOnPoints.length
        ) {
          return buildPath.call(path, context, shape)
        }
        let baseline: FlatPoints | undefined
        for (let offset = 0; offset < points.length; offset += 2) {
          if (Number.isFinite(points[offset]) && Number.isFinite(points[offset + 1])) continue
          // Native stacked areas can fall back to the axis origin at missing top points.
          baseline ??= stackedOnPoints.slice()
          baseline[offset] = baseline[offset + 1] = NaN
        }
        buildPath.call(
          path,
          context,
          baseline ? ({ ...shape, stackedOnPoints: baseline } as typeof shape) : shape,
        )
      }
      path.dirtyShape()
    },
  }
}
