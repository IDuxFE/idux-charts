import { d as defineComponent, u as useGlobalConfig, c as computed, a as createVNode, m as mergeProps, \u0275 as \u0275Overlay, o as overlayDelayDef, b as overlayPlacementDef, e as overlayTriggerDef, r as ref, f as useControlledProp, g as onDeactivated, W as WeakMap$1, i as inject, h as onMounted, j as c, w as watch, k as onUnmounted, l as createTextVNode, T as Transition, p as provide, n as pageContextToken, q as baseCreate$1, s as isObjectLike, t as isArray$1, v as isObject, x as debounce, y as throwError, z as nextTick, A as u, B as useState, C as normalizeClass, D as addClass, E as removeClass, F as isNil, I as IxIcon, G as callEmit, H as withDirectives, J as vShow, K as copyArray, L as convertElement, M as watchEffect, N as off, O as convertTarget, P as on, Q as onBeforeUnmount, R as useKey, S as usePortalTarget, U as convertCssPixel, V as CdkPortal, X as TransitionGroup, Y as Fragment, Z as flattenNode, _ as appContextToken, $ as themeToken, a0 as breakpointsToken, a1 as setToString$1, a2 as isString, a3 as useAccessorAndControl, a4 as useFormItemRegister, a5 as IxSpace, a6 as rAF, a7 as getOffset, a8 as Logger, a9 as toNumber, aa as arrayEach, ab as convertNumber, ac as throttleRAF, ad as uniqueId, ae as convertArray, af as useFormElement, ag as FORM_TOKEN, ah as convertStringVNode, ai as \u0275Wave, aj as tryOnScopeDispose, ak as easeInOutCubic, al as identity, am as shortOut, an as isIndex, ao as root$1, ap as apply, aq as isHTMLElement$1 } from "./app-default.5bdbde0a.js";
const tooltipProps = {
  visible: { type: Boolean, default: void 0 },
  autoAdjust: { type: Boolean, default: void 0 },
  closeOnDeactivated: { type: Boolean, default: true },
  destroyOnHide: { type: Boolean, default: void 0 },
  delay: overlayDelayDef,
  disabled: { type: Boolean, default: false },
  offset: Array,
  overlayContainer: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  placement: overlayPlacementDef,
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
    if (visible.value && props.closeOnDeactivated) {
      setVisible(false);
    }
  });
  const overlayProps = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g;
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
      showArrow: true,
      placement: (_g = props.placement) != null ? _g : config.placement,
      trigger,
      zIndex: props.zIndex
    };
  });
  return { overlayRef, updatePopper, visible, setVisible, overlayProps };
}
var Tooltip = /* @__PURE__ */ defineComponent({
  name: "IxTooltip",
  props: tooltipProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig("common");
    const config = useGlobalConfig("tooltip");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tooltip`);
    const {
      overlayRef,
      updatePopper,
      overlayProps
    } = useTooltipOverlay(props, config, mergedPrefixCls);
    expose({
      updatePopper
    });
    return () => {
      const prefixCls = mergedPrefixCls.value;
      return createVNode(\u0275Overlay, mergeProps({
        "ref": overlayRef,
        "class": prefixCls,
        "transitionName": `${common.prefixCls}-fade-fast`
      }, overlayProps.value), {
        default: slots.default,
        content: () => renderContent(props, slots, prefixCls)
      });
    };
  }
});
const renderContent = (props, slots, prefixCls) => {
  if (!(slots.title || props.title)) {
    return null;
  }
  return createVNode("div", {
    "class": `${prefixCls}-wrapper`
  }, [slots.title ? slots.title() : props.title]);
};
const IxTooltip = Tooltip;
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var metaMap = WeakMap$1 && new WeakMap$1();
const metaMap$1 = metaMap;
var baseSetData = !metaMap$1 ? identity : function(func, data) {
  metaMap$1.set(func, data);
  return func;
};
const baseSetData$1 = baseSetData;
function createCtor(Ctor) {
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate$1(Ctor.prototype), result = Ctor.apply(thisBinding, args);
    return isObject(result) ? result : thisBinding;
  };
}
var WRAP_BIND_FLAG$6 = 1;
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG$6, Ctor = createCtor(func);
  function wrapper() {
    var fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}
var nativeMax$2 = Math.max;
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax$2(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}
var nativeMax$1 = Math.max;
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax$1(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}
function countHolders(array, placeholder) {
  var length = array.length, result = 0;
  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}
function baseLodash() {
}
var MAX_ARRAY_LENGTH = 4294967295;
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}
LazyWrapper.prototype = baseCreate$1(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
function noop() {
}
var getData = !metaMap$1 ? noop : function(func) {
  return metaMap$1.get(func);
};
const getData$1 = getData;
var realNames = {};
const realNames$1 = realNames;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function getFuncName(func) {
  var result = func.name + "", array = realNames$1[result], length = hasOwnProperty$1.call(realNames$1, result) ? array.length : 0;
  while (length--) {
    var data = array[length], otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = void 0;
}
LodashWrapper.prototype = baseCreate$1(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function lodash(value) {
  if (isObjectLike(value) && !isArray$1(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, "__wrapped__")) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;
function isLaziable(func) {
  var funcName = getFuncName(func), other = lodash[funcName];
  if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData$1(other);
  return !!data && func === data[0];
}
var setData = shortOut(baseSetData$1);
const setData$1 = setData;
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
  details = details.join(length > 2 ? ", " : " ");
  return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
}
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
function baseIsNaN(value) {
  return value !== value;
}
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
function baseIndexOf(array, value, fromIndex) {
  return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
var WRAP_BIND_FLAG$5 = 1, WRAP_BIND_KEY_FLAG$4 = 2, WRAP_CURRY_FLAG$5 = 8, WRAP_CURRY_RIGHT_FLAG$2 = 16, WRAP_PARTIAL_FLAG$2 = 32, WRAP_PARTIAL_RIGHT_FLAG$2 = 64, WRAP_ARY_FLAG$2 = 128, WRAP_REARG_FLAG$1 = 256, WRAP_FLIP_FLAG$1 = 512;
var wrapFlags = [
  ["ary", WRAP_ARY_FLAG$2],
  ["bind", WRAP_BIND_FLAG$5],
  ["bindKey", WRAP_BIND_KEY_FLAG$4],
  ["curry", WRAP_CURRY_FLAG$5],
  ["curryRight", WRAP_CURRY_RIGHT_FLAG$2],
  ["flip", WRAP_FLIP_FLAG$1],
  ["partial", WRAP_PARTIAL_FLAG$2],
  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG$2],
  ["rearg", WRAP_REARG_FLAG$1]
];
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = "_." + pair[0];
    if (bitmask & pair[1] && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}
function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + "";
  return setToString$1(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}
var WRAP_BIND_FLAG$4 = 1, WRAP_BIND_KEY_FLAG$3 = 2, WRAP_CURRY_BOUND_FLAG$1 = 4, WRAP_CURRY_FLAG$4 = 8, WRAP_PARTIAL_FLAG$1 = 32, WRAP_PARTIAL_RIGHT_FLAG$1 = 64;
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$4, newHolders = isCurry ? holders : void 0, newHoldersRight = isCurry ? void 0 : holders, newPartials = isCurry ? partials : void 0, newPartialsRight = isCurry ? void 0 : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);
  if (!(bitmask & WRAP_CURRY_BOUND_FLAG$1)) {
    bitmask &= ~(WRAP_BIND_FLAG$4 | WRAP_BIND_KEY_FLAG$3);
  }
  var newData = [
    func,
    bitmask,
    thisArg,
    newPartials,
    newHolders,
    newPartialsRight,
    newHoldersRight,
    argPos,
    ary,
    arity
  ];
  var result = wrapFunc.apply(void 0, newData);
  if (isLaziable(func)) {
    setData$1(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}
function getHolder(func) {
  var object = func;
  return object.placeholder;
}
var nativeMin$1 = Math.min;
function reorder(array, indexes) {
  var arrLength = array.length, length = nativeMin$1(indexes.length, arrLength), oldArray = copyArray(array);
  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : void 0;
  }
  return array;
}
var PLACEHOLDER$1 = "__lodash_placeholder__";
function replaceHolders(array, placeholder) {
  var index = -1, length = array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER$1) {
      array[index] = PLACEHOLDER$1;
      result[resIndex++] = index;
    }
  }
  return result;
}
var WRAP_BIND_FLAG$3 = 1, WRAP_BIND_KEY_FLAG$2 = 2, WRAP_CURRY_FLAG$3 = 8, WRAP_CURRY_RIGHT_FLAG$1 = 16, WRAP_ARY_FLAG$1 = 128, WRAP_FLIP_FLAG = 512;
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1, isBind = bitmask & WRAP_BIND_FLAG$3, isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2, isCurried = bitmask & (WRAP_CURRY_FLAG$3 | WRAP_CURRY_RIGHT_FLAG$1), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? void 0 : createCtor(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length;
    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        thisArg,
        args,
        newHolders,
        argPos,
        ary,
        arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root$1 && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);
  function wrapper() {
    var length = arguments.length, args = Array(length), index = length, placeholder = getHolder(wrapper);
    while (index--) {
      args[index] = arguments[index];
    }
    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func,
        bitmask,
        createHybrid,
        wrapper.placeholder,
        void 0,
        args,
        holders,
        void 0,
        void 0,
        arity - length
      );
    }
    var fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}
var WRAP_BIND_FLAG$2 = 1;
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$2, Ctor = createCtor(func);
  function wrapper() {
    var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}
var PLACEHOLDER = "__lodash_placeholder__";
var WRAP_BIND_FLAG$1 = 1, WRAP_BIND_KEY_FLAG$1 = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG$2 = 8, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
var nativeMin = Math.min;
function mergeData(data, source) {
  var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG$1 | WRAP_BIND_KEY_FLAG$1 | WRAP_ARY_FLAG);
  var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG$2 || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG$2;
  if (!(isCommon || isCombo)) {
    return data;
  }
  if (srcBitmask & WRAP_BIND_FLAG$1) {
    data[2] = source[2];
    newBitmask |= bitmask & WRAP_BIND_FLAG$1 ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  value = source[7];
  if (value) {
    data[7] = value;
  }
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  if (data[9] == null) {
    data[9] = source[9];
  }
  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}
var FUNC_ERROR_TEXT$1 = "Expected a function";
var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG$1 = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
var nativeMax = Math.max;
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = void 0;
  }
  ary = ary === void 0 ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === void 0 ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;
  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials, holdersRight = holders;
    partials = holders = void 0;
  }
  var data = isBindKey ? void 0 : getData$1(func);
  var newData = [
    func,
    bitmask,
    thisArg,
    partials,
    holders,
    partialsRight,
    holdersRight,
    argPos,
    ary,
    arity
  ];
  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === void 0 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
  if (!arity && bitmask & (WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$1 || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(void 0, newData);
  }
  var setter = data ? baseSetData$1 : setData$1;
  return setWrapToString(setter(result, newData), func, bitmask);
}
var WRAP_CURRY_FLAG = 8;
function curry(func, arity, guard) {
  arity = guard ? void 0 : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, void 0, void 0, void 0, void 0, void 0, arity);
  result.placeholder = curry.placeholder;
  return result;
}
curry.placeholder = {};
function isUndefined(value) {
  return value === void 0;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
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
const affixProps = {
  offset: {
    type: [Number, String, Object],
    default: 0
  },
  target: [String, HTMLElement, Function],
  onChange: Function
};
const events = ["scroll", "resize"];
const directions = ["top", "bottom", "left", "right"];
function normalizeOffset(offset) {
  if (!isObject(offset)) {
    return { top: convertNumber(offset) };
  }
  const _offset = {};
  Object.keys(offset).forEach((dire) => {
    _offset[dire] = convertNumber(offset[dire]);
  });
  return _offset;
}
function getTargetRect(target, container) {
  const targetRect = target.getBoundingClientRect();
  const containerRect = isHTMLElement$1(container) ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth };
  if (targetRect.width === 0 && targetRect.height === 0) {
    return null;
  }
  return {
    top: targetRect.top - containerRect.top,
    left: targetRect.left - containerRect.left,
    bottom: containerRect.bottom - targetRect.bottom,
    right: containerRect.right - targetRect.right
  };
}
function getTargetSize(target) {
  if (target === window) {
    return {
      width: target.innerWidth,
      height: target.innerHeight
    };
  }
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
}
function observeTarget(target, cb) {
  events.forEach((event) => {
    on(target, event, cb);
  });
}
function removeObserveTarget(target, cb) {
  events.forEach((event) => {
    off(target, event, cb);
  });
}
function isDireSticky(dire, affixRect, offsetOption) {
  return !isUndefined(offsetOption[dire]) && affixRect[dire] <= offsetOption[dire];
}
function isSticky(target, container, offsetOption) {
  const targetRect = getTargetRect(target, container);
  return !!targetRect && directions.some((dire) => isDireSticky(dire, targetRect, offsetOption));
}
function calcStickyPosition(target, container, offsetOption) {
  const targetRect = getTargetRect(target, container);
  if (!targetRect) {
    return {};
  }
  const style = {};
  style.position = container === window ? "fixed" : "absolute";
  const _directions = [
    isDireSticky("bottom", targetRect, offsetOption) ? "bottom" : "top",
    isDireSticky("right", targetRect, offsetOption) ? "right" : "left"
  ];
  _directions.forEach((dire) => {
    if (isDireSticky(dire, targetRect, offsetOption)) {
      style[dire] = `${offsetOption[dire] - (container === window ? 0 : targetRect[dire])}px`;
    } else {
      style[dire] = `${container === window ? targetRect[dire] : 0}px`;
    }
  });
  return style;
}
var Affix = /* @__PURE__ */ defineComponent({
  name: "IxAffix",
  props: affixProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-affix`);
    const contentStyle = ref({});
    const affixStyle = ref({});
    const targetRef = ref(null);
    const affixRef = ref(null);
    const contentRef = ref(null);
    const offset = computed(() => normalizeOffset(props.offset));
    const isStickyRef = ref(false);
    watch(isStickyRef, (value) => {
      var _a;
      return (_a = props.onChange) == null ? void 0 : _a.call(props, value);
    });
    const throttleMeasure = throttleRAF(measure);
    function measure(event) {
      if (!affixRef.value || !targetRef.value || !contentRef.value) {
        clearStyle();
        return;
      }
      isStickyRef.value = isSticky(affixRef.value, targetRef.value, offset.value);
      if (!isStickyRef.value) {
        clearStyle();
        return;
      }
      if (event && event.type === "resize") {
        clearStyle();
        nextTick(measure);
        return;
      }
      const {
        width,
        height
      } = getTargetSize(contentRef.value);
      contentStyle.value = {
        ...calcStickyPosition(affixRef.value, targetRef.value, offset.value),
        width: `${width}px`,
        height: `${height}px`
      };
      affixStyle.value = {
        width: `${width}px`,
        height: `${height}px`
      };
      if (targetRef.value !== window) {
        affixStyle.value.position = "relative";
      }
    }
    function clearStyle() {
      affixStyle.value = {};
      contentStyle.value = {};
    }
    function initContainer() {
      targetRef.value = convertTarget(props.target);
      observeTarget(targetRef.value, throttleMeasure);
    }
    onMounted(() => {
      nextTick(() => {
        initContainer();
        measure();
      });
    });
    onUnmounted(() => {
      var _a;
      removeObserveTarget(targetRef.value, throttleMeasure);
      (_a = throttleMeasure.cancel) == null ? void 0 : _a.call(throttleMeasure);
    });
    watch(() => props.offset, measure);
    watch(() => props.target, () => {
      removeObserveTarget(targetRef.value, throttleMeasure);
      initContainer();
      measure();
    });
    expose({
      update: throttleMeasure
    });
    return () => {
      var _a;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("div", {
        "ref": affixRef,
        "style": affixStyle.value,
        "class": prefixCls
      }, [createVNode("div", {
        "ref": contentRef,
        "class": `${prefixCls}-content`,
        "style": contentStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
const IxAffix = Affix;
const messageProps = {
  visible: {
    type: Boolean,
    default: void 0
  },
  destroyOnHover: {
    type: Boolean,
    default: void 0
  },
  duration: Number,
  icon: [String, Object],
  type: {
    type: String,
    default: "info"
  },
  "onUpdate:visible": [Function, Array],
  onClose: [Function, Array]
};
const messageProviderProps = {
  container: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  maxCount: Number,
  top: [String, Number]
};
var Message = /* @__PURE__ */ defineComponent({
  name: "IxMessage",
  props: messageProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message`);
    const config = useGlobalConfig("message");
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return [prefixCls, `${prefixCls}-${props.type}`];
    });
    const mergedIcon = computed(() => {
      const {
        icon,
        type
      } = props;
      return icon != null ? icon : config.icon[type];
    });
    const {
      visible,
      onMouseEnter,
      onMouseLeave
    } = useEvents(props, config);
    return () => {
      var _a;
      const icon = mergedIcon.value;
      const iconNode = isString(icon) ? createVNode(IxIcon, {
        "name": icon
      }, null) : icon;
      const prefixCls = mergedPrefixCls.value;
      return withDirectives(createVNode("div", {
        "class": classes.value,
        "onMouseenter": onMouseEnter,
        "onMouseleave": onMouseLeave
      }, [createVNode("div", {
        "class": `${prefixCls}-content`
      }, [createVNode("span", {
        "class": `${prefixCls}-content-icon`
      }, [iconNode]), createVNode("span", {
        "class": `${prefixCls}-content-text`
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])])]), [[vShow, visible.value]]);
    };
  }
});
const useEvents = (props, config) => {
  const duration = computed(() => {
    var _a;
    return (_a = props.duration) != null ? _a : config.duration;
  });
  const destroyOnHover = computed(() => {
    var _a;
    return (_a = props.destroyOnHover) != null ? _a : config.destroyOnHover;
  });
  const autoClose = computed(() => duration.value > 0);
  const [visible, setVisible] = useControlledProp(props, "visible", false);
  let timer = null;
  const startTimer = () => {
    timer = setTimeout(() => close(), duration.value);
  };
  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const close = () => {
    clearTimer();
    setVisible(false);
    callEmit(props.onClose);
  };
  const onMouseEnter = () => {
    if (autoClose.value && !destroyOnHover.value) {
      clearTimer();
    }
  };
  const onMouseLeave = () => {
    if (autoClose.value && !destroyOnHover.value) {
      startTimer();
    }
  };
  onMounted(() => {
    watchEffect(() => {
      clearTimer();
      if (visible.value && autoClose.value) {
        startTimer();
      }
    });
  });
  onBeforeUnmount(() => clearTimer());
  return {
    visible,
    onMouseEnter,
    onMouseLeave
  };
};
const MESSAGE_PROVIDER_TOKEN = Symbol("MESSAGE_PROVIDER_TOKEN");
var MessageProvider = /* @__PURE__ */ defineComponent({
  name: "IxMessageProvider",
  inheritAttrs: false,
  props: messageProviderProps,
  setup(props, {
    expose,
    slots,
    attrs
  }) {
    const common = useGlobalConfig("common");
    const config = useGlobalConfig("message");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message`);
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls);
    const style = computed(() => {
      var _a;
      return {
        top: convertCssPixel((_a = props.top) != null ? _a : config.top)
      };
    });
    const maxCount = computed(() => {
      var _a;
      return (_a = props.maxCount) != null ? _a : config.maxCount;
    });
    const {
      messages,
      loadContainer,
      open,
      info,
      success,
      warning,
      error,
      loading,
      update,
      destroy,
      destroyAll
    } = useMessage$1(maxCount);
    const apis = {
      open,
      info,
      success,
      warning,
      error,
      loading,
      update,
      destroy,
      destroyAll
    };
    provide(MESSAGE_PROVIDER_TOKEN, apis);
    expose(apis);
    return () => {
      var _a;
      const child = messages.value.map((item) => {
        const {
          key,
          content,
          visible = true,
          onDestroy,
          ...restProps
        } = item;
        const onClose = () => destroy(key);
        const mergedProps = {
          key,
          visible,
          onClose
        };
        return createVNode(Message, mergeProps(mergedProps, restProps), {
          default: () => [content]
        });
      });
      return createVNode(Fragment, null, [(_a = slots.default) == null ? void 0 : _a.call(slots), createVNode(CdkPortal, {
        "target": mergedPortalTarget.value,
        "load": loadContainer.value
      }, {
        default: () => [createVNode(TransitionGroup, mergeProps({
          "tag": "div",
          "appear": true,
          "name": `${common.prefixCls}-move-up`,
          "class": `${mergedPrefixCls.value}-wrapper`,
          "style": style.value
        }, attrs), {
          default: () => [child]
        })]
      })]);
    };
  }
});
const useMessage$1 = (maxCount) => {
  const messages = ref([]);
  const getCurrIndex = (key) => {
    return messages.value.findIndex((message) => message.key === key);
  };
  const add = (item) => {
    var _a;
    const currIndex = item.key ? getCurrIndex(item.key) : -1;
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item);
      return item.key;
    }
    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1);
    }
    const key = (_a = item.key) != null ? _a : uniqueId("ix-message");
    messages.value.push({
      ...item,
      key
    });
    return key;
  };
  const update = (key, item) => {
    const currIndex = getCurrIndex(key);
    if (currIndex !== -1) {
      const newItem = {
        ...messages.value[currIndex],
        ...item
      };
      messages.value.splice(currIndex, 1, newItem);
    }
  };
  const destroy = (key) => {
    const keys = convertArray(key);
    keys.forEach((key2) => {
      const currIndex = getCurrIndex(key2);
      if (currIndex !== -1) {
        const item = messages.value.splice(currIndex, 1);
        callEmit(item[0].onDestroy, key2);
      }
    });
  };
  const destroyAll = () => {
    messages.value = [];
  };
  const loadContainer = ref(false);
  const open = (options) => {
    const key = add(options);
    const ref2 = {
      key,
      update: (options2) => update(key, options2),
      destroy: () => destroy(key)
    };
    if (!loadContainer.value) {
      loadContainer.value = true;
    }
    return ref2;
  };
  const messageTypes = ["info", "success", "warning", "error", "loading"];
  const [info, success, warning, error, loading] = messageTypes.map((type) => {
    return (content, options) => open({
      ...options,
      content,
      type
    });
  });
  return {
    messages,
    loadContainer,
    open,
    info,
    success,
    warning,
    error,
    loading,
    update,
    destroy,
    destroyAll
  };
};
const useMessage = () => {
  const modalProviderRef = inject(MESSAGE_PROVIDER_TOKEN, null);
  if (modalProviderRef === null) {
    return throwError("components/message", "<IxMessageProvider> not found.");
  }
  return modalProviderRef;
};
const IxMessageProvider = MessageProvider;
const radioGroupToken = Symbol("radioGroupToken");
const radioProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  checked: { type: Boolean, default: void 0 },
  autofocus: { type: Boolean, default: false },
  buttoned: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: void 0 },
  label: { type: String, default: void 0 },
  mode: { type: String, default: void 0 },
  size: { type: String, default: void 0 },
  value: { type: null, default: void 0 },
  waveless: { type: Boolean, default: false },
  "onUpdate:checked": { type: [Function, Array] },
  onChange: { type: [Function, Array] },
  onBlur: { type: [Function, Array] },
  onFocus: { type: [Function, Array] }
};
const radioGroupProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  value: { type: null, default: void 0 },
  buttoned: { type: Boolean, default: false },
  dataSource: { type: Array },
  disabled: { type: Boolean, default: false },
  gap: { type: [Number, String], default: void 0 },
  name: { type: String, default: void 0 },
  mode: { type: String, default: void 0 },
  size: { type: String, default: "md" },
  "onUpdate:value": { type: [Function, Array] },
  onChange: { type: [Function, Array] }
};
const buttonSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "md"
};
var Radio = /* @__PURE__ */ defineComponent({
  name: "IxRadio",
  inheritAttrs: false,
  props: radioProps,
  setup(props, {
    attrs,
    expose,
    slots
  }) {
    const key = useKey();
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio`);
    const config = useGlobalConfig("radio");
    const {
      elementRef,
      focus,
      blur
    } = useFormElement();
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
      const {
        value
      } = props;
      if (!isNil(value)) {
        return value;
      }
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
    const {
      isChecked,
      isDisabled,
      isFocused,
      handleChange,
      handleBlur,
      handleFocus
    } = useRadio(props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless);
    const classes = computed(() => {
      const buttoned = isButtoned.value;
      const checked = isChecked.value;
      const isPrimary = buttoned && checked && mode.value === "primary";
      const prefixCls = mergedPrefixCls.value;
      const commonPrefixCls = common.prefixCls;
      const classes2 = {
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
      const {
        autofocus,
        label
      } = props;
      const {
        class: className,
        style,
        type,
        tabindex,
        ...restAttrs
      } = attrs;
      const prefixCls = mergedPrefixCls.value;
      const labelNode = convertStringVNode(slots.default, label);
      return createVNode("label", {
        "class": classes.value,
        "style": style,
        "role": "radio",
        "aria-checked": isChecked.value,
        "aria-disabled": isDisabled.value
      }, [createVNode("span", {
        "class": `${prefixCls}-input`
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
      }, [!mergedWaveless.value && createVNode(\u0275Wave, {
        "ref": waveRef
      }, null)])]), isButtoned.value && !mergedWaveless.value && createVNode(\u0275Wave, {
        "ref": waveRef
      }, null), labelNode && createVNode("span", {
        "class": `${prefixCls}-label`
      }, [labelNode])]);
    };
  }
});
const useRadio = (props, radioGroup, elementRef, mergedValue, waveRef, mergedWaveless) => {
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
    const {
      accessor,
      props: groupProps
    } = radioGroup;
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
        !mergedWaveless.value && ((_a = waveRef.value) == null ? void 0 : _a.play());
      }
    };
  } else {
    const {
      accessor,
      control
    } = useAccessorAndControl({
      valueKey: "checked"
    });
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
        !mergedWaveless.value && ((_a = waveRef.value) == null ? void 0 : _a.play());
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
  props: radioGroupProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio-group`);
    const {
      accessor,
      control
    } = useAccessorAndControl();
    useFormItemRegister(control);
    provide(radioGroupToken, {
      props,
      accessor
    });
    const mergedGap = computed(() => {
      var _a;
      return (_a = props.gap) != null ? _a : props.buttoned ? 0 : 8;
    });
    const classes = computed(() => {
      const {
        buttoned
      } = props;
      const gap = mergedGap.value;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${common.prefixCls}-button-group`]: buttoned,
        [`${common.prefixCls}-button-group-compact`]: buttoned && (!gap || gap === "0")
      });
    });
    return () => {
      const {
        dataSource
      } = props;
      let children;
      if (dataSource) {
        children = dataSource.map((item) => {
          const {
            key,
            value
          } = item;
          return createVNode(Radio, mergeProps(item, {
            "key": key != null ? key : value,
            "value": value != null ? value : key
          }), null);
        });
      } else {
        children = slots.default ? slots.default() : void 0;
      }
      return createVNode(IxSpace, {
        "class": classes.value,
        "size": mergedGap.value
      }, {
        default: () => [children]
      });
    };
  }
});
const IxRadioGroup = RadioGroup;
const resizeMap = /* @__PURE__ */ new Map();
function onResize(el, listener, options) {
  if (!el || !listener) {
    return;
  }
  if (resizeMap.has(el)) {
    resizeMap.get(el).listeners.push(listener);
  } else {
    const listeners = [listener];
    const ro = new ResizeObserver((entries) => {
      entries.forEach((entry) => listeners.forEach((fn) => fn(entry)));
    });
    ro.observe(el, options);
    resizeMap.set(el, { listeners, ro });
  }
}
function offResize(el, listener) {
  if (!el || !listener || !resizeMap.has(el)) {
    return;
  }
  const { listeners, ro } = resizeMap.get(el);
  const listenerIndex = listeners.indexOf(listener);
  if (listenerIndex > -1) {
    listeners.splice(listenerIndex, 1);
    if (listeners.length === 0) {
      ro.disconnect();
      resizeMap.delete(el);
    }
  }
}
function useResizeObserver(target, listener, options) {
  const stopWatch = watch(
    () => convertElement(target),
    (currElement, prevElement) => {
      if (prevElement) {
        offResize(prevElement, listener);
      }
      if (currElement) {
        onResize(currElement, listener, options);
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    offResize(convertElement(target), listener);
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function getScroll(target = window) {
  if (target === window) {
    return {
      scrollTop: target.pageYOffset || document.documentElement.scrollTop,
      scrollLeft: target.pageXOffset || document.documentElement.scrollLeft
    };
  } else {
    const { scrollTop, scrollLeft } = target;
    return { scrollTop, scrollLeft };
  }
}
const scrollToTop = (options = {}) => {
  const { top, amountOfChange, target = window, duration = 450, easing = easeInOutCubic, callback } = options;
  if (isNil(top) && isNil(amountOfChange)) {
    return;
  }
  const { scrollTop } = getScroll(target);
  const startTime = Date.now();
  const frameFunc = () => {
    const time = Date.now() - startTime;
    const elapsed = time > duration ? duration : time;
    const _amountOfChange = amountOfChange != null ? amountOfChange : top - scrollTop;
    const nextScrollTop = easing(elapsed, scrollTop, _amountOfChange, duration);
    if (target === window) {
      target.scrollTo(window.pageXOffset, nextScrollTop);
    } else {
      target.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      rAF(frameFunc);
    } else if (typeof callback === "function") {
      callback();
    }
  };
  rAF(frameFunc);
};
const anchorToken = Symbol("anchorToken");
const anchorProps = {
  affix: {
    type: Boolean,
    default: true
  },
  bounds: Number,
  hideLinkBall: {
    type: Boolean,
    default: void 0
  },
  offsetTop: Number,
  target: [String, HTMLElement, Function],
  targetOffset: Number,
  onChange: [Function, Array],
  onClick: [Function, Array]
};
const linkProps = {
  href: {
    type: String,
    required: true
  },
  title: String
};
var Anchor$1 = /* @__PURE__ */ defineComponent({
  name: "IxAnchor",
  props: anchorProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor`);
    const config = useGlobalConfig("anchor");
    const hideLinkBall = computed(() => {
      var _a;
      return (_a = props.hideLinkBall) != null ? _a : config.hideLinkBall;
    });
    const wrapperStyle = computed(() => {
      const {
        offsetTop
      } = props;
      return {
        maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : "100vh"
      };
    });
    const {
      activeLink
    } = useLinks(props, config);
    const {
      anchorRef,
      inkBallElRef,
      inkBallClasses,
      inkBallTop
    } = useInkBall(activeLink, mergedPrefixCls);
    return () => {
      var _a;
      const prefixCls = mergedPrefixCls.value;
      const linkBall = hideLinkBall.value ? null : createVNode("span", {
        "class": inkBallClasses.value,
        "style": {
          top: inkBallTop.value
        },
        "ref": inkBallElRef
      }, null);
      const anchorNode = createVNode("div", {
        "class": `${prefixCls}-wrapper`,
        "style": wrapperStyle.value
      }, [createVNode("div", {
        "class": prefixCls,
        "ref": anchorRef
      }, [createVNode("div", {
        "class": `${prefixCls}-ink`
      }, [linkBall]), (_a = slots.default) == null ? void 0 : _a.call(slots)])]);
      if (!props.affix) {
        return anchorNode;
      }
      return createVNode(IxAffix, {
        "target": props.target,
        "offset": props.offsetTop
      }, {
        default: () => [anchorNode]
      });
    };
  }
});
const useLinks = (props, config) => {
  const links = ref([]);
  const registerLink = (link) => {
    if (!links.value.includes(link)) {
      links.value.push(link);
    }
  };
  const unregisterLink = (link) => {
    const index = links.value.indexOf(link);
    if (index !== -1) {
      links.value.splice(index, 1);
    }
  };
  const activeLink = ref();
  const setActiveLink = (link) => {
    if (activeLink.value !== link) {
      activeLink.value = link;
      callEmit(props.onChange, link);
    }
  };
  const {
    scrollTo
  } = useScroll(props, config, links, setActiveLink);
  const handleLinkClick = (evt, linkProps2) => {
    callEmit(props.onClick, evt, linkProps2);
    scrollTo(linkProps2.href);
  };
  provide(anchorToken, {
    registerLink,
    unregisterLink,
    activeLink,
    handleLinkClick
  });
  return {
    activeLink
  };
};
const useInkBall = (activeLink, mergedPrefixCls) => {
  const anchorRef = ref();
  const inkBallElRef = ref();
  const inkBallClasses = computed(() => {
    const prefixCls = mergedPrefixCls.value;
    return {
      [`${prefixCls}-ink-ball`]: true,
      [`${prefixCls}-ink-ball-visible`]: !!activeLink.value
    };
  });
  const inkBallTop = ref();
  onMounted(() => {
    watchEffect(() => {
      var _a, _b, _c;
      const activeLinkElement = (_a = anchorRef.value) == null ? void 0 : _a.querySelector(`a[data-href="${activeLink.value}"]`);
      if (!activeLinkElement) {
        return;
      }
      const inkBallHeight = (_c = (_b = inkBallElRef.value) == null ? void 0 : _b.getBoundingClientRect().height) != null ? _c : 9;
      const {
        offsetTop,
        clientHeight
      } = activeLinkElement;
      inkBallTop.value = `${offsetTop + clientHeight / 2 - inkBallHeight / 2}px`;
    }, {
      flush: "post"
    });
  });
  return {
    anchorRef,
    inkBallElRef,
    inkBallClasses,
    inkBallTop
  };
};
const getTargetTop = (link, container) => {
  const targetElement = document.getElementById(link.split("#")[1]);
  if (targetElement) {
    const {
      top
    } = getOffset(targetElement, container);
    return top;
  }
  return null;
};
const getCurrentAnchor = (links, container, offsetTop, bounds) => {
  if (!links.length) {
    return "";
  }
  const maxSection = links.map((link) => {
    const top = getTargetTop(link, container);
    return {
      link,
      top
    };
  }).reduce((curr, item) => {
    const {
      top
    } = item;
    if (top !== null && top < offsetTop + bounds && curr.top < top) {
      return item;
    }
    return curr;
  });
  return maxSection.link;
};
const useScroll = (props, config, links, setActiveLink) => {
  const bounds = computed(() => {
    var _a;
    return (_a = props.bounds) != null ? _a : config.bounds;
  });
  const container = ref();
  const eventType = "scroll";
  let animating = false;
  const targetOffset = computed(() => {
    var _a, _b;
    return (_b = (_a = props.targetOffset) != null ? _a : props.offsetTop) != null ? _b : 0;
  });
  const handleScroll = () => {
    if (animating) {
      return;
    }
    const currLink = getCurrentAnchor(links.value, container.value, targetOffset.value, bounds.value);
    setActiveLink(currLink);
  };
  const scrollTo = (link) => {
    setActiveLink(link);
    const top = getTargetTop(link, container.value);
    if (top === null) {
      return;
    }
    animating = true;
    scrollToTop({
      amountOfChange: top - targetOffset.value,
      target: container.value,
      callback: () => {
        animating = false;
      }
    });
  };
  watch(() => props.target, () => {
    off(container.value, eventType, handleScroll);
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onMounted(() => {
    container.value = convertTarget(props.target);
    on(container.value, eventType, handleScroll);
    handleScroll();
  });
  onBeforeUnmount(() => {
    off(container.value, eventType, handleScroll);
  });
  return {
    scrollTo
  };
};
var AnchorLink = /* @__PURE__ */ defineComponent({
  name: "IxAnchorLink",
  props: linkProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor-link`);
    const {
      registerLink,
      unregisterLink,
      activeLink,
      handleLinkClick
    } = inject(anchorToken);
    watch(() => props.href, (newHref, oldHref) => {
      unregisterLink(oldHref);
      registerLink(newHref);
    });
    onMounted(() => registerLink(props.href));
    onBeforeUnmount(() => unregisterLink(props.href));
    const isActive = computed(() => activeLink.value === props.href);
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return {
        [`${prefixCls}-title`]: true,
        [`${prefixCls}-title-active`]: isActive.value
      };
    });
    const onClick = (evt) => handleLinkClick(evt, props);
    return () => {
      var _a, _b, _c;
      const {
        href,
        title
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("div", {
        "class": prefixCls
      }, [createVNode("a", {
        "class": classes.value,
        "href": href,
        "data-href": href,
        "title": title,
        "onClick": onClick
      }, [(_b = (_a = slots.title) == null ? void 0 : _a.call(slots)) != null ? _b : title]), (_c = slots.default) == null ? void 0 : _c.call(slots)]);
    };
  }
});
const IxAnchor = Anchor$1;
const IxAnchorLink = AnchorLink;
const Anchor = defineComponent({
  name: "Anchor",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const {
      headerFixed,
      headerHeight
    } = inject(pageContextToken);
    const renderLinks = (data) => {
      return data.map((item) => createVNode(IxAnchorLink, {
        "title": item.title,
        "href": item.href
      }, {
        default: () => [renderLinks(item.children)]
      }));
    };
    const anchorRef = ref();
    const target = ref();
    const offsetTop = computed(() => headerFixed.value ? headerHeight.value + 16 : 16);
    onMounted(() => {
      var _a;
      target.value = c((_a = anchorRef.value) == null ? void 0 : _a.$el);
    });
    return () => createVNode(IxAnchor, {
      "ref": anchorRef,
      "offsetTop": offsetTop.value,
      "target": target.value
    }, {
      default: () => [renderLinks(props.data)]
    });
  }
});
const BaseContent = defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {
    slots,
    expose
  }) {
    const {
      anchorOptions
    } = inject(pageContextToken);
    const enableAnchor = computed(() => !!anchorOptions.value.enabled);
    const anchorMaxLevel = computed(() => isObject(anchorOptions) ? anchorOptions.value.maxLevel : 3);
    const rootEl = ref();
    const anchorEl = ref();
    const anchorDatas = ref();
    const contentPaddingReight = ref();
    const calcContentPadding = () => {
      var _a;
      const anchorWidth = (_a = anchorEl.value) == null ? void 0 : _a.$el.getBoundingClientRect().width;
      contentPaddingReight.value = anchorWidth ? `${anchorWidth}px` : void 0;
    };
    const updateAnchor = () => {
      if (!rootEl.value) {
        return;
      }
      anchorDatas.value = parseAnchors(rootEl.value, anchorMaxLevel.value);
    };
    watch([anchorDatas, () => props.visible], ([, visible]) => {
      visible && nextTick(calcContentPadding);
    });
    onMounted(() => {
      if (!enableAnchor.value) {
        return;
      }
      watch(() => props.visible, (visible) => {
        visible && nextTick(updateAnchor);
      }, {
        immediate: true
      });
    });
    expose({
      updateAnchor
    });
    return () => {
      var _a, _b;
      return createVNode("div", {
        "class": "archive-app__page__content"
      }, [createVNode("div", {
        "class": "archive-app__page__content__inner",
        "ref": rootEl
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), ((_b = anchorDatas.value) == null ? void 0 : _b.length) ? createVNode(Anchor, {
        "ref": anchorEl,
        "class": "archive-app__page__content__anchor",
        "data": anchorDatas.value
      }, null) : void 0]);
    };
  }
});
const anchorTags = [{
  tag: "h1",
  level: 1
}, {
  tag: "h2",
  level: 2
}, {
  tag: "h3",
  level: 3
}, {
  tag: "h4",
  level: 4
}];
function parseAnchors(root2, maxLevel) {
  const anchorRoot = {
    level: 0,
    title: "",
    href: "",
    children: []
  };
  let stackTop = anchorRoot;
  const anchorStack = [anchorRoot];
  const pushStack = (data) => {
    anchorStack.push(data);
    stackTop = data;
  };
  const popStack = () => {
    anchorStack.pop();
    stackTop = anchorStack[anchorStack.length - 1];
  };
  const hiddenEls = [];
  u(root2.children, "children", (el, parents) => {
    var _a, _b, _c;
    if (getComputedStyle(el).display === "none") {
      hiddenEls.push(el);
      return;
    }
    if (!el.id || !el.textContent || parents.some((parent) => hiddenEls.includes(parent))) {
      return;
    }
    const level = (_a = anchorTags.find((tag) => tag.tag === el.tagName.toLowerCase())) == null ? void 0 : _a.level;
    if (!level || level > maxLevel) {
      return;
    }
    const data = {
      level,
      title: (_c = (_b = el.getAttribute("title")) != null ? _b : el.textContent.replace(/^#/, "").replace(/#$/, "")) != null ? _c : el.id,
      href: `#${el.id}`,
      children: []
    };
    while (level <= stackTop.level) {
      popStack();
    }
    stackTop.children.push(data);
    pushStack(data);
  });
  return anchorRoot.children;
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useAsyncProp(props, key) {
  const data = ref();
  onMounted(() => {
    watch(
      () => props[key],
      async (asyncProp) => {
        data.value = void 0;
        if (asyncProp) {
          data.value = await (asyncProp == null ? void 0 : asyncProp());
        }
      },
      {
        immediate: true
      }
    );
  });
  return data;
}
function useArrayAsyncProp(props, key) {
  const data = ref();
  onMounted(() => {
    watch(
      () => props[key],
      async (arrayAsyncProp) => {
        data.value = void 0;
        if (arrayAsyncProp) {
          data.value = await Promise.all(arrayAsyncProp == null ? void 0 : arrayAsyncProp.map((asyncProp) => asyncProp()));
        }
      },
      {
        immediate: true
      }
    );
  });
  return data;
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PendingCopy {
  constructor(text) {
    __publicField$1(this, "_textarea");
    const textarea = this._textarea = document.createElement("textarea");
    const styles = textarea.style;
    styles.opacity = "0";
    styles.position = "absolute";
    styles.left = styles.top = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    document.body.appendChild(textarea);
  }
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch (err) {
      Logger.error("cdk/clipboard", err);
    }
    return successful;
  }
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
      this._textarea = void 0;
    }
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _Clipboard = class {
  static getInstance() {
    if (!_Clipboard.instance) {
      _Clipboard.instance = new _Clipboard();
    }
    return _Clipboard.instance;
  }
  constructor() {
  }
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  beginCopy(text) {
    return new PendingCopy(text);
  }
};
let Clipboard = _Clipboard;
__publicField(Clipboard, "instance", null);
const useClipboard = () => {
  const clipboard = Clipboard.getInstance();
  const pendingSet = /* @__PURE__ */ new Set();
  let unmounted = false;
  let currentTimeout = null;
  onUnmounted(() => {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout);
    }
    pendingSet.forEach((copy2) => copy2.destroy());
    pendingSet.clear();
    unmounted = true;
  });
  function copy(text, attempts = 1) {
    const promise = new Promise((resolve) => {
      if (attempts > 1) {
        let remainingAttempts = attempts;
        const pending = clipboard.beginCopy(text);
        pendingSet.add(pending);
        const attempt = () => {
          const successful = pending.copy();
          if (!successful && --remainingAttempts && !unmounted) {
            currentTimeout = setTimeout(attempt, 1);
          } else {
            currentTimeout = null;
            pendingSet.delete(pending);
            pending.destroy();
            resolve(successful);
          }
        };
        attempt();
      } else {
        const successful = clipboard.copy(text);
        resolve(successful);
      }
    });
    return promise;
  }
  return { copy };
};
const tabsToken = Symbol("tabsToken");
const tabsProps = {
  selectedKey: { type: [Number, String, Symbol], default: void 0 },
  type: { type: String, default: "card" },
  forceRender: { type: Boolean, default: false },
  placement: { type: String, default: "top" },
  mode: { type: String, default: "default" },
  size: String,
  "onUpdate:selectedKey": [Function, Array],
  onTabClick: [Function, Array],
  onPreClick: [Function, Array],
  onNextClick: [Function, Array],
  onBeforeLeave: [Function, Array]
};
const tabProps = {
  title: { type: String, default: void 0 },
  forceRender: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: false }
};
const tabNavProps = {
  defaultSelectedKey: { type: [Number, String, Symbol], default: void 0 },
  title: { type: String, default: void 0 },
  disabled: { type: Boolean, default: void 0 }
};
var Tab = /* @__PURE__ */ defineComponent({
  __IDUX_TAB: true,
  name: "IxTab",
  props: tabProps,
  setup(_, {
    slots
  }) {
    const {
      mergedPrefixCls
    } = inject(tabsToken);
    return () => {
      var _a;
      return createVNode("div", {
        "class": `${mergedPrefixCls.value}-pane`
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
var TabNav = /* @__PURE__ */ defineComponent({
  name: "IxTabNav",
  props: tabNavProps,
  setup(props, {
    slots
  }) {
    const key = useKey();
    const {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick
    } = inject(tabsToken);
    const selfElRef = ref(null);
    const isSelected = computed(() => {
      var _a;
      return ((_a = selectedKey.value) != null ? _a : props.defaultSelectedKey) === key;
    });
    const prefixCls = computed(() => `${mergedPrefixCls.value}-nav`);
    const classes = computed(() => {
      return normalizeClass({
        [`${prefixCls.value}-tab`]: true,
        [`${prefixCls.value}-tab-selected`]: isSelected.value,
        [`${prefixCls.value}-tab-disabled`]: props.disabled
      });
    });
    watchEffect(() => {
      if (isSelected.value && selfElRef.value) {
        selectedElRef.value = selfElRef.value;
      }
    });
    const onClick = (evt) => {
      if (!props.disabled) {
        handleTabClick(key, evt);
      }
    };
    return () => {
      var _a, _b;
      const tab = createVNode("span", {
        "class": `${prefixCls.value}-tab-label`
      }, [createTextVNode(" "), (_b = (_a = slots.title) == null ? void 0 : _a.call(slots)) != null ? _b : props.title]);
      return createVNode("div", {
        "class": classes.value,
        "onClick": onClick,
        "ref": selfElRef
      }, [tab]);
    };
  }
});
function useSelectedElOffset(isHorizontal, navPreNextSize, selectedElRef) {
  const [selectedLeft, setSelectedLeft] = useState(0);
  const [selectedTop, setSelectedTop] = useState(0);
  const selectedElOffset = computed(
    () => (isHorizontal.value ? selectedLeft.value : selectedTop.value) + navPreNextSize.value
  );
  const setSelectedElOffset = () => {
    var _a, _b, _c, _d;
    setSelectedLeft((_b = (_a = selectedElRef.value) == null ? void 0 : _a.offsetLeft) != null ? _b : 0);
    setSelectedTop((_d = (_c = selectedElRef.value) == null ? void 0 : _c.offsetTop) != null ? _d : 0);
  };
  return {
    selectedElOffset,
    setSelectedElOffset
  };
}
function useNavRelatedElSize(isHorizontal, navWrapperElRef, navElRef, navPreElRef, selectedElRef) {
  const [navWidth, setNavWidth] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const [navWrapperWidth, setNavWrapperWidth] = useState(0);
  const [navWrapperHeight, setNavWrapperHeight] = useState(0);
  const [navPreNextWidth, setNavPreNextWidth] = useState(0);
  const [navPreNextHeight, setNavPreNextHeight] = useState(0);
  const [selectedWidth, setSelectedWidth] = useState(0);
  const [selectedHeight, setSelectedHeight] = useState(0);
  const navSize = computed(() => isHorizontal.value ? navWidth.value : navHeight.value);
  const navPreNextSize = computed(() => isHorizontal.value ? navPreNextWidth.value : navPreNextHeight.value);
  const navWrapperSize = computed(() => isHorizontal.value ? navWrapperWidth.value : navWrapperHeight.value);
  const selectedElSize = computed(() => isHorizontal.value ? selectedWidth.value : selectedHeight.value);
  const setNavElSize = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    setNavWrapperWidth((_b = (_a = navWrapperElRef.value) == null ? void 0 : _a.offsetWidth) != null ? _b : 0);
    setNavWrapperHeight((_d = (_c = navWrapperElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
    setNavWidth((_f = (_e = navElRef.value) == null ? void 0 : _e.offsetWidth) != null ? _f : 0);
    setNavHeight((_h = (_g = navElRef.value) == null ? void 0 : _g.offsetHeight) != null ? _h : 0);
  };
  const setSelectedElSize = () => {
    var _a, _b, _c, _d;
    setSelectedWidth((_b = (_a = selectedElRef.value) == null ? void 0 : _a.offsetWidth) != null ? _b : 0);
    setSelectedHeight((_d = (_c = selectedElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
  };
  const setNavPreNextElSize = () => {
    var _a, _b, _c, _d;
    setNavPreNextWidth((_b = (_a = navPreElRef.value) == null ? void 0 : _a.$el.offsetWidth) != null ? _b : 0);
    setNavPreNextHeight((_d = (_c = navPreElRef.value) == null ? void 0 : _c.$el.offsetHeight) != null ? _d : 0);
  };
  return {
    navSize,
    navWrapperSize,
    navPreNextSize,
    selectedElSize,
    setNavElSize,
    setSelectedElSize,
    setNavPreNextElSize
  };
}
function useSelectedElVisibleSize(navWrapperSize, selectedElOffset, navOffset) {
  return computed(() => {
    return navWrapperSize.value + navOffset.value - selectedElOffset.value;
  });
}
function useNavPreNextClasses(props, mergedPrefixCls, type, disabled) {
  return computed(() => {
    const {
      placement
    } = props;
    const prefixCls = mergedPrefixCls.value;
    return normalizeClass({
      [`${prefixCls}-nav-${type}`]: true,
      [`${prefixCls}-nav-${type}-disabled`]: disabled.value,
      [`${prefixCls}-nav-${type}-${placement}`]: true
    });
  });
}
function filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey) {
  const renderTabVNodes = [];
  tabVNodes.forEach((vNode) => {
    var _a;
    const {
      key
    } = vNode;
    const {
      forceRender,
      disabled
    } = vNode.props;
    const _disabled = !isNil(disabled);
    const useVShow = forceRender != null ? forceRender : props.forceRender;
    const show = ((_a = selectedKey.value) != null ? _a : defaultSelectedKey) === key && !_disabled;
    if (useVShow) {
      renderTabVNodes.push(withDirectives(vNode, [[vShow, show]]));
    } else if (show) {
      renderTabVNodes.push(vNode);
    }
  });
  return renderTabVNodes;
}
var InternalTabs = /* @__PURE__ */ defineComponent({
  props: {
    ...tabsProps,
    tabs: {
      type: Array,
      default: void 0
    }
  },
  setup(props) {
    const common = useGlobalConfig("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tabs`);
    const config = useGlobalConfig("tabs");
    const navWrapperElRef = ref(null);
    const navElRef = ref(null);
    const navBarElRef = ref(null);
    const navPreElRef = ref(null);
    const selectedElRef = ref(null);
    const [selectedKey, setSelectedKey] = useControlledProp(props, "selectedKey");
    const isLineType = computed(() => props.type === "line");
    const isSegmentType = computed(() => props.type === "segment");
    const horizontalPlacement = ["top", "bottom"];
    const isHorizontal = computed(() => horizontalPlacement.includes(props.placement));
    const mergedSize = computed(() => {
      var _a;
      return (_a = props.size) != null ? _a : config.size;
    });
    const [navOffset, setNavOffset] = useState(0);
    const [barStyle, setBarStyle] = useState({});
    const {
      navSize,
      navWrapperSize,
      navPreNextSize,
      selectedElSize,
      setNavElSize,
      setSelectedElSize,
      setNavPreNextElSize
    } = useNavRelatedElSize(isHorizontal, navWrapperElRef, navElRef, navPreElRef, selectedElRef);
    const {
      selectedElOffset,
      setSelectedElOffset
    } = useSelectedElOffset(isHorizontal, navPreNextSize, selectedElRef);
    const hasScroll = computed(() => {
      return navSize.value > navWrapperSize.value;
    });
    watch(hasScroll, () => {
      setNavPreNextElSize();
      updateNavBarStyle();
      updateSelectedOffset();
    }, {
      flush: "post"
    });
    const selectedElVisibleSize = useSelectedElVisibleSize(navWrapperSize, selectedElOffset, navOffset);
    const updateSelectedOffset = () => {
      if (hasScroll.value) {
        const size = selectedElVisibleSize.value / navWrapperSize.value;
        const inVisibleRange = size < 2;
        if (inVisibleRange) {
          if (selectedElVisibleSize.value < selectedElSize.value) {
            setNavOffset(navOffset.value + selectedElSize.value - selectedElVisibleSize.value + navPreNextSize.value);
          } else if (selectedElVisibleSize.value / navWrapperSize.value > 1) {
            setNavOffset(navOffset.value - (selectedElVisibleSize.value % navWrapperSize.value + navPreNextSize.value));
          }
        } else {
          setNavOffset(selectedElOffset.value - navPreNextSize.value);
        }
      }
    };
    const preReached = ref(false);
    const nextReached = ref(false);
    const classes = computed(() => {
      const {
        type,
        placement,
        mode
      } = props;
      const prefixCls = mergedPrefixCls.value;
      const size = mergedSize.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${size}`]: true,
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-nav-${placement}`]: placement === "top" || type === "line",
        [`${prefixCls}-nav-${mode}`]: type === "segment"
      });
    });
    const navWrapperClass = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-nav-wrapper`]: true,
        [`${prefixCls}-nav-wrapper-has-scroll`]: hasScroll.value
      });
    });
    const curryNavPreNextClasses = curry(useNavPreNextClasses)(props, mergedPrefixCls);
    const navPreClasses = curryNavPreNextClasses("pre", preReached);
    const navNextClasses = curryNavPreNextClasses("next", nextReached);
    const handleTabClick = async (key, evt) => {
      const leaveResult = callEmit(props.onBeforeLeave, key, selectedKey.value);
      const result = await leaveResult;
      if (result !== false) {
        callEmit(props.onTabClick, key, evt);
        if (key === selectedKey.value) {
          updateSelectedOffset();
        }
        setSelectedKey(key);
      }
    };
    const updateNavBarStyle = () => {
      var _a;
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = (_a = selectedElRef.value) == null ? void 0 : _a.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`);
        const barDisabledClassName = `${mergedPrefixCls.value}-nav-bar-disabled`;
        const barOffset = selectedElOffset.value - navOffset.value + "px";
        const barSize = selectedElSize.value + "px";
        setBarStyle({
          width: isHorizontal.value ? barSize : "",
          left: isHorizontal.value ? barOffset : "",
          top: isHorizontal.value ? "" : barOffset,
          height: isHorizontal.value ? "" : barSize
        });
        if (isBarDisabled) {
          addClass(navBarElRef.value, barDisabledClassName);
        } else {
          removeClass(navBarElRef.value, barDisabledClassName);
        }
      }
    };
    const handlePreClick = (evt) => {
      if (!preReached.value) {
        callEmit(props.onPreClick, evt);
        const mergedOffset = navOffset.value + navPreNextSize.value;
        const offset = mergedOffset < navWrapperSize.value ? 0 : mergedOffset - navWrapperSize.value;
        setNavOffset(offset);
      }
    };
    const handleNextClick = (evt) => {
      if (!nextReached.value) {
        callEmit(props.onNextClick, evt);
        const mergedNavSize = navSize.value + navPreNextSize.value * 2;
        const _offset = navOffset.value + navWrapperSize.value;
        let offset;
        if (mergedNavSize - _offset < navWrapperSize.value) {
          offset = mergedNavSize - navWrapperSize.value;
        } else {
          offset = _offset;
        }
        setNavOffset(offset);
      }
    };
    const judgePreNextStatus = () => {
      preReached.value = navOffset.value === 0;
      nextReached.value = navSize.value - navOffset.value <= navWrapperSize.value;
    };
    const update = () => {
      setNavElSize();
      setNavPreNextElSize();
      setSelectedElSize();
      setSelectedElOffset();
      updateNavBarStyle();
      judgePreNextStatus();
    };
    watch(navOffset, (val) => {
      if (navElRef.value) {
        navElRef.value.style.transform = `translate${isHorizontal.value ? "X" : "Y"}(-${val}px)`;
        judgePreNextStatus();
        updateNavBarStyle();
      }
    }, {
      flush: "post"
    });
    let isAddTabs = false;
    watch(() => props.tabs, (val = [], oldVal = []) => {
      update();
      isAddTabs = val.length > oldVal.length;
    }, {
      flush: "post"
    });
    watch(navSize, (currentSize, oldSize) => {
      let offset = navOffset.value;
      if (currentSize < oldSize && !isAddTabs) {
        offset += currentSize - oldSize;
        setNavOffset(offset > 0 ? offset : 0);
      }
    }, {
      flush: "post"
    });
    watch(selectedKey, (val) => {
      var _a;
      const hasSelectedKey = (_a = props.tabs) == null ? void 0 : _a.find((item) => {
        return val === item.key;
      });
      if (!hasSelectedKey) {
        selectedElRef.value = null;
      }
    });
    watch(selectedElRef, () => {
      setSelectedElSize();
      setSelectedElOffset();
      setSelectedElOffset();
      updateSelectedOffset();
      updateNavBarStyle();
    }, {
      flush: "post"
    });
    useResizeObserver(navWrapperElRef, update);
    provide(tabsToken, {
      selectedKey,
      selectedElRef,
      mergedPrefixCls,
      handleTabClick
    });
    return () => {
      var _a, _b;
      let defaultSelectedKey = 1;
      const tabVNodes = (_b = (_a = props.tabs) == null ? void 0 : _a.map((item, index) => {
        if (isNil(item.key)) {
          item.key = index + 1;
        } else if (index === 0) {
          defaultSelectedKey = item.key;
        }
        return item;
      })) != null ? _b : [];
      return createVNode("div", {
        "class": classes.value
      }, [createVNode("div", {
        "class": navWrapperClass.value,
        "ref": navWrapperElRef
      }, [hasScroll.value && createVNode(IxIcon, {
        "class": navPreClasses.value,
        "name": isHorizontal.value ? "left" : "up",
        "onClick": handlePreClick,
        "ref": navPreElRef
      }, null), createVNode("div", {
        "class": `${mergedPrefixCls.value}-nav`,
        "ref": navElRef
      }, [
        tabVNodes.map((vnode) => {
          var _a2;
          return createVNode(TabNav, mergeProps(vnode.props, {
            "key": vnode.key,
            "defaultSelectedKey": defaultSelectedKey
          }), {
            title: (_a2 = vnode.children) == null ? void 0 : _a2.title
          });
        })
      ]), hasScroll.value && createVNode(IxIcon, {
        "class": navNextClasses.value,
        "name": isHorizontal.value ? "right" : "down",
        "onClick": handleNextClick
      }, null), !isSegmentType.value && createVNode("div", {
        "class": `${mergedPrefixCls.value}-nav-border`
      }, null), isLineType.value && createVNode("div", {
        "class": `${mergedPrefixCls.value}-nav-bar`,
        "ref": navBarElRef,
        "style": barStyle.value
      }, null)]), createVNode("div", {
        "class": `${mergedPrefixCls.value}-pane-wrapper`
      }, [filterTabVNodes(props, tabVNodes, selectedKey, defaultSelectedKey)])]);
    };
  }
});
var Tabs = /* @__PURE__ */ defineComponent({
  name: "IxTabs",
  inheritAttrs: false,
  props: tabsProps,
  setup(props, {
    attrs,
    slots
  }) {
    return () => {
      var _a;
      const tabVNodes = flattenNode((_a = slots.default) == null ? void 0 : _a.call(slots), {
        key: "__IDUX_TAB"
      });
      const [, setSelectedKey] = useControlledProp(props, "selectedKey");
      const handleChange = (key) => {
        setSelectedKey(key);
      };
      const internalTabsProps = {
        ...props,
        tabs: tabVNodes,
        "onUpdate:selectedKey": handleChange
      };
      return createVNode(InternalTabs, mergeProps(internalTabsProps, attrs), slots);
    };
  }
});
const IxTabs = Tabs;
const IxTab = Tab;
const DemoToolComp = defineComponent({
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    tooltip: String,
    onClick: {
      type: Function,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    return () => createVNode(IxTooltip, {
      "title": props.tooltip
    }, {
      default: () => {
        var _a;
        return [createVNode("div", {
          "class": `${props.prefixCls}-demo__tool`,
          "onClick": props.onClick
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])];
      }
    });
  }
});
const Instance = defineComponent({
  props: {
    instance: {
      type: Object
    },
    onInstanceMountedChange: {
      type: [Function, Array]
    }
  },
  setup(props) {
    const elRef = ref();
    watch(() => props.instance, async (instance, formerInstance) => {
      var _a;
      callEmit(props.onInstanceMountedChange, false);
      await (formerInstance == null ? void 0 : formerInstance.unmount());
      const observer = new MutationObserver((mutations) => {
        var _a2;
        if (mutations.findIndex((m) => m.type === "childList") > -1 && ((_a2 = elRef.value) == null ? void 0 : _a2.children.length)) {
          callEmit(props.onInstanceMountedChange, true);
          observer.disconnect();
        }
      });
      observer.observe(elRef.value, {
        childList: true,
        subtree: false,
        attributes: false
      });
      await ((_a = instance == null ? void 0 : instance.mount) == null ? void 0 : _a.call(instance, elRef.value));
    }, {
      immediate: true
    });
    onUnmounted(() => {
      var _a;
      (_a = props.instance) == null ? void 0 : _a.unmount();
    });
    return () => createVNode("div", {
      "ref": elRef
    }, null);
  }
});
const demoProps = {
  lang: {
    type: String,
    required: true
  },
  prefixCls: {
    type: String,
    required: true
  },
  resolvedDemoItem: {
    type: Object,
    required: true
  },
  tools: Array
};
const DemoComp = defineComponent({
  props: demoProps,
  setup(props) {
    const mergedPrefixCls = `${props.prefixCls}-demo`;
    const mergedTools = computed(() => {
      var _a, _b, _c;
      if (((_b = (_a = props.tools) == null ? void 0 : _a.findIndex((tool) => tool.type === "expandCode")) != null ? _b : -1) > -1) {
        return props.tools;
      }
      return [...(_c = props.tools) != null ? _c : [], {
        type: "expandCode"
      }];
    });
    const selectedSourceTab = ref(0);
    const handleSelectedSourceTabChange = (tab) => {
      selectedSourceTab.value = tab;
    };
    const expanded = ref(false);
    const expandedTitle = computed(() => {
      if (props.lang === "zh") {
        return expanded.value ? "\u6536\u8D77\u4EE3\u7801" : "\u663E\u793A\u4EE3\u7801";
      }
      return expanded.value ? "Hide Code" : "Show Code";
    });
    const copyTitle = computed(() => props.lang === "zh" ? "\u590D\u5236\u4EE3\u7801" : "Copy Code");
    const onExpanded = () => {
      expanded.value = !expanded.value;
    };
    const {
      copy
    } = useClipboard();
    const {
      success
    } = useMessage();
    const onCopy = throttle(async () => {
      var _a, _b;
      const code = (_b = props.resolvedDemoItem) == null ? void 0 : _b.sourceCodes[(_a = selectedSourceTab.value) != null ? _a : 0].code;
      code && copy(decodeURIComponent(code)).then(() => {
        success(props.lang === "zh" ? "\u590D\u5236\u6210\u529F" : "copy succeeded");
      });
    }, 300);
    const renderTool = (tool) => {
      var _a, _b;
      if (tool.type === "expandCode") {
        return createVNode(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": (_a = tool.tooltip) != null ? _a : expandedTitle.value,
          "onClick": onExpanded
        }, {
          default: () => [tool.render ? tool.render(expanded.value) : createVNode(IxIcon, {
            "name": expanded.value ? "unexpand" : "expand"
          }, null)]
        });
      }
      if (tool.type === "copyCode") {
        return createVNode(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": (_b = tool.tooltip) != null ? _b : copyTitle.value,
          "onClick": onCopy
        }, {
          default: () => [tool.render ? tool.render() : createVNode(IxIcon, {
            "name": "copy"
          }, null)]
        });
      }
      if (tool.type === "link") {
        return createVNode(DemoToolComp, {
          "prefixCls": props.prefixCls,
          "tooltip": tool.tooltip,
          "onClick": onCopy
        }, {
          default: () => [createVNode("a", {
            "class": `${mergedPrefixCls}__tool-link`,
            "href": tool.link,
            "target": "_blank",
            "rel": "noopener noreferrer"
          }, [tool.render ? tool.render() : createVNode(IxIcon, {
            "name": "link"
          }, null)])]
        });
      }
    };
    const renderSourceCode = () => {
      var _a;
      const sourceCodes = (_a = props.resolvedDemoItem) == null ? void 0 : _a.sourceCodes;
      if (!expanded.value || !sourceCodes) {
        return;
      }
      const contentCls = `${mergedPrefixCls}__source-code__content`;
      let children;
      if (sourceCodes.length === 1) {
        children = createVNode("div", {
          "class": contentCls,
          "innerHTML": sourceCodes[0].parsedCode
        }, null);
      } else {
        children = createVNode(IxTabs, {
          "selectedKey": selectedSourceTab.value,
          "onUpdate:selectedKey": handleSelectedSourceTabChange
        }, {
          default: () => [sourceCodes.map((sourceCode, idx) => createVNode(IxTab, {
            "key": idx,
            "title": sourceCode.filename
          }, {
            default: () => [createVNode("div", {
              "class": contentCls,
              "innerHTML": sourceCode.parsedCode
            }, null)]
          }))]
        });
      }
      return createVNode("div", {
        "class": `${mergedPrefixCls}__source-code archive-md`
      }, [children]);
    };
    return () => {
      const demoItem = props.resolvedDemoItem;
      return createVNode("div", {
        "class": mergedPrefixCls
      }, [demoItem.title && createVNode("h3", {
        "id": demoItem.id,
        "class": `${mergedPrefixCls}__title`
      }, [createVNode("span", null, [demoItem.title]), createVNode("a", {
        "class": "anchor",
        "href": "#" + demoItem.id
      }, [createTextVNode("#")])]), demoItem.description && createVNode("p", {
        "class": `${mergedPrefixCls}__description`
      }, [demoItem.description]), createVNode("div", {
        "class": `${mergedPrefixCls}__content`
      }, [createVNode("div", {
        "class": `${mergedPrefixCls}__content-inner`
      }, [createVNode("div", {
        "class": `${mergedPrefixCls}__stage`
      }, [createVNode(Instance, {
        "instance": demoItem.instance
      }, null)]), createVNode("div", {
        "class": `${mergedPrefixCls}__tools`
      }, [mergedTools.value.map((tool) => renderTool(tool))])])]), createVNode(Transition, {
        "name": `${mergedPrefixCls}-code-fade-down`
      }, {
        default: () => [renderSourceCode()]
      })]);
    };
  }
});
const DemosContent = defineComponent({
  props: {
    demoImports: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const {
      options: {
        getInitVisibleDemoIds,
        getDemoTools
      },
      renderers: {
        pageContent: pageContentRenderer
      },
      render
    } = inject(pageContextToken);
    const baseContentRef = ref();
    const demosRef = useArrayAsyncProp(props, "demoImports");
    const demoItems = computed(() => {
      var _a, _b;
      return (_b = (_a = demosRef.value) == null ? void 0 : _a.map((demo) => demo.default)) != null ? _b : [];
    });
    const demoIds = computed(() => demoItems.value.map((demoItem) => demoItem.id));
    const _getInitVisibleDemoIds = () => getInitVisibleDemoIds ? getInitVisibleDemoIds(demoItems.value) : demoIds.value;
    const visibleDemoIds = ref(_getInitVisibleDemoIds());
    const setVisibleDemoIds = (demoIds2) => {
      visibleDemoIds.value = demoIds2;
    };
    watch(demoIds, () => {
      visibleDemoIds.value = _getInitVisibleDemoIds();
    }, {
      flush: "post"
    });
    watch(visibleDemoIds, (ids, oldIds) => {
      if (ids.length !== oldIds.length) {
        nextTick(() => {
          baseContentRef.value.updateAnchor();
        });
      }
    });
    return () => {
      return createVNode(BaseContent, {
        "ref": baseContentRef,
        "visible": props.visible
      }, {
        default: () => [render({
          demos: demoItems.value,
          visibleDemoIds: visibleDemoIds.value,
          setVisibleDemoIds
        }, pageContentRenderer, () => demoItems.value.map((demoItem) => withDirectives(createVNode(DemoComp, {
          "resolvedDemoItem": demoItem,
          "tools": getDemoTools == null ? void 0 : getDemoTools(demoItem),
          "prefixCls": "archive-app",
          "lang": "zh"
        }, null), [[vShow, visibleDemoIds.value.includes(demoItem.id)]])))]
      });
    };
  }
});
const PageContent = defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    pageImport: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const dataRef = useAsyncProp(props, "pageImport");
    const {
      render,
      renderers: {
        pageContent: pageContentRenderer
      }
    } = inject(pageContextToken);
    const instanceMounted = ref(false);
    const onInstanceMountedChange = (mounted) => {
      instanceMounted.value = mounted;
    };
    return () => createVNode(BaseContent, {
      "visible": props.visible && instanceMounted.value
    }, {
      default: () => [render({
        demos: [],
        visibleDemoIds: [],
        setVisibleDemoIds: () => {
        }
      }, pageContentRenderer, () => {
        var _a;
        return [createVNode(Instance, {
          "instance": (_a = dataRef.value) == null ? void 0 : _a.default.instance,
          "onInstanceMountedChange": onInstanceMountedChange
        }, null)];
      })]
    });
  }
});
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function usePageRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    var _a;
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: (_a = dataBase.activeRecords) == null ? void 0 : _a.value,
        ...data != null ? data : {}
      },
      defaultNodes
    ) : defaultNodes;
  };
}
const Page = defineComponent({
  props: {
    pageData: {
      type: Object,
      required: true
    },
    theme: {
      type: Object,
      required: true
    },
    options: Object,
    renderers: Object
  },
  setup(props) {
    var _a, _b, _c;
    const wrapperRef = ref();
    const headerRef = ref();
    const headerAffixTarget = ref();
    const headerFixed = ref(false);
    const headerHeight = ref(0);
    const handleAffixChange = (value) => {
      headerFixed.value = value;
    };
    const appContext = inject(appContextToken, null);
    const theme = inject(themeToken);
    const breakpoints = inject(breakpointsToken);
    const render = usePageRender({
      theme,
      breakpoints,
      route: appContext == null ? void 0 : appContext.route,
      activeRecords: appContext == null ? void 0 : appContext.activeRecords
    });
    const anchorOptions = computed(() => ({
      enabled: props.theme.page.enableAnchor,
      maxLevel: props.theme.page.anchorMaxLevel
    }));
    const pageCls = computed(() => {
      const prefixCls = "archive-app__page";
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-xs`]: breakpoints.xs,
        [`${prefixCls}-sm`]: breakpoints.sm,
        [`${prefixCls}-md`]: breakpoints.md,
        [`${prefixCls}-lg`]: breakpoints.lg,
        [`${prefixCls}-xl`]: breakpoints.xl
      });
    });
    onMounted(() => {
      var _a2, _b2;
      if (props.theme.page.headerAffix) {
        headerAffixTarget.value = c(wrapperRef.value);
      }
      headerHeight.value = (_b2 = (_a2 = headerRef.value) == null ? void 0 : _a2.getBoundingClientRect().height) != null ? _b2 : 0;
    });
    provide(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions,
      options: (_a = props.options) != null ? _a : {},
      renderers: (_b = props.renderers) != null ? _b : {},
      render
    });
    const title = computed(() => props.pageData.title);
    const description = computed(() => props.pageData.description);
    const demoImports = computed(() => props.pageData.demoImports);
    const pageImport = computed(() => props.pageData.import);
    const tabs = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = props.pageData.tabs) == null ? void 0 : _a2.filter((tab) => tab.import || tab.demoImports)) != null ? _b2 : [];
    });
    const tabsRadioData = computed(() => tabs.value.map((tab) => ({
      label: tab.name,
      value: tab.id
    })));
    const showTabs = computed(() => {
      var _a2;
      return !((_a2 = demoImports.value) == null ? void 0 : _a2.length) && tabs.value.length > 0;
    });
    const activeTabId = ref((_c = tabs.value[0]) == null ? void 0 : _c.id);
    const setActiveTabId = (tab) => {
      activeTabId.value = tab;
    };
    watch(() => props.pageData, () => {
      var _a2;
      activeTabId.value = (_a2 = tabs.value[0]) == null ? void 0 : _a2.id;
    });
    const headerCls = computed(() => ["archive-app__page__header", headerFixed.value ? "archive-app__page__header--fixed" : void 0]);
    const renderHeader = () => {
      var _a2;
      if (!title.value && !description.value && !tabs.value.length) {
        return;
      }
      const contentNode = createVNode("section", {
        "ref": headerRef,
        "class": headerCls.value
      }, [render({
        title: title.value,
        description: description.value,
        tabs: tabs.value,
        activeTabId: activeTabId.value,
        setActiveTabId
      }, (_a2 = props.renderers) == null ? void 0 : _a2.pageHeader, () => [createVNode("h1", {
        "class": "archive-app__page__title"
      }, [title.value]), createVNode("p", {
        "class": "archive-app__page__description"
      }, [description.value]), showTabs.value && createVNode(IxRadioGroup, {
        "value": activeTabId.value,
        "dataSource": tabsRadioData.value,
        "size": "lg",
        "mode": "primary",
        "gap": 4,
        "buttoned": true,
        "onUpdate:value": setActiveTabId
      }, null)].filter(Boolean))]);
      if (props.theme.page.headerAffix) {
        return createVNode(IxAffix, {
          "class": "archive-app__page__header-affix",
          "target": headerAffixTarget.value,
          "onChange": handleAffixChange
        }, {
          default: () => [contentNode]
        });
      }
      return contentNode;
    };
    const renderContent2 = () => {
      let children;
      if (demoImports.value) {
        children = createVNode(DemosContent, {
          "visible": true,
          "demoImports": demoImports.value
        }, null);
      } else if (pageImport.value) {
        children = createVNode(PageContent, {
          "visible": true,
          "pageImport": pageImport.value
        }, null);
      } else {
        children = tabs.value.map((tab) => {
          const visible = activeTabId.value === tab.id;
          if (tab.demoImports) {
            return withDirectives(createVNode(DemosContent, {
              "visible": visible,
              "demoImports": tab.demoImports
            }, null), [[vShow, visible]]);
          }
          return withDirectives(createVNode(PageContent, {
            "visible": visible,
            "pageImport": tab.import
          }, null), [[vShow, visible]]);
        });
      }
      return createVNode("section", {
        "class": "archive-app__page__content"
      }, [children]);
    };
    return () => createVNode(IxMessageProvider, null, {
      default: () => [createVNode("article", {
        "ref": wrapperRef,
        "class": pageCls.value
      }, [renderHeader(), renderContent2()])]
    });
  }
});
export {
  Page as default
};
