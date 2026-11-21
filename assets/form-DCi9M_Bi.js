import { Bn as onMounted, D as useGlobalConfig, Kn as watch, Ln as onBeforeUnmount, Mn as inject, O as Logger, On as createVNode, P as convertCssPixel, V as getFirstValidNode, Y as isNumeric, bn as cloneVNode, cr as normalizeClass, ct as useKey, kn as defineComponent, nr as ref, xn as computed } from "./app-default-C6SHhrLB.js";
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.46_typescript@6.0.3_/node_modules/@idux/components/icon/index.js
var iconProps = {
	name: String,
	iconfont: {
		type: Boolean,
		default: false
	},
	rotate: {
		type: [
			Boolean,
			Number,
			String
		],
		default: void 0
	},
	color: String,
	size: [String, Number],
	ariaPressed: {
		type: String,
		default: void 0
	}
};
var iconDefinitions = /* @__PURE__ */ new Map();
var iconCache = /* @__PURE__ */ new Map();
function clearSVGElement(el) {
	var _a;
	const children = el.childNodes;
	const length = children.length;
	for (let i = length - 1; i >= 0; i--) {
		const child = children[i];
		if (((_a = child.tagName) == null ? void 0 : _a.toLowerCase()) === "svg") child.remove();
	}
}
async function loadSVGElement(iconName, loadIconDynamically) {
	if (removeIcons.includes(iconName)) Logger.warn("components/icon", `The icon [${iconName}]  has been deprecated, please use another icon.`);
	if (Object.keys(renameIcons).includes(iconName)) Logger.warn("components/icon", `The icon [${iconName}]  has been deprecated, please use [${renameIcons[iconName]}] instead.`);
	const cached = iconCache.get(iconName);
	if (cached) {
		const svg2 = await cached;
		if (svg2) return svg2.cloneNode(true);
		else {
			iconCache.delete(iconName);
			return null;
		}
	}
	const svg = createSVGElement(iconName, loadIconDynamically);
	iconCache.set(iconName, svg);
	return svg;
}
async function loadSvgElementFormScript(iconName) {
	let svg = null;
	const cachedName = `IDUX_CACHED_ICON_FONT_` + iconName;
	const cached = iconCache.get(cachedName);
	if (cached) svg = await cached;
	if (!svg) {
		svg = convertSVGElement(`<svg><use xlink:href="#${iconName}"></svg>`);
		setSVGAttribute(svg, iconName);
		iconCache.set(cachedName, svg);
	}
	return svg.cloneNode(true);
}
async function createSVGElement(iconName, loadIconDynamically) {
	let svg = null;
	const icon = await loadIconDefinition(iconName, loadIconDynamically);
	if (icon) {
		svg = convertSVGElement(icon.svg);
		if (svg) {
			setSVGAttribute(svg, iconName);
			iconCache.set(iconName, svg);
		} else Logger.warn("components/icon", `The icon [${iconName}] create failed.`);
	}
	return svg;
}
async function loadIconDefinition(iconName, loadIconDynamically) {
	let icon = iconDefinitions.get(iconName);
	if (!icon) {
		if (loadIconDynamically) {
			const svg = await loadIconDynamically(iconName);
			if (validSVGString(svg)) {
				icon = {
					name: iconName,
					svg
				};
				iconDefinitions.set(iconName, icon);
			} else {
				Logger.warn("components/icon", `The dynamically loaded icon [${iconName}] is invalid.`);
				return;
			}
		} else Logger.warn("components/icon", `The icon [${iconName}] load failed.`);
	}
	return icon;
}
function validSVGString(svg) {
	return !!svg && svg.includes("<svg");
}
function convertSVGElement(svg) {
	const div = document.createElement("div");
	div.innerHTML = svg;
	return div.querySelector("svg");
}
var defaultSVGAttributes = {
	viewBox: "0 0 1024 1024",
	focusable: "false",
	"aria-hidden": "true"
};
function setSVGAttribute(svg, iconName) {
	Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
		if (!svg.hasAttribute(key)) svg.setAttribute(key, value);
	});
	svg.setAttribute("data-icon", iconName);
}
function convertSVGNode(child) {
	const node = getFirstValidNode(child);
	if (!node || node.type !== "svg") {
		Logger.warn("components/icon", "The children must is svg element");
		return;
	}
	return cloneVNode(node, {
		...defaultSVGAttributes,
		...node.props
	});
}
var removeIcons = [
	"left-double",
	"right-double",
	"unexpand"
];
var renameIcons = {
	bars: "view-list",
	"book-mark": "bookmark",
	card: "view-card",
	collect: "favourite",
	"delivered-procedure": "file-export",
	"dialog-close": "close-filled",
	environment: "location",
	exception: "file-alert",
	"file-gif": "gif",
	"for-screen": "projection",
	insurance: "safety",
	"layout-large": "grid-loose",
	"loading-split": "wait",
	loose: "layout-loose",
	normal: "layout-medium",
	menu: "layout-compact",
	"scan-security": "security-scan",
	"scan-virus": "radar",
	success: "check-filled",
	transmit: "send",
	"tree-expand": "expand-all",
	"tree-unexpand": "collapse-all",
	uncollapse: "expand"
};
var Icon = /* @__PURE__ */ defineComponent({
	name: "IxIcon",
	props: iconProps,
	setup(props, { slots }) {
		const common = useGlobalConfig("common");
		const mergedPrefixCls = computed(() => `${common.prefixCls}-icon`);
		const config = useGlobalConfig("icon");
		const root = ref();
		onMounted(() => appendChild(props, config, root.value));
		onBeforeUnmount(() => {
			if (root.value) {
				clearSVGElement(root.value);
				root.value = void 0;
			}
		});
		watch([() => props.name, () => props.iconfont], () => {
			const rootElement = root.value;
			if (!rootElement) return;
			clearSVGElement(rootElement);
			appendChild(props, config, rootElement);
		});
		const classes = computed(() => {
			const { name, rotate } = props;
			const prefixCls = mergedPrefixCls.value;
			return normalizeClass({
				[prefixCls]: true,
				[`${prefixCls}-${name}`]: !!name,
				[`${prefixCls}-spinning`]: rotate === true
			});
		});
		const style = computed(() => {
			const { rotate, color, size } = props;
			return {
				color,
				fontSize: convertCssPixel(size),
				transform: isNumeric(rotate) ? `rotate(${rotate}deg)` : void 0
			};
		});
		return () => {
			var _a;
			const { name, ariaPressed } = props;
			if (name) return createVNode("i", {
				"ref": root,
				"class": classes.value,
				"style": style.value,
				"role": "img",
				"aria-label": name,
				"aria-pressed": ariaPressed
			}, null);
			else return createVNode("i", {
				"ref": root,
				"class": classes.value,
				"style": style.value,
				"role": "img",
				"aria-pressed": ariaPressed
			}, [convertSVGNode((_a = slots.default) == null ? void 0 : _a.call(slots))]);
		};
	}
});
async function appendChild(props, config, rootElement) {
	const { name, iconfont } = props;
	if (name) {
		const svgElement = iconfont ? await loadSvgElementFormScript(name) : await loadSVGElement(name, config.loadIconDynamically);
		if (svgElement && name === props.name) rootElement.appendChild(svgElement);
	}
}
var addIconDefinitions = (icons) => {
	icons.forEach((icon) => iconDefinitions.set(icon.name, icon));
};
var Down = {
	name: "down",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path d=\"M503.234 694.123 249.575 440.464c-4.998-4.998-5.001-12.869-.003-17.867l27.39-27.39c5-5 12.927-4.939 17.926.06l217.281 217.281 217.281-217.28c4.999-5 12.927-5.06 17.925-.062l27.39 27.39c5 5 4.996 12.87-.002 17.868L521.104 694.123c-4.998 4.998-12.872 4.998-17.87 0Z\"/></svg>"
};
var Empty = {
	name: "empty",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path fill-rule=\"evenodd\" d=\"M256 192V76.8c0-7.07 5.73-12.8 12.8-12.8h486.4c7.072 0 12.8 5.73 12.8 12.8V192h179.2c7.072 0 12.8 5.73 12.8 12.8v38.4c0 7.07-5.728 12.8-12.8 12.8H76.8c-7.07 0-12.8-5.73-12.8-12.8v-38.4c0-7.07 5.73-12.8 12.8-12.8H256Zm64.749 0h383.673v-64H320.75v64ZM204.8 959.693h614.4c7.072 0 12.8-5.69 12.8-12.755V332.893c0-7.068-5.562-12.893-12.634-12.893h-38.732c-7.072 0-12.634 5.562-12.634 12.631V896H256V332.631c0-7.069-5.563-12.631-12.632-12.631h-38.736c-7.07 0-12.632 5.825-12.632 12.893v614.045c0 7.065 5.73 12.755 12.8 12.755Z\"/></svg>"
};
var IxIcon = Icon;
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
export { useFormStatus as a, Empty as c, useFormSize as i, IxIcon as l, useFormElement as n, useMergedCommonControlProps as o, useFormItemRegister as r, Down as s, FORM_TOKEN as t, addIconDefinitions as u };
