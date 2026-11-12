<script setup lang="ts">
import type { PieChartProps } from '@idux/charts'
import { format } from 'echarts/core'

const data = [145, 124, 118, 92, 54, 21].map((value, index) => ({
  name: `图例${index + 1}`,
  value,
  emphasis: { scale: false },
}))
const tooltip: PieChartProps['tooltip'] = {
  textStyle: { fontSize: 12 },
  formatter: params => {
    const item = Array.isArray(params) ? params[0] : params
    return item ? format.encodeHTML(`${item.name}: ${item.value}`) : ''
  },
}
</script>
<template>
  <IxCard shadow class="lightweight-card">
    <template #header><IxHeader title="资产概览" size="sm" /></template>
    <IxPieChart
      style="width: 84px; height: 84px; margin: 0 auto"
      align="center"
      name="资产分布"
      :data="data"
      :radius="36"
      :legend="{ show: false }"
      :tooltip="tooltip"
    />
  </IxCard>
</template>
<style scoped>
.lightweight-card {
  width: 180px;
  max-width: 100%;
}
</style>
<archive-meta lang="json">
{
  "title": "轻量卡片饼图",
  "description": "紧凑容器中设置半径并声明 align，背景和圆心由组件计算。",
  "index": 6
}
</archive-meta>
