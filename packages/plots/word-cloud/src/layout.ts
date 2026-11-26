export interface Box {
  x: number
  y: number
  width: number
  height: number
}
export interface CloudNode {
  index: number
  id: string
  value: number
  body: Box
  bounds: Box
  labels: Box[]
  circle: boolean
  rect?: boolean
  /** Motion may reserve container space without widening collision bounds. */
  viewportBounds?: Box
  /** Original background area, before reserving the motion envelope. */
  overlapArea?: number
}
export interface PlacedNode extends CloudNode {
  x: number
  y: number
}

const shifted = (box: Box, x: number, y: number): Box => ({ ...box, x: box.x + x, y: box.y + y })
const area = (box: Box) => box.width * box.height
function intersection(a: Box, b: Box, gap = 0) {
  return (
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) + gap) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) + gap)
  )
}
function boxCircle(box: Box, node: PlacedNode, gap: number) {
  const x = Math.max(box.x, Math.min(node.x, box.x + box.width))
  const y = Math.max(box.y, Math.min(node.y, box.y + box.height))
  return Math.hypot(x - node.x, y - node.y) < node.body.width / 2 + gap
}
export function cloudBackgroundsOverlap(a: PlacedNode, b: PlacedNode) {
  return intersection(shifted(a.body, a.x, a.y), shifted(b.body, b.x, b.y)) > 0
}

export function cloudNodesCollide(a: PlacedNode, b: PlacedNode, gap: number, overlap: number) {
  const ab = shifted(a.body, a.x, a.y),
    bb = shifted(b.body, b.x, b.y)
  if (a.circle && b.circle) {
    if (Math.hypot(a.x - b.x, a.y - b.y) < (a.body.width + b.body.width) / 2 + gap) return true
    return (
      a.labels.some(label => boxCircle(shifted(label, a.x, a.y), b, gap)) ||
      b.labels.some(label => boxCircle(shifted(label, b.x, b.y), a, gap)) ||
      a.labels.some(al =>
        b.labels.some(bl => intersection(shifted(al, a.x, a.y), shifted(bl, b.x, b.y), gap) > 0),
      )
    )
  }
  if (a.rect && b.rect) {
    const spacing = Math.max(8, gap)
    const width = Math.min(ab.x + ab.width, bb.x + bb.width) - Math.max(ab.x, bb.x)
    const height = Math.min(ab.y + ab.height, bb.y + bb.height) - Math.max(ab.y, bb.y)
    if (overlap === 0 || width <= 0 || height <= 0)
      return intersection(shifted(a.bounds, a.x, a.y), shifted(b.bounds, b.x, b.y), spacing) > 0
    // Reject touching slivers on either axis, even at a diagonal corner.
    if (
      width < 6 ||
      height < 6 ||
      width * height > Math.min(a.overlapArea ?? area(ab), b.overlapArea ?? area(bb)) * overlap
    )
      return true
    return false
  }
  if (overlap === 0)
    return intersection(shifted(a.bounds, a.x, a.y), shifted(b.bounds, b.x, b.y), gap) > 0
  if (
    intersection(ab, bb, gap) >
    Math.min(a.overlapArea ?? area(ab), b.overlapArea ?? area(bb)) * overlap
  )
    return true
  return (
    a.labels.some(label => intersection(shifted(label, a.x, a.y), bb, gap) > 0) ||
    b.labels.some(label => intersection(shifted(label, b.x, b.y), ab, gap) > 0) ||
    a.labels.some(al =>
      b.labels.some(bl => intersection(shifted(al, a.x, a.y), shifted(bl, b.x, b.y), gap) > 0),
    )
  )
}

