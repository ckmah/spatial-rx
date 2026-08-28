function Fh(c, y) {
  for (var m = 0; m < y.length; m++) {
    const o = y[m];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const T in o)
        if (T !== "default" && !(T in c)) {
          const D = Object.getOwnPropertyDescriptor(o, T);
          D && Object.defineProperty(c, T, D.get ? D : {
            enumerable: !0,
            get: () => o[T]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }));
}
function Ih(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var Tf = { exports: {} }, qn = {};
var jd;
function Ph() {
  if (jd) return qn;
  jd = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), y = /* @__PURE__ */ Symbol.for("react.fragment");
  function m(o, T, D) {
    var x = null;
    if (D !== void 0 && (x = "" + D), T.key !== void 0 && (x = "" + T.key), "key" in T) {
      D = {};
      for (var q in T)
        q !== "key" && (D[q] = T[q]);
    } else D = T;
    return T = D.ref, {
      $$typeof: c,
      type: o,
      key: x,
      ref: T !== void 0 ? T : null,
      props: D
    };
  }
  return qn.Fragment = y, qn.jsx = m, qn.jsxs = m, qn;
}
var Gd;
function lv() {
  return Gd || (Gd = 1, Tf.exports = Ph()), Tf.exports;
}
var Fl = lv(), Af = { exports: {} }, Bn = {}, _f = { exports: {} }, Of = {};
var Xd;
function tv() {
  return Xd || (Xd = 1, (function(c) {
    function y(z, U) {
      var K = z.length;
      z.push(U);
      l: for (; 0 < K; ) {
        var cl = K - 1 >>> 1, N = z[cl];
        if (0 < T(N, U))
          z[cl] = U, z[K] = N, K = cl;
        else break l;
      }
    }
    function m(z) {
      return z.length === 0 ? null : z[0];
    }
    function o(z) {
      if (z.length === 0) return null;
      var U = z[0], K = z.pop();
      if (K !== U) {
        z[0] = K;
        l: for (var cl = 0, N = z.length, d = N >>> 1; cl < d; ) {
          var O = 2 * (cl + 1) - 1, R = z[O], Y = O + 1, Z = z[Y];
          if (0 > T(R, K))
            Y < N && 0 > T(Z, R) ? (z[cl] = Z, z[Y] = K, cl = Y) : (z[cl] = R, z[O] = K, cl = O);
          else if (Y < N && 0 > T(Z, K))
            z[cl] = Z, z[Y] = K, cl = Y;
          else break l;
        }
      }
      return U;
    }
    function T(z, U) {
      var K = z.sortIndex - U.sortIndex;
      return K !== 0 ? K : z.id - U.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var D = performance;
      c.unstable_now = function() {
        return D.now();
      };
    } else {
      var x = Date, q = x.now();
      c.unstable_now = function() {
        return x.now() - q;
      };
    }
    var M = [], v = [], Q = 1, C = null, W = 3, sl = !1, gl = !1, il = !1, pl = !1, xl = typeof setTimeout == "function" ? setTimeout : null, Al = typeof clearTimeout == "function" ? clearTimeout : null, _l = typeof setImmediate < "u" ? setImmediate : null;
    function Bl(z) {
      for (var U = m(v); U !== null; ) {
        if (U.callback === null) o(v);
        else if (U.startTime <= z)
          o(v), U.sortIndex = U.expirationTime, y(M, U);
        else break;
        U = m(v);
      }
    }
    function Kl(z) {
      if (il = !1, Bl(z), !gl)
        if (m(M) !== null)
          gl = !0, Dl || (Dl = !0, Yl());
        else {
          var U = m(v);
          U !== null && Xl(Kl, U.startTime - z);
        }
    }
    var Dl = !1, J = -1, H = 5, El = -1;
    function Xt() {
      return pl ? !0 : !(c.unstable_now() - El < H);
    }
    function ct() {
      if (pl = !1, Dl) {
        var z = c.unstable_now();
        El = z;
        var U = !0;
        try {
          l: {
            gl = !1, il && (il = !1, Al(J), J = -1), sl = !0;
            var K = W;
            try {
              t: {
                for (Bl(z), C = m(M); C !== null && !(C.expirationTime > z && Xt()); ) {
                  var cl = C.callback;
                  if (typeof cl == "function") {
                    C.callback = null, W = C.priorityLevel;
                    var N = cl(
                      C.expirationTime <= z
                    );
                    if (z = c.unstable_now(), typeof N == "function") {
                      C.callback = N, Bl(z), U = !0;
                      break t;
                    }
                    C === m(M) && o(M), Bl(z);
                  } else o(M);
                  C = m(M);
                }
                if (C !== null) U = !0;
                else {
                  var d = m(v);
                  d !== null && Xl(
                    Kl,
                    d.startTime - z
                  ), U = !1;
                }
              }
              break l;
            } finally {
              C = null, W = K, sl = !1;
            }
            U = void 0;
          }
        } finally {
          U ? Yl() : Dl = !1;
        }
      }
    }
    var Yl;
    if (typeof _l == "function")
      Yl = function() {
        _l(ct);
      };
    else if (typeof MessageChannel < "u") {
      var Ht = new MessageChannel(), ft = Ht.port2;
      Ht.port1.onmessage = ct, Yl = function() {
        ft.postMessage(null);
      };
    } else
      Yl = function() {
        xl(ct, 0);
      };
    function Xl(z, U) {
      J = xl(function() {
        z(c.unstable_now());
      }, U);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, c.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : H = 0 < z ? Math.floor(1e3 / z) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return W;
    }, c.unstable_next = function(z) {
      switch (W) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = W;
      }
      var K = W;
      W = U;
      try {
        return z();
      } finally {
        W = K;
      }
    }, c.unstable_requestPaint = function() {
      pl = !0;
    }, c.unstable_runWithPriority = function(z, U) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var K = W;
      W = z;
      try {
        return U();
      } finally {
        W = K;
      }
    }, c.unstable_scheduleCallback = function(z, U, K) {
      var cl = c.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? cl + K : cl) : K = cl, z) {
        case 1:
          var N = -1;
          break;
        case 2:
          N = 250;
          break;
        case 5:
          N = 1073741823;
          break;
        case 4:
          N = 1e4;
          break;
        default:
          N = 5e3;
      }
      return N = K + N, z = {
        id: Q++,
        callback: U,
        priorityLevel: z,
        startTime: K,
        expirationTime: N,
        sortIndex: -1
      }, K > cl ? (z.sortIndex = K, y(v, z), m(M) === null && z === m(v) && (il ? (Al(J), J = -1) : il = !0, Xl(Kl, K - cl))) : (z.sortIndex = N, y(M, z), gl || sl || (gl = !0, Dl || (Dl = !0, Yl()))), z;
    }, c.unstable_shouldYield = Xt, c.unstable_wrapCallback = function(z) {
      var U = W;
      return function() {
        var K = W;
        W = U;
        try {
          return z.apply(this, arguments);
        } finally {
          W = K;
        }
      };
    };
  })(Of)), Of;
}
var Qd;
function ev() {
  return Qd || (Qd = 1, _f.exports = tv()), _f.exports;
}
var Mf = { exports: {} }, k = {};
var Zd;
function av() {
  if (Zd) return k;
  Zd = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), y = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), T = /* @__PURE__ */ Symbol.for("react.profiler"), D = /* @__PURE__ */ Symbol.for("react.consumer"), x = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), M = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), Q = /* @__PURE__ */ Symbol.for("react.lazy"), C = /* @__PURE__ */ Symbol.for("react.activity"), W = Symbol.iterator;
  function sl(d) {
    return d === null || typeof d != "object" ? null : (d = W && d[W] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var gl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, il = Object.assign, pl = {};
  function xl(d, O, R) {
    this.props = d, this.context = O, this.refs = pl, this.updater = R || gl;
  }
  xl.prototype.isReactComponent = {}, xl.prototype.setState = function(d, O) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, O, "setState");
  }, xl.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Al() {
  }
  Al.prototype = xl.prototype;
  function _l(d, O, R) {
    this.props = d, this.context = O, this.refs = pl, this.updater = R || gl;
  }
  var Bl = _l.prototype = new Al();
  Bl.constructor = _l, il(Bl, xl.prototype), Bl.isPureReactComponent = !0;
  var Kl = Array.isArray;
  function Dl() {
  }
  var J = { H: null, A: null, T: null, S: null }, H = Object.prototype.hasOwnProperty;
  function El(d, O, R) {
    var Y = R.ref;
    return {
      $$typeof: c,
      type: d,
      key: O,
      ref: Y !== void 0 ? Y : null,
      props: R
    };
  }
  function Xt(d, O) {
    return El(d.type, O, d.props);
  }
  function ct(d) {
    return typeof d == "object" && d !== null && d.$$typeof === c;
  }
  function Yl(d) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(R) {
      return O[R];
    });
  }
  var Ht = /\/+/g;
  function ft(d, O) {
    return typeof d == "object" && d !== null && d.key != null ? Yl("" + d.key) : O.toString(36);
  }
  function Xl(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Dl, Dl) : (d.status = "pending", d.then(
          function(O) {
            d.status === "pending" && (d.status = "fulfilled", d.value = O);
          },
          function(O) {
            d.status === "pending" && (d.status = "rejected", d.reason = O);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function z(d, O, R, Y, Z) {
    var L = typeof d;
    (L === "undefined" || L === "boolean") && (d = null);
    var nl = !1;
    if (d === null) nl = !0;
    else
      switch (L) {
        case "bigint":
        case "string":
        case "number":
          nl = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case c:
            case y:
              nl = !0;
              break;
            case Q:
              return nl = d._init, z(
                nl(d._payload),
                O,
                R,
                Y,
                Z
              );
          }
      }
    if (nl)
      return Z = Z(d), nl = Y === "" ? "." + ft(d, 0) : Y, Kl(Z) ? (R = "", nl != null && (R = nl.replace(Ht, "$&/") + "/"), z(Z, O, R, "", function(ce) {
        return ce;
      })) : Z != null && (ct(Z) && (Z = Xt(
        Z,
        R + (Z.key == null || d && d.key === Z.key ? "" : ("" + Z.key).replace(
          Ht,
          "$&/"
        ) + "/") + nl
      )), O.push(Z)), 1;
    nl = 0;
    var Ql = Y === "" ? "." : Y + ":";
    if (Kl(d))
      for (var I = 0; I < d.length; I++)
        Y = d[I], L = Ql + ft(Y, I), nl += z(
          Y,
          O,
          R,
          L,
          Z
        );
    else if (I = sl(d), typeof I == "function")
      for (d = I.call(d), I = 0; !(Y = d.next()).done; )
        Y = Y.value, L = Ql + ft(Y, I++), nl += z(
          Y,
          O,
          R,
          L,
          Z
        );
    else if (L === "object") {
      if (typeof d.then == "function")
        return z(
          Xl(d),
          O,
          R,
          Y,
          Z
        );
      throw O = String(d), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return nl;
  }
  function U(d, O, R) {
    if (d == null) return d;
    var Y = [], Z = 0;
    return z(d, Y, "", "", function(L) {
      return O.call(R, L, Z++);
    }), Y;
  }
  function K(d) {
    if (d._status === -1) {
      var O = d._result;
      O = O(), O.then(
        function(R) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = R);
        },
        function(R) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = R);
        }
      ), d._status === -1 && (d._status = 0, d._result = O);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var cl = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, N = {
    map: U,
    forEach: function(d, O, R) {
      U(
        d,
        function() {
          O.apply(this, arguments);
        },
        R
      );
    },
    count: function(d) {
      var O = 0;
      return U(d, function() {
        O++;
      }), O;
    },
    toArray: function(d) {
      return U(d, function(O) {
        return O;
      }) || [];
    },
    only: function(d) {
      if (!ct(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return k.Activity = C, k.Children = N, k.Component = xl, k.Fragment = m, k.Profiler = T, k.PureComponent = _l, k.StrictMode = o, k.Suspense = M, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return J.H.useMemoCache(d);
    }
  }, k.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(d, O, R) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Y = il({}, d.props), Z = d.key;
    if (O != null)
      for (L in O.key !== void 0 && (Z = "" + O.key), O)
        !H.call(O, L) || L === "key" || L === "__self" || L === "__source" || L === "ref" && O.ref === void 0 || (Y[L] = O[L]);
    var L = arguments.length - 2;
    if (L === 1) Y.children = R;
    else if (1 < L) {
      for (var nl = Array(L), Ql = 0; Ql < L; Ql++)
        nl[Ql] = arguments[Ql + 2];
      Y.children = nl;
    }
    return El(d.type, Z, Y);
  }, k.createContext = function(d) {
    return d = {
      $$typeof: x,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: D,
      _context: d
    }, d;
  }, k.createElement = function(d, O, R) {
    var Y, Z = {}, L = null;
    if (O != null)
      for (Y in O.key !== void 0 && (L = "" + O.key), O)
        H.call(O, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (Z[Y] = O[Y]);
    var nl = arguments.length - 2;
    if (nl === 1) Z.children = R;
    else if (1 < nl) {
      for (var Ql = Array(nl), I = 0; I < nl; I++)
        Ql[I] = arguments[I + 2];
      Z.children = Ql;
    }
    if (d && d.defaultProps)
      for (Y in nl = d.defaultProps, nl)
        Z[Y] === void 0 && (Z[Y] = nl[Y]);
    return El(d, L, Z);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(d) {
    return { $$typeof: q, render: d };
  }, k.isValidElement = ct, k.lazy = function(d) {
    return {
      $$typeof: Q,
      _payload: { _status: -1, _result: d },
      _init: K
    };
  }, k.memo = function(d, O) {
    return {
      $$typeof: v,
      type: d,
      compare: O === void 0 ? null : O
    };
  }, k.startTransition = function(d) {
    var O = J.T, R = {};
    J.T = R;
    try {
      var Y = d(), Z = J.S;
      Z !== null && Z(R, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(Dl, cl);
    } catch (L) {
      cl(L);
    } finally {
      O !== null && R.types !== null && (O.types = R.types), J.T = O;
    }
  }, k.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, k.use = function(d) {
    return J.H.use(d);
  }, k.useActionState = function(d, O, R) {
    return J.H.useActionState(d, O, R);
  }, k.useCallback = function(d, O) {
    return J.H.useCallback(d, O);
  }, k.useContext = function(d) {
    return J.H.useContext(d);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(d, O) {
    return J.H.useDeferredValue(d, O);
  }, k.useEffect = function(d, O) {
    return J.H.useEffect(d, O);
  }, k.useEffectEvent = function(d) {
    return J.H.useEffectEvent(d);
  }, k.useId = function() {
    return J.H.useId();
  }, k.useImperativeHandle = function(d, O, R) {
    return J.H.useImperativeHandle(d, O, R);
  }, k.useInsertionEffect = function(d, O) {
    return J.H.useInsertionEffect(d, O);
  }, k.useLayoutEffect = function(d, O) {
    return J.H.useLayoutEffect(d, O);
  }, k.useMemo = function(d, O) {
    return J.H.useMemo(d, O);
  }, k.useOptimistic = function(d, O) {
    return J.H.useOptimistic(d, O);
  }, k.useReducer = function(d, O, R) {
    return J.H.useReducer(d, O, R);
  }, k.useRef = function(d) {
    return J.H.useRef(d);
  }, k.useState = function(d) {
    return J.H.useState(d);
  }, k.useSyncExternalStore = function(d, O, R) {
    return J.H.useSyncExternalStore(
      d,
      O,
      R
    );
  }, k.useTransition = function() {
    return J.H.useTransition();
  }, k.version = "19.2.8", k;
}
var Vd;
function Cf() {
  return Vd || (Vd = 1, Mf.exports = av()), Mf.exports;
}
var xf = { exports: {} }, Il = {};
var Ld;
function nv() {
  if (Ld) return Il;
  Ld = 1;
  var c = Cf();
  function y(M) {
    var v = "https://react.dev/errors/" + M;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Q = 2; Q < arguments.length; Q++)
        v += "&args[]=" + encodeURIComponent(arguments[Q]);
    }
    return "Minified React error #" + M + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m() {
  }
  var o = {
    d: {
      f: m,
      r: function() {
        throw Error(y(522));
      },
      D: m,
      C: m,
      L: m,
      m,
      X: m,
      S: m,
      M: m
    },
    p: 0,
    findDOMNode: null
  }, T = /* @__PURE__ */ Symbol.for("react.portal");
  function D(M, v, Q) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: T,
      key: C == null ? null : "" + C,
      children: M,
      containerInfo: v,
      implementation: Q
    };
  }
  var x = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(M, v) {
    if (M === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Il.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Il.createPortal = function(M, v) {
    var Q = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(y(299));
    return D(M, v, null, Q);
  }, Il.flushSync = function(M) {
    var v = x.T, Q = o.p;
    try {
      if (x.T = null, o.p = 2, M) return M();
    } finally {
      x.T = v, o.p = Q, o.d.f();
    }
  }, Il.preconnect = function(M, v) {
    typeof M == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, o.d.C(M, v));
  }, Il.prefetchDNS = function(M) {
    typeof M == "string" && o.d.D(M);
  }, Il.preinit = function(M, v) {
    if (typeof M == "string" && v && typeof v.as == "string") {
      var Q = v.as, C = q(Q, v.crossOrigin), W = typeof v.integrity == "string" ? v.integrity : void 0, sl = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      Q === "style" ? o.d.S(
        M,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: C,
          integrity: W,
          fetchPriority: sl
        }
      ) : Q === "script" && o.d.X(M, {
        crossOrigin: C,
        integrity: W,
        fetchPriority: sl,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Il.preinitModule = function(M, v) {
    if (typeof M == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var Q = q(
            v.as,
            v.crossOrigin
          );
          o.d.M(M, {
            crossOrigin: Q,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && o.d.M(M);
  }, Il.preload = function(M, v) {
    if (typeof M == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var Q = v.as, C = q(Q, v.crossOrigin);
      o.d.L(M, Q, {
        crossOrigin: C,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Il.preloadModule = function(M, v) {
    if (typeof M == "string")
      if (v) {
        var Q = q(v.as, v.crossOrigin);
        o.d.m(M, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: Q,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else o.d.m(M);
  }, Il.requestFormReset = function(M) {
    o.d.r(M);
  }, Il.unstable_batchedUpdates = function(M, v) {
    return M(v);
  }, Il.useFormState = function(M, v, Q) {
    return x.H.useFormState(M, v, Q);
  }, Il.useFormStatus = function() {
    return x.H.useHostTransitionStatus();
  }, Il.version = "19.2.8", Il;
}
var Kd;
function uv() {
  if (Kd) return xf.exports;
  Kd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), xf.exports = nv(), xf.exports;
}
var wd;
function iv() {
  if (wd) return Bn;
  wd = 1;
  var c = ev(), y = Cf(), m = uv();
  function o(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function T(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function D(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function x(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function q(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function M(l) {
    if (D(l) !== l)
      throw Error(o(188));
  }
  function v(l) {
    var t = l.alternate;
    if (!t) {
      if (t = D(l), t === null) throw Error(o(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return M(n), l;
          if (u === a) return M(n), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, f = n.child; f; ) {
          if (f === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (f === a) {
            i = !0, a = n, e = u;
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = u.child; f; ) {
            if (f === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (f === a) {
              i = !0, a = u, e = n;
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(o(189));
        }
      }
      if (e.alternate !== a) throw Error(o(190));
    }
    if (e.tag !== 3) throw Error(o(188));
    return e.stateNode.current === e ? l : t;
  }
  function Q(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = Q(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var C = Object.assign, W = /* @__PURE__ */ Symbol.for("react.element"), sl = /* @__PURE__ */ Symbol.for("react.transitional.element"), gl = /* @__PURE__ */ Symbol.for("react.portal"), il = /* @__PURE__ */ Symbol.for("react.fragment"), pl = /* @__PURE__ */ Symbol.for("react.strict_mode"), xl = /* @__PURE__ */ Symbol.for("react.profiler"), Al = /* @__PURE__ */ Symbol.for("react.consumer"), _l = /* @__PURE__ */ Symbol.for("react.context"), Bl = /* @__PURE__ */ Symbol.for("react.forward_ref"), Kl = /* @__PURE__ */ Symbol.for("react.suspense"), Dl = /* @__PURE__ */ Symbol.for("react.suspense_list"), J = /* @__PURE__ */ Symbol.for("react.memo"), H = /* @__PURE__ */ Symbol.for("react.lazy"), El = /* @__PURE__ */ Symbol.for("react.activity"), Xt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ct = Symbol.iterator;
  function Yl(l) {
    return l === null || typeof l != "object" ? null : (l = ct && l[ct] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ht = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ft(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ht ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case il:
        return "Fragment";
      case xl:
        return "Profiler";
      case pl:
        return "StrictMode";
      case Kl:
        return "Suspense";
      case Dl:
        return "SuspenseList";
      case El:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case gl:
          return "Portal";
        case _l:
          return l.displayName || "Context";
        case Al:
          return (l._context.displayName || "Context") + ".Consumer";
        case Bl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case J:
          return t = l.displayName || null, t !== null ? t : ft(l.type) || "Memo";
        case H:
          t = l._payload, l = l._init;
          try {
            return ft(l(t));
          } catch {
          }
      }
    return null;
  }
  var Xl = Array.isArray, z = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, cl = [], N = -1;
  function d(l) {
    return { current: l };
  }
  function O(l) {
    0 > N || (l.current = cl[N], cl[N] = null, N--);
  }
  function R(l, t) {
    N++, cl[N] = l.current, l.current = t;
  }
  var Y = d(null), Z = d(null), L = d(null), nl = d(null);
  function Ql(l, t) {
    switch (R(L, t), R(Z, l), R(Y, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? cd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = cd(t), l = fd(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    O(Y), R(Y, l);
  }
  function I() {
    O(Y), O(Z), O(L);
  }
  function ce(l) {
    l.memoizedState !== null && R(nl, l);
    var t = Y.current, e = fd(t, l.type);
    t !== e && (R(Z, l), R(Y, e));
  }
  function Qt(l) {
    Z.current === l && (O(Y), O(Z)), nl.current === l && (O(nl), Nn._currentValue = K);
  }
  var fe, aa;
  function pt(l) {
    if (fe === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        fe = t && t[1] || "", aa = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + fe + l + aa;
  }
  var ui = !1;
  function ii(l, t) {
    if (!l || ui) return "";
    ui = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var _ = function() {
                throw Error();
              };
              if (Object.defineProperty(_.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(_, []);
                } catch (S) {
                  var p = S;
                }
                Reflect.construct(l, [], _);
              } else {
                try {
                  _.call();
                } catch (S) {
                  p = S;
                }
                l.call(_.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                p = S;
              }
              (_ = l()) && typeof _.catch == "function" && _.catch(function() {
              });
            }
          } catch (S) {
            if (S && p && typeof S.stack == "string")
              return [S.stack, p.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], f = u[1];
      if (i && f) {
        var s = i.split(`
`), b = f.split(`
`);
        for (n = a = 0; a < s.length && !s[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === s.length || n === b.length)
          for (a = s.length - 1, n = b.length - 1; 1 <= a && 0 <= n && s[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (s[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || s[a] !== b[n]) {
                  var E = `
` + s[a].replace(" at new ", " at ");
                  return l.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", l.displayName)), E;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ui = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? pt(e) : "";
  }
  function xm(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return pt(l.type);
      case 16:
        return pt("Lazy");
      case 13:
        return l.child !== t && t !== null ? pt("Suspense Fallback") : pt("Suspense");
      case 19:
        return pt("SuspenseList");
      case 0:
      case 15:
        return ii(l.type, !1);
      case 11:
        return ii(l.type.render, !1);
      case 1:
        return ii(l.type, !0);
      case 31:
        return pt("Activity");
      default:
        return "";
    }
  }
  function Yf(l) {
    try {
      var t = "", e = null;
      do
        t += xm(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ci = Object.prototype.hasOwnProperty, fi = c.unstable_scheduleCallback, oi = c.unstable_cancelCallback, Dm = c.unstable_shouldYield, Um = c.unstable_requestPaint, ot = c.unstable_now, Nm = c.unstable_getCurrentPriorityLevel, jf = c.unstable_ImmediatePriority, Gf = c.unstable_UserBlockingPriority, jn = c.unstable_NormalPriority, Rm = c.unstable_LowPriority, Xf = c.unstable_IdlePriority, Cm = c.log, Hm = c.unstable_setDisableYieldValue, Za = null, st = null;
  function oe(l) {
    if (typeof Cm == "function" && Hm(l), st && typeof st.setStrictMode == "function")
      try {
        st.setStrictMode(Za, l);
      } catch {
      }
  }
  var rt = Math.clz32 ? Math.clz32 : Ym, qm = Math.log, Bm = Math.LN2;
  function Ym(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (qm(l) / Bm | 0) | 0;
  }
  var Gn = 256, Xn = 262144, Qn = 4194304;
  function Be(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Zn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Be(a) : (i &= f, i !== 0 ? n = Be(i) : e || (e = f & ~l, e !== 0 && (n = Be(e))))) : (f = a & ~u, f !== 0 ? n = Be(f) : i !== 0 ? n = Be(i) : e || (e = a & ~l, e !== 0 && (n = Be(e)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, e = t & -t, u >= e || u === 32 && (e & 4194048) !== 0) ? t : n;
  }
  function Va(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function jm(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Qf() {
    var l = Qn;
    return Qn <<= 1, (Qn & 62914560) === 0 && (Qn = 4194304), l;
  }
  function si(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function La(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Gm(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var f = l.entanglements, s = l.expirationTimes, b = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var E = 31 - rt(e), _ = 1 << E;
      f[E] = 0, s[E] = -1;
      var p = b[E];
      if (p !== null)
        for (b[E] = null, E = 0; E < p.length; E++) {
          var S = p[E];
          S !== null && (S.lane &= -536870913);
        }
      e &= ~_;
    }
    a !== 0 && Zf(l, a, 0), u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t));
  }
  function Zf(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - rt(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function Vf(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - rt(e), n = 1 << a;
      n & t | l[a] & t && (l[a] |= t), e &= ~n;
    }
  }
  function Lf(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : ri(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function ri(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function di(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Kf() {
    var l = U.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Nd(l.type));
  }
  function wf(l, t) {
    var e = U.p;
    try {
      return U.p = l, t();
    } finally {
      U.p = e;
    }
  }
  var se = Math.random().toString(36).slice(2), wl = "__reactFiber$" + se, lt = "__reactProps$" + se, na = "__reactContainer$" + se, mi = "__reactEvents$" + se, Xm = "__reactListeners$" + se, Qm = "__reactHandles$" + se, Jf = "__reactResources$" + se, Ka = "__reactMarker$" + se;
  function yi(l) {
    delete l[wl], delete l[lt], delete l[mi], delete l[Xm], delete l[Qm];
  }
  function ua(l) {
    var t = l[wl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[na] || e[wl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = hd(l); l !== null; ) {
            if (e = l[wl]) return e;
            l = hd(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function ia(l) {
    if (l = l[wl] || l[na]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function wa(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(o(33));
  }
  function ca(l) {
    var t = l[Jf];
    return t || (t = l[Jf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Zl(l) {
    l[Ka] = !0;
  }
  var kf = /* @__PURE__ */ new Set(), Wf = {};
  function Ye(l, t) {
    fa(l, t), fa(l + "Capture", t);
  }
  function fa(l, t) {
    for (Wf[l] = t, l = 0; l < t.length; l++)
      kf.add(t[l]);
  }
  var Zm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), $f = {}, Ff = {};
  function Vm(l) {
    return ci.call(Ff, l) ? !0 : ci.call($f, l) ? !1 : Zm.test(l) ? Ff[l] = !0 : ($f[l] = !0, !1);
  }
  function Vn(l, t, e) {
    if (Vm(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Ln(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Zt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function St(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function If(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Lm(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function hi(l) {
    if (!l._valueTracker) {
      var t = If(l) ? "checked" : "value";
      l._valueTracker = Lm(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Pf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = If(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function Kn(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Km = /[\n"\\]/g;
  function zt(l) {
    return l.replace(
      Km,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function vi(l, t, e, a, n, u, i, f) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + St(t)) : l.value !== "" + St(t) && (l.value = "" + St(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? gi(l, i, St(t)) : e != null ? gi(l, i, St(e)) : a != null && l.removeAttribute("value"), n == null && u != null && (l.defaultChecked = !!u), n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.name = "" + St(f) : l.removeAttribute("name");
  }
  function lo(l, t, e, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (l.type = u), t != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        hi(l);
        return;
      }
      e = e != null ? "" + St(e) : "", t = t != null ? "" + St(t) : e, f || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = f ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), hi(l);
  }
  function gi(l, t, e) {
    t === "number" && Kn(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function oa(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var n = 0; n < e.length; n++)
        t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        n = t.hasOwnProperty("$" + l[e].value), l[e].selected !== n && (l[e].selected = n), n && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + St(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          l[n].selected = !0, a && (l[n].defaultSelected = !0);
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function to(l, t, e) {
    if (t != null && (t = "" + St(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + St(e) : "";
  }
  function eo(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(o(92));
        if (Xl(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = St(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), hi(l);
  }
  function sa(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var wm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ao(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || wm.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function no(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var n in t)
        a = t[n], t.hasOwnProperty(n) && e[n] !== a && ao(l, n, a);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && ao(l, u, t[u]);
  }
  function bi(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jm = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), km = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function wn(l) {
    return km.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Vt() {
  }
  var pi = null;
  function Si(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var ra = null, da = null;
  function uo(l) {
    var t = ia(l);
    if (t && (l = t.stateNode)) {
      var e = l[lt] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (vi(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + zt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var n = a[lt] || null;
                if (!n) throw Error(o(90));
                vi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && Pf(a);
          }
          break l;
        case "textarea":
          to(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && oa(l, !!e.multiple, t, !1);
      }
    }
  }
  var zi = !1;
  function io(l, t, e) {
    if (zi) return l(t, e);
    zi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (zi = !1, (ra !== null || da !== null) && (Cu(), ra && (t = ra, l = da, da = ra = null, uo(t), l)))
        for (t = 0; t < l.length; t++) uo(l[t]);
    }
  }
  function Ja(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[lt] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        o(231, t, typeof e)
      );
    return e;
  }
  var Lt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ei = !1;
  if (Lt)
    try {
      var ka = {};
      Object.defineProperty(ka, "passive", {
        get: function() {
          Ei = !0;
        }
      }), window.addEventListener("test", ka, ka), window.removeEventListener("test", ka, ka);
    } catch {
      Ei = !1;
    }
  var re = null, Ti = null, Jn = null;
  function co() {
    if (Jn) return Jn;
    var l, t = Ti, e = t.length, a, n = "value" in re ? re.value : re.textContent, u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++) ;
    return Jn = n.slice(l, 1 < a ? 1 - a : void 0);
  }
  function kn(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Wn() {
    return !0;
  }
  function fo() {
    return !1;
  }
  function tt(l) {
    function t(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in l)
        l.hasOwnProperty(f) && (e = l[f], this[f] = e ? e(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Wn : fo, this.isPropagationStopped = fo, this;
    }
    return C(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Wn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Wn);
      },
      persist: function() {
      },
      isPersistent: Wn
    }), t;
  }
  var je = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, $n = tt(je), Wa = C({}, je, { view: 0, detail: 0 }), Wm = tt(Wa), Ai, _i, $a, Fn = C({}, Wa, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Mi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== $a && ($a && l.type === "mousemove" ? (Ai = l.screenX - $a.screenX, _i = l.screenY - $a.screenY) : _i = Ai = 0, $a = l), Ai);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : _i;
    }
  }), oo = tt(Fn), $m = C({}, Fn, { dataTransfer: 0 }), Fm = tt($m), Im = C({}, Wa, { relatedTarget: 0 }), Oi = tt(Im), Pm = C({}, je, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ly = tt(Pm), ty = C({}, je, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), ey = tt(ty), ay = C({}, je, { data: 0 }), so = tt(ay), ny = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, uy = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, iy = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function cy(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = iy[l]) ? !!t[l] : !1;
  }
  function Mi() {
    return cy;
  }
  var fy = C({}, Wa, {
    key: function(l) {
      if (l.key) {
        var t = ny[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = kn(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? uy[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Mi,
    charCode: function(l) {
      return l.type === "keypress" ? kn(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? kn(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), oy = tt(fy), sy = C({}, Fn, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), ro = tt(sy), ry = C({}, Wa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Mi
  }), dy = tt(ry), my = C({}, je, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yy = tt(my), hy = C({}, Fn, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), vy = tt(hy), gy = C({}, je, {
    newState: 0,
    oldState: 0
  }), by = tt(gy), py = [9, 13, 27, 32], xi = Lt && "CompositionEvent" in window, Fa = null;
  Lt && "documentMode" in document && (Fa = document.documentMode);
  var Sy = Lt && "TextEvent" in window && !Fa, mo = Lt && (!xi || Fa && 8 < Fa && 11 >= Fa), yo = " ", ho = !1;
  function vo(l, t) {
    switch (l) {
      case "keyup":
        return py.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function go(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var ma = !1;
  function zy(l, t) {
    switch (l) {
      case "compositionend":
        return go(t);
      case "keypress":
        return t.which !== 32 ? null : (ho = !0, yo);
      case "textInput":
        return l = t.data, l === yo && ho ? null : l;
      default:
        return null;
    }
  }
  function Ey(l, t) {
    if (ma)
      return l === "compositionend" || !xi && vo(l, t) ? (l = co(), Jn = Ti = re = null, ma = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return mo && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ty = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function bo(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Ty[l.type] : t === "textarea";
  }
  function po(l, t, e, a) {
    ra ? da ? da.push(a) : da = [a] : ra = a, t = Xu(t, "onChange"), 0 < t.length && (e = new $n(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Ia = null, Pa = null;
  function Ay(l) {
    td(l, 0);
  }
  function In(l) {
    var t = wa(l);
    if (Pf(t)) return l;
  }
  function So(l, t) {
    if (l === "change") return t;
  }
  var zo = !1;
  if (Lt) {
    var Di;
    if (Lt) {
      var Ui = "oninput" in document;
      if (!Ui) {
        var Eo = document.createElement("div");
        Eo.setAttribute("oninput", "return;"), Ui = typeof Eo.oninput == "function";
      }
      Di = Ui;
    } else Di = !1;
    zo = Di && (!document.documentMode || 9 < document.documentMode);
  }
  function To() {
    Ia && (Ia.detachEvent("onpropertychange", Ao), Pa = Ia = null);
  }
  function Ao(l) {
    if (l.propertyName === "value" && In(Pa)) {
      var t = [];
      po(
        t,
        Pa,
        l,
        Si(l)
      ), io(Ay, t);
    }
  }
  function _y(l, t, e) {
    l === "focusin" ? (To(), Ia = t, Pa = e, Ia.attachEvent("onpropertychange", Ao)) : l === "focusout" && To();
  }
  function Oy(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return In(Pa);
  }
  function My(l, t) {
    if (l === "click") return In(t);
  }
  function xy(l, t) {
    if (l === "input" || l === "change")
      return In(t);
  }
  function Dy(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var dt = typeof Object.is == "function" ? Object.is : Dy;
  function ln(l, t) {
    if (dt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!ci.call(t, n) || !dt(l[n], t[n]))
        return !1;
    }
    return !0;
  }
  function _o(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Oo(l, t) {
    var e = _o(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = _o(e);
    }
  }
  function Mo(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Mo(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function xo(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Kn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Kn(l.document);
    }
    return t;
  }
  function Ni(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Uy = Lt && "documentMode" in document && 11 >= document.documentMode, ya = null, Ri = null, tn = null, Ci = !1;
  function Do(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ci || ya == null || ya !== Kn(a) || (a = ya, "selectionStart" in a && Ni(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), tn && ln(tn, a) || (tn = a, a = Xu(Ri, "onSelect"), 0 < a.length && (t = new $n(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = ya)));
  }
  function Ge(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var ha = {
    animationend: Ge("Animation", "AnimationEnd"),
    animationiteration: Ge("Animation", "AnimationIteration"),
    animationstart: Ge("Animation", "AnimationStart"),
    transitionrun: Ge("Transition", "TransitionRun"),
    transitionstart: Ge("Transition", "TransitionStart"),
    transitioncancel: Ge("Transition", "TransitionCancel"),
    transitionend: Ge("Transition", "TransitionEnd")
  }, Hi = {}, Uo = {};
  Lt && (Uo = document.createElement("div").style, "AnimationEvent" in window || (delete ha.animationend.animation, delete ha.animationiteration.animation, delete ha.animationstart.animation), "TransitionEvent" in window || delete ha.transitionend.transition);
  function Xe(l) {
    if (Hi[l]) return Hi[l];
    if (!ha[l]) return l;
    var t = ha[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in Uo)
        return Hi[l] = t[e];
    return l;
  }
  var No = Xe("animationend"), Ro = Xe("animationiteration"), Co = Xe("animationstart"), Ny = Xe("transitionrun"), Ry = Xe("transitionstart"), Cy = Xe("transitioncancel"), Ho = Xe("transitionend"), qo = /* @__PURE__ */ new Map(), qi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  qi.push("scrollEnd");
  function Ut(l, t) {
    qo.set(l, t), Ye(t, [l]);
  }
  var Pn = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, Et = [], va = 0, Bi = 0;
  function lu() {
    for (var l = va, t = Bi = va = 0; t < l; ) {
      var e = Et[t];
      Et[t++] = null;
      var a = Et[t];
      Et[t++] = null;
      var n = Et[t];
      Et[t++] = null;
      var u = Et[t];
      if (Et[t++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && Bo(e, n, u);
    }
  }
  function tu(l, t, e, a) {
    Et[va++] = l, Et[va++] = t, Et[va++] = e, Et[va++] = a, Bi |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function Yi(l, t, e, a) {
    return tu(l, t, e, a), eu(l);
  }
  function Qe(l, t) {
    return tu(l, null, null, t), eu(l);
  }
  function Bo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (l = u.stateNode, l === null || l._visibility & 1 || (n = !0)), l = u, u = u.return;
    return l.tag === 3 ? (u = l.stateNode, n && t !== null && (n = 31 - rt(e), l = u.hiddenUpdates, a = l[n], a === null ? l[n] = [t] : a.push(t), t.lane = e | 536870912), u) : null;
  }
  function eu(l) {
    if (50 < An)
      throw An = 0, wc = null, Error(o(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ga = {};
  function Hy(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function mt(l, t, e, a) {
    return new Hy(l, t, e, a);
  }
  function ji(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Kt(l, t) {
    var e = l.alternate;
    return e === null ? (e = mt(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function Yo(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function au(l, t, e, a, n, u) {
    var i = 0;
    if (a = l, typeof l == "function") ji(l) && (i = 1);
    else if (typeof l == "string")
      i = Gh(
        l,
        e,
        Y.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case El:
          return l = mt(31, e, t, n), l.elementType = El, l.lanes = u, l;
        case il:
          return Ze(e.children, n, u, t);
        case pl:
          i = 8, n |= 24;
          break;
        case xl:
          return l = mt(12, e, t, n | 2), l.elementType = xl, l.lanes = u, l;
        case Kl:
          return l = mt(13, e, t, n), l.elementType = Kl, l.lanes = u, l;
        case Dl:
          return l = mt(19, e, t, n), l.elementType = Dl, l.lanes = u, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case _l:
                i = 10;
                break l;
              case Al:
                i = 9;
                break l;
              case Bl:
                i = 11;
                break l;
              case J:
                i = 14;
                break l;
              case H:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            o(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = mt(i, e, t, n), t.elementType = l, t.type = a, t.lanes = u, t;
  }
  function Ze(l, t, e, a) {
    return l = mt(7, l, a, t), l.lanes = e, l;
  }
  function Gi(l, t, e) {
    return l = mt(6, l, null, t), l.lanes = e, l;
  }
  function jo(l) {
    var t = mt(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Xi(l, t, e) {
    return t = mt(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var Go = /* @__PURE__ */ new WeakMap();
  function Tt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = Go.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: Yf(t)
      }, Go.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: Yf(t)
    };
  }
  var ba = [], pa = 0, nu = null, en = 0, At = [], _t = 0, de = null, qt = 1, Bt = "";
  function wt(l, t) {
    ba[pa++] = en, ba[pa++] = nu, nu = l, en = t;
  }
  function Xo(l, t, e) {
    At[_t++] = qt, At[_t++] = Bt, At[_t++] = de, de = l;
    var a = qt;
    l = Bt;
    var n = 32 - rt(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - rt(t) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, qt = 1 << 32 - rt(t) + n | e << n | a, Bt = u + l;
    } else
      qt = 1 << u | e << n | a, Bt = l;
  }
  function Qi(l) {
    l.return !== null && (wt(l, 1), Xo(l, 1, 0));
  }
  function Zi(l) {
    for (; l === nu; )
      nu = ba[--pa], ba[pa] = null, en = ba[--pa], ba[pa] = null;
    for (; l === de; )
      de = At[--_t], At[_t] = null, Bt = At[--_t], At[_t] = null, qt = At[--_t], At[_t] = null;
  }
  function Qo(l, t) {
    At[_t++] = qt, At[_t++] = Bt, At[_t++] = de, qt = t.id, Bt = t.overflow, de = l;
  }
  var Jl = null, Sl = null, ul = !1, me = null, Ot = !1, Vi = Error(o(519));
  function ye(l) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw an(Tt(t, l)), Vi;
  }
  function Zo(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[wl] = l, t[lt] = a, e) {
      case "dialog":
        tl("cancel", t), tl("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        tl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < On.length; e++)
          tl(On[e], t);
        break;
      case "source":
        tl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        tl("error", t), tl("load", t);
        break;
      case "details":
        tl("toggle", t);
        break;
      case "input":
        tl("invalid", t), lo(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        tl("invalid", t);
        break;
      case "textarea":
        tl("invalid", t), eo(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || ud(t.textContent, e) ? (a.popover != null && (tl("beforetoggle", t), tl("toggle", t)), a.onScroll != null && tl("scroll", t), a.onScrollEnd != null && tl("scrollend", t), a.onClick != null && (t.onclick = Vt), t = !0) : t = !1, t || ye(l, !0);
  }
  function Vo(l) {
    for (Jl = l.return; Jl; )
      switch (Jl.tag) {
        case 5:
        case 31:
        case 13:
          Ot = !1;
          return;
        case 27:
        case 3:
          Ot = !0;
          return;
        default:
          Jl = Jl.return;
      }
  }
  function Sa(l) {
    if (l !== Jl) return !1;
    if (!ul) return Vo(l), ul = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || ff(l.type, l.memoizedProps)), e = !e), e && Sl && ye(l), Vo(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Sl = yd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
      Sl = yd(l);
    } else
      t === 27 ? (t = Sl, xe(l.type) ? (l = mf, mf = null, Sl = l) : Sl = t) : Sl = Jl ? xt(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ve() {
    Sl = Jl = null, ul = !1;
  }
  function Li() {
    var l = me;
    return l !== null && (ut === null ? ut = l : ut.push.apply(
      ut,
      l
    ), me = null), l;
  }
  function an(l) {
    me === null ? me = [l] : me.push(l);
  }
  var Ki = d(null), Le = null, Jt = null;
  function he(l, t, e) {
    R(Ki, t._currentValue), t._currentValue = e;
  }
  function kt(l) {
    l._currentValue = Ki.current, O(Ki);
  }
  function wi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Ji(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var s = 0; s < t.length; s++)
            if (f.context === t[s]) {
              u.lanes |= e, f = u.alternate, f !== null && (f.lanes |= e), wi(
                u.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          u = f.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(o(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), wi(i, e, l), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function za(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var f = n.type;
          dt(n.pendingProps.value, i.value) || (l !== null ? l.push(f) : l = [f]);
        }
      } else if (n === nl.current) {
        if (i = n.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (l !== null ? l.push(Nn) : l = [Nn]);
      }
      n = n.return;
    }
    l !== null && Ji(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function uu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!dt(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ke(l) {
    Le = l, Jt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function kl(l) {
    return Lo(Le, l);
  }
  function iu(l, t) {
    return Le === null && Ke(l), Lo(l, t);
  }
  function Lo(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Jt === null) {
      if (l === null) throw Error(o(308));
      Jt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Jt = Jt.next = t;
    return e;
  }
  var qy = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, By = c.unstable_scheduleCallback, Yy = c.unstable_NormalPriority, Rl = {
    $$typeof: _l,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ki() {
    return {
      controller: new qy(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function nn(l) {
    l.refCount--, l.refCount === 0 && By(Yy, function() {
      l.controller.abort();
    });
  }
  var un = null, Wi = 0, Ea = 0, Ta = null;
  function jy(l, t) {
    if (un === null) {
      var e = un = [];
      Wi = 0, Ea = Ic(), Ta = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Wi++, t.then(Ko, Ko), t;
  }
  function Ko() {
    if (--Wi === 0 && un !== null) {
      Ta !== null && (Ta.status = "fulfilled");
      var l = un;
      un = null, Ea = 0, Ta = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Gy(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var n = 0; n < e.length; n++) (0, e[n])(t);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var wo = z.S;
  z.S = function(l, t) {
    Dr = ot(), typeof t == "object" && t !== null && typeof t.then == "function" && jy(l, t), wo !== null && wo(l, t);
  };
  var we = d(null);
  function $i() {
    var l = we.current;
    return l !== null ? l : bl.pooledCache;
  }
  function cu(l, t) {
    t === null ? R(we, we.current) : R(we, t.pool);
  }
  function Jo() {
    var l = $i();
    return l === null ? null : { parent: Rl._currentValue, pool: l };
  }
  var Aa = Error(o(460)), Fi = Error(o(474)), fu = Error(o(542)), ou = { then: function() {
  } };
  function ko(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Wo(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Vt, Vt), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Fo(l), l;
      default:
        if (typeof t.status == "string") t.then(Vt, Vt);
        else {
          if (l = bl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(o(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Fo(l), l;
        }
        throw ke = t, Aa;
    }
  }
  function Je(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ke = e, Aa) : e;
    }
  }
  var ke = null;
  function $o() {
    if (ke === null) throw Error(o(459));
    var l = ke;
    return ke = null, l;
  }
  function Fo(l) {
    if (l === Aa || l === fu)
      throw Error(o(483));
  }
  var _a = null, cn = 0;
  function su(l) {
    var t = cn;
    return cn += 1, _a === null && (_a = []), Wo(_a, l, t);
  }
  function fn(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function ru(l, t) {
    throw t.$$typeof === W ? Error(o(525)) : (l = Object.prototype.toString.call(t), Error(
      o(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Io(l) {
    function t(h, r) {
      if (l) {
        var g = h.deletions;
        g === null ? (h.deletions = [r], h.flags |= 16) : g.push(r);
      }
    }
    function e(h, r) {
      if (!l) return null;
      for (; r !== null; )
        t(h, r), r = r.sibling;
      return null;
    }
    function a(h) {
      for (var r = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? r.set(h.key, h) : r.set(h.index, h), h = h.sibling;
      return r;
    }
    function n(h, r) {
      return h = Kt(h, r), h.index = 0, h.sibling = null, h;
    }
    function u(h, r, g) {
      return h.index = g, l ? (g = h.alternate, g !== null ? (g = g.index, g < r ? (h.flags |= 67108866, r) : g) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function f(h, r, g, A) {
      return r === null || r.tag !== 6 ? (r = Gi(g, h.mode, A), r.return = h, r) : (r = n(r, g), r.return = h, r);
    }
    function s(h, r, g, A) {
      var V = g.type;
      return V === il ? E(
        h,
        r,
        g.props.children,
        A,
        g.key
      ) : r !== null && (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === H && Je(V) === r.type) ? (r = n(r, g.props), fn(r, g), r.return = h, r) : (r = au(
        g.type,
        g.key,
        g.props,
        null,
        h.mode,
        A
      ), fn(r, g), r.return = h, r);
    }
    function b(h, r, g, A) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== g.containerInfo || r.stateNode.implementation !== g.implementation ? (r = Xi(g, h.mode, A), r.return = h, r) : (r = n(r, g.children || []), r.return = h, r);
    }
    function E(h, r, g, A, V) {
      return r === null || r.tag !== 7 ? (r = Ze(
        g,
        h.mode,
        A,
        V
      ), r.return = h, r) : (r = n(r, g), r.return = h, r);
    }
    function _(h, r, g) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = Gi(
          "" + r,
          h.mode,
          g
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case sl:
            return g = au(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              g
            ), fn(g, r), g.return = h, g;
          case gl:
            return r = Xi(
              r,
              h.mode,
              g
            ), r.return = h, r;
          case H:
            return r = Je(r), _(h, r, g);
        }
        if (Xl(r) || Yl(r))
          return r = Ze(
            r,
            h.mode,
            g,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return _(h, su(r), g);
        if (r.$$typeof === _l)
          return _(
            h,
            iu(h, r),
            g
          );
        ru(h, r);
      }
      return null;
    }
    function p(h, r, g, A) {
      var V = r !== null ? r.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return V !== null ? null : f(h, r, "" + g, A);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case sl:
            return g.key === V ? s(h, r, g, A) : null;
          case gl:
            return g.key === V ? b(h, r, g, A) : null;
          case H:
            return g = Je(g), p(h, r, g, A);
        }
        if (Xl(g) || Yl(g))
          return V !== null ? null : E(h, r, g, A, null);
        if (typeof g.then == "function")
          return p(
            h,
            r,
            su(g),
            A
          );
        if (g.$$typeof === _l)
          return p(
            h,
            r,
            iu(h, g),
            A
          );
        ru(h, g);
      }
      return null;
    }
    function S(h, r, g, A, V) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return h = h.get(g) || null, f(r, h, "" + A, V);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case sl:
            return h = h.get(
              A.key === null ? g : A.key
            ) || null, s(r, h, A, V);
          case gl:
            return h = h.get(
              A.key === null ? g : A.key
            ) || null, b(r, h, A, V);
          case H:
            return A = Je(A), S(
              h,
              r,
              g,
              A,
              V
            );
        }
        if (Xl(A) || Yl(A))
          return h = h.get(g) || null, E(r, h, A, V, null);
        if (typeof A.then == "function")
          return S(
            h,
            r,
            g,
            su(A),
            V
          );
        if (A.$$typeof === _l)
          return S(
            h,
            r,
            g,
            iu(r, A),
            V
          );
        ru(r, A);
      }
      return null;
    }
    function G(h, r, g, A) {
      for (var V = null, fl = null, X = r, F = r = 0, al = null; X !== null && F < g.length; F++) {
        X.index > F ? (al = X, X = null) : al = X.sibling;
        var ol = p(
          h,
          X,
          g[F],
          A
        );
        if (ol === null) {
          X === null && (X = al);
          break;
        }
        l && X && ol.alternate === null && t(h, X), r = u(ol, r, F), fl === null ? V = ol : fl.sibling = ol, fl = ol, X = al;
      }
      if (F === g.length)
        return e(h, X), ul && wt(h, F), V;
      if (X === null) {
        for (; F < g.length; F++)
          X = _(h, g[F], A), X !== null && (r = u(
            X,
            r,
            F
          ), fl === null ? V = X : fl.sibling = X, fl = X);
        return ul && wt(h, F), V;
      }
      for (X = a(X); F < g.length; F++)
        al = S(
          X,
          h,
          F,
          g[F],
          A
        ), al !== null && (l && al.alternate !== null && X.delete(
          al.key === null ? F : al.key
        ), r = u(
          al,
          r,
          F
        ), fl === null ? V = al : fl.sibling = al, fl = al);
      return l && X.forEach(function(Ce) {
        return t(h, Ce);
      }), ul && wt(h, F), V;
    }
    function w(h, r, g, A) {
      if (g == null) throw Error(o(151));
      for (var V = null, fl = null, X = r, F = r = 0, al = null, ol = g.next(); X !== null && !ol.done; F++, ol = g.next()) {
        X.index > F ? (al = X, X = null) : al = X.sibling;
        var Ce = p(h, X, ol.value, A);
        if (Ce === null) {
          X === null && (X = al);
          break;
        }
        l && X && Ce.alternate === null && t(h, X), r = u(Ce, r, F), fl === null ? V = Ce : fl.sibling = Ce, fl = Ce, X = al;
      }
      if (ol.done)
        return e(h, X), ul && wt(h, F), V;
      if (X === null) {
        for (; !ol.done; F++, ol = g.next())
          ol = _(h, ol.value, A), ol !== null && (r = u(ol, r, F), fl === null ? V = ol : fl.sibling = ol, fl = ol);
        return ul && wt(h, F), V;
      }
      for (X = a(X); !ol.done; F++, ol = g.next())
        ol = S(X, h, F, ol.value, A), ol !== null && (l && ol.alternate !== null && X.delete(ol.key === null ? F : ol.key), r = u(ol, r, F), fl === null ? V = ol : fl.sibling = ol, fl = ol);
      return l && X.forEach(function($h) {
        return t(h, $h);
      }), ul && wt(h, F), V;
    }
    function vl(h, r, g, A) {
      if (typeof g == "object" && g !== null && g.type === il && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case sl:
            l: {
              for (var V = g.key; r !== null; ) {
                if (r.key === V) {
                  if (V = g.type, V === il) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), A = n(
                        r,
                        g.props.children
                      ), A.return = h, h = A;
                      break l;
                    }
                  } else if (r.elementType === V || typeof V == "object" && V !== null && V.$$typeof === H && Je(V) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), A = n(r, g.props), fn(A, g), A.return = h, h = A;
                    break l;
                  }
                  e(h, r);
                  break;
                } else t(h, r);
                r = r.sibling;
              }
              g.type === il ? (A = Ze(
                g.props.children,
                h.mode,
                A,
                g.key
              ), A.return = h, h = A) : (A = au(
                g.type,
                g.key,
                g.props,
                null,
                h.mode,
                A
              ), fn(A, g), A.return = h, h = A);
            }
            return i(h);
          case gl:
            l: {
              for (V = g.key; r !== null; ) {
                if (r.key === V)
                  if (r.tag === 4 && r.stateNode.containerInfo === g.containerInfo && r.stateNode.implementation === g.implementation) {
                    e(
                      h,
                      r.sibling
                    ), A = n(r, g.children || []), A.return = h, h = A;
                    break l;
                  } else {
                    e(h, r);
                    break;
                  }
                else t(h, r);
                r = r.sibling;
              }
              A = Xi(g, h.mode, A), A.return = h, h = A;
            }
            return i(h);
          case H:
            return g = Je(g), vl(
              h,
              r,
              g,
              A
            );
        }
        if (Xl(g))
          return G(
            h,
            r,
            g,
            A
          );
        if (Yl(g)) {
          if (V = Yl(g), typeof V != "function") throw Error(o(150));
          return g = V.call(g), w(
            h,
            r,
            g,
            A
          );
        }
        if (typeof g.then == "function")
          return vl(
            h,
            r,
            su(g),
            A
          );
        if (g.$$typeof === _l)
          return vl(
            h,
            r,
            iu(h, g),
            A
          );
        ru(h, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, r !== null && r.tag === 6 ? (e(h, r.sibling), A = n(r, g), A.return = h, h = A) : (e(h, r), A = Gi(g, h.mode, A), A.return = h, h = A), i(h)) : e(h, r);
    }
    return function(h, r, g, A) {
      try {
        cn = 0;
        var V = vl(
          h,
          r,
          g,
          A
        );
        return _a = null, V;
      } catch (X) {
        if (X === Aa || X === fu) throw X;
        var fl = mt(29, X, null, h.mode);
        return fl.lanes = A, fl.return = h, fl;
      }
    };
  }
  var We = Io(!0), Po = Io(!1), ve = !1;
  function Ii(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Pi(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ge(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function be(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rl & 2) !== 0) {
      var n = a.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = eu(l), Bo(l, null, e), t;
    }
    return tu(l, a, t, e), eu(l);
  }
  function on(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Vf(l, e);
    }
  }
  function lc(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = t : u = u.next = t;
      } else n = u = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var tc = !1;
  function sn() {
    if (tc) {
      var l = Ta;
      if (l !== null) throw l;
    }
  }
  function rn(l, t, e, a) {
    tc = !1;
    var n = l.updateQueue;
    ve = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var s = f, b = s.next;
      s.next = null, i === null ? u = b : i.next = b, i = s;
      var E = l.alternate;
      E !== null && (E = E.updateQueue, f = E.lastBaseUpdate, f !== i && (f === null ? E.firstBaseUpdate = b : f.next = b, E.lastBaseUpdate = s));
    }
    if (u !== null) {
      var _ = n.baseState;
      i = 0, E = b = s = null, f = u;
      do {
        var p = f.lane & -536870913, S = p !== f.lane;
        if (S ? (el & p) === p : (a & p) === p) {
          p !== 0 && p === Ea && (tc = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          l: {
            var G = l, w = f;
            p = t;
            var vl = e;
            switch (w.tag) {
              case 1:
                if (G = w.payload, typeof G == "function") {
                  _ = G.call(vl, _, p);
                  break l;
                }
                _ = G;
                break l;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = w.payload, p = typeof G == "function" ? G.call(vl, _, p) : G, p == null) break l;
                _ = C({}, _, p);
                break l;
              case 2:
                ve = !0;
            }
          }
          p = f.callback, p !== null && (l.flags |= 64, S && (l.flags |= 8192), S = n.callbacks, S === null ? n.callbacks = [p] : S.push(p));
        } else
          S = {
            lane: p,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, E === null ? (b = E = S, s = _) : E = E.next = S, i |= p;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          S = f, f = S.next, S.next = null, n.lastBaseUpdate = S, n.shared.pending = null;
        }
      } while (!0);
      E === null && (s = _), n.baseState = s, n.firstBaseUpdate = b, n.lastBaseUpdate = E, u === null && (n.shared.lanes = 0), Te |= i, l.lanes = i, l.memoizedState = _;
    }
  }
  function ls(l, t) {
    if (typeof l != "function")
      throw Error(o(191, l));
    l.call(t);
  }
  function ts(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        ls(e[l], t);
  }
  var Oa = d(null), du = d(0);
  function es(l, t) {
    l = ae, R(du, l), R(Oa, t), ae = l | t.baseLanes;
  }
  function ec() {
    R(du, ae), R(Oa, Oa.current);
  }
  function ac() {
    ae = du.current, O(Oa), O(du);
  }
  var yt = d(null), Mt = null;
  function pe(l) {
    var t = l.alternate;
    R(Ul, Ul.current & 1), R(yt, l), Mt === null && (t === null || Oa.current !== null || t.memoizedState !== null) && (Mt = l);
  }
  function nc(l) {
    R(Ul, Ul.current), R(yt, l), Mt === null && (Mt = l);
  }
  function as(l) {
    l.tag === 22 ? (R(Ul, Ul.current), R(yt, l), Mt === null && (Mt = l)) : Se();
  }
  function Se() {
    R(Ul, Ul.current), R(yt, yt.current);
  }
  function ht(l) {
    O(yt), Mt === l && (Mt = null), O(Ul);
  }
  var Ul = d(0);
  function mu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || rf(e) || df(e)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Wt = 0, $ = null, yl = null, Cl = null, yu = !1, Ma = !1, $e = !1, hu = 0, dn = 0, xa = null, Xy = 0;
  function Ol() {
    throw Error(o(321));
  }
  function uc(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!dt(l[e], t[e])) return !1;
    return !0;
  }
  function ic(l, t, e, a, n, u) {
    return Wt = u, $ = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, z.H = l === null || l.memoizedState === null ? Xs : zc, $e = !1, u = e(a, n), $e = !1, Ma && (u = us(
      t,
      e,
      a,
      n
    )), ns(l), u;
  }
  function ns(l) {
    z.H = hn;
    var t = yl !== null && yl.next !== null;
    if (Wt = 0, Cl = yl = $ = null, yu = !1, dn = 0, xa = null, t) throw Error(o(300));
    l === null || Hl || (l = l.dependencies, l !== null && uu(l) && (Hl = !0));
  }
  function us(l, t, e, a) {
    $ = l;
    var n = 0;
    do {
      if (Ma && (xa = null), dn = 0, Ma = !1, 25 <= n) throw Error(o(301));
      if (n += 1, Cl = yl = null, l.updateQueue != null) {
        var u = l.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      z.H = Qs, u = t(e, a);
    } while (Ma);
    return u;
  }
  function Qy() {
    var l = z.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? mn(t) : t, l = l.useState()[0], (yl !== null ? yl.memoizedState : null) !== l && ($.flags |= 1024), t;
  }
  function cc() {
    var l = hu !== 0;
    return hu = 0, l;
  }
  function fc(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function oc(l) {
    if (yu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      yu = !1;
    }
    Wt = 0, Cl = yl = $ = null, Ma = !1, dn = hu = 0, xa = null;
  }
  function Pl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Cl === null ? $.memoizedState = Cl = l : Cl = Cl.next = l, Cl;
  }
  function Nl() {
    if (yl === null) {
      var l = $.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = yl.next;
    var t = Cl === null ? $.memoizedState : Cl.next;
    if (t !== null)
      Cl = t, yl = l;
    else {
      if (l === null)
        throw $.alternate === null ? Error(o(467)) : Error(o(310));
      yl = l, l = {
        memoizedState: yl.memoizedState,
        baseState: yl.baseState,
        baseQueue: yl.baseQueue,
        queue: yl.queue,
        next: null
      }, Cl === null ? $.memoizedState = Cl = l : Cl = Cl.next = l;
    }
    return Cl;
  }
  function vu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function mn(l) {
    var t = dn;
    return dn += 1, xa === null && (xa = []), l = Wo(xa, l, t), t = $, (Cl === null ? t.memoizedState : Cl.next) === null && (t = t.alternate, z.H = t === null || t.memoizedState === null ? Xs : zc), l;
  }
  function gu(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return mn(l);
      if (l.$$typeof === _l) return kl(l);
    }
    throw Error(o(438, String(l)));
  }
  function sc(l) {
    var t = null, e = $.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = $.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = vu(), $.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = Xt;
    return t.index++, e;
  }
  function $t(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function bu(l) {
    var t = Nl();
    return rc(t, yl, l);
  }
  function rc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = e;
    var n = l.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      t.baseQueue = n = u, a.pending = null;
    }
    if (u = l.baseState, n === null) l.memoizedState = u;
    else {
      t = n.next;
      var f = i = null, s = null, b = t, E = !1;
      do {
        var _ = b.lane & -536870913;
        if (_ !== b.lane ? (el & _) === _ : (Wt & _) === _) {
          var p = b.revertLane;
          if (p === 0)
            s !== null && (s = s.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), _ === Ea && (E = !0);
          else if ((Wt & p) === p) {
            b = b.next, p === Ea && (E = !0);
            continue;
          } else
            _ = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, s === null ? (f = s = _, i = u) : s = s.next = _, $.lanes |= p, Te |= p;
          _ = b.action, $e && e(u, _), u = b.hasEagerState ? b.eagerState : e(u, _);
        } else
          p = {
            lane: _,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, s === null ? (f = s = p, i = u) : s = s.next = p, $.lanes |= _, Te |= _;
        b = b.next;
      } while (b !== null && b !== t);
      if (s === null ? i = u : s.next = f, !dt(u, l.memoizedState) && (Hl = !0, E && (e = Ta, e !== null)))
        throw e;
      l.memoizedState = u, l.baseState = i, l.baseQueue = s, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function dc(l) {
    var t = Nl(), e = t.queue;
    if (e === null) throw Error(o(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, n = e.pending, u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = l(u, i.action), i = i.next;
      while (i !== n);
      dt(u, t.memoizedState) || (Hl = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function is(l, t, e) {
    var a = $, n = Nl(), u = ul;
    if (u) {
      if (e === void 0) throw Error(o(407));
      e = e();
    } else e = t();
    var i = !dt(
      (yl || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Hl = !0), n = n.queue, hc(os.bind(null, a, n, l), [
      l
    ]), n.getSnapshot !== t || i || Cl !== null && Cl.memoizedState.tag & 1) {
      if (a.flags |= 2048, Da(
        9,
        { destroy: void 0 },
        fs.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), bl === null) throw Error(o(349));
      u || (Wt & 127) !== 0 || cs(a, t, e);
    }
    return e;
  }
  function cs(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = $.updateQueue, t === null ? (t = vu(), $.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function fs(l, t, e, a) {
    t.value = e, t.getSnapshot = a, ss(t) && rs(l);
  }
  function os(l, t, e) {
    return e(function() {
      ss(t) && rs(l);
    });
  }
  function ss(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !dt(l, e);
    } catch {
      return !0;
    }
  }
  function rs(l) {
    var t = Qe(l, 2);
    t !== null && it(t, l, 2);
  }
  function mc(l) {
    var t = Pl();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), $e) {
        oe(!0);
        try {
          e();
        } finally {
          oe(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $t,
      lastRenderedState: l
    }, t;
  }
  function ds(l, t, e, a) {
    return l.baseState = e, rc(
      l,
      yl,
      typeof a == "function" ? a : $t
    );
  }
  function Zy(l, t, e, a, n) {
    if (zu(l)) throw Error(o(485));
    if (l = t.action, l !== null) {
      var u = {
        payload: n,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      z.T !== null ? e(!0) : u.isTransition = !1, a(u), e = t.pending, e === null ? (u.next = t.pending = u, ms(t, u)) : (u.next = e.next, t.pending = e.next = u);
    }
  }
  function ms(l, t) {
    var e = t.action, a = t.payload, n = l.state;
    if (t.isTransition) {
      var u = z.T, i = {};
      z.T = i;
      try {
        var f = e(n, a), s = z.S;
        s !== null && s(i, f), ys(l, t, f);
      } catch (b) {
        yc(l, t, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), z.T = u;
      }
    } else
      try {
        u = e(n, a), ys(l, t, u);
      } catch (b) {
        yc(l, t, b);
      }
  }
  function ys(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        hs(l, t, a);
      },
      function(a) {
        return yc(l, t, a);
      }
    ) : hs(l, t, e);
  }
  function hs(l, t, e) {
    t.status = "fulfilled", t.value = e, vs(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, ms(l, e)));
  }
  function yc(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, vs(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function vs(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function gs(l, t) {
    return t;
  }
  function bs(l, t) {
    if (ul) {
      var e = bl.formState;
      if (e !== null) {
        l: {
          var a = $;
          if (ul) {
            if (Sl) {
              t: {
                for (var n = Sl, u = Ot; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (n = xt(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Sl = xt(
                  n.nextSibling
                ), a = n.data === "F!";
                break l;
              }
            }
            ye(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = Pl(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: gs,
      lastRenderedState: t
    }, e.queue = a, e = Ys.bind(
      null,
      $,
      a
    ), a.dispatch = e, a = mc(!1), u = Sc.bind(
      null,
      $,
      !1,
      a.queue
    ), a = Pl(), n = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = n, e = Zy.bind(
      null,
      $,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function ps(l) {
    var t = Nl();
    return Ss(t, yl, l);
  }
  function Ss(l, t, e) {
    if (t = rc(
      l,
      t,
      gs
    )[0], l = bu($t)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = mn(t);
      } catch (i) {
        throw i === Aa ? fu : i;
      }
    else a = t;
    t = Nl();
    var n = t.queue, u = n.dispatch;
    return e !== t.memoizedState && ($.flags |= 2048, Da(
      9,
      { destroy: void 0 },
      Vy.bind(null, n, e),
      null
    )), [a, u, l];
  }
  function Vy(l, t) {
    l.action = t;
  }
  function zs(l) {
    var t = Nl(), e = yl;
    if (e !== null)
      return Ss(t, e, l);
    Nl(), t = t.memoizedState, e = Nl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function Da(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = $.updateQueue, t === null && (t = vu(), $.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function Es() {
    return Nl().memoizedState;
  }
  function pu(l, t, e, a) {
    var n = Pl();
    $.flags |= l, n.memoizedState = Da(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Su(l, t, e, a) {
    var n = Nl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    yl !== null && a !== null && uc(a, yl.memoizedState.deps) ? n.memoizedState = Da(t, u, e, a) : ($.flags |= l, n.memoizedState = Da(
      1 | t,
      u,
      e,
      a
    ));
  }
  function Ts(l, t) {
    pu(8390656, 8, l, t);
  }
  function hc(l, t) {
    Su(2048, 8, l, t);
  }
  function Ly(l) {
    $.flags |= 4;
    var t = $.updateQueue;
    if (t === null)
      t = vu(), $.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function As(l) {
    var t = Nl().memoizedState;
    return Ly({ ref: t, nextImpl: l }), function() {
      if ((rl & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function _s(l, t) {
    return Su(4, 2, l, t);
  }
  function Os(l, t) {
    return Su(4, 4, l, t);
  }
  function Ms(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function xs(l, t, e) {
    e = e != null ? e.concat([l]) : null, Su(4, 4, Ms.bind(null, t, l), e);
  }
  function vc() {
  }
  function Ds(l, t) {
    var e = Nl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && uc(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function Us(l, t) {
    var e = Nl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && uc(t, a[1]))
      return a[0];
    if (a = l(), $e) {
      oe(!0);
      try {
        l();
      } finally {
        oe(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function gc(l, t, e) {
    return e === void 0 || (Wt & 1073741824) !== 0 && (el & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = Nr(), $.lanes |= l, Te |= l, e);
  }
  function Ns(l, t, e, a) {
    return dt(e, t) ? e : Oa.current !== null ? (l = gc(l, e, a), dt(l, t) || (Hl = !0), l) : (Wt & 42) === 0 || (Wt & 1073741824) !== 0 && (el & 261930) === 0 ? (Hl = !0, l.memoizedState = e) : (l = Nr(), $.lanes |= l, Te |= l, t);
  }
  function Rs(l, t, e, a, n) {
    var u = U.p;
    U.p = u !== 0 && 8 > u ? u : 8;
    var i = z.T, f = {};
    z.T = f, Sc(l, !1, t, e);
    try {
      var s = n(), b = z.S;
      if (b !== null && b(f, s), s !== null && typeof s == "object" && typeof s.then == "function") {
        var E = Gy(
          s,
          a
        );
        yn(
          l,
          t,
          E,
          bt(l)
        );
      } else
        yn(
          l,
          t,
          a,
          bt(l)
        );
    } catch (_) {
      yn(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: _ },
        bt()
      );
    } finally {
      U.p = u, i !== null && f.types !== null && (i.types = f.types), z.T = i;
    }
  }
  function Ky() {
  }
  function bc(l, t, e, a) {
    if (l.tag !== 5) throw Error(o(476));
    var n = Cs(l).queue;
    Rs(
      l,
      n,
      t,
      K,
      e === null ? Ky : function() {
        return Hs(l), e(a);
      }
    );
  }
  function Cs(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: K
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $t,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function Hs(l) {
    var t = Cs(l);
    t.next === null && (t = l.alternate.memoizedState), yn(
      l,
      t.next.queue,
      {},
      bt()
    );
  }
  function pc() {
    return kl(Nn);
  }
  function qs() {
    return Nl().memoizedState;
  }
  function Bs() {
    return Nl().memoizedState;
  }
  function wy(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = bt();
          l = ge(e);
          var a = be(t, l, e);
          a !== null && (it(a, t, e), on(a, t, e)), t = { cache: ki() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Jy(l, t, e) {
    var a = bt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(l) ? js(t, e) : (e = Yi(l, t, e, a), e !== null && (it(e, l, a), Gs(e, t, a)));
  }
  function Ys(l, t, e) {
    var a = bt();
    yn(l, t, e, a);
  }
  function yn(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (zu(l)) js(t, n);
    else {
      var u = l.alternate;
      if (l.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var i = t.lastRenderedState, f = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = f, dt(f, i))
            return tu(l, t, n, 0), bl === null && lu(), !1;
        } catch {
        }
      if (e = Yi(l, t, n, a), e !== null)
        return it(e, l, a), Gs(e, t, a), !0;
    }
    return !1;
  }
  function Sc(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Ic(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, zu(l)) {
      if (t) throw Error(o(479));
    } else
      t = Yi(
        l,
        e,
        a,
        2
      ), t !== null && it(t, l, 2);
  }
  function zu(l) {
    var t = l.alternate;
    return l === $ || t !== null && t === $;
  }
  function js(l, t) {
    Ma = yu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function Gs(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, Vf(l, e);
    }
  }
  var hn = {
    readContext: kl,
    use: gu,
    useCallback: Ol,
    useContext: Ol,
    useEffect: Ol,
    useImperativeHandle: Ol,
    useLayoutEffect: Ol,
    useInsertionEffect: Ol,
    useMemo: Ol,
    useReducer: Ol,
    useRef: Ol,
    useState: Ol,
    useDebugValue: Ol,
    useDeferredValue: Ol,
    useTransition: Ol,
    useSyncExternalStore: Ol,
    useId: Ol,
    useHostTransitionStatus: Ol,
    useFormState: Ol,
    useActionState: Ol,
    useOptimistic: Ol,
    useMemoCache: Ol,
    useCacheRefresh: Ol
  };
  hn.useEffectEvent = Ol;
  var Xs = {
    readContext: kl,
    use: gu,
    useCallback: function(l, t) {
      return Pl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: kl,
    useEffect: Ts,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, pu(
        4194308,
        4,
        Ms.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return pu(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      pu(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = Pl();
      t = t === void 0 ? null : t;
      var a = l();
      if ($e) {
        oe(!0);
        try {
          l();
        } finally {
          oe(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = Pl();
      if (e !== void 0) {
        var n = e(t);
        if ($e) {
          oe(!0);
          try {
            e(t);
          } finally {
            oe(!1);
          }
        }
      } else n = t;
      return a.memoizedState = a.baseState = n, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: n
      }, a.queue = l, l = l.dispatch = Jy.bind(
        null,
        $,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Pl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = mc(l);
      var t = l.queue, e = Ys.bind(null, $, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: vc,
    useDeferredValue: function(l, t) {
      var e = Pl();
      return gc(e, l, t);
    },
    useTransition: function() {
      var l = mc(!1);
      return l = Rs.bind(
        null,
        $,
        l.queue,
        !0,
        !1
      ), Pl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = $, n = Pl();
      if (ul) {
        if (e === void 0)
          throw Error(o(407));
        e = e();
      } else {
        if (e = t(), bl === null)
          throw Error(o(349));
        (el & 127) !== 0 || cs(a, t, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: t };
      return n.queue = u, Ts(os.bind(null, a, u, l), [
        l
      ]), a.flags |= 2048, Da(
        9,
        { destroy: void 0 },
        fs.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = Pl(), t = bl.identifierPrefix;
      if (ul) {
        var e = Bt, a = qt;
        e = (a & ~(1 << 32 - rt(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = hu++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = Xy++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: pc,
    useFormState: bs,
    useActionState: bs,
    useOptimistic: function(l) {
      var t = Pl();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = Sc.bind(
        null,
        $,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: sc,
    useCacheRefresh: function() {
      return Pl().memoizedState = wy.bind(
        null,
        $
      );
    },
    useEffectEvent: function(l) {
      var t = Pl(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((rl & 2) !== 0)
          throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, zc = {
    readContext: kl,
    use: gu,
    useCallback: Ds,
    useContext: kl,
    useEffect: hc,
    useImperativeHandle: xs,
    useInsertionEffect: _s,
    useLayoutEffect: Os,
    useMemo: Us,
    useReducer: bu,
    useRef: Es,
    useState: function() {
      return bu($t);
    },
    useDebugValue: vc,
    useDeferredValue: function(l, t) {
      var e = Nl();
      return Ns(
        e,
        yl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = bu($t)[0], t = Nl().memoizedState;
      return [
        typeof l == "boolean" ? l : mn(l),
        t
      ];
    },
    useSyncExternalStore: is,
    useId: qs,
    useHostTransitionStatus: pc,
    useFormState: ps,
    useActionState: ps,
    useOptimistic: function(l, t) {
      var e = Nl();
      return ds(e, yl, l, t);
    },
    useMemoCache: sc,
    useCacheRefresh: Bs
  };
  zc.useEffectEvent = As;
  var Qs = {
    readContext: kl,
    use: gu,
    useCallback: Ds,
    useContext: kl,
    useEffect: hc,
    useImperativeHandle: xs,
    useInsertionEffect: _s,
    useLayoutEffect: Os,
    useMemo: Us,
    useReducer: dc,
    useRef: Es,
    useState: function() {
      return dc($t);
    },
    useDebugValue: vc,
    useDeferredValue: function(l, t) {
      var e = Nl();
      return yl === null ? gc(e, l, t) : Ns(
        e,
        yl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = dc($t)[0], t = Nl().memoizedState;
      return [
        typeof l == "boolean" ? l : mn(l),
        t
      ];
    },
    useSyncExternalStore: is,
    useId: qs,
    useHostTransitionStatus: pc,
    useFormState: zs,
    useActionState: zs,
    useOptimistic: function(l, t) {
      var e = Nl();
      return yl !== null ? ds(e, yl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: sc,
    useCacheRefresh: Bs
  };
  Qs.useEffectEvent = As;
  function Ec(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : C({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var Tc = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = bt(), n = ge(a);
      n.payload = t, e != null && (n.callback = e), t = be(l, n, a), t !== null && (it(t, l, a), on(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = bt(), n = ge(a);
      n.tag = 1, n.payload = t, e != null && (n.callback = e), t = be(l, n, a), t !== null && (it(t, l, a), on(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = bt(), a = ge(e);
      a.tag = 2, t != null && (a.callback = t), t = be(l, a, e), t !== null && (it(t, l, e), on(t, l, e));
    }
  };
  function Zs(l, t, e, a, n, u, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, u, i) : t.prototype && t.prototype.isPureReactComponent ? !ln(e, a) || !ln(n, u) : !0;
  }
  function Vs(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && Tc.enqueueReplaceState(t, t.state, null);
  }
  function Fe(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = C({}, e));
      for (var n in l)
        e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Ls(l) {
    Pn(l);
  }
  function Ks(l) {
    console.error(l);
  }
  function ws(l) {
    Pn(l);
  }
  function Eu(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Js(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Ac(l, t, e) {
    return e = ge(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Eu(l, t);
    }, e;
  }
  function ks(l) {
    return l = ge(l), l.tag = 3, l;
  }
  function Ws(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      l.payload = function() {
        return n(u);
      }, l.callback = function() {
        Js(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Js(t, e, a), typeof n != "function" && (Ae === null ? Ae = /* @__PURE__ */ new Set([this]) : Ae.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function ky(l, t, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && za(
        t,
        e,
        n,
        !0
      ), e = yt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Mt === null ? Hu() : e.alternate === null && Ml === 0 && (Ml = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === ou ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Wc(l, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === ou ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Wc(l, a, n)), !1;
        }
        throw Error(o(435, e.tag));
      }
      return Wc(l, a, n), Hu(), !1;
    }
    if (ul)
      return t = yt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Vi && (l = Error(o(422), { cause: a }), an(Tt(l, e)))) : (a !== Vi && (t = Error(o(423), {
        cause: a
      }), an(
        Tt(t, e)
      )), l = l.current.alternate, l.flags |= 65536, n &= -n, l.lanes |= n, a = Tt(a, e), n = Ac(
        l.stateNode,
        a,
        n
      ), lc(l, n), Ml !== 4 && (Ml = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Tt(u, e), Tn === null ? Tn = [u] : Tn.push(u), Ml !== 4 && (Ml = 2), t === null) return !0;
    a = Tt(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = n & -n, e.lanes |= l, l = Ac(e.stateNode, a, l), lc(e, l), !1;
        case 1:
          if (t = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ae === null || !Ae.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = ks(n), Ws(
              n,
              l,
              e,
              a
            ), lc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var _c = Error(o(461)), Hl = !1;
  function Wl(l, t, e, a) {
    t.child = l === null ? Po(t, null, e, a) : We(
      t,
      l.child,
      e,
      a
    );
  }
  function $s(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return Ke(t), a = ic(
      l,
      t,
      e,
      i,
      u,
      n
    ), f = cc(), l !== null && !Hl ? (fc(l, t, n), Ft(l, t, n)) : (ul && f && Qi(t), t.flags |= 1, Wl(l, t, a, n), t.child);
  }
  function Fs(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !ji(u) && u.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = u, Is(
        l,
        t,
        u,
        a,
        n
      )) : (l = au(
        e.type,
        null,
        a,
        t,
        t.mode,
        n
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (u = l.child, !Cc(l, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : ln, e(i, a) && l.ref === t.ref)
        return Ft(l, t, n);
    }
    return t.flags |= 1, l = Kt(u, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Is(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (ln(u, a) && l.ref === t.ref)
        if (Hl = !1, t.pendingProps = a = u, Cc(l, n))
          (l.flags & 131072) !== 0 && (Hl = !0);
        else
          return t.lanes = l.lanes, Ft(l, t, n);
    }
    return Oc(
      l,
      t,
      e,
      a,
      n
    );
  }
  function Ps(l, t, e, a) {
    var n = a.children, u = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, t.child = null;
        return lr(
          l,
          t,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && cu(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? es(t, u) : ec(), as(t);
      else
        return a = t.lanes = 536870912, lr(
          l,
          t,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (cu(t, u.cachePool), es(t, u), Se(), t.memoizedState = null) : (l !== null && cu(t, null), ec(), Se());
    return Wl(l, t, n, e), t.child;
  }
  function vn(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function lr(l, t, e, a, n) {
    var u = $i();
    return u = u === null ? null : { parent: Rl._currentValue, pool: u }, t.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, l !== null && cu(t, null), ec(), as(t), l !== null && za(l, t, a, !0), t.childLanes = n, null;
  }
  function Tu(l, t) {
    return t = _u(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function tr(l, t, e) {
    return We(t, l.child, null, e), l = Tu(t, t.pendingProps), l.flags |= 2, ht(t), t.memoizedState = null, l;
  }
  function Wy(l, t, e) {
    var a = t.pendingProps, n = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (ul) {
        if (a.mode === "hidden")
          return l = Tu(t, a), t.lanes = 536870912, vn(null, l);
        if (nc(t), (l = Sl) ? (l = md(
          l,
          Ot
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: de !== null ? { id: qt, overflow: Bt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = jo(l), e.return = t, t.child = e, Jl = t, Sl = null)) : l = null, l === null) throw ye(t);
        return t.lanes = 536870912, null;
      }
      return Tu(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (nc(t), n)
        if (t.flags & 256)
          t.flags &= -257, t = tr(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (Hl || za(l, t, e, !1), n = (e & l.childLanes) !== 0, Hl || n) {
        if (a = bl, a !== null && (i = Lf(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Qe(l, i), it(a, l, i), _c;
        Hu(), t = tr(
          l,
          t,
          e
        );
      } else
        l = u.treeContext, Sl = xt(i.nextSibling), Jl = t, ul = !0, me = null, Ot = !1, l !== null && Qo(t, l), t = Tu(t, a), t.flags |= 4096;
      return t;
    }
    return l = Kt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Au(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(o(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function Oc(l, t, e, a, n) {
    return Ke(t), e = ic(
      l,
      t,
      e,
      a,
      void 0,
      n
    ), a = cc(), l !== null && !Hl ? (fc(l, t, n), Ft(l, t, n)) : (ul && a && Qi(t), t.flags |= 1, Wl(l, t, e, n), t.child);
  }
  function er(l, t, e, a, n, u) {
    return Ke(t), t.updateQueue = null, e = us(
      t,
      a,
      e,
      n
    ), ns(l), a = cc(), l !== null && !Hl ? (fc(l, t, u), Ft(l, t, u)) : (ul && a && Qi(t), t.flags |= 1, Wl(l, t, e, u), t.child);
  }
  function ar(l, t, e, a, n) {
    if (Ke(t), t.stateNode === null) {
      var u = ga, i = e.contextType;
      typeof i == "object" && i !== null && (u = kl(i)), u = new e(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Tc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Ii(t), i = e.contextType, u.context = typeof i == "object" && i !== null ? kl(i) : ga, u.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Ec(
        t,
        e,
        i,
        a
      ), u.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Tc.enqueueReplaceState(u, u.state, null), rn(t, a, u, n), sn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      u = t.stateNode;
      var f = t.memoizedProps, s = Fe(e, f);
      u.props = s;
      var b = u.context, E = e.contextType;
      i = ga, typeof E == "object" && E !== null && (i = kl(E));
      var _ = e.getDerivedStateFromProps;
      E = typeof _ == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = t.pendingProps !== f, E || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || b !== i) && Vs(
        t,
        u,
        a,
        i
      ), ve = !1;
      var p = t.memoizedState;
      u.state = p, rn(t, a, u, n), sn(), b = t.memoizedState, f || p !== b || ve ? (typeof _ == "function" && (Ec(
        t,
        e,
        _,
        a
      ), b = t.memoizedState), (s = ve || Zs(
        t,
        e,
        s,
        a,
        p,
        b,
        i
      )) ? (E || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = b), u.props = a, u.state = b, u.context = i, a = s) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, Pi(l, t), i = t.memoizedProps, E = Fe(e, i), u.props = E, _ = t.pendingProps, p = u.context, b = e.contextType, s = ga, typeof b == "object" && b !== null && (s = kl(b)), f = e.getDerivedStateFromProps, (b = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== _ || p !== s) && Vs(
        t,
        u,
        a,
        s
      ), ve = !1, p = t.memoizedState, u.state = p, rn(t, a, u, n), sn();
      var S = t.memoizedState;
      i !== _ || p !== S || ve || l !== null && l.dependencies !== null && uu(l.dependencies) ? (typeof f == "function" && (Ec(
        t,
        e,
        f,
        a
      ), S = t.memoizedState), (E = ve || Zs(
        t,
        e,
        E,
        a,
        p,
        S,
        s
      ) || l !== null && l.dependencies !== null && uu(l.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, S, s), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        S,
        s
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = S), u.props = a, u.state = S, u.context = s, a = E) : (typeof u.componentDidUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && p === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, Au(l, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, l !== null && a ? (t.child = We(
      t,
      l.child,
      null,
      n
    ), t.child = We(
      t,
      null,
      e,
      n
    )) : Wl(l, t, e, n), t.memoizedState = u.state, l = t.child) : l = Ft(
      l,
      t,
      n
    ), l;
  }
  function nr(l, t, e, a) {
    return Ve(), t.flags |= 256, Wl(l, t, e, a), t.child;
  }
  var Mc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function xc(l) {
    return { baseLanes: l, cachePool: Jo() };
  }
  function Dc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= gt), l;
  }
  function ur(l, t, e) {
    var a = t.pendingProps, n = !1, u = (t.flags & 128) !== 0, i;
    if ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Ul.current & 2) !== 0), i && (n = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (ul) {
        if (n ? pe(t) : Se(), (l = Sl) ? (l = md(
          l,
          Ot
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: de !== null ? { id: qt, overflow: Bt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = jo(l), e.return = t, t.child = e, Jl = t, Sl = null)) : l = null, l === null) throw ye(t);
        return df(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var f = a.children;
      return a = a.fallback, n ? (Se(), n = t.mode, f = _u(
        { mode: "hidden", children: f },
        n
      ), a = Ze(
        a,
        n,
        e,
        null
      ), f.return = t, a.return = t, f.sibling = a, t.child = f, a = t.child, a.memoizedState = xc(e), a.childLanes = Dc(
        l,
        i,
        e
      ), t.memoizedState = Mc, vn(null, a)) : (pe(t), Uc(t, f));
    }
    var s = l.memoizedState;
    if (s !== null && (f = s.dehydrated, f !== null)) {
      if (u)
        t.flags & 256 ? (pe(t), t.flags &= -257, t = Nc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (Se(), t.child = l.child, t.flags |= 128, t = null) : (Se(), f = a.fallback, n = t.mode, a = _u(
          { mode: "visible", children: a.children },
          n
        ), f = Ze(
          f,
          n,
          e,
          null
        ), f.flags |= 2, a.return = t, f.return = t, a.sibling = f, t.child = a, We(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = xc(e), a.childLanes = Dc(
          l,
          i,
          e
        ), t.memoizedState = Mc, t = vn(null, a));
      else if (pe(t), df(f)) {
        if (i = f.nextSibling && f.nextSibling.dataset, i) var b = i.dgst;
        i = b, a = Error(o(419)), a.stack = "", a.digest = i, an({ value: a, source: null, stack: null }), t = Nc(
          l,
          t,
          e
        );
      } else if (Hl || za(l, t, e, !1), i = (e & l.childLanes) !== 0, Hl || i) {
        if (i = bl, i !== null && (a = Lf(i, e), a !== 0 && a !== s.retryLane))
          throw s.retryLane = a, Qe(l, a), it(i, l, a), _c;
        rf(f) || Hu(), t = Nc(
          l,
          t,
          e
        );
      } else
        rf(f) ? (t.flags |= 192, t.child = l.child, t = null) : (l = s.treeContext, Sl = xt(
          f.nextSibling
        ), Jl = t, ul = !0, me = null, Ot = !1, l !== null && Qo(t, l), t = Uc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (Se(), f = a.fallback, n = t.mode, s = l.child, b = s.sibling, a = Kt(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 65011712, b !== null ? f = Kt(
      b,
      f
    ) : (f = Ze(
      f,
      n,
      e,
      null
    ), f.flags |= 2), f.return = t, a.return = t, a.sibling = f, t.child = a, vn(null, a), a = t.child, f = l.child.memoizedState, f === null ? f = xc(e) : (n = f.cachePool, n !== null ? (s = Rl._currentValue, n = n.parent !== s ? { parent: s, pool: s } : n) : n = Jo(), f = {
      baseLanes: f.baseLanes | e,
      cachePool: n
    }), a.memoizedState = f, a.childLanes = Dc(
      l,
      i,
      e
    ), t.memoizedState = Mc, vn(l.child, a)) : (pe(t), e = l.child, l = e.sibling, e = Kt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function Uc(l, t) {
    return t = _u(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function _u(l, t) {
    return l = mt(22, l, null, t), l.lanes = 0, l;
  }
  function Nc(l, t, e) {
    return We(t, l.child, null, e), l = Uc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function ir(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), wi(l.return, t, e);
  }
  function Rc(l, t, e, a, n, u) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function cr(l, t, e) {
    var a = t.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ul.current, f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, R(Ul, i), Wl(l, t, a, e), a = ul ? en : 0, !f && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && ir(l, e, t);
        else if (l.tag === 19)
          ir(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = t.child, n = null; e !== null; )
          l = e.alternate, l !== null && mu(l) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = t.child, t.child = null) : (n = e.sibling, e.sibling = null), Rc(
          t,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = t.child, t.child = null; n !== null; ) {
          if (l = n.alternate, l !== null && mu(l) === null) {
            t.child = n;
            break;
          }
          l = n.sibling, n.sibling = e, e = n, n = l;
        }
        Rc(
          t,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        Rc(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Ft(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), Te |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (za(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (l = t.child, e = Kt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = Kt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function Cc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && uu(l)));
  }
  function $y(l, t, e) {
    switch (t.tag) {
      case 3:
        Ql(t, t.stateNode.containerInfo), he(t, Rl, l.memoizedState.cache), Ve();
        break;
      case 27:
      case 5:
        ce(t);
        break;
      case 4:
        Ql(t, t.stateNode.containerInfo);
        break;
      case 10:
        he(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, nc(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (pe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? ur(l, t, e) : (pe(t), l = Ft(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        pe(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (za(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), n) {
          if (a)
            return cr(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), R(Ul, Ul.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Ps(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        he(t, Rl, l.memoizedState.cache);
    }
    return Ft(l, t, e);
  }
  function fr(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Hl = !0;
      else {
        if (!Cc(l, e) && (t.flags & 128) === 0)
          return Hl = !1, $y(
            l,
            t,
            e
          );
        Hl = (l.flags & 131072) !== 0;
      }
    else
      Hl = !1, ul && (t.flags & 1048576) !== 0 && Xo(t, en, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = Je(t.elementType), t.type = l, typeof l == "function")
            ji(l) ? (a = Fe(l, a), t.tag = 1, t = ar(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = Oc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === Bl) {
                t.tag = 11, t = $s(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (n === J) {
                t.tag = 14, t = Fs(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = ft(l) || l, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Oc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, n = Fe(
          a,
          t.pendingProps
        ), ar(
          l,
          t,
          a,
          n,
          e
        );
      case 3:
        l: {
          if (Ql(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(o(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          n = u.element, Pi(l, t), rn(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, he(t, Rl, a), a !== u.cache && Ji(
            t,
            [Rl],
            e,
            !0
          ), sn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = nr(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== n) {
              n = Tt(
                Error(o(424)),
                t
              ), an(n), t = nr(
                l,
                t,
                a,
                e
              );
              break l;
            } else
              for (l = t.stateNode.containerInfo, l.nodeType === 9 ? l = l.body : l = l.nodeName === "HTML" ? l.ownerDocument.body : l, Sl = xt(l.firstChild), Jl = t, ul = !0, me = null, Ot = !0, e = Po(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
          else {
            if (Ve(), a === n) {
              t = Ft(
                l,
                t,
                e
              );
              break l;
            }
            Wl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Au(l, t), l === null ? (e = pd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : ul || (e = t.type, l = t.pendingProps, a = Qu(
          L.current
        ).createElement(e), a[wl] = t, a[lt] = l, $l(a, e, l), Zl(a), t.stateNode = a) : t.memoizedState = pd(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return ce(t), l === null && ul && (a = t.stateNode = vd(
          t.type,
          t.pendingProps,
          L.current
        ), Jl = t, Ot = !0, n = Sl, xe(t.type) ? (mf = n, Sl = xt(a.firstChild)) : Sl = n), Wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), Au(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && ul && ((n = a = Sl) && (a = Oh(
          a,
          t.type,
          t.pendingProps,
          Ot
        ), a !== null ? (t.stateNode = a, Jl = t, Sl = xt(a.firstChild), Ot = !1, n = !0) : n = !1), n || ye(t)), ce(t), n = t.type, u = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = u.children, ff(n, u) ? a = null : i !== null && ff(n, i) && (t.flags |= 32), t.memoizedState !== null && (n = ic(
          l,
          t,
          Qy,
          null,
          null,
          e
        ), Nn._currentValue = n), Au(l, t), Wl(l, t, a, e), t.child;
      case 6:
        return l === null && ul && ((l = e = Sl) && (e = Mh(
          e,
          t.pendingProps,
          Ot
        ), e !== null ? (t.stateNode = e, Jl = t, Sl = null, l = !0) : l = !1), l || ye(t)), null;
      case 13:
        return ur(l, t, e);
      case 4:
        return Ql(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = We(
          t,
          null,
          a,
          e
        ) : Wl(l, t, a, e), t.child;
      case 11:
        return $s(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return Wl(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return Wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return Wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, he(t, t.type, a.value), Wl(l, t, a.children, e), t.child;
      case 9:
        return n = t.type._context, a = t.pendingProps.children, Ke(t), n = kl(n), a = a(n), t.flags |= 1, Wl(l, t, a, e), t.child;
      case 14:
        return Fs(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Is(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return cr(l, t, e);
      case 31:
        return Wy(l, t, e);
      case 22:
        return Ps(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return Ke(t), a = kl(Rl), l === null ? (n = $i(), n === null && (n = bl, u = ki(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), t.memoizedState = { parent: a, cache: n }, Ii(t), he(t, Rl, n)) : ((l.lanes & e) !== 0 && (Pi(l, t), rn(t, null, null, e), sn()), n = l.memoizedState, u = t.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), he(t, Rl, a)) : (a = u.cache, he(t, Rl, a), a !== n.cache && Ji(
          t,
          [Rl],
          e,
          !0
        ))), Wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function It(l) {
    l.flags |= 4;
  }
  function Hc(l, t, e, a, n) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (n & 335544128) === n)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (qr()) l.flags |= 8192;
        else
          throw ke = ou, Fi;
    } else l.flags &= -16777217;
  }
  function or(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Ad(t))
      if (qr()) l.flags |= 8192;
      else
        throw ke = ou, Fi;
  }
  function Ou(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? Qf() : 536870912, l.lanes |= t, Ca |= t);
  }
  function gn(l, t) {
    if (!ul)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function zl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = l, n = n.sibling;
    else
      for (n = l.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = l, n = n.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function Fy(l, t, e) {
    var a = t.pendingProps;
    switch (Zi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return zl(t), null;
      case 1:
        return zl(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), kt(Rl), I(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (Sa(t) ? It(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Li())), zl(t), null;
      case 26:
        var n = t.type, u = t.memoizedState;
        return l === null ? (It(t), u !== null ? (zl(t), or(t, u)) : (zl(t), Hc(
          t,
          n,
          null,
          a,
          e
        ))) : u ? u !== l.memoizedState ? (It(t), zl(t), or(t, u)) : (zl(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && It(t), zl(t), Hc(
          t,
          n,
          l,
          a,
          e
        )), null;
      case 27:
        if (Qt(t), e = L.current, n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && It(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return zl(t), null;
          }
          l = Y.current, Sa(t) ? Zo(t) : (l = vd(n, a, e), t.stateNode = l, It(t));
        }
        return zl(t), null;
      case 5:
        if (Qt(t), n = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && It(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(o(166));
            return zl(t), null;
          }
          if (u = Y.current, Sa(t))
            Zo(t);
          else {
            var i = Qu(
              L.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[wl] = t, u[lt] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = u;
            l: switch ($l(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && It(t);
          }
        }
        return zl(t), Hc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && It(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(o(166));
          if (l = L.current, Sa(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, n = Jl, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            l[wl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || ud(l.nodeValue, e)), l || ye(t, !0);
          } else
            l = Qu(l).createTextNode(
              a
            ), l[wl] = t, t.stateNode = l;
        }
        return zl(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = Sa(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(557));
              l[wl] = t;
            } else
              Ve(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            zl(t), l = !1;
          } else
            e = Li(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (ht(t), t) : (ht(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return zl(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (n = Sa(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!n) throw Error(o(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[wl] = t;
            } else
              Ve(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            zl(t), n = !1;
          } else
            n = Li(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (ht(t), t) : (ht(t), null);
        }
        return ht(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), Ou(t, t.updateQueue), zl(t), null);
      case 4:
        return I(), l === null && ef(t.stateNode.containerInfo), zl(t), null;
      case 10:
        return kt(t.type), zl(t), null;
      case 19:
        if (O(Ul), a = t.memoizedState, a === null) return zl(t), null;
        if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) gn(a, !1);
          else {
            if (Ml !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (u = mu(l), u !== null) {
                  for (t.flags |= 128, gn(a, !1), l = u.updateQueue, t.updateQueue = l, Ou(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    Yo(e, l), e = e.sibling;
                  return R(
                    Ul,
                    Ul.current & 1 | 2
                  ), ul && wt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && ot() > Nu && (t.flags |= 128, n = !0, gn(a, !1), t.lanes = 4194304);
          }
        else {
          if (!n)
            if (l = mu(u), l !== null) {
              if (t.flags |= 128, n = !0, l = l.updateQueue, t.updateQueue = l, Ou(t, l), gn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ul)
                return zl(t), null;
            } else
              2 * ot() - a.renderingStartTime > Nu && e !== 536870912 && (t.flags |= 128, n = !0, gn(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (l = a.last, l !== null ? l.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = ot(), l.sibling = null, e = Ul.current, R(
          Ul,
          n ? e & 1 | 2 : e & 1
        ), ul && wt(t, a.treeForkCount), l) : (zl(t), null);
      case 22:
      case 23:
        return ht(t), ac(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (zl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : zl(t), e = t.updateQueue, e !== null && Ou(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && O(we), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), kt(Rl), zl(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function Iy(l, t) {
    switch (Zi(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return kt(Rl), I(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Qt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (ht(t), t.alternate === null)
            throw Error(o(340));
          Ve();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (ht(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Ve();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return O(Ul), null;
      case 4:
        return I(), null;
      case 10:
        return kt(t.type), null;
      case 22:
      case 23:
        return ht(t), ac(), l !== null && O(we), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return kt(Rl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function sr(l, t) {
    switch (Zi(t), t.tag) {
      case 3:
        kt(Rl), I();
        break;
      case 26:
      case 27:
      case 5:
        Qt(t);
        break;
      case 4:
        I();
        break;
      case 31:
        t.memoizedState !== null && ht(t);
        break;
      case 13:
        ht(t);
        break;
      case 19:
        O(Ul);
        break;
      case 10:
        kt(t.type);
        break;
      case 22:
      case 23:
        ht(t), ac(), l !== null && O(we);
        break;
      case 24:
        kt(Rl);
    }
  }
  function bn(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (f) {
      ml(t, t.return, f);
    }
  }
  function ze(l, t, e) {
    try {
      var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = t;
              var s = e, b = f;
              try {
                b();
              } catch (E) {
                ml(
                  n,
                  s,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (E) {
      ml(t, t.return, E);
    }
  }
  function rr(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        ts(t, e);
      } catch (a) {
        ml(l, l.return, a);
      }
    }
  }
  function dr(l, t, e) {
    e.props = Fe(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      ml(l, t, a);
    }
  }
  function pn(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      ml(l, t, n);
    }
  }
  function Yt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          ml(l, t, n);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          ml(l, t, n);
        }
      else e.current = null;
  }
  function mr(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  function qc(l, t, e) {
    try {
      var a = l.stateNode;
      Sh(a, l.type, e, t), a[lt] = t;
    } catch (n) {
      ml(l, l.return, n);
    }
  }
  function yr(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && xe(l.type) || l.tag === 4;
  }
  function Bc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || yr(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && xe(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Yc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Vt));
    else if (a !== 4 && (a === 27 && xe(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (Yc(l, t, e), l = l.sibling; l !== null; )
        Yc(l, t, e), l = l.sibling;
  }
  function Mu(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && xe(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (Mu(l, t, e), l = l.sibling; l !== null; )
        Mu(l, t, e), l = l.sibling;
  }
  function hr(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      $l(t, a, e), t[wl] = l, t[lt] = e;
    } catch (u) {
      ml(l, l.return, u);
    }
  }
  var Pt = !1, ql = !1, jc = !1, vr = typeof WeakSet == "function" ? WeakSet : Set, Vl = null;
  function Py(l, t) {
    if (l = l.containerInfo, uf = ku, l = xo(l), Ni(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, f = -1, s = -1, b = 0, E = 0, _ = l, p = null;
            t: for (; ; ) {
              for (var S; _ !== e || n !== 0 && _.nodeType !== 3 || (f = i + n), _ !== u || a !== 0 && _.nodeType !== 3 || (s = i + a), _.nodeType === 3 && (i += _.nodeValue.length), (S = _.firstChild) !== null; )
                p = _, _ = S;
              for (; ; ) {
                if (_ === l) break t;
                if (p === e && ++b === n && (f = i), p === u && ++E === a && (s = i), (S = _.nextSibling) !== null) break;
                _ = p, p = _.parentNode;
              }
              _ = S;
            }
            e = f === -1 || s === -1 ? null : { start: f, end: s };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (cf = { focusedElem: l, selectionRange: e }, ku = !1, Vl = t; Vl !== null; )
      if (t = Vl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Vl = l;
      else
        for (; Vl !== null; ) {
          switch (t = Vl, u = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  n = l[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && u !== null) {
                l = void 0, e = t, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var G = Fe(
                    e.type,
                    n
                  );
                  l = a.getSnapshotBeforeUpdate(
                    G,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (w) {
                  ml(
                    e,
                    e.return,
                    w
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  sf(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      sf(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(o(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Vl = l;
            break;
          }
          Vl = t.return;
        }
  }
  function gr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        te(l, e), a & 4 && bn(5, e);
        break;
      case 1:
        if (te(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              ml(e, e.return, i);
            }
          else {
            var n = Fe(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                n,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              ml(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && rr(e), a & 512 && pn(e, e.return);
        break;
      case 3:
        if (te(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            ts(l, t);
          } catch (i) {
            ml(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && hr(e);
      case 26:
      case 5:
        te(l, e), t === null && a & 4 && mr(e), a & 512 && pn(e, e.return);
        break;
      case 12:
        te(l, e);
        break;
      case 31:
        te(l, e), a & 4 && Sr(l, e);
        break;
      case 13:
        te(l, e), a & 4 && zr(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = fh.bind(
          null,
          e
        ), xh(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Pt, !a) {
          t = t !== null && t.memoizedState !== null || ql, n = Pt;
          var u = ql;
          Pt = a, (ql = t) && !u ? ee(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : te(l, e), Pt = n, ql = u;
        }
        break;
      case 30:
        break;
      default:
        te(l, e);
    }
  }
  function br(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, br(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && yi(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Tl = null, et = !1;
  function le(l, t, e) {
    for (e = e.child; e !== null; )
      pr(l, t, e), e = e.sibling;
  }
  function pr(l, t, e) {
    if (st && typeof st.onCommitFiberUnmount == "function")
      try {
        st.onCommitFiberUnmount(Za, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        ql || Yt(e, t), le(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        ql || Yt(e, t);
        var a = Tl, n = et;
        xe(e.type) && (Tl = e.stateNode, et = !1), le(
          l,
          t,
          e
        ), xn(e.stateNode), Tl = a, et = n;
        break;
      case 5:
        ql || Yt(e, t);
      case 6:
        if (a = Tl, n = et, Tl = null, le(
          l,
          t,
          e
        ), Tl = a, et = n, Tl !== null)
          if (et)
            try {
              (Tl.nodeType === 9 ? Tl.body : Tl.nodeName === "HTML" ? Tl.ownerDocument.body : Tl).removeChild(e.stateNode);
            } catch (u) {
              ml(
                e,
                t,
                u
              );
            }
          else
            try {
              Tl.removeChild(e.stateNode);
            } catch (u) {
              ml(
                e,
                t,
                u
              );
            }
        break;
      case 18:
        Tl !== null && (et ? (l = Tl, rd(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), Qa(l)) : rd(Tl, e.stateNode));
        break;
      case 4:
        a = Tl, n = et, Tl = e.stateNode.containerInfo, et = !0, le(
          l,
          t,
          e
        ), Tl = a, et = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ze(2, e, t), ql || ze(4, e, t), le(
          l,
          t,
          e
        );
        break;
      case 1:
        ql || (Yt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && dr(
          e,
          t,
          a
        )), le(
          l,
          t,
          e
        );
        break;
      case 21:
        le(
          l,
          t,
          e
        );
        break;
      case 22:
        ql = (a = ql) || e.memoizedState !== null, le(
          l,
          t,
          e
        ), ql = a;
        break;
      default:
        le(
          l,
          t,
          e
        );
    }
  }
  function Sr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        Qa(l);
      } catch (e) {
        ml(t, t.return, e);
      }
    }
  }
  function zr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        Qa(l);
      } catch (e) {
        ml(t, t.return, e);
      }
  }
  function lh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new vr()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new vr()), t;
      default:
        throw Error(o(435, l.tag));
    }
  }
  function xu(l, t) {
    var e = lh(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = oh.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function at(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = l, i = t, f = i;
        l: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (xe(f.type)) {
                Tl = f.stateNode, et = !1;
                break l;
              }
              break;
            case 5:
              Tl = f.stateNode, et = !1;
              break l;
            case 3:
            case 4:
              Tl = f.stateNode.containerInfo, et = !0;
              break l;
          }
          f = f.return;
        }
        if (Tl === null) throw Error(o(160));
        pr(u, i, n), Tl = null, et = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Er(t, l), t = t.sibling;
  }
  var Nt = null;
  function Er(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        at(t, l), nt(l), a & 4 && (ze(3, l, l.return), bn(3, l), ze(5, l, l.return));
        break;
      case 1:
        at(t, l), nt(l), a & 512 && (ql || e === null || Yt(e, e.return)), a & 64 && Pt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Nt;
        if (at(t, l), nt(l), a & 512 && (ql || e === null || Yt(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, n = n.ownerDocument || n;
                  t: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Ka] || u[wl] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), $l(u, a, e), u[wl] = l, Zl(u), a = u;
                      break l;
                    case "link":
                      var i = Ed(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), $l(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = Ed(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (f = 0; f < i.length; f++)
                          if (u = i[f], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(f, 1);
                            break t;
                          }
                      }
                      u = n.createElement(a), $l(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  u[wl] = l, Zl(u), a = u;
                }
                l.stateNode = a;
              } else
                Td(
                  n,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = zd(
                n,
                a,
                l.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? Td(
              n,
              l.type,
              l.stateNode
            ) : zd(
              n,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && qc(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        at(t, l), nt(l), a & 512 && (ql || e === null || Yt(e, e.return)), e !== null && a & 4 && qc(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (at(t, l), nt(l), a & 512 && (ql || e === null || Yt(e, e.return)), l.flags & 32) {
          n = l.stateNode;
          try {
            sa(n, "");
          } catch (G) {
            ml(l, l.return, G);
          }
        }
        a & 4 && l.stateNode != null && (n = l.memoizedProps, qc(
          l,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (jc = !0);
        break;
      case 6:
        if (at(t, l), nt(l), a & 4) {
          if (l.stateNode === null)
            throw Error(o(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (G) {
            ml(l, l.return, G);
          }
        }
        break;
      case 3:
        if (Lu = null, n = Nt, Nt = Zu(t.containerInfo), at(t, l), Nt = n, nt(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Qa(t.containerInfo);
          } catch (G) {
            ml(l, l.return, G);
          }
        jc && (jc = !1, Tr(l));
        break;
      case 4:
        a = Nt, Nt = Zu(
          l.stateNode.containerInfo
        ), at(t, l), nt(l), Nt = a;
        break;
      case 12:
        at(t, l), nt(l);
        break;
      case 31:
        at(t, l), nt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, xu(l, a)));
        break;
      case 13:
        at(t, l), nt(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Uu = ot()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, xu(l, a)));
        break;
      case 22:
        n = l.memoizedState !== null;
        var s = e !== null && e.memoizedState !== null, b = Pt, E = ql;
        if (Pt = b || n, ql = E || s, at(t, l), ql = E, Pt = b, nt(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (e === null || s || Pt || ql || Ie(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                s = e = t;
                try {
                  if (u = s.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    f = s.stateNode;
                    var _ = s.memoizedProps.style, p = _ != null && _.hasOwnProperty("display") ? _.display : null;
                    f.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
                  }
                } catch (G) {
                  ml(s, s.return, G);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                s = t;
                try {
                  s.stateNode.nodeValue = n ? "" : s.memoizedProps;
                } catch (G) {
                  ml(s, s.return, G);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                s = t;
                try {
                  var S = s.stateNode;
                  n ? dd(S, !0) : dd(s.stateNode, !1);
                } catch (G) {
                  ml(s, s.return, G);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, xu(l, e))));
        break;
      case 19:
        at(t, l), nt(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, xu(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        at(t, l), nt(l);
    }
  }
  function nt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (yr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(o(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Bc(l);
            Mu(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (sa(i, ""), e.flags &= -33);
            var f = Bc(l);
            Mu(l, f, i);
            break;
          case 3:
          case 4:
            var s = e.stateNode.containerInfo, b = Bc(l);
            Yc(
              l,
              b,
              s
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (E) {
        ml(l, l.return, E);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function Tr(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        Tr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function te(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        gr(l, t.alternate, t), t = t.sibling;
  }
  function Ie(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ze(4, t, t.return), Ie(t);
          break;
        case 1:
          Yt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && dr(
            t,
            t.return,
            e
          ), Ie(t);
          break;
        case 27:
          xn(t.stateNode);
        case 26:
        case 5:
          Yt(t, t.return), Ie(t);
          break;
        case 22:
          t.memoizedState === null && Ie(t);
          break;
        case 30:
          Ie(t);
          break;
        default:
          Ie(t);
      }
      l = l.sibling;
    }
  }
  function ee(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, n = l, u = t, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ee(
            n,
            u,
            e
          ), bn(4, u);
          break;
        case 1:
          if (ee(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (b) {
              ml(a, a.return, b);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var f = a.stateNode;
            try {
              var s = n.shared.hiddenCallbacks;
              if (s !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < s.length; n++)
                  ls(s[n], f);
            } catch (b) {
              ml(a, a.return, b);
            }
          }
          e && i & 64 && rr(u), pn(u, u.return);
          break;
        case 27:
          hr(u);
        case 26:
        case 5:
          ee(
            n,
            u,
            e
          ), e && a === null && i & 4 && mr(u), pn(u, u.return);
          break;
        case 12:
          ee(
            n,
            u,
            e
          );
          break;
        case 31:
          ee(
            n,
            u,
            e
          ), e && i & 4 && Sr(n, u);
          break;
        case 13:
          ee(
            n,
            u,
            e
          ), e && i & 4 && zr(n, u);
          break;
        case 22:
          u.memoizedState === null && ee(
            n,
            u,
            e
          ), pn(u, u.return);
          break;
        case 30:
          break;
        default:
          ee(
            n,
            u,
            e
          );
      }
      t = t.sibling;
    }
  }
  function Gc(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && nn(e));
  }
  function Xc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && nn(l));
  }
  function Rt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Ar(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function Ar(l, t, e, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Rt(
          l,
          t,
          e,
          a
        ), n & 2048 && bn(9, t);
        break;
      case 1:
        Rt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Rt(
          l,
          t,
          e,
          a
        ), n & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && nn(l)));
        break;
      case 12:
        if (n & 2048) {
          Rt(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var u = t.memoizedProps, i = u.id, f = u.onPostCommit;
            typeof f == "function" && f(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (s) {
            ml(t, t.return, s);
          }
        } else
          Rt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Rt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Rt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, i = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Rt(
          l,
          t,
          e,
          a
        ) : Sn(l, t) : u._visibility & 2 ? Rt(
          l,
          t,
          e,
          a
        ) : (u._visibility |= 2, Ua(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Gc(i, t);
        break;
      case 24:
        Rt(
          l,
          t,
          e,
          a
        ), n & 2048 && Xc(t.alternate, t);
        break;
      default:
        Rt(
          l,
          t,
          e,
          a
        );
    }
  }
  function Ua(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l, i = t, f = e, s = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ua(
            u,
            i,
            f,
            s,
            n
          ), bn(8, i);
          break;
        case 23:
          break;
        case 22:
          var E = i.stateNode;
          i.memoizedState !== null ? E._visibility & 2 ? Ua(
            u,
            i,
            f,
            s,
            n
          ) : Sn(
            u,
            i
          ) : (E._visibility |= 2, Ua(
            u,
            i,
            f,
            s,
            n
          )), n && b & 2048 && Gc(
            i.alternate,
            i
          );
          break;
        case 24:
          Ua(
            u,
            i,
            f,
            s,
            n
          ), n && b & 2048 && Xc(i.alternate, i);
          break;
        default:
          Ua(
            u,
            i,
            f,
            s,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Sn(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, n = a.flags;
        switch (a.tag) {
          case 22:
            Sn(e, a), n & 2048 && Gc(
              a.alternate,
              a
            );
            break;
          case 24:
            Sn(e, a), n & 2048 && Xc(a.alternate, a);
            break;
          default:
            Sn(e, a);
        }
        t = t.sibling;
      }
  }
  var zn = 8192;
  function Na(l, t, e) {
    if (l.subtreeFlags & zn)
      for (l = l.child; l !== null; )
        _r(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function _r(l, t, e) {
    switch (l.tag) {
      case 26:
        Na(
          l,
          t,
          e
        ), l.flags & zn && l.memoizedState !== null && Xh(
          e,
          Nt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Na(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Nt;
        Nt = Zu(l.stateNode.containerInfo), Na(
          l,
          t,
          e
        ), Nt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = zn, zn = 16777216, Na(
          l,
          t,
          e
        ), zn = a) : Na(
          l,
          t,
          e
        ));
        break;
      default:
        Na(
          l,
          t,
          e
        );
    }
  }
  function Or(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function En(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Vl = a, xr(
            a,
            l
          );
        }
      Or(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        Mr(l), l = l.sibling;
  }
  function Mr(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        En(l), l.flags & 2048 && ze(9, l, l.return);
        break;
      case 3:
        En(l);
        break;
      case 12:
        En(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, Du(l)) : En(l);
        break;
      default:
        En(l);
    }
  }
  function Du(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Vl = a, xr(
            a,
            l
          );
        }
      Or(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          ze(8, t, t.return), Du(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, Du(t));
          break;
        default:
          Du(t);
      }
      l = l.sibling;
    }
  }
  function xr(l, t) {
    for (; Vl !== null; ) {
      var e = Vl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ze(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          nn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Vl = a;
      else
        l: for (e = l; Vl !== null; ) {
          a = Vl;
          var n = a.sibling, u = a.return;
          if (br(a), a === e) {
            Vl = null;
            break l;
          }
          if (n !== null) {
            n.return = u, Vl = n;
            break l;
          }
          Vl = u;
        }
    }
  }
  var th = {
    getCacheForType: function(l) {
      var t = kl(Rl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return kl(Rl).controller.signal;
    }
  }, eh = typeof WeakMap == "function" ? WeakMap : Map, rl = 0, bl = null, ll = null, el = 0, dl = 0, vt = null, Ee = !1, Ra = !1, Qc = !1, ae = 0, Ml = 0, Te = 0, Pe = 0, Zc = 0, gt = 0, Ca = 0, Tn = null, ut = null, Vc = !1, Uu = 0, Dr = 0, Nu = 1 / 0, Ru = null, Ae = null, jl = 0, _e = null, Ha = null, ne = 0, Lc = 0, Kc = null, Ur = null, An = 0, wc = null;
  function bt() {
    return (rl & 2) !== 0 && el !== 0 ? el & -el : z.T !== null ? Ic() : Kf();
  }
  function Nr() {
    if (gt === 0)
      if ((el & 536870912) === 0 || ul) {
        var l = Xn;
        Xn <<= 1, (Xn & 3932160) === 0 && (Xn = 262144), gt = l;
      } else gt = 536870912;
    return l = yt.current, l !== null && (l.flags |= 32), gt;
  }
  function it(l, t, e) {
    (l === bl && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null) && (qa(l, 0), Oe(
      l,
      el,
      gt,
      !1
    )), La(l, e), ((rl & 2) === 0 || l !== bl) && (l === bl && ((rl & 2) === 0 && (Pe |= e), Ml === 4 && Oe(
      l,
      el,
      gt,
      !1
    )), jt(l));
  }
  function Rr(l, t, e) {
    if ((rl & 6) !== 0) throw Error(o(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Va(l, t), n = a ? uh(l, t) : kc(l, t, !0), u = a;
    do {
      if (n === 0) {
        Ra && !a && Oe(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, u && !ah(e)) {
          n = kc(l, t, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = t, l.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var f = l;
              n = Tn;
              var s = f.current.memoizedState.isDehydrated;
              if (s && (qa(f, i).flags |= 256), i = kc(
                f,
                i,
                !1
              ), i !== 2) {
                if (Qc && !s) {
                  f.errorRecoveryDisabledLanes |= u, Pe |= u, n = 4;
                  break l;
                }
                u = ut, ut = n, u !== null && (ut === null ? ut = u : ut.push.apply(
                  ut,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          qa(l, 0), Oe(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Oe(
                a,
                t,
                gt,
                !Ee
              );
              break l;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (n = Uu + 300 - ot(), 10 < n)) {
            if (Oe(
              a,
              t,
              gt,
              !Ee
            ), Zn(a, 0, !0) !== 0) break l;
            ne = t, a.timeoutHandle = od(
              Cr.bind(
                null,
                a,
                e,
                ut,
                Ru,
                Vc,
                t,
                gt,
                Pe,
                Ca,
                Ee,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break l;
          }
          Cr(
            a,
            e,
            ut,
            Ru,
            Vc,
            t,
            gt,
            Pe,
            Ca,
            Ee,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    jt(l);
  }
  function Cr(l, t, e, a, n, u, i, f, s, b, E, _, p, S) {
    if (l.timeoutHandle = -1, _ = t.subtreeFlags, _ & 8192 || (_ & 16785408) === 16785408) {
      _ = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Vt
      }, _r(
        t,
        u,
        _
      );
      var G = (u & 62914560) === u ? Uu - ot() : (u & 4194048) === u ? Dr - ot() : 0;
      if (G = Qh(
        _,
        G
      ), G !== null) {
        ne = u, l.cancelPendingCommit = G(
          Qr.bind(
            null,
            l,
            t,
            u,
            e,
            a,
            n,
            i,
            f,
            s,
            E,
            _,
            null,
            p,
            S
          )
        ), Oe(l, u, i, !b);
        return;
      }
    }
    Qr(
      l,
      t,
      u,
      e,
      a,
      n,
      i,
      f,
      s
    );
  }
  function ah(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!dt(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Oe(l, t, e, a) {
    t &= ~Zc, t &= ~Pe, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var n = t; 0 < n; ) {
      var u = 31 - rt(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && Zf(l, e, t);
  }
  function Cu() {
    return (rl & 6) === 0 ? (_n(0), !1) : !0;
  }
  function Jc() {
    if (ll !== null) {
      if (dl === 0)
        var l = ll.return;
      else
        l = ll, Jt = Le = null, oc(l), _a = null, cn = 0, l = ll;
      for (; l !== null; )
        sr(l.alternate, l), l = l.return;
      ll = null;
    }
  }
  function qa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Th(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), ne = 0, Jc(), bl = l, ll = e = Kt(l.current, null), el = t, dl = 0, vt = null, Ee = !1, Ra = Va(l, t), Qc = !1, Ca = gt = Zc = Pe = Te = Ml = 0, ut = Tn = null, Vc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - rt(a), u = 1 << n;
        t |= l[n], a &= ~u;
      }
    return ae = t, lu(), e;
  }
  function Hr(l, t) {
    $ = null, z.H = hn, t === Aa || t === fu ? (t = $o(), dl = 3) : t === Fi ? (t = $o(), dl = 4) : dl = t === _c ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, vt = t, ll === null && (Ml = 1, Eu(
      l,
      Tt(t, l.current)
    ));
  }
  function qr() {
    var l = yt.current;
    return l === null ? !0 : (el & 4194048) === el ? Mt === null : (el & 62914560) === el || (el & 536870912) !== 0 ? l === Mt : !1;
  }
  function Br() {
    var l = z.H;
    return z.H = hn, l === null ? hn : l;
  }
  function Yr() {
    var l = z.A;
    return z.A = th, l;
  }
  function Hu() {
    Ml = 4, Ee || (el & 4194048) !== el && yt.current !== null || (Ra = !0), (Te & 134217727) === 0 && (Pe & 134217727) === 0 || bl === null || Oe(
      bl,
      el,
      gt,
      !1
    );
  }
  function kc(l, t, e) {
    var a = rl;
    rl |= 2;
    var n = Br(), u = Yr();
    (bl !== l || el !== t) && (Ru = null, qa(l, t)), t = !1;
    var i = Ml;
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          var f = ll, s = vt;
          switch (dl) {
            case 8:
              Jc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              yt.current === null && (t = !0);
              var b = dl;
              if (dl = 0, vt = null, Ba(l, f, s, b), e && Ra) {
                i = 0;
                break l;
              }
              break;
            default:
              b = dl, dl = 0, vt = null, Ba(l, f, s, b);
          }
        }
        nh(), i = Ml;
        break;
      } catch (E) {
        Hr(l, E);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Jt = Le = null, rl = a, z.H = n, z.A = u, ll === null && (bl = null, el = 0, lu()), i;
  }
  function nh() {
    for (; ll !== null; ) jr(ll);
  }
  function uh(l, t) {
    var e = rl;
    rl |= 2;
    var a = Br(), n = Yr();
    bl !== l || el !== t ? (Ru = null, Nu = ot() + 500, qa(l, t)) : Ra = Va(
      l,
      t
    );
    l: do
      try {
        if (dl !== 0 && ll !== null) {
          t = ll;
          var u = vt;
          t: switch (dl) {
            case 1:
              dl = 0, vt = null, Ba(l, t, u, 1);
              break;
            case 2:
            case 9:
              if (ko(u)) {
                dl = 0, vt = null, Gr(t);
                break;
              }
              t = function() {
                dl !== 2 && dl !== 9 || bl !== l || (dl = 7), jt(l);
              }, u.then(t, t);
              break l;
            case 3:
              dl = 7;
              break l;
            case 4:
              dl = 5;
              break l;
            case 7:
              ko(u) ? (dl = 0, vt = null, Gr(t)) : (dl = 0, vt = null, Ba(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (ll.tag) {
                case 26:
                  i = ll.memoizedState;
                case 5:
                case 27:
                  var f = ll;
                  if (i ? Ad(i) : f.stateNode.complete) {
                    dl = 0, vt = null;
                    var s = f.sibling;
                    if (s !== null) ll = s;
                    else {
                      var b = f.return;
                      b !== null ? (ll = b, qu(b)) : ll = null;
                    }
                    break t;
                  }
              }
              dl = 0, vt = null, Ba(l, t, u, 5);
              break;
            case 6:
              dl = 0, vt = null, Ba(l, t, u, 6);
              break;
            case 8:
              Jc(), Ml = 6;
              break l;
            default:
              throw Error(o(462));
          }
        }
        ih();
        break;
      } catch (E) {
        Hr(l, E);
      }
    while (!0);
    return Jt = Le = null, z.H = a, z.A = n, rl = e, ll !== null ? 0 : (bl = null, el = 0, lu(), Ml);
  }
  function ih() {
    for (; ll !== null && !Dm(); )
      jr(ll);
  }
  function jr(l) {
    var t = fr(l.alternate, l, ae);
    l.memoizedProps = l.pendingProps, t === null ? qu(l) : ll = t;
  }
  function Gr(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = er(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          el
        );
        break;
      case 11:
        t = er(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          el
        );
        break;
      case 5:
        oc(t);
      default:
        sr(e, t), t = ll = Yo(t, ae), t = fr(e, t, ae);
    }
    l.memoizedProps = l.pendingProps, t === null ? qu(l) : ll = t;
  }
  function Ba(l, t, e, a) {
    Jt = Le = null, oc(t), _a = null, cn = 0;
    var n = t.return;
    try {
      if (ky(
        l,
        n,
        t,
        e,
        el
      )) {
        Ml = 1, Eu(
          l,
          Tt(e, l.current)
        ), ll = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ll = n, u;
      Ml = 1, Eu(
        l,
        Tt(e, l.current)
      ), ll = null;
      return;
    }
    t.flags & 32768 ? (ul || a === 1 ? l = !0 : Ra || (el & 536870912) !== 0 ? l = !1 : (Ee = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = yt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Xr(t, l)) : qu(t);
  }
  function qu(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Xr(
          t,
          Ee
        );
        return;
      }
      l = t.return;
      var e = Fy(
        t.alternate,
        t,
        ae
      );
      if (e !== null) {
        ll = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        ll = t;
        return;
      }
      ll = t = l;
    } while (t !== null);
    Ml === 0 && (Ml = 5);
  }
  function Xr(l, t) {
    do {
      var e = Iy(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, ll = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        ll = l;
        return;
      }
      ll = l = e;
    } while (l !== null);
    Ml = 6, ll = null;
  }
  function Qr(l, t, e, a, n, u, i, f, s) {
    l.cancelPendingCommit = null;
    do
      Bu();
    while (jl !== 0);
    if ((rl & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === l.current) throw Error(o(177));
      if (u = t.lanes | t.childLanes, u |= Bi, Gm(
        l,
        e,
        u,
        i,
        f,
        s
      ), l === bl && (ll = bl = null, el = 0), Ha = t, _e = l, ne = e, Lc = u, Kc = n, Ur = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, sh(jn, function() {
        return wr(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, n = U.p, U.p = 2, i = rl, rl |= 4;
        try {
          Py(l, t, e);
        } finally {
          rl = i, U.p = n, z.T = a;
        }
      }
      jl = 1, Zr(), Vr(), Lr();
    }
  }
  function Zr() {
    if (jl === 1) {
      jl = 0;
      var l = _e, t = Ha, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var n = rl;
        rl |= 4;
        try {
          Er(t, l);
          var u = cf, i = xo(l.containerInfo), f = u.focusedElem, s = u.selectionRange;
          if (i !== f && f && f.ownerDocument && Mo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (s !== null && Ni(f)) {
              var b = s.start, E = s.end;
              if (E === void 0 && (E = b), "selectionStart" in f)
                f.selectionStart = b, f.selectionEnd = Math.min(
                  E,
                  f.value.length
                );
              else {
                var _ = f.ownerDocument || document, p = _ && _.defaultView || window;
                if (p.getSelection) {
                  var S = p.getSelection(), G = f.textContent.length, w = Math.min(s.start, G), vl = s.end === void 0 ? w : Math.min(s.end, G);
                  !S.extend && w > vl && (i = vl, vl = w, w = i);
                  var h = Oo(
                    f,
                    w
                  ), r = Oo(
                    f,
                    vl
                  );
                  if (h && r && (S.rangeCount !== 1 || S.anchorNode !== h.node || S.anchorOffset !== h.offset || S.focusNode !== r.node || S.focusOffset !== r.offset)) {
                    var g = _.createRange();
                    g.setStart(h.node, h.offset), S.removeAllRanges(), w > vl ? (S.addRange(g), S.extend(r.node, r.offset)) : (g.setEnd(r.node, r.offset), S.addRange(g));
                  }
                }
              }
            }
            for (_ = [], S = f; S = S.parentNode; )
              S.nodeType === 1 && _.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < _.length; f++) {
              var A = _[f];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          ku = !!uf, cf = uf = null;
        } finally {
          rl = n, U.p = a, z.T = e;
        }
      }
      l.current = t, jl = 2;
    }
  }
  function Vr() {
    if (jl === 2) {
      jl = 0;
      var l = _e, t = Ha, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = U.p;
        U.p = 2;
        var n = rl;
        rl |= 4;
        try {
          gr(l, t.alternate, t);
        } finally {
          rl = n, U.p = a, z.T = e;
        }
      }
      jl = 3;
    }
  }
  function Lr() {
    if (jl === 4 || jl === 3) {
      jl = 0, Um();
      var l = _e, t = Ha, e = ne, a = Ur;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? jl = 5 : (jl = 0, Ha = _e = null, Kr(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (n === 0 && (Ae = null), di(e), t = t.stateNode, st && typeof st.onCommitFiberRoot == "function")
        try {
          st.onCommitFiberRoot(
            Za,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = z.T, n = U.p, U.p = 2, z.T = null;
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var f = a[i];
            u(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          z.T = t, U.p = n;
        }
      }
      (ne & 3) !== 0 && Bu(), jt(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === wc ? An++ : (An = 0, wc = l) : An = 0, _n(0);
    }
  }
  function Kr(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, nn(t)));
  }
  function Bu() {
    return Zr(), Vr(), Lr(), wr();
  }
  function wr() {
    if (jl !== 5) return !1;
    var l = _e, t = Lc;
    Lc = 0;
    var e = di(ne), a = z.T, n = U.p;
    try {
      U.p = 32 > e ? 32 : e, z.T = null, e = Kc, Kc = null;
      var u = _e, i = ne;
      if (jl = 0, Ha = _e = null, ne = 0, (rl & 6) !== 0) throw Error(o(331));
      var f = rl;
      if (rl |= 4, Mr(u.current), Ar(
        u,
        u.current,
        i,
        e
      ), rl = f, _n(0, !1), st && typeof st.onPostCommitFiberRoot == "function")
        try {
          st.onPostCommitFiberRoot(Za, u);
        } catch {
        }
      return !0;
    } finally {
      U.p = n, z.T = a, Kr(l, t);
    }
  }
  function Jr(l, t, e) {
    t = Tt(e, t), t = Ac(l.stateNode, t, 2), l = be(l, t, 2), l !== null && (La(l, 2), jt(l));
  }
  function ml(l, t, e) {
    if (l.tag === 3)
      Jr(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Jr(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ae === null || !Ae.has(a))) {
            l = Tt(e, l), e = ks(2), a = be(t, e, 2), a !== null && (Ws(
              e,
              a,
              t,
              l
            ), La(a, 2), jt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Wc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new eh();
      var n = /* @__PURE__ */ new Set();
      a.set(t, n);
    } else
      n = a.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(t, n));
    n.has(e) || (Qc = !0, n.add(e), l = ch.bind(null, l, t, e), t.then(l, l));
  }
  function ch(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, bl === l && (el & e) === e && (Ml === 4 || Ml === 3 && (el & 62914560) === el && 300 > ot() - Uu ? (rl & 2) === 0 && qa(l, 0) : Zc |= e, Ca === el && (Ca = 0)), jt(l);
  }
  function kr(l, t) {
    t === 0 && (t = Qf()), l = Qe(l, t), l !== null && (La(l, t), jt(l));
  }
  function fh(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), kr(l, e);
  }
  function oh(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, n = l.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(t), kr(l, e);
  }
  function sh(l, t) {
    return fi(l, t);
  }
  var Yu = null, Ya = null, $c = !1, ju = !1, Fc = !1, Me = 0;
  function jt(l) {
    l !== Ya && l.next === null && (Ya === null ? Yu = Ya = l : Ya = Ya.next = l), ju = !0, $c || ($c = !0, dh());
  }
  function _n(l, t) {
    if (!Fc && ju) {
      Fc = !0;
      do
        for (var e = !1, a = Yu; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - rt(42 | l) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Ir(a, u));
          } else
            u = el, u = Zn(
              a,
              a === bl ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Va(a, u) || (e = !0, Ir(a, u));
          a = a.next;
        }
      while (e);
      Fc = !1;
    }
  }
  function rh() {
    Wr();
  }
  function Wr() {
    ju = $c = !1;
    var l = 0;
    Me !== 0 && Eh() && (l = Me);
    for (var t = ot(), e = null, a = Yu; a !== null; ) {
      var n = a.next, u = $r(a, t);
      u === 0 ? (a.next = null, e === null ? Yu = n : e.next = n, n === null && (Ya = e)) : (e = a, (l !== 0 || (u & 3) !== 0) && (ju = !0)), a = n;
    }
    jl !== 0 && jl !== 5 || _n(l), Me !== 0 && (Me = 0);
  }
  function $r(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, n = l.expirationTimes, u = l.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - rt(u), f = 1 << i, s = n[i];
      s === -1 ? ((f & e) === 0 || (f & a) !== 0) && (n[i] = jm(f, t)) : s <= t && (l.expiredLanes |= f), u &= ~f;
    }
    if (t = bl, e = el, e = Zn(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && oi(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Va(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && oi(a), di(e)) {
        case 2:
        case 8:
          e = Gf;
          break;
        case 32:
          e = jn;
          break;
        case 268435456:
          e = Xf;
          break;
        default:
          e = jn;
      }
      return a = Fr.bind(null, l), e = fi(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && oi(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Fr(l, t) {
    if (jl !== 0 && jl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (Bu() && l.callbackNode !== e)
      return null;
    var a = el;
    return a = Zn(
      l,
      l === bl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (Rr(l, a, t), $r(l, ot()), l.callbackNode != null && l.callbackNode === e ? Fr.bind(null, l) : null);
  }
  function Ir(l, t) {
    if (Bu()) return null;
    Rr(l, t, !0);
  }
  function dh() {
    Ah(function() {
      (rl & 6) !== 0 ? fi(
        jf,
        rh
      ) : Wr();
    });
  }
  function Ic() {
    if (Me === 0) {
      var l = Ea;
      l === 0 && (l = Gn, Gn <<= 1, (Gn & 261888) === 0 && (Gn = 256)), Me = l;
    }
    return Me;
  }
  function Pr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : wn("" + l);
  }
  function ld(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function mh(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = Pr(
        (n[lt] || null).action
      ), i = a.submitter;
      i && (t = (t = i[lt] || null) ? Pr(t.formAction) : i.getAttribute("formAction"), t !== null && (u = t, i = null));
      var f = new $n(
        "action",
        "action",
        null,
        a,
        n
      );
      l.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Me !== 0) {
                  var s = i ? ld(n, i) : new FormData(n);
                  bc(
                    e,
                    {
                      pending: !0,
                      data: s,
                      method: n.method,
                      action: u
                    },
                    null,
                    s
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), s = i ? ld(n, i) : new FormData(n), bc(
                  e,
                  {
                    pending: !0,
                    data: s,
                    method: n.method,
                    action: u
                  },
                  u,
                  s
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Pc = 0; Pc < qi.length; Pc++) {
    var lf = qi[Pc], yh = lf.toLowerCase(), hh = lf[0].toUpperCase() + lf.slice(1);
    Ut(
      yh,
      "on" + hh
    );
  }
  Ut(No, "onAnimationEnd"), Ut(Ro, "onAnimationIteration"), Ut(Co, "onAnimationStart"), Ut("dblclick", "onDoubleClick"), Ut("focusin", "onFocus"), Ut("focusout", "onBlur"), Ut(Ny, "onTransitionRun"), Ut(Ry, "onTransitionStart"), Ut(Cy, "onTransitionCancel"), Ut(Ho, "onTransitionEnd"), fa("onMouseEnter", ["mouseout", "mouseover"]), fa("onMouseLeave", ["mouseout", "mouseover"]), fa("onPointerEnter", ["pointerout", "pointerover"]), fa("onPointerLeave", ["pointerout", "pointerover"]), Ye(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ye(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ye("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ye(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ye(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ye(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var On = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), vh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(On)
  );
  function td(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var f = a[i], s = f.instance, b = f.currentTarget;
            if (f = f.listener, s !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (E) {
              Pn(E);
            }
            n.currentTarget = null, u = s;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], s = f.instance, b = f.currentTarget, f = f.listener, s !== u && n.isPropagationStopped())
              break l;
            u = f, n.currentTarget = b;
            try {
              u(n);
            } catch (E) {
              Pn(E);
            }
            n.currentTarget = null, u = s;
          }
      }
    }
  }
  function tl(l, t) {
    var e = t[mi];
    e === void 0 && (e = t[mi] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (ed(t, l, 2, !1), e.add(a));
  }
  function tf(l, t, e) {
    var a = 0;
    t && (a |= 4), ed(
      e,
      l,
      a,
      t
    );
  }
  var Gu = "_reactListening" + Math.random().toString(36).slice(2);
  function ef(l) {
    if (!l[Gu]) {
      l[Gu] = !0, kf.forEach(function(e) {
        e !== "selectionchange" && (vh.has(e) || tf(e, !1, l), tf(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Gu] || (t[Gu] = !0, tf("selectionchange", !1, t));
    }
  }
  function ed(l, t, e, a) {
    switch (Nd(t)) {
      case 2:
        var n = Lh;
        break;
      case 8:
        n = Kh;
        break;
      default:
        n = bf;
    }
    e = n.bind(
      null,
      t,
      e,
      l
    ), n = void 0, !Ei || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: n
    }) : l.addEventListener(t, e, !0) : n !== void 0 ? l.addEventListener(t, e, {
      passive: n
    }) : l.addEventListener(t, e, !1);
  }
  function af(l, t, e, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var s = i.tag;
              if ((s === 3 || s === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = ua(f), i === null) return;
            if (s = i.tag, s === 5 || s === 6 || s === 26 || s === 27) {
              a = u = i;
              continue l;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    io(function() {
      var b = u, E = Si(e), _ = [];
      l: {
        var p = qo.get(l);
        if (p !== void 0) {
          var S = $n, G = l;
          switch (l) {
            case "keypress":
              if (kn(e) === 0) break l;
            case "keydown":
            case "keyup":
              S = oy;
              break;
            case "focusin":
              G = "focus", S = Oi;
              break;
            case "focusout":
              G = "blur", S = Oi;
              break;
            case "beforeblur":
            case "afterblur":
              S = Oi;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              S = oo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = Fm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = dy;
              break;
            case No:
            case Ro:
            case Co:
              S = ly;
              break;
            case Ho:
              S = yy;
              break;
            case "scroll":
            case "scrollend":
              S = Wm;
              break;
            case "wheel":
              S = vy;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = ey;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = ro;
              break;
            case "toggle":
            case "beforetoggle":
              S = by;
          }
          var w = (t & 4) !== 0, vl = !w && (l === "scroll" || l === "scrollend"), h = w ? p !== null ? p + "Capture" : null : p;
          w = [];
          for (var r = b, g; r !== null; ) {
            var A = r;
            if (g = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || g === null || h === null || (A = Ja(r, h), A != null && w.push(
              Mn(r, A, g)
            )), vl) break;
            r = r.return;
          }
          0 < w.length && (p = new S(
            p,
            G,
            null,
            e,
            E
          ), _.push({ event: p, listeners: w }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (p = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", p && e !== pi && (G = e.relatedTarget || e.fromElement) && (ua(G) || G[na]))
            break l;
          if ((S || p) && (p = E.window === E ? E : (p = E.ownerDocument) ? p.defaultView || p.parentWindow : window, S ? (G = e.relatedTarget || e.toElement, S = b, G = G ? ua(G) : null, G !== null && (vl = D(G), w = G.tag, G !== vl || w !== 5 && w !== 27 && w !== 6) && (G = null)) : (S = null, G = b), S !== G)) {
            if (w = oo, A = "onMouseLeave", h = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (w = ro, A = "onPointerLeave", h = "onPointerEnter", r = "pointer"), vl = S == null ? p : wa(S), g = G == null ? p : wa(G), p = new w(
              A,
              r + "leave",
              S,
              e,
              E
            ), p.target = vl, p.relatedTarget = g, A = null, ua(E) === b && (w = new w(
              h,
              r + "enter",
              G,
              e,
              E
            ), w.target = g, w.relatedTarget = vl, A = w), vl = A, S && G)
              t: {
                for (w = gh, h = S, r = G, g = 0, A = h; A; A = w(A))
                  g++;
                A = 0;
                for (var V = r; V; V = w(V))
                  A++;
                for (; 0 < g - A; )
                  h = w(h), g--;
                for (; 0 < A - g; )
                  r = w(r), A--;
                for (; g--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    w = h;
                    break t;
                  }
                  h = w(h), r = w(r);
                }
                w = null;
              }
            else w = null;
            S !== null && ad(
              _,
              p,
              S,
              w,
              !1
            ), G !== null && vl !== null && ad(
              _,
              vl,
              G,
              w,
              !0
            );
          }
        }
        l: {
          if (p = b ? wa(b) : window, S = p.nodeName && p.nodeName.toLowerCase(), S === "select" || S === "input" && p.type === "file")
            var fl = So;
          else if (bo(p))
            if (zo)
              fl = xy;
            else {
              fl = Oy;
              var X = _y;
            }
          else
            S = p.nodeName, !S || S.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? b && bi(b.elementType) && (fl = So) : fl = My;
          if (fl && (fl = fl(l, b))) {
            po(
              _,
              fl,
              e,
              E
            );
            break l;
          }
          X && X(l, p, b), l === "focusout" && b && p.type === "number" && b.memoizedProps.value != null && gi(p, "number", p.value);
        }
        switch (X = b ? wa(b) : window, l) {
          case "focusin":
            (bo(X) || X.contentEditable === "true") && (ya = X, Ri = b, tn = null);
            break;
          case "focusout":
            tn = Ri = ya = null;
            break;
          case "mousedown":
            Ci = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ci = !1, Do(_, e, E);
            break;
          case "selectionchange":
            if (Uy) break;
          case "keydown":
          case "keyup":
            Do(_, e, E);
        }
        var F;
        if (xi)
          l: {
            switch (l) {
              case "compositionstart":
                var al = "onCompositionStart";
                break l;
              case "compositionend":
                al = "onCompositionEnd";
                break l;
              case "compositionupdate":
                al = "onCompositionUpdate";
                break l;
            }
            al = void 0;
          }
        else
          ma ? vo(l, e) && (al = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (al = "onCompositionStart");
        al && (mo && e.locale !== "ko" && (ma || al !== "onCompositionStart" ? al === "onCompositionEnd" && ma && (F = co()) : (re = E, Ti = "value" in re ? re.value : re.textContent, ma = !0)), X = Xu(b, al), 0 < X.length && (al = new so(
          al,
          l,
          null,
          e,
          E
        ), _.push({ event: al, listeners: X }), F ? al.data = F : (F = go(e), F !== null && (al.data = F)))), (F = Sy ? zy(l, e) : Ey(l, e)) && (al = Xu(b, "onBeforeInput"), 0 < al.length && (X = new so(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), _.push({
          event: X,
          listeners: al
        }), X.data = F)), mh(
          _,
          l,
          b,
          e,
          E
        );
      }
      td(_, t);
    });
  }
  function Mn(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function Xu(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ja(l, e), n != null && a.unshift(
        Mn(l, n, u)
      ), n = Ja(l, t), n != null && a.push(
        Mn(l, n, u)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function gh(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function ad(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var f = e, s = f.alternate, b = f.stateNode;
      if (f = f.tag, s !== null && s === a) break;
      f !== 5 && f !== 26 && f !== 27 || b === null || (s = b, n ? (b = Ja(e, u), b != null && i.unshift(
        Mn(e, b, s)
      )) : n || (b = Ja(e, u), b != null && i.push(
        Mn(e, b, s)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var bh = /\r\n?/g, ph = /\u0000|\uFFFD/g;
  function nd(l) {
    return (typeof l == "string" ? l : "" + l).replace(bh, `
`).replace(ph, "");
  }
  function ud(l, t) {
    return t = nd(t), nd(l) === t;
  }
  function hl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || sa(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && sa(l, "" + a);
        break;
      case "className":
        Ln(l, "class", a);
        break;
      case "tabIndex":
        Ln(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ln(l, e, a);
        break;
      case "style":
        no(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          Ln(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = wn("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (t !== "input" && hl(l, t, "name", n.name, n, null), hl(
            l,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), hl(
            l,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), hl(
            l,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (hl(l, t, "encType", n.encType, n, null), hl(l, t, "method", n.method, n, null), hl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = wn("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Vt);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        e = wn("" + a), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        tl("beforetoggle", l), tl("toggle", l), Vn(l, "popover", a);
        break;
      case "xlinkActuate":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Zt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Zt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Zt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Zt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Vn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Jm.get(e) || e, Vn(l, e, a));
    }
  }
  function nf(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        no(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(o(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? sa(l, a) : (typeof a == "number" || typeof a == "bigint") && sa(l, "" + a);
        break;
      case "onScroll":
        a != null && tl("scroll", l);
        break;
      case "onScrollEnd":
        a != null && tl("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Vt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Wf.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), t = e.slice(2, n ? e.length - 7 : void 0), u = l[lt] || null, u = u != null ? u[e] : null, typeof u == "function" && l.removeEventListener(t, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, n);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : Vn(l, e, a);
          }
    }
  }
  function $l(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        tl("error", l), tl("load", l);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  hl(l, t, u, i, e, null);
              }
          }
        n && hl(l, t, "srcSet", e.srcSet, e, null), a && hl(l, t, "src", e.src, e, null);
        return;
      case "input":
        tl("invalid", l);
        var f = u = i = n = null, s = null, b = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  n = E;
                  break;
                case "type":
                  i = E;
                  break;
                case "checked":
                  s = E;
                  break;
                case "defaultChecked":
                  b = E;
                  break;
                case "value":
                  u = E;
                  break;
                case "defaultValue":
                  f = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(o(137, t));
                  break;
                default:
                  hl(l, t, a, E, e, null);
              }
          }
        lo(
          l,
          u,
          f,
          s,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        tl("invalid", l), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (f = e[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                hl(l, t, n, f, e, null);
            }
        t = u, e = i, l.multiple = !!a, t != null ? oa(l, !!a, t, !1) : e != null && oa(l, !!a, e, !0);
        return;
      case "textarea":
        tl("invalid", l), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (f = e[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(o(91));
                break;
              default:
                hl(l, t, i, f, e, null);
            }
        eo(l, a, n, u);
        return;
      case "option":
        for (s in e)
          e.hasOwnProperty(s) && (a = e[s], a != null) && (s === "selected" ? l.selected = a && typeof a != "function" && typeof a != "symbol" : hl(l, t, s, a, e, null));
        return;
      case "dialog":
        tl("beforetoggle", l), tl("toggle", l), tl("cancel", l), tl("close", l);
        break;
      case "iframe":
      case "object":
        tl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < On.length; a++)
          tl(On[a], l);
        break;
      case "image":
        tl("error", l), tl("load", l);
        break;
      case "details":
        tl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        tl("error", l), tl("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                hl(l, t, b, a, e, null);
            }
        return;
      default:
        if (bi(t)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && nf(
              l,
              t,
              E,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (f in e)
      e.hasOwnProperty(f) && (a = e[f], a != null && hl(l, t, f, a, e, null));
  }
  function Sh(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, i = null, f = null, s = null, b = null, E = null;
        for (S in e) {
          var _ = e[S];
          if (e.hasOwnProperty(S) && _ != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                s = _;
              default:
                a.hasOwnProperty(S) || hl(l, t, S, null, a, _);
            }
        }
        for (var p in a) {
          var S = a[p];
          if (_ = e[p], a.hasOwnProperty(p) && (S != null || _ != null))
            switch (p) {
              case "type":
                u = S;
                break;
              case "name":
                n = S;
                break;
              case "checked":
                b = S;
                break;
              case "defaultChecked":
                E = S;
                break;
              case "value":
                i = S;
                break;
              case "defaultValue":
                f = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(o(137, t));
                break;
              default:
                S !== _ && hl(
                  l,
                  t,
                  p,
                  S,
                  a,
                  _
                );
            }
        }
        vi(
          l,
          i,
          f,
          s,
          b,
          E,
          u,
          n
        );
        return;
      case "select":
        S = i = f = p = null;
        for (u in e)
          if (s = e[u], e.hasOwnProperty(u) && s != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                S = s;
              default:
                a.hasOwnProperty(u) || hl(
                  l,
                  t,
                  u,
                  null,
                  a,
                  s
                );
            }
        for (n in a)
          if (u = a[n], s = e[n], a.hasOwnProperty(n) && (u != null || s != null))
            switch (n) {
              case "value":
                p = u;
                break;
              case "defaultValue":
                f = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== s && hl(
                  l,
                  t,
                  n,
                  u,
                  a,
                  s
                );
            }
        t = f, e = i, a = S, p != null ? oa(l, !!e, p, !1) : !!a != !!e && (t != null ? oa(l, !!e, t, !0) : oa(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        S = p = null;
        for (f in e)
          if (n = e[f], e.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                hl(l, t, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                p = n;
                break;
              case "defaultValue":
                S = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && hl(l, t, i, n, a, u);
            }
        to(l, p, S);
        return;
      case "option":
        for (var G in e)
          p = e[G], e.hasOwnProperty(G) && p != null && !a.hasOwnProperty(G) && (G === "selected" ? l.selected = !1 : hl(
            l,
            t,
            G,
            null,
            a,
            p
          ));
        for (s in a)
          p = a[s], S = e[s], a.hasOwnProperty(s) && p !== S && (p != null || S != null) && (s === "selected" ? l.selected = p && typeof p != "function" && typeof p != "symbol" : hl(
            l,
            t,
            s,
            p,
            a,
            S
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var w in e)
          p = e[w], e.hasOwnProperty(w) && p != null && !a.hasOwnProperty(w) && hl(l, t, w, null, a, p);
        for (b in a)
          if (p = a[b], S = e[b], a.hasOwnProperty(b) && p !== S && (p != null || S != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(o(137, t));
                break;
              default:
                hl(
                  l,
                  t,
                  b,
                  p,
                  a,
                  S
                );
            }
        return;
      default:
        if (bi(t)) {
          for (var vl in e)
            p = e[vl], e.hasOwnProperty(vl) && p !== void 0 && !a.hasOwnProperty(vl) && nf(
              l,
              t,
              vl,
              void 0,
              a,
              p
            );
          for (E in a)
            p = a[E], S = e[E], !a.hasOwnProperty(E) || p === S || p === void 0 && S === void 0 || nf(
              l,
              t,
              E,
              p,
              a,
              S
            );
          return;
        }
    }
    for (var h in e)
      p = e[h], e.hasOwnProperty(h) && p != null && !a.hasOwnProperty(h) && hl(l, t, h, null, a, p);
    for (_ in a)
      p = a[_], S = e[_], !a.hasOwnProperty(_) || p === S || p == null && S == null || hl(l, t, _, p, a, S);
  }
  function id(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function zh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && id(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < e.length; a++) {
            var s = e[a], b = s.startTime;
            if (b > f) break;
            var E = s.transferSize, _ = s.initiatorType;
            E && id(_) && (s = s.responseEnd, i += E * (s < f ? 1 : (f - b) / (s - b)));
          }
          if (--a, t += 8 * (u + i) / (n.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var uf = null, cf = null;
  function Qu(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function cd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function fd(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function ff(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var of = null;
  function Eh() {
    var l = window.event;
    return l && l.type === "popstate" ? l === of ? !1 : (of = l, !0) : (of = null, !1);
  }
  var od = typeof setTimeout == "function" ? setTimeout : void 0, Th = typeof clearTimeout == "function" ? clearTimeout : void 0, sd = typeof Promise == "function" ? Promise : void 0, Ah = typeof queueMicrotask == "function" ? queueMicrotask : typeof sd < "u" ? function(l) {
    return sd.resolve(null).then(l).catch(_h);
  } : od;
  function _h(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function xe(l) {
    return l === "head";
  }
  function rd(l, t) {
    var e = t, a = 0;
    do {
      var n = e.nextSibling;
      if (l.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(n), Qa(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          xn(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, xn(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[Ka] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && xn(l.ownerDocument.body);
      e = n;
    } while (e);
    Qa(t);
  }
  function dd(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function sf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          sf(e), yi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Oh(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var n = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ka])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (u = l.getAttribute("rel"), u === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || l.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || l.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (u = l.getAttribute("src"), (u !== (n.src == null ? null : n.src) || l.getAttribute("type") !== (n.type == null ? null : n.type) || l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u)
          return l;
      } else return l;
      if (l = xt(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Mh(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function md(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = xt(l.nextSibling), l === null)) return null;
    return l;
  }
  function rf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function df(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function xh(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function xt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var mf = null;
  function yd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return xt(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function hd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function vd(l, t, e) {
    switch (t = Qu(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(o(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(o(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(o(454));
        return l;
      default:
        throw Error(o(451));
    }
  }
  function xn(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    yi(l);
  }
  var Dt = /* @__PURE__ */ new Map(), gd = /* @__PURE__ */ new Set();
  function Zu(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var ue = U.d;
  U.d = {
    f: Dh,
    r: Uh,
    D: Nh,
    C: Rh,
    L: Ch,
    m: Hh,
    X: Bh,
    S: qh,
    M: Yh
  };
  function Dh() {
    var l = ue.f(), t = Cu();
    return l || t;
  }
  function Uh(l) {
    var t = ia(l);
    t !== null && t.tag === 5 && t.type === "form" ? Hs(t) : ue.r(l);
  }
  var ja = typeof document > "u" ? null : document;
  function bd(l, t, e) {
    var a = ja;
    if (a && typeof t == "string" && t) {
      var n = zt(t);
      n = 'link[rel="' + l + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), gd.has(n) || (gd.add(n), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(n) === null && (t = a.createElement("link"), $l(t, "link", l), Zl(t), a.head.appendChild(t)));
    }
  }
  function Nh(l) {
    ue.D(l), bd("dns-prefetch", l, null);
  }
  function Rh(l, t) {
    ue.C(l, t), bd("preconnect", l, t);
  }
  function Ch(l, t, e) {
    ue.L(l, t, e);
    var a = ja;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + zt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + zt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + zt(
        e.imageSizes
      ) + '"]')) : n += '[href="' + zt(l) + '"]';
      var u = n;
      switch (t) {
        case "style":
          u = Ga(l);
          break;
        case "script":
          u = Xa(l);
      }
      Dt.has(u) || (l = C(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), Dt.set(u, l), a.querySelector(n) !== null || t === "style" && a.querySelector(Dn(u)) || t === "script" && a.querySelector(Un(u)) || (t = a.createElement("link"), $l(t, "link", l), Zl(t), a.head.appendChild(t)));
    }
  }
  function Hh(l, t) {
    ue.m(l, t);
    var e = ja;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + zt(a) + '"][href="' + zt(l) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Xa(l);
      }
      if (!Dt.has(u) && (l = C({ rel: "modulepreload", href: l }, t), Dt.set(u, l), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Un(u)))
              return;
        }
        a = e.createElement("link"), $l(a, "link", l), Zl(a), e.head.appendChild(a);
      }
    }
  }
  function qh(l, t, e) {
    ue.S(l, t, e);
    var a = ja;
    if (a && l) {
      var n = ca(a).hoistableStyles, u = Ga(l);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Dn(u)
        ))
          f.loading = 5;
        else {
          l = C(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = Dt.get(u)) && yf(l, e);
          var s = i = a.createElement("link");
          Zl(s), $l(s, "link", l), s._p = new Promise(function(b, E) {
            s.onload = b, s.onerror = E;
          }), s.addEventListener("load", function() {
            f.loading |= 1;
          }), s.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, Vu(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: f
        }, n.set(u, i);
      }
    }
  }
  function Bh(l, t) {
    ue.X(l, t);
    var e = ja;
    if (e && l) {
      var a = ca(e).hoistableScripts, n = Xa(l), u = a.get(n);
      u || (u = e.querySelector(Un(n)), u || (l = C({ src: l, async: !0 }, t), (t = Dt.get(n)) && hf(l, t), u = e.createElement("script"), Zl(u), $l(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Yh(l, t) {
    ue.M(l, t);
    var e = ja;
    if (e && l) {
      var a = ca(e).hoistableScripts, n = Xa(l), u = a.get(n);
      u || (u = e.querySelector(Un(n)), u || (l = C({ src: l, async: !0, type: "module" }, t), (t = Dt.get(n)) && hf(l, t), u = e.createElement("script"), Zl(u), $l(u, "link", l), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function pd(l, t, e, a) {
    var n = (n = L.current) ? Zu(n) : null;
    if (!n) throw Error(o(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Ga(e.href), e = ca(
          n
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Ga(e.href);
          var u = ca(
            n
          ).hoistableStyles, i = u.get(l);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(l, i), (u = n.querySelector(
            Dn(l)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Dt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Dt.set(l, e), u || jh(
            n,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Xa(e), e = ca(
          n
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, l));
    }
  }
  function Ga(l) {
    return 'href="' + zt(l) + '"';
  }
  function Dn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Sd(l) {
    return C({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function jh(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), $l(t, "link", e), Zl(t), l.head.appendChild(t));
  }
  function Xa(l) {
    return '[src="' + zt(l) + '"]';
  }
  function Un(l) {
    return "script[async]" + l;
  }
  function zd(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + zt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Zl(a), a;
          var n = C({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Zl(a), $l(a, "style", n), Vu(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          n = Ga(e.href);
          var u = l.querySelector(
            Dn(n)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Zl(u), u;
          a = Sd(e), (n = Dt.get(n)) && yf(a, n), u = (l.ownerDocument || l).createElement("link"), Zl(u);
          var i = u;
          return i._p = new Promise(function(f, s) {
            i.onload = f, i.onerror = s;
          }), $l(u, "link", a), t.state.loading |= 4, Vu(u, e.precedence, l), t.instance = u;
        case "script":
          return u = Xa(e.src), (n = l.querySelector(
            Un(u)
          )) ? (t.instance = n, Zl(n), n) : (a = e, (n = Dt.get(u)) && (a = C({}, e), hf(a, n)), l = l.ownerDocument || l, n = l.createElement("script"), Zl(n), $l(n, "link", a), l.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Vu(a, e.precedence, l));
    return t.instance;
  }
  function Vu(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === t) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(l, u.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function yf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function hf(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Lu = null;
  function Ed(l, t, e) {
    if (Lu === null) {
      var a = /* @__PURE__ */ new Map(), n = Lu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Lu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Ka] || u[wl] || l === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Td(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Gh(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (l = t.disabled, typeof t.precedence == "string" && l == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Ad(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Xh(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Ga(a.href), u = t.querySelector(
          Dn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Ku.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, Zl(u);
          return;
        }
        u = t.ownerDocument || t, a = Sd(a), (n = Dt.get(n)) && yf(a, n), u = u.createElement("link"), Zl(u);
        var i = u;
        i._p = new Promise(function(f, s) {
          i.onload = f, i.onerror = s;
        }), $l(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Ku.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var vf = 0;
  function Qh(l, t) {
    return l.stylesheets && l.count === 0 && Ju(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && Ju(l, l.stylesheets), l.unsuspend) {
          var u = l.unsuspend;
          l.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < l.imgBytes && vf === 0 && (vf = 62500 * zh());
      var n = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Ju(l, l.stylesheets), l.unsuspend)) {
            var u = l.unsuspend;
            l.unsuspend = null, u();
          }
        },
        (l.imgBytes > vf ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ku() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ju(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var wu = null;
  function Ju(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, wu = /* @__PURE__ */ new Map(), t.forEach(Zh, l), wu = null, Ku.call(l));
  }
  function Zh(l, t) {
    if (!(t.state.loading & 4)) {
      var e = wu.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), wu.set(l, e);
        for (var n = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = t.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Ku.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(n, l.firstChild)), t.state.loading |= 4;
    }
  }
  var Nn = {
    $$typeof: _l,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function Vh(l, t, e, a, n, u, i, f, s) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = si(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = si(0), this.hiddenUpdates = si(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function _d(l, t, e, a, n, u, i, f, s, b, E, _) {
    return l = new Vh(
      l,
      t,
      e,
      i,
      s,
      b,
      E,
      _,
      f
    ), t = 1, u === !0 && (t |= 24), u = mt(3, null, null, t), l.current = u, u.stateNode = l, t = ki(), t.refCount++, l.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Ii(u), l;
  }
  function Od(l) {
    return l ? (l = ga, l) : ga;
  }
  function Md(l, t, e, a, n, u) {
    n = Od(n), a.context === null ? a.context = n : a.pendingContext = n, a = ge(t), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = be(l, a, t), e !== null && (it(e, l, t), on(e, l, t));
  }
  function xd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function gf(l, t) {
    xd(l, t), (l = l.alternate) && xd(l, t);
  }
  function Dd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Qe(l, 67108864);
      t !== null && it(t, l, 67108864), gf(l, 67108864);
    }
  }
  function Ud(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = bt();
      t = ri(t);
      var e = Qe(l, t);
      e !== null && it(e, l, t), gf(l, t);
    }
  }
  var ku = !0;
  function Lh(l, t, e, a) {
    var n = z.T;
    z.T = null;
    var u = U.p;
    try {
      U.p = 2, bf(l, t, e, a);
    } finally {
      U.p = u, z.T = n;
    }
  }
  function Kh(l, t, e, a) {
    var n = z.T;
    z.T = null;
    var u = U.p;
    try {
      U.p = 8, bf(l, t, e, a);
    } finally {
      U.p = u, z.T = n;
    }
  }
  function bf(l, t, e, a) {
    if (ku) {
      var n = pf(a);
      if (n === null)
        af(
          l,
          t,
          a,
          Wu,
          e
        ), Rd(l, a);
      else if (Jh(
        n,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (Rd(l, a), t & 4 && -1 < wh.indexOf(l)) {
        for (; n !== null; ) {
          var u = ia(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Be(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var s = 1 << 31 - rt(i);
                      f.entanglements[1] |= s, i &= ~s;
                    }
                    jt(u), (rl & 6) === 0 && (Nu = ot() + 500, _n(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Qe(u, 2), f !== null && it(f, u, 2), Cu(), gf(u, 2);
            }
          if (u = pf(a), u === null && af(
            l,
            t,
            a,
            Wu,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        af(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function pf(l) {
    return l = Si(l), Sf(l);
  }
  var Wu = null;
  function Sf(l) {
    if (Wu = null, l = ua(l), l !== null) {
      var t = D(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = x(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = q(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Wu = l, null;
  }
  function Nd(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Nm()) {
          case jf:
            return 2;
          case Gf:
            return 8;
          case jn:
          case Rm:
            return 32;
          case Xf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var zf = !1, De = null, Ue = null, Ne = null, Rn = /* @__PURE__ */ new Map(), Cn = /* @__PURE__ */ new Map(), Re = [], wh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Rd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        De = null;
        break;
      case "dragenter":
      case "dragleave":
        Ue = null;
        break;
      case "mouseover":
      case "mouseout":
        Ne = null;
        break;
      case "pointerover":
      case "pointerout":
        Rn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cn.delete(t.pointerId);
    }
  }
  function Hn(l, t, e, a, n, u) {
    return l === null || l.nativeEvent !== u ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, t !== null && (t = ia(t), t !== null && Dd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), l);
  }
  function Jh(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return De = Hn(
          De,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Ue = Hn(
          Ue,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Ne = Hn(
          Ne,
          l,
          t,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Rn.set(
          u,
          Hn(
            Rn.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Cn.set(
          u,
          Hn(
            Cn.get(u) || null,
            l,
            t,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Cd(l) {
    var t = ua(l.target);
    if (t !== null) {
      var e = D(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = x(e), t !== null) {
            l.blockedOn = t, wf(l.priority, function() {
              Ud(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = q(e), t !== null) {
            l.blockedOn = t, wf(l.priority, function() {
              Ud(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function $u(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = pf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        pi = a, e.target.dispatchEvent(a), pi = null;
      } else
        return t = ia(e), t !== null && Dd(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function Hd(l, t, e) {
    $u(l) && e.delete(t);
  }
  function kh() {
    zf = !1, De !== null && $u(De) && (De = null), Ue !== null && $u(Ue) && (Ue = null), Ne !== null && $u(Ne) && (Ne = null), Rn.forEach(Hd), Cn.forEach(Hd);
  }
  function Fu(l, t) {
    l.blockedOn === t && (l.blockedOn = null, zf || (zf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      kh
    )));
  }
  var Iu = null;
  function qd(l) {
    Iu !== l && (Iu = l, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Iu === l && (Iu = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], n = l[t + 2];
          if (typeof a != "function") {
            if (Sf(a || e) === null)
              continue;
            break;
          }
          var u = ia(e);
          u !== null && (l.splice(t, 3), t -= 3, bc(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Qa(l) {
    function t(s) {
      return Fu(s, l);
    }
    De !== null && Fu(De, l), Ue !== null && Fu(Ue, l), Ne !== null && Fu(Ne, l), Rn.forEach(t), Cn.forEach(t);
    for (var e = 0; e < Re.length; e++) {
      var a = Re[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Re.length && (e = Re[0], e.blockedOn === null); )
      Cd(e), e.blockedOn === null && Re.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[lt] || null;
        if (typeof u == "function")
          i || qd(e);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[lt] || null)
              f = i.formAction;
            else if (Sf(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? e[a + 1] = f : (e.splice(a, 3), a -= 3), qd(e);
        }
      }
  }
  function Bd() {
    function l(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
      };
    }
  }
  function Ef(l) {
    this._internalRoot = l;
  }
  Pu.prototype.render = Ef.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var e = t.current, a = bt();
    Md(e, a, l, t, null, null);
  }, Pu.prototype.unmount = Ef.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      Md(l.current, 2, null, l, null, null), Cu(), t[na] = null;
    }
  };
  function Pu(l) {
    this._internalRoot = l;
  }
  Pu.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Kf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Re.length && t !== 0 && t < Re[e].priority; e++) ;
      Re.splice(e, 0, l), e === 0 && Cd(l);
    }
  };
  var Yd = y.version;
  if (Yd !== "19.2.8")
    throw Error(
      o(
        527,
        Yd,
        "19.2.8"
      )
    );
  U.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(o(188)) : (l = Object.keys(l).join(","), Error(o(268, l)));
    return l = v(t), l = l !== null ? Q(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Wh = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var li = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!li.isDisabled && li.supportsFiber)
      try {
        Za = li.inject(
          Wh
        ), st = li;
      } catch {
      }
  }
  return Bn.createRoot = function(l, t) {
    if (!T(l)) throw Error(o(299));
    var e = !1, a = "", n = Ls, u = Ks, i = ws;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = _d(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      Bd
    ), l[na] = t.current, ef(l), new Ef(t);
  }, Bn.hydrateRoot = function(l, t, e) {
    if (!T(l)) throw Error(o(299));
    var a = !1, n = "", u = Ls, i = Ks, f = ws, s = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError), e.formState !== void 0 && (s = e.formState)), t = _d(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      n,
      s,
      u,
      i,
      f,
      Bd
    ), t.context = Od(null), e = t.current, a = bt(), a = ri(a), n = ge(a), n.callback = null, be(e, n, a), e = a, t.current.lanes = e, La(t, e), jt(t), l[na] = t.current, ef(l), new Pu(t);
  }, Bn.version = "19.2.8", Bn;
}
var Jd;
function cv() {
  if (Jd) return Af.exports;
  Jd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (y) {
        console.error(y);
      }
  }
  return c(), Af.exports = iv(), Af.exports;
}
var fv = cv(), Ll = Cf();
const ov = /* @__PURE__ */ Ih(Ll), sv = /* @__PURE__ */ Fh({
  __proto__: null,
  default: ov
}, [Ll]);
var rv = Object.defineProperty, Hf = (c, y) => rv(c, "name", { value: y, configurable: !0 });
function Uf(c, y) {
  if (typeof c == "function")
    return c(y);
  c != null && (c.current = y);
}
Hf(Uf, "setRef");
function nm(...c) {
  return (y) => {
    let m = !1;
    const o = c.map((T) => {
      const D = Uf(T, y);
      return !m && typeof D == "function" && (m = !0), D;
    });
    if (m)
      return () => {
        for (let T = 0; T < o.length; T++) {
          const D = o[T];
          typeof D == "function" ? D() : Uf(c[T], null);
        }
      };
  };
}
Hf(nm, "composeRefs");
function um(...c) {
  return Ll.useCallback(nm(...c), c);
}
Hf(um, "useComposedRefs");
var dv = Object.defineProperty, Ct = (c, y) => dv(c, "name", { value: y, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function im(c) {
  const y = Ll.forwardRef((m, o) => {
    let { children: T, ...D } = m, x = null, q = !1;
    const M = [];
    Nf(T) && typeof ti == "function" && (T = ti(T._payload)), Ll.Children.forEach(T, (W) => {
      if (sm(W)) {
        q = !0;
        const sl = W;
        let gl = "child" in sl.props ? sl.props.child : sl.props.children;
        Nf(gl) && typeof ti == "function" && (gl = ti(gl._payload)), x = hv(sl, gl), M.push(x?.props?.children);
      } else
        M.push(W);
    }), x ? x = Ll.cloneElement(x, void 0, M) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !q && Ll.Children.count(T) === 1 && Ll.isValidElement(T) && (x = T)
    );
    const v = x ? om(x) : void 0, Q = um(o, v);
    if (!x) {
      if (T || T === 0)
        throw new Error(
          q ? bv(c) : gv(c)
        );
      return T;
    }
    const C = fm(D, x.props ?? {});
    return x.type !== Ll.Fragment && (C.ref = o ? Q : v), Ll.cloneElement(x, C);
  });
  return y.displayName = `${c}.Slot`, y;
}
Ct(im, "createSlot");
var mv = /* @__PURE__ */ im("Slot"), cm = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function yv(c) {
  const y = /* @__PURE__ */ Ct((m) => "child" in m ? m.children(m.child) : m.children, "Slottable");
  return y.displayName = `${c}.Slottable`, y.__radixId = cm, y;
}
Ct(yv, "createSlottable");
var hv = /* @__PURE__ */ Ct((c, y) => {
  if ("child" in c.props) {
    const m = c.props.child;
    return Ll.isValidElement(m) ? Ll.cloneElement(m, void 0, c.props.children(m.props.children)) : null;
  }
  return Ll.isValidElement(y) ? y : null;
}, "getSlottableElementFromSlottable");
function fm(c, y) {
  const m = { ...y };
  for (const o in y) {
    const T = c[o], D = y[o];
    /^on[A-Z]/.test(o) ? T && D ? m[o] = (...q) => {
      const M = D(...q);
      return T(...q), M;
    } : T && (m[o] = T) : o === "style" ? m[o] = { ...T, ...D } : o === "className" && (m[o] = [T, D].filter(Boolean).join(" "));
  }
  return { ...c, ...m };
}
Ct(fm, "mergeProps");
function om(c) {
  let y = Object.getOwnPropertyDescriptor(c.props, "ref")?.get, m = y && "isReactWarning" in y && y.isReactWarning;
  return m ? c.ref : (y = Object.getOwnPropertyDescriptor(c, "ref")?.get, m = y && "isReactWarning" in y && y.isReactWarning, m ? c.props.ref : c.props.ref || c.ref);
}
Ct(om, "getElementRef");
function sm(c) {
  return Ll.isValidElement(c) && typeof c.type == "function" && "__radixId" in c.type && c.type.__radixId === cm;
}
Ct(sm, "isSlottable");
var vv = /* @__PURE__ */ Symbol.for("react.lazy");
function Nf(c) {
  return c != null && typeof c == "object" && "$$typeof" in c && c.$$typeof === vv && "_payload" in c && rm(c._payload);
}
Ct(Nf, "isLazyComponent");
function rm(c) {
  return typeof c == "object" && c !== null && "then" in c;
}
Ct(rm, "isPromiseLike");
var gv = /* @__PURE__ */ Ct((c) => `${c} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), bv = /* @__PURE__ */ Ct((c) => `${c} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), ti = sv[" use ".trim().toString()];
function dm(c) {
  var y, m, o = "";
  if (typeof c == "string" || typeof c == "number") o += c;
  else if (typeof c == "object") if (Array.isArray(c)) {
    var T = c.length;
    for (y = 0; y < T; y++) c[y] && (m = dm(c[y])) && (o && (o += " "), o += m);
  } else for (m in c) c[m] && (o && (o += " "), o += m);
  return o;
}
function mm() {
  for (var c, y, m = 0, o = "", T = arguments.length; m < T; m++) (c = arguments[m]) && (y = dm(c)) && (o && (o += " "), o += y);
  return o;
}
const kd = (c) => typeof c == "boolean" ? `${c}` : c === 0 ? "0" : c, Wd = mm, pv = (c, y) => (m) => {
  var o;
  if (y?.variants == null) return Wd(c, m?.class, m?.className);
  const { variants: T, defaultVariants: D } = y, x = Object.keys(T).map((v) => {
    const Q = m?.[v], C = D?.[v];
    if (Q === null) return null;
    const W = kd(Q) || kd(C);
    return T[v][W];
  }), q = m && Object.entries(m).reduce((v, Q) => {
    let [C, W] = Q;
    return W === void 0 || (v[C] = W), v;
  }, {}), M = y == null || (o = y.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((v, Q) => {
    let { class: C, className: W, ...sl } = Q;
    return Object.entries(sl).every((gl) => {
      let [il, pl] = gl;
      return Array.isArray(pl) ? pl.includes({
        ...D,
        ...q
      }[il]) : {
        ...D,
        ...q
      }[il] === pl;
    }) ? [
      ...v,
      C,
      W
    ] : v;
  }, []);
  return Wd(c, x, M, m?.class, m?.className);
}, Sv = (c, y) => {
  const m = new Array(c.length + y.length);
  for (let o = 0; o < c.length; o++)
    m[o] = c[o];
  for (let o = 0; o < y.length; o++)
    m[c.length + o] = y[o];
  return m;
}, zv = (c, y) => ({
  classGroupId: c,
  validator: y
}), ym = (c = /* @__PURE__ */ new Map(), y = null, m) => ({
  nextPart: c,
  validators: y,
  classGroupId: m
}), ni = "-", $d = [], Ev = "arbitrary..", Tv = (c) => {
  const y = _v(c), {
    conflictingClassGroups: m,
    conflictingClassGroupModifiers: o
  } = c;
  return {
    getClassGroupId: (x) => {
      if (x.startsWith("[") && x.endsWith("]"))
        return Av(x);
      const q = x.split(ni), M = q[0] === "" && q.length > 1 ? 1 : 0;
      return hm(q, M, y);
    },
    getConflictingClassGroupIds: (x, q) => {
      if (q) {
        const M = o[x], v = m[x];
        return M ? v ? Sv(v, M) : M : v || $d;
      }
      return m[x] || $d;
    }
  };
}, hm = (c, y, m) => {
  if (c.length - y === 0)
    return m.classGroupId;
  const T = c[y], D = m.nextPart.get(T);
  if (D) {
    const v = hm(c, y + 1, D);
    if (v) return v;
  }
  const x = m.validators;
  if (x === null)
    return;
  const q = y === 0 ? c.join(ni) : c.slice(y).join(ni), M = x.length;
  for (let v = 0; v < M; v++) {
    const Q = x[v];
    if (Q.validator(q))
      return Q.classGroupId;
  }
}, Av = (c) => c.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const y = c.slice(1, -1), m = y.indexOf(":"), o = y.slice(0, m);
  return o ? Ev + o : void 0;
})(), _v = (c) => {
  const {
    theme: y,
    classGroups: m
  } = c;
  return Ov(m, y);
}, Ov = (c, y) => {
  const m = ym();
  for (const o in c) {
    const T = c[o];
    qf(T, m, o, y);
  }
  return m;
}, qf = (c, y, m, o) => {
  const T = c.length;
  for (let D = 0; D < T; D++) {
    const x = c[D];
    Mv(x, y, m, o);
  }
}, Mv = (c, y, m, o) => {
  if (typeof c == "string") {
    xv(c, y, m);
    return;
  }
  if (typeof c == "function") {
    Dv(c, y, m, o);
    return;
  }
  Uv(c, y, m, o);
}, xv = (c, y, m) => {
  const o = c === "" ? y : vm(y, c);
  o.classGroupId = m;
}, Dv = (c, y, m, o) => {
  if (Nv(c)) {
    qf(c(o), y, m, o);
    return;
  }
  y.validators === null && (y.validators = []), y.validators.push(zv(m, c));
}, Uv = (c, y, m, o) => {
  const T = Object.entries(c), D = T.length;
  for (let x = 0; x < D; x++) {
    const [q, M] = T[x];
    qf(M, vm(y, q), m, o);
  }
}, vm = (c, y) => {
  let m = c;
  const o = y.split(ni), T = o.length;
  for (let D = 0; D < T; D++) {
    const x = o[D];
    let q = m.nextPart.get(x);
    q || (q = ym(), m.nextPart.set(x, q)), m = q;
  }
  return m;
}, Nv = (c) => "isThemeGetter" in c && c.isThemeGetter === !0, Rv = (c) => {
  if (c < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let y = 0, m = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  const T = (D, x) => {
    m[D] = x, y++, y > c && (y = 0, o = m, m = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(D) {
      let x = m[D];
      if (x !== void 0)
        return x;
      if ((x = o[D]) !== void 0)
        return T(D, x), x;
    },
    set(D, x) {
      D in m ? m[D] = x : T(D, x);
    }
  };
}, Rf = "!", Fd = ":", Cv = [], Id = (c, y, m, o, T) => ({
  modifiers: c,
  hasImportantModifier: y,
  baseClassName: m,
  maybePostfixModifierPosition: o,
  isExternal: T
}), Hv = (c) => {
  const {
    prefix: y,
    experimentalParseClassName: m
  } = c;
  let o = (T) => {
    const D = [];
    let x = 0, q = 0, M = 0, v;
    const Q = T.length;
    for (let il = 0; il < Q; il++) {
      const pl = T[il];
      if (x === 0 && q === 0) {
        if (pl === Fd) {
          D.push(T.slice(M, il)), M = il + 1;
          continue;
        }
        if (pl === "/") {
          v = il;
          continue;
        }
      }
      pl === "[" ? x++ : pl === "]" ? x-- : pl === "(" ? q++ : pl === ")" && q--;
    }
    const C = D.length === 0 ? T : T.slice(M);
    let W = C, sl = !1;
    C.endsWith(Rf) ? (W = C.slice(0, -1), sl = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      C.startsWith(Rf) && (W = C.slice(1), sl = !0)
    );
    const gl = v && v > M ? v - M : void 0;
    return Id(D, sl, W, gl);
  };
  if (y) {
    const T = y + Fd, D = o;
    o = (x) => x.startsWith(T) ? D(x.slice(T.length)) : Id(Cv, !1, x, void 0, !0);
  }
  if (m) {
    const T = o;
    o = (D) => m({
      className: D,
      parseClassName: T
    });
  }
  return o;
}, qv = (c) => {
  const y = /* @__PURE__ */ new Map();
  return c.orderSensitiveModifiers.forEach((m, o) => {
    y.set(m, 1e6 + o);
  }), (m) => {
    const o = [];
    let T = [];
    for (let D = 0; D < m.length; D++) {
      const x = m[D], q = x[0] === "[", M = y.has(x);
      q || M ? (T.length > 0 && (T.sort(), o.push(...T), T = []), o.push(x)) : T.push(x);
    }
    return T.length > 0 && (T.sort(), o.push(...T)), o;
  };
}, Bv = (c) => ({
  cache: Rv(c.cacheSize),
  parseClassName: Hv(c),
  sortModifiers: qv(c),
  postfixLookupClassGroupIds: Yv(c),
  ...Tv(c)
}), Yv = (c) => {
  const y = /* @__PURE__ */ Object.create(null), m = c.postfixLookupClassGroups;
  if (m)
    for (let o = 0; o < m.length; o++)
      y[m[o]] = !0;
  return y;
}, jv = /\s+/, Gv = (c, y) => {
  const {
    parseClassName: m,
    getClassGroupId: o,
    getConflictingClassGroupIds: T,
    sortModifiers: D,
    postfixLookupClassGroupIds: x
  } = y, q = [], M = c.trim().split(jv);
  let v = "";
  for (let Q = M.length - 1; Q >= 0; Q -= 1) {
    const C = M[Q], {
      isExternal: W,
      modifiers: sl,
      hasImportantModifier: gl,
      baseClassName: il,
      maybePostfixModifierPosition: pl
    } = m(C);
    if (W) {
      v = C + (v.length > 0 ? " " + v : v);
      continue;
    }
    let xl = !!pl, Al;
    if (xl) {
      const J = il.substring(0, pl);
      Al = o(J);
      const H = Al && x[Al] ? o(il) : void 0;
      H && H !== Al && (Al = H, xl = !1);
    } else
      Al = o(il);
    if (!Al) {
      if (!xl) {
        v = C + (v.length > 0 ? " " + v : v);
        continue;
      }
      if (Al = o(il), !Al) {
        v = C + (v.length > 0 ? " " + v : v);
        continue;
      }
      xl = !1;
    }
    const _l = sl.length === 0 ? "" : sl.length === 1 ? sl[0] : D(sl).join(":"), Bl = gl ? _l + Rf : _l, Kl = Bl + Al;
    if (q.indexOf(Kl) > -1)
      continue;
    q.push(Kl);
    const Dl = T(Al, xl);
    for (let J = 0; J < Dl.length; ++J) {
      const H = Dl[J];
      q.push(Bl + H);
    }
    v = C + (v.length > 0 ? " " + v : v);
  }
  return v;
}, Xv = (...c) => {
  let y = 0, m, o, T = "";
  for (; y < c.length; )
    (m = c[y++]) && (o = gm(m)) && (T && (T += " "), T += o);
  return T;
}, gm = (c) => {
  if (typeof c == "string")
    return c;
  let y, m = "";
  for (let o = 0; o < c.length; o++)
    c[o] && (y = gm(c[o])) && (m && (m += " "), m += y);
  return m;
}, Qv = (c, ...y) => {
  let m, o, T, D;
  const x = (M) => {
    const v = y.reduce((Q, C) => C(Q), c());
    return m = Bv(v), o = m.cache.get, T = m.cache.set, D = q, q(M);
  }, q = (M) => {
    const v = o(M);
    if (v)
      return v;
    const Q = Gv(M, m);
    return T(M, Q), Q;
  };
  return D = x, (...M) => D(Xv(...M));
}, Zv = [], Gl = (c) => {
  const y = (m) => m[c] || Zv;
  return y.isThemeGetter = !0, y;
}, bm = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, pm = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Vv = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Lv = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Kv = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, wv = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Jv = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, kv = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, He = (c) => Vv.test(c), P = (c) => !!c && !Number.isNaN(Number(c)), Gt = (c) => !!c && Number.isInteger(Number(c)), Df = (c) => c.endsWith("%") && P(c.slice(0, -1)), ie = (c) => Lv.test(c), Sm = () => !0, Wv = (c) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Kv.test(c) && !wv.test(c)
), Bf = () => !1, $v = (c) => Jv.test(c), Fv = (c) => kv.test(c), Iv = (c) => !B(c) && !j(c), Pv = (c) => c.startsWith("@container") && (c[10] === "/" && c[11] !== void 0 || c[11] === "s" && c[16] !== void 0 && c.startsWith("-size/", 10) || c[11] === "n" && c[18] !== void 0 && c.startsWith("-normal/", 10)), l0 = (c) => qe(c, Tm, Bf), B = (c) => bm.test(c), la = (c) => qe(c, Am, Wv), Pd = (c) => qe(c, f0, P), t0 = (c) => qe(c, Om, Sm), e0 = (c) => qe(c, _m, Bf), lm = (c) => qe(c, zm, Bf), a0 = (c) => qe(c, Em, Fv), ei = (c) => qe(c, Mm, $v), j = (c) => pm.test(c), Yn = (c) => ea(c, Am), n0 = (c) => ea(c, _m), tm = (c) => ea(c, zm), u0 = (c) => ea(c, Tm), i0 = (c) => ea(c, Em), ai = (c) => ea(c, Mm, !0), c0 = (c) => ea(c, Om, !0), qe = (c, y, m) => {
  const o = bm.exec(c);
  return o ? o[1] ? y(o[1]) : m(o[2]) : !1;
}, ea = (c, y, m = !1) => {
  const o = pm.exec(c);
  return o ? o[1] ? y(o[1]) : m : !1;
}, zm = (c) => c === "position" || c === "percentage", Em = (c) => c === "image" || c === "url", Tm = (c) => c === "length" || c === "size" || c === "bg-size", Am = (c) => c === "length", f0 = (c) => c === "number", _m = (c) => c === "family-name", Om = (c) => c === "number" || c === "weight", Mm = (c) => c === "shadow", o0 = () => {
  const c = Gl("color"), y = Gl("font"), m = Gl("text"), o = Gl("font-weight"), T = Gl("tracking"), D = Gl("leading"), x = Gl("breakpoint"), q = Gl("container"), M = Gl("spacing"), v = Gl("radius"), Q = Gl("shadow"), C = Gl("inset-shadow"), W = Gl("text-shadow"), sl = Gl("drop-shadow"), gl = Gl("blur"), il = Gl("perspective"), pl = Gl("aspect"), xl = Gl("ease"), Al = Gl("animate"), _l = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Bl = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], Kl = () => [...Bl(), j, B], Dl = () => ["auto", "hidden", "clip", "visible", "scroll"], J = () => ["auto", "contain", "none"], H = () => [j, B, M], El = () => [He, "full", "auto", ...H()], Xt = () => [Gt, "none", "subgrid", j, B], ct = () => ["auto", {
    span: ["full", Gt, j, B]
  }, Gt, j, B], Yl = () => [Gt, "auto", j, B], Ht = () => ["auto", "min", "max", "fr", j, B], ft = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Xl = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], z = () => ["auto", ...H()], U = () => [He, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...H()], K = () => [He, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...H()], cl = () => [He, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...H()], N = () => [c, j, B], d = () => [...Bl(), tm, lm, {
    position: [j, B]
  }], O = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], R = () => ["auto", "cover", "contain", u0, l0, {
    size: [j, B]
  }], Y = () => [Df, Yn, la], Z = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    v,
    j,
    B
  ], L = () => ["", P, Yn, la], nl = () => ["solid", "dashed", "dotted", "double"], Ql = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => [P, Df, tm, lm], ce = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    gl,
    j,
    B
  ], Qt = () => ["none", P, j, B], fe = () => ["none", P, j, B], aa = () => [P, j, B], pt = () => [He, "full", ...H()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [ie],
      breakpoint: [ie],
      color: [Sm],
      container: [ie],
      "drop-shadow": [ie],
      ease: ["in", "out", "in-out"],
      font: [Iv],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [ie],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [ie],
      shadow: [ie],
      spacing: ["px", P],
      text: [ie],
      "text-shadow": [ie],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", He, B, j, pl]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", j, B]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [Pv],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [P, B, j, q]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": _l()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": _l()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: Kl()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Dl()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Dl()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Dl()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: J()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": J()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": J()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: El()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": El()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": El()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": El(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: El()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": El(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: El()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": El()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": El()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: El()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: El()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: El()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: El()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Gt, "auto", j, B]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [He, "full", "auto", q, ...H()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [P, He, "auto", "initial", "none", B]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", P, j, B]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", P, j, B]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Gt, "first", "last", "none", j, B]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Xt()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ct()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Yl()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Yl()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Xt()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ct()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Yl()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Yl()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Ht()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Ht()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: H()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": H()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": H()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...ft(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Xl(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Xl()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...ft()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Xl(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Xl(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": ft()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Xl(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Xl()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: H()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: H()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: H()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: H()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: H()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: H()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: H()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: H()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: H()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: H()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: H()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: z()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: z()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: z()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: z()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: z()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: z()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: z()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": H()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": H()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: U()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...K()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...K()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...K()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...cl()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...cl()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...cl()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [q, "screen", ...U()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          q,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...U()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          q,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [x]
          },
          ...U()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...U()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...U()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...U()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", m, Yn, la]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, c0, t0]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Df, B]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [n0, e0, y]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [B]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [T, j, B]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [P, "none", j, Pd]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          D,
          ...H()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", j, B]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", j, B]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: N()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: N()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...nl(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [P, "from-font", "auto", j, la]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: N()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [P, "auto", j, B]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: H()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [Gt, j, B]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", j, B]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", j, B]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: d()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: O()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: R()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Gt, j, B],
          radial: ["", j, B],
          conic: [Gt, j, B]
        }, i0, a0]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: N()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Y()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Y()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Y()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: N()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: N()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: N()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: Z()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Z()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Z()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Z()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Z()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Z()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Z()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Z()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Z()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Z()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Z()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Z()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Z()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Z()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Z()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: L()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": L()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": L()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": L()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": L()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": L()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": L()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": L()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": L()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": L()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": L()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": L()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": L()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...nl(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...nl(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: N()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": N()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": N()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": N()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": N()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": N()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": N()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": N()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": N()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": N()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": N()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: N()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...nl(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [P, j, B]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", P, Yn, la]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: N()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          Q,
          ai,
          ei
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: N()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", C, ai, ei]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": N()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: L()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: N()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [P, la]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": N()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": L()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": N()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", W, ai, ei]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": N()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [P, j, B]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ql(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ql()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [P]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": I()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": N()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": I()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": N()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": I()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": N()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": I()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": N()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": I()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": N()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": I()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": N()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": I()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": N()
      }],
      "mask-image-radial": [{
        "mask-radial": [j, B]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": I()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": N()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": Bl()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [P]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": I()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": N()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: d()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: O()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: R()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", j, B]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          j,
          B
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: ce()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [P, j, B]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [P, j, B]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          sl,
          ai,
          ei
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": N()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", P, j, B]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [P, j, B]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", P, j, B]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [P, j, B]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", P, j, B]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          j,
          B
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": ce()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [P, j, B]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [P, j, B]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", P, j, B]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [P, j, B]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", P, j, B]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [P, j, B]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [P, j, B]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", P, j, B]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": H()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": H()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": H()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", j, B]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [P, "initial", j, B]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", xl, j, B]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [P, j, B]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", Al, j, B]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [il, j, B]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": Kl()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: Qt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": Qt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": Qt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": Qt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: fe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": fe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": fe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": fe()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: aa()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": aa()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": aa()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [j, B, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: Kl()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: pt()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": pt()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": pt()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": pt()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [Gt, j, B]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: N()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: N()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", j, B]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": N()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": N()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": H()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": H()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": H()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": H()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": H()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": H()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": H()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": H()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": H()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": H()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": H()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": H()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": H()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": H()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": H()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": H()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": H()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": H()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": H()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": H()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": H()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": H()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", j, B]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...N()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [P, Yn, la, Pd]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...N()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, s0 = /* @__PURE__ */ Qv(o0);
function ta(...c) {
  return s0(mm(c));
}
const r0 = pv(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function d0({
  className: c,
  variant: y = "default",
  size: m = "default",
  asChild: o = !1,
  ...T
}) {
  const D = o ? mv : "div";
  return /* @__PURE__ */ Fl.jsx(
    D,
    {
      "data-slot": "item",
      "data-variant": y,
      "data-size": m,
      className: ta(r0({ variant: y, size: m, className: c })),
      ...T
    }
  );
}
function m0({ className: c, ...y }) {
  return /* @__PURE__ */ Fl.jsx(
    "div",
    {
      "data-slot": "item-content",
      className: ta(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        c
      ),
      ...y
    }
  );
}
function y0({ className: c, ...y }) {
  return /* @__PURE__ */ Fl.jsx(
    "div",
    {
      "data-slot": "item-title",
      className: ta(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        c
      ),
      ...y
    }
  );
}
function h0({ className: c, ...y }) {
  return /* @__PURE__ */ Fl.jsx(
    "p",
    {
      "data-slot": "item-description",
      className: ta(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        c
      ),
      ...y
    }
  );
}
function v0({ className: c, ...y }) {
  return /* @__PURE__ */ Fl.jsx(
    "div",
    {
      "data-slot": "item-header",
      className: ta(
        "flex basis-full items-center justify-between gap-2",
        c
      ),
      ...y
    }
  );
}
function em(c) {
  let y = c;
  for (; y; ) {
    if (y.classList.contains("dark") || y.classList.contains("dark-theme") || y.classList.contains("theme-dark"))
      return !0;
    if (y.classList.contains("light") || y.classList.contains("light-theme") || y.classList.contains("theme-light"))
      return !1;
    const m = y.getAttribute("data-theme") ?? y.getAttribute("data-mode");
    if (m === "dark") return !0;
    if (m === "light") return !1;
    y = y.parentElement;
  }
  for (const m of [document.documentElement, document.body]) {
    if (m.classList.contains("dark") || m.classList.contains("dark-theme") || m.getAttribute("data-theme") === "dark" || m.getAttribute("data-mode") === "dark")
      return !0;
    if (m.classList.contains("light") || m.classList.contains("light-theme") || m.getAttribute("data-theme") === "light" || m.getAttribute("data-mode") === "light")
      return !1;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? !1;
}
function g0(c) {
  const [y, m] = Ll.useState(() => em(c));
  return Ll.useEffect(() => {
    if (!c) return;
    const o = () => m(em(c));
    o();
    const T = new MutationObserver(o);
    T.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    }), document.body && T.observe(document.body, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    });
    const D = window.matchMedia?.("(prefers-color-scheme: dark)");
    return D?.addEventListener("change", o), () => {
      T.disconnect(), D?.removeEventListener("change", o);
    };
  }, [c]), y;
}
function b0(c, y) {
  const m = Ll.useRef(y);
  m.current = y;
  const o = (x) => {
    const q = m.current.map((M) => {
      const v = `change:${String(M)}`, Q = () => x();
      return c.on(v, Q), { event: v, handler: Q };
    });
    return () => {
      for (const { event: M, handler: v } of q)
        c.off?.(M, v);
    };
  }, T = () => {
    const x = {};
    for (const q of m.current)
      x[String(q)] = c.get(String(q));
    return JSON.stringify(x);
  }, D = Ll.useSyncExternalStore(o, T, T);
  return JSON.parse(D);
}
function p0({ item: c }) {
  return c.image ? /* @__PURE__ */ Fl.jsx(
    "img",
    {
      src: c.image,
      alt: c.title,
      draggable: !1,
      className: "max-h-28 w-full object-contain"
    }
  ) : /* @__PURE__ */ Fl.jsx("div", { className: "max-h-28 min-h-16 w-full rounded-sm bg-muted" });
}
function S0({
  model: c,
  hostEl: y
}) {
  const m = g0(y.parentElement), { items: o, selected_index: T, columns: D } = b0(c, [
    "items",
    "selected_index",
    "columns"
  ]);
  return /* @__PURE__ */ Fl.jsx("div", { className: ta("min-w-0 w-full overflow-hidden", m && "dark"), children: /* @__PURE__ */ Fl.jsx(
    "div",
    {
      className: "grid min-w-0 w-full gap-3",
      style: { gridTemplateColumns: `repeat(${Math.max(1, D)}, minmax(0, 1fr))` },
      children: o.map((x, q) => {
        const M = q === T;
        return /* @__PURE__ */ Fl.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": M,
            className: "min-w-0 w-full overflow-hidden text-left",
            onClick: () => {
              c.set("selected_index", q), c.save_changes();
            },
            children: /* @__PURE__ */ Fl.jsxs(
              d0,
              {
                variant: M ? "muted" : "outline",
                className: ta(
                  "h-full min-w-0 w-full flex-col flex-nowrap items-stretch overflow-hidden",
                  M && "border-ring ring-[3px] ring-ring/35"
                ),
                children: [
                  /* @__PURE__ */ Fl.jsx(v0, { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ Fl.jsx(p0, { item: x }) }),
                  /* @__PURE__ */ Fl.jsxs(m0, { className: "min-w-0", children: [
                    /* @__PURE__ */ Fl.jsx(y0, { className: "max-w-full truncate", children: x.title }),
                    x.description ? /* @__PURE__ */ Fl.jsx(h0, { children: x.description }) : null
                  ] })
                ]
              }
            )
          },
          `${x.title}-${q}`
        );
      })
    }
  ) });
}
const am = /* @__PURE__ */ new WeakMap();
function z0({ model: c, el: y }) {
  let m = am.get(y);
  m || (m = fv.createRoot(y), am.set(y, m)), m.render(/* @__PURE__ */ Fl.jsx(S0, { model: c, hostEl: y }));
}
const E0 = { render: z0 };
export {
  E0 as default
};
