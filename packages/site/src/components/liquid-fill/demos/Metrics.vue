<script setup lang="ts">
const metrics = [
  { label: 'CPU', value: 0, color: '#20C997', status: '' },
  { label: '内存', value: 50, color: '#20C997', status: '正常' },
  { label: '磁盘', value: 80, color: '#FFC74F', status: '中危' },
  { label: '连接数', value: 92, color: '#F36B58', status: '高危' },
]
</script>
<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px">
    <div v-for="metric in metrics" :key="metric.label" style="position: relative; width: 180px">
      <span style="position: absolute; top: 18px; width: 100%; text-align: center">{{
        metric.status
      }}</span>
      <IxLiquidFillChart
        :value="metric.value"
        :color="metric.color"
        :label="metric.label"
        :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
        style="height: 240px"
      />
    </div>
  </div>
</template>
<archive-meta lang="json">
{
  "title": "多指标与风险颜色",
  "description": "业务侧维护阈值与语义色；0 保留灰色底图，多个单指标组件自由排列。",
  "index": 2
}
</archive-meta>
