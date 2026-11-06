import {
  IxPieChart,
  IxGaugeChart,
  IxLiquidFillChart,
  IxRadarChart,
  PLOT_THEME_TOKEN,
} from '@idux/charts'
import { getInstanceByDom } from 'echarts/core'
// This page consumes packed packages, including global reactive theme injection.
export default {
  data: () => ({
    theme: {
      color: undefined,
      textColor: undefined,
      secondaryTextColor: undefined,
      fontFamily: undefined,
    },
    localTheme: undefined,
    mode: 'auto',
    styled: false,
    value: 50,
  }),
  provide() {
    return { [PLOT_THEME_TOKEN]: this.theme }
  },
  render() {
    const h = this.$createElement
    const button = (text, action) => h('button', { on: { click: action } }, text)
    const chart = (component, name, props) =>
      h(component, {
        class: `theme-${name}`,
        style: { width: '480px', height: '240px' },
        attrs: {
          ...props,
          plotTheme: this.localTheme,
          initOption: { renderer: 'svg' },
          animation: false,
        },
      })
    return h('main', {}, [
      button('Theme', () =>
        Object.assign(this.theme, {
          color: '#8754cc',
          textColor: '#123456',
          secondaryTextColor: '#345678',
          fontFamily: 'monospace',
        }),
      ),
      button('Clear theme', () =>
        Object.keys(this.theme).forEach(key => {
          this.theme[key] = undefined
        }),
      ),
      button('Local theme', () => {
        this.localTheme = { textColor: '#abcdef' }
      }),
      button('Clear local', () => {
        this.localTheme = undefined
      }),
      button('Text styles', () => {
        this.styled = !this.styled
      }),
      button('Native', () => {
        this.mode = 'native'
      }),
      button('Auto', () => {
        this.mode = 'auto'
      }),
      button('Zero', () => {
        this.value = 0
      }),
      button('Empty', () => {
        this.value = null
      }),
      button('Restore', () => {
        this.value = 50
      }),
      chart(IxPieChart, 'pie', {
        layoutMode: this.mode,
        data:
          this.value === null
            ? []
            : [
                { name: 'Alpha', value: this.value },
                { name: 'Beta', value: 20 },
              ],
        color: ['#8754cc', '#20cc94'],
        seriesStyle: this.styled
          ? { itemStyle: { borderWidth: 4 }, emphasis: { scale: false } }
          : undefined,
      }),
      ...[
        [IxGaugeChart, 'gauge'],
        [IxLiquidFillChart, 'liquid'],
      ].map(([component, name]) =>
        chart(component, name, {
          value: this.value,
          label: 'Capacity',
          waveAnimation: false,
          valueTextStyle: this.styled ? { fontSize: 26, fontFamily: 'monospace' } : undefined,
          labelTextStyle: this.styled ? { fontSize: 17 } : undefined,
        }),
      ),
      chart(IxRadarChart, 'radar', {
        indicator: ['Speed', 'Quality', 'Cost'].map(name => ({ name, max: 100 })),
        data: this.value === null ? [] : [{ name: 'Current', value: [this.value, 70, 80] }],
      }),
    ])
  },
}
window.themePlotState = () =>
  Object.fromEntries(
    ['pie', 'gauge', 'liquid', 'radar'].map(name => {
      const chart = getInstanceByDom(document.querySelector(`.theme-${name}`))
      return [name, chart ? { id: chart.id, option: chart.getOption() } : null]
    }),
  )
