import { A as isIndex, C as baseGet, D as isArguments, E as toString, I as isObjectLike, L as baseGetTag, M as isFunction, O as isLength, P as isArray, R as Symbol$1, S as arrayPush, T as castPath, _ as isNil, b as cloneDeep, g as merge, h as baseSet, j as setToString, k as overRest, w as toKey } from "./setup-Dx32Rw55.js";
import { B as effectScope, E as onBeforeUnmount, F as watch, G as reactive, I as watchEffect, J as toRaw, K as ref, N as provide, Q as normalizeClass, S as isVNode, V as getCurrentScope, W as onScopeDispose, Z as unref, _ as createVNode, a as Comment, b as h, c as Text, k as onMounted, l as cloneVNode, o as Fragment, q as shallowRef, tt as toRawType, u as computed, v as defineComponent, x as inject, y as getCurrentInstance, z as customRef } from "./_plugin-vue_export-helper-DL5t6dEv.js";
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isFlattenable.js
/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
/**
* Checks if `value` is a flattenable `arguments` object or array.
*
* @private
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
*/
function isFlattenable(value) {
	return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseFlatten.js
/**
* The base implementation of `_.flatten` with support for restricting flattening.
*
* @private
* @param {Array} array The array to flatten.
* @param {number} depth The maximum recursion depth.
* @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
* @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
* @param {Array} [result=[]] The initial result value.
* @returns {Array} Returns the new flattened array.
*/
function baseFlatten(array, depth, predicate, isStrict, result) {
	var index = -1, length = array.length;
	predicate || (predicate = isFlattenable);
	result || (result = []);
	while (++index < length) {
		var value = array[index];
		if (depth > 0 && predicate(value)) {
			if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result);
			else arrayPush(result, value);
		} else if (!isStrict) result[result.length] = value;
	}
	return result;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/flatten.js
/**
* Flattens `array` a single level deep.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Array
* @param {Array} array The array to flatten.
* @returns {Array} Returns the new flattened array.
* @example
*
* _.flatten([1, [2, [3, [4]], 5]]);
* // => [1, 2, [3, [4]], 5]
*/
function flatten(array) {
	return (array == null ? 0 : array.length) ? baseFlatten(array, 1) : [];
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_flatRest.js
/**
* A specialized version of `baseRest` which flattens the rest array.
*
* @private
* @param {Function} func The function to apply a rest parameter to.
* @returns {Function} Returns the new function.
*/
function flatRest(func) {
	return setToString(overRest(func, void 0, flatten), func + "");
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayReduce.js
/**
* A specialized version of `_.reduce` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {*} [accumulator] The initial value.
* @param {boolean} [initAccum] Specify using the first element of `array` as
*  the initial value.
* @returns {*} Returns the accumulated value.
*/
function arrayReduce(array, iteratee, accumulator, initAccum) {
	var index = -1, length = array == null ? 0 : array.length;
	if (initAccum && length) accumulator = array[++index];
	while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
	return accumulator;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePropertyOf.js
/**
* The base implementation of `_.propertyOf` without support for deep paths.
*
* @private
* @param {Object} object The object to query.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyOf(object) {
	return function(key) {
		return object == null ? void 0 : object[key];
	};
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_deburrLetter.js
/**
* Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
* letters to basic Latin letters.
*
* @private
* @param {string} letter The matched letter to deburr.
* @returns {string} Returns the deburred letter.
*/
var deburrLetter = basePropertyOf({
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"Ç": "C",
	"ç": "c",
	"Ð": "D",
	"ð": "d",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"Ñ": "N",
	"ñ": "n",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"Ý": "Y",
	"ý": "y",
	"ÿ": "y",
	"Æ": "Ae",
	"æ": "ae",
	"Þ": "Th",
	"þ": "th",
	"ß": "ss",
	"Ā": "A",
	"Ă": "A",
	"Ą": "A",
	"ā": "a",
	"ă": "a",
	"ą": "a",
	"Ć": "C",
	"Ĉ": "C",
	"Ċ": "C",
	"Č": "C",
	"ć": "c",
	"ĉ": "c",
	"ċ": "c",
	"č": "c",
	"Ď": "D",
	"Đ": "D",
	"ď": "d",
	"đ": "d",
	"Ē": "E",
	"Ĕ": "E",
	"Ė": "E",
	"Ę": "E",
	"Ě": "E",
	"ē": "e",
	"ĕ": "e",
	"ė": "e",
	"ę": "e",
	"ě": "e",
	"Ĝ": "G",
	"Ğ": "G",
	"Ġ": "G",
	"Ģ": "G",
	"ĝ": "g",
	"ğ": "g",
	"ġ": "g",
	"ģ": "g",
	"Ĥ": "H",
	"Ħ": "H",
	"ĥ": "h",
	"ħ": "h",
	"Ĩ": "I",
	"Ī": "I",
	"Ĭ": "I",
	"Į": "I",
	"İ": "I",
	"ĩ": "i",
	"ī": "i",
	"ĭ": "i",
	"į": "i",
	"ı": "i",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"ĸ": "k",
	"Ĺ": "L",
	"Ļ": "L",
	"Ľ": "L",
	"Ŀ": "L",
	"Ł": "L",
	"ĺ": "l",
	"ļ": "l",
	"ľ": "l",
	"ŀ": "l",
	"ł": "l",
	"Ń": "N",
	"Ņ": "N",
	"Ň": "N",
	"Ŋ": "N",
	"ń": "n",
	"ņ": "n",
	"ň": "n",
	"ŋ": "n",
	"Ō": "O",
	"Ŏ": "O",
	"Ő": "O",
	"ō": "o",
	"ŏ": "o",
	"ő": "o",
	"Ŕ": "R",
	"Ŗ": "R",
	"Ř": "R",
	"ŕ": "r",
	"ŗ": "r",
	"ř": "r",
	"Ś": "S",
	"Ŝ": "S",
	"Ş": "S",
	"Š": "S",
	"ś": "s",
	"ŝ": "s",
	"ş": "s",
	"š": "s",
	"Ţ": "T",
	"Ť": "T",
	"Ŧ": "T",
	"ţ": "t",
	"ť": "t",
	"ŧ": "t",
	"Ũ": "U",
	"Ū": "U",
	"Ŭ": "U",
	"Ů": "U",
	"Ű": "U",
	"Ų": "U",
	"ũ": "u",
	"ū": "u",
	"ŭ": "u",
	"ů": "u",
	"ű": "u",
	"ų": "u",
	"Ŵ": "W",
	"ŵ": "w",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Ź": "Z",
	"Ż": "Z",
	"Ž": "Z",
	"ź": "z",
	"ż": "z",
	"ž": "z",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Œ": "Oe",
	"œ": "oe",
	"ŉ": "'n",
	"ſ": "s"
});
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/deburr.js
/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/**
* Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
* [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
*/
var reComboMark = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g");
/**
* Deburrs `string` by converting
* [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
* and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
* letters to basic Latin letters and removing
* [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to deburr.
* @returns {string} Returns the deburred string.
* @example
*
* _.deburr('déjà vu');
* // => 'deja vu'
*/
function deburr(string) {
	string = toString(string);
	return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_asciiWords.js
/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
* Splits an ASCII `string` into an array of its words.
*
* @private
* @param {string} The string to inspect.
* @returns {Array} Returns the words of `string`.
*/
function asciiWords(string) {
	return string.match(reAsciiWord) || [];
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hasUnicodeWord.js
/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
* Checks if `string` contains a word composed of Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a word is found, else `false`.
*/
function hasUnicodeWord(string) {
	return reHasUnicodeWord.test(string);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_unicodeWords.js
/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff";
var rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff";
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */
var rsApos = "['’]";
var rsBreak = "[" + rsBreakRange + "]";
var rsCombo = "[" + rsComboRange + "]";
var rsDigits = "\\d+";
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
var rsModifier = "(?:" + rsCombo + "|\\ud83c[\\udffb-\\udfff])";
var rsNonAstral = "[^" + rsAstralRange + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = "[" + rsUpperRange + "]";
var rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange + "]?";
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [
	rsNonAstral,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = "(?:" + [
	rsDingbat,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsSeq;
/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
	rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [
		rsBreak,
		rsUpper,
		"$"
	].join("|") + ")",
	rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [
		rsBreak,
		rsUpper + rsMiscLower,
		"$"
	].join("|") + ")",
	rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
	rsUpper + "+" + rsOptContrUpper,
	rsOrdUpper,
	rsOrdLower,
	rsDigits,
	rsEmoji
].join("|"), "g");
/**
* Splits a Unicode `string` into an array of its words.
*
* @private
* @param {string} The string to inspect.
* @returns {Array} Returns the words of `string`.
*/
function unicodeWords(string) {
	return string.match(reUnicodeWord) || [];
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/words.js
/**
* Splits `string` into an array of its words.
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to inspect.
* @param {RegExp|string} [pattern] The pattern to match words.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {Array} Returns the words of `string`.
* @example
*
* _.words('fred, barney, & pebbles');
* // => ['fred', 'barney', 'pebbles']
*
* _.words('fred, barney, & pebbles', /[^, ]+/g);
* // => ['fred', 'barney', '&', 'pebbles']
*/
function words(string, pattern, guard) {
	string = toString(string);
	pattern = guard ? void 0 : pattern;
	if (pattern === void 0) return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	return string.match(pattern) || [];
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createCompounder.js
/** Used to match apostrophes. */
var reApos = RegExp("['’]", "g");
/**
* Creates a function like `_.camelCase`.
*
* @private
* @param {Function} callback The function to combine each word.
* @returns {Function} Returns the new compounder function.
*/
function createCompounder(callback) {
	return function(string) {
		return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
	};
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseHasIn.js
/**
* The base implementation of `_.hasIn` without support for deep paths.
*
* @private
* @param {Object} [object] The object to query.
* @param {Array|string} key The key to check.
* @returns {boolean} Returns `true` if `key` exists, else `false`.
*/
function baseHasIn(object, key) {
	return object != null && key in Object(object);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hasPath.js
/**
* Checks if `path` exists on `object`.
*
* @private
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @param {Function} hasFunc The function to check properties.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
*/
function hasPath(object, path, hasFunc) {
	path = castPath(path, object);
	var index = -1, length = path.length, result = false;
	while (++index < length) {
		var key = toKey(path[index]);
		if (!(result = object != null && hasFunc(object, key))) break;
		object = object[key];
	}
	if (result || ++index != length) return result;
	length = object == null ? 0 : object.length;
	return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/hasIn.js
/**
* Checks if `path` is a direct or inherited property of `object`.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Object
* @param {Object} object The object to query.
* @param {Array|string} path The path to check.
* @returns {boolean} Returns `true` if `path` exists, else `false`.
* @example
*
* var object = _.create({ 'a': _.create({ 'b': 2 }) });
*
* _.hasIn(object, 'a');
* // => true
*
* _.hasIn(object, 'a.b');
* // => true
*
* _.hasIn(object, ['a', 'b']);
* // => true
*
* _.hasIn(object, 'b');
* // => false
*/
function hasIn(object, path) {
	return object != null && hasPath(object, path, baseHasIn);
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isString.js
/** `Object#toString` result references. */
var stringTag = "[object String]";
/**
* Checks if `value` is classified as a `String` primitive or object.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a string, else `false`.
* @example
*
* _.isString('abc');
* // => true
*
* _.isString(1);
* // => false
*/
function isString(value) {
	return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isNumber.js
/** `Object#toString` result references. */
var numberTag = "[object Number]";
/**
* Checks if `value` is classified as a `Number` primitive or object.
*
* **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
* classified as numbers, use the `_.isFinite` method.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a number, else `false`.
* @example
*
* _.isNumber(3);
* // => true
*
* _.isNumber(Number.MIN_VALUE);
* // => true
*
* _.isNumber(Infinity);
* // => true
*
* _.isNumber('3');
* // => false
*/
function isNumber(value) {
	return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/kebabCase.js
/**
* Converts `string` to
* [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the kebab cased string.
* @example
*
* _.kebabCase('Foo Bar');
* // => 'foo-bar'
*
* _.kebabCase('fooBar');
* // => 'foo-bar'
*
* _.kebabCase('__FOO_BAR__');
* // => 'foo-bar'
*/
var kebabCase = createCompounder(function(result, word, index) {
	return result + (index ? "-" : "") + word.toLowerCase();
});
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePickBy.js
/**
* The base implementation of  `_.pickBy` without support for iteratee shorthands.
*
* @private
* @param {Object} object The source object.
* @param {string[]} paths The property paths to pick.
* @param {Function} predicate The function invoked per property.
* @returns {Object} Returns the new object.
*/
function basePickBy(object, paths, predicate) {
	var index = -1, length = paths.length, result = {};
	while (++index < length) {
		var path = paths[index], value = baseGet(object, path);
		if (predicate(value, path)) baseSet(result, castPath(path, object), value);
	}
	return result;
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePick.js
/**
* The base implementation of `_.pick` without support for individual
* property identifiers.
*
* @private
* @param {Object} object The source object.
* @param {string[]} paths The property paths to pick.
* @returns {Object} Returns the new object.
*/
function basePick(object, paths) {
	return basePickBy(object, paths, function(value, path) {
		return hasIn(object, path);
	});
}
// ../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/pick.js
/**
* Creates an object composed of the picked `object` properties.
*
* @static
* @since 0.1.0
* @memberOf _
* @category Object
* @param {Object} object The source object.
* @param {...(string|string[])} [paths] The property paths to pick.
* @returns {Object} Returns the new object.
* @example
*
* var object = { 'a': 1, 'b': '2', 'c': 3 };
*
* _.pick(object, ['a', 'c']);
* // => { 'a': 1, 'c': 3 }
*/
var pick = flatRest(function(object, paths) {
	return object == null ? {} : basePick(object, paths);
});
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/platform/index.js
var hasV8BreakIterator;
try {
	hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
	hasV8BreakIterator = false;
}
var testUserAgent = (regexp) => {
	return regexp.test(navigator.userAgent);
};
var isBrowser = typeof document === "object" && !!document;
var isEdge = isBrowser && testUserAgent(/(edge)/i);
var isTrident = isBrowser && testUserAgent(/(msie|trident)/i);
var isBlink = isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !isEdge && !isTrident;
var isWebKit = isBrowser && testUserAgent(/AppleWebKit/i) && !isBlink && !isEdge && !isTrident;
var isFirefox = isBrowser && testUserAgent(/(firefox|minefield)/i);
isBrowser && testUserAgent(/safari/i);
isBrowser && testUserAgent(/iPad|iPhone|iPod/) && "MSStream" in window;
isBrowser && testUserAgent(/android/i);
var flexGapSupported;
function supportsFlexGap() {
	if (!isBrowser) return false;
	if (flexGapSupported !== void 0) return flexGapSupported;
	const flex = document.createElement("div");
	flex.style.display = "flex";
	flex.style.flexDirection = "column";
	flex.style.rowGap = "1px";
	flex.appendChild(document.createElement("div"));
	flex.appendChild(document.createElement("div"));
	document.body.appendChild(flex);
	flexGapSupported = flex.scrollHeight === 1;
	document.body.removeChild(flex);
	return flexGapSupported;
}
var supportsPassiveEvents;
function supportsPassiveEventListeners() {
	if (supportsPassiveEvents == null && typeof window !== "undefined") try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: () => supportsPassiveEvents = true }));
	} finally {
		supportsPassiveEvents = supportsPassiveEvents || false;
	}
	return supportsPassiveEvents;
}
function normalizePassiveListenerOptions(options) {
	return supportsPassiveEventListeners() ? options : !!options.capture;
}
var shadowDomIsSupported;
function _supportsShadowDom() {
	if (shadowDomIsSupported == null) {
		const head = typeof document !== "undefined" ? document.head : null;
		shadowDomIsSupported = !!(head && (head.createShadowRoot || head.attachShadow));
	}
	return shadowDomIsSupported;
}
function _getShadowRoot(element) {
	if (_supportsShadowDom()) {
		const rootNode = element.getRootNode ? element.getRootNode() : null;
		if (typeof ShadowRoot !== "undefined" && ShadowRoot && rootNode instanceof ShadowRoot) return rootNode;
	}
	return null;
}
function _getEventTarget(event) {
	return event.composedPath ? event.composedPath()[0] : event.target;
}
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/utils/index.js
function callEmit(funcs, ...args) {
	if (!funcs) return;
	if (Array.isArray(funcs)) funcs.forEach((fn) => fn(...args));
	else return funcs(...args);
}
function tryOnScopeDispose(fn) {
	if (!getCurrentScope()) return false;
	onScopeDispose(fn);
	return true;
}
function createSharedComposable(composable) {
	let subscribers = 0;
	let state;
	let scope;
	const dispose = () => {
		if (scope && --subscribers <= 0) {
			scope.stop();
			state = scope = void 0;
		}
	};
	return (...args) => {
		subscribers++;
		if (!state) {
			scope = effectScope(true);
			state = scope.run(() => composable(...args));
		}
		tryOnScopeDispose(dispose);
		return state;
	};
}
function useState(defaultOrFactory, shallow = true) {
	const defaultValue = isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
	const state = shallow ? shallowRef(defaultValue) : ref(defaultValue);
	const setState = (value) => {
		if (value !== toRaw(state.value)) state.value = value;
	};
	return [computed(() => state.value), setState];
}
function useControlledProp(props, key, defaultOrFactory) {
	const tempProp = shallowRef(unref(props)[key]);
	watch(() => unref(props)[key], (value) => tempProp.value = value);
	const state = computed(() => {
		var _a, _b;
		return (_b = (_a = unref(props)[key]) != null ? _a : tempProp.value) != null ? _b : isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory;
	});
	const setState = (value, ...args) => {
		if (value !== toRaw(state.value)) {
			tempProp.value = value;
			callEmit(unref(props)[`onUpdate:${key}`], value, ...args);
		}
	};
	return [state, setState];
}
function isNumeric(val) {
	return !isNaN(parseFloat(val)) && isFinite(val);
}
var isHTMLElement = (val) => toRawType(val).startsWith("HTML");
function convertArray(value) {
	if (isNil(value)) return [];
	return Array.isArray(value) ? value : [value];
}
function convertNumber(value, fallback = 0) {
	return isNumeric(value) ? Number(value) : fallback;
}
function convertCssPixel(value) {
	if (isNil(value)) return "";
	return typeof value === "string" ? value : `${value}px`;
}
function convertElement(elementOrInstance) {
	var _a;
	const element = unref(elementOrInstance);
	return isHTMLElement(element) ? element : (_a = element == null ? void 0 : element.$el) != null ? _a : element;
}
function on(el, type, listener, options) {
	if (el && type && listener) el.addEventListener(type, listener, options);
}
function off(el, type, listener, options) {
	if (el && type && listener) el.removeEventListener(type, listener, options);
}
var rAF = requestAnimationFrame || ((cb) => setTimeout(cb, 1e3 / 60));
var cancelRAF = cancelAnimationFrame || clearTimeout;
function isStyleVisible(element) {
	const { display, visibility, opacity } = getComputedStyle(element);
	return display !== "none" && visibility !== "hidden" && visibility !== "collapse" && opacity !== "0";
}
function isAttributeVisible(element) {
	let box;
	if (element instanceof HTMLElement) {
		if (element.offsetParent) return true;
		box = element.getBoundingClientRect();
	} else if (element.getBBox) box = element.getBBox();
	if (box && box.width && box.height) return true;
	return false;
}
function isVisibleElement(element) {
	if (!element) return false;
	return isStyleVisible(element) && isAttributeVisible(element);
}
function isTouchEvent(evt) {
	return evt.type.startsWith("touch");
}
function isFocusable(element) {
	if (!element || !(element instanceof HTMLElement) && !(element instanceof SVGElement)) return false;
	if (element.getAttribute("tabIndex") !== null) return true;
	switch (element.nodeName) {
		case "A": return !!element.href && element.rel != "ignore";
		case "INPUT": return element.type != "hidden" && element.type != "file";
		case "BUTTON":
		case "SELECT":
		case "TEXTAREA": return true;
		default: return element instanceof HTMLElement ? element.isContentEditable : false;
	}
}
function getMouseEvent(evt) {
	return isTouchEvent(evt) ? evt.touches[0] || evt.changedTouches[0] : evt;
}
function getMouseClientXY(evt) {
	const { clientX, clientY } = getMouseEvent(evt);
	return {
		clientX,
		clientY
	};
}
function parseSize(size, fallback = 0) {
	const parsedSize = parseFloat(size);
	return Number.isNaN(parsedSize) ? fallback : parsedSize;
}
function getBoxSizingData(node) {
	const css = window.getComputedStyle(node);
	return [
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"borderTop",
		"borderBottom",
		"borderLeft",
		"borderRight"
	].reduce((data, key) => {
		data[key] = parseSize(css[key]);
		return data;
	}, { boxSizing: css.boxSizing });
}
var easeInOutCubic = (elapsed, initialValue, amountOfChange, duration) => {
	if (duration <= 0) return amountOfChange + initialValue;
	if ((elapsed /= duration / 2) < 1) return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
	return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
};
var logWrapper = (location, args, log) => {
	log(`[@idux/${location}]:`, ...args);
};
var info = (location, ...args) => logWrapper(location, args, console.log);
var warn = (location, ...args) => logWrapper(location, args, console.warn);
var error = (location, ...args) => logWrapper(location, args, console.error);
var Logger = {
	info,
	warn,
	error
};
var throwError = (location, message) => {
	throw new Error(`[@idux/${location}]: ${message}`);
};
var NoopFunction = () => {};
var NoopObject = Object.freeze({});
Object.freeze([]);
var nodeId = 0;
function uniqueId(prefix = "ix") {
	return `${prefix}-${nodeId++}`;
}
function useEventListener(target, type, listener, options) {
	const stopWatch = watch(() => convertElement(target), (currElement, prevElement) => {
		off(prevElement, type, listener, options);
		on(currElement, type, listener, options);
	}, {
		immediate: true,
		flush: "post"
	});
	const stop = () => {
		off(convertElement(target), type, listener, options);
		stopWatch();
	};
	tryOnScopeDispose(stop);
	return stop;
}
function useKey() {
	var _a;
	const { vnode, uid } = getCurrentInstance();
	return (_a = vnode.key) != null ? _a : uid;
}
var TEMPLATE = "template";
var isComment = (node) => node.type === Comment;
var isFragment = (node) => node.type === Fragment;
var isTemplate = (node) => node.type === TEMPLATE;
var isText = (node) => node.type === Text;
function getValidNode(node, depth) {
	if (isComment(node)) return;
	if (isFragment(node) || isTemplate(node)) return depth > 0 ? getFirstValidNode(node.children, depth - 1) : void 0;
	return node;
}
function getFirstValidNode(nodes, maxDepth = 3) {
	let validNode;
	for (const node of convertArray(nodes)) {
		validNode = getValidNode(node, maxDepth);
		if (validNode) break;
	}
	return validNode;
}
function hasSlot(slots, key = "default") {
	return !isNil(slots[key]);
}
function isEmptyNode(nodes) {
	return convertArray(nodes).every((node) => !node || isComment(node) || isFragment(node) && node.children.length === 0 || isText(node) && node.children.trim() === "");
}
function flattenNode(nodes, filterOptions = {}) {
	const result = [];
	convertArray(nodes).forEach((node) => {
		if (Array.isArray(node)) result.push(...flattenNode(node, filterOptions));
		else if (isFragment(node)) result.push(...flattenNode(node.children, filterOptions));
		else {
			const { empty = true, key } = filterOptions;
			if (empty && isEmptyNode(node)) return;
			const keys = convertArray(key);
			if (keys.length && isVNode(node) && !keys.some((key2) => node.type[key2])) return;
			result.push(node);
		}
	});
	return result;
}
function traverseTree(data, childrenKey, fn, traverseStrategy = "pre") {
	const traverse = (_data, parents) => {
		for (let idx = 0; idx < _data.length; idx++) {
			const item = _data[idx];
			traverseStrategy === "pre" && fn(item, parents, idx);
			if (item[childrenKey]) traverse(item[childrenKey], [item, ...parents]);
			traverseStrategy === "post" && fn(item, parents, idx);
		}
	};
	traverse(data, []);
}
function _insertTreeItem(data, targetKey, newItem, childrenKey, getKey, isAfter = true) {
	return data.flatMap((item) => {
		if (getKey(item) === targetKey) return isAfter ? [item, newItem] : [newItem, item];
		const chlidren = item[childrenKey];
		if (chlidren == null ? void 0 : chlidren.length) return {
			...item,
			children: _insertTreeItem(chlidren, targetKey, newItem, childrenKey, getKey, isAfter)
		};
		return item;
	});
}
function insertTreeItemBefore(data, targetKey, newItem, childrenKey, getKey) {
	return _insertTreeItem(data, targetKey, newItem, childrenKey, getKey, false);
}
function insertTreeItemAfter(data, targetKey, newItem, childrenKey, getKey) {
	return _insertTreeItem(data, targetKey, newItem, childrenKey, getKey, true);
}
function insertChildTreeItem(data, targetKey, newItem, childrenKey, getKey) {
	return data.flatMap((item) => {
		var _a;
		const children = (_a = item[childrenKey]) != null ? _a : [];
		if (getKey(item) === targetKey) return {
			...item,
			isOpen: true,
			children: [newItem, ...children]
		};
		if (!children.length) return item;
		return {
			...item,
			children: insertChildTreeItem(children, targetKey, newItem, childrenKey, getKey)
		};
	});
}
function removeTreeItem(data, targetKey, childrenKey, getKey) {
	let removed = false;
	const filterFn = (_data) => {
		if (removed) return [..._data];
		const filterRes = [];
		_data.forEach((item) => {
			if (getKey(item) !== targetKey) {
				const children = item[childrenKey];
				filterRes.push((children == null ? void 0 : children.length) ? {
					...item,
					[childrenKey]: filterFn(children)
				} : item);
			} else removed = true;
		});
		return filterRes;
	};
	return filterFn(data);
}
-(Math.pow(10, 8) * 24 * 60 * 60 * 1e3);
/**
* @constant
* @name constructFromSymbol
* @summary Symbol enabling Date extensions to inherit properties from the reference date.
*
* The symbol is used to enable the `constructFrom` function to construct a date
* using a reference date and a value. It allows to transfer extra properties
* from the reference date to the new date. It's useful for extensions like
* [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
* a constructor argument.
*/
var constructFromSymbol = Symbol.for("constructDateFrom");
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/constructFrom.js
/**
* @name constructFrom
* @category Generic Helpers
* @summary Constructs a date using the reference date and the value
*
* @description
* The function constructs a new date using the constructor from the reference
* date and the given value. It helps to build generic functions that accept
* date extensions.
*
* It defaults to `Date` if the passed reference date is a number or a string.
*
* Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
*
* @param date - The reference date to take constructor from
* @param value - The value to create the date
*
* @returns Date initialized using the given date and value
*
* @example
* import { constructFrom } from "./constructFrom/date-fns";
*
* // A function that clones a date preserving the original type
* function cloneDate<DateType extends Date>(date: DateType): DateType {
*   return constructFrom(
*     date, // Use constructor from the given date
*     date.getTime() // Use the date value to create a new date
*   );
* }
*/
function constructFrom(date, value) {
	if (typeof date === "function") return date(value);
	if (date && typeof date === "object" && constructFromSymbol in date) return date[constructFromSymbol](value);
	if (date instanceof Date) return new date.constructor(value);
	return new Date(value);
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/toDate.js
/**
* @name toDate
* @category Common Helpers
* @summary Convert the given argument to an instance of Date.
*
* @description
* Convert the given argument to an instance of Date.
*
* If the argument is an instance of Date, the function returns its clone.
*
* If the argument is a number, it is treated as a timestamp.
*
* If the argument is none of the above, the function returns Invalid Date.
*
* Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
* enabling to transfer extra properties from the reference date to the new date.
* It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
* that accept a time zone as a constructor argument.
*
* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param argument - The value to convert
*
* @returns The parsed date in the local time zone
*
* @example
* // Clone the date:
* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
* //=> Tue Feb 11 2014 11:30:30
*
* @example
* // Convert the timestamp to date:
* const result = toDate(1392098430000)
* //=> Tue Feb 11 2014 11:30:30
*/
function toDate(argument, context) {
	return constructFrom(context || argument, argument);
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/defaultOptions.js
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/startOfWeek.js
/**
* The {@link startOfWeek} function options.
*/
/**
* @name startOfWeek
* @category Week Helpers
* @summary Return the start of a week for the given date.
*
* @description
* Return the start of a week for the given date.
* The result will be in the local timezone.
*
* @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
* @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
*
* @param date - The original date
* @param options - An object with options
*
* @returns The start of a week
*
* @example
* // The start of a week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
* //=> Sun Aug 31 2014 00:00:00
*
* @example
* // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
* const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
* //=> Mon Sep 01 2014 00:00:00
*/
function startOfWeek(date, options) {
	var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _defaultOptions$local;
	const defaultOptions = getDefaultOptions();
	const weekStartsOn = (_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 || (_options$locale = options.locale) === null || _options$locale === void 0 || (_options$locale = _options$locale.options) === null || _options$locale === void 0 ? void 0 : _options$locale.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 || (_defaultOptions$local = _defaultOptions$local.options) === null || _defaultOptions$local === void 0 ? void 0 : _defaultOptions$local.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0;
	const _date = toDate(date, options === null || options === void 0 ? void 0 : options.in);
	const day = _date.getDay();
	const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	_date.setDate(_date.getDate() - diff);
	_date.setHours(0, 0, 0, 0);
	return _date;
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/_lib/normalizeDates.js
function normalizeDates(context, ...dates) {
	const normalize = constructFrom.bind(null, context || dates.find((date) => typeof date === "object"));
	return dates.map(normalize);
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
	return (options = {}) => {
		const width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
* The localize function argument callback which allows to convert raw value to
* the actual type.
*
* @param value - The value to convert
*
* @returns The converted value
*/
/**
* The map of localized values for each width.
*/
/**
* The index type of the locale unit value. It types conversion of units of
* values that don't start at 0 (i.e. quarters).
*/
/**
* Converts the unit value to the tuple of values.
*/
/**
* The tuple of localized era values. The first element represents BC,
* the second element represents AD.
*/
/**
* The tuple of localized quarter values. The first element represents Q1.
*/
/**
* The tuple of localized day values. The first element represents Sunday.
*/
/**
* The tuple of localized month values. The first element represents January.
*/
function buildLocalizeFn(args) {
	return (value, options) => {
		const context = (options === null || options === void 0 ? void 0 : options.context) ? String(options.context) : "standalone";
		let valuesArray;
		if (context === "formatting" && args.formattingValues) {
			const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			const width = (options === null || options === void 0 ? void 0 : options.width) ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			const defaultWidth = args.defaultWidth;
			const width = (options === null || options === void 0 ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[width] || args.values[defaultWidth];
		}
		const index = args.argumentCallback ? args.argumentCallback(value) : value;
		return valuesArray[index];
	};
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
	return (string, options = {}) => {
		const width = options.width;
		const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		const matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : findKey(parsePatterns, (pattern) => pattern.test(matchedString));
		let value;
		value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (let key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
	return (string, options = {}) => {
		const matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		const matchedString = matchResult[0];
		const parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		const rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/isSameWeek.js
/**
* The {@link isSameWeek} function options.
*/
/**
* @name isSameWeek
* @category Week Helpers
* @summary Are the given dates in the same week (and month and year)?
*
* @description
* Are the given dates in the same week (and month and year)?
*
* @param laterDate - The first date to check
* @param earlierDate - The second date to check
* @param options - An object with options
*
* @returns The dates are in the same week (and month and year)
*
* @example
* // Are 31 August 2014 and 4 September 2014 in the same week?
* const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
* //=> true
*
* @example
* // If week starts with Monday,
* // are 31 August 2014 and 4 September 2014 in the same week?
* const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
*   weekStartsOn: 1
* })
* //=> false
*
* @example
* // Are 1 January 2014 and 1 January 2015 in the same week?
* const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
* //=> false
*/
function isSameWeek(laterDate, earlierDate, options) {
	const [laterDate_, earlierDate_] = normalizeDates(options === null || options === void 0 ? void 0 : options.in, laterDate, earlierDate);
	return +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options);
}
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/zh-CN/_lib/formatDistance.js
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "不到 1 秒",
		other: "不到 {{count}} 秒"
	},
	xSeconds: {
		one: "1 秒",
		other: "{{count}} 秒"
	},
	halfAMinute: "半分钟",
	lessThanXMinutes: {
		one: "不到 1 分钟",
		other: "不到 {{count}} 分钟"
	},
	xMinutes: {
		one: "1 分钟",
		other: "{{count}} 分钟"
	},
	xHours: {
		one: "1 小时",
		other: "{{count}} 小时"
	},
	aboutXHours: {
		one: "大约 1 小时",
		other: "大约 {{count}} 小时"
	},
	xDays: {
		one: "1 天",
		other: "{{count}} 天"
	},
	aboutXWeeks: {
		one: "大约 1 个星期",
		other: "大约 {{count}} 个星期"
	},
	xWeeks: {
		one: "1 个星期",
		other: "{{count}} 个星期"
	},
	aboutXMonths: {
		one: "大约 1 个月",
		other: "大约 {{count}} 个月"
	},
	xMonths: {
		one: "1 个月",
		other: "{{count}} 个月"
	},
	aboutXYears: {
		one: "大约 1 年",
		other: "大约 {{count}} 年"
	},
	xYears: {
		one: "1 年",
		other: "{{count}} 年"
	},
	overXYears: {
		one: "超过 1 年",
		other: "超过 {{count}} 年"
	},
	almostXYears: {
		one: "将近 1 年",
		other: "将近 {{count}} 年"
	}
};
var formatDistance = (token, count, options) => {
	let result;
	const tokenValue = formatDistanceLocale[token];
	if (typeof tokenValue === "string") result = tokenValue;
	else if (count === 1) result = tokenValue.one;
	else result = tokenValue.other.replace("{{count}}", String(count));
	if (options === null || options === void 0 ? void 0 : options.addSuffix) {
		if (options.comparison && options.comparison > 0) return result + "内";
		else return result + "前";
	}
	return result;
};
var formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "y'年'M'月'd'日' EEEE",
			long: "y'年'M'月'd'日'",
			medium: "yyyy-MM-dd",
			short: "yy-MM-dd"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "zzzz a h:mm:ss",
			long: "z a h:mm:ss",
			medium: "a h:mm:ss",
			short: "a h:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} {{time}}",
			long: "{{date}} {{time}}",
			medium: "{{date}} {{time}}",
			short: "{{date}} {{time}}"
		},
		defaultWidth: "full"
	})
};
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/zh-CN/_lib/formatRelative.js
function checkWeek(date, baseDate, options) {
	const baseFormat = "eeee p";
	if (isSameWeek(date, baseDate, options)) return baseFormat;
	else if (date.getTime() > baseDate.getTime()) return "'下个'eeee p";
	return "'上个'eeee p";
}
var formatRelativeLocale = {
	lastWeek: checkWeek,
	yesterday: "'昨天' p",
	today: "'今天' p",
	tomorrow: "'明天' p",
	nextWeek: checkWeek,
	other: "PP p"
};
var formatRelative = (token, date, baseDate, options) => {
	const format = formatRelativeLocale[token];
	if (typeof format === "function") return format(date, baseDate, options);
	return format;
};
// ../../node_modules/.pnpm/date-fns@4.4.0/node_modules/date-fns/locale/zh-CN/_lib/localize.js
var eraValues = {
	narrow: ["前", "公元"],
	abbreviated: ["前", "公元"],
	wide: ["公元前", "公元"]
};
var quarterValues = {
	narrow: [
		"1",
		"2",
		"3",
		"4"
	],
	abbreviated: [
		"第一季",
		"第二季",
		"第三季",
		"第四季"
	],
	wide: [
		"第一季度",
		"第二季度",
		"第三季度",
		"第四季度"
	]
};
var monthValues = {
	narrow: [
		"一",
		"二",
		"三",
		"四",
		"五",
		"六",
		"七",
		"八",
		"九",
		"十",
		"十一",
		"十二"
	],
	abbreviated: [
		"1月",
		"2月",
		"3月",
		"4月",
		"5月",
		"6月",
		"7月",
		"8月",
		"9月",
		"10月",
		"11月",
		"12月"
	],
	wide: [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月"
	]
};
var dayValues = {
	narrow: [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	short: [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	abbreviated: [
		"周日",
		"周一",
		"周二",
		"周三",
		"周四",
		"周五",
		"周六"
	],
	wide: [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	]
};
var dayPeriodValues = {
	narrow: {
		am: "上",
		pm: "下",
		midnight: "凌晨",
		noon: "午",
		morning: "早",
		afternoon: "下午",
		evening: "晚",
		night: "夜"
	},
	abbreviated: {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	wide: {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	}
};
var formattingDayPeriodValues = {
	narrow: {
		am: "上",
		pm: "下",
		midnight: "凌晨",
		noon: "午",
		morning: "早",
		afternoon: "下午",
		evening: "晚",
		night: "夜"
	},
	abbreviated: {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	},
	wide: {
		am: "上午",
		pm: "下午",
		midnight: "凌晨",
		noon: "中午",
		morning: "早晨",
		afternoon: "中午",
		evening: "晚上",
		night: "夜间"
	}
};
var ordinalNumber = (dirtyNumber, options) => {
	const number = Number(dirtyNumber);
	switch (options === null || options === void 0 ? void 0 : options.unit) {
		case "date": return number.toString() + "日";
		case "hour": return number.toString() + "时";
		case "minute": return number.toString() + "分";
		case "second": return number.toString() + "秒";
		default: return "第 " + number.toString();
	}
};
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/locales/index.js
var zhCN = {
	type: "zh-CN",
	date: {
		code: "zh-CN",
		formatDistance,
		formatLong,
		formatRelative,
		localize: {
			ordinalNumber,
			era: buildLocalizeFn({
				values: eraValues,
				defaultWidth: "wide"
			}),
			quarter: buildLocalizeFn({
				values: quarterValues,
				defaultWidth: "wide",
				argumentCallback: (quarter) => quarter - 1
			}),
			month: buildLocalizeFn({
				values: monthValues,
				defaultWidth: "wide"
			}),
			day: buildLocalizeFn({
				values: dayValues,
				defaultWidth: "wide"
			}),
			dayPeriod: buildLocalizeFn({
				values: dayPeriodValues,
				defaultWidth: "wide",
				formattingValues: formattingDayPeriodValues,
				defaultFormattingWidth: "wide"
			})
		},
		match: {
			ordinalNumber: buildMatchPatternFn({
				matchPattern: /^(第\s*)?\d+(日|时|分|秒)?/i,
				parsePattern: /\d+/i,
				valueCallback: (value) => parseInt(value, 10)
			}),
			era: buildMatchFn({
				matchPatterns: {
					narrow: /^(前)/i,
					abbreviated: /^(前)/i,
					wide: /^(公元前|公元)/i
				},
				defaultMatchWidth: "wide",
				parsePatterns: { any: [/^(前)/i, /^(公元)/i] },
				defaultParseWidth: "any"
			}),
			quarter: buildMatchFn({
				matchPatterns: {
					narrow: /^[1234]/i,
					abbreviated: /^第[一二三四]刻/i,
					wide: /^第[一二三四]刻钟/i
				},
				defaultMatchWidth: "wide",
				parsePatterns: { any: [
					/(1|一)/i,
					/(2|二)/i,
					/(3|三)/i,
					/(4|四)/i
				] },
				defaultParseWidth: "any",
				valueCallback: (index) => index + 1
			}),
			month: buildMatchFn({
				matchPatterns: {
					narrow: /^(一|二|三|四|五|六|七|八|九|十[二一]?)/i,
					abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]?|\d|1[0-2])月/i,
					wide: /^(一|二|三|四|五|六|七|八|九|十[二一]?)月/i
				},
				defaultMatchWidth: "wide",
				parsePatterns: {
					narrow: [
						/^一/i,
						/^二/i,
						/^三/i,
						/^四/i,
						/^五/i,
						/^六/i,
						/^七/i,
						/^八/i,
						/^九/i,
						/^十(?!(一|二))/i,
						/^十一/i,
						/^十二/i
					],
					any: [
						/^(一|1(?!\d))/i,
						/^(二|2)/i,
						/^(三|3)/i,
						/^(四|4)/i,
						/^(五|5)/i,
						/^(六|6)/i,
						/^(七|7)/i,
						/^(八|8)/i,
						/^(九|9)/i,
						/^(十(?!(一|二))|10)/i,
						/^(十一|11)/i,
						/^(十二|12)/i
					]
				},
				defaultParseWidth: "any"
			}),
			day: buildMatchFn({
				matchPatterns: {
					narrow: /^[一二三四五六日]/i,
					short: /^[一二三四五六日]/i,
					abbreviated: /^周[一二三四五六日]/i,
					wide: /^星期[一二三四五六日]/i
				},
				defaultMatchWidth: "wide",
				parsePatterns: { any: [
					/日/i,
					/一/i,
					/二/i,
					/三/i,
					/四/i,
					/五/i,
					/六/i
				] },
				defaultParseWidth: "any"
			}),
			dayPeriod: buildMatchFn({
				matchPatterns: { any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i },
				defaultMatchWidth: "any",
				parsePatterns: { any: {
					am: /^上午?/i,
					pm: /^下午?/i,
					midnight: /^午夜/i,
					noon: /^[中正]午/i,
					morning: /^早上/i,
					afternoon: /^下午/i,
					evening: /^晚上?/i,
					night: /^凌晨/i
				} },
				defaultParseWidth: "any"
			})
		},
		options: {
			weekStartsOn: 1,
			firstWeekContainsDate: 4
		}
	},
	colorPicker: { presetEmpty: "暂无" },
	datePicker: {
		today: "今天",
		ok: "确定",
		clear: "清除",
		month: "月",
		year: "年",
		monthSelect: "选择月份",
		yearSelect: "选择年份",
		monthFormat: "MMM",
		yearFormat: "yyyy年",
		previousMonth: "上个月",
		nextMonth: "下个月",
		previousYear: "上一年",
		nextYear: "下一年",
		previousDecade: "上一年代",
		nextDecade: "下一年代",
		datePlaceholder: "请选择日期",
		yearPlaceholder: "请选择年份",
		quarterPlaceholder: "请选择季度",
		monthPlaceholder: "请选择月份",
		weekPlaceholder: "请选择周",
		datetimePlaceholder: "请选择日期时间"
	},
	dateRangePicker: {
		datePlaceholder: ["开始日期", "结束日期"],
		weekPlaceholder: ["开始周", "结束周"],
		monthPlaceholder: ["开始月份", "结束月份"],
		quarterPlaceholder: ["开始季度", "结束季度"],
		yearPlaceholder: ["开始年份", "结束年份"],
		datetimePlaceholder: ["开始时间", "结束时间"],
		separator: "至",
		shortcuts: {
			today: "今天",
			yesterday: "昨天",
			last24h: "近24小时",
			last7d: "近7天",
			last30d: "近30天",
			last180d: "近180天",
			custom: "自定义"
		},
		okText: "确定",
		cancelText: "取消"
	},
	empty: { description: "暂无数据" },
	modal: {
		cancelText: "取消",
		okText: "确定",
		justOkText: "我知道了"
	},
	popconfirm: {
		cancelText: "取消",
		okText: "确定"
	},
	pagination: {
		itemsPerPage: "每页",
		itemsSuffix: "项",
		jumpTo: "前往",
		page: "页",
		prev: "上一页",
		next: "下一页",
		prev5: "向前 5 页",
		next5: "向后 5 页",
		totalPrefix: "共",
		totalSuffix: "项"
	},
	select: { limitMessage: "该选择器的值不能超过 ${0} 项" },
	table: {
		expand: "展开行",
		collapse: "收起行",
		filterTitle: "筛选",
		filterConfirm: "确定",
		filterReset: "重置",
		filterEmptyText: "无筛选项",
		selectAll: "全选所有",
		selectInvert: "反选所有",
		selectNone: "清空所有",
		selectPageAll: "全选当页",
		selectPageInvert: "反选当页",
		sortDesc: "点击降序",
		sortAsc: "点击升序",
		sortCancel: "取消排序"
	},
	tabs: { allTabs: "所有面板" },
	text: { copyText: ["点击复制", "复制成功"] },
	timePicker: {
		okText: "确定",
		placeholder: "请选择时间"
	},
	timeRangePicker: {
		okText: "确定",
		separator: "至",
		placeholder: ["起始时间", "结束时间"]
	},
	tour: {
		nextText: "下一步",
		prevText: "上一步",
		finishText: "开始体验"
	},
	transfer: {
		toSelect: "待选",
		selected: "已选",
		searchPlaceholder: ["搜索关键字", "搜索关键字"]
	},
	treeSelect: {
		expandAll: "展开全部",
		collapseAll: "收起全部"
	},
	upload: {
		uploading: "正在上传...",
		error: "上传失败",
		cancel: "取消上传",
		preview: "预览文件",
		remove: "删除文件",
		retry: "重新上传",
		download: "下载文件"
	}
};
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/config/index.js
function numFormatter(value, precision) {
	const separator = ".";
	const numMatchRet = String(value).match(/^(\d+)(\.(\d+))?$/);
	if (!numMatchRet) return {
		value: String(value),
		int: "",
		decimal: ""
	};
	else {
		const int = String(numMatchRet[1]);
		let decimal = String(numMatchRet[3] || "").slice(0, precision).padEnd(precision, "0");
		decimal = decimal.length > 0 ? `${separator}${decimal}` : "";
		return {
			value: `${int}${decimal}`,
			int,
			decimal
		};
	}
}
var expandIconRenderer = ({ expanded }) => h("svg", {
	viewBox: "0 0 16 16",
	style: {
		width: "var(--ix-font-size-icon)",
		height: "var(--ix-font-size-icon)"
	}
}, [
	h("rect", {
		x: 1,
		y: 1,
		width: 14,
		height: 14,
		rx: 1,
		style: { fill: "var(--ix-color-emphasized-container-bg)" }
	}),
	h("rect", {
		x: 5,
		y: 7,
		width: 6,
		height: 2,
		rx: .2,
		style: { fill: "var(--ix-color-icon)" }
	}),
	!expanded ? h("rect", {
		x: 7,
		y: 5,
		width: 2,
		height: 6,
		rx: .2,
		style: { fill: "var(--ix-color-icon)" }
	}) : null
]);
var defaultConfig = {
	common: {
		prefixCls: "ix",
		overlayZIndex: 1e3
	},
	locale: zhCN,
	theme: {
		injectThemeStyle: true,
		presetTheme: "default",
		hashed: true
	},
	alert: {
		centered: false,
		closable: false,
		icon: {
			success: "check-circle",
			error: "exclamation-circle",
			info: "info-circle",
			warning: "exclamation-circle",
			offline: "info-circle"
		}
	},
	anchor: {
		bounds: 5,
		hideLinkBall: false
	},
	avatar: {
		gap: 4,
		icon: "user",
		shape: "circle",
		size: "md"
	},
	backTop: {
		duration: 450,
		visibilityHeight: 400
	},
	badge: {
		showZero: false,
		dot: false,
		overflowCount: 99
	},
	button: {
		size: "sm",
		waveless: false
	},
	card: {
		borderless: false,
		hoverable: false,
		size: "sm",
		shadow: true
	},
	carousel: {
		autoplayTime: 0,
		dotPlacement: "bottom",
		showArrow: false,
		trigger: "click"
	},
	cascader: {
		borderless: false,
		clearIcon: "close-circle",
		childrenKey: "children",
		expandIcon: "right",
		fullPath: true,
		getKey: "key",
		labelKey: "label",
		overlayMatchWidth: false,
		size: "md",
		suffix: "down"
	},
	checkbox: {
		size: "md",
		waveless: false
	},
	collapse: {
		accordion: false,
		borderless: false,
		expandIcon: "right",
		ghost: false,
		size: "md"
	},
	colorPicker: {
		format: "hex",
		size: "md"
	},
	datePicker: {
		allowInput: false,
		borderless: false,
		clearable: false,
		clearIcon: "close-circle",
		size: "md",
		suffix: "calendar"
	},
	desc: {
		col: 3,
		colonless: true,
		labelAlign: "start",
		layout: "horizontal",
		size: "md"
	},
	divider: {
		dashed: false,
		labelPlacement: "center",
		plain: false,
		size: "md"
	},
	drawer: {
		closable: true,
		closeOnEsc: true,
		closeIcon: "close-filled",
		distance: 160,
		height: 256,
		mask: true,
		maskClosable: true,
		width: 480
	},
	dropdown: {
		autoAdjust: true,
		destroyOnHide: false,
		offset: [0, 4],
		placement: "bottomStart",
		showArrow: false,
		trigger: "hover"
	},
	empty: {},
	form: {
		colonless: true,
		labelAlign: "start",
		layout: "horizontal",
		size: "md",
		labelTooltipIcon: "question-circle",
		controlTooltipIcon: "info-circle"
	},
	icon: {},
	input: {
		borderless: false,
		clearable: false,
		clearIcon: "close-circle",
		size: "md",
		trim: false
	},
	inputNumber: {
		keyboard: true,
		size: "md"
	},
	list: {
		size: "md",
		borderless: true
	},
	loadingBar: {
		mask: false,
		animation: {
			loading: {
				duration: 3e3,
				progress: 80
			},
			finish: {
				duration: 300,
				progress: 100
			},
			error: {
				duration: 400,
				progress: 100
			}
		}
	},
	image: { preview: true },
	imageViewer: {
		draggable: true,
		loop: true,
		maskClosable: true,
		zoom: [.5, 2]
	},
	menu: {
		getKey: "key",
		indent: 16,
		offset: [0, 4],
		suffix: "right",
		theme: "light"
	},
	message: {
		destroyOnHover: false,
		duration: 3e3,
		maxCount: 5,
		icon: {
			success: "check-circle-filled",
			error: "close-circle-filled",
			info: "info-circle-filled",
			warning: "exclamation-circle-filled",
			loading: "loading"
		}
	},
	modal: {
		animatable: true,
		centered: true,
		closable: true,
		closeIcon: "close-filled",
		closeOnEsc: true,
		mask: true,
		maskClosable: false,
		spinWithFullModal: false
	},
	notification: {
		destroyOnHover: false,
		duration: 4500,
		maxCount: 5,
		offset: 24,
		placement: "topEnd"
	},
	pagination: {
		pageSize: 10,
		pageSizes: [
			10,
			20,
			50,
			100
		],
		showQuickJumper: false,
		showSizeChanger: false,
		showTitle: true,
		showTotal: true,
		simple: false,
		size: "sm"
	},
	popconfirm: {
		autoAdjust: true,
		delay: 100,
		destroyOnHide: false,
		placement: "bottomStart",
		showArrow: true,
		trigger: "click",
		offset: [0, 4]
	},
	popover: {
		autoAdjust: true,
		delay: 100,
		destroyOnHide: false,
		placement: "bottomStart",
		showArrow: true,
		trigger: "hover",
		closeIcon: "close",
		offset: [0, 4]
	},
	progress: {
		strokeLinecap: "square",
		size: "md",
		format: (percent) => percent + "%",
		icon: {
			success: "check",
			exception: "close"
		}
	},
	radio: {
		size: "md",
		waveless: false
	},
	rate: {
		allowHalf: false,
		clearable: false,
		count: 5,
		icon: "star-filled",
		size: "md"
	},
	result: { status: "info" },
	row: { wrap: true },
	select: {
		borderless: false,
		childrenKey: "children",
		getKey: "key",
		clearIcon: "close-circle",
		labelKey: "label",
		offset: [0, 4],
		overlayMatchWidth: true,
		size: "md",
		suffix: "down"
	},
	skeleton: { animated: true },
	space: {
		size: 8,
		wrap: true
	},
	spin: {
		tip: "",
		tipAlign: "vertical",
		size: "md"
	},
	statistic: {
		precision: 0,
		formatter: numFormatter
	},
	stepper: {
		clickable: false,
		labelPlacement: "end",
		size: "sm"
	},
	switch: { size: "md" },
	tabs: {
		size: "md",
		showAllTabsPanel: true
	},
	table: {
		autoHeight: false,
		borderless: true,
		childrenKey: "children",
		getKey: "key",
		size: "md",
		scrollToTopOnChange: true,
		spinHeader: false,
		insetShadow: true,
		pagination: { position: "bottomEnd" },
		columnBase: {
			align: "start",
			sortable: {
				nextTooltip: false,
				orders: ["ascend", "descend"]
			},
			filterable: {
				multiple: true,
				footer: true
			}
		},
		columnExpandable: {
			showLine: true,
			icon: expandIconRenderer
		},
		columnSelectable: { showIndex: false },
		columnIndexable: {
			align: "center",
			customCell: ({ rowIndex, pageSize, pageIndex }) => (pageIndex - 1) * pageSize + rowIndex + 1
		}
	},
	tag: {},
	tagGroup: {
		gap: 8,
		wrap: true
	},
	textarea: {
		autoRows: false,
		clearable: false,
		clearIcon: "close-circle",
		resize: "vertical",
		showCount: false,
		size: "md",
		trim: false
	},
	text: { copyIcon: ["copy", "check-circle-filled"] },
	timePicker: {
		borderless: false,
		clearable: true,
		clearIcon: "close-circle",
		size: "md",
		suffix: "clock-circle",
		allowInput: true,
		format: "HH:mm:ss"
	},
	transfer: {
		getKey: "key",
		clearable: true,
		clearIcon: "delete",
		showSelectAll: true
	},
	tooltip: {
		autoAdjust: true,
		showArrow: true,
		delay: 100,
		destroyOnHide: false,
		offset: [0, 4],
		placement: "bottomStart",
		trigger: "hover"
	},
	tour: {
		animatable: true,
		gap: {
			offset: 4,
			radius: 2
		},
		offset: [0, 4],
		mask: true,
		placement: "bottomStart",
		showArrow: true,
		scrollIntoViewOptions: true,
		closeOnClick: false,
		closeOnEsc: true,
		closable: true
	},
	tree: {
		autoHeight: false,
		blocked: false,
		childrenKey: "children",
		expandIcon: expandIconRenderer,
		draggableIcon: "holder",
		getKey: "key",
		labelKey: "label",
		showLine: false
	},
	treeSelect: {
		borderless: false,
		childrenKey: "children",
		clearIcon: "close-circle",
		labelKey: "label",
		getKey: "key",
		offset: [0, 4],
		overlayMatchWidth: true,
		size: "md",
		suffix: "down"
	},
	upload: {
		multiple: false,
		dragable: false,
		directory: false,
		name: "file",
		withCredentials: false,
		requestMethod: "post"
	},
	uploadFiles: {
		type: "text",
		icon: {
			preview: "zoom-in",
			file: "paper-clip",
			remove: "close",
			retry: "edit"
		}
	}
};
var tokens = Object.keys(defaultConfig).map((key) => [key, Symbol(key)]);
var tokenMap = new Map(tokens);
function useGlobalConfig(compName, config) {
	const token = tokenMap.get(compName);
	const currConfig = inject(token, defaultConfig[compName]);
	if (!config) return currConfig;
	const newConfig = reactive(merge(cloneDeep(currConfig), config));
	provide(token, newConfig);
	return [newConfig, (config2) => merge(newConfig, config2)];
}
// ../../node_modules/.pnpm/@emotion+hash@0.9.2/node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
	var h = 0;
	var k, i = 0, len = str.length;
	for (; len >= 4; ++i, len -= 4) {
		k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
		k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
		k ^= k >>> 24;
		h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	switch (len) {
		case 3: h ^= (str.charCodeAt(i + 2) & 255) << 16;
		case 2: h ^= (str.charCodeAt(i + 1) & 255) << 8;
		case 1:
			h ^= str.charCodeAt(i) & 255;
			h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	h ^= h >>> 13;
	h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	return ((h ^ h >>> 15) >>> 0).toString(36);
}
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/theme/index.js
function getBaseColors$1() {
	return {
		red: "#f52727",
		orange: "#fa721b",
		brown: "#fdaa1d",
		yellow: "#f8d81a",
		canary: "#fcd200",
		bud: "#8dd118",
		green: "#39c317",
		turquoise: "#20cc94",
		cyan: "#19d2db",
		glacier: "#1ba0f2",
		blue: "#1c6eff",
		indigo: "#2229f6",
		purple: "#7824ff",
		magenta: "#d619be",
		graphite: "#a1a7b3",
		grey: "#a3a3a3",
		white: "#ffffff",
		black: "#000000",
		gold: "#e7aa40",
		silver: "#a9b4c8",
		bronze: "#c97f58"
	};
}
function bound01(n, max) {
	if (isOnePointZero(n)) n = "100%";
	const isPercent = isPercentage(n);
	n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
	if (isPercent) n = parseInt(String(n * max), 10) / 100;
	if (Math.abs(n - max) < 1e-6) return 1;
	if (max === 360) n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
	else n = n % max / parseFloat(String(max));
	return n;
}
function clamp01(val) {
	return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n) {
	return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
	return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
	a = parseFloat(a);
	if (isNaN(a) || a < 0 || a > 1) a = 1;
	return a;
}
function convertToPercentage(n) {
	if (Number(n) <= 1) return `${Number(n) * 100}%`;
	return n;
}
function pad2(c) {
	return c.length === 1 ? "0" + c : String(c);
}
function rgbToRgb(r, g, b) {
	return {
		r: bound01(r, 255) * 255,
		g: bound01(g, 255) * 255,
		b: bound01(b, 255) * 255
	};
}
function rgbToHsl(r, g, b) {
	r = bound01(r, 255);
	g = bound01(g, 255);
	b = bound01(b, 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;
	if (max === min) {
		s = 0;
		h = 0;
	} else {
		const d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b: h = (r - g) / d + 4;
		}
		h /= 6;
	}
	return {
		h,
		s,
		l
	};
}
function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * (6 * t);
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}
function hslToRgb(h, s, l) {
	let r;
	let g;
	let b;
	h = bound01(h, 360);
	s = bound01(s, 100);
	l = bound01(l, 100);
	if (s === 0) {
		g = l;
		b = l;
		r = l;
	} else {
		const q = l < .5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	};
}
function rgbToHsv(r, g, b) {
	r = bound01(r, 255);
	g = bound01(g, 255);
	b = bound01(b, 255);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	const v = max;
	const d = max - min;
	const s = max === 0 ? 0 : d / max;
	if (max === min) h = 0;
	else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b: h = (r - g) / d + 4;
		}
		h /= 6;
	}
	return {
		h,
		s,
		v
	};
}
function hsvToRgb(h, s, v) {
	h = bound01(h, 360) * 6;
	s = bound01(s, 100);
	v = bound01(v, 100);
	const i = Math.floor(h);
	const f = h - i;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);
	const mod = i % 6;
	const r = [
		v,
		q,
		p,
		p,
		t,
		v
	][mod];
	const g = [
		t,
		v,
		v,
		q,
		p,
		p
	][mod];
	const b = [
		p,
		p,
		t,
		v,
		v,
		q
	][mod];
	return {
		r: r * 255,
		g: g * 255,
		b: b * 255
	};
}
function rgbToHex(r, g, b, allow3Char) {
	const hex = [
		pad2(Math.round(r).toString(16)),
		pad2(Math.round(g).toString(16)),
		pad2(Math.round(b).toString(16))
	];
	if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
	return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
	const hex = [
		pad2(Math.round(r).toString(16)),
		pad2(Math.round(g).toString(16)),
		pad2(Math.round(b).toString(16)),
		pad2(convertDecimalToHex(a))
	];
	if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
	return hex.join("");
}
function cmykToRgb(c, m, y, k) {
	const cConv = c / 100;
	const mConv = m / 100;
	const yConv = y / 100;
	const kConv = k / 100;
	return {
		r: 255 * (1 - cConv) * (1 - kConv),
		g: 255 * (1 - mConv) * (1 - kConv),
		b: 255 * (1 - yConv) * (1 - kConv)
	};
}
function rgbToCmyk(r, g, b) {
	let c = 1 - r / 255;
	let m = 1 - g / 255;
	let y = 1 - b / 255;
	let k = Math.min(c, m, y);
	if (k === 1) {
		c = 0;
		m = 0;
		y = 0;
	} else {
		c = (c - k) / (1 - k) * 100;
		m = (m - k) / (1 - k) * 100;
		y = (y - k) / (1 - k) * 100;
	}
	k *= 100;
	return {
		c: Math.round(c),
		m: Math.round(m),
		y: Math.round(y),
		k: Math.round(k)
	};
}
function convertDecimalToHex(d) {
	return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
	return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
	return parseInt(val, 16);
}
function numberInputToObject(color) {
	return {
		r: color >> 16,
		g: (color & 65280) >> 8,
		b: color & 255
	};
}
var names = {
	aliceblue: "#f0f8ff",
	antiquewhite: "#faebd7",
	aqua: "#00ffff",
	aquamarine: "#7fffd4",
	azure: "#f0ffff",
	beige: "#f5f5dc",
	bisque: "#ffe4c4",
	black: "#000000",
	blanchedalmond: "#ffebcd",
	blue: "#0000ff",
	blueviolet: "#8a2be2",
	brown: "#a52a2a",
	burlywood: "#deb887",
	cadetblue: "#5f9ea0",
	chartreuse: "#7fff00",
	chocolate: "#d2691e",
	coral: "#ff7f50",
	cornflowerblue: "#6495ed",
	cornsilk: "#fff8dc",
	crimson: "#dc143c",
	cyan: "#00ffff",
	darkblue: "#00008b",
	darkcyan: "#008b8b",
	darkgoldenrod: "#b8860b",
	darkgray: "#a9a9a9",
	darkgreen: "#006400",
	darkgrey: "#a9a9a9",
	darkkhaki: "#bdb76b",
	darkmagenta: "#8b008b",
	darkolivegreen: "#556b2f",
	darkorange: "#ff8c00",
	darkorchid: "#9932cc",
	darkred: "#8b0000",
	darksalmon: "#e9967a",
	darkseagreen: "#8fbc8f",
	darkslateblue: "#483d8b",
	darkslategray: "#2f4f4f",
	darkslategrey: "#2f4f4f",
	darkturquoise: "#00ced1",
	darkviolet: "#9400d3",
	deeppink: "#ff1493",
	deepskyblue: "#00bfff",
	dimgray: "#696969",
	dimgrey: "#696969",
	dodgerblue: "#1e90ff",
	firebrick: "#b22222",
	floralwhite: "#fffaf0",
	forestgreen: "#228b22",
	fuchsia: "#ff00ff",
	gainsboro: "#dcdcdc",
	ghostwhite: "#f8f8ff",
	goldenrod: "#daa520",
	gold: "#ffd700",
	gray: "#808080",
	green: "#008000",
	greenyellow: "#adff2f",
	grey: "#808080",
	honeydew: "#f0fff0",
	hotpink: "#ff69b4",
	indianred: "#cd5c5c",
	indigo: "#4b0082",
	ivory: "#fffff0",
	khaki: "#f0e68c",
	lavenderblush: "#fff0f5",
	lavender: "#e6e6fa",
	lawngreen: "#7cfc00",
	lemonchiffon: "#fffacd",
	lightblue: "#add8e6",
	lightcoral: "#f08080",
	lightcyan: "#e0ffff",
	lightgoldenrodyellow: "#fafad2",
	lightgray: "#d3d3d3",
	lightgreen: "#90ee90",
	lightgrey: "#d3d3d3",
	lightpink: "#ffb6c1",
	lightsalmon: "#ffa07a",
	lightseagreen: "#20b2aa",
	lightskyblue: "#87cefa",
	lightslategray: "#778899",
	lightslategrey: "#778899",
	lightsteelblue: "#b0c4de",
	lightyellow: "#ffffe0",
	lime: "#00ff00",
	limegreen: "#32cd32",
	linen: "#faf0e6",
	magenta: "#ff00ff",
	maroon: "#800000",
	mediumaquamarine: "#66cdaa",
	mediumblue: "#0000cd",
	mediumorchid: "#ba55d3",
	mediumpurple: "#9370db",
	mediumseagreen: "#3cb371",
	mediumslateblue: "#7b68ee",
	mediumspringgreen: "#00fa9a",
	mediumturquoise: "#48d1cc",
	mediumvioletred: "#c71585",
	midnightblue: "#191970",
	mintcream: "#f5fffa",
	mistyrose: "#ffe4e1",
	moccasin: "#ffe4b5",
	navajowhite: "#ffdead",
	navy: "#000080",
	oldlace: "#fdf5e6",
	olive: "#808000",
	olivedrab: "#6b8e23",
	orange: "#ffa500",
	orangered: "#ff4500",
	orchid: "#da70d6",
	palegoldenrod: "#eee8aa",
	palegreen: "#98fb98",
	paleturquoise: "#afeeee",
	palevioletred: "#db7093",
	papayawhip: "#ffefd5",
	peachpuff: "#ffdab9",
	peru: "#cd853f",
	pink: "#ffc0cb",
	plum: "#dda0dd",
	powderblue: "#b0e0e6",
	purple: "#800080",
	rebeccapurple: "#663399",
	red: "#ff0000",
	rosybrown: "#bc8f8f",
	royalblue: "#4169e1",
	saddlebrown: "#8b4513",
	salmon: "#fa8072",
	sandybrown: "#f4a460",
	seagreen: "#2e8b57",
	seashell: "#fff5ee",
	sienna: "#a0522d",
	silver: "#c0c0c0",
	skyblue: "#87ceeb",
	slateblue: "#6a5acd",
	slategray: "#708090",
	slategrey: "#708090",
	snow: "#fffafa",
	springgreen: "#00ff7f",
	steelblue: "#4682b4",
	tan: "#d2b48c",
	teal: "#008080",
	thistle: "#d8bfd8",
	tomato: "#ff6347",
	turquoise: "#40e0d0",
	violet: "#ee82ee",
	wheat: "#f5deb3",
	white: "#ffffff",
	whitesmoke: "#f5f5f5",
	yellow: "#ffff00",
	yellowgreen: "#9acd32"
};
function inputToRGB(color) {
	let rgb = {
		r: 0,
		g: 0,
		b: 0
	};
	let a = 1;
	let s = null;
	let v = null;
	let l = null;
	let ok = false;
	let format = false;
	if (typeof color === "string") color = stringInputToObject(color);
	if (typeof color === "object") {
		if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
			rgb = rgbToRgb(color.r, color.g, color.b);
			ok = true;
			format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
			s = convertToPercentage(color.s);
			v = convertToPercentage(color.v);
			rgb = hsvToRgb(color.h, s, v);
			ok = true;
			format = "hsv";
		} else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
			s = convertToPercentage(color.s);
			l = convertToPercentage(color.l);
			rgb = hslToRgb(color.h, s, l);
			ok = true;
			format = "hsl";
		} else if (isValidCSSUnit(color.c) && isValidCSSUnit(color.m) && isValidCSSUnit(color.y) && isValidCSSUnit(color.k)) {
			rgb = cmykToRgb(color.c, color.m, color.y, color.k);
			ok = true;
			format = "cmyk";
		}
		if (Object.prototype.hasOwnProperty.call(color, "a")) a = color.a;
	}
	a = boundAlpha(a);
	return {
		ok,
		format: color.format || format,
		r: Math.min(255, Math.max(rgb.r, 0)),
		g: Math.min(255, Math.max(rgb.g, 0)),
		b: Math.min(255, Math.max(rgb.b, 0)),
		a
	};
}
var CSS_UNIT = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)";
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
	CSS_UNIT: new RegExp(CSS_UNIT),
	rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
	rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
	hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
	hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
	hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
	hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
	cmyk: new RegExp("cmyk" + PERMISSIVE_MATCH4),
	hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
	color = color.trim().toLowerCase();
	if (color.length === 0) return false;
	let named = false;
	if (names[color]) {
		color = names[color];
		named = true;
	} else if (color === "transparent") return {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
		format: "name"
	};
	let match = matchers.rgb.exec(color);
	if (match) return {
		r: match[1],
		g: match[2],
		b: match[3]
	};
	match = matchers.rgba.exec(color);
	if (match) return {
		r: match[1],
		g: match[2],
		b: match[3],
		a: match[4]
	};
	match = matchers.hsl.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		l: match[3]
	};
	match = matchers.hsla.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		l: match[3],
		a: match[4]
	};
	match = matchers.hsv.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		v: match[3]
	};
	match = matchers.hsva.exec(color);
	if (match) return {
		h: match[1],
		s: match[2],
		v: match[3],
		a: match[4]
	};
	match = matchers.cmyk.exec(color);
	if (match) return {
		c: match[1],
		m: match[2],
		y: match[3],
		k: match[4]
	};
	match = matchers.hex8.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		a: convertHexToDecimal(match[4]),
		format: named ? "name" : "hex8"
	};
	match = matchers.hex6.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1]),
		g: parseIntFromHex(match[2]),
		b: parseIntFromHex(match[3]),
		format: named ? "name" : "hex"
	};
	match = matchers.hex4.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1] + match[1]),
		g: parseIntFromHex(match[2] + match[2]),
		b: parseIntFromHex(match[3] + match[3]),
		a: convertHexToDecimal(match[4] + match[4]),
		format: named ? "name" : "hex8"
	};
	match = matchers.hex3.exec(color);
	if (match) return {
		r: parseIntFromHex(match[1] + match[1]),
		g: parseIntFromHex(match[2] + match[2]),
		b: parseIntFromHex(match[3] + match[3]),
		format: named ? "name" : "hex"
	};
	return false;
}
function isValidCSSUnit(color) {
	if (typeof color === "number") return !Number.isNaN(color);
	return matchers.CSS_UNIT.test(color);
}
var TinyColor = class TinyColor {
	constructor(color = "", opts = {}) {
		var _a;
		if (color instanceof TinyColor) return color;
		if (typeof color === "number") color = numberInputToObject(color);
		this.originalInput = color;
		const rgb = inputToRGB(color);
		this.originalInput = color;
		this.r = rgb.r;
		this.g = rgb.g;
		this.b = rgb.b;
		this.a = rgb.a;
		this.roundA = Math.round(100 * this.a) / 100;
		this.format = (_a = opts.format) != null ? _a : rgb.format;
		this.gradientType = opts.gradientType;
		if (this.r < 1) this.r = Math.round(this.r);
		if (this.g < 1) this.g = Math.round(this.g);
		if (this.b < 1) this.b = Math.round(this.b);
		this.isValid = rgb.ok;
	}
	isDark() {
		return this.getBrightness() < 128;
	}
	isLight() {
		return !this.isDark();
	}
	getBrightness() {
		const rgb = this.toRgb();
		return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
	}
	getLuminance() {
		const rgb = this.toRgb();
		let R;
		let G;
		let B;
		const RsRGB = rgb.r / 255;
		const GsRGB = rgb.g / 255;
		const BsRGB = rgb.b / 255;
		if (RsRGB <= .03928) R = RsRGB / 12.92;
		else R = Math.pow((RsRGB + .055) / 1.055, 2.4);
		if (GsRGB <= .03928) G = GsRGB / 12.92;
		else G = Math.pow((GsRGB + .055) / 1.055, 2.4);
		if (BsRGB <= .03928) B = BsRGB / 12.92;
		else B = Math.pow((BsRGB + .055) / 1.055, 2.4);
		return .2126 * R + .7152 * G + .0722 * B;
	}
	getAlpha() {
		return this.a;
	}
	setAlpha(alpha) {
		this.a = boundAlpha(alpha);
		this.roundA = Math.round(100 * this.a) / 100;
		return this;
	}
	isMonochrome() {
		const { s } = this.toHsl();
		return s === 0;
	}
	toHsv() {
		const hsv = rgbToHsv(this.r, this.g, this.b);
		return {
			h: hsv.h * 360,
			s: hsv.s,
			v: hsv.v,
			a: this.a
		};
	}
	toHsvString() {
		const hsv = rgbToHsv(this.r, this.g, this.b);
		const h = Math.round(hsv.h * 360);
		const s = Math.round(hsv.s * 100);
		const v = Math.round(hsv.v * 100);
		return this.a === 1 ? `hsv(${h}, ${s}%, ${v}%)` : `hsva(${h}, ${s}%, ${v}%, ${this.roundA})`;
	}
	toHsl() {
		const hsl = rgbToHsl(this.r, this.g, this.b);
		return {
			h: hsl.h * 360,
			s: hsl.s,
			l: hsl.l,
			a: this.a
		};
	}
	toHslString() {
		const hsl = rgbToHsl(this.r, this.g, this.b);
		const h = Math.round(hsl.h * 360);
		const s = Math.round(hsl.s * 100);
		const l = Math.round(hsl.l * 100);
		return this.a === 1 ? `hsl(${h}, ${s}%, ${l}%)` : `hsla(${h}, ${s}%, ${l}%, ${this.roundA})`;
	}
	toHex(allow3Char = false) {
		return rgbToHex(this.r, this.g, this.b, allow3Char);
	}
	toHexString(allow3Char = false) {
		return "#" + this.toHex(allow3Char);
	}
	toHex8(allow4Char = false) {
		return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
	}
	toHex8String(allow4Char = false) {
		return "#" + this.toHex8(allow4Char);
	}
	toHexShortString(allowShortChar = false) {
		return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
	}
	toRgb() {
		return {
			r: Math.round(this.r),
			g: Math.round(this.g),
			b: Math.round(this.b),
			a: this.a
		};
	}
	toRgbString() {
		const r = Math.round(this.r);
		const g = Math.round(this.g);
		const b = Math.round(this.b);
		return this.a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${this.roundA})`;
	}
	toPercentageRgb() {
		const fmt = (x) => `${Math.round(bound01(x, 255) * 100)}%`;
		return {
			r: fmt(this.r),
			g: fmt(this.g),
			b: fmt(this.b),
			a: this.a
		};
	}
	toPercentageRgbString() {
		const rnd = (x) => Math.round(bound01(x, 255) * 100);
		return this.a === 1 ? `rgb(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%)` : `rgba(${rnd(this.r)}%, ${rnd(this.g)}%, ${rnd(this.b)}%, ${this.roundA})`;
	}
	toCmyk() {
		return { ...rgbToCmyk(this.r, this.g, this.b) };
	}
	toCmykString() {
		const { c, m, y, k } = rgbToCmyk(this.r, this.g, this.b);
		return `cmyk(${c}, ${m}, ${y}, ${k})`;
	}
	toName() {
		if (this.a === 0) return "transparent";
		if (this.a < 1) return false;
		const hex = "#" + rgbToHex(this.r, this.g, this.b, false);
		for (const [key, value] of Object.entries(names)) if (hex === value) return key;
		return false;
	}
	toString(format) {
		const formatSet = Boolean(format);
		format = format != null ? format : this.format;
		let formattedString = false;
		const hasAlpha = this.a < 1 && this.a >= 0;
		if (!formatSet && hasAlpha && (format.startsWith("hex") || format === "name")) {
			if (format === "name" && this.a === 0) return this.toName();
			return this.toRgbString();
		}
		if (format === "rgb") formattedString = this.toRgbString();
		if (format === "prgb") formattedString = this.toPercentageRgbString();
		if (format === "hex" || format === "hex6") formattedString = this.toHexString();
		if (format === "hex3") formattedString = this.toHexString(true);
		if (format === "hex4") formattedString = this.toHex8String(true);
		if (format === "hex8") formattedString = this.toHex8String();
		if (format === "name") formattedString = this.toName();
		if (format === "hsl") formattedString = this.toHslString();
		if (format === "hsv") formattedString = this.toHsvString();
		if (format === "cmyk") formattedString = this.toCmykString();
		return formattedString || this.toHexString();
	}
	toNumber() {
		return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	}
	clone() {
		return new TinyColor(this.toString());
	}
	lighten(amount = 10) {
		const hsl = this.toHsl();
		hsl.l += amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl);
	}
	brighten(amount = 10) {
		const rgb = this.toRgb();
		rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
		rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
		rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
		return new TinyColor(rgb);
	}
	darken(amount = 10) {
		const hsl = this.toHsl();
		hsl.l -= amount / 100;
		hsl.l = clamp01(hsl.l);
		return new TinyColor(hsl);
	}
	tint(amount = 10) {
		return this.mix("white", amount);
	}
	shade(amount = 10) {
		return this.mix("black", amount);
	}
	desaturate(amount = 10) {
		const hsl = this.toHsl();
		hsl.s -= amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl);
	}
	saturate(amount = 10) {
		const hsl = this.toHsl();
		hsl.s += amount / 100;
		hsl.s = clamp01(hsl.s);
		return new TinyColor(hsl);
	}
	greyscale() {
		return this.desaturate(100);
	}
	spin(amount) {
		const hsl = this.toHsl();
		const hue = (hsl.h + amount) % 360;
		hsl.h = hue < 0 ? 360 + hue : hue;
		return new TinyColor(hsl);
	}
	mix(color, amount = 50) {
		const rgb1 = this.toRgb();
		const rgb2 = new TinyColor(color).toRgb();
		const p = amount / 100;
		const rgba = {
			r: (rgb2.r - rgb1.r) * p + rgb1.r,
			g: (rgb2.g - rgb1.g) * p + rgb1.g,
			b: (rgb2.b - rgb1.b) * p + rgb1.b,
			a: (rgb2.a - rgb1.a) * p + rgb1.a
		};
		return new TinyColor(rgba);
	}
	analogous(results = 6, slices = 30) {
		const hsl = this.toHsl();
		const part = 360 / slices;
		const ret = [this];
		for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
			hsl.h = (hsl.h + part) % 360;
			ret.push(new TinyColor(hsl));
		}
		return ret;
	}
	complement() {
		const hsl = this.toHsl();
		hsl.h = (hsl.h + 180) % 360;
		return new TinyColor(hsl);
	}
	monochromatic(results = 6) {
		const hsv = this.toHsv();
		const { h } = hsv;
		const { s } = hsv;
		let { v } = hsv;
		const res = [];
		const modification = 1 / results;
		while (results--) {
			res.push(new TinyColor({
				h,
				s,
				v
			}));
			v = (v + modification) % 1;
		}
		return res;
	}
	splitcomplement() {
		const hsl = this.toHsl();
		const { h } = hsl;
		return [
			this,
			new TinyColor({
				h: (h + 72) % 360,
				s: hsl.s,
				l: hsl.l
			}),
			new TinyColor({
				h: (h + 216) % 360,
				s: hsl.s,
				l: hsl.l
			})
		];
	}
	onBackground(background) {
		const fg = this.toRgb();
		const bg = new TinyColor(background).toRgb();
		const alpha = fg.a + bg.a * (1 - fg.a);
		return new TinyColor({
			r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
			g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
			b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
			a: alpha
		});
	}
	triad() {
		return this.polyad(3);
	}
	tetrad() {
		return this.polyad(4);
	}
	polyad(n) {
		const hsl = this.toHsl();
		const { h } = hsl;
		const result = [this];
		const increment = 360 / n;
		for (let i = 1; i < n; i++) result.push(new TinyColor({
			h: (h + i * increment) % 360,
			s: hsl.s,
			l: hsl.l
		}));
		return result;
	}
	equals(color) {
		const comparedColor = new TinyColor(color);
		if (this.format === "cmyk" || comparedColor.format === "cmyk") return this.toCmykString() === comparedColor.toCmykString();
		return this.toRgbString() === comparedColor.toRgbString();
	}
};
var defaultHueStep = 2;
var defaultSaturationStepLight = .16;
var defaultSaturationStepDark = .05;
var defaultBrightnessStepLight = .05;
var defaultBrightnessStepDark = .15;
var lightColorCount = 5;
var darkColorCount = 5;
function toHsv({ r, g, b }) {
	const hsv = rgbToHsv(r, g, b);
	return {
		h: hsv.h * 360,
		s: hsv.s,
		v: hsv.v
	};
}
function toHex({ r, g, b }) {
	return `#${rgbToHex(r, g, b, false)}`;
}
function getHue(hsv, i, hueStep, light) {
	let hue;
	if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
	else hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
	if (hue < 0) hue += 360;
	else if (hue >= 360) hue -= 360;
	return hue;
}
function getSaturation(hsv, i, saturationStepLight, saturationStepDark, light) {
	if (hsv.h === 0 && hsv.s === 0) return hsv.s;
	let saturation;
	if (light) saturation = hsv.s - saturationStepLight * i;
	else if (i === darkColorCount) saturation = hsv.s + saturationStepLight;
	else saturation = hsv.s + saturationStepDark * i;
	if (saturation > 1) saturation = 1;
	if (light && i === lightColorCount && saturation > .1) saturation = .1;
	if (saturation < .06) saturation = .06;
	return Number(saturation.toFixed(2));
}
function getValue(hsv, i, brightnessStep, light) {
	let value;
	if (light) value = hsv.v + brightnessStep * i;
	else value = hsv.v - brightnessStep * i;
	if (value > 1) value = 1;
	return Number(value.toFixed(2));
}
var colorPaletteCache$1 = /* @__PURE__ */ new Map();
function getColorPalette$1(color, options) {
	const { brightnessStepLight = defaultBrightnessStepLight, brightnessStepDark = defaultBrightnessStepDark, saturationStepLight = defaultSaturationStepLight, saturationStepDark = defaultSaturationStepDark, hueStep = defaultHueStep } = options != null ? options : {};
	const pColor = inputToRGB(color);
	const hexColor = toHex(pColor);
	if (colorPaletteCache$1.has(hexColor)) return colorPaletteCache$1.get(hexColor);
	const colorPalette = { base: hexColor };
	for (let i = 1; i <= lightColorCount; i++) {
		const hsv = toHsv(pColor);
		const colorString = toHex(inputToRGB({
			h: getHue(hsv, i, hueStep, true),
			s: getSaturation(hsv, i, saturationStepLight, saturationStepDark, true),
			v: getValue(hsv, i, brightnessStepLight, true)
		}));
		colorPalette[`l${i}0`] = colorString;
	}
	for (let i = 1; i <= darkColorCount; i++) {
		const hsv = toHsv(pColor);
		const colorString = toHex(inputToRGB({
			h: getHue(hsv, i, hueStep),
			s: getSaturation(hsv, i, saturationStepLight, saturationStepDark),
			v: getValue(hsv, i, brightnessStepDark)
		}));
		colorPalette[`d${i}0`] = colorString;
	}
	colorPaletteCache$1.set(hexColor, colorPalette);
	return colorPalette;
}
var darkColorMap = {
	l50: {
		key: "d20",
		opacity: .15
	},
	l40: {
		key: "d10",
		opacity: .25
	},
	l30: {
		key: "base",
		opacity: .3
	},
	l20: {
		key: "base",
		opacity: .45
	},
	l10: {
		key: "base",
		opacity: .65
	},
	base: {
		key: "base",
		opacity: .85
	},
	d10: {
		key: "l10",
		opacity: .9
	},
	d20: {
		key: "l20",
		opacity: .95
	},
	d30: {
		key: "l30",
		opacity: .97
	},
	d40: {
		key: "l40",
		opacity: .98
	},
	d50: {
		key: "l50",
		opacity: 1
	}
};
function mix(rgb1, rgb2, amount) {
	const p = amount;
	return {
		r: (rgb2.r - rgb1.r) * p + rgb1.r,
		g: (rgb2.g - rgb1.g) * p + rgb1.g,
		b: (rgb2.b - rgb1.b) * p + rgb1.b
	};
}
var colorPaletteCache = /* @__PURE__ */ new Map();
function getDarkColorPalette(color, bgColor, options) {
	const lightColorPalette = getColorPalette$1(color, options);
	const mergedBgColor = bgColor || "#0a0c0f";
	const cacheKey = `${color}-${mergedBgColor}`;
	if (colorPaletteCache.has(cacheKey)) return colorPaletteCache.get(cacheKey);
	const darkColorPalette = {};
	Object.entries(darkColorMap).forEach(([key, map]) => {
		darkColorPalette[key] = toHex(mix(inputToRGB(mergedBgColor), inputToRGB(lightColorPalette[map.key]), map.opacity));
	});
	colorPaletteCache.set(cacheKey, darkColorPalette);
	return darkColorPalette;
}
function getGreyColors$2(color) {
	const baseColor = getBaseColors$1();
	if (color === "grey") return {
		l50: "#fafafa",
		l40: "#f5f5f5",
		l30: "#eeeeee",
		l20: "#e0e0e0",
		l10: "#c2c2c2",
		base: baseColor.grey,
		d10: "#7a7a7a",
		d20: "#5c5c5c",
		d30: "#3d3d3d",
		d40: "#1f1f1f",
		d50: "#141414"
	};
	return {
		l50: "#f7f9fc",
		l40: "#edf1f7",
		l30: "#e1e5eb",
		l20: "#d3d7de",
		l10: "#bec3cc",
		base: baseColor.graphite,
		d10: "#6f7785",
		d20: "#5e6573",
		d30: "#454c59",
		d40: "#2f3540",
		d50: "#1e232b"
	};
}
function getAlphaColor(baseColor, alpha, bgColor) {
	const alphaColor = new TinyColor(baseColor).setAlpha(alpha);
	if (!bgColor) return alphaColor.toRgbString();
	return alphaColor.onBackground(bgColor).toRgbString();
}
function getSolidColor(baseColor, brightness) {
	return new TinyColor(baseColor).darken(brightness).toHexString();
}
function getDerivedColorTokens(basicTokens, getBaseColors2, getColorPalette2, getGreyColors2) {
	const primaryColorPalette = getColorPalette2(basicTokens.colorPrimary);
	const successColorPalette = getColorPalette2(basicTokens.colorSuccess);
	const errorColorPalette = getColorPalette2(basicTokens.colorError);
	const warningColorPalette = getColorPalette2(basicTokens.colorWarning);
	const riskColorPalette = getColorPalette2(basicTokens.colorRisk);
	const fatalColorPalette = getColorPalette2(basicTokens.colorFatal);
	const blueColorPalette = getColorPalette2(getBaseColors2().blue);
	const infoColorPalette = getColorPalette2(basicTokens.colorInfo);
	const primaryStatusColors = {
		colorPrimaryHover: primaryColorPalette.l10,
		colorPrimaryActive: primaryColorPalette.d10
	};
	const primaryColors = {
		...primaryStatusColors,
		colorPrimaryBorder: primaryColorPalette.base,
		colorPrimaryBorderHover: primaryColorPalette.l10,
		colorPrimaryBorderActive: primaryColorPalette.d10,
		colorPrimaryText: primaryColorPalette.base,
		colorPrimaryTextHover: primaryStatusColors.colorPrimaryHover,
		colorPrimaryTextActive: primaryStatusColors.colorPrimaryActive,
		colorPrimaryIcon: primaryColorPalette.base
	};
	const successColors = {
		colorSuccessBg: successColorPalette.base,
		colorSuccessBgHover: successColorPalette.l10,
		colorSuccessBgActive: successColorPalette.d10,
		colorSuccessBorder: successColorPalette.d10,
		colorSuccessBorderHover: successColorPalette.base,
		colorSuccessBorderActive: successColorPalette.d20,
		colorSuccessText: successColorPalette.d10,
		colorSuccessTextHover: successColorPalette.base,
		colorSuccessTextActive: successColorPalette.d20,
		colorSuccessIcon: successColorPalette.base
	};
	const errorColors = {
		colorErrorBg: errorColorPalette.l10,
		colorErrorBgHover: errorColorPalette.l20,
		colorErrorBgActive: errorColorPalette.d10,
		colorErrorBorder: errorColorPalette.d10,
		colorErrorBorderHover: errorColorPalette.base,
		colorErrorBorderActive: errorColorPalette.d20,
		colorErrorText: errorColorPalette.d10,
		colorErrorTextHover: errorColorPalette.base,
		colorErrorTextActive: errorColorPalette.d10,
		colorErrorIcon: errorColorPalette.l10
	};
	const warningColors = {
		colorWarningBg: warningColorPalette.base,
		colorWarningBgHover: warningColorPalette.l10,
		colorWarningBgActive: warningColorPalette.d10,
		colorWarningBorder: warningColorPalette.base,
		colorWarningBorderHover: warningColorPalette.l10,
		colorWarningBorderActive: warningColorPalette.d10,
		colorWarningText: warningColorPalette.base,
		colorWarningTextHover: warningColorPalette.l10,
		colorWarningTextActive: warningColorPalette.d10,
		colorWarningIcon: warningColorPalette.l10
	};
	const riskColors = {
		colorRiskBg: riskColorPalette.base,
		colorRiskBgHover: riskColorPalette.l10,
		colorRiskBgActive: riskColorPalette.d10,
		colorRiskBorder: riskColorPalette.base,
		colorRiskBorderHover: riskColorPalette.l10,
		colorRiskBorderActive: riskColorPalette.d10,
		colorRiskText: riskColorPalette.base,
		colorRiskTextHover: riskColorPalette.l10,
		colorRiskTextActive: riskColorPalette.d10,
		colorRiskIcon: riskColorPalette.l10
	};
	const fatalColors = {
		colorFatalBg: fatalColorPalette.base,
		colorFatalBgHover: fatalColorPalette.l10,
		colorFatalBgActive: fatalColorPalette.d10,
		colorFatalBorder: fatalColorPalette.base,
		colorFatalBorderHover: fatalColorPalette.l10,
		colorFatalBorderActive: fatalColorPalette.d10,
		colorFatalText: fatalColorPalette.base,
		colorFatalTextHover: fatalColorPalette.l10,
		colorFatalTextActive: fatalColorPalette.d10,
		colorFatalIcon: fatalColorPalette.l10
	};
	const infoColors = basicTokens.colorInfo === blueColorPalette.l10 ? {
		colorInfoBg: blueColorPalette.l10,
		colorInfoBgHover: blueColorPalette.l20,
		colorInfoBgActive: blueColorPalette.base,
		colorInfoBorder: blueColorPalette.l10,
		colorInfoBorderHover: blueColorPalette.l20,
		colorInfoBorderActive: blueColorPalette.base,
		colorInfoText: blueColorPalette.l10,
		colorInfoTextHover: blueColorPalette.l20,
		colorInfoTextActive: blueColorPalette.base,
		colorInfoIcon: blueColorPalette.l10
	} : {
		colorInfoBg: infoColorPalette.base,
		colorInfoBgHover: infoColorPalette.l10,
		colorInfoBgActive: infoColorPalette.d10,
		colorInfoBorder: infoColorPalette.base,
		colorInfoBorderHover: infoColorPalette.l10,
		colorInfoBorderActive: infoColorPalette.d10,
		colorInfoText: infoColorPalette.base,
		colorInfoTextHover: infoColorPalette.l10,
		colorInfoTextActive: infoColorPalette.d10,
		colorInfoIcon: infoColorPalette.base
	};
	const greyColors = getGreyColors2();
	return {
		...primaryColors,
		...successColors,
		...errorColors,
		...warningColors,
		...riskColors,
		...fatalColors,
		...infoColors,
		colorOffline: greyColors.base,
		colorOfflineBg: greyColors.base,
		colorOfflineText: greyColors.d10
	};
}
function getDerivedFontTokens(basicTokens) {
	const { fontSize, fontWeight } = basicTokens;
	const fontSizeUnit = 2;
	const minFontSize = 10;
	const fontWeightUnit = 100;
	const fontSizeMap = {
		fontSizeXs: Math.max(fontSize - 4, minFontSize),
		fontSizeSm: Math.max(fontSize - fontSizeUnit, minFontSize),
		fontSizeMd: Math.max(fontSize, minFontSize),
		fontSizeLg: Math.max(fontSize + fontSizeUnit, minFontSize),
		fontSizeXl: Math.max(fontSize + 6, minFontSize),
		fontSize2xl: Math.max(fontSize + 10, minFontSize),
		fontSize3xl: Math.max(fontSize + 16, minFontSize)
	};
	return {
		...fontSizeMap,
		fontSizeHeaderSm: fontSizeMap.fontSizeMd,
		fontSizeHeaderMd: fontSizeMap.fontSizeLg,
		fontSizeHeaderLg: fontSizeMap.fontSizeXl,
		fontSizeHeaderXl: fontSizeMap.fontSize2xl,
		fontWeightXs: fontWeight - 200,
		fontWeightSm: fontWeight - fontWeightUnit,
		fontWeightMd: fontWeight,
		fontWeightLg: fontWeight + fontWeightUnit,
		fontWeightXl: fontWeight + 200
	};
}
function getDerivedMotionTokens(basicTokens) {
	const { motionDuration } = basicTokens;
	return {
		motionDurationFast: .18,
		motionDurationMedium: motionDuration,
		motionDurationSlow: .3
	};
}
function getDerivedSizeTokens(basicTokens) {
	const { spacing, height, borderRadius, screenSm, screenMd, screenLg, screenXl } = basicTokens;
	const spacingSizes = {
		xxs: Math.ceil(spacing * .25),
		xs: Math.ceil(spacing * .5),
		sm: spacing,
		md: Math.ceil(spacing * 1.5),
		lg: Math.ceil(spacing * 2),
		xl: spacing * 3,
		xxl: Math.ceil(spacing * 4)
	};
	return {
		paddingSize2Xs: spacingSizes.xxs,
		paddingSizeXs: spacingSizes.xs,
		paddingSizeSm: spacingSizes.sm,
		paddingSizeMd: spacingSizes.md,
		paddingSizeLg: spacingSizes.lg,
		paddingSizeXl: spacingSizes.xl,
		paddingSize2Xl: spacingSizes.xxl,
		marginSize2Xs: spacingSizes.xxs,
		marginSizeXs: spacingSizes.xs,
		marginSizeSm: spacingSizes.sm,
		marginSizeMd: spacingSizes.md,
		marginSizeLg: spacingSizes.lg,
		marginSizeXl: spacingSizes.xl,
		marginSize2Xl: spacingSizes.xxl,
		heightXs: height * .5,
		heightSm: height * .75,
		heightMd: height,
		heightLg: height * 1.25,
		heightXl: height * 1.5,
		height2xl: height * 1.75,
		height3xl: height * 2,
		borderRadiusXs: Math.max(2, Math.floor(borderRadius / 4)),
		borderRadiusSm: Math.max(2, Math.floor(borderRadius / 2)),
		borderRadiusMd: borderRadius,
		borderRadiusLg: Math.min(8, borderRadius * 2),
		lineWidthBold: 2,
		arrowSize: 6,
		screenXsMax: screenSm - .01,
		screenSmMin: screenSm,
		screenSmMax: screenMd - .01,
		screenMdMin: screenMd,
		screenMdMax: screenLg - .01,
		screenLgMin: screenLg,
		screenLgMax: screenXl - .01,
		screenXlMin: screenXl
	};
}
function getShadowTokens(getGreyColors2) {
	const greyColors = getGreyColors2();
	return {
		boxShadowSm: `0 2px 10px 0px ${getAlphaColor(greyColors.d50, .16)}`,
		boxShadowMd: `0 4px 16px 0px ${getAlphaColor(greyColors.d50, .14)}`,
		boxShadowLg: `0 8px 22px 0px ${getAlphaColor(greyColors.d50, .12)}`
	};
}
function getDerivedTokens(basicTokens, options) {
	const { getBaseColors: getBaseColors2, getColorPalette: getColorPalette2, getGreyColors: getGreyColors2 } = options;
	return {
		...getDerivedColorTokens(basicTokens, getBaseColors2, getColorPalette2, getGreyColors2),
		...getDerivedFontTokens(basicTokens),
		...getDerivedSizeTokens(basicTokens),
		...getDerivedMotionTokens(basicTokens),
		...getShadowTokens(getGreyColors2)
	};
}
function getControlTokens(tokens) {
	const { colorPrimary, colorError, colorPrimaryBorderHover, colorPrimaryBorderActive, colorContainerBg, colorContainerBgDisabled, heightXs, heightSm, heightMd, heightLg, fontSizeXs, fontSizeSm, fontSizeMd, borderRadiusSm, lineWidth, lineType, lineHeightGutter } = tokens;
	const controlHeightXs = heightXs;
	const controlHeightSm = heightSm;
	const controlHeightMd = heightMd;
	const controlHeightLg = heightLg;
	const controlLineWidth = lineWidth;
	const controlFontSizeXs = fontSizeXs;
	const controlFontSizeSm = fontSizeSm;
	const controlFontSizeMd = fontSizeSm;
	const controlFontSizeLg = fontSizeMd;
	const getVerticalPadding = (height, fontSize) => {
		return Math.round((height - (fontSize + lineHeightGutter)) / 2 - controlLineWidth);
	};
	return {
		controlHeightXs,
		controlHeightSm,
		controlHeightMd,
		controlHeightLg,
		controlLineWidth,
		controlLineType: lineType,
		controlFontSizeXs,
		controlFontSizeSm,
		controlFontSizeMd,
		controlFontSizeLg,
		controlBoxShadowFocus: `0 0 0 2px ${getAlphaColor(colorPrimary, .2)}`,
		controlBoxShadowInvalid: `0 0 0 2px ${getAlphaColor(colorError, .2)}`,
		controlBgColor: colorContainerBg,
		controlBgColorDisabled: colorContainerBgDisabled,
		controlBorderColorHover: colorPrimaryBorderHover,
		controlBorderColorActive: colorPrimaryBorderActive,
		controlPaddingSizeHorizontalXs: 7,
		controlPaddingSizeHorizontalSm: 7,
		controlPaddingSizeHorizontalMd: 11,
		controlPaddingSizeHorizontalLg: 11,
		controlPaddingSizeVerticalXs: Math.max(getVerticalPadding(controlHeightXs, controlFontSizeXs), 0),
		controlPaddingSizeVerticalSm: Math.max(getVerticalPadding(controlHeightSm, controlFontSizeSm), 0),
		controlPaddingSizeVerticalMd: Math.max(getVerticalPadding(controlHeightMd, controlFontSizeMd), 2),
		controlPaddingSizeVerticalLg: Math.ceil(getVerticalPadding(controlHeightLg, controlFontSizeLg)),
		controlBorderRadiusXs: borderRadiusSm,
		controlBorderRadiusSm: borderRadiusSm,
		controlBorderRadiusMd: borderRadiusSm,
		controlBorderRadiusLg: borderRadiusSm
	};
}
function getExtendedColorTokens(tokens, getColorPalette2, getGreyColors2) {
	const greyColors = getGreyColors2();
	const { colorPrimary, colorWarning, colorError, colorBg } = tokens;
	const primaryColorPalette = getColorPalette2(colorPrimary);
	return {
		colorContainerBg: colorBg,
		colorContainerBgHover: greyColors.l50,
		colorContainerBgActive: primaryColorPalette.l50,
		colorContainerBgDisabled: greyColors.l40,
		colorAddonContainerBg: greyColors.l50,
		colorEmphasizedContainerBg: greyColors.l40,
		colorEmphasizedContainerBgHover: greyColors.l30,
		colorEmphasizedContainerBgDisabled: greyColors.l10,
		colorInfoContainerBg: greyColors.l50,
		colorInfoContainerBgHover: greyColors.l50,
		colorInfoContainerBgDisabled: greyColors.l30,
		colorFillContainerBg: greyColors.l10,
		colorSeparator: greyColors.l30,
		colorTextPlaceholder: greyColors.base,
		colorTextDisabled: greyColors.l10,
		colorTextInverse: colorBg,
		colorTextInverseDisabled: greyColors.l10,
		colorTextTitle: greyColors.d40,
		colorTextTitleSecondary: greyColors.d30,
		colorTextInfo: greyColors.d10,
		colorIcon: greyColors.d20,
		colorIconInfo: greyColors.l10,
		colorIconHover: colorPrimary,
		colorIconActive: primaryColorPalette.d10,
		colorIconDisabled: greyColors.l10,
		colorWarningOutline: colorWarning,
		colorErrorOutline: colorError,
		colorBgInverse: greyColors.d40,
		colorBgInverseDisabled: greyColors.d50,
		colorBorderInverse: colorBg,
		colorBorderSecondary: greyColors.l30,
		colorMask: "rgba(0, 0, 0, 0.45)",
		tagCompColorAlpha: .1,
		alertCompColorAlpha: .1
	};
}
function getExtendedFontTokens(tokens) {
	return {
		fontSizeIcon: 16,
		fontWeightHeader: tokens.fontWeightXl
	};
}
function getExtendedSizeTokens(tokens) {
	return { componentBorderRadius: tokens.borderRadiusSm };
}
function getOverlayTokens(tokens) {
	const { borderRadiusSm, arrowSize, colorContainerBg, lineType } = tokens;
	return {
		overlayBgColor: colorContainerBg,
		overlayArrowSize: arrowSize,
		overlayBorderRadius: borderRadiusSm,
		overlayBorderWidth: 0,
		overlayBorderColor: "transparent",
		overlayBorderType: lineType
	};
}
function getScollbarTokens(getGreyColors2) {
	const greyColors = getGreyColors2();
	return {
		scrollbarWidth: 12,
		scrollbarHeight: 12,
		scrollbarThumbBg: greyColors.l30,
		scrollbarThumbBgHover: greyColors.l10,
		scrollbarThumbBgActive: greyColors.l10,
		scrollbarThumbBorderWidth: 2,
		scrollbarThumbBorderRadius: 6,
		scrollbarThumbBoxShadow: "none",
		scrollbarTrackBg: "unset",
		scrollbarTrackBorderRadius: 0,
		scrollbarTrackBoxShadow: "unset"
	};
}
function getExtendedTokens(tokens, options) {
	const { getColorPalette: getColorPalette2, getGreyColors: getGreyColors2 } = options;
	const extendedColorTokens = getExtendedColorTokens(tokens, getColorPalette2, getGreyColors2);
	const mergedTokens = {
		...tokens,
		...extendedColorTokens
	};
	return {
		...extendedColorTokens,
		...getExtendedFontTokens(tokens),
		...getExtendedSizeTokens(tokens),
		...getScollbarTokens(getGreyColors2),
		...getControlTokens(mergedTokens),
		...getOverlayTokens(mergedTokens)
	};
}
function getBasicTokens(getBaseColors2, getColorPalette2, getGreyColors2) {
	const baseColors = getBaseColors2();
	const redColorPalette = getColorPalette2(baseColors.red);
	const blueColorPalette = getColorPalette2(baseColors.blue);
	const greyColors = getGreyColors2();
	return {
		colorPrimary: baseColors.blue,
		colorError: baseColors.red,
		colorSuccess: baseColors.turquoise,
		colorWarning: baseColors.brown,
		colorRisk: baseColors.orange,
		colorFatal: redColorPalette.d30,
		colorInfo: blueColorPalette.l10,
		colorLink: baseColors.blue,
		colorWhite: baseColors.white,
		colorText: greyColors.d40,
		colorBg: baseColors.white,
		colorBorder: greyColors.l20,
		colorBorderSecondary: greyColors.l30,
		fontSize: 14,
		fontFamily: `pingfang SC, helvetica neue, arial, hiragino sans gb, microsoft yahei ui, microsoft yahei, simsun, sans-serif`,
		fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
		fontWeight: 400,
		borderRadius: 4,
		height: 32,
		lineHeightGutter: 8,
		spacing: 8,
		lineWidth: 1,
		lineType: "solid",
		motionDuration: .24,
		motionEaseIn: "cubic-bezier(0.12, 0, 0.39, 0)",
		motionEaseOut: "cubic-bezier(0.61, 1, 0.88, 1)",
		motionEaseInOut: "cubic-bezier(0.37, 0, 0.63, 1)",
		motionEaseInBack: "cubic-bezier(0.36, 0, 0.66, -0.56)",
		motionEaseOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
		motionEaseInCirc: "cubic-bezier(0.55, 0, 1, 0.45)",
		motionEaseOutCirc: "cubic-bezier(0, 0.55, 0.45, 1)",
		motionEaseInQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
		motionEaseOutQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
		screenSm: 600,
		screenMd: 960,
		screenLg: 1280,
		screenXl: 1720
	};
}
function getResetTokens(tokens) {
	const { colorBg, colorText, colorTextTitle, colorLink, fontFamily, fontFamilyCode, fontSizeSm, fontWeight, fontWeightHeader, lineHeightGutter, scrollbarWidth, scrollbarHeight, scrollbarThumbBg, scrollbarThumbBgHover, scrollbarThumbBgActive, scrollbarThumbBorderWidth, scrollbarThumbBorderRadius, scrollbarThumbBoxShadow, scrollbarTrackBg, scrollbarTrackBorderRadius, scrollbarTrackBoxShadow } = tokens;
	return {
		colorText,
		colorTextTitle,
		colorBg,
		colorLink,
		fontFamily,
		fontFamilyCode,
		fontSize: fontSizeSm,
		fontWeight,
		fontWeightHeader,
		lineHeightGutter,
		scrollbarWidth,
		scrollbarHeight,
		scrollbarThumbBg,
		scrollbarThumbBgHover,
		scrollbarThumbBgActive,
		scrollbarThumbBorderWidth,
		scrollbarThumbBorderRadius,
		scrollbarThumbBoxShadow,
		scrollbarTrackBg,
		scrollbarTrackBorderRadius,
		scrollbarTrackBoxShadow
	};
}
var colors = {
	red: {
		l50: "#33151A",
		l40: "#4A1618",
		l30: "#821D1F",
		l20: "#A72122",
		l10: "#D42525",
		base: "#E8514C",
		d10: "#F37E75",
		d20: "#F8A89F",
		d30: "#FAC9C0",
		d40: "#FAD8D2"
	},
	orange: {
		l50: "#331C15",
		l40: "#4A2916",
		l30: "#7A3D16",
		l20: "#AB521B",
		l10: "#D8641B",
		base: "#E88641",
		d10: "#F3A76A",
		d20: "#F8C492",
		d30: "#FAD6AF",
		d40: "#FAE4CD"
	},
	brown: {
		l50: "#332515",
		l40: "#4A3616",
		l30: "#7A5517",
		l20: "#AD771C",
		l10: "#DB941D",
		base: "#FDAA1D",
		d10: "#F3CA6A",
		d20: "#F8DD92",
		d30: "#ECEBA1",
		d40: "#FAF2D7"
	},
	yellow: {
		l50: "#332C15",
		l40: "#4A4219",
		l30: "#736516",
		l20: "#A9941A",
		l10: "#D6BB1A",
		base: "#E8D43E",
		d10: "#F3E867",
		d20: "#F8F390",
		d30: "#FAF9AA",
		d40: "#FAFADC"
	},
	bud: {
		l50: "#243315",
		l40: "#364A16",
		l30: "#4C6B19",
		l20: "#649019",
		l10: "#7BB518",
		base: "#9ACA39",
		d10: "#B9E061",
		d20: "#D6F08E",
		d30: "#EAFAB4",
		d40: "#F3FADC"
	},
	green: {
		l50: "#153315",
		l40: "#1F4B16",
		l30: "#29641D",
		l20: "#2D8718",
		l10: "#34A917",
		base: "#56BD37",
		d10: "#7CD15D",
		d20: "#A3E288",
		d30: "#BCF1A1",
		d40: "#DAF1CF"
	},
	turquoise: {
		l50: "#153330",
		l40: "#164A3C",
		l30: "#0F694E",
		l20: "#1D8D69",
		l10: "#1FB182",
		base: "#40C695",
		d10: "#6ADCAE",
		d20: "#97EBC7",
		d30: "#B6FADB",
		d40: "#D9FAEB"
	},
	cyan: {
		l50: "#152B33",
		l40: "#16464A",
		l30: "#15686E",
		l20: "#189197",
		l10: "#19B6BE",
		base: "#3BD0D3",
		d10: "#65EAE7",
		d20: "#92F8F3",
		d30: "#B4FAF5",
		d40: "#CAFAF7"
	},
	glacier: {
		l50: "#162433",
		l40: "#16354A",
		l30: "#17547B",
		l20: "#1A70A6",
		l10: "#1A8BD2",
		base: "#40ADE8",
		d10: "#6AC8F4",
		d20: "#92DBF8",
		d30: "#A8E6FA",
		d40: "#C3EDFA"
	},
	blue: {
		l50: "#151D33",
		l40: "#16274A",
		l30: "#173B7A",
		l20: "#1A50AF",
		l10: "#1B61DD",
		base: "#4083E8",
		d10: "#6AA6F4",
		d20: "#92C2F8",
		d30: "#A7D1FA",
		d40: "#C3DEFA"
	},
	indigo: {
		l50: "#1E1533",
		l40: "#29164A",
		l30: "#3D177A",
		l20: "#561FAF",
		l10: "#6922DD",
		base: "#4852E8",
		d10: "#AB70F4",
		d20: "#C89AF8",
		d30: "#DAB6FA",
		d40: "#E7D2FA"
	},
	purple: {
		l50: "#2D132E",
		l40: "#451541",
		l30: "#66135D",
		l20: "#931885",
		l10: "#B919A5",
		base: "#8A48E8",
		d10: "#E565CC",
		d20: "#F593DF",
		d30: "#FAB6E9",
		d40: "#FAD0EF"
	},
	magenta: {
		l50: "#2D132E",
		l40: "#451541",
		l30: "#66135D",
		l20: "#931885",
		l10: "#B919A5",
		base: "#CF3CB7",
		d10: "#E565CC",
		d20: "#F593DF",
		d30: "#FAB6E9",
		d40: "#FAD0EF"
	},
	gold: {
		l50: "#472D06",
		l40: "#674109",
		l30: "#75460F",
		l20: "#9C641C",
		l10: "#C2862D",
		base: "#E7AA40",
		d10: "#F5C76C",
		d20: "#FFE099",
		d30: "#FFEFC2",
		d40: "#FFFCF0"
	},
	silver: {
		l50: "#222731",
		l40: "#2C303E",
		l30: "#3A4154",
		l20: "#5B647A",
		l10: "#7F8AA1",
		base: "#A9B4C8",
		d10: "#C7CCD4",
		d20: "#D3D9E0",
		d30: "#DFE5ED",
		d40: "#EBF2FA"
	},
	bronze: {
		l50: "#24100D",
		l40: "#30140C",
		l30: "#572919",
		l20: "#7D422A",
		l10: "#A35F40",
		base: "#C97F58",
		d10: "#D6A181",
		d20: "#E3C3AC",
		d30: "#F0E5DD",
		d40: "#FCF5ED"
	}
};
function getColorPalette(color, bgColor) {
	const baseColor = Object.keys(colors).map((name) => ({
		name,
		base: colors[name].base
	})).find((c) => c.base === color);
	if (baseColor) return colors[baseColor.name];
	return getDarkColorPalette(color, bgColor);
}
function getGreyColors$1() {
	return {
		l50: "#0A0C0F",
		l40: "#171A1F",
		l30: "#1F2329",
		l20: "#3C424D",
		l10: "#687080",
		base: "#525966",
		d10: "#808999",
		d20: "#A1A7B3",
		d30: "#C2C7D1",
		d40: "#F4F8FF",
		d50: "#FFFFFF"
	};
}
var getBaseColors = () => {
	return Object.keys(colors).reduce((baseColors, key) => {
		baseColors[key] = colors[key].base;
		return baseColors;
	}, {
		white: "#fff",
		graphite: getGreyColors$1().base,
		black: "#000",
		grey: getGreyColors$2("grey").base
	});
};
function getPresetTokens() {
	const greyColors = getGreyColors$1();
	const baseColors = getBaseColors();
	const colorError = baseColors.red;
	const errorColorPalette = getColorPalette(colorError);
	const colorSuccess = baseColors.turquoise;
	const colorInfo = baseColors.blue;
	const colorWarning = baseColors.brown;
	const colorRisk = baseColors.orange;
	const colorFatal = errorColorPalette.l20;
	const successColorPalette = getColorPalette(colorSuccess);
	return {
		colorSuccess,
		colorError,
		colorInfo,
		colorWarning,
		colorRisk,
		colorFatal,
		colorBg: greyColors.l50,
		colorContainerBg: greyColors.l50,
		colorContainerBgHover: greyColors.l40,
		colorEmphasizedContainerBg: greyColors.l30,
		colorEmphasizedContainerBgHover: greyColors.l30,
		colorEmphasizedContainerBgDisabled: greyColors.l10,
		colorAddonContainerBg: greyColors.l40,
		colorInfoContainerBg: greyColors.l40,
		colorInfoContainerBgHover: greyColors.l40,
		colorInfoContainerBgDisabled: greyColors.l30,
		colorTextInverse: baseColors.white,
		colorBgInverse: baseColors.white,
		colorMask: getAlphaColor(greyColors.l40, .88),
		overlayBorderWidth: 1,
		overlayBorderColor: greyColors.l30,
		boxShadowSm: `0 2px 10px 0px ${greyColors.l50}`,
		boxShadowMd: `0 4px 16px 0px ${greyColors.l50}`,
		boxShadowLg: `0 8px 22px 0px ${greyColors.l50}`,
		colorSuccessBg: successColorPalette.base,
		colorSuccessBgHover: successColorPalette.l10,
		colorSuccessBgActive: successColorPalette.d10,
		colorSuccessBorder: successColorPalette.base,
		colorSuccessBorderHover: successColorPalette.l10,
		colorSuccessBorderActive: successColorPalette.d10,
		colorSuccessText: successColorPalette.base,
		colorSuccessTextHover: successColorPalette.l10,
		colorSuccessTextActive: successColorPalette.d10,
		colorSuccessIcon: successColorPalette.base,
		colorErrorBg: errorColorPalette.base,
		colorErrorBgHover: errorColorPalette.l10,
		colorErrorBgActive: errorColorPalette.d10,
		colorErrorBorder: errorColorPalette.base,
		colorErrorBorderHover: errorColorPalette.l10,
		colorErrorBorderActive: errorColorPalette.d10,
		colorErrorText: errorColorPalette.base,
		colorErrorTextHover: errorColorPalette.l10,
		colorErrorTextActive: errorColorPalette.d10,
		colorErrorIcon: errorColorPalette.base,
		colorInfoIcon: colorInfo,
		colorWarningIcon: colorWarning,
		colorRiskIcon: colorRisk,
		colorFatalIcon: colorFatal,
		tagCompColorAlpha: .2,
		alertCompColorAlpha: .2
	};
}
var getGreyColors = () => getGreyColors$2("graphite");
var presetTokens = {};
function getPresetAlgorithms(presetTheme) {
	return presetTheme === "default" ? {
		getBaseColors: getBaseColors$1,
		getColorPalette: getColorPalette$1,
		getGreyColors
	} : {
		getBaseColors,
		getColorPalette,
		getGreyColors: getGreyColors$1
	};
}
function getThemeTokens(presetTheme, tokens, algorithms) {
	var _a, _b, _c;
	const presetAlgorithms = getPresetAlgorithms(presetTheme);
	const getBaseColors2 = (_a = algorithms == null ? void 0 : algorithms.getBaseColors) != null ? _a : presetAlgorithms.getBaseColors;
	const getColorPalette2 = (_b = algorithms == null ? void 0 : algorithms.getColorPalette) != null ? _b : presetAlgorithms.getColorPalette;
	const getGreyColors2 = (_c = algorithms == null ? void 0 : algorithms.getGreyColors) != null ? _c : presetAlgorithms.getGreyColors;
	const presetTokens$1 = presetTheme === "default" ? presetTokens : getPresetTokens();
	const mergedPresetTokens = merge({ ...presetTokens$1 }, tokens);
	const presetBasicTokens = getBasicTokens(getBaseColors2, getColorPalette2, getGreyColors2);
	const mergedBasicTokens = merge(presetBasicTokens, pick(mergedPresetTokens, Object.keys(presetBasicTokens)));
	const presetDerivedTokens = getDerivedTokens(mergedBasicTokens, {
		getBaseColors: getBaseColors2,
		getColorPalette: getColorPalette2,
		getGreyColors: getGreyColors2
	});
	const mergedDerivedTokens = merge(presetDerivedTokens, pick(mergedPresetTokens, Object.keys(presetDerivedTokens)));
	const presetExtendedTokens = getExtendedTokens({
		...mergedBasicTokens,
		...mergedDerivedTokens
	}, {
		getColorPalette: getColorPalette2,
		getGreyColors: getGreyColors2
	});
	const mergedExtendedTokens = merge(presetExtendedTokens, pick(mergedPresetTokens, Object.keys(presetExtendedTokens)));
	return {
		...mergedBasicTokens,
		...mergedDerivedTokens,
		...mergedExtendedTokens
	};
}
var globalTokenKey = "global";
var resetTokenKey = "reset";
var themeTokenPrefix = "ix";
function useTokenMerge(props, config, supperContext, mergedPresetTheme) {
	const mergedAlgorithms = computed(() => {
		var _a;
		const presetAlgorithms = getPresetAlgorithms(mergedPresetTheme.value);
		const { getBaseColors: getBaseColors2, getColorPalette: getColorPalette2, getGreyColors: getGreyColors2 } = (_a = props == null ? void 0 : props.algorithm) != null ? _a : {};
		return {
			getBaseColors: getBaseColors2 != null ? getBaseColors2 : presetAlgorithms.getBaseColors,
			getColorPalette: getColorPalette2 != null ? getColorPalette2 : presetAlgorithms.getColorPalette,
			getGreyColors: getGreyColors2 != null ? getGreyColors2 : presetAlgorithms.getGreyColors
		};
	});
	const mergedTokens = computed(() => {
		var _a, _b, _c, _d;
		const configGlobalTokens = config.global;
		const configComponentTokens = config.components;
		const overwrittenTokens = merge({ ...(props == null ? void 0 : props.inherit) && !props.presetTheme ? (_a = supperContext == null ? void 0 : supperContext.mergedTokens.value.global) != null ? _a : {} : {} }, { ...configGlobalTokens }, (_b = props == null ? void 0 : props.tokens) == null ? void 0 : _b.global);
		return {
			global: getThemeTokens(mergedPresetTheme.value, overwrittenTokens, mergedAlgorithms.value),
			components: merge({ ...(props == null ? void 0 : props.inherit) ? (_c = supperContext == null ? void 0 : supperContext.mergedTokens.value.components) != null ? _c : {} : {} }, { ...configComponentTokens }, (_d = props == null ? void 0 : props.tokens) == null ? void 0 : _d.components)
		};
	});
	const getMergedTokens = (key, tokens) => {
		var _a;
		if (key === globalTokenKey) return merge({ ...tokens }, mergedTokens.value.global);
		return merge({ ...tokens }, (_a = mergedTokens.value.components) == null ? void 0 : _a[key]);
	};
	return {
		mergedAlgorithms,
		mergedTokens,
		getMergedTokens
	};
}
var IDUX_THEME_KEY = "idux-theme-key";
var IDUX_THEME_REF_CNT_KEY = "__IDUX_THEME_REF_CNT__";
function findStyles(container) {
	return Array.from(container.children).filter((node) => node.tagName === "STYLE");
}
function getContainer(option) {
	if (option.attachTo) return option.attachTo;
	return document.querySelector("head") || document.body;
}
function findExistNode(key, option = {}) {
	return findStyles(getContainer(option)).find((node) => node.getAttribute(IDUX_THEME_KEY) === key);
}
function getStyleRefCnt(node) {
	var _a;
	return (_a = node[IDUX_THEME_REF_CNT_KEY]) != null ? _a : 0;
}
function setStyleRefCnt(node, cnt) {
	node[IDUX_THEME_REF_CNT_KEY] = cnt;
}
function injectCSS(css, option = {}) {
	if (!isBrowser) return null;
	const { csp } = option;
	const styleNode = document.createElement("style");
	if (csp == null ? void 0 : csp.nonce) styleNode.nonce = csp == null ? void 0 : csp.nonce;
	styleNode.innerHTML = css;
	getContainer(option).appendChild(styleNode);
	return styleNode;
}
function removeCSS(key, option = {}) {
	const existNode = findExistNode(key, option);
	if (existNode) getContainer(option).removeChild(existNode);
}
function updateCSS(css, key, option = {}) {
	var _a, _b, _c;
	const existNode = findExistNode(key, option);
	if (existNode) {
		if (((_a = option.csp) == null ? void 0 : _a.nonce) && existNode.nonce !== ((_b = option.csp) == null ? void 0 : _b.nonce)) existNode.nonce = (_c = option.csp) == null ? void 0 : _c.nonce;
		if (existNode.innerHTML !== css) existNode.innerHTML = css;
		return existNode;
	}
	const newNode = injectCSS(css, option);
	newNode == null || newNode.setAttribute(IDUX_THEME_KEY, key);
	return newNode;
}
var unhasedHashSalt = "__unhashed__";
var sequenceCache = /* @__PURE__ */ new Map();
function createTokensHash(key, tokens, hashed = true) {
	let sequence = sequenceCache.get(key);
	if (!sequence) {
		sequence = getTokenSequence(tokens);
		sequenceCache.set(key, sequence);
	}
	let str = flattenTokens(tokens, sequence);
	if (!hashed) str += unhasedHashSalt;
	return `${themeTokenPrefix}-${key}-${murmur2(str)}`;
}
function flattenTokens(tokens, sequence) {
	let str = "";
	sequence.forEach((key) => {
		const value = tokens[key];
		str += `${key}${value || ""}`;
	});
	return str;
}
function getTokenSequence(tokens) {
	return Object.keys(tokens).sort();
}
function numUnitTransform(value, unit) {
	if (isString(value)) return value;
	if (value === 0) return value.toString();
	return `${value}${unit ? unit : ""}`;
}
var checkKeyWithSearch = (key, searchStrs) => {
	return searchStrs.some((search) => key.includes(search));
};
function defaultTokenTransform(key, value) {
	if (isString(value)) return value;
	const lowerCasedKey = key.toLowerCase();
	return numUnitTransform(value, checkKeyWithSearch(lowerCasedKey, [
		"width",
		"height",
		"size",
		"gap",
		"indent",
		"fontsize",
		"spacing",
		"padding",
		"margin",
		"borderradius",
		"linewidth",
		"iconsize",
		"arrowsize",
		"lineheightgutter",
		"screen"
	]) ? "px" : checkKeyWithSearch(lowerCasedKey, ["duration"]) ? "s" : void 0);
}
function tokenToCss(record, prefix, transforms) {
	const { key, tokens, hashId } = record;
	const resolvedPrefix = prefix != null ? prefix : themeTokenPrefix;
	let cssVarContents = "";
	const varNamePrefix = `--${resolvedPrefix}${key === globalTokenKey ? "" : `-${kebabCase(key)}`}`;
	Object.entries(tokens).forEach(([tokenName, value]) => {
		var _a;
		const _tokenName = tokenName;
		const varName = `${varNamePrefix}-${getTokenCssVarName(_tokenName)}`;
		const transform = (_a = transforms == null ? void 0 : transforms[_tokenName]) != null ? _a : (value2) => defaultTokenTransform(tokenName, value2);
		cssVarContents += `${varName}: ${transform(value)};`;
	});
	if (!hashId) return `:root { ${cssVarContents} }`;
	return `.${hashId} { ${cssVarContents} }`;
}
function getTokenCssVarName(tokenName) {
	let name = "";
	let preChar;
	for (let i = 0; i < tokenName.length; i++) {
		const char = tokenName[i];
		if (preChar && !isUppercaseOrNumber(preChar) && isUppercaseOrNumber(char)) name += `-${char}`;
		else name += char;
		preChar = char;
	}
	return name.toLowerCase();
}
function isUppercaseOrNumber(char) {
	const charCode = char.charCodeAt(0);
	return charCode >= 65 && charCode <= 90 || charCode >= 48 && charCode <= 57;
}
var injectedStyles = [];
function useDynamicCss(mergedAttachTo) {
	const localInjectedStyleCnts = /* @__PURE__ */ new Map();
	const incrementCnt = (hashId) => {
		if (!localInjectedStyleCnts.has(hashId)) localInjectedStyleCnts.set(hashId, 1);
		else localInjectedStyleCnts.set(hashId, localInjectedStyleCnts.get(hashId) + 1);
	};
	const decrementCnt = (hashId) => {
		if (!localInjectedStyleCnts.has(hashId)) return;
		const currentCnt = localInjectedStyleCnts.get(hashId) - 1;
		if (currentCnt <= 0) localInjectedStyleCnts.delete(hashId);
		else localInjectedStyleCnts.set(hashId, currentCnt);
	};
	const findInjectedStyle = (hashId, attachTo) => {
		let index = injectedStyles.findIndex((style2) => style2.hashId === hashId && style2.attachTo === attachTo);
		let style = injectedStyles[index];
		const styleElement = findExistNode(hashId, { attachTo });
		if (styleElement) {
			const styleRefCnt = getStyleRefCnt(styleElement);
			if (!style) {
				style = {
					hashId,
					attachTo: mergedAttachTo.value,
					refCnt: styleRefCnt
				};
				index = injectedStyles.length;
				injectedStyles.push(style);
			} else style.refCnt = styleRefCnt;
		}
		return {
			index,
			style,
			styleElement
		};
	};
	const setInjectedStyle = (injectedStyle, styleElement) => {
		injectedStyles.push(injectedStyle);
		setStyleRefCnt(styleElement, injectedStyle.refCnt);
	};
	const updateInjectedStyleRefCnt = (injectedStyle, styleElement, cnt) => {
		injectedStyle.refCnt = cnt;
		setStyleRefCnt(styleElement, cnt);
	};
	const inject2 = (hashId, css) => {
		incrementCnt(hashId);
		const { style, styleElement } = findInjectedStyle(hashId, mergedAttachTo.value);
		if (style && styleElement) {
			updateInjectedStyleRefCnt(style, styleElement, style.refCnt + 1);
			style.refCnt++;
		} else {
			const newInjectedStyleElement = updateCSS(css, hashId, { attachTo: mergedAttachTo.value });
			newInjectedStyleElement && setInjectedStyle({
				hashId,
				attachTo: mergedAttachTo.value,
				refCnt: 1
			}, newInjectedStyleElement);
		}
	};
	const remove = (hashId) => {
		decrementCnt(hashId);
		const { index, style, styleElement } = findInjectedStyle(hashId, mergedAttachTo.value);
		if (!style || !styleElement) return;
		updateInjectedStyleRefCnt(style, styleElement, style.refCnt - 1);
		if (style.refCnt <= 0) {
			injectedStyles.splice(index, 1);
			removeCSS(hashId, { attachTo: mergedAttachTo.value });
		}
	};
	const updateThemeStyle = (css, hashId, oldHashId) => {
		if (oldHashId) remove(oldHashId);
		inject2(hashId, css);
	};
	tryOnScopeDispose(() => {
		for (const [hashId, cnt] of localInjectedStyleCnts.entries()) for (let i = 0; i < cnt; i++) remove(hashId);
	});
	return updateThemeStyle;
}
function useTokenRegister(injectThemeStyle, mergedPresetTheme, mergedAlgorithms, mergedAttachTo, mergedHashed, getMergedTokens) {
	const tokenRecordMap = reactive(/* @__PURE__ */ new Map());
	const tokenGettersMap = /* @__PURE__ */ new Map();
	const tokenTransformsMap = /* @__PURE__ */ new Map();
	const tokenHashedMap = /* @__PURE__ */ new Map();
	const tokenPrefixMap = /* @__PURE__ */ new Map();
	const updateThemeStyle = useDynamicCss(mergedAttachTo);
	const [globalHashId, setGlobalHashId] = useState("");
	const _updateToken = (key, force, existedHashId) => {
		var _a, _b;
		let record = tokenRecordMap.get(key != null ? key : globalTokenKey);
		if (record && !force) return record.hashId;
		const globalTokens = key === globalTokenKey ? {} : (_a = tokenRecordMap.get(globalTokenKey)) == null ? void 0 : _a.tokens;
		if (!globalTokens) return;
		const getTokens = tokenGettersMap.get(key);
		const transforms = tokenTransformsMap.get(key);
		const prefix = tokenPrefixMap.get(key);
		const hashed = (_b = tokenHashedMap.get(key)) != null ? _b : mergedHashed.value;
		if (!getTokens) return;
		const tokens = getTokens(globalTokens, mergedPresetTheme.value, mergedAlgorithms.value);
		if (!tokens) return;
		const mergedCompTokens = getMergedTokens(key, tokens);
		const hashId = existedHashId != null ? existedHashId : createTokensHash(key, mergedCompTokens, hashed);
		if ((record == null ? void 0 : record.hashId) === hashId) return hashId;
		const oldHashId = record == null ? void 0 : record.hashId;
		record = {
			key,
			hashId,
			tokens: mergedCompTokens
		};
		tokenRecordMap.set(key, record);
		if (injectThemeStyle.value && !existedHashId) {
			const cssContent = tokenToCss({
				...record,
				hashId: hashed ? record.hashId : ""
			}, prefix, transforms);
			updateThemeStyle(cssContent, record.hashId, oldHashId);
		}
		if (key === globalTokenKey) {
			setGlobalHashId(record.hashId);
			[...tokenRecordMap.keys()].filter((key2) => key2 !== globalTokenKey).forEach((componentTokenKey) => {
				updateToken(componentTokenKey);
			});
		}
		return record.hashId;
	};
	const registerToken = (key, getTokens, transforms, prefix, hashed, hashId) => {
		tokenGettersMap.set(key, getTokens);
		tokenTransformsMap.set(key, transforms);
		tokenPrefixMap.set(key, prefix);
		tokenHashedMap.set(key, hashed);
		return _updateToken(key, false, hashId);
	};
	const updateToken = (key, hashId) => {
		if (!isTokensRegistered(key)) return;
		return _updateToken(key, true, hashId);
	};
	const isTokensRegistered = (key) => {
		return tokenRecordMap.has(key);
	};
	const getThemeTokens2 = (key) => {
		return tokenRecordMap.get(key).tokens;
	};
	const getThemeHashId = (key) => {
		var _a;
		return (_a = tokenRecordMap.get(key)) == null ? void 0 : _a.hashId;
	};
	return {
		globalHashId,
		isTokensRegistered,
		getThemeTokens: getThemeTokens2,
		getThemeHashId,
		registerToken,
		updateToken
	};
}
function createThemeProviderContext(supperContext, props) {
	const themeConfig = useGlobalConfig("theme");
	const injectThemeStyle = computed(() => {
		var _a;
		return (_a = props == null ? void 0 : props.injectThemeStyle) != null ? _a : themeConfig.injectThemeStyle;
	});
	const mergedPresetTheme = computed(() => {
		var _a;
		return (_a = (props == null ? void 0 : props.inherit) && !props.presetTheme ? supperContext == null ? void 0 : supperContext.presetTheme.value : props == null ? void 0 : props.presetTheme) != null ? _a : themeConfig.presetTheme;
	});
	const mergedHashed = computed(() => {
		var _a, _b;
		return (_b = (_a = (props == null ? void 0 : props.inherit) ? supperContext == null ? void 0 : supperContext.hashed.value : void 0) != null ? _a : props == null ? void 0 : props.hashed) != null ? _b : themeConfig.hashed;
	});
	const mergedAttachTo = computed(() => {
		var _a, _b, _c;
		const attachTo = (_b = (_a = (props == null ? void 0 : props.inherit) ? supperContext == null ? void 0 : supperContext.attachTo.value : void 0) != null ? _a : props == null ? void 0 : props.attachTo) != null ? _b : themeConfig.attachTo;
		if (!attachTo) return;
		if (attachTo instanceof Element) return attachTo;
		if (isFunction(attachTo)) return attachTo();
		return (_c = document.querySelector(attachTo)) != null ? _c : void 0;
	});
	const { mergedAlgorithms, mergedTokens, getMergedTokens } = useTokenMerge(props, themeConfig, supperContext, mergedPresetTheme);
	const { globalHashId, registerToken, updateToken, getThemeTokens: getThemeTokens2, getThemeHashId, isTokensRegistered } = useTokenRegister(injectThemeStyle, mergedPresetTheme, mergedAlgorithms, mergedAttachTo, mergedHashed, getMergedTokens);
	watch(() => mergedTokens.value.global, () => {
		var _a;
		const useSupper = (props == null ? void 0 : props.inherit) && !((_a = props.tokens) == null ? void 0 : _a.global) && !!supperContext;
		if (!isTokensRegistered(globalTokenKey)) registerToken(globalTokenKey, () => useSupper ? supperContext.getThemeTokens(globalTokenKey) : mergedTokens.value.global, void 0, void 0, void 0, useSupper ? supperContext.getThemeHashId(globalTokenKey) : void 0);
		else updateToken(globalTokenKey, useSupper ? supperContext.getThemeHashId(globalTokenKey) : void 0);
		if ((props == null ? void 0 : props.inherit) && !!supperContext || isTokensRegistered(resetTokenKey)) return;
		registerToken(resetTokenKey, (globalTokens) => useSupper ? supperContext.getThemeTokens(resetTokenKey) : getResetTokens(globalTokens), void 0, void 0, false, useSupper ? supperContext.getThemeHashId(resetTokenKey) : void 0);
	}, {
		immediate: true,
		deep: true
	});
	watch(() => mergedTokens.value.components, (components) => {
		Object.keys(components).forEach((key) => {
			updateToken(key);
		});
	}, { deep: true });
	return {
		globalHashId,
		hashed: mergedHashed,
		presetTheme: mergedPresetTheme,
		attachTo: mergedAttachTo,
		mergedTokens,
		useThemeTokenContextMap: /* @__PURE__ */ new Map(),
		getThemeHashId,
		registerToken,
		updateToken,
		getThemeTokens: getThemeTokens2,
		isTokensRegistered
	};
}
var useSharedThemeProvider = createSharedComposable(() => createThemeProviderContext(null));
var THEME_PROVIDER_TOKEN = Symbol("THEME_PROVIDER_TOKEN");
function useThemeToken(key) {
	let themeProviderContext = inject(THEME_PROVIDER_TOKEN, null);
	if (!themeProviderContext) themeProviderContext = useSharedThemeProvider();
	const { useThemeTokenContextMap, presetTheme, globalHashId: _globalHashId, hashed, getThemeTokens: getThemeTokens2, getThemeHashId, registerToken: _registerToken } = themeProviderContext;
	const globalContext = getSharedContext(globalTokenKey, useThemeTokenContextMap, () => ({
		presetTheme,
		globalHashId: computed(() => hashed.value ? _globalHashId.value : ""),
		themeTokens: computed(() => getThemeTokens2(globalTokenKey))
	}));
	if (!key) return globalContext;
	return getSharedContext(key, useThemeTokenContextMap, () => {
		const globalHashId = globalContext.globalHashId;
		const hashId = computed(() => {
			var _a;
			return hashed.value ? (_a = getThemeHashId(key)) != null ? _a : "" : "";
		});
		const themeTokens = computed(() => getThemeTokens2(key));
		const registerToken = (getTokens, transforms, prefixCls) => {
			var _a;
			return (_a = _registerToken(key, getTokens, transforms, prefixCls)) != null ? _a : "";
		};
		return {
			presetTheme,
			globalHashId,
			hashId,
			themeTokens,
			registerToken
		};
	});
}
function getSharedContext(key, map, getContext) {
	let states = map.get(key);
	if (!states) {
		const scope = effectScope(true);
		states = {
			scope,
			context: scope.run(() => getContext()),
			subscribers: 1
		};
		tryOnScopeDispose(() => {
			if (states && scope && --states.subscribers <= 0) {
				states.scope.stop();
				map.set(key, void 0);
			}
		});
		map.set(key, states);
	} else states.subscribers++;
	return states.context;
}
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/icon/index.js
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
var Loading = {
	name: "loading",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path d=\"m527.424 64.32 3.712.064a448 448 0 0 1 430.912 432.32v2.368a12.8 12.8 0 0 1-12.8 13.056h-38.336a12.8 12.8 0 0 1-12.8-13.632A384 384 0 0 0 528.64 128.384h-1.792a12.8 12.8 0 0 1-12.608-12.8V77.12a12.8 12.8 0 0 1 13.12-12.8z\"/></svg>"
};
var PieChart = {
	name: "pie-chart",
	svg: "<svg viewBox=\"0 0 1024 1024\" focusable=\"false\"><path fill-rule=\"evenodd\" d=\"m892.32 344.051-287.044 95.683c-10.007 3.336-19.864-6.006-16.527-16.012l97.86-293.498 10.846-32.527c2.312-6.933 9.495-10.596 16.241-7.787 11.405 4.602 28.211 11.6 38.157 16.731 77.005 39.738 138.835 104.76 174.521 184.087 2.906 6.457 6.836 16.64 9.856 24.716 2.586 6.702-.883 14.265-7.699 16.537l-36.211 12.07ZM480 960.098c229.754 0 416-186.252 416-416.002 0-48.558-8.32-95.173-23.648-138.518-2.278-6.431-9.44-9.592-15.917-7.449L512 512.096l115.482-343.885c2.173-6.472-.806-13.579-7.233-15.88-43.818-15.689-91.036-24.234-140.249-24.234-229.75 0-416 186.249-416 416 0 229.749 186.25 416.001 416 416.001Zm56.356-763.524 13.212 2.434-130.843 389.794c-3.356 10 6.142 19.538 16.156 16.226L825.28 475.872l2.336 12.477A354.887 354.887 0 0 1 832 544.096c0 194.402-157.596 352.002-352 352.002s-352-157.6-352-352.002c0-194.403 157.596-352 352-352l18.973.502a353.5 353.5 0 0 1 37.383 3.976Z\"/></svg>"
};
var IxIcon = Icon;
// ../../node_modules/.pnpm/@idux+cdk@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/cdk/a11y/index.js
function isFakeMousedownFromScreenReader(event) {
	return event.offsetX === 0 && event.offsetY === 0;
}
function isFakeTouchstartFromScreenReader(event) {
	const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
	return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}
var INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN = Symbol("cdk-input-modality-detector-options");
var INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS = { ignoreCodes: [
	"AltLeft",
	"AltRight",
	"ControlLeft",
	"ControlRight",
	"OSLeft",
	"OSRight",
	"ShiftLeft",
	"ShiftRight"
] };
var modalityEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
function useInputModalityDetector(options) {
	const _options = {
		...inject(INPUT_MODALITY_DETECTOR_OPTIONS_TOKEN, INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS),
		...options
	};
	const _modality = ref(null);
	const _modalityDetected = customRef((track, trigger) => {
		let value = null;
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				value = newValue;
				trigger();
			}
		};
	});
	const changeModality = (value) => {
		_modality.value = value;
		_modalityDetected.value = value;
	};
	const _target = ref(null);
	let _lastTouchMs = 0;
	const _onKeydown = (event) => {
		var _a;
		if ((_a = _options.ignoreCodes) == null ? void 0 : _a.some((code) => code === event.code)) return;
		changeModality("keyboard");
		_target.value = _getEventTarget(event);
	};
	const _onMousedown = (event) => {
		if (Date.now() - _lastTouchMs < 650) return;
		changeModality(isFakeMousedownFromScreenReader(event) ? "keyboard" : "mouse");
		_target.value = _getEventTarget(event);
	};
	const _onTouchstart = (event) => {
		if (isFakeTouchstartFromScreenReader(event)) {
			changeModality("keyboard");
			return;
		}
		_lastTouchMs = Date.now();
		changeModality("touch");
		_target.value = _getEventTarget(event);
	};
	if (isBrowser) {
		document.addEventListener("keydown", _onKeydown, modalityEventListenerOptions);
		document.addEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
		document.addEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
	}
	tryOnScopeDispose(() => {
		if (isBrowser) {
			document.removeEventListener("keydown", _onKeydown, modalityEventListenerOptions);
			document.removeEventListener("mousedown", _onMousedown, modalityEventListenerOptions);
			document.removeEventListener("touchstart", _onTouchstart, modalityEventListenerOptions);
		}
	});
	return {
		modality: _modality,
		modalityDetected: _modalityDetected,
		target: _target
	};
}
var useSharedInputModalityDetector = createSharedComposable(() => useInputModalityDetector());
var FOCUS_MONITOR_OPTIONS_TOKEN = Symbol("cdk-focus-monitor-options");
var FOCUS_MONITOR_DEFAULT_OPTIONS = { detectionMode: "immediate" };
var captureEventListenerOptions = normalizePassiveListenerOptions({
	passive: true,
	capture: true
});
function useFocusMonitor(options) {
	var _a;
	const _options = {
		...inject(FOCUS_MONITOR_OPTIONS_TOKEN, FOCUS_MONITOR_DEFAULT_OPTIONS),
		...options
	};
	const _detectionMode = _options.detectionMode;
	const _inputModalityDetector = (_a = _options.inputModalityDetector) != null ? _a : useSharedInputModalityDetector();
	let _origin = null;
	let _lastFocusOrigin;
	let _windowFocused = false;
	let _windowFocusTimeoutId;
	let _originTimeoutId;
	let _originFromTouchInteraction = false;
	const _elementInfo = /* @__PURE__ */ new Map();
	let _monitoredElementCount = 0;
	const _rootNodeFocusListenerCount = /* @__PURE__ */ new Map();
	const _windowFocusListener = () => {
		_windowFocused = true;
		_windowFocusTimeoutId = setTimeout(() => _windowFocused = false);
	};
	let _stopInputModalityDetector = null;
	const _rootNodeFocusAndBlurListener = (event) => {
		const target = _getEventTarget(event);
		const handler = event.type === "focus" ? _onFocus : _onBlur;
		for (let element = target; element; element = element.parentElement) handler(event, element);
	};
	function monitor(element, checkChildren = false) {
		const nativeElement = convertElement(element);
		if (!isBrowser || !nativeElement || nativeElement.nodeType !== 1) return computed(() => ({ origin: null }));
		const rootNode = _getShadowRoot(nativeElement) || _getDocument();
		const cachedInfo = _elementInfo.get(nativeElement);
		if (cachedInfo) {
			if (checkChildren) cachedInfo.checkChildren = true;
			return computed(() => cachedInfo.subject.value);
		}
		const info = {
			checkChildren,
			subject: shallowRef({ origin: null }),
			rootNode
		};
		_elementInfo.set(nativeElement, info);
		_registerGlobalListeners(info);
		return computed(() => info.subject.value);
	}
	function stopMonitoring(element) {
		const nativeElement = convertElement(element);
		if (!nativeElement) return;
		const elementInfo = _elementInfo.get(nativeElement);
		if (elementInfo) {
			_setClasses(nativeElement);
			_elementInfo.delete(nativeElement);
			_removeGlobalListeners(elementInfo);
		}
	}
	function focusVia(element, origin, options2) {
		const nativeElement = convertElement(element);
		if (nativeElement === _getDocument().activeElement) _getClosestElementsInfo(nativeElement).forEach(([currentElement, info]) => _originChanged(currentElement, origin, info));
		else {
			_setOrigin(origin);
			if (nativeElement && typeof nativeElement.focus === "function") nativeElement.focus(options2);
		}
	}
	function blurVia(element) {
		const nativeElement = convertElement(element);
		if (!nativeElement) return;
		if (nativeElement === _getDocument().activeElement && typeof nativeElement.blur === "function") nativeElement.blur();
	}
	function _getDocument() {
		return document;
	}
	function _getWindow() {
		return _getDocument().defaultView || window;
	}
	function _toggleClass(element, className, shouldSet) {
		if (shouldSet) element.classList.add(className);
		else element.classList.remove(className);
	}
	function _getFocusOrigin(focusEventTarget) {
		if (_origin) {
			if (_originFromTouchInteraction) return _shouldBeAttributedToTouch(focusEventTarget) ? "touch" : "program";
			else return _origin;
		}
		return _windowFocused && _lastFocusOrigin ? _lastFocusOrigin : "program";
	}
	function _shouldBeAttributedToTouch(focusEventTarget) {
		return _detectionMode === "eventual" || !!(focusEventTarget == null ? void 0 : focusEventTarget.contains(_inputModalityDetector.target.value));
	}
	function _setClasses(element, origin) {
		_toggleClass(element, "cdk-focused", !!origin);
		_toggleClass(element, "cdk-touch-focused", origin === "touch");
		_toggleClass(element, "cdk-keyboard-focused", origin === "keyboard");
		_toggleClass(element, "cdk-mouse-focused", origin === "mouse");
		_toggleClass(element, "cdk-program-focused", origin === "program");
	}
	function _setOrigin(origin, isFromInteraction = false) {
		_origin = origin;
		_originFromTouchInteraction = origin === "touch" && isFromInteraction;
		if (_detectionMode === "immediate") {
			clearTimeout(_originTimeoutId);
			_originTimeoutId = setTimeout(() => _origin = null, _originFromTouchInteraction ? 650 : 1);
		}
	}
	function _onFocus(event, element) {
		const elementInfo = _elementInfo.get(element);
		const focusEventTarget = _getEventTarget(event);
		if (!elementInfo || !elementInfo.checkChildren && element !== focusEventTarget) return;
		_originChanged(element, _getFocusOrigin(focusEventTarget), elementInfo, event);
	}
	function _onBlur(event, element) {
		const elementInfo = _elementInfo.get(element);
		if (!elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget)) return;
		_setClasses(element);
		_emitOrigin(elementInfo.subject, null, event);
	}
	function _emitOrigin(subject, origin, event) {
		subject.value = {
			origin,
			event
		};
	}
	function _registerGlobalListeners(elementInfo) {
		if (!isBrowser) return;
		const rootNode = elementInfo.rootNode;
		const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode) || 0;
		if (!rootNodeFocusListeners) {
			rootNode.addEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
			rootNode.addEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
		}
		_rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners + 1);
		if (++_monitoredElementCount === 1) {
			_getWindow().addEventListener("focus", _windowFocusListener);
			_stopInputModalityDetector = watchEffect(() => {
				_setOrigin(_inputModalityDetector.modalityDetected.value, true);
			});
		}
	}
	function _removeGlobalListeners(elementInfo) {
		const rootNode = elementInfo.rootNode;
		if (_rootNodeFocusListenerCount.has(rootNode)) {
			const rootNodeFocusListeners = _rootNodeFocusListenerCount.get(rootNode);
			if (rootNodeFocusListeners > 1) _rootNodeFocusListenerCount.set(rootNode, rootNodeFocusListeners - 1);
			else {
				rootNode.removeEventListener("focus", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
				rootNode.removeEventListener("blur", _rootNodeFocusAndBlurListener, captureEventListenerOptions);
				_rootNodeFocusListenerCount.delete(rootNode);
			}
		}
		if (!--_monitoredElementCount) {
			_getWindow().removeEventListener("focus", _windowFocusListener);
			if (_stopInputModalityDetector) {
				_stopInputModalityDetector();
				_stopInputModalityDetector = null;
			}
			clearTimeout(_windowFocusTimeoutId);
			clearTimeout(_originTimeoutId);
		}
	}
	function _originChanged(element, origin, elementInfo, event) {
		_setClasses(element, origin);
		_emitOrigin(elementInfo.subject, origin, event);
		_lastFocusOrigin = origin;
	}
	function _getClosestElementsInfo(element) {
		const results = [];
		_elementInfo.forEach((info, currentElement) => {
			if (currentElement === element || info.checkChildren && currentElement.contains(element)) results.push([currentElement, info]);
		});
		return results;
	}
	tryOnScopeDispose(() => _elementInfo.forEach((_info, element) => stopMonitoring(element)));
	return {
		monitor,
		stopMonitoring,
		focusVia,
		blurVia
	};
}
var useSharedFocusMonitor = createSharedComposable(() => useFocusMonitor());
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/utils/index.js
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
// ../../node_modules/.pnpm/@idux+components@2.11.0_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/components/form/index.js
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
export { traverseTree as $, convertCssPixel as A, insertChildTreeItem as B, useGlobalConfig as C, callEmit as D, NoopObject as E, flattenNode as F, isNumeric as G, insertTreeItemBefore as H, getBoxSizingData as I, on as J, isVisibleElement as K, getFirstValidNode as L, convertNumber as M, createSharedComposable as N, cancelRAF as O, easeInOutCubic as P, throwError as Q, getMouseClientXY as R, useThemeToken as S, NoopFunction as T, isEmptyNode as U, insertTreeItemAfter as V, isFocusable as W, rAF as X, parseSize as Y, removeTreeItem as Z, PieChart as _, useFormStatus as a, useState as at, getBaseColors$1 as b, convertStringVNode as c, isWebKit as ct, useZIndex as d, isNumber as dt, tryOnScopeDispose as et, useSharedFocusMonitor as f, isString as ft, Loading as g, IxIcon as h, useFormSize as i, useKey as it, convertElement as j, convertArray as k, useGetKey as l, supportsFlexGap as lt, Empty as m, useFormElement as n, useControlledProp as nt, useMergedCommonControlProps as o, isBrowser as ot, Down as p, createCompounder as pt, off as q, useFormItemRegister as r, useEventListener as rt, convertIconVNode as s, isFirefox as st, FORM_TOKEN as t, uniqueId as tt, useOverlayFocusMonitor as u, kebabCase as ut, addIconDefinitions as v, Logger as w, getSolidColor as x, getAlphaColor as y, hasSlot as z };
