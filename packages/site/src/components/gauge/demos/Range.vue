<script setup lang="ts">
import { ref } from 'vue'
const value = ref(48)
</script>
<template>
  <IxSpace vertical class="gauge-range">
    <IxRadioGroup v-model:value="value" buttoned aria-label="容量">
      <IxRadio :key="0">0 GB</IxRadio>
      <IxRadio :key="48">48 GB</IxRadio>
      <IxRadio :key="64">64 GB</IxRadio>
      <IxRadio :key="80">80 GB（超量程）</IxRadio>
    </IxRadioGroup>
    <IxGaugeChart :value="value" :max="64" label="容量 / GB" style="width: 180px; height: 110px" />
  </IxSpace>
</template>
<archive-meta lang="json">
{
  "title": "自定义量程",
  "description": "容量范围为 0–64 GB，超量程时指示位置停在端点，文字保留实际数值。",
  "index": 4
}
</archive-meta>
