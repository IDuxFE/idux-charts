<script setup lang="ts">
const value = 72
const target = 85
const formatPercent = (value: unknown) => `${value}%`
</script>

<template>
  <section class="bullet-details">
    <IxDesc header="采集任务详情" :col="1" :label-width="80" label-align="start">
      <IxDescItem label="任务名称">终端资产采集</IxDescItem>
      <IxDescItem label="所属分组">办公终端</IxDescItem>
      <IxDescItem label="执行周期">每天 02:00</IxDescItem>
      <IxDescItem label="采集完成率">
        <div class="bullet-details-metric">
          <IxBulletChart
            class="bullet-details-chart"
            style="width: 100%; height: 20px"
            :value="value"
            :target="target"
            name="完成率"
            :tooltip="{ valueFormatter: formatPercent }"
          />
          <div class="bullet-details-values">
            <span class="bullet-details-value">{{ formatPercent(value) }}</span>
            <span>目标 {{ formatPercent(target) }}</span>
          </div>
        </div>
      </IxDescItem>
      <IxDescItem label="负责人">张明</IxDescItem>
      <IxDescItem label="最近更新">2026-11-25 09:30</IxDescItem>
    </IxDesc>
  </section>
</template>

<style scoped>
.bullet-details {
  width: 400px;
  max-width: 100%;
}

.bullet-details-metric {
  width: 100%;
  min-width: 0;
}

.bullet-details-values {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  color: var(--ix-color-text-info);
}

.bullet-details-value {
  color: var(--ix-color-text);
  font-size: 16px;
  font-weight: 600;
}
</style>

<archive-meta lang="json">
{
  "title": "数据展示场景",
  "description": "适用于详情页或侧边详情面板，在查看任务信息的同时，直观对比完成率与目标值，快速了解任务达标情况。",
  "index": 7
}
</archive-meta>
