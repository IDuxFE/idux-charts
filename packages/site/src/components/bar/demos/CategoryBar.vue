<script setup lang="ts">
import { type BarChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    name: '次',
    nameGap: 20,
    nameTextStyle: {
      verticalAlign: 'top',
      lineHeight: 26,
    },
  },
  yAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
}
</script>
<template>
  <IxBarChart style="height: 300px" :data="data" v-bind="barOption" />
</template>

<archive-meta lang="json">
{
  "title": "横向柱状图",
  "description": "",
  "index": 3
}
</archive-meta>
