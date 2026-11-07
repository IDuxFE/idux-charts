import { K as ref, L as withCtx, M as openBlock, _ as createVNode, f as createBlock, g as createTextVNode, n as Ui, t as _plugin_vue_export_helper_default, v as defineComponent } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { i as IxRadarChart, t as setup } from "./setup-Dx32Rw55.js";
import { n as IxSpace } from "./forms--n9BjfHG.js";
/* empty css               */
import { n as IxRadioGroup, t as IxRadio } from "./style-BoMkRYnb.js";
// src/components/radar/demos/Scale.vue?vue&type=script&setup=true&lang.ts
var Scale_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Scale",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			direction: ref("clockwise"),
			status: ref("ready"),
			indicator: [
				{
					name: "覆盖率（%）",
					min: 0,
					max: 100
				},
				{
					name: "处理能力（千次/秒）",
					min: 0,
					max: 20
				},
				{
					name: "稳定性（分）",
					min: 0,
					max: 10
				},
				{
					name: "自动化率（%）",
					min: 0,
					max: 100
				}
			],
			data: [{
				name: "方案 A",
				value: [
					85,
					12,
					9,
					70
				]
			}, {
				name: "方案 B",
				value: [
					70,
					18,
					7,
					90
				]
			}]
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Scale_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "独立量程与方向",
	description: "每个维度使用独立量程，数值保持原始单位。切换方向无需手动反转数据；原生加载遮罩保留图表实例和已有数据。百分比半径随容器尺寸调整。",
	index: 2
};
// src/components/radar/demos/Scale.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxRadio = IxRadio;
	const _component_IxRadioGroup = IxRadioGroup;
	const _component_IxSpace = IxSpace;
	const _component_IxRadarChart = IxRadarChart;
	return openBlock(), createBlock(_component_IxSpace, {
		vertical: "",
		block: "",
		size: 16,
		class: "radar-scale-demo"
	}, {
		default: withCtx(() => [createVNode(_component_IxSpace, {
			wrap: "",
			size: 16
		}, {
			default: withCtx(() => [createVNode(_component_IxRadioGroup, {
				value: $setup.direction,
				"onUpdate:value": _cache[0] || (_cache[0] = ($event) => $setup.direction = $event),
				buttoned: ""
			}, {
				default: withCtx(() => [createVNode(_component_IxRadio, { key: "clockwise" }, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("顺时针", -1)])]),
					_: 1
				}), createVNode(_component_IxRadio, { key: "counterclockwise" }, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("逆时针", -1)])]),
					_: 1
				})]),
				_: 1
			}, 8, ["value"]), createVNode(_component_IxRadioGroup, {
				value: $setup.status,
				"onUpdate:value": _cache[1] || (_cache[1] = ($event) => $setup.status = $event),
				buttoned: ""
			}, {
				default: withCtx(() => [createVNode(_component_IxRadio, { key: "ready" }, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("展示数据", -1)])]),
					_: 1
				}), createVNode(_component_IxRadio, { key: "loading" }, {
					default: withCtx(() => [..._cache[5] || (_cache[5] = [createTextVNode("原生加载遮罩", -1)])]),
					_: 1
				})]),
				_: 1
			}, 8, ["value"])]),
			_: 1
		}), createVNode(_component_IxRadarChart, {
			indicator: $setup.indicator,
			data: $setup.data,
			clockwise: $setup.direction === "clockwise",
			loading: $setup.status === "loading" && { text: "正在更新评估数据" },
			area: "",
			radius: "55%",
			center: ["50%", "46%"],
			style: {
				"height": "360px",
				"width": "100%"
			}
		}, null, 8, ["clockwise", "loading"])]),
		_: 1
	});
}
if (typeof Scale_vue_vue_type_archive_meta_index_0_lang_default === "function") Scale_vue_vue_type_archive_meta_index_0_lang_default(Scale_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/demos/Scale.vue__resolved
var __archive_data__ = {
	"id": "archive-item-51",
	"filename": "Scale.vue",
	"relativePath": "components/radar/demos/Scale.vue",
	"query": {},
	"title": "独立量程与方向",
	"description": "每个维度使用独立量程，数值保持原始单位。切换方向无需手动反转数据；原生加载遮罩保留图表实例和已有数据。百分比半径随容器尺寸调整。",
	"index": 2,
	"sourceCodes": [{
		"filename": "Scale.vue",
		"code": "<script setup lang=\"ts\">\nimport { ref } from 'vue'\n\nconst direction = ref('clockwise')\nconst status = ref('ready')\nconst indicator = [\n  { name: '覆盖率（%）', min: 0, max: 100 },\n  { name: '处理能力（千次/秒）', min: 0, max: 20 },\n  { name: '稳定性（分）', min: 0, max: 10 },\n  { name: '自动化率（%）', min: 0, max: 100 },\n]\nconst data = [\n  { name: '方案 A', value: [85, 12, 9, 70] },\n  { name: '方案 B', value: [70, 18, 7, 90] },\n]\n<\/script>\n\n<template>\n  <IxSpace vertical block :size=\"16\" class=\"radar-scale-demo\">\n    <IxSpace wrap :size=\"16\">\n      <IxRadioGroup v-model:value=\"direction\" buttoned>\n        <IxRadio key=\"clockwise\">顺时针</IxRadio>\n        <IxRadio key=\"counterclockwise\">逆时针</IxRadio>\n      </IxRadioGroup>\n      <IxRadioGroup v-model:value=\"status\" buttoned>\n        <IxRadio key=\"ready\">展示数据</IxRadio>\n        <IxRadio key=\"loading\">原生加载遮罩</IxRadio>\n      </IxRadioGroup>\n    </IxSpace>\n    <IxRadarChart\n      :indicator=\"indicator\"\n      :data=\"data\"\n      :clockwise=\"direction === 'clockwise'\"\n      :loading=\"status === 'loading' && { text: '正在更新评估数据' }\"\n      area\n      radius=\"55%\"\n      :center=\"['50%', '46%']\"\n      style=\"height: 360px; width: 100%\"\n    />\n  </IxSpace>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> direction </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">clockwise</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> status </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">ready</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> indicator </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">覆盖率（%）</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">min</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">处理能力（千次/秒）</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">min</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">稳定性（分）</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">min</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">10</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">自动化率（%）</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">min</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">方案 A</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">85</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">9</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">70</span><span style=\"color: #A6ACCD\">] </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">方案 B</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">70</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">18</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">7</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">90</span><span style=\"color: #A6ACCD\">] </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">vertical</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">block</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">radar-scale-demo</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">wrap</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">direction</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">clockwise</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">顺时针</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">counterclockwise</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">逆时针</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">status</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ready</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">展示数据</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">原生加载遮罩</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadarChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">indicator</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">indicator</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">clockwise</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">direction</span><span style=\"color: #89DDFF\"> === </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">clockwise</span><span style=\"color: #89DDFF\">&#39;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">loading</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">status</span><span style=\"color: #89DDFF\"> === </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> &amp;&amp; { </span><span style=\"color: #F07178\">text</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">正在更新评估数据</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">area</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">radius</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">55%</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      :</span><span style=\"color: #C792EA\">center</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">[</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">50%</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">, </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">46%</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">]</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 360px; width: 100%</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Scale_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/demos/Scale.vue"]]), setup)
};
export { __archive_data__ as default };
