import { registerMap } from '../../map'

export const testMapName = 'ix-test-map'
export function registerTestMaps() {
  const geometry = {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: { name: 'A' },
        geometry: {
          type: 'Polygon' as const,
          coordinates: [
            [
              [0, 0],
              [30, 0],
              [30, 30],
              [0, 30],
              [0, 0],
            ],
          ],
        },
      },
    ],
  }
  registerMap(testMapName, geometry)
  registerMap(`${testMapName}-other`, geometry)
}
