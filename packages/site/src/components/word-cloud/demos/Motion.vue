<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WordCloudChartProps, WordCloudShape } from '@idux/charts'

const enabled = ref(true)
const pauseOnHover = ref(true)
const shape = ref<WordCloudShape>('text')
const amplitude = ref(12)
const duration = ref(6000)
const revision = ref(0)
const words = [
  '数据分析',
  '可视化',
  '用户体验',
  '产品设计',
  '云计算',
  '人工智能',
  '数据安全',
  '性能优化',
  '开放平台',
  '实时监控',
  '业务洞察',
  '协同办公',
  '自动化',
  '稳定可靠',
  '技术创新',
  '服务质量',
  '智能运维',
  '组件库',
  '开发效率',
  '持续交付',
]
const data = computed(() =>
  words.map((name, index) => ({
    id: `motion-${index}`,
    name,
    value: 100 - ((index * 7 + revision.value * 13) % 95),
  })),
)
const motion = computed(
  () =>
    enabled.value && {
      amplitude: amplitude.value,
      duration: duration.value,
      pauseOnHover: pauseOnHover.value,
    },
)
const options = computed<WordCloudChartProps>(() => ({
  name: '热度',
  shape: shape.value,
  motion: motion.value,
  sizeRange: shape.value === 'circle' ? [40, 88] : shape.value === 'text' ? [14, 44] : [24, 36],
  selectedMode: 'single',
}))
</script>
<template>
  <IxSpace vertical block align="stretch" :size="16">
    <IxSpace wrap align="center" :size="16">
      <IxSpace align="center" :size="8">
        <IxSwitch
          id="word-cloud-motion-enabled"
          v-model:checked="enabled"
          size="sm"
          style="display: flex"
        />
        <label for="word-cloud-motion-enabled">持续漂浮</label>
      </IxSpace>
      <IxSpace align="center" :size="8">
        <IxSwitch
          id="word-cloud-motion-pause-on-hover"
          v-model:checked="pauseOnHover"
          size="sm"
          style="display: flex"
        />
        <label for="word-cloud-motion-pause-on-hover">悬停暂停</label>
      </IxSpace>
      <IxRadioGroup v-model:value="shape" buttoned size="sm" aria-label="漂浮词云形态">
        <IxRadio key="text">文字</IxRadio>
        <IxRadio key="rect">矩形标签</IxRadio>
        <IxRadio key="circle">圆形气泡</IxRadio>
      </IxRadioGroup>
      <IxButton size="xs" @click="revision++">更新数据</IxButton>
    </IxSpace>
    <IxSpace wrap align="center" :size="16">
      <IxSpace align="center" :size="12" role="group" aria-label="漂浮幅度">
        <span>幅度</span>
        <IxSlider
          class="chart-demo-slider"
          v-model:value="amplitude"
          :min="0"
          :max="20"
          :step="1"
        />
        <span>{{ amplitude }}px</span>
      </IxSpace>
      <IxSpace align="center" :size="12" role="group" aria-label="漂浮周期">
        <span>周期</span>
        <IxSlider
          class="chart-demo-slider"
          v-model:value="duration"
          :min="2000"
          :max="12000"
          :step="1000"
        />
        <span>{{ duration / 1000 }}s</span>
      </IxSpace>
    </IxSpace>
    <IxWordCloudChart v-bind="options" :data="data" style="height: 360px" />
    <p class="hint"
      >每个词以不同节奏轻轻漂浮；将鼠标移到词条上可暂停并查看详情，移出后继续。布局会为移动范围预留空间。</p
    >
  </IxSpace>
</template>
<style scoped>
.hint {
  margin: 0;
  color: var(--site-color-text-info);
}
</style>
<archive-meta lang="json">
{
  "title": "持续漂浮",
  "description": "适用于展示大屏、热点话题墙等希望增加动态氛围的场景。词条持续轻微漂浮，悬停时暂停以便阅读；可调整漂浮节奏，并预览数据变化时的更新效果。",
  "index": 6
}
</archive-meta>
