import { An as createVNode, B as easeInOutCubic, Bt as isFunction, Cn as computed, Fn as isVNode, H as getBoxSizingData, Hn as onMounted, Ht as isArray, I as convertCssPixel, In as mergeProps, Jn as watch, Jt as root, Kn as provide, L as convertElement, Ln as nextTick, N as callEmit, Nt as toString, O as useGlobalConfig, P as cancelRAF, Pn as inject, Rn as onActivated, U as getFirstValidNode, Un as onUnmounted, Vt as isObject, Wn as onUpdated, Wt as isSymbol, X as isFocusable, Y as isEmptyNode, Yn as watchEffect, Zn as withDirectives, _t as isString, ar as shallowRef, b as useThemeToken, ct as useControlledProp, dr as normalizeStyle, dt as useState, gt as isNil, ir as ref, it as throwError, jn as defineComponent, k as Logger, lt as useEventListener, nt as rAF, tr as isRef, tt as parseSize, ur as normalizeClass, ut as useKey, w as isFirefox, yn as vShow, zn as onBeforeUnmount } from "./app-default-T1OuoY14.js";
import { i as ɵOverlay, n as overlayPlacementDef, r as overlayTriggerDef } from "./overlay-DqpSor74.js";
import { t as isNumber } from "./isNumber-CmydNHbb.js";
import { n as onResize, r as useResizeObserver, t as offResize } from "./resize-B7QQJdrK.js";
import { i as IxIcon, t as useSharedFocusMonitor } from "./a11y-Ctce35W3.js";
import { a as useOverlayFocusMonitor, i as useGetKey$1, n as convertStringVNode } from "./utils-DOP7B0rj.js";
import { n as getThemeTokens$1, r as ɵWave } from "./button-J6yoI-6A.js";
import { t as useAccessorAndControl } from "./forms-COe2a6LU.js";
import { i as useFormItemRegister, n as useFormElement, s as useMergedCommonControlProps, t as FORM_TOKEN } from "./form-ChCOb0fe.js";
import { t as IxEmpty } from "./empty-CqUzbsB1.js";
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/_private/trigger/index.js
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/control-trigger/index.js
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
var defaultOffset = [0, 4];
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
				offset: (_c = controlTriggerProps2.offset) != null ? _c : defaultOffset,
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/_private/overflow/index.js
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/selector/index.js
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
		const getKey = useGetKey$1(props, { getKey: "key" }, "selector");
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
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/cdk/scroll/index.js
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
			isFirefox ? useEventListener(elementRef.value, "MozMousePixelScroll", onPixelScroll) : void 0
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
				const colKey = getKey(columns[ci]);
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
	const nodes = (0, slots.default)({
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
	const nodes = (0, slots.default)({
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/_private/empty/index.js
var Empty = (props, { slots }) => {
	if (slots.empty) return slots.empty();
	const { empty } = props;
	const emptyProps = isString(empty) ? { simple: empty === "simple" } : empty;
	return createVNode(IxEmpty, emptyProps, null);
};
Empty.displayName = "ɵEmpty";
var ɵEmpty = Empty;
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/checkbox/index.js
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
function getDefaultThemeTokens(tokens) {
	const { paddingSizeXs, colorInfoContainerBg, colorBorderSecondary } = tokens;
	return {
		labelPadding: `0 ${paddingSizeXs}px`,
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
var Checkbox = /* @__PURE__ */ defineComponent({
	name: "IxCheckbox",
	inheritAttrs: false,
	props: checkboxProps,
	setup(props, { attrs, expose, slots }) {
		const key = useKey();
		const common = useGlobalConfig("common");
		const { globalHashId, hashId, registerToken } = useThemeToken("checkbox");
		const { hashId: buttonHashId, registerToken: registerButtonToken } = useThemeToken("button");
		registerToken(getThemeTokens);
		registerButtonToken(getThemeTokens$1);
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
export { IxControlTrigger as a, IxSelector as i, ɵEmpty as n, CdkVirtualScroll as r, IxCheckbox as t };
