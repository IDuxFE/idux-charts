import { IxPieChart } from '@idux/charts'
import { getInstanceByDom } from 'echarts/core'

export default {
  data: () => ({
    align: undefined,
    radius: undefined,
    label: undefined,
    legend: undefined,
    width: 480,
    values: [145, 124, 118, 92, 54, 21],
  }),
  render() {
    const h = this.$createElement
    const button = (text, action) => h('button', { on: { click: action } }, text)
    return h('main', {}, [
      button('Ring', () => {
        this.align = 'center'
        this.radius = ['88%', '100%']
        this.label = { position: 'center', formatter: () => 'Assets' }
      }),
      button('Presentation', () => {
        this.legend = { itemGap: 8, textStyle: { fontSize: 24 } }
      }),
      button('Align', () => {
        this.align = 'bottom-end'
      }),
      button('Resize', () => {
        this.width = 600
      }),
      button('Zero', () => {
        this.values = [0, 0, 0]
      }),
      button('Missing', () => {
        this.values = [10, null]
      }),
      button('Empty', () => {
        this.values = []
      }),
      h(IxPieChart, {
        class: 'basic-chart',
        style: { width: `${this.width}px`, height: '180px' },
        attrs: {
          layoutMode: 'auto',
          align: this.align,
          radius: this.radius,
          label: this.label,
          legend: this.legend,
          data: this.values.map((value, index) => ({ name: `图例${index + 1}`, value })),
          animation: false,
        },
      }),
    ])
  },
}
window.basicPieState = () => {
  const el = document.querySelector('.basic-chart')
  const chart = el && getInstanceByDom(el)
  return chart ? { id: chart.id, width: chart.getWidth(), option: chart.getOption() } : null
}
