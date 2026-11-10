import { t as Ui } from "./client-CMWdSpQf.js";
import { l as IxBarChart, t as setup } from "./setup-BaxF7mLk.js";
import { t as IxSwitch } from "./switch-ffZHkIP6.js";
import { Ar as createElementBlock, Cr as Fragment, Dr as createBaseVNode, Jr as openBlock, Mr as createTextVNode, Nr as createVNode, Pr as defineComponent, bt as _plugin_vue_export_helper_default, si as ref, zr as mergeProps } from "./app-default-_3RnZ9LU.js";
// src/components/bar/demos/OptionOverrides.vue?vue&type=script&setup=true&lang.ts
var OptionOverrides_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OptionOverrides",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			customized: ref(false),
			categories: [
				"周一",
				"周二",
				"周三",
				"周四",
				"周五"
			],
			data: [
				120,
				210,
				160,
				290,
				240
			],
			overrides: {
				barWidth: 14,
				color: ["#8352cc"],
				grid: { left: 56 },
				yAxis: {
					max: 500,
					interval: 100
				},
				tooltip: { valueFormatter: (value) => `${value} 次` }
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var OptionOverrides_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "外部配置覆盖默认值",
	description: "开启开关后覆盖柱宽、配色、绘图区左边距、数值轴上限和提示框的数值文案。关闭后恢复分类布局的默认配置。",
	index: 11
};
// src/components/bar/demos/OptionOverrides.vue
var _hoisted_1 = { class: "bar-override-switch" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxSwitch = IxSwitch;
	const _component_IxBarChart = IxBarChart;
	return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("label", _hoisted_1, [_cache[1] || (_cache[1] = createTextVNode(" 应用外部配置 ", -1)), createVNode(_component_IxSwitch, {
		checked: $setup.customized,
		"onUpdate:checked": _cache[0] || (_cache[0] = ($event) => $setup.customized = $event),
		size: "sm",
		"aria-label": "应用外部配置"
	}, null, 8, ["checked"])]), createVNode(_component_IxBarChart, mergeProps({
		categories: $setup.categories,
		data: $setup.data,
		name: "访问次数"
	}, $setup.customized ? $setup.overrides : {}, { style: {
		"width": "100%",
		"height": "300px"
	} }), null, 16)], 64);
}
if (typeof OptionOverrides_vue_vue_type_archive_meta_index_0_lang_default === "function") OptionOverrides_vue_vue_type_archive_meta_index_0_lang_default(OptionOverrides_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bar/demos/OptionOverrides.vue__resolved
var __archive_data__ = {
	"id": "archive-item-41",
	"filename": "OptionOverrides.vue",
	"relativePath": "components/bar/demos/OptionOverrides.vue",
	"query": {},
	"title": "外部配置覆盖默认值",
	"description": "开启开关后覆盖柱宽、配色、绘图区左边距、数值轴上限和提示框的数值文案。关闭后恢复分类布局的默认配置。",
	"index": 11,
	"sourceCodes": [{
		"filename": "OptionOverrides.vue",
		"code": "<script setup lang=\"ts\">\nimport { ref } from 'vue'\nimport type { BarChartProps } from '@idux/charts'\n\nconst customized = ref(false)\nconst categories = ['周一', '周二', '周三', '周四', '周五']\nconst data = [120, 210, 160, 290, 240]\nconst overrides: BarChartProps = {\n  barWidth: 14,\n  color: ['#8352cc'],\n  grid: { left: 56 },\n  yAxis: { max: 500, interval: 100 },\n  tooltip: { valueFormatter: value => `${value} 次` },\n}\n<\/script>\n\n<template>\n  <label class=\"bar-override-switch\">\n    应用外部配置\n    <IxSwitch v-model:checked=\"customized\" size=\"sm\" aria-label=\"应用外部配置\" />\n  </label>\n  <IxBarChart\n    :categories=\"categories\"\n    :data=\"data\"\n    name=\"访问次数\"\n    v-bind=\"customized ? overrides : {}\"\n    style=\"width: 100%; height: 300px\"\n  />\n</template>\n\n<style scoped>\n.bar-override-switch {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n</style>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">BarChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> customized </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> categories </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">周一</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">周二</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">周三</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">周四</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">周五</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">120</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">210</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">160</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">290</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">240</span><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> overrides</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">BarChartProps</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">barWidth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">14</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#8352cc</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">grid</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">left</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">56</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">yAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">500</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">interval</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">tooltip</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">valueFormatter</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\"> 次</span><span style=\"color: #89DDFF\">`</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bar-override-switch</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    应用外部配置</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSwitch</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">checked</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">customized</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">应用外部配置</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxBarChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    :</span><span style=\"color: #C792EA\">categories</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">categories</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">name</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">访问次数</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">customized</span><span style=\"color: #89DDFF\"> ? </span><span style=\"color: #A6ACCD\">overrides</span><span style=\"color: #89DDFF\"> : {}</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 100%; height: 300px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">  /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">style</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">scoped</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bar-override-switch</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">display</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> inline-flex</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">align-items</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> center</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">gap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">margin-bottom</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(OptionOverrides_vue_vue_type_script_setup_true_lang_default, [
		["render", _sfc_render],
		["__scopeId", "data-v-18e83ec1"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bar/demos/OptionOverrides.vue"]
	]), setup)
};
export { __archive_data__ as default };
