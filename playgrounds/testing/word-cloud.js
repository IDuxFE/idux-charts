/** Shared packed-library fixture: both Vue renderers exercise the same contract. */
export function createWordCloudFixture(renderNode, Chart, isVue2) {
  const charts = []
  return {
    data: () => ({
      revision: 0,
      dark: false,
      mounted: true,
      motion: false,
      loading: false,
      invalidSize: false,
      bareMotion: false,
    }),
    mounted() {
      window.wordCloudCharts = charts
      window.wordCloudState = () =>
        window.wordCloudCharts
          .filter(chart => !chart.isDisposed())
          .map(chart => {
            const model = chart.getModel().getSeriesByIndex(0)
            const data = model.getData()
            return {
              id: chart.id,
              selected: model.getSelectedDataIndices(),
              values: chart.getOption().series[0].data.map(item => item.value),
              nodes: Array.from({ length: data.count() }, (_, index) => {
                const path = data.getItemGraphicEl(index)?.childAt(0)
                return {
                  id: data.getId(index),
                  rawIndex: data.getRawIndex(index),
                  position: data.getItemLayout(index),
                  offset: path ? [path.x, path.y] : null,
                  floating: !!path?.animators.some(
                    animator => animator.scope === 'ix-word-cloud-motion',
                  ),
                }
              }),
            }
          })
    },
    render() {
      const h = renderNode ?? this.$createElement
      const button = (id, fn) =>
        h(
          'button',
          isVue2
            ? { attrs: { 'data-testid': id }, on: { click: fn } }
            : { 'data-testid': id, onClick: fn },
          id,
        )
      return h('main', {}, [
        button('update', () => this.revision++),
        button('theme', () => {
          this.dark = !this.dark
        }),
        button('bare-motion', () => {
          this.bareMotion = !this.bareMotion
        }),
        button('motion', () => {
          this.motion = !this.motion
        }),
        button('loading', () => {
          this.loading = !this.loading
        }),
        button('invalid-size', () => {
          this.invalidSize = !this.invalidSize
        }),
        button('mount', () => {
          this.mounted = !this.mounted
        }),
        ...(this.mounted
          ? ['text', 'rect', 'circle'].map(shape => {
              const data = [
                {
                  id: 'a',
                  name: 'Analysis',
                  value: 100 + this.revision,
                  category: 0,
                  ...(this.invalidSize ? { symbolSize: [0, 0] } : {}),
                },
                { id: 'b', name: 'Experience', value: 40, category: 1 },
                { id: 'c', name: 'Zero', value: 0, category: 1 },
              ]
              if (this.revision) data.reverse()
              const props = {
                data,
                shape,
                categories: [{ name: 'High' }, { name: 'Low' }],
                legend: { bottom: 0 },
                bottom: 36,
                style: { height: '300px' },
                motion: this.bareMotion ? '' : this.motion,
                loading: this.loading,
                animation: this.bareMotion || this.motion,
                animationDuration: 0,
                animationDurationUpdate: 0,
                selectedMode: 'multiple',
                theme: this.dark ? 'dark' : 'seer',
                autoResize: false,
                initOption: { renderer: 'svg', width: 500, height: 300 },
                onReady: chart => charts.push(chart),
              }
              return h(
                'section',
                isVue2 ? { attrs: { 'data-shape': shape } } : { 'data-shape': shape },
                [h(Chart, isVue2 ? { attrs: props } : props)],
              )
            })
          : []),
      ])
    },
  }
}
