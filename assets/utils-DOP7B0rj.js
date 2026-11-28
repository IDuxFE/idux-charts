import { An as createVNode, Bt as isFunction, Cn as computed, Jn as watch, _t as isString, dt as useState, gt as isNil, ir as ref, k as Logger, ot as tryOnScopeDispose } from "./app-default-T1OuoY14.js";
import { i as IxIcon, t as useSharedFocusMonitor } from "./a11y-Ctce35W3.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/utils/index.js
function convertIconVNode(slots, props, keyOrParams, slotParams) {
	let iconSlot;
	let iconName;
	const isKey = isString(keyOrParams);
	const params = isKey ? slotParams : keyOrParams;
	if (isKey) {
		iconSlot = slots[keyOrParams];
		if (!iconSlot) iconName = props[keyOrParams];
	} else {
		iconSlot = slots;
		iconName = props;
	}
	if (iconSlot) return iconSlot(params);
	return isString(iconName) && iconName !== "" ? createVNode(IxIcon, { name: iconName }, null) : isFunction(iconName) ? iconName(params) : iconName;
}
function convertStringVNode(slots, props, keyOrParams, slotParams) {
	let labelSlot;
	let label;
	const isKey = isString(keyOrParams);
	const params = isKey ? slotParams : keyOrParams;
	if (isKey) {
		labelSlot = slots[keyOrParams];
		if (!labelSlot) label = props[keyOrParams];
	} else {
		labelSlot = slots;
		label = props;
	}
	return labelSlot ? labelSlot(params) : isFunction(label) ? label(params) : label;
}
function useGetDisabled(props) {
	return computed(() => {
		const { disableData } = props;
		return (data) => {
			return data.disabled || (disableData ? disableData(data) : false);
		};
	});
}
function useGetKey(props, config, location) {
	return computed(() => {
		const { getKey = config.getKey } = props;
		if (isString(getKey)) return (data) => {
			const key = data[getKey];
			if (key === void 0) Logger.warn(location, "Each item in dataSource should have a unique `key` prop.");
			return key;
		};
		return getKey;
	});
}
function useOverlayFocusMonitor(onFocus, onBlur) {
	const [focused, setFocused] = useState(false);
	const [overlayFocused, setOverlayFocused] = useState(false);
	const [triggerFocused, setTriggerFocused] = useState(false);
	const { monitor, stopMonitoring, focusVia: _focusVia, blurVia } = useSharedFocusMonitor();
	const { handleFocus: _handleFocus, handleBlur: _handleBlur } = useFocusHandlers(focused, setFocused, onFocus, onBlur);
	const handleFocus = (evt) => {
		_handleFocus(evt);
		setTriggerFocused(true);
	};
	const handleBlur = (evt) => {
		_handleBlur(evt);
		setTriggerFocused(false);
	};
	const monitorStops = /* @__PURE__ */ new Set();
	const _bindMonitor = (el, isOverlay = false) => {
		const stop = watch(monitor(el, true), (evt) => {
			const { origin, event } = evt;
			if (event) {
				if (origin) {
					_handleFocus(event, origin);
					isOverlay ? setOverlayFocused(true) : setTriggerFocused(true);
				} else {
					_handleBlur(event);
					isOverlay ? setOverlayFocused(false) : setTriggerFocused(false);
				}
			}
		});
		return () => {
			stop();
			stopMonitoring(el);
		};
	};
	const bindMonitor = (elRef) => {
		let stop;
		const stopWatch = watch(elRef, (el) => {
			stop == null || stop();
			if (!el) return;
			stop = _bindMonitor(el);
		}, { immediate: true });
		const stopMonitor = () => {
			stop == null || stop();
			stopWatch();
		};
		monitorStops.add(stopMonitor);
		return stopMonitor;
	};
	const bindOverlayMonitor = (overlayRef, overlayOpened) => {
		let stop;
		const stopWatch = watch([() => {
			var _a;
			return (_a = overlayRef.value) == null ? void 0 : _a.getPopperElement();
		}, overlayOpened], ([el, opened]) => {
			stop == null || stop();
			if (!opened || !el) return;
			stop = _bindMonitor(el, true);
		}, { immediate: true });
		const stopMonitor = () => {
			stop == null || stop();
			stopWatch();
		};
		monitorStops.add(stopMonitor);
		return stopMonitor;
	};
	const unbindAllMonitor = () => {
		monitorStops.forEach((stop) => stop());
	};
	const focusVia = (elRef, origin, options) => {
		_focusVia(elRef, origin != null ? origin : "program", options);
	};
	tryOnScopeDispose(() => {
		unbindAllMonitor();
	});
	return {
		focused,
		overlayFocused,
		triggerFocused,
		bindMonitor,
		bindOverlayMonitor,
		focusVia,
		blurVia,
		handleFocus,
		handleBlur
	};
}
function useFocusHandlers(focused, setFocused, onFocus, onBlur) {
	let lastFocusEvtTime = 0;
	const checkSubsequentFocus = async (evt) => {
		await new Promise((resolve) => setTimeout(resolve));
		return lastFocusEvtTime >= evt.timeStamp;
	};
	const handleBlur = async (evt) => {
		if (await checkSubsequentFocus(evt)) return;
		setFocused(false);
		onBlur(evt);
	};
	const handleFocus = (evt, origin) => {
		lastFocusEvtTime = evt.timeStamp;
		if (focused.value) return;
		setFocused(true);
		onFocus(evt, origin != null ? origin : "program");
	};
	return {
		handleFocus,
		handleBlur
	};
}
var zIndexCount = 0;
var useZIndex = (controlZIndex, configZIndex, visible) => {
	const getZIndex = () => {
		const zIndex = configZIndex.value;
		if (isFunction(zIndex)) return zIndex();
		return zIndex + zIndexCount++;
	};
	const innerZIndex = ref(0);
	watch(visible, (newVisible) => {
		if (newVisible && isNil(controlZIndex.value)) innerZIndex.value = getZIndex();
	}, { immediate: true });
	return computed(() => {
		var _a;
		return (_a = controlZIndex.value) != null ? _a : innerZIndex.value;
	});
};
export { useOverlayFocusMonitor as a, useGetKey as i, convertStringVNode as n, useZIndex as o, useGetDisabled as r, convertIconVNode as t };
