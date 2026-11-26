# 基础组件软件设计

[整体架构](architecture.md) · [组件 API](../../packages/site/src/components/core/API.md)

## 职责与边界

`IxChart` 把 ECharts 实例嵌入 Vue，`useChart` 管理其生命周期。它们不解释词云权重、地图节点或分类缺报，具体系列和业务布局由 plots 或应用提供。

| 模块                                                                         | 拥有的设计决策                                     |
| ---------------------------------------------------------------------------- | -------------------------------------------------- |
| [Chart.ts](../../packages/core/components/Chart.ts)                          | 容器结构、DOM 属性、默认插槽覆盖层、公开实例方法   |
| [useChart.ts](../../packages/core/composables/useChart.ts)                   | init / setOption / dispose、主题重建、事件差异绑定 |
| [chartOptions.ts](../../packages/core/utils/chartOptions.ts)                 | 原生 option 与控制项分离、组件删除规则             |
| [chartInteraction.ts](../../packages/core/utils/chartInteraction.ts)         | 通用交互及 geo 视口恢复                            |
| [chartLoading.ts](../../packages/core/composables/chartLoading.ts)           | 加载覆盖层和动态更新                               |
| [useResizeObserver.ts](../../packages/core/composables/useResizeObserver.ts) | 容器变化到 resize 的桥接与释放                     |

## DOM 与实例所有权

Vue 拥有外层容器和插槽覆盖层，ECharts 独占内层 canvas 容器。覆盖层与画布是兄弟节点，因此业务空状态不会被 ECharts 清除；条件插槽中的注释、空片段和空白文本不应阻挡画布。

实例在 mounted 后创建，首次 setOption 失败时立即 dispose，不能留下无法通过 chartRef 访问的实例。普通 option 更新复用实例，主题和初始化参数变化才重建；卸载始终销毁实例并清理 loading。隐藏容器重建时保留上次有效视口，直到重新测量。

`getEChartsInstance()` 返回当前实例；调用方不应在主题切换后长期缓存旧实例，组件适配应在 ready 中重新绑定。

## 输入与状态恢复

`useChart` 深比较 option 和 setOption 控制参数，变化时才提交。`title: null` 通过 replaceMerge 删除已有标题；仅从对象中删字段并不能保证 ECharts 合并后的旧字段消失。

原生事件与 Vue 2 listeners 做差异绑定，替换 handler 时解绑旧函数，避免重复监听。DOM 的 role、tabindex、aria-* 和 data-* 与事件及控制项分流，不能进入原生系列。

主题重建前读取通用交互状态，并结合前后配置判断恢复；普通 notMerge 更新还要处理 geo 视口。恢复的边界在公共 helper 中，领域选择缓存仍由相应组件管理。显式业务配置变化优先于保留旧交互。

Tooltip 主题和 loading 跟随实例及 option 更新。[tooltipTheme.ts](../../packages/core/composables/tooltipTheme.ts)为已配置的 Tooltip 增加实例独有的类名与主题标记，保留业务 className；通过实际浮层同步明暗状态，因此 appendTo 把浮层移出容器后也能获得主题，延迟创建的浮层在 rendered 后补同步。

loading 使用独立 DOM 覆盖层并拦截指针，不调用 ECharts 原生 showLoading，也不参与图形 option 重建。覆盖层设置 aria-busy，关闭时恢复原属性与自身改动的容器定位；这个信号也供词云动画暂停使用。默认插槽覆盖层则由 Vue 管理，两者的所有权和清理路径不同。

ResizeObserver 将多次通知合并到下一帧，确认仍是当前实例且容器宽高非零才 resize，避免同步观察回路和隐藏地图的奇异变换。关闭 autoResize、替换实例或卸载时移除监听并取消未执行帧；隐藏后保留旧尺寸，重新可见再测量。

## 维护约束与验证

新增控制项时同步选项分流与公开类型，检查其更新是否应复用实例。新增事件或观察器时同时确定重建和卸载路径。Vue 2 / 3 的 attrs、listeners 和插槽 VNode 结构不同，不能只用一端测试推断另一端。

回归入口为[基础组件测试](../../packages/core/components/__tests__/Chart.spec.ts)、[生命周期测试](../../packages/core/composables/__tests__/lifecycle.spec.ts)、[useChart 测试](../../packages/core/composables/__tests__/useChart.spec.ts)和[打包消费矩阵](../../scripts/test-declarations.mjs)。重点保护失败初始化、条件插槽、控制项更新、主题恢复、重复绑定和卸载清理。
