import { C as mergeProps, F as watch, K as ref, M as openBlock, Z as unref, f as createBlock, n as Ui, t as _plugin_vue_export_helper_default, u as computed, v as defineComponent } from "./_plugin-vue_export-helper-DL5t6dEv.js";
import { $ as indexOf, G as createSimpleOverallStageHandler2, H as getDecalFromPalette, J as createHashMap, K as makeInner, Q as filter, V as use, X as each, Y as defaults, Z as extend, et as isFunction, nt as merge, q as clone, s as IxLineChart, t as setup, tt as isString, u as getAlphaColor } from "./setup-Dx32Rw55.js";
import { t as useLineStyleColor } from "./useLineStyleColor-Dp8yXyoF.js";
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/visual/aria.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
var DEFAULT_OPTION = {
	label: { enabled: true },
	decal: { show: false }
};
var innerSeries = makeInner();
var innerGlobal = makeInner();
var ariaVisualStageHandler = createSimpleOverallStageHandler2(ariaVisual);
function ariaVisual(ecModel, api) {
	var ariaModel = ecModel.getModel("aria");
	if (!ariaModel.get("enabled")) return;
	var decalPaletteScope = innerGlobal(ecModel).scope || (innerGlobal(ecModel).scope = {});
	var defaultOption = clone(DEFAULT_OPTION);
	merge(defaultOption.label, ecModel.getLocaleModel().get("aria"), false);
	merge(ariaModel.option, defaultOption, false);
	setDecal();
	setLabel();
	function setDecal() {
		if (ariaModel.getModel("decal").get("show")) {
			var paletteScopeGroupByType_1 = createHashMap();
			ecModel.eachSeries(function(seriesModel) {
				if (!seriesModel.isColorBySeries()) innerSeries(seriesModel).scope = paletteScopeGroupByType_1.get(seriesModel.type) || paletteScopeGroupByType_1.set(seriesModel.type, {});
			});
			ecModel.eachSeries(function(seriesModel) {
				if (isFunction(seriesModel.enableAriaDecal)) {
					seriesModel.enableAriaDecal();
					return;
				}
				var data = seriesModel.getData();
				if (!seriesModel.isColorBySeries()) {
					var dataAll_1 = seriesModel.getRawData();
					var idxMap_1 = {};
					var decalScope_1 = innerSeries(seriesModel).scope;
					data.each(function(idx) {
						var rawIdx = data.getRawIndex(idx);
						idxMap_1[rawIdx] = idx;
					});
					var dataCount_1 = dataAll_1.count();
					dataAll_1.each(function(rawIdx) {
						var idx = idxMap_1[rawIdx];
						var name = dataAll_1.getName(rawIdx) || rawIdx + "";
						var paletteDecal = getDecalFromPalette(seriesModel.ecModel, name, decalScope_1, dataCount_1);
						var specifiedDecal = data.getItemVisual(idx, "decal");
						data.setItemVisual(idx, "decal", mergeDecal(specifiedDecal, paletteDecal));
					});
				} else {
					var paletteDecal = getDecalFromPalette(seriesModel.ecModel, seriesModel.name, decalPaletteScope, ecModel.getSeriesCount());
					var specifiedDecal = data.getVisual("decal");
					data.setVisual("decal", mergeDecal(specifiedDecal, paletteDecal));
				}
				function mergeDecal(specifiedDecal, paletteDecal) {
					var resultDecal = specifiedDecal ? extend(extend({}, paletteDecal), specifiedDecal) : paletteDecal;
					resultDecal.dirty = true;
					return resultDecal;
				}
			});
		}
	}
	function setLabel() {
		var dom = api.getZr().dom;
		if (!dom) return;
		var labelLocale = ecModel.getLocaleModel().get("aria");
		var labelModel = ariaModel.getModel("label");
		labelModel.option = defaults(labelModel.option, labelLocale);
		if (!labelModel.get("enabled")) return;
		dom.setAttribute("role", "img");
		if (labelModel.get("description")) {
			dom.setAttribute("aria-label", labelModel.get("description"));
			return;
		}
		var seriesCnt = ecModel.getSeriesCount();
		var maxDataCnt = labelModel.get(["data", "maxCount"]) || 10;
		var maxSeriesCnt = labelModel.get(["series", "maxCount"]) || 10;
		var displaySeriesCnt = Math.min(seriesCnt, maxSeriesCnt);
		var ariaLabel;
		if (seriesCnt < 1) return;
		else {
			var title = getTitle();
			if (title) ariaLabel = replace(labelModel.get(["general", "withTitle"]), { title });
			else ariaLabel = labelModel.get(["general", "withoutTitle"]);
			var seriesLabels_1 = [];
			var prefix = seriesCnt > 1 ? labelModel.get([
				"series",
				"multiple",
				"prefix"
			]) : labelModel.get([
				"series",
				"single",
				"prefix"
			]);
			ariaLabel += replace(prefix, { seriesCount: seriesCnt });
			ecModel.eachSeries(function(seriesModel, idx) {
				if (idx < displaySeriesCnt) {
					var seriesLabel = void 0;
					var withName = seriesModel.get("name") ? "withName" : "withoutName";
					seriesLabel = seriesCnt > 1 ? labelModel.get([
						"series",
						"multiple",
						withName
					]) : labelModel.get([
						"series",
						"single",
						withName
					]);
					seriesLabel = replace(seriesLabel, {
						seriesId: seriesModel.seriesIndex,
						seriesName: seriesModel.get("name"),
						seriesType: getSeriesTypeName(seriesModel.subType)
					});
					var data = seriesModel.getData();
					if (data.count() > maxDataCnt) {
						var partialLabel = labelModel.get(["data", "partialData"]);
						seriesLabel += replace(partialLabel, { displayCnt: maxDataCnt });
					} else seriesLabel += labelModel.get(["data", "allData"]);
					var middleSeparator_1 = labelModel.get([
						"data",
						"separator",
						"middle"
					]);
					var endSeparator_1 = labelModel.get([
						"data",
						"separator",
						"end"
					]);
					var excludeDimensionId_1 = labelModel.get(["data", "excludeDimensionId"]);
					var dataLabels = [];
					for (var i = 0; i < data.count(); i++) if (i < maxDataCnt) {
						var name_1 = data.getName(i);
						var value = !excludeDimensionId_1 ? data.getValues(i) : filter(data.getValues(i), function(v, j) {
							return indexOf(excludeDimensionId_1, j) === -1;
						});
						var dataLabel = labelModel.get(["data", name_1 ? "withName" : "withoutName"]);
						dataLabels.push(replace(dataLabel, {
							name: name_1,
							value: value.join(middleSeparator_1)
						}));
					}
					seriesLabel += dataLabels.join(middleSeparator_1) + endSeparator_1;
					seriesLabels_1.push(seriesLabel);
				}
			});
			var separatorModel = labelModel.getModel([
				"series",
				"multiple",
				"separator"
			]);
			var middleSeparator = separatorModel.get("middle");
			var endSeparator = separatorModel.get("end");
			ariaLabel += seriesLabels_1.join(middleSeparator) + endSeparator;
			dom.setAttribute("aria-label", ariaLabel);
		}
	}
	function replace(str, keyValues) {
		if (!isString(str)) return str;
		var result = str;
		each(keyValues, function(value, key) {
			result = result.replace(new RegExp("\\{\\s*" + key + "\\s*\\}", "g"), value);
		});
		return result;
	}
	function getTitle() {
		var title = ecModel.get("title");
		if (title && title.length) title = title[0];
		return title && title.text;
	}
	function getSeriesTypeName(type) {
		var typeNames = ecModel.getLocaleModel().get(["series", "typeNames"]);
		return typeNames[type] || typeNames.chart;
	}
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/component/aria/preprocessor.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function ariaPreprocessor(option) {
	if (!option || !option.aria) return;
	var aria = option.aria;
	if (aria.show != null) aria.enabled = aria.show;
	aria.label = aria.label || {};
	each([
		"description",
		"general",
		"series",
		"data"
	], function(name) {
		if (aria[name] != null) aria.label[name] = aria[name];
	});
}
// ../../node_modules/.pnpm/echarts@6.1.0/node_modules/echarts/lib/component/aria/install.js
/**
* AUTO-GENERATED FILE. DO NOT MODIFY.
*/
function install(registers) {
	registers.registerPreprocessor(ariaPreprocessor);
	registers.registerVisual(registers.PRIORITY.VISUAL.ARIA, ariaVisualStageHandler);
}
// ../plots/line/src/useLineChartAreaStripe.ts
function useLineChartAreaStripe(el, color) {
	const options = ref({});
	const elRef = computed(() => {
		const elIns = unref(el);
		if (elIns instanceof HTMLElement) return elIns;
		if (elIns && "$el" in elIns && elIns.$el instanceof HTMLElement) return elIns.$el;
		return elIns;
	});
	const observer = new ResizeObserver(() => {
		options.value = getOptionsByDOM(unref(elRef), unref(color));
	});
	watch([elRef, () => unref(color)], ([el, currentColor], _, cleanup) => {
		options.value = getOptionsByDOM(el, currentColor);
		if (el) {
			observer.observe(el);
			cleanup(() => observer.disconnect());
		}
	}, { immediate: true });
	return { lineChartAreaStripeConfig: computed(() => ({ areaStyle: { color: {
		image: getLineChartAreaStripeImgEl(options.value),
		repeat: "repeat-x"
	} } })) };
}
function getOptionsByDOM(el, color) {
	var _el$getBoundingClient;
	return {
		color,
		height: el === null || el === void 0 || (_el$getBoundingClient = el.getBoundingClientRect()) === null || _el$getBoundingClient === void 0 ? void 0 : _el$getBoundingClient.height
	};
}
/**
* 生成条纹 area 背景图
*/
function getLineChartAreaStripeImgEl(options = {}) {
	const { color = "#458FFF", width: stripeWidth = 2, height: imgHeight = 90 } = options;
	const imgEl = document.createElement("img");
	const imgWidth = stripeWidth * 2;
	imgEl.src = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 ${imgWidth} ${imgHeight}">
  <defs>
    <linearGradient id="color" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="${getAlphaColor(color, .3)}" />
      <stop offset="50%" stop-color="${getAlphaColor(color, .2)}" />
      <stop offset="100%" stop-color="${getAlphaColor(color, 0)}" />
    </linearGradient>
  </defs>
  <g>
    <rect x="0" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="url(#color)"/>
    <rect x="${stripeWidth}" y="0" width="${stripeWidth}" height="${imgHeight}" rx="0" fill="transparent"/>
  </g>
</svg>
`.trim());
	return imgEl;
}
/**
* svg 转 dataurl
*/
function encodeSvg(svgStr) {
	return `data:image/svg+xml,${svgStr.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E")}`;
}
// src/components/line/demos/AStripeArea.vue?vue&type=script&setup=true&lang.ts
var AStripeArea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AStripeArea",
	setup(__props, { expose: __expose }) {
		__expose();
		use(install);
		/**
		* 条纹面积图的几个效果对应函数或引用：
		* 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea
		* 2.线条两边透明中间不透明函数：series.lineStyle.color =>  useLineStyleColor
		* 3.区域渐变函数： series.areaStyle.color => useLinearGradient
		*/
		const chartRef = ref();
		const { lineChartAreaStripeConfig } = useLineChartAreaStripe(chartRef);
		const __returned__ = {
			chartRef,
			lineChartAreaStripeConfig,
			lineOption: computed(() => ({
				xAxis: {
					boundaryGap: false,
					data: [
						"星期一",
						"星期二",
						"星期三",
						"星期四",
						"星期五",
						"星期六",
						"星期天"
					]
				},
				yAxis: { name: "次" },
				series: [{
					...lineChartAreaStripeConfig.value,
					showSymbol: false,
					smooth: true,
					lineStyle: {
						shadowColor: getAlphaColor("#458FFF", .9),
						shadowBlur: 8,
						color: useLineStyleColor("#458FFF")
					},
					data: [
						1,
						30,
						35,
						65,
						80,
						70,
						100
					]
				}]
			})),
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
var AStripeArea_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "条纹面积图",
	description: "条纹面积图的配置与使用示例。",
	index: 6
};
// src/components/line/demos/AStripeArea.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock($setup["IxLineChart"], mergeProps({
		ref: "chartRef",
		style: { "height": "300px" }
	}, $setup.lineOption), null, 16);
}
if (typeof AStripeArea_vue_vue_type_archive_meta_index_0_lang_default === "function") AStripeArea_vue_vue_type_archive_meta_index_0_lang_default(AStripeArea_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/demos/AStripeArea.vue__resolved
var __archive_data__ = {
	"id": "archive-item-21",
	"filename": "AStripeArea.vue",
	"relativePath": "components/line/demos/AStripeArea.vue",
	"query": {},
	"title": "条纹面积图",
	"description": "条纹面积图的配置与使用示例。",
	"index": 6,
	"sourceCodes": [{
		"filename": "AStripeArea.vue",
		"code": "<script setup lang=\"ts\">\nimport { IxLineChart, useLineStyleColor, useLineChartAreaStripe, getAlphaColor } from '@idux/charts'\nimport type { LineChartProps } from '@idux/charts'\nimport { computed, ref } from 'vue'\nimport { AriaComponent } from 'echarts/components'\nimport { use } from 'echarts/core'\n\nuse(AriaComponent)\n\n/**\n * 条纹面积图的几个效果对应函数或引用：\n * 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea\n * 2.线条两边透明中间不透明函数：series.lineStyle.color =>  useLineStyleColor\n * 3.区域渐变函数： series.areaStyle.color => useLinearGradient\n */\n\nconst chartRef = ref()\n\nconst { lineChartAreaStripeConfig } = useLineChartAreaStripe(chartRef)\n\nconst lineOption = computed<LineChartProps>(() => ({\n  xAxis: {\n    boundaryGap: false,\n    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],\n  },\n  yAxis: {\n    name: '次',\n  },\n  series: [\n    {\n      ...lineChartAreaStripeConfig.value, // 配置区域图的条纹效果。\n      showSymbol: false,\n      smooth: true,\n      lineStyle: {\n        // 实现连线上的阴影效果 shadowColor + shadowBlur\n        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)\n        shadowBlur: 8,\n        color: useLineStyleColor('#458FFF'), // 配置折线图的两边逐渐透明的效果。\n      },\n      data: [1, 30, 35, 65, 80, 70, 100],\n    },\n  ],\n}))\n<\/script>\n<template>\n  <IxLineChart ref=\"chartRef\" style=\"height: 300px\" v-bind=\"lineOption\" />\n</template>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">IxLineChart</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">useLineStyleColor</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">useLineChartAreaStripe</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">getAlphaColor</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">LineChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">computed</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">AriaComponent</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">echarts/components</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">use</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">echarts/core</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #82AAFF\">use</span><span style=\"color: #A6ACCD\">(AriaComponent)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #676E95\">/**</span></span>\n<span class=\"line\"><span style=\"color: #676E95\"> * 条纹面积图的几个效果对应函数或引用：</span></span>\n<span class=\"line\"><span style=\"color: #676E95\"> * 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea</span></span>\n<span class=\"line\"><span style=\"color: #676E95\"> * 2.线条两边透明中间不透明函数：series.lineStyle.color =&gt;  useLineStyleColor</span></span>\n<span class=\"line\"><span style=\"color: #676E95\"> * 3.区域渐变函数： series.areaStyle.color =&gt; useLinearGradient</span></span>\n<span class=\"line\"><span style=\"color: #676E95\"> */</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> chartRef </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">()</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> lineChartAreaStripeConfig </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">useLineChartAreaStripe</span><span style=\"color: #A6ACCD\">(chartRef)</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> lineOption </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">LineChartProps</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">xAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">boundaryGap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期一</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期二</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期三</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期四</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期五</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期六</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">星期天</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">yAxis</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">次</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">series</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">...</span><span style=\"color: #A6ACCD\">lineChartAreaStripeConfig</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #676E95\">// 配置区域图的条纹效果。</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">showSymbol</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">false</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">smooth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">true</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">lineStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        </span><span style=\"color: #676E95\">// 实现连线上的阴影效果 shadowColor + shadowBlur</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">shadowColor</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">getAlphaColor</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#458FFF</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0.9</span><span style=\"color: #A6ACCD\">)</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #676E95\">// 等同 rgba(69, 143, 255, 0.9)</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">shadowBlur</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">useLineStyleColor</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">#458FFF</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #676E95\">// 配置折线图的两边逐渐透明的效果。</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">30</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">35</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">65</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">80</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">70</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  ]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxLineChart</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">ref</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">chartRef</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">height: 300px</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">lineOption</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(AStripeArea_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render], ["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/line/demos/AStripeArea.vue"]]), setup)
};
export { __archive_data__ as default };
