// Use the consumer's Vue renderer and chart component to exercise the packed library.
export function createSlotsFixture(renderNode, Chart, isVue2) {
  return {
    data: () => ({ mode: 'element', dark: false, readyCount: 0 }),
    mounted() {
      window.slotFixtureState = () => {
        const chart = this.$refs.chart?.getEChartsInstance()
        return {
          id: chart?.id,
          width: chart?.getWidth(),
          height: chart?.getHeight(),
          readyCount: this.readyCount,
        }
      }
    },
    render() {
      const h = renderNode ?? this.$createElement
      const button = (label, action) =>
        h('button', isVue2 ? { on: { click: action } } : { onClick: action }, label)
      const slots = {
        default: () => {
          if (this.mode === 'text') return ['Slot notice']
          if (this.mode === 'blank') return ['   ']
          if (this.mode === 'empty') return []
          return [
            button('Retry', () => {
              this.mode = 'empty'
            }),
          ]
        },
      }
      const props = {
        categories: ['A', 'B'],
        data: [10, 20],
        animation: false,
        theme: this.dark ? 'dark' : 'seer',
        onReady: () => {
          this.readyCount++
        },
      }
      const style = { width: '400px', height: '240px' }
      return h('main', {}, [
        ...[
          ['element', 'Show content'],
          ['text', 'Text content'],
          ['blank', 'Blank content'],
          ['empty', 'Empty content'],
        ].map(([mode, label]) =>
          button(label, () => {
            this.mode = mode
          }),
        ),
        button('Change theme', () => {
          this.dark = !this.dark
        }),
        h(
          Chart,
          isVue2
            ? { attrs: props, style, ref: 'chart', scopedSlots: slots }
            : { ...props, style, ref: 'chart' },
          isVue2 ? undefined : slots,
        ),
      ])
    },
  }
}
