import { useTooltipsFormatter } from '@idux/charts-core'
import { escape } from 'lodash-es'
import type { DefaultLabelFormatterCallbackParams } from 'echarts'

export type PlotTooltipParams =
  | DefaultLabelFormatterCallbackParams
  | DefaultLabelFormatterCallbackParams[]

interface PlotTooltipContent {
  title: string
  rows: Parameters<typeof useTooltipsFormatter>[1]
  notes?: readonly string[]
}

interface PlotTooltipLayout {
  rowsPerColumn?: number
  notesWidth?: number
  notesColor?: string
  notesInsideWhenEmpty?: boolean
}

/** Keep chart-specific data selection separate from tooltip markup. */
export function createPlotTooltipFormatter<Params>(
  getContent: (params: Params) => PlotTooltipContent | undefined,
  { rowsPerColumn, notesWidth = 240, notesColor, notesInsideWhenEmpty }: PlotTooltipLayout = {},
) {
  return (params: Params): string => {
    const content = getContent(params)
    if (!content) return ''
    const { title, rows, notes } = content
    if (!notes?.length) return useTooltipsFormatter(title, rows, rowsPerColumn)

    const textStyle = notesColor ? `color: ${escape(notesColor)}` : 'opacity: 0.72'
    const lines = notes.map(note => `<div>${escape(note)}</div>`).join('')
    const details = `<div style="max-width: ${notesWidth}px; white-space: normal; overflow-wrap: anywhere; margin-top: 8px; font-size: 12px; ${textStyle};">${lines}</div>`
    // Bar has historically kept a missing-only tooltip inside the content container.
    if (notesInsideWhenEmpty && !rows.length) {
      return `<div class="charts-tooltips"><div class="charts-tooltips-title">${escape(title)}</div>${details}</div>`
    }
    return useTooltipsFormatter(title, rows, rowsPerColumn) + details
  }
}
