import { expect, it, vi } from 'vitest'

vi.mock('echarts/core', async importOriginal => ({
  ...(await importOriginal<typeof import('echarts/core')>()),
  version: '5.4.3',
}))

import { createMapOption } from '../map/src/createMapOption'

it('uses ECharts 5 layout controls and preserves caller overrides', () => {
  const option = createMapOption({ geo: { map: 'test' } })
  expect(option.geo).toMatchObject({ layoutCenter: ['50%', '48%'], layoutSize: '90%' })
  expect(option.geo).not.toHaveProperty('preserveAspect')
  expect(option.geo).not.toHaveProperty('left')
  expect(createMapOption({ geo: { map: 'test', layoutSize: '75%' } }).geo).toMatchObject({
    layoutSize: '75%',
  })
})
