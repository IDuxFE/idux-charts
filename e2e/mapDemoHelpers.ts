import type { Locator } from '@playwright/test'
import { expect } from './helpers'

interface MapDemoState {
  map: string
  regionNames: string[]
  regions: { name: string; color?: string }[]
  series: {
    id: string
    data: {
      name: string
      mapValue?: number
      metrics?: { value: number }[]
      value?: number | (number | string)[]
    }[]
  }[]
}

export async function selectMapControl(demo: Locator, group: string, name: string) {
  const label = demo
    .locator(`[aria-label="${group}"] label`)
    .filter({ has: demo.page().getByText(name, { exact: true }) })
  await label.click()
  await expect(label.getByRole('radio')).toBeChecked()
}

export function readMapState(chart: Locator) {
  return chart.evaluate((element): MapDemoState | null => {
    const instance = window.getDemoChart(element as HTMLElement)
    // ECharts' live geo model establishes that the requested geometry was applied.
    const geo = (instance as any)?.getModel()?.getComponent('geo')
    if (!geo?.coordinateSystem) return null
    const option = instance!.getOption() as any
    return {
      map: geo.get('map') as string,
      regionNames: geo.coordinateSystem.regions.map((region: any) => region.name) as string[],
      regions: (option.geo[0].regions ?? [])
        .filter((region: any) => region.itemStyle?.areaColor)
        .map((region: any) => ({
          name: region.name as string,
          color: region.itemStyle?.areaColor as string | undefined,
        })),
      series: (option.series ?? []).map((series: any) => ({
        id: series.id as string,
        data: series.data as {
          name: string
          mapValue?: number
          metrics?: { value: number }[]
          value?: number | (number | string)[]
        }[],
      })),
    }
  })
}

export async function expectMapGeometry(chart: Locator, scope: 'china' | 'world') {
  await expect
    .poll(async () => {
      const state = await readMapState(chart)
      if (!state) return null
      return {
        map: state.map,
        china: state.regionNames.includes('四川省'),
        world: state.regionNames.includes('美国'),
        unmatched: state.regions
          .filter(region => !state.regionNames.includes(region.name))
          .map(region => region.name),
      }
    })
    .toEqual({ map: scope, china: scope === 'china', world: scope === 'world', unmatched: [] })
}
