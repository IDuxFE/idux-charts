<script setup lang="ts">
import { computed } from 'vue'
import { useThemeToken } from '@idux/components/theme'
import { createRadarOption } from '@idux/charts'
import type { RadarChartProps } from '@idux/charts'

const indicator = ['覆盖率', '响应速度', '稳定性', '自动化', '可维护性'].map(name => ({
  name,
  min: 0,
  max: 100,
}))
const data = [
  { name: '当前方案', value: [85, 72, 90, 65, 80], itemStyle: { color: '#4089FF' } },
  {
    name: '目标方案',
    value: [95, 90, 95, 90, 90],
    itemStyle: { color: '#18A87D' },
    lineStyle: { type: 'dashed' as const },
    areaStyle: { opacity: 0 },
  },
]
// 构造函数生成顺时针排列的维度和系列，下面再按主题定制网格样式。
const base = createRadarOption({ indicator, data, clockwise: true, area: true, radius: '60%' })
const { themeTokens } = useThemeToken()
const option = computed<RadarChartProps>(() => ({
  ...base,
  radar: {
    ...base.radar,
    shape: 'circle',
    axisName: { color: themeTokens.value.colorText, fontSize: 13 },
    splitArea: { show: false },
    splitLine: { lineStyle: { color: themeTokens.value.colorSeparator, type: 'dashed' } },
  },
  tooltip: {
    trigger: 'item',
    confine: true,
    renderMode: 'richText',
    formatter: params => {
      const item = Array.isArray(params) ? params[0] : params
      // 回调的 value 已按绘制方向排序；用 dataIndex 读取业务原始顺序。
      const source = item && data[item.dataIndex]
      if (!source) return ''
      return [
        source.name,
        ...indicator.map((axis, index) => `${axis.name}：${source.value[index]} 分`),
      ].join('\n')
    },
  },
}))
</script>

<template>
  <IxRadarChart class="radar-custom-demo" v-bind="option" style="height: 360px; width: 100%" />
</template>

<archive-meta lang="json">
{
  "title": "样式与提示框定制",
  "description": "使用 createRadarOption 保留默认配置，定制圆形网格、虚线目标轮廓与原始顺序的分值提示。数据项样式优先于系列默认样式。",
  "index": 2
}
</archive-meta>
