<script setup lang="ts">
import { ref } from 'vue'

import { type LineChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const lineOption: LineChartProps = {
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
    <IxLineChart style="height: 300px" :data="data" :loading="loading" v-bind="lineOption" />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "加载中状态",
  "description": "",
  "index": 12
}
</archive-meta>
