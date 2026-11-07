import { K as ref, L as withCtx, M as openBlock, _ as createVNode, f as createBlock, g as createTextVNode, n as Ui, t as _plugin_vue_export_helper_default, v as defineComponent } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { n as IxSpace } from "./forms--n9BjfHG.js";
/* empty css               */
import { r as IxGaugeChart, t as setup } from "./setup-Dx32Rw55.js";
import { n as IxRadioGroup, t as IxRadio } from "./style-BoMkRYnb.js";
// src/components/gauge/demos/Range.vue?vue&type=script&setup=true&lang.ts
var Range_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Range",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = { value: ref(48) };
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Range_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "自定义量程",
	description: "容量范围为 0–64 GB，超量程时指示位置停在端点，文字保留实际数值。",
	index: 4
};
// src/components/gauge/demos/Range.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxRadio = IxRadio;
	const _component_IxRadioGroup = IxRadioGroup;
	const _component_IxGaugeChart = IxGaugeChart;
	const _component_IxSpace = IxSpace;
	return openBlock(), createBlock(_component_IxSpace, {
		vertical: "",
		class: "gauge-range"
	}, {
		default: withCtx(() => [createVNode(_component_IxRadioGroup, {
			value: $setup.value,
			"onUpdate:value": _cache[0] || (_cache[0] = ($event) => $setup.value = $event),
			buttoned: "",
			"aria-label": "容量"
		}, {
			default: withCtx(() => [
				(openBlock(), createBlock(_component_IxRadio, { key: 0 }, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("0 GB", -1)])]),
					_: 1
				})),
				(openBlock(), createBlock(_component_IxRadio, { key: 48 }, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("48 GB", -1)])]),
					_: 1
				})),
				(openBlock(), createBlock(_component_IxRadio, { key: 64 }, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("64 GB", -1)])]),
					_: 1
				})),
				(openBlock(), createBlock(_component_IxRadio, { key: 80 }, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("80 GB（超量程）", -1)])]),
					_: 1
				}))
			]),
			_: 1
		}, 8, ["value"]), createVNode(_component_IxGaugeChart, {
			value: $setup.value,
			max: 64,
			label: "容量 / GB",
			style: {
				"width": "180px",
				"height": "110px"
			}
		}, null, 8, ["value"])]),
		_: 1
	});
}
if (typeof Range_vue_vue_type_archive_meta_index_0_lang_default === "function") Range_vue_vue_type_archive_meta_index_0_lang_default(Range_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/gauge/demos/Range.vue__resolved
var __archive_data__ = {
	"id": "archive-item-59",
	"filename": "Range.vue",
	"relativePath": "components/gauge/demos/Range.vue",
	"query": {},
	"title": "自定义量程",
	"description": "容量范围为 0–64 GB，超量程时指示位置停在端点，文字保留实际数值。",
	"index": 4,
	"sourceCodes": [{
		"filename": "Range.vue",
		"code": "<script setup lang=\"ts\">\nimport { ref } from 'vue'\nconst value = ref(48)\n<\/script>\n<template>\n  <IxSpace vertical class=\"gauge-range\">\n    <IxRadioGroup v-model:value=\"value\" buttoned aria-label=\"容量\">\n      <IxRadio :key=\"0\">0 GB</IxRadio>\n      <IxRadio :key=\"48\">48 GB</IxRadio>\n      <IxRadio :key=\"64\">64 GB</IxRadio>\n      <IxRadio :key=\"80\">80 GB（超量程）</IxRadio>\n    </IxRadioGroup>\n    <IxGaugeChart :value=\"value\" :max=\"64\" label=\"容量 / GB\" style=\"width: 180px; height: 110px\" />\n  </IxSpace>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> value </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">48</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">vertical</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">gauge-range</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">容量</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">0 GB</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">48</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">48 GB</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">64</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">64 GB</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">80</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">80 GB（超量程）</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxGaugeChart</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">max</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">64</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">容量 / GB</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 180px; height: 110px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Range_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/gauge/demos/Range.vue"]]), setup)
};
export { __archive_data__ as default };
