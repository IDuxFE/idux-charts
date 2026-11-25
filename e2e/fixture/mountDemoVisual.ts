import { computed, createApp, h, type Component } from 'vue'
import { CHART_THEME_TOKEN, PLOT_THEME_TOKEN, seerTheme } from '@idux/charts'
import setup from '../../packages/site/setup'
import { chartTheme, plotTheme, siteTheme } from '../../packages/site/theme'
import fontURL from './fonts/ChartVisualCJK.otf?url'
import { getInstanceByDom } from 'echarts/core'

declare global {
  interface Window {
    finishDemoAnimations(element: HTMLElement): void
  }
}

// Demo templates are checked by the site project; load their real modules here.
const modules = import.meta.glob<{ default: Component }>([
  '../../packages/site/src/components/bar/demos/BasicVertical.vue',
  '../../packages/site/src/components/bar/demos/BasicHorizontalAbove.vue',
  '../../packages/site/src/components/line/demos/BasicTrend.vue',
  '../../packages/site/src/components/area/demos/BasicAreaTrend.vue',
  '../../packages/site/src/components/pie/demos/Basic.vue',
  '../../packages/site/src/components/radar/demos/Basic.vue',
  '../../packages/site/src/components/gauge/demos/Basic.vue',
  '../../packages/site/src/components/gauge/demos/Status.vue',
  '../../packages/site/src/components/gauge/demos/Segmented.vue',
  '../../packages/site/src/components/liquid-fill/demos/Basic.vue',
  '../../packages/site/src/components/map/demos/Status.vue',
  '../../packages/site/src/components/map/demos/Density.vue',
  '../../packages/site/src/components/map/demos/Lines.vue',
  '../../packages/site/src/components/bullet/demos/Basic.vue',
  '../../packages/site/src/components/bullet/demos/Segmented.vue',
  '../../packages/site/src/components/bullet/demos/Grouped.vue',
  '../../packages/site/src/components/bullet/demos/GroupedAbove.vue',
])
const demoPaths: Record<string, string> = {
  'bar-basic': '../../packages/site/src/components/bar/demos/BasicVertical.vue',
  'bar-above': '../../packages/site/src/components/bar/demos/BasicHorizontalAbove.vue',
  'line-basic': '../../packages/site/src/components/line/demos/BasicTrend.vue',
  'area-basic': '../../packages/site/src/components/area/demos/BasicAreaTrend.vue',
  'pie-basic': '../../packages/site/src/components/pie/demos/Basic.vue',
  'radar-basic': '../../packages/site/src/components/radar/demos/Basic.vue',
  'gauge-basic': '../../packages/site/src/components/gauge/demos/Basic.vue',
  'gauge-status': '../../packages/site/src/components/gauge/demos/Status.vue',
  'gauge-segmented': '../../packages/site/src/components/gauge/demos/Segmented.vue',
  'liquid-fill-basic': '../../packages/site/src/components/liquid-fill/demos/Basic.vue',
  'map-status': '../../packages/site/src/components/map/demos/Status.vue',
  'map-density': '../../packages/site/src/components/map/demos/Density.vue',
  'map-lines': '../../packages/site/src/components/map/demos/Lines.vue',
  'bullet-single': '../../packages/site/src/components/bullet/demos/Basic.vue',
  'bullet-segmented': '../../packages/site/src/components/bullet/demos/Segmented.vue',
  'bullet-grouped': '../../packages/site/src/components/bullet/demos/Grouped.vue',
  'bullet-above': '../../packages/site/src/components/bullet/demos/GroupedAbove.vue',
}

export async function mountDemoVisual(key: string, dark: boolean) {
  const path = demoPaths[key]
  const load = path ? modules[path] : undefined
  if (!load) throw new Error(`Unknown visual demo: ${key}`)
  // Font files and explicit theme injection are confined to this test entry.
  // Load before mount so ECharts measures with the same bytes on every host.
  const font = new FontFace('ChartVisualCJK', `url("${fontURL}")`)
  document.fonts.add(await font.load())
  window.finishDemoAnimations = element => {
    const instance = getInstanceByDom(element)
    if (!instance) throw new Error('Demo chart instance is unavailable')
    const zr = instance.getZr()
    zr.storage.traverse(graphic => graphic.stopAnimation(undefined, true))
    zr.flush()
  }
  document.documentElement.lang = 'zh-CN'
  siteTheme.value = dark ? 'dark' : 'light'
  document.body.style.background = 'var(--site-color-container-bg, #fff)'
  const { default: Demo } = await load()
  const app = createApp({
    render: () =>
      setup.renderApp!([
        h(
          'div',
          {
            id: 'visual-demo',
            style: { width: '974px', margin: '24px', fontFamily: 'ChartVisualCJK' },
          },
          [h(Demo)],
        ),
      ]),
  })
  setup.setupApp!(app)
  app.provide(
    CHART_THEME_TOKEN,
    computed(() => ({
      ...(typeof chartTheme.value === 'string' ? seerTheme : chartTheme.value),
      textStyle: {
        ...(typeof chartTheme.value === 'string' ? seerTheme : chartTheme.value).textStyle,
        fontFamily: 'ChartVisualCJK',
      },
    })),
  )
  app.provide(
    PLOT_THEME_TOKEN,
    computed(() => ({ ...plotTheme.value, fontFamily: 'ChartVisualCJK' })),
  )
  app.mount('#app')
}
