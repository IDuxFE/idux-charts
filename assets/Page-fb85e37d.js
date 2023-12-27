import { W as WeakMap$1, d as defineComponent, r as ref, o as onMounted, w as watch, a as onUnmounted, h, c as createVNode, b as createTextVNode, I as IxIcon, e as computed, T as Transition, f as withDirectives, v as vShow, g as baseCreate$1, i as isObjectLike, j as isArray$1, k as isObject, l as debounce, n as nextTick, m as inject, t as throwError, u as useGlobalConfig$1, p as useControlledProp, q as useState, s as normalizeClass, x as addClass, y as removeClass, z as provide, A as isNil, B as mergeProps, C as copyArray, ɵ as ɵOverlay, D as convertElement, E as useKey, F as watchEffect, G as callEmit, H as IxInput, J as overlayDelayDef, K as overlayPlacementDef, L as overlayTriggerDef, M as onDeactivated, N as usePortalTarget, O as convertCssPixel, P as CdkPortal, Q as TransitionGroup, R as Fragment, S as setToString$1, U as isString, V as onBeforeUnmount, X as useAccessorAndControl, Y as useFormItemRegister, Z as IxSpace, _ as Logger, $ as flattenNode, a0 as useInput, a1 as useFormFocusMonitor, a2 as ɵInput, a3 as rAF, a4 as useFormSize, a5 as useFormStatus, a6 as toNumber, a7 as arrayEach, a8 as uniqueId, a9 as convertArray, aa as useFormElement, ab as FORM_TOKEN, ac as convertStringVNode, ad as ɵWave, ae as tryOnScopeDispose, af as inputCommonProps, ag as easeInOutCubic, ah as isFunction, ai as identity, aj as shortOut, ak as isIndex, al as root$1, am as apply, an as baseGetTag, ao as customRef, ap as isNumber, aq as toRaw, ar as hasSlot, as as toString, at as normalizeStyle, au as cancelRAF, av as m$1, aw as pageContextToken, ax as u, ay as off, az as convertTarget, aA as on$1, aB as appContextToken, aC as themeToken, aD as breakpointsToken, aE as getOffset, aF as convertNumber, aG as throttleRAF, aH as isHTMLElement } from "./app-default-cf8eaf7c.js";
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
    var fn2 = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return fn2.apply(isBind ? thisArg : this, arguments);
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
    var thisBinding = isBind ? thisArg : this, fn2 = isBindKey ? thisBinding[func] : func;
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
      fn2 = Ctor || createCtor(fn2);
    }
    return fn2.apply(thisBinding, args);
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
    var fn2 = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    return apply(fn2, this, args);
  }
  return wrapper;
}
var WRAP_BIND_FLAG$2 = 1;
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$2, Ctor = createCtor(func);
  function wrapper() {
    var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn2 = this && this !== root$1 && this instanceof wrapper ? Ctor : func;
    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn2, isBind ? thisArg : this, args);
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
var boolTag = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
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
    var _a2;
    return (_a2 = overlayRef.value) == null ? void 0 : _a2.updatePopper();
  };
  const [visible, setVisible] = useControlledProp(props, "visible", false);
  onDeactivated(() => {
    if (visible.value && props.closeOnDeactivated) {
      setVisible(false);
    }
  });
  const overlayProps = computed(() => {
    var _a2, _b, _c, _d, _e2, _f, _g;
    const trigger = (_a2 = props.trigger) != null ? _a2 : config.trigger;
    return {
      visible: visible.value,
      ["onUpdate:visible"]: setVisible,
      autoAdjust: (_b = props.autoAdjust) != null ? _b : config.autoAdjust,
      clickOutside: trigger === "click" || trigger === "contextmenu",
      container: (_c = props.overlayContainer) != null ? _c : config.overlayContainer,
      containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
      delay: (_d = props.delay) != null ? _d : config.delay,
      destroyOnHide: (_e2 = props.destroyOnHide) != null ? _e2 : config.destroyOnHide,
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
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("tooltip");
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
      return createVNode(ɵOverlay, mergeProps({
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
var Me = typeof global == "object" && global && global.Object === Object && global;
const Zt = Me;
var Fe = typeof self == "object" && self && self.Object === Object && self, De = Zt || Fe || Function("return this")();
const m = De;
var Ne = m.Symbol;
const $ = Ne;
var Jt = Object.prototype, Le = Jt.hasOwnProperty, Ue = Jt.toString, B = $ ? $.toStringTag : void 0;
function Be(t) {
  var e = Le.call(t, B), n = t[B];
  try {
    t[B] = void 0;
    var r = true;
  } catch {
  }
  var a = Ue.call(t);
  return r && (e ? t[B] = n : delete t[B]), a;
}
var Re = Object.prototype, Ge = Re.toString;
function ze(t) {
  return Ge.call(t);
}
var Ke = "[object Null]", He = "[object Undefined]", vt = $ ? $.toStringTag : void 0;
function E(t) {
  return t == null ? t === void 0 ? He : Ke : vt && vt in Object(t) ? Be(t) : ze(t);
}
function M(t) {
  return t != null && typeof t == "object";
}
var We = "[object Symbol]";
function X(t) {
  return typeof t == "symbol" || M(t) && E(t) == We;
}
function Qt(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, a = Array(r); ++n < r; )
    a[n] = e(t[n], n, t);
  return a;
}
var Ve = Array.isArray;
const I = Ve;
var Xe = 1 / 0, mt = $ ? $.prototype : void 0, Tt = mt ? mt.toString : void 0;
function kt(t) {
  if (typeof t == "string")
    return t;
  if (I(t))
    return Qt(t, kt) + "";
  if (X(t))
    return Tt ? Tt.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Xe ? "-0" : e;
}
function S(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function nn(t) {
  return t;
}
var rn = "[object AsyncFunction]", an = "[object Function]", on = "[object GeneratorFunction]", sn = "[object Proxy]";
function W(t) {
  if (!S(t))
    return false;
  var e = E(t);
  return e == an || e == on || e == rn || e == sn;
}
var cn = m["__core-js_shared__"];
const J = cn;
var jt = function() {
  var t = /[^.]+$/.exec(J && J.keys && J.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function un(t) {
  return !!jt && jt in t;
}
var fn = Function.prototype, ln = fn.toString;
function F(t) {
  if (t != null) {
    try {
      return ln.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var pn = /[\\^$.*+?()[\]{}|]/g, dn = /^\[object .+?Constructor\]$/, gn = Function.prototype, hn = Object.prototype, bn = gn.toString, yn = hn.hasOwnProperty, vn = RegExp(
  "^" + bn.call(yn).replace(pn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function mn(t) {
  if (!S(t) || un(t))
    return false;
  var e = W(t) ? vn : dn;
  return e.test(F(t));
}
function Tn(t, e) {
  return t == null ? void 0 : t[e];
}
function D(t, e) {
  var n = Tn(t, e);
  return mn(n) ? n : void 0;
}
var $n = D(m, "WeakMap");
const et = $n;
var wt = Object.create, _n = function() {
  function t() {
  }
  return function(e) {
    if (!S(e))
      return {};
    if (wt)
      return wt(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}();
const jn = _n;
function wn(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function On(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var An = 800, Sn = 16, In = Date.now;
function Pn(t) {
  var e = 0, n = 0;
  return function() {
    var r = In(), a = Sn - (r - n);
    if (n = r, a > 0) {
      if (++e >= An)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Cn(t) {
  return function() {
    return t;
  };
}
var xn = function() {
  try {
    var t = D(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const V = xn;
var En = V ? function(t, e) {
  return V(t, "toString", {
    configurable: true,
    enumerable: false,
    value: Cn(e),
    writable: true
  });
} : nn;
const Mn = En;
var Fn = Pn(Mn);
const Dn = Fn;
function Nn(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== false; )
    ;
  return t;
}
var Ln = 9007199254740991, Un = /^(?:0|[1-9]\d*)$/;
function Bn(t, e) {
  var n = typeof t;
  return e = e != null ? e : Ln, !!e && (n == "number" || n != "symbol" && Un.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function te(t, e, n) {
  e == "__proto__" && V ? V(t, e, {
    configurable: true,
    enumerable: true,
    value: n,
    writable: true
  }) : t[e] = n;
}
function ee(t, e) {
  return t === e || t !== t && e !== e;
}
var Rn = Object.prototype, Gn = Rn.hasOwnProperty;
function ne(t, e, n) {
  var r = t[e];
  (!(Gn.call(t, e) && ee(r, n)) || n === void 0 && !(e in t)) && te(t, e, n);
}
function K(t, e, n, r) {
  var a = !n;
  n || (n = {});
  for (var o = -1, i = e.length; ++o < i; ) {
    var s = e[o], c = r ? r(n[s], t[s], s, n, t) : void 0;
    c === void 0 && (c = t[s]), a ? te(n, s, c) : ne(n, s, c);
  }
  return n;
}
var Ot = Math.max;
function zn(t, e, n) {
  return e = Ot(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, a = -1, o = Ot(r.length - e, 0), i = Array(o); ++a < o; )
      i[a] = r[e + a];
    a = -1;
    for (var s = Array(e + 1); ++a < e; )
      s[a] = r[a];
    return s[e] = n(i), wn(t, this, s);
  };
}
var Kn = 9007199254740991;
function re(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Kn;
}
function ae(t) {
  return t != null && re(t.length) && !W(t);
}
var Hn = Object.prototype;
function ot(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || Hn;
  return t === n;
}
function Wn(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var Vn = "[object Arguments]";
function At(t) {
  return M(t) && E(t) == Vn;
}
var oe = Object.prototype, Xn = oe.hasOwnProperty, Yn = oe.propertyIsEnumerable, qn = At(function() {
  return arguments;
}()) ? At : function(t) {
  return M(t) && Xn.call(t, "callee") && !Yn.call(t, "callee");
};
const ie = qn;
function Zn() {
  return false;
}
var se = typeof exports == "object" && exports && !exports.nodeType && exports, St = se && typeof module == "object" && module && !module.nodeType && module, Jn = St && St.exports === se, It = Jn ? m.Buffer : void 0, Qn = It ? It.isBuffer : void 0, kn = Qn || Zn;
const ce = kn;
var tr = "[object Arguments]", er = "[object Array]", nr = "[object Boolean]", rr = "[object Date]", ar = "[object Error]", or = "[object Function]", ir = "[object Map]", sr = "[object Number]", cr = "[object Object]", ur = "[object RegExp]", fr = "[object Set]", lr = "[object String]", pr = "[object WeakMap]", dr = "[object ArrayBuffer]", gr = "[object DataView]", hr = "[object Float32Array]", br = "[object Float64Array]", yr = "[object Int8Array]", vr = "[object Int16Array]", mr = "[object Int32Array]", Tr = "[object Uint8Array]", $r = "[object Uint8ClampedArray]", _r = "[object Uint16Array]", jr = "[object Uint32Array]", l = {};
l[hr] = l[br] = l[yr] = l[vr] = l[mr] = l[Tr] = l[$r] = l[_r] = l[jr] = true;
l[tr] = l[er] = l[dr] = l[nr] = l[gr] = l[rr] = l[ar] = l[or] = l[ir] = l[sr] = l[cr] = l[ur] = l[fr] = l[lr] = l[pr] = false;
function wr(t) {
  return M(t) && re(t.length) && !!l[E(t)];
}
function it(t) {
  return function(e) {
    return t(e);
  };
}
var ue = typeof exports == "object" && exports && !exports.nodeType && exports, R = ue && typeof module == "object" && module && !module.nodeType && module, Or = R && R.exports === ue, Q = Or && Zt.process, Ar = function() {
  try {
    var t = R && R.require && R.require("util").types;
    return t || Q && Q.binding && Q.binding("util");
  } catch {
  }
}();
const N = Ar;
var Pt = N && N.isTypedArray, Sr = Pt ? it(Pt) : wr;
const Ir = Sr;
var Pr = Object.prototype, Cr = Pr.hasOwnProperty;
function fe(t, e) {
  var n = I(t), r = !n && ie(t), a = !n && !r && ce(t), o = !n && !r && !a && Ir(t), i = n || r || a || o, s = i ? Wn(t.length, String) : [], c = s.length;
  for (var u2 in t)
    (e || Cr.call(t, u2)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (u2 == "offset" || u2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u2 == "buffer" || u2 == "byteLength" || u2 == "byteOffset") || // Skip index properties.
    Bn(u2, c))) && s.push(u2);
  return s;
}
function le(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var xr = le(Object.keys, Object);
const Er = xr;
var Mr = Object.prototype, Fr = Mr.hasOwnProperty;
function Dr(t) {
  if (!ot(t))
    return Er(t);
  var e = [];
  for (var n in Object(t))
    Fr.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function st(t) {
  return ae(t) ? fe(t) : Dr(t);
}
function Nr(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var Lr = Object.prototype, Ur = Lr.hasOwnProperty;
function Br(t) {
  if (!S(t))
    return Nr(t);
  var e = ot(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Ur.call(t, r)) || n.push(r);
  return n;
}
function ct(t) {
  return ae(t) ? fe(t, true) : Br(t);
}
var Rr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Gr = /^\w*$/;
function zr(t, e) {
  if (I(t))
    return false;
  var n = typeof t;
  return n == "number" || n == "symbol" || n == "boolean" || t == null || X(t) ? true : Gr.test(t) || !Rr.test(t) || e != null && t in Object(e);
}
var Kr = D(Object, "create");
const G = Kr;
function Hr() {
  this.__data__ = G ? G(null) : {}, this.size = 0;
}
function Wr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Vr = "__lodash_hash_undefined__", Xr = Object.prototype, Yr = Xr.hasOwnProperty;
function qr(t) {
  var e = this.__data__;
  if (G) {
    var n = e[t];
    return n === Vr ? void 0 : n;
  }
  return Yr.call(e, t) ? e[t] : void 0;
}
var Zr = Object.prototype, Jr = Zr.hasOwnProperty;
function Qr(t) {
  var e = this.__data__;
  return G ? e[t] !== void 0 : Jr.call(e, t);
}
var kr = "__lodash_hash_undefined__";
function ta(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = G && e === void 0 ? kr : e, this;
}
function x(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
x.prototype.clear = Hr;
x.prototype.delete = Wr;
x.prototype.get = qr;
x.prototype.has = Qr;
x.prototype.set = ta;
function ea() {
  this.__data__ = [], this.size = 0;
}
function Y(t, e) {
  for (var n = t.length; n--; )
    if (ee(t[n][0], e))
      return n;
  return -1;
}
var na = Array.prototype, ra = na.splice;
function aa(t) {
  var e = this.__data__, n = Y(e, t);
  if (n < 0)
    return false;
  var r = e.length - 1;
  return n == r ? e.pop() : ra.call(e, n, 1), --this.size, true;
}
function oa(t) {
  var e = this.__data__, n = Y(e, t);
  return n < 0 ? void 0 : e[n][1];
}
function ia(t) {
  return Y(this.__data__, t) > -1;
}
function sa(t, e) {
  var n = this.__data__, r = Y(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
function j(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
j.prototype.clear = ea;
j.prototype.delete = aa;
j.prototype.get = oa;
j.prototype.has = ia;
j.prototype.set = sa;
var ca = D(m, "Map");
const z = ca;
function ua() {
  this.size = 0, this.__data__ = {
    hash: new x(),
    map: new (z || j)(),
    string: new x()
  };
}
function fa(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function q(t, e) {
  var n = t.__data__;
  return fa(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
function la(t) {
  var e = q(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function pa(t) {
  return q(this, t).get(t);
}
function da(t) {
  return q(this, t).has(t);
}
function ga(t, e) {
  var n = q(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
function P(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
P.prototype.clear = ua;
P.prototype.delete = la;
P.prototype.get = pa;
P.prototype.has = da;
P.prototype.set = ga;
var ha = "Expected a function";
function ut(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(ha);
  var n = function() {
    var r = arguments, a = e ? e.apply(this, r) : r[0], o = n.cache;
    if (o.has(a))
      return o.get(a);
    var i = t.apply(this, r);
    return n.cache = o.set(a, i) || o, i;
  };
  return n.cache = new (ut.Cache || P)(), n;
}
ut.Cache = P;
var ba = 500;
function ya(t) {
  var e = ut(t, function(r) {
    return n.size === ba && n.clear(), r;
  }), n = e.cache;
  return e;
}
var va = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ma = /\\(\\)?/g, Ta = ya(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(va, function(n, r, a, o) {
    e.push(a ? o.replace(ma, "$1") : r || n);
  }), e;
});
const $a = Ta;
function _a(t) {
  return t == null ? "" : kt(t);
}
function ft(t, e) {
  return I(t) ? t : zr(t, e) ? [t] : $a(_a(t));
}
var ja = 1 / 0;
function pe(t) {
  if (typeof t == "string" || X(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -ja ? "-0" : e;
}
function wa(t, e) {
  e = ft(e, t);
  for (var n = 0, r = e.length; t != null && n < r; )
    t = t[pe(e[n++])];
  return n && n == r ? t : void 0;
}
function lt(t, e) {
  for (var n = -1, r = e.length, a = t.length; ++n < r; )
    t[a + n] = e[n];
  return t;
}
var Ct = $ ? $.isConcatSpreadable : void 0;
function Oa(t) {
  return I(t) || ie(t) || !!(Ct && t && t[Ct]);
}
function de(t, e, n, r, a) {
  var o = -1, i = t.length;
  for (n || (n = Oa), a || (a = []); ++o < i; ) {
    var s = t[o];
    e > 0 && n(s) ? e > 1 ? de(s, e - 1, n, r, a) : lt(a, s) : r || (a[a.length] = s);
  }
  return a;
}
function Aa(t) {
  var e = t == null ? 0 : t.length;
  return e ? de(t, 1) : [];
}
function Sa(t) {
  return Dn(zn(t, void 0, Aa), t + "");
}
var Ia = le(Object.getPrototypeOf, Object);
const pt = Ia;
var Pa = "[object Object]", Ca = Function.prototype, xa = Object.prototype, ge = Ca.toString, Ea = xa.hasOwnProperty, Ma = ge.call(Object);
function he(t) {
  if (!M(t) || E(t) != Pa)
    return false;
  var e = pt(t);
  if (e === null)
    return true;
  var n = Ea.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && ge.call(n) == Ma;
}
function Fa(t, e, n) {
  var r = -1, a = t.length;
  e < 0 && (e = -e > a ? 0 : a + e), n = n > a ? a : n, n < 0 && (n += a), a = e > n ? 0 : n - e >>> 0, e >>>= 0;
  for (var o = Array(a); ++r < a; )
    o[r] = t[r + e];
  return o;
}
function Da() {
  this.__data__ = new j(), this.size = 0;
}
function Na(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
function La(t) {
  return this.__data__.get(t);
}
function Ua(t) {
  return this.__data__.has(t);
}
var Ba = 200;
function Ra(t, e) {
  var n = this.__data__;
  if (n instanceof j) {
    var r = n.__data__;
    if (!z || r.length < Ba - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new P(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
function L(t) {
  var e = this.__data__ = new j(t);
  this.size = e.size;
}
L.prototype.clear = Da;
L.prototype.delete = Na;
L.prototype.get = La;
L.prototype.has = Ua;
L.prototype.set = Ra;
function Ga(t, e) {
  return t && K(e, st(e), t);
}
function za(t, e) {
  return t && K(e, ct(e), t);
}
var be = typeof exports == "object" && exports && !exports.nodeType && exports, xt = be && typeof module == "object" && module && !module.nodeType && module, Ka = xt && xt.exports === be, Et = Ka ? m.Buffer : void 0, Mt = Et ? Et.allocUnsafe : void 0;
function Ha(t, e) {
  if (e)
    return t.slice();
  var n = t.length, r = Mt ? Mt(n) : new t.constructor(n);
  return t.copy(r), r;
}
function Wa(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, a = 0, o = []; ++n < r; ) {
    var i = t[n];
    e(i, n, t) && (o[a++] = i);
  }
  return o;
}
function ye() {
  return [];
}
var Va = Object.prototype, Xa = Va.propertyIsEnumerable, Ft = Object.getOwnPropertySymbols, Ya = Ft ? function(t) {
  return t == null ? [] : (t = Object(t), Wa(Ft(t), function(e) {
    return Xa.call(t, e);
  }));
} : ye;
const dt = Ya;
function qa(t, e) {
  return K(t, dt(t), e);
}
var Za = Object.getOwnPropertySymbols, Ja = Za ? function(t) {
  for (var e = []; t; )
    lt(e, dt(t)), t = pt(t);
  return e;
} : ye;
const ve = Ja;
function Qa(t, e) {
  return K(t, ve(t), e);
}
function me(t, e, n) {
  var r = e(t);
  return I(t) ? r : lt(r, n(t));
}
function ka(t) {
  return me(t, st, dt);
}
function Te(t) {
  return me(t, ct, ve);
}
var to = D(m, "DataView");
const nt = to;
var eo = D(m, "Promise");
const rt = eo;
var no = D(m, "Set");
const at = no;
var Dt = "[object Map]", ro = "[object Object]", Nt = "[object Promise]", Lt = "[object Set]", Ut = "[object WeakMap]", Bt = "[object DataView]", ao = F(nt), oo = F(z), io = F(rt), so = F(at), co = F(et), C = E;
(nt && C(new nt(new ArrayBuffer(1))) != Bt || z && C(new z()) != Dt || rt && C(rt.resolve()) != Nt || at && C(new at()) != Lt || et && C(new et()) != Ut) && (C = function(t) {
  var e = E(t), n = e == ro ? t.constructor : void 0, r = n ? F(n) : "";
  if (r)
    switch (r) {
      case ao:
        return Bt;
      case oo:
        return Dt;
      case io:
        return Nt;
      case so:
        return Lt;
      case co:
        return Ut;
    }
  return e;
});
const gt = C;
var uo = Object.prototype, fo = uo.hasOwnProperty;
function lo(t) {
  var e = t.length, n = new t.constructor(e);
  return e && typeof t[0] == "string" && fo.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var po = m.Uint8Array;
const Rt = po;
function ht(t) {
  var e = new t.constructor(t.byteLength);
  return new Rt(e).set(new Rt(t)), e;
}
function go(t, e) {
  var n = e ? ht(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.byteLength);
}
var ho = /\w*$/;
function bo(t) {
  var e = new t.constructor(t.source, ho.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var Gt = $ ? $.prototype : void 0, zt = Gt ? Gt.valueOf : void 0;
function yo(t) {
  return zt ? Object(zt.call(t)) : {};
}
function vo(t, e) {
  var n = e ? ht(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var mo = "[object Boolean]", To = "[object Date]", $o = "[object Map]", _o = "[object Number]", jo = "[object RegExp]", wo = "[object Set]", Oo = "[object String]", Ao = "[object Symbol]", So = "[object ArrayBuffer]", Io = "[object DataView]", Po = "[object Float32Array]", Co = "[object Float64Array]", xo = "[object Int8Array]", Eo = "[object Int16Array]", Mo = "[object Int32Array]", Fo = "[object Uint8Array]", Do = "[object Uint8ClampedArray]", No = "[object Uint16Array]", Lo = "[object Uint32Array]";
function Uo(t, e, n) {
  var r = t.constructor;
  switch (e) {
    case So:
      return ht(t);
    case mo:
    case To:
      return new r(+t);
    case Io:
      return go(t, n);
    case Po:
    case Co:
    case xo:
    case Eo:
    case Mo:
    case Fo:
    case Do:
    case No:
    case Lo:
      return vo(t, n);
    case $o:
      return new r();
    case _o:
    case Oo:
      return new r(t);
    case jo:
      return bo(t);
    case wo:
      return new r();
    case Ao:
      return yo(t);
  }
}
function Bo(t) {
  return typeof t.constructor == "function" && !ot(t) ? jn(pt(t)) : {};
}
var Ro = "[object Map]";
function Go(t) {
  return M(t) && gt(t) == Ro;
}
var Kt = N && N.isMap, zo = Kt ? it(Kt) : Go;
const Ko = zo;
var Ho = "[object Set]";
function Wo(t) {
  return M(t) && gt(t) == Ho;
}
var Ht = N && N.isSet, Vo = Ht ? it(Ht) : Wo;
const Xo = Vo;
var Yo = 1, qo = 2, Zo = 4, $e = "[object Arguments]", Jo = "[object Array]", Qo = "[object Boolean]", ko = "[object Date]", ti = "[object Error]", _e = "[object Function]", ei = "[object GeneratorFunction]", ni = "[object Map]", ri = "[object Number]", je = "[object Object]", ai = "[object RegExp]", oi = "[object Set]", ii = "[object String]", si = "[object Symbol]", ci = "[object WeakMap]", ui = "[object ArrayBuffer]", fi = "[object DataView]", li = "[object Float32Array]", pi = "[object Float64Array]", di = "[object Int8Array]", gi = "[object Int16Array]", hi = "[object Int32Array]", bi = "[object Uint8Array]", yi = "[object Uint8ClampedArray]", vi = "[object Uint16Array]", mi = "[object Uint32Array]", f = {};
f[$e] = f[Jo] = f[ui] = f[fi] = f[Qo] = f[ko] = f[li] = f[pi] = f[di] = f[gi] = f[hi] = f[ni] = f[ri] = f[je] = f[ai] = f[oi] = f[ii] = f[si] = f[bi] = f[yi] = f[vi] = f[mi] = true;
f[ti] = f[_e] = f[ci] = false;
function H(t, e, n, r, a, o) {
  var i, s = e & Yo, c = e & qo, u2 = e & Zo;
  if (n && (i = a ? n(t, r, a, o) : n(t)), i !== void 0)
    return i;
  if (!S(t))
    return t;
  var v = I(t);
  if (v) {
    if (i = lo(t), !s)
      return On(t, i);
  } else {
    var g = gt(t), w = g == _e || g == ei;
    if (ce(t))
      return Ha(t, s);
    if (g == je || g == $e || w && !a) {
      if (i = c || w ? {} : Bo(t), !s)
        return c ? Qa(t, za(i, t)) : qa(t, Ga(i, t));
    } else {
      if (!f[g])
        return a ? t : {};
      i = Uo(t, g, s);
    }
  }
  o || (o = new L());
  var _ = o.get(t);
  if (_)
    return _;
  o.set(t, i), Xo(t) ? t.forEach(function(h2) {
    i.add(H(h2, e, n, h2, t, o));
  }) : Ko(t) && t.forEach(function(h2, d) {
    i.set(d, H(h2, e, n, d, t, o));
  });
  var p = u2 ? c ? Te : ka : c ? ct : st, y = v ? void 0 : p(t);
  return Nn(y || t, function(h2, d) {
    y && (d = h2, h2 = t[d]), ne(i, d, H(h2, e, n, d, t, o));
  }), i;
}
function Oi(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
function Ai(t, e) {
  return e.length < 2 ? t : wa(t, Fa(e, 0, -1));
}
function Ii(t, e) {
  return e = ft(e, t), t = Ai(t, e), t == null || delete t[pe(Oi(e))];
}
function Pi(t) {
  return he(t) ? void 0 : t;
}
var Ci = 1, xi = 2, Ei = 4;
Sa(function(t, e) {
  var n = {};
  if (t == null)
    return n;
  var r = false;
  e = Qt(e, function(o) {
    return o = ft(o, t), r || (r = o.length > 1), o;
  }), K(t, Te(t), n), r && (n = H(n, Ci | xi | Ei, Pi));
  for (var a = e.length; a--; )
    Ii(n, e[a]);
  return n;
});
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const we = {
  instance: Object,
  onInstanceMountedChange: Function
};
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const Oe = defineComponent({
  name: "ArchiveInstance",
  props: we,
  setup(t) {
    const e = ref();
    return onMounted(() => {
      watch(
        () => t.instance,
        async (n, r) => {
          var _a2, _b;
          for ((_a2 = t.onInstanceMountedChange) == null ? void 0 : _a2.call(t, false), await (r == null ? void 0 : r.unmount()); !e.value; )
            await nextTick();
          const a = new MutationObserver((o) => {
            var _a3, _b2;
            o.findIndex((i) => i.type === "childList") > -1 && ((_a3 = e.value) == null ? void 0 : _a3.children.length) && ((_b2 = t.onInstanceMountedChange) == null ? void 0 : _b2.call(t, true), a.disconnect());
          });
          a.observe(e.value, {
            childList: true,
            subtree: false,
            attributes: false
          }), await ((_b = n == null ? void 0 : n.mount) == null ? void 0 : _b.call(n, e.value));
        },
        {
          immediate: true
        }
      );
    }), onUnmounted(() => {
      var _a2;
      (_a2 = t.instance) == null ? void 0 : _a2.unmount();
    }), () => h("div", { ref: e });
  }
});
const Bi = Oe;
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
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message`);
    const config = useGlobalConfig$1("message");
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
      var _a2;
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
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])])]), [[vShow, visible.value]]);
    };
  }
});
const useEvents = (props, config) => {
  const duration = computed(() => {
    var _a2;
    return (_a2 = props.duration) != null ? _a2 : config.duration;
  });
  const destroyOnHover = computed(() => {
    var _a2;
    return (_a2 = props.destroyOnHover) != null ? _a2 : config.destroyOnHover;
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
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("message");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-message`);
    const mergedPortalTarget = usePortalTarget(props, config, common, mergedPrefixCls);
    const style = computed(() => {
      var _a2;
      return {
        top: convertCssPixel((_a2 = props.top) != null ? _a2 : config.top)
      };
    });
    const maxCount = computed(() => {
      var _a2;
      return (_a2 = props.maxCount) != null ? _a2 : config.maxCount;
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
      var _a2;
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
      return createVNode(Fragment, null, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots), createVNode(CdkPortal, {
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
    var _a2;
    const currIndex = item.key ? getCurrIndex(item.key) : -1;
    if (currIndex !== -1) {
      messages.value.splice(currIndex, 1, item);
      return item.key;
    }
    if (messages.value.length >= maxCount.value) {
      messages.value = messages.value.slice(-maxCount.value + 1);
    }
    const key = (_a2 = item.key) != null ? _a2 : uniqueId("ix-message");
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
const buttonSizeMap$1 = {
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
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-radio`);
    const config = useGlobalConfig$1("radio");
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
      var _a2;
      return (_a2 = attrs.name) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.name;
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
      var _a2;
      return (_a2 = props.buttoned) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.buttoned;
    });
    const size = computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = props.size) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
    });
    const mergedWaveless = computed(() => {
      var _a2;
      return (_a2 = props.waveless) != null ? _a2 : config.waveless;
    });
    const mode = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = props.mode) != null ? _a2 : radioGroup == null ? void 0 : radioGroup.props.mode) != null ? _b : "default";
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
        [`${commonPrefixCls}-button-${buttonSizeMap$1[size.value]}`]: buttoned
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
      }, [!mergedWaveless.value && createVNode(ɵWave, {
        "ref": waveRef
      }, null)])]), isButtoned.value && !mergedWaveless.value && createVNode(ɵWave, {
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
      var _a2;
      if (elementRef.value) {
        const checked = evt.target.checked;
        const value = mergedValue.value;
        const oldValue = accessor.value;
        accessor.setValue(value);
        elementRef.value.checked = false;
        callEmit(props.onChange, checked, !checked);
        callEmit(groupProps.onChange, value, oldValue);
        !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
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
      var _a2;
      if (elementRef.value) {
        const checked = evt.target.checked;
        accessor.setValue(checked);
        elementRef.value.checked = false;
        callEmit(props.onChange, checked, !checked);
        !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
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
    const common = useGlobalConfig$1("common");
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
      var _a2;
      return (_a2 = props.gap) != null ? _a2 : props.buttoned ? 0 : 8;
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
const resizeMap = /* @__PURE__ */ new Map();
function onResize(el, listener, options) {
  if (!el || !listener) {
    return;
  }
  if (resizeMap.has(el)) {
    resizeMap.get(el).listeners.push(listener);
  } else {
    const listeners = [listener];
    const ro2 = new ResizeObserver((entries) => {
      entries.forEach((entry) => listeners.forEach((fn2) => fn2(entry)));
    });
    ro2.observe(el, options);
    resizeMap.set(el, { listeners, ro: ro2 });
  }
}
function offResize(el, listener) {
  if (!el || !listener || !resizeMap.has(el)) {
    return;
  }
  const { listeners, ro: ro2 } = resizeMap.get(el);
  const listenerIndex = listeners.indexOf(listener);
  if (listenerIndex > -1) {
    listeners.splice(listenerIndex, 1);
    if (listeners.length === 0) {
      ro2.disconnect();
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
      var _a2;
      return createVNode("div", {
        "class": `${mergedPrefixCls.value}-pane`
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]);
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
      var _a2;
      return ((_a2 = selectedKey.value) != null ? _a2 : props.defaultSelectedKey) === key;
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
      var _a2, _b;
      const tab = createVNode("span", {
        "class": `${prefixCls.value}-tab-label`
      }, [createTextVNode(" "), (_b = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _b : props.title]);
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
    var _a2, _b, _c, _d;
    setSelectedLeft((_b = (_a2 = selectedElRef.value) == null ? void 0 : _a2.offsetLeft) != null ? _b : 0);
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
    var _a2, _b, _c, _d, _e2, _f, _g, _h;
    setNavWrapperWidth((_b = (_a2 = navWrapperElRef.value) == null ? void 0 : _a2.offsetWidth) != null ? _b : 0);
    setNavWrapperHeight((_d = (_c = navWrapperElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
    setNavWidth((_f = (_e2 = navElRef.value) == null ? void 0 : _e2.offsetWidth) != null ? _f : 0);
    setNavHeight((_h = (_g = navElRef.value) == null ? void 0 : _g.offsetHeight) != null ? _h : 0);
  };
  const setSelectedElSize = () => {
    var _a2, _b, _c, _d;
    setSelectedWidth((_b = (_a2 = selectedElRef.value) == null ? void 0 : _a2.offsetWidth) != null ? _b : 0);
    setSelectedHeight((_d = (_c = selectedElRef.value) == null ? void 0 : _c.offsetHeight) != null ? _d : 0);
  };
  const setNavPreNextElSize = () => {
    var _a2, _b, _c, _d;
    setNavPreNextWidth((_b = (_a2 = navPreElRef.value) == null ? void 0 : _a2.$el.offsetWidth) != null ? _b : 0);
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
    var _a2;
    const {
      key
    } = vNode;
    const {
      forceRender,
      disabled
    } = vNode.props;
    const _disabled = !isNil(disabled);
    const useVShow = forceRender != null ? forceRender : props.forceRender;
    const show = ((_a2 = selectedKey.value) != null ? _a2 : defaultSelectedKey) === key && !_disabled;
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
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tabs`);
    const config = useGlobalConfig$1("tabs");
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
      var _a2;
      return (_a2 = props.size) != null ? _a2 : config.size;
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
      var _a2;
      if (isLineType.value && navBarElRef.value) {
        const isBarDisabled = (_a2 = selectedElRef.value) == null ? void 0 : _a2.classList.contains(`${mergedPrefixCls.value}-nav-tab-disabled`);
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
      var _a2;
      const hasSelectedKey = (_a2 = props.tabs) == null ? void 0 : _a2.find((item) => {
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
      var _a2, _b;
      let defaultSelectedKey = 1;
      const tabVNodes = (_b = (_a2 = props.tabs) == null ? void 0 : _a2.map((item, index) => {
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
          var _a22;
          return createVNode(TabNav, mergeProps(vnode.props, {
            "key": vnode.key,
            "defaultSelectedKey": defaultSelectedKey
          }), {
            title: (_a22 = vnode.children) == null ? void 0 : _a22.title
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
      var _a2;
      const tabVNodes = flattenNode((_a2 = slots.default) == null ? void 0 : _a2.call(slots), {
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
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function defineCtrComponent(options) {
  const { setup } = options;
  return defineComponent({
    props: {
      instance: { type: Object, required: true },
      control: { type: Object, required: true }
    },
    setup(props) {
      var _a2;
      const control = computed(() => props.control);
      const [controlValue, setControlValue] = useState((_a2 = props.instance.getData()) == null ? void 0 : _a2[props.control.key]);
      const setInstanceData = debounce((value) => {
        props.instance.setData({ [props.control.key]: value != null ? value : void 0 });
      }, 50);
      const setData2 = (value) => {
        setControlValue(!isNil(value) ? value : void 0);
        setInstanceData(!isNil(value) ? value : void 0);
      };
      props.instance.watchData(props.control.key, (value) => {
        if (value !== controlValue) {
          setControlValue(value);
        }
      });
      return setup({
        control,
        controlValue,
        setControlValue: setData2
      });
    }
  });
}
const BoolCtrl = defineCtrComponent({
  setup({
    controlValue,
    setControlValue
  }) {
    const radioValue = computed(() => controlValue.value ? "true" : "false");
    const booleanRadio = [{
      key: "true",
      label: "true"
    }, {
      key: "false",
      label: "false"
    }];
    const handleChange = (value) => {
      setControlValue(value === "true" ? true : false);
    };
    return () => createVNode("div", {
      "class": "archive-app-demo__control-boolean"
    }, [createVNode(IxRadioGroup, {
      "value": radioValue.value,
      "dataSource": booleanRadio,
      "onChange": handleChange
    }, null)]);
  }
});
const checkboxGroupToken = Symbol("checkboxGroupToken");
const checkboxProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  checked: { type: [String, Number, Boolean], default: void 0 },
  autofocus: { type: Boolean, default: false },
  buttoned: { type: Boolean, default: void 0 },
  disabled: { type: Boolean, default: void 0 },
  indeterminate: { type: Boolean, default: false },
  label: { type: String, default: void 0 },
  trueValue: { type: [String, Number, Boolean], default: true },
  falseValue: { type: [String, Number, Boolean], default: false },
  value: { type: null, default: void 0 },
  size: { type: String, default: void 0 },
  waveless: { type: Boolean, default: false },
  "onUpdate:checked": { type: [Function, Array] },
  onChange: {
    type: [Function, Array]
  },
  onBlur: { type: [Function, Array] },
  onFocus: { type: [Function, Array] }
};
const checkboxGroupProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  value: { type: Array, default: void 0 },
  buttoned: { type: Boolean, default: false },
  dataSource: { type: Array },
  disabled: { type: Boolean, default: false },
  gap: { type: [Number, String], default: void 0 },
  name: { type: String, default: void 0 },
  size: { type: String, default: void 0 },
  "onUpdate:value": { type: [Function, Array] },
  onChange: { type: [Function, Array] }
};
const buttonSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "md"
};
var Checkbox = /* @__PURE__ */ defineComponent({
  name: "IxCheckbox",
  inheritAttrs: false,
  props: checkboxProps,
  setup(props, {
    attrs,
    expose,
    slots
  }) {
    const key = useKey();
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox`);
    const config = useGlobalConfig$1("checkbox");
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
    const checkboxGroup = inject(checkboxGroupToken, null);
    const mergedName = computed(() => {
      var _a2;
      return (_a2 = attrs.name) != null ? _a2 : checkboxGroup == null ? void 0 : checkboxGroup.props.name;
    });
    const mergedValue = computed(() => {
      const {
        value
      } = props;
      if (!isNil(value)) {
        return value;
      }
      return checkboxGroup ? key : void 0;
    });
    const isButtoned = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = props.buttoned) != null ? _a2 : checkboxGroup == null ? void 0 : checkboxGroup.props.buttoned) != null ? _b : false;
    });
    const size = computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = (_a2 = props.size) != null ? _a2 : checkboxGroup == null ? void 0 : checkboxGroup.props.size) != null ? _b : formContext == null ? void 0 : formContext.size.value) != null ? _c : config.size;
    });
    const mergedWaveless = computed(() => {
      var _a2;
      return (_a2 = props.waveless) != null ? _a2 : config.waveless;
    });
    const {
      isChecked,
      isDisabled,
      isFocused,
      handleChange,
      handleBlur,
      handleFocus
    } = useCheckbox(props, checkboxGroup, mergedValue, waveRef, mergedWaveless);
    const classes = computed(() => {
      const {
        indeterminate
      } = props;
      const buttoned = isButtoned.value;
      const prefixCls = mergedPrefixCls.value;
      const commonPrefixCls = common.prefixCls;
      const classes2 = {
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
        "role": "checkbox",
        "aria-checked": isChecked.value,
        "aria-disabled": isDisabled.value
      }, [createVNode("span", {
        "class": `${prefixCls}-input`
      }, [createVNode("input", mergeProps({
        "ref": elementRef,
        "type": "checkbox",
        "class": `${prefixCls}-input-inner`,
        "aria-hidden": true,
        "autofocus": autofocus,
        "name": mergedName.value,
        "value": mergedValue.value,
        "checked": isChecked.value,
        "disabled": isDisabled.value,
        "onChange": handleChange,
        "onBlur": handleBlur,
        "onFocus": handleFocus
      }, restAttrs), null), !isButtoned.value && createVNode("span", {
        "class": `${prefixCls}-input-box`,
        "tabindex": tabindex
      }, [!mergedWaveless.value && createVNode(ɵWave, {
        "ref": waveRef
      }, null)])]), isButtoned.value && createVNode("span", {
        "class": `${prefixCls}-input-tick`,
        "tabindex": tabindex
      }, null), isButtoned.value && !mergedWaveless.value && createVNode(ɵWave, {
        "ref": waveRef
      }, null), labelNode && createVNode("span", {
        "class": `${prefixCls}-label`
      }, [labelNode])]);
    };
  }
});
const useCheckbox = (props, checkboxGroup, mergedValue, waveRef, mergedWaveless) => {
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
    const {
      props: groupProps,
      accessor
    } = checkboxGroup;
    isChecked = computed(() => (accessor.value || []).includes(mergedValue.value));
    isDisabled = computed(() => accessor.disabled || !!props.disabled);
    handleBlur = (evt) => {
      isFocused.value = false;
      accessor.markAsBlurred();
      callEmit(props.onBlur, evt);
    };
    handleChange = (evt) => {
      var _a2;
      const checked = evt.target.checked;
      const {
        trueValue,
        falseValue
      } = props;
      const value = mergedValue.value;
      const checkValue = checked ? trueValue : falseValue;
      const oldCheckValue = !checked ? trueValue : falseValue;
      const oldValue = accessor.value || [];
      const newValue = [...oldValue];
      const checkValueIndex = newValue.indexOf(value);
      if (checkValueIndex === -1) {
        newValue.push(value);
      } else {
        newValue.splice(checkValueIndex, 1);
      }
      accessor.setValue(newValue);
      callEmit(props.onChange, checkValue, oldCheckValue);
      callEmit(groupProps.onChange, newValue, oldValue);
      !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
    };
  } else {
    const {
      accessor,
      control
    } = useAccessorAndControl({
      valueKey: "checked"
    });
    useFormItemRegister(control);
    isChecked = computed(() => accessor.value === props.trueValue);
    isDisabled = computed(() => accessor.disabled);
    handleBlur = (evt) => {
      isFocused.value = false;
      accessor.markAsBlurred();
      callEmit(props.onBlur, evt);
    };
    handleChange = (evt) => {
      var _a2;
      const checked = evt.target.checked;
      const {
        trueValue,
        falseValue
      } = props;
      const newChecked = checked ? trueValue : falseValue;
      const oldChecked = !checked ? trueValue : falseValue;
      accessor.setValue(newChecked);
      callEmit(props.onChange, newChecked, oldChecked);
      !mergedWaveless.value && ((_a2 = waveRef.value) == null ? void 0 : _a2.play());
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
var CheckboxGroup = /* @__PURE__ */ defineComponent({
  name: "IxCheckboxGroup",
  props: checkboxGroupProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-checkbox-group`);
    const {
      accessor,
      control
    } = useAccessorAndControl();
    useFormItemRegister(control);
    provide(checkboxGroupToken, {
      props,
      accessor
    });
    const mergedGap = computed(() => {
      var _a2;
      return (_a2 = props.gap) != null ? _a2 : props.buttoned ? 0 : 8;
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
          return createVNode(Checkbox, mergeProps(item, {
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
const IxCheckbox = Checkbox;
const IxCheckboxGroup = CheckboxGroup;
const CheckboxCtr = defineCtrComponent({
  setup({
    control,
    controlValue,
    setControlValue
  }) {
    const dataSource = computed(() => control.value.options.map((opt) => ({
      key: opt.label,
      label: opt.label
    })));
    const selectedValue = computed(() => {
      var _a2;
      return (_a2 = controlValue.value) == null ? void 0 : _a2.map((v) => {
        var _a3;
        return (_a3 = control.value.options.find((opt) => opt.value === v)) == null ? void 0 : _a3.label;
      }).filter(Boolean);
    });
    const handleChange = (value) => {
      const checkedValue = value.map((v) => {
        var _a2;
        return (_a2 = control.value.options.find((opt) => opt.value === v)) == null ? void 0 : _a2.value;
      }).filter(Boolean);
      checkedValue && setControlValue(checkedValue);
    };
    return () => createVNode("div", {
      "class": "archive-app-demo__control-checkbox"
    }, [createVNode(IxCheckboxGroup, {
      "value": selectedValue.value,
      "dataSource": dataSource.value,
      "onChange": handleChange
    }, null)]);
  }
});
const InputCtrl = defineCtrComponent({
  setup({
    controlValue,
    setControlValue
  }) {
    return () => createVNode("div", {
      "class": "archive-app-demo__control-input"
    }, [createVNode(IxInput, {
      "value": controlValue.value,
      "onChange": setControlValue
    }, null)]);
  }
});
function getBoxSizingData(node) {
  const { boxSizing, paddingBottom, paddingTop, borderBottom, borderTop } = window.getComputedStyle(node);
  const _paddingTop = parseFloat(paddingTop);
  const _paddingBottom = parseFloat(paddingBottom);
  const _borderTop = parseFloat(borderTop);
  const _borderBottom = parseFloat(borderBottom);
  return {
    boxSizing,
    paddingSize: _paddingTop + _paddingBottom,
    borderSize: _borderTop + _borderBottom,
    paddingTop: _paddingTop,
    paddingBottom: _paddingBottom,
    borderTop: _borderTop,
    borderBottom: _borderBottom
  };
}
const HIDDEN_TEXTAREA_STYLE = {
  height: "0",
  "min-height": "0",
  "max-height": "none",
  visibility: "hidden",
  overflow: "hidden",
  transition: "none"
};
function measureTextarea(textarea, measureFn, cache = true) {
  let clonedTextarea;
  const _textarea = textarea;
  if (_textarea.__cdk_measure_textarea) {
    clonedTextarea = _textarea.__cdk_measure_textarea;
  } else {
    clonedTextarea = textarea.cloneNode(false);
    cache && (_textarea.__cdk_measure_textarea = clonedTextarea);
  }
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach((key) => {
    clonedTextarea.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
  textarea.parentNode.appendChild(clonedTextarea);
  const measureRes = measureFn(clonedTextarea);
  if (clonedTextarea.parentNode) {
    clonedTextarea.parentNode.removeChild(clonedTextarea);
  }
  return measureRes;
}
function useLineHeight(textareaRef) {
  let lineHeight = 0;
  return customRef((track, trigger) => {
    watch(textareaRef, () => {
      lineHeight = calcTextareaLineHeight(textareaRef.value);
      trigger();
    });
    return {
      get() {
        if (!textareaRef.value) {
          return 0;
        }
        const value = lineHeight || (lineHeight = calcTextareaLineHeight(textareaRef.value));
        track();
        return value;
      },
      set() {
      }
    };
  });
}
function calcTextareaLineHeight(textarea) {
  if (!textarea) {
    return 0;
  }
  if (!textarea.parentNode) {
    return 0;
  }
  return measureTextarea(
    textarea,
    (el) => {
      const rows = el.rows;
      const { paddingSize } = getBoxSizingData(el);
      el.rows = 1;
      el.value = "x";
      const lineHeight = el.scrollHeight - paddingSize;
      el.rows = rows;
      return lineHeight > 0 ? lineHeight : 0;
    },
    false
  );
}
const isAutoRowsObject = (value) => {
  return isObject(value) && (isNumber(value.minRows) || isNumber(value.maxRows));
};
function useAutoRows(textareaRef, autoRows) {
  let previousValue;
  let previousMinRows;
  let initialHeight;
  let isFunctioning = false;
  let currentOverflow;
  let cachedPlaceholderHeight;
  const enabled = computed(() => isAutoRowsObject(autoRows.value) || isBoolean(autoRows.value) && !!autoRows.value);
  const minRows = computed(() => isAutoRowsObject(autoRows.value) ? autoRows.value.minRows : void 0);
  const maxRows = computed(() => isAutoRowsObject(autoRows.value) ? autoRows.value.maxRows : void 0);
  const cachedLineHeight = useLineHeight(textareaRef);
  const boxSizingData = computed(() => {
    if (!textareaRef.value) {
      return { paddingSize: 0, borderSize: 0, boxSizing: "" };
    }
    return getBoxSizingData(textareaRef.value);
  });
  function getTextareaScrollHeight() {
    return measureTextarea(textareaRef.value, (textarea) => {
      textarea.value = textareaRef.value.value;
      void textarea.scrollHeight;
      return getHeightByScrollHeight(textarea.scrollHeight, boxSizingData.value);
    });
  }
  function getTextareaPlaceholderHeight() {
    if (!textareaRef.value) {
      return 0;
    }
    const textarea = textareaRef.value;
    if (!textarea.placeholder) {
      return 0;
    }
    if (!cachedPlaceholderHeight) {
      measureTextarea(textareaRef.value, (textarea2) => {
        textarea2.style.height = "";
        textarea2.value = textarea2.placeholder;
        void textarea2.scrollHeight;
        cachedPlaceholderHeight = getHeightByScrollHeight(textarea2.scrollHeight, boxSizingData.value);
      });
    }
    return cachedPlaceholderHeight;
  }
  function resizeToFitContent(force = false) {
    if (!enabled.value) {
      return;
    }
    if (!cachedLineHeight.value) {
      return;
    }
    const textarea = textareaRef.value;
    const value = textarea.value;
    if (!force && minRows.value === previousMinRows && value === previousValue) {
      return;
    }
    textarea.style.lineHeight = `${cachedLineHeight.value}px`;
    const height = Math.max(getTextareaScrollHeight(), getTextareaPlaceholderHeight());
    textarea.style.height = `${height}px`;
    currentOverflow = currentOverflow != null ? currentOverflow : textarea.style.overflow;
    textarea.style.overflow = "hidden";
    nextTick(
      () => rAF(() => {
        scrollToCaretPosition(textarea);
        textarea.style.overflow = currentOverflow != null ? currentOverflow : "";
        currentOverflow = void 0;
      })
    );
    previousValue = value;
    previousMinRows = minRows.value;
  }
  function setMinHeight() {
    if (!textareaRef.value) {
      return;
    }
    const contentHeight = minRows.value && cachedLineHeight.value ? minRows.value * cachedLineHeight.value : null;
    const minHeight = contentHeight ? `${getHeightByContentHeight(contentHeight, boxSizingData.value)}px` : "";
    textareaRef.value.style.maxHeight = minHeight;
  }
  function setMaxHeight() {
    if (!textareaRef.value) {
      return;
    }
    const contentHeight = maxRows.value && cachedLineHeight.value ? maxRows.value * cachedLineHeight.value : null;
    const maxHeight = contentHeight ? `${getHeightByContentHeight(contentHeight, boxSizingData.value)}px` : "";
    textareaRef.value.style.maxHeight = maxHeight;
  }
  function scrollToCaretPosition(textarea) {
    const { selectionStart, selectionEnd } = textarea;
    if (isFunctioning && document.activeElement === textarea) {
      textarea.setSelectionRange(selectionStart, selectionEnd);
    }
  }
  function reset() {
    if (initialHeight !== void 0) {
      textareaRef.value && (textareaRef.value.style.height = initialHeight);
    }
  }
  let stopWatch;
  const onResize2 = throttle(() => {
    cachedPlaceholderHeight = void 0;
    resizeToFitContent(true);
  }, 16);
  onMounted(() => {
    const watchStopHandlers = [
      watch(
        textareaRef,
        () => {
          textareaRef.value && (initialHeight = textareaRef.value.style.height);
        },
        { immediate: true }
      ),
      watch(
        autoRows,
        () => {
          enabled.value ? resizeToFitContent(true) : reset();
        },
        { immediate: true }
      ),
      watch(
        minRows,
        () => {
          setMinHeight();
        },
        { immediate: true }
      ),
      watch(
        maxRows,
        () => {
          setMaxHeight();
        },
        { immediate: true }
      )
    ];
    const stopResizeObserver = useResizeObserver(textareaRef, onResize2);
    stopWatch = () => {
      watchStopHandlers.forEach((stop) => stop());
      stopResizeObserver();
    };
    isFunctioning = true;
  });
  onUnmounted(() => {
    stopWatch == null ? void 0 : stopWatch();
    isFunctioning = false;
  });
  return {
    resizeToFitContent,
    lineHeight: cachedLineHeight,
    boxSizingData
  };
}
function getHeightByScrollHeight(scrollHeight, sizingData) {
  const { borderSize, paddingSize, boxSizing } = sizingData;
  if (boxSizing === "border-box") {
    return scrollHeight + borderSize;
  }
  return scrollHeight - paddingSize;
}
function getHeightByContentHeight(contentHeight, sizingData) {
  const { borderSize, paddingSize, boxSizing } = sizingData;
  if (boxSizing === "border-box") {
    return contentHeight + borderSize + paddingSize;
  }
  return contentHeight + paddingSize;
}
const textareaProps = {
  ...inputCommonProps,
  autoRows: { type: [Boolean, Object], default: void 0 },
  computeCount: { type: Function, default: void 0 },
  maxCount: { type: [Number, String], default: void 0 },
  resize: { type: String, default: void 0 },
  showCount: { type: Boolean, default: void 0 }
};
var Textarea = /* @__PURE__ */ defineComponent({
  name: "IxTextarea",
  inheritAttrs: false,
  props: textareaProps,
  setup(props, {
    slots,
    expose,
    attrs
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-textarea`);
    const config = useGlobalConfig$1("textarea");
    const {
      elementRef,
      accessor,
      mergedSize,
      mergedStatus,
      clearable,
      clearIcon,
      clearVisible,
      isFocused,
      isComposing,
      focus,
      blur,
      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleClear,
      syncValue
    } = useInput(props, config);
    expose({
      focus,
      blur
    });
    const classes = computed(() => {
      const {
        showCount = config.showCount
      } = props;
      const status = mergedStatus.value;
      const prefixCls = mergedPrefixCls.value;
      const classes2 = {
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-clearable`]: clearable.value,
        [`${prefixCls}-disabled`]: accessor.disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-with-count`]: showCount
      };
      return normalizeClass([classes2, attrs.class]);
    });
    const dataCount = useDataCount(props, config, accessor);
    const autoRows = computed(() => {
      var _a2;
      return (_a2 = props.autoRows) != null ? _a2 : config.autoRows;
    });
    const resize = computed(() => {
      var _a2;
      const resize2 = (_a2 = props.resize) != null ? _a2 : config.resize;
      if (autoRows.value) {
        return resize2 === "horizontal" ? "horizontal" : "none";
      } else {
        return resize2;
      }
    });
    const textareaStyle = computed(() => ({
      resize: resize.value
    }));
    const {
      resizeToFitContent
    } = useAutoRows(elementRef, autoRows);
    onMounted(() => {
      syncValue();
      watch(() => accessor.value, resizeToFitContent, {
        immediate: true
      });
    });
    const _handleInput = (evt) => {
      handleInput(evt);
      if (isComposing.value) {
        resizeToFitContent();
      }
    };
    return () => {
      const {
        class: className,
        style,
        ...rest
      } = attrs;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("span", {
        "class": classes.value,
        "style": style,
        "data-count": dataCount.value
      }, [createVNode("textarea", mergeProps(rest, {
        "ref": elementRef,
        "class": `${prefixCls}-inner`,
        "style": textareaStyle.value,
        "disabled": accessor.disabled,
        "readonly": props.readonly,
        "onInput": _handleInput,
        "onCompositionstart": handleCompositionStart,
        "onCompositionend": handleCompositionEnd
      }), null), clearable.value && createVNode("span", {
        "class": normalizeClass([`${prefixCls}-clear`, clearVisible.value ? "visible" : ""]),
        "onClick": handleClear
      }, [slots.clearIcon ? slots.clearIcon() : createVNode(IxIcon, {
        "name": clearIcon.value
      }, null)])]);
    };
  }
});
function useDataCount(props, config, accessor) {
  return computed(() => {
    var _a2, _b, _c, _d;
    const showCount = (_a2 = props.showCount) != null ? _a2 : config.showCount;
    const computeCount = (_b = props.computeCount) != null ? _b : config.computeCount;
    const maxCount = (_c = props.maxCount) != null ? _c : config.maxCount;
    let dataCount = "";
    if (showCount) {
      const value = (_d = accessor.value) != null ? _d : "";
      dataCount = value.length;
      if (computeCount) {
        dataCount = computeCount(value);
      } else if (maxCount) {
        dataCount += " / " + maxCount;
      }
    }
    return dataCount;
  });
}
const IxTextarea = Textarea;
const JsonCtrl = defineCtrComponent({
  setup({
    controlValue,
    setControlValue
  }) {
    const [inputValue, setInputValue] = useState(controlValue.value ? JSON.stringify(controlValue.value, void 0, 2) : void 0);
    const handleChange = (value) => {
      setInputValue(value);
      if (!value) {
        setControlValue({});
      } else {
        try {
          const parsedValue = JSON.parse(value);
          setControlValue(parsedValue);
        } catch (err) {
        }
      }
    };
    return () => createVNode("div", {
      "class": "archive-app-demo__control-json"
    }, [createVNode(IxTextarea, {
      "value": inputValue.value,
      "onChange": handleChange,
      "placeholder": "JSON string required"
    }, null)]);
  }
});
const inputNumberProps = {
  value: [Number, null],
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  keyboard: {
    type: Boolean,
    default: void 0
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  placeholder: String,
  precision: Number,
  readonly: {
    type: Boolean,
    default: false
  },
  size: String,
  status: String,
  step: {
    type: Number,
    default: 1
  },
  "onUpdate:value": [Function, Array],
  onChange: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array]
};
function useInputNumber(props, config) {
  const { accessor, control } = useAccessorAndControl();
  useFormItemRegister(control);
  const mergedSize = useFormSize(props, config);
  const mergedStatus = useFormStatus(props, control);
  const displayValue = ref("");
  const isIllegal = ref(true);
  const nowValue = computed(() => {
    var _a2;
    return (_a2 = accessor.value) != null ? _a2 : void 0;
  });
  const isKeyboard = computed(() => {
    var _a2;
    return (_a2 = props.keyboard) != null ? _a2 : config.keyboard;
  });
  const isDisabled = computed(() => accessor.disabled);
  const isDisabledDec = computed(() => props.readonly || !!nowValue.value && nowValue.value <= props.min);
  const isDisabledInc = computed(() => props.readonly || !!nowValue.value && nowValue.value >= props.max);
  const precision = computed(() => {
    const stepPrecision = getPrecision(props.step);
    if (props.precision !== void 0) {
      if (stepPrecision > props.precision) {
        Logger.warn(
          "components/input-number",
          `The precision(${props.precision}) should not be less than the decimal point of the step(${props.step}).`
        );
      }
      return props.precision;
    }
    return Math.max(getPrecision(accessor.value), stepPrecision);
  });
  const disabledDec = computed(() => getIncValueFormAccessor(-props.step) < props.min);
  const disabledInc = computed(() => getIncValueFormAccessor(props.step) > props.max);
  function getIncValueFormAccessor(step) {
    const { value } = accessor;
    let newVal = step;
    if (typeof value === "number" && !Number.isNaN(value)) {
      newVal = parseFloat((value + step).toFixed(precision.value));
    }
    return Math.max(props.min, Math.min(props.max, newVal));
  }
  function updateDisplayValueFromAccessor() {
    const { value } = accessor;
    if (!value && value !== 0 || !String(value).trim()) {
      displayValue.value = "";
    } else if (Number.isNaN(Number(value)) || typeof value !== "number" && typeof value !== "string") {
      displayValue.value = "";
      {
        Logger.warn("components/input-number", `model value(${value}) is not a number.`);
      }
    } else {
      const newValue = Number(value);
      if (displayValue.value === "" || newValue !== Number(displayValue.value)) {
        displayValue.value = newValue.toFixed(precision.value);
      }
    }
  }
  function updateModelValueFromDisplayValue() {
    const { value: strVal } = displayValue;
    const numberVal = parseFloat(Number(strVal).toFixed(precision.value));
    if (strVal === "") {
      updateModelValue(null);
    } else if (Number.isNaN(numberVal)) {
      updateDisplayValueFromAccessor();
    } else {
      const newVal = Math.max(props.min, Math.min(props.max, numberVal));
      displayValue.value = newVal.toFixed(precision.value);
      updateModelValue(newVal);
    }
  }
  function updateModelValue(newVal) {
    const oldVal = toRaw(accessor.value);
    if (newVal !== oldVal) {
      accessor.setValue(newVal);
      callEmit(props.onChange, newVal, oldVal);
      nextTick(() => {
        if (newVal !== accessor.value) {
          updateDisplayValueFromAccessor();
        }
      });
    }
  }
  function handleInput(evt) {
    const { value: inputVal } = evt.target;
    const strVal = inputVal.trim().replace(/。/g, ".");
    displayValue.value = strVal;
    if (strVal === "") {
      updateModelValue(null);
      return;
    }
    const numberVal = Number(strVal);
    if (!Number.isNaN(numberVal)) {
      if (numberVal >= props.min && numberVal <= props.max) {
        updateModelValue(numberVal);
      }
    }
  }
  function handleDec() {
    if (props.readonly || isDisabled.value || disabledDec.value) {
      return;
    }
    const newVal = getIncValueFormAccessor(-props.step);
    updateModelValue(newVal);
  }
  function handleInc() {
    if (props.readonly || isDisabled.value || disabledInc.value) {
      return;
    }
    const newVal = getIncValueFormAccessor(props.step);
    updateModelValue(newVal);
  }
  function handleKeyDown(evt) {
    if (isKeyboard.value) {
      if (evt.code === "Enter" || evt.code === "NumpadEnter") {
        updateModelValueFromDisplayValue();
      } else if (evt.code === "ArrowUp") {
        evt.preventDefault();
        handleInc();
      } else if (evt.code === "ArrowDown") {
        evt.preventDefault();
        handleDec();
      }
    }
  }
  const isFocused = ref(false);
  function handleFocus(evt) {
    isFocused.value = true;
    callEmit(props.onFocus, evt);
  }
  function handleBlur(evt) {
    isFocused.value = false;
    updateModelValueFromDisplayValue();
    accessor.markAsBlurred();
    callEmit(props.onBlur, evt);
  }
  watch(
    displayValue,
    (value) => {
      if (value !== "") {
        const numberVal = Number(value);
        isIllegal.value = Number.isNaN(numberVal) || numberVal < props.min || numberVal > props.max;
      } else {
        isIllegal.value = false;
      }
    },
    { immediate: true }
  );
  watch(
    () => accessor.value,
    () => updateDisplayValueFromAccessor(),
    { immediate: true }
  );
  return {
    mergedSize,
    mergedStatus,
    displayValue,
    isIllegal,
    isDisabled,
    isDisabledDec,
    isDisabledInc,
    isFocused,
    nowValue,
    handleKeyDown,
    handleDec,
    handleInc,
    handleInput,
    handleFocus,
    handleBlur
  };
}
function getPrecision(value) {
  if (value === void 0 || value === null) {
    return 0;
  }
  const decimal = String(value).split(".")[1];
  return decimal ? decimal.length : 0;
}
var InputNumber = /* @__PURE__ */ defineComponent({
  name: "IxInputNumber",
  props: inputNumberProps,
  setup(props, {
    expose,
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("inputNumber");
    const {
      mergedSize,
      mergedStatus,
      displayValue,
      nowValue,
      isIllegal,
      isDisabled,
      isDisabledDec,
      isDisabledInc,
      isFocused,
      handleInput,
      handleFocus,
      handleBlur,
      handleKeyDown,
      handleDec,
      handleInc
    } = useInputNumber(props, config);
    const {
      elementRef,
      focus,
      blur
    } = useFormFocusMonitor({
      handleBlur,
      handleFocus
    });
    expose({
      focus,
      blur
    });
    const mergedPrefixCls = computed(() => `${common.prefixCls}-input-number`);
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-illegal`]: isIllegal.value
      });
    });
    const inputRef = ref();
    onMounted(() => {
      elementRef.value = inputRef.value.getInputElement();
    });
    const handleIncrease = (evt) => {
      evt.stopPropagation();
      handleInc();
    };
    const handleDecrease = (evt) => {
      evt.stopPropagation();
      handleDec();
    };
    return () => {
      const prefixCls = mergedPrefixCls.value;
      const vSlots = {
        ...slots,
        suffix: () => [createVNode("span", {
          "key": "increase",
          "class": normalizeClass({
            [`${prefixCls}-increase`]: true,
            [`${prefixCls}-increase-disabled`]: isDisabled.value || isDisabledInc.value
          }),
          "role": "button",
          "onClick": handleIncrease
        }, [createVNode(IxIcon, {
          "name": "up"
        }, null)]), createVNode("span", {
          "key": "decrease",
          "class": normalizeClass({
            [`${prefixCls}-decrease`]: true,
            [`${prefixCls}-decrease-disabled`]: isDisabled.value || isDisabledDec.value
          }),
          "role": "button",
          "onClick": handleDecrease
        }, [createVNode(IxIcon, {
          "name": "down"
        }, null)])]
      };
      return createVNode(ɵInput, {
        "class": classes.value,
        "ref": inputRef,
        "type": "text",
        "autocomplete": "off",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": nowValue.value,
        "disabled": isDisabled.value,
        "focused": isFocused.value,
        "readonly": props.readonly,
        "placeholder": props.placeholder,
        "size": mergedSize.value,
        "status": mergedStatus.value,
        "value": displayValue.value,
        "onInput": handleInput,
        "onKeydown": handleKeyDown
      }, vSlots);
    };
  }
});
const IxInputNumber = InputNumber;
const NumberCtrl = defineCtrComponent({
  setup({
    controlValue,
    setControlValue
  }) {
    return () => createVNode("div", {
      "class": "archive-app-demo__control-number"
    }, [createVNode(IxInputNumber, {
      "value": controlValue.value,
      "onChange": setControlValue
    }, null)]);
  }
});
const RadioCtr = defineCtrComponent({
  setup({
    control,
    controlValue,
    setControlValue
  }) {
    const dataSource = computed(() => control.value.options.map((opt) => ({
      key: opt.label,
      label: opt.label
    })));
    const selectedOption = computed(() => control.value.options.find((opt) => opt.value === controlValue.value));
    const handleChange = (value) => {
      const option = control.value.options.find((opt) => opt.label === value);
      option && setControlValue(option.value);
    };
    return () => {
      var _a2;
      return createVNode("div", {
        "class": "archive-app-demo__control-radio"
      }, [createVNode(IxRadioGroup, {
        "value": (_a2 = selectedOption.value) == null ? void 0 : _a2.label,
        "dataSource": dataSource.value,
        "onChange": handleChange
      }, null)]);
    };
  }
});
const overflowItemProps = {
  prefixCls: {
    type: String,
    required: true
  },
  display: {
    type: Boolean,
    default: true
  },
  itemKey: {
    type: [Number, String, Symbol],
    required: true
  },
  data: Object,
  onSizeChange: Function
};
const overflowProps = {
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
var Item$2 = /* @__PURE__ */ defineComponent({
  name: "IxOverflowItem",
  props: overflowItemProps,
  setup(props, {
    slots
  }) {
    const itemElRef = ref();
    const handleResize = (entry) => {
      var _a2;
      return callEmit(props.onSizeChange, entry.target, (_a2 = props.itemKey) != null ? _a2 : "");
    };
    useResizeObserver(itemElRef, handleResize);
    return () => {
      var _a2;
      return withDirectives(createVNode("div", {
        "class": `${props.prefixCls}-item`,
        "ref": itemElRef
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), [[vShow, props.display]]);
    };
  }
});
const restNodeKey = "__IDUX_OVERFLOW_REST";
const suffixNodeKey = "__IDUX_OVERFLOW_SUFFIX";
const responsive = "responsive";
var Overflow = /* @__PURE__ */ defineComponent({
  name: "ɵOverflow",
  props: overflowProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-overflow`);
    const containerElRef = ref();
    const {
      containerWidth,
      setContainerWidth
    } = useContainerSize(containerElRef);
    const {
      itemsWidthMap,
      setItemWidth
    } = useItemSize();
    const restWidth = ref(0);
    const suffixWidth = ref(0);
    const displayCount = ref(props.dataSource.length);
    const isResponsive = computed(() => props.maxLabel === responsive);
    const restReady = ref(false);
    const showRest = computed(() => isResponsive.value || isNumber(props.maxLabel) && props.dataSource.length > props.maxLabel);
    const mergedData = computed(() => {
      if (!isResponsive.value) {
        return props.dataSource.slice(0, props.maxLabel);
      }
      return props.dataSource;
    });
    const restData = computed(() => props.dataSource.slice(displayCount.value));
    const displayRest = computed(() => restReady.value && !!restData.value.length);
    watch([itemsWidthMap, containerWidth, restWidth, suffixWidth, mergedData], () => {
      var _a2;
      const len = props.dataSource.length;
      const lastIndex = len - 1;
      const data = (_a2 = props.dataSource) != null ? _a2 : [];
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
      for (let i = 0; i < len; i++) {
        const getItemWidth = (index) => {
          var _a22;
          return (_a22 = itemsWidthMap.value.get(props.getKey(data[index]))) != null ? _a22 : 0;
        };
        const internalContainerWidth = containerWidth.value - suffixWidth.value;
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
    const itemSharedProps = {
      prefixCls: mergedPrefixCls.value
    };
    const internalRenderItem = (item, index) => {
      var _a2, _b;
      if (!slots.item) {
        throwError("components/_private/overflow", "item slot must be provided");
      }
      const nodeContent = (_b = (_a2 = slots.item) == null ? void 0 : _a2.call(slots, item)) != null ? _b : "";
      return createVNode(Item$2, mergeProps(itemSharedProps, {
        "itemKey": props.getKey(item),
        "display": index < displayCount.value,
        "onSizeChange": (itemEl, key) => setItemWidth(key, itemEl)
      }), {
        default: () => [nodeContent]
      });
    };
    const internalRenderRest = (rest) => {
      var _a2, _b;
      const nodeContent = (_b = (_a2 = slots.rest) == null ? void 0 : _a2.call(slots, rest)) != null ? _b : `+ ${rest.length} ...`;
      return createVNode(Item$2, mergeProps(itemSharedProps, {
        "class": `${mergedPrefixCls.value}-rest`,
        "itemKey": restNodeKey,
        "display": displayRest.value,
        "onSizeChange": (itemEl) => {
          var _a22;
          return restWidth.value = (_a22 = itemEl.clientWidth) != null ? _a22 : 0;
        }
      }), {
        default: () => [nodeContent]
      });
    };
    const internalRenderSuffix = () => {
      var _a2, _b;
      const nodeContent = (_b = (_a2 = slots.suffix) == null ? void 0 : _a2.call(slots)) != null ? _b : null;
      return nodeContent ? createVNode(Item$2, mergeProps(itemSharedProps, {
        "class": `${mergedPrefixCls.value}-suffix`,
        "itemKey": suffixNodeKey,
        "onSizeChange": (itemEl) => {
          var _a22;
          return suffixWidth.value = (_a22 = itemEl.clientWidth) != null ? _a22 : 0;
        }
      }), {
        default: () => [nodeContent]
      }) : null;
    };
    return () => {
      return createVNode("div", {
        "class": `${mergedPrefixCls.value} ${props.prefixCls}-overflow`,
        "ref": containerElRef
      }, [mergedData.value.map(internalRenderItem), showRest.value && internalRenderRest(restData.value), internalRenderSuffix()]);
    };
  }
});
const useContainerSize = (containerElRef) => {
  const containerWidth = ref(0);
  const setContainerWidth = () => {
    var _a2, _b;
    containerWidth.value = (_b = (_a2 = containerElRef.value) == null ? void 0 : _a2.clientWidth) != null ? _b : 0;
  };
  return {
    containerWidth,
    setContainerWidth
  };
};
const useItemSize = () => {
  const itemsWidthMap = ref(/* @__PURE__ */ new Map());
  const setItemWidth = (key, itemEl) => {
    var _a2;
    if (!itemEl && itemsWidthMap.value.get(key)) {
      itemsWidthMap.value.delete(key);
    } else {
      (itemEl == null ? void 0 : itemEl.clientWidth) && itemsWidthMap.value.set(key, (_a2 = itemEl == null ? void 0 : itemEl.clientWidth) != null ? _a2 : 0);
    }
  };
  return {
    itemsWidthMap,
    setItemWidth
  };
};
const ɵOverflow = Overflow;
function useInputState(props, mergedSearchable) {
  const mirrorRef = ref();
  const inputValue = ref("");
  const isComposing = ref(false);
  const isFocused = ref(false);
  const handleFocus = (evt) => {
    isFocused.value = true;
    callEmit(props.onFocus, evt);
  };
  const handleBlur = (evt) => {
    isFocused.value = false;
    callEmit(props.onBlur, evt);
  };
  const { elementRef: inputRef, focus, blur } = useFormFocusMonitor({ handleBlur, handleFocus });
  const syncMirrorWidth = (evt) => {
    if (props.multiple) {
      const mirrorElement = mirrorRef.value;
      if (!mirrorElement) {
        return;
      }
      const inputText = evt ? evt.target.value : inputRef.value.value;
      mirrorElement.textContent = inputText;
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
        inputValue.value = value;
        callEmit(props.onInputValueChange, value);
      }
      mergedSearchable.value && callEmit(props.onSearch, value);
      syncMirrorWidth();
    }
  };
  const clearInput = () => {
    const inputElement = inputRef.value;
    if (inputElement) {
      inputElement.value = "";
    }
    inputValue.value = "";
    callEmit(props.onInputValueChange, "");
    syncMirrorWidth();
  };
  onMounted(() => syncMirrorWidth());
  return {
    inputRef,
    focus,
    blur,
    mirrorRef,
    inputValue,
    isComposing,
    isFocused,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    clearInput
  };
}
const selectorToken = Symbol("selectorToken");
var Input = /* @__PURE__ */ defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      mergedSearchable,
      mirrorRef,
      inputRef,
      inputValue,
      isFocused,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput
    } = inject(selectorToken);
    const inputReadonly = computed(() => props.readonly || !isFocused.value || !(props.allowInput || mergedSearchable.value));
    const innerStyle = computed(() => {
      return {
        opacity: inputReadonly.value ? 0 : void 0
      };
    });
    return () => {
      const {
        autocomplete,
        autofocus,
        disabled,
        multiple
      } = props;
      const prefixCls = `${mergedPrefixCls.value}-input`;
      return createVNode("div", {
        "class": prefixCls
      }, [createVNode("input", {
        "ref": inputRef,
        "class": `${prefixCls}-inner`,
        "style": innerStyle.value,
        "autocomplete": autocomplete,
        "autofocus": autofocus,
        "disabled": disabled,
        "readonly": inputReadonly.value,
        "value": inputValue.value,
        "onCompositionstart": handleCompositionStart,
        "onCompositionend": handleCompositionEnd,
        "onInput": handleInput
      }, null), multiple && createVNode("span", {
        "ref": mirrorRef,
        "class": `${prefixCls}-mirror`,
        "aria-hidden": true
      }, null)]);
    };
  }
});
const Item$1 = (props, {
  slots
}) => {
  const {
    disabled,
    prefixCls,
    removable,
    value,
    onRemove
  } = props;
  const classes = prefixCls + (disabled ? ` ${prefixCls}-disabled` : "");
  const handleClick = (evt) => {
    evt.stopPropagation();
    callEmit(onRemove, value);
  };
  return createVNode("div", {
    "class": classes
  }, [createVNode("span", {
    "class": `${prefixCls}-label`
  }, [slots.default()]), removable && createVNode("span", {
    "class": `${prefixCls}-remove`,
    "onClick": handleClick
  }, [createVNode(IxIcon, {
    "name": "close"
  }, null)])]);
};
const selectorProps = {
  allowInput: { type: Boolean, required: true },
  autocomplete: { type: String, required: true },
  autofocus: { type: Boolean, required: true },
  borderless: { type: Boolean, default: void 0 },
  className: { type: String, required: true },
  clearable: { type: Boolean, required: true },
  clearIcon: { type: String, default: void 0 },
  config: {
    type: Object,
    required: true
  },
  dataSource: { type: Array, required: true },
  defaultLabelSlotName: { type: String, default: void 0 },
  disabled: { type: Boolean, required: true },
  maxLabel: { type: [Number, String], required: true },
  multiple: { type: Boolean, required: true },
  opened: { type: Boolean, required: true },
  placeholder: { type: String, default: void 0 },
  readonly: { type: Boolean, required: true },
  searchable: { type: [Boolean, String], required: true },
  size: { type: String, default: void 0 },
  status: String,
  suffix: { type: String, default: void 0 },
  value: { type: Array, required: true },
  onBlur: [Function, Array],
  onFocus: [Function, Array],
  onClear: [Function, Array],
  onCompositionStart: [Function, Array],
  onCompositionEnd: [Function, Array],
  onInput: [Function, Array],
  onInputValueChange: [Function, Array],
  onItemRemove: [Function, Array],
  onOpenedChange: [Function, Array],
  onResize: [Function, Array],
  onSearch: [Function, Array]
};
const hiddenBoxStyle = {
  width: 0,
  height: 0,
  display: "flex",
  overflow: "hidden",
  opacity: 0
};
var Selector = /* @__PURE__ */ defineComponent({
  name: "ɵSelector",
  props: selectorProps,
  setup(props, {
    expose,
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-selector`);
    const mergedClearable = computed(() => {
      return !props.disabled && !props.readonly && props.clearable && props.value.length > 0;
    });
    const mergedClearIcon = computed(() => {
      var _a2;
      return (_a2 = props.clearIcon) != null ? _a2 : props.config.clearIcon;
    });
    const mergedSearchable = computed(() => {
      return !props.disabled && !props.readonly && props.searchable === true;
    });
    const mergedSize = useFormSize(props, props.config);
    const mergedSuffix = computed(() => {
      var _a2;
      return (_a2 = props.suffix) != null ? _a2 : mergedSearchable.value && isFocused.value ? "search" : props.config.suffix;
    });
    const showPlaceholder = computed(() => {
      return props.value.length === 0 && !isComposing.value && !inputValue.value;
    });
    const {
      mirrorRef,
      inputRef,
      inputValue,
      isComposing,
      isFocused,
      blur,
      focus,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      clearInput
    } = useInputState(props, mergedSearchable);
    const getBoundingClientRect = () => {
      var _a2;
      return (_a2 = elementRef.value) == null ? void 0 : _a2.getBoundingClientRect();
    };
    expose({
      focus,
      blur,
      clearInput,
      getBoundingClientRect
    });
    const classes = computed(() => {
      const config = props.config;
      const {
        allowInput,
        className,
        borderless = config.borderless,
        multiple,
        status
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [className]: true,
        [prefixCls]: true,
        [`${prefixCls}-${mergedSize.value}`]: true,
        [`${prefixCls}-${status}`]: !!status,
        [`${prefixCls}-allow-input`]: allowInput,
        [`${prefixCls}-borderless`]: borderless,
        [`${prefixCls}-clearable`]: mergedClearable.value,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-focused`]: isFocused.value,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-opened`]: props.opened,
        [`${prefixCls}-readonly`]: props.readonly,
        [`${prefixCls}-searchable`]: mergedSearchable.value,
        [`${prefixCls}-single`]: !multiple
      });
    });
    const handleClick = () => {
      const {
        allowInput,
        disabled,
        opened,
        readonly,
        onOpenedChange
      } = props;
      if (disabled || readonly || opened && (mergedSearchable.value || allowInput)) {
        return;
      }
      callEmit(onOpenedChange, !opened);
    };
    const handleContentMouseDown = (evt) => {
      if (evt.target instanceof HTMLInputElement) {
        return;
      }
      const {
        disabled,
        readonly
      } = props;
      if (disabled || readonly || isFocused.value) {
        evt.preventDefault();
      }
    };
    const handleSuffixMouseDown = (evt) => {
      evt.preventDefault();
    };
    const handleSuffixClick = (evt) => {
      const {
        disabled,
        readonly,
        opened,
        onOpenedChange
      } = props;
      if (disabled || readonly) {
        return;
      }
      evt.stopPropagation();
      callEmit(onOpenedChange, !opened);
    };
    const handleClear = (evt) => {
      const {
        disabled,
        readonly
      } = props;
      if (disabled || readonly) {
        return;
      }
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
      isFocused,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput
    });
    const elementRef = ref();
    const handleResize = () => callEmit(props.onResize, elementRef.value.getBoundingClientRect());
    useResizeObserver(elementRef, handleResize);
    return () => {
      const {
        multiple,
        disabled,
        readonly,
        opened,
        value,
        dataSource,
        maxLabel
      } = props;
      const prefixCls = mergedPrefixCls.value;
      const itemPrefixCls = `${prefixCls}-item`;
      const renderItem = (item) => {
        const {
          key,
          label,
          value: value2,
          rawData
        } = item;
        const _disabled = disabled || item.disabled;
        const removable = multiple && !_disabled && !readonly;
        const itemProps = {
          key,
          disabled: _disabled,
          prefixCls: itemPrefixCls,
          removable,
          value: value2 != null ? value2 : key,
          label,
          onRemove: props.onItemRemove
        };
        const selectedItemSlot = slots.selectedItem;
        if (selectedItemSlot) {
          return selectedItemSlot(itemProps);
        }
        const slotOrName = slots.selectedLabel || slots.label || rawData.customLabel || props.defaultLabelSlotName;
        const selectedLabelRender = isString(slotOrName) ? slots[slotOrName] : slotOrName;
        const labelNode = selectedLabelRender ? selectedLabelRender(rawData) : label;
        return createVNode(Item$1, itemProps, {
          default: () => [labelNode]
        });
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
          const key = "__IDUX_SELECT_MAX_ITEM";
          const itemProps = {
            key,
            prefixCls: itemPrefixCls,
            removable: false
          };
          const overflowedLabelSlot = slots.overflowedLabel || slots.maxLabel;
          const labelNode = overflowedLabelSlot ? overflowedLabelSlot(rest) : `+ ${rest.length} ...`;
          return createVNode(Item$1, itemProps, {
            default: () => [labelNode]
          });
        };
        const overflowSlot = {
          item: renderItem,
          rest: renderRest,
          suffix: () => createVNode(Input, null, null)
        };
        children.push(createVNode(ɵOverflow, {
          "prefixCls": prefixCls,
          "dataSource": dataSource,
          "getKey": (item) => item.key,
          "maxLabel": maxLabel
        }, overflowSlot));
      } else {
        if (value.length > 0 && !isComposing.value && !inputValue.value) {
          dataSource.forEach((item) => children.push(renderItem(item)));
        }
        children.push(createVNode(Input, null, null));
      }
      const suffixProps = {
        name: mergedSuffix.value,
        rotate: !mergedSearchable.value && opened ? 180 : 0
      };
      const suffixNode = slots.suffix ? slots.suffix(suffixProps) : createVNode(IxIcon, suffixProps, null);
      suffixNode && children.push(createVNode("div", {
        "key": "__suffix",
        "class": `${prefixCls}-suffix`,
        "onClick": handleSuffixClick,
        "onMousedown": handleSuffixMouseDown
      }, [suffixNode]));
      if (mergedClearable.value) {
        children.push(createVNode("div", {
          "key": "__clear",
          "class": `${prefixCls}-clear`,
          "onClick": handleClear
        }, [slots.clearIcon ? slots.clearIcon() : createVNode(IxIcon, {
          "name": mergedClearIcon.value
        }, null)]));
      }
      return createVNode("div", {
        "ref": elementRef,
        "class": classes.value,
        "onClick": handleClick
      }, [isFocused.value && !opened && createVNode("span", {
        "style": hiddenBoxStyle,
        "aria-live": "polite"
      }, [value.join(", ")]), createVNode("div", {
        "class": `${prefixCls}-content`,
        "onMousedown": handleContentMouseDown
      }, [children])]);
    };
  }
});
const ɵSelector = Selector;
const loadingProps = {
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
};
var Loading = /* @__PURE__ */ defineComponent({
  name: "ɵLoading",
  props: loadingProps,
  setup(props) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-loading`);
    return () => {
      const prefixCls = mergedPrefixCls.value;
      const {
        duration,
        strokeWidth,
        radius
      } = props;
      const animationDur = `${duration}s`;
      const viewBoxSize = radius * 2;
      const circleLength = Math.PI * 2 * radius;
      const fstArchLength = 0.23 * circleLength;
      const sndArchLength = 0.11 * circleLength;
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
      }, [createVNode("circle", {
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
      }, null)]), createVNode("circle", {
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
      }, null)]), createVNode("circle", {
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
      }, null)])])])]);
    };
  }
});
const ɵLoading = Loading;
const spinProps = {
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
const defaultStrokeWidth = {
  sm: 3,
  md: 3,
  lg: 4
};
const defaultRadius = {
  sm: 14,
  md: 14,
  lg: 24
};
var Spin = /* @__PURE__ */ defineComponent({
  name: "IxSpin",
  props: spinProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-spin`);
    const spinConfig = useGlobalConfig$1("spin");
    const {
      size,
      strokeWidth,
      radius
    } = useSize(props, spinConfig);
    const hasDefaultSlot = computed(() => hasSlot(slots));
    const mergedIcon = computed(() => {
      var _a2;
      return (_a2 = props.icon) != null ? _a2 : spinConfig.icon;
    });
    const mergedTip = computed(() => {
      var _a2;
      return (_a2 = props.tip) != null ? _a2 : spinConfig.tip;
    });
    const {
      spinnerClassName,
      containerClassName
    } = useClasses(props, spinConfig, size, hasDefaultSlot, mergedPrefixCls);
    const renderContent2 = () => {
      if (!slots.default) {
        return null;
      }
      return createVNode("div", {
        "class": containerClassName.value
      }, [slots.default()]);
    };
    const renderTip = () => {
      if (!mergedTip.value) {
        return null;
      }
      return createVNode("div", {
        "class": `${mergedPrefixCls.value}-spinner-tip`
      }, [mergedTip.value]);
    };
    const renderIcon = () => {
      const iconCls = `${mergedPrefixCls.value}-spinner-icon`;
      if (slots.icon) {
        return createVNode("div", {
          "class": iconCls
        }, [slots.icon()]);
      }
      if (mergedIcon.value) {
        const iconStyle = normalizeStyle(props.duration && {
          animationDuration: `${props.duration}s`
        });
        return createVNode("div", {
          "class": [iconCls, props.rotate && `${iconCls}--rotate`],
          "style": iconStyle
        }, [createVNode(IxIcon, {
          "name": mergedIcon.value
        }, null)]);
      }
      return createVNode("div", {
        "class": iconCls
      }, [createVNode(ɵLoading, {
        "strokeWidth": strokeWidth.value,
        "radius": radius.value,
        "duration": props.duration
      }, null)]);
    };
    const renderSpinner = () => {
      if (!props.spinning) {
        return null;
      }
      return createVNode("div", {
        "class": spinnerClassName.value
      }, [renderIcon(), renderTip()]);
    };
    return () => createVNode("div", {
      "class": mergedPrefixCls.value
    }, [renderSpinner(), renderContent2()]);
  }
});
const useSize = (props, config) => {
  const size = computed(() => {
    var _a2;
    return (_a2 = props.size) != null ? _a2 : config.size;
  });
  const strokeWidth = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.strokeWidth) != null ? _b : (_a2 = config.strokeWidth) == null ? void 0 : _a2[size.value]) != null ? _c : defaultStrokeWidth[size.value];
  });
  const radius = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.radius) != null ? _b : (_a2 = config.radius) == null ? void 0 : _a2[size.value]) != null ? _c : defaultRadius[size.value];
  });
  return {
    size,
    strokeWidth,
    radius
  };
};
const useClasses = (props, config, size, hasDefaultSlot, mergedPrefixCls) => {
  const prefixCls = mergedPrefixCls.value;
  const spinnerClassName = computed(() => {
    var _a2;
    const tipAlign = (_a2 = props.tipAlign) != null ? _a2 : config.tipAlign;
    return normalizeClass([`${prefixCls}-spinner`, `${prefixCls}-spinner-tip-${tipAlign}`, `${prefixCls}-spinner-${size.value}`]);
  });
  const containerClassName = computed(() => {
    if (!hasDefaultSlot.value) {
      return [];
    }
    return normalizeClass([`${prefixCls}-container`, props.spinning ? `${prefixCls}-container-blur` : ""]);
  });
  return {
    spinnerClassName,
    containerClassName
  };
};
const IxSpin = Spin;
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
function useContainerHeight(props, containerRef) {
  const [height, setHeight] = useState(0);
  useResizeObserver(containerRef, (entry) => {
    const { contentRect } = entry;
    setHeight(contentRect.height);
  });
  return computed(() => isNumber(props.height) ? props.height : height.value);
}
function useGetKey(props) {
  return computed(() => {
    const getKey = props.getKey;
    if (isString(getKey)) {
      return (item) => {
        const key = item[getKey];
        if (key === void 0) {
          Logger.warn("cdk/scroll", "Each item in dataSource should have a unique `key` prop.");
        }
        return key;
      };
    }
    return getKey;
  });
}
function useHeights() {
  const itemMap = /* @__PURE__ */ new Map();
  const heights = /* @__PURE__ */ new Map();
  const heightsUpdateMark = ref(0);
  let heightUpdateId = 0;
  const collectHeights = () => {
    heightUpdateId += 1;
    const currentId = heightUpdateId;
    Promise.resolve().then(() => {
      if (currentId !== heightUpdateId) {
        return;
      }
      itemMap.forEach((element, key) => {
        if (element && element.offsetParent) {
          const { offsetHeight } = element;
          if (heights.get(key) !== offsetHeight) {
            heights.set(key, offsetHeight);
          }
        }
      });
      heightsUpdateMark.value++;
    });
  };
  const setItem = (key, item) => {
    const element = convertElement(item);
    if (element) {
      itemMap.set(key, element);
      collectHeights();
    } else {
      itemMap.delete(key);
    }
  };
  return { heights, collectHeights, heightsUpdateMark, setItem };
}
const keepInRange = (maxScrollHeight, newScrollTop) => {
  let newTop = Math.max(newScrollTop, 0);
  if (!Number.isNaN(maxScrollHeight)) {
    newTop = Math.min(newTop, maxScrollHeight);
  }
  return newTop;
};
function useScrollPlacement(props, holderRef, scrollTop, scrollHeight, containerHeight, changeScrollTop) {
  const maxScrollHeight = computed(() => {
    const height = scrollHeight.value;
    return height > 0 ? Math.max(height - containerHeight.value, 0) : NaN;
  });
  const syncScrollTop = (newTop, setHolderScrollTop) => {
    const value = isFunction(newTop) ? newTop(scrollTop.value) : newTop;
    const alignedTop = keepInRange(maxScrollHeight.value, value);
    const holderElement = holderRef.value;
    if (holderElement && setHolderScrollTop) {
      holderElement.scrollTop = alignedTop;
    }
    changeScrollTop(alignedTop);
  };
  const handleScroll = (evt) => {
    const { scrollTop: newScrollTop } = evt.currentTarget;
    if (newScrollTop !== scrollTop.value) {
      syncScrollTop(newScrollTop);
    }
    callEmit(props.onScroll, evt);
    if (newScrollTop >= maxScrollHeight.value) {
      callEmit(props.onScrolledBottom);
    }
  };
  return { syncScrollTop, handleScroll };
}
function useScrollState(props, fillerRef, useVirtual, getKey, scrollTop, containerHeight, heightUpdatedMark, heights) {
  const scrollHeight = ref(0);
  const scrollOffset = ref();
  const startIndex = ref(0);
  const endIndex = ref(0);
  watch(
    [useVirtual, () => props.dataSource, () => props.itemHeight, containerHeight, getKey, scrollTop, heightUpdatedMark],
    ([virtual, dataSource, itemHeight, height, getKey2, scrollTop2]) => {
      const {
        scrollHeight: totalHeight,
        offset,
        start,
        end
      } = calcState(fillerRef, virtual, dataSource, itemHeight, height, getKey2, scrollTop2, heights);
      scrollHeight.value = totalHeight;
      scrollOffset.value = offset;
      startIndex.value = start;
      endIndex.value = end;
    },
    { immediate: true }
  );
  return { scrollHeight, scrollOffset, startIndex, endIndex };
}
function calcState(fillerRef, virtual, dataSource, itemHeight, height, getKey, scrollTop, heights) {
  var _a2, _b;
  const dataLength = dataSource.length;
  if (!virtual || dataLength === 0 || itemHeight * dataLength <= height) {
    return { scrollHeight: virtual ? (_b = (_a2 = fillerRef.value) == null ? void 0 : _a2.offsetHeight) != null ? _b : 0 : 0, start: 0, end: dataLength - 1 };
  }
  let scrollHeight = 0;
  let offset;
  let start;
  let end;
  for (let index = 0; index < dataLength; index += 1) {
    const item = dataSource[index];
    const key = getKey(item);
    const cacheHeight = heights.get(key);
    const currentItemBottom = scrollHeight + (cacheHeight === void 0 ? itemHeight : cacheHeight);
    if (currentItemBottom >= scrollTop && start === void 0) {
      start = index;
      offset = scrollHeight;
    }
    if (currentItemBottom > scrollTop + height && end === void 0) {
      end = index;
    }
    scrollHeight = currentItemBottom;
  }
  if (start === void 0) {
    start = 0;
    offset = 0;
  }
  if (end === void 0) {
    end = dataLength - 1;
  }
  end = Math.min(end + 1, dataLength);
  return { scrollHeight, offset, start, end };
}
function useScrollTo(props, holderRef, getKey, heights, collectHeight, syncScrollTop) {
  let refId;
  return (option) => {
    if (isNil(option)) {
      return;
    }
    cancelRAF(refId);
    const { dataSource, itemHeight } = props;
    if (typeof option === "number") {
      syncScrollTop(option, true);
    } else if (typeof option === "object") {
      const { align, offset = 0 } = option;
      let index;
      if ("index" in option) {
        index = option.index;
      } else {
        index = dataSource.findIndex((item) => getKey.value(item) === option.key);
      }
      const syncScroll = (times, targetAlign) => {
        const holderElement = holderRef.value;
        if (times < 0 || !holderElement) {
          return;
        }
        const height = holderElement.clientHeight;
        let needCollectHeight = false;
        let newTargetAlign = targetAlign;
        if (height > 0) {
          const mergedAlign = targetAlign || align;
          let stackTop = 0;
          let itemTop = 0;
          let itemBottom = 0;
          for (let i = 0; i <= index; i++) {
            const itemKey = getKey.value(dataSource[i]);
            itemTop = stackTop;
            const cacheHeight = heights.get(itemKey);
            itemBottom = itemTop + (isNil(cacheHeight) ? itemHeight : cacheHeight);
            stackTop = itemBottom;
            if (i === index && isNil(cacheHeight)) {
              needCollectHeight = true;
            }
          }
          let targetTop = null;
          switch (mergedAlign) {
            case "top":
              targetTop = itemTop - offset;
              break;
            case "bottom":
              targetTop = itemBottom - height + offset;
              break;
            default: {
              const { scrollTop } = holderElement;
              const scrollBottom = scrollTop + height;
              if (itemTop < scrollTop) {
                newTargetAlign = "top";
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = "bottom";
              }
            }
          }
          if (targetTop !== null && targetTop !== holderElement.scrollTop) {
            syncScrollTop(targetTop, true);
          }
        }
        refId = rAF(() => {
          if (needCollectHeight) {
            collectHeight();
          }
          syncScroll(times - 1, newTargetAlign);
        });
      };
      syncScroll(3);
    }
  };
}
const virtualScrollToken = Symbol("virtualScrollToken");
var Holder = /* @__PURE__ */ defineComponent({
  setup(_, {
    slots
  }) {
    const {
      props,
      slots: virtualScrollSlots,
      holderRef,
      fillerRef,
      collectHeights,
      scrollHeight,
      scrollOffset,
      handleScroll
    } = inject(virtualScrollToken);
    const style = computed(() => {
      const {
        height,
        fullHeight
      } = props;
      if (!height || height <= 0) {
        return void 0;
      }
      if (isString(height)) {
        return {
          height
        };
      }
      return {
        [fullHeight ? "height" : "maxHeight"]: convertCssPixel(height)
      };
    });
    const fillerStyle = computed(() => {
      if (scrollOffset.value === void 0) {
        return void 0;
      }
      return {
        height: `${scrollHeight.value}px`
      };
    });
    const contentStyle = computed(() => {
      const offset = scrollOffset.value;
      if (offset === void 0) {
        return void 0;
      }
      return {
        transform: `translateY(${offset}px)`,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0
      };
    });
    const contentRef = ref();
    const onContentResize = throttle(collectHeights, 16);
    onMounted(() => onResize(contentRef.value, onContentResize));
    onBeforeUnmount(() => offResize(contentRef.value, onContentResize));
    return () => {
      var _a2;
      const children = slots.default();
      const contentRender = (_a2 = virtualScrollSlots.content) != null ? _a2 : props.contentRender;
      return createVNode("div", {
        "ref": holderRef,
        "class": "cdk-virtual-scroll-holder",
        "style": style.value,
        "onScroll": handleScroll
      }, [createVNode("div", {
        "ref": fillerRef,
        "class": "cdk-virtual-scroll-filler",
        "style": fillerStyle.value
      }, [createVNode("div", {
        "ref": contentRef,
        "class": "cdk-virtual-scroll-content",
        "style": contentStyle.value
      }, [contentRender ? contentRender(children) : children])])]);
    };
  }
});
const Item = (_, {
  slots
}) => {
  const [firstChild] = slots.default();
  return firstChild;
};
const virtualListProps = {
  contentRender: { type: Function, default: void 0 },
  dataSource: { type: Array, default: () => [] },
  fullHeight: { type: Boolean, default: false },
  getKey: { type: [String, Function], default: "key" },
  height: { type: [Number, String], default: 0 },
  itemHeight: { type: Number, default: 0 },
  itemRender: { type: Function, default: void 0 },
  virtual: { type: Boolean, default: true },
  onScroll: [Function, Array],
  onScrolledChange: [Function, Array],
  onScrolledBottom: [Function, Array]
};
var VirtualScroll = /* @__PURE__ */ defineComponent({
  name: "CdkVirtualScroll",
  props: virtualListProps,
  setup(props, {
    expose,
    slots
  }) {
    const useVirtual = computed(() => props.virtual && props.itemHeight > 0);
    const getKey = useGetKey(props);
    const {
      heights,
      collectHeights,
      heightsUpdateMark,
      setItem
    } = useHeights();
    const containerRef = ref();
    const holderRef = ref();
    const fillerRef = ref();
    const containerHeight = useContainerHeight(props, containerRef);
    const [scrollTop, changeScrollTop] = useState(0);
    const {
      scrollHeight,
      scrollOffset,
      startIndex,
      endIndex
    } = useScrollState(props, fillerRef, useVirtual, getKey, scrollTop, containerHeight, heightsUpdateMark, heights);
    const {
      syncScrollTop,
      handleScroll
    } = useScrollPlacement(props, holderRef, scrollTop, scrollHeight, containerHeight, changeScrollTop);
    provide(virtualScrollToken, {
      props,
      slots,
      holderRef,
      fillerRef,
      useVirtual,
      collectHeights,
      scrollTop,
      scrollHeight,
      scrollOffset,
      syncScrollTop,
      handleScroll
    });
    const scrollTo = useScrollTo(props, holderRef, getKey, heights, collectHeights, syncScrollTop);
    expose({
      scrollTo,
      holderRef
    });
    const mergedData = computed(() => props.dataSource.slice(startIndex.value, endIndex.value + 1));
    watch(mergedData, (data) => callEmit(props.onScrolledChange, startIndex.value, endIndex.value, data));
    return () => {
      var _a2;
      const getKeyFn = getKey.value;
      const start = startIndex.value;
      const itemRender = (_a2 = slots.item) != null ? _a2 : props.itemRender;
      const children = mergedData.value.map((item, index) => {
        const key = getKeyFn(item);
        return createVNode(Item, {
          "key": key,
          "ref": (instance) => setItem(key, instance)
        }, {
          default: () => [itemRender == null ? void 0 : itemRender({
            item,
            index: start + index
          })]
        });
      });
      return createVNode("div", {
        "ref": containerRef,
        "class": "cdk-virtual-scroll"
      }, [createVNode(Holder, null, {
        default: () => [children]
      })]);
    };
  }
});
const CdkVirtualScroll = VirtualScroll;
const EmptySimpleImage = () => createVNode("svg", {
  "width": "80",
  "height": "60",
  "viewBox": "0 0 80 60",
  "xmlns": "http://www.w3.org/2000/svg"
}, [createVNode("g", {
  "fill": "none",
  "fill-rule": "nonzero"
}, [createVNode("ellipse", {
  "cx": "40",
  "cy": "53.29",
  "fill": "#F7F9FC",
  "rx": "25",
  "ry": "3.29"
}, null), createVNode("path", {
  "fill": "#EDF1F7",
  "d": "M27.935 18h24.13c.025 0 .048.012.063.033L60 29H20l7.872-10.967a.078.078 0 0 1 .063-.033z"
}, null), createVNode("path", {
  "fill": "#E3E7EE",
  "d": "M52.868 8.08l1.484 1.245c.013.01.015.03.004.044l-3.817 4.548a.031.031 0 0 1-.044.004l-1.484-1.246a.031.031 0 0 1-.004-.044l3.817-4.548a.031.031 0 0 1 .044-.004zm-26.373 0a.031.031 0 0 1 .044.003l3.817 4.548a.031.031 0 0 1-.004.044l-1.484 1.246a.031.031 0 0 1-.044-.004l-3.817-4.548a.031.031 0 0 1 .004-.044l1.484-1.246zM40.65 4c.018 0 .032.014.032.031v7.938a.031.031 0 0 1-.032.031h-1.937a.031.031 0 0 1-.031-.031V4.03c0-.017.014-.031.03-.031h1.938z"
}, null), createVNode("path", {
  "fill": "#FAFCFE",
  "d": "M29.936 20h20.128c.026 0 .05.012.064.033L55 27H25l4.872-6.967a.078.078 0 0 1 .064-.033z"
}, null), createVNode("path", {
  "fill": "#E1E5EB",
  "d": "M20 29h40v23.922a.078.078 0 0 1-.078.078H20.078a.078.078 0 0 1-.078-.078V29z"
}, null), createVNode("rect", {
  "width": "14",
  "height": "3",
  "x": "33",
  "y": "43",
  "fill": "#FFF",
  "rx": ".4"
}, null)])]);
const EmptyDefaultImage = () => createVNode("svg", {
  "width": "240",
  "height": "150",
  "viewBox": "0 0 240 150",
  "xmlns": "http://www.w3.org/2000/svg"
}, [createVNode("defs", null, [createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_a",
  "x1": "98.732%",
  "x2": "1.144%",
  "y1": "35.249%",
  "y2": "64.751%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_b",
  "x1": "98.732%",
  "x2": "-4.28%",
  "y1": "29.211%",
  "y2": "74.009%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_c",
  "x1": "98.732%",
  "x2": "1.773%",
  "y1": "34.607%",
  "y2": "65.393%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_d",
  "x1": "98.732%",
  "x2": "-4.054%",
  "y1": "31.668%",
  "y2": "69.567%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_e",
  "x1": "109.243%",
  "x2": "2.442%",
  "y1": "57.269%",
  "y2": "42.07%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_f",
  "x1": "109.243%",
  "x2": "16.437%",
  "y1": "56.689%",
  "y2": "45.02%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_g",
  "x1": "106.552%",
  "x2": "-9.479%",
  "y1": "57.117%",
  "y2": "40.471%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_h",
  "x1": "89.696%",
  "x2": "2.512%",
  "y1": "55.015%",
  "y2": "41.695%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#EBEDF1",
  "stop-opacity": "0"
}, null), createVNode("stop", {
  "offset": "50.721%",
  "stop-color": "#D3D7DE"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#D3D7DE",
  "stop-opacity": "0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_i",
  "x1": "0%",
  "x2": "89.377%",
  "y1": "49.118%",
  "y2": "50%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#CDD2DA",
  "stop-opacity": ".531"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC",
  "stop-opacity": ".178"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_j",
  "x1": "3.227%",
  "x2": "87.16%",
  "y1": "66.363%",
  "y2": "73.709%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC"
}, null)]), createVNode("path", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_k",
  "d": "M86.24 47.88L77.495 61.93a.234.234 0 0 0 .301.335l8.446-4.118v-9.73l31.681-13.992L86.241 47.88z"
}, null), createVNode("filter", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_l",
  "width": "102.5%",
  "height": "103.6%",
  "x": "-1.2%",
  "y": "-1.8%",
  "filterUnits": "objectBoundingBox"
}, [createVNode("feGaussianBlur", {
  "in": "SourceAlpha",
  "result": "shadowBlurInner1",
  "stdDeviation": ".5"
}, null), createVNode("feOffset", {
  "in": "shadowBlurInner1",
  "result": "shadowOffsetInner1"
}, null), createVNode("feComposite", {
  "in": "shadowOffsetInner1",
  "in2": "SourceAlpha",
  "k2": "-1",
  "k3": "1",
  "operator": "arithmetic",
  "result": "shadowInnerInner1"
}, null), createVNode("feColorMatrix", {
  "in": "shadowInnerInner1",
  "values": "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_m",
  "x1": "31.515%",
  "x2": "73.396%",
  "y1": "0%",
  "y2": "100%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#F7F9FC"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#E1E5EB"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_n",
  "x1": "35.265%",
  "x2": "64.735%",
  "y1": "20.531%",
  "y2": "71.964%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC"
}, null)]), createVNode("path", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_o",
  "d": "M0 15.191L31.462 0v38.684a.376.376 0 0 1-.181.322L0 57.956V15.19z"
}, null), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_p",
  "x1": "0%",
  "y1": "45.743%",
  "y2": "53.173%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC"
}, null)]), createVNode("path", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_q",
  "d": "M0 13.457l38.276 13.049L69.74 11.457 31.682 0z"
}, null), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_r",
  "x1": "13.714%",
  "x2": "13.714%",
  "y1": "13.836%",
  "y2": "113.032%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#F7F9FC"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#E1E5EB"
}, null)]), createVNode("path", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_t",
  "d": "M0 13.457l38.276 13.049L69.74 11.457 31.682 0z"
}, null), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_u",
  "x1": "50%",
  "x2": "54.931%",
  "y1": "42.206%",
  "y2": "57.223%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#FFF"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_w",
  "x1": "2.15%",
  "y1": "41.152%",
  "y2": "53.34%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC"
}, null)]), createVNode("path", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_y",
  "d": "M124.517 60.93l-.05 1.737 7.545 14.903c.092.181.31.257.494.171l33.014-15.395a.376.376 0 0 0 .162-.536l-9.703-15.93-31.462 15.05z"
}, null), createVNode("filter", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_x",
  "width": "102.4%",
  "height": "103.1%",
  "x": "-1.2%",
  "y": "-1.6%",
  "filterUnits": "objectBoundingBox"
}, [createVNode("feGaussianBlur", {
  "in": "SourceAlpha",
  "result": "shadowBlurInner1",
  "stdDeviation": ".5"
}, null), createVNode("feOffset", {
  "in": "shadowBlurInner1",
  "result": "shadowOffsetInner1"
}, null), createVNode("feComposite", {
  "in": "shadowOffsetInner1",
  "in2": "SourceAlpha",
  "k2": "-1",
  "k3": "1",
  "operator": "arithmetic",
  "result": "shadowInnerInner1"
}, null), createVNode("feColorMatrix", {
  "in": "shadowInnerInner1",
  "values": "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.353775131 0"
}, null)]), createVNode("linearGradient", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_z",
  "x1": "0%",
  "y1": "38.098%",
  "y2": "58.871%"
}, [createVNode("stop", {
  "offset": "0%",
  "stop-color": "#E1E5EB"
}, null), createVNode("stop", {
  "offset": "100%",
  "stop-color": "#BEC3CC"
}, null)])]), createVNode("g", {
  "fill": "none",
  "fill-rule": "evenodd"
}, [createVNode("g", {
  "stroke-dasharray": "4,10",
  "stroke-width": ".8"
}, [createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_a)",
  "d": "M.325 103.602L191.027.344"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_b)",
  "d": "M117.37 139.398l125.286-80.541"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_c)",
  "d": "M6.195 132.145L225.446 10.67"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_d)",
  "d": "M76.264 130.444l149.182-90.173"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_e)",
  "d": "M23.405 37.861l191.371 72.969-191.37-72.969z"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_f)",
  "d": "M32.354 14.456L237.493 89.49 32.354 14.456z"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_g)",
  "d": "M13.768 85.36l151.444 57.136L13.768 85.36z"
}, null), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_h)",
  "d": "M15.144 58.513l207.204 79.164L15.144 58.513z"
}, null)]), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_i)",
  "fill-rule": "nonzero",
  "d": "M124.157 103.884l31.966 11.166 40.333-25.333-40.477-14.692z",
  "opacity": ".424"
}, null), createVNode("use", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_j)",
  "xlink:href": "#IDUX_EMPTY_DEFAULT_IMAGE_k"
}, null), createVNode("use", {
  "fill": "#000",
  "filter": "url(#IDUX_EMPTY_DEFAULT_IMAGE_l)",
  "xlink:href": "#IDUX_EMPTY_DEFAULT_IMAGE_k"
}, null), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_m)",
  "fill-rule": "nonzero",
  "d": "M86.24 47.88l38.277 13.05v42.907L86.481 89.143a.376.376 0 0 1-.24-.35V47.88z"
}, null), createVNode("path", {
  "fill": "#BEC3CC",
  "fill-rule": "nonzero",
  "d": "M93.681 63.157l21.828 6.506c.608.181 1.025.74 1.025 1.375a.797.797 0 0 1-1.025.763L93.68 65.296a1.435 1.435 0 0 1-1.024-1.375.797.797 0 0 1 1.024-.764zM93.683 72.243l14.497 4.261a1.429 1.429 0 0 1 1.026 1.37.8.8 0 0 1-1.026.769L93.683 74.38a1.429 1.429 0 0 1-1.026-1.37.8.8 0 0 1 1.026-.768z",
  "opacity": ".65"
}, null), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_n)",
  "fill-rule": "nonzero",
  "d": "M0 15.191L31.462 0v38.684a.376.376 0 0 1-.181.322L0 57.956V15.19z",
  "transform": "translate(124.517 45.88)"
}, null), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_p)",
  "fill-rule": "nonzero",
  "d": "M86.24 47.88l38.277 13.05 31.462-15.05-38.057-11.456z"
}, null), createVNode("g", {
  "transform": "translate(86.24 34.424)"
}, [createVNode("mask", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_s",
  "fill": "#fff"
}, [createVNode("use", {
  "xlink:href": "#IDUX_EMPTY_DEFAULT_IMAGE_q"
}, null)]), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_r)",
  "fill-rule": "nonzero",
  "d": "M31.684-8.02L82.34-4.687V57.87l-50.655-1.334z",
  "mask": "url(#IDUX_EMPTY_DEFAULT_IMAGE_s)"
}, null)]), createVNode("g", {
  "transform": "translate(86.24 34.424)"
}, [createVNode("mask", {
  "id": "IDUX_EMPTY_DEFAULT_IMAGE_v",
  "fill": "#fff"
}, [createVNode("use", {
  "xlink:href": "#IDUX_EMPTY_DEFAULT_IMAGE_t"
}, null)]), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_u)",
  "d": "M31.689.124l37.726 11.358L38.269 26.38.328 13.445z",
  "mask": "url(#IDUX_EMPTY_DEFAULT_IMAGE_v)"
}, null)]), createVNode("path", {
  "fill": "url(#IDUX_EMPTY_DEFAULT_IMAGE_w)",
  "fill-rule": "nonzero",
  "d": "M124.517 60.93l-.05 1.737 7.545 14.903c.092.181.31.257.494.171l33.014-15.395a.376.376 0 0 0 .162-.536l-9.703-15.93-31.462 15.05z"
}, null), createVNode("g", {
  "fill": "#000"
}, [createVNode("use", {
  "filter": "url(#IDUX_EMPTY_DEFAULT_IMAGE_x)",
  "xlink:href": "#IDUX_EMPTY_DEFAULT_IMAGE_y"
}, null)]), createVNode("path", {
  "stroke": "url(#IDUX_EMPTY_DEFAULT_IMAGE_z)",
  "stroke-dasharray": "2.406",
  "stroke-width": ".8",
  "d": "M118.145 48c19.263-2.343 28.895-8.87 28.895-19.582 0-16.066-27.203-1.937-13.381 5.75 13.822 7.69 29.746-6.203 32.892-16.93"
}, null)])]);
const emptyProps = {
  description: String,
  icon: [String, Object],
  image: [String, Object],
  simple: Boolean
};
var Empty$1 = /* @__PURE__ */ defineComponent({
  name: "IxEmpty",
  props: emptyProps,
  setup(props, {
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const locale = useGlobalConfig$1("locale");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-empty`);
    const config = useGlobalConfig$1("empty");
    const mergedDescription = computed(() => {
      var _a2;
      return (_a2 = props.description) != null ? _a2 : locale.empty.description;
    });
    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-simple`]: props.simple
      });
    });
    return () => {
      const prefixCls = mergedPrefixCls.value;
      const descriptionNode = slots.description ? slots.description() : mergedDescription.value;
      return createVNode("div", {
        "class": classes.value
      }, [createVNode("div", {
        "class": `${prefixCls}-image`
      }, [renderImage(props, slots, config)]), descriptionNode && createVNode("div", {
        "class": `${prefixCls}-description`
      }, [descriptionNode]), slots.default && createVNode("div", {
        "class": `${prefixCls}-content`
      }, [slots.default()])]);
    };
  }
});
function renderImage(props, slots, config) {
  var _a2, _b;
  if (slots.image) {
    return slots.image(props);
  }
  const image = (_a2 = props.image) != null ? _a2 : config.image;
  if (image) {
    if (isString(image)) {
      return createVNode("img", {
        "src": image,
        "alt": "empty image"
      }, null);
    }
    return image;
  }
  const icon = (_b = props.icon) != null ? _b : config.icon;
  if (icon) {
    return isString(icon) ? createVNode(IxIcon, {
      "name": icon
    }, null) : icon;
  }
  return props.simple ? createVNode(EmptySimpleImage, null, null) : createVNode(EmptyDefaultImage, null, null);
}
const IxEmpty = Empty$1;
const Empty = (props, {
  slots
}) => {
  if (slots.empty) {
    return slots.empty();
  }
  const {
    empty
  } = props;
  const emptyProps2 = isString(empty) ? {
    simple: empty === "simple"
  } : empty;
  return createVNode(IxEmpty, emptyProps2, null);
};
Empty.displayName = "ɵEmpty";
const ɵEmpty = Empty;
function useActiveState(props, inputValue) {
  const [activeValue, setActiveValue] = useState(void 0);
  watch(
    inputValue,
    (value) => {
      if (!props.allowInput || !value) {
        return;
      }
      setActiveValue(value);
    },
    {
      immediate: true
    }
  );
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
    if (key === void 0 && labelKey !== "value") {
      key = record["value"];
    }
    if (key === void 0) {
      Logger.warn("components/select", "Each record in dataSource should have a unique `key` prop.");
    }
    return key;
  } : getKeyFn;
}
function useKeyboardEvents(inputValue, selectedValue, isMultiple, activeValue, changeActiveIndex, changeSelected, handleRemove, clearInput, setOverlayOpened, blur) {
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
        !isNil(key) && changeSelected(key);
        clearInput();
        if (!isMultiple.value) {
          setOverlayOpened(false);
          blur();
        }
        break;
      }
      case "Backspace": {
        const selectedLength = selectedValue.value.length;
        if (!inputValue.value && selectedLength) {
          handleRemove(selectedValue.value[selectedLength - 1]);
        }
        break;
      }
      case "Escape":
        evt.preventDefault();
        setOverlayOpened(false);
        break;
    }
  };
}
const optionKey = Symbol("IxSelectOption");
const SelectOption = () => {
};
SelectOption.displayName = "IxSelectOption";
SelectOption[optionKey] = true;
const optionGroupKey = Symbol("IxSelectOptionGroup");
const SelectOptionGroup = () => {
};
SelectOptionGroup.displayName = "IxSelectOptionGroup";
SelectOptionGroup[optionGroupKey] = true;
function generateOption(value) {
  const rawData = { key: value, label: value };
  return { key: value, label: value, type: "item", rawData };
}
function useConvertedOptions(props, slots) {
  return computed(() => {
    var _a2, _b;
    return (_b = props.dataSource) != null ? _b : convertOptions((_a2 = slots.default) == null ? void 0 : _a2.call(slots));
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
const filterKeys = [optionKey, optionGroupKey];
function convertOptions(nodes) {
  const convertedOptions = [];
  flattenNode(nodes, { key: filterKeys }).forEach((node, index) => {
    var _a2, _b;
    const type = node.type;
    const slots = (_a2 = node.children) != null ? _a2 : {};
    const props = (_b = node.props) != null ? _b : {};
    const isOption = type[optionKey];
    if (isOption) {
      const { key, disabled, label, value } = props;
      const { label: customLabel, default: customLabel2 } = slots;
      const _disabled = disabled || disabled === "";
      const option = {
        key: value != null ? value : key,
        disabled: _disabled,
        label,
        value,
        customLabel: customLabel != null ? customLabel : customLabel2
      };
      convertedOptions.push(option);
    } else {
      const { key = index, label, children } = props;
      const { label: customLabel, default: defaultSlot } = slots;
      const _children = children != null ? children : convertOptions(defaultSlot == null ? void 0 : defaultSlot());
      convertedOptions.push({ key, label, children: _children, customLabel });
    }
  });
  return convertedOptions;
}
function useFilteredOptions(props, options, inputValue, mergedLabelKey) {
  const searchFilter = useSearchFn(props, mergedLabelKey);
  return computed(() => {
    const _options = options.value;
    const searchValue = inputValue.value;
    if (!searchValue) {
      return _options;
    }
    const filter = searchFilter.value;
    const filteredOptions = filterOptions(_options, props.allowInput, searchValue, filter);
    return filteredOptions;
  });
}
function filterOptions(flattenedOptions, allowInput, searchValue, filter) {
  const filteredOptions = !filter ? flattenedOptions : flattenedOptions.filter((option) => filter(option.rawData, searchValue));
  if (allowInput) {
    const matchedOption = filteredOptions.find((option) => option.label === searchValue);
    if (!matchedOption) {
      return [generateOption(searchValue), ...filteredOptions];
    }
  }
  return filteredOptions;
}
function flattenOptions(options, childrenKey, getKeyFn, labelKey) {
  const mergedOptions = [];
  const appendOption = (item, index) => mergedOptions.push(parseOption(item, (item2) => {
    var _a2;
    return (_a2 = getKeyFn(item2)) != null ? _a2 : index;
  }, childrenKey, labelKey));
  options == null ? void 0 : options.forEach((item, index) => {
    const children = item[childrenKey];
    appendOption(item, index);
    if (children && children.length > 0) {
      children.forEach((child) => {
        appendOption(child);
      });
    }
  });
  return mergedOptions;
}
function parseOption(option, getKey, childrenKey, labelKey) {
  const children = option[childrenKey];
  return {
    key: getKey(option),
    label: option[labelKey],
    disabled: !!option.disabled,
    type: children && children.length > 0 ? "group" : "item",
    rawData: option
  };
}
function useSearchFn(props, mergedLabelKey) {
  return computed(() => {
    const searchFn = props.searchFn;
    if (isFunction(searchFn)) {
      return searchFn;
    }
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
function useOverlayState(props, config, triggerRef) {
  const overlayRef = ref();
  const [overlayWidth, setOverlayWidth] = useState("");
  const overlayStyle = computed(() => {
    const { overlayMatchWidth = config.overlayMatchWidth } = props;
    return { [overlayMatchWidth ? "width" : "minWidth"]: overlayWidth.value };
  });
  const [overlayOpened, setOverlayOpened] = useControlledProp(props, "open", false);
  const updateOverlay = (rect) => {
    var _a2, _b;
    if (rect) {
      const { width } = rect;
      if (width > 0) {
        setOverlayWidth(convertCssPixel(width));
        overlayOpened.value && ((_a2 = overlayRef.value) == null ? void 0 : _a2.updatePopper());
      }
    } else {
      overlayOpened.value && ((_b = overlayRef.value) == null ? void 0 : _b.updatePopper());
    }
  };
  onMounted(() => {
    if (props.autofocus) {
      setOverlayOpened(true);
    }
    watchEffect(() => {
      const overlayInstance = overlayRef.value;
      if (overlayInstance && overlayOpened.value) {
        updateOverlay(triggerRef.value.getBoundingClientRect());
      }
    });
  });
  return { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened };
}
function usePanelProps(props, valueRef, activeValue, setActiveValue, onOptionClick) {
  return computed(() => ({
    activeValue: activeValue.value,
    selectedKeys: convertArray(valueRef.value),
    childrenKey: props.childrenKey,
    customAdditional: props.customAdditional,
    empty: props.empty,
    getKey: props.getKey,
    labelKey: props.labelKey,
    multiple: props.multiple,
    multipleLimit: props.multipleLimit,
    virtual: props.virtual,
    "onUpdate:activeValue": setActiveValue,
    onOptionClick,
    onScroll: props.onScroll,
    onScrolledChange: props.onScrolledChange,
    onScrolledBottom: props.onScrolledBottom,
    _virtualScrollHeight: props.overlayHeight,
    _virtualScrollItemHeight: props.overlayItemHeight
  }));
}
function useSelectedState$1(props, accessor, optionKeyMap) {
  const selectedValue = computed(() => convertArray(accessor.value));
  const selectedOptions = computed(
    () => selectedValue.value.map((value) => {
      var _a2;
      return (_a2 = optionKeyMap.value.get(value)) != null ? _a2 : generateOption(value);
    })
  );
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
    if (selectedValue.value.length < props.multipleLimit) {
      setSelectedValue([...currValue, key]);
    }
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
const SELECT_PANEL_DATA_TOKEN = Symbol("SELECT_PANEL_DATA_TOKEN");
const selectPanelContext = Symbol("selectPanelContext");
function renderOptionLabel(slots, rawData, label) {
  var _a2;
  const labelRender = (_a2 = rawData.customLabel) != null ? _a2 : "optionLabel";
  const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender;
  return labelSlot ? labelSlot(rawData) : label;
}
const defaultStyle = {
  height: 0,
  width: 0,
  overflow: "hidden"
};
const ListBox = () => {
  const {
    slots,
    selectedKeys,
    activeIndex,
    flattenedOptions
  } = inject(selectPanelContext);
  const currSelectedKeys = selectedKeys.value;
  return createVNode("div", {
    "role": "listbox",
    "style": defaultStyle
  }, [renderOption(slots, flattenedOptions.value[activeIndex.value - 1], currSelectedKeys), renderOption(slots, flattenedOptions.value[activeIndex.value], currSelectedKeys), renderOption(slots, flattenedOptions.value[activeIndex.value + 1], currSelectedKeys)]);
};
const renderOption = (slots, option, selectedValue) => {
  if (!option) {
    return void 0;
  }
  const {
    key,
    label,
    rawData
  } = option;
  const selected = selectedValue === key;
  return createVNode("div", {
    "key": key,
    "role": "option",
    "aria-label": label,
    "aria-selected": selected
  }, [renderOptionLabel(slots, rawData, label)]);
};
const selectPanelProps = {
  activeValue: { type: [String, Number, Symbol], default: void 0 },
  selectedKeys: { type: Array, default: void 0 },
  childrenKey: { type: String, default: void 0 },
  customAdditional: { type: Function, default: void 0 },
  dataSource: { type: Array, default: void 0 },
  empty: { type: [String, Object], default: "simple" },
  getKey: { type: [String, Function], default: void 0 },
  labelKey: { type: String, default: void 0 },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  virtual: { type: Boolean, default: false },
  "onUpdate:activeValue": [Function, Array],
  onOptionClick: [Function, Array],
  onScroll: [Function, Array],
  onScrolledChange: [Function, Array],
  onScrolledBottom: [Function, Array],
  _virtualScrollHeight: { type: Number, default: 256 },
  _virtualScrollItemHeight: { type: Number, default: 32 }
};
const selectProps = {
  control: {
    type: [String, Number, Object, Array],
    default: void 0
  },
  value: { type: [String, Number, Symbol, Array], default: void 0 },
  open: { type: Boolean, default: void 0 },
  allowInput: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  autofocus: { type: Boolean, default: false },
  borderless: { type: Boolean, default: void 0 },
  childrenKey: { type: String, default: void 0 },
  clearable: { type: Boolean, default: false },
  clearIcon: { type: String, default: void 0 },
  customAdditional: { type: Object, default: void 0 },
  dataSource: { type: Array, default: void 0 },
  disabled: { type: Boolean, default: false },
  empty: { type: [String, Object], default: "simple" },
  getKey: { type: [String, Function], default: void 0 },
  labelKey: { type: String, default: void 0 },
  maxLabel: { type: [Number, String], default: Number.MAX_SAFE_INTEGER },
  multiple: { type: Boolean, default: false },
  multipleLimit: { type: Number, default: Number.MAX_SAFE_INTEGER },
  offset: Array,
  overlayClassName: { type: String, default: void 0 },
  overlayContainer: {
    type: [String, HTMLElement, Function],
    default: void 0
  },
  overlayMatchWidth: { type: Boolean, default: void 0 },
  overlayRender: { type: Function, default: void 0 },
  placeholder: { type: String, default: void 0 },
  readonly: { type: Boolean, default: false },
  searchable: { type: [Boolean, String], default: false },
  searchFn: { type: [Boolean, Function], default: true },
  size: { type: String, default: void 0 },
  status: String,
  suffix: { type: String, default: void 0 },
  spin: { type: [Boolean, Object], default: void 0 },
  virtual: { type: Boolean, default: false },
  "onUpdate:value": [Function, Array],
  "onUpdate:open": [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  onSearch: [Function, Array],
  onScroll: [Function, Array],
  onScrolledChange: [Function, Array],
  onScrolledBottom: [Function, Array],
  overlayHeight: { type: Number, default: 256 },
  overlayItemHeight: { type: Number, default: 32 }
};
const optionProps = {
  disabled: { type: Boolean, default: false },
  index: { type: Number, required: true },
  label: { type: [String, Number], default: void 0 },
  rawData: { type: Object, required: true },
  parentKey: { type: [String, Number, Symbol], default: void 0 }
};
const optionGroupProps = {
  label: { type: [String, Number], default: void 0 },
  index: { type: Number, required: true },
  rawData: { type: Object, required: true }
};
var Option = /* @__PURE__ */ defineComponent({
  props: optionProps,
  setup(props) {
    const key = useKey();
    const {
      props: selectPanelProps2,
      slots,
      mergedPrefixCls,
      selectedKeys,
      selectedLimit,
      selectedLimitTitle,
      activeValue,
      setActiveIndex
    } = inject(selectPanelContext);
    const isActive = computed(() => activeValue.value === key);
    const isSelected = computed(() => selectedKeys.value.some((selectedKey) => selectedKey === key));
    const isDisabled = computed(() => props.disabled || !isSelected.value && selectedLimit.value);
    const classes = computed(() => {
      const {
        parentKey
      } = props;
      const prefixCls = `${mergedPrefixCls.value}-option`;
      return {
        [prefixCls]: true,
        [`${prefixCls}-active`]: isActive.value,
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
      const {
        label,
        rawData
      } = props;
      const {
        multiple
      } = selectPanelProps2;
      const selected = isSelected.value;
      const disabled = isDisabled.value;
      const prefixCls = `${mergedPrefixCls.value}-option`;
      const _label = toString(label);
      const title = disabled && selectedLimitTitle.value || _label;
      const customAdditional = selectPanelProps2.customAdditional ? selectPanelProps2.customAdditional({
        data: rawData,
        index: props.index
      }) : void 0;
      return createVNode("div", mergeProps({
        "class": classes.value,
        "title": title,
        "onMouseenter": disabled ? void 0 : handleMouseEnter,
        "onClick": disabled ? void 0 : handleClick,
        "aria-label": _label,
        "aria-selected": selected
      }, customAdditional), [multiple && createVNode(IxCheckbox, {
        "checked": selected,
        "disabled": disabled
      }, null), createVNode("span", {
        "class": `${prefixCls}-label`
      }, [renderOptionLabel(slots, rawData, _label)])]);
    };
  }
});
var OptionGroup = /* @__PURE__ */ defineComponent({
  props: optionGroupProps,
  setup(props) {
    const {
      props: selectProps2,
      slots,
      mergedPrefixCls
    } = inject(selectPanelContext);
    return () => {
      var _a2;
      const {
        label,
        rawData
      } = props;
      const _label = toString(label);
      const prefixCls = `${mergedPrefixCls.value}-option-group`;
      const labelRender = (_a2 = rawData.customLabel) != null ? _a2 : "optionGroupLabel";
      const labelSlot = isString(labelRender) ? slots[labelRender] : labelRender;
      const customAdditional = selectProps2.customAdditional ? selectProps2.customAdditional({
        data: rawData,
        index: props.index
      }) : void 0;
      return createVNode("div", mergeProps({
        "class": prefixCls,
        "title": _label,
        "aria-label": _label
      }, customAdditional), [createVNode("span", {
        "class": `${prefixCls}-label`
      }, [labelSlot ? labelSlot(rawData) : _label])]);
    };
  }
});
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
    var _a2, _b;
    activeIndex.value = index;
    const key = (_a2 = flattenedOptions.value[index]) == null ? void 0 : _a2.key;
    key !== activeValue.value && setActiveValue((_b = flattenedOptions.value[index]) == null ? void 0 : _b.key);
  };
  watch([() => props.activeValue, flattenedOptions], ([value, options]) => {
    var _a2;
    const targetIndex = value ? (_a2 = keyIndexMap.value.get(value)) != null ? _a2 : -1 : -1;
    setActiveIndex(getEnabledActiveIndex(options, targetIndex === -1 ? 0 : targetIndex, 1));
  });
  const scrollToActivated = () => {
    scrollTo({ index: activeIndex.value });
  };
  onMounted(() => {
    const options = flattenedOptions.value;
    const currValue = selectedKeys.value;
    const currIndex = options.findIndex((option) => currValue.some((value) => option.key === value));
    setActiveIndex(getEnabledActiveIndex(options, currIndex === -1 ? 0 : currIndex, 1));
    scrollToActivated();
  });
  const changeActiveIndex = (offset) => {
    const enabledIndex = getEnabledActiveIndex(
      flattenedOptions.value,
      activeIndex.value + offset,
      offset % 2
    );
    if (enabledIndex !== activeIndex.value) {
      setActiveIndex(enabledIndex);
      if (offset !== 0) {
        scrollToActivated();
      }
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
    if (type !== "group" && !disabled) {
      return current;
    }
  }
  return -1;
}
function useSelectedState(props, locale) {
  const selectedKeys = computed(() => convertArray(props.selectedKeys));
  const selectedLimit = computed(() => selectedKeys.value.length >= props.multipleLimit);
  const selectedLimitTitle = computed(() => {
    if (!selectedLimit.value) {
      return "";
    }
    return locale.select.limitMessage.replace("${0}", `${props.multipleLimit}`);
  });
  return {
    selectedKeys,
    selectedLimit,
    selectedLimitTitle
  };
}
var Panel = /* @__PURE__ */ defineComponent({
  name: "IxSelectPanel",
  props: selectPanelProps,
  setup(props, {
    slots,
    expose
  }) {
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`);
    const config = useGlobalConfig$1("select");
    const locale = useGlobalConfig$1("locale");
    const flattenedOptions = useSelectPanelData(props, config);
    const selectedStateContext = useSelectedState(props, locale);
    const virtualScrollRef = ref();
    const scrollTo = (options) => {
      var _a2;
      return (_a2 = virtualScrollRef.value) == null ? void 0 : _a2.scrollTo(options);
    };
    const activeStateContext = usePanelActiveState(props, flattenedOptions, selectedStateContext.selectedKeys, scrollTo);
    expose({
      scrollTo,
      changeActiveIndex: activeStateContext.changeActiveIndex
    });
    provide(selectPanelContext, {
      props,
      slots,
      mergedPrefixCls,
      flattenedOptions,
      ...selectedStateContext,
      ...activeStateContext
    });
    const handleScrolledChange = (startIndex, endIndex, visibleOptions) => {
      const {
        onScrolledChange
      } = props;
      if (onScrolledChange) {
        callEmit(onScrolledChange, startIndex, endIndex, visibleOptions.map((item) => item.rawData));
      }
    };
    const handlePanelMouseDown = (evt) => {
      evt.preventDefault();
    };
    return () => {
      const {
        _virtualScrollHeight,
        _virtualScrollItemHeight,
        virtual,
        onScroll,
        onScrolledBottom
      } = props;
      const options = flattenedOptions.value;
      const children = [createVNode(ListBox, null, null)];
      if (options.length > 0) {
        const itemRender = ({
          item,
          index
        }) => {
          const {
            type,
            ...rest
          } = item;
          return type === "group" ? createVNode(OptionGroup, mergeProps({
            "index": index
          }, rest), null) : createVNode(Option, mergeProps({
            "index": index
          }, rest), null);
        };
        children.push(createVNode(CdkVirtualScroll, {
          "ref": virtualScrollRef,
          "dataSource": options,
          "getKey": "key",
          "height": _virtualScrollHeight,
          "itemHeight": _virtualScrollItemHeight,
          "itemRender": itemRender,
          "virtual": virtual,
          "onScroll": onScroll,
          "onScrolledBottom": onScrolledBottom,
          "onScrolledChange": handleScrolledChange
        }, null));
      } else {
        children.push(createVNode(ɵEmpty, {
          "empty": props.empty
        }, slots));
      }
      return createVNode("div", {
        "onMousedown": handlePanelMouseDown
      }, [children]);
    };
  }
});
function useSelectPanelData(props, config) {
  const dataContext = inject(SELECT_PANEL_DATA_TOKEN, null);
  if (dataContext) {
    return dataContext.flattenedOptions;
  }
  const mergedChildrenKey = computed(() => {
    var _a2;
    return (_a2 = props.childrenKey) != null ? _a2 : config.childrenKey;
  });
  const mergedLabelKey = computed(() => {
    var _a2;
    return (_a2 = props.labelKey) != null ? _a2 : config.labelKey;
  });
  const getKey = usePanelGetOptionKey(props, config);
  const flattenedOptions = useFlattenedOptions(computed(() => props.dataSource), mergedChildrenKey, getKey, mergedLabelKey);
  return flattenedOptions;
}
var Select = /* @__PURE__ */ defineComponent({
  name: "IxSelect",
  inheritAttrs: false,
  props: selectProps,
  setup(props, {
    attrs,
    expose,
    slots
  }) {
    const common = useGlobalConfig$1("common");
    const config = useGlobalConfig$1("select");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-select`);
    const triggerRef = ref();
    const focus = () => {
      var _a2;
      return (_a2 = triggerRef.value) == null ? void 0 : _a2.focus();
    };
    const blur = () => {
      var _a2;
      return (_a2 = triggerRef.value) == null ? void 0 : _a2.blur();
    };
    const panelRef = ref();
    const scrollTo = (...params) => {
      var _a2;
      return (_a2 = panelRef.value) == null ? void 0 : _a2.scrollTo(...params);
    };
    const changeActiveIndex = (offset) => {
      var _a2;
      return (_a2 = panelRef.value) == null ? void 0 : _a2.changeActiveIndex(offset);
    };
    const [inputValue, setInputValue] = useState("");
    const clearInput = () => {
      var _a2;
      props.searchable === "overlay" ? setInputValue("") : (_a2 = triggerRef.value) == null ? void 0 : _a2.clearInput();
    };
    expose({
      focus,
      blur,
      scrollTo
    });
    const {
      overlayRef,
      overlayStyle,
      updateOverlay,
      overlayOpened,
      setOverlayOpened
    } = useOverlayState(props, config, triggerRef);
    const {
      accessor,
      control
    } = useAccessorAndControl();
    useFormItemRegister(control);
    const mergedSize = useFormSize(props, config);
    const mergedStatus = useFormStatus(props, control);
    const getKey = useGetOptionKey(props, config);
    const {
      options,
      optionKeyMap
    } = useSelectOptions(props, config, slots, getKey, inputValue);
    provide(SELECT_PANEL_DATA_TOKEN, {
      flattenedOptions: options
    });
    const {
      selectedValue,
      selectedOptions,
      changeSelected,
      handleClear,
      handleRemove
    } = useSelectedState$1(props, accessor, optionKeyMap);
    const {
      activeValue,
      setActiveValue
    } = useActiveState(props, inputValue);
    const handleKeyDown = useKeyboardEvents(inputValue, selectedValue, computed(() => !!props.multiple), activeValue, changeActiveIndex, changeSelected, handleRemove, clearInput, setOverlayOpened, blur);
    watch(overlayOpened, (opened) => {
      if (!opened && props.allowInput && inputValue.value) {
        changeSelected(inputValue.value);
      }
      opened && focus();
      clearInput();
    });
    const handleOptionClick = (option) => {
      changeSelected(getKey.value(option));
      if (props.multiple) {
        clearInput();
      } else {
        props.allowInput && clearInput();
        setOverlayOpened(false);
      }
    };
    const handleBlur = () => {
      if (props.allowInput && inputValue.value) {
        changeSelected(inputValue.value);
        clearInput();
      }
      accessor.markAsBlurred();
    };
    const handleItemRemove = (value) => {
      focus();
      handleRemove(value);
    };
    const panelProps = usePanelProps(props, selectedValue, activeValue, setActiveValue, handleOptionClick);
    const overlayClasses = computed(() => {
      const {
        overlayClassName,
        multiple
      } = props;
      const prefixCls = mergedPrefixCls.value;
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || ""]: !!overlayClassName
      });
    });
    const renderTrigger = () => createVNode(ɵSelector, mergeProps({
      "ref": triggerRef,
      "className": mergedPrefixCls.value,
      "allowInput": props.allowInput,
      "autocomplete": props.autocomplete,
      "autofocus": props.autofocus,
      "borderless": props.borderless,
      "clearable": props.clearable,
      "clearIcon": props.clearIcon,
      "config": config,
      "dataSource": selectedOptions.value,
      "disabled": accessor.disabled,
      "maxLabel": props.maxLabel,
      "multiple": props.multiple,
      "opened": overlayOpened.value,
      "placeholder": props.placeholder,
      "readonly": props.readonly,
      "searchable": props.searchable,
      "size": mergedSize.value,
      "status": mergedStatus.value,
      "suffix": props.suffix,
      "value": selectedValue.value,
      "onBlur": handleBlur,
      "onClear": handleClear,
      "onInputValueChange": setInputValue,
      "onItemRemove": handleItemRemove,
      "onKeydown": handleKeyDown,
      "onOpenedChange": setOverlayOpened,
      "onResize": updateOverlay,
      "onSearch": props.onSearch
    }, attrs), slots);
    const renderLoading = (children) => {
      const {
        spin
      } = props;
      const spinProps2 = isBoolean(spin) ? {
        spinning: spin
      } : spin;
      return spinProps2 ? createVNode(IxSpin, spinProps2, {
        default: () => [children]
      }) : children;
    };
    const renderContent2 = () => {
      var _a2;
      const children = [renderLoading(createVNode(Panel, mergeProps({
        "ref": panelRef
      }, panelProps.value), slots))];
      const {
        searchable,
        overlayRender
      } = props;
      if (searchable === "overlay") {
        const value = inputValue.value;
        const clearIcon = (_a2 = props.clearIcon) != null ? _a2 : config.clearIcon;
        const handleSearchInput = (evt) => {
          const {
            value: value2
          } = evt.target;
          setInputValue(value2);
          props.searchable && callEmit(props.onSearch, value2);
        };
        const handleSearchClear = () => setInputValue("");
        children.unshift(createVNode("div", {
          "class": `${mergedPrefixCls.value}-overlay-search-wrapper`
        }, [createVNode(ɵInput, {
          "clearable": true,
          "clearIcon": clearIcon,
          "clearVisible": !!value,
          "size": "sm",
          "suffix": "search",
          "value": value,
          "onClear": handleSearchClear,
          "onInput": handleSearchInput
        }, null)]));
      }
      return createVNode("div", null, [overlayRender ? overlayRender(children) : children]);
    };
    return () => {
      var _a2, _b;
      const overlayProps = {
        class: overlayClasses.value,
        style: overlayStyle.value,
        clickOutside: true,
        container: (_a2 = props.overlayContainer) != null ? _a2 : config.overlayContainer,
        containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
        disabled: accessor.disabled || props.readonly,
        offset: (_b = props.offset) != null ? _b : config.offset,
        placement: "bottomStart",
        transitionName: `${common.prefixCls}-slide-auto`,
        trigger: "manual",
        triggerId: attrs.id,
        visible: overlayOpened.value,
        "onUpdate:visible": setOverlayOpened
      };
      const overlaySlots = {
        default: renderTrigger,
        content: renderContent2
      };
      return createVNode(ɵOverlay, mergeProps({
        "ref": overlayRef
      }, overlayProps), overlaySlots);
    };
  }
});
function useSelectOptions(props, config, slots, getKey, inputValue) {
  const mergedChildrenKey = computed(() => {
    var _a2;
    return (_a2 = props.childrenKey) != null ? _a2 : config.childrenKey;
  });
  const mergedLabelKey = computed(() => {
    var _a2;
    return (_a2 = props.labelKey) != null ? _a2 : config.labelKey;
  });
  const convertedOptions = useConvertedOptions(props, slots);
  const flattenedOptions = useFlattenedOptions(convertedOptions, mergedChildrenKey, getKey, mergedLabelKey);
  const filteredOptions = useFilteredOptions(props, flattenedOptions, inputValue, mergedLabelKey);
  const optionKeyMap = useOptionKeyMap(flattenedOptions);
  return {
    options: filteredOptions,
    optionKeyMap
  };
}
const IxSelect = Select;
const SelectCtrl = defineCtrComponent({
  setup({
    control,
    controlValue,
    setControlValue
  }) {
    const dataSource = computed(() => control.value.options.map((opt) => ({
      key: opt.label,
      label: opt.label
    })));
    const selectedOption = computed(() => control.value.options.find((opt) => opt.value === controlValue.value));
    const handleChange = (value) => {
      const option = control.value.options.find((opt) => opt.label === value);
      option && setControlValue(option.value);
    };
    return () => {
      var _a2;
      return createVNode("div", {
        "class": "archive-app-demo__control-select"
      }, [createVNode(IxSelect, {
        "value": (_a2 = selectedOption.value) == null ? void 0 : _a2.label,
        "dataSource": dataSource.value,
        "onChange": handleChange
      }, null)]);
    };
  }
});
const TextareaCtrl = defineCtrComponent({
  setup({
    controlValue,
    setControlValue
  }) {
    return () => createVNode("div", {
      "class": "archive-app-demo__control-textarea"
    }, [createVNode(IxTextarea, {
      "value": controlValue.value,
      "onChange": setControlValue
    }, null)]);
  }
});
const DemoContorlComp = defineComponent({
  props: {
    instance: {
      type: Object,
      required: true
    },
    controls: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const prefixCls = "archive-app-demo__control";
    function renderControl(control) {
      const ControlComponent = (() => {
        switch (control.type) {
          case "boolean":
            return BoolCtrl;
          case "input":
            return InputCtrl;
          case "number":
            return NumberCtrl;
          case "textarea":
            return TextareaCtrl;
          case "select":
            return SelectCtrl;
          case "radio":
            return RadioCtr;
          case "checkbox":
            return CheckboxCtr;
          case "json":
            return JsonCtrl;
        }
      })();
      return ControlComponent ? createVNode(ControlComponent, {
        "control": control,
        "instance": props.instance
      }, null) : void 0;
    }
    return () => {
      var _a2;
      return createVNode("div", {
        "class": prefixCls
      }, [(_a2 = props.controls) == null ? void 0 : _a2.map((item) => {
        var _a3, _b;
        const controlNode = renderControl(item);
        return controlNode && createVNode("div", {
          "class": `${prefixCls}__item`
        }, [createVNode("div", {
          "class": `${prefixCls}__item__label`,
          "title": (_a3 = item.label) != null ? _a3 : item.key
        }, [createVNode("span", null, [(_b = item.label) != null ? _b : item.key, createTextVNode(": ")]), item.description && createVNode(IxTooltip, {
          "title": item.description,
          "class": `${prefixCls}__item__tooltip`,
          "placement": "rightStart"
        }, {
          default: () => [createVNode(IxIcon, {
            "class": `${prefixCls}__item__tooltip-icon`,
            "name": "info-circle"
          }, null)]
        })]), createVNode("div", {
          "class": `${prefixCls}__item__control`
        }, [renderControl(item)])]);
      })]);
    };
  }
});
const DemoToolComp = defineComponent({
  props: {
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
        var _a2;
        return [createVNode("div", {
          "class": "archive-app-demo__tool",
          "onClick": props.onClick
        }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])];
      }
    });
  }
});
const demoProps = {
  lang: {
    type: String,
    default: "zh"
  },
  resolvedDemoItem: {
    type: Object,
    required: true
  },
  tools: Array
};
const Demo = defineComponent({
  props: demoProps,
  setup(props) {
    const prefixCls = `archive-app-demo`;
    const mergedControls = computed(() => mergeDemoControls(props.resolvedDemoItem));
    const mergedTools = computed(() => {
      var _a3, _b;
      var _a2;
      if (((_a3 = (_a2 = props.tools) == null ? void 0 : _a2.findIndex((tool) => tool.type === "expandCode")) != null ? _a3 : -1) > -1) {
        return props.tools;
      }
      return [...(_b = props.tools) != null ? _b : [], {
        type: "expandCode"
      }, mergedControls.value.length && {
        type: "expandControls"
      }].filter(Boolean);
    });
    const selectedSourceTab = ref(0);
    const handleSelectedSourceTabChange = (tab) => {
      selectedSourceTab.value = tab;
    };
    const expanded = ref("");
    const expandedCodeTitle = computed(() => {
      if (props.lang === "zh") {
        return expanded.value === "code" ? "收起代码" : "显示代码";
      }
      return expanded.value === "code" ? "Hide Code" : "Show Code";
    });
    const expandedControlsTitle = computed(() => {
      if (props.lang === "zh") {
        return expanded.value === "controls" ? "收起控制" : "显示控制";
      }
      return expanded.value === "controls" ? "Hide Controls" : "Show Controls";
    });
    const copyTitle = computed(() => props.lang === "zh" ? "复制代码" : "Copy Code");
    const onExpanded = (target) => {
      expanded.value = expanded.value === target ? "" : target;
    };
    const {
      copy
    } = useClipboard();
    const {
      success
    } = useMessage();
    const onCopy = throttle(async () => {
      var _a3;
      var _a2, _b;
      const code = (_b = (_a2 = props.resolvedDemoItem) == null ? void 0 : _a2.sourceCodes) == null ? void 0 : _b[(_a3 = selectedSourceTab.value) != null ? _a3 : 0].code;
      code && copy(decodeURIComponent(code)).then(() => {
        success(props.lang === "zh" ? "复制成功" : "copy succeeded");
      });
    }, 300);
    const renderTool = (tool) => {
      var _a2, _b, _c;
      if (tool.type === "expandCode") {
        return createVNode(DemoToolComp, {
          "tooltip": (_a2 = tool.tooltip) != null ? _a2 : expandedCodeTitle.value,
          "onClick": () => onExpanded("code")
        }, {
          default: () => [createVNode(IxIcon, {
            "name": expanded.value === "code" ? "unexpand" : "expand"
          }, null)]
        });
      }
      if (tool.type === "expandControls") {
        return createVNode(DemoToolComp, {
          "tooltip": (_b = tool.tooltip) != null ? _b : expandedControlsTitle.value,
          "onClick": () => onExpanded("controls")
        }, {
          default: () => [createVNode(IxIcon, {
            "name": expanded.value === "controls" ? "up" : "control"
          }, null)]
        });
      }
      if (tool.type === "copyCode") {
        return createVNode(DemoToolComp, {
          "tooltip": (_c = tool.tooltip) != null ? _c : copyTitle.value,
          "onClick": onCopy
        }, {
          default: () => [tool.render ? tool.render() : createVNode(IxIcon, {
            "name": "copy"
          }, null)]
        });
      }
      if (tool.type === "link") {
        return createVNode(DemoToolComp, {
          "tooltip": tool.tooltip,
          "onClick": onCopy
        }, {
          default: () => [createVNode("a", {
            "class": `${prefixCls}__tool-link`,
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
      var _a2;
      const sourceCodes = (_a2 = props.resolvedDemoItem) == null ? void 0 : _a2.sourceCodes;
      if (!sourceCodes) {
        return;
      }
      const contentCls = `${prefixCls}__source-code__content`;
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
        "class": `${prefixCls}__source-code archive-md`
      }, [children]);
    };
    const renderDemoControl = () => {
      if (expanded.value === "controls" && mergedControls.value.length && props.resolvedDemoItem.instance) {
        return createVNode(DemoContorlComp, {
          "controls": mergedControls.value,
          "instance": props.resolvedDemoItem.instance
        }, null);
      }
    };
    const renderDropdownPanelContent = () => {
      if (expanded.value === "code") {
        return renderSourceCode();
      }
      if (expanded.value === "controls") {
        return renderDemoControl();
      }
    };
    return () => {
      const demoItem = props.resolvedDemoItem;
      return createVNode("div", {
        "class": prefixCls
      }, [demoItem.title && createVNode("h3", {
        "id": demoItem.id,
        "class": `${prefixCls}__title`
      }, [createVNode("span", null, [demoItem.title]), createVNode("a", {
        "class": "anchor",
        "href": "#" + demoItem.id
      }, [createTextVNode("#")])]), demoItem.description && createVNode("p", {
        "class": `${prefixCls}__description`
      }, [demoItem.description]), createVNode("div", {
        "class": `${prefixCls}__content`
      }, [createVNode("div", {
        "class": `${prefixCls}__content-inner`
      }, [createVNode("div", {
        "class": `${prefixCls}__stage`
      }, [createVNode(Bi, {
        "instance": demoItem.instance
      }, null)]), createVNode("div", {
        "class": `${prefixCls}__tools`
      }, [mergedTools.value.map((tool) => renderTool(tool))])])]), createVNode(Transition, {
        "name": `${prefixCls}-fade-down`
      }, {
        default: () => [withDirectives(createVNode("div", {
          "class": `${prefixCls}__dropdown-panel`
        }, [renderDropdownPanelContent()]), [[vShow, !!expanded.value]])]
      })]);
    };
  }
});
function mergeDemoControls(item) {
  var _a3;
  var _a2;
  const demoProps2 = item.instance.getProps();
  if (!demoProps2.length) {
    return [];
  }
  return (_a3 = (_a2 = demoProps2 == null ? void 0 : demoProps2.map((prop) => {
    var _a32;
    const control = (_a32 = item.controls) == null ? void 0 : _a32[prop.key];
    if (!control) {
      return createControlFromProp(prop);
    }
    return {
      ...control,
      key: prop.key,
      propType: prop.type
    };
  })) == null ? void 0 : _a2.filter(Boolean)) != null ? _a3 : [];
}
function createControlFromProp(prop) {
  const type = (() => {
    switch (prop.type) {
      case "string":
        return "input";
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "object":
        return "json";
    }
  })();
  if (!type) {
    return;
  }
  return {
    key: prop.key,
    type,
    propType: prop.type
  };
}
function isUndefined(value) {
  return value === void 0;
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
  const containerRect = isHTMLElement(container) ? container.getBoundingClientRect() : { top: 0, bottom: window.innerHeight, left: 0, right: window.innerWidth };
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
    on$1(target, event, cb);
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
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-affix`);
    const contentStyle = ref({});
    const affixStyle = ref({});
    const targetRef = ref(null);
    const affixRef = ref(null);
    const contentRef = ref(null);
    const offset = computed(() => normalizeOffset(props.offset));
    const isStickyRef = ref(false);
    watch(isStickyRef, (value) => {
      var _a2;
      return (_a2 = props.onChange) == null ? void 0 : _a2.call(props, value);
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
      var _a2;
      removeObserveTarget(targetRef.value, throttleMeasure);
      (_a2 = throttleMeasure.cancel) == null ? void 0 : _a2.call(throttleMeasure);
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
      var _a2;
      const prefixCls = mergedPrefixCls.value;
      return createVNode("div", {
        "ref": affixRef,
        "style": affixStyle.value,
        "class": prefixCls
      }, [createVNode("div", {
        "ref": contentRef,
        "class": `${prefixCls}-content`,
        "style": contentStyle.value
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]);
    };
  }
});
const IxAffix = Affix;
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
const innerPageProps = {
  pageData: { type: Object, required: true },
  theme: { type: Object, required: true },
  options: Object,
  renderers: Object
};
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
let inited = false;
function useCopyCode() {
  if (inited) {
    return;
  }
  const { copy } = useClipboard();
  const timeoutIdMap = /* @__PURE__ */ new Map();
  window.addEventListener("click", (e) => {
    var _a2;
    const el = e.target;
    if (el.matches('div[class*="language-"] > button.copy')) {
      const parent = el.parentElement;
      const sibling = (_a2 = el.nextElementSibling) == null ? void 0 : _a2.nextElementSibling;
      if (!parent || !sibling) {
        return;
      }
      const isShell = /language-(shellscript|shell|bash|sh|zsh)/.test(parent.className);
      let text = "";
      sibling.querySelectorAll("span.line:not(.diff.remove)").forEach((node) => text += (node.textContent || "") + "\n");
      text = text.slice(0, -1);
      if (isShell) {
        text = text.replace(/^ *(\$|>) /gm, "").trim();
      }
      copy(text).then(() => {
        el.classList.add("copied");
        clearTimeout(timeoutIdMap.get(el));
        const timeoutId = setTimeout(() => {
          el.classList.remove("copied");
          el.blur();
          timeoutIdMap.delete(el);
        }, 2e3);
        timeoutIdMap.set(el, timeoutId);
      });
    }
  });
  inited = true;
}
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function usePageRender(dataBase) {
  return (data, customRenderer, defaultRenderer) => {
    var _a2;
    const defaultNodes = defaultRenderer == null ? void 0 : defaultRenderer();
    return customRenderer ? customRenderer(
      {
        theme: dataBase.theme,
        route: dataBase.route,
        breakpoints: dataBase.breakpoints,
        activeRecords: (_a2 = dataBase.activeRecords) == null ? void 0 : _a2.value,
        ...data != null ? data : {}
      },
      defaultNodes
    ) : defaultNodes;
  };
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
/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
 */
function useArchiveItemImport(props, key) {
  const data = useAsyncProp(props, key);
  const updatedItem = ref();
  const resolvedItem = computed(() => {
    var _a3;
    var _a2;
    return (_a3 = updatedItem.value) != null ? _a3 : (_a2 = data.value) == null ? void 0 : _a2.default;
  });
  let stop;
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
      var _a2, _b;
      if (((_a2 = updatedItem.value) == null ? void 0 : _a2.id) === item.id || ((_b = data.value) == null ? void 0 : _b.default.id) === item.id) {
        updatedItem.value = item;
      }
    });
    onBeforeUnmount(() => {
      stop == null ? void 0 : stop();
    });
  }
  watch(data, () => {
    updatedItem.value = void 0;
  });
  return resolvedItem;
}
function useArchiveItemImports(props, key) {
  const data = useArrayAsyncProp(props, key);
  const updatedItems = ref({});
  const resolvedItems = computed(
    () => {
      var _a3;
      var _a2;
      return (_a3 = (_a2 = data.value) == null ? void 0 : _a2.map((mod) => {
        var _a4;
        const item = mod.default;
        return (_a4 = updatedItems.value[item.id]) != null ? _a4 : item;
      })) != null ? _a3 : [];
    }
  );
  let stop;
  if (window.__ARCHIVE_HMR_RUNTIME__) {
    stop = window.__ARCHIVE_HMR_RUNTIME__.onItemChange((item) => {
      var _a2;
      if (!!updatedItems.value[item.id] || ((_a2 = data.value) == null ? void 0 : _a2.findIndex((loadedItem) => loadedItem.default.id === item.id))) {
        updatedItems.value[item.id] = item;
      }
    });
    onBeforeUnmount(() => {
      stop == null ? void 0 : stop();
    });
  }
  watch(data, () => {
    updatedItems.value = {};
  });
  return resolvedItems;
}
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
    const common = useGlobalConfig$1("common");
    const mergedPrefixCls = computed(() => `${common.prefixCls}-anchor`);
    const config = useGlobalConfig$1("anchor");
    const hideLinkBall = computed(() => {
      var _a2;
      return (_a2 = props.hideLinkBall) != null ? _a2 : config.hideLinkBall;
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
      var _a2;
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
      }, [linkBall]), (_a2 = slots.default) == null ? void 0 : _a2.call(slots)])]);
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
      var _a2, _b, _c;
      const activeLinkElement = (_a2 = anchorRef.value) == null ? void 0 : _a2.querySelector(`a[data-href="${activeLink.value}"]`);
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
    var _a2;
    return (_a2 = props.bounds) != null ? _a2 : config.bounds;
  });
  const container = ref();
  const eventType = "scroll";
  let animating = false;
  const targetOffset = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = props.targetOffset) != null ? _a2 : props.offsetTop) != null ? _b : 0;
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
    on$1(container.value, eventType, handleScroll);
    handleScroll();
  });
  onMounted(() => {
    container.value = convertTarget(props.target);
    on$1(container.value, eventType, handleScroll);
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
    const common = useGlobalConfig$1("common");
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
      var _a2, _b, _c;
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
      }, [(_b = (_a2 = slots.title) == null ? void 0 : _a2.call(slots)) != null ? _b : title]), (_c = slots.default) == null ? void 0 : _c.call(slots)]);
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
      var _a2;
      target.value = m$1((_a2 = anchorRef.value) == null ? void 0 : _a2.$el);
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
      var _a2;
      const anchorWidth = (_a2 = anchorEl.value) == null ? void 0 : _a2.$el.getBoundingClientRect().width;
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
      var _a2, _b;
      return createVNode("div", {
        "class": "archive-app__page__content"
      }, [createVNode("div", {
        "class": "archive-app__page__content__inner",
        "ref": rootEl
      }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), ((_b = anchorDatas.value) == null ? void 0 : _b.length) ? createVNode(Anchor, {
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
function parseAnchors(root, maxLevel) {
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
  u(root.children, "children", (el, parents) => {
    var _a3, _b;
    var _a2;
    if (getComputedStyle(el).display === "none") {
      hiddenEls.push(el);
      return;
    }
    if (!el.id || !el.textContent || parents.some((parent) => hiddenEls.includes(parent))) {
      return;
    }
    const level = (_a2 = anchorTags.find((tag) => tag.tag === el.tagName.toLowerCase())) == null ? void 0 : _a2.level;
    if (!level || level > maxLevel) {
      return;
    }
    const data = {
      level,
      title: (_b = (_a3 = el.getAttribute("title")) != null ? _a3 : el.textContent.replace(/^#/, "").replace(/#$/, "")) != null ? _b : el.id,
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
    const demoItems = useArchiveItemImports(props, "demoImports");
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
        }, pageContentRenderer, () => demoItems.value.map((demoItem) => withDirectives(createVNode(Demo, {
          "resolvedDemoItem": demoItem,
          "tools": getDemoTools == null ? void 0 : getDemoTools(demoItem),
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
    const resolvedItem = useArchiveItemImport(props, "pageImport");
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
        var _a2;
        return [createVNode(Bi, {
          "instance": (_a2 = resolvedItem.value) == null ? void 0 : _a2.instance,
          "onInstanceMountedChange": onInstanceMountedChange
        }, null)];
      })]
    });
  }
});
const Page = defineComponent({
  props: innerPageProps,
  setup(props) {
    var _a3, _b;
    var _a2;
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
    useCopyCode();
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
      var _a4;
      var _a22;
      if (props.theme.page.headerAffix) {
        headerAffixTarget.value = m$1(wrapperRef.value);
      }
      headerHeight.value = (_a4 = (_a22 = headerRef.value) == null ? void 0 : _a22.getBoundingClientRect().height) != null ? _a4 : 0;
    });
    provide(pageContextToken, {
      headerFixed,
      headerHeight,
      anchorOptions,
      options: (_a3 = props.options) != null ? _a3 : {},
      renderers: (_b = props.renderers) != null ? _b : {},
      render
    });
    const title = computed(() => props.pageData.title);
    const description = computed(() => props.pageData.description);
    const demoImports = computed(() => props.pageData.demoImports);
    const pageImport = computed(() => props.pageData.import);
    const tabs = computed(() => {
      var _a4;
      var _a22;
      return (_a4 = (_a22 = props.pageData.tabs) == null ? void 0 : _a22.filter((tab) => tab.import || tab.demoImports)) != null ? _a4 : [];
    });
    const tabsRadioData = computed(() => tabs.value.map((tab) => ({
      label: tab.name,
      value: tab.id
    })));
    const showTabs = computed(() => {
      var _a22;
      return !((_a22 = demoImports.value) == null ? void 0 : _a22.length) && tabs.value.length > 0;
    });
    const activeTabId = ref((_a2 = tabs.value[0]) == null ? void 0 : _a2.id);
    const setActiveTabId = (tab) => {
      activeTabId.value = tab;
    };
    watch(() => props.pageData, () => {
      var _a22;
      activeTabId.value = (_a22 = tabs.value[0]) == null ? void 0 : _a22.id;
    });
    const headerCls = computed(() => ["archive-app__page__header", headerFixed.value ? "archive-app__page__header--fixed" : void 0]);
    const renderHeader = () => {
      var _a22;
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
      }, (_a22 = props.renderers) == null ? void 0 : _a22.pageHeader, () => [createVNode("h1", {
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
