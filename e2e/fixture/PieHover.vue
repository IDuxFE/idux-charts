<template>
  <label
    >Alignment
    <select v-model="align" aria-label="Alignment"
      ><option v-for="value in aligns" :key="value">{{ value }}</option></select
    ></label
  >
  <label
    >Shape
    <select v-model="roseType" aria-label="Shape"
      ><option>area</option
      ><option>radius</option></select
    ></label
  >
  <label
    >Emphasis
    <select v-model="mode" aria-label="Emphasis"
      ><option>default</option
      ><option>custom</option
      ><option>disabled</option
      ><option>item</option></select
    ></label
  >
  <button @click="small = !small">Resize</button>
  <div ref="host" :style="{ width: small ? '320px' : '600px', height: small ? '150px' : '300px' }">
    <IxPieChart
      :data="data"
      :align="align"
      :rose-type="roseType"
      :series-style="seriesStyle"
      :animation="false"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { getInstanceByDom } from 'echarts/core'
import { IxPieChart } from '@idux/charts'
import type { PieChartAlign } from '../../packages/plots/pie/src/usePieOption'
const aligns: PieChartAlign[] = [
  'top-start',
  'top-center',
  'top-end',
  'center-start',
  'center',
  'center-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
]
const align = ref<PieChartAlign>('center-start')
const roseType = ref<'area' | 'radius'>('area')
const mode = ref('default')
const small = ref(false)
const host = ref<HTMLElement>()
const seriesStyle = computed(() => ({
  emphasis:
    mode.value === 'custom' ? { scaleSize: 24 } : mode.value === 'disabled' ? { scale: false } : {},
}))
const data = computed(() =>
  ['A', 'B', 'C', 'D'].map(name => ({
    name,
    value: 10,
    ...(mode.value === 'item' ? { emphasis: { scaleSize: 32 } } : {}),
  })),
)
// Renderer geometry is deliberately exposed only by this regression fixture:
// options alone cannot prove that a real pointer activated the emphasis shape.
const inspect = () => {
  const dom = host.value?.querySelector<HTMLElement>('[_echarts_instance_]')
  const chart = dom && getInstanceByDom(dom)
  if (!chart) return null
  const model = (chart as any).getModel().getSeriesByIndex(2)
  const series = model.option
  const rect = dom.getBoundingClientRect()
  return {
    width: chart.getWidth(),
    height: chart.getHeight(),
    sectors: data.value.map((_, index) => {
      const el = model.getData().getItemGraphicEl(index)
      const layout = model.getData().getItemLayout(index)
      const angle = (layout.startAngle + layout.endAngle) / 2
      const bounds = el.getBoundingRect().clone()
      const transform = el.getComputedTransform()
      if (transform) bounds.applyTransform(transform)
      return {
        x: rect.x + layout.cx + Math.cos(angle) * layout.r * 0.7,
        y: rect.y + layout.cy + Math.sin(angle) * layout.r * 0.7,
        emphasized: el.currentStates.includes('emphasis'),
        radius: el.shape.r,
        baseRadius: Array.isArray(series.radius) ? series.radius[1] : series.radius,
        bounds: { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height },
      }
    }),
  }
}
onMounted(() => {
  ;(window as any).inspectPieHover = inspect
})
onBeforeUnmount(() => {
  delete (window as any).inspectPieHover
})
</script>
