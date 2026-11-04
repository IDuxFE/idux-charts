<script setup lang="ts">
import { IxSpace } from '@idux/components/space'
import { IxSwitch } from '@idux/components/switch'
import { IxBarChart } from '@idux/charts'
import type { BarChartProps } from '@idux/charts'
import { ref } from 'vue'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
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
    <IxBarChart style="height: 300px" :data="data" :loading="loading" v-bind="barOption" />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "加载中状态",
  "description": "加载中状态的配置与使用示例。",
  "index": 12
}
</archive-meta>
