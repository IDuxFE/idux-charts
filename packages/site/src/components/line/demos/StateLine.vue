<script setup lang="ts">
import type { LineChartProps } from '@idux/charts'
import { ref } from 'vue'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
  name: '访问次数',
  title: { text: '折线图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
}

const loading = ref(true)
</script>
<template>
  <IxSpace block vertical :size="24">
    <IxSwitch v-model:checked="loading"></IxSwitch>
    <IxLineChart
      style="height: 300px"
      :data="data"
      :loading="loading && { text: '加载中...' }"
      v-bind="lineOption"
    />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "加载中状态",
  "description": "加载中状态的配置与使用示例。",
  "index": 12
}
</archive-meta>
