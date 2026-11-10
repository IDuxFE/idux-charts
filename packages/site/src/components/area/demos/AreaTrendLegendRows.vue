<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LineChartProps } from '@idux/charts'
import { IxRadioGroup } from '@idux/components/radio'

const count = ref(3)
const counts = [3, 18, 30, 50].map(key => ({ key, label: `${key} 个系列` }))

const categories = Array.from({ length: 15 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 12)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  {
    name: '迅雷',
    stack: 'total',
    data: [25, 30, 28, 48, 42, 39, 48, 46, 71, 69, 61, 86, 91, 104, 120],
  },
  {
    name: '爱奇艺',
    stack: 'total',
    data: [20, 27, 25, 45, 41, 37, 46, 44, 70, 68, 61, 85, 91, 107, 122],
  },
  {
    name: 'DIM',
    stack: 'total',
    data: [19, 23, 23, 69, 38, 83, 38, 36, 58, 58, 51, 72, 72, 84, 101],
  },
  {
    name: '微信',
    stack: 'total',
    data: [23, 28, 23, 15, 45, 37, 46, 48, 72, 53, 39, 40, 29, 30, 30],
  },
  {
    name: 'QQ',
    stack: 'total',
    data: [201, 126, 83, 58, 50, 36, 35, 78, 38, 22, 41, 19, 24, 39, 17],
  },
]
const moreSeries = Array.from({ length: 50 - series.length }, (_, index) => ({
  name: `应用 ${index + 1}`,
  stack: 'total',
  data: categories.map((_, sample) => 20 + ((index * 17 + sample * 3) % 31)),
}))
const allSeries = [...series, ...moreSeries]

const option = computed<LineChartProps>(() => ({
  categories,
  series: allSeries.slice(0, count.value),
  area: 'striped',
  yAxis: {
    name: 'Kbps',
    min: 0,
  },
  xAxis: {
    axisLabel: {
      interval: (_index, label) => label.endsWith('00:00'),
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  dataZoom: { type: 'slider' },
}))
</script>

<template>
  <div style="width: 100%">
    <IxRadioGroup
      v-model:value="count"
      role="radiogroup"
      aria-label="系列数量"
      name="area-legend-count"
      buttoned
      size="sm"
      :data-source="counts"
      style="margin-bottom: 16px"
    />
    <IxLineChart v-bind="option" style="width: 100%; height: 320px" />
  </div>
</template>

<archive-meta lang="json">
{
  "title": "图例多列排列（以堆叠面积图为例）",
  "description": "图例优先使用单行，空间不足时排成两行，继续溢出时可滚轮或点击箭头翻页。",
  "index": -8
}
</archive-meta>
