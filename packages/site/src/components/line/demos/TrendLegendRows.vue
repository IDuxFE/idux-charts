<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LineChartProps } from '@idux/charts'
import { IxRadioGroup } from '@idux/components/radio'

const count = ref(3)
const counts = [3, 18, 30, 50].map(key => ({ key, label: `${key} 个系列` }))

const categories = Array.from({ length: 8 }, (_, index) =>
  new Date(Date.UTC(2026, 6, 1, index * 24)).toISOString().slice(5, 16).replace('T', ' '),
)
const series = [
  { name: '迅雷', data: [85, 62, 155, 210, 330, 380, 100, 214] },
  { name: '爱奇艺', data: [80, 200, 191, 208, 185, 269, 282, 324] },
  { name: '微信', data: [22, 40, 84, 157, 128, 158, 245, 259] },
  { name: 'QQ', data: [36, 24, 42, 72, 88, 131, 121, 150] },
  { name: 'DIM', data: [54, 58, 95, 119, 215, 178, 187, 238] },
  { name: '微博', data: [47, 67, 104, 127, 189, 234, 223, 275] },
  { name: '知乎', data: [59, 79, 116, 139, 201, 246, 235, 287] },
  { name: 'bilibili', data: [71, 91, 128, 151, 213, 258, 247, 299] },
  { name: '谷歌', data: [83, 103, 140, 163, 225, 270, 259, 311] },
  { name: '飞书', data: [95, 115, 152, 175, 237, 282, 271, 323] },
  { name: '企业邮件', data: [107, 127, 164, 187, 249, 294, 283, 335] },
  { name: '文件传输', data: [119, 139, 176, 199, 261, 306, 295, 347] },
  { name: '远程桌面', data: [131, 151, 188, 211, 273, 318, 307, 359] },
  { name: '视频会议', data: [143, 163, 200, 223, 285, 330, 319, 371] },
]
const moreSeries = Array.from({ length: 50 - series.length }, (_, index) => ({
  name: `应用 ${index + 1}`,
  data: categories.map((_, sample) => 40 + sample * 18 + ((index * 31 + sample * 17) % 125)),
}))
const allSeries = [...series, ...moreSeries]

const option = computed<LineChartProps>(() => ({
  categories,
  series: allSeries.slice(0, count.value),
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
}))
</script>

<template>
  <div style="width: 100%">
    <IxRadioGroup
      v-model:value="count"
      role="radiogroup"
      aria-label="系列数量"
      name="line-legend-count"
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
  "title": "图例多列排列（以多系列折线图为例）",
  "description": "用于多系列数据，需要合理规划图例位置的情况。图例通常放置在图表下方：1、优先采用单行排列，保持视觉简洁。2、若分类过多，允许换行为两行。3、若超过两行，需采用翻页模式（在右侧提供上下或左右箭头）进行收纳展示，避免占据过多纵向空间。",
  "index": 5
}
</archive-meta>
