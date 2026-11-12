import { At as getSolidColor, Fr as computed, Hr as createVNode, Kr as inject, Ot as getAlphaColor, Si as normalizeClass, Ur as defineComponent, Ut as callEmit, Yr as nextTick, gi as ref, jt as useThemeToken, zt as useGlobalConfig } from "./app-default-DCCQUDkm.js";
import { t as FORM_TOKEN, u as IxIcon } from "./form-CkhvCP4O.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/wave/index.js
var ɵWave = /* @__PURE__ */ defineComponent({
	name: "ɵWave",
	props: {},
	setup(_, { expose }) {
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-wave`);
		const selfRef = ref();
		const play = () => {
			nextTick(() => {
				if (selfRef.value && selfRef.value.parentElement && selfRef.value.animate) {
					const borderColor = getComputedStyle(selfRef.value.parentElement).borderColor;
					selfRef.value.animate([{
						opacity: .6,
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
		expose({ play });
		return () => {
			return createVNode("div", {
				"ref": selfRef,
				"aria-hidden": true,
				"class": mergedPrefixCls.value
			}, null);
		};
	}
});
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/button/index.js
var buttonToken = Symbol("button");
var buttonProps = {
	block: {
		type: Boolean,
		default: void 0
	},
	danger: {
		type: Boolean,
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	ghost: {
		type: Boolean,
		default: void 0
	},
	icon: String,
	loading: {
		type: Boolean,
		default: void 0
	},
	mode: String,
	size: String,
	shape: String,
	type: {
		type: String,
		default: "button"
	},
	waveless: {
		type: Boolean,
		default: void 0
	},
	onClick: [Function, Array]
};
function getDefaultThemeTokens(tokens) {
	const { fontSizeSm, fontSizeMd, fontSizeLg, heightSm, heightMd, heightLg, heightXl, paddingSizeSm, paddingSizeMd, paddingSizeLg, paddingSizeXl, paddingSize2Xl, colorPrimary, colorPrimaryHover, colorPrimaryActive, colorErrorBg, colorErrorBgHover, colorErrorBgActive, colorErrorText, colorErrorTextHover, colorErrorTextActive, colorText, colorTextInverse, colorTextDisabled, colorContainerBg, colorContainerBgDisabled, colorBorder, borderRadiusSm, fontSizeIcon } = tokens;
	return {
		fontSizeXs: fontSizeSm,
		fontSizeSm,
		fontSizeMd,
		fontSizeLg,
		fontSizeXl: fontSizeLg,
		minWidthXs: 56,
		minWidthSm: 64,
		minWidthMd: 72,
		minWidthLg: 120,
		minWidthXl: 160,
		heightXs: heightSm,
		heightSm: heightMd,
		heightMd,
		heightLg,
		heightXl,
		paddingSizeHorizontalXs: paddingSizeSm,
		paddingSizeHorizontalSm: paddingSizeMd,
		paddingSizeHorizontalMd: paddingSizeLg,
		paddingSizeHorizontalLg: paddingSizeXl,
		paddingSizeHorizontalXl: paddingSize2Xl,
		color: colorText,
		colorDisabled: colorTextDisabled,
		bgColor: colorContainerBg,
		bgColorDisabled: colorContainerBgDisabled,
		borderColor: colorBorder,
		borderRadius: borderRadiusSm,
		primaryColor: colorTextInverse,
		primaryBgColor: colorPrimary,
		primaryBgColorHover: colorPrimaryHover,
		primaryBgColorActive: colorPrimaryActive,
		dangerColor: colorErrorText,
		dangerColorHover: colorErrorTextHover,
		dangerColorActive: colorErrorTextActive,
		dangerBgColor: colorErrorBg,
		dangerBgColorHover: colorErrorBgHover,
		dangerBgColorActive: colorErrorBgActive,
		ghostColor: colorTextInverse,
		ghostColorHover: colorTextInverse,
		ghostColorActive: getSolidColor(colorTextInverse, 65),
		ghostBorderColorHover: colorTextInverse,
		ghostBorderColorActive: colorTextInverse,
		ghostBorderColor: colorTextInverse,
		ghostBgColorHover: getAlphaColor(colorTextInverse, .2),
		ghostBgColorActive: colorTextInverse,
		ghostBgColorDisabled: getAlphaColor(colorTextInverse, .4),
		iconColor: "inherit",
		iconFontSize: fontSizeIcon
	};
}
var getThemeTokens = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens);
};
var aProps = [
	"href",
	"target",
	"rel",
	"download",
	"hreflang",
	"ping"
];
var IxButton = /* @__PURE__ */ defineComponent({
	name: "IxButton",
	props: buttonProps,
	setup(props, { slots, attrs }) {
		const { globalHashId, hashId, registerToken } = useThemeToken("button");
		registerToken(getThemeTokens);
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-button`);
		const config = useGlobalConfig("button");
		const groupProps = inject(buttonToken, {});
		const formContext = inject(FORM_TOKEN, null);
		const waveRef = ref();
		const mode = computed(() => {
			var _a, _b;
			return (_b = (_a = props.mode) != null ? _a : groupProps.mode) != null ? _b : "default";
		});
		const size = computed(() => {
			var _a, _b, _c;
			return (_c = (_b = (_a = props.size) != null ? _a : groupProps.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
		});
		const mergedWaveless = computed(() => {
			var _a;
			return mode.value === "text" || mode.value === "link" || ((_a = props.waveless) != null ? _a : config.waveless);
		});
		const mergedDisabled = computed(() => {
			var _a;
			return (_a = props.disabled) != null ? _a : groupProps.disabled;
		});
		const classes = computed(() => {
			const { block = groupProps.block, danger = groupProps.danger, ghost = groupProps.ghost, loading, icon, shape = groupProps.shape } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-danger`]: danger,
				[`${prefixCls}-disabled`]: mergedDisabled.value,
				[`${prefixCls}-ghost`]: ghost,
				[`${prefixCls}-loading`]: loading,
				[`${prefixCls}-icon-only`]: !slots.default && (icon || loading || slots.icon),
				[`${prefixCls}-${mode.value}`]: mode.value,
				[`${prefixCls}-${shape}`]: !!shape,
				[`${prefixCls}-${size.value}`]: true
			});
		});
		const handleClick = (evt) => {
			if (mergedDisabled.value || props.loading) {
				evt.preventDefault();
				evt.stopImmediatePropagation();
				return;
			}
			if (!mergedWaveless.value && waveRef.value) waveRef.value.play();
			callEmit(props.onClick, evt);
		};
		return () => {
			const { loading, icon, type } = props;
			const children = [];
			if (loading) children.push(createVNode(IxIcon, { "name": "loading" }, null));
			else if (slots.icon) children.push(slots.icon());
			else if (icon) children.push(createVNode(IxIcon, { "name": icon }, null));
			if (slots.default) children.push(createVNode("span", null, [slots.default()]));
			if (mode.value === "link" && Object.keys(attrs).some((attr) => aProps.includes(attr))) return createVNode("a", {
				"class": classes.value,
				"onClick": handleClick
			}, [children]);
			return createVNode("button", {
				"class": classes.value,
				"disabled": mergedDisabled.value || loading,
				"type": type,
				"aria-disabled": mergedDisabled.value || loading,
				"aria-busy": loading,
				"onClick": handleClick
			}, [children, !mergedWaveless.value && createVNode(ɵWave, { "ref": waveRef }, null)]);
		};
	}
});
export { getThemeTokens as n, ɵWave as r, IxButton as t };
