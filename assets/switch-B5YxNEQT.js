import { Fr as computed, Hr as createVNode, Si as normalizeClass, Ur as defineComponent, Ut as callEmit, ei as onMounted, jt as useThemeToken, zt as useGlobalConfig } from "./app-default-DCCQUDkm.js";
import { t as useAccessorAndControl } from "./forms-B2-jwjTZ.js";
import { i as useFormSize, n as useFormElement, r as useFormItemRegister, u as IxIcon } from "./form-CkhvCP4O.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/switch/index.js
var switchProps = {
	control: {
		type: [
			String,
			Number,
			Object,
			Array
		],
		default: void 0
	},
	checked: {
		type: Boolean,
		default: void 0
	},
	autofocus: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	labels: {
		type: Array,
		default: () => []
	},
	loading: {
		type: Boolean,
		default: false
	},
	size: String,
	"onUpdate:checked": [Function, Array],
	onChange: [Function, Array],
	onBlur: [Function, Array],
	onFocus: [Function, Array]
};
function getDefaultThemeTokens(tokens, algorithms) {
	const { getColorPalette } = algorithms;
	const { colorWhite, controlHeightXs, controlHeightSm, controlHeightMd, paddingSize2Xs, colorPrimary } = tokens;
	return {
		activeDisabledColor: getColorPalette(colorPrimary).l30,
		heightSm: controlHeightXs,
		heightMd: controlHeightSm,
		heightLg: controlHeightMd,
		handleSizeSm: 12,
		handleSizeMd: 20,
		handleSizeLg: 28,
		iconFontSizeSm: 9,
		iconFontSizeMd: 14,
		iconFontSizeLg: 14,
		handlePadding: paddingSize2Xs,
		handleBgColor: colorWhite,
		handleBoxShadow: `none`
	};
}
var getThemeTokens = (tokens, presetTheme, algorithms) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens, algorithms) : getDefaultThemeTokens(tokens, algorithms);
};
var IxSwitch = /* @__PURE__ */ defineComponent({
	name: "IxSwitch",
	props: switchProps,
	setup(props, { expose, slots }) {
		const common = useGlobalConfig("common");
		const config = useGlobalConfig("switch");
		const { globalHashId, hashId, registerToken } = useThemeToken("switch");
		registerToken(getThemeTokens);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-switch`);
		const mergedSize = useFormSize(props, config);
		const { elementRef, focus, blur } = useFormElement();
		expose({
			focus,
			blur
		});
		const { accessor, control } = useAccessorAndControl({ valueKey: "checked" });
		useFormItemRegister(control);
		const isChecked = computed(() => accessor.value);
		const isDisabled = computed(() => accessor.disabled);
		const handleClick = () => {
			if (isDisabled.value || props.loading) return;
			const oldValue = accessor.value;
			const newValue = !oldValue;
			accessor.setValue(newValue);
			callEmit(props.onChange, newValue, oldValue);
		};
		const handleFocus = (evt) => {
			callEmit(props.onFocus, evt);
		};
		const handleBlur = (evt) => {
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		const classes = computed(() => {
			const { loading } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-checked`]: isChecked.value,
				[`${prefixCls}-disabled`]: isDisabled.value,
				[`${prefixCls}-loading`]: loading,
				[`${prefixCls}-${mergedSize.value}`]: true
			});
		});
		onMounted(() => props.autofocus && focus());
		return () => {
			var _a, _b;
			const checked = isChecked.value;
			const label = (_b = (_a = slots.label) == null ? void 0 : _a.call(slots, { checked })) != null ? _b : props.labels[checked ? 0 : 1];
			const prefixCls = mergedPrefixCls.value;
			return createVNode("button", {
				"ref": elementRef,
				"type": "button",
				"class": classes.value,
				"onClick": handleClick,
				"onFocus": handleFocus,
				"onBlur": handleBlur
			}, [props.loading && createVNode("span", { "class": `${prefixCls}-loading-icon` }, [createVNode(IxIcon, { "name": "loading" }, null)]), createVNode("span", { "class": `${prefixCls}-label` }, [label])]);
		};
	}
});
export { IxSwitch as t };
