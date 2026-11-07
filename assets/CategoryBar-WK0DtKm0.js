import { C as mergeProps, M as openBlock, f as createBlock, n as Ui, t as _plugin_vue_export_helper_default, v as defineComponent } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { c as IxBarChart, t as setup } from "./setup-Dx32Rw55.js";
// src/components/bar/demos/CategoryBar.vue?vue&type=script&setup=true&lang.ts
var CategoryBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategoryBar",
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
			barOption: {
				title: { text: "柱状图标题" },
				xAxis: {
					name: "次",
					nameGap: 20,
					nameTextStyle: {
						verticalAlign: "top",
						lineHeight: 26
					}
				},
				yAxis: { data: [
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五"
				] }
			},
			get IxBarChart() {
				return IxBarChart;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var CategoryBar_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "横向柱状图",
	description: "横向柱状图的配置与使用示例。",
	index: 3
};
// src/components/bar/demos/CategoryBar.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock($setup["IxBarChart"], mergeProps({
		style: { "height": "300px" },
		data: $setup.data
	}, $setup.barOption), null, 16);
}
if (typeof CategoryBar_vue_vue_type_archive_meta_index_0_lang_default === "function") CategoryBar_vue_vue_type_archive_meta_index_0_lang_default(CategoryBar_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bar/demos/CategoryBar.vue__resolved
var __archive_data__ = {
	"id": "archive-item-34",
	"filename": "CategoryBar.vue",
	"relativePath": "components/bar/demos/CategoryBar.vue",
	"query": {},
	"title": "横向柱状图",
	"description": "横向柱状图的配置与使用示例。",
	"index": 3,
	"sourceCodes": [{
		"filename": "CategoryBar.vue",
		"code": "<script setup lang=\"ts\">\nimport { IxBarChart } from '@idux/charts'\nimport type { BarChartProps } from '@idux/charts'\n\nconst data = [123, 324, 156, 244, 188]\n\nconst barOption: BarChartProps = {\n  title: { text: '柱状图标题' },\n  xAxis: {\n    name: '次',\n    nameGap: 20,\n    nameTextStyle: {\n      verticalAlign: 'top',\n      lineHeight: 26,\n    },\n  },\n  yAxis: {\n    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],\n  },\n}\n<\/script>\n<template>\n  <IxBarChart style=\"height: 300px\" :data=\"data\" v-bind=\"barOption\" />\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">IxBarChart</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">BarChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">123</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">324</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">156</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">244</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">188</span><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> barOption</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">BarChartProps</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">title</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">text</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">柱状图标题</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">xAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">次</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">nameGap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">nameTextStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">verticalAlign</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">top</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">lineHeight</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">26</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">yAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期一</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期二</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期三</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期四</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期五</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxBarChart</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 300px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">barOption</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(CategoryBar_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bar/demos/CategoryBar.vue"]]), setup)
};
export { __archive_data__ as default };
