<script setup lang="ts">
import { computed } from 'vue'
import type { WordCloudChartProps } from '@idux/charts'
import { isDark } from '../../../../theme'

// Let the chart measure label width and map value to rectangle height.
const source = [
  { name: '虚拟货币挖矿', value: 94, category: 0 },
  { name: '永恒之蓝', value: 120, category: 0 },
  { name: 'ABCD一二三', value: 110, category: 0 },
  { name: 'Zeus 家族', value: 86, category: 1 },
  { name: '移动病毒', value: 72, category: 1 },
  { name: '僵尸病毒', value: 62, category: 0 },
  { name: 'Ramnit家族', value: 48, category: 1 },
  { name: 'Gbot家族', value: 42, category: 1 },
  { name: '暗云木马', value: 36, category: 1 },
  { name: '僵尸病毒', value: 12, category: 0 },
  { name: 'Ramnit家族', value: 24, category: 1 },
]
const fontSizeRange = [12, 18] as const
const values = source.map(row => row.value)
const minValue = Math.min(...values)
const maxValue = Math.max(...values)
const fillAlpha = 0.3
const palette = computed(() => (isDark.value ? ['#FF164B', '#087FFF'] : ['#D94B65', '#216DE0']))
const options = computed<WordCloudChartProps>(() => ({
  shape: 'rect',
  motion: { amplitude: 20, duration: 10000 },
  name: '事件次数',
  sizeRange: [32, 58],
  label: { padding: [8, 20] },
  gap: 8,
  overlap: 0.12,
  categories: ['威胁事件', '病毒家族'].map((name, index) => ({
    name,
    itemStyle: { color: palette.value[index], opacity: 1 },
    emphasis: { itemStyle: { color: palette.value[index] } },
  })),
}))
const data = computed<WordCloudChartProps['data']>(() =>
  source.map((row, index) => {
    const rgb =
      row.category === 0
        ? isDark.value
          ? '255, 22, 75'
          : '217, 75, 101'
        : isDark.value
          ? '8, 127, 255'
          : '33, 109, 224'
    const weight = maxValue === minValue ? 0.5 : (row.value - minValue) / (maxValue - minValue)
    const fontSize = fontSizeRange[0] + weight * (fontSizeRange[1] - fontSizeRange[0])
    const alpha = fillAlpha
    return {
      id: `event-${index}`,
      name: row.name,
      value: row.value,
      category: row.category,
      label: {
        formatter: row.category === 0 ? '{b}（{c}）' : '{b}',
        fontSize,
        color: isDark.value ? '#E5EEFF' : row.category === 0 ? '#913448' : '#235493',
      },
      itemStyle: {
        color: isDark.value
          ? {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `rgba(${rgb}, ${alpha})` },
                { offset: 0.5, color: `rgba(${rgb}, ${alpha * 0.45})` },
                { offset: 1, color: `rgba(${rgb}, ${alpha * 0.8})` },
              ],
            }
          : `rgba(${rgb}, ${alpha * 0.5})`,
        borderColor: `rgba(${rgb}, ${isDark.value ? 0.65 : 0.5})`,
        borderWidth: 0.6,
        // Put alpha in the fill so it does not fade the border or label.
        opacity: 1,
        shadowBlur: 0,
      },
    }
  }),
)
</script>
<template>
  <IxWordCloudChart
    v-bind="options"
    :data="data"
    class="custom-rect"
    :class="{ 'custom-rect-dark': isDark }"
    style="height: 340px"
  />
</template>
<style scoped>
.custom-rect {
  background: radial-gradient(ellipse at center, #ffffff, #f2f6fc);
}
.custom-rect-dark {
  background: #001528;
}
</style>
<archive-meta lang="json">
{
  "title": "自定义样式（以矩形标签为例）",
  "description": "适用于安全运营看板中需要突出事件类别和热度的场景。本例用不同颜色区分威胁事件与病毒家族，以标签大小体现发生次数，并适配浅色与暗黑展示环境。",
  "index": 4
}
</archive-meta>
