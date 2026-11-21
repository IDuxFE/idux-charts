import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, reactive } from 'vue'
import { afterEach, expect, it, vi } from 'vitest'
import type { EChartsType } from 'echarts/core'
import { IxMapChart, createMapNodes } from '../map'
import { registerTestMaps, testMapName } from './fixtures/map'

registerTestMaps()
const wrappers: ReturnType<typeof mount>[] = []
afterEach(() => wrappers.splice(0).forEach(wrapper => wrapper.unmount()))

function setup(extra: Record<string, unknown> = {}) {
  const props = reactive<any>({
    geo: { id: 'base', map: testMapName },
    series: [
      createMapNodes([{ id: 'a', name: 'A', coordinate: [10, 10], value: 1 }], { id: 'nodes' }),
    ],
    ...extra,
  })
  const ready = vi.fn<(chart: EChartsType) => void>()
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(IxMapChart, {
          ...props,
          onReady: ready,
          autoResize: false,
          animation: false,
          initOption: { renderer: 'svg', width: 500, height: 400 },
        }),
    }),
  )
  wrappers.push(wrapper)
  return {
    props,
    wrapper,
    ready,
    get chart() {
      return ready.mock.lastCall![0]
    },
    get geo(): any[] {
      return this.chart.getOption().geo as any[]
    },
    roam(id = 'base') {
      this.chart.dispatchAction({
        type: 'geoRoam',
        geoId: id,
        dx: 20,
        dy: 10,
        zoom: 2,
        originX: 250,
        originY: 200,
      })
    },
  }
}

it('retains zoom and pan across refreshes, series removals and theme rebuilds', async () => {
  const item = setup()
  const original = item.chart
  item.roam()
  const viewport = { zoom: item.geo[0].zoom, center: [...item.geo[0].center] }
  expect(viewport.zoom).toBe(2)
  expect(viewport.center).not.toEqual([15, 15])
  item.props.series[0].data[0].mapValue = 2
  await nextTick()
  expect(item.geo[0]).toMatchObject(viewport)
  item.props.series = []
  await nextTick()
  expect(item.chart.getOption().series).toEqual([])
  expect(item.geo[0]).toMatchObject(viewport)
  expect(item.chart).toBe(original)
  item.props.theme = 'dark'
  await nextTick()
  expect(original.isDisposed()).toBe(true)
  expect(item.geo[0]).toMatchObject(viewport)
  item.wrapper.unmount()
  expect(item.chart.isDisposed()).toBe(true)
})

it.each([undefined, false])(
  'honors explicit viewport changes and map identity with notMerge=%s',
  async notMerge => {
    const item = setup({ setOptionOpts: { notMerge } })
    item.roam()
    item.props.geo = { id: 'base', map: testMapName, center: [10, 12], zoom: 1.5 }
    await nextTick()
    expect(item.geo[0]).toMatchObject({ center: [10, 12], zoom: 1.5 })
    item.roam()
    item.props.theme = 'dark'
    item.props.geo = { id: 'base', map: testMapName, center: [12, 14], zoom: 1.2 }
    await nextTick()
    expect(item.geo[0]).toMatchObject({ center: [12, 14], zoom: 1.2 })
    item.props.geo = { id: 'base', map: `${testMapName}-other` }
    await nextTick()
    expect(item.geo[0]).toMatchObject({ map: `${testMapName}-other`, zoom: 1 })
    item.roam()
    item.props.geo = { id: 'replacement', map: `${testMapName}-other` }
    await nextTick()
    expect(item.geo[0]).toMatchObject({ id: 'replacement', zoom: 1 })
  },
)

it('matches multiple viewports by id after reordering and clears removed regions', async () => {
  const item = setup({
    geo: [
      { id: 'base', map: testMapName, regions: [{ name: 'A', itemStyle: { areaColor: 'red' } }] },
      { id: 'second', map: testMapName, zoom: 1.5 },
    ],
  })
  item.roam()
  const center = [...item.geo[0].center]
  item.props.geo = [
    { id: 'second', map: testMapName, zoom: 1.5 },
    { id: 'base', map: testMapName },
  ]
  await nextTick()
  expect(item.geo[0]).toMatchObject({ id: 'second', zoom: 1.5 })
  expect(item.geo[1]).toMatchObject({ id: 'base', zoom: 2, center })
  expect(
    item.geo[1].regions.find((region: any) => region.name === 'A')?.itemStyle?.areaColor,
  ).toBeUndefined()
})

it('preserves anonymous geo state and removes obsolete native configuration', async () => {
  const item = setup({ geo: { map: testMapName }, setOptionOpts: { notMerge: false } })
  item.chart.dispatchAction({ type: 'geoRoam', geoIndex: 0, zoom: 2, originX: 250, originY: 200 })
  item.props.tooltip = { show: false }
  await nextTick()
  expect(item.geo[0].zoom).toBe(2)
  delete item.props.tooltip
  item.props.series = []
  await nextTick()
  expect(item.geo[0].zoom).toBe(2)
  expect(item.chart.getOption().series).toEqual([])
})
