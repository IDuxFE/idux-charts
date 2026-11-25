<script setup lang="ts">
import type { BulletChartDataItem, BulletRange } from '@idux/charts'

const data: BulletChartDataItem[] = [
  { name: '办公终端', value: 92, target: 90 },
  { name: '生产服务器', value: 78, target: 90 },
  { name: '网络设备', value: 86, target: 90 },
  { name: '云主机', value: 56, target: 80 },
  { name: '分支资产', value: 42, target: 80 },
]
const ranges: BulletRange[] = [
  { upper: 60, label: '待提升' },
  { upper: 80, label: '良好' },
  { upper: 100, label: '优秀' },
]
const formatPercent = (value: unknown) => `${value}%`
</script>

<template>
  <IxCard shadow class="bullet-card">
    <template #header>
      <IxHeader title="资产采集达标情况" size="sm" />
    </template>
    <IxBulletChart
      style="width: 100%; height: 240px"
      :data="data"
      :ranges="ranges"
      :x-axis="{ axisLabel: { formatter: '{value}%' } }"
      name="完成率"
      :tooltip="{ valueFormatter: formatPercent }"
    />
  </IxCard>
</template>

<style scoped>
.bullet-card {
  margin: 8px;
  width: 640px;
  max-width: calc(100% - 16px);
}
</style>

<archive-meta lang="json">
{
  "title": "卡片场景",
  "description": "适用于仪表盘或工作台，集中对比各资产分组的完成率与目标值，快速识别达标情况和需要重点关注的分组。",
  "index": 6
}
</archive-meta>
