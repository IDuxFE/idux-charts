<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PieChartProps } from '@idux/charts'

const shape = ref<'pie' | 'ring' | 'rose'>('pie')
const loading = ref(false)
const data = [
  { value: 145, name: '图例 A' },
  { value: 124, name: '图例 B' },
  { value: 118, name: '图例 C' },
  { value: 110, name: '图例 D' },
  { value: 104, name: '图例 E' },
  { value: 92, name: '图例 F' },
]
const shapeOption = computed<PieChartProps>(() => ({
  radius: shape.value === 'ring' ? ['70%', '80%'] : shape.value === 'rose' ? undefined : '80%',
  roseType: shape.value === 'rose' ? 'area' : undefined,
}))
</script>
<template>
  <div>
    <div class="large-pie-controls">
      <IxRadioGroup v-model:value="shape" buttoned size="sm" aria-label="大尺寸图表形态">
        <IxRadio key="pie">实心</IxRadio>
        <IxRadio key="ring">环形</IxRadio>
        <IxRadio key="rose">玫瑰</IxRadio>
      </IxRadioGroup>
      <label class="large-pie-loading"
        >加载中 <IxSwitch v-model:checked="loading" size="sm" aria-label="大尺寸图表加载"
      /></label>
    </div>
    <!-- align 保留自动布局；大尺寸容器无需手动定位标题或图例。 -->
    <IxPieChart
      style="width: 600px; max-width: 100%; height: 300px"
      :data="data"
      name="分类数量"
      align="center-start"
      :loading="loading && { text: '加载中...' }"
      v-bind="shapeOption"
    />
  </div>
</template>
<style scoped>
.large-pie-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.large-pie-loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
<archive-meta lang="json">
{
  "title": "大尺寸：基础形态与加载",
  "description": "在 600 × 300 容器中切换实心、环形与面积模式玫瑰图；loading 控制组件加载效果，align 保留自动布局。",
  "index": 90
}
</archive-meta>
