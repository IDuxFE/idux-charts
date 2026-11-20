<script setup lang="ts">
import { ref } from 'vue'
import { IxMapChart, registerMap, type MapDataItem } from '@idux/charts'
import china from '../assets/china.json'
// 世界地图来源：https://echarts.apache.org/examples/data/asset/geo/world.json
import world from '../assets/world.json'

registerMap('china', china as Parameters<typeof registerMap>[1])
registerMap('world', world as unknown as Parameters<typeof registerMap>[1])

const worldNames = {
  'United States': '美国',
  Australia: '澳大利亚',
  Peru: '秘鲁',
  Kazakhstan: '哈萨克斯坦',
  China: '中国',
}

const chinaDensity: MapDataItem[] = Object.entries({
  北京: 920,
  天津: 260,
  河北: 180,
  山西: 0,
  内蒙古: 240,
  辽宁: 360,
  吉林: 0,
  黑龙江: 300,
  上海: 860,
  江苏: 780,
  浙江: 650,
  安徽: 420,
  福建: 580,
  江西: 0,
  山东: 620,
  河南: 390,
  湖北: 460,
  湖南: 120,
  广东: 720,
  广西: 520,
  海南: 0,
  重庆: 330,
  四川: 560,
  贵州: 480,
  云南: 450,
  西藏: 125,
  陕西: 280,
  甘肃: 90,
  青海: 0,
  宁夏: 0,
  新疆: 267,
  台湾: 690,
  香港: 210,
  澳门: 45,
}).map(([name, value]) => ({ name, value }))

const worldDensity: MapDataItem[] = Object.entries({
  美国: 330,
  澳大利亚: 530,
  秘鲁: 720,
  哈萨克斯坦: 550,
  中国: 1670,
  Canada: 0,
  Mexico: 440,
  Brazil: 610,
  Argentina: 550,
  Chile: 680,
  Colombia: 890,
  Bolivia: 120,
  Ecuador: 260,
  Venezuela: 0,
  'United Kingdom': 860,
  France: 580,
  Germany: 720,
  Spain: 340,
  Portugal: 0,
  Italy: 460,
  Netherlands: 640,
  Belgium: 230,
  Switzerland: 110,
  Norway: 0,
  Sweden: 490,
  Finland: 640,
  Poland: 380,
  Ukraine: 210,
  Russia: 0,
  Turkey: 560,
  'Saudi Arabia': 420,
  'United Arab Emirates': 780,
  Iran: 160,
  Egypt: 310,
  'South Africa': 690,
  Kenya: 180,
  Nigeria: 470,
  Morocco: 0,
  India: 180,
  Japan: 760,
  Korea: 820,
  Mongolia: 0,
  Indonesia: 320,
  Malaysia: 440,
  Thailand: 580,
  Vietnam: 240,
  Philippines: 90,
  Pakistan: 0,
  'New Zealand': 630,
}).map(([name, value]) => ({ name, value }))

const scope = ref('china')
const state = ref('normal')
</script>
<template>
  <IxSpace vertical block :size="16">
    <IxSpace wrap>
      <IxRadioGroup v-model:value="scope" buttoned size="sm" aria-label="地图范围">
        <IxRadio key="china">中国地图</IxRadio><IxRadio key="world">世界地图</IxRadio>
      </IxRadioGroup>
      <IxRadioGroup v-model:value="state" buttoned size="sm" aria-label="数据状态">
        <IxRadio key="normal">正常</IxRadio><IxRadio key="zero">数值为 0</IxRadio>
        <IxRadio key="empty">空状态</IxRadio><IxRadio key="loading">加载中</IxRadio>
      </IxRadioGroup>
    </IxSpace>
    <IxEmpty
      simple
      v-if="state === 'empty'"
      description="暂无数据"
      style="height: 560px; display: grid; place-content: center"
    />
    <IxMapChart
      v-else
      roam
      :map="scope"
      mode="density"
      :data="
        (scope === 'china' ? chinaDensity : worldDensity).map(item =>
          state === 'zero' ? { ...item, value: 0 } : item,
        )
      "
      :geo="scope === 'world' ? { nameMap: worldNames } : {}"
      :showLabel="scope === 'china'"
      :loading="state === 'loading' && { text: '图表正在加载中，请稍后...' }"
      metricName="资产总数"
      unit="台"
      style="height: 560px; width: 100%"
    />
  </IxSpace>
</template>

<archive-meta lang="json">
{
  "title": "密度型",
  "description": "连续且互不重叠的区间。悬停在原填色上叠加 20% 的 #1C4EFF；缺失值和零值使用不同颜色。",
  "index": 1
}
</archive-meta>
