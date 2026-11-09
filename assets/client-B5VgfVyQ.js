import { Mr as defineComponent, Pr as h, Rr as nextTick, Sr as Teleport, Ur as onMounted, Wr as onUnmounted, Yr as watch, ai as ref, ii as reactive, jr as createVNode, ri as markRaw, yr as createApp } from "./app-default-mEGbGD8Y.js";
// ../../node_modules/.pnpm/@idux+archive-loader-vue@0.5.0_@types+markdown-it@12.2.3_vue@3.5.45_typescript@6.0.3_/node_modules/@idux/archive-loader-vue/dist/client.js
var Zt = typeof global == "object" && global && global.Object === Object && global;
var Fe = typeof self == "object" && self && self.Object === Object && self;
var m = Zt || Fe || Function("return this")();
var $ = m.Symbol;
var Jt = Object.prototype;
var Le = Jt.hasOwnProperty;
var Ue = Jt.toString;
var B = $ ? $.toStringTag : void 0;
function Be(t) {
	var e = Le.call(t, B), n = t[B];
	try {
		t[B] = void 0;
		var r = !0;
	} catch {}
	var a = Ue.call(t);
	return r && (e ? t[B] = n : delete t[B]), a;
}
var Ge = Object.prototype.toString;
function ze(t) {
	return Ge.call(t);
}
var Ke = "[object Null]";
var He = "[object Undefined]";
var vt = $ ? $.toStringTag : void 0;
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
	for (var n = -1, r = t == null ? 0 : t.length, a = Array(r); ++n < r;) a[n] = e(t[n], n, t);
	return a;
}
var I = Array.isArray;
var Xe = 1 / 0;
var mt = $ ? $.prototype : void 0;
var Tt = mt ? mt.toString : void 0;
function kt(t) {
	if (typeof t == "string") return t;
	if (I(t)) return Qt(t, kt) + "";
	if (X(t)) return Tt ? Tt.call(t) : "";
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
var rn = "[object AsyncFunction]";
var an = "[object Function]";
var on = "[object GeneratorFunction]";
var sn = "[object Proxy]";
function W(t) {
	if (!S(t)) return !1;
	var e = E(t);
	return e == an || e == on || e == rn || e == sn;
}
var J = m["__core-js_shared__"];
var jt = function() {
	var t = /[^.]+$/.exec(J && J.keys && J.keys.IE_PROTO || "");
	return t ? "Symbol(src)_1." + t : "";
}();
function un(t) {
	return !!jt && jt in t;
}
var ln = Function.prototype.toString;
function F(t) {
	if (t != null) {
		try {
			return ln.call(t);
		} catch {}
		try {
			return t + "";
		} catch {}
	}
	return "";
}
var pn = /[\\^$.*+?()[\]{}|]/g;
var dn = /^\[object .+?Constructor\]$/;
var gn = Function.prototype;
var hn = Object.prototype;
var bn = gn.toString;
var yn = hn.hasOwnProperty;
var vn = RegExp("^" + bn.call(yn).replace(pn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function mn(t) {
	if (!S(t) || un(t)) return !1;
	return (W(t) ? vn : dn).test(F(t));
}
function Tn(t, e) {
	return t === null || t === void 0 ? void 0 : t[e];
}
function D(t, e) {
	var n = Tn(t, e);
	return mn(n) ? n : void 0;
}
var et = D(m, "WeakMap");
var wt = Object.create;
var jn = function() {
	function t() {}
	return function(e) {
		if (!S(e)) return {};
		if (wt) return wt(e);
		t.prototype = e;
		var n = new t();
		return t.prototype = void 0, n;
	};
}();
function wn(t, e, n) {
	switch (n.length) {
		case 0: return t.call(e);
		case 1: return t.call(e, n[0]);
		case 2: return t.call(e, n[0], n[1]);
		case 3: return t.call(e, n[0], n[1], n[2]);
	}
	return t.apply(e, n);
}
function On(t, e) {
	var n = -1, r = t.length;
	for (e || (e = Array(r)); ++n < r;) e[n] = t[n];
	return e;
}
var An = 800;
var Sn = 16;
var In = Date.now;
function Pn(t) {
	var e = 0, n = 0;
	return function() {
		var r = In(), a = Sn - (r - n);
		if (n = r, a > 0) {
			if (++e >= An) return arguments[0];
		} else e = 0;
		return t.apply(void 0, arguments);
	};
}
function Cn(t) {
	return function() {
		return t;
	};
}
var V = function() {
	try {
		var t = D(Object, "defineProperty");
		return t({}, "", {}), t;
	} catch {}
}();
var Dn = Pn(V ? function(t, e) {
	return V(t, "toString", {
		configurable: !0,
		enumerable: !1,
		value: Cn(e),
		writable: !0
	});
} : nn);
function Nn(t, e) {
	for (var n = -1, r = t == null ? 0 : t.length; ++n < r && e(t[n], n, t) !== !1;);
	return t;
}
var Ln = 9007199254740991;
var Un = /^(?:0|[1-9]\d*)$/;
function Bn(t, e) {
	var _e2;
	var n = typeof t;
	return e = (_e2 = e) !== null && _e2 !== void 0 ? _e2 : Ln, !!e && (n == "number" || n != "symbol" && Un.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function te(t, e, n) {
	e == "__proto__" && V ? V(t, e, {
		configurable: !0,
		enumerable: !0,
		value: n,
		writable: !0
	}) : t[e] = n;
}
function ee(t, e) {
	return t === e || t !== t && e !== e;
}
var Gn = Object.prototype.hasOwnProperty;
function ne(t, e, n) {
	var r = t[e];
	(!(Gn.call(t, e) && ee(r, n)) || n === void 0 && !(e in t)) && te(t, e, n);
}
function K(t, e, n, r) {
	var a = !n;
	n || (n = {});
	for (var o = -1, i = e.length; ++o < i;) {
		var s = e[o], c = r ? r(n[s], t[s], s, n, t) : void 0;
		c === void 0 && (c = t[s]), a ? te(n, s, c) : ne(n, s, c);
	}
	return n;
}
var Ot = Math.max;
function zn(t, e, n) {
	return e = Ot(e === void 0 ? t.length - 1 : e, 0), function() {
		for (var r = arguments, a = -1, o = Ot(r.length - e, 0), i = Array(o); ++a < o;) i[a] = r[e + a];
		a = -1;
		for (var s = Array(e + 1); ++a < e;) s[a] = r[a];
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
	var e = t && t.constructor;
	return t === (typeof e == "function" && e.prototype || Hn);
}
function Wn(t, e) {
	for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
	return r;
}
var Vn = "[object Arguments]";
function At(t) {
	return M(t) && E(t) == Vn;
}
var oe = Object.prototype;
var Xn = oe.hasOwnProperty;
var Yn = oe.propertyIsEnumerable;
var ie = At(function() {
	return arguments;
}()) ? At : function(t) {
	return M(t) && Xn.call(t, "callee") && !Yn.call(t, "callee");
};
function Zn() {
	return !1;
}
var se = typeof exports == "object" && exports && !exports.nodeType && exports;
var St = se && typeof module == "object" && module && !module.nodeType && module;
var It = St && St.exports === se ? m.Buffer : void 0;
var ce = (It ? It.isBuffer : void 0) || Zn;
var tr = "[object Arguments]";
var er = "[object Array]";
var nr = "[object Boolean]";
var rr = "[object Date]";
var ar = "[object Error]";
var or = "[object Function]";
var ir = "[object Map]";
var sr = "[object Number]";
var cr = "[object Object]";
var ur = "[object RegExp]";
var fr = "[object Set]";
var lr = "[object String]";
var pr = "[object WeakMap]";
var dr = "[object ArrayBuffer]";
var gr = "[object DataView]";
var hr = "[object Float32Array]";
var br = "[object Float64Array]";
var yr = "[object Int8Array]";
var vr = "[object Int16Array]";
var mr = "[object Int32Array]";
var Tr = "[object Uint8Array]";
var $r = "[object Uint8ClampedArray]";
var _r = "[object Uint16Array]";
var jr = "[object Uint32Array]";
var l = {};
l[hr] = l[br] = l[yr] = l[vr] = l[mr] = l[Tr] = l[$r] = l[_r] = l[jr] = !0;
l[tr] = l[er] = l[dr] = l[nr] = l[gr] = l[rr] = l[ar] = l[or] = l[ir] = l[sr] = l[cr] = l[ur] = l[fr] = l[lr] = l[pr] = !1;
function wr(t) {
	return M(t) && re(t.length) && !!l[E(t)];
}
function it(t) {
	return function(e) {
		return t(e);
	};
}
var ue = typeof exports == "object" && exports && !exports.nodeType && exports;
var R = ue && typeof module == "object" && module && !module.nodeType && module;
var Q = R && R.exports === ue && Zt.process;
var N = function() {
	try {
		return R && R.require && R.require("util").types || Q && Q.binding && Q.binding("util");
	} catch {}
}();
var Pt = N && N.isTypedArray;
var Ir = Pt ? it(Pt) : wr;
var Cr = Object.prototype.hasOwnProperty;
function fe(t, e) {
	var n = I(t), r = !n && ie(t), a = !n && !r && ce(t), o = !n && !r && !a && Ir(t), i = n || r || a || o, s = i ? Wn(t.length, String) : [], c = s.length;
	for (var u in t) (e || Cr.call(t, u)) && !(i && (u == "length" || a && (u == "offset" || u == "parent") || o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Bn(u, c))) && s.push(u);
	return s;
}
function le(t, e) {
	return function(n) {
		return t(e(n));
	};
}
var Er = le(Object.keys, Object);
var Fr = Object.prototype.hasOwnProperty;
function Dr(t) {
	if (!ot(t)) return Er(t);
	var e = [];
	for (var n in Object(t)) Fr.call(t, n) && n != "constructor" && e.push(n);
	return e;
}
function st(t) {
	return ae(t) ? fe(t) : Dr(t);
}
function Nr(t) {
	var e = [];
	if (t != null) for (var n in Object(t)) e.push(n);
	return e;
}
var Ur = Object.prototype.hasOwnProperty;
function Br(t) {
	if (!S(t)) return Nr(t);
	var e = ot(t), n = [];
	for (var r in t) r == "constructor" && (e || !Ur.call(t, r)) || n.push(r);
	return n;
}
function ct(t) {
	return ae(t) ? fe(t, !0) : Br(t);
}
var Rr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var Gr = /^\w*$/;
function zr(t, e) {
	if (I(t)) return !1;
	var n = typeof t;
	return n == "number" || n == "symbol" || n == "boolean" || t == null || X(t) ? !0 : Gr.test(t) || !Rr.test(t) || e != null && t in Object(e);
}
var G = D(Object, "create");
function Hr() {
	this.__data__ = G ? G(null) : {}, this.size = 0;
}
function Wr(t) {
	var e = this.has(t) && delete this.__data__[t];
	return this.size -= e ? 1 : 0, e;
}
var Vr = "__lodash_hash_undefined__";
var Yr = Object.prototype.hasOwnProperty;
function qr(t) {
	var e = this.__data__;
	if (G) {
		var n = e[t];
		return n === Vr ? void 0 : n;
	}
	return Yr.call(e, t) ? e[t] : void 0;
}
var Jr = Object.prototype.hasOwnProperty;
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
	for (this.clear(); ++e < n;) {
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
	for (var n = t.length; n--;) if (ee(t[n][0], e)) return n;
	return -1;
}
var ra = Array.prototype.splice;
function aa(t) {
	var e = this.__data__, n = Y(e, t);
	if (n < 0) return !1;
	return n == e.length - 1 ? e.pop() : ra.call(e, n, 1), --this.size, !0;
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
	for (this.clear(); ++e < n;) {
		var r = t[e];
		this.set(r[0], r[1]);
	}
}
j.prototype.clear = ea;
j.prototype.delete = aa;
j.prototype.get = oa;
j.prototype.has = ia;
j.prototype.set = sa;
var z = D(m, "Map");
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
	for (this.clear(); ++e < n;) {
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
	if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(ha);
	var n = function() {
		var r = arguments, a = e ? e.apply(this, r) : r[0], o = n.cache;
		if (o.has(a)) return o.get(a);
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
var va = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var ma = /\\(\\)?/g;
var $a = ya(function(t) {
	var e = [];
	return t.charCodeAt(0) === 46 && e.push(""), t.replace(va, function(n, r, a, o) {
		e.push(a ? o.replace(ma, "$1") : r || n);
	}), e;
});
function _a(t) {
	return t == null ? "" : kt(t);
}
function ft(t, e) {
	return I(t) ? t : zr(t, e) ? [t] : $a(_a(t));
}
var ja = 1 / 0;
function pe(t) {
	if (typeof t == "string" || X(t)) return t;
	var e = t + "";
	return e == "0" && 1 / t == -ja ? "-0" : e;
}
function wa(t, e) {
	e = ft(e, t);
	for (var n = 0, r = e.length; t != null && n < r;) t = t[pe(e[n++])];
	return n && n == r ? t : void 0;
}
function lt(t, e) {
	for (var n = -1, r = e.length, a = t.length; ++n < r;) t[a + n] = e[n];
	return t;
}
var Ct = $ ? $.isConcatSpreadable : void 0;
function Oa(t) {
	return I(t) || ie(t) || !!(Ct && t && t[Ct]);
}
function de(t, e, n, r, a) {
	var o = -1, i = t.length;
	for (n || (n = Oa), a || (a = []); ++o < i;) {
		var s = t[o];
		e > 0 && n(s) ? e > 1 ? de(s, e - 1, n, r, a) : lt(a, s) : r || (a[a.length] = s);
	}
	return a;
}
function Aa(t) {
	return (t == null ? 0 : t.length) ? de(t, 1) : [];
}
function Sa(t) {
	return Dn(zn(t, void 0, Aa), t + "");
}
var pt = le(Object.getPrototypeOf, Object);
var Pa = "[object Object]";
var Ca = Function.prototype;
var xa = Object.prototype;
var ge = Ca.toString;
var Ea = xa.hasOwnProperty;
var Ma = ge.call(Object);
function he(t) {
	if (!M(t) || E(t) != Pa) return !1;
	var e = pt(t);
	if (e === null) return !0;
	var n = Ea.call(e, "constructor") && e.constructor;
	return typeof n == "function" && n instanceof n && ge.call(n) == Ma;
}
function Fa(t, e, n) {
	var r = -1, a = t.length;
	e < 0 && (e = -e > a ? 0 : a + e), n = n > a ? a : n, n < 0 && (n += a), a = e > n ? 0 : n - e >>> 0, e >>>= 0;
	for (var o = Array(a); ++r < a;) o[r] = t[r + e];
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
		if (!z || r.length < Ba - 1) return r.push([t, e]), this.size = ++n.size, this;
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
var be = typeof exports == "object" && exports && !exports.nodeType && exports;
var xt = be && typeof module == "object" && module && !module.nodeType && module;
var Et = xt && xt.exports === be ? m.Buffer : void 0;
var Mt = Et ? Et.allocUnsafe : void 0;
function Ha(t, e) {
	if (e) return t.slice();
	var n = t.length, r = Mt ? Mt(n) : new t.constructor(n);
	return t.copy(r), r;
}
function Wa(t, e) {
	for (var n = -1, r = t == null ? 0 : t.length, a = 0, o = []; ++n < r;) {
		var i = t[n];
		e(i, n, t) && (o[a++] = i);
	}
	return o;
}
function ye() {
	return [];
}
var Xa = Object.prototype.propertyIsEnumerable;
var Ft = Object.getOwnPropertySymbols;
var dt = Ft ? function(t) {
	return t == null ? [] : (t = Object(t), Wa(Ft(t), function(e) {
		return Xa.call(t, e);
	}));
} : ye;
function qa(t, e) {
	return K(t, dt(t), e);
}
var ve = Object.getOwnPropertySymbols ? function(t) {
	for (var e = []; t;) lt(e, dt(t)), t = pt(t);
	return e;
} : ye;
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
var nt = D(m, "DataView");
var rt = D(m, "Promise");
var at = D(m, "Set");
var Dt = "[object Map]";
var ro = "[object Object]";
var Nt = "[object Promise]";
var Lt = "[object Set]";
var Ut = "[object WeakMap]";
var Bt = "[object DataView]";
var ao = F(nt);
var oo = F(z);
var io = F(rt);
var so = F(at);
var co = F(et);
var C = E;
(nt && C(new nt(/* @__PURE__ */ new ArrayBuffer(1))) != Bt || z && C(new z()) != Dt || rt && C(rt.resolve()) != Nt || at && C(new at()) != Lt || et && C(new et()) != Ut) && (C = function(t) {
	var e = E(t), n = e == ro ? t.constructor : void 0, r = n ? F(n) : "";
	if (r) switch (r) {
		case ao: return Bt;
		case oo: return Dt;
		case io: return Nt;
		case so: return Lt;
		case co: return Ut;
	}
	return e;
});
var gt = C;
var fo = Object.prototype.hasOwnProperty;
function lo(t) {
	var e = t.length, n = new t.constructor(e);
	return e && typeof t[0] == "string" && fo.call(t, "index") && (n.index = t.index, n.input = t.input), n;
}
var Rt = m.Uint8Array;
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
var Gt = $ ? $.prototype : void 0;
var zt = Gt ? Gt.valueOf : void 0;
function yo(t) {
	return zt ? Object(zt.call(t)) : {};
}
function vo(t, e) {
	var n = e ? ht(t.buffer) : t.buffer;
	return new t.constructor(n, t.byteOffset, t.length);
}
var mo = "[object Boolean]";
var To = "[object Date]";
var $o = "[object Map]";
var _o = "[object Number]";
var jo = "[object RegExp]";
var wo = "[object Set]";
var Oo = "[object String]";
var Ao = "[object Symbol]";
var So = "[object ArrayBuffer]";
var Io = "[object DataView]";
var Po = "[object Float32Array]";
var Co = "[object Float64Array]";
var xo = "[object Int8Array]";
var Eo = "[object Int16Array]";
var Mo = "[object Int32Array]";
var Fo = "[object Uint8Array]";
var Do = "[object Uint8ClampedArray]";
var No = "[object Uint16Array]";
var Lo = "[object Uint32Array]";
function Uo(t, e, n) {
	var r = t.constructor;
	switch (e) {
		case So: return ht(t);
		case mo:
		case To: return new r(+t);
		case Io: return go(t, n);
		case Po:
		case Co:
		case xo:
		case Eo:
		case Mo:
		case Fo:
		case Do:
		case No:
		case Lo: return vo(t, n);
		case $o: return new r();
		case _o:
		case Oo: return new r(t);
		case jo: return bo(t);
		case wo: return new r();
		case Ao: return yo(t);
	}
}
function Bo(t) {
	return typeof t.constructor == "function" && !ot(t) ? jn(pt(t)) : {};
}
var Ro = "[object Map]";
function Go(t) {
	return M(t) && gt(t) == Ro;
}
var Kt = N && N.isMap;
var Ko = Kt ? it(Kt) : Go;
var Ho = "[object Set]";
function Wo(t) {
	return M(t) && gt(t) == Ho;
}
var Ht = N && N.isSet;
var Xo = Ht ? it(Ht) : Wo;
var Yo = 1;
var qo = 2;
var Zo = 4;
var $e = "[object Arguments]";
var Jo = "[object Array]";
var Qo = "[object Boolean]";
var ko = "[object Date]";
var ti = "[object Error]";
var _e = "[object Function]";
var ei = "[object GeneratorFunction]";
var ni = "[object Map]";
var ri = "[object Number]";
var je = "[object Object]";
var ai = "[object RegExp]";
var oi = "[object Set]";
var ii = "[object String]";
var si = "[object Symbol]";
var ci = "[object WeakMap]";
var ui = "[object ArrayBuffer]";
var fi = "[object DataView]";
var li = "[object Float32Array]";
var pi = "[object Float64Array]";
var di = "[object Int8Array]";
var gi = "[object Int16Array]";
var hi = "[object Int32Array]";
var bi = "[object Uint8Array]";
var yi = "[object Uint8ClampedArray]";
var vi = "[object Uint16Array]";
var mi = "[object Uint32Array]";
var f = {};
f[$e] = f[Jo] = f[ui] = f[fi] = f[Qo] = f[ko] = f[li] = f[pi] = f[di] = f[gi] = f[hi] = f[ni] = f[ri] = f[je] = f[ai] = f[oi] = f[ii] = f[si] = f[bi] = f[yi] = f[vi] = f[mi] = !0;
f[ti] = f[_e] = f[ci] = !1;
function H(t, e, n, r, a, o) {
	var i, s = e & Yo, c = e & qo, u = e & Zo;
	if (n && (i = a ? n(t, r, a, o) : n(t)), i !== void 0) return i;
	if (!S(t)) return t;
	var v = I(t);
	if (v) {
		if (i = lo(t), !s) return On(t, i);
	} else {
		var g = gt(t), w = g == _e || g == ei;
		if (ce(t)) return Ha(t, s);
		if (g == je || g == $e || w && !a) {
			if (i = c || w ? {} : Bo(t), !s) return c ? Qa(t, za(i, t)) : qa(t, Ga(i, t));
		} else {
			if (!f[g]) return a ? t : {};
			i = Uo(t, g, s);
		}
	}
	o || (o = new L());
	var _ = o.get(t);
	if (_) return _;
	o.set(t, i), Xo(t) ? t.forEach(function(h) {
		i.add(H(h, e, n, h, t, o));
	}) : Ko(t) && t.forEach(function(h, d) {
		i.set(d, H(h, e, n, d, t, o));
	});
	var y = v ? void 0 : (u ? c ? Te : ka : c ? ct : st)(t);
	return Nn(y || t, function(h, d) {
		y && (d = h, h = t[d]), ne(i, d, H(h, e, n, d, t, o));
	}), i;
}
function Oi(t) {
	var e = t == null ? 0 : t.length;
	return e ? t[e - 1] : void 0;
}
function Ai(t, e) {
	return e.length < 2 ? t : wa(t, Fa(e, 0, -1));
}
function Si(t) {
	return t == null;
}
function Ii(t, e) {
	return e = ft(e, t), t = Ai(t, e), t == null || delete t[pe(Oi(e))];
}
function Pi(t) {
	return he(t) ? void 0 : t;
}
var Ci = 1;
var xi = 2;
var Ei = 4;
Sa(function(t, e) {
	var n = {};
	if (t == null) return n;
	var r = !1;
	e = Qt(e, function(o) {
		return o = ft(o, t), r || (r = o.length > 1), o;
	}), K(t, Te(t), n), r && (n = H(n, Ci | xi | Ei, Pi));
	for (var a = e.length; a--;) Ii(n, e[a]);
	return n;
});
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
function Di(t) {
	let e = null, n = 0;
	const r = ref(/* @__PURE__ */ new Set()), a = () => [...r.value.values()].map(({ key: c, el: u, component: v, props: g }) => createVNode(Teleport, {
		to: u,
		key: c
	}, { default: () => [createVNode(v, g)] })), o = () => {
		var _t$setupApp;
		if (e) return;
		e = createApp({ render: () => (t === null || t === void 0 ? void 0 : t.renderApp) ? t.renderApp(a()) : a() }), t === null || t === void 0 || (_t$setupApp = t.setupApp) === null || _t$setupApp === void 0 || _t$setupApp.call(t, e);
		const c = document.createElement("div");
		document.body.appendChild(c), e.mount(c);
	}, i = (c, u, v) => {
		o();
		const g = reactive({
			component: u,
			props: v !== null && v !== void 0 ? v : {},
			key: `instance-${n++}`,
			el: c
		});
		return r.value.add(g), g;
	}, s = (c) => {
		c && r.value.delete(c);
	};
	return (c) => {
		let u;
		const v = /* @__PURE__ */ new Set(), g = () => {
			v.forEach((p) => {
				p();
			});
		};
		function w(p, y) {
			let h;
			return W(p) ? h = () => {
				p(u.props);
			} : h = () => {
				var _u$props;
				y === null || y === void 0 || y((_u$props = u.props) === null || _u$props === void 0 ? void 0 : _u$props[p]);
			}, v.add(h), () => {
				v.delete(h);
			};
		}
		function _(p) {
			if (!p || p === !0) return;
			switch (I(p) ? p[0] : p) {
				case Boolean: return "boolean";
				case String: return "string";
				case Number: return "number";
				case Object: return "object";
				case Array: return "array";
				default: return;
			}
		}
		return {
			mount(p, y) {
				u = i(p, markRaw(c), y);
				const d = this.getProps().reduce((T, O) => (Si(O.default) || (T[O.key] = O.default), T), {});
				Object.keys(d).length > 0 && this.setData(d);
			},
			unmount() {
				s(u);
			},
			getProps() {
				if (!("props" in c)) return [];
				const p = c.props, y = [];
				return p && Object.entries(p).forEach(([h, d]) => {
					let T, O;
					he(d) && "type" in d ? (T = _(d.type), O = W(d.default) ? d.default() : d.default) : T = _(d), T && y.push({
						key: h,
						type: T,
						default: O
					});
				}), y;
			},
			getData() {
				return u.props;
			},
			setData(p) {
				var _u$props2;
				p || (u.props = void 0);
				const y = {
					...(_u$props2 = u.props) !== null && _u$props2 !== void 0 ? _u$props2 : {},
					...p
				};
				u.props = y, g();
			},
			watchData: w
		};
	};
}
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
defineComponent({
	name: "ArchiveInstance",
	props: {
		instance: Object,
		onInstanceMountedChange: Function
	},
	setup(t) {
		const e = ref();
		return onMounted(() => {
			watch(() => t.instance, async (n, r) => {
				var _t$onInstanceMountedC, _n$mount;
				for ((_t$onInstanceMountedC = t.onInstanceMountedChange) === null || _t$onInstanceMountedC === void 0 || _t$onInstanceMountedC.call(t, !1), await (r === null || r === void 0 ? void 0 : r.unmount()); !e.value;) await nextTick();
				const a = new MutationObserver((o) => {
					var _e$value, _t$onInstanceMountedC2;
					o.findIndex((i) => i.type === "childList") > -1 && (_e$value = e.value) !== null && _e$value !== void 0 && _e$value.children.length && ((_t$onInstanceMountedC2 = t.onInstanceMountedChange) === null || _t$onInstanceMountedC2 === void 0 || _t$onInstanceMountedC2.call(t, !0), a.disconnect());
				});
				a.observe(e.value, {
					childList: !0,
					subtree: !1,
					attributes: !1
				}), await (n === null || n === void 0 || (_n$mount = n.mount) === null || _n$mount === void 0 ? void 0 : _n$mount.call(n, e.value));
			}, { immediate: !0 });
		}), onUnmounted(() => {
			var _t$instance;
			(_t$instance = t.instance) === null || _t$instance === void 0 || _t$instance.unmount();
		}), () => h("div", { ref: e });
	}
});
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
/**
* @license
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/IDuxFE/archive/blob/main/LICENSE
*/
var tt = {};
function Ui(t, e, n) {
	const r = t !== null && t !== void 0 ? t : "default";
	return tt[r] || (tt[r] = Di(n)), tt[r](e);
}
export { Ui as t };
