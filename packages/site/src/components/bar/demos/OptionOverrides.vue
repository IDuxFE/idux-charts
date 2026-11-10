<script setup lang="ts">
import { ref } from 'vue'
import type { BarChartProps } from '@idux/charts'

const customized = ref(false)
const categories = ['周一', '周二', '周三', '周四', '周五']
const data = [120, 210, 160, 290, 240]
const overrides: BarChartProps = {
  barWidth: 14,
  color: ['#8352cc'],
  grid: { left: 56 },
  yAxis: { max: 500, interval: 100 },
  tooltip: { valueFormatter: value => `${value} 次` },
}
</script>

<template>
  <label class="bar-override-switch">
    应用外部配置
    <IxSwitch v-model:checked="customized" size="sm" aria-label="应用外部配置" />
  </label>
  <IxBarChart
    :categories="categories"
    :data="data"
    name="访问次数"
    v-bind="customized ? overrides : {}"
    style="width: 100%; height: 300px"
  />
</template>

<style scoped>
.bar-override-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
</style>

<archive-meta lang="json">
{
  "title": "外部配置覆盖默认值",
  "description": "开启开关后覆盖柱宽、配色、绘图区左边距、数值轴上限和提示框的数值文案。关闭后恢复分类布局的默认配置。",
  "index": 11
}
</archive-meta>
