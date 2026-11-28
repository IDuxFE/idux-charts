// Use the consumer's Vue renderer and chart component to exercise the packed library.
export function createSlotsFixture(
  renderNode,
  Chart,
  isVue2,
  { native = false, initialMode = 'element', normalSlot = false } = {},
) {
  return {
    data: () => ({ mode: initialMode, dark: false, readyCount: 0 }),
    mounted() {
      window.slotFixtureState = () => {
        const chart = this.$refs.chart?.getEChartsInstance()
        return {
          id: chart?.id,
          width: chart?.getWidth(),
          height: chart?.getHeight(),
          readyCount: this.readyCount,
          areaFill: !!chart?.getOption()?.series?.[0]?.areaStyle,
          ...(normalSlot ? { data: chart?.getOption()?.series?.[0]?.data ?? [] } : {}),
        }
      }
    },
    render() {
      const h = renderNode ?? this.$createElement
      const button = (label, action) =>
        h('button', isVue2 ? { on: { click: action } } : { onClick: action }, label)
      const slots =
        this.mode === 'absent'
          ? {}
          : {
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
        ...(native
          ? {
              xAxis: { type: 'category', data: ['A', 'B'] },
              yAxis: { type: 'value' },
              series: [{ type: 'bar', data: [10, 20] }],
            }
          : {}),
        categories: ['A', 'B'],
        data: normalSlot && this.mode === 'element' ? [] : [10, 20],
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
          ['absent', 'Remove slot'],
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
            ? { attrs: props, style, ref: 'chart', ...(normalSlot ? {} : { scopedSlots: slots }) }
            : { ...props, style, ref: 'chart' },
          isVue2 ? (normalSlot ? (slots.default?.() ?? [this._e()]) : undefined) : slots,
        ),
      ])
    },
  }
}
