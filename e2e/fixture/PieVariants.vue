<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, ref } from 'vue'
import { getInstanceByDom } from 'echarts/core'
const originals = import.meta.glob('./pie-reference/*.vue')
const demos = import.meta.glob('../../packages/site/src/components/pie/demos/*.vue')
const names = [
  'BasicTotal',
  'RingPie',
  'RingExternal',
  'RosePie',
  'RoseTotal',
  'LegendPercentage',
  'LegendColumns',
  'CardPie',
  'CardLightweight',
]
const name = ref('RingPie')
const status = ref<'normal' | 'allZero' | 'missing'>('normal')
const reference = computed(() =>
  defineAsyncComponent(originals[`./pie-reference/${name.value}.vue`] as any),
)
const demoNames: Record<string, string> = {
  BasicTotal: 'Basic',
  RingExternal: 'RingPie',
  RoseTotal: 'RosePie',
}
const actual = computed(() =>
  defineAsyncComponent(
    demos[
      `../../packages/site/src/components/pie/demos/${demoNames[name.value] ?? name.value}.vue`
    ] as any,
  ),
)
const change = async () => {
  status.value = 'normal'
  await nextTick()
}
Object.assign(window, {
  variantState: () =>
    ['reference', 'actual'].map(id => {
      const el = document.querySelector(`[data-testid=${id}] [_echarts_instance_]`)
      return el ? getInstanceByDom(el as HTMLElement)?.getOption() : null
    }),
})
</script>
<template>
  <select v-model="name" aria-label="Variant" @change="change"
    ><option v-for="item in names" :key="item">{{ item }}</option></select
  >
  <select v-model="status" aria-label="Reference state"
    ><option>normal</option
    ><option>allZero</option
    ><option>missing</option></select
  >
  <div data-testid="reference"
    ><component
      :is="reference"
      :status="status"
      :width="name === 'LegendColumns' ? 720 : 480"
      :height="name === 'LegendColumns' ? 240 : 180"
  /></div>
  <div data-testid="actual"><component :is="actual" /></div>
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
