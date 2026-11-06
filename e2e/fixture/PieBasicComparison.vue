<script setup lang="ts">
import { computed, ref } from 'vue'
import { IxPieChart } from '@idux/charts'
import type { PieChartAlign } from '@idux/charts'
import { getInstanceByDom } from 'echarts/core'
import PieBasicReference from './PieBasicReference.vue'

const status = ref<'normal' | 'allZero' | 'missing' | 'empty' | 'loading'>('normal')
const align = ref<PieChartAlign>('center-start')
const positions: PieChartAlign[] = [
  'top-start',
  'top-center',
  'top-end',
  'center-start',
  'center',
  'center-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
]
Object.assign(window, {
  pieAlignmentState: () => {
    const el = document.querySelector('[data-testid=actual] [_echarts_instance_]') as HTMLElement
    const chart = getInstanceByDom(el)!
    return { id: chart.id, option: chart.getOption() }
  },
})
const referenceSize = new URLSearchParams(location.search).has('reference')
const explicit = ref(false)
const styled = ref(false)
const hideLegend = ref(false)
const hideTitle = ref(false)
const many = ref(false)
const shape = ref('pie')
const readyCount = ref(0)
const clicks = ref(0)
const width = ref(480)
const height = ref(180)
const data = computed(() =>
  (many.value ? Array.from({ length: 30 }, (_, i) => i + 1) : [145, 124, 118, 92, 54, 21]).map(
    (value, index) => ({
      name: `图例${index + 1}`,
      value:
        status.value === 'missing' && index === 3 ? null : status.value === 'allZero' ? 0 : value,
      missingReason: '数据缺失，xxxxxxxx缺失原因，请进行xxx解决方案',
    }),
  ),
)
function setCrowded(value: boolean) {
  width.value = value ? 280 : 480
  height.value = 180
  many.value = value
}
function resize() {
  width.value = 600
  height.value = 240
}
const presentation = computed(() => {
  const total = data.value.reduce((sum, item) => sum + (item.value ?? 0), 0)
  return {
    name: '基础饼图',
    title: {
      text: `{label|统计总数}  {value|${total}}`,
      textStyle: {
        fontSize: 30,
        lineHeight: 16,
        rich: { value: { fontFamily: 'IDuxChartDemoDIN, D-DIN-PRO' } },
      },
    },
    legend: {
      formatter: (name: string) => {
        const item = data.value.find(item => item.name === name)
        return item?.value == null
          ? `{label|${name}}{missing|数据缺失 ⓘ}`
          : `{label|${name}}{value|${item.value}}`
      },
      textStyle: {
        rich: {
          label: { fontSize: 12 },
          value: { fontSize: 12 },
          missing: { fontSize: 12 },
        },
      },
    },
  }
})
</script>
<template>
  <button @click="status = 'normal'">Normal</button>
  <button @click="status = 'allZero'">Zero</button>
  <button @click="status = 'missing'">Missing</button>
  <button @click="resize">Resize</button>
  <button @click="height = 300">Tall</button>
  <button @click="hideLegend = !hideLegend">Toggle legend</button>
  <button @click="hideTitle = !hideTitle">Toggle title</button>
  <button @click="setCrowded(true)">Crowded</button>
  <button @click="setCrowded(false)">Restore</button>
  <select aria-label="Shape" v-model="shape"
    ><option>pie</option
    ><option>ring</option
    ><option>rose</option></select
  >
  <button @click="styled = !styled">Presentation</button>
  <button @click="explicit = !explicit">Toggle layout</button>
  <output data-testid="ready-count">{{ readyCount }}</output>
  <output data-testid="click-count">{{ clicks }}</output>
  <select aria-label="Alignment" v-model="align">
    <option :value="'center-start'">Default</option>
    <option v-for="position in positions" :key="position" :value="position">{{ position }}</option>
  </select>
  <div data-testid="reference"
    ><PieBasicReference :status="status" :width="width" :height="height"
  /></div>
  <div data-testid="actual"
    ><IxPieChart
      :data="data"
      :align="align"
      v-bind="explicit ? {} : presentation"
      :center="explicit ? ['50%', '50%'] : undefined"
      :title="
        explicit
          ? undefined
          : hideTitle
            ? { show: false }
            : styled
              ? { text: '554', subtext: 'Assets' }
              : presentation.title
      "
      :legend="
        explicit
          ? undefined
          : hideLegend
            ? { show: false }
            : styled
              ? { itemGap: 8, textStyle: { fontSize: 24 } }
              : presentation.legend
      "
      :radius="
        explicit
          ? ['30%', '65%']
          : shape === 'ring'
            ? ['70%', '80%']
            : referenceSize
              ? 60 * Math.min(width / 480, height / 180)
              : undefined
      "
      :rose-type="shape === 'rose' ? 'area' : undefined"
      @ready="readyCount++"
      @click="clicks++"
      :animation="false"
      :style="{ width: `${width}px`, height: `${height}px` }"
  /></div>
</template>

<style>
body {
  font-family:
    pingfang SC,
    helvetica neue,
    arial,
    hiragino sans gb,
    microsoft yahei ui,
    microsoft yahei,
    simsun,
    sans-serif;
}
</style>
