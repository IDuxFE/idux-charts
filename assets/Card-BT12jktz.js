import { t as Ui } from "./client-D7mTuevI.js";
import { t as IxCard } from "./card-D-5ACZxh.js";
import { t as IxBulletChart } from "./bullet-gY7BnL0o.js";
import { i as IxHeader } from "./grid-DZI3DaFQ.js";
import { An as createVNode, Gn as openBlock, Tn as createBlock, Xn as withCtx, c as _plugin_vue_export_helper_default, jn as defineComponent } from "./app-default-DalXtduk.js";
import { t as setup } from "./setup-1ooTVilH.js";
// src/components/bullet/demos/Card.vue?vue&type=script&setup=true&lang.ts
var Card_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Card",
	setup(__props, { expose: __expose }) {
		__expose();
		const data = [
			{
				name: "办公终端",
				value: 92,
				target: 90
			},
			{
				name: "生产服务器",
				value: 78,
				target: 90
			},
			{
				name: "网络设备",
				value: 86,
				target: 90
			},
			{
				name: "云主机",
				value: 56,
				target: 80
			},
			{
				name: "分支资产",
				value: 42,
				target: 80
			}
		];
		const ranges = [
			{
				upper: 60,
				label: "待提升"
			},
			{
				upper: 80,
				label: "良好"
			},
			{
				upper: 100,
				label: "优秀"
			}
		];
		const formatPercent = (value) => `${value}%`;
		const __returned__ = {
			data,
			ranges,
			formatPercent
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Card_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "卡片场景",
	description: "适用于仪表盘或工作台，集中对比各资产分组的完成率与目标值，快速识别达标情况和需要重点关注的分组。",
	index: 6
};
// src/components/bullet/demos/Card.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxHeader = IxHeader;
	const _component_IxBulletChart = IxBulletChart;
	const _component_IxCard = IxCard;
	return openBlock(), createBlock(_component_IxCard, {
		shadow: "",
		class: "bullet-card"
	}, {
		header: withCtx(() => [createVNode(_component_IxHeader, {
			title: "资产采集达标情况",
			size: "sm"
		})]),
		default: withCtx(() => [createVNode(_component_IxBulletChart, {
			style: {
				"width": "100%",
				"height": "240px"
			},
			data: $setup.data,
			ranges: $setup.ranges,
			"x-axis": { axisLabel: { formatter: "{value}%" } },
			name: "完成率",
			tooltip: { valueFormatter: $setup.formatPercent }
		}, null, 8, ["tooltip"])]),
		_: 1
	});
}
if (typeof Card_vue_vue_type_archive_meta_index_0_lang_default === "function") Card_vue_vue_type_archive_meta_index_0_lang_default(Card_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bullet/demos/Card.vue__resolved
var __archive_data__ = {
	"id": "archive-item-73",
	"filename": "Card.vue",
	"relativePath": "components/bullet/demos/Card.vue",
	"query": {},
	"title": "卡片场景",
	"description": "适用于仪表盘或工作台，集中对比各资产分组的完成率与目标值，快速识别达标情况和需要重点关注的分组。",
	"index": 6,
	"sourceCodes": [{
		"filename": "Card.vue",
		"code": "<script setup lang=\"ts\">\nimport type { BulletChartDataItem, BulletRange } from '@idux/charts'\n\nconst data: BulletChartDataItem[] = [\n  { name: '办公终端', value: 92, target: 90 },\n  { name: '生产服务器', value: 78, target: 90 },\n  { name: '网络设备', value: 86, target: 90 },\n  { name: '云主机', value: 56, target: 80 },\n  { name: '分支资产', value: 42, target: 80 },\n]\nconst ranges: BulletRange[] = [\n  { upper: 60, label: '待提升' },\n  { upper: 80, label: '良好' },\n  { upper: 100, label: '优秀' },\n]\nconst formatPercent = (value: unknown) => `${value}%`\n<\/script>\n\n<template>\n  <IxCard shadow class=\"bullet-card\">\n    <template #header>\n      <IxHeader title=\"资产采集达标情况\" size=\"sm\" />\n    </template>\n    <IxBulletChart\n      style=\"width: 100%; height: 240px\"\n      :data=\"data\"\n      :ranges=\"ranges\"\n      :x-axis=\"{ axisLabel: { formatter: '{value}%' } }\"\n      name=\"完成率\"\n      :tooltip=\"{ valueFormatter: formatPercent }\"\n    />\n  </IxCard>\n</template>\n\n<style scoped>\n.bullet-card {\n  margin: 8px;\n  width: 640px;\n  max-width: calc(100% - 16px);\n}\n</style>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">BulletChartDataItem</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">BulletRange</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">BulletChartDataItem</span><span style=\"color: #A6ACCD\">[] </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">办公终端</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">92</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">target</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">90</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">生产服务器</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">78</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">target</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">90</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">网络设备</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">86</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">target</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">90</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">云主机</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">56</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">target</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">80</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">分支资产</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">42</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">target</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">80</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> ranges</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">BulletRange</span><span style=\"color: #A6ACCD\">[] </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">upper</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">60</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">待提升</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">upper</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">80</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">良好</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">upper</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">优秀</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> formatPercent </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">unknown</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\">%</span><span style=\"color: #89DDFF\">`</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxCard</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">shadow</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-card</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\"> #</span><span style=\"color: #C792EA\">header</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxHeader</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">title</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">资产采集达标情况</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxBulletChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 100%; height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">ranges</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">ranges</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">x-axis</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">axisLabel</span><span style=\"color: #89DDFF\">: { </span><span style=\"color: #F07178\">formatter</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">{value}%</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> } }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">name</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">完成率</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">tooltip</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">valueFormatter</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #A6ACCD\">formatPercent</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxCard</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">style</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">scoped</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bullet-card</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">margin</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">640px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">max-width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">calc</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">-</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16px</span><span style=\"color: #89DDFF\">);</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Card_vue_vue_type_script_setup_true_lang_default, [
		["render", _sfc_render],
		["__scopeId", "data-v-f2878522"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bullet/demos/Card.vue"]
	]), setup)
};
export { __archive_data__ as default };
