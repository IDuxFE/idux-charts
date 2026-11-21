<script setup lang="ts">
import { ref } from 'vue'
import type { ChartProps } from '@idux/charts'

const state = ref('empty')
const option: ChartProps = {
  grid: { top: 24, bottom: 24, left: 40, right: 16 },
  xAxis: { type: 'category', data: ['周一', '周二', '周三'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [24, 36, 30] }],
}
</script>

<template>
  <IxSpace vertical block>
    <IxRadioGroup v-model:value="state" buttoned>
      <IxRadio key="chart">图表</IxRadio>
      <IxRadio key="empty">空状态</IxRadio>
      <IxRadio key="custom">自定义内容</IxRadio>
    </IxRadioGroup>
    <IxChart v-bind="option" style="height: 300px">
      <IxEmpty v-if="state === 'empty'" simple class="core-slot-empty">
        <template #description>
          <IxSpace align="center">
            <span>暂无数据</span>
            <IxButton mode="link" size="sm" @click="state = 'chart'" style="display: flex">
              重新加载
            </IxButton>
          </IxSpace>
        </template>
      </IxEmpty>
      <div v-else-if="state === 'custom'" class="core-slot-custom">
        <p>自定义说明和操作，也可以直接放入默认插槽。</p>
        <IxButton @click="state = 'chart'">查看图表</IxButton>
      </div>
    </IxChart>
  </IxSpace>
</template>

<style scoped>
.core-slot-empty,
.core-slot-custom {
  margin: 0;
}

.core-slot-empty {
  background: var(--ix-color-container-bg);
}

.core-slot-custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
</style>

<archive-meta lang="json">
{
  "title": "默认插槽",
  "description": "默认插槽浮在图表上方并自动铺满容器，可放置 IxEmpty 或自定义内容。切换状态时保留图表实例。",
  "index": 5
}
</archive-meta>
