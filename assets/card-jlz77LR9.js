import { $t as getFirstValidNode, Bt as Logger, Dn as isString, Fr as computed, Gt as convertArray, Hr as createVNode, It as isWebKit, Jr as mergeProps, Jt as convertNumber, Kr as inject, Kt as convertCssPixel, Pt as isBrowser, Qn as isArray, Si as normalizeClass, Ur as defineComponent, Ut as callEmit, Yt as createSharedComposable, Zn as isObject, ei as onMounted, gi as ref, gn as tryOnScopeDispose, hi as reactive, ii as provide, jt as useThemeToken, oi as watch, qr as isVNode, si as watchEffect, sn as isNumeric, tn as hasSlot, vn as useControlledProp, zt as useGlobalConfig } from "./app-default-DCCQUDkm.js";
import { t as isNumber } from "./isNumber-BV9Yq1IR.js";
import { r as useResizeObserver } from "./resize-BuD9AbrA.js";
import { u as IxIcon } from "./form-CkhvCP4O.js";
import { n as convertStringVNode, t as convertIconVNode } from "./utils-BBjD-TyF.js";
import { t as IxButton } from "./button-FGzhxAqq.js";
import { t as isUndefined } from "./isUndefined-B5S92fGl.js";
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/breakpoint/index.js
var mediaQueriesForWebkitCompatibility = /* @__PURE__ */ new Set();
var mediaQueryStyleNode;
function createEmptyStyleRule(query) {
	if (mediaQueriesForWebkitCompatibility.has(query)) return;
	try {
		if (!mediaQueryStyleNode) {
			mediaQueryStyleNode = document.createElement("style");
			mediaQueryStyleNode.setAttribute("type", "text/css");
			document.head.appendChild(mediaQueryStyleNode);
		}
		if (mediaQueryStyleNode.sheet) {
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
		addEventListener: () => {},
		removeEventListener: () => {}
	};
}
var _matchMedia = isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
var matchMedia = (query) => {
	if (isWebKit) createEmptyStyleRule(query);
	return _matchMedia(query);
};
var _queries = /* @__PURE__ */ new Map();
function useMediaQuery(value) {
	const queries = splitQueries(value).map((query) => registerQuery(query));
	tryOnScopeDispose(() => {
		queries.forEach((query) => {
			query.referenceCnt--;
			if (query.referenceCnt > 0) return;
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
		return {
			matches,
			medias
		};
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
	const output = {
		referenceCnt: 1,
		matches,
		destroy,
		media: query
	};
	_queries.set(query, output);
	return output;
}
function splitQueries(queries) {
	return convertArray(queries).map((query) => query.split(",")).reduce((a1, a2) => a1.concat(a2)).map((query) => query.trim());
}
var BREAKPOINTS_KEYS = [
	"xs",
	"sm",
	"md",
	"lg",
	"xl"
];
var BREAKPOINTS = {
	xs: "(max-width: 599.99px)",
	sm: "(min-width: 600px) and (max-width: 959.99px)",
	md: "(min-width: 960px) and (max-width: 1279.99px)",
	lg: "(min-width: 1280px) and (max-width: 1719.99px)",
	xl: "(min-width: 1720px)"
};
var BREAKPOINTS_TOKEN = Symbol("cdk-breakpoints");
function useBreakpoints(value) {
	const medias = value != null ? value : inject(BREAKPOINTS_TOKEN, BREAKPOINTS);
	const queryState = useMediaQuery(Object.values(medias));
	const match = reactive({});
	watchEffect(() => {
		const state = queryState.value;
		Object.entries(medias).forEach(([key, value2]) => {
			match[key] = state.medias[value2];
		});
	});
	return match;
}
var useSharedBreakpoints = createSharedComposable(() => useBreakpoints());
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/avatar/index.js
var avatarProps = {
	alt: String,
	gap: Number,
	icon: [String, Object],
	shape: String,
	size: [
		Number,
		String,
		Object
	],
	src: String,
	srcset: String,
	text: String,
	onError: [Function, Array]
};
function getDefaultThemeTokens$2(tokens) {
	const { heightSm, heightMd, heightLg, componentBorderRadius } = tokens;
	return {
		sizeSm: heightSm,
		sizeMd: heightMd,
		sizeLg: heightLg,
		borderRadiusSquare: componentBorderRadius
	};
}
var getThemeTokens$2 = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens$2(tokens) : getDefaultThemeTokens$2(tokens);
};
var Avatar = /* @__PURE__ */ defineComponent({
	name: "IxAvatar",
	props: avatarProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("avatar");
		registerToken(getThemeTokens$2);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-avatar`);
		const config = useGlobalConfig("avatar");
		const showText = ref(false);
		watchEffect(() => {
			showText.value = !props.src && (!!props.text || hasSlot(slots));
		});
		const showIcon = ref(false);
		watchEffect(() => {
			showIcon.value = !props.src && !showText.value;
		});
		const icon$$ = computed(() => {
			var _a;
			return (_a = props.icon) != null ? _a : config.icon;
		});
		const { avatarRef, textRef, size, avatarStyle, textStyle } = useSize(props, config);
		const classes = useClasses(props, config, size, showText, showIcon, mergedPrefixCls, globalHashId, hashId);
		const handleError = (evt) => {
			if (callEmit(props.onError, evt) !== false && !evt.defaultPrevented) {
				if (!!props.text || hasSlot(slots)) showText.value = true;
				showIcon.value = !showText.value;
			}
		};
		return () => {
			var _a, _b;
			let child;
			const prefixCls = mergedPrefixCls.value;
			if (showIcon.value) child = renderIcon(slots.icon, icon$$.value);
			else if (showText.value) {
				const textChild = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : props.text;
				child = createVNode("span", {
					"ref": textRef,
					"class": `${prefixCls}-text`,
					"style": textStyle.value
				}, [textChild]);
			} else child = createVNode("img", {
				"src": props.src,
				"srcset": props.srcset,
				"alt": props.alt,
				"onError": handleError
			}, null);
			return createVNode("span", {
				"ref": avatarRef,
				"class": classes.value,
				"style": avatarStyle.value
			}, [child]);
		};
	}
});
var useClasses = (props, config, size, showText, showIcon, mergedPrefixCls, globalHashId, hashId) => {
	return computed(() => {
		var _a;
		const shape = (_a = props.shape) != null ? _a : config.shape;
		const sizeValue = size.value;
		const prefixCls = mergedPrefixCls.value;
		return {
			[globalHashId.value]: !!globalHashId.value,
			[hashId.value]: !!hashId.value,
			[`${prefixCls}`]: true,
			[`${prefixCls}-image`]: !!props.src && !showText.value && !showIcon.value,
			[`${prefixCls}-${shape}`]: true,
			[`${prefixCls}-${sizeValue}`]: isString(sizeValue)
		};
	});
};
var useSizeStyle = (size) => {
	const breakpoints = useSharedBreakpoints();
	return computed(() => {
		let currSize;
		const sizeValue = size.value;
		if (isNumber(sizeValue)) currSize = sizeValue;
		else if (isObject(sizeValue)) currSize = sizeValue[Object.keys(breakpoints).find((key) => breakpoints[key])];
		return getSizeStyle(currSize);
	});
};
var getSizeStyle = (size) => {
	if (!size) return {};
	const sizePixel = convertCssPixel(size);
	return {
		width: sizePixel,
		height: sizePixel,
		lineHeight: sizePixel,
		fontSize: convertCssPixel(size / 2)
	};
};
var renderIcon = (iconSlot, icon) => {
	if (iconSlot) return iconSlot();
	return isVNode(icon) ? icon : createVNode(IxIcon, { "name": icon }, null);
};
var useSize = (props, config) => {
	const avatarRef = ref();
	const textRef = ref();
	const size = computed(() => {
		var _a;
		return (_a = props.size) != null ? _a : config.size;
	});
	const gap = computed(() => {
		var _a;
		return (_a = props.gap) != null ? _a : config.gap;
	});
	const avatarStyle = useSizeStyle(size);
	const textScale = ref(1);
	const textStyle = computed(() => ({
		transform: `scale(${textScale.value}) translateX(-50%)`,
		lineHeight: avatarStyle.value.lineHeight
	}));
	const calcTextSize = () => {
		const avatarElement = avatarRef.value;
		const textElement = textRef.value;
		if (!avatarElement || !textElement) return;
		const avatarWidth = avatarElement.offsetWidth;
		const textWidth = textElement.offsetWidth;
		const gapWidth = gap.value * 2;
		if (avatarWidth !== 0 && textWidth !== 0 && gapWidth < avatarWidth) textScale.value = avatarWidth - gapWidth < textWidth ? (avatarWidth - gapWidth) / textWidth : 1;
	};
	useResizeObserver(textRef, calcTextSize);
	onMounted(() => {
		watch(gap, () => calcTextSize(), { immediate: true });
	});
	return {
		avatarRef,
		textRef,
		size,
		calcTextSize,
		avatarStyle,
		textStyle
	};
};
var IxAvatar = Avatar;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/header/index.js
var headerProps = {
	avatar: {
		type: [String, Object],
		default: void 0
	},
	description: {
		type: String,
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: false
	},
	prefix: {
		type: [
			String,
			Object,
			Function
		],
		default: void 0
	},
	size: {
		type: String,
		default: "md"
	},
	showBar: {
		type: Boolean,
		default: false
	},
	subTitle: {
		type: String,
		default: void 0
	},
	suffix: {
		type: [
			String,
			Object,
			Function
		],
		default: void 0
	},
	title: {
		type: String,
		default: void 0
	},
	onPrefixClick: [Function, Array],
	onSuffixClick: [Function, Array]
};
function getDefaultThemeTokens$1(tokens) {
	const { colorPrimary, colorPrimaryText, colorIcon, colorText, colorTextDisabled, colorIconHover, colorIconActive, colorIconDisabled, heightLg, heightXl, height2xl, fontSizeMd } = tokens;
	return {
		heightSm: heightLg,
		heightMd: heightXl,
		heightLg: heightXl,
		heightXl: height2xl,
		barWidth: 2,
		barBgColor: colorPrimary,
		barBorderRadius: 0,
		barMarginRight: 6,
		prefixColor: colorText,
		prefixColorHover: colorPrimaryText,
		prefixColorActive: colorPrimaryText,
		prefixColorDisabled: colorTextDisabled,
		suffixColor: colorIcon,
		suffixColorHover: colorIconHover,
		suffixColorActive: colorIconActive,
		suffixColorDisabled: colorIconDisabled,
		subTitleFontSize: fontSizeMd
	};
}
var getThemeTokens$1 = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens$1(tokens) : getDefaultThemeTokens$1(tokens);
};
var Header$1 = /* @__PURE__ */ defineComponent({
	name: "IxHeader",
	props: headerProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("header");
		registerToken(getThemeTokens$1);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-header`);
		const classes = computed(() => {
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-${props.size}`]: true,
				[`${prefixCls}-disabled`]: props.disabled,
				[`${prefixCls}-with-bar`]: props.showBar,
				[`${prefixCls}-with-description`]: props.description || slots.description
			});
		});
		const onPrefixClick = (evt) => !props.disabled && callEmit(props.onPrefixClick, evt);
		const onSuffixClick = (evt) => !props.disabled && callEmit(props.onSuffixClick, evt);
		return () => {
			const prefixCls = mergedPrefixCls.value;
			const prefixIconNode = convertIconVNode(slots, props, "prefix");
			const suffixIconNode = convertIconVNode(slots, props, "suffix");
			const titleNode = convertStringVNode(slots.default, props.title);
			const subTitleNode = convertStringVNode(slots, props, "subTitle");
			const descriptionNode = convertStringVNode(slots, props, "description");
			return createVNode("div", { "class": classes.value }, [
				prefixIconNode && createVNode("span", {
					"class": `${prefixCls}-prefix`,
					"onClick": onPrefixClick
				}, [prefixIconNode]),
				renderAvatar(slots.avatar, props.avatar, props.size),
				createVNode("div", { "class": `${prefixCls}-content` }, [createVNode("div", { "class": `${prefixCls}-title-wrapper` }, [titleNode && createVNode("span", { "class": `${prefixCls}-title` }, [titleNode]), subTitleNode && createVNode("span", { "class": `${prefixCls}-sub-title` }, [subTitleNode])]), descriptionNode && createVNode("div", { "class": `${prefixCls}-description` }, [descriptionNode])]),
				suffixIconNode && createVNode("span", {
					"class": `${prefixCls}-suffix`,
					"onClick": onSuffixClick
				}, [suffixIconNode])
			]);
		};
	}
});
var renderAvatar = (slot, avatar, size) => {
	if (slot) return slot();
	if (!avatar) return null;
	const avatarProps = isString(avatar) ? { icon: avatar } : avatar;
	return createVNode(IxAvatar, mergeProps({ "size": size }, avatarProps), null);
};
var IxHeader = Header$1;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/header/index.js
var Header = (props, { slots }) => {
	if (slots.header) return getFirstValidNode(slots.header(props));
	if (!props.header && !props.closable) return;
	const headerProps = convertProps(props);
	const headerSlots = {
		suffix: slots.closeIcon,
		default: slots.title
	};
	return createVNode(IxHeader, headerProps, headerSlots);
};
function convertProps(props) {
	var _a;
	const { closable, closeIcon, header, size, onClose } = props;
	const headerProps = isString(header) ? {
		title: header,
		size
	} : {
		size,
		...header
	};
	if (closable) {
		headerProps.suffix = (_a = headerProps.suffix) != null ? _a : closeIcon;
		if (onClose) {
			const onSuffixClick = convertArray(headerProps.onSuffixClick);
			onSuffixClick.push(onClose);
			headerProps.onSuffixClick = onSuffixClick;
		}
	}
	return headerProps;
}
Header.displayName = "ɵHeader";
var ɵHeader = Header;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/grid/index.js
var rowToken = Symbol("rowToken");
var rowProps = {
	align: String,
	justify: String,
	gutter: [
		Number,
		String,
		Array,
		Object
	],
	wrap: {
		type: Boolean,
		default: void 0
	}
};
var singleProp = [Number, String];
var breakpointConfig = [
	Number,
	String,
	Object
];
var Col = /* @__PURE__ */ defineComponent({
	name: "IxCol",
	props: {
		flex: singleProp,
		span: singleProp,
		order: singleProp,
		offset: singleProp,
		push: singleProp,
		pull: singleProp,
		xs: breakpointConfig,
		sm: breakpointConfig,
		md: breakpointConfig,
		lg: breakpointConfig,
		xl: breakpointConfig
	},
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-col`);
		const { mergedGutters } = inject(rowToken);
		const classes = computed(() => generateAllCls(props, mergedPrefixCls.value, globalHashId));
		const style = computed(() => {
			const style2 = {};
			const [verticalGutter, horizontalGutter] = mergedGutters.value;
			if (verticalGutter > 0) {
				style2.paddingTop = `${verticalGutter / 2}px`;
				style2.paddingBottom = style2.paddingTop;
			}
			if (horizontalGutter > 0) {
				style2.paddingLeft = `${horizontalGutter / 2}px`;
				style2.paddingRight = style2.paddingLeft;
			}
			if (props.flex) style2.flex = parseFlex(props.flex);
			return style2;
		});
		return () => createVNode("div", {
			"class": classes.value,
			"style": style.value
		}, [slots.default && slots.default()]);
	}
});
var attrKeys = [
	"span",
	"order",
	"offset",
	"push",
	"pull"
];
function generateAllCls(props, prefixCLs, globalHashId) {
	const clsMap = /* @__PURE__ */ new Map([[prefixCLs, true]]);
	const generateSizeCls = (sizeConfig, size) => {
		attrKeys.forEach((attrKey) => {
			const attr = sizeConfig[attrKey];
			const cls = `${prefixCLs}${size ? `-${size}` : ""}-${attrKey}-${attr}`;
			clsMap.set(cls, !isUndefined(attr));
		});
	};
	generateSizeCls(props);
	BREAKPOINTS_KEYS.forEach((size) => {
		const sizeValue = props[size];
		if (!isUndefined(sizeValue)) generateSizeCls(normalizeSizeProps(sizeValue), size);
	});
	const allCls = { [globalHashId.value]: !!globalHashId.value };
	clsMap.forEach((value, key) => {
		allCls[key] = value;
	});
	return normalizeClass(allCls);
}
function normalizeSizeProps(rawProps) {
	return isNumber(rawProps) || isString(rawProps) ? { span: rawProps } : rawProps;
}
function parseFlex(flex) {
	if (isNumeric(flex)) return `${flex} ${flex} auto`;
	if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;
	return flex;
}
var Row = /* @__PURE__ */ defineComponent({
	name: "IxRow",
	props: rowProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-row`);
		const config = useGlobalConfig("row");
		const mergedGutters = useGutters(props, useSharedBreakpoints());
		provide(rowToken, { mergedGutters });
		const classes = computed(() => {
			const { align, justify, wrap = config.wrap } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[prefixCls]: true,
				[`${prefixCls}-align-${align}`]: align,
				[`${prefixCls}-justify-${justify}`]: justify,
				[`${prefixCls}-nowrap`]: !wrap
			});
		});
		const style = computed(() => {
			const [verticalGutter, horizontalGutter] = mergedGutters.value;
			const style2 = {};
			if (verticalGutter > 0) {
				style2.marginTop = `${verticalGutter / -2}px`;
				style2.marginBottom = style2.marginTop;
			}
			if (horizontalGutter > 0) {
				style2.marginLeft = `${horizontalGutter / -2}px`;
				style2.marginRight = style2.marginLeft;
			}
			return style2;
		});
		return () => createVNode("div", {
			"class": classes.value,
			"style": style.value
		}, [slots.default && slots.default()]);
	}
});
function useGutters(props, breakpoints) {
	return computed(() => {
		const { gutter } = props;
		const results = [0, 0];
		(isArray(gutter) ? gutter : [gutter, gutter]).forEach((item, index) => {
			if (isObject(item)) BREAKPOINTS_KEYS.some((key) => {
				const currGutter = item[key];
				const isActive = currGutter != null && breakpoints[key];
				if (isActive) results[index] = convertNumber(currGutter);
				return isActive;
			});
			else results[index] = convertNumber(item);
		});
		return results;
	});
}
var IxRow = Row;
var IxCol = Col;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/card/index.js
var cardToken = Symbol("cardToken");
var cardProps = {
	borderless: {
		type: Boolean,
		default: void 0
	},
	cover: [String, Object],
	header: [String, Object],
	hoverable: {
		type: Boolean,
		default: void 0
	},
	shadow: {
		type: Boolean,
		default: void 0
	},
	loading: {
		type: Boolean,
		default: false
	},
	size: String,
	footer: Array,
	disabled: {
		type: Boolean,
		default: false
	},
	selected: {
		type: Boolean,
		default: false
	},
	selectable: {
		type: Boolean,
		default: false
	},
	"onUpdate:selected": [Function, Array],
	onSelectedChange: [Function, Array]
};
function getDefaultThemeTokens(tokens, algorithms) {
	const { getGreyColors } = algorithms;
	const { fontSizeSm, fontSizeMd, fontSizeXl, fontSizeLg, marginSizeXs, paddingSizeSm, paddingSizeLg, paddingSizeXl } = tokens;
	const greyColors = getGreyColors();
	return {
		fontSizeSm,
		fontSizeMd: fontSizeSm,
		fontSizeLg: fontSizeMd,
		paddingSizeSm: paddingSizeLg,
		paddingSizeMd: paddingSizeLg,
		paddingSizeLg: paddingSizeXl,
		showShadowBorderWidth: 0,
		markWidth: fontSizeXl,
		markHeight: fontSizeLg,
		headerPadding: paddingSizeSm,
		loadingSpacing: marginSizeXs,
		loadingHeight: fontSizeMd,
		loadingBgSize: `600%`,
		loadingStartColor: greyColors.l40,
		loadingEndColor: greyColors.l30,
		gridWidth: `25%`
	};
}
function getDarkThemeTokens(tokens, algorithms) {
	const { lineWidth } = tokens;
	return {
		...getDefaultThemeTokens(tokens, algorithms),
		showShadowBorderWidth: lineWidth
	};
}
var getThemeTokens = (tokens, presetTheme, algorithms) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens, algorithms) : getDarkThemeTokens(tokens, algorithms);
};
var Card = /* @__PURE__ */ defineComponent({
	name: "IxCard",
	props: cardProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("card");
		registerToken(getThemeTokens);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-card`);
		const config = useGlobalConfig("card");
		const hoverable = computed(() => {
			var _a;
			return (_a = props.hoverable) != null ? _a : config.hoverable;
		});
		provide(cardToken, { hoverable });
		const [selected, setSelected] = useControlledProp(props, "selected", false);
		const isDisabled = computed(() => props.disabled);
		const isSelectable = computed(() => props.selectable);
		const handleClick = () => {
			if (isDisabled.value || !isSelectable.value) return;
			const newSelected = !selected.value;
			setSelected(newSelected);
			callEmit(props.onSelectedChange, newSelected);
		};
		return () => {
			var _a, _b;
			const prefixCls = mergedPrefixCls.value;
			const { borderless = config.borderless, loading, size = config.size, shadow = config.shadow } = props;
			const children = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
			const hasGrid = children.some((node) => node.type && node.type.name === "IxCardGrid");
			const classes = normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-borderless`]: borderless,
				[`${prefixCls}-hoverable`]: !hasGrid && hoverable.value,
				[`${prefixCls}-loading`]: loading,
				[`${prefixCls}-has-shadow`]: shadow,
				[`${prefixCls}-has-grid`]: hasGrid,
				[`${prefixCls}-${size}`]: true,
				[`${prefixCls}-selectable`]: isSelectable.value,
				[`${prefixCls}-selected`]: isSelectable.value && selected.value,
				[`${prefixCls}-disabled`]: isDisabled.value
			});
			return createVNode("div", {
				"class": classes,
				"onClick": handleClick
			}, [
				renderCover(props, slots, prefixCls),
				createVNode(ɵHeader, {
					"size": size,
					"header": props.header
				}, slots),
				renderBody(props, children, hasGrid, prefixCls),
				renderFooter(props, slots, prefixCls),
				renderCornerMark(props, prefixCls)
			]);
		};
	}
});
var renderCornerMark = (props, prefixCls) => {
	if (!computed(() => {
		var _a;
		return (_a = props.selectable) != null ? _a : false;
	}).value) return;
	return createVNode("div", { "class": `${prefixCls}-mark-wrap` }, [createVNode("div", { "class": `${prefixCls}-mark` }, null), createVNode(IxIcon, {
		"name": "check-filled",
		"class": `${prefixCls}-mark-icon`,
		"color": "white"
	}, null)]);
};
var renderCover = (props, slots, prefixCls) => {
	let coverNode;
	if (slots.cover) coverNode = slots.cover();
	else if (props.cover) {
		const { cover } = props;
		const imgProps = isString(cover) ? { src: cover } : cover;
		coverNode = createVNode("img", imgProps, null);
	}
	return coverNode ? createVNode("div", { "class": `${prefixCls}-cover` }, [coverNode]) : void 0;
};
var renderBody = (props, children, hasGrid, prefixCls) => {
	let bodyNode;
	if (props.loading) bodyNode = renderLoading(prefixCls);
	else if (children.length) bodyNode = hasGrid ? createVNode(IxRow, null, { default: () => [children] }) : children;
	return bodyNode ? createVNode("div", { "class": `${prefixCls}-body` }, [bodyNode]) : void 0;
};
var loadingSpans = [
	[22],
	[8, 15],
	[6, 18],
	[13, 9],
	[
		4,
		3,
		16
	],
	[
		8,
		6,
		8
	]
];
var renderLoading = (prefixCls) => {
	const loadingChild = loadingSpans.map((spans) => {
		const cols = spans.map((span) => createVNode(IxCol, {
			"span": span,
			"class": `${prefixCls}-loading-col`
		}, { default: () => [createVNode("div", { "class": `${prefixCls}-loading-block` }, null)] }));
		return createVNode(IxRow, null, { default: () => [cols] });
	});
	return createVNode("div", { "class": `${prefixCls}-loading` }, [loadingChild]);
};
var renderFooter = (props, slots, prefixCls) => {
	if (!slots.footer && !props.footer) return;
	let footerNode;
	if (slots.footer) footerNode = slots.footer();
	else footerNode = props.footer.map((item) => {
		let itemChild;
		if (isVNode(item)) itemChild = item;
		else {
			const { text, ...rest } = item;
			itemChild = createVNode(IxButton, mergeProps({
				"class": `${prefixCls}-footer-button`,
				"waveless": true
			}, rest), { default: () => [text] });
		}
		return itemChild ? createVNode("li", null, [itemChild]) : null;
	});
	return createVNode("ul", { "class": `${prefixCls}-footer` }, [footerNode]);
};
var IxCard = Card;
export { IxHeader as n, IxCard as t };
