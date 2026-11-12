<script setup lang="ts">
import { seerColorsForRisk, useTooltipsFormatter } from '@idux/charts'
import type { PieChartProps } from '@idux/charts'

// 将颜色绑定到等级，筛选或重排数据时仍保留对应的风险颜色。
const data = [
  { value: 30, name: '严重' },
  { value: 60, name: '高危' },
  { value: 120, name: '中危' },
  { value: 150, name: '低危' },
  { value: 50, name: '信息' },
  { value: 40, name: '未定级' },
  { value: 35, name: '暂无风险' },
].map((item, index) => ({ ...item, itemStyle: { color: seerColorsForRisk[index] } }))
const total = data.reduce((sum, item) => sum + item.value, 0)
// 图例与扇区共用同一份业务提示，按分类名称查找数值和颜色。
const formatRiskTooltip = (name: string) => {
  const item = data.find(item => item.name === name)
  if (!item) return ''
  return useTooltipsFormatter(item.name, [
    { name: '风险数量', value: item.value, color: item.itemStyle.color },
    { name: '占全部风险', value: `${total ? ((item.value / total) * 100).toFixed(1) : '0.0'}%` },
    { name: '统计口径', value: '当前筛选范围' },
  ])
}
const tooltip: PieChartProps['tooltip'] = {
  trigger: 'item',
  formatter: params => {
    const item = Array.isArray(params) ? params[0] : params
    return item ? formatRiskTooltip(item.name) : ''
  },
}
const legend: PieChartProps['legend'] = {
  tooltip: {
    show: true,
    formatter: params => formatRiskTooltip(params.name),
  },
}
</script>
<template>
  <IxPieChart
    style="width: 600px; max-width: 100%; height: 300px"
    :data="data"
    name="风险数量"
    align="center"
    :radius="['70%', '80%']"
    :tooltip="tooltip"
    :legend="legend"
  />
</template>
<archive-meta lang="json">
{
  "title": "大尺寸：风险分布",
  "description": "为风险等级绑定语义颜色；悬浮扇区或图例查看风险数量、占全部风险的比例和统计口径。",
  "index": 91
}
</archive-meta>
