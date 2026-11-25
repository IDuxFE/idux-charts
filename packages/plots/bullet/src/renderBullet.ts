import type { CustomSeriesOption } from 'echarts/charts'
import { color as echartsColor, graphic, helper } from 'echarts/core'
import { getAlphaColor } from '@idux/charts-core'
import { getLinearColors, LinearDirection } from '../../shared/linearColors'
import type { BulletModel } from './resolveBulletModel'
import { createBulletLabel } from './bulletLabel'
import { createBulletBar } from './bulletBar'
import type { BulletSeriesOption } from './types'
import { getBulletThickness, hasNativeBulletWidth } from './bulletLayout'

type BulletRenderItem = NonNullable<CustomSeriesOption['renderItem']>
type BulletGroup = Extract<NonNullable<ReturnType<BulletRenderItem>>, { type: 'group' }>
type BulletElement = BulletGroup['children'][number]
interface CartesianCoordinates {
  x: number
  y: number
  width: number
  height: number
}

const gradients = getLinearColors(LinearDirection.horizontal)
function lightColor(color: string) {
  const preset = gradients.find(gradient => gradient.colorStops[0]?.color === color)
  return preset?.colorStops[1]?.color ?? echartsColor.lift(color, 0.4)
}

/** Geometry follows the final ECharts axis; clipping never changes tooltip values. */
function clippedPosition(
  coord: CartesianCoordinates,
  api: Parameters<BulletRenderItem>[1],
  category: number,
) {
  return (value: number) =>
    Math.max(coord.x, Math.min(coord.x + coord.width, api.coord([value, category])[0]!))
}

