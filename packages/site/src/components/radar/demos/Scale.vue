<script setup lang="ts">
import { ref } from 'vue'

const direction = ref('clockwise')
const status = ref('ready')
const indicator = [
  { name: '覆盖率（%）', min: 0, max: 100 },
  { name: '处理能力（千次/秒）', min: 0, max: 20 },
  { name: '稳定性（分）', min: 0, max: 10 },
  { name: '自动化率（%）', min: 0, max: 100 },
]
const data = [
  { name: '方案 A', value: [85, 12, 9, 70] },
  { name: '方案 B', value: [70, 18, 7, 90] },
]
</script>

<template>
  <IxSpace vertical block :size="16" class="radar-scale-demo">
    <IxSpace wrap :size="16">
      <IxRadioGroup v-model:value="direction" buttoned>
        <IxRadio key="clockwise">顺时针</IxRadio>
        <IxRadio key="counterclockwise">逆时针</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="status" buttoned>
        <IxRadio key="ready">展示数据</IxRadio>
        <IxRadio key="loading">原生加载遮罩</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxRadarChart
      :indicator="indicator"
      :data="data"
      :clockwise="direction === 'clockwise'"
      :loading="status === 'loading' && { text: '正在更新评估数据' }"
      area
      radius="55%"
      :center="['50%', '46%']"
      style="height: 360px; width: 100%"
    />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "独立量程与方向",
  "description": "每个维度使用独立量程，数值保持原始单位。切换方向无需手动反转数据；原生加载遮罩保留图表实例和已有数据。百分比半径随容器尺寸调整。",
  "index": 2
}
</archive-meta>
