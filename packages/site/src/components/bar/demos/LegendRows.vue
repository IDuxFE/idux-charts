<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBarLinearColors, LinearDirection } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const count = ref(3)
const counts = [
  { key: 3, label: '3 个系列' },
  { key: 18, label: '18 个系列' },
  { key: 30, label: '30 个系列' },
  { key: 50, label: '50 个系列' },
]
const categories = ['2019', '2020', '2021', '2022', '2023']
const series = [
  { name: '服务器', data: [160, 116, 193, 262, 297] },
  { name: '终端', data: [210, 210, 279, 354, 347] },
  { name: '分支', data: [284, 146, 191, 192, 212] },
]
const moreSeries = Array.from({ length: 47 }, (_, i) => ({
  name: `设备类别 ${i + 1}`,
  data: categories.map((_, j) => 50 + ((i * 31 + j * 17) % 120)),
}))
const allSeries = [...series, ...moreSeries]
const palette = getBarLinearColors(LinearDirection.vertical)
const chart = computed<BarChartProps>(() => ({
  categories,
  series: allSeries.slice(0, count.value),
  ...(count.value === 3 ? { color: [palette[0]!, palette[1]!, palette[10]!] } : {}),
  yAxis: { name: '次', min: 0, max: 400 },
  dataZoom: { type: 'slider', ...(count.value >= 30 ? { startValue: 0, endValue: 2 } : {}) },
}))
</script>

<template>
  <div class="category-bar-legend">
    <IxRadioGroup
      v-model:value="count"
      role="radiogroup"
      aria-label="系列数量"
      name="bar-legend-count"
      buttoned
      size="sm"
      :data-source="counts"
      style="margin-bottom: 16px"
    />
    <IxBarChart v-bind="chart" style="width: 100%; height: 300px" />
  </div>
</template>

<archive-meta lang="json">
{
  "title": "图例多列排列（以分组柱状图为例）",
  "description": "切换系列数量验证图例布局：优先单行，空间不足时采用两行及 16px 行间距，列位置保持对齐；超过两行时可点击右侧箭头或滚轮翻页，分组柱默认隐藏数值标签。",
  "index": 7
}
</archive-meta>
