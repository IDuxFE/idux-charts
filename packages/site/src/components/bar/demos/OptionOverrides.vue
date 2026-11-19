<script setup lang="ts">
import { ref } from 'vue'
import { useStripeBarSeries, useStripeBarTooltip } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'

const customized = ref(false)
const categories = ['周一', '周二', '周三', '周四', '周五']
const data = [120, 210, 160, 290, 240]
const overrides: BarChartProps = {
  label: { show: true },
  barWidth: 14,
  color: ['#8352cc'],
  grid: { left: 56 },
  yAxis: { max: 500, interval: 100 },
  tooltip: useStripeBarTooltip('次'),
  xAxis: { data: categories },
  series: useStripeBarSeries({
    series: { name: '访问次数', data },
    color: 'rgba(255,255,255,0.65)',
    size: [7, 2],
  }),
}
</script>

<template>
  <label class="bar-override-switch">
    应用外部配置
    <IxSwitch v-model:checked="customized" size="sm" aria-label="应用外部配置" />
  </label>
  <IxBarChart
    :categories="customized ? undefined : categories"
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
  "description": "开启开关后覆盖柱宽、配色、绘图区左边距、数值轴上限和提示框的数值文案，并通过自定义系列开启悬浮条纹。关闭后恢复分类布局的默认配置。",
  "index": 10
}
</archive-meta>
