<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useChart } from '@idux/charts'
import type { ChartProps } from '@idux/charts'

const loading = ref(false)
const option = computed<ChartProps>(() => ({
  loading: loading.value && { text: '图表正在加载中，请稍后...' },
  title: { text: '柱状图标题', left: 0 },
  grid: { top: 48, bottom: 16, left: 12, right: 12, containLabel: true },
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
}))

const { containerRef, chartRef } = useChart(option)

const timer = setTimeout(() => {
  chartRef.value?.setOption({ title: { text: '修改后的标题' } })
}, 3000)

onUnmounted(() => clearTimeout(timer))
</script>
<template>
  <label class="core-loading-switch">
    加载中
    <IxSwitch v-model:checked="loading" size="sm" aria-label="加载中" />
  </label>
  <div ref="containerRef" style="width: 100%; height: 300px" />
</template>

<style scoped>
.core-loading-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
</style>

<archive-meta lang="json">
{
  "title": "函数用法",
  "description": "通过 useChart 配置图表，并切换 loading 查看通用加载状态。",
  "index": 4
}
</archive-meta>
