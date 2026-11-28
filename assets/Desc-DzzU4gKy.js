import { t as Ui } from "./client-D7mTuevI.js";
import { An as createVNode, Cn as computed, Dn as createElementBlock, Gn as openBlock, I as convertCssPixel, Kn as provide, O as useGlobalConfig, Pn as inject, R as convertNumber, Vt as isObject, Xn as withCtx, b as useThemeToken, c as _plugin_vue_export_helper_default, fr as toDisplayString, jn as defineComponent, k as Logger, kn as createTextVNode, ur as normalizeClass, wn as createBaseVNode } from "./app-default-DalXtduk.js";
import { a as BREAKPOINTS_KEYS, n as IxRow, o as useSharedBreakpoints, r as ɵHeader, t as IxCol } from "./grid-DZI3DaFQ.js";
import { n as convertStringVNode } from "./utils-BWRE-Hjl.js";
import { t as IxBulletChart } from "./bullet-gY7BnL0o.js";
import { t as setup } from "./setup-1ooTVilH.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/desc/index.js
var descToken = Symbol("descToken");
var descProps = {
	col: {
		type: [
			Number,
			String,
			Object
		],
		default: void 0
	},
	colonless: {
		type: Boolean,
		default: void 0
	},
	header: { type: [String, Object] },
	labelAlign: String,
	labelWidth: {
		type: [String, Number],
		default: void 0
	},
	layout: String,
	size: String
};
var descItemProps = {
	col: {
		type: [
			Number,
			String,
			Object
		],
		default: 1
	},
	colonless: {
		type: Boolean,
		default: void 0
	},
	label: {
		type: [String, Number],
		default: void 0
	},
	labelAlign: {
		type: String,
		default: void 0
	},
	labelWidth: {
		type: [String, Number],
		default: void 0
	}
};
function getDefaultThemeTokens(tokens) {
	const { colorTextInfo, heightSm, heightMd, heightLg, fontSizeSm } = tokens;
	return {
		itemHeightSm: heightSm,
		itemHeightMd: heightMd,
		itemHeightLg: heightLg,
		fontSizeSm,
		fontSizeMd: fontSizeSm,
		fontSizeLg: fontSizeSm,
		labelColor: colorTextInfo
	};
}
var getThemeTokens = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens);
};
var Desc = /* @__PURE__ */ defineComponent({
	name: "IxDesc",
	props: descProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("desc");
		registerToken(getThemeTokens);
		const config = useGlobalConfig("desc");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-desc`);
		const mergedCol = computed(() => {
			var _a;
			return (_a = props.col) != null ? _a : config.col;
		});
		const mergedColonless = computed(() => {
			var _a;
			return (_a = props.colonless) != null ? _a : config.colonless;
		});
		const mergedLabelAlign = computed(() => {
			var _a;
			return (_a = props.labelAlign) != null ? _a : config.labelAlign;
		});
		const mergedLabelWidth = computed(() => props.labelWidth);
		const mergedSize = computed(() => {
			var _a;
			return (_a = props.size) != null ? _a : config.size;
		});
		provide(descToken, {
			mergedPrefixCls,
			mergedCol,
			mergedColonless,
			mergedLabelAlign,
			mergedLabelWidth
		});
		const classes = computed(() => {
			const prefixCls = mergedPrefixCls.value;
			const { layout = config.layout } = props;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-${mergedSize.value}`]: true,
				[`${prefixCls}-vertical`]: layout === "vertical"
			});
		});
		const headerClasses = computed(() => `${mergedPrefixCls.value}-header`);
		return () => {
			return createVNode(IxRow, { "class": classes.value }, { default: () => [createVNode("div", { "class": headerClasses.value }, [createVNode(ɵHeader, {
				"header": props.header,
				"size": mergedSize.value === "lg" ? "md" : "sm"
			}, {
				header: slots.header,
				closeIcon: slots.suffix
			})]), slots.default && slots.default()] });
		};
	}
});
var DescItem = /* @__PURE__ */ defineComponent({
	name: "IxDescItem",
	props: descItemProps,
	setup(props, { slots }) {
		const descContext = inject(descToken);
		if (!descContext) {
			Logger.warn("components/desc", "The IxDescItem must be within IxDesc component");
			return;
		}
		const { mergedPrefixCls, mergedCol, mergedColonless, mergedLabelAlign, mergedLabelWidth } = descContext;
		const mergedColSpan = useMergedColSpan(props, mergedCol);
		const labelClasses = computed(() => {
			const prefixCls = `${mergedPrefixCls.value}-item-label`;
			const { colonless = mergedColonless.value, labelAlign = mergedLabelAlign.value } = props;
			return normalizeClass({
				[prefixCls]: true,
				[`${prefixCls}-colon`]: !colonless,
				[`${prefixCls}-start`]: labelAlign === "start"
			});
		});
		const labelStyle = computed(() => {
			var _a;
			const labelWidth = convertCssPixel((_a = props.labelWidth) != null ? _a : mergedLabelWidth.value);
			return labelWidth ? `width: ${labelWidth}` : void 0;
		});
		return () => {
			const labelNode = convertStringVNode(slots, props, "label");
			return createVNode(IxCol, {
				"class": `${mergedPrefixCls.value}-item`,
				"span": mergedColSpan.value
			}, { default: () => [labelNode && createVNode("div", { "class": labelClasses.value }, [createVNode("label", { "style": labelStyle.value }, [labelNode])]), createVNode("div", { "class": `${mergedPrefixCls.value}-content` }, [createVNode("span", null, [slots.default && slots.default()])])] });
		};
	}
});
var defaultSelfCol = 1;
var defaultParentCol = 3;
var defaultRowSpan = 24;
function useMergedColSpan(props, mergedCol) {
	const breakpoints = useSharedBreakpoints();
	return computed(() => {
		let selfCol = props.col;
		let parentCol = mergedCol.value;
		const currBreakpoint = BREAKPOINTS_KEYS.find((key) => breakpoints[key]);
		selfCol = convertNumber(isObject(selfCol) ? selfCol[currBreakpoint] : selfCol, defaultSelfCol);
		parentCol = convertNumber(isObject(parentCol) ? parentCol[currBreakpoint] : parentCol, defaultParentCol);
		return defaultRowSpan / parentCol * selfCol;
	});
}
var IxDesc = Desc;
var IxDescItem = DescItem;
// src/components/bullet/demos/Desc.vue?vue&type=script&setup=true&lang.ts
var value = 72;
var target = 85;
var Desc_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Desc",
	setup(__props, { expose: __expose }) {
		__expose();
		const formatPercent = (value) => `${value}%`;
		const __returned__ = {
			value,
			target,
			formatPercent
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Desc_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "数据展示场景",
	description: "适用于详情页或侧边详情面板，在查看任务信息的同时，直观对比完成率与目标值，快速了解任务达标情况。",
	index: 7
};
// src/components/bullet/demos/Desc.vue
var _hoisted_1 = { class: "bullet-details" };
var _hoisted_2 = { class: "bullet-details-metric" };
var _hoisted_3 = { class: "bullet-details-values" };
var _hoisted_4 = { class: "bullet-details-value" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxDescItem = IxDescItem;
	const _component_IxBulletChart = IxBulletChart;
	const _component_IxDesc = IxDesc;
	return openBlock(), createElementBlock("section", _hoisted_1, [createVNode(_component_IxDesc, {
		header: "采集任务详情",
		col: 1,
		"label-width": 80,
		"label-align": "start"
	}, {
		default: withCtx(() => [
			createVNode(_component_IxDescItem, { label: "任务名称" }, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createTextVNode("终端资产采集", -1)])]),
				_: 1
			}),
			createVNode(_component_IxDescItem, { label: "所属分组" }, {
				default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode("办公终端", -1)])]),
				_: 1
			}),
			createVNode(_component_IxDescItem, { label: "执行周期" }, {
				default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode("每天 02:00", -1)])]),
				_: 1
			}),
			createVNode(_component_IxDescItem, { label: "采集完成率" }, {
				default: withCtx(() => [createBaseVNode("div", _hoisted_2, [createVNode(_component_IxBulletChart, {
					class: "bullet-details-chart",
					style: {
						"width": "100%",
						"height": "20px"
					},
					value: $setup.value,
					target: $setup.target,
					name: "完成率",
					tooltip: { valueFormatter: $setup.formatPercent }
				}, null, 8, ["tooltip"]), createBaseVNode("div", _hoisted_3, [createBaseVNode("span", _hoisted_4, toDisplayString($setup.formatPercent($setup.value)), 1), createBaseVNode("span", null, "目标 " + toDisplayString($setup.formatPercent($setup.target)), 1)])])]),
				_: 1
			}),
			createVNode(_component_IxDescItem, { label: "负责人" }, {
				default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("张明", -1)])]),
				_: 1
			}),
			createVNode(_component_IxDescItem, { label: "最近更新" }, {
				default: withCtx(() => [..._cache[4] || (_cache[4] = [createTextVNode("2026-11-25 09:30", -1)])]),
				_: 1
			})
		]),
		_: 1
	})]);
}
if (typeof Desc_vue_vue_type_archive_meta_index_0_lang_default === "function") Desc_vue_vue_type_archive_meta_index_0_lang_default(Desc_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bullet/demos/Desc.vue__resolved
var __archive_data__ = {
	"id": "archive-item-76",
	"filename": "Desc.vue",
	"relativePath": "components/bullet/demos/Desc.vue",
	"query": {},
	"title": "数据展示场景",
	"description": "适用于详情页或侧边详情面板，在查看任务信息的同时，直观对比完成率与目标值，快速了解任务达标情况。",
	"index": 7,
	"sourceCodes": [{
		"filename": "Desc.vue",
		"code": "<script setup lang=\"ts\">\nconst value = 72\nconst target = 85\nconst formatPercent = (value: unknown) => `${value}%`\n<\/script>\n\n<template>\n  <section class=\"bullet-details\">\n    <IxDesc header=\"采集任务详情\" :col=\"1\" :label-width=\"80\" label-align=\"start\">\n      <IxDescItem label=\"任务名称\">终端资产采集</IxDescItem>\n      <IxDescItem label=\"所属分组\">办公终端</IxDescItem>\n      <IxDescItem label=\"执行周期\">每天 02:00</IxDescItem>\n      <IxDescItem label=\"采集完成率\">\n        <div class=\"bullet-details-metric\">\n          <IxBulletChart\n            class=\"bullet-details-chart\"\n            style=\"width: 100%; height: 20px\"\n            :value=\"value\"\n            :target=\"target\"\n            name=\"完成率\"\n            :tooltip=\"{ valueFormatter: formatPercent }\"\n          />\n          <div class=\"bullet-details-values\">\n            <span class=\"bullet-details-value\">{{ formatPercent(value) }}</span>\n            <span>目标 {{ formatPercent(target) }}</span>\n          </div>\n        </div>\n      </IxDescItem>\n      <IxDescItem label=\"负责人\">张明</IxDescItem>\n      <IxDescItem label=\"最近更新\">2026-11-25 09:30</IxDescItem>\n    </IxDesc>\n  </section>\n</template>\n\n<style scoped>\n.bullet-details {\n  width: 400px;\n  max-width: 100%;\n}\n\n.bullet-details-metric {\n  width: 100%;\n  min-width: 0;\n}\n\n.bullet-details-values {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 8px;\n  color: var(--ix-color-text-info);\n}\n\n.bullet-details-value {\n  color: var(--ix-color-text);\n  font-size: 16px;\n  font-weight: 600;\n}\n</style>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> value </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">72</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> target </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">85</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> formatPercent </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">unknown</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\">%</span><span style=\"color: #89DDFF\">`</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">section</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-details</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDesc</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">header</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">采集任务详情</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">col</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">label-width</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">80</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label-align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">start</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">任务名称</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">终端资产采集</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">所属分组</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">办公终端</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">执行周期</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">每天 02:00</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">采集完成率</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-details-metric</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxBulletChart</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-details-chart</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 100%; height: 20px</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            :</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            :</span><span style=\"color: #C792EA\">target</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">target</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            </span><span style=\"color: #C792EA\">name</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">完成率</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            :</span><span style=\"color: #C792EA\">tooltip</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">valueFormatter</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #A6ACCD\">formatPercent</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-details-values</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">            </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">bullet-details-value</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;{{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">formatPercent</span><span style=\"color: #A6ACCD\">(value) </span><span style=\"color: #89DDFF\">}}&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">            </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">目标 </span><span style=\"color: #89DDFF\">{{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">formatPercent</span><span style=\"color: #A6ACCD\">(target) </span><span style=\"color: #89DDFF\">}}&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">负责人</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">张明</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">最近更新</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">2026-11-25 09:30</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDescItem</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxDesc</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">section</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">style</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">scoped</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bullet-details</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">400px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">max-width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bullet-details-metric</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">min-width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bullet-details-values</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">display</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> flex</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">align-items</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> baseline</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">justify-content</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> space-between</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">gap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">var</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">--ix-color-text-info</span><span style=\"color: #89DDFF\">);</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">bullet-details-value</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">var</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">--ix-color-text</span><span style=\"color: #89DDFF\">);</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">font-size</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #B2CCD6\">font-weight</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">600</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Desc_vue_vue_type_script_setup_true_lang_default, [
		["render", _sfc_render],
		["__scopeId", "data-v-50f44f19"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/bullet/demos/Desc.vue"]
	]), setup)
};
export { __archive_data__ as default };
