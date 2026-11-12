import { t as Ui } from "./client-D2zkqFpb.js";
import { n as IxHeader, t as IxCard } from "./card-jlz77LR9.js";
import { o as IxPieChart, t as setup, v as encodeHTML } from "./setup-CSaLiqAG.js";
import { Hr as createVNode, Lr as createBlock, Ur as defineComponent, bt as _plugin_vue_export_helper_default, ci as withCtx, ri as openBlock } from "./app-default-DCCQUDkm.js";
// src/components/pie/demos/CardLightweight.vue?vue&type=script&setup=true&lang.ts
var CardLightweight_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardLightweight",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			data: [
				145,
				124,
				118,
				92,
				54,
				21
			].map((value, index) => ({
				name: `图例${index + 1}`,
				value,
				emphasis: { scale: false }
			})),
			tooltip: {
				textStyle: { fontSize: 12 },
				formatter: (params) => {
					const item = Array.isArray(params) ? params[0] : params;
					return item ? encodeHTML(`${item.name}: ${item.value}`) : "";
				}
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var CardLightweight_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "轻量卡片饼图",
	description: "紧凑容器中设置半径并声明 align，背景和圆心由组件计算。",
	index: 6
};
// src/components/pie/demos/CardLightweight.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxHeader = IxHeader;
	const _component_IxPieChart = IxPieChart;
	const _component_IxCard = IxCard;
	return openBlock(), createBlock(_component_IxCard, {
		shadow: "",
		class: "lightweight-card"
	}, {
		header: withCtx(() => [createVNode(_component_IxHeader, {
			title: "资产概览",
			size: "sm"
		})]),
		default: withCtx(() => [createVNode(_component_IxPieChart, {
			style: {
				"width": "84px",
				"height": "84px",
				"margin": "0 auto"
			},
			align: "center",
			name: "资产分布",
			data: $setup.data,
			radius: 36,
			legend: { show: false },
			tooltip: $setup.tooltip
		}, null, 8, ["data"])]),
		_: 1
	});
}
if (typeof CardLightweight_vue_vue_type_archive_meta_index_0_lang_default === "function") CardLightweight_vue_vue_type_archive_meta_index_0_lang_default(CardLightweight_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/demos/CardLightweight.vue__resolved
var __archive_data__ = {
	"id": "archive-item-16",
	"filename": "CardLightweight.vue",
	"relativePath": "components/pie/demos/CardLightweight.vue",
	"query": {},
	"title": "轻量卡片饼图",
	"description": "紧凑容器中设置半径并声明 align，背景和圆心由组件计算。",
	"index": 6,
	"sourceCodes": [{
		"filename": "CardLightweight.vue",
		"code": "<script setup lang=\"ts\">\nimport type { PieChartProps } from '@idux/charts'\nimport { format } from 'echarts/core'\n\nconst data = [145, 124, 118, 92, 54, 21].map((value, index) => ({\n  name: `图例${index + 1}`,\n  value,\n  emphasis: { scale: false },\n}))\nconst tooltip: PieChartProps['tooltip'] = {\n  textStyle: { fontSize: 12 },\n  formatter: params => {\n    const item = Array.isArray(params) ? params[0] : params\n    return item ? format.encodeHTML(`${item.name}: ${item.value}`) : ''\n  },\n}\n<\/script>\n<template>\n  <IxCard shadow class=\"lightweight-card\">\n    <template #header><IxHeader title=\"资产概览\" size=\"sm\" /></template>\n    <IxPieChart\n      style=\"width: 84px; height: 84px; margin: 0 auto\"\n      align=\"center\"\n      name=\"资产分布\"\n      :data=\"data\"\n      :radius=\"36\"\n      :legend=\"{ show: false }\"\n      :tooltip=\"tooltip\"\n    />\n  </IxCard>\n</template>\n<style scoped>\n.lightweight-card {\n  width: 180px;\n  max-width: 100%;\n}\n</style>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">PieChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">format</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">echarts/core</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">145</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">124</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">118</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">92</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">54</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">21</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`</span><span style=\"color: #C3E88D\">图例</span><span style=\"color: #89DDFF\">${</span><span style=\"color: #A6ACCD\">index </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">}`</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  value</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">emphasis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">scale</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> tooltip</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">PieChartProps</span><span style=\"color: #A6ACCD\">[</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">tooltip</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">] </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">textStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">fontSize</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #82AAFF\">formatter</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">params</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #C792EA\">const</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">item</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">Array</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">isArray</span><span style=\"color: #F07178\">(</span><span style=\"color: #A6ACCD\">params</span><span style=\"color: #F07178\">) </span><span style=\"color: #89DDFF\">?</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">params</span><span style=\"color: #F07178\">[</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #F07178\">] </span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">params</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #89DDFF\">return</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">item</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">?</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">format</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">encodeHTML</span><span style=\"color: #F07178\">(</span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">item</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">name</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\">: </span><span style=\"color: #89DDFF\">${</span><span style=\"color: #A6ACCD\">item</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">}`</span><span style=\"color: #F07178\">) </span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&#39;&#39;</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxCard</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">shadow</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">lightweight-card</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\"> #</span><span style=\"color: #C792EA\">header</span><span style=\"color: #89DDFF\">&gt;&lt;</span><span style=\"color: #FFCB6B\">IxHeader</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">title</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">资产概览</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxPieChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 84px; height: 84px; margin: 0 auto</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">name</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">资产分布</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">radius</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">36</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">legend</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">show</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">tooltip</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">tooltip</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxCard</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">style</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">scoped</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">lightweight-card</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">180px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">max-width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(CardLightweight_vue_vue_type_script_setup_true_lang_default, [
		["render", _sfc_render],
		["__scopeId", "data-v-9bf73abf"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/pie/demos/CardLightweight.vue"]
	]), setup)
};
export { __archive_data__ as default };
