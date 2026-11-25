<script setup lang="ts">
import { computed, ref } from 'vue'
const scenarios = [
  {
    key: 'normal',
    label: '正常',
    description: '拖动滑块调整实际值与目标值，渐变条表示实际值，细线表示目标值。',
  },
  {
    key: 'tiny',
    label: '极小值',
    description: '实际值为 0.01%，用于观察接近零时的实际条与数值标签。目标值仍可通过滑块调整。',
  },
  {
    key: 'zero',
    label: '全部值为 0',
    description: '实际值为 0，实际条长度为零，目标线仍按目标值显示。可拖动目标值滑块查看位置变化。',
  },
  {
    key: 'loading',
    label: '加载中',
    description: '展示组件内置的加载插图与提示，模拟数据请求中的状态。',
  },
]
const state = ref('normal')
const description = computed(
  () => scenarios.find(scenario => scenario.key === state.value)?.description,
)
const actual = ref(48)
const target = ref(85)
const value = computed(() =>
  state.value === 'zero' ? 0 : state.value === 'tiny' ? 0.01 : actual.value,
)
const updateValue = (next: number | number[]) => {
  if (typeof next !== 'number') return
  actual.value = next
  state.value = 'normal'
}
</script>
<template>
  <IxSpace vertical block>
    <IxSpace wrap align="center">
      <div class="bullet-slider-control">
        <span id="bullet-basic-value-label">实际值</span>
        <IxSlider
          class="chart-demo-slider"
          :value="value"
          :min="0"
          :max="100"
          :step="1"
          aria-labelledby="bullet-basic-value-label"
          @update:value="updateValue"
        />
        <span>{{ value }}</span>
      </div>
      <div class="bullet-slider-control">
        <span id="bullet-basic-target-label">目标值</span>
        <IxSlider
          class="chart-demo-slider"
          v-model:value="target"
          :min="0"
          :max="100"
          :step="1"
          aria-labelledby="bullet-basic-target-label"
        />
        <span>{{ target }}</span>
      </div>
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="单图数据状态">
        <IxRadio v-for="scenario in scenarios" :key="scenario.key" :value="scenario.key">
          {{ scenario.label }}
        </IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <p class="bullet-demo-description">{{ description }}</p>
    <IxBulletChart
      zero-text="暂无数据"
      :value="value"
      :target="target"
      :loading="state === 'loading' && { text: '加载中...' }"
      :tooltip="{ valueFormatter: (value: unknown) => `${value}%` }"
      style="width: 100%; height: 120px"
    />
  </IxSpace>
</template>
<style scoped>
.bullet-slider-control {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bullet-slider-control .chart-demo-slider {
  width: 160px;
}
.bullet-slider-control > span:last-child {
  min-width: 32px;
}

.bullet-demo-description {
  margin: 0;
  color: var(--ix-color-text-info);
}
</style>
<archive-meta lang="json">
{
  "title": "单子弹图——无范围区间",
  "description": "渐变条展示实际值，细线展示目标值。切换查看全零、极小值与加载状态。",
  "index": 0
}
</archive-meta>
