import type { LineSeriesOption } from 'echarts/charts'
import { graphic, registerPostUpdate } from 'echarts/core'

import type { MissingBandSeries } from './categoryLineData'
import { measurement, missingBandId } from './categoryLineData'

type StackedAreaShape = {
  points: ArrayLike<number>
  stackedOnPoints: Float32Array | number[]
  connectNulls: boolean
}

function alignStackedAreaBaseline(polygon: InstanceType<typeof graphic.Polygon>) {
  const buildPath = polygon.buildPath.bind(polygon)
  polygon.buildPath = (context, shape) => {
    const { points, stackedOnPoints, connectNulls } = shape as typeof shape & StackedAreaShape
    let baseline: typeof stackedOnPoints | undefined
    if (connectNulls && points.length === stackedOnPoints.length) {
      for (let offset = 0; offset < points.length; offset += 2) {
        if (Number.isFinite(points[offset]) && Number.isFinite(points[offset + 1])) continue
        // ECharts falls back to the axis origin for the baseline at a missing top point.
        // Skip that point on both edges so adjacent fills meet at the same boundary.
        baseline ??= stackedOnPoints.slice()
        baseline[offset] = baseline[offset + 1] = NaN
      }
    }
    const drawShape = baseline ? { ...shape, stackedOnPoints: baseline } : shape
    buildPath(context, drawShape)
  }
  polygon.dirtyShape()
}

export function installCategoryLineGapClipping() {
  const appliedClips = new WeakSet<object>()
  const clippedCharts = new WeakSet<object>()
  const alignedPolygons = new WeakSet<object>()
  registerPostUpdate((model, api) => {
    const bands = model.getSeriesByType('custom').find(series => series.id === missingBandId)
    const slots: { index: number; x: number; width: number }[] = []
    if (bands && (bands.option as MissingBandSeries).maskLines) {
      const data = bands.getData()
      const xDimension = data.mapDimension('x')
      // Use the rendered band edges so clipping matches the shading after zooming.
      data.eachItemGraphicEl((element, dataIndex) => {
        if (element.type !== 'rect') return
        const { x, width } = (element as InstanceType<typeof graphic.Rect>).shape
        slots.push({ index: Number(data.get(xDimension, dataIndex)), x, width })
      })
      slots.sort((left, right) => left.x - right.x)
    }
    if (slots.length) {
      clippedCharts.add(api)
    } else {
      const wasClipped = clippedCharts.delete(api)
      if (!bands && !wasClipped) return
    }

    const width = api.getWidth()
    const height = api.getHeight()
    model.eachRawSeriesByType('line', series => {
      const view = api.getViewOfSeriesModel(series)
      if (!view) return
      const { data, stack } = series.option as LineSeriesOption
      const gaps = data ? slots.filter(slot => measurement(data[slot.index]) === undefined) : []
      view.group.traverse(element => {
        // Keep ECharts' own animation and grid clip on the parent line group.
        if (element.type !== 'ec-polyline' && element.type !== 'ec-polygon') return
        if (bands && stack && element.type === 'ec-polygon' && !alignedPolygons.has(element)) {
          alignStackedAreaBaseline(element as InstanceType<typeof graphic.Polygon>)
          alignedPolygons.add(element)
        }
        if (!gaps.length) {
          const clip = element.getClipPath()
          if (clip && appliedClips.has(clip)) element.removeClipPath()
          return
        }

        const paths: InstanceType<typeof graphic.Rect>[] = []
        let left = 0
        for (const gap of gaps) {
          const right = Math.min(gap.x, width)
          if (right > left)
            paths.push(new graphic.Rect({ shape: { x: left, width: right - left, height } }))
          left = Math.max(left, gap.x + gap.width)
        }
        if (width > left)
          paths.push(new graphic.Rect({ shape: { x: left, width: width - left, height } }))
        // An empty path clips the entire line when the visible window is all gaps.
        const clip = new graphic.CompoundPath({ shape: { paths } })
        appliedClips.add(clip)
        element.setClipPath(clip)
      })
    })
  })
}
