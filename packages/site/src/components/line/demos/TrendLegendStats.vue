<script setup lang="ts">
import type { LineChartProps } from '@idux/charts'

const categories = Array.from({ length: 8 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 24)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  { name: '迅雷', data: [85, 62, 155, 210, 330, 380, 100, 214] },
  { name: '爱奇艺', data: [80, 200, 191, 208, 185, 269, 282, 324] },
  { name: '微信', data: [22, 40, 84, 157, 128, 158, 245, 259] },
  { name: 'QQ', data: [36, 24, 42, 72, 88, 131, 121, 150] },
  { name: 'DIM', data: [54, 58, 95, 119, 215, 178, 187, 238] },
]

// 本例以各系列最后一个采样值计算占同期合计的比例。
const latest = new Map(series.map(({ name, data }) => [name, data.at(-1) ?? 0]))
const total = [...latest.values()].reduce((sum, value) => sum + value, 0)

const option: LineChartProps = {
  categories,
  series,
  yAxis: {
    name: 'Kbps',
    min: 0,
    max: 400,
    interval: 100,
  },
  xAxis: {
    axisLabel: {
      formatter: (label: string) => label.slice(0, 5),
    },
  },
  dataZoom: { type: 'slider' },
  legend: {
    formatter: name => {
      const value = latest.get(name) ?? 0
      const share = total ? (100 * value) / total : 0
      return `${name}  ${value}（${share.toFixed(1)}%）`
    },
  },
}
</script>

<template>
  <div style="width: 100%">
    <IxLineChart v-bind="option" style="width: 100%; height: 320px" />
  </div>
</template>

<archive-meta lang="json">
{
  "title": "图例带数值与百分比（以多系列折线图为例）",
  "description": "用于用户需要精确对比各折线系列具体数值与占比的场景。图例不仅展示颜色和分类名称，还需同步展示该系列的最新数值或总计，用户无需悬浮或查看坐标轴，即可明确对比差异。",
  "index": 6
}
</archive-meta>
