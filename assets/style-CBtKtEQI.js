import { n as convertStringVNode } from "./utils-DfB9XSBU.js";
import { Fr as inject, Gr as onUpdated, Lr as mergeProps, Mr as defineComponent, Tn as isNil, Ur as onMounted, Ut as callEmit, ai as ref, bn as useKey, di as normalizeClass, jr as createVNode, jt as useThemeToken, oi as shallowRef, qr as provide, wr as computed, zt as useGlobalConfig } from "./app-default-K1ISpu3o.js";
import { n as useFormElement, r as useFormItemRegister, t as FORM_TOKEN } from "./form-CUqoBoqY.js";
import { n as IxSpace, t as useAccessorAndControl } from "./forms-BsEJBp8g.js";
import { n as getThemeTokens$1, r as ɵWave } from "./button-Dd9UlXqB.js";
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
		registerButtonTokens(getThemeTokens$1);
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
export { IxRadioGroup as n, IxRadio as t };
