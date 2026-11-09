<template>
  <label>Width <input v-model.number="width" aria-label="Width" type="number" /></label>
  <label>Height <input v-model.number="height" aria-label="Height" type="number" /></label>
  <label>Count <input v-model.number="count" aria-label="Count" type="number" /></label>
  <label
    >Shape
    <select v-model="shape" aria-label="Shape"
      ><option>radius</option
      ><option>area</option
      ><option>pie</option></select
    ></label
  >
  <label
    >Name mode
    <select v-model="nameMode" aria-label="Name mode"
      ><option>short</option
      ><option>long</option></select
    ></label
  >
  <label
    >State
    <select v-model="state" aria-label="State"
      ><option>normal</option
      ><option>zero</option
      ><option>missing</option></select
    ></label
  >
  <label
    >Radius
    <select v-model="radiusMode" aria-label="Radius"
      ><option>default</option
      ><option>custom</option
      ><option>solid</option></select
    ></label
  >
  <div
    ref="host"
    data-testid="layout-chart"
    :style="{ width: `${width}px`, height: `${height}px`, background: '#eef4fa' }"
  >
    <IxPieChart
      :data="data"
      align="center"
      :rose-type="shape === 'pie' ? undefined : shape"
      :radius="radiusMode === 'custom' ? [8, 60] : radiusMode === 'solid' ? 60 : undefined"
      :title="{ text: '4650', subtext: '统计总数' }"
      :animation="false"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { getInstanceByDom } from 'echarts/core'
import { IxPieChart } from '@idux/charts'
const width = ref(480),
  height = ref(180),
  count = ref(4)
const shape = ref<'radius' | 'area' | 'pie'>('radius')
const nameMode = ref('short')
const state = ref('normal'),
  radiusMode = ref('default')
const host = ref<HTMLElement>()
const data = computed(() =>
  Array.from({ length: count.value }, (_, i) => ({
    name: nameMode.value === 'long' ? `Long category name ${i + 1}` : `分类 ${i + 1}`,
    value: state.value === 'zero' ? 0 : state.value === 'missing' ? null : (i + 1) * 10,
  })),
)
const inspect = () => {
  const dom = host.value?.querySelector<HTMLElement>('[_echarts_instance_]')
  const chart = dom && (getInstanceByDom(dom) as any)
  if (!chart) return null
  const model = chart.getModel()
  const main = model.getSeriesByIndex(2)
  const center = chart
    .getZr()
    .storage.getDisplayList()
    .find((el: any) => el.type === 'circle' && !el.invisible && el.style.stroke?.colorStops)
  const bounds = (el: any) => {
    const rect = el.getBoundingRect().clone()
    const transform = el.getComputedTransform()
    if (transform) rect.applyTransform(transform)
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
  }
  const rect = dom!.getBoundingClientRect()
  return {
    width: chart.getWidth(),
    height: chart.getHeight(),
    center: center
      ? {
          bounds: bounds(center),
          fill: center.style.fill,
          stroke: center.style.stroke,
          lineWidth: center.style.lineWidth,
        }
      : null,
    background: model.getSeriesByIndex(0).getData().getItemGraphicEl(0).style.fill,
    radius: main.option.radius,
    centerPosition: { x: rect.x + main.option.center[0], y: rect.y + main.option.center[1] },
    legends: model
      .queryComponents({ mainType: 'legend' })
      .filter((item: any) => item.option.show)
      .map((item: any) => ({
        bounds: bounds(chart.getViewOfComponentModel(item).group),
        labelWidth: item.option.textStyle.rich.label.width,
        names: item.option.data.map((entry: any) => entry.name),
        type: item.option.type,
      })),
  }
}
onMounted(() => {
  ;(window as any).inspectPieLayout = inspect
})
onBeforeUnmount(() => {
  delete (window as any).inspectPieLayout
})
</script>
