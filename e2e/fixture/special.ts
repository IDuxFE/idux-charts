import { createApp, h, ref } from 'vue'
import { getInstanceByDom } from 'echarts/core'
import { IxRadarChart, IxGaugeChart, IxLiquidFillChart } from '@idux/charts'

const value = ref<number | null>(50),
  count = ref(5),
  area = ref(true),
  width = ref(240)
createApp({
  setup: () => () =>
    h('main', [
      h(
        'button',
        {
          id: 'zero',
          onClick: () => {
            value.value = 0
          },
        },
        'Zero',
      ),
      h(
        'button',
        {
          id: 'empty',
          onClick: () => {
            value.value = null
          },
        },
        'Empty',
      ),
      h(
        'button',
        {
          id: 'full',
          onClick: () => {
            value.value = 100
          },
        },
        'Full',
      ),
      h(
        'button',
        {
          id: 'shrink',
          onClick: () => {
            count.value = 3
            width.value = 180
            area.value = false
          },
        },
        'Shrink',
      ),
      h(IxRadarChart, {
        class: 'radar',
        style: { width: '400px', height: '340px' },
        area: area.value,
        indicator: Array.from({ length: count.value }, (_, i) => ({ name: `Axis ${i}`, max: 100 })),
        data:
          value.value === null
            ? []
            : [{ name: 'Current', value: Array(count.value).fill(value.value) }],
      }),
      h('div', { style: { display: 'flex', gap: '24px' } }, [
        h(IxGaugeChart, {
          class: 'gauge',
          value: value.value,
          label: 'Score',
          style: { width: `${width.value}px`, height: '150px' },
        }),
        h(IxGaugeChart, {
          class: 'segmented',
          value: value.value,
          segments: [
            { upper: 0.5, color: '#FFC343', label: 'Low' },
            { upper: 1, color: '#18C894', label: 'High' },
          ],
          style: { width: `${width.value}px`, height: '150px' },
        }),
        h(IxLiquidFillChart, {
          class: 'liquid',
          value: value.value,
          label: 'Usage',
          waveAnimation: false,
          style: { width: `${width.value}px`, height: '200px' },
        }),
      ]),
    ]),
}).mount('#app')
// Expose only chart state to browser assertions, avoiding renderer-private fields.
Object.assign(window, {
  specialState: () =>
    ['radar', 'gauge', 'segmented', 'liquid'].map(name => {
      const element = document.querySelector(`.${name}`) as HTMLElement
      const chart = getInstanceByDom(element)
      return { width: chart?.getWidth(), option: chart?.getOption() }
    }),
})
