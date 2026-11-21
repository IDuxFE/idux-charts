import { color } from 'echarts/core'
import type { LinearGradientObject } from 'echarts'
import { getLinearColor, LinearDirection } from '../../shared/linearColors'
import type { MapCoordinate, MapPiece } from './types'

/** Blend a 20% blue hover overlay while retaining the region's base fill. */
export function hoverColor(color: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return color
  return (
    '#' +
    [28, 78, 255]
      .map((channel, index) =>
        Math.round(parseInt(color.slice(index * 2 + 1, index * 2 + 3), 16) * 0.8 + channel * 0.2)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  )
}
export function densityLabelColor(color: string, fallback: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) return fallback
  const luminance = [0.299, 0.587, 0.114].reduce(
    (sum, weight, index) => sum + parseInt(color.slice(index * 2 + 1, index * 2 + 3), 16) * weight,
    0,
  )
  return luminance < 150 ? '#FFFFFF' : fallback
}
/** Match the native ECharts pin curves, with a consistent 7px white center. */
export function pinSymbol(fill: string, border: boolean) {
  const scale = 28 / 24.4
  const r = 8.4 * scale
  const dy = 3.6 * scale
  const cy = r
  const dx = Math.sqrt(r * r - dy * dy)
  const tangentX = dy / r
  const tangentY = dx / r
  const cp = r * 0.6
  const cp2 = r * 0.7
  const path = `M${14 - dx} ${cy + dy}A${r} ${r} 0 1 1 ${14 + dx} ${cy + dy}C${14 + dx - tangentX * cp} ${cy + dy + tangentY * cp} 14 ${28 - cp2} 14 28C14 ${28 - cp2} ${14 - dx + tangentX * cp} ${cy + dy + tangentY * cp} ${14 - dx} ${cy + dy}Z`
  const safeFill = fill.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  return `image://data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="${safeFill}"${border ? ' stroke="#FFFFFF" stroke-width="1"' : ''} d="${path}"/><circle cx="14" cy="${cy}" r="3.5" fill="#FFFFFF"/></svg>`,
  )}`
}
/** Use the dominant axis so curved paths retain the endpoint alpha values. */
export function lineGradient(
  coords: [MapCoordinate, MapCoordinate],
  lineColor: string,
): LinearGradientObject {
  const [[fromX, fromY], [toX, toY]] = coords
  const direction =
    Math.abs(toX - fromX) >= Math.abs(toY - fromY)
      ? toX >= fromX
        ? LinearDirection.horizontal
        : LinearDirection.reverseHorizontal
      : toY >= fromY
        ? LinearDirection.reverseVertical
        : LinearDirection.vertical
  return getLinearColor(color.modifyAlpha(lineColor, 0.2), lineColor, direction)
}

export function matchesMapPiece(value: number, piece: MapPiece) {
  if (piece.value !== undefined) return value === piece.value
  return (
    value >= (piece.min ?? -Infinity) &&
    value <= (piece.max ?? Infinity) &&
    value > (piece.gt ?? -Infinity) &&
    value >= (piece.gte ?? -Infinity) &&
    value < (piece.lt ?? Infinity) &&
    value <= (piece.lte ?? Infinity)
  )
}
