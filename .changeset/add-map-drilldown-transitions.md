---
'@idux/charts': minor
'@idux/charts-plots': minor
---

Add `createMapTransition(getChart, options?)` for animated map drilldown and return navigation.

- Export the helper and `MapTransition`, `MapTransitionDirection`, and `MapTransitionOptions` types from the aggregate chart entries and `@idux/charts/map`.
- Use `run('drilldown' | 'back', update)` to commit prepared map and data changes between native camera transitions and a canvas fade. Await reactive rendering inside `update`; each phase defaults to 480ms, and the cover follows chart resizing and the effective background.
- Return a completion boolean, cancel superseded runs, and expose `cancel()` and `dispose()` for application lifecycle cleanup. Remove temporary covers, listeners, and timers, and restore phase viewport and animation settings on cancellation or failure. Reject callback/update failures without leaving transition resources behind.
- Apply changes directly when the chart or first `geo` is unavailable, duration is zero, animation is disabled, or reduced motion is requested. Preserve the new map's final camera and animation settings after a completed transition.
- Add a China province/city drilldown demo with lazy-loaded boundaries from `@idux/geo-areas`, and refresh world density/status and China route examples with geometry from the same package, updated attribution, and API guidance.

The helper operates on the first `geo`. Load and register geometry and finish asynchronous requests before starting a transition; application code owns hierarchy, navigation, and stale-response handling. Cancellation does not roll back an `update` that has already started. Dispose the helper on unmount. The geometry dependency belongs to the documentation site and is not added to the published chart packages.
