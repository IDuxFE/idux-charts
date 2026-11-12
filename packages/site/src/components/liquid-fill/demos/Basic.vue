<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'
import { Empty, Loading, addIconDefinitions } from '@idux/components/icon'

addIconDefinitions([Empty, Loading])

const { themeTokens } = useThemeToken()
const value = ref(50)
const updateValue = (next: number | number[]) => {
  if (typeof next !== 'number' || !Number.isFinite(next)) return
  value.value = next
  state.value = 'normal'
}
const state = ref('normal')
const color = computed(() =>
  value.value >= 90 ? '#F36B58' : value.value >= 70 ? '#FFC74F' : '#20C997',
)
const status = computed(() =>
  value.value === 0 ? '' : value.value >= 90 ? '高危' : value.value >= 70 ? '中危' : '正常',
)
let timer: ReturnType<typeof setTimeout> | undefined
const cancel = () => {
  clearTimeout(timer)
  timer = undefined
}
const reload = () => {
  cancel()
  state.value = 'loading'
  timer = setTimeout(() => {
    state.value = 'normal'
  }, 800)
}
watch(state, next => {
  if (next !== 'loading') cancel()
})
onBeforeUnmount(cancel)
</script>
<template>
  <IxSpace vertical class="liquid-basic">
    <div class="controls">
      <span id="liquid-usage-label">使用率</span>
      <IxSlider
        class="chart-demo-slider"
        :value="value"
        :min="0"
        :max="100"
        :step="1"
        :tooltipFormatter="next => `${next}%`"
        aria-labelledby="liquid-usage-label"
        @update:value="updateValue"
      />
      <span>{{ value }}%</span>
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="数据状态">
        <IxRadio key="normal">有数据</IxRadio>
        <IxRadio key="empty">空状态</IxRadio>
        <IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
    </div>
    <p>{{
      value === 0
        ? '0 是有效数据：保留指标与百分比，不绘制水波。'
        : '拖动滑块调整水位，颜色随使用率切换。'
    }}</p>
    <div class="chart">
      <div v-if="state === 'empty'" class="placeholder">
        <IxEmpty simple description="暂无数据">
          <IxButton mode="link" size="sm" @click="reload">重新加载</IxButton>
        </IxEmpty>
      </div>
      <div
        v-else-if="state === 'loading'"
        class="placeholder"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <IxIcon name="loading" :size="32" />
        <span>图表正在加载中，请稍后...</span>
      </div>
      <template v-else>
        <span class="status" :style="{ color: themeTokens.colorPrimaryText }">{{ status }}</span>
        <IxLiquidFillChart
          :value="value"
          label="CPU"
          :color="color"
          :zeroColor="themeTokens.colorInfoContainerBgDisabled"
          :textColor="themeTokens.colorText"
          :backgroundColor="themeTokens.colorContainerBg"
          :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
          style="width: 100%; height: 100%"
        />
      </template>
    </div>
  </IxSpace>
</template>
<style scoped>
.liquid-basic {
  width: 100%;
}
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
p {
  color: var(--ix-color-text-info);
}
.chart {
  position: relative;
  height: 280px;
}
.status {
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  text-align: center;
  line-height: 24px;
}
.placeholder {
  flex-direction: column;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>
<archive-meta lang="json">
{
  "title": "基础型",
  "description": "公共组件负责双层相位水波、固定左右渐变、圆环与百分比排版。示例负责使用率阈值、状态文案和模拟请求；支持 0–100、空状态、加载和重试。",
  "index": 0
}
</archive-meta>
