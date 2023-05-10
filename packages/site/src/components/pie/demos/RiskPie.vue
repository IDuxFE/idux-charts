<script setup lang="ts">
import { seerColorsForRisk, type PieChartProps } from '@idux/charts'

const data = [
  { value: 30, name: '严重' },
  { value: 60, name: '高危' },
  { value: 120, name: '中危' },
  { value: 150, name: '低危' },
  { value: 50, name: '信息' },
  { value: 40, name: '未定级' },
  { value: 35, name: '暂无风险' },
]

const pieOption: PieChartProps = {
  color: seerColorsForRisk,
  name: '风险总数',
}
</script>
<template>
  <IxPieChart style="width: 600px; height: 300px" :data="data" v-bind="pieOption" />
</template>

<archive-meta lang="json">
{
  "title": "风险等级颜色",
  "description": "",
  "index": 8
}
</archive-meta>
