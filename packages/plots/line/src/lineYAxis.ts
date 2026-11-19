import type { YAXisComponentOption } from 'echarts'
import { mergePlotOptions } from '../../shared/plotOptions'

/** Place right Y-axis names at the same left edge as their tick labels. */
export function alignLineYAxisNames(axes: YAXisComponentOption[]): YAXisComponentOption[]
export function alignLineYAxisNames(axes: YAXisComponentOption): YAXisComponentOption
export function alignLineYAxisNames(
  axes: YAXisComponentOption | YAXisComponentOption[],
): YAXisComponentOption | YAXisComponentOption[]
export function alignLineYAxisNames(
  axes: YAXisComponentOption | YAXisComponentOption[],
): YAXisComponentOption | YAXisComponentOption[] {
  const leftUsed = new Set<string | number>()
  const align = (axis: YAXisComponentOption): YAXisComponentOption => {
    const grid = axis.gridId ?? axis.gridIndex ?? 0
    const position = axis.position ?? (leftUsed.has(grid) ? 'right' : 'left')
    if (position === 'left') leftUsed.add(grid)
    if (
      position !== 'right' ||
      (axis.nameLocation !== undefined && axis.nameLocation !== 'end') ||
      (axis.nameRotate !== undefined && axis.nameRotate !== 0)
    ) {
      return axis
    }
    return mergePlotOptions<YAXisComponentOption>(
      { nameTextStyle: { align: 'left', padding: [0, 0, -4, axis.axisLabel?.margin ?? 8] } },
      axis,
    )
  }
  return Array.isArray(axes) ? axes.map(align) : align(axes)
}
