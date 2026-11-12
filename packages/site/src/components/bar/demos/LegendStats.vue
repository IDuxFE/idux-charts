<script setup lang="ts">
import { getBarLinearColors, LinearDirection } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const categories = ['2019', '2020', '2021', '2022', '2023']
const series = [
  { name: '服务器', data: [160, 116, 193, 262, 297] },
  { name: '终端', data: [210, 210, 279, 354, 347] },
  { name: '分支', data: [284, 146, 191, 192, 212] },
]
const palette = getBarLinearColors(LinearDirection.vertical)

// 本例口径：各系列在整个示例时间范围内的总量，占全部系列总量的比例。
const totals = new Map(
  series.map(({ name, data }) => [name, data.reduce((sum, value) => sum + value, 0)]),
)
const total = [...totals.values()].reduce((sum, value) => sum + value, 0)

const chart: BarChartProps = {
  categories,
  series,
  color: [palette[0]!, palette[1]!, palette[10]!],
  yAxis: { name: '次', min: 0, max: 400 },
  dataZoom: { type: 'slider' },
  legend: {
    formatter: name => {
      const value = totals.get(name) ?? 0
      const percentage = total ? ((100 * value) / total).toFixed(1) : '0.0'
      return `${name}  ${value} 次（${percentage}%）`
    },
  },
}
</script>

<template>
  <div class="category-bar-legend-percentage">
    <IxBarChart v-bind="chart" style="width: 100%; height: 300px" />
  </div>
</template>

<archive-meta lang="json">
{
  "title": "图例带数值与百分比（以分组柱状图为例）",
  "description": "用于用户需要精确对比各子系列具体数值与占比的场景。图例不仅展示颜色和分类名称，还需同步展示具体数值与百分比。用户无需悬浮或查看坐标轴，直接通过图例数字即可明确对比差异。",
  "index": 8
}
</archive-meta>
