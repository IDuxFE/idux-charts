---
'@idux/charts-core': patch
---

Fix Vue 2 conditional default slots so they can be added after mounting, removed, and restored without stale-slot warnings or recreating the chart instance. Empty slots continue to leave the chart unobstructed.
