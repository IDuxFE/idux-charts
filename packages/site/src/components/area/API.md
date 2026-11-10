---
title: API
---

面积图使用 [IxLineChart](/components/line) 的 `area`、`smooth` 和 `stack`，与折线图共用数据、缩略轴、图例和缺失点处理。传入 `area` 使用渐变填充，传入 `area="striped"` 使用条纹填充。多条系列使用相同的 `stack` 名称即可堆叠。

面积图的深浅条纹各宽 2 px。堆叠面积的填充从层顶延续到层底，单系列面积的填充从面积顶部渐隐至底边。

```vue
<IxLineChart
  :categories="['07-01', '07-02', '07-03']"
  :series="[
    { name: '迅雷', data: [24, 30, 36], stack: 'total' },
    { name: '微信', data: [16, 18, 29], stack: 'total' },
  ]"
  area="striped"
  :data-zoom="{ type: 'slider' }"
  style="height: 320px"
/>
```
