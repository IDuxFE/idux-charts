import { C as mergeProps, M as openBlock, f as createBlock, n as Ui, t as _plugin_vue_export_helper_default, v as defineComponent } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { s as IxLineChart, t as setup } from "./setup-Dx32Rw55.js";
// src/components/line/demos/SmoothLine.vue?vue&type=script&setup=true&lang.ts
var SmoothLine_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SmoothLine",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			data: [
				123,
				324,
				156,
				244,
				188
			],
			lineOption: {
				smooth: true,
				title: { text: "折线图标题" },
				xAxis: { data: [
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五"
				] },
				yAxis: { name: "次" }
			},
			get IxLineChart() {
				return IxLineChart;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var SmoothLine_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "平滑折线图",
	description: "平滑折线图的配置与使用示例。",
	index: 9
};
// src/components/line/demos/SmoothLine.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock($setup["IxLineChart"], mergeProps({
		style: { "height": "300px" },
		data: $setup.data
	}, $setup.lineOption), null, 16);
}
if (typeof SmoothLine_vue_vue_type_archive_meta_index_0_lang_default === "function") SmoothLine_vue_vue_type_archive_meta_index_0_lang_default(SmoothLine_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/demos/SmoothLine.vue__resolved
var __archive_data__ = {
	"id": "archive-item-33",
	"filename": "SmoothLine.vue",
	"relativePath": "components/line/demos/SmoothLine.vue",
	"query": {},
	"title": "平滑折线图",
	"description": "平滑折线图的配置与使用示例。",
	"index": 9,
	"sourceCodes": [{
		"filename": "SmoothLine.vue",
		"code": "<script setup lang=\"ts\">\nimport { IxLineChart } from '@idux/charts'\nimport type { LineChartProps } from '@idux/charts'\n\nconst data = [123, 324, 156, 244, 188]\n\nconst lineOption: LineChartProps = {\n  smooth: true,\n  title: { text: '折线图标题' },\n  xAxis: {\n    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],\n  },\n  yAxis: {\n    name: '次',\n  },\n}\n<\/script>\n<template>\n  <IxLineChart style=\"height: 300px\" :data=\"data\" v-bind=\"lineOption\" />\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">IxLineChart</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">LineChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">123</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">324</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">156</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">244</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">188</span><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> lineOption</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">LineChartProps</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">smooth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">true</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">title</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">text</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">折线图标题</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">xAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期一</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期二</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期三</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期四</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期五</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">yAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">次</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLineChart</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 300px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">lineOption</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(SmoothLine_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/demos/SmoothLine.vue"]]), setup)
};
export { __archive_data__ as default };
