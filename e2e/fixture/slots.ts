import { createApp, defineComponent, h, ref } from 'vue'
import { IxChart } from '@idux/charts'
import type { EChartsType } from 'echarts/core'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use([CanvasRenderer])
const params = new URLSearchParams(location.search)
const overlay = ref(true)
const dark = ref(false)
const instances: EChartsType[] = []
const renderer = params.get('renderer') === 'canvas' ? 'canvas' : 'svg'

createApp(
  defineComponent({
    setup: () => () =>
      h('main', [
        h(
          'button',
          {
            onClick: () => {
              overlay.value = !overlay.value
            },
          },
          'Toggle overlay',
        ),
        h(
          'button',
          {
            onClick: () => {
              dark.value = !dark.value
            },
          },
          'Toggle theme',
        ),
        h(
          IxChart,
          {
            style: {
              width: '400px',
              ...(params.has('minHeight')
                ? { height: 'auto', minHeight: '300px' }
                : { height: '300px' }),
            },
            'data-testid': 'chart-host',
            'aria-label': 'Slot chart',
            theme: dark.value ? 'dark' : 'seer',
            animation: false,
            initOption: { renderer },
            xAxis: { type: 'category', data: ['A', 'B'] },
            yAxis: { type: 'value' },
            series: [{ type: 'bar', data: [10, 20] }],
            onReady: (chart: EChartsType) => instances.push(chart),
          },
          {
            default: () =>
              overlay.value
                ? h(
                    'button',
                    {
                      'data-testid': 'slot-content',
                      onClick: () => {
                        overlay.value = false
                      },
                    },
                    'Reload',
                  )
                : null,
          },
        ),
      ]),
  }),
).mount('#app')

Object.assign(window, {
  slotState: () => ({
    count: instances.length,
    id: instances.at(-1)?.id,
    disposed: instances.slice(0, -1).every(chart => chart.isDisposed()),
    width: instances.at(-1)?.getWidth(),
    height: instances.at(-1)?.getHeight(),
  }),
})
