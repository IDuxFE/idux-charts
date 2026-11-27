import { An as createVNode, Cn as computed, D as supportsFlexGap, I as convertCssPixel, O as useGlobalConfig, V as flattenNode, b as useThemeToken, jn as defineComponent, ur as normalizeClass } from "./app-default-CCjST5KB.js";
import { n as convertStringVNode } from "./utils-DTMOUekc.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/space/index.js
var spaceProps = {
	align: String,
	block: {
		type: Boolean,
		default: void 0
	},
	justify: String,
	size: [
		Number,
		String,
		Array
	],
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
function getDefaultThemeTokens(tokens) {
	const { colorSeparator } = tokens;
	return { separatorColor: colorSeparator };
}
var getThemeTokens = (tokens) => {
	return getDefaultThemeTokens(tokens);
};
var flexGapSupported = supportsFlexGap();
var defaultSizeMap = {
	sm: "8px",
	md: "16px",
	lg: "24px"
};
var Space = /* @__PURE__ */ defineComponent({
	name: "IxSpace",
	props: spaceProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("space");
		registerToken(getThemeTokens);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-space`);
		const config = useGlobalConfig("space");
		const wrap = computed(() => {
			var _a;
			return (_a = props.wrap) != null ? _a : config.wrap;
		});
		const mergedGaps = computed(() => {
			const { size = config.size } = props;
			return (Array.isArray(size) ? size : [size, size]).map((size2) => defaultSizeMap[size2] || convertCssPixel(size2));
		});
		const classes = computed(() => {
			const { align, justify, block, vertical } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
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
			if (flexGapSupported) return `gap: ${rowGap} ${columnGap}`;
			else return !props.vertical && wrap.value ? `margin-bottom: -${convertCssPixel(rowGap)}` : void 0;
		});
		return () => {
			var _a;
			const nodes = flattenNode((_a = slots.default) == null ? void 0 : _a.call(slots));
			if (nodes.length === 0) return;
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
				if (separatorNode && index < lastIndex) children.push(createVNode("div", {
					"key": `separator-${index}`,
					"class": `${prefixCls}-item-separator`,
					"style": style2
				}, [separatorNode]));
			});
			return createVNode("div", {
				"class": classes.value,
				"style": style.value
			}, [children]);
		};
	}
});
var calcItemStyle = (mergedGaps, wrap, vertical, index, lastIndex) => {
	if (flexGapSupported) return;
	const [rowGap, columnGap] = mergedGaps.value;
	if (vertical) return { marginBottom: index < lastIndex ? convertCssPixel(rowGap) : void 0 };
	else return {
		marginRight: index < lastIndex ? convertCssPixel(columnGap) : void 0,
		paddingBottom: wrap.value ? convertCssPixel(rowGap) : void 0
	};
};
var IxSpace = Space;
export { IxSpace as t };
