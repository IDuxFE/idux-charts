<script setup lang="ts">
import { ref } from 'vue'

import { type PieChartProps } from '@idux/charts'

const data = [
  { value: 145, name: '图例A' },
  { value: 124, name: '图例B' },
  { value: 118, name: '图例C' },
  { value: 110, name: '图例D' },
  { value: 104, name: '图例E' },
  { value: 92, name: '图例F' },
  { value: 80, name: '图例G' },
  { value: 72, name: '图例H' },
  { value: 60, name: '图例I' },
  { value: 52, name: '图例J' },
]

const pieOption: PieChartProps = {}

const loading = ref(true)
</script>
<template>
  <IxSpace block vertical :size="24">
    <IxSwitch v-model:checked="loading"></IxSwitch>
    <IxPieChart :data="data" :loading="loading" name="环形饼图" v-bind="pieOption" />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "加载中状态",
  "description": "",
  "index": 10
}
</archive-meta>
