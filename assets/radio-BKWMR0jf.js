import { En as isNil, Fr as computed, Hr as createVNode, Jr as mergeProps, Kr as inject, Kt as convertCssPixel, Rt as supportsFlexGap, Si as normalizeClass, Ur as defineComponent, Ut as callEmit, Zt as flattenNode, _i as shallowRef, bn as useKey, ei as onMounted, gi as ref, ii as provide, jt as useThemeToken, ni as onUpdated, zt as useGlobalConfig } from "./app-default-DCCQUDkm.js";
import { t as useAccessorAndControl } from "./forms-B2-jwjTZ.js";
import { n as getThemeTokens$2, r as ɵWave } from "./button-FGzhxAqq.js";
import { n as useFormElement, r as useFormItemRegister, t as FORM_TOKEN } from "./form-CkhvCP4O.js";
import { n as convertStringVNode } from "./utils-BBjD-TyF.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/space/index.js
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
function getDefaultThemeTokens$1(tokens) {
	const { colorSeparator } = tokens;
	return { separatorColor: colorSeparator };
}
var getThemeTokens$1 = (tokens) => {
	return getDefaultThemeTokens$1(tokens);
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
		registerToken(getThemeTokens$1);
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/radio/index.js
var radioGroupToken = Symbol("radioGroupToken");
var radioProps = {
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
	buttoned: {
		type: Boolean,
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	label: {
		type: String,
		default: void 0
	},
	mode: {
		type: String,
		default: void 0
	},
	size: {
		type: String,
		default: void 0
	},
	value: {
		type: null,
		default: void 0
	},
	waveless: {
		type: Boolean,
		default: false
	},
	"onUpdate:checked": { type: [Function, Array] },
	onChange: { type: [Function, Array] },
	onBlur: { type: [Function, Array] },
	onFocus: { type: [Function, Array] }
};
var radioGroupProps = {
	control: {
		type: [
			String,
			Number,
			Object,
			Array
		],
		default: void 0
	},
	value: {
		type: null,
		default: void 0
	},
	buttoned: {
		type: Boolean,
		default: false
	},
	dataSource: { type: Array },
	disabled: {
		type: Boolean,
		default: false
	},
	gap: {
		type: [Number, String],
		default: void 0
	},
	name: {
		type: String,
		default: void 0
	},
	mode: {
		type: String,
		default: void 0
	},
	size: {
		type: String,
		default: "md"
	},
	"onUpdate:value": { type: [Function, Array] },
	onChange: { type: [Function, Array] }
};
function getDefaultThemeTokens(tokens) {
	const { paddingSizeXs, controlBorderRadiusSm, colorInfoContainerBg, colorBorderSecondary } = tokens;
	return {
		labelPadding: `0 ${paddingSizeXs}px`,
		fieldsetBorderRadius: controlBorderRadiusSm,
		fieldsetBgColor: colorInfoContainerBg,
		fieldsetBorderColor: colorBorderSecondary
	};
}
var getThemeTokens = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens);
};
var buttonSizeMap = {
	sm: "xs",
	md: "sm",
	lg: "md"
};
var Radio = /* @__PURE__ */ defineComponent({
	name: "IxRadio",
	inheritAttrs: false,
	props: radioProps,
	setup(props, { attrs, expose, slots }) {
		const key = useKey();
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("radio");
		const { hashId: buttonHashId, registerToken: registerButtonTokens } = useThemeToken("button");
		registerToken(getThemeTokens);
		registerButtonTokens(getThemeTokens$2);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-radio`);
		const config = useGlobalConfig("radio");
		const { elementRef, focus, blur } = useFormElement();
		const waveRef = ref();
		expose({
			focus,
			blur
		});
		const formContext = inject(FORM_TOKEN, null);
		const radioGroup = inject(radioGroupToken, null);
		const mergedName = computed(() => {
			var _a;
			return (_a = attrs.name) != null ? _a : radioGroup == null ? void 0 : radioGroup.props.name;
		});
		const mergedValue = computed(() => {
			const { value } = props;
			if (!isNil(value)) return value;
			return radioGroup ? key : void 0;
		});
		const isButtoned = computed(() => {
			var _a;
			return (_a = props.buttoned) != null ? _a : radioGroup == null ? void 0 : radioGroup.props.buttoned;
		});
		const size = computed(() => {
			var _a, _b, _c;
			return (_c = (_b = (_a = props.size) != null ? _a : radioGroup == null ? void 0 : radioGroup.props.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
		});
		const mergedWaveless = computed(() => {
			var _a;
			return (_a = props.waveless) != null ? _a : config.waveless;
		});
		const mode = computed(() => {
			var _a, _b;
			return (_b = (_a = props.mode) != null ? _a : radioGroup == null ? void 0 : radioGroup.props.mode) != null ? _b : "default";
		});
		const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useRadio(props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless);
		const classes = computed(() => {
			const buttoned = isButtoned.value;
			const checked = isChecked.value;
			const isPrimary = buttoned && checked && mode.value === "primary";
			const prefixCls = mergedPrefixCls.value;
			const commonPrefixCls = common.prefixCls;
			const classes2 = {
				[globalHashId.value]: !!globalHashId.value,
				[buttonHashId.value]: !!buttonHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-checked`]: isChecked.value,
				[`${prefixCls}-disabled`]: isDisabled.value,
				[`${prefixCls}-focused`]: isFocused.value,
				[`${prefixCls}-${size.value}`]: buttoned,
				[`${commonPrefixCls}-button`]: buttoned,
				[`${commonPrefixCls}-button-default`]: buttoned && !isPrimary,
				[`${commonPrefixCls}-button-primary`]: isPrimary,
				[`${commonPrefixCls}-button-disabled`]: buttoned && isDisabled.value,
				[`${commonPrefixCls}-button-${buttonSizeMap[size.value]}`]: buttoned
			};
			return normalizeClass([classes2, attrs.class]);
		});
		return () => {
			const { autofocus, label } = props;
			const { class: className, style, type, tabindex, ...restAttrs } = attrs;
			const prefixCls = mergedPrefixCls.value;
			const labelNode = convertStringVNode(slots.default, label);
			return createVNode("label", {
				"class": classes.value,
				"style": style
			}, [
				createVNode("span", {
					"class": `${prefixCls}-input`,
					"role": "radio",
					"aria-checked": String(!!isChecked.value),
					"aria-disabled": String(!!isDisabled.value)
				}, [createVNode("input", mergeProps({
					"ref": elementRef,
					"type": "radio",
					"class": `${prefixCls}-input-inner`,
					"aria-hidden": true,
					"autofocus": autofocus,
					"checked": isChecked.value,
					"disabled": isDisabled.value,
					"name": mergedName.value,
					"value": mergedValue.value,
					"onChange": handleChange,
					"onBlur": handleBlur,
					"onFocus": handleFocus
				}, restAttrs), null), !isButtoned.value && createVNode("span", {
					"class": `${prefixCls}-input-box`,
					"tabindex": tabindex
				}, [!mergedWaveless.value && createVNode(ɵWave, { "ref": waveRef }, null)])]),
				isButtoned.value && !mergedWaveless.value && createVNode(ɵWave, { "ref": waveRef }, null),
				labelNode && createVNode("span", { "class": `${prefixCls}-label` }, [labelNode])
			]);
		};
	}
});
var useRadio = (props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless) => {
	let isChecked;
	let isDisabled;
	const isFocused = ref(false);
	let handleChange;
	let handleBlur;
	const handleFocus = (evt) => {
		isFocused.value = true;
		callEmit(props.onFocus, evt);
	};
	if (radioGroup) {
		const { accessor, props: groupProps } = radioGroup;
		isChecked = computed(() => accessor.value === mergedValue.value);
		isDisabled = computed(() => accessor.disabled || !!props.disabled);
		handleBlur = (evt) => {
			isFocused.value = false;
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		handleChange = (evt) => {
			var _a;
			if (elementRef.value) {
				const checked = evt.target.checked;
				const value = mergedValue.value;
				const oldValue = accessor.value;
				accessor.setValue(value);
				elementRef.value.checked = false;
				callEmit(props.onChange, checked, !checked);
				callEmit(groupProps.onChange, value, oldValue);
				!mergedWaveless.value && ((_a = waveRef.value) == null || _a.play());
			}
		};
	} else {
		const { accessor, control } = useAccessorAndControl({ valueKey: "checked" });
		useFormItemRegister(control);
		isChecked = computed(() => !!accessor.value);
		isDisabled = computed(() => accessor.disabled);
		handleBlur = (evt) => {
			isFocused.value = false;
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		handleChange = (evt) => {
			var _a;
			if (elementRef.value) {
				const checked = evt.target.checked;
				accessor.setValue(checked);
				elementRef.value.checked = false;
				callEmit(props.onChange, checked, !checked);
				!mergedWaveless.value && ((_a = waveRef.value) == null || _a.play());
			}
		};
	}
	return {
		isChecked,
		isDisabled,
		isFocused,
		handleChange,
		handleBlur,
		handleFocus
	};
};
var RadioGroup = /* @__PURE__ */ defineComponent({
	name: "IxRadioGroup",
	inheritAttrs: false,
	props: radioGroupProps,
	setup(props, { attrs, slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId } = useThemeToken("radio");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`);
		const { accessor, control } = useAccessorAndControl();
		useFormItemRegister(control);
		provide(radioGroupToken, {
			props,
			accessor
		});
		const mergedGap = computed(() => {
			var _a;
			return (_a = props.gap) != null ? _a : props.buttoned ? 0 : 8;
		});
		const elementRef = shallowRef();
		const calcArrowOffset = () => {
			const element = elementRef.value;
			if (!element) return;
			const checkedCls = `.${common.prefixCls}-radio-checked`;
			const checkedRadio = element.querySelector(checkedCls);
			if (checkedRadio) element.style.setProperty("--ix-radio-group-fieldset-arrow-offset", `${checkedRadio.offsetLeft}px`);
		};
		onMounted(() => calcArrowOffset());
		onUpdated(() => calcArrowOffset());
		const classes = computed(() => {
			const { buttoned } = props;
			const gap = mergedGap.value;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[prefixCls]: true,
				[`${common.prefixCls}-button-group`]: buttoned,
				[`${common.prefixCls}-button-group-compact`]: buttoned && (!gap || gap === "0" || gap === "0px")
			});
		});
		return () => {
			const { dataSource } = props;
			const prefixCls = mergedPrefixCls.value;
			const { class: className, style, ...restAttrs } = attrs;
			let children;
			if (dataSource) children = dataSource.map((item) => {
				const { key, value } = item;
				return createVNode(Radio, mergeProps(item, {
					"key": key != null ? key : value,
					"value": value != null ? value : key
				}), null);
			});
			else children = slots.default ? slots.default() : void 0;
			const radioGroupNode = createVNode(IxSpace, mergeProps({
				"class": slots.fieldset ? classes.value : normalizeClass([classes.value, className]),
				"style": slots.fieldset ? void 0 : style,
				"size": mergedGap.value
			}, restAttrs), { default: () => [children] });
			if (slots.fieldset) {
				const value = accessor.value;
				return createVNode("div", {
					"ref": elementRef,
					"class": [
						`${prefixCls}-wrapper`,
						globalHashId.value,
						hashId.value
					],
					"style": style
				}, [radioGroupNode, createVNode("div", { "class": normalizeClass([`${prefixCls}-fieldset`, isNil(value) ? `${prefixCls}-fieldset-hidden` : ""]) }, [slots.fieldset({ value })])]);
			}
			return radioGroupNode;
		};
	}
});
var IxRadio = Radio;
var IxRadioGroup = RadioGroup;
export { IxRadioGroup as n, IxSpace as r, IxRadio as t };
