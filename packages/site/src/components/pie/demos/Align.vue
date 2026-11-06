<script setup lang="ts">
import { ref } from 'vue'
import { IxPieChart } from '@idux/charts'
import type { PieChartAlign, PieChartProps } from '@idux/charts'

const align = ref<PieChartAlign>('center')
const positions: PieChartAlign[] = [
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
const data = [145, 124, 118, 92, 54, 21].map((value, index) => ({
  name: `图例${index + 1}`,
  value,
}))
// 统计口径和展示文案由示例明确提供，组件只负责绘制和布局。
const total = data.reduce((sum, item) => sum + item.value, 0)
const title: PieChartProps['title'] = {
  text: `{label|统计总数}  {value|${total}}`,
  textStyle: {
    fontSize: 30,
    lineHeight: 16,
    rich: { value: { fontFamily: 'IDuxChartDemoDIN, D-DIN-PRO' } },
  },
}
const legend: PieChartProps['legend'] = {
  formatter: (name: string) => {
    const item = data.find(item => item.name === name)
    return item?.value == null
      ? `{label|${name}}{missing|数据缺失 ⓘ}`
      : `{label|${name}}{value|${item.value}}`
  },
  textStyle: {
    rich: {
      label: { fontSize: 12 },
      value: { fontSize: 12 },
      missing: { fontSize: 12 },
    },
  },
}
</script>
<template>
  <div class="pie-align-demo">
    <div class="pie-align-demo-controls" aria-label="饼图对齐位置">
      <button
        v-for="position in positions"
        :key="position"
        :aria-pressed="align === position"
        @click="align = position"
        >{{ position }}</button
      >
    </div>
    <div class="pie-align-demo-stage">
      <IxPieChart :data="data" :align="align" name="基础饼图" :title="title" :legend="legend" />
    </div>
  </div>
</template>
<style scoped>
.pie-align-demo-controls {
  display: grid;
  grid-template-columns: repeat(3, 140px);
  gap: 8px;
  margin-bottom: 16px;
}
.pie-align-demo-controls button {
  padding: 6px;
  cursor: pointer;
  border: 1px solid #e1e5eb;
  background: white;
  border-radius: 3px;
}
.pie-align-demo-controls button[aria-pressed='true'] {
  border-color: #458fff;
  color: #458fff;
}
.pie-align-demo-stage {
  width: 600px;
  height: 300px;
  border: 1px dashed #a1a7b3;
}
</style>
<archive-meta lang="json">
{
  "title": "九宫格对齐",
  "description": "start / 居中采用左图右文，end 采用左文右图；切换位置不重建图表。",
  "index": 10
}
</archive-meta>
