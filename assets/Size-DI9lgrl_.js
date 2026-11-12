import { t as Ui } from "./client-BO5_-eWH.js";
import { n as IxLiquidFillChart, t as setup } from "./setup-CxestBAj.js";
import { Hr as createVNode, bt as _plugin_vue_export_helper_default, ri as openBlock, zr as createElementBlock } from "./app-default-B-67LCZ3.js";
var Size_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "尺寸与静态模式",
	description: "radius 设置最大半径，容器变小时自动收缩。关闭 waveAnimation 可保留双层波形用于静态展示。",
	index: 4
};
// src/components/liquid-fill/demos/Size.vue
var _sfc_main = {};
var _hoisted_1 = { style: {
	"display": "flex",
	"align-items": "center",
	"flex-wrap": "wrap",
	"gap": "24px"
} };
function _sfc_render(_ctx, _cache) {
	const _component_IxLiquidFillChart = IxLiquidFillChart;
	return openBlock(), createElementBlock("div", _hoisted_1, [
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "D-DIN-PRO, sans-serif" },
			value: 50,
			radius: 40,
			waveAnimation: false,
			label: "静态小图",
			style: {
				"width": "140px",
				"height": "200px"
			}
		}),
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "D-DIN-PRO, sans-serif" },
			value: 50,
			label: "默认尺寸",
			style: {
				"width": "200px",
				"height": "240px"
			}
		}),
		createVNode(_component_IxLiquidFillChart, {
			textStyle: { fontFamily: "D-DIN-PRO, sans-serif" },
			value: 50,
			radius: 88,
			label: "大尺寸",
			style: {
				"width": "280px",
				"height": "300px"
			}
		})
	]);
}
if (typeof Size_vue_vue_type_archive_meta_index_0_lang_default === "function") Size_vue_vue_type_archive_meta_index_0_lang_default(_sfc_main);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Size.vue__resolved
var __archive_data__ = {
	"id": "archive-item-63",
	"filename": "Size.vue",
	"relativePath": "components/liquid-fill/demos/Size.vue",
	"query": {},
	"title": "尺寸与静态模式",
	"description": "radius 设置最大半径，容器变小时自动收缩。关闭 waveAnimation 可保留双层波形用于静态展示。",
	"index": 4,
	"sourceCodes": [{
		"filename": "Size.vue",
		"code": "<template>\n  <div style=\"display: flex; align-items: center; flex-wrap: wrap; gap: 24px\">\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'D-DIN-PRO, sans-serif' }\"\n      :value=\"50\"\n      :radius=\"40\"\n      :waveAnimation=\"false\"\n      label=\"静态小图\"\n      style=\"width: 140px; height: 200px\"\n    />\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'D-DIN-PRO, sans-serif' }\"\n      :value=\"50\"\n      label=\"默认尺寸\"\n      style=\"width: 200px; height: 240px\"\n    />\n    <IxLiquidFillChart\n      :textStyle=\"{ fontFamily: 'D-DIN-PRO, sans-serif' }\"\n      :value=\"50\"\n      :radius=\"88\"\n      label=\"大尺寸\"\n      style=\"width: 280px; height: 300px\"\n    />\n  </div>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">display: flex; align-items: center; flex-wrap: wrap; gap: 24px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">D-DIN-PRO, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">50</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">radius</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">40</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">waveAnimation</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">静态小图</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 140px; height: 200px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">D-DIN-PRO, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">50</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">默认尺寸</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 200px; height: 240px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLiquidFillChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">textStyle</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">D-DIN-PRO, sans-serif</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">50</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">radius</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">88</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">大尺寸</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 280px; height: 300px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/liquid-fill/demos/Size.vue"]]), setup)
};
export { __archive_data__ as default };
