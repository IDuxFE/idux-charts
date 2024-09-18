import { r as ref, f as computed, u as unref, g as watch, d as defineComponent, c as createBlock, m as mergeProps, o as openBlock, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-ea9817b5.js";
import { d as clone, m as merge, e as createHashMap, i as isFunction, g as getDecalFromPalette, f as extend, h as defaults, j as isString, k as each, l as makeInner, n as getAlphaColor, o as use, p as IxLineChart, s as setup } from "./setup-1f0c886d.js";
import { u as useLineStyleColor } from "./useLineStyleColor-77645e3e.js";
var DEFAULT_OPTION = {
  label: {
    enabled: true
  },
  decal: {
    show: false
  }
};
var inner = makeInner();
var decalPaletteScope = {};
function ariaVisual(ecModel, api) {
  var ariaModel = ecModel.getModel("aria");
  if (!ariaModel.get("enabled")) {
    return;
  }
  var defaultOption = clone(DEFAULT_OPTION);
  merge(defaultOption.label, ecModel.getLocaleModel().get("aria"), false);
  merge(ariaModel.option, defaultOption, false);
  setDecal();
  setLabel();
  function setDecal() {
    var decalModel = ariaModel.getModel("decal");
    var useDecal = decalModel.get("show");
    if (useDecal) {
      var paletteScopeGroupByType_1 = createHashMap();
      ecModel.eachSeries(function(seriesModel) {
        if (seriesModel.isColorBySeries()) {
          return;
        }
        var decalScope = paletteScopeGroupByType_1.get(seriesModel.type);
        if (!decalScope) {
          decalScope = {};
          paletteScopeGroupByType_1.set(seriesModel.type, decalScope);
        }
        inner(seriesModel).scope = decalScope;
      });
      ecModel.eachRawSeries(function(seriesModel) {
        if (ecModel.isSeriesFiltered(seriesModel)) {
          return;
        }
        if (isFunction(seriesModel.enableAriaDecal)) {
          seriesModel.enableAriaDecal();
          return;
        }
        var data = seriesModel.getData();
        if (!seriesModel.isColorBySeries()) {
          var dataAll_1 = seriesModel.getRawData();
          var idxMap_1 = {};
          var decalScope_1 = inner(seriesModel).scope;
          data.each(function(idx) {
            var rawIdx = data.getRawIndex(idx);
            idxMap_1[rawIdx] = idx;
          });
          var dataCount_1 = dataAll_1.count();
          dataAll_1.each(function(rawIdx) {
            var idx = idxMap_1[rawIdx];
            var name = dataAll_1.getName(rawIdx) || rawIdx + "";
            var paletteDecal2 = getDecalFromPalette(seriesModel.ecModel, name, decalScope_1, dataCount_1);
            var specifiedDecal2 = data.getItemVisual(idx, "decal");
            data.setItemVisual(idx, "decal", mergeDecal(specifiedDecal2, paletteDecal2));
          });
        } else {
          var paletteDecal = getDecalFromPalette(seriesModel.ecModel, seriesModel.name, decalPaletteScope, ecModel.getSeriesCount());
          var specifiedDecal = data.getVisual("decal");
          data.setVisual("decal", mergeDecal(specifiedDecal, paletteDecal));
        }
        function mergeDecal(specifiedDecal2, paletteDecal2) {
          var resultDecal = specifiedDecal2 ? extend(extend({}, paletteDecal2), specifiedDecal2) : paletteDecal2;
          resultDecal.dirty = true;
          return resultDecal;
        }
      });
    }
  }
  function setLabel() {
    var labelLocale = ecModel.getLocaleModel().get("aria");
    var labelModel = ariaModel.getModel("label");
    labelModel.option = defaults(labelModel.option, labelLocale);
    if (!labelModel.get("enabled")) {
      return;
    }
    var dom = api.getZr().dom;
    if (labelModel.get("description")) {
      dom.setAttribute("aria-label", labelModel.get("description"));
      return;
    }
    var seriesCnt = ecModel.getSeriesCount();
    var maxDataCnt = labelModel.get(["data", "maxCount"]) || 10;
    var maxSeriesCnt = labelModel.get(["series", "maxCount"]) || 10;
    var displaySeriesCnt = Math.min(seriesCnt, maxSeriesCnt);
    var ariaLabel;
    if (seriesCnt < 1) {
      return;
    } else {
      var title2 = getTitle();
      if (title2) {
        var withTitle = labelModel.get(["general", "withTitle"]);
        ariaLabel = replace(withTitle, {
          title: title2
        });
      } else {
        ariaLabel = labelModel.get(["general", "withoutTitle"]);
      }
      var seriesLabels_1 = [];
      var prefix = seriesCnt > 1 ? labelModel.get(["series", "multiple", "prefix"]) : labelModel.get(["series", "single", "prefix"]);
      ariaLabel += replace(prefix, {
        seriesCount: seriesCnt
      });
      ecModel.eachSeries(function(seriesModel, idx) {
        if (idx < displaySeriesCnt) {
          var seriesLabel = void 0;
          var seriesName = seriesModel.get("name");
          var withName = seriesName ? "withName" : "withoutName";
          seriesLabel = seriesCnt > 1 ? labelModel.get(["series", "multiple", withName]) : labelModel.get(["series", "single", withName]);
          seriesLabel = replace(seriesLabel, {
            seriesId: seriesModel.seriesIndex,
            seriesName: seriesModel.get("name"),
            seriesType: getSeriesTypeName(seriesModel.subType)
          });
          var data = seriesModel.getData();
          if (data.count() > maxDataCnt) {
            var partialLabel = labelModel.get(["data", "partialData"]);
            seriesLabel += replace(partialLabel, {
              displayCnt: maxDataCnt
            });
          } else {
            seriesLabel += labelModel.get(["data", "allData"]);
          }
          var middleSeparator_1 = labelModel.get(["data", "separator", "middle"]);
          var endSeparator_1 = labelModel.get(["data", "separator", "end"]);
          var dataLabels = [];
          for (var i = 0; i < data.count(); i++) {
            if (i < maxDataCnt) {
              var name_1 = data.getName(i);
              var value = data.getValues(i);
              var dataLabel = labelModel.get(["data", name_1 ? "withName" : "withoutName"]);
              dataLabels.push(replace(dataLabel, {
                name: name_1,
                value: value.join(middleSeparator_1)
              }));
            }
          }
          seriesLabel += dataLabels.join(middleSeparator_1) + endSeparator_1;
          seriesLabels_1.push(seriesLabel);
        }
      });
      var separatorModel = labelModel.getModel(["series", "multiple", "separator"]);
      var middleSeparator = separatorModel.get("middle");
      var endSeparator = separatorModel.get("end");
      ariaLabel += seriesLabels_1.join(middleSeparator) + endSeparator;
      dom.setAttribute("aria-label", ariaLabel);
    }
  }
  function replace(str, keyValues) {
    if (!isString(str)) {
      return str;
    }
    var result = str;
    each(keyValues, function(value, key) {
      result = result.replace(new RegExp("\\{\\s*" + key + "\\s*\\}", "g"), value);
    });
    return result;
  }
  function getTitle() {
    var title2 = ecModel.get("title");
    if (title2 && title2.length) {
      title2 = title2[0];
    }
    return title2 && title2.text;
  }
  function getSeriesTypeName(type) {
    return ecModel.getLocaleModel().get(["series", "typeNames"])[type] || "自定义图";
  }
}
function ariaPreprocessor(option) {
  if (!option || !option.aria) {
    return;
  }
  var aria = option.aria;
  if (aria.show != null) {
    aria.enabled = aria.show;
  }
  aria.label = aria.label || {};
  each(["description", "general", "series", "data"], function(name) {
    if (aria[name] != null) {
      aria.label[name] = aria[name];
    }
  });
}
function install(registers) {
  registers.registerPreprocessor(ariaPreprocessor);
  registers.registerVisual(registers.PRIORITY.VISUAL.ARIA, ariaVisual);
}
function useLineChartAreaStripe(el, color) {
  const options = ref({});
  const disposes = [];
  const elRef = computed(() => {
    const elIns = unref(el);
    if (elIns instanceof HTMLElement) {
      return elIns;
    }
    if (elIns && "$el" in elIns && elIns.$el instanceof HTMLElement) {
      return elIns.$el;
    }
    return elIns;
  });
  const observer = new ResizeObserver(() => {
    options.value = getOptionsByDOM(unref(elRef), unref(color));
  });
  watch(elRef, () => {
    disposes.forEach((cb) => cb());
    const el2 = unref(elRef);
    options.value = getOptionsByDOM(el2, unref(color));
    if (el2) {
      observer.observe(el2);
      disposes.push(observer.disconnect);
    }
  });
  const lineChartAreaStripeConfig = computed(() => ({
    areaStyle: {
      color: {
        image: getLineChartAreaStripeImgEl(options.value),
        repeat: "repeat-x"
      }
    }
  }));
  return {
    lineChartAreaStripeConfig
  };
}
function getOptionsByDOM(el, color) {
  var _a;
  return {
    color,
    height: (_a = el == null ? void 0 : el.getBoundingClientRect()) == null ? void 0 : _a.height
  };
}
function getLineChartAreaStripeImgEl(options = {}) {
  const {
    color = "#458FFF",
    width: stripeWidth = 2,
    height: imgHeight = 90
  } = options;
  const imgEl = document.createElement("img");
  const imgWidth = stripeWidth * 2;
  imgEl.src = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="${imgWidth}" height="${imgHeight}" viewBox="0 0 ${imgWidth} ${imgHeight}">
  <defs>
    <linearGradient id="color" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="${getAlphaColor(color, 0.3)}" />
      <stop offset="50%" stop-color="${getAlphaColor(color, 0.2)}" />
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
function encodeSvg(svgStr) {
  const encodedSvg = svgStr.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E");
  return `data:image/svg+xml,${encodedSvg}`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AStripeArea",
  setup(__props) {
    use(install);
    const chartRef = ref();
    const { lineChartAreaStripeConfig } = useLineChartAreaStripe(chartRef);
    const lineOption = computed(() => ({
      xAxis: {
        boundaryGap: false,
        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
      },
      yAxis: {
        name: "次"
      },
      series: [
        {
          ...lineChartAreaStripeConfig.value,
          // 配置区域图的条纹效果。
          showSymbol: false,
          smooth: true,
          lineStyle: {
            // 实现连线上的阴影效果 shadowColor + shadowBlur
            shadowColor: getAlphaColor("#458FFF", 0.9),
            // 等同 rgba(69, 143, 255, 0.9)
            shadowBlur: 8,
            color: useLineStyleColor("#458FFF")
            // 配置折线图的两边逐渐透明的效果。
          },
          data: [1, 30, 35, 65, 80, 70, 100]
        }
      ]
    }));
    return (_ctx, _cache) => {
      const _component_IxLineChart = IxLineChart;
      return openBlock(), createBlock(
        _component_IxLineChart,
        mergeProps({
          ref_key: "chartRef",
          ref: chartRef,
          style: { "height": "300px" }
        }, lineOption.value),
        null,
        16
        /* FULL_PROPS */
      );
    };
  }
});
const title = "条纹面积图";
const description = "";
const index = 6;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/work/codes/idux-charts/packages/site/src/components/line/demos/AStripeArea.vue"]]);
const __archive_data__ = {
  "id": "archive-item-15",
  "filename": "AStripeArea.vue",
  "relativePath": "components/line/demos/AStripeArea.vue",
  "query": {},
  "title": "条纹面积图",
  "description": "",
  "index": 6,
  "sourceCodes": [{ "filename": "AStripeArea.vue", "code": `<script setup lang="ts">\r
import { computed, ref } from 'vue';\r
\r
import { AriaComponent } from 'echarts/components'\r
import { use } from 'echarts/core'\r
\r
import {\r
  type LineChartProps,\r
  useLineStyleColor,\r
  useLineChartAreaStripe,\r
  getAlphaColor,\r
} from '@idux/charts'\r
\r
use(AriaComponent)\r
\r
/**\r
 * 条纹面积图的几个效果对应函数或引用：\r
 * 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea\r
 * 2.线条两边透明中间不透明函数：series.lineStyle.color =>  useLineStyleColor\r
 * 3.区域渐变函数： series.areaStyle.color => useLinearGradient\r
*/\r
\r
const chartRef = ref()\r
\r
const { lineChartAreaStripeConfig } = useLineChartAreaStripe(chartRef)\r
\r
const lineOption = computed<LineChartProps>(() => ({\r
  xAxis: {\r
    boundaryGap: false,\r
    data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],\r
  },\r
  yAxis: {\r
    name: '次',\r
  },\r
  series: [\r
    {\r
      ...lineChartAreaStripeConfig.value, // 配置区域图的条纹效果。\r
      showSymbol: false,\r
      smooth: true,\r
      lineStyle: { // 实现连线上的阴影效果 shadowColor + shadowBlur\r
        shadowColor: getAlphaColor('#458FFF', 0.9), // 等同 rgba(69, 143, 255, 0.9)\r
        shadowBlur: 8,\r
        color: useLineStyleColor('#458FFF'), // 配置折线图的两边逐渐透明的效果。\r
      },\r
      data: [1, 30, 35, 65, 80, 70, 100]\r
    },\r
  ]\r
}))\r
<\/script>\r
<template>\r
  <IxLineChart ref="chartRef" style="height: 300px" v-bind="lineOption" />\r
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">computed</span><span style="color: #89DDFF">,</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ref</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">vue</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">AriaComponent</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">echarts/components</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">use</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">echarts/core</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">LineChartProps</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">useLineStyleColor</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">useLineChartAreaStripe</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #F07178">  </span><span style="color: #A6ACCD">getAlphaColor</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #82AAFF">use</span><span style="color: #A6ACCD">(AriaComponent)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #676E95">/**</span></span>\n<span class="line"><span style="color: #676E95"> * 条纹面积图的几个效果对应函数或引用：</span></span>\n<span class="line"><span style="color: #676E95"> * 1.条纹效果：按需引入无障碍插件来实现条纹效果：use(AriaComponent) + 内置配置：useStripeArea</span></span>\n<span class="line"><span style="color: #676E95"> * 2.线条两边透明中间不透明函数：series.lineStyle.color =&gt;  useLineStyleColor</span></span>\n<span class="line"><span style="color: #676E95"> * 3.区域渐变函数： series.areaStyle.color =&gt; useLinearGradient</span></span>\n<span class="line"><span style="color: #676E95">*/</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> chartRef </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ref</span><span style="color: #A6ACCD">()</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> lineChartAreaStripeConfig </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useLineChartAreaStripe</span><span style="color: #A6ACCD">(chartRef)</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> lineOption </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">computed</span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">LineChartProps</span><span style="color: #89DDFF">&gt;</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">()</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">=&gt;</span><span style="color: #A6ACCD"> (</span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">boundaryGap</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期六</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期天</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">series</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">...</span><span style="color: #A6ACCD">lineChartAreaStripeConfig</span><span style="color: #89DDFF">.</span><span style="color: #A6ACCD">value</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 配置区域图的条纹效果。</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">showSymbol</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">false</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">smooth</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FF9CAC">true</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">lineStyle</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 实现连线上的阴影效果 shadowColor + shadowBlur</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowColor</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">getAlphaColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#458FFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">0.9</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 等同 rgba(69, 143, 255, 0.9)</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">shadowBlur</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">8</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">        </span><span style="color: #F07178">color</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">useLineStyleColor</span><span style="color: #A6ACCD">(</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">#458FFF</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">)</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #676E95">// 配置折线图的两边逐渐透明的效果。</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">      </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">1</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">30</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">35</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">65</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">80</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">70</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">100</span><span style="color: #A6ACCD">]</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  ]</span></span>\n<span class="line"><span style="color: #89DDFF">}</span><span style="color: #A6ACCD">))</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxLineChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">ref</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">chartRef</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">lineOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
