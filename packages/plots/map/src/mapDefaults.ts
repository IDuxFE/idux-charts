import type { MapPiece, MapThreshold } from './types'

/** Convert lower thresholds to native (lower, upper] pieces, ordered high to low. */
export function createMapPieces(
  thresholds: readonly MapThreshold[],
  options: { zeroColor?: string } = {},
): MapPiece[] {
  const sorted = [...thresholds].sort((a, b) => b.value - a.value)
  const seen = new Set<number>()
  for (const { value } of sorted) {
    if (!Number.isFinite(value) || seen.has(value)) {
      throw new Error('Map thresholds must be finite and unique')
    }
    seen.add(value)
  }
  const pieces: MapPiece[] = sorted.map(({ value, color }, index) => {
    const upper = sorted[index - 1]?.value
    return {
      gt: value,
      ...(upper !== undefined ? { lte: upper } : {}),
      label: upper === undefined ? `>${value}` : `(${value}, ${upper}]`,
      color,
    }
  })
  // Zero is a real count, rather than missing data. Keep its exact-match piece separate.
  const zero = sorted.find(item => item.value === 0)
  if (zero)
    pieces.splice(sorted.indexOf(zero) + 1, 0, {
      value: 0,
      label: '0',
      color: options.zeroColor ?? zero.color,
    })
  return pieces
}

export const defaultMapPieces: MapPiece[] = createMapPieces(
  [
    { value: 800, color: '#214EB0' },
    { value: 600, color: '#4089FF' },
    { value: 400, color: '#6BA5FF' },
    { value: 200, color: '#98C6FF' },
    { value: 0, color: '#BFDEFF' },
  ],
  { zeroColor: '#E5F2FF' },
)
