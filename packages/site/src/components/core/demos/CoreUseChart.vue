<script setup lang="ts">
import { useChart, type ChartProps } from '@idux/charts'

const option: ChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    type: 'category',
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}
const { containerRef, chartRef } = useChart(option)

setTimeout(() => {
  chartRef.value?.setOption({ title: { text: '修改后的标题' } })
}, 3000)
</script>
<template>
  <div ref="containerRef" style="width: 100%; height: 300px" />
</template>

<archive-meta lang="json">
{
  "title": "函数用法",
  "description": "",
  "index": 11
}
</archive-meta>
