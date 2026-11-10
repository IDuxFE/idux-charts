import { t as Ui } from "./client-CMWdSpQf.js";
import { n as IxLiquidFillChart, t as setup } from "./setup-BaxF7mLk.js";
import { Ar as createElementBlock, Cr as Fragment, Dr as createBaseVNode, Jr as openBlock, Nr as createVNode, Pr as defineComponent, Xr as renderList, bt as _plugin_vue_export_helper_default, hi as toDisplayString } from "./app-default-_3RnZ9LU.js";
// src/components/liquid-fill/demos/Metrics.vue?vue&type=script&setup=true&lang.ts
var Metrics_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Metrics",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = { metrics: [
			{
				label: "CPU",
				value: 0,
				color: "#20C997",
				status: ""
			},
			{
				label: "内存",
				value: 50,
				color: "#20C997",
				status: "正常"
			},
			{
				label: "磁盘",
				value: 80,
				color: "#FFC74F",
				status: "中危"
			},
			{
				label: "连接数",
				value: 92,
				color: "#F36B58",
				status: "高危"
			}
		] };
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Metrics_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "多指标与风险颜色",
	description: "业务侧维护阈值与语义色；0 保留灰色底图，多个单指标组件自由排列。",
	index: 2
};
// src/components/liquid-fill/demos/Metrics.vue
var _hoisted_1 = { style: {
	"display": "flex",
	"flex-wrap": "wrap",
	"gap": "24px"
} };
var _hoisted_2 = { style: {
	"position": "absolute",
	"top": "18px",
	"width": "100%",
	"text-align": "center"
} };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxLiquidFillChart = IxLiquidFillChart;
	return openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createElementBlock(Fragment, null, renderList($setup.metrics, (metric) => {
		return createBaseVNode("div", {
			key: metric.label,
			style: {
				"position": "relative",
				"width": "180px"
			}
		}, [createBaseVNode("span", _hoisted_2, toDisplayString(metric.status), 1), createVNode(_component_IxLiquidFillChart, {
			value: metric.value,
			color: metric.color,
			label: metric.label,
			textStyle: { fontFamily: "D-DIN-PRO, sans-serif" },
			style: { "height": "240px" }
		}, null, 8, [
			"value",
			"color",
			"label"
		])]);
	}), 64))]);
}
if (typeof Metrics_vue_vue_type_archive_meta_index_0_lang_default === "function") Metrics_vue_vue_type_archive_meta_index_0_lang_default(Metrics_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Metrics.vue__resolved
var __archive_data__ = {
	"id": "archive-item-58",
	"filename": "Metrics.vue",
	"relativePath": "components/liquid-fill/demos/Metrics.vue",
	"query": {},
	"title": "多指标与风险颜色",
	"description": "业务侧维护阈值与语义色；0 保留灰色底图，多个单指标组件自由排列。",
	"index": 2,
	"sourceCodes": [{
		"filename": "Metrics.vue",
		"code": "<script setup lang=\"ts\">\nconst metrics = [\n  { label: 'CPU', value: 0, color: '#20C997', status: '' },\n  { label: '内存', value: 50, color: '#20C997', status: '正常' },\n  { label: '磁盘', value: 80, color: '#FFC74F', status: '中危' },\n  { label: '连接数', value: 92, color: '#F36B58', status: '高危' },\n]\n<\/script>\n<template>\n  <div style=\"display: flex; flex-wrap: wrap; gap: 24px\">\n    <div v-for=\"metric in metrics\" :key=\"metric.label\" style=\"position: relative; width: 180px\">\n      <span style=\"position: absolute; top: 18px; width: 100%; text-align: center\">{{\n        metric.status\n      }}</span>\n      <IxLiquidFillChart\n        :value=\"metric.value\"\n        :color=\"metric.color\"\n        :label=\"metric.label\"\n        :textStyle=\"{ fontFamily: 'D-DIN-PRO, sans-serif' }\"\n        style=\"height: 240px\"\n      />\n    </div>\n  </div>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> metrics </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">CPU</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#20C997</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">status</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">内存</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">50</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#20C997</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">status</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">正常</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">磁盘</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">80</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#FFC74F</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">status</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">中危</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">连接数</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">92</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#F36B58</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">status</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">高危</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">display: flex; flex-wrap: wrap; gap: 24px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-for</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">metric</span><span style=\"color: #89DDFF\"> in </span><span style=\"color: #A6ACCD\">metrics</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">metric</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">label</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">position: relative; width: 180px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">position: absolute; top: 18px; width: 100%; text-align: center</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;{{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        metric</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">status</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">}}&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">metric</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        :</span><span style=\"color: #C792EA\">color</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">metric</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">color</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        :</span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">metric</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">label</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">D-DIN-PRO, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Metrics_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Metrics.vue"]]), setup)
};
export { __archive_data__ as default };
