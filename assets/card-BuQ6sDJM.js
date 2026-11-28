import { An as createVNode, Cn as computed, Fn as isVNode, In as mergeProps, Kn as provide, N as callEmit, O as useGlobalConfig, _t as isString, b as useThemeToken, ct as useControlledProp, jn as defineComponent, ur as normalizeClass } from "./app-default-T1OuoY14.js";
import { n as IxRow, r as ɵHeader, t as IxCol } from "./grid-CsYG-yos.js";
import { t as IxButton } from "./button-J6yoI-6A.js";
import { i as IxIcon } from "./a11y-Ctce35W3.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/card/index.js
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
export { IxCard as t };
