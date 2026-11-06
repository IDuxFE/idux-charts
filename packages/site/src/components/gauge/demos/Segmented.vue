<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'
import { Empty, Loading, addIconDefinitions, IxIcon } from '@idux/components/icon'

addIconDefinitions([Empty, Loading])
const { themeTokens } = useThemeToken()
const size = ref<'lg' | 'md'>('lg')
const state = ref('normal')
const chartStyle = computed(() => ({
  width: size.value === 'lg' ? '180px' : '144px',
  height: size.value === 'lg' ? '110px' : '90px',
}))
const valueOf = (value: number) => (state.value === 'zero' ? 0 : value)
const scenario = ref('storage')
const segments = computed(() =>
  scenario.value === 'storage'
    ? [
        { upper: 0.65, color: '#4089FF', label: '存储充足' },
        { upper: 0.85, color: '#FFC343', label: '存储饱和' },
        { upper: 1, color: '#FF6B57', label: '存储缺乏' },
      ]
    : [
        { upper: 0.6, color: '#FF6B57', label: '差' },
        { upper: 0.8, color: '#FF9448', label: '中' },
        { upper: 0.9, color: '#FFC343', label: '良' },
        { upper: 1, color: '#18C894', label: '优' },
      ],
)
const data = computed(() =>
  (scenario.value === 'storage' ? [37, 68, 89] : [18, 69, 82, 93]).map(value => ({ value })),
)
const segmentLabel = (value: number) =>
  segments.value.find(segment => value / 100 <= segment.upper)?.label ?? ''

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
    timer = undefined
  }, 800)
}
watch(state, next => {
  if (next !== 'loading') cancel()
})
onBeforeUnmount(cancel)
</script>
<template>
  <IxSpace vertical class="gauge-segmented">
    <IxSpace wrap>
      <IxRadioGroup v-model:value="size" buttoned aria-label="仪表尺寸">
        <IxRadio key="lg">大</IxRadio><IxRadio key="md">中</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="state" buttoned aria-label="数据状态">
        <IxRadio key="normal">正常</IxRadio><IxRadio key="zero">数值为 0</IxRadio>
        <IxRadio key="empty">空状态</IxRadio><IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="scenario" buttoned aria-label="业务场景">
        <IxRadio key="storage">存储状态</IxRadio>
        <IxRadio key="score">评分等级</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <div class="stage">
      <IxEmpty v-if="state === 'empty'" simple description="暂无数据">
        <IxButton mode="link" @click="reload">重新加载</IxButton>
      </IxEmpty>
      <div
        v-else-if="state === 'loading'"
        class="loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <IxIcon name="loading" :size="24" />图表正在加载中，请稍后...
      </div>
      <template v-else>
        <IxGaugeChart
          v-for="(item, index) in data"
          :key="index"
          :value="valueOf(item.value)"
          :size="size"
          :style="chartStyle"
          :segments="segments"
          :valueFormatter="scenario === 'score' ? segmentLabel : undefined"
          :valueFontSize="scenario === 'score' ? 24 : 32"
          :label="scenario === 'score' ? `${valueOf(item.value)} 分` : undefined"
          :textColor="themeTokens.colorText"
          :labelColor="themeTokens.colorTextInfo"
          :backgroundColor="themeTokens.colorInfoContainerBgDisabled"
        />
      </template>
    </div>
  </IxSpace>
</template>
<style scoped>
.gauge-segmented {
  width: 100%;
}
.stage {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  min-height: 110px;
  padding: 24px 0;
}
.loading {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ix-color-text-info);
}
</style>
<archive-meta lang="json">
{
  "title": "分段仪表盘",
  "description": "阈值由业务提供，精确边界属于前一段；切换存储和评分场景。",
  "index": 3
}
</archive-meta>
