import { Br as nextTick, Bt as Logger, Dn as isString, Er as computed, Fn as isPlainObject, Hn as isFunction, Lr as inject, Nr as createVNode, Ot as getAlphaColor, Pr as defineComponent, Rr as isVNode, Ut as callEmit, Vt as NoopFunction, Wr as onDeactivated, Yr as provide, Zr as watch, di as toRefs, en as getMouseClientXY, jt as useThemeToken, kt as getBaseColors$1, li as toRaw, ln as off, mi as normalizeStyle, qr as onUpdated, si as ref, sn as isNumeric, un as on, vn as useControlledProp, zr as mergeProps, zt as useGlobalConfig } from "./app-default-_3RnZ9LU.js";
import { t as isUndefined } from "./isUndefined-B5S92fGl.js";
import { i as ɵOverlay, n as overlayPlacementDef, r as overlayTriggerDef, t as overlayDelayDef } from "./overlay-BSfY5Qx0.js";
import { t as useAccessorAndControl } from "./forms-BSJU5SjB.js";
import { n as useFormElement, r as useFormItemRegister } from "./form-Cpv7fBKv.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/tooltip/index.js
var tooltipProps = {
	visible: {
		type: Boolean,
		default: void 0
	},
	autoAdjust: {
		type: Boolean,
		default: void 0
	},
	closeOnDeactivated: {
		type: Boolean,
		default: true
	},
	destroyOnHide: {
		type: Boolean,
		default: void 0
	},
	delay: overlayDelayDef,
	disabled: {
		type: Boolean,
		default: false
	},
	offset: Array,
	overlayContainer: {
		type: [
			String,
			HTMLElement,
			Function
		],
		default: void 0
	},
	placement: overlayPlacementDef,
	showArrow: {
		type: Boolean,
		default: void 0
	},
	title: String,
	trigger: overlayTriggerDef,
	zIndex: Number,
	"onUpdate:visible": [Function, Array]
};
function useTooltipOverlay(props, config, mergedPrefixCls) {
	const overlayRef = ref();
	const updatePopper = () => {
		var _a;
		return (_a = overlayRef.value) == null ? void 0 : _a.updatePopper();
	};
	const [visible, setVisible] = useControlledProp(props, "visible", false);
	onDeactivated(() => {
		if (visible.value && props.closeOnDeactivated) setVisible(false);
	});
	return {
		overlayRef,
		updatePopper,
		visible,
		setVisible,
		overlayProps: computed(() => {
			var _a, _b, _c, _d, _e, _f, _g, _h;
			const trigger = (_a = props.trigger) != null ? _a : config.trigger;
			return {
				visible: visible.value,
				["onUpdate:visible"]: setVisible,
				autoAdjust: (_b = props.autoAdjust) != null ? _b : config.autoAdjust,
				clickOutside: trigger === "click" || trigger === "contextmenu",
				container: (_c = props.overlayContainer) != null ? _c : config.overlayContainer,
				containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
				delay: (_d = props.delay) != null ? _d : config.delay,
				destroyOnHide: (_e = props.destroyOnHide) != null ? _e : config.destroyOnHide,
				disabled: props.disabled,
				offset: (_f = props.offset) != null ? _f : config.offset,
				showArrow: (_g = props.showArrow) != null ? _g : config.showArrow,
				placement: (_h = props.placement) != null ? _h : config.placement,
				trigger,
				zIndex: props.zIndex
			};
		})
	};
}
function getDefaultThemeTokens$1(tokens) {
	const { fontSizeSm, colorTextInfo } = tokens;
	return {
		fontSize: fontSizeSm,
		color: colorTextInfo,
		minWidth: 32,
		maxWidth: 400,
		whiteSpace: "pre-wrap"
	};
}
var getThemeTokens$1 = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens$1(tokens) : getDefaultThemeTokens$1(tokens);
};
var Tooltip = /* @__PURE__ */ defineComponent({
	name: "IxTooltip",
	props: tooltipProps,
	setup(props, { slots, expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("tooltip");
		registerToken(getThemeTokens$1);
		const config = useGlobalConfig("tooltip");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-tooltip`);
		const { overlayRef, updatePopper, overlayProps } = useTooltipOverlay(props, config, mergedPrefixCls);
		expose({ updatePopper });
		return () => {
			const prefixCls = mergedPrefixCls.value;
			return createVNode(ɵOverlay, mergeProps({
				"ref": overlayRef,
				"class": [
					prefixCls,
					globalHashId.value,
					hashId.value
				],
				"transitionName": `${common.prefixCls}-fade-fast`
			}, overlayProps.value), {
				default: slots.default,
				content: () => renderContent(props, slots, prefixCls)
			});
		};
	}
});
var renderContent = (props, slots, prefixCls) => {
	if (!(slots.title || props.title)) return null;
	return createVNode("div", { "class": `${prefixCls}-wrapper` }, [slots.title ? slots.title() : props.title]);
};
var IxTooltip = Tooltip;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/slider/index.js
var sliderStartDirection = {
	ltr: "left",
	rtl: "right",
	btt: "bottom",
	ttb: "top"
};
var sliderToken = Symbol("sliderToken");
var sliderProps = {
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
		type: [Number, Array],
		default: void 0
	},
	disabled: {
		type: Boolean,
		default: false
	},
	dots: {
		type: Boolean,
		default: false
	},
	keyboard: {
		type: Boolean,
		default: true
	},
	marks: {
		type: Object,
		default: void 0
	},
	max: {
		type: Number,
		default: 100
	},
	min: {
		type: Number,
		default: 0
	},
	range: {
		type: Boolean,
		default: false
	},
	reverse: {
		type: Boolean,
		default: false
	},
	step: {
		type: Number,
		default: 1
	},
	tooltipFormatter: {
		type: Function,
		default: void 0
	},
	tooltipPlacement: {
		type: String,
		default: void 0
	},
	tooltipVisible: {
		type: Boolean,
		default: void 0
	},
	vertical: {
		type: Boolean,
		default: false
	},
	"onUpdate:value": [Function, Array],
	onChange: [Function, Array],
	onFocus: [Function, Array],
	onBlur: [Function, Array]
};
var sliderThumbProps = {
	value: {
		type: Number,
		default: void 0
	},
	onFocus: [Function, Array],
	onBlur: [Function, Array]
};
var IxSliderMarks = /* @__PURE__ */ defineComponent({
	name: "IxSliderMarks",
	props: { onClickMark: [Function, Array] },
	setup(props) {
		const { values, marks, max, min, prefixCls, range, reverse, vertical } = inject(sliderToken);
		const mergedPrefixCls = computed(() => `${prefixCls.value}-mark`);
		return () => {
			return createVNode("div", { "class": mergedPrefixCls.value }, [renderMarks(props, values.value, marks.value, max.value, min.value, mergedPrefixCls.value, range.value, reverse.value, vertical.value)]);
		};
	}
});
function renderMarks(props, values, marks, max, min, prefixCls, range, reverse, vertical) {
	if (isUndefined(marks)) return;
	const width = max - min;
	return Object.keys(marks).map(parseFloat).sort((a, b) => a - b).map((offset) => {
		const markValue = marks[offset];
		const isObj = isPlainObject(markValue);
		let markLabel = void 0;
		if (isString(markValue) || isVNode(markValue)) markLabel = markValue;
		else if (isFunction(markValue)) markLabel = markValue();
		else if (isObj) markLabel = markValue.label;
		if (isUndefined(markLabel)) return null;
		const isActived = range ? !(offset < values[0] || offset > values[1]) : offset <= values[0];
		const classes = {
			[`${prefixCls}-label`]: true,
			[`${prefixCls}-label-active`]: isActived
		};
		const style = vertical ? {
			marginBottom: "-50%",
			[reverse ? sliderStartDirection.ttb : sliderStartDirection.btt]: `${(offset - min) / width * 100}%`
		} : {
			transform: `translateX(${reverse ? `50%` : `-50%`})`,
			[reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr]: `${(offset - min) / width * 100}%`
		};
		const markStyle = isObj ? normalizeStyle([style, markValue == null ? void 0 : markValue.style]) : style;
		const handleMarkClick = (evt) => callEmit(props.onClickMark, evt, offset);
		return createVNode("span", {
			"key": offset,
			"class": classes,
			"style": markStyle,
			"onMousedown": handleMarkClick,
			"onTouchstart": handleMarkClick
		}, [markLabel]);
	});
}
var IxSliderSteps = /* @__PURE__ */ defineComponent({
	name: "IxSliderSteps",
	setup() {
		const { values, dots, marks, max, min, prefixCls, range, reverse, step, vertical } = inject(sliderToken);
		return () => {
			return createVNode("div", { "class": `${prefixCls.value}-step` }, [renderDots(values.value, dots.value, marks.value, max.value, min.value, prefixCls.value, range.value, reverse.value, step.value, vertical.value)]);
		};
	}
});
function renderDots(values, dots, marks, max, min, prefixCls, range, reverse, step, vertical) {
	const width = max - min;
	return getOffsets(dots, marks, max, min, step).map((offset) => {
		const pos = `${Math.abs(offset - min) / width * 100}%`;
		const isActived = range ? !(offset < values[0] || offset > values[1]) : offset <= values[0];
		const style = vertical ? { [reverse ? sliderStartDirection.ttb : sliderStartDirection.btt]: pos } : { [reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr]: pos };
		const classes = {
			[`${prefixCls}-dot`]: true,
			[`${prefixCls}-dot-active`]: isActived,
			[`${prefixCls}-dot-reverse`]: reverse
		};
		return createVNode("span", {
			"key": offset,
			"class": classes,
			"style": style
		}, null);
	});
}
function getOffsets(dots, marks, max, min, step) {
	const points = Object.keys(marks != null ? marks : {}).map(parseFloat).sort((a, b) => a - b);
	if (dots && step) {
		for (let i = min; i <= max; i += step) if (points.indexOf(i) === -1) points.push(i);
	}
	return points;
}
var IxSliderThumb = /* @__PURE__ */ defineComponent({
	name: "IxSliderThumb",
	inheritAttrs: false,
	props: sliderThumbProps,
	setup(props, { attrs, expose }) {
		var _a;
		const { disabled, dragging, prefixCls, tooltipVisible, tooltipPlacement, tooltipFormatter } = inject(sliderToken);
		const mergedTooltipVisible = ref((_a = tooltipVisible.value) != null ? _a : false);
		const isHovering = ref(false);
		const tooltipRef = ref(null);
		const thumbRef = ref(null);
		const mergedPrefixCls = computed(() => `${prefixCls.value}-thumb`);
		const showTooltip = () => tooltipVisible.value !== false && (mergedTooltipVisible.value = true);
		const hideTooltip = () => tooltipVisible.value !== true && (mergedTooltipVisible.value = false);
		onUpdated(() => {
			var _a2;
			return mergedTooltipVisible.value && ((_a2 = tooltipRef.value) == null ? void 0 : _a2.updatePopper());
		});
		function handleMouseEnter() {
			isHovering.value = true;
			showTooltip();
		}
		function handleMouseLeave() {
			isHovering.value = false;
			if (!dragging.value) hideTooltip();
		}
		function handleFocus(evt) {
			showTooltip();
			if (!dragging.value) callEmit(props.onFocus, evt);
		}
		function handleBlur(evt) {
			hideTooltip();
			if (!dragging.value) callEmit(props.onBlur, evt);
		}
		expose({
			tooltipRef,
			thumbRef,
			isHovering,
			showTooltip,
			hideTooltip
		});
		return () => {
			return createVNode(IxTooltip, {
				"ref": tooltipRef,
				"visible": mergedTooltipVisible.value,
				"placement": tooltipPlacement.value,
				"trigger": "manual",
				"onMouseenter": handleMouseEnter,
				"onMouseleave": handleMouseLeave
			}, {
				default: () => [createVNode("div", mergeProps(attrs, {
					"ref": thumbRef,
					"class": mergedPrefixCls.value,
					"onMouseenter": handleMouseEnter,
					"onMouseleave": handleMouseLeave,
					"onFocus": disabled.value ? NoopFunction : handleFocus,
					"onBlur": disabled.value ? NoopFunction : handleBlur
				}), null)],
				title: () => isFunction(tooltipFormatter.value) ? tooltipFormatter.value(props.value) : createVNode("span", null, [props.value])
			});
		};
	}
});
function useSlider(props) {
	const { elementRef, focus, blur } = useFormElement();
	const { accessor, control } = useAccessorAndControl();
	useFormItemRegister(control);
	const valuesRef = ref([props.min, props.min]);
	const thumbListRef = ref([]);
	const activeIndex = ref(-1);
	const railRef = ref(null);
	const isDragging = ref(false);
	const isDisabled = computed(() => accessor.disabled);
	const precision = computed(() => {
		const precisions = [
			props.min,
			props.max,
			props.step
		].map((num) => {
			const decimal = `${num}`.split(".")[1];
			return decimal ? decimal.length : 0;
		});
		return Math.max(...precisions);
	});
	const stepPrecision = computed(() => {
		const decimal = `${props.step}`.split(".")[1];
		return decimal ? decimal.length : 0;
	});
	const direction = computed(() => {
		if (props.vertical) return props.reverse ? sliderStartDirection.ttb : sliderStartDirection.btt;
		return props.reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr;
	});
	function setThumbRefs(index) {
		return (el) => {
			if (index === 0) elementRef.value = el == null ? void 0 : el.thumbRef;
			thumbListRef.value[index] = el;
		};
	}
	function handleMouseDown(evt) {
		var _a, _b;
		const index = thumbListRef.value.findIndex((v) => (v == null ? void 0 : v.thumbRef) === evt.target);
		if (index !== -1) {
			evt.preventDefault();
			activeIndex.value = index;
			(_b = (_a = thumbListRef.value[index]) == null ? void 0 : _a.thumbRef) == null || _b.focus();
			startDragging();
		} else {
			const newValue = calcValueByMouseEvent(evt);
			setActiveIndex(newValue);
			updateModelValue(newValue);
		}
	}
	function handleKeyDown(evt) {
		if (props.keyboard) {
			const index = thumbListRef.value.findIndex((v) => (v == null ? void 0 : v.thumbRef) === evt.target);
			if (index !== -1) {
				let value = null;
				if (evt.code === "ArrowUp" || evt.code === "ArrowRight") {
					activeIndex.value = index;
					value = incValueByActiveIndex(1);
				} else if (evt.code === "ArrowDown" || evt.code === "ArrowLeft") {
					activeIndex.value = index;
					value = incValueByActiveIndex(-1);
				}
				if (value !== null) {
					evt.preventDefault();
					updateModelValue(value);
					checkAcross(value);
				}
			}
		}
	}
	function handleMarkClick(evt, newValue) {
		evt.stopPropagation();
		setActiveIndex(newValue);
		updateModelValue(newValue);
	}
	function startDragging() {
		if (!isDragging.value) {
			isDragging.value = true;
			on(window, "mousemove", handleMouseMove);
			on(window, "touchmove", handleMouseMove);
			on(window, "mouseup", handleMouseUpOnDocument);
			on(window, "touchend", handleMouseUpOnDocument);
			on(window, "contextmenu", handleMouseUpOnDocument);
		}
	}
	function stopDragging() {
		if (isDragging.value) {
			const activeThumbRef = thumbListRef.value[activeIndex.value];
			isDragging.value = false;
			activeIndex.value = -1;
			if (!(activeThumbRef == null ? void 0 : activeThumbRef.isHovering)) nextTick(() => activeThumbRef == null ? void 0 : activeThumbRef.hideTooltip());
			off(window, "mousemove", handleMouseMove);
			off(window, "touchmove", handleMouseMove);
			off(window, "mouseup", handleMouseUpOnDocument);
			off(window, "touchend", handleMouseUpOnDocument);
			off(window, "contextmenu", handleMouseUpOnDocument);
		}
	}
	function handleMouseMove(evt) {
		if (!isDragging.value) {
			stopDragging();
			return;
		}
		const newValue = calcValueByMouseEvent(evt);
		updateModelValue(newValue);
		checkAcross(newValue);
	}
	function handleMouseUpOnDocument() {
		stopDragging();
	}
	function handleMouseUp() {
		var _a, _b;
		const { value: index } = activeIndex;
		if (index !== -1) (_b = (_a = thumbListRef.value[index]) == null ? void 0 : _a.thumbRef) == null || _b.focus();
	}
	function updateModelValue(newValue) {
		const { value: index } = activeIndex;
		if (valuesRef.value[index] !== newValue) {
			const newValues = valuesRef.value.slice();
			newValues[index] = newValue;
			const oldVal = toRaw(accessor.value);
			const modelValue = props.range ? newValues : newValues[0];
			accessor.setValue(modelValue);
			callEmit(props.onChange, modelValue, oldVal);
			nextTick(() => setValues());
		}
	}
	function setActiveIndex(newValue) {
		const { value: oldValues } = valuesRef;
		activeIndex.value = props.range ? Math.abs(oldValues[0] - newValue) < Math.abs(oldValues[1] - newValue) ? 0 : 1 : 0;
	}
	function checkAcross(value) {
		var _a, _b;
		if (props.range) {
			const { value: thumbValues } = valuesRef;
			let newIndex = activeIndex.value;
			if (value > thumbValues[1]) newIndex = 1;
			else if (value < thumbValues[0]) newIndex = 0;
			if (newIndex !== activeIndex.value) {
				activeIndex.value = newIndex;
				(_b = (_a = thumbListRef.value[activeIndex.value]) == null ? void 0 : _a.thumbRef) == null || _b.focus();
			}
		}
	}
	function calcValueByMouseEvent(evt) {
		const client = getMouseClientXY(evt);
		const railRect = railRef.value.getBoundingClientRect();
		let percentage;
		if (props.vertical) percentage = (railRect.bottom - client.clientY) / railRect.height;
		else percentage = (client.clientX - railRect.left) / railRect.width;
		if (props.reverse) percentage = 1 - percentage;
		return calcValueByStep(percentage * (props.max - props.min) + props.min);
	}
	function calcValueByStep(value) {
		var _a, _b;
		value = Math.max(props.min, Math.min(props.max, value));
		const marks = (_a = props.marks) != null ? _a : {};
		const points = Object.keys(marks).map(parseFloat);
		if (props.step !== null) {
			const convertNum = Math.pow(10, precision.value);
			const totalSteps = Math.floor((props.max * convertNum - props.min * convertNum) / (props.step * convertNum));
			const steps = Math.min((value - props.min) / props.step, totalSteps);
			const closestStepValue = Math.round(steps) * props.step + props.min;
			points.push(parseFloat(closestStepValue.toFixed(precision.value)));
		}
		const diffs = points.map((point) => Math.abs(value - point));
		return (_b = points[diffs.indexOf(Math.min(...diffs))]) != null ? _b : props.min;
	}
	function incValueByActiveIndex(flag) {
		if (props.step !== null) {
			const step = flag < 0 ? -props.step : +props.step;
			const currValue = valuesRef.value[activeIndex.value];
			return Math.max(props.min, Math.min(props.max, parseFloat((currValue + step).toFixed(stepPrecision.value))));
		}
		return props.min;
	}
	watch(() => accessor.value, (val, oldVal) => {
		if (isDragging.value || Array.isArray(val) && Array.isArray(oldVal) && val.every((v, i) => v === oldVal[i])) return;
		setValues();
	}, { immediate: true });
	watch(() => [
		props.max,
		props.min,
		props.range,
		props.step
	], () => {
		setValues();
	});
	function setValues() {
		var _a, _b;
		if (props.min > props.max) {
			Logger.error("components/slider", "min should not be greater than max.");
			return;
		}
		if (props.step !== null && props.step <= 0) Logger.error("components/slider", `step(${props.step}) should be greater than 0.`);
		const { value: modelValue = 0 } = accessor;
		let val;
		if (props.range) {
			if (!Array.isArray(modelValue)) {
				Logger.error("components/slider", "value should be [number, number] in range mode.");
				return;
			}
			val = [(_a = modelValue[0]) != null ? _a : props.min, (_b = modelValue[1]) != null ? _b : props.min];
		} else {
			if (!isNumeric(modelValue)) {
				Logger.error("components/slider", "value should be a number.");
				return;
			}
			val = [modelValue];
		}
		valuesRef.value = val.map((num) => {
			if (!isNumeric(num)) return props.min;
			return calcValueByStep(num);
		}).sort((a, b) => a - b);
	}
	return {
		valuesRef,
		thumbListRef,
		railRef,
		direction,
		isDisabled,
		isDragging,
		focus,
		blur,
		setThumbRefs,
		handleMouseDown,
		handleMouseUp,
		handleKeyDown,
		handleMarkClick
	};
}
function getDefaultThemeTokens(tokens) {
	const { colorPrimary, lineType, colorText, colorTextPlaceholder, colorContainerBgDisabled, colorSeparator } = tokens;
	return {
		railSize: 2,
		markLabelColor: colorTextPlaceholder,
		markLabelColorActive: colorText,
		dotBgColor: colorSeparator,
		dotBgColorDisabled: colorContainerBgDisabled,
		dotBgColorActive: colorPrimary,
		railBgColor: colorSeparator,
		railBgColorHover: colorSeparator,
		trackBgColor: colorPrimary,
		trackBgColorHover: colorPrimary,
		trackBgColorDisabled: colorContainerBgDisabled,
		thumbBgColor: getBaseColors$1().white,
		thumbBorderColor: colorPrimary,
		thumbBorderColorHover: colorPrimary,
		thumbBorderColorDisabled: colorContainerBgDisabled,
		thumbBorderWidth: 2,
		thumbBorderType: lineType,
		thumbBorderColorFocus: colorPrimary,
		thumbBoxShadowFocus: `0 0 0 5px ${getAlphaColor(colorPrimary, .12)}`,
		thumbSize: 10
	};
}
var getThemeTokens = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens);
};
var Slider = /* @__PURE__ */ defineComponent({
	name: "IxSlider",
	props: sliderProps,
	setup(props, { expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("slider");
		registerToken(getThemeTokens);
		const { direction, isDisabled, isDragging, valuesRef, railRef, setThumbRefs, handleMouseDown, handleMouseUp, handleKeyDown, handleMarkClick, focus, blur } = useSlider(props);
		const { trackStyle } = useTrack(props, valuesRef, direction);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-slider`);
		const thumbs = computed(() => valuesRef.value.slice(0, props.range ? 2 : 1));
		const thumbTransformOfStyle = computed(() => {
			if (props.vertical) return props.reverse ? `translateY(-50%)` : `translateY(50%)`;
			return props.reverse ? `translateX(50%)` : `translateX(-50%)`;
		});
		const classes = computed(() => {
			const prefixCls = mergedPrefixCls.value;
			return {
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-disabled`]: isDisabled.value,
				[`${prefixCls}-vertical`]: props.vertical,
				[`${prefixCls}-with-marks`]: !isUndefined(props.marks)
			};
		});
		provide(sliderToken, {
			...toRefs(props),
			direction,
			dragging: isDragging,
			values: valuesRef,
			disabled: isDisabled,
			prefixCls: mergedPrefixCls
		});
		expose({
			focus,
			blur
		});
		return () => {
			return createVNode("div", {
				"class": classes.value,
				"onMousedown": isDisabled.value ? NoopFunction : handleMouseDown,
				"onTouchstart": isDisabled.value ? NoopFunction : handleMouseDown,
				"onMouseup": isDisabled.value ? NoopFunction : handleMouseUp,
				"onKeydown": isDisabled.value ? NoopFunction : handleKeyDown
			}, [
				createVNode("div", {
					"ref": railRef,
					"class": `${mergedPrefixCls.value}-rail`
				}, null),
				createVNode("div", {
					"class": `${mergedPrefixCls.value}-track`,
					"style": trackStyle.value
				}, null),
				createVNode(IxSliderSteps, null, null),
				thumbs.value.map((val, index) => {
					const position = (val - props.min) / (props.max - props.min) * 100;
					return createVNode(IxSliderThumb, {
						"ref": setThumbRefs(index),
						"value": val,
						"role": "slider",
						"tabindex": isDisabled.value ? -1 : 0,
						"aria-label": "Slider",
						"aria-valuemin": props.min,
						"aria-valuemax": props.max,
						"aria-valuenow": val,
						"aria-readonly": isDisabled.value,
						"aria-orientation": props.vertical ? "vertical" : "horizontal",
						"onFocus": props.onFocus,
						"onBlur": props.onBlur,
						"style": {
							transform: thumbTransformOfStyle.value,
							[direction.value]: `${position}%`
						}
					}, null);
				}),
				createVNode(IxSliderMarks, { "onClickMark": isDisabled.value ? NoopFunction : handleMarkClick }, null)
			]);
		};
	}
});
function useTrack(props, values, direction) {
	const maxValue = computed(() => Math.max(...values.value));
	const minValue = computed(() => Math.min(...values.value));
	return { trackStyle: computed(() => {
		return {
			[direction.value]: props.range ? `${(minValue.value - props.min) / (props.max - props.min) * 100}%` : "0%",
			[props.vertical ? "height" : "width"]: props.range ? `${(maxValue.value - minValue.value) / (props.max - props.min) * 100}%` : `${(+values.value[0] - props.min) / (props.max - props.min) * 100}%`
		};
	}) };
}
var IxSlider = Slider;
export { IxSlider as t };
