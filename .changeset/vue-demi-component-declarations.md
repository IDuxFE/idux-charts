---
'@idux/charts-core': patch
'@idux/charts-plots': patch
'@idux/charts': patch
---

Preserve vue-demi imports and emit component declarations compatible with Vue 2.7 and Vue 3, retaining inferred configuration props, events, scoped slots, and instance bindings. Keep ECharts registration reachable when consumers tree-shake the packaged library.
