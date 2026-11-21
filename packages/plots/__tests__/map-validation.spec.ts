import { expect, it } from 'vitest'
import { createMapLines, createMapNodes, validateMapData } from '../map'
import type { MapCoordinate, MapDataInput } from '../map'

it('reports record identities and missing endpoints without changing input or rendering policy', () => {
  const input: MapDataInput = {
    nodes: [
      { id: 'valid', name: 'Valid', coordinate: [0, 0] },
      { id: 'invalid', name: 'Invalid', coordinate: [NaN, 0] },
    ],
    routes: [
      { id: 'missing', source: 'valid', target: 'absent' },
      { id: 'bad-coordinate', source: 'valid', target: 'invalid' },
      {
        id: 'standalone',
        from: 'A',
        to: 'B',
        coords: [
          [1, 2],
          [Infinity, 3],
        ],
      },
      { id: 'valid', source: 'valid', target: 'valid' },
    ],
  }
  Object.freeze(input.nodes![0])
  expect(validateMapData(input)).toEqual([
    { kind: 'node', index: 1, id: 'invalid', code: 'invalid-coordinate' },
    { kind: 'route', index: 0, id: 'missing', code: 'missing-node', nodeId: 'absent' },
    { kind: 'route', index: 1, id: 'bad-coordinate', code: 'invalid-coordinate' },
    { kind: 'route', index: 2, id: 'standalone', code: 'invalid-coordinate' },
  ])
  expect(createMapNodes(input.nodes!).data).toHaveLength(1)
  expect(createMapLines(input.routes!, { nodes: input.nodes }).data).toHaveLength(1)
  expect(Number.isNaN(input.nodes![1]!.coordinate[0])).toBe(true)
})

it('reports duplicates, supports unnamed routes, and accepts finite coordinates beyond geographic bounds', () => {
  const node = { id: 'a', name: 'A', coordinate: [1000, -1000] as [number, number] }
  expect(validateMapData({ nodes: [node], routes: [{ source: 'a', target: 'a' }] })).toEqual([])
  expect(
    validateMapData({
      nodes: [node, node],
      routes: [
        { id: 'r', source: 'a', target: 'a' },
        { id: 'r', source: 'x', target: 'x' },
      ],
      regions: [{ region: 'A' }, { region: 'A' }],
    }),
  ).toEqual([
    { kind: 'node', index: 1, id: 'a', code: 'duplicate-id' },
    { kind: 'route', index: 1, id: 'r', code: 'duplicate-id' },
    { kind: 'route', index: 1, id: 'r', code: 'missing-node', nodeId: 'x' },
    { kind: 'region', index: 1, id: 'A', code: 'duplicate-id' },
  ])
  expect(validateMapData({})).toEqual([])
})

it('rejects sparse coordinate pairs instead of passing holes to ECharts', () => {
  const coordinate: number[] = []
  coordinate.length = 2
  const nodes = [{ id: 'sparse', name: 'Sparse', coordinate: coordinate as [number, number] }]
  expect(validateMapData({ nodes })).toEqual([
    { kind: 'node', index: 0, id: 'sparse', code: 'invalid-coordinate' },
  ])
  expect(createMapNodes(nodes).data).toEqual([])
  const coords: MapCoordinate[] = []
  coords.length = 2
  const routes = [{ from: 'A', to: 'B', coords: coords as [MapCoordinate, MapCoordinate] }]
  expect(validateMapData({ routes })).toEqual([
    { kind: 'route', index: 0, code: 'invalid-coordinate', id: undefined },
  ])
  expect(createMapLines(routes).data).toEqual([])
})
