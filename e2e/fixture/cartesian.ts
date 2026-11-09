import '../../packages/charts/style/index.less'
import { createApp, h, ref } from 'vue'
import { getInstanceByDom, registerTheme } from 'echarts/core'
import { IxBarChart, IxLineChart, getBarLinearColor } from '@idux/charts'

const query = new URLSearchParams(location.search)
const portal = query.get('portal')
registerTheme('fixture-dark', {
  darkMode: true,
  tooltip: { backgroundColor: '#111111', textStyle: { color: '#eeeeee' } },
  axisPointer: { lineStyle: { color: '#555555' } },
})
const dark = ref(false)
createApp({
  setup: () => () =>
    h('main', [
      h(
        'button',
        {
          id: 'theme',
          onClick: () => {
            dark.value = !dark.value
          },
        },
        'Toggle theme',
      ),
      h('div', { id: 'tooltip-host', 'data-ix-chart-theme': 'dark' }),
      ...[IxBarChart, IxLineChart].map((component, index) =>
        h(component, {
          class: `chart-${index}`,
          style: { width: '600px', height: '360px' },
          theme: (query.has('mixed') && index === 1 ? !dark.value : dark.value)
            ? portal === 'host'
              ? 'fixture-dark'
              : 'dark'
            : 'seer',
          animation: false,
          tooltip: {
            className: `demo-tooltip-${index}`,
            appendTo: portal === 'body' ? 'body' : portal === 'host' ? '#tooltip-host' : undefined,
          },
          setOptionOpts: { notMerge: true, lazyUpdate: true },
          xAxis: [{ data: ['A', 'B', 'C'] }],
          yAxis: [{ name: 'ms' }, { id: 'ratio', name: '%' }],
          series: [
            {
              name: 'Latency',
              data: [10, 20, 30],
              itemStyle: { color: getBarLinearColor('#458FFF', 'transparent') },
              markLine: {
                data: [{ name: 'Threshold', yAxis: 15, label: { formatter: 'Threshold' } }],
              },
              markPoint: { data: [{ name: 'Peak', type: 'max', label: { formatter: 'Peak' } }] },
              markArea: { data: [[{ name: 'Window', xAxis: 'A' }, { xAxis: 'B' }]] },
            },
            { name: 'Rate', data: [40, 50, 60], yAxisId: 'ratio' },
          ],
        }),
      ),
    ]),
}).mount('#app')
Object.assign(window, {
  cartesianPointerColor: (index: number) => {
    const option = getInstanceByDom(
      document.querySelector(`.chart-${index}`) as HTMLElement,
    )?.getOption()
    return (
      (option?.tooltip as any)?.[0]?.axisPointer?.lineStyle?.color ??
      (option?.axisPointer as any)?.[0]?.lineStyle?.color
    )
  },
  showCartesianTooltip: (index: number) =>
    getInstanceByDom(document.querySelector(`.chart-${index}`) as HTMLElement)?.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 0,
    }),
})
