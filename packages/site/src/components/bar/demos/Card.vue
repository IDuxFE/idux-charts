<script setup lang="ts">
import { getBarLinearColors, LinearDirection } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const palette = getBarLinearColors(LinearDirection.vertical)
const option: BarChartProps = {
  categories: ['2019', '2020', '2021', '2022', '2023'],
  series: [
    { name: '服务器', data: [160, 116, 193, 262, 297] },
    { name: '终端', data: [210, 210, 279, 354, 347] },
    { name: '分支', data: [284, 146, 191, 192, 212] },
  ],
  color: [palette[0]!, palette[1]!, palette[10]!],
  yAxis: { name: '次', min: 0, max: 400 },
  dataZoom: { type: 'slider' },
}
</script>

<template>
  <IxCard shadow class="category-bar-card">
    <template #header>
      <IxHeader title="资产事件趋势" size="sm" />
    </template>
    <IxBarChart v-bind="option" style="width: 100%; height: 300px" />
  </IxCard>
</template>

<style scoped>
.category-bar-card {
  width: 640px;
  max-width: 100%;
}
</style>

<archive-meta lang="json">
{
  "title": "卡片化展示（以分组柱状图为例）",
  "description": "用于仪表盘的数据概览。将图表封装在卡片容器内（可含标题与操作区），图表与图例在卡片内自适应排布，适合大屏或工作台中并排展示多个核心指标。",
  "index": 9
}
</archive-meta>
