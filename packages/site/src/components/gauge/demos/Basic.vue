<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useThemeToken } from '@idux/components/theme'
import { Empty, addIconDefinitions } from '@idux/components/icon'

addIconDefinitions([Empty])
const { themeTokens } = useThemeToken()
const size = ref<'lg' | 'md'>('lg')
const state = ref('normal')
const chartStyle = computed(() => ({
  width: size.value === 'lg' ? '162px' : '134px',
  height: size.value === 'lg' ? '110px' : '90px',
}))
const valueOf = (value: number) => (state.value === 'zero' ? 0 : value)
const data = [
  { value: 24, color: '#FF6B57', status: '高危' },
  { value: 48, color: '#FFC343', status: '中危' },
  { value: 72, color: '#4089FF', status: '低危' },
  { value: 89, color: '#18C894', status: '安全' },
]

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
  <IxSpace vertical class="gauge-basic">
    <IxSpace wrap>
      <IxRadioGroup v-model:value="size" buttoned size="sm" aria-label="仪表尺寸">
        <IxRadio key="lg">大</IxRadio><IxRadio key="md">中</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="数据状态">
        <IxRadio key="normal">正常</IxRadio><IxRadio key="zero">数值为 0</IxRadio>
        <IxRadio key="empty">空状态</IxRadio><IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <div class="stage">
      <!-- 首个仪表承载整组空状态，其余仪表仅隐藏，切换状态时保留所有实例。 -->
      <div
        v-for="(item, index) in data"
        :key="index"
        v-show="state !== 'empty' || index === 0"
        :style="state === 'empty' ? { width: '100%', height: chartStyle.height } : chartStyle"
      >
        <IxGaugeChart
          :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
          :value="valueOf(item.value)"
          :size="size"
          style="width: 100%; height: 100%"
          :color="item.color"
          label="用户体验评分"
          valueFontFamily="D-DIN-PRO, sans-serif"
          :textColor="themeTokens.colorText"
          :labelColor="themeTokens.colorTextInfo"
          :backgroundColor="themeTokens.colorInfoContainerBgDisabled"
        >
          <IxEmpty v-if="state === 'empty' && index === 0" class="chart-empty" simple>
            <template #description>
              <IxSpace align="center">
                <span>暂无数据</span>
                <IxButton mode="link" size="sm" @click="reload" style="display: flex"
                  >重新加载</IxButton
                >
              </IxSpace>
            </template>
          </IxEmpty>
        </IxGaugeChart>
      </div>
    </div>
  </IxSpace>
</template>
<style scoped>
.chart-empty {
  /* 清除 IxEmpty 的默认外边距，让遮罩背景覆盖整个图表。 */
  margin: 0;
  background: var(--ix-color-container-bg);
}

.gauge-basic {
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
</style>
<archive-meta lang="json">
{
  "title": "基础数值型",
  "description": "同一组件呈现四种业务颜色，支持大小、零值、空态、加载和重试。",
  "index": 0
}
</archive-meta>
