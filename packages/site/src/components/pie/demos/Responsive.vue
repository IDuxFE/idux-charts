<script setup lang="ts">
import { computed, ref } from 'vue'

const width = ref(480)
const height = ref(240)
const count = ref(6)
const legend = ref(true)
const title = ref(false)
const shape = ref('pie')
const data = computed(() =>
  Array.from({ length: count.value }, (_, i) => ({ name: `分类 ${i + 1}`, value: (i + 1) * 10 })),
)
// 总数及标题文案由业务显式声明，随分类数量更新。
const total = computed(() => data.value.reduce((sum, item) => sum + item.value, 0))
const businessTitle = computed(() => ({
  show: title.value,
  text: `{value|${total.value}}`,
  subtext: '统计总数',
  itemGap: 8,
  textStyle: {
    lineHeight: 28,
    rich: {
      value: { fontSize: 28, fontWeight: 700, fontFamily: 'IDuxChartDemoDIN, D-DIN-PRO' },
    },
  },
}))
</script>
<template>
  <div class="responsive-pie-demo">
    <div class="controls">
      <div class="control" role="group" aria-label="宽度">
        <span>宽度</span
        ><IxSlider
          class="chart-demo-slider"
          v-model:value="width"
          :min="240"
          :max="800"
          :step="10"
        /><span>{{ width }}px</span>
      </div>
      <div class="control" role="group" aria-label="高度">
        <span>高度</span
        ><IxSlider
          class="chart-demo-slider"
          v-model:value="height"
          :min="160"
          :max="600"
          :step="10"
        /><span>{{ height }}px</span>
      </div>
      <div class="control">
        <span>数据量</span>
        <IxRadioGroup v-model:value="count" buttoned aria-label="数据量"
          ><IxRadio :key="6">6 项</IxRadio><IxRadio :key="30">30 项</IxRadio></IxRadioGroup
        >
      </div>
      <div class="control">
        <span>形态</span>
        <IxRadioGroup v-model:value="shape" buttoned aria-label="形态"
          ><IxRadio key="pie">实心</IxRadio><IxRadio key="ring">环图</IxRadio
          ><IxRadio key="rose">玫瑰图</IxRadio></IxRadioGroup
        >
      </div>
      <div class="control"
        ><span>图例</span><IxSwitch v-model:checked="legend" aria-label="图例"
      /></div>
      <div class="control"
        ><span>业务标题</span><IxSwitch v-model:checked="title" aria-label="业务标题"
      /></div>
    </div>
    <div class="stage" :style="{ width: `${width}px`, height: `${height}px` }">
      <IxPieChart
        name="资产分布"
        :data="data"
        align="center"
        :legend="{ show: legend }"
        :title="businessTitle"
        :radius="shape === 'ring' ? ['70%', '80%'] : undefined"
        :rose-type="shape === 'rose' ? 'area' : undefined"
      />
    </div>
  </div>
</template>
<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}
.control {
  display: flex;
  align-items: center;
  gap: 12px;
}
.stage {
  max-width: 100%;
  outline: 1px dashed var(--ix-color-border);
}
</style>
<archive-meta lang="json">
{
  "title": "形态与自适应",
  "description": "通过宽高、数据量、形态及可见性控件验证自适应布局。",
  "index": 11
}
</archive-meta>
