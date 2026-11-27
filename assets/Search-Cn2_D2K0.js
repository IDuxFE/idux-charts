import { t as Ui } from "./client-DEcWQYNR.js";
import { t as IxSpace } from "./space-CW0kNbna.js";
import { t as IxWordCloudChart } from "./word-cloud-CPbEBP-8.js";
import { An as createVNode, Cn as computed, Gn as openBlock, Hn as onMounted, In as mergeProps, Jn as watch, Ln as nextTick, N as callEmit, O as useGlobalConfig, Tn as createBlock, Xn as withCtx, c as _plugin_vue_export_helper_default, f as seerColors, ir as ref, jn as defineComponent, or as toRaw } from "./app-default-CCjST5KB.js";
import { t as ɵInput } from "./input-DbKWt-NA.js";
import { t as useAccessorAndControl } from "./forms-B6Kh-Mnc.js";
import { a as useFormSize, i as useFormItemRegister, o as useFormStatus, r as useFormFocusMonitor } from "./form-QqG8qbhu.js";
import { t as setup } from "./setup-Dd2XUUl1.js";
var inputProps = {
	control: {
		type: [
			String,
			Number,
			Object,
			Array
		],
		default: void 0
	},
	value: {
		type: String,
		default: void 0
	},
	clearable: {
		type: Boolean,
		default: void 0
	},
	clearIcon: {
		type: String,
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: false
	},
	readonly: {
		type: Boolean,
		default: false
	},
	size: {
		type: String,
		default: void 0
	},
	status: String,
	trim: {
		type: Boolean,
		default: void 0
	},
	"onUpdate:value": [Function, Array],
	onChange: [Function, Array],
	onClear: [Function, Array],
	onCompositionStart: [Function, Array],
	onCompositionEnd: [Function, Array],
	onInput: [Function, Array],
	onFocus: [Function, Array],
	onBlur: [Function, Array],
	addonAfter: {
		type: String,
		default: void 0
	},
	addonBefore: {
		type: String,
		default: void 0
	},
	borderless: {
		type: Boolean,
		default: void 0
	},
	prefix: {
		type: String,
		default: void 0
	},
	suffix: {
		type: String,
		default: void 0
	}
};
function useInput(props, config) {
	const { accessor, control } = useAccessorAndControl();
	useFormItemRegister(control);
	const mergedSize = useFormSize(props, config);
	const mergedStatus = useFormStatus(props, control);
	const clearable = computed(() => {
		var _a;
		return (_a = props.clearable) != null ? _a : config.clearable;
	});
	const clearIcon = computed(() => {
		var _a;
		return (_a = props.clearIcon) != null ? _a : config.clearIcon;
	});
	const clearVisible = computed(() => !accessor.disabled && !props.readonly && !!accessor.value);
	const mergedTrim = computed(() => {
		var _a;
		return (_a = props.trim) != null ? _a : config.trim;
	});
	const isFocused = ref(false);
	const handleFocus = (evt) => {
		isFocused.value = true;
		callEmit(props.onFocus, evt);
	};
	const handleBlur = (evt) => {
		isFocused.value = false;
		accessor.markAsBlurred();
		callEmit(props.onBlur, evt);
		if (mergedTrim.value) setValue(evt.target.value.trim());
	};
	const { elementRef, focus, blur } = useFormFocusMonitor({
		handleFocus,
		handleBlur
	});
	const setValue = (value) => {
		const oldValue = toRaw(accessor.value);
		if (value !== oldValue) {
			accessor.setValue(value);
			callEmit(props.onChange, value, oldValue);
			nextTick(() => syncValue());
		}
	};
	const syncValue = () => {
		var _a;
		const element = elementRef.value;
		const value = (_a = accessor.value) != null ? _a : "";
		if (element && element.value !== value) element.value = value;
	};
	watch(() => accessor.value, () => syncValue());
	const isComposing = ref(false);
	const handleInput = (evt, emitInput = true) => {
		emitInput && callEmit(props.onInput, evt);
		if (isComposing.value) return;
		setValue(evt.target.value);
	};
	const handleCompositionStart = (evt) => {
		isComposing.value = true;
		callEmit(props.onCompositionStart, evt);
	};
	const handleCompositionEnd = (evt) => {
		callEmit(props.onCompositionEnd, evt);
		if (isComposing.value) {
			isComposing.value = false;
			handleInput(evt, false);
		}
	};
	const handleClear = (evt) => {
		accessor.setValue("");
		callEmit(props.onClear, evt);
	};
	return {
		elementRef,
		accessor,
		mergedSize,
		mergedStatus,
		clearable,
		clearIcon,
		clearVisible,
		isFocused,
		isComposing,
		focus,
		blur,
		handleInput,
		handleCompositionStart,
		handleCompositionEnd,
		handleFocus,
		handleBlur,
		handleClear,
		syncValue
	};
}
var IxInput = /* @__PURE__ */ defineComponent({
	name: "IxInput",
	props: inputProps,
	setup(props, { slots, expose }) {
		const { elementRef, accessor, mergedSize, mergedStatus, clearable, clearIcon, clearVisible, isFocused, focus, blur, handleInput, handleCompositionStart, handleCompositionEnd, handleClear, syncValue } = useInput(props, useGlobalConfig("input"));
		expose({
			focus,
			blur
		});
		const inputRef = ref();
		onMounted(() => {
			elementRef.value = inputRef.value.getInputElement();
			syncValue();
		});
		return () => {
			const { addonAfter, addonBefore, borderless, prefix, suffix } = props;
			return createVNode(ɵInput, {
				"ref": inputRef,
				"addonAfter": addonAfter,
				"addonBefore": addonBefore,
				"borderless": borderless,
				"clearable": clearable.value,
				"clearIcon": clearIcon.value,
				"clearVisible": clearVisible.value,
				"disabled": accessor.disabled,
				"focused": isFocused.value,
				"prefix": prefix,
				"readonly": props.readonly,
				"size": mergedSize.value,
				"status": mergedStatus.value,
				"suffix": suffix,
				"value": accessor.value,
				"onClear": handleClear,
				"onInput": handleInput,
				"onCompositionstart": handleCompositionStart,
				"onCompositionend": handleCompositionEnd
			}, slots);
		};
	}
});
// src/components/word-cloud/demos/Search.vue?vue&type=script&setup=true&lang.ts
var Search_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Search",
	setup(__props, { expose: __expose }) {
		__expose();
		const options = { name: "词频" };
		const query = ref("好吃");
		const source = [
			"味道",
			"套餐",
			"难吃",
			"差评",
			"包子",
			"外卖",
			"餐具",
			"商家",
			"好吃",
			"时间",
			"晚上",
			"要求"
		].map((name, index) => ({
			id: name,
			name,
			value: 100 - index * 7
		}));
		const __returned__ = {
			options,
			query,
			source,
			data: computed(() => {
				const keyword = query.value.trim();
				return source.map((row) => ({
					...row,
					...keyword && row.name.includes(keyword) ? { label: {
						color: "#fff",
						opacity: 1,
						backgroundColor: seerColors[0]
					} } : {}
				}));
			})
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Search_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "搜索高亮",
	description: "适用于从评论关键词或热门话题中查找指定内容的场景。输入关键词后突出匹配词条，保留其他词条作为上下文，便于定位目标并了解它在整体词云中的位置。",
	index: 3
};
// src/components/word-cloud/demos/Search.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxInput = IxInput;
	const _component_IxWordCloudChart = IxWordCloudChart;
	const _component_IxSpace = IxSpace;
	return openBlock(), createBlock(_component_IxSpace, {
		vertical: "",
		block: ""
	}, {
		default: withCtx(() => [createVNode(_component_IxInput, {
			value: $setup.query,
			"onUpdate:value": _cache[0] || (_cache[0] = ($event) => $setup.query = $event),
			placeholder: "搜索关键词，例如：味道",
			"aria-label": "搜索词云关键词"
		}, null, 8, ["value"]), createVNode(_component_IxWordCloudChart, mergeProps($setup.options, {
			data: $setup.data,
			style: { "height": "320px" }
		}), null, 16, ["data"])]),
		_: 1
	});
}
if (typeof Search_vue_vue_type_archive_meta_index_0_lang_default === "function") Search_vue_vue_type_archive_meta_index_0_lang_default(Search_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/word-cloud/demos/Search.vue__resolved
var __archive_data__ = {
	"id": "archive-item-58",
	"filename": "Search.vue",
	"relativePath": "components/word-cloud/demos/Search.vue",
	"query": {},
	"title": "搜索高亮",
	"description": "适用于从评论关键词或热门话题中查找指定内容的场景。输入关键词后突出匹配词条，保留其他词条作为上下文，便于定位目标并了解它在整体词云中的位置。",
	"index": 3,
	"sourceCodes": [{
		"filename": "Search.vue",
		"code": "<script setup lang=\"ts\">\nimport { computed, ref } from 'vue'\nimport { seerColors } from '@idux/charts'\nimport type { WordCloudChartProps } from '@idux/charts'\nconst options: WordCloudChartProps = {\n  name: '词频',\n}\n\nconst query = ref('好吃')\nconst source = [\n  '味道',\n  '套餐',\n  '难吃',\n  '差评',\n  '包子',\n  '外卖',\n  '餐具',\n  '商家',\n  '好吃',\n  '时间',\n  '晚上',\n  '要求',\n].map((name, index) => ({ id: name, name, value: 100 - index * 7 }))\nconst data = computed(() => {\n  const keyword = query.value.trim()\n  return source.map(row => ({\n    ...row,\n    ...(keyword && row.name.includes(keyword)\n      ? { label: { color: '#fff', opacity: 1, backgroundColor: seerColors[0] } }\n      : {}),\n  }))\n})\n<\/script>\n<template>\n  <IxSpace vertical block>\n    <IxInput\n      v-model:value=\"query\"\n      placeholder=\"搜索关键词，例如：味道\"\n      aria-label=\"搜索词云关键词\"\n    />\n    <IxWordCloudChart v-bind=\"options\" :data=\"data\" style=\"height: 320px\" />\n  </IxSpace>\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">computed</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">seerColors</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">WordCloudChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> options</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">WordCloudChartProps</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">词频</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> query </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">好吃</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> source </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">味道</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">套餐</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">难吃</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">差评</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">包子</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">外卖</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">餐具</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">商家</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">好吃</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">时间</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">晚上</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">要求</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">name</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">id</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> name</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> name</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">-</span><span style=\"color: #A6ACCD\"> index </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">7</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #C792EA\">const</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">keyword</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">query</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">trim</span><span style=\"color: #F07178\">()</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">return</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">source</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #F07178\">(</span><span style=\"color: #A6ACCD\">row</span><span style=\"color: #F07178\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #F07178\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #89DDFF\">...</span><span style=\"color: #A6ACCD\">row</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #89DDFF\">...</span><span style=\"color: #F07178\">(</span><span style=\"color: #A6ACCD\">keyword</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&amp;&amp;</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">row</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">name</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">includes</span><span style=\"color: #F07178\">(</span><span style=\"color: #A6ACCD\">keyword</span><span style=\"color: #F07178\">)</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">      </span><span style=\"color: #89DDFF\">?</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#fff</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> opacity</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> backgroundColor</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">seerColors</span><span style=\"color: #F07178\">[</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #F07178\">] </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">      </span><span style=\"color: #89DDFF\">:</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">{}</span><span style=\"color: #F07178\">)</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #F07178\">))</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">vertical</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">block</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxInput</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">query</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">placeholder</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">搜索关键词，例如：味道</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">      </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">搜索词云关键词</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">    /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxWordCloudChart</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">options</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">data</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">data</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 320px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Search_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/word-cloud/demos/Search.vue"]]), setup)
};
export { __archive_data__ as default };
