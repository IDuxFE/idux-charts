import { Cn as computed, Jn as watch, Pn as inject, ir as ref, ut as useKey, zn as onBeforeUnmount } from "./app-default-DalXtduk.js";
import { t as useSharedFocusMonitor } from "./a11y-DoXqCLWj.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/form/index.js
var FORM_TOKEN = Symbol("FORM_TOKEN");
var FORM_ITEM_TOKEN = Symbol("FORM_ITEM_TOKEN");
function useFormItemRegister(control) {
	const context = inject(FORM_ITEM_TOKEN, null);
	if (context) {
		const key = useKey();
		const { registerControl, unregisterControl } = context;
		registerControl(key, control);
		onBeforeUnmount(() => unregisterControl(key));
	}
}
function useFormElement() {
	const elementRef = ref();
	const focus = (options) => {
		var _a;
		(_a = elementRef.value) == null || _a.focus(options);
	};
	const blur = () => {
		var _a;
		return (_a = elementRef.value) == null ? void 0 : _a.blur();
	};
	return {
		elementRef,
		focus,
		blur
	};
}
function useFormFocusMonitor(options) {
	const focusMonitor = useSharedFocusMonitor();
	const elementRef = ref();
	let watchStopHandle;
	watch(elementRef, (currElement, prevElement) => {
		if (watchStopHandle) watchStopHandle();
		if (prevElement) focusMonitor.stopMonitoring(prevElement);
		watchStopHandle = watch(focusMonitor.monitor(currElement, options.checkChildren), (evt) => {
			const { origin, event } = evt;
			if (event) origin ? options.handleFocus(event) : options.handleBlur(event);
		});
	});
	onBeforeUnmount(() => {
		if (watchStopHandle) watchStopHandle();
		focusMonitor.stopMonitoring(elementRef.value);
	});
	const focus = (options2) => focusMonitor.focusVia(elementRef.value, "program", options2);
	const blur = () => focusMonitor.blurVia(elementRef.value);
	return {
		elementRef,
		focus,
		blur
	};
}
function useFormSize(props, config) {
	const formContext = inject(FORM_TOKEN, null);
	return computed(() => {
		var _a, _b;
		return (_b = (_a = props.size) != null ? _a : formContext == null ? void 0 : formContext.size.value) != null ? _b : config.size;
	});
}
function useFormStatus(props, control) {
	return computed(() => {
		if (props.status) return props.status;
		const currControl = control.value;
		if (!currControl || currControl.disabled.value) return;
		const { trigger, dirty, blurred, status, validated } = currControl;
		if (trigger === "change") return dirty.value ? status.value : void 0;
		if (trigger === "blur") return blurred.value ? status.value : void 0;
		return validated.value && dirty.value && blurred.value ? status.value : void 0;
	});
}
function useMergedCommonControlProps(props, config) {
	const mergedSize = useFormSize(props, config);
	return computed(() => {
		var _a, _b, _c;
		return {
			borderless: (_a = props.borderless) != null ? _a : config.borderless,
			clearIcon: (_b = props.clearIcon) != null ? _b : config.clearIcon,
			size: mergedSize.value,
			suffix: (_c = props.suffix) != null ? _c : config.suffix
		};
	});
}
export { useFormSize as a, useFormItemRegister as i, useFormElement as n, useFormStatus as o, useFormFocusMonitor as r, useMergedCommonControlProps as s, FORM_TOKEN as t };
