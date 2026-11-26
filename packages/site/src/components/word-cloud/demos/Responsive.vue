<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WordCloudChartProps, WordCloudShape } from '@idux/charts'

const width = ref(480)
const height = ref(320)
const count = ref(20)
const shape = ref<WordCloudShape>('text')
const options = computed<WordCloudChartProps>(() => ({ name: '词频', shape: shape.value }))

const words = [
  '味道',
  '套餐',
  '难吃',
  '差评',
  '包子',
  '外卖',
  '打电话',
  '餐具',
  '好吃',
  '商家',
  '孩子',
  '今天',
  '一般',
  '根本',
  '时间',
  '晚上',
  '要求',
  '知道',
  '全部',
  '网上',
  '配送',
  '服务态度',
  '口感',
  '分量',
  '包装',
  '价格',
  '优惠',
  '推荐',
  '回购',
  '新鲜',
  '早餐',
  '午餐',
  '晚餐',
  '热乎',
  '米饭',
  '面条',
  '饺子',
  '饮料',
  '排队',
  '送达时间',
  '性价比',
  '卫生',
  '店员',
  '口味',
  '辣度',
  '汤汁',
  '食材',
  '备注',
  '地址',
  '联系电话',
]
// Each item keeps the same identity and weight when the data count changes.
const data = computed(() =>
  Array.from({ length: count.value }, (_, index) => ({
    id: `word-${index}`,
    name:
      index < words.length
        ? words[index]!
        : `${words[index % words.length]} ${Math.floor(index / words.length) + 1}`,
    value: Math.max(5, 100 - index * 3),
  })),
)
</script>
<template>
  <IxSpace vertical block align="stretch" :size="16">
    <IxSpace wrap align="center" :size="16">
      <IxSpace align="center" :size="12" role="group" aria-label="词云宽度">
        <span>宽度</span>
        <IxSlider
          class="chart-demo-slider"
          v-model:value="width"
          :min="240"
          :max="800"
          :step="10"
        />
        <span>{{ width }}px</span>
      </IxSpace>
      <IxSpace align="center" :size="12" role="group" aria-label="词云高度">
        <span>高度</span>
        <IxSlider
          class="chart-demo-slider"
          v-model:value="height"
          :min="160"
          :max="600"
          :step="10"
        />
        <span>{{ height }}px</span>
      </IxSpace>
      <IxSpace align="center" :size="12" role="group" aria-label="词云数据量">
        <span>数据量</span>
        <IxSlider class="chart-demo-slider" v-model:value="count" :min="0" :max="100" :step="1" />
        <span>{{ count }} 项</span>
      </IxSpace>
      <IxSpace align="center" :size="12">
        <span>形态</span>
        <IxRadioGroup v-model:value="shape" buttoned size="sm" aria-label="词云形态">
          <IxRadio key="text">文字</IxRadio>
          <IxRadio key="rect">矩形标签</IxRadio>
          <IxRadio key="circle">圆形气泡</IxRadio>
        </IxRadioGroup>
      </IxSpace>
    </IxSpace>
    <IxWordCloudChart
      v-bind="options"
      :data="data"
      class="stage"
      :style="{ width: `${width}px`, height: `${height}px` }"
    />
    <p class="hint"
      >空间不足时会隐藏无法放下的词条；增大容器或减少数据量可查看不同排布。数据量设为 0
      可查看空状态。</p
    >
  </IxSpace>
</template>
<style scoped>
.stage {
  max-width: 100%;
  outline: 1px dashed var(--ix-color-border);
}
.hint {
  margin: 0;
  color: var(--site-color-text-info);
}
</style>
<archive-meta lang="json">
{
  "title": "形态与自适应",
  "description": "适用于词云需要放入不同尺寸的仪表盘卡片、侧栏或展示大屏的场景。可调整容器大小、数据量和展示形态，预览空间受限或词条密集时的阅读效果，选择合适的展示方式。",
  "index": 5
}
</archive-meta>
