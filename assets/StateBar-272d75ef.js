import { d as defineComponent, r as ref, c as createBlock, w as withCtx, o as openBlock, a as createVNode, m as mergeProps, _ as _export_sfc, U as Ui } from "./_plugin-vue_export-helper-918196f7.js";
import { I as IxSpace, a as IxSwitch } from "./index-d6efe3d1.js";
import { I as IxBarChart, s as setup } from "./setup-c0401084.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StateBar",
  setup(__props) {
    const data = [123, 324, 156, 244, 188];
    const barOption = {
      title: { text: "柱状图标题" },
      xAxis: {
        data: ["星期一", "星期二", "星期三", "星期四", "星期五"]
      },
      yAxis: {
        name: "次"
      }
    };
    const loading = ref(true);
    return (_ctx, _cache) => {
      const _component_IxSwitch = IxSwitch;
      const _component_IxBarChart = IxBarChart;
      const _component_IxSpace = IxSpace;
      return openBlock(), createBlock(_component_IxSpace, {
        block: "",
        vertical: "",
        size: 24
      }, {
        default: withCtx(() => [
          createVNode(_component_IxSwitch, {
            checked: loading.value,
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => loading.value = $event)
          }, null, 8, ["checked"]),
          createVNode(_component_IxBarChart, mergeProps({
            style: { "height": "300px" },
            data,
            loading: loading.value
          }, barOption), null, 16, ["loading"])
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
});
const title = "加载中状态";
const description = "";
const index = 12;
const block0 = {
  title,
  description,
  index
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/sallerli1/codes/idux-charts/packages/site/src/components/bar/demos/StateBar.vue"]]);
const __archive_data__ = {
  "id": "archive-item-6",
  "filename": "StateBar.vue",
  "relativePath": "components/bar/demos/StateBar.vue",
  "query": {},
  "title": "加载中状态",
  "description": "",
  "index": 12,
  "sourceCodes": [{ "filename": "StateBar.vue", "code": `<script setup lang="ts">
import { ref } from 'vue'

import { type BarChartProps } from '@idux/charts'

const data = [123, 324, 156, 244, 188]

const barOption: BarChartProps = {
  title: { text: '柱状图标题' },
  xAxis: {
    data: ['星期一', '星期二', '星期三', '星期四', '星期五'],
  },
  yAxis: {
    name: '次',
  },
}

const loading = ref(true)
<\/script>
<template>
  <IxSpace block vertical :size="24">
    <IxSwitch v-model:checked="loading"></IxSwitch>
    <IxBarChart style="height: 300px" :data="data" :loading="loading" v-bind="barOption" />
  </IxSpace>
</template>`, "parsedCode": '<div class="language-vue">\n      <button title="Copy Code" class="copy"></button>\n      <span class="lang">vue</span>\n      <pre v-pre class="shiki" ><code><span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">script</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">setup</span><span style="color: #A6ACCD"> </span><span style="color: #C792EA">lang</span><span style="color: #A6ACCD">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">ts</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">ref</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">vue</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #89DDFF">import</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #F07178"> </span><span style="color: #89DDFF">type</span><span style="color: #F07178"> </span><span style="color: #A6ACCD">BarChartProps</span><span style="color: #F07178"> </span><span style="color: #89DDFF">}</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">from</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">@idux/charts</span><span style="color: #89DDFF">&#39;</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> data </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> [</span><span style="color: #F78C6C">123</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">324</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">156</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">244</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #F78C6C">188</span><span style="color: #A6ACCD">]</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> barOption</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #FFCB6B">BarChartProps</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">title</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span><span style="color: #A6ACCD"> </span><span style="color: #F07178">text</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">柱状图标题</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">xAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">data</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> [</span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期一</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期二</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期三</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期四</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">星期五</span><span style="color: #89DDFF">&#39;</span><span style="color: #A6ACCD">]</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #F07178">yAxis</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">{</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #F07178">name</span><span style="color: #89DDFF">:</span><span style="color: #A6ACCD"> </span><span style="color: #89DDFF">&#39;</span><span style="color: #C3E88D">次</span><span style="color: #89DDFF">&#39;</span><span style="color: #89DDFF">,</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">},</span></span>\n<span class="line"><span style="color: #89DDFF">}</span></span>\n<span class="line"></span>\n<span class="line"><span style="color: #C792EA">const</span><span style="color: #A6ACCD"> loading </span><span style="color: #89DDFF">=</span><span style="color: #A6ACCD"> </span><span style="color: #82AAFF">ref</span><span style="color: #A6ACCD">(</span><span style="color: #FF9CAC">true</span><span style="color: #A6ACCD">)</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">script</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxSpace</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">block</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">vertical</span><span style="color: #89DDFF"> :</span><span style="color: #C792EA">size</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #F78C6C">24</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxSwitch</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-model</span><span style="color: #89DDFF">:</span><span style="color: #C792EA">checked</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">loading</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF">&gt;&lt;/</span><span style="color: #FFCB6B">IxSwitch</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">    </span><span style="color: #89DDFF">&lt;</span><span style="color: #FFCB6B">IxBarChart</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">style</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #C3E88D">height: 300px</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> :</span><span style="color: #C792EA">data</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">data</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> :</span><span style="color: #C792EA">loading</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">loading</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> </span><span style="color: #C792EA">v-bind</span><span style="color: #89DDFF">=</span><span style="color: #89DDFF">&quot;</span><span style="color: #A6ACCD">barOption</span><span style="color: #89DDFF">&quot;</span><span style="color: #89DDFF"> /&gt;</span></span>\n<span class="line"><span style="color: #A6ACCD">  </span><span style="color: #89DDFF">&lt;/</span><span style="color: #FFCB6B">IxSpace</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"><span style="color: #89DDFF">&lt;/</span><span style="color: #F07178">template</span><span style="color: #89DDFF">&gt;</span></span>\n<span class="line"></span></code></pre>\n\n    </div>' }],
  instance: Ui("archive-vue-loader-1", Component, setup)
};
export {
  __archive_data__ as default
};
