import type { MapCoordinate, MapDataInput, MapDataIssue, MapNodeItem, MapRouteItem } from './types'

export function validMapCoordinate(coord: unknown): coord is MapCoordinate {
  return (
    Array.isArray(coord) &&
    coord.length === 2 &&
    [coord[0], coord[1]].every(value => typeof value === 'number' && Number.isFinite(value))
  )
}

export function resolveMapRoute(item: MapRouteItem, nodes: ReadonlyMap<string, MapNodeItem>) {
  const coords =
    item.coords ??
    (item.source !== undefined && item.target !== undefined
      ? [nodes.get(item.source)?.coordinate, nodes.get(item.target)?.coordinate]
      : undefined)
  return coords?.length === 2 && validMapCoordinate(coords[0]) && validMapCoordinate(coords[1])
    ? (coords as [MapCoordinate, MapCoordinate])
    : undefined
}

/** Inspect generator inputs without mutating them, logging, or changing rendering policy. */
export function validateMapData({
  nodes = [],
  routes = [],
  regions = [],
}: MapDataInput): MapDataIssue[] {
  const issues: MapDataIssue[] = []
  const indexed = new Map<string, MapNodeItem>()
  nodes.forEach((node, index) => {
    if (indexed.has(node.id))
      issues.push({ kind: 'node', index, id: node.id, code: 'duplicate-id' })
    indexed.set(node.id, node)
    if (!validMapCoordinate(node.coordinate))
      issues.push({ kind: 'node', index, id: node.id, code: 'invalid-coordinate' })
  })
  const routeIds = new Set<string>()
  routes.forEach((route, index) => {
    if (route.id !== undefined) {
      if (routeIds.has(route.id))
        issues.push({ kind: 'route', index, id: route.id, code: 'duplicate-id' })
      routeIds.add(route.id)
    }
    const missing = [route.source, route.target].filter(
      (id): id is string => id !== undefined && !indexed.has(id),
    )
    if (missing.length) {
      for (const nodeId of new Set(missing))
        issues.push({ kind: 'route', index, id: route.id, code: 'missing-node', nodeId })
    } else if (!resolveMapRoute(route, indexed)) {
      issues.push({ kind: 'route', index, id: route.id, code: 'invalid-coordinate' })
    }
  })
  const regionNames = new Set<string>()
  regions.forEach((region, index) => {
    if (regionNames.has(region.region))
      issues.push({ kind: 'region', index, id: region.region, code: 'duplicate-id' })
    regionNames.add(region.region)
  })
  return issues
}
