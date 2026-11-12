---
'@idux/charts-core': patch
'@idux/charts-plots': patch
---

Preserve compatible legend and zoom state across chart reinitialization. Category charts keep historical zoom windows and follow the latest data when a window is pinned to the end.
