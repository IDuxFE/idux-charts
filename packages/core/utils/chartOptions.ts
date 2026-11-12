import type { AdditionalChartOption, ChartProps } from '../types'
import type { SetOptionOpts } from 'echarts/core'

const controlKeys = new Set([
  'class',
  'style',
  'autoResize',
  'initOption',
  'group',
  'loading',
  'setOptionOpts',
  'theme',
  'onReady',
  'chartBackgroundColor',
])

export function isChartEvent(key: string): boolean {
  return /^on[^a-z]/.test(key)
}

export function isChartDomAttr(key: string): boolean {
  return (
    key === 'role' ||
    key === 'tabindex' ||
    key === 'tabIndex' ||
    key.startsWith('aria-') ||
    key.startsWith('data-')
  )
}

function isChartOptionKey(key: string): boolean {
  return !controlKeys.has(key) && !isChartEvent(key) && !isChartDomAttr(key)
}

export function splitChartOptions(props: ChartProps): {
  option: ChartProps
  controls: AdditionalChartOption
} {
  const option: ChartProps = {}
  const controls: AdditionalChartOption = {}
  for (const key of Object.keys(props)) {
    const target = isChartOptionKey(key) ? option : controls
    target[key] = props[key]
  }
  if (props.chartBackgroundColor !== undefined) option.backgroundColor = props.chartBackgroundColor
  return { option, controls }
}

export function replaceChartComponent(opts: SetOptionOpts | undefined, component: string) {
  if (opts?.notMerge) return opts
  const current = opts?.replaceMerge ?? []
  return {
    ...opts,
    replaceMerge: [...new Set([...(Array.isArray(current) ? current : [current]), component])],
  }
}
