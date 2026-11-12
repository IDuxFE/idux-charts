import { t as Ui } from "./client-D2zkqFpb.js";
import { h as getAlphaColor, s as IxLineChart, t as setup } from "./setup-CSaLiqAG.js";
import { Jr as mergeProps, Lr as createBlock, Ur as defineComponent, bt as _plugin_vue_export_helper_default, ri as openBlock } from "./app-default-DCCQUDkm.js";
import { t as useLinearGradient } from "./useLinearGradient-CT-ol1mC.js";
// src/components/area/demos/SmoothAreaLine.vue?vue&type=script&setup=true&lang.ts
var SmoothAreaLine_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SmoothAreaLine",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			data: [
				123,
				324,
				156,
				244,
				188,
				287,
				216
			],
			lineOption: {
				name: "访问次数",
				smooth: true,
				lineStyle: {
					shadowColor: getAlphaColor("#458FFF", .9),
					shadowBlur: 8
				},
				areaStyle: { color: useLinearGradient() },
				title: { text: "折线图标题" },
				xAxis: {
					boundaryGap: false,
					data: [
						"星期一",
						"星期二",
						"星期三",
						"星期四",
						"星期五",
						"星期六",
						"星期日"
					]
				},
				yAxis: { name: "次" }
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var SmoothAreaLine_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "平滑面积图+阴影效果",
	description: "平滑面积图+阴影效果的配置与使用示例。",
	index: 6
};
// src/components/area/demos/SmoothAreaLine.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxLineChart = IxLineChart;
	return openBlock(), createBlock(_component_IxLineChart, mergeProps({
		class: "area-shadow-chart",
		style: {
			"width": "100%",
			"height": "300px"
		},
		data: $setup.data
	}, $setup.lineOption), null, 16);
}
if (typeof SmoothAreaLine_vue_vue_type_archive_meta_index_0_lang_default === "function") SmoothAreaLine_vue_vue_type_archive_meta_index_0_lang_default(SmoothAreaLine_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/area/demos/SmoothAreaLine.vue__resolved
var __archive_data__ = {
	"id": "archive-item-53",
	"filename": "SmoothAreaLine.vue",
	"relativePath": "components/area/demos/SmoothAreaLine.vue",
	"query": {},
	"title": "平滑面积图+阴影效果",
	"description": "平滑面积图+阴影效果的配置与使用示例。",
	"index": 6,
	"sourceCodes": [{
		"filename": "SmoothAreaLine.vue",
		"code": "<script setup lang=\"ts\">\nimport { useLinearGradient, getAlphaColor } from '@idux/charts'\nimport type { LineChartProps } from '@idux/charts'\n\nconst data = [123, 324, 156, 244, 188, 287, 216]\n\nconst lineOption: LineChartProps = {\n  name: '访问次数',\n  smooth: true,\n  lineStyle: {\n    // 实现连线上的阴影效果\n    shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)\n    shadowBlur: 8,\n  },\n  areaStyle: {\n    color: useLinearGradient(),\n  },\n  title: { text: '折线图标题' },\n  xAxis: {\n    boundaryGap: false,\n    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],\n  },\n  yAxis: {\n    name: '次',\n  },\n}\n<\/script>\n<template>\n  <IxLineChart\n    class=\"area-shadow-chart\"\n    style=\"width: 100%; height: 300px\"\n    :data=\"data\"\n    v-bind=\"lineOption\"\n  />\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">useLinearGradient</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">getAlphaColor</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">LineChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">123</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">324</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">156</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">244</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">188</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">287</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">216</span><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> lineOption</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">LineChartProps</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">访问次数</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">smooth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">true</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">lineStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #676E95\">// 实现连线上的阴影效果</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">shadowColor</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">getAlphaColor</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#458FFF</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0.9</span><span style=\"color: #A6ACCD\">)</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #676E95\">// 等同 rgba(69, 143, 255, 0.9)</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">shadowBlur</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">areaStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">useLinearGradient</span><span style=\"color: #A6ACCD\">()</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">title</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">text</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">折线图标题</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">xAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">boundaryGap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期一</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期二</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期三</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期四</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期五</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期六</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期日</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">yAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">次</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLineChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">area-shadow-chart</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 100%; height: 300px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">lineOption</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">  /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(SmoothAreaLine_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/area/demos/SmoothAreaLine.vue"]]), setup)
};
export { __archive_data__ as default };
