import { M as openBlock, _ as createVNode, m as createElementBlock, n as Ui, t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { n as IxLiquidFillChart, t as setup } from "./setup-Dx32Rw55.js";
var Range_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "自定义量程与边界",
	description: "非百分比量程配合 unit 显示单位，保留统一的数字和单位字号。满量程完整填充；有限越界值仅钳制水位，文字保留真实值。",
	index: 3
};
// src/components/liquid-fill/demos/Range.vue
var _sfc_main = {};
var _hoisted_1 = { style: {
	"display": "flex",
	"flex-wrap": "wrap",
	"gap": "24px"
} };
function _sfc_render(_ctx, _cache) {
	const _component_IxLiquidFillChart = IxLiquidFillChart;
	return openBlock(), createElementBlock("div", _hoisted_1, [
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "IDuxChartDemoDIN, sans-serif" },
			value: 48,
			max: 64,
			unit: "GB",
			label: "存储容量 / 64 GB",
			color: "#4089FF",
			style: {
				"width": "200px",
				"height": "240px"
			}
		}),
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "IDuxChartDemoDIN, sans-serif" },
			value: 100,
			label: "完整填充",
			style: {
				"width": "200px",
				"height": "240px"
			}
		}),
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "IDuxChartDemoDIN, sans-serif" },
			value: 120,
			label: "越界值保留原文",
			style: {
				"width": "200px",
				"height": "240px"
			}
		})
	]);
}
if (typeof Range_vue_vue_type_archive_meta_index_0_lang_default === "function") Range_vue_vue_type_archive_meta_index_0_lang_default(_sfc_main);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Range.vue__resolved
var __archive_data__ = {
	"id": "archive-item-44",
	"filename": "Range.vue",
	"relativePath": "components/liquid-fill/demos/Range.vue",
	"query": {},
	"title": "自定义量程与边界",
	"description": "非百分比量程配合 unit 显示单位，保留统一的数字和单位字号。满量程完整填充；有限越界值仅钳制水位，文字保留真实值。",
	"index": 3,
	"sourceCodes": [{
		"filename": "Range.vue",
		"code": "<template>\n  <div style=\"display: flex; flex-wrap: wrap; gap: 24px\">\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'IDuxChartDemoDIN, sans-serif' }\"\n      :value=\"48\"\n      :max=\"64\"\n      unit=\"GB\"\n      label=\"存储容量 / 64 GB\"\n      color=\"#4089FF\"\n      style=\"width: 200px; height: 240px\"\n    />\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'IDuxChartDemoDIN, sans-serif' }\"\n      :value=\"100\"\n      label=\"完整填充\"\n      style=\"width: 200px; height: 240px\"\n    />\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'IDuxChartDemoDIN, sans-serif' }\"\n      :value=\"120\"\n      label=\"越界值保留原文\"\n      style=\"width: 200px; height: 240px\"\n    />\n  </div>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">display: flex; flex-wrap: wrap; gap: 24px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">IDuxChartDemoDIN, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">48</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">max</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">64</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">unit</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">GB</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">存储容量 / 64 GB</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">color</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">#4089FF</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 200px; height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">IDuxChartDemoDIN, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">100</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">完整填充</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 200px; height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">IDuxChartDemoDIN, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">120</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">越界值保留原文</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 200px; height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Range.vue"]]), setup)
};
export { __archive_data__ as default };