/** Bounded deterministic placement. Sorting never changes caller data or raw indices. */
export function layoutCloud(nodes: CloudNode[], frame: Box, gap: number, overlap: number) {
  if (
    ![frame.x, frame.y, frame.width, frame.height].every(Number.isFinite) ||
    frame.width <= 0 ||
    frame.height <= 0
  )
    return []
  if (nodes.some(node => node.rect)) gap = Math.max(8, gap)
  const placed: PlacedNode[] = []
  const cells = new Map<string, PlacedNode[]>()
  const overlapCounts = new Map<PlacedNode, number>()
  const oversized: PlacedNode[] = []
  const cellSize = 64
  const keys = (box: Box) => {
    const left = Math.floor((box.x - gap) / cellSize)
    const right = Math.floor((box.x + box.width + gap) / cellSize)
    const top = Math.floor((box.y - gap) / cellSize)
    const bottom = Math.floor((box.y + box.height + gap) / cellSize)
    // Native dimensions and gaps may be very large. Fall back to a scan instead
    // of allocating unbounded buckets or looping past integer precision.
    if (
      ![left, right, top, bottom].every(Number.isSafeInteger) ||
      (right - left + 1) * (bottom - top + 1) > 4096
    )
      return
    const result: string[] = []
    for (let x = left; x <= right; x++) for (let y = top; y <= bottom; y++) result.push(`${x},${y}`)
    return result
  }
  const order = [...nodes].sort(
    (a, b) =>
      b.value - a.value ||
      area(b.bounds) - area(a.bounds) ||
      (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
  )
  const centerX = frame.x + frame.width / 2,
    centerY = frame.y + frame.height / 2
  for (const node of order) {
    const viewportBounds = node.viewportBounds ?? node.bounds
    if (
      ![node.body, node.bounds, viewportBounds, ...node.labels].every(
        box =>
          [box.x, box.y, box.width, box.height].every(Number.isFinite) &&
          box.width >= 0 &&
          box.height >= 0,
      ) ||
      viewportBounds.width > frame.width ||
      viewportBounds.height > frame.height
    )
      continue
    const tryPlace = (x: number, y: number) => {
      const box = shifted(node.bounds, x, y)
      const viewport = shifted(viewportBounds, x, y)
      if (
        viewport.x < frame.x ||
        viewport.y < frame.y ||
        viewport.x + viewport.width > frame.x + frame.width ||
        viewport.y + viewport.height > frame.y + frame.height
      )
        return false
      const candidate = { ...node, x, y }
      const bucketKeys = keys(box)
      const nearby = new Set(
        bucketKeys ? [...oversized, ...bucketKeys.flatMap(key => cells.get(key) ?? [])] : placed,
      )
      if ([...nearby].some(other => cloudNodesCollide(candidate, other, gap, overlap))) return false
      const partners =
        node.rect && overlap > 0
          ? [...nearby].filter(other => other.rect && cloudBackgroundsOverlap(candidate, other))
          : []
      // Limit each rectangle to two overlapping neighbors to avoid dense stacks.
      if (partners.length > 2 || partners.some(other => (overlapCounts.get(other) ?? 0) >= 2))
        return false
      overlapCounts.set(candidate, partners.length)
      for (const other of partners) overlapCounts.set(other, (overlapCounts.get(other) ?? 0) + 1)
      placed.push(candidate)
      if (!bucketKeys) oversized.push(candidate)
      for (const key of bucketKeys ?? []) {
        const bucket = cells.get(key) ?? []
        bucket.push(candidate)
        cells.set(key, bucket)
      }
      return true
    }
    if (tryPlace(centerX, centerY)) continue
    let done = false
    if (node.circle) {
      for (const anchor of placed.slice(-16)) {
        const radius = (node.body.width + anchor.body.width) / 2 + gap + 0.01
        for (let step = 0; step < 24; step++) {
          const angle = (step * Math.PI) / 12
          if (tryPlace(anchor.x + Math.cos(angle) * radius, anchor.y + Math.sin(angle) * radius)) {
            done = true
            break
          }
        }
        if (done) break
      }
    }
    if (done) continue
    // Six-pixel spiral pitch, with at most 5000 candidates per node.
    const aspect = Math.max(0.25, Math.min(4, frame.width / frame.height))
    for (let step = 1; step <= 5000; step++) {
      const angle = step * 0.28,
        radius = (angle * 6) / (2 * Math.PI)
      if (
        tryPlace(
          centerX + Math.cos(angle) * radius * Math.sqrt(aspect),
          centerY + (Math.sin(angle) * radius) / Math.sqrt(aspect),
        )
      )
        break
    }
  }
  return placed
}

export function cloudSize(
  value: number,
  min: number,
  max: number,
  range: [number, number],
  circle = false,
) {
  const t = max === 0 ? 0 : max === min ? 0.5 : (value - min) / (max - min)
  return circle
    ? Math.sqrt(range[0] ** 2 + t * (range[1] ** 2 - range[0] ** 2))
    : range[0] + t * (range[1] - range[0])
}

/** Scalar domain without the engine argument-count limit of Math.min(...values). */
export function cloudExtent(values: number[]): [number, number] {
  let min = Infinity
  let max = 0
  for (const value of values) {
    min = Math.min(min, value)
    max = Math.max(max, value)
  }
  return [values.length ? min : 0, max]
}
