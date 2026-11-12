import { t as Ui } from "./client-D2zkqFpb.js";
import { C as __commonJSMin, _ as use, g as install, i as IxRadarChart, t as setup, x as isBoolean } from "./setup-CSaLiqAG.js";
import { t as IxEmpty } from "./empty-DeWpmeLS.js";
import { n as getThemeTokens$3, r as ɵWave, t as IxButton } from "./button-FGzhxAqq.js";
import { n as IxRadioGroup, r as IxSpace, t as IxRadio } from "./radio-BKWMR0jf.js";
import { $t as getFirstValidNode, Bt as Logger, Ci as normalizeStyle, Dn as isString, En as isNil, Fr as computed, Ft as isFirefox$1, Gt as convertArray, Hr as createVNode, Ir as createBaseVNode, Jr as mergeProps, Kr as inject, Kt as convertCssPixel, Lr as createBlock, Mr as Fragment, Nr as Teleport, Ot as getAlphaColor, Qn as isArray, Qt as getBoxSizingData, Rn as isPlainObject, Si as normalizeClass, Un as toString, Ur as defineComponent, Ut as callEmit, Vr as createTextVNode, Wt as cancelRAF, Xn as isFunction, Xr as onActivated, Xt as easeInOutCubic, Yr as nextTick, Yt as createSharedComposable, Zn as isObject, Zr as onBeforeUnmount, Zt as flattenNode, _i as shallowRef, an as isEmptyNode, bn as useKey, bt as _plugin_vue_export_helper_default, ci as withCtx, di as effectScope, dn as parseSize, ei as onMounted, er as isSymbol, fn as rAF, gi as ref, gn as tryOnScopeDispose, hn as traverseTree, ii as provide, in as insertTreeItemBefore, ir as root, jr as vShow, jt as useThemeToken, kr as Transition, li as withDirectives, mn as throwError, ni as onUpdated, nn as insertChildTreeItem, oi as watch, on as isFocusable, pi as isRef, pn as removeTreeItem, qr as isVNode, qt as convertElement, ri as openBlock, rn as insertTreeItemAfter, si as watchEffect, ti as onUnmounted, tn as hasSlot, vi as toRaw, vn as useControlledProp, wt as seerColors, xn as useState, yi as toRef, yn as useEventListener, zr as createElementBlock, zt as useGlobalConfig } from "./app-default-DCCQUDkm.js";
import { t as useAccessorAndControl } from "./forms-B2-jwjTZ.js";
import { a as useFormStatus, c as Down, f as Loading, l as Empty$1, m as addIconDefinitions, n as useFormElement, o as useMergedCommonControlProps, r as useFormItemRegister, t as FORM_TOKEN, u as IxIcon } from "./form-CkhvCP4O.js";
import { i as useOverlayFocusMonitor, n as convertStringVNode, o as useSharedFocusMonitor, r as useGetKey$2 } from "./utils-BBjD-TyF.js";
import { i as ɵOverlay, n as overlayPlacementDef, r as overlayTriggerDef } from "./overlay-B-BC7-2L.js";
import { n as onResize, r as useResizeObserver, t as offResize } from "./resize-BuD9AbrA.js";
import { t as isNumber } from "./isNumber-BV9Yq1IR.js";
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_trimmedEndIndex.js
/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
* Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
* character of `string`.
*
* @private
* @param {string} string The string to inspect.
* @returns {number} Returns the index of the last non-whitespace character.
*/
function trimmedEndIndex(string) {
	var index = string.length;
	while (index-- && reWhitespace.test(string.charAt(index)));
	return index;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseTrim.js
/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;
/**
* The base implementation of `_.trim`.
*
* @private
* @param {string} string The string to trim.
* @returns {string} Returns the trimmed string.
*/
function baseTrim(string) {
	return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/toNumber.js
/** Used as references for various `Number` constants. */
var NAN = NaN;
/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;
/**
* Converts `value` to a number.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to process.
* @returns {number} Returns the number.
* @example
*
* _.toNumber(3.2);
* // => 3.2
*
* _.toNumber(Number.MIN_VALUE);
* // => 5e-324
*
* _.toNumber(Infinity);
* // => Infinity
*
* _.toNumber('3.2');
* // => 3.2
*/
function toNumber(value) {
	if (typeof value == "number") return value;
	if (isSymbol(value)) return NAN;
	if (isObject(value)) {
		var other = typeof value.valueOf == "function" ? value.valueOf() : value;
		value = isObject(other) ? other + "" : other;
	}
	if (typeof value != "string") return value === 0 ? value : +value;
	value = baseTrim(value);
	var isBinary = reIsBinary.test(value);
	return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/now.js
/**
* Gets the timestamp of the number of milliseconds that have elapsed since
* the Unix epoch (1 January 1970 00:00:00 UTC).
*
* @static
* @memberOf _
* @since 2.4.0
* @category Date
* @returns {number} Returns the timestamp.
* @example
*
* _.defer(function(stamp) {
*   console.log(_.now() - stamp);
* }, _.now());
* // => Logs the number of milliseconds it took for the deferred invocation.
*/
var now = function() {
	return root.Date.now();
};
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/debounce.js
/** Error message constants. */
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max;
var nativeMin = Math.min;
/**
* Creates a debounced function that delays invoking `func` until after `wait`
* milliseconds have elapsed since the last time the debounced function was
* invoked. The debounced function comes with a `cancel` method to cancel
* delayed `func` invocations and a `flush` method to immediately invoke them.
* Provide `options` to indicate whether `func` should be invoked on the
* leading and/or trailing edge of the `wait` timeout. The `func` is invoked
* with the last arguments provided to the debounced function. Subsequent
* calls to the debounced function return the result of the last `func`
* invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the debounced function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.debounce` and `_.throttle`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to debounce.
* @param {number} [wait=0] The number of milliseconds to delay.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=false]
*  Specify invoking on the leading edge of the timeout.
* @param {number} [options.maxWait]
*  The maximum time `func` is allowed to be delayed before it's invoked.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new debounced function.
* @example
*
* // Avoid costly calculations while the window size is in flux.
* jQuery(window).on('resize', _.debounce(calculateLayout, 150));
*
* // Invoke `sendMail` when clicked, debouncing subsequent calls.
* jQuery(element).on('click', _.debounce(sendMail, 300, {
*   'leading': true,
*   'trailing': false
* }));
*
* // Ensure `batchLog` is invoked once after 1 second of debounced calls.
* var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
* var source = new EventSource('/stream');
* jQuery(source).on('message', debounced);
*
* // Cancel the trailing debounced invocation.
* jQuery(window).on('popstate', debounced.cancel);
*/
function debounce(func, wait, options) {
	var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT$1);
	wait = toNumber(wait) || 0;
	if (isObject(options)) {
		leading = !!options.leading;
		maxing = "maxWait" in options;
		maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	function invokeFunc(time) {
		var args = lastArgs, thisArg = lastThis;
		lastArgs = lastThis = void 0;
		lastInvokeTime = time;
		result = func.apply(thisArg, args);
		return result;
	}
	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}
	function remainingWait(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
		return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
	}
	function shouldInvoke(time) {
		var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
		return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	}
	function timerExpired() {
		var time = now();
		if (shouldInvoke(time)) return trailingEdge(time);
		timerId = setTimeout(timerExpired, remainingWait(time));
	}
	function trailingEdge(time) {
		timerId = void 0;
		if (trailing && lastArgs) return invokeFunc(time);
		lastArgs = lastThis = void 0;
		return result;
	}
	function cancel() {
		if (timerId !== void 0) clearTimeout(timerId);
		lastInvokeTime = 0;
		lastArgs = lastCallTime = lastThis = timerId = void 0;
	}
	function flush() {
		return timerId === void 0 ? result : trailingEdge(now());
	}
	function debounced() {
		var time = now(), isInvoking = shouldInvoke(time);
		lastArgs = arguments;
		lastThis = this;
		lastCallTime = time;
		if (isInvoking) {
			if (timerId === void 0) return leadingEdge(lastCallTime);
			if (maxing) {
				clearTimeout(timerId);
				timerId = setTimeout(timerExpired, wait);
				return invokeFunc(lastCallTime);
			}
		}
		if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
		return result;
	}
	debounced.cancel = cancel;
	debounced.flush = flush;
	return debounced;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/throttle.js
/** Error message constants. */
var FUNC_ERROR_TEXT = "Expected a function";
/**
* Creates a throttled function that only invokes `func` at most once per
* every `wait` milliseconds. The throttled function comes with a `cancel`
* method to cancel delayed `func` invocations and a `flush` method to
* immediately invoke them. Provide `options` to indicate whether `func`
* should be invoked on the leading and/or trailing edge of the `wait`
* timeout. The `func` is invoked with the last arguments provided to the
* throttled function. Subsequent calls to the throttled function return the
* result of the last `func` invocation.
*
* **Note:** If `leading` and `trailing` options are `true`, `func` is
* invoked on the trailing edge of the timeout only if the throttled function
* is invoked more than once during the `wait` timeout.
*
* If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
* until to the next tick, similar to `setTimeout` with a timeout of `0`.
*
* See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
* for details over the differences between `_.throttle` and `_.debounce`.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Function
* @param {Function} func The function to throttle.
* @param {number} [wait=0] The number of milliseconds to throttle invocations to.
* @param {Object} [options={}] The options object.
* @param {boolean} [options.leading=true]
*  Specify invoking on the leading edge of the timeout.
* @param {boolean} [options.trailing=true]
*  Specify invoking on the trailing edge of the timeout.
* @returns {Function} Returns the new throttled function.
* @example
*
* // Avoid excessively updating the position while scrolling.
* jQuery(window).on('scroll', _.throttle(updatePosition, 100));
*
* // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
* var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
* jQuery(element).on('click', throttled);
*
* // Cancel the trailing throttled invocation.
* jQuery(window).on('popstate', throttled.cancel);
*/
function throttle(func, wait, options) {
	var leading = true, trailing = true;
	if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
	if (isObject(options)) {
		leading = "leading" in options ? !!options.leading : leading;
		trailing = "trailing" in options ? !!options.trailing : trailing;
	}
	return debounce(func, wait, {
		"leading": leading,
		"maxWait": wait,
		"trailing": trailing
	});
}
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/input/index.js
var Input$1 = /* @__PURE__ */ defineComponent({
	name: "ɵInput",
	inheritAttrs: false,
	props: {
		addonAfter: String,
		addonBefore: String,
		borderless: {
			type: Boolean,
			default: void 0
		},
		clearable: {
			type: Boolean,
			default: void 0
		},
		clearIcon: String,
		clearVisible: {
			type: Boolean,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: void 0
		},
		focused: {
			type: Boolean,
			default: void 0
		},
		prefix: String,
		size: String,
		status: String,
		suffix: String,
		onClear: Function
	},
	setup(props, { attrs, slots, expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-input`);
		const inputRef = ref();
		const getInputElement = () => inputRef.value;
		expose({ getInputElement });
		const classes = computed(() => {
			const { borderless, clearable, disabled, focused, size, status, addonAfter, addonBefore, prefix, suffix } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[prefixCls]: true,
				[globalHashId.value]: !!globalHashId.value,
				[`${prefixCls}-${size}`]: true,
				[`${prefixCls}-${status}`]: !!status,
				[`${prefixCls}-borderless`]: borderless,
				[`${prefixCls}-clearable`]: clearable,
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-focused`]: focused,
				[`${prefixCls}-with-addon-after`]: addonAfter || slots.addonAfter,
				[`${prefixCls}-with-addon-before`]: addonBefore || slots.addonBefore,
				[`${prefixCls}-with-prefix`]: prefix || slots.prefix,
				[`${prefixCls}-with-suffix`]: suffix || slots.suffix
			});
		});
		return () => {
			const { clearable, clearIcon, clearVisible, disabled, addonAfter, addonBefore, prefix, suffix, onClear } = props;
			const prefixCls = mergedPrefixCls.value;
			const addonBeforeNode = renderAddon(slots.addonBefore, addonBefore, `${prefixCls}-addon`, "__before-addon");
			const addonAfterNode = renderAddon(slots.addonAfter, addonAfter, `${prefixCls}-addon`, "__before-after");
			const prefixNode = renderIcon(slots.prefix, prefix, `${prefixCls}-prefix`, "__prefix");
			const suffixNode = renderIcon(slots.suffix, suffix, `${prefixCls}-suffix`, "__suffix");
			const clearNode = clearable && createVNode("span", {
				"key": "__clear",
				"class": `${prefixCls}-clear${clearVisible ? " visible" : ""}`,
				"onClick": onClear
			}, [slots.clearIcon ? slots.clearIcon() : createVNode(IxIcon, { "name": clearIcon }, null)]);
			if (!(addonBeforeNode || addonAfterNode || prefixNode || suffixNode || clearNode)) return createVNode("input", mergeProps({
				"ref": inputRef,
				"class": classes.value,
				"disabled": disabled,
				"aria-disabled": String(!!disabled),
				"aria-readonly": String(!!attrs.readonly)
			}, attrs), null);
			const { class: className, style, readonly, ...rest } = attrs;
			const classNames = normalizeClass([classes.value, className]);
			const inputNode = createVNode("input", mergeProps({
				"ref": inputRef,
				"class": `${prefixCls}-inner`,
				"disabled": disabled,
				"aria-disabled": String(!!disabled),
				"aria-readonly": String(!!readonly)
			}, rest), null);
			if (!(addonBeforeNode || addonAfterNode)) return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				prefixNode,
				inputNode,
				suffixNode,
				clearNode
			]);
			if (!(prefixNode || suffixNode || clearNode)) return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				addonBeforeNode,
				inputNode,
				addonAfterNode
			]);
			return createVNode("span", {
				"class": classNames,
				"style": style
			}, [
				addonBeforeNode,
				createVNode("span", {
					"key": "__wrapper",
					"class": `${prefixCls}-wrapper`
				}, [
					prefixNode,
					inputNode,
					suffixNode,
					clearNode
				]),
				addonAfterNode
			]);
		};
	}
});
function renderAddon(slot, prop, cls, key) {
	if (!(slot || prop)) return;
	return createVNode("span", {
		"key": key,
		"class": cls
	}, [slot ? slot() : prop]);
}
function renderIcon(slot, prop, cls, key) {
	if (!(slot || prop)) return;
	return createVNode("span", {
		"key": key,
		"class": cls
	}, [slot ? slot() : createVNode(IxIcon, { "name": prop }, null)]);
}
var ɵInput = Input$1;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/trigger/index.js
var ProxyNode = (_, { slots }) => {
	var _a;
	return getFirstValidNode((_a = slots.default) == null ? void 0 : _a.call(slots));
};
var triggerProps = {
	value: {
		type: null,
		default: void 0
	},
	raw: {
		type: Boolean,
		default: false
	},
	borderless: {
		type: Boolean,
		default: void 0
	},
	clearable: {
		type: Boolean,
		default: void 0
	},
	clearIcon: {
		type: String,
		default: "close-circle"
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	focused: {
		type: Boolean,
		default: void 0
	},
	monitorFocus: {
		type: Boolean,
		default: true
	},
	paddingless: {
		type: Boolean,
		default: false
	},
	placeholder: String,
	readonly: {
		type: Boolean,
		default: void 0
	},
	size: {
		type: String,
		default: "md"
	},
	status: String,
	suffix: String,
	suffixRotate: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	ariaControls: {
		type: String,
		default: void 0
	},
	onClear: [Array, Function],
	onFocus: [Array, Function],
	onBlur: [Array, Function]
};
var hiddenBoxStyle = {
	width: 0,
	height: 0,
	position: "absolute",
	overflow: "hidden",
	opacity: 0
};
var ɵTrigger = /* @__PURE__ */ defineComponent({
	props: triggerProps,
	setup(props, { expose, slots: _slots }) {
		const slots = _slots;
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-trigger`);
		const ariaLivePoliteValue = computed(() => isArray(props.value) ? props.value.join(",") : toString(props.value));
		const mergedClearable = computed(() => {
			return !props.disabled && !props.readonly && props.clearable && (isArray(props.value) ? !!props.value.length : !isNil(props.value));
		});
		const [focused, setFocused] = useState(false);
		const mergedFocused = computed(() => {
			var _a;
			return (_a = props.focused) != null ? _a : focused.value;
		});
		const focusMonitor = useSharedFocusMonitor();
		const triggerRef = ref();
		const focus = (options) => focusMonitor.focusVia(triggerRef.value, "program", options);
		const blur = () => focusMonitor.blurVia(triggerRef.value);
		expose({
			focus,
			blur
		});
		let monitorStop;
		const initMonitor = () => {
			monitorStop == null || monitorStop();
			if (props.monitorFocus) monitorStop = watch(focusMonitor.monitor(triggerRef.value, true), (evt) => {
				const { origin, event } = evt;
				if (event) {
					if (origin) {
						setFocused(true);
						callEmit(props.onFocus, event);
					} else {
						setFocused(false);
						callEmit(props.onBlur, event);
					}
				}
			});
		};
		onMounted(() => {
			watch(() => props.monitorFocus, initMonitor, { immediate: true });
		});
		onBeforeUnmount(() => {
			monitorStop == null || monitorStop();
			focusMonitor.stopMonitoring(triggerRef.value);
		});
		const classes = computed(() => {
			const prefixCls = mergedPrefixCls.value;
			const { size, status, borderless, paddingless, disabled, readonly, raw } = props;
			if (raw) return;
			return normalizeClass({
				[prefixCls]: true,
				[`${prefixCls}-${size}`]: true,
				[`${prefixCls}-${status}`]: !!status,
				[`${prefixCls}-borderless`]: borderless,
				[`${prefixCls}-paddingless`]: paddingless,
				[`${prefixCls}-with-suffix`]: slots.suffix || props.suffix || mergedClearable.value,
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-focused`]: mergedFocused.value,
				[`${prefixCls}-readonly`]: readonly
			});
		});
		const handleMouseDown = (evt) => {
			if (isFocusable(evt.target)) return;
			const { disabled, readonly } = props;
			if (disabled || readonly || props.focused) evt.preventDefault();
		};
		const handleClear = (evt) => {
			if (props.disabled) return;
			evt.stopPropagation();
			callEmit(props.onClear, evt);
		};
		const renderSuffix = () => {
			var _a, _b;
			if (!(slots.suffix || props.suffix)) return null;
			return createVNode("div", {
				"key": "__suffix",
				"class": `${mergedPrefixCls.value}-suffix`
			}, [(_b = (_a = slots.suffix) == null ? void 0 : _a.call(slots)) != null ? _b : props.suffix && createVNode(IxIcon, {
				"rotate": props.suffixRotate,
				"name": props.suffix
			}, null)]);
		};
		const renderClearIcon = () => {
			if (!mergedClearable.value) return null;
			return createVNode("span", {
				"key": "__clear",
				"class": `${mergedPrefixCls.value}-clear-icon`,
				"onClick": handleClear
			}, [slots.clearIcon ? slots.clearIcon() : props.clearIcon && createVNode(IxIcon, { "name": props.clearIcon }, null)]);
		};
		return () => {
			var _a, _b, _c;
			const { value, borderless, disabled, readonly, raw, size, status, suffix, suffixRotate, clearIcon, ariaControls } = props;
			const defaultSlotParams = {
				value,
				borderless: !!borderless,
				disabled: !!disabled,
				readonly: !!readonly,
				focused: mergedFocused.value,
				size,
				status,
				suffix,
				suffixRotate,
				clearable: !!mergedClearable.value,
				clearIcon: clearIcon || "close-circle",
				ariaControls: ariaControls || ""
			};
			const defaultSlotNodes = (_a = slots.default) == null ? void 0 : _a.call(slots, defaultSlotParams);
			if (raw && (defaultSlotNodes == null ? void 0 : defaultSlotNodes.length) === 1) {
				const node = defaultSlotNodes[0];
				if (isVNode(node) && ariaControls) node.props = {
					...node.props,
					"aria-controls": ariaControls
				};
				return createVNode(ProxyNode, { "ref": triggerRef }, { default: () => [node] });
			}
			const defaultSlotEmpty = isEmptyNode(defaultSlotNodes);
			return createVNode("div", {
				"ref": triggerRef,
				"class": classes.value,
				"tabindex": -1,
				"onMousedown": handleMouseDown,
				"aria-controls": ariaControls
			}, [
				props.focused && createVNode("span", {
					"style": hiddenBoxStyle,
					"aria-live": "polite"
				}, [ariaLivePoliteValue.value]),
				defaultSlotEmpty ? createVNode("span", { "class": `${mergedPrefixCls.value}-placeholder` }, [(_c = (_b = slots.placeholder) == null ? void 0 : _b.call(slots)) != null ? _c : props.placeholder]) : defaultSlotNodes,
				!raw && renderSuffix(),
				!raw && renderClearIcon()
			]);
		};
	}
});
var ɵTriggerPropsDefs = triggerProps;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/control-trigger/index.js
var controlTriggerToken = Symbol("controlTriggerToken");
var controlTriggerProps = {
	...ɵTriggerPropsDefs,
	autofocus: {
		type: Boolean,
		default: void 0
	},
	offset: Array,
	open: {
		type: Boolean,
		default: void 0
	},
	overlayClassName: {
		type: String,
		default: void 0
	},
	overlayContainer: {
		type: [
			String,
			HTMLElement,
			Function
		],
		default: void 0
	},
	overlayTabindex: {
		type: Number,
		default: void 0
	},
	overlayContainerFallback: String,
	overlayLazy: {
		type: Boolean,
		default: true
	},
	overlayMatchWidth: {
		type: [Boolean, String],
		default: void 0
	},
	"onUpdate:open": [Function, Array],
	onClick: [Function, Array],
	onKeydown: [Function, Array],
	onOverlayAfterLeave: [Function, Array]
};
var controlTrigglerOverlayProps = {
	visible: {
		type: Boolean,
		default: void 0
	},
	lazy: {
		type: Boolean,
		default: void 0
	},
	placement: overlayPlacementDef,
	trigger: overlayTriggerDef,
	"onUpdate:visible": [Function, Array],
	showArrow: {
		type: Boolean,
		default: void 0
	},
	tabindex: {
		type: Number,
		default: void 0
	},
	onAfterLeave: [Function, Array]
};
var defaultOffset$1 = [0, 4];
var ControlTriggerOverlay = /* @__PURE__ */ defineComponent({
	name: "IxControlTriggerOverlay",
	inheritAttrs: false,
	props: controlTrigglerOverlayProps,
	setup(props, { expose, slots, attrs }) {
		const common = useGlobalConfig("common");
		const { props: controlTriggerProps2, mergedPrefixCls, overlayFocused, bindOverlayMonitor, resetTriggerFocus } = inject(controlTriggerToken);
		const overlayRef = shallowRef();
		const popperElRef = computed(() => {
			var _a;
			return (_a = overlayRef.value) == null ? void 0 : _a.getPopperElement();
		});
		const updatePopper = () => {
			var _a;
			(_a = overlayRef.value) == null || _a.updatePopper();
		};
		expose({ updatePopper });
		const overlayProps = computed(() => {
			var _a, _b, _c, _d, _e;
			return {
				clickOutside: false,
				container: controlTriggerProps2.overlayContainer,
				containerFallback: (_a = controlTriggerProps2.overlayContainerFallback) != null ? _a : `.${mergedPrefixCls.value}-overlay-container`,
				disabled: controlTriggerProps2.disabled || controlTriggerProps2.readonly,
				lazy: (_b = props.lazy) != null ? _b : controlTriggerProps2.overlayLazy,
				offset: (_c = controlTriggerProps2.offset) != null ? _c : defaultOffset$1,
				placement: (_d = props.placement) != null ? _d : "bottomStart",
				showArrow: props.showArrow,
				transitionName: `${common.prefixCls}-slide-auto`,
				trigger: (_e = props.trigger) != null ? _e : "click",
				triggerId: attrs.id,
				visible: props.visible,
				"onUpdate:visible": props["onUpdate:visible"],
				onAfterLeave: props.onAfterLeave
			};
		});
		const overlayOpened = computed(() => {
			var _a;
			return (_a = props.visible) != null ? _a : false;
		});
		watch(overlayOpened, (opened) => {
			if (!opened && overlayFocused.value) resetTriggerFocus();
		});
		useEventListener(popperElRef, "mousedown", (evt) => {
			if (isFocusable(evt.target) || isFocusable(evt.currentTarget)) return;
			evt.preventDefault();
			resetTriggerFocus();
		});
		useEventListener(popperElRef, "wheel", () => {
			if (overlayFocused.value) resetTriggerFocus();
		});
		onMounted(() => {
			bindOverlayMonitor(overlayRef, overlayOpened);
		});
		return () => createVNode(ɵOverlay, mergeProps({
			"ref": overlayRef,
			"tabindex": props.tabindex
		}, overlayProps.value, attrs), slots);
	}
});
function useOverlayState(props, config, triggerRef, focused, triggerFocused) {
	const overlayRef = ref();
	const [overlayWidth, setOverlayWidth] = useState("");
	const overlayMatchWidth = computed(() => {
		var _a;
		return (_a = props.overlayMatchWidth) != null ? _a : config.overlayMatchWidth;
	});
	const overlayStyle = computed(() => {
		if (!overlayMatchWidth.value) return;
		return { [overlayMatchWidth.value === true ? "width" : "minWidth"]: overlayWidth.value };
	});
	const [_overlayOpened, setOverlayOpened] = useControlledProp(props, "open", false);
	const overlayOpened = computed(() => !props.disabled && _overlayOpened.value);
	const updateOverlay = (rect) => {
		var _a, _b;
		if (rect) {
			const { width } = rect;
			if (width > 0) {
				setOverlayWidth(convertCssPixel(width));
				overlayOpened.value && ((_a = overlayRef.value) == null || _a.updatePopper());
			}
		} else overlayOpened.value && ((_b = overlayRef.value) == null || _b.updatePopper());
	};
	onMounted(() => {
		var _a;
		if (props.autofocus) {
			(_a = triggerRef.value) == null || _a.focus();
			setOverlayOpened(true);
		}
		watchEffect(() => {
			if (overlayRef.value && overlayOpened.value) {
				const triggerEl = convertElement(triggerRef.value);
				updateOverlay(triggerEl.getBoundingClientRect());
			}
		});
		watch(overlayOpened, () => {
			var _a2;
			if (focused.value && !triggerFocused.value) (_a2 = triggerRef.value) == null || _a2.focus();
		});
		useResizeObserver(triggerRef, ({ contentRect }) => updateOverlay(contentRect));
	});
	return {
		overlayRef,
		overlayStyle,
		overlayMatchWidth,
		updateOverlay,
		overlayOpened,
		setOverlayOpened
	};
}
function useTriggerFocusState(triggerRef, triggerFocused) {
	const [focusTarget, setFocusTarget] = useState(null);
	const [selectionStart, setSelectionStart] = useState(null);
	const updateSelectionStart = () => {
		const element = focusTarget.value;
		setTimeout(() => {
			if (element.selectionDirection === "backward") setSelectionStart(element.selectionStart);
			else setSelectionStart(element.selectionEnd);
		});
	};
	let stops;
	const destroyListeners = () => stops == null ? void 0 : stops.forEach((stop) => stop == null ? void 0 : stop());
	watch(focusTarget, (target, oldTarget) => {
		if (target === oldTarget) return;
		if (!(target instanceof HTMLInputElement)) {
			setSelectionStart(null);
			destroyListeners();
			return;
		}
		updateSelectionStart();
		if (stops == null ? void 0 : stops.length) return;
		stops = [
			useEventListener(focusTarget, "select", updateSelectionStart),
			useEventListener(focusTarget, "input", updateSelectionStart),
			useEventListener(focusTarget, "mousedown", updateSelectionStart),
			useEventListener(focusTarget, "keydown", updateSelectionStart)
		];
	});
	const handleTriggerFocus = (evt) => {
		nextTick(() => {
			if (triggerFocused.value && evt.target instanceof HTMLElement) setFocusTarget(evt.target);
		});
	};
	const resetTriggerFocus = () => {
		var _a;
		const target = focusTarget.value;
		if (!target) {
			(_a = triggerRef.value) == null || _a.focus();
			return;
		}
		target.focus();
		if (target instanceof HTMLInputElement) target.setSelectionRange(selectionStart.value, selectionStart.value);
	};
	return {
		handleTriggerFocus,
		resetTriggerFocus
	};
}
var defaultTriggerProps = {
	borderless: false,
	clearIcon: "close-circle",
	size: "md",
	suffix: "down",
	overlayMatchWidth: false
};
var IxControlTrigger = /* @__PURE__ */ defineComponent({
	name: "IxControlTrigger",
	inheritAttrs: false,
	props: controlTriggerProps,
	setup(props, { attrs, expose, slots: _slots }) {
		const slots = _slots;
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-control-trigger`);
		const triggerRef = ref();
		const mergedControlProps = useMergedCommonControlProps(props, defaultTriggerProps);
		const onFocus = (evt) => {
			callEmit(props.onFocus, evt);
			handleTriggerFocus(evt);
		};
		const onBlur = (evt) => {
			setOverlayOpened(false);
			callEmit(props.onBlur, evt);
		};
		const { focused, triggerFocused, overlayFocused, focusVia, blurVia, bindOverlayMonitor, handleFocus, handleBlur } = useOverlayFocusMonitor(onFocus, onBlur);
		const { resetTriggerFocus, handleTriggerFocus } = useTriggerFocusState(triggerRef, triggerFocused);
		const { overlayOpened, overlayRef, overlayMatchWidth, overlayStyle, setOverlayOpened } = useOverlayState(props, defaultTriggerProps, triggerRef, focused, triggerFocused);
		const focus = () => focusVia(triggerRef.value);
		const blur = () => blurVia(triggerRef.value);
		expose({
			focus,
			blur
		});
		provide(controlTriggerToken, {
			props,
			mergedPrefixCls,
			overlayFocused,
			resetTriggerFocus,
			bindOverlayMonitor
		});
		const handleClear = (evt) => {
			callEmit(props.onClear, evt);
		};
		const handleClick = (evt) => {
			const target = evt.target;
			if (!props.disabled && !props.readonly && !(overlayOpened.value && target instanceof HTMLInputElement && !target.readOnly && !target.disabled)) setOverlayOpened(!overlayOpened.value);
			callEmit(props.onClick, evt);
		};
		const handleKeyDown = (evt) => {
			if (!overlayOpened.value && !props.disabled && !props.readonly && ![
				"Escape",
				"Backspace",
				"Tab"
			].includes(evt.code)) setOverlayOpened(true);
			else if (overlayOpened.value && evt.code === "Escape") setOverlayOpened(false);
			callEmit(props.onKeydown, evt);
		};
		const triggerProps = computed(() => {
			var _a;
			const { borderless, clearIcon, size, suffix } = mergedControlProps.value;
			return {
				value: props.value,
				size,
				status: props.status,
				borderless,
				clearIcon,
				clearable: props.clearable,
				disabled: props.disabled,
				readonly: props.readonly,
				focused: focused.value,
				opened: overlayOpened.value,
				placeholder: props.placeholder,
				suffix,
				suffixRotate: (_a = props.suffixRotate) != null ? _a : overlayOpened.value ? 180 : 0,
				onClear: handleClear,
				onFocus: handleFocus,
				onBlur: handleBlur,
				onClick: handleClick,
				onKeydown: handleKeyDown
			};
		});
		const overlayClasses = computed(() => {
			const { overlayClassName } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[`${prefixCls}-overlay`]: true,
				[`${prefixCls}-overlay-match-width`]: overlayMatchWidth.value === true,
				[overlayClassName || ""]: !!overlayClassName
			});
		});
		const renderTriggerContent = (params) => {
			var _a, _b;
			const triggerDefaultSlot = (_a = slots.trigger) != null ? _a : slots.default;
			return (_b = triggerDefaultSlot == null ? void 0 : triggerDefaultSlot({
				...params,
				opened: overlayOpened.value
			})) != null ? _b : [];
		};
		const renderTrigger = () => {
			const triggerSlots = {
				suffix: slots.suffix,
				clearIcon: slots.clearIcon,
				default: renderTriggerContent
			};
			return createVNode(ɵTrigger, mergeProps({
				"class": mergedPrefixCls.value,
				"ref": triggerRef
			}, triggerProps.value, attrs, { "raw": !!slots.trigger }), triggerSlots);
		};
		const renderContent = () => {
			var _a;
			return (_a = slots.overlay) == null ? void 0 : _a.call(slots, { opened: overlayOpened.value });
		};
		return () => createVNode(ControlTriggerOverlay, {
			"ref": overlayRef,
			"class": overlayClasses.value,
			"style": overlayStyle.value,
			"visible": overlayOpened.value,
			"lazy": props.overlayLazy,
			"tabindex": props.overlayTabindex,
			"trigger": "manual",
			"onAfterLeave": props.onOverlayAfterLeave
		}, {
			default: renderTrigger,
			content: renderContent
		});
	}
});
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/overflow/index.js
var overflowItemProps = {
	prefixCls: {
		type: String,
		required: true
	},
	display: {
		type: Boolean,
		default: true
	},
	itemKey: {
		type: [
			Number,
			String,
			Symbol
		],
		required: true
	},
	data: Object,
	onSizeChange: Function
};
var overflowProps = {
	maxLabel: {
		type: [Number, String],
		default: Number.MAX_SAFE_INTEGER
	},
	getKey: {
		type: Function,
		required: true
	},
	prefixCls: {
		type: String,
		required: true
	},
	dataSource: {
		type: Array,
		default: () => []
	}
};
var Item$1 = /* @__PURE__ */ defineComponent({
	name: "IxOverflowItem",
	props: overflowItemProps,
	setup(props, { slots }) {
		const itemElRef = ref();
		const handleResize = (entry) => {
			var _a;
			return callEmit(props.onSizeChange, entry, (_a = props.itemKey) != null ? _a : "");
		};
		useResizeObserver(itemElRef, handleResize);
		onUnmounted(() => {
			var _a;
			callEmit(props.onSizeChange, void 0, (_a = props.itemKey) != null ? _a : "");
		});
		return () => {
			var _a;
			return withDirectives(createVNode("div", {
				"class": `${props.prefixCls}-item`,
				"ref": itemElRef
			}, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[vShow, props.display]]);
		};
	}
});
var restNodeKey = "__IDUX_OVERFLOW_REST";
var suffixNodeKey = "__IDUX_OVERFLOW_SUFFIX";
var responsive = "responsive";
var Overflow = /* @__PURE__ */ defineComponent({
	name: "ɵOverflow",
	props: overflowProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-overflow`);
		const containerElRef = ref();
		const { containerWidth, setContainerWidth } = useContainerSize$1(containerElRef);
		const { itemsWidthMap, setItemWidth } = useItemSize();
		const restWidth = ref(0);
		const suffixWidth = ref(0);
		const displayCount = ref(props.dataSource.length);
		const isResponsive = computed(() => props.maxLabel === responsive);
		const restReady = ref(false);
		const showRest = computed(() => isResponsive.value || isNumber(props.maxLabel) && props.dataSource.length > props.maxLabel);
		const mergedData = computed(() => {
			if (!isResponsive.value) return props.dataSource.slice(0, props.maxLabel);
			return props.dataSource;
		});
		const restData = computed(() => props.dataSource.slice(displayCount.value));
		const displayRest = computed(() => restReady.value && !!restData.value.length);
		watch([
			itemsWidthMap,
			containerWidth,
			restWidth,
			suffixWidth,
			mergedData
		], () => {
			var _a;
			const len = props.dataSource.length;
			const lastIndex = len - 1;
			const data = (_a = props.dataSource) != null ? _a : [];
			let totalWidth = 0;
			if (!len) {
				displayCount.value = 0;
				return;
			}
			if (!isResponsive.value) {
				displayCount.value = Math.min(props.maxLabel, len);
				restReady.value = true;
				return;
			}
			const internalContainerWidth = containerWidth.value - suffixWidth.value;
			for (let i = 0; i < len; i++) {
				const getItemWidth = (index) => {
					var _a2;
					return (_a2 = itemsWidthMap.value.get(props.getKey(data[index]))) != null ? _a2 : 0;
				};
				const curItemWidth = getItemWidth(i);
				if (!curItemWidth) {
					displayCount.value = i + 1;
					break;
				}
				restReady.value = true;
				totalWidth += curItemWidth;
				if (i === lastIndex && totalWidth <= internalContainerWidth) {
					displayCount.value = i + 1;
					break;
				} else if (totalWidth + restWidth.value > internalContainerWidth) {
					displayCount.value = i;
					break;
				}
				displayCount.value = i + 1;
			}
		}, {
			deep: true,
			immediate: true,
			flush: "post"
		});
		useResizeObserver(containerElRef, setContainerWidth);
		const itemSharedProps = { prefixCls: mergedPrefixCls.value };
		const internalRenderItem = (item, index) => {
			var _a, _b;
			if (!slots.item) throwError("components/_private/overflow", "item slot must be provided");
			const nodeContent = (_b = (_a = slots.item) == null ? void 0 : _a.call(slots, item)) != null ? _b : "";
			const key = props.getKey(item);
			return createVNode(Item$1, mergeProps(itemSharedProps, {
				"key": key,
				"itemKey": key,
				"display": index < displayCount.value,
				"onSizeChange": (entry, key2) => setItemWidth(key2, entry)
			}), { default: () => [nodeContent] });
		};
		const internalRenderRest = (rest) => {
			var _a, _b;
			const nodeContent = (_b = (_a = slots.rest) == null ? void 0 : _a.call(slots, rest)) != null ? _b : `+ ${rest.length} ...`;
			return createVNode(Item$1, mergeProps(itemSharedProps, {
				"class": `${mergedPrefixCls.value}-rest`,
				"itemKey": restNodeKey,
				"display": displayRest.value,
				"onSizeChange": (entry) => {
					var _a2;
					return restWidth.value = (_a2 = entry == null ? void 0 : entry.contentRect.width) != null ? _a2 : 0;
				}
			}), { default: () => [nodeContent] });
		};
		const internalRenderSuffix = () => {
			var _a, _b;
			const nodeContent = (_b = (_a = slots.suffix) == null ? void 0 : _a.call(slots)) != null ? _b : null;
			return nodeContent ? createVNode(Item$1, mergeProps(itemSharedProps, {
				"class": `${mergedPrefixCls.value}-suffix`,
				"itemKey": suffixNodeKey,
				"onSizeChange": (entry) => {
					var _a2;
					return suffixWidth.value = (_a2 = entry == null ? void 0 : entry.contentRect.width) != null ? _a2 : 0;
				}
			}), { default: () => [nodeContent] }) : null;
		};
		return () => {
			return createVNode("div", {
				"class": `${mergedPrefixCls.value} ${props.prefixCls}-overflow ${globalHashId.value}`,
				"ref": containerElRef
			}, [
				mergedData.value.map(internalRenderItem),
				showRest.value && internalRenderRest(restData.value),
				internalRenderSuffix()
			]);
		};
	}
});
var useContainerSize$1 = (containerElRef) => {
	const containerWidth = ref(0);
	const _getContainerWidth = () => {
		const containerEl = containerElRef.value;
		if (!containerEl) return 0;
		const { width } = containerEl.getBoundingClientRect();
		const { paddingLeft, paddingRight } = getBoxSizingData(containerEl);
		return width - paddingLeft - paddingRight;
	};
	const setContainerWidth = () => {
		containerWidth.value = _getContainerWidth();
	};
	return {
		containerWidth,
		setContainerWidth
	};
};
var useItemSize = () => {
	const itemsWidthMap = ref(/* @__PURE__ */ new Map());
	const setItemWidth = (key, entry) => {
		if (!(entry == null ? void 0 : entry.target) && itemsWidthMap.value.get(key)) itemsWidthMap.value.delete(key);
		else if (entry == null ? void 0 : entry.contentRect.width) itemsWidthMap.value.set(key, entry.contentRect.width);
	};
	return {
		itemsWidthMap,
		setItemWidth
	};
};
var ɵOverflow = Overflow;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/selector/index.js
function useInputState(props, mergedSearchable) {
	const mirrorRef = ref();
	const inputRef = ref();
	const [inputValue, setInputValue] = useControlledProp(props, "input", "");
	const isComposing = ref(false);
	const focused = ref(false);
	const mergedFocused = computed(() => {
		var _a;
		return (_a = props.focused) != null ? _a : focused.value;
	});
	const handleFocus = (evt) => {
		focused.value = true;
		callEmit(props.onFocus, evt);
		nextTick(() => {
			var _a;
			(_a = inputRef.value) == null || _a.focus();
		});
	};
	const handleBlur = (evt) => {
		focused.value = false;
		callEmit(props.onBlur, evt);
	};
	const syncMirrorWidth = (evt) => {
		if (props.multiple) {
			const mirrorElement = mirrorRef.value;
			if (!mirrorElement) return;
			mirrorElement.textContent = evt ? evt.target.value : inputRef.value.value;
			inputRef.value.style.width = `${mirrorElement.offsetWidth}px`;
		}
	};
	const handleCompositionStart = (evt) => {
		isComposing.value = true;
		callEmit(props.onCompositionStart, evt);
	};
	const handleCompositionEnd = (evt) => {
		callEmit(props.onCompositionEnd, evt);
		if (isComposing.value) {
			isComposing.value = false;
			handleInput(evt, false);
		}
	};
	const handleEnterDown = (evt) => {
		if (evt.code === "Enter" && isComposing.value) {
			evt.stopImmediatePropagation();
			handleCompositionEnd(evt);
		}
	};
	const handleInput = (evt, emitInput = true) => {
		emitInput && callEmit(props.onInput, evt);
		const inputEnabled = props.allowInput || mergedSearchable.value;
		if (isComposing.value) {
			inputEnabled && syncMirrorWidth(evt);
			return;
		}
		if (inputEnabled) {
			const { value } = evt.target;
			if (value !== inputValue.value) {
				setInputValue(value);
				callEmit(props.onInputValueChange, value);
			}
			syncMirrorWidth();
		}
	};
	const clearInput = () => {
		const inputElement = inputRef.value;
		if (inputElement) inputElement.value = "";
		setInputValue("");
		callEmit(props.onInputValueChange, "");
		syncMirrorWidth();
	};
	onMounted(() => syncMirrorWidth());
	watch(mirrorRef, (val) => {
		if (val) syncMirrorWidth();
	});
	return {
		inputRef,
		mirrorRef,
		inputValue,
		isComposing,
		mergedFocused,
		handleCompositionStart,
		handleCompositionEnd,
		handleInput,
		clearInput,
		handleEnterDown,
		handleFocus,
		handleBlur
	};
}
var selectorToken = Symbol("selectorToken");
var Input = /* @__PURE__ */ defineComponent({ setup() {
	const { props, mergedPrefixCls, mergedSearchable, mergedFocused, mirrorRef, inputRef, inputValue, handleCompositionStart, handleCompositionEnd, handleInput, handleEnterDown } = inject(selectorToken);
	const innerInputValue = computed(() => props.allowInput || mergedSearchable.value ? inputValue.value : "");
	const inputReadonly = computed(() => props.readonly || !mergedFocused.value || !(props.allowInput || mergedSearchable.value));
	const innerStyle = computed(() => {
		return { opacity: inputReadonly.value && !innerInputValue.value ? 0 : void 0 };
	});
	return () => {
		const { autocomplete, autofocus, disabled, multiple } = props;
		const prefixCls = `${mergedPrefixCls.value}-input`;
		return createVNode("div", { "class": prefixCls }, [createVNode("input", {
			"ref": inputRef,
			"class": `${prefixCls}-inner`,
			"style": innerStyle.value,
			"autocomplete": autocomplete,
			"autofocus": autofocus,
			"disabled": disabled,
			"readonly": inputReadonly.value,
			"value": innerInputValue.value,
			"onCompositionstart": handleCompositionStart,
			"onCompositionend": handleCompositionEnd,
			"onKeydown": handleEnterDown,
			"onInput": handleInput
		}, null), multiple && createVNode("span", {
			"ref": mirrorRef,
			"class": `${prefixCls}-mirror`,
			"aria-hidden": true
		}, null)]);
	};
} });
var Item = (props, { slots }) => {
	const { disabled, prefixCls, removable, value, onRemove } = props;
	const classes = prefixCls + (disabled ? ` ${prefixCls}-disabled` : "");
	const handleClick = (evt) => {
		evt.stopPropagation();
		callEmit(onRemove, value);
	};
	return createVNode("div", { "class": classes }, [createVNode("span", { "class": `${prefixCls}-label` }, [slots.default()]), removable && createVNode("span", {
		"class": `${prefixCls}-remove`,
		"onClick": handleClick
	}, [createVNode(IxIcon, { "name": "close" }, null)])]);
};
var IxSelector = /* @__PURE__ */ defineComponent({
	name: "IxSelector",
	props: {
		input: String,
		allowInput: {
			type: [Boolean, String],
			default: void 0
		},
		autocomplete: {
			type: String,
			default: void 0
		},
		autofocus: {
			type: Boolean,
			default: void 0
		},
		borderless: {
			type: Boolean,
			default: void 0
		},
		clearable: {
			type: Boolean,
			default: void 0
		},
		clearIcon: {
			type: String,
			default: "close-circle"
		},
		dataSource: Array,
		disabled: {
			type: Boolean,
			default: void 0
		},
		focused: {
			type: Boolean,
			default: void 0
		},
		getKey: {
			type: [String, Function],
			default: "key"
		},
		labelKey: {
			type: String,
			default: void 0
		},
		maxLabel: {
			type: [Number, String],
			default: void 0
		},
		multiple: {
			type: Boolean,
			default: void 0
		},
		monitorFocus: {
			type: Boolean,
			default: true
		},
		opened: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: void 0
		},
		readonly: {
			type: Boolean,
			default: void 0
		},
		size: {
			type: String,
			default: "md"
		},
		status: String,
		suffix: {
			type: String,
			default: void 0
		},
		suffixRotate: {
			type: [
				Boolean,
				Number,
				String
			],
			default: void 0
		},
		"onUpdate:input": [Function, Array],
		onBlur: [Function, Array],
		onFocus: [Function, Array],
		onClear: [Function, Array],
		onCompositionStart: [Function, Array],
		onCompositionEnd: [Function, Array],
		onInput: [Function, Array],
		onInputValueChange: [Function, Array],
		onItemRemove: [Function, Array]
	},
	setup(props, { expose, slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId } = useThemeToken();
		const getKey = useGetKey$2(props, { getKey: "key" }, "selector");
		const value = computed(() => {
			var _a, _b;
			return (_b = (_a = props.dataSource) == null ? void 0 : _a.map((data) => getKey.value(data))) != null ? _b : [];
		});
		const triggerRef = ref();
		const mergedPrefixCls = computed(() => `${common.prefixCls}-selector`);
		const mergedClearable = computed(() => {
			return !props.disabled && !props.readonly && props.clearable && value.value.length > 0;
		});
		const mergedSearchable = computed(() => {
			return !props.disabled && !props.readonly && props.allowInput === "searchable";
		});
		const mergedSuffix = computed(() => {
			var _a;
			return (_a = props.suffix) != null ? _a : mergedSearchable.value && props.focused ? "search" : "down";
		});
		const mergedSuffixRotate = computed(() => {
			return !mergedSearchable.value ? props.suffixRotate : void 0;
		});
		const showPlaceholder = computed(() => {
			var _a;
			return !((_a = props.dataSource) == null ? void 0 : _a.length) && !isComposing.value && !inputValue.value;
		});
		const mergedLabelKey = computed(() => {
			var _a;
			return (_a = props.labelKey) != null ? _a : "label";
		});
		const { mirrorRef, inputRef, inputValue, isComposing, mergedFocused, handleCompositionStart, handleCompositionEnd, handleInput, clearInput, handleEnterDown, handleBlur, handleFocus } = useInputState(props, mergedSearchable);
		const focus = (options) => {
			var _a;
			if (inputRef.value) inputRef.value.focus(options);
			else (_a = triggerRef.value) == null || _a.focus(options);
		};
		const blur = () => {
			var _a;
			if (inputRef.value) inputRef.value.blur();
			else (_a = triggerRef.value) == null || _a.blur();
		};
		expose({
			focus,
			blur,
			clearInput
		});
		const classes = computed(() => {
			const { allowInput, borderless, multiple, opened, size, status } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[prefixCls]: true,
				[`${prefixCls}-${size}`]: !!size,
				[`${prefixCls}-${status}`]: !!status,
				[`${prefixCls}-allow-input`]: allowInput,
				[`${prefixCls}-borderless`]: borderless,
				[`${prefixCls}-clearable`]: mergedClearable.value,
				[`${prefixCls}-disabled`]: props.disabled,
				[`${prefixCls}-focused`]: mergedFocused.value,
				[`${prefixCls}-multiple`]: multiple,
				[`${prefixCls}-opened`]: opened,
				[`${prefixCls}-readonly`]: props.readonly,
				[`${prefixCls}-searchable`]: mergedSearchable.value,
				[`${prefixCls}-single`]: !multiple
			});
		});
		const handleClear = (evt) => {
			const { disabled, readonly } = props;
			if (disabled || readonly) return;
			evt.stopPropagation();
			callEmit(props.onClear, evt);
		};
		provide(selectorToken, {
			props,
			mergedPrefixCls,
			mergedSearchable,
			mirrorRef,
			inputRef,
			inputValue,
			isComposing,
			mergedFocused,
			handleCompositionStart,
			handleCompositionEnd,
			handleInput,
			handleEnterDown
		});
		return () => {
			const { borderless, clearable, clearIcon, multiple, disabled, focused, readonly, dataSource, maxLabel, size, status } = props;
			const prefixCls = mergedPrefixCls.value;
			const itemPrefixCls = `${prefixCls}-item`;
			const renderItem = (item) => {
				const { value: value2, rawData } = item;
				const key = getKey.value(item);
				const label = item[mergedLabelKey.value];
				const _disabled = disabled || item.disabled;
				const itemProps = {
					key,
					disabled: _disabled,
					prefixCls: itemPrefixCls,
					removable: multiple && !_disabled && !readonly,
					value: value2 != null ? value2 : key,
					label,
					onRemove: props.onItemRemove
				};
				const selectedItemSlot = slots.selectedItem;
				if (selectedItemSlot) return selectedItemSlot(itemProps);
				const slotOrName = slots.selectedLabel || slots.label || (item == null ? void 0 : item.customLabel) || (rawData == null ? void 0 : rawData.customLabel);
				const selectedLabelRender = isString(slotOrName) ? slots[slotOrName] : slotOrName;
				const labelNode = selectedLabelRender ? selectedLabelRender(rawData != null ? rawData : item) : label;
				return createVNode(Item, itemProps, { default: () => [labelNode] });
			};
			const children = [];
			if (showPlaceholder.value) {
				const placeholderNode = slots.placeholder ? slots.placeholder() : props.placeholder;
				children.push(createVNode("div", {
					"key": "__placeholder",
					"class": `${prefixCls}-placeholder`
				}, [placeholderNode]));
			}
			if (multiple) {
				const renderRest = (rest) => {
					const itemProps = {
						key: "__IDUX_SELECT_MAX_ITEM",
						prefixCls: itemPrefixCls,
						removable: false
					};
					const overflowedLabelSlot = slots.overflowedLabel || slots.maxLabel;
					const labelNode = overflowedLabelSlot ? overflowedLabelSlot(rest) : `+ ${rest.length} ...`;
					return createVNode(Item, itemProps, { default: () => [labelNode] });
				};
				const overflowSlot = {
					item: renderItem,
					rest: renderRest,
					suffix: () => createVNode(Input, null, null)
				};
				children.push(createVNode(ɵOverflow, {
					"prefixCls": prefixCls,
					"dataSource": dataSource,
					"getKey": getKey.value,
					"maxLabel": maxLabel
				}, overflowSlot));
			} else {
				if ((dataSource == null ? void 0 : dataSource.length) && !isComposing.value && !inputValue.value) dataSource.forEach((item) => children.push(renderItem(item)));
				children.push(createVNode(Input, null, null));
			}
			return createVNode(ɵTrigger, {
				"ref": triggerRef,
				"aria-label": "selector",
				"class": classes.value,
				"borderless": borderless,
				"clearable": clearable,
				"clearIcon": clearIcon,
				"disabled": disabled,
				"focused": focused,
				"monitorFocus": props.monitorFocus,
				"paddingless": multiple,
				"readonly": readonly,
				"size": size,
				"status": status,
				"suffix": mergedSuffix.value,
				"suffixRotate": mergedSuffixRotate.value,
				"value": value.value,
				"onClear": handleClear,
				"onFocus": handleFocus,
				"onBlur": handleBlur
			}, {
				default: () => [createVNode("div", { "class": `${prefixCls}-content` }, [children])],
				suffix: slots.suffix,
				clearIcon: slots.clearIcon
			});
		};
	}
});
var ɵLoading = /* @__PURE__ */ defineComponent({
	name: "ɵLoading",
	props: {
		strokeWidth: {
			type: Number,
			default: 4
		},
		radius: {
			type: Number,
			default: 14
		},
		duration: {
			type: Number,
			default: 2
		}
	},
	setup(props) {
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-loading`);
		return () => {
			const prefixCls = mergedPrefixCls.value;
			const { duration, strokeWidth, radius } = props;
			const animationDur = `${duration}s`;
			const viewBoxSize = radius * 2;
			const circleLength = Math.PI * 2 * radius;
			const fstArchLength = .23 * circleLength;
			const sndArchLength = .11 * circleLength;
			return createVNode("div", {
				"class": prefixCls,
				"role": "img",
				"aria-label": "loading"
			}, [createVNode("svg", {
				"class": `${prefixCls}-icon`,
				"viewBox": `0 0 ${viewBoxSize} ${viewBoxSize}`
			}, [createVNode("g", {
				"id": "loading-48",
				"fill": "none",
				"fill-rule": "evenodd",
				"transform": `rotate(-90,${radius},${radius})`
			}, [
				createVNode("circle", {
					"class": `${prefixCls}-snd-arch`,
					"cx": radius,
					"cy": radius,
					"r": radius - strokeWidth / 2,
					"stroke-width": strokeWidth,
					"stroke-linecap": "round",
					"stroke-dasharray": `${sndArchLength} ${circleLength + 1}`
				}, [createVNode("animate", {
					"attributeName": "stroke-dashoffset",
					"values": `${sndArchLength};${sndArchLength};${-circleLength}`,
					"dur": animationDur,
					"begin": "0s",
					"repeatCount": "indefinite",
					"calcMode": "spline",
					"keyTimes": "0;0.3333;1",
					"keySplines": "0 0 0 0;0.42 0 0.58 1;"
				}, null)]),
				createVNode("circle", {
					"class": `${prefixCls}-fst-arch`,
					"cx": radius,
					"cy": radius,
					"r": radius - strokeWidth / 2,
					"stroke-width": strokeWidth,
					"stroke-linecap": "round",
					"stroke-dasharray": `${fstArchLength} ${circleLength + 1}`
				}, [createVNode("animate", {
					"attributeName": "stroke-dashoffset",
					"values": `${fstArchLength};${fstArchLength};${-circleLength};${-circleLength}`,
					"dur": animationDur,
					"begin": "0s",
					"repeatCount": "indefinite",
					"calcMode": "spline",
					"keyTimes": "0;0.3333;0.7;1",
					"keySplines": "0 0 0 0;0.42 0 0.58 1;0 0 0 0"
				}, null)]),
				createVNode("circle", {
					"class": `${prefixCls}-bg-circle`,
					"cx": radius,
					"cy": radius,
					"r": radius - strokeWidth / 2,
					"stroke-width": strokeWidth,
					"stroke-linecap": "round",
					"stroke-dasharray": `${circleLength} ${circleLength + 1}`
				}, [createVNode("animate", {
					"attributeName": "stroke-dashoffset",
					"values": `${circleLength};0;${-circleLength};${-circleLength}`,
					"dur": animationDur,
					"begin": "0s",
					"repeatCount": "indefinite",
					"calcMode": "spline",
					"keyTimes": "0;0.3333;0.666;1",
					"keySplines": "0.6 0 0.4 1;0.6 0 0.4 1;0,0,0,0"
				}, null)])
			])])]);
		};
	}
});
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/spin/index.js
var spinProps = {
	strokeWidth: Number,
	radius: Number,
	duration: Number,
	spinning: {
		type: Boolean,
		default: true
	},
	rotate: {
		type: Boolean,
		default: true
	},
	icon: String,
	tip: String,
	tipAlign: String,
	size: String
};
function getDefaultThemeTokens$2(tokens, algorithms) {
	const { getBaseColors, getGreyColors } = algorithms;
	const { colorContainerBg, colorPrimary, fontSizeSm, fontSizeMd, fontSizeLg } = tokens;
	return {
		tipColor: colorPrimary,
		iconColor: colorPrimary,
		fontSizeSm,
		fontSizeMd,
		fontSizeLg,
		iconSizeSm: 20,
		iconSizeMd: 28,
		iconSizeLg: 48,
		bgCircleStroke: colorPrimary,
		fstArchStroke: getBaseColors().turquoise,
		sndArchStroke: getGreyColors().l20,
		maskBgColor: getAlphaColor(colorContainerBg, .7)
	};
}
var getThemeTokens$2 = (tokens, _, algorithms) => {
	return getDefaultThemeTokens$2(tokens, algorithms);
};
var defaultStrokeWidth = {
	sm: 3,
	md: 3,
	lg: 4
};
var defaultRadius = {
	sm: 14,
	md: 14,
	lg: 24
};
var Spin = /* @__PURE__ */ defineComponent({
	name: "IxSpin",
	props: spinProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("spin");
		registerToken(getThemeTokens$2);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-spin`);
		const spinConfig = useGlobalConfig("spin");
		const { size, strokeWidth, radius } = useSize(props, spinConfig);
		const hasDefaultSlot = computed(() => hasSlot(slots));
		const mergedIcon = computed(() => {
			var _a;
			return (_a = props.icon) != null ? _a : spinConfig.icon;
		});
		const mergedTip = computed(() => {
			var _a;
			return (_a = props.tip) != null ? _a : spinConfig.tip;
		});
		const { spinnerClassName, containerClassName } = useClasses(props, spinConfig, size, hasDefaultSlot, mergedPrefixCls);
		const renderContent = () => {
			if (!slots.default) return null;
			return createVNode("div", { "class": containerClassName.value }, [slots.default()]);
		};
		const renderTip = () => {
			if (!mergedTip.value) return null;
			return createVNode("div", { "class": `${mergedPrefixCls.value}-spinner-tip` }, [mergedTip.value]);
		};
		const renderIcon = () => {
			const iconCls = `${mergedPrefixCls.value}-spinner-icon`;
			if (slots.icon) return createVNode("div", { "class": iconCls }, [slots.icon()]);
			if (mergedIcon.value) {
				const iconStyle = normalizeStyle(props.duration && { animationDuration: `${props.duration}s` });
				return createVNode("div", {
					"class": [iconCls, props.rotate && `${iconCls}--rotate`],
					"style": iconStyle
				}, [createVNode(IxIcon, { "name": mergedIcon.value }, null)]);
			}
			return createVNode("div", { "class": iconCls }, [createVNode(ɵLoading, {
				"strokeWidth": strokeWidth.value,
				"radius": radius.value,
				"duration": props.duration
			}, null)]);
		};
		const renderSpinner = () => {
			if (!props.spinning) return null;
			return createVNode("div", { "class": spinnerClassName.value }, [renderIcon(), renderTip()]);
		};
		return () => createVNode("div", { "class": [
			mergedPrefixCls.value,
			globalHashId.value,
			hashId.value
		] }, [createVNode(Transition, {
			"name": `${common.prefixCls}-fade`,
			"appear": true
		}, { default: () => [renderSpinner()] }), renderContent()]);
	}
});
var useSize = (props, config) => {
	const size = computed(() => {
		var _a;
		return (_a = props.size) != null ? _a : config.size;
	});
	return {
		size,
		strokeWidth: computed(() => {
			var _a, _b, _c;
			return (_c = (_b = props.strokeWidth) != null ? _b : (_a = config.strokeWidth) == null ? void 0 : _a[size.value]) != null ? _c : defaultStrokeWidth[size.value];
		}),
		radius: computed(() => {
			var _a, _b, _c;
			return (_c = (_b = props.radius) != null ? _b : (_a = config.radius) == null ? void 0 : _a[size.value]) != null ? _c : defaultRadius[size.value];
		})
	};
};
var useClasses = (props, config, size, hasDefaultSlot, mergedPrefixCls) => {
	const prefixCls = mergedPrefixCls.value;
	return {
		spinnerClassName: computed(() => {
			var _a;
			const tipAlign = (_a = props.tipAlign) != null ? _a : config.tipAlign;
			return normalizeClass([
				`${prefixCls}-spinner`,
				`${prefixCls}-spinner-tip-${tipAlign}`,
				`${prefixCls}-spinner-${size.value}`
			]);
		}),
		containerClassName: computed(() => {
			if (!hasDefaultSlot.value) return [];
			return normalizeClass([`${prefixCls}-container`, props.spinning ? `${prefixCls}-container-blur` : ""]);
		})
	};
};
var IxSpin = Spin;
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/combine.js
/** Create a new combined function that will call all the provided functions */
function combine() {
	for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) fns[_key] = arguments[_key];
	return function cleanup() {
		fns.forEach(function(fn) {
			return fn();
		});
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/element/disable-native-drag-preview.js
var tinyTransparentImage = function() {
	if (typeof window === "undefined") return null;
	var img = new Image();
	img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	return img;
}();
function disableNativeDragPreview(_ref) {
	var nativeSetDragImage = _ref.nativeSetDragImage;
	if (nativeSetDragImage && tinyTransparentImage) nativeSetDragImage(tinyTransparentImage, 0, 0);
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/once.js
/** Provide a function that you only ever want to be called a single time */
function once(fn) {
	var cache = null;
	return function wrapped() {
		if (!cache) {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			cache = { result: fn.apply(this, args) };
		}
		return cache.result;
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/android.js
var isAndroid = once(function isAndroid() {
	return navigator.userAgent.toLocaleLowerCase().includes("android");
});
var androidFallbackText = "pdnd:android-fallback";
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/is-safari.js
/**
* Returns `true` if a `Safari` browser.
* Returns `true` if the browser is running on iOS (they are all Safari).
*
* Use `isSafariOnIOS` if you want to check if something is Safari + iOS
* */
var isSafari = once(function isSafari() {
	var userAgent = navigator.userAgent;
	return userAgent.includes("AppleWebKit") && !userAgent.includes("Chrome");
});
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/is-safari-on-ios.js
/**
* **Notes**
*
* All browsers on iOS (Safari, Chrome, Firefox) use the same rendering engine (Safari / Webkit).
*
* → https://developer.apple.com/app-store/review/guidelines/ (see 2.5.6)
*
* There is some ongoing change in this space, and we might see some new browser
* engines soon on iOS (at least in Europe)
*
* → https://developer.apple.com/support/alternative-browser-engines/
**/
/**
* Returns `true` if browser is Safari (WebKit) on iOS.
*/
var isSafariOnIOS = once(function isSafariOnIOS() {
	return isSafari() && "ontouchend" in document;
});
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/element/custom-native-drag-preview/center-under-pointer.js
var centerUnderPointer = function centerUnderPointer(_ref) {
	var rect = _ref.container.getBoundingClientRect();
	return {
		x: rect.width / 2,
		y: rect.height / 2
	};
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/element/custom-native-drag-preview/pointer-outside-of-preview.js
/** Any valid CSS string value
* @example `calc(var(--grid) * 2)
*/
/**
* Position the native drag preview **in front** of the users pointer.
*
* **Distance**
*
* If the total width of your preview (including the offset applied by this function)
* exceeds `280px` then the drag preview will have more opacity applied on Windows.
*
* https://atlassian.design/components/pragmatic-drag-and-drop/web-platform-design-constraints
*
* **Direction**
*
* This function will position the drag preview on the _right hand side for left to right (`ltr`) interfaces_, and on the _left hand side for right to left (`rtl`) languages_.
*
* The direction will be calculated based on the direction (`dir`) being applied to the `container`
* element (which will be a child of the `body` element).
*
* **iOS, iPadOS and Android**
*
* The drag preview will be centered under the users pointer rather than
* pushed away on iOS due to platform limitations.
*/
function pointerOutsideOfPreview(point) {
	return function getOffset(_ref) {
		var container = _ref.container;
		/**
		* **Approach: transparent borders.**
		*
		* The only reliable cross browser technique found to push a
		* drag preview away from the cursor is to use transparent borders on the container.
		*
		* **🙅📱 Not pushing the preview away on touch devices**
		*
		* _On iOS_
		*
		* Safari will set the transparent border color to be black
		*
		* `iOS@18.4.1` on May 7th 2025:
		* - If you set the background color on the `container` the border color will be that
		* - Setting a transparent background color on the `container` still results in a
		*   black border
		* - The `<body>` text or background color does not change the black border color
		*
		* While dragging, the drag preview will shift under the center of the users pointer.
		* So if you start at {x: 0, y: 0} (top left), almost immediately the preview will move
		* to be under the middle of the users pointer.
		*
		* _On Android_
		*
		* Chrome will put the center of the drag preview under the users pointer immediately.
		*
		* Tested on `Chrome@137` on `Android 14` on June 20th 2025
		*
		* _What we do_
		*
		* We don't add the transparent border
		*
		* - Avoid the black color on iOS
		* - It isn't needed on Android anyway as the preview will be under the center
		*   of the users pointer
		*
		* We put the center of the drag preview under the users pointer
		*
		* - Avoids the drag preview quickly moving from a top corner to be centered under
		*   the users pointer on iOS
		* - It will be under the center on Android no matter what we do
		*
		* We previously had a isTouchDevice() check, but it felt safer for now
		* to have a more targeted check, as these are the devices that have been
		* tested on.
		*/
		if (isSafariOnIOS() || isAndroid()) return centerUnderPointer({ container });
		Object.assign(container.style, {
			borderInlineStart: "".concat(point.x, " solid transparent"),
			borderTop: "".concat(point.y, " solid transparent")
		});
		if (window.getComputedStyle(container).direction === "rtl") return {
			x: container.getBoundingClientRect().width,
			y: 0
		};
		return {
			x: 0,
			y: 0
		};
	};
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, e) {
	if ("object" != _typeof(t) || !t) return t;
	var r;
	if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
		var i = r.call(t, e || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === e ? String : Number)(t);
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray$3(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray$3(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
	}
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest();
}
// ../../node_modules/.pnpm/bind-event-listener@3.0.0/node_modules/bind-event-listener/dist/bind.js
var require_bind = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bind = void 0;
	function bind(target, _a) {
		var type = _a.type, listener = _a.listener, options = _a.options;
		target.addEventListener(type, listener, options);
		return function unbind() {
			target.removeEventListener(type, listener, options);
		};
	}
	exports.bind = bind;
}));
// ../../node_modules/.pnpm/bind-event-listener@3.0.0/node_modules/bind-event-listener/dist/bind-all.js
var require_bind_all = /* @__PURE__ */ __commonJSMin(((exports, module, this$1) => {
	var __assign = this$1 && this$1.__assign || function() {
		__assign = Object.assign || function(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bindAll = void 0;
	var bind_1 = require_bind();
	function toOptions(value) {
		if (typeof value === "undefined") return;
		if (typeof value === "boolean") return { capture: value };
		return value;
	}
	function getBinding(original, sharedOptions) {
		if (sharedOptions == null) return original;
		return __assign(__assign({}, original), { options: __assign(__assign({}, toOptions(sharedOptions)), toOptions(original.options)) });
	}
	function bindAll(target, bindings, sharedOptions) {
		var unbinds = bindings.map(function(original) {
			var binding = getBinding(original, sharedOptions);
			return (0, bind_1.bind)(target, binding);
		});
		return function unbindAll() {
			unbinds.forEach(function(unbind) {
				return unbind();
			});
		};
	}
	exports.bindAll = bindAll;
}));
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/honey-pot-data-attribute.js
var import_dist = (/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bindAll = exports.bind = void 0;
	var bind_1 = require_bind();
	Object.defineProperty(exports, "bind", {
		enumerable: true,
		get: function() {
			return bind_1.bind;
		}
	});
	var bind_all_1 = require_bind_all();
	Object.defineProperty(exports, "bindAll", {
		enumerable: true,
		get: function() {
			return bind_all_1.bindAll;
		}
	});
})))();
var honeyPotDataAttribute = "data-pdnd-honey-pot";
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/is-honey-pot-element.js
function isHoneyPotElement(target) {
	return target instanceof Element && target.hasAttribute("data-pdnd-honey-pot");
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/get-element-from-point-without-honey-pot.js
function getElementFromPointWithoutHoneypot(client) {
	var _document$elementsFro2 = _slicedToArray(document.elementsFromPoint(client.x, client.y), 2), top = _document$elementsFro2[0], second = _document$elementsFro2[1];
	if (!top) return null;
	if (isHoneyPotElement(top)) return second !== null && second !== void 0 ? second : null;
	return top;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/max-z-index.js
var maxZIndex = 2147483647;
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/popover-reset-styles.js
/**
* Resets user agent styles for `[popover]` elements.
*
* Browsers apply these defaults to popovers (per the WHATWG HTML spec rendering section):
* - `inset: 0` + `margin: auto` → centers the popover in the viewport
* - `border: solid` → visible border
* - `padding: 0.25em` → internal spacing
* - `overflow: auto` → scrollbars when content overflows
* - `color: CanvasText` + `background-color: Canvas` → system theme colors
*
* This object neutralizes those defaults so the popover behaves like a plain
* positioned element. `width` and `height` (UA default: `fit-content`) are not
* reset here because consumers set their own dimensions.
*/
var popoverResetUserAgentStyles = {
	inset: "unset",
	border: "none",
	padding: 0,
	margin: 0,
	overflow: "visible",
	color: "inherit",
	background: "transparent"
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/supports-popover.js
/**
* Returns `true` if the browser supports the Popover API (top-layer).
*
* When supported, elements with `popover="manual"` can be promoted to the
* browser's top layer via `element.showPopover()`, which is more reliable
* than `z-index` for ensuring an element renders above everything else.
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
*/
var supportsPopover = once(function supportsPopover() {
	return typeof HTMLElement !== "undefined" && typeof HTMLElement.prototype.showPopover === "function";
});
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/honey-pot-fix/make-honey-pot-fix.js
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var honeyPotSize = 2;
var halfHoneyPotSize = honeyPotSize / 2;
/**
* `clientX` and `clientY` can be in sub pixels (eg `2.332`)
* However, browser hitbox testing is commonly do to the closest pixel.
*
* → https://issues.chromium.org/issues/40940531
*
* To be sure that the honey pot will be over the `client` position,
* we `.floor()` `clientX` and`clientY` and then make it `2px` in size.
**/
function floorToClosestPixel(point) {
	return {
		x: Math.floor(point.x),
		y: Math.floor(point.y)
	};
}
/**
* We want to make sure the honey pot sits around the users position.
* This seemed to be the most resilient while testing.
*/
function pullBackByHalfHoneyPotSize(point) {
	return {
		x: point.x - halfHoneyPotSize,
		y: point.y - halfHoneyPotSize
	};
}
/**
* Prevent the honey pot from changing the window size.
* This is super unlikely to occur, but just being safe.
*/
function preventGoingBackwardsOffScreen(point) {
	return {
		x: Math.max(point.x, 0),
		y: Math.max(point.y, 0)
	};
}
/**
* Prevent the honey pot from changing the window size.
* This is super unlikely to occur, but just being safe.
*/
function preventGoingForwardsOffScreen(point) {
	return {
		x: Math.min(point.x, window.innerWidth - honeyPotSize),
		y: Math.min(point.y, window.innerHeight - honeyPotSize)
	};
}
/**
* Create a `2x2` `DOMRect` around the `client` position
*/
function getHoneyPotRectFor(_ref) {
	var client = _ref.client;
	var point = preventGoingForwardsOffScreen(preventGoingBackwardsOffScreen(pullBackByHalfHoneyPotSize(floorToClosestPixel(client))));
	return DOMRect.fromRect({
		x: point.x,
		y: point.y,
		width: honeyPotSize,
		height: honeyPotSize
	});
}
function getRectStyles(_ref2) {
	var clientRect = _ref2.clientRect;
	return {
		left: "".concat(clientRect.left, "px"),
		top: "".concat(clientRect.top, "px"),
		width: "".concat(clientRect.width, "px"),
		height: "".concat(clientRect.height, "px")
	};
}
function isWithin$1(_ref3) {
	var client = _ref3.client, clientRect = _ref3.clientRect;
	return client.x >= clientRect.x && client.x <= clientRect.x + clientRect.width && client.y >= clientRect.y && client.y <= clientRect.y + clientRect.height;
}
/**
* The honey pot fix is designed to get around a painful bug in all browsers.
*
* [Overview](https://www.youtube.com/watch?v=udE9qbFTeQg)
*
* **Background**
*
* When a drag starts, browsers incorrectly think that the users pointer is
* still depressed where the drag started. Any element that goes under this position
* will be entered into, causing `"mouseenter"` events and `":hover"` styles to be applied.
*
* _This is a violation of the spec_
*
* > "From the moment that the user agent is to initiate the drag-and-drop operation,
* > until the end 	of the drag-and-drop operation, device input events
* > (e.g. mouse and keyboard events) must be suppressed."
* >
* > - https://html.spec.whatwg.org/multipage/dnd.html#drag-and-drop-processing-model
*
* _Some impacts_
*
* - `":hover"` styles being applied where they shouldn't (looks messy)
* - components such as tooltips responding to `"mouseenter"` can show during a drag,
*   and on an element the user isn't even over
*
* Bug: https://issues.chromium.org/issues/41129937
*
* **Honey pot fix**
*
* 1. Create an element where the browser thinks the depressed pointer is
*    to absorb the incorrect pointer events
* 2. Remove that element when it is no longer needed
*/
function mountHoneyPot(_ref4) {
	var initial = _ref4.initial;
	var element = document.createElement("div");
	element.setAttribute(honeyPotDataAttribute, "true");
	if (supportsPopover()) element.setAttribute("popover", "manual");
	var clientRect = getHoneyPotRectFor({ client: initial });
	Object.assign(element.style, _objectSpread$7(_objectSpread$7({ position: "fixed" }, supportsPopover() ? popoverResetUserAgentStyles : { zIndex: maxZIndex }), {}, {
		backgroundColor: "transparent",
		padding: 0,
		margin: 0,
		boxSizing: "border-box",
		pointerEvents: "auto"
	}, getRectStyles({ clientRect })));
	document.body.appendChild(element);
	if (supportsPopover()) element.showPopover();
	/**
	*  🦊 In firefox we can get `"pointermove"` events after the drag
	* has started, which is a spec violation.
	* The final `"pointermove"` will reveal where the "depressed" position
	* is for our honey pot fix.
	*/
	var unbindPointerMove = (0, import_dist.bind)(window, {
		type: "pointermove",
		listener: function listener(event) {
			clientRect = getHoneyPotRectFor({ client: {
				x: event.clientX,
				y: event.clientY
			} });
			Object.assign(element.style, getRectStyles({ clientRect }));
		},
		options: { capture: true }
	});
	return function finish(_ref5) {
		var current = _ref5.current;
		unbindPointerMove();
		if (isWithin$1({
			client: current,
			clientRect
		})) {
			element.remove();
			return;
		}
		function cleanup() {
			unbindPostDragEvents();
			element.remove();
		}
		var unbindPostDragEvents = (0, import_dist.bindAll)(window, [
			{
				type: "pointerdown",
				listener: cleanup
			},
			{
				type: "pointermove",
				listener: cleanup
			},
			{
				type: "focusin",
				listener: cleanup
			},
			{
				type: "focusout",
				listener: cleanup
			},
			{
				type: "dragstart",
				listener: cleanup
			},
			{
				type: "dragenter",
				listener: cleanup
			},
			{
				type: "dragover",
				listener: cleanup
			}
		], { capture: true });
	};
}
function makeHoneyPotFix() {
	var latestPointerMove = null;
	function bindEvents() {
		latestPointerMove = null;
		return (0, import_dist.bind)(window, {
			type: "pointermove",
			listener: function listener(event) {
				latestPointerMove = {
					x: event.clientX,
					y: event.clientY
				};
			},
			options: { capture: true }
		});
	}
	function getOnPostDispatch() {
		var finish = null;
		return function onPostEvent(_ref6) {
			var eventName = _ref6.eventName, payload = _ref6.payload;
			if (eventName === "onDragStart") {
				var input = payload.location.initial.input;
				finish = mountHoneyPot({ initial: latestPointerMove !== null && latestPointerMove !== void 0 ? latestPointerMove : {
					x: input.clientX,
					y: input.clientY
				} });
			}
			if (eventName === "onDrop") {
				var _finish;
				var _input = payload.location.current.input;
				(_finish = finish) === null || _finish === void 0 || _finish({ current: {
					x: _input.clientX,
					y: _input.clientY
				} });
				finish = null;
				latestPointerMove = null;
			}
		};
	}
	return {
		bindEvents,
		getOnPostDispatch
	};
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
	if (Array.isArray(r)) return _arrayLikeToArray$3(r);
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
	if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
	return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray$3(r) || _nonIterableSpread();
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/is-firefox.js
/**
* Returns `true` if a `Firefox` browser
* */
var isFirefox = once(function isFirefox() {
	return navigator.userAgent.includes("Firefox");
});
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/count-events-for-safari.js
var symbols = {
	isLeavingWindow: Symbol("leaving"),
	isEnteringWindow: Symbol("entering")
};
function isLeavingWindowInSafari(_ref2) {
	var dragLeave = _ref2.dragLeave;
	if (!isSafari()) return false;
	return dragLeave.hasOwnProperty(symbols.isLeavingWindow);
}
(function fixSafari() {
	if (typeof window === "undefined") return;
	if (!isSafari()) return;
	function getInitialState() {
		return {
			enterCount: 0,
			isOverWindow: false
		};
	}
	var state = getInitialState();
	function resetState() {
		state = getInitialState();
	}
	(0, import_dist.bindAll)(window, [
		{
			type: "dragstart",
			listener: function listener() {
				state.enterCount = 0;
				state.isOverWindow = true;
			}
		},
		{
			type: "drop",
			listener: resetState
		},
		{
			type: "dragend",
			listener: resetState
		},
		{
			type: "dragenter",
			listener: function listener(event) {
				if (!state.isOverWindow && state.enterCount === 0) event[symbols.isEnteringWindow] = true;
				state.isOverWindow = true;
				state.enterCount++;
			}
		},
		{
			type: "dragleave",
			listener: function listener(event) {
				state.enterCount--;
				if (state.isOverWindow && state.enterCount === 0) {
					event[symbols.isLeavingWindow] = true;
					state.isOverWindow = false;
				}
			}
		}
	], { capture: true });
})();
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/is-from-another-window.js
/**
* Does the `EventTarget` look like a `Node` based on "duck typing".
*
* Helpful when the `Node` might be outside of the current document
* so we cannot to an `target instanceof Node` check.
*/
function isNodeLike(target) {
	return "nodeName" in target;
}
/**
* Is an `EventTarget` a `Node` from another `window`?
*/
function isFromAnotherWindow(eventTarget) {
	return isNodeLike(eventTarget) && eventTarget.ownerDocument !== document;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/changing-window/is-leaving-window.js
function isLeavingWindow(_ref) {
	var dragLeave = _ref.dragLeave;
	var type = dragLeave.type, relatedTarget = dragLeave.relatedTarget;
	if (type !== "dragleave") return false;
	if (isSafari()) return isLeavingWindowInSafari({ dragLeave });
	if (relatedTarget == null) return true;
	/**
	* 🦊 Exception: `iframe` in Firefox (`125.0`)
	*
	* Case 1: parent `window` → child `iframe`
	* `dragLeave.relatedTarget` is element _inside_ the child `iframe`
	* (foreign element)
	*
	* Case 2: child `iframe` → parent `window`
	* `dragLeave.relatedTarget` is the `iframe` in the parent `window`
	* (foreign element)
	*/
	if (isFirefox()) return isFromAnotherWindow(relatedTarget);
	/**
	* 🌏 Exception: `iframe` in Chrome (`124.0`)
	*
	* Case 1: parent `window` → child `iframe`
	* `dragLeave.relatedTarget` is the `iframe` in the parent `window`
	*
	* Case 2: child `iframe` → parent `window`
	* `dragLeave.relatedTarget` is `null` *(standard check)*
	*/
	return relatedTarget instanceof HTMLIFrameElement;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/detect-broken-drag.js
function getBindingsForBrokenDrags(_ref) {
	var onDragEnd = _ref.onDragEnd;
	return [{
		type: "pointermove",
		listener: function() {
			var callCount = 0;
			return function listener() {
				if (callCount < 20) {
					callCount++;
					return;
				}
				onDragEnd();
			};
		}()
	}, {
		type: "pointerdown",
		listener: onDragEnd
	}];
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/get-input.js
function getInput(event) {
	return {
		altKey: event.altKey,
		button: event.button,
		buttons: event.buttons,
		ctrlKey: event.ctrlKey,
		metaKey: event.metaKey,
		shiftKey: event.shiftKey,
		clientX: event.clientX,
		clientY: event.clientY,
		pageX: event.pageX,
		pageY: event.pageY
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/dispatch-consumer-event.js
var scheduleOnDrag = function rafSchd(fn) {
	var lastArgs = [];
	var frameId = null;
	var wrapperFn = function wrapperFn() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		lastArgs = args;
		if (frameId) return;
		frameId = requestAnimationFrame(function() {
			frameId = null;
			fn.apply(void 0, lastArgs);
		});
	};
	wrapperFn.cancel = function() {
		if (!frameId) return;
		cancelAnimationFrame(frameId);
		frameId = null;
	};
	return wrapperFn;
}(function(fn) {
	return fn();
});
var dragStart = function() {
	var scheduled = null;
	function schedule(fn) {
		scheduled = {
			frameId: requestAnimationFrame(function() {
				scheduled = null;
				fn();
			}),
			fn
		};
	}
	function flush() {
		if (scheduled) {
			cancelAnimationFrame(scheduled.frameId);
			scheduled.fn();
			scheduled = null;
		}
	}
	return {
		schedule,
		flush
	};
}();
function makeDispatch(_ref) {
	var source = _ref.source, initial = _ref.initial, dispatchEvent = _ref.dispatchEvent;
	var previous = { dropTargets: [] };
	function safeDispatch(args) {
		dispatchEvent(args);
		previous = { dropTargets: args.payload.location.current.dropTargets };
	}
	return {
		start: function start(_ref2) {
			var nativeSetDragImage = _ref2.nativeSetDragImage;
			var location = {
				current: initial,
				previous,
				initial
			};
			safeDispatch({
				eventName: "onGenerateDragPreview",
				payload: {
					source,
					location,
					nativeSetDragImage
				}
			});
			dragStart.schedule(function() {
				safeDispatch({
					eventName: "onDragStart",
					payload: {
						source,
						location
					}
				});
			});
		},
		dragUpdate: function dragUpdate(_ref3) {
			var current = _ref3.current;
			dragStart.flush();
			scheduleOnDrag.cancel();
			safeDispatch({
				eventName: "onDropTargetChange",
				payload: {
					source,
					location: {
						initial,
						previous,
						current
					}
				}
			});
		},
		drag: function drag(_ref4) {
			var current = _ref4.current;
			scheduleOnDrag(function() {
				dragStart.flush();
				safeDispatch({
					eventName: "onDrag",
					payload: {
						source,
						location: {
							initial,
							previous,
							current
						}
					}
				});
			});
		},
		drop: function drop(_ref5) {
			var current = _ref5.current, updatedSourcePayload = _ref5.updatedSourcePayload;
			dragStart.flush();
			scheduleOnDrag.cancel();
			safeDispatch({
				eventName: "onDrop",
				payload: {
					source: updatedSourcePayload !== null && updatedSourcePayload !== void 0 ? updatedSourcePayload : source,
					location: {
						current,
						previous,
						initial
					}
				}
			});
		}
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/lifecycle-manager.js
var globalState = { isActive: false };
function canStart() {
	return !globalState.isActive;
}
function getNativeSetDragImage(event) {
	if (event.dataTransfer) return event.dataTransfer.setDragImage.bind(event.dataTransfer);
	return null;
}
function hasHierarchyChanged(_ref) {
	var current = _ref.current, next = _ref.next;
	if (current.length !== next.length) return true;
	for (var i = 0; i < current.length; i++) if (current[i].element !== next[i].element) return true;
	return false;
}
function start(_ref2) {
	var event = _ref2.event, dragType = _ref2.dragType, getDropTargetsOver = _ref2.getDropTargetsOver, dispatchEvent = _ref2.dispatchEvent;
	if (!canStart()) return;
	var initial = getStartLocation({
		event,
		dragType,
		getDropTargetsOver
	});
	globalState.isActive = true;
	var state = { current: initial };
	setDropEffectOnEvent({
		event,
		current: initial.dropTargets
	});
	var dispatch = makeDispatch({
		source: dragType.payload,
		dispatchEvent,
		initial
	});
	function updateState(next) {
		var hasChanged = hasHierarchyChanged({
			current: state.current.dropTargets,
			next: next.dropTargets
		});
		state.current = next;
		if (hasChanged) dispatch.dragUpdate({ current: state.current });
	}
	function onUpdateEvent(event) {
		var input = getInput(event);
		var nextDropTargets = getDropTargetsOver({
			target: isHoneyPotElement(event.target) ? getElementFromPointWithoutHoneypot({
				x: input.clientX,
				y: input.clientY
			}) : event.target,
			input,
			source: dragType.payload,
			current: state.current.dropTargets
		});
		if (nextDropTargets.length) {
			event.preventDefault();
			setDropEffectOnEvent({
				event,
				current: nextDropTargets
			});
		}
		updateState({
			dropTargets: nextDropTargets,
			input
		});
	}
	function cancel() {
		if (state.current.dropTargets.length) updateState({
			dropTargets: [],
			input: state.current.input
		});
		dispatch.drop({
			current: state.current,
			updatedSourcePayload: null
		});
		finish();
	}
	function finish() {
		globalState.isActive = false;
		unbindEvents();
	}
	var unbindEvents = (0, import_dist.bindAll)(window, [
		{
			type: "dragover",
			listener: function listener(event) {
				onUpdateEvent(event);
				dispatch.drag({ current: state.current });
			}
		},
		{
			type: "dragenter",
			listener: onUpdateEvent
		},
		{
			type: "dragleave",
			listener: function listener(event) {
				if (!isLeavingWindow({ dragLeave: event })) return;
				/**
				* At this point we don't know if a drag is being cancelled,
				* or if a drag is leaving the `window`.
				*
				* Both have:
				*   1. "dragleave" (with `relatedTarget: null`)
				*   2. "dragend" (a "dragend" can occur when outside the `window`)
				*
				* **Clearing drop targets**
				*
				* For either case we are clearing the the drop targets
				*
				* - cancelling: we clear drop targets in `"dragend"` anyway
				* - leaving the `window`: we clear the drop targets (to clear stickiness)
				*
				* **Leaving the window and finishing the drag**
				*
				* _internal drags_
				*
				* - The drag continues when the user is outside the `window`
				*   and can resume if the user drags back over the `window`,
				*   or end when the user drops in an external `window`.
				* - We will get a `"dragend"`, or we can listen for other
				*   events to determine the drag is finished when the user re-enters the `window`).
				*
				* _external drags_
				*
				* - We conclude the drag operation.
				* - We have no idea if the user will drag back over the `window`,
				*   or if the drag ends elsewhere.
				* - We will create a new drag if the user re-enters the `window`.
				*
				* **Not updating `input`**
				*
				* 🐛 Bug[Chrome] the final `"dragleave"` has default input values (eg `clientX == 0`)
				* Workaround: intentionally not updating `input` in "dragleave"
				* rather than the users current input values
				* - [Conversation](https://twitter.com/alexandereardon/status/1642697633864241152)
				* - [Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1429937)
				**/
				updateState({
					input: state.current.input,
					dropTargets: []
				});
				if (dragType.startedFrom === "external") cancel();
			}
		},
		{
			type: "drop",
			listener: function listener(event) {
				state.current = {
					dropTargets: state.current.dropTargets,
					input: getInput(event)
				};
				/** If there are no drop targets, then we will get
				* a "drop" event if:
				* - `preventUnhandled()` is being used
				* - there is an unmanaged drop target (eg another library)
				* In these cases, it's up to the consumer
				* to handle the drop if it's not over one of our drop targets
				* - `preventUnhandled()` will cancel the "drop"
				* - unmanaged drop targets can handle the "drop" how they want to
				* We won't call `event.preventDefault()` in this call path */
				if (!state.current.dropTargets.length) {
					cancel();
					return;
				}
				event.preventDefault();
				setDropEffectOnEvent({
					event,
					current: state.current.dropTargets
				});
				dispatch.drop({
					current: state.current,
					updatedSourcePayload: dragType.type === "external" ? dragType.getDropPayload(event) : null
				});
				finish();
			}
		},
		{
			type: "dragend",
			listener: function listener(event) {
				state.current = {
					dropTargets: state.current.dropTargets,
					input: getInput(event)
				};
				cancel();
			}
		}
	].concat(_toConsumableArray(getBindingsForBrokenDrags({ onDragEnd: cancel }))), { capture: true });
	dispatch.start({ nativeSetDragImage: getNativeSetDragImage(event) });
}
function setDropEffectOnEvent(_ref3) {
	var _current$;
	var event = _ref3.event;
	var innerMost = (_current$ = _ref3.current[0]) === null || _current$ === void 0 ? void 0 : _current$.dropEffect;
	if (innerMost != null && event.dataTransfer) event.dataTransfer.dropEffect = innerMost;
}
function getStartLocation(_ref4) {
	var event = _ref4.event, dragType = _ref4.dragType, getDropTargetsOver = _ref4.getDropTargetsOver;
	var input = getInput(event);
	if (dragType.startedFrom === "external") return {
		input,
		dropTargets: []
	};
	return {
		input,
		dropTargets: getDropTargetsOver({
			input,
			source: dragType.payload,
			target: event.target,
			current: []
		})
	};
}
var lifecycle = {
	canStart,
	start
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/ledger/usage-ledger.js
var ledger$1 = /* @__PURE__ */ new Map();
function registerUsage(_ref) {
	var typeKey = _ref.typeKey, mount = _ref.mount;
	var entry = ledger$1.get(typeKey);
	if (entry) {
		entry.usageCount++;
		return entry;
	}
	var initial = {
		typeKey,
		unmount: mount(),
		usageCount: 1
	};
	ledger$1.set(typeKey, initial);
	return initial;
}
function register(args) {
	var entry = registerUsage(args);
	return function unregister() {
		entry.usageCount--;
		if (entry.usageCount > 0) return;
		entry.unmount();
		ledger$1.delete(args.typeKey);
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/add-attribute.js
function addAttribute(element, _ref) {
	var attribute = _ref.attribute, value = _ref.value;
	element.setAttribute(attribute, value);
	return function() {
		return element.removeAttribute(attribute);
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-drop-target.js
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _createForOfIteratorHelper$2(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (!t) {
		if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e && r && "number" == typeof r.length) {
			t && (r = t);
			var _n = 0, F = function F() {};
			return {
				s: F,
				n: function n() {
					return _n >= r.length ? { done: !0 } : {
						done: !1,
						value: r[_n++]
					};
				},
				e: function e(r) {
					throw r;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var o, a = !0, u = !1;
	return {
		s: function s() {
			t = t.call(r);
		},
		n: function n() {
			var r = t.next();
			return a = r.done, r;
		},
		e: function e(r) {
			u = !0, o = r;
		},
		f: function f() {
			try {
				a || null == t.return || t.return();
			} finally {
				if (u) throw o;
			}
		}
	};
}
function _unsupportedIterableToArray$2(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
	}
}
function _arrayLikeToArray$2(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function copyReverse(array) {
	return array.slice(0).reverse();
}
function makeDropTarget(_ref) {
	var typeKey = _ref.typeKey, defaultDropEffect = _ref.defaultDropEffect;
	var registry = /* @__PURE__ */ new WeakMap();
	var dropTargetDataAtt = "data-drop-target-for-".concat(typeKey);
	var dropTargetSelector = "[".concat(dropTargetDataAtt, "]");
	function addToRegistry(args) {
		registry.set(args.element, args);
		return function() {
			return registry.delete(args.element);
		};
	}
	function dropTargetForConsumers(args) {
		var existing = registry.get(args.element);
		if (existing) console.warn("You have already registered a [".concat(typeKey, "] dropTarget on the same element"), {
			existing,
			proposed: args
		});
		if (args.element instanceof HTMLIFrameElement) console.warn("\n            We recommend not registering <iframe> elements as drop targets\n            as it can result in some strange browser event ordering.\n          ".replace(/\s{2,}/g, " ").trim());
		return once(combine(addAttribute(args.element, {
			attribute: dropTargetDataAtt,
			value: "true"
		}), addToRegistry(args)));
	}
	function getActualDropTargets(_ref2) {
		var _args$getData, _args$getData2, _args$getDropEffect, _args$getDropEffect2;
		var source = _ref2.source, target = _ref2.target, input = _ref2.input, _ref2$result = _ref2.result, result = _ref2$result === void 0 ? [] : _ref2$result;
		if (target == null) return result;
		if (!(target instanceof Element)) {
			if (target instanceof Node) return getActualDropTargets({
				source,
				target: target.parentElement,
				input,
				result
			});
			return result;
		}
		var closest = target.closest(dropTargetSelector);
		if (closest == null) return result;
		var args = registry.get(closest);
		if (args == null) return result;
		var feedback = {
			input,
			source,
			element: args.element
		};
		if (args.canDrop && !args.canDrop(feedback)) return getActualDropTargets({
			source,
			target: args.element.parentElement,
			input,
			result
		});
		var data = (_args$getData = (_args$getData2 = args.getData) === null || _args$getData2 === void 0 ? void 0 : _args$getData2.call(args, feedback)) !== null && _args$getData !== void 0 ? _args$getData : {};
		var dropEffect = (_args$getDropEffect = (_args$getDropEffect2 = args.getDropEffect) === null || _args$getDropEffect2 === void 0 ? void 0 : _args$getDropEffect2.call(args, feedback)) !== null && _args$getDropEffect !== void 0 ? _args$getDropEffect : defaultDropEffect;
		var record = {
			data,
			element: args.element,
			dropEffect,
			isActiveDueToStickiness: false
		};
		return getActualDropTargets({
			source,
			target: args.element.parentElement,
			input,
			result: [].concat(_toConsumableArray(result), [record])
		});
	}
	function notifyCurrent(_ref3) {
		var eventName = _ref3.eventName, payload = _ref3.payload;
		var _iterator = _createForOfIteratorHelper$2(payload.location.current.dropTargets), _step;
		try {
			for (_iterator.s(); !(_step = _iterator.n()).done;) {
				var _entry$eventName;
				var record = _step.value;
				var entry = registry.get(record.element);
				var args = _objectSpread$6(_objectSpread$6({}, payload), {}, { self: record });
				entry === null || entry === void 0 || (_entry$eventName = entry[eventName]) === null || _entry$eventName === void 0 || _entry$eventName.call(entry, args);
			}
		} catch (err) {
			_iterator.e(err);
		} finally {
			_iterator.f();
		}
	}
	var actions = {
		onGenerateDragPreview: notifyCurrent,
		onDrag: notifyCurrent,
		onDragStart: notifyCurrent,
		onDrop: notifyCurrent,
		onDropTargetChange: function onDropTargetChange(_ref4) {
			var payload = _ref4.payload;
			var isCurrent = new Set(payload.location.current.dropTargets.map(function(record) {
				return record.element;
			}));
			var visited = /* @__PURE__ */ new Set();
			var _iterator2 = _createForOfIteratorHelper$2(payload.location.previous.dropTargets), _step2;
			try {
				for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
					var _entry$onDropTargetCh;
					var record = _step2.value;
					visited.add(record.element);
					var entry = registry.get(record.element);
					var isOver = isCurrent.has(record.element);
					var args = _objectSpread$6(_objectSpread$6({}, payload), {}, { self: record });
					entry === null || entry === void 0 || (_entry$onDropTargetCh = entry.onDropTargetChange) === null || _entry$onDropTargetCh === void 0 || _entry$onDropTargetCh.call(entry, args);
					if (!isOver) {
						var _entry$onDragLeave;
						entry === null || entry === void 0 || (_entry$onDragLeave = entry.onDragLeave) === null || _entry$onDragLeave === void 0 || _entry$onDragLeave.call(entry, args);
					}
				}
			} catch (err) {
				_iterator2.e(err);
			} finally {
				_iterator2.f();
			}
			var _iterator3 = _createForOfIteratorHelper$2(payload.location.current.dropTargets), _step3;
			try {
				for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
					var _entry$onDropTargetCh2, _entry$onDragEnter;
					var _record = _step3.value;
					if (visited.has(_record.element)) continue;
					var _args = _objectSpread$6(_objectSpread$6({}, payload), {}, { self: _record });
					var _entry = registry.get(_record.element);
					_entry === null || _entry === void 0 || (_entry$onDropTargetCh2 = _entry.onDropTargetChange) === null || _entry$onDropTargetCh2 === void 0 || _entry$onDropTargetCh2.call(_entry, _args);
					_entry === null || _entry === void 0 || (_entry$onDragEnter = _entry.onDragEnter) === null || _entry$onDragEnter === void 0 || _entry$onDragEnter.call(_entry, _args);
				}
			} catch (err) {
				_iterator3.e(err);
			} finally {
				_iterator3.f();
			}
		}
	};
	function dispatchEvent(args) {
		actions[args.eventName](args);
	}
	function getIsOver(_ref5) {
		var source = _ref5.source, target = _ref5.target, input = _ref5.input, current = _ref5.current;
		var actual = getActualDropTargets({
			source,
			target,
			input
		});
		if (actual.length >= current.length) return actual;
		var lastCaptureOrdered = copyReverse(current);
		var actualCaptureOrdered = copyReverse(actual);
		var resultCaptureOrdered = [];
		for (var index = 0; index < lastCaptureOrdered.length; index++) {
			var _argsForLast$getIsSti;
			var last = lastCaptureOrdered[index];
			var fresh = actualCaptureOrdered[index];
			if (fresh != null) {
				resultCaptureOrdered.push(fresh);
				continue;
			}
			var parent = resultCaptureOrdered[index - 1];
			var lastParent = lastCaptureOrdered[index - 1];
			if ((parent === null || parent === void 0 ? void 0 : parent.element) !== (lastParent === null || lastParent === void 0 ? void 0 : lastParent.element)) break;
			var argsForLast = registry.get(last.element);
			if (!argsForLast) break;
			var feedback = {
				input,
				source,
				element: argsForLast.element
			};
			if (argsForLast.canDrop && !argsForLast.canDrop(feedback)) break;
			if (!((_argsForLast$getIsSti = argsForLast.getIsSticky) !== null && _argsForLast$getIsSti !== void 0 && _argsForLast$getIsSti.call(argsForLast, feedback))) break;
			resultCaptureOrdered.push(_objectSpread$6(_objectSpread$6({}, last), {}, { isActiveDueToStickiness: true }));
		}
		return copyReverse(resultCaptureOrdered);
	}
	return {
		dropTargetForConsumers,
		getIsOver,
		dispatchEvent
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-monitor.js
function _createForOfIteratorHelper$1(r, e) {
	var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (!t) {
		if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e && r && "number" == typeof r.length) {
			t && (r = t);
			var _n = 0, F = function F() {};
			return {
				s: F,
				n: function n() {
					return _n >= r.length ? { done: !0 } : {
						done: !1,
						value: r[_n++]
					};
				},
				e: function e(r) {
					throw r;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var o, a = !0, u = !1;
	return {
		s: function s() {
			t = t.call(r);
		},
		n: function n() {
			var r = t.next();
			return a = r.done, r;
		},
		e: function e(r) {
			u = !0, o = r;
		},
		f: function f() {
			try {
				a || null == t.return || t.return();
			} finally {
				if (u) throw o;
			}
		}
	};
}
function _unsupportedIterableToArray$1(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
	}
}
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function makeMonitor() {
	var registry = /* @__PURE__ */ new Set();
	var dragging = null;
	function tryAddToActive(monitor) {
		if (!dragging) return;
		if (!monitor.canMonitor || monitor.canMonitor(dragging.canMonitorArgs)) dragging.active.add(monitor);
	}
	function monitorForConsumers(args) {
		var entry = _objectSpread$5({}, args);
		registry.add(entry);
		tryAddToActive(entry);
		function cleanup() {
			registry.delete(entry);
			if (dragging) dragging.active.delete(entry);
		}
		return once(cleanup);
	}
	function dispatchEvent(_ref) {
		var eventName = _ref.eventName, payload = _ref.payload;
		if (eventName === "onGenerateDragPreview") {
			dragging = {
				canMonitorArgs: {
					initial: payload.location.initial,
					source: payload.source
				},
				active: /* @__PURE__ */ new Set()
			};
			var _iterator = _createForOfIteratorHelper$1(registry), _step;
			try {
				for (_iterator.s(); !(_step = _iterator.n()).done;) {
					var monitor = _step.value;
					tryAddToActive(monitor);
				}
			} catch (err) {
				_iterator.e(err);
			} finally {
				_iterator.f();
			}
		}
		if (!dragging) return;
		var active = Array.from(dragging.active);
		for (var _i = 0, _active = active; _i < _active.length; _i++) {
			var _monitor = _active[_i];
			if (dragging.active.has(_monitor)) {
				var _monitor$eventName;
				(_monitor$eventName = _monitor[eventName]) === null || _monitor$eventName === void 0 || _monitor$eventName.call(_monitor, payload);
			}
		}
		if (eventName === "onDrop") {
			dragging.active.clear();
			dragging = null;
		}
	}
	return {
		dispatchEvent,
		monitorForConsumers
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/make-adapter/make-adapter.js
function makeAdapter(_ref) {
	var typeKey = _ref.typeKey, mount = _ref.mount, dispatchEventToSource = _ref.dispatchEventToSource, onPostDispatch = _ref.onPostDispatch, defaultDropEffect = _ref.defaultDropEffect;
	var monitorAPI = makeMonitor();
	var dropTargetAPI = makeDropTarget({
		typeKey,
		defaultDropEffect
	});
	function dispatchEvent(args) {
		dispatchEventToSource === null || dispatchEventToSource === void 0 || dispatchEventToSource(args);
		dropTargetAPI.dispatchEvent(args);
		monitorAPI.dispatchEvent(args);
		onPostDispatch === null || onPostDispatch === void 0 || onPostDispatch(args);
	}
	function start(_ref2) {
		var event = _ref2.event, dragType = _ref2.dragType;
		lifecycle.start({
			event,
			dragType,
			getDropTargetsOver: dropTargetAPI.getIsOver,
			dispatchEvent
		});
	}
	function registerUsage() {
		function mountAdapter() {
			return mount({
				canStart: lifecycle.canStart,
				start
			});
		}
		return register({
			typeKey,
			mount: mountAdapter
		});
	}
	return {
		registerUsage,
		dropTarget: dropTargetAPI.dropTargetForConsumers,
		monitor: monitorAPI.monitorForConsumers
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/util/media-types/text-media-type.js
var textMediaType = "text/plain";
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/adapter/element-adapter-native-data-key.js
/**
* This key has been pulled into a separate module
* so that the external adapter does not need to import
* the element adapter
*/
var elementAdapterNativeDataKey = "application/vnd.pdnd";
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/adapter/element-adapter.js
var draggableRegistry = /* @__PURE__ */ new WeakMap();
function addToRegistry(args) {
	draggableRegistry.set(args.element, args);
	return function cleanup() {
		draggableRegistry.delete(args.element);
	};
}
var honeyPotFix = makeHoneyPotFix();
var adapter = makeAdapter({
	typeKey: "element",
	defaultDropEffect: "move",
	mount: function mount(api) {
		/**  Binding event listeners the `document` rather than `window` so that
		* this adapter always gets preference over the text adapter.
		* `document` is the first `EventTarget` under `window`
		* https://twitter.com/alexandereardon/status/1604658588311465985
		*/
		return combine(honeyPotFix.bindEvents(), (0, import_dist.bind)(document, {
			type: "dragstart",
			listener: function listener(event) {
				var _entry$dragHandle, _entry$getInitialData, _entry$getInitialData2, _entry$dragHandle2, _entry$getInitialData3, _entry$getInitialData4;
				if (!api.canStart(event)) return;
				if (event.defaultPrevented) return;
				if (!event.dataTransfer) {
					console.warn("\n              It appears as though you have are not testing DragEvents correctly.\n\n              - If you are unit testing, ensure you have polyfilled DragEvent.\n              - If you are browser testing, ensure you are dispatching drag events correctly.\n\n              Please see our testing guides for more information:\n              https://atlassian.design/components/pragmatic-drag-and-drop/core-package/testing\n            ".replace(/ {2}/g, ""));
					return;
				}
				var target = event.target;
				if (!(target instanceof HTMLElement)) return;
				var entry = draggableRegistry.get(target);
				if (!entry) return;
				/**
				* A text selection drag _can_ have the `draggable` element be
				* the `event.target` if the user is dragging the text selection
				* from the `draggable`.
				*
				* To know if the `draggable` is being dragged, we look at whether any
				* `"text/plain"` data is being dragged. If it is, then a text selection
				* drag is occurring.
				*
				* This behaviour has been validated on:
				*
				* - Chrome@128 on Android@14
				* - Chrome@128 on iOS@17.6.1
				* - Chrome@128 on Windows@11
				* - Chrome@128 on MacOS@14.6.1
				* - Firefox@129 on Windows@11 (not possible for user to select text in a draggable)
				* - Firefox@129 on MacOS@14.6.1 (not possible for user to select text in a draggable)
				*
				* Note: Could usually just use: `event.dataTransfer.types.includes(textMediaType)`
				* but unfortunately ProseMirror is always setting `""` as the dragged text
				*
				* Note: Unfortunately editor is (heavily) leaning on the current functionality today
				* and unwinding it will be a decent amount of effort. So for now, a text selection
				* where the `event.target` is a `draggable` element will still trigger the
				* element adapter.
				*
				* // Future state:
				* if(event.dataTransfer.getData(textMediaType)) {
				* 	return;
				* }
				*
				*/
				var input = getInput(event);
				var feedback = {
					element: entry.element,
					dragHandle: (_entry$dragHandle = entry.dragHandle) !== null && _entry$dragHandle !== void 0 ? _entry$dragHandle : null,
					input
				};
				if (entry.canDrag && !entry.canDrag(feedback)) {
					event.preventDefault();
					return;
				}
				if (entry.dragHandle) {
					var over = getElementFromPointWithoutHoneypot({
						x: input.clientX,
						y: input.clientY
					});
					if (!entry.dragHandle.contains(over)) {
						event.preventDefault();
						return;
					}
				}
				/**
				*  **Goal**
				*  Pass information to other applications
				*
				* **Approach**
				*  Put data into the native data store
				*
				*  **What about the native adapter?**
				*  When the element adapter puts native data into the native data store
				*  the native adapter is not triggered in the current window,
				*  but a native adapter in an external window _can_ be triggered
				*
				*  **Why bake this into core?**
				*  This functionality could be pulled out and exposed inside of
				*  `onGenerateDragPreview`. But decided to make it a part of the
				*  base API as it felt like a common enough use case and ended
				*  up being a similar amount of code to include this function as
				*  it was to expose the hook for it
				*/
				var nativeData = (_entry$getInitialData = (_entry$getInitialData2 = entry.getInitialDataForExternal) === null || _entry$getInitialData2 === void 0 ? void 0 : _entry$getInitialData2.call(entry, feedback)) !== null && _entry$getInitialData !== void 0 ? _entry$getInitialData : null;
				if (nativeData) for (var _i = 0, _Object$entries = Object.entries(nativeData); _i < _Object$entries.length; _i++) {
					var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], data = _Object$entries$_i[1];
					event.dataTransfer.setData(key, data !== null && data !== void 0 ? data : "");
				}
				/**
				*  📱 For Android devices, a drag operation will not start unless
				* "text/plain" or "text/uri-list" data exists in the native data store
				* https://twitter.com/alexandereardon/status/1732189803754713424
				*
				* Tested on:
				* Device: Google Pixel 5
				* Android version: 14 (November 5, 2023)
				* Chrome version: 120.0
				*/
				if (isAndroid() && !event.dataTransfer.types.includes("text/plain") && !event.dataTransfer.types.includes("text/uri-list")) event.dataTransfer.setData(textMediaType, androidFallbackText);
				/**
				* 1. Must set any media type for `iOS15` to work
				* 2. We are also doing adding data so that the native adapter
				* can know that the element adapter has handled this drag
				*
				* We used to wrap this `setData()` in a `try/catch` for Firefox,
				* but it looks like that was not needed.
				*
				* Tested using: https://codesandbox.io/s/checking-firefox-throw-behaviour-on-dragstart-qt8h4f
				*
				* - ✅ Firefox@70.0 (Oct 2019) on macOS Sonoma
				* - ✅ Firefox@70.0 (Oct 2019) on macOS Big Sur
				* - ✅ Firefox@70.0 (Oct 2019) on Windows 10
				*
				* // just checking a few more combinations to be super safe
				*
				* - ✅ Chrome@78 (Oct 2019) on macOS Big Sur
				* - ✅ Chrome@78 (Oct 2019) on Windows 10
				* - ✅ Safari@14.1 on macOS Big Sur
				*/
				event.dataTransfer.setData(elementAdapterNativeDataKey, "");
				var dragType = {
					type: "element",
					payload: {
						element: entry.element,
						dragHandle: (_entry$dragHandle2 = entry.dragHandle) !== null && _entry$dragHandle2 !== void 0 ? _entry$dragHandle2 : null,
						data: (_entry$getInitialData3 = (_entry$getInitialData4 = entry.getInitialData) === null || _entry$getInitialData4 === void 0 ? void 0 : _entry$getInitialData4.call(entry, feedback)) !== null && _entry$getInitialData3 !== void 0 ? _entry$getInitialData3 : {}
					},
					startedFrom: "internal"
				};
				api.start({
					event,
					dragType
				});
			}
		}));
	},
	dispatchEventToSource: function dispatchEventToSource(_ref) {
		var _draggableRegistry$ge, _draggableRegistry$ge2;
		var eventName = _ref.eventName, payload = _ref.payload;
		(_draggableRegistry$ge = draggableRegistry.get(payload.source.element)) === null || _draggableRegistry$ge === void 0 || (_draggableRegistry$ge2 = _draggableRegistry$ge[eventName]) === null || _draggableRegistry$ge2 === void 0 || _draggableRegistry$ge2.call(_draggableRegistry$ge, payload);
	},
	onPostDispatch: honeyPotFix.getOnPostDispatch()
});
var dropTargetForElements = adapter.dropTarget;
var monitorForElements = adapter.monitor;
function draggable(args) {
	if (args.dragHandle && !args.element.contains(args.dragHandle)) console.warn("Drag handle element must be contained in draggable element", {
		element: args.element,
		dragHandle: args.dragHandle
	});
	var existing = draggableRegistry.get(args.element);
	if (existing) console.warn("You have already registered a `draggable` on the same element", {
		existing,
		proposed: args
	});
	return once(combine(adapter.registerUsage(), addToRegistry(args), addAttribute(args.element, {
		attribute: "draggable",
		value: "true"
	})));
}
/** Common event payload for all events */
/** A map containing payloads for all events */
/** Common event payload for all drop target events */
/** A map containing payloads for all events on drop targets */
/** Arguments given to all feedback functions (eg `canDrag()`) on for a `draggable()` */
/** Arguments given to all feedback functions (eg `canDrop()`) on a `dropTargetForElements()` */
/** Arguments given to all monitor feedback functions (eg `canMonitor()`) for a `monitorForElements` */
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/element/custom-native-drag-preview/set-custom-native-drag-preview.js
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
/** A function to remove the element that has been added to the `container`.
* @example () => ReactDOM.unmountComponentAtNode(container)
*/
/** A function that will render a preview element into a `container` `HTMLElement` */
/** By default we use the build in values for the native drag preview: {x: 0, y: 0} */
function defaultOffset() {
	return {
		x: 0,
		y: 0
	};
}
/** This function provides the ability to mount an element for it to be used as the native drag preview
*
* @example
* draggable({
*  onGenerateDragPreview: ({ nativeSetDragImage }) => {
*    setCustomNativeDragPreview({
*      render: ({ container }) => {
*        ReactDOM.render(<Preview item={item} />, container);
*        return () => ReactDOM.unmountComponentAtNode(container);
*      },
*      nativeSetDragImage,
*    });
*    },
* });
*/
function setCustomNativeDragPreview(_ref) {
	var render = _ref.render, nativeSetDragImage = _ref.nativeSetDragImage, _ref$getOffset = _ref.getOffset, getOffset = _ref$getOffset === void 0 ? defaultOffset : _ref$getOffset;
	var container = document.createElement("div");
	if (supportsPopover()) container.setAttribute("popover", "manual");
	Object.assign(container.style, _objectSpread$4(_objectSpread$4({ position: "fixed" }, supportsPopover() ? popoverResetUserAgentStyles : { zIndex: maxZIndex }), {}, {
		top: 0,
		left: 0,
		pointerEvents: "none"
	}));
	document.body.append(container);
	if (supportsPopover()) container.showPopover();
	var unmount = render({ container });
	/**
	* Some frameworks (eg `react`) don't render into the container until the next microtask.
	* - This will run before the browser takes it's picture of the element
	* - This will run before the animation frame that removes `container`.
	* */
	queueMicrotask(function() {
		var previewOffset = getOffset({ container });
		/**
		* **Problem**
		* On `Safari@17.1` if a drag preview element has some opacity,
		* Safari will include elements behind the drag preview element
		* in the drag preview.
		* Bug: https://bugs.webkit.org/show_bug.cgi?id=266025
		*
		* **Fix**
		* We push the drag preview so it is _almost_ completely offscreen so that
		* there won't be any elements behind the drag preview element.
		* If the element is _completely_ offscreen, then the drag is cancelled by Safari.
		*
		* Using `-0.0001` so that any potential "see through" on the drag preview element
		* is effectively invisible 👻
		*
		* **Unsuccessful alternatives**
		* Setting a background color (eg "white") on the `container`
		* → Wrecks the opacity of the drag preview element
		*
		* Adding a parent element of the `container` with a background color (eg "white")
		* → Wrecks the opacity of the drag preview element
		*/
		/**
		* Update: this bug fix is no longer needed in `Safari@26.4` (and maybe earlier)
		* We can remove it in a future release
		*/
		if (isSafari()) {
			var rect = container.getBoundingClientRect();
			if (rect.width === 0) return;
			container.style.left = "-".concat(rect.width - 1e-4, "px");
		}
		nativeSetDragImage === null || nativeSetDragImage === void 0 || nativeSetDragImage(container, previewOffset.x, previewOffset.y);
	});
	function cleanup() {
		unbindMonitor();
		unmount === null || unmount === void 0 || unmount();
		document.body.removeChild(container);
	}
	var unbindMonitor = monitorForElements({
		onDragStart: cleanup,
		onDrop: cleanup
	});
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop@1.8.1/node_modules/@atlaskit/pragmatic-drag-and-drop/dist/esm/public-utils/reorder.js
/**
* A function that will reorder an array (`list`).
* `reorder` returns a new array with reordered items and does not
*  modify the original array. The items in the array are also not modified.
*/
function reorder(_ref) {
	var list = _ref.list, startIndex = _ref.startIndex, finishIndex = _ref.finishIndex;
	if (startIndex === -1 || finishIndex === -1) return Array.from(list);
	var result = Array.from(list);
	var removed = _slicedToArray(result.splice(startIndex, 1), 1)[0];
	result.splice(finishIndex, 0, removed);
	return result;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-hitbox@1.2.0/node_modules/@atlaskit/pragmatic-drag-and-drop-hitbox/dist/esm/closest-edge.js
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var getDistanceToEdge = {
	top: function top(rect, client) {
		return Math.abs(client.y - rect.top);
	},
	right: function right(rect, client) {
		return Math.abs(rect.right - client.x);
	},
	bottom: function bottom(rect, client) {
		return Math.abs(rect.bottom - client.y);
	},
	left: function left(rect, client) {
		return Math.abs(client.x - rect.left);
	}
};
var uniqueKey$1 = Symbol("closestEdge");
/**
* Adds a unique `Symbol` to the `userData` object. Use with `extractClosestEdge()` for type safe lookups.
*/
function attachClosestEdge(userData, _ref) {
	var _entries$sort$0$edge, _entries$sort$;
	var element = _ref.element, input = _ref.input, allowedEdges = _ref.allowedEdges;
	var client = {
		x: input.clientX,
		y: input.clientY
	};
	var rect = element.getBoundingClientRect();
	var addClosestEdge = (_entries$sort$0$edge = (_entries$sort$ = allowedEdges.map(function(edge) {
		return {
			edge,
			value: getDistanceToEdge[edge](rect, client)
		};
	}).sort(function(a, b) {
		return a.value - b.value;
	})[0]) === null || _entries$sort$ === void 0 ? void 0 : _entries$sort$.edge) !== null && _entries$sort$0$edge !== void 0 ? _entries$sort$0$edge : null;
	return _objectSpread$3(_objectSpread$3({}, userData), {}, _defineProperty({}, uniqueKey$1, addClosestEdge));
}
/**
* Returns the value added by `attachClosestEdge()` to the `userData` object. It will return `null` if there is no value.
*/
function extractClosestEdge(userData) {
	var _ref2;
	return (_ref2 = userData[uniqueKey$1]) !== null && _ref2 !== void 0 ? _ref2 : null;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-hitbox@1.2.0/node_modules/@atlaskit/pragmatic-drag-and-drop-hitbox/dist/esm/get-reorder-destination-index.js
function getReorderDestinationIndex(_ref) {
	var startIndex = _ref.startIndex, closestEdgeOfTarget = _ref.closestEdgeOfTarget, indexOfTarget = _ref.indexOfTarget, axis = _ref.axis;
	if (startIndex === -1 || indexOfTarget === -1) return startIndex;
	if (startIndex === indexOfTarget) return startIndex;
	if (closestEdgeOfTarget == null) return indexOfTarget;
	var isGoingAfter = axis === "vertical" && closestEdgeOfTarget === "bottom" || axis === "horizontal" && closestEdgeOfTarget === "right";
	if (startIndex < indexOfTarget) return isGoingAfter ? indexOfTarget : indexOfTarget - 1;
	return isGoingAfter ? indexOfTarget + 1 : indexOfTarget;
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
// ../../node_modules/.pnpm/@babel+runtime@7.29.13/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-hitbox@1.2.0/node_modules/@atlaskit/pragmatic-drag-and-drop-hitbox/dist/esm/internal/memoize.js
function isShallowEqual(a, b) {
	var aKeys = Object.keys(a);
	var bKeys = Object.keys(b);
	if (aKeys.length !== bKeys.length) return false;
	return aKeys.every(function(key) {
		return Object.is(a[key], b[key]);
	});
}
/**
* Used to store a stable object, which returns a new object only if one of the values has changed
*/
function stable() {
	var isEqual = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : isShallowEqual;
	var cache = null;
	return function(value) {
		if (cache && isEqual(cache.value, value)) return cache.value;
		cache = { value };
		return cache.value;
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-hitbox@1.2.0/node_modules/@atlaskit/pragmatic-drag-and-drop-hitbox/dist/esm/tree-item.js
var _excluded = ["block"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var uniqueKey = Symbol("tree-item-instruction");
function getCenter(rect) {
	return {
		x: (rect.right + rect.left) / 2,
		y: (rect.bottom + rect.top) / 2
	};
}
function standardHitbox(_ref) {
	var client = _ref.client, borderBox = _ref.borderBox;
	var quarterOfHeight = borderBox.height / 4;
	if (client.y <= borderBox.top + quarterOfHeight) return "reorder-above";
	if (client.y >= borderBox.bottom - quarterOfHeight) return "reorder-below";
	return "make-child";
}
function getInstruction(_ref2) {
	var element = _ref2.element, input = _ref2.input, currentLevel = _ref2.currentLevel, indentPerLevel = _ref2.indentPerLevel, mode = _ref2.mode;
	var client = {
		x: input.clientX,
		y: input.clientY
	};
	var borderBox = element.getBoundingClientRect();
	if (mode === "standard") return {
		type: standardHitbox({
			borderBox,
			client
		}),
		indentPerLevel,
		currentLevel
	};
	var center = getCenter(borderBox);
	if (mode === "expanded") {
		var _type = standardHitbox({
			borderBox,
			client
		});
		return {
			type: _type === "reorder-above" ? _type : "make-child",
			indentPerLevel,
			currentLevel
		};
	}
	var visibleInset = indentPerLevel * currentLevel;
	if (client.x < borderBox.left + visibleInset) {
		if (client.y < center.y) return {
			type: "reorder-above",
			indentPerLevel,
			currentLevel
		};
		var rawLevel = (client.x - borderBox.left) / indentPerLevel;
		return {
			type: "reparent",
			desiredLevel: Math.max(Math.floor(rawLevel), 0),
			indentPerLevel,
			currentLevel
		};
	}
	return {
		type: standardHitbox({
			borderBox,
			client
		}),
		indentPerLevel,
		currentLevel
	};
}
function areInstructionsEqual(a, b) {
	if (a.type !== b.type) return false;
	if (a.type === "instruction-blocked" && b.type === "instruction-blocked") return areInstructionsEqual(a.desired, b.desired);
	return isShallowEqual(a, b);
}
var memoizeInstruction = stable(areInstructionsEqual);
function applyInstructionBlock(_ref3) {
	var desired = _ref3.desired, block = _ref3.block;
	if (block !== null && block !== void 0 && block.includes(desired.type) && desired.type !== "instruction-blocked") return {
		type: "instruction-blocked",
		desired
	};
	return desired;
}
function attachInstruction(userData, _ref4) {
	var block = _ref4.block;
	var memoized = memoizeInstruction(applyInstructionBlock({
		desired: getInstruction(_objectWithoutProperties(_ref4, _excluded)),
		block
	}));
	return _objectSpread$2(_objectSpread$2({}, userData), {}, _defineProperty({}, uniqueKey, memoized));
}
function extractInstruction(userData) {
	var _ref5;
	return (_ref5 = userData[uniqueKey]) !== null && _ref5 !== void 0 ? _ref5 : null;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/engagement-history.js
var ledger = /* @__PURE__ */ new Map();
var requested = /* @__PURE__ */ new Set();
function markAndGetEngagement(element) {
	markEngagement(element);
	var entry = ledger.get(element);
	if (entry) return entry;
	var fresh = { timeOfEngagementStart: Date.now() };
	ledger.set(element, fresh);
	return fresh;
}
function markEngagement(element) {
	requested.add(element);
}
function clearUnusedEngagements(fn) {
	requested.clear();
	fn();
	ledger.forEach(function(_, element) {
		if (!requested.has(element)) ledger.delete(element);
	});
	requested.clear();
}
function clearEngagementHistory() {
	ledger.clear();
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/scheduler.js
var schedulers = /* @__PURE__ */ new Map();
function getScheduler(monitor) {
	var scheduler = schedulers.get(monitor);
	if (scheduler) return scheduler;
	var created = makeScheduler(monitor);
	schedulers.set(monitor, created);
	return created;
}
function makeScheduler(monitor) {
	var state = { type: "idle" };
	var callbacks = [];
	function loop(timeLastFrameFinished) {
		if (state.type !== "running") return;
		var timeSinceLastFrame = timeLastFrameFinished - state.timeLastFrameFinished;
		var latestArgs = state.latestArgs;
		var underUsersPointer = getElementFromPointWithoutHoneypot({
			x: latestArgs.location.current.input.clientX,
			y: latestArgs.location.current.input.clientY
		});
		clearUnusedEngagements(function() {
			callbacks.forEach(function(onFrame) {
				return onFrame({
					underUsersPointer,
					latestArgs,
					timeSinceLastFrame
				});
			});
		});
		state.timeLastFrameFinished = timeLastFrameFinished;
		state.frameId = requestAnimationFrame(loop);
	}
	function reset() {
		if (state.type === "idle") return;
		cancelAnimationFrame(state.frameId);
		clearEngagementHistory();
		state = { type: "idle" };
	}
	function start(args) {
		if (state.type !== "idle") return;
		state = {
			type: "initializing",
			latestArgs: args,
			frameId: requestAnimationFrame(function(timeLastFrameFinished) {
				if (state.type !== "initializing") return;
				state = {
					type: "running",
					timeLastFrameFinished,
					latestArgs: state.latestArgs,
					frameId: requestAnimationFrame(loop)
				};
			})
		};
	}
	function update(args) {
		if (state.type === "idle") {
			start(args);
			return;
		}
		state.latestArgs = args;
	}
	monitor({
		onDragStart: start,
		onDropTargetChange: update,
		onDrag: update,
		onDrop: reset
	});
	return { onFrame: function onFrame(fn) {
		callbacks.push(fn);
	} };
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/over-element/data-attributes.js
var dataAttribute = "data-auto-scrollable";
var selector = "[".concat(dataAttribute, "=\"true\"]");
function addScrollableAttribute(element) {
	element.setAttribute(dataAttribute, "true");
	return function() {
		return element.removeAttribute(dataAttribute);
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/configuration.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var baseConfig = {
	startHitboxAtPercentageRemainingOfElement: {
		top: .25,
		right: .25,
		bottom: .25,
		left: .25
	},
	maxScrollAtPercentageRemainingOfHitbox: {
		top: .5,
		right: .5,
		bottom: .5,
		left: .5
	},
	timeDampeningDurationMs: 300,
	maxMainAxisHitboxSize: 180
};
/** What the max scroll should be per second. Using "per second" rather than "per frame"
* as we want a consistent scroll speed regardless of frame rate.
*
*
* I explored trying to make the max scroll speed dynamic based on particular factors.
* However, it ended up being difficult to find a _perfect_ formula.
*
* Likely the perfect answer would involve:
* - the size of the scrollable element
* - the size of the scrollable element relative to the screen size
* - the size of the drag preview
* - the size of elements being scrolled in scrollable elements (expensive and difficult to compute)
*/
var maxPixelScrollPerSecond = {
	standard: 900,
	fast: 1500
};
function getInternalConfig(provided) {
	var _provided$maxScrollSp;
	return _objectSpread$1(_objectSpread$1({}, baseConfig), {}, { maxPixelScrollPerSecond: maxPixelScrollPerSecond[(_provided$maxScrollSp = provided === null || provided === void 0 ? void 0 : provided.maxScrollSpeed) !== null && _provided$maxScrollSp !== void 0 ? _provided$maxScrollSp : "standard"] });
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/can-scroll-on-edge.js
var canScrollOnEdge = {
	top: function top(element) {
		return element.scrollTop > 0;
	},
	right: function right(element) {
		return Math.ceil(element.scrollLeft) + element.clientWidth < element.scrollWidth;
	},
	bottom: function bottom(element) {
		return Math.ceil(element.scrollTop) + element.clientHeight < element.scrollHeight;
	},
	left: function left(element) {
		return element.scrollLeft > 0;
	}
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/edges.js
var edges = [
	"top",
	"right",
	"bottom",
	"left"
];
var edgeAxisLookup = {
	top: "vertical",
	right: "horizontal",
	bottom: "vertical",
	left: "horizontal"
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/axis.js
var vertical = {
	start: "top",
	end: "bottom",
	point: "y",
	size: "height"
};
var horizontal = {
	start: "left",
	end: "right",
	point: "x",
	size: "width"
};
var axisLookup = {
	vertical: {
		mainAxis: vertical,
		crossAxis: horizontal
	},
	horizontal: {
		mainAxis: horizontal,
		crossAxis: vertical
	}
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/side.js
var mainAxisSideLookup = {
	top: "start",
	right: "end",
	bottom: "end",
	left: "start"
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/get-over-element-hitbox.js
function makeGetHitbox(_ref) {
	var edge = _ref.edge, axis = _ref.axis;
	return function hitbox(_ref2) {
		var _DOMRect$fromRect;
		var clientRect = _ref2.clientRect, config = _ref2.config;
		var _axisLookup$axis = axisLookup[axis], mainAxis = _axisLookup$axis.mainAxis, crossAxis = _axisLookup$axis.crossAxis;
		var side = mainAxisSideLookup[edge];
		var mainAxisHitboxSize = Math.min(config.startHitboxAtPercentageRemainingOfElement[edge] * clientRect[mainAxis.size], config.maxMainAxisHitboxSize);
		return DOMRect.fromRect((_DOMRect$fromRect = {}, _defineProperty(_DOMRect$fromRect, mainAxis.point, side === "start" ? clientRect[mainAxis.point] : clientRect[mainAxis.point] + clientRect[mainAxis.size] - mainAxisHitboxSize), _defineProperty(_DOMRect$fromRect, crossAxis.point, clientRect[crossAxis.point]), _defineProperty(_DOMRect$fromRect, mainAxis.size, mainAxisHitboxSize), _defineProperty(_DOMRect$fromRect, crossAxis.size, clientRect[crossAxis.size]), _DOMRect$fromRect));
	};
}
var getOverElementHitbox = {
	top: makeGetHitbox({
		axis: "vertical",
		edge: "top"
	}),
	right: makeGetHitbox({
		axis: "horizontal",
		edge: "right"
	}),
	bottom: makeGetHitbox({
		axis: "vertical",
		edge: "bottom"
	}),
	left: makeGetHitbox({
		axis: "horizontal",
		edge: "left"
	})
};
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/get-percentage-in-range.js
function getPercentageInRange(_ref) {
	var startOfRange = _ref.startOfRange, endOfRange = _ref.endOfRange, value = _ref.value;
	if (!(startOfRange < endOfRange)) return 0;
	if (value < startOfRange) return 0;
	if (value > endOfRange) return 1;
	var range = endOfRange - startOfRange;
	return (value - startOfRange) / range;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/get-scroll-change.js
function getMaxScrollChange(_ref) {
	var timeSinceLastFrame = _ref.timeSinceLastFrame, config = _ref.config;
	var targetScrollPerMs = config.maxPixelScrollPerSecond / 1e3;
	var proposed = Math.ceil(targetScrollPerMs * timeSinceLastFrame);
	var maximum = config.maxPixelScrollPerSecond / 60;
	return Math.min(proposed, maximum);
}
function getDistanceDampening(_ref2) {
	var client = _ref2.client, axis = _ref2.axis, edge = _ref2.edge, hitbox = _ref2.hitbox, config = _ref2.config;
	var mainAxis = axisLookup[axis].mainAxis;
	var side = mainAxisSideLookup[edge];
	var maxSpeedBuffer = hitbox[mainAxis.size] * config.maxScrollAtPercentageRemainingOfHitbox[edge];
	if (side === "end") return getPercentageInRange({
		startOfRange: hitbox[mainAxis.start],
		endOfRange: hitbox[mainAxis.end] - maxSpeedBuffer,
		value: client[mainAxis.point]
	});
	return 1 - getPercentageInRange({
		startOfRange: hitbox[mainAxis.start] + maxSpeedBuffer,
		endOfRange: hitbox[mainAxis.end],
		value: client[mainAxis.point]
	});
}
function getScrollChange(_ref3) {
	var client = _ref3.client, timeSinceLastFrame = _ref3.timeSinceLastFrame, engagement = _ref3.engagement, axis = _ref3.axis, hitbox = _ref3.hitbox, edge = _ref3.edge, isDistanceDampeningEnabled = _ref3.isDistanceDampeningEnabled, config = _ref3.config;
	var maxScroll = getMaxScrollChange({
		timeSinceLastFrame,
		config
	});
	var percentageOfMaxScroll = (isDistanceDampeningEnabled ? getDistanceDampening({
		client,
		edge,
		hitbox,
		axis,
		config
	}) : 1) * getPercentageInRange({
		startOfRange: engagement.timeOfEngagementStart,
		endOfRange: engagement.timeOfEngagementStart + config.timeDampeningDurationMs,
		value: Date.now()
	});
	var scroll = Math.max(maxScroll * percentageOfMaxScroll, 1);
	return mainAxisSideLookup[edge] === "end" ? scroll : -1 * scroll;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/is-axis-allowed.js
function isAxisAllowed(axis, allowedAxis) {
	return allowedAxis === "all" || axis === allowedAxis;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/shared/is-within.js
function isWithin(_ref) {
	var client = _ref.client, clientRect = _ref.clientRect;
	return client.x >= clientRect.x && client.x <= clientRect.x + clientRect.width && client.y >= clientRect.y && client.y <= clientRect.y + clientRect.height;
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/over-element/get-scroll-by.js
function getRectDefault(element) {
	return element.getBoundingClientRect();
}
function getScrollBy(_ref) {
	var element = _ref.element, input = _ref.input, timeSinceLastFrame = _ref.timeSinceLastFrame, engagement = _ref.engagement, config = _ref.config, allowedAxis = _ref.allowedAxis, _ref$getRect = _ref.getRect, getRect = _ref$getRect === void 0 ? getRectDefault : _ref$getRect;
	var client = {
		x: input.clientX,
		y: input.clientY
	};
	var clientRect = getRect(element);
	var scrollableEdges = edges.reduce(function(map, edge) {
		var hitbox = getOverElementHitbox[edge]({
			clientRect,
			config
		});
		var axis = edgeAxisLookup[edge];
		if (!isAxisAllowed(axis, allowedAxis)) return map;
		if (!isWithin({
			client,
			clientRect: hitbox
		})) return map;
		if (!canScrollOnEdge[edge](element)) return map;
		map.set(edge, {
			edge,
			hitbox
		});
		return map;
	}, /* @__PURE__ */ new Map());
	return {
		left: function() {
			var axis = "horizontal";
			var leftEdge = scrollableEdges.get("left");
			if (leftEdge) return getScrollChange({
				client,
				edge: leftEdge.edge,
				hitbox: leftEdge.hitbox,
				axis,
				timeSinceLastFrame,
				engagement,
				isDistanceDampeningEnabled: true,
				config
			});
			var rightEdge = scrollableEdges.get("right");
			if (rightEdge) return getScrollChange({
				client,
				edge: rightEdge.edge,
				hitbox: rightEdge.hitbox,
				axis,
				timeSinceLastFrame,
				engagement,
				isDistanceDampeningEnabled: true,
				config
			});
			return 0;
		}(),
		top: function() {
			var axis = "vertical";
			var bottomEdge = scrollableEdges.get("bottom");
			if (bottomEdge) return getScrollChange({
				client,
				edge: bottomEdge.edge,
				hitbox: bottomEdge.hitbox,
				axis,
				timeSinceLastFrame,
				engagement,
				isDistanceDampeningEnabled: true,
				config
			});
			var topEdge = scrollableEdges.get("top");
			if (topEdge) return getScrollChange({
				client,
				edge: topEdge.edge,
				hitbox: topEdge.hitbox,
				axis,
				timeSinceLastFrame,
				engagement,
				isDistanceDampeningEnabled: true,
				config
			});
			return 0;
		}()
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/over-element/try-scroll.js
function _createForOfIteratorHelper(o, allowArrayLike) {
	var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	if (!it) {
		if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
			if (it) o = it;
			var i = 0;
			var F = function F() {};
			return {
				s: F,
				n: function n() {
					if (i >= o.length) return { done: true };
					return {
						done: false,
						value: o[i++]
					};
				},
				e: function e(_e) {
					throw _e;
				},
				f: F
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var normalCompletion = true, didErr = false, err;
	return {
		s: function s() {
			it = it.call(o);
		},
		n: function n() {
			var step = it.next();
			normalCompletion = step.done;
			return step;
		},
		e: function e(_e2) {
			didErr = true;
			err = _e2;
		},
		f: function f() {
			try {
				if (!normalCompletion && it.return != null) it.return();
			} finally {
				if (didErr) throw err;
			}
		}
	};
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function isScrollingAvailable(value) {
	return Boolean(value.top || value.left);
}
function tryScrollElements(_ref) {
	var _container$getConfigu, _container$getAllowed, _container$getAllowed2;
	var target = _ref.target, input = _ref.input, source = _ref.source, findEntry = _ref.findEntry, timeSinceLastFrame = _ref.timeSinceLastFrame, _ref$available = _ref.available, available = _ref$available === void 0 ? {
		top: true,
		left: true
	} : _ref$available;
	if (!isScrollingAvailable(available)) return available;
	if (!target) return available;
	var element = target.closest(selector);
	if (!element) return available;
	var container = findEntry(element);
	if (!container) return available;
	function continueSearchUp() {
		var _element$parentElemen;
		return tryScrollElements({
			target: (_element$parentElemen = element === null || element === void 0 ? void 0 : element.parentElement) !== null && _element$parentElemen !== void 0 ? _element$parentElemen : null,
			findEntry,
			source,
			timeSinceLastFrame,
			input,
			available
		});
	}
	var feedback = {
		input,
		source,
		element
	};
	if (container.canScroll && !container.canScroll(feedback)) return continueSearchUp();
	var engagement = markAndGetEngagement(element);
	var config = getInternalConfig((_container$getConfigu = container.getConfiguration) === null || _container$getConfigu === void 0 ? void 0 : _container$getConfigu.call(container, feedback));
	var scrollBy = getScrollBy({
		element,
		engagement,
		input,
		timeSinceLastFrame,
		allowedAxis: (_container$getAllowed = (_container$getAllowed2 = container.getAllowedAxis) === null || _container$getAllowed2 === void 0 ? void 0 : _container$getAllowed2.call(container, feedback)) !== null && _container$getAllowed !== void 0 ? _container$getAllowed : "all",
		config
	});
	var scroll = {
		top: 0,
		left: 0
	};
	if (available.top && scrollBy.top !== 0) {
		scroll.top = scrollBy.top;
		available.top = false;
	}
	if (available.left && scrollBy.left !== 0) {
		scroll.left = scrollBy.left;
		available.left = false;
	}
	if (scroll.top !== 0 || scroll.left !== 0) element.scrollBy(scroll);
	return continueSearchUp();
}
function tryScrollWindow(_ref2) {
	var input = _ref2.input, timeSinceLastFrame = _ref2.timeSinceLastFrame, available = _ref2.available, source = _ref2.source, entries = _ref2.entries;
	var element = document.documentElement;
	var feedback = {
		input,
		source,
		element
	};
	var _iterator = _createForOfIteratorHelper(entries), _step;
	try {
		for (_iterator.s(); !(_step = _iterator.n()).done;) {
			var _entry$getConfigurati, _entry$getAllowedAxis, _entry$getAllowedAxis2;
			var entry = _step.value;
			if (entry.canScroll && !entry.canScroll(feedback)) continue;
			var scrollBy = getScrollBy({
				element,
				engagement: markAndGetEngagement(element),
				input,
				config: getInternalConfig((_entry$getConfigurati = entry.getConfiguration) === null || _entry$getConfigurati === void 0 ? void 0 : _entry$getConfigurati.call(entry, feedback)),
				allowedAxis: (_entry$getAllowedAxis = (_entry$getAllowedAxis2 = entry.getAllowedAxis) === null || _entry$getAllowedAxis2 === void 0 ? void 0 : _entry$getAllowedAxis2.call(entry, feedback)) !== null && _entry$getAllowedAxis !== void 0 ? _entry$getAllowedAxis : "all",
				getRect: function getRect(element) {
					return DOMRect.fromRect({
						y: 0,
						x: 0,
						width: element.clientWidth,
						height: element.clientHeight
					});
				},
				timeSinceLastFrame
			});
			var scroll = {
				top: available.top ? scrollBy.top : 0,
				left: available.left ? scrollBy.left : 0
			};
			if (scroll.top !== 0 || scroll.left !== 0) element.scrollBy(scroll);
			break;
		}
	} catch (err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}
}
function tryScroll(_ref3) {
	var input = _ref3.input, findEntry = _ref3.findEntry, timeSinceLastFrame = _ref3.timeSinceLastFrame, source = _ref3.source, getWindowScrollEntries = _ref3.getWindowScrollEntries, underUsersPointer = _ref3.underUsersPointer;
	var remainder = tryScrollElements({
		target: underUsersPointer,
		timeSinceLastFrame,
		input,
		source,
		findEntry
	});
	if (!isScrollingAvailable(remainder)) return;
	tryScrollWindow({
		input,
		source,
		entries: getWindowScrollEntries(),
		timeSinceLastFrame,
		available: remainder
	});
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/over-element/make-api.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function makeApi(_ref) {
	var monitor = _ref.monitor;
	var elementRegistry = /* @__PURE__ */ new Map();
	var windowRegistry = /* @__PURE__ */ new Set();
	function autoScroll(args) {
		var _window$getComputedSt = window.getComputedStyle(args.element), overflowX = _window$getComputedSt.overflowX, overflowY = _window$getComputedSt.overflowY;
		if (!(overflowX === "auto" || overflowX === "scroll" || overflowY === "auto" || overflowY === "scroll")) console.warn("Auto scrolling has been attached to an element that appears not to be scrollable", {
			element: args.element,
			overflowX,
			overflowY
		});
		var existing = elementRegistry.get(args.element);
		if (existing) console.warn("You have already registered autoScrolling on the same element", {
			existing,
			proposed: args
		});
		elementRegistry.set(args.element, args);
		return combine(addScrollableAttribute(args.element), function() {
			return elementRegistry.delete(args.element);
		});
	}
	function autoScrollWindow() {
		var unique = _objectSpread({}, arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {});
		windowRegistry.add(unique);
		return function() {
			return windowRegistry.delete(unique);
		};
	}
	function findEntry(element) {
		var _elementRegistry$get;
		return (_elementRegistry$get = elementRegistry.get(element)) !== null && _elementRegistry$get !== void 0 ? _elementRegistry$get : null;
	}
	function getWindowScrollEntries() {
		return Array.from(windowRegistry);
	}
	function onFrame(_ref2) {
		var latestArgs = _ref2.latestArgs, underUsersPointer = _ref2.underUsersPointer, timeSinceLastFrame = _ref2.timeSinceLastFrame;
		tryScroll({
			input: latestArgs.location.current.input,
			source: latestArgs.source,
			findEntry,
			underUsersPointer,
			timeSinceLastFrame,
			getWindowScrollEntries
		});
	}
	getScheduler(monitor).onFrame(onFrame);
	return {
		autoScroll,
		autoScrollWindow
	};
}
// ../../node_modules/.pnpm/@atlaskit+pragmatic-drag-and-drop-auto-scroll@1.4.0/node_modules/@atlaskit/pragmatic-drag-and-drop-auto-scroll/dist/esm/entry-point/element.js
var api = makeApi({ monitor: monitorForElements });
var autoScrollForElements = api.autoScroll;
api.autoScrollWindow;
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/dnd/index.js
var DndBoxIndicator = ({ edge, gap, isFirst, isLast }) => {
	const prefixCls = "cdk-dnd-box-indicator";
	const classes = {
		[prefixCls]: true,
		[`${prefixCls}-${edge}`]: true,
		[`${prefixCls}-first`]: !!isFirst,
		[`${prefixCls}-last`]: !!isLast
	};
	const style = !isNil(gap) ? { "--cdk-inner-line-gap": convertCssPixel(gap) } : void 0;
	return createVNode("div", {
		"class": classes,
		"style": style
	}, null);
};
DndBoxIndicator.displayName = "DndBoxIndicator";
var DndTreeIndicator = ({ instruction, isFirst, isLast }) => {
	const prefixCls = "cdk-dnd-tree-indicator";
	const classes = {
		[prefixCls]: true,
		[`${prefixCls}-${instruction.type}`]: true,
		[`${prefixCls}-first`]: !!isFirst,
		[`${prefixCls}-last`]: !!isLast
	};
	const style = { "--cdk-inner-indent": getIndent(instruction) };
	return createVNode("div", {
		"class": classes,
		"style": style
	}, null);
};
function getIndent(instruction) {
	if (instruction.type === "instruction-blocked") return;
	if (instruction.type === "reparent") return convertCssPixel(instruction.desiredLevel * instruction.indentPerLevel);
	return convertCssPixel(instruction.currentLevel * instruction.indentPerLevel);
}
DndTreeIndicator.displayName = "DndTreeIndicator";
function reorderList(list, reorderInfo) {
	const { sourceIndex, targetIndex, operation } = reorderInfo;
	return reorder({
		list,
		startIndex: sourceIndex,
		finishIndex: operation === "insertAfter" ? targetIndex : targetIndex - 1
	});
}
function reorderTree(tree, reorderInfo, childrenKey, getKey) {
	const { sourceKey, targetKey, sourceData, operation } = reorderInfo;
	let newData = removeTreeItem(tree, sourceKey, childrenKey, getKey);
	if (operation === "insertAfter") newData = insertTreeItemAfter(newData, targetKey, sourceData, childrenKey, getKey);
	else if (operation === "insertBefore") newData = insertTreeItemBefore(newData, targetKey, sourceData, childrenKey, getKey);
	else if (operation === "insertChild") newData = insertChildTreeItem(newData, targetKey, sourceData, childrenKey, getKey);
	else newData = [...tree];
	return newData;
}
function triggerPostMoveFlash(element, options) {
	var _a, _b, _c;
	const mergedDuration = (_a = options == null ? void 0 : options.duration) != null ? _a : 200;
	const mergedBgColor = (_b = options == null ? void 0 : options.bgColor) != null ? _b : "rgba(69, 143, 255, 0.3)";
	const mergedEasing = (_c = options == null ? void 0 : options.easing) != null ? _c : "cubic-bezier(0.37, 0, 0.63, 1)";
	element.animate([{ backgroundColor: mergedBgColor }, {}], {
		duration: mergedDuration,
		easing: mergedEasing
	});
}
function getMergedCanFn(fn) {
	return (options) => {
		const v = fn();
		if (isBoolean(v)) return v;
		return v == null ? void 0 : v(options);
	};
}
function isDndSortableTransferData(data) {
	return isNumber(data.listDataIndex) && (isString(data.key) || isNumber(data.key) || isSymbol(data.key)) && isPlainObject(data.listData);
}
function callEventHandler(handler, transferData, location) {
	if (!isDndSortableTransferData(transferData)) return;
	handler == null || handler({
		key: transferData.key,
		data: transferData.listData,
		location
	});
}
function callEventHandlerWithSource(handler, transferData, sourceTransferData, location) {
	let key;
	let data;
	let sourceKey;
	let sourceData;
	if (transferData && isDndSortableTransferData(transferData)) {
		key = transferData.key;
		data = transferData.listData;
	}
	if (sourceTransferData && isDndSortableTransferData(sourceTransferData)) {
		sourceKey = sourceTransferData.key;
		sourceData = sourceTransferData.listData;
	}
	handler == null || handler({
		key,
		data,
		sourceKey,
		sourceData,
		location
	});
}
var dndContextPropertyKey = "__idux_cdk_dnd_context_key__";
var defaultTreeIndent = 32;
var defaultSortableStrategy = "list";
var defaultSortableEffect = "indicator";
var defaultChildrenKey = "children";
function isContextData(data) {
	return dndContextPropertyKey in data && isArray(data[dndContextPropertyKey]);
}
var useContextRegistry = createSharedComposable(() => {
	const draggableRegistry = /* @__PURE__ */ new Map();
	const dropTargetRegistry = /* @__PURE__ */ new Map();
	const draggableContextKeyMap = /* @__PURE__ */ new Map();
	const dropTargetContextKeyMap = /* @__PURE__ */ new Map();
	const draggableCleanupMap = /* @__PURE__ */ new Map();
	const dropTargetCleanupMap = /* @__PURE__ */ new Map();
	const _registerDraggable = (options) => {
		const { element, dragHandle, onGenerateDragPreview } = options;
		return draggable({
			element,
			dragHandle,
			getInitialData(args) {
				var _a;
				return getMergedData({ [dndContextPropertyKey]: [...(_a = draggableContextKeyMap.get(element)) != null ? _a : []] }, args, draggableRegistry.get(element));
			},
			canDrag(args) {
				return getMergedBoolean(args, draggableRegistry.get(element), "canDrag", true);
			},
			onGenerateDragPreview,
			onDrag(args) {
				callEventHandlers(args, draggableRegistry.get(element), "onDrag");
			},
			onDragStart(args) {
				callEventHandlers(args, draggableRegistry.get(element), "onDragStart");
			},
			onDropTargetChange(args) {
				callEventHandlers(args, draggableRegistry.get(element), "onDropTargetChange");
			},
			onDrop(args) {
				callEventHandlers(args, draggableRegistry.get(element), "onDrop");
			}
		});
	};
	const _registerDropTarget = (options) => {
		const { element, getDropEffect, onGenerateDragPreview } = options;
		return dropTargetForElements({
			element,
			getData(args) {
				var _a;
				return getMergedData({ [dndContextPropertyKey]: [...(_a = dropTargetContextKeyMap.get(element)) != null ? _a : []] }, args, dropTargetRegistry.get(element));
			},
			canDrop(args) {
				return getMergedBoolean(args, dropTargetRegistry.get(element), "canDrop", true);
			},
			getDropEffect,
			getIsSticky(args) {
				return getMergedBoolean(args, dropTargetRegistry.get(element), "getIsSticky", false);
			},
			onGenerateDragPreview,
			onDrag(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDrag");
			},
			onDragEnter(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDragEnter");
			},
			onDragLeave(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDragLeave");
			},
			onDragStart(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDragStart");
			},
			onDropTargetChange(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDropTargetChange");
			},
			onDrop(args) {
				callEventHandlers(args, dropTargetRegistry.get(element), "onDrop");
			}
		});
	};
	const getRegisterContext = (isDraggable) => {
		return isDraggable ? {
			registry: draggableRegistry,
			contextKeyMap: draggableContextKeyMap,
			cleanupMap: draggableCleanupMap
		} : {
			registry: dropTargetRegistry,
			contextKeyMap: dropTargetContextKeyMap,
			cleanupMap: dropTargetCleanupMap
		};
	};
	const register = (contextKey, options, isDraggable) => {
		var _a, _b;
		const { element } = options;
		const { registry, contextKeyMap, cleanupMap } = getRegisterContext(isDraggable);
		const registrys = (_a = registry.get(element)) != null ? _a : /* @__PURE__ */ new Set();
		const contextKeys = (_b = contextKeyMap.get(element)) != null ? _b : /* @__PURE__ */ new Set();
		if (contextKeys.has(contextKey)) return () => {};
		const alreadyRegistered = !!registrys.size;
		registrys.add(options);
		contextKeys.add(contextKey);
		if (!registry.has(element)) registry.set(element, registrys);
		if (!contextKeyMap.has(element)) contextKeyMap.set(element, contextKeys);
		if (!alreadyRegistered) {
			const cleanup = isDraggable ? _registerDraggable(options) : _registerDropTarget(options);
			cleanupMap.set(element, cleanup);
		}
		return () => {
			var _a2;
			registrys.delete(options);
			contextKeys.delete(contextKey);
			if (!registrys.size) {
				(_a2 = cleanupMap.get(element)) == null || _a2();
				cleanupMap.delete(element);
			}
		};
	};
	const registerDraggable = (contextKey, options) => {
		return register(contextKey, options, true);
	};
	const registerDropTarget = (contextKey, options) => {
		return register(contextKey, options, false);
	};
	const isRegiseredInContext = (contextKey, data) => {
		return isContextData(data) && data[dndContextPropertyKey].includes(contextKey);
	};
	tryOnScopeDispose(() => {
		draggableRegistry.clear();
		dropTargetRegistry.clear();
		draggableContextKeyMap.clear();
		dropTargetContextKeyMap.clear();
		draggableCleanupMap.forEach((cleanup) => cleanup());
		draggableCleanupMap.clear();
		dropTargetCleanupMap.forEach((cleanup) => cleanup());
		dropTargetCleanupMap.clear();
	});
	return {
		registerDraggable,
		registerDropTarget,
		isRegiseredInContext
	};
});
function getMergedData(data, args, registrys) {
	let mergedData = data;
	registrys == null || registrys.forEach((registry) => {
		let getData;
		if ("getInitialData" in registry) getData = registry.getInitialData;
		else if ("getData" in registry) getData = registry.getData;
		if (getData) mergedData = Object.assign(mergedData, getData(args));
	});
	return mergedData;
}
function getMergedBoolean(args, registrys, key, defaultValue) {
	let can = false;
	registrys == null || registrys.forEach((registry) => {
		var _a, _b;
		if ((_b = (_a = registry[key]) == null ? void 0 : _a.call(registry, args)) != null ? _b : defaultValue) can = true;
	});
	return can;
}
function callEventHandlers(args, registrys, key) {
	registrys == null || registrys.forEach((registry) => {
		var _a;
		(_a = registry[key]) == null || _a.call(registry, args);
	});
}
var contextKeySeed = 0;
function genContextKey() {
	return contextKeySeed++;
}
function useDndContext(options) {
	const { monitor = true, onDrag, onDragOfTarget, onDragEnter, onDragStart, onDragLeave, onDrop, onDropOfTarget } = options != null ? options : {};
	const { registerDraggable: _registerDraggable, registerDropTarget: _registerDropTarget, isRegiseredInContext } = useContextRegistry();
	const draggableCleanups = /* @__PURE__ */ new Set();
	const dropTargetCleanups = /* @__PURE__ */ new Set();
	const key = genContextKey();
	let monitorCleanup;
	if (monitor) {
		const { canMonitor, onDrag: monitorOnDrag, onDragStart: monitorOnDragStart, onDrop: monitorOnDrop, ...rest } = monitor === true ? {} : monitor;
		monitorCleanup = monitorForElements({
			...rest,
			canMonitor(args) {
				const { source } = args;
				const isRegistered = isRegiseredInContext(key, source.data);
				return canMonitor ? canMonitor(args) && isRegistered : isRegistered;
			},
			onDrag(args) {
				monitorOnDrag == null || monitorOnDrag(args);
				onDrag == null || onDrag(args);
			},
			onDragStart(args) {
				monitorOnDragStart == null || monitorOnDragStart(args);
				onDragStart == null || onDragStart(args);
			},
			onDrop(args) {
				monitorOnDrop == null || monitorOnDrop(args);
				onDrop == null || onDrop(args);
			}
		});
	}
	const registerDraggable = (options2) => {
		const { onDrag: itemOnDrag, onDragStart: itemOnDragStart, onDrop: itemOnDrop, ...rest } = options2;
		const cleanup = _registerDraggable(key, {
			...rest,
			onDrag(args) {
				itemOnDrag == null || itemOnDrag(args);
				if (!monitor) onDrag == null || onDrag(args);
			},
			onDrop(args) {
				if (!monitor) onDrop == null || onDrop(args);
				itemOnDrop == null || itemOnDrop(args);
			},
			onDragStart(args) {
				itemOnDragStart == null || itemOnDragStart(args);
				if (!monitor) onDragStart == null || onDragStart(args);
			}
		});
		draggableCleanups.add(cleanup);
		return () => {
			cleanup();
			draggableCleanups.delete(cleanup);
		};
	};
	const registerDropTarget = (options2) => {
		const { onDrop: itemOnDrop, onDrag: itemOnDrag, onDragEnter: itemOnDragEneter, onDragLeave: itemOnDragLeave, ...rest } = options2;
		const cleanup = _registerDropTarget(key, {
			...rest,
			onDrop(args) {
				itemOnDrop == null || itemOnDrop(args);
				onDropOfTarget == null || onDropOfTarget(args);
			},
			onDrag(args) {
				itemOnDrag == null || itemOnDrag(args);
				onDragOfTarget == null || onDragOfTarget(args);
			},
			onDragEnter(args) {
				const { source } = args;
				if (!isRegiseredInContext(key, source.data)) return;
				itemOnDragEneter == null || itemOnDragEneter(args);
				onDragEnter == null || onDragEnter(args);
			},
			onDragLeave(args) {
				itemOnDragLeave == null || itemOnDragLeave(args);
				onDragLeave == null || onDragLeave(args);
			}
		});
		dropTargetCleanups.add(cleanup);
		return () => {
			cleanup();
			dropTargetCleanups.delete(cleanup);
		};
	};
	const destroy = () => {
		draggableCleanups.forEach((cleanup) => cleanup());
		dropTargetCleanups.forEach((cleanup) => cleanup());
		draggableCleanups.clear();
		dropTargetCleanups.clear();
		monitorCleanup == null || monitorCleanup();
	};
	tryOnScopeDispose(() => {
		destroy();
	});
	return {
		registerDraggable,
		registerDropTarget
	};
}
var dndSortableToken = Symbol("dndSortableToken");
var dndSortableItemToken = Symbol("dndSortableItemToken");
var CDK_DND_SORTABLE_TOKEN = Symbol("CDK_DND_SORTABLE_TOKEN");
var dndSortableProps = {
	tag: [
		String,
		Object,
		Function
	],
	strategy: {
		type: String,
		default: void 0
	},
	dataSource: {
		type: Array,
		default: () => []
	},
	direction: {
		type: String,
		default: "vertical"
	},
	effect: {
		type: String,
		default: "indicator"
	},
	preview: {
		type: [
			Boolean,
			String,
			Object
		],
		default: void 0
	},
	getKey: {
		type: [Function, String],
		default: "key"
	},
	childrenKey: String,
	treeIndent: {
		type: Number,
		default: void 0
	},
	isSticky: {
		type: [Boolean, Function],
		default: void 0
	},
	isTreeItemExpanded: Function,
	canDrag: {
		type: [Boolean, Function],
		default: true
	},
	canDrop: {
		type: [Boolean, Function],
		default: true
	},
	onDragStart: [Function, Array],
	onDrag: [Function, Array],
	onDragEnter: [Function, Array],
	onDragLeave: [Function, Array],
	onDrop: [Function, Array],
	onSortReorder: [Function, Array],
	onSortChange: [Function, Array]
};
var dndSortableItemProps = {
	tag: {
		type: [
			String,
			Object,
			Function
		],
		default: "div"
	},
	itemKey: {
		type: [
			String,
			Number,
			Symbol
		],
		required: true
	},
	direction: String,
	isSticky: {
		type: [Boolean, Function],
		default: void 0
	},
	canDrag: {
		type: [Boolean, Function],
		default: true
	},
	canDrop: {
		type: [Boolean, Function],
		default: true
	},
	onDragStart: [Function, Array],
	onDrag: [Function, Array],
	onDragEnter: [Function, Array],
	onDragLeave: [Function, Array],
	onDrop: [Function, Array]
};
function createListStrategyContext(options) {
	const { dataSource, getKey, direction, setDraggingOverState } = options;
	const dataMap = computed(() => {
		const map = /* @__PURE__ */ new Map();
		dataSource.value.forEach((data, index) => {
			const key = getKey.value(data);
			map.set(key, {
				...data,
				_data_index: index
			});
		});
		return map;
	});
	const getData = (key) => dataMap.value.get(key);
	const getDataIndex = (key) => {
		var _a;
		return (_a = dataMap.value.get(key)) == null ? void 0 : _a._data_index;
	};
	const dataExists = (key) => dataMap.value.has(key);
	const getDropTargetData = (args, data) => {
		const { input, element } = args;
		const { direction: itemDirection } = data;
		return attachClosestEdge(data, {
			input,
			element,
			allowedEdges: (itemDirection != null ? itemDirection : direction.value) === "vertical" ? ["top", "bottom"] : ["left", "right"]
		});
	};
	const reorder2 = ({ sourceData, targetData }) => {
		const sourceIndex = sourceData.listDataIndex;
		const targetIndex = targetData.listDataIndex;
		const itemDirection = targetData.direction;
		const finishIndex = getReorderDestinationIndex({
			startIndex: sourceIndex,
			closestEdgeOfTarget: extractClosestEdge(targetData),
			indexOfTarget: targetIndex,
			axis: itemDirection != null ? itemDirection : direction.value
		});
		if (finishIndex === sourceIndex) return null;
		const oldDataSource = toRaw(dataSource.value);
		const reorderInfo = {
			sourceIndex,
			targetIndex,
			sourceKey: sourceData.key,
			targetKey: targetData.key,
			sourceData: sourceData.listData,
			targetData: targetData.listData,
			operation: finishIndex === targetIndex ? "insertAfter" : "insertBefore"
		};
		return {
			newData: reorderList(oldDataSource, reorderInfo),
			oldData: oldDataSource,
			reorderInfo
		};
	};
	const onDragOfTarget = (args) => {
		var _a;
		const { self, source } = args;
		const sourceData = source.data;
		const targetData = self.data;
		if (source.element === self.element || !isDndSortableTransferData(sourceData) || !isDndSortableTransferData(targetData)) {
			setDraggingOverState(null);
			return;
		}
		const sourceIndex = sourceData.listDataIndex;
		const targetIndex = targetData.listDataIndex;
		const mergedDirection = (_a = targetData.direction) != null ? _a : direction.value;
		const edge = extractClosestEdge(targetData);
		const isItemBeforeSource = targetIndex === sourceIndex - 1;
		const isItemAfterSource = targetIndex === sourceIndex + 1;
		const [beforeEdge, afterEdge] = mergedDirection === "horizontal" ? ["left", "right"] : ["top", "bottom"];
		if (isItemBeforeSource && edge === afterEdge || isItemAfterSource && edge === beforeEdge) {
			setDraggingOverState(null);
			return;
		}
		setDraggingOverState({
			key: targetData.key,
			data: targetData.listData,
			index: targetIndex,
			instruction: edge ? { edge } : null
		});
	};
	const onDragLeave = () => {
		setDraggingOverState(null);
	};
	const onDrop = () => {
		setDraggingOverState(null);
	};
	return {
		getData,
		getDataIndex,
		dataExists,
		getDropTargetData,
		reorder: reorder2,
		eventHandlers: {
			onDragOfTarget,
			onDragLeave,
			onDrop
		}
	};
}
function createTreeStrategyContext(options) {
	const { dataSource, getKey, childrenKey, treeIndent, isTreeItemExpanded, setDraggingOverState } = options;
	const dataContext = computed(() => {
		const dataMap = /* @__PURE__ */ new Map();
		const parentKeyMap = /* @__PURE__ */ new Map();
		const depthMap = /* @__PURE__ */ new Map();
		traverseTree(dataSource.value, childrenKey.value, (item, parents, index) => {
			const key = getKey.value(item);
			const parent = parents[0];
			dataMap.set(key, {
				...item,
				_data_index: index
			});
			depthMap.set(key, parents.length);
			if (parent) parentKeyMap.set(key, getKey.value(parent));
		});
		return {
			dataMap,
			parentKeyMap,
			depthMap
		};
	});
	const pathToItemCache = /* @__PURE__ */ new Map();
	const isLastInGroupCache = /* @__PURE__ */ new Map();
	const getPathToItem = (key) => {
		if (pathToItemCache.has(key)) return pathToItemCache.get(key);
		const path = [];
		let current = key;
		while (!isNil(current)) {
			path.unshift(current);
			current = dataContext.value.parentKeyMap.get(current);
		}
		pathToItemCache.set(key, path);
		return path;
	};
	const getIsLastInGroup = (key) => {
		var _a;
		if (isLastInGroupCache.has(key)) return isLastInGroupCache.get(key);
		const parentKey = dataContext.value.parentKeyMap.get(key);
		const dataArray = isNil(parentKey) ? dataSource.value : (_a = getData(parentKey)[childrenKey.value]) != null ? _a : [];
		const isLastInGroup = getDataIndex(key) === dataArray.length - 1;
		isLastInGroupCache.set(key, isLastInGroup);
		return isLastInGroup;
	};
	watch(dataContext, () => {
		pathToItemCache.clear();
		isLastInGroupCache.clear();
	});
	const getData = (key) => dataContext.value.dataMap.get(key);
	const getDataIndex = (key) => {
		var _a;
		return (_a = dataContext.value.dataMap.get(key)) == null ? void 0 : _a._data_index;
	};
	const dataExists = (key) => dataContext.value.dataMap.has(key);
	const getDropTargetData = (args, targetData) => {
		const { input, element, source } = args;
		const { key } = targetData;
		const sourceKey = source.data.key;
		const targetKey = targetData.key;
		const targetTreeData = targetData.listData;
		const isTargetChildrenOfSource = getPathToItem(targetKey).includes(sourceKey);
		return attachInstruction(targetData, {
			input,
			element,
			indentPerLevel: treeIndent.value,
			currentLevel: dataContext.value.depthMap.get(key),
			mode: (isTreeItemExpanded == null ? void 0 : isTreeItemExpanded(key, targetTreeData)) ? "expanded" : getIsLastInGroup(key) ? "last-in-group" : "standard",
			block: isTargetChildrenOfSource ? [
				"make-child",
				"reorder-above",
				"reorder-below",
				"reparent"
			] : !isArray(targetTreeData[childrenKey.value]) ? ["make-child"] : void 0
		});
	};
	const reorder2 = ({ sourceData, targetData }) => {
		const instruction = extractInstruction(targetData);
		if (!instruction) return null;
		const sourceKey = sourceData.key;
		const targetKey = targetData.key;
		const sourceIndex = sourceData.listDataIndex;
		const targetIndex = targetData.listDataIndex;
		const oldData = toRaw(dataSource.value);
		let reorderInfo;
		const pathToItem = getPathToItem(targetKey);
		if (pathToItem.includes(sourceKey)) return null;
		if (instruction.type === "reparent") {
			const desiredKey = pathToItem[instruction.desiredLevel];
			if (isNil(desiredKey)) return null;
			reorderInfo = {
				sourceIndex,
				targetIndex: getDataIndex(desiredKey),
				sourceKey,
				targetKey: desiredKey,
				sourceData: sourceData.listData,
				targetData: getData(desiredKey),
				operation: "insertAfter"
			};
		} else if (instruction.type === "make-child") reorderInfo = {
			sourceIndex,
			targetIndex,
			sourceKey,
			targetKey,
			sourceData: sourceData.listData,
			targetData,
			operation: "insertChild"
		};
		else if (instruction.type === "reorder-above") reorderInfo = {
			sourceIndex,
			targetIndex,
			sourceKey,
			targetKey,
			sourceData: sourceData.listData,
			targetData,
			operation: "insertBefore"
		};
		else if (instruction.type === "reorder-below") reorderInfo = {
			sourceIndex,
			targetIndex,
			sourceKey,
			targetKey,
			sourceData: sourceData.listData,
			targetData,
			operation: "insertAfter"
		};
		if (!reorderInfo) return null;
		return {
			oldData,
			newData: reorderTree(oldData, reorderInfo, childrenKey.value, getKey.value),
			reorderInfo
		};
	};
	const onDragOfTarget = (args) => {
		const { self, source } = args;
		const sourceData = source.data;
		const targetData = self.data;
		if (!isDndSortableTransferData(sourceData) || !isDndSortableTransferData(targetData)) {
			setDraggingOverState(null);
			return;
		}
		const targetIndex = targetData.listDataIndex;
		const instruction = extractInstruction(targetData);
		const { parentKeyMap, depthMap } = dataContext.value;
		const targetKey = targetData.key;
		const parentKey = parentKeyMap.get(targetKey);
		if (sourceData.key !== targetData.key || (instruction == null ? void 0 : instruction.type) === "reparent") {
			setDraggingOverState({
				key: targetKey,
				data: targetData,
				index: targetIndex,
				instruction: instruction ? {
					...instruction,
					parent: !isNil(parentKey) ? {
						key: parentKey,
						level: depthMap.get(parentKey)
					} : void 0
				} : null
			});
			return;
		}
		setDraggingOverState(null);
	};
	const onDragLeave = () => {
		setDraggingOverState(null);
	};
	const onDrop = () => {
		setDraggingOverState(null);
	};
	return {
		getData,
		getDataIndex,
		getDropTargetData,
		dataExists,
		reorder: reorder2,
		eventHandlers: {
			onDragOfTarget,
			onDragLeave,
			onDrop
		}
	};
}
function useDndSortableStrategy(options, mergedDirection, mergedGetKey) {
	const { dataSource, childrenKey, treeIndent, strategy, isTreeItemExpanded } = options;
	const [draggingOverState, setDraggingOverState] = useState(null);
	let contextScope;
	const context = { draggingOverState };
	const resolvedStrategy = computed(() => {
		const _strategy = isRef(strategy) ? strategy.value : strategy;
		return _strategy != null ? _strategy : defaultSortableStrategy;
	});
	const mergedChildrenKey = computed(() => {
		const _childrenKey = isRef(childrenKey) ? childrenKey.value : childrenKey;
		return _childrenKey != null ? _childrenKey : defaultChildrenKey;
	});
	const mergedTreeIndent = computed(() => {
		const _treeIndent = isRef(treeIndent) ? treeIndent.value : treeIndent;
		return _treeIndent != null ? _treeIndent : defaultTreeIndent;
	});
	watch(resolvedStrategy, (strategy2) => {
		contextScope == null || contextScope.dispose();
		if (strategy2 === "tree") {
			const scope = createContextScope(createTreeStrategyContext);
			contextScope = scope;
			Object.assign(context, scope.run({
				dataSource,
				getKey: mergedGetKey,
				childrenKey: mergedChildrenKey,
				treeIndent: mergedTreeIndent,
				setDraggingOverState,
				isTreeItemExpanded
			}));
		} else {
			const scope = createContextScope(createListStrategyContext);
			contextScope = scope;
			Object.assign(context, scope.run({
				dataSource,
				direction: mergedDirection,
				getKey: mergedGetKey,
				setDraggingOverState
			}));
		}
	}, { immediate: true });
	return context;
}
function createContextScope(fn) {
	let scope = effectScope();
	let state;
	const run = (...args) => {
		if (!scope) return;
		if (state) return state;
		state = scope.run(() => fn(...args));
		return state;
	};
	const dispose = () => {
		scope == null || scope.stop();
		state = void 0;
		scope = void 0;
	};
	tryOnScopeDispose(() => {
		dispose();
	});
	return {
		run,
		dispose
	};
}
function useGetKey$1(getKey) {
	return computed(() => {
		const _getKey = getKey == null ? void 0 : getKey.value;
		if (isString(_getKey)) return (item) => {
			const key = item[_getKey];
			if (key === void 0) Logger.warn("cdk/dnd", "Each item in dataSource should have a unique `key` prop.");
			return key;
		};
		return _getKey;
	});
}
function useDndSortable(options) {
	const { getKey, direction, preview, isSticky, canDrag, canDrop, onDrag, onDragStart, onDragEnter, onDragLeave, onDrop, onSortReorder, onSortChange } = options;
	const mergedGetKey = useGetKey$1(getKey);
	const mergedDirection = computed(() => {
		if (!(direction == null ? void 0 : direction.value)) return "vertical";
		return direction.value;
	});
	const [draggingState, setDraggingState] = useState(null);
	const strategyContext = useDndSortableStrategy(options, mergedDirection, mergedGetKey);
	const getListData = (key) => strategyContext.getData(key);
	const getListDataIndex = (key) => strategyContext.getDataIndex(key);
	const listDataExists = (key) => strategyContext.dataExists(key);
	const reorderDataSource = (args) => {
		const result = strategyContext.reorder(args);
		if (!result) return;
		const { newData, oldData, reorderInfo } = result;
		onSortReorder == null || onSortReorder(reorderInfo);
		onSortChange == null || onSortChange(newData, oldData);
	};
	const { registerDraggable: _registerDraggable, registerDropTarget: _registerDropTarget } = useDndContext({
		monitor: true,
		onDragStart(args) {
			var _a, _b;
			const { source, location } = args;
			const sourceData = source.data;
			if (!isDndSortableTransferData(sourceData)) return;
			(_b = (_a = strategyContext.eventHandlers).onDragStart) == null || _b.call(_a, args);
			setDraggingState({
				key: sourceData.key,
				data: sourceData.listData,
				index: sourceData.listDataIndex
			});
			callEventHandler(onDragStart, sourceData, location);
		},
		onDrag(args) {
			var _a, _b;
			const { source, location } = args;
			const sourceData = source.data;
			(_b = (_a = strategyContext.eventHandlers).onDrag) == null || _b.call(_a, args);
			callEventHandler(onDrag, sourceData, location);
		},
		onDragOfTarget(args) {
			var _a, _b;
			(_b = (_a = strategyContext.eventHandlers).onDragOfTarget) == null || _b.call(_a, args);
		},
		onDragEnter(args) {
			var _a, _b;
			const { self, source, location } = args;
			(_b = (_a = strategyContext.eventHandlers).onDragEnter) == null || _b.call(_a, args);
			callEventHandlerWithSource(onDragEnter, self.data, source.data, location);
		},
		onDragLeave(args) {
			var _a, _b;
			const { self, source, location } = args;
			(_b = (_a = strategyContext.eventHandlers).onDragLeave) == null || _b.call(_a, args);
			callEventHandlerWithSource(onDragLeave, self.data, source.data, location);
		},
		onDrop(args) {
			var _a, _b;
			const { source, location } = args;
			setDraggingState(null);
			(_b = (_a = strategyContext.eventHandlers).onDrop) == null || _b.call(_a, args);
			const target = location.current.dropTargets[0];
			if (!target) {
				callEventHandlerWithSource(onDrop, void 0, void 0, location);
				return;
			}
			const sourceData = source.data;
			const targetData = target.data;
			if (!isDndSortableTransferData(sourceData) || !isDndSortableTransferData(targetData)) {
				callEventHandlerWithSource(onDrop, targetData, sourceData, location);
				return;
			}
			if (listDataExists(mergedGetKey.value(sourceData.listData)) && listDataExists(mergedGetKey.value(targetData.listData))) reorderDataSource({
				sourceData,
				targetData
			});
			callEventHandlerWithSource(onDrop, targetData, sourceData, location);
		}
	});
	const registerDraggable = (options2) => {
		const { getInitialData, canDrag: innerCanDrag, key, onGenerateDragPreview, preview: itemPreview, ...rest } = options2;
		return _registerDraggable({
			...rest,
			getInitialData(args) {
				var _a;
				const listData = getListData(key);
				const listDataIndex = getListDataIndex(key);
				return {
					...(_a = getInitialData == null ? void 0 : getInitialData(args)) != null ? _a : {},
					key,
					listData,
					listDataIndex
				};
			},
			canDrag(args) {
				var _a, _b;
				if (!listDataExists(key)) return false;
				if (!canDrag && !innerCanDrag) return true;
				const sourceData = getListData(key);
				const sourceIndex = getListDataIndex(key);
				const canDragOptions = {
					sourceKey: key,
					sourceData,
					sourceIndex
				};
				const listCanDrag = canDrag ? (_a = canDrag(canDragOptions)) != null ? _a : true : true;
				const itemCanDrag = innerCanDrag ? (_b = innerCanDrag({
					...args,
					...canDragOptions
				})) != null ? _b : true : true;
				return listCanDrag && itemCanDrag;
			},
			onGenerateDragPreview(args) {
				if (onGenerateDragPreview) {
					onGenerateDragPreview(args);
					return;
				}
				const { nativeSetDragImage, source: { data: sourceData } } = args;
				if (!isDndSortableTransferData(sourceData)) return;
				const listPreview = preview == null ? void 0 : preview.value;
				if (listPreview === false || itemPreview === false) {
					disableNativeDragPreview({ nativeSetDragImage });
					return;
				}
				const mergedPreview = itemPreview != null ? itemPreview : listPreview;
				if (mergedPreview === true || !mergedPreview) return;
				const { offset, mount, unmount } = mergedPreview;
				setCustomNativeDragPreview({
					nativeSetDragImage,
					getOffset: offset ? pointerOutsideOfPreview({
						x: convertCssPixel(offset.x),
						y: convertCssPixel(offset.y)
					}) : void 0,
					render({ container }) {
						const previewState = {
							key,
							data: sourceData.listData,
							index: sourceData.listDataIndex,
							container
						};
						Object.assign(container.style, {
							width: "1000px",
							height: "1000px"
						});
						mount == null || mount(previewState);
						return () => {
							unmount == null || unmount(previewState);
						};
					}
				});
			}
		});
	};
	const registerDropTarget = (options2) => {
		const { key, element, direction: direction2, canDrop: innerCanDrop, isSticky: itemIsSticky, getIsSticky, getData, onDrag: onDrag2, onDragLeave: onDragLeave2, onDrop: onDrop2, ...rest } = options2;
		return _registerDropTarget({
			element,
			...rest,
			getData(args) {
				var _a;
				const listData = getListData(key);
				const listDataIndex = getListDataIndex(key);
				const data = {
					...(_a = getData == null ? void 0 : getData(args)) != null ? _a : {},
					key,
					direction: direction2,
					listData,
					listDataIndex
				};
				return strategyContext.getDropTargetData ? strategyContext.getDropTargetData(args, data) : data;
			},
			getIsSticky(args) {
				var _a;
				if (getIsSticky) return getIsSticky(args);
				const options3 = {
					key,
					data: getListData(key),
					index: getListDataIndex(key)
				};
				return !!((_a = itemIsSticky == null ? void 0 : itemIsSticky(options3)) != null ? _a : isSticky == null ? void 0 : isSticky(options3));
			},
			canDrop(args) {
				var _a, _b, _c;
				if (!listDataExists(key)) return false;
				if (!canDrop && !innerCanDrop) return true;
				const targetData = getListData(key);
				const targetIndex = getListDataIndex(key);
				const { key: sourceKey, data: sourceData, index: sourceIndex } = (_a = draggingState.value) != null ? _a : {};
				const canDropOptions = {
					sourceKey,
					sourceData,
					sourceIndex,
					targetKey: key,
					targetData,
					targetIndex
				};
				const listCanDrop = canDrop ? (_b = canDrop(canDropOptions)) != null ? _b : true : true;
				const itemCanDrop = innerCanDrop ? (_c = innerCanDrop({
					...args,
					...canDropOptions
				})) != null ? _c : true : true;
				return listCanDrop && itemCanDrop;
			}
		});
	};
	return {
		registerDraggable,
		registerDropTarget,
		draggingState,
		draggingOverState: strategyContext.draggingOverState
	};
}
var lastMovedKeyMostWaitTime = 3e3;
var DndSortable = /* @__PURE__ */ defineComponent({
	name: "DndSortable",
	props: dndSortableProps,
	setup(props, { slots }) {
		const dataSource = toRef(props, "dataSource");
		const direction = toRef(props, "direction");
		const getKey = toRef(props, "getKey");
		const childrenKey = toRef(props, "childrenKey");
		const treeIndent = toRef(props, "treeIndent");
		const mergedGetKey = useGetKey$1(getKey);
		const mergedStrategy = computed(() => {
			var _a;
			return (_a = props.strategy) != null ? _a : defaultSortableStrategy;
		});
		const mergedEffect = computed(() => {
			var _a;
			return (_a = props.effect) != null ? _a : defaultSortableEffect;
		});
		const [lastMovedKey, setLastMovedKey] = useState(void 0);
		const [previewState, setPreviewState] = useState(null);
		const mergedCanDrag = getMergedCanFn(() => props.canDrag);
		const mergedCanDrop = getMergedCanFn(() => props.canDrop);
		const mergedIsSticky = getMergedCanFn(() => props.isSticky);
		let tempLastMovedKey;
		let tempLastMovedKeySetTmr;
		watch(() => props.dataSource, () => {
			if (!isNil(tempLastMovedKey)) {
				clearTimeout(tempLastMovedKeySetTmr);
				setLastMovedKey(tempLastMovedKey);
				tempLastMovedKey = void 0;
				setTimeout(() => {
					setLastMovedKey(void 0);
				}, 10);
			}
		}, { deep: true });
		const onSortReorder = (reorderInfo) => {
			const { sourceKey } = reorderInfo;
			clearTimeout(tempLastMovedKeySetTmr);
			tempLastMovedKey = sourceKey;
			tempLastMovedKeySetTmr = setTimeout(() => {
				tempLastMovedKey = void 0;
			}, lastMovedKeyMostWaitTime);
			callEmit(props.onSortReorder, reorderInfo);
		};
		const onSortChange = (newDataSource, oldDataSource) => {
			callEmit(props.onSortChange, newDataSource, oldDataSource);
		};
		const previewMount = (state) => {
			setPreviewState(state);
		};
		const previewUnmount = () => {
			setPreviewState(null);
		};
		const dndSortableContext = useDndSortable({
			strategy: mergedStrategy,
			dataSource,
			direction,
			getKey: mergedGetKey,
			childrenKey,
			treeIndent,
			preview: computed(() => {
				if (isNil(props.preview) || props.preview === "native") return true;
				if (props.preview === false) return false;
				if (props.preview === true) return {
					mount: previewMount,
					unmount: previewUnmount
				};
				return {
					offset: props.preview.offset,
					mount: previewMount,
					unmount: previewUnmount
				};
			}),
			isTreeItemExpanded: props.isTreeItemExpanded,
			canDrag: mergedCanDrag,
			canDrop: mergedCanDrop,
			isSticky: mergedIsSticky,
			onDragStart(args) {
				callEmit(props.onDragStart, args);
			},
			onDrag(args) {
				callEmit(props.onDrag, args);
			},
			onDragEnter(args) {
				callEmit(props.onDragEnter, args);
			},
			onDragLeave(args) {
				callEmit(props.onDragLeave, args);
			},
			onDrop(args) {
				callEmit(props.onDrop, args);
			},
			onSortChange,
			onSortReorder
		});
		provide(dndSortableToken, {
			...dndSortableContext,
			lastMovedKey,
			mergedStrategy,
			mergedEffect
		});
		provide(CDK_DND_SORTABLE_TOKEN, {
			draggingState: dndSortableContext.draggingState,
			draggingOverState: dndSortableContext.draggingOverState
		});
		return () => {
			var _a;
			const Tag = props.tag;
			const preview = previewState.value;
			const contentNodes = [(_a = slots.default) == null ? void 0 : _a.call(slots), preview && createVNode(Teleport, { "to": preview == null ? void 0 : preview.container }, { default: () => {
				var _a2;
				return [(_a2 = slots.preview) == null ? void 0 : _a2.call(slots, preview)];
			} })];
			return Tag ? createVNode(Tag, null, { default: () => [contentNodes] }) : createVNode(Fragment, null, [contentNodes]);
		};
	}
});
var DndSortableHandle = /* @__PURE__ */ defineComponent({
	name: "DndSortableHandle",
	setup(_, { slots }) {
		const { setDragHandle } = inject(dndSortableItemToken);
		const dragHandleRef = shallowRef();
		onMounted(() => {
			setDragHandle(dragHandleRef.value);
		});
		onUnmounted(() => {
			setDragHandle(void 0);
		});
		return () => {
			var _a;
			return createVNode("div", {
				"class": "cdk-dnd-sortable-handle",
				"ref": dragHandleRef
			}, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
		};
	}
});
var DndSortableItem = /* @__PURE__ */ defineComponent({
	name: "DndSortableItem",
	props: dndSortableItemProps,
	setup(props, { slots }) {
		const { mergedStrategy, mergedEffect, draggingOverState, draggingState, lastMovedKey, registerDraggable, registerDropTarget } = inject(dndSortableToken);
		const listItemRef = shallowRef();
		const dragHandleRef = shallowRef();
		const mergedCanDrag = getMergedCanFn(() => props.canDrag);
		const mergedCanDrop = getMergedCanFn(() => props.canDrop);
		const mergedIsSticky = getMergedCanFn(() => props.isSticky);
		const isDragging = computed(() => {
			var _a;
			return ((_a = draggingState.value) == null ? void 0 : _a.key) === props.itemKey;
		});
		const resolvedDraggingOverState = computed(() => {
			var _a;
			return ((_a = draggingOverState.value) == null ? void 0 : _a.key) === props.itemKey ? draggingOverState.value : null;
		});
		const classes = computed(() => {
			const prefixCls = "cdk-dnd-sortable-item";
			return {
				[prefixCls]: true,
				[`${prefixCls}-dragging`]: isDragging.value,
				[`${prefixCls}-dragging-over`]: !!resolvedDraggingOverState.value
			};
		});
		const setDragHandle = (dragHandle) => {
			dragHandleRef.value = dragHandle;
		};
		const onDragStart = (args) => {
			callEmit(props.onDragStart, args);
		};
		const onDrag = (args) => {
			callEmit(props.onDrag, args);
		};
		const onDragEnter = (args) => {
			callEmit(props.onDragEnter, args);
		};
		const onDragLeave = (args) => {
			callEmit(props.onDragEnter, args);
		};
		const onDrop = (args) => {
			callEmit(props.onDrop, args);
		};
		let cleanUp;
		const init = () => {
			if (!listItemRef.value) return;
			cleanUp == null || cleanUp();
			cleanUp = combine(registerDraggable({
				key: props.itemKey,
				element: listItemRef.value,
				dragHandle: dragHandleRef.value,
				canDrag: mergedCanDrag,
				onDragStart(args) {
					const { source, location } = args;
					callEventHandler(onDragStart, source.data, location);
				},
				onDrag(args) {
					const { source, location } = args;
					callEventHandler(onDrag, source.data, location);
				}
			}), registerDropTarget({
				key: props.itemKey,
				element: listItemRef.value,
				canDrop: mergedCanDrop,
				isSticky: mergedIsSticky,
				onDragEnter(args) {
					const { self, source, location } = args;
					callEventHandlerWithSource(onDragEnter, self.data, source.data, location);
				},
				onDragLeave(args) {
					const { self, source, location } = args;
					callEventHandlerWithSource(onDragLeave, self.data, source.data, location);
				},
				onDrop(args) {
					const { self, source, location } = args;
					callEventHandlerWithSource(onDrop, self.data, source.data, location);
				}
			}));
		};
		const destroy = () => {
			cleanUp == null || cleanUp();
		};
		provide(dndSortableItemToken, { setDragHandle });
		watch([dragHandleRef, () => props.itemKey], init);
		watch([lastMovedKey, () => props.itemKey], ([_lastMovedKey, itemKey]) => {
			if (_lastMovedKey === itemKey && listItemRef.value) triggerPostMoveFlash(listItemRef.value);
		});
		onMounted(init);
		onUnmounted(destroy);
		const renderIndicator = () => {
			if (mergedEffect.value !== "indicator") return;
			const state = draggingOverState.value;
			if (!state) return;
			if (mergedStrategy.value === "list") return renderEdgeIndicator(state, props.itemKey);
			if (mergedStrategy.value === "tree") return renderTreeIndicator(state, props.itemKey);
		};
		return () => {
			var _a;
			const Tag = (_a = props.tag) != null ? _a : "div";
			return createVNode(Tag, {
				"class": classes.value,
				"ref": listItemRef
			}, { default: () => {
				var _a2;
				return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots, {
					isDragging: isDragging.value,
					draggingState: draggingOverState.value,
					draggingOverState: resolvedDraggingOverState.value
				}), renderIndicator()];
			} });
		};
	}
});
function renderEdgeIndicator(state, key) {
	var _a;
	if (state.key !== key) return;
	const edge = (_a = state.instruction) == null ? void 0 : _a.edge;
	if (!edge) return;
	return createVNode(DndBoxIndicator, { "edge": edge }, null);
}
function renderTreeIndicator(state, key) {
	const instruction = state.instruction;
	if (!instruction || instruction.type === "instruction-blocked") return;
	if (instruction.parent && instruction.parent.key === key) return createVNode(DndTreeIndicator, { "instruction": {
		type: "mark-parent",
		currentLevel: instruction.parent.level,
		indentPerLevel: instruction.indentPerLevel
	} }, null);
	if (state.key === key) return createVNode(DndTreeIndicator, { "instruction": instruction }, null);
}
function useDndAutoScroll(elementRef, options) {
	let cleanUp;
	const resolvedOptions = computed(() => {
		const resolvedOptions2 = isRef(options) ? options.value : options;
		const { canScroll = true, maxScrollSpeed = "standard", allowedAxis = "all" } = resolvedOptions2 != null ? resolvedOptions2 : {};
		return {
			canScroll,
			maxScrollSpeed,
			allowedAxis
		};
	});
	watch(elementRef, (element) => {
		cleanUp == null || cleanUp();
		if (!element) return;
		cleanUp = autoScrollForElements({
			element,
			canScroll() {
				return resolvedOptions.value.canScroll;
			},
			getConfiguration() {
				return { maxScrollSpeed: resolvedOptions.value.maxScrollSpeed };
			},
			getAllowedAxis() {
				return resolvedOptions.value.allowedAxis;
			}
		});
	}, {
		immediate: true,
		deep: true
	});
	tryOnScopeDispose(() => {
		cleanUp == null || cleanUp();
	});
}
var CdkDndSortable = DndSortable;
var CdkDndSortableItem = DndSortableItem;
var CdkDndSortableHandle = DndSortableHandle;
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/scroll/index.js
function getScroll(target = window) {
	if (target === window) return {
		scrollTop: target.scrollY || document.documentElement.scrollTop,
		scrollLeft: target.scrollX || document.documentElement.scrollLeft
	};
	else {
		const { scrollTop, scrollLeft } = target;
		return {
			scrollTop,
			scrollLeft
		};
	}
}
var scrollTo = (options = {}) => {
	const { amountOfLeft, scrollLeft, amountOfTop, scrollTop, target = window, duration = 0, easing = easeInOutCubic, callback } = options;
	if (isNil(amountOfLeft) && isNil(scrollLeft) && isNil(amountOfTop) && isNil(scrollTop)) return;
	const { scrollLeft: originScrollLeft, scrollTop: originScrollTop } = getScroll(target);
	const startTime = Date.now();
	const frameFunc = () => {
		const time = Date.now() - startTime;
		const elapsed = time > duration ? duration : time;
		const leftChange = amountOfLeft != null ? amountOfLeft : !isNil(scrollLeft) ? scrollLeft - originScrollLeft : 0;
		const nextScrollLeft = leftChange !== 0 ? easing(elapsed, originScrollLeft, leftChange, duration) : originScrollLeft;
		const topChange = amountOfTop != null ? amountOfTop : !isNil(scrollTop) ? scrollTop - originScrollTop : 0;
		const nextScrollTop = topChange !== 0 ? easing(elapsed, originScrollTop, topChange, duration) : originScrollTop;
		if (target === window) target.scrollTo(nextScrollLeft, nextScrollTop);
		else {
			target.scrollLeft = nextScrollLeft;
			target.scrollTop = nextScrollTop;
		}
		if (time < duration) rAF(frameFunc);
		else if (typeof callback === "function") callback();
	};
	duration ? rAF(frameFunc) : frameFunc();
};
function useScrollbarState(props, scrollbarRef, thumbRef) {
	const [scrollbarSize, setScrollbarSize] = useState(0);
	useResizeObserver(scrollbarRef, ({ contentRect }) => {
		setScrollbarSize(props.horizontal ? contentRect.width : contentRect.height);
	});
	const thumbSize = computed(() => getThumbSize(props.thumbMinSize, scrollbarSize.value, props.containerSize, props.scrollRange));
	const enabledScrollRange = computed(() => Math.max(props.scrollRange - props.containerSize, 0));
	const enabledOffsetRange = computed(() => Math.max(scrollbarSize.value - thumbSize.value, 0));
	const offset = computed(() => {
		if (props.scrollOffset === 0 || enabledOffsetRange.value === 0) return 0;
		return props.scrollOffset / enabledScrollRange.value * enabledOffsetRange.value;
	});
	const canScroll = computed(() => enabledScrollRange.value > 0);
	const [isDragging, setIsDragging] = useState(false);
	const [startOffset, setStartOffset] = useState(0);
	const [pageXY, setPageXY] = useState(0);
	let rafId;
	const onThumbMouseDown = (evt) => {
		setIsDragging(true);
		setPageXY(getPageXY(evt, props.horizontal));
		setStartOffset(offset.value);
		callEmit(props.onMoveStart);
		evt.stopPropagation();
		evt.preventDefault();
	};
	const onMouseMove = (evt) => {
		cancelRAF(rafId);
		if (!isDragging.value) return;
		const _enabledScrollRange = enabledScrollRange.value;
		const movedOffset = getPageXY(evt, props.horizontal) - pageXY.value;
		const newOffset = startOffset.value + movedOffset;
		const ptg = _enabledScrollRange ? newOffset / enabledOffsetRange.value : 0;
		let newScrollOffset = Math.ceil(ptg * _enabledScrollRange);
		newScrollOffset = Math.max(newScrollOffset, 0);
		newScrollOffset = Math.min(newScrollOffset, _enabledScrollRange);
		rafId = rAF(() => {
			callEmit(props.onScroll, newScrollOffset);
		});
	};
	const onMouseUp = () => {
		setIsDragging(false);
		callEmit(props.onMoveEnd);
	};
	const onScrollbarTouchStart = (evt) => {
		evt.preventDefault();
	};
	let listenerStops = [];
	const clearListeners = () => {
		listenerStops.forEach((stop) => stop());
	};
	onMounted(() => {
		listenerStops = [
			useEventListener(scrollbarRef, "touchstart", onScrollbarTouchStart),
			useEventListener(thumbRef, "touchstart", onThumbMouseDown),
			useEventListener(thumbRef, "mousedown", onThumbMouseDown),
			useEventListener(window, "mousemove", onMouseMove),
			useEventListener(window, "touchmove", onMouseMove),
			useEventListener(window, "mouseup", onMouseUp),
			useEventListener(window, "touchend", onMouseUp)
		];
	});
	onBeforeUnmount(() => {
		clearListeners();
		cancelRAF(rafId);
	});
	return {
		canScroll,
		offset,
		thumbSize,
		isDragging
	};
}
function getPageXY(evt, horizontal) {
	return ("touches" in evt ? evt.touches[0] : evt)[horizontal ? "pageX" : "pageY"];
}
function getThumbSize(thumbMinSize, scrollbarSize, containerSize = 0, scrollRange = 0) {
	let baseSize = containerSize / scrollRange * scrollbarSize;
	if (isNaN(baseSize)) baseSize = 0;
	baseSize = Math.max(baseSize, thumbMinSize);
	baseSize = Math.min(baseSize, scrollbarSize);
	return Math.floor(baseSize);
}
var CdkScrollbar = /* @__PURE__ */ defineComponent({
	props: {
		horizontal: {
			type: Boolean,
			default: false
		},
		scrollOffset: {
			type: Number,
			default: 0
		},
		scrollRange: {
			type: Number,
			required: true
		},
		containerSize: {
			type: Number,
			required: true
		},
		thumbMinSize: {
			type: Number,
			default: 10
		},
		containerStyle: { type: Object },
		thumbStyle: { type: Object },
		onScroll: [Function, Array],
		onMoveStart: [Function, Array],
		onMoveEnd: [Function, Array]
	},
	setup(props) {
		const scrollbarRef = ref();
		const thumbRef = ref();
		const { canScroll, offset, isDragging, thumbSize } = useScrollbarState(props, scrollbarRef, thumbRef);
		const classes = computed(() => ({
			"cdk-scrollbar": true,
			"cdk-scrollbar-vertical": !props.horizontal,
			"cdk-scrollbar-horizontal": !!props.horizontal
		}));
		const style = computed(() => normalizeStyle(props.containerStyle));
		const thumbClass = computed(() => ({
			"cdk-scrollbar-thumb": true,
			"cdk-scrollbar-thumb-moving": isDragging.value
		}));
		const thumbStyle = computed(() => {
			const thumbSizeStyle = convertCssPixel(thumbSize.value);
			const offsetSizeStyle = convertCssPixel(offset.value);
			const _style = props.horizontal ? {
				marginLeft: offsetSizeStyle,
				width: thumbSizeStyle
			} : {
				marginTop: offsetSizeStyle,
				height: thumbSizeStyle
			};
			return normalizeStyle([_style, props.thumbStyle]);
		});
		return () => createVNode("div", {
			"ref": scrollbarRef,
			"class": classes.value,
			"style": style.value
		}, [withDirectives(createVNode("div", {
			"ref": thumbRef,
			"class": thumbClass.value,
			"style": thumbStyle.value
		}, null), [[vShow, canScroll.value]])]);
	}
});
function useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight) {
	let lock = false;
	let lockTimeout;
	const lockScroll = () => {
		clearTimeout(lockTimeout);
		lock = true;
		lockTimeout = setTimeout(() => lock = false, 50);
	};
	return (delta, isHorizontal, smoothOffset = false) => {
		const scrolledStart = isHorizontal ? scrolledLeft.value : scrolledTop.value;
		const scrolledEnd = isHorizontal ? scrolledRight.value : scrolledBottom.value;
		const originScroll = delta < 0 && scrolledStart || delta > 0 && scrolledEnd;
		if (smoothOffset && originScroll) {
			clearTimeout(lockTimeout);
			lock = false;
		} else if (!originScroll || lock) lockScroll();
		return !lock && originScroll;
	};
}
var SMOOTH_PTG = 14 / 15;
function useTouchMove(elementRef, scrolledTop, scrolledBottom, scrolledLeft, scrolledRight, callback) {
	let touched = false;
	let touchY = 0;
	let touchX = 0;
	let rafId;
	let interval;
	let listenerStops = [];
	const clearListeners = () => {
		listenerStops.forEach((stop) => stop());
		listenerStops = [];
	};
	const checkScrollLock = useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight);
	const updateOffset = (offset, isHorizontal) => {
		cancelRAF(rafId);
		rafId = rAF(() => {
			callback(offset, isHorizontal);
		});
	};
	const onTouchMove = (evt) => {
		if (!touched) return;
		const currentTouch = evt.touches[0];
		const currentY = currentTouch.pageY;
		const currentX = currentTouch.pageX;
		const offsetX = touchX - currentX;
		const offsetY = touchY - currentY;
		const isHorizontal = Math.abs(offsetX) > Math.abs(offsetY);
		let offset = isHorizontal ? offsetX : offsetY;
		if (checkScrollLock(offset, isHorizontal)) {
			evt.preventDefault();
			return;
		}
		updateOffset(offset, isHorizontal);
		clearInterval(interval);
		interval = setInterval(() => {
			offset = offset * SMOOTH_PTG;
			if (checkScrollLock(offset, isHorizontal) || Math.abs(offset) <= .1) clearInterval(interval);
			else updateOffset(offset, isHorizontal);
		}, 16);
	};
	const onTouchEnd = () => {
		touched = false;
		clearListeners();
	};
	const onTouchStart = (evt) => {
		clearListeners();
		if (evt.touches.length !== 1 || touched) return;
		touched = true;
		const currentTouch = evt.touches[0];
		touchY = currentTouch.pageY;
		touchX = currentTouch.pageX;
		listenerStops = [useEventListener(elementRef, "touchmove", onTouchMove), useEventListener(elementRef, "touchend", onTouchEnd)];
	};
	let stopTouchStart = null;
	const destroy = () => {
		stopTouchStart == null || stopTouchStart();
		stopTouchStart = null;
		clearListeners();
	};
	const init = () => {
		stopTouchStart = useEventListener(elementRef, "touchstart", onTouchStart);
	};
	return {
		init,
		destroy
	};
}
function useWheel(elementRef, scrolledTop, scrolledBottom, scrolledLeft, scrolledRight, callback) {
	let rafId;
	let wheelDirection = null;
	let directionRafId;
	let currentDelta;
	let isFirefoxWheel = false;
	const checkScrollLock = useScrollLock(scrolledTop, scrolledBottom, scrolledLeft, scrolledRight);
	const calcWheelDirectionAndDelta = (evt) => {
		const { deltaX, deltaY, shiftKey } = evt;
		let _deltaX = deltaX;
		let _deltaY = deltaY;
		let _wheelDirection = null;
		if (wheelDirection === "sx" || !wheelDirection && shiftKey && deltaY && !deltaX) {
			_deltaX = deltaY;
			_deltaY = 0;
			_wheelDirection = "sx";
		}
		if (_wheelDirection === null) _wheelDirection = Math.abs(_deltaX) > Math.abs(_deltaY) ? "x" : "y";
		return {
			direction: _wheelDirection,
			delta: _wheelDirection === "x" || _wheelDirection === "sx" ? _deltaX : _deltaY
		};
	};
	const shouldPreventWheelDefault = (direction, delta) => {
		if (direction === "x" || direction === "sx") return delta > 0 ? !scrolledRight.value : !scrolledLeft.value;
		return delta > 0 ? !scrolledBottom.value : !scrolledTop.value;
	};
	const _onWheel = (delta, horizontal) => {
		cancelRAF(rafId);
		currentDelta = delta;
		if (checkScrollLock(delta, horizontal, false)) return;
		rafId = rAF(() => {
			callback(isFirefoxWheel ? 10 * delta : delta, horizontal);
		});
	};
	const onWheel = (evt) => {
		cancelRAF(directionRafId);
		directionRafId = rAF(() => {
			rAF(() => wheelDirection = null);
		});
		const { delta, direction } = calcWheelDirectionAndDelta(evt);
		wheelDirection = direction;
		if (wheelDirection === "x" || wheelDirection === "sx") _onWheel(delta, true);
		else _onWheel(delta, false);
		if (shouldPreventWheelDefault(direction, delta)) evt.preventDefault();
	};
	const onFirefoxWheel = (evt) => {
		isFirefoxWheel = evt.detail === currentDelta;
	};
	const onPixelScroll = (evt) => {
		const { delta, direction } = calcWheelDirectionAndDelta(evt);
		if (shouldPreventWheelDefault(direction, delta)) evt.preventDefault();
	};
	let listenerStops = [];
	const destroy = () => {
		listenerStops.forEach((stop) => stop == null ? void 0 : stop());
		listenerStops = [];
	};
	const init = () => {
		listenerStops = [
			useEventListener(elementRef, "wheel", onWheel),
			useEventListener(elementRef, "DOMMouseScroll", onFirefoxWheel),
			isFirefox$1 ? useEventListener(elementRef.value, "MozMousePixelScroll", onPixelScroll) : void 0
		];
	};
	return {
		init,
		destroy
	};
}
var defaultSimulatedScrollOptions = {
	scrollbarWidth: 0,
	scrollbarHeight: 0
};
function useScroll(elementRef, option) {
	const { updateOnResize = true, syncOnScroll = true, setContainerScroll = true, simulatedScroll = false, onScroll, onScrolledBottom, onScrolledTop, onScrolledLeft, onScrolledRight } = option != null ? option : {};
	const scrolledTop = ref(false);
	const scrolledBottom = ref(false);
	const scrolledLeft = ref(false);
	const scrolledRight = ref(false);
	const scrollTop = ref(0);
	const scrollLeft = ref(0);
	const scrollHeight = ref(0);
	const scrollWidth = ref(0);
	const containerWidth = ref(0);
	const containerHeight = ref(0);
	const horizontalOverflowed = ref(false);
	const verticalOverflowed = ref(false);
	let maxScrollHeight = 0;
	let maxScrollWidth = 0;
	const mergedSimulatedScroll = computed(() => {
		const resolvedSimulatedScroll = isRef(simulatedScroll) ? simulatedScroll.value : simulatedScroll;
		if (!resolvedSimulatedScroll) return false;
		if (resolvedSimulatedScroll === true) return defaultSimulatedScrollOptions;
		return resolvedSimulatedScroll;
	});
	const calcScrollEdge = (emit) => {
		scrolledTop.value = scrollTop.value <= 0;
		scrolledBottom.value = scrollTop.value + containerHeight.value >= scrollHeight.value;
		scrolledLeft.value = scrollLeft.value <= 0;
		scrolledRight.value = scrollLeft.value + containerWidth.value >= scrollWidth.value;
		if (!emit) return;
		if (scrolledTop.value) onScrolledTop == null || onScrolledTop();
		if (scrolledBottom.value) onScrolledBottom == null || onScrolledBottom();
		if (scrolledLeft.value) onScrolledLeft == null || onScrolledLeft();
		if (scrolledRight.value) onScrolledRight == null || onScrolledRight();
	};
	const calcScrollOverflowed = () => {
		let _containerHeight = Math.ceil(containerHeight.value);
		let _containerWidth = Math.ceil(containerWidth.value);
		if (!mergedSimulatedScroll.value) {
			verticalOverflowed.value = scrollHeight.value > _containerHeight;
			horizontalOverflowed.value = scrollWidth.value > _containerWidth;
			return;
		}
		const { scrollbarWidth, scrollbarHeight } = mergedSimulatedScroll.value;
		let _verticalOverflowed = false;
		let _horizontalOverflowed = false;
		const _scrollWidth = scrollWidth.value;
		const _scrollHeight = scrollHeight.value;
		const lastVerticalOverflowed = verticalOverflowed.value;
		const lastHorizontalOverflowed = horizontalOverflowed.value;
		const calc = () => {
			let currentContainerWidth = _containerWidth;
			let currentContainerHeight = _containerHeight;
			const currentVerticalOverflowed = _verticalOverflowed || _scrollHeight > currentContainerHeight;
			if (currentVerticalOverflowed && !_verticalOverflowed && !lastVerticalOverflowed) currentContainerWidth -= scrollbarWidth;
			const currentHorizontalOverflowed = _horizontalOverflowed || _scrollWidth > currentContainerWidth;
			if (currentHorizontalOverflowed && !_horizontalOverflowed && !lastHorizontalOverflowed) currentContainerHeight -= scrollbarHeight;
			_verticalOverflowed = currentVerticalOverflowed;
			_horizontalOverflowed = currentHorizontalOverflowed;
			if (currentContainerWidth !== _containerWidth || currentContainerHeight !== _containerHeight) {
				_containerWidth = currentContainerWidth;
				_containerHeight = currentContainerHeight;
				calc();
			}
		};
		calc();
		verticalOverflowed.value = _verticalOverflowed;
		horizontalOverflowed.value = _horizontalOverflowed;
	};
	const syncScroll = ({ top, left, animationDuration }, _setContainerScroll = false) => {
		const scrollOptions = {
			target: elementRef.value,
			duration: animationDuration != null ? animationDuration : (option == null ? void 0 : option.animationDuration) || 0
		};
		let updated = false;
		update();
		if (!isNil(top)) {
			scrollTop.value = keepInRange(maxScrollHeight, top);
			scrollOptions.scrollTop = scrollTop.value;
			updated = true;
		}
		if (!isNil(left)) {
			scrollLeft.value = keepInRange(maxScrollWidth, left);
			scrollOptions.scrollLeft = scrollLeft.value;
			updated = true;
		}
		if (updated) {
			_setContainerScroll && scrollTo(scrollOptions);
			calcScrollEdge(true);
		}
		return {
			top: scrollTop.value,
			left: scrollLeft.value
		};
	};
	const onScrollChange = (offset, isHorizontal) => {
		if (!elementRef.value) return;
		let scrollOption = {};
		if (isHorizontal) scrollOption = { left: scrollLeft.value + offset };
		else scrollOption = { top: scrollTop.value + offset };
		syncScroll(scrollOption, setContainerScroll);
		onScroll == null || onScroll(scrollTop.value, scrollLeft.value);
	};
	const { init: initWheel, destroy: destroyWheel } = useWheel(elementRef, scrolledTop, scrolledBottom, scrolledLeft, scrolledRight, onScrollChange);
	const { init: initTouchMove, destroy: destroyTouchMove } = useTouchMove(elementRef, scrolledTop, scrolledBottom, scrolledLeft, scrolledRight, onScrollChange);
	let resizeObserverStop = null;
	let onScrollStop = null;
	const update = () => {
		const target = elementRef.value;
		if (!target) return;
		const { scrollHeight: _scrollHeight, scrollWidth: _scrollWidth, clientHeight, clientWidth } = target;
		containerHeight.value = clientHeight;
		containerWidth.value = clientWidth;
		scrollHeight.value = _scrollHeight;
		scrollWidth.value = _scrollWidth;
		maxScrollHeight = _scrollHeight > 0 ? Math.max(_scrollHeight - clientHeight, 0) : 0;
		maxScrollWidth = _scrollWidth > 0 ? Math.max(_scrollWidth - clientWidth, 0) : 0;
	};
	const updateAndCalculate = () => {
		update();
		calcScrollEdge(false);
		calcScrollOverflowed();
	};
	const stop = () => {
		resizeObserverStop == null || resizeObserverStop();
		onScrollStop == null || onScrollStop();
		resizeObserverStop = null;
		onScrollStop = null;
	};
	const init = () => {
		destroy();
		if (updateOnResize) resizeObserverStop = useResizeObserver(elementRef, () => updateAndCalculate());
		else updateAndCalculate();
		if (syncOnScroll) onScrollStop = useEventListener(elementRef, "scroll", () => {
			if (!elementRef.value) return;
			const { scrollLeft: scrollLeft2, scrollTop: scrollTop2 } = elementRef.value;
			syncScroll({
				left: scrollLeft2,
				top: scrollTop2
			});
		});
		if (mergedSimulatedScroll.value) {
			initWheel();
			initTouchMove();
		}
	};
	const destroy = () => {
		stop();
		destroyWheel();
		destroyTouchMove();
	};
	return {
		scrolledTop,
		scrolledBottom,
		scrolledLeft,
		scrolledRight,
		scrollTop,
		scrollLeft,
		scrollHeight,
		scrollWidth,
		containerHeight,
		containerWidth,
		horizontalOverflowed,
		verticalOverflowed,
		syncScroll,
		init,
		update: updateAndCalculate,
		destroy
	};
}
function keepInRange(maxScrollSize, newScrollSize) {
	let newSize = Math.max(newScrollSize, 0);
	if (!Number.isNaN(maxScrollSize)) newSize = Math.min(newSize, maxScrollSize);
	return newSize;
}
function useContainerSize(props, holderRef) {
	const [size, setSize] = useState({
		width: 0,
		height: 0
	});
	useResizeObserver(holderRef, (entry) => {
		const { contentRect: { height, width } } = entry;
		if (height !== size.value.height || width !== size.value.width) setSize({
			height,
			width
		});
	});
	return computed(() => ({
		height: isNumber(props.height) ? props.height : size.value.height,
		width: isNumber(props.width) ? props.width : size.value.width
	}));
}
function useGetKey(props) {
	return computed(() => {
		const getKey = props.getKey;
		if (isString(getKey)) return (item) => {
			const key = item[getKey];
			if (key === void 0) Logger.warn("cdk/scroll", "Each item in dataSource should have a unique `key` prop.");
			return key;
		};
		return getKey;
	});
}
function isRowData(row) {
	return "data" in row;
}
function calcDataHeight(data, getRowHeight, getKey) {
	let height = 0;
	for (const item of data) height += getRowHeight(getKey(item));
	return height;
}
function calcDataWidth(data, getColWidth, getKey) {
	let width = 0;
	for (const row of data) {
		let rowWidth = 0;
		if (!isRowData(row)) rowWidth = 0;
		else {
			const rowKey = getKey(row);
			for (const col of row.data) rowWidth += getColWidth(rowKey, getKey(col));
		}
		width = Math.max(width, rowWidth);
	}
	return width;
}
function isNumArrayEqual(arr1, arr2) {
	return arr1.length === arr2.length && arr1.every((num, idx) => num === arr2[idx]);
}
function useRenderPool(props, topIndex, bottomIndex, leftIndex, rightIndex, getKey) {
	const renderedItems = ref([]);
	const prependedRowKeys = ref([]);
	const prependedColKeys = ref(/* @__PURE__ */ new Map());
	const rowPool = createPool();
	let colPools = {};
	const updatePool = (items, pool, data, start, end, recycleAll) => {
		const inactiveKeys = /* @__PURE__ */ new Set();
		if (recycleAll) items.forEach((item) => {
			inactiveKeys.add(item.key);
			pool.recyclePoolItem(item);
		});
		let updated = false;
		for (const item of items) if (item.index < start || item.index > end || item.isCustomKey) {
			inactiveKeys.add(item.key);
			pool.recyclePoolItem(item);
		}
		updated = !!inactiveKeys.size;
		const poolMap = new Map(items.map((item) => [item.itemKey, item]));
		const poolKeySet = new Set(items.map((item) => item.key));
		const newlyAppendedItems = [];
		const updatePoolItem = (poolItem, item, index, itemKey) => {
			poolItem.item = item;
			poolItem.index = index;
			poolItem.itemKey = itemKey;
			inactiveKeys.delete(poolItem.key);
			updated = true;
			if (!poolKeySet.has(poolItem.key)) items.push(poolItem);
		};
		for (let index = start; index <= end; index++) {
			const item = data[index];
			if (!item) continue;
			const itemKey = getKey.value(item);
			const existedPoolItem = poolMap.get(itemKey);
			if (!isNil(existedPoolItem) && !inactiveKeys.has(existedPoolItem.key)) {
				updatePoolItem(existedPoolItem, item, index, itemKey);
				continue;
			}
			newlyAppendedItems.push({
				item,
				index,
				itemKey
			});
		}
		let i = 0;
		let currentItem = newlyAppendedItems[i];
		while (currentItem) {
			const { item, index, itemKey } = currentItem;
			const poolItem = pool.getPoolItemByItemKey(itemKey);
			if (poolItem) {
				updatePoolItem(poolItem, item, index, itemKey);
				newlyAppendedItems.splice(i, 1);
				currentItem = newlyAppendedItems[i];
			} else currentItem = newlyAppendedItems[++i];
		}
		newlyAppendedItems.forEach(({ item, index, itemKey }) => {
			const poolItem = pool.getPoolItem();
			updatePoolItem(poolItem, item, index, itemKey);
		});
		const recycledItems = [];
		for (const inactiveKey of inactiveKeys) {
			const index = items.findIndex((item) => item.key === inactiveKey);
			if (index > -1) {
				recycledItems.push(items[index]);
				items.splice(index, 1);
			}
		}
		if (updated) items.sort((item1, item2) => item1.index - item2.index);
		return {
			items,
			recycledItems
		};
	};
	const updateColPool = (rowPoolItem, left, right, recycleAll) => {
		var _a;
		if (!isRowData(rowPoolItem.item) || !rowPoolItem.item.data) return [];
		if (!rowPoolItem.cols) rowPoolItem.cols = [];
		let pool = colPools[rowPoolItem.key];
		if (!pool) {
			pool = createPool();
			colPools[rowPoolItem.key] = pool;
		}
		updatePool(rowPoolItem.cols, pool, rowPoolItem.item.data, left, right, recycleAll);
		if (!props.colModifier) return [];
		const renderedCols = rowPoolItem.cols.map((poolItem) => poolItem.item);
		const { start: prependedCols, end: appendedCols } = (_a = props.colModifier(rowPoolItem.item, renderedCols)) != null ? _a : {};
		const currentPrepenedColKeys = [];
		[...prependedCols != null ? prependedCols : []].reverse().forEach(({ data, index, poolKey }) => {
			const poolItem = pool.getPoolItem(poolKey);
			poolItem.item = data;
			poolItem.index = index;
			poolItem.itemKey = getKey.value(data);
			currentPrepenedColKeys.push(poolItem.itemKey);
			rowPoolItem.cols.unshift(poolItem);
		});
		appendedCols == null || appendedCols.forEach(({ data, index, poolKey }) => {
			const poolItem = pool.getPoolItem(poolKey);
			poolItem.item = data;
			poolItem.index = index;
			poolItem.itemKey = getKey.value(data);
			rowPoolItem.cols.push(poolItem);
		});
		return currentPrepenedColKeys;
	};
	const updateRowPool = (top, bottom, recycleAll) => {
		var _a;
		const { recycledItems } = updatePool(renderedItems.value, rowPool, props.dataSource, top, bottom, recycleAll);
		recycledItems.forEach((item) => {
			var _a2;
			const pool = colPools[item.key];
			if (pool) (_a2 = item.cols) == null || _a2.forEach((col) => pool.recyclePoolItem(col));
			item.cols = [];
		});
		if (!props.rowModifier) return [];
		const renderedRows = renderedItems.value.map((item) => item.item);
		const { start: prependedRows, end: appendedRows } = (_a = props.rowModifier(renderedRows)) != null ? _a : {};
		const currentPrepenedRowKeys = [];
		[...prependedRows != null ? prependedRows : []].reverse().forEach(({ data, index, poolKey }) => {
			const poolItem = rowPool.getPoolItem(poolKey);
			poolItem.item = data;
			poolItem.index = index;
			poolItem.itemKey = getKey.value(data);
			currentPrepenedRowKeys.push(poolItem.itemKey);
			renderedItems.value.unshift(poolItem);
		});
		appendedRows == null || appendedRows.forEach(({ data, index, poolKey }) => {
			const poolItem = rowPool.getPoolItem(poolKey);
			poolItem.item = data;
			poolItem.index = index;
			poolItem.itemKey = getKey.value(data);
			renderedItems.value.push(poolItem);
		});
		return currentPrepenedRowKeys;
	};
	const dataSourceChangedTrigger = ref(false);
	let dataSourceChanged = false;
	const triggerByDataSourceChange = () => {
		dataSourceChangedTrigger.value = !dataSourceChangedTrigger.value;
	};
	let isUpdating = false;
	const update = (recycleAll = false) => {
		if (isUpdating || !props.dataSource.length && !recycleAll) return;
		isUpdating = true;
		const currentPrependedRowKeys = updateRowPool(topIndex.value, bottomIndex.value, recycleAll);
		const currentPrependedColKeys = /* @__PURE__ */ new Map();
		renderedItems.value.forEach((poolItem, index) => {
			const colPrependedKeys = updateColPool(poolItem, leftIndex.value[index], rightIndex.value[index], recycleAll);
			currentPrependedColKeys.set(poolItem.itemKey, colPrependedKeys);
		});
		prependedRowKeys.value = currentPrependedRowKeys;
		prependedColKeys.value = currentPrependedColKeys;
		isUpdating = false;
	};
	watch(() => props.dataSource, () => {
		dataSourceChanged = true;
		triggerByDataSourceChange();
	}, {
		deep: true,
		flush: "pre"
	});
	watch([
		topIndex,
		bottomIndex,
		leftIndex,
		rightIndex,
		dataSourceChangedTrigger
	], () => {
		update(dataSourceChanged);
		if (dataSourceChanged) dataSourceChanged = false;
	}, {
		immediate: true,
		flush: "post",
		deep: true
	});
	onUnmounted(() => {
		renderedItems.value = [];
		rowPool.destroy();
		for (const key of Object.keys(colPools)) colPools[key].destroy();
		colPools = {};
	});
	return {
		renderedItems,
		prependedRowKeys,
		prependedColKeys
	};
}
function createPool() {
	let poolSeed = 0;
	const pooledItemMap = /* @__PURE__ */ new Map();
	const createPoolKey = () => {
		return `pool-${poolSeed++}`;
	};
	const getPoolItem = (key) => {
		if (key) return {
			key,
			isCustomKey: true
		};
		if (pooledItemMap.size > 0) {
			let poolItem;
			for (const [, item] of pooledItemMap) {
				poolItem = item;
				break;
			}
			pooledItemMap.delete(poolItem.itemKey);
			return poolItem;
		}
		return { key: createPoolKey() };
	};
	const getPoolItemByItemKey = (itemKey) => {
		const poolItem = pooledItemMap.get(itemKey);
		if (poolItem) pooledItemMap.delete(itemKey);
		return poolItem;
	};
	const recyclePoolItem = (poolItem) => {
		if (!poolItem.isCustomKey) pooledItemMap.set(poolItem.itemKey, poolItem);
	};
	const destroy = () => {
		pooledItemMap.clear();
	};
	return {
		getPoolItem,
		getPoolItemByItemKey,
		recyclePoolItem,
		destroy
	};
}
function useScrollPlacement(props, holderRef, scroll, scrollHeight, containerSize, changeScroll, setScroll2) {
	const maxScrollHeight = computed(() => {
		const height = scrollHeight.value;
		return height > 0 ? Math.max(height - containerSize.value.height, 0) : NaN;
	});
	const syncScroll = (newScroll, setHolderScroll) => {
		const { top: alignedTop, left: alignedLeft } = setScroll2(isFunction(newScroll) ? newScroll(scroll.value) : newScroll, !!setHolderScroll);
		changeScroll({
			top: alignedTop,
			left: alignedLeft
		});
	};
	let currentScrolledBottom = false;
	const handleScroll = (evt) => {
		const { scrollTop: newScrollTop, scrollLeft: newScrollLeft } = evt.currentTarget;
		if (newScrollTop !== scroll.value.top || newScrollLeft !== scroll.value.left) syncScroll({
			top: newScrollTop,
			left: newScrollLeft
		});
		callEmit(props.onScroll, evt);
		const scrolledBottom = Math.ceil(newScrollTop) >= maxScrollHeight.value;
		if (!currentScrolledBottom && scrolledBottom) callEmit(props.onScrolledBottom);
		currentScrolledBottom = scrolledBottom;
	};
	const initScroll = () => {
		if (holderRef.value) syncScroll(scroll.value, true);
	};
	onActivated(initScroll);
	return {
		syncScroll,
		handleScroll
	};
}
function useScrollState(props, enabled, getKey, scroll, containerSize, heightUpdatedMark, getRowHeight, getColWidth, syncScroll) {
	const scrollHeight = ref(0);
	const scrollWidth = ref(0);
	const scrollOffsetTop = ref();
	const scrollOffsetLeft = ref();
	const topIndex = ref(0);
	const bottomIndex = ref(0);
	const rightIndex = ref([]);
	const leftIndex = ref([]);
	const setNumArray = (arr, arrRef) => {
		if (!isNumArrayEqual(arr, arrRef.value)) arrRef.value = arr;
	};
	const setNum = (num, numRef) => {
		if (num !== numRef.value) numRef.value = num;
	};
	const getGridHorizontalIndex = (index) => {
		if (props.isStrictGrid) return new Array(bottomIndex.value - topIndex.value + 1).fill(index[0]);
		return index;
	};
	let calculated = false;
	let renderedHeight = 0;
	let renderedWidth = 0;
	watch([
		enabled,
		() => props.dataSource,
		() => props.bufferSize,
		() => props.rowHeight,
		() => props.colWidth,
		() => containerSize.value.height,
		() => containerSize.value.width,
		getKey,
		scroll,
		heightUpdatedMark
	], ([enabled2, dataSource, bufferSize, rowHeight, colWidth, height, width, getKey2, scroll2], [, oldDataSource, , , , oldHeight, oldWidth]) => {
		var _a, _b, _c, _d, _e, _f;
		let minHorizontalLength;
		let minVerticalLength;
		if (oldDataSource !== dataSource || oldDataSource.length !== dataSource.length) calculated = false;
		if (oldWidth === width) minHorizontalLength = rightIndex.value.map((_rightIndex, index) => _rightIndex - leftIndex.value[index]);
		if (oldHeight === height) minVerticalLength = bottomIndex.value - topIndex.value;
		const verticalState = calcVerticalState(getKey2, enabled2.vertical, dataSource, height, rowHeight, (_a = scroll2.top) != null ? _a : 0, (_b = scrollOffsetTop.value) != null ? _b : 0, getRowHeight, bufferSize, props.bufferOffset, renderedHeight, minVerticalLength, !calculated);
		if (verticalState && verticalState.scrollHeight < ((_c = scroll2.top) != null ? _c : 0)) {
			syncScroll({
				top: 0,
				left: scroll2.left
			}, true);
			return;
		}
		if (verticalState) {
			setNum(verticalState.topIndex, topIndex);
			setNum(verticalState.bottomIndex, bottomIndex);
			setNum(verticalState.offsetTop, scrollOffsetTop);
			setNum(verticalState.scrollHeight, scrollHeight);
			renderedHeight = verticalState.renderedHeight;
		}
		const rows = props.isStrictGrid ? [dataSource[topIndex.value]].filter(Boolean) : dataSource.slice(topIndex.value, bottomIndex.value + 1);
		const horizontalState = calcHorizontalState(getKey2, enabled2.horizontal, rows, width, colWidth, (_d = scroll2.left) != null ? _d : 0, (_e = scrollOffsetLeft.value) != null ? _e : 0, getColWidth, bufferSize, props.bufferOffset, renderedWidth, minHorizontalLength, !calculated || !!verticalState);
		if (horizontalState && horizontalState.scrollWidth < ((_f = scroll2.left) != null ? _f : 0)) {
			syncScroll({
				top: scroll2.top,
				left: 0
			}, true);
			return;
		}
		if (horizontalState) {
			setNumArray(getGridHorizontalIndex(horizontalState.leftIndex), leftIndex);
			setNumArray(getGridHorizontalIndex(horizontalState.rightIndex), rightIndex);
			setNum(horizontalState.offsetLeft, scrollOffsetLeft);
			setNum(horizontalState.scrollWidth, scrollWidth);
			renderedWidth = horizontalState.renderedWidth;
		}
		if (horizontalState && verticalState) calculated = true;
	}, {
		immediate: true,
		flush: "pre"
	});
	return {
		scrollHeight,
		scrollWidth,
		scrollOffsetTop,
		scrollOffsetLeft,
		topIndex,
		bottomIndex,
		leftIndex,
		rightIndex
	};
}
function calcVerticalState(getKey, virtual, rows, height, rowHeight, scrollTop, currentOffsetTop, getRowHeight, bufferSize, bufferOffset, renderedHeight, minLength, force) {
	if (virtual && height === 0) return;
	const dataLength = rows.length;
	if (!virtual || dataLength === 0 || rowHeight * dataLength <= height) {
		const scrollHeight2 = calcDataHeight(rows, getRowHeight, getKey);
		return {
			scrollHeight: scrollHeight2,
			topIndex: 0,
			bottomIndex: dataLength === 0 ? 0 : dataLength - 1,
			offsetTop: 0,
			renderedHeight: scrollHeight2
		};
	}
	const bufferOffsetDistance = bufferOffset * rowHeight;
	if (!force && !!bufferSize && scrollTop >= currentOffsetTop + bufferOffsetDistance && scrollTop <= currentOffsetTop + renderedHeight - height - bufferOffsetDistance) return;
	let scrollHeight = 0;
	let offsetTop = 0;
	let topIndex;
	let bottomIndex;
	let _renderedHeight = 0;
	for (let index = 0; index < dataLength; index += 1) {
		const rowHeight2 = getRowHeight(getKey(rows[index]));
		const currentItemBottom = scrollHeight + rowHeight2;
		if (currentItemBottom >= scrollTop && topIndex === void 0) {
			topIndex = index;
			offsetTop = scrollHeight;
		}
		if (topIndex !== void 0 && bottomIndex === void 0) _renderedHeight += rowHeight2;
		if (currentItemBottom > scrollTop + height && bottomIndex === void 0) bottomIndex = index;
		scrollHeight = currentItemBottom;
	}
	if (topIndex === void 0) {
		topIndex = 0;
		offsetTop = 0;
	}
	if (bottomIndex === void 0) bottomIndex = dataLength - 1;
	for (let index = 0; index < bufferSize; index += 1) {
		if (topIndex !== 0) {
			topIndex -= 1;
			const appendedRowHeight = getRowHeight(getKey(rows[topIndex]));
			offsetTop -= appendedRowHeight;
			_renderedHeight += appendedRowHeight;
		}
		if (bottomIndex !== dataLength - 1) {
			bottomIndex += 1;
			_renderedHeight += getRowHeight(getKey(rows[bottomIndex]));
		}
	}
	for (let index = 0; index < getFixSize(rowHeight ? Math.ceil(height / rowHeight) : 0, minLength, topIndex, bottomIndex); index += 1) if (bottomIndex !== dataLength - 1) {
		bottomIndex += 1;
		_renderedHeight += getRowHeight(getKey(rows[bottomIndex]));
	}
	return {
		scrollHeight,
		topIndex,
		bottomIndex,
		offsetTop,
		renderedHeight: _renderedHeight
	};
}
function calcHorizontalState(getKey, virtual, rows, width, colWidth, scrollLeft, currentOffsetLeft, getColWidth, bufferSize, bufferOffset, renderedWidth, minLength, force) {
	if (virtual && width === 0) return;
	const getRowColLength = (row) => {
		if (isRowData(row)) return row.data.length;
		return 1;
	};
	const maxColLength = Math.max(...rows.map((row) => getRowColLength(row)));
	if (!virtual || rows.length === 0 || colWidth * maxColLength <= width) {
		const scrollWidth2 = calcDataWidth(rows, getColWidth, getKey);
		return {
			scrollWidth: scrollWidth2,
			leftIndex: rows.map(() => 0),
			rightIndex: rows.map((row) => getRowColLength(row) - 1),
			offsetLeft: 0,
			renderedWidth: scrollWidth2
		};
	}
	const bufferOffsetDistance = bufferOffset * colWidth;
	if (scrollLeft >= currentOffsetLeft + bufferOffsetDistance && scrollLeft <= currentOffsetLeft + renderedWidth - width - bufferOffsetDistance && !force && !!bufferSize) return;
	let scrollWidth = 0;
	let _renderedWidth = 0;
	let offsetLeft = 0;
	const windowRenderSize = colWidth ? Math.ceil(width / colWidth) : 0;
	const leftIndex = [];
	const rightIndex = [];
	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];
		if (!isRowData(row)) {
			leftIndex.push(0);
			rightIndex.push(0);
			continue;
		}
		const rowKey = getKey(row);
		let rowWidth = 0;
		let rowOffset = 0;
		let left;
		let right;
		let rowRenderedWidth = 0;
		for (let index = 0; index < row.data.length; index += 1) {
			const colWidth2 = getColWidth(rowKey, getKey(row.data[index]));
			const currentItemRight = rowWidth + colWidth2;
			if (currentItemRight >= scrollLeft && left === void 0) {
				left = index;
				rowOffset = rowOffset ? Math.min(rowOffset, rowWidth) : rowWidth;
			}
			if (left !== void 0 && right === void 0) rowRenderedWidth += colWidth2;
			if (currentItemRight > scrollLeft + width && right === void 0) right = index;
			rowWidth = currentItemRight;
		}
		if (left === void 0) left = 0;
		if (right === void 0) right = row.data.length - 1;
		for (let index = 0; index < bufferSize; index += 1) {
			if (left !== 0) {
				left -= 1;
				const appendedColWidth = getColWidth(rowKey, getKey(row.data[left]));
				rowOffset = rowOffset ? Math.max(0, rowOffset - appendedColWidth) : rowOffset;
				rowRenderedWidth += appendedColWidth;
			}
			if (right !== row.data.length - 1) {
				right += 1;
				rowRenderedWidth += getColWidth(rowKey, getKey(row.data[right]));
			}
		}
		for (let index = 0; index < getFixSize(windowRenderSize, minLength == null ? void 0 : minLength[rowIndex], left, right); index += 1) if (right !== row.data.length - 1) {
			right += 1;
			rowRenderedWidth += getColWidth(rowKey, getKey(row.data[right]));
		}
		leftIndex.push(left);
		rightIndex.push(right);
		scrollWidth = Math.max(scrollWidth, rowWidth);
		_renderedWidth = Math.max(_renderedWidth, rowRenderedWidth);
		offsetLeft = offsetLeft ? Math.min(offsetLeft, rowOffset) : rowOffset;
	}
	if (offsetLeft === void 0) offsetLeft = 0;
	return {
		scrollWidth,
		leftIndex,
		rightIndex,
		offsetLeft,
		renderedWidth: _renderedWidth
	};
}
function getFixSize(windowRenderSize, minSize, start, end) {
	const renderedSize = end - start;
	if (!minSize) return 0;
	if (renderedSize > minSize) return 0;
	return Math.max(Math.min(minSize, windowRenderSize) - renderedSize, 0);
}
function useScrollTo(props, holderRef, getKey, getRowHeight, getColWidth, syncScroll) {
	let refId;
	return (option) => {
		var _a;
		if (isNil(option)) return;
		cancelRAF(refId);
		if (typeof option === "number") syncScroll({ top: option }, true);
		else if (typeof option === "object") {
			if ("top" in option || "left" in option) {
				syncScroll({
					top: option.top,
					left: option.left
				}, true);
				return;
			}
			const { align, verticalAlign: _verticalAlign, horizontalAlign, offset, verticalOffset: _verticalOffset, horizontalOffset = 0 } = option;
			const verticalAlign = _verticalAlign != null ? _verticalAlign : align;
			const verticalOffset = (_a = _verticalOffset != null ? _verticalOffset : offset) != null ? _a : 0;
			if (offset) Logger.warn("cdk/scroll", "scrollTo option `offset` is deprecated, use verticalOffset instead");
			if (align) Logger.warn("cdk/scroll", "scrollTo option `align` is deprecated, use verticalAlign instead");
			const { rowIndex, colIndex } = calcScrollIndex(option, props.dataSource, getKey.value);
			const _syncScroll = (times, verticalAlign2, horizontalAlign2) => {
				const holderElement = holderRef.value;
				if (times < 0 || !holderElement) return;
				const height = holderElement.clientHeight;
				const width = holderElement.clientWidth;
				let targetVerticalAlign;
				let targetHorizontalAlign;
				if (height > 0 && width > 0) {
					const { itemTop, itemBottom, itemLeft, itemRight } = calcScrollToState(props.dataSource, rowIndex, colIndex, getKey.value, getRowHeight, getColWidth);
					const { scrollTop, scrollLeft } = holderElement;
					let targetTop;
					let targetLeft;
					({targetVerticalAlign, targetTop} = calcVerticalScrollTarget(verticalAlign2, verticalOffset, itemTop, itemBottom, height, scrollTop));
					({targetHorizontalAlign, targetLeft} = calcHorizontalScrollTarget(horizontalAlign2, horizontalOffset, itemLeft, itemRight, width, scrollLeft));
					if (!isNil(targetTop) && targetTop !== scrollTop || !isNil(targetLeft) && targetLeft !== scrollLeft) syncScroll({
						top: targetTop,
						left: targetLeft
					}, true);
				}
				refId = rAF(() => {
					_syncScroll(times - 1, targetVerticalAlign, targetHorizontalAlign);
				});
			};
			_syncScroll(3, verticalAlign, horizontalAlign);
		}
	};
}
function calcScrollIndex(option, dataSource, getKey) {
	var _a, _b;
	let rowIndex;
	let colIndex;
	if ("rowIndex" in option || "index" in option) {
		if ("index" in option) Logger.warn("cdk/scroll", "scrollTo option `index` is deprecated, use rowIndex instead");
		rowIndex = (_a = option.rowIndex) != null ? _a : option.index;
		colIndex = option.colIndex;
	} else if ("rowKey" in option || "key" in option) {
		if ("key" in option) Logger.warn("cdk/scroll", "scrollTo option `key` is deprecated, use rowKey instead");
		const rowKey = (_b = option.rowKey) != null ? _b : option.key;
		rowIndex = dataSource.findIndex((item) => getKey(item) === rowKey);
		const row = dataSource[rowIndex];
		if (rowIndex > -1 && isRowData(row) && option.colKey) colIndex = row.data.findIndex((item) => getKey(item) === option.colKey);
	}
	return {
		rowIndex: rowIndex && rowIndex > -1 ? rowIndex : void 0,
		colIndex: colIndex && colIndex > -1 ? colIndex : void 0
	};
}
function calcScrollToState(dataSource, rowIndex, colIndex, getKey, getRowHeight, getColWidth) {
	let stackTop = 0;
	let stackLeft = 0;
	let itemTop;
	let itemBottom;
	let itemLeft;
	let itemRight;
	if (rowIndex) for (let ri = 0; ri <= rowIndex; ri++) {
		const row = dataSource[ri];
		const rowKey = getKey(row);
		itemTop = stackTop;
		itemBottom = itemTop + getRowHeight(rowKey);
		stackTop = itemBottom;
		if (ri === rowIndex && !isNil(colIndex) && isRowData(row)) {
			const columns = row.data;
			for (let ci = 0; ci <= colIndex; ci++) {
				const col = columns[ci];
				const colKey = getKey(col);
				itemLeft = stackLeft;
				itemRight = itemLeft + getColWidth(rowKey, colKey);
				stackLeft = itemRight;
			}
		}
	}
	return {
		itemTop,
		itemBottom,
		itemLeft,
		itemRight
	};
}
function calcVerticalScrollTarget(align, offset, itemTop, itemBottom, containerHeight, containerScrollTop) {
	if (isNil(itemTop) || isNil(itemBottom)) return {
		targetVerticalAlign: align === "auto" ? void 0 : align,
		targetTop: void 0
	};
	const { targetOffset, targetAlign } = _calcScrollTarget(align === "top" ? -1 : align === "bottom" ? 1 : void 0, offset, itemTop, itemBottom, containerHeight, containerScrollTop);
	return {
		targetVerticalAlign: targetAlign && (targetAlign === -1 ? "top" : "bottom"),
		targetTop: targetOffset
	};
}
function calcHorizontalScrollTarget(align, offset, itemLeft, itemRight, containerWidth, containerScrollLeft) {
	if (isNil(itemLeft) || isNil(itemRight)) return {
		targetHorizontalAlign: align === "auto" ? void 0 : align,
		targetLeft: void 0
	};
	const { targetOffset, targetAlign } = _calcScrollTarget(align === "start" ? -1 : align === "end" ? 1 : void 0, offset, itemLeft, itemRight, containerWidth, containerScrollLeft);
	return {
		targetHorizontalAlign: targetAlign && (targetAlign === -1 ? "start" : "end"),
		targetLeft: targetOffset
	};
}
function _calcScrollTarget(align, offset, itemStart, itemEnd, containerSize, containerScrollStart) {
	let targetOffset;
	let targetAlign;
	if (!align) {
		const containerScrollEnd = containerScrollStart + containerSize;
		if (itemStart < containerScrollStart) targetAlign = -1;
		else if (itemEnd > containerScrollEnd) targetAlign = 1;
	} else targetAlign = align;
	switch (align) {
		case -1:
			targetOffset = Math.max(itemStart - offset, 0);
			break;
		case 1: targetOffset = Math.max(itemEnd - containerSize + offset, 0);
	}
	return {
		targetOffset,
		targetAlign
	};
}
function useSizeCollect(props) {
	const itemMap = /* @__PURE__ */ new Map();
	const strictGridColMap = /* @__PURE__ */ new Map();
	const sizes = /* @__PURE__ */ new Map();
	const strictGridColSizes = /* @__PURE__ */ new Map();
	const sizeUpdateMark = ref(0);
	let sizeUpdateId = 0;
	let rowHeight = props.rowHeight;
	let colWidth = props.colWidth;
	let _getColWidth = props.getColWidth;
	let _getRowHeight = props.getRowHeight;
	watch(() => props.rowHeight, () => {
		rowHeight = props.rowHeight;
	});
	watch(() => props.colWidth, () => {
		colWidth = props.colWidth;
	});
	watch(() => props.getColWidth, () => {
		_getColWidth = props.getColWidth;
	});
	watch(() => props.getRowHeight, () => {
		_getRowHeight = props.getRowHeight;
	});
	const setRowHeight = (rowKey, height) => {
		if (isNil(height)) return false;
		const rowSize = sizes.get(rowKey);
		if (!rowSize) {
			sizes.set(rowKey, {
				height,
				colWidths: /* @__PURE__ */ new Map()
			});
			return true;
		}
		if (rowSize.height != height) {
			rowSize.height = height;
			return true;
		}
		return false;
	};
	const setColWidth = (colWidths, colKey, width) => {
		if (!width) return false;
		if (!colWidths) return false;
		if (colWidths.get(colKey) !== width) {
			colWidths.set(colKey, width);
			return true;
		}
		return false;
	};
	const updateRowHeight = (rowKey, row) => {
		return setRowHeight(rowKey, row.getBoundingClientRect().height);
	};
	const updateColWidth = (rowKey, colKey, col) => {
		var _a;
		const colWidths = props.isStrictGrid ? strictGridColSizes : isNil(rowKey) ? void 0 : (_a = sizes.get(rowKey)) == null ? void 0 : _a.colWidths;
		const width = col.getBoundingClientRect().width;
		return setColWidth(colWidths, colKey, width);
	};
	const collectSize = () => {
		sizeUpdateId += 1;
		const currentId = sizeUpdateId;
		setTimeout(() => {
			if (currentId !== sizeUpdateId) return;
			let updated = false;
			itemMap.forEach(({ row, cols }, rowKey) => {
				if (!row || !row.offsetParent) return;
				const rowUpdated = updateRowHeight(rowKey, row);
				updated = updated || rowUpdated;
				if (!props.isStrictGrid) cols.forEach((col, colKey) => {
					const colUpdated = updateColWidth(rowKey, colKey, col);
					updated = updated || colUpdated;
				});
			});
			if (props.isStrictGrid) strictGridColMap.forEach((col, colKey) => {
				const colUpdated = updateColWidth(void 0, colKey, col);
				updated = updated || colUpdated;
			});
			if (updated) sizeUpdateMark.value++;
		});
	};
	const setRow = (rowKey, row) => {
		const rowEl = convertElement(row);
		if (!rowEl) {
			itemMap.delete(rowKey);
			return;
		}
		const existedRow = itemMap.get(rowKey);
		if (existedRow) existedRow.row = rowEl;
		else itemMap.set(rowKey, {
			row: rowEl,
			cols: /* @__PURE__ */ new Map()
		});
	};
	const setCol = (rowKey, colKey, col) => {
		var _a;
		if (props.isStrictGrid && strictGridColMap.has(colKey)) return;
		const colEl = convertElement(col);
		const cols = props.isStrictGrid ? strictGridColMap : (_a = itemMap.get(rowKey)) == null ? void 0 : _a.cols;
		if (!cols) return;
		if (!colEl) cols.delete(colKey);
		else cols.set(colKey, colEl);
	};
	const getRowHeight = (rowKey) => {
		var _a, _b, _c;
		return (_c = (_b = (_a = sizes.get(rowKey)) == null ? void 0 : _a.height) != null ? _b : _getRowHeight == null ? void 0 : _getRowHeight(rowKey)) != null ? _c : rowHeight;
	};
	const getColWidth = (rowKey, colKey) => {
		var _a, _b, _c;
		return (_c = (_b = props.isStrictGrid ? strictGridColSizes.get(colKey) : (_a = sizes.get(rowKey)) == null ? void 0 : _a.colWidths.get(colKey)) != null ? _b : _getColWidth == null ? void 0 : _getColWidth(rowKey, colKey)) != null ? _c : colWidth;
	};
	const clearItems = () => {
		itemMap.clear();
		strictGridColMap.clear();
	};
	return {
		collectSize,
		sizeUpdateMark,
		setRow,
		setCol,
		getRowHeight,
		getColWidth,
		clearItems
	};
}
var Col = (props, { slots }) => {
	const key = useKey();
	const { row, rowIndex, item, index } = props;
	const render = slots.default;
	const nodes = render({
		row,
		rowIndex,
		item,
		index
	});
	const node = getFirstValidNode(nodes);
	if (node) node.key = key;
	return node;
};
var virtualScrollToken = Symbol("virtualScrollToken");
var Holder = /* @__PURE__ */ defineComponent({ setup(_, { slots }) {
	const { props, slots: virtualScrollSlots, enabled, holderRef, fillerHorizontalRef, fillerVerticalRef, collectSize, getColWidth, getRowHeight, prependedRowKeys, prependedColKeys, scrollHeight, scrollWidth, scrollOffsetLeft, scrollOffsetTop, handleScroll, topIndex, bottomIndex, leftIndex, rightIndex, renderedData } = inject(virtualScrollToken);
	const style = computed(() => {
		const { height, fullHeight, width, fullWidth } = props;
		const resolvedHeight = convertSize(height);
		const resolvedWidth = convertSize(width);
		if (!resolvedHeight && !resolvedWidth) return;
		return {
			[fullHeight || isString(height) ? "height" : "maxHeight"]: resolvedHeight,
			[fullWidth || isString(width) ? "width" : "maxWidth"]: resolvedWidth,
			overflowX: props.scrollMode !== "native" || !resolvedWidth || resolvedWidth === "auto" ? "hidden" : "auto",
			overflowY: props.scrollMode !== "native" || !resolvedHeight || resolvedHeight === "auto" ? "hidden" : "auto"
		};
	});
	const fillerVerticalStyle = computed(() => {
		if (scrollOffsetTop.value === void 0) return;
		return {
			height: `${scrollHeight.value}px`,
			width: "1px",
			marginLeft: "-1px"
		};
	});
	const fillerHorizontalStyle = computed(() => {
		if (scrollOffsetLeft.value === void 0) return;
		return {
			width: `${scrollWidth.value}px`,
			height: "1px",
			marginTop: "-1px"
		};
	});
	const contentStyle = computed(() => {
		let offsetTop = scrollOffsetTop.value;
		let offsetLeft = scrollOffsetLeft.value;
		if (offsetTop === void 0 && offsetLeft == void 0) return;
		const prependedHeight = getPrependedRowHeight(prependedRowKeys.value, getRowHeight);
		const prependedWidth = getPrependedColWidth(prependedColKeys.value, getColWidth, props.isStrictGrid);
		if (offsetTop && prependedHeight) offsetTop -= prependedHeight;
		if (offsetLeft && prependedWidth) offsetLeft -= prependedWidth;
		return {
			marginTop: convertCssPixel(offsetTop),
			marginLeft: convertCssPixel(offsetLeft)
		};
	});
	const contentRef = ref();
	const onContentResize = throttle(collectSize, 16);
	onMounted(() => {
		onResize(contentRef.value, onContentResize);
	});
	onBeforeUnmount(() => {
		offResize(contentRef.value, onContentResize);
	});
	return () => {
		var _a;
		const children = slots.default();
		const contentRender = (_a = virtualScrollSlots.content) != null ? _a : props.contentRender;
		return createVNode("div", {
			"ref": holderRef,
			"class": "cdk-virtual-scroll-holder",
			"style": style.value,
			"onScroll": handleScroll
		}, [
			enabled.value.horizontal && createVNode("div", {
				"ref": fillerHorizontalRef,
				"class": "cdk-virtual-scroll-filler-horizontal",
				"style": fillerHorizontalStyle.value
			}, null),
			enabled.value.vertical && createVNode("div", {
				"ref": fillerVerticalRef,
				"class": "cdk-virtual-scroll-filler-vertical",
				"style": fillerVerticalStyle.value
			}, null),
			createVNode("div", {
				"ref": contentRef,
				"class": "cdk-virtual-scroll-content",
				"style": contentStyle.value
			}, [contentRender ? contentRender(children, {
				topIndex: topIndex.value,
				bottomIndex: bottomIndex.value,
				leftIndex: leftIndex.value,
				rightIndex: rightIndex.value,
				renderedData: renderedData.value
			}) : children])
		]);
	};
} });
function convertSize(size) {
	return !size || isNumber(size) && size <= 0 ? void 0 : isString(size) ? size : convertCssPixel(size);
}
function getPrependedRowHeight(prependedRowKeys, getRowHeight) {
	let height = 0;
	prependedRowKeys.forEach((key) => {
		const rowHeight = getRowHeight(key);
		height = height + rowHeight;
	});
	return height;
}
function getPrependedColWidth(prependedColKeys, getColWidth, isStrictGrid) {
	const getWidth = (rowKey, colKeys) => {
		let width = 0;
		colKeys == null || colKeys.forEach((key) => {
			const rowHeight = getColWidth(rowKey, key);
			width = width + rowHeight;
		});
		return width;
	};
	if (!prependedColKeys.size) return 0;
	const rowKeys = [...prependedColKeys.keys()];
	if (isStrictGrid) return getWidth(rowKeys[0], prependedColKeys.get(rowKeys[0]));
	let maxWidth = 0;
	rowKeys.forEach((rowKey) => {
		maxWidth = Math.max(maxWidth, getWidth(rowKey, prependedColKeys.get(rowKey)));
	});
	return maxWidth;
}
var Row = (props, { slots }) => {
	const key = useKey();
	const { item, index, children } = props;
	const render = slots.default;
	const nodes = render({
		item,
		index,
		children
	});
	const node = getFirstValidNode(nodes);
	if (node) node.key = key;
	return node;
};
var CdkVirtualScroll = /* @__PURE__ */ defineComponent({
	name: "CdkVirtualScroll",
	props: {
		contentRender: {
			type: Function,
			default: void 0
		},
		bufferSize: {
			type: Number,
			default: 0
		},
		bufferOffset: {
			type: Number,
			default: 0
		},
		dataSource: {
			type: Array,
			default: () => []
		},
		rowModifier: { type: Function },
		colModifier: { type: Function },
		getKey: {
			type: [String, Function],
			default: "key"
		},
		height: {
			type: [Number, String],
			default: "auto"
		},
		fullHeight: {
			type: Boolean,
			default: false
		},
		itemHeight: {
			type: Number,
			default: 0
		},
		rowHeight: {
			type: Number,
			default: 0
		},
		width: {
			type: [Number, String],
			default: "100%"
		},
		fullWidth: {
			type: Boolean,
			default: true
		},
		colWidth: {
			type: Number,
			default: 0
		},
		getRowHeight: Function,
		getColWidth: Function,
		itemRender: {
			type: Function,
			default: void 0
		},
		rowRender: {
			type: Function,
			default: void 0
		},
		colRender: {
			type: Function,
			default: void 0
		},
		virtual: {
			type: [Boolean, Object],
			default: () => ({
				horizontal: false,
				vertical: true
			})
		},
		scrollMode: {
			type: String,
			default: "native"
		},
		isStrictGrid: {
			type: Boolean,
			default: true
		},
		onScroll: [Function, Array],
		onScrolledChange: [Function, Array],
		onScrolledBottom: [Function, Array]
	},
	setup(props, { expose, slots }) {
		if (props.itemHeight) Logger.warn("cdk/scroll", "itemHeight is deprecated, use rowHeight instead");
		if (props.itemRender) Logger.warn("cdk/scroll", "itemRender is deprecated, use rowRender instead");
		const useVirtual = computed(() => props.virtual && props.itemHeight > 0);
		const getKey = useGetKey(props);
		const { collectSize, sizeUpdateMark, setRow, setCol, getRowHeight, getColWidth, clearItems } = useSizeCollect(props);
		const enabled = computed(() => {
			const enabled2 = props.virtual;
			let resolvedEnabled;
			if (enabled2 === true) resolvedEnabled = {
				horizontal: true,
				vertical: true
			};
			else if (!enabled2) resolvedEnabled = {
				horizontal: false,
				vertical: false
			};
			else resolvedEnabled = enabled2;
			return {
				horizontal: resolvedEnabled.horizontal && props.width !== 0,
				vertical: resolvedEnabled.vertical && props.height !== 0 && props.height !== "auto"
			};
		});
		const holderRef = ref();
		const horizontalScrollbarRef = ref();
		const verticalScrollBarRef = ref();
		const fillerHorizontalRef = ref();
		const fillerVerticalRef = ref();
		const containerSize = useContainerSize(props, holderRef);
		const [scroll, changeScroll] = useState({
			top: 0,
			left: 0
		});
		const { scrollTop: containerScrollTop, scrollLeft: containerScrollLeft, scrollHeight: containerScrollHeight, scrollWidth: containerScrollWidth, syncScroll: syncContainerScroll, init: initContainerScroll, update: updateContainerScroll, destroy: destroyContainerScroll, horizontalOverflowed, verticalOverflowed } = useScroll(holderRef, {
			simulatedScroll: computed(() => {
				if (props.scrollMode !== "simulated") return false;
				const horizontalScrollbarEl = convertElement(horizontalScrollbarRef.value);
				const verticalScrollbarEl = convertElement(verticalScrollBarRef.value);
				return {
					scrollbarWidth: verticalScrollbarEl ? parseSize(getComputedStyle(verticalScrollbarEl).width) : 0,
					scrollbarHeight: horizontalScrollbarEl ? parseSize(getComputedStyle(horizontalScrollbarEl).height) : 0
				};
			}),
			syncOnScroll: false,
			setContainerScroll: false,
			onScroll: (top, left) => {
				syncScroll({
					top,
					left
				}, true);
			}
		});
		const onHorizontalScroll = (offset) => {
			syncScroll({ left: offset }, true);
		};
		const onVerticalScroll = (offset) => {
			syncScroll({ top: offset }, true);
		};
		const { syncScroll, handleScroll } = useScrollPlacement(props, holderRef, scroll, containerScrollHeight, containerSize, changeScroll, syncContainerScroll);
		const { scrollHeight, scrollWidth, scrollOffsetTop, scrollOffsetLeft, topIndex, leftIndex, rightIndex, bottomIndex } = useScrollState(props, enabled, getKey, scroll, containerSize, sizeUpdateMark, getRowHeight, getColWidth, syncScroll);
		const { renderedItems: pool, prependedRowKeys, prependedColKeys } = useRenderPool(props, topIndex, bottomIndex, leftIndex, rightIndex, getKey);
		const mergedData = computed(() => {
			return pool.value.map((row) => {
				var _a, _b;
				if (!isRowData(row.item)) return row.item;
				return {
					...row.item,
					data: (_b = (_a = row.cols) == null ? void 0 : _a.map((col) => col.item)) != null ? _b : []
				};
			});
		});
		const classes = computed(() => ({
			"cdk-virtual-scroll": true,
			"cdk-virtual-scroll-simulated-scroll": props.scrollMode !== "native",
			"cdk-virtual-scroll-overflowed-horizontal": horizontalOverflowed.value,
			"cdk-virtual-scroll-overflowed-vertical": verticalOverflowed.value
		}));
		provide(virtualScrollToken, {
			props,
			slots,
			containerSize,
			enabled,
			holderRef,
			fillerHorizontalRef,
			fillerVerticalRef,
			useVirtual,
			collectSize,
			getColWidth,
			getRowHeight,
			prependedRowKeys,
			prependedColKeys,
			scroll,
			scrollHeight,
			scrollWidth,
			scrollOffsetTop,
			scrollOffsetLeft,
			syncScroll,
			handleScroll,
			topIndex,
			bottomIndex,
			leftIndex,
			rightIndex,
			renderedData: mergedData
		});
		const scrollTo2 = useScrollTo(props, holderRef, getKey, getRowHeight, getColWidth, syncScroll);
		const getHolderElement = () => holderRef.value;
		expose({
			scrollTo: scrollTo2,
			getHolderElement
		});
		watch([topIndex, leftIndex], () => callEmit(props.onScrolledChange, topIndex.value, bottomIndex.value, mergedData.value));
		onMounted(() => {
			collectSize();
			initContainerScroll();
			watch([scrollWidth, scrollHeight], ([width, height], [oldWidth, oldHeight]) => {
				if (Math.ceil(width) === Math.ceil(oldWidth) && Math.ceil(height) === Math.ceil(oldHeight)) return;
				nextTick(() => updateContainerScroll());
			});
		});
		onUpdated(collectSize);
		onBeforeUnmount(destroyContainerScroll);
		return () => {
			var _a, _b, _c, _d;
			const rowRender = (_c = (_b = (_a = slots.row) != null ? _a : slots.item) != null ? _b : props.rowRender) != null ? _c : props.itemRender;
			const colRender = (_d = slots.col) != null ? _d : props.colRender;
			clearItems();
			const rows = pool.value.map((row) => {
				var _a2;
				const { key, item, itemKey, index } = row;
				if (!isRowData(item)) return createVNode(Row, {
					"key": key,
					"item": item,
					"index": index,
					"ref": (instance) => {
						setRow(itemKey, instance);
						setCol(itemKey, itemKey, instance);
					}
				}, { default: rowRender });
				const cols = (_a2 = row.cols) == null ? void 0 : _a2.map((col) => {
					const { key: colKey, item: colItem, itemKey: colItemKey, index: colIndex } = col;
					return createVNode(Col, {
						"key": colKey,
						"row": item,
						"rowIndex": index,
						"item": colItem,
						"index": colIndex,
						"ref": (instance) => setCol(itemKey, colItemKey, instance)
					}, { default: colRender });
				});
				return createVNode(Row, {
					"key": key,
					"item": item,
					"index": index,
					"children": cols,
					"ref": (instance) => setRow(itemKey, instance)
				}, { default: rowRender });
			});
			return createVNode("div", { "class": classes.value }, [
				createVNode(Holder, null, { default: () => [rows] }),
				props.scrollMode === "simulated" && withDirectives(createVNode(CdkScrollbar, {
					"ref": verticalScrollBarRef,
					"containerSize": containerSize.value.height,
					"scrollRange": containerScrollHeight.value,
					"scrollOffset": containerScrollTop.value,
					"onScroll": onVerticalScroll
				}, null), [[vShow, verticalOverflowed.value]]),
				props.scrollMode === "simulated" && withDirectives(createVNode(CdkScrollbar, {
					"ref": horizontalScrollbarRef,
					"horizontal": true,
					"containerSize": containerSize.value.width,
					"scrollRange": containerScrollWidth.value,
					"scrollOffset": containerScrollLeft.value,
					"onScroll": onHorizontalScroll
				}, null), [[vShow, horizontalOverflowed.value]])
			]);
		};
	}
});
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/_private/empty/index.js
var Empty = (props, { slots }) => {
	if (slots.empty) return slots.empty();
	const { empty } = props;
	const emptyProps = isString(empty) ? { simple: empty === "simple" } : empty;
	return createVNode(IxEmpty, emptyProps, null);
};
Empty.displayName = "ɵEmpty";
var ɵEmpty = Empty;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/checkbox/index.js
var checkboxGroupToken = Symbol("checkboxGroupToken");
var checkboxProps = {
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
		type: [
			String,
			Number,
			Boolean
		],
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
	indeterminate: {
		type: Boolean,
		default: false
	},
	label: {
		type: String,
		default: void 0
	},
	trueValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: true
	},
	falseValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: false
	},
	value: {
		type: null,
		default: void 0
	},
	size: {
		type: String,
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
function getDefaultThemeTokens$1(tokens) {
	const { paddingSizeXs, colorInfoContainerBg, colorBorderSecondary } = tokens;
	return {
		labelPadding: `0 ${paddingSizeXs}px`,
		fieldsetBgColor: colorInfoContainerBg,
		fieldsetBorderColor: colorBorderSecondary
	};
}
var getThemeTokens$1 = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens$1(tokens) : getDefaultThemeTokens$1(tokens);
};
var buttonSizeMap = {
	sm: "xs",
	md: "sm",
	lg: "md"
};
var Checkbox = /* @__PURE__ */ defineComponent({
	name: "IxCheckbox",
	inheritAttrs: false,
	props: checkboxProps,
	setup(props, { attrs, expose, slots }) {
		const key = useKey();
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("checkbox");
		const { hashId: buttonHashId, registerToken: registerButtonToken } = useThemeToken("button");
		registerToken(getThemeTokens$1);
		registerButtonToken(getThemeTokens$3);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox`);
		const config = useGlobalConfig("checkbox");
		const { elementRef, focus, blur } = useFormElement();
		const waveRef = ref();
		expose({
			focus,
			blur
		});
		const formContext = inject(FORM_TOKEN, null);
		const checkboxGroup = inject(checkboxGroupToken, null);
		const mergedName = computed(() => {
			var _a;
			return (_a = attrs.name) != null ? _a : checkboxGroup == null ? void 0 : checkboxGroup.props.name;
		});
		const mergedValue = computed(() => {
			const { value } = props;
			if (!isNil(value)) return value;
			return checkboxGroup ? key : void 0;
		});
		const isButtoned = computed(() => {
			var _a, _b;
			return (_b = (_a = props.buttoned) != null ? _a : checkboxGroup == null ? void 0 : checkboxGroup.props.buttoned) != null ? _b : false;
		});
		const size = computed(() => {
			var _a, _b, _c;
			return (_c = (_b = (_a = props.size) != null ? _a : checkboxGroup == null ? void 0 : checkboxGroup.props.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
		});
		const mergedWaveless = computed(() => {
			var _a;
			return (_a = props.waveless) != null ? _a : config.waveless;
		});
		const { isChecked, isDisabled, isFocused, handleChange, handleBlur, handleFocus } = useCheckbox(props, checkboxGroup, mergedValue, waveRef, mergedWaveless);
		const classes = computed(() => {
			const { indeterminate } = props;
			const buttoned = isButtoned.value;
			const prefixCls = mergedPrefixCls.value;
			const commonPrefixCls = common.prefixCls;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[buttonHashId.value]: !!buttonHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-checked`]: !indeterminate && isChecked.value,
				[`${prefixCls}-disabled`]: isDisabled.value,
				[`${prefixCls}-focused`]: isFocused.value,
				[`${prefixCls}-indeterminate`]: indeterminate,
				[`${prefixCls}-${size.value}`]: buttoned,
				[`${commonPrefixCls}-button`]: buttoned,
				[`${commonPrefixCls}-button-default`]: buttoned,
				[`${commonPrefixCls}-button-disabled`]: buttoned && isDisabled.value,
				[`${commonPrefixCls}-button-${buttonSizeMap[size.value]}`]: buttoned
			});
		});
		return () => {
			const { autofocus, label, indeterminate } = props;
			const { class: className, style, type, tabindex, ...restAttrs } = attrs;
			const prefixCls = mergedPrefixCls.value;
			const checked = isChecked.value;
			const labelNode = convertStringVNode(slots.default, label);
			const checkboxNode = createVNode("label", {
				"class": slots.fieldset ? classes.value : normalizeClass([classes.value, className]),
				"style": slots.fieldset ? void 0 : style
			}, [
				createVNode("span", {
					"class": `${prefixCls}-input`,
					"role": "checkbox",
					"aria-checked": indeterminate ? "mixed" : String(!!checked),
					"aria-disabled": String(!!isDisabled.value)
				}, [createVNode("input", mergeProps({
					"ref": elementRef,
					"type": "checkbox",
					"class": `${prefixCls}-input-inner`,
					"aria-hidden": true,
					"autofocus": autofocus,
					"name": mergedName.value,
					"value": mergedValue.value,
					"checked": checked,
					"disabled": isDisabled.value,
					"onChange": handleChange,
					"onBlur": handleBlur,
					"onFocus": handleFocus
				}, restAttrs), null), !isButtoned.value && createVNode("span", {
					"class": `${prefixCls}-input-box`,
					"tabindex": tabindex
				}, [!mergedWaveless.value && createVNode(ɵWave, { "ref": waveRef }, null)])]),
				isButtoned.value && createVNode("span", {
					"class": `${prefixCls}-input-tick`,
					"tabindex": tabindex
				}, null),
				isButtoned.value && !mergedWaveless.value && createVNode(ɵWave, { "ref": waveRef }, null),
				labelNode && createVNode("span", { "class": `${prefixCls}-label` }, [labelNode])
			]);
			if (slots.fieldset) return createVNode("div", {
				"class": normalizeClass([
					`${prefixCls}-wrapper`,
					className,
					globalHashId.value,
					hashId.value,
					buttonHashId.value
				]),
				"style": style
			}, [checkboxNode, createVNode("div", { "class": normalizeClass([`${prefixCls}-fieldset`, !checked ? `${prefixCls}-fieldset-hidden` : ""]) }, [slots.fieldset()])]);
			return checkboxNode;
		};
	}
});
var useCheckbox = (props, checkboxGroup, mergedValue, waveRef, mergedWaveless) => {
	let isChecked;
	let isDisabled;
	let handleChange;
	let handleBlur;
	const isFocused = ref(false);
	const handleFocus = (evt) => {
		isFocused.value = true;
		callEmit(props.onFocus, evt);
	};
	if (checkboxGroup) {
		const { props: groupProps, accessor } = checkboxGroup;
		isChecked = computed(() => (accessor.value || []).includes(mergedValue.value));
		isDisabled = computed(() => accessor.disabled || !!props.disabled);
		handleBlur = (evt) => {
			isFocused.value = false;
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		handleChange = (evt) => {
			var _a;
			const checked = evt.target.checked;
			const { trueValue, falseValue } = props;
			const value = mergedValue.value;
			const checkValue = checked ? trueValue : falseValue;
			const oldCheckValue = !checked ? trueValue : falseValue;
			const oldValue = accessor.value || [];
			const newValue = [...oldValue];
			const checkValueIndex = newValue.indexOf(value);
			if (checkValueIndex === -1) newValue.push(value);
			else newValue.splice(checkValueIndex, 1);
			accessor.setValue(newValue);
			callEmit(props.onChange, checkValue, oldCheckValue);
			callEmit(groupProps.onChange, newValue, oldValue);
			!mergedWaveless.value && ((_a = waveRef.value) == null || _a.play());
		};
	} else {
		const { accessor, control } = useAccessorAndControl({ valueKey: "checked" });
		useFormItemRegister(control);
		isChecked = computed(() => accessor.value === props.trueValue);
		isDisabled = computed(() => accessor.disabled);
		handleBlur = (evt) => {
			isFocused.value = false;
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		handleChange = (evt) => {
			var _a;
			const checked = evt.target.checked;
			const { trueValue, falseValue } = props;
			const newChecked = checked ? trueValue : falseValue;
			const oldChecked = !checked ? trueValue : falseValue;
			accessor.setValue(newChecked);
			callEmit(props.onChange, newChecked, oldChecked);
			!mergedWaveless.value && ((_a = waveRef.value) == null || _a.play());
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
var IxCheckbox = Checkbox;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/select/index.js
function useActiveState(props, inputValue) {
	const [activeValue, setActiveValue] = useState(void 0);
	watch(inputValue, (value) => {
		if (!props.allowInput || !value) return;
		setActiveValue(value);
	}, { immediate: true });
	return {
		activeValue,
		setActiveValue
	};
}
function useGetOptionKey(props, config) {
	return computed(() => genGetKeyFn(props.labelKey || config.labelKey, props.getKey || config.getKey));
}
function usePanelGetOptionKey(props, config) {
	return computed(() => genGetKeyFn(props.labelKey || config.labelKey, props.getKey || config.getKey));
}
function genGetKeyFn(labelKey, getKeyFn) {
	return isString(getKeyFn) ? (record) => {
		let key = record[getKeyFn];
		if (key === void 0 && labelKey !== "value") key = record["value"];
		if (key === void 0) Logger.warn("components/select", "Each record in dataSource should have a unique `key` prop.");
		return key;
	} : getKeyFn;
}
function useKeyboardEvents(props, inputValue, selectedValue, activeValue, overlayOpened, changeActiveIndex, changeSelected, handleRemove, clearInput, setOverlayOpened) {
	return (evt) => {
		switch (evt.code) {
			case "ArrowUp":
				evt.preventDefault();
				changeActiveIndex(-1);
				break;
			case "ArrowDown":
				evt.preventDefault();
				changeActiveIndex(1);
				break;
			case "Enter": {
				evt.preventDefault();
				const key = activeValue.value;
				if (!isNil(key) && (props.allowInput && inputValue.value || overlayOpened.value)) changeSelected(key);
				if (!props.multiple && (overlayOpened.value || props.allowInput && inputValue.value)) {
					setOverlayOpened(false);
					evt.stopImmediatePropagation();
				}
				(props.allowInput || !props.multiple) && clearInput();
				break;
			}
			case "Backspace": {
				const selectedLength = selectedValue.value.length;
				if (!inputValue.value && selectedLength) handleRemove(selectedValue.value[selectedLength - 1]);
				break;
			}
			case "Escape":
				evt.preventDefault();
				setOverlayOpened(false);
		}
	};
}
var optionKey = Symbol("IxSelectOption");
var SelectOption = () => {};
SelectOption.displayName = "IxSelectOption";
SelectOption[optionKey] = true;
var optionGroupKey = Symbol("IxSelectOptionGroup");
var SelectOptionGroup = () => {};
SelectOptionGroup.displayName = "IxSelectOptionGroup";
SelectOptionGroup[optionGroupKey] = true;
function flattenOptions(options, childrenKey, getKeyFn, labelKey) {
	const flattenedOptions = [];
	const appendOption = (item, index, parentKey) => {
		const parsedOption = parseOption(item, (item2) => {
			var _a;
			return (_a = getKeyFn(item2)) != null ? _a : index;
		}, childrenKey, labelKey, parentKey);
		flattenedOptions.push(parsedOption);
		return parsedOption.key;
	};
	options == null || options.forEach((item, index) => {
		const children = item[childrenKey];
		const optionKey2 = appendOption(item, index);
		if (children && children.length > 0) children.forEach((child) => {
			appendOption(child, void 0, optionKey2);
		});
	});
	return flattenedOptions;
}
function unFlattenOptions(flattenedOptions, childrenKey, getKeyFn) {
	const options = [];
	let currentGroupKeys;
	flattenedOptions.forEach((option) => {
		const data = option.rawData;
		if (option.type === "group") {
			options.push(data);
			currentGroupKeys = new Set(data[childrenKey].map((item) => getKeyFn(item)));
		} else if (!(currentGroupKeys == null ? void 0 : currentGroupKeys.has(option.key))) options.push(data);
	});
	return options;
}
function parseOption(option, getKey, childrenKey, labelKey, parentKey) {
	const children = option[childrenKey];
	return {
		key: getKey(option),
		parentKey,
		label: option[labelKey],
		disabled: !!option.disabled,
		type: children && children.length > 0 ? "group" : "item",
		rawData: toRaw(option)
	};
}
function generateOption(value) {
	return {
		key: value,
		label: value,
		type: "item",
		rawData: {
			key: value,
			label: value
		}
	};
}
function useConvertedOptions(props, slots) {
	return computed(() => {
		var _a, _b;
		return (_b = props.dataSource) != null ? _b : convertOptions((_a = slots.default) == null ? void 0 : _a.call(slots));
	});
}
function useOptionKeyMap(options) {
	return computed(() => {
		const map = /* @__PURE__ */ new Map();
		options.value.forEach((option) => {
			map.set(option.key, option);
		});
		return map;
	});
}
function useFlattenedOptions(options, mergedChildrenKey, getKey, mergedLabelKey) {
	return computed(() => flattenOptions(options.value, mergedChildrenKey.value, getKey.value, mergedLabelKey.value));
}
var filterKeys = [optionKey, optionGroupKey];
function convertOptions(nodes, parentKey) {
	const convertedOptions = [];
	flattenNode(nodes, { key: filterKeys }).forEach((node, index) => {
		var _a, _b;
		const type = node.type;
		const slots = (_a = node.children) != null ? _a : {};
		const props = (_b = node.props) != null ? _b : {};
		if (type[optionKey]) {
			const { key, disabled, label, value } = props;
			const { label: customLabel, default: customLabel2 } = slots;
			const option = {
				key: value != null ? value : key,
				disabled: disabled || disabled === "",
				label,
				value,
				parentKey,
				customLabel: customLabel != null ? customLabel : customLabel2
			};
			convertedOptions.push(option);
		} else {
			const { key = index, label, children } = props;
			const { label: customLabel, default: defaultSlot } = slots;
			const _children = children != null ? children : convertOptions(defaultSlot == null ? void 0 : defaultSlot(), key);
			convertedOptions.push({
				key,
				label,
				children: _children,
				customLabel
			});
		}
	});
	return convertedOptions;
}
function useFilteredOptions(props, options, inputValue, mergedLabelKey) {
	const searchFilter = useSearchFn(props, mergedLabelKey);
	return computed(() => {
		const _options = options.value;
		const searchValue = inputValue.value;
		if (!searchValue) return _options;
		const filter = searchFilter.value;
		return filterOptions(_options, props.allowInput, searchValue, filter);
	});
}
function filterOptions(flattenedOptions, allowInput, searchValue, filter) {
	const filteredOptions = !filter ? flattenedOptions : flattenedOptions.filter((option) => filter(option.rawData, searchValue));
	if (allowInput) {
		if (!filteredOptions.find((option) => option.label === searchValue)) return [generateOption(searchValue), ...filteredOptions];
	}
	return filteredOptions;
}
function useSearchFn(props, mergedLabelKey) {
	return computed(() => {
		const searchFn = props.searchFn;
		if (isFunction(searchFn)) return searchFn;
		return searchFn ? getDefaultSearchFn(mergedLabelKey.value) : false;
	});
}
function getDefaultSearchFn(labelKey) {
	return (data, searchValue) => {
		const label = data[labelKey];
		const { children } = data;
		const hasChildrenMatch = children ? children.some((item) => matchRule(item.label, searchValue)) : false;
		return matchRule(String(label), searchValue) && !children || hasChildrenMatch;
	};
}
function matchRule(srcString, targetString) {
	return !isNil(srcString) && String(srcString).toLowerCase().includes(targetString.toLowerCase());
}
function usePanelProps(props, valueRef, activeValue, setActiveValue, onOptionClick) {
	return computed(() => ({
		activeValue: activeValue.value,
		selectedKeys: convertArray(valueRef.value),
		childrenKey: props.childrenKey,
		customAdditional: props.customAdditional,
		empty: props.empty,
		dndSortable: props.dndSortable,
		getKey: props.getKey,
		labelKey: props.labelKey,
		multiple: props.multiple,
		multipleLimit: props.multipleLimit,
		virtual: props.virtual,
		virtualItemHeight: props.virtualItemHeight,
		virtualScrollMode: props.virtualScrollMode,
		"onUpdate:activeValue": setActiveValue,
		onOptionClick,
		onScroll: props.onScroll,
		onScrolledChange: props.onScrolledChange,
		onScrolledBottom: props.onScrolledBottom,
		onDndSortReorder: props.onDndSortReorder,
		onDndSortChange: props.onDndSortChange,
		_virtualScrollHeight: props.overlayHeight
	}));
}
function useSelectedState$1(props, accessor, optionKeyMap) {
	const selectedValue = computed(() => convertArray(accessor.value));
	const selectedOptions = computed(() => selectedValue.value.map((value) => {
		var _a;
		return (_a = optionKeyMap.value.get(value)) != null ? _a : generateOption(value);
	}));
	const setSelectedValue = (value) => {
		const currValue = props.multiple ? value : value[0];
		const oldValue = toRaw(accessor.value);
		if (currValue !== oldValue) {
			accessor.setValue(currValue);
			callEmit(props.onChange, currValue, oldValue);
		}
	};
	const changeSelected = (key) => {
		const multiple = !!props.multiple;
		const currValue = selectedValue.value;
		const targetIndex = currValue.findIndex((item) => item === key);
		const isSelected = targetIndex > -1;
		if (!multiple) {
			!isSelected && setSelectedValue([key]);
			return;
		}
		if (isSelected) {
			setSelectedValue(currValue.filter((_, index) => targetIndex !== index));
			return;
		}
		if (selectedValue.value.length < props.multipleLimit) setSelectedValue([...currValue, key]);
	};
	const handleRemove = (key) => {
		setSelectedValue(selectedValue.value.filter((item) => key !== item));
	};
	const handleClear = (evt) => {
		setSelectedValue([]);
		callEmit(props.onClear, evt);
	};
	return {
		selectedValue,
		selectedOptions,
		changeSelected,
		handleRemove,
		handleClear
	};
}
var SELECT_PANEL_DATA_TOKEN = Symbol("SELECT_PANEL_DATA_TOKEN");
var selectPanelContext = Symbol("selectPanelContext");
function renderOptionLabel(slots, rawData, label) {
	var _a;
	const labelRender = (_a = rawData.customLabel) != null ? _a : "optionLabel";
	const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender;
	return labelSlot ? labelSlot(rawData) : label;
}
var defaultStyle = {
	height: 0,
	width: 0,
	overflow: "hidden"
};
var ListBox = (_, { slots }) => {
	const { selectedKeys, activeIndex, flattenedOptions } = inject(selectPanelContext);
	const currSelectedKeys = selectedKeys.value;
	return createVNode("div", {
		"role": "listbox",
		"style": defaultStyle
	}, [
		renderOption(slots, flattenedOptions.value[activeIndex.value - 1], currSelectedKeys),
		renderOption(slots, flattenedOptions.value[activeIndex.value], currSelectedKeys),
		renderOption(slots, flattenedOptions.value[activeIndex.value + 1], currSelectedKeys)
	]);
};
var renderOption = (slots, option, selectedValue) => {
	if (!option) return;
	const { key, label, rawData } = option;
	return createVNode("div", {
		"key": key,
		"role": "option",
		"aria-label": label,
		"aria-selected": selectedValue === key
	}, [renderOptionLabel(slots, rawData, label)]);
};
var selectPanelProps = {
	activeValue: {
		type: [
			String,
			Number,
			Symbol
		],
		default: void 0
	},
	selectedKeys: {
		type: Array,
		default: void 0
	},
	childrenKey: {
		type: String,
		default: void 0
	},
	customAdditional: {
		type: Function,
		default: void 0
	},
	dataSource: {
		type: Array,
		default: void 0
	},
	dndSortable: {
		type: [Boolean, Object],
		default: false
	},
	empty: {
		type: [String, Object],
		default: "simple"
	},
	getKey: {
		type: [String, Function],
		default: void 0
	},
	labelKey: {
		type: String,
		default: void 0
	},
	multiple: {
		type: Boolean,
		default: false
	},
	multipleLimit: {
		type: Number,
		default: Number.MAX_SAFE_INTEGER
	},
	virtual: {
		type: Boolean,
		default: false
	},
	virtualScrollMode: {
		type: String,
		default: void 0
	},
	virtualItemHeight: {
		type: Number,
		default: 32
	},
	"onUpdate:activeValue": [Function, Array],
	onOptionClick: [Function, Array],
	onScroll: [Function, Array],
	onScrolledChange: [Function, Array],
	onScrolledBottom: [Function, Array],
	onDndSortReorder: [Function, Array],
	onDndSortChange: [Function, Array],
	_virtualScrollHeight: {
		type: [Number, String],
		default: 256
	},
	_onDragStart: Function,
	_onDrop: Function
};
var selectProps = {
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
		type: [
			String,
			Number,
			Symbol,
			Array
		],
		default: void 0
	},
	open: {
		type: Boolean,
		default: void 0
	},
	allowInput: {
		type: Boolean,
		default: false
	},
	autocomplete: {
		type: String,
		default: "off"
	},
	autofocus: {
		type: Boolean,
		default: false
	},
	borderless: {
		type: Boolean,
		default: void 0
	},
	childrenKey: {
		type: String,
		default: void 0
	},
	clearable: {
		type: Boolean,
		default: false
	},
	clearIcon: {
		type: String,
		default: void 0
	},
	customAdditional: {
		type: Object,
		default: void 0
	},
	dataSource: {
		type: Array,
		default: void 0
	},
	dndSortable: {
		type: [Boolean, Object],
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	empty: {
		type: [String, Object],
		default: "simple"
	},
	getKey: {
		type: [String, Function],
		default: void 0
	},
	labelKey: {
		type: String,
		default: void 0
	},
	maxLabel: {
		type: [Number, String],
		default: Number.MAX_SAFE_INTEGER
	},
	multiple: {
		type: Boolean,
		default: false
	},
	multipleLimit: {
		type: Number,
		default: Number.MAX_SAFE_INTEGER
	},
	offset: Array,
	overlayClassName: {
		type: String,
		default: void 0
	},
	overlayContainer: {
		type: [
			String,
			HTMLElement,
			Function
		],
		default: void 0
	},
	overlayTabindex: {
		type: Number,
		default: void 0
	},
	overlayMatchWidth: {
		type: [Boolean, String],
		default: void 0
	},
	overlayRender: {
		type: Function,
		default: void 0
	},
	placeholder: {
		type: String,
		default: void 0
	},
	readonly: {
		type: Boolean,
		default: false
	},
	searchable: {
		type: [Boolean, String],
		default: false
	},
	searchFn: {
		type: [Boolean, Function],
		default: true
	},
	searchPlaceholder: {
		type: String,
		default: void 0
	},
	autoClearSearchValue: {
		type: Boolean,
		default: true
	},
	size: {
		type: String,
		default: void 0
	},
	status: String,
	suffix: {
		type: String,
		default: void 0
	},
	spin: {
		type: [Boolean, Object],
		default: void 0
	},
	virtual: {
		type: Boolean,
		default: false
	},
	virtualScrollMode: {
		type: String,
		default: void 0
	},
	virtualItemHeight: {
		type: Number,
		default: void 0
	},
	"onUpdate:value": [Function, Array],
	"onUpdate:open": [Function, Array],
	onChange: [Function, Array],
	onClear: [Function, Array],
	onFocus: [Function, Array],
	onBlur: [Function, Array],
	onSearch: [Function, Array],
	onScroll: [Function, Array],
	onScrolledChange: [Function, Array],
	onScrolledBottom: [Function, Array],
	onDndSortReorder: [Function, Array],
	onDndSortChange: [Function, Array],
	overlayHeight: {
		type: Number,
		default: 256
	}
};
var optionProps = {
	disabled: {
		type: Boolean,
		default: false
	},
	index: {
		type: Number,
		required: true
	},
	label: {
		type: [String, Number],
		default: void 0
	},
	optionKey: {
		type: [
			String,
			Number,
			Symbol
		],
		required: true
	},
	rawData: {
		type: Object,
		required: true
	},
	parentKey: {
		type: [
			String,
			Number,
			Symbol
		],
		default: void 0
	}
};
var optionGroupProps = {
	label: {
		type: [String, Number],
		default: void 0
	},
	index: {
		type: Number,
		required: true
	},
	rawData: {
		type: Object,
		required: true
	}
};
var Option = /* @__PURE__ */ defineComponent({
	props: optionProps,
	setup(props, { slots }) {
		const { props: selectPanelProps2, mergedPrefixCls, mergedDndSortable, selectedKeys, selectedLimit, selectedLimitTitle, activeValue, setActiveIndex } = inject(selectPanelContext);
		const isActive = computed(() => activeValue.value === props.optionKey);
		const isSelected = computed(() => selectedKeys.value.some((selectedKey) => selectedKey === props.optionKey));
		const isDisabled = computed(() => props.disabled || !isSelected.value && selectedLimit.value);
		const classes = computed(() => {
			const { parentKey } = props;
			const prefixCls = `${mergedPrefixCls.value}-option`;
			return {
				[prefixCls]: true,
				[`${prefixCls}-active`]: isActive.value,
				[`${prefixCls}-with-drag-handle`]: mergedDndSortable.value && mergedDndSortable.value.dragHandle,
				[`${prefixCls}-disabled`]: isDisabled.value,
				[`${prefixCls}-grouped`]: !isNil(parentKey),
				[`${prefixCls}-selected`]: isSelected.value
			};
		});
		const handleMouseEnter = () => setActiveIndex(props.index);
		const handleClick = (evt) => {
			callEmit(selectPanelProps2.onOptionClick, props.rawData, evt);
		};
		return () => {
			const { label, rawData } = props;
			const { multiple } = selectPanelProps2;
			const selected = isSelected.value;
			const disabled = isDisabled.value;
			const prefixCls = `${mergedPrefixCls.value}-option`;
			const _label = toString(label);
			const title = disabled && selectedLimitTitle.value || _label;
			const customAdditional = selectPanelProps2.customAdditional ? selectPanelProps2.customAdditional({
				data: rawData,
				index: props.index
			}) : void 0;
			const optionContentNodes = [multiple && createVNode(IxCheckbox, {
				"checked": selected,
				"disabled": disabled
			}, null), createVNode("span", { "class": `${prefixCls}-label` }, [renderOptionLabel(slots, rawData, _label)])];
			const optionsProps = {
				class: classes.value,
				title,
				onMouseenter: disabled ? void 0 : handleMouseEnter,
				onClick: disabled ? void 0 : handleClick,
				"aria-label": _label,
				"aria-selected": selected,
				...customAdditional
			};
			return mergedDndSortable.value ? createVNode(CdkDndSortableItem, mergeProps({
				"itemKey": props.optionKey,
				"canDrag": !isDisabled.value
			}, optionsProps), { default: () => [mergedDndSortable.value.dragHandle ? createVNode(CdkDndSortableHandle, { "class": `${prefixCls}-drag-handle` }, { default: () => [!isDisabled.value && createVNode(IxIcon, { "name": mergedDndSortable.value.dragHandle }, null)] }) : void 0, optionContentNodes] }) : createVNode("div", optionsProps, [optionContentNodes]);
		};
	}
});
var OptionGroup = /* @__PURE__ */ defineComponent({
	props: optionGroupProps,
	setup(props, { slots }) {
		const { props: selectProps2, mergedPrefixCls } = inject(selectPanelContext);
		return () => {
			var _a;
			const { label, rawData } = props;
			const _label = toString(label);
			const prefixCls = `${mergedPrefixCls.value}-option-group`;
			const labelRender = (_a = rawData.customLabel) != null ? _a : "optionGroupLabel";
			const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender;
			const customAdditional = selectProps2.customAdditional ? selectProps2.customAdditional({
				data: rawData,
				index: props.index
			}) : void 0;
			return createVNode("div", mergeProps({
				"class": prefixCls,
				"title": _label,
				"aria-label": _label
			}, customAdditional), [createVNode("span", { "class": `${prefixCls}-label` }, [labelSlot ? labelSlot(rawData) : _label])]);
		};
	}
});
function getDefaultThemeTokens(tokens) {
	const { fontSizeSm, heightMd, marginSizeSm, marginSizeMd, paddingSizeXs, paddingSizeSm, paddingSizeMd, paddingSizeXl } = tokens;
	return {
		optionFontSize: fontSizeSm,
		optionHeight: heightMd,
		optionPadding: `${paddingSizeSm}px ${paddingSizeMd}px`,
		optionLabelMarginLeft: marginSizeSm,
		optionContainerPadding: `${paddingSizeXs}px 0`,
		optionGroupMargin: `0 ${marginSizeMd}px`,
		optionGroupPaddingLeft: 0,
		multipleOptionGroupedPaddingLeft: paddingSizeMd,
		optionGroupedPaddingLeft: paddingSizeXl,
		overlaySearchWrapperPadding: `${paddingSizeXs}px ${paddingSizeMd}px ${paddingSizeSm}px`
	};
}
var getThemeTokens = (tokens, presetTheme) => {
	return presetTheme === "default" ? getDefaultThemeTokens(tokens) : getDefaultThemeTokens(tokens);
};
function usePanelActiveState(props, flattenedOptions, selectedKeys, scrollTo) {
	const [activeValue, setActiveValue] = useControlledProp(props, "activeValue");
	const keyIndexMap = computed(() => {
		const map = /* @__PURE__ */ new Map();
		flattenedOptions.value.forEach((option, index) => {
			map.set(option.key, index);
		});
		return map;
	});
	const activeIndex = ref(0);
	const setActiveIndex = (index) => {
		var _a, _b;
		activeIndex.value = index;
		((_a = flattenedOptions.value[index]) == null ? void 0 : _a.key) !== activeValue.value && setActiveValue((_b = flattenedOptions.value[index]) == null ? void 0 : _b.key);
	};
	const scrollToActivated = () => {
		scrollTo({ index: activeIndex.value });
	};
	onMounted(() => {
		const options = flattenedOptions.value;
		const currValue = selectedKeys.value.length ? selectedKeys.value : [activeValue.value];
		const currIndex = options.findIndex((option) => currValue.some((value) => option.key === value));
		setActiveIndex(currIndex !== -1 ? getEnabledActiveIndex(options, currIndex, 1) : -1);
		watch([() => props.activeValue, flattenedOptions], ([value, options2]) => {
			var _a;
			const targetIndex = isNil(value) ? -1 : (_a = keyIndexMap.value.get(value)) != null ? _a : -1;
			setActiveIndex(targetIndex !== -1 ? getEnabledActiveIndex(options2, targetIndex, 1) : -1);
		}, { flush: "post" });
		scrollToActivated();
	});
	const changeActiveIndex = (offset) => {
		const enabledIndex = getEnabledActiveIndex(flattenedOptions.value, activeIndex.value + offset, offset % 2);
		if (enabledIndex !== activeIndex.value) {
			setActiveIndex(enabledIndex);
			if (offset !== 0) scrollToActivated();
		}
	};
	return {
		activeValue,
		activeIndex,
		setActiveIndex,
		changeActiveIndex,
		scrollToActivated
	};
}
function getEnabledActiveIndex(options, currIndex, offset) {
	const length = options.length;
	for (let index = 0; index < length; index++) {
		const current = (currIndex + index * offset + length) % length;
		const { type, disabled } = options[current];
		if (type !== "group" && !disabled) return current;
	}
	return -1;
}
function useSelectedState(props, locale) {
	const selectedKeys = computed(() => convertArray(props.selectedKeys));
	const selectedLimit = computed(() => selectedKeys.value.length >= props.multipleLimit);
	return {
		selectedKeys,
		selectedLimit,
		selectedLimitTitle: computed(() => {
			if (!selectedLimit.value) return "";
			return locale.select.limitMessage.replace("${0}", `${props.multipleLimit}`);
		})
	};
}
var Panel = /* @__PURE__ */ defineComponent({
	name: "IxSelectPanel",
	props: selectPanelProps,
	setup(props, { slots, expose }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("select");
		registerToken(getThemeTokens);
		const mergedPrefixCls = computed(() => `${common.prefixCls}-select`);
		const config = useGlobalConfig("select");
		const locale = useGlobalConfig("locale");
		const mergedDndSortable = computed(() => {
			var _a;
			const dndSortable = props.dndSortable;
			if (!dndSortable) return false;
			if (dndSortable === true) return {
				autoScroll: true,
				dragHandle: false
			};
			return {
				autoScroll: (_a = dndSortable.autoScroll) != null ? _a : true,
				dragHandle: dndSortable.dragHandle === true ? "holder" : false
			};
		});
		const { flattenedOptions, mergedChildrenKey, getKey } = useSelectPanelDataContext(props, config);
		const selectedStateContext = useSelectedState(props, locale);
		const virtualScrollRef = ref();
		const scrollTo = (options) => {
			var _a;
			return (_a = virtualScrollRef.value) == null ? void 0 : _a.scrollTo(options);
		};
		const activeStateContext = usePanelActiveState(props, flattenedOptions, selectedStateContext.selectedKeys, scrollTo);
		useDndAutoScroll(computed(() => {
			var _a;
			if (!mergedDndSortable.value) return;
			return mergedDndSortable.value.autoScroll ? (_a = virtualScrollRef.value) == null ? void 0 : _a.getHolderElement() : void 0;
		}), {
			canScroll: true,
			allowedAxis: "vertical"
		});
		expose({
			scrollTo,
			changeActiveIndex: activeStateContext.changeActiveIndex
		});
		provide(selectPanelContext, {
			props,
			mergedPrefixCls,
			flattenedOptions,
			mergedDndSortable,
			...selectedStateContext,
			...activeStateContext
		});
		const panelClasses = computed(() => {
			const prefixCls = `${mergedPrefixCls.value}-panel`;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[prefixCls]: true,
				[`${prefixCls}-multiple`]: !!props.multiple
			});
		});
		const handleScrolledChange = (startIndex, endIndex, visibleOptions) => {
			const { onScrolledChange } = props;
			if (onScrolledChange) callEmit(onScrolledChange, startIndex, endIndex, visibleOptions.map((item) => item.rawData));
		};
		const handleSortReorder = (reorderInfo) => {
			callEmit(props.onDndSortReorder, reorderInfo);
		};
		const handleSortChange = (newData) => {
			const oldData = props.dataSource ? toRaw(props.dataSource) : [];
			const unFlattenedNewData = unFlattenOptions(newData, mergedChildrenKey.value, getKey.value);
			callEmit(props.onDndSortChange, unFlattenedNewData, oldData);
		};
		return () => {
			const { _virtualScrollHeight, virtualItemHeight, virtualScrollMode, virtual, onScroll, onScrolledBottom } = props;
			const options = flattenedOptions.value;
			const children = [createVNode(ListBox, null, slots)];
			if (options.length > 0) {
				const rowRender = ({ item, index }) => {
					const { type, key, ...rest } = item;
					return type === "group" ? createVNode(OptionGroup, mergeProps({ "index": index }, rest), slots) : createVNode(Option, mergeProps({
						"index": index,
						"optionKey": key
					}, rest), slots);
				};
				const list = createVNode(CdkVirtualScroll, {
					"ref": virtualScrollRef,
					"dataSource": options,
					"getKey": "key",
					"height": _virtualScrollHeight,
					"rowHeight": virtualItemHeight,
					"scrollMode": virtual ? virtualScrollMode : void 0,
					"rowRender": rowRender,
					"virtual": virtual,
					"onScroll": onScroll,
					"onScrolledBottom": onScrolledBottom,
					"onScrolledChange": handleScrolledChange
				}, null);
				children.push(mergedDndSortable.value ? createVNode(CdkDndSortable, {
					"dataSource": options,
					"onSortReorder": handleSortReorder,
					"onSortChange": handleSortChange,
					"onDragStart": props._onDragStart,
					"onDrop": props._onDrop
				}, { default: () => [list] }) : list);
			} else children.push(createVNode(ɵEmpty, { "empty": props.empty }, slots));
			return createVNode("div", { "class": panelClasses.value }, [children]);
		};
	}
});
function useSelectPanelDataContext(props, config) {
	const dataContext = inject(SELECT_PANEL_DATA_TOKEN, null);
	const mergedChildrenKey = computed(() => {
		var _a;
		return (_a = props.childrenKey) != null ? _a : config.childrenKey;
	});
	const mergedLabelKey = computed(() => {
		var _a;
		return (_a = props.labelKey) != null ? _a : config.labelKey;
	});
	const getKey = usePanelGetOptionKey(props, config);
	return {
		flattenedOptions: dataContext ? dataContext.flattenedOptions : useFlattenedOptions(computed(() => props.dataSource), mergedChildrenKey, getKey, mergedLabelKey),
		mergedChildrenKey,
		mergedLabelKey,
		getKey
	};
}
var Select = /* @__PURE__ */ defineComponent({
	name: "IxSelect",
	inheritAttrs: false,
	props: selectProps,
	setup(props, { attrs, expose, slots }) {
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("select");
		registerToken(getThemeTokens);
		const config = useGlobalConfig("select");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-select`);
		const triggerRef = ref();
		const focus = () => {
			var _a;
			return (_a = triggerRef.value) == null ? void 0 : _a.focus();
		};
		const blur = () => {
			var _a;
			return (_a = triggerRef.value) == null ? void 0 : _a.blur();
		};
		const panelRef = ref();
		const scrollTo = (...params) => {
			var _a;
			return (_a = panelRef.value) == null ? void 0 : _a.scrollTo(...params);
		};
		const changeActiveIndex = (offset) => {
			var _a;
			return (_a = panelRef.value) == null ? void 0 : _a.changeActiveIndex(offset);
		};
		const [inputValue, _setInputValue] = useState("");
		const setInputValue = (input) => {
			_setInputValue(input);
			props.searchable && callEmit(props.onSearch, input);
		};
		const clearInput = () => {
			var _a;
			props.searchable === "overlay" ? setInputValue("") : (_a = triggerRef.value) == null || _a.clearInput();
		};
		expose({
			focus,
			blur,
			scrollTo
		});
		const [overlayOpened, setOverlayOpened] = useControlledProp(props, "open", false);
		const { accessor, control } = useAccessorAndControl();
		const commonControlProps = useMergedCommonControlProps(props, config);
		useFormItemRegister(control);
		const mergedStatus = useFormStatus(props, control);
		const getKey = useGetOptionKey(props, config);
		const { options, optionKeyMap } = useSelectOptions(props, config, slots, getKey, inputValue);
		provide(SELECT_PANEL_DATA_TOKEN, { flattenedOptions: options });
		const { selectedValue, selectedOptions, changeSelected, handleClear, handleRemove } = useSelectedState$1(props, accessor, optionKeyMap);
		const { activeValue, setActiveValue } = useActiveState(props, inputValue);
		const handleKeyDown = useKeyboardEvents(props, inputValue, selectedValue, activeValue, overlayOpened, changeActiveIndex, changeSelected, handleRemove, clearInput, setOverlayOpened);
		watch(overlayOpened, (opened) => {
			if (opened) focus();
		});
		const handleOptionClick = (option) => {
			var _a;
			changeSelected((_a = getKey.value(option)) != null ? _a : option.key);
			(props.autoClearSearchValue || !props.multiple) && clearInput();
			if (!props.multiple) setOverlayOpened(false);
		};
		const onFocus = (evt) => {
			callEmit(props.onFocus, evt);
		};
		const onBlur = (evt) => {
			if (inputValue.value) {
				if (props.allowInput) changeSelected(inputValue.value);
				clearInput();
			}
			accessor.markAsBlurred();
			callEmit(props.onBlur, evt);
		};
		const handleItemRemove = (value) => {
			focus();
			handleRemove(value);
		};
		const panelProps = usePanelProps(props, selectedValue, activeValue, setActiveValue, handleOptionClick);
		const overlayClasses = computed(() => {
			const { overlayClassName } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[globalHashId.value]: !!globalHashId.value,
				[hashId.value]: !!hashId.value,
				[`${prefixCls}-overlay`]: true,
				[overlayClassName || ""]: !!overlayClassName
			});
		});
		const selectorAllowInput = computed(() => {
			if (props.searchable === "overlay") return false;
			return props.searchable ? "searchable" : props.allowInput;
		});
		const renderTrigger = ({ borderless, status, clearable, clearIcon, readonly, disabled, size, suffix, suffixRotate, focused, opened }) => [createVNode(IxSelector, {
			"ref": triggerRef,
			"class": mergedPrefixCls.value,
			"allowInput": selectorAllowInput.value,
			"autocomplete": props.autocomplete,
			"autofocus": props.autofocus,
			"borderless": borderless,
			"clearable": clearable,
			"clearIcon": clearIcon,
			"dataSource": selectedOptions.value,
			"disabled": disabled,
			"focused": focused,
			"maxLabel": props.maxLabel,
			"multiple": props.multiple,
			"opened": opened,
			"placeholder": props.placeholder,
			"readonly": readonly,
			"size": size,
			"status": status,
			"suffix": suffix,
			"suffixRotate": suffixRotate,
			"onClear": handleClear,
			"onInputValueChange": setInputValue,
			"onItemRemove": handleItemRemove,
			"onKeydown": handleKeyDown
		}, slots)];
		const renderLoading = (children) => {
			const { spin } = props;
			const spinProps = isBoolean(spin) ? { spinning: spin } : spin;
			return spinProps ? createVNode(IxSpin, spinProps, { default: () => [children] }) : children;
		};
		const renderContent = () => {
			var _a;
			const children = [renderLoading(createVNode(Panel, mergeProps({ "ref": panelRef }, panelProps.value), slots))];
			const { searchable, overlayRender } = props;
			if (searchable === "overlay") {
				const value = inputValue.value;
				const clearIcon = (_a = props.clearIcon) != null ? _a : config.clearIcon;
				const handleSearchInput = (evt) => {
					const { value: value2 } = evt.target;
					setInputValue(value2);
				};
				const handleSearchClear = () => {
					setInputValue("");
				};
				children.unshift(createVNode("div", { "class": `${mergedPrefixCls.value}-overlay-search-wrapper` }, [createVNode(ɵInput, {
					"clearable": true,
					"clearIcon": clearIcon,
					"clearVisible": !!value,
					"placeholder": props.searchPlaceholder,
					"size": "sm",
					"suffix": "search",
					"value": value,
					"onClear": handleSearchClear,
					"onInput": handleSearchInput
				}, null)]));
			}
			return [createVNode("div", null, [overlayRender ? overlayRender(children) : children])];
		};
		return () => {
			var _a, _b, _c, _d;
			const { suffix, borderless, clearIcon, size } = commonControlProps.value;
			const controlTriggerProps = {
				autofocus: props.autofocus,
				overlayClassName: overlayClasses.value,
				overlayContainer: (_a = props.overlayContainer) != null ? _a : config.overlayContainer,
				overlayContainerFallback: `.${mergedPrefixCls.value}-overlay-container`,
				overlayTabindex: (_b = props.overlayTabindex) != null ? _b : config.overlayTabindex,
				overlayMatchWidth: (_c = props.overlayMatchWidth) != null ? _c : config.overlayMatchWidth,
				class: mergedPrefixCls.value,
				borderless,
				value: selectedValue.value,
				offset: (_d = props.offset) != null ? _d : config.offset,
				open: overlayOpened.value,
				readonly: props.readonly,
				size,
				status: mergedStatus.value,
				suffix,
				clearable: props.clearable,
				clearIcon,
				disabled: accessor.disabled,
				onFocus,
				onBlur,
				"onUpdate:open": setOverlayOpened
			};
			const controlTriggerSlots = {
				trigger: renderTrigger,
				overlay: renderContent
			};
			return createVNode(IxControlTrigger, mergeProps(controlTriggerProps, attrs), controlTriggerSlots);
		};
	}
});
function useSelectOptions(props, config, slots, getKey, inputValue) {
	const mergedChildrenKey = computed(() => {
		var _a;
		return (_a = props.childrenKey) != null ? _a : config.childrenKey;
	});
	const mergedLabelKey = computed(() => {
		var _a;
		return (_a = props.labelKey) != null ? _a : config.labelKey;
	});
	const flattenedOptions = useFlattenedOptions(useConvertedOptions(props, slots), mergedChildrenKey, getKey, mergedLabelKey);
	return {
		options: useFilteredOptions(props, flattenedOptions, inputValue, mergedLabelKey),
		optionKeyMap: useOptionKeyMap(flattenedOptions)
	};
}
var IxSelect = Select;
// src/components/radar/demos/Basic.vue?vue&type=script&setup=true&lang.ts
var splitNumber = 5;
var Basic_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Basic",
	setup(__props, { expose: __expose }) {
		__expose();
		use([install]);
		addIconDefinitions([
			Empty$1,
			Down,
			Loading
		]);
		const { themeTokens } = useThemeToken();
		const objectCount = ref(2);
		const dimensionCount = ref(5);
		const gridStyle = ref("area");
		const gridSpacing = ref(30);
		const shapeStyle = ref("line");
		const chartStatus = ref("normal");
		const objectOptions = [
			1,
			2,
			3,
			4
		].map((value) => ({
			key: value,
			label: String(value)
		}));
		const dimensionOptions = Array.from({ length: 10 }, (_, index) => ({
			key: index + 3,
			label: String(index + 3)
		}));
		const radius = computed(() => gridSpacing.value * splitNumber);
		const chartHeight = computed(() => radius.value * 2 + 130);
		const chartStyle = computed(() => ({
			minWidth: `${radius.value * 2 + 280}px`,
			height: `${chartHeight.value}px`
		}));
		const dimensions = [
			"攻击路径",
			"可用性影响",
			"影响范围",
			"权限要求",
			"攻击难度",
			"攻击手法",
			"扩散风险",
			"攻击坦度",
			"保密性影响",
			"完整性影响",
			"用户交互",
			"修复成本"
		];
		const dimensionIndices = computed(() => {
			if (dimensionCount.value === 3) return [
				0,
				5,
				4
			];
			if (dimensionCount.value === 5) return [
				0,
				1,
				2,
				3,
				4
			];
			return [
				0,
				5,
				1,
				2,
				6,
				3,
				4,
				7,
				8,
				9,
				10,
				11
			].slice(0, dimensionCount.value);
		});
		const indicators = computed(() => dimensionIndices.value.map((index) => dimensions[index]));
		const values = [
			[
				12,
				21,
				17,
				23,
				10,
				14,
				18,
				20,
				16,
				13,
				19,
				22
			],
			[
				14,
				17,
				21,
				17,
				22,
				19,
				12,
				16,
				20,
				18,
				15,
				11
			],
			[
				18,
				13,
				16,
				19,
				15,
				22,
				20,
				12,
				14,
				23,
				17,
				21
			],
			[
				21,
				19,
				12,
				15,
				18,
				16,
				23,
				14,
				11,
				20,
				22,
				17
			]
		];
		const data = computed(() => chartStatus.value === "empty" || chartStatus.value === "loading" ? [] : values.slice(0, objectCount.value).map((row, index) => ({
			name: `攻击${String.fromCharCode(65 + index)}`,
			value: dimensionIndices.value.map((index) => chartStatus.value === "allZero" ? 0 : row[index]),
			itemStyle: {
				color: seerColors[index],
				borderColor: themeTokens.value.colorContainerBg,
				borderWidth: 1.5
			}
		})));
		const chartBindings = computed(() => ({
			indicator: indicators.value.map((name) => ({
				name,
				min: 0,
				max: 25
			})),
			data: data.value,
			clockwise: true,
			area: shapeStyle.value === "area",
			gridStyle: gridStyle.value,
			splitNumber,
			radius: radius.value,
			center: ["50%", radius.value + 45],
			animationDurationUpdate: 200,
			textStyle: { fontFamily: themeTokens.value.fontFamily },
			legend: {
				bottom: 8,
				left: "center",
				icon: "roundRect",
				itemWidth: 12,
				itemHeight: 12,
				itemGap: 32,
				data: data.value.map((item) => item.name)
			},
			graphic: Array.from({ length: splitNumber }, (_, index) => ({
				type: "text",
				left: "center",
				top: radius.value + 45 - (index + 1) * gridSpacing.value - 7,
				silent: true,
				z: 10,
				style: {
					text: String((index + 1) * 5),
					fill: themeTokens.value.colorTextInfo,
					font: `12px ${themeTokens.value.fontFamily}`
				}
			}))
		}));
		let reloadTimer;
		const cancelReload = () => {
			clearTimeout(reloadTimer);
			reloadTimer = void 0;
		};
		const reloadChart = () => {
			cancelReload();
			chartStatus.value = "loading";
			reloadTimer = setTimeout(() => {
				chartStatus.value = "normal";
				reloadTimer = void 0;
			}, 800);
		};
		watch(chartStatus, (status) => {
			if (status !== "loading") cancelReload();
		});
		onBeforeUnmount(cancelReload);
		const __returned__ = {
			themeTokens,
			objectCount,
			dimensionCount,
			gridStyle,
			gridSpacing,
			shapeStyle,
			chartStatus,
			objectOptions,
			dimensionOptions,
			splitNumber,
			radius,
			chartHeight,
			chartStyle,
			dimensions,
			dimensionIndices,
			indicators,
			values,
			data,
			chartBindings,
			get reloadTimer() {
				return reloadTimer;
			},
			set reloadTimer(v) {
				reloadTimer = v;
			},
			cancelReload,
			reloadChart
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
var Basic_vue_vue_type_archive_meta_index_0_lang_default = {
	title: "基础型",
	description: "支持 1–4 个对象、3–12 个维度、线面/线框网格、20/30/40px 径向间距及线性/面性图形切换。固定五等分与 0–25 量程，支持正常、全零、空状态、加载中及模拟重试，窄容器可横向滚动。",
	index: 0
};
// src/components/radar/demos/Basic.vue
var _hoisted_1 = { class: "radar-demo-scroll" };
var _hoisted_2 = {
	key: 0,
	class: "radar-demo-placeholder"
};
var _hoisted_3 = {
	key: 1,
	class: "radar-demo-placeholder",
	role: "status",
	"aria-live": "polite",
	"aria-busy": "true"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_IxSelect = IxSelect;
	const _component_IxSpace = IxSpace;
	const _component_IxRadio = IxRadio;
	const _component_IxRadioGroup = IxRadioGroup;
	const _component_IxButton = IxButton;
	const _component_IxEmpty = IxEmpty;
	const _component_IxRadarChart = IxRadarChart;
	return openBlock(), createBlock(_component_IxSpace, {
		vertical: "",
		block: "",
		class: "radar-demo",
		size: 20
	}, {
		default: withCtx(() => [
			createVNode(_component_IxSpace, {
				wrap: "",
				size: 24,
				align: "center"
			}, {
				default: withCtx(() => [
					createVNode(_component_IxSpace, {
						align: "center",
						role: "group",
						"aria-label": "对象个数"
					}, {
						default: withCtx(() => [_cache[6] || (_cache[6] = createBaseVNode("span", null, "对象个数", -1)), createVNode(_component_IxSelect, {
							value: $setup.objectCount,
							"onUpdate:value": _cache[0] || (_cache[0] = ($event) => $setup.objectCount = $event),
							dataSource: $setup.objectOptions,
							size: "sm",
							style: { width: "80px" },
							"aria-label": "对象个数"
						}, null, 8, ["value", "dataSource"])]),
						_: 1
					}),
					createVNode(_component_IxSpace, {
						align: "center",
						role: "group",
						"aria-label": "变量个数"
					}, {
						default: withCtx(() => [_cache[7] || (_cache[7] = createBaseVNode("span", null, "变量个数", -1)), createVNode(_component_IxSelect, {
							value: $setup.dimensionCount,
							"onUpdate:value": _cache[1] || (_cache[1] = ($event) => $setup.dimensionCount = $event),
							dataSource: $setup.dimensionOptions,
							size: "sm",
							style: { width: "80px" },
							"aria-label": "变量个数"
						}, null, 8, ["value", "dataSource"])]),
						_: 1
					}),
					createVNode(_component_IxSpace, { align: "center" }, {
						default: withCtx(() => [_cache[10] || (_cache[10] = createBaseVNode("span", null, "网格线样式", -1)), createVNode(_component_IxRadioGroup, {
							value: $setup.gridStyle,
							"onUpdate:value": _cache[2] || (_cache[2] = ($event) => $setup.gridStyle = $event),
							buttoned: "",
							size: "sm"
						}, {
							default: withCtx(() => [createVNode(_component_IxRadio, { key: "area" }, {
								default: withCtx(() => [..._cache[8] || (_cache[8] = [createTextVNode("线面", -1)])]),
								_: 1
							}), createVNode(_component_IxRadio, { key: "line" }, {
								default: withCtx(() => [..._cache[9] || (_cache[9] = [createTextVNode("线框", -1)])]),
								_: 1
							})]),
							_: 1
						}, 8, ["value"])]),
						_: 1
					}),
					createVNode(_component_IxSpace, { align: "center" }, {
						default: withCtx(() => [_cache[14] || (_cache[14] = createBaseVNode("span", null, "网格线间距", -1)), createVNode(_component_IxRadioGroup, {
							value: $setup.gridSpacing,
							"onUpdate:value": _cache[3] || (_cache[3] = ($event) => $setup.gridSpacing = $event),
							buttoned: "",
							size: "sm"
						}, {
							default: withCtx(() => [
								(openBlock(), createBlock(_component_IxRadio, { key: 20 }, {
									default: withCtx(() => [..._cache[11] || (_cache[11] = [createTextVNode("紧凑", -1)])]),
									_: 1
								})),
								(openBlock(), createBlock(_component_IxRadio, { key: 30 }, {
									default: withCtx(() => [..._cache[12] || (_cache[12] = [createTextVNode("适中", -1)])]),
									_: 1
								})),
								(openBlock(), createBlock(_component_IxRadio, { key: 40 }, {
									default: withCtx(() => [..._cache[13] || (_cache[13] = [createTextVNode("宽松", -1)])]),
									_: 1
								}))
							]),
							_: 1
						}, 8, ["value"])]),
						_: 1
					}),
					createVNode(_component_IxSpace, { align: "center" }, {
						default: withCtx(() => [_cache[17] || (_cache[17] = createBaseVNode("span", null, "图形样式", -1)), createVNode(_component_IxRadioGroup, {
							value: $setup.shapeStyle,
							"onUpdate:value": _cache[4] || (_cache[4] = ($event) => $setup.shapeStyle = $event),
							buttoned: "",
							size: "sm"
						}, {
							default: withCtx(() => [createVNode(_component_IxRadio, { key: "line" }, {
								default: withCtx(() => [..._cache[15] || (_cache[15] = [createTextVNode("线性", -1)])]),
								_: 1
							}), createVNode(_component_IxRadio, { key: "area" }, {
								default: withCtx(() => [..._cache[16] || (_cache[16] = [createTextVNode("面性", -1)])]),
								_: 1
							})]),
							_: 1
						}, 8, ["value"])]),
						_: 1
					})
				]),
				_: 1
			}),
			createVNode(_component_IxRadioGroup, {
				value: $setup.chartStatus,
				"onUpdate:value": _cache[5] || (_cache[5] = ($event) => $setup.chartStatus = $event),
				buttoned: "",
				size: "sm",
				"aria-label": "图表状态"
			}, {
				default: withCtx(() => [
					createVNode(_component_IxRadio, { key: "normal" }, {
						default: withCtx(() => [..._cache[18] || (_cache[18] = [createTextVNode("正常", -1)])]),
						_: 1
					}),
					createVNode(_component_IxRadio, { key: "allZero" }, {
						default: withCtx(() => [..._cache[19] || (_cache[19] = [createTextVNode("全部数值为 0", -1)])]),
						_: 1
					}),
					createVNode(_component_IxRadio, { key: "empty" }, {
						default: withCtx(() => [..._cache[20] || (_cache[20] = [createTextVNode("空状态", -1)])]),
						_: 1
					}),
					createVNode(_component_IxRadio, { key: "loading" }, {
						default: withCtx(() => [..._cache[21] || (_cache[21] = [createTextVNode("加载中", -1)])]),
						_: 1
					})
				]),
				_: 1
			}, 8, ["value"]),
			createBaseVNode("div", _hoisted_1, [createBaseVNode("div", { style: normalizeStyle($setup.chartStyle) }, [$setup.chartStatus === "empty" ? (openBlock(), createElementBlock("div", _hoisted_2, [createVNode(_component_IxEmpty, { simple: "" }, {
				description: withCtx(() => [createVNode(_component_IxSpace, { align: "center" }, {
					default: withCtx(() => [_cache[23] || (_cache[23] = createBaseVNode("span", null, "暂无数据", -1)), createVNode(_component_IxButton, {
						mode: "link",
						size: "sm",
						onClick: $setup.reloadChart
					}, {
						default: withCtx(() => [..._cache[22] || (_cache[22] = [createTextVNode("重新加载", -1)])]),
						_: 1
					})]),
					_: 1
				})]),
				_: 1
			})])) : $setup.chartStatus === "loading" ? (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[24] || (_cache[24] = [createBaseVNode("svg", {
				width: "80",
				height: "80",
				viewBox: "0 0 80 80",
				"aria-hidden": "true"
			}, [createBaseVNode("g", {
				fill: "none",
				stroke: "currentColor"
			}, [
				createBaseVNode("path", { d: "M40 4 74 29 61 69 19 69 6 29Z" }),
				createBaseVNode("path", { d: "M40 16 63 33 54 60 26 60 17 33Z" }),
				createBaseVNode("path", { d: "M40 28 51 36 47 50 33 50 29 36Z" }),
				createBaseVNode("path", { d: "M40 40V4M40 40 74 29M40 40 61 69M40 40 19 69M40 40 6 29" })
			])], -1), createBaseVNode("span", null, "图表正在加载中，请稍后...", -1)])])) : (openBlock(), createBlock(_component_IxRadarChart, mergeProps({
				key: 2,
				style: {
					"width": "100%",
					"height": "100%"
				}
			}, $setup.chartBindings), null, 16))], 4)])
		]),
		_: 1
	});
}
if (typeof Basic_vue_vue_type_archive_meta_index_0_lang_default === "function") Basic_vue_vue_type_archive_meta_index_0_lang_default(Basic_vue_vue_type_script_setup_true_lang_default);
// ../../../../../../../archive__resolvedarchive-demo:/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/demos/Basic.vue__resolved
var __archive_data__ = {
	"id": "archive-item-60",
	"filename": "Basic.vue",
	"relativePath": "components/radar/demos/Basic.vue",
	"query": {},
	"title": "基础型",
	"description": "支持 1–4 个对象、3–12 个维度、线面/线框网格、20/30/40px 径向间距及线性/面性图形切换。固定五等分与 0–25 量程，支持正常、全零、空状态、加载中及模拟重试，窄容器可横向滚动。",
	"index": 0,
	"sourceCodes": [{
		"filename": "Basic.vue",
		"code": "<script setup lang=\"ts\">\nimport type { RadarChartProps } from '@idux/charts'\nimport { seerColors } from '@idux/charts'\nimport { computed, onBeforeUnmount, ref, watch } from 'vue'\nimport { useThemeToken } from '@idux/components/theme'\nimport { Empty, Down, Loading, addIconDefinitions } from '@idux/components/icon'\nimport { GraphicComponent } from 'echarts/components'\nimport { use } from 'echarts/core'\n\nuse([GraphicComponent])\naddIconDefinitions([Empty, Down, Loading])\nconst { themeTokens } = useThemeToken()\nconst objectCount = ref(2)\nconst dimensionCount = ref(5)\nconst gridStyle = ref<'area' | 'line'>('area')\nconst gridSpacing = ref(30)\nconst shapeStyle = ref('line')\ntype ChartStatus = 'normal' | 'allZero' | 'empty' | 'loading'\nconst chartStatus = ref<ChartStatus>('normal')\nconst objectOptions = [1, 2, 3, 4].map(value => ({ key: value, label: String(value) }))\nconst dimensionOptions = Array.from({ length: 10 }, (_, index) => ({\n  key: index + 3,\n  label: String(index + 3),\n}))\n\n// 五等分、固定 0–25 刻度。间距为沿径向的 CSS px，改变间距同步改变半径。\nconst splitNumber = 5\nconst radius = computed(() => gridSpacing.value * splitNumber)\nconst chartHeight = computed(() => radius.value * 2 + 130)\nconst chartStyle = computed(() => ({\n  minWidth: `${radius.value * 2 + 280}px`,\n  height: `${chartHeight.value}px`,\n}))\nconst dimensions = [\n  '攻击路径',\n  '可用性影响',\n  '影响范围',\n  '权限要求',\n  '攻击难度',\n  '攻击手法',\n  '扩散风险',\n  '攻击坦度',\n  '保密性影响',\n  '完整性影响',\n  '用户交互',\n  '修复成本',\n]\n// 三维、五维和八维使用设计稿的维度顺序，其余数量沿用完整的业务顺序。\nconst dimensionIndices = computed(() => {\n  if (dimensionCount.value === 3) return [0, 5, 4]\n  if (dimensionCount.value === 5) return [0, 1, 2, 3, 4]\n  return [0, 5, 1, 2, 6, 3, 4, 7, 8, 9, 10, 11].slice(0, dimensionCount.value)\n})\nconst indicators = computed(() => dimensionIndices.value.map(index => dimensions[index]))\nconst values = [\n  [12, 21, 17, 23, 10, 14, 18, 20, 16, 13, 19, 22],\n  [14, 17, 21, 17, 22, 19, 12, 16, 20, 18, 15, 11],\n  [18, 13, 16, 19, 15, 22, 20, 12, 14, 23, 17, 21],\n  [21, 19, 12, 15, 18, 16, 23, 14, 11, 20, 22, 17],\n]\nconst data = computed(() =>\n  chartStatus.value === 'empty' || chartStatus.value === 'loading'\n    ? []\n    : values.slice(0, objectCount.value).map((row, index) => ({\n        name: `攻击${String.fromCharCode(65 + index)}`,\n        value: dimensionIndices.value.map(index =>\n          chartStatus.value === 'allZero' ? 0 : row[index],\n        ),\n        itemStyle: {\n          color: seerColors[index],\n          borderColor: themeTokens.value.colorContainerBg,\n          borderWidth: 1.5,\n        },\n      })),\n)\n// 通用绘制与顺时针排列由 IxRadarChart 负责；业务量程和布局由示例提供。\nconst chartBindings = computed<RadarChartProps>(() => ({\n  indicator: indicators.value.map(name => ({ name, min: 0, max: 25 })),\n  data: data.value,\n  clockwise: true,\n  area: shapeStyle.value === 'area',\n  gridStyle: gridStyle.value,\n  splitNumber,\n  radius: radius.value,\n  center: ['50%', radius.value + 45],\n  animationDurationUpdate: 200,\n  textStyle: { fontFamily: themeTokens.value.fontFamily },\n  legend: {\n    bottom: 8,\n    left: 'center',\n    icon: 'roundRect',\n    itemWidth: 12,\n    itemHeight: 12,\n    itemGap: 32,\n    data: data.value.map(item => item.name),\n  },\n  // 刻度只显示在顶部轴，避免每条轴都显示刻度而相互遮挡。\n  graphic: Array.from({ length: splitNumber }, (_, index) => ({\n    type: 'text',\n    left: 'center',\n    top: radius.value + 45 - (index + 1) * gridSpacing.value - 7,\n    silent: true,\n    z: 10,\n    style: {\n      text: String((index + 1) * 5),\n      fill: themeTokens.value.colorTextInfo,\n      font: `12px ${themeTokens.value.fontFamily}`,\n    },\n  })),\n}))\n\nlet reloadTimer: ReturnType<typeof setTimeout> | undefined\nconst cancelReload = () => {\n  clearTimeout(reloadTimer)\n  reloadTimer = undefined\n}\nconst reloadChart = () => {\n  cancelReload()\n  chartStatus.value = 'loading'\n  reloadTimer = setTimeout(() => {\n    chartStatus.value = 'normal'\n    reloadTimer = undefined\n  }, 800)\n}\nwatch(chartStatus, status => {\n  if (status !== 'loading') cancelReload()\n})\nonBeforeUnmount(cancelReload)\n<\/script>\n\n<template>\n  <IxSpace vertical block class=\"radar-demo\" :size=\"20\">\n    <IxSpace wrap :size=\"24\" align=\"center\">\n      <IxSpace align=\"center\" role=\"group\" aria-label=\"对象个数\"\n        ><span>对象个数</span>\n        <IxSelect\n          v-model:value=\"objectCount\"\n          :dataSource=\"objectOptions\"\n          size=\"sm\"\n          :style=\"{ width: '80px' }\"\n          aria-label=\"对象个数\"\n        />\n      </IxSpace>\n      <IxSpace align=\"center\" role=\"group\" aria-label=\"变量个数\"\n        ><span>变量个数</span>\n        <IxSelect\n          v-model:value=\"dimensionCount\"\n          :dataSource=\"dimensionOptions\"\n          size=\"sm\"\n          :style=\"{ width: '80px' }\"\n          aria-label=\"变量个数\"\n        />\n      </IxSpace>\n      <IxSpace align=\"center\"\n        ><span>网格线样式</span>\n        <IxRadioGroup v-model:value=\"gridStyle\" buttoned size=\"sm\">\n          <IxRadio key=\"area\">线面</IxRadio>\n          <IxRadio key=\"line\">线框</IxRadio>\n        </IxRadioGroup>\n      </IxSpace>\n      <IxSpace align=\"center\"\n        ><span>网格线间距</span>\n        <IxRadioGroup v-model:value=\"gridSpacing\" buttoned size=\"sm\">\n          <IxRadio :key=\"20\">紧凑</IxRadio>\n          <IxRadio :key=\"30\">适中</IxRadio>\n          <IxRadio :key=\"40\">宽松</IxRadio>\n        </IxRadioGroup>\n      </IxSpace>\n      <IxSpace align=\"center\"\n        ><span>图形样式</span>\n        <IxRadioGroup v-model:value=\"shapeStyle\" buttoned size=\"sm\">\n          <IxRadio key=\"line\">线性</IxRadio>\n          <IxRadio key=\"area\">面性</IxRadio>\n        </IxRadioGroup>\n      </IxSpace>\n    </IxSpace>\n    <IxRadioGroup v-model:value=\"chartStatus\" buttoned size=\"sm\" aria-label=\"图表状态\">\n      <IxRadio key=\"normal\">正常</IxRadio>\n      <IxRadio key=\"allZero\">全部数值为 0</IxRadio>\n      <IxRadio key=\"empty\">空状态</IxRadio>\n      <IxRadio key=\"loading\">加载中</IxRadio>\n    </IxRadioGroup>\n    <div class=\"radar-demo-scroll\">\n      <div :style=\"chartStyle\">\n        <div v-if=\"chartStatus === 'empty'\" class=\"radar-demo-placeholder\">\n          <IxEmpty simple\n            ><template #description>\n              <IxSpace align=\"center\"\n                ><span>暂无数据</span>\n                <IxButton mode=\"link\" size=\"sm\" @click=\"reloadChart\">重新加载</IxButton>\n              </IxSpace>\n            </template></IxEmpty\n          >\n        </div>\n        <div\n          v-else-if=\"chartStatus === 'loading'\"\n          class=\"radar-demo-placeholder\"\n          role=\"status\"\n          aria-live=\"polite\"\n          aria-busy=\"true\"\n        >\n          <svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" aria-hidden=\"true\">\n            <g fill=\"none\" stroke=\"currentColor\">\n              <path d=\"M40 4 74 29 61 69 19 69 6 29Z\" />\n              <path d=\"M40 16 63 33 54 60 26 60 17 33Z\" />\n              <path d=\"M40 28 51 36 47 50 33 50 29 36Z\" />\n              <path d=\"M40 40V4M40 40 74 29M40 40 61 69M40 40 19 69M40 40 6 29\" />\n            </g>\n          </svg>\n          <span>图表正在加载中，请稍后...</span>\n        </div>\n        <IxRadarChart v-else style=\"width: 100%; height: 100%\" v-bind=\"chartBindings\" />\n      </div>\n    </div>\n  </IxSpace>\n</template>\n\n<style scoped lang=\"less\">\n.radar-demo {\n  &-scroll {\n    width: 100%;\n    overflow-x: auto;\n  }\n\n  &-placeholder {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 16px;\n    height: 100%;\n    color: var(--ix-color-text-info);\n  }\n}\n</style>",
		"parsedCode": "<div class=\"language-vue\">\n      <button title=\"Copy Code\" class=\"copy\"></button>\n      <span class=\"lang\">vue</span>\n      <pre v-pre class=\"shiki\" ><code><span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">script</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">setup</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">ts</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">RadarChartProps</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">seerColors</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/charts</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">computed</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">onBeforeUnmount</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">ref</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">watch</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">vue</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">useThemeToken</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/components/theme</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">Empty</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">Down</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">Loading</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">addIconDefinitions</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">@idux/components/icon</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">GraphicComponent</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">echarts/components</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">import</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">use</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">from</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">echarts/core</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #82AAFF\">use</span><span style=\"color: #A6ACCD\">([GraphicComponent])</span></span>\n<span class=\"line\"><span style=\"color: #82AAFF\">addIconDefinitions</span><span style=\"color: #A6ACCD\">([Empty</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> Down</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> Loading])</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> themeTokens </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">useThemeToken</span><span style=\"color: #A6ACCD\">()</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> objectCount </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">2</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> dimensionCount </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">5</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> gridStyle </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">area</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">|</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">line</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">area</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> gridSpacing </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">30</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> shapeStyle </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">line</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">type</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">ChartStatus</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">normal</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">|</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">allZero</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">|</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">empty</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">|</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> chartStatus </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">ref</span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">ChartStatus</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">normal</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> objectOptions </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">2</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">4</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">key</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> value</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">String</span><span style=\"color: #A6ACCD\">(value) </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> dimensionOptions </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> Array</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">from</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">length</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">10</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">},</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">_</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">key</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> index </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">label</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">String</span><span style=\"color: #A6ACCD\">(index </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #A6ACCD\">)</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #676E95\">// 五等分、固定 0–25 刻度。间距为沿径向的 CSS px，改变间距同步改变半径。</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> splitNumber </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">5</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> radius </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> gridSpacing</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> splitNumber)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> chartHeight </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> radius</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">2</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">130</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> chartStyle </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">minWidth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">radius</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">2</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">280</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\">px</span><span style=\"color: #89DDFF\">`</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">height</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`${</span><span style=\"color: #A6ACCD\">chartHeight</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">}</span><span style=\"color: #C3E88D\">px</span><span style=\"color: #89DDFF\">`</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> dimensions </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">攻击路径</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">可用性影响</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">影响范围</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">权限要求</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">攻击难度</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">攻击手法</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">扩散风险</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">攻击坦度</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">保密性影响</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">完整性影响</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">用户交互</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">修复成本</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #676E95\">// 三维、五维和八维使用设计稿的维度顺序，其余数量沿用完整的业务顺序。</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> dimensionIndices </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">if</span><span style=\"color: #F07178\"> (</span><span style=\"color: #A6ACCD\">dimensionCount</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #F07178\">) </span><span style=\"color: #89DDFF\">return</span><span style=\"color: #F07178\"> [</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">5</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">4</span><span style=\"color: #F07178\">]</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">if</span><span style=\"color: #F07178\"> (</span><span style=\"color: #A6ACCD\">dimensionCount</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">5</span><span style=\"color: #F07178\">) </span><span style=\"color: #89DDFF\">return</span><span style=\"color: #F07178\"> [</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">2</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">4</span><span style=\"color: #F07178\">]</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">return</span><span style=\"color: #F07178\"> [</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">5</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">2</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">6</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">3</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">4</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">7</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">8</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">9</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">10</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">11</span><span style=\"color: #F07178\">]</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">slice</span><span style=\"color: #F07178\">(</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #F07178\"> </span><span style=\"color: #A6ACCD\">dimensionCount</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #F07178\">)</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> indicators </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> dimensionIndices</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> dimensions[index]))</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> values </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> [</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  [</span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">21</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">17</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">23</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">10</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">14</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">18</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">13</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">19</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">22</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  [</span><span style=\"color: #F78C6C\">14</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">17</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">21</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">17</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">22</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">19</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">18</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">15</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">11</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  [</span><span style=\"color: #F78C6C\">18</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">13</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">19</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">15</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">22</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">14</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">23</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">17</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">21</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  [</span><span style=\"color: #F78C6C\">21</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">19</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">15</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">18</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">23</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">14</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">11</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">22</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">17</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">]</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> data </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  chartStatus</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">empty</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">||</span><span style=\"color: #A6ACCD\"> chartStatus</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">?</span><span style=\"color: #A6ACCD\"> []</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> values</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">slice</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> objectCount</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value)</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">row</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">name</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`</span><span style=\"color: #C3E88D\">攻击</span><span style=\"color: #89DDFF\">${</span><span style=\"color: #A6ACCD\">String</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">fromCharCode</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #F78C6C\">65</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> index)</span><span style=\"color: #89DDFF\">}`</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">value</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> dimensionIndices</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          chartStatus</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">allZero</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">?</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> row[index]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        )</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #F07178\">itemStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #F07178\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> seerColors[index]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #F07178\">borderColor</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> themeTokens</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">colorContainerBg</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #F07178\">borderWidth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">1.5</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #676E95\">// 通用绘制与顺时针排列由 IxRadarChart 负责；业务量程和布局由示例提供。</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> chartBindings </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">computed</span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">RadarChartProps</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">indicator</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> indicators</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #A6ACCD\">name</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> name</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">min</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">0</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">max</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">25</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> data</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">clockwise</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">true</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">area</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> shapeStyle</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">===</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">area</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">gridStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> gridStyle</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  splitNumber</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">radius</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> radius</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">center</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> [</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">50%</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> radius</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">45</span><span style=\"color: #A6ACCD\">]</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">animationDurationUpdate</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">200</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">textStyle</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">fontFamily</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> themeTokens</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">fontFamily </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">legend</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">bottom</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">8</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">left</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">icon</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">roundRect</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">itemWidth</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">itemHeight</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">12</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">itemGap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">32</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">data</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> data</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">map</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #A6ACCD\">item</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> item</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">name)</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">  </span><span style=\"color: #676E95\">// 刻度只显示在顶部轴，避免每条轴都显示刻度而相互遮挡。</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #F07178\">graphic</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> Array</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #82AAFF\">from</span><span style=\"color: #A6ACCD\">(</span><span style=\"color: #89DDFF\">{</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F07178\">length</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> splitNumber </span><span style=\"color: #89DDFF\">},</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">_</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">index</span><span style=\"color: #89DDFF\">)</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> (</span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">type</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">text</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">left</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">top</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> radius</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">45</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">-</span><span style=\"color: #A6ACCD\"> (index </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #A6ACCD\">) </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> gridSpacing</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value </span><span style=\"color: #89DDFF\">-</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">7</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">silent</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FF9CAC\">true</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">z</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">10</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">text</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">String</span><span style=\"color: #A6ACCD\">((index </span><span style=\"color: #89DDFF\">+</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">1</span><span style=\"color: #A6ACCD\">) </span><span style=\"color: #89DDFF\">*</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">5</span><span style=\"color: #A6ACCD\">)</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">fill</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> themeTokens</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">colorTextInfo</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #F07178\">font</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">`</span><span style=\"color: #C3E88D\">12px </span><span style=\"color: #89DDFF\">${</span><span style=\"color: #A6ACCD\">themeTokens</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">fontFamily</span><span style=\"color: #89DDFF\">}`</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">},</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span><span style=\"color: #89DDFF\">,</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">))</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #C792EA\">let</span><span style=\"color: #A6ACCD\"> reloadTimer</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">ReturnType</span><span style=\"color: #89DDFF\">&lt;typeof</span><span style=\"color: #A6ACCD\"> setTimeout</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">|</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #FFCB6B\">undefined</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> cancelReload </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #82AAFF\">clearTimeout</span><span style=\"color: #F07178\">(</span><span style=\"color: #A6ACCD\">reloadTimer</span><span style=\"color: #F07178\">)</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #A6ACCD\">reloadTimer</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">undefined</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #C792EA\">const</span><span style=\"color: #A6ACCD\"> reloadChart </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">()</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #82AAFF\">cancelReload</span><span style=\"color: #F07178\">()</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #A6ACCD\">chartStatus</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #A6ACCD\">reloadTimer</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #82AAFF\">setTimeout</span><span style=\"color: #F07178\">(</span><span style=\"color: #89DDFF\">()</span><span style=\"color: #F07178\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #A6ACCD\">chartStatus</span><span style=\"color: #89DDFF\">.</span><span style=\"color: #A6ACCD\">value</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">normal</span><span style=\"color: #89DDFF\">&#39;</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">    </span><span style=\"color: #A6ACCD\">reloadTimer</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">=</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">undefined</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">},</span><span style=\"color: #F07178\"> </span><span style=\"color: #F78C6C\">800</span><span style=\"color: #F07178\">)</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #82AAFF\">watch</span><span style=\"color: #A6ACCD\">(chartStatus</span><span style=\"color: #89DDFF\">,</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #A6ACCD\">status</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">=&gt;</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #F07178\">  </span><span style=\"color: #89DDFF\">if</span><span style=\"color: #F07178\"> (</span><span style=\"color: #A6ACCD\">status</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">!==</span><span style=\"color: #F07178\"> </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #F07178\">) </span><span style=\"color: #82AAFF\">cancelReload</span><span style=\"color: #F07178\">()</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span><span style=\"color: #A6ACCD\">)</span></span>\n<span class=\"line\"><span style=\"color: #82AAFF\">onBeforeUnmount</span><span style=\"color: #A6ACCD\">(cancelReload)</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">script</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">vertical</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">block</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">radar-demo</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">wrap</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">24</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">role</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">group</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">对象个数</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">对象个数</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSelect</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">objectCount</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          :</span><span style=\"color: #C792EA\">dataSource</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">objectOptions</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          :</span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">width</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">80px</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">对象个数</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">role</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">group</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">变量个数</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">变量个数</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSelect</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">dimensionCount</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          :</span><span style=\"color: #C792EA\">dataSource</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">dimensionOptions</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          :</span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">{ </span><span style=\"color: #F07178\">width</span><span style=\"color: #89DDFF\">: </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">80px</span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #89DDFF\"> }</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">变量个数</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">网格线样式</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">gridStyle</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">area</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">线面</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">line</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">线框</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">网格线间距</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">gridSpacing</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">20</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">紧凑</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">30</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">适中</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #F78C6C\">40</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">宽松</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">图形样式</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">shapeStyle</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">line</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">线性</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">area</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">面性</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-model</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #C792EA\">value</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">chartStatus</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">buttoned</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-label</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">图表状态</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">normal</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">正常</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">allZero</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">全部数值为 0</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">empty</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">空状态</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">key</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">加载中</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadio</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxRadioGroup</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">radar-demo-scroll</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> :</span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">chartStyle</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-if</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">chartStatus</span><span style=\"color: #89DDFF\"> === </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">empty</span><span style=\"color: #89DDFF\">&#39;&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">radar-demo-placeholder</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxEmpty</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">simple</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">            &gt;&lt;</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\"> #</span><span style=\"color: #C792EA\">description</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">align</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">center</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">                &gt;&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">暂无数据</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">                </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxButton</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">mode</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">link</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">size</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">sm</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> @</span><span style=\"color: #C792EA\">click</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">reloadChart</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">重新加载</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxButton</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">            </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;&lt;/</span><span style=\"color: #FFCB6B\">IxEmpty</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          &gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">div</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">v-else-if</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">chartStatus</span><span style=\"color: #89DDFF\"> === </span><span style=\"color: #89DDFF\">&#39;</span><span style=\"color: #C3E88D\">loading</span><span style=\"color: #89DDFF\">&#39;&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">class</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">radar-demo-placeholder</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">role</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">status</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">aria-live</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">polite</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">          </span><span style=\"color: #C792EA\">aria-busy</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">true</span><span style=\"color: #89DDFF\">&quot;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">        &gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">svg</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">width</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">80</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">height</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">80</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">viewBox</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">0 0 80 80</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">aria-hidden</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">true</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">            </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">g</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">fill</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">none</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">stroke</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">currentColor</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">path</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">d</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">M40 4 74 29 61 69 19 69 6 29Z</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">path</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">d</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">M40 16 63 33 54 60 26 60 17 33Z</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">path</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">d</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">M40 28 51 36 47 50 33 50 29 36Z</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">              </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">path</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">d</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">M40 40V4M40 40 74 29M40 40 61 69M40 40 19 69M40 40 6 29</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">            </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">g</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">svg</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">          </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span><span style=\"color: #A6ACCD\">图表正在加载中，请稍后...</span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">span</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">        </span><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #FFCB6B\">IxRadarChart</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-else</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">style</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">width: 100%; height: 100%</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> </span><span style=\"color: #C792EA\">v-bind</span><span style=\"color: #89DDFF\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #A6ACCD\">chartBindings</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\"> /&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">      </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">div</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #FFCB6B\">IxSpace</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">template</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;</span><span style=\"color: #F07178\">style</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">scoped</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #C792EA\">lang</span><span style=\"color: #A6ACCD\">=</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #C3E88D\">less</span><span style=\"color: #89DDFF\">&quot;</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">.</span><span style=\"color: #FFCB6B\">radar-demo</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&amp;</span><span style=\"color: #C792EA\">-scroll</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">width</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">overflow-x</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> auto</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">&amp;</span><span style=\"color: #C792EA\">-placeholder</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #89DDFF\">{</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">display</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> flex</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">flex-direction</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> column</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">align-items</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> center</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">justify-content</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> center</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">gap</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">16px</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">height</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #F78C6C\">100%</span><span style=\"color: #89DDFF\">;</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">    </span><span style=\"color: #B2CCD6\">color</span><span style=\"color: #89DDFF\">:</span><span style=\"color: #A6ACCD\"> </span><span style=\"color: #82AAFF\">var</span><span style=\"color: #89DDFF\">(</span><span style=\"color: #A6ACCD\">--ix-color-text-info</span><span style=\"color: #89DDFF\">);</span></span>\n<span class=\"line\"><span style=\"color: #A6ACCD\">  </span><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">}</span></span>\n<span class=\"line\"><span style=\"color: #89DDFF\">&lt;/</span><span style=\"color: #F07178\">style</span><span style=\"color: #89DDFF\">&gt;</span></span>\n<span class=\"line\"></span></code></pre>\n\n    </div>"
	}],
	instance: Ui("archive-vue-loader-1", /* @__PURE__ */ _plugin_vue_export_helper_default(Basic_vue_vue_type_script_setup_true_lang_default, [
		["render", _sfc_render],
		["__scopeId", "data-v-5c8ce7ca"],
		["__file", "/home/runner/work/idux-charts/idux-charts/packages/site/src/components/radar/demos/Basic.vue"]
	]), setup)
};
export { __archive_data__ as default };
