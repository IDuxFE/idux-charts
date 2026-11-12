export { withChartProps } from './withChartProps'
export type { ChartComponent } from './withChartProps'
export { replaceChartComponent, splitChartOptions } from './chartOptions'

import { isVue2 } from 'vue-demi'

import { TinyColor } from '@ctrl/tinycolor'

import { registerTheme, use } from 'echarts/core'
import { isNil } from 'lodash-es'

import { seerTheme } from '../themes'

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export function isVertical(option: any): boolean {
  const xAxes = convertArray(option?.xAxis)
  return xAxes.some(
    (axis: { type?: string; data?: unknown }) =>
      axis.type === 'category' ||
      axis.type === 'time' ||
      (axis.type === undefined && axis.data !== undefined),
  )
}

export function mergeAttrs(props: any, listeners?: Record<string, Function>): any {
  if (isVue2) {
    return { attrs: { ...props }, on: { ...listeners } }
  } else {
    return { ...props }
  }
}

export function filterEmptyProps<T extends object>(props: T): T {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      ;(acc as Record<string, unknown>)[key] = value
    }
    return acc
  }, {} as T)
}

export function convertArray<T>(value: T | undefined | null | Array<T | undefined | null>): T[]
export function convertArray<T>(value: T | readonly T[]): readonly T[]
export function convertArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}

export const getAlphaColor = (baseColor: string, alpha: number) => {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString()
}

interface ChartInstall {
  install(app: { component(name: string, component: any): unknown }): void
}
export type InstallableChart<Component> = Component & ChartInstall

export function createInstall<Component extends { name?: string }>(
  Chart: Component,
  ext: Parameters<typeof use>[0],
): InstallableChart<Component> {
  use(ext)

  registerTheme('seer', seerTheme)

  const install: ChartInstall['install'] = app => {
    app.component(Chart.name!, Chart)
  }

  // Keep registration in the exported value dependency graph, including when
  // consumers tree-shake packages marked sideEffects: false.
  return Object.assign(Chart, { install })
}
