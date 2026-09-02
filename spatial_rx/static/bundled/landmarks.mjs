var sy = (n) => {
  throw TypeError(n);
};
var cy = (n, o, r) => o.has(n) || sy("Cannot " + r);
var Gn = (n, o, r) => (cy(n, o, "read from private field"), r ? r.call(n) : o.get(n)), uy = (n, o, r) => o.has(n) ? sy("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Nd = (n, o, r, a) => (cy(n, o, "write to private field"), a ? a.call(n, r) : o.set(n, r), r);
function tC(n, o) {
  for (var r = 0; r < o.length; r++) {
    const a = o[r];
    if (typeof a != "string" && !Array.isArray(a)) {
      for (const c in a)
        if (c !== "default" && !(c in n)) {
          const f = Object.getOwnPropertyDescriptor(a, c);
          f && Object.defineProperty(n, c, f.get ? f : {
            enumerable: !0,
            get: () => a[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function nC(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var kd = { exports: {} }, ns = {};
var fy;
function lC() {
  if (fy) return ns;
  fy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(a, c, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), "key" in c) {
      f = {};
      for (var p in c)
        p !== "key" && (f[p] = c[p]);
    } else f = c;
    return c = f.ref, {
      $$typeof: n,
      type: a,
      key: d,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return ns.Fragment = o, ns.jsx = r, ns.jsxs = r, ns;
}
var dy;
function oC() {
  return dy || (dy = 1, kd.exports = lC()), kd.exports;
}
var S = oC(), zd = { exports: {} }, ls = {}, Dd = { exports: {} }, jd = {};
var hy;
function iC() {
  return hy || (hy = 1, (function(n) {
    function o(V, I) {
      var Q = V.length;
      V.push(I);
      e: for (; 0 < Q; ) {
        var xe = Q - 1 >>> 1, ae = V[xe];
        if (0 < c(ae, I))
          V[xe] = I, V[Q] = ae, Q = xe;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function a(V) {
      if (V.length === 0) return null;
      var I = V[0], Q = V.pop();
      if (Q !== I) {
        V[0] = Q;
        e: for (var xe = 0, ae = V.length, z = ae >>> 1; xe < z; ) {
          var F = 2 * (xe + 1) - 1, ne = V[F], oe = F + 1, ge = V[oe];
          if (0 > c(ne, Q))
            oe < ae && 0 > c(ge, ne) ? (V[xe] = ge, V[oe] = Q, xe = oe) : (V[xe] = ne, V[F] = Q, xe = F);
          else if (oe < ae && 0 > c(ge, Q))
            V[xe] = ge, V[oe] = Q, xe = oe;
          else break e;
        }
      }
      return I;
    }
    function c(V, I) {
      var Q = V.sortIndex - I.sortIndex;
      return Q !== 0 ? Q : V.id - I.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, p = d.now();
      n.unstable_now = function() {
        return d.now() - p;
      };
    }
    var g = [], h = [], y = 1, v = null, x = 3, C = !1, w = !1, _ = !1, N = !1, T = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    function k(V) {
      for (var I = r(h); I !== null; ) {
        if (I.callback === null) a(h);
        else if (I.startTime <= V)
          a(h), I.sortIndex = I.expirationTime, o(g, I);
        else break;
        I = r(h);
      }
    }
    function H(V) {
      if (_ = !1, k(V), !w)
        if (r(g) !== null)
          w = !0, P || (P = !0, de());
        else {
          var I = r(h);
          I !== null && be(H, I.startTime - V);
        }
    }
    var P = !1, G = -1, L = 5, K = -1;
    function te() {
      return N ? !0 : !(n.unstable_now() - K < L);
    }
    function se() {
      if (N = !1, P) {
        var V = n.unstable_now();
        K = V;
        var I = !0;
        try {
          e: {
            w = !1, _ && (_ = !1, M(G), G = -1), C = !0;
            var Q = x;
            try {
              t: {
                for (k(V), v = r(g); v !== null && !(v.expirationTime > V && te()); ) {
                  var xe = v.callback;
                  if (typeof xe == "function") {
                    v.callback = null, x = v.priorityLevel;
                    var ae = xe(
                      v.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof ae == "function") {
                      v.callback = ae, k(V), I = !0;
                      break t;
                    }
                    v === r(g) && a(g), k(V);
                  } else a(g);
                  v = r(g);
                }
                if (v !== null) I = !0;
                else {
                  var z = r(h);
                  z !== null && be(
                    H,
                    z.startTime - V
                  ), I = !1;
                }
              }
              break e;
            } finally {
              v = null, x = Q, C = !1;
            }
            I = void 0;
          }
        } finally {
          I ? de() : P = !1;
        }
      }
    }
    var de;
    if (typeof A == "function")
      de = function() {
        A(se);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), pe = le.port2;
      le.port1.onmessage = se, de = function() {
        pe.postMessage(null);
      };
    } else
      de = function() {
        T(se, 0);
      };
    function be(V, I) {
      G = T(function() {
        V(n.unstable_now());
      }, I);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, n.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : L = 0 < V ? Math.floor(1e3 / V) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, n.unstable_next = function(V) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = x;
      }
      var Q = x;
      x = I;
      try {
        return V();
      } finally {
        x = Q;
      }
    }, n.unstable_requestPaint = function() {
      N = !0;
    }, n.unstable_runWithPriority = function(V, I) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var Q = x;
      x = V;
      try {
        return I();
      } finally {
        x = Q;
      }
    }, n.unstable_scheduleCallback = function(V, I, Q) {
      var xe = n.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? xe + Q : xe) : Q = xe, V) {
        case 1:
          var ae = -1;
          break;
        case 2:
          ae = 250;
          break;
        case 5:
          ae = 1073741823;
          break;
        case 4:
          ae = 1e4;
          break;
        default:
          ae = 5e3;
      }
      return ae = Q + ae, V = {
        id: y++,
        callback: I,
        priorityLevel: V,
        startTime: Q,
        expirationTime: ae,
        sortIndex: -1
      }, Q > xe ? (V.sortIndex = Q, o(h, V), r(g) === null && V === r(h) && (_ ? (M(G), G = -1) : _ = !0, be(H, Q - xe))) : (V.sortIndex = ae, o(g, V), w || C || (w = !0, P || (P = !0, de()))), V;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(V) {
      var I = x;
      return function() {
        var Q = x;
        x = I;
        try {
          return V.apply(this, arguments);
        } finally {
          x = Q;
        }
      };
    };
  })(jd)), jd;
}
var py;
function rC() {
  return py || (py = 1, Dd.exports = iC()), Dd.exports;
}
var Ld = { exports: {} }, lt = {};
var my;
function aC() {
  if (my) return lt;
  my = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), x = Symbol.iterator;
  function C(z) {
    return z === null || typeof z != "object" ? null : (z = x && z[x] || z["@@iterator"], typeof z == "function" ? z : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, _ = Object.assign, N = {};
  function T(z, F, ne) {
    this.props = z, this.context = F, this.refs = N, this.updater = ne || w;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(z, F) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, F, "setState");
  }, T.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function M() {
  }
  M.prototype = T.prototype;
  function A(z, F, ne) {
    this.props = z, this.context = F, this.refs = N, this.updater = ne || w;
  }
  var k = A.prototype = new M();
  k.constructor = A, _(k, T.prototype), k.isPureReactComponent = !0;
  var H = Array.isArray;
  function P() {
  }
  var G = { H: null, A: null, T: null, S: null }, L = Object.prototype.hasOwnProperty;
  function K(z, F, ne) {
    var oe = ne.ref;
    return {
      $$typeof: n,
      type: z,
      key: F,
      ref: oe !== void 0 ? oe : null,
      props: ne
    };
  }
  function te(z, F) {
    return K(z.type, F, z.props);
  }
  function se(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function de(z) {
    var F = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(ne) {
      return F[ne];
    });
  }
  var le = /\/+/g;
  function pe(z, F) {
    return typeof z == "object" && z !== null && z.key != null ? de("" + z.key) : F.toString(36);
  }
  function be(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(P, P) : (z.status = "pending", z.then(
          function(F) {
            z.status === "pending" && (z.status = "fulfilled", z.value = F);
          },
          function(F) {
            z.status === "pending" && (z.status = "rejected", z.reason = F);
          }
        )), z.status) {
          case "fulfilled":
            return z.value;
          case "rejected":
            throw z.reason;
        }
    }
    throw z;
  }
  function V(z, F, ne, oe, ge) {
    var _e = typeof z;
    (_e === "undefined" || _e === "boolean") && (z = null);
    var qe = !1;
    if (z === null) qe = !0;
    else
      switch (_e) {
        case "bigint":
        case "string":
        case "number":
          qe = !0;
          break;
        case "object":
          switch (z.$$typeof) {
            case n:
            case o:
              qe = !0;
              break;
            case y:
              return qe = z._init, V(
                qe(z._payload),
                F,
                ne,
                oe,
                ge
              );
          }
      }
    if (qe)
      return ge = ge(z), qe = oe === "" ? "." + pe(z, 0) : oe, H(ge) ? (ne = "", qe != null && (ne = qe.replace(le, "$&/") + "/"), V(ge, F, ne, "", function(it) {
        return it;
      })) : ge != null && (se(ge) && (ge = te(
        ge,
        ne + (ge.key == null || z && z.key === ge.key ? "" : ("" + ge.key).replace(
          le,
          "$&/"
        ) + "/") + qe
      )), F.push(ge)), 1;
    qe = 0;
    var Me = oe === "" ? "." : oe + ":";
    if (H(z))
      for (var Te = 0; Te < z.length; Te++)
        oe = z[Te], _e = Me + pe(oe, Te), qe += V(
          oe,
          F,
          ne,
          _e,
          ge
        );
    else if (Te = C(z), typeof Te == "function")
      for (z = Te.call(z), Te = 0; !(oe = z.next()).done; )
        oe = oe.value, _e = Me + pe(oe, Te++), qe += V(
          oe,
          F,
          ne,
          _e,
          ge
        );
    else if (_e === "object") {
      if (typeof z.then == "function")
        return V(
          be(z),
          F,
          ne,
          oe,
          ge
        );
      throw F = String(z), Error(
        "Objects are not valid as a React child (found: " + (F === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : F) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return qe;
  }
  function I(z, F, ne) {
    if (z == null) return z;
    var oe = [], ge = 0;
    return V(z, oe, "", "", function(_e) {
      return F.call(ne, _e, ge++);
    }), oe;
  }
  function Q(z) {
    if (z._status === -1) {
      var F = z._result;
      F = F(), F.then(
        function(ne) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = ne);
        },
        function(ne) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = ne);
        }
      ), z._status === -1 && (z._status = 0, z._result = F);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var xe = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var F = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(F)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, ae = {
    map: I,
    forEach: function(z, F, ne) {
      I(
        z,
        function() {
          F.apply(this, arguments);
        },
        ne
      );
    },
    count: function(z) {
      var F = 0;
      return I(z, function() {
        F++;
      }), F;
    },
    toArray: function(z) {
      return I(z, function(F) {
        return F;
      }) || [];
    },
    only: function(z) {
      if (!se(z))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return z;
    }
  };
  return lt.Activity = v, lt.Children = ae, lt.Component = T, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = A, lt.StrictMode = a, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return G.H.useMemoCache(z);
    }
  }, lt.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(z, F, ne) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var oe = _({}, z.props), ge = z.key;
    if (F != null)
      for (_e in F.key !== void 0 && (ge = "" + F.key), F)
        !L.call(F, _e) || _e === "key" || _e === "__self" || _e === "__source" || _e === "ref" && F.ref === void 0 || (oe[_e] = F[_e]);
    var _e = arguments.length - 2;
    if (_e === 1) oe.children = ne;
    else if (1 < _e) {
      for (var qe = Array(_e), Me = 0; Me < _e; Me++)
        qe[Me] = arguments[Me + 2];
      oe.children = qe;
    }
    return K(z.type, ge, oe);
  }, lt.createContext = function(z) {
    return z = {
      $$typeof: d,
      _currentValue: z,
      _currentValue2: z,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, z.Provider = z, z.Consumer = {
      $$typeof: f,
      _context: z
    }, z;
  }, lt.createElement = function(z, F, ne) {
    var oe, ge = {}, _e = null;
    if (F != null)
      for (oe in F.key !== void 0 && (_e = "" + F.key), F)
        L.call(F, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (ge[oe] = F[oe]);
    var qe = arguments.length - 2;
    if (qe === 1) ge.children = ne;
    else if (1 < qe) {
      for (var Me = Array(qe), Te = 0; Te < qe; Te++)
        Me[Te] = arguments[Te + 2];
      ge.children = Me;
    }
    if (z && z.defaultProps)
      for (oe in qe = z.defaultProps, qe)
        ge[oe] === void 0 && (ge[oe] = qe[oe]);
    return K(z, _e, ge);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(z) {
    return { $$typeof: p, render: z };
  }, lt.isValidElement = se, lt.lazy = function(z) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: z },
      _init: Q
    };
  }, lt.memo = function(z, F) {
    return {
      $$typeof: h,
      type: z,
      compare: F === void 0 ? null : F
    };
  }, lt.startTransition = function(z) {
    var F = G.T, ne = {};
    G.T = ne;
    try {
      var oe = z(), ge = G.S;
      ge !== null && ge(ne, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(P, xe);
    } catch (_e) {
      xe(_e);
    } finally {
      F !== null && ne.types !== null && (F.types = ne.types), G.T = F;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, lt.use = function(z) {
    return G.H.use(z);
  }, lt.useActionState = function(z, F, ne) {
    return G.H.useActionState(z, F, ne);
  }, lt.useCallback = function(z, F) {
    return G.H.useCallback(z, F);
  }, lt.useContext = function(z) {
    return G.H.useContext(z);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(z, F) {
    return G.H.useDeferredValue(z, F);
  }, lt.useEffect = function(z, F) {
    return G.H.useEffect(z, F);
  }, lt.useEffectEvent = function(z) {
    return G.H.useEffectEvent(z);
  }, lt.useId = function() {
    return G.H.useId();
  }, lt.useImperativeHandle = function(z, F, ne) {
    return G.H.useImperativeHandle(z, F, ne);
  }, lt.useInsertionEffect = function(z, F) {
    return G.H.useInsertionEffect(z, F);
  }, lt.useLayoutEffect = function(z, F) {
    return G.H.useLayoutEffect(z, F);
  }, lt.useMemo = function(z, F) {
    return G.H.useMemo(z, F);
  }, lt.useOptimistic = function(z, F) {
    return G.H.useOptimistic(z, F);
  }, lt.useReducer = function(z, F, ne) {
    return G.H.useReducer(z, F, ne);
  }, lt.useRef = function(z) {
    return G.H.useRef(z);
  }, lt.useState = function(z) {
    return G.H.useState(z);
  }, lt.useSyncExternalStore = function(z, F, ne) {
    return G.H.useSyncExternalStore(
      z,
      F,
      ne
    );
  }, lt.useTransition = function() {
    return G.H.useTransition();
  }, lt.version = "19.2.8", lt;
}
var gy;
function vs() {
  return gy || (gy = 1, Ld.exports = aC()), Ld.exports;
}
var Vd = { exports: {} }, Yn = {};
var by;
function sC() {
  if (by) return Yn;
  by = 1;
  var n = vs();
  function o(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        h += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var a = {
    d: {
      f: r,
      r: function() {
        throw Error(o(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, c = /* @__PURE__ */ Symbol.for("react.portal");
  function f(g, h, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: h,
      implementation: y
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Yn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Yn.createPortal = function(g, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(g, h, null, y);
  }, Yn.flushSync = function(g) {
    var h = d.T, y = a.p;
    try {
      if (d.T = null, a.p = 2, g) return g();
    } finally {
      d.T = h, a.p = y, a.d.f();
    }
  }, Yn.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, a.d.C(g, h));
  }, Yn.prefetchDNS = function(g) {
    typeof g == "string" && a.d.D(g);
  }, Yn.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var y = h.as, v = p(y, h.crossOrigin), x = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? a.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: x,
          fetchPriority: C
        }
      ) : y === "script" && a.d.X(g, {
        crossOrigin: v,
        integrity: x,
        fetchPriority: C,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Yn.preinitModule = function(g, h) {
    if (typeof g == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var y = p(
            h.as,
            h.crossOrigin
          );
          a.d.M(g, {
            crossOrigin: y,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && a.d.M(g);
  }, Yn.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, v = p(y, h.crossOrigin);
      a.d.L(g, y, {
        crossOrigin: v,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, Yn.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var y = p(h.as, h.crossOrigin);
        a.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else a.d.m(g);
  }, Yn.requestFormReset = function(g) {
    a.d.r(g);
  }, Yn.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Yn.useFormState = function(g, h, y) {
    return d.H.useFormState(g, h, y);
  }, Yn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Yn.version = "19.2.8", Yn;
}
var yy;
function Gv() {
  if (yy) return Vd.exports;
  yy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Vd.exports = sC(), Vd.exports;
}
var vy;
function cC() {
  if (vy) return ls;
  vy = 1;
  var n = rC(), o = vs(), r = Gv();
  function a(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function f(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function d(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (f(e) !== e)
      throw Error(a(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(a(188));
      return t !== e ? null : e;
    }
    for (var l = e, i = t; ; ) {
      var s = l.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (i = s.return, i !== null) {
          l = i;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === l) return g(s), e;
          if (u === i) return g(s), t;
          u = u.sibling;
        }
        throw Error(a(188));
      }
      if (l.return !== i.return) l = s, i = u;
      else {
        for (var m = !1, E = s.child; E; ) {
          if (E === l) {
            m = !0, l = s, i = u;
            break;
          }
          if (E === i) {
            m = !0, i = s, l = u;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = u.child; E; ) {
            if (E === l) {
              m = !0, l = u, i = s;
              break;
            }
            if (E === i) {
              m = !0, i = u, l = s;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(a(189));
        }
      }
      if (l.alternate !== i) throw Error(a(190));
    }
    if (l.tag !== 3) throw Error(a(188));
    return l.stateNode.current === l ? e : t;
  }
  function y(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = y(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.fragment"), N = /* @__PURE__ */ Symbol.for("react.strict_mode"), T = /* @__PURE__ */ Symbol.for("react.profiler"), M = /* @__PURE__ */ Symbol.for("react.consumer"), A = /* @__PURE__ */ Symbol.for("react.context"), k = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), P = /* @__PURE__ */ Symbol.for("react.suspense_list"), G = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), K = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function de(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = /* @__PURE__ */ Symbol.for("react.client.reference");
  function pe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case _:
        return "Fragment";
      case T:
        return "Profiler";
      case N:
        return "StrictMode";
      case H:
        return "Suspense";
      case P:
        return "SuspenseList";
      case K:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case A:
          return e.displayName || "Context";
        case M:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case G:
          return t = e.displayName || null, t !== null ? t : pe(e.type) || "Memo";
        case L:
          t = e._payload, e = e._init;
          try {
            return pe(e(t));
          } catch {
          }
      }
    return null;
  }
  var be = Array.isArray, V = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, xe = [], ae = -1;
  function z(e) {
    return { current: e };
  }
  function F(e) {
    0 > ae || (e.current = xe[ae], xe[ae] = null, ae--);
  }
  function ne(e, t) {
    ae++, xe[ae] = e.current, e.current = t;
  }
  var oe = z(null), ge = z(null), _e = z(null), qe = z(null);
  function Me(e, t) {
    switch (ne(_e, t), ne(ge, e), ne(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Nb(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Nb(t), e = kb(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    F(oe), ne(oe, e);
  }
  function Te() {
    F(oe), F(ge), F(_e);
  }
  function it(e) {
    e.memoizedState !== null && ne(qe, e);
    var t = oe.current, l = kb(t, e.type);
    t !== l && (ne(ge, e), ne(oe, l));
  }
  function gt(e) {
    ge.current === e && (F(oe), F(ge)), qe.current === e && (F(qe), Ja._currentValue = Q);
  }
  var ke, et;
  function Ne(e) {
    if (ke === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ke = t && t[1] || "", et = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ke + e + et;
  }
  var je = !1;
  function He(e, t) {
    if (!e || je) return "";
    je = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var me = function() {
                throw Error();
              };
              if (Object.defineProperty(me.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(me, []);
                } catch (ie) {
                  var W = ie;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (ie) {
                  W = ie;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ie) {
                W = ie;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (ie) {
            if (ie && W && typeof ie.stack == "string")
              return [ie.stack, W.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = i.DetermineComponentFrameRoot(), m = u[0], E = u[1];
      if (m && E) {
        var j = m.split(`
`), J = E.split(`
`);
        for (s = i = 0; i < j.length && !j[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < J.length && !J[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === j.length || s === J.length)
          for (i = j.length - 1, s = J.length - 1; 1 <= i && 0 <= s && j[i] !== J[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (j[i] !== J[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || j[i] !== J[s]) {
                  var fe = `
` + j[i].replace(" at new ", " at ");
                  return e.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", e.displayName)), fe;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      je = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ne(l) : "";
  }
  function Ae(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ne(e.type);
      case 16:
        return Ne("Lazy");
      case 13:
        return e.child !== t && t !== null ? Ne("Suspense Fallback") : Ne("Suspense");
      case 19:
        return Ne("SuspenseList");
      case 0:
      case 15:
        return He(e.type, !1);
      case 11:
        return He(e.type.render, !1);
      case 1:
        return He(e.type, !0);
      case 31:
        return Ne("Activity");
      default:
        return "";
    }
  }
  function Qe(e) {
    try {
      var t = "", l = null;
      do
        t += Ae(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Oe = Object.prototype.hasOwnProperty, $e = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ve = n.unstable_requestPaint, Z = n.unstable_now, ue = n.unstable_getCurrentPriorityLevel, Ie = n.unstable_ImmediatePriority, Ce = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Mt = n.unstable_IdlePriority, Ct = n.log, Bt = n.unstable_setDisableYieldValue, kt = null, vt = null;
  function Ft(e) {
    if (typeof Ct == "function" && Bt(e), vt && typeof vt.setStrictMode == "function")
      try {
        vt.setStrictMode(kt, e);
      } catch {
      }
  }
  var dt = Math.clz32 ? Math.clz32 : En, Wt = Math.log, ut = Math.LN2;
  function En(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Wt(e) / ut | 0) | 0;
  }
  var Cn = 256, zt = 262144, ot = 4194304;
  function ht(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function Je(e, t, l) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0, u = e.suspendedLanes, m = e.pingedLanes;
    e = e.warmLanes;
    var E = i & 134217727;
    return E !== 0 ? (i = E & ~u, i !== 0 ? s = ht(i) : (m &= E, m !== 0 ? s = ht(m) : l || (l = E & ~e, l !== 0 && (s = ht(l))))) : (E = i & ~u, E !== 0 ? s = ht(E) : m !== 0 ? s = ht(m) : l || (l = i & ~e, l !== 0 && (s = ht(l)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : s;
  }
  function Nt(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Rn(e, t) {
    switch (e) {
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
  function yn() {
    var e = ot;
    return ot <<= 1, (ot & 62914560) === 0 && (ot = 4194304), e;
  }
  function Yt(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function el(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Dt(e, t, l, i, s, u) {
    var m = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var E = e.entanglements, j = e.expirationTimes, J = e.hiddenUpdates;
    for (l = m & ~l; 0 < l; ) {
      var fe = 31 - dt(l), me = 1 << fe;
      E[fe] = 0, j[fe] = -1;
      var W = J[fe];
      if (W !== null)
        for (J[fe] = null, fe = 0; fe < W.length; fe++) {
          var ie = W[fe];
          ie !== null && (ie.lane &= -536870913);
        }
      l &= ~me;
    }
    i !== 0 && io(e, i, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t));
  }
  function io(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - dt(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function Kn(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - dt(l), s = 1 << i;
      s & t | e[i] & t && (e[i] |= t), l &= ~s;
    }
  }
  function nn(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : ro(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function ro(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Nl(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function tl() {
    var e = I.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ty(e.type));
  }
  function Co(e, t) {
    var l = I.p;
    try {
      return I.p = e, t();
    } finally {
      I.p = l;
    }
  }
  var vn = Math.random().toString(36).slice(2), Tt = "__reactFiber$" + vn, Rt = "__reactProps$" + vn, Ye = "__reactContainer$" + vn, Vn = "__reactEvents$" + vn, vr = "__reactListeners$" + vn, xr = "__reactHandles$" + vn, Ro = "__reactResources$" + vn, kl = "__reactMarker$" + vn;
  function st(e) {
    delete e[Tt], delete e[Rt], delete e[Vn], delete e[vr], delete e[xr];
  }
  function pl(e) {
    var t = e[Tt];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[Tt]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Hb(e); e !== null; ) {
            if (l = e[Tt]) return l;
            e = Hb(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function zl(e) {
    if (e = e[Tt] || e[Ye]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ml(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(a(33));
  }
  function In(e) {
    var t = e[Ro];
    return t || (t = e[Ro] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Jt(e) {
    e[kl] = !0;
  }
  var fn = /* @__PURE__ */ new Set(), Hn = {};
  function nl(e, t) {
    ao(e, t), ao(e + "Capture", t);
  }
  function ao(e, t) {
    for (Hn[e] = t, e = 0; e < t.length; e++)
      fn.add(t[e]);
  }
  var wo = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ji = {}, so = {};
  function Sr(e) {
    return Oe.call(so, e) ? !0 : Oe.call(ji, e) ? !1 : wo.test(e) ? so[e] = !0 : (ji[e] = !0, !1);
  }
  function co(e, t, l) {
    if (Sr(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function _o(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function ll(e, t, l, i) {
    if (i === null) e.removeAttribute(l);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + i);
    }
  }
  function ln(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Fn(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ol(e, t, l) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var s = i.get, u = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          l = "" + m, u.call(this, m);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(m) {
          l = "" + m;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Dl(e) {
    if (!e._valueTracker) {
      var t = Fn(e) ? "checked" : "value";
      e._valueTracker = ol(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Qn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = Fn(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Un(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Er = /[\n"\\]/g;
  function wn(e) {
    return e.replace(
      Er,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Li(e, t, l, i, s, u, m, E) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + ln(t)) : e.value !== "" + ln(t) && (e.value = "" + ln(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? ei(e, m, ln(t)) : l != null ? ei(e, m, ln(l)) : i != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + ln(E) : e.removeAttribute("name");
  }
  function Cr(e, t, l, i, s, u, m, E) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Dl(e);
        return;
      }
      l = l != null ? "" + ln(l) : "", t = t != null ? "" + ln(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = E ? e.checked : !!i, e.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), Dl(e);
  }
  function ei(e, t, l) {
    t === "number" && Un(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function gl(e, t, l, i) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && i && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + ln(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, i && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vi(e, t, l) {
    if (t != null && (t = "" + ln(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + ln(l) : "";
  }
  function Ao(e, t, l, i) {
    if (t == null) {
      if (i != null) {
        if (l != null) throw Error(a(92));
        if (be(i)) {
          if (1 < i.length) throw Error(a(93));
          i = i[0];
        }
        l = i;
      }
      l == null && (l = ""), t = l;
    }
    l = ln(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), Dl(e);
  }
  function $l(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Mo = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bl(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Mo.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function uo(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var s in t)
        i = t[s], t.hasOwnProperty(s) && l[s] !== i && bl(e, s, i);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && bl(e, u, t[u]);
  }
  function Qt(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var To = /* @__PURE__ */ new Map([
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
  ]), Jl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function jl(e) {
    return Jl.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Bn() {
  }
  var Ii = null;
  function R(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var O = null, D = null;
  function Y(e) {
    var t = zl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Li(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + wn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var s = i[Rt] || null;
                if (!s) throw Error(a(90));
                Li(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < l.length; t++)
              i = l[t], i.form === e.form && Qn(i);
          }
          break e;
        case "textarea":
          Vi(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && gl(e, !!l.multiple, t, !1);
      }
    }
  }
  var ee = !1;
  function re(e, t, l) {
    if (ee) return e(t, l);
    ee = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (ee = !1, (O !== null || D !== null) && (fc(), O && (t = O, e = D, D = O = null, Y(t), e)))
        for (t = 0; t < e.length; t++) Y(e[t]);
    }
  }
  function q(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var i = l[Rt] || null;
    if (i === null) return null;
    l = i[t];
    e: switch (t) {
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
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        a(231, t, typeof l)
      );
    return l;
  }
  var U = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ce = !1;
  if (U)
    try {
      var ye = {};
      Object.defineProperty(ye, "passive", {
        get: function() {
          ce = !0;
        }
      }), window.addEventListener("test", ye, ye), window.removeEventListener("test", ye, ye);
    } catch {
      ce = !1;
    }
  var Re = null, Ue = null, we = null;
  function Ve() {
    if (we) return we;
    var e, t = Ue, l = t.length, i, s = "value" in Re ? Re.value : Re.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var m = l - e;
    for (i = 1; i <= m && t[l - i] === s[u - i]; i++) ;
    return we = s.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Et(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function on() {
    return !0;
  }
  function Zn() {
    return !1;
  }
  function rn(e) {
    function t(l, i, s, u, m) {
      this._reactName = l, this._targetInst = s, this.type = i, this.nativeEvent = u, this.target = m, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (l = e[E], this[E] = l ? l(u) : u[E]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? on : Zn, this.isPropagationStopped = Zn, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = on);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = on);
      },
      persist: function() {
      },
      isPersistent: on
    }), t;
  }
  var dn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, fo = rn(dn), Tn = v({}, dn, { view: 0, detail: 0 }), Wl = rn(Tn), Ll, On, $n, Oo = v({}, Tn, {
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
    getModifierState: ju,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== $n && ($n && e.type === "mousemove" ? (Ll = e.screenX - $n.screenX, On = e.screenY - $n.screenY) : On = Ll = 0, $n = e), Ll);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : On;
    }
  }), ya = rn(Oo), Ts = v({}, Oo, { dataTransfer: 0 }), tS = rn(Ts), nS = v({}, Tn, { relatedTarget: 0 }), Du = rn(nS), lS = v({}, dn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oS = rn(lS), iS = v({}, dn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rS = rn(iS), aS = v({}, dn, { data: 0 }), jp = rn(aS), sS = {
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
  }, cS = {
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
  }, uS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = uS[e]) ? !!t[e] : !1;
  }
  function ju() {
    return fS;
  }
  var dS = v({}, Tn, {
    key: function(e) {
      if (e.key) {
        var t = sS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Et(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ju,
    charCode: function(e) {
      return e.type === "keypress" ? Et(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Et(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hS = rn(dS), pS = v({}, Oo, {
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
  }), Lp = rn(pS), mS = v({}, Tn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ju
  }), gS = rn(mS), bS = v({}, dn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yS = rn(bS), vS = v({}, Oo, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xS = rn(vS), SS = v({}, dn, {
    newState: 0,
    oldState: 0
  }), ES = rn(SS), CS = [9, 13, 27, 32], Lu = U && "CompositionEvent" in window, va = null;
  U && "documentMode" in document && (va = document.documentMode);
  var RS = U && "TextEvent" in window && !va, Vp = U && (!Lu || va && 8 < va && 11 >= va), Ip = " ", Hp = !1;
  function Up(e, t) {
    switch (e) {
      case "keyup":
        return CS.indexOf(t.keyCode) !== -1;
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
  function Bp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Rr = !1;
  function wS(e, t) {
    switch (e) {
      case "compositionend":
        return Bp(t);
      case "keypress":
        return t.which !== 32 ? null : (Hp = !0, Ip);
      case "textInput":
        return e = t.data, e === Ip && Hp ? null : e;
      default:
        return null;
    }
  }
  function _S(e, t) {
    if (Rr)
      return e === "compositionend" || !Lu && Up(e, t) ? (e = Ve(), we = Ue = Re = null, Rr = !1, e) : null;
    switch (e) {
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
        return Vp && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var AS = {
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
  function Gp(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!AS[e.type] : t === "textarea";
  }
  function Yp(e, t, l, i) {
    O ? D ? D.push(i) : D = [i] : O = i, t = yc(t, "onChange"), 0 < t.length && (l = new fo(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var xa = null, Sa = null;
  function MS(e) {
    wb(e, 0);
  }
  function Os(e) {
    var t = ml(e);
    if (Qn(t)) return e;
  }
  function qp(e, t) {
    if (e === "change") return t;
  }
  var Pp = !1;
  if (U) {
    var Vu;
    if (U) {
      var Iu = "oninput" in document;
      if (!Iu) {
        var Xp = document.createElement("div");
        Xp.setAttribute("oninput", "return;"), Iu = typeof Xp.oninput == "function";
      }
      Vu = Iu;
    } else Vu = !1;
    Pp = Vu && (!document.documentMode || 9 < document.documentMode);
  }
  function Kp() {
    xa && (xa.detachEvent("onpropertychange", Fp), Sa = xa = null);
  }
  function Fp(e) {
    if (e.propertyName === "value" && Os(Sa)) {
      var t = [];
      Yp(
        t,
        Sa,
        e,
        R(e)
      ), re(MS, t);
    }
  }
  function TS(e, t, l) {
    e === "focusin" ? (Kp(), xa = t, Sa = l, xa.attachEvent("onpropertychange", Fp)) : e === "focusout" && Kp();
  }
  function OS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Os(Sa);
  }
  function NS(e, t) {
    if (e === "click") return Os(t);
  }
  function kS(e, t) {
    if (e === "input" || e === "change")
      return Os(t);
  }
  function zS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var yl = typeof Object.is == "function" ? Object.is : zS;
  function Ea(e, t) {
    if (yl(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var s = l[i];
      if (!Oe.call(t, s) || !yl(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Qp(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Zp(e, t) {
    var l = Qp(e);
    e = 0;
    for (var i; l; ) {
      if (l.nodeType === 3) {
        if (i = e + l.textContent.length, e <= t && i >= t)
          return { node: l, offset: t - e };
        e = i;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Qp(l);
    }
  }
  function $p(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? $p(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Jp(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Un(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Un(e.document);
    }
    return t;
  }
  function Hu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var DS = U && "documentMode" in document && 11 >= document.documentMode, wr = null, Uu = null, Ca = null, Bu = !1;
  function Wp(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Bu || wr == null || wr !== Un(i) || (i = wr, "selectionStart" in i && Hu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ca && Ea(Ca, i) || (Ca = i, i = yc(Uu, "onSelect"), 0 < i.length && (t = new fo(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = wr)));
  }
  function Hi(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var _r = {
    animationend: Hi("Animation", "AnimationEnd"),
    animationiteration: Hi("Animation", "AnimationIteration"),
    animationstart: Hi("Animation", "AnimationStart"),
    transitionrun: Hi("Transition", "TransitionRun"),
    transitionstart: Hi("Transition", "TransitionStart"),
    transitioncancel: Hi("Transition", "TransitionCancel"),
    transitionend: Hi("Transition", "TransitionEnd")
  }, Gu = {}, em = {};
  U && (em = document.createElement("div").style, "AnimationEvent" in window || (delete _r.animationend.animation, delete _r.animationiteration.animation, delete _r.animationstart.animation), "TransitionEvent" in window || delete _r.transitionend.transition);
  function Ui(e) {
    if (Gu[e]) return Gu[e];
    if (!_r[e]) return e;
    var t = _r[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in em)
        return Gu[e] = t[l];
    return e;
  }
  var tm = Ui("animationend"), nm = Ui("animationiteration"), lm = Ui("animationstart"), jS = Ui("transitionrun"), LS = Ui("transitionstart"), VS = Ui("transitioncancel"), om = Ui("transitionend"), im = /* @__PURE__ */ new Map(), Yu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Yu.push("scrollEnd");
  function eo(e, t) {
    im.set(e, t), nl(t, [e]);
  }
  var Ns = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Vl = [], Ar = 0, qu = 0;
  function ks() {
    for (var e = Ar, t = qu = Ar = 0; t < e; ) {
      var l = Vl[t];
      Vl[t++] = null;
      var i = Vl[t];
      Vl[t++] = null;
      var s = Vl[t];
      Vl[t++] = null;
      var u = Vl[t];
      if (Vl[t++] = null, i !== null && s !== null) {
        var m = i.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), i.pending = s;
      }
      u !== 0 && rm(l, s, u);
    }
  }
  function zs(e, t, l, i) {
    Vl[Ar++] = e, Vl[Ar++] = t, Vl[Ar++] = l, Vl[Ar++] = i, qu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Pu(e, t, l, i) {
    return zs(e, t, l, i), Ds(e);
  }
  function Bi(e, t) {
    return zs(e, null, null, t), Ds(e);
  }
  function rm(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, i = u.alternate, i !== null && (i.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - dt(l), e = u.hiddenUpdates, i = e[s], i === null ? e[s] = [t] : i.push(t), t.lane = l | 536870912), u) : null;
  }
  function Ds(e) {
    if (50 < Pa)
      throw Pa = 0, td = null, Error(a(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Mr = {};
  function IS(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function vl(e, t, l, i) {
    return new IS(e, t, l, i);
  }
  function Xu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function No(e, t) {
    var l = e.alternate;
    return l === null ? (l = vl(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function am(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function js(e, t, l, i, s, u) {
    var m = 0;
    if (i = e, typeof e == "function") Xu(e) && (m = 1);
    else if (typeof e == "string")
      m = YE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case K:
          return e = vl(31, l, t, s), e.elementType = K, e.lanes = u, e;
        case _:
          return Gi(l.children, s, u, t);
        case N:
          m = 8, s |= 24;
          break;
        case T:
          return e = vl(12, l, t, s | 2), e.elementType = T, e.lanes = u, e;
        case H:
          return e = vl(13, l, t, s), e.elementType = H, e.lanes = u, e;
        case P:
          return e = vl(19, l, t, s), e.elementType = P, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case A:
                m = 10;
                break e;
              case M:
                m = 9;
                break e;
              case k:
                m = 11;
                break e;
              case G:
                m = 14;
                break e;
              case L:
                m = 16, i = null;
                break e;
            }
          m = 29, l = Error(
            a(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = vl(m, l, t, s), t.elementType = e, t.type = i, t.lanes = u, t;
  }
  function Gi(e, t, l, i) {
    return e = vl(7, e, i, t), e.lanes = l, e;
  }
  function Ku(e, t, l) {
    return e = vl(6, e, null, t), e.lanes = l, e;
  }
  function sm(e) {
    var t = vl(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Fu(e, t, l) {
    return t = vl(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var cm = /* @__PURE__ */ new WeakMap();
  function Il(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = cm.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Qe(t)
      }, cm.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Qe(t)
    };
  }
  var Tr = [], Or = 0, Ls = null, Ra = 0, Hl = [], Ul = 0, ti = null, ho = 1, po = "";
  function ko(e, t) {
    Tr[Or++] = Ra, Tr[Or++] = Ls, Ls = e, Ra = t;
  }
  function um(e, t, l) {
    Hl[Ul++] = ho, Hl[Ul++] = po, Hl[Ul++] = ti, ti = e;
    var i = ho;
    e = po;
    var s = 32 - dt(i) - 1;
    i &= ~(1 << s), l += 1;
    var u = 32 - dt(t) + s;
    if (30 < u) {
      var m = s - s % 5;
      u = (i & (1 << m) - 1).toString(32), i >>= m, s -= m, ho = 1 << 32 - dt(t) + s | l << s | i, po = u + e;
    } else
      ho = 1 << u | l << s | i, po = e;
  }
  function Qu(e) {
    e.return !== null && (ko(e, 1), um(e, 1, 0));
  }
  function Zu(e) {
    for (; e === Ls; )
      Ls = Tr[--Or], Tr[Or] = null, Ra = Tr[--Or], Tr[Or] = null;
    for (; e === ti; )
      ti = Hl[--Ul], Hl[Ul] = null, po = Hl[--Ul], Hl[Ul] = null, ho = Hl[--Ul], Hl[Ul] = null;
  }
  function fm(e, t) {
    Hl[Ul++] = ho, Hl[Ul++] = po, Hl[Ul++] = ti, ho = t.id, po = t.overflow, ti = e;
  }
  var Nn = null, qt = null, xt = !1, ni = null, Bl = !1, $u = Error(a(519));
  function li(e) {
    var t = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw wa(Il(t, e)), $u;
  }
  function dm(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[Tt] = e, t[Rt] = i, l) {
      case "dialog":
        mt("cancel", t), mt("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        mt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ka.length; l++)
          mt(Ka[l], t);
        break;
      case "source":
        mt("error", t);
        break;
      case "img":
      case "image":
      case "link":
        mt("error", t), mt("load", t);
        break;
      case "details":
        mt("toggle", t);
        break;
      case "input":
        mt("invalid", t), Cr(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        mt("invalid", t);
        break;
      case "textarea":
        mt("invalid", t), Ao(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || Tb(t.textContent, l) ? (i.popover != null && (mt("beforetoggle", t), mt("toggle", t)), i.onScroll != null && mt("scroll", t), i.onScrollEnd != null && mt("scrollend", t), i.onClick != null && (t.onclick = Bn), t = !0) : t = !1, t || li(e, !0);
  }
  function hm(e) {
    for (Nn = e.return; Nn; )
      switch (Nn.tag) {
        case 5:
        case 31:
        case 13:
          Bl = !1;
          return;
        case 27:
        case 3:
          Bl = !0;
          return;
        default:
          Nn = Nn.return;
      }
  }
  function Nr(e) {
    if (e !== Nn) return !1;
    if (!xt) return hm(e), xt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || gd(e.type, e.memoizedProps)), l = !l), l && qt && li(e), hm(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Ib(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Ib(e);
    } else
      t === 27 ? (t = qt, bi(e.type) ? (e = Sd, Sd = null, qt = e) : qt = t) : qt = Nn ? Yl(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Yi() {
    qt = Nn = null, xt = !1;
  }
  function Ju() {
    var e = ni;
    return e !== null && (sl === null ? sl = e : sl.push.apply(
      sl,
      e
    ), ni = null), e;
  }
  function wa(e) {
    ni === null ? ni = [e] : ni.push(e);
  }
  var Wu = z(null), qi = null, zo = null;
  function oi(e, t, l) {
    ne(Wu, t._currentValue), t._currentValue = l;
  }
  function Do(e) {
    e._currentValue = Wu.current, F(Wu);
  }
  function ef(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function tf(e, t, l, i) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var m = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var E = u;
          u = s;
          for (var j = 0; j < t.length; j++)
            if (E.context === t[j]) {
              u.lanes |= l, E = u.alternate, E !== null && (E.lanes |= l), ef(
                u.return,
                l,
                e
              ), i || (m = null);
              break e;
            }
          u = E.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(a(341));
        m.lanes |= l, u = m.alternate, u !== null && (u.lanes |= l), ef(m, l, e), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function kr(e, t, l, i) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(a(387));
        if (m = m.memoizedProps, m !== null) {
          var E = s.type;
          yl(s.pendingProps.value, m.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (s === qe.current) {
        if (m = s.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(Ja) : e = [Ja]);
      }
      s = s.return;
    }
    e !== null && tf(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function Vs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!yl(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Pi(e) {
    qi = e, zo = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function kn(e) {
    return pm(qi, e);
  }
  function Is(e, t) {
    return qi === null && Pi(e), pm(e, t);
  }
  function pm(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, zo === null) {
      if (e === null) throw Error(a(308));
      zo = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else zo = zo.next = t;
    return l;
  }
  var HS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, US = n.unstable_scheduleCallback, BS = n.unstable_NormalPriority, hn = {
    $$typeof: A,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function nf() {
    return {
      controller: new HS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function _a(e) {
    e.refCount--, e.refCount === 0 && US(BS, function() {
      e.controller.abort();
    });
  }
  var Aa = null, lf = 0, zr = 0, Dr = null;
  function GS(e, t) {
    if (Aa === null) {
      var l = Aa = [];
      lf = 0, zr = ad(), Dr = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return lf++, t.then(mm, mm), t;
  }
  function mm() {
    if (--lf === 0 && Aa !== null) {
      Dr !== null && (Dr.status = "fulfilled");
      var e = Aa;
      Aa = null, zr = 0, Dr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function YS(e, t) {
    var l = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        l.push(s);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var s = 0; s < l.length; s++) (0, l[s])(t);
      },
      function(s) {
        for (i.status = "rejected", i.reason = s, s = 0; s < l.length; s++)
          (0, l[s])(void 0);
      }
    ), i;
  }
  var gm = V.S;
  V.S = function(e, t) {
    Wg = Z(), typeof t == "object" && t !== null && typeof t.then == "function" && GS(e, t), gm !== null && gm(e, t);
  };
  var Xi = z(null);
  function of() {
    var e = Xi.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function Hs(e, t) {
    t === null ? ne(Xi, Xi.current) : ne(Xi, t.pool);
  }
  function bm() {
    var e = of();
    return e === null ? null : { parent: hn._currentValue, pool: e };
  }
  var jr = Error(a(460)), rf = Error(a(474)), Us = Error(a(542)), Bs = { then: function() {
  } };
  function ym(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function vm(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Bn, Bn), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Sm(e), e;
      default:
        if (typeof t.status == "string") t.then(Bn, Bn);
        else {
          if (e = Ut, e !== null && 100 < e.shellSuspendCounter)
            throw Error(a(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Sm(e), e;
        }
        throw Fi = t, jr;
    }
  }
  function Ki(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Fi = l, jr) : l;
    }
  }
  var Fi = null;
  function xm() {
    if (Fi === null) throw Error(a(459));
    var e = Fi;
    return Fi = null, e;
  }
  function Sm(e) {
    if (e === jr || e === Us)
      throw Error(a(483));
  }
  var Lr = null, Ma = 0;
  function Gs(e) {
    var t = Ma;
    return Ma += 1, Lr === null && (Lr = []), vm(Lr, e, t);
  }
  function Ta(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Ys(e, t) {
    throw t.$$typeof === x ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Em(e) {
    function t(X, B) {
      if (e) {
        var $ = X.deletions;
        $ === null ? (X.deletions = [B], X.flags |= 16) : $.push(B);
      }
    }
    function l(X, B) {
      if (!e) return null;
      for (; B !== null; )
        t(X, B), B = B.sibling;
      return null;
    }
    function i(X) {
      for (var B = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? B.set(X.key, X) : B.set(X.index, X), X = X.sibling;
      return B;
    }
    function s(X, B) {
      return X = No(X, B), X.index = 0, X.sibling = null, X;
    }
    function u(X, B, $) {
      return X.index = $, e ? ($ = X.alternate, $ !== null ? ($ = $.index, $ < B ? (X.flags |= 67108866, B) : $) : (X.flags |= 67108866, B)) : (X.flags |= 1048576, B);
    }
    function m(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, B, $, he) {
      return B === null || B.tag !== 6 ? (B = Ku($, X.mode, he), B.return = X, B) : (B = s(B, $), B.return = X, B);
    }
    function j(X, B, $, he) {
      var Pe = $.type;
      return Pe === _ ? fe(
        X,
        B,
        $.props.children,
        he,
        $.key
      ) : B !== null && (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && Ki(Pe) === B.type) ? (B = s(B, $.props), Ta(B, $), B.return = X, B) : (B = js(
        $.type,
        $.key,
        $.props,
        null,
        X.mode,
        he
      ), Ta(B, $), B.return = X, B);
    }
    function J(X, B, $, he) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== $.containerInfo || B.stateNode.implementation !== $.implementation ? (B = Fu($, X.mode, he), B.return = X, B) : (B = s(B, $.children || []), B.return = X, B);
    }
    function fe(X, B, $, he, Pe) {
      return B === null || B.tag !== 7 ? (B = Gi(
        $,
        X.mode,
        he,
        Pe
      ), B.return = X, B) : (B = s(B, $), B.return = X, B);
    }
    function me(X, B, $) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = Ku(
          "" + B,
          X.mode,
          $
        ), B.return = X, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case C:
            return $ = js(
              B.type,
              B.key,
              B.props,
              null,
              X.mode,
              $
            ), Ta($, B), $.return = X, $;
          case w:
            return B = Fu(
              B,
              X.mode,
              $
            ), B.return = X, B;
          case L:
            return B = Ki(B), me(X, B, $);
        }
        if (be(B) || de(B))
          return B = Gi(
            B,
            X.mode,
            $,
            null
          ), B.return = X, B;
        if (typeof B.then == "function")
          return me(X, Gs(B), $);
        if (B.$$typeof === A)
          return me(
            X,
            Is(X, B),
            $
          );
        Ys(X, B);
      }
      return null;
    }
    function W(X, B, $, he) {
      var Pe = B !== null ? B.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return Pe !== null ? null : E(X, B, "" + $, he);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            return $.key === Pe ? j(X, B, $, he) : null;
          case w:
            return $.key === Pe ? J(X, B, $, he) : null;
          case L:
            return $ = Ki($), W(X, B, $, he);
        }
        if (be($) || de($))
          return Pe !== null ? null : fe(X, B, $, he, null);
        if (typeof $.then == "function")
          return W(
            X,
            B,
            Gs($),
            he
          );
        if ($.$$typeof === A)
          return W(
            X,
            B,
            Is(X, $),
            he
          );
        Ys(X, $);
      }
      return null;
    }
    function ie(X, B, $, he, Pe) {
      if (typeof he == "string" && he !== "" || typeof he == "number" || typeof he == "bigint")
        return X = X.get($) || null, E(B, X, "" + he, Pe);
      if (typeof he == "object" && he !== null) {
        switch (he.$$typeof) {
          case C:
            return X = X.get(
              he.key === null ? $ : he.key
            ) || null, j(B, X, he, Pe);
          case w:
            return X = X.get(
              he.key === null ? $ : he.key
            ) || null, J(B, X, he, Pe);
          case L:
            return he = Ki(he), ie(
              X,
              B,
              $,
              he,
              Pe
            );
        }
        if (be(he) || de(he))
          return X = X.get($) || null, fe(B, X, he, Pe, null);
        if (typeof he.then == "function")
          return ie(
            X,
            B,
            $,
            Gs(he),
            Pe
          );
        if (he.$$typeof === A)
          return ie(
            X,
            B,
            $,
            Is(B, he),
            Pe
          );
        Ys(B, he);
      }
      return null;
    }
    function Le(X, B, $, he) {
      for (var Pe = null, wt = null, Be = B, ct = B = 0, yt = null; Be !== null && ct < $.length; ct++) {
        Be.index > ct ? (yt = Be, Be = null) : yt = Be.sibling;
        var _t = W(
          X,
          Be,
          $[ct],
          he
        );
        if (_t === null) {
          Be === null && (Be = yt);
          break;
        }
        e && Be && _t.alternate === null && t(X, Be), B = u(_t, B, ct), wt === null ? Pe = _t : wt.sibling = _t, wt = _t, Be = yt;
      }
      if (ct === $.length)
        return l(X, Be), xt && ko(X, ct), Pe;
      if (Be === null) {
        for (; ct < $.length; ct++)
          Be = me(X, $[ct], he), Be !== null && (B = u(
            Be,
            B,
            ct
          ), wt === null ? Pe = Be : wt.sibling = Be, wt = Be);
        return xt && ko(X, ct), Pe;
      }
      for (Be = i(Be); ct < $.length; ct++)
        yt = ie(
          Be,
          X,
          ct,
          $[ct],
          he
        ), yt !== null && (e && yt.alternate !== null && Be.delete(
          yt.key === null ? ct : yt.key
        ), B = u(
          yt,
          B,
          ct
        ), wt === null ? Pe = yt : wt.sibling = yt, wt = yt);
      return e && Be.forEach(function(Ei) {
        return t(X, Ei);
      }), xt && ko(X, ct), Pe;
    }
    function Ze(X, B, $, he) {
      if ($ == null) throw Error(a(151));
      for (var Pe = null, wt = null, Be = B, ct = B = 0, yt = null, _t = $.next(); Be !== null && !_t.done; ct++, _t = $.next()) {
        Be.index > ct ? (yt = Be, Be = null) : yt = Be.sibling;
        var Ei = W(X, Be, _t.value, he);
        if (Ei === null) {
          Be === null && (Be = yt);
          break;
        }
        e && Be && Ei.alternate === null && t(X, Be), B = u(Ei, B, ct), wt === null ? Pe = Ei : wt.sibling = Ei, wt = Ei, Be = yt;
      }
      if (_t.done)
        return l(X, Be), xt && ko(X, ct), Pe;
      if (Be === null) {
        for (; !_t.done; ct++, _t = $.next())
          _t = me(X, _t.value, he), _t !== null && (B = u(_t, B, ct), wt === null ? Pe = _t : wt.sibling = _t, wt = _t);
        return xt && ko(X, ct), Pe;
      }
      for (Be = i(Be); !_t.done; ct++, _t = $.next())
        _t = ie(Be, X, ct, _t.value, he), _t !== null && (e && _t.alternate !== null && Be.delete(_t.key === null ? ct : _t.key), B = u(_t, B, ct), wt === null ? Pe = _t : wt.sibling = _t, wt = _t);
      return e && Be.forEach(function(eC) {
        return t(X, eC);
      }), xt && ko(X, ct), Pe;
    }
    function Ht(X, B, $, he) {
      if (typeof $ == "object" && $ !== null && $.type === _ && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            e: {
              for (var Pe = $.key; B !== null; ) {
                if (B.key === Pe) {
                  if (Pe = $.type, Pe === _) {
                    if (B.tag === 7) {
                      l(
                        X,
                        B.sibling
                      ), he = s(
                        B,
                        $.props.children
                      ), he.return = X, X = he;
                      break e;
                    }
                  } else if (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && Ki(Pe) === B.type) {
                    l(
                      X,
                      B.sibling
                    ), he = s(B, $.props), Ta(he, $), he.return = X, X = he;
                    break e;
                  }
                  l(X, B);
                  break;
                } else t(X, B);
                B = B.sibling;
              }
              $.type === _ ? (he = Gi(
                $.props.children,
                X.mode,
                he,
                $.key
              ), he.return = X, X = he) : (he = js(
                $.type,
                $.key,
                $.props,
                null,
                X.mode,
                he
              ), Ta(he, $), he.return = X, X = he);
            }
            return m(X);
          case w:
            e: {
              for (Pe = $.key; B !== null; ) {
                if (B.key === Pe)
                  if (B.tag === 4 && B.stateNode.containerInfo === $.containerInfo && B.stateNode.implementation === $.implementation) {
                    l(
                      X,
                      B.sibling
                    ), he = s(B, $.children || []), he.return = X, X = he;
                    break e;
                  } else {
                    l(X, B);
                    break;
                  }
                else t(X, B);
                B = B.sibling;
              }
              he = Fu($, X.mode, he), he.return = X, X = he;
            }
            return m(X);
          case L:
            return $ = Ki($), Ht(
              X,
              B,
              $,
              he
            );
        }
        if (be($))
          return Le(
            X,
            B,
            $,
            he
          );
        if (de($)) {
          if (Pe = de($), typeof Pe != "function") throw Error(a(150));
          return $ = Pe.call($), Ze(
            X,
            B,
            $,
            he
          );
        }
        if (typeof $.then == "function")
          return Ht(
            X,
            B,
            Gs($),
            he
          );
        if ($.$$typeof === A)
          return Ht(
            X,
            B,
            Is(X, $),
            he
          );
        Ys(X, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, B !== null && B.tag === 6 ? (l(X, B.sibling), he = s(B, $), he.return = X, X = he) : (l(X, B), he = Ku($, X.mode, he), he.return = X, X = he), m(X)) : l(X, B);
    }
    return function(X, B, $, he) {
      try {
        Ma = 0;
        var Pe = Ht(
          X,
          B,
          $,
          he
        );
        return Lr = null, Pe;
      } catch (Be) {
        if (Be === jr || Be === Us) throw Be;
        var wt = vl(29, Be, null, X.mode);
        return wt.lanes = he, wt.return = X, wt;
      }
    };
  }
  var Qi = Em(!0), Cm = Em(!1), ii = !1;
  function af(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function sf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ri(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ai(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Ot & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = Ds(e), rm(e, null, l), t;
    }
    return zs(e, i, t, l), Ds(e);
  }
  function Oa(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Kn(e, l);
    }
  }
  function cf(e, t) {
    var l = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, l === i)) {
      var s = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = m : u = u.next = m, l = l.next;
        } while (l !== null);
        u === null ? s = u = t : u = u.next = t;
      } else s = u = t;
      l = {
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var uf = !1;
  function Na() {
    if (uf) {
      var e = Dr;
      if (e !== null) throw e;
    }
  }
  function ka(e, t, l, i) {
    uf = !1;
    var s = e.updateQueue;
    ii = !1;
    var u = s.firstBaseUpdate, m = s.lastBaseUpdate, E = s.shared.pending;
    if (E !== null) {
      s.shared.pending = null;
      var j = E, J = j.next;
      j.next = null, m === null ? u = J : m.next = J, m = j;
      var fe = e.alternate;
      fe !== null && (fe = fe.updateQueue, E = fe.lastBaseUpdate, E !== m && (E === null ? fe.firstBaseUpdate = J : E.next = J, fe.lastBaseUpdate = j));
    }
    if (u !== null) {
      var me = s.baseState;
      m = 0, fe = J = j = null, E = u;
      do {
        var W = E.lane & -536870913, ie = W !== E.lane;
        if (ie ? (bt & W) === W : (i & W) === W) {
          W !== 0 && W === zr && (uf = !0), fe !== null && (fe = fe.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Le = e, Ze = E;
            W = t;
            var Ht = l;
            switch (Ze.tag) {
              case 1:
                if (Le = Ze.payload, typeof Le == "function") {
                  me = Le.call(Ht, me, W);
                  break e;
                }
                me = Le;
                break e;
              case 3:
                Le.flags = Le.flags & -65537 | 128;
              case 0:
                if (Le = Ze.payload, W = typeof Le == "function" ? Le.call(Ht, me, W) : Le, W == null) break e;
                me = v({}, me, W);
                break e;
              case 2:
                ii = !0;
            }
          }
          W = E.callback, W !== null && (e.flags |= 64, ie && (e.flags |= 8192), ie = s.callbacks, ie === null ? s.callbacks = [W] : ie.push(W));
        } else
          ie = {
            lane: W,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, fe === null ? (J = fe = ie, j = me) : fe = fe.next = ie, m |= W;
        if (E = E.next, E === null) {
          if (E = s.shared.pending, E === null)
            break;
          ie = E, E = ie.next, ie.next = null, s.lastBaseUpdate = ie, s.shared.pending = null;
        }
      } while (!0);
      fe === null && (j = me), s.baseState = j, s.firstBaseUpdate = J, s.lastBaseUpdate = fe, u === null && (s.shared.lanes = 0), di |= m, e.lanes = m, e.memoizedState = me;
    }
  }
  function Rm(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function wm(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Rm(l[e], t);
  }
  var Vr = z(null), qs = z(0);
  function _m(e, t) {
    e = Yo, ne(qs, e), ne(Vr, t), Yo = e | t.baseLanes;
  }
  function ff() {
    ne(qs, Yo), ne(Vr, Vr.current);
  }
  function df() {
    Yo = qs.current, F(Vr), F(qs);
  }
  var xl = z(null), Gl = null;
  function si(e) {
    var t = e.alternate;
    ne(an, an.current & 1), ne(xl, e), Gl === null && (t === null || Vr.current !== null || t.memoizedState !== null) && (Gl = e);
  }
  function hf(e) {
    ne(an, an.current), ne(xl, e), Gl === null && (Gl = e);
  }
  function Am(e) {
    e.tag === 22 ? (ne(an, an.current), ne(xl, e), Gl === null && (Gl = e)) : ci();
  }
  function ci() {
    ne(an, an.current), ne(xl, xl.current);
  }
  function Sl(e) {
    F(xl), Gl === e && (Gl = null), F(an);
  }
  var an = z(0);
  function Ps(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || vd(l) || xd(l)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var jo = 0, rt = null, Vt = null, pn = null, Xs = !1, Ir = !1, Zi = !1, Ks = 0, za = 0, Hr = null, qS = 0;
  function en() {
    throw Error(a(321));
  }
  function pf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!yl(e[l], t[l])) return !1;
    return !0;
  }
  function mf(e, t, l, i, s, u) {
    return jo = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? ug : Of, Zi = !1, u = l(i, s), Zi = !1, Ir && (u = Tm(
      t,
      l,
      i,
      s
    )), Mm(e), u;
  }
  function Mm(e) {
    V.H = La;
    var t = Vt !== null && Vt.next !== null;
    if (jo = 0, pn = Vt = rt = null, Xs = !1, za = 0, Hr = null, t) throw Error(a(300));
    e === null || mn || (e = e.dependencies, e !== null && Vs(e) && (mn = !0));
  }
  function Tm(e, t, l, i) {
    rt = e;
    var s = 0;
    do {
      if (Ir && (Hr = null), za = 0, Ir = !1, 25 <= s) throw Error(a(301));
      if (s += 1, pn = Vt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = fg, u = t(l, i);
    } while (Ir);
    return u;
  }
  function PS() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Da(t) : t, e = e.useState()[0], (Vt !== null ? Vt.memoizedState : null) !== e && (rt.flags |= 1024), t;
  }
  function gf() {
    var e = Ks !== 0;
    return Ks = 0, e;
  }
  function bf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function yf(e) {
    if (Xs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Xs = !1;
    }
    jo = 0, pn = Vt = rt = null, Ir = !1, za = Ks = 0, Hr = null;
  }
  function Jn() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return pn === null ? rt.memoizedState = pn = e : pn = pn.next = e, pn;
  }
  function sn() {
    if (Vt === null) {
      var e = rt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Vt.next;
    var t = pn === null ? rt.memoizedState : pn.next;
    if (t !== null)
      pn = t, Vt = e;
    else {
      if (e === null)
        throw rt.alternate === null ? Error(a(467)) : Error(a(310));
      Vt = e, e = {
        memoizedState: Vt.memoizedState,
        baseState: Vt.baseState,
        baseQueue: Vt.baseQueue,
        queue: Vt.queue,
        next: null
      }, pn === null ? rt.memoizedState = pn = e : pn = pn.next = e;
    }
    return pn;
  }
  function Fs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Da(e) {
    var t = za;
    return za += 1, Hr === null && (Hr = []), e = vm(Hr, e, t), t = rt, (pn === null ? t.memoizedState : pn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? ug : Of), e;
  }
  function Qs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Da(e);
      if (e.$$typeof === A) return kn(e);
    }
    throw Error(a(438, String(e)));
  }
  function vf(e) {
    var t = null, l = rt.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var i = rt.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Fs(), rt.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = te;
    return t.index++, l;
  }
  function Lo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Zs(e) {
    var t = sn();
    return xf(t, Vt, e);
  }
  function xf(e, t, l) {
    var i = e.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = l;
    var s = e.baseQueue, u = i.pending;
    if (u !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = u.next, u.next = m;
      }
      t.baseQueue = s = u, i.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var E = m = null, j = null, J = t, fe = !1;
      do {
        var me = J.lane & -536870913;
        if (me !== J.lane ? (bt & me) === me : (jo & me) === me) {
          var W = J.revertLane;
          if (W === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }), me === zr && (fe = !0);
          else if ((jo & W) === W) {
            J = J.next, W === zr && (fe = !0);
            continue;
          } else
            me = {
              lane: 0,
              revertLane: J.revertLane,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }, j === null ? (E = j = me, m = u) : j = j.next = me, rt.lanes |= W, di |= W;
          me = J.action, Zi && l(u, me), u = J.hasEagerState ? J.eagerState : l(u, me);
        } else
          W = {
            lane: me,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, j === null ? (E = j = W, m = u) : j = j.next = W, rt.lanes |= me, di |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (j === null ? m = u : j.next = E, !yl(u, e.memoizedState) && (mn = !0, fe && (l = Dr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = m, e.baseQueue = j, i.lastRenderedState = u;
    }
    return s === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Sf(e) {
    var t = sn(), l = t.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var m = s = s.next;
      do
        u = e(u, m.action), m = m.next;
      while (m !== s);
      yl(u, t.memoizedState) || (mn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, i];
  }
  function Om(e, t, l) {
    var i = rt, s = sn(), u = xt;
    if (u) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = t();
    var m = !yl(
      (Vt || s).memoizedState,
      l
    );
    if (m && (s.memoizedState = l, mn = !0), s = s.queue, Rf(zm.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || m || pn !== null && pn.memoizedState.tag & 1) {
      if (i.flags |= 2048, Ur(
        9,
        { destroy: void 0 },
        km.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(a(349));
      u || (jo & 127) !== 0 || Nm(i, t, l);
    }
    return l;
  }
  function Nm(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Fs(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function km(e, t, l, i) {
    t.value = l, t.getSnapshot = i, Dm(t) && jm(e);
  }
  function zm(e, t, l) {
    return l(function() {
      Dm(t) && jm(e);
    });
  }
  function Dm(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !yl(e, l);
    } catch {
      return !0;
    }
  }
  function jm(e) {
    var t = Bi(e, 2);
    t !== null && cl(t, e, 2);
  }
  function Ef(e) {
    var t = Jn();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Zi) {
        Ft(!0);
        try {
          l();
        } finally {
          Ft(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Lo,
      lastRenderedState: e
    }, t;
  }
  function Lm(e, t, l, i) {
    return e.baseState = l, xf(
      e,
      Vt,
      typeof i == "function" ? i : Lo
    );
  }
  function XS(e, t, l, i, s) {
    if (Ws(e)) throw Error(a(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          u.listeners.push(m);
        }
      };
      V.T !== null ? l(!0) : u.isTransition = !1, i(u), l = t.pending, l === null ? (u.next = t.pending = u, Vm(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Vm(e, t) {
    var l = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, m = {};
      V.T = m;
      try {
        var E = l(s, i), j = V.S;
        j !== null && j(m, E), Im(e, t, E);
      } catch (J) {
        Cf(e, t, J);
      } finally {
        u !== null && m.types !== null && (u.types = m.types), V.T = u;
      }
    } else
      try {
        u = l(s, i), Im(e, t, u);
      } catch (J) {
        Cf(e, t, J);
      }
  }
  function Im(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Hm(e, t, i);
      },
      function(i) {
        return Cf(e, t, i);
      }
    ) : Hm(e, t, l);
  }
  function Hm(e, t, l) {
    t.status = "fulfilled", t.value = l, Um(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Vm(e, l)));
  }
  function Cf(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Um(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Um(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Bm(e, t) {
    return t;
  }
  function Gm(e, t) {
    if (xt) {
      var l = Ut.formState;
      if (l !== null) {
        e: {
          var i = rt;
          if (xt) {
            if (qt) {
              t: {
                for (var s = qt, u = Bl; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = Yl(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                qt = Yl(
                  s.nextSibling
                ), i = s.data === "F!";
                break e;
              }
            }
            li(i);
          }
          i = !1;
        }
        i && (t = l[0]);
      }
    }
    return l = Jn(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bm,
      lastRenderedState: t
    }, l.queue = i, l = ag.bind(
      null,
      rt,
      i
    ), i.dispatch = l, i = Ef(!1), u = Tf.bind(
      null,
      rt,
      !1,
      i.queue
    ), i = Jn(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = s, l = XS.bind(
      null,
      rt,
      s,
      u,
      l
    ), s.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Ym(e) {
    var t = sn();
    return qm(t, Vt, e);
  }
  function qm(e, t, l) {
    if (t = xf(
      e,
      t,
      Bm
    )[0], e = Zs(Lo)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = Da(t);
      } catch (m) {
        throw m === jr ? Us : m;
      }
    else i = t;
    t = sn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (rt.flags |= 2048, Ur(
      9,
      { destroy: void 0 },
      KS.bind(null, s, l),
      null
    )), [i, u, e];
  }
  function KS(e, t) {
    e.action = t;
  }
  function Pm(e) {
    var t = sn(), l = Vt;
    if (l !== null)
      return qm(t, l, e);
    sn(), t = t.memoizedState, l = sn();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Ur(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Fs(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Xm() {
    return sn().memoizedState;
  }
  function $s(e, t, l, i) {
    var s = Jn();
    rt.flags |= e, s.memoizedState = Ur(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Js(e, t, l, i) {
    var s = sn();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    Vt !== null && i !== null && pf(i, Vt.memoizedState.deps) ? s.memoizedState = Ur(t, u, l, i) : (rt.flags |= e, s.memoizedState = Ur(
      1 | t,
      u,
      l,
      i
    ));
  }
  function Km(e, t) {
    $s(8390656, 8, e, t);
  }
  function Rf(e, t) {
    Js(2048, 8, e, t);
  }
  function FS(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Fs(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Fm(e) {
    var t = sn().memoizedState;
    return FS({ ref: t, nextImpl: e }), function() {
      if ((Ot & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Qm(e, t) {
    return Js(4, 2, e, t);
  }
  function Zm(e, t) {
    return Js(4, 4, e, t);
  }
  function $m(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Jm(e, t, l) {
    l = l != null ? l.concat([e]) : null, Js(4, 4, $m.bind(null, t, e), l);
  }
  function wf() {
  }
  function Wm(e, t) {
    var l = sn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && pf(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function eg(e, t) {
    var l = sn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && pf(t, i[1]))
      return i[0];
    if (i = e(), Zi) {
      Ft(!0);
      try {
        e();
      } finally {
        Ft(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function _f(e, t, l) {
    return l === void 0 || (jo & 1073741824) !== 0 && (bt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = tb(), rt.lanes |= e, di |= e, l);
  }
  function tg(e, t, l, i) {
    return yl(l, t) ? l : Vr.current !== null ? (e = _f(e, l, i), yl(e, t) || (mn = !0), e) : (jo & 42) === 0 || (jo & 1073741824) !== 0 && (bt & 261930) === 0 ? (mn = !0, e.memoizedState = l) : (e = tb(), rt.lanes |= e, di |= e, t);
  }
  function ng(e, t, l, i, s) {
    var u = I.p;
    I.p = u !== 0 && 8 > u ? u : 8;
    var m = V.T, E = {};
    V.T = E, Tf(e, !1, t, l);
    try {
      var j = s(), J = V.S;
      if (J !== null && J(E, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var fe = YS(
          j,
          i
        );
        ja(
          e,
          t,
          fe,
          Rl(e)
        );
      } else
        ja(
          e,
          t,
          i,
          Rl(e)
        );
    } catch (me) {
      ja(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Rl()
      );
    } finally {
      I.p = u, m !== null && E.types !== null && (m.types = E.types), V.T = m;
    }
  }
  function QS() {
  }
  function Af(e, t, l, i) {
    if (e.tag !== 5) throw Error(a(476));
    var s = lg(e).queue;
    ng(
      e,
      s,
      t,
      Q,
      l === null ? QS : function() {
        return og(e), l(i);
      }
    );
  }
  function lg(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lo,
        lastRenderedState: Q
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lo,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function og(e) {
    var t = lg(e);
    t.next === null && (t = e.alternate.memoizedState), ja(
      e,
      t.next.queue,
      {},
      Rl()
    );
  }
  function Mf() {
    return kn(Ja);
  }
  function ig() {
    return sn().memoizedState;
  }
  function rg() {
    return sn().memoizedState;
  }
  function ZS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Rl();
          e = ri(l);
          var i = ai(t, e, l);
          i !== null && (cl(i, t, l), Oa(i, t, l)), t = { cache: nf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function $S(e, t, l) {
    var i = Rl();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e) ? sg(t, l) : (l = Pu(e, t, l, i), l !== null && (cl(l, e, i), cg(l, t, i)));
  }
  function ag(e, t, l) {
    var i = Rl();
    ja(e, t, l, i);
  }
  function ja(e, t, l, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ws(e)) sg(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var m = t.lastRenderedState, E = u(m, l);
          if (s.hasEagerState = !0, s.eagerState = E, yl(E, m))
            return zs(e, t, s, 0), Ut === null && ks(), !1;
        } catch {
        }
      if (l = Pu(e, t, s, i), l !== null)
        return cl(l, e, i), cg(l, t, i), !0;
    }
    return !1;
  }
  function Tf(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: ad(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ws(e)) {
      if (t) throw Error(a(479));
    } else
      t = Pu(
        e,
        l,
        i,
        2
      ), t !== null && cl(t, e, 2);
  }
  function Ws(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
  }
  function sg(e, t) {
    Ir = Xs = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function cg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Kn(e, l);
    }
  }
  var La = {
    readContext: kn,
    use: Qs,
    useCallback: en,
    useContext: en,
    useEffect: en,
    useImperativeHandle: en,
    useLayoutEffect: en,
    useInsertionEffect: en,
    useMemo: en,
    useReducer: en,
    useRef: en,
    useState: en,
    useDebugValue: en,
    useDeferredValue: en,
    useTransition: en,
    useSyncExternalStore: en,
    useId: en,
    useHostTransitionStatus: en,
    useFormState: en,
    useActionState: en,
    useOptimistic: en,
    useMemoCache: en,
    useCacheRefresh: en
  };
  La.useEffectEvent = en;
  var ug = {
    readContext: kn,
    use: Qs,
    useCallback: function(e, t) {
      return Jn().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: kn,
    useEffect: Km,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, $s(
        4194308,
        4,
        $m.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return $s(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      $s(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = Jn();
      t = t === void 0 ? null : t;
      var i = e();
      if (Zi) {
        Ft(!0);
        try {
          e();
        } finally {
          Ft(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = Jn();
      if (l !== void 0) {
        var s = l(t);
        if (Zi) {
          Ft(!0);
          try {
            l(t);
          } finally {
            Ft(!1);
          }
        }
      } else s = t;
      return i.memoizedState = i.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, i.queue = e, e = e.dispatch = $S.bind(
        null,
        rt,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = Jn();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Ef(e);
      var t = e.queue, l = ag.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: wf,
    useDeferredValue: function(e, t) {
      var l = Jn();
      return _f(l, e, t);
    },
    useTransition: function() {
      var e = Ef(!1);
      return e = ng.bind(
        null,
        rt,
        e.queue,
        !0,
        !1
      ), Jn().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = rt, s = Jn();
      if (xt) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = t(), Ut === null)
          throw Error(a(349));
        (bt & 127) !== 0 || Nm(i, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, Km(zm.bind(null, i, u, e), [
        e
      ]), i.flags |= 2048, Ur(
        9,
        { destroy: void 0 },
        km.bind(
          null,
          i,
          u,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = Jn(), t = Ut.identifierPrefix;
      if (xt) {
        var l = po, i = ho;
        l = (i & ~(1 << 32 - dt(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Ks++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = qS++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Mf,
    useFormState: Gm,
    useActionState: Gm,
    useOptimistic: function(e) {
      var t = Jn();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Tf.bind(
        null,
        rt,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: vf,
    useCacheRefresh: function() {
      return Jn().memoizedState = ZS.bind(
        null,
        rt
      );
    },
    useEffectEvent: function(e) {
      var t = Jn(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Ot & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Of = {
    readContext: kn,
    use: Qs,
    useCallback: Wm,
    useContext: kn,
    useEffect: Rf,
    useImperativeHandle: Jm,
    useInsertionEffect: Qm,
    useLayoutEffect: Zm,
    useMemo: eg,
    useReducer: Zs,
    useRef: Xm,
    useState: function() {
      return Zs(Lo);
    },
    useDebugValue: wf,
    useDeferredValue: function(e, t) {
      var l = sn();
      return tg(
        l,
        Vt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zs(Lo)[0], t = sn().memoizedState;
      return [
        typeof e == "boolean" ? e : Da(e),
        t
      ];
    },
    useSyncExternalStore: Om,
    useId: ig,
    useHostTransitionStatus: Mf,
    useFormState: Ym,
    useActionState: Ym,
    useOptimistic: function(e, t) {
      var l = sn();
      return Lm(l, Vt, e, t);
    },
    useMemoCache: vf,
    useCacheRefresh: rg
  };
  Of.useEffectEvent = Fm;
  var fg = {
    readContext: kn,
    use: Qs,
    useCallback: Wm,
    useContext: kn,
    useEffect: Rf,
    useImperativeHandle: Jm,
    useInsertionEffect: Qm,
    useLayoutEffect: Zm,
    useMemo: eg,
    useReducer: Sf,
    useRef: Xm,
    useState: function() {
      return Sf(Lo);
    },
    useDebugValue: wf,
    useDeferredValue: function(e, t) {
      var l = sn();
      return Vt === null ? _f(l, e, t) : tg(
        l,
        Vt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Sf(Lo)[0], t = sn().memoizedState;
      return [
        typeof e == "boolean" ? e : Da(e),
        t
      ];
    },
    useSyncExternalStore: Om,
    useId: ig,
    useHostTransitionStatus: Mf,
    useFormState: Pm,
    useActionState: Pm,
    useOptimistic: function(e, t) {
      var l = sn();
      return Vt !== null ? Lm(l, Vt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: vf,
    useCacheRefresh: rg
  };
  fg.useEffectEvent = Fm;
  function Nf(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : v({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var kf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Rl(), s = ri(i);
      s.payload = t, l != null && (s.callback = l), t = ai(e, s, i), t !== null && (cl(t, e, i), Oa(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Rl(), s = ri(i);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = ai(e, s, i), t !== null && (cl(t, e, i), Oa(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Rl(), i = ri(l);
      i.tag = 2, t != null && (i.callback = t), t = ai(e, i, l), t !== null && (cl(t, e, l), Oa(t, e, l));
    }
  };
  function dg(e, t, l, i, s, u, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, u, m) : t.prototype && t.prototype.isPureReactComponent ? !Ea(l, i) || !Ea(s, u) : !0;
  }
  function hg(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && kf.enqueueReplaceState(t, t.state, null);
  }
  function $i(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var i in t)
        i !== "ref" && (l[i] = t[i]);
    }
    if (e = e.defaultProps) {
      l === t && (l = v({}, l));
      for (var s in e)
        l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  function pg(e) {
    Ns(e);
  }
  function mg(e) {
    console.error(e);
  }
  function gg(e) {
    Ns(e);
  }
  function ec(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function bg(e, t, l) {
    try {
      var i = e.onCaughtError;
      i(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function zf(e, t, l) {
    return l = ri(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      ec(e, t);
    }, l;
  }
  function yg(e) {
    return e = ri(e), e.tag = 3, e;
  }
  function vg(e, t, l, i) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        bg(t, l, i);
      };
    }
    var m = l.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      bg(t, l, i), typeof s != "function" && (hi === null ? hi = /* @__PURE__ */ new Set([this]) : hi.add(this));
      var E = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function JS(e, t, l, i, s) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && kr(
        t,
        l,
        s,
        !0
      ), l = xl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Gl === null ? dc() : l.alternate === null && tn === 0 && (tn = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, i === Bs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), od(e, i, s)), !1;
          case 22:
            return l.flags |= 65536, i === Bs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), od(e, i, s)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return od(e, i, s), dc(), !1;
    }
    if (xt)
      return t = xl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== $u && (e = Error(a(422), { cause: i }), wa(Il(e, l)))) : (i !== $u && (t = Error(a(423), {
        cause: i
      }), wa(
        Il(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = Il(i, l), s = zf(
        e.stateNode,
        i,
        s
      ), cf(e, s), tn !== 4 && (tn = 2)), !1;
    var u = Error(a(520), { cause: i });
    if (u = Il(u, l), qa === null ? qa = [u] : qa.push(u), tn !== 4 && (tn = 2), t === null) return !0;
    i = Il(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = zf(l.stateNode, i, e), cf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (hi === null || !hi.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = yg(s), vg(
              s,
              e,
              l,
              i
            ), cf(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Df = Error(a(461)), mn = !1;
  function zn(e, t, l, i) {
    t.child = e === null ? Cm(t, null, l, i) : Qi(
      t,
      e.child,
      l,
      i
    );
  }
  function xg(e, t, l, i, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in i) {
      var m = {};
      for (var E in i)
        E !== "ref" && (m[E] = i[E]);
    } else m = i;
    return Pi(t), i = mf(
      e,
      t,
      l,
      m,
      u,
      s
    ), E = gf(), e !== null && !mn ? (bf(e, t, s), Vo(e, t, s)) : (xt && E && Qu(t), t.flags |= 1, zn(e, t, i, s), t.child);
  }
  function Sg(e, t, l, i, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !Xu(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Eg(
        e,
        t,
        u,
        i,
        s
      )) : (e = js(
        l.type,
        null,
        i,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Gf(e, s)) {
      var m = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ea, l(m, i) && e.ref === t.ref)
        return Vo(e, t, s);
    }
    return t.flags |= 1, e = No(u, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Eg(e, t, l, i, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ea(u, i) && e.ref === t.ref)
        if (mn = !1, t.pendingProps = i = u, Gf(e, s))
          (e.flags & 131072) !== 0 && (mn = !0);
        else
          return t.lanes = e.lanes, Vo(e, t, s);
    }
    return jf(
      e,
      t,
      l,
      i,
      s
    );
  }
  function Cg(e, t, l, i) {
    var s = i.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, e !== null) {
          for (i = t.child = e.child, s = 0; i !== null; )
            s = s | i.lanes | i.childLanes, i = i.sibling;
          i = s & ~u;
        } else i = 0, t.child = null;
        return Rg(
          e,
          t,
          u,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Hs(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? _m(t, u) : ff(), Am(t);
      else
        return i = t.lanes = 536870912, Rg(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          i
        );
    } else
      u !== null ? (Hs(t, u.cachePool), _m(t, u), ci(), t.memoizedState = null) : (e !== null && Hs(t, null), ff(), ci());
    return zn(e, t, s, l), t.child;
  }
  function Va(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Rg(e, t, l, i, s) {
    var u = of();
    return u = u === null ? null : { parent: hn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Hs(t, null), ff(), Am(t), e !== null && kr(e, t, i, !0), t.childLanes = s, null;
  }
  function tc(e, t) {
    return t = lc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function wg(e, t, l) {
    return Qi(t, e.child, null, l), e = tc(t, t.pendingProps), e.flags |= 2, Sl(t), t.memoizedState = null, e;
  }
  function WS(e, t, l) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (xt) {
        if (i.mode === "hidden")
          return e = tc(t, i), t.lanes = 536870912, Va(null, e);
        if (hf(t), (e = qt) ? (e = Vb(
          e,
          Bl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ti !== null ? { id: ho, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = sm(e), l.return = t, t.child = l, Nn = t, qt = null)) : e = null, e === null) throw li(t);
        return t.lanes = 536870912, null;
      }
      return tc(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if (hf(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = wg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(a(558));
      else if (mn || kr(e, t, l, !1), s = (l & e.childLanes) !== 0, mn || s) {
        if (i = Ut, i !== null && (m = nn(i, l), m !== 0 && m !== u.retryLane))
          throw u.retryLane = m, Bi(e, m), cl(i, e, m), Df;
        dc(), t = wg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, qt = Yl(m.nextSibling), Nn = t, xt = !0, ni = null, Bl = !1, e !== null && fm(t, e), t = tc(t, i), t.flags |= 4096;
      return t;
    }
    return e = No(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function nc(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function jf(e, t, l, i, s) {
    return Pi(t), l = mf(
      e,
      t,
      l,
      i,
      void 0,
      s
    ), i = gf(), e !== null && !mn ? (bf(e, t, s), Vo(e, t, s)) : (xt && i && Qu(t), t.flags |= 1, zn(e, t, l, s), t.child);
  }
  function _g(e, t, l, i, s, u) {
    return Pi(t), t.updateQueue = null, l = Tm(
      t,
      i,
      l,
      s
    ), Mm(e), i = gf(), e !== null && !mn ? (bf(e, t, u), Vo(e, t, u)) : (xt && i && Qu(t), t.flags |= 1, zn(e, t, l, u), t.child);
  }
  function Ag(e, t, l, i, s) {
    if (Pi(t), t.stateNode === null) {
      var u = Mr, m = l.contextType;
      typeof m == "object" && m !== null && (u = kn(m)), u = new l(i, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = kf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = i, u.state = t.memoizedState, u.refs = {}, af(t), m = l.contextType, u.context = typeof m == "object" && m !== null ? kn(m) : Mr, u.state = t.memoizedState, m = l.getDerivedStateFromProps, typeof m == "function" && (Nf(
        t,
        l,
        m,
        i
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (m = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), m !== u.state && kf.enqueueReplaceState(u, u.state, null), ka(t, i, u, s), Na(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, j = $i(l, E);
      u.props = j;
      var J = u.context, fe = l.contextType;
      m = Mr, typeof fe == "object" && fe !== null && (m = kn(fe));
      var me = l.getDerivedStateFromProps;
      fe = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, fe || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || J !== m) && hg(
        t,
        u,
        i,
        m
      ), ii = !1;
      var W = t.memoizedState;
      u.state = W, ka(t, i, u, s), Na(), J = t.memoizedState, E || W !== J || ii ? (typeof me == "function" && (Nf(
        t,
        l,
        me,
        i
      ), J = t.memoizedState), (j = ii || dg(
        t,
        l,
        j,
        i,
        W,
        J,
        m
      )) ? (fe || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = J), u.props = i, u.state = J, u.context = m, i = j) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      u = t.stateNode, sf(e, t), m = t.memoizedProps, fe = $i(l, m), u.props = fe, me = t.pendingProps, W = u.context, J = l.contextType, j = Mr, typeof J == "object" && J !== null && (j = kn(J)), E = l.getDerivedStateFromProps, (J = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (m !== me || W !== j) && hg(
        t,
        u,
        i,
        j
      ), ii = !1, W = t.memoizedState, u.state = W, ka(t, i, u, s), Na();
      var ie = t.memoizedState;
      m !== me || W !== ie || ii || e !== null && e.dependencies !== null && Vs(e.dependencies) ? (typeof E == "function" && (Nf(
        t,
        l,
        E,
        i
      ), ie = t.memoizedState), (fe = ii || dg(
        t,
        l,
        fe,
        i,
        W,
        ie,
        j
      ) || e !== null && e.dependencies !== null && Vs(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, ie, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        ie,
        j
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ie), u.props = i, u.state = ie, u.context = j, i = fe) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return u = i, nc(e, t), i = (t.flags & 128) !== 0, u || i ? (u = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && i ? (t.child = Qi(
      t,
      e.child,
      null,
      s
    ), t.child = Qi(
      t,
      null,
      l,
      s
    )) : zn(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = Vo(
      e,
      t,
      s
    ), e;
  }
  function Mg(e, t, l, i) {
    return Yi(), t.flags |= 256, zn(e, t, l, i), t.child;
  }
  var Lf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Vf(e) {
    return { baseLanes: e, cachePool: bm() };
  }
  function If(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Cl), e;
  }
  function Tg(e, t, l) {
    var i = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, m;
    if ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (an.current & 2) !== 0), m && (s = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (xt) {
        if (s ? si(t) : ci(), (e = qt) ? (e = Vb(
          e,
          Bl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ti !== null ? { id: ho, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = sm(e), l.return = t, t.child = l, Nn = t, qt = null)) : e = null, e === null) throw li(t);
        return xd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = i.children;
      return i = i.fallback, s ? (ci(), s = t.mode, E = lc(
        { mode: "hidden", children: E },
        s
      ), i = Gi(
        i,
        s,
        l,
        null
      ), E.return = t, i.return = t, E.sibling = i, t.child = E, i = t.child, i.memoizedState = Vf(l), i.childLanes = If(
        e,
        m,
        l
      ), t.memoizedState = Lf, Va(null, i)) : (si(t), Hf(t, E));
    }
    var j = e.memoizedState;
    if (j !== null && (E = j.dehydrated, E !== null)) {
      if (u)
        t.flags & 256 ? (si(t), t.flags &= -257, t = Uf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (ci(), t.child = e.child, t.flags |= 128, t = null) : (ci(), E = i.fallback, s = t.mode, i = lc(
          { mode: "visible", children: i.children },
          s
        ), E = Gi(
          E,
          s,
          l,
          null
        ), E.flags |= 2, i.return = t, E.return = t, i.sibling = E, t.child = i, Qi(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = Vf(l), i.childLanes = If(
          e,
          m,
          l
        ), t.memoizedState = Lf, t = Va(null, i));
      else if (si(t), xd(E)) {
        if (m = E.nextSibling && E.nextSibling.dataset, m) var J = m.dgst;
        m = J, i = Error(a(419)), i.stack = "", i.digest = m, wa({ value: i, source: null, stack: null }), t = Uf(
          e,
          t,
          l
        );
      } else if (mn || kr(e, t, l, !1), m = (l & e.childLanes) !== 0, mn || m) {
        if (m = Ut, m !== null && (i = nn(m, l), i !== 0 && i !== j.retryLane))
          throw j.retryLane = i, Bi(e, i), cl(m, e, i), Df;
        vd(E) || dc(), t = Uf(
          e,
          t,
          l
        );
      } else
        vd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = j.treeContext, qt = Yl(
          E.nextSibling
        ), Nn = t, xt = !0, ni = null, Bl = !1, e !== null && fm(t, e), t = Hf(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ci(), E = i.fallback, s = t.mode, j = e.child, J = j.sibling, i = No(j, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = j.subtreeFlags & 65011712, J !== null ? E = No(
      J,
      E
    ) : (E = Gi(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, i.return = t, i.sibling = E, t.child = i, Va(null, i), i = t.child, E = e.child.memoizedState, E === null ? E = Vf(l) : (s = E.cachePool, s !== null ? (j = hn._currentValue, s = s.parent !== j ? { parent: j, pool: j } : s) : s = bm(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: s
    }), i.memoizedState = E, i.childLanes = If(
      e,
      m,
      l
    ), t.memoizedState = Lf, Va(e.child, i)) : (si(t), l = e.child, e = l.sibling, l = No(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Hf(e, t) {
    return t = lc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function lc(e, t) {
    return e = vl(22, e, null, t), e.lanes = 0, e;
  }
  function Uf(e, t, l) {
    return Qi(t, e.child, null, l), e = Hf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Og(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), ef(e.return, t, l);
  }
  function Bf(e, t, l, i, s, u) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: l,
      tailMode: s,
      treeForkCount: u
    } : (m.isBackwards = t, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = l, m.tailMode = s, m.treeForkCount = u);
  }
  function Ng(e, t, l) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var m = an.current, E = (m & 2) !== 0;
    if (E ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, ne(an, m), zn(e, t, i, l), i = xt ? Ra : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Og(e, l, t);
        else if (e.tag === 19)
          Og(e, l, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (s) {
      case "forwards":
        for (l = t.child, s = null; l !== null; )
          e = l.alternate, e !== null && Ps(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Bf(
          t,
          !1,
          s,
          l,
          u,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && Ps(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Bf(
          t,
          !0,
          l,
          null,
          u,
          i
        );
        break;
      case "together":
        Bf(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vo(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), di |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (kr(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(a(153));
    if (t.child !== null) {
      for (e = t.child, l = No(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = No(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Gf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Vs(e)));
  }
  function eE(e, t, l) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo), oi(t, hn, e.memoizedState.cache), Yi();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        oi(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, hf(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (si(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Tg(e, t, l) : (si(t), e = Vo(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        si(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (kr(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), s) {
          if (i)
            return Ng(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), ne(an, an.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, Cg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        oi(t, hn, e.memoizedState.cache);
    }
    return Vo(e, t, l);
  }
  function kg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        mn = !0;
      else {
        if (!Gf(e, l) && (t.flags & 128) === 0)
          return mn = !1, eE(
            e,
            t,
            l
          );
        mn = (e.flags & 131072) !== 0;
      }
    else
      mn = !1, xt && (t.flags & 1048576) !== 0 && um(t, Ra, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Ki(t.elementType), t.type = e, typeof e == "function")
            Xu(e) ? (i = $i(e, i), t.tag = 1, t = Ag(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = jf(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === k) {
                t.tag = 11, t = xg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (s === G) {
                t.tag = 14, t = Sg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = pe(e) || e, Error(a(306, t, ""));
          }
        }
        return t;
      case 0:
        return jf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, s = $i(
          i,
          t.pendingProps
        ), Ag(
          e,
          t,
          i,
          s,
          l
        );
      case 3:
        e: {
          if (Me(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          i = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, sf(e, t), ka(t, i, null, l);
          var m = t.memoizedState;
          if (i = m.cache, oi(t, hn, i), i !== u.cache && tf(
            t,
            [hn],
            l,
            !0
          ), Na(), i = m.element, u.isDehydrated)
            if (u = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Mg(
                e,
                t,
                i,
                l
              );
              break e;
            } else if (i !== s) {
              s = Il(
                Error(a(424)),
                t
              ), wa(s), t = Mg(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qt = Yl(e.firstChild), Nn = t, xt = !0, ni = null, Bl = !0, l = Cm(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Yi(), i === s) {
              t = Vo(
                e,
                t,
                l
              );
              break e;
            }
            zn(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return nc(e, t), e === null ? (l = Yb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : xt || (l = t.type, e = t.pendingProps, i = vc(
          _e.current
        ).createElement(l), i[Tt] = t, i[Rt] = e, Dn(i, l, e), Jt(i), t.stateNode = i) : t.memoizedState = Yb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && xt && (i = t.stateNode = Ub(
          t.type,
          t.pendingProps,
          _e.current
        ), Nn = t, Bl = !0, s = qt, bi(t.type) ? (Sd = s, qt = Yl(i.firstChild)) : qt = s), zn(
          e,
          t,
          t.pendingProps.children,
          l
        ), nc(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && xt && ((s = i = qt) && (i = OE(
          i,
          t.type,
          t.pendingProps,
          Bl
        ), i !== null ? (t.stateNode = i, Nn = t, qt = Yl(i.firstChild), Bl = !1, s = !0) : s = !1), s || li(t)), it(t), s = t.type, u = t.pendingProps, m = e !== null ? e.memoizedProps : null, i = u.children, gd(s, u) ? i = null : m !== null && gd(s, m) && (t.flags |= 32), t.memoizedState !== null && (s = mf(
          e,
          t,
          PS,
          null,
          null,
          l
        ), Ja._currentValue = s), nc(e, t), zn(e, t, i, l), t.child;
      case 6:
        return e === null && xt && ((e = l = qt) && (l = NE(
          l,
          t.pendingProps,
          Bl
        ), l !== null ? (t.stateNode = l, Nn = t, qt = null, e = !0) : e = !1), e || li(t)), null;
      case 13:
        return Tg(e, t, l);
      case 4:
        return Me(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Qi(
          t,
          null,
          i,
          l
        ) : zn(e, t, i, l), t.child;
      case 11:
        return xg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return zn(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return zn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return zn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, oi(t, t.type, i.value), zn(e, t, i.children, l), t.child;
      case 9:
        return s = t.type._context, i = t.pendingProps.children, Pi(t), s = kn(s), i = i(s), t.flags |= 1, zn(e, t, i, l), t.child;
      case 14:
        return Sg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Eg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Ng(e, t, l);
      case 31:
        return WS(e, t, l);
      case 22:
        return Cg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Pi(t), i = kn(hn), e === null ? (s = of(), s === null && (s = Ut, u = nf(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: i, cache: s }, af(t), oi(t, hn, s)) : ((e.lanes & l) !== 0 && (sf(e, t), ka(t, null, null, l), Na()), s = e.memoizedState, u = t.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), oi(t, hn, i)) : (i = u.cache, oi(t, hn, i), i !== s.cache && tf(
          t,
          [hn],
          l,
          !0
        ))), zn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(a(156, t.tag));
  }
  function Io(e) {
    e.flags |= 4;
  }
  function Yf(e, t, l, i, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ib()) e.flags |= 8192;
        else
          throw Fi = Bs, rf;
    } else e.flags &= -16777217;
  }
  function zg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Fb(t))
      if (ib()) e.flags |= 8192;
      else
        throw Fi = Bs, rf;
  }
  function oc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? yn() : 536870912, e.lanes |= t, qr |= t);
  }
  function Ia(e, t) {
    if (!xt)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var i = null; l !== null; )
            l.alternate !== null && (i = l), l = l.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function Pt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, i = 0;
    if (t)
      for (var s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, i |= s.subtreeFlags & 65011712, i |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= i, e.childLanes = l, t;
  }
  function tE(e, t, l) {
    var i = t.pendingProps;
    switch (Zu(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Pt(t), null;
      case 1:
        return Pt(t), null;
      case 3:
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Do(hn), Te(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Nr(t) ? Io(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ju())), Pt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Io(t), u !== null ? (Pt(t), zg(t, u)) : (Pt(t), Yf(
          t,
          s,
          null,
          i,
          l
        ))) : u ? u !== e.memoizedState ? (Io(t), Pt(t), zg(t, u)) : (Pt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Io(t), Pt(t), Yf(
          t,
          s,
          e,
          i,
          l
        )), null;
      case 27:
        if (gt(t), l = _e.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Io(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          e = oe.current, Nr(t) ? dm(t) : (e = Ub(s, i, l), t.stateNode = e, Io(t));
        }
        return Pt(t), null;
      case 5:
        if (gt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Io(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          if (u = oe.current, Nr(t))
            dm(t);
          else {
            var m = vc(
              _e.current
            );
            switch (u) {
              case 1:
                u = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = m.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? u.multiple = !0 : i.size && (u.size = i.size);
                    break;
                  default:
                    u = typeof i.is == "string" ? m.createElement(s, { is: i.is }) : m.createElement(s);
                }
            }
            u[Tt] = t, u[Rt] = i;
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                u.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t)
                  break e;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            t.stateNode = u;
            e: switch (Dn(u, s, i), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && Io(t);
          }
        }
        return Pt(t), Yf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Io(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = _e.current, Nr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, s = Nn, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            e[Tt] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || Tb(e.nodeValue, l)), e || li(t, !0);
          } else
            e = vc(e).createTextNode(
              i
            ), e[Tt] = t, t.stateNode = e;
        }
        return Pt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Nr(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(a(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[Tt] = t;
            } else
              Yi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), e = !1;
          } else
            l = Ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Sl(t), t) : (Sl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Pt(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Nr(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(a(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(a(317));
              s[Tt] = t;
            } else
              Yi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), s = !1;
          } else
            s = Ju(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Sl(t), t) : (Sl(t), null);
        }
        return Sl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), u = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (u = i.memoizedState.cachePool.pool), u !== s && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), oc(t, t.updateQueue), Pt(t), null);
      case 4:
        return Te(), e === null && fd(t.stateNode.containerInfo), Pt(t), null;
      case 10:
        return Do(t.type), Pt(t), null;
      case 19:
        if (F(an), i = t.memoizedState, i === null) return Pt(t), null;
        if (s = (t.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) Ia(i, !1);
          else {
            if (tn !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Ps(e), u !== null) {
                  for (t.flags |= 128, Ia(i, !1), e = u.updateQueue, t.updateQueue = e, oc(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    am(l, e), l = l.sibling;
                  return ne(
                    an,
                    an.current & 1 | 2
                  ), xt && ko(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Z() > cc && (t.flags |= 128, s = !0, Ia(i, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Ps(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, oc(t, e), Ia(i, !0), i.tail === null && i.tailMode === "hidden" && !u.alternate && !xt)
                return Pt(t), null;
            } else
              2 * Z() - i.renderingStartTime > cc && l !== 536870912 && (t.flags |= 128, s = !0, Ia(i, !1), t.lanes = 4194304);
          i.isBackwards ? (u.sibling = t.child, t.child = u) : (e = i.last, e !== null ? e.sibling = u : t.child = u, i.last = u);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Z(), e.sibling = null, l = an.current, ne(
          an,
          s ? l & 1 | 2 : l & 1
        ), xt && ko(t, i.treeForkCount), e) : (Pt(t), null);
      case 22:
      case 23:
        return Sl(t), df(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pt(t), l = t.updateQueue, l !== null && oc(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && F(Xi), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Do(hn), Pt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function nE(e, t) {
    switch (Zu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Do(hn), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return gt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Sl(t), t.alternate === null)
            throw Error(a(340));
          Yi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Sl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          Yi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return F(an), null;
      case 4:
        return Te(), null;
      case 10:
        return Do(t.type), null;
      case 22:
      case 23:
        return Sl(t), df(), e !== null && F(Xi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Do(hn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Dg(e, t) {
    switch (Zu(t), t.tag) {
      case 3:
        Do(hn), Te();
        break;
      case 26:
      case 27:
      case 5:
        gt(t);
        break;
      case 4:
        Te();
        break;
      case 31:
        t.memoizedState !== null && Sl(t);
        break;
      case 13:
        Sl(t);
        break;
      case 19:
        F(an);
        break;
      case 10:
        Do(t.type);
        break;
      case 22:
      case 23:
        Sl(t), df(), e !== null && F(Xi);
        break;
      case 24:
        Do(hn);
    }
  }
  function Ha(e, t) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            i = void 0;
            var u = l.create, m = l.inst;
            i = u(), m.destroy = i;
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (E) {
      Lt(t, t.return, E);
    }
  }
  function ui(e, t, l) {
    try {
      var i = t.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            var m = i.inst, E = m.destroy;
            if (E !== void 0) {
              m.destroy = void 0, s = t;
              var j = l, J = E;
              try {
                J();
              } catch (fe) {
                Lt(
                  s,
                  j,
                  fe
                );
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (fe) {
      Lt(t, t.return, fe);
    }
  }
  function jg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        wm(t, l);
      } catch (i) {
        Lt(e, e.return, i);
      }
    }
  }
  function Lg(e, t, l) {
    l.props = $i(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      Lt(e, t, i);
    }
  }
  function Ua(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(i) : l.current = i;
      }
    } catch (s) {
      Lt(e, t, s);
    }
  }
  function mo(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          Lt(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          Lt(e, t, s);
        }
      else l.current = null;
  }
  function Vg(e) {
    var t = e.type, l = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && i.focus();
          break e;
        case "img":
          l.src ? i.src = l.src : l.srcSet && (i.srcset = l.srcSet);
      }
    } catch (s) {
      Lt(e, e.return, s);
    }
  }
  function qf(e, t, l) {
    try {
      var i = e.stateNode;
      RE(i, e.type, l, t), i[Rt] = t;
    } catch (s) {
      Lt(e, e.return, s);
    }
  }
  function Ig(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && bi(e.type) || e.tag === 4;
  }
  function Pf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ig(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && bi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Xf(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Bn));
    else if (i !== 4 && (i === 27 && bi(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Xf(e, t, l), e = e.sibling; e !== null; )
        Xf(e, t, l), e = e.sibling;
  }
  function ic(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && bi(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (ic(e, t, l), e = e.sibling; e !== null; )
        ic(e, t, l), e = e.sibling;
  }
  function Hg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Dn(t, i, l), t[Tt] = e, t[Rt] = l;
    } catch (u) {
      Lt(e, e.return, u);
    }
  }
  var Ho = !1, gn = !1, Kf = !1, Ug = typeof WeakSet == "function" ? WeakSet : Set, _n = null;
  function lE(e, t) {
    if (e = e.containerInfo, pd = _c, e = Jp(e), Hu(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var i = l.getSelection && l.getSelection();
          if (i && i.rangeCount !== 0) {
            l = i.anchorNode;
            var s = i.anchorOffset, u = i.focusNode;
            i = i.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var m = 0, E = -1, j = -1, J = 0, fe = 0, me = e, W = null;
            t: for (; ; ) {
              for (var ie; me !== l || s !== 0 && me.nodeType !== 3 || (E = m + s), me !== u || i !== 0 && me.nodeType !== 3 || (j = m + i), me.nodeType === 3 && (m += me.nodeValue.length), (ie = me.firstChild) !== null; )
                W = me, me = ie;
              for (; ; ) {
                if (me === e) break t;
                if (W === l && ++J === s && (E = m), W === u && ++fe === i && (j = m), (ie = me.nextSibling) !== null) break;
                me = W, W = me.parentNode;
              }
              me = ie;
            }
            l = E === -1 || j === -1 ? null : { start: E, end: j };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (md = { focusedElem: e, selectionRange: l }, _c = !1, _n = t; _n !== null; )
      if (t = _n, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, _n = e;
      else
        for (; _n !== null; ) {
          switch (t = _n, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  s = e[l], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, l = t, s = u.memoizedProps, u = u.memoizedState, i = l.stateNode;
                try {
                  var Le = $i(
                    l.type,
                    s
                  );
                  e = i.getSnapshotBeforeUpdate(
                    Le,
                    u
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ze) {
                  Lt(
                    l,
                    l.return,
                    Ze
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  yd(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      yd(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(a(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, _n = e;
            break;
          }
          _n = t.return;
        }
  }
  function Bg(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Bo(e, l), i & 4 && Ha(5, l);
        break;
      case 1:
        if (Bo(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              Lt(l, l.return, m);
            }
          else {
            var s = $i(
              l.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              Lt(
                l,
                l.return,
                m
              );
            }
          }
        i & 64 && jg(l), i & 512 && Ua(l, l.return);
        break;
      case 3:
        if (Bo(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            wm(e, t);
          } catch (m) {
            Lt(l, l.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Hg(l);
      case 26:
      case 5:
        Bo(e, l), t === null && i & 4 && Vg(l), i & 512 && Ua(l, l.return);
        break;
      case 12:
        Bo(e, l);
        break;
      case 31:
        Bo(e, l), i & 4 && qg(e, l);
        break;
      case 13:
        Bo(e, l), i & 4 && Pg(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = dE.bind(
          null,
          l
        ), kE(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || Ho, !i) {
          t = t !== null && t.memoizedState !== null || gn, s = Ho;
          var u = gn;
          Ho = i, (gn = t) && !u ? Go(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Bo(e, l), Ho = s, gn = u;
        }
        break;
      case 30:
        break;
      default:
        Bo(e, l);
    }
  }
  function Gg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Gg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && st(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, il = !1;
  function Uo(e, t, l) {
    for (l = l.child; l !== null; )
      Yg(e, t, l), l = l.sibling;
  }
  function Yg(e, t, l) {
    if (vt && typeof vt.onCommitFiberUnmount == "function")
      try {
        vt.onCommitFiberUnmount(kt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        gn || mo(l, t), Uo(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        gn || mo(l, t);
        var i = Zt, s = il;
        bi(l.type) && (Zt = l.stateNode, il = !1), Uo(
          e,
          t,
          l
        ), Qa(l.stateNode), Zt = i, il = s;
        break;
      case 5:
        gn || mo(l, t);
      case 6:
        if (i = Zt, s = il, Zt = null, Uo(
          e,
          t,
          l
        ), Zt = i, il = s, Zt !== null)
          if (il)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(l.stateNode);
            } catch (u) {
              Lt(
                l,
                t,
                u
              );
            }
          else
            try {
              Zt.removeChild(l.stateNode);
            } catch (u) {
              Lt(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Zt !== null && (il ? (e = Zt, jb(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Jr(e)) : jb(Zt, l.stateNode));
        break;
      case 4:
        i = Zt, s = il, Zt = l.stateNode.containerInfo, il = !0, Uo(
          e,
          t,
          l
        ), Zt = i, il = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ui(2, l, t), gn || ui(4, l, t), Uo(
          e,
          t,
          l
        );
        break;
      case 1:
        gn || (mo(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && Lg(
          l,
          t,
          i
        )), Uo(
          e,
          t,
          l
        );
        break;
      case 21:
        Uo(
          e,
          t,
          l
        );
        break;
      case 22:
        gn = (i = gn) || l.memoizedState !== null, Uo(
          e,
          t,
          l
        ), gn = i;
        break;
      default:
        Uo(
          e,
          t,
          l
        );
    }
  }
  function qg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Jr(e);
      } catch (l) {
        Lt(t, t.return, l);
      }
    }
  }
  function Pg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Jr(e);
      } catch (l) {
        Lt(t, t.return, l);
      }
  }
  function oE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ug()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ug()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function rc(e, t) {
    var l = oE(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var s = hE.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function rl(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var s = l[i], u = e, m = t, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (bi(E.type)) {
                Zt = E.stateNode, il = !1;
                break e;
              }
              break;
            case 5:
              Zt = E.stateNode, il = !1;
              break e;
            case 3:
            case 4:
              Zt = E.stateNode.containerInfo, il = !0;
              break e;
          }
          E = E.return;
        }
        if (Zt === null) throw Error(a(160));
        Yg(u, m, s), Zt = null, il = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Xg(t, e), t = t.sibling;
  }
  var to = null;
  function Xg(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        rl(t, e), al(e), i & 4 && (ui(3, e, e.return), Ha(3, e), ui(5, e, e.return));
        break;
      case 1:
        rl(t, e), al(e), i & 512 && (gn || l === null || mo(l, l.return)), i & 64 && Ho && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var s = to;
        if (rl(t, e), al(e), i & 512 && (gn || l === null || mo(l, l.return)), i & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (i) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[kl] || u[Tt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(i), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Dn(u, i, l), u[Tt] = e, Jt(u), i = u;
                      break e;
                    case "link":
                      var m = Xb(
                        "link",
                        "href",
                        s
                      ).get(i + (l.href || ""));
                      if (m) {
                        for (var E = 0; E < m.length; E++)
                          if (u = m[E], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            m.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(i), Dn(u, i, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (m = Xb(
                        "meta",
                        "content",
                        s
                      ).get(i + (l.content || ""))) {
                        for (E = 0; E < m.length; E++)
                          if (u = m[E], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            m.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(i), Dn(u, i, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(a(468, i));
                  }
                  u[Tt] = e, Jt(u), i = u;
                }
                e.stateNode = i;
              } else
                Kb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Pb(
                s,
                i,
                e.memoizedProps
              );
          else
            u !== i ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, i === null ? Kb(
              s,
              e.type,
              e.stateNode
            ) : Pb(
              s,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && qf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        rl(t, e), al(e), i & 512 && (gn || l === null || mo(l, l.return)), l !== null && i & 4 && qf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (rl(t, e), al(e), i & 512 && (gn || l === null || mo(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            $l(s, "");
          } catch (Le) {
            Lt(e, e.return, Le);
          }
        }
        i & 4 && e.stateNode != null && (s = e.memoizedProps, qf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), i & 1024 && (Kf = !0);
        break;
      case 6:
        if (rl(t, e), al(e), i & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (Le) {
            Lt(e, e.return, Le);
          }
        }
        break;
      case 3:
        if (Ec = null, s = to, to = xc(t.containerInfo), rl(t, e), to = s, al(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Jr(t.containerInfo);
          } catch (Le) {
            Lt(e, e.return, Le);
          }
        Kf && (Kf = !1, Kg(e));
        break;
      case 4:
        i = to, to = xc(
          e.stateNode.containerInfo
        ), rl(t, e), al(e), to = i;
        break;
      case 12:
        rl(t, e), al(e);
        break;
      case 31:
        rl(t, e), al(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, rc(e, i)));
        break;
      case 13:
        rl(t, e), al(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (sc = Z()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, rc(e, i)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var j = l !== null && l.memoizedState !== null, J = Ho, fe = gn;
        if (Ho = J || s, gn = fe || j, rl(t, e), gn = fe, Ho = J, al(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || j || Ho || gn || Ji(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                j = l = t;
                try {
                  if (u = j.stateNode, s)
                    m = u.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    E = j.stateNode;
                    var me = j.memoizedProps.style, W = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
                  }
                } catch (Le) {
                  Lt(j, j.return, Le);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = s ? "" : j.memoizedProps;
                } catch (Le) {
                  Lt(j, j.return, Le);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                j = t;
                try {
                  var ie = j.stateNode;
                  s ? Lb(ie, !0) : Lb(j.stateNode, !1);
                } catch (Le) {
                  Lt(j, j.return, Le);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, rc(e, l))));
        break;
      case 19:
        rl(t, e), al(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, rc(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        rl(t, e), al(e);
    }
  }
  function al(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (Ig(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = Pf(e);
            ic(e, u, s);
            break;
          case 5:
            var m = l.stateNode;
            l.flags & 32 && ($l(m, ""), l.flags &= -33);
            var E = Pf(e);
            ic(e, E, m);
            break;
          case 3:
          case 4:
            var j = l.stateNode.containerInfo, J = Pf(e);
            Xf(
              e,
              J,
              j
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (fe) {
        Lt(e, e.return, fe);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Kg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Kg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Bo(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Bg(e, t.alternate, t), t = t.sibling;
  }
  function Ji(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ui(4, t, t.return), Ji(t);
          break;
        case 1:
          mo(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Lg(
            t,
            t.return,
            l
          ), Ji(t);
          break;
        case 27:
          Qa(t.stateNode);
        case 26:
        case 5:
          mo(t, t.return), Ji(t);
          break;
        case 22:
          t.memoizedState === null && Ji(t);
          break;
        case 30:
          Ji(t);
          break;
        default:
          Ji(t);
      }
      e = e.sibling;
    }
  }
  function Go(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, s = e, u = t, m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Go(
            s,
            u,
            l
          ), Ha(4, u);
          break;
        case 1:
          if (Go(
            s,
            u,
            l
          ), i = u, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (J) {
              Lt(i, i.return, J);
            }
          if (i = u, s = i.updateQueue, s !== null) {
            var E = i.stateNode;
            try {
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++)
                  Rm(j[s], E);
            } catch (J) {
              Lt(i, i.return, J);
            }
          }
          l && m & 64 && jg(u), Ua(u, u.return);
          break;
        case 27:
          Hg(u);
        case 26:
        case 5:
          Go(
            s,
            u,
            l
          ), l && i === null && m & 4 && Vg(u), Ua(u, u.return);
          break;
        case 12:
          Go(
            s,
            u,
            l
          );
          break;
        case 31:
          Go(
            s,
            u,
            l
          ), l && m & 4 && qg(s, u);
          break;
        case 13:
          Go(
            s,
            u,
            l
          ), l && m & 4 && Pg(s, u);
          break;
        case 22:
          u.memoizedState === null && Go(
            s,
            u,
            l
          ), Ua(u, u.return);
          break;
        case 30:
          break;
        default:
          Go(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Ff(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && _a(l));
  }
  function Qf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _a(e));
  }
  function no(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fg(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Fg(e, t, l, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        no(
          e,
          t,
          l,
          i
        ), s & 2048 && Ha(9, t);
        break;
      case 1:
        no(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        no(
          e,
          t,
          l,
          i
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && _a(e)));
        break;
      case 12:
        if (s & 2048) {
          no(
            e,
            t,
            l,
            i
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, m = u.id, E = u.onPostCommit;
            typeof E == "function" && E(
              m,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (j) {
            Lt(t, t.return, j);
          }
        } else
          no(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        no(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        no(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, m = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? no(
          e,
          t,
          l,
          i
        ) : Ba(e, t) : u._visibility & 2 ? no(
          e,
          t,
          l,
          i
        ) : (u._visibility |= 2, Br(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Ff(m, t);
        break;
      case 24:
        no(
          e,
          t,
          l,
          i
        ), s & 2048 && Qf(t.alternate, t);
        break;
      default:
        no(
          e,
          t,
          l,
          i
        );
    }
  }
  function Br(e, t, l, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, m = t, E = l, j = i, J = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Br(
            u,
            m,
            E,
            j,
            s
          ), Ha(8, m);
          break;
        case 23:
          break;
        case 22:
          var fe = m.stateNode;
          m.memoizedState !== null ? fe._visibility & 2 ? Br(
            u,
            m,
            E,
            j,
            s
          ) : Ba(
            u,
            m
          ) : (fe._visibility |= 2, Br(
            u,
            m,
            E,
            j,
            s
          )), s && J & 2048 && Ff(
            m.alternate,
            m
          );
          break;
        case 24:
          Br(
            u,
            m,
            E,
            j,
            s
          ), s && J & 2048 && Qf(m.alternate, m);
          break;
        default:
          Br(
            u,
            m,
            E,
            j,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Ba(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, s = i.flags;
        switch (i.tag) {
          case 22:
            Ba(l, i), s & 2048 && Ff(
              i.alternate,
              i
            );
            break;
          case 24:
            Ba(l, i), s & 2048 && Qf(i.alternate, i);
            break;
          default:
            Ba(l, i);
        }
        t = t.sibling;
      }
  }
  var Ga = 8192;
  function Gr(e, t, l) {
    if (e.subtreeFlags & Ga)
      for (e = e.child; e !== null; )
        Qg(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Qg(e, t, l) {
    switch (e.tag) {
      case 26:
        Gr(
          e,
          t,
          l
        ), e.flags & Ga && e.memoizedState !== null && qE(
          l,
          to,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Gr(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = to;
        to = xc(e.stateNode.containerInfo), Gr(
          e,
          t,
          l
        ), to = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = Ga, Ga = 16777216, Gr(
          e,
          t,
          l
        ), Ga = i) : Gr(
          e,
          t,
          l
        ));
        break;
      default:
        Gr(
          e,
          t,
          l
        );
    }
  }
  function Zg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ya(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          _n = i, Jg(
            i,
            e
          );
        }
      Zg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        $g(e), e = e.sibling;
  }
  function $g(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ya(e), e.flags & 2048 && ui(9, e, e.return);
        break;
      case 3:
        Ya(e);
        break;
      case 12:
        Ya(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ac(e)) : Ya(e);
        break;
      default:
        Ya(e);
    }
  }
  function ac(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          _n = i, Jg(
            i,
            e
          );
        }
      Zg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ui(8, t, t.return), ac(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, ac(t));
          break;
        default:
          ac(t);
      }
      e = e.sibling;
    }
  }
  function Jg(e, t) {
    for (; _n !== null; ) {
      var l = _n;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ui(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          _a(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, _n = i;
      else
        e: for (l = e; _n !== null; ) {
          i = _n;
          var s = i.sibling, u = i.return;
          if (Gg(i), i === l) {
            _n = null;
            break e;
          }
          if (s !== null) {
            s.return = u, _n = s;
            break e;
          }
          _n = u;
        }
    }
  }
  var iE = {
    getCacheForType: function(e) {
      var t = kn(hn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return kn(hn).controller.signal;
    }
  }, rE = typeof WeakMap == "function" ? WeakMap : Map, Ot = 0, Ut = null, pt = null, bt = 0, jt = 0, El = null, fi = !1, Yr = !1, Zf = !1, Yo = 0, tn = 0, di = 0, Wi = 0, $f = 0, Cl = 0, qr = 0, qa = null, sl = null, Jf = !1, sc = 0, Wg = 0, cc = 1 / 0, uc = null, hi = null, xn = 0, pi = null, Pr = null, qo = 0, Wf = 0, ed = null, eb = null, Pa = 0, td = null;
  function Rl() {
    return (Ot & 2) !== 0 && bt !== 0 ? bt & -bt : V.T !== null ? ad() : tl();
  }
  function tb() {
    if (Cl === 0)
      if ((bt & 536870912) === 0 || xt) {
        var e = zt;
        zt <<= 1, (zt & 3932160) === 0 && (zt = 262144), Cl = e;
      } else Cl = 536870912;
    return e = xl.current, e !== null && (e.flags |= 32), Cl;
  }
  function cl(e, t, l) {
    (e === Ut && (jt === 2 || jt === 9) || e.cancelPendingCommit !== null) && (Xr(e, 0), mi(
      e,
      bt,
      Cl,
      !1
    )), el(e, l), ((Ot & 2) === 0 || e !== Ut) && (e === Ut && ((Ot & 2) === 0 && (Wi |= l), tn === 4 && mi(
      e,
      bt,
      Cl,
      !1
    )), go(e));
  }
  function nb(e, t, l) {
    if ((Ot & 6) !== 0) throw Error(a(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Nt(e, t), s = i ? cE(e, t) : ld(e, t, !0), u = i;
    do {
      if (s === 0) {
        Yr && !i && mi(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !aE(l)) {
          s = ld(e, t, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var m = 0;
          else
            m = e.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            t = m;
            e: {
              var E = e;
              s = qa;
              var j = E.current.memoizedState.isDehydrated;
              if (j && (Xr(E, m).flags |= 256), m = ld(
                E,
                m,
                !1
              ), m !== 2) {
                if (Zf && !j) {
                  E.errorRecoveryDisabledLanes |= u, Wi |= u, s = 4;
                  break e;
                }
                u = sl, sl = s, u !== null && (sl === null ? sl = u : sl.push.apply(
                  sl,
                  u
                ));
              }
              s = m;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Xr(e, 0), mi(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, u = s, u) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              mi(
                i,
                t,
                Cl,
                !fi
              );
              break e;
            case 2:
              sl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((t & 62914560) === t && (s = sc + 300 - Z(), 10 < s)) {
            if (mi(
              i,
              t,
              Cl,
              !fi
            ), Je(i, 0, !0) !== 0) break e;
            qo = t, i.timeoutHandle = zb(
              lb.bind(
                null,
                i,
                l,
                sl,
                uc,
                Jf,
                t,
                Cl,
                Wi,
                qr,
                fi,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          lb(
            i,
            l,
            sl,
            uc,
            Jf,
            t,
            Cl,
            Wi,
            qr,
            fi,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    go(e);
  }
  function lb(e, t, l, i, s, u, m, E, j, J, fe, me, W, ie) {
    if (e.timeoutHandle = -1, me = t.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bn
      }, Qg(
        t,
        u,
        me
      );
      var Le = (u & 62914560) === u ? sc - Z() : (u & 4194048) === u ? Wg - Z() : 0;
      if (Le = PE(
        me,
        Le
      ), Le !== null) {
        qo = u, e.cancelPendingCommit = Le(
          fb.bind(
            null,
            e,
            t,
            u,
            l,
            i,
            s,
            m,
            E,
            j,
            fe,
            me,
            null,
            W,
            ie
          )
        ), mi(e, u, m, !J);
        return;
      }
    }
    fb(
      e,
      t,
      u,
      l,
      i,
      s,
      m,
      E,
      j
    );
  }
  function aE(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var i = 0; i < l.length; i++) {
          var s = l[i], u = s.getSnapshot;
          s = s.value;
          try {
            if (!yl(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function mi(e, t, l, i) {
    t &= ~$f, t &= ~Wi, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - dt(s), m = 1 << u;
      i[u] = -1, s &= ~m;
    }
    l !== 0 && io(e, l, t);
  }
  function fc() {
    return (Ot & 6) === 0 ? (Xa(0), !1) : !0;
  }
  function nd() {
    if (pt !== null) {
      if (jt === 0)
        var e = pt.return;
      else
        e = pt, zo = qi = null, yf(e), Lr = null, Ma = 0, e = pt;
      for (; e !== null; )
        Dg(e.alternate, e), e = e.return;
      pt = null;
    }
  }
  function Xr(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, AE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), qo = 0, nd(), Ut = e, pt = l = No(e.current, null), bt = t, jt = 0, El = null, fi = !1, Yr = Nt(e, t), Zf = !1, qr = Cl = $f = Wi = di = tn = 0, sl = qa = null, Jf = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - dt(i), u = 1 << s;
        t |= e[s], i &= ~u;
      }
    return Yo = t, ks(), l;
  }
  function ob(e, t) {
    rt = null, V.H = La, t === jr || t === Us ? (t = xm(), jt = 3) : t === rf ? (t = xm(), jt = 4) : jt = t === Df ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, El = t, pt === null && (tn = 1, ec(
      e,
      Il(t, e.current)
    ));
  }
  function ib() {
    var e = xl.current;
    return e === null ? !0 : (bt & 4194048) === bt ? Gl === null : (bt & 62914560) === bt || (bt & 536870912) !== 0 ? e === Gl : !1;
  }
  function rb() {
    var e = V.H;
    return V.H = La, e === null ? La : e;
  }
  function ab() {
    var e = V.A;
    return V.A = iE, e;
  }
  function dc() {
    tn = 4, fi || (bt & 4194048) !== bt && xl.current !== null || (Yr = !0), (di & 134217727) === 0 && (Wi & 134217727) === 0 || Ut === null || mi(
      Ut,
      bt,
      Cl,
      !1
    );
  }
  function ld(e, t, l) {
    var i = Ot;
    Ot |= 2;
    var s = rb(), u = ab();
    (Ut !== e || bt !== t) && (uc = null, Xr(e, t)), t = !1;
    var m = tn;
    e: do
      try {
        if (jt !== 0 && pt !== null) {
          var E = pt, j = El;
          switch (jt) {
            case 8:
              nd(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              xl.current === null && (t = !0);
              var J = jt;
              if (jt = 0, El = null, Kr(e, E, j, J), l && Yr) {
                m = 0;
                break e;
              }
              break;
            default:
              J = jt, jt = 0, El = null, Kr(e, E, j, J);
          }
        }
        sE(), m = tn;
        break;
      } catch (fe) {
        ob(e, fe);
      }
    while (!0);
    return t && e.shellSuspendCounter++, zo = qi = null, Ot = i, V.H = s, V.A = u, pt === null && (Ut = null, bt = 0, ks()), m;
  }
  function sE() {
    for (; pt !== null; ) sb(pt);
  }
  function cE(e, t) {
    var l = Ot;
    Ot |= 2;
    var i = rb(), s = ab();
    Ut !== e || bt !== t ? (uc = null, cc = Z() + 500, Xr(e, t)) : Yr = Nt(
      e,
      t
    );
    e: do
      try {
        if (jt !== 0 && pt !== null) {
          t = pt;
          var u = El;
          t: switch (jt) {
            case 1:
              jt = 0, El = null, Kr(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (ym(u)) {
                jt = 0, El = null, cb(t);
                break;
              }
              t = function() {
                jt !== 2 && jt !== 9 || Ut !== e || (jt = 7), go(e);
              }, u.then(t, t);
              break e;
            case 3:
              jt = 7;
              break e;
            case 4:
              jt = 5;
              break e;
            case 7:
              ym(u) ? (jt = 0, El = null, cb(t)) : (jt = 0, El = null, Kr(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (pt.tag) {
                case 26:
                  m = pt.memoizedState;
                case 5:
                case 27:
                  var E = pt;
                  if (m ? Fb(m) : E.stateNode.complete) {
                    jt = 0, El = null;
                    var j = E.sibling;
                    if (j !== null) pt = j;
                    else {
                      var J = E.return;
                      J !== null ? (pt = J, hc(J)) : pt = null;
                    }
                    break t;
                  }
              }
              jt = 0, El = null, Kr(e, t, u, 5);
              break;
            case 6:
              jt = 0, El = null, Kr(e, t, u, 6);
              break;
            case 8:
              nd(), tn = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        uE();
        break;
      } catch (fe) {
        ob(e, fe);
      }
    while (!0);
    return zo = qi = null, V.H = i, V.A = s, Ot = l, pt !== null ? 0 : (Ut = null, bt = 0, ks(), tn);
  }
  function uE() {
    for (; pt !== null && !Xe(); )
      sb(pt);
  }
  function sb(e) {
    var t = kg(e.alternate, e, Yo);
    e.memoizedProps = e.pendingProps, t === null ? hc(e) : pt = t;
  }
  function cb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = _g(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          bt
        );
        break;
      case 11:
        t = _g(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          bt
        );
        break;
      case 5:
        yf(t);
      default:
        Dg(l, t), t = pt = am(t, Yo), t = kg(l, t, Yo);
    }
    e.memoizedProps = e.pendingProps, t === null ? hc(e) : pt = t;
  }
  function Kr(e, t, l, i) {
    zo = qi = null, yf(t), Lr = null, Ma = 0;
    var s = t.return;
    try {
      if (JS(
        e,
        s,
        t,
        l,
        bt
      )) {
        tn = 1, ec(
          e,
          Il(l, e.current)
        ), pt = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw pt = s, u;
      tn = 1, ec(
        e,
        Il(l, e.current)
      ), pt = null;
      return;
    }
    t.flags & 32768 ? (xt || i === 1 ? e = !0 : Yr || (bt & 536870912) !== 0 ? e = !1 : (fi = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = xl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), ub(t, e)) : hc(t);
  }
  function hc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        ub(
          t,
          fi
        );
        return;
      }
      e = t.return;
      var l = tE(
        t.alternate,
        t,
        Yo
      );
      if (l !== null) {
        pt = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        pt = t;
        return;
      }
      pt = t = e;
    } while (t !== null);
    tn === 0 && (tn = 5);
  }
  function ub(e, t) {
    do {
      var l = nE(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, pt = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        pt = e;
        return;
      }
      pt = e = l;
    } while (e !== null);
    tn = 6, pt = null;
  }
  function fb(e, t, l, i, s, u, m, E, j) {
    e.cancelPendingCommit = null;
    do
      pc();
    while (xn !== 0);
    if ((Ot & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (u = t.lanes | t.childLanes, u |= qu, Dt(
        e,
        l,
        u,
        m,
        E,
        j
      ), e === Ut && (pt = Ut = null, bt = 0), Pr = t, pi = e, qo = l, Wf = u, ed = s, eb = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, pE(Ge, function() {
        return gb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null, s = I.p, I.p = 2, m = Ot, Ot |= 4;
        try {
          lE(e, t, l);
        } finally {
          Ot = m, I.p = s, V.T = i;
        }
      }
      xn = 1, db(), hb(), pb();
    }
  }
  function db() {
    if (xn === 1) {
      xn = 0;
      var e = pi, t = Pr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var i = I.p;
        I.p = 2;
        var s = Ot;
        Ot |= 4;
        try {
          Xg(t, e);
          var u = md, m = Jp(e.containerInfo), E = u.focusedElem, j = u.selectionRange;
          if (m !== E && E && E.ownerDocument && $p(
            E.ownerDocument.documentElement,
            E
          )) {
            if (j !== null && Hu(E)) {
              var J = j.start, fe = j.end;
              if (fe === void 0 && (fe = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  fe,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, W = me && me.defaultView || window;
                if (W.getSelection) {
                  var ie = W.getSelection(), Le = E.textContent.length, Ze = Math.min(j.start, Le), Ht = j.end === void 0 ? Ze : Math.min(j.end, Le);
                  !ie.extend && Ze > Ht && (m = Ht, Ht = Ze, Ze = m);
                  var X = Zp(
                    E,
                    Ze
                  ), B = Zp(
                    E,
                    Ht
                  );
                  if (X && B && (ie.rangeCount !== 1 || ie.anchorNode !== X.node || ie.anchorOffset !== X.offset || ie.focusNode !== B.node || ie.focusOffset !== B.offset)) {
                    var $ = me.createRange();
                    $.setStart(X.node, X.offset), ie.removeAllRanges(), Ze > Ht ? (ie.addRange($), ie.extend(B.node, B.offset)) : ($.setEnd(B.node, B.offset), ie.addRange($));
                  }
                }
              }
            }
            for (me = [], ie = E; ie = ie.parentNode; )
              ie.nodeType === 1 && me.push({
                element: ie,
                left: ie.scrollLeft,
                top: ie.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < me.length; E++) {
              var he = me[E];
              he.element.scrollLeft = he.left, he.element.scrollTop = he.top;
            }
          }
          _c = !!pd, md = pd = null;
        } finally {
          Ot = s, I.p = i, V.T = l;
        }
      }
      e.current = t, xn = 2;
    }
  }
  function hb() {
    if (xn === 2) {
      xn = 0;
      var e = pi, t = Pr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var i = I.p;
        I.p = 2;
        var s = Ot;
        Ot |= 4;
        try {
          Bg(e, t.alternate, t);
        } finally {
          Ot = s, I.p = i, V.T = l;
        }
      }
      xn = 3;
    }
  }
  function pb() {
    if (xn === 4 || xn === 3) {
      xn = 0, ve();
      var e = pi, t = Pr, l = qo, i = eb;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? xn = 5 : (xn = 0, Pr = pi = null, mb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (hi = null), Nl(l), t = t.stateNode, vt && typeof vt.onCommitFiberRoot == "function")
        try {
          vt.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = V.T, s = I.p, I.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, m = 0; m < i.length; m++) {
            var E = i[m];
            u(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          V.T = t, I.p = s;
        }
      }
      (qo & 3) !== 0 && pc(), go(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === td ? Pa++ : (Pa = 0, td = e) : Pa = 0, Xa(0);
    }
  }
  function mb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, _a(t)));
  }
  function pc() {
    return db(), hb(), pb(), gb();
  }
  function gb() {
    if (xn !== 5) return !1;
    var e = pi, t = Wf;
    Wf = 0;
    var l = Nl(qo), i = V.T, s = I.p;
    try {
      I.p = 32 > l ? 32 : l, V.T = null, l = ed, ed = null;
      var u = pi, m = qo;
      if (xn = 0, Pr = pi = null, qo = 0, (Ot & 6) !== 0) throw Error(a(331));
      var E = Ot;
      if (Ot |= 4, $g(u.current), Fg(
        u,
        u.current,
        m,
        l
      ), Ot = E, Xa(0, !1), vt && typeof vt.onPostCommitFiberRoot == "function")
        try {
          vt.onPostCommitFiberRoot(kt, u);
        } catch {
        }
      return !0;
    } finally {
      I.p = s, V.T = i, mb(e, t);
    }
  }
  function bb(e, t, l) {
    t = Il(l, t), t = zf(e.stateNode, t, 2), e = ai(e, t, 2), e !== null && (el(e, 2), go(e));
  }
  function Lt(e, t, l) {
    if (e.tag === 3)
      bb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          bb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (hi === null || !hi.has(i))) {
            e = Il(l, e), l = yg(2), i = ai(t, l, 2), i !== null && (vg(
              l,
              i,
              t,
              e
            ), el(i, 2), go(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function od(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new rE();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(l) || (Zf = !0, s.add(l), e = fE.bind(null, e, t, l), t.then(e, e));
  }
  function fE(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (bt & l) === l && (tn === 4 || tn === 3 && (bt & 62914560) === bt && 300 > Z() - sc ? (Ot & 2) === 0 && Xr(e, 0) : $f |= l, qr === bt && (qr = 0)), go(e);
  }
  function yb(e, t) {
    t === 0 && (t = yn()), e = Bi(e, t), e !== null && (el(e, t), go(e));
  }
  function dE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), yb(e, l);
  }
  function hE(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, s = e.memoizedState;
        s !== null && (l = s.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    i !== null && i.delete(t), yb(e, l);
  }
  function pE(e, t) {
    return $e(e, t);
  }
  var mc = null, Fr = null, id = !1, gc = !1, rd = !1, gi = 0;
  function go(e) {
    e !== Fr && e.next === null && (Fr === null ? mc = Fr = e : Fr = Fr.next = e), gc = !0, id || (id = !0, gE());
  }
  function Xa(e, t) {
    if (!rd && gc) {
      rd = !0;
      do
        for (var l = !1, i = mc; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var m = i.suspendedLanes, E = i.pingedLanes;
              u = (1 << 31 - dt(42 | e) + 1) - 1, u &= s & ~(m & ~E), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Eb(i, u));
          } else
            u = bt, u = Je(
              i,
              i === Ut ? u : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (u & 3) === 0 || Nt(i, u) || (l = !0, Eb(i, u));
          i = i.next;
        }
      while (l);
      rd = !1;
    }
  }
  function mE() {
    vb();
  }
  function vb() {
    gc = id = !1;
    var e = 0;
    gi !== 0 && _E() && (e = gi);
    for (var t = Z(), l = null, i = mc; i !== null; ) {
      var s = i.next, u = xb(i, t);
      u === 0 ? (i.next = null, l === null ? mc = s : l.next = s, s === null && (Fr = l)) : (l = i, (e !== 0 || (u & 3) !== 0) && (gc = !0)), i = s;
    }
    xn !== 0 && xn !== 5 || Xa(e), gi !== 0 && (gi = 0);
  }
  function xb(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var m = 31 - dt(u), E = 1 << m, j = s[m];
      j === -1 ? ((E & l) === 0 || (E & i) !== 0) && (s[m] = Rn(E, t)) : j <= t && (e.expiredLanes |= E), u &= ~E;
    }
    if (t = Ut, l = bt, l = Je(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (jt === 2 || jt === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && tt(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Nt(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && tt(i), Nl(l)) {
        case 2:
        case 8:
          l = Ce;
          break;
        case 32:
          l = Ge;
          break;
        case 268435456:
          l = Mt;
          break;
        default:
          l = Ge;
      }
      return i = Sb.bind(null, e), l = $e(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && tt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Sb(e, t) {
    if (xn !== 0 && xn !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (pc() && e.callbackNode !== l)
      return null;
    var i = bt;
    return i = Je(
      e,
      e === Ut ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (nb(e, i, t), xb(e, Z()), e.callbackNode != null && e.callbackNode === l ? Sb.bind(null, e) : null);
  }
  function Eb(e, t) {
    if (pc()) return null;
    nb(e, t, !0);
  }
  function gE() {
    ME(function() {
      (Ot & 6) !== 0 ? $e(
        Ie,
        mE
      ) : vb();
    });
  }
  function ad() {
    if (gi === 0) {
      var e = zr;
      e === 0 && (e = Cn, Cn <<= 1, (Cn & 261888) === 0 && (Cn = 256)), gi = e;
    }
    return gi;
  }
  function Cb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : jl("" + e);
  }
  function Rb(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function bE(e, t, l, i, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Cb(
        (s[Rt] || null).action
      ), m = i.submitter;
      m && (t = (t = m[Rt] || null) ? Cb(t.formAction) : m.getAttribute("formAction"), t !== null && (u = t, m = null));
      var E = new fo(
        "action",
        "action",
        null,
        i,
        s
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (gi !== 0) {
                  var j = m ? Rb(s, m) : new FormData(s);
                  Af(
                    l,
                    {
                      pending: !0,
                      data: j,
                      method: s.method,
                      action: u
                    },
                    null,
                    j
                  );
                }
              } else
                typeof u == "function" && (E.preventDefault(), j = m ? Rb(s, m) : new FormData(s), Af(
                  l,
                  {
                    pending: !0,
                    data: j,
                    method: s.method,
                    action: u
                  },
                  u,
                  j
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var sd = 0; sd < Yu.length; sd++) {
    var cd = Yu[sd], yE = cd.toLowerCase(), vE = cd[0].toUpperCase() + cd.slice(1);
    eo(
      yE,
      "on" + vE
    );
  }
  eo(tm, "onAnimationEnd"), eo(nm, "onAnimationIteration"), eo(lm, "onAnimationStart"), eo("dblclick", "onDoubleClick"), eo("focusin", "onFocus"), eo("focusout", "onBlur"), eo(jS, "onTransitionRun"), eo(LS, "onTransitionStart"), eo(VS, "onTransitionCancel"), eo(om, "onTransitionEnd"), ao("onMouseEnter", ["mouseout", "mouseover"]), ao("onMouseLeave", ["mouseout", "mouseover"]), ao("onPointerEnter", ["pointerout", "pointerover"]), ao("onPointerLeave", ["pointerout", "pointerover"]), nl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), nl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), nl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), nl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), nl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), nl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ka = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ka)
  );
  function wb(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], s = i.event;
      i = i.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var E = i[m], j = E.instance, J = E.currentTarget;
            if (E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (fe) {
              Ns(fe);
            }
            s.currentTarget = null, u = j;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (E = i[m], j = E.instance, J = E.currentTarget, E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (fe) {
              Ns(fe);
            }
            s.currentTarget = null, u = j;
          }
      }
    }
  }
  function mt(e, t) {
    var l = t[Vn];
    l === void 0 && (l = t[Vn] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (_b(t, e, 2, !1), l.add(i));
  }
  function ud(e, t, l) {
    var i = 0;
    t && (i |= 4), _b(
      l,
      e,
      i,
      t
    );
  }
  var bc = "_reactListening" + Math.random().toString(36).slice(2);
  function fd(e) {
    if (!e[bc]) {
      e[bc] = !0, fn.forEach(function(l) {
        l !== "selectionchange" && (xE.has(l) || ud(l, !1, e), ud(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[bc] || (t[bc] = !0, ud("selectionchange", !1, t));
    }
  }
  function _b(e, t, l, i) {
    switch (ty(t)) {
      case 2:
        var s = FE;
        break;
      case 8:
        s = QE;
        break;
      default:
        s = _d;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !ce || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), i ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function dd(e, t, l, i, s) {
    var u = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var E = i.stateNode.containerInfo;
          if (E === s) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var j = m.tag;
              if ((j === 3 || j === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; E !== null; ) {
            if (m = pl(E), m === null) return;
            if (j = m.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              i = u = m;
              continue e;
            }
            E = E.parentNode;
          }
        }
        i = i.return;
      }
    re(function() {
      var J = u, fe = R(l), me = [];
      e: {
        var W = im.get(e);
        if (W !== void 0) {
          var ie = fo, Le = e;
          switch (e) {
            case "keypress":
              if (Et(l) === 0) break e;
            case "keydown":
            case "keyup":
              ie = hS;
              break;
            case "focusin":
              Le = "focus", ie = Du;
              break;
            case "focusout":
              Le = "blur", ie = Du;
              break;
            case "beforeblur":
            case "afterblur":
              ie = Du;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ie = ya;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ie = tS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ie = gS;
              break;
            case tm:
            case nm:
            case lm:
              ie = oS;
              break;
            case om:
              ie = yS;
              break;
            case "scroll":
            case "scrollend":
              ie = Wl;
              break;
            case "wheel":
              ie = xS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ie = rS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ie = Lp;
              break;
            case "toggle":
            case "beforetoggle":
              ie = ES;
          }
          var Ze = (t & 4) !== 0, Ht = !Ze && (e === "scroll" || e === "scrollend"), X = Ze ? W !== null ? W + "Capture" : null : W;
          Ze = [];
          for (var B = J, $; B !== null; ) {
            var he = B;
            if ($ = he.stateNode, he = he.tag, he !== 5 && he !== 26 && he !== 27 || $ === null || X === null || (he = q(B, X), he != null && Ze.push(
              Fa(B, he, $)
            )), Ht) break;
            B = B.return;
          }
          0 < Ze.length && (W = new ie(
            W,
            Le,
            null,
            l,
            fe
          ), me.push({ event: W, listeners: Ze }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (W = e === "mouseover" || e === "pointerover", ie = e === "mouseout" || e === "pointerout", W && l !== Ii && (Le = l.relatedTarget || l.fromElement) && (pl(Le) || Le[Ye]))
            break e;
          if ((ie || W) && (W = fe.window === fe ? fe : (W = fe.ownerDocument) ? W.defaultView || W.parentWindow : window, ie ? (Le = l.relatedTarget || l.toElement, ie = J, Le = Le ? pl(Le) : null, Le !== null && (Ht = f(Le), Ze = Le.tag, Le !== Ht || Ze !== 5 && Ze !== 27 && Ze !== 6) && (Le = null)) : (ie = null, Le = J), ie !== Le)) {
            if (Ze = ya, he = "onMouseLeave", X = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && (Ze = Lp, he = "onPointerLeave", X = "onPointerEnter", B = "pointer"), Ht = ie == null ? W : ml(ie), $ = Le == null ? W : ml(Le), W = new Ze(
              he,
              B + "leave",
              ie,
              l,
              fe
            ), W.target = Ht, W.relatedTarget = $, he = null, pl(fe) === J && (Ze = new Ze(
              X,
              B + "enter",
              Le,
              l,
              fe
            ), Ze.target = $, Ze.relatedTarget = Ht, he = Ze), Ht = he, ie && Le)
              t: {
                for (Ze = SE, X = ie, B = Le, $ = 0, he = X; he; he = Ze(he))
                  $++;
                he = 0;
                for (var Pe = B; Pe; Pe = Ze(Pe))
                  he++;
                for (; 0 < $ - he; )
                  X = Ze(X), $--;
                for (; 0 < he - $; )
                  B = Ze(B), he--;
                for (; $--; ) {
                  if (X === B || B !== null && X === B.alternate) {
                    Ze = X;
                    break t;
                  }
                  X = Ze(X), B = Ze(B);
                }
                Ze = null;
              }
            else Ze = null;
            ie !== null && Ab(
              me,
              W,
              ie,
              Ze,
              !1
            ), Le !== null && Ht !== null && Ab(
              me,
              Ht,
              Le,
              Ze,
              !0
            );
          }
        }
        e: {
          if (W = J ? ml(J) : window, ie = W.nodeName && W.nodeName.toLowerCase(), ie === "select" || ie === "input" && W.type === "file")
            var wt = qp;
          else if (Gp(W))
            if (Pp)
              wt = kS;
            else {
              wt = OS;
              var Be = TS;
            }
          else
            ie = W.nodeName, !ie || ie.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && Qt(J.elementType) && (wt = qp) : wt = NS;
          if (wt && (wt = wt(e, J))) {
            Yp(
              me,
              wt,
              l,
              fe
            );
            break e;
          }
          Be && Be(e, W, J), e === "focusout" && J && W.type === "number" && J.memoizedProps.value != null && ei(W, "number", W.value);
        }
        switch (Be = J ? ml(J) : window, e) {
          case "focusin":
            (Gp(Be) || Be.contentEditable === "true") && (wr = Be, Uu = J, Ca = null);
            break;
          case "focusout":
            Ca = Uu = wr = null;
            break;
          case "mousedown":
            Bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bu = !1, Wp(me, l, fe);
            break;
          case "selectionchange":
            if (DS) break;
          case "keydown":
          case "keyup":
            Wp(me, l, fe);
        }
        var ct;
        if (Lu)
          e: {
            switch (e) {
              case "compositionstart":
                var yt = "onCompositionStart";
                break e;
              case "compositionend":
                yt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                yt = "onCompositionUpdate";
                break e;
            }
            yt = void 0;
          }
        else
          Rr ? Up(e, l) && (yt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (yt = "onCompositionStart");
        yt && (Vp && l.locale !== "ko" && (Rr || yt !== "onCompositionStart" ? yt === "onCompositionEnd" && Rr && (ct = Ve()) : (Re = fe, Ue = "value" in Re ? Re.value : Re.textContent, Rr = !0)), Be = yc(J, yt), 0 < Be.length && (yt = new jp(
          yt,
          e,
          null,
          l,
          fe
        ), me.push({ event: yt, listeners: Be }), ct ? yt.data = ct : (ct = Bp(l), ct !== null && (yt.data = ct)))), (ct = RS ? wS(e, l) : _S(e, l)) && (yt = yc(J, "onBeforeInput"), 0 < yt.length && (Be = new jp(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          fe
        ), me.push({
          event: Be,
          listeners: yt
        }), Be.data = ct)), bE(
          me,
          e,
          J,
          l,
          fe
        );
      }
      wb(me, t);
    });
  }
  function Fa(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function yc(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = q(e, l), s != null && i.unshift(
        Fa(e, s, u)
      ), s = q(e, t), s != null && i.push(
        Fa(e, s, u)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function SE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ab(e, t, l, i, s) {
    for (var u = t._reactName, m = []; l !== null && l !== i; ) {
      var E = l, j = E.alternate, J = E.stateNode;
      if (E = E.tag, j !== null && j === i) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (j = J, s ? (J = q(l, u), J != null && m.unshift(
        Fa(l, J, j)
      )) : s || (J = q(l, u), J != null && m.push(
        Fa(l, J, j)
      ))), l = l.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var EE = /\r\n?/g, CE = /\u0000|\uFFFD/g;
  function Mb(e) {
    return (typeof e == "string" ? e : "" + e).replace(EE, `
`).replace(CE, "");
  }
  function Tb(e, t) {
    return t = Mb(t), Mb(e) === t;
  }
  function It(e, t, l, i, s, u) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || $l(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && $l(e, "" + i);
        break;
      case "className":
        _o(e, "class", i);
        break;
      case "tabIndex":
        _o(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        _o(e, l, i);
        break;
      case "style":
        uo(e, i, u);
        break;
      case "data":
        if (t !== "object") {
          _o(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = jl("" + i), e.setAttribute(l, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (t !== "input" && It(e, t, "name", s.name, s, null), It(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), It(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), It(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (It(e, t, "encType", s.encType, s, null), It(e, t, "method", s.method, s, null), It(e, t, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = jl("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = Bn);
        break;
      case "onScroll":
        i != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        i != null && mt("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (l = i.__html, l != null) {
            if (s.children != null) throw Error(a(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
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
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = jl("" + i), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "" + i) : e.removeAttribute(l);
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
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(l, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(l, i) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(l) : e.setAttribute(l, i);
        break;
      case "popover":
        mt("beforetoggle", e), mt("toggle", e), co(e, "popover", i);
        break;
      case "xlinkActuate":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        ll(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        ll(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        ll(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        ll(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        co(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = To.get(l) || l, co(e, l, i));
    }
  }
  function hd(e, t, l, i, s, u) {
    switch (l) {
      case "style":
        uo(e, i, u);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (l = i.__html, l != null) {
            if (s.children != null) throw Error(a(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof i == "string" ? $l(e, i) : (typeof i == "number" || typeof i == "bigint") && $l(e, "" + i);
        break;
      case "onScroll":
        i != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        i != null && mt("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Bn);
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
        if (!Hn.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof i == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, s);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : co(e, l, i);
          }
    }
  }
  function Dn(e, t, l) {
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
        mt("error", e), mt("load", e);
        var i = !1, s = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var m = l[u];
            if (m != null)
              switch (u) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, t));
                default:
                  It(e, t, u, m, l, null);
              }
          }
        s && It(e, t, "srcSet", l.srcSet, l, null), i && It(e, t, "src", l.src, l, null);
        return;
      case "input":
        mt("invalid", e);
        var E = u = m = s = null, j = null, J = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var fe = l[i];
            if (fe != null)
              switch (i) {
                case "name":
                  s = fe;
                  break;
                case "type":
                  m = fe;
                  break;
                case "checked":
                  j = fe;
                  break;
                case "defaultChecked":
                  J = fe;
                  break;
                case "value":
                  u = fe;
                  break;
                case "defaultValue":
                  E = fe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (fe != null)
                    throw Error(a(137, t));
                  break;
                default:
                  It(e, t, i, fe, l, null);
              }
          }
        Cr(
          e,
          u,
          E,
          j,
          J,
          m,
          s,
          !1
        );
        return;
      case "select":
        mt("invalid", e), i = m = u = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (E = l[s], E != null))
            switch (s) {
              case "value":
                u = E;
                break;
              case "defaultValue":
                m = E;
                break;
              case "multiple":
                i = E;
              default:
                It(e, t, s, E, l, null);
            }
        t = u, l = m, e.multiple = !!i, t != null ? gl(e, !!i, t, !1) : l != null && gl(e, !!i, l, !0);
        return;
      case "textarea":
        mt("invalid", e), u = s = i = null;
        for (m in l)
          if (l.hasOwnProperty(m) && (E = l[m], E != null))
            switch (m) {
              case "value":
                i = E;
                break;
              case "defaultValue":
                s = E;
                break;
              case "children":
                u = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(a(91));
                break;
              default:
                It(e, t, m, E, l, null);
            }
        Ao(e, i, s, u);
        return;
      case "option":
        for (j in l)
          l.hasOwnProperty(j) && (i = l[j], i != null) && (j === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : It(e, t, j, i, l, null));
        return;
      case "dialog":
        mt("beforetoggle", e), mt("toggle", e), mt("cancel", e), mt("close", e);
        break;
      case "iframe":
      case "object":
        mt("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ka.length; i++)
          mt(Ka[i], e);
        break;
      case "image":
        mt("error", e), mt("load", e);
        break;
      case "details":
        mt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        mt("error", e), mt("load", e);
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
        for (J in l)
          if (l.hasOwnProperty(J) && (i = l[J], i != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, t));
              default:
                It(e, t, J, i, l, null);
            }
        return;
      default:
        if (Qt(t)) {
          for (fe in l)
            l.hasOwnProperty(fe) && (i = l[fe], i !== void 0 && hd(
              e,
              t,
              fe,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (E in l)
      l.hasOwnProperty(E) && (i = l[E], i != null && It(e, t, E, i, l, null));
  }
  function RE(e, t, l, i) {
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
        var s = null, u = null, m = null, E = null, j = null, J = null, fe = null;
        for (ie in l) {
          var me = l[ie];
          if (l.hasOwnProperty(ie) && me != null)
            switch (ie) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = me;
              default:
                i.hasOwnProperty(ie) || It(e, t, ie, null, i, me);
            }
        }
        for (var W in i) {
          var ie = i[W];
          if (me = l[W], i.hasOwnProperty(W) && (ie != null || me != null))
            switch (W) {
              case "type":
                u = ie;
                break;
              case "name":
                s = ie;
                break;
              case "checked":
                J = ie;
                break;
              case "defaultChecked":
                fe = ie;
                break;
              case "value":
                m = ie;
                break;
              case "defaultValue":
                E = ie;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ie != null)
                  throw Error(a(137, t));
                break;
              default:
                ie !== me && It(
                  e,
                  t,
                  W,
                  ie,
                  i,
                  me
                );
            }
        }
        Li(
          e,
          m,
          E,
          j,
          J,
          fe,
          u,
          s
        );
        return;
      case "select":
        ie = m = E = W = null;
        for (u in l)
          if (j = l[u], l.hasOwnProperty(u) && j != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                ie = j;
              default:
                i.hasOwnProperty(u) || It(
                  e,
                  t,
                  u,
                  null,
                  i,
                  j
                );
            }
        for (s in i)
          if (u = i[s], j = l[s], i.hasOwnProperty(s) && (u != null || j != null))
            switch (s) {
              case "value":
                W = u;
                break;
              case "defaultValue":
                E = u;
                break;
              case "multiple":
                m = u;
              default:
                u !== j && It(
                  e,
                  t,
                  s,
                  u,
                  i,
                  j
                );
            }
        t = E, l = m, i = ie, W != null ? gl(e, !!l, W, !1) : !!i != !!l && (t != null ? gl(e, !!l, t, !0) : gl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        ie = W = null;
        for (E in l)
          if (s = l[E], l.hasOwnProperty(E) && s != null && !i.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                It(e, t, E, null, i, s);
            }
        for (m in i)
          if (s = i[m], u = l[m], i.hasOwnProperty(m) && (s != null || u != null))
            switch (m) {
              case "value":
                W = s;
                break;
              case "defaultValue":
                ie = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(a(91));
                break;
              default:
                s !== u && It(e, t, m, s, i, u);
            }
        Vi(e, W, ie);
        return;
      case "option":
        for (var Le in l)
          W = l[Le], l.hasOwnProperty(Le) && W != null && !i.hasOwnProperty(Le) && (Le === "selected" ? e.selected = !1 : It(
            e,
            t,
            Le,
            null,
            i,
            W
          ));
        for (j in i)
          W = i[j], ie = l[j], i.hasOwnProperty(j) && W !== ie && (W != null || ie != null) && (j === "selected" ? e.selected = W && typeof W != "function" && typeof W != "symbol" : It(
            e,
            t,
            j,
            W,
            i,
            ie
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
        for (var Ze in l)
          W = l[Ze], l.hasOwnProperty(Ze) && W != null && !i.hasOwnProperty(Ze) && It(e, t, Ze, null, i, W);
        for (J in i)
          if (W = i[J], ie = l[J], i.hasOwnProperty(J) && W !== ie && (W != null || ie != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(a(137, t));
                break;
              default:
                It(
                  e,
                  t,
                  J,
                  W,
                  i,
                  ie
                );
            }
        return;
      default:
        if (Qt(t)) {
          for (var Ht in l)
            W = l[Ht], l.hasOwnProperty(Ht) && W !== void 0 && !i.hasOwnProperty(Ht) && hd(
              e,
              t,
              Ht,
              void 0,
              i,
              W
            );
          for (fe in i)
            W = i[fe], ie = l[fe], !i.hasOwnProperty(fe) || W === ie || W === void 0 && ie === void 0 || hd(
              e,
              t,
              fe,
              W,
              i,
              ie
            );
          return;
        }
    }
    for (var X in l)
      W = l[X], l.hasOwnProperty(X) && W != null && !i.hasOwnProperty(X) && It(e, t, X, null, i, W);
    for (me in i)
      W = i[me], ie = l[me], !i.hasOwnProperty(me) || W === ie || W == null && ie == null || It(e, t, me, W, i, ie);
  }
  function Ob(e) {
    switch (e) {
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
  function wE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var s = l[i], u = s.transferSize, m = s.initiatorType, E = s.duration;
        if (u && E && Ob(m)) {
          for (m = 0, E = s.responseEnd, i += 1; i < l.length; i++) {
            var j = l[i], J = j.startTime;
            if (J > E) break;
            var fe = j.transferSize, me = j.initiatorType;
            fe && Ob(me) && (j = j.responseEnd, m += fe * (j < E ? 1 : (E - J) / (j - J)));
          }
          if (--i, t += 8 * (u + m) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var pd = null, md = null;
  function vc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Nb(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function kb(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function gd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var bd = null;
  function _E() {
    var e = window.event;
    return e && e.type === "popstate" ? e === bd ? !1 : (bd = e, !0) : (bd = null, !1);
  }
  var zb = typeof setTimeout == "function" ? setTimeout : void 0, AE = typeof clearTimeout == "function" ? clearTimeout : void 0, Db = typeof Promise == "function" ? Promise : void 0, ME = typeof queueMicrotask == "function" ? queueMicrotask : typeof Db < "u" ? function(e) {
    return Db.resolve(null).then(e).catch(TE);
  } : zb;
  function TE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function bi(e) {
    return e === "head";
  }
  function jb(e, t) {
    var l = t, i = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(s), Jr(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          Qa(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Qa(l);
          for (var u = l.firstChild; u; ) {
            var m = u.nextSibling, E = u.nodeName;
            u[kl] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = m;
          }
        } else
          l === "body" && Qa(e.ownerDocument.body);
      l = s;
    } while (l);
    Jr(t);
  }
  function Lb(e, t) {
    var l = e;
    e = 0;
    do {
      var i = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), i && i.nodeType === 8)
        if (l = i.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = i;
    } while (l);
  }
  function yd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          yd(l), st(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function OE(e, t, l, i) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[kl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = Yl(e.nextSibling), e === null) break;
    }
    return null;
  }
  function NE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function Vb(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function vd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function xd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function kE(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), l.removeEventListener("DOMContentLoaded", i);
      };
      l.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function Yl(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var Sd = null;
  function Ib(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Yl(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Hb(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ub(e, t, l) {
    switch (t = vc(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(a(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(a(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(a(454));
        return e;
      default:
        throw Error(a(451));
    }
  }
  function Qa(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    st(e);
  }
  var ql = /* @__PURE__ */ new Map(), Bb = /* @__PURE__ */ new Set();
  function xc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Po = I.d;
  I.d = {
    f: zE,
    r: DE,
    D: jE,
    C: LE,
    L: VE,
    m: IE,
    X: UE,
    S: HE,
    M: BE
  };
  function zE() {
    var e = Po.f(), t = fc();
    return e || t;
  }
  function DE(e) {
    var t = zl(e);
    t !== null && t.tag === 5 && t.type === "form" ? og(t) : Po.r(e);
  }
  var Qr = typeof document > "u" ? null : document;
  function Gb(e, t, l) {
    var i = Qr;
    if (i && typeof t == "string" && t) {
      var s = wn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Bb.has(s) || (Bb.add(s), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), Dn(t, "link", e), Jt(t), i.head.appendChild(t)));
    }
  }
  function jE(e) {
    Po.D(e), Gb("dns-prefetch", e, null);
  }
  function LE(e, t) {
    Po.C(e, t), Gb("preconnect", e, t);
  }
  function VE(e, t, l) {
    Po.L(e, t, l);
    var i = Qr;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + wn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + wn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + wn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + wn(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Zr(e);
          break;
        case "script":
          u = $r(e);
      }
      ql.has(u) || (e = v(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), ql.set(u, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Za(u)) || t === "script" && i.querySelector($a(u)) || (t = i.createElement("link"), Dn(t, "link", e), Jt(t), i.head.appendChild(t)));
    }
  }
  function IE(e, t) {
    Po.m(e, t);
    var l = Qr;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + wn(i) + '"][href="' + wn(e) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = $r(e);
      }
      if (!ql.has(u) && (e = v({ rel: "modulepreload", href: e }, t), ql.set(u, e), l.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector($a(u)))
              return;
        }
        i = l.createElement("link"), Dn(i, "link", e), Jt(i), l.head.appendChild(i);
      }
    }
  }
  function HE(e, t, l) {
    Po.S(e, t, l);
    var i = Qr;
    if (i && e) {
      var s = In(i).hoistableStyles, u = Zr(e);
      t = t || "default";
      var m = s.get(u);
      if (!m) {
        var E = { loading: 0, preload: null };
        if (m = i.querySelector(
          Za(u)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = ql.get(u)) && Ed(e, l);
          var j = m = i.createElement("link");
          Jt(j), Dn(j, "link", e), j._p = new Promise(function(J, fe) {
            j.onload = J, j.onerror = fe;
          }), j.addEventListener("load", function() {
            E.loading |= 1;
          }), j.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Sc(m, t, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: E
        }, s.set(u, m);
      }
    }
  }
  function UE(e, t) {
    Po.X(e, t);
    var l = Qr;
    if (l && e) {
      var i = In(l).hoistableScripts, s = $r(e), u = i.get(s);
      u || (u = l.querySelector($a(s)), u || (e = v({ src: e, async: !0 }, t), (t = ql.get(s)) && Cd(e, t), u = l.createElement("script"), Jt(u), Dn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function BE(e, t) {
    Po.M(e, t);
    var l = Qr;
    if (l && e) {
      var i = In(l).hoistableScripts, s = $r(e), u = i.get(s);
      u || (u = l.querySelector($a(s)), u || (e = v({ src: e, async: !0, type: "module" }, t), (t = ql.get(s)) && Cd(e, t), u = l.createElement("script"), Jt(u), Dn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function Yb(e, t, l, i) {
    var s = (s = _e.current) ? xc(s) : null;
    if (!s) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Zr(l.href), l = In(
          s
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Zr(l.href);
          var u = In(
            s
          ).hoistableStyles, m = u.get(e);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, m), (u = s.querySelector(
            Za(e)
          )) && !u._p && (m.instance = u, m.state.loading = 5), ql.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, ql.set(e, l), u || GE(
            s,
            e,
            l,
            m.state
          ))), t && i === null)
            throw Error(a(528, ""));
          return m;
        }
        if (t && i !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = $r(l), l = In(
          s
        ).hoistableScripts, i = l.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, e));
    }
  }
  function Zr(e) {
    return 'href="' + wn(e) + '"';
  }
  function Za(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qb(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function GE(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), Dn(t, "link", l), Jt(t), e.head.appendChild(t));
  }
  function $r(e) {
    return '[src="' + wn(e) + '"]';
  }
  function $a(e) {
    return "script[async]" + e;
  }
  function Pb(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + wn(l.href) + '"]'
          );
          if (i)
            return t.instance = i, Jt(i), i;
          var s = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), Jt(i), Dn(i, "style", s), Sc(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          s = Zr(l.href);
          var u = e.querySelector(
            Za(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, Jt(u), u;
          i = qb(l), (s = ql.get(s)) && Ed(i, s), u = (e.ownerDocument || e).createElement("link"), Jt(u);
          var m = u;
          return m._p = new Promise(function(E, j) {
            m.onload = E, m.onerror = j;
          }), Dn(u, "link", i), t.state.loading |= 4, Sc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = $r(l.src), (s = e.querySelector(
            $a(u)
          )) ? (t.instance = s, Jt(s), s) : (i = l, (s = ql.get(u)) && (i = v({}, l), Cd(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), Jt(s), Dn(s, "link", i), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Sc(i, l.precedence, e));
    return t.instance;
  }
  function Sc(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, u = s, m = 0; m < i.length; m++) {
      var E = i[m];
      if (E.dataset.precedence === t) u = E;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Ed(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Cd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Ec = null;
  function Xb(e, t, l) {
    if (Ec === null) {
      var i = /* @__PURE__ */ new Map(), s = Ec = /* @__PURE__ */ new Map();
      s.set(l, i);
    } else
      s = Ec, i = s.get(l), i || (i = /* @__PURE__ */ new Map(), s.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[kl] || u[Tt] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = u.getAttribute(t) || "";
        m = e + m;
        var E = i.get(m);
        E ? E.push(u) : i.set(m, [u]);
      }
    }
    return i;
  }
  function Kb(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function YE(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
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
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Fb(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qE(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = Zr(i.href), u = t.querySelector(
          Za(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Cc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, Jt(u);
          return;
        }
        u = t.ownerDocument || t, i = qb(i), (s = ql.get(s)) && Ed(i, s), u = u.createElement("link"), Jt(u);
        var m = u;
        m._p = new Promise(function(E, j) {
          m.onload = E, m.onerror = j;
        }), Dn(u, "link", i), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Cc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Rd = 0;
  function PE(e, t) {
    return e.stylesheets && e.count === 0 && wc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && wc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Rd === 0 && (Rd = 62500 * wE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && wc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Rd ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function Cc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) wc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Rc = null;
  function wc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Rc = /* @__PURE__ */ new Map(), t.forEach(XE, e), Rc = null, Cc.call(e));
  }
  function XE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Rc.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Rc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var m = s[u];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (l.set(m.dataset.precedence, m), i = m);
        }
        i && l.set(null, i);
      }
      s = t.instance, m = s.getAttribute("data-precedence"), u = l.get(m) || i, u === i && l.set(null, s), l.set(m, s), this.count++, i = Cc.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ja = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function KE(e, t, l, i, s, u, m, E, j) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yt(0), this.hiddenUpdates = Yt(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Qb(e, t, l, i, s, u, m, E, j, J, fe, me) {
    return e = new KE(
      e,
      t,
      l,
      m,
      j,
      J,
      fe,
      me,
      E
    ), t = 1, u === !0 && (t |= 24), u = vl(3, null, null, t), e.current = u, u.stateNode = e, t = nf(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, af(u), e;
  }
  function Zb(e) {
    return e ? (e = Mr, e) : Mr;
  }
  function $b(e, t, l, i, s, u) {
    s = Zb(s), i.context === null ? i.context = s : i.pendingContext = s, i = ri(t), i.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (i.callback = u), l = ai(e, i, t), l !== null && (cl(l, e, t), Oa(l, e, t));
  }
  function Jb(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function wd(e, t) {
    Jb(e, t), (e = e.alternate) && Jb(e, t);
  }
  function Wb(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Bi(e, 67108864);
      t !== null && cl(t, e, 67108864), wd(e, 67108864);
    }
  }
  function ey(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Rl();
      t = ro(t);
      var l = Bi(e, t);
      l !== null && cl(l, e, t), wd(e, t);
    }
  }
  var _c = !0;
  function FE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = I.p;
    try {
      I.p = 2, _d(e, t, l, i);
    } finally {
      I.p = u, V.T = s;
    }
  }
  function QE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = I.p;
    try {
      I.p = 8, _d(e, t, l, i);
    } finally {
      I.p = u, V.T = s;
    }
  }
  function _d(e, t, l, i) {
    if (_c) {
      var s = Ad(i);
      if (s === null)
        dd(
          e,
          t,
          i,
          Ac,
          l
        ), ny(e, i);
      else if ($E(
        s,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (ny(e, i), t & 4 && -1 < ZE.indexOf(e)) {
        for (; s !== null; ) {
          var u = zl(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var m = ht(u.pendingLanes);
                  if (m !== 0) {
                    var E = u;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; m; ) {
                      var j = 1 << 31 - dt(m);
                      E.entanglements[1] |= j, m &= ~j;
                    }
                    go(u), (Ot & 6) === 0 && (cc = Z() + 500, Xa(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Bi(u, 2), E !== null && cl(E, u, 2), fc(), wd(u, 2);
            }
          if (u = Ad(i), u === null && dd(
            e,
            t,
            i,
            Ac,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && i.stopPropagation();
      } else
        dd(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function Ad(e) {
    return e = R(e), Md(e);
  }
  var Ac = null;
  function Md(e) {
    if (Ac = null, e = pl(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Ac = e, null;
  }
  function ty(e) {
    switch (e) {
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
        switch (ue()) {
          case Ie:
            return 2;
          case Ce:
            return 8;
          case Ge:
          case nt:
            return 32;
          case Mt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Td = !1, yi = null, vi = null, xi = null, Wa = /* @__PURE__ */ new Map(), es = /* @__PURE__ */ new Map(), Si = [], ZE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ny(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        yi = null;
        break;
      case "dragenter":
      case "dragleave":
        vi = null;
        break;
      case "mouseover":
      case "mouseout":
        xi = null;
        break;
      case "pointerover":
      case "pointerout":
        Wa.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        es.delete(t.pointerId);
    }
  }
  function ts(e, t, l, i, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = zl(t), t !== null && Wb(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function $E(e, t, l, i, s) {
    switch (t) {
      case "focusin":
        return yi = ts(
          yi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "dragenter":
        return vi = ts(
          vi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "mouseover":
        return xi = ts(
          xi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Wa.set(
          u,
          ts(
            Wa.get(u) || null,
            e,
            t,
            l,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, es.set(
          u,
          ts(
            es.get(u) || null,
            e,
            t,
            l,
            i,
            s
          )
        ), !0;
    }
    return !1;
  }
  function ly(e) {
    var t = pl(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              ey(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              ey(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Mc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Ad(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        Ii = i, l.target.dispatchEvent(i), Ii = null;
      } else
        return t = zl(l), t !== null && Wb(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function oy(e, t, l) {
    Mc(e) && l.delete(t);
  }
  function JE() {
    Td = !1, yi !== null && Mc(yi) && (yi = null), vi !== null && Mc(vi) && (vi = null), xi !== null && Mc(xi) && (xi = null), Wa.forEach(oy), es.forEach(oy);
  }
  function Tc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Td || (Td = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      JE
    )));
  }
  var Oc = null;
  function iy(e) {
    Oc !== e && (Oc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Oc === e && (Oc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (Md(i || l) === null)
              continue;
            break;
          }
          var u = zl(l);
          u !== null && (e.splice(t, 3), t -= 3, Af(
            u,
            {
              pending: !0,
              data: s,
              method: l.method,
              action: i
            },
            i,
            s
          ));
        }
      }
    ));
  }
  function Jr(e) {
    function t(j) {
      return Tc(j, e);
    }
    yi !== null && Tc(yi, e), vi !== null && Tc(vi, e), xi !== null && Tc(xi, e), Wa.forEach(t), es.forEach(t);
    for (var l = 0; l < Si.length; l++) {
      var i = Si[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Si.length && (l = Si[0], l.blockedOn === null); )
      ly(l), l.blockedOn === null && Si.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var s = l[i], u = l[i + 1], m = s[Rt] || null;
        if (typeof u == "function")
          m || iy(l);
        else if (m) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, m = u[Rt] || null)
              E = m.formAction;
            else if (Md(s) !== null) continue;
          } else E = m.action;
          typeof E == "function" ? l[i + 1] = E : (l.splice(i, 3), i -= 3), iy(l);
        }
      }
  }
  function ry() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(m) {
            return s = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      s !== null && (s(), s = null), i || setTimeout(l, 20);
    }
    function l() {
      if (!i && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function Od(e) {
    this._internalRoot = e;
  }
  Nc.prototype.render = Od.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var l = t.current, i = Rl();
    $b(l, i, e, t, null, null);
  }, Nc.prototype.unmount = Od.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      $b(e.current, 2, null, e, null, null), fc(), t[Ye] = null;
    }
  };
  function Nc(e) {
    this._internalRoot = e;
  }
  Nc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = tl();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Si.length && t !== 0 && t < Si[l].priority; l++) ;
      Si.splice(l, 0, e), l === 0 && ly(e);
    }
  };
  var ay = o.version;
  if (ay !== "19.2.8")
    throw Error(
      a(
        527,
        ay,
        "19.2.8"
      )
    );
  I.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = h(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var WE = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var kc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!kc.isDisabled && kc.supportsFiber)
      try {
        kt = kc.inject(
          WE
        ), vt = kc;
      } catch {
      }
  }
  return ls.createRoot = function(e, t) {
    if (!c(e)) throw Error(a(299));
    var l = !1, i = "", s = pg, u = mg, m = gg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = Qb(
      e,
      1,
      !1,
      null,
      null,
      l,
      i,
      null,
      s,
      u,
      m,
      ry
    ), e[Ye] = t.current, fd(e), new Od(t);
  }, ls.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(a(299));
    var i = !1, s = "", u = pg, m = mg, E = gg, j = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (m = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (j = l.formState)), t = Qb(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      s,
      j,
      u,
      m,
      E,
      ry
    ), t.context = Zb(null), l = t.current, i = Rl(), i = ro(i), s = ri(i), s.callback = null, ai(l, s, i), l = i, t.current.lanes = l, el(t, l), go(t), e[Ye] = t.current, fd(e), new Nc(t);
  }, ls.version = "19.2.8", ls;
}
var xy;
function uC() {
  if (xy) return zd.exports;
  xy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), zd.exports = cC(), zd.exports;
}
var fC = uC(), b = vs();
const dC = /* @__PURE__ */ nC(b), pr = /* @__PURE__ */ tC({
  __proto__: null,
  default: dC
}, [b]);
function Sy(n) {
  let o = n;
  for (; o; ) {
    if (o.classList.contains("dark") || o.classList.contains("dark-theme") || o.classList.contains("theme-dark"))
      return !0;
    if (o.classList.contains("light") || o.classList.contains("light-theme") || o.classList.contains("theme-light"))
      return !1;
    const r = o.getAttribute("data-theme") ?? o.getAttribute("data-mode");
    if (r === "dark") return !0;
    if (r === "light") return !1;
    o = o.parentElement;
  }
  for (const r of [document.documentElement, document.body]) {
    if (r.classList.contains("dark") || r.classList.contains("dark-theme") || r.getAttribute("data-theme") === "dark" || r.getAttribute("data-mode") === "dark")
      return !0;
    if (r.classList.contains("light") || r.classList.contains("light-theme") || r.getAttribute("data-theme") === "light" || r.getAttribute("data-mode") === "light")
      return !1;
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? !1;
}
function hC(n) {
  const [o, r] = b.useState(() => Sy(n));
  return b.useEffect(() => {
    if (!n) return;
    const a = () => r(Sy(n));
    a();
    const c = new MutationObserver(a);
    c.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    }), document.body && c.observe(document.body, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    });
    const f = window.matchMedia?.("(prefers-color-scheme: dark)");
    return f?.addEventListener("change", a), () => {
      c.disconnect(), f?.removeEventListener("change", a);
    };
  }, [n]), o;
}
function Yv(n) {
  var o, r, a = "";
  if (typeof n == "string" || typeof n == "number") a += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Yv(n[o])) && (a && (a += " "), a += r);
  } else for (r in n) n[r] && (a && (a += " "), a += r);
  return a;
}
function qv() {
  for (var n, o, r = 0, a = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Yv(n)) && (a && (a += " "), a += o);
  return a;
}
const pC = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n[a];
  for (let a = 0; a < o.length; a++)
    r[n.length + a] = o[a];
  return r;
}, mC = (n, o) => ({
  classGroupId: n,
  validator: o
}), Pv = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), $c = "-", Ey = [], gC = "arbitrary..", bC = (n) => {
  const o = vC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: a
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return yC(d);
      const p = d.split($c), g = p[0] === "" && p.length > 1 ? 1 : 0;
      return Xv(p, g, o);
    },
    getConflictingClassGroupIds: (d, p) => {
      if (p) {
        const g = a[d], h = r[d];
        return g ? h ? pC(h, g) : g : h || Ey;
      }
      return r[d] || Ey;
    }
  };
}, Xv = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = Xv(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const p = o === 0 ? n.join($c) : n.slice(o).join($c), g = d.length;
  for (let h = 0; h < g; h++) {
    const y = d[h];
    if (y.validator(p))
      return y.classGroupId;
  }
}, yC = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = n.slice(1, -1), r = o.indexOf(":"), a = o.slice(0, r);
  return a ? gC + a : void 0;
})(), vC = (n) => {
  const {
    theme: o,
    classGroups: r
  } = n;
  return xC(r, o);
}, xC = (n, o) => {
  const r = Pv();
  for (const a in n) {
    const c = n[a];
    Bh(c, r, a, o);
  }
  return r;
}, Bh = (n, o, r, a) => {
  const c = n.length;
  for (let f = 0; f < c; f++) {
    const d = n[f];
    SC(d, o, r, a);
  }
}, SC = (n, o, r, a) => {
  if (typeof n == "string") {
    EC(n, o, r);
    return;
  }
  if (typeof n == "function") {
    CC(n, o, r, a);
    return;
  }
  RC(n, o, r, a);
}, EC = (n, o, r) => {
  const a = n === "" ? o : Kv(o, n);
  a.classGroupId = r;
}, CC = (n, o, r, a) => {
  if (wC(n)) {
    Bh(n(a), o, r, a);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(mC(r, n));
}, RC = (n, o, r, a) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [p, g] = c[d];
    Bh(g, Kv(o, p), r, a);
  }
}, Kv = (n, o) => {
  let r = n;
  const a = o.split($c), c = a.length;
  for (let f = 0; f < c; f++) {
    const d = a[f];
    let p = r.nextPart.get(d);
    p || (p = Pv(), r.nextPart.set(d, p)), r = p;
  }
  return r;
}, wC = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, _C = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, r = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  const c = (f, d) => {
    r[f] = d, o++, o > n && (o = 0, a = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(f) {
      let d = r[f];
      if (d !== void 0)
        return d;
      if ((d = a[f]) !== void 0)
        return c(f, d), d;
    },
    set(f, d) {
      f in r ? r[f] = d : c(f, d);
    }
  };
}, bh = "!", Cy = ":", AC = [], Ry = (n, o, r, a, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: a,
  isExternal: c
}), MC = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let a = (c) => {
    const f = [];
    let d = 0, p = 0, g = 0, h;
    const y = c.length;
    for (let _ = 0; _ < y; _++) {
      const N = c[_];
      if (d === 0 && p === 0) {
        if (N === Cy) {
          f.push(c.slice(g, _)), g = _ + 1;
          continue;
        }
        if (N === "/") {
          h = _;
          continue;
        }
      }
      N === "[" ? d++ : N === "]" ? d-- : N === "(" ? p++ : N === ")" && p--;
    }
    const v = f.length === 0 ? c : c.slice(g);
    let x = v, C = !1;
    v.endsWith(bh) ? (x = v.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(bh) && (x = v.slice(1), C = !0)
    );
    const w = h && h > g ? h - g : void 0;
    return Ry(f, C, x, w);
  };
  if (o) {
    const c = o + Cy, f = a;
    a = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Ry(AC, !1, d, void 0, !0);
  }
  if (r) {
    const c = a;
    a = (f) => r({
      className: f,
      parseClassName: c
    });
  }
  return a;
}, TC = (n) => {
  const o = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((r, a) => {
    o.set(r, 1e6 + a);
  }), (r) => {
    const a = [];
    let c = [];
    for (let f = 0; f < r.length; f++) {
      const d = r[f], p = d[0] === "[", g = o.has(d);
      p || g ? (c.length > 0 && (c.sort(), a.push(...c), c = []), a.push(d)) : c.push(d);
    }
    return c.length > 0 && (c.sort(), a.push(...c)), a;
  };
}, OC = (n) => ({
  cache: _C(n.cacheSize),
  parseClassName: MC(n),
  sortModifiers: TC(n),
  postfixLookupClassGroupIds: NC(n),
  ...bC(n)
}), NC = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let a = 0; a < r.length; a++)
      o[r[a]] = !0;
  return o;
}, kC = /\s+/, zC = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: a,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, p = [], g = n.trim().split(kC);
  let h = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const v = g[y], {
      isExternal: x,
      modifiers: C,
      hasImportantModifier: w,
      baseClassName: _,
      maybePostfixModifierPosition: N
    } = r(v);
    if (x) {
      h = v + (h.length > 0 ? " " + h : h);
      continue;
    }
    let T = !!N, M;
    if (T) {
      const G = _.substring(0, N);
      M = a(G);
      const L = M && d[M] ? a(_) : void 0;
      L && L !== M && (M = L, T = !1);
    } else
      M = a(_);
    if (!M) {
      if (!T) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (M = a(_), !M) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      T = !1;
    }
    const A = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), k = w ? A + bh : A, H = k + M;
    if (p.indexOf(H) > -1)
      continue;
    p.push(H);
    const P = c(M, T);
    for (let G = 0; G < P.length; ++G) {
      const L = P[G];
      p.push(k + L);
    }
    h = v + (h.length > 0 ? " " + h : h);
  }
  return h;
}, DC = (...n) => {
  let o = 0, r, a, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (a = Fv(r)) && (c && (c += " "), c += a);
  return c;
}, Fv = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let a = 0; a < n.length; a++)
    n[a] && (o = Fv(n[a])) && (r && (r += " "), r += o);
  return r;
}, jC = (n, ...o) => {
  let r, a, c, f;
  const d = (g) => {
    const h = o.reduce((y, v) => v(y), n());
    return r = OC(h), a = r.cache.get, c = r.cache.set, f = p, p(g);
  }, p = (g) => {
    const h = a(g);
    if (h)
      return h;
    const y = zC(g, r);
    return c(g, y), y;
  };
  return f = d, (...g) => f(DC(...g));
}, LC = [], Sn = (n) => {
  const o = (r) => r[n] || LC;
  return o.isThemeGetter = !0, o;
}, Qv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Zv = /^\((?:(\w[\w-]*):)?(.+)\)$/i, VC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, IC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, HC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, UC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, BC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, GC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ci = (n) => VC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), bo = (n) => !!n && Number.isInteger(Number(n)), Id = (n) => n.endsWith("%") && ft(n.slice(0, -1)), Xo = (n) => IC.test(n), $v = () => !0, YC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  HC.test(n) && !UC.test(n)
), Gh = () => !1, qC = (n) => BC.test(n), PC = (n) => GC.test(n), XC = (n) => !ze(n) && !De(n), KC = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), FC = (n) => ki(n, e0, Gh), ze = (n) => Qv.test(n), er = (n) => ki(n, t0, YC), wy = (n) => ki(n, nR, ft), QC = (n) => ki(n, l0, $v), ZC = (n) => ki(n, n0, Gh), _y = (n) => ki(n, Jv, Gh), $C = (n) => ki(n, Wv, PC), zc = (n) => ki(n, o0, qC), De = (n) => Zv.test(n), os = (n) => mr(n, t0), JC = (n) => mr(n, n0), Ay = (n) => mr(n, Jv), WC = (n) => mr(n, e0), eR = (n) => mr(n, Wv), Dc = (n) => mr(n, o0, !0), tR = (n) => mr(n, l0, !0), ki = (n, o, r) => {
  const a = Qv.exec(n);
  return a ? a[1] ? o(a[1]) : r(a[2]) : !1;
}, mr = (n, o, r = !1) => {
  const a = Zv.exec(n);
  return a ? a[1] ? o(a[1]) : r : !1;
}, Jv = (n) => n === "position" || n === "percentage", Wv = (n) => n === "image" || n === "url", e0 = (n) => n === "length" || n === "size" || n === "bg-size", t0 = (n) => n === "length", nR = (n) => n === "number", n0 = (n) => n === "family-name", l0 = (n) => n === "number" || n === "weight", o0 = (n) => n === "shadow", lR = () => {
  const n = Sn("color"), o = Sn("font"), r = Sn("text"), a = Sn("font-weight"), c = Sn("tracking"), f = Sn("leading"), d = Sn("breakpoint"), p = Sn("container"), g = Sn("spacing"), h = Sn("radius"), y = Sn("shadow"), v = Sn("inset-shadow"), x = Sn("text-shadow"), C = Sn("drop-shadow"), w = Sn("blur"), _ = Sn("perspective"), N = Sn("aspect"), T = Sn("ease"), M = Sn("animate"), A = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], H = () => [...k(), De, ze], P = () => ["auto", "hidden", "clip", "visible", "scroll"], G = () => ["auto", "contain", "none"], L = () => [De, ze, g], K = () => [Ci, "full", "auto", ...L()], te = () => [bo, "none", "subgrid", De, ze], se = () => ["auto", {
    span: ["full", bo, De, ze]
  }, bo, De, ze], de = () => [bo, "auto", De, ze], le = () => ["auto", "min", "max", "fr", De, ze], pe = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...L()], I = () => [Ci, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...L()], Q = () => [Ci, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...L()], xe = () => [Ci, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...L()], ae = () => [n, De, ze], z = () => [...k(), Ay, _y, {
    position: [De, ze]
  }], F = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", WC, FC, {
    size: [De, ze]
  }], oe = () => [Id, os, er], ge = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    De,
    ze
  ], _e = () => ["", ft, os, er], qe = () => ["solid", "dashed", "dotted", "double"], Me = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Te = () => [ft, Id, Ay, _y], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    De,
    ze
  ], gt = () => ["none", ft, De, ze], ke = () => ["none", ft, De, ze], et = () => [ft, De, ze], Ne = () => [Ci, "full", ...L()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Xo],
      breakpoint: [Xo],
      color: [$v],
      container: [Xo],
      "drop-shadow": [Xo],
      ease: ["in", "out", "in-out"],
      font: [XC],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Xo],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Xo],
      shadow: [Xo],
      spacing: ["px", ft],
      text: [Xo],
      "text-shadow": [Xo],
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
        aspect: ["auto", "square", Ci, ze, De, N]
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
        "@container": ["", "normal", "size", De, ze]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [KC],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ft, ze, De, p]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": A()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": A()
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
        object: H()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: G()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": G()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": G()
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
        inset: K()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": K()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": K()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": K(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: K()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": K(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: K()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": K()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": K()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: K()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: K()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: K()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: K()
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
        z: [bo, "auto", De, ze]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ci, "full", "auto", p, ...L()]
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
        flex: [ft, Ci, "auto", "initial", "none", ze]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ft, De, ze]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ft, De, ze]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [bo, "first", "last", "none", De, ze]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": te()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: se()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": de()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": de()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": te()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: se()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": de()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": de()
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
        "auto-cols": le()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": le()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: L()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": L()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": L()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...pe(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...be(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...be()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...pe()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...be(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...be(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": pe()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...be(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...be()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: L()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: L()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: L()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: L()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: L()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: L()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: L()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: L()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: L()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: L()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: L()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: V()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: V()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: V()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: V()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: V()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: V()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: V()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: V()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: V()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: V()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: V()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": L()
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
        "space-y": L()
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
        size: I()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...Q()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...Q()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...Q()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...xe()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...xe()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...xe()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [p, "screen", ...I()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          p,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...I()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          p,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [d]
          },
          ...I()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...I()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...I()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...I()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, os, er]
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
        font: [a, tR, QC]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Id, ze]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [JC, ZC, o]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [ze]
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
        tracking: [c, De, ze]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ft, "none", De, wy]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...L()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", De, ze]
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
        list: ["disc", "decimal", "none", De, ze]
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
        placeholder: ae()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: ae()
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
        decoration: [...qe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ft, "from-font", "auto", De, er]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: ae()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ft, "auto", De, ze]
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
        indent: L()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [bo, De, ze]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", De, ze]
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
        content: ["none", De, ze]
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
        bg: z()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: F()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ne()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, bo, De, ze],
          radial: ["", De, ze],
          conic: [bo, De, ze]
        }, eR, $C]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: ae()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: oe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: oe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: oe()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: ae()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: ae()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: ae()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ge()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ge()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ge()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ge()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ge()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ge()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ge()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ge()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ge()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ge()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ge()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ge()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ge()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ge()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ge()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: _e()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": _e()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": _e()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": _e()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": _e()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": _e()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": _e()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": _e()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": _e()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": _e()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": _e()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": _e()
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
        "divide-y": _e()
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
        border: [...qe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...qe(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: ae()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": ae()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": ae()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": ae()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": ae()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": ae()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": ae()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": ae()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": ae()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": ae()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": ae()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: ae()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...qe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ft, De, ze]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ft, os, er]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: ae()
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
          y,
          Dc,
          zc
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: ae()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", v, Dc, zc]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": ae()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: _e()
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
        ring: ae()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ft, er]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": ae()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": _e()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": ae()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", x, Dc, zc]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": ae()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ft, De, ze]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Me(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Me()
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
        "mask-linear": [ft]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Te()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Te()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": ae()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": ae()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Te()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Te()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": ae()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": ae()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Te()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Te()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": ae()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": ae()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Te()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Te()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": ae()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": ae()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Te()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Te()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": ae()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": ae()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Te()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Te()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": ae()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": ae()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Te()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Te()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": ae()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": ae()
      }],
      "mask-image-radial": [{
        "mask-radial": [De, ze]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Te()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Te()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": ae()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": ae()
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
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ft]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Te()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Te()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": ae()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": ae()
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
        mask: z()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: F()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ne()
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
        mask: ["none", De, ze]
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
          De,
          ze
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: it()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ft, De, ze]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ft, De, ze]
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
          C,
          Dc,
          zc
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": ae()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ft, De, ze]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ft, De, ze]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ft, De, ze]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ft, De, ze]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ft, De, ze]
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
          De,
          ze
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": it()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ft, De, ze]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ft, De, ze]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ft, De, ze]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ft, De, ze]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ft, De, ze]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ft, De, ze]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ft, De, ze]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ft, De, ze]
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
        "border-spacing": L()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": L()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": L()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", De, ze]
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
        duration: [ft, "initial", De, ze]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", T, De, ze]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ft, De, ze]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", M, De, ze]
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
        perspective: [_, De, ze]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": H()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: gt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": gt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": gt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": gt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ke()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ke()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ke()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ke()
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
        skew: et()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": et()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": et()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [De, ze, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: H()
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
        translate: Ne()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Ne()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Ne()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Ne()
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
        zoom: [bo, De, ze]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ae()
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
        caret: ae()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", De, ze]
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
        "scrollbar-thumb": ae()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": ae()
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
        "scroll-m": L()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": L()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": L()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": L()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": L()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": L()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": L()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": L()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": L()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": L()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": L()
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
        "will-change": ["auto", "scroll", "contents", "transform", De, ze]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...ae()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ft, os, er, wy]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...ae()]
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
}, oR = /* @__PURE__ */ jC(lR);
function We(...n) {
  return oR(qv(n));
}
const i0 = (...n) => n.filter((o, r, a) => !!o && o.trim() !== "" && a.indexOf(o) === r).join(" ").trim();
const iR = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const rR = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, a) => a ? a.toUpperCase() : r.toLowerCase()
);
const My = (n) => {
  const o = rR(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const aR = (n) => {
  for (const o in n)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
  return !1;
}, sR = b.createContext({}), cR = () => b.useContext(sR), uR = b.forwardRef(
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: a, className: c = "", children: f, iconNode: d, ...p }, g) => {
    const {
      size: h = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: v = !1,
      color: x = "currentColor",
      className: C = ""
    } = cR() ?? {}, w = a ?? v ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...Hd,
        width: o ?? h ?? Hd.width,
        height: o ?? h ?? Hd.height,
        stroke: n ?? x,
        strokeWidth: w,
        className: i0("lucide", C, c),
        ...!f && !aR(p) && { "aria-hidden": "true" },
        ...p
      },
      [
        ...d.map(([_, N]) => b.createElement(_, N)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Xn = (n, o) => {
  const r = b.forwardRef(
    ({ className: a, ...c }, f) => b.createElement(uR, {
      ref: f,
      iconNode: o,
      className: i0(
        `lucide-${iR(My(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return r.displayName = My(n), r;
};
const fR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], dR = Xn("check", fR);
const hR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], r0 = Xn("chevron-down", hR);
const pR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], mR = Xn("chevron-right", pR);
const gR = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Ty = Xn("circle", gR);
const bR = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], yR = Xn("eye", bR);
const vR = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], xR = Xn("eye-off", vR);
const SR = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], ER = Xn("lasso", SR);
const CR = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], RR = Xn("maximize", CR);
const wR = [["path", { d: "M5 12h14", key: "1ays0h" }]], a0 = Xn("minus", wR);
const _R = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], AR = Xn("move", _R);
const MR = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], TR = Xn("pentagon", MR);
const OR = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], NR = Xn("plus", OR);
const kR = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], s0 = Xn("shapes", kR);
const zR = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], DR = Xn("spline", zR);
const jR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], LR = Xn("square", jR);
const VR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], c0 = Xn("x", VR);
var pa = Gv(), IR = Object.defineProperty, Yh = (n, o) => IR(n, "name", { value: o, configurable: !0 });
function yh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Yh(yh, "setRef");
function u0(...n) {
  return (o) => {
    let r = !1;
    const a = n.map((c) => {
      const f = yh(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < a.length; c++) {
          const f = a[c];
          typeof f == "function" ? f() : yh(n[c], null);
        }
      };
  };
}
Yh(u0, "composeRefs");
function Pn(...n) {
  return b.useCallback(u0(...n), n);
}
Yh(Pn, "useComposedRefs");
var HR = Object.defineProperty, oo = (n, o) => HR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function ar(n) {
  const o = b.forwardRef((r, a) => {
    let { children: c, ...f } = r, d = null, p = !1;
    const g = [];
    vh(c) && typeof jc == "function" && (c = jc(c._payload)), b.Children.forEach(c, (x) => {
      if (m0(x)) {
        p = !0;
        const C = x;
        let w = "child" in C.props ? C.props.child : C.props.children;
        vh(w) && typeof jc == "function" && (w = jc(w._payload)), d = BR(C, w), g.push(d?.props?.children);
      } else
        g.push(x);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !p && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? p0(d) : void 0, y = Pn(a, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          p ? qR(n) : YR(n)
        );
      return c;
    }
    const v = h0(f, d.props ?? {});
    return d.type !== b.Fragment && (v.ref = a ? y : h), b.cloneElement(d, v);
  });
  return o.displayName = `${n}.Slot`, o;
}
oo(ar, "createSlot");
var f0 = /* @__PURE__ */ ar("Slot"), d0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function UR(n) {
  const o = /* @__PURE__ */ oo((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = d0, o;
}
oo(UR, "createSlottable");
var BR = /* @__PURE__ */ oo((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function h0(n, o) {
  const r = { ...o };
  for (const a in o) {
    const c = n[a], f = o[a];
    /^on[A-Z]/.test(a) ? c && f ? r[a] = (...p) => {
      const g = f(...p);
      return c(...p), g;
    } : c && (r[a] = c) : a === "style" ? r[a] = { ...c, ...f } : a === "className" && (r[a] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...r };
}
oo(h0, "mergeProps");
function p0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
oo(p0, "getElementRef");
function m0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === d0;
}
oo(m0, "isSlottable");
var GR = /* @__PURE__ */ Symbol.for("react.lazy");
function vh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === GR && "_payload" in n && g0(n._payload);
}
oo(vh, "isLazyComponent");
function g0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
oo(g0, "isPromiseLike");
var YR = /* @__PURE__ */ oo((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), qR = /* @__PURE__ */ oo((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), jc = pr[" use ".trim().toString()], PR = Object.defineProperty, XR = (n, o) => PR(n, "name", { value: o, configurable: !0 }), KR = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], jn = KR.reduce((n, o) => {
  const r = /* @__PURE__ */ ar(`Primitive.${o}`), a = b.forwardRef((c, f) => {
    const { asChild: d, ...p } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(g, { ...p, ref: f });
  });
  return a.displayName = `Primitive.${o}`, { ...n, [o]: a };
}, {});
function FR(n, o) {
  n && pa.flushSync(() => n.dispatchEvent(o));
}
XR(FR, "dispatchDiscreteCustomEvent");
var QR = Object.defineProperty, Kl = (n, o) => QR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function ZR(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const a = /* @__PURE__ */ Kl((f) => {
    const { children: d, ...p } = f, g = b.useMemo(() => p, Object.values(p));
    return /* @__PURE__ */ S.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  a.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: p = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!p)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Kl(c, "useContext"), [a, c];
}
Kl(ZR, "createContext");
// @__NO_SIDE_EFFECTS__
function zi(n, o = []) {
  let r = [];
  function a(f, d) {
    const p = b.createContext(d);
    p.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Kl((v) => {
      const { scope: x, children: C, ...w } = v, _ = x?.[n]?.[g] || p, N = b.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ S.jsx(_.Provider, { value: N, children: C });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(v, x, C = {}) {
      const { optional: w = !1 } = C, _ = x?.[n]?.[g] || p, N = b.useContext(_);
      if (N) return N;
      if (d !== void 0) return d;
      if (!w)
        throw new Error(`\`${v}\` must be used within \`${f}\``);
    }
    return Kl(y, "useContext"), [h, y];
  }
  Kl(a, "createContext");
  const c = /* @__PURE__ */ Kl(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ Kl(function(p) {
      const g = p?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...p, [n]: g } }),
        [p, g]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [a, b0(c, ...o)];
}
Kl(zi, "createContextScope");
function b0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Kl(() => {
    const a = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Kl(function(f) {
      const d = a.reduce((p, { useScope: g, scopeName: h }) => {
        const v = g(f)[`__scope${h}`];
        return { ...p, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Kl(b0, "composeContextScopes");
var $R = Object.defineProperty, Mn = (n, o) => $R(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function cu(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ zi(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Mn((_) => {
    const { scope: N, children: T } = _, M = b.useRef(null), A = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: N, itemMap: A, collectionRef: M, children: T });
  }, "CollectionProvider");
  d.displayName = o;
  const p = n + "CollectionSlot", g = /* @__PURE__ */ ar(p), h = b.forwardRef(
    (_, N) => {
      const { scope: T, children: M } = _, A = f(p, T), k = Pn(N, A.collectionRef);
      return /* @__PURE__ */ S.jsx(g, { ref: k, children: M });
    }
  );
  h.displayName = p;
  const y = n + "CollectionItemSlot", v = "data-radix-collection-item", x = /* @__PURE__ */ ar(y), C = b.forwardRef(
    (_, N) => {
      const { scope: T, children: M, ...A } = _, k = b.useRef(null), H = Pn(N, k), P = f(y, T);
      return b.useEffect(() => (P.itemMap.set(k, { ref: k, ...A }), () => {
        P.itemMap.delete(k);
      })), /* @__PURE__ */ S.jsx(x, { [v]: "", ref: H, children: M });
    }
  );
  C.displayName = y;
  function w(_) {
    const N = f(n + "CollectionConsumer", _);
    return b.useCallback(() => {
      const M = N.collectionRef.current;
      if (!M) return [];
      const A = Array.from(M.querySelectorAll(`[${v}]`));
      return Array.from(N.itemMap.values()).sort(
        (P, G) => A.indexOf(P.ref.current) - A.indexOf(G.ref.current)
      );
    }, [N.collectionRef, N.itemMap]);
  }
  return Mn(w, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: C },
    w,
    a
  ];
}
Mn(cu, "createCollection");
var Oy = /* @__PURE__ */ new WeakMap(), bn, wl, Ud = (wl = class extends Map {
  constructor(r) {
    super(r);
    uy(this, bn);
    Nd(this, bn, [...super.keys()]), Oy.set(this, !0);
  }
  set(r, a) {
    return Oy.get(this) && (this.has(r) ? Gn(this, bn)[Gn(this, bn).indexOf(r)] = r : Gn(this, bn).push(r)), super.set(r, a), this;
  }
  insert(r, a, c) {
    const f = this.has(a), d = Gn(this, bn).length, p = qh(r);
    let g = p >= 0 ? p : d + p;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(a, c), this;
    const y = this.size + (f ? 0 : 1);
    p < 0 && g++;
    const v = [...Gn(this, bn)];
    let x, C = !1;
    for (let w = g; w < y; w++)
      if (g === w) {
        let _ = v[w];
        v[w] === a && (_ = v[w + 1]), f && this.delete(a), x = this.get(_), this.set(a, c);
      } else {
        !C && v[w - 1] === a && (C = !0);
        const _ = v[C ? w : w - 1], N = x;
        x = this.get(_), this.delete(_), this.set(_, N);
      }
    return this;
  }
  with(r, a, c) {
    const f = new wl(this);
    return f.insert(r, a, c), f;
  }
  before(r) {
    const a = Gn(this, bn).indexOf(r) - 1;
    if (!(a < 0))
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, a, c) {
    const f = Gn(this, bn).indexOf(r);
    return f === -1 ? this : this.insert(f, a, c);
  }
  after(r) {
    let a = Gn(this, bn).indexOf(r);
    if (a = a === -1 || a === this.size - 1 ? -1 : a + 1, a !== -1)
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, a, c) {
    const f = Gn(this, bn).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, a, c);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Nd(this, bn, []), super.clear();
  }
  delete(r) {
    const a = super.delete(r);
    return a && Gn(this, bn).splice(Gn(this, bn).indexOf(r), 1), a;
  }
  deleteAt(r) {
    const a = this.keyAt(r);
    return a !== void 0 ? this.delete(a) : !1;
  }
  at(r) {
    const a = Xc(Gn(this, bn), r);
    if (a !== void 0)
      return this.get(a);
  }
  entryAt(r) {
    const a = Xc(Gn(this, bn), r);
    if (a !== void 0)
      return [a, this.get(a)];
  }
  indexOf(r) {
    return Gn(this, bn).indexOf(r);
  }
  keyAt(r) {
    return Xc(Gn(this, bn), r);
  }
  from(r, a) {
    const c = this.indexOf(r);
    if (c === -1)
      return;
    let f = c + a;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.at(f);
  }
  keyFrom(r, a) {
    const c = this.indexOf(r);
    if (c === -1)
      return;
    let f = c + a;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.keyAt(f);
  }
  find(r, a) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, a, [f, c, this]))
        return f;
      c++;
    }
  }
  findIndex(r, a) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, a, [f, c, this]))
        return c;
      c++;
    }
    return -1;
  }
  filter(r, a) {
    const c = [];
    let f = 0;
    for (const d of this)
      Reflect.apply(r, a, [d, f, this]) && c.push(d), f++;
    return new wl(c);
  }
  map(r, a) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, a, [d, f, this])]), f++;
    return new wl(c);
  }
  reduce(...r) {
    const [a, c] = r;
    let f = 0, d = c ?? this.at(0);
    for (const p of this)
      f === 0 && r.length === 1 ? d = p : d = Reflect.apply(a, this, [d, p, f, this]), f++;
    return d;
  }
  reduceRight(...r) {
    const [a, c] = r;
    let f = c ?? this.at(-1);
    for (let d = this.size - 1; d >= 0; d--) {
      const p = this.at(d);
      d === this.size - 1 && r.length === 1 ? f = p : f = Reflect.apply(a, this, [f, p, d, this]);
    }
    return f;
  }
  toSorted(r) {
    const a = [...this.entries()].sort(r);
    return new wl(a);
  }
  toReversed() {
    const r = new wl();
    for (let a = this.size - 1; a >= 0; a--) {
      const c = this.keyAt(a), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const a = [...this.entries()];
    return a.splice(...r), new wl(a);
  }
  slice(r, a) {
    const c = new wl();
    let f = this.size - 1;
    if (r === void 0)
      return c;
    r < 0 && (r = r + this.size), a !== void 0 && a > 0 && (f = a - 1);
    for (let d = r; d <= f; d++) {
      const p = this.keyAt(d), g = this.get(p);
      c.set(p, g);
    }
    return c;
  }
  every(r, a) {
    let c = 0;
    for (const f of this) {
      if (!Reflect.apply(r, a, [f, c, this]))
        return !1;
      c++;
    }
    return !0;
  }
  some(r, a) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, a, [f, c, this]))
        return !0;
      c++;
    }
    return !1;
  }
}, bn = new WeakMap(), Mn(wl, "OrderedDict"), wl);
function Xc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = y0(n, o);
  return r === -1 ? void 0 : n[r];
}
Mn(Xc, "at");
function y0(n, o) {
  const r = n.length, a = qh(o), c = a >= 0 ? a : r + a;
  return c < 0 || c >= r ? -1 : c;
}
Mn(y0, "toSafeIndex");
function qh(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Mn(qh, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function JR(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ zi(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Ud(),
      setItemMap: /* @__PURE__ */ Mn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Mn(({ state: A, ...k }) => A ? /* @__PURE__ */ S.jsx(g, { ...k, state: A }) : /* @__PURE__ */ S.jsx(p, { ...k }), "CollectionProvider");
  d.displayName = o;
  const p = /* @__PURE__ */ Mn((A) => {
    const k = N();
    return /* @__PURE__ */ S.jsx(g, { ...A, state: k });
  }, "CollectionInit");
  p.displayName = o + "Init";
  const g = /* @__PURE__ */ Mn((A) => {
    const { scope: k, children: H, state: P } = A, G = b.useRef(null), [L, K] = b.useState(
      null
    ), te = Pn(G, K), [se, de] = P;
    return b.useEffect(() => {
      if (!L) return;
      const le = S0(() => {
      });
      return le.observe(L, {
        childList: !0,
        subtree: !0
      }), () => {
        le.disconnect();
      };
    }, [L]), /* @__PURE__ */ S.jsx(
      c,
      {
        scope: k,
        itemMap: se,
        setItemMap: de,
        collectionRef: te,
        collectionRefObject: G,
        collectionElement: L,
        children: H
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ ar(h), v = b.forwardRef(
    (A, k) => {
      const { scope: H, children: P } = A, G = f(h, H), L = Pn(k, G.collectionRef);
      return /* @__PURE__ */ S.jsx(y, { ref: L, children: P });
    }
  );
  v.displayName = h;
  const x = n + "CollectionItemSlot", C = "data-radix-collection-item", w = /* @__PURE__ */ ar(x), _ = b.forwardRef(
    (A, k) => {
      const { scope: H, children: P, ...G } = A, L = b.useRef(null), [K, te] = b.useState(null), se = Pn(k, L, te), de = f(x, H), { setItemMap: le } = de, pe = b.useRef(G);
      v0(pe.current, G) || (pe.current = G);
      const be = pe.current;
      return b.useEffect(() => {
        const V = be;
        return le((I) => K ? I.has(K) ? I.set(K, { ...V, element: K }).toSorted(xh) : (I.set(K, { ...V, element: K }), I.toSorted(xh)) : I), () => {
          le((I) => !K || !I.has(K) ? I : (I.delete(K), new Ud(I)));
        };
      }, [K, be, le]), /* @__PURE__ */ S.jsx(w, { [C]: "", ref: se, children: P });
    }
  );
  _.displayName = x;
  function N() {
    return b.useState(new Ud());
  }
  Mn(N, "useInitCollection");
  function T(A) {
    const { itemMap: k } = f(n + "CollectionConsumer", A);
    return k;
  }
  return Mn(T, "useCollection"), [
    { Provider: d, Slot: v, ItemSlot: _ },
    {
      createCollectionScope: a,
      useCollection: T,
      useInitCollection: N
    }
  ];
}
Mn(JR, "createCollection");
function v0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), a = Object.keys(o);
  if (r.length !== a.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Mn(v0, "shallowEqual");
function x0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Mn(x0, "isElementPreceding");
function xh(n, o) {
  return !n[1].element || !o[1].element ? 0 : x0(n[1].element, o[1].element) ? -1 : 1;
}
Mn(xh, "sortByDocumentPosition");
function S0(n) {
  return new MutationObserver((r) => {
    for (const a of r)
      if (a.type === "childList") {
        n();
        return;
      }
  });
}
Mn(S0, "getChildListObserver");
var WR = Object.defineProperty, ma = (n, o) => WR(n, "name", { value: o, configurable: !0 }), E0 = !!(typeof window < "u" && window.document && window.document.createElement);
function qn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ma(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
ma(qn, "composeEventHandlers");
function ew(n) {
  if (!E0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
ma(ew, "getOwnerWindow");
function Sh(n) {
  if (!E0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
ma(Sh, "getOwnerDocument");
function C0(n, o = !1) {
  const { activeElement: r } = Sh(n);
  if (!r?.nodeName)
    return null;
  if (R0(r) && r.contentDocument)
    return C0(r.contentDocument.body, o);
  if (o) {
    const a = r.getAttribute("aria-activedescendant");
    if (a) {
      const c = Sh(r).getElementById(a);
      if (c)
        return c;
    }
  }
  return r;
}
ma(C0, "getActiveElement");
function R0(n) {
  return n.tagName === "IFRAME";
}
ma(R0, "isFrame");
var _i = globalThis?.document ? b.useLayoutEffect : () => {
}, tw = Object.defineProperty, nw = (n, o) => tw(n, "name", { value: o, configurable: !0 }), Ny = pr[" useEffectEvent ".trim().toString()], ky = pr[" useInsertionEffect ".trim().toString()];
function w0(n) {
  if (typeof Ny == "function")
    return Ny(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof ky == "function" ? ky(() => {
    o.current = n;
  }) : _i(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
nw(w0, "useEffectEvent");
var lw = Object.defineProperty, xs = (n, o) => lw(n, "name", { value: o, configurable: !0 }), ow = pr[" useInsertionEffect ".trim().toString()] || _i;
function Jo({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ xs(() => {
  }, "onChange"),
  caller: a
}) {
  const [c, f, d] = _0({
    defaultProp: o,
    onChange: r
  }), p = n !== void 0, g = p ? n : c, h = b.useCallback(
    (y) => {
      if (p) {
        const v = A0(y) ? y(n) : y;
        v !== n && d.current?.(v);
      } else
        f(y);
    },
    [p, n, f, d]
  );
  return [g, h];
}
xs(Jo, "useControllableState");
function _0({
  defaultProp: n,
  onChange: o
}) {
  const [r, a] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return ow(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, a, f];
}
xs(_0, "useUncontrolledState");
function A0(n) {
  return typeof n == "function";
}
xs(A0, "isFunction");
var zy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function iw(n, o, r, a) {
  const { prop: c, defaultProp: f, onChange: d, caller: p } = o, g = c !== void 0, h = w0(d), y = [{ ...r, state: f }];
  a && y.push(a);
  const [v, x] = b.useReducer(
    (N, T) => {
      if (T.type === zy)
        return { ...N, state: T.state };
      const M = n(N, T);
      return g && !Object.is(M.state, N.state) && h(M.state), M;
    },
    ...y
  ), C = v.state, w = b.useRef(C);
  b.useEffect(() => {
    w.current !== C && (w.current = C, g || h(C));
  }, [C, w, g]);
  const _ = b.useMemo(() => c !== void 0 ? { ...v, state: c } : v, [v, c]);
  return b.useEffect(() => {
    g && !Object.is(c, v.state) && x({ type: zy, state: c });
  }, [c, v.state, g]), [_, x];
}
xs(iw, "useControllableStateReducer");
var rw = Object.defineProperty, $o = (n, o) => rw(n, "name", { value: o, configurable: !0 });
function M0(n, o) {
  return b.useReducer((r, a) => o[r][a] ?? r, n);
}
$o(M0, "useStateMachine");
var aw = /* @__PURE__ */ $o((n) => {
  const { present: o, children: r } = n, a = T0(o), c = typeof r == "function" ? r({ present: a.isPresent }) : b.Children.only(r), f = O0(a.ref, N0(c));
  return typeof r == "function" || a.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function T0(n) {
  const [o, r] = b.useState(), a = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), p = n ? "mounted" : "unmounted", [g, h] = M0(p, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return b.useEffect(() => {
    g === "mounted" ? (f.current = d.current ?? na(a.current), d.current = void 0) : f.current = "none";
  }, [g]), _i(() => {
    const y = a.current, v = c.current;
    if (v !== n) {
      const C = f.current, w = na(y);
      n ? (d.current = w, h("MOUNT")) : w === "none" || y?.display === "none" ? h("UNMOUNT") : h(v && C !== w ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), _i(() => {
    if (o) {
      let y;
      const v = o.ownerDocument.defaultView ?? window, x = /* @__PURE__ */ $o((w) => {
        const N = na(a.current).includes(CSS.escape(w.animationName));
        if (w.target === o && N && (h("ANIMATION_END"), !c.current)) {
          const T = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = v.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = T);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ $o((w) => {
        w.target === o && (f.current = na(a.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", C), o.addEventListener("animationcancel", x), o.addEventListener("animationend", x), () => {
        v.clearTimeout(y), o.removeEventListener("animationstart", C), o.removeEventListener("animationcancel", x), o.removeEventListener("animationend", x);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((y) => {
      if (y) {
        const v = getComputedStyle(y);
        a.current = v, d.current = na(v);
      } else
        a.current = null;
      r(y);
    }, [])
  };
}
$o(T0, "usePresence");
function Eh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
$o(Eh, "setRef");
function O0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const a = o.current;
    let c = !1;
    const f = a.map((d) => {
      const p = Eh(d, r);
      return !c && typeof p == "function" && (c = !0), p;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const p = f[d];
          typeof p == "function" ? p() : Eh(a[d], null);
        }
      };
  }, []);
}
$o(O0, "useStableComposedRefs");
function na(n) {
  return n?.animationName || "none";
}
$o(na, "getAnimationName");
function N0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
$o(N0, "getElementRef");
var sw = Object.defineProperty, cw = (n, o) => sw(n, "name", { value: o, configurable: !0 }), uw = pr[" useId ".trim().toString()] || (() => {
}), fw = 0;
function uu(n) {
  const [o, r] = b.useState(uw());
  return _i(() => {
    n || r((a) => a ?? String(fw++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
cw(uu, "useId");
var dw = Object.defineProperty, Ss = (n, o) => dw(n, "name", { value: o, configurable: !0 }), Ph = "Collapsible", [hw, k0] = /* @__PURE__ */ zi(Ph), [pw, Xh] = hw(Ph), mw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ss(function(o, r) {
    const {
      __scopeCollapsible: a,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: p,
      ...g
    } = o, [h, y] = Jo({
      prop: c,
      defaultProp: f ?? !1,
      onChange: p,
      caller: Ph
    });
    return /* @__PURE__ */ S.jsx(
      pw,
      {
        scope: a,
        disabled: d,
        contentId: uu(),
        open: h,
        onOpenToggle: b.useCallback(() => y((v) => !v), [y]),
        children: /* @__PURE__ */ S.jsx(
          jn.div,
          {
            "data-state": fu(h),
            "data-disabled": d ? "" : void 0,
            ...g,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), gw = "CollapsibleTrigger", z0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ss(function(o, r) {
    const { __scopeCollapsible: a, ...c } = o, f = Xh(gw, a);
    return /* @__PURE__ */ S.jsx(
      jn.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": fu(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: qn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), D0 = "CollapsibleContent", j0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ss(function(o, r) {
    const { forceMount: a, ...c } = o, f = Xh(D0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(aw, { present: a || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(bw, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), bw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ss(function(o, r) {
  const { __scopeCollapsible: a, present: c, children: f, ...d } = o, p = Xh(D0, a), [g, h] = b.useState(c), y = b.useRef(null), v = Pn(r, y), x = b.useRef(0), C = x.current, w = b.useRef(0), _ = w.current, N = p.open || g, T = b.useRef(N), M = b.useRef(void 0);
  return b.useEffect(() => {
    const A = requestAnimationFrame(() => T.current = !1);
    return () => cancelAnimationFrame(A);
  }, []), _i(() => {
    const A = y.current;
    if (A) {
      M.current = M.current || {
        transitionDuration: A.style.transitionDuration,
        animationName: A.style.animationName
      }, A.style.transitionDuration = "0s", A.style.animationName = "none";
      const k = A.getBoundingClientRect();
      x.current = k.height, w.current = k.width, T.current || (A.style.transitionDuration = M.current.transitionDuration, A.style.animationName = M.current.animationName), h(c);
    }
  }, [p.open, c]), /* @__PURE__ */ S.jsx(
    jn.div,
    {
      "data-state": fu(p.open),
      "data-disabled": p.disabled ? "" : void 0,
      id: p.contentId,
      hidden: !N,
      ...d,
      ref: v,
      style: {
        "--radix-collapsible-content-height": C ? `${C}px` : void 0,
        "--radix-collapsible-content-width": _ ? `${_}px` : void 0,
        ...o.style
      },
      children: N && f
    }
  );
}, "CollapsibleContentImpl"));
function fu(n) {
  return n ? "open" : "closed";
}
Ss(fu, "getState");
var L0 = mw, yw = z0, vw = j0, xw = Object.defineProperty, Sw = (n, o) => xw(n, "name", { value: o, configurable: !0 }), Ew = b.createContext(void 0);
function Es(n) {
  const o = b.useContext(Ew);
  return n || o || "ltr";
}
Sw(Es, "useDirection");
var Cw = Object.defineProperty, Al = (n, o) => Cw(n, "name", { value: o, configurable: !0 }), So = "Accordion", Rw = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Kh, ww, _w] = /* @__PURE__ */ cu(So), [du, UN] = /* @__PURE__ */ zi(So, [
  _w,
  k0
]), Fh = k0(), Aw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Al(function(o, r) {
    const { type: a, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(Kh.Provider, { scope: o.__scopeAccordion, children: a === "multiple" ? /* @__PURE__ */ S.jsx(Nw, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(Ow, { ...f, ref: r }) });
  }, "Accordion")
), [V0, Mw] = du(So), [I0, Tw] = du(
  So,
  { collapsible: !1 }
), Ow = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Al(function(o, r) {
    const {
      value: a,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Al(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...p
    } = o, [g, h] = Jo({
      prop: a,
      defaultProp: c ?? "",
      onChange: f,
      caller: So
    });
    return /* @__PURE__ */ S.jsx(
      V0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ S.jsx(I0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(H0, { ...p, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), Nw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Al(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Al(() => {
    }, "onValueChange"),
    ...d
  } = o, [p, g] = Jo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: So
  }), h = b.useCallback(
    (v) => g((x = []) => [...x, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((x = []) => x.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    V0,
    {
      scope: o.__scopeAccordion,
      value: p,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ S.jsx(I0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(H0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [kw, hu] = du(So), H0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Al(function(o, r) {
    const { __scopeAccordion: a, disabled: c, dir: f, orientation: d = "vertical", ...p } = o, g = b.useRef(null), h = Pn(g, r), y = ww(a), x = Es(f) === "ltr", C = qn(o.onKeyDown, (w) => {
      if (!Rw.includes(w.key)) return;
      const _ = w.target, N = y().filter((K) => !K.ref.current?.disabled), T = N.findIndex((K) => K.ref.current === _), M = N.length;
      if (T === -1) return;
      w.preventDefault();
      let A = T;
      const k = 0, H = M - 1, P = /* @__PURE__ */ Al(() => {
        A = T + 1, A > H && (A = k);
      }, "moveNext"), G = /* @__PURE__ */ Al(() => {
        A = T - 1, A < k && (A = H);
      }, "movePrev");
      switch (w.key) {
        case "Home":
          A = k;
          break;
        case "End":
          A = H;
          break;
        case "ArrowRight":
          d === "horizontal" && (x ? P() : G());
          break;
        case "ArrowDown":
          d === "vertical" && P();
          break;
        case "ArrowLeft":
          d === "horizontal" && (x ? G() : P());
          break;
        case "ArrowUp":
          d === "vertical" && G();
          break;
      }
      const L = A % M;
      N[L].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      kw,
      {
        scope: a,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(Kh.Slot, { scope: a, children: /* @__PURE__ */ S.jsx(
          jn.div,
          {
            ...p,
            "data-orientation": d,
            ref: h,
            onKeyDown: c ? void 0 : C
          }
        ) })
      }
    );
  }, "AccordionImpl")
), Ch = "AccordionItem", [zw, Qh] = du(Ch), Dw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Al(function(o, r) {
    const { __scopeAccordion: a, value: c, ...f } = o, d = hu(Ch, a), p = Mw(Ch, a), g = Fh(a), h = uu(), y = c && p.value.includes(c) || !1, v = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      zw,
      {
        scope: a,
        open: y,
        disabled: v,
        triggerId: h,
        children: /* @__PURE__ */ S.jsx(
          L0,
          {
            "data-orientation": d.orientation,
            "data-state": Zh(y),
            ...g,
            ...f,
            ref: r,
            disabled: v,
            open: y,
            onOpenChange: (x) => {
              x ? p.onItemOpen(c) : p.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), jw = "AccordionHeader", Lw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Al(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = hu(So, a), d = Qh(jw, a);
    return /* @__PURE__ */ S.jsx(
      jn.h3,
      {
        "data-orientation": f.orientation,
        "data-state": Zh(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Dy = "AccordionTrigger", Vw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Al(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = hu(So, a), d = Qh(Dy, a), p = Tw(Dy, a), g = Fh(a);
    return /* @__PURE__ */ S.jsx(Kh.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
      yw,
      {
        "aria-disabled": d.open && !p.collapsible || void 0,
        "data-orientation": f.orientation,
        id: d.triggerId,
        ...g,
        ...c,
        ref: r
      }
    ) });
  }, "AccordionTrigger")
), Iw = "AccordionContent", Hw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Al(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = hu(So, a), d = Qh(Iw, a), p = Fh(a);
    return /* @__PURE__ */ S.jsx(
      vw,
      {
        role: "region",
        "aria-labelledby": d.triggerId,
        "data-orientation": f.orientation,
        ...p,
        ...c,
        ref: r,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...o.style
        }
      }
    );
  }, "AccordionContent")
);
function Zh(n) {
  return n ? "open" : "closed";
}
Al(Zh, "getState");
var Uw = Aw, Bw = Dw, Gw = Lw, Yw = Vw, qw = Hw, Pw = Object.defineProperty, Xw = (n, o) => Pw(n, "name", { value: o, configurable: !0 });
function U0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
Xw(U0, "useCallbackRef");
var Kw = Object.defineProperty, Fw = (n, o) => Kw(n, "name", { value: o, configurable: !0 });
function B0(n) {
  const [o, r] = b.useState(void 0);
  return _i(() => {
    if (n) {
      r({ width: n.offsetWidth, height: n.offsetHeight });
      const a = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const f = c[0];
        let d, p;
        if ("borderBoxSize" in f) {
          const g = f.borderBoxSize, h = Array.isArray(g) ? g[0] : g;
          d = h.inlineSize, p = h.blockSize;
        } else
          d = n.offsetWidth, p = n.offsetHeight;
        r({ width: d, height: p });
      });
      return a.observe(n, { box: "border-box" }), () => a.unobserve(n);
    } else
      r(void 0);
  }, [n]), o;
}
Fw(B0, "useSize");
const fa = Math.min, Qo = Math.max, Jc = Math.round, lr = Math.floor, Zo = (n) => ({
  x: n,
  y: n
}), Qw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function G0(n, o, r) {
  return Qo(n, fa(o, r));
}
function Ai(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Ql(n) {
  return n.split("-")[0];
}
function Di(n) {
  return n.split("-")[1];
}
function $h(n) {
  return n === "x" ? "y" : "x";
}
function Jh(n) {
  return n === "y" ? "height" : "width";
}
function Fl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function Wh(n) {
  return $h(Fl(n));
}
function Zw(n, o, r) {
  r === void 0 && (r = !1);
  const a = Di(n), c = Wh(n), f = Jh(c);
  let d = c === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = Wc(d)), [d, Wc(d)];
}
function $w(n) {
  const o = Wc(n);
  return [Rh(n), o, Rh(o)];
}
function Rh(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const jy = ["left", "right"], Ly = ["right", "left"], Jw = ["top", "bottom"], Ww = ["bottom", "top"];
function e_(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? Ly : jy : o ? jy : Ly;
    case "left":
    case "right":
      return o ? Jw : Ww;
    default:
      return [];
  }
}
function t_(n, o, r, a) {
  const c = Di(n);
  let f = e_(Ql(n), r === "start", a);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Rh)))), f;
}
function Wc(n) {
  const o = Ql(n);
  return Qw[o] + n.slice(o.length);
}
function n_(n) {
  var o, r, a, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (a = n.bottom) != null ? a : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function Y0(n) {
  return typeof n != "number" ? n_(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function eu(n) {
  const {
    x: o,
    y: r,
    width: a,
    height: c
  } = n;
  return {
    width: a,
    height: c,
    top: r,
    left: o,
    right: o + a,
    bottom: r + c,
    x: o,
    y: r
  };
}
function Vy(n, o, r) {
  let {
    reference: a,
    floating: c
  } = n;
  const f = Fl(o), d = Wh(o), p = Jh(d), g = Ql(o), h = f === "y", y = a.x + a.width / 2 - c.width / 2, v = a.y + a.height / 2 - c.height / 2, x = a[p] / 2 - c[p] / 2;
  let C;
  switch (g) {
    case "top":
      C = {
        x: y,
        y: a.y - c.height
      };
      break;
    case "bottom":
      C = {
        x: y,
        y: a.y + a.height
      };
      break;
    case "right":
      C = {
        x: a.x + a.width,
        y: v
      };
      break;
    case "left":
      C = {
        x: a.x - c.width,
        y: v
      };
      break;
    default:
      C = {
        x: a.x,
        y: a.y
      };
  }
  const w = Di(o);
  return w && (C[d] += x * (w === "end" ? 1 : -1) * (r && h ? -1 : 1)), C;
}
async function l_(n, o) {
  var r;
  o === void 0 && (o = {});
  const {
    x: a,
    y: c,
    platform: f,
    rects: d,
    elements: p,
    strategy: g
  } = n, {
    boundary: h = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: v = "floating",
    altBoundary: x = !1,
    padding: C = 0
  } = Ai(o, n), w = Y0(C), N = p[x ? v === "floating" ? "reference" : "floating" : v], T = eu(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(N))) == null || r ? N : N.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(p.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: g
  })), M = v === "floating" ? {
    x: a,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, A = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(p.floating)), k = await (f.isElement == null ? void 0 : f.isElement(A)) && await (f.getScale == null ? void 0 : f.getScale(A)) || {
    x: 1,
    y: 1
  }, H = eu(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: p,
    rect: M,
    offsetParent: A,
    strategy: g
  }) : M);
  return {
    top: (T.top - H.top + w.top) / k.y,
    bottom: (H.bottom - T.bottom + w.bottom) / k.y,
    left: (T.left - H.left + w.left) / k.x,
    right: (H.right - T.right + w.right) / k.x
  };
}
const o_ = 50, i_ = async (n, o, r) => {
  const {
    placement: a = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, p = d.detectOverflow ? d : {
    ...d,
    detectOverflow: l_
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: v
  } = Vy(h, a, g), x = a, C = 0;
  const w = {};
  for (let _ = 0; _ < f.length; _++) {
    const N = f[_];
    if (!N)
      continue;
    const {
      name: T,
      fn: M
    } = N, {
      x: A,
      y: k,
      data: H,
      reset: P
    } = await M({
      x: y,
      y: v,
      initialPlacement: a,
      placement: x,
      strategy: c,
      middlewareData: w,
      rects: h,
      platform: p,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = A ?? y, v = k ?? v, w[T] = {
      ...w[T],
      ...H
    }, P && C < o_ && (C++, typeof P == "object" && (P.placement && (x = P.placement), P.rects && (h = P.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : P.rects), {
      x: y,
      y: v
    } = Vy(h, x, g)), _ = -1);
  }
  return {
    x: y,
    y: v,
    placement: x,
    strategy: c,
    middlewareData: w
  };
}, r_ = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(o) {
      var r, a;
      const {
        placement: c,
        middlewareData: f,
        rects: d,
        initialPlacement: p,
        platform: g,
        elements: h
      } = o, {
        mainAxis: y = !0,
        crossAxis: v = !0,
        fallbackPlacements: x,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: _ = !0,
        ...N
      } = Ai(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const T = Ql(c), M = Fl(p), A = Ql(p) === p, k = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), H = x || (A || !_ ? [Wc(p)] : $w(p)), P = w !== "none";
      !x && P && H.push(...t_(p, _, w, k));
      const G = [p, ...H], L = await g.detectOverflow(o, N), K = [];
      let te = ((a = f.flip) == null ? void 0 : a.overflows) || [];
      if (y && K.push(L[T]), v) {
        const pe = Zw(c, d, k);
        K.push(L[pe[0]], L[pe[1]]);
      }
      if (te = [...te, {
        placement: c,
        overflows: K
      }], !K.every((pe) => pe <= 0)) {
        var se, de;
        const pe = (((se = f.flip) == null ? void 0 : se.index) || 0) + 1, be = G[pe];
        if (be && (!(v === "alignment" ? M !== Fl(be) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        te.every((Q) => Fl(Q.placement) === M ? Q.overflows[0] > 0 : !0)))
          return {
            data: {
              index: pe,
              overflows: te
            },
            reset: {
              placement: be
            }
          };
        let V = (de = te.filter((I) => I.overflows[0] <= 0).sort((I, Q) => I.overflows[1] - Q.overflows[1])[0]) == null ? void 0 : de.placement;
        if (!V)
          switch (C) {
            case "bestFit": {
              var le;
              const I = (le = te.filter((Q) => {
                if (P) {
                  const xe = Fl(Q.placement);
                  return xe === M || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  xe === "y";
                }
                return !0;
              }).map((Q) => [Q.placement, Q.overflows.filter((xe) => xe > 0).reduce((xe, ae) => xe + ae, 0)]).sort((Q, xe) => Q[1] - xe[1])[0]) == null ? void 0 : le[0];
              I && (V = I);
              break;
            }
            case "initialPlacement":
              V = p;
              break;
          }
        if (c !== V)
          return {
            reset: {
              placement: V
            }
          };
      }
      return {};
    }
  };
}, q0 = /* @__PURE__ */ new Set(["left", "top"]);
async function a_(n, o) {
  const {
    placement: r,
    platform: a,
    elements: c
  } = n, f = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = Ql(r), p = Di(r), g = Fl(r) === "y", h = q0.has(d) ? -1 : 1, y = f && g ? -1 : 1, v = Ai(o, n);
  let {
    mainAxis: x,
    crossAxis: C,
    alignmentAxis: w
  } = typeof v == "number" ? {
    mainAxis: v,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: v.mainAxis || 0,
    crossAxis: v.crossAxis || 0,
    alignmentAxis: v.alignmentAxis
  };
  return p && typeof w == "number" && (C = p === "end" ? w * -1 : w), g ? {
    x: C * y,
    y: x * h
  } : {
    x: x * h,
    y: C * y
  };
}
const s_ = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        middlewareData: p
      } = o, g = await a_(o, n);
      return d === ((r = p.offset) == null ? void 0 : r.placement) && (a = p.arrow) != null && a.alignmentOffset ? {} : {
        x: c + g.x,
        y: f + g.y,
        data: {
          ...g,
          placement: d
        }
      };
    }
  };
}, c_ = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(o) {
      const {
        x: r,
        y: a,
        placement: c,
        platform: f
      } = o, {
        mainAxis: d = !0,
        crossAxis: p = !1,
        limiter: g = {
          fn: (M) => {
            let {
              x: A,
              y: k
            } = M;
            return {
              x: A,
              y: k
            };
          }
        },
        ...h
      } = Ai(n, o), y = {
        x: r,
        y: a
      }, v = await f.detectOverflow(o, h), x = Fl(c), C = $h(x);
      let w = y[C], _ = y[x];
      const N = (M, A) => G0(A + v[M === "y" ? "top" : "left"], A, A - v[M === "y" ? "bottom" : "right"]);
      d && (w = N(C, w)), p && (_ = N(x, _));
      const T = g.fn({
        ...o,
        [C]: w,
        [x]: _
      });
      return {
        ...T,
        data: {
          x: T.x - r,
          y: T.y - a,
          enabled: {
            [C]: d,
            [x]: p
          }
        }
      };
    }
  };
}, u_ = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        rects: p,
        middlewareData: g
      } = o, {
        offset: h = 0,
        mainAxis: y = !0,
        crossAxis: v = !0
      } = Ai(n, o), x = {
        x: c,
        y: f
      }, C = Fl(d), w = $h(C);
      let _ = x[w], N = x[C];
      const T = Ai(h, o), M = typeof T == "number" ? {
        mainAxis: T,
        crossAxis: 0
      } : {
        mainAxis: (r = T.mainAxis) != null ? r : 0,
        crossAxis: (a = T.crossAxis) != null ? a : 0
      };
      if (y) {
        const H = w === "y" ? "height" : "width", P = p.reference[w] - p.floating[H] + M.mainAxis, G = p.reference[w] + p.reference[H] - M.mainAxis;
        _ < P ? _ = P : _ > G && (_ = G);
      }
      if (v) {
        var A, k;
        const H = w === "y" ? "width" : "height", P = q0.has(Ql(d)), G = p.reference[C] - p.floating[H] + (P && ((A = g.offset) == null ? void 0 : A[C]) || 0) + (P ? 0 : M.crossAxis), L = p.reference[C] + p.reference[H] + (P ? 0 : ((k = g.offset) == null ? void 0 : k[C]) || 0) - (P ? M.crossAxis : 0);
        N < G ? N = G : N > L && (N = L);
      }
      return {
        [w]: _,
        [C]: N
      };
    }
  };
}, f_ = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(o) {
      const {
        placement: r,
        rects: a,
        platform: c,
        elements: f
      } = o, {
        apply: d = () => {
        },
        ...p
      } = Ai(n, o), g = await c.detectOverflow(o, p), h = Ql(r), y = Di(r), v = Fl(r) === "y", {
        width: x,
        height: C
      } = a.floating;
      let w, _;
      h === "top" || h === "bottom" ? (w = h, _ = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (_ = h, w = y === "end" ? "top" : "bottom");
      const N = C - g.top - g.bottom, T = x - g.left - g.right, M = fa(C - g[w], N), A = fa(x - g[_], T), k = o.middlewareData.shift, H = !k;
      let P = M, G = A;
      k != null && k.enabled.x && (G = T), k != null && k.enabled.y && (P = N), H && !y && (v ? G = x - 2 * Qo(g.left, g.right) : P = C - 2 * Qo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: G,
        availableHeight: P
      });
      const L = await c.getDimensions(f.floating);
      return x !== L.width || C !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function pu() {
  return typeof window < "u";
}
function Ln(n) {
  return ep(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function un(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Wo(n) {
  var o;
  return (o = (ep(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function ep(n) {
  return pu() ? n instanceof Node || n instanceof un(n).Node : !1;
}
function cn(n) {
  return pu() ? n instanceof Element || n instanceof un(n).Element : !1;
}
function Kt(n) {
  return pu() ? n instanceof HTMLElement || n instanceof un(n).HTMLElement : !1;
}
function da(n) {
  return !pu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof un(n).ShadowRoot;
}
function Cs(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: a,
    display: c
  } = hl(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + a + r) && c !== "inline" && c !== "contents";
}
function d_(n) {
  return /^(table|td|th)$/.test(Ln(n));
}
function mu(n) {
  try {
    if (n.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return n.matches(":modal");
  } catch {
    return !1;
  }
}
const h_ = /transform|translate|scale|rotate|perspective|filter/, p_ = /paint|layout|strict|content/, tr = (n) => !!n && n !== "none";
let Bd;
function tp(n) {
  const o = cn(n) ? hl(n) : n;
  return tr(o.transform) || tr(o.translate) || tr(o.scale) || tr(o.rotate) || tr(o.perspective) || !np() && (tr(o.backdropFilter) || tr(o.filter)) || h_.test(o.willChange || "") || p_.test(o.contain || "");
}
function m_(n) {
  let o = Mi(n);
  for (; Kt(o) && !wi(o); ) {
    if (tp(o))
      return o;
    if (mu(o))
      return null;
    o = Mi(o);
  }
  return null;
}
function np() {
  return Bd == null && (Bd = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Bd;
}
function wi(n) {
  return /^(html|body|#document)$/.test(Ln(n));
}
function hl(n) {
  return un(n).getComputedStyle(n);
}
function gu(n) {
  return cn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Mi(n) {
  if (Ln(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    da(n) && n.host || // Fallback.
    Wo(n)
  );
  return da(o) ? o.host : o;
}
function P0(n) {
  const o = Mi(n);
  return wi(o) ? (n.ownerDocument || n).body : Kt(o) && Cs(o) ? o : P0(o);
}
function ha(n, o, r) {
  var a;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = P0(n), f = c === ((a = n.ownerDocument) == null ? void 0 : a.body), d = un(c);
  if (f) {
    const p = wh(d);
    return o.concat(d, d.visualViewport || [], Cs(c) ? c : [], p && r ? ha(p) : []);
  } else
    return o.concat(c, ha(c, [], r));
}
function wh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function X0(n) {
  const o = hl(n);
  let r = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : a, p = Jc(r) !== f || Jc(a) !== d;
  return p && (r = f, a = d), {
    width: r,
    height: a,
    $: p
  };
}
function lp(n) {
  return cn(n) ? n : n.contextElement;
}
function sa(n) {
  const o = lp(n);
  if (!Kt(o))
    return Zo(1);
  const r = o.getBoundingClientRect(), {
    width: a,
    height: c,
    $: f
  } = X0(o);
  let d = (f ? Jc(r.width) : r.width) / a, p = (f ? Jc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!p || !Number.isFinite(p)) && (p = 1), {
    x: d,
    y: p
  };
}
const g_ = /* @__PURE__ */ Zo(0);
function K0(n) {
  const o = un(n);
  return !np() || !o.visualViewport ? g_ : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function b_(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === un(n);
}
function sr(n, o, r, a) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = lp(n);
  let d = Zo(1);
  o && (a ? cn(a) && (d = sa(a)) : d = sa(n));
  const p = b_(f, r, a) ? K0(f) : Zo(0);
  let g = (c.left + p.x) / d.x, h = (c.top + p.y) / d.y, y = c.width / d.x, v = c.height / d.y;
  if (f && a) {
    const x = un(f), C = cn(a) ? un(a) : a;
    let w = x, _ = wh(w);
    for (; _ && C !== w; ) {
      const N = sa(_), T = _.getBoundingClientRect(), M = hl(_), A = T.left + (_.clientLeft + parseFloat(M.paddingLeft)) * N.x, k = T.top + (_.clientTop + parseFloat(M.paddingTop)) * N.y;
      g *= N.x, h *= N.y, y *= N.x, v *= N.y, g += A, h += k, w = un(_), _ = wh(w);
    }
  }
  return eu({
    width: y,
    height: v,
    x: g,
    y: h
  });
}
function bu(n, o) {
  const r = gu(n).scrollLeft;
  return o ? o.left + r : sr(Wo(n)).left + r;
}
function F0(n, o) {
  const r = n.getBoundingClientRect(), a = r.left + o.scrollLeft - bu(n, r), c = r.top + o.scrollTop;
  return {
    x: a,
    y: c
  };
}
function y_(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: a,
    strategy: c
  } = n;
  const f = c === "fixed", d = Wo(a), p = o ? mu(o.floating) : !1;
  if (a === d || p && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Zo(1);
  const y = Zo(0), v = Kt(a);
  if ((v || !f) && ((Ln(a) !== "body" || Cs(d)) && (g = gu(a)), v)) {
    const C = sr(a);
    h = sa(a), y.x = C.x + a.clientLeft, y.y = C.y + a.clientTop;
  }
  const x = d && !v && !f ? F0(d, g) : Zo(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + y.x + x.x,
    y: r.y * h.y - g.scrollTop * h.y + y.y + x.y
  };
}
function v_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function x_(n) {
  const o = gu(n), r = n.ownerDocument.body, a = Qo(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = Qo(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + bu(n);
  const d = -o.scrollTop;
  return hl(r).direction === "rtl" && (f += Qo(n.clientWidth, r.clientWidth) - a), {
    width: a,
    height: c,
    x: f,
    y: d
  };
}
const S_ = 25;
function E_(n, o, r) {
  r === void 0 && (r = "viewport");
  const a = r === "layoutViewport", c = un(n), f = Wo(n), d = c.visualViewport;
  let p = f.clientWidth, g = f.clientHeight, h = 0, y = 0;
  if (d) {
    const x = !np() || o === "fixed";
    a ? x || (h = -d.offsetLeft, y = -d.offsetTop) : (p = d.width, g = d.height, x && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (bu(f) <= 0) {
    const x = f.ownerDocument, C = x.body, w = getComputedStyle(C), _ = x.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, N = Math.abs(f.clientWidth - C.clientWidth - _), T = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? N / 2 : N;
    T <= S_ && (p -= T);
  }
  return {
    width: p,
    height: g,
    x: h,
    y
  };
}
function C_(n, o) {
  const r = sr(n, !0, o === "fixed"), a = r.top + n.clientTop, c = r.left + n.clientLeft, f = sa(n), d = n.clientWidth * f.x, p = n.clientHeight * f.y, g = c * f.x, h = a * f.y;
  return {
    width: d,
    height: p,
    x: g,
    y: h
  };
}
function Iy(n, o, r) {
  let a;
  if (o === "viewport" || o === "layoutViewport")
    a = E_(n, r, o);
  else if (o === "document")
    a = x_(Wo(n));
  else if (cn(o))
    a = C_(o, r);
  else {
    const c = K0(n);
    a = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return eu(a);
}
function R_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let a = ha(n, [], !1).filter((p) => cn(p) && Ln(p) !== "body"), c = null;
  const f = hl(n).position === "fixed";
  let d = f ? Mi(n) : n;
  for (; cn(d) && !wi(d); ) {
    const p = hl(d), g = tp(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && p.position === "static") ? a = a.filter((v) => v !== d) : c = p, d = Mi(d);
  }
  return o.set(n, a), a;
}
function w_(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: a,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? mu(o) ? [] : R_(o, this._c) : [].concat(r), a], p = Iy(o, d[0], c);
  let g = p.top, h = p.right, y = p.bottom, v = p.left;
  for (let x = 1; x < d.length; x++) {
    const C = Iy(o, d[x], c);
    g = Qo(C.top, g), h = fa(C.right, h), y = fa(C.bottom, y), v = Qo(C.left, v);
  }
  return {
    width: h - v,
    height: y - g,
    x: v,
    y: g
  };
}
function __(n) {
  const {
    width: o,
    height: r
  } = X0(n);
  return {
    width: o,
    height: r
  };
}
function A_(n, o, r) {
  const a = Kt(o), c = Wo(o), f = r === "fixed", d = sr(n, !0, f, o);
  let p = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Zo(0);
  if ((a || !f) && ((Ln(o) !== "body" || Cs(c)) && (p = gu(o)), a)) {
    const x = sr(o, !0, f, o);
    g.x = x.x + o.clientLeft, g.y = x.y + o.clientTop;
  }
  !a && c && (g.x = bu(c));
  const h = c && !a && !f ? F0(c, p) : Zo(0), y = d.left + p.scrollLeft - g.x - h.x, v = d.top + p.scrollTop - g.y - h.y;
  return {
    x: y,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Gd(n) {
  return hl(n).position === "static";
}
function Hy(n, o) {
  if (!Kt(n) || hl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Wo(n) === r && (r = r.ownerDocument.body), r;
}
function Q0(n, o) {
  const r = un(n);
  if (mu(n))
    return r;
  if (!Kt(n)) {
    let c = Mi(n);
    for (; c && !wi(c); ) {
      if (cn(c) && !Gd(c))
        return c;
      c = Mi(c);
    }
    return r;
  }
  let a = Hy(n, o);
  for (; a && d_(a) && Gd(a); )
    a = Hy(a, o);
  return a && wi(a) && Gd(a) && !tp(a) ? r : a || m_(n) || r;
}
const M_ = async function(n) {
  const o = this.getOffsetParent || Q0, r = this.getDimensions, a = await r(n.floating);
  return {
    reference: A_(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  };
};
function T_(n) {
  return hl(n).direction === "rtl";
}
const O_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: y_,
  getDocumentElement: Wo,
  getClippingRect: w_,
  getOffsetParent: Q0,
  getElementRects: M_,
  getClientRects: v_,
  getDimensions: __,
  getScale: sa,
  isElement: cn,
  isRTL: T_
};
function Z0(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function N_(n, o, r) {
  let a = null, c;
  const f = Wo(n);
  function d() {
    var y;
    clearTimeout(c), (y = a) == null || y.disconnect(), a = null;
  }
  function p(y, v) {
    y === void 0 && (y = !1), v === void 0 && (v = 1), d();
    const x = n.getBoundingClientRect(), {
      left: C,
      top: w,
      width: _,
      height: N
    } = x;
    if (y || o(), !_ || !N)
      return;
    const T = lr(w), M = lr(f.clientWidth - (C + _)), A = lr(f.clientHeight - (w + N)), k = lr(C), P = {
      rootMargin: -T + "px " + -M + "px " + -A + "px " + -k + "px",
      threshold: Qo(0, fa(1, v)) || 1
    };
    let G = !0;
    function L(K) {
      const te = K[0].intersectionRatio;
      if (!Z0(x, n.getBoundingClientRect()))
        return p();
      if (te !== v) {
        if (!G)
          return p();
        te ? p(!1, te) : c = setTimeout(() => {
          p(!1, 1e-7);
        }, 1e3);
      }
      G = !1;
    }
    try {
      a = new IntersectionObserver(L, {
        ...P,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(L, P);
    }
    a.observe(n);
  }
  const g = un(n), h = () => p(r);
  return g.addEventListener("resize", h), p(!0), () => {
    g.removeEventListener("resize", h), d();
  };
}
function Uy(n, o, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: p = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = a, h = lp(n), y = c || f ? [...h ? ha(h) : [], ...o ? ha(o) : []] : [];
  y.forEach((T) => {
    c && T.addEventListener("scroll", r), f && T.addEventListener("resize", r);
  });
  const v = h && p ? N_(h, r, f) : null;
  let x = -1, C = null;
  d && (C = new ResizeObserver((T) => {
    let [M] = T;
    M && M.target === h && C && o && (C.unobserve(o), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
      var A;
      (A = C) == null || A.observe(o);
    })), r();
  }), h && !g && C.observe(h), o && C.observe(o));
  let w, _ = g ? sr(n) : null;
  g && N();
  function N() {
    const T = sr(n);
    _ && !Z0(_, T) && r(), _ = T, w = requestAnimationFrame(N);
  }
  return r(), () => {
    var T;
    y.forEach((M) => {
      c && M.removeEventListener("scroll", r), f && M.removeEventListener("resize", r);
    }), v?.(), (T = C) == null || T.disconnect(), C = null, g && cancelAnimationFrame(w);
  };
}
const k_ = s_, z_ = c_, D_ = r_, j_ = f_, L_ = u_, V_ = (n, o, r) => {
  const a = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...O_,
    ...c.platform,
    _c: a
  };
  return i_(n, o, {
    ...c,
    platform: f
  });
};
var I_ = typeof document < "u", H_ = function() {
}, Kc = I_ ? b.useLayoutEffect : H_;
function tu(n, o) {
  if (n === o)
    return !0;
  if (typeof n != typeof o)
    return !1;
  if (typeof n == "function" && n.toString() === o.toString())
    return !0;
  let r, a, c;
  if (n && o && typeof n == "object") {
    if (Array.isArray(n)) {
      if (r = n.length, r !== o.length) return !1;
      for (a = r; a-- !== 0; )
        if (!tu(n[a], o[a]))
          return !1;
      return !0;
    }
    if (c = Object.keys(n), r = c.length, r !== Object.keys(o).length)
      return !1;
    for (a = r; a-- !== 0; )
      if (!{}.hasOwnProperty.call(o, c[a]))
        return !1;
    for (a = r; a-- !== 0; ) {
      const f = c[a];
      if (!(f === "_owner" && n.$$typeof) && !tu(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function $0(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function By(n, o) {
  const r = $0(n);
  return Math.round(o * r) / r;
}
function Yd(n) {
  const o = b.useRef(n);
  return Kc(() => {
    o.current = n;
  }), o;
}
function U_(n) {
  n === void 0 && (n = {});
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: a = [],
    platform: c,
    elements: {
      reference: f,
      floating: d
    } = {},
    transform: p = !0,
    whileElementsMounted: g,
    open: h
  } = n, [y, v] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [x, C] = b.useState(a);
  tu(x, a) || C(a);
  const [w, _] = b.useState(null), [N, T] = b.useState(null), M = b.useCallback((Q) => {
    Q !== P.current && (P.current = Q, _(Q));
  }, []), A = b.useCallback((Q) => {
    Q !== G.current && (G.current = Q, T(Q));
  }, []), k = f || w, H = d || N, P = b.useRef(null), G = b.useRef(null), L = b.useRef(y), K = g != null, te = Yd(g), se = Yd(c), de = Yd(h), le = b.useCallback(() => {
    if (!P.current || !G.current)
      return;
    const Q = {
      placement: o,
      strategy: r,
      middleware: x
    };
    se.current && (Q.platform = se.current), V_(P.current, G.current, Q).then((xe) => {
      const ae = {
        ...xe,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: de.current !== !1
      };
      pe.current && !tu(L.current, ae) && (L.current = ae, pa.flushSync(() => {
        v(ae);
      }));
    });
  }, [x, o, r, se, de]);
  Kc(() => {
    h === !1 && L.current.isPositioned && (L.current.isPositioned = !1, v((Q) => ({
      ...Q,
      isPositioned: !1
    })));
  }, [h]);
  const pe = b.useRef(!1);
  Kc(() => (pe.current = !0, () => {
    pe.current = !1;
  }), []), Kc(() => {
    if (k && (P.current = k), H && (G.current = H), k && H) {
      if (te.current)
        return te.current(k, H, le);
      le();
    }
  }, [k, H, le, te, K]);
  const be = b.useMemo(() => ({
    reference: P,
    floating: G,
    setReference: M,
    setFloating: A
  }), [M, A]), V = b.useMemo(() => ({
    reference: k,
    floating: H
  }), [k, H]), I = b.useMemo(() => {
    const Q = {
      position: r,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return Q;
    const xe = By(V.floating, y.x), ae = By(V.floating, y.y);
    return p ? {
      ...Q,
      transform: "translate(" + xe + "px, " + ae + "px)",
      ...$0(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: xe,
      top: ae
    };
  }, [r, p, V.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: le,
    refs: be,
    elements: V,
    floatingStyles: I
  }), [y, le, be, V, I]);
}
const B_ = (n, o) => {
  const r = k_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, G_ = (n, o) => {
  const r = z_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, Y_ = (n, o) => ({
  fn: L_(n).fn,
  options: [n, o]
}), q_ = (n, o) => {
  const r = D_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, P_ = (n, o) => {
  const r = j_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var X_ = Object.defineProperty, op = (n, o) => X_(n, "name", { value: o, configurable: !0 }), qd = !1;
function J0() {
  const [n, o] = b.useState(qd);
  return b.useEffect(() => {
    qd || (qd = !0, o(!0));
  }, []), n;
}
op(J0, "useIsHydrated");
var W0 = pr[" useSyncExternalStore ".trim().toString()];
function ex() {
  return () => {
  };
}
op(ex, "subscribe");
function tx() {
  return W0(
    ex,
    () => !0,
    () => !1
  );
}
op(tx, "useIsHydratedModern");
var K_ = typeof W0 == "function" ? tx : J0, F_ = Object.defineProperty, gr = (n, o) => F_(n, "name", { value: o, configurable: !0 }), Pd = "rovingFocusGroup.onEntryFocus", Q_ = { bubbles: !1, cancelable: !0 }, yu = "RovingFocusGroup", [_h, nx, Z_] = /* @__PURE__ */ cu(yu), [$_, lx] = /* @__PURE__ */ zi(
  yu,
  [Z_]
), [J_, W_] = $_(yu), eA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ gr(function(o, r) {
    return /* @__PURE__ */ S.jsx(_h.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(_h.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(tA, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), tA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ gr(function(o, r) {
  const {
    __scopeRovingFocusGroup: a,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: p,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: h,
    onEntryFocus: y,
    preventScrollOnEntryFocus: v = !1,
    ...x
  } = o, C = b.useRef(null), w = Pn(r, C), _ = Es(d), [N, T] = Jo({
    prop: p,
    defaultProp: g ?? null,
    onChange: h,
    caller: yu
  }), [M, A] = b.useState(!1), k = U0(y), H = nx(a), P = b.useRef(!1), [G, L] = b.useState(0);
  return b.useEffect(() => {
    const K = C.current;
    if (K)
      return K.addEventListener(Pd, k), () => K.removeEventListener(Pd, k);
  }, [k]), /* @__PURE__ */ S.jsx(
    J_,
    {
      scope: a,
      orientation: c,
      dir: _,
      loop: f,
      currentTabStopId: N,
      onItemFocus: b.useCallback(
        (K) => T(K),
        [T]
      ),
      onItemShiftTab: b.useCallback(() => A(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => L((K) => K + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => L((K) => K - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        jn.div,
        {
          tabIndex: M || G === 0 ? -1 : 0,
          "data-orientation": c,
          ...x,
          ref: w,
          style: { outline: "none", ...o.style },
          onMouseDown: qn(o.onMouseDown, () => {
            P.current = !0;
          }),
          onFocus: qn(o.onFocus, (K) => {
            const te = !P.current;
            if (K.target === K.currentTarget && te && !M) {
              const se = new CustomEvent(Pd, Q_);
              if (K.currentTarget.dispatchEvent(se), !se.defaultPrevented) {
                const de = H().filter((I) => I.focusable), le = de.find((I) => I.active), pe = de.find((I) => I.id === N), V = [le, pe, ...de].filter(
                  Boolean
                ).map((I) => I.ref.current);
                ip(V, v);
              }
            }
            P.current = !1;
          }),
          onBlur: qn(o.onBlur, () => A(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), nA = "RovingFocusGroupItem", lA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ gr(function(o, r) {
    const {
      __scopeRovingFocusGroup: a,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: p,
      ...g
    } = o, h = uu(), y = d || h, v = W_(nA, a), x = v.currentTabStopId === y, C = nx(a), { onFocusableItemAdd: w, onFocusableItemRemove: _, currentTabStopId: N } = v, T = K_();
    return _i(() => {
      if (!(!T || !c))
        return w(), () => _();
    }, [T, c, w, _]), b.useEffect(() => {
      if (!(T || !c))
        return w(), () => _();
    }, [T, c, w, _]), /* @__PURE__ */ S.jsx(
      _h.ItemSlot,
      {
        scope: a,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ S.jsx(
          jn.span,
          {
            tabIndex: x ? 0 : -1,
            "data-orientation": v.orientation,
            ...g,
            ref: r,
            onMouseDown: qn(o.onMouseDown, (M) => {
              c ? v.onItemFocus(y) : M.preventDefault();
            }),
            onFocus: qn(o.onFocus, () => v.onItemFocus(y)),
            onKeyDown: qn(o.onKeyDown, (M) => {
              if (M.key === "Tab" && M.shiftKey) {
                v.onItemShiftTab();
                return;
              }
              if (M.target !== M.currentTarget) return;
              const A = ix(M, v.orientation, v.dir);
              if (A !== void 0) {
                if (M.metaKey || M.ctrlKey || M.altKey || M.shiftKey) return;
                M.preventDefault();
                let H = C().filter((P) => P.focusable).map((P) => P.ref.current);
                if (A === "last") H.reverse();
                else if (A === "prev" || A === "next") {
                  A === "prev" && H.reverse();
                  const P = H.indexOf(M.currentTarget);
                  H = v.loop ? rx(H, P + 1) : H.slice(P + 1);
                }
                setTimeout(() => ip(H));
              }
            }),
            children: typeof p == "function" ? p({ isCurrentTabStop: x, hasTabStop: N != null }) : p
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), oA = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function ox(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
gr(ox, "getDirectionAwareKey");
function ix(n, o, r) {
  const a = ox(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return oA[a];
}
gr(ix, "getFocusIntent");
function ip(n, o = !1) {
  const r = document.activeElement;
  for (const a of n)
    if (a === r || (a.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
gr(ip, "focusFirst");
function rx(n, o) {
  return n.map((r, a) => n[(o + a) % n.length]);
}
gr(rx, "wrapArray");
var iA = eA, rA = lA, aA = Object.defineProperty, sA = (n, o) => aA(n, "name", { value: o, configurable: !0 }), cA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ sA(function(o, r) {
    return /* @__PURE__ */ S.jsx(
      jn.label,
      {
        ...o,
        ref: r,
        onMouseDown: (a) => {
          a.target.closest("button, input, select, textarea") || (o.onMouseDown?.(a), !a.defaultPrevented && a.detail > 1 && a.preventDefault());
        }
      }
    );
  }, "Label")
), uA = cA, fA = Object.defineProperty, dA = (n, o) => fA(n, "name", { value: o, configurable: !0 });
function ax(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
dA(ax, "usePrevious");
var hA = Object.defineProperty, pA = (n, o) => hA(n, "name", { value: o, configurable: !0 });
function rp(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
pA(rp, "clamp");
var mA = Object.defineProperty, sx = (n, o) => mA(n, "name", { value: o, configurable: !0 }), Gy = "horizontal", gA = ["horizontal", "vertical"], bA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ sx(function(o, r) {
    const { decorative: a, orientation: c = Gy, ...f } = o, d = cx(c) ? c : Gy, g = a ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
    return /* @__PURE__ */ S.jsx(
      jn.div,
      {
        "data-orientation": d,
        ...g,
        ...f,
        ref: r
      }
    );
  }, "Separator")
);
function cx(n) {
  return gA.includes(n);
}
sx(cx, "isValidOrientation");
var yA = bA, vA = Object.defineProperty, At = (n, o) => vA(n, "name", { value: o, configurable: !0 }), ux = ["PageUp", "PageDown"], fx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], dx = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, Rs = "Slider", [Ah, xA, SA] = /* @__PURE__ */ cu(Rs), [ap, BN] = /* @__PURE__ */ zi(Rs, [
  SA
]), [EA, ws] = ap(Rs), CA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const {
      name: a,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: p = "horizontal",
      disabled: g = !1,
      minStepsBetweenThumbs: h = 0,
      defaultValue: y = [c],
      value: v,
      onValueChange: x = /* @__PURE__ */ At(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ At(() => {
      }, "onValueCommit"),
      inverted: w = !1,
      form: _,
      ...N
    } = o, T = b.useRef(/* @__PURE__ */ new Set()), M = b.useRef(0), A = b.useRef(!1), H = p === "horizontal" ? RA : wA, [P, G] = b.useState(null), L = Pn(r, G), [K = [], te] = Jo({
      prop: v,
      defaultProp: y,
      onChange: /* @__PURE__ */ At((I) => {
        [...T.current][M.current]?.focus({
          preventScroll: !0,
          focusVisible: A.current
        }), A.current = !1, x(I);
      }, "onChange")
    }), se = b.useRef(K), de = b.useRef(K);
    b.useEffect(() => {
      const I = _ ? P?.ownerDocument.getElementById(_) : P?.closest("form");
      if (I instanceof HTMLFormElement) {
        const Q = /* @__PURE__ */ At(() => te(de.current), "reset");
        return I.addEventListener("reset", Q), () => I.removeEventListener("reset", Q);
      }
    }, [P, _, te]);
    function le(I) {
      const Q = xx(K, I);
      V(I, Q);
    }
    At(le, "handleSlideStart");
    function pe(I) {
      V(I, M.current);
    }
    At(pe, "handleSlideMove");
    function be() {
      String(K) !== String(se.current) && C(K);
    }
    At(be, "handleSlideEnd");
    function V(I, Q, { commit: xe } = { commit: !1 }) {
      const ae = cp(d), z = us(Math.round((I - c) / d) * d + c, ae), F = rp(z, [c, f]);
      te((ne = []) => {
        const oe = yx(ne, F, Q);
        if (Cx(oe, h * d)) {
          M.current = oe.indexOf(F);
          const ge = String(oe) !== String(ne);
          return ge && xe && C(oe), ge ? oe : ne;
        } else
          return ne;
      });
    }
    return At(V, "updateValues"), /* @__PURE__ */ S.jsx(
      EA,
      {
        scope: o.__scopeSlider,
        name: a,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: M,
        thumbs: T.current,
        values: K,
        orientation: p,
        form: _,
        children: /* @__PURE__ */ S.jsx(Ah.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(Ah.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          H,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...N,
            ref: L,
            onPointerDown: qn(N.onPointerDown, () => {
              g || (se.current = K, A.current = !1);
            }),
            min: c,
            max: f,
            inverted: w,
            onSlideStart: g ? void 0 : le,
            onSlideMove: g ? void 0 : pe,
            onSlideEnd: g ? void 0 : be,
            onHomeKeyDown: () => {
              g || (A.current = !0, V(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              g || (A.current = !0, V(f, K.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: I, direction: Q }) => {
              if (!g) {
                A.current = !0;
                const z = ux.includes(I.key) || I.shiftKey && fx.includes(I.key) ? 10 : 1, F = M.current, ne = K[F], oe = Rx(ne, {
                  min: c,
                  step: d,
                  direction: Q,
                  multiplier: z
                });
                V(oe, F, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [hx, px] = ap(Rs, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), RA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const {
      min: a,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: p,
      onSlideMove: g,
      onSlideEnd: h,
      onStepKeyDown: y,
      ...v
    } = o, [x, C] = b.useState(null), w = Pn(r, C), _ = b.useRef(void 0), N = Es(f), T = N === "ltr", M = T && !d || !T && d;
    function A(k) {
      const H = _.current || x.getBoundingClientRect(), P = [0, H.width], L = vu(P, M ? [a, c] : [c, a]);
      return _.current = H, L(k - H.left);
    }
    return At(A, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      hx,
      {
        scope: o.__scopeSlider,
        startEdge: M ? "left" : "right",
        endEdge: M ? "right" : "left",
        direction: M ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          mx,
          {
            dir: N,
            "data-orientation": "horizontal",
            ...v,
            ref: w,
            style: {
              ...v.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (k) => {
              const H = A(k.clientX);
              p?.(H);
            },
            onSlideMove: (k) => {
              const H = A(k.clientX);
              g?.(H);
            },
            onSlideEnd: () => {
              _.current = void 0, h?.();
            },
            onStepKeyDown: (k) => {
              const P = dx[M ? "from-left" : "from-right"].includes(k.key);
              y?.({ event: k, direction: P ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), wA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const {
      min: a,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: p,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...y
    } = o, v = b.useRef(null), x = Pn(r, v), C = b.useRef(void 0), w = !f;
    function _(N) {
      const T = C.current || v.current.getBoundingClientRect(), M = [0, T.height], k = vu(M, w ? [c, a] : [a, c]);
      return C.current = T, k(N - T.top);
    }
    return At(_, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      hx,
      {
        scope: o.__scopeSlider,
        startEdge: w ? "bottom" : "top",
        endEdge: w ? "top" : "bottom",
        size: "height",
        direction: w ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          mx,
          {
            "data-orientation": "vertical",
            ...y,
            ref: x,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (N) => {
              const T = _(N.clientY);
              d?.(T);
            },
            onSlideMove: (N) => {
              const T = _(N.clientY);
              p?.(T);
            },
            onSlideEnd: () => {
              C.current = void 0, g?.();
            },
            onStepKeyDown: (N) => {
              const M = dx[w ? "from-bottom" : "from-top"].includes(N.key);
              h?.({ event: N, direction: M ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), mx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const {
      __scopeSlider: a,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: p,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...y
    } = o, v = ws(Rs, a);
    return /* @__PURE__ */ S.jsx(
      jn.span,
      {
        ...y,
        ref: r,
        onKeyDown: qn(o.onKeyDown, (x) => {
          x.key === "Home" ? (p(x), x.preventDefault()) : x.key === "End" ? (g(x), x.preventDefault()) : ux.concat(fx).includes(x.key) && (h(x), x.preventDefault());
        }),
        onPointerDown: qn(o.onPointerDown, (x) => {
          const C = x.target;
          C.setPointerCapture(x.pointerId), x.preventDefault(), v.thumbs.has(C) ? C.focus({ preventScroll: !0, focusVisible: !1 }) : c(x);
        }),
        onPointerMove: qn(o.onPointerMove, (x) => {
          x.target.hasPointerCapture(x.pointerId) && f(x);
        }),
        onPointerUp: qn(o.onPointerUp, (x) => {
          const C = x.target;
          C.hasPointerCapture(x.pointerId) && (C.releasePointerCapture(x.pointerId), d(x));
        })
      }
    );
  }, "SliderImpl")
), _A = "SliderTrack", AA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = ws(_A, a);
    return /* @__PURE__ */ S.jsx(
      jn.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...c,
        ref: r
      }
    );
  }, "SliderTrack")
), Yy = "SliderRange", MA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = ws(Yy, a), d = px(Yy, a), p = b.useRef(null), g = Pn(r, p), h = f.values.length, y = f.values.map(
      (C) => sp(C, f.min, f.max)
    ), v = h > 1 ? Math.min(...y) : 0, x = 100 - Math.max(...y);
    return /* @__PURE__ */ S.jsx(
      jn.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...c,
        ref: g,
        style: {
          ...o.style,
          [d.startEdge]: v + "%",
          [d.endEdge]: x + "%"
        }
      }
    );
  }, "SliderRange")
), TA = "SliderThumb", [OA, gx] = ap(TA), NA = "SliderThumbProvider";
function bx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: a,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = ws(NA, o), d = xA(o), [p, g] = b.useState(null), h = b.useMemo(
    () => p ? d().findIndex((N) => N.ref.current === p) : -1,
    [d, p]
  ), y = B0(p), v = p ? !!f.form || !!p.closest("form") : !0, x = f.values[h], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), w = x === void 0 ? 0 : sp(x, f.min, f.max);
  b.useEffect(() => {
    if (p)
      return f.thumbs.add(p), () => {
        f.thumbs.delete(p);
      };
  }, [p, f.thumbs]);
  const _ = {
    value: x,
    name: C,
    form: f.form,
    isFormControl: v,
    index: h,
    thumb: p,
    onThumbChange: g,
    percent: w,
    size: y
  };
  return /* @__PURE__ */ S.jsx(OA, { scope: o, ..._, children: wx(c) ? c(_) : a });
}
At(bx, "SliderThumbProvider");
var Xd = "SliderThumbTrigger", kA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = ws(Xd, a), d = px(Xd, a), { index: p, value: g, percent: h, size: y, onThumbChange: v } = gx(
      Xd,
      a
    ), x = Pn(r, v), C = vx(p, f.values.length), w = y?.[d.size], _ = w ? Sx(w, h, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${_}px)`
        },
        children: /* @__PURE__ */ S.jsx(Ah.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
          jn.span,
          {
            role: "slider",
            "aria-label": o["aria-label"] || C,
            "aria-valuemin": f.min,
            "aria-valuenow": g,
            "aria-valuemax": f.max,
            "aria-orientation": f.orientation,
            "data-orientation": f.orientation,
            "data-disabled": f.disabled ? "" : void 0,
            tabIndex: f.disabled ? void 0 : 0,
            ...c,
            ref: x,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: qn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = p;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), zA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      bx,
      {
        __scopeSlider: a,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: p }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            kA,
            {
              ...f,
              ref: r,
              __scopeSlider: a
            }
          ),
          p ? /* @__PURE__ */ S.jsx(
            jA,
            {
              __scopeSlider: a
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), DA = "SliderBubbleInput", jA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function({ __scopeSlider: o, ...r }, a) {
    const { value: c, name: f, form: d } = gx(DA, o), p = b.useRef(null), g = Pn(p, a), h = ax(c);
    return b.useEffect(() => {
      const y = p.current;
      if (!y) return;
      const v = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(v, "value").set;
      if (h !== c && C) {
        const w = new Event("input", { bubbles: !0 });
        C.call(y, c), y.dispatchEvent(w);
      }
    }, [h, c]), /* @__PURE__ */ S.jsx(
      jn.input,
      {
        style: { display: "none" },
        name: f,
        form: d,
        ...r,
        ref: g,
        defaultValue: c
      }
    );
  }, "SliderBubbleInput")
);
function yx(n = [], o, r) {
  const a = [...n];
  return a[r] = o, a.sort((c, f) => c - f);
}
At(yx, "getNextSortedValues");
function sp(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return rp(f, [0, 100]);
}
At(sp, "convertValueToPercentage");
function vx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
At(vx, "getLabel");
function xx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), a = Math.min(...r);
  return r.indexOf(a);
}
At(xx, "getClosestValueIndex");
function Sx(n, o, r) {
  const a = n / 2, f = vu([0, 50], [0, a]);
  return (a - f(o) * r) * r;
}
At(Sx, "getThumbInBoundsOffset");
function Ex(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
At(Ex, "getStepsBetweenValues");
function Cx(n, o) {
  if (o > 0) {
    const r = Ex(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
At(Cx, "hasMinStepsBetweenValues");
function vu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const a = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + a * (r - n[0]);
  };
}
At(vu, "linearScale");
function cp(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [a, c] = o.split("e"), f = a.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
At(cp, "getDecimalCount");
function us(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
At(us, "roundValue");
function Rx(n, {
  min: o,
  step: r,
  direction: a,
  multiplier: c
}) {
  const f = cp(r), d = (n - o) / r, p = Math.round(d), g = us(p * r + o, f) === us(n, f);
  let h;
  return g ? h = p + c * a : a > 0 ? h = Math.ceil(d) : h = Math.floor(d), us(h * r + o, f);
}
At(Rx, "getNextStepValue");
function wx(n) {
  return typeof n == "function";
}
At(wx, "isFunction");
var LA = Object.defineProperty, VA = (n, o) => LA(n, "name", { value: o, configurable: !0 }), IA = "Toggle", HA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ VA(function(o, r) {
    const { pressed: a, defaultPressed: c, onPressedChange: f, ...d } = o, [p, g] = Jo({
      prop: a,
      onChange: f,
      defaultProp: c ?? !1,
      caller: IA
    });
    return /* @__PURE__ */ S.jsx(
      jn.button,
      {
        type: "button",
        "aria-pressed": p,
        "data-state": p ? "on" : "off",
        "data-disabled": o.disabled ? "" : void 0,
        ...d,
        ref: r,
        onClick: qn(o.onClick, () => {
          o.disabled || g(!p);
        })
      }
    );
  }, "Toggle")
), UA = Object.defineProperty, Ti = (n, o) => UA(n, "name", { value: o, configurable: !0 }), ga = "ToggleGroup", [_x, GN] = /* @__PURE__ */ zi(ga, [
  lx
]), Ax = lx(), BA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ti(function(o, r) {
  const { type: a, ...c } = o;
  if (a === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(GA, { role: "radiogroup", ...f, ref: r });
  }
  if (a === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(YA, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${ga}\``);
}, "ToggleGroup")), [Mx, Tx] = _x(ga), GA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ti(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ti(() => {
    }, "onValueChange"),
    ...d
  } = o, [p, g] = Jo({
    prop: a,
    defaultProp: c ?? "",
    onChange: f,
    caller: ga
  });
  return /* @__PURE__ */ S.jsx(
    Mx,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => p ? [p] : [], [p]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ S.jsx(Ox, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), YA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ti(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ti(() => {
    }, "onValueChange"),
    ...d
  } = o, [p, g] = Jo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: ga
  }), h = b.useCallback(
    (v) => g((x = []) => [...x, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((x = []) => x.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    Mx,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: p,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ S.jsx(Ox, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [qA, PA] = _x(ga), Ox = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ti(function(o, r) {
    const {
      __scopeToggleGroup: a,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: p,
      loop: g = !0,
      ...h
    } = o, y = Ax(a), v = Es(p), x = { dir: v, ...h };
    return /* @__PURE__ */ S.jsx(qA, { scope: a, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      iA,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: v,
        loop: g,
        children: /* @__PURE__ */ S.jsx(jn.div, { ...x, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(jn.div, { ...x, ref: r }) });
  }, "ToggleGroupImpl")
), Mh = "ToggleGroupItem", XA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ti(function(o, r) {
    const a = Tx(Mh, o.__scopeToggleGroup), c = PA(Mh, o.__scopeToggleGroup), f = Ax(o.__scopeToggleGroup), d = a.value.includes(o.value), p = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: p }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      rA,
      {
        asChild: !0,
        ...f,
        focusable: !p,
        active: d,
        ref: h,
        children: /* @__PURE__ */ S.jsx(qy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(qy, { ...g, ref: r });
  }, "ToggleGroupItem")
), qy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ti(function(o, r) {
    const { __scopeToggleGroup: a, value: c, ...f } = o, d = Tx(Mh, a), p = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? p : void 0;
    return /* @__PURE__ */ S.jsx(
      HA,
      {
        ...g,
        ...f,
        ref: r,
        onPressedChange: (h) => {
          h ? d.onItemActivate(c) : d.onItemDeactivate(c);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
function Nx({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(Uw, { "data-slot": "accordion", ...n });
}
function la({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    Bw,
    {
      "data-slot": "accordion-item",
      className: We("border-b last:border-b-0", n),
      ...o
    }
  );
}
function oa({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(Gw, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    Yw,
    {
      "data-slot": "accordion-trigger",
      className: We(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(r0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function ia({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    qw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: We("pt-0 pb-4", n), children: o })
    }
  );
}
const Py = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Xy = qv, br = (n, o) => (r) => {
  var a;
  if (o?.variants == null) return Xy(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], v = f?.[h];
    if (y === null) return null;
    const x = Py(y) || Py(v);
    return c[h][x];
  }), p = r && Object.entries(r).reduce((h, y) => {
    let [v, x] = y;
    return x === void 0 || (h[v] = x), h;
  }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((h, y) => {
    let { class: v, className: x, ...C } = y;
    return Object.entries(C).every((w) => {
      let [_, N] = w;
      return Array.isArray(N) ? N.includes({
        ...f,
        ...p
      }[_]) : {
        ...f,
        ...p
      }[_] === N;
    }) ? [
      ...h,
      v,
      x
    ] : h;
  }, []);
  return Xy(n, d, g, r?.class, r?.className);
}, KA = br(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function or({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? f0 : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: We(KA({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function FA({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ S.jsx(
    yA,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: o,
      className: We(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        n
      ),
      ...a
    }
  );
}
const QA = br(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ZA({
  className: n,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": o,
      className: We(QA({ orientation: o }), n),
      ...r
    }
  );
}
function kx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card",
      className: We(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        n
      ),
      ...o
    }
  );
}
function zx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: We(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        n
      ),
      ...o
    }
  );
}
function Dx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: We("leading-none font-semibold", n),
      ...o
    }
  );
}
function jx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: We("px-6", n),
      ...o
    }
  );
}
function $A({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(L0, { "data-slot": "collapsible", ...n });
}
function JA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    z0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function WA({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    j0,
    {
      "data-slot": "collapsible-content",
      ...n
    }
  );
}
function Fc({
  controlled: n,
  default: o,
  name: r,
  state: a = "value"
}) {
  const {
    current: c
  } = b.useRef(n !== void 0), [f, d] = b.useState(o), p = c ? n : f, g = b.useCallback((h) => {
    c || d(h);
  }, []);
  return [p, g];
}
const up = {
  ...pr
}, Ky = {};
function Tl(n, o) {
  const r = b.useRef(Ky);
  return r.current === Ky && (r.current = n(o)), r;
}
const Kd = up.useInsertionEffect, e2 = (
  // React 17 doesn't have useInsertionEffect.
  Kd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Kd !== up.useLayoutEffect ? Kd : (n) => n()
);
function Ke(n) {
  const o = Tl(t2).current;
  return o.next = n, e2(o.effect), o.trampoline;
}
function t2() {
  const n = {
    next: void 0,
    callback: n2,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function n2() {
}
const l2 = () => {
}, Fe = typeof document < "u" ? b.useLayoutEffect : l2, Lx = /* @__PURE__ */ b.createContext({
  register: () => {
  },
  unregister: () => {
  },
  subscribeMapChange: () => () => {
  },
  nextIndexRef: {
    current: 0
  }
});
function o2() {
  return b.useContext(Lx);
}
function i2(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: a,
    onMapChange: c
  } = n, f = Ke(c), [, d] = b.useState(!1), p = Tl(a2).current, g = Tl(r2).current, h = b.useRef(0), y = b.useRef(!0), v = b.useRef([]), x = b.useRef(null), C = Ke(() => {
    y.current || (y.current = !0, d((H) => !H));
  }), w = Ke((H, P) => {
    g.set(H, P), C();
  }), _ = Ke((H) => {
    g.delete(H), C();
  }), N = Ke((H) => {
    const P = /* @__PURE__ */ new Map();
    return r.current.length = 0, a && (a.current.length = 0), H.forEach((G) => {
      P.set(G.element, {
        ...G.registration.metadata ?? {},
        index: G.index
      }), r.current[G.index] = G.element, a && (a.current[G.index] = G.registration.label !== void 0 ? G.registration.label : G.registration.textRef?.current?.textContent ?? G.element.textContent);
    }), h.current = r.current.length, P;
  });
  function T(H) {
    if (x.current?.disconnect(), x.current = null, typeof MutationObserver != "function" || H.length < 2)
      return;
    const P = new MutationObserver((L) => {
      if (!u2(L))
        return;
      let K = null;
      for (const te of H)
        if (te.isConnected) {
          if (K && Vx(K, te) > 0) {
            P.disconnect(), C();
            return;
          }
          K = te;
        }
    });
    x.current = P;
    const G = /* @__PURE__ */ new Set();
    for (let L = 1; L < H.length; L += 1) {
      const K = c2(H[L - 1], H[L]);
      K && G.add(K);
    }
    G.forEach((L) => P.observe(L, {
      childList: !0
    }));
  }
  const M = Ke(() => {
    const [H, P] = s2(g), G = N(H);
    T(P), v.current = H, y.current = !1, p.forEach((L) => L(G)), f(G);
  });
  Fe(() => (y.current || N(v.current), () => {
    r.current = [], a && (a.current = []);
  }), [r, a, N]), Fe(() => {
    y.current && M();
  }), Fe(() => () => {
    x.current?.disconnect(), y.current = !0;
  }, []);
  const A = Ke((H) => (p.add(H), () => {
    p.delete(H);
  })), k = b.useMemo(() => ({
    register: w,
    unregister: _,
    subscribeMapChange: A,
    nextIndexRef: h
  }), [w, _, A, h]);
  return /* @__PURE__ */ S.jsx(Lx.Provider, {
    value: k,
    children: o
  });
}
function r2() {
  return /* @__PURE__ */ new Map();
}
function a2() {
  return /* @__PURE__ */ new Set();
}
function s2(n) {
  const o = /* @__PURE__ */ new Set(), r = [], a = [];
  n.forEach((f, d) => {
    if (!d.isConnected)
      return;
    const p = f.index, g = {
      index: p ?? -1,
      element: d,
      registration: f
    };
    p === null ? a.push(g) : p >= 0 && (o.add(p), r.push(g));
  });
  let c = 0;
  return a.sort((f, d) => Vx(f.element, d.element)), a.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, a.map((f) => f.element)];
}
function c2(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function u2(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Vx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function f2(n, o) {
  return function(a, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", a.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${a}; visit ${f} for the full message.`;
  };
}
const Eo = f2("https://base-ui.com/production-error", "Base UI");
function cr(n, o, r, a) {
  const c = Tl(Ix).current;
  return h2(c, n, o, r, a) && Hx(c, [n, o, r, a]), c.callback;
}
function d2(n) {
  const o = Tl(Ix).current;
  return p2(o, n) && Hx(o, n), o.callback;
}
function Ix() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function h2(n, o, r, a, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== a || n.refs[3] !== c;
}
function p2(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, a) => r !== o[a]);
}
function Hx(n, o) {
  if (n.refs = o, o.every((r) => r == null)) {
    n.callback = null;
    return;
  }
  n.callback = (r) => {
    if (n.cleanup && (n.cleanup(), n.cleanup = null), r != null) {
      const a = Array(o.length).fill(null);
      for (let c = 0; c < o.length; c += 1) {
        const f = o[c];
        if (f != null)
          switch (typeof f) {
            case "function": {
              const d = f(r);
              typeof d == "function" && (a[c] = d);
              break;
            }
            case "object": {
              f.current = r;
              break;
            }
          }
      }
      n.cleanup = () => {
        for (let c = 0; c < o.length; c += 1) {
          const f = o[c];
          if (f != null)
            switch (typeof f) {
              case "function": {
                const d = a[c];
                typeof d == "function" ? d() : f(null);
                break;
              }
              case "object": {
                f.current = null;
                break;
              }
            }
        }
      };
    }
  };
}
const m2 = parseInt(b.version, 10);
function fp(n) {
  return m2 >= n;
}
function Fy(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (fp(19) ? r?.ref : o.ref) ?? null;
}
function Th(n, o) {
  if (n && !o)
    return n;
  if (!n && o)
    return o;
  if (n || o)
    return {
      ...n,
      ...o
    };
}
function Xt() {
}
const ra = Object.freeze([]), dl = Object.freeze({});
function g2(n, o) {
  const r = {};
  for (const a in n) {
    const c = n[a];
    if (o?.hasOwnProperty(a)) {
      const f = o[a](c);
      f != null && Object.assign(r, f);
      continue;
    }
    c === !0 ? r[`data-${a.toLowerCase()}`] = "" : c && (r[`data-${a.toLowerCase()}`] = c.toString());
  }
  return r;
}
function b2(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function y2(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const dp = {};
function ca(n, o, r, a, c) {
  if (!r && !a && !c && !n)
    return nu(o);
  let f = nu(n);
  return o && (f = cs(f, o)), r && (f = cs(f, r)), a && (f = cs(f, a)), c && (f = cs(f, c)), f;
}
function v2(n) {
  if (n.length === 0)
    return dp;
  if (n.length === 1)
    return nu(n[0]);
  let o = nu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = cs(o, n[r]);
  return o;
}
function nu(n) {
  return hp(n) ? {
    ...Bx(n, dp)
  } : x2(n);
}
function cs(n, o) {
  return hp(o) ? Bx(o, n) : S2(n, o);
}
function x2(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const a = o[r];
    Ux(r, a) && (o[r] = Gx(a));
  }
  return o;
}
function S2(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const a = o[r];
    switch (r) {
      case "style": {
        n[r] = Th(n.style, a);
        break;
      }
      case "className": {
        n[r] = Yx(n.className, a);
        break;
      }
      default:
        Ux(r, a) ? n[r] = E2(n[r], a) : n[r] = a;
    }
  }
  return n;
}
function Ux(n, o) {
  const r = n.charCodeAt(0), a = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && a === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function hp(n) {
  return typeof n == "function";
}
function Bx(n, o) {
  return hp(n) ? n(o) : n ?? dp;
}
function E2(n, o) {
  return o ? n ? (...r) => {
    const a = r[0];
    if (qx(a)) {
      const f = a;
      lu(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : Gx(o) : n;
}
function Gx(n) {
  return n && ((...o) => {
    const r = o[0];
    return qx(r) && lu(r), n(...o);
  });
}
function lu(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function Yx(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function qx(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function Zl(n, o, r = {}) {
  const a = o.render, c = C2(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? dl;
  return _2(n, a, c, f);
}
function C2(n, o = {}) {
  const {
    className: r,
    style: a,
    render: c
  } = n, {
    state: f = dl,
    ref: d,
    props: p,
    stateAttributesMapping: g,
    enabled: h = !0
  } = o, y = h ? b2(r, f) : void 0, v = h ? y2(a, f) : void 0, x = h ? g2(f, g) : dl, C = h && p ? R2(p) : void 0, w = h ? Th(x, C) ?? {} : dl;
  return typeof document < "u" && (h ? Array.isArray(d) ? w.ref = d2([w.ref, Fy(c), ...d]) : w.ref = cr(w.ref, Fy(c), d) : cr(null, null)), h ? (y !== void 0 && (w.className = Yx(w.className, y)), v !== void 0 && (w.style = Th(w.style, v)), w) : dl;
}
function R2(n) {
  return Array.isArray(n) ? v2(n) : ca(void 0, n);
}
const w2 = /* @__PURE__ */ Symbol.for("react.lazy");
function _2(n, o, r, a) {
  if (o) {
    if (typeof o == "function")
      return o(r, a);
    const c = ca(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === w2 && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return A2(n, r);
  throw new Error(Eo(8));
}
function A2(n, o) {
  return n === "button" ? /* @__PURE__ */ b.createElement("button", {
    type: "button",
    ...o,
    key: o.key
  }) : n === "img" ? /* @__PURE__ */ b.createElement("img", {
    alt: "",
    ...o,
    key: o.key
  }) : /* @__PURE__ */ b.createElement(n, o);
}
let Qy = 0;
function M2(n, o = "mui") {
  const [r, a] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (Qy += 1, a(`${o}-${Qy}`));
  }, [r, o]), c;
}
const Zy = up.useId;
function pp(n, o) {
  if (Zy !== void 0) {
    const r = Zy();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return M2(n, o);
}
function xu(n) {
  return pp(n, "base-ui");
}
const Xl = "none", Px = "trigger-press", T2 = "trigger-hover", mp = "outside-press", O2 = "item-press", N2 = "close-press", $y = "clear-press", fs = "input-change", yo = "input-clear", k2 = "input-press", Su = "focus-out", gp = "escape-key", Oh = "list-navigation", bp = "keyboard", yp = "pointer", z2 = "cancel-open";
function St(n, o, r, a) {
  let c = !1, f = !1;
  const d = dl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    cancel() {
      c = !0;
    },
    allowPropagation() {
      f = !0;
    },
    get isCanceled() {
      return c;
    },
    get isPropagationAllowed() {
      return f;
    },
    trigger: r,
    ...d
  };
}
function D2(n, o, r) {
  const a = r ?? dl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...a
  };
}
function Xx(n) {
  b.useEffect(n, ra);
}
const Lc = null;
class j2 {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = !1;
  tick = (o) => {
    this.isScheduled = !1;
    const r = this.callbacks, a = this.callbacksCount;
    if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, a > 0)
      for (let c = 0; c < r.length; c += 1)
        r[c]?.(o);
  };
  request(o) {
    const r = this.nextId;
    return this.nextId += 1, this.callbacks.push(o), this.callbacksCount += 1, !this.isScheduled && (requestAnimationFrame(this.tick), this.isScheduled = !0), r;
  }
  cancel(o) {
    const r = o - this.startId;
    r < 0 || r >= this.callbacks.length || (this.callbacks[r] = null, this.callbacksCount -= 1);
  }
}
let Vc = new j2();
class xo {
  static create() {
    return new xo();
  }
  static request(o) {
    return Vc.request(o);
  }
  static cancel(o) {
    return Vc.cancel(o);
  }
  currentId = Lc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = Vc.request(() => {
      this.currentId = Lc, o();
    });
  }
  cancel = () => {
    this.currentId !== Lc && (Vc.cancel(this.currentId), this.currentId = Lc);
  };
  disposeEffect = () => this.cancel;
}
function hs() {
  const n = Tl(xo.create).current;
  return Xx(n.disposeEffect), n;
}
function vp(n, o = !1, r = !1) {
  const [a, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && a !== "ending" && !r && c("ending"), !n && !f && a === "ending" && c(void 0), Fe(() => {
    if (!n && f && a !== "ending" && r) {
      const p = xo.request(() => {
        c("ending");
      });
      return () => {
        xo.cancel(p);
      };
    }
  }, [n, f, a, r]), Fe(() => {
    if (!n || o)
      return;
    const p = xo.request(() => {
      c(void 0);
    });
    return () => {
      xo.cancel(p);
    };
  }, [o, n]), Fe(() => {
    if (!n || !o)
      return;
    n && f && a !== "idle" && c("starting");
    const p = xo.request(() => {
      c("idle");
    });
    return () => {
      xo.cancel(p);
    };
  }, [o, n, f, a]), {
    mounted: f,
    setMounted: d,
    transitionStatus: a
  };
}
function L2(n = {}) {
  const {
    guess: o,
    label: r,
    metadata: a,
    textRef: c,
    index: f
  } = n, {
    register: d,
    unregister: p,
    subscribeMapChange: g,
    nextIndexRef: h
  } = o2(), y = b.useRef(-1), [v, x] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const N = h.current;
      h.current += 1, y.current = N;
    }
    return y.current;
  } : -1), C = f ?? v, w = b.useRef(null), _ = b.useCallback((N) => {
    const T = w.current;
    T && p(T), w.current = N, N && d(N, {
      metadata: a ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, p, a, r, c]);
  return Fe(() => {
    if (f == null)
      return g((N) => {
        const T = w.current ? N.get(w.current)?.index : null;
        T != null && x(T);
      });
  }, [f, g]), {
    ref: _,
    index: C
  };
}
let Jy = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const V2 = {
  "data-starting-style": ""
}, I2 = {
  "data-ending-style": ""
}, Eu = {
  transitionStatus(n) {
    return n === "starting" ? V2 : n === "ending" ? I2 : null;
  }
}, H2 = /* @__PURE__ */ b.createContext(void 0);
function U2(n = !1) {
  const o = b.useContext(H2);
  if (o === void 0 && !n)
    throw new Error(Eo(16));
  return o;
}
function B2(n) {
  const {
    focusableWhenDisabled: o,
    disabled: r,
    composite: a = !1,
    tabIndex: c = 0,
    isNativeButton: f
  } = n, d = a && o !== !1, p = a && o === !1;
  return {
    props: b.useMemo(() => {
      const h = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(y) {
          r && o && y.key !== "Tab" && y.preventDefault();
        }
      };
      return a || (h.tabIndex = c, !f && r && (h.tabIndex = o ? c : -1)), (f && (o || d) || !f && r) && (h["aria-disabled"] = r), f && (!o || p) && (h.disabled = r), h;
    }, [a, r, o, d, p, f, c])
  };
}
function $t(n) {
  return n?.ownerDocument || document;
}
function Qc(n, o, {
  detail: r = 0
} = {}) {
  n.dispatchEvent(new (un(n)).PointerEvent("click", {
    bubbles: !0,
    cancelable: !0,
    composed: !0,
    detail: r,
    shiftKey: o.shiftKey,
    ctrlKey: o.ctrlKey,
    altKey: o.altKey,
    metaKey: o.metaKey
  }));
}
function _s(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: a = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), p = U2(!0), g = f ?? p !== void 0, {
    props: h
  } = B2({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: a,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const C = d.current;
    Fd(C) && g && o && h.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, h.disabled, g]);
  Fe(y, [y]);
  const v = b.useCallback((C = {}) => {
    const {
      onClick: w,
      onMouseDown: _,
      onKeyUp: N,
      onKeyDown: T,
      onPointerDown: M,
      ...A
    } = C;
    return ca({
      onClick(k) {
        if (o) {
          k.preventDefault();
          return;
        }
        w?.(k);
      },
      onMouseDown(k) {
        o || _?.(k);
      },
      onKeyDown(k) {
        if (o || (lu(k), T?.(k), k.baseUIHandlerPrevented))
          return;
        const H = k.target === k.currentTarget, P = k.currentTarget, G = Fd(P), L = !c && G2(P), K = H && (c ? G : !L), te = k.key === "Enter", se = k.key === " ", de = P.getAttribute("role"), le = de?.startsWith("menuitem") || de === "option" || de === "gridcell";
        if (H && g && se) {
          if (k.defaultPrevented && le)
            return;
          k.preventDefault(), (!c || G) && (k.preventBaseUIHandler(), Qc(P, k));
          return;
        }
        if (!K || c || !se && !te) {
          H && L && se && k.preventDefault();
          return;
        }
        k.defaultPrevented || (k.preventDefault(), te && (k.preventBaseUIHandler(), Qc(P, k)));
      },
      onKeyUp(k) {
        if (!o) {
          if (lu(k), N?.(k), k.target === k.currentTarget && c && g && Fd(k.currentTarget) && k.key === " ") {
            k.preventDefault();
            return;
          }
          k.baseUIHandlerPrevented || k.target === k.currentTarget && !c && !g && !k.defaultPrevented && k.key === " " && (k.preventBaseUIHandler(), Qc(k.currentTarget, k));
        }
      },
      onPointerDown(k) {
        if (o) {
          k.preventDefault();
          return;
        }
        M?.(k);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, A);
  }, [o, h, g, c]), x = Ke((C) => {
    d.current = C, y();
  });
  return {
    getButtonProps: v,
    buttonRef: x
  };
}
function Fd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function G2(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Gt(n, o, r, a) {
  return n.addEventListener(o, r, a), () => {
    n.removeEventListener(o, r, a);
  };
}
function fl(n) {
  const o = Tl(Y2, n).current;
  return o.next = n, Fe(o.effect), o;
}
function Y2(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Fo(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function q2(n, o = !1) {
  const r = hs();
  return Ke((a, c = null) => {
    r.cancel();
    const f = Fo(n);
    if (f == null)
      return;
    const d = f, p = () => {
      pa.flushSync(a);
    };
    if (typeof d.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      a();
      return;
    }
    function g() {
      Promise.all(d.getAnimations().map((h) => h.finished)).then(() => {
        c?.aborted || p();
      }, () => {
        if (c?.aborted)
          return;
        if (d.getAnimations().some((y) => y.pending || y.playState !== "finished")) {
          g();
          return;
        }
        p();
      });
    }
    if (o) {
      const h = "data-starting-style";
      if (!d.hasAttribute(h)) {
        r.request(g);
        return;
      }
      const y = new MutationObserver(() => {
        d.hasAttribute(h) || (y.disconnect(), g());
      });
      y.observe(d, {
        attributes: !0,
        attributeFilter: [h]
      }), c?.addEventListener("abort", () => y.disconnect(), {
        once: !0
      });
      return;
    }
    r.request(g);
  });
}
function Cu(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: a,
    onComplete: c
  } = n, f = Ke(c), d = q2(a, r);
  b.useEffect(() => {
    if (!o)
      return;
    const p = new AbortController();
    return d(f, p.signal), () => {
      p.abort();
    };
  }, [o, r, f, d]);
}
function P2() {
  return typeof navigator > "u" ? {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  } : {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0
  };
}
const {
  userAgent: X2,
  platform: K2,
  maxTouchPoints: F2
} = P2(), Ru = X2.toLowerCase(), ps = K2.toLowerCase(), As = /^i(os$|p)/.test(ps) || ps === "macintel" && F2 > 1, Wy = "android", ou = ps === Wy || Ru.includes(Wy), Q2 = !As && ps.startsWith("mac");
ps.startsWith("win");
const Z2 = Q2 || As, yr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), ev = !yr && Ru.includes("firefox");
!yr && Ru.includes("chrom");
const $2 = Z2, Kx = /jsdom|happydom/.test(Ru), is = 0;
class ur {
  static create() {
    return new ur();
  }
  currentId = is;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = is, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== is;
  }
  clear = () => {
    this.currentId !== is && (clearTimeout(this.currentId), this.currentId = is);
  };
  disposeEffect = () => this.clear;
}
function Oi() {
  const n = Tl(ur.create).current;
  return Xx(n.disposeEffect), n;
}
let tv = {}, nv = {}, lv = "";
function wu(n, o) {
  return Cs(n) ? n : o;
}
function ov(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(wu(o, r)).overflowY);
}
function J2(n) {
  if (typeof document > "u")
    return !1;
  const o = $t(n);
  return un(o).innerWidth - o.documentElement.clientWidth > 0;
}
function W2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = $t(n), a = r.documentElement, c = r.body, f = wu(a, c), d = f.style.overflowY, p = a.style.scrollbarGutter;
  a.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, a.style.scrollbarGutter = p, g === h;
}
function eM(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = wu(r, a), f = {
    overflowY: c.style.overflowY,
    overflowX: c.style.overflowX
  };
  return Object.assign(c.style, {
    overflowY: "hidden",
    overflowX: "hidden"
  }), () => {
    Object.assign(c.style, f);
  };
}
function tM(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = un(r);
  let f = 0, d = 0, p = !1;
  const g = xo.create();
  if (yr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const C = c.getComputedStyle(r), w = c.getComputedStyle(a), T = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, tv = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, lv = r.style.scrollBehavior, nv = {
      position: a.style.position,
      height: a.style.height,
      width: a.style.width,
      boxSizing: a.style.boxSizing,
      overflowY: a.style.overflowY,
      overflowX: a.style.overflowX,
      scrollBehavior: a.style.scrollBehavior
    };
    const M = r.scrollHeight > r.clientHeight, A = r.scrollWidth > r.clientWidth, k = C.overflowY === "scroll" || w.overflowY === "scroll", H = C.overflowX === "scroll" || w.overflowX === "scroll", P = Math.max(0, c.innerWidth - a.clientWidth), G = Math.max(0, c.innerHeight - a.clientHeight), L = parseFloat(w.marginTop) + parseFloat(w.marginBottom), K = parseFloat(w.marginLeft) + parseFloat(w.marginRight), te = wu(r, a);
    if (p = W2(n), p) {
      r.style.scrollbarGutter = T, te.style.overflowY = "hidden", te.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: T,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (M || k) && (r.style.overflowY = "scroll"), (A || H) && (r.style.overflowX = "scroll"), Object.assign(a.style, {
      position: "relative",
      height: L || G ? `calc(100dvh - ${L + G}px)` : "100dvh",
      width: K || P ? `calc(100vw - ${K + P}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), a.scrollTop = f, a.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, tv), Object.assign(a.style, nv), p || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = lv);
  }
  function v() {
    y(), g.request(h);
  }
  h();
  const x = Gt(c, "resize", v);
  return () => {
    g.cancel(), y(), typeof c.removeEventListener == "function" && x();
  };
}
class nM {
  lockCount = 0;
  restore = null;
  timeoutLock = ur.create();
  timeoutUnlock = ur.create();
  acquire(o) {
    return this.lockCount += 1, this.lockCount === 1 && this.restore === null && this.timeoutLock.start(0, () => this.lock(o)), this.release;
  }
  release = () => {
    this.lockCount -= 1, this.lockCount === 0 && this.restore && this.timeoutUnlock.start(0, this.unlock);
  };
  unlock = () => {
    this.lockCount === 0 && this.restore && (this.restore?.(), this.restore = null);
  };
  lock(o) {
    if (this.lockCount === 0 || this.restore !== null)
      return;
    const r = $t(o), a = r.documentElement, c = r.body, f = un(a);
    if (ov(f, a, c)) {
      const p = new f.MutationObserver(() => {
        ov(f, a, c) || (p.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      p.observe(a, g), p.observe(c, g), this.restore = () => p.disconnect();
      return;
    }
    const d = As || !J2(o);
    this.restore = d ? eM(o) : tM(o);
  }
}
const lM = new nM();
function oM(n = !0, o = null) {
  Fe(() => {
    if (n)
      return lM.acquire(o);
  }, [n, o]);
}
function An(n) {
  n.preventDefault(), n.stopPropagation();
}
function iM(n) {
  return "nativeEvent" in n;
}
function Fx(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : ou && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function xp(n) {
  return Kx ? !1 : !ou && n.width === 0 && n.height === 0 || ou && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Qd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function rM(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Nh = "data-base-ui-focusable", aM = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", ir = "ArrowLeft", rr = "ArrowRight", Sp = "ArrowUp", _u = "ArrowDown";
function Pl(n) {
  let o = n.activeElement;
  for (; o?.shadowRoot?.activeElement != null; )
    o = o.shadowRoot.activeElement;
  return o;
}
function at(n, o) {
  if (!n || !o)
    return !1;
  const r = o.getRootNode?.();
  if (n.contains(o))
    return !0;
  if (r && da(r)) {
    let a = o;
    for (; a; ) {
      if (n === a)
        return !0;
      a = a.parentNode || a.host;
    }
  }
  return !1;
}
function Ml(n) {
  return "composedPath" in n ? n.composedPath()[0] : n.target;
}
function Zd(n, o) {
  if (o == null)
    return !1;
  if ("composedPath" in n)
    return n.composedPath().includes(o);
  const r = n;
  return r.target != null && o.contains(r.target);
}
function sM(n) {
  return n.matches("html,body");
}
function Ep(n) {
  return Kt(n) && n.matches(aM);
}
function kh(n) {
  return n ? n.getAttribute("role") === "combobox" && Ep(n) : !1;
}
function zh(n) {
  return n ? n.hasAttribute(Nh) ? n : n.querySelector(`[${Nh}]`) || n : null;
}
function ua(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const Qx = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, Cp = {
  ...Qx,
  position: "fixed",
  top: 0,
  left: 0
}, Rp = {
  ...Qx,
  position: "absolute"
}, iu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [a, c] = b.useState();
  Fe(() => {
    $2 && yr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: a
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: Cp,
    "aria-hidden": a ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function Ic(n, o, r) {
  return Math.floor(n / o) !== r;
}
function ms(n, o) {
  return o < 0 || o >= n.length;
}
function $d(n, o) {
  return Wn(n.current, {
    disabledIndices: o
  });
}
function iv(n, o) {
  return Wn(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function Wn(n, {
  startingIndex: o = -1,
  decrement: r = !1,
  disabledIndices: a,
  amount: c = 1
} = {}) {
  let f = o;
  do
    f += r ? -c : c;
  while (f >= 0 && f <= n.length - 1 && ru(n, f, a));
  return f;
}
function cM(n, {
  event: o,
  orientation: r,
  loopFocus: a,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: p,
  minIndex: g,
  maxIndex: h,
  prevIndex: y,
  stopEvent: v = !1
}) {
  let x = y, C;
  if (o.key === Sp ? C = "up" : o.key === _u && (C = "down"), C) {
    const w = [], _ = [];
    let N = !1, T = 0;
    {
      let K = null, te = -1;
      n.forEach((se, de) => {
        if (se == null)
          return;
        T += 1;
        const le = se.closest('[role="row"]');
        le && (N = !0), (le !== K || te === -1) && (K = le, te += 1, w[te] = []), w[te].push(de), _[de] = te;
      });
    }
    let M = !1, A = 0;
    if (N)
      for (const K of w) {
        const te = K.length;
        te > A && (A = te), te !== d && (M = !0);
      }
    const k = M && T < n.length, H = A || d, P = (K) => {
      if (!M || y === -1)
        return;
      const te = _[y];
      if (te == null)
        return;
      const se = w[te].indexOf(y), de = K === "up" ? -1 : 1;
      for (let le = te + de, pe = 0; pe < w.length; pe += 1, le += de) {
        if (le < 0 || le >= w.length) {
          if (!a || k)
            return;
          if (le = le < 0 ? w.length - 1 : 0, c) {
            const V = Math.min(se, w[le].length - 1), I = w[le][V] ?? w[le][0], Q = c(o, y, I);
            le = _[Q] ?? le;
          }
        }
        const be = w[le];
        for (let V = Math.min(se, be.length - 1); V >= 0; V -= 1) {
          const I = be[V];
          if (!ru(n, I, p))
            return I;
        }
      }
    }, G = (K) => {
      if (!k || y === -1)
        return;
      const te = y % H, se = K === "up" ? -H : H, de = h - h % H, le = lr(h / H) + 1;
      for (let pe = y - te + se, be = 0; be < le; be += 1, pe += se) {
        if (pe < 0 || pe > h) {
          if (!a)
            return;
          pe = pe < 0 ? de : 0;
        }
        const V = Math.min(pe + H - 1, h);
        for (let I = Math.min(pe + te, V); I >= pe; I -= 1)
          if (!ru(n, I, p))
            return I;
      }
    };
    v && An(o);
    const L = P(C) ?? G(C);
    if (L !== void 0)
      x = L;
    else if (y === -1)
      x = C === "up" ? h : g;
    else if (x = Wn(n, {
      startingIndex: y,
      amount: H,
      decrement: C === "up",
      disabledIndices: p
    }), a) {
      if (C === "up" && (y - H < g || x < 0)) {
        const K = y % H, te = h % H, se = h - (te - K);
        te === K ? x = h : x = te > K ? se : se - H, c && (x = c(o, y, x));
      }
      C === "down" && y + H > h && (x = Wn(n, {
        startingIndex: y % H - H,
        amount: H,
        disabledIndices: p
      }), c && (x = c(o, y, x)));
    }
    ms(n, x) && (x = y);
  }
  if (r === "both") {
    const w = lr(y / d);
    o.key === (f ? ir : rr) && (v && An(o), y % d !== d - 1 ? (x = Wn(n, {
      startingIndex: y,
      disabledIndices: p
    }), a && Ic(x, d, w) && (x = Wn(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: p
    }), c && (x = c(o, y, x)))) : a && (x = Wn(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: p
    }), c && (x = c(o, y, x))), Ic(x, d, w) && (x = y)), o.key === (f ? rr : ir) && (v && An(o), y % d !== 0 ? (x = Wn(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: p
    }), a && Ic(x, d, w) && (x = Wn(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: p
    }), c && (x = c(o, y, x)))) : a && (x = Wn(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: p
    }), c && (x = c(o, y, x))), Ic(x, d, w) && (x = y));
    const _ = lr(h / d) === w;
    ms(n, x) && (a && _ ? (x = o.key === (f ? rr : ir) ? h : Wn(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: p
    }), c && (x = c(o, y, x))) : x = y);
  }
  return x;
}
function ru(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !Au(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function uM(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function Au(n, o = n ? hl(n) : null) {
  return !n || !n.isConnected || !o || uM(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const fM = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function dM(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return da(r) ? r.host : null;
}
function Dh(n) {
  for (const o of Array.from(n.children))
    if (Ln(o) === "summary")
      return o;
  return null;
}
function hM(n, o) {
  const r = Dh(o);
  return !!r && (n === r || at(r, n));
}
function Zx(n) {
  const o = n ? Ln(n) : "";
  return n != null && n.matches(fM) && (o !== "summary" || n.parentElement != null && Ln(n.parentElement) === "details" && Dh(n.parentElement) === n) && (o !== "details" || Dh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function $x(n) {
  if (!Zx(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = dM(o)) {
    const r = o !== n, a = Ln(o) === "slot";
    if (o.hasAttribute("inert") || r && Ln(o) === "details" && !o.open && !hM(n, o) || o.hasAttribute("hidden") || !a && !pM(o, r))
      return !1;
  }
  return !0;
}
function pM(n, o) {
  const r = hl(n);
  return o ? r.display !== "none" : Au(n, r);
}
function Jx(n) {
  const o = n.tabIndex;
  if (o < 0) {
    const r = Ln(n);
    if (r === "details" || r === "audio" || r === "video" || Kt(n) && n.isContentEditable)
      return 0;
  }
  return o;
}
function Jd(n) {
  if (Ln(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function mM(n, o) {
  const r = Jd(n);
  if (!r)
    return !0;
  const a = o.find((c) => {
    const f = Jd(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return a ? a === r : o.find((c) => {
    const f = Jd(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function Wx(n) {
  if (Kt(n) && Ln(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return Kt(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function e1(n, o) {
  Wx(n).forEach((r) => {
    Zx(r) && o.push(r), e1(r, o);
  });
}
function t1(n, o, r) {
  Wx(n).forEach((a) => {
    Kt(a) && a.matches(o) && r.push(a), t1(a, o, r);
  });
}
function wp(n) {
  return $x(n) && Jx(n) >= 0;
}
function n1(n) {
  const o = [];
  return e1(n, o), o.filter($x);
}
function Mu(n) {
  const o = n1(n);
  return o.filter((r) => Jx(r) >= 0 && mM(r, o));
}
function l1(n, o) {
  const r = Mu(n), a = r.length;
  if (a === 0)
    return;
  const c = Pl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : a - 1 : f + o;
  return r[d];
}
function o1(n) {
  return l1($t(n).body, 1) || n;
}
function i1(n) {
  return l1($t(n).body, -1) || n;
}
function ds(n, o) {
  const r = o || n.currentTarget, a = n.relatedTarget;
  return !a || !at(r, a);
}
function gM(n) {
  Mu(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function rv(n) {
  const o = [];
  t1(n, "[data-tabindex]", o), o.forEach((r) => {
    const a = r.dataset.tabindex;
    delete r.dataset.tabindex, a ? r.setAttribute("tabindex", a) : r.removeAttribute("tabindex");
  });
}
function gs(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...gs(n, c.id, r)]);
}
function av(n, o) {
  let r = [], a = n.find((c) => c.id === o)?.parentId;
  for (; a; ) {
    const c = n.find((f) => f.id === a);
    a = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function au(n) {
  return `data-base-ui-${n}`;
}
let Hc = 0;
function Zc(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: a = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Hc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (a)
    return f(), Xt;
  const d = requestAnimationFrame(f);
  return Hc = d, () => {
    Hc === d && (cancelAnimationFrame(d), Hc = 0);
  };
}
const Wd = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, sv = "data-base-ui-inert", jh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let rs = /* @__PURE__ */ new WeakMap(), eh = 0;
function bM(n) {
  return jh[n];
}
function r1(n) {
  return n ? da(n) ? n.host : r1(n.parentNode) : null;
}
const cv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const a = r1(r);
  return n.contains(a) ? a : null;
}).filter((r) => r != null), uv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let a = r;
    for (; a && !o.has(a); )
      o.add(a), a = a.parentNode;
  }), o;
}, fv = (n, o, r) => {
  const a = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Ln(d) !== "script" && (o.has(d) ? c(d) : a.push(d));
    });
  };
  return c(n), a;
};
function yM(n, o, r, a, {
  mark: c = !0
}) {
  let f = null;
  a ? f = "inert" : r && (f = "aria-hidden");
  let d = null, p = null;
  const g = cv(o, n), h = c ? fv(o, uv(g), new Set(g)) : [], y = [], v = [];
  if (f) {
    const x = Wd[f], C = bM(f);
    p = C, d = x;
    const w = cv(o, Array.from(o.querySelectorAll("[aria-live]"))), _ = g.concat(w);
    fv(o, uv(_), new Set(_)).forEach((T) => {
      const M = T.getAttribute(f), A = M !== null && M !== "false", k = (x.get(T) || 0) + 1;
      x.set(T, k), y.push(T), k === 1 && A && C.add(T), A || T.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((x) => {
    const C = (rs.get(x) || 0) + 1;
    rs.set(x, C), v.push(x), C === 1 && x.setAttribute(sv, "");
  }), eh += 1, () => {
    d && y.forEach((x) => {
      const w = (d.get(x) || 0) - 1;
      d.set(x, w), w || (!p?.has(x) && f && x.removeAttribute(f), p?.delete(x));
    }), c && v.forEach((x) => {
      const C = (rs.get(x) || 0) - 1;
      rs.set(x, C), C || x.removeAttribute(sv);
    }), eh -= 1, eh || (Wd.inert = /* @__PURE__ */ new WeakMap(), Wd["aria-hidden"] = /* @__PURE__ */ new WeakMap(), jh.inert = /* @__PURE__ */ new WeakSet(), jh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), rs = /* @__PURE__ */ new WeakMap());
  };
}
function dv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: a = !1,
    mark: c = !0
  } = o, f = $t(n[0]).body;
  return yM(n, f, r, a, {
    mark: c
  });
}
const vM = {
  style: {
    transition: "none"
  }
}, xM = "data-base-ui-click-trigger", SM = {
  fallbackAxisSide: "none"
}, EM = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, a1 = /* @__PURE__ */ b.createContext(null), s1 = () => b.useContext(a1), CM = au("portal");
function RM(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: a = dl,
    elementProps: c
  } = n, f = pp(), p = s1()?.portalNode, [g, h] = b.useState(null), [y, v] = b.useState(null), x = Ke((N) => {
    N !== null && v(N);
  }), C = b.useRef(null);
  Fe(() => {
    if (r === null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    const N = (r && (ep(r) ? r : r.current)) ?? p ?? document.body;
    if (N == null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    C.current !== N && (C.current = N, v(null), h(N));
  }, [r, p]);
  const w = Zl("div", a, {
    ref: [o, x],
    props: [{
      id: f,
      [CM]: ""
    }, c]
  }), _ = g && w ? /* @__PURE__ */ pa.createPortal(w, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(w) ? w.props.id : void 0,
    subtree: _
  };
}
const wM = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    container: p,
    ...g
  } = o, {
    node: h,
    nodeId: y,
    subtree: v
  } = RM({
    container: p,
    ref: r,
    componentProps: o,
    elementProps: g
  }), x = b.useRef(null), C = b.useRef(null), w = b.useRef(null), _ = b.useRef(null), [N, T] = b.useState(null), M = b.useRef(!1), A = N?.modal, k = N?.open, H = !!N && !N.modal && N.open && !!h;
  b.useEffect(() => {
    if (!h || A)
      return;
    function G(L) {
      h && L.relatedTarget && ds(L) && (L.type === "focusin" ? M.current && (rv(h), M.current = !1) : (gM(h), M.current = !0));
    }
    return ua(Gt(h, "focusin", G, !0), Gt(h, "focusout", G, !0));
  }, [h, A]), Fe(() => {
    !h || k !== !0 || !M.current || (rv(h), M.current = !1);
  }, [k, h]);
  const P = b.useMemo(() => ({
    beforeOutsideRef: x,
    afterOutsideRef: C,
    beforeInsideRef: w,
    afterInsideRef: _,
    portalNode: h,
    setFocusManagerState: T
  }), [h]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [v, /* @__PURE__ */ S.jsxs(a1.Provider, {
      value: P,
      children: [H && h && /* @__PURE__ */ S.jsx(iu, {
        "data-type": "outside",
        ref: x,
        onFocus: (G) => {
          if (ds(G, h))
            w.current?.focus();
          else {
            const L = N ? N.domReference : null;
            i1(L)?.focus();
          }
        }
      }), H && h && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": y,
        style: EM
      }), h && /* @__PURE__ */ pa.createPortal(d, h), H && h && /* @__PURE__ */ S.jsx(iu, {
        "data-type": "outside",
        ref: C,
        onFocus: (G) => {
          if (ds(G, h))
            _.current?.focus();
          else {
            const L = N ? N.domReference : null;
            o1(L)?.focus(), N?.closeOnFocusOut && N?.onOpenChange(!1, St(Su, G.nativeEvent));
          }
        }
      })]
    })]
  });
});
function _M() {
  const n = /* @__PURE__ */ new Map();
  return {
    emit(o, r) {
      n.get(o)?.forEach((a) => a(r));
    },
    on(o, r) {
      n.has(o) || n.set(o, /* @__PURE__ */ new Set()), n.get(o).add(r);
    },
    off(o, r) {
      n.get(o)?.delete(r);
    }
  };
}
const AM = /* @__PURE__ */ b.createContext(null), MM = /* @__PURE__ */ b.createContext(null), c1 = () => b.useContext(AM)?.id || null, Tu = (n) => {
  const o = b.useContext(MM);
  return n ?? o;
};
function TM(n, o) {
  const r = un(Ml(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const hv = 20;
let Ri = [];
function _p() {
  Ri = Ri.filter((n) => n.deref()?.isConnected);
}
function pv(n) {
  _p(), n && Ln(n) !== "body" && (Ri.push(new WeakRef(n)), Ri.length > hv && (Ri = Ri.slice(-hv)));
}
function mv() {
  return _p(), Ri[Ri.length - 1]?.deref();
}
function OM(n) {
  return n ? wp(n) ? n : Mu(n)[0] || n : null;
}
function gv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = n1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return wp(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), a = n.getAttribute("tabindex");
  r.length === 0 ? a !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (a !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function NM(n) {
  const {
    context: o,
    children: r,
    disabled: a = !1,
    initialFocus: c = !0,
    returnFocus: f = !0,
    restoreFocus: d = !1,
    modal: p = !0,
    closeOnFocusOut: g = !0,
    openInteractionType: h = "",
    nextFocusableElement: y,
    previousFocusableElement: v,
    beforeContentFocusGuardRef: x,
    externalTree: C,
    getInsideElements: w
  } = n, _ = "rootStore" in o ? o.rootStore : o, N = _.useState("open"), T = _.useState("domReferenceElement"), M = _.useState("floatingElement"), {
    events: A,
    dataRef: k
  } = _.context, H = Ke(() => k.current.floatingContext?.nodeId), P = c === !1, G = kh(T) && P, L = fl(c), K = fl(f), te = fl(h), se = fl(N), de = Tu(C), le = s1(), pe = b.useRef(!1), be = b.useRef(!1), V = b.useRef(!1), I = b.useRef(null), Q = b.useRef(""), xe = b.useRef(""), ae = b.useRef(null), z = b.useRef(null), F = cr(ae, x, le?.beforeInsideRef), ne = cr(z, le?.afterInsideRef), oe = Oi(), ge = Oi(), _e = hs(), qe = le != null, Me = zh(M), Te = Ke((ke = Me) => ke ? Mu(ke) : []), it = Ke(() => w?.().filter((ke) => ke != null) ?? []);
  b.useEffect(() => {
    if (a || !p)
      return;
    function ke(Ne) {
      Ne.key === "Tab" && at(Me, Pl($t(Me))) && Te().length === 0 && !G && An(Ne);
    }
    const et = $t(Me);
    return Gt(et, "keydown", ke);
  }, [a, Me, p, G, Te]), b.useEffect(() => {
    if (a || !N)
      return;
    const ke = $t(Me);
    function et() {
      V.current = !1;
    }
    function Ne(He) {
      const Ae = Ml(He), Qe = it(), Oe = at(M, Ae) || at(T, Ae) || at(le?.portalNode, Ae) || Qe.some(($e) => $e === Ae || at($e, Ae));
      V.current = !Oe, xe.current = He.pointerType || "keyboard", Ae?.closest(`[${xM}]`) && (be.current = !0, ge.start(0, () => {
        be.current = !1;
      }));
    }
    function je() {
      xe.current = "keyboard";
    }
    return ua(
      Gt(ke, "pointerdown", Ne, !0),
      Gt(ke, "pointerup", et, !0),
      Gt(ke, "pointercancel", et, !0),
      Gt(ke, "keydown", je, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [a, M, T, Me, N, le, ge, it]), b.useEffect(() => {
    if (a || !g)
      return;
    const ke = $t(Me);
    function et() {
      be.current = !0, ge.start(0, () => {
        be.current = !1;
      });
    }
    function Ne(Qe) {
      const Oe = Ml(Qe);
      wp(Oe) && (I.current = Oe);
    }
    function je(Qe) {
      const Oe = Qe.relatedTarget, $e = Qe.currentTarget, tt = Ml(Qe);
      p && Oe == null && tt != null && at(M, tt) && pv(tt), queueMicrotask(() => {
        const Xe = H(), ve = _.context.triggerElements, Z = it(), ue = Oe?.hasAttribute(au("focus-guard")) && [ae.current, z.current, le?.beforeInsideRef.current, le?.afterInsideRef.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, Fo(v), Fo(y)].includes(Oe), Ie = !(at(T, Oe) || at(M, Oe) || at(Oe, M) || at(le?.portalNode, Oe) || Z.some((Ce) => Ce === Oe || at(Ce, Oe)) || ve.hasMatchingElement((Ce) => at(Ce, Oe)) || ue || de && (gs(de.nodesRef.current, Xe).find((Ce) => at(Ce.context?.elements.floating, Oe) || at(Ce.context?.elements.domReference, Oe)) || av(de.nodesRef.current, Xe).find((Ce) => [Ce.context?.elements.floating, zh(Ce.context?.elements.floating)].includes(Oe) || Ce.context?.elements.domReference === Oe)));
        if ($e === T && Me && gv(Me), d && $e !== T && !Au(tt) && Pl(ke) === ke.body) {
          if (Kt(Me) && (Me.focus(), d === "popup")) {
            _e.request(() => {
              Me.focus();
            });
            return;
          }
          const Ce = Te(), Ge = I.current, nt = (Ge && Ce.includes(Ge) ? Ge : null) || Ce[Ce.length - 1] || Me;
          Kt(nt) && nt.focus();
        }
        if (k.current.insideReactTree) {
          k.current.insideReactTree = !1;
          return;
        }
        (G || !p) && Oe && Ie && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (G || Oe !== mv()) && (pe.current = !0, _.setOpen(!1, St(Su, Qe)));
      });
    }
    function He() {
      V.current || (k.current.insideReactTree = !0, oe.start(0, () => {
        k.current.insideReactTree = !1;
      }));
    }
    const Ae = Kt(T) ? T : null;
    if (!(!M && !Ae))
      return ua(Ae && Gt(Ae, "focusout", je), Ae && Gt(Ae, "pointerdown", et), M && Gt(M, "focusin", Ne), M && Gt(M, "focusout", je), M && le && Gt(M, "focusout", He, !0));
  }, [a, T, M, Me, p, de, le, _, g, d, Te, G, H, k, oe, ge, _e, y, v, it]), b.useEffect(() => {
    if (a || !M || !N)
      return;
    const ke = Array.from(le?.portalNode?.querySelectorAll(`[${au("portal")}]`) || []), Ne = (de ? av(de.nodesRef.current, H()) : []).find(($e) => kh($e.context?.elements.domReference || null))?.context?.elements.domReference, He = [...[M, ...ke, ae.current, z.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, ...it()], Ne, Fo(v), Fo(y), G ? T : null].filter(($e) => $e != null), Ae = dv(He, {
      ariaHidden: p || G,
      mark: !1
    }), Qe = [M, ...ke].filter(($e) => $e != null), Oe = dv(Qe);
    return () => {
      Oe(), Ae();
    };
  }, [N, a, T, M, p, le, G, de, H, y, v, it]), Fe(() => {
    if (!N || a || !Kt(Me))
      return;
    Q.current = "", xe.current = "";
    const ke = $t(Me), et = Pl(ke);
    queueMicrotask(() => {
      const Ne = L.current, je = typeof Ne == "function" ? Ne(te.current || "") : Ne;
      if (je === void 0 || je === !1 || at(Me, et))
        return;
      let Ae = null;
      const Qe = () => (Ae == null && (Ae = Te(Me)), Ae[0] || Me);
      let Oe;
      je === !0 || je === null ? Oe = Qe() : Oe = Fo(je), Oe = Oe || Qe();
      const $e = at(Me, Pl(ke));
      Zc(Oe, {
        preventScroll: Oe === Me,
        shouldFocus() {
          if (!se.current)
            return !1;
          if ($e)
            return !0;
          const tt = Pl(ke);
          return !(tt !== Oe && at(Me, tt));
        }
      });
    });
  }, [a, N, Me, Te, L, te, se]), Fe(() => {
    if (a || !Me)
      return;
    const ke = $t(Me), et = Pl(ke), Ne = te.current == null;
    pv(et);
    function je(Ae) {
      if (Ae.open || (Q.current = TM(Ae.nativeEvent, xe.current)), Ae.reason === T2 && Ae.nativeEvent.type === "mouseleave" && (pe.current = !0), Ae.reason === mp)
        if (Ae.nested)
          pe.current = !1;
        else if (Fx(Ae.nativeEvent) || xp(Ae.nativeEvent))
          pe.current = !1;
        else {
          let Qe = !1;
          $t(Me).createElement("div").focus({
            get preventScroll() {
              return Qe = !0, !1;
            }
          }), Qe ? pe.current = !1 : pe.current = !0;
        }
    }
    A.on("openchange", je);
    function He(Ae) {
      const Qe = K.current;
      let Oe = typeof Qe == "function" ? Qe(Ae) : Qe;
      if (Oe === void 0 || Oe === !1)
        return null;
      Oe === null && (Oe = !0);
      const $e = T?.isConnected ? T : null, tt = et?.isConnected && Ln(et) !== "body" ? et : null;
      let Xe = Ne ? tt || $e : $e || tt;
      return Xe || (Xe = mv() || null), typeof Oe == "boolean" ? Xe : Fo(Oe) || Xe || null;
    }
    return () => {
      A.off("openchange", je);
      const Ae = Pl(ke), Qe = it(), Oe = at(M, Ae) || Qe.some((ve) => ve === Ae || at(ve, Ae)) || de && gs(de.nodesRef.current, H(), !1).some((ve) => at(ve.context?.elements.floating, Ae)), $e = K.current, tt = Q.current, Xe = He(tt);
      queueMicrotask(() => {
        const ve = OM(Xe), Z = typeof $e != "boolean";
        if ($e && !pe.current && Kt(ve) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Z && ve !== Ae && Ae !== ke.body) || Oe)) {
          const ue = {
            preventScroll: !0
          };
          tt === "keyboard" && (ue.focusVisible = !0), ve.focus(ue);
        }
        pe.current = !1;
      });
    };
  }, [a, M, Me, K, te, A, de, T, H, it]), Fe(() => {
    if (!yr || N || !M)
      return;
    const ke = Pl($t(M));
    !Kt(ke) || !Ep(ke) || at(M, ke) && ke.blur();
  }, [N, M]), Fe(() => {
    if (!(a || !le))
      return le.setFocusManagerState({
        modal: p,
        closeOnFocusOut: g,
        open: N,
        onOpenChange: _.setOpen,
        domReference: T
      }), () => {
        le.setFocusManagerState(null);
      };
  }, [a, le, p, N, _, g, T]), Fe(() => {
    if (!(a || !Me))
      return gv(Me), () => {
        queueMicrotask(_p);
      };
  }, [a, Me]);
  const gt = !a && (p ? !G : !0) && (qe || p);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [gt && /* @__PURE__ */ S.jsx(iu, {
      "data-type": "inside",
      ref: F,
      onFocus: (ke) => {
        if (p) {
          const et = Te();
          Zc(et[et.length - 1]);
        } else le?.portalNode && (pe.current = !1, ds(ke, le.portalNode) ? o1(T)?.focus() : Fo(v ?? le.beforeOutsideRef)?.focus());
      }
    }), r, gt && /* @__PURE__ */ S.jsx(iu, {
      "data-type": "inside",
      ref: ne,
      onFocus: (ke) => {
        p ? Zc(Te()[0]) : le?.portalNode && (g && (pe.current = !0), ds(ke, le.portalNode) ? i1(T)?.focus() : Fo(y ?? le.afterOutsideRef)?.focus());
      }
    })]
  });
}
function u1(n, o = {}) {
  const {
    enabled: r = !0,
    event: a = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: p = 0,
    reason: g = Px
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, v = b.useRef(void 0), x = hs(), C = Oi(), w = b.useMemo(() => {
    function _(T, M, A, k) {
      const H = St(g, M, A);
      T && k === "touch" && p > 0 ? C.start(p, () => {
        h.setOpen(!0, H);
      }) : h.setOpen(T, H);
    }
    function N(T, M, A) {
      const k = y.current.openEvent, H = h.select("domReferenceElement") !== M;
      return T && H || !T || !c ? !0 : k && d ? !A(k.type) : !1;
    }
    return {
      onPointerDown(T) {
        v.current = Qd(T.pointerType) && xp(T.nativeEvent) ? "virtual" : T.pointerType;
      },
      onMouseDown(T) {
        const M = v.current, A = T.nativeEvent, k = h.select("open");
        if (T.button !== 0 || a === "click" || Qd(M) && f)
          return;
        const H = N(k, T.currentTarget, (L) => L === "click" || L === "mousedown"), P = Ml(A);
        if (Ep(P)) {
          _(H, A, P, M);
          return;
        }
        const G = T.currentTarget;
        x.request(() => {
          _(H, A, G, M);
        });
      },
      onClick(T) {
        if (a === "mousedown-only")
          return;
        const M = v.current;
        if (a === "mousedown" && M) {
          v.current = void 0;
          return;
        }
        if (Qd(M) && f)
          return;
        const A = h.select("open"), k = N(A, T.currentTarget, (H) => H === "click" || H === "mousedown" || H === "keydown" || H === "keyup");
        _(k, T.nativeEvent, T.currentTarget, M);
      },
      onKeyDown() {
        v.current = void 0;
      }
    };
  }, [y, a, f, g, h, d, c, x, C, p]);
  return b.useMemo(() => r ? {
    reference: w
  } : dl, [r, w]);
}
function kM() {
  return !1;
}
function zM(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function DM(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: a = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = kM,
    bubbles: p,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), v = h.useState("floatingElement"), {
    dataRef: x
  } = h.context, C = Tu(g), w = Ke(typeof c == "function" ? c : () => !1), _ = typeof c == "function" ? w : c, N = _ !== !1, T = Ke(() => f), {
    escapeKey: M,
    outsidePress: A
  } = zM(p), k = b.useRef(!1), H = b.useRef(!1), P = b.useRef(!1), G = b.useRef(!1), L = b.useRef(""), K = b.useRef(null), te = Oi(), se = Oi(), de = Ke(() => {
    se.clear(), x.current.insideReactTree = !1;
  }), le = Ke((F) => {
    const ne = x.current.floatingContext?.nodeId;
    return (C ? gs(C.nodesRef.current, ne) : []).some((ge) => ge.context?.open && !ge.context.dataRef.current[F]);
  }), pe = Ke((F) => Zd(F, h.select("floatingElement")) || Zd(F, h.select("domReferenceElement"))), be = Ke((F) => {
    d() && h.setOpen(!1, St(Px, F.nativeEvent));
  }), V = Ke((F) => {
    if (!y || !r || !a || F.key !== "Escape" || G.current || !M && le("__escapeKeyBubbles"))
      return;
    const ne = iM(F) ? F.nativeEvent : F, oe = St(gp, ne);
    h.setOpen(!1, oe), oe.isCanceled || F.preventDefault(), !M && !oe.isPropagationAllowed && F.stopPropagation();
  }), I = Ke(() => {
    x.current.insideReactTree = !0, se.start(0, de);
  }), Q = Ke((F) => {
    if (!y || !r || F.button !== 0)
      return;
    const ne = Ml(F.nativeEvent);
    at(h.select("floatingElement"), ne) && (k.current || (k.current = !0, H.current = !1));
  }), xe = Ke((F) => {
    !y || !r || (F.defaultPrevented || F.nativeEvent.defaultPrevented) && k.current && (H.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return de;
    x.current.__escapeKeyBubbles = M, x.current.__outsidePressBubbles = A;
    const F = new ur(), ne = new ur();
    function oe() {
      F.clear(), G.current = !0;
    }
    function ge() {
      F.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        yr ? 5 : 0,
        () => {
          G.current = !1;
        }
      );
    }
    function _e() {
      P.current = !0, ne.start(0, () => {
        P.current = !1;
      });
    }
    function qe() {
      k.current = !1, H.current = !1;
    }
    function Me() {
      const Z = L.current, ue = Z === "pen" || !Z ? "mouse" : Z, Ie = T(), Ce = typeof Ie == "function" ? Ie() : Ie;
      return typeof Ce == "string" ? Ce : Ce[ue];
    }
    function Te(Z) {
      const ue = Me();
      return ue === "intentional" && Z.type !== "click" || ue === "sloppy" && Z.type === "click";
    }
    function it(Z) {
      const ue = x.current.floatingContext?.nodeId, Ie = C && gs(C.nodesRef.current, ue).some((Ce) => Zd(Z, Ce.context?.elements.floating));
      return pe(Z) || Ie;
    }
    function gt(Z) {
      if (Te(Z)) {
        Z.type !== "click" && !pe(Z) && (ne.clear(), P.current = !1), de();
        return;
      }
      if (x.current.insideReactTree) {
        de();
        return;
      }
      const ue = Ml(Z), Ie = `[${au("inert")}]`, Ce = cn(ue) ? ue.getRootNode() : null, Ge = Array.from((da(Ce) ? Ce : $t(h.select("floatingElement"))).querySelectorAll(Ie)), nt = h.context.triggerElements;
      if (ue && (nt.hasElement(ue) || nt.hasMatchingElement((Ct) => at(Ct, ue))))
        return;
      let Mt = cn(ue) ? ue : null;
      for (; Mt && !wi(Mt); ) {
        const Ct = Mi(Mt);
        if (wi(Ct) || !cn(Ct))
          break;
        Mt = Ct;
      }
      if (!(Ge.length && cn(ue) && !sM(ue) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !at(ue, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((Ct) => !at(Mt, Ct)))) {
        if (Kt(ue) && !("touches" in Z)) {
          const Ct = wi(ue), Bt = hl(ue), kt = /auto|scroll/, vt = Ct || kt.test(Bt.overflowX), Ft = Ct || kt.test(Bt.overflowY), dt = vt && ue.clientWidth > 0 && ue.scrollWidth > ue.clientWidth, Wt = Ft && ue.clientHeight > 0 && ue.scrollHeight > ue.clientHeight, ut = Bt.direction === "rtl", En = Wt && (ut ? Z.offsetX <= ue.offsetWidth - ue.clientWidth : Z.offsetX > ue.clientWidth), Cn = dt && Z.offsetY > ue.clientHeight;
          if (En || Cn)
            return;
        }
        if (!it(Z)) {
          if (Me() === "intentional" && P.current) {
            ne.clear(), P.current = !1;
            return;
          }
          typeof _ == "function" && !_(Z) || le("__outsidePressBubbles") || (h.setOpen(!1, St(mp, Z)), de());
        }
      }
    }
    function ke(Z) {
      Me() !== "sloppy" || Z.pointerType === "touch" || !h.select("open") || !r || pe(Z) || gt(Z);
    }
    function et(Z) {
      if (Me() !== "sloppy" || !h.select("open") || !r || pe(Z))
        return;
      const ue = Z.touches[0];
      ue && (K.current = {
        startTime: Date.now(),
        startX: ue.clientX,
        startY: ue.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, te.start(1e3, () => {
        K.current && (K.current.dismissOnTouchEnd = !1, K.current.dismissOnMouseDown = !1);
      }));
    }
    function Ne(Z, ue) {
      const Ie = Ml(Z);
      if (!Ie)
        return;
      const Ce = Gt(Ie, Z.type, () => {
        ue(Z), Ce();
      });
    }
    function je(Z) {
      L.current = "touch", Ne(Z, et);
    }
    function He(Z) {
      te.clear(), Z.type === "pointerdown" && (L.current = Z.pointerType), !(Z.type === "mousedown" && K.current && !K.current.dismissOnMouseDown) && Ne(Z, (ue) => {
        ue.type === "pointerdown" ? ke(ue) : gt(ue);
      });
    }
    function Ae(Z) {
      if (!k.current)
        return;
      const ue = H.current;
      if (qe(), Me() === "intentional") {
        if (Z.type === "pointercancel") {
          ue && _e();
          return;
        }
        if (!it(Z)) {
          if (ue) {
            _e();
            return;
          }
          typeof _ == "function" && !_(Z) || (ne.clear(), P.current = !0, de());
        }
      }
    }
    function Qe(Z) {
      if (Me() !== "sloppy" || !K.current || pe(Z))
        return;
      const ue = Z.touches[0];
      if (!ue)
        return;
      const Ie = Math.abs(ue.clientX - K.current.startX), Ce = Math.abs(ue.clientY - K.current.startY), Ge = Math.sqrt(Ie * Ie + Ce * Ce);
      Ge > 5 && (K.current.dismissOnTouchEnd = !0), Ge > 10 && (gt(Z), te.clear(), K.current = null);
    }
    function Oe(Z) {
      Ne(Z, Qe);
    }
    function $e(Z) {
      Me() !== "sloppy" || !K.current || pe(Z) || (K.current.dismissOnTouchEnd && gt(Z), te.clear(), K.current = null);
    }
    function tt(Z) {
      Ne(Z, $e);
    }
    const Xe = $t(v), ve = ua(a && ua(Gt(Xe, "keydown", V), Gt(Xe, "compositionstart", oe), Gt(Xe, "compositionend", ge)), N && ua(Gt(Xe, "click", He, !0), Gt(Xe, "pointerdown", He, !0), Gt(Xe, "pointerup", Ae, !0), Gt(Xe, "pointercancel", Ae, !0), Gt(Xe, "mousedown", He, !0), Gt(Xe, "mouseup", Ae, !0), Gt(Xe, "touchstart", je, !0), Gt(Xe, "touchmove", Oe, !0), Gt(Xe, "touchend", tt, !0)));
    return () => {
      ve(), F.clear(), ne.clear(), qe(), P.current = !1, de();
    };
  }, [x, v, a, N, _, y, r, M, A, V, de, T, le, pe, C, h, te]);
  const ae = b.useMemo(() => ({
    onKeyDown: V,
    onPointerDown: be,
    onClick: be
  }), [V, be]), z = b.useMemo(() => ({
    onKeyDown: V,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: xe,
    onMouseDown: xe,
    onClickCapture: I,
    onMouseDownCapture(F) {
      I(), Q(F);
    },
    onPointerDownCapture(F) {
      I(), Q(F);
    },
    onMouseUpCapture: I,
    onTouchEndCapture: I,
    onTouchMoveCapture: I
  }), [V, I, Q, xe]);
  return b.useMemo(() => r ? {
    reference: ae,
    floating: z,
    trigger: ae
  } : {}, [r, ae, z]);
}
var th = { exports: {} }, nh = {};
var bv;
function jM() {
  if (bv) return nh;
  bv = 1;
  var n = vs();
  function o(v, x) {
    return v === x && (v !== 0 || 1 / v === 1 / x) || v !== v && x !== x;
  }
  var r = typeof Object.is == "function" ? Object.is : o, a = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function p(v, x) {
    var C = x(), w = a({ inst: { value: C, getSnapshot: x } }), _ = w[0].inst, N = w[1];
    return f(
      function() {
        _.value = C, _.getSnapshot = x, g(_) && N({ inst: _ });
      },
      [v, C, x]
    ), c(
      function() {
        return g(_) && N({ inst: _ }), v(function() {
          g(_) && N({ inst: _ });
        });
      },
      [v]
    ), d(C), C;
  }
  function g(v) {
    var x = v.getSnapshot;
    v = v.value;
    try {
      var C = x();
      return !r(v, C);
    } catch {
      return !0;
    }
  }
  function h(v, x) {
    return x();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : p;
  return nh.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, nh;
}
var yv;
function f1() {
  return yv || (yv = 1, th.exports = jM()), th.exports;
}
var LM = f1(), lh = { exports: {} }, oh = {};
var vv;
function VM() {
  if (vv) return oh;
  vv = 1;
  var n = vs(), o = f1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, p = n.useMemo, g = n.useDebugValue;
  return oh.useSyncExternalStoreWithSelector = function(h, y, v, x, C) {
    var w = f(null);
    if (w.current === null) {
      var _ = { hasValue: !1, value: null };
      w.current = _;
    } else _ = w.current;
    w = p(
      function() {
        function T(P) {
          if (!M) {
            if (M = !0, A = P, P = x(P), C !== void 0 && _.hasValue) {
              var G = _.value;
              if (C(G, P))
                return k = G;
            }
            return k = P;
          }
          if (G = k, a(A, P)) return G;
          var L = x(P);
          return C !== void 0 && C(G, L) ? (A = P, G) : (A = P, k = L);
        }
        var M = !1, A, k, H = v === void 0 ? null : v;
        return [
          function() {
            return T(y());
          },
          H === null ? void 0 : function() {
            return T(H());
          }
        ];
      },
      [y, v, x, C]
    );
    var N = c(h, w[0], w[1]);
    return d(
      function() {
        _.hasValue = !0, _.value = N;
      },
      [N]
    ), g(N), N;
  }, oh;
}
var xv;
function IM() {
  return xv || (xv = 1, lh.exports = VM()), lh.exports;
}
var HM = IM();
const UM = fp(19), BM = UM ? YM : qM;
function Se(n, o, r, a, c) {
  return BM(n, o, r, a, c);
}
function GM(n, o, r, a, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, a, c), [n, o, r, a, c]);
  return LM.useSyncExternalStore(n.subscribe, f, f);
}
function YM(n, o, r, a, c) {
  return GM(n, o, r, a, c);
}
function qM(n, o, r, a, c) {
  return HM.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, a, c));
}
class d1 {
  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */
  // Internal state to handle recursive `setState()` calls
  constructor(o) {
    this.state = o, this.listeners = /* @__PURE__ */ new Set(), this.updateTick = 0;
  }
  /**
   * Registers a listener that will be called whenever the store's state changes.
   *
   * @param fn The listener function to be called on state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribe = (o) => (this.listeners.add(o), () => {
    this.listeners.delete(o);
  });
  /**
   * Returns the current state of the store.
   */
  getSnapshot = () => this.state;
  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(o) {
    if (this.state === o)
      return;
    this.state = o, this.updateTick += 1;
    const r = this.updateTick;
    for (const a of this.listeners) {
      if (r !== this.updateTick)
        return;
      a(o);
    }
  }
  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(o) {
    for (const r in o)
      if (!Object.is(this.state[r], o[r])) {
        this.setState({
          ...this.state,
          ...o
        });
        return;
      }
  }
  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(o, r) {
    Object.is(this.state[o], r) || this.setState({
      ...this.state,
      [o]: r
    });
  }
  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const o = {
      ...this.state
    };
    this.setState(o);
  }
  use(o, r, a, c) {
    return Se(this, o, r, a, c);
  }
}
class PM extends d1 {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(o, r = {}, a) {
    super(o), this.context = r, this.selectors = a;
  }
  /**
   * Non-reactive values such as refs, callbacks, etc.
   */
  /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValue(o, r) {
    b.useDebugValue(o);
    const a = this;
    Fe(() => {
      a.state[o] !== r && a.set(o, r);
    }, [a, o, r]);
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(o, r) {
    const a = this;
    Fe(() => (a.state[o] !== r && a.set(o, r), () => {
      a.set(o, void 0);
    }), [a, o, r]);
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(o) {
    const r = this, a = Object.values(o);
    Fe(() => {
      r.update(o);
    }, [r, ...a]);
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(o, r) {
    b.useDebugValue(o);
    const a = this, c = r !== void 0;
    Fe(() => {
      c && !Object.is(a.state[o], r) && a.setState({
        ...a.state,
        [o]: r
      });
    }, [a, o, r, c]);
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(o, r, a, c) {
    const f = this.selectors[o];
    return f(this.state, r, a, c);
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(o, r, a, c) {
    return b.useDebugValue(o), Se(this, this.selectors[o], r, a, c);
  }
  /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */
  useContextCallback(o, r) {
    b.useDebugValue(o);
    const a = Ke(r ?? Xt);
    this.context[o] = a;
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(o) {
    const r = b.useRef(void 0);
    return r.current === void 0 && (r.current = (a) => {
      this.set(o, a);
    }), r.current;
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(o, r) {
    let a;
    typeof o == "function" ? a = o : a = this.selectors[o];
    let c = a(this.state);
    return r(c, c, this), this.subscribe((f) => {
      const d = a(f);
      if (!Object.is(c, d)) {
        const p = c;
        c = d, r(d, p, this);
      }
    });
  }
}
const XM = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class KM extends PM {
  constructor(o) {
    const {
      syncOnly: r,
      nested: a,
      onOpenChange: c,
      triggerElements: f,
      ...d
    } = o;
    super({
      ...d,
      positionReference: d.referenceElement,
      domReferenceElement: d.referenceElement
    }, {
      onOpenChange: c,
      dataRef: {
        current: {}
      },
      events: _M(),
      nested: a,
      triggerElements: f
    }, XM), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && rM(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
  };
  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (o, r) => {
    this.syncOpenEvent(o, r.event);
    const a = {
      open: o,
      reason: r.reason,
      nativeEvent: r.event,
      nested: this.context.nested,
      triggerElement: r.trigger
    };
    this.context.events.emit("openchange", a);
  };
  /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */
  setOpen = (o, r) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(o, r);
      return;
    }
    this.dispatchOpenChange(o, r), this.context.onOpenChange?.(o, r);
  };
}
const FM = {
  tabIndex: -1,
  [Nh]: ""
};
class QM {
  constructor() {
    this.idMap = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(o, r) {
    this.idMap.set(o, r);
  }
  /**
   * Removes the trigger element with the given ID.
   */
  delete(o) {
    this.idMap.delete(o);
  }
  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(o) {
    for (const r of this.idMap.values())
      if (r === o)
        return !0;
    return !1;
  }
  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(o) {
    for (const r of this.idMap.values())
      if (o(r))
        return !0;
    return !1;
  }
  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(o) {
    return this.idMap.get(o);
  }
  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries();
  }
  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.idMap.values();
  }
  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size;
  }
}
function ZM(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: a = {}
  } = n, c = pp(), f = c1() != null, d = Tl(() => new KM({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: a.reference ?? null,
    floatingElement: a.floating ?? null,
    triggerElements: new QM(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Fe(() => {
    const p = {
      open: o,
      floatingId: c
    };
    a.reference !== void 0 && (p.referenceElement = a.reference, p.domReferenceElement = cn(a.reference) ? a.reference : null), a.floating !== void 0 && (p.floatingElement = a.floating), d.update(p);
  }, [o, c, a.reference, a.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function $M(n) {
  return JM(n, n.rootContext);
}
function JM(n, o) {
  const {
    nodeId: r,
    externalTree: a
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), p = o.useState("open"), g = o.useState("floatingId"), [h, y] = b.useState(null), [v, x] = b.useState(void 0), [C, w] = b.useState(void 0), _ = b.useRef(null), N = Tu(a), T = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), M = U_({
    ...n,
    elements: {
      ...T,
      ...h && {
        reference: h
      }
    }
  }), A = cn(v) ? v : null, k = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", v ?? null), o.useSyncedValue("domReferenceElement", v === void 0 ? d : A), o.useSyncedValue("floatingElement", k);
  const H = b.useCallback((se) => {
    const de = cn(se) ? {
      getBoundingClientRect: () => se.getBoundingClientRect(),
      getClientRects: () => se.getClientRects(),
      contextElement: se
    } : se;
    y(de), M.refs.setReference(de);
  }, [M.refs]), P = b.useCallback((se) => {
    (cn(se) || se === null) && (_.current = se, x(se)), (cn(M.refs.reference.current) || M.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    se !== null && !cn(se)) && M.refs.setReference(se);
  }, [M.refs, x]), G = b.useCallback((se) => {
    w(se), M.refs.setFloating(se);
  }, [M.refs]), L = b.useMemo(() => ({
    ...M.refs,
    setReference: P,
    setFloating: G,
    setPositionReference: H,
    domReference: _
  }), [M.refs, P, G, H]), K = b.useMemo(() => ({
    ...M.elements,
    domReference: d
  }), [M.elements, d]), te = b.useMemo(() => ({
    ...M,
    dataRef: o.context.dataRef,
    open: p,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: L,
    elements: K,
    nodeId: r,
    rootStore: o
  }), [M, L, K, r, o, p, g]);
  return Fe(() => {
    d && (_.current = d);
  }, [d]), Fe(() => {
    o.context.dataRef.current.floatingContext = te;
    const se = N?.nodesRef.current.find((de) => de.id === r);
    se && (se.context = te);
  }), b.useMemo(() => ({
    ...M,
    context: te,
    refs: L,
    elements: K,
    rootStore: o
  }), [M, L, K, te, o]);
}
const WM = "Escape";
function Sv(n) {
  return yr && n.movementX === 0 && n.movementY === 0;
}
function Ou(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function Uc(n, o) {
  return Ou(o, n === Sp || n === _u, n === ir || n === rr);
}
function ih(n, o, r) {
  return Ou(o, n === _u, r ? n === ir : n === rr) || n === "Enter" || n === " " || n === "";
}
function eT(n, o, r) {
  return Ou(o, r ? n === ir : n === rr, n === _u);
}
function tT(n, o, r, a) {
  const c = r ? n === rr : n === ir, f = n === Sp;
  return o === "both" || o === "horizontal" && a ? n === WM : Ou(o, c, f);
}
function nT(n, o) {
  const {
    listRef: r,
    activeIndex: a,
    onNavigate: c = () => {
    },
    enabled: f = !0,
    selectedIndex: d = null,
    allowEscape: p = !1,
    loopFocus: g = !1,
    nested: h = !1,
    rtl: y = !1,
    virtual: v = !1,
    focusItemOnOpen: x = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: w = !0,
    disabledIndices: _ = void 0,
    orientation: N = "vertical",
    parentOrientation: T,
    id: M,
    resetOnPointerLeave: A = !0,
    externalTree: k,
    grid: H
  } = o, P = H != null, G = "rootStore" in n ? n.rootStore : n, L = G.useState("open"), K = G.useState("floatingElement"), te = G.useState("domReferenceElement"), se = G.context.dataRef, de = zh(K), le = kh(te), pe = fl(de), be = c1(), V = Tu(k), I = b.useRef(x), Q = b.useRef(d ?? -1), xe = b.useRef(null), ae = b.useRef(!0), z = Ke((Z) => {
    c(Q.current === -1 ? null : Q.current, Z);
  }), F = b.useRef(!!K), ne = b.useRef(L), oe = b.useRef(!1), ge = b.useRef(!1), _e = b.useRef(null), qe = fl(_), Me = fl(L), Te = fl(d), it = fl(A), gt = hs(), ke = hs(), et = Ke(() => {
    function Z(Ge) {
      v ? V?.events.emit("virtualfocus", Ge) : _e.current = Zc(Ge, {
        sync: oe.current,
        preventScroll: !0
      });
    }
    const ue = r.current[Q.current], Ie = ge.current;
    ue && Z(ue), (oe.current ? (Ge) => Ge() : (Ge) => gt.request(Ge))(() => {
      const Ge = r.current[Q.current] || ue;
      if (!Ge)
        return;
      ue || Z(Ge), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Oe && (Ie || !ae.current) && Ge.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Fe(() => {
    se.current.orientation = N;
  }, [se, N]), Fe(() => {
    f && (L && K ? (Q.current = d ?? -1, I.current && d != null && (ge.current = !0, z())) : F.current && (Q.current = -1, z()));
  }, [f, L, K, d, z]), Fe(() => {
    if (f) {
      if (!L) {
        oe.current = !1;
        return;
      }
      if (K)
        if (a == null) {
          if (oe.current = !1, Te.current != null)
            return;
          if (F.current && (Q.current = -1, et()), (!ne.current || !F.current) && I.current && (xe.current != null || I.current === !0 && xe.current == null)) {
            let Z = 0;
            const ue = () => {
              r.current[0] == null ? (Z < 2 && (Z ? (Ce) => ke.request(Ce) : queueMicrotask)(ue), Z += 1) : (Q.current = xe.current == null || ih(xe.current, N, y) || h ? $d(r) : iv(r), xe.current = null, z());
            };
            ue();
          }
        } else ms(r.current, a) || (Q.current = a, et(), ge.current = !1);
    }
  }, [f, L, K, a, Te, h, r, N, y, z, et, ke]), Fe(() => {
    if (!f || K || !V || v || !F.current)
      return;
    const Z = V.nodesRef.current, ue = Z.find((Ge) => Ge.id === be)?.context?.elements.floating, Ie = Pl($t(te ?? ue ?? null)), Ce = Z.some((Ge) => Ge.context && at(Ge.context.elements.floating, Ie));
    ue && !Ce && ae.current && ue.focus({
      preventScroll: !0
    });
  }, [f, K, te, V, be, v]), Fe(() => {
    ne.current = L, F.current = !!K;
  }), Fe(() => {
    L || (xe.current = null, I.current = x);
  }, [L, x]);
  const Ne = a != null, je = Ke((Z) => {
    if (!Me.current)
      return;
    const ue = r.current.indexOf(Z.currentTarget);
    ue !== -1 && (Q.current !== ue || a !== ue) && (Q.current = ue, z(Z));
  }), He = Ke(() => T ?? V?.nodesRef.current.find((Z) => Z.id === be)?.context?.dataRef?.current.orientation), Ae = Ke(() => $d(r, qe.current)), Qe = Ke((Z) => {
    if (ae.current = !1, oe.current = !0, Z.which === 229 || !Me.current && Z.currentTarget === pe.current)
      return;
    if (h && tT(Z.key, N, y, P)) {
      Uc(Z.key, He()) || An(Z), G.setOpen(!1, St(Oh, Z.nativeEvent)), Kt(te) && (v ? V?.events.emit("virtualfocus", te) : te.focus());
      return;
    }
    const ue = Q.current, Ie = $d(r, _), Ce = iv(r, _);
    if (le || (Z.key === "Home" && (An(Z), Q.current = Ie, z(Z)), Z.key === "End" && (An(Z), Q.current = Ce, z(Z))), H != null) {
      const Ge = H(Z, Q.current, r, N, g, y, _, Ie, Ce);
      if (Ge != null && (Q.current = Ge, z(Z)), N === "both")
        return;
    }
    if (Uc(Z.key, N)) {
      if (An(Z), L && !v && Pl(Z.currentTarget.ownerDocument) === Z.currentTarget) {
        Q.current = ih(Z.key, N, y) ? Ie : Ce, z(Z);
        return;
      }
      ih(Z.key, N, y) ? g ? ue >= Ce ? p && ue !== r.current.length ? Q.current = -1 : (oe.current = !1, Q.current = Ie) : Q.current = Wn(r.current, {
        startingIndex: ue,
        disabledIndices: _
      }) : Q.current = Math.min(Ce, Wn(r.current, {
        startingIndex: ue,
        disabledIndices: _
      })) : g ? ue <= Ie ? p && ue !== -1 ? Q.current = r.current.length : (oe.current = !1, Q.current = Ce) : Q.current = Wn(r.current, {
        startingIndex: ue,
        decrement: !0,
        disabledIndices: _
      }) : Q.current = Math.max(Ie, Wn(r.current, {
        startingIndex: ue,
        decrement: !0,
        disabledIndices: _
      })), ms(r.current, Q.current) && (Q.current = -1), z(Z);
    }
  }), Oe = b.useMemo(() => ({
    onFocus(ue) {
      oe.current = !0, je(ue);
    },
    onClick: ({
      currentTarget: ue
    }) => ue.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(ue) {
      Sv(ue) || (oe.current = !0, ge.current = !1, C && je(ue));
    },
    onPointerLeave(ue) {
      if (!Me.current || !ae.current || ue.pointerType === "touch")
        return;
      oe.current = !0;
      const Ie = ue.relatedTarget;
      if (!(!C || r.current.includes(Ie)) && it.current && (_e.current?.(), _e.current = null, Q.current = -1, z(ue), !v)) {
        const Ce = pe.current, Ge = Pl($t(Ce));
        Ce && at(Ce, Ge) && Ce.focus({
          preventScroll: !0
        });
      }
    }
  }), [je, Me, pe, C, r, z, it, v]), $e = b.useMemo(() => v && L && Ne && {
    "aria-activedescendant": `${M}-${a}`
  }, [v, L, Ne, M, a]), tt = b.useMemo(() => ({
    "aria-orientation": N === "both" ? void 0 : N,
    ...le ? {} : $e,
    onKeyDown(Z) {
      if (Z.key === "Tab" && Z.shiftKey && L && !v) {
        const ue = Ml(Z.nativeEvent);
        if (ue && !at(pe.current, ue))
          return;
        An(Z), G.setOpen(!1, St(Su, Z.nativeEvent)), Kt(te) && te.focus();
        return;
      }
      Qe(Z);
    },
    onPointerMove(Z) {
      Sv(Z) || (ae.current = !0);
    }
  }), [$e, Qe, pe, N, le, G, L, v, te]), Xe = b.useMemo(() => {
    function Z(Ce) {
      G.setOpen(!0, St(Oh, Ce.nativeEvent, Ce.currentTarget));
    }
    function ue(Ce) {
      x === "auto" && Fx(Ce.nativeEvent) && (I.current = !v);
    }
    function Ie(Ce) {
      I.current = x, x === "auto" && xp(Ce.nativeEvent) && (I.current = !0);
    }
    return {
      onKeyDown(Ce) {
        const Ge = G.select("open");
        ae.current = !1;
        const nt = Ce.key.startsWith("Arrow"), Mt = eT(Ce.key, He(), y), Ct = Uc(Ce.key, N), Bt = (h ? Mt : Ct) || Ce.key === "Enter" || Ce.key.trim() === "";
        if (v && Ge)
          return Qe(Ce);
        if (!(!Ge && !w && nt)) {
          if (Bt) {
            const kt = Uc(Ce.key, He());
            xe.current = h && kt ? null : Ce.key;
          }
          if (h) {
            Mt && (An(Ce), Ge ? (Q.current = Ae(), z(Ce)) : Z(Ce));
            return;
          }
          Ct && (Te.current != null && (Q.current = Te.current), An(Ce), !Ge && w ? Z(Ce) : Qe(Ce), Ge && z(Ce));
        }
      },
      onFocus(Ce) {
        G.select("open") && !v && (Q.current = -1, z(Ce));
      },
      onPointerDown: Ie,
      onPointerEnter: Ie,
      onMouseDown: ue,
      onClick: ue
    };
  }, [Qe, x, Ae, h, z, G, w, N, He, y, Te, v]), ve = b.useMemo(() => ({
    ...$e,
    ...Xe
  }), [$e, Xe]);
  return b.useMemo(() => f ? {
    reference: ve,
    floating: tt,
    item: Oe,
    trigger: Xe
  } : {}, [f, ve, tt, Xe, Oe]);
}
function lT(n, o) {
  const {
    listRef: r,
    elementsRef: a,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: p,
    enabled: g = !0,
    resetMs: h = 750,
    selectedIndex: y = null
  } = o, v = "rootStore" in n ? n.rootStore : n, x = v.useState("open"), C = Oi(), w = b.useRef(""), _ = b.useRef(y ?? c ?? -1), N = b.useRef(null), T = Ke((k) => {
    function H(pe) {
      return a?.current[pe];
    }
    function P(pe) {
      const be = H(pe);
      return be && !Au(be) || be?.matches(":disabled") ? !1 : d == null || !ru(ra, pe, d);
    }
    function G(pe, be, V = 0) {
      if (pe.length === 0)
        return -1;
      const I = (V % pe.length + pe.length) % pe.length, Q = be.toLowerCase();
      for (let xe = 0; xe < pe.length; xe += 1) {
        const ae = (I + xe) % pe.length;
        if (!(!pe[ae]?.toLowerCase().startsWith(Q) || !P(ae)))
          return ae;
      }
      return -1;
    }
    const L = r.current;
    if (w.current.length > 0 && k.key === " " && (An(k), p?.(!0)), w.current.length > 0 && w.current[0] !== " " && G(L, w.current) === -1 && k.key !== " " && p?.(!1), L == null || // Character key.
    k.key.length !== 1 || // Modifier key.
    k.ctrlKey || k.metaKey || k.altKey)
      return;
    x && k.key !== " " && (An(k), p?.(!0));
    const K = w.current === "";
    K && (_.current = y ?? c ?? -1), L.every((pe, be) => pe && P(be) ? pe[0]?.toLowerCase() !== pe[1]?.toLowerCase() : !0) && w.current === k.key && (w.current = "", _.current = N.current), w.current += k.key, C.start(h, () => {
      w.current = "", _.current = N.current, p?.(!1);
    });
    const de = ((K ? y ?? c ?? -1 : _.current) ?? 0) + 1, le = G(L, w.current, de);
    le !== -1 ? (f?.(le), N.current = le) : k.key !== " " && (w.current = "", p?.(!1));
  }), M = Ke((k) => {
    const H = k.relatedTarget, P = v.select("domReferenceElement"), G = v.select("floatingElement");
    at(P, H) || at(G, H) || (C.clear(), w.current = "", _.current = N.current, p?.(!1));
  });
  Fe(() => {
    !x && y !== null || (C.clear(), N.current = null, w.current !== "" && (w.current = ""));
  }, [x, y, C]);
  const A = b.useMemo(() => ({
    onKeyDown: T,
    onBlur: M
  }), [T, M]);
  return b.useMemo(() => g ? {
    reference: A,
    floating: A
  } : {}, [g, A]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = Jy.startingStyle] = "startingStyle", n[n.endingStyle = Jy.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const oT = {
  "data-popup-open": ""
}, iT = {
  "data-popup-open": "",
  "data-pressed": ""
}, rT = {
  "data-open": ""
}, aT = {
  "data-closed": ""
}, sT = {
  "data-anchor-hidden": ""
}, cT = {
  open(n) {
    return n ? oT : null;
  }
}, uT = {
  open(n) {
    return n ? iT : null;
  }
}, Ap = {
  open(n) {
    return n ? rT : aT;
  },
  anchorHidden(n) {
    return n ? sT : null;
  }
};
({
  ...Ap,
  ...Eu
});
function fT(n) {
  return fp(19) ? n : n ? "true" : void 0;
}
const dT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    cutout: a,
    ...c
  } = o;
  let f;
  if (a) {
    const d = a.getBoundingClientRect();
    f = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${d.left}px ${d.top}px,${d.left}px ${d.bottom}px,${d.right}px ${d.bottom}px,${d.right}px ${d.top}px,${d.left}px ${d.top}px)`;
  }
  return /* @__PURE__ */ S.jsx("div", {
    ref: r,
    role: "presentation",
    "data-base-ui-inert": "",
    ...c,
    style: {
      position: "fixed",
      inset: 0,
      userSelect: "none",
      WebkitUserSelect: "none",
      clipPath: f
    }
  });
});
function hT(n) {
  const o = b.useRef(""), r = b.useCallback((c) => {
    c.defaultPrevented || (o.current = c.pointerType, n(c, c.pointerType));
  }, [n]);
  return {
    onClick: b.useCallback((c) => {
      if (c.detail === 0) {
        n(c, "keyboard");
        return;
      }
      "pointerType" in c ? n(c, c.pointerType) : n(c, o.current), o.current = "";
    }, [n]),
    onPointerDown: r
  };
}
function aa(n, o) {
  const r = b.useRef(n), a = Ke(o);
  Fe(() => {
    r.current !== n && a(r.current), r.current = n;
  }, [n, a]);
}
function pT(n, o) {
  const r = Ke((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (As ? "touch" : ""));
  }), {
    onClick: a,
    onPointerDown: c
  } = hT(r);
  return b.useMemo(() => ({
    onClick: a,
    onPointerDown: c
  }), [a, c]);
}
function mT(n) {
  const [o, r] = b.useState(null), a = pT(n, r);
  return aa(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: a
  }), [o, a]);
}
function gT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function bT(n, o, r, a, c, f, d, p, g, h = 2) {
  const y = cM(r.current, {
    event: n,
    orientation: a,
    loopFocus: c,
    rtl: f,
    cols: h,
    disabledIndices: d,
    minIndex: p,
    maxIndex: g,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: o > g ? p : o,
    stopEvent: !0
  });
  return ms(r.current, y) ? void 0 : y;
}
const h1 = /* @__PURE__ */ b.createContext(void 0), p1 = /* @__PURE__ */ b.createContext(void 0), m1 = /* @__PURE__ */ b.createContext(void 0), g1 = /* @__PURE__ */ b.createContext(!1), b1 = /* @__PURE__ */ b.createContext("");
function Ol() {
  const n = b.useContext(h1);
  if (!n)
    throw new Error(Eo(22));
  return n;
}
function Nu() {
  const n = b.useContext(p1);
  if (!n)
    throw new Error(Eo(23));
  return n;
}
function Ms() {
  const n = b.useContext(m1);
  if (!n)
    throw new Error(Eo(24));
  return n;
}
function Mp() {
  return b.useContext(b1);
}
function yT() {
  return b.useContext(g1);
}
const vT = (n, o) => Object.is(n, o);
function Ni(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function xT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((a) => a === void 0 ? !1 : Ni(o, a, r));
}
function y1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((a) => a === void 0 ? !1 : Ni(a, o, r));
}
function rh(n, o, r, a) {
  const c = a && Array.isArray(o) ? o[o.length - 1] : o, f = y1(n, c, r);
  return f === -1 ? null : f;
}
function ST(n, o, r) {
  return n.filter((a) => !Ni(o, a, r));
}
function Lh(n) {
  if (n == null)
    return "";
  if (typeof n == "string")
    return n;
  try {
    return JSON.stringify(n);
  } catch {
    return String(n);
  }
}
function Tp(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function ET(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Tp(o)) {
    for (const r of o)
      for (const a of r.items)
        if (a && a.value == null && a.label != null)
          return !0;
    return !1;
  }
  for (const r of o)
    if (r && r.value == null && r.label != null)
      return !0;
  return !1;
}
function lo(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return Lh(n);
}
function as(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? Lh(n.value) : Lh(n);
}
function v1(n, o, r) {
  function a() {
    return lo(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? a();
  if (Array.isArray(o)) {
    const c = o, f = Tp(c) ? c.flatMap((d) => d.items) : c;
    if (n == null || typeof n != "object") {
      const d = f.find((p) => p.value === n);
      return d && d.label != null ? d.label : a();
    }
    if ("value" in n) {
      const d = f.find((p) => p && p.value === n.value);
      if (d && d.label != null)
        return d.label;
    }
  }
  return a();
}
function CT(n, o, r) {
  return n.reduce((a, c, f) => (f > 0 && a.push(", "), a.push(/* @__PURE__ */ S.jsx(b.Fragment, {
    children: v1(c, o, r)
  }, f)), a), []);
}
const Ee = {
  id: (n) => n.id,
  labelId: (n) => n.labelId,
  items: (n) => n.items,
  selectedValue: (n) => n.selectedValue,
  hasSelectionChips: (n) => {
    const o = n.selectedValue;
    return Array.isArray(o) && o.length > 0;
  },
  hasSelectedValue: (n) => {
    const {
      selectedValue: o,
      selectionMode: r
    } = n;
    return o == null ? !1 : r === "multiple" && Array.isArray(o) ? o.length > 0 : !0;
  },
  hasNullItemLabel: (n, o) => o ? ET(n.items) : !1,
  open: (n) => n.open,
  mounted: (n) => n.mounted,
  forceMounted: (n) => n.forceMounted,
  inline: (n) => n.inline,
  activeIndex: (n) => n.activeIndex,
  selectedIndex: (n) => n.selectedIndex,
  isActive: (n, o) => n.activeIndex === o,
  isSelected: (n, o) => {
    const r = n.isItemEqualToValue, a = n.selectedValue;
    return Array.isArray(a) ? a.some((c) => Ni(o, c, r)) : Ni(o, a, r);
  },
  transitionStatus: (n) => n.transitionStatus,
  popupProps: (n) => n.popupProps,
  listProps: (n) => n.listProps,
  inputProps: (n) => n.inputProps,
  triggerProps: (n) => n.triggerProps,
  itemProps: (n) => n.itemProps,
  positionerElement: (n) => n.positionerElement,
  listElement: (n) => n.listElement,
  popupId: (n) => n.popupId,
  triggerElement: (n) => n.triggerElement,
  inputElement: (n) => n.inputElement,
  inputGroupElement: (n) => n.inputGroupElement,
  popupSide: (n) => n.popupSide,
  openMethod: (n) => n.openMethod,
  inputInsidePopup: (n) => n.inputInsidePopup,
  inputOwnsFormValue: (n) => n.inputOwnsFormValue,
  selectionMode: (n) => n.selectionMode,
  name: (n) => n.name,
  form: (n) => n.form,
  disabled: (n) => n.disabled,
  readOnly: (n) => n.readOnly,
  required: (n) => n.required,
  grid: (n) => n.grid,
  virtualized: (n) => n.virtualized,
  itemToStringLabel: (n) => n.itemToStringLabel,
  isItemEqualToValue: (n) => n.isItemEqualToValue,
  modal: (n) => n.modal,
  autoHighlight: (n) => n.autoHighlight
}, RT = {
  badInput: !1,
  customError: !1,
  patternMismatch: !1,
  rangeOverflow: !1,
  rangeUnderflow: !1,
  stepMismatch: !1,
  tooLong: !1,
  tooShort: !1,
  typeMismatch: !1,
  valid: null,
  valueMissing: !1
}, x1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, wT = {
  disabled: !1,
  ...x1
}, S1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, E1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: RT,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: Xt,
  disabled: void 0,
  setTouched: Xt,
  setDirty: Xt,
  setFilled: Xt,
  setFocused: Xt,
  validationMode: "onSubmit",
  shouldValidateOnChange: () => !1,
  state: wT,
  registerFieldControl: Xt,
  validation: {
    getValidationProps: (n, o = dl) => o,
    inputRef: {
      current: null
    },
    registeredInputs: /* @__PURE__ */ new Map(),
    registerInput: Xt,
    getInputControl: () => null,
    commit: async () => {
    },
    change: Xt
  }
}, C1 = /* @__PURE__ */ b.createContext(E1);
function ba(n = !0) {
  const o = b.useContext(C1);
  if (o.setValidityData === Xt && !n)
    throw new Error(Eo(28));
  return o;
}
function R1(n, o, r, a, c = !0, f) {
  const {
    registerFieldControl: d
  } = ba(), p = Tl(() => /* @__PURE__ */ Symbol());
  Fe(() => {
    const g = p.current;
    if (!c) {
      d(g, void 0);
      return;
    }
    d(g, {
      controlRef: n,
      getValue: a,
      id: o,
      name: f,
      value: r
    });
  }, [n, c, a, o, f, d, p, r]), Fe(() => {
    const g = p.current;
    return () => {
      d(g, void 0);
    };
  }, [d, p]);
}
const _T = /* @__PURE__ */ b.createContext({
  elementRef: {
    current: null
  },
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: Xt,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: !1
  }
});
function w1() {
  return b.useContext(_T);
}
const AT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Xt,
  labelId: void 0,
  setLabelId: Xt,
  messageIds: [],
  setMessageIds: Xt,
  getDescriptionProps: (n) => n
});
function ku() {
  return b.useContext(AT);
}
function Op(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: a
  } = n, {
    controlId: c,
    registerControlId: f
  } = ku(), d = xu(o), p = r ? c : void 0, g = Tl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), v = Ke(() => {
    !h.current || f === Xt || (h.current = !1, f(g.current, void 0));
  });
  return Fe(() => {
    if (f === Xt)
      return;
    let x;
    if (r) {
      const C = a?.current;
      cn(C) && C.closest("label") != null ? x = o ?? null : x = p ?? d;
    } else if (o != null)
      y.current = !0, x = o;
    else if (y.current)
      x = d;
    else {
      v();
      return;
    }
    if (x === void 0) {
      v();
      return;
    }
    h.current = !0, f(g.current, x);
  }, [o, a, p, f, r, d, g, v]), b.useEffect(() => v, [v]), c ?? d;
}
function _1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function MT(n, o) {
  return (r, a) => r == null ? !1 : n.contains(r, a, o);
}
function A1(n) {
  return Array.isArray(n) ? n.map((o) => A1(o)).join(",") : n == null ? "" : String(n);
}
const Ev = /* @__PURE__ */ new Map();
function TT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${A1(n.locale)}|${JSON.stringify(o)}`, a = Ev.get(r);
  if (a)
    return a;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, p, g) {
      if (!p)
        return !0;
      const h = lo(d, g);
      for (let y = 0; y <= h.length - p.length; y += 1)
        if (c.compare(h.slice(y, y + p.length), p) === 0)
          return !0;
      return !1;
    },
    startsWith(d, p, g) {
      if (!p)
        return !0;
      const h = lo(d, g);
      return c.compare(h.slice(0, p.length), p) === 0;
    },
    endsWith(d, p, g) {
      if (!p)
        return !0;
      const h = lo(d, g), y = p.length;
      return h.length >= y && c.compare(h.slice(h.length - y), p) === 0;
    }
  };
  return Ev.set(r, f), f;
}
const OT = TT;
function NT(n, o = !1) {
  const {
    overflowY: r
  } = hl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function kT(n, o, r = (a, c) => a === c) {
  return n.length === o.length && n.every((a, c) => r(a, o[c]));
}
const M1 = /* @__PURE__ */ Symbol("none"), ah = {
  value: M1,
  index: -1
}, zT = /* @__PURE__ */ b.createContext(void 0);
function Np() {
  return b.useContext(zT)?.direction ?? "ltr";
}
function DT(n) {
  const {
    id: o,
    onOpenChangeComplete: r,
    defaultSelectedValue: a = null,
    selectedValue: c,
    onSelectedValueChange: f,
    defaultInputValue: d,
    inputValue: p,
    open: g,
    defaultOpen: h = !1,
    selectionMode: y,
    onItemHighlighted: v,
    name: x,
    form: C,
    disabled: w = !1,
    readOnly: _ = !1,
    required: N = !1,
    inputRef: T,
    grid: M = !1,
    items: A,
    filteredItems: k,
    filter: H,
    openOnInputClick: P = !0,
    autoHighlight: G = !1,
    keepHighlight: L = !1,
    highlightItemOnHover: K = !0,
    loopFocus: te = !0,
    itemToStringLabel: se,
    itemToStringValue: de,
    isItemEqualToValue: le = vT,
    virtualized: pe = !1,
    inline: be = !1,
    fillInputOnItemPress: V = !0,
    modal: I = !1,
    limit: Q = -1,
    autoComplete: xe = "list",
    formAutoComplete: ae,
    locale: z,
    submitOnItemClick: F = !1
  } = n, {
    clearErrors: ne
  } = w1(), {
    setDirty: oe,
    validityData: ge,
    setFilled: _e,
    name: qe,
    disabled: Me,
    setTouched: Te,
    setFocused: it,
    validationMode: gt,
    validation: ke
  } = ba(), et = Np(), Ne = Op({
    id: o
  }), je = OT({
    locale: z
  }), [He, Ae] = b.useState(!1), [Qe, Oe] = b.useState(null), $e = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ve = b.useRef(null), Z = b.useRef(null), ue = b.useRef(null), Ie = b.useRef(null), Ce = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Mt = b.useRef(null), Ct = b.useRef(null), Bt = b.useRef(ah), kt = b.useRef(null), vt = b.useRef([]), Ft = b.useRef(null), dt = Me || w, Wt = qe ?? x, ut = y === "multiple", En = y === "single", Cn = p !== void 0 || d !== void 0, zt = A !== void 0, ot = k !== void 0;
  let ht;
  G === "always" ? ht = "always" : ht = G ? "input-change" : !1;
  const [Je, Nt] = Fc({
    controlled: c,
    default: ut ? a ?? ra : a,
    name: "Combobox",
    state: "selectedValue"
  }), Rn = b.useMemo(() => H === null ? () => !0 : H !== void 0 ? H : MT(je, se), [H, je, se]), yn = Tl(() => Cn ? d ?? "" : En ? lo(Je, se) : "").current, [Yt, el] = Fc({
    controlled: p,
    default: yn,
    name: "Combobox",
    state: "inputValue"
  }), [Dt, io] = Fc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Kn = Tp(A), nn = Qe ?? String(Yt).trim(), ro = En ? lo(Je, se) : "", Nl = En && !He && nn !== "" && ro.length === nn.length && je.contains(ro, nn), tl = Nl ? "" : nn, Co = zt && ot && Nl, vn = b.useMemo(() => A ? Kn ? A.flatMap((q) => q.items) : A : ra, [A, Kn]), Tt = b.useMemo(() => {
    if (k && !Co)
      return k;
    if (!A)
      return ra;
    if (Kn) {
      const U = A, ce = [];
      let ye = 0;
      for (const Re of U) {
        if (Q > -1 && ye >= Q)
          break;
        const Ue = Q > -1 ? Q - ye : 1 / 0, we = tl === "" ? Re.items.slice(0, Ue) : [];
        if (tl !== "")
          for (const Ve of Re.items) {
            if (we.length >= Ue)
              break;
            Rn(Ve, tl, se) && we.push(Ve);
          }
        if (we.length > 0) {
          const Ve = {
            ...Re,
            items: we
          };
          ce.push(Ve), ye += we.length;
        }
      }
      return ce;
    }
    if (tl === "")
      return Q > -1 ? vn.slice(0, Q) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        vn
      );
    const q = [];
    for (const U of vn) {
      if (Q > -1 && q.length >= Q)
        break;
      Rn(U, tl, se) && q.push(U);
    }
    return q;
  }, [k, Co, A, Kn, tl, Q, Rn, se, vn]), Rt = b.useMemo(() => Kn ? Tt.flatMap((U) => U.items) : Tt, [Tt, Kn]), Ye = Tl(() => {
    let q = null;
    return be && Dt && zt && y !== "none" && (q = rh(Rt, Je, le, ut)), new d1({
      id: Ne,
      labelId: void 0,
      selectedValue: Je,
      open: Dt,
      items: A,
      selectionMode: y,
      listRef: $e,
      labelsRef: tt,
      popupRef: Xe,
      emptyRef: Ie,
      inputRef: ve,
      startDismissRef: Z,
      endDismissRef: ue,
      keyboardActiveRef: Ce,
      chipsContainerRef: nt,
      clearRef: Mt,
      valuesRef: vt,
      pointerDownItemRef: Ft,
      selectionEventRef: Ct,
      name: Wt,
      form: C,
      disabled: dt,
      readOnly: _,
      required: N,
      grid: M,
      virtualized: pe,
      openOnInputClick: P,
      itemToStringLabel: se,
      isItemEqualToValue: le,
      modal: I,
      autoHighlight: ht,
      submitOnItemClick: F,
      hasInputValue: Cn,
      mounted: !1,
      forceMounted: !1,
      transitionStatus: "idle",
      inline: be,
      activeIndex: null,
      selectedIndex: q,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: dl,
      positionerElement: null,
      listElement: null,
      popupId: void 0,
      triggerElement: null,
      inputElement: null,
      inputGroupElement: null,
      popupSide: null,
      openMethod: null,
      inputInsidePopup: !0,
      // Avoid duplicate names in the server HTML. Popup inputs aren't rendered
      // until after hydration, so the hidden input takes over then if needed.
      inputOwnsFormValue: y === "none",
      // Placeholder callbacks replaced on first render
      onOpenChangeComplete: Xt,
      setOpen: Xt,
      setInputValue: Xt,
      setSelectedValue: Xt,
      setIndices: Xt,
      handleSelection: Xt,
      forceMount: Xt,
      requestSubmit: Xt
    });
  }).current, Vn = y === "none" ? Yt : Je, vr = b.useMemo(() => y === "none" ? Vn : Array.isArray(Je) ? Je.map((q) => as(q, de)) : as(Je, de), [Vn, de, y, Je]), xr = Ke(v), Ro = Ke(r), kl = Se(Ye, Ee.activeIndex), st = Se(Ye, Ee.selectedIndex), pl = Se(Ye, Ee.positionerElement), zl = Se(Ye, Ee.listElement), ml = Se(Ye, Ee.triggerElement), In = Se(Ye, Ee.inputElement), Jt = Se(Ye, Ee.inputGroupElement), fn = Se(Ye, Ee.inline), Hn = Se(Ye, Ee.inputInsidePopup), nl = Se(Ye, Ee.inputOwnsFormValue), ao = fl(ml), {
    mounted: wo,
    setMounted: ji,
    transitionStatus: so
  } = vp(Dt), {
    openMethod: Sr,
    triggerProps: co
  } = mT(Dt), _o = Ke(() => vr);
  R1(Hn ? ao : ve, Ne, Vn, _o, !dt, x);
  const ll = Ke(() => {
    A ? tt.current = Rt.map((q) => lo(q, se)) : Ye.set("forceMounted", !0);
  }), ln = Ke((q, U, ce) => {
    if (U === -1) {
      if (Bt.current === ah)
        return;
      Bt.current = ah;
    } else
      Bt.current = {
        value: q,
        index: U
      };
    xr(q, D2(ce, void 0, {
      index: U
    }));
  }), Fn = Ke((q) => {
    Ye.update(q);
    const U = q.activeIndex;
    if (U === void 0)
      return;
    const ce = q.type || Xl;
    U === null ? ln(void 0, -1, ce) : ln(vt.current[U], U, ce);
  }), ol = Ke((q, U) => {
    if (Ge.current = U.reason === yo, n.onInputValueChange?.(q, U), !U.isCanceled) {
      if (U.reason === fs) {
        Dt && Qe !== null && Oe(null);
        const ce = U.event, ye = ce.inputType;
        if (ce.type === "compositionend" || ye != null && ye !== "" && ye !== "insertReplacementText") {
          const Ue = q.trim() !== "";
          Ue && Ae(!0), kt.current = {
            hasQuery: Ue
          };
          const we = Ye.state.listElement;
          if (!Ye.state.virtualized && we) {
            const Ve = Xe.current;
            for (const Et of ha(we.firstElementChild ?? we)) {
              if (!Kt(Et) || (Ve ? !at(Ve, Et) : Et.getAttribute("role") === "dialog"))
                break;
              if (NT(Et)) {
                Et.scrollTop = 0;
                break;
              }
            }
          }
          Ue && ht && Ye.state.activeIndex == null && (Dt || fn) && Ye.set("activeIndex", 0);
        }
      } else U.reason === yo && q === "" && Ye.state.inputInsidePopup && (kt.current = {
        hasQuery: !1,
        selection: !0
      });
      el(q);
    }
  }), Dl = Ke((q, U) => {
    if (Dt !== q && (U.reason === gp && zt && Rt.length === 0 && !Ie.current && U.allowPropagation(), n.onOpenChange?.(q, U), !U.isCanceled && (q && Hn && !fn && Qe !== null && (Ae(!1), Oe(null), Yt !== "" && U.reason !== fs && ol("", St(yo, U.event))), !q && He && (En ? (fn || Oe(nn), nn === "" && Ae(!1)) : ut && (fn || Oe(nn), Hn && Fn({
      activeIndex: null
    }), (!Hn || fn) && ol("", St(yo, U.event)))), io(q), !q && Hn && (U.reason === Su || U.reason === mp) && (Te(!0), it(!1), gt === "onBlur")))) {
      const ce = y === "none" ? Yt : Je;
      ke.commit(ce);
    }
  }), Qn = Ke((q, U) => {
    if (f?.(q, U), U.isCanceled)
      return;
    Nt(q), (y === "none" && Xe.current && V || En && !Ye.state.inputInsidePopup) && ol(lo(q, se), St(U.reason, U.event));
  }), Un = Ke((q, U) => {
    const ce = Ml(q), ye = Ct.current ?? q;
    Ct.current = null;
    const Re = St(O2, ye), Ue = ce?.closest("a")?.getAttribute("href");
    if (Ue) {
      Ue.startsWith("#") && Dl(!1, Re);
      return;
    }
    if (ut) {
      const we = Array.isArray(Je) ? Je : [], Et = xT(we, U, le) ? ST(we, U, le) : [...we, U];
      if (Qn(Et, Re), Re.isCanceled || !(ve.current ? ve.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? ol("", St(yo, Re.event)) : Dl(!1, Re);
    } else {
      if (Qn(U, Re), Re.isCanceled)
        return;
      Dl(!1, Re);
    }
  }), Er = Ke(() => {
    const q = ke.inputRef.current?.form ?? Ye.state.inputElement?.form;
    q && typeof q.requestSubmit == "function" && q.requestSubmit();
  }), wn = Ke(() => {
    if (ji(!1), Ro?.(!1), Ae(!1), Oe(null), Fn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), ut && ve.current && ve.current.value !== "" && !Ge.current && ol("", St(yo)), En)
      if (Ye.state.inputInsidePopup)
        ve.current && ve.current.value !== "" && ol("", St(yo));
      else {
        const q = lo(Je, se);
        ve.current && ve.current.value !== q && ol(q, St(q === "" ? yo : Xl));
      }
  }), Li = b.useMemo(() => fn && pl ? {
    current: pl.closest('[role="dialog"]')
  } : Xe, [fn, pl]);
  Cu({
    enabled: !n.actionsRef,
    open: Dt,
    ref: Li,
    onComplete() {
      Dt || wn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: wn
  }), [wn]), Fe(function() {
    if (Dt || (Ft.current = null, y === "none"))
      return;
    const U = zt ? vn : vt.current;
    Fn({
      selectedIndex: rh(U, Je, le, ut)
    });
  }, [Dt, Je, y, ut, zt, vn, le, Fn]), Fe(() => {
    A && (vt.current = Rt, $e.current.length = Rt.length);
  }, [A, Rt]), Fe(() => {
    const q = kt.current;
    if (q) {
      const Ve = Dt || fn || Ye.state.positionerElement?.hidden === !1;
      if (q.hasQuery)
        ht && Ve && Ye.set("activeIndex", 0), kt.current = null;
      else if (String(Yt).trim() === "" && (kt.current = null, Ve)) {
        const Et = q.selection;
        ht === "always" && !Et && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || ve.current && ve.current.value.trim() !== "")
            return;
          const on = Ye.state.selectedValue, Zn = Ye.state.selectionMode === "multiple", rn = Zn && Array.isArray(on) ? on[on.length - 1] : on, dn = Ye.state.selectionMode !== "none" && rn != null;
          if (dn || Et) {
            const fo = zt || ot ? Rt : vt.current;
            Ye.set("activeIndex", dn ? rh(fo, on, Ye.state.isItemEqualToValue, Zn) : null);
          } else ht === "always" && Ye.set("activeIndex", 0);
        });
      }
    }
    if (!Dt && !fn)
      return;
    const ce = zt || ot ? Rt : vt.current, ye = Ye.state.activeIndex;
    if (ye == null) {
      if (ht === "always" && ce.length > 0) {
        Ye.set("activeIndex", 0);
        return;
      }
      ln(void 0, -1, Xl);
      return;
    }
    if (ye >= ce.length) {
      ln(void 0, -1, Xl), Ye.set("activeIndex", null);
      return;
    }
    const Re = ce[ye], Ue = Bt.current.value, we = Ue !== M1 && Ni(Re, Ue, Ye.state.isItemEqualToValue);
    (Bt.current.index !== ye || !we) && ln(Re, ye, Xl);
  }, [
    kl,
    ht,
    ln,
    ot,
    zt,
    Rt,
    fn,
    Dt,
    Ye,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    Yt
  ]), Fe(() => {
    if (y === "none") {
      _e(String(Yt) !== "");
      return;
    }
    _e(ut ? Array.isArray(Je) && Je.length > 0 : Je != null);
  }, [_e, y, Yt, Je, ut]), b.useEffect(() => {
    zt && ht && Rt.length === 0 && Fn({
      activeIndex: null
    });
  }, [zt, ht, Rt.length, Fn]);
  function Cr(q) {
    const U = ge.initialValue;
    return Array.isArray(q) && Array.isArray(U) ? !kT(q, U, (ce, ye) => Ni(ce, ye, le)) : q !== U;
  }
  aa(nn, () => {
    !Dt || nn === "" || nn === String(yn) || Ae(!0);
  });
  function ei() {
    const q = lo(Je, se);
    Yt !== q && ol(q, St(Xl));
  }
  aa(Je, () => {
    y !== "none" && (ne(Wt), oe(Cr(Je)), ke.change(Je), En && !Cn && !Hn && ei());
  }), aa(Yt, () => {
    y === "none" && (ne(Wt), oe(Yt !== ge.initialValue), ke.change(Yt));
  }), aa(A, () => {
    !En || Cn || Hn || He || ei();
  });
  const gl = ZM({
    open: fn ? !0 : Dt,
    onOpenChange: Dl,
    elements: {
      reference: Hn ? ml : In,
      floating: pl
    }
  }), Vi = M ? "grid" : "listbox", Ao = Dt || fn, $l = Ao ? "true" : "false", Mo = b.useMemo(() => {
    const q = In?.tagName === "INPUT", U = In == null || q, ce = U || Ao, ye = U ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return ce && (ye.role = "combobox", ye["aria-expanded"] = $l, ye["aria-haspopup"] = Vi, ye["aria-controls"] = Ao ? zl?.id : void 0, ye["aria-autocomplete"] = xe), {
      reference: ye,
      floating: {
        role: "presentation"
      }
    };
  }, [In, Ao, $l, Vi, zl?.id, xe]), bl = u1(gl, {
    enabled: !_ && !dt && P,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Hn ? 0 : 100,
    reason: k2
  }), uo = DM(gl, {
    enabled: !_ && !dt && !fn,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: fn ? !0 : void 0,
    outsidePress(q) {
      const U = Ml(q);
      return !at(ml, U) && !at(Mt.current, U) && !at(nt.current, U) && !at(Jt, U);
    }
  }), Qt = nT(gl, {
    enabled: !_ && !dt,
    id: Ne,
    listRef: $e,
    activeIndex: kl,
    selectedIndex: st,
    virtual: !0,
    loopFocus: te,
    allowEscape: te && !ht,
    focusItemOnOpen: He || y === "none" && !ht ? !1 : "auto",
    focusItemOnHover: K,
    resetOnPointerLeave: !L,
    orientation: M ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: ra,
    grid: M ? bT : void 0,
    onNavigate(q, U) {
      !U && !Dt || so === "ending" || Fn(U ? {
        activeIndex: q,
        type: Ce.current ? bp : yp
      } : {
        activeIndex: q
      });
    }
  }), To = b.useMemo(() => ca(Qt.reference, {
    onKeyDown(q) {
      M && Ye.state.activeIndex == null && (q.key === "ArrowLeft" || q.key === "ArrowRight") && q.preventBaseUIHandler();
    }
  }, uo.reference, bl.reference, Mo.reference), [Qt.reference, uo.reference, bl.reference, Mo.reference, M, Ye]), Jl = b.useMemo(() => ca(FM, uo.floating), [uo.floating]), jl = b.useMemo(() => ca(Qt.floating, Mo.floating), [Qt.floating, Mo.floating]), Bn = b.useMemo(() => {
    const q = Qt.item;
    return q ? {
      ...q,
      onFocus: void 0
    } : dl;
  }, [Qt.item]);
  gT(() => {
    Ye.update({
      inline: be,
      popupProps: Jl,
      listProps: jl,
      inputProps: To,
      triggerProps: co,
      itemProps: Bn,
      setOpen: Dl,
      setInputValue: ol,
      setSelectedValue: Qn,
      setIndices: Fn,
      handleSelection: Un,
      forceMount: ll,
      requestSubmit: Er,
      onOpenChangeComplete: Ro
    });
  }), Fe(() => {
    Ye.update({
      id: Ne,
      selectedValue: Je,
      open: Dt,
      mounted: wo,
      transitionStatus: so,
      items: A,
      inline: be,
      popupProps: Jl,
      listProps: jl,
      inputProps: To,
      triggerProps: co,
      openMethod: Sr,
      itemProps: Bn,
      selectionMode: y,
      name: Wt,
      form: C,
      disabled: dt,
      readOnly: _,
      required: N,
      grid: M,
      virtualized: pe,
      openOnInputClick: P,
      itemToStringLabel: se,
      modal: I,
      autoHighlight: ht,
      isItemEqualToValue: le,
      submitOnItemClick: F,
      hasInputValue: Cn,
      inputOwnsFormValue: y === "none" && (be || !Ye.state.inputInsidePopup)
    });
  }, [Ye, Ne, Je, Dt, wo, so, A, Jl, jl, To, Bn, Sr, co, y, Wt, dt, _, N, M, pe, P, se, I, le, F, Cn, be, ht, C]);
  const Ii = cr(T, ke.inputRef), R = b.useMemo(() => ({
    query: nn,
    hasItems: zt,
    filteredItems: Tt,
    flatFilteredItems: Rt
  }), [nn, zt, Tt, Rt]), O = b.useMemo(() => Array.isArray(Vn) ? "" : as(Vn, de), [Vn, de]), D = ut && Array.isArray(Je) && Je.length > 0, Y = ut || y === "none" && nl ? void 0 : Wt, ee = b.useMemo(() => !ut || !Array.isArray(Je) || !Wt ? null : Je.map((q) => {
    const U = as(q, de);
    return /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: C,
      name: Wt,
      value: U,
      disabled: dt
    }, U);
  }), [ut, Je, C, Wt, de, dt]), re = /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ S.jsx("input", {
      ...ke.getValidationProps(dt, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Hn) {
            ml?.focus();
            return;
          }
          (ve.current || ml)?.focus();
        },
        // Handle browser autofill.
        onChange(q) {
          if (q.nativeEvent.defaultPrevented || dt || _)
            return;
          const U = q.currentTarget.value, ce = U.toLowerCase(), ye = St(Xl, q.nativeEvent), Re = () => vt.current.findIndex((we) => as(we, de).toLowerCase() === ce || lo(we, se).toLowerCase() === ce);
          function Ue() {
            if (ut)
              return;
            if (y === "none") {
              ol(U, ye);
              return;
            }
            let we = Re();
            we === -1 && (we = vt.current.findIndex((Et, on) => {
              const Zn = tt.current[on];
              return Zn != null && Zn.toLowerCase() === ce;
            }));
            const Ve = we === -1 ? void 0 : vt.current[we];
            Ve != null && Qn?.(Ve, ye);
          }
          En && (ll(), A && Re() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(Ue);
        }
      }),
      id: Ne && Y == null ? `${Ne}-hidden-input` : void 0,
      form: C,
      name: Y,
      autoComplete: ae,
      disabled: dt,
      required: N && !D,
      readOnly: _,
      value: O,
      ref: Ii,
      style: Y ? Rp : Cp,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), ee]
  });
  return /* @__PURE__ */ S.jsx(h1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(p1.Provider, {
      value: gl,
      children: /* @__PURE__ */ S.jsx(g1.Provider, {
        value: zt,
        children: /* @__PURE__ */ S.jsx(m1.Provider, {
          value: R,
          children: /* @__PURE__ */ S.jsx(b1.Provider, {
            value: Yt,
            children: re
          })
        })
      })
    })
  });
}
const T1 = {
  ...uT,
  ...S1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Bc = 5;
function jT(n, o) {
  const r = LT(o);
  return n.clientX >= r.left - Bc && n.clientX <= r.right + Bc && n.clientY >= r.top - Bc && n.clientY <= r.bottom + Bc;
}
function LT(n) {
  const o = n.getBoundingClientRect(), r = un(n);
  if (Kx)
    return o;
  const a = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(a.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(a.width) || 0, p = parseFloat(a.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), v = Math.max(o.height, p, h), x = y - o.width, C = v - o.height;
  return {
    left: o.left - x / 2,
    right: o.right + x / 2,
    top: o.top - C / 2,
    bottom: o.bottom + C / 2
  };
}
function VT(n, o) {
  return n ?? o;
}
function O1(n) {
  const o = Se(n, Ee.mounted), r = Se(n, Ee.popupSide), a = Se(n, Ee.positionerElement);
  return o && a ? r : null;
}
function zu() {
  return Ms().filteredItems.length === 0;
}
function IT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function HT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function N1(n, o, r) {
  const a = n.state.listRef.current[o];
  a && (n.state.selectionEventRef.current = r, a.click(), n.state.selectionEventRef.current = null);
}
const UT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: p,
    style: g,
    ...h
  } = o, {
    state: y,
    disabled: v,
    setTouched: x,
    setFocused: C,
    validationMode: w,
    validation: _
  } = ba(), {
    labelId: N
  } = ku(), T = Ol(), M = Se(T, Ee.selectionMode), A = Se(T, Ee.disabled), k = Se(T, Ee.readOnly), H = Se(T, Ee.required), P = Se(T, Ee.positionerElement), G = Se(T, Ee.listElement), L = Se(T, Ee.popupId), K = Se(T, Ee.triggerProps), te = Se(T, Ee.inputInsidePopup), se = Se(T, Ee.id), de = Se(T, Ee.labelId), le = Se(T, Ee.open), pe = Se(T, Ee.selectedValue), be = Se(T, Ee.activeIndex), V = Se(T, Ee.selectedIndex), I = Se(T, Ee.hasSelectedValue), Q = Nu(), xe = Mp(), ae = Oi(), z = v || A || d, F = zu(), ne = O1(T);
  Op({
    id: te ? p : void 0
  });
  const oe = te ? p ?? se : p, ge = VT(N, de);
  let _e;
  le && te ? _e = L ?? _1(se) : le && (_e = G?.id);
  const qe = b.useRef("");
  function Me(He) {
    qe.current = He.pointerType;
  }
  const {
    reference: Te
  } = lT(Q, {
    enabled: !le && !k && !A && M === "single",
    listRef: T.state.labelsRef,
    activeIndex: be,
    selectedIndex: V,
    onMatch(He) {
      const Ae = T.state.valuesRef.current[He];
      Ae !== void 0 && T.state.setSelectedValue(Ae, St(Xl));
    }
  }), {
    reference: it
  } = u1(Q, {
    enabled: !k && !A,
    event: "mousedown"
  }), {
    buttonRef: gt,
    getButtonProps: ke
  } = _s({
    native: f,
    disabled: z
  }), et = {
    ...y,
    open: le,
    disabled: z,
    popupSide: ne,
    listEmpty: F,
    placeholder: M === "none" ? !1 : !I
  }, Ne = Ke((He) => {
    T.set("triggerElement", He);
  });
  return Zl("button", o, {
    ref: [r, gt, Ne],
    state: et,
    props: [K, it, Te, {
      id: oe,
      tabIndex: te ? 0 : -1,
      role: te ? "combobox" : void 0,
      "aria-expanded": le,
      "aria-haspopup": te ? "dialog" : "listbox",
      "aria-controls": _e,
      "aria-required": te && H || void 0,
      "aria-labelledby": ge,
      onPointerDown: Me,
      onPointerEnter: Me,
      onFocus() {
        C(!0), !(z || k) && ae.start(0, T.state.forceMount);
      },
      onBlur(He) {
        if (!at(P, He.relatedTarget) && (x(!0), C(!1), w === "onBlur")) {
          const Ae = M === "none" ? xe : pe;
          _.commit(Ae);
        }
      },
      onMouseDown(He) {
        if (z || k || (te || Q.set("domReferenceElement", He.currentTarget), T.state.forceMount(), qe.current !== "touch" && (T.state.inputRef.current?.focus(), te || He.preventDefault()), le))
          return;
        const Ae = $t(He.currentTarget);
        function Qe(Oe) {
          const $e = T.state.triggerElement;
          if (!$e)
            return;
          const tt = Ml(Oe), Xe = T.state.positionerElement, ve = T.state.listElement;
          at($e, tt) || at(Xe, tt) || at(ve, tt) || jT(Oe, $e) || T.state.setOpen(!1, St(z2, Oe));
        }
        te && Ae.addEventListener("mouseup", Qe, {
          once: !0
        });
      },
      onKeyDown(He) {
        k || (He.key === "ArrowDown" || He.key === "ArrowUp") && (An(He), T.state.setOpen(!0, St(Oh, He.nativeEvent)), T.state.inputRef.current?.focus());
      }
    }, _.getValidationProps(z, h), ke],
    stateAttributesMapping: T1
  });
}), BT = /* @__PURE__ */ b.createContext(void 0);
function GT() {
  return b.useContext(BT);
}
const k1 = /* @__PURE__ */ b.createContext(void 0);
function kp(n) {
  const o = b.useContext(k1);
  if (o === void 0 && !n)
    throw new Error(Eo(21));
  return o;
}
const z1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Ol(), {
    buttonRef: c,
    getButtonProps: f
  } = _s({
    native: !1
  }), d = cr(r, c);
  function p(h) {
    a.state.setOpen(!1, St(N2, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: p
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Rp
  });
}), YT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    id: d,
    style: p,
    ...g
  } = o, {
    state: h,
    disabled: y,
    setTouched: v,
    setFocused: x,
    validationMode: C,
    validation: w
  } = ba(), {
    labelId: _
  } = ku(), N = GT(), M = !!kp(!0), A = Ol(), k = Mp(), H = Np(), P = Se(A, Ee.required), G = Se(A, Ee.disabled), L = Se(A, Ee.readOnly), K = Se(A, Ee.name), te = Se(A, Ee.form), se = Se(A, Ee.selectionMode), de = Se(A, Ee.autoHighlight), le = Se(A, Ee.inputProps), pe = Se(A, Ee.triggerProps), be = Se(A, Ee.open), V = Se(A, Ee.mounted), I = Se(A, Ee.selectedValue), Q = Se(A, Ee.id), xe = Se(A, Ee.inline), ae = Se(A, Ee.modal), z = !!de, F = O1(A), ne = y || G || f, oe = zu(), ge = M || xe, _e = !ge || ae, qe = xu(d ?? (ge ? void 0 : Q)), Me = M ? x1 : h, [Te, it] = b.useState(null), gt = b.useRef(!1), ke = b.useRef(null), et = b.useRef(!1), Ne = se === "none" && !M, je = Ke((ve) => {
    const Z = M || A.state.inline;
    Z && !A.state.hasInputValue && A.state.setInputValue("", St(Xl)), A.update({
      inputElement: ve,
      inputInsidePopup: Z,
      inputOwnsFormValue: Ne
    });
  }), He = M ? g : w.getValidationProps(ne, g);
  function Ae() {
    A.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: A.state.keyboardActiveRef.current ? bp : yp
    });
  }
  function Qe() {
    A.state.keyboardActiveRef.current = !1;
  }
  const Oe = {
    ...Me,
    open: be,
    disabled: ne,
    readOnly: L,
    popupSide: F,
    listEmpty: oe
  };
  function $e(ve) {
    if (!N)
      return;
    let Z;
    const {
      highlightedChipIndex: ue
    } = N, Ie = N.chipsRef.current.length, [Ce, Ge] = IT(H);
    return ue !== void 0 ? (ve.key === Ce ? (ve.preventDefault(), ue > 0 ? Z = ue - 1 : Z = void 0) : ve.key === Ge ? (ve.preventDefault(), ue < Ie - 1 ? Z = ue + 1 : Z = void 0) : (ve.key === "Backspace" || ve.key === "Delete") && (ve.preventDefault(), Z = HT(ue, I.length), Ae()), Z) : (ve.key === Ce && (ve.currentTarget.selectionStart ?? 0) === 0 && I.length > 0 && (ve.preventDefault(), Z = Ie > 0 ? Ie - 1 : void 0), Z);
  }
  const tt = Zl("input", o, {
    state: Oe,
    ref: [r, A.state.inputRef, je],
    props: [le, pe, {
      value: Te ?? k,
      "aria-readonly": L || void 0,
      "aria-required": P || void 0,
      "aria-labelledby": _,
      disabled: ne,
      readOnly: L,
      required: se === "none" ? P : void 0,
      form: te,
      ...Ne && K && {
        name: K
      },
      id: qe,
      onFocus() {
        if (x(!0), !xe || !et.current)
          return;
        et.current = !1;
        const ve = ke.current;
        ve == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(A.state.valuesRef.current, ve) || A.state.setIndices({
          activeIndex: ve
        });
      },
      onBlur() {
        v(!0), x(!1);
        const ve = A.state.activeIndex;
        if (xe && ve !== null && de !== "always" && (ke.current = ve, et.current = !0, A.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const Z = se === "none" ? k : I;
          w.commit(Z);
        }
      },
      onCompositionStart(ve) {
        ou || (gt.current = !0, it(ve.currentTarget.value));
      },
      onCompositionEnd(ve) {
        gt.current = !1;
        const Z = ve.currentTarget.value;
        it(null), A.state.setInputValue(Z, St(fs, ve.nativeEvent));
      },
      onChange(ve) {
        const Z = ve.nativeEvent, ue = Z.inputType, Ie = !ue || ue === "insertReplacementText", Ce = gt.current || !Ie;
        function Ge(Bt) {
          L || ne || !Bt || !Ce || (A.state.setOpen(!0, St(fs, Z)), z || Ae());
        }
        if (gt.current) {
          const Bt = ve.currentTarget.value;
          it(Bt), Bt === "" && !A.state.openOnInputClick && !A.state.inputInsidePopup && A.state.setOpen(!1, St(yo, Z));
          const kt = Bt.trim(), vt = z && kt !== "";
          Ge(kt), be && A.state.activeIndex !== null && !vt && Ae();
          return;
        }
        const nt = St(fs, Z);
        if (A.state.setInputValue(ve.currentTarget.value, nt), nt.isCanceled)
          return;
        const Mt = ve.currentTarget.value === "", Ct = St(yo, Z);
        Mt && !A.state.inputInsidePopup && (se === "single" && A.state.setSelectedValue(null, Ct), A.state.openOnInputClick || A.state.setOpen(!1, Ct)), Ge(ve.currentTarget.value.trim()), be && A.state.activeIndex !== null && !z && Ae();
      },
      onKeyDown(ve) {
        if (ne || L || ve.ctrlKey || ve.shiftKey || ve.altKey || ve.metaKey)
          return;
        A.state.keyboardActiveRef.current = !0;
        const Z = ve.currentTarget, ue = Z.scrollWidth - Z.clientWidth, Ie = H === "rtl";
        if (ve.key === "Home") {
          An(ve);
          const nt = ev && Ie ? Z.value.length : 0;
          Z.setSelectionRange(nt, nt), Z.scrollLeft = 0;
          return;
        }
        if (ve.key === "End") {
          An(ve);
          const nt = ev && Ie ? 0 : Z.value.length;
          Z.setSelectionRange(nt, nt), Z.scrollLeft = Ie ? -ue : ue;
          return;
        }
        if (!V && ve.key === "Escape") {
          const nt = se === "multiple" && Array.isArray(I) ? I.length === 0 : I === null, Mt = St(gp, ve.nativeEvent), Ct = se === "multiple" ? [] : null;
          A.state.setInputValue("", Mt), A.state.setSelectedValue(Ct, Mt), !nt && !A.state.inline && !Mt.isPropagationAllowed && ve.stopPropagation();
          return;
        }
        if (N && ve.key === "Backspace" && Z.value === "" && N.highlightedChipIndex === void 0 && Array.isArray(I) && I.length > 0) {
          const nt = N.chipsRef.current.length, Mt = nt > 0 ? nt - 1 : I.length - 1, Ct = I.filter((Bt, kt) => kt !== Mt);
          Ae(), A.state.setSelectedValue(Ct, St(Xl, ve.nativeEvent));
          return;
        }
        const Ce = N?.highlightedChipIndex !== void 0, Ge = $e(ve);
        if (N?.setHighlightedChipIndex(Ge), Ge !== void 0 ? N?.chipsRef.current[Ge]?.focus() : Ce && A.state.inputRef.current?.focus(), ve.which !== 229 && ve.key === "Enter" && be) {
          const nt = A.state.activeIndex, Mt = ve.nativeEvent;
          if (nt === null) {
            if (xe)
              return;
            A.state.setOpen(!1, St(Xl, Mt));
            return;
          }
          An(ve), N1(A, nt, Mt);
        }
      },
      onPointerMove: Qe,
      onPointerDown: Qe
    }, He],
    stateAttributesMapping: T1
  }), Xe = M ? /* @__PURE__ */ S.jsx(C1.Provider, {
    value: E1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [be && _e && /* @__PURE__ */ S.jsx(z1, {
      ref: A.state.startDismissRef
    }), Xe]
  });
}), qT = {
  ...Eu,
  ...cT
}, PT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: p = !1,
    style: g,
    ...h
  } = o, {
    disabled: y
  } = ba(), v = Ol(), x = Se(v, Ee.selectionMode), C = Se(v, Ee.disabled), w = Se(v, Ee.readOnly), _ = Se(v, Ee.open), N = Se(v, Ee.selectedValue), T = Se(v, Ee.hasSelectionChips), M = Mp();
  let A = !1;
  x === "none" ? A = M !== "" : x === "single" ? A = N != null : A = T;
  const k = y || C || f, {
    buttonRef: H,
    getButtonProps: P
  } = _s({
    native: d,
    disabled: k
  }), {
    mounted: G,
    transitionStatus: L,
    setMounted: K
  } = vp(A), te = {
    disabled: k,
    visible: A,
    open: _,
    transitionStatus: L
  };
  Cu({
    open: A,
    ref: v.state.clearRef,
    onComplete() {
      A || K(!1);
    }
  });
  const se = Zl("button", o, {
    state: te,
    ref: [r, H, v.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(le) {
        le.preventDefault();
      },
      onClick(le) {
        if (k || w)
          return;
        const pe = v.state.keyboardActiveRef.current ? bp : yp;
        v.state.setInputValue("", St($y, le.nativeEvent)), x !== "none" ? (v.state.setSelectedValue(Array.isArray(N) ? [] : null, St($y, le.nativeEvent)), v.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: pe
        })) : v.state.setIndices({
          activeIndex: null,
          type: pe
        }), v.state.inputRef.current?.focus();
      }
    }, h, P],
    stateAttributesMapping: qT
  });
  return p || G ? se : null;
}), XT = /* @__PURE__ */ b.createContext(null);
function KT() {
  return b.useContext(XT);
}
function FT(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Ms(), a = KT(), c = a ? a.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const QT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var a;
  const {
    render: c,
    className: f,
    style: d,
    children: p,
    ...g
  } = o, h = Ol(), y = Nu(), v = !!kp(!0), {
    filteredItems: x,
    hasItems: C
  } = Ms(), w = Se(h, Ee.selectionMode), _ = Se(h, Ee.grid), N = Se(h, Ee.listProps), T = Se(h, Ee.virtualized), M = Se(h, Ee.forceMounted), A = w === "multiple", k = x.length === 0, H = Ke((de) => {
    h.set("positionerElement", de);
  }), P = Ke((de) => {
    h.set("listElement", de);
  }), G = b.useMemo(() => typeof p == "function" ? a || (a = /* @__PURE__ */ S.jsx(FT, {
    children: p
  })) : p, [p]), L = {
    empty: k
  }, K = y.useState("floatingId"), te = Zl("div", o, {
    state: L,
    ref: [r, P, v ? null : H],
    props: [N, {
      children: G,
      tabIndex: -1,
      id: K,
      role: _ ? "grid" : "listbox",
      "aria-multiselectable": A ? "true" : void 0,
      onKeyDown(de) {
        if (!(h.state.disabled || h.state.readOnly) && de.key === "Enter") {
          const le = h.state.activeIndex;
          if (le == null)
            return;
          An(de), N1(h, le, de.nativeEvent);
        }
      },
      onKeyDownCapture() {
        h.state.keyboardActiveRef.current = !0;
      },
      onPointerMoveCapture() {
        h.state.keyboardActiveRef.current = !1;
      }
    }, g]
  });
  if (T)
    return te;
  const se = C && !M ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ S.jsx(i2, {
    elementsRef: h.state.listRef,
    labelsRef: se,
    children: te
  });
}), ZT = "⁠", $T = 200;
function JT(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const a = o.currentNode;
    a.nodeValue !== "" && (r = a);
  }
  return r;
}
function WT() {
  const n = Oi(), o = b.useRef(null);
  return b.useEffect(() => {
    if (As)
      return;
    const r = o.current;
    if (r == null)
      return;
    const a = JT(r);
    if (a == null)
      return;
    const c = a.data, f = `${c}${ZT}`;
    return a.nodeValue = f, n.start($T, () => {
      a.nodeValue === f && (a.nodeValue = c);
    }), () => {
      n.clear(), a.nodeValue === f && (a.nodeValue = c);
    };
  }, [o, n]), o;
}
const D1 = /* @__PURE__ */ b.createContext(void 0);
function eO() {
  const n = b.useContext(D1);
  if (n === void 0)
    throw new Error(Eo(20));
  return n;
}
const tO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: a = !1,
    ...c
  } = o, f = Ol(), d = Se(f, Ee.mounted), p = Se(f, Ee.forceMounted);
  return d || a || p ? /* @__PURE__ */ S.jsx(D1.Provider, {
    value: a,
    children: /* @__PURE__ */ S.jsx(wM, {
      ref: r,
      ...c
    })
  }) : null;
}), nO = (n) => ({
  name: "arrow",
  options: n,
  async fn(o) {
    const {
      x: r,
      y: a,
      placement: c,
      rects: f,
      platform: d,
      elements: p,
      middlewareData: g
    } = o, {
      element: h,
      padding: y = 0,
      offsetParent: v = "real"
    } = Ai(n, o) || {};
    if (h == null)
      return {};
    const x = Y0(y), C = {
      x: r,
      y: a
    }, w = Wh(c), _ = Jh(w), N = await d.getDimensions(h), T = w === "y", M = T ? "top" : "left", A = T ? "bottom" : "right", k = T ? "clientHeight" : "clientWidth", H = f.reference[_] + f.reference[w] - C[w] - f.floating[_], P = C[w] - f.reference[w], G = v === "real" ? await d.getOffsetParent?.(h) : p.floating;
    let L = p.floating[k] || f.floating[_];
    (!L || !await d.isElement?.(G)) && (L = p.floating[k] || f.floating[_]);
    const K = H / 2 - P / 2, te = L / 2 - N[_] / 2 - 1, se = Math.min(x[M], te), de = Math.min(x[A], te), le = se, pe = L - N[_] - de, be = L / 2 - N[_] / 2 + K, V = G0(le, be, pe), I = !g.arrow && Di(c) != null && be !== V && f.reference[_] / 2 - (be < le ? se : de) - N[_] / 2 < 0, Q = I ? be < le ? be - le : be - pe : 0;
    return {
      [w]: C[w] + Q,
      data: {
        [w]: V,
        centerOffset: be - V - Q,
        ...I && {
          alignmentOffset: Q
        }
      },
      reset: I
    };
  }
}), lO = (n, o) => ({
  ...nO(n),
  options: [n, o]
}), oO = {
  name: "hide",
  async fn(n) {
    const {
      width: o,
      height: r,
      x: a,
      y: c
    } = n.rects.reference, f = o === 0 && r === 0 && a === 0 && c === 0, d = await n.platform.detectOverflow(n, {
      elementContext: "reference"
    });
    return {
      data: {
        referenceHidden: d.top - r >= 0 || d.right - o >= 0 || d.bottom - r >= 0 || d.left - o >= 0 || f
      }
    };
  }
}, iO = {
  sideX: "left",
  sideY: "top"
}, Cv = "--available-width", Rv = "--available-height";
function j1(n, o, r) {
  const a = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: a ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: a ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function wv(n, o, r) {
  const {
    rects: a,
    placement: c
  } = n;
  return {
    side: j1(o, Ql(c), r),
    align: Di(c) || "center",
    anchor: {
      width: a.reference.width,
      height: a.reference.height
    },
    positioner: {
      width: a.floating.width,
      height: a.floating.height
    }
  };
}
function rO(n) {
  return aO(n, $M);
}
function aO(n, o) {
  const {
    // Public parameters
    anchor: r,
    positionMethod: a = "absolute",
    side: c = "bottom",
    sideOffset: f = 0,
    align: d = "center",
    alignOffset: p = 0,
    collisionBoundary: g,
    collisionPadding: h = 5,
    sticky: y = !1,
    arrowPadding: v = 5,
    disableAnchorTracking: x = !1,
    inline: C,
    // Private parameters
    keepMounted: w = !1,
    floatingRootContext: _,
    mounted: N,
    collisionAvoidance: T,
    shift: M,
    nodeId: A,
    adaptiveOrigin: k,
    lazyFlip: H = !1,
    externalTree: P
  } = n, [G, L] = b.useState(null);
  !N && G !== null && L(null);
  const K = T.side || "flip", te = T.align || "flip", se = T.fallbackAxisSide || "end", de = M?.crossAxis ?? !1, le = M?.rootBoundary, pe = typeof r == "function" ? r : void 0, be = Ke(pe), V = pe ? be : r, I = fl(r), Q = fl(N), ae = Np() === "rtl", z = G || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": ae ? "left" : "right",
    "inline-start": ae ? "right" : "left"
  }[c], F = d === "center" ? z : `${z}-${d}`;
  let ne = h;
  typeof ne == "number" ? ne = {
    top: ne,
    right: ne,
    bottom: ne,
    left: ne
  } : ne && (ne = {
    top: ne.top || 0,
    right: ne.right || 0,
    bottom: ne.bottom || 0,
    left: ne.left || 0
  });
  const oe = 1, ge = c === "bottom" ? oe : 0, _e = c === "top" ? oe : 0, qe = c === "right" ? oe : 0, Me = c === "left" ? oe : 0, Te = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: ne
  }, it = b.useRef(null), gt = fl(f), ke = fl(p), et = typeof f != "function" ? f : 0, Ne = typeof p != "function" ? p : 0, je = [];
  C && je.push(C), je.push(B_((ot) => {
    const ht = wv(ot, c, ae), Je = typeof gt.current == "function" ? gt.current(ht) : gt.current, Nt = typeof ke.current == "function" ? ke.current(ht) : ke.current;
    return {
      mainAxis: Je,
      crossAxis: Nt,
      alignmentAxis: Nt
    };
  }, [et, Ne, ae, c]));
  const He = te === "none" && K !== "shift", Ae = !He && (y || de || K === "shift"), Qe = K === "none" ? null : q_({
    ...Te,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: ne.top + oe + ge,
      right: ne.right + oe + Me,
      bottom: ne.bottom + oe + _e,
      left: ne.left + oe + qe
    },
    mainAxis: !de && K === "flip",
    crossAxis: te === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: se
  }), Oe = He ? null : G_({
    ...Te,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: le,
    mainAxis: te !== "none",
    crossAxis: Ae,
    limiter: y || de ? void 0 : Y_((ot) => {
      if (!it.current)
        return {};
      const {
        width: ht,
        height: Je
      } = it.current.getBoundingClientRect(), Nt = Fl(Ql(ot.placement)), Rn = Nt === "y" ? ht : Je, yn = Nt === "y" ? ne.left + ne.right : ne.top + ne.bottom;
      return {
        offset: Rn / 2 + yn / 2
      };
    })
  }, [Te, y, de, le, ne, te]);
  K === "shift" || te === "shift" || d === "center" ? je.push(Oe, Qe) : je.push(Qe, Oe), je.push(P_({
    ...Te,
    apply({
      elements: {
        floating: ot
      },
      availableWidth: ht,
      availableHeight: Je,
      rects: Nt
    }) {
      if (!Q.current)
        return;
      const Rn = ot.style;
      Rn.setProperty(Cv, `${ht}px`), Rn.setProperty(Rv, `${Je}px`);
      const yn = un(ot).devicePixelRatio || 1, {
        x: Yt,
        y: el,
        width: Dt,
        height: io
      } = Nt.reference, Kn = (Math.round((Yt + Dt) * yn) - Math.round(Yt * yn)) / yn, nn = (Math.round((el + io) * yn) - Math.round(el * yn)) / yn;
      Rn.setProperty("--anchor-width", `${Kn}px`), Rn.setProperty("--anchor-height", `${nn}px`);
    }
  }), lO((ot) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || $t(ot.elements.floating).createElement("div"),
    padding: v,
    offsetParent: "floating"
  }), [v]), {
    name: "transformOrigin",
    fn(ot) {
      const {
        elements: ht,
        middlewareData: Je,
        placement: Nt,
        rects: Rn,
        y: yn
      } = ot, Yt = Ql(Nt), el = Fl(Yt), Dt = it.current, io = Je.arrow?.x || 0, Kn = Je.arrow?.y || 0, nn = Dt?.clientWidth || 0, ro = Dt?.clientHeight || 0, Nl = io + nn / 2, tl = Kn + ro / 2, Co = Math.abs(Je.shift?.y || 0), vn = Rn.reference.height / 2, Tt = typeof f == "function" ? f(wv(ot, c, ae)) : f, Rt = Co > Tt, Ye = {
        top: `${Nl}px calc(100% + ${Tt}px)`,
        bottom: `${Nl}px ${-Tt}px`,
        left: `calc(100% + ${Tt}px) ${tl}px`,
        right: `${-Tt}px ${tl}px`
      }[Yt], Vn = `${Nl}px ${Rn.reference.y + vn - yn}px`;
      return ht.floating.style.setProperty("--transform-origin", Ae && el === "y" && Rt ? Vn : Ye), {};
    }
  }, oO, k), Fe(() => {
    !N && _ && _.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [N, _]);
  const $e = b.useMemo(() => ({
    elementResize: !x && typeof ResizeObserver < "u",
    layoutShift: !x && typeof IntersectionObserver < "u"
  }), [x]), {
    refs: tt,
    elements: Xe,
    x: ve,
    y: Z,
    middlewareData: ue,
    update: Ie,
    placement: Ce,
    context: Ge,
    isPositioned: nt,
    floatingStyles: Mt
  } = o({
    rootContext: _,
    open: w ? N : void 0,
    placement: F,
    middleware: je,
    strategy: a,
    whileElementsMounted: w ? void 0 : (...ot) => Uy(...ot, $e),
    nodeId: A,
    externalTree: P
  }), {
    sideX: Ct,
    sideY: Bt
  } = ue.adaptiveOrigin || iO, kt = nt ? a : "fixed", vt = b.useMemo(() => {
    let ot;
    return nt ? k ? ot = {
      position: kt,
      [Ct]: ve,
      [Bt]: Z
    } : ot = {
      ...Mt,
      position: kt
    } : ot = {
      position: kt,
      top: 0,
      left: 0
    }, ot[Cv] = "100vw", ot[Rv] = "100vh", nt || (ot.opacity = 0), ot;
  }, [k, kt, Ct, ve, Bt, Z, Mt, nt]), Ft = b.useRef(null);
  Fe(() => {
    if (!N)
      return;
    const ot = I.current, ht = typeof ot == "function" ? ot() : ot, Nt = (_v(ht) ? ht.current : ht) || null || null;
    Nt !== Ft.current && (tt.setPositionReference(Nt), Ft.current = Nt);
  }, [N, tt, V, I]), b.useEffect(() => {
    if (!N)
      return;
    const ot = I.current;
    typeof ot != "function" && _v(ot) && ot.current !== Ft.current && (tt.setPositionReference(ot.current), Ft.current = ot.current);
  }, [N, tt, V, I]), b.useEffect(() => {
    if (w && N && Xe.reference && Xe.floating)
      return Uy(Xe.reference, Xe.floating, Ie, $e);
  }, [w, N, Xe, Ie, $e]);
  const dt = Ql(Ce), Wt = j1(c, dt, ae), ut = Di(Ce) || "center", En = !!ue.hide?.referenceHidden;
  Fe(() => {
    H && N && nt && dt !== z && L(dt);
  }, [H, N, nt, dt, z]);
  const Cn = b.useMemo(() => ({
    position: "absolute",
    top: ue.arrow?.y,
    left: ue.arrow?.x
  }), [ue.arrow]), zt = ue.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: vt,
    arrowStyles: Cn,
    arrowRef: it,
    arrowUncentered: zt,
    side: Wt,
    align: ut,
    physicalSide: dt,
    anchorHidden: En,
    refs: tt,
    context: Ge,
    isPositioned: nt,
    update: Ie
  }), [vt, Cn, it, zt, Wt, ut, dt, En, tt, Ge, nt, Ie]);
}
function _v(n) {
  return n != null && "current" in n;
}
function L1(n) {
  return n === "starting" ? vM : dl;
}
function sO(n, o, {
  styles: r,
  transitionStatus: a,
  props: c,
  refs: f,
  hidden: d,
  inert: p = !1
}) {
  const g = {
    ...r
  };
  return p && (g.pointerEvents = "none"), Zl("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: g
    }, L1(a), c],
    stateAttributesMapping: Ap
  });
}
const cO = 20;
function uO(n, o, r, a) {
  const [c, f] = b.useState(!1);
  Fe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = $t(r).documentElement.clientWidth, p = r.offsetWidth;
    f(d > 0 && p > 0 && p >= d - cO);
  }, [n, o, r]), oM(n && (!o || c), a);
}
const fO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    anchor: f,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod: d,
    side: p,
    align: g,
    sideOffset: h,
    alignOffset: y,
    collisionBoundary: v = "clipping-ancestors",
    collisionPadding: x,
    arrowPadding: C,
    sticky: w,
    disableAnchorTracking: _ = !1,
    collisionAvoidance: N = SM,
    style: T,
    ...M
  } = o, A = Ol(), k = Nu(), H = eO(), P = Se(A, Ee.modal), G = Se(A, Ee.open), L = Se(A, Ee.mounted), K = Se(A, Ee.openMethod), te = Se(A, Ee.positionerElement), se = Se(A, Ee.triggerElement), de = Se(A, Ee.inputElement), le = Se(A, Ee.inputGroupElement), pe = Se(A, Ee.inputInsidePopup), be = Se(A, Ee.transitionStatus), V = zu(), Q = rO({
    anchor: f ?? (pe ? se : le ?? de),
    floatingRootContext: k,
    positionMethod: d,
    mounted: L,
    side: p,
    sideOffset: h,
    align: g,
    alignOffset: y,
    arrowPadding: C,
    collisionBoundary: v,
    collisionPadding: x,
    sticky: w,
    disableAnchorTracking: _,
    keepMounted: H,
    collisionAvoidance: N,
    lazyFlip: !0
  });
  uO(G && P, K === "touch", te, se);
  const xe = {
    open: G,
    side: Q.side,
    align: Q.align,
    anchorHidden: Q.anchorHidden,
    empty: V
  };
  Fe(() => {
    A.set("popupSide", Q.side);
  }, [A, Q.side]);
  const ae = Ke((F) => {
    A.set("positionerElement", F);
  }), z = sO(o, xe, {
    styles: Q.positionerStyles,
    transitionStatus: be,
    props: M,
    refs: [r, ae],
    hidden: !L,
    inert: !G
  });
  return /* @__PURE__ */ S.jsxs(k1.Provider, {
    value: Q,
    children: [L && P && /* @__PURE__ */ S.jsx(dT, {
      inert: fT(!G),
      cutout: le ?? de ?? se
    }), z]
  });
}), dO = {
  ...Ap,
  ...Eu
}, hO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: p,
    ...g
  } = o, h = Ol(), y = kp(), v = Nu(), x = Se(h, Ee.mounted), C = Se(h, Ee.open), w = Se(h, Ee.openMethod), _ = Se(h, Ee.popupProps), N = Se(h, Ee.transitionStatus), T = Se(h, Ee.inputInsidePopup), M = Se(h, Ee.inputElement), A = Se(h, Ee.modal), k = Se(h, Ee.id), H = zu(), P = g.id ?? (T ? _1(k) : void 0);
  Fe(() => (h.set("popupId", h.state.popupRef.current?.id || P), () => {
    h.set("popupId", void 0);
  }), [h, P]), Cu({
    open: C,
    ref: h.state.popupRef,
    onComplete() {
      C && h.state.onOpenChangeComplete(!0);
    }
  });
  const G = {
    open: C,
    side: y.side,
    align: y.align,
    anchorHidden: y.anchorHidden,
    transitionStatus: N,
    empty: H
  }, L = Zl("div", o, {
    state: G,
    ref: [r, h.state.popupRef],
    props: [_, {
      id: P,
      role: T ? "dialog" : "presentation",
      onFocus(le) {
        const pe = Ml(le.nativeEvent);
        w !== "touch" && (at(h.state.listElement, pe) || pe === le.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, L1(N), g],
    stateAttributesMapping: dO
  }), te = d === void 0 ? T ? (le) => le === "touch" ? h.state.popupRef.current : M : !1 : d;
  let se;
  p != null ? se = p : se = T ? void 0 : !1;
  const de = !T || A;
  return /* @__PURE__ */ S.jsx(NM, {
    context: v,
    disabled: !x,
    modal: de,
    openInteractionType: w,
    initialFocus: te,
    returnFocus: se,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [L, de && /* @__PURE__ */ S.jsx(z1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), V1 = /* @__PURE__ */ b.createContext(void 0);
function I1() {
  const n = b.useContext(V1);
  if (!n)
    throw new Error(Eo(19));
  return n;
}
const pO = /* @__PURE__ */ b.createContext(!1);
function mO() {
  return b.useContext(pO);
}
function H1(n) {
  const {
    componentProps: o,
    forwardedRef: r,
    virtualized: a,
    indexFromFilter: c
  } = n, {
    render: f,
    className: d,
    style: p,
    value: g = null,
    index: h,
    disabled: y = !1,
    nativeButton: v = !1,
    ...x
  } = o, C = b.useRef(null), w = L2({
    guess: !0,
    index: h,
    textRef: C
  }), _ = Ol(), N = mO(), T = yT(), M = Se(_, Ee.selectionMode), A = Se(_, Ee.disabled), k = Se(_, Ee.readOnly), H = Se(_, Ee.isItemEqualToValue), P = A || y, G = M !== "none", L = h ?? c ?? w.index, K = L !== -1, te = Se(_, Ee.id), se = Se(_, Ee.isActive, L), de = Se(_, Ee.isSelected, g), le = Se(_, Ee.itemProps), pe = b.useRef(null), be = te != null && K ? `${te}-${L}` : void 0, V = de && G;
  Fe(() => {
    if (!(K && (a || h != null)))
      return;
    const ge = _.state.listRef.current;
    return ge[L] = pe.current, () => {
      delete ge[L];
    };
  }, [K, a, L, h, _]), Fe(() => {
    if (!K || T)
      return;
    const oe = _.state.valuesRef.current;
    return oe[L] = g, () => {
      delete oe[L];
    };
  }, [K, T, L, g, _]), Fe(() => {
    if (!K || T)
      return;
    const oe = _.state.selectedValue, ge = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Ni(g, ge, H) && _.set("selectedIndex", L);
  }, [K, T, _, L, g, H]);
  const {
    getButtonProps: I,
    buttonRef: Q
  } = _s({
    disabled: P,
    focusableWhenDisabled: !0,
    native: v,
    composite: !0
  }), xe = {
    disabled: P,
    selected: V,
    highlighted: se
  };
  function ae(oe) {
    function ge() {
      _.state.handleSelection(oe, g);
    }
    _.state.submitOnItemClick ? (pa.flushSync(ge), _.state.requestSubmit()) : ge();
  }
  const z = {
    id: be,
    role: N ? "gridcell" : "option",
    "aria-selected": G ? V : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(oe) {
      oe.isPrimary && (_.state.pointerDownItemRef.current = oe.currentTarget), oe.preventDefault();
    },
    onMouseDown(oe) {
      oe.preventDefault();
    },
    onClick(oe) {
      P || k || ae(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const ge = _.state.pointerDownItemRef.current === oe.currentTarget;
      _.state.pointerDownItemRef.current = null, !(P || k || oe.button !== 0 || ge || !se) && ae(oe.nativeEvent);
    }
  }, F = Zl("div", o, {
    ref: [Q, r, w.ref, pe],
    state: xe,
    props: [le, z, x, I]
  }), ne = b.useMemo(() => ({
    selected: V,
    textRef: C
  }), [V, C]);
  return /* @__PURE__ */ S.jsx(V1.Provider, {
    value: ne,
    children: F
  });
}
function gO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, a = Ol(), c = Se(a, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = Ms(), d = y1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(H1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const bO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Ol(), c = Se(a, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(gO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(H1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), yO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    ...p
  } = o, {
    filteredItems: g
  } = Ms(), h = Ol(), y = WT(), v = g.length === 0 ? d : null;
  return Zl("div", o, {
    ref: [r, h.state.emptyRef, y],
    props: [{
      children: v,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, p]
  });
});
function vO(n, o, r, a = !0, c) {
  const [f, d] = b.useState(), p = xu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Fe(() => {
    const h = n || o || !a ? void 0 : xO(r.current, p);
    f !== h && d(h);
  }), g;
}
function xO(n, o) {
  const r = SO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function SO(n) {
  if (!n)
    return;
  const o = n.parentElement;
  if (o && o.tagName === "LABEL")
    return o;
  const r = n.id;
  if (r) {
    const c = n.nextElementSibling;
    if (c && c.htmlFor === r)
      return c;
  }
  const a = n.labels;
  return a && a[0];
}
function EO(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: a,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ S.jsx(DT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: a,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function CO(n) {
  const {
    children: o,
    placeholder: r
  } = n, a = Ol(), c = Se(a, Ee.itemToStringLabel), f = Se(a, Ee.selectedValue), d = Se(a, Ee.items), p = Se(a, Ee.selectionMode) === "multiple", g = Se(a, Ee.hasSelectedValue), h = !g && r != null && o == null, y = Se(a, Ee.hasNullItemLabel, h);
  let v = null;
  return typeof o == "function" ? v = o(f) : o != null ? v = o : !g && r != null && !y ? v = r : p && Array.isArray(f) ? v = CT(f, d, c) : v = v1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: v
  });
}
const RO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: a
  } = I1();
  return o.keepMounted || a ? /* @__PURE__ */ S.jsx(wO, {
    ...o,
    ref: r
  }) : null;
}), wO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: a,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: p
  } = I1(), g = b.useRef(null), {
    transitionStatus: h,
    setMounted: y
  } = vp(p), x = Zl("span", n, {
    ref: [o, g],
    state: {
      selected: p,
      transitionStatus: h
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: Eu
  });
  return Cu({
    open: p,
    ref: g,
    onComplete() {
      p || y(!1);
    }
  }), x;
})), U1 = /* @__PURE__ */ b.createContext(void 0);
function _O() {
  const n = b.useContext(U1);
  if (n === void 0)
    throw new Error(Eo(63));
  return n;
}
const B1 = {
  ...S1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, AO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: a,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: p,
    id: g,
    inputRef: h,
    name: y,
    nativeButton: v = !1,
    onCheckedChange: x,
    readOnly: C = !1,
    required: w = !1,
    disabled: _ = !1,
    render: N,
    uncheckedValue: T,
    value: M,
    style: A,
    ...k
  } = o, {
    clearErrors: H
  } = w1(), {
    state: P,
    setTouched: G,
    setDirty: L,
    validityData: K,
    setFilled: te,
    setFocused: se,
    validationMode: de,
    disabled: le,
    name: pe,
    validation: be
  } = ba(), {
    labelId: V
  } = ku(), I = le || _, Q = pe ?? y, xe = b.useRef(null), ae = cr(xe, h, be.inputRef), z = b.useRef(null), F = xu(), ne = Op({
    id: g,
    implicit: !1,
    controlRef: z
  }), oe = v ? void 0 : ne, [ge, _e] = Fc({
    controlled: a,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  R1(z, F, ge, void 0, !I, y), Fe(() => {
    xe.current && te(xe.current.checked);
  }, [te]), aa(ge, () => {
    H(Q), L(ge !== K.initialValue), te(ge), be.change(ge);
  });
  const {
    getButtonProps: qe,
    buttonRef: Me
  } = _s({
    disabled: I,
    native: v
  }), Te = vO(d, V, xe, !v, oe), it = {
    id: v ? ne : F,
    role: "switch",
    "aria-checked": ge,
    "aria-readonly": C || void 0,
    "aria-required": w || void 0,
    "aria-labelledby": Te,
    onFocus() {
      I || se(!0);
    },
    onBlur() {
      const Ne = xe.current;
      !Ne || I || (G(!0), se(!1), de === "onBlur" && be.commit(Ne.checked));
    },
    onClick(Ne) {
      if (C || I)
        return;
      Ne.preventDefault();
      const je = xe.current;
      je && Qc(je, Ne);
    }
  }, gt = {
    ...be.getValidationProps(I),
    checked: ge,
    disabled: I,
    form: p,
    id: oe,
    name: Q,
    required: w,
    style: Q ? Rp : Cp,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: ae,
    onChange(Ne) {
      if (Ne.nativeEvent.defaultPrevented)
        return;
      if (C) {
        Ne.preventDefault();
        return;
      }
      const je = Ne.currentTarget.checked, He = St(Xl, Ne.nativeEvent);
      x?.(je, He), !He.isCanceled && _e(je);
    },
    onClick(Ne) {
      Ne.stopPropagation();
    },
    onFocus() {
      z.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...M !== void 0 ? {
      value: M
    } : dl
  }, ke = b.useMemo(() => ({
    ...P,
    checked: ge,
    disabled: I,
    readOnly: C,
    required: w
  }), [P, ge, I, C, w]), et = Zl("span", o, {
    state: ke,
    ref: [r, z, Me],
    props: [it, k, qe, (Ne) => be.getValidationProps(I, Ne)],
    stateAttributesMapping: B1
  });
  return /* @__PURE__ */ S.jsxs(U1.Provider, {
    value: ke,
    children: [et, !ge && Q && T !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: p,
      name: Q,
      value: T,
      disabled: I
    }), /* @__PURE__ */ S.jsx("input", {
      ...gt,
      suppressHydrationWarning: !0
    })]
  });
}), MO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    ...d
  } = o, p = _O();
  return Zl("span", o, {
    state: p,
    ref: r,
    stateAttributesMapping: B1,
    props: d
  });
});
function G1({ className: n, type: o, ...r }) {
  return /* @__PURE__ */ S.jsx(
    "input",
    {
      type: o,
      "data-slot": "input",
      className: We(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        n
      ),
      ...r
    }
  );
}
function TO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: We(
        "group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
        "h-9 min-w-0 has-[>textarea]:h-auto",
        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        n
      ),
      ...o
    }
  );
}
const OO = br(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
        "block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function NO({
  className: n,
  align: o = "inline-start",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": o,
      className: We(OO({ align: o }), n),
      onClick: (a) => {
        a.target.closest("button") || a.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const kO = br(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
function Y1({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: a = "xs",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    or,
    {
      type: o,
      "data-size": a,
      variant: r,
      className: We(kO({ size: a }), n),
      ...c
    }
  );
}
function zO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    G1,
    {
      "data-slot": "input-group-control",
      className: We(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        n
      ),
      ...o
    }
  );
}
const DO = EO;
function jO({ ...n }) {
  return /* @__PURE__ */ S.jsx(CO, { "data-slot": "combobox-value", ...n });
}
function q1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    UT,
    {
      "data-slot": "combobox-trigger",
      className: We("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          r0,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function LO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    PT,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(Y1, { variant: "ghost", size: "icon-xs" }),
      className: We(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(c0, { className: "pointer-events-none" })
    }
  );
}
function VO({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: a = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(TO, { className: We("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      YT,
      {
        render: /* @__PURE__ */ S.jsx(zO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(NO, { align: "inline-end", children: [
      a && /* @__PURE__ */ S.jsx(
        Y1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ S.jsx(q1, {})
        }
      ),
      c && /* @__PURE__ */ S.jsx(LO, { disabled: r })
    ] }),
    o
  ] });
}
function IO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: a = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...p
}) {
  return /* @__PURE__ */ S.jsx(tO, { container: d, children: /* @__PURE__ */ S.jsx(
    fO,
    {
      side: o,
      sideOffset: r,
      align: a,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        hO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: We(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            n
          ),
          ...p
        }
      )
    }
  ) });
}
function HO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    QT,
    {
      "data-slot": "combobox-list",
      className: We(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        n
      ),
      ...o
    }
  );
}
function UO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    bO,
    {
      "data-slot": "combobox-item",
      className: We(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          RO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ S.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ S.jsx(dR, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function BO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    yO,
    {
      "data-slot": "combobox-empty",
      className: We(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        n
      ),
      ...o
    }
  );
}
function GO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    uA,
    {
      "data-slot": "label",
      className: We(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        n
      ),
      ...o
    }
  );
}
function Av({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: We(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        n
      ),
      ...o
    }
  );
}
const YO = br(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Wr({
  className: n,
  orientation: o = "vertical",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": o,
      className: We(YO({ orientation: o }), n),
      ...r
    }
  );
}
function ea({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    GO,
    {
      "data-slot": "field-label",
      className: We(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        n
      ),
      ...o
    }
  );
}
function vo({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: We(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        n
      ),
      ...o
    }
  );
}
function sh({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: We("group/item-group flex flex-col", n),
      ...o
    }
  );
}
const qO = br(
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
function PO({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? f0 : "div";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: We(qO({ variant: o, size: r }), n),
      ...c
    }
  );
}
function XO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "item-content",
      className: We(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        n
      ),
      ...o
    }
  );
}
function KO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "item-title",
      className: We(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        n
      ),
      ...o
    }
  );
}
function Gc({
  className: n,
  defaultValue: o,
  value: r,
  min: a = 0,
  max: c = 100,
  ...f
}) {
  const d = o ?? [a], p = b.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(d) ? d : [a],
    [r, d, a]
  );
  return /* @__PURE__ */ S.jsxs(
    CA,
    {
      "data-slot": "slider",
      defaultValue: r == null ? d : void 0,
      value: r,
      min: a,
      max: c,
      className: We(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        n
      ),
      ...f,
      children: [
        /* @__PURE__ */ S.jsx(
          AA,
          {
            "data-slot": "slider-track",
            className: We(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              MA,
              {
                "data-slot": "slider-range",
                className: We(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: p.length }, (g, h) => /* @__PURE__ */ S.jsx(
          zA,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          h
        ))
      ]
    }
  );
}
function Mv({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    AO,
    {
      "data-slot": "switch",
      className: We(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        o === "default" && "h-[1.15rem] w-8",
        o === "sm" && "h-3.5 w-6",
        n
      ),
      ...r,
      children: /* @__PURE__ */ S.jsx(
        MO,
        {
          "data-slot": "switch-thumb",
          className: We(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
            o === "default" && "size-4",
            o === "sm" && "size-3"
          )
        }
      )
    }
  );
}
const FO = br(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), P1 = b.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function Vh({
  className: n,
  variant: o,
  size: r,
  spacing: a = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    BA,
    {
      "data-slot": "toggle-group",
      "data-variant": o,
      "data-size": r,
      "data-spacing": a,
      style: { "--gap": a },
      className: We(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        n
      ),
      ...f,
      children: /* @__PURE__ */ S.jsx(P1.Provider, { value: { variant: o, size: r, spacing: a }, children: c })
    }
  );
}
function nr({
  className: n,
  children: o,
  variant: r,
  size: a,
  ...c
}) {
  const f = b.useContext(P1);
  return /* @__PURE__ */ S.jsx(
    XA,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || a,
      "data-spacing": f.spacing,
      className: We(
        FO({
          variant: f.variant || r,
          size: f.size || a
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        n
      ),
      ...c,
      children: o
    }
  );
}
const Tv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Ov = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], _l = ["#ff0099", "#b8ff00", "#00b7ff"], QO = _l.length, ZO = ["line", "spline", "gradient"], $O = ["spline", "shape", "gradient"], JO = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, WO = ["select", "lasso"], eN = ["point", "line", "spline", "shape"];
function tN(n, o) {
  const [r, a] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(a - r), Math.abs(f - c));
}
function ch(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Nv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const nN = {
  select: AR,
  lasso: ER,
  polygon: TR,
  rectangle: LR,
  ellipse: Ty,
  point: Ty,
  line: a0,
  spline: DR,
  shape: s0
};
function kv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    Vh,
    {
      type: "single",
      variant: "outline",
      size: "sm",
      spacing: 0,
      value: o,
      onValueChange: (a) => {
        a && r(a);
      },
      children: n.map((a) => {
        const c = nN[a] ?? s0, f = JO[a] ?? a;
        return /* @__PURE__ */ S.jsx(
          nr,
          {
            value: a,
            title: f,
            "aria-label": f,
            className: "size-6 min-w-6 px-0",
            children: /* @__PURE__ */ S.jsx(c, {})
          },
          a
        );
      })
    }
  ) : null;
}
function bs({ color: n, className: o }) {
  return /* @__PURE__ */ S.jsx(
    "span",
    {
      className: We(
        "inline-block size-2.5 shrink-0 rounded-full ring-1 ring-border",
        o
      ),
      style: { backgroundColor: n },
      "aria-hidden": !0
    }
  );
}
function X1({ active: n }) {
  return /* @__PURE__ */ S.jsx(
    "span",
    {
      className: We(
        "inline-block size-2.5 shrink-0 rounded-full border border-foreground",
        n ? "bg-foreground" : "bg-transparent"
      ),
      "aria-hidden": !0
    }
  );
}
function lN({
  modes: n,
  mode: o,
  onMode: r
}) {
  const a = n.filter((f) => WO.includes(f)), c = n.filter((f) => eN.includes(f));
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        a.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ S.jsx(kv, { modes: a, value: o, onChange: r })
        ] }) : null,
        a.length && c.length ? /* @__PURE__ */ S.jsx(FA, { orientation: "vertical", className: "h-5" }) : null,
        c.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ S.jsx(kv, { modes: c, value: o, onChange: r })
        ] }) : null
      ]
    }
  );
}
function uh({
  active: n,
  color: o,
  label: r,
  hidden: a,
  shown: c,
  onSelect: f,
  onRename: d,
  onDelete: p,
  onToggleHidden: g
}) {
  const [h, y] = b.useState(!1), [v, x] = b.useState(r);
  return /* @__PURE__ */ S.jsxs(
    PO,
    {
      variant: n ? "muted" : "default",
      size: "sm",
      className: We(
        "w-full min-w-0 cursor-pointer flex-nowrap gap-1 px-0 py-0.5",
        n && "border-ring ring-[3px] ring-ring/35",
        a && "opacity-50"
      ),
      onClick: f,
      children: [
        g ? /* @__PURE__ */ S.jsx(
          or,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": a ? "Show landmark" : "Hide landmark",
            onClick: (C) => {
              C.stopPropagation(), g();
            },
            children: a ? /* @__PURE__ */ S.jsx(xR, {}) : /* @__PURE__ */ S.jsx(yR, {})
          }
        ) : null,
        o ? /* @__PURE__ */ S.jsx(bs, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ S.jsx(X1, { active: c }) : null,
        /* @__PURE__ */ S.jsx(XO, { className: "min-w-0 gap-0", children: h && d ? /* @__PURE__ */ S.jsx(
          G1,
          {
            "aria-label": "Rename layer",
            value: v,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (C) => C.stopPropagation(),
            onChange: (C) => x(C.target.value),
            onBlur: () => {
              d(v), y(!1);
            },
            onKeyDown: (C) => {
              C.stopPropagation(), C.key === "Enter" ? (C.preventDefault(), d(v), y(!1)) : C.key === "Escape" && (C.preventDefault(), x(r), y(!1));
            }
          }
        ) : /* @__PURE__ */ S.jsx(
          KO,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (C) => {
              d && (C.preventDefault(), C.stopPropagation(), x(r), y(!0));
            },
            children: r
          }
        ) }),
        p ? /* @__PURE__ */ S.jsx(
          or,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (C) => {
              C.stopPropagation(), p();
            },
            children: /* @__PURE__ */ S.jsx(c0, {})
          }
        ) : null
      ]
    }
  );
}
const su = "px-3";
function zv(n, o) {
  const r = n?.vmin ?? 0, a = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, a));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function oN({
  colors: n,
  labels: o,
  lo: r,
  hi: a
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${iN(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ S.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ S.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ S.jsx(bs, { color: n[d] || "#94a3b8" }),
          /* @__PURE__ */ S.jsx("span", { className: "truncate", children: f })
        ]
      },
      `${f}-${d}`
    )) }),
    /* @__PURE__ */ S.jsx(
      "div",
      {
        className: "h-2.5 w-full rounded-full border border-border",
        style: { background: c }
      }
    ),
    /* @__PURE__ */ S.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground tabular-nums", children: [
      /* @__PURE__ */ S.jsx("span", { children: Nv(r) }),
      /* @__PURE__ */ S.jsx("span", { children: Nv(a) })
    ] })
  ] });
}
function iN(n, o) {
  const r = n.replace("#", ""), a = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), p = parseInt(a.slice(0, 2), 16), g = parseInt(a.slice(2, 4), 16), h = parseInt(a.slice(4, 6), 16), y = Math.min(255, c + p), v = Math.min(255, f + g), x = Math.min(255, d + h);
  return `#${[y, v, x].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function rN(n, o, r, a, c, f, d) {
  const p = [
    [n, o],
    [r, a],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [y, v] = p[(h + 2) % 3], [x, C] = p[h], [w, _] = p[(h + 1) % 3], N = Math.hypot(x - y, C - v) || 1, T = Math.hypot(w - x, _ - C) || 1, M = Math.min(d, N * 0.35, T * 0.35), A = x + (y - x) / N * M, k = C + (v - C) / N * M, H = x + (w - x) / T * M, P = C + (_ - C) / T * M;
    h === 0 ? g.push(`M ${A} ${k}`) : g.push(`L ${A} ${k}`), g.push(`Q ${x} ${C} ${H} ${P}`);
  }
  return g.push("Z"), g.join(" ");
}
const ul = 80, zp = 12, fh = 4, Dv = 5, aN = ul - 2 * zp, K1 = Math.sqrt(3) / 2 * aN, F1 = (ul - K1) / 2, Q1 = F1 + K1, fr = { x: ul / 2, y: F1 }, dr = { x: zp, y: Q1 }, hr = { x: ul - zp, y: Q1 }, jv = {
  x: (dr.x + fr.x + hr.x) / 3,
  y: (dr.y + fr.y + hr.y) / 3
};
function Dp(n) {
  const o = n.x - jv.x, r = n.y - jv.y, a = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / a * Dv,
    y: n.y + r / a * Dv
  };
}
const Lv = Dp(dr), Vv = Dp(fr), Iv = Dp(hr), Hv = rN(
  dr.x,
  dr.y,
  fr.x,
  fr.y,
  hr.x,
  hr.y,
  8
);
function dh(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function sN() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const a = r.createImageData(o, o), c = dh(_l[0]), f = dh(_l[1]), d = dh(_l[2]), p = dr.x / ul, g = dr.y / ul, h = fr.x / ul, y = fr.y / ul, v = hr.x / ul, x = hr.y / ul, C = (y - x) * (p - v) + (v - h) * (g - x);
  for (let w = 0; w < o; w++)
    for (let _ = 0; _ < o; _++) {
      const N = (_ + 0.5) / o, T = (w + 0.5) / o, M = ((y - x) * (N - v) + (v - h) * (T - x)) / C, A = ((x - g) * (N - v) + (p - v) * (T - x)) / C, k = 1 - M - A, H = (w * o + _) * 4;
      if (M < -0.02 || A < -0.02 || k < -0.02) {
        a.data[H + 3] = 0;
        continue;
      }
      const P = Math.max(0, M), G = Math.max(0, A), L = Math.max(0, k);
      a.data[H] = Math.min(255, Math.round(c[0] * P + f[0] * G + d[0] * L)), a.data[H + 1] = Math.min(
        255,
        Math.round(c[1] * P + f[1] * G + d[1] * L)
      ), a.data[H + 2] = Math.min(
        255,
        Math.round(c[2] * P + f[2] * G + d[2] * L)
      ), a.data[H + 3] = 255;
    }
  return r.putImageData(a, 0, 0), n.toDataURL();
}
function cN() {
  const n = b.useId(), o = b.useMemo(() => sN(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${ul} ${ul}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: Hv }) }) }),
        o ? /* @__PURE__ */ S.jsx(
          "image",
          {
            href: o,
            width: ul,
            height: ul,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ S.jsx(
          "path",
          {
            d: Hv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Lv.x,
            cy: Lv.y,
            r: fh,
            fill: _l[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Vv.x,
            cy: Vv.y,
            r: fh,
            fill: _l[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Iv.x,
            cy: Iv.y,
            r: fh,
            fill: _l[2]
          }
        )
      ]
    }
  ) });
}
function uN({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: a, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (a !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(cN, {});
  const p = d.map((y, v) => _l[v % _l.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const v = r.find((x) => x.name === y);
      h = Math.max(h, zv(v, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((x) => x.name === d[0]), v = zv(y, c);
    g = v.lo, h = v.hi;
  }
  return /* @__PURE__ */ S.jsx(
    oN,
    {
      colors: p,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function fN({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: a, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        Mv,
        {
          size: "sm",
          checked: a === "shared",
          onCheckedChange: (f) => n.setGeneScaleMode(f ? "shared" : "independent")
        }
      )
    ] }),
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "log1p",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Compress high expression" })
      ] }),
      /* @__PURE__ */ S.jsx(
        Mv,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function dN() {
  const n = b.useRef(null), [o, r] = b.useState(null);
  return b.useLayoutEffect(() => {
    const a = n.current?.closest(
      ".spatial-rx-widget"
    );
    if (!a) return;
    const c = a.getRootNode(), f = c instanceof ShadowRoot ? c : a.ownerDocument?.body || document.body;
    let d = f.querySelector(
      "[data-spatial-rx-portal]"
    );
    d || (d = a.ownerDocument.createElement("div"), d.setAttribute("data-spatial-rx-portal", ""), f.appendChild(d)), d.className = We(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      a.classList.contains("dark") && "dark"
    ), r(d);
  }, []), [n, o];
}
function hN({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, a = o.map((g) => g.name), c = r || [], f = c.length >= QO, [d, p] = dN();
  return /* @__PURE__ */ S.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs(
      DO,
      {
        items: a,
        multiple: !0,
        value: c,
        onValueChange: (g) => {
          const h = Array.isArray(g) ? g.map(String) : [];
          n.setActiveGenes(h);
        },
        children: [
          /* @__PURE__ */ S.jsx(
            q1,
            {
              render: /* @__PURE__ */ S.jsx(
                or,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ S.jsx(jO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, v) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            bs,
                            {
                              color: _l[v % _l.length]
                            }
                          ),
                          y
                        ]
                      },
                      y
                    )) }) : /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground", children: "Select genes" });
                  } })
                }
              )
            }
          ),
          /* @__PURE__ */ S.jsxs(
            IO,
            {
              container: p,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  VO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ S.jsx(BO, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(HO, { children: (g) => {
                  const h = String(g), y = c.indexOf(h), v = f && y < 0;
                  return /* @__PURE__ */ S.jsxs(
                    UO,
                    {
                      value: h,
                      disabled: v,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          bs,
                          {
                            color: y >= 0 ? _l[y % _l.length] : "#94a3b8"
                          }
                        ),
                        h
                      ]
                    },
                    h
                  );
                } })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ S.jsx(uN, { lm: n }),
    /* @__PURE__ */ S.jsx(fN, { lm: n })
  ] });
}
function pN({ lm: n }) {
  const {
    selections: o,
    landmarks: r,
    selected_kind: a,
    selected_index: c,
    category_columns: f,
    active_category: d,
    gene_columns: p,
    active_genes: g,
    color_by: h
  } = n, y = h === "continuous" && (g?.length || 0) > 0;
  return /* @__PURE__ */ S.jsxs(kx, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(zx, { className: We("shrink-0 py-0", su), children: /* @__PURE__ */ S.jsx(Dx, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ S.jsx(jx, { className: We("min-h-0 overflow-y-auto pb-2", su), children: /* @__PURE__ */ S.jsxs(
      Nx,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ S.jsxs(la, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ S.jsx(sh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((v, x) => /* @__PURE__ */ S.jsx(
              uh,
              {
                active: a === "selection" && c === x,
                color: Ov[x % Ov.length],
                label: v.id,
                onSelect: () => n.select("selection", x),
                onRename: (C) => n.renameSelection(x, C),
                onDelete: () => n.deleteSelection(x)
              },
              `${v.id}-${x}`
            )) }) : /* @__PURE__ */ S.jsx(vo, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ S.jsxs(la, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((v) => {
              const x = !y && v.name === d;
              return /* @__PURE__ */ S.jsxs($A, { className: "group/cat", children: [
                /* @__PURE__ */ S.jsxs(
                  JA,
                  {
                    className: We(
                      "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                      x && "text-foreground"
                    ),
                    onClick: () => {
                      v.name === d && !y || (n.setActiveCategory(v), n.select("", -1));
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(mR, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                      /* @__PURE__ */ S.jsx(X1, { active: x }),
                      /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: v.name })
                    ]
                  }
                ),
                /* @__PURE__ */ S.jsx(WA, { className: "pl-4", children: /* @__PURE__ */ S.jsx(sh, { className: "gap-0.5", children: (v.labels || []).map((C, w) => /* @__PURE__ */ S.jsx(
                  uh,
                  {
                    active: a === "type" && v.name === d && c === w,
                    color: (v.palette || [])[w % Math.max((v.palette || []).length, 1)] || "#888888",
                    label: C,
                    onSelect: () => n.selectType(v, w)
                  },
                  `${v.name}-${C}`
                )) }) })
              ] }, v.name);
            }) }) })
          ] }) : null,
          p.length ? /* @__PURE__ */ S.jsxs(la, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Genes" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(hN, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ S.jsxs(la, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ S.jsx(sh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((v, x) => /* @__PURE__ */ S.jsx(
              uh,
              {
                active: a === "landmark" && c === x,
                color: Tv[x % Tv.length],
                label: v.id,
                hidden: !!v.hidden,
                onSelect: () => n.select("landmark", x),
                onRename: (C) => n.renameLandmark(x, C),
                onToggleHidden: () => n.toggleLandmarkHidden(x),
                onDelete: () => n.deleteLandmark(x)
              },
              `${v.id}-${x}`
            )) }) : /* @__PURE__ */ S.jsx(vo, { children: "No landmarks yet." }) })
          ] })
        ]
      }
    ) })
  ] });
}
function mN({ lm: n }) {
  const {
    default_tension: o,
    neighbor_radius_max: r,
    neighbor_k_max: a,
    x_bounds: c,
    y_bounds: f
  } = n, d = n.selectedLandmark(), p = !!d && $O.includes(d.type), g = !!d && ZO.includes(d.type), h = n.activeNeighborhood(), y = !!h, v = Math.max(tN(c, f), 1), x = r > 0 ? r : v, C = Math.max(1, a || 64), w = Math.min(Number(h?.neighborhood_radius || 0), x);
  return /* @__PURE__ */ S.jsxs(kx, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(zx, { className: We("shrink-0 py-0", su), children: /* @__PURE__ */ S.jsx(Dx, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ S.jsx(jx, { className: We("min-h-0 overflow-hidden pb-2", su), children: /* @__PURE__ */ S.jsxs(
      Nx,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ S.jsxs(la, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Av, { className: "gap-2", children: y ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsx(vo, { children: h.id ? String(h.id) : "Selection" }),
              /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx(bs, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ S.jsxs(Wr, { children: [
                /* @__PURE__ */ S.jsx(ea, { children: "Neighborhood" }),
                /* @__PURE__ */ S.jsxs(
                  Vh,
                  {
                    type: "single",
                    variant: "outline",
                    size: "sm",
                    spacing: 0,
                    value: h.neighborhood || "off",
                    onValueChange: (_) => {
                      _ && n.patchNeighborhood({ neighborhood: _ });
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(nr, { value: "off", children: "Off" }),
                      /* @__PURE__ */ S.jsx(nr, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ S.jsx(nr, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              h.neighborhood === "radius" ? /* @__PURE__ */ S.jsxs(Wr, { children: [
                /* @__PURE__ */ S.jsx(ea, { children: "Radius" }),
                /* @__PURE__ */ S.jsx(
                  Gc,
                  {
                    min: 0,
                    max: x,
                    step: x / 200 || 1,
                    value: [w],
                    onValueChange: (_) => {
                      const N = Math.min(Math.max(_[0] ?? 0, 0), x);
                      n.patchNeighborhood({
                        neighborhood: "radius",
                        neighborhood_radius: N
                      });
                    }
                  }
                ),
                /* @__PURE__ */ S.jsxs(vo, { children: [
                  ch(w, "0"),
                  x > 0 ? ` / ${ch(x, "0")}` : ""
                ] })
              ] }) : null,
              h.neighborhood === "knn" ? /* @__PURE__ */ S.jsxs(Wr, { children: [
                /* @__PURE__ */ S.jsx(ea, { children: "k" }),
                /* @__PURE__ */ S.jsx(
                  Gc,
                  {
                    min: 1,
                    max: C,
                    step: 1,
                    value: [
                      Math.min(Number(h.neighborhood_k || 12), C)
                    ],
                    onValueChange: (_) => n.patchNeighborhood({
                      neighborhood: "knn",
                      neighborhood_k: _[0] ?? 12
                    })
                  }
                ),
                /* @__PURE__ */ S.jsx(vo, { children: String(
                  Math.min(Number(h.neighborhood_k || 12), C)
                ) })
              ] }) : null,
              /* @__PURE__ */ S.jsx(vo, { children: "Shift+wheel sizes the neighborhood." })
            ] }) : /* @__PURE__ */ S.jsx(vo, { children: "Select a type or selection to edit neighbors." }) }) })
          ] }),
          p || g ? /* @__PURE__ */ S.jsxs(la, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(oa, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ S.jsx(ia, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Av, { className: "gap-2", children: [
              p ? /* @__PURE__ */ S.jsxs(Wr, { children: [
                /* @__PURE__ */ S.jsx(ea, { children: "Tension" }),
                /* @__PURE__ */ S.jsx(
                  Gc,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [
                      Number(d?.tension ?? o ?? 0)
                    ],
                    onValueChange: (_) => n.patchLandmark({ tension: _[0] ?? 0 })
                  }
                ),
                /* @__PURE__ */ S.jsxs(vo, { children: [
                  Number(
                    d?.tension ?? o ?? 0
                  ).toPrecision(3),
                  ". 0 = smooth, 1 = straight."
                ] })
              ] }) : null,
              g ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                /* @__PURE__ */ S.jsxs(Wr, { children: [
                  /* @__PURE__ */ S.jsx(ea, { children: "Buffer" }),
                  /* @__PURE__ */ S.jsxs(
                    Vh,
                    {
                      type: "single",
                      variant: "outline",
                      size: "sm",
                      spacing: 0,
                      value: d?.buffer_side || "both",
                      onValueChange: (_) => {
                        _ && n.patchLandmark({ buffer_side: _ });
                      },
                      children: [
                        /* @__PURE__ */ S.jsx(nr, { value: "left", children: "Left" }),
                        /* @__PURE__ */ S.jsx(nr, { value: "both", children: "Both" }),
                        /* @__PURE__ */ S.jsx(nr, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ S.jsxs(Wr, { children: [
                  /* @__PURE__ */ S.jsx(ea, { children: "Width" }),
                  /* @__PURE__ */ S.jsx(
                    Gc,
                    {
                      min: 0,
                      max: v,
                      step: v / 200,
                      value: [
                        Math.min(
                          Number(d?.buffer_width || 0),
                          v
                        )
                      ],
                      onValueChange: (_) => n.patchLandmark({ buffer_width: _[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ S.jsx(vo, { children: ch(Number(d?.buffer_width || 0)) })
                ] }),
                /* @__PURE__ */ S.jsx(vo, { children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
function gN({
  onZoomIn: n,
  onZoomOut: o,
  onReset: r
}) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      className: "absolute right-2 bottom-2 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm",
      onMouseDown: (a) => a.stopPropagation(),
      onWheel: (a) => a.stopPropagation(),
      onDoubleClick: (a) => a.stopPropagation(),
      children: /* @__PURE__ */ S.jsxs(ZA, { orientation: "vertical", children: [
        /* @__PURE__ */ S.jsx(
          or,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: "rounded-none",
            onClick: (a) => {
              a.stopPropagation(), n();
            },
            children: /* @__PURE__ */ S.jsx(NR, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          or,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: "rounded-none border-t border-border",
            onClick: (a) => {
              a.stopPropagation(), o();
            },
            children: /* @__PURE__ */ S.jsx(a0, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          or,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: "Reset view",
            "aria-label": "Reset view",
            className: "rounded-none border-t border-border",
            onClick: (a) => {
              a.stopPropagation(), r();
            },
            children: /* @__PURE__ */ S.jsx(RR, {})
          }
        )
      ] })
    }
  );
}
const ys = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, bN = 3;
function Yc(n) {
  return { ...ys, ...n };
}
function Ih(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function yN(n, o) {
  const r = n.get("gene_columns") || [], a = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!a.has(f) || c.includes(f)) && (c.push(f), c.length >= bN))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", p = f.find((g) => g.name === d) || f[0];
    if (p) {
      Ih(n, p);
      return;
    }
    n.set("color_by", "categorical"), n.set("legend_title", ""), n.save_changes();
    return;
  }
  if (n.set("color_by", "continuous"), c.length === 1) {
    const f = r.find((d) => d.name === c[0]);
    n.set("legend_title", c[0]), n.set("color_vmin", f?.vmin ?? 0), n.set("color_vmax", f?.vmax ?? 1);
  } else
    n.set("legend_title", c.join(", "));
  n.save_changes();
}
function vN(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function xN(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function Z1(n, o, r, a, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...ys, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const p = a.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...ys, id: d, column: f, ...p || {} };
  }
  return null;
}
function $1(n, o, r, a, c, f, d, p) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (x, C) => C === r ? { ...ys, ...x, ...a } : x
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], y = h.findIndex(
    (x) => x.id === g && (!x.column || x.column === p)
  ), v = {
    ...ys,
    id: g,
    column: p,
    ...y >= 0 ? h[y] : {},
    ...a
  };
  y >= 0 ? h[y] = v : h.push(v), n.set("type_neighborhoods", h), n.save_changes();
}
function J1(n, o, r, a) {
  n.set(
    "landmarks",
    a.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function Hh(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function SN(n, o) {
  n.set("mode", o), n.save_changes();
}
function W1(n, o) {
  return n.filter((r, a) => a !== o);
}
function eS(n, o, r, a) {
  return o !== n ? { kind: o, index: r } : r === a ? { kind: "", index: -1 } : r > a ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function EN(n, o, r, a, c) {
  const f = eS("selection", a, c, o);
  n.set("selections", W1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function CN(n, o, r, a, c) {
  const f = eS("landmark", a, c, o);
  n.set("landmarks", W1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function RN(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function wN(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function _N(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (a, c) => c === o ? { ...a, hidden: !a.hidden } : a
    )
  ), n.save_changes();
}
const Uh = "9.1.14", AN = `https://esm.sh/@deck.gl/core@${Uh}`, MN = `https://esm.sh/@deck.gl/layers@${Uh}?deps=@deck.gl/core@${Uh}`, Ko = { depthCompare: "always", depthWriteEnabled: !1 }, Uv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], hh = "#00e5cc", TN = 0.3, ON = 0.9, NN = "#00453d", ta = 2, qc = 1, kN = 0.55, ph = ["line", "spline", "gradient"];
function mh(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Float32Array(r.buffer);
}
function gh(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Int32Array(r.buffer);
}
function zN(n) {
  return 1 - (1 - n) ** 4;
}
function Pc(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [a, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [a / 255, c / 255, f / 255, d / 255 || 1];
}
function Bv({ model: n, host: o }) {
  if (!o) throw new Error("mountEngine: host element is required");
  const r = o.closest(".landmarks"), a = o.closest(".landmarks__body"), c = o.closest(".landmarks__main") || o.parentElement;
  if (!r || !a || !c)
    throw new Error(
      "mountEngine: host must sit inside .landmarks > .landmarks__body > .landmarks__main"
    );
  o.replaceChildren(), o.classList.add("landmarks__plot-host"), o.style.position = "relative", o.style.flex = "1 1 auto", o.style.minHeight = "0", o.style.width = "100%", o.style.height = "100%";
  const f = document.createElement("div");
  f.className = "landmarks__plot";
  const d = document.createElement("canvas");
  d.className = "landmarks__webgl", d.tabIndex = 0;
  const p = document.createElement("div");
  p.className = "landmarks__legend", p.hidden = !0;
  const g = document.createElement("div");
  g.className = "landmarks__tooltip", g.hidden = !0, f.append(d, p), o.append(f, g);
  let h = () => {
  };
  const y = new MutationObserver(() => {
    h(), M && st();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function v(R, O, D) {
    g.textContent = R, g.hidden = !1;
    const Y = o.getBoundingClientRect();
    g.style.left = `${O - Y.left + 12}px`, g.style.top = `${D - Y.top + 12}px`;
  }
  function x() {
    g.hidden = !0;
  }
  p.addEventListener("mousedown", (R) => R.stopPropagation()), p.addEventListener("wheel", (R) => R.stopPropagation(), { passive: !0 });
  const C = n.get("modes") || [], w = ["select", "lasso"].filter(
    (R) => C.includes(R)
  ), _ = ["point", "line", "spline", "shape"].filter(
    (R) => C.includes(R)
  ), N = [...w, ..._];
  let T = n.get("mode") || "select";
  N.includes(T) || (T = N[0] || "select");
  let M = null, A = null, k = null, H = 0, P = !1, G = null, L = null, K = { key: "", data: [] }, te = null, se = !1, de = [], le = () => {
  }, pe = () => {
  }, be = null, V = null, I = null;
  function Q() {
    const R = n.get("category_codes") || "";
    be = R ? gh(R) : null;
  }
  Q();
  function xe() {
    const R = n.get("gene_values") || "";
    V = R ? mh(R) : null;
  }
  xe();
  function ae() {
    const R = gh(n.get("neighbor_indptr") || ""), O = gh(n.get("neighbor_indices") || ""), D = mh(n.get("neighbor_distances") || "");
    if (!R.length) {
      I = null;
      return;
    }
    I = {
      indptr: R,
      indices: O,
      distances: D,
      radiusMax: Number(n.get("neighbor_radius_max")) || 0,
      kMax: Number(n.get("neighbor_k_max")) || 64
    };
  }
  ae();
  function z() {
    const R = Number(n.get("neighbor_radius_max")) || 0;
    return R > 0 ? R : Hn();
  }
  function F() {
    const R = Number(n.get("neighbor_k_max")) || 64;
    return Math.max(1, R);
  }
  function ne() {
    const R = n.get("category_columns") || [], O = n.get("active_category") || "";
    return R.findIndex((D) => D.name === O);
  }
  function oe(R) {
    n.get("category_columns");
    const O = ne(), D = Nt();
    return O < 0 || !be || !D.length ? Math.round(D[R]?.valueA || 0) : be[O * D.length + R];
  }
  const ge = ["#ff0099", "#b8ff00", "#00b7ff"];
  function _e(R) {
    return (n.get("gene_columns") || []).find((D) => D.name === R) || null;
  }
  function qe(R, O) {
    const Y = (n.get("gene_columns") || []).findIndex((re) => re.name === O), ee = Nt();
    return Y < 0 || !V || !V.length || !ee.length ? null : V[Y * ee.length + R];
  }
  function Me(R, O, D) {
    const Y = Number.isFinite(O) ? O : 0, ee = Number.isFinite(D) && D > Y ? D : Y + 1, re = Math.max(0, Math.min(1, R ?? 0)), q = Math.max(0, Y + re * (ee - Y));
    return n.get("gene_log1p") ? Math.log1p(q) : q;
  }
  function Te(R, O) {
    const D = Number.isFinite(R) ? R : 0, Y = Number.isFinite(O) && O > D ? O : D + 1, ee = Math.max(0, Y), re = Math.max(0, D);
    if (n.get("gene_log1p")) {
      const q = Math.log1p(re), U = Math.log1p(ee);
      return U > q ? U : U + 1e-6;
    }
    return ee > re ? ee : ee + 1e-6;
  }
  function it(R, O) {
    const D = Number.isFinite(R) ? R : 0, Y = Math.max(0, D);
    return n.get("gene_log1p") ? Math.log1p(Y) : Y;
  }
  function gt(R, O, D) {
    const Y = _e(O);
    if (!Y) return 0;
    const ee = qe(R, O);
    if (ee == null) return 0;
    const re = Y.vmin ?? 0, q = Y.vmax ?? 1, U = Me(ee, re, q);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Ue = D > 0 ? D : Te(re, q);
      return Math.max(0, Math.min(1, U / Ue));
    }
    const ye = it(re), Re = Te(re, q);
    return Re <= ye ? 0 : Math.max(0, Math.min(1, (U - ye) / (Re - ye)));
  }
  function ke(R) {
    let O = 0;
    for (const D of R) {
      const Y = _e(D);
      Y && (O = Math.max(O, Te(Y.vmin ?? 0, Y.vmax ?? 1)));
    }
    return O;
  }
  function et(R, O) {
    const D = n.get("active_genes") || [], Y = Nt();
    if (!D.length || !Y.length) return null;
    const ee = (n.get("gene_scale_mode") || "independent") === "shared" ? ke(D) : 0;
    let re = 0, q = 0, U = 0, ce = 0;
    for (let ye = 0; ye < D.length; ye++) {
      const Re = gt(R, D[ye], ee);
      if (!(Re > 0)) continue;
      const Ue = ut(ge[ye % ge.length], 1);
      re += Ue[0] * Re, q += Ue[1] * Re, U += Ue[2] * Re, ce += Re;
    }
    return ce < 1e-6 ? ut("#6b7280", O * 0.35) : [
      Math.min(255, Math.round(re)),
      Math.min(255, Math.round(q)),
      Math.min(255, Math.round(U)),
      Math.round(Math.max(0, Math.min(1, O)) * 255)
    ];
  }
  let Ne = null, je = [], He = !1, Ae = null, Qe = "", Oe = -1, $e = !1, tt = !1, Xe = !1, ve = [], Z = !1, ue = null, Ie = null;
  function Ce(R, O) {
    const D = new Set((O || []).map((Y) => String(Y.id)));
    for (let Y = 1; ; Y++) {
      const ee = `${R} ${Y}`;
      if (!D.has(ee)) return ee;
    }
  }
  function Ge(R) {
    return Ce("landmark", R);
  }
  function nt(R) {
    return Ce("selection", R);
  }
  function Mt() {
    je = [], ve = [], Xe = !1, Z = !1, ue = null, Ie = null;
  }
  function Ct(R) {
    const O = d.getBoundingClientRect();
    if (!O.width || !O.height) return null;
    const D = R.clientX - O.left, Y = R.clientY - O.top, ee = M?.isInitialized ? M.getViewports()[0] : null;
    if (!ee) return null;
    const [re, q] = ee.unproject([D, Y]);
    return { x: re, y: q, px: D, py: Y };
  }
  function Bt() {
    return {
      dragPan: T === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function kt() {
    const R = T === "select";
    d.style.cursor = R ? "grab" : "crosshair", M && M.setProps({ controller: Bt() });
  }
  function vt() {
    const R = Math.max(1, Number(n.get("width")) || 400), O = Math.max(1, Number(n.get("height")) || 400);
    r.style.width = `${R}px`, r.style.maxWidth = "100%", a.style.height = `${O}px`, c.style.width = "", c.style.height = "", c.style.maxWidth = "", c.style.aspectRatio = "";
  }
  function Ft() {
    const R = Math.max(1, Math.round(c.clientWidth || n.get("width") || 400)), O = Math.max(1, Math.round(c.clientHeight || n.get("height") || 400));
    d.width !== R && (d.width = R), d.height !== O && (d.height = O), M && M.setProps({ width: R, height: O });
    const D = n.get("axes_pixel_bounds") || [0, 0, R, O];
    return (D[2] !== R || D[3] !== O) && (n.set("axes_pixel_bounds", [0, 0, R, O]), n.save_changes()), { w: R, h: O };
  }
  function dt(R) {
    if (!Number.isFinite(R)) return "";
    const O = Math.abs(R);
    return O !== 0 && (O >= 1e3 || O < 0.01) ? R.toExponential(1) : O >= 100 ? R.toFixed(0) : O >= 10 ? R.toFixed(1) : R.toFixed(2);
  }
  function Wt() {
    if (!p) return;
    const R = n.get("color_by") || "categorical", O = n.get("legend_title") || "", D = n.get("point_palette") || [], Y = n.get("active_genes") || [];
    if (p.innerHTML = "", O) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-title", ee.textContent = O, p.appendChild(ee);
    }
    if (R === "continuous" && Y.length > 0) {
      p.hidden = !0;
      return;
    }
    if (R === "continuous" && D.length > 1) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-bar", ee.style.background = `linear-gradient(to top, ${D[0]}, ${D[Math.floor(D.length / 2)]}, ${D[D.length - 1]})`;
      const re = document.createElement("div");
      re.className = "landmarks__legend-scale";
      const q = document.createElement("span");
      q.textContent = dt(n.get("color_vmax"));
      const U = document.createElement("span");
      U.textContent = dt(n.get("color_vmin")), re.appendChild(q), re.appendChild(U);
      const ce = document.createElement("div");
      ce.className = "landmarks__legend-continuous", ce.appendChild(ee), ce.appendChild(re), p.appendChild(ce), p.hidden = !1;
      return;
    }
    if (R === "categorical") {
      p.hidden = !0;
      return;
    }
    p.hidden = !O;
  }
  function ut(R, O) {
    const D = String(R || "#60a5fa").replace("#", ""), Y = D.length === 3 ? D.split("").map((re) => re + re).join("") : D.padEnd(6, "0").slice(0, 6), ee = Number.parseInt(Y, 16);
    return [
      ee >> 16 & 255,
      ee >> 8 & 255,
      ee & 255,
      Math.round(Math.max(0, Math.min(1, O)) * 255)
    ];
  }
  function En(R) {
    const O = n.get("point_opacity") ?? 0.75, D = n.get("color_by") || "categorical";
    let Y;
    if (D === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        Y = et(R.i, O) || ut("#6b7280", O * 0.35);
      else {
        const q = n.get("point_palette") || ["#60a5fa"];
        if (q.length > 1) {
          const ce = Math.max(0, Math.min(1, R.valueA)) * (q.length - 1), ye = Math.floor(ce), Re = Math.min(q.length - 1, ye + 1), Ue = ce - ye, we = ut(q[ye], O), Ve = ut(q[Re], O);
          Y = we.map((Et, on) => Math.round(Et + (Ve[on] - Et) * Ue));
        } else
          Y = ut(q[0], O);
      }
    else {
      const re = n.get("category_columns") || [], q = ne(), U = q >= 0 ? re[q] : null, ce = U && U.palette || n.get("point_palette") || ["#60a5fa"], ye = U ? oe(R.i) : Math.round(R.valueA);
      Y = ut(ce[(ye % ce.length + ce.length) % ce.length], O);
    }
    if (!se || !te) return Y;
    const ee = te[R.i] || 0;
    return ee === ta || ee === qc ? (Y[3] = 255, Y) : (Y[3] = Math.round((Y[3] || 255) * 0.28), Y);
  }
  function Cn(R) {
    const O = n.get("point_size") ?? 2;
    if (!se || !te) return O;
    const D = te[R.i] || 0;
    return D === ta || D === qc ? O : O * kN;
  }
  function zt(R) {
    return R.map((O) => [O.x, O.y]);
  }
  function ot(R) {
    const O = zt(R);
    if (!O.length) return O;
    const D = O[0], Y = O[O.length - 1];
    return (D[0] !== Y[0] || D[1] !== Y[1]) && O.push(D), O;
  }
  function ht(R, O) {
    if (T === "ellipse") {
      const D = (R.x + O.x) / 2, Y = (R.y + O.y) / 2, ee = Math.abs(O.x - R.x) / 2, re = Math.abs(O.y - R.y) / 2, q = [];
      for (let U = 0; U < 64; U++) {
        const ce = U / 64 * Math.PI * 2;
        q.push([D + ee * Math.cos(ce), Y + re * Math.sin(ce)]);
      }
      return q;
    }
    return [
      [R.x, R.y],
      [O.x, R.y],
      [O.x, O.y],
      [R.x, O.y]
    ];
  }
  function Je(R) {
    if (R.type === "polygon" || R.type === "lasso")
      return (R.vertices || []).map(([D, Y]) => [D, Y]);
    const O = -(R.angle || 0);
    if (R.type === "rectangle") {
      const D = R.cx, Y = R.cy, ee = R.width, re = R.height, q = { x: D, y: Y };
      return [
        { x: D - ee / 2, y: Y - re / 2 },
        { x: D + ee / 2, y: Y - re / 2 },
        { x: D + ee / 2, y: Y + re / 2 },
        { x: D - ee / 2, y: Y + re / 2 }
      ].map((U) => {
        const ce = Jt(U, q, O);
        return [ce.x, ce.y];
      });
    }
    if (R.type === "ellipse") {
      const D = R.cx, Y = R.cy, ee = R.rx, re = R.ry, q = { x: D, y: Y }, U = [];
      for (let ce = 0; ce < 64; ce++) {
        const ye = ce / 64 * Math.PI * 2, Re = Jt(
          { x: D + ee * Math.cos(ye), y: Y + re * Math.sin(ye) },
          q,
          O
        );
        U.push([Re.x, Re.y]);
      }
      return U;
    }
    return [];
  }
  function Nt() {
    const R = n.get("points_data") || "", [O, D] = n.get("x_bounds"), [Y, ee] = n.get("y_bounds"), re = `${R.length}:${O}:${D}:${Y}:${ee}:${R.slice(0, 32)}:${R.slice(-32)}`;
    if (re === K.key) return K.data;
    const q = mh(R), U = Math.floor(q.length / 4), ce = new Array(U);
    for (let ye = 0; ye < U; ye++) {
      const Re = ye * 4;
      ce[ye] = {
        i: ye,
        x: O + (q[Re] + 1) / 2 * (D - O),
        y: Y + (q[Re + 1] + 1) / 2 * (ee - Y),
        valueA: q[Re + 2]
      };
    }
    return K = { key: re, data: ce }, ce;
  }
  function Rn(R, O = 8) {
    const D = R / Math.max(O, 1), ee = 10 ** Math.floor(Math.log10(Math.max(D, 1e-12))), re = D / ee;
    return (re <= 1 ? 1 : re <= 2 ? 2 : re <= 5 ? 5 : 10) * ee;
  }
  function yn() {
    const R = M?.isInitialized ? M.getViewports()?.[0] : null;
    if (R?.unproject && R.width > 1 && R.height > 1) {
      const [re, q] = R.unproject([0, R.height]), [U, ce] = R.unproject([R.width, 0]);
      return {
        xMin: Math.min(re, U),
        xMax: Math.max(re, U),
        yMin: Math.min(q, ce),
        yMax: Math.max(q, ce)
      };
    }
    const [O, D] = n.get("x_bounds"), [Y, ee] = n.get("y_bounds");
    return { xMin: O, xMax: D, yMin: Y, yMax: ee };
  }
  function Yt() {
    const R = yn(), O = Math.max(R.xMax - R.xMin, R.yMax - R.yMin, 1e-9);
    return Rn(O, 8);
  }
  function el(R = !1) {
    const O = Yt();
    !R && O === L || (L = O, st());
  }
  function Dt() {
    if (!A) return null;
    const { PathLayer: R } = A, O = yn(), D = L || Rn(Math.max(O.xMax - O.xMin, O.yMax - O.yMin, 1e-9), 8);
    L = D;
    const Y = D * 2, ee = Math.floor((O.xMin - Y) / D) * D, re = Math.floor((O.yMin - Y) / D) * D, q = [];
    for (let we = ee; we <= O.xMax + Y + D * 0.5; we += D)
      q.push({
        path: [
          [we, O.yMin - Y],
          [we, O.yMax + Y]
        ]
      });
    for (let we = re; we <= O.yMax + Y + D * 0.5; we += D)
      q.push({
        path: [
          [O.xMin - Y, we],
          [O.xMax + Y, we]
        ]
      });
    const U = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [ce, ye, Re] = Pc(U), Ue = [Math.round(ce * 255), Math.round(ye * 255), Math.round(Re * 255), 160];
    return new R({
      id: "landmarks-grid",
      data: q,
      getPath: (we) => we.path,
      getColor: Ue,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function io() {
    if (!A) return null;
    const { ScatterplotLayer: R } = A, O = Nt();
    if (!O.length) return null;
    const Y = [
      n.get("point_size") ?? 2,
      se,
      n.get("selected_kind"),
      n.get("selected_index"),
      n.get("type_neighborhoods"),
      n.get("selections"),
      n.get("active_category")
    ], ee = [
      n.get("point_palette"),
      n.get("point_opacity"),
      n.get("color_by"),
      n.get("active_genes"),
      n.get("gene_values"),
      n.get("gene_scale_mode"),
      n.get("gene_log1p"),
      ...Y
    ];
    return [
      new R({
        id: "landmarks-points",
        data: O,
        getPosition: (re) => [re.x, re.y, 0],
        getFillColor: (re) => En(re),
        getRadius: (re) => Cn(re),
        radiusUnits: "common",
        radiusMinPixels: 0,
        stroked: !1,
        filled: !0,
        pickable: !1,
        updateTriggers: {
          getFillColor: ee,
          getRadius: Y
        }
      })
    ];
  }
  function Kn() {
    if (!A) return [];
    const { PolygonLayer: R } = A, O = n.get("selected_kind"), D = n.get("selected_index"), Y = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ee = [];
    return (n.get("selections") || []).forEach((re, q) => {
      const U = Je(re);
      if (U.length < 3) return;
      const ce = O === "selection" && q === D;
      ee.push({
        polygon: U,
        fill: ut(Y, ce ? 0.08 : 0.04),
        line: ut(Y, ce ? 1 : 0.85),
        width: ce ? 2.5 : 2,
        kind: "selection",
        index: q
      });
    }), ee.length ? [
      new R({
        id: "selections",
        data: ee,
        getPolygon: (re) => re.polygon,
        getFillColor: (re) => re.fill,
        getLineColor: (re) => re.line,
        getLineWidth: (re) => re.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: Ko
      })
    ] : [];
  }
  function nn() {
    if (!A) return [];
    const { PathLayer: R, PolygonLayer: O, ScatterplotLayer: D } = A, Y = n.get("selected_kind"), ee = n.get("selected_index"), re = n.get("stroke_width") || 2, q = n.get("landmark_opacity") || 0.25, U = [], ce = [], ye = [], Re = [], Ue = Nl(14);
    (n.get("landmarks") || []).forEach((Ve, Et) => {
      if (Ve.hidden) return;
      const on = Uv[Et % Uv.length], Zn = Y === "landmark" && Et === ee, rn = Zn ? re + 1 : re, dn = ut(on, 1), fo = ut(on, q), Tn = { kind: "landmark", index: Et };
      if (Ve.type === "point") {
        const On = (Ve.vertices || [])[0];
        if (!On) return;
        ye.push({
          position: [On[0], On[1], 0],
          fill: dn,
          radius: Zn ? 7 : 6,
          ...Tn
        });
        return;
      }
      const Wl = fn(Ve);
      if (Ve.type === "shape" && Wl.length >= 3) {
        U.push({
          polygon: zt(Wl),
          fill: fo,
          line: dn,
          width: rn,
          ...Tn
        }), (Ve.vertices || []).forEach(([On, $n]) => {
          ye.push({
            position: [On, $n, 0],
            fill: dn,
            radius: Zn ? 5 : 4,
            ...Tn
          });
        });
        return;
      }
      const Ll = ao(Ve);
      if (Ll && U.push({
        polygon: zt(Ll),
        fill: ut(hh, TN),
        line: ut(hh, ON),
        width: 1.5,
        ...Tn
      }), Wl.length >= 2) {
        const On = zt(Wl);
        if (ce.push({
          path: On,
          color: dn,
          width: rn,
          ...Tn
        }), ["line", "spline", "gradient"].includes(Ve.type)) {
          const $n = tl(On, Ue);
          $n && Re.push({ polygon: $n, fill: dn, line: dn, width: 1, ...Tn });
        }
        (Ve.vertices || []).forEach(([$n, Oo]) => {
          ye.push({
            position: [$n, Oo, 0],
            fill: dn,
            radius: Zn ? 5 : 4,
            ...Tn
          });
        });
      }
    });
    const we = [];
    return (U.length || Re.length) && we.push(
      new O({
        id: "landmark-polygons",
        data: [...U, ...Re],
        getPolygon: (Ve) => Ve.polygon,
        getFillColor: (Ve) => Ve.fill,
        getLineColor: (Ve) => Ve.line,
        getLineWidth: (Ve) => Ve.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: Ko
      })
    ), ce.length && we.push(
      new R({
        id: "landmark-paths",
        data: ce,
        getPath: (Ve) => Ve.path,
        getColor: (Ve) => Ve.color,
        getWidth: (Ve) => Ve.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: Ko
      })
    ), ye.length && we.push(
      new D({
        id: "landmark-markers",
        data: ye,
        getPosition: (Ve) => Ve.position,
        getFillColor: (Ve) => Ve.fill,
        getRadius: (Ve) => Ve.radius,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: Ko
      })
    ), we;
  }
  function ro() {
    if (!A) return [];
    const { PathLayer: R, PolygonLayer: O, ScatterplotLayer: D } = A, Y = ["lasso", "polygon", "rectangle", "ellipse"].includes(T), ee = Y ? "#94a3b8" : "#00e5ff", re = ut(ee, 1), q = ut(ee, 0.15), U = n.get("stroke_width") || 4, ce = [];
    let ye = null, Re = null, Ue = [];
    if (Xe && ve.length >= 2)
      ye = zt(ve);
    else if (Z && ue && Ie)
      Re = ht(ue, Ie);
    else if (je.length) {
      const we = T === "spline" ? In(je, n.get("default_tension") ?? 0, 20, !1) : T === "shape" ? In(je, n.get("default_tension") ?? 0, 20, !0) : je;
      T === "polygon" || T === "shape" ? (Re = zt(we), ye = ot(we)) : ye = zt(we), Ue = je.map((Ve) => ({ position: [Ve.x, Ve.y, 0], fill: re }));
    }
    return Re && Re.length >= 3 ? ce.push(
      new O({
        id: "draft-polygon",
        data: [{ polygon: Re, fill: q, line: re, width: 2 }],
        getPolygon: (we) => we.polygon,
        getFillColor: (we) => we.fill,
        getLineColor: (we) => we.line,
        getLineWidth: (we) => we.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: Ko
      })
    ) : ye && ye.length >= 2 && ce.push(
      new R({
        id: "draft-path",
        data: [{ path: ye, color: re, width: Y ? 2 : U }],
        getPath: (we) => we.path,
        getColor: (we) => we.color,
        getWidth: (we) => we.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: Ko
      })
    ), Ue.length && ce.push(
      new D({
        id: "draft-markers",
        data: Ue,
        getPosition: (we) => we.position,
        getFillColor: (we) => we.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: Ko
      })
    ), ce;
  }
  function Nl(R) {
    const O = M?.isInitialized ? M.getViewports()?.[0] : null;
    if (!O?.unproject) return R;
    const [D] = O.unproject([0, 0]), [Y] = O.unproject([R, 0]);
    return Math.max(Math.abs(Y - D), 1e-9);
  }
  function tl(R, O) {
    if (!R || R.length < 2 || !(O > 0)) return null;
    const D = R[R.length - 2], Y = R[R.length - 1], ee = Math.hypot(Y[0] - D[0], Y[1] - D[1]) || 1, re = (Y[0] - D[0]) / ee, q = (Y[1] - D[1]) / ee, U = -q, ce = re, ye = [Y[0] + re * O * 0.15, Y[1] + q * O * 0.15], Re = [Y[0] - re * O, Y[1] - q * O];
    return [
      ye,
      [Re[0] + U * O * 0.55, Re[1] + ce * O * 0.55],
      [Re[0] - U * O * 0.55, Re[1] - ce * O * 0.55]
    ];
  }
  function Co(R, O, D) {
    if (!(O > 0) || !R.length) return;
    const Y = Nt(), ee = O * O;
    for (let re = 0; re < Y.length; re++) {
      if (D[re] === ta) continue;
      const q = Y[re];
      for (let U = 0; U < R.length; U++) {
        const ce = Y[R[U]], ye = q.x - ce.x, Re = q.y - ce.y;
        if (ye * ye + Re * Re <= ee) {
          D[re] = qc;
          break;
        }
      }
    }
  }
  function vn(R, O, D) {
    const Y = [], ee = [];
    if (!I || !O.length) return { edges: Y, neighbors: ee };
    const re = Math.max(1, Math.min(D | 0, I.kMax | 0)), { indptr: q, indices: U } = I, ce = /* @__PURE__ */ new Set();
    for (const ye of O) {
      const Re = q[ye] | 0, Ue = Math.min(q[ye + 1] | 0, Re + re), we = R[ye];
      for (let Ve = Re; Ve < Ue; Ve++) {
        const Et = U[Ve] | 0;
        ce.has(Et) || (ce.add(Et), ee.push(Et)), Y.push({
          path: [
            [we.x, we.y],
            [R[Et].x, R[Et].y]
          ]
        });
      }
    }
    return { edges: Y, neighbors: ee };
  }
  function Tt() {
    const R = getComputedStyle(r).getPropertyValue("--lm-neigh-fill").trim() || NN;
    return ut(R, 1);
  }
  function Rt() {
    if (!A) return [];
    const R = wo(), O = so(R);
    if (!R || !O || O.neighborhood === "off") return [];
    const D = Nt(), Y = [], { PathLayer: ee, ScatterplotLayer: re } = A, q = { kind: R.kind, index: R.index };
    if (O.neighborhood === "radius") {
      const U = Number(O.neighborhood_radius) || 0;
      if (U <= 0) return [];
      const ce = [];
      if (te)
        for (let Ue = 0; Ue < D.length; Ue++)
          te[Ue] === ta && ce.push({ x: D[Ue].x, y: D[Ue].y, ...q });
      if (!ce.length) return [];
      const ye = z(), Re = ye > 0 ? Math.min(U, ye) : U;
      Y.push(
        new re({
          id: "neighborhood-radius",
          data: ce,
          getPosition: (Ue) => [Ue.x, Ue.y, 0],
          getRadius: Re,
          radiusUnits: "common",
          radiusMinPixels: 0,
          radiusMaxPixels: 1e7,
          getFillColor: Tt(),
          stroked: !1,
          filled: !0,
          pickable: !0,
          // Opaque dim fill (alpha 255) — blend only so circle AA doesn't leave a hard rim.
          parameters: {
            ...Ko,
            depthTest: !1,
            blend: !0
          },
          updateTriggers: { getRadius: Re }
        })
      );
    }
    if (O.neighborhood === "knn") {
      if (!de.length) return [];
      Y.push(
        new ee({
          id: "neighborhood-knn",
          data: de.map((U) => ({ ...U, ...q })),
          getPath: (U) => U.path,
          getColor: ut(hh, 0.45),
          getWidth: 1.25,
          widthUnits: "pixels",
          pickable: !0,
          parameters: Ko
        })
      );
    }
    return Y;
  }
  function Ye() {
    return Fn(), [
      Dt(),
      ...Rt(),
      ...io(),
      ...Kn(),
      ...nn(),
      ...ro()
    ].filter(Boolean);
  }
  function Vn(R, O) {
    const [D, Y] = n.get("x_bounds"), [ee, re] = n.get("y_bounds"), q = (D + Y) / 2, U = (ee + re) / 2, ce = Math.max(Y - D, 1e-6), ye = Math.max(re - ee, 1e-6), Re = 40, Ue = Math.log2(
      Math.min((R - Re * 2) / ce, (O - Re * 2) / ye)
    );
    return {
      target: [q, U, 0],
      zoom: Ue,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function vr() {
    if (!M) return;
    const R = Math.max(1, d.clientWidth || d.width), O = Math.max(1, d.clientHeight || d.height);
    R <= 1 || O <= 1 || (k = Vn(R, O), G = k.zoom, M.setProps({ viewState: k, width: R, height: O }), P = !0);
  }
  function xr(R, { animate: O = !1, duration: D = 320 } = {}) {
    if (!M) return;
    const Y = {
      ...k,
      ...R,
      transitionDuration: O ? D : 0
    };
    O && (!Ne && A?.LinearInterpolator && (Ne = new A.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), Ne && (Y.transitionInterpolator = Ne), Y.transitionEasing = zN), k = Y, M.setProps({ viewState: Y });
  }
  le = (R) => {
    if (!M || !k) return;
    const O = k.minZoom ?? -20, D = k.maxZoom ?? 20, Y = Math.max(O, Math.min(D, (k.zoom ?? 0) + R));
    xr({ zoom: Y }, { animate: !0 });
  }, pe = () => {
    if (!M) return;
    const R = Math.max(1, d.clientWidth || d.width), O = Math.max(1, d.clientHeight || d.height);
    if (R <= 1 || O <= 1) return;
    const D = Vn(R, O);
    G = D.zoom, P = !0, xr(
      {
        target: D.target,
        zoom: D.zoom,
        minZoom: D.minZoom,
        maxZoom: D.maxZoom
      },
      { animate: !0, duration: 320 }
    ), st();
  };
  function Ro() {
    const R = String(n.get("plot_background") || "").trim();
    if (R) return R;
    const O = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return O || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const R = Ro();
    f.style.background = R, d.style.background = R, M && (M.setProps({
      parameters: { clearColor: Pc(R) },
      ...k ? { viewState: k } : {}
    }), typeof M.redraw == "function" && M.redraw(!0));
  };
  function kl(R) {
    if (!M) return;
    const O = Ro();
    M.setProps({
      parameters: { clearColor: Pc(O) },
      ...R,
      ...k ? { viewState: k } : {}
    });
  }
  function st() {
    !M || !A || H || (H = requestAnimationFrame(() => {
      H = 0, kl({ layers: Ye() });
    }));
  }
  async function pl() {
    if (A) return A;
    const R = await import(
      /* @vite-ignore */
      AN
    ), O = await import(
      /* @vite-ignore */
      MN
    );
    return A = {
      Deck: R.Deck,
      OrthographicView: R.OrthographicView,
      LinearInterpolator: R.LinearInterpolator,
      ScatterplotLayer: O.ScatterplotLayer,
      PathLayer: O.PathLayer,
      PolygonLayer: O.PolygonLayer
    }, A;
  }
  async function zl() {
    if (M) return;
    vt();
    const { w: R, h: O } = Ft();
    d.style.display = "block", h();
    try {
      const { Deck: D, OrthographicView: Y } = await pl(), ee = Ye();
      if (!ee.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const re = Vn(R, O);
      k = re, G = re.zoom;
      const q = Ro();
      M = new D({
        canvas: d,
        width: R,
        height: O,
        views: new Y(),
        controller: Bt(),
        initialViewState: re,
        parameters: { clearColor: Pc(q) },
        layers: ee,
        pickingRadius: 8,
        getCursor: ({ isDragging: U, isHovering: ce }) => U ? "grabbing" : ce ? "pointer" : T === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: U }) => {
          k = U, M.setProps({ viewState: U }), el();
        },
        onClick: (U) => {
          if (T !== "select") return;
          const ce = U?.object;
          ce?.kind === "landmark" || ce?.kind === "selection" || ce?.kind === "type" ? Qn(ce.kind, ce.index) : Qn("", -1);
        },
        onHover: (U) => {
          const ce = U?.object;
          if (ce?.kind === "landmark" || ce?.kind === "selection" || ce?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          T === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          Wt(), requestAnimationFrame(() => {
            Ft(), vr(), kl({ layers: Ye() }), typeof M.redraw == "function" && M.redraw(!0);
          });
        }
      }), kt();
    } catch (D) {
      console.error("landmarks deck init failed", D);
      const Y = document.createElement("div");
      Y.className = "landmarks__error", Y.textContent = `Deck renderer failed: ${D?.message || D}`, f.appendChild(Y);
    }
  }
  function ml() {
    if (!M) return;
    const { w: R, h: O } = Ft();
    kl({ width: R, height: O }), !P && R > 1 && O > 1 ? vr() : typeof M.redraw == "function" && M.redraw(!0);
  }
  function In(R, O, D, Y) {
    const ee = D, q = (1 - Math.max(0, Math.min(1, O ?? 0))) / 2;
    let U = R.slice(), ce, ye;
    if (Y) {
      if (U.length >= 2) {
        const we = U[0], Ve = U[U.length - 1];
        we.x === Ve.x && we.y === Ve.y && (U = U.slice(0, -1));
      }
      if (U.length < 3) return U.slice();
      const Ue = U.length;
      ye = (we) => U[(we % Ue + Ue) % Ue], ce = Ue;
    } else {
      if (U.length < 2 || U.length === 2) return U.slice();
      const Ue = [
        { x: 2 * U[0].x - U[1].x, y: 2 * U[0].y - U[1].y },
        ...U,
        {
          x: 2 * U[U.length - 1].x - U[U.length - 2].x,
          y: 2 * U[U.length - 1].y - U[U.length - 2].y
        }
      ];
      ye = (we) => Ue[we + 1], ce = U.length - 1;
    }
    const Re = [];
    for (let Ue = 0; Ue < ce; Ue++) {
      const we = ye(Ue - 1), Ve = ye(Ue), Et = ye(Ue + 1), on = ye(Ue + 2), Zn = q * (Et.x - we.x), rn = q * (Et.y - we.y), dn = q * (on.x - Ve.x), fo = q * (on.y - Ve.y);
      for (let Tn = 0; Tn < ee; Tn++) {
        const Wl = Tn / ee, Ll = Wl * Wl, On = Ll * Wl, $n = 2 * On - 3 * Ll + 1, Oo = On - 2 * Ll + Wl, ya = -2 * On + 3 * Ll, Ts = On - Ll;
        Re.push({
          x: $n * Ve.x + Oo * Zn + ya * Et.x + Ts * dn,
          y: $n * Ve.y + Oo * rn + ya * Et.y + Ts * fo
        });
      }
    }
    return Re.push({ ...ye(Y ? ce : U.length - 1) }), Re;
  }
  function Jt(R, O, D) {
    const Y = Math.cos(D), ee = Math.sin(D), re = R.x - O.x, q = R.y - O.y;
    return { x: O.x + re * Y - q * ee, y: O.y + re * ee + q * Y };
  }
  function fn(R) {
    const O = (R.vertices || []).map(([D, Y]) => ({ x: D, y: Y }));
    return R.type === "spline" || R.type === "gradient" ? In(O, R.tension ?? 0, 20, !1) : R.type === "shape" ? In(O, R.tension ?? 0, 20, !0) : O;
  }
  function Hn() {
    const [R, O] = n.get("x_bounds"), [D, Y] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(O - R), Math.abs(Y - D));
  }
  function nl(R, O) {
    return R.map((D, Y) => {
      const ee = R[Math.max(0, Y - 1)], re = R[Math.min(R.length - 1, Y + 1)], q = Math.hypot(re.x - ee.x, re.y - ee.y) || 1, U = (re.x - ee.x) / q, ce = (re.y - ee.y) / q;
      return { x: D.x - ce * O, y: D.y + U * O };
    });
  }
  function ao(R) {
    const O = Number(R.buffer_width || 0);
    if (!(O > 0) || !ph.includes(R.type)) return null;
    const D = fn(R);
    if (D.length < 2) return null;
    const Y = R.buffer_side || "both";
    return Y === "left" ? [...D, ...nl(D, O).reverse()] : Y === "right" ? [...D, ...nl(D, -O).reverse()] : [...nl(D, O), ...nl(D, -O).reverse()];
  }
  function wo() {
    const R = n.get("selected_kind"), O = n.get("selected_index");
    return R === "type" || R === "selection" ? { kind: R, index: O } : null;
  }
  function ji() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function so(R) {
    return R ? Z1(
      R.kind,
      R.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function Sr() {
    return so(wo());
  }
  function co() {
    const R = ji();
    if (!R) return null;
    const O = n.get("landmarks") || [];
    return R.index >= 0 && R.index < O.length ? O[R.index] : null;
  }
  function _o(R) {
    const O = wo();
    O && ($1(
      n,
      O.kind,
      O.index,
      R,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), st());
  }
  function ll(R) {
    const O = Nt();
    if (!R) return [];
    if (R.kind === "type")
      return O.reduce((D, Y, ee) => (oe(ee) === R.index && D.push(ee), D), []);
    if (R.kind === "selection") {
      const D = (n.get("selections") || [])[R.index], Y = Je(D || {});
      return Y.length < 3 ? [] : O.reduce((ee, re, q) => (ln(re, Y) && ee.push(q), ee), []);
    }
    return [];
  }
  function ln(R, O) {
    let D = !1;
    for (let Y = 0, ee = O.length - 1; Y < O.length; ee = Y++) {
      const re = O[Y][0], q = O[Y][1], U = O[ee][0], ce = O[ee][1];
      q > R.y != ce > R.y && R.x < (U - re) * (R.y - q) / (ce - q + 1e-12) + re && (D = !D);
    }
    return D;
  }
  function Fn() {
    const R = Nt();
    te = new Uint8Array(R.length), se = !1, de = [];
    const O = wo();
    if (!O) return;
    const D = ll(O);
    if (!D.length) {
      se = !0;
      return;
    }
    se = !0;
    for (const ee of D) te[ee] = ta;
    const Y = so(O);
    if (!(!Y || Y.neighborhood === "off")) {
      if (Y.neighborhood === "radius") {
        let ee = Number(Y.neighborhood_radius) || 0;
        const re = z();
        re > 0 && (ee = Math.min(ee, re)), ee > 0 && Co(D, ee, te);
        return;
      }
      if (Y.neighborhood === "knn") {
        let ee = Number(Y.neighborhood_k) || 12;
        ee = Math.min(ee, F());
        const re = vn(R, D, ee);
        de = re.edges;
        for (const q of re.neighbors)
          te[q] !== ta && (te[q] = qc);
      }
    }
  }
  function ol(R) {
    const O = ji();
    O && (J1(n, O.index, R, n.get("landmarks") || []), st());
  }
  function Dl(R) {
    if (!M?.isInitialized || !R) return null;
    const D = M.pickObject({ x: R.px, y: R.py, radius: 8 })?.object;
    return D?.kind ? { kind: D.kind, index: D.index } : null;
  }
  function Qn(R, O) {
    Hh(n, R, O), st();
  }
  function Un() {
    Wt();
  }
  function Er() {
    if (!["polygon", "line", "spline", "shape"].includes(T)) return;
    const O = T === "line" || T === "spline" ? 2 : 3;
    if (je.length < O) {
      je = [], st();
      return;
    }
    if (T === "polygon") {
      const ee = [...n.get("selections") || []];
      ee.push(Yc({
        id: nt(ee),
        type: "polygon",
        vertices: je.map((re) => [re.x, re.y])
      })), je = [], n.set("selections", ee), n.set("selected_kind", "selection"), n.set("selected_index", ee.length - 1), n.save_changes(), Un(), st();
      return;
    }
    const D = [...n.get("landmarks") || []], Y = {
      id: Ge(D),
      type: T,
      vertices: je.map((ee) => [ee.x, ee.y])
    };
    (T === "spline" || T === "shape") && (Y.tension = n.get("default_tension") ?? 0), ph.includes(T) && (Y.buffer_width = n.get("default_buffer_width") ?? 0, Y.buffer_side = n.get("default_buffer_side") || "both"), D.push(Y), je = [], n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Un(), st();
  }
  function wn(R, O) {
    if (M?.isInitialized) {
      const D = M.getViewports()[0];
      if (D) {
        const Y = D.unproject([0, 0]), ee = D.unproject([R, O]);
        return { dx: ee[0] - Y[0], dy: ee[1] - Y[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function Li(R, O, D, Y) {
    const { dx: ee, dy: re } = wn(D, Y);
    if (R === "landmark") {
      const q = n.get("landmarks") || [];
      n.set(
        "landmarks",
        q.map(
          (U, ce) => ce !== O ? U : { ...U, vertices: (U.vertices || []).map(([ye, Re]) => [ye + ee, Re + re]) }
        )
      );
    } else {
      const q = n.get("selections") || [];
      n.set(
        "selections",
        q.map((U, ce) => ce !== O ? U : U.vertices ? { ...U, vertices: U.vertices.map(([ye, Re]) => [ye + ee, Re + re]) } : { ...U, cx: U.cx + ee, cy: U.cy + re })
      );
    }
    n.save_changes(), st();
  }
  function Cr(R) {
    if (T === "select") return;
    R.preventDefault(), d.focus();
    const O = Ct(R);
    if (!O) return;
    $e = !1;
    const D = Dl(O);
    if (T === "lasso") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        He = !0, Ae = O, Qe = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        Qn(D.kind, D.index), tt = !0;
        return;
      }
      Xe = !0, ve = [O], st();
      return;
    }
    if (T === "rectangle" || T === "ellipse") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        He = !0, Ae = O, Qe = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        Qn(D.kind, D.index), tt = !0;
        return;
      }
      Z = !0, ue = O, Ie = O, st();
      return;
    }
    if (je.length === 0) {
      const Y = n.get("selected_kind"), ee = n.get("selected_index");
      if (D && D.kind === Y && D.index === ee) {
        He = !0, Ae = O, Qe = D.kind, Oe = D.index, d.style.cursor = "grabbing";
        return;
      }
      if (D) {
        Qn(D.kind, D.index), tt = !0;
        return;
      }
      ee >= 0 && Qn("", -1);
    }
  }
  function ei(R) {
    const O = Ct(R);
    if (!O) return;
    if (He && Ae && Oe >= 0) {
      const ee = O.px - Ae.px, re = O.py - Ae.py;
      (ee || re) && ($e = !0), Li(Qe, Oe, ee, re), Ae = O;
      return;
    }
    if (Xe) {
      ve.push(O), st();
      return;
    }
    if (Z) {
      Ie = O, st();
      return;
    }
    if (je.length > 0 && ["polygon", "line", "spline", "shape"].includes(T)) {
      const ee = T === "line" || T === "spline" ? 2 : 3;
      v(je.length >= ee ? "Enter to finish" : "Click", R.clientX, R.clientY);
      return;
    }
    if (T === "select") return;
    const Y = Dl(O);
    if (Y && (Y.kind === "landmark" || Y.kind === "selection")) {
      const re = (Y.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[Y.index]?.id;
      if (re) {
        v(String(re), R.clientX, R.clientY);
        return;
      }
    }
    x();
  }
  function gl(R) {
    if (T === "select" && !He) return;
    const O = Ct(R);
    if (Xe) {
      if (Xe = !1, ve.length >= 3) {
        const D = [...n.get("selections") || []];
        D.push(Yc({
          id: nt(D),
          type: "lasso",
          vertices: ve.map((Y) => [Y.x, Y.y])
        })), n.set("selections", D), n.set("selected_kind", "selection"), n.set("selected_index", D.length - 1), n.save_changes();
      }
      ve = [], Un(), st();
      return;
    }
    if (Z) {
      if (Z = !1, ue && Ie) {
        const D = ue, Y = Ie, ee = (D.x + Y.x) / 2, re = (D.y + Y.y) / 2, q = Math.abs(Y.x - D.x), U = Math.abs(Y.y - D.y);
        if (q > 1e-6 && U > 1e-6) {
          const ce = [...n.get("selections") || []];
          T === "rectangle" ? ce.push(Yc({ id: nt(ce), type: "rectangle", cx: ee, cy: re, width: q, height: U, angle: 0 })) : ce.push(Yc({ id: nt(ce), type: "ellipse", cx: ee, cy: re, rx: q / 2, ry: U / 2, angle: 0 })), n.set("selections", ce), n.set("selected_kind", "selection"), n.set("selected_index", ce.length - 1), n.save_changes();
        }
      }
      ue = null, Ie = null, Un(), st();
      return;
    }
    if (He && (He = !1, Ae = null, Qe = "", Oe = -1, d.style.cursor = "crosshair", $e)) {
      tt = !0, $e = !1;
      return;
    }
    if (tt) {
      tt = !1;
      return;
    }
    if (O && !(T === "select" || T === "lasso" || T === "rectangle" || T === "ellipse")) {
      if (T === "point") {
        const D = [...n.get("landmarks") || []];
        D.push({ id: Ge(D), type: "point", vertices: [[O.x, O.y]] }), n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Un(), st();
        return;
      }
      je.push({ x: O.x, y: O.y }), st();
    }
  }
  function Vi() {
    x(), He && (He = !1, Ae = null), Xe && (Xe = !1, ve = [], st()), Z && (Z = !1, ue = null, Ie = null, st());
  }
  function Ao(R) {
    R.preventDefault(), je.length && je.pop(), Er(), x();
  }
  function $l(R) {
    R.key === "Enter" ? (R.preventDefault(), Er(), x()) : R.key === "Escape" ? (Mt(), Qn("", -1), st()) : (R.key === "Backspace" || R.key === "Delete") && je.length && (je.pop(), st());
  }
  const Mo = new AbortController(), { signal: bl } = Mo;
  d.addEventListener(
    "wheel",
    (R) => {
      if (!R.shiftKey) return;
      const O = co();
      if (O && ph.includes(O.type)) {
        R.preventDefault(), R.stopImmediatePropagation();
        const q = Hn(), U = q / 40, ce = Math.max(
          0,
          Math.min(q, (Number(O.buffer_width) || 0) + (R.deltaY > 0 ? -U : U))
        );
        ol({ buffer_width: ce });
        return;
      }
      const D = Sr();
      if (!D) return;
      if (R.preventDefault(), R.stopImmediatePropagation(), D.neighborhood === "knn") {
        const q = F(), U = Math.max(
          1,
          Math.min(q, (Number(D.neighborhood_k) || 12) + (R.deltaY > 0 ? -1 : 1))
        );
        _o({ neighborhood: "knn", neighborhood_k: U });
        return;
      }
      const Y = z(), ee = Y / 40, re = Math.max(
        0,
        Math.min(Y, (Number(D.neighborhood_radius) || 0) + (R.deltaY > 0 ? -ee : ee))
      );
      _o({ neighborhood: "radius", neighborhood_radius: re });
    },
    { capture: !0, passive: !1, signal: bl }
  ), d.addEventListener("mousedown", Cr, { signal: bl }), d.addEventListener("mousemove", ei, { signal: bl }), d.addEventListener("mouseup", gl, { signal: bl }), d.addEventListener("mouseleave", Vi, { signal: bl }), d.addEventListener("dblclick", Ao, { signal: bl }), d.addEventListener("keydown", $l, { signal: bl });
  const uo = [];
  function Qt(R, O) {
    const D = `change:${R}`;
    n.on(D, O), uo.push(() => n.off?.(D, O));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((R) => {
    Qt(R, () => {
      st(), Un();
    });
  }), Qt("mode", () => {
    T = n.get("mode"), Mt(), kt(), st();
  }), Qt("width", () => {
    vt(), Ft(), st();
  }), Qt("height", () => {
    vt(), Ft(), st();
  }), Qt("points_data", () => {
    K = { key: "", data: [] }, M ? st() : zl(), Wt();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((R) => {
    Qt(R, () => {
      M && st(), Wt();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((R) => {
    Qt(R, () => {
      st();
    });
  }), Qt("category_codes", () => {
    Q(), st();
  }), Qt("gene_values", () => {
    xe(), st();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "neighbor_radius_max", "neighbor_k_max"].forEach((R) => {
    Qt(R, () => {
      ae(), M && st();
    });
  }), ["category_columns", "active_category"].forEach((R) => {
    Qt(R, () => {
      Un(), st();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((R) => {
    Qt(R, () => {
      Un(), Wt(), st();
    });
  }), Qt("plot_background", () => h()), Un(), vt();
  let To = null, Jl = 0, jl = !1;
  const Bn = () => {
    if (jl) return;
    const R = c.clientWidth, O = c.clientHeight;
    if (R <= 1 || O <= 1) {
      Jl = requestAnimationFrame(Bn);
      return;
    }
    Jl = requestAnimationFrame(async () => {
      if (await zl(), jl) {
        M && typeof M.finalize == "function" && M.finalize(), M = null;
        return;
      }
      st(), To = new ResizeObserver(() => ml()), To.observe(c);
    });
  };
  Jl = requestAnimationFrame(Bn);
  function Ii() {
    jl = !0, Mo.abort(), uo.forEach((R) => R()), y.disconnect(), To?.disconnect(), Jl && cancelAnimationFrame(Jl), H && cancelAnimationFrame(H), M && typeof M.finalize == "function" && M.finalize(), M = null, o.replaceChildren();
  }
  return { zoomBy: (R) => le(R), resetZoom: () => pe(), destroy: Ii };
}
function DN(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const a = (d) => {
    const p = r.current.map((g) => {
      const h = `change:${String(g)}`, y = () => d();
      return n.on(h, y), { event: h, handler: y };
    });
    return () => {
      for (const { event: g, handler: h } of p)
        n.off?.(g, h);
    };
  }, c = () => {
    const d = {};
    for (const p of r.current)
      d[String(p)] = n.get(String(p));
    return JSON.stringify(d);
  }, f = b.useSyncExternalStore(a, c, c);
  return JSON.parse(f);
}
const jN = [
  "mode",
  "modes",
  "selections",
  "landmarks",
  "selected_kind",
  "selected_index",
  "category_columns",
  "active_category",
  "gene_columns",
  "active_genes",
  "gene_scale_mode",
  "gene_log1p",
  "color_by",
  "continuous_palette",
  "legend_labels",
  "type_neighborhoods",
  "default_tension",
  "neighbor_radius_max",
  "neighbor_k_max",
  "x_bounds",
  "y_bounds"
];
function LN(n) {
  const o = DN(n, jN);
  return {
    ...o,
    setMode(r) {
      SN(n, r);
    },
    select(r, a) {
      Hh(n, r, a);
    },
    setActiveCategory(r) {
      Ih(n, r);
    },
    setActiveGenes(r) {
      yN(n, r);
    },
    setGeneScaleMode(r) {
      vN(n, r);
    },
    setGeneLog1p(r) {
      xN(n, r);
    },
    selectType(r, a) {
      r.name !== o.active_category && Ih(n, r), Hh(n, "type", a);
    },
    patchNeighborhood(r) {
      $1(
        n,
        o.selected_kind,
        o.selected_index,
        r,
        o.selections,
        o.type_neighborhoods,
        o.legend_labels,
        o.active_category
      );
    },
    patchLandmark(r) {
      o.selected_kind !== "landmark" || o.selected_index < 0 || J1(n, o.selected_index, r, o.landmarks);
    },
    deleteSelection(r) {
      EN(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      CN(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, a) {
      RN(n, r, a, o.selections);
    },
    renameLandmark(r, a) {
      wN(n, r, a, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      _N(n, r, o.landmarks);
    },
    activeNeighborhood() {
      return Z1(
        o.selected_kind,
        o.selected_index,
        o.selections,
        o.type_neighborhoods,
        o.legend_labels,
        o.active_category
      );
    },
    selectedLandmark() {
      return o.selected_kind !== "landmark" || o.selected_index < 0 ? null : o.landmarks[o.selected_index] ?? null;
    }
  };
}
function VN({
  model: n,
  hostEl: o
}) {
  const r = hC(o.parentElement), a = LN(n), c = b.useRef(null), f = b.useRef(null);
  return b.useEffect(() => {
    const d = c.current;
    if (!d) return;
    const p = Bv({ model: n, host: d });
    return f.current = p, () => {
      p.destroy(), f.current = null;
    };
  }, [n, Bv]), /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: We(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        r && "dark landmarks--dark",
        !r && "landmarks--light"
      ),
      children: [
        /* @__PURE__ */ S.jsx("div", { className: "landmarks__body", children: /* @__PURE__ */ S.jsxs("div", { className: "landmarks__figure", children: [
          /* @__PURE__ */ S.jsx(
            lN,
            {
              modes: a.modes,
              mode: a.mode,
              onMode: (d) => a.setMode(d)
            }
          ),
          /* @__PURE__ */ S.jsxs("div", { className: "landmarks__main landmarks__main--plot", children: [
            /* @__PURE__ */ S.jsx("div", { ref: c, className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full" }),
            /* @__PURE__ */ S.jsx(
              gN,
              {
                onZoomIn: () => f.current?.zoomBy(1),
                onZoomOut: () => f.current?.zoomBy(-1),
                onReset: () => f.current?.resetZoom()
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (d) => d.stopPropagation(),
              onWheel: (d) => d.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(pN, { lm: a })
            }
          ),
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (d) => d.stopPropagation(),
              onWheel: (d) => d.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(mN, { lm: a })
            }
          )
        ] })
      ]
    }
  );
}
const ss = /* @__PURE__ */ new WeakMap();
function IN({ model: n, el: o }) {
  const r = ss.get(o);
  r && (r.unmount(), ss.delete(o));
  const a = fC.createRoot(o);
  return ss.set(o, a), a.render(/* @__PURE__ */ S.jsx(VN, { model: n, hostEl: o })), () => {
    a.unmount(), ss.get(o) === a && ss.delete(o);
  };
}
const YN = { render: IN };
export {
  YN as default
};
