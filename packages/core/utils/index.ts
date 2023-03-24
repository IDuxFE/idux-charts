import { isVue2 } from 'vue-demi'

import { isNil } from 'lodash-es'

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
