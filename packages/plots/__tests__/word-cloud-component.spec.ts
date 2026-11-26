import { mount } from '@vue/test-utils'
import { renderToString } from 'vue/server-renderer'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, reactive, ref } from 'vue'
import type { Component } from 'vue'
import type { EChartsType } from 'echarts/core'
import { CHART_THEME_TOKEN } from '@idux/charts-core'
import { IxWordCloudChart, PLOT_THEME_TOKEN } from '../word-cloud'
import type { WordCloudChartProps } from '../word-cloud'

describe('word cloud component lifecycle', () => {
  it('inherits reactive themes and retains selection by id after reordering and rebuilding', async () => {
    const theme = ref('seer')
    const plotTheme = ref({ palette: ['#123456'] })
    const props = reactive<WordCloudChartProps>({
      data: [
        { id: 'a', name: 'A', value: 1 },
        { id: 'b', name: 'B', value: 2 },
      ],
      selectedMode: 'multiple',
      animation: false,
    })
    let chart: EChartsType | undefined
    const wrapper = mount(
      defineComponent({
        setup: () => () =>
          h(IxWordCloudChart as Component, {
            ...props,
            autoResize: false,
            initOption: { renderer: 'svg', width: 480, height: 240 },
            onReady: (instance: EChartsType) => {
              chart = instance
            },
          }),
      }),
      {
        global: {
          provide: {
            [CHART_THEME_TOKEN as symbol]: theme,
            [PLOT_THEME_TOKEN as symbol]: plotTheme,
          },
        },
      },
    )
    const model = () => (chart as any).getModel().getSeriesByIndex(0)
    try {
      expect(model().getData().getItemVisual(0, 'style').fill).toBe('#123456')
      chart!.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 0 })
      props.data!.reverse()
      await nextTick()
      expect(model().isSelected(1)).toBe(true)
      expect(model().getSelectedDataIndices()).toEqual([1])
      const old = chart!
      theme.value = 'dark'
      await nextTick()
      expect(old.isDisposed()).toBe(true)
      expect(model().isSelected(1)).toBe(true)
      plotTheme.value = { palette: ['#abcdef'] }
      await nextTick()
      expect(model().getData().getItemVisual(0, 'style').fill).toBe('#abcdef')
      props.data![1]!.selected = false
      await nextTick()
      expect(model().getSelectedDataIndices()).toEqual([])
      props.data = [{ id: 'b', name: 'B', value: 2 }]
      await nextTick()
      props.data.push({ id: 'a', name: 'A', value: 1 })
      await nextTick()
      expect(model().isSelected(1)).toBe(false)
    } finally {
      wrapper.unmount()
    }
    expect(chart!.isDisposed()).toBe(true)
  })

  it('refreshes measurements after fonts load and releases the listener on unmount', () => {
    const fonts = new EventTarget()
    const descriptor = Object.getOwnPropertyDescriptor(document, 'fonts')
    Object.defineProperty(document, 'fonts', { configurable: true, value: fonts })
    const remove = vi.spyOn(fonts, 'removeEventListener')
    let chart: EChartsType | undefined
    const wrapper = mount(IxWordCloudChart, {
      props: {
        data: [{ name: 'Font', value: 1 }],
        animation: false,
        autoResize: false,
        initOption: { renderer: 'svg', width: 480, height: 240 },
        onReady: (instance: EChartsType) => {
          chart = instance
        },
      },
    })
    try {
      const resize = vi.spyOn(chart!, 'resize')
      fonts.dispatchEvent(new Event('loadingdone'))
      expect(resize).toHaveBeenCalledTimes(1)
      chart!.dispose()
      fonts.dispatchEvent(new Event('loadingdone'))
      expect(resize).toHaveBeenCalledTimes(1)
    } finally {
      wrapper.unmount()
      if (descriptor) Object.defineProperty(document, 'fonts', descriptor)
      else Reflect.deleteProperty(document, 'fonts')
    }
    expect(remove).toHaveBeenCalledWith('loadingdone', expect.any(Function))
  })
})

it('renders the component on the server without document or client font listeners', async () => {
  vi.stubGlobal('document', undefined)
  try {
    const html = await renderToString(
      h(IxWordCloudChart as Component, { data: [{ name: 'Server', value: 1 }] }),
    )
    expect(html).toContain('ix-chart')
    expect(html).not.toContain('<svg')
  } finally {
    vi.unstubAllGlobals()
  }
})

it('treats a bare Vue motion attribute as enabled and respects an explicit false update', async () => {
  const input = reactive<Record<string, unknown>>({ motion: '' })
  let chart: EChartsType | undefined
  const wrapper = mount(
    defineComponent({
      setup: () => () =>
        h(IxWordCloudChart as Component, {
          ...input,
          data: [{ id: 'a', name: 'A', value: 1 }],
          autoResize: false,
          initOption: { renderer: 'svg', width: 480, height: 240 },
          animationDuration: 0,
          onReady: (instance: EChartsType) => {
            chart = instance
          },
        }),
    }),
  )
  const settings = () => (chart!.getOption().series as any[])[0].__ixWordCloud
  try {
    expect(settings().motion).toMatchObject({ amplitude: 12, duration: 6000 })
    input.motion = false
    await nextTick()
    expect(settings().motion).toBeUndefined()
  } finally {
    wrapper.unmount()
  }
})
