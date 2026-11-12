<template>
  <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 24px">
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="50"
      :radius="40"
      :waveAnimation="false"
      label="静态小图"
      style="width: 140px; height: 200px"
    />
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="50"
      label="默认尺寸"
      style="width: 200px; height: 240px"
    />
    <IxLiquidFillChart
      :textStyle="{ fontFamily: 'D-DIN-PRO, sans-serif' }"
      :value="50"
      :radius="88"
      label="大尺寸"
      style="width: 280px; height: 300px"
    />
  </div>
</template>
<archive-meta lang="json">
{
  "title": "尺寸与静态模式",
  "description": "radius 设置最大半径，容器变小时自动收缩。关闭 waveAnimation 可保留双层波形用于静态展示。",
  "index": 3
}
</archive-meta>
