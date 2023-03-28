import { type App, isVue2 } from 'vue-demi'

import { registerTheme, use } from 'echarts/core'
import { isNil } from 'lodash-es'

import { seerTheme } from '../themes'

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export function isVertical(option: any): boolean {
  return !!(option && option.xAxis && option.xAxis.data)
}

export function mergeAttrs(props: any, attrs?: any): any {
  const mergedAttrs = attrs
    ? {
        ...props,
        ...attrs,
      }
    : props
  if (isVue2) {
    return { attrs: mergedAttrs }
  } else {
    return mergedAttrs
  }
}

export function convertArray<T>(value: T | undefined | null | Array<T | undefined | null>): T[]
export function convertArray<T>(value: T | readonly T[]): readonly T[]
export function convertArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return []
  }
  return Array.isArray(value) ? value : [value]
}

export function createInstall(Chart: any, ext: Parameters<typeof use>[0]) {
  use(ext)

  // 主题 seer 主题
  registerTheme('seer', seerTheme)

  const install = (app: App) => {
    app.component(Chart.name, Chart)
  }

  Chart.install = install
}
