const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link2 = links[i2];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e2 = new Event("vite:preloadError", { cancelable: true });
    e2.payload = err;
    window.dispatchEvent(e2);
    if (!e2.defaultPrevented) {
      throw err;
    }
  });
};
const mountOptions = {
  el: "#app",
  baseUrl: "/",
  theme: { "themeStyle": "default", "logo": { "image": "/favicon.ico", "title": "iDux Charts" }, "layout": { "type": "sider", "siderCollapsable": false }, "page": { "anchorMaxLevel": 6 } },
  navRecords: [{ "type": "sub", "id": "0-guide", "name": "指南", "path": "/0-guide/GettingStarted.page.md", children: [{ "id": "GettingStarted.page.md", "name": "快速上手", "type": "item", "path": "/0-guide/GettingStarted.page.md", "pageData": { "title": "", "description": "", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/0-guide/GettingStarted.page.md")' } }, { "id": "Introdoction.page.md", "name": "简介", "type": "item", "path": "/0-guide/Introdoction.page.md", "pageData": { "title": "", "description": "", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/0-guide/Introdoction.page.md")' } }] }, { "type": "sub", "id": "components", "name": "组件", "path": "/components/bar", children: [{ "id": "bar", "name": "柱状图", "type": "item", "path": "/components/bar", pageData: { "title": "柱状图", "description": "使用垂直或水平的柱子显示类别之间的数值比较。其中一个轴表示需要对比的分类维度，另一个轴代表相应的数值。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/BasicBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/BasicStripeBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/CategoryBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/CustomTooltipsBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/MultipleBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StackBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StateBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StripeBarMultiple.vue")'], demoImports: [() => __vitePreload(() => import("./BasicBar-2c0f9cab.js"), true ? ["assets/BasicBar-2c0f9cab.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./BasicStripeBar-49f5d91e.js"), true ? ["assets/BasicStripeBar-49f5d91e.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useStripe-06760ff5.js"] : void 0), () => __vitePreload(() => import("./CategoryBar-3f3d6413.js"), true ? ["assets/CategoryBar-3f3d6413.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipsBar-cb2d974c.js"), true ? ["assets/CustomTooltipsBar-cb2d974c.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./MultipleBar-0d9f22e0.js"), true ? ["assets/MultipleBar-0d9f22e0.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StackBar-85314619.js"), true ? ["assets/StackBar-85314619.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StateBar-cf2e2e62.js"), true ? ["assets/StateBar-cf2e2e62.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StripeBarMultiple-0cc488d5.js"), true ? ["assets/StripeBarMultiple-0cc488d5.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useStripe-06760ff5.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/bar/API.md")', import: () => __vitePreload(() => import("./API-4a82951b.js"), true ? ["assets/API-4a82951b.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/bar/Design.md")', import: () => __vitePreload(() => import("./Design-67852aa0.js"), true ? ["assets/Design-67852aa0.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { "id": "core", "name": "基础组件", "type": "item", "path": "/components/core", pageData: { "title": "基础组件", "description": "此组件是基于所有图表组件的基础组件，提供了一系列公共配置。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CorePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreUseChart.vue")'], demoImports: [() => __vitePreload(() => import("./CoreBar-0d68afb9.js"), true ? ["assets/CoreBar-0d68afb9.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CoreLine-1f4fb4a2.js"), true ? ["assets/CoreLine-1f4fb4a2.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CorePie-253e5dbd.js"), true ? ["assets/CorePie-253e5dbd.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CoreUseChart-496e9013.js"), true ? ["assets/CoreUseChart-496e9013.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.tab.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/core/API.tab.md")', import: () => __vitePreload(() => import("./API.tab-ba886ce5.js"), true ? ["assets/API.tab-ba886ce5.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { "id": "line", "name": "折线图", "type": "item", "path": "/components/line", pageData: { "title": "折线图", "description": "折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/AStripeArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/BasicArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/BasicLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/CustomTooltipsLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/MultipleLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/NoAxis.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/SmoothAreaLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/SmoothLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/StackArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/StateLine.vue")'], demoImports: [() => __vitePreload(() => import("./AStripeArea-1a6630e0.js"), true ? ["assets/AStripeArea-1a6630e0.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./BasicArea-eed3921b.js"), true ? ["assets/BasicArea-eed3921b.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js"] : void 0), () => __vitePreload(() => import("./BasicLine-bb558112.js"), true ? ["assets/BasicLine-bb558112.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipsLine-b648b9ed.js"), true ? ["assets/CustomTooltipsLine-b648b9ed.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./MultipleLine-e62ce2b6.js"), true ? ["assets/MultipleLine-e62ce2b6.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./NoAxis-b70fdf22.js"), true ? ["assets/NoAxis-b70fdf22.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./SmoothAreaLine-0be7b431.js"), true ? ["assets/SmoothAreaLine-0be7b431.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js"] : void 0), () => __vitePreload(() => import("./SmoothLine-0fe32f35.js"), true ? ["assets/SmoothLine-0fe32f35.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StackArea-7d0f8e13.js"), true ? ["assets/StackArea-7d0f8e13.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StateLine-9b455909.js"), true ? ["assets/StateLine-9b455909.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/line/API.md")', import: () => __vitePreload(() => import("./API-b66735d5.js"), true ? ["assets/API-b66735d5.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/line/Design.md")', import: () => __vitePreload(() => import("./Design-c146f8f6.js"), true ? ["assets/Design-c146f8f6.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { "id": "pie", "name": "饼图", "type": "item", "path": "/components/pie", pageData: { "title": "饼图", "description": "用于表示不同分类的占比情况，通过弧度大小来对比各个分类，每个区块表示占总体比例大小，所有区块和等于100%。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/BasicPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/CustomTooltipPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RingPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RiskPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RosePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/SimplePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/StatePie.vue")'], demoImports: [() => __vitePreload(() => import("./BasicPie-fd357bf3.js"), true ? ["assets/BasicPie-fd357bf3.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipPie-1576b212.js"), true ? ["assets/CustomTooltipPie-1576b212.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RingPie-d3e4c7c4.js"), true ? ["assets/RingPie-d3e4c7c4.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RiskPie-6731e4aa.js"), true ? ["assets/RiskPie-6731e4aa.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RosePie-25db3b97.js"), true ? ["assets/RosePie-25db3b97.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./SimplePie-b99e65a8.js"), true ? ["assets/SimplePie-b99e65a8.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StatePie-1dd28ecb.js"), true ? ["assets/StatePie-1dd28ecb.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/pie/API.md")', import: () => __vitePreload(() => import("./API-b2960f4f.js"), true ? ["assets/API-b2960f4f.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/pie/Design.md")', import: () => __vitePreload(() => import("./Design-4c1eb40b.js"), true ? ["assets/Design-4c1eb40b.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }] }],
  routeRecords: [{ path: "/0-guide/GettingStarted.page.md", pageData: { "title": "", "description": "", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/0-guide/GettingStarted.page.md")', import: () => __vitePreload(() => import("./GettingStarted.page-62647f5a.js"), true ? ["assets/GettingStarted.page-62647f5a.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) } }, { path: "/0-guide/Introdoction.page.md", pageData: { "title": "", "description": "", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/0-guide/Introdoction.page.md")', import: () => __vitePreload(() => import("./Introdoction.page-8b4a4899.js"), true ? ["assets/Introdoction.page-8b4a4899.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) } }, { path: "/components/bar", pageData: { "title": "柱状图", "description": "使用垂直或水平的柱子显示类别之间的数值比较。其中一个轴表示需要对比的分类维度，另一个轴代表相应的数值。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/BasicBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/BasicStripeBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/CategoryBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/CustomTooltipsBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/MultipleBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StackBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StateBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/bar/demos/StripeBarMultiple.vue")'], demoImports: [() => __vitePreload(() => import("./BasicBar-2c0f9cab.js"), true ? ["assets/BasicBar-2c0f9cab.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./BasicStripeBar-49f5d91e.js"), true ? ["assets/BasicStripeBar-49f5d91e.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useStripe-06760ff5.js"] : void 0), () => __vitePreload(() => import("./CategoryBar-3f3d6413.js"), true ? ["assets/CategoryBar-3f3d6413.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipsBar-cb2d974c.js"), true ? ["assets/CustomTooltipsBar-cb2d974c.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./MultipleBar-0d9f22e0.js"), true ? ["assets/MultipleBar-0d9f22e0.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StackBar-85314619.js"), true ? ["assets/StackBar-85314619.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StateBar-cf2e2e62.js"), true ? ["assets/StateBar-cf2e2e62.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StripeBarMultiple-0cc488d5.js"), true ? ["assets/StripeBarMultiple-0cc488d5.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useStripe-06760ff5.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/bar/API.md")', import: () => __vitePreload(() => import("./API-4a82951b.js"), true ? ["assets/API-4a82951b.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/bar/Design.md")', import: () => __vitePreload(() => import("./Design-67852aa0.js"), true ? ["assets/Design-67852aa0.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { path: "/components/core", pageData: { "title": "基础组件", "description": "此组件是基于所有图表组件的基础组件，提供了一系列公共配置。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreBar.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CorePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/core/demos/CoreUseChart.vue")'], demoImports: [() => __vitePreload(() => import("./CoreBar-0d68afb9.js"), true ? ["assets/CoreBar-0d68afb9.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CoreLine-1f4fb4a2.js"), true ? ["assets/CoreLine-1f4fb4a2.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CorePie-253e5dbd.js"), true ? ["assets/CorePie-253e5dbd.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CoreUseChart-496e9013.js"), true ? ["assets/CoreUseChart-496e9013.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.tab.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/core/API.tab.md")', import: () => __vitePreload(() => import("./API.tab-ba886ce5.js"), true ? ["assets/API.tab-ba886ce5.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { path: "/components/line", pageData: { "title": "折线图", "description": "折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/AStripeArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/BasicArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/BasicLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/CustomTooltipsLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/MultipleLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/NoAxis.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/SmoothAreaLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/SmoothLine.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/StackArea.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/line/demos/StateLine.vue")'], demoImports: [() => __vitePreload(() => import("./AStripeArea-1a6630e0.js"), true ? ["assets/AStripeArea-1a6630e0.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./BasicArea-eed3921b.js"), true ? ["assets/BasicArea-eed3921b.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js"] : void 0), () => __vitePreload(() => import("./BasicLine-bb558112.js"), true ? ["assets/BasicLine-bb558112.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipsLine-b648b9ed.js"), true ? ["assets/CustomTooltipsLine-b648b9ed.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./MultipleLine-e62ce2b6.js"), true ? ["assets/MultipleLine-e62ce2b6.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./NoAxis-b70fdf22.js"), true ? ["assets/NoAxis-b70fdf22.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js","assets/useLineStyleColor-69b62ce3.js"] : void 0), () => __vitePreload(() => import("./SmoothAreaLine-0be7b431.js"), true ? ["assets/SmoothAreaLine-0be7b431.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js","assets/useLinearGradient-81cc92c0.js"] : void 0), () => __vitePreload(() => import("./SmoothLine-0fe32f35.js"), true ? ["assets/SmoothLine-0fe32f35.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StackArea-7d0f8e13.js"), true ? ["assets/StackArea-7d0f8e13.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StateLine-9b455909.js"), true ? ["assets/StateLine-9b455909.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/line/API.md")', import: () => __vitePreload(() => import("./API-b66735d5.js"), true ? ["assets/API-b66735d5.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/line/Design.md")', import: () => __vitePreload(() => import("./Design-c146f8f6.js"), true ? ["assets/Design-c146f8f6.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }, { path: "/components/pie", pageData: { "title": "饼图", "description": "用于表示不同分类的占比情况，通过弧度大小来对比各个分类，每个区块表示占总体比例大小，所有区块和等于100%。", tabs: [{ "name": "示例", "id": "demos", "demoImportScripts": ['() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/BasicPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/CustomTooltipPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RingPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RiskPie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/RosePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/SimplePie.vue")', '() => import("archive-demo:/home/saller/codes/idux-charts/packages/site/src/components/pie/demos/StatePie.vue")'], demoImports: [() => __vitePreload(() => import("./BasicPie-fd357bf3.js"), true ? ["assets/BasicPie-fd357bf3.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./CustomTooltipPie-1576b212.js"), true ? ["assets/CustomTooltipPie-1576b212.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RingPie-d3e4c7c4.js"), true ? ["assets/RingPie-d3e4c7c4.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RiskPie-6731e4aa.js"), true ? ["assets/RiskPie-6731e4aa.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./RosePie-25db3b97.js"), true ? ["assets/RosePie-25db3b97.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./SimplePie-b99e65a8.js"), true ? ["assets/SimplePie-b99e65a8.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/setup-9638164e.js"] : void 0), () => __vitePreload(() => import("./StatePie-1dd28ecb.js"), true ? ["assets/StatePie-1dd28ecb.js","assets/_plugin-vue_export-helper-6ab5f9be.js","assets/index-7d3b3cf1.js","assets/setup-9638164e.js"] : void 0)] }, { "name": "API", "id": "API.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/pie/API.md")', import: () => __vitePreload(() => import("./API-b2960f4f.js"), true ? ["assets/API-b2960f4f.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }, { "name": "指南", "id": "Design.md", "importScript": '() => import("archive-page:/home/saller/codes/idux-charts/packages/site/src/components/pie/Design.md")', import: () => __vitePreload(() => import("./Design-4c1eb40b.js"), true ? ["assets/Design-4c1eb40b.js","assets/_plugin-vue_export-helper-6ab5f9be.js"] : void 0) }] } }]
};
function makeMap(str, expectsLowerCase) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map2[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map2[val.toLowerCase()] : (val) => !!map2[val];
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function normalizeStyle(value) {
  if (isArray$2(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$2(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$d = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$d.call(val, key);
const isArray$2 = Array.isArray;
const isMap$2 = (val) => toTypeString$1(val) === "[object Map]";
const isSet$2 = (val) => toTypeString$1(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol$1 = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$2 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$2.call(value);
const toRawType$1 = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString$1(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize$1 = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize$1(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber$1 = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function warn$1$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$1$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$2(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap$2(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap$2(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$2(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.onTrigger) {
      effect2.onTrigger(extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$1)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$2(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol$1(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow$1(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$2(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$2(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol$1(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$2(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap$2(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap$2(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize$1(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType$1(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType$1(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow$1(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get2, set: set2 } = factory(() => trackRefValue(this), () => triggerRefValue(this));
    this._get = get2;
    this._set = set2;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$2(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info2 = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$2(`Unhandled error${info2 ? ` during execution of ${info2}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$2(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen2, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen2, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff = getId(a2) - getId(b2);
  if (diff === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen2, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen2);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function checkRecursiveUpdates(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$2(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
      if (instance.parent.type.__asyncLoader && instance.parent.ceReload) {
        instance.parent.ceReload(newComp.styles);
      }
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app2, version2) {
  emit("app:init", app2, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app2) {
  emit("app:unmount", app2);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$2(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber$1);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$2(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render: render2, renderCache, data, setupState, ctx, inheritAttrs } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(render2.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render3 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render3.length > 1 ? render3(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      } : { attrs, slots, emit: emit2 }) : render3(
        props,
        null
        /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }
  let root2 = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root2, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root2;
    if (keys2.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys2.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root2 = cloneVNode(root2, fallthroughAttrs);
      } else if (!accessedAttrs && root2.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
          const key = allAttrs[i2];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$2(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$2(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root2)) {
      warn$2(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root2 = cloneVNode(root2);
    root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root2)) {
      warn$2(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root2.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root2);
  } else {
    result = root2;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i2 = 0; i2 < children.length; i2++) {
    const child = children[i2];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$2(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$2(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$2(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$2(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect2, options) {
  return doWatch(effect2, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$1(cb)) {
    warn$2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$2(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$2(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow$1(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction$1(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    return NOOP;
  }
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, scheduler);
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
  } else {
    effect2.run();
  }
  return () => {
    effect2.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect2);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$2(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen2);
    }
  } else if (isSet$2(value) || isMap$2(value)) {
    value.forEach((v2) => {
      traverse(v2, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c2 of children) {
          if (c2.type !== Comment) {
            if (hasFound) {
              warn$2("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c2;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$2(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            instance.update();
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$2(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children.length; i2++) {
    let child = children[i2];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn$2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$2("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    warn$2(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i2 = 0; i2 < directives.length; i2++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
    if (isFunction$1(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }
    if (dir.deep) {
      traverse(value);
    }
    bindings.push({
      dir,
      instance,
      value,
      oldValue: void 0,
      arg,
      modifiers
    });
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const NULL_DYNAMIC_COMPONENT = Symbol();
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    $el: (i2) => i2.vnode.el,
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
    $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$1(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$2(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$2(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$2(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$2(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$2(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$2(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render2,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$2(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn$2(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn$2(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$2(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$2(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(
      created,
      instance,
      "c"
      /* LifecycleHooks.CREATED */
    );
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$2(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$2(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render2 && instance.render === NOOP) {
    instance.render = render2;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$2(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn$2(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn$2(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$2(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$2(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions$1(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$2(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$2(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString$1(raw[i2])) {
        warn$2(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$2(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$2(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$2(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$2('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$2(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$2(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$2('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$2(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize$1).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType$1(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance) {
      warn$2(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction$1(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$2(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$2(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render2, hydrate2) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$2(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$2(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$2(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction$1(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction$1(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else {
          warn$2(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app2;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$2(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$2(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$2(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          {
            context.reload = () => {
              render2(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate2) {
            hydrate2(vnode, rootContainer);
          } else {
            render2(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          {
            app2._instance = vnode.component;
            devtoolsInitApp(app2, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$2(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render2(null, app2._container);
          {
            app2._instance = null;
            devtoolsUnmountApp(app2);
          }
          delete app2._container.__vue_app__;
        } else {
          warn$2(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$2(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app2;
      }
    };
    return app2;
  };
}
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$2(rawRef)) {
    rawRef.forEach((r2, i2) => setRef(r2, oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i2] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$2(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString$1(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction$1(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString$1(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$2(existing) && remove(existing, refValue);
          } else {
            if (!isArray$2(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else {
      warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let supported$1;
let perf$1;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
        } else {
          warn$2("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect2.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns(instance.rtc, e2) : void 0;
      effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns(instance.rtg, e2) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(c1[i2], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(null, c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$2(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i2 !== increasingNewIndexSequence[j]) {
            move(
              nextChild,
              container,
              anchor,
              2
              /* MoveType.REORDER */
            );
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) {
        move(children[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove3 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove3();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove3, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render2 = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate2;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate2, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render: render2,
    hydrate: hydrate2,
    createApp: createAppAPI(render2, hydrate2)
  };
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$2(ch1) && isArray$2(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j, u2, v2, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i2] = j;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i2] = result[u2 - 1];
        }
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString$1(targetSelector)) {
    if (!select) {
      warn$2(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
        warn$2(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
      }
      return target;
    }
  } else {
    if (!targetSelector && !isTeleportDisabled(props)) {
      warn$2(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el = createComment("teleport start");
      const mainAnchor = n2.anchor = createComment("teleport end");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      } else if (!disabled) {
        warn$2("Invalid Teleport target on mount:", target, `(${typeof target})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(children, container2, anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG, slotScopeIds);
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, false);
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
            /* TeleportMoveTypes.TOGGLE */
          );
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
              /* TeleportMoveTypes.TARGET_CHANGE */
            );
          } else {
            warn$2("Invalid Teleport target on update:", target, `(${typeof target})`);
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
            /* TeleportMoveTypes.TOGGLE */
          );
        }
      }
    }
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i2 = 0; i2 < children.length; i2++) {
          const child = children[i2];
          unmount(child, parentComponent, parentSuspense, true, !!child.dynamicChildren);
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i2 = 0; i2 < children.length; i2++) {
        move(
          children[i2],
          container,
          parentAnchor,
          2
          /* MoveType.REORDER */
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
  const target = vnode.target = resolveTarget(vnode.props, querySelector);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, slotScopeIds, optimized);
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
      }
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
let currentBlock = null;
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...args);
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
  return ref2 != null ? isString$1(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$2(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$2(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$2(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$2(`Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$2(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$2(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$2(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$2(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$1(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$2("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(
            e2,
            instance,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) !== null && _a2 !== void 0 ? _a2 : "Anonymous";
          warn$2(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$2(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile$1;
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile$1 && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile$1(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$2(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn$2(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      markAttrsAccessed();
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$2(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$2(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$2(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction$1(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match2 = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction$1(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$2(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject$1(propsOrChildren) && !isArray$2(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!isObject$1(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v2, asRaw = true) {
    if (typeof v2 === "number") {
      return ["span", numberStyle, v2];
    } else if (typeof v2 === "string") {
      return ["span", stringStyle, JSON.stringify(v2)];
    } else if (typeof v2 === "boolean") {
      return ["span", keywordStyle, v2];
    } else if (isObject$1(v2)) {
      return ["object", { object: asRaw ? toRaw(v2) : v2 }];
    } else {
      return ["span", stringStyle, String(v2)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction$1(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$2(opts) && opts.includes(key) || isObject$1(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m2) => isKeyOfType(m2, key, type))) {
      return true;
    }
  }
  function genRefFlag(v2) {
    if (isShallow(v2)) {
      return `ShallowRef`;
    }
    if (v2.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.2.41";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString$1(next);
  if (next && !isCssString) {
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
    if (prev && !isString$1(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$2(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize$1(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
  !el.tagName.includes("-")) {
    el._value = value;
    const newValue = value == null ? "" : value;
    if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    el.tagName === "OPTION") {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
    if (!needRemove) {
      warn$2(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: value ${value} is invalid.`, e2);
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p$2 = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p$2.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    if (!e2._vts) {
      e2._vts = Date.now();
    } else if (e2._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, invoker.value), instance, 5, [e2]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$2(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e22) => !e22._stopped && fn && fn(e22));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString$1(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props, { slots }) => h$2(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
const callHook = (hook, args = []) => {
  if (isArray$2(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber$1(val);
  validateDuration(res);
  return res;
}
function validateDuration(val) {
  if (typeof val !== "number") {
    warn$2(`<transition> explicit duration is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$2(`<transition> explicit duration is NaN - the duration expression might be incorrect.`);
  }
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(TRANSITION + "Delay");
  const transitionDurations = getStyleProperties(TRANSITION + "Duration");
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(ANIMATION + "Delay");
  const animationDurations = getStyleProperties(ANIMATION + "Duration");
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(styles[TRANSITION + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
}
function toMs(s2) {
  return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c2) => {
        const el = c2.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e2) => {
          if (e2 && e2.target !== el) {
            return;
          }
          if (!e2 || /transform$/.test(e2.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i2 = 0; i2 < children.length; i2++) {
        const child = children[i2];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn$2(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i2 = 0; i2 < prevChildren.length; i2++) {
          const child = prevChildren[i2];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c2) {
  const el = c2.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c2) {
  newPositionMap.set(c2, c2.el.getBoundingClientRect());
}
function applyTranslation(c2) {
  const oldPos = positionMap.get(c2);
  const newPos = newPositionMap.get(c2);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s2 = c2.el.style;
    s2.transform = s2.webkitTransform = `translate(${dx}px,${dy}px)`;
    s2.transitionDuration = "0s";
    return c2;
  }
}
function hasCSSTransform(el, root2, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
    });
  }
  moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
  clone.style.display = "none";
  const container = root2.nodeType === 1 ? root2 : root2.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  {
    injectNativeTagCheck(app2);
    injectCompilerOptionsCheck(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction$1(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function injectNativeTagCheck(app2) {
  Object.defineProperty(app2.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app2) {
  {
    const isCustomElement = app2.config.isCustomElement;
    Object.defineProperty(app2.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$2(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app2.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom`;
    Object.defineProperty(app2.config, "compilerOptions", {
      get() {
        warn$2(msg);
        return compilerOptions;
      },
      set() {
        warn$2(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString$1(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$2(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$2(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
}
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
var nativeObjectToString$1 = objectProto$f.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$e = Object.prototype;
var nativeObjectToString = objectProto$e.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$3;
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var isArray$1 = Array.isArray;
const isArray$1$1 = isArray$1;
var INFINITY = 1 / 0;
var symbolProto$2 = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid2 = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid2 ? "Symbol(src)_1." + uid2 : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$d = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$1$1 = WeakMap$1;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
const defineProperty$1 = defineProperty;
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
const baseSetToString$1 = baseSetToString;
var setToString = shortOut(baseSetToString$1);
const setToString$1 = setToString;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$a.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax$1 = Math.max;
function overRest(func, start, transform) {
  start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$b = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$b;
  return value === proto;
}
function baseTimes(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$4 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$4 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$4] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$4] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
const Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size2 = data.size;
  data.set(key, value);
  this.size += data.size == size2 ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$4 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function baseSlice(array, start, end) {
  var index = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f";
var rsZWJ$2 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$2 + rsAstralRange$2 + rsComboRange$3 + rsVarRange$2 + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function asciiToArray(string) {
  return string.split("");
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange$1 + "]", rsCombo$2 = "[" + rsComboRange$2 + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d";
var reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
const upperFirst$1 = upperFirst;
function capitalize(string) {
  return upperFirst$1(toString(string).toLowerCase());
}
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter = basePropertyOf(deburredLetters);
const deburrLetter$1 = deburrLetter;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var reComboMark = RegExp(rsCombo$1, "g");
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
}
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var rsApos = "['’]";
var reApos = RegExp(rsApos, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});
const camelCase$1 = camelCase;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer2, isDeep) {
  if (isDeep) {
    return buffer2.slice();
  }
  var length = buffer2.length, result = allocUnsafe ? allocUnsafe(length) : new buffer2.constructor(length);
  buffer2.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
const Set$2 = Set$1;
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$3 || Map$2 && getTag(new Map$2()) != mapTag$4 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$4 || WeakMap$1$1 && getTag(new WeakMap$1$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$2.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer2 = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer2, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer2 = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer2, typedArray.byteOffset, typedArray.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$3 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$3 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$3:
    case stringTag$3:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$2;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$2;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$2 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$2 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$2] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack2) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack2) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack2 || (stack2 = new Stack());
  var stacked = stack2.get(value);
  if (stacked) {
    return stacked;
  }
  stack2.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack2));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack2));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack2));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack2.get(array);
  var othStacked = stack2.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen2 = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack2.set(array, other);
  stack2.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack2) : customizer(arrValue, othValue, index, array, other, stack2);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen2) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen2, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack2))) {
          return seen2.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack2))) {
      result = false;
      break;
    }
  }
  stack2["delete"](array);
  stack2["delete"](other);
  return result;
}
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag$1 = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack2) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag$1:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag$1:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack2.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack2.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack2);
      stack2["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack2) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack2.get(object);
  var othStacked = stack2.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack2.set(object, other);
  stack2.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack2) : customizer(objValue, othValue, key, object, other, stack2);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack2) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack2["delete"](object);
  stack2["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack2) {
  var objIsArr = isArray$1$1(object), othIsArr = isArray$1$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack2 || (stack2 = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack2) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack2);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack2 || (stack2 = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack2);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack2 || (stack2 = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack2);
}
function baseIsEqual(value, other, bitmask, customizer, stack2) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack2);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
const baseFor$1 = baseFor;
var now$1 = function() {
  return root$1.Date.now();
};
const now$1$1 = now$1;
var FUNC_ERROR_TEXT = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1$1());
  }
  function debounced() {
    var time = now$1$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack2) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack2.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack2) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack2.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack2);
    stack2["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack2) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack2 || (stack2 = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack2);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack2) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var stringTag = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray$1$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
function isEqual(value, other) {
  return baseIsEqual(value, other);
}
var numberTag = "[object Number]";
function isNumber(value) {
  return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
function isNil(value) {
  return value == null;
}
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? "-" : "") + word.toLowerCase();
});
const kebabCase$1 = kebabCase;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
const merge$1 = merge;
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
function callEmit(funcs, ...args) {
  if (!funcs) {
    return;
  }
  if (Array.isArray(funcs)) {
    funcs.forEach((fn) => fn(...args));
  } else {
    return funcs(...args);
  }
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop();
      state = scope = void 0;
    }
  };
  return (...args) => {
    subscribers++;
    if (!state) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function useState(defaultOrFactory, shallow = true) {
  const defaultValue = isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
  const state = shallow ? shallowRef(defaultValue) : ref(defaultValue);
  const setState = (value) => {
    if (value !== toRaw(state.value)) {
      state.value = value;
    }
  };
  return [computed(() => state.value), setState];
}
function useControlledProp(props, key, defaultOrFactory) {
  const tempProp = shallowRef(props[key]);
  watch(
    () => props[key],
    (value) => tempProp.value = value
  );
  const state = computed(
    () => {
      var _a2, _b;
      return (_b = (_a2 = props[key]) != null ? _a2 : tempProp.value) != null ? _b : isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
    }
  );
  const setState = (value, ...args) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value;
      callEmit(props[`onUpdate:${key}`], value, ...args);
    }
  };
  return [state, setState];
}
function isNumeric(val) {
  return !isNaN(parseFloat(val)) && isFinite(val);
}
const isHTMLElement = (val) => toRawType(val).startsWith("HTML");
function convertArray(value) {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function convertNumber(value, fallback = 0) {
  return isNumeric(value) ? Number(value) : fallback;
}
function convertCssPixel(value) {
  if (isNil(value)) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}
function convertElement(elementOrInstance) {
  var _a2;
  const element = unref(elementOrInstance);
  return isHTMLElement(element) ? element : (_a2 = element == null ? void 0 : element.$el) != null ? _a2 : element;
}
function on(el, type, listener, options) {
  if (el && type && listener) {
    el.addEventListener(type, listener, options);
  }
}
function off(el, type, listener, options) {
  if (el && type && listener) {
    el.removeEventListener(type, listener, options);
  }
}
function addClass(el, className) {
  const cls = isString(className) ? [className] : className;
  el.classList.add(...cls);
}
function removeClass(el, className) {
  const cls = isString(className) ? [className] : className;
  el.classList.remove(...cls);
}
const rAF = requestAnimationFrame || ((cb) => setTimeout(cb, 1e3 / 60));
const cancelRAF = cancelAnimationFrame || clearTimeout;
function throttleRAF(fn) {
  let id = null;
  const frameCb = (...args) => {
    id = null;
    fn(...args);
  };
  const requestCb = (...args) => {
    if (id === null) {
      id = rAF(() => frameCb(...args));
    }
  };
  requestCb.cancel = () => {
    if (id !== null) {
      (cancelAnimationFrame || clearTimeout)(id);
    }
  };
  return requestCb;
}
const easeInOutCubic = (elapsed, initialValue, amountOfChange, duration) => {
  if (duration <= 0) {
    return amountOfChange + initialValue;
  }
  if ((elapsed /= duration / 2) < 1) {
    return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
  }
  return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
};
const logWrapper = (location2, args, log) => {
  log(`[@idux/${location2}]:`, ...args);
};
const info = (location2, ...args) => logWrapper(location2, args, console.log);
const warn$1 = (location2, ...args) => logWrapper(location2, args, console.warn);
const error = (location2, ...args) => logWrapper(location2, args, console.error);
const Logger = { info, warn: warn$1, error };
const throwError = (location2, message) => {
  throw new Error(`[@idux/${location2}]: ${message}`);
};
const NoopFunction = () => {
};
const NoopObject = Object.freeze({});
const NoopArray = Object.freeze([]);
const getOffset = (el, target = window) => {
  if (!el || !el.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  let { top, left } = el.getBoundingClientRect();
  if (target === window) {
    const doc2 = el.ownerDocument.documentElement;
    top = top - doc2.clientTop;
    left = left - doc2.clientLeft;
  } else {
    const targetRect = target.getBoundingClientRect();
    top = top - targetRect.top;
    left = left - targetRect.left;
  }
  return { top, left };
};
let nodeId = 0;
function uniqueId(prefix = "ix") {
  return `${prefix}-${nodeId++}`;
}
function useEventListener(target, type, listener, options) {
  const stopWatch = watch(
    () => convertElement(target),
    (currElement, prevElement) => {
      off(prevElement, type, listener, options);
      on(currElement, type, listener, options);
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    off(convertElement(target), type, listener, options);
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const TEMPLATE = "template";
const isComment = (node) => node.type === Comment;
const isFragment = (node) => node.type === Fragment;
const isTemplate = (node) => node.type === TEMPLATE;
const isText = (node) => node.type === Text;
function getValidNode(node, depth) {
  if (isComment(node)) {
    return;
  }
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
  }
  return node;
}
function getFirstValidNode(nodes, maxDepth = 3) {
  return convertArray(nodes).find((node) => getValidNode(node, maxDepth));
}
function hasSlot(slots, key = "default") {
  return !isNil(slots[key]);
}
function isEmptyNode(nodes) {
  return convertArray(nodes).every(
    (node) => !node || isComment(node) || isFragment(node) && node.children.length === 0 || isText(node) && node.children.trim() === ""
  );
}
function flattenNode(nodes, filterOptions = {}) {
  const result = [];
  convertArray(nodes).forEach((node) => {
    if (Array.isArray(node)) {
      result.push(...flattenNode(node, filterOptions));
    } else if (isFragment(node)) {
      result.push(...flattenNode(node.children, filterOptions));
    } else {
      const { empty = true, key } = filterOptions;
      if (empty && isEmptyNode(node)) {
        return;
      }
      const keys2 = convertArray(key);
      if (keys2.length && isVNode(node) && !keys2.some((key2) => node.type[key2])) {
        return;
      }
      result.push(node);
    }
  });
  return result;
}
let hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
const testUserAgent = (regexp) => {
  return regexp.test(navigator.userAgent);
};
const isBrowser$1 = typeof document === "object" && !!document;
const isEdge = isBrowser$1 && testUserAgent(/(edge)/i);
const isTrident = isBrowser$1 && testUserAgent(/(msie|trident)/i);
const isBlink = isBrowser$1 && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !isEdge && !isTrident;
const isWebKit = isBrowser$1 && testUserAgent(/AppleWebKit/i) && !isBlink && !isEdge && !isTrident;
isBrowser$1 && testUserAgent(/(firefox|minefield)/i);
isBrowser$1 && testUserAgent(/safari/i) && isWebKit;
isBrowser$1 && testUserAgent(/iPad|iPhone|iPod/) && !("MSStream" in window);
isBrowser$1 && testUserAgent(/android/i) && !isTrident;
let flexGapSupported$1;
function supportsFlexGap() {
  if (!isBrowser$1) {
    return false;
  }
  if (flexGapSupported$1 !== void 0) {
    return flexGapSupported$1;
  }
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  flexGapSupported$1 = flex.scrollHeight === 1;
  document.body.removeChild(flex);
  return flexGapSupported$1;
}
let supportsPassiveEvents;
function supportsPassiveEventListeners() {
  if (supportsPassiveEvents == null && typeof window !== "undefined") {
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: () => supportsPassiveEvents = true
        })
      );
    } finally {
      supportsPassiveEvents = supportsPassiveEvents || false;
    }
  }
  return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
  return supportsPassiveEventListeners() ? options : !!options.capture;
}
let shadowDomIsSupported;
function _supportsShadowDom() {
  if (shadowDomIsSupported == null) {
    const head = typeof document !== "undefined" ? document.head : null;
    shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
  }
  return shadowDomIsSupported;
}
function _getShadowRoot(element) {
  if (_supportsShadowDom()) {
    const rootNode = element.getRootNode ? element.getRootNode() : null;
    if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) {
      return rootNode;
    }
  }
  return null;
}
function _getEventTarget(event) {
  return event.composedPath ? event.composedPath()[0] : event.target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index];
  };
}
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfUTCWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfUTCWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "不到 1 秒",
    other: "不到 {{count}} 秒"
  },
  xSeconds: {
    one: "1 秒",
    other: "{{count}} 秒"
  },
  halfAMinute: "半分钟",
  lessThanXMinutes: {
    one: "不到 1 分钟",
    other: "不到 {{count}} 分钟"
  },
  xMinutes: {
    one: "1 分钟",
    other: "{{count}} 分钟"
  },
  xHours: {
    one: "1 小时",
    other: "{{count}} 小时"
  },
  aboutXHours: {
    one: "大约 1 小时",
    other: "大约 {{count}} 小时"
  },
  xDays: {
    one: "1 天",
    other: "{{count}} 天"
  },
  aboutXWeeks: {
    one: "大约 1 个星期",
    other: "大约 {{count}} 个星期"
  },
  xWeeks: {
    one: "1 个星期",
    other: "{{count}} 个星期"
  },
  aboutXMonths: {
    one: "大约 1 个月",
    other: "大约 {{count}} 个月"
  },
  xMonths: {
    one: "1 个月",
    other: "{{count}} 个月"
  },
  aboutXYears: {
    one: "大约 1 年",
    other: "大约 {{count}} 年"
  },
  xYears: {
    one: "1 年",
    other: "{{count}} 年"
  },
  overXYears: {
    one: "超过 1 年",
    other: "超过 {{count}} 年"
  },
  almostXYears: {
    one: "将近 1 年",
    other: "将近 {{count}} 年"
  }
};
var formatDistance = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + "内";
    } else {
      return result + "前";
    }
  }
  return result;
};
const formatDistance$1 = formatDistance;
var dateFormats = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: "yyyy-MM-dd",
  short: "yy-MM-dd"
};
var timeFormats = {
  full: "zzzz a h:mm:ss",
  long: "z a h:mm:ss",
  medium: "a h:mm:ss",
  short: "a h:mm"
};
var dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
const formatLong$1 = formatLong;
function checkWeek(date, baseDate, options) {
  var baseFormat = "eeee p";
  if (isSameUTCWeek(date, baseDate, options)) {
    return baseFormat;
  } else if (date.getTime() > baseDate.getTime()) {
    return "'下个'" + baseFormat;
  }
  return "'上个'" + baseFormat;
}
var formatRelativeLocale = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: "PP p"
};
var formatRelative = function formatRelative2(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];
  if (typeof format === "function") {
    return format(date, baseDate, options);
  }
  return format;
};
const formatRelative$1 = formatRelative;
var eraValues = {
  narrow: ["前", "公元"],
  abbreviated: ["前", "公元"],
  wide: ["公元前", "公元"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["第一季", "第二季", "第三季", "第四季"],
  wide: ["第一季度", "第二季度", "第三季度", "第四季度"]
};
var monthValues = {
  narrow: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
  abbreviated: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  wide: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
};
var dayValues = {
  narrow: ["日", "一", "二", "三", "四", "五", "六"],
  short: ["日", "一", "二", "三", "四", "五", "六"],
  abbreviated: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  wide: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
};
var dayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "上",
    pm: "下",
    midnight: "凌晨",
    noon: "午",
    morning: "早",
    afternoon: "下午",
    evening: "晚",
    night: "夜"
  },
  abbreviated: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  },
  wide: {
    am: "上午",
    pm: "下午",
    midnight: "凌晨",
    noon: "中午",
    morning: "早晨",
    afternoon: "中午",
    evening: "晚上",
    night: "夜间"
  }
};
var ordinalNumber = function ordinalNumber2(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  switch (options === null || options === void 0 ? void 0 : options.unit) {
    case "date":
      return number.toString() + "日";
    case "hour":
      return number.toString() + "时";
    case "minute":
      return number.toString() + "分";
    case "second":
      return number.toString() + "秒";
    default:
      return "第 " + number.toString();
  }
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
const localize$1 = localize;
var matchOrdinalNumberPattern = /^(第\s*)?\d+(日|时|分|秒)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
var parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
const match$1 = match;
var locale = {
  code: "zh-CN",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
const zhCN$1$1 = locale;
const zhCN$1 = {
  type: "zh-CN",
  date: zhCN$1$1,
  datePicker: {
    today: "今天",
    ok: "确定",
    clear: "清除",
    month: "月",
    year: "年",
    monthSelect: "选择月份",
    yearSelect: "选择年份",
    monthFormat: "MMM",
    yearFormat: "yyyy年",
    previousMonth: "上个月",
    nextMonth: "下个月",
    previousYear: "上一年",
    nextYear: "下一年",
    previousDecade: "上一年代",
    nextDecade: "下一年代",
    datePlaceholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    datetimePlaceholder: "请选择日期时间"
  },
  dateRangePicker: {
    datePlaceholder: ["开始日期", "结束日期"],
    weekPlaceholder: ["开始周", "结束周"],
    monthPlaceholder: ["开始月份", "结束月份"],
    quarterPlaceholder: ["开始季度", "结束季度"],
    yearPlaceholder: ["开始年份", "结束年份"],
    datetimePlaceholder: ["开始时间", "结束时间"],
    separator: "至",
    okText: "确定",
    cancelText: "取消"
  },
  empty: {
    description: "暂无数据"
  },
  modal: {
    cancelText: "取消",
    okText: "确定",
    justOkText: "我知道了"
  },
  popconfirm: {
    cancelText: "取消",
    okText: "确定"
  },
  pagination: {
    itemsPerPage: "每页",
    itemsSuffix: "项",
    jumpTo: "前往",
    page: "页",
    prev: "上一页",
    next: "下一页",
    prev5: "向前 5 页",
    next5: "向后 5 页",
    totalPrefix: "共",
    totalSuffix: "项"
  },
  select: {
    limitMessage: "该选择器的值不能超过 ${0} 项"
  },
  table: {
    expand: "展开行",
    collapse: "收起行",
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    selectAll: "全选所有",
    selectInvert: "反选所有",
    selectNone: "清空所有",
    selectPageAll: "全选当页",
    selectPageInvert: "反选当页",
    sortDesc: "点击降序",
    sortAsc: "点击升序",
    sortCancel: "取消排序"
  },
  timePicker: {
    okText: "确定",
    placeholder: "请选择时间"
  },
  timeRangePicker: {
    okText: "确定",
    separator: "至",
    placeholder: ["起始时间", "结束时间"]
  },
  transfer: {
    toSelect: "待选",
    selected: "已选",
    searchPlaceholder: ["搜索关键字", "搜索关键字"]
  },
  treeSelect: {
    expandAll: "展开全部",
    collapseAll: "收起全部"
  },
  upload: {
    uploading: "正在上传...",
    error: "上传失败",
    cancel: "取消上传",
    preview: "预览文件",
    remove: "删除文件",
    retry: "重新上传",
    download: "下载文件"
  }
};
const iconProps = {
  name: String,
  iconfont: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: [Boolean, Number, String],
    default: void 0
  },
  color: String,
  size: [String, Number]
};
const iconDefinitions = /* @__PURE__ */ new Map();
const iconCache = /* @__PURE__ */ new Map();
function clearSVGElement(el) {
  var _a2;
  const children = el.childNodes;
  const length = children.length;
  for (let i2 = length - 1; i2 >= 0; i2--) {
    const child = children[i2];
    if (((_a2 = child.tagName) == null ? void 0 : _a2.toLowerCase()) === "svg") {
      child.remove();
    }
  }
}
async function loadSVGElement(iconName, loadIconDynamically) {
  const cached = iconCache.get(iconName);
  if (cached) {
    const svg2 = await cached;
    if (svg2) {
      return svg2.cloneNode(true);
    } else {
      iconCache.delete(iconName);
      return null;
    }
  }
  const svg = createSVGElement(iconName, loadIconDynamically);
  iconCache.set(iconName, svg);
  return svg;
}
async function loadSvgElementFormScript(iconName) {
  let svg = null;
  const cachedName = `IDUX_CACHED_ICON_FONT_` + iconName;
  const cached = iconCache.get(cachedName);
  if (cached) {
    svg = await cached;
  }
  if (!svg) {
    svg = convertSVGElement(`<svg><use xlink:href="#${iconName}"></svg>`);
    setSVGAttribute(svg, iconName);
    iconCache.set(cachedName, svg);
  }
  return svg.cloneNode(true);
}
async function createSVGElement(iconName, loadIconDynamically) {
  let svg = null;
  const icon = await loadIconDefinition(iconName, loadIconDynamically);
  if (icon) {
    svg = convertSVGElement(icon.svg);
    if (svg) {
      setSVGAttribute(svg, iconName);
      iconCache.set(iconName, svg);
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] create failed.`);
    }
  }
  return svg;
}
async function loadIconDefinition(iconName, loadIconDynamically) {
  let icon = iconDefinitions.get(iconName);
  if (!icon) {
    if (loadIconDynamically) {
      const svg = await loadIconDynamically(iconName);
      if (validSVGString(svg)) {
        icon = { name: iconName, svg };
        iconDefinitions.set(iconName, icon);
      } else {
        Logger.warn("components/icon", `The dynamically loaded icon [${iconName}] is invalid.`);
        return;
      }
    } else {
      Logger.warn("components/icon", `The icon [${iconName}] load failed.`);
    }
  }
  return icon;
}
function validSVGString(svg) {
  return !!svg && svg.includes("<svg");
}
function convertSVGElement(svg) {
  const div = document.createElement("div");
  div.innerHTML = svg;
  return div.querySelector("svg");
}
const defaultSVGAttributes = {
  viewBox: "0 0 1024 1024",
  focusable: "false",
  "aria-hidden": "true"
};
function setSVGAttribute(svg, iconName) {
  Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
    if (!svg.hasAttribute(key)) {
      svg.setAttribute(key, value);
    }
  });
  svg.setAttribute("data-icon", iconName);
}
function convertSVGNode(child) {
  const node = getFirstValidNode(child);
  if (!node || node.type !== "svg") {
    Logger.warn("components/icon", "The children must is svg element");
    return;
  }
  return cloneVNode(node, { ...defaultSVGAttributes, ...node.props });
}
var Icon = /* @__PURE__ */ defineComponent({
  name: "IxIcon",
  props: iconProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`);
    const config = useGlobalConfig$1("icon");
    const root2 = ref();
    onMounted(() => appendChild(props, config, root2.value));
    watch([() => props.name, () => props.iconfont], () => {
      const rootElement = root2.value;
      if (!rootElement) {
        return;
      }
      clearSVGElement(rootElement);
      appendChild(props, config, rootElement);
    });
    const classes = computed(() => {
      const {
        name,
        rotate
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${name}`]: !!name,
        [`${prefixCls}-spinning`]: rotate === true
      });
    });
    const style = computed(() => {
      const {
        rotate,
        color,
        size: size2
      } = props;
      return {
        color,
        fontSize: convertCssPixel(size2),
        transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : void 0
      };
    });
    return () => {
      var _a2;
      const {
        name
      } = props;
      if (name) {
        return createVNode("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img",
          "aria-label": name
        }, null);
      } else {
        return createVNode("i", {
          "ref": root2,
          "class": classes.value,
          "style": style.value,
          "role": "img"
        }, [convertSVGNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots))]);
      }
    };
  }
});
async function appendChild(props, config, rootElement) {
  const {
    name,
    iconfont
  } = props;
  if (name) {
    const svgElement = iconfont ? await loadSvgElementFormScript(name) : await loadSVGElement(name, config.loadIconDynamically);
    if (svgElement && name === props.name) {
      rootElement.appendChild(svgElement);
    }
  }
}
const addIconDefinitions = (icons) => {
  icons.forEach((icon) => iconDefinitions.set(icon.name, icon));
};
const Bulb = {
  name: "bulb",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a320 320 0 0 1 192.064 576L704 691.2a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8V640A320 320 0 0 1 512 64zm0 64a256 256 0 0 0-165.248 451.52l11.648 9.28L384 608l-.064 31.936h256.128v-32l25.6-19.2A256 256 0 0 0 512 128zM396.8 896h230.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H396.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8z"/><path d="M691.2 640c7.04 0 12.8 5.76 12.8 12.8v166.4a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8V652.8c0-7.04 5.76-12.8 12.8-12.8h358.4zM640 704H384v64h256v-64zM458.752 211.648l13.184 37.568a11.392 11.392 0 0 1-6.208 14.208 160.64 160.64 0 0 0-85.12 86.272 11.776 11.776 0 0 1-14.72 7.04l-38.976-12.8A11.264 11.264 0 0 1 320 329.024 224.64 224.64 0 0 1 441.6 204.16l.576-.192a12.8 12.8 0 0 1 16.64 7.68z"/></svg>'
};
const CaretDownFilled = {
  name: "caret-down-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"/></svg>'
};
const CaretUpFilled = {
  name: "caret-up-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M858.9 689 530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"/></svg>'
};
const CheckCircleFilled = {
  name: "check-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm238.336 366.933a17.067 17.067 0 0 0-24.15 0L466.689 626.432l-138.71-138.795a17.067 17.067 0 0 0-24.149 0l-36.224 36.224a17.067 17.067 0 0 0 0 24.15l187.051 187.05a17.067 17.067 0 0 0 24.15 0L786.56 427.307a17.067 17.067 0 0 0 0-24.15z"/></svg>'
};
const CheckCircle = {
  name: "check-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M512 64c247.445 0 448 200.555 448 448S759.445 960 512 960 64 759.445 64 512 264.555 64 512 64Zm0 64c-212.045 0-384 171.955-384 384s171.955 384 384 384 384-171.955 384-384-171.955-384-384-384Zm220.149 223.365 27.152 27.153c5 4.998 5 13.103 0 18.102L460.384 695.537c-4.999 4.999-13.103 4.999-18.102 0L279.365 532.62c-4.999-5-4.999-13.104 0-18.102l27.153-27.153c3.999-4 9.985-4.8 14.78-2.4l3.321 2.4 117.662 117.662c4.998 4.998 13.103 4.998 18.102 0l253.664-253.662c4.998-4.999 13.103-4.999 18.102 0Z"/></svg>'
};
const Check = {
  name: "check",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M158.912 440.768a12.8 12.8 0 0 1 18.112 0l262.4 262.464 443.52-443.52a12.8 12.8 0 0 1 18.112 0l27.2 27.2a12.8 12.8 0 0 1 0 18.112L448.512 784.64a12.8 12.8 0 0 1-18.112 0L131.84 486.016a12.8 12.8 0 0 1 0-18.112l27.136-27.136z"/></svg>'
};
const Clear = {
  name: "clear",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M243.2 320c7.04 0 12.8 5.76 12.8 12.8V896h512V332.8c0-7.04 5.76-12.8 12.8-12.8h38.4c7.04 0 12.8 5.76 12.8 12.8v614.08a12.8 12.8 0 0 1-12.8 12.8H204.8a12.8 12.8 0 0 1-12.8-12.8V332.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm512-256c7.04 0 12.8 5.76 12.8 12.8V192h179.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H76.8A12.8 12.8 0 0 1 64 243.2v-38.4c0-7.04 5.76-12.8 12.8-12.8H256V76.8c0-7.04 5.76-12.8 12.8-12.8h486.4zm-50.752 64h-383.68l-.128 64h383.68v-64z"/></svg>'
};
const ClockCircle = {
  name: "clock-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768z"/><path d="M512 268.8v291.456c0 7.04 5.76 12.8 12.8 12.8h166.4c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H460.8a12.8 12.8 0 0 1-12.8-12.8V268.8c0-7.04 5.76-12.8 12.8-12.8h38.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const CloseCircleFilled = {
  name: "close-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm192 288.128a14.635 14.635 0 0 0-20.65 0l-170.923 170.88-168.278-168.277a14.635 14.635 0 0 0-20.693 0l-31.061 31.018a14.635 14.635 0 0 0 0 20.694l168.32 168.277-170.752 170.752a14.635 14.635 0 0 0 0 20.693l31.018 31.062a14.635 14.635 0 0 0 20.694 0l170.752-170.795 170.752 170.795a14.635 14.635 0 0 0 20.693 0l31.061-31.019a14.635 14.635 0 0 0 0-20.693L564.181 510.72l170.88-170.88a14.635 14.635 0 0 0 0-20.693l-31.018-31.019z"/></svg>'
};
const CloseCircle = {
  name: "close-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm195.2 215.232a12.8 12.8 0 0 1 0 18.112L557.632 510.848l149.44 149.44a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0L512.384 556.16 362.944 705.6a12.8 12.8 0 0 1-18.048 0l-27.2-27.136a12.8 12.8 0 0 1 0-18.112L467.2 510.848l-147.264-147.2a12.8 12.8 0 0 1 0-18.112l27.136-27.136a12.8 12.8 0 0 1 18.112 0l147.264 147.2 149.568-149.504a12.8 12.8 0 0 1 18.048 0l27.2 27.136z"/></svg>'
};
const Close = {
  name: "close",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M282.24 236.928 512 466.688l229.76-229.76a12.8 12.8 0 0 1 18.176 0l27.136 27.136a12.8 12.8 0 0 1 0 18.112L557.248 512l229.76 229.888a12.8 12.8 0 0 1 0 18.112l-27.072 27.136a12.8 12.8 0 0 1-18.112 0L512 557.248l-229.76 229.76a12.8 12.8 0 0 1-18.176 0l-27.136-27.072a12.8 12.8 0 0 1 0-18.112L466.688 512l-229.76-229.76a12.8 12.8 0 0 1 0-18.176l27.136-27.136a12.8 12.8 0 0 1 18.112 0z"/></svg>'
};
const Collapse = {
  name: "collapse",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M819.2 128c7.04 0 12.8 5.76 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V140.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm-266.176 76.224 27.2 27.2a12.8 12.8 0 0 1 0 18.112l-262.528 262.4 262.528 262.528a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0L236.288 521.024a12.8 12.8 0 0 1 0-18.112l298.688-298.688a12.8 12.8 0 0 1 18.048 0z"/></svg>'
};
const Control = {
  name: "control",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M896 140.8v742.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8V140.8c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zM832 192H192v640h640V192z"/><path d="M332.8 256h38.4q12.8 0 12.8 12.8v486.4q0 12.8-12.8 12.8h-38.4q-12.8 0-12.8-12.8V268.8q0-12.8 12.8-12.8Zm320 0h38.4q12.8 0 12.8 12.8v486.4q0 12.8-12.8 12.8h-38.4q-12.8 0-12.8-12.8V268.8q0-12.8 12.8-12.8Z"/><path d="M352 512a96 96 0 1 1 0 192 96 96 0 0 1 0-192zm320-192a96 96 0 1 1 0 192 96 96 0 0 1 0-192z"/><path d="M352 512a96 96 0 1 1 0 192 96 96 0 0 1 0-192zm0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64zm320-256a96 96 0 1 1 0 192 96 96 0 0 1 0-192zm0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z"/></svg>'
};
const Copy = {
  name: "copy",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M883.2 64c7.04 0 12.8 5.76 12.8 12.8v742.4a12.8 12.8 0 0 1-12.8 12.8H768v-64h64V128H384v64h-64V76.8c0-7.04 5.76-12.8 12.8-12.8h550.4z"/><path d="M691.2 256c7.04 0 12.8 5.76 12.8 12.8v678.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8V268.8c0-7.04 5.76-12.8 12.8-12.8h550.4zM640 320H192v576h448V320z"/><path d="M268.8 448h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H268.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H268.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Z"/></svg>'
};
const DialogClose = {
  name: "dialog-close",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M916.741 210.766c4.999-4.999 4.999-13.103 0-18.102l-45.255-45.255c-4.999-4.999-13.103-4.999-18.102 0L532.073 468.721 210.766 147.414c-4.999-5-13.103-5-18.102 0l-45.255 45.254c-4.999 5-4.999 13.104 0 18.102l321.307 321.307-321.307 321.307c-5 5.001-4.999 13.103 0 18.102l45.255 45.255c4.999 4.999 13.101 5 18.102 0l321.307-321.307 321.311 321.312c5.001 5 13.103 4.999 18.102 0l45.255-45.255c4.999-4.999 5-13.101 0-18.102L595.43 532.077l321.31-321.311Z"/></svg>'
};
const DoubleLeft = {
  name: "double-left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M533.504 265.344a32 32 0 0 1 0 45.312L342.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 0 1-45.248 45.248L265.344 533.504a32 32 0 0 1 0-45.248L488.32 265.344a32 32 0 0 1 45.248 0zm224 0a32 32 0 0 1 0 45.312L566.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 1 1-45.248 45.248L489.344 533.504a32 32 0 0 1 0-45.248l222.912-222.912a32 32 0 0 1 45.248 0z"/></svg>'
};
const DoubleRight = {
  name: "double-right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M490.752 265.344a32 32 0 0 0 0 45.312L681.92 501.824a12.8 12.8 0 0 1 0 18.112L489.344 712.448a32 32 0 0 0 45.312 45.248l224.192-224.192a32 32 0 0 0 0-45.248L536 265.344a32 32 0 0 0-45.248 0zm-224 0a32 32 0 0 0 0 45.312L457.92 501.76a12.8 12.8 0 0 1 0 18.112L265.344 712.384a32 32 0 1 0 45.312 45.248L534.848 533.44a32 32 0 0 0 0-45.248L312 265.344a32 32 0 0 0-45.248 0z"/></svg>'
};
const Down = {
  name: "down",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m294.777 395.325 208.172 208.172c4.999 5 13.103 5 18.102 0l208.172-208.172c4.999-4.999 13.103-4.999 18.102 0l27.153 27.153c4.999 4.999 4.999 13.103 0 18.102L521.051 694.007c-4.999 4.999-13.103 4.999-18.102 0L249.522 440.58c-4.999-4.999-4.999-13.103 0-18.102l27.153-27.153c4.999-4.999 13.103-4.999 18.102 0Z"/></svg>'
};
const Ellipsis = {
  name: "ellipsis",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M576 768c0 4.202-.41 8.364-1.23 12.486a63.86 63.86 0 0 1-3.642 12.006 63.829 63.829 0 0 1-5.914 11.064 63.878 63.878 0 0 1-7.959 9.699 63.878 63.878 0 0 1-9.699 7.96 63.829 63.829 0 0 1-11.064 5.913 63.827 63.827 0 0 1-12.006 3.642A63.83 63.83 0 0 1 512 832a63.83 63.83 0 0 1-12.486-1.23 63.835 63.835 0 0 1-12.006-3.642 63.839 63.839 0 0 1-11.064-5.914 63.857 63.857 0 0 1-9.699-7.959 63.866 63.866 0 0 1-7.96-9.699 63.833 63.833 0 0 1-5.913-11.064 63.839 63.839 0 0 1-3.642-12.006A63.847 63.847 0 0 1 448 768c0-4.202.41-8.364 1.23-12.486a63.839 63.839 0 0 1 3.642-12.006 63.833 63.833 0 0 1 5.914-11.064 63.866 63.866 0 0 1 7.96-9.699 63.857 63.857 0 0 1 9.698-7.96 63.839 63.839 0 0 1 11.064-5.913 63.868 63.868 0 0 1 12.006-3.643A63.861 63.861 0 0 1 512 704c4.202 0 8.364.41 12.486 1.23a63.86 63.86 0 0 1 12.006 3.642 63.829 63.829 0 0 1 11.064 5.914 63.878 63.878 0 0 1 9.699 7.959 63.878 63.878 0 0 1 7.96 9.699 63.829 63.829 0 0 1 5.913 11.064 63.86 63.86 0 0 1 3.643 12.006A63.862 63.862 0 0 1 576 768Zm0-512c0 4.202-.41 8.364-1.23 12.486a63.86 63.86 0 0 1-3.642 12.006 63.829 63.829 0 0 1-5.914 11.064 63.878 63.878 0 0 1-7.959 9.699 63.878 63.878 0 0 1-9.699 7.96 63.829 63.829 0 0 1-11.064 5.913 63.86 63.86 0 0 1-12.006 3.643A63.862 63.862 0 0 1 512 320c-4.202 0-8.364-.41-12.486-1.23a63.868 63.868 0 0 1-12.006-3.642 63.839 63.839 0 0 1-11.064-5.914 63.857 63.857 0 0 1-9.699-7.959 63.866 63.866 0 0 1-7.96-9.699 63.833 63.833 0 0 1-5.913-11.064 63.839 63.839 0 0 1-3.642-12.006A63.847 63.847 0 0 1 448 256c0-4.202.41-8.364 1.23-12.486a63.847 63.847 0 0 1 3.642-12.006 63.843 63.843 0 0 1 5.914-11.064 63.846 63.846 0 0 1 7.96-9.699 63.846 63.846 0 0 1 9.698-7.96 63.843 63.843 0 0 1 11.064-5.913 63.847 63.847 0 0 1 12.006-3.642A63.846 63.846 0 0 1 512 192c4.202 0 8.364.41 12.486 1.23a63.839 63.839 0 0 1 12.006 3.642 63.833 63.833 0 0 1 11.064 5.914 63.866 63.866 0 0 1 9.699 7.96 63.857 63.857 0 0 1 7.96 9.698 63.839 63.839 0 0 1 5.913 11.064 63.868 63.868 0 0 1 3.643 12.006A63.861 63.861 0 0 1 576 256Zm0 256c0 4.202-.41 8.364-1.23 12.486a63.86 63.86 0 0 1-3.642 12.006 63.829 63.829 0 0 1-5.914 11.064 63.878 63.878 0 0 1-7.959 9.699 63.878 63.878 0 0 1-9.699 7.96 63.829 63.829 0 0 1-11.064 5.913 63.827 63.827 0 0 1-12.006 3.642A63.83 63.83 0 0 1 512 576a63.83 63.83 0 0 1-12.486-1.23 63.835 63.835 0 0 1-12.006-3.642 63.839 63.839 0 0 1-11.064-5.914 63.857 63.857 0 0 1-9.699-7.959 63.866 63.866 0 0 1-7.96-9.699 63.833 63.833 0 0 1-5.913-11.064 63.839 63.839 0 0 1-3.642-12.006A63.847 63.847 0 0 1 448 512c0-4.202.41-8.364 1.23-12.486a63.839 63.839 0 0 1 3.642-12.006 63.833 63.833 0 0 1 5.914-11.064 63.866 63.866 0 0 1 7.96-9.699 63.857 63.857 0 0 1 9.698-7.96 63.839 63.839 0 0 1 11.064-5.913 63.868 63.868 0 0 1 12.006-3.643A63.861 63.861 0 0 1 512 448c4.202 0 8.364.41 12.486 1.23a63.86 63.86 0 0 1 12.006 3.642 63.829 63.829 0 0 1 11.064 5.914 63.878 63.878 0 0 1 9.699 7.959 63.878 63.878 0 0 1 7.96 9.699 63.829 63.829 0 0 1 5.913 11.064 63.86 63.86 0 0 1 3.643 12.006A63.862 63.862 0 0 1 576 512Z"/></svg>'
};
const Empty = {
  name: "empty",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><defs><style/></defs><path d="M961.991 628.895h.01V849.5c0 31.066-25.184 56.25-56.25 56.25h-787.5C87.185 905.75 62 880.566 62 849.5V628.895h.01a36.879 36.879 0 0 1 5.25-18.1l118.856-198.028c10.175-16.954 28.515-27.33 48.307-27.33h555.149c19.792 0 38.131 10.376 48.307 27.33l118.856 198.027a36.718 36.718 0 0 1 5.255 18.1zm-312.198-4.38c.362 0 .724-.005 1.084-.015h252.416a7.031 7.031 0 0 0 6.028-10.65L801.65 434.458a14.084 14.084 0 0 0-12.077-6.833h-555.15a14.083 14.083 0 0 0-12.076 6.833L114.675 613.85a7.031 7.031 0 0 0 6.029 10.65h253.505c13.108 0 24.435 9.047 27.39 21.739C411.727 697.968 457.307 737 512.002 737c37.814 0 71.271-18.657 91.668-47.268a111.935 111.935 0 0 0 18.56-42.63c2.632-13.134 14.168-22.588 27.564-22.588zM512.001 118.25c11.65 0 21.094 9.444 21.094 21.094v89.648c0 11.65-9.444 21.094-21.094 21.094s-21.094-9.444-21.094-21.094v-89.648c0-11.65 9.444-21.094 21.094-21.094zm266.341 65.892c8.237 8.238 8.237 21.593 0 29.831l-63.391 63.392c-8.238 8.237-21.594 8.237-29.831 0-8.238-8.238-8.238-21.594 0-29.831l63.391-63.392c8.237-8.238 21.593-8.238 29.831 0zm-532.682 0c8.238-8.238 21.594-8.238 29.832 0l63.39 63.392c8.238 8.237 8.238 21.593 0 29.83-8.237 8.238-21.593 8.238-29.831 0l-63.391-63.39c-8.237-8.239-8.237-21.594 0-29.832z"/></svg>'
};
const ExclamationCircleFilled = {
  name: "exclamation-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 1024c282.752 0 512-229.248 512-512S794.752 0 512 0 0 229.248 0 512s229.248 512 512 512zm25.6-405.333h-51.2a17.067 17.067 0 0 1-17.067-17.067V251.733c0-9.386 7.68-17.066 17.067-17.066h51.2c9.387 0 17.067 7.68 17.067 17.066V601.6a17.067 17.067 0 0 1-17.067 17.067zm0 170.666h-51.2a17.067 17.067 0 0 1-17.067-17.066v-51.2c0-9.387 7.68-17.067 17.067-17.067h51.2c9.387 0 17.067 7.68 17.067 17.067v51.2a17.067 17.067 0 0 1-17.067 17.066z"/></svg>'
};
const ExclamationCircle = {
  name: "exclamation-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 960c247.424 0 448-200.576 448-448S759.424 64 512 64 64 264.576 64 512s200.576 448 448 448Zm0-64c-212.077 0-384-171.923-384-384s171.923-384 384-384 384 171.923 384 384-171.923 384-384 384Zm19.2-576c6.967 0 12.634-5.566 12.796-12.493L544 268.8c0-6.967-5.566-12.634-12.493-12.796L492.8 256c-6.967 0-12.634 5.566-12.796 12.493L480 307.2c0 6.967 5.566 12.634 12.493 12.796L531.2 320Zm0 448c6.967 0 12.634-5.566 12.796-12.493L544 396.8c0-6.967-5.566-12.634-12.493-12.8H492.8c-6.967 0-12.634 5.566-12.796 12.493L480 755.2c0 6.967 5.566 12.634 12.493 12.8H531.2Z"/></svg>'
};
const Expand = {
  name: "expand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M308.288 285.248a15.64 15.64 0 0 1 11.264 4.8L344 314.496a15.68 15.68 0 0 1 0 22.528L151.552 529.536 344 721.984a15.68 15.68 0 0 1 2.56 19.264l-2.56 3.2-24.448 24.512a15.68 15.68 0 0 1-22.528 0L68.8 540.8a15.68 15.68 0 0 1 0-22.592l228.16-228.16a15.68 15.68 0 0 1 11.264-4.8zm407.424 0c4.288 0 8.32 1.664 11.264 4.736L955.2 518.208a15.68 15.68 0 0 1 2.56 19.2l-2.56 3.392-228.224 228.16a15.68 15.68 0 0 1-22.528 0L680 744.512a15.68 15.68 0 0 1 0-22.528l192.448-192.512L680 337.024a15.68 15.68 0 0 1 0-22.528l24.448-24.512a15.68 15.68 0 0 1 11.264-4.8z"/></svg>'
};
const FilterFilled = {
  name: "filter-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M259.776 323.776a12.8 12.8 0 0 1-3.776-9.088V268.8c0-7.04 5.76-12.8 12.8-12.8h486.4c7.04 0 12.8 5.76 12.8 12.8v45.888a12.8 12.8 0 0 1-3.776 9.088L576 512v248.064a12.8 12.8 0 0 1-7.04 11.52l-102.4 51.2a12.8 12.8 0 0 1-18.56-11.52V512L259.776 323.776z"/></svg>'
};
const Holder = {
  name: "holder",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M320 256a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM320 512a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0ZM320 768a64 64 0 1 0 128 0 64 64 0 1 0-128 0Zm256 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"/></svg>'
};
const InfoCircleFilled = {
  name: "info-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 0c282.752 0 512 229.248 512 512s-229.248 512-512 512S0 794.752 0 512 229.248 0 512 0zm25.6 405.333h-51.2a17.067 17.067 0 0 0-17.067 17.067v349.867c0 9.386 7.68 17.066 17.067 17.066h51.2a17.067 17.067 0 0 0 17.067-17.066V422.4a17.067 17.067 0 0 0-17.067-17.067zm0-170.666h-51.2a17.067 17.067 0 0 0-17.067 17.066v51.2c0 9.387 7.68 17.067 17.067 17.067h51.2a17.067 17.067 0 0 0 17.067-17.067v-51.2a17.067 17.067 0 0 0-17.067-17.066z"/></svg>'
};
const InfoCircle = {
  name: "info-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64Zm0 64c-212.077 0-384 171.923-384 384s171.923 384 384 384 384-171.923 384-384-171.923-384-384-384Zm19.2 576c6.967 0 12.634 5.566 12.796 12.493L544 755.2c0 6.967-5.566 12.634-12.493 12.796L492.8 768c-6.967 0-12.634-5.566-12.796-12.493L480 716.8c0-6.967 5.566-12.634 12.493-12.796L531.2 704Zm0-448c6.967 0 12.634 5.566 12.796 12.493L544 627.2c0 6.967-5.566 12.634-12.493 12.8H492.8c-6.967 0-12.634-5.566-12.796-12.493L480 268.8c0-6.967 5.566-12.634 12.493-12.8H531.2Z"/></svg>'
};
const Info = {
  name: "info",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M550.4 768c14.08 0 25.6 11.52 25.6 25.6v76.8a25.6 25.6 0 0 1-25.6 25.6h-76.8a25.6 25.6 0 0 1-25.6-25.6v-76.8c0-14.08 11.52-25.6 25.6-25.6h76.8zm0-576c14.08 0 25.6 11.52 25.6 25.6v460.8a25.6 25.6 0 0 1-25.6 25.6h-76.8a25.6 25.6 0 0 1-25.6-25.6V217.6c0-14.08 11.52-25.6 25.6-25.6h76.8z"/></svg>'
};
const LayoutCompact = {
  name: "layout-compact",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Zm0 192h294.4q12.8 0 12.8 12.8v38.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8v-38.4q0-12.8 12.8-12.8Z"/></svg>'
};
const LayoutLarge = {
  name: "layout-large",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v230.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V204.8q0-12.8 12.8-12.8Zm0 384h294.4q12.8 0 12.8 12.8v230.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V588.8q0-12.8 12.8-12.8Z"/></svg>'
};
const LayoutMedium = {
  name: "layout-medium",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M907.84 713.024a12.8 12.8 0 0 0 0-18.048l-27.136-27.2a12.8 12.8 0 0 0-18.112 0l-126.72 126.72-126.72-126.72a12.8 12.8 0 0 0-18.048 0l-27.2 27.2a12.8 12.8 0 0 0 0 18.048l162.944 162.944a12.8 12.8 0 0 0 18.112 0l162.88-162.944zm0-402.048a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0l-126.72-126.72-126.72 126.72a12.8 12.8 0 0 1-18.048 0L563.84 328.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0l162.88 162.944zM140.8 192h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V204.8q0-12.8 12.8-12.8Zm0 256h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V460.8q0-12.8 12.8-12.8Zm0 256h294.4q12.8 0 12.8 12.8v102.4q0 12.8-12.8 12.8H140.8q-12.8 0-12.8-12.8V716.8q0-12.8 12.8-12.8Z"/></svg>'
};
const LeftDouble = {
  name: "left-double",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M533.504 265.344a32 32 0 0 1 0 45.312L342.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 0 1-45.248 45.248L265.344 533.504a32 32 0 0 1 0-45.248L488.32 265.344a32 32 0 0 1 45.248 0zm224 0a32 32 0 0 1 0 45.312L566.336 501.76a12.8 12.8 0 0 0 0 18.112l192.512 192.512a32 32 0 1 1-45.248 45.248L489.344 533.504a32 32 0 0 1 0-45.248l222.912-222.912a32 32 0 0 1 45.248 0z"/></svg>'
};
const Left = {
  name: "left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M612.224 294.784 404.032 502.976a12.8 12.8 0 0 0 0 18.048l208.192 208.192a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.048 0l-253.44-253.44a12.8 12.8 0 0 1 0-18.048l253.44-253.44a12.8 12.8 0 0 1 18.048 0l27.2 27.136a12.8 12.8 0 0 1 0 18.112z"/></svg>'
};
const Link = {
  name: "link",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M602.496 421.504a192 192 0 0 1 8.64 262.272l-8.64 9.216L421.44 874.048a192 192 0 0 1-280.128-262.336l8.64-9.216 135.68-135.68 45.312 45.248L195.2 647.744a128 128 0 0 0-6.528 174.08l6.528 6.976a128 128 0 0 0 172.864 7.488l8.128-7.488 180.992-180.992a128 128 0 0 0 7.488-172.864l-7.488-8.128 45.312-45.312zm271.488-271.552a192 192 0 0 1 8.64 262.336l-8.64 9.216-135.68 135.744-45.248-45.184 135.68-135.808a128 128 0 0 0 6.528-174.08l-6.528-6.976a128 128 0 0 0-172.8-7.488l-8.192 7.488-180.992 181.12a128 128 0 0 0-7.488 172.8l7.488 8.192-45.248 45.248 1.6 1.664-1.664-1.6a192 192 0 0 1-8.64-262.336l8.64-9.216 181.056-181.056a192 192 0 0 1 271.488 0z"/></svg>'
};
const Loading = {
  name: "loading",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m527.424 64.32 3.712.064a448 448 0 0 1 430.912 432.32v2.368a12.8 12.8 0 0 1-12.8 13.056h-38.336a12.8 12.8 0 0 1-12.8-13.632A384 384 0 0 0 528.64 128.384h-1.792a12.8 12.8 0 0 1-12.608-12.8V77.12a12.8 12.8 0 0 1 13.12-12.8z"/></svg>'
};
const MenuFold = {
  name: "menu-fold",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M888.32 768c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104v-49.792c0-3.904 3.456-7.104 7.68-7.104h752.64zM736 392.576c0-7.168 7.872-11.136 13.248-6.72l143.68 119.488a8.832 8.832 0 0 1 0 13.44l-143.68 119.424c-5.376 4.48-13.248.384-13.248-6.784zM631.68 576c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V583.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm0-192c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V391.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm256.64-192c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104V199.04c0-3.84 3.456-7.04 7.68-7.04h752.64z"/></svg>'
};
const MenuUnfold = {
  name: "menu-unfold",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M888.32 768c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104v-49.792c0-3.904 3.456-7.104 7.68-7.104h752.64zM896 392.576v238.848c0 7.168-7.872 11.264-13.248 6.784l-143.68-119.36a8.832 8.832 0 0 1 0-13.44l143.68-119.552c5.376-4.48 13.248-.448 13.248 6.72zM631.68 576c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V583.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm0-192c4.608 0 8.32 3.2 8.32 7.104v49.792c.064 3.84-3.584 7.04-8.32 7.104H136.32c-4.736-.064-8.384-3.264-8.32-7.104V391.04c0-3.84 3.712-7.104 8.32-7.104h495.36zm256.64-192c4.224 0 7.68 3.2 7.68 7.104v49.792c.064 3.84-3.328 7.04-7.68 7.104H135.68c-4.352-.064-7.744-3.264-7.68-7.104V199.04c0-3.84 3.456-7.04 7.68-7.04h752.64z"/></svg>'
};
const Menu$1 = {
  name: "menu",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M896 140.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8zm0 128v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const Minus = {
  name: "minus",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M896 492.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h742.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const Plus = {
  name: "plus",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M492.8 896c-7.07 0-12.8-5.293-12.8-11.814V544H139.815C133.29 544 128 538.27 128 531.2v-38.4c0-7.07 5.29-12.8 11.815-12.8H480V139.815c0-6.525 5.73-11.815 12.8-11.815h38.4c7.07 0 12.8 5.29 12.8 11.815V480h340.186c6.521 0 11.814 5.73 11.814 12.8v38.4c0 7.07-5.293 12.8-11.814 12.8H544v340.186c0 6.521-5.73 11.814-12.8 11.814h-38.4Z"/></svg>'
};
const QuestionCircleFilled = {
  name: "question-circle-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64zm.853 656.939a48 48 0 1 0 0 96 48 48 0 0 0 0-96zM512 192a192.021 192.021 0 0 0-191.019 172.48 144.576 144.576 0 0 0-.469 6.72 12.8 12.8 0 0 0 12.8 12.8h38.57a12.8 12.8 0 0 0 12.758-11.819c.213-2.773.448-5.077.725-6.933A128.021 128.021 0 0 1 640 384a128 128 0 0 1-128 128h-32v115.2a12.8 12.8 0 0 0 12.8 12.8h38.4a12.8 12.8 0 0 0 12.8-12.8v-53.867A192 192 0 0 0 512 192z"/></svg>'
};
const QuestionCircle = {
  name: "question-circle",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 64a192 192 0 1 1 0 384v-64a128 128 0 1 0-128-128h-64a192 192 0 0 1 192-192zm-32 320h64v115.2a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V512zm32.832 208.96q48 0 48 48t-48 48q-48 0-48-48t48-48Z"/></svg>'
};
const RightDouble = {
  name: "right-double",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M490.752 265.344a32 32 0 0 0 0 45.312L681.92 501.824a12.8 12.8 0 0 1 0 18.112L489.344 712.448a32 32 0 0 0 45.312 45.248l224.192-224.192a32 32 0 0 0 0-45.248L536 265.344a32 32 0 0 0-45.248 0zm-224 0a32 32 0 0 0 0 45.312L457.92 501.76a12.8 12.8 0 0 1 0 18.112L265.344 712.384a32 32 0 1 0 45.312 45.248L534.848 533.44a32 32 0 0 0 0-45.248L312 265.344a32 32 0 0 0-45.248 0z"/></svg>'
};
const Right = {
  name: "right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m411.776 294.784 208.192 208.192a12.8 12.8 0 0 1 0 18.048L411.776 729.216a12.8 12.8 0 0 0 0 18.112l27.2 27.136a12.8 12.8 0 0 0 18.048 0l253.44-253.44a12.8 12.8 0 0 0 0-18.048l-253.44-253.44a12.8 12.8 0 0 0-18.048 0l-27.2 27.136a12.8 12.8 0 0 0 0 18.112z"/></svg>'
};
const RotateLeft = {
  name: "rotate-left",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M768 396.8v550.4a12.8 12.8 0 0 1-12.8 12.8H76.8A12.8 12.8 0 0 1 64 947.2V396.8c0-7.04 5.76-12.8 12.8-12.8h678.4c7.04 0 12.8 5.76 12.8 12.8zM704 448H128v448h576V448zM462.208 319.616a12.8 12.8 0 0 1-9.088-21.888L665.28 85.824a12.8 12.8 0 0 1 21.888 9.024v160.768A288 288 0 0 1 960 529.664v.512a12.8 12.8 0 0 1-12.48 13.056h-39.68a11.904 11.904 0 0 1-11.072-7.68l-.768-3.584a224 224 0 0 0-211.392-212.416z"/></svg>'
};
const RotateRight = {
  name: "rotate-right",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M256 396.8v550.4c0 7.04 5.76 12.8 12.8 12.8h678.4a12.8 12.8 0 0 0 12.8-12.8V396.8a12.8 12.8 0 0 0-12.8-12.8H268.8a12.8 12.8 0 0 0-12.8 12.8zm64 51.2h576v448H320V448zm241.792-128.384a12.8 12.8 0 0 0 8.96-21.888L358.72 85.824a12.8 12.8 0 0 0-21.888 9.024v160.768A288 288 0 0 0 64 529.664v.512a12.8 12.8 0 0 0 12.48 13.056h39.68c4.992 0 9.344-3.2 11.072-7.68l.768-3.584a224 224 0 0 1 211.392-212.416z"/></svg>'
};
const Search = {
  name: "search",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path fill-rule="evenodd" d="M448 96c212.077 0 384 171.923 384 384 0 86.337-28.493 166.019-76.588 230.155l154.027 154.163c4.991 5.003 4.99 13.104-.004 18.106l-27.011 27.011c-5.002 4.993-13.103 4.995-18.106.004L712.82 758.076C643.925 823.709 550.668 864 448 864 235.923 864 64 692.077 64 480S235.923 96 448 96Zm0 64c-176.731 0-320 143.269-320 320s143.269 320 320 320 320-143.269 320-320-143.269-320-320-320Z"/></svg>'
};
const StarFilled = {
  name: "star-filled",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M652.181 340.395 523.243 78.955a12.8 12.8 0 0 0-22.955 0L371.2 340.395a12.8 12.8 0 0 1-9.621 6.997L73.024 389.376A12.8 12.8 0 0 0 65.92 411.2l208.81 203.499a12.8 12.8 0 0 1 3.691 11.306L229.12 913.493a12.8 12.8 0 0 0 18.56 13.504l258.09-135.744a12.8 12.8 0 0 1 11.905 0l258.133 135.744a12.8 12.8 0 0 0 18.56-13.504l-49.323-287.381a12.8 12.8 0 0 1 3.691-11.328l208.853-203.563a12.8 12.8 0 0 0-7.104-21.824l-288.682-41.984a12.8 12.8 0 0 1-9.643-6.997z"/></svg>'
};
const Success = {
  name: "success",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M264.384 443.52a25.6 25.6 0 0 1 36.224 0L463.552 606.4 762.24 307.712a25.6 25.6 0 0 1 36.16 0l54.336 54.272a25.6 25.6 0 0 1 0 36.224L481.6 769.28a25.6 25.6 0 0 1-36.16 0L210.112 534.016a25.6 25.6 0 0 1 0-36.224l54.272-54.336z"/></svg>'
};
const TreeExpand = {
  name: "tree-expand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M179.2 192c7.04 0 12.8 5.76 12.8 12.8V256h51.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h179.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H320v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H268.8a12.8 12.8 0 0 1-12.8-12.8V576H140.8a12.8 12.8 0 0 1-12.8-12.8V204.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm704 576c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H524.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h358.4zm-64-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H460.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h358.4zm-64-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H332.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4z"/></svg>'
};
const TreeUnexpand = {
  name: "tree-unexpand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M179.2 192c7.04 0 12.8 5.76 12.8 12.8V256h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H192v192h115.2c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8V204.8c0-7.04 5.76-12.8 12.8-12.8h38.4zm704 576c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4zm0-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4zm0-256c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H396.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h486.4z"/></svg>'
};
const Uncollapse = {
  name: "uncollapse",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M204.8 128a12.8 12.8 0 0 0-12.8 12.8v742.4c0 7.04 5.76 12.8 12.8 12.8h38.4a12.8 12.8 0 0 0 12.8-12.8V140.8a12.8 12.8 0 0 0-12.8-12.8h-38.4zm266.176 76.224-27.2 27.2a12.8 12.8 0 0 0 0 18.112l262.528 262.4-262.528 262.528a12.8 12.8 0 0 0 0 18.112l27.2 27.136a12.8 12.8 0 0 0 18.048 0l298.688-298.688a12.8 12.8 0 0 0 0-18.112L489.024 204.224a12.8 12.8 0 0 0-18.048 0z"/></svg>'
};
const Unexpand = {
  name: "unexpand",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m344 744.512-24.448 24.448a15.68 15.68 0 0 1-22.528 0L68.8 540.8a15.68 15.68 0 0 1 0-22.592l228.16-228.16a15.68 15.68 0 0 1 22.528 0l24.448 24.448a15.68 15.68 0 0 1 0 22.528L151.552 529.536 344 721.984a15.68 15.68 0 0 1 0 22.528zm289.472-522.56-182.72 632.256a15.552 15.552 0 0 1-19.072 10.752l-30.4-8.32a15.872 15.872 0 0 1-10.752-19.584L573.184 204.8a15.552 15.552 0 0 1 19.072-10.752l30.4 8.32c8.32 2.496 13.184 11.264 10.816 19.648zM955.2 540.8 726.976 768.96a15.68 15.68 0 0 1-22.528 0L680 744.512a15.68 15.68 0 0 1 0-22.528l192.448-192.512L680 337.024a15.68 15.68 0 0 1 0-22.528l24.448-24.512a15.68 15.68 0 0 1 22.528 0L955.2 518.208a15.68 15.68 0 0 1 0 22.528z"/></svg>'
};
const Up = {
  name: "up",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m294.784 612.224 208.192-208.192a12.8 12.8 0 0 1 18.048 0l208.192 208.192a12.8 12.8 0 0 0 18.112 0l27.136-27.2a12.8 12.8 0 0 0 0-18.048l-253.44-253.44a12.8 12.8 0 0 0-18.048 0l-253.44 253.44a12.8 12.8 0 0 0 0 18.048l27.136 27.2a12.8 12.8 0 0 0 18.112 0z"/></svg>'
};
const User = {
  name: "user",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M512 64a256 256 0 1 1 0 512 256 256 0 0 1 0-512zm0 64a192 192 0 1 0 0 384 192 192 0 0 0 0-384z"/><path d="M512 512c-224.768 0-407.872 146.24-415.744 369.088l-.192 20.48.512 13.376.448 7.872a44.8 44.8 0 0 0 44.672 42.112l740.48.64a44.8 44.8 0 0 0 44.8-42.048l.768-15.36L928 896c0-229.76-186.24-384-416-384zm0 64c194.432 0 352 125.568 352 320l-.128 5.568L160 900.864V896c0-194.432 157.568-320 352-320z"/></svg>'
};
const VerticalAlignCenter = {
  name: "vertical-align-center",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M470.84 596.02c3.999-4 9.985-4.799 14.78-2.4l3.322 2.4 162.917 162.917c4 4 4.799 9.986 2.4 14.78l-2.4 3.322-27.153 27.153c-3.999 3.999-9.985 4.799-14.78 2.4l-3.322-2.4L512 709.568V947.2c0 7.07-5.73 12.8-12.8 12.8h-38.4c-7.07 0-12.8-5.73-12.8-12.8V709.312l-94.823 94.88c-3.999 3.999-9.986 4.799-14.78 2.4l-3.322-2.4-27.153-27.153c-3.999-3.999-4.799-9.986-2.4-14.78l2.4-3.322L470.84 596.02zM819.2 448c7.07 0 12.8 5.73 12.8 12.8v38.4c0 7.07-5.73 12.8-12.8 12.8H140.8c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8h678.4zM499.2 0c5.891 0 10.853 3.98 12.343 9.397L512 12.8v237.504l94.59-94.53c4.998-5 13.103-5 18.101 0l27.153 27.152c4.999 4.999 4.999 13.104 0 18.102L488.927 363.945c-4.999 5-13.103 5-18.102 0L307.908 201.028c-5-4.999-5-13.103 0-18.102l27.152-27.153c5-4.999 13.104-4.999 18.102 0L448 250.56V12.8c0-5.891 3.98-10.853 9.397-12.343L460.8 0h38.4z"/></svg>'
};
const VerticalAlignTop = {
  name: "vertical-align-top",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="m488.96 276.032 162.88 162.944a12.8 12.8 0 0 1 0 18.048l-27.136 27.2a12.8 12.8 0 0 1-18.112 0L512 389.568V883.2a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8V389.312l-94.784 94.912a12.8 12.8 0 0 1-18.112 0L307.84 456.96a12.8 12.8 0 0 1 0-18.048l162.944-162.944a12.8 12.8 0 0 1 18.112 0zM819.2 128c7.04 0 12.8 5.76 12.8 12.8v38.4a12.8 12.8 0 0 1-12.8 12.8H140.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h678.4z"/></svg>'
};
const ZoomIn = {
  name: "zoom-in",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M448 96a384 384 0 0 1 307.392 614.208l154.24 154.112a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.112 0L712.832 758.08A384 384 0 1 1 448 96zm0 64a320 320 0 1 0 0 640 320 320 0 0 0 0-640z"/><path d="M428.8 255.68h38.4c7.04 0 12.8 5.76 12.8 12.8v422.4a12.8 12.8 0 0 1-12.8 12.8h-38.4a12.8 12.8 0 0 1-12.8-12.8v-422.4c0-7.04 5.76-12.8 12.8-12.8z"/><path d="M672 460.48v38.4a12.8 12.8 0 0 1-12.8 12.8H236.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const ZoomOut = {
  name: "zoom-out",
  svg: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M448 96a384 384 0 0 1 307.392 614.208l154.24 154.112a12.8 12.8 0 0 1 0 18.112l-27.2 27.136a12.8 12.8 0 0 1-18.112 0L712.832 758.08A384 384 0 1 1 448 96zm0 64a320 320 0 1 0 0 640 320 320 0 0 0 0-640z"/><path d="M672 460.48v38.4a12.8 12.8 0 0 1-12.8 12.8H236.8a12.8 12.8 0 0 1-12.8-12.8v-38.4c0-7.04 5.76-12.8 12.8-12.8h422.4c7.04 0 12.8 5.76 12.8 12.8z"/></svg>'
};
const IDUX_ICON_DEPENDENCIES = [
  Bulb,
  CaretDownFilled,
  CaretUpFilled,
  Check,
  CheckCircle,
  CheckCircleFilled,
  Clear,
  ClockCircle,
  Close,
  CloseCircle,
  CloseCircleFilled,
  Collapse,
  DialogClose,
  DoubleLeft,
  DoubleRight,
  Down,
  Ellipsis,
  Empty,
  ExclamationCircle,
  ExclamationCircleFilled,
  FilterFilled,
  Holder,
  Info,
  InfoCircle,
  InfoCircleFilled,
  LayoutCompact,
  LayoutLarge,
  LayoutMedium,
  Left,
  LeftDouble,
  Loading,
  Menu$1,
  MenuFold,
  MenuUnfold,
  Minus,
  Plus,
  QuestionCircle,
  QuestionCircleFilled,
  Right,
  RightDouble,
  RotateLeft,
  RotateRight,
  Search,
  Success,
  StarFilled,
  User,
  Uncollapse,
  TreeExpand,
  TreeUnexpand,
  VerticalAlignCenter,
  VerticalAlignTop,
  ZoomIn,
  ZoomOut
];
const IxIcon = Icon;
function numFormatter(value, precision) {
  const separator = ".";
  const numReg = /^(\d+)(\.(\d+))?$/;
  const numMatchRet = String(value).match(numReg);
  if (!numMatchRet) {
    return {
      value: String(value),
      int: "",
      decimal: ""
    };
  } else {
    const int = String(numMatchRet[1]);
    let decimal = String(numMatchRet[3] || "").slice(0, precision).padEnd(precision, "0");
    decimal = decimal.length > 0 ? `${separator}${decimal}` : "";
    return {
      value: `${int}${decimal}`,
      int,
      decimal
    };
  }
}
const defaultConfig$1 = {
  common: {
    prefixCls: "ix",
    overlayZIndex: 1e3,
    theme: "default"
  },
  locale: zhCN$1,
  alert: {
    closable: false,
    icon: {
      success: "check-circle",
      error: "info-circle",
      info: "bulb",
      warning: "exclamation-circle",
      offline: "exclamation-circle"
    }
  },
  anchor: {
    bounds: 5,
    hideLinkBall: false
  },
  avatar: {
    gap: 4,
    icon: "user",
    shape: "circle",
    size: "md"
  },
  backTop: {
    duration: 450,
    visibilityHeight: 400
  },
  badge: {
    showZero: false,
    dot: false,
    overflowCount: 99
  },
  button: {
    size: "md",
    waveless: false
  },
  card: {
    borderless: false,
    hoverable: false,
    size: "md"
  },
  carousel: {
    autoplayTime: 0,
    dotPlacement: "bottom",
    showArrow: false,
    trigger: "click"
  },
  cascader: {
    borderless: false,
    clearIcon: "close-circle",
    childrenKey: "children",
    expandIcon: "right",
    fullPath: true,
    getKey: "key",
    labelKey: "label",
    overlayMatchWidth: false,
    size: "md",
    suffix: "down"
  },
  checkbox: {
    size: "md",
    waveless: false
  },
  collapse: {
    accordion: false,
    borderless: false,
    expandIcon: "right",
    ghost: false,
    size: "md"
  },
  datePicker: {
    allowInput: false,
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    suffix: "calendar"
  },
  desc: {
    col: 3,
    colonless: false,
    labelAlign: "end",
    layout: "horizontal",
    size: "md"
  },
  divider: {
    dashed: false,
    labelPlacement: "center",
    plain: false,
    size: "md"
  },
  drawer: {
    closable: true,
    closeOnEsc: true,
    closeIcon: "dialog-close",
    height: 256,
    mask: true,
    maskClosable: true,
    width: 480
  },
  dropdown: {
    autoAdjust: true,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "bottomStart",
    showArrow: false,
    trigger: "hover"
  },
  empty: {},
  form: {
    colonless: false,
    labelAlign: "end",
    layout: "horizontal",
    size: "md",
    labelTooltipIcon: "question-circle",
    controlTooltipIcon: "info-circle"
  },
  icon: {},
  input: {
    borderless: false,
    clearable: false,
    clearIcon: "close-circle",
    size: "md",
    trim: false
  },
  inputNumber: {
    keyboard: true,
    size: "md"
  },
  list: {
    size: "md",
    borderless: true
  },
  loadingBar: {
    mask: false,
    animation: {
      loading: {
        duration: 3e3,
        progress: 80
      },
      finish: {
        duration: 300,
        progress: 100
      },
      error: {
        duration: 400,
        progress: 100
      }
    }
  },
  image: {
    preview: true
  },
  imageViewer: {
    loop: true,
    maskClosable: true,
    zoom: [0.5, 2]
  },
  menu: {
    getKey: "key",
    indent: 16,
    offset: [0, 8],
    suffix: "right",
    theme: "light"
  },
  message: {
    destroyOnHover: false,
    duration: 3e3,
    maxCount: 5,
    icon: {
      success: "check-circle-filled",
      error: "close-circle-filled",
      info: "info-circle-filled",
      warning: "exclamation-circle-filled",
      loading: "loading"
    }
  },
  modal: {
    centered: false,
    closable: true,
    closeIcon: "dialog-close",
    closeOnEsc: true,
    mask: true,
    maskClosable: true
  },
  notification: {
    destroyOnHover: false,
    duration: 4500,
    maxCount: 5,
    offset: 24,
    placement: "topEnd"
  },
  pagination: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showQuickJumper: false,
    showSizeChanger: false,
    showTitle: true,
    showTotal: true,
    simple: false,
    size: "md"
  },
  popconfirm: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    trigger: "click",
    offset: [0, 4]
  },
  popover: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    placement: "top",
    showArrow: true,
    trigger: "hover",
    closeIcon: "close",
    offset: [0, 4]
  },
  progress: {
    strokeLinecap: "round",
    size: "md",
    format: (percent) => percent + "%",
    icon: {
      success: "check",
      exception: "close"
    }
  },
  radio: {
    size: "md",
    waveless: false
  },
  rate: {
    allowHalf: false,
    clearable: false,
    count: 5,
    icon: "star-filled",
    size: "md"
  },
  result: {
    status: "info"
  },
  row: {
    wrap: true
  },
  select: {
    borderless: false,
    childrenKey: "children",
    getKey: "key",
    clearIcon: "close-circle",
    labelKey: "label",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  skeleton: {
    animated: true
  },
  space: {
    size: 8,
    wrap: true
  },
  spin: {
    tip: "",
    tipAlign: "vertical",
    size: "md"
  },
  statistic: {
    precision: 0,
    formatter: numFormatter
  },
  stepper: {
    clickable: false,
    labelPlacement: "end",
    size: "md"
  },
  switch: {
    size: "md"
  },
  tabs: {
    size: "md"
  },
  table: {
    autoHeight: false,
    borderless: true,
    childrenKey: "children",
    getKey: "key",
    size: "md",
    scrollToTopOnChange: true,
    pagination: {
      position: "bottomEnd"
    },
    columnBase: {
      align: "start",
      sortable: {
        nextTooltip: false,
        orders: ["ascend", "descend"]
      },
      filterable: {
        multiple: true,
        footer: true
      }
    },
    columnExpandable: {
      icon: "right"
    },
    columnSelectable: {
      showIndex: false
    },
    columnIndexable: {
      align: "center",
      customCell: ({ rowIndex, pageSize, pageIndex }) => (pageIndex - 1) * pageSize + rowIndex + 1
    }
  },
  tag: {},
  tagGroup: {
    gap: 8,
    wrap: true
  },
  textarea: {
    autoRows: false,
    clearable: false,
    clearIcon: "close-circle",
    resize: "vertical",
    showCount: false,
    size: "md",
    trim: false
  },
  timePicker: {
    borderless: false,
    clearable: true,
    clearIcon: "close-circle",
    size: "md",
    suffix: "clock-circle",
    allowInput: false,
    format: "HH:mm:ss"
  },
  transfer: {
    getKey: "key",
    clearable: true,
    clearIcon: "clear",
    showSelectAll: true
  },
  tooltip: {
    autoAdjust: true,
    delay: 100,
    destroyOnHide: false,
    offset: [0, 4],
    placement: "top",
    trigger: "hover"
  },
  tree: {
    autoHeight: false,
    blocked: false,
    childrenKey: "children",
    expandIcon: "right",
    draggableIcon: "holder",
    getKey: "key",
    labelKey: "label",
    showLine: false
  },
  treeSelect: {
    borderless: false,
    childrenKey: "children",
    clearIcon: "close-circle",
    labelKey: "label",
    getKey: "key",
    offset: [0, 4],
    overlayMatchWidth: true,
    size: "md",
    suffix: "down"
  },
  upload: {
    multiple: false,
    dragable: false,
    directory: false,
    name: "file",
    withCredentials: false,
    requestMethod: "post"
  },
  uploadFiles: {
    type: "text",
    icon: {
      file: "paper-clip",
      remove: "close",
      retry: "edit"
    }
  }
};
const tokens$1 = Object.keys(defaultConfig$1).map((key) => [key, Symbol(key)]);
const tokenMap$1 = new Map(tokens$1);
const createGlobalConfig$1 = (config) => {
  const install2 = (app2) => {
    const compNames = Object.keys(config);
    compNames.forEach((compName) => {
      const token = tokenMap$1.get(compName);
      const currConfig = cloneDeep(defaultConfig$1[compName]);
      merge$1(currConfig, config[compName]);
      app2.provide(token, currConfig);
    });
  };
  return { install: install2 };
};
function useGlobalConfig$1(compName, config) {
  const token = tokenMap$1.get(compName);
  const currConfig = inject(token, defaultConfig$1[compName]);
  if (!config) {
    return currConfig;
  }
  const newConfig = reactive(merge$1(cloneDeep(currConfig), config));
  provide(token, newConfig);
  return [newConfig, (config2) => merge$1(newConfig, config2)];
}
const waveProps = {};
var Wave = /* @__PURE__ */ defineComponent({
  name: "ɵWave",
  props: waveProps,
  setup(_, {
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-wave`);
    const selfRef = ref();
    const play = () => {
      nextTick(() => {
        if (selfRef.value && selfRef.value.parentElement && selfRef.value.animate) {
          const borderColor = getComputedStyle(selfRef.value.parentElement).borderColor;
          selfRef.value.animate([{
            opacity: 0.6,
            boxShadow: `0 0 1px 0 ${borderColor}`,
            zIndex: 1,
            easing: "cubic-bezier(0, 0, 0.2, 1)"
          }, {
            opacity: 0,
            zIndex: 0,
            boxShadow: `0 0 1px 5px ${borderColor}`
          }], 600);
        }
      });
    };
    expose({
      play
    });
    return () => {
      return createVNode("div", {
        "ref": selfRef,
        "aria-hidden": true,
        "class": mergedPrefixCls.value
      }, null);
    };
  }
});
const ɵWave = Wave;
const defaultName$1 = "此项";
const zhCNMessages = {
  default: (_, control) => {
    var _a2;
    return `${(_a2 = control.name) != null ? _a2 : ""}验证失败`;
  },
  required: (_, control) => {
    const { name = defaultName$1, example } = control;
    return `请输入${name}${example ? ", 例: " + example : ""}`;
  },
  requiredTrue: (_, control) => {
    const { name = defaultName$1 } = control;
    return `${name}必须为 'true'`;
  },
  email: (_, control) => {
    const { example } = control;
    return `请输入正确的邮箱格式${example ? ", 例: " + example : ""}`;
  },
  min: (err, __) => {
    return `请输入不小于 ${err.min} 的数字`;
  },
  max: (err, __) => {
    return `请输入不大于 ${err.max} 的数字`;
  },
  range: (err, __) => {
    return `请输入 ${err.min}-${err.max} 之间的数字`;
  },
  minLength: (err, __) => {
    const { minLength, isArray: isArray2 } = err;
    return isArray2 ? `请至少选择 ${minLength} 项` : `请至少输入 ${minLength} 个字符`;
  },
  maxLength: (err, __) => {
    const { maxLength, isArray: isArray2 } = err;
    return isArray2 ? `请至多选择 ${maxLength} 项` : `请至多输入 ${maxLength} 个字符`;
  },
  rangeLength: (err, __) => {
    const { minLength, maxLength, isArray: isArray2 } = err;
    return isArray2 ? `请选择 ${minLength}-${maxLength} 项` : `请输入 ${minLength}-${maxLength} 个字符`;
  },
  pattern: (_, control) => {
    const { example } = control;
    return `请输入正确的格式${example ? ", 例: " + example : ""}`;
  }
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const emailRegexp = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const _Validators = class {
  static setMessages(messages, locale2) {
    _Validators.messages = mergedLocaleMessages(_Validators.messages, messages, locale2);
  }
  static getMessage(key) {
    return _Validators.messages[key];
  }
  static getError(key, control, errorContext = {}) {
    let message = void 0;
    const validMessage = _Validators.messages[key] || _Validators.messages.default;
    if (isFunction(validMessage)) {
      message = validMessage(errorContext, control);
    } else {
      message = validMessage;
    }
    return { ...errorContext, message };
  }
  static required(value, control) {
    if (isEmpty(value)) {
      return { required: _Validators.getError("required", control) };
    }
    return void 0;
  }
  static requiredTrue(value, control) {
    if (value === true) {
      return void 0;
    }
    return { requiredTrue: _Validators.getError("requiredTrue", control, { actual: value }) };
  }
  static email(value, control) {
    if (isEmpty(value) || emailRegexp.test(value)) {
      return void 0;
    }
    return { email: _Validators.getError("email", control, { actual: value }) };
  }
  static min(min) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min) {
        return void 0;
      }
      return { min: _Validators.getError("min", control, { min, actual: value }) };
    };
  }
  static max(max) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) <= max) {
        return void 0;
      }
      return { max: _Validators.getError("max", control, { max, actual: value }) };
    };
  }
  static range(min, max) {
    return (value, control) => {
      if (isEmpty(value) || !isNumeric(value) || Number(value) >= min && Number(value) <= max) {
        return void 0;
      }
      return { range: _Validators.getError("range", control, { min, max, actual: value }) };
    };
  }
  static minLength(minLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength) {
        return void 0;
      }
      return {
        minLength: _Validators.getError("minLength", control, {
          minLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static maxLength(maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length <= maxLength) {
        return void 0;
      }
      return {
        maxLength: _Validators.getError("maxLength", control, {
          maxLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static rangeLength(minLength, maxLength) {
    return (value, control) => {
      if (isEmpty(value) || !hasLength(value) || value.length >= minLength && value.length <= maxLength) {
        return void 0;
      }
      return {
        rangeLength: _Validators.getError("rangeLength", control, {
          minLength,
          maxLength,
          actual: value.length,
          isArray: isArray$1$1(value)
        })
      };
    };
  }
  static pattern(pattern) {
    if (!pattern) {
      return _Validators.nullValidator;
    }
    let regex;
    let regexStr;
    if (typeof pattern === "string") {
      regexStr = "";
      if (pattern.charAt(0) !== "^") {
        regexStr += "^";
      }
      regexStr += pattern;
      if (pattern.charAt(pattern.length - 1) !== "$") {
        regexStr += "$";
      }
      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (value, control) => {
      if (isEmpty(value) || regex.test(value)) {
        return void 0;
      }
      return { pattern: _Validators.getError("pattern", control, { pattern: regexStr, actual: value }) };
    };
  }
  static nullValidator(_, _control) {
    return void 0;
  }
  static compose(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => mergeMessages(executeValidators(value, control, presentValidators));
  }
  static composeAsync(validators) {
    if (!validators) {
      return void 0;
    }
    const presentValidators = validators.filter(isFunction);
    if (presentValidators.length == 0) {
      return void 0;
    }
    return (value, control) => {
      const ValidateErrors = executeValidators(value, control, presentValidators);
      return Promise.all(ValidateErrors).then(mergeMessages);
    };
  }
};
let Validators = _Validators;
__publicField$2(Validators, "messages", mergedLocaleMessages({}, zhCNMessages, "zh-CN"));
function isEmpty(val) {
  return isNil(val) || (isString(val) || isArray$1$1(val)) && val.length === 0;
}
function hasLength(val) {
  return !isNil(val) && isNumber(val.length);
}
function executeValidators(value, control, validators) {
  return validators.map((validator) => validator(value, control));
}
function mergeMessages(validateErrors) {
  let res = {};
  validateErrors.forEach((errors) => {
    res = isNil(errors) ? res : { ...res, ...errors };
  });
  return Object.keys(res).length === 0 ? void 0 : res;
}
function mergedLocaleMessages(currMessages, newMessages, locale2) {
  if (!locale2) {
    return merge$1(currMessages, newMessages);
  }
  const messageWithLocale = {};
  Object.keys(newMessages).forEach((key) => {
    messageWithLocale[key] = { [locale2]: newMessages[key] };
  });
  return merge$1(currMessages, messageWithLocale);
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = convertArray(currentValidators);
  const validatorsToAdd = convertArray(validators);
  validatorsToAdd.forEach((v2) => {
    if (!hasValidator(current, v2)) {
      current.push(v2);
    }
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return convertArray(currentValidators).filter((v2) => !hasValidator(validators, v2));
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isOptions(val) {
  return isPlainObject(val);
}
function toValidator(validator) {
  return isArray$1$1(validator) ? Validators.compose(validator) : validator;
}
function toAsyncValidator(asyncValidator) {
  return isArray$1$1(asyncValidator) ? Validators.composeAsync(asyncValidator) : asyncValidator;
}
let controlId = 0;
class AbstractControl {
  constructor(controls, validatorOrOptions, asyncValidator, initValue) {
    __publicField$1(this, "uid", controlId++);
    __publicField$1(this, "controls");
    __publicField$1(this, "valueRef");
    __publicField$1(this, "status");
    __publicField$1(this, "errors");
    __publicField$1(this, "valid");
    __publicField$1(this, "invalid");
    __publicField$1(this, "validating");
    __publicField$1(this, "disabled");
    __publicField$1(this, "blurred");
    __publicField$1(this, "unblurred");
    __publicField$1(this, "dirty");
    __publicField$1(this, "pristine");
    __publicField$1(this, "name");
    __publicField$1(this, "example");
    __publicField$1(this, "_controls");
    __publicField$1(this, "_valueRef");
    __publicField$1(this, "_status");
    __publicField$1(this, "_controlsStatus");
    __publicField$1(this, "_errors");
    __publicField$1(this, "_disabled");
    __publicField$1(this, "_disabledFn");
    __publicField$1(this, "_blurred", ref(false));
    __publicField$1(this, "_dirty", ref(false));
    __publicField$1(this, "_initializing", ref(true));
    __publicField$1(this, "_validators");
    __publicField$1(this, "_composedValidators");
    __publicField$1(this, "_asyncValidators");
    __publicField$1(this, "_composedAsyncValidators");
    __publicField$1(this, "_parent");
    __publicField$1(this, "_trigger");
    this._controls = shallowRef(controls);
    this._valueRef = shallowRef(initValue != null ? initValue : this._calculateInitValue());
    this._forEachControls((control) => control.setParent(this));
    this._convertOptions(validatorOrOptions, asyncValidator);
    this._init();
  }
  get parent() {
    return this._parent;
  }
  get root() {
    let root2 = this;
    while (root2.parent) {
      root2 = root2.parent;
    }
    return root2;
  }
  get trigger() {
    var _a2, _b, _c;
    return (_c = (_b = this._trigger) != null ? _b : (_a2 = this._parent) == null ? void 0 : _a2.trigger) != null ? _c : "change";
  }
  reset() {
    if (this._controls.value) {
      this._forEachControls((control) => control.reset());
    } else {
      const currValue = this._valueRef.value;
      const initValue = this._calculateInitValue();
      if (currValue !== initValue) {
        this._valueRef.value = initValue;
      } else {
        this._validate();
      }
      this.markAsUnblurred();
      this.markAsPristine();
    }
  }
  async validate() {
    if (!this._disabled.value && this._controls.value) {
      const validates = [];
      this._forEachControls((control) => validates.push(control.validate()));
      if (validates.length > 0) {
        await Promise.all(validates);
      }
    }
    return this._validate();
  }
  disable() {
    this._disabled.value = true;
    this._errors.value = void 0;
    if (this._controls.value) {
      this._forEachControls((control) => control.disable());
    }
  }
  enable() {
    this._disabled.value = false;
    if (this._controls.value) {
      this._forEachControls((control) => control.enable());
    }
    this._validate();
  }
  markAsBlurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsBlurred());
    } else {
      this._blurred.value = true;
    }
    if (this.trigger === "blur") {
      this._validate();
    }
  }
  markAsUnblurred() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsUnblurred());
    } else {
      this._blurred.value = false;
    }
  }
  markAsDirty() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsDirty());
    } else {
      this._dirty.value = true;
    }
  }
  markAsPristine() {
    if (this._controls.value) {
      this._forEachControls((control) => control.markAsPristine());
    } else {
      this._dirty.value = false;
    }
  }
  setValidators(newValidators) {
    this._validators = newValidators;
    this._composedValidators = toValidator(newValidators);
  }
  setAsyncValidators(newAsyncValidators) {
    this._asyncValidators = newAsyncValidators;
    this._composedAsyncValidators = toAsyncValidator(newAsyncValidators);
  }
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._validators));
  }
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._asyncValidators));
  }
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._validators));
  }
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._asyncValidators));
  }
  clearValidators() {
    this.setValidators(void 0);
  }
  clearAsyncValidators() {
    this.setAsyncValidators(void 0);
  }
  hasValidator(validator) {
    return hasValidator(this._validators, validator);
  }
  hasAsyncValidator(validator) {
    return hasValidator(this._asyncValidators, validator);
  }
  get(path) {
    if (isNil(path)) {
      return void 0;
    }
    const currPath = isString(path) ? path.split(".") : convertArray(path);
    if (currPath.length === 0) {
      return void 0;
    }
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  setErrors(errors, path) {
    var _a2;
    if (!isNil(path)) {
      (_a2 = this.get(path)) == null ? void 0 : _a2.setErrors(errors);
    } else {
      this._errors.value = errors;
    }
  }
  clearErrors(path) {
    this.setErrors(void 0, path);
  }
  getError(errorCode, path) {
    var _a2, _b;
    const control = path ? this.get(path) : this;
    return (_b = (_a2 = control == null ? void 0 : control._errors) == null ? void 0 : _a2.value) == null ? void 0 : _b[errorCode];
  }
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  setParent(parent) {
    this._parent = parent;
  }
  watchValue(cb, options) {
    return watch(this.valueRef, cb, options);
  }
  watchStatus(cb, options) {
    return watch(this.status, cb, options);
  }
  async _validate() {
    let newErrors = void 0;
    if (!this._disabled.value) {
      let value = void 0;
      if (this._composedValidators) {
        value = this.getValue();
        newErrors = this._composedValidators(value, this);
      }
      if (isNil(newErrors) && this._composedAsyncValidators) {
        if (!this._composedValidators) {
          value = this.getValue();
        }
        this._status.value = "validating";
        newErrors = await this._composedAsyncValidators(value, this);
      }
    }
    this.setErrors(newErrors);
    return newErrors;
  }
  _convertOptions(validatorOrOptions, asyncValidator) {
    let _disabled = false;
    if (isOptions(validatorOrOptions)) {
      const { name, example, trigger: trigger2, validators, asyncValidators, disabled } = validatorOrOptions;
      this.name = name;
      this.example = example;
      this.setValidators(validators);
      this.setAsyncValidators(asyncValidators);
      if (trigger2) {
        this._trigger = trigger2;
      }
      if (disabled) {
        if (isFunction(disabled)) {
          _disabled = disabled(this, true);
          this._disabledFn = disabled;
        } else {
          _disabled = true;
        }
        _disabled && this._forEachControls((control) => control.disable());
      }
    } else {
      this.setValidators(validatorOrOptions);
      this.setAsyncValidators(asyncValidator);
    }
    this._disabled = ref(_disabled);
  }
  _init() {
    const current = this;
    current.controls = computed(() => this._controls.value);
    current.valueRef = computed(() => this._valueRef.value);
    this._initErrorsAndStatus();
    current.errors = computed(() => this._errors.value);
    current.status = computed(() => {
      const selfStatus = this._status.value;
      if (selfStatus === "valid") {
        return this._controlsStatus.value;
      }
      return selfStatus;
    });
    current.valid = computed(() => this.status.value === "valid");
    current.invalid = computed(() => this.status.value === "invalid");
    current.validating = computed(() => this.status.value === "validating");
    current.disabled = computed(() => this._disabled.value);
    current.blurred = computed(() => this._blurred.value);
    current.unblurred = computed(() => !this._blurred.value);
    current.dirty = computed(() => this._dirty.value);
    current.pristine = computed(() => !this._dirty.value);
    if (this._disabledFn) {
      nextTick(() => {
        watchEffect(() => {
          this._disabled.value = this._disabledFn(this, false);
        });
      });
    }
  }
  _initErrorsAndStatus() {
    const disabled = this._disabled.value;
    let value;
    let errors;
    let status = "valid";
    let controlsStatus = "valid";
    if (!disabled) {
      if (this._composedValidators) {
        value = this.getValue();
        errors = this._composedValidators(value, this);
      }
      if (errors) {
        status = "invalid";
      }
      this._forEachControls((control) => {
        if (control.status.value === "invalid") {
          controlsStatus = "invalid";
        }
      });
    }
    this._errors = shallowRef(errors);
    this._status = ref(status);
    this._controlsStatus = ref(controlsStatus);
    if (!disabled && status === "valid" && controlsStatus === "valid" && this._composedAsyncValidators) {
      value = this._validators ? value : this.getValue();
      this._status.value = "validating";
      this._composedAsyncValidators(value, this).then((asyncErrors) => {
        this._errors.value = asyncErrors;
        this._status.value = asyncErrors ? "invalid" : "valid";
      });
    }
  }
}
const isAbstractControl = (val) => {
  return val instanceof AbstractControl;
};
const FORMS_CONTROL_TOKEN = Symbol("cdk-forms-control");
function useControl(controlKey = "control") {
  const { props } = getCurrentInstance();
  const parentControl = inject(FORMS_CONTROL_TOKEN, shallowRef());
  const control = shallowRef();
  let watchStop;
  const cleanWatch = () => {
    if (watchStop) {
      watchStop();
      watchStop = void 0;
    }
  };
  tryOnScopeDispose(cleanWatch);
  watch(
    [() => props[controlKey], parentControl],
    ([controlOrPath, pControl]) => {
      cleanWatch();
      if (isAbstractControl(controlOrPath)) {
        control.value = controlOrPath;
      } else if (!!pControl && !isNil(controlOrPath)) {
        watchStop = watch(
          pControl.controls,
          () => {
            const _control = pControl.get(controlOrPath);
            if (!_control) {
              Logger.warn("cdk/forms", `not find control by [${controlOrPath}]`);
            }
            control.value = _control;
          },
          { immediate: true }
        );
      }
    },
    { immediate: true }
  );
  return control;
}
function useAccessor(control, valueKey = "value", disabledKey = "disabled") {
  const accessor = reactive({});
  const { props } = getCurrentInstance();
  let valueStop;
  let disabledStop;
  let tempValueWatchStop;
  const cleanWatch = () => {
    if (valueStop) {
      valueStop();
      valueStop = void 0;
    }
    if (disabledStop) {
      disabledStop();
      disabledStop = void 0;
    }
    if (tempValueWatchStop) {
      tempValueWatchStop();
      tempValueWatchStop = void 0;
    }
  };
  const generateAccessorByControl = (currControl) => {
    valueStop = watch(
      currControl.valueRef,
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch(
      currControl.disabled,
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value, options) => currControl.setValue(value, { dirty: true, ...options });
    accessor.markAsBlurred = () => currControl.markAsBlurred();
  };
  const generateAccessorByProps = () => {
    const tempRef = shallowRef(props[valueKey]);
    tempValueWatchStop = watch(
      () => props[valueKey],
      (value) => tempRef.value = value
    );
    valueStop = watch(
      () => {
        var _a2;
        return (_a2 = props[valueKey]) != null ? _a2 : tempRef.value;
      },
      (value) => {
        accessor.value = value;
      },
      { immediate: true }
    );
    disabledStop = watch(
      () => props[disabledKey],
      (disabled) => {
        accessor.disabled = disabled;
      },
      { immediate: true }
    );
    accessor.setValue = (value) => {
      if (value != toRaw(accessor.value)) {
        tempRef.value = value;
        callEmit(props[`onUpdate:${valueKey}`], value);
      }
    };
    accessor.markAsBlurred = NoopFunction;
  };
  watch(
    () => unref(control),
    (currControl) => {
      cleanWatch();
      if (currControl) {
        generateAccessorByControl(currControl);
      } else {
        generateAccessorByProps();
      }
    },
    { immediate: true }
  );
  tryOnScopeDispose(cleanWatch);
  return accessor;
}
function useAccessorAndControl(options) {
  const { controlKey, valueKey, disabledKey } = options != null ? options : {};
  const control = useControl(controlKey);
  const accessor = useAccessor(control, valueKey, disabledKey);
  return { accessor, control };
}
function useClickOutside(target, handler, options) {
  const { container = window, exclude = [] } = options || {};
  if (!container) {
    return NoopFunction;
  }
  const shouldListen = ref(true);
  let fallback;
  const listener = (evt) => {
    clearTimeout(fallback);
    const targetElement = convertElement(target);
    if (!targetElement || !shouldListen.value) {
      return;
    }
    const eventTarget = evt.target;
    const composedPath = evt.composedPath();
    if (targetElement === eventTarget || composedPath.includes(targetElement) || exclude.some((item) => {
      const element = convertElement(item);
      return element && (element === eventTarget || composedPath.includes(element));
    })) {
      return;
    }
    handler(evt);
  };
  const listenerStops = [
    useEventListener(container, "click", listener, { passive: true, capture: true }),
    useEventListener(
      container,
      "pointerdown",
      (evt) => {
        const targetElement = convertElement(target);
        shouldListen.value = !!targetElement && !evt.composedPath().includes(targetElement);
      },
      { passive: true }
    ),
    useEventListener(
      container,
      "pointerup",
      (evt) => {
        if (evt.button === 0) {
          const path = evt.composedPath();
          evt.composedPath = () => path;
          fallback = setTimeout(() => listener(evt), 50);
        }
      },
      { passive: true }
    )
  ];
  const stop = () => {
    listenerStops.forEach((listenerStop) => listenerStop());
  };
  tryOnScopeDispose(stop);
  return stop;
}
const stopHandleMap = /* @__PURE__ */ new Map();
const createClickOutside = (el, binding) => {
  let stop = stopHandleMap.get(el);
  if (stop) {
    stop();
  }
  if (!binding) {
    return;
  }
  if (isFunction(binding)) {
    stop = useClickOutside(el, binding);
  } else {
    const { handler, ...options } = binding;
    stop = useClickOutside(el, handler, options);
  }
  stopHandleMap.set(el, stop);
};
const vClickOutside = {
  mounted(el, binding) {
    createClickOutside(el, binding.value);
  },
  updated(el, binding) {
    createClickOutside(el, binding.value);
  },
  unmounted(el) {
    const stop = stopHandleMap.get(el);
    if (stop) {
      stop();
    }
    stopHandleMap.delete(el);
  }
};
function t(t2) {
  return t2.split("-")[1];
}
function e(t2) {
  return "y" === t2 ? "height" : "width";
}
function n$1(t2) {
  return t2.split("-")[0];
}
function o$1(t2) {
  return ["top", "bottom"].includes(n$1(t2)) ? "x" : "y";
}
function i$1(i2, r2, a2) {
  let { reference: l2, floating: s2 } = i2;
  const c2 = l2.x + l2.width / 2 - s2.width / 2, f2 = l2.y + l2.height / 2 - s2.height / 2, m2 = o$1(r2), u2 = e(m2), g2 = l2[u2] / 2 - s2[u2] / 2, d2 = "x" === m2;
  let p2;
  switch (n$1(r2)) {
    case "top":
      p2 = { x: c2, y: l2.y - s2.height };
      break;
    case "bottom":
      p2 = { x: c2, y: l2.y + l2.height };
      break;
    case "right":
      p2 = { x: l2.x + l2.width, y: f2 };
      break;
    case "left":
      p2 = { x: l2.x - s2.width, y: f2 };
      break;
    default:
      p2 = { x: l2.x, y: l2.y };
  }
  switch (t(r2)) {
    case "start":
      p2[m2] -= g2 * (a2 && d2 ? -1 : 1);
      break;
    case "end":
      p2[m2] += g2 * (a2 && d2 ? -1 : 1);
  }
  return p2;
}
const r$1 = async (t2, e2, n2) => {
  const { placement: o2 = "bottom", strategy: r2 = "absolute", middleware: a2 = [], platform: l2 } = n2, s2 = a2.filter(Boolean), c2 = await (null == l2.isRTL ? void 0 : l2.isRTL(e2));
  let f2 = await l2.getElementRects({ reference: t2, floating: e2, strategy: r2 }), { x: m2, y: u2 } = i$1(f2, o2, c2), g2 = o2, d2 = {}, p2 = 0;
  for (let n3 = 0; n3 < s2.length; n3++) {
    const { name: a3, fn: h2 } = s2[n3], { x: y2, y: x2, data: w2, reset: v2 } = await h2({ x: m2, y: u2, initialPlacement: o2, placement: g2, strategy: r2, middlewareData: d2, rects: f2, platform: l2, elements: { reference: t2, floating: e2 } });
    m2 = null != y2 ? y2 : m2, u2 = null != x2 ? x2 : u2, d2 = { ...d2, [a3]: { ...d2[a3], ...w2 } }, v2 && p2 <= 50 && (p2++, "object" == typeof v2 && (v2.placement && (g2 = v2.placement), v2.rects && (f2 = true === v2.rects ? await l2.getElementRects({ reference: t2, floating: e2, strategy: r2 }) : v2.rects), { x: m2, y: u2 } = i$1(f2, g2, c2)), n3 = -1);
  }
  return { x: m2, y: u2, placement: g2, strategy: r2, middlewareData: d2 };
};
function a$1(t2) {
  return "number" != typeof t2 ? function(t3) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...t3 };
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l$1(t2) {
  return { ...t2, top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height };
}
async function s$1(t2, e2) {
  var n2;
  void 0 === e2 && (e2 = {});
  const { x: o2, y: i2, platform: r2, rects: s2, elements: c2, strategy: f2 } = t2, { boundary: m2 = "clippingAncestors", rootBoundary: u2 = "viewport", elementContext: g2 = "floating", altBoundary: d2 = false, padding: p2 = 0 } = e2, h2 = a$1(p2), y2 = c2[d2 ? "floating" === g2 ? "reference" : "floating" : g2], x2 = l$1(await r2.getClippingRect({ element: null == (n2 = await (null == r2.isElement ? void 0 : r2.isElement(y2))) || n2 ? y2 : y2.contextElement || await (null == r2.getDocumentElement ? void 0 : r2.getDocumentElement(c2.floating)), boundary: m2, rootBoundary: u2, strategy: f2 })), w2 = "floating" === g2 ? { ...s2.floating, x: o2, y: i2 } : s2.reference, v2 = await (null == r2.getOffsetParent ? void 0 : r2.getOffsetParent(c2.floating)), b2 = await (null == r2.isElement ? void 0 : r2.isElement(v2)) && await (null == r2.getScale ? void 0 : r2.getScale(v2)) || { x: 1, y: 1 }, A2 = l$1(r2.convertOffsetParentRelativeRectToViewportRelativeRect ? await r2.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: w2, offsetParent: v2, strategy: f2 }) : w2);
  return { top: (x2.top - A2.top + h2.top) / b2.y, bottom: (A2.bottom - x2.bottom + h2.bottom) / b2.y, left: (x2.left - A2.left + h2.left) / b2.x, right: (A2.right - x2.right + h2.right) / b2.x };
}
const c$1 = Math.min, f$1 = Math.max;
function m$1(t2, e2, n2) {
  return f$1(t2, c$1(e2, n2));
}
const u$1 = (n2) => ({ name: "arrow", options: n2, async fn(i2) {
  const { element: r2, padding: l2 = 0 } = n2 || {}, { x: s2, y: c2, placement: f2, rects: u2, platform: g2, elements: d2 } = i2;
  if (null == r2)
    return {};
  const p2 = a$1(l2), h2 = { x: s2, y: c2 }, y2 = o$1(f2), x2 = e(y2), w2 = await g2.getDimensions(r2), v2 = "y" === y2, b2 = v2 ? "top" : "left", A2 = v2 ? "bottom" : "right", R2 = v2 ? "clientHeight" : "clientWidth", P2 = u2.reference[x2] + u2.reference[y2] - h2[y2] - u2.floating[x2], E2 = h2[y2] - u2.reference[y2], T2 = await (null == g2.getOffsetParent ? void 0 : g2.getOffsetParent(r2));
  let D2 = T2 ? T2[R2] : 0;
  D2 && await (null == g2.isElement ? void 0 : g2.isElement(T2)) || (D2 = d2.floating[R2] || u2.floating[x2]);
  const L2 = P2 / 2 - E2 / 2, k2 = p2[b2], O2 = D2 - w2[x2] - p2[A2], B = D2 / 2 - w2[x2] / 2 + L2, C2 = m$1(k2, B, O2), H2 = null != t(f2) && B != C2 && u2.reference[x2] / 2 - (B < k2 ? p2[b2] : p2[A2]) - w2[x2] / 2 < 0;
  return { [y2]: h2[y2] - (H2 ? B < k2 ? k2 - B : O2 - B : 0), data: { [y2]: C2, centerOffset: B - C2 } };
} }), g$1 = ["top", "right", "bottom", "left"];
g$1.reduce((t2, e2) => t2.concat(e2, e2 + "-start", e2 + "-end"), []);
const p$1 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function h$1(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => p$1[t3]);
}
function y$1(n2, i2, r2) {
  void 0 === r2 && (r2 = false);
  const a2 = t(n2), l2 = o$1(n2), s2 = e(l2);
  let c2 = "x" === l2 ? a2 === (r2 ? "end" : "start") ? "right" : "left" : "start" === a2 ? "bottom" : "top";
  return i2.reference[s2] > i2.floating[s2] && (c2 = h$1(c2)), { main: c2, cross: h$1(c2) };
}
const x$1 = { start: "end", end: "start" };
function w$1(t2) {
  return t2.replace(/start|end/g, (t3) => x$1[t3]);
}
const b$1 = function(e2) {
  return void 0 === e2 && (e2 = {}), { name: "flip", options: e2, async fn(o2) {
    var i2;
    const { placement: r2, middlewareData: a2, rects: l2, initialPlacement: c2, platform: f2, elements: m2 } = o2, { mainAxis: u2 = true, crossAxis: g2 = true, fallbackPlacements: d2, fallbackStrategy: p2 = "bestFit", fallbackAxisSideDirection: x2 = "none", flipAlignment: v2 = true, ...b2 } = e2, A2 = n$1(r2), R2 = n$1(c2) === c2, P2 = await (null == f2.isRTL ? void 0 : f2.isRTL(m2.floating)), E2 = d2 || (R2 || !v2 ? [h$1(c2)] : function(t2) {
      const e3 = h$1(t2);
      return [w$1(t2), e3, w$1(e3)];
    }(c2));
    d2 || "none" === x2 || E2.push(...function(e3, o3, i3, r3) {
      const a3 = t(e3);
      let l3 = function(t2, e4, n2) {
        const o4 = ["left", "right"], i4 = ["right", "left"], r4 = ["top", "bottom"], a4 = ["bottom", "top"];
        switch (t2) {
          case "top":
          case "bottom":
            return n2 ? e4 ? i4 : o4 : e4 ? o4 : i4;
          case "left":
          case "right":
            return e4 ? r4 : a4;
          default:
            return [];
        }
      }(n$1(e3), "start" === i3, r3);
      return a3 && (l3 = l3.map((t2) => t2 + "-" + a3), o3 && (l3 = l3.concat(l3.map(w$1)))), l3;
    }(c2, v2, x2, P2));
    const T2 = [c2, ...E2], D2 = await s$1(o2, b2), L2 = [];
    let k2 = (null == (i2 = a2.flip) ? void 0 : i2.overflows) || [];
    if (u2 && L2.push(D2[A2]), g2) {
      const { main: t2, cross: e3 } = y$1(r2, l2, P2);
      L2.push(D2[t2], D2[e3]);
    }
    if (k2 = [...k2, { placement: r2, overflows: L2 }], !L2.every((t2) => t2 <= 0)) {
      var O2, B;
      const t2 = ((null == (O2 = a2.flip) ? void 0 : O2.index) || 0) + 1, e3 = T2[t2];
      if (e3)
        return { data: { index: t2, overflows: k2 }, reset: { placement: e3 } };
      let n2 = null == (B = k2.filter((t3) => t3.overflows[0] <= 0).sort((t3, e4) => t3.overflows[1] - e4.overflows[1])[0]) ? void 0 : B.placement;
      if (!n2)
        switch (p2) {
          case "bestFit": {
            var C2;
            const t3 = null == (C2 = k2.map((t4) => [t4.placement, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e4) => t5 + e4, 0)]).sort((t4, e4) => t4[1] - e4[1])[0]) ? void 0 : C2[0];
            t3 && (n2 = t3);
            break;
          }
          case "initialPlacement":
            n2 = c2;
        }
      if (r2 !== n2)
        return { reset: { placement: n2 } };
    }
    return {};
  } };
};
function A(t2, e2) {
  return { top: t2.top - e2.height, right: t2.right - e2.width, bottom: t2.bottom - e2.height, left: t2.left - e2.width };
}
function R$1(t2) {
  return g$1.some((e2) => t2[e2] >= 0);
}
const P$1 = function(t2) {
  return void 0 === t2 && (t2 = {}), { name: "hide", options: t2, async fn(e2) {
    const { strategy: n2 = "referenceHidden", ...o2 } = t2, { rects: i2 } = e2;
    switch (n2) {
      case "referenceHidden": {
        const t3 = A(await s$1(e2, { ...o2, elementContext: "reference" }), i2.reference);
        return { data: { referenceHiddenOffsets: t3, referenceHidden: R$1(t3) } };
      }
      case "escaped": {
        const t3 = A(await s$1(e2, { ...o2, altBoundary: true }), i2.floating);
        return { data: { escapedOffsets: t3, escaped: R$1(t3) } };
      }
      default:
        return {};
    }
  } };
};
const D$1 = function(e2) {
  return void 0 === e2 && (e2 = 0), { name: "offset", options: e2, async fn(i2) {
    const { x: r2, y: a2 } = i2, l2 = await async function(e3, i3) {
      const { placement: r3, platform: a3, elements: l3 } = e3, s2 = await (null == a3.isRTL ? void 0 : a3.isRTL(l3.floating)), c2 = n$1(r3), f2 = t(r3), m2 = "x" === o$1(r3), u2 = ["left", "top"].includes(c2) ? -1 : 1, g2 = s2 && m2 ? -1 : 1, d2 = "function" == typeof i3 ? i3(e3) : i3;
      let { mainAxis: p2, crossAxis: h2, alignmentAxis: y2 } = "number" == typeof d2 ? { mainAxis: d2, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...d2 };
      return f2 && "number" == typeof y2 && (h2 = "end" === f2 ? -1 * y2 : y2), m2 ? { x: h2 * g2, y: p2 * u2 } : { x: p2 * u2, y: h2 * g2 };
    }(i2, e2);
    return { x: r2 + l2.x, y: a2 + l2.y, data: l2 };
  } };
};
function L$1(t2) {
  return "x" === t2 ? "y" : "x";
}
const k$1 = function(t2) {
  return void 0 === t2 && (t2 = {}), { name: "shift", options: t2, async fn(e2) {
    const { x: i2, y: r2, placement: a2 } = e2, { mainAxis: l2 = true, crossAxis: c2 = false, limiter: f2 = { fn: (t3) => {
      let { x: e3, y: n2 } = t3;
      return { x: e3, y: n2 };
    } }, ...u2 } = t2, g2 = { x: i2, y: r2 }, d2 = await s$1(e2, u2), p2 = o$1(n$1(a2)), h2 = L$1(p2);
    let y2 = g2[p2], x2 = g2[h2];
    if (l2) {
      const t3 = "y" === p2 ? "bottom" : "right";
      y2 = m$1(y2 + d2["y" === p2 ? "top" : "left"], y2, y2 - d2[t3]);
    }
    if (c2) {
      const t3 = "y" === h2 ? "bottom" : "right";
      x2 = m$1(x2 + d2["y" === h2 ? "top" : "left"], x2, x2 - d2[t3]);
    }
    const w2 = f2.fn({ ...e2, [p2]: y2, [h2]: x2 });
    return { ...w2, data: { x: w2.x - i2, y: w2.y - r2 } };
  } };
};
function n(t2) {
  var e2;
  return (null == (e2 = t2.ownerDocument) ? void 0 : e2.defaultView) || window;
}
function o(t2) {
  return n(t2).getComputedStyle(t2);
}
function i(t2) {
  return t2 instanceof n(t2).Node;
}
function r(t2) {
  return i(t2) ? (t2.nodeName || "").toLowerCase() : "";
}
function l(t2) {
  return t2 instanceof n(t2).HTMLElement;
}
function c(t2) {
  return t2 instanceof n(t2).Element;
}
function s(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof n(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function f(t2) {
  const { overflow: e2, overflowX: n2, overflowY: i2, display: r2 } = o(t2);
  return /auto|scroll|overlay|hidden|clip/.test(e2 + i2 + n2) && !["inline", "contents"].includes(r2);
}
function u$2(t2) {
  return ["table", "td", "th"].includes(r(t2));
}
function a(t2) {
  const e2 = d$1(), n2 = o(t2);
  return "none" !== n2.transform || "none" !== n2.perspective || !e2 && !!n2.backdropFilter && "none" !== n2.backdropFilter || !e2 && !!n2.filter && "none" !== n2.filter || ["transform", "perspective", "filter"].some((t3) => (n2.willChange || "").includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => (n2.contain || "").includes(t3));
}
function d$1() {
  return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none");
}
function h(t2) {
  return ["html", "body", "#document"].includes(r(t2));
}
const p = Math.min, m$2 = Math.max, g = Math.round;
function y(t2) {
  const e2 = o(t2);
  let n2 = parseFloat(e2.width) || 0, i2 = parseFloat(e2.height) || 0;
  const r2 = l(t2), c2 = r2 ? t2.offsetWidth : n2, s2 = r2 ? t2.offsetHeight : i2, f2 = g(n2) !== c2 || g(i2) !== s2;
  return f2 && (n2 = c2, i2 = s2), { width: n2, height: i2, fallback: f2 };
}
function x(t2) {
  return c(t2) ? t2 : t2.contextElement;
}
const w = { x: 1, y: 1 };
function v(t2) {
  const e2 = x(t2);
  if (!l(e2))
    return w;
  const n2 = e2.getBoundingClientRect(), { width: o2, height: i2, fallback: r2 } = y(e2);
  let c2 = (r2 ? g(n2.width) : n2.width) / o2, s2 = (r2 ? g(n2.height) : n2.height) / i2;
  return c2 && Number.isFinite(c2) || (c2 = 1), s2 && Number.isFinite(s2) || (s2 = 1), { x: c2, y: s2 };
}
const b = { x: 0, y: 0 };
function L(t2, e2, o2) {
  var i2, r2;
  if (void 0 === e2 && (e2 = true), !d$1())
    return b;
  const l2 = t2 ? n(t2) : window;
  return !o2 || e2 && o2 !== l2 ? b : { x: (null == (i2 = l2.visualViewport) ? void 0 : i2.offsetLeft) || 0, y: (null == (r2 = l2.visualViewport) ? void 0 : r2.offsetTop) || 0 };
}
function E(e2, o2, i2, r2) {
  void 0 === o2 && (o2 = false), void 0 === i2 && (i2 = false);
  const l2 = e2.getBoundingClientRect(), s2 = x(e2);
  let f2 = w;
  o2 && (r2 ? c(r2) && (f2 = v(r2)) : f2 = v(e2));
  const u2 = L(s2, i2, r2);
  let a2 = (l2.left + u2.x) / f2.x, d2 = (l2.top + u2.y) / f2.y, h2 = l2.width / f2.x, p2 = l2.height / f2.y;
  if (s2) {
    const t2 = n(s2), e3 = r2 && c(r2) ? n(r2) : r2;
    let o3 = t2.frameElement;
    for (; o3 && r2 && e3 !== t2; ) {
      const t3 = v(o3), e4 = o3.getBoundingClientRect(), i3 = getComputedStyle(o3);
      e4.x += (o3.clientLeft + parseFloat(i3.paddingLeft)) * t3.x, e4.y += (o3.clientTop + parseFloat(i3.paddingTop)) * t3.y, a2 *= t3.x, d2 *= t3.y, h2 *= t3.x, p2 *= t3.y, a2 += e4.x, d2 += e4.y, o3 = n(o3).frameElement;
    }
  }
  return l$1({ width: h2, height: p2, x: a2, y: d2 });
}
function R(t2) {
  return ((i(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
}
function T(t2) {
  return c(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function S(t2) {
  return E(R(t2)).left + T(t2).scrollLeft;
}
function C(t2) {
  if ("html" === r(t2))
    return t2;
  const e2 = t2.assignedSlot || t2.parentNode || s(t2) && t2.host || R(t2);
  return s(e2) ? e2.host : e2;
}
function F(t2) {
  const e2 = C(t2);
  return h(e2) ? e2.ownerDocument.body : l(e2) && f(e2) ? e2 : F(e2);
}
function W(t2, e2) {
  var o2;
  void 0 === e2 && (e2 = []);
  const i2 = F(t2), r2 = i2 === (null == (o2 = t2.ownerDocument) ? void 0 : o2.body), l2 = n(i2);
  return r2 ? e2.concat(l2, l2.visualViewport || [], f(i2) ? i2 : []) : e2.concat(i2, W(i2));
}
function D(e2, i2, r2) {
  let s2;
  if ("viewport" === i2)
    s2 = function(t2, e3) {
      const o2 = n(t2), i3 = R(t2), r3 = o2.visualViewport;
      let l2 = i3.clientWidth, c2 = i3.clientHeight, s3 = 0, f2 = 0;
      if (r3) {
        l2 = r3.width, c2 = r3.height;
        const t3 = d$1();
        (!t3 || t3 && "fixed" === e3) && (s3 = r3.offsetLeft, f2 = r3.offsetTop);
      }
      return { width: l2, height: c2, x: s3, y: f2 };
    }(e2, r2);
  else if ("document" === i2)
    s2 = function(t2) {
      const e3 = R(t2), n2 = T(t2), i3 = t2.ownerDocument.body, r3 = m$2(e3.scrollWidth, e3.clientWidth, i3.scrollWidth, i3.clientWidth), l2 = m$2(e3.scrollHeight, e3.clientHeight, i3.scrollHeight, i3.clientHeight);
      let c2 = -n2.scrollLeft + S(t2);
      const s3 = -n2.scrollTop;
      return "rtl" === o(i3).direction && (c2 += m$2(e3.clientWidth, i3.clientWidth) - r3), { width: r3, height: l2, x: c2, y: s3 };
    }(R(e2));
  else if (c(i2))
    s2 = function(t2, e3) {
      const n2 = E(t2, true, "fixed" === e3), o2 = n2.top + t2.clientTop, i3 = n2.left + t2.clientLeft, r3 = l(t2) ? v(t2) : { x: 1, y: 1 };
      return { width: t2.clientWidth * r3.x, height: t2.clientHeight * r3.y, x: i3 * r3.x, y: o2 * r3.y };
    }(i2, r2);
  else {
    const t2 = L(e2);
    s2 = { ...i2, x: i2.x - t2.x, y: i2.y - t2.y };
  }
  return l$1(s2);
}
function H(t2, e2) {
  const n2 = C(t2);
  return !(n2 === e2 || !c(n2) || h(n2)) && ("fixed" === o(n2).position || H(n2, e2));
}
function O(t2, e2) {
  return l(t2) && "fixed" !== o(t2).position ? e2 ? e2(t2) : t2.offsetParent : null;
}
function P(t2, e2) {
  const i2 = n(t2);
  if (!l(t2))
    return i2;
  let c2 = O(t2, e2);
  for (; c2 && u$2(c2) && "static" === o(c2).position; )
    c2 = O(c2, e2);
  return c2 && ("html" === r(c2) || "body" === r(c2) && "static" === o(c2).position && !a(c2)) ? i2 : c2 || function(t3) {
    let e3 = C(t3);
    for (; l(e3) && !h(e3); ) {
      if (a(e3))
        return e3;
      e3 = C(e3);
    }
    return null;
  }(t2) || i2;
}
function V(t2, e2, n2) {
  const o2 = l(e2), i2 = R(e2), c2 = "fixed" === n2, s2 = E(t2, true, c2, e2);
  let u2 = { scrollLeft: 0, scrollTop: 0 };
  const a2 = { x: 0, y: 0 };
  if (o2 || !o2 && !c2)
    if (("body" !== r(e2) || f(i2)) && (u2 = T(e2)), l(e2)) {
      const t3 = E(e2, true, c2, e2);
      a2.x = t3.x + e2.clientLeft, a2.y = t3.y + e2.clientTop;
    } else
      i2 && (a2.x = S(i2));
  return { x: s2.left + u2.scrollLeft - a2.x, y: s2.top + u2.scrollTop - a2.y, width: s2.width, height: s2.height };
}
const k = { getClippingRect: function(t2) {
  let { element: e2, boundary: n2, rootBoundary: i2, strategy: l2 } = t2;
  const s2 = "clippingAncestors" === n2 ? function(t3, e3) {
    const n3 = e3.get(t3);
    if (n3)
      return n3;
    let i3 = W(t3).filter((t4) => c(t4) && "body" !== r(t4)), l3 = null;
    const s3 = "fixed" === o(t3).position;
    let u3 = s3 ? C(t3) : t3;
    for (; c(u3) && !h(u3); ) {
      const e4 = o(u3), n4 = a(u3);
      n4 || "fixed" !== e4.position || (l3 = null), (s3 ? !n4 && !l3 : !n4 && "static" === e4.position && l3 && ["absolute", "fixed"].includes(l3.position) || f(u3) && !n4 && H(t3, u3)) ? i3 = i3.filter((t4) => t4 !== u3) : l3 = e4, u3 = C(u3);
    }
    return e3.set(t3, i3), i3;
  }(e2, this._c) : [].concat(n2), u2 = [...s2, i2], d2 = u2[0], g2 = u2.reduce((t3, n3) => {
    const o2 = D(e2, n3, l2);
    return t3.top = m$2(o2.top, t3.top), t3.right = p(o2.right, t3.right), t3.bottom = p(o2.bottom, t3.bottom), t3.left = m$2(o2.left, t3.left), t3;
  }, D(e2, d2, l2));
  return { width: g2.right - g2.left, height: g2.bottom - g2.top, x: g2.left, y: g2.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e2, offsetParent: n2, strategy: o2 } = t2;
  const i2 = l(n2), c2 = R(n2);
  if (n2 === c2)
    return e2;
  let s2 = { scrollLeft: 0, scrollTop: 0 }, u2 = { x: 1, y: 1 };
  const a2 = { x: 0, y: 0 };
  if ((i2 || !i2 && "fixed" !== o2) && (("body" !== r(n2) || f(c2)) && (s2 = T(n2)), l(n2))) {
    const t3 = E(n2);
    u2 = v(n2), a2.x = t3.x + n2.clientLeft, a2.y = t3.y + n2.clientTop;
  }
  return { width: e2.width * u2.x, height: e2.height * u2.y, x: e2.x * u2.x - s2.scrollLeft * u2.x + a2.x, y: e2.y * u2.y - s2.scrollTop * u2.y + a2.y };
}, isElement: c, getDimensions: function(t2) {
  return y(t2);
}, getOffsetParent: P, getDocumentElement: R, getScale: v, async getElementRects(t2) {
  let { reference: e2, floating: n2, strategy: o2 } = t2;
  const i2 = this.getOffsetParent || P, r2 = this.getDimensions;
  return { reference: V(e2, await i2(n2), o2), floating: { x: 0, y: 0, ...await r2(n2) } };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === o(t2).direction };
function z(t2, e2, n2, o2) {
  void 0 === o2 && (o2 = {});
  const { ancestorScroll: i2 = true, ancestorResize: r2 = true, elementResize: l2 = true, animationFrame: s2 = false } = o2, f2 = i2 || r2 ? [...c(t2) ? W(t2) : t2.contextElement ? W(t2.contextElement) : [], ...W(e2)] : [];
  f2.forEach((t3) => {
    const e3 = !c(t3) && t3.toString().includes("V");
    !i2 || s2 && !e3 || t3.addEventListener("scroll", n2, { passive: true }), r2 && t3.addEventListener("resize", n2);
  });
  let u2, a2 = null;
  l2 && (a2 = new ResizeObserver(() => {
    n2();
  }), c(t2) && !s2 && a2.observe(t2), c(t2) || !t2.contextElement || s2 || a2.observe(t2.contextElement), a2.observe(e2));
  let d2 = s2 ? E(t2) : null;
  return s2 && function e3() {
    const o3 = E(t2);
    !d2 || o3.x === d2.x && o3.y === d2.y && o3.width === d2.width && o3.height === d2.height || n2();
    d2 = o3, u2 = requestAnimationFrame(e3);
  }(), n2(), () => {
    var t3;
    f2.forEach((t4) => {
      i2 && t4.removeEventListener("scroll", n2), r2 && t4.removeEventListener("resize", n2);
    }), null == (t3 = a2) || t3.disconnect(), a2 = null, s2 && cancelAnimationFrame(u2);
  };
}
const M = (t2, n2, o2) => {
  const i2 = /* @__PURE__ */ new Map(), r2 = { platform: k, ...o2 }, l2 = { ...r2.platform, _c: i2 };
  return r$1(t2, n2, { ...r2, platform: l2 });
};
const defaultDelay = 0;
function usePopperOptions$1(options) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const popperOptions = reactive({
    allowEnter: (_a2 = options.allowEnter) != null ? _a2 : true,
    autoAdjust: (_b = options.autoAdjust) != null ? _b : true,
    delay: (_c = options.delay) != null ? _c : defaultDelay,
    disabled: (_d = options.disabled) != null ? _d : false,
    offset: (_e = options.offset) != null ? _e : [0, 0],
    placement: (_f = options.placement) != null ? _f : "top",
    trigger: (_g = options.trigger) != null ? _g : "hover",
    visible: (_h = options.visible) != null ? _h : false,
    strategy: (_i = options.strategy) != null ? _i : "absolute",
    middlewares: (_j = options.middlewares) != null ? _j : []
  });
  const updateOptions = (options2) => {
    Object.entries(options2).forEach(([key, value]) => {
      if (value !== void 0 && !isEqual(value, popperOptions[key])) {
        popperOptions[key] = value;
      }
    });
  };
  if (isReactive(options)) {
    watch(options, (_options) => {
      updateOptions(_options);
    });
  }
  return {
    popperOptions,
    updateOptions
  };
}
function useBaseOptions(options) {
  return computed(() => {
    const { placement, strategy, middlewares, offset: offset2, autoAdjust } = options;
    return { placement, strategy, middlewares, offset: offset2, autoAdjust };
  });
}
function useDelay(options) {
  const convertDelay = (delay) => {
    if (Array.isArray(delay)) {
      const [show, hide2] = delay;
      return { show: show != null ? show : defaultDelay, hide: hide2 != null ? hide2 : defaultDelay };
    }
    return { show: delay, hide: delay };
  };
  return computed(() => convertDelay(options.delay));
}
function useInstance(triggerRef, popperRef, options) {
  const updatePopperPosition = (state) => {
    const popperEl = convertElement(popperRef.value);
    const { x: x2, y: y2, strategy } = state;
    if (popperEl) {
      Object.assign(popperEl.style, {
        position: strategy,
        left: `${x2}px`,
        top: `${y2}px`
      });
    }
  };
  const update = async () => {
    const triggerEl = convertElement(triggerRef.value);
    const popperEl = convertElement(popperRef.value);
    if (!triggerEl || !popperEl) {
      return;
    }
    const state = await M(triggerEl, popperEl, options.value);
    state && updatePopperPosition(state);
  };
  let cleanUpHandler = null;
  const initialize = () => {
    const triggerEl = convertElement(triggerRef.value);
    const popperEl = convertElement(popperRef.value);
    if (!triggerEl || !popperEl) {
      return;
    }
    cleanUpHandler == null ? void 0 : cleanUpHandler();
    Object.assign(popperEl.style, {
      position: "absolute",
      left: 0,
      top: 0
    });
    cleanUpHandler = z(triggerEl, popperEl, () => {
      update();
    });
  };
  const watchStopHandlers = [
    watch([triggerRef, popperRef], initialize, { immediate: true }),
    watch(options, update, { immediate: true })
  ];
  const destroy = () => {
    watchStopHandlers.forEach((handler) => handler());
    cleanUpHandler == null ? void 0 : cleanUpHandler();
  };
  return {
    update,
    destroy
  };
}
function usePlacement(options) {
  const _placement = ref(options.placement);
  const updatePlacement2 = (value) => {
    _placement.value = value;
  };
  watch(() => options.placement, updatePlacement2);
  const placement = computed(() => _placement.value);
  return { placement, updatePlacement: updatePlacement2 };
}
function usePopperEvents(baseOptions, eventOptions) {
  const { show, hide: hide2 } = eventOptions;
  const onMouseenter = () => show();
  const onMouseleave = () => hide2();
  const eventsMap = {
    click: NoopObject,
    focus: NoopObject,
    hover: { onMouseenter, onMouseleave },
    contextmenu: NoopObject,
    manual: NoopObject
  };
  return computed(() => baseOptions.allowEnter ? eventsMap[baseOptions.trigger] : NoopObject);
}
function useTimer() {
  let timer = null;
  const setTimer = (action, delay) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(action, delay);
  };
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return { setTimer, clearTimer };
}
function useTriggerEvents(baseOptions, eventOptions) {
  const { visibility, show, hide: hide2 } = eventOptions;
  const onMouseenter = () => show();
  const onMouseleave = () => hide2();
  const onFocus = () => show();
  const onBlur = () => hide2();
  const onClick = () => {
    const { trigger: trigger2 } = baseOptions;
    if (trigger2 === "click") {
      visibility.value ? hide2() : show();
    } else if (trigger2 === "contextmenu") {
      visibility.value && hide2();
    }
  };
  const onContextmenu = (evt) => {
    evt.preventDefault();
    show();
  };
  const eventsMap = {
    hover: { onMouseenter, onMouseleave },
    focus: { onFocus, onBlur },
    click: { onClick },
    contextmenu: { onClick, onContextmenu },
    manual: {}
  };
  return computed(() => eventsMap[baseOptions.trigger]);
}
function useVisibility(options) {
  return computed(() => !options.disabled && options.visible);
}
function arrow(arrowElement) {
  const { fn: arrowFn, ...rest } = u$1({ element: arrowElement, padding: 4 });
  return {
    ...rest,
    name: "IDUX_arrow",
    async fn(middlewareArguments) {
      const res = await arrowFn(middlewareArguments);
      const {
        data: { x: x2, y: y2 }
      } = res;
      Object.assign(arrowElement.style, {
        left: x2 != null ? `${x2}px` : "",
        top: y2 != null ? `${y2}px` : ""
      });
      return res;
    }
  };
}
function referenceHidden() {
  const { fn: hideFn, ...rest } = P$1();
  return {
    ...rest,
    name: "IDUX_referenceHidden",
    async fn(middlewareArguments) {
      const {
        elements: { floating }
      } = middlewareArguments;
      const res = await hideFn(middlewareArguments);
      const {
        data: { referenceHidden: referenceHidden2 }
      } = res;
      if (referenceHidden2) {
        floating.setAttribute("data-popper-reference-hidden", "");
      } else {
        floating.removeAttribute("data-popper-reference-hidden");
      }
      return res;
    }
  };
}
function updatePlacement(updatePlacement2) {
  return {
    name: "IDUX_updatePlacement",
    fn(middlewareArguments) {
      const {
        placement,
        elements: { floating }
      } = middlewareArguments;
      updatePlacement2(camelCase$1(placement));
      floating.setAttribute("data-popper-placement", placement);
      return middlewareArguments;
    }
  };
}
function convertOptions(baseOptions, extraOptions) {
  const { placement, strategy, middlewares, offset: offset$1, autoAdjust } = baseOptions;
  const { arrowElement, updatePlacement: _updatePlacement } = extraOptions;
  return {
    placement: kebabCase$1(placement),
    strategy,
    middleware: [
      autoAdjust && b$1({ padding: 4 }),
      autoAdjust && k$1(),
      !!arrowElement && arrow(arrowElement),
      D$1({
        mainAxis: offset$1[1],
        crossAxis: offset$1[0]
      }),
      referenceHidden(),
      updatePlacement(_updatePlacement),
      ...middlewares
    ].filter(Boolean)
  };
}
function usePopper(options = {}) {
  let popperInstance;
  const triggerRef = ref();
  const popperRef = ref();
  const arrowRef = ref();
  const { popperOptions, updateOptions } = usePopperOptions$1(options);
  const baseOptions = useBaseOptions(popperOptions);
  const convertedOptions = computed(
    () => convertOptions(baseOptions.value, { arrowElement: convertElement(arrowRef), updatePlacement: updatePlacement2 })
  );
  const visibility = useVisibility(popperOptions);
  const { placement, updatePlacement: updatePlacement2 } = usePlacement(popperOptions);
  const delay = useDelay(popperOptions);
  const { setTimer, clearTimer } = useTimer();
  const triggerEvents = useTriggerEvents(popperOptions, { visibility, show, hide: hide2 });
  const popperEvents = usePopperEvents(popperOptions, { show, hide: hide2 });
  function toggle(visible, delay2) {
    clearTimer();
    const action = () => {
      popperOptions.visible = visible;
    };
    if (delay2 > 0) {
      setTimer(action, delay2);
    } else {
      action();
    }
  }
  function show(showDelay = delay.value.show) {
    toggle(true, showDelay);
  }
  function hide2(hideDelay = delay.value.hide) {
    toggle(false, hideDelay);
  }
  function update(options2) {
    if (options2) {
      updateOptions(options2);
      return;
    }
    popperInstance == null ? void 0 : popperInstance.update();
  }
  function initialize() {
    destroy();
    popperInstance = useInstance(triggerRef, popperRef, convertedOptions);
  }
  function destroy() {
    clearTimer();
    if (!popperInstance) {
      return;
    }
    popperInstance.destroy();
    popperInstance = null;
  }
  watch(visibility, (value) => {
    if (value) {
      clearTimer();
      popperInstance == null ? void 0 : popperInstance.update();
    }
  });
  return {
    visibility,
    placement,
    triggerRef,
    triggerEvents,
    popperRef,
    popperEvents,
    arrowRef,
    initialize,
    show,
    hide: hide2,
    update,
    destroy
  };
}
const portalProps = {
  disabled: { type: Boolean, default: void 0 },
  target: {
    type: [String, HTMLElement, Function],
    required: true
  },
  load: { type: Boolean, default: true }
};
var Portal = /* @__PURE__ */ defineComponent({
  name: "CdkPortal",
  props: portalProps,
  setup(props, {
    slots
  }) {
    const loaded = ref(props.load);
    watch(() => props.load, (load) => {
      if (!loaded.value) {
        loaded.value = load;
      }
    });
    const elementRef = computed(() => convertTargetElement(props.target));
    return () => {
      if (!loaded.value) {
        return null;
      }
      return createVNode(Teleport, {
        "to": elementRef.value,
        "disabled": props.disabled
      }, {
        default: () => [slots.default && slots.default()]
      });
    };
  }
});
function convertTargetElement(target) {
  const elementOrSelector = isFunction(target) ? target() : target;
  if (!isString(elementOrSelector)) {
    return elementOrSelector;
  }
  return getTargetElement(elementOrSelector);
}
function getTargetElement(selector) {
  let element = document.querySelector(selector);
  if (element) {
    return element;
  }
  const selectorType = selector.startsWith(".") ? "class" : selector.startsWith("#") ? "id" : void 0;
  if (!selectorType) {
    Logger.warn("cdk/portal", "the selector of target supports only simple id or class");
    element = document.querySelector(`.${selector}`);
    if (element) {
      return element;
    }
  }
  const attrName = selectorType || "class";
  const attrValue = selectorType ? selector.substring(1) : selector;
  return createDivElement(attrName, attrValue);
}
function createDivElement(attrName, attrValue) {
  const element = document.createElement("div");
  element.setAttribute(attrName, attrValue);
  document.body.appendChild(element);
  return element;
}
const CdkPortal = Portal;
function convertTarget(target) {
  const temp = isFunction(target) ? target() : target;
  if (isString(temp)) {
    const targetDom = document.querySelector(temp);
    if (targetDom) {
      return targetDom;
    } else {
      Logger.warn("components/utils", `target does not exist: ${target}, default value are already used: window.`);
      return window;
    }
  }
  return temp || window;
}
function convertStringVNode(slots, props, keyOrParams, slotParams) {
  let labelSlot;
  let label;
  const isKey = isString(keyOrParams);
  const params = isKey ? slotParams : keyOrParams;
  if (isKey) {
    labelSlot = slots[keyOrParams];
    if (!labelSlot) {
      label = props[keyOrParams];
    }
  } else {
    labelSlot = slots;
    label = props;
  }
  return labelSlot ? labelSlot(params) : label;
}
function usePortalTarget(props, config, common, mergedPrefix) {
  return computed(() => {
    var _a2, _b, _c;
    const container = (_b = (_a2 = props.container) != null ? _a2 : config.container) != null ? _b : common.overlayContainer;
    return (_c = isFunction(container) ? container() : container) != null ? _c : `.${mergedPrefix.value}-container`;
  });
}
function useKey() {
  var _a2;
  const { vnode, uid: uid2 } = getCurrentInstance();
  return (_a2 = vnode.key) != null ? _a2 : uid2;
}
function useGetKey(props, config, location2) {
  return computed(() => {
    const { getKey = config.getKey } = props;
    if (isString(getKey)) {
      return (data) => {
        const key = data[getKey];
        if (key === void 0) {
          Logger.warn(location2, "Each item in dataSource should have a unique `key` prop.");
        }
        return key;
      };
    }
    return getKey;
  });
}
let zIndexCount = 0;
const useZIndex = (controlZIndex, configZIndex, visible) => {
  const getZIndex = () => {
    const zIndex = configZIndex.value;
    if (isFunction(zIndex)) {
      return zIndex();
    }
    return zIndex + zIndexCount++;
  };
  const innerZIndex = ref(0);
  watch(
    visible,
    (newVisible) => {
      if (newVisible && isNil(controlZIndex.value)) {
        innerZIndex.value = getZIndex();
      }
    },
    { immediate: true }
  );
  return computed(() => {
    var _a2;
    return (_a2 = controlZIndex.value) != null ? _a2 : innerZIndex.value;
  });
};
const overlayPlacementDef = String;
const overlayTriggerDef = String;
const overlayDelayDef = [Number, Array];
const overlayProps = {
  visible: {
    type: Boolean,
    default: void 0
  },
  placement: overlayPlacementDef,
  allowEnter: {
    type: Boolean,
    default: void 0
  },
  autoAdjust: {
    type: Boolean,
    default: void 0
  },
  clickOutside: {
    type: Boolean,
    default: void 0
  },
  container: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  containerFallback: {
    type: String,
    required: true
  },
  delay: overlayDelayDef,
  destroyOnHide: {
    type: Boolean,
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  offset: Array,
  showArrow: {
    type: Boolean,
    default: void 0
  },
  transitionName: String,
  trigger: overlayTriggerDef,
  triggerId: { type: null, default: void 0 },
  zIndex: Number,
  "onUpdate:visible": [Function, Array],
  "onUpdate:placement": [Function, Array],
  onAfterLeave: [Function, Array]
};
var Overlay = /* @__PURE__ */ defineComponent({
  name: "ɵOverlay",
  inheritAttrs: false,
  props: overlayProps,
  setup(props, {
    slots,
    attrs,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-overlay`);
    const contentArrowRef = ref();
    const popperOptions = usePopperOptions(props, contentArrowRef);
    const {
      arrowRef,
      popperRef,
      popperEvents,
      triggerRef,
      triggerEvents,
      visibility,
      placement,
      initialize,
      update,
      show,
      hide,
      destroy
    } = usePopper({
      ...popperOptions.value,
      visible: props.visible
    });
    const currentZIndex = useZIndex(toRef(props, "zIndex"), toRef(common, "overlayZIndex"), visibility);
    const mergedContainer = computed(() => {
      var _a2;
      const {
        container = common.overlayContainer
      } = props;
      return (_a2 = isFunction(container) ? container(convertElement(triggerRef)) : container) != null ? _a2 : props.containerFallback;
    });
    onMounted(() => initialize());
    onBeforeUnmount(() => destroy());
    watch(visibility, (value) => callEmit(props["onUpdate:visible"], value));
    watch(placement, (value) => callEmit(props["onUpdate:placement"], value));
    watch(popperOptions, (options) => update(options));
    watch(() => props.visible, (visible) => {
      visible ? show() : hide();
      if (visible && props.destroyOnHide) {
        initialize();
      }
    }, {
      flush: "post"
    });
    watch(contentArrowRef, () => {
      arrowRef.value = contentArrowRef.value;
    }, {
      immediate: true
    });
    const onAfterLeave = () => {
      if (props.destroyOnHide) {
        destroy();
      }
      callEmit(props.onAfterLeave);
    };
    expose({
      updatePopper: update
    });
    const handleClickOutside = (evt) => {
      const popperElement = convertElement(popperRef);
      const target = evt.target;
      if (!popperElement || popperElement === target || popperElement.contains(target)) {
        return;
      }
      hide();
    };
    return () => {
      var _a2, _b;
      const triggerNode = getFirstValidNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      if (!triggerNode) {
        Logger.warn("components/overlay", "Trigger must is single rooted node");
        return null;
      }
      const trigger2 = renderTrigger(props, triggerNode, {
        ref: triggerRef,
        ...triggerEvents.value
      }, handleClickOutside);
      const contentNode = (_b = slots.content) == null ? void 0 : _b.call(slots);
      if (!getFirstValidNode(contentNode)) {
        return createVNode(Fragment, null, [trigger2, createVNode(CdkPortal, {
          "target": mergedContainer.value,
          "load": false
        }, null)]);
      }
      const content = renderContent(props, mergedPrefixCls, visibility, currentZIndex, contentNode, contentArrowRef, popperRef, popperEvents, attrs);
      return createVNode(Fragment, null, [trigger2, createVNode(CdkPortal, {
        "target": mergedContainer.value,
        "load": visibility.value
      }, {
        default: () => [createVNode(Transition, {
          "appear": true,
          "name": props.transitionName,
          "onAfterLeave": onAfterLeave
        }, {
          default: () => [content]
        })]
      })]);
    };
  }
});
function usePopperOptions(props, arrowRef) {
  return computed(() => {
    const {
      allowEnter,
      autoAdjust,
      delay,
      disabled,
      offset,
      placement,
      trigger: trigger2
    } = props;
    let _offset;
    if (!arrowRef.value) {
      _offset = offset;
    } else {
      const {
        offsetWidth,
        offsetHeight
      } = arrowRef.value;
      _offset = offset ? [...offset] : [0, 0];
      _offset[1] += [offsetWidth, offsetHeight][1] / 2;
    }
    return {
      allowEnter,
      autoAdjust,
      delay,
      disabled,
      offset: _offset,
      placement,
      trigger: trigger2
    };
  });
}
function renderContent(props, mergedPrefixCls, visibility, currentZIndex, contentNode, arrowRef, popperRef, popperEvents, attrs) {
  if (props.destroyOnHide && !visibility.value) {
    return null;
  }
  const prefixCls = mergedPrefixCls.value;
  const {
    triggerId
  } = props;
  const overlayId = triggerId != null ? `__IDUX_OVERLAY-${triggerId}` : void 0;
  const style = `z-index: ${currentZIndex.value}`;
  const overlay = createVNode("div", mergeProps({
    "ref": popperRef,
    "id": overlayId,
    "class": prefixCls,
    "style": style
  }, popperEvents.value, attrs), [contentNode, props.showArrow && createVNode("div", {
    "ref": arrowRef,
    "class": `${prefixCls}-arrow`
  }, null)]);
  return props.destroyOnHide ? overlay : withDirectives(overlay, [[vShow, visibility.value]]);
}
function renderTrigger(props, triggerNode, extraProps, handleClickOutside) {
  const element = cloneVNode(triggerNode, extraProps, true);
  if (props.clickOutside) {
    return withDirectives(element, [[vClickOutside, handleClickOutside]]);
  }
  return element;
}
const ɵOverlay = Overlay;
function isFakeMousedownFromScreenReader(event) {
  return event.offsetX === 0 && event.offsetY === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
const INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN = Symbol(
  "cdk-input-modality-detector-options"
);
const INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = {
  ignoreCodes: ["AltLeft", "AltRight", "ControlLeft", "ControlRight", "OSLeft", "OSRight", "ShiftLeft", "ShiftRight"]
};
const TOUCH_BUFFER_MS = 650;
const modalityEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
function useInputModalityDetector(options) {
  const contextOptions = inject(INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS);
  const _options = { ...contextOptions, ...options };
  const _modality = ref(null);
  const _modalityDetected = customRef((track2, trigger2) => {
    let value = null;
    return {
      get() {
        track2();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger2();
      }
    };
  });
  const changeModality = (value) => {
    _modality.value = value;
    _modalityDetected.value = value;
  };
  const _target = ref(null);
  let _lastTouchMs = 0;
  const _onKeydown = (event) => {
    var _a2;
    if ((_a2 = _options.ignoreCodes) == null ? void 0 : _a2.some((code) => code === event.code)) {
      return;
    }
    changeModality("keyboard");
    _target.value = _getEventTarget(event);
  };
  const _onMousedown = (event) => {
    if (Date.now() - _lastTouchMs < TOUCH_BUFFER_MS) {
      return;
    }
    changeModality(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
    _target.value = _getEventTarget(event);
  };
  const _onTouchstart = (event) => {
    if (isFakeTouchstartFromScreenReader(event)) {
      changeModality("keyboard");
      return;
    }
    _lastTouchMs = Date.now();
    changeModality("touch");
    _target.value = _getEventTarget(event);
  };
  if (isBrowser$1) {
    document.addEventListener("keydown", _onKeydown, modalityEventListenerOptions);
    document.addEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
    document.addEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
  }
  tryOnScopeDispose(() => {
    if (isBrowser$1) {
      document.removeEventListener("keydown", _onKeydown, modalityEventListenerOptions);
      document.removeEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
      document.removeEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
    }
  });
  return {
    modality: _modality,
    modalityDetected: _modalityDetected,
    target: _target
  };
}
const useSharedInputModalityDetector = createSharedComposable(() => useInputModalityDetector());
const FOCUS_MONITOR_OPTIONS_TOKEN = Symbol("cdk-focus-monitor-options");
const FOCUS_MONITOR_DEFAULT_OPTIONS = {
  detectionMode: "immediate"
};
const captureEventListenerOptions = normalizePassiveListenerOptions({
  passive: true,
  capture: true
});
function useFocusMonitor(options) {
  var _a2;
  const contextOptions = inject(FOCUS_MONITOR_OPTIONS_TOKEN, FOCUS_MONITOR_DEFAULT_OPTIONS);
  const _options = { ...contextOptions, ...options };
  const _detectionMode = _options.detectionMode;
  const _inputModalityDetector = (_a2 = _options.inputModalityDetector) != null ? _a2 : useSharedInputModalityDetector();
  let _origin = null;
  let _lastFocusOrigin;
  let _windowFocused = false;
  let _windowFocusTimeoutId;
  let _originTimeoutId;
  let _originFromTouchInteraction = false;
  const _elementInfo = /* @__PURE__ */ new Map();
  let _monitoredElementCount = 0;
  const _rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
  const _windowFocusListener = () => {
    _windowFocused = true;
    _windowFocusTimeoutId = setTimeout(() => _windowFocused = false);
  };
  let _stopInputModalityDetector = null;
  const _rootNodeFocusAndBlurListener = (event) => {
    const target = _getEventTarget(event);
    const handler = event.type === "focus" ? _onFocus : _onBlur;
    for (let element = target; element; element = element.parentElement) {
      handler(event, element);
    }
  };
  function monitor(element, checkChildren = false) {
    const nativeElement = convertElement(element);
    if (!isBrowser$1 || !nativeElement || nativeElement.nodeType !== 1) {
      return computed(() => ({ origin: null }));
    }
    const rootNode = _getShadowRoot(nativeElement) || _getDocument();
    const cachedInfo = _elementInfo.get(nativeElement);
    if (cachedInfo) {
      if (checkChildren) {
        cachedInfo.checkChildren = true;
      }
      return computed(() => cachedInfo.subject.value);
    }
    const info2 = {
      checkChildren,
      subject: shallowRef({ origin: null }),
      rootNode
    };
    _elementInfo.set(nativeElement, info2);
    _registerGlobalListeners(info2);
    return computed(() => info2.subject.value);
  }
  function stopMonitoring(element) {
    const nativeElement = convertElement(element);
    if (!nativeElement) {
      return;
    }
    const elementInfo = _elementInfo.get(nativeElement);
    if (elementInfo) {
      _setClasses(nativeElement);
      _elementInfo.delete(nativeElement);
      _removeGlobalListeners(elementInfo);
    }
  }
  function focusVia(element, origin, options2) {
    const nativeElement = convertElement(element);
    const focusedElement = _getDocument().activeElement;
    if (nativeElement === focusedElement) {
      _getClosestElementsInfo(nativeElement).forEach(
        ([currentElement, info2]) => _originChanged(currentElement, origin, info2)
      );
    } else {
      _setOrigin(origin);
      if (nativeElement && typeof nativeElement.focus === "function") {
        nativeElement.focus(options2);
      }
    }
  }
  function blurVia(element) {
    const nativeElement = convertElement(element);
    if (!nativeElement) {
      return;
    }
    const focusedElement = _getDocument().activeElement;
    if (nativeElement === focusedElement && typeof nativeElement.blur === "function") {
      nativeElement.blur();
    }
  }
  function _getDocument() {
    return document;
  }
  function _getWindow() {
    const doc2 = _getDocument();
    return doc2.defaultView || window;
  }
  function _toggleClass(element, className, shouldSet) {
    if (shouldSet) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }
  function _getFocusOrigin(focusEventTarget) {
    if (_origin) {
      if (_originFromTouchInteraction) {
        return _shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
      } else {
        return _origin;
      }
    }
    return _windowFocused && _lastFocusOrigin ? _lastFocusOrigin : "program";
  }
  function _shouldBeAttributedToTouch(focusEventTarget) {
    return _detectionMode === "eventual" || !!(focusEventTarget == null ? void 0 : focusEventTarget.contains(_inputModalityDetector.target.value));
  }
  function _setClasses(element, origin) {
    _toggleClass(element, "cdk-focused", !!origin);
    _toggleClass(element, "cdk-touch-focused", origin === "touch");
    _toggleClass(element, "cdk-keyboard-focused", origin === "keyboard");
    _toggleClass(element, "cdk-mouse-focused", origin === "mouse");
    _toggleClass(element, "cdk-program-focused", origin === "program");
  }
  function _setOrigin(origin, isFromInteraction = false) {
    _origin = origin;
    _originFromTouchInteraction = origin === "touch" && isFromInteraction;
    if (_detectionMode === "immediate") {
      clearTimeout(_originTimeoutId);
      const ms = _originFromTouchInteraction ? TOUCH_BUFFER_MS : 1;
      _originTimeoutId = setTimeout(() => _origin = null, ms);
    }
  }
  function _onFocus(event, element) {
    const elementInfo = _elementInfo.get(element);
    const focusEventTarget = _getEventTarget(event);
    if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) {
      return;
    }
    _originChanged(element, _getFocusOrigin(focusEventTarget), elementInfo, event);
  }
  function _onBlur(event, element) {
    const elementInfo = _elementInfo.get(element);
    if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) {
      return;
    }
    _setClasses(element);
    _emitOrigin(elementInfo.subject, null, event);
  }
  function _emitOrigin(subject, origin, event) {
    subject.value = { origin, event };
  }
  function _registerGlobalListeners(elementInfo) {
    if (!isBrowser$1) {
      return;
    }
    const rootNode = elementInfo.rootNode;
    const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode) || 0;
    if (!rootNodeFocusListeners) {
      rootNode.addEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
      rootNode.addEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
    }
    _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
    if (++_monitoredElementCount === 1) {
      const window2 = _getWindow();
      window2.addEventListener("focus", _windowFocusListener);
      _stopInputModalityDetector = watchEffect(() => {
        _setOrigin(_inputModalityDetector.modalityDetected.value, true);
      });
    }
  }
  function _removeGlobalListeners(elementInfo) {
    const rootNode = elementInfo.rootNode;
    if (_rootNodeFocusListenerCount.has(rootNode)) {
      const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode);
      if (rootNodeFocusListeners > 1) {
        _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
      } else {
        rootNode.removeEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
        rootNode.removeEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
        _rootNodeFocusListenerCount.delete(rootNode);
      }
    }
    if (!--_monitoredElementCount) {
      const window2 = _getWindow();
      window2.removeEventListener("focus", _windowFocusListener);
      if (_stopInputModalityDetector) {
        _stopInputModalityDetector();
        _stopInputModalityDetector = null;
      }
      clearTimeout(_windowFocusTimeoutId);
      clearTimeout(_originTimeoutId);
    }
  }
  function _originChanged(element, origin, elementInfo, event) {
    _setClasses(element, origin);
    _emitOrigin(elementInfo.subject, origin, event);
    _lastFocusOrigin = origin;
  }
  function _getClosestElementsInfo(element) {
    const results = [];
    _elementInfo.forEach((info2, currentElement) => {
      if (currentElement === element || info2.checkChildren && currentElement.contains(element)) {
        results.push([currentElement, info2]);
      }
    });
    return results;
  }
  tryOnScopeDispose(() => _elementInfo.forEach((_info, element) => stopMonitoring(element)));
  return { monitor, stopMonitoring, focusVia, blurVia };
}
const useSharedFocusMonitor = createSharedComposable(() => useFocusMonitor());
const FORM_TOKEN = Symbol("FORM_TOKEN");
const FORM_ITEM_TOKEN = Symbol("FORM_ITEM_TOKEN");
function useFormItemRegister(control) {
  const context = inject(FORM_ITEM_TOKEN, null);
  if (context) {
    const key = useKey();
    const { registerControl, unregisterControl } = context;
    registerControl(key, control);
    onBeforeUnmount(() => unregisterControl(key));
  }
}
function useFormElement() {
  const elementRef = ref();
  const focus = (options) => {
    var _a2;
    (_a2 = elementRef.value) == null ? void 0 : _a2.focus(options);
  };
  const blur = () => {
    var _a2;
    return (_a2 = elementRef.value) == null ? void 0 : _a2.blur();
  };
  return { elementRef, focus, blur };
}
function useFormFocusMonitor(options) {
  const focusMonitor = useSharedFocusMonitor();
  const elementRef = ref();
  let watchStopHandle;
  watch(elementRef, (currElement, prevElement) => {
    if (watchStopHandle) {
      watchStopHandle();
    }
    if (prevElement) {
      focusMonitor.stopMonitoring(prevElement);
    }
    watchStopHandle = watch(focusMonitor.monitor(currElement, options.checkChildren), (evt) => {
      const { origin, event } = evt;
      if (event) {
        origin ? options.handleFocus(event) : options.handleBlur(event);
      }
    });
  });
  onBeforeUnmount(() => {
    if (watchStopHandle) {
      watchStopHandle();
    }
    focusMonitor.stopMonitoring(elementRef.value);
  });
  const focus = (options2) => focusMonitor.focusVia(elementRef.value, "program", options2);
  const blur = () => focusMonitor.blurVia(elementRef.value);
  return { elementRef, focus, blur };
}
function useFormSize(props, config) {
  const formContext = inject(FORM_TOKEN, null);
  return computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.size) != null ? _a2 : formContext == null ? void 0 : formContext.size.value) != null ? _b : config.size;
  });
}
function useFormStatus(props, control) {
  return computed(() => {
    if (props.status) {
      return props.status;
    }
    const currControl = control.value;
    if (!currControl || currControl.disabled.value) {
      return void 0;
    }
    const { trigger: trigger2, dirty, blurred, status } = currControl;
    if (trigger2 === "change" && dirty.value || trigger2 === "blur" && blurred.value) {
      return status.value;
    }
    return void 0;
  });
}
const spaceProps = {
  align: String,
  block: {
    type: Boolean,
    default: void 0
  },
  justify: String,
  size: [Number, String, Array],
  separator: String,
  vertical: {
    type: Boolean,
    default: void 0
  },
  wrap: {
    type: Boolean,
    default: void 0
  }
};
const flexGapSupported = supportsFlexGap();
const defaultSizeMap = {
  sm: "8px",
  md: "16px",
  lg: "24px"
};
var Space = /* @__PURE__ */ defineComponent({
  name: "IxSpace",
  props: spaceProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-space`);
    const config = useGlobalConfig$1("space");
    const wrap = computed(() => {
      var _a2;
      return (_a2 = props.wrap) != null ? _a2 : config.wrap;
    });
    const mergedGaps = computed(() => {
      const {
        size: size2 = config.size
      } = props;
      const sizes = Array.isArray(size2) ? size2 : [size2, size2];
      return sizes.map((size22) => defaultSizeMap[size22] || convertCssPixel(size22));
    });
    const classes = computed(() => {
      const {
        align,
        justify,
        block,
        vertical
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-align-${align}`]: align,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-justify-${justify}`]: justify,
        [`${prefixCls}-nowrap`]: !wrap.value,
        [`${prefixCls}-vertical`]: vertical
      });
    });
    const style = computed(() => {
      const [rowGap, columnGap] = mergedGaps.value;
      if (flexGapSupported) {
        return `gap: ${rowGap} ${columnGap}`;
      } else {
        return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : void 0;
      }
    });
    return () => {
      var _a2;
      const nodes = flattenNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
      if (nodes.length === 0) {
        return;
      }
      const prefixCls = mergedPrefixCls.value;
      const children = [];
      const separatorNode = convertStringVNode(slots, props, "separator");
      const lastIndex = nodes.length - 1;
      nodes.forEach((node, index) => {
        const style2 = calcItemStyle(mergedGaps, wrap, props.vertical, index, lastIndex);
        children.push(createVNode("div", {
          "key": `item-${index}`,
          "class": `${prefixCls}-item`,
          "style": style2
        }, [node]));
        if (separatorNode && index < lastIndex) {
          children.push(createVNode("div", {
            "key": `separator-${index}`,
            "class": `${prefixCls}-item-separator`,
            "style": style2
          }, [separatorNode]));
        }
      });
      return createVNode("div", {
        "class": classes.value,
        "style": style.value
      }, [children]);
    };
  }
});
const calcItemStyle = (mergedGaps, wrap, vertical, index, lastIndex) => {
  if (flexGapSupported) {
    return void 0;
  }
  const [rowGap, columnGap] = mergedGaps.value;
  if (vertical) {
    const marginBottom = index < lastIndex ? convertCssPixel(rowGap) : void 0;
    return {
      marginBottom
    };
  } else {
    const marginRight = index < lastIndex ? convertCssPixel(columnGap) : void 0;
    const paddingBottom = wrap.value ? convertCssPixel(rowGap) : void 0;
    return {
      marginRight,
      paddingBottom
    };
  }
};
const IxSpace = Space;
const inputProps$1 = {
  addonAfter: String,
  addonBefore: String,
  borderless: {
    type: Boolean,
    default: void 0
  },
  clearable: {
    type: Boolean,
    default: void 0
  },
  clearIcon: String,
  clearVisible: {
    type: Boolean,
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  focused: {
    type: Boolean,
    default: void 0
  },
  prefix: String,
  size: String,
  status: String,
  suffix: String,
  onClear: Function
};
var Input$1 = /* @__PURE__ */ defineComponent({
  name: "ɵInput",
  inheritAttrs: false,
  props: inputProps$1,
  setup(props, {
    attrs,
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-input`);
    const inputRef = ref();
    const getInputElement = () => inputRef.value;
    expose({
      getInputElement
    });
    const classes = computed(() => {
      const {
        borderless,
        clearable,
        disabled,
        focused,
        size: size2,
        status,
        addonAfter,
        addonBefore,
        prefix,
        suffix
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${size2}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: clearable,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
        [`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
        [`${prefixCls}-with-prefix`]: prefix || slots.prefix,
        [`${prefixCls}-with-suffix`]: suffix || slots.suffix
      });
    });
    return () => {
      const {
        clearable,
        clearIcon,
        clearVisible,
        disabled,
        addonAfter,
        addonBefore,
        prefix,
        suffix,
        onClear
      } = props;
      const prefixCls = mergedPrefixCls.value;
      const addonBeforeNode = renderAddon(slots.addonBefore, addonBefore, `${prefixCls}-addon`, "__before-addon");
      const addonAfterNode = renderAddon(slots.addonAfter, addonAfter, `${prefixCls}-addon`, "__before-after");
      const prefixNode = renderIcon(slots.prefix, prefix, `${prefixCls}-prefix`, "__prefix");
      const suffixNode = renderIcon(slots.suffix, suffix, `${prefixCls}-suffix`, "__suffix");
      const clearNode = clearable && createVNode("span", {
        "key": "__clear",
        "class": `${prefixCls}-clear${clearVisible ? " visible" : ""}`,
        "onClick": onClear
      }, [slots.clearIcon ? slots.clearIcon() : createVNode(IxIcon, {
        "name": clearIcon
      }, null)]);
      if (!(addonBeforeNode || addonAfterNode || prefixNode || suffixNode || clearNode)) {
        return createVNode("input", mergeProps({
          "ref": inputRef,
          "class": classes.value,
          "disabled": disabled
        }, attrs), null);
      }
      const {
        class: className,
        style,
        ...rest
      } = attrs;
      const classNames = normalizeClass([classes.value, className]);
      const inputNode = createVNode("input", mergeProps({
        "ref": inputRef,
        "class": `${prefixCls}-inner`,
        "disabled": disabled
      }, rest), null);
      if (!(addonBeforeNode || addonAfterNode)) {
        return createVNode("span", {
          "class": classNames,
          "style": style
        }, [prefixNode, inputNode, suffixNode, clearNode]);
      }
      if (!(prefixNode || suffixNode || clearNode)) {
        return createVNode("span", {
          "class": classNames,
          "style": style
        }, [addonBeforeNode, inputNode, addonAfterNode]);
      }
      return createVNode("span", {
        "class": classNames,
        "style": style
      }, [addonBeforeNode, createVNode("span", {
        "key": "__wrapper",
        "class": `${prefixCls}-wrapper`
      }, [prefixNode, inputNode, suffixNode, clearNode]), addonAfterNode]);
    };
  }
});
function renderAddon(slot, prop, cls, key) {
  if (!(slot || prop)) {
    return void 0;
  }
  return createVNode("span", {
    "key": key,
    "class": cls
  }, [slot ? slot() : prop]);
}
function renderIcon(slot, prop, cls, key) {
  if (!(slot || prop)) {
    return void 0;
  }
  return createVNode("span", {
    "key": key,
    "class": cls
  }, [slot ? slot() : createVNode(IxIcon, {
    "name": prop
  }, null)]);
}
const ɵInput = Input$1;
const inputCommonProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  value: { type: String, default: void 0 },
  clearable: { type: Boolean, default: void 0 },
  clearIcon: { type: String, default: void 0 },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  size: { type: String, default: void 0 },
  status: String,
  trim: { type: Boolean, default: void 0 },
  "onUpdate:value": [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  onCompositionStart: [Function, Array],
  onCompositionEnd: [Function, Array],
  onInput: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array]
};
const inputProps = {
  ...inputCommonProps,
  addonAfter: { type: String, default: void 0 },
  addonBefore: { type: String, default: void 0 },
  borderless: { type: Boolean, default: void 0 },
  prefix: { type: String, default: void 0 },
  suffix: { type: String, default: void 0 }
};
function useInput(props, config) {
  const { accessor, control } = useAccessorAndControl();
  useFormItemRegister(control);
  const mergedSize = useFormSize(props, config);
  const mergedStatus = useFormStatus(props, control);
  const clearable = computed(() => {
    var _a2;
    return (_a2 = props.clearable) != null ? _a2 : config.clearable;
  });
  const clearIcon = computed(() => {
    var _a2;
    return (_a2 = props.clearIcon) != null ? _a2 : config.clearIcon;
  });
  const clearVisible = computed(() => !accessor.disabled && !props.readonly && !!accessor.value);
  const mergedTrim = computed(() => {
    var _a2;
    return (_a2 = props.trim) != null ? _a2 : config.trim;
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
    if (mergedTrim.value) {
      setValue(evt.target.value.trim());
    }
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
    var _a2;
    const element = elementRef.value;
    const value = (_a2 = accessor.value) != null ? _a2 : "";
    if (element && element.value !== value) {
      element.value = value;
    }
  };
  watch(
    () => accessor.value,
    () => syncValue()
  );
  const isComposing = ref(false);
  const handleInput = (evt, emitInput = true) => {
    emitInput && callEmit(props.onInput, evt);
    if (isComposing.value) {
      return;
    }
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
var Input = /* @__PURE__ */ defineComponent({
  name: "IxInput",
  props: inputProps,
  setup(props, {
    slots,
    expose
  }) {
    const config = useGlobalConfig$1("input");
    const {
      elementRef,
      accessor,
      mergedSize,
      mergedStatus,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,
      focus,
      blur,
      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue
    } = useInput(props, config);
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
      const {
        addonAfter,
        addonBefore,
        borderless,
        prefix,
        suffix
      } = props;
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
        "size": mergedSize.value,
        "status": mergedStatus.value,
        "suffix": suffix,
        "onClear": handleClear,
        "readonly": props.readonly,
        "onInput": handleInput,
        "onCompositionstart": handleCompositionStart,
        "onCompositionend": handleCompositionEnd
      }, slots);
    };
  }
});
const IxInput = Input;
const zhCN = {
  type: "zh-CN",
  table: {
    layout: {
      title: "布局设置",
      sm: "紧凑",
      md: "适中",
      lg: "宽松",
      placeholder: "搜索关键字",
      all: "全部",
      reset: "重置",
      indexable: "序号",
      expandable: "展开",
      selectable: "勾选",
      startPin: "固定在列首",
      endPin: "固定在列尾",
      noPin: "不固定",
      startPinTitle: "固定在列首",
      endPinTitle: "固定在列尾",
      noPinTitle: "不固定"
    }
  },
  tree: {
    expandAll: "展开全部",
    collapseAll: "收起全部"
  },
  search: {
    keyword: "关键字",
    ok: "确定",
    cancel: "取消",
    selectAll: "全选",
    placeholder: "点击选择筛选条件, 按回车键确认",
    switchToDatePanel: "切换日期选择",
    switchToTimePanel: "切换时间选择"
  }
};
const defaultConfig = {
  common: { prefixCls: "ix-pro" },
  locale: zhCN,
  form: {
    ajvOptions: {
      allErrors: true,
      loopEnum: 50,
      code: { esm: true }
    },
    autoId: true,
    autoLabelFor: true,
    formatComponents: {
      default: { component: IxInput }
    },
    ignoreKeywords: ["type", "enum"],
    schemaFormatter: (fields, schema) => ({ fields: fields || {}, schema: schema || {} })
  },
  table: {
    layoutTool: {
      changeSize: true,
      resetable: true,
      searchable: false
    }
  },
  tree: {
    clearIcon: "close-circle",
    collapseIcon: ["collapse", "uncollapse"]
  },
  textarea: {
    clearable: false,
    clearIcon: "close-circle",
    resize: "none",
    size: "md",
    showCount: false,
    trim: false
  },
  search: {
    clearable: true,
    clearIcon: "close-circle",
    searchIcon: "search"
  }
};
const tokens = Object.keys(defaultConfig).map((key) => [
  key,
  Symbol(key)
]);
const tokenMap = new Map(tokens);
const createGlobalConfig = (config) => {
  const install2 = (app2) => {
    const compNames = Object.keys(config);
    compNames.forEach((compName) => {
      const token = tokenMap.get(compName);
      const currConfig = defaultConfig[compName];
      merge$1(currConfig, config[compName]);
      app2.provide(token, currConfig);
    });
  };
  return { install: install2 };
};
function useGlobalConfig(compName, config) {
  const token = tokenMap.get(compName);
  const currConfig = inject(token, defaultConfig[compName]);
  if (!config) {
    return currConfig;
  }
  const cloneConfig = reactive(merge$1(cloneDeep(currConfig), config));
  provide(token, cloneConfig);
  return [cloneConfig, (config2) => merge$1(cloneConfig, config2)];
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
addIconDefinitions(IDUX_ICON_DEPENDENCIES);
addIconDefinitions([Expand, Unexpand, Copy, Link, Control, Up, InfoCircle]);
const globalConfig = createGlobalConfig$1({
  common: {
    prefixCls: "archive-app"
  }
});
const proGlobalConfig = createGlobalConfig({
  common: {
    prefixCls: "archive-app-pro"
  }
});
const install = (app2) => {
  app2.use(globalConfig).use(proGlobalConfig);
};
const iduxInstall = { install };
const mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
let mediaQueryStyleNode;
function createEmptyStyleRule(query) {
  if (mediaQueriesForWebkitCompatibility.has(query)) {
    return;
  }
  try {
    if (!mediaQueryStyleNode) {
      mediaQueryStyleNode = document.createElement("style");
      mediaQueryStyleNode.setAttribute("type", "text/css");
      document.head.appendChild(mediaQueryStyleNode);
    }
    if (mediaQueryStyleNode.sheet) {
      ;
      mediaQueryStyleNode.sheet.insertRule(`@media ${query} {.fx-query-test{ }}`, 0);
      mediaQueriesForWebkitCompatibility.add(query);
    }
  } catch (err) {
    Logger.error("cdk/breakpoint", err);
  }
}
function noopMatchMedia(query) {
  return {
    matches: query === "all" || query === "",
    media: query,
    addEventListener: () => {
    },
    removeEventListener: () => {
    }
  };
}
const _matchMedia = isBrowser$1 && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
const matchMedia = (query) => {
  if (isWebKit) {
    createEmptyStyleRule(query);
  }
  return _matchMedia(query);
};
const _queries = /* @__PURE__ */ new Map();
function useMediaQuery(value) {
  const queries = splitQueries(value).map((query) => registerQuery(query));
  tryOnScopeDispose(() => {
    queries.forEach((query) => {
      query.referenceCnt--;
      if (query.referenceCnt > 0) {
        return;
      }
      query.destroy();
      _queries.delete(query.media);
    });
  });
  return computed(() => {
    let matches = false;
    const medias = {};
    queries.forEach((query) => {
      const currMatches = query.matches.value;
      matches = matches || currMatches;
      medias[query.media] = currMatches;
    });
    return { matches, medias };
  });
}
function registerQuery(query) {
  if (_queries.has(query)) {
    const output2 = _queries.get(query);
    output2.referenceCnt++;
    return output2;
  }
  const mql = matchMedia(query);
  const matches = ref(mql.matches);
  const handler = (evt) => {
    matches.value = evt.matches;
  };
  mql.addEventListener("change", handler);
  const destroy = () => mql.removeEventListener("change", handler);
  const output = { referenceCnt: 1, matches, destroy, media: query };
  _queries.set(query, output);
  return output;
}
function splitQueries(queries) {
  return convertArray(queries).map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
const BREAKPOINTS_KEYS = ["xs", "sm", "md", "lg", "xl"];
const BREAKPOINTS = {
  xs: "(max-width: 599.99px)",
  sm: "(min-width: 600px) and (max-width: 959.99px)",
  md: "(min-width: 960px) and (max-width: 1279.99px)",
  lg: "(min-width: 1280px) and (max-width: 1719.99px)",
  xl: "(min-width: 1720px)"
};
const BREAKPOINTS_TOKEN = Symbol("cdk-breakpoints");
function useBreakpoints(value) {
  const medias = value != null ? value : inject(BREAKPOINTS_TOKEN, BREAKPOINTS);
  const queryState = useMediaQuery(Object.values(medias));
  const match2 = reactive({});
  watchEffect(() => {
    const state = queryState.value;
    Object.entries(medias).forEach(([key, value2]) => {
      match2[key] = state.medias[value2];
    });
  });
  return match2;
}
const useSharedBreakpoints = createSharedComposable(() => useBreakpoints());
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const themeToken = Symbol("theme");
const appContextToken = Symbol("appContext");
const breakpointsToken = Symbol("breakpoint");
const pageContextToken = Symbol("pageContext");
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function resolvePageProps(pageData, theme, renderers, options) {
  return {
    pageData,
    theme,
    options,
    renderers
  };
}
const defaultLogoImg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdD0iMTY0MDMzOTM2ODExNCIKICAgIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcC1pZD0iNDExNyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPgogICAgPC9kZWZzPgogICAgPHBhdGggZD0iTTcyMCAxOTMuMTJMODk2IDI5NC43MnY0NDMuNTJMNTEyIDk2MCAxMjggNzM4LjI0VjI5NC43MmwxNzYtMTAxLjZ2NDQzLjg3MmwyMDggMTIwIDIwOC0xMjBWMTkzLjEyeiIKICAgICAgICBmaWxsPSIjMUU3MUZGIiBwLWlkPSI0MTE4Ij48L3BhdGg+CiAgICA8cGF0aCBkPSJNMzA0IDE5My4xMnY0NDMuODcybDIwOCAxMjBWOTYwTDEyOCA3MzguMjRWMjk0LjcybDE3Ni0xMDEuNnoiIGZpbGw9IiMwRTU0Q0MiIHAtaWQ9IjQxMTkiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik01MTIgNzIuOTkybDExMiA2NC43Njh2MTI5LjUwNEw1MTIgMzMybC0xMTItNjQuNzM2VjEzNy43NnoiIGZpbGw9IiMxRTcxRkYiIHAtaWQ9IjQxMjAiPjwvcGF0aD4KICAgIDxwYXRoIGQ9Ik00MDAgMTM3Ljc2TDUxMiAyMDIuNDk2djEyOS41MDRsLTExMi02NC43MzZWMTM3Ljc2eiIgZmlsbD0iIzBFNTRDQyIgcC1pZD0iNDEyMSI+PC9wYXRoPgogICAgPHBhdGggZD0iTTUxMiAzODhsMTEyIDY0LjczNnYxMjkuNTA0TDUxMiA2NDcuMDRsLTExMi02NC43Njh2LTEyOS41MDR6IiBmaWxsPSIjMzBENTlGIiBwLWlkPSI0MTIyIj48L3BhdGg+CiAgICA8cGF0aCBkPSJNNDAwIDQ1Mi45OTJMNTEyIDUxNy43NnYxMjkuNTA0bC0xMTItNjQuNzY4di0xMjkuNTA0eiIgZmlsbD0iIzFEQTM3NyIgcC1pZD0iNDEyMyI+PC9wYXRoPgo8L3N2Zz4K";
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const defaultBreakpoints = {
  xs: "(min-width: 0px) and (max-width: 1023.99px)",
  sm: "(min-width: 1024px) and (max-width: 1365.99px)",
  md: "(min-width: 1366px) and (max-width: 1720.99px)",
  lg: "(min-width: 1721px) and (max-width: 1920.99px)",
  xl: "(min-width: 1921px)"
};
function resolveThemeOptions(options) {
  var _a3, _b2, _c2, _d2, _e2, _f, _g;
  var _a2, _b, _c, _d, _e;
  const { theme, baseUrl } = options != null ? options : {};
  return {
    logo: (_a3 = theme == null ? void 0 : theme.logo) != null ? _a3 : {
      image: defaultLogoImg,
      title: "IDUX Archive",
      link: baseUrl != null ? baseUrl : "/"
    },
    breakpoints: (_b2 = theme == null ? void 0 : theme.breakpoints) != null ? _b2 : defaultBreakpoints,
    layout: {
      theme: (_c2 = (_a2 = theme == null ? void 0 : theme.layout) == null ? void 0 : _a2.theme) != null ? _c2 : "dark",
      type: (_d2 = (_b = theme == null ? void 0 : theme.layout) == null ? void 0 : _b.type) != null ? _d2 : "both",
      siderCollapsable: (() => {
        var _a22;
        const siderCollapsable = (_a22 = theme == null ? void 0 : theme.layout) == null ? void 0 : _a22.siderCollapsable;
        if (isString(siderCollapsable)) {
          return siderCollapsable;
        }
        if (siderCollapsable === false) {
          return false;
        }
        return "top";
      })()
    },
    footer: theme == null ? void 0 : theme.footer,
    page: {
      headerAffix: (_e2 = (_c = theme == null ? void 0 : theme.page) == null ? void 0 : _c.headerAffix) != null ? _e2 : false,
      enableAnchor: (_f = (_d = theme == null ? void 0 : theme.page) == null ? void 0 : _d.enableAnchor) != null ? _f : true,
      anchorMaxLevel: (_g = (_e = theme == null ? void 0 : theme.page) == null ? void 0 : _e.anchorMaxLevel) != null ? _g : 3
    }
  };
}
const buttonToken = Symbol("button");
const buttonProps = {
  block: { type: Boolean, default: void 0 },
  danger: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: void 0 },
  ghost: { type: Boolean, default: void 0 },
  icon: String,
  loading: { type: Boolean, default: void 0 },
  mode: String,
  size: String,
  shape: String,
  type: { type: String, default: "button" },
  waveless: { type: Boolean, default: void 0 },
  onClick: [Function, Array]
};
const aProps = ["href", "target", "rel", "download", "hreflang", "ping"];
var Button = /* @__PURE__ */ defineComponent({
  name: "IxButton",
  props: buttonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-button`);
    const config = useGlobalConfig$1("button");
    const groupProps = inject(buttonToken, {});
    const formContext = inject(FORM_TOKEN, null);
    const waveRef = ref();
    const mode = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = props.mode) != null ? _a2 : groupProps.mode) != null ? _b : "default";
    });
    const size2 = computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = props.size) != null ? _a2 : groupProps.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
    });
    const mergedWaveless = computed(() => {
      var _a2;
      return mode.value === "text" || mode.value === "link" || ((_a2 = props.waveless) != null ? _a2 : config.waveless);
    });
    const classes = computed(() => {
      const {
        block = groupProps.block,
        danger = groupProps.danger,
        disabled = groupProps.disabled,
        ghost = groupProps.ghost,
        loading,
        icon,
        shape = groupProps.shape
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-danger`]: danger,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-ghost`]: ghost,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-icon-only`]: !slots.default && (icon || loading || slots.icon),
        [`${prefixCls}-${mode.value}`]: mode.value,
        [`${prefixCls}-${shape}`]: !!shape,
        [`${prefixCls}-${size2.value}`]: true
      });
    });
    const handleClick = (evt) => {
      if (props.disabled || props.loading) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return;
      }
      if (!mergedWaveless.value && waveRef.value) {
        waveRef.value.play();
      }
      callEmit(props.onClick, evt);
    };
    return () => {
      const {
        disabled,
        loading,
        icon,
        type
      } = props;
      const children = [];
      if (loading) {
        children.push(createVNode(IxIcon, {
          "name": "loading"
        }, null));
      } else if (slots.icon) {
        children.push(slots.icon());
      } else if (icon) {
        children.push(createVNode(IxIcon, {
          "name": icon
        }, null));
      }
      if (slots.default) {
        children.push(createVNode("span", null, [slots.default()]));
      }
      if (mode.value === "link" && Object.keys(attrs).some((attr) => aProps.includes(attr))) {
        return createVNode("a", {
          "class": classes.value,
          "onClick": handleClick
        }, [children]);
      }
      return createVNode("button", {
        "class": classes.value,
        "disabled": disabled || loading,
        "type": type,
        "onClick": handleClick
      }, [children, !mergedWaveless.value && createVNode(ɵWave, {
        "ref": waveRef
      }, null)]);
    };
  }
});
const IxButton = Button;
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function m(l2) {
  let e2 = l2.parentElement;
  for (; e2; ) {
    const { overflowY: n2, display: o2 } = getComputedStyle(e2);
    if ((n2 === "auto" || n2 === "hidden" || n2 === "scroll") && !/inline/.test(o2))
      return e2;
    e2 = e2.parentElement;
  }
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function u(l2, e2, n2, o2 = "pre") {
  const p2 = (s2, i2) => {
    for (let r2 = 0; r2 < s2.length; r2++) {
      const t2 = s2[r2];
      o2 === "pre" && n2(t2, i2), t2[e2] && p2(t2[e2], [t2, ...i2]), o2 === "post" && n2(t2, i2);
    }
  };
  p2(l2, []);
}
function d(l2, e2, n2) {
  const o2 = (p2, s2) => {
    const i2 = [];
    for (let r2 = 0; r2 < p2.length; r2++) {
      const t2 = p2[r2], f2 = n2(t2, s2);
      if (f2) {
        if (t2[e2]) {
          const c2 = o2(t2[e2], [t2, ...s2]);
          f2[e2] = c2;
        }
        i2.push(f2);
      }
    }
    return i2;
  };
  return o2(l2, []);
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a2;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e2) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e2) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1)
        listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        warn("Error with push/replace State", err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [
    1
    /* ErrorTypes.MATCHER_NOT_FOUND */
  ]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [
    2
    /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
  ]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [
    4
    /* ErrorTypes.NAVIGATION_ABORTED */
  ]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [
    8
    /* ErrorTypes.NAVIGATION_CANCELLED */
  ]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [
    16
    /* ErrorTypes.NAVIGATION_DUPLICATED */
  ]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error2, type) {
  return error2 instanceof Error && NavigationFailureSymbol in error2 && (type == null || !!(error2.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if ("path" in to)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys2 = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys2.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match2 = path.match(re);
    const params = {};
    if (!match2)
      return null;
    for (let i2 = 1; i2 < match2.length; i2++) {
      const value = match2[i2] || "";
      const key = keys2[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys: keys2,
    parse,
    stringify
  };
}
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Route paths should start with a "/": "${path}" should be "/${path}".`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens2 = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens2.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens2;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k2) => k2.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`);
      }
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys2) {
  const newParams = {};
  for (const key of keys2) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "boolean" ? props : props[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a2, b2) {
  return a2.name === b2.name && a2.optional === b2.optional && a2.repeatable === b2.repeatable;
}
function checkSameParams(a2, b2) {
  for (const key of a2.keys) {
    if (!key.optional && !b2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b2.keys) {
    if (!key.optional && !a2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers = [];
  function add2(handler) {
    handlers.push(handler);
    return () => {
      const i2 = handlers.indexOf(handler);
      if (i2 > -1)
        handlers.splice(i2, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add: add2,
    list: () => handlers,
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err) => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise = rawComponent;
          rawComponent = () => promise;
        } else if (rawComponent.__asyncLoader && // warn only once per component
        !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop);
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h$2("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$2(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info2 = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r2) => r2.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info2;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition"))) {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    // remove variables that can contain vue instances
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app2, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: app2
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info2 = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info2.name ? `${info2.name.toString()}: ` : "") + info2.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label: devtoolsData.route.path,
            textColor: 0,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error2, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error: error2 },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("❌");
      } else {
        data.status = formatDisplay("✅");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => (
          // save matches state based on the payload
          isRouteMatching(route, payload.filter.toLowerCase())
        ));
      }
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app2 && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app2 && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match2) => isSameRouteRecord(match2, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys2) {
  const ret = {};
  for (const key in obj) {
    if (!keys2.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      if ("params" in rawLocation && !("name" in rawLocation) && // @ts-expect-error: the type is never
      Object.keys(rawLocation.params).length) {
        warn(`Path "${// @ts-expect-error: the type is never
        rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(rawLocation.params)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${"path" in rawLocation ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      if (!("path" in newTargetLocation) && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error2) => isNavigationFailure(error2) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error2,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error2 : markAsReady(error2)
    ) : (
      // reject any unknown error
      triggerError(error2, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          if (
            // we are redirecting to the same location we were already at
            isSameRouteLocation(stringifyQuery$1, resolve(failure2.to), toLocation) && // and we have done it a couple of times
            redirectedFrom && // @ts-expect-error: added only in dev
            (redirectedFrom._count = redirectedFrom._count ? (
              // @ts-expect-error
              redirectedFrom._count + 1
            ) : 1) > 10
          ) {
            warn(`Detected an infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error2 = checkCanceledNavigation(to, from);
    return error2 ? Promise.reject(error2) : Promise.resolve();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(
      err,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list())
      guard(to, from, failure);
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error2 = checkCanceledNavigation(toLocation, from);
    if (error2)
      return error2;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info2) => {
      if (!router.listening)
        return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info2.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error2) => {
        if (isNavigationFailure(
          error2,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error2;
        }
        if (isNavigationFailure(
          error2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error2.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info2.delta && info2.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info2.delta) {
          routerHistory.go(-info2.delta, false);
        }
        return triggerError(error2, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info2.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info2.delta, false);
          } else if (info2.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error2, to, from) {
    markAsReady(error2);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error2, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error2);
    }
    return Promise.reject(error2);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve2, reject) => {
      readyHandlers.add([resolve2, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve2, reject]) => err ? reject(err) : resolve2());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router2 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router2;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
          warn("Unexpected error when starting the router:", err);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app2.provide(routerKey, router2);
      app2.provide(routeLocationKey, reactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser) {
        addDevtools(app2, router2, matcher);
      }
    }
  };
  return router;
}
function runGuardQueue(guards) {
  return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRoute() {
  return inject(routeLocationKey);
}
const layoutProps = {
  fixed: { type: [Boolean, Object], default: false },
  floatSider: { type: Boolean, default: false }
};
const layoutHeaderProps = {};
const layoutContentProps = {};
const layoutFooterProps = {};
const layoutSiderProps = {
  collapsed: { type: Boolean, default: void 0 },
  breakpoint: String,
  pointer: { type: Boolean, default: false },
  pointerDelay: { type: [Number, Array], default: () => [0, 100] },
  "onUpdate:collapsed": [Function, Array]
};
const layoutSiderTriggerProps = {
  icon: {
    type: [String, Array],
    default: void 0
  }
};
var Layout = /* @__PURE__ */ defineComponent({
  name: "IxLayout",
  props: layoutProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`);
    const mergedFixed = computed(() => {
      const {
        fixed
      } = props;
      if (isObject(fixed)) {
        const {
          header = false,
          sider = false
        } = fixed;
        return {
          header,
          sider
        };
      }
      return {
        header: fixed,
        sider: fixed
      };
    });
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      const {
        header,
        sider
      } = mergedFixed.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-fixed-header`]: header,
        [`${prefixCls}-fixed-sider`]: sider,
        [`${prefixCls}-float-sider`]: props.floatSider
      });
    });
    return () => {
      var _a2;
      return createVNode("section", {
        "class": classes.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutContent = /* @__PURE__ */ defineComponent({
  name: "IxLayoutContent",
  props: layoutContentProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-content`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("main", {
        "class": `${prefixCls}`
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutFooter = /* @__PURE__ */ defineComponent({
  name: "IxLayoutFooter",
  props: layoutFooterProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-footer`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("footer", {
        "class": prefixCls
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutHeader = /* @__PURE__ */ defineComponent({
  name: "IxLayoutHeader",
  props: layoutHeaderProps,
  setup(_, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-header`);
    return () => {
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("header", {
        "class": prefixCls
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
const layoutSiderToken = Symbol("layoutSider");
var LayoutSider = /* @__PURE__ */ defineComponent({
  name: "IxLayoutSider",
  props: layoutSiderProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout-sider`);
    const [collapsed, setCollapsed] = useControlledProp(props, "collapsed", false);
    provide(layoutSiderToken, {
      mergedPrefixCls,
      collapsed,
      setCollapsed
    });
    const breakpointIndex = computed(() => {
      const {
        breakpoint
      } = props;
      return breakpoint ? BREAKPOINTS_KEYS.indexOf(breakpoint) : -1;
    });
    const useBreakpoint = computed(() => breakpointIndex.value > -1);
    const breakpoints = useSharedBreakpoints();
    let stopBreakpoints;
    watch(useBreakpoint, (breakpoint) => {
      stopBreakpoints == null ? void 0 : stopBreakpoints();
      if (breakpoint) {
        stopBreakpoints = watchEffect(() => {
          const currBreakpointIndex = BREAKPOINTS_KEYS.findIndex((key) => breakpoints[key]);
          setCollapsed(currBreakpointIndex <= breakpointIndex.value, "breakpoint");
        });
      }
    }, {
      immediate: true
    });
    let timer;
    const setCollapsedWithDelay = (collapsed2) => {
      const {
        pointerDelay
      } = props;
      const [showDelay, hideDelay] = Array.isArray(pointerDelay) ? pointerDelay : [pointerDelay, pointerDelay];
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setCollapsed(collapsed2, "pointer");
        timer = void 0;
      }, collapsed2 ? showDelay : hideDelay);
    };
    const pointerEvents = computed(() => {
      if (!props.pointer) {
        return void 0;
      }
      return {
        onPointerenter: () => setCollapsedWithDelay(false),
        onPointerleave: () => setCollapsedWithDelay(true)
      };
    });
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value
      });
    });
    return () => {
      var _a2;
      return createVNode("aside", mergeProps({
        "class": classes.value
      }, pointerEvents.value), [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
    };
  }
});
var LayoutSiderTrigger = /* @__PURE__ */ defineComponent({
  name: "IxLayoutSiderTrigger",
  props: layoutSiderTriggerProps,
  setup(props, {
    slots
  }) {
    const {
      mergedPrefixCls,
      collapsed,
      setCollapsed
    } = inject(layoutSiderToken);
    const mergedIcon = computed(() => {
      const {
        icon
      } = props;
      const [fold = "menu-fold", unfold = "menu-unfold"] = Array.isArray(icon) ? icon : [icon, icon];
      return collapsed.value ? fold : unfold;
    });
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-trigger`;
      return {
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value
      };
    });
    const handleClick = () => {
      setCollapsed(!collapsed.value, "trigger");
    };
    return () => {
      var _a2;
      let iconNode;
      if (slots.icon) {
        iconNode = slots.icon({
          collapsed: collapsed.value
        });
      } else {
        const iconValue = mergedIcon.value;
        iconNode = isString(iconValue) ? createVNode(IxIcon, {
          "name": iconValue
        }, null) : iconValue;
      }
      return createVNode("div", {
        "class": classes.value
      }, [createVNode("span", null, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), createVNode(IxButton, {
        "mode": "text",
        "onClick": handleClick
      }, {
        icon: () => iconNode
      })]);
    };
  }
});
const IxLayout = Layout;
const IxLayoutContent = LayoutContent;
const IxLayoutFooter = LayoutFooter;
const IxLayoutHeader = LayoutHeader;
const IxLayoutSider = LayoutSider;
const IxLayoutSiderTrigger = LayoutSiderTrigger;
const dropdownToken = Symbol("dropdownToken");
const collapseTransitionProps = {
  appear: {
    type: Boolean,
    default: false
  },
  name: String,
  mode: {
    type: String,
    default: "height"
  },
  onAfterEnter: [Function, Array],
  onAfterLeave: [Function, Array]
};
var CollapseTransition = /* @__PURE__ */ defineComponent({
  name: "ɵCollapseTransition",
  props: collapseTransitionProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-collapse-transition`);
    const onBeforeEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = `0px`;
      el.style.opacity = "0";
    };
    const onEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = `${mode === "width" ? el.scrollWidth : el.scrollHeight}px`;
      el.style.opacity = "1";
    };
    const onAfterEnter = (el) => {
      const mode = props.mode;
      el.style[mode] = "";
      el.style.opacity = "";
      callEmit(props.onAfterEnter);
    };
    const onBeforeLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = `${mode === "width" ? el.offsetWidth : el.offsetHeight}px`;
    };
    const onLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = `0px`;
      el.style.opacity = "0";
    };
    const onAfterLeave = (el) => {
      const mode = props.mode;
      el.style[mode] = "";
      el.style.opacity = "";
      callEmit(props.onAfterLeave);
    };
    return () => {
      const {
        appear,
        name = mergedPrefixCls.value
      } = props;
      return createVNode(Transition, {
        "appear": appear,
        "name": name,
        "onBeforeEnter": onBeforeEnter,
        "onEnter": onEnter,
        "onAfterEnter": onAfterEnter,
        "onBeforeLeave": onBeforeLeave,
        "onLeave": onLeave,
        "onAfterLeave": onAfterLeave
      }, {
        default: () => [slots.default()]
      });
    };
  }
});
const ɵCollapseTransition = CollapseTransition;
const itemKey = "__IDUX_MENU_ITEM";
const itemGroupKey = "__IDUX_MENU_ITEM_GROUP";
const subKey = "__IDUX_MENU_SUB";
const dividerKey = "__IDUX_MENU_DIVIDER";
function useDataSource(props, slots) {
  return computed(() => {
    var _a2;
    const { dataSource } = props;
    if (dataSource) {
      return dataSource;
    } else {
      return convertDataSource((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
    }
  });
}
const filterKeys = [itemKey, itemGroupKey, subKey, dividerKey];
function convertDataSource(nodes) {
  const dataSource = [];
  flattenNode(nodes, { key: filterKeys }).forEach((node) => {
    var _a2, _b, _c, _d;
    const type = node.type;
    const slots = (_a2 = node.children) != null ? _a2 : {};
    const props = (_b = node.props) != null ? _b : {};
    let data;
    if (type[itemKey]) {
      const { key, disabled, icon, label } = props;
      const { icon: customIcon, label: customLabel, default: customLabel2 } = slots;
      data = {
        key,
        disabled: disabled || disabled === "",
        icon,
        label,
        customIcon,
        customLabel: customLabel != null ? customLabel : customLabel2
      };
    } else if (type[itemGroupKey]) {
      const { key, children, icon, label } = props;
      const { icon: customIcon, label: customLabel } = slots;
      data = {
        type: "itemGroup",
        key,
        children: children != null ? children : convertDataSource((_c = slots.default) == null ? void 0 : _c.call(slots)),
        icon,
        label,
        customIcon,
        customLabel
      };
    } else if (type[subKey]) {
      const { key, children, disabled, icon, label, suffix } = props;
      const { icon: customIcon, label: customLabel, suffix: customSuffix } = slots;
      data = {
        type: "sub",
        key,
        children: children != null ? children : convertDataSource((_d = slots.default) == null ? void 0 : _d.call(slots)),
        disabled: disabled || disabled === "",
        icon,
        label,
        suffix,
        customIcon,
        customLabel,
        customSuffix
      };
    } else {
      const { key } = props;
      data = { type: "divider", key };
    }
    if (data.type !== "divider" && !data.key) {
      Logger.warn("components/menu", "key must exist", data);
    }
    dataSource.push(data);
  });
  return dataSource;
}
function useExpanded$1(props) {
  const [expandedKeys, setExpandedKeys] = useControlledProp(props, "expandedKeys", () => []);
  const handleExpand = (key, expanded) => {
    const index = expandedKeys.value.indexOf(key);
    if (expanded) {
      index === -1 && setExpandedKeys([...expandedKeys.value, key]);
    } else {
      if (index > -1) {
        const tempKeys = [...expandedKeys.value];
        tempKeys.splice(index, 1);
        setExpandedKeys(tempKeys);
      }
    }
  };
  let cachedExpandedKeys = [];
  watch(
    () => props.collapsed,
    (collapsed) => {
      if (collapsed) {
        cachedExpandedKeys = [...expandedKeys.value];
        setExpandedKeys([]);
      } else {
        setExpandedKeys(cachedExpandedKeys);
        cachedExpandedKeys = [];
      }
    }
  );
  return { expandedKeys, handleExpand };
}
function useSelected(props, dropdownContext) {
  const [selectedKeys, setSelectedKeys] = useControlledProp(props, "selectedKeys", () => []);
  const handleSelected = (key) => {
    if (dropdownContext) {
      const { hideOnClick, setVisibility } = dropdownContext;
      hideOnClick.value && setVisibility(false);
    }
    if (!props.selectable) {
      return;
    }
    const index = selectedKeys.value.indexOf(key);
    if (index > -1) {
      if (props.multiple) {
        const tempKeys = [...selectedKeys.value];
        tempKeys.splice(index, 1);
        setSelectedKeys(tempKeys);
      }
    } else {
      setSelectedKeys(props.multiple ? [...selectedKeys.value, key] : [key]);
    }
  };
  return { selectedKeys, handleSelected };
}
const menuToken = Symbol("menuToken");
const menuSubToken = Symbol("menuSubToken");
const menuItemGroupToken = Symbol("menuItemGroupToken");
const MenuDivider = (props) => {
  const {
    props: menuProps2,
    mergedPrefixCls
  } = inject(menuToken);
  const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
    data: props.data,
    index: props.index
  }) : void 0;
  return createVNode("li", mergeProps({
    "class": `${mergedPrefixCls.value}-divider`
  }, customAdditional), null);
};
MenuDivider.displayName = "MenuDivider";
const usePaddingLeft = (menuProps2, mode, indent, level, grouped) => {
  return computed(() => {
    if (mode.value !== "inline" || menuProps2.collapsed) {
      return void 0;
    }
    const groupedLeft = grouped ? 8 : 0;
    return `${indent.value * level + groupedLeft}px`;
  });
};
const menuProps = {
  expandedKeys: Array,
  selectedKeys: Array,
  collapsed: {
    type: Boolean,
    default: false
  },
  customAdditional: { type: Function, default: void 0 },
  dataSource: Array,
  getKey: {
    type: [String, Function],
    default: void 0
  },
  indent: Number,
  mode: {
    type: String,
    default: "vertical"
  },
  multiple: {
    type: Boolean,
    default: false
  },
  overlayClassName: String,
  overlayContainer: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  overlayDelay: {
    type: [Number, Array],
    default: () => [0, 100]
  },
  selectable: {
    type: Boolean,
    default: true
  },
  theme: String,
  "onUpdate:expandedKeys": [Function, Array],
  "onUpdate:selectedKeys": [Function, Array],
  onClick: [Function, Array]
};
const menuItemProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
const menuItemGroupProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
const menuSubProps = {
  data: {
    type: Object,
    required: true
  },
  index: { type: Number, required: true }
};
var MenuItem = /* @__PURE__ */ defineComponent({
  name: "MenuItem",
  props: menuItemProps,
  setup(props) {
    const key = useKey();
    const {
      props: menuProps2,
      slots: menuSlots,
      mergedPrefixCls,
      indent,
      selectedKeys,
      handleSelected,
      handleClick
    } = inject(menuToken);
    const menuSubContext = inject(menuSubToken, null);
    const menuItemGroupContext = inject(menuItemGroupToken, false);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const isSelected = computed(() => selectedKeys.value.includes(key));
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-item-disabled`]: props.data.disabled,
        [`${prefixCls}-item-selected`]: isSelected.value
      });
    });
    const mode = computed(() => menuProps2.mode);
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, menuItemGroupContext);
    const style = computed(() => {
      return {
        paddingLeft: paddingLeft.value
      };
    });
    const onClick = (evt) => {
      handleSelected(key);
      handleClick(key, "item", evt);
      menuSubContext == null ? void 0 : menuSubContext.handleItemClick();
    };
    return () => {
      const {
        disabled,
        icon,
        label,
        customIcon,
        customLabel,
        customSuffix
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "itemIcon";
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "itemLabel";
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender;
      const suffixRender = customSuffix != null ? customSuffix : "itemSuffix";
      const suffixSlot = isString(suffixRender) ? menuSlots[suffixRender] : suffixRender;
      const slotProps = iconSlot || labelSlot ? {
        ...props.data,
        selected: isSelected.value
      } : void 0;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      const suffixNode = coverIcon(suffixSlot, slotProps, props.data.suffix);
      return createVNode("li", mergeProps({
        "class": classes.value,
        "style": style.value,
        "aria-label": label,
        "aria-selected": isSelected.value,
        "role": "menuitem",
        "onClick": disabled ? void 0 : onClick
      }, customAdditional), [iconNode, createVNode("span", null, [labelNode]), suffixNode && createVNode("span", {
        "class": `${mergedPrefixCls.value}-item-suffix`
      }, [suffixNode])]);
    };
  }
});
var MenuItemGroup = /* @__PURE__ */ defineComponent({
  name: "MenuItemGroup",
  props: menuItemGroupProps,
  setup(props) {
    const key = useKey();
    provide(menuItemGroupToken, true);
    const {
      props: menuProps2,
      slots: menuSlots,
      mergedPrefixCls,
      mergedGetKey,
      indent,
      handleClick
    } = inject(menuToken);
    const menuSubContext = inject(menuSubToken, null);
    const menuItemGroupContext = inject(menuItemGroupToken, null);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const mode = computed(() => menuProps2.mode);
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, !!menuItemGroupContext);
    const labelStyle = computed(() => ({
      paddingLeft: paddingLeft.value
    }));
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-item-group`]: true,
        [`${prefixCls}-level-${level}`]: true
      });
    });
    const onClick = (evt) => {
      handleClick(key, "itemGroup", evt);
    };
    return () => {
      const {
        icon,
        label,
        children,
        customIcon,
        customLabel
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "itemGroupIcon";
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "itemGroupLabel";
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender;
      const slotProps = props.data;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const prefixCls = `${mergedPrefixCls.value}-item-group`;
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      return createVNode("li", mergeProps({
        "class": classes.value,
        "aria-label": label
      }, customAdditional), [createVNode("div", {
        "class": `${prefixCls}-label`,
        "style": labelStyle.value,
        "onClick": onClick
      }, [iconNode, createVNode("span", null, [labelNode])]), createVNode("ul", {
        "class": `${prefixCls}-content`
      }, [coverChildren(children, mergedGetKey.value)])]);
    };
  }
});
var InlineContent = /* @__PURE__ */ defineComponent({
  name: "MenuSubInlineContent",
  setup() {
    const {
      mergedPrefixCls,
      mergedGetKey
    } = inject(menuToken);
    const {
      props,
      isExpanded
    } = inject(menuSubToken);
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-inline`]: true
      });
    });
    return () => {
      return createVNode(ɵCollapseTransition, {
        "appear": true
      }, {
        default: () => [withDirectives(createVNode("ul", {
          "class": classes.value
        }, [coverChildren(props.data.children, mergedGetKey.value)]), [[vShow, isExpanded.value]])]
      });
    };
  }
});
var Label = /* @__PURE__ */ defineComponent({
  name: "MenuSubLabel",
  setup() {
    const {
      slots: menuSlots,
      config,
      mergedPrefixCls,
      handleClick
    } = inject(menuToken);
    const {
      props,
      key,
      isExpanded,
      isSelected,
      changeExpanded,
      handleMouseEvent,
      mode,
      paddingLeft
    } = inject(menuSubToken);
    const mergedSuffix = computed(() => {
      const {
        suffix
      } = props.data;
      if (suffix) {
        return suffix;
      }
      return mode.value !== "horizontal" ? config.suffix : void 0;
    });
    const rotate = computed(() => {
      if (mode.value === "inline") {
        return isExpanded.value ? -90 : 90;
      }
      return 0;
    });
    const events = computed(() => {
      if (props.data.disabled) {
        return void 0;
      }
      if (mode.value === "inline") {
        return {
          onClick: (evt) => {
            handleClick(key, "sub", evt);
            changeExpanded(!isExpanded.value);
          }
        };
      } else {
        return {
          onClick: (evt) => handleClick(key, "sub", evt),
          onMouseenter: () => handleMouseEvent(true),
          onMouseleave: () => handleMouseEvent(false)
        };
      }
    });
    const style = computed(() => {
      return {
        paddingLeft: paddingLeft.value
      };
    });
    return () => {
      const {
        icon,
        label,
        customIcon,
        customLabel,
        customSuffix
      } = props.data;
      const iconRender = customIcon != null ? customIcon : "subIcon";
      const iconSlot = isString(iconRender) ? menuSlots[iconRender] : iconRender;
      const labelRender = customLabel != null ? customLabel : "subLabel";
      const labelSlot = isString(labelRender) ? menuSlots[labelRender] : labelRender;
      const suffixRender = customSuffix != null ? customSuffix : "subSuffix";
      const suffixSlot = isString(suffixRender) ? menuSlots[suffixRender] : suffixRender;
      const slotProps = iconSlot || labelSlot || suffixSlot ? {
        ...props.data,
        expanded: isExpanded.value,
        selected: isSelected.value
      } : void 0;
      const iconNode = coverIcon(iconSlot, slotProps, icon);
      const labelNode = labelSlot ? labelSlot(slotProps) : label;
      const suffixNode = coverIcon(suffixSlot, slotProps, mergedSuffix.value, rotate.value);
      const prefixCls = `${mergedPrefixCls.value}-sub-label`;
      return createVNode("div", mergeProps({
        "class": prefixCls,
        "style": style.value
      }, events.value), [iconNode, createVNode("span", null, [labelNode]), suffixNode && createVNode("span", {
        "class": `${prefixCls}-suffix`
      }, [suffixNode])]);
    };
  }
});
var OverlayContent = /* @__PURE__ */ defineComponent({
  name: "MenuSubOverlayContent",
  setup() {
    const {
      mergedPrefixCls,
      theme,
      mergedGetKey
    } = inject(menuToken);
    const {
      props,
      isExpanded,
      handleMouseEvent
    } = inject(menuSubToken);
    const dropdownContext = inject(dropdownToken, null);
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-dropdown`]: !!dropdownContext,
        [`${prefixCls}-vertical`]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const events = computed(() => {
      if (props.data.disabled || !isExpanded.value) {
        return void 0;
      }
      return {
        onMouseenter: () => handleMouseEvent(true),
        onMouseleave: () => handleMouseEvent(false)
      };
    });
    return () => createVNode("ul", mergeProps({
      "class": classes.value
    }, events.value), [coverChildren(props.data.children, mergedGetKey.value)]);
  }
});
var MenuSub = /* @__PURE__ */ defineComponent({
  name: "MenuSub",
  props: menuSubProps,
  setup(props) {
    const common = useGlobalConfig$1("common");
    const {
      props: menuProps2,
      config,
      mergedPrefixCls,
      indent,
      selectedKeys,
      expandedKeys,
      handleExpand
    } = inject(menuToken);
    const menuSubContext = inject(menuSubToken, null);
    const menuItemGroupContext = inject(menuItemGroupToken, false);
    const key = useKey();
    const mode = useMode(menuProps2, menuSubContext);
    const level = menuSubContext ? menuSubContext.level + 1 : 1;
    const paddingLeft = usePaddingLeft(menuProps2, mode, indent, level, menuItemGroupContext);
    const isSelected = computed(() => getState(props.data.children, selectedKeys.value));
    const {
      isExpanded,
      changeExpanded,
      handleMouseEvent
    } = useExpanded(props, key, expandedKeys, handleExpand, mode);
    const handleItemClick = () => {
      if (!props.data.disabled && mode.value !== "inline" && !menuProps2.multiple) {
        handleMouseEvent(false);
        handleExpand(key, false);
      }
    };
    provide(menuSubToken, {
      props,
      key,
      isExpanded,
      isSelected,
      mode,
      level,
      paddingLeft,
      changeExpanded,
      handleMouseEvent,
      handleItemClick
    });
    const placement = computed(() => mode.value === "vertical" ? "rightStart" : "bottomStart");
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-sub`]: true,
        [`${prefixCls}-level-${level}`]: true,
        [`${prefixCls}-sub-disabled`]: props.data.disabled,
        [`${prefixCls}-sub-expanded`]: isExpanded.value,
        [`${prefixCls}-sub-selected`]: isSelected.value
      });
    });
    const overlayClasses = computed(() => {
      const {
        overlayClassName
      } = menuProps2;
      return normalizeClass({
        [`${mergedPrefixCls.value}-overlay`]: true,
        [overlayClassName || ""]: !!overlayClassName
      });
    });
    const offset = computed(() => {
      var _a2;
      return (_a2 = props.data.offset) != null ? _a2 : config.offset;
    });
    return () => {
      var _a2;
      const {
        disabled
      } = props.data;
      const isInline = mode.value === "inline";
      let children;
      if (isInline) {
        children = [createVNode(Label, null, null), createVNode(InlineContent, null, null)];
      } else {
        const trigger2 = () => createVNode(Label, null, null);
        const content = () => createVNode(OverlayContent, null, null);
        children = createVNode(ɵOverlay, {
          "class": overlayClasses.value,
          "autoAdjust": true,
          "container": (_a2 = menuProps2.overlayContainer) != null ? _a2 : config.overlayContainer,
          "containerFallback": `.${mergedPrefixCls.value}-overlay-container`,
          "destroyOnHide": false,
          "delay": menuProps2.overlayDelay,
          "disabled": disabled,
          "offset": offset.value,
          "placement": placement.value,
          "transitionName": `${common.prefixCls}-slide-up`,
          "trigger": "manual",
          "visible": isExpanded.value
        }, {
          default: trigger2,
          content
        });
      }
      const customAdditional = menuProps2.customAdditional ? menuProps2.customAdditional({
        data: props.data,
        index: props.index
      }) : void 0;
      return createVNode("li", mergeProps({
        "class": classes.value,
        "aria-expanded": isExpanded.value,
        "aria-haspopup": !isInline,
        "role": "menuitem"
      }, customAdditional), [children]);
    };
  }
});
function useMode(menuProps2, menuSubContext) {
  const defaultMode = menuProps2.mode !== "inline" && !!menuSubContext ? "vertical" : menuProps2.mode;
  const [mode, setMode] = useState(defaultMode);
  watch(() => menuProps2.mode, (mode2) => {
    nextTick(() => setMode(mode2 !== "inline" && !!menuSubContext ? "vertical" : mode2));
  });
  return mode;
}
function useExpanded(props, key, expandedKeys, handleExpand, mode) {
  const isHover = ref(false);
  const isExpanded = computed(() => {
    if (mode.value === "inline") {
      return expandedKeys.value.includes(key);
    }
    return isHover.value && expandedKeys.value.includes(key) || childExpanded.value;
  });
  const changeExpanded = (expanded) => handleExpand(key, expanded);
  const childExpanded = computed(() => getState(props.data.children, expandedKeys.value));
  const handleMouseEvent = debounce((value) => isHover.value = value, 100);
  watch([mode, childExpanded, isHover], ([currMode, currChildExpanded, currIsHover]) => {
    if (currMode !== "inline") {
      changeExpanded(currChildExpanded || currIsHover);
    }
  });
  return {
    isExpanded,
    changeExpanded,
    handleMouseEvent
  };
}
function getState(children, selectedKeys) {
  if (!children || children.length === 0) {
    return false;
  }
  return children.some((item) => {
    return item.key && selectedKeys.includes(item.key) || "children" in item && getState(item.children, selectedKeys);
  });
}
function coverChildren(data, getKetFn) {
  if (!data || data.length === 0) {
    return [];
  }
  const nodes = [];
  data.forEach((item, index) => {
    const {
      type
    } = item;
    const key = getKetFn(item);
    if (!type || type === "item") {
      nodes.push(createVNode(MenuItem, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "sub") {
      nodes.push(createVNode(MenuSub, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "itemGroup") {
      nodes.push(createVNode(MenuItemGroup, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else if (type === "divider") {
      nodes.push(createVNode(MenuDivider, {
        "key": key,
        "index": index,
        "data": item
      }, null));
    } else {
      Logger.warn("components/menu", `type [${type}] not supported`);
    }
  });
  return nodes;
}
function coverIcon(slot, slotProps, iconOrName, rotate) {
  if (slot) {
    return slot(slotProps);
  }
  return isString(iconOrName) ? createVNode(IxIcon, {
    "name": iconOrName,
    "rotate": rotate
  }, null) : iconOrName;
}
var Menu = /* @__PURE__ */ defineComponent({
  name: "IxMenu",
  props: menuProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-menu`);
    const config = useGlobalConfig$1("menu");
    const mergedGetKey = useGetKey(props, config, "components/menu");
    const indent = computed(() => {
      var _a2;
      return (_a2 = props.indent) != null ? _a2 : config.indent;
    });
    const mode = computed(() => props.mode);
    const theme = computed(() => {
      var _a2;
      return (_a2 = props.theme) != null ? _a2 : config.theme;
    });
    const dropdownContext = inject(dropdownToken, null);
    const {
      expandedKeys,
      handleExpand
    } = useExpanded$1(props);
    const {
      selectedKeys,
      handleSelected
    } = useSelected(props, dropdownContext);
    const handleClick = (key, type, evt) => {
      callEmit(props.onClick, {
        key,
        type,
        event: evt
      });
    };
    provide(menuToken, {
      props,
      slots,
      config,
      mergedPrefixCls,
      mergedGetKey,
      indent,
      theme,
      expandedKeys,
      handleExpand,
      selectedKeys,
      handleSelected,
      handleClick
    });
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-${mode.value}`]: true,
        [`${prefixCls}-collapsed`]: props.collapsed,
        [`${prefixCls}-dropdown`]: !!dropdownContext
      });
    });
    const dateSource = useDataSource(props, slots);
    return () => {
      return createVNode("ul", {
        "class": classes.value
      }, [coverChildren(dateSource.value, mergedGetKey.value)]);
    };
  }
});
const IxMenu = Menu;
function getMenuChildren(menu) {
  if (!menu || !("children" in menu)) {
    return NoopArray;
  }
  return menu.children;
}
function getTargetPaths(menus, target) {
  if (!target) {
    return getDefaultPaths(menus);
  }
  let result = [];
  for (let i2 = 0; i2 < menus.length; i2++) {
    const curMenu = menus[i2];
    if (curMenu.key === target) {
      result = [curMenu];
      break;
    } else {
      const activeChildren = getTargetPaths(getMenuChildren(curMenu), target);
      if (activeChildren.length > 0) {
        result = [curMenu, ...activeChildren];
        break;
      }
    }
  }
  return result;
}
function getDefaultPaths(menus) {
  if (!menus || menus.length === 0) {
    return NoopArray;
  }
  const currMenu = menus.find((menu) => menu.type !== "divider" && !menu.disabled);
  if (!currMenu) {
    return NoopArray;
  }
  const paths = [currMenu];
  const children = getMenuChildren(currMenu);
  if (children.length > 0) {
    paths.push(...getDefaultPaths(children));
  }
  return paths;
}
function useActiveKey(props) {
  var _a2;
  let defaultActiveKey = props.activeKey;
  const [activeKey, setActiveKey] = useControlledProp(props, "activeKey", defaultActiveKey);
  if (isNil(defaultActiveKey)) {
    const defaultPaths = getDefaultPaths(props.menus);
    defaultActiveKey = (_a2 = defaultPaths[defaultPaths.length - 1]) == null ? void 0 : _a2.key;
    if (defaultActiveKey) {
      setActiveKey(defaultActiveKey);
    }
  }
  return { activeKey, setActiveKey };
}
function useActiveHeaderKey(props, activePaths, headerMenus) {
  return computed(() => {
    const { type } = props;
    const currActivePaths = activePaths.value;
    if (type === "both") {
      if (currActivePaths.length === 0) {
        const [firstMenu] = headerMenus.value;
        return firstMenu == null ? void 0 : firstMenu.key;
      }
      return currActivePaths[0].key;
    }
    if (type === "header") {
      const lastPath = currActivePaths[currActivePaths.length - 1];
      return lastPath == null ? void 0 : lastPath.key;
    }
    return void 0;
  });
}
function useHeaderMenus(props) {
  return computed(() => {
    const { type, menus } = props;
    if (type === "header") {
      return menus;
    }
    if (type === "both") {
      return menus.map((menu) => {
        if (!menu.type || menu.type === "item" || menu.type === "divider") {
          return menu;
        }
        const { children, ...rest } = menu;
        rest.type = "item";
        return rest;
      });
    }
    return NoopArray;
  });
}
function useSiderMenus(props, activeHeaderKey) {
  return computed(() => {
    const { type, menus } = props;
    if (["mixin", "sider"].includes(type)) {
      return menus;
    }
    if (type === "both") {
      const currActiveMenu = menus.find((menu) => menu.key === activeHeaderKey.value);
      return getMenuChildren(currActiveMenu);
    }
    return NoopArray;
  });
}
const proLayoutToken = Symbol("proLayout");
var Logo = /* @__PURE__ */ defineComponent({
  name: "IxProLayoutLogo",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls
    } = inject(proLayoutToken);
    return () => {
      let logoNode;
      if (slots.logo) {
        logoNode = slots.logo();
      } else if (props.logo) {
        const {
          image,
          title,
          link = "/"
        } = props.logo;
        logoNode = createVNode("a", {
          "href": link
        }, [isString(image) ? createVNode("img", {
          "src": image,
          "alt": "logo"
        }, null) : image, title && createVNode("h1", null, [title])]);
      }
      return logoNode && createVNode("div", {
        "class": `${mergedPrefixCls.value}-logo`
      }, [logoNode]);
    };
  }
});
var Header = /* @__PURE__ */ defineComponent({
  name: "IxProLayoutHeader",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls,
      setActiveKey,
      headerMenus,
      activeHeaderKey
    } = inject(proLayoutToken);
    const theme = computed(() => {
      const {
        theme: theme2
      } = props;
      return isObject(theme2) ? theme2.header : theme2;
    });
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-header`;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const menuSelectedKeys = computed(() => activeHeaderKey.value ? [activeHeaderKey.value] : []);
    const onMenuClick = (menuClickOption) => {
      var _a2;
      if (props.type === "both") {
        const targetMenu = props.menus.find((menu) => menu.key === menuClickOption.key);
        if (targetMenu && "children" in targetMenu && !!((_a2 = targetMenu.children) == null ? void 0 : _a2.length)) {
          const activePaths = getDefaultPaths(targetMenu.children);
          setActiveKey(activePaths.pop().key);
          callEmit(props["onMenuClick"], {
            ...menuClickOption,
            type: targetMenu.type
          });
          return;
        }
      }
      if (menuClickOption.type === "item") {
        setActiveKey(menuClickOption.key);
      }
      callEmit(props["onMenuClick"], menuClickOption);
    };
    return () => {
      const prefixCls = `${mergedPrefixCls.value}-header`;
      const innerMenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay`,
        dataSource: headerMenus.value,
        selectedKeys: menuSelectedKeys.value,
        mode: "horizontal",
        theme: theme.value,
        onClick: onMenuClick
      };
      const menuProps2 = mergeProps(innerMenuProps, props.headerMenu);
      const contentNode = slots.headerContent ? slots.headerContent(menuProps2) : createVNode(IxMenu, menuProps2, slots);
      return createVNode(IxLayoutHeader, {
        "class": classes.value
      }, {
        default: () => [createVNode(Logo, null, slots), createVNode("div", {
          "class": `${prefixCls}-content`
        }, [contentNode]), slots.headerExtra && createVNode("div", {
          "class": `${prefixCls}-extra`
        }, [slots.headerExtra()])]
      });
    };
  }
});
var Sider = /* @__PURE__ */ defineComponent({
  name: "IxProLayoutSider",
  setup(_, {
    slots
  }) {
    const {
      props,
      mergedPrefixCls,
      activeKey,
      setActiveKey,
      activePaths,
      siderMenus,
      collapsed,
      setCollapsed
    } = inject(proLayoutToken);
    const {
      expandedKeys,
      setExpandedKeys
    } = useExpandedKeys(activePaths, siderMenus);
    const theme = computed(() => {
      const {
        theme: theme2
      } = props;
      return isObject(theme2) ? theme2.sider : theme2;
    });
    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-sider`;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true
      });
    });
    const menuSelectedKeys = computed(() => [activeKey.value]);
    const onMenuClick = (menuClickOption) => {
      callEmit(props["onMenuClick"], menuClickOption);
    };
    return () => {
      const prefixCls = `${mergedPrefixCls.value}-sider`;
      const {
        siderHover
      } = props;
      const innerSiderProps = {
        collapsed: collapsed.value,
        "onUpdate:collapsed": setCollapsed,
        pointer: !!siderHover,
        pointerDelay: isObject(siderHover) ? siderHover.delay : void 0
      };
      const siderProps = mergeProps(innerSiderProps, props.sider);
      const innerMenuProps = {
        overlayClassName: `${prefixCls}-menu-overlay`,
        collapsed: siderProps.collapsed,
        dataSource: siderMenus.value,
        expandedKeys: expandedKeys.value,
        "onUpdate:expandedKeys": setExpandedKeys,
        selectedKeys: menuSelectedKeys.value,
        "onUpdate:selectedKeys": (keys2) => setActiveKey(keys2[0]),
        mode: !siderProps.collapsed || siderProps.pointer ? "inline" : "vertical",
        theme: theme.value,
        onClick: onMenuClick
      };
      const menuProps2 = mergeProps(innerMenuProps, props.siderMenu);
      const contentNode = slots.siderContent ? slots.siderContent(menuProps2) : createVNode(IxMenu, menuProps2, slots);
      return createVNode(IxLayoutSider, mergeProps({
        "class": classes.value
      }, siderProps), {
        default: () => [props.type === "sider" && createVNode(Logo, null, slots), slots.siderHeader && createVNode("div", {
          "class": `${prefixCls}-header`
        }, [slots.siderHeader()]), createVNode("div", {
          "class": `${prefixCls}-content`
        }, [contentNode]), slots.siderFooter && createVNode("div", {
          "class": `${prefixCls}-footer`
        }, [slots.siderFooter()])]
      });
    };
  }
});
function useExpandedKeys(activePaths, siderMenus) {
  const [expandedKeys, _setExpandedKeys] = useState(getExpandedKeys(activePaths.value));
  watch(activePaths, (paths) => _setExpandedKeys(getExpandedKeys(paths)));
  const setExpandedKeys = (keys2) => {
    const oldKeys = expandedKeys.value;
    if (oldKeys.length > keys2.length) {
      _setExpandedKeys(keys2);
      return;
    }
    let targetPaths;
    const lastKey = keys2[keys2.length - 1];
    const targetIndex = activePaths.value.findIndex((menu) => menu.key === lastKey);
    if (targetIndex > -1) {
      targetPaths = activePaths.value.slice(0, targetIndex + 1);
    } else {
      targetPaths = getTargetPaths(siderMenus.value, lastKey);
    }
    _setExpandedKeys(getExpandedKeys(targetPaths));
  };
  return {
    expandedKeys,
    setExpandedKeys
  };
}
function getExpandedKeys(menus) {
  return menus.filter((menu) => {
    var _a2;
    return menu.type === "sub" && !!((_a2 = menu.children) == null ? void 0 : _a2.length);
  }).map((menu) => menu.key);
}
const proLayoutProps = {
  activeKey: { type: [String, Number, Symbol], default: void 0 },
  collapsed: { type: Boolean, default: void 0 },
  compress: { type: Boolean, default: true },
  fixed: {
    type: [Boolean, Object],
    default: true
  },
  headerMenu: {
    type: Object,
    default: void 0
  },
  logo: {
    type: Object,
    default: void 0
  },
  menus: {
    type: Array,
    default: () => []
  },
  sider: {
    type: Object,
    default: void 0
  },
  siderHover: {
    type: [Boolean, Object],
    default: void 0
  },
  siderMenu: {
    type: Object,
    default: void 0
  },
  theme: {
    type: [String, Object],
    default: () => ({ header: "dark", sider: "light" })
  },
  type: {
    type: String,
    default: "both"
  },
  "onUpdate:activeKey": [Function, Array],
  "onUpdate:collapsed": [Function, Array],
  onMenuClick: [Function, Array]
};
var ProLayout = /* @__PURE__ */ defineComponent({
  name: "IxProLayout",
  props: proLayoutProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-layout`);
    const {
      activeKey,
      setActiveKey
    } = useActiveKey(props);
    const activePaths = computed(() => getTargetPaths(props.menus, activeKey.value));
    const headerMenus = useHeaderMenus(props);
    const activeHeaderKey = useActiveHeaderKey(props, activePaths, headerMenus);
    const siderMenus = useSiderMenus(props, activeHeaderKey);
    const [collapsed, setCollapsed] = useControlledProp(props, "collapsed", () => {
      const {
        collapsed: collapsed2 = false
      } = props.sider || {};
      return collapsed2;
    });
    provide(proLayoutToken, {
      props,
      slots,
      mergedPrefixCls,
      activeKey,
      setActiveKey,
      activePaths,
      headerMenus,
      activeHeaderKey,
      siderMenus,
      collapsed,
      setCollapsed
    });
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-is-${props.type}`]: true
      });
    });
    const showSider = computed(() => {
      const {
        type
      } = props;
      return type === "both" && siderMenus.value.length > 0 || type === "sider" || type === "mixin";
    });
    return () => {
      const prefixCls = mergedPrefixCls.value;
      return createVNode(IxLayout, {
        "class": classes.value,
        "fixed": props.fixed,
        "floatSider": !props.compress
      }, {
        default: () => [props.type !== "sider" && createVNode(Header, null, slots), showSider.value && createVNode(Sider, null, slots), createVNode(IxLayoutContent, {
          "class": `${prefixCls}-content`
        }, {
          default: () => {
            var _a2;
            return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
          }
        }), slots.footer && createVNode(IxLayoutFooter, {
          "class": `${prefixCls}-footer`
        }, {
          default: () => [slots.footer()]
        })]
      });
    };
  }
});
const IxProLayout = ProLayout;
const AppComp = defineComponent(() => {
  const {
    menuData,
    theme,
    render,
    renderers,
    activeRecords,
    getRecordNavKey
  } = inject(appContextToken);
  const breakpoints = inject(breakpointsToken);
  const activeKey = computed(() => getRecordNavKey(activeRecords.value[0]));
  const rootWrapperCls = computed(() => {
    const prefixCls = "archive-app__root-wrapper";
    return normalizeClass({
      [prefixCls]: true,
      [`${prefixCls}-xs`]: breakpoints.xs,
      [`${prefixCls}-sm`]: breakpoints.sm,
      [`${prefixCls}-md`]: breakpoints.md,
      [`${prefixCls}-lg`]: breakpoints.lg,
      [`${prefixCls}-xl`]: breakpoints.xl
    });
  });
  const layoutType = computed(() => {
    if (breakpoints.sm || breakpoints.xs) {
      return "header";
    }
    return theme.layout.type;
  });
  const renderItemLabel = (item) => {
    if (item.recordType === "item" || item.recordType === "sub" || item.recordType === "group") {
      return createVNode(RouterLink, {
        "to": item.path
      }, {
        default: () => [createVNode("span", null, [item.name])]
      });
    }
    if (item.recordType === "link") {
      return createVNode("a", {
        "target": "_blank",
        "href": item.link
      }, [createVNode("span", null, [item.name])]);
    }
  };
  const renderLogo = renderers.logo ? () => render(theme.logo, renderers.logo) : void 0;
  const renderHeaderContent = renderers.layoutHeaderContent ? (menuProps2) => render(menuProps2, renderers.layoutHeaderContent) : void 0;
  const renderHeaderExtra = renderers.layoutHeaderExtra ? () => render({}, renderers.layoutHeaderExtra) : void 0;
  const renderSiderHeaderLabel = () => render({}, renderers.layoutSiderHeaderLabel, () => {
    var _a3;
    var _a2;
    return createVNode("span", {
      "class": "archive-app__sider-header-label"
    }, [(_a3 = (_a2 = activeRecords.value[activeRecords.value.length - 1]) == null ? void 0 : _a2.name) != null ? _a3 : ""]);
  });
  const renderSiderHeader = () => render({}, renderers.layoutSiderHeader, () => {
    const label = renderSiderHeaderLabel();
    return theme.layout.siderCollapsable === "top" ? createVNode(IxLayoutSiderTrigger, null, {
      default: () => [label]
    }) : label;
  });
  const renderSiderContent = renderers.layoutSiderContent ? (menuProps2) => render(menuProps2, renderers.layoutSiderContent) : void 0;
  const renderSiderFooterLabel = () => render({}, renderers.layoutSiderFooterLabel);
  const renderSiderFooter = theme.layout.siderCollapsable === "bottom" || renderers.layoutSiderFooter ? () => render({}, renderers.layoutSiderFooter, () => {
    const label = renderSiderFooterLabel();
    return theme.layout.siderCollapsable === "bottom" ? createVNode(IxLayoutSiderTrigger, null, {
      default: () => [label]
    }) : label;
  }) : void 0;
  const proLayoutSlots = {
    itemLabel: renderItemLabel,
    logo: renderLogo,
    headerContent: renderHeaderContent,
    headerExtra: renderHeaderExtra,
    siderHeader: renderSiderHeader,
    siderContent: renderSiderContent,
    siderFooter: renderSiderFooter
  };
  return () => createVNode(IxProLayout, {
    "class": rootWrapperCls.value,
    "activeKey": activeKey.value,
    "menus": menuData,
    "type": layoutType.value,
    "logo": theme.logo
  }, {
    default: () => [createVNode("div", {
      "class": "archive-app__main-content"
    }, [createVNode(RouterView, null, null)])],
    ...proLayoutSlots
  });
});
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useAppRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: dataBase.activeRecords.value,
        ...data != null ? data : {}
      },
      defaultNodes
    ) : defaultNodes;
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useNavRecords(navRecords, route) {
  const pathRecordMap = /* @__PURE__ */ new Map();
  const parentRecordMap = /* @__PURE__ */ new Map();
  const traverseParents = (record, fn) => {
    const parent = parentRecordMap.get(record.id);
    if (!parent) {
      return;
    }
    fn(parent);
    traverseParents(parent, fn);
  };
  const recordNavKeyMap = /* @__PURE__ */ new Map();
  const getRecordNavKey = (record) => {
    if (!record) {
      return "";
    }
    if (recordNavKeyMap.has(record)) {
      return recordNavKeyMap.get(record);
    }
    let key = record.id;
    traverseParents(record, (parent) => {
      key += `-${parent.id}`;
    });
    recordNavKeyMap.set(record, key);
    return key;
  };
  const getMenuDataType = (type) => {
    switch (type) {
      case "item":
      case "sub":
        return type;
      case "group":
        return "itemGroup";
      case "link":
      default:
        return "item";
    }
  };
  const processRecords = (records) => d(records, "children", (record, parents) => {
    if (record.type === "item") {
      pathRecordMap.set(record.path, record);
    }
    if (parents[0]) {
      parentRecordMap.set(record.id, parents[0]);
    }
    const menu = {
      ...record,
      key: getRecordNavKey(record),
      type: getMenuDataType(record.type),
      label: record.name,
      recordType: record.type
    };
    return menu;
  });
  const menuData = processRecords(navRecords);
  const activeRecords = computed(() => {
    const _activeRecords = [];
    const currentActiveRecord = pathRecordMap.get(route.path.replace(/\/$/, ""));
    if (currentActiveRecord) {
      _activeRecords.push(currentActiveRecord);
      traverseParents(currentActiveRecord, (parent) => _activeRecords.push(parent));
    }
    return _activeRecords;
  });
  return {
    menuData,
    activeRecords,
    getRecordNavKey
  };
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function resolveRoutes(routesRecords, theme, renderers, options) {
  return [
    {
      path: "/",
      redirect: routesRecords[0].path
    },
    ...routesRecords.map((record) => {
      return {
        path: record.path,
        component: () => __vitePreload(() => import("./Page-fb85e37d.js"), true ? [] : void 0),
        props: resolvePageProps(record.pageData, theme, renderers, options)
      };
    })
  ];
}
function mountApp(options) {
  const { navRecords, routeRecords, el, renderers = {}, setupOptions, setupApp } = options;
  const theme = resolveThemeOptions(options);
  const routes = resolveRoutes(routeRecords, theme, renderers, setupOptions);
  const app2 = createApp(
    defineComponent({
      setup() {
        const route = useRoute();
        const navContext = useNavRecords(navRecords, route);
        const breakpoints = useBreakpoints(theme.breakpoints);
        const render = useAppRender({
          route,
          activeRecords: navContext.activeRecords,
          theme,
          breakpoints
        });
        provide(appContextToken, {
          ...navContext,
          route,
          theme,
          navRecords,
          renderers,
          render
        });
        provide(themeToken, theme);
        provide(breakpointsToken, breakpoints);
        return () => h$2(AppComp);
      }
    })
  );
  app2.use(
    createRouter({
      history: createWebHistory(options.baseUrl),
      scrollBehavior: (to, _, savedPosition) => {
        if (savedPosition) {
          return savedPosition;
        } else if (to.hash) {
          return { el: to.hash, behavior: "smooth" };
        } else {
          return { top: 0, behavior: "smooth" };
        }
      },
      routes
    })
  ).use(iduxInstall);
  setupApp == null ? void 0 : setupApp(app2);
  app2.mount(el);
}
const app = "";
mountApp(mountOptions);
export {
  flattenNode as $,
  isNil as A,
  mergeProps as B,
  copyArray as C,
  convertElement as D,
  useKey as E,
  watchEffect as F,
  callEmit as G,
  IxInput as H,
  IxIcon as I,
  overlayDelayDef as J,
  overlayPlacementDef as K,
  overlayTriggerDef as L,
  onDeactivated as M,
  usePortalTarget as N,
  convertCssPixel as O,
  CdkPortal as P,
  TransitionGroup as Q,
  Fragment as R,
  setToString$1 as S,
  Transition as T,
  isString as U,
  onBeforeUnmount as V,
  WeakMap$1$1 as W,
  useAccessorAndControl as X,
  useFormItemRegister as Y,
  IxSpace as Z,
  Logger as _,
  onUnmounted as a,
  useInput as a0,
  useFormFocusMonitor as a1,
  ɵInput as a2,
  rAF as a3,
  useFormSize as a4,
  useFormStatus as a5,
  toNumber as a6,
  arrayEach as a7,
  uniqueId as a8,
  convertArray as a9,
  on as aA,
  appContextToken as aB,
  themeToken as aC,
  breakpointsToken as aD,
  getOffset as aE,
  convertNumber as aF,
  throttleRAF as aG,
  isHTMLElement as aH,
  useFormElement as aa,
  FORM_TOKEN as ab,
  convertStringVNode as ac,
  ɵWave as ad,
  tryOnScopeDispose as ae,
  inputCommonProps as af,
  easeInOutCubic as ag,
  isFunction as ah,
  identity as ai,
  shortOut as aj,
  isIndex as ak,
  root$1 as al,
  apply as am,
  baseGetTag as an,
  customRef as ao,
  isNumber as ap,
  toRaw as aq,
  hasSlot as ar,
  toString as as,
  normalizeStyle as at,
  cancelRAF as au,
  m as av,
  pageContextToken as aw,
  u as ax,
  off as ay,
  convertTarget as az,
  createTextVNode as b,
  createVNode as c,
  defineComponent as d,
  computed as e,
  withDirectives as f,
  baseCreate$1 as g,
  h$2 as h,
  isObjectLike as i,
  isArray$1$1 as j,
  isObject as k,
  debounce as l,
  inject as m,
  nextTick as n,
  onMounted as o,
  useControlledProp as p,
  useState as q,
  ref as r,
  normalizeClass as s,
  throwError as t,
  useGlobalConfig$1 as u,
  vShow as v,
  watch as w,
  addClass as x,
  removeClass as y,
  provide as z,
  ɵOverlay as ɵ
};
