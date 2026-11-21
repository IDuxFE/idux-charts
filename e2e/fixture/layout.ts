import { computed, createApp, defineComponent, h, ref } from 'vue'
import { IxChart, useChart, useReactiveAttrs } from '@idux/charts'
import type { EChartsType } from 'echarts/core'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use([CanvasRenderer])
const params = new URLSearchParams(location.search)
const scenario = params.get('scenario') ?? 'plain'
const renderer = params.get('renderer') === 'canvas' ? 'canvas' : 'svg'
const resized = ref(false)
const hidden = ref(false)
const styled = ref(false)
const sheet = document.createElement('style')
sheet.textContent =
  '.class-padding { padding: 12px 24px 20px 16px; border: 3px solid transparent; box-sizing: border-box; }'
document.head.append(sheet)
const charts = new Map<string, EChartsType>()
// Preserve the original single-container layout as a geometry reference.
const Legacy = defineComponent({
  inheritAttrs: false,
  setup(_, context) {
    const { containerRef } = useChart(useReactiveAttrs(context.attrs))
    return () =>
      h('div', {
        ref: containerRef,
        class: context.attrs.class,
        style: { width: '100%', height: '100%', ...(context.attrs.style as any) },
      })
  },
})
const frameStyle = computed(() => ({
  position: 'relative',
  width: resized.value ? '520px' : '440px',
  height: resized.value ? '360px' : '320px',
  ...(scenario === 'flex' ? { display: 'flex', flexDirection: 'column' } : {}),
  ...(scenario === 'grid'
    ? {
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) 40px',
        gridTemplateColumns: 'minmax(0, 1fr)',
      }
    : {}),
  ...(hidden.value ? { display: 'none' } : {}),
}))
const chartStyle = computed(() => ({
  ...(scenario === 'min-height' || scenario === 'static-padding-min-height'
    ? { height: 'auto', minHeight: '220px' }
    : {}),
  ...(scenario.startsWith('padding') || scenario === 'static-padding-min-height'
    ? {
        padding: '12px 24px 20px 16px',
        border: '3px solid transparent',
        boxSizing:
          scenario.endsWith('border-box') || scenario === 'static-padding-min-height'
            ? 'border-box'
            : 'content-box',
      }
    : {}),
  ...(scenario === 'static' || scenario === 'static-padding-min-height'
    ? { position: 'static' }
    : {}),
  ...(scenario === 'absolute' || scenario === 'fixed'
    ? { position: scenario, top: '10px', left: '15px', width: '300px', height: '200px' }
    : {}),
  ...(scenario === 'relative' ? { position: 'relative', left: '13px', top: '9px' } : {}),
  ...(scenario === 'sticky' ? { position: 'sticky', top: '10px' } : {}),
  ...(scenario === 'transform'
    ? { transform: 'translate(7px, 9px) scale(0.9)', transformOrigin: 'top left' }
    : {}),
  ...(scenario === 'flex' ? { flex: '1 1 0%', height: 'auto', minHeight: 0 } : {}),
  ...(scenario === 'grid' ? { height: 'auto', minHeight: 0 } : {}),
  ...(scenario === 'display-flex' ? { display: 'flex', alignItems: 'center' } : {}),
  ...(scenario === 'display-grid' ? { display: 'grid', placeItems: 'center' } : {}),
  ...(scenario === 'display-block' ? { display: 'block' } : {}),
  ...(styled.value ? { width: '280px', height: '180px' } : {}),
}))
createApp({
  setup: () => () =>
    h('main', [
      h(
        'button',
        {
          style: { position: 'relative', zIndex: 1000 },
          onClick: () => {
            resized.value = !resized.value
          },
        },
        'Resize parent',
      ),
      h(
        'button',
        {
          style: { position: 'relative', zIndex: 1000 },
          onClick: () => {
            styled.value = !styled.value
          },
        },
        'Resize chart',
      ),
      h(
        'button',
        {
          style: { position: 'relative', zIndex: 1000 },
          onClick: () => {
            hidden.value = !hidden.value
          },
        },
        'Toggle visibility',
      ),
      ...[
        ['legacy', Legacy],
        ['current', IxChart],
      ].map(([name, component]) =>
        h('section', { 'data-rig': name, style: frameStyle.value }, [
          h(
            component as typeof IxChart,
            {
              class: ['chart-root', scenario === 'class-padding' && 'class-padding'],
              style: chartStyle.value,
              animation: false,
              initOption: { renderer },
              xAxis: { type: 'category', data: ['A', 'B'] },
              yAxis: { type: 'value' },
              series: [{ type: 'bar', data: [10, 20] }],
              onReady: (chart: EChartsType) => charts.set(name as string, chart),
            },
            name === 'current'
              ? {
                  default: () =>
                    h('button', { 'data-overlay': '', style: { margin: 0 } }, 'Overlay'),
                }
              : undefined,
          ),
          h('div', { 'data-sibling': '', style: { height: '40px', flex: '0 0 40px' } }, 'Sibling'),
        ]),
      ),
    ]),
}).mount('#app')
Object.assign(window, {
  layoutState: () =>
    Object.fromEntries(
      ['legacy', 'current'].map(name => {
        const rig = document.querySelector(`[data-rig="${name}"]`)!
        const root = rig.querySelector('.chart-root')!
        const box = root.getBoundingClientRect()
        const viewport = root
          .querySelector(renderer === 'svg' ? 'svg' : 'canvas')!
          .getBoundingClientRect()
        const overlay = root.querySelector('[data-overlay]')?.getBoundingClientRect()
        const rigBox = rig.getBoundingClientRect()
        const sibling = rig.querySelector('[data-sibling]')!.getBoundingClientRect()
        return [
          name,
          {
            id: charts.get(name)?.id,
            width: charts.get(name)?.getWidth(),
            height: charts.get(name)?.getHeight(),
            root: [box.width, box.height],
            viewport: [viewport.x - box.x, viewport.y - box.y, viewport.width, viewport.height],
            sibling: [sibling.x - rigBox.x, sibling.y - rigBox.y],
            overlay: overlay && [
              overlay.x - box.x,
              overlay.y - box.y,
              overlay.width,
              overlay.height,
            ],
          },
        ]
      }),
    ),
})
