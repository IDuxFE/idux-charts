<script setup lang="ts">
import { seerColorsForRisk, useTooltipsFormatter, type PieChartProps } from '@idux/charts'

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
  tooltip: { 
    trigger: 'item',
    backgroundColor: '#FBFDFF',
    formatter: params => {
      const title = params.name
      const list = [{
        name: params.seriesName,
        value: params.value,
        color: params.color,
      }];

      return useTooltipsFormatter(title, list);
    },
  },
}
</script>
<template>
  <IxPieChart style="width: 600px; height: 300px" :data="data" v-bind="pieOption" />
</template>

<archive-meta lang="json">
{
  "title": "自定义 tooltips",
  "description": "",
  "index": 13
}
</archive-meta>
