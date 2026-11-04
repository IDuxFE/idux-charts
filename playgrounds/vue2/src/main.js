import Vue from 'vue'
import CompositionAPI from '@vue/composition-api'
Vue.use(CompositionAPI)
import { IxBarChart, IxLineChart, IxPieChart } from '@idux/charts'
import { getInstanceByDom, use } from 'echarts/core'
import { GraphicComponent } from 'echarts/components'
use([GraphicComponent])
import './style.css'

const initOption = { renderer: 'svg' }
const setOptionOpts = { notMerge: true }
const xAxis = { data: ['A', 'B', 'C'] }
// Keep plot bounds independent of platform-specific label font metrics.
const grid = { top: 56, bottom: 52, left: 56, right: 32, containLabel: false }
const kinds = { bar: IxBarChart, line: IxLineChart, pie: IxPieChart }
const App = {
  data: () => ({
    revision: 0,
    extra: false,
    loading: false,
    dark: false,
    mounted: true,
    narrow: false,
    clicks: 0,
  }),
  computed: {
    values() {
      return [10, 20, 30].map(n => n + this.revision * 5)
    },
    pieData() {
      return this.values.map((value, i) => ({ name: ['A', 'B', 'C'][i], value }))
    },
    titles() {
      return Object.fromEntries(
        Object.keys(kinds).map(kind => [kind, { text: `${kind} ${this.revision}` }]),
      )
    },
  },
  render() {
    const button = (id, text, action) =>
      this.$createElement('button', { attrs: { 'data-testid': id }, on: { click: action } }, text)
    const controls = [
      button('data', 'Update data and title', () => this.revision++),
      button('attrs', 'Add / remove marker', () => {
        this.extra = !this.extra
      }),
      button('loading', 'Toggle loading', () => {
        this.loading = !this.loading
      }),
      button('theme', 'Toggle theme', () => {
        this.dark = !this.dark
      }),
      button('size', 'Toggle width', () => {
        this.narrow = !this.narrow
      }),
      button('mount', 'Unmount / mount', () => {
        this.mounted = !this.mounted
      }),
    ]
    const charts = this.mounted
      ? Object.entries(kinds).map(([kind, component]) => {
          const values = this.values
          const attrs = {
            data: kind === 'pie' ? this.pieData : values,
            title: this.titles[kind],
            animation: false,
            loading: this.loading,
            theme: this.dark ? 'dark' : 'seer',
            'init-option': initOption,
            'set-option-opts': setOptionOpts,
            ...(kind === 'pie' ? {} : { xAxis, grid }),
            ...(this.extra
              ? {
                  graphic: [
                    {
                      type: 'text',
                      left: 'center',
                      top: 45,
                      style: { text: 'Extra marker', fill: '#7354ff' },
                    },
                  ],
                }
              : {}),
          }
          return this.$createElement('section', { key: kind }, [
            this.$createElement('h2', {}, kind),
            this.$createElement('div', { style: { height: '280px' } }, [
              this.$createElement(component, {
                attrs,
                class: 'chart',
                on: { click: () => this.clicks++ },
              }),
            ]),
          ])
        })
      : []
    return this.$createElement('main', {}, [
      this.$createElement('h1', {}, 'Vue 2 Chart Compatibility'),
      this.$createElement('div', {}, controls),
      this.$createElement(
        'p',
        { attrs: { 'data-testid': 'clicks' } },
        `Chart clicks: ${this.clicks}`,
      ),
      this.$createElement(
        'div',
        { class: 'charts', style: { width: this.narrow ? '600px' : '100%' } },
        charts,
      ),
    ])
  },
}

// Expose only read-only diagnostics for assertions against real ECharts instances.
window.chartState = () =>
  Array.from(document.querySelectorAll('.chart')).map(el => {
    const chart = getInstanceByDom(el)
    const option = chart?.getOption()
    return {
      id: chart?.id,
      type: option?.series?.[0]?.type,
      data: option?.series?.[0]?.data,
      title: option?.title?.[0]?.text,
      graphic: option?.graphic,
      width: chart?.getWidth(),
      height: chart?.getHeight(),
      disposed: !chart,
      svg: !!el.querySelector('svg'),
      loading: !!chart?._loadingFX,
      point:
        option?.series?.[0]?.type === 'bar'
          ? chart.convertToPixel({ seriesIndex: 0 }, [0, Number(option.series[0].data[0]) / 2])
          : null,
      background: option?.backgroundColor,
    }
  })
new Vue(App).$mount('#app')
