import { describe, expect, it } from 'vitest'
import { createTooltipTheme } from '../tooltipTheme'

describe('tooltip theme ownership', () => {
  it('preserves caller classes and options without enabling an absent tooltip', () => {
    const theme = createTooltipTheme(() => undefined)
    const empty = { series: [] }
    expect(theme.prepare(empty)).toBe(empty)
    const options = { tooltip: { className: 'caller', appendTo: 'body' } }
    const prepared = theme.prepare(options)
    expect(prepared.tooltip).toMatchObject({
      appendTo: 'body',
      className: expect.stringMatching(/^caller ix-chart-tooltip-/),
    })
    expect(options.tooltip.className).toBe('caller')
    expect(theme.prepare({ tooltip: [options.tooltip] }).tooltip).toHaveLength(1)
  })

  it('applies resolved themes to late portal elements and resets light state', () => {
    const container = document.createElement('div')
    const theme = createTooltipTheme(() => container)
    const prepared = theme.prepare({ tooltip: {} })
    const className = (prepared.tooltip as { className: string }).className
    theme.sync({ getOption: () => ({ darkMode: true }) } as any)
    const tooltip = document.createElement('div')
    tooltip.className = className
    document.body.appendChild(tooltip)
    try {
      theme.rendered()
      expect(tooltip.dataset.ixChartTheme).toBe('dark')
      theme.sync({ getOption: () => ({ darkMode: false }) } as any)
      expect(tooltip.dataset.ixChartTheme).toBe('light')
    } finally {
      tooltip.remove()
    }
  })
})
