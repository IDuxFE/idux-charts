import { afterEach, describe, expect, it } from 'vitest'
import { createChartLoading } from '../chartLoading'

const cleanups: (() => void)[] = []
afterEach(() =>
  cleanups
    .splice(0)
    .reverse()
    .forEach(cleanup => cleanup()),
)

function setup(position = '', priority = '') {
  const host = document.createElement('div')
  host.style.setProperty('position', position, priority)
  document.body.append(host)
  const loading = createChartLoading()
  cleanups.push(() => host.remove(), loading.remove)
  return { host, loading }
}

describe('loading container ownership', () => {
  it.each(['', 'static'])(
    'restores the original %s position when its temporary value is unchanged',
    position => {
      const { host, loading } = setup(position, position ? 'important' : '')
      loading.update(host, true, {})
      expect(host.style.position).toBe('relative')
      loading.update(host, false, {})
      expect(host.style.position).toBe(position)
      expect(host.style.getPropertyPriority('position')).toBe(position ? 'important' : '')
      expect(host.querySelector('.ix-chart-loading')).toBeNull()
      expect(host.hasAttribute('aria-busy')).toBe(false)
    },
  )

  it.each(['', 'relative', 'absolute'])(
    'preserves positioning changed during loading from %s',
    original => {
      const { host, loading } = setup(original)
      loading.update(host, true, {})
      host.style.position = 'fixed'
      loading.update(host, { text: 'Still loading' }, {})
      loading.remove()
      expect(host.style.position).toBe('fixed')
      // A second loading cycle must use the current positioning, not the first cycle's snapshot.
      loading.update(host, true, {})
      loading.remove()
      expect(host.style.position).toBe('fixed')
    },
  )

  it('preserves existing positioning and busy state across repeated cleanup', () => {
    const { host, loading } = setup('absolute', 'important')
    host.setAttribute('aria-busy', 'false')
    loading.update(host, true, {})
    loading.remove()
    loading.remove()
    expect(host.style.position).toBe('absolute')
    expect(host.style.getPropertyPriority('position')).toBe('important')
    expect(host.getAttribute('aria-busy')).toBe('false')
  })
})