export function createBulletSeries(model: BulletModel): BulletSeriesOption[] {
  const { props, grouped, rows, ranges, min, max, track, missingColor, text, allZero } = model
  const above = grouped && props.layout === 'horizontal-above'
  const hideZero = grouped && allZero && !above
  const label = createBulletLabel(model)
  // The two layers share geometry rules, but construct only their own graphics.
  const rowGeometry = (
    params: Parameters<BulletRenderItem>[0],
    api: Parameters<BulletRenderItem>[1],
  ) => {
    const row = rows[params.dataIndex]!
    const coord = params.coordSys as unknown as CartesianCoordinates
    let y = api.coord([min, params.dataIndex])[1]!
    // Above labels and right-hand values extend beyond the grid; filter rows explicitly.
    if ((above || label.show) && (y < coord.y || y > coord.y + coord.height)) return
    const x = coord.x,
      width = coord.width
    const band = Math.abs((api.size!([0, 1]) as number[])[1]!)
    const sparse = grouped && coord.height / band <= 3
    const customWidth = hasNativeBulletWidth(props)
    // Use the public layout helper so percentage parsing stays with ECharts.
    const widthInPixels = (width: number | string | undefined) =>
      typeof width === 'string'
        ? width === 'auto'
          ? undefined
          : helper.getLayoutRect({ width }, { width: band, height: 0 }).width
        : width
    const nativeWidth = customWidth
      ? api.barLayout({
          count: 1,
          barWidth: widthInPixels(props.barWidth),
          barMinWidth: widthInPixels(props.barMinWidth ?? 1),
          barMaxWidth: widthInPixels(props.barMaxWidth),
        })?.[0]?.width
      : undefined
    const thickness = nativeWidth ?? getBulletThickness(grouped, band, coord.height)
    const trackThickness = thickness * (sparse && !customWidth ? 1.5 : 2)
    // Center the combined label and track within each category band.
    if (above) y += Math.min(10, band / 6)
    // Use the final axis (including native bounds and inverse), then clip in pixel space.
    const position = clippedPosition(coord, api, params.dataIndex)
    const reversed = api.coord([min, params.dataIndex])[0]! > api.coord([max, params.dataIndex])[0]!
    const trackStart = reversed ? x + width : x
    const trackEnd = reversed ? x : x + width
    const rect = (
      left: number,
      right: number,
      height: number,
      fill: string | graphic.LinearGradient,
      opacity = 1,
    ) => ({
      type: 'rect' as const,
      transition: ['shape' as const, 'style' as const],
      shape: {
        x: Math.min(left, right),
        y: y - height / 2,
        width: Math.abs(right - left),
        height,
      },
      style: { fill, opacity },
    })
    return { row, x, width, y, thickness, trackThickness, position, trackStart, trackEnd, rect }
  }
  const series: CustomSeriesOption = {
    id: 'bullet-decorations',
    z: 1,
    type: 'custom',
    coordinateSystem: 'cartesian2d',
    clip: !above && !label.show,
    dimensions: ['value', 'category', 'target'],
    encode: { x: 0, y: 1 },
    data: rows.map(({ actualColor: _actualColor, targetColor: _targetColor, ...row }, index) => ({
      ...row,
      value: [row.value ?? min, index, row.target ?? null],
    })),
    renderItem: (params, api) => {
      const geometry = rowGeometry(params, api)
      if (!geometry) return
      const { row, x, width, y, thickness, trackThickness, position, trackStart, trackEnd, rect } =
        geometry
      const barSize = 0
      const barX = position(0)
      const children: BulletElement[] = []
      if (above) {
        children.push({
          type: 'text',
          name: 'category-label',
          style: {
            x,
            y: y - trackThickness / 2 - 2,
            text: row.name,
            width,
            overflow: 'truncate',
            fill: model.theme.secondaryTextColor ?? (model.dark ? '#A1A7B3' : '#6F7785'),
            fontSize: 12,
            fontFamily: model.theme.fontFamily,
            align: 'left',
            verticalAlign: 'bottom',
          },
        })
      }
      const missing = grouped && row.value === undefined
      if (missing) {
        children.push({
          ...rect(x, x + width, trackThickness, missingColor),
          name: 'missing',
        })
      }
      // Standard grouped all-zero charts keep axes and guides; above layouts retain tracks.
      if (row.value !== undefined || row.target !== undefined) {
        if (!missing) {
          if (!grouped && ranges.length) {
            ranges.forEach((range, index) =>
              children.push(
                rect(
                  index === 0 ? trackStart : position(ranges[index - 1]!.upper),
                  position(range.upper),
                  trackThickness,
                  getAlphaColor(range.color, 0.1),
                  hideZero ? 0 : 1,
                ),
              ),
            )
            const end = ranges[ranges.length - 1]!.upper
            if (position(end) !== trackEnd)
              children.push(rect(position(end), trackEnd, trackThickness, track, hideZero ? 0 : 1))
          } else children.push(rect(x, x + width, trackThickness, track, hideZero ? 0 : 1))
          let trackIndex = 0
          children.forEach(child => {
            if (!child.name) child.name = `track-${trackIndex++}`
          })
        }
        if (!grouped && allZero && props.zeroText)
          children.push({
            type: 'text',
            name: 'empty-label',
            style: {
              x: x + 8,
              y,
              text: props.zeroText,
              fill: text,
              font: api.font({ fontSize: 10, fontWeight: 'normal' }),
              lineHeight: 12,
              align: 'left',
              verticalAlign: 'middle',
            },
          })
      }
      if (!above && row.value === undefined) {
        const content = label.render(params)
        if (content) {
          const anchor = rect(barX, barX + barSize, thickness, 'transparent')
          children.push({ ...anchor, name: 'value-label-anchor', silent: true, ...content })
        }
      }
      return {
        type: 'group',
        originY: y,
        $mergeChildren: 'byName',
        children,
      }
    },
  }
  const rangeSeries: CustomSeriesOption = {
    id: 'bullet-ranges',
    type: 'custom',
    // Range guides span the whole grid and must survive category filtering.
    encode: { x: 0, y: -1 },
    silent: true,
    z: 0,
    data: ranges.length && grouped ? [[min, 0]] : [],
    renderItem: (params, api) => {
      const coord = params.coordSys as unknown as CartesianCoordinates
      const y = coord.y + coord.height
      const position = clippedPosition(coord, api, 0)
      return {
        type: 'group',
        $mergeChildren: 'byName',
        children: ranges.flatMap((range, index) => [
          {
            type: 'line' as const,
            name: `range-${index}-segment`,
            transition: ['shape', 'style'],
            shape: {
              x1: position(ranges[index - 1]?.upper ?? min),
              x2: position(range.upper),
              y1: y,
              y2: y,
            },
            style: { stroke: range.color, lineWidth: 2 },
          },
          {
            type: 'line' as const,
            name: `range-${index}-boundary`,
            transition: ['shape', 'style'],
            shape: {
              x1: position(range.upper),
              x2: position(range.upper),
              y1: coord.y,
              y2: y,
            },
            style: { stroke: range.color, lineWidth: 1, lineDash: [2, 3], opacity: 0.6 },
          },
        ]),
      }
    },
  }
  const targets: CustomSeriesOption = {
    ...series,
    id: 'bullet-targets',
    z: 3,
    renderItem: (params, api) => {
      const geometry = rowGeometry(params, api)
      if (!geometry) return
      const { row, y, thickness, position, rect } = geometry
      const children: BulletElement[] = []
      if (row.target !== undefined) {
        const fill = row.targetColor
        children.push({
          ...rect(
            position(row.target) - 0.5,
            position(row.target) + 0.5,
            thickness * 1.5,
            !grouped && ranges.length
              ? fill
              : new graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: lightColor(fill) },
                  { offset: 1, color: fill },
                ]),
            hideZero ? 0 : 1,
          ),
          name: 'target',
        })
      }
      return { type: 'group', originY: y, $mergeChildren: 'byName', children }
    },
  }
  // dataZoom previews the first series on its axis, so keep actual values first.
  return [createBulletBar(model), series, targets, rangeSeries]
}
