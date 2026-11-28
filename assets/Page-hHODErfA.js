import { $t as Demo, Qt as Bi, Xt as IxAnchor, Yt as IxAffix, Zt as IxAnchorLink, a as pageContextToken, an as createVNode, cn as nextTick, dn as onMounted, en as IxMessageProvider, fn as provide, gn as withDirectives, hn as watch, i as breakpointsToken, in as computed, ln as normalizeClass, mn as vShow, n as u, nn as useClipboard, o as themeToken, on as defineComponent, pn as ref, r as appContextToken, rn as isObject, sn as inject, t as m, tn as IxRadioGroup, un as onBeforeUnmount } from "./app-default-DalXtduk.js";
// ../../node_modules/.pnpm/@idux+archive-app@0.5.0_@types+markdown-it@14.2.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/archive-app/dist/Page.js
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
var innerPageProps = {
	pageData: {
		type: Object,
		required: true
	},
	theme: {
		type: Object,
		required: true
	},
	options: Object,
	renderers: Object
};
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
var inited = false;
function useCopyCode() {
	if (inited) return;
	const { copy } = useClipboard();
	const timeoutIdMap = /* @__PURE__ */ new Map();
	window.addEventListener("click", (e) => {
		var _a;
		const el = e.target;
		if (el.matches("div[class*=\"language-\"] > button.copy")) {
			const parent = el.parentElement;
			const sibling = (_a = el.nextElementSibling) == null ? void 0 : _a.nextElementSibling;
			if (!parent || !sibling) return;
			const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.className);
			let text = "";
			sibling.querySelectorAll("span.line:not(.diff.remove)").forEach((node) => text += (node.textContent || "") + "\n");
			text = text.slice(0, -1);
			if (isShell) text = text.replace(/^ *(\$|>) /gm, "").trim();
			copy(text).then(() => {
				el.classList.add("copied");
				clearTimeout(timeoutIdMap.get(el));
				const timeoutId = setTimeout(() => {
					el.classList.remove("copied");
					el.blur();
					timeoutIdMap.delete(el);
				}, 2e3);
				timeoutIdMap.set(el, timeoutId);
			});
		}
	});
	inited = true;
}
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
function usePageRender(dataBase) {
	return (data, customRenderer, defaultRenderer) => {
		var _a;
		const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
		return customRenderer ? customRenderer({
			theme: dataBase.theme,
			route: dataBase.route,
			breakpoints: dataBase.breakpoints,
			activeRecords: (_a = dataBase.activeRecords) == null ? void 0 : _a.value,
			...data !== null && data !== void 0 ? data : {}
		}, defaultNodes) : defaultNodes;
	};
}
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
function useAsyncProp(props, key) {
	const data = ref();
	onMounted(() => {
		watch(() => props[key], async (asyncProp) => {
			data.value = void 0;
			if (asyncProp) data.value = await (asyncProp == null ? void 0 : asyncProp());
		}, { immediate: true });
	});
	return data;
}
function useArrayAsyncProp(props, key) {
	const data = ref();
	onMounted(() => {
		watch(() => props[key], async (arrayAsyncProp) => {
			data.value = void 0;
			if (arrayAsyncProp) data.value = await Promise.all(arrayAsyncProp == null ? void 0 : arrayAsyncProp.map((asyncProp) => asyncProp()));
		}, { immediate: true });
	});
	return data;
}
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
function useArchiveItemImport(props, key) {
	const data = useAsyncProp(props, key);
	const updatedItem = ref();
	const resolvedItem = computed(() => {
		var _updatedItem$value;
		var _a;
		return (_updatedItem$value = updatedItem.value) !== null && _updatedItem$value !== void 0 ? _updatedItem$value : (_a = data.value) == null ? void 0 : _a.default;
	});
	let stop;
	if (window.__ARCHIVE_HMR_RUNTIME__) {
		stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
			var _a, _b;
			if (((_a = updatedItem.value) == null ? void 0 : _a.id) === item.id || ((_b = data.value) == null ? void 0 : _b.default.id) === item.id) updatedItem.value = item;
		});
		onBeforeUnmount(() => {
			stop == null || stop();
		});
	}
	watch(data, () => {
		updatedItem.value = void 0;
	});
	return resolvedItem;
}
function useArchiveItemImports(props, key) {
	const data = useArrayAsyncProp(props, key);
	const updatedItems = ref({});
	const resolvedItems = computed(() => {
		var _ref;
		var _a;
		return (_ref = (_a = data.value) == null ? void 0 : _a.map((mod) => {
			var _updatedItems$value$i;
			const item = mod.default;
			return (_updatedItems$value$i = updatedItems.value[item.id]) !== null && _updatedItems$value$i !== void 0 ? _updatedItems$value$i : item;
		})) !== null && _ref !== void 0 ? _ref : [];
	});
	let stop;
	if (window.__ARCHIVE_HMR_RUNTIME__) {
		stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
			var _a;
			if (!!updatedItems.value[item.id] || ((_a = data.value) == null ? void 0 : _a.findIndex((loadedItem) => loadedItem.default.id === item.id))) updatedItems.value[item.id] = item;
		});
		onBeforeUnmount(() => {
			stop == null || stop();
		});
	}
	watch(data, () => {
		updatedItems.value = {};
	});
	return resolvedItems;
}
var Anchor = defineComponent({
	name: "Anchor",
	props: { data: {
		type: Array,
		required: true
	} },
	setup(props) {
		const { headerFixed, headerHeight } = inject(pageContextToken);
		const renderLinks = (data) => {
			return data.map((item) => createVNode(IxAnchorLink, {
				"title": item.title,
				"href": item.href
			}, { default: () => [renderLinks(item.children)] }));
		};
		const anchorRef = ref();
		const target = ref();
		const offsetTop = computed(() => headerFixed.value ? headerHeight.value + 16 : 16);
		onMounted(() => {
			var _a;
			target.value = m((_a = anchorRef.value) == null ? void 0 : _a.$el);
		});
		return () => createVNode(IxAnchor, {
			"ref": anchorRef,
			"offsetTop": offsetTop.value,
			"target": target.value
		}, { default: () => [renderLinks(props.data)] });
	}
});
var BaseContent = defineComponent({
	props: { visible: {
		type: Boolean,
		required: true
	} },
	setup(props, { slots, expose }) {
		const { anchorOptions } = inject(pageContextToken);
		const enableAnchor = computed(() => !!anchorOptions.value.enabled);
		const anchorMaxLevel = computed(() => isObject(anchorOptions) ? anchorOptions.value.maxLevel : 3);
		const rootEl = ref();
		const anchorEl = ref();
		const anchorDatas = ref();
		const contentPaddingReight = ref();
		const calcContentPadding = () => {
			var _a;
			const anchorWidth = (_a = anchorEl.value) == null ? void 0 : _a.$el.getBoundingClientRect().width;
			contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : void 0;
		};
		const updateAnchor = () => {
			if (!rootEl.value) return;
			anchorDatas.value = parseAnchors(rootEl.value, anchorMaxLevel.value);
		};
		watch([anchorDatas, () => props.visible], ([, visible]) => {
			visible && nextTick(calcContentPadding);
		});
		onMounted(() => {
			if (!enableAnchor.value) return;
			watch(() => props.visible, (visible) => {
				visible && nextTick(updateAnchor);
			}, { immediate: true });
		});
		expose({ updateAnchor });
		return () => {
			var _a, _b;
			return createVNode("div", { "class": "archive-app__page__content" }, [createVNode("div", {
				"class": "archive-app__page__content__inner",
				"ref": rootEl
			}, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), ((_b = anchorDatas.value) == null ? void 0 : _b.length) ? createVNode(Anchor, {
				"ref": anchorEl,
				"class": "archive-app__page__content__anchor",
				"data": anchorDatas.value
			}, null) : void 0]);
		};
	}
});
var anchorTags = [
	{
		tag: "h1",
		level: 1
	},
	{
		tag: "h2",
		level: 2
	},
	{
		tag: "h3",
		level: 3
	},
	{
		tag: "h4",
		level: 4
	}
];
function parseAnchors(root, maxLevel) {
	const anchorRoot = {
		level: 0,
		title: "",
		href: "",
		children: []
	};
	let stackTop = anchorRoot;
	const anchorStack = [anchorRoot];
	const pushStack = (data) => {
		anchorStack.push(data);
		stackTop = data;
	};
	const popStack = () => {
		anchorStack.pop();
		stackTop = anchorStack[anchorStack.length - 1];
	};
	const hiddenEls = [];
	u(root.children, "children", (el, parents) => {
		var _ref2, _el$getAttribute;
		var _a;
		if (getComputedStyle(el).display === "none") {
			hiddenEls.push(el);
			return;
		}
		if (!el.id || !el.textContent || parents.some((parent) => hiddenEls.includes(parent))) return;
		const level = (_a = anchorTags.find((tag) => tag.tag === el.tagName.toLowerCase())) == null ? void 0 : _a.level;
		if (!level || level > maxLevel) return;
		const data = {
			level,
			title: (_ref2 = (_el$getAttribute = el.getAttribute("title")) !== null && _el$getAttribute !== void 0 ? _el$getAttribute : el.textContent.replace(/^#/, "").replace(/#$/, "")) !== null && _ref2 !== void 0 ? _ref2 : el.id,
			href: `#${el.id}`,
			children: []
		};
		while (level <= stackTop.level) popStack();
		stackTop.children.push(data);
		pushStack(data);
	});
	return anchorRoot.children;
}
var DemosContent = defineComponent({
	props: {
		demoImports: {
			type: Array,
			required: true
		},
		visible: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		const { options: { getInitVisibleDemoIds, getDemoTools }, renderers: { pageContent: pageContentRenderer }, render } = inject(pageContextToken);
		const baseContentRef = ref();
		const demoItems = useArchiveItemImports(props, "demoImports");
		const demoIds = computed(() => demoItems.value.map((demoItem) => demoItem.id));
		const _getInitVisibleDemoIds = () => getInitVisibleDemoIds ? getInitVisibleDemoIds(demoItems.value) : demoIds.value;
		const visibleDemoIds = ref(_getInitVisibleDemoIds());
		const setVisibleDemoIds = (demoIds2) => {
			visibleDemoIds.value = demoIds2;
		};
		watch(demoIds, () => {
			visibleDemoIds.value = _getInitVisibleDemoIds();
		}, { flush: "post" });
		watch(visibleDemoIds, (ids, oldIds) => {
			if (ids.length !== oldIds.length) nextTick(() => {
				baseContentRef.value.updateAnchor();
			});
		});
		return () => {
			return createVNode(BaseContent, {
				"ref": baseContentRef,
				"visible": props.visible
			}, { default: () => [render({
				demos: demoItems.value,
				visibleDemoIds: visibleDemoIds.value,
				setVisibleDemoIds
			}, pageContentRenderer, () => demoItems.value.map((demoItem) => withDirectives(createVNode(Demo, {
				"resolvedDemoItem": demoItem,
				"tools": getDemoTools == null ? void 0 : getDemoTools(demoItem),
				"lang": "zh"
			}, null), [[vShow, visibleDemoIds.value.includes(demoItem.id)]])))] });
		};
	}
});
var PageContent = defineComponent({
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		pageImport: {
			type: Function,
			required: true
		}
	},
	setup(props) {
		const resolvedItem = useArchiveItemImport(props, "pageImport");
		const { render, renderers: { pageContent: pageContentRenderer } } = inject(pageContextToken);
		const instanceMounted = ref(false);
		const onInstanceMountedChange = (mounted) => {
			instanceMounted.value = mounted;
		};
		return () => createVNode(BaseContent, { "visible": props.visible && instanceMounted.value }, { default: () => [render({
			demos: [],
			visibleDemoIds: [],
			setVisibleDemoIds: () => {}
		}, pageContentRenderer, () => {
			var _a;
			return [createVNode(Bi, {
				"instance": (_a = resolvedItem.value) == null ? void 0 : _a.instance,
				"onInstanceMountedChange": onInstanceMountedChange
			}, null)];
		})] });
	}
});
var Page = defineComponent({
	props: innerPageProps,
	setup(props) {
		var _props$options, _props$renderers;
		var _a;
		const wrapperRef = ref();
		const headerRef = ref();
		const headerAffixTarget = ref();
		const headerFixed = ref(false);
		const headerHeight = ref(0);
		const handleAffixChange = (value) => {
			headerFixed.value = value;
		};
		const appContext = inject(appContextToken, null);
		const theme = inject(themeToken);
		const breakpoints = inject(breakpointsToken);
		useCopyCode();
		const render = usePageRender({
			theme,
			breakpoints,
			route: appContext == null ? void 0 : appContext.route,
			activeRecords: appContext == null ? void 0 : appContext.activeRecords
		});
		const anchorOptions = computed(() => ({
			enabled: props.theme.page.enableAnchor,
			maxLevel: props.theme.page.anchorMaxLevel
		}));
		const pageCls = computed(() => {
			const prefixCls = "archive-app__page";
			return normalizeClass({
				[prefixCls]: true,
				[`${prefixCls}-xs`]: breakpoints.xs,
				[`${prefixCls}-sm`]: breakpoints.sm,
				[`${prefixCls}-md`]: breakpoints.md,
				[`${prefixCls}-lg`]: breakpoints.lg,
				[`${prefixCls}-xl`]: breakpoints.xl
			});
		});
		onMounted(() => {
			var _ref3;
			var _a2;
			if (props.theme.page.headerAffix) headerAffixTarget.value = m(wrapperRef.value);
			headerHeight.value = (_ref3 = (_a2 = headerRef.value) == null ? void 0 : _a2.getBoundingClientRect().height) !== null && _ref3 !== void 0 ? _ref3 : 0;
		});
		provide(pageContextToken, {
			headerFixed,
			headerHeight,
			anchorOptions,
			options: (_props$options = props.options) !== null && _props$options !== void 0 ? _props$options : {},
			renderers: (_props$renderers = props.renderers) !== null && _props$renderers !== void 0 ? _props$renderers : {},
			render
		});
		const title = computed(() => props.pageData.title);
		const description = computed(() => props.pageData.description);
		const demoImports = computed(() => props.pageData.demoImports);
		const pageImport = computed(() => props.pageData.import);
		const tabs = computed(() => {
			var _ref4;
			var _a2;
			return (_ref4 = (_a2 = props.pageData.tabs) == null ? void 0 : _a2.filter((tab) => tab.import || tab.demoImports)) !== null && _ref4 !== void 0 ? _ref4 : [];
		});
		const tabsRadioData = computed(() => tabs.value.map((tab) => ({
			label: tab.name,
			value: tab.id
		})));
		const showTabs = computed(() => {
			var _a2;
			return !((_a2 = demoImports.value) == null ? void 0 : _a2.length) && tabs.value.length > 0;
		});
		const activeTabId = ref((_a = tabs.value[0]) == null ? void 0 : _a.id);
		const setActiveTabId = (tab) => {
			activeTabId.value = tab;
		};
		watch(() => props.pageData, () => {
			var _a2;
			activeTabId.value = (_a2 = tabs.value[0]) == null ? void 0 : _a2.id;
		});
		const headerCls = computed(() => ["archive-app__page__header", headerFixed.value ? "archive-app__page__header--fixed" : void 0]);
		const renderHeader = () => {
			var _a2;
			if (!title.value && !description.value && !tabs.value.length) return;
			const contentNode = createVNode("section", {
				"ref": headerRef,
				"class": headerCls.value
			}, [render({
				title: title.value,
				description: description.value,
				tabs: tabs.value,
				activeTabId: activeTabId.value,
				setActiveTabId
			}, (_a2 = props.renderers) == null ? void 0 : _a2.pageHeader, () => [
				createVNode("h1", { "class": "archive-app__page__title" }, [title.value]),
				createVNode("p", { "class": "archive-app__page__description" }, [description.value]),
				showTabs.value && createVNode(IxRadioGroup, {
					"value": activeTabId.value,
					"dataSource": tabsRadioData.value,
					"size": "lg",
					"mode": "primary",
					"gap": 4,
					"buttoned": true,
					"onUpdate:value": setActiveTabId
				}, null)
			].filter(Boolean))]);
			if (props.theme.page.headerAffix) return createVNode(IxAffix, {
				"class": "archive-app__page__header-affix",
				"target": headerAffixTarget.value,
				"onChange": handleAffixChange
			}, { default: () => [contentNode] });
			return contentNode;
		};
		const renderContent = () => {
			let children;
			if (demoImports.value) children = createVNode(DemosContent, {
				"visible": true,
				"demoImports": demoImports.value
			}, null);
			else if (pageImport.value) children = createVNode(PageContent, {
				"visible": true,
				"pageImport": pageImport.value
			}, null);
			else children = tabs.value.map((tab) => {
				const visible = activeTabId.value === tab.id;
				if (tab.demoImports) return withDirectives(createVNode(DemosContent, {
					"visible": visible,
					"demoImports": tab.demoImports
				}, null), [[vShow, visible]]);
				return withDirectives(createVNode(PageContent, {
					"visible": visible,
					"pageImport": tab.import
				}, null), [[vShow, visible]]);
			});
			return createVNode("section", { "class": "archive-app__page__content" }, [children]);
		};
		return () => createVNode(IxMessageProvider, null, { default: () => [createVNode("article", {
			"ref": wrapperRef,
			"class": pageCls.value
		}, [renderHeader(), renderContent()])] });
	}
});
export { Page as default };
