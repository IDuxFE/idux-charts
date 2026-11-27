import { loadDemoFont } from '../../packages/site/demoFont'
import { mountDemoVisual } from './mountDemoVisual'

// A separate entry avoids evaluating App, legacy comparisons and other fixture
// components just to mount a single real demo in a fresh browser context.
const params = new URLSearchParams(location.search)
await loadDemoFont()
await mountDemoVisual(params.get('demo')!, params.get('theme') === 'dark', false)
