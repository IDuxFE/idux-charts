<template>
  <div style="display: flex; flex-wrap: wrap; gap: 24px">
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="48"
      :max="64"
      unit="GB"
      label="存储容量 / 64 GB"
      color="#4089FF"
      style="width: 200px; height: 240px"
    />
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="100"
      label="完整填充"
      style="width: 200px; height: 240px"
    />
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="120"
      label="越界值保留原文"
      style="width: 200px; height: 240px"
    />
  </div>
</template>
<archive-meta lang="json">
{
  "title": "自定义量程与边界",
  "description": "非百分比量程配合 unit 显示单位，保留统一的数字和单位字号。满量程完整填充；有限越界值仅钳制水位，文字保留真实值。",
  "index": 3
}
</archive-meta>
