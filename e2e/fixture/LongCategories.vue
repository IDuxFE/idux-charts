<script setup lang="ts">
import { computed, ref } from 'vue'
import { IxBarChart, IxBulletChart } from '@idux/charts'
import { getInstanceByDom } from 'echarts/core'

Object.assign(window, {
  showLongCategoryTooltip: (type: string) => {
    const element = document.querySelector(`.long-${type} [_echarts_instance_]`) as HTMLElement
    getInstanceByDom(element)?.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: 0 })
  },
})

const zero = ref(false)
const dark = ref(false)
const narrow = ref(false)
const zoom = ref(false)
const short = ref(false)
const names = computed(() =>
  ['正常类别', '缺失类别', '零值类别'].map(prefix =>
    short.value ? prefix : `${prefix}${'超长类别名称'.repeat(20)}<生产集群02>`,
  ),
)
const data = computed(() =>
  names.value.map((name, index) => ({
    name,
    value: zero.value ? 0 : index === 1 ? null : index === 0 ? 50 : 0,
    target: 80,
    missingReason: '采集失败，暂无数据',
  })),
)
const options = computed(() => ({
  style: { width: narrow.value ? '360px' : '600px', height: '280px' },
  animation: false,
  theme: dark.value ? 'dark' : 'seer',
  zeroText: '暂无数据',
  dataZoom: zoom.value
    ? {
        type: 'slider' as const,
        yAxisIndex: 0,
        startValue: 1,
        endValue: 2,
        filterMode: 'filter' as const,
      }
    : undefined,
}))
</script>
<template>
  <button id="zero" @click="zero = !zero">Toggle zero</button>
  <button id="dark" @click="dark = !dark">Toggle dark</button>
  <button id="narrow" @click="narrow = !narrow">Toggle narrow</button>
  <button id="zoom" @click="zoom = !zoom">Toggle zoom</button>
  <button id="short" @click="short = !short">Toggle short</button>
  <IxBarChart
    class="long-bar"
    v-bind="options"
    layout="horizontal"
    :categories="names"
    :data="data"
    :tooltip="{ className: 'long-tooltip-bar' }"
  />
  <IxBulletChart
    class="long-bullet"
    v-bind="options"
    :data="data"
    :tooltip="{ className: 'long-tooltip-bullet' }"
  />
</template>
