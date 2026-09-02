var hy = (n) => {
  throw TypeError(n);
};
var my = (n, o, r) => o.has(n) || hy("Cannot " + r);
var qn = (n, o, r) => (my(n, o, "read from private field"), r ? r.call(n) : o.get(n)), py = (n, o, r) => o.has(n) ? hy("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Od = (n, o, r, a) => (my(n, o, "write to private field"), a ? a.call(n, r) : o.set(n, r), r);
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
var Nd = { exports: {} }, os = {};
var gy;
function lC() {
  if (gy) return os;
  gy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(a, c, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), "key" in c) {
      f = {};
      for (var m in c)
        m !== "key" && (f[m] = c[m]);
    } else f = c;
    return c = f.ref, {
      $$typeof: n,
      type: a,
      key: d,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return os.Fragment = o, os.jsx = r, os.jsxs = r, os;
}
var by;
function oC() {
  return by || (by = 1, Nd.exports = lC()), Nd.exports;
}
var x = oC(), kd = { exports: {} }, is = {}, zd = { exports: {} }, Dd = {};
var yy;
function iC() {
  return yy || (yy = 1, (function(n) {
    function o(V, H) {
      var F = V.length;
      V.push(H);
      e: for (; 0 < F; ) {
        var ve = F - 1 >>> 1, ae = V[ve];
        if (0 < c(ae, H))
          V[ve] = H, V[F] = ae, F = ve;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function a(V) {
      if (V.length === 0) return null;
      var H = V[0], F = V.pop();
      if (F !== H) {
        V[0] = F;
        e: for (var ve = 0, ae = V.length, z = ae >>> 1; ve < z; ) {
          var K = 2 * (ve + 1) - 1, ne = V[K], oe = K + 1, pe = V[oe];
          if (0 > c(ne, F))
            oe < ae && 0 > c(pe, ne) ? (V[ve] = pe, V[oe] = F, ve = oe) : (V[ve] = ne, V[K] = F, ve = K);
          else if (oe < ae && 0 > c(pe, F))
            V[ve] = pe, V[oe] = F, ve = oe;
          else break e;
        }
      }
      return H;
    }
    function c(V, H) {
      var F = V.sortIndex - H.sortIndex;
      return F !== 0 ? F : V.id - H.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      n.unstable_now = function() {
        return f.now();
      };
    } else {
      var d = Date, m = d.now();
      n.unstable_now = function() {
        return d.now() - m;
      };
    }
    var g = [], h = [], y = 1, v = null, S = 3, C = !1, w = !1, A = !1, O = !1, M = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function k(V) {
      for (var H = r(h); H !== null; ) {
        if (H.callback === null) a(h);
        else if (H.startTime <= V)
          a(h), H.sortIndex = H.expirationTime, o(g, H);
        else break;
        H = r(h);
      }
    }
    function I(V) {
      if (A = !1, k(V), !w)
        if (r(g) !== null)
          w = !0, q || (q = !0, fe());
        else {
          var H = r(h);
          H !== null && be(I, H.startTime - V);
        }
    }
    var q = !1, B = -1, j = 5, P = -1;
    function te() {
      return O ? !0 : !(n.unstable_now() - P < j);
    }
    function se() {
      if (O = !1, q) {
        var V = n.unstable_now();
        P = V;
        var H = !0;
        try {
          e: {
            w = !1, A && (A = !1, T(B), B = -1), C = !0;
            var F = S;
            try {
              t: {
                for (k(V), v = r(g); v !== null && !(v.expirationTime > V && te()); ) {
                  var ve = v.callback;
                  if (typeof ve == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var ae = ve(
                      v.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof ae == "function") {
                      v.callback = ae, k(V), H = !0;
                      break t;
                    }
                    v === r(g) && a(g), k(V);
                  } else a(g);
                  v = r(g);
                }
                if (v !== null) H = !0;
                else {
                  var z = r(h);
                  z !== null && be(
                    I,
                    z.startTime - V
                  ), H = !1;
                }
              }
              break e;
            } finally {
              v = null, S = F, C = !1;
            }
            H = void 0;
          }
        } finally {
          H ? fe() : q = !1;
        }
      }
    }
    var fe;
    if (typeof _ == "function")
      fe = function() {
        _(se);
      };
    else if (typeof MessageChannel < "u") {
      var le = new MessageChannel(), he = le.port2;
      le.port1.onmessage = se, fe = function() {
        he.postMessage(null);
      };
    } else
      fe = function() {
        M(se, 0);
      };
    function be(V, H) {
      B = M(function() {
        V(n.unstable_now());
      }, H);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, n.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < V ? Math.floor(1e3 / V) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, n.unstable_next = function(V) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = S;
      }
      var F = S;
      S = H;
      try {
        return V();
      } finally {
        S = F;
      }
    }, n.unstable_requestPaint = function() {
      O = !0;
    }, n.unstable_runWithPriority = function(V, H) {
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
      var F = S;
      S = V;
      try {
        return H();
      } finally {
        S = F;
      }
    }, n.unstable_scheduleCallback = function(V, H, F) {
      var ve = n.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ve + F : ve) : F = ve, V) {
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
      return ae = F + ae, V = {
        id: y++,
        callback: H,
        priorityLevel: V,
        startTime: F,
        expirationTime: ae,
        sortIndex: -1
      }, F > ve ? (V.sortIndex = F, o(h, V), r(g) === null && V === r(h) && (A ? (T(B), B = -1) : A = !0, be(I, F - ve))) : (V.sortIndex = ae, o(g, V), w || C || (w = !0, q || (q = !0, fe()))), V;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(V) {
      var H = S;
      return function() {
        var F = S;
        S = H;
        try {
          return V.apply(this, arguments);
        } finally {
          S = F;
        }
      };
    };
  })(Dd)), Dd;
}
var vy;
function rC() {
  return vy || (vy = 1, zd.exports = iC()), zd.exports;
}
var jd = { exports: {} }, lt = {};
var xy;
function aC() {
  if (xy) return lt;
  xy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), S = Symbol.iterator;
  function C(z) {
    return z === null || typeof z != "object" ? null : (z = S && z[S] || z["@@iterator"], typeof z == "function" ? z : null);
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
  }, A = Object.assign, O = {};
  function M(z, K, ne) {
    this.props = z, this.context = K, this.refs = O, this.updater = ne || w;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(z, K) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, K, "setState");
  }, M.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function T() {
  }
  T.prototype = M.prototype;
  function _(z, K, ne) {
    this.props = z, this.context = K, this.refs = O, this.updater = ne || w;
  }
  var k = _.prototype = new T();
  k.constructor = _, A(k, M.prototype), k.isPureReactComponent = !0;
  var I = Array.isArray;
  function q() {
  }
  var B = { H: null, A: null, T: null, S: null }, j = Object.prototype.hasOwnProperty;
  function P(z, K, ne) {
    var oe = ne.ref;
    return {
      $$typeof: n,
      type: z,
      key: K,
      ref: oe !== void 0 ? oe : null,
      props: ne
    };
  }
  function te(z, K) {
    return P(z.type, K, z.props);
  }
  function se(z) {
    return typeof z == "object" && z !== null && z.$$typeof === n;
  }
  function fe(z) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + z.replace(/[=:]/g, function(ne) {
      return K[ne];
    });
  }
  var le = /\/+/g;
  function he(z, K) {
    return typeof z == "object" && z !== null && z.key != null ? fe("" + z.key) : K.toString(36);
  }
  function be(z) {
    switch (z.status) {
      case "fulfilled":
        return z.value;
      case "rejected":
        throw z.reason;
      default:
        switch (typeof z.status == "string" ? z.then(q, q) : (z.status = "pending", z.then(
          function(K) {
            z.status === "pending" && (z.status = "fulfilled", z.value = K);
          },
          function(K) {
            z.status === "pending" && (z.status = "rejected", z.reason = K);
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
  function V(z, K, ne, oe, pe) {
    var we = typeof z;
    (we === "undefined" || we === "boolean") && (z = null);
    var qe = !1;
    if (z === null) qe = !0;
    else
      switch (we) {
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
                K,
                ne,
                oe,
                pe
              );
          }
      }
    if (qe)
      return pe = pe(z), qe = oe === "" ? "." + he(z, 0) : oe, I(pe) ? (ne = "", qe != null && (ne = qe.replace(le, "$&/") + "/"), V(pe, K, ne, "", function(it) {
        return it;
      })) : pe != null && (se(pe) && (pe = te(
        pe,
        ne + (pe.key == null || z && z.key === pe.key ? "" : ("" + pe.key).replace(
          le,
          "$&/"
        ) + "/") + qe
      )), K.push(pe)), 1;
    qe = 0;
    var Me = oe === "" ? "." : oe + ":";
    if (I(z))
      for (var Te = 0; Te < z.length; Te++)
        oe = z[Te], we = Me + he(oe, Te), qe += V(
          oe,
          K,
          ne,
          we,
          pe
        );
    else if (Te = C(z), typeof Te == "function")
      for (z = Te.call(z), Te = 0; !(oe = z.next()).done; )
        oe = oe.value, we = Me + he(oe, Te++), qe += V(
          oe,
          K,
          ne,
          we,
          pe
        );
    else if (we === "object") {
      if (typeof z.then == "function")
        return V(
          be(z),
          K,
          ne,
          oe,
          pe
        );
      throw K = String(z), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(z).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return qe;
  }
  function H(z, K, ne) {
    if (z == null) return z;
    var oe = [], pe = 0;
    return V(z, oe, "", "", function(we) {
      return K.call(ne, we, pe++);
    }), oe;
  }
  function F(z) {
    if (z._status === -1) {
      var K = z._result;
      K = K(), K.then(
        function(ne) {
          (z._status === 0 || z._status === -1) && (z._status = 1, z._result = ne);
        },
        function(ne) {
          (z._status === 0 || z._status === -1) && (z._status = 2, z._result = ne);
        }
      ), z._status === -1 && (z._status = 0, z._result = K);
    }
    if (z._status === 1) return z._result.default;
    throw z._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(z) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var K = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof z == "object" && z !== null && typeof z.message == "string" ? String(z.message) : String(z),
        error: z
      });
      if (!window.dispatchEvent(K)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", z);
      return;
    }
    console.error(z);
  }, ae = {
    map: H,
    forEach: function(z, K, ne) {
      H(
        z,
        function() {
          K.apply(this, arguments);
        },
        ne
      );
    },
    count: function(z) {
      var K = 0;
      return H(z, function() {
        K++;
      }), K;
    },
    toArray: function(z) {
      return H(z, function(K) {
        return K;
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
  return lt.Activity = v, lt.Children = ae, lt.Component = M, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = _, lt.StrictMode = a, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return B.H.useMemoCache(z);
    }
  }, lt.cache = function(z) {
    return function() {
      return z.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(z, K, ne) {
    if (z == null)
      throw Error(
        "The argument must be a React element, but you passed " + z + "."
      );
    var oe = A({}, z.props), pe = z.key;
    if (K != null)
      for (we in K.key !== void 0 && (pe = "" + K.key), K)
        !j.call(K, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && K.ref === void 0 || (oe[we] = K[we]);
    var we = arguments.length - 2;
    if (we === 1) oe.children = ne;
    else if (1 < we) {
      for (var qe = Array(we), Me = 0; Me < we; Me++)
        qe[Me] = arguments[Me + 2];
      oe.children = qe;
    }
    return P(z.type, pe, oe);
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
  }, lt.createElement = function(z, K, ne) {
    var oe, pe = {}, we = null;
    if (K != null)
      for (oe in K.key !== void 0 && (we = "" + K.key), K)
        j.call(K, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (pe[oe] = K[oe]);
    var qe = arguments.length - 2;
    if (qe === 1) pe.children = ne;
    else if (1 < qe) {
      for (var Me = Array(qe), Te = 0; Te < qe; Te++)
        Me[Te] = arguments[Te + 2];
      pe.children = Me;
    }
    if (z && z.defaultProps)
      for (oe in qe = z.defaultProps, qe)
        pe[oe] === void 0 && (pe[oe] = qe[oe]);
    return P(z, we, pe);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(z) {
    return { $$typeof: m, render: z };
  }, lt.isValidElement = se, lt.lazy = function(z) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: z },
      _init: F
    };
  }, lt.memo = function(z, K) {
    return {
      $$typeof: h,
      type: z,
      compare: K === void 0 ? null : K
    };
  }, lt.startTransition = function(z) {
    var K = B.T, ne = {};
    B.T = ne;
    try {
      var oe = z(), pe = B.S;
      pe !== null && pe(ne, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(q, ve);
    } catch (we) {
      ve(we);
    } finally {
      K !== null && ne.types !== null && (K.types = ne.types), B.T = K;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, lt.use = function(z) {
    return B.H.use(z);
  }, lt.useActionState = function(z, K, ne) {
    return B.H.useActionState(z, K, ne);
  }, lt.useCallback = function(z, K) {
    return B.H.useCallback(z, K);
  }, lt.useContext = function(z) {
    return B.H.useContext(z);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(z, K) {
    return B.H.useDeferredValue(z, K);
  }, lt.useEffect = function(z, K) {
    return B.H.useEffect(z, K);
  }, lt.useEffectEvent = function(z) {
    return B.H.useEffectEvent(z);
  }, lt.useId = function() {
    return B.H.useId();
  }, lt.useImperativeHandle = function(z, K, ne) {
    return B.H.useImperativeHandle(z, K, ne);
  }, lt.useInsertionEffect = function(z, K) {
    return B.H.useInsertionEffect(z, K);
  }, lt.useLayoutEffect = function(z, K) {
    return B.H.useLayoutEffect(z, K);
  }, lt.useMemo = function(z, K) {
    return B.H.useMemo(z, K);
  }, lt.useOptimistic = function(z, K) {
    return B.H.useOptimistic(z, K);
  }, lt.useReducer = function(z, K, ne) {
    return B.H.useReducer(z, K, ne);
  }, lt.useRef = function(z) {
    return B.H.useRef(z);
  }, lt.useState = function(z) {
    return B.H.useState(z);
  }, lt.useSyncExternalStore = function(z, K, ne) {
    return B.H.useSyncExternalStore(
      z,
      K,
      ne
    );
  }, lt.useTransition = function() {
    return B.H.useTransition();
  }, lt.version = "19.2.8", lt;
}
var Sy;
function Ss() {
  return Sy || (Sy = 1, jd.exports = aC()), jd.exports;
}
var Ld = { exports: {} }, Pn = {};
var Ey;
function sC() {
  if (Ey) return Pn;
  Ey = 1;
  var n = Ss();
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
  function m(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Pn.createPortal = function(g, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(g, h, null, y);
  }, Pn.flushSync = function(g) {
    var h = d.T, y = a.p;
    try {
      if (d.T = null, a.p = 2, g) return g();
    } finally {
      d.T = h, a.p = y, a.d.f();
    }
  }, Pn.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, a.d.C(g, h));
  }, Pn.prefetchDNS = function(g) {
    typeof g == "string" && a.d.D(g);
  }, Pn.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var y = h.as, v = m(y, h.crossOrigin), S = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? a.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: C
        }
      ) : y === "script" && a.d.X(g, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: C,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Pn.preinitModule = function(g, h) {
    if (typeof g == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var y = m(
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
  }, Pn.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, v = m(y, h.crossOrigin);
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
  }, Pn.preloadModule = function(g, h) {
    if (typeof g == "string")
      if (h) {
        var y = m(h.as, h.crossOrigin);
        a.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else a.d.m(g);
  }, Pn.requestFormReset = function(g) {
    a.d.r(g);
  }, Pn.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Pn.useFormState = function(g, h, y) {
    return d.H.useFormState(g, h, y);
  }, Pn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Pn.version = "19.2.8", Pn;
}
var Cy;
function Xv() {
  if (Cy) return Ld.exports;
  Cy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Ld.exports = sC(), Ld.exports;
}
var Ry;
function cC() {
  if (Ry) return is;
  Ry = 1;
  var n = rC(), o = Ss(), r = Xv();
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
  function m(e) {
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
        for (var p = !1, E = s.child; E; ) {
          if (E === l) {
            p = !0, l = s, i = u;
            break;
          }
          if (E === i) {
            p = !0, i = s, l = u;
            break;
          }
          E = E.sibling;
        }
        if (!p) {
          for (E = u.child; E; ) {
            if (E === l) {
              p = !0, l = u, i = s;
              break;
            }
            if (E === i) {
              p = !0, i = u, l = s;
              break;
            }
            E = E.sibling;
          }
          if (!p) throw Error(a(189));
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
  var v = Object.assign, S = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), O = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), k = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
  function fe(e) {
    return e === null || typeof e != "object" ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var le = /* @__PURE__ */ Symbol.for("react.client.reference");
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case M:
        return "Profiler";
      case O:
        return "StrictMode";
      case I:
        return "Suspense";
      case q:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case _:
          return e.displayName || "Context";
        case T:
          return (e._context.displayName || "Context") + ".Consumer";
        case k:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case B:
          return t = e.displayName || null, t !== null ? t : he(e.type) || "Memo";
        case j:
          t = e._payload, e = e._init;
          try {
            return he(e(t));
          } catch {
          }
      }
    return null;
  }
  var be = Array.isArray, V = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ve = [], ae = -1;
  function z(e) {
    return { current: e };
  }
  function K(e) {
    0 > ae || (e.current = ve[ae], ve[ae] = null, ae--);
  }
  function ne(e, t) {
    ae++, ve[ae] = e.current, e.current = t;
  }
  var oe = z(null), pe = z(null), we = z(null), qe = z(null);
  function Me(e, t) {
    switch (ne(we, t), ne(pe, e), ne(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Lb(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Lb(t), e = Vb(t, e);
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
    K(oe), ne(oe, e);
  }
  function Te() {
    K(oe), K(pe), K(we);
  }
  function it(e) {
    e.memoizedState !== null && ne(qe, e);
    var t = oe.current, l = Vb(t, e.type);
    t !== l && (ne(pe, e), ne(oe, l));
  }
  function pt(e) {
    pe.current === e && (K(oe), K(pe)), qe.current === e && (K(qe), es._currentValue = F);
  }
  var ze, et;
  function ke(e) {
    if (ze === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ze = t && t[1] || "", et = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ze + e + et;
  }
  var Le = !1;
  function Ue(e, t) {
    if (!e || Le) return "";
    Le = !0;
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
      var u = i.DetermineComponentFrameRoot(), p = u[0], E = u[1];
      if (p && E) {
        var L = p.split(`
`), J = E.split(`
`);
        for (s = i = 0; i < L.length && !L[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < J.length && !J[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === L.length || s === J.length)
          for (i = L.length - 1, s = J.length - 1; 1 <= i && 0 <= s && L[i] !== J[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (L[i] !== J[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || L[i] !== J[s]) {
                  var ue = `
` + L[i].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      Le = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? ke(l) : "";
  }
  function _e(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ke(e.type);
      case 16:
        return ke("Lazy");
      case 13:
        return e.child !== t && t !== null ? ke("Suspense Fallback") : ke("Suspense");
      case 19:
        return ke("SuspenseList");
      case 0:
      case 15:
        return Ue(e.type, !1);
      case 11:
        return Ue(e.type.render, !1);
      case 1:
        return Ue(e.type, !0);
      case 31:
        return ke("Activity");
      default:
        return "";
    }
  }
  function Ze(e) {
    try {
      var t = "", l = null;
      do
        t += _e(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Oe = Object.prototype.hasOwnProperty, We = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ye = n.unstable_requestPaint, Q = n.unstable_now, ce = n.unstable_getCurrentPriorityLevel, He = n.unstable_ImmediatePriority, Ce = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Tt = n.unstable_IdlePriority, St = n.log, Bt = n.unstable_setDisableYieldValue, kt = null, xt = null;
  function on(e) {
    if (typeof St == "function" && Bt(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(kt, e);
      } catch {
      }
  }
  var st = Math.clz32 ? Math.clz32 : Rn, Et = Math.log, Jt = Math.LN2;
  function Rn(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Et(e) / Jt | 0) | 0;
  }
  var Ft = 256, Wt = 262144, ot = 4194304;
  function ut(e) {
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
  function Ke(e, t, l) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0, u = e.suspendedLanes, p = e.pingedLanes;
    e = e.warmLanes;
    var E = i & 134217727;
    return E !== 0 ? (i = E & ~u, i !== 0 ? s = ut(i) : (p &= E, p !== 0 ? s = ut(p) : l || (l = E & ~e, l !== 0 && (s = ut(l))))) : (E = i & ~u, E !== 0 ? s = ut(E) : p !== 0 ? s = ut(p) : l || (l = i & ~e, l !== 0 && (s = ut(l)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : s;
  }
  function Qt(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function wn(e, t) {
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
  function _n() {
    var e = ot;
    return ot <<= 1, (ot & 62914560) === 0 && (ot = 4194304), e;
  }
  function Yt(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function nl(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function zt(e, t, l, i, s, u) {
    var p = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var E = e.entanglements, L = e.expirationTimes, J = e.hiddenUpdates;
    for (l = p & ~l; 0 < l; ) {
      var ue = 31 - st(l), me = 1 << ue;
      E[ue] = 0, L[ue] = -1;
      var W = J[ue];
      if (W !== null)
        for (J[ue] = null, ue = 0; ue < W.length; ue++) {
          var ie = W[ue];
          ie !== null && (ie.lane &= -536870913);
        }
      l &= ~me;
    }
    i !== 0 && so(e, i, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(p & ~t));
  }
  function so(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - st(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | l & 261930;
  }
  function Fn(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var i = 31 - st(l), s = 1 << i;
      s & t | e[i] & t && (e[i] |= t), l &= ~s;
    }
  }
  function rn(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : co(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function co(e) {
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
  function jl(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ll() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ry(e.type));
  }
  function wo(e, t) {
    var l = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = l;
    }
  }
  var an = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + an, Rt = "__reactProps$" + an, Ye = "__reactContainer$" + an, Gn = "__reactEvents$" + an, Gi = "__reactListeners$" + an, dt = "__reactHandles$" + an, Yi = "__reactResources$" + an, Jl = "__reactMarker$" + an;
  function uo(e) {
    delete e[Ct], delete e[Rt], delete e[Gn], delete e[Gi], delete e[dt];
  }
  function Yn(e) {
    var t = e[Ct];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[Ct]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = qb(e); e !== null; ) {
            if (l = e[Ct]) return l;
            e = qb(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Ll(e) {
    if (e = e[Ct] || e[Ye]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ol(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(a(33));
  }
  function il(e) {
    var t = e[Yi];
    return t || (t = e[Yi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function en(e) {
    e[Jl] = !0;
  }
  var mn = /* @__PURE__ */ new Set(), Mn = {};
  function Wl(e, t) {
    vl(e, t), vl(e + "Capture", t);
  }
  function vl(e, t) {
    for (Mn[e] = t, e = 0; e < t.length; e++)
      mn.add(t[e]);
  }
  var qi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), $o = {}, Jo = {};
  function Mr(e) {
    return Oe.call(Jo, e) ? !0 : Oe.call($o, e) ? !1 : qi.test(e) ? Jo[e] = !0 : ($o[e] = !0, !1);
  }
  function eo(e, t, l) {
    if (Mr(t))
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
  function Wo(e, t, l) {
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
  function rl(e, t, l, i) {
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
  function sn(e) {
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
  function Qn(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Zn(e, t, l) {
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
        set: function(p) {
          l = "" + p, u.call(this, p);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(p) {
          l = "" + p;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function zn(e) {
    if (!e._valueTracker) {
      var t = Qn(e) ? "checked" : "value";
      e._valueTracker = Zn(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Dn(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), i = "";
    return e && (i = Qn(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== l ? (t.setValue(e), !0) : !1;
  }
  function _o(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var va = /[\n"\\]/g;
  function An(e) {
    return e.replace(
      va,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pi(e, t, l, i, s, u, p, E) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + sn(t)) : e.value !== "" + sn(t) && (e.value = "" + sn(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? ei(e, p, sn(t)) : l != null ? ei(e, p, sn(l)) : i != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + sn(E) : e.removeAttribute("name");
  }
  function Ar(e, t, l, i, s, u, p, E) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        zn(e);
        return;
      }
      l = l != null ? "" + sn(l) : "", t = t != null ? "" + sn(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = E ? e.checked : !!i, e.defaultChecked = !!i, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), zn(e);
  }
  function ei(e, t, l) {
    t === "number" && _o(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function xl(e, t, l, i) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && i && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + sn(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, i && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xi(e, t, l) {
    if (t != null && (t = "" + sn(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + sn(l) : "";
  }
  function Mo(e, t, l, i) {
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
    l = sn(t), e.defaultValue = l, i = e.textContent, i === l && i !== "" && i !== null && (e.value = i), zn(e);
  }
  function Vl(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var al = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ti(e, t, l) {
    var i = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, l) : typeof l != "number" || l === 0 || al.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function cn(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(a(62));
    if (e = e.style, l != null) {
      for (var i in l)
        !l.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var s in t)
        i = t[s], t.hasOwnProperty(s) && l[s] !== i && ti(e, s, i);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && ti(e, u, t[u]);
  }
  function sl(e) {
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
  var to = /* @__PURE__ */ new Map([
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
  ]), Ao = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function no(e) {
    return Ao.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $n() {
  }
  var R = null;
  function N(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var D = null, U = null;
  function ee(e) {
    var t = Ll(e);
    if (t && (e = t.stateNode)) {
      var l = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Pi(
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
              'input[name="' + An(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var s = i[Rt] || null;
                if (!s) throw Error(a(90));
                Pi(
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
              i = l[t], i.form === e.form && Dn(i);
          }
          break e;
        case "textarea":
          Xi(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && xl(e, !!l.multiple, t, !1);
      }
    }
  }
  var re = !1;
  function ge(e, t, l) {
    if (re) return e(t, l);
    re = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (re = !1, (D !== null || U !== null) && (dc(), D && (t = D, e = U, U = D = null, ee(t), e)))
        for (t = 0; t < e.length; t++) ee(e[t]);
    }
  }
  function Y(e, t) {
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
  var Z = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Se = !1;
  if (Z)
    try {
      var Re = {};
      Object.defineProperty(Re, "passive", {
        get: function() {
          Se = !0;
        }
      }), window.addEventListener("test", Re, Re), window.removeEventListener("test", Re, Re);
    } catch {
      Se = !1;
    }
  var Ie = null, Ne = null, Ae = null;
  function wt() {
    if (Ae) return Ae;
    var e, t = Ne, l = t.length, i, s = "value" in Ie ? Ie.value : Ie.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var p = l - e;
    for (i = 1; i <= p && t[l - i] === s[u - i]; i++) ;
    return Ae = s.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Ht(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function tn() {
    return !0;
  }
  function Jn() {
    return !1;
  }
  function Ot(e) {
    function t(l, i, s, u, p) {
      this._reactName = l, this._targetInst = s, this.type = i, this.nativeEvent = u, this.target = p, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (l = e[E], this[E] = l ? l(u) : u[E]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? tn : Jn, this.isPropagationStopped = Jn, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = tn);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = tn);
      },
      persist: function() {
      },
      isPersistent: tn
    }), t;
  }
  var pn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Sn = Ot(pn), Wn = v({}, pn, { view: 0, detail: 0 }), fo = Ot(Wn), jn, Sl, ho, Ki = v({}, Wn, {
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
    getModifierState: Du,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ho && (ho && e.type === "mousemove" ? (jn = e.screenX - ho.screenX, Sl = e.screenY - ho.screenY) : Sl = jn = 0, ho = e), jn);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Sl;
    }
  }), xa = Ot(Ki), eS = v({}, Ki, { dataTransfer: 0 }), tS = Ot(eS), nS = v({}, Wn, { relatedTarget: 0 }), zu = Ot(nS), lS = v({}, pn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oS = Ot(lS), iS = v({}, pn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rS = Ot(iS), aS = v({}, pn, { data: 0 }), Um = Ot(aS), sS = {
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
  function Du() {
    return fS;
  }
  var dS = v({}, Wn, {
    key: function(e) {
      if (e.key) {
        var t = sS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ht(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Du,
    charCode: function(e) {
      return e.type === "keypress" ? Ht(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ht(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hS = Ot(dS), mS = v({}, Ki, {
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
  }), Bm = Ot(mS), pS = v({}, Wn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), gS = Ot(pS), bS = v({}, pn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yS = Ot(bS), vS = v({}, Ki, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xS = Ot(vS), SS = v({}, pn, {
    newState: 0,
    oldState: 0
  }), ES = Ot(SS), CS = [9, 13, 27, 32], ju = Z && "CompositionEvent" in window, Sa = null;
  Z && "documentMode" in document && (Sa = document.documentMode);
  var RS = Z && "TextEvent" in window && !Sa, Gm = Z && (!ju || Sa && 8 < Sa && 11 >= Sa), Ym = " ", qm = !1;
  function Pm(e, t) {
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
  function Xm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Tr = !1;
  function wS(e, t) {
    switch (e) {
      case "compositionend":
        return Xm(t);
      case "keypress":
        return t.which !== 32 ? null : (qm = !0, Ym);
      case "textInput":
        return e = t.data, e === Ym && qm ? null : e;
      default:
        return null;
    }
  }
  function _S(e, t) {
    if (Tr)
      return e === "compositionend" || !ju && Pm(e, t) ? (e = wt(), Ae = Ne = Ie = null, Tr = !1, e) : null;
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
        return Gm && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var MS = {
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
  function Km(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!MS[e.type] : t === "textarea";
  }
  function Fm(e, t, l, i) {
    D ? U ? U.push(i) : U = [i] : D = i, t = vc(t, "onChange"), 0 < t.length && (l = new Sn(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Ea = null, Ca = null;
  function AS(e) {
    Ob(e, 0);
  }
  function Ns(e) {
    var t = ol(e);
    if (Dn(t)) return e;
  }
  function Qm(e, t) {
    if (e === "change") return t;
  }
  var Zm = !1;
  if (Z) {
    var Lu;
    if (Z) {
      var Vu = "oninput" in document;
      if (!Vu) {
        var $m = document.createElement("div");
        $m.setAttribute("oninput", "return;"), Vu = typeof $m.oninput == "function";
      }
      Lu = Vu;
    } else Lu = !1;
    Zm = Lu && (!document.documentMode || 9 < document.documentMode);
  }
  function Jm() {
    Ea && (Ea.detachEvent("onpropertychange", Wm), Ca = Ea = null);
  }
  function Wm(e) {
    if (e.propertyName === "value" && Ns(Ca)) {
      var t = [];
      Fm(
        t,
        Ca,
        e,
        N(e)
      ), ge(AS, t);
    }
  }
  function TS(e, t, l) {
    e === "focusin" ? (Jm(), Ea = t, Ca = l, Ea.attachEvent("onpropertychange", Wm)) : e === "focusout" && Jm();
  }
  function OS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ns(Ca);
  }
  function NS(e, t) {
    if (e === "click") return Ns(t);
  }
  function kS(e, t) {
    if (e === "input" || e === "change")
      return Ns(t);
  }
  function zS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var El = typeof Object.is == "function" ? Object.is : zS;
  function Ra(e, t) {
    if (El(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var s = l[i];
      if (!Oe.call(t, s) || !El(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function ep(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function tp(e, t) {
    var l = ep(e);
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
      l = ep(l);
    }
  }
  function np(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? np(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function lp(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = _o(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = _o(e.document);
    }
    return t;
  }
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var DS = Z && "documentMode" in document && 11 >= document.documentMode, Or = null, Hu = null, wa = null, Uu = !1;
  function op(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Uu || Or == null || Or !== _o(i) || (i = Or, "selectionStart" in i && Iu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), wa && Ra(wa, i) || (wa = i, i = vc(Hu, "onSelect"), 0 < i.length && (t = new Sn(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = Or)));
  }
  function Fi(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Nr = {
    animationend: Fi("Animation", "AnimationEnd"),
    animationiteration: Fi("Animation", "AnimationIteration"),
    animationstart: Fi("Animation", "AnimationStart"),
    transitionrun: Fi("Transition", "TransitionRun"),
    transitionstart: Fi("Transition", "TransitionStart"),
    transitioncancel: Fi("Transition", "TransitionCancel"),
    transitionend: Fi("Transition", "TransitionEnd")
  }, Bu = {}, ip = {};
  Z && (ip = document.createElement("div").style, "AnimationEvent" in window || (delete Nr.animationend.animation, delete Nr.animationiteration.animation, delete Nr.animationstart.animation), "TransitionEvent" in window || delete Nr.transitionend.transition);
  function Qi(e) {
    if (Bu[e]) return Bu[e];
    if (!Nr[e]) return e;
    var t = Nr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in ip)
        return Bu[e] = t[l];
    return e;
  }
  var rp = Qi("animationend"), ap = Qi("animationiteration"), sp = Qi("animationstart"), jS = Qi("transitionrun"), LS = Qi("transitionstart"), VS = Qi("transitioncancel"), cp = Qi("transitionend"), up = /* @__PURE__ */ new Map(), Gu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Gu.push("scrollEnd");
  function lo(e, t) {
    up.set(e, t), Wl(t, [e]);
  }
  var ks = typeof reportError == "function" ? reportError : function(e) {
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
  }, Il = [], kr = 0, Yu = 0;
  function zs() {
    for (var e = kr, t = Yu = kr = 0; t < e; ) {
      var l = Il[t];
      Il[t++] = null;
      var i = Il[t];
      Il[t++] = null;
      var s = Il[t];
      Il[t++] = null;
      var u = Il[t];
      if (Il[t++] = null, i !== null && s !== null) {
        var p = i.pending;
        p === null ? s.next = s : (s.next = p.next, p.next = s), i.pending = s;
      }
      u !== 0 && fp(l, s, u);
    }
  }
  function Ds(e, t, l, i) {
    Il[kr++] = e, Il[kr++] = t, Il[kr++] = l, Il[kr++] = i, Yu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function qu(e, t, l, i) {
    return Ds(e, t, l, i), js(e);
  }
  function Zi(e, t) {
    return Ds(e, null, null, t), js(e);
  }
  function fp(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, i = u.alternate, i !== null && (i.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - st(l), e = u.hiddenUpdates, i = e[s], i === null ? e[s] = [t] : i.push(t), t.lane = l | 536870912), u) : null;
  }
  function js(e) {
    if (50 < Ka)
      throw Ka = 0, ed = null, Error(a(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var zr = {};
  function IS(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Cl(e, t, l, i) {
    return new IS(e, t, l, i);
  }
  function Pu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function To(e, t) {
    var l = e.alternate;
    return l === null ? (l = Cl(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function dp(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ls(e, t, l, i, s, u) {
    var p = 0;
    if (i = e, typeof e == "function") Pu(e) && (p = 1);
    else if (typeof e == "string")
      p = YE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return e = Cl(31, l, t, s), e.elementType = P, e.lanes = u, e;
        case A:
          return $i(l.children, s, u, t);
        case O:
          p = 8, s |= 24;
          break;
        case M:
          return e = Cl(12, l, t, s | 2), e.elementType = M, e.lanes = u, e;
        case I:
          return e = Cl(13, l, t, s), e.elementType = I, e.lanes = u, e;
        case q:
          return e = Cl(19, l, t, s), e.elementType = q, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                p = 10;
                break e;
              case T:
                p = 9;
                break e;
              case k:
                p = 11;
                break e;
              case B:
                p = 14;
                break e;
              case j:
                p = 16, i = null;
                break e;
            }
          p = 29, l = Error(
            a(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = Cl(p, l, t, s), t.elementType = e, t.type = i, t.lanes = u, t;
  }
  function $i(e, t, l, i) {
    return e = Cl(7, e, i, t), e.lanes = l, e;
  }
  function Xu(e, t, l) {
    return e = Cl(6, e, null, t), e.lanes = l, e;
  }
  function hp(e) {
    var t = Cl(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ku(e, t, l) {
    return t = Cl(
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
  var mp = /* @__PURE__ */ new WeakMap();
  function Hl(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = mp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Ze(t)
      }, mp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ze(t)
    };
  }
  var Dr = [], jr = 0, Vs = null, _a = 0, Ul = [], Bl = 0, ni = null, mo = 1, po = "";
  function Oo(e, t) {
    Dr[jr++] = _a, Dr[jr++] = Vs, Vs = e, _a = t;
  }
  function pp(e, t, l) {
    Ul[Bl++] = mo, Ul[Bl++] = po, Ul[Bl++] = ni, ni = e;
    var i = mo;
    e = po;
    var s = 32 - st(i) - 1;
    i &= ~(1 << s), l += 1;
    var u = 32 - st(t) + s;
    if (30 < u) {
      var p = s - s % 5;
      u = (i & (1 << p) - 1).toString(32), i >>= p, s -= p, mo = 1 << 32 - st(t) + s | l << s | i, po = u + e;
    } else
      mo = 1 << u | l << s | i, po = e;
  }
  function Fu(e) {
    e.return !== null && (Oo(e, 1), pp(e, 1, 0));
  }
  function Qu(e) {
    for (; e === Vs; )
      Vs = Dr[--jr], Dr[jr] = null, _a = Dr[--jr], Dr[jr] = null;
    for (; e === ni; )
      ni = Ul[--Bl], Ul[Bl] = null, po = Ul[--Bl], Ul[Bl] = null, mo = Ul[--Bl], Ul[Bl] = null;
  }
  function gp(e, t) {
    Ul[Bl++] = mo, Ul[Bl++] = po, Ul[Bl++] = ni, mo = t.id, po = t.overflow, ni = e;
  }
  var Ln = null, qt = null, yt = !1, li = null, Gl = !1, Zu = Error(a(519));
  function oi(e) {
    var t = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ma(Hl(t, e)), Zu;
  }
  function bp(e) {
    var t = e.stateNode, l = e.type, i = e.memoizedProps;
    switch (t[Ct] = e, t[Rt] = i, l) {
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
        for (l = 0; l < Qa.length; l++)
          mt(Qa[l], t);
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
        mt("invalid", t), Ar(
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
        mt("invalid", t), Mo(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || Db(t.textContent, l) ? (i.popover != null && (mt("beforetoggle", t), mt("toggle", t)), i.onScroll != null && mt("scroll", t), i.onScrollEnd != null && mt("scrollend", t), i.onClick != null && (t.onclick = $n), t = !0) : t = !1, t || oi(e, !0);
  }
  function yp(e) {
    for (Ln = e.return; Ln; )
      switch (Ln.tag) {
        case 5:
        case 31:
        case 13:
          Gl = !1;
          return;
        case 27:
        case 3:
          Gl = !0;
          return;
        default:
          Ln = Ln.return;
      }
  }
  function Lr(e) {
    if (e !== Ln) return !1;
    if (!yt) return yp(e), yt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || pd(e.type, e.memoizedProps)), l = !l), l && qt && oi(e), yp(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Yb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Yb(e);
    } else
      t === 27 ? (t = qt, yi(e.type) ? (e = xd, xd = null, qt = e) : qt = t) : qt = Ln ? ql(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ji() {
    qt = Ln = null, yt = !1;
  }
  function $u() {
    var e = li;
    return e !== null && (dl === null ? dl = e : dl.push.apply(
      dl,
      e
    ), li = null), e;
  }
  function Ma(e) {
    li === null ? li = [e] : li.push(e);
  }
  var Ju = z(null), Wi = null, No = null;
  function ii(e, t, l) {
    ne(Ju, t._currentValue), t._currentValue = l;
  }
  function ko(e) {
    e._currentValue = Ju.current, K(Ju);
  }
  function Wu(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function ef(e, t, l, i) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var p = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var E = u;
          u = s;
          for (var L = 0; L < t.length; L++)
            if (E.context === t[L]) {
              u.lanes |= l, E = u.alternate, E !== null && (E.lanes |= l), Wu(
                u.return,
                l,
                e
              ), i || (p = null);
              break e;
            }
          u = E.next;
        }
      } else if (s.tag === 18) {
        if (p = s.return, p === null) throw Error(a(341));
        p.lanes |= l, u = p.alternate, u !== null && (u.lanes |= l), Wu(p, l, e), p = null;
      } else p = s.child;
      if (p !== null) p.return = s;
      else
        for (p = s; p !== null; ) {
          if (p === e) {
            p = null;
            break;
          }
          if (s = p.sibling, s !== null) {
            s.return = p.return, p = s;
            break;
          }
          p = p.return;
        }
      s = p;
    }
  }
  function Vr(e, t, l, i) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var p = s.alternate;
        if (p === null) throw Error(a(387));
        if (p = p.memoizedProps, p !== null) {
          var E = s.type;
          El(s.pendingProps.value, p.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (s === qe.current) {
        if (p = s.alternate, p === null) throw Error(a(387));
        p.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(es) : e = [es]);
      }
      s = s.return;
    }
    e !== null && ef(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function Is(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!El(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function er(e) {
    Wi = e, No = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vn(e) {
    return vp(Wi, e);
  }
  function Hs(e, t) {
    return Wi === null && er(e), vp(e, t);
  }
  function vp(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, No === null) {
      if (e === null) throw Error(a(308));
      No = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else No = No.next = t;
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
  }, US = n.unstable_scheduleCallback, BS = n.unstable_NormalPriority, gn = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tf() {
    return {
      controller: new HS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Aa(e) {
    e.refCount--, e.refCount === 0 && US(BS, function() {
      e.controller.abort();
    });
  }
  var Ta = null, nf = 0, Ir = 0, Hr = null;
  function GS(e, t) {
    if (Ta === null) {
      var l = Ta = [];
      nf = 0, Ir = rd(), Hr = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return nf++, t.then(xp, xp), t;
  }
  function xp() {
    if (--nf === 0 && Ta !== null) {
      Hr !== null && (Hr.status = "fulfilled");
      var e = Ta;
      Ta = null, Ir = 0, Hr = null;
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
  var Sp = V.S;
  V.S = function(e, t) {
    ob = Q(), typeof t == "object" && t !== null && typeof t.then == "function" && GS(e, t), Sp !== null && Sp(e, t);
  };
  var tr = z(null);
  function lf() {
    var e = tr.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function Us(e, t) {
    t === null ? ne(tr, tr.current) : ne(tr, t.pool);
  }
  function Ep() {
    var e = lf();
    return e === null ? null : { parent: gn._currentValue, pool: e };
  }
  var Ur = Error(a(460)), of = Error(a(474)), Bs = Error(a(542)), Gs = { then: function() {
  } };
  function Cp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Rp(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($n, $n), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, _p(e), e;
      default:
        if (typeof t.status == "string") t.then($n, $n);
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
            throw e = t.reason, _p(e), e;
        }
        throw lr = t, Ur;
    }
  }
  function nr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (lr = l, Ur) : l;
    }
  }
  var lr = null;
  function wp() {
    if (lr === null) throw Error(a(459));
    var e = lr;
    return lr = null, e;
  }
  function _p(e) {
    if (e === Ur || e === Bs)
      throw Error(a(483));
  }
  var Br = null, Oa = 0;
  function Ys(e) {
    var t = Oa;
    return Oa += 1, Br === null && (Br = []), Rp(Br, e, t);
  }
  function Na(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function qs(e, t) {
    throw t.$$typeof === S ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Mp(e) {
    function t(X, G) {
      if (e) {
        var $ = X.deletions;
        $ === null ? (X.deletions = [G], X.flags |= 16) : $.push(G);
      }
    }
    function l(X, G) {
      if (!e) return null;
      for (; G !== null; )
        t(X, G), G = G.sibling;
      return null;
    }
    function i(X) {
      for (var G = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? G.set(X.key, X) : G.set(X.index, X), X = X.sibling;
      return G;
    }
    function s(X, G) {
      return X = To(X, G), X.index = 0, X.sibling = null, X;
    }
    function u(X, G, $) {
      return X.index = $, e ? ($ = X.alternate, $ !== null ? ($ = $.index, $ < G ? (X.flags |= 67108866, G) : $) : (X.flags |= 67108866, G)) : (X.flags |= 1048576, G);
    }
    function p(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, G, $, de) {
      return G === null || G.tag !== 6 ? (G = Xu($, X.mode, de), G.return = X, G) : (G = s(G, $), G.return = X, G);
    }
    function L(X, G, $, de) {
      var Pe = $.type;
      return Pe === A ? ue(
        X,
        G,
        $.props.children,
        de,
        $.key
      ) : G !== null && (G.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === j && nr(Pe) === G.type) ? (G = s(G, $.props), Na(G, $), G.return = X, G) : (G = Ls(
        $.type,
        $.key,
        $.props,
        null,
        X.mode,
        de
      ), Na(G, $), G.return = X, G);
    }
    function J(X, G, $, de) {
      return G === null || G.tag !== 4 || G.stateNode.containerInfo !== $.containerInfo || G.stateNode.implementation !== $.implementation ? (G = Ku($, X.mode, de), G.return = X, G) : (G = s(G, $.children || []), G.return = X, G);
    }
    function ue(X, G, $, de, Pe) {
      return G === null || G.tag !== 7 ? (G = $i(
        $,
        X.mode,
        de,
        Pe
      ), G.return = X, G) : (G = s(G, $), G.return = X, G);
    }
    function me(X, G, $) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return G = Xu(
          "" + G,
          X.mode,
          $
        ), G.return = X, G;
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case C:
            return $ = Ls(
              G.type,
              G.key,
              G.props,
              null,
              X.mode,
              $
            ), Na($, G), $.return = X, $;
          case w:
            return G = Ku(
              G,
              X.mode,
              $
            ), G.return = X, G;
          case j:
            return G = nr(G), me(X, G, $);
        }
        if (be(G) || fe(G))
          return G = $i(
            G,
            X.mode,
            $,
            null
          ), G.return = X, G;
        if (typeof G.then == "function")
          return me(X, Ys(G), $);
        if (G.$$typeof === _)
          return me(
            X,
            Hs(X, G),
            $
          );
        qs(X, G);
      }
      return null;
    }
    function W(X, G, $, de) {
      var Pe = G !== null ? G.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return Pe !== null ? null : E(X, G, "" + $, de);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            return $.key === Pe ? L(X, G, $, de) : null;
          case w:
            return $.key === Pe ? J(X, G, $, de) : null;
          case j:
            return $ = nr($), W(X, G, $, de);
        }
        if (be($) || fe($))
          return Pe !== null ? null : ue(X, G, $, de, null);
        if (typeof $.then == "function")
          return W(
            X,
            G,
            Ys($),
            de
          );
        if ($.$$typeof === _)
          return W(
            X,
            G,
            Hs(X, $),
            de
          );
        qs(X, $);
      }
      return null;
    }
    function ie(X, G, $, de, Pe) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return X = X.get($) || null, E(G, X, "" + de, Pe);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case C:
            return X = X.get(
              de.key === null ? $ : de.key
            ) || null, L(G, X, de, Pe);
          case w:
            return X = X.get(
              de.key === null ? $ : de.key
            ) || null, J(G, X, de, Pe);
          case j:
            return de = nr(de), ie(
              X,
              G,
              $,
              de,
              Pe
            );
        }
        if (be(de) || fe(de))
          return X = X.get($) || null, ue(G, X, de, Pe, null);
        if (typeof de.then == "function")
          return ie(
            X,
            G,
            $,
            Ys(de),
            Pe
          );
        if (de.$$typeof === _)
          return ie(
            X,
            G,
            $,
            Hs(G, de),
            Pe
          );
        qs(G, de);
      }
      return null;
    }
    function Ve(X, G, $, de) {
      for (var Pe = null, _t = null, Be = G, ct = G = 0, bt = null; Be !== null && ct < $.length; ct++) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var Mt = W(
          X,
          Be,
          $[ct],
          de
        );
        if (Mt === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Mt.alternate === null && t(X, Be), G = u(Mt, G, ct), _t === null ? Pe = Mt : _t.sibling = Mt, _t = Mt, Be = bt;
      }
      if (ct === $.length)
        return l(X, Be), yt && Oo(X, ct), Pe;
      if (Be === null) {
        for (; ct < $.length; ct++)
          Be = me(X, $[ct], de), Be !== null && (G = u(
            Be,
            G,
            ct
          ), _t === null ? Pe = Be : _t.sibling = Be, _t = Be);
        return yt && Oo(X, ct), Pe;
      }
      for (Be = i(Be); ct < $.length; ct++)
        bt = ie(
          Be,
          X,
          ct,
          $[ct],
          de
        ), bt !== null && (e && bt.alternate !== null && Be.delete(
          bt.key === null ? ct : bt.key
        ), G = u(
          bt,
          G,
          ct
        ), _t === null ? Pe = bt : _t.sibling = bt, _t = bt);
      return e && Be.forEach(function(Ci) {
        return t(X, Ci);
      }), yt && Oo(X, ct), Pe;
    }
    function $e(X, G, $, de) {
      if ($ == null) throw Error(a(151));
      for (var Pe = null, _t = null, Be = G, ct = G = 0, bt = null, Mt = $.next(); Be !== null && !Mt.done; ct++, Mt = $.next()) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var Ci = W(X, Be, Mt.value, de);
        if (Ci === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Ci.alternate === null && t(X, Be), G = u(Ci, G, ct), _t === null ? Pe = Ci : _t.sibling = Ci, _t = Ci, Be = bt;
      }
      if (Mt.done)
        return l(X, Be), yt && Oo(X, ct), Pe;
      if (Be === null) {
        for (; !Mt.done; ct++, Mt = $.next())
          Mt = me(X, Mt.value, de), Mt !== null && (G = u(Mt, G, ct), _t === null ? Pe = Mt : _t.sibling = Mt, _t = Mt);
        return yt && Oo(X, ct), Pe;
      }
      for (Be = i(Be); !Mt.done; ct++, Mt = $.next())
        Mt = ie(Be, X, ct, Mt.value, de), Mt !== null && (e && Mt.alternate !== null && Be.delete(Mt.key === null ? ct : Mt.key), G = u(Mt, G, ct), _t === null ? Pe = Mt : _t.sibling = Mt, _t = Mt);
      return e && Be.forEach(function(eC) {
        return t(X, eC);
      }), yt && Oo(X, ct), Pe;
    }
    function It(X, G, $, de) {
      if (typeof $ == "object" && $ !== null && $.type === A && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            e: {
              for (var Pe = $.key; G !== null; ) {
                if (G.key === Pe) {
                  if (Pe = $.type, Pe === A) {
                    if (G.tag === 7) {
                      l(
                        X,
                        G.sibling
                      ), de = s(
                        G,
                        $.props.children
                      ), de.return = X, X = de;
                      break e;
                    }
                  } else if (G.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === j && nr(Pe) === G.type) {
                    l(
                      X,
                      G.sibling
                    ), de = s(G, $.props), Na(de, $), de.return = X, X = de;
                    break e;
                  }
                  l(X, G);
                  break;
                } else t(X, G);
                G = G.sibling;
              }
              $.type === A ? (de = $i(
                $.props.children,
                X.mode,
                de,
                $.key
              ), de.return = X, X = de) : (de = Ls(
                $.type,
                $.key,
                $.props,
                null,
                X.mode,
                de
              ), Na(de, $), de.return = X, X = de);
            }
            return p(X);
          case w:
            e: {
              for (Pe = $.key; G !== null; ) {
                if (G.key === Pe)
                  if (G.tag === 4 && G.stateNode.containerInfo === $.containerInfo && G.stateNode.implementation === $.implementation) {
                    l(
                      X,
                      G.sibling
                    ), de = s(G, $.children || []), de.return = X, X = de;
                    break e;
                  } else {
                    l(X, G);
                    break;
                  }
                else t(X, G);
                G = G.sibling;
              }
              de = Ku($, X.mode, de), de.return = X, X = de;
            }
            return p(X);
          case j:
            return $ = nr($), It(
              X,
              G,
              $,
              de
            );
        }
        if (be($))
          return Ve(
            X,
            G,
            $,
            de
          );
        if (fe($)) {
          if (Pe = fe($), typeof Pe != "function") throw Error(a(150));
          return $ = Pe.call($), $e(
            X,
            G,
            $,
            de
          );
        }
        if (typeof $.then == "function")
          return It(
            X,
            G,
            Ys($),
            de
          );
        if ($.$$typeof === _)
          return It(
            X,
            G,
            Hs(X, $),
            de
          );
        qs(X, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, G !== null && G.tag === 6 ? (l(X, G.sibling), de = s(G, $), de.return = X, X = de) : (l(X, G), de = Xu($, X.mode, de), de.return = X, X = de), p(X)) : l(X, G);
    }
    return function(X, G, $, de) {
      try {
        Oa = 0;
        var Pe = It(
          X,
          G,
          $,
          de
        );
        return Br = null, Pe;
      } catch (Be) {
        if (Be === Ur || Be === Bs) throw Be;
        var _t = Cl(29, Be, null, X.mode);
        return _t.lanes = de, _t.return = X, _t;
      }
    };
  }
  var or = Mp(!0), Ap = Mp(!1), ri = !1;
  function rf(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function af(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ai(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function si(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Nt & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = js(e), fp(e, null, l), t;
    }
    return Ds(e, i, t, l), js(e);
  }
  function ka(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Fn(e, l);
    }
  }
  function sf(e, t) {
    var l = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, l === i)) {
      var s = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var p = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = p : u = u.next = p, l = l.next;
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
  var cf = !1;
  function za() {
    if (cf) {
      var e = Hr;
      if (e !== null) throw e;
    }
  }
  function Da(e, t, l, i) {
    cf = !1;
    var s = e.updateQueue;
    ri = !1;
    var u = s.firstBaseUpdate, p = s.lastBaseUpdate, E = s.shared.pending;
    if (E !== null) {
      s.shared.pending = null;
      var L = E, J = L.next;
      L.next = null, p === null ? u = J : p.next = J, p = L;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== p && (E === null ? ue.firstBaseUpdate = J : E.next = J, ue.lastBaseUpdate = L));
    }
    if (u !== null) {
      var me = s.baseState;
      p = 0, ue = J = L = null, E = u;
      do {
        var W = E.lane & -536870913, ie = W !== E.lane;
        if (ie ? (gt & W) === W : (i & W) === W) {
          W !== 0 && W === Ir && (cf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ve = e, $e = E;
            W = t;
            var It = l;
            switch ($e.tag) {
              case 1:
                if (Ve = $e.payload, typeof Ve == "function") {
                  me = Ve.call(It, me, W);
                  break e;
                }
                me = Ve;
                break e;
              case 3:
                Ve.flags = Ve.flags & -65537 | 128;
              case 0:
                if (Ve = $e.payload, W = typeof Ve == "function" ? Ve.call(It, me, W) : Ve, W == null) break e;
                me = v({}, me, W);
                break e;
              case 2:
                ri = !0;
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
          }, ue === null ? (J = ue = ie, L = me) : ue = ue.next = ie, p |= W;
        if (E = E.next, E === null) {
          if (E = s.shared.pending, E === null)
            break;
          ie = E, E = ie.next, ie.next = null, s.lastBaseUpdate = ie, s.shared.pending = null;
        }
      } while (!0);
      ue === null && (L = me), s.baseState = L, s.firstBaseUpdate = J, s.lastBaseUpdate = ue, u === null && (s.shared.lanes = 0), hi |= p, e.lanes = p, e.memoizedState = me;
    }
  }
  function Tp(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function Op(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Tp(l[e], t);
  }
  var Gr = z(null), Ps = z(0);
  function Np(e, t) {
    e = Bo, ne(Ps, e), ne(Gr, t), Bo = e | t.baseLanes;
  }
  function uf() {
    ne(Ps, Bo), ne(Gr, Gr.current);
  }
  function ff() {
    Bo = Ps.current, K(Gr), K(Ps);
  }
  var Rl = z(null), Yl = null;
  function ci(e) {
    var t = e.alternate;
    ne(un, un.current & 1), ne(Rl, e), Yl === null && (t === null || Gr.current !== null || t.memoizedState !== null) && (Yl = e);
  }
  function df(e) {
    ne(un, un.current), ne(Rl, e), Yl === null && (Yl = e);
  }
  function kp(e) {
    e.tag === 22 ? (ne(un, un.current), ne(Rl, e), Yl === null && (Yl = e)) : ui();
  }
  function ui() {
    ne(un, un.current), ne(Rl, Rl.current);
  }
  function wl(e) {
    K(Rl), Yl === e && (Yl = null), K(un);
  }
  var un = z(0);
  function Xs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || yd(l) || vd(l)))
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
  var zo = 0, rt = null, Lt = null, bn = null, Ks = !1, Yr = !1, ir = !1, Fs = 0, ja = 0, qr = null, qS = 0;
  function nn() {
    throw Error(a(321));
  }
  function hf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!El(e[l], t[l])) return !1;
    return !0;
  }
  function mf(e, t, l, i, s, u) {
    return zo = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? pg : Tf, ir = !1, u = l(i, s), ir = !1, Yr && (u = Dp(
      t,
      l,
      i,
      s
    )), zp(e), u;
  }
  function zp(e) {
    V.H = Ia;
    var t = Lt !== null && Lt.next !== null;
    if (zo = 0, bn = Lt = rt = null, Ks = !1, ja = 0, qr = null, t) throw Error(a(300));
    e === null || yn || (e = e.dependencies, e !== null && Is(e) && (yn = !0));
  }
  function Dp(e, t, l, i) {
    rt = e;
    var s = 0;
    do {
      if (Yr && (qr = null), ja = 0, Yr = !1, 25 <= s) throw Error(a(301));
      if (s += 1, bn = Lt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = gg, u = t(l, i);
    } while (Yr);
    return u;
  }
  function PS() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? La(t) : t, e = e.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== e && (rt.flags |= 1024), t;
  }
  function pf() {
    var e = Fs !== 0;
    return Fs = 0, e;
  }
  function gf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function bf(e) {
    if (Ks) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ks = !1;
    }
    zo = 0, bn = Lt = rt = null, Yr = !1, ja = Fs = 0, qr = null;
  }
  function el() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return bn === null ? rt.memoizedState = bn = e : bn = bn.next = e, bn;
  }
  function fn() {
    if (Lt === null) {
      var e = rt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Lt.next;
    var t = bn === null ? rt.memoizedState : bn.next;
    if (t !== null)
      bn = t, Lt = e;
    else {
      if (e === null)
        throw rt.alternate === null ? Error(a(467)) : Error(a(310));
      Lt = e, e = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      }, bn === null ? rt.memoizedState = bn = e : bn = bn.next = e;
    }
    return bn;
  }
  function Qs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function La(e) {
    var t = ja;
    return ja += 1, qr === null && (qr = []), e = Rp(qr, e, t), t = rt, (bn === null ? t.memoizedState : bn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? pg : Tf), e;
  }
  function Zs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return La(e);
      if (e.$$typeof === _) return Vn(e);
    }
    throw Error(a(438, String(e)));
  }
  function yf(e) {
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
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Qs(), rt.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = te;
    return t.index++, l;
  }
  function Do(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function $s(e) {
    var t = fn();
    return vf(t, Lt, e);
  }
  function vf(e, t, l) {
    var i = e.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = l;
    var s = e.baseQueue, u = i.pending;
    if (u !== null) {
      if (s !== null) {
        var p = s.next;
        s.next = u.next, u.next = p;
      }
      t.baseQueue = s = u, i.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var E = p = null, L = null, J = t, ue = !1;
      do {
        var me = J.lane & -536870913;
        if (me !== J.lane ? (gt & me) === me : (zo & me) === me) {
          var W = J.revertLane;
          if (W === 0)
            L !== null && (L = L.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: J.action,
              hasEagerState: J.hasEagerState,
              eagerState: J.eagerState,
              next: null
            }), me === Ir && (ue = !0);
          else if ((zo & W) === W) {
            J = J.next, W === Ir && (ue = !0);
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
            }, L === null ? (E = L = me, p = u) : L = L.next = me, rt.lanes |= W, hi |= W;
          me = J.action, ir && l(u, me), u = J.hasEagerState ? J.eagerState : l(u, me);
        } else
          W = {
            lane: me,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, L === null ? (E = L = W, p = u) : L = L.next = W, rt.lanes |= me, hi |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (L === null ? p = u : L.next = E, !El(u, e.memoizedState) && (yn = !0, ue && (l = Hr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = p, e.baseQueue = L, i.lastRenderedState = u;
    }
    return s === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function xf(e) {
    var t = fn(), l = t.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = e;
    var i = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var p = s = s.next;
      do
        u = e(u, p.action), p = p.next;
      while (p !== s);
      El(u, t.memoizedState) || (yn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, i];
  }
  function jp(e, t, l) {
    var i = rt, s = fn(), u = yt;
    if (u) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = t();
    var p = !El(
      (Lt || s).memoizedState,
      l
    );
    if (p && (s.memoizedState = l, yn = !0), s = s.queue, Cf(Ip.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || p || bn !== null && bn.memoizedState.tag & 1) {
      if (i.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Vp.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(a(349));
      u || (zo & 127) !== 0 || Lp(i, t, l);
    }
    return l;
  }
  function Lp(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Qs(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Vp(e, t, l, i) {
    t.value = l, t.getSnapshot = i, Hp(t) && Up(e);
  }
  function Ip(e, t, l) {
    return l(function() {
      Hp(t) && Up(e);
    });
  }
  function Hp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !El(e, l);
    } catch {
      return !0;
    }
  }
  function Up(e) {
    var t = Zi(e, 2);
    t !== null && hl(t, e, 2);
  }
  function Sf(e) {
    var t = el();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), ir) {
        on(!0);
        try {
          l();
        } finally {
          on(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Do,
      lastRenderedState: e
    }, t;
  }
  function Bp(e, t, l, i) {
    return e.baseState = l, vf(
      e,
      Lt,
      typeof i == "function" ? i : Do
    );
  }
  function XS(e, t, l, i, s) {
    if (ec(e)) throw Error(a(485));
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
        then: function(p) {
          u.listeners.push(p);
        }
      };
      V.T !== null ? l(!0) : u.isTransition = !1, i(u), l = t.pending, l === null ? (u.next = t.pending = u, Gp(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Gp(e, t) {
    var l = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, p = {};
      V.T = p;
      try {
        var E = l(s, i), L = V.S;
        L !== null && L(p, E), Yp(e, t, E);
      } catch (J) {
        Ef(e, t, J);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), V.T = u;
      }
    } else
      try {
        u = l(s, i), Yp(e, t, u);
      } catch (J) {
        Ef(e, t, J);
      }
  }
  function Yp(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        qp(e, t, i);
      },
      function(i) {
        return Ef(e, t, i);
      }
    ) : qp(e, t, l);
  }
  function qp(e, t, l) {
    t.status = "fulfilled", t.value = l, Pp(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Gp(e, l)));
  }
  function Ef(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Pp(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Pp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Xp(e, t) {
    return t;
  }
  function Kp(e, t) {
    if (yt) {
      var l = Ut.formState;
      if (l !== null) {
        e: {
          var i = rt;
          if (yt) {
            if (qt) {
              t: {
                for (var s = qt, u = Gl; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break t;
                  }
                  if (s = ql(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                qt = ql(
                  s.nextSibling
                ), i = s.data === "F!";
                break e;
              }
            }
            oi(i);
          }
          i = !1;
        }
        i && (t = l[0]);
      }
    }
    return l = el(), l.memoizedState = l.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xp,
      lastRenderedState: t
    }, l.queue = i, l = dg.bind(
      null,
      rt,
      i
    ), i.dispatch = l, i = Sf(!1), u = Af.bind(
      null,
      rt,
      !1,
      i.queue
    ), i = el(), s = {
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
  function Fp(e) {
    var t = fn();
    return Qp(t, Lt, e);
  }
  function Qp(e, t, l) {
    if (t = vf(
      e,
      t,
      Xp
    )[0], e = $s(Do)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = La(t);
      } catch (p) {
        throw p === Ur ? Bs : p;
      }
    else i = t;
    t = fn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (rt.flags |= 2048, Pr(
      9,
      { destroy: void 0 },
      KS.bind(null, s, l),
      null
    )), [i, u, e];
  }
  function KS(e, t) {
    e.action = t;
  }
  function Zp(e) {
    var t = fn(), l = Lt;
    if (l !== null)
      return Qp(t, l, e);
    fn(), t = t.memoizedState, l = fn();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Pr(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Qs(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function $p() {
    return fn().memoizedState;
  }
  function Js(e, t, l, i) {
    var s = el();
    rt.flags |= e, s.memoizedState = Pr(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Ws(e, t, l, i) {
    var s = fn();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    Lt !== null && i !== null && hf(i, Lt.memoizedState.deps) ? s.memoizedState = Pr(t, u, l, i) : (rt.flags |= e, s.memoizedState = Pr(
      1 | t,
      u,
      l,
      i
    ));
  }
  function Jp(e, t) {
    Js(8390656, 8, e, t);
  }
  function Cf(e, t) {
    Ws(2048, 8, e, t);
  }
  function FS(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Qs(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Wp(e) {
    var t = fn().memoizedState;
    return FS({ ref: t, nextImpl: e }), function() {
      if ((Nt & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function eg(e, t) {
    return Ws(4, 2, e, t);
  }
  function tg(e, t) {
    return Ws(4, 4, e, t);
  }
  function ng(e, t) {
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
  function lg(e, t, l) {
    l = l != null ? l.concat([e]) : null, Ws(4, 4, ng.bind(null, t, e), l);
  }
  function Rf() {
  }
  function og(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && hf(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function ig(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && hf(t, i[1]))
      return i[0];
    if (i = e(), ir) {
      on(!0);
      try {
        e();
      } finally {
        on(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function wf(e, t, l) {
    return l === void 0 || (zo & 1073741824) !== 0 && (gt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = rb(), rt.lanes |= e, hi |= e, l);
  }
  function rg(e, t, l, i) {
    return El(l, t) ? l : Gr.current !== null ? (e = wf(e, l, i), El(e, t) || (yn = !0), e) : (zo & 42) === 0 || (zo & 1073741824) !== 0 && (gt & 261930) === 0 ? (yn = !0, e.memoizedState = l) : (e = rb(), rt.lanes |= e, hi |= e, t);
  }
  function ag(e, t, l, i, s) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var p = V.T, E = {};
    V.T = E, Af(e, !1, t, l);
    try {
      var L = s(), J = V.S;
      if (J !== null && J(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = YS(
          L,
          i
        );
        Va(
          e,
          t,
          ue,
          Al(e)
        );
      } else
        Va(
          e,
          t,
          i,
          Al(e)
        );
    } catch (me) {
      Va(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Al()
      );
    } finally {
      H.p = u, p !== null && E.types !== null && (p.types = E.types), V.T = p;
    }
  }
  function QS() {
  }
  function _f(e, t, l, i) {
    if (e.tag !== 5) throw Error(a(476));
    var s = sg(e).queue;
    ag(
      e,
      s,
      t,
      F,
      l === null ? QS : function() {
        return cg(e), l(i);
      }
    );
  }
  function sg(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Do,
        lastRenderedState: F
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
        lastRenderedReducer: Do,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function cg(e) {
    var t = sg(e);
    t.next === null && (t = e.alternate.memoizedState), Va(
      e,
      t.next.queue,
      {},
      Al()
    );
  }
  function Mf() {
    return Vn(es);
  }
  function ug() {
    return fn().memoizedState;
  }
  function fg() {
    return fn().memoizedState;
  }
  function ZS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Al();
          e = ai(l);
          var i = si(t, e, l);
          i !== null && (hl(i, t, l), ka(i, t, l)), t = { cache: tf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function $S(e, t, l) {
    var i = Al();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ec(e) ? hg(t, l) : (l = qu(e, t, l, i), l !== null && (hl(l, e, i), mg(l, t, i)));
  }
  function dg(e, t, l) {
    var i = Al();
    Va(e, t, l, i);
  }
  function Va(e, t, l, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ec(e)) hg(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var p = t.lastRenderedState, E = u(p, l);
          if (s.hasEagerState = !0, s.eagerState = E, El(E, p))
            return Ds(e, t, s, 0), Ut === null && zs(), !1;
        } catch {
        }
      if (l = qu(e, t, s, i), l !== null)
        return hl(l, e, i), mg(l, t, i), !0;
    }
    return !1;
  }
  function Af(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: rd(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ec(e)) {
      if (t) throw Error(a(479));
    } else
      t = qu(
        e,
        l,
        i,
        2
      ), t !== null && hl(t, e, 2);
  }
  function ec(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
  }
  function hg(e, t) {
    Yr = Ks = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function mg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Fn(e, l);
    }
  }
  var Ia = {
    readContext: Vn,
    use: Zs,
    useCallback: nn,
    useContext: nn,
    useEffect: nn,
    useImperativeHandle: nn,
    useLayoutEffect: nn,
    useInsertionEffect: nn,
    useMemo: nn,
    useReducer: nn,
    useRef: nn,
    useState: nn,
    useDebugValue: nn,
    useDeferredValue: nn,
    useTransition: nn,
    useSyncExternalStore: nn,
    useId: nn,
    useHostTransitionStatus: nn,
    useFormState: nn,
    useActionState: nn,
    useOptimistic: nn,
    useMemoCache: nn,
    useCacheRefresh: nn
  };
  Ia.useEffectEvent = nn;
  var pg = {
    readContext: Vn,
    use: Zs,
    useCallback: function(e, t) {
      return el().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vn,
    useEffect: Jp,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Js(
        4194308,
        4,
        ng.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Js(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Js(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = el();
      t = t === void 0 ? null : t;
      var i = e();
      if (ir) {
        on(!0);
        try {
          e();
        } finally {
          on(!1);
        }
      }
      return l.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, l) {
      var i = el();
      if (l !== void 0) {
        var s = l(t);
        if (ir) {
          on(!0);
          try {
            l(t);
          } finally {
            on(!1);
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
      var t = el();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Sf(e);
      var t = e.queue, l = dg.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = el();
      return wf(l, e, t);
    },
    useTransition: function() {
      var e = Sf(!1);
      return e = ag.bind(
        null,
        rt,
        e.queue,
        !0,
        !1
      ), el().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var i = rt, s = el();
      if (yt) {
        if (l === void 0)
          throw Error(a(407));
        l = l();
      } else {
        if (l = t(), Ut === null)
          throw Error(a(349));
        (gt & 127) !== 0 || Lp(i, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, Jp(Ip.bind(null, i, u, e), [
        e
      ]), i.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Vp.bind(
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
      var e = el(), t = Ut.identifierPrefix;
      if (yt) {
        var l = po, i = mo;
        l = (i & ~(1 << 32 - st(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Fs++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = qS++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Mf,
    useFormState: Kp,
    useActionState: Kp,
    useOptimistic: function(e) {
      var t = el();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Af.bind(
        null,
        rt,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: yf,
    useCacheRefresh: function() {
      return el().memoizedState = ZS.bind(
        null,
        rt
      );
    },
    useEffectEvent: function(e) {
      var t = el(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((Nt & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Tf = {
    readContext: Vn,
    use: Zs,
    useCallback: og,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: lg,
    useInsertionEffect: eg,
    useLayoutEffect: tg,
    useMemo: ig,
    useReducer: $s,
    useRef: $p,
    useState: function() {
      return $s(Do);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return rg(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = $s(Do)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : La(e),
        t
      ];
    },
    useSyncExternalStore: jp,
    useId: ug,
    useHostTransitionStatus: Mf,
    useFormState: Fp,
    useActionState: Fp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Bp(l, Lt, e, t);
    },
    useMemoCache: yf,
    useCacheRefresh: fg
  };
  Tf.useEffectEvent = Wp;
  var gg = {
    readContext: Vn,
    use: Zs,
    useCallback: og,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: lg,
    useInsertionEffect: eg,
    useLayoutEffect: tg,
    useMemo: ig,
    useReducer: xf,
    useRef: $p,
    useState: function() {
      return xf(Do);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return Lt === null ? wf(l, e, t) : rg(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = xf(Do)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : La(e),
        t
      ];
    },
    useSyncExternalStore: jp,
    useId: ug,
    useHostTransitionStatus: Mf,
    useFormState: Zp,
    useActionState: Zp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Lt !== null ? Bp(l, Lt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: yf,
    useCacheRefresh: fg
  };
  gg.useEffectEvent = Wp;
  function Of(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : v({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Nf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Al(), s = ai(i);
      s.payload = t, l != null && (s.callback = l), t = si(e, s, i), t !== null && (hl(t, e, i), ka(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Al(), s = ai(i);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = si(e, s, i), t !== null && (hl(t, e, i), ka(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Al(), i = ai(l);
      i.tag = 2, t != null && (i.callback = t), t = si(e, i, l), t !== null && (hl(t, e, l), ka(t, e, l));
    }
  };
  function bg(e, t, l, i, s, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Ra(l, i) || !Ra(s, u) : !0;
  }
  function yg(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Nf.enqueueReplaceState(t, t.state, null);
  }
  function rr(e, t) {
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
  function vg(e) {
    ks(e);
  }
  function xg(e) {
    console.error(e);
  }
  function Sg(e) {
    ks(e);
  }
  function tc(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Eg(e, t, l) {
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
  function kf(e, t, l) {
    return l = ai(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      tc(e, t);
    }, l;
  }
  function Cg(e) {
    return e = ai(e), e.tag = 3, e;
  }
  function Rg(e, t, l, i) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        Eg(t, l, i);
      };
    }
    var p = l.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      Eg(t, l, i), typeof s != "function" && (mi === null ? mi = /* @__PURE__ */ new Set([this]) : mi.add(this));
      var E = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function JS(e, t, l, i, s) {
    if (l.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = l.alternate, t !== null && Vr(
        t,
        l,
        s,
        !0
      ), l = Rl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Yl === null ? hc() : l.alternate === null && ln === 0 && (ln = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, i === Gs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), ld(e, i, s)), !1;
          case 22:
            return l.flags |= 65536, i === Gs ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), ld(e, i, s)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return ld(e, i, s), hc(), !1;
    }
    if (yt)
      return t = Rl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== Zu && (e = Error(a(422), { cause: i }), Ma(Hl(e, l)))) : (i !== Zu && (t = Error(a(423), {
        cause: i
      }), Ma(
        Hl(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = Hl(i, l), s = kf(
        e.stateNode,
        i,
        s
      ), sf(e, s), ln !== 4 && (ln = 2)), !1;
    var u = Error(a(520), { cause: i });
    if (u = Hl(u, l), Xa === null ? Xa = [u] : Xa.push(u), ln !== 4 && (ln = 2), t === null) return !0;
    i = Hl(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = kf(l.stateNode, i, e), sf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (mi === null || !mi.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = Cg(s), Rg(
              s,
              e,
              l,
              i
            ), sf(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var zf = Error(a(461)), yn = !1;
  function In(e, t, l, i) {
    t.child = e === null ? Ap(t, null, l, i) : or(
      t,
      e.child,
      l,
      i
    );
  }
  function wg(e, t, l, i, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in i) {
      var p = {};
      for (var E in i)
        E !== "ref" && (p[E] = i[E]);
    } else p = i;
    return er(t), i = mf(
      e,
      t,
      l,
      p,
      u,
      s
    ), E = pf(), e !== null && !yn ? (gf(e, t, s), jo(e, t, s)) : (yt && E && Fu(t), t.flags |= 1, In(e, t, i, s), t.child);
  }
  function _g(e, t, l, i, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !Pu(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Mg(
        e,
        t,
        u,
        i,
        s
      )) : (e = Ls(
        l.type,
        null,
        i,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Bf(e, s)) {
      var p = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ra, l(p, i) && e.ref === t.ref)
        return jo(e, t, s);
    }
    return t.flags |= 1, e = To(u, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Mg(e, t, l, i, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ra(u, i) && e.ref === t.ref)
        if (yn = !1, t.pendingProps = i = u, Bf(e, s))
          (e.flags & 131072) !== 0 && (yn = !0);
        else
          return t.lanes = e.lanes, jo(e, t, s);
    }
    return Df(
      e,
      t,
      l,
      i,
      s
    );
  }
  function Ag(e, t, l, i) {
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
        return Tg(
          e,
          t,
          u,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Us(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Np(t, u) : uf(), kp(t);
      else
        return i = t.lanes = 536870912, Tg(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          i
        );
    } else
      u !== null ? (Us(t, u.cachePool), Np(t, u), ui(), t.memoizedState = null) : (e !== null && Us(t, null), uf(), ui());
    return In(e, t, s, l), t.child;
  }
  function Ha(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Tg(e, t, l, i, s) {
    var u = lf();
    return u = u === null ? null : { parent: gn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Us(t, null), uf(), kp(t), e !== null && Vr(e, t, i, !0), t.childLanes = s, null;
  }
  function nc(e, t) {
    return t = oc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Og(e, t, l) {
    return or(t, e.child, null, l), e = nc(t, t.pendingProps), e.flags |= 2, wl(t), t.memoizedState = null, e;
  }
  function WS(e, t, l) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (yt) {
        if (i.mode === "hidden")
          return e = nc(t, i), t.lanes = 536870912, Ha(null, e);
        if (df(t), (e = qt) ? (e = Gb(
          e,
          Gl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ni !== null ? { id: mo, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = hp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw oi(t);
        return t.lanes = 536870912, null;
      }
      return nc(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (df(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Og(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(a(558));
      else if (yn || Vr(e, t, l, !1), s = (l & e.childLanes) !== 0, yn || s) {
        if (i = Ut, i !== null && (p = rn(i, l), p !== 0 && p !== u.retryLane))
          throw u.retryLane = p, Zi(e, p), hl(i, e, p), zf;
        hc(), t = Og(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, qt = ql(p.nextSibling), Ln = t, yt = !0, li = null, Gl = !1, e !== null && gp(t, e), t = nc(t, i), t.flags |= 4096;
      return t;
    }
    return e = To(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function lc(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Df(e, t, l, i, s) {
    return er(t), l = mf(
      e,
      t,
      l,
      i,
      void 0,
      s
    ), i = pf(), e !== null && !yn ? (gf(e, t, s), jo(e, t, s)) : (yt && i && Fu(t), t.flags |= 1, In(e, t, l, s), t.child);
  }
  function Ng(e, t, l, i, s, u) {
    return er(t), t.updateQueue = null, l = Dp(
      t,
      i,
      l,
      s
    ), zp(e), i = pf(), e !== null && !yn ? (gf(e, t, u), jo(e, t, u)) : (yt && i && Fu(t), t.flags |= 1, In(e, t, l, u), t.child);
  }
  function kg(e, t, l, i, s) {
    if (er(t), t.stateNode === null) {
      var u = zr, p = l.contextType;
      typeof p == "object" && p !== null && (u = Vn(p)), u = new l(i, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Nf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = i, u.state = t.memoizedState, u.refs = {}, rf(t), p = l.contextType, u.context = typeof p == "object" && p !== null ? Vn(p) : zr, u.state = t.memoizedState, p = l.getDerivedStateFromProps, typeof p == "function" && (Of(
        t,
        l,
        p,
        i
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && Nf.enqueueReplaceState(u, u.state, null), Da(t, i, u, s), za(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, L = rr(l, E);
      u.props = L;
      var J = u.context, ue = l.contextType;
      p = zr, typeof ue == "object" && ue !== null && (p = Vn(ue));
      var me = l.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ue || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || J !== p) && yg(
        t,
        u,
        i,
        p
      ), ri = !1;
      var W = t.memoizedState;
      u.state = W, Da(t, i, u, s), za(), J = t.memoizedState, E || W !== J || ri ? (typeof me == "function" && (Of(
        t,
        l,
        me,
        i
      ), J = t.memoizedState), (L = ri || bg(
        t,
        l,
        L,
        i,
        W,
        J,
        p
      )) ? (ue || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = J), u.props = i, u.state = J, u.context = p, i = L) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      u = t.stateNode, af(e, t), p = t.memoizedProps, ue = rr(l, p), u.props = ue, me = t.pendingProps, W = u.context, J = l.contextType, L = zr, typeof J == "object" && J !== null && (L = Vn(J)), E = l.getDerivedStateFromProps, (J = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== me || W !== L) && yg(
        t,
        u,
        i,
        L
      ), ri = !1, W = t.memoizedState, u.state = W, Da(t, i, u, s), za();
      var ie = t.memoizedState;
      p !== me || W !== ie || ri || e !== null && e.dependencies !== null && Is(e.dependencies) ? (typeof E == "function" && (Of(
        t,
        l,
        E,
        i
      ), ie = t.memoizedState), (ue = ri || bg(
        t,
        l,
        ue,
        i,
        W,
        ie,
        L
      ) || e !== null && e.dependencies !== null && Is(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, ie, L), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        ie,
        L
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ie), u.props = i, u.state = ie, u.context = L, i = ue) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return u = i, lc(e, t), i = (t.flags & 128) !== 0, u || i ? (u = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && i ? (t.child = or(
      t,
      e.child,
      null,
      s
    ), t.child = or(
      t,
      null,
      l,
      s
    )) : In(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = jo(
      e,
      t,
      s
    ), e;
  }
  function zg(e, t, l, i) {
    return Ji(), t.flags |= 256, In(e, t, l, i), t.child;
  }
  var jf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lf(e) {
    return { baseLanes: e, cachePool: Ep() };
  }
  function Vf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Ml), e;
  }
  function Dg(e, t, l) {
    var i = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (un.current & 2) !== 0), p && (s = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (yt) {
        if (s ? ci(t) : ui(), (e = qt) ? (e = Gb(
          e,
          Gl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ni !== null ? { id: mo, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = hp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw oi(t);
        return vd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = i.children;
      return i = i.fallback, s ? (ui(), s = t.mode, E = oc(
        { mode: "hidden", children: E },
        s
      ), i = $i(
        i,
        s,
        l,
        null
      ), E.return = t, i.return = t, E.sibling = i, t.child = E, i = t.child, i.memoizedState = Lf(l), i.childLanes = Vf(
        e,
        p,
        l
      ), t.memoizedState = jf, Ha(null, i)) : (ci(t), If(t, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (u)
        t.flags & 256 ? (ci(t), t.flags &= -257, t = Hf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (ui(), t.child = e.child, t.flags |= 128, t = null) : (ui(), E = i.fallback, s = t.mode, i = oc(
          { mode: "visible", children: i.children },
          s
        ), E = $i(
          E,
          s,
          l,
          null
        ), E.flags |= 2, i.return = t, E.return = t, i.sibling = E, t.child = i, or(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = Lf(l), i.childLanes = Vf(
          e,
          p,
          l
        ), t.memoizedState = jf, t = Ha(null, i));
      else if (ci(t), vd(E)) {
        if (p = E.nextSibling && E.nextSibling.dataset, p) var J = p.dgst;
        p = J, i = Error(a(419)), i.stack = "", i.digest = p, Ma({ value: i, source: null, stack: null }), t = Hf(
          e,
          t,
          l
        );
      } else if (yn || Vr(e, t, l, !1), p = (l & e.childLanes) !== 0, yn || p) {
        if (p = Ut, p !== null && (i = rn(p, l), i !== 0 && i !== L.retryLane))
          throw L.retryLane = i, Zi(e, i), hl(p, e, i), zf;
        yd(E) || hc(), t = Hf(
          e,
          t,
          l
        );
      } else
        yd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, qt = ql(
          E.nextSibling
        ), Ln = t, yt = !0, li = null, Gl = !1, e !== null && gp(t, e), t = If(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ui(), E = i.fallback, s = t.mode, L = e.child, J = L.sibling, i = To(L, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = L.subtreeFlags & 65011712, J !== null ? E = To(
      J,
      E
    ) : (E = $i(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, i.return = t, i.sibling = E, t.child = i, Ha(null, i), i = t.child, E = e.child.memoizedState, E === null ? E = Lf(l) : (s = E.cachePool, s !== null ? (L = gn._currentValue, s = s.parent !== L ? { parent: L, pool: L } : s) : s = Ep(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: s
    }), i.memoizedState = E, i.childLanes = Vf(
      e,
      p,
      l
    ), t.memoizedState = jf, Ha(e.child, i)) : (ci(t), l = e.child, e = l.sibling, l = To(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function If(e, t) {
    return t = oc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function oc(e, t) {
    return e = Cl(22, e, null, t), e.lanes = 0, e;
  }
  function Hf(e, t, l) {
    return or(t, e.child, null, l), e = If(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function jg(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), Wu(e.return, t, l);
  }
  function Uf(e, t, l, i, s, u) {
    var p = e.memoizedState;
    p === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: l,
      tailMode: s,
      treeForkCount: u
    } : (p.isBackwards = t, p.rendering = null, p.renderingStartTime = 0, p.last = i, p.tail = l, p.tailMode = s, p.treeForkCount = u);
  }
  function Lg(e, t, l) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var p = un.current, E = (p & 2) !== 0;
    if (E ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, ne(un, p), In(e, t, i, l), i = yt ? _a : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && jg(e, l, t);
        else if (e.tag === 19)
          jg(e, l, t);
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
          e = l.alternate, e !== null && Xs(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Uf(
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
          if (e = s.alternate, e !== null && Xs(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        Uf(
          t,
          !0,
          l,
          null,
          u,
          i
        );
        break;
      case "together":
        Uf(
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
  function jo(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), hi |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Vr(
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
      for (e = t.child, l = To(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = To(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Bf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Is(e)));
  }
  function eE(e, t, l) {
    switch (t.tag) {
      case 3:
        Me(t, t.stateNode.containerInfo), ii(t, gn, e.memoizedState.cache), Ji();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        ii(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, df(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (ci(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Dg(e, t, l) : (ci(t), e = jo(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ci(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (i = (l & t.childLanes) !== 0, i || (Vr(
          e,
          t,
          l,
          !1
        ), i = (l & t.childLanes) !== 0), s) {
          if (i)
            return Lg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), ne(un, un.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, Ag(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ii(t, gn, e.memoizedState.cache);
    }
    return jo(e, t, l);
  }
  function Vg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        yn = !0;
      else {
        if (!Bf(e, l) && (t.flags & 128) === 0)
          return yn = !1, eE(
            e,
            t,
            l
          );
        yn = (e.flags & 131072) !== 0;
      }
    else
      yn = !1, yt && (t.flags & 1048576) !== 0 && pp(t, _a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = nr(t.elementType), t.type = e, typeof e == "function")
            Pu(e) ? (i = rr(e, i), t.tag = 1, t = kg(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = Df(
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
                t.tag = 11, t = wg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (s === B) {
                t.tag = 14, t = _g(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              }
            }
            throw t = he(e) || e, Error(a(306, t, ""));
          }
        }
        return t;
      case 0:
        return Df(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, s = rr(
          i,
          t.pendingProps
        ), kg(
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
          s = u.element, af(e, t), Da(t, i, null, l);
          var p = t.memoizedState;
          if (i = p.cache, ii(t, gn, i), i !== u.cache && ef(
            t,
            [gn],
            l,
            !0
          ), za(), i = p.element, u.isDehydrated)
            if (u = {
              element: i,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = zg(
                e,
                t,
                i,
                l
              );
              break e;
            } else if (i !== s) {
              s = Hl(
                Error(a(424)),
                t
              ), Ma(s), t = zg(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qt = ql(e.firstChild), Ln = t, yt = !0, li = null, Gl = !0, l = Ap(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ji(), i === s) {
              t = jo(
                e,
                t,
                l
              );
              break e;
            }
            In(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return lc(e, t), e === null ? (l = Fb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : yt || (l = t.type, e = t.pendingProps, i = xc(
          we.current
        ).createElement(l), i[Ct] = t, i[Rt] = e, Hn(i, l, e), en(i), t.stateNode = i) : t.memoizedState = Fb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && yt && (i = t.stateNode = Pb(
          t.type,
          t.pendingProps,
          we.current
        ), Ln = t, Gl = !0, s = qt, yi(t.type) ? (xd = s, qt = ql(i.firstChild)) : qt = s), In(
          e,
          t,
          t.pendingProps.children,
          l
        ), lc(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && yt && ((s = i = qt) && (i = OE(
          i,
          t.type,
          t.pendingProps,
          Gl
        ), i !== null ? (t.stateNode = i, Ln = t, qt = ql(i.firstChild), Gl = !1, s = !0) : s = !1), s || oi(t)), it(t), s = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, i = u.children, pd(s, u) ? i = null : p !== null && pd(s, p) && (t.flags |= 32), t.memoizedState !== null && (s = mf(
          e,
          t,
          PS,
          null,
          null,
          l
        ), es._currentValue = s), lc(e, t), In(e, t, i, l), t.child;
      case 6:
        return e === null && yt && ((e = l = qt) && (l = NE(
          l,
          t.pendingProps,
          Gl
        ), l !== null ? (t.stateNode = l, Ln = t, qt = null, e = !0) : e = !1), e || oi(t)), null;
      case 13:
        return Dg(e, t, l);
      case 4:
        return Me(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = or(
          t,
          null,
          i,
          l
        ) : In(e, t, i, l), t.child;
      case 11:
        return wg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return In(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return In(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return In(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, ii(t, t.type, i.value), In(e, t, i.children, l), t.child;
      case 9:
        return s = t.type._context, i = t.pendingProps.children, er(t), s = Vn(s), i = i(s), t.flags |= 1, In(e, t, i, l), t.child;
      case 14:
        return _g(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Mg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Lg(e, t, l);
      case 31:
        return WS(e, t, l);
      case 22:
        return Ag(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return er(t), i = Vn(gn), e === null ? (s = lf(), s === null && (s = Ut, u = tf(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: i, cache: s }, rf(t), ii(t, gn, s)) : ((e.lanes & l) !== 0 && (af(e, t), Da(t, null, null, l), za()), s = e.memoizedState, u = t.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), ii(t, gn, i)) : (i = u.cache, ii(t, gn, i), i !== s.cache && ef(
          t,
          [gn],
          l,
          !0
        ))), In(
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
  function Lo(e) {
    e.flags |= 4;
  }
  function Gf(e, t, l, i, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ub()) e.flags |= 8192;
        else
          throw lr = Gs, of;
    } else e.flags &= -16777217;
  }
  function Ig(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Wb(t))
      if (ub()) e.flags |= 8192;
      else
        throw lr = Gs, of;
  }
  function ic(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? _n() : 536870912, e.lanes |= t, Qr |= t);
  }
  function Ua(e, t) {
    if (!yt)
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
    switch (Qu(t), t.tag) {
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
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ko(gn), Te(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Lr(t) ? Lo(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, $u())), Pt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Lo(t), u !== null ? (Pt(t), Ig(t, u)) : (Pt(t), Gf(
          t,
          s,
          null,
          i,
          l
        ))) : u ? u !== e.memoizedState ? (Lo(t), Pt(t), Ig(t, u)) : (Pt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Lo(t), Pt(t), Gf(
          t,
          s,
          e,
          i,
          l
        )), null;
      case 27:
        if (pt(t), l = we.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Lo(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          e = oe.current, Lr(t) ? bp(t) : (e = Pb(s, i, l), t.stateNode = e, Lo(t));
        }
        return Pt(t), null;
      case 5:
        if (pt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Lo(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          if (u = oe.current, Lr(t))
            bp(t);
          else {
            var p = xc(
              we.current
            );
            switch (u) {
              case 1:
                u = p.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = p.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = p.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = p.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = p.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof i.is == "string" ? p.createElement("select", {
                      is: i.is
                    }) : p.createElement("select"), i.multiple ? u.multiple = !0 : i.size && (u.size = i.size);
                    break;
                  default:
                    u = typeof i.is == "string" ? p.createElement(s, { is: i.is }) : p.createElement(s);
                }
            }
            u[Ct] = t, u[Rt] = i;
            e: for (p = t.child; p !== null; ) {
              if (p.tag === 5 || p.tag === 6)
                u.appendChild(p.stateNode);
              else if (p.tag !== 4 && p.tag !== 27 && p.child !== null) {
                p.child.return = p, p = p.child;
                continue;
              }
              if (p === t) break e;
              for (; p.sibling === null; ) {
                if (p.return === null || p.return === t)
                  break e;
                p = p.return;
              }
              p.sibling.return = p.return, p = p.sibling;
            }
            t.stateNode = u;
            e: switch (Hn(u, s, i), s) {
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
            i && Lo(t);
          }
        }
        return Pt(t), Gf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Lo(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = we.current, Lr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, s = Ln, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            e[Ct] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || Db(e.nodeValue, l)), e || oi(t, !0);
          } else
            e = xc(e).createTextNode(
              i
            ), e[Ct] = t, t.stateNode = e;
        }
        return Pt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Lr(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(a(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[Ct] = t;
            } else
              Ji(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), e = !1;
          } else
            l = $u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (wl(t), t) : (wl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Pt(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Lr(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(a(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(a(317));
              s[Ct] = t;
            } else
              Ji(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), s = !1;
          } else
            s = $u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (wl(t), t) : (wl(t), null);
        }
        return wl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), u = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (u = i.memoizedState.cachePool.pool), u !== s && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), ic(t, t.updateQueue), Pt(t), null);
      case 4:
        return Te(), e === null && ud(t.stateNode.containerInfo), Pt(t), null;
      case 10:
        return ko(t.type), Pt(t), null;
      case 19:
        if (K(un), i = t.memoizedState, i === null) return Pt(t), null;
        if (s = (t.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) Ua(i, !1);
          else {
            if (ln !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Xs(e), u !== null) {
                  for (t.flags |= 128, Ua(i, !1), e = u.updateQueue, t.updateQueue = e, ic(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    dp(l, e), l = l.sibling;
                  return ne(
                    un,
                    un.current & 1 | 2
                  ), yt && Oo(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Q() > uc && (t.flags |= 128, s = !0, Ua(i, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Xs(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, ic(t, e), Ua(i, !0), i.tail === null && i.tailMode === "hidden" && !u.alternate && !yt)
                return Pt(t), null;
            } else
              2 * Q() - i.renderingStartTime > uc && l !== 536870912 && (t.flags |= 128, s = !0, Ua(i, !1), t.lanes = 4194304);
          i.isBackwards ? (u.sibling = t.child, t.child = u) : (e = i.last, e !== null ? e.sibling = u : t.child = u, i.last = u);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Q(), e.sibling = null, l = un.current, ne(
          un,
          s ? l & 1 | 2 : l & 1
        ), yt && Oo(t, i.treeForkCount), e) : (Pt(t), null);
      case 22:
      case 23:
        return wl(t), ff(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pt(t), l = t.updateQueue, l !== null && ic(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && K(tr), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ko(gn), Pt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function nE(e, t) {
    switch (Qu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ko(gn), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return pt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (wl(t), t.alternate === null)
            throw Error(a(340));
          Ji();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (wl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          Ji();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return K(un), null;
      case 4:
        return Te(), null;
      case 10:
        return ko(t.type), null;
      case 22:
      case 23:
        return wl(t), ff(), e !== null && K(tr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ko(gn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Hg(e, t) {
    switch (Qu(t), t.tag) {
      case 3:
        ko(gn), Te();
        break;
      case 26:
      case 27:
      case 5:
        pt(t);
        break;
      case 4:
        Te();
        break;
      case 31:
        t.memoizedState !== null && wl(t);
        break;
      case 13:
        wl(t);
        break;
      case 19:
        K(un);
        break;
      case 10:
        ko(t.type);
        break;
      case 22:
      case 23:
        wl(t), ff(), e !== null && K(tr);
        break;
      case 24:
        ko(gn);
    }
  }
  function Ba(e, t) {
    try {
      var l = t.updateQueue, i = l !== null ? l.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            i = void 0;
            var u = l.create, p = l.inst;
            i = u(), p.destroy = i;
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (E) {
      jt(t, t.return, E);
    }
  }
  function fi(e, t, l) {
    try {
      var i = t.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        i = u;
        do {
          if ((i.tag & e) === e) {
            var p = i.inst, E = p.destroy;
            if (E !== void 0) {
              p.destroy = void 0, s = t;
              var L = l, J = E;
              try {
                J();
              } catch (ue) {
                jt(
                  s,
                  L,
                  ue
                );
              }
            }
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (ue) {
      jt(t, t.return, ue);
    }
  }
  function Ug(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Op(t, l);
      } catch (i) {
        jt(e, e.return, i);
      }
    }
  }
  function Bg(e, t, l) {
    l.props = rr(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      jt(e, t, i);
    }
  }
  function Ga(e, t) {
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
      jt(e, t, s);
    }
  }
  function go(e, t) {
    var l = e.ref, i = e.refCleanup;
    if (l !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          jt(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (s) {
          jt(e, t, s);
        }
      else l.current = null;
  }
  function Gg(e) {
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
      jt(e, e.return, s);
    }
  }
  function Yf(e, t, l) {
    try {
      var i = e.stateNode;
      RE(i, e.type, l, t), i[Rt] = t;
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function Yg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && yi(e.type) || e.tag === 4;
  }
  function qf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Yg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && yi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Pf(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = $n));
    else if (i !== 4 && (i === 27 && yi(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Pf(e, t, l), e = e.sibling; e !== null; )
        Pf(e, t, l), e = e.sibling;
  }
  function rc(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && yi(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (rc(e, t, l), e = e.sibling; e !== null; )
        rc(e, t, l), e = e.sibling;
  }
  function qg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Hn(t, i, l), t[Ct] = e, t[Rt] = l;
    } catch (u) {
      jt(e, e.return, u);
    }
  }
  var Vo = !1, vn = !1, Xf = !1, Pg = typeof WeakSet == "function" ? WeakSet : Set, Tn = null;
  function lE(e, t) {
    if (e = e.containerInfo, hd = Mc, e = lp(e), Iu(e)) {
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
            var p = 0, E = -1, L = -1, J = 0, ue = 0, me = e, W = null;
            t: for (; ; ) {
              for (var ie; me !== l || s !== 0 && me.nodeType !== 3 || (E = p + s), me !== u || i !== 0 && me.nodeType !== 3 || (L = p + i), me.nodeType === 3 && (p += me.nodeValue.length), (ie = me.firstChild) !== null; )
                W = me, me = ie;
              for (; ; ) {
                if (me === e) break t;
                if (W === l && ++J === s && (E = p), W === u && ++ue === i && (L = p), (ie = me.nextSibling) !== null) break;
                me = W, W = me.parentNode;
              }
              me = ie;
            }
            l = E === -1 || L === -1 ? null : { start: E, end: L };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (md = { focusedElem: e, selectionRange: l }, Mc = !1, Tn = t; Tn !== null; )
      if (t = Tn, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Tn = e;
      else
        for (; Tn !== null; ) {
          switch (t = Tn, u = t.alternate, e = t.flags, t.tag) {
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
                  var Ve = rr(
                    l.type,
                    s
                  );
                  e = i.getSnapshotBeforeUpdate(
                    Ve,
                    u
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch ($e) {
                  jt(
                    l,
                    l.return,
                    $e
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  bd(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      bd(e);
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
            e.return = t.return, Tn = e;
            break;
          }
          Tn = t.return;
        }
  }
  function Xg(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ho(e, l), i & 4 && Ba(5, l);
        break;
      case 1:
        if (Ho(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              jt(l, l.return, p);
            }
          else {
            var s = rr(
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
            } catch (p) {
              jt(
                l,
                l.return,
                p
              );
            }
          }
        i & 64 && Ug(l), i & 512 && Ga(l, l.return);
        break;
      case 3:
        if (Ho(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
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
            Op(e, t);
          } catch (p) {
            jt(l, l.return, p);
          }
        }
        break;
      case 27:
        t === null && i & 4 && qg(l);
      case 26:
      case 5:
        Ho(e, l), t === null && i & 4 && Gg(l), i & 512 && Ga(l, l.return);
        break;
      case 12:
        Ho(e, l);
        break;
      case 31:
        Ho(e, l), i & 4 && Qg(e, l);
        break;
      case 13:
        Ho(e, l), i & 4 && Zg(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = dE.bind(
          null,
          l
        ), kE(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || Vo, !i) {
          t = t !== null && t.memoizedState !== null || vn, s = Vo;
          var u = vn;
          Vo = i, (vn = t) && !u ? Uo(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Ho(e, l), Vo = s, vn = u;
        }
        break;
      case 30:
        break;
      default:
        Ho(e, l);
    }
  }
  function Kg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Kg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && uo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, cl = !1;
  function Io(e, t, l) {
    for (l = l.child; l !== null; )
      Fg(e, t, l), l = l.sibling;
  }
  function Fg(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(kt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        vn || go(l, t), Io(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        vn || go(l, t);
        var i = Zt, s = cl;
        yi(l.type) && (Zt = l.stateNode, cl = !1), Io(
          e,
          t,
          l
        ), $a(l.stateNode), Zt = i, cl = s;
        break;
      case 5:
        vn || go(l, t);
      case 6:
        if (i = Zt, s = cl, Zt = null, Io(
          e,
          t,
          l
        ), Zt = i, cl = s, Zt !== null)
          if (cl)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(l.stateNode);
            } catch (u) {
              jt(
                l,
                t,
                u
              );
            }
          else
            try {
              Zt.removeChild(l.stateNode);
            } catch (u) {
              jt(
                l,
                t,
                u
              );
            }
        break;
      case 18:
        Zt !== null && (cl ? (e = Zt, Ub(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), la(e)) : Ub(Zt, l.stateNode));
        break;
      case 4:
        i = Zt, s = cl, Zt = l.stateNode.containerInfo, cl = !0, Io(
          e,
          t,
          l
        ), Zt = i, cl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        fi(2, l, t), vn || fi(4, l, t), Io(
          e,
          t,
          l
        );
        break;
      case 1:
        vn || (go(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && Bg(
          l,
          t,
          i
        )), Io(
          e,
          t,
          l
        );
        break;
      case 21:
        Io(
          e,
          t,
          l
        );
        break;
      case 22:
        vn = (i = vn) || l.memoizedState !== null, Io(
          e,
          t,
          l
        ), vn = i;
        break;
      default:
        Io(
          e,
          t,
          l
        );
    }
  }
  function Qg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        la(e);
      } catch (l) {
        jt(t, t.return, l);
      }
    }
  }
  function Zg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        la(e);
      } catch (l) {
        jt(t, t.return, l);
      }
  }
  function oE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Pg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Pg()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function ac(e, t) {
    var l = oE(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var s = hE.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function ul(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var i = 0; i < l.length; i++) {
        var s = l[i], u = e, p = t, E = p;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (yi(E.type)) {
                Zt = E.stateNode, cl = !1;
                break e;
              }
              break;
            case 5:
              Zt = E.stateNode, cl = !1;
              break e;
            case 3:
            case 4:
              Zt = E.stateNode.containerInfo, cl = !0;
              break e;
          }
          E = E.return;
        }
        if (Zt === null) throw Error(a(160));
        Fg(u, p, s), Zt = null, cl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        $g(t, e), t = t.sibling;
  }
  var oo = null;
  function $g(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(t, e), fl(e), i & 4 && (fi(3, e, e.return), Ba(3, e), fi(5, e, e.return));
        break;
      case 1:
        ul(t, e), fl(e), i & 512 && (vn || l === null || go(l, l.return)), i & 64 && Vo && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var s = oo;
        if (ul(t, e), fl(e), i & 512 && (vn || l === null || go(l, l.return)), i & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (i) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[Jl] || u[Ct] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(i), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Hn(u, i, l), u[Ct] = e, en(u), i = u;
                      break e;
                    case "link":
                      var p = $b(
                        "link",
                        "href",
                        s
                      ).get(i + (l.href || ""));
                      if (p) {
                        for (var E = 0; E < p.length; E++)
                          if (u = p[E], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            p.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(i), Hn(u, i, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (p = $b(
                        "meta",
                        "content",
                        s
                      ).get(i + (l.content || ""))) {
                        for (E = 0; E < p.length; E++)
                          if (u = p[E], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            p.splice(E, 1);
                            break t;
                          }
                      }
                      u = s.createElement(i), Hn(u, i, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(a(468, i));
                  }
                  u[Ct] = e, en(u), i = u;
                }
                e.stateNode = i;
              } else
                Jb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Zb(
                s,
                i,
                e.memoizedProps
              );
          else
            u !== i ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, i === null ? Jb(
              s,
              e.type,
              e.stateNode
            ) : Zb(
              s,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Yf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ul(t, e), fl(e), i & 512 && (vn || l === null || go(l, l.return)), l !== null && i & 4 && Yf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ul(t, e), fl(e), i & 512 && (vn || l === null || go(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Vl(s, "");
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        }
        i & 4 && e.stateNode != null && (s = e.memoizedProps, Yf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), i & 1024 && (Xf = !0);
        break;
      case 6:
        if (ul(t, e), fl(e), i & 4) {
          if (e.stateNode === null)
            throw Error(a(162));
          i = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = i;
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        }
        break;
      case 3:
        if (Cc = null, s = oo, oo = Sc(t.containerInfo), ul(t, e), oo = s, fl(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            la(t.containerInfo);
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        Xf && (Xf = !1, Jg(e));
        break;
      case 4:
        i = oo, oo = Sc(
          e.stateNode.containerInfo
        ), ul(t, e), fl(e), oo = i;
        break;
      case 12:
        ul(t, e), fl(e);
        break;
      case 31:
        ul(t, e), fl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ac(e, i)));
        break;
      case 13:
        ul(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (cc = Q()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ac(e, i)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var L = l !== null && l.memoizedState !== null, J = Vo, ue = vn;
        if (Vo = J || s, vn = ue || L, ul(t, e), vn = ue, Vo = J, fl(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || L || Vo || vn || ar(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                L = l = t;
                try {
                  if (u = L.stateNode, s)
                    p = u.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    E = L.stateNode;
                    var me = L.memoizedProps.style, W = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
                  }
                } catch (Ve) {
                  jt(L, L.return, Ve);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                L = t;
                try {
                  L.stateNode.nodeValue = s ? "" : L.memoizedProps;
                } catch (Ve) {
                  jt(L, L.return, Ve);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                L = t;
                try {
                  var ie = L.stateNode;
                  s ? Bb(ie, !0) : Bb(L.stateNode, !1);
                } catch (Ve) {
                  jt(L, L.return, Ve);
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
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, ac(e, l))));
        break;
      case 19:
        ul(t, e), fl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, ac(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ul(t, e), fl(e);
    }
  }
  function fl(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, i = e.return; i !== null; ) {
          if (Yg(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = qf(e);
            rc(e, u, s);
            break;
          case 5:
            var p = l.stateNode;
            l.flags & 32 && (Vl(p, ""), l.flags &= -33);
            var E = qf(e);
            rc(e, E, p);
            break;
          case 3:
          case 4:
            var L = l.stateNode.containerInfo, J = qf(e);
            Pf(
              e,
              J,
              L
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (ue) {
        jt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Jg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Jg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ho(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Xg(e, t.alternate, t), t = t.sibling;
  }
  function ar(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          fi(4, t, t.return), ar(t);
          break;
        case 1:
          go(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Bg(
            t,
            t.return,
            l
          ), ar(t);
          break;
        case 27:
          $a(t.stateNode);
        case 26:
        case 5:
          go(t, t.return), ar(t);
          break;
        case 22:
          t.memoizedState === null && ar(t);
          break;
        case 30:
          ar(t);
          break;
        default:
          ar(t);
      }
      e = e.sibling;
    }
  }
  function Uo(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, s = e, u = t, p = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Uo(
            s,
            u,
            l
          ), Ba(4, u);
          break;
        case 1:
          if (Uo(
            s,
            u,
            l
          ), i = u, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (J) {
              jt(i, i.return, J);
            }
          if (i = u, s = i.updateQueue, s !== null) {
            var E = i.stateNode;
            try {
              var L = s.shared.hiddenCallbacks;
              if (L !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < L.length; s++)
                  Tp(L[s], E);
            } catch (J) {
              jt(i, i.return, J);
            }
          }
          l && p & 64 && Ug(u), Ga(u, u.return);
          break;
        case 27:
          qg(u);
        case 26:
        case 5:
          Uo(
            s,
            u,
            l
          ), l && i === null && p & 4 && Gg(u), Ga(u, u.return);
          break;
        case 12:
          Uo(
            s,
            u,
            l
          );
          break;
        case 31:
          Uo(
            s,
            u,
            l
          ), l && p & 4 && Qg(s, u);
          break;
        case 13:
          Uo(
            s,
            u,
            l
          ), l && p & 4 && Zg(s, u);
          break;
        case 22:
          u.memoizedState === null && Uo(
            s,
            u,
            l
          ), Ga(u, u.return);
          break;
        case 30:
          break;
        default:
          Uo(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Kf(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Aa(l));
  }
  function Ff(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Aa(e));
  }
  function io(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Wg(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Wg(e, t, l, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        io(
          e,
          t,
          l,
          i
        ), s & 2048 && Ba(9, t);
        break;
      case 1:
        io(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        io(
          e,
          t,
          l,
          i
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Aa(e)));
        break;
      case 12:
        if (s & 2048) {
          io(
            e,
            t,
            l,
            i
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, p = u.id, E = u.onPostCommit;
            typeof E == "function" && E(
              p,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (L) {
            jt(t, t.return, L);
          }
        } else
          io(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        io(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        io(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, p = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? io(
          e,
          t,
          l,
          i
        ) : Ya(e, t) : u._visibility & 2 ? io(
          e,
          t,
          l,
          i
        ) : (u._visibility |= 2, Xr(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Kf(p, t);
        break;
      case 24:
        io(
          e,
          t,
          l,
          i
        ), s & 2048 && Ff(t.alternate, t);
        break;
      default:
        io(
          e,
          t,
          l,
          i
        );
    }
  }
  function Xr(e, t, l, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, p = t, E = l, L = i, J = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Xr(
            u,
            p,
            E,
            L,
            s
          ), Ba(8, p);
          break;
        case 23:
          break;
        case 22:
          var ue = p.stateNode;
          p.memoizedState !== null ? ue._visibility & 2 ? Xr(
            u,
            p,
            E,
            L,
            s
          ) : Ya(
            u,
            p
          ) : (ue._visibility |= 2, Xr(
            u,
            p,
            E,
            L,
            s
          )), s && J & 2048 && Kf(
            p.alternate,
            p
          );
          break;
        case 24:
          Xr(
            u,
            p,
            E,
            L,
            s
          ), s && J & 2048 && Ff(p.alternate, p);
          break;
        default:
          Xr(
            u,
            p,
            E,
            L,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Ya(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, s = i.flags;
        switch (i.tag) {
          case 22:
            Ya(l, i), s & 2048 && Kf(
              i.alternate,
              i
            );
            break;
          case 24:
            Ya(l, i), s & 2048 && Ff(i.alternate, i);
            break;
          default:
            Ya(l, i);
        }
        t = t.sibling;
      }
  }
  var qa = 8192;
  function Kr(e, t, l) {
    if (e.subtreeFlags & qa)
      for (e = e.child; e !== null; )
        eb(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function eb(e, t, l) {
    switch (e.tag) {
      case 26:
        Kr(
          e,
          t,
          l
        ), e.flags & qa && e.memoizedState !== null && qE(
          l,
          oo,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Kr(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = oo;
        oo = Sc(e.stateNode.containerInfo), Kr(
          e,
          t,
          l
        ), oo = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = qa, qa = 16777216, Kr(
          e,
          t,
          l
        ), qa = i) : Kr(
          e,
          t,
          l
        ));
        break;
      default:
        Kr(
          e,
          t,
          l
        );
    }
  }
  function tb(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Pa(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          Tn = i, lb(
            i,
            e
          );
        }
      tb(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        nb(e), e = e.sibling;
  }
  function nb(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pa(e), e.flags & 2048 && fi(9, e, e.return);
        break;
      case 3:
        Pa(e);
        break;
      case 12:
        Pa(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, sc(e)) : Pa(e);
        break;
      default:
        Pa(e);
    }
  }
  function sc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          Tn = i, lb(
            i,
            e
          );
        }
      tb(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          fi(8, t, t.return), sc(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, sc(t));
          break;
        default:
          sc(t);
      }
      e = e.sibling;
    }
  }
  function lb(e, t) {
    for (; Tn !== null; ) {
      var l = Tn;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          fi(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Aa(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, Tn = i;
      else
        e: for (l = e; Tn !== null; ) {
          i = Tn;
          var s = i.sibling, u = i.return;
          if (Kg(i), i === l) {
            Tn = null;
            break e;
          }
          if (s !== null) {
            s.return = u, Tn = s;
            break e;
          }
          Tn = u;
        }
    }
  }
  var iE = {
    getCacheForType: function(e) {
      var t = Vn(gn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Vn(gn).controller.signal;
    }
  }, rE = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Ut = null, ht = null, gt = 0, Dt = 0, _l = null, di = !1, Fr = !1, Qf = !1, Bo = 0, ln = 0, hi = 0, sr = 0, Zf = 0, Ml = 0, Qr = 0, Xa = null, dl = null, $f = !1, cc = 0, ob = 0, uc = 1 / 0, fc = null, mi = null, En = 0, pi = null, Zr = null, Go = 0, Jf = 0, Wf = null, ib = null, Ka = 0, ed = null;
  function Al() {
    return (Nt & 2) !== 0 && gt !== 0 ? gt & -gt : V.T !== null ? rd() : ll();
  }
  function rb() {
    if (Ml === 0)
      if ((gt & 536870912) === 0 || yt) {
        var e = Wt;
        Wt <<= 1, (Wt & 3932160) === 0 && (Wt = 262144), Ml = e;
      } else Ml = 536870912;
    return e = Rl.current, e !== null && (e.flags |= 32), Ml;
  }
  function hl(e, t, l) {
    (e === Ut && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null) && ($r(e, 0), gi(
      e,
      gt,
      Ml,
      !1
    )), nl(e, l), ((Nt & 2) === 0 || e !== Ut) && (e === Ut && ((Nt & 2) === 0 && (sr |= l), ln === 4 && gi(
      e,
      gt,
      Ml,
      !1
    )), bo(e));
  }
  function ab(e, t, l) {
    if ((Nt & 6) !== 0) throw Error(a(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Qt(e, t), s = i ? cE(e, t) : nd(e, t, !0), u = i;
    do {
      if (s === 0) {
        Fr && !i && gi(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !aE(l)) {
          s = nd(e, t, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var p = 0;
          else
            p = e.pendingLanes & -536870913, p = p !== 0 ? p : p & 536870912 ? 536870912 : 0;
          if (p !== 0) {
            t = p;
            e: {
              var E = e;
              s = Xa;
              var L = E.current.memoizedState.isDehydrated;
              if (L && ($r(E, p).flags |= 256), p = nd(
                E,
                p,
                !1
              ), p !== 2) {
                if (Qf && !L) {
                  E.errorRecoveryDisabledLanes |= u, sr |= u, s = 4;
                  break e;
                }
                u = dl, dl = s, u !== null && (dl === null ? dl = u : dl.push.apply(
                  dl,
                  u
                ));
              }
              s = p;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          $r(e, 0), gi(e, t, 0, !0);
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
              gi(
                i,
                t,
                Ml,
                !di
              );
              break e;
            case 2:
              dl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((t & 62914560) === t && (s = cc + 300 - Q(), 10 < s)) {
            if (gi(
              i,
              t,
              Ml,
              !di
            ), Ke(i, 0, !0) !== 0) break e;
            Go = t, i.timeoutHandle = Ib(
              sb.bind(
                null,
                i,
                l,
                dl,
                fc,
                $f,
                t,
                Ml,
                sr,
                Qr,
                di,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          sb(
            i,
            l,
            dl,
            fc,
            $f,
            t,
            Ml,
            sr,
            Qr,
            di,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    bo(e);
  }
  function sb(e, t, l, i, s, u, p, E, L, J, ue, me, W, ie) {
    if (e.timeoutHandle = -1, me = t.subtreeFlags, me & 8192 || (me & 16785408) === 16785408) {
      me = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: $n
      }, eb(
        t,
        u,
        me
      );
      var Ve = (u & 62914560) === u ? cc - Q() : (u & 4194048) === u ? ob - Q() : 0;
      if (Ve = PE(
        me,
        Ve
      ), Ve !== null) {
        Go = u, e.cancelPendingCommit = Ve(
          gb.bind(
            null,
            e,
            t,
            u,
            l,
            i,
            s,
            p,
            E,
            L,
            ue,
            me,
            null,
            W,
            ie
          )
        ), gi(e, u, p, !J);
        return;
      }
    }
    gb(
      e,
      t,
      u,
      l,
      i,
      s,
      p,
      E,
      L
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
            if (!El(u(), s)) return !1;
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
  function gi(e, t, l, i) {
    t &= ~Zf, t &= ~sr, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - st(s), p = 1 << u;
      i[u] = -1, s &= ~p;
    }
    l !== 0 && so(e, l, t);
  }
  function dc() {
    return (Nt & 6) === 0 ? (Fa(0), !1) : !0;
  }
  function td() {
    if (ht !== null) {
      if (Dt === 0)
        var e = ht.return;
      else
        e = ht, No = Wi = null, bf(e), Br = null, Oa = 0, e = ht;
      for (; e !== null; )
        Hg(e.alternate, e), e = e.return;
      ht = null;
    }
  }
  function $r(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, ME(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Go = 0, td(), Ut = e, ht = l = To(e.current, null), gt = t, Dt = 0, _l = null, di = !1, Fr = Qt(e, t), Qf = !1, Qr = Ml = Zf = sr = hi = ln = 0, dl = Xa = null, $f = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - st(i), u = 1 << s;
        t |= e[s], i &= ~u;
      }
    return Bo = t, zs(), l;
  }
  function cb(e, t) {
    rt = null, V.H = Ia, t === Ur || t === Bs ? (t = wp(), Dt = 3) : t === of ? (t = wp(), Dt = 4) : Dt = t === zf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, _l = t, ht === null && (ln = 1, tc(
      e,
      Hl(t, e.current)
    ));
  }
  function ub() {
    var e = Rl.current;
    return e === null ? !0 : (gt & 4194048) === gt ? Yl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? e === Yl : !1;
  }
  function fb() {
    var e = V.H;
    return V.H = Ia, e === null ? Ia : e;
  }
  function db() {
    var e = V.A;
    return V.A = iE, e;
  }
  function hc() {
    ln = 4, di || (gt & 4194048) !== gt && Rl.current !== null || (Fr = !0), (hi & 134217727) === 0 && (sr & 134217727) === 0 || Ut === null || gi(
      Ut,
      gt,
      Ml,
      !1
    );
  }
  function nd(e, t, l) {
    var i = Nt;
    Nt |= 2;
    var s = fb(), u = db();
    (Ut !== e || gt !== t) && (fc = null, $r(e, t)), t = !1;
    var p = ln;
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          var E = ht, L = _l;
          switch (Dt) {
            case 8:
              td(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Rl.current === null && (t = !0);
              var J = Dt;
              if (Dt = 0, _l = null, Jr(e, E, L, J), l && Fr) {
                p = 0;
                break e;
              }
              break;
            default:
              J = Dt, Dt = 0, _l = null, Jr(e, E, L, J);
          }
        }
        sE(), p = ln;
        break;
      } catch (ue) {
        cb(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, No = Wi = null, Nt = i, V.H = s, V.A = u, ht === null && (Ut = null, gt = 0, zs()), p;
  }
  function sE() {
    for (; ht !== null; ) hb(ht);
  }
  function cE(e, t) {
    var l = Nt;
    Nt |= 2;
    var i = fb(), s = db();
    Ut !== e || gt !== t ? (fc = null, uc = Q() + 500, $r(e, t)) : Fr = Qt(
      e,
      t
    );
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          t = ht;
          var u = _l;
          t: switch (Dt) {
            case 1:
              Dt = 0, _l = null, Jr(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Cp(u)) {
                Dt = 0, _l = null, mb(t);
                break;
              }
              t = function() {
                Dt !== 2 && Dt !== 9 || Ut !== e || (Dt = 7), bo(e);
              }, u.then(t, t);
              break e;
            case 3:
              Dt = 7;
              break e;
            case 4:
              Dt = 5;
              break e;
            case 7:
              Cp(u) ? (Dt = 0, _l = null, mb(t)) : (Dt = 0, _l = null, Jr(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (ht.tag) {
                case 26:
                  p = ht.memoizedState;
                case 5:
                case 27:
                  var E = ht;
                  if (p ? Wb(p) : E.stateNode.complete) {
                    Dt = 0, _l = null;
                    var L = E.sibling;
                    if (L !== null) ht = L;
                    else {
                      var J = E.return;
                      J !== null ? (ht = J, mc(J)) : ht = null;
                    }
                    break t;
                  }
              }
              Dt = 0, _l = null, Jr(e, t, u, 5);
              break;
            case 6:
              Dt = 0, _l = null, Jr(e, t, u, 6);
              break;
            case 8:
              td(), ln = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        uE();
        break;
      } catch (ue) {
        cb(e, ue);
      }
    while (!0);
    return No = Wi = null, V.H = i, V.A = s, Nt = l, ht !== null ? 0 : (Ut = null, gt = 0, zs(), ln);
  }
  function uE() {
    for (; ht !== null && !Xe(); )
      hb(ht);
  }
  function hb(e) {
    var t = Vg(e.alternate, e, Bo);
    e.memoizedProps = e.pendingProps, t === null ? mc(e) : ht = t;
  }
  function mb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ng(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          gt
        );
        break;
      case 11:
        t = Ng(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          gt
        );
        break;
      case 5:
        bf(t);
      default:
        Hg(l, t), t = ht = dp(t, Bo), t = Vg(l, t, Bo);
    }
    e.memoizedProps = e.pendingProps, t === null ? mc(e) : ht = t;
  }
  function Jr(e, t, l, i) {
    No = Wi = null, bf(t), Br = null, Oa = 0;
    var s = t.return;
    try {
      if (JS(
        e,
        s,
        t,
        l,
        gt
      )) {
        ln = 1, tc(
          e,
          Hl(l, e.current)
        ), ht = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw ht = s, u;
      ln = 1, tc(
        e,
        Hl(l, e.current)
      ), ht = null;
      return;
    }
    t.flags & 32768 ? (yt || i === 1 ? e = !0 : Fr || (gt & 536870912) !== 0 ? e = !1 : (di = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Rl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), pb(t, e)) : mc(t);
  }
  function mc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        pb(
          t,
          di
        );
        return;
      }
      e = t.return;
      var l = tE(
        t.alternate,
        t,
        Bo
      );
      if (l !== null) {
        ht = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ht = t;
        return;
      }
      ht = t = e;
    } while (t !== null);
    ln === 0 && (ln = 5);
  }
  function pb(e, t) {
    do {
      var l = nE(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ht = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ht = e;
        return;
      }
      ht = e = l;
    } while (e !== null);
    ln = 6, ht = null;
  }
  function gb(e, t, l, i, s, u, p, E, L) {
    e.cancelPendingCommit = null;
    do
      pc();
    while (En !== 0);
    if ((Nt & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (u = t.lanes | t.childLanes, u |= Yu, zt(
        e,
        l,
        u,
        p,
        E,
        L
      ), e === Ut && (ht = Ut = null, gt = 0), Zr = t, pi = e, Go = l, Jf = u, Wf = s, ib = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, mE(Ge, function() {
        return Sb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null, s = H.p, H.p = 2, p = Nt, Nt |= 4;
        try {
          lE(e, t, l);
        } finally {
          Nt = p, H.p = s, V.T = i;
        }
      }
      En = 1, bb(), yb(), vb();
    }
  }
  function bb() {
    if (En === 1) {
      En = 0;
      var e = pi, t = Zr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = Nt;
        Nt |= 4;
        try {
          $g(t, e);
          var u = md, p = lp(e.containerInfo), E = u.focusedElem, L = u.selectionRange;
          if (p !== E && E && E.ownerDocument && np(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && Iu(E)) {
              var J = L.start, ue = L.end;
              if (ue === void 0 && (ue = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, W = me && me.defaultView || window;
                if (W.getSelection) {
                  var ie = W.getSelection(), Ve = E.textContent.length, $e = Math.min(L.start, Ve), It = L.end === void 0 ? $e : Math.min(L.end, Ve);
                  !ie.extend && $e > It && (p = It, It = $e, $e = p);
                  var X = tp(
                    E,
                    $e
                  ), G = tp(
                    E,
                    It
                  );
                  if (X && G && (ie.rangeCount !== 1 || ie.anchorNode !== X.node || ie.anchorOffset !== X.offset || ie.focusNode !== G.node || ie.focusOffset !== G.offset)) {
                    var $ = me.createRange();
                    $.setStart(X.node, X.offset), ie.removeAllRanges(), $e > It ? (ie.addRange($), ie.extend(G.node, G.offset)) : ($.setEnd(G.node, G.offset), ie.addRange($));
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
              var de = me[E];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          Mc = !!hd, md = hd = null;
        } finally {
          Nt = s, H.p = i, V.T = l;
        }
      }
      e.current = t, En = 2;
    }
  }
  function yb() {
    if (En === 2) {
      En = 0;
      var e = pi, t = Zr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = Nt;
        Nt |= 4;
        try {
          Xg(e, t.alternate, t);
        } finally {
          Nt = s, H.p = i, V.T = l;
        }
      }
      En = 3;
    }
  }
  function vb() {
    if (En === 4 || En === 3) {
      En = 0, ye();
      var e = pi, t = Zr, l = Go, i = ib;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? En = 5 : (En = 0, Zr = pi = null, xb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (mi = null), jl(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            kt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = V.T, s = H.p, H.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, p = 0; p < i.length; p++) {
            var E = i[p];
            u(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          V.T = t, H.p = s;
        }
      }
      (Go & 3) !== 0 && pc(), bo(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === ed ? Ka++ : (Ka = 0, ed = e) : Ka = 0, Fa(0);
    }
  }
  function xb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Aa(t)));
  }
  function pc() {
    return bb(), yb(), vb(), Sb();
  }
  function Sb() {
    if (En !== 5) return !1;
    var e = pi, t = Jf;
    Jf = 0;
    var l = jl(Go), i = V.T, s = H.p;
    try {
      H.p = 32 > l ? 32 : l, V.T = null, l = Wf, Wf = null;
      var u = pi, p = Go;
      if (En = 0, Zr = pi = null, Go = 0, (Nt & 6) !== 0) throw Error(a(331));
      var E = Nt;
      if (Nt |= 4, nb(u.current), Wg(
        u,
        u.current,
        p,
        l
      ), Nt = E, Fa(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(kt, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = s, V.T = i, xb(e, t);
    }
  }
  function Eb(e, t, l) {
    t = Hl(l, t), t = kf(e.stateNode, t, 2), e = si(e, t, 2), e !== null && (nl(e, 2), bo(e));
  }
  function jt(e, t, l) {
    if (e.tag === 3)
      Eb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Eb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (mi === null || !mi.has(i))) {
            e = Hl(l, e), l = Cg(2), i = si(t, l, 2), i !== null && (Rg(
              l,
              i,
              t,
              e
            ), nl(i, 2), bo(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function ld(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new rE();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(l) || (Qf = !0, s.add(l), e = fE.bind(null, e, t, l), t.then(e, e));
  }
  function fE(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (gt & l) === l && (ln === 4 || ln === 3 && (gt & 62914560) === gt && 300 > Q() - cc ? (Nt & 2) === 0 && $r(e, 0) : Zf |= l, Qr === gt && (Qr = 0)), bo(e);
  }
  function Cb(e, t) {
    t === 0 && (t = _n()), e = Zi(e, t), e !== null && (nl(e, t), bo(e));
  }
  function dE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Cb(e, l);
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
    i !== null && i.delete(t), Cb(e, l);
  }
  function mE(e, t) {
    return We(e, t);
  }
  var gc = null, Wr = null, od = !1, bc = !1, id = !1, bi = 0;
  function bo(e) {
    e !== Wr && e.next === null && (Wr === null ? gc = Wr = e : Wr = Wr.next = e), bc = !0, od || (od = !0, gE());
  }
  function Fa(e, t) {
    if (!id && bc) {
      id = !0;
      do
        for (var l = !1, i = gc; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var p = i.suspendedLanes, E = i.pingedLanes;
              u = (1 << 31 - st(42 | e) + 1) - 1, u &= s & ~(p & ~E), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Mb(i, u));
          } else
            u = gt, u = Ke(
              i,
              i === Ut ? u : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (u & 3) === 0 || Qt(i, u) || (l = !0, Mb(i, u));
          i = i.next;
        }
      while (l);
      id = !1;
    }
  }
  function pE() {
    Rb();
  }
  function Rb() {
    bc = od = !1;
    var e = 0;
    bi !== 0 && _E() && (e = bi);
    for (var t = Q(), l = null, i = gc; i !== null; ) {
      var s = i.next, u = wb(i, t);
      u === 0 ? (i.next = null, l === null ? gc = s : l.next = s, s === null && (Wr = l)) : (l = i, (e !== 0 || (u & 3) !== 0) && (bc = !0)), i = s;
    }
    En !== 0 && En !== 5 || Fa(e), bi !== 0 && (bi = 0);
  }
  function wb(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var p = 31 - st(u), E = 1 << p, L = s[p];
      L === -1 ? ((E & l) === 0 || (E & i) !== 0) && (s[p] = wn(E, t)) : L <= t && (e.expiredLanes |= E), u &= ~E;
    }
    if (t = Ut, l = gt, l = Ke(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, l === 0 || e === t && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && tt(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Qt(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (i !== null && tt(i), jl(l)) {
        case 2:
        case 8:
          l = Ce;
          break;
        case 32:
          l = Ge;
          break;
        case 268435456:
          l = Tt;
          break;
        default:
          l = Ge;
      }
      return i = _b.bind(null, e), l = We(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && tt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function _b(e, t) {
    if (En !== 0 && En !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (pc() && e.callbackNode !== l)
      return null;
    var i = gt;
    return i = Ke(
      e,
      e === Ut ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (ab(e, i, t), wb(e, Q()), e.callbackNode != null && e.callbackNode === l ? _b.bind(null, e) : null);
  }
  function Mb(e, t) {
    if (pc()) return null;
    ab(e, t, !0);
  }
  function gE() {
    AE(function() {
      (Nt & 6) !== 0 ? We(
        He,
        pE
      ) : Rb();
    });
  }
  function rd() {
    if (bi === 0) {
      var e = Ir;
      e === 0 && (e = Ft, Ft <<= 1, (Ft & 261888) === 0 && (Ft = 256)), bi = e;
    }
    return bi;
  }
  function Ab(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : no("" + e);
  }
  function Tb(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function bE(e, t, l, i, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Ab(
        (s[Rt] || null).action
      ), p = i.submitter;
      p && (t = (t = p[Rt] || null) ? Ab(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
      var E = new Sn(
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
                if (bi !== 0) {
                  var L = p ? Tb(s, p) : new FormData(s);
                  _f(
                    l,
                    {
                      pending: !0,
                      data: L,
                      method: s.method,
                      action: u
                    },
                    null,
                    L
                  );
                }
              } else
                typeof u == "function" && (E.preventDefault(), L = p ? Tb(s, p) : new FormData(s), _f(
                  l,
                  {
                    pending: !0,
                    data: L,
                    method: s.method,
                    action: u
                  },
                  u,
                  L
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var ad = 0; ad < Gu.length; ad++) {
    var sd = Gu[ad], yE = sd.toLowerCase(), vE = sd[0].toUpperCase() + sd.slice(1);
    lo(
      yE,
      "on" + vE
    );
  }
  lo(rp, "onAnimationEnd"), lo(ap, "onAnimationIteration"), lo(sp, "onAnimationStart"), lo("dblclick", "onDoubleClick"), lo("focusin", "onFocus"), lo("focusout", "onBlur"), lo(jS, "onTransitionRun"), lo(LS, "onTransitionStart"), lo(VS, "onTransitionCancel"), lo(cp, "onTransitionEnd"), vl("onMouseEnter", ["mouseout", "mouseover"]), vl("onMouseLeave", ["mouseout", "mouseover"]), vl("onPointerEnter", ["pointerout", "pointerover"]), vl("onPointerLeave", ["pointerout", "pointerover"]), Wl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Wl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Wl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Wl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Wl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Wl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Qa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qa)
  );
  function Ob(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], s = i.event;
      i = i.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var p = i.length - 1; 0 <= p; p--) {
            var E = i[p], L = E.instance, J = E.currentTarget;
            if (E = E.listener, L !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              ks(ue);
            }
            s.currentTarget = null, u = L;
          }
        else
          for (p = 0; p < i.length; p++) {
            if (E = i[p], L = E.instance, J = E.currentTarget, E = E.listener, L !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              ks(ue);
            }
            s.currentTarget = null, u = L;
          }
      }
    }
  }
  function mt(e, t) {
    var l = t[Gn];
    l === void 0 && (l = t[Gn] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    l.has(i) || (Nb(t, e, 2, !1), l.add(i));
  }
  function cd(e, t, l) {
    var i = 0;
    t && (i |= 4), Nb(
      l,
      e,
      i,
      t
    );
  }
  var yc = "_reactListening" + Math.random().toString(36).slice(2);
  function ud(e) {
    if (!e[yc]) {
      e[yc] = !0, mn.forEach(function(l) {
        l !== "selectionchange" && (xE.has(l) || cd(l, !1, e), cd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yc] || (t[yc] = !0, cd("selectionchange", !1, t));
    }
  }
  function Nb(e, t, l, i) {
    switch (ry(t)) {
      case 2:
        var s = FE;
        break;
      case 8:
        s = QE;
        break;
      default:
        s = wd;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !Se || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), i ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function fd(e, t, l, i, s) {
    var u = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var p = i.tag;
        if (p === 3 || p === 4) {
          var E = i.stateNode.containerInfo;
          if (E === s) break;
          if (p === 4)
            for (p = i.return; p !== null; ) {
              var L = p.tag;
              if ((L === 3 || L === 4) && p.stateNode.containerInfo === s)
                return;
              p = p.return;
            }
          for (; E !== null; ) {
            if (p = Yn(E), p === null) return;
            if (L = p.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              i = u = p;
              continue e;
            }
            E = E.parentNode;
          }
        }
        i = i.return;
      }
    ge(function() {
      var J = u, ue = N(l), me = [];
      e: {
        var W = up.get(e);
        if (W !== void 0) {
          var ie = Sn, Ve = e;
          switch (e) {
            case "keypress":
              if (Ht(l) === 0) break e;
            case "keydown":
            case "keyup":
              ie = hS;
              break;
            case "focusin":
              Ve = "focus", ie = zu;
              break;
            case "focusout":
              Ve = "blur", ie = zu;
              break;
            case "beforeblur":
            case "afterblur":
              ie = zu;
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
              ie = xa;
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
            case rp:
            case ap:
            case sp:
              ie = oS;
              break;
            case cp:
              ie = yS;
              break;
            case "scroll":
            case "scrollend":
              ie = fo;
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
              ie = Bm;
              break;
            case "toggle":
            case "beforetoggle":
              ie = ES;
          }
          var $e = (t & 4) !== 0, It = !$e && (e === "scroll" || e === "scrollend"), X = $e ? W !== null ? W + "Capture" : null : W;
          $e = [];
          for (var G = J, $; G !== null; ) {
            var de = G;
            if ($ = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || $ === null || X === null || (de = Y(G, X), de != null && $e.push(
              Za(G, de, $)
            )), It) break;
            G = G.return;
          }
          0 < $e.length && (W = new ie(
            W,
            Ve,
            null,
            l,
            ue
          ), me.push({ event: W, listeners: $e }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (W = e === "mouseover" || e === "pointerover", ie = e === "mouseout" || e === "pointerout", W && l !== R && (Ve = l.relatedTarget || l.fromElement) && (Yn(Ve) || Ve[Ye]))
            break e;
          if ((ie || W) && (W = ue.window === ue ? ue : (W = ue.ownerDocument) ? W.defaultView || W.parentWindow : window, ie ? (Ve = l.relatedTarget || l.toElement, ie = J, Ve = Ve ? Yn(Ve) : null, Ve !== null && (It = f(Ve), $e = Ve.tag, Ve !== It || $e !== 5 && $e !== 27 && $e !== 6) && (Ve = null)) : (ie = null, Ve = J), ie !== Ve)) {
            if ($e = xa, de = "onMouseLeave", X = "onMouseEnter", G = "mouse", (e === "pointerout" || e === "pointerover") && ($e = Bm, de = "onPointerLeave", X = "onPointerEnter", G = "pointer"), It = ie == null ? W : ol(ie), $ = Ve == null ? W : ol(Ve), W = new $e(
              de,
              G + "leave",
              ie,
              l,
              ue
            ), W.target = It, W.relatedTarget = $, de = null, Yn(ue) === J && ($e = new $e(
              X,
              G + "enter",
              Ve,
              l,
              ue
            ), $e.target = $, $e.relatedTarget = It, de = $e), It = de, ie && Ve)
              t: {
                for ($e = SE, X = ie, G = Ve, $ = 0, de = X; de; de = $e(de))
                  $++;
                de = 0;
                for (var Pe = G; Pe; Pe = $e(Pe))
                  de++;
                for (; 0 < $ - de; )
                  X = $e(X), $--;
                for (; 0 < de - $; )
                  G = $e(G), de--;
                for (; $--; ) {
                  if (X === G || G !== null && X === G.alternate) {
                    $e = X;
                    break t;
                  }
                  X = $e(X), G = $e(G);
                }
                $e = null;
              }
            else $e = null;
            ie !== null && kb(
              me,
              W,
              ie,
              $e,
              !1
            ), Ve !== null && It !== null && kb(
              me,
              It,
              Ve,
              $e,
              !0
            );
          }
        }
        e: {
          if (W = J ? ol(J) : window, ie = W.nodeName && W.nodeName.toLowerCase(), ie === "select" || ie === "input" && W.type === "file")
            var _t = Qm;
          else if (Km(W))
            if (Zm)
              _t = kS;
            else {
              _t = OS;
              var Be = TS;
            }
          else
            ie = W.nodeName, !ie || ie.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && sl(J.elementType) && (_t = Qm) : _t = NS;
          if (_t && (_t = _t(e, J))) {
            Fm(
              me,
              _t,
              l,
              ue
            );
            break e;
          }
          Be && Be(e, W, J), e === "focusout" && J && W.type === "number" && J.memoizedProps.value != null && ei(W, "number", W.value);
        }
        switch (Be = J ? ol(J) : window, e) {
          case "focusin":
            (Km(Be) || Be.contentEditable === "true") && (Or = Be, Hu = J, wa = null);
            break;
          case "focusout":
            wa = Hu = Or = null;
            break;
          case "mousedown":
            Uu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uu = !1, op(me, l, ue);
            break;
          case "selectionchange":
            if (DS) break;
          case "keydown":
          case "keyup":
            op(me, l, ue);
        }
        var ct;
        if (ju)
          e: {
            switch (e) {
              case "compositionstart":
                var bt = "onCompositionStart";
                break e;
              case "compositionend":
                bt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                bt = "onCompositionUpdate";
                break e;
            }
            bt = void 0;
          }
        else
          Tr ? Pm(e, l) && (bt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (bt = "onCompositionStart");
        bt && (Gm && l.locale !== "ko" && (Tr || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && Tr && (ct = wt()) : (Ie = ue, Ne = "value" in Ie ? Ie.value : Ie.textContent, Tr = !0)), Be = vc(J, bt), 0 < Be.length && (bt = new Um(
          bt,
          e,
          null,
          l,
          ue
        ), me.push({ event: bt, listeners: Be }), ct ? bt.data = ct : (ct = Xm(l), ct !== null && (bt.data = ct)))), (ct = RS ? wS(e, l) : _S(e, l)) && (bt = vc(J, "onBeforeInput"), 0 < bt.length && (Be = new Um(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), me.push({
          event: Be,
          listeners: bt
        }), Be.data = ct)), bE(
          me,
          e,
          J,
          l,
          ue
        );
      }
      Ob(me, t);
    });
  }
  function Za(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function vc(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Y(e, l), s != null && i.unshift(
        Za(e, s, u)
      ), s = Y(e, t), s != null && i.push(
        Za(e, s, u)
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
  function kb(e, t, l, i, s) {
    for (var u = t._reactName, p = []; l !== null && l !== i; ) {
      var E = l, L = E.alternate, J = E.stateNode;
      if (E = E.tag, L !== null && L === i) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (L = J, s ? (J = Y(l, u), J != null && p.unshift(
        Za(l, J, L)
      )) : s || (J = Y(l, u), J != null && p.push(
        Za(l, J, L)
      ))), l = l.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var EE = /\r\n?/g, CE = /\u0000|\uFFFD/g;
  function zb(e) {
    return (typeof e == "string" ? e : "" + e).replace(EE, `
`).replace(CE, "");
  }
  function Db(e, t) {
    return t = zb(t), zb(e) === t;
  }
  function Vt(e, t, l, i, s, u) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || Vl(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && Vl(e, "" + i);
        break;
      case "className":
        Wo(e, "class", i);
        break;
      case "tabIndex":
        Wo(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Wo(e, l, i);
        break;
      case "style":
        cn(e, i, u);
        break;
      case "data":
        if (t !== "object") {
          Wo(e, "data", i);
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
        i = no("" + i), e.setAttribute(l, i);
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
          typeof u == "function" && (l === "formAction" ? (t !== "input" && Vt(e, t, "name", s.name, s, null), Vt(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Vt(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Vt(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Vt(e, t, "encType", s.encType, s, null), Vt(e, t, "method", s.method, s, null), Vt(e, t, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(l);
          break;
        }
        i = no("" + i), e.setAttribute(l, i);
        break;
      case "onClick":
        i != null && (e.onclick = $n);
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
        l = no("" + i), e.setAttributeNS(
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
        mt("beforetoggle", e), mt("toggle", e), eo(e, "popover", i);
        break;
      case "xlinkActuate":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        eo(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = to.get(l) || l, eo(e, l, i));
    }
  }
  function dd(e, t, l, i, s, u) {
    switch (l) {
      case "style":
        cn(e, i, u);
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
        typeof i == "string" ? Vl(e, i) : (typeof i == "number" || typeof i == "bigint") && Vl(e, "" + i);
        break;
      case "onScroll":
        i != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        i != null && mt("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = $n);
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
        if (!Mn.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof i == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, s);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : eo(e, l, i);
          }
    }
  }
  function Hn(e, t, l) {
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
            var p = l[u];
            if (p != null)
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
                  Vt(e, t, u, p, l, null);
              }
          }
        s && Vt(e, t, "srcSet", l.srcSet, l, null), i && Vt(e, t, "src", l.src, l, null);
        return;
      case "input":
        mt("invalid", e);
        var E = u = p = s = null, L = null, J = null;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var ue = l[i];
            if (ue != null)
              switch (i) {
                case "name":
                  s = ue;
                  break;
                case "type":
                  p = ue;
                  break;
                case "checked":
                  L = ue;
                  break;
                case "defaultChecked":
                  J = ue;
                  break;
                case "value":
                  u = ue;
                  break;
                case "defaultValue":
                  E = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(a(137, t));
                  break;
                default:
                  Vt(e, t, i, ue, l, null);
              }
          }
        Ar(
          e,
          u,
          E,
          L,
          J,
          p,
          s,
          !1
        );
        return;
      case "select":
        mt("invalid", e), i = p = u = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (E = l[s], E != null))
            switch (s) {
              case "value":
                u = E;
                break;
              case "defaultValue":
                p = E;
                break;
              case "multiple":
                i = E;
              default:
                Vt(e, t, s, E, l, null);
            }
        t = u, l = p, e.multiple = !!i, t != null ? xl(e, !!i, t, !1) : l != null && xl(e, !!i, l, !0);
        return;
      case "textarea":
        mt("invalid", e), u = s = i = null;
        for (p in l)
          if (l.hasOwnProperty(p) && (E = l[p], E != null))
            switch (p) {
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
                Vt(e, t, p, E, l, null);
            }
        Mo(e, i, s, u);
        return;
      case "option":
        for (L in l)
          l.hasOwnProperty(L) && (i = l[L], i != null) && (L === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Vt(e, t, L, i, l, null));
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
        for (i = 0; i < Qa.length; i++)
          mt(Qa[i], e);
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
                Vt(e, t, J, i, l, null);
            }
        return;
      default:
        if (sl(t)) {
          for (ue in l)
            l.hasOwnProperty(ue) && (i = l[ue], i !== void 0 && dd(
              e,
              t,
              ue,
              i,
              l,
              void 0
            ));
          return;
        }
    }
    for (E in l)
      l.hasOwnProperty(E) && (i = l[E], i != null && Vt(e, t, E, i, l, null));
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
        var s = null, u = null, p = null, E = null, L = null, J = null, ue = null;
        for (ie in l) {
          var me = l[ie];
          if (l.hasOwnProperty(ie) && me != null)
            switch (ie) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = me;
              default:
                i.hasOwnProperty(ie) || Vt(e, t, ie, null, i, me);
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
                ue = ie;
                break;
              case "value":
                p = ie;
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
                ie !== me && Vt(
                  e,
                  t,
                  W,
                  ie,
                  i,
                  me
                );
            }
        }
        Pi(
          e,
          p,
          E,
          L,
          J,
          ue,
          u,
          s
        );
        return;
      case "select":
        ie = p = E = W = null;
        for (u in l)
          if (L = l[u], l.hasOwnProperty(u) && L != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                ie = L;
              default:
                i.hasOwnProperty(u) || Vt(
                  e,
                  t,
                  u,
                  null,
                  i,
                  L
                );
            }
        for (s in i)
          if (u = i[s], L = l[s], i.hasOwnProperty(s) && (u != null || L != null))
            switch (s) {
              case "value":
                W = u;
                break;
              case "defaultValue":
                E = u;
                break;
              case "multiple":
                p = u;
              default:
                u !== L && Vt(
                  e,
                  t,
                  s,
                  u,
                  i,
                  L
                );
            }
        t = E, l = p, i = ie, W != null ? xl(e, !!l, W, !1) : !!i != !!l && (t != null ? xl(e, !!l, t, !0) : xl(e, !!l, l ? [] : "", !1));
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
                Vt(e, t, E, null, i, s);
            }
        for (p in i)
          if (s = i[p], u = l[p], i.hasOwnProperty(p) && (s != null || u != null))
            switch (p) {
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
                s !== u && Vt(e, t, p, s, i, u);
            }
        Xi(e, W, ie);
        return;
      case "option":
        for (var Ve in l)
          W = l[Ve], l.hasOwnProperty(Ve) && W != null && !i.hasOwnProperty(Ve) && (Ve === "selected" ? e.selected = !1 : Vt(
            e,
            t,
            Ve,
            null,
            i,
            W
          ));
        for (L in i)
          W = i[L], ie = l[L], i.hasOwnProperty(L) && W !== ie && (W != null || ie != null) && (L === "selected" ? e.selected = W && typeof W != "function" && typeof W != "symbol" : Vt(
            e,
            t,
            L,
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
        for (var $e in l)
          W = l[$e], l.hasOwnProperty($e) && W != null && !i.hasOwnProperty($e) && Vt(e, t, $e, null, i, W);
        for (J in i)
          if (W = i[J], ie = l[J], i.hasOwnProperty(J) && W !== ie && (W != null || ie != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(a(137, t));
                break;
              default:
                Vt(
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
        if (sl(t)) {
          for (var It in l)
            W = l[It], l.hasOwnProperty(It) && W !== void 0 && !i.hasOwnProperty(It) && dd(
              e,
              t,
              It,
              void 0,
              i,
              W
            );
          for (ue in i)
            W = i[ue], ie = l[ue], !i.hasOwnProperty(ue) || W === ie || W === void 0 && ie === void 0 || dd(
              e,
              t,
              ue,
              W,
              i,
              ie
            );
          return;
        }
    }
    for (var X in l)
      W = l[X], l.hasOwnProperty(X) && W != null && !i.hasOwnProperty(X) && Vt(e, t, X, null, i, W);
    for (me in i)
      W = i[me], ie = l[me], !i.hasOwnProperty(me) || W === ie || W == null && ie == null || Vt(e, t, me, W, i, ie);
  }
  function jb(e) {
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
        var s = l[i], u = s.transferSize, p = s.initiatorType, E = s.duration;
        if (u && E && jb(p)) {
          for (p = 0, E = s.responseEnd, i += 1; i < l.length; i++) {
            var L = l[i], J = L.startTime;
            if (J > E) break;
            var ue = L.transferSize, me = L.initiatorType;
            ue && jb(me) && (L = L.responseEnd, p += ue * (L < E ? 1 : (E - J) / (L - J)));
          }
          if (--i, t += 8 * (u + p) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hd = null, md = null;
  function xc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Lb(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Vb(e, t) {
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
  function pd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var gd = null;
  function _E() {
    var e = window.event;
    return e && e.type === "popstate" ? e === gd ? !1 : (gd = e, !0) : (gd = null, !1);
  }
  var Ib = typeof setTimeout == "function" ? setTimeout : void 0, ME = typeof clearTimeout == "function" ? clearTimeout : void 0, Hb = typeof Promise == "function" ? Promise : void 0, AE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hb < "u" ? function(e) {
    return Hb.resolve(null).then(e).catch(TE);
  } : Ib;
  function TE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function yi(e) {
    return e === "head";
  }
  function Ub(e, t) {
    var l = t, i = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(s), la(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          $a(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, $a(l);
          for (var u = l.firstChild; u; ) {
            var p = u.nextSibling, E = u.nodeName;
            u[Jl] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = p;
          }
        } else
          l === "body" && $a(e.ownerDocument.body);
      l = s;
    } while (l);
    la(t);
  }
  function Bb(e, t) {
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
  function bd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          bd(l), uo(l);
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
        if (!e[Jl])
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
      if (e = ql(e.nextSibling), e === null) break;
    }
    return null;
  }
  function NE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = ql(e.nextSibling), e === null)) return null;
    return e;
  }
  function Gb(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = ql(e.nextSibling), e === null)) return null;
    return e;
  }
  function yd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function vd(e) {
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
  function ql(e) {
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
  var xd = null;
  function Yb(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return ql(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function qb(e) {
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
  function Pb(e, t, l) {
    switch (t = xc(l), e) {
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
  function $a(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    uo(e);
  }
  var Pl = /* @__PURE__ */ new Map(), Xb = /* @__PURE__ */ new Set();
  function Sc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Yo = H.d;
  H.d = {
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
    var e = Yo.f(), t = dc();
    return e || t;
  }
  function DE(e) {
    var t = Ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? cg(t) : Yo.r(e);
  }
  var ea = typeof document > "u" ? null : document;
  function Kb(e, t, l) {
    var i = ea;
    if (i && typeof t == "string" && t) {
      var s = An(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Xb.has(s) || (Xb.add(s), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), Hn(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function jE(e) {
    Yo.D(e), Kb("dns-prefetch", e, null);
  }
  function LE(e, t) {
    Yo.C(e, t), Kb("preconnect", e, t);
  }
  function VE(e, t, l) {
    Yo.L(e, t, l);
    var i = ea;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + An(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + An(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + An(
        l.imageSizes
      ) + '"]')) : s += '[href="' + An(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = ta(e);
          break;
        case "script":
          u = na(e);
      }
      Pl.has(u) || (e = v(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Pl.set(u, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Ja(u)) || t === "script" && i.querySelector(Wa(u)) || (t = i.createElement("link"), Hn(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function IE(e, t) {
    Yo.m(e, t);
    var l = ea;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + An(i) + '"][href="' + An(e) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = na(e);
      }
      if (!Pl.has(u) && (e = v({ rel: "modulepreload", href: e }, t), Pl.set(u, e), l.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Wa(u)))
              return;
        }
        i = l.createElement("link"), Hn(i, "link", e), en(i), l.head.appendChild(i);
      }
    }
  }
  function HE(e, t, l) {
    Yo.S(e, t, l);
    var i = ea;
    if (i && e) {
      var s = il(i).hoistableStyles, u = ta(e);
      t = t || "default";
      var p = s.get(u);
      if (!p) {
        var E = { loading: 0, preload: null };
        if (p = i.querySelector(
          Ja(u)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Pl.get(u)) && Sd(e, l);
          var L = p = i.createElement("link");
          en(L), Hn(L, "link", e), L._p = new Promise(function(J, ue) {
            L.onload = J, L.onerror = ue;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, Ec(p, t, i);
        }
        p = {
          type: "stylesheet",
          instance: p,
          count: 1,
          state: E
        }, s.set(u, p);
      }
    }
  }
  function UE(e, t) {
    Yo.X(e, t);
    var l = ea;
    if (l && e) {
      var i = il(l).hoistableScripts, s = na(e), u = i.get(s);
      u || (u = l.querySelector(Wa(s)), u || (e = v({ src: e, async: !0 }, t), (t = Pl.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function BE(e, t) {
    Yo.M(e, t);
    var l = ea;
    if (l && e) {
      var i = il(l).hoistableScripts, s = na(e), u = i.get(s);
      u || (u = l.querySelector(Wa(s)), u || (e = v({ src: e, async: !0, type: "module" }, t), (t = Pl.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function Fb(e, t, l, i) {
    var s = (s = we.current) ? Sc(s) : null;
    if (!s) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = ta(l.href), l = il(
          s
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = ta(l.href);
          var u = il(
            s
          ).hoistableStyles, p = u.get(e);
          if (p || (s = s.ownerDocument || s, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, p), (u = s.querySelector(
            Ja(e)
          )) && !u._p && (p.instance = u, p.state.loading = 5), Pl.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Pl.set(e, l), u || GE(
            s,
            e,
            l,
            p.state
          ))), t && i === null)
            throw Error(a(528, ""));
          return p;
        }
        if (t && i !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = na(l), l = il(
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
  function ta(e) {
    return 'href="' + An(e) + '"';
  }
  function Ja(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Qb(e) {
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
    }), Hn(t, "link", l), en(t), e.head.appendChild(t));
  }
  function na(e) {
    return '[src="' + An(e) + '"]';
  }
  function Wa(e) {
    return "script[async]" + e;
  }
  function Zb(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + An(l.href) + '"]'
          );
          if (i)
            return t.instance = i, en(i), i;
          var s = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), en(i), Hn(i, "style", s), Ec(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          s = ta(l.href);
          var u = e.querySelector(
            Ja(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, en(u), u;
          i = Qb(l), (s = Pl.get(s)) && Sd(i, s), u = (e.ownerDocument || e).createElement("link"), en(u);
          var p = u;
          return p._p = new Promise(function(E, L) {
            p.onload = E, p.onerror = L;
          }), Hn(u, "link", i), t.state.loading |= 4, Ec(u, l.precedence, e), t.instance = u;
        case "script":
          return u = na(l.src), (s = e.querySelector(
            Wa(u)
          )) ? (t.instance = s, en(s), s) : (i = l, (s = Pl.get(u)) && (i = v({}, l), Ed(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), en(s), Hn(s, "link", i), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Ec(i, l.precedence, e));
    return t.instance;
  }
  function Ec(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, u = s, p = 0; p < i.length; p++) {
      var E = i[p];
      if (E.dataset.precedence === t) u = E;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Sd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ed(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Cc = null;
  function $b(e, t, l) {
    if (Cc === null) {
      var i = /* @__PURE__ */ new Map(), s = Cc = /* @__PURE__ */ new Map();
      s.set(l, i);
    } else
      s = Cc, i = s.get(l), i || (i = /* @__PURE__ */ new Map(), s.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[Jl] || u[Ct] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = u.getAttribute(t) || "";
        p = e + p;
        var E = i.get(p);
        E ? E.push(u) : i.set(p, [u]);
      }
    }
    return i;
  }
  function Jb(e, t, l) {
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
  function Wb(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qE(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = ta(i.href), u = t.querySelector(
          Ja(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Rc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, en(u);
          return;
        }
        u = t.ownerDocument || t, i = Qb(i), (s = Pl.get(s)) && Sd(i, s), u = u.createElement("link"), en(u);
        var p = u;
        p._p = new Promise(function(E, L) {
          p.onload = E, p.onerror = L;
        }), Hn(u, "link", i), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Rc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Cd = 0;
  function PE(e, t) {
    return e.stylesheets && e.count === 0 && _c(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && _c(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Cd === 0 && (Cd = 62500 * wE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && _c(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Cd ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function Rc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _c(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var wc = null;
  function _c(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, wc = /* @__PURE__ */ new Map(), t.forEach(XE, e), wc = null, Rc.call(e));
  }
  function XE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = wc.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), wc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var p = s[u];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (l.set(p.dataset.precedence, p), i = p);
        }
        i && l.set(null, i);
      }
      s = t.instance, p = s.getAttribute("data-precedence"), u = l.get(p) || i, u === i && l.set(null, s), l.set(p, s), this.count++, i = Rc.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var es = {
    $$typeof: _,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function KE(e, t, l, i, s, u, p, E, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yt(0), this.hiddenUpdates = Yt(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ey(e, t, l, i, s, u, p, E, L, J, ue, me) {
    return e = new KE(
      e,
      t,
      l,
      p,
      L,
      J,
      ue,
      me,
      E
    ), t = 1, u === !0 && (t |= 24), u = Cl(3, null, null, t), e.current = u, u.stateNode = e, t = tf(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, rf(u), e;
  }
  function ty(e) {
    return e ? (e = zr, e) : zr;
  }
  function ny(e, t, l, i, s, u) {
    s = ty(s), i.context === null ? i.context = s : i.pendingContext = s, i = ai(t), i.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (i.callback = u), l = si(e, i, t), l !== null && (hl(l, e, t), ka(l, e, t));
  }
  function ly(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rd(e, t) {
    ly(e, t), (e = e.alternate) && ly(e, t);
  }
  function oy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Zi(e, 67108864);
      t !== null && hl(t, e, 67108864), Rd(e, 67108864);
    }
  }
  function iy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Al();
      t = co(t);
      var l = Zi(e, t);
      l !== null && hl(l, e, t), Rd(e, t);
    }
  }
  var Mc = !0;
  function FE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 2, wd(e, t, l, i);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function QE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 8, wd(e, t, l, i);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function wd(e, t, l, i) {
    if (Mc) {
      var s = _d(i);
      if (s === null)
        fd(
          e,
          t,
          i,
          Ac,
          l
        ), ay(e, i);
      else if ($E(
        s,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (ay(e, i), t & 4 && -1 < ZE.indexOf(e)) {
        for (; s !== null; ) {
          var u = Ll(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var p = ut(u.pendingLanes);
                  if (p !== 0) {
                    var E = u;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; p; ) {
                      var L = 1 << 31 - st(p);
                      E.entanglements[1] |= L, p &= ~L;
                    }
                    bo(u), (Nt & 6) === 0 && (uc = Q() + 500, Fa(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = Zi(u, 2), E !== null && hl(E, u, 2), dc(), Rd(u, 2);
            }
          if (u = _d(i), u === null && fd(
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
        fd(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function _d(e) {
    return e = N(e), Md(e);
  }
  var Ac = null;
  function Md(e) {
    if (Ac = null, e = Yn(e), e !== null) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = d(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = m(t), e !== null) return e;
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
  function ry(e) {
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
        switch (ce()) {
          case He:
            return 2;
          case Ce:
            return 8;
          case Ge:
          case nt:
            return 32;
          case Tt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ad = !1, vi = null, xi = null, Si = null, ts = /* @__PURE__ */ new Map(), ns = /* @__PURE__ */ new Map(), Ei = [], ZE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ay(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        vi = null;
        break;
      case "dragenter":
      case "dragleave":
        xi = null;
        break;
      case "mouseover":
      case "mouseout":
        Si = null;
        break;
      case "pointerover":
      case "pointerout":
        ts.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ns.delete(t.pointerId);
    }
  }
  function ls(e, t, l, i, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = Ll(t), t !== null && oy(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function $E(e, t, l, i, s) {
    switch (t) {
      case "focusin":
        return vi = ls(
          vi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "dragenter":
        return xi = ls(
          xi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "mouseover":
        return Si = ls(
          Si,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return ts.set(
          u,
          ls(
            ts.get(u) || null,
            e,
            t,
            l,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, ns.set(
          u,
          ls(
            ns.get(u) || null,
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
  function sy(e) {
    var t = Yn(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, wo(e.priority, function() {
              iy(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, wo(e.priority, function() {
              iy(l);
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
  function Tc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = _d(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        R = i, l.target.dispatchEvent(i), R = null;
      } else
        return t = Ll(l), t !== null && oy(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function cy(e, t, l) {
    Tc(e) && l.delete(t);
  }
  function JE() {
    Ad = !1, vi !== null && Tc(vi) && (vi = null), xi !== null && Tc(xi) && (xi = null), Si !== null && Tc(Si) && (Si = null), ts.forEach(cy), ns.forEach(cy);
  }
  function Oc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ad || (Ad = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      JE
    )));
  }
  var Nc = null;
  function uy(e) {
    Nc !== e && (Nc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Nc === e && (Nc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (Md(i || l) === null)
              continue;
            break;
          }
          var u = Ll(l);
          u !== null && (e.splice(t, 3), t -= 3, _f(
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
  function la(e) {
    function t(L) {
      return Oc(L, e);
    }
    vi !== null && Oc(vi, e), xi !== null && Oc(xi, e), Si !== null && Oc(Si, e), ts.forEach(t), ns.forEach(t);
    for (var l = 0; l < Ei.length; l++) {
      var i = Ei[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ei.length && (l = Ei[0], l.blockedOn === null); )
      sy(l), l.blockedOn === null && Ei.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var s = l[i], u = l[i + 1], p = s[Rt] || null;
        if (typeof u == "function")
          p || uy(l);
        else if (p) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, p = u[Rt] || null)
              E = p.formAction;
            else if (Md(s) !== null) continue;
          } else E = p.action;
          typeof E == "function" ? l[i + 1] = E : (l.splice(i, 3), i -= 3), uy(l);
        }
      }
  }
  function fy() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(p) {
            return s = p;
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
  function Td(e) {
    this._internalRoot = e;
  }
  kc.prototype.render = Td.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var l = t.current, i = Al();
    ny(l, i, e, t, null, null);
  }, kc.prototype.unmount = Td.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ny(e.current, 2, null, e, null, null), dc(), t[Ye] = null;
    }
  };
  function kc(e) {
    this._internalRoot = e;
  }
  kc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ll();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Ei.length && t !== 0 && t < Ei[l].priority; l++) ;
      Ei.splice(l, 0, e), l === 0 && sy(e);
    }
  };
  var dy = o.version;
  if (dy !== "19.2.8")
    throw Error(
      a(
        527,
        dy,
        "19.2.8"
      )
    );
  H.findDOMNode = function(e) {
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
    var zc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!zc.isDisabled && zc.supportsFiber)
      try {
        kt = zc.inject(
          WE
        ), xt = zc;
      } catch {
      }
  }
  return is.createRoot = function(e, t) {
    if (!c(e)) throw Error(a(299));
    var l = !1, i = "", s = vg, u = xg, p = Sg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = ey(
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
      p,
      fy
    ), e[Ye] = t.current, ud(e), new Td(t);
  }, is.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(a(299));
    var i = !1, s = "", u = vg, p = xg, E = Sg, L = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (p = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (L = l.formState)), t = ey(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      s,
      L,
      u,
      p,
      E,
      fy
    ), t.context = ty(null), l = t.current, i = Al(), i = co(i), s = ai(i), s.callback = null, si(l, s, i), l = i, t.current.lanes = l, nl(t, l), bo(t), e[Ye] = t.current, ud(e), new kc(t);
  }, is.version = "19.2.8", is;
}
var wy;
function uC() {
  if (wy) return kd.exports;
  wy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), kd.exports = cC(), kd.exports;
}
var fC = uC(), b = Ss();
const dC = /* @__PURE__ */ nC(b), Er = /* @__PURE__ */ tC({
  __proto__: null,
  default: dC
}, [b]);
function _y(n) {
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
  const [o, r] = b.useState(() => _y(n));
  return b.useEffect(() => {
    if (!n) return;
    const a = () => r(_y(n));
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
function Kv(n) {
  var o, r, a = "";
  if (typeof n == "string" || typeof n == "number") a += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Kv(n[o])) && (a && (a += " "), a += r);
  } else for (r in n) n[r] && (a && (a += " "), a += r);
  return a;
}
function Fv() {
  for (var n, o, r = 0, a = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Kv(n)) && (a && (a += " "), a += o);
  return a;
}
const mC = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n[a];
  for (let a = 0; a < o.length; a++)
    r[n.length + a] = o[a];
  return r;
}, pC = (n, o) => ({
  classGroupId: n,
  validator: o
}), Qv = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), $c = "-", My = [], gC = "arbitrary..", bC = (n) => {
  const o = vC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: a
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return yC(d);
      const m = d.split($c), g = m[0] === "" && m.length > 1 ? 1 : 0;
      return Zv(m, g, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const g = a[d], h = r[d];
        return g ? h ? mC(h, g) : g : h || My;
      }
      return r[d] || My;
    }
  };
}, Zv = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = Zv(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join($c) : n.slice(o).join($c), g = d.length;
  for (let h = 0; h < g; h++) {
    const y = d[h];
    if (y.validator(m))
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
  const r = Qv();
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
  const a = n === "" ? o : $v(o, n);
  a.classGroupId = r;
}, CC = (n, o, r, a) => {
  if (wC(n)) {
    Bh(n(a), o, r, a);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(pC(r, n));
}, RC = (n, o, r, a) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, g] = c[d];
    Bh(g, $v(o, m), r, a);
  }
}, $v = (n, o) => {
  let r = n;
  const a = o.split($c), c = a.length;
  for (let f = 0; f < c; f++) {
    const d = a[f];
    let m = r.nextPart.get(d);
    m || (m = Qv(), r.nextPart.set(d, m)), r = m;
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
}, gh = "!", Ay = ":", MC = [], Ty = (n, o, r, a, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: a,
  isExternal: c
}), AC = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let a = (c) => {
    const f = [];
    let d = 0, m = 0, g = 0, h;
    const y = c.length;
    for (let A = 0; A < y; A++) {
      const O = c[A];
      if (d === 0 && m === 0) {
        if (O === Ay) {
          f.push(c.slice(g, A)), g = A + 1;
          continue;
        }
        if (O === "/") {
          h = A;
          continue;
        }
      }
      O === "[" ? d++ : O === "]" ? d-- : O === "(" ? m++ : O === ")" && m--;
    }
    const v = f.length === 0 ? c : c.slice(g);
    let S = v, C = !1;
    v.endsWith(gh) ? (S = v.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(gh) && (S = v.slice(1), C = !0)
    );
    const w = h && h > g ? h - g : void 0;
    return Ty(f, C, S, w);
  };
  if (o) {
    const c = o + Ay, f = a;
    a = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Ty(MC, !1, d, void 0, !0);
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
      const d = r[f], m = d[0] === "[", g = o.has(d);
      m || g ? (c.length > 0 && (c.sort(), a.push(...c), c = []), a.push(d)) : c.push(d);
    }
    return c.length > 0 && (c.sort(), a.push(...c)), a;
  };
}, OC = (n) => ({
  cache: _C(n.cacheSize),
  parseClassName: AC(n),
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
  } = o, m = [], g = n.trim().split(kC);
  let h = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const v = g[y], {
      isExternal: S,
      modifiers: C,
      hasImportantModifier: w,
      baseClassName: A,
      maybePostfixModifierPosition: O
    } = r(v);
    if (S) {
      h = v + (h.length > 0 ? " " + h : h);
      continue;
    }
    let M = !!O, T;
    if (M) {
      const B = A.substring(0, O);
      T = a(B);
      const j = T && d[T] ? a(A) : void 0;
      j && j !== T && (T = j, M = !1);
    } else
      T = a(A);
    if (!T) {
      if (!M) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (T = a(A), !T) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      M = !1;
    }
    const _ = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), k = w ? _ + gh : _, I = k + T;
    if (m.indexOf(I) > -1)
      continue;
    m.push(I);
    const q = c(T, M);
    for (let B = 0; B < q.length; ++B) {
      const j = q[B];
      m.push(k + j);
    }
    h = v + (h.length > 0 ? " " + h : h);
  }
  return h;
}, DC = (...n) => {
  let o = 0, r, a, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (a = Jv(r)) && (c && (c += " "), c += a);
  return c;
}, Jv = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let a = 0; a < n.length; a++)
    n[a] && (o = Jv(n[a])) && (r && (r += " "), r += o);
  return r;
}, jC = (n, ...o) => {
  let r, a, c, f;
  const d = (g) => {
    const h = o.reduce((y, v) => v(y), n());
    return r = OC(h), a = r.cache.get, c = r.cache.set, f = m, m(g);
  }, m = (g) => {
    const h = a(g);
    if (h)
      return h;
    const y = zC(g, r);
    return c(g, y), y;
  };
  return f = d, (...g) => f(DC(...g));
}, LC = [], Cn = (n) => {
  const o = (r) => r[n] || LC;
  return o.isThemeGetter = !0, o;
}, Wv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, e0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, VC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, IC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, HC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, UC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, BC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, GC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ri = (n) => VC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), yo = (n) => !!n && Number.isInteger(Number(n)), Vd = (n) => n.endsWith("%") && ft(n.slice(0, -1)), qo = (n) => IC.test(n), t0 = () => !0, YC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  HC.test(n) && !UC.test(n)
), Gh = () => !1, qC = (n) => BC.test(n), PC = (n) => GC.test(n), XC = (n) => !De(n) && !je(n), KC = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), FC = (n) => Hi(n, o0, Gh), De = (n) => Wv.test(n), cr = (n) => Hi(n, i0, YC), Oy = (n) => Hi(n, nR, ft), QC = (n) => Hi(n, a0, t0), ZC = (n) => Hi(n, r0, Gh), Ny = (n) => Hi(n, n0, Gh), $C = (n) => Hi(n, l0, PC), Dc = (n) => Hi(n, s0, qC), je = (n) => e0.test(n), rs = (n) => Cr(n, i0), JC = (n) => Cr(n, r0), ky = (n) => Cr(n, n0), WC = (n) => Cr(n, o0), eR = (n) => Cr(n, l0), jc = (n) => Cr(n, s0, !0), tR = (n) => Cr(n, a0, !0), Hi = (n, o, r) => {
  const a = Wv.exec(n);
  return a ? a[1] ? o(a[1]) : r(a[2]) : !1;
}, Cr = (n, o, r = !1) => {
  const a = e0.exec(n);
  return a ? a[1] ? o(a[1]) : r : !1;
}, n0 = (n) => n === "position" || n === "percentage", l0 = (n) => n === "image" || n === "url", o0 = (n) => n === "length" || n === "size" || n === "bg-size", i0 = (n) => n === "length", nR = (n) => n === "number", r0 = (n) => n === "family-name", a0 = (n) => n === "number" || n === "weight", s0 = (n) => n === "shadow", lR = () => {
  const n = Cn("color"), o = Cn("font"), r = Cn("text"), a = Cn("font-weight"), c = Cn("tracking"), f = Cn("leading"), d = Cn("breakpoint"), m = Cn("container"), g = Cn("spacing"), h = Cn("radius"), y = Cn("shadow"), v = Cn("inset-shadow"), S = Cn("text-shadow"), C = Cn("drop-shadow"), w = Cn("blur"), A = Cn("perspective"), O = Cn("aspect"), M = Cn("ease"), T = Cn("animate"), _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
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
  ], I = () => [...k(), je, De], q = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", "contain", "none"], j = () => [je, De, g], P = () => [Ri, "full", "auto", ...j()], te = () => [yo, "none", "subgrid", je, De], se = () => ["auto", {
    span: ["full", yo, je, De]
  }, yo, je, De], fe = () => [yo, "auto", je, De], le = () => ["auto", "min", "max", "fr", je, De], he = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...j()], H = () => [Ri, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...j()], F = () => [Ri, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...j()], ve = () => [Ri, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...j()], ae = () => [n, je, De], z = () => [...k(), ky, Ny, {
    position: [je, De]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", WC, FC, {
    size: [je, De]
  }], oe = () => [Vd, rs, cr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    je,
    De
  ], we = () => ["", ft, rs, cr], qe = () => ["solid", "dashed", "dotted", "double"], Me = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Te = () => [ft, Vd, ky, Ny], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    je,
    De
  ], pt = () => ["none", ft, je, De], ze = () => ["none", ft, je, De], et = () => [ft, je, De], ke = () => [Ri, "full", ...j()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [qo],
      breakpoint: [qo],
      color: [t0],
      container: [qo],
      "drop-shadow": [qo],
      ease: ["in", "out", "in-out"],
      font: [XC],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [qo],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [qo],
      shadow: [qo],
      spacing: ["px", ft],
      text: [qo],
      "text-shadow": [qo],
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
        aspect: ["auto", "square", Ri, De, je, O]
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
        "@container": ["", "normal", "size", je, De]
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
        columns: [ft, De, je, m]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": _()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": _()
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
        object: I()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: q()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": q()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": q()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: B()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": B()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": B()
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
        inset: P()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": P()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": P()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": P(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: P()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": P(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: P()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": P()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": P()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: P()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: P()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: P()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: P()
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
        z: [yo, "auto", je, De]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ri, "full", "auto", m, ...j()]
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
        flex: [ft, Ri, "auto", "initial", "none", De]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ft, je, De]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ft, je, De]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [yo, "first", "last", "none", je, De]
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
        "col-start": fe()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": fe()
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
        "row-start": fe()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": fe()
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
        gap: j()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": j()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": j()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...he(), "normal"]
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
        content: ["normal", ...he()]
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
        "place-content": he()
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
        p: j()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: j()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: j()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: j()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: j()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: j()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: j()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: j()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: j()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: j()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: j()
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
        "space-x": j()
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
        "space-y": j()
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
        size: H()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...F()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...F()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...F()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...ve()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...ve()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...ve()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [m, "screen", ...H()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          m,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...H()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          m,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [d]
          },
          ...H()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...H()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...H()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...H()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, rs, cr]
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
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Vd, De]
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
        "font-features": [De]
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
        tracking: [c, je, De]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ft, "none", je, Oy]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...j()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", je, De]
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
        list: ["disc", "decimal", "none", je, De]
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
        decoration: [ft, "from-font", "auto", je, cr]
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
        "underline-offset": [ft, "auto", je, De]
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
        indent: j()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [yo, je, De]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", je, De]
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
        content: ["none", je, De]
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
        bg: K()
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
          }, yo, je, De],
          radial: ["", je, De],
          conic: [yo, je, De]
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
        rounded: pe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": pe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": pe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": pe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": pe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": pe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": pe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": pe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": pe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": pe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": pe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": pe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": pe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": pe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": pe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: we()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": we()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": we()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": we()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": we()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": we()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": we()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": we()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": we()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": we()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": we()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": we()
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
        "divide-y": we()
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
        "outline-offset": [ft, je, De]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ft, rs, cr]
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
          jc,
          Dc
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
        "inset-shadow": ["none", v, jc, Dc]
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
        ring: we()
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
        "ring-offset": [ft, cr]
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
        "inset-ring": we()
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
        "text-shadow": ["none", S, jc, Dc]
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
        opacity: [ft, je, De]
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
        "mask-radial": [je, De]
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
        mask: K()
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
        mask: ["none", je, De]
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
          je,
          De
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
        brightness: [ft, je, De]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ft, je, De]
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
          jc,
          Dc
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
        grayscale: ["", ft, je, De]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ft, je, De]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ft, je, De]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ft, je, De]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ft, je, De]
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
          je,
          De
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
        "backdrop-brightness": [ft, je, De]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ft, je, De]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ft, je, De]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ft, je, De]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ft, je, De]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ft, je, De]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ft, je, De]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ft, je, De]
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
        "border-spacing": j()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": j()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": j()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", je, De]
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
        duration: [ft, "initial", je, De]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", M, je, De]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ft, je, De]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", T, je, De]
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
        perspective: [A, je, De]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": I()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: pt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": pt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": pt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": pt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ze()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ze()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ze()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ze()
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
        transform: [je, De, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: I()
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
        translate: ke()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ke()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ke()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ke()
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
        zoom: [yo, je, De]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", je, De]
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
        "scroll-m": j()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": j()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": j()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": j()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": j()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": j()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": j()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": j()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": j()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": j()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": j()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": j()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": j()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": j()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": j()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": j()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": j()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": j()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": j()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": j()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": j()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": j()
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
        "will-change": ["auto", "scroll", "contents", "transform", je, De]
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
        stroke: [ft, rs, cr, Oy]
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
function Je(...n) {
  return oR(Fv(n));
}
const c0 = (...n) => n.filter((o, r, a) => !!o && o.trim() !== "" && a.indexOf(o) === r).join(" ").trim();
const iR = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const rR = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, a) => a ? a.toUpperCase() : r.toLowerCase()
);
const zy = (n) => {
  const o = rR(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var Id = {
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
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: a, className: c = "", children: f, iconNode: d, ...m }, g) => {
    const {
      size: h = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: v = !1,
      color: S = "currentColor",
      className: C = ""
    } = cR() ?? {}, w = a ?? v ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...Id,
        width: o ?? h ?? Id.width,
        height: o ?? h ?? Id.height,
        stroke: n ?? S,
        strokeWidth: w,
        className: c0("lucide", C, c),
        ...!f && !aR(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([A, O]) => b.createElement(A, O)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const kn = (n, o) => {
  const r = b.forwardRef(
    ({ className: a, ...c }, f) => b.createElement(uR, {
      ref: f,
      iconNode: o,
      className: c0(
        `lucide-${iR(zy(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return r.displayName = zy(n), r;
};
const fR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], dR = kn("check", fR);
const hR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], u0 = kn("chevron-down", hR);
const mR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], pR = kn("chevron-right", mR);
const gR = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Dy = kn("circle", gR);
const bR = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], yR = kn("expand", bR);
const vR = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], xR = kn("eye", vR);
const SR = [
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
], ER = kn("eye-off", SR);
const CR = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], RR = kn("lasso", CR);
const wR = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], _R = kn("maximize", wR);
const MR = [["path", { d: "M5 12h14", key: "1ays0h" }]], f0 = kn("minus", MR);
const AR = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], TR = kn("move", AR);
const OR = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], NR = kn("pentagon", OR);
const kR = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], zR = kn("plus", kR);
const DR = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], d0 = kn("shapes", DR);
const jR = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], LR = kn("shrink", jR);
const VR = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], IR = kn("spline", VR);
const HR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], UR = kn("square", HR);
const BR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], h0 = kn("x", BR);
var pa = Xv(), GR = Object.defineProperty, Yh = (n, o) => GR(n, "name", { value: o, configurable: !0 });
function bh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Yh(bh, "setRef");
function m0(...n) {
  return (o) => {
    let r = !1;
    const a = n.map((c) => {
      const f = bh(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < a.length; c++) {
          const f = a[c];
          typeof f == "function" ? f() : bh(n[c], null);
        }
      };
  };
}
Yh(m0, "composeRefs");
function Kn(...n) {
  return b.useCallback(m0(...n), n);
}
Yh(Kn, "useComposedRefs");
var YR = Object.defineProperty, ao = (n, o) => YR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function pr(n) {
  const o = b.forwardRef((r, a) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const g = [];
    yh(c) && typeof Lc == "function" && (c = Lc(c._payload)), b.Children.forEach(c, (S) => {
      if (v0(S)) {
        m = !0;
        const C = S;
        let w = "child" in C.props ? C.props.child : C.props.children;
        yh(w) && typeof Lc == "function" && (w = Lc(w._payload)), d = PR(C, w), g.push(d?.props?.children);
      } else
        g.push(S);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? y0(d) : void 0, y = Kn(a, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? FR(n) : KR(n)
        );
      return c;
    }
    const v = b0(f, d.props ?? {});
    return d.type !== b.Fragment && (v.ref = a ? y : h), b.cloneElement(d, v);
  });
  return o.displayName = `${n}.Slot`, o;
}
ao(pr, "createSlot");
var p0 = /* @__PURE__ */ pr("Slot"), g0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function qR(n) {
  const o = /* @__PURE__ */ ao((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = g0, o;
}
ao(qR, "createSlottable");
var PR = /* @__PURE__ */ ao((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function b0(n, o) {
  const r = { ...o };
  for (const a in o) {
    const c = n[a], f = o[a];
    /^on[A-Z]/.test(a) ? c && f ? r[a] = (...m) => {
      const g = f(...m);
      return c(...m), g;
    } : c && (r[a] = c) : a === "style" ? r[a] = { ...c, ...f } : a === "className" && (r[a] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...r };
}
ao(b0, "mergeProps");
function y0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
ao(y0, "getElementRef");
function v0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === g0;
}
ao(v0, "isSlottable");
var XR = /* @__PURE__ */ Symbol.for("react.lazy");
function yh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === XR && "_payload" in n && x0(n._payload);
}
ao(yh, "isLazyComponent");
function x0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
ao(x0, "isPromiseLike");
var KR = /* @__PURE__ */ ao((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), FR = /* @__PURE__ */ ao((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Lc = Er[" use ".trim().toString()], QR = Object.defineProperty, ZR = (n, o) => QR(n, "name", { value: o, configurable: !0 }), $R = [
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
], Un = $R.reduce((n, o) => {
  const r = /* @__PURE__ */ pr(`Primitive.${o}`), a = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ x.jsx(g, { ...m, ref: f });
  });
  return a.displayName = `Primitive.${o}`, { ...n, [o]: a };
}, {});
function JR(n, o) {
  n && pa.flushSync(() => n.dispatchEvent(o));
}
ZR(JR, "dispatchDiscreteCustomEvent");
var WR = Object.defineProperty, Fl = (n, o) => WR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function ew(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const a = /* @__PURE__ */ Fl((f) => {
    const { children: d, ...m } = f, g = b.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ x.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  a.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: m = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!m)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Fl(c, "useContext"), [a, c];
}
Fl(ew, "createContext");
// @__NO_SIDE_EFFECTS__
function Ui(n, o = []) {
  let r = [];
  function a(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Fl((v) => {
      const { scope: S, children: C, ...w } = v, A = S?.[n]?.[g] || m, O = b.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ x.jsx(A.Provider, { value: O, children: C });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(v, S, C = {}) {
      const { optional: w = !1 } = C, A = S?.[n]?.[g] || m, O = b.useContext(A);
      if (O) return O;
      if (d !== void 0) return d;
      if (!w)
        throw new Error(`\`${v}\` must be used within \`${f}\``);
    }
    return Fl(y, "useContext"), [h, y];
  }
  Fl(a, "createContext");
  const c = /* @__PURE__ */ Fl(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ Fl(function(m) {
      const g = m?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...m, [n]: g } }),
        [m, g]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [a, S0(c, ...o)];
}
Fl(Ui, "createContextScope");
function S0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Fl(() => {
    const a = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Fl(function(f) {
      const d = a.reduce((m, { useScope: g, scopeName: h }) => {
        const v = g(f)[`__scope${h}`];
        return { ...m, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Fl(S0, "composeContextScopes");
var tw = Object.defineProperty, Nn = (n, o) => tw(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function su(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Ui(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Nn((A) => {
    const { scope: O, children: M } = A, T = b.useRef(null), _ = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ x.jsx(c, { scope: O, itemMap: _, collectionRef: T, children: M });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", g = /* @__PURE__ */ pr(m), h = b.forwardRef(
    (A, O) => {
      const { scope: M, children: T } = A, _ = f(m, M), k = Kn(O, _.collectionRef);
      return /* @__PURE__ */ x.jsx(g, { ref: k, children: T });
    }
  );
  h.displayName = m;
  const y = n + "CollectionItemSlot", v = "data-radix-collection-item", S = /* @__PURE__ */ pr(y), C = b.forwardRef(
    (A, O) => {
      const { scope: M, children: T, ..._ } = A, k = b.useRef(null), I = Kn(O, k), q = f(y, M);
      return b.useEffect(() => (q.itemMap.set(k, { ref: k, ..._ }), () => {
        q.itemMap.delete(k);
      })), /* @__PURE__ */ x.jsx(S, { [v]: "", ref: I, children: T });
    }
  );
  C.displayName = y;
  function w(A) {
    const O = f(n + "CollectionConsumer", A);
    return b.useCallback(() => {
      const T = O.collectionRef.current;
      if (!T) return [];
      const _ = Array.from(T.querySelectorAll(`[${v}]`));
      return Array.from(O.itemMap.values()).sort(
        (q, B) => _.indexOf(q.ref.current) - _.indexOf(B.ref.current)
      );
    }, [O.collectionRef, O.itemMap]);
  }
  return Nn(w, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: C },
    w,
    a
  ];
}
Nn(su, "createCollection");
var jy = /* @__PURE__ */ new WeakMap(), xn, Tl, Hd = (Tl = class extends Map {
  constructor(r) {
    super(r);
    py(this, xn);
    Od(this, xn, [...super.keys()]), jy.set(this, !0);
  }
  set(r, a) {
    return jy.get(this) && (this.has(r) ? qn(this, xn)[qn(this, xn).indexOf(r)] = r : qn(this, xn).push(r)), super.set(r, a), this;
  }
  insert(r, a, c) {
    const f = this.has(a), d = qn(this, xn).length, m = qh(r);
    let g = m >= 0 ? m : d + m;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(a, c), this;
    const y = this.size + (f ? 0 : 1);
    m < 0 && g++;
    const v = [...qn(this, xn)];
    let S, C = !1;
    for (let w = g; w < y; w++)
      if (g === w) {
        let A = v[w];
        v[w] === a && (A = v[w + 1]), f && this.delete(a), S = this.get(A), this.set(a, c);
      } else {
        !C && v[w - 1] === a && (C = !0);
        const A = v[C ? w : w - 1], O = S;
        S = this.get(A), this.delete(A), this.set(A, O);
      }
    return this;
  }
  with(r, a, c) {
    const f = new Tl(this);
    return f.insert(r, a, c), f;
  }
  before(r) {
    const a = qn(this, xn).indexOf(r) - 1;
    if (!(a < 0))
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, a, c) {
    const f = qn(this, xn).indexOf(r);
    return f === -1 ? this : this.insert(f, a, c);
  }
  after(r) {
    let a = qn(this, xn).indexOf(r);
    if (a = a === -1 || a === this.size - 1 ? -1 : a + 1, a !== -1)
      return this.entryAt(a);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, a, c) {
    const f = qn(this, xn).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, a, c);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Od(this, xn, []), super.clear();
  }
  delete(r) {
    const a = super.delete(r);
    return a && qn(this, xn).splice(qn(this, xn).indexOf(r), 1), a;
  }
  deleteAt(r) {
    const a = this.keyAt(r);
    return a !== void 0 ? this.delete(a) : !1;
  }
  at(r) {
    const a = Xc(qn(this, xn), r);
    if (a !== void 0)
      return this.get(a);
  }
  entryAt(r) {
    const a = Xc(qn(this, xn), r);
    if (a !== void 0)
      return [a, this.get(a)];
  }
  indexOf(r) {
    return qn(this, xn).indexOf(r);
  }
  keyAt(r) {
    return Xc(qn(this, xn), r);
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
    return new Tl(c);
  }
  map(r, a) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, a, [d, f, this])]), f++;
    return new Tl(c);
  }
  reduce(...r) {
    const [a, c] = r;
    let f = 0, d = c ?? this.at(0);
    for (const m of this)
      f === 0 && r.length === 1 ? d = m : d = Reflect.apply(a, this, [d, m, f, this]), f++;
    return d;
  }
  reduceRight(...r) {
    const [a, c] = r;
    let f = c ?? this.at(-1);
    for (let d = this.size - 1; d >= 0; d--) {
      const m = this.at(d);
      d === this.size - 1 && r.length === 1 ? f = m : f = Reflect.apply(a, this, [f, m, d, this]);
    }
    return f;
  }
  toSorted(r) {
    const a = [...this.entries()].sort(r);
    return new Tl(a);
  }
  toReversed() {
    const r = new Tl();
    for (let a = this.size - 1; a >= 0; a--) {
      const c = this.keyAt(a), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const a = [...this.entries()];
    return a.splice(...r), new Tl(a);
  }
  slice(r, a) {
    const c = new Tl();
    let f = this.size - 1;
    if (r === void 0)
      return c;
    r < 0 && (r = r + this.size), a !== void 0 && a > 0 && (f = a - 1);
    for (let d = r; d <= f; d++) {
      const m = this.keyAt(d), g = this.get(m);
      c.set(m, g);
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
}, xn = new WeakMap(), Nn(Tl, "OrderedDict"), Tl);
function Xc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = E0(n, o);
  return r === -1 ? void 0 : n[r];
}
Nn(Xc, "at");
function E0(n, o) {
  const r = n.length, a = qh(o), c = a >= 0 ? a : r + a;
  return c < 0 || c >= r ? -1 : c;
}
Nn(E0, "toSafeIndex");
function qh(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Nn(qh, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function nw(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Ui(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Hd(),
      setItemMap: /* @__PURE__ */ Nn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Nn(({ state: _, ...k }) => _ ? /* @__PURE__ */ x.jsx(g, { ...k, state: _ }) : /* @__PURE__ */ x.jsx(m, { ...k }), "CollectionProvider");
  d.displayName = o;
  const m = /* @__PURE__ */ Nn((_) => {
    const k = O();
    return /* @__PURE__ */ x.jsx(g, { ..._, state: k });
  }, "CollectionInit");
  m.displayName = o + "Init";
  const g = /* @__PURE__ */ Nn((_) => {
    const { scope: k, children: I, state: q } = _, B = b.useRef(null), [j, P] = b.useState(
      null
    ), te = Kn(B, P), [se, fe] = q;
    return b.useEffect(() => {
      if (!j) return;
      const le = w0(() => {
      });
      return le.observe(j, {
        childList: !0,
        subtree: !0
      }), () => {
        le.disconnect();
      };
    }, [j]), /* @__PURE__ */ x.jsx(
      c,
      {
        scope: k,
        itemMap: se,
        setItemMap: fe,
        collectionRef: te,
        collectionRefObject: B,
        collectionElement: j,
        children: I
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ pr(h), v = b.forwardRef(
    (_, k) => {
      const { scope: I, children: q } = _, B = f(h, I), j = Kn(k, B.collectionRef);
      return /* @__PURE__ */ x.jsx(y, { ref: j, children: q });
    }
  );
  v.displayName = h;
  const S = n + "CollectionItemSlot", C = "data-radix-collection-item", w = /* @__PURE__ */ pr(S), A = b.forwardRef(
    (_, k) => {
      const { scope: I, children: q, ...B } = _, j = b.useRef(null), [P, te] = b.useState(null), se = Kn(k, j, te), fe = f(S, I), { setItemMap: le } = fe, he = b.useRef(B);
      C0(he.current, B) || (he.current = B);
      const be = he.current;
      return b.useEffect(() => {
        const V = be;
        return le((H) => P ? H.has(P) ? H.set(P, { ...V, element: P }).toSorted(vh) : (H.set(P, { ...V, element: P }), H.toSorted(vh)) : H), () => {
          le((H) => !P || !H.has(P) ? H : (H.delete(P), new Hd(H)));
        };
      }, [P, be, le]), /* @__PURE__ */ x.jsx(w, { [C]: "", ref: se, children: q });
    }
  );
  A.displayName = S;
  function O() {
    return b.useState(new Hd());
  }
  Nn(O, "useInitCollection");
  function M(_) {
    const { itemMap: k } = f(n + "CollectionConsumer", _);
    return k;
  }
  return Nn(M, "useCollection"), [
    { Provider: d, Slot: v, ItemSlot: A },
    {
      createCollectionScope: a,
      useCollection: M,
      useInitCollection: O
    }
  ];
}
Nn(nw, "createCollection");
function C0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), a = Object.keys(o);
  if (r.length !== a.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Nn(C0, "shallowEqual");
function R0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Nn(R0, "isElementPreceding");
function vh(n, o) {
  return !n[1].element || !o[1].element ? 0 : R0(n[1].element, o[1].element) ? -1 : 1;
}
Nn(vh, "sortByDocumentPosition");
function w0(n) {
  return new MutationObserver((r) => {
    for (const a of r)
      if (a.type === "childList") {
        n();
        return;
      }
  });
}
Nn(w0, "getChildListObserver");
var lw = Object.defineProperty, ga = (n, o) => lw(n, "name", { value: o, configurable: !0 }), _0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Xn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ga(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
ga(Xn, "composeEventHandlers");
function ow(n) {
  if (!_0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
ga(ow, "getOwnerWindow");
function xh(n) {
  if (!_0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
ga(xh, "getOwnerDocument");
function M0(n, o = !1) {
  const { activeElement: r } = xh(n);
  if (!r?.nodeName)
    return null;
  if (A0(r) && r.contentDocument)
    return M0(r.contentDocument.body, o);
  if (o) {
    const a = r.getAttribute("aria-activedescendant");
    if (a) {
      const c = xh(r).getElementById(a);
      if (c)
        return c;
    }
  }
  return r;
}
ga(M0, "getActiveElement");
function A0(n) {
  return n.tagName === "IFRAME";
}
ga(A0, "isFrame");
var zi = globalThis?.document ? b.useLayoutEffect : () => {
}, iw = Object.defineProperty, rw = (n, o) => iw(n, "name", { value: o, configurable: !0 }), Ly = Er[" useEffectEvent ".trim().toString()], Vy = Er[" useInsertionEffect ".trim().toString()];
function T0(n) {
  if (typeof Ly == "function")
    return Ly(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Vy == "function" ? Vy(() => {
    o.current = n;
  }) : zi(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
rw(T0, "useEffectEvent");
var aw = Object.defineProperty, Es = (n, o) => aw(n, "name", { value: o, configurable: !0 }), sw = Er[" useInsertionEffect ".trim().toString()] || zi;
function Qo({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ Es(() => {
  }, "onChange"),
  caller: a
}) {
  const [c, f, d] = O0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, g = m ? n : c, h = b.useCallback(
    (y) => {
      if (m) {
        const v = N0(y) ? y(n) : y;
        v !== n && d.current?.(v);
      } else
        f(y);
    },
    [m, n, f, d]
  );
  return [g, h];
}
Es(Qo, "useControllableState");
function O0({
  defaultProp: n,
  onChange: o
}) {
  const [r, a] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return sw(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, a, f];
}
Es(O0, "useUncontrolledState");
function N0(n) {
  return typeof n == "function";
}
Es(N0, "isFunction");
var Iy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function cw(n, o, r, a) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, g = c !== void 0, h = T0(d), y = [{ ...r, state: f }];
  a && y.push(a);
  const [v, S] = b.useReducer(
    (O, M) => {
      if (M.type === Iy)
        return { ...O, state: M.state };
      const T = n(O, M);
      return g && !Object.is(T.state, O.state) && h(T.state), T;
    },
    ...y
  ), C = v.state, w = b.useRef(C);
  b.useEffect(() => {
    w.current !== C && (w.current = C, g || h(C));
  }, [C, w, g]);
  const A = b.useMemo(() => c !== void 0 ? { ...v, state: c } : v, [v, c]);
  return b.useEffect(() => {
    g && !Object.is(c, v.state) && S({ type: Iy, state: c });
  }, [c, v.state, g]), [A, S];
}
Es(cw, "useControllableStateReducer");
var uw = Object.defineProperty, Fo = (n, o) => uw(n, "name", { value: o, configurable: !0 });
function k0(n, o) {
  return b.useReducer((r, a) => o[r][a] ?? r, n);
}
Fo(k0, "useStateMachine");
var fw = /* @__PURE__ */ Fo((n) => {
  const { present: o, children: r } = n, a = z0(o), c = typeof r == "function" ? r({ present: a.isPresent }) : b.Children.only(r), f = D0(a.ref, j0(c));
  return typeof r == "function" || a.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function z0(n) {
  const [o, r] = b.useState(), a = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [g, h] = k0(m, {
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
    g === "mounted" ? (f.current = d.current ?? oa(a.current), d.current = void 0) : f.current = "none";
  }, [g]), zi(() => {
    const y = a.current, v = c.current;
    if (v !== n) {
      const C = f.current, w = oa(y);
      n ? (d.current = w, h("MOUNT")) : w === "none" || y?.display === "none" ? h("UNMOUNT") : h(v && C !== w ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), zi(() => {
    if (o) {
      let y;
      const v = o.ownerDocument.defaultView ?? window, S = /* @__PURE__ */ Fo((w) => {
        const O = oa(a.current).includes(CSS.escape(w.animationName));
        if (w.target === o && O && (h("ANIMATION_END"), !c.current)) {
          const M = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = v.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = M);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ Fo((w) => {
        w.target === o && (f.current = oa(a.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", C), o.addEventListener("animationcancel", S), o.addEventListener("animationend", S), () => {
        v.clearTimeout(y), o.removeEventListener("animationstart", C), o.removeEventListener("animationcancel", S), o.removeEventListener("animationend", S);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((y) => {
      if (y) {
        const v = getComputedStyle(y);
        a.current = v, d.current = oa(v);
      } else
        a.current = null;
      r(y);
    }, [])
  };
}
Fo(z0, "usePresence");
function Sh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Fo(Sh, "setRef");
function D0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const a = o.current;
    let c = !1;
    const f = a.map((d) => {
      const m = Sh(d, r);
      return !c && typeof m == "function" && (c = !0), m;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const m = f[d];
          typeof m == "function" ? m() : Sh(a[d], null);
        }
      };
  }, []);
}
Fo(D0, "useStableComposedRefs");
function oa(n) {
  return n?.animationName || "none";
}
Fo(oa, "getAnimationName");
function j0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Fo(j0, "getElementRef");
var dw = Object.defineProperty, hw = (n, o) => dw(n, "name", { value: o, configurable: !0 }), mw = Er[" useId ".trim().toString()] || (() => {
}), pw = 0;
function cu(n) {
  const [o, r] = b.useState(mw());
  return zi(() => {
    n || r((a) => a ?? String(pw++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
hw(cu, "useId");
var gw = Object.defineProperty, Cs = (n, o) => gw(n, "name", { value: o, configurable: !0 }), Ph = "Collapsible", [bw, L0] = /* @__PURE__ */ Ui(Ph), [yw, Xh] = bw(Ph), vw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Cs(function(o, r) {
    const {
      __scopeCollapsible: a,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...g
    } = o, [h, y] = Qo({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: Ph
    });
    return /* @__PURE__ */ x.jsx(
      yw,
      {
        scope: a,
        disabled: d,
        contentId: cu(),
        open: h,
        onOpenToggle: b.useCallback(() => y((v) => !v), [y]),
        children: /* @__PURE__ */ x.jsx(
          Un.div,
          {
            "data-state": uu(h),
            "data-disabled": d ? "" : void 0,
            ...g,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), xw = "CollapsibleTrigger", V0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cs(function(o, r) {
    const { __scopeCollapsible: a, ...c } = o, f = Xh(xw, a);
    return /* @__PURE__ */ x.jsx(
      Un.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": uu(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: Xn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), I0 = "CollapsibleContent", H0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cs(function(o, r) {
    const { forceMount: a, ...c } = o, f = Xh(I0, o.__scopeCollapsible);
    return /* @__PURE__ */ x.jsx(fw, { present: a || f.open, children: ({ present: d }) => /* @__PURE__ */ x.jsx(Sw, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), Sw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Cs(function(o, r) {
  const { __scopeCollapsible: a, present: c, children: f, ...d } = o, m = Xh(I0, a), [g, h] = b.useState(c), y = b.useRef(null), v = Kn(r, y), S = b.useRef(0), C = S.current, w = b.useRef(0), A = w.current, O = m.open || g, M = b.useRef(O), T = b.useRef(void 0);
  return b.useEffect(() => {
    const _ = requestAnimationFrame(() => M.current = !1);
    return () => cancelAnimationFrame(_);
  }, []), zi(() => {
    const _ = y.current;
    if (_) {
      T.current = T.current || {
        transitionDuration: _.style.transitionDuration,
        animationName: _.style.animationName
      }, _.style.transitionDuration = "0s", _.style.animationName = "none";
      const k = _.getBoundingClientRect();
      S.current = k.height, w.current = k.width, M.current || (_.style.transitionDuration = T.current.transitionDuration, _.style.animationName = T.current.animationName), h(c);
    }
  }, [m.open, c]), /* @__PURE__ */ x.jsx(
    Un.div,
    {
      "data-state": uu(m.open),
      "data-disabled": m.disabled ? "" : void 0,
      id: m.contentId,
      hidden: !O,
      ...d,
      ref: v,
      style: {
        "--radix-collapsible-content-height": C ? `${C}px` : void 0,
        "--radix-collapsible-content-width": A ? `${A}px` : void 0,
        ...o.style
      },
      children: O && f
    }
  );
}, "CollapsibleContentImpl"));
function uu(n) {
  return n ? "open" : "closed";
}
Cs(uu, "getState");
var U0 = vw, Ew = V0, Cw = H0, Rw = Object.defineProperty, ww = (n, o) => Rw(n, "name", { value: o, configurable: !0 }), _w = b.createContext(void 0);
function Rs(n) {
  const o = b.useContext(_w);
  return n || o || "ltr";
}
ww(Rs, "useDirection");
var Mw = Object.defineProperty, Nl = (n, o) => Mw(n, "name", { value: o, configurable: !0 }), Co = "Accordion", Aw = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Kh, Tw, Ow] = /* @__PURE__ */ su(Co), [fu, ek] = /* @__PURE__ */ Ui(Co, [
  Ow,
  L0
]), Fh = L0(), Nw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { type: a, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ x.jsx(Kh.Provider, { scope: o.__scopeAccordion, children: a === "multiple" ? /* @__PURE__ */ x.jsx(jw, { ...d, ref: r }) : /* @__PURE__ */ x.jsx(Dw, { ...f, ref: r }) });
  }, "Accordion")
), [B0, kw] = fu(Co), [G0, zw] = fu(
  Co,
  { collapsible: !1 }
), Dw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const {
      value: a,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Nl(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [g, h] = Qo({
      prop: a,
      defaultProp: c ?? "",
      onChange: f,
      caller: Co
    });
    return /* @__PURE__ */ x.jsx(
      B0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ x.jsx(G0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ x.jsx(Y0, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), jw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Nl(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Nl(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Qo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: Co
  }), h = b.useCallback(
    (v) => g((S = []) => [...S, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((S = []) => S.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ x.jsx(
    B0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ x.jsx(G0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ x.jsx(Y0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [Lw, du] = fu(Co), Y0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: a, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, g = b.useRef(null), h = Kn(g, r), y = Tw(a), S = Rs(f) === "ltr", C = Xn(o.onKeyDown, (w) => {
      if (!Aw.includes(w.key)) return;
      const A = w.target, O = y().filter((P) => !P.ref.current?.disabled), M = O.findIndex((P) => P.ref.current === A), T = O.length;
      if (M === -1) return;
      w.preventDefault();
      let _ = M;
      const k = 0, I = T - 1, q = /* @__PURE__ */ Nl(() => {
        _ = M + 1, _ > I && (_ = k);
      }, "moveNext"), B = /* @__PURE__ */ Nl(() => {
        _ = M - 1, _ < k && (_ = I);
      }, "movePrev");
      switch (w.key) {
        case "Home":
          _ = k;
          break;
        case "End":
          _ = I;
          break;
        case "ArrowRight":
          d === "horizontal" && (S ? q() : B());
          break;
        case "ArrowDown":
          d === "vertical" && q();
          break;
        case "ArrowLeft":
          d === "horizontal" && (S ? B() : q());
          break;
        case "ArrowUp":
          d === "vertical" && B();
          break;
      }
      const j = _ % T;
      O[j].ref.current?.focus();
    });
    return /* @__PURE__ */ x.jsx(
      Lw,
      {
        scope: a,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ x.jsx(Kh.Slot, { scope: a, children: /* @__PURE__ */ x.jsx(
          Un.div,
          {
            ...m,
            "data-orientation": d,
            ref: h,
            onKeyDown: c ? void 0 : C
          }
        ) })
      }
    );
  }, "AccordionImpl")
), Eh = "AccordionItem", [Vw, Qh] = fu(Eh), Iw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: a, value: c, ...f } = o, d = du(Eh, a), m = kw(Eh, a), g = Fh(a), h = cu(), y = c && m.value.includes(c) || !1, v = d.disabled || o.disabled;
    return /* @__PURE__ */ x.jsx(
      Vw,
      {
        scope: a,
        open: y,
        disabled: v,
        triggerId: h,
        children: /* @__PURE__ */ x.jsx(
          U0,
          {
            "data-orientation": d.orientation,
            "data-state": Zh(y),
            ...g,
            ...f,
            ref: r,
            disabled: v,
            open: y,
            onOpenChange: (S) => {
              S ? m.onItemOpen(c) : m.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), Hw = "AccordionHeader", Uw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Qh(Hw, a);
    return /* @__PURE__ */ x.jsx(
      Un.h3,
      {
        "data-orientation": f.orientation,
        "data-state": Zh(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Hy = "AccordionTrigger", Bw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Qh(Hy, a), m = zw(Hy, a), g = Fh(a);
    return /* @__PURE__ */ x.jsx(Kh.ItemSlot, { scope: a, children: /* @__PURE__ */ x.jsx(
      Ew,
      {
        "aria-disabled": d.open && !m.collapsible || void 0,
        "data-orientation": f.orientation,
        id: d.triggerId,
        ...g,
        ...c,
        ref: r
      }
    ) });
  }, "AccordionTrigger")
), Gw = "AccordionContent", Yw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Nl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Qh(Gw, a), m = Fh(a);
    return /* @__PURE__ */ x.jsx(
      Cw,
      {
        role: "region",
        "aria-labelledby": d.triggerId,
        "data-orientation": f.orientation,
        ...m,
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
Nl(Zh, "getState");
var qw = Nw, Pw = Iw, Xw = Uw, Kw = Bw, Fw = Yw, Qw = Object.defineProperty, Zw = (n, o) => Qw(n, "name", { value: o, configurable: !0 });
function q0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
Zw(q0, "useCallbackRef");
var $w = Object.defineProperty, Jw = (n, o) => $w(n, "name", { value: o, configurable: !0 });
function P0(n) {
  const [o, r] = b.useState(void 0);
  return zi(() => {
    if (n) {
      r({ width: n.offsetWidth, height: n.offsetHeight });
      const a = new ResizeObserver((c) => {
        if (!Array.isArray(c) || !c.length)
          return;
        const f = c[0];
        let d, m;
        if ("borderBoxSize" in f) {
          const g = f.borderBoxSize, h = Array.isArray(g) ? g[0] : g;
          d = h.inlineSize, m = h.blockSize;
        } else
          d = n.offsetWidth, m = n.offsetHeight;
        r({ width: d, height: m });
      });
      return a.observe(n, { box: "border-box" }), () => a.unobserve(n);
    } else
      r(void 0);
  }, [n]), o;
}
Jw(P0, "useSize");
const fa = Math.min, Xo = Math.max, Jc = Math.round, dr = Math.floor, Ko = (n) => ({
  x: n,
  y: n
}), Ww = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function X0(n, o, r) {
  return Xo(n, fa(o, r));
}
function Di(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Zl(n) {
  return n.split("-")[0];
}
function Bi(n) {
  return n.split("-")[1];
}
function $h(n) {
  return n === "x" ? "y" : "x";
}
function Jh(n) {
  return n === "y" ? "height" : "width";
}
function Ql(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function Wh(n) {
  return $h(Ql(n));
}
function e_(n, o, r) {
  r === void 0 && (r = !1);
  const a = Bi(n), c = Wh(n), f = Jh(c);
  let d = c === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = Wc(d)), [d, Wc(d)];
}
function t_(n) {
  const o = Wc(n);
  return [Ch(n), o, Ch(o)];
}
function Ch(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const Uy = ["left", "right"], By = ["right", "left"], n_ = ["top", "bottom"], l_ = ["bottom", "top"];
function o_(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? By : Uy : o ? Uy : By;
    case "left":
    case "right":
      return o ? n_ : l_;
    default:
      return [];
  }
}
function i_(n, o, r, a) {
  const c = Bi(n);
  let f = o_(Zl(n), r === "start", a);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Ch)))), f;
}
function Wc(n) {
  const o = Zl(n);
  return Ww[o] + n.slice(o.length);
}
function r_(n) {
  var o, r, a, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (a = n.bottom) != null ? a : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function K0(n) {
  return typeof n != "number" ? r_(n) : {
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
function Gy(n, o, r) {
  let {
    reference: a,
    floating: c
  } = n;
  const f = Ql(o), d = Wh(o), m = Jh(d), g = Zl(o), h = f === "y", y = a.x + a.width / 2 - c.width / 2, v = a.y + a.height / 2 - c.height / 2, S = a[m] / 2 - c[m] / 2;
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
  const w = Bi(o);
  return w && (C[d] += S * (w === "end" ? 1 : -1) * (r && h ? -1 : 1)), C;
}
async function a_(n, o) {
  var r;
  o === void 0 && (o = {});
  const {
    x: a,
    y: c,
    platform: f,
    rects: d,
    elements: m,
    strategy: g
  } = n, {
    boundary: h = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: v = "floating",
    altBoundary: S = !1,
    padding: C = 0
  } = Di(o, n), w = K0(C), O = m[S ? v === "floating" ? "reference" : "floating" : v], M = eu(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(O))) == null || r ? O : O.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: g
  })), T = v === "floating" ? {
    x: a,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, _ = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), k = await (f.isElement == null ? void 0 : f.isElement(_)) && await (f.getScale == null ? void 0 : f.getScale(_)) || {
    x: 1,
    y: 1
  }, I = eu(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: T,
    offsetParent: _,
    strategy: g
  }) : T);
  return {
    top: (M.top - I.top + w.top) / k.y,
    bottom: (I.bottom - M.bottom + w.bottom) / k.y,
    left: (M.left - I.left + w.left) / k.x,
    right: (I.right - M.right + w.right) / k.x
  };
}
const s_ = 50, c_ = async (n, o, r) => {
  const {
    placement: a = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, m = d.detectOverflow ? d : {
    ...d,
    detectOverflow: a_
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: v
  } = Gy(h, a, g), S = a, C = 0;
  const w = {};
  for (let A = 0; A < f.length; A++) {
    const O = f[A];
    if (!O)
      continue;
    const {
      name: M,
      fn: T
    } = O, {
      x: _,
      y: k,
      data: I,
      reset: q
    } = await T({
      x: y,
      y: v,
      initialPlacement: a,
      placement: S,
      strategy: c,
      middlewareData: w,
      rects: h,
      platform: m,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = _ ?? y, v = k ?? v, w[M] = {
      ...w[M],
      ...I
    }, q && C < s_ && (C++, typeof q == "object" && (q.placement && (S = q.placement), q.rects && (h = q.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : q.rects), {
      x: y,
      y: v
    } = Gy(h, S, g)), A = -1);
  }
  return {
    x: y,
    y: v,
    placement: S,
    strategy: c,
    middlewareData: w
  };
}, u_ = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(o) {
      var r, a;
      const {
        placement: c,
        middlewareData: f,
        rects: d,
        initialPlacement: m,
        platform: g,
        elements: h
      } = o, {
        mainAxis: y = !0,
        crossAxis: v = !0,
        fallbackPlacements: S,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: A = !0,
        ...O
      } = Di(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const M = Zl(c), T = Ql(m), _ = Zl(m) === m, k = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), I = S || (_ || !A ? [Wc(m)] : t_(m)), q = w !== "none";
      !S && q && I.push(...i_(m, A, w, k));
      const B = [m, ...I], j = await g.detectOverflow(o, O), P = [];
      let te = ((a = f.flip) == null ? void 0 : a.overflows) || [];
      if (y && P.push(j[M]), v) {
        const he = e_(c, d, k);
        P.push(j[he[0]], j[he[1]]);
      }
      if (te = [...te, {
        placement: c,
        overflows: P
      }], !P.every((he) => he <= 0)) {
        var se, fe;
        const he = (((se = f.flip) == null ? void 0 : se.index) || 0) + 1, be = B[he];
        if (be && (!(v === "alignment" ? T !== Ql(be) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        te.every((F) => Ql(F.placement) === T ? F.overflows[0] > 0 : !0)))
          return {
            data: {
              index: he,
              overflows: te
            },
            reset: {
              placement: be
            }
          };
        let V = (fe = te.filter((H) => H.overflows[0] <= 0).sort((H, F) => H.overflows[1] - F.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!V)
          switch (C) {
            case "bestFit": {
              var le;
              const H = (le = te.filter((F) => {
                if (q) {
                  const ve = Ql(F.placement);
                  return ve === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ve === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((ve) => ve > 0).reduce((ve, ae) => ve + ae, 0)]).sort((F, ve) => F[1] - ve[1])[0]) == null ? void 0 : le[0];
              H && (V = H);
              break;
            }
            case "initialPlacement":
              V = m;
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
}, F0 = /* @__PURE__ */ new Set(["left", "top"]);
async function f_(n, o) {
  const {
    placement: r,
    platform: a,
    elements: c
  } = n, f = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = Zl(r), m = Bi(r), g = Ql(r) === "y", h = F0.has(d) ? -1 : 1, y = f && g ? -1 : 1, v = Di(o, n);
  let {
    mainAxis: S,
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
  return m && typeof w == "number" && (C = m === "end" ? w * -1 : w), g ? {
    x: C * y,
    y: S * h
  } : {
    x: S * h,
    y: C * y
  };
}
const d_ = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        middlewareData: m
      } = o, g = await f_(o, n);
      return d === ((r = m.offset) == null ? void 0 : r.placement) && (a = m.arrow) != null && a.alignmentOffset ? {} : {
        x: c + g.x,
        y: f + g.y,
        data: {
          ...g,
          placement: d
        }
      };
    }
  };
}, h_ = function(n) {
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
        crossAxis: m = !1,
        limiter: g = {
          fn: (T) => {
            let {
              x: _,
              y: k
            } = T;
            return {
              x: _,
              y: k
            };
          }
        },
        ...h
      } = Di(n, o), y = {
        x: r,
        y: a
      }, v = await f.detectOverflow(o, h), S = Ql(c), C = $h(S);
      let w = y[C], A = y[S];
      const O = (T, _) => X0(_ + v[T === "y" ? "top" : "left"], _, _ - v[T === "y" ? "bottom" : "right"]);
      d && (w = O(C, w)), m && (A = O(S, A));
      const M = g.fn({
        ...o,
        [C]: w,
        [S]: A
      });
      return {
        ...M,
        data: {
          x: M.x - r,
          y: M.y - a,
          enabled: {
            [C]: d,
            [S]: m
          }
        }
      };
    }
  };
}, m_ = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(o) {
      var r, a;
      const {
        x: c,
        y: f,
        placement: d,
        rects: m,
        middlewareData: g
      } = o, {
        offset: h = 0,
        mainAxis: y = !0,
        crossAxis: v = !0
      } = Di(n, o), S = {
        x: c,
        y: f
      }, C = Ql(d), w = $h(C);
      let A = S[w], O = S[C];
      const M = Di(h, o), T = typeof M == "number" ? {
        mainAxis: M,
        crossAxis: 0
      } : {
        mainAxis: (r = M.mainAxis) != null ? r : 0,
        crossAxis: (a = M.crossAxis) != null ? a : 0
      };
      if (y) {
        const I = w === "y" ? "height" : "width", q = m.reference[w] - m.floating[I] + T.mainAxis, B = m.reference[w] + m.reference[I] - T.mainAxis;
        A < q ? A = q : A > B && (A = B);
      }
      if (v) {
        var _, k;
        const I = w === "y" ? "width" : "height", q = F0.has(Zl(d)), B = m.reference[C] - m.floating[I] + (q && ((_ = g.offset) == null ? void 0 : _[C]) || 0) + (q ? 0 : T.crossAxis), j = m.reference[C] + m.reference[I] + (q ? 0 : ((k = g.offset) == null ? void 0 : k[C]) || 0) - (q ? T.crossAxis : 0);
        O < B ? O = B : O > j && (O = j);
      }
      return {
        [w]: A,
        [C]: O
      };
    }
  };
}, p_ = function(n) {
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
        ...m
      } = Di(n, o), g = await c.detectOverflow(o, m), h = Zl(r), y = Bi(r), v = Ql(r) === "y", {
        width: S,
        height: C
      } = a.floating;
      let w, A;
      h === "top" || h === "bottom" ? (w = h, A = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (A = h, w = y === "end" ? "top" : "bottom");
      const O = C - g.top - g.bottom, M = S - g.left - g.right, T = fa(C - g[w], O), _ = fa(S - g[A], M), k = o.middlewareData.shift, I = !k;
      let q = T, B = _;
      k != null && k.enabled.x && (B = M), k != null && k.enabled.y && (q = O), I && !y && (v ? B = S - 2 * Xo(g.left, g.right) : q = C - 2 * Xo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: B,
        availableHeight: q
      });
      const j = await c.getDimensions(f.floating);
      return S !== j.width || C !== j.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function hu() {
  return typeof window < "u";
}
function Bn(n) {
  return em(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function hn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Zo(n) {
  var o;
  return (o = (em(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function em(n) {
  return hu() ? n instanceof Node || n instanceof hn(n).Node : !1;
}
function dn(n) {
  return hu() ? n instanceof Element || n instanceof hn(n).Element : !1;
}
function Kt(n) {
  return hu() ? n instanceof HTMLElement || n instanceof hn(n).HTMLElement : !1;
}
function da(n) {
  return !hu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof hn(n).ShadowRoot;
}
function ws(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: a,
    display: c
  } = yl(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + a + r) && c !== "inline" && c !== "contents";
}
function g_(n) {
  return /^(table|td|th)$/.test(Bn(n));
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
const b_ = /transform|translate|scale|rotate|perspective|filter/, y_ = /paint|layout|strict|content/, ur = (n) => !!n && n !== "none";
let Ud;
function tm(n) {
  const o = dn(n) ? yl(n) : n;
  return ur(o.transform) || ur(o.translate) || ur(o.scale) || ur(o.rotate) || ur(o.perspective) || !nm() && (ur(o.backdropFilter) || ur(o.filter)) || b_.test(o.willChange || "") || y_.test(o.contain || "");
}
function v_(n) {
  let o = ji(n);
  for (; Kt(o) && !Ni(o); ) {
    if (tm(o))
      return o;
    if (mu(o))
      return null;
    o = ji(o);
  }
  return null;
}
function nm() {
  return Ud == null && (Ud = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ud;
}
function Ni(n) {
  return /^(html|body|#document)$/.test(Bn(n));
}
function yl(n) {
  return hn(n).getComputedStyle(n);
}
function pu(n) {
  return dn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function ji(n) {
  if (Bn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    da(n) && n.host || // Fallback.
    Zo(n)
  );
  return da(o) ? o.host : o;
}
function Q0(n) {
  const o = ji(n);
  return Ni(o) ? (n.ownerDocument || n).body : Kt(o) && ws(o) ? o : Q0(o);
}
function ha(n, o, r) {
  var a;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = Q0(n), f = c === ((a = n.ownerDocument) == null ? void 0 : a.body), d = hn(c);
  if (f) {
    const m = Rh(d);
    return o.concat(d, d.visualViewport || [], ws(c) ? c : [], m && r ? ha(m) : []);
  } else
    return o.concat(c, ha(c, [], r));
}
function Rh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function Z0(n) {
  const o = yl(n);
  let r = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : a, m = Jc(r) !== f || Jc(a) !== d;
  return m && (r = f, a = d), {
    width: r,
    height: a,
    $: m
  };
}
function lm(n) {
  return dn(n) ? n : n.contextElement;
}
function aa(n) {
  const o = lm(n);
  if (!Kt(o))
    return Ko(1);
  const r = o.getBoundingClientRect(), {
    width: a,
    height: c,
    $: f
  } = Z0(o);
  let d = (f ? Jc(r.width) : r.width) / a, m = (f ? Jc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const x_ = /* @__PURE__ */ Ko(0);
function $0(n) {
  const o = hn(n);
  return !nm() || !o.visualViewport ? x_ : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function S_(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === hn(n);
}
function gr(n, o, r, a) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = lm(n);
  let d = Ko(1);
  o && (a ? dn(a) && (d = aa(a)) : d = aa(n));
  const m = S_(f, r, a) ? $0(f) : Ko(0);
  let g = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, y = c.width / d.x, v = c.height / d.y;
  if (f && a) {
    const S = hn(f), C = dn(a) ? hn(a) : a;
    let w = S, A = Rh(w);
    for (; A && C !== w; ) {
      const O = aa(A), M = A.getBoundingClientRect(), T = yl(A), _ = M.left + (A.clientLeft + parseFloat(T.paddingLeft)) * O.x, k = M.top + (A.clientTop + parseFloat(T.paddingTop)) * O.y;
      g *= O.x, h *= O.y, y *= O.x, v *= O.y, g += _, h += k, w = hn(A), A = Rh(w);
    }
  }
  return eu({
    width: y,
    height: v,
    x: g,
    y: h
  });
}
function gu(n, o) {
  const r = pu(n).scrollLeft;
  return o ? o.left + r : gr(Zo(n)).left + r;
}
function J0(n, o) {
  const r = n.getBoundingClientRect(), a = r.left + o.scrollLeft - gu(n, r), c = r.top + o.scrollTop;
  return {
    x: a,
    y: c
  };
}
function E_(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: a,
    strategy: c
  } = n;
  const f = c === "fixed", d = Zo(a), m = o ? mu(o.floating) : !1;
  if (a === d || m && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Ko(1);
  const y = Ko(0), v = Kt(a);
  if ((v || !f) && ((Bn(a) !== "body" || ws(d)) && (g = pu(a)), v)) {
    const C = gr(a);
    h = aa(a), y.x = C.x + a.clientLeft, y.y = C.y + a.clientTop;
  }
  const S = d && !v && !f ? J0(d, g) : Ko(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + y.x + S.x,
    y: r.y * h.y - g.scrollTop * h.y + y.y + S.y
  };
}
function C_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function R_(n) {
  const o = pu(n), r = n.ownerDocument.body, a = Xo(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = Xo(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + gu(n);
  const d = -o.scrollTop;
  return yl(r).direction === "rtl" && (f += Xo(n.clientWidth, r.clientWidth) - a), {
    width: a,
    height: c,
    x: f,
    y: d
  };
}
const w_ = 25;
function __(n, o, r) {
  r === void 0 && (r = "viewport");
  const a = r === "layoutViewport", c = hn(n), f = Zo(n), d = c.visualViewport;
  let m = f.clientWidth, g = f.clientHeight, h = 0, y = 0;
  if (d) {
    const S = !nm() || o === "fixed";
    a ? S || (h = -d.offsetLeft, y = -d.offsetTop) : (m = d.width, g = d.height, S && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (gu(f) <= 0) {
    const S = f.ownerDocument, C = S.body, w = getComputedStyle(C), A = S.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, O = Math.abs(f.clientWidth - C.clientWidth - A), M = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? O / 2 : O;
    M <= w_ && (m -= M);
  }
  return {
    width: m,
    height: g,
    x: h,
    y
  };
}
function M_(n, o) {
  const r = gr(n, !0, o === "fixed"), a = r.top + n.clientTop, c = r.left + n.clientLeft, f = aa(n), d = n.clientWidth * f.x, m = n.clientHeight * f.y, g = c * f.x, h = a * f.y;
  return {
    width: d,
    height: m,
    x: g,
    y: h
  };
}
function Yy(n, o, r) {
  let a;
  if (o === "viewport" || o === "layoutViewport")
    a = __(n, r, o);
  else if (o === "document")
    a = R_(Zo(n));
  else if (dn(o))
    a = M_(o, r);
  else {
    const c = $0(n);
    a = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return eu(a);
}
function A_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let a = ha(n, [], !1).filter((m) => dn(m) && Bn(m) !== "body"), c = null;
  const f = yl(n).position === "fixed";
  let d = f ? ji(n) : n;
  for (; dn(d) && !Ni(d); ) {
    const m = yl(d), g = tm(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && m.position === "static") ? a = a.filter((v) => v !== d) : c = m, d = ji(d);
  }
  return o.set(n, a), a;
}
function T_(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: a,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? mu(o) ? [] : A_(o, this._c) : [].concat(r), a], m = Yy(o, d[0], c);
  let g = m.top, h = m.right, y = m.bottom, v = m.left;
  for (let S = 1; S < d.length; S++) {
    const C = Yy(o, d[S], c);
    g = Xo(C.top, g), h = fa(C.right, h), y = fa(C.bottom, y), v = Xo(C.left, v);
  }
  return {
    width: h - v,
    height: y - g,
    x: v,
    y: g
  };
}
function O_(n) {
  const {
    width: o,
    height: r
  } = Z0(n);
  return {
    width: o,
    height: r
  };
}
function N_(n, o, r) {
  const a = Kt(o), c = Zo(o), f = r === "fixed", d = gr(n, !0, f, o);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Ko(0);
  if ((a || !f) && ((Bn(o) !== "body" || ws(c)) && (m = pu(o)), a)) {
    const S = gr(o, !0, f, o);
    g.x = S.x + o.clientLeft, g.y = S.y + o.clientTop;
  }
  !a && c && (g.x = gu(c));
  const h = c && !a && !f ? J0(c, m) : Ko(0), y = d.left + m.scrollLeft - g.x - h.x, v = d.top + m.scrollTop - g.y - h.y;
  return {
    x: y,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Bd(n) {
  return yl(n).position === "static";
}
function qy(n, o) {
  if (!Kt(n) || yl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Zo(n) === r && (r = r.ownerDocument.body), r;
}
function W0(n, o) {
  const r = hn(n);
  if (mu(n))
    return r;
  if (!Kt(n)) {
    let c = ji(n);
    for (; c && !Ni(c); ) {
      if (dn(c) && !Bd(c))
        return c;
      c = ji(c);
    }
    return r;
  }
  let a = qy(n, o);
  for (; a && g_(a) && Bd(a); )
    a = qy(a, o);
  return a && Ni(a) && Bd(a) && !tm(a) ? r : a || v_(n) || r;
}
const k_ = async function(n) {
  const o = this.getOffsetParent || W0, r = this.getDimensions, a = await r(n.floating);
  return {
    reference: N_(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  };
};
function z_(n) {
  return yl(n).direction === "rtl";
}
const D_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: E_,
  getDocumentElement: Zo,
  getClippingRect: T_,
  getOffsetParent: W0,
  getElementRects: k_,
  getClientRects: C_,
  getDimensions: O_,
  getScale: aa,
  isElement: dn,
  isRTL: z_
};
function ex(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function j_(n, o, r) {
  let a = null, c;
  const f = Zo(n);
  function d() {
    var y;
    clearTimeout(c), (y = a) == null || y.disconnect(), a = null;
  }
  function m(y, v) {
    y === void 0 && (y = !1), v === void 0 && (v = 1), d();
    const S = n.getBoundingClientRect(), {
      left: C,
      top: w,
      width: A,
      height: O
    } = S;
    if (y || o(), !A || !O)
      return;
    const M = dr(w), T = dr(f.clientWidth - (C + A)), _ = dr(f.clientHeight - (w + O)), k = dr(C), q = {
      rootMargin: -M + "px " + -T + "px " + -_ + "px " + -k + "px",
      threshold: Xo(0, fa(1, v)) || 1
    };
    let B = !0;
    function j(P) {
      const te = P[0].intersectionRatio;
      if (!ex(S, n.getBoundingClientRect()))
        return m();
      if (te !== v) {
        if (!B)
          return m();
        te ? m(!1, te) : c = setTimeout(() => {
          m(!1, 1e-7);
        }, 1e3);
      }
      B = !1;
    }
    try {
      a = new IntersectionObserver(j, {
        ...q,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(j, q);
    }
    a.observe(n);
  }
  const g = hn(n), h = () => m(r);
  return g.addEventListener("resize", h), m(!0), () => {
    g.removeEventListener("resize", h), d();
  };
}
function Py(n, o, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = a, h = lm(n), y = c || f ? [...h ? ha(h) : [], ...o ? ha(o) : []] : [];
  y.forEach((M) => {
    c && M.addEventListener("scroll", r), f && M.addEventListener("resize", r);
  });
  const v = h && m ? j_(h, r, f) : null;
  let S = -1, C = null;
  d && (C = new ResizeObserver((M) => {
    let [T] = M;
    T && T.target === h && C && o && (C.unobserve(o), cancelAnimationFrame(S), S = requestAnimationFrame(() => {
      var _;
      (_ = C) == null || _.observe(o);
    })), r();
  }), h && !g && C.observe(h), o && C.observe(o));
  let w, A = g ? gr(n) : null;
  g && O();
  function O() {
    const M = gr(n);
    A && !ex(A, M) && r(), A = M, w = requestAnimationFrame(O);
  }
  return r(), () => {
    var M;
    y.forEach((T) => {
      c && T.removeEventListener("scroll", r), f && T.removeEventListener("resize", r);
    }), v?.(), (M = C) == null || M.disconnect(), C = null, g && cancelAnimationFrame(w);
  };
}
const L_ = d_, V_ = h_, I_ = u_, H_ = p_, U_ = m_, B_ = (n, o, r) => {
  const a = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...D_,
    ...c.platform,
    _c: a
  };
  return c_(n, o, {
    ...c,
    platform: f
  });
};
var G_ = typeof document < "u", Y_ = function() {
}, Kc = G_ ? b.useLayoutEffect : Y_;
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
function tx(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Xy(n, o) {
  const r = tx(n);
  return Math.round(o * r) / r;
}
function Gd(n) {
  const o = b.useRef(n);
  return Kc(() => {
    o.current = n;
  }), o;
}
function q_(n) {
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
    transform: m = !0,
    whileElementsMounted: g,
    open: h
  } = n, [y, v] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [S, C] = b.useState(a);
  tu(S, a) || C(a);
  const [w, A] = b.useState(null), [O, M] = b.useState(null), T = b.useCallback((F) => {
    F !== q.current && (q.current = F, A(F));
  }, []), _ = b.useCallback((F) => {
    F !== B.current && (B.current = F, M(F));
  }, []), k = f || w, I = d || O, q = b.useRef(null), B = b.useRef(null), j = b.useRef(y), P = g != null, te = Gd(g), se = Gd(c), fe = Gd(h), le = b.useCallback(() => {
    if (!q.current || !B.current)
      return;
    const F = {
      placement: o,
      strategy: r,
      middleware: S
    };
    se.current && (F.platform = se.current), B_(q.current, B.current, F).then((ve) => {
      const ae = {
        ...ve,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: fe.current !== !1
      };
      he.current && !tu(j.current, ae) && (j.current = ae, pa.flushSync(() => {
        v(ae);
      }));
    });
  }, [S, o, r, se, fe]);
  Kc(() => {
    h === !1 && j.current.isPositioned && (j.current.isPositioned = !1, v((F) => ({
      ...F,
      isPositioned: !1
    })));
  }, [h]);
  const he = b.useRef(!1);
  Kc(() => (he.current = !0, () => {
    he.current = !1;
  }), []), Kc(() => {
    if (k && (q.current = k), I && (B.current = I), k && I) {
      if (te.current)
        return te.current(k, I, le);
      le();
    }
  }, [k, I, le, te, P]);
  const be = b.useMemo(() => ({
    reference: q,
    floating: B,
    setReference: T,
    setFloating: _
  }), [T, _]), V = b.useMemo(() => ({
    reference: k,
    floating: I
  }), [k, I]), H = b.useMemo(() => {
    const F = {
      position: r,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return F;
    const ve = Xy(V.floating, y.x), ae = Xy(V.floating, y.y);
    return m ? {
      ...F,
      transform: "translate(" + ve + "px, " + ae + "px)",
      ...tx(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ve,
      top: ae
    };
  }, [r, m, V.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: le,
    refs: be,
    elements: V,
    floatingStyles: H
  }), [y, le, be, V, H]);
}
const P_ = (n, o) => {
  const r = L_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, X_ = (n, o) => {
  const r = V_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, K_ = (n, o) => ({
  fn: U_(n).fn,
  options: [n, o]
}), F_ = (n, o) => {
  const r = I_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, Q_ = (n, o) => {
  const r = H_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var Z_ = Object.defineProperty, om = (n, o) => Z_(n, "name", { value: o, configurable: !0 }), Yd = !1;
function nx() {
  const [n, o] = b.useState(Yd);
  return b.useEffect(() => {
    Yd || (Yd = !0, o(!0));
  }, []), n;
}
om(nx, "useIsHydrated");
var lx = Er[" useSyncExternalStore ".trim().toString()];
function ox() {
  return () => {
  };
}
om(ox, "subscribe");
function ix() {
  return lx(
    ox,
    () => !0,
    () => !1
  );
}
om(ix, "useIsHydratedModern");
var $_ = typeof lx == "function" ? ix : nx, J_ = Object.defineProperty, Rr = (n, o) => J_(n, "name", { value: o, configurable: !0 }), qd = "rovingFocusGroup.onEntryFocus", W_ = { bubbles: !1, cancelable: !0 }, bu = "RovingFocusGroup", [wh, rx, eM] = /* @__PURE__ */ su(bu), [tM, ax] = /* @__PURE__ */ Ui(
  bu,
  [eM]
), [nM, lM] = tM(bu), oM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rr(function(o, r) {
    return /* @__PURE__ */ x.jsx(wh.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(wh.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ x.jsx(iM, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), iM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Rr(function(o, r) {
  const {
    __scopeRovingFocusGroup: a,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: m,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: h,
    onEntryFocus: y,
    preventScrollOnEntryFocus: v = !1,
    ...S
  } = o, C = b.useRef(null), w = Kn(r, C), A = Rs(d), [O, M] = Qo({
    prop: m,
    defaultProp: g ?? null,
    onChange: h,
    caller: bu
  }), [T, _] = b.useState(!1), k = q0(y), I = rx(a), q = b.useRef(!1), [B, j] = b.useState(0);
  return b.useEffect(() => {
    const P = C.current;
    if (P)
      return P.addEventListener(qd, k), () => P.removeEventListener(qd, k);
  }, [k]), /* @__PURE__ */ x.jsx(
    nM,
    {
      scope: a,
      orientation: c,
      dir: A,
      loop: f,
      currentTabStopId: O,
      onItemFocus: b.useCallback(
        (P) => M(P),
        [M]
      ),
      onItemShiftTab: b.useCallback(() => _(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => j((P) => P + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => j((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ x.jsx(
        Un.div,
        {
          tabIndex: T || B === 0 ? -1 : 0,
          "data-orientation": c,
          ...S,
          ref: w,
          style: { outline: "none", ...o.style },
          onMouseDown: Xn(o.onMouseDown, () => {
            q.current = !0;
          }),
          onFocus: Xn(o.onFocus, (P) => {
            const te = !q.current;
            if (P.target === P.currentTarget && te && !T) {
              const se = new CustomEvent(qd, W_);
              if (P.currentTarget.dispatchEvent(se), !se.defaultPrevented) {
                const fe = I().filter((H) => H.focusable), le = fe.find((H) => H.active), he = fe.find((H) => H.id === O), V = [le, he, ...fe].filter(
                  Boolean
                ).map((H) => H.ref.current);
                im(V, v);
              }
            }
            q.current = !1;
          }),
          onBlur: Xn(o.onBlur, () => _(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), rM = "RovingFocusGroupItem", aM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rr(function(o, r) {
    const {
      __scopeRovingFocusGroup: a,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...g
    } = o, h = cu(), y = d || h, v = lM(rM, a), S = v.currentTabStopId === y, C = rx(a), { onFocusableItemAdd: w, onFocusableItemRemove: A, currentTabStopId: O } = v, M = $_();
    return zi(() => {
      if (!(!M || !c))
        return w(), () => A();
    }, [M, c, w, A]), b.useEffect(() => {
      if (!(M || !c))
        return w(), () => A();
    }, [M, c, w, A]), /* @__PURE__ */ x.jsx(
      wh.ItemSlot,
      {
        scope: a,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ x.jsx(
          Un.span,
          {
            tabIndex: S ? 0 : -1,
            "data-orientation": v.orientation,
            ...g,
            ref: r,
            onMouseDown: Xn(o.onMouseDown, (T) => {
              c ? v.onItemFocus(y) : T.preventDefault();
            }),
            onFocus: Xn(o.onFocus, () => v.onItemFocus(y)),
            onKeyDown: Xn(o.onKeyDown, (T) => {
              if (T.key === "Tab" && T.shiftKey) {
                v.onItemShiftTab();
                return;
              }
              if (T.target !== T.currentTarget) return;
              const _ = cx(T, v.orientation, v.dir);
              if (_ !== void 0) {
                if (T.metaKey || T.ctrlKey || T.altKey || T.shiftKey) return;
                T.preventDefault();
                let I = C().filter((q) => q.focusable).map((q) => q.ref.current);
                if (_ === "last") I.reverse();
                else if (_ === "prev" || _ === "next") {
                  _ === "prev" && I.reverse();
                  const q = I.indexOf(T.currentTarget);
                  I = v.loop ? ux(I, q + 1) : I.slice(q + 1);
                }
                setTimeout(() => im(I));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: S, hasTabStop: O != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), sM = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function sx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
Rr(sx, "getDirectionAwareKey");
function cx(n, o, r) {
  const a = sx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return sM[a];
}
Rr(cx, "getFocusIntent");
function im(n, o = !1) {
  const r = document.activeElement;
  for (const a of n)
    if (a === r || (a.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
Rr(im, "focusFirst");
function ux(n, o) {
  return n.map((r, a) => n[(o + a) % n.length]);
}
Rr(ux, "wrapArray");
var cM = oM, uM = aM, fM = Object.defineProperty, dM = (n, o) => fM(n, "name", { value: o, configurable: !0 }), hM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ dM(function(o, r) {
    return /* @__PURE__ */ x.jsx(
      Un.label,
      {
        ...o,
        ref: r,
        onMouseDown: (a) => {
          a.target.closest("button, input, select, textarea") || (o.onMouseDown?.(a), !a.defaultPrevented && a.detail > 1 && a.preventDefault());
        }
      }
    );
  }, "Label")
), mM = hM, pM = Object.defineProperty, gM = (n, o) => pM(n, "name", { value: o, configurable: !0 });
function fx(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
gM(fx, "usePrevious");
var bM = Object.defineProperty, yM = (n, o) => bM(n, "name", { value: o, configurable: !0 });
function rm(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
yM(rm, "clamp");
var vM = Object.defineProperty, dx = (n, o) => vM(n, "name", { value: o, configurable: !0 }), Ky = "horizontal", xM = ["horizontal", "vertical"], SM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ dx(function(o, r) {
    const { decorative: a, orientation: c = Ky, ...f } = o, d = hx(c) ? c : Ky, g = a ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
    return /* @__PURE__ */ x.jsx(
      Un.div,
      {
        "data-orientation": d,
        ...g,
        ...f,
        ref: r
      }
    );
  }, "Separator")
);
function hx(n) {
  return xM.includes(n);
}
dx(hx, "isValidOrientation");
var EM = SM, CM = Object.defineProperty, At = (n, o) => CM(n, "name", { value: o, configurable: !0 }), mx = ["PageUp", "PageDown"], px = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], gx = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, _s = "Slider", [_h, RM, wM] = /* @__PURE__ */ su(_s), [am, tk] = /* @__PURE__ */ Ui(_s, [
  wM
]), [_M, Ms] = am(_s), MM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const {
      name: a,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: m = "horizontal",
      disabled: g = !1,
      minStepsBetweenThumbs: h = 0,
      defaultValue: y = [c],
      value: v,
      onValueChange: S = /* @__PURE__ */ At(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ At(() => {
      }, "onValueCommit"),
      inverted: w = !1,
      form: A,
      ...O
    } = o, M = b.useRef(/* @__PURE__ */ new Set()), T = b.useRef(0), _ = b.useRef(!1), I = m === "horizontal" ? AM : TM, [q, B] = b.useState(null), j = Kn(r, B), [P = [], te] = Qo({
      prop: v,
      defaultProp: y,
      onChange: /* @__PURE__ */ At((H) => {
        [...M.current][T.current]?.focus({
          preventScroll: !0,
          focusVisible: _.current
        }), _.current = !1, S(H);
      }, "onChange")
    }), se = b.useRef(P), fe = b.useRef(P);
    b.useEffect(() => {
      const H = A ? q?.ownerDocument.getElementById(A) : q?.closest("form");
      if (H instanceof HTMLFormElement) {
        const F = /* @__PURE__ */ At(() => te(fe.current), "reset");
        return H.addEventListener("reset", F), () => H.removeEventListener("reset", F);
      }
    }, [q, A, te]);
    function le(H) {
      const F = Rx(P, H);
      V(H, F);
    }
    At(le, "handleSlideStart");
    function he(H) {
      V(H, T.current);
    }
    At(he, "handleSlideMove");
    function be() {
      String(P) !== String(se.current) && C(P);
    }
    At(be, "handleSlideEnd");
    function V(H, F, { commit: ve } = { commit: !1 }) {
      const ae = cm(d), z = ds(Math.round((H - c) / d) * d + c, ae), K = rm(z, [c, f]);
      te((ne = []) => {
        const oe = Ex(ne, K, F);
        if (Mx(oe, h * d)) {
          T.current = oe.indexOf(K);
          const pe = String(oe) !== String(ne);
          return pe && ve && C(oe), pe ? oe : ne;
        } else
          return ne;
      });
    }
    return At(V, "updateValues"), /* @__PURE__ */ x.jsx(
      _M,
      {
        scope: o.__scopeSlider,
        name: a,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: T,
        thumbs: M.current,
        values: P,
        orientation: m,
        form: A,
        children: /* @__PURE__ */ x.jsx(_h.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ x.jsx(_h.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ x.jsx(
          I,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...O,
            ref: j,
            onPointerDown: Xn(O.onPointerDown, () => {
              g || (se.current = P, _.current = !1);
            }),
            min: c,
            max: f,
            inverted: w,
            onSlideStart: g ? void 0 : le,
            onSlideMove: g ? void 0 : he,
            onSlideEnd: g ? void 0 : be,
            onHomeKeyDown: () => {
              g || (_.current = !0, V(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              g || (_.current = !0, V(f, P.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: H, direction: F }) => {
              if (!g) {
                _.current = !0;
                const z = mx.includes(H.key) || H.shiftKey && px.includes(H.key) ? 10 : 1, K = T.current, ne = P[K], oe = Ax(ne, {
                  min: c,
                  step: d,
                  direction: F,
                  multiplier: z
                });
                V(oe, K, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [bx, yx] = am(_s, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), AM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const {
      min: a,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: m,
      onSlideMove: g,
      onSlideEnd: h,
      onStepKeyDown: y,
      ...v
    } = o, [S, C] = b.useState(null), w = Kn(r, C), A = b.useRef(void 0), O = Rs(f), M = O === "ltr", T = M && !d || !M && d;
    function _(k) {
      const I = A.current || S.getBoundingClientRect(), q = [0, I.width], j = yu(q, T ? [a, c] : [c, a]);
      return A.current = I, j(k - I.left);
    }
    return At(_, "getValueFromPointer"), /* @__PURE__ */ x.jsx(
      bx,
      {
        scope: o.__scopeSlider,
        startEdge: T ? "left" : "right",
        endEdge: T ? "right" : "left",
        direction: T ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ x.jsx(
          vx,
          {
            dir: O,
            "data-orientation": "horizontal",
            ...v,
            ref: w,
            style: {
              ...v.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (k) => {
              const I = _(k.clientX);
              m?.(I);
            },
            onSlideMove: (k) => {
              const I = _(k.clientX);
              g?.(I);
            },
            onSlideEnd: () => {
              A.current = void 0, h?.();
            },
            onStepKeyDown: (k) => {
              const q = gx[T ? "from-left" : "from-right"].includes(k.key);
              y?.({ event: k, direction: q ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), TM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const {
      min: a,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...y
    } = o, v = b.useRef(null), S = Kn(r, v), C = b.useRef(void 0), w = !f;
    function A(O) {
      const M = C.current || v.current.getBoundingClientRect(), T = [0, M.height], k = yu(T, w ? [c, a] : [a, c]);
      return C.current = M, k(O - M.top);
    }
    return At(A, "getValueFromPointer"), /* @__PURE__ */ x.jsx(
      bx,
      {
        scope: o.__scopeSlider,
        startEdge: w ? "bottom" : "top",
        endEdge: w ? "top" : "bottom",
        size: "height",
        direction: w ? 1 : -1,
        children: /* @__PURE__ */ x.jsx(
          vx,
          {
            "data-orientation": "vertical",
            ...y,
            ref: S,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (O) => {
              const M = A(O.clientY);
              d?.(M);
            },
            onSlideMove: (O) => {
              const M = A(O.clientY);
              m?.(M);
            },
            onSlideEnd: () => {
              C.current = void 0, g?.();
            },
            onStepKeyDown: (O) => {
              const T = gx[w ? "from-bottom" : "from-top"].includes(O.key);
              h?.({ event: O, direction: T ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), vx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const {
      __scopeSlider: a,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...y
    } = o, v = Ms(_s, a);
    return /* @__PURE__ */ x.jsx(
      Un.span,
      {
        ...y,
        ref: r,
        onKeyDown: Xn(o.onKeyDown, (S) => {
          S.key === "Home" ? (m(S), S.preventDefault()) : S.key === "End" ? (g(S), S.preventDefault()) : mx.concat(px).includes(S.key) && (h(S), S.preventDefault());
        }),
        onPointerDown: Xn(o.onPointerDown, (S) => {
          const C = S.target;
          C.setPointerCapture(S.pointerId), S.preventDefault(), v.thumbs.has(C) ? C.focus({ preventScroll: !0, focusVisible: !1 }) : c(S);
        }),
        onPointerMove: Xn(o.onPointerMove, (S) => {
          S.target.hasPointerCapture(S.pointerId) && f(S);
        }),
        onPointerUp: Xn(o.onPointerUp, (S) => {
          const C = S.target;
          C.hasPointerCapture(S.pointerId) && (C.releasePointerCapture(S.pointerId), d(S));
        })
      }
    );
  }, "SliderImpl")
), OM = "SliderTrack", NM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Ms(OM, a);
    return /* @__PURE__ */ x.jsx(
      Un.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...c,
        ref: r
      }
    );
  }, "SliderTrack")
), Fy = "SliderRange", kM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Ms(Fy, a), d = yx(Fy, a), m = b.useRef(null), g = Kn(r, m), h = f.values.length, y = f.values.map(
      (C) => sm(C, f.min, f.max)
    ), v = h > 1 ? Math.min(...y) : 0, S = 100 - Math.max(...y);
    return /* @__PURE__ */ x.jsx(
      Un.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...c,
        ref: g,
        style: {
          ...o.style,
          [d.startEdge]: v + "%",
          [d.endEdge]: S + "%"
        }
      }
    );
  }, "SliderRange")
), zM = "SliderThumb", [DM, xx] = am(zM), jM = "SliderThumbProvider";
function Sx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: a,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = Ms(jM, o), d = RM(o), [m, g] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((O) => O.ref.current === m) : -1,
    [d, m]
  ), y = P0(m), v = m ? !!f.form || !!m.closest("form") : !0, S = f.values[h], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), w = S === void 0 ? 0 : sm(S, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const A = {
    value: S,
    name: C,
    form: f.form,
    isFormControl: v,
    index: h,
    thumb: m,
    onThumbChange: g,
    percent: w,
    size: y
  };
  return /* @__PURE__ */ x.jsx(DM, { scope: o, ...A, children: Tx(c) ? c(A) : a });
}
At(Sx, "SliderThumbProvider");
var Pd = "SliderThumbTrigger", LM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Ms(Pd, a), d = yx(Pd, a), { index: m, value: g, percent: h, size: y, onThumbChange: v } = xx(
      Pd,
      a
    ), S = Kn(r, v), C = Cx(m, f.values.length), w = y?.[d.size], A = w ? wx(w, h, d.direction) : 0;
    return /* @__PURE__ */ x.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${A}px)`
        },
        children: /* @__PURE__ */ x.jsx(_h.ItemSlot, { scope: a, children: /* @__PURE__ */ x.jsx(
          Un.span,
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
            ref: S,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: Xn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), VM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ At(function(o, r) {
    const { __scopeSlider: a, name: c, ...f } = o;
    return /* @__PURE__ */ x.jsx(
      Sx,
      {
        __scopeSlider: a,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
          /* @__PURE__ */ x.jsx(
            LM,
            {
              ...f,
              ref: r,
              __scopeSlider: a
            }
          ),
          m ? /* @__PURE__ */ x.jsx(
            HM,
            {
              __scopeSlider: a
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), IM = "SliderBubbleInput", HM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ At(function({ __scopeSlider: o, ...r }, a) {
    const { value: c, name: f, form: d } = xx(IM, o), m = b.useRef(null), g = Kn(m, a), h = fx(c);
    return b.useEffect(() => {
      const y = m.current;
      if (!y) return;
      const v = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(v, "value").set;
      if (h !== c && C) {
        const w = new Event("input", { bubbles: !0 });
        C.call(y, c), y.dispatchEvent(w);
      }
    }, [h, c]), /* @__PURE__ */ x.jsx(
      Un.input,
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
function Ex(n = [], o, r) {
  const a = [...n];
  return a[r] = o, a.sort((c, f) => c - f);
}
At(Ex, "getNextSortedValues");
function sm(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return rm(f, [0, 100]);
}
At(sm, "convertValueToPercentage");
function Cx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
At(Cx, "getLabel");
function Rx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), a = Math.min(...r);
  return r.indexOf(a);
}
At(Rx, "getClosestValueIndex");
function wx(n, o, r) {
  const a = n / 2, f = yu([0, 50], [0, a]);
  return (a - f(o) * r) * r;
}
At(wx, "getThumbInBoundsOffset");
function _x(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
At(_x, "getStepsBetweenValues");
function Mx(n, o) {
  if (o > 0) {
    const r = _x(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
At(Mx, "hasMinStepsBetweenValues");
function yu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const a = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + a * (r - n[0]);
  };
}
At(yu, "linearScale");
function cm(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [a, c] = o.split("e"), f = a.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
At(cm, "getDecimalCount");
function ds(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
At(ds, "roundValue");
function Ax(n, {
  min: o,
  step: r,
  direction: a,
  multiplier: c
}) {
  const f = cm(r), d = (n - o) / r, m = Math.round(d), g = ds(m * r + o, f) === ds(n, f);
  let h;
  return g ? h = m + c * a : a > 0 ? h = Math.ceil(d) : h = Math.floor(d), ds(h * r + o, f);
}
At(Ax, "getNextStepValue");
function Tx(n) {
  return typeof n == "function";
}
At(Tx, "isFunction");
var UM = Object.defineProperty, BM = (n, o) => UM(n, "name", { value: o, configurable: !0 }), GM = "Toggle", YM = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ BM(function(o, r) {
    const { pressed: a, defaultPressed: c, onPressedChange: f, ...d } = o, [m, g] = Qo({
      prop: a,
      onChange: f,
      defaultProp: c ?? !1,
      caller: GM
    });
    return /* @__PURE__ */ x.jsx(
      Un.button,
      {
        type: "button",
        "aria-pressed": m,
        "data-state": m ? "on" : "off",
        "data-disabled": o.disabled ? "" : void 0,
        ...d,
        ref: r,
        onClick: Xn(o.onClick, () => {
          o.disabled || g(!m);
        })
      }
    );
  }, "Toggle")
), qM = Object.defineProperty, Li = (n, o) => qM(n, "name", { value: o, configurable: !0 }), ba = "ToggleGroup", [Ox, nk] = /* @__PURE__ */ Ui(ba, [
  ax
]), Nx = ax(), PM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
  const { type: a, ...c } = o;
  if (a === "single") {
    const f = c;
    return /* @__PURE__ */ x.jsx(XM, { role: "radiogroup", ...f, ref: r });
  }
  if (a === "multiple") {
    const f = c;
    return /* @__PURE__ */ x.jsx(KM, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${ba}\``);
}, "ToggleGroup")), [kx, zx] = Ox(ba), XM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Li(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Qo({
    prop: a,
    defaultProp: c ?? "",
    onChange: f,
    caller: ba
  });
  return /* @__PURE__ */ x.jsx(
    kx,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ x.jsx(Dx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), KM = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Li(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Qo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: ba
  }), h = b.useCallback(
    (v) => g((S = []) => [...S, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((S = []) => S.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ x.jsx(
    kx,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ x.jsx(Dx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [FM, QM] = Ox(ba), Dx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Li(function(o, r) {
    const {
      __scopeToggleGroup: a,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: m,
      loop: g = !0,
      ...h
    } = o, y = Nx(a), v = Rs(m), S = { dir: v, ...h };
    return /* @__PURE__ */ x.jsx(FM, { scope: a, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ x.jsx(
      cM,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: v,
        loop: g,
        children: /* @__PURE__ */ x.jsx(Un.div, { ...S, ref: r })
      }
    ) : /* @__PURE__ */ x.jsx(Un.div, { ...S, ref: r }) });
  }, "ToggleGroupImpl")
), Mh = "ToggleGroupItem", ZM = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Li(function(o, r) {
    const a = zx(Mh, o.__scopeToggleGroup), c = QM(Mh, o.__scopeToggleGroup), f = Nx(o.__scopeToggleGroup), d = a.value.includes(o.value), m = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ x.jsx(
      uM,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ x.jsx(Qy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ x.jsx(Qy, { ...g, ref: r });
  }, "ToggleGroupItem")
), Qy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Li(function(o, r) {
    const { __scopeToggleGroup: a, value: c, ...f } = o, d = zx(Mh, a), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ x.jsx(
      YM,
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
function um({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(qw, { "data-slot": "accordion", ...n });
}
function _i({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    Pw,
    {
      "data-slot": "accordion-item",
      className: Je("border-b last:border-b-0", n),
      ...o
    }
  );
}
function Mi({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsx(Xw, { className: "flex", children: /* @__PURE__ */ x.jsxs(
    Kw,
    {
      "data-slot": "accordion-trigger",
      className: Je(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsx(u0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function Ai({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    Fw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ x.jsx("div", { className: Je("pt-0 pb-4", n), children: o })
    }
  );
}
const Zy = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, $y = Fv, wr = (n, o) => (r) => {
  var a;
  if (o?.variants == null) return $y(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], v = f?.[h];
    if (y === null) return null;
    const S = Zy(y) || Zy(v);
    return c[h][S];
  }), m = r && Object.entries(r).reduce((h, y) => {
    let [v, S] = y;
    return S === void 0 || (h[v] = S), h;
  }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((h, y) => {
    let { class: v, className: S, ...C } = y;
    return Object.entries(C).every((w) => {
      let [A, O] = w;
      return Array.isArray(O) ? O.includes({
        ...f,
        ...m
      }[A]) : {
        ...f,
        ...m
      }[A] === O;
    }) ? [
      ...h,
      v,
      S
    ] : h;
  }, []);
  return $y(n, d, g, r?.class, r?.className);
}, $M = wr(
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
function ki({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? p0 : "button";
  return /* @__PURE__ */ x.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: Je($M({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function JM({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ x.jsx(
    EM,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: o,
      className: Je(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        n
      ),
      ...a
    }
  );
}
const WM = wr(
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
function eA({
  className: n,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": o,
      className: Je(WM({ orientation: o }), n),
      ...r
    }
  );
}
function fm({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card",
      className: Je(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        n
      ),
      ...o
    }
  );
}
function dm({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: Je(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        n
      ),
      ...o
    }
  );
}
function hm({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: Je("leading-none font-semibold", n),
      ...o
    }
  );
}
function mm({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: Je("px-6", n),
      ...o
    }
  );
}
function tA({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(U0, { "data-slot": "collapsible", ...n });
}
function nA({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(
    V0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function lA({
  ...n
}) {
  return /* @__PURE__ */ x.jsx(
    H0,
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
  } = b.useRef(n !== void 0), [f, d] = b.useState(o), m = c ? n : f, g = b.useCallback((h) => {
    c || d(h);
  }, []);
  return [m, g];
}
const pm = {
  ...Er
}, Jy = {};
function zl(n, o) {
  const r = b.useRef(Jy);
  return r.current === Jy && (r.current = n(o)), r;
}
const Xd = pm.useInsertionEffect, oA = (
  // React 17 doesn't have useInsertionEffect.
  Xd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Xd !== pm.useLayoutEffect ? Xd : (n) => n()
);
function Fe(n) {
  const o = zl(iA).current;
  return o.next = n, oA(o.effect), o.trampoline;
}
function iA() {
  const n = {
    next: void 0,
    callback: rA,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function rA() {
}
const aA = () => {
}, Qe = typeof document < "u" ? b.useLayoutEffect : aA, jx = /* @__PURE__ */ b.createContext({
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
function sA() {
  return b.useContext(jx);
}
function cA(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: a,
    onMapChange: c
  } = n, f = Fe(c), [, d] = b.useState(!1), m = zl(fA).current, g = zl(uA).current, h = b.useRef(0), y = b.useRef(!0), v = b.useRef([]), S = b.useRef(null), C = Fe(() => {
    y.current || (y.current = !0, d((I) => !I));
  }), w = Fe((I, q) => {
    g.set(I, q), C();
  }), A = Fe((I) => {
    g.delete(I), C();
  }), O = Fe((I) => {
    const q = /* @__PURE__ */ new Map();
    return r.current.length = 0, a && (a.current.length = 0), I.forEach((B) => {
      q.set(B.element, {
        ...B.registration.metadata ?? {},
        index: B.index
      }), r.current[B.index] = B.element, a && (a.current[B.index] = B.registration.label !== void 0 ? B.registration.label : B.registration.textRef?.current?.textContent ?? B.element.textContent);
    }), h.current = r.current.length, q;
  });
  function M(I) {
    if (S.current?.disconnect(), S.current = null, typeof MutationObserver != "function" || I.length < 2)
      return;
    const q = new MutationObserver((j) => {
      if (!mA(j))
        return;
      let P = null;
      for (const te of I)
        if (te.isConnected) {
          if (P && Lx(P, te) > 0) {
            q.disconnect(), C();
            return;
          }
          P = te;
        }
    });
    S.current = q;
    const B = /* @__PURE__ */ new Set();
    for (let j = 1; j < I.length; j += 1) {
      const P = hA(I[j - 1], I[j]);
      P && B.add(P);
    }
    B.forEach((j) => q.observe(j, {
      childList: !0
    }));
  }
  const T = Fe(() => {
    const [I, q] = dA(g), B = O(I);
    M(q), v.current = I, y.current = !1, m.forEach((j) => j(B)), f(B);
  });
  Qe(() => (y.current || O(v.current), () => {
    r.current = [], a && (a.current = []);
  }), [r, a, O]), Qe(() => {
    y.current && T();
  }), Qe(() => () => {
    S.current?.disconnect(), y.current = !0;
  }, []);
  const _ = Fe((I) => (m.add(I), () => {
    m.delete(I);
  })), k = b.useMemo(() => ({
    register: w,
    unregister: A,
    subscribeMapChange: _,
    nextIndexRef: h
  }), [w, A, _, h]);
  return /* @__PURE__ */ x.jsx(jx.Provider, {
    value: k,
    children: o
  });
}
function uA() {
  return /* @__PURE__ */ new Map();
}
function fA() {
  return /* @__PURE__ */ new Set();
}
function dA(n) {
  const o = /* @__PURE__ */ new Set(), r = [], a = [];
  n.forEach((f, d) => {
    if (!d.isConnected)
      return;
    const m = f.index, g = {
      index: m ?? -1,
      element: d,
      registration: f
    };
    m === null ? a.push(g) : m >= 0 && (o.add(m), r.push(g));
  });
  let c = 0;
  return a.sort((f, d) => Lx(f.element, d.element)), a.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, a.map((f) => f.element)];
}
function hA(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function mA(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Lx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function pA(n, o) {
  return function(a, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", a.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${a}; visit ${f} for the full message.`;
  };
}
const Ro = pA("https://base-ui.com/production-error", "Base UI");
function br(n, o, r, a) {
  const c = zl(Vx).current;
  return bA(c, n, o, r, a) && Ix(c, [n, o, r, a]), c.callback;
}
function gA(n) {
  const o = zl(Vx).current;
  return yA(o, n) && Ix(o, n), o.callback;
}
function Vx() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function bA(n, o, r, a, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== a || n.refs[3] !== c;
}
function yA(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, a) => r !== o[a]);
}
function Ix(n, o) {
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
const vA = parseInt(b.version, 10);
function gm(n) {
  return vA >= n;
}
function Wy(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (gm(19) ? r?.ref : o.ref) ?? null;
}
function Ah(n, o) {
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
const ia = Object.freeze([]), bl = Object.freeze({});
function xA(n, o) {
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
function SA(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function EA(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const bm = {};
function sa(n, o, r, a, c) {
  if (!r && !a && !c && !n)
    return nu(o);
  let f = nu(n);
  return o && (f = fs(f, o)), r && (f = fs(f, r)), a && (f = fs(f, a)), c && (f = fs(f, c)), f;
}
function CA(n) {
  if (n.length === 0)
    return bm;
  if (n.length === 1)
    return nu(n[0]);
  let o = nu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = fs(o, n[r]);
  return o;
}
function nu(n) {
  return ym(n) ? {
    ...Ux(n, bm)
  } : RA(n);
}
function fs(n, o) {
  return ym(o) ? Ux(o, n) : wA(n, o);
}
function RA(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const a = o[r];
    Hx(r, a) && (o[r] = Bx(a));
  }
  return o;
}
function wA(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const a = o[r];
    switch (r) {
      case "style": {
        n[r] = Ah(n.style, a);
        break;
      }
      case "className": {
        n[r] = Gx(n.className, a);
        break;
      }
      default:
        Hx(r, a) ? n[r] = _A(n[r], a) : n[r] = a;
    }
  }
  return n;
}
function Hx(n, o) {
  const r = n.charCodeAt(0), a = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && a === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function ym(n) {
  return typeof n == "function";
}
function Ux(n, o) {
  return ym(n) ? n(o) : n ?? bm;
}
function _A(n, o) {
  return o ? n ? (...r) => {
    const a = r[0];
    if (Yx(a)) {
      const f = a;
      lu(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : Bx(o) : n;
}
function Bx(n) {
  return n && ((...o) => {
    const r = o[0];
    return Yx(r) && lu(r), n(...o);
  });
}
function lu(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function Gx(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function Yx(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function $l(n, o, r = {}) {
  const a = o.render, c = MA(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? bl;
  return OA(n, a, c, f);
}
function MA(n, o = {}) {
  const {
    className: r,
    style: a,
    render: c
  } = n, {
    state: f = bl,
    ref: d,
    props: m,
    stateAttributesMapping: g,
    enabled: h = !0
  } = o, y = h ? SA(r, f) : void 0, v = h ? EA(a, f) : void 0, S = h ? xA(f, g) : bl, C = h && m ? AA(m) : void 0, w = h ? Ah(S, C) ?? {} : bl;
  return typeof document < "u" && (h ? Array.isArray(d) ? w.ref = gA([w.ref, Wy(c), ...d]) : w.ref = br(w.ref, Wy(c), d) : br(null, null)), h ? (y !== void 0 && (w.className = Gx(w.className, y)), v !== void 0 && (w.style = Ah(w.style, v)), w) : bl;
}
function AA(n) {
  return Array.isArray(n) ? CA(n) : sa(void 0, n);
}
const TA = /* @__PURE__ */ Symbol.for("react.lazy");
function OA(n, o, r, a) {
  if (o) {
    if (typeof o == "function")
      return o(r, a);
    const c = sa(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === TA && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return NA(n, r);
  throw new Error(Ro(8));
}
function NA(n, o) {
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
let ev = 0;
function kA(n, o = "mui") {
  const [r, a] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (ev += 1, a(`${o}-${ev}`));
  }, [r, o]), c;
}
const tv = pm.useId;
function vm(n, o) {
  if (tv !== void 0) {
    const r = tv();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return kA(n, o);
}
function vu(n) {
  return vm(n, "base-ui");
}
const Kl = "none", qx = "trigger-press", zA = "trigger-hover", xm = "outside-press", DA = "item-press", jA = "close-press", nv = "clear-press", hs = "input-change", vo = "input-clear", LA = "input-press", xu = "focus-out", Sm = "escape-key", Th = "list-navigation", Em = "keyboard", Cm = "pointer", VA = "cancel-open";
function vt(n, o, r, a) {
  let c = !1, f = !1;
  const d = bl;
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
function IA(n, o, r) {
  const a = r ?? bl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...a
  };
}
function Px(n) {
  b.useEffect(n, ia);
}
const Vc = null;
class HA {
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
let Ic = new HA();
class xo {
  static create() {
    return new xo();
  }
  static request(o) {
    return Ic.request(o);
  }
  static cancel(o) {
    return Ic.cancel(o);
  }
  currentId = Vc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = Ic.request(() => {
      this.currentId = Vc, o();
    });
  }
  cancel = () => {
    this.currentId !== Vc && (Ic.cancel(this.currentId), this.currentId = Vc);
  };
  disposeEffect = () => this.cancel;
}
function ps() {
  const n = zl(xo.create).current;
  return Px(n.disposeEffect), n;
}
function Rm(n, o = !1, r = !1) {
  const [a, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && a !== "ending" && !r && c("ending"), !n && !f && a === "ending" && c(void 0), Qe(() => {
    if (!n && f && a !== "ending" && r) {
      const m = xo.request(() => {
        c("ending");
      });
      return () => {
        xo.cancel(m);
      };
    }
  }, [n, f, a, r]), Qe(() => {
    if (!n || o)
      return;
    const m = xo.request(() => {
      c(void 0);
    });
    return () => {
      xo.cancel(m);
    };
  }, [o, n]), Qe(() => {
    if (!n || !o)
      return;
    n && f && a !== "idle" && c("starting");
    const m = xo.request(() => {
      c("idle");
    });
    return () => {
      xo.cancel(m);
    };
  }, [o, n, f, a]), {
    mounted: f,
    setMounted: d,
    transitionStatus: a
  };
}
function UA(n = {}) {
  const {
    guess: o,
    label: r,
    metadata: a,
    textRef: c,
    index: f
  } = n, {
    register: d,
    unregister: m,
    subscribeMapChange: g,
    nextIndexRef: h
  } = sA(), y = b.useRef(-1), [v, S] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const O = h.current;
      h.current += 1, y.current = O;
    }
    return y.current;
  } : -1), C = f ?? v, w = b.useRef(null), A = b.useCallback((O) => {
    const M = w.current;
    M && m(M), w.current = O, O && d(O, {
      metadata: a ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, m, a, r, c]);
  return Qe(() => {
    if (f == null)
      return g((O) => {
        const M = w.current ? O.get(w.current)?.index : null;
        M != null && S(M);
      });
  }, [f, g]), {
    ref: A,
    index: C
  };
}
let lv = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const BA = {
  "data-starting-style": ""
}, GA = {
  "data-ending-style": ""
}, Su = {
  transitionStatus(n) {
    return n === "starting" ? BA : n === "ending" ? GA : null;
  }
}, YA = /* @__PURE__ */ b.createContext(void 0);
function qA(n = !1) {
  const o = b.useContext(YA);
  if (o === void 0 && !n)
    throw new Error(Ro(16));
  return o;
}
function PA(n) {
  const {
    focusableWhenDisabled: o,
    disabled: r,
    composite: a = !1,
    tabIndex: c = 0,
    isNativeButton: f
  } = n, d = a && o !== !1, m = a && o === !1;
  return {
    props: b.useMemo(() => {
      const h = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(y) {
          r && o && y.key !== "Tab" && y.preventDefault();
        }
      };
      return a || (h.tabIndex = c, !f && r && (h.tabIndex = o ? c : -1)), (f && (o || d) || !f && r) && (h["aria-disabled"] = r), f && (!o || m) && (h.disabled = r), h;
    }, [a, r, o, d, m, f, c])
  };
}
function $t(n) {
  return n?.ownerDocument || document;
}
function Qc(n, o, {
  detail: r = 0
} = {}) {
  n.dispatchEvent(new (hn(n)).PointerEvent("click", {
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
function As(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: a = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = qA(!0), g = f ?? m !== void 0, {
    props: h
  } = PA({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: a,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const C = d.current;
    Kd(C) && g && o && h.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, h.disabled, g]);
  Qe(y, [y]);
  const v = b.useCallback((C = {}) => {
    const {
      onClick: w,
      onMouseDown: A,
      onKeyUp: O,
      onKeyDown: M,
      onPointerDown: T,
      ..._
    } = C;
    return sa({
      onClick(k) {
        if (o) {
          k.preventDefault();
          return;
        }
        w?.(k);
      },
      onMouseDown(k) {
        o || A?.(k);
      },
      onKeyDown(k) {
        if (o || (lu(k), M?.(k), k.baseUIHandlerPrevented))
          return;
        const I = k.target === k.currentTarget, q = k.currentTarget, B = Kd(q), j = !c && XA(q), P = I && (c ? B : !j), te = k.key === "Enter", se = k.key === " ", fe = q.getAttribute("role"), le = fe?.startsWith("menuitem") || fe === "option" || fe === "gridcell";
        if (I && g && se) {
          if (k.defaultPrevented && le)
            return;
          k.preventDefault(), (!c || B) && (k.preventBaseUIHandler(), Qc(q, k));
          return;
        }
        if (!P || c || !se && !te) {
          I && j && se && k.preventDefault();
          return;
        }
        k.defaultPrevented || (k.preventDefault(), te && (k.preventBaseUIHandler(), Qc(q, k)));
      },
      onKeyUp(k) {
        if (!o) {
          if (lu(k), O?.(k), k.target === k.currentTarget && c && g && Kd(k.currentTarget) && k.key === " ") {
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
        T?.(k);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, _);
  }, [o, h, g, c]), S = Fe((C) => {
    d.current = C, y();
  });
  return {
    getButtonProps: v,
    buttonRef: S
  };
}
function Kd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function XA(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Gt(n, o, r, a) {
  return n.addEventListener(o, r, a), () => {
    n.removeEventListener(o, r, a);
  };
}
function gl(n) {
  const o = zl(KA, n).current;
  return o.next = n, Qe(o.effect), o;
}
function KA(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Po(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function FA(n, o = !1) {
  const r = ps();
  return Fe((a, c = null) => {
    r.cancel();
    const f = Po(n);
    if (f == null)
      return;
    const d = f, m = () => {
      pa.flushSync(a);
    };
    if (typeof d.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      a();
      return;
    }
    function g() {
      Promise.all(d.getAnimations().map((h) => h.finished)).then(() => {
        c?.aborted || m();
      }, () => {
        if (c?.aborted)
          return;
        if (d.getAnimations().some((y) => y.pending || y.playState !== "finished")) {
          g();
          return;
        }
        m();
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
function Eu(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: a,
    onComplete: c
  } = n, f = Fe(c), d = FA(a, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function QA() {
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
  userAgent: ZA,
  platform: $A,
  maxTouchPoints: JA
} = QA(), Cu = ZA.toLowerCase(), gs = $A.toLowerCase(), Ts = /^i(os$|p)/.test(gs) || gs === "macintel" && JA > 1, ov = "android", ou = gs === ov || Cu.includes(ov), WA = !Ts && gs.startsWith("mac");
gs.startsWith("win");
const e2 = WA || Ts, _r = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), iv = !_r && Cu.includes("firefox");
!_r && Cu.includes("chrom");
const t2 = e2, Xx = /jsdom|happydom/.test(Cu), as = 0;
class yr {
  static create() {
    return new yr();
  }
  currentId = as;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = as, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== as;
  }
  clear = () => {
    this.currentId !== as && (clearTimeout(this.currentId), this.currentId = as);
  };
  disposeEffect = () => this.clear;
}
function Vi() {
  const n = zl(yr.create).current;
  return Px(n.disposeEffect), n;
}
let rv = {}, av = {}, sv = "";
function Ru(n, o) {
  return ws(n) ? n : o;
}
function cv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Ru(o, r)).overflowY);
}
function n2(n) {
  if (typeof document > "u")
    return !1;
  const o = $t(n);
  return hn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function l2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = $t(n), a = r.documentElement, c = r.body, f = Ru(a, c), d = f.style.overflowY, m = a.style.scrollbarGutter;
  a.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, a.style.scrollbarGutter = m, g === h;
}
function o2(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = Ru(r, a), f = {
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
function i2(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = hn(r);
  let f = 0, d = 0, m = !1;
  const g = xo.create();
  if (_r && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const C = c.getComputedStyle(r), w = c.getComputedStyle(a), M = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, rv = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, sv = r.style.scrollBehavior, av = {
      position: a.style.position,
      height: a.style.height,
      width: a.style.width,
      boxSizing: a.style.boxSizing,
      overflowY: a.style.overflowY,
      overflowX: a.style.overflowX,
      scrollBehavior: a.style.scrollBehavior
    };
    const T = r.scrollHeight > r.clientHeight, _ = r.scrollWidth > r.clientWidth, k = C.overflowY === "scroll" || w.overflowY === "scroll", I = C.overflowX === "scroll" || w.overflowX === "scroll", q = Math.max(0, c.innerWidth - a.clientWidth), B = Math.max(0, c.innerHeight - a.clientHeight), j = parseFloat(w.marginTop) + parseFloat(w.marginBottom), P = parseFloat(w.marginLeft) + parseFloat(w.marginRight), te = Ru(r, a);
    if (m = l2(n), m) {
      r.style.scrollbarGutter = M, te.style.overflowY = "hidden", te.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: M,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (T || k) && (r.style.overflowY = "scroll"), (_ || I) && (r.style.overflowX = "scroll"), Object.assign(a.style, {
      position: "relative",
      height: j || B ? `calc(100dvh - ${j + B}px)` : "100dvh",
      width: P || q ? `calc(100vw - ${P + q}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), a.scrollTop = f, a.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, rv), Object.assign(a.style, av), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = sv);
  }
  function v() {
    y(), g.request(h);
  }
  h();
  const S = Gt(c, "resize", v);
  return () => {
    g.cancel(), y(), typeof c.removeEventListener == "function" && S();
  };
}
class r2 {
  lockCount = 0;
  restore = null;
  timeoutLock = yr.create();
  timeoutUnlock = yr.create();
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
    const r = $t(o), a = r.documentElement, c = r.body, f = hn(a);
    if (cv(f, a, c)) {
      const m = new f.MutationObserver(() => {
        cv(f, a, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      m.observe(a, g), m.observe(c, g), this.restore = () => m.disconnect();
      return;
    }
    const d = Ts || !n2(o);
    this.restore = d ? o2(o) : i2(o);
  }
}
const a2 = new r2();
function s2(n = !0, o = null) {
  Qe(() => {
    if (n)
      return a2.acquire(o);
  }, [n, o]);
}
function On(n) {
  n.preventDefault(), n.stopPropagation();
}
function c2(n) {
  return "nativeEvent" in n;
}
function Kx(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : ou && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function wm(n) {
  return Xx ? !1 : !ou && n.width === 0 && n.height === 0 || ou && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Fd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function u2(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Oh = "data-base-ui-focusable", f2 = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", hr = "ArrowLeft", mr = "ArrowRight", _m = "ArrowUp", wu = "ArrowDown";
function Xl(n) {
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
function kl(n) {
  return "composedPath" in n ? n.composedPath()[0] : n.target;
}
function Qd(n, o) {
  if (o == null)
    return !1;
  if ("composedPath" in n)
    return n.composedPath().includes(o);
  const r = n;
  return r.target != null && o.contains(r.target);
}
function d2(n) {
  return n.matches("html,body");
}
function Mm(n) {
  return Kt(n) && n.matches(f2);
}
function Nh(n) {
  return n ? n.getAttribute("role") === "combobox" && Mm(n) : !1;
}
function kh(n) {
  return n ? n.hasAttribute(Oh) ? n : n.querySelector(`[${Oh}]`) || n : null;
}
function ca(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const Fx = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, Am = {
  ...Fx,
  position: "fixed",
  top: 0,
  left: 0
}, Tm = {
  ...Fx,
  position: "absolute"
}, iu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [a, c] = b.useState();
  Qe(() => {
    t2 && _r && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: a
  };
  return /* @__PURE__ */ x.jsx("span", {
    ...o,
    ref: r,
    style: Am,
    "aria-hidden": a ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function Hc(n, o, r) {
  return Math.floor(n / o) !== r;
}
function bs(n, o) {
  return o < 0 || o >= n.length;
}
function Zd(n, o) {
  return tl(n.current, {
    disabledIndices: o
  });
}
function uv(n, o) {
  return tl(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function tl(n, {
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
function h2(n, {
  event: o,
  orientation: r,
  loopFocus: a,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: m,
  minIndex: g,
  maxIndex: h,
  prevIndex: y,
  stopEvent: v = !1
}) {
  let S = y, C;
  if (o.key === _m ? C = "up" : o.key === wu && (C = "down"), C) {
    const w = [], A = [];
    let O = !1, M = 0;
    {
      let P = null, te = -1;
      n.forEach((se, fe) => {
        if (se == null)
          return;
        M += 1;
        const le = se.closest('[role="row"]');
        le && (O = !0), (le !== P || te === -1) && (P = le, te += 1, w[te] = []), w[te].push(fe), A[fe] = te;
      });
    }
    let T = !1, _ = 0;
    if (O)
      for (const P of w) {
        const te = P.length;
        te > _ && (_ = te), te !== d && (T = !0);
      }
    const k = T && M < n.length, I = _ || d, q = (P) => {
      if (!T || y === -1)
        return;
      const te = A[y];
      if (te == null)
        return;
      const se = w[te].indexOf(y), fe = P === "up" ? -1 : 1;
      for (let le = te + fe, he = 0; he < w.length; he += 1, le += fe) {
        if (le < 0 || le >= w.length) {
          if (!a || k)
            return;
          if (le = le < 0 ? w.length - 1 : 0, c) {
            const V = Math.min(se, w[le].length - 1), H = w[le][V] ?? w[le][0], F = c(o, y, H);
            le = A[F] ?? le;
          }
        }
        const be = w[le];
        for (let V = Math.min(se, be.length - 1); V >= 0; V -= 1) {
          const H = be[V];
          if (!ru(n, H, m))
            return H;
        }
      }
    }, B = (P) => {
      if (!k || y === -1)
        return;
      const te = y % I, se = P === "up" ? -I : I, fe = h - h % I, le = dr(h / I) + 1;
      for (let he = y - te + se, be = 0; be < le; be += 1, he += se) {
        if (he < 0 || he > h) {
          if (!a)
            return;
          he = he < 0 ? fe : 0;
        }
        const V = Math.min(he + I - 1, h);
        for (let H = Math.min(he + te, V); H >= he; H -= 1)
          if (!ru(n, H, m))
            return H;
      }
    };
    v && On(o);
    const j = q(C) ?? B(C);
    if (j !== void 0)
      S = j;
    else if (y === -1)
      S = C === "up" ? h : g;
    else if (S = tl(n, {
      startingIndex: y,
      amount: I,
      decrement: C === "up",
      disabledIndices: m
    }), a) {
      if (C === "up" && (y - I < g || S < 0)) {
        const P = y % I, te = h % I, se = h - (te - P);
        te === P ? S = h : S = te > P ? se : se - I, c && (S = c(o, y, S));
      }
      C === "down" && y + I > h && (S = tl(n, {
        startingIndex: y % I - I,
        amount: I,
        disabledIndices: m
      }), c && (S = c(o, y, S)));
    }
    bs(n, S) && (S = y);
  }
  if (r === "both") {
    const w = dr(y / d);
    o.key === (f ? hr : mr) && (v && On(o), y % d !== d - 1 ? (S = tl(n, {
      startingIndex: y,
      disabledIndices: m
    }), a && Hc(S, d, w) && (S = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (S = c(o, y, S)))) : a && (S = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (S = c(o, y, S))), Hc(S, d, w) && (S = y)), o.key === (f ? mr : hr) && (v && On(o), y % d !== 0 ? (S = tl(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: m
    }), a && Hc(S, d, w) && (S = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (S = c(o, y, S)))) : a && (S = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (S = c(o, y, S))), Hc(S, d, w) && (S = y));
    const A = dr(h / d) === w;
    bs(n, S) && (a && A ? (S = o.key === (f ? mr : hr) ? h : tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (S = c(o, y, S))) : S = y);
  }
  return S;
}
function ru(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !_u(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function m2(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function _u(n, o = n ? yl(n) : null) {
  return !n || !n.isConnected || !o || m2(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const p2 = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function g2(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return da(r) ? r.host : null;
}
function zh(n) {
  for (const o of Array.from(n.children))
    if (Bn(o) === "summary")
      return o;
  return null;
}
function b2(n, o) {
  const r = zh(o);
  return !!r && (n === r || at(r, n));
}
function Qx(n) {
  const o = n ? Bn(n) : "";
  return n != null && n.matches(p2) && (o !== "summary" || n.parentElement != null && Bn(n.parentElement) === "details" && zh(n.parentElement) === n) && (o !== "details" || zh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function Zx(n) {
  if (!Qx(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = g2(o)) {
    const r = o !== n, a = Bn(o) === "slot";
    if (o.hasAttribute("inert") || r && Bn(o) === "details" && !o.open && !b2(n, o) || o.hasAttribute("hidden") || !a && !y2(o, r))
      return !1;
  }
  return !0;
}
function y2(n, o) {
  const r = yl(n);
  return o ? r.display !== "none" : _u(n, r);
}
function $x(n) {
  const o = n.tabIndex;
  if (o < 0) {
    const r = Bn(n);
    if (r === "details" || r === "audio" || r === "video" || Kt(n) && n.isContentEditable)
      return 0;
  }
  return o;
}
function $d(n) {
  if (Bn(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function v2(n, o) {
  const r = $d(n);
  if (!r)
    return !0;
  const a = o.find((c) => {
    const f = $d(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return a ? a === r : o.find((c) => {
    const f = $d(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function Jx(n) {
  if (Kt(n) && Bn(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return Kt(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function Wx(n, o) {
  Jx(n).forEach((r) => {
    Qx(r) && o.push(r), Wx(r, o);
  });
}
function e1(n, o, r) {
  Jx(n).forEach((a) => {
    Kt(a) && a.matches(o) && r.push(a), e1(a, o, r);
  });
}
function Om(n) {
  return Zx(n) && $x(n) >= 0;
}
function t1(n) {
  const o = [];
  return Wx(n, o), o.filter(Zx);
}
function Mu(n) {
  const o = t1(n);
  return o.filter((r) => $x(r) >= 0 && v2(r, o));
}
function n1(n, o) {
  const r = Mu(n), a = r.length;
  if (a === 0)
    return;
  const c = Xl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : a - 1 : f + o;
  return r[d];
}
function l1(n) {
  return n1($t(n).body, 1) || n;
}
function o1(n) {
  return n1($t(n).body, -1) || n;
}
function ms(n, o) {
  const r = o || n.currentTarget, a = n.relatedTarget;
  return !a || !at(r, a);
}
function x2(n) {
  Mu(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function fv(n) {
  const o = [];
  e1(n, "[data-tabindex]", o), o.forEach((r) => {
    const a = r.dataset.tabindex;
    delete r.dataset.tabindex, a ? r.setAttribute("tabindex", a) : r.removeAttribute("tabindex");
  });
}
function ys(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...ys(n, c.id, r)]);
}
function dv(n, o) {
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
let Uc = 0;
function Zc(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: a = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Uc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (a)
    return f(), Xt;
  const d = requestAnimationFrame(f);
  return Uc = d, () => {
    Uc === d && (cancelAnimationFrame(d), Uc = 0);
  };
}
const Jd = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, hv = "data-base-ui-inert", Dh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let ss = /* @__PURE__ */ new WeakMap(), Wd = 0;
function S2(n) {
  return Dh[n];
}
function i1(n) {
  return n ? da(n) ? n.host : i1(n.parentNode) : null;
}
const mv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const a = i1(r);
  return n.contains(a) ? a : null;
}).filter((r) => r != null), pv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let a = r;
    for (; a && !o.has(a); )
      o.add(a), a = a.parentNode;
  }), o;
}, gv = (n, o, r) => {
  const a = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Bn(d) !== "script" && (o.has(d) ? c(d) : a.push(d));
    });
  };
  return c(n), a;
};
function E2(n, o, r, a, {
  mark: c = !0
}) {
  let f = null;
  a ? f = "inert" : r && (f = "aria-hidden");
  let d = null, m = null;
  const g = mv(o, n), h = c ? gv(o, pv(g), new Set(g)) : [], y = [], v = [];
  if (f) {
    const S = Jd[f], C = S2(f);
    m = C, d = S;
    const w = mv(o, Array.from(o.querySelectorAll("[aria-live]"))), A = g.concat(w);
    gv(o, pv(A), new Set(A)).forEach((M) => {
      const T = M.getAttribute(f), _ = T !== null && T !== "false", k = (S.get(M) || 0) + 1;
      S.set(M, k), y.push(M), k === 1 && _ && C.add(M), _ || M.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((S) => {
    const C = (ss.get(S) || 0) + 1;
    ss.set(S, C), v.push(S), C === 1 && S.setAttribute(hv, "");
  }), Wd += 1, () => {
    d && y.forEach((S) => {
      const w = (d.get(S) || 0) - 1;
      d.set(S, w), w || (!m?.has(S) && f && S.removeAttribute(f), m?.delete(S));
    }), c && v.forEach((S) => {
      const C = (ss.get(S) || 0) - 1;
      ss.set(S, C), C || S.removeAttribute(hv);
    }), Wd -= 1, Wd || (Jd.inert = /* @__PURE__ */ new WeakMap(), Jd["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Dh.inert = /* @__PURE__ */ new WeakSet(), Dh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), ss = /* @__PURE__ */ new WeakMap());
  };
}
function bv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: a = !1,
    mark: c = !0
  } = o, f = $t(n[0]).body;
  return E2(n, f, r, a, {
    mark: c
  });
}
const C2 = {
  style: {
    transition: "none"
  }
}, R2 = "data-base-ui-click-trigger", w2 = {
  fallbackAxisSide: "none"
}, _2 = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, r1 = /* @__PURE__ */ b.createContext(null), a1 = () => b.useContext(r1), M2 = au("portal");
function A2(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: a = bl,
    elementProps: c
  } = n, f = vm(), m = a1()?.portalNode, [g, h] = b.useState(null), [y, v] = b.useState(null), S = Fe((O) => {
    O !== null && v(O);
  }), C = b.useRef(null);
  Qe(() => {
    if (r === null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    const O = (r && (em(r) ? r : r.current)) ?? m ?? document.body;
    if (O == null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    C.current !== O && (C.current = O, v(null), h(O));
  }, [r, m]);
  const w = $l("div", a, {
    ref: [o, S],
    props: [{
      id: f,
      [M2]: ""
    }, c]
  }), A = g && w ? /* @__PURE__ */ pa.createPortal(w, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(w) ? w.props.id : void 0,
    subtree: A
  };
}
const T2 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    container: m,
    ...g
  } = o, {
    node: h,
    nodeId: y,
    subtree: v
  } = A2({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: g
  }), S = b.useRef(null), C = b.useRef(null), w = b.useRef(null), A = b.useRef(null), [O, M] = b.useState(null), T = b.useRef(!1), _ = O?.modal, k = O?.open, I = !!O && !O.modal && O.open && !!h;
  b.useEffect(() => {
    if (!h || _)
      return;
    function B(j) {
      h && j.relatedTarget && ms(j) && (j.type === "focusin" ? T.current && (fv(h), T.current = !1) : (x2(h), T.current = !0));
    }
    return ca(Gt(h, "focusin", B, !0), Gt(h, "focusout", B, !0));
  }, [h, _]), Qe(() => {
    !h || k !== !0 || !T.current || (fv(h), T.current = !1);
  }, [k, h]);
  const q = b.useMemo(() => ({
    beforeOutsideRef: S,
    afterOutsideRef: C,
    beforeInsideRef: w,
    afterInsideRef: A,
    portalNode: h,
    setFocusManagerState: M
  }), [h]);
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [v, /* @__PURE__ */ x.jsxs(r1.Provider, {
      value: q,
      children: [I && h && /* @__PURE__ */ x.jsx(iu, {
        "data-type": "outside",
        ref: S,
        onFocus: (B) => {
          if (ms(B, h))
            w.current?.focus();
          else {
            const j = O ? O.domReference : null;
            o1(j)?.focus();
          }
        }
      }), I && h && /* @__PURE__ */ x.jsx("span", {
        "aria-owns": y,
        style: _2
      }), h && /* @__PURE__ */ pa.createPortal(d, h), I && h && /* @__PURE__ */ x.jsx(iu, {
        "data-type": "outside",
        ref: C,
        onFocus: (B) => {
          if (ms(B, h))
            A.current?.focus();
          else {
            const j = O ? O.domReference : null;
            l1(j)?.focus(), O?.closeOnFocusOut && O?.onOpenChange(!1, vt(xu, B.nativeEvent));
          }
        }
      })]
    })]
  });
});
function O2() {
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
const N2 = /* @__PURE__ */ b.createContext(null), k2 = /* @__PURE__ */ b.createContext(null), s1 = () => b.useContext(N2)?.id || null, Au = (n) => {
  const o = b.useContext(k2);
  return n ?? o;
};
function z2(n, o) {
  const r = hn(kl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const yv = 20;
let Ti = [];
function Nm() {
  Ti = Ti.filter((n) => n.deref()?.isConnected);
}
function vv(n) {
  Nm(), n && Bn(n) !== "body" && (Ti.push(new WeakRef(n)), Ti.length > yv && (Ti = Ti.slice(-yv)));
}
function xv() {
  return Nm(), Ti[Ti.length - 1]?.deref();
}
function D2(n) {
  return n ? Om(n) ? n : Mu(n)[0] || n : null;
}
function Sv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = t1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return Om(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), a = n.getAttribute("tabindex");
  r.length === 0 ? a !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (a !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function j2(n) {
  const {
    context: o,
    children: r,
    disabled: a = !1,
    initialFocus: c = !0,
    returnFocus: f = !0,
    restoreFocus: d = !1,
    modal: m = !0,
    closeOnFocusOut: g = !0,
    openInteractionType: h = "",
    nextFocusableElement: y,
    previousFocusableElement: v,
    beforeContentFocusGuardRef: S,
    externalTree: C,
    getInsideElements: w
  } = n, A = "rootStore" in o ? o.rootStore : o, O = A.useState("open"), M = A.useState("domReferenceElement"), T = A.useState("floatingElement"), {
    events: _,
    dataRef: k
  } = A.context, I = Fe(() => k.current.floatingContext?.nodeId), q = c === !1, B = Nh(M) && q, j = gl(c), P = gl(f), te = gl(h), se = gl(O), fe = Au(C), le = a1(), he = b.useRef(!1), be = b.useRef(!1), V = b.useRef(!1), H = b.useRef(null), F = b.useRef(""), ve = b.useRef(""), ae = b.useRef(null), z = b.useRef(null), K = br(ae, S, le?.beforeInsideRef), ne = br(z, le?.afterInsideRef), oe = Vi(), pe = Vi(), we = ps(), qe = le != null, Me = kh(T), Te = Fe((ze = Me) => ze ? Mu(ze) : []), it = Fe(() => w?.().filter((ze) => ze != null) ?? []);
  b.useEffect(() => {
    if (a || !m)
      return;
    function ze(ke) {
      ke.key === "Tab" && at(Me, Xl($t(Me))) && Te().length === 0 && !B && On(ke);
    }
    const et = $t(Me);
    return Gt(et, "keydown", ze);
  }, [a, Me, m, B, Te]), b.useEffect(() => {
    if (a || !O)
      return;
    const ze = $t(Me);
    function et() {
      V.current = !1;
    }
    function ke(Ue) {
      const _e = kl(Ue), Ze = it(), Oe = at(T, _e) || at(M, _e) || at(le?.portalNode, _e) || Ze.some((We) => We === _e || at(We, _e));
      V.current = !Oe, ve.current = Ue.pointerType || "keyboard", _e?.closest(`[${R2}]`) && (be.current = !0, pe.start(0, () => {
        be.current = !1;
      }));
    }
    function Le() {
      ve.current = "keyboard";
    }
    return ca(
      Gt(ze, "pointerdown", ke, !0),
      Gt(ze, "pointerup", et, !0),
      Gt(ze, "pointercancel", et, !0),
      Gt(ze, "keydown", Le, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [a, T, M, Me, O, le, pe, it]), b.useEffect(() => {
    if (a || !g)
      return;
    const ze = $t(Me);
    function et() {
      be.current = !0, pe.start(0, () => {
        be.current = !1;
      });
    }
    function ke(Ze) {
      const Oe = kl(Ze);
      Om(Oe) && (H.current = Oe);
    }
    function Le(Ze) {
      const Oe = Ze.relatedTarget, We = Ze.currentTarget, tt = kl(Ze);
      m && Oe == null && tt != null && at(T, tt) && vv(tt), queueMicrotask(() => {
        const Xe = I(), ye = A.context.triggerElements, Q = it(), ce = Oe?.hasAttribute(au("focus-guard")) && [ae.current, z.current, le?.beforeInsideRef.current, le?.afterInsideRef.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, Po(v), Po(y)].includes(Oe), He = !(at(M, Oe) || at(T, Oe) || at(Oe, T) || at(le?.portalNode, Oe) || Q.some((Ce) => Ce === Oe || at(Ce, Oe)) || ye.hasMatchingElement((Ce) => at(Ce, Oe)) || ce || fe && (ys(fe.nodesRef.current, Xe).find((Ce) => at(Ce.context?.elements.floating, Oe) || at(Ce.context?.elements.domReference, Oe)) || dv(fe.nodesRef.current, Xe).find((Ce) => [Ce.context?.elements.floating, kh(Ce.context?.elements.floating)].includes(Oe) || Ce.context?.elements.domReference === Oe)));
        if (We === M && Me && Sv(Me), d && We !== M && !_u(tt) && Xl(ze) === ze.body) {
          if (Kt(Me) && (Me.focus(), d === "popup")) {
            we.request(() => {
              Me.focus();
            });
            return;
          }
          const Ce = Te(), Ge = H.current, nt = (Ge && Ce.includes(Ge) ? Ge : null) || Ce[Ce.length - 1] || Me;
          Kt(nt) && nt.focus();
        }
        if (k.current.insideReactTree) {
          k.current.insideReactTree = !1;
          return;
        }
        (B || !m) && Oe && He && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (B || Oe !== xv()) && (he.current = !0, A.setOpen(!1, vt(xu, Ze)));
      });
    }
    function Ue() {
      V.current || (k.current.insideReactTree = !0, oe.start(0, () => {
        k.current.insideReactTree = !1;
      }));
    }
    const _e = Kt(M) ? M : null;
    if (!(!T && !_e))
      return ca(_e && Gt(_e, "focusout", Le), _e && Gt(_e, "pointerdown", et), T && Gt(T, "focusin", ke), T && Gt(T, "focusout", Le), T && le && Gt(T, "focusout", Ue, !0));
  }, [a, M, T, Me, m, fe, le, A, g, d, Te, B, I, k, oe, pe, we, y, v, it]), b.useEffect(() => {
    if (a || !T || !O)
      return;
    const ze = Array.from(le?.portalNode?.querySelectorAll(`[${au("portal")}]`) || []), ke = (fe ? dv(fe.nodesRef.current, I()) : []).find((We) => Nh(We.context?.elements.domReference || null))?.context?.elements.domReference, Ue = [...[T, ...ze, ae.current, z.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, ...it()], ke, Po(v), Po(y), B ? M : null].filter((We) => We != null), _e = bv(Ue, {
      ariaHidden: m || B,
      mark: !1
    }), Ze = [T, ...ze].filter((We) => We != null), Oe = bv(Ze);
    return () => {
      Oe(), _e();
    };
  }, [O, a, M, T, m, le, B, fe, I, y, v, it]), Qe(() => {
    if (!O || a || !Kt(Me))
      return;
    F.current = "", ve.current = "";
    const ze = $t(Me), et = Xl(ze);
    queueMicrotask(() => {
      const ke = j.current, Le = typeof ke == "function" ? ke(te.current || "") : ke;
      if (Le === void 0 || Le === !1 || at(Me, et))
        return;
      let _e = null;
      const Ze = () => (_e == null && (_e = Te(Me)), _e[0] || Me);
      let Oe;
      Le === !0 || Le === null ? Oe = Ze() : Oe = Po(Le), Oe = Oe || Ze();
      const We = at(Me, Xl(ze));
      Zc(Oe, {
        preventScroll: Oe === Me,
        shouldFocus() {
          if (!se.current)
            return !1;
          if (We)
            return !0;
          const tt = Xl(ze);
          return !(tt !== Oe && at(Me, tt));
        }
      });
    });
  }, [a, O, Me, Te, j, te, se]), Qe(() => {
    if (a || !Me)
      return;
    const ze = $t(Me), et = Xl(ze), ke = te.current == null;
    vv(et);
    function Le(_e) {
      if (_e.open || (F.current = z2(_e.nativeEvent, ve.current)), _e.reason === zA && _e.nativeEvent.type === "mouseleave" && (he.current = !0), _e.reason === xm)
        if (_e.nested)
          he.current = !1;
        else if (Kx(_e.nativeEvent) || wm(_e.nativeEvent))
          he.current = !1;
        else {
          let Ze = !1;
          $t(Me).createElement("div").focus({
            get preventScroll() {
              return Ze = !0, !1;
            }
          }), Ze ? he.current = !1 : he.current = !0;
        }
    }
    _.on("openchange", Le);
    function Ue(_e) {
      const Ze = P.current;
      let Oe = typeof Ze == "function" ? Ze(_e) : Ze;
      if (Oe === void 0 || Oe === !1)
        return null;
      Oe === null && (Oe = !0);
      const We = M?.isConnected ? M : null, tt = et?.isConnected && Bn(et) !== "body" ? et : null;
      let Xe = ke ? tt || We : We || tt;
      return Xe || (Xe = xv() || null), typeof Oe == "boolean" ? Xe : Po(Oe) || Xe || null;
    }
    return () => {
      _.off("openchange", Le);
      const _e = Xl(ze), Ze = it(), Oe = at(T, _e) || Ze.some((ye) => ye === _e || at(ye, _e)) || fe && ys(fe.nodesRef.current, I(), !1).some((ye) => at(ye.context?.elements.floating, _e)), We = P.current, tt = F.current, Xe = Ue(tt);
      queueMicrotask(() => {
        const ye = D2(Xe), Q = typeof We != "boolean";
        if (We && !he.current && Kt(ye) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Q && ye !== _e && _e !== ze.body) || Oe)) {
          const ce = {
            preventScroll: !0
          };
          tt === "keyboard" && (ce.focusVisible = !0), ye.focus(ce);
        }
        he.current = !1;
      });
    };
  }, [a, T, Me, P, te, _, fe, M, I, it]), Qe(() => {
    if (!_r || O || !T)
      return;
    const ze = Xl($t(T));
    !Kt(ze) || !Mm(ze) || at(T, ze) && ze.blur();
  }, [O, T]), Qe(() => {
    if (!(a || !le))
      return le.setFocusManagerState({
        modal: m,
        closeOnFocusOut: g,
        open: O,
        onOpenChange: A.setOpen,
        domReference: M
      }), () => {
        le.setFocusManagerState(null);
      };
  }, [a, le, m, O, A, g, M]), Qe(() => {
    if (!(a || !Me))
      return Sv(Me), () => {
        queueMicrotask(Nm);
      };
  }, [a, Me]);
  const pt = !a && (m ? !B : !0) && (qe || m);
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [pt && /* @__PURE__ */ x.jsx(iu, {
      "data-type": "inside",
      ref: K,
      onFocus: (ze) => {
        if (m) {
          const et = Te();
          Zc(et[et.length - 1]);
        } else le?.portalNode && (he.current = !1, ms(ze, le.portalNode) ? l1(M)?.focus() : Po(v ?? le.beforeOutsideRef)?.focus());
      }
    }), r, pt && /* @__PURE__ */ x.jsx(iu, {
      "data-type": "inside",
      ref: ne,
      onFocus: (ze) => {
        m ? Zc(Te()[0]) : le?.portalNode && (g && (he.current = !0), ms(ze, le.portalNode) ? o1(M)?.focus() : Po(y ?? le.afterOutsideRef)?.focus());
      }
    })]
  });
}
function c1(n, o = {}) {
  const {
    enabled: r = !0,
    event: a = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: m = 0,
    reason: g = qx
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, v = b.useRef(void 0), S = ps(), C = Vi(), w = b.useMemo(() => {
    function A(M, T, _, k) {
      const I = vt(g, T, _);
      M && k === "touch" && m > 0 ? C.start(m, () => {
        h.setOpen(!0, I);
      }) : h.setOpen(M, I);
    }
    function O(M, T, _) {
      const k = y.current.openEvent, I = h.select("domReferenceElement") !== T;
      return M && I || !M || !c ? !0 : k && d ? !_(k.type) : !1;
    }
    return {
      onPointerDown(M) {
        v.current = Fd(M.pointerType) && wm(M.nativeEvent) ? "virtual" : M.pointerType;
      },
      onMouseDown(M) {
        const T = v.current, _ = M.nativeEvent, k = h.select("open");
        if (M.button !== 0 || a === "click" || Fd(T) && f)
          return;
        const I = O(k, M.currentTarget, (j) => j === "click" || j === "mousedown"), q = kl(_);
        if (Mm(q)) {
          A(I, _, q, T);
          return;
        }
        const B = M.currentTarget;
        S.request(() => {
          A(I, _, B, T);
        });
      },
      onClick(M) {
        if (a === "mousedown-only")
          return;
        const T = v.current;
        if (a === "mousedown" && T) {
          v.current = void 0;
          return;
        }
        if (Fd(T) && f)
          return;
        const _ = h.select("open"), k = O(_, M.currentTarget, (I) => I === "click" || I === "mousedown" || I === "keydown" || I === "keyup");
        A(k, M.nativeEvent, M.currentTarget, T);
      },
      onKeyDown() {
        v.current = void 0;
      }
    };
  }, [y, a, f, g, h, d, c, S, C, m]);
  return b.useMemo(() => r ? {
    reference: w
  } : bl, [r, w]);
}
function L2() {
  return !1;
}
function V2(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function I2(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: a = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = L2,
    bubbles: m,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), v = h.useState("floatingElement"), {
    dataRef: S
  } = h.context, C = Au(g), w = Fe(typeof c == "function" ? c : () => !1), A = typeof c == "function" ? w : c, O = A !== !1, M = Fe(() => f), {
    escapeKey: T,
    outsidePress: _
  } = V2(m), k = b.useRef(!1), I = b.useRef(!1), q = b.useRef(!1), B = b.useRef(!1), j = b.useRef(""), P = b.useRef(null), te = Vi(), se = Vi(), fe = Fe(() => {
    se.clear(), S.current.insideReactTree = !1;
  }), le = Fe((K) => {
    const ne = S.current.floatingContext?.nodeId;
    return (C ? ys(C.nodesRef.current, ne) : []).some((pe) => pe.context?.open && !pe.context.dataRef.current[K]);
  }), he = Fe((K) => Qd(K, h.select("floatingElement")) || Qd(K, h.select("domReferenceElement"))), be = Fe((K) => {
    d() && h.setOpen(!1, vt(qx, K.nativeEvent));
  }), V = Fe((K) => {
    if (!y || !r || !a || K.key !== "Escape" || B.current || !T && le("__escapeKeyBubbles"))
      return;
    const ne = c2(K) ? K.nativeEvent : K, oe = vt(Sm, ne);
    h.setOpen(!1, oe), oe.isCanceled || K.preventDefault(), !T && !oe.isPropagationAllowed && K.stopPropagation();
  }), H = Fe(() => {
    S.current.insideReactTree = !0, se.start(0, fe);
  }), F = Fe((K) => {
    if (!y || !r || K.button !== 0)
      return;
    const ne = kl(K.nativeEvent);
    at(h.select("floatingElement"), ne) && (k.current || (k.current = !0, I.current = !1));
  }), ve = Fe((K) => {
    !y || !r || (K.defaultPrevented || K.nativeEvent.defaultPrevented) && k.current && (I.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return fe;
    S.current.__escapeKeyBubbles = T, S.current.__outsidePressBubbles = _;
    const K = new yr(), ne = new yr();
    function oe() {
      K.clear(), B.current = !0;
    }
    function pe() {
      K.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        _r ? 5 : 0,
        () => {
          B.current = !1;
        }
      );
    }
    function we() {
      q.current = !0, ne.start(0, () => {
        q.current = !1;
      });
    }
    function qe() {
      k.current = !1, I.current = !1;
    }
    function Me() {
      const Q = j.current, ce = Q === "pen" || !Q ? "mouse" : Q, He = M(), Ce = typeof He == "function" ? He() : He;
      return typeof Ce == "string" ? Ce : Ce[ce];
    }
    function Te(Q) {
      const ce = Me();
      return ce === "intentional" && Q.type !== "click" || ce === "sloppy" && Q.type === "click";
    }
    function it(Q) {
      const ce = S.current.floatingContext?.nodeId, He = C && ys(C.nodesRef.current, ce).some((Ce) => Qd(Q, Ce.context?.elements.floating));
      return he(Q) || He;
    }
    function pt(Q) {
      if (Te(Q)) {
        Q.type !== "click" && !he(Q) && (ne.clear(), q.current = !1), fe();
        return;
      }
      if (S.current.insideReactTree) {
        fe();
        return;
      }
      const ce = kl(Q), He = `[${au("inert")}]`, Ce = dn(ce) ? ce.getRootNode() : null, Ge = Array.from((da(Ce) ? Ce : $t(h.select("floatingElement"))).querySelectorAll(He)), nt = h.context.triggerElements;
      if (ce && (nt.hasElement(ce) || nt.hasMatchingElement((St) => at(St, ce))))
        return;
      let Tt = dn(ce) ? ce : null;
      for (; Tt && !Ni(Tt); ) {
        const St = ji(Tt);
        if (Ni(St) || !dn(St))
          break;
        Tt = St;
      }
      if (!(Ge.length && dn(ce) && !d2(ce) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !at(ce, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((St) => !at(Tt, St)))) {
        if (Kt(ce) && !("touches" in Q)) {
          const St = Ni(ce), Bt = yl(ce), kt = /auto|scroll/, xt = St || kt.test(Bt.overflowX), on = St || kt.test(Bt.overflowY), st = xt && ce.clientWidth > 0 && ce.scrollWidth > ce.clientWidth, Et = on && ce.clientHeight > 0 && ce.scrollHeight > ce.clientHeight, Jt = Bt.direction === "rtl", Rn = Et && (Jt ? Q.offsetX <= ce.offsetWidth - ce.clientWidth : Q.offsetX > ce.clientWidth), Ft = st && Q.offsetY > ce.clientHeight;
          if (Rn || Ft)
            return;
        }
        if (!it(Q)) {
          if (Me() === "intentional" && q.current) {
            ne.clear(), q.current = !1;
            return;
          }
          typeof A == "function" && !A(Q) || le("__outsidePressBubbles") || (h.setOpen(!1, vt(xm, Q)), fe());
        }
      }
    }
    function ze(Q) {
      Me() !== "sloppy" || Q.pointerType === "touch" || !h.select("open") || !r || he(Q) || pt(Q);
    }
    function et(Q) {
      if (Me() !== "sloppy" || !h.select("open") || !r || he(Q))
        return;
      const ce = Q.touches[0];
      ce && (P.current = {
        startTime: Date.now(),
        startX: ce.clientX,
        startY: ce.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, te.start(1e3, () => {
        P.current && (P.current.dismissOnTouchEnd = !1, P.current.dismissOnMouseDown = !1);
      }));
    }
    function ke(Q, ce) {
      const He = kl(Q);
      if (!He)
        return;
      const Ce = Gt(He, Q.type, () => {
        ce(Q), Ce();
      });
    }
    function Le(Q) {
      j.current = "touch", ke(Q, et);
    }
    function Ue(Q) {
      te.clear(), Q.type === "pointerdown" && (j.current = Q.pointerType), !(Q.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && ke(Q, (ce) => {
        ce.type === "pointerdown" ? ze(ce) : pt(ce);
      });
    }
    function _e(Q) {
      if (!k.current)
        return;
      const ce = I.current;
      if (qe(), Me() === "intentional") {
        if (Q.type === "pointercancel") {
          ce && we();
          return;
        }
        if (!it(Q)) {
          if (ce) {
            we();
            return;
          }
          typeof A == "function" && !A(Q) || (ne.clear(), q.current = !0, fe());
        }
      }
    }
    function Ze(Q) {
      if (Me() !== "sloppy" || !P.current || he(Q))
        return;
      const ce = Q.touches[0];
      if (!ce)
        return;
      const He = Math.abs(ce.clientX - P.current.startX), Ce = Math.abs(ce.clientY - P.current.startY), Ge = Math.sqrt(He * He + Ce * Ce);
      Ge > 5 && (P.current.dismissOnTouchEnd = !0), Ge > 10 && (pt(Q), te.clear(), P.current = null);
    }
    function Oe(Q) {
      ke(Q, Ze);
    }
    function We(Q) {
      Me() !== "sloppy" || !P.current || he(Q) || (P.current.dismissOnTouchEnd && pt(Q), te.clear(), P.current = null);
    }
    function tt(Q) {
      ke(Q, We);
    }
    const Xe = $t(v), ye = ca(a && ca(Gt(Xe, "keydown", V), Gt(Xe, "compositionstart", oe), Gt(Xe, "compositionend", pe)), O && ca(Gt(Xe, "click", Ue, !0), Gt(Xe, "pointerdown", Ue, !0), Gt(Xe, "pointerup", _e, !0), Gt(Xe, "pointercancel", _e, !0), Gt(Xe, "mousedown", Ue, !0), Gt(Xe, "mouseup", _e, !0), Gt(Xe, "touchstart", Le, !0), Gt(Xe, "touchmove", Oe, !0), Gt(Xe, "touchend", tt, !0)));
    return () => {
      ye(), K.clear(), ne.clear(), qe(), q.current = !1, fe();
    };
  }, [S, v, a, O, A, y, r, T, _, V, fe, M, le, he, C, h, te]);
  const ae = b.useMemo(() => ({
    onKeyDown: V,
    onPointerDown: be,
    onClick: be
  }), [V, be]), z = b.useMemo(() => ({
    onKeyDown: V,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: ve,
    onMouseDown: ve,
    onClickCapture: H,
    onMouseDownCapture(K) {
      H(), F(K);
    },
    onPointerDownCapture(K) {
      H(), F(K);
    },
    onMouseUpCapture: H,
    onTouchEndCapture: H,
    onTouchMoveCapture: H
  }), [V, H, F, ve]);
  return b.useMemo(() => r ? {
    reference: ae,
    floating: z,
    trigger: ae
  } : {}, [r, ae, z]);
}
var eh = { exports: {} }, th = {};
var Ev;
function H2() {
  if (Ev) return th;
  Ev = 1;
  var n = Ss();
  function o(v, S) {
    return v === S && (v !== 0 || 1 / v === 1 / S) || v !== v && S !== S;
  }
  var r = typeof Object.is == "function" ? Object.is : o, a = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(v, S) {
    var C = S(), w = a({ inst: { value: C, getSnapshot: S } }), A = w[0].inst, O = w[1];
    return f(
      function() {
        A.value = C, A.getSnapshot = S, g(A) && O({ inst: A });
      },
      [v, C, S]
    ), c(
      function() {
        return g(A) && O({ inst: A }), v(function() {
          g(A) && O({ inst: A });
        });
      },
      [v]
    ), d(C), C;
  }
  function g(v) {
    var S = v.getSnapshot;
    v = v.value;
    try {
      var C = S();
      return !r(v, C);
    } catch {
      return !0;
    }
  }
  function h(v, S) {
    return S();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return th.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, th;
}
var Cv;
function u1() {
  return Cv || (Cv = 1, eh.exports = H2()), eh.exports;
}
var U2 = u1(), nh = { exports: {} }, lh = {};
var Rv;
function B2() {
  if (Rv) return lh;
  Rv = 1;
  var n = Ss(), o = u1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, g = n.useDebugValue;
  return lh.useSyncExternalStoreWithSelector = function(h, y, v, S, C) {
    var w = f(null);
    if (w.current === null) {
      var A = { hasValue: !1, value: null };
      w.current = A;
    } else A = w.current;
    w = m(
      function() {
        function M(q) {
          if (!T) {
            if (T = !0, _ = q, q = S(q), C !== void 0 && A.hasValue) {
              var B = A.value;
              if (C(B, q))
                return k = B;
            }
            return k = q;
          }
          if (B = k, a(_, q)) return B;
          var j = S(q);
          return C !== void 0 && C(B, j) ? (_ = q, B) : (_ = q, k = j);
        }
        var T = !1, _, k, I = v === void 0 ? null : v;
        return [
          function() {
            return M(y());
          },
          I === null ? void 0 : function() {
            return M(I());
          }
        ];
      },
      [y, v, S, C]
    );
    var O = c(h, w[0], w[1]);
    return d(
      function() {
        A.hasValue = !0, A.value = O;
      },
      [O]
    ), g(O), O;
  }, lh;
}
var wv;
function G2() {
  return wv || (wv = 1, nh.exports = B2()), nh.exports;
}
var Y2 = G2();
const q2 = gm(19), P2 = q2 ? K2 : F2;
function xe(n, o, r, a, c) {
  return P2(n, o, r, a, c);
}
function X2(n, o, r, a, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, a, c), [n, o, r, a, c]);
  return U2.useSyncExternalStore(n.subscribe, f, f);
}
function K2(n, o, r, a, c) {
  return X2(n, o, r, a, c);
}
function F2(n, o, r, a, c) {
  return Y2.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, a, c));
}
class f1 {
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
    return xe(this, o, r, a, c);
  }
}
class Q2 extends f1 {
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
    Qe(() => {
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
    Qe(() => (a.state[o] !== r && a.set(o, r), () => {
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
    Qe(() => {
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
    Qe(() => {
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
    return b.useDebugValue(o), xe(this, this.selectors[o], r, a, c);
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
    const a = Fe(r ?? Xt);
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
        const m = c;
        c = d, r(d, m, this);
      }
    });
  }
}
const Z2 = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class $2 extends Q2 {
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
      events: O2(),
      nested: a,
      triggerElements: f
    }, Z2), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && u2(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
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
const J2 = {
  tabIndex: -1,
  [Oh]: ""
};
class W2 {
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
function eT(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: a = {}
  } = n, c = vm(), f = s1() != null, d = zl(() => new $2({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: a.reference ?? null,
    floatingElement: a.floating ?? null,
    triggerElements: new W2(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Qe(() => {
    const m = {
      open: o,
      floatingId: c
    };
    a.reference !== void 0 && (m.referenceElement = a.reference, m.domReferenceElement = dn(a.reference) ? a.reference : null), a.floating !== void 0 && (m.floatingElement = a.floating), d.update(m);
  }, [o, c, a.reference, a.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function tT(n) {
  return nT(n, n.rootContext);
}
function nT(n, o) {
  const {
    nodeId: r,
    externalTree: a
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), g = o.useState("floatingId"), [h, y] = b.useState(null), [v, S] = b.useState(void 0), [C, w] = b.useState(void 0), A = b.useRef(null), O = Au(a), M = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), T = q_({
    ...n,
    elements: {
      ...M,
      ...h && {
        reference: h
      }
    }
  }), _ = dn(v) ? v : null, k = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", v ?? null), o.useSyncedValue("domReferenceElement", v === void 0 ? d : _), o.useSyncedValue("floatingElement", k);
  const I = b.useCallback((se) => {
    const fe = dn(se) ? {
      getBoundingClientRect: () => se.getBoundingClientRect(),
      getClientRects: () => se.getClientRects(),
      contextElement: se
    } : se;
    y(fe), T.refs.setReference(fe);
  }, [T.refs]), q = b.useCallback((se) => {
    (dn(se) || se === null) && (A.current = se, S(se)), (dn(T.refs.reference.current) || T.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    se !== null && !dn(se)) && T.refs.setReference(se);
  }, [T.refs, S]), B = b.useCallback((se) => {
    w(se), T.refs.setFloating(se);
  }, [T.refs]), j = b.useMemo(() => ({
    ...T.refs,
    setReference: q,
    setFloating: B,
    setPositionReference: I,
    domReference: A
  }), [T.refs, q, B, I]), P = b.useMemo(() => ({
    ...T.elements,
    domReference: d
  }), [T.elements, d]), te = b.useMemo(() => ({
    ...T,
    dataRef: o.context.dataRef,
    open: m,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: j,
    elements: P,
    nodeId: r,
    rootStore: o
  }), [T, j, P, r, o, m, g]);
  return Qe(() => {
    d && (A.current = d);
  }, [d]), Qe(() => {
    o.context.dataRef.current.floatingContext = te;
    const se = O?.nodesRef.current.find((fe) => fe.id === r);
    se && (se.context = te);
  }), b.useMemo(() => ({
    ...T,
    context: te,
    refs: j,
    elements: P,
    rootStore: o
  }), [T, j, P, te, o]);
}
const lT = "Escape";
function _v(n) {
  return _r && n.movementX === 0 && n.movementY === 0;
}
function Tu(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function Bc(n, o) {
  return Tu(o, n === _m || n === wu, n === hr || n === mr);
}
function oh(n, o, r) {
  return Tu(o, n === wu, r ? n === hr : n === mr) || n === "Enter" || n === " " || n === "";
}
function oT(n, o, r) {
  return Tu(o, r ? n === hr : n === mr, n === wu);
}
function iT(n, o, r, a) {
  const c = r ? n === mr : n === hr, f = n === _m;
  return o === "both" || o === "horizontal" && a ? n === lT : Tu(o, c, f);
}
function rT(n, o) {
  const {
    listRef: r,
    activeIndex: a,
    onNavigate: c = () => {
    },
    enabled: f = !0,
    selectedIndex: d = null,
    allowEscape: m = !1,
    loopFocus: g = !1,
    nested: h = !1,
    rtl: y = !1,
    virtual: v = !1,
    focusItemOnOpen: S = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: w = !0,
    disabledIndices: A = void 0,
    orientation: O = "vertical",
    parentOrientation: M,
    id: T,
    resetOnPointerLeave: _ = !0,
    externalTree: k,
    grid: I
  } = o, q = I != null, B = "rootStore" in n ? n.rootStore : n, j = B.useState("open"), P = B.useState("floatingElement"), te = B.useState("domReferenceElement"), se = B.context.dataRef, fe = kh(P), le = Nh(te), he = gl(fe), be = s1(), V = Au(k), H = b.useRef(S), F = b.useRef(d ?? -1), ve = b.useRef(null), ae = b.useRef(!0), z = Fe((Q) => {
    c(F.current === -1 ? null : F.current, Q);
  }), K = b.useRef(!!P), ne = b.useRef(j), oe = b.useRef(!1), pe = b.useRef(!1), we = b.useRef(null), qe = gl(A), Me = gl(j), Te = gl(d), it = gl(_), pt = ps(), ze = ps(), et = Fe(() => {
    function Q(Ge) {
      v ? V?.events.emit("virtualfocus", Ge) : we.current = Zc(Ge, {
        sync: oe.current,
        preventScroll: !0
      });
    }
    const ce = r.current[F.current], He = pe.current;
    ce && Q(ce), (oe.current ? (Ge) => Ge() : (Ge) => pt.request(Ge))(() => {
      const Ge = r.current[F.current] || ce;
      if (!Ge)
        return;
      ce || Q(Ge), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Oe && (He || !ae.current) && Ge.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Qe(() => {
    se.current.orientation = O;
  }, [se, O]), Qe(() => {
    f && (j && P ? (F.current = d ?? -1, H.current && d != null && (pe.current = !0, z())) : K.current && (F.current = -1, z()));
  }, [f, j, P, d, z]), Qe(() => {
    if (f) {
      if (!j) {
        oe.current = !1;
        return;
      }
      if (P)
        if (a == null) {
          if (oe.current = !1, Te.current != null)
            return;
          if (K.current && (F.current = -1, et()), (!ne.current || !K.current) && H.current && (ve.current != null || H.current === !0 && ve.current == null)) {
            let Q = 0;
            const ce = () => {
              r.current[0] == null ? (Q < 2 && (Q ? (Ce) => ze.request(Ce) : queueMicrotask)(ce), Q += 1) : (F.current = ve.current == null || oh(ve.current, O, y) || h ? Zd(r) : uv(r), ve.current = null, z());
            };
            ce();
          }
        } else bs(r.current, a) || (F.current = a, et(), pe.current = !1);
    }
  }, [f, j, P, a, Te, h, r, O, y, z, et, ze]), Qe(() => {
    if (!f || P || !V || v || !K.current)
      return;
    const Q = V.nodesRef.current, ce = Q.find((Ge) => Ge.id === be)?.context?.elements.floating, He = Xl($t(te ?? ce ?? null)), Ce = Q.some((Ge) => Ge.context && at(Ge.context.elements.floating, He));
    ce && !Ce && ae.current && ce.focus({
      preventScroll: !0
    });
  }, [f, P, te, V, be, v]), Qe(() => {
    ne.current = j, K.current = !!P;
  }), Qe(() => {
    j || (ve.current = null, H.current = S);
  }, [j, S]);
  const ke = a != null, Le = Fe((Q) => {
    if (!Me.current)
      return;
    const ce = r.current.indexOf(Q.currentTarget);
    ce !== -1 && (F.current !== ce || a !== ce) && (F.current = ce, z(Q));
  }), Ue = Fe(() => M ?? V?.nodesRef.current.find((Q) => Q.id === be)?.context?.dataRef?.current.orientation), _e = Fe(() => Zd(r, qe.current)), Ze = Fe((Q) => {
    if (ae.current = !1, oe.current = !0, Q.which === 229 || !Me.current && Q.currentTarget === he.current)
      return;
    if (h && iT(Q.key, O, y, q)) {
      Bc(Q.key, Ue()) || On(Q), B.setOpen(!1, vt(Th, Q.nativeEvent)), Kt(te) && (v ? V?.events.emit("virtualfocus", te) : te.focus());
      return;
    }
    const ce = F.current, He = Zd(r, A), Ce = uv(r, A);
    if (le || (Q.key === "Home" && (On(Q), F.current = He, z(Q)), Q.key === "End" && (On(Q), F.current = Ce, z(Q))), I != null) {
      const Ge = I(Q, F.current, r, O, g, y, A, He, Ce);
      if (Ge != null && (F.current = Ge, z(Q)), O === "both")
        return;
    }
    if (Bc(Q.key, O)) {
      if (On(Q), j && !v && Xl(Q.currentTarget.ownerDocument) === Q.currentTarget) {
        F.current = oh(Q.key, O, y) ? He : Ce, z(Q);
        return;
      }
      oh(Q.key, O, y) ? g ? ce >= Ce ? m && ce !== r.current.length ? F.current = -1 : (oe.current = !1, F.current = He) : F.current = tl(r.current, {
        startingIndex: ce,
        disabledIndices: A
      }) : F.current = Math.min(Ce, tl(r.current, {
        startingIndex: ce,
        disabledIndices: A
      })) : g ? ce <= He ? m && ce !== -1 ? F.current = r.current.length : (oe.current = !1, F.current = Ce) : F.current = tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: A
      }) : F.current = Math.max(He, tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: A
      })), bs(r.current, F.current) && (F.current = -1), z(Q);
    }
  }), Oe = b.useMemo(() => ({
    onFocus(ce) {
      oe.current = !0, Le(ce);
    },
    onClick: ({
      currentTarget: ce
    }) => ce.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(ce) {
      _v(ce) || (oe.current = !0, pe.current = !1, C && Le(ce));
    },
    onPointerLeave(ce) {
      if (!Me.current || !ae.current || ce.pointerType === "touch")
        return;
      oe.current = !0;
      const He = ce.relatedTarget;
      if (!(!C || r.current.includes(He)) && it.current && (we.current?.(), we.current = null, F.current = -1, z(ce), !v)) {
        const Ce = he.current, Ge = Xl($t(Ce));
        Ce && at(Ce, Ge) && Ce.focus({
          preventScroll: !0
        });
      }
    }
  }), [Le, Me, he, C, r, z, it, v]), We = b.useMemo(() => v && j && ke && {
    "aria-activedescendant": `${T}-${a}`
  }, [v, j, ke, T, a]), tt = b.useMemo(() => ({
    "aria-orientation": O === "both" ? void 0 : O,
    ...le ? {} : We,
    onKeyDown(Q) {
      if (Q.key === "Tab" && Q.shiftKey && j && !v) {
        const ce = kl(Q.nativeEvent);
        if (ce && !at(he.current, ce))
          return;
        On(Q), B.setOpen(!1, vt(xu, Q.nativeEvent)), Kt(te) && te.focus();
        return;
      }
      Ze(Q);
    },
    onPointerMove(Q) {
      _v(Q) || (ae.current = !0);
    }
  }), [We, Ze, he, O, le, B, j, v, te]), Xe = b.useMemo(() => {
    function Q(Ce) {
      B.setOpen(!0, vt(Th, Ce.nativeEvent, Ce.currentTarget));
    }
    function ce(Ce) {
      S === "auto" && Kx(Ce.nativeEvent) && (H.current = !v);
    }
    function He(Ce) {
      H.current = S, S === "auto" && wm(Ce.nativeEvent) && (H.current = !0);
    }
    return {
      onKeyDown(Ce) {
        const Ge = B.select("open");
        ae.current = !1;
        const nt = Ce.key.startsWith("Arrow"), Tt = oT(Ce.key, Ue(), y), St = Bc(Ce.key, O), Bt = (h ? Tt : St) || Ce.key === "Enter" || Ce.key.trim() === "";
        if (v && Ge)
          return Ze(Ce);
        if (!(!Ge && !w && nt)) {
          if (Bt) {
            const kt = Bc(Ce.key, Ue());
            ve.current = h && kt ? null : Ce.key;
          }
          if (h) {
            Tt && (On(Ce), Ge ? (F.current = _e(), z(Ce)) : Q(Ce));
            return;
          }
          St && (Te.current != null && (F.current = Te.current), On(Ce), !Ge && w ? Q(Ce) : Ze(Ce), Ge && z(Ce));
        }
      },
      onFocus(Ce) {
        B.select("open") && !v && (F.current = -1, z(Ce));
      },
      onPointerDown: He,
      onPointerEnter: He,
      onMouseDown: ce,
      onClick: ce
    };
  }, [Ze, S, _e, h, z, B, w, O, Ue, y, Te, v]), ye = b.useMemo(() => ({
    ...We,
    ...Xe
  }), [We, Xe]);
  return b.useMemo(() => f ? {
    reference: ye,
    floating: tt,
    item: Oe,
    trigger: Xe
  } : {}, [f, ye, tt, Xe, Oe]);
}
function aT(n, o) {
  const {
    listRef: r,
    elementsRef: a,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: m,
    enabled: g = !0,
    resetMs: h = 750,
    selectedIndex: y = null
  } = o, v = "rootStore" in n ? n.rootStore : n, S = v.useState("open"), C = Vi(), w = b.useRef(""), A = b.useRef(y ?? c ?? -1), O = b.useRef(null), M = Fe((k) => {
    function I(he) {
      return a?.current[he];
    }
    function q(he) {
      const be = I(he);
      return be && !_u(be) || be?.matches(":disabled") ? !1 : d == null || !ru(ia, he, d);
    }
    function B(he, be, V = 0) {
      if (he.length === 0)
        return -1;
      const H = (V % he.length + he.length) % he.length, F = be.toLowerCase();
      for (let ve = 0; ve < he.length; ve += 1) {
        const ae = (H + ve) % he.length;
        if (!(!he[ae]?.toLowerCase().startsWith(F) || !q(ae)))
          return ae;
      }
      return -1;
    }
    const j = r.current;
    if (w.current.length > 0 && k.key === " " && (On(k), m?.(!0)), w.current.length > 0 && w.current[0] !== " " && B(j, w.current) === -1 && k.key !== " " && m?.(!1), j == null || // Character key.
    k.key.length !== 1 || // Modifier key.
    k.ctrlKey || k.metaKey || k.altKey)
      return;
    S && k.key !== " " && (On(k), m?.(!0));
    const P = w.current === "";
    P && (A.current = y ?? c ?? -1), j.every((he, be) => he && q(be) ? he[0]?.toLowerCase() !== he[1]?.toLowerCase() : !0) && w.current === k.key && (w.current = "", A.current = O.current), w.current += k.key, C.start(h, () => {
      w.current = "", A.current = O.current, m?.(!1);
    });
    const fe = ((P ? y ?? c ?? -1 : A.current) ?? 0) + 1, le = B(j, w.current, fe);
    le !== -1 ? (f?.(le), O.current = le) : k.key !== " " && (w.current = "", m?.(!1));
  }), T = Fe((k) => {
    const I = k.relatedTarget, q = v.select("domReferenceElement"), B = v.select("floatingElement");
    at(q, I) || at(B, I) || (C.clear(), w.current = "", A.current = O.current, m?.(!1));
  });
  Qe(() => {
    !S && y !== null || (C.clear(), O.current = null, w.current !== "" && (w.current = ""));
  }, [S, y, C]);
  const _ = b.useMemo(() => ({
    onKeyDown: M,
    onBlur: T
  }), [M, T]);
  return b.useMemo(() => g ? {
    reference: _,
    floating: _
  } : {}, [g, _]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = lv.startingStyle] = "startingStyle", n[n.endingStyle = lv.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const sT = {
  "data-popup-open": ""
}, cT = {
  "data-popup-open": "",
  "data-pressed": ""
}, uT = {
  "data-open": ""
}, fT = {
  "data-closed": ""
}, dT = {
  "data-anchor-hidden": ""
}, hT = {
  open(n) {
    return n ? sT : null;
  }
}, mT = {
  open(n) {
    return n ? cT : null;
  }
}, km = {
  open(n) {
    return n ? uT : fT;
  },
  anchorHidden(n) {
    return n ? dT : null;
  }
};
({
  ...km,
  ...Su
});
function pT(n) {
  return gm(19) ? n : n ? "true" : void 0;
}
const gT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    cutout: a,
    ...c
  } = o;
  let f;
  if (a) {
    const d = a.getBoundingClientRect();
    f = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${d.left}px ${d.top}px,${d.left}px ${d.bottom}px,${d.right}px ${d.bottom}px,${d.right}px ${d.top}px,${d.left}px ${d.top}px)`;
  }
  return /* @__PURE__ */ x.jsx("div", {
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
function bT(n) {
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
function ra(n, o) {
  const r = b.useRef(n), a = Fe(o);
  Qe(() => {
    r.current !== n && a(r.current), r.current = n;
  }, [n, a]);
}
function yT(n, o) {
  const r = Fe((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (Ts ? "touch" : ""));
  }), {
    onClick: a,
    onPointerDown: c
  } = bT(r);
  return b.useMemo(() => ({
    onClick: a,
    onPointerDown: c
  }), [a, c]);
}
function vT(n) {
  const [o, r] = b.useState(null), a = yT(n, r);
  return ra(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: a
  }), [o, a]);
}
function xT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function ST(n, o, r, a, c, f, d, m, g, h = 2) {
  const y = h2(r.current, {
    event: n,
    orientation: a,
    loopFocus: c,
    rtl: f,
    cols: h,
    disabledIndices: d,
    minIndex: m,
    maxIndex: g,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: o > g ? m : o,
    stopEvent: !0
  });
  return bs(r.current, y) ? void 0 : y;
}
const d1 = /* @__PURE__ */ b.createContext(void 0), h1 = /* @__PURE__ */ b.createContext(void 0), m1 = /* @__PURE__ */ b.createContext(void 0), p1 = /* @__PURE__ */ b.createContext(!1), g1 = /* @__PURE__ */ b.createContext("");
function Dl() {
  const n = b.useContext(d1);
  if (!n)
    throw new Error(Ro(22));
  return n;
}
function Ou() {
  const n = b.useContext(h1);
  if (!n)
    throw new Error(Ro(23));
  return n;
}
function Os() {
  const n = b.useContext(m1);
  if (!n)
    throw new Error(Ro(24));
  return n;
}
function zm() {
  return b.useContext(g1);
}
function ET() {
  return b.useContext(p1);
}
const CT = (n, o) => Object.is(n, o);
function Ii(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function RT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((a) => a === void 0 ? !1 : Ii(o, a, r));
}
function b1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((a) => a === void 0 ? !1 : Ii(a, o, r));
}
function ih(n, o, r, a) {
  const c = a && Array.isArray(o) ? o[o.length - 1] : o, f = b1(n, c, r);
  return f === -1 ? null : f;
}
function wT(n, o, r) {
  return n.filter((a) => !Ii(o, a, r));
}
function jh(n) {
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
function Dm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function _T(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Dm(o)) {
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
function ro(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return jh(n);
}
function cs(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? jh(n.value) : jh(n);
}
function y1(n, o, r) {
  function a() {
    return ro(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? a();
  if (Array.isArray(o)) {
    const c = o, f = Dm(c) ? c.flatMap((d) => d.items) : c;
    if (n == null || typeof n != "object") {
      const d = f.find((m) => m.value === n);
      return d && d.label != null ? d.label : a();
    }
    if ("value" in n) {
      const d = f.find((m) => m && m.value === n.value);
      if (d && d.label != null)
        return d.label;
    }
  }
  return a();
}
function MT(n, o, r) {
  return n.reduce((a, c, f) => (f > 0 && a.push(", "), a.push(/* @__PURE__ */ x.jsx(b.Fragment, {
    children: y1(c, o, r)
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
  hasNullItemLabel: (n, o) => o ? _T(n.items) : !1,
  open: (n) => n.open,
  mounted: (n) => n.mounted,
  forceMounted: (n) => n.forceMounted,
  inline: (n) => n.inline,
  activeIndex: (n) => n.activeIndex,
  selectedIndex: (n) => n.selectedIndex,
  isActive: (n, o) => n.activeIndex === o,
  isSelected: (n, o) => {
    const r = n.isItemEqualToValue, a = n.selectedValue;
    return Array.isArray(a) ? a.some((c) => Ii(o, c, r)) : Ii(o, a, r);
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
}, AT = {
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
}, v1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, TT = {
  disabled: !1,
  ...v1
}, x1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, S1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: AT,
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
  state: TT,
  registerFieldControl: Xt,
  validation: {
    getValidationProps: (n, o = bl) => o,
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
}, E1 = /* @__PURE__ */ b.createContext(S1);
function ya(n = !0) {
  const o = b.useContext(E1);
  if (o.setValidityData === Xt && !n)
    throw new Error(Ro(28));
  return o;
}
function C1(n, o, r, a, c = !0, f) {
  const {
    registerFieldControl: d
  } = ya(), m = zl(() => /* @__PURE__ */ Symbol());
  Qe(() => {
    const g = m.current;
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
  }, [n, c, a, o, f, d, m, r]), Qe(() => {
    const g = m.current;
    return () => {
      d(g, void 0);
    };
  }, [d, m]);
}
const OT = /* @__PURE__ */ b.createContext({
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
function R1() {
  return b.useContext(OT);
}
const NT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Xt,
  labelId: void 0,
  setLabelId: Xt,
  messageIds: [],
  setMessageIds: Xt,
  getDescriptionProps: (n) => n
});
function Nu() {
  return b.useContext(NT);
}
function jm(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: a
  } = n, {
    controlId: c,
    registerControlId: f
  } = Nu(), d = vu(o), m = r ? c : void 0, g = zl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), v = Fe(() => {
    !h.current || f === Xt || (h.current = !1, f(g.current, void 0));
  });
  return Qe(() => {
    if (f === Xt)
      return;
    let S;
    if (r) {
      const C = a?.current;
      dn(C) && C.closest("label") != null ? S = o ?? null : S = m ?? d;
    } else if (o != null)
      y.current = !0, S = o;
    else if (y.current)
      S = d;
    else {
      v();
      return;
    }
    if (S === void 0) {
      v();
      return;
    }
    h.current = !0, f(g.current, S);
  }, [o, a, m, f, r, d, g, v]), b.useEffect(() => v, [v]), c ?? d;
}
function w1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function kT(n, o) {
  return (r, a) => r == null ? !1 : n.contains(r, a, o);
}
function _1(n) {
  return Array.isArray(n) ? n.map((o) => _1(o)).join(",") : n == null ? "" : String(n);
}
const Mv = /* @__PURE__ */ new Map();
function zT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${_1(n.locale)}|${JSON.stringify(o)}`, a = Mv.get(r);
  if (a)
    return a;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, g) {
      if (!m)
        return !0;
      const h = ro(d, g);
      for (let y = 0; y <= h.length - m.length; y += 1)
        if (c.compare(h.slice(y, y + m.length), m) === 0)
          return !0;
      return !1;
    },
    startsWith(d, m, g) {
      if (!m)
        return !0;
      const h = ro(d, g);
      return c.compare(h.slice(0, m.length), m) === 0;
    },
    endsWith(d, m, g) {
      if (!m)
        return !0;
      const h = ro(d, g), y = m.length;
      return h.length >= y && c.compare(h.slice(h.length - y), m) === 0;
    }
  };
  return Mv.set(r, f), f;
}
const DT = zT;
function jT(n, o = !1) {
  const {
    overflowY: r
  } = yl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function LT(n, o, r = (a, c) => a === c) {
  return n.length === o.length && n.every((a, c) => r(a, o[c]));
}
const M1 = /* @__PURE__ */ Symbol("none"), rh = {
  value: M1,
  index: -1
}, VT = /* @__PURE__ */ b.createContext(void 0);
function Lm() {
  return b.useContext(VT)?.direction ?? "ltr";
}
function IT(n) {
  const {
    id: o,
    onOpenChangeComplete: r,
    defaultSelectedValue: a = null,
    selectedValue: c,
    onSelectedValueChange: f,
    defaultInputValue: d,
    inputValue: m,
    open: g,
    defaultOpen: h = !1,
    selectionMode: y,
    onItemHighlighted: v,
    name: S,
    form: C,
    disabled: w = !1,
    readOnly: A = !1,
    required: O = !1,
    inputRef: M,
    grid: T = !1,
    items: _,
    filteredItems: k,
    filter: I,
    openOnInputClick: q = !0,
    autoHighlight: B = !1,
    keepHighlight: j = !1,
    highlightItemOnHover: P = !0,
    loopFocus: te = !0,
    itemToStringLabel: se,
    itemToStringValue: fe,
    isItemEqualToValue: le = CT,
    virtualized: he = !1,
    inline: be = !1,
    fillInputOnItemPress: V = !0,
    modal: H = !1,
    limit: F = -1,
    autoComplete: ve = "list",
    formAutoComplete: ae,
    locale: z,
    submitOnItemClick: K = !1
  } = n, {
    clearErrors: ne
  } = R1(), {
    setDirty: oe,
    validityData: pe,
    setFilled: we,
    name: qe,
    disabled: Me,
    setTouched: Te,
    setFocused: it,
    validationMode: pt,
    validation: ze
  } = ya(), et = Lm(), ke = jm({
    id: o
  }), Le = DT({
    locale: z
  }), [Ue, _e] = b.useState(!1), [Ze, Oe] = b.useState(null), We = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ye = b.useRef(null), Q = b.useRef(null), ce = b.useRef(null), He = b.useRef(null), Ce = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Tt = b.useRef(null), St = b.useRef(null), Bt = b.useRef(rh), kt = b.useRef(null), xt = b.useRef([]), on = b.useRef(null), st = Me || w, Et = qe ?? S, Jt = y === "multiple", Rn = y === "single", Ft = m !== void 0 || d !== void 0, Wt = _ !== void 0, ot = k !== void 0;
  let ut;
  B === "always" ? ut = "always" : ut = B ? "input-change" : !1;
  const [Ke, Qt] = Fc({
    controlled: c,
    default: Jt ? a ?? ia : a,
    name: "Combobox",
    state: "selectedValue"
  }), wn = b.useMemo(() => I === null ? () => !0 : I !== void 0 ? I : kT(Le, se), [I, Le, se]), _n = zl(() => Ft ? d ?? "" : Rn ? ro(Ke, se) : "").current, [Yt, nl] = Fc({
    controlled: m,
    default: _n,
    name: "Combobox",
    state: "inputValue"
  }), [zt, so] = Fc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Fn = Dm(_), rn = Ze ?? String(Yt).trim(), co = Rn ? ro(Ke, se) : "", jl = Rn && !Ue && rn !== "" && co.length === rn.length && Le.contains(co, rn), ll = jl ? "" : rn, wo = Wt && ot && jl, an = b.useMemo(() => _ ? Fn ? _.flatMap((Y) => Y.items) : _ : ia, [_, Fn]), Ct = b.useMemo(() => {
    if (k && !wo)
      return k;
    if (!_)
      return ia;
    if (Fn) {
      const Z = _, Se = [];
      let Re = 0;
      for (const Ie of Z) {
        if (F > -1 && Re >= F)
          break;
        const Ne = F > -1 ? F - Re : 1 / 0, Ae = ll === "" ? Ie.items.slice(0, Ne) : [];
        if (ll !== "")
          for (const wt of Ie.items) {
            if (Ae.length >= Ne)
              break;
            wn(wt, ll, se) && Ae.push(wt);
          }
        if (Ae.length > 0) {
          const wt = {
            ...Ie,
            items: Ae
          };
          Se.push(wt), Re += Ae.length;
        }
      }
      return Se;
    }
    if (ll === "")
      return F > -1 ? an.slice(0, F) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        an
      );
    const Y = [];
    for (const Z of an) {
      if (F > -1 && Y.length >= F)
        break;
      wn(Z, ll, se) && Y.push(Z);
    }
    return Y;
  }, [k, wo, _, Fn, ll, F, wn, se, an]), Rt = b.useMemo(() => Fn ? Ct.flatMap((Z) => Z.items) : Ct, [Ct, Fn]), Ye = zl(() => {
    let Y = null;
    return be && zt && Wt && y !== "none" && (Y = ih(Rt, Ke, le, Jt)), new f1({
      id: ke,
      labelId: void 0,
      selectedValue: Ke,
      open: zt,
      items: _,
      selectionMode: y,
      listRef: We,
      labelsRef: tt,
      popupRef: Xe,
      emptyRef: He,
      inputRef: ye,
      startDismissRef: Q,
      endDismissRef: ce,
      keyboardActiveRef: Ce,
      chipsContainerRef: nt,
      clearRef: Tt,
      valuesRef: xt,
      pointerDownItemRef: on,
      selectionEventRef: St,
      name: Et,
      form: C,
      disabled: st,
      readOnly: A,
      required: O,
      grid: T,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: se,
      isItemEqualToValue: le,
      modal: H,
      autoHighlight: ut,
      submitOnItemClick: K,
      hasInputValue: Ft,
      mounted: !1,
      forceMounted: !1,
      transitionStatus: "idle",
      inline: be,
      activeIndex: null,
      selectedIndex: Y,
      popupProps: {},
      listProps: {},
      inputProps: {},
      triggerProps: {},
      itemProps: bl,
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
  }).current, Gn = y === "none" ? Yt : Ke, Gi = b.useMemo(() => y === "none" ? Gn : Array.isArray(Ke) ? Ke.map((Y) => cs(Y, fe)) : cs(Ke, fe), [Gn, fe, y, Ke]), dt = Fe(v), Yi = Fe(r), Jl = xe(Ye, Ee.activeIndex), uo = xe(Ye, Ee.selectedIndex), Yn = xe(Ye, Ee.positionerElement), Ll = xe(Ye, Ee.listElement), ol = xe(Ye, Ee.triggerElement), il = xe(Ye, Ee.inputElement), en = xe(Ye, Ee.inputGroupElement), mn = xe(Ye, Ee.inline), Mn = xe(Ye, Ee.inputInsidePopup), Wl = xe(Ye, Ee.inputOwnsFormValue), vl = gl(ol), {
    mounted: qi,
    setMounted: $o,
    transitionStatus: Jo
  } = Rm(zt), {
    openMethod: Mr,
    triggerProps: eo
  } = vT(zt), Wo = Fe(() => Gi);
  C1(Mn ? vl : ye, ke, Gn, Wo, !st, S);
  const rl = Fe(() => {
    _ ? tt.current = Rt.map((Y) => ro(Y, se)) : Ye.set("forceMounted", !0);
  }), sn = Fe((Y, Z, Se) => {
    if (Z === -1) {
      if (Bt.current === rh)
        return;
      Bt.current = rh;
    } else
      Bt.current = {
        value: Y,
        index: Z
      };
    dt(Y, IA(Se, void 0, {
      index: Z
    }));
  }), Qn = Fe((Y) => {
    Ye.update(Y);
    const Z = Y.activeIndex;
    if (Z === void 0)
      return;
    const Se = Y.type || Kl;
    Z === null ? sn(void 0, -1, Se) : sn(xt.current[Z], Z, Se);
  }), Zn = Fe((Y, Z) => {
    if (Ge.current = Z.reason === vo, n.onInputValueChange?.(Y, Z), !Z.isCanceled) {
      if (Z.reason === hs) {
        zt && Ze !== null && Oe(null);
        const Se = Z.event, Re = Se.inputType;
        if (Se.type === "compositionend" || Re != null && Re !== "" && Re !== "insertReplacementText") {
          const Ne = Y.trim() !== "";
          Ne && _e(!0), kt.current = {
            hasQuery: Ne
          };
          const Ae = Ye.state.listElement;
          if (!Ye.state.virtualized && Ae) {
            const wt = Xe.current;
            for (const Ht of ha(Ae.firstElementChild ?? Ae)) {
              if (!Kt(Ht) || (wt ? !at(wt, Ht) : Ht.getAttribute("role") === "dialog"))
                break;
              if (jT(Ht)) {
                Ht.scrollTop = 0;
                break;
              }
            }
          }
          Ne && ut && Ye.state.activeIndex == null && (zt || mn) && Ye.set("activeIndex", 0);
        }
      } else Z.reason === vo && Y === "" && Ye.state.inputInsidePopup && (kt.current = {
        hasQuery: !1,
        selection: !0
      });
      nl(Y);
    }
  }), zn = Fe((Y, Z) => {
    if (zt !== Y && (Z.reason === Sm && Wt && Rt.length === 0 && !He.current && Z.allowPropagation(), n.onOpenChange?.(Y, Z), !Z.isCanceled && (Y && Mn && !mn && Ze !== null && (_e(!1), Oe(null), Yt !== "" && Z.reason !== hs && Zn("", vt(vo, Z.event))), !Y && Ue && (Rn ? (mn || Oe(rn), rn === "" && _e(!1)) : Jt && (mn || Oe(rn), Mn && Qn({
      activeIndex: null
    }), (!Mn || mn) && Zn("", vt(vo, Z.event)))), so(Y), !Y && Mn && (Z.reason === xu || Z.reason === xm) && (Te(!0), it(!1), pt === "onBlur")))) {
      const Se = y === "none" ? Yt : Ke;
      ze.commit(Se);
    }
  }), Dn = Fe((Y, Z) => {
    if (f?.(Y, Z), Z.isCanceled)
      return;
    Qt(Y), (y === "none" && Xe.current && V || Rn && !Ye.state.inputInsidePopup) && Zn(ro(Y, se), vt(Z.reason, Z.event));
  }), _o = Fe((Y, Z) => {
    const Se = kl(Y), Re = St.current ?? Y;
    St.current = null;
    const Ie = vt(DA, Re), Ne = Se?.closest("a")?.getAttribute("href");
    if (Ne) {
      Ne.startsWith("#") && zn(!1, Ie);
      return;
    }
    if (Jt) {
      const Ae = Array.isArray(Ke) ? Ke : [], Ht = RT(Ae, Z, le) ? wT(Ae, Z, le) : [...Ae, Z];
      if (Dn(Ht, Ie), Ie.isCanceled || !(ye.current ? ye.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? Zn("", vt(vo, Ie.event)) : zn(!1, Ie);
    } else {
      if (Dn(Z, Ie), Ie.isCanceled)
        return;
      zn(!1, Ie);
    }
  }), va = Fe(() => {
    const Y = ze.inputRef.current?.form ?? Ye.state.inputElement?.form;
    Y && typeof Y.requestSubmit == "function" && Y.requestSubmit();
  }), An = Fe(() => {
    if ($o(!1), Yi?.(!1), _e(!1), Oe(null), Qn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), Jt && ye.current && ye.current.value !== "" && !Ge.current && Zn("", vt(vo)), Rn)
      if (Ye.state.inputInsidePopup)
        ye.current && ye.current.value !== "" && Zn("", vt(vo));
      else {
        const Y = ro(Ke, se);
        ye.current && ye.current.value !== Y && Zn(Y, vt(Y === "" ? vo : Kl));
      }
  }), Pi = b.useMemo(() => mn && Yn ? {
    current: Yn.closest('[role="dialog"]')
  } : Xe, [mn, Yn]);
  Eu({
    enabled: !n.actionsRef,
    open: zt,
    ref: Pi,
    onComplete() {
      zt || An();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: An
  }), [An]), Qe(function() {
    if (zt || (on.current = null, y === "none"))
      return;
    const Z = Wt ? an : xt.current;
    Qn({
      selectedIndex: ih(Z, Ke, le, Jt)
    });
  }, [zt, Ke, y, Jt, Wt, an, le, Qn]), Qe(() => {
    _ && (xt.current = Rt, We.current.length = Rt.length);
  }, [_, Rt]), Qe(() => {
    const Y = kt.current;
    if (Y) {
      const wt = zt || mn || Ye.state.positionerElement?.hidden === !1;
      if (Y.hasQuery)
        ut && wt && Ye.set("activeIndex", 0), kt.current = null;
      else if (String(Yt).trim() === "" && (kt.current = null, wt)) {
        const Ht = Y.selection;
        ut === "always" && !Ht && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || ye.current && ye.current.value.trim() !== "")
            return;
          const tn = Ye.state.selectedValue, Jn = Ye.state.selectionMode === "multiple", Ot = Jn && Array.isArray(tn) ? tn[tn.length - 1] : tn, pn = Ye.state.selectionMode !== "none" && Ot != null;
          if (pn || Ht) {
            const Sn = Wt || ot ? Rt : xt.current;
            Ye.set("activeIndex", pn ? ih(Sn, tn, Ye.state.isItemEqualToValue, Jn) : null);
          } else ut === "always" && Ye.set("activeIndex", 0);
        });
      }
    }
    if (!zt && !mn)
      return;
    const Se = Wt || ot ? Rt : xt.current, Re = Ye.state.activeIndex;
    if (Re == null) {
      if (ut === "always" && Se.length > 0) {
        Ye.set("activeIndex", 0);
        return;
      }
      sn(void 0, -1, Kl);
      return;
    }
    if (Re >= Se.length) {
      sn(void 0, -1, Kl), Ye.set("activeIndex", null);
      return;
    }
    const Ie = Se[Re], Ne = Bt.current.value, Ae = Ne !== M1 && Ii(Ie, Ne, Ye.state.isItemEqualToValue);
    (Bt.current.index !== Re || !Ae) && sn(Ie, Re, Kl);
  }, [
    Jl,
    ut,
    sn,
    ot,
    Wt,
    Rt,
    mn,
    zt,
    Ye,
    // Reruns the effect when the query changes without affecting the deps above, such as
    // clearing the input when no items are filtered out (individually rendered items).
    Yt
  ]), Qe(() => {
    if (y === "none") {
      we(String(Yt) !== "");
      return;
    }
    we(Jt ? Array.isArray(Ke) && Ke.length > 0 : Ke != null);
  }, [we, y, Yt, Ke, Jt]), b.useEffect(() => {
    Wt && ut && Rt.length === 0 && Qn({
      activeIndex: null
    });
  }, [Wt, ut, Rt.length, Qn]);
  function Ar(Y) {
    const Z = pe.initialValue;
    return Array.isArray(Y) && Array.isArray(Z) ? !LT(Y, Z, (Se, Re) => Ii(Se, Re, le)) : Y !== Z;
  }
  ra(rn, () => {
    !zt || rn === "" || rn === String(_n) || _e(!0);
  });
  function ei() {
    const Y = ro(Ke, se);
    Yt !== Y && Zn(Y, vt(Kl));
  }
  ra(Ke, () => {
    y !== "none" && (ne(Et), oe(Ar(Ke)), ze.change(Ke), Rn && !Ft && !Mn && ei());
  }), ra(Yt, () => {
    y === "none" && (ne(Et), oe(Yt !== pe.initialValue), ze.change(Yt));
  }), ra(_, () => {
    !Rn || Ft || Mn || Ue || ei();
  });
  const xl = eT({
    open: mn ? !0 : zt,
    onOpenChange: zn,
    elements: {
      reference: Mn ? ol : il,
      floating: Yn
    }
  }), Xi = T ? "grid" : "listbox", Mo = zt || mn, Vl = Mo ? "true" : "false", al = b.useMemo(() => {
    const Y = il?.tagName === "INPUT", Z = il == null || Y, Se = Z || Mo, Re = Z ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return Se && (Re.role = "combobox", Re["aria-expanded"] = Vl, Re["aria-haspopup"] = Xi, Re["aria-controls"] = Mo ? Ll?.id : void 0, Re["aria-autocomplete"] = ve), {
      reference: Re,
      floating: {
        role: "presentation"
      }
    };
  }, [il, Mo, Vl, Xi, Ll?.id, ve]), ti = c1(xl, {
    enabled: !A && !st && q,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Mn ? 0 : 100,
    reason: LA
  }), cn = I2(xl, {
    enabled: !A && !st && !mn,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: mn ? !0 : void 0,
    outsidePress(Y) {
      const Z = kl(Y);
      return !at(ol, Z) && !at(Tt.current, Z) && !at(nt.current, Z) && !at(en, Z);
    }
  }), sl = rT(xl, {
    enabled: !A && !st,
    id: ke,
    listRef: We,
    activeIndex: Jl,
    selectedIndex: uo,
    virtual: !0,
    loopFocus: te,
    allowEscape: te && !ut,
    focusItemOnOpen: Ue || y === "none" && !ut ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !j,
    orientation: T ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: ia,
    grid: T ? ST : void 0,
    onNavigate(Y, Z) {
      !Z && !zt || Jo === "ending" || Qn(Z ? {
        activeIndex: Y,
        type: Ce.current ? Em : Cm
      } : {
        activeIndex: Y
      });
    }
  }), to = b.useMemo(() => sa(sl.reference, {
    onKeyDown(Y) {
      T && Ye.state.activeIndex == null && (Y.key === "ArrowLeft" || Y.key === "ArrowRight") && Y.preventBaseUIHandler();
    }
  }, cn.reference, ti.reference, al.reference), [sl.reference, cn.reference, ti.reference, al.reference, T, Ye]), Ao = b.useMemo(() => sa(J2, cn.floating), [cn.floating]), no = b.useMemo(() => sa(sl.floating, al.floating), [sl.floating, al.floating]), $n = b.useMemo(() => {
    const Y = sl.item;
    return Y ? {
      ...Y,
      onFocus: void 0
    } : bl;
  }, [sl.item]);
  xT(() => {
    Ye.update({
      inline: be,
      popupProps: Ao,
      listProps: no,
      inputProps: to,
      triggerProps: eo,
      itemProps: $n,
      setOpen: zn,
      setInputValue: Zn,
      setSelectedValue: Dn,
      setIndices: Qn,
      handleSelection: _o,
      forceMount: rl,
      requestSubmit: va,
      onOpenChangeComplete: Yi
    });
  }), Qe(() => {
    Ye.update({
      id: ke,
      selectedValue: Ke,
      open: zt,
      mounted: qi,
      transitionStatus: Jo,
      items: _,
      inline: be,
      popupProps: Ao,
      listProps: no,
      inputProps: to,
      triggerProps: eo,
      openMethod: Mr,
      itemProps: $n,
      selectionMode: y,
      name: Et,
      form: C,
      disabled: st,
      readOnly: A,
      required: O,
      grid: T,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: se,
      modal: H,
      autoHighlight: ut,
      isItemEqualToValue: le,
      submitOnItemClick: K,
      hasInputValue: Ft,
      inputOwnsFormValue: y === "none" && (be || !Ye.state.inputInsidePopup)
    });
  }, [Ye, ke, Ke, zt, qi, Jo, _, Ao, no, to, $n, Mr, eo, y, Et, st, A, O, T, he, q, se, H, le, K, Ft, be, ut, C]);
  const R = br(M, ze.inputRef), N = b.useMemo(() => ({
    query: rn,
    hasItems: Wt,
    filteredItems: Ct,
    flatFilteredItems: Rt
  }), [rn, Wt, Ct, Rt]), D = b.useMemo(() => Array.isArray(Gn) ? "" : cs(Gn, fe), [Gn, fe]), U = Jt && Array.isArray(Ke) && Ke.length > 0, ee = Jt || y === "none" && Wl ? void 0 : Et, re = b.useMemo(() => !Jt || !Array.isArray(Ke) || !Et ? null : Ke.map((Y) => {
    const Z = cs(Y, fe);
    return /* @__PURE__ */ x.jsx("input", {
      type: "hidden",
      form: C,
      name: Et,
      value: Z,
      disabled: st
    }, Z);
  }), [Jt, Ke, C, Et, fe, st]), ge = /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ x.jsx("input", {
      ...ze.getValidationProps(st, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Mn) {
            ol?.focus();
            return;
          }
          (ye.current || ol)?.focus();
        },
        // Handle browser autofill.
        onChange(Y) {
          if (Y.nativeEvent.defaultPrevented || st || A)
            return;
          const Z = Y.currentTarget.value, Se = Z.toLowerCase(), Re = vt(Kl, Y.nativeEvent), Ie = () => xt.current.findIndex((Ae) => cs(Ae, fe).toLowerCase() === Se || ro(Ae, se).toLowerCase() === Se);
          function Ne() {
            if (Jt)
              return;
            if (y === "none") {
              Zn(Z, Re);
              return;
            }
            let Ae = Ie();
            Ae === -1 && (Ae = xt.current.findIndex((Ht, tn) => {
              const Jn = tt.current[tn];
              return Jn != null && Jn.toLowerCase() === Se;
            }));
            const wt = Ae === -1 ? void 0 : xt.current[Ae];
            wt != null && Dn?.(wt, Re);
          }
          Rn && (rl(), _ && Ie() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(Ne);
        }
      }),
      id: ke && ee == null ? `${ke}-hidden-input` : void 0,
      form: C,
      name: ee,
      autoComplete: ae,
      disabled: st,
      required: O && !U,
      readOnly: A,
      value: D,
      ref: R,
      style: ee ? Tm : Am,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), re]
  });
  return /* @__PURE__ */ x.jsx(d1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ x.jsx(h1.Provider, {
      value: xl,
      children: /* @__PURE__ */ x.jsx(p1.Provider, {
        value: Wt,
        children: /* @__PURE__ */ x.jsx(m1.Provider, {
          value: N,
          children: /* @__PURE__ */ x.jsx(g1.Provider, {
            value: Yt,
            children: ge
          })
        })
      })
    })
  });
}
const A1 = {
  ...mT,
  ...x1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Gc = 5;
function HT(n, o) {
  const r = UT(o);
  return n.clientX >= r.left - Gc && n.clientX <= r.right + Gc && n.clientY >= r.top - Gc && n.clientY <= r.bottom + Gc;
}
function UT(n) {
  const o = n.getBoundingClientRect(), r = hn(n);
  if (Xx)
    return o;
  const a = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(a.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(a.width) || 0, m = parseFloat(a.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), v = Math.max(o.height, m, h), S = y - o.width, C = v - o.height;
  return {
    left: o.left - S / 2,
    right: o.right + S / 2,
    top: o.top - C / 2,
    bottom: o.bottom + C / 2
  };
}
function BT(n, o) {
  return n ?? o;
}
function T1(n) {
  const o = xe(n, Ee.mounted), r = xe(n, Ee.popupSide), a = xe(n, Ee.positionerElement);
  return o && a ? r : null;
}
function ku() {
  return Os().filteredItems.length === 0;
}
function GT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function YT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function O1(n, o, r) {
  const a = n.state.listRef.current[o];
  a && (n.state.selectionEventRef.current = r, a.click(), n.state.selectionEventRef.current = null);
}
const qT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: m,
    style: g,
    ...h
  } = o, {
    state: y,
    disabled: v,
    setTouched: S,
    setFocused: C,
    validationMode: w,
    validation: A
  } = ya(), {
    labelId: O
  } = Nu(), M = Dl(), T = xe(M, Ee.selectionMode), _ = xe(M, Ee.disabled), k = xe(M, Ee.readOnly), I = xe(M, Ee.required), q = xe(M, Ee.positionerElement), B = xe(M, Ee.listElement), j = xe(M, Ee.popupId), P = xe(M, Ee.triggerProps), te = xe(M, Ee.inputInsidePopup), se = xe(M, Ee.id), fe = xe(M, Ee.labelId), le = xe(M, Ee.open), he = xe(M, Ee.selectedValue), be = xe(M, Ee.activeIndex), V = xe(M, Ee.selectedIndex), H = xe(M, Ee.hasSelectedValue), F = Ou(), ve = zm(), ae = Vi(), z = v || _ || d, K = ku(), ne = T1(M);
  jm({
    id: te ? m : void 0
  });
  const oe = te ? m ?? se : m, pe = BT(O, fe);
  let we;
  le && te ? we = j ?? w1(se) : le && (we = B?.id);
  const qe = b.useRef("");
  function Me(Ue) {
    qe.current = Ue.pointerType;
  }
  const {
    reference: Te
  } = aT(F, {
    enabled: !le && !k && !_ && T === "single",
    listRef: M.state.labelsRef,
    activeIndex: be,
    selectedIndex: V,
    onMatch(Ue) {
      const _e = M.state.valuesRef.current[Ue];
      _e !== void 0 && M.state.setSelectedValue(_e, vt(Kl));
    }
  }), {
    reference: it
  } = c1(F, {
    enabled: !k && !_,
    event: "mousedown"
  }), {
    buttonRef: pt,
    getButtonProps: ze
  } = As({
    native: f,
    disabled: z
  }), et = {
    ...y,
    open: le,
    disabled: z,
    popupSide: ne,
    listEmpty: K,
    placeholder: T === "none" ? !1 : !H
  }, ke = Fe((Ue) => {
    M.set("triggerElement", Ue);
  });
  return $l("button", o, {
    ref: [r, pt, ke],
    state: et,
    props: [P, it, Te, {
      id: oe,
      tabIndex: te ? 0 : -1,
      role: te ? "combobox" : void 0,
      "aria-expanded": le,
      "aria-haspopup": te ? "dialog" : "listbox",
      "aria-controls": we,
      "aria-required": te && I || void 0,
      "aria-labelledby": pe,
      onPointerDown: Me,
      onPointerEnter: Me,
      onFocus() {
        C(!0), !(z || k) && ae.start(0, M.state.forceMount);
      },
      onBlur(Ue) {
        if (!at(q, Ue.relatedTarget) && (S(!0), C(!1), w === "onBlur")) {
          const _e = T === "none" ? ve : he;
          A.commit(_e);
        }
      },
      onMouseDown(Ue) {
        if (z || k || (te || F.set("domReferenceElement", Ue.currentTarget), M.state.forceMount(), qe.current !== "touch" && (M.state.inputRef.current?.focus(), te || Ue.preventDefault()), le))
          return;
        const _e = $t(Ue.currentTarget);
        function Ze(Oe) {
          const We = M.state.triggerElement;
          if (!We)
            return;
          const tt = kl(Oe), Xe = M.state.positionerElement, ye = M.state.listElement;
          at(We, tt) || at(Xe, tt) || at(ye, tt) || HT(Oe, We) || M.state.setOpen(!1, vt(VA, Oe));
        }
        te && _e.addEventListener("mouseup", Ze, {
          once: !0
        });
      },
      onKeyDown(Ue) {
        k || (Ue.key === "ArrowDown" || Ue.key === "ArrowUp") && (On(Ue), M.state.setOpen(!0, vt(Th, Ue.nativeEvent)), M.state.inputRef.current?.focus());
      }
    }, A.getValidationProps(z, h), ze],
    stateAttributesMapping: A1
  });
}), PT = /* @__PURE__ */ b.createContext(void 0);
function XT() {
  return b.useContext(PT);
}
const N1 = /* @__PURE__ */ b.createContext(void 0);
function Vm(n) {
  const o = b.useContext(N1);
  if (o === void 0 && !n)
    throw new Error(Ro(21));
  return o;
}
const k1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Dl(), {
    buttonRef: c,
    getButtonProps: f
  } = As({
    native: !1
  }), d = br(r, c);
  function m(h) {
    a.state.setOpen(!1, vt(jA, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: m
  });
  return /* @__PURE__ */ x.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Tm
  });
}), KT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    id: d,
    style: m,
    ...g
  } = o, {
    state: h,
    disabled: y,
    setTouched: v,
    setFocused: S,
    validationMode: C,
    validation: w
  } = ya(), {
    labelId: A
  } = Nu(), O = XT(), T = !!Vm(!0), _ = Dl(), k = zm(), I = Lm(), q = xe(_, Ee.required), B = xe(_, Ee.disabled), j = xe(_, Ee.readOnly), P = xe(_, Ee.name), te = xe(_, Ee.form), se = xe(_, Ee.selectionMode), fe = xe(_, Ee.autoHighlight), le = xe(_, Ee.inputProps), he = xe(_, Ee.triggerProps), be = xe(_, Ee.open), V = xe(_, Ee.mounted), H = xe(_, Ee.selectedValue), F = xe(_, Ee.id), ve = xe(_, Ee.inline), ae = xe(_, Ee.modal), z = !!fe, K = T1(_), ne = y || B || f, oe = ku(), pe = T || ve, we = !pe || ae, qe = vu(d ?? (pe ? void 0 : F)), Me = T ? v1 : h, [Te, it] = b.useState(null), pt = b.useRef(!1), ze = b.useRef(null), et = b.useRef(!1), ke = se === "none" && !T, Le = Fe((ye) => {
    const Q = T || _.state.inline;
    Q && !_.state.hasInputValue && _.state.setInputValue("", vt(Kl)), _.update({
      inputElement: ye,
      inputInsidePopup: Q,
      inputOwnsFormValue: ke
    });
  }), Ue = T ? g : w.getValidationProps(ne, g);
  function _e() {
    _.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: _.state.keyboardActiveRef.current ? Em : Cm
    });
  }
  function Ze() {
    _.state.keyboardActiveRef.current = !1;
  }
  const Oe = {
    ...Me,
    open: be,
    disabled: ne,
    readOnly: j,
    popupSide: K,
    listEmpty: oe
  };
  function We(ye) {
    if (!O)
      return;
    let Q;
    const {
      highlightedChipIndex: ce
    } = O, He = O.chipsRef.current.length, [Ce, Ge] = GT(I);
    return ce !== void 0 ? (ye.key === Ce ? (ye.preventDefault(), ce > 0 ? Q = ce - 1 : Q = void 0) : ye.key === Ge ? (ye.preventDefault(), ce < He - 1 ? Q = ce + 1 : Q = void 0) : (ye.key === "Backspace" || ye.key === "Delete") && (ye.preventDefault(), Q = YT(ce, H.length), _e()), Q) : (ye.key === Ce && (ye.currentTarget.selectionStart ?? 0) === 0 && H.length > 0 && (ye.preventDefault(), Q = He > 0 ? He - 1 : void 0), Q);
  }
  const tt = $l("input", o, {
    state: Oe,
    ref: [r, _.state.inputRef, Le],
    props: [le, he, {
      value: Te ?? k,
      "aria-readonly": j || void 0,
      "aria-required": q || void 0,
      "aria-labelledby": A,
      disabled: ne,
      readOnly: j,
      required: se === "none" ? q : void 0,
      form: te,
      ...ke && P && {
        name: P
      },
      id: qe,
      onFocus() {
        if (S(!0), !ve || !et.current)
          return;
        et.current = !1;
        const ye = ze.current;
        ye == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(_.state.valuesRef.current, ye) || _.state.setIndices({
          activeIndex: ye
        });
      },
      onBlur() {
        v(!0), S(!1);
        const ye = _.state.activeIndex;
        if (ve && ye !== null && fe !== "always" && (ze.current = ye, et.current = !0, _.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const Q = se === "none" ? k : H;
          w.commit(Q);
        }
      },
      onCompositionStart(ye) {
        ou || (pt.current = !0, it(ye.currentTarget.value));
      },
      onCompositionEnd(ye) {
        pt.current = !1;
        const Q = ye.currentTarget.value;
        it(null), _.state.setInputValue(Q, vt(hs, ye.nativeEvent));
      },
      onChange(ye) {
        const Q = ye.nativeEvent, ce = Q.inputType, He = !ce || ce === "insertReplacementText", Ce = pt.current || !He;
        function Ge(Bt) {
          j || ne || !Bt || !Ce || (_.state.setOpen(!0, vt(hs, Q)), z || _e());
        }
        if (pt.current) {
          const Bt = ye.currentTarget.value;
          it(Bt), Bt === "" && !_.state.openOnInputClick && !_.state.inputInsidePopup && _.state.setOpen(!1, vt(vo, Q));
          const kt = Bt.trim(), xt = z && kt !== "";
          Ge(kt), be && _.state.activeIndex !== null && !xt && _e();
          return;
        }
        const nt = vt(hs, Q);
        if (_.state.setInputValue(ye.currentTarget.value, nt), nt.isCanceled)
          return;
        const Tt = ye.currentTarget.value === "", St = vt(vo, Q);
        Tt && !_.state.inputInsidePopup && (se === "single" && _.state.setSelectedValue(null, St), _.state.openOnInputClick || _.state.setOpen(!1, St)), Ge(ye.currentTarget.value.trim()), be && _.state.activeIndex !== null && !z && _e();
      },
      onKeyDown(ye) {
        if (ne || j || ye.ctrlKey || ye.shiftKey || ye.altKey || ye.metaKey)
          return;
        _.state.keyboardActiveRef.current = !0;
        const Q = ye.currentTarget, ce = Q.scrollWidth - Q.clientWidth, He = I === "rtl";
        if (ye.key === "Home") {
          On(ye);
          const nt = iv && He ? Q.value.length : 0;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = 0;
          return;
        }
        if (ye.key === "End") {
          On(ye);
          const nt = iv && He ? 0 : Q.value.length;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = He ? -ce : ce;
          return;
        }
        if (!V && ye.key === "Escape") {
          const nt = se === "multiple" && Array.isArray(H) ? H.length === 0 : H === null, Tt = vt(Sm, ye.nativeEvent), St = se === "multiple" ? [] : null;
          _.state.setInputValue("", Tt), _.state.setSelectedValue(St, Tt), !nt && !_.state.inline && !Tt.isPropagationAllowed && ye.stopPropagation();
          return;
        }
        if (O && ye.key === "Backspace" && Q.value === "" && O.highlightedChipIndex === void 0 && Array.isArray(H) && H.length > 0) {
          const nt = O.chipsRef.current.length, Tt = nt > 0 ? nt - 1 : H.length - 1, St = H.filter((Bt, kt) => kt !== Tt);
          _e(), _.state.setSelectedValue(St, vt(Kl, ye.nativeEvent));
          return;
        }
        const Ce = O?.highlightedChipIndex !== void 0, Ge = We(ye);
        if (O?.setHighlightedChipIndex(Ge), Ge !== void 0 ? O?.chipsRef.current[Ge]?.focus() : Ce && _.state.inputRef.current?.focus(), ye.which !== 229 && ye.key === "Enter" && be) {
          const nt = _.state.activeIndex, Tt = ye.nativeEvent;
          if (nt === null) {
            if (ve)
              return;
            _.state.setOpen(!1, vt(Kl, Tt));
            return;
          }
          On(ye), O1(_, nt, Tt);
        }
      },
      onPointerMove: Ze,
      onPointerDown: Ze
    }, Ue],
    stateAttributesMapping: A1
  }), Xe = T ? /* @__PURE__ */ x.jsx(E1.Provider, {
    value: S1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ x.jsxs(b.Fragment, {
    children: [be && we && /* @__PURE__ */ x.jsx(k1, {
      ref: _.state.startDismissRef
    }), Xe]
  });
}), FT = {
  ...Su,
  ...hT
}, QT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: m = !1,
    style: g,
    ...h
  } = o, {
    disabled: y
  } = ya(), v = Dl(), S = xe(v, Ee.selectionMode), C = xe(v, Ee.disabled), w = xe(v, Ee.readOnly), A = xe(v, Ee.open), O = xe(v, Ee.selectedValue), M = xe(v, Ee.hasSelectionChips), T = zm();
  let _ = !1;
  S === "none" ? _ = T !== "" : S === "single" ? _ = O != null : _ = M;
  const k = y || C || f, {
    buttonRef: I,
    getButtonProps: q
  } = As({
    native: d,
    disabled: k
  }), {
    mounted: B,
    transitionStatus: j,
    setMounted: P
  } = Rm(_), te = {
    disabled: k,
    visible: _,
    open: A,
    transitionStatus: j
  };
  Eu({
    open: _,
    ref: v.state.clearRef,
    onComplete() {
      _ || P(!1);
    }
  });
  const se = $l("button", o, {
    state: te,
    ref: [r, I, v.state.clearRef],
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
        const he = v.state.keyboardActiveRef.current ? Em : Cm;
        v.state.setInputValue("", vt(nv, le.nativeEvent)), S !== "none" ? (v.state.setSelectedValue(Array.isArray(O) ? [] : null, vt(nv, le.nativeEvent)), v.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: he
        })) : v.state.setIndices({
          activeIndex: null,
          type: he
        }), v.state.inputRef.current?.focus();
      }
    }, h, q],
    stateAttributesMapping: FT
  });
  return m || B ? se : null;
}), ZT = /* @__PURE__ */ b.createContext(null);
function $T() {
  return b.useContext(ZT);
}
function JT(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Os(), a = $T(), c = a ? a.items : r;
  return /* @__PURE__ */ x.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const WT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var a;
  const {
    render: c,
    className: f,
    style: d,
    children: m,
    ...g
  } = o, h = Dl(), y = Ou(), v = !!Vm(!0), {
    filteredItems: S,
    hasItems: C
  } = Os(), w = xe(h, Ee.selectionMode), A = xe(h, Ee.grid), O = xe(h, Ee.listProps), M = xe(h, Ee.virtualized), T = xe(h, Ee.forceMounted), _ = w === "multiple", k = S.length === 0, I = Fe((fe) => {
    h.set("positionerElement", fe);
  }), q = Fe((fe) => {
    h.set("listElement", fe);
  }), B = b.useMemo(() => typeof m == "function" ? a || (a = /* @__PURE__ */ x.jsx(JT, {
    children: m
  })) : m, [m]), j = {
    empty: k
  }, P = y.useState("floatingId"), te = $l("div", o, {
    state: j,
    ref: [r, q, v ? null : I],
    props: [O, {
      children: B,
      tabIndex: -1,
      id: P,
      role: A ? "grid" : "listbox",
      "aria-multiselectable": _ ? "true" : void 0,
      onKeyDown(fe) {
        if (!(h.state.disabled || h.state.readOnly) && fe.key === "Enter") {
          const le = h.state.activeIndex;
          if (le == null)
            return;
          On(fe), O1(h, le, fe.nativeEvent);
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
  if (M)
    return te;
  const se = C && !T ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ x.jsx(cA, {
    elementsRef: h.state.listRef,
    labelsRef: se,
    children: te
  });
}), eO = "⁠", tO = 200;
function nO(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const a = o.currentNode;
    a.nodeValue !== "" && (r = a);
  }
  return r;
}
function lO() {
  const n = Vi(), o = b.useRef(null);
  return b.useEffect(() => {
    if (Ts)
      return;
    const r = o.current;
    if (r == null)
      return;
    const a = nO(r);
    if (a == null)
      return;
    const c = a.data, f = `${c}${eO}`;
    return a.nodeValue = f, n.start(tO, () => {
      a.nodeValue === f && (a.nodeValue = c);
    }), () => {
      n.clear(), a.nodeValue === f && (a.nodeValue = c);
    };
  }, [o, n]), o;
}
const z1 = /* @__PURE__ */ b.createContext(void 0);
function oO() {
  const n = b.useContext(z1);
  if (n === void 0)
    throw new Error(Ro(20));
  return n;
}
const iO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: a = !1,
    ...c
  } = o, f = Dl(), d = xe(f, Ee.mounted), m = xe(f, Ee.forceMounted);
  return d || a || m ? /* @__PURE__ */ x.jsx(z1.Provider, {
    value: a,
    children: /* @__PURE__ */ x.jsx(T2, {
      ref: r,
      ...c
    })
  }) : null;
}), rO = (n) => ({
  name: "arrow",
  options: n,
  async fn(o) {
    const {
      x: r,
      y: a,
      placement: c,
      rects: f,
      platform: d,
      elements: m,
      middlewareData: g
    } = o, {
      element: h,
      padding: y = 0,
      offsetParent: v = "real"
    } = Di(n, o) || {};
    if (h == null)
      return {};
    const S = K0(y), C = {
      x: r,
      y: a
    }, w = Wh(c), A = Jh(w), O = await d.getDimensions(h), M = w === "y", T = M ? "top" : "left", _ = M ? "bottom" : "right", k = M ? "clientHeight" : "clientWidth", I = f.reference[A] + f.reference[w] - C[w] - f.floating[A], q = C[w] - f.reference[w], B = v === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let j = m.floating[k] || f.floating[A];
    (!j || !await d.isElement?.(B)) && (j = m.floating[k] || f.floating[A]);
    const P = I / 2 - q / 2, te = j / 2 - O[A] / 2 - 1, se = Math.min(S[T], te), fe = Math.min(S[_], te), le = se, he = j - O[A] - fe, be = j / 2 - O[A] / 2 + P, V = X0(le, be, he), H = !g.arrow && Bi(c) != null && be !== V && f.reference[A] / 2 - (be < le ? se : fe) - O[A] / 2 < 0, F = H ? be < le ? be - le : be - he : 0;
    return {
      [w]: C[w] + F,
      data: {
        [w]: V,
        centerOffset: be - V - F,
        ...H && {
          alignmentOffset: F
        }
      },
      reset: H
    };
  }
}), aO = (n, o) => ({
  ...rO(n),
  options: [n, o]
}), sO = {
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
}, cO = {
  sideX: "left",
  sideY: "top"
}, Av = "--available-width", Tv = "--available-height";
function D1(n, o, r) {
  const a = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: a ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: a ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Ov(n, o, r) {
  const {
    rects: a,
    placement: c
  } = n;
  return {
    side: D1(o, Zl(c), r),
    align: Bi(c) || "center",
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
function uO(n) {
  return fO(n, tT);
}
function fO(n, o) {
  const {
    // Public parameters
    anchor: r,
    positionMethod: a = "absolute",
    side: c = "bottom",
    sideOffset: f = 0,
    align: d = "center",
    alignOffset: m = 0,
    collisionBoundary: g,
    collisionPadding: h = 5,
    sticky: y = !1,
    arrowPadding: v = 5,
    disableAnchorTracking: S = !1,
    inline: C,
    // Private parameters
    keepMounted: w = !1,
    floatingRootContext: A,
    mounted: O,
    collisionAvoidance: M,
    shift: T,
    nodeId: _,
    adaptiveOrigin: k,
    lazyFlip: I = !1,
    externalTree: q
  } = n, [B, j] = b.useState(null);
  !O && B !== null && j(null);
  const P = M.side || "flip", te = M.align || "flip", se = M.fallbackAxisSide || "end", fe = T?.crossAxis ?? !1, le = T?.rootBoundary, he = typeof r == "function" ? r : void 0, be = Fe(he), V = he ? be : r, H = gl(r), F = gl(O), ae = Lm() === "rtl", z = B || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": ae ? "left" : "right",
    "inline-start": ae ? "right" : "left"
  }[c], K = d === "center" ? z : `${z}-${d}`;
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
  const oe = 1, pe = c === "bottom" ? oe : 0, we = c === "top" ? oe : 0, qe = c === "right" ? oe : 0, Me = c === "left" ? oe : 0, Te = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: ne
  }, it = b.useRef(null), pt = gl(f), ze = gl(m), et = typeof f != "function" ? f : 0, ke = typeof m != "function" ? m : 0, Le = [];
  C && Le.push(C), Le.push(P_((ot) => {
    const ut = Ov(ot, c, ae), Ke = typeof pt.current == "function" ? pt.current(ut) : pt.current, Qt = typeof ze.current == "function" ? ze.current(ut) : ze.current;
    return {
      mainAxis: Ke,
      crossAxis: Qt,
      alignmentAxis: Qt
    };
  }, [et, ke, ae, c]));
  const Ue = te === "none" && P !== "shift", _e = !Ue && (y || fe || P === "shift"), Ze = P === "none" ? null : F_({
    ...Te,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: ne.top + oe + pe,
      right: ne.right + oe + Me,
      bottom: ne.bottom + oe + we,
      left: ne.left + oe + qe
    },
    mainAxis: !fe && P === "flip",
    crossAxis: te === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: se
  }), Oe = Ue ? null : X_({
    ...Te,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: le,
    mainAxis: te !== "none",
    crossAxis: _e,
    limiter: y || fe ? void 0 : K_((ot) => {
      if (!it.current)
        return {};
      const {
        width: ut,
        height: Ke
      } = it.current.getBoundingClientRect(), Qt = Ql(Zl(ot.placement)), wn = Qt === "y" ? ut : Ke, _n = Qt === "y" ? ne.left + ne.right : ne.top + ne.bottom;
      return {
        offset: wn / 2 + _n / 2
      };
    })
  }, [Te, y, fe, le, ne, te]);
  P === "shift" || te === "shift" || d === "center" ? Le.push(Oe, Ze) : Le.push(Ze, Oe), Le.push(Q_({
    ...Te,
    apply({
      elements: {
        floating: ot
      },
      availableWidth: ut,
      availableHeight: Ke,
      rects: Qt
    }) {
      if (!F.current)
        return;
      const wn = ot.style;
      wn.setProperty(Av, `${ut}px`), wn.setProperty(Tv, `${Ke}px`);
      const _n = hn(ot).devicePixelRatio || 1, {
        x: Yt,
        y: nl,
        width: zt,
        height: so
      } = Qt.reference, Fn = (Math.round((Yt + zt) * _n) - Math.round(Yt * _n)) / _n, rn = (Math.round((nl + so) * _n) - Math.round(nl * _n)) / _n;
      wn.setProperty("--anchor-width", `${Fn}px`), wn.setProperty("--anchor-height", `${rn}px`);
    }
  }), aO((ot) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || $t(ot.elements.floating).createElement("div"),
    padding: v,
    offsetParent: "floating"
  }), [v]), {
    name: "transformOrigin",
    fn(ot) {
      const {
        elements: ut,
        middlewareData: Ke,
        placement: Qt,
        rects: wn,
        y: _n
      } = ot, Yt = Zl(Qt), nl = Ql(Yt), zt = it.current, so = Ke.arrow?.x || 0, Fn = Ke.arrow?.y || 0, rn = zt?.clientWidth || 0, co = zt?.clientHeight || 0, jl = so + rn / 2, ll = Fn + co / 2, wo = Math.abs(Ke.shift?.y || 0), an = wn.reference.height / 2, Ct = typeof f == "function" ? f(Ov(ot, c, ae)) : f, Rt = wo > Ct, Ye = {
        top: `${jl}px calc(100% + ${Ct}px)`,
        bottom: `${jl}px ${-Ct}px`,
        left: `calc(100% + ${Ct}px) ${ll}px`,
        right: `${-Ct}px ${ll}px`
      }[Yt], Gn = `${jl}px ${wn.reference.y + an - _n}px`;
      return ut.floating.style.setProperty("--transform-origin", _e && nl === "y" && Rt ? Gn : Ye), {};
    }
  }, sO, k), Qe(() => {
    !O && A && A.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [O, A]);
  const We = b.useMemo(() => ({
    elementResize: !S && typeof ResizeObserver < "u",
    layoutShift: !S && typeof IntersectionObserver < "u"
  }), [S]), {
    refs: tt,
    elements: Xe,
    x: ye,
    y: Q,
    middlewareData: ce,
    update: He,
    placement: Ce,
    context: Ge,
    isPositioned: nt,
    floatingStyles: Tt
  } = o({
    rootContext: A,
    open: w ? O : void 0,
    placement: K,
    middleware: Le,
    strategy: a,
    whileElementsMounted: w ? void 0 : (...ot) => Py(...ot, We),
    nodeId: _,
    externalTree: q
  }), {
    sideX: St,
    sideY: Bt
  } = ce.adaptiveOrigin || cO, kt = nt ? a : "fixed", xt = b.useMemo(() => {
    let ot;
    return nt ? k ? ot = {
      position: kt,
      [St]: ye,
      [Bt]: Q
    } : ot = {
      ...Tt,
      position: kt
    } : ot = {
      position: kt,
      top: 0,
      left: 0
    }, ot[Av] = "100vw", ot[Tv] = "100vh", nt || (ot.opacity = 0), ot;
  }, [k, kt, St, ye, Bt, Q, Tt, nt]), on = b.useRef(null);
  Qe(() => {
    if (!O)
      return;
    const ot = H.current, ut = typeof ot == "function" ? ot() : ot, Qt = (Nv(ut) ? ut.current : ut) || null || null;
    Qt !== on.current && (tt.setPositionReference(Qt), on.current = Qt);
  }, [O, tt, V, H]), b.useEffect(() => {
    if (!O)
      return;
    const ot = H.current;
    typeof ot != "function" && Nv(ot) && ot.current !== on.current && (tt.setPositionReference(ot.current), on.current = ot.current);
  }, [O, tt, V, H]), b.useEffect(() => {
    if (w && O && Xe.reference && Xe.floating)
      return Py(Xe.reference, Xe.floating, He, We);
  }, [w, O, Xe, He, We]);
  const st = Zl(Ce), Et = D1(c, st, ae), Jt = Bi(Ce) || "center", Rn = !!ce.hide?.referenceHidden;
  Qe(() => {
    I && O && nt && st !== z && j(st);
  }, [I, O, nt, st, z]);
  const Ft = b.useMemo(() => ({
    position: "absolute",
    top: ce.arrow?.y,
    left: ce.arrow?.x
  }), [ce.arrow]), Wt = ce.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: xt,
    arrowStyles: Ft,
    arrowRef: it,
    arrowUncentered: Wt,
    side: Et,
    align: Jt,
    physicalSide: st,
    anchorHidden: Rn,
    refs: tt,
    context: Ge,
    isPositioned: nt,
    update: He
  }), [xt, Ft, it, Wt, Et, Jt, st, Rn, tt, Ge, nt, He]);
}
function Nv(n) {
  return n != null && "current" in n;
}
function j1(n) {
  return n === "starting" ? C2 : bl;
}
function dO(n, o, {
  styles: r,
  transitionStatus: a,
  props: c,
  refs: f,
  hidden: d,
  inert: m = !1
}) {
  const g = {
    ...r
  };
  return m && (g.pointerEvents = "none"), $l("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: g
    }, j1(a), c],
    stateAttributesMapping: km
  });
}
const hO = 20;
function mO(n, o, r, a) {
  const [c, f] = b.useState(!1);
  Qe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = $t(r).documentElement.clientWidth, m = r.offsetWidth;
    f(d > 0 && m > 0 && m >= d - hO);
  }, [n, o, r]), s2(n && (!o || c), a);
}
const pO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    anchor: f,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod: d,
    side: m,
    align: g,
    sideOffset: h,
    alignOffset: y,
    collisionBoundary: v = "clipping-ancestors",
    collisionPadding: S,
    arrowPadding: C,
    sticky: w,
    disableAnchorTracking: A = !1,
    collisionAvoidance: O = w2,
    style: M,
    ...T
  } = o, _ = Dl(), k = Ou(), I = oO(), q = xe(_, Ee.modal), B = xe(_, Ee.open), j = xe(_, Ee.mounted), P = xe(_, Ee.openMethod), te = xe(_, Ee.positionerElement), se = xe(_, Ee.triggerElement), fe = xe(_, Ee.inputElement), le = xe(_, Ee.inputGroupElement), he = xe(_, Ee.inputInsidePopup), be = xe(_, Ee.transitionStatus), V = ku(), F = uO({
    anchor: f ?? (he ? se : le ?? fe),
    floatingRootContext: k,
    positionMethod: d,
    mounted: j,
    side: m,
    sideOffset: h,
    align: g,
    alignOffset: y,
    arrowPadding: C,
    collisionBoundary: v,
    collisionPadding: S,
    sticky: w,
    disableAnchorTracking: A,
    keepMounted: I,
    collisionAvoidance: O,
    lazyFlip: !0
  });
  mO(B && q, P === "touch", te, se);
  const ve = {
    open: B,
    side: F.side,
    align: F.align,
    anchorHidden: F.anchorHidden,
    empty: V
  };
  Qe(() => {
    _.set("popupSide", F.side);
  }, [_, F.side]);
  const ae = Fe((K) => {
    _.set("positionerElement", K);
  }), z = dO(o, ve, {
    styles: F.positionerStyles,
    transitionStatus: be,
    props: T,
    refs: [r, ae],
    hidden: !j,
    inert: !B
  });
  return /* @__PURE__ */ x.jsxs(N1.Provider, {
    value: F,
    children: [j && q && /* @__PURE__ */ x.jsx(gT, {
      inert: pT(!B),
      cutout: le ?? fe ?? se
    }), z]
  });
}), gO = {
  ...km,
  ...Su
}, bO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...g
  } = o, h = Dl(), y = Vm(), v = Ou(), S = xe(h, Ee.mounted), C = xe(h, Ee.open), w = xe(h, Ee.openMethod), A = xe(h, Ee.popupProps), O = xe(h, Ee.transitionStatus), M = xe(h, Ee.inputInsidePopup), T = xe(h, Ee.inputElement), _ = xe(h, Ee.modal), k = xe(h, Ee.id), I = ku(), q = g.id ?? (M ? w1(k) : void 0);
  Qe(() => (h.set("popupId", h.state.popupRef.current?.id || q), () => {
    h.set("popupId", void 0);
  }), [h, q]), Eu({
    open: C,
    ref: h.state.popupRef,
    onComplete() {
      C && h.state.onOpenChangeComplete(!0);
    }
  });
  const B = {
    open: C,
    side: y.side,
    align: y.align,
    anchorHidden: y.anchorHidden,
    transitionStatus: O,
    empty: I
  }, j = $l("div", o, {
    state: B,
    ref: [r, h.state.popupRef],
    props: [A, {
      id: q,
      role: M ? "dialog" : "presentation",
      onFocus(le) {
        const he = kl(le.nativeEvent);
        w !== "touch" && (at(h.state.listElement, he) || he === le.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, j1(O), g],
    stateAttributesMapping: gO
  }), te = d === void 0 ? M ? (le) => le === "touch" ? h.state.popupRef.current : T : !1 : d;
  let se;
  m != null ? se = m : se = M ? void 0 : !1;
  const fe = !M || _;
  return /* @__PURE__ */ x.jsx(j2, {
    context: v,
    disabled: !S,
    modal: fe,
    openInteractionType: w,
    initialFocus: te,
    returnFocus: se,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ x.jsxs(b.Fragment, {
      children: [j, fe && /* @__PURE__ */ x.jsx(k1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), L1 = /* @__PURE__ */ b.createContext(void 0);
function V1() {
  const n = b.useContext(L1);
  if (!n)
    throw new Error(Ro(19));
  return n;
}
const yO = /* @__PURE__ */ b.createContext(!1);
function vO() {
  return b.useContext(yO);
}
function I1(n) {
  const {
    componentProps: o,
    forwardedRef: r,
    virtualized: a,
    indexFromFilter: c
  } = n, {
    render: f,
    className: d,
    style: m,
    value: g = null,
    index: h,
    disabled: y = !1,
    nativeButton: v = !1,
    ...S
  } = o, C = b.useRef(null), w = UA({
    guess: !0,
    index: h,
    textRef: C
  }), A = Dl(), O = vO(), M = ET(), T = xe(A, Ee.selectionMode), _ = xe(A, Ee.disabled), k = xe(A, Ee.readOnly), I = xe(A, Ee.isItemEqualToValue), q = _ || y, B = T !== "none", j = h ?? c ?? w.index, P = j !== -1, te = xe(A, Ee.id), se = xe(A, Ee.isActive, j), fe = xe(A, Ee.isSelected, g), le = xe(A, Ee.itemProps), he = b.useRef(null), be = te != null && P ? `${te}-${j}` : void 0, V = fe && B;
  Qe(() => {
    if (!(P && (a || h != null)))
      return;
    const pe = A.state.listRef.current;
    return pe[j] = he.current, () => {
      delete pe[j];
    };
  }, [P, a, j, h, A]), Qe(() => {
    if (!P || M)
      return;
    const oe = A.state.valuesRef.current;
    return oe[j] = g, () => {
      delete oe[j];
    };
  }, [P, M, j, g, A]), Qe(() => {
    if (!P || M)
      return;
    const oe = A.state.selectedValue, pe = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Ii(g, pe, I) && A.set("selectedIndex", j);
  }, [P, M, A, j, g, I]);
  const {
    getButtonProps: H,
    buttonRef: F
  } = As({
    disabled: q,
    focusableWhenDisabled: !0,
    native: v,
    composite: !0
  }), ve = {
    disabled: q,
    selected: V,
    highlighted: se
  };
  function ae(oe) {
    function pe() {
      A.state.handleSelection(oe, g);
    }
    A.state.submitOnItemClick ? (pa.flushSync(pe), A.state.requestSubmit()) : pe();
  }
  const z = {
    id: be,
    role: O ? "gridcell" : "option",
    "aria-selected": B ? V : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(oe) {
      oe.isPrimary && (A.state.pointerDownItemRef.current = oe.currentTarget), oe.preventDefault();
    },
    onMouseDown(oe) {
      oe.preventDefault();
    },
    onClick(oe) {
      q || k || ae(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const pe = A.state.pointerDownItemRef.current === oe.currentTarget;
      A.state.pointerDownItemRef.current = null, !(q || k || oe.button !== 0 || pe || !se) && ae(oe.nativeEvent);
    }
  }, K = $l("div", o, {
    ref: [F, r, w.ref, he],
    state: ve,
    props: [le, z, S, H]
  }), ne = b.useMemo(() => ({
    selected: V,
    textRef: C
  }), [V, C]);
  return /* @__PURE__ */ x.jsx(L1.Provider, {
    value: ne,
    children: K
  });
}
function xO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, a = Dl(), c = xe(a, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = Os(), d = b1(f, o.value ?? null, c);
  return /* @__PURE__ */ x.jsx(I1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const SO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Dl(), c = xe(a, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ x.jsx(xO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ x.jsx(I1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), EO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    ...m
  } = o, {
    filteredItems: g
  } = Os(), h = Dl(), y = lO(), v = g.length === 0 ? d : null;
  return $l("div", o, {
    ref: [r, h.state.emptyRef, y],
    props: [{
      children: v,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, m]
  });
});
function CO(n, o, r, a = !0, c) {
  const [f, d] = b.useState(), m = vu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Qe(() => {
    const h = n || o || !a ? void 0 : RO(r.current, m);
    f !== h && d(h);
  }), g;
}
function RO(n, o) {
  const r = wO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function wO(n) {
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
function _O(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: a,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ x.jsx(IT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: a,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function MO(n) {
  const {
    children: o,
    placeholder: r
  } = n, a = Dl(), c = xe(a, Ee.itemToStringLabel), f = xe(a, Ee.selectedValue), d = xe(a, Ee.items), m = xe(a, Ee.selectionMode) === "multiple", g = xe(a, Ee.hasSelectedValue), h = !g && r != null && o == null, y = xe(a, Ee.hasNullItemLabel, h);
  let v = null;
  return typeof o == "function" ? v = o(f) : o != null ? v = o : !g && r != null && !y ? v = r : m && Array.isArray(f) ? v = MT(f, d, c) : v = y1(f, d, c), /* @__PURE__ */ x.jsx(b.Fragment, {
    children: v
  });
}
const AO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: a
  } = V1();
  return o.keepMounted || a ? /* @__PURE__ */ x.jsx(TO, {
    ...o,
    ref: r
  }) : null;
}), TO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: a,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: m
  } = V1(), g = b.useRef(null), {
    transitionStatus: h,
    setMounted: y
  } = Rm(m), S = $l("span", n, {
    ref: [o, g],
    state: {
      selected: m,
      transitionStatus: h
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: Su
  });
  return Eu({
    open: m,
    ref: g,
    onComplete() {
      m || y(!1);
    }
  }), S;
})), H1 = /* @__PURE__ */ b.createContext(void 0);
function OO() {
  const n = b.useContext(H1);
  if (n === void 0)
    throw new Error(Ro(63));
  return n;
}
const U1 = {
  ...x1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, NO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: a,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: m,
    id: g,
    inputRef: h,
    name: y,
    nativeButton: v = !1,
    onCheckedChange: S,
    readOnly: C = !1,
    required: w = !1,
    disabled: A = !1,
    render: O,
    uncheckedValue: M,
    value: T,
    style: _,
    ...k
  } = o, {
    clearErrors: I
  } = R1(), {
    state: q,
    setTouched: B,
    setDirty: j,
    validityData: P,
    setFilled: te,
    setFocused: se,
    validationMode: fe,
    disabled: le,
    name: he,
    validation: be
  } = ya(), {
    labelId: V
  } = Nu(), H = le || A, F = he ?? y, ve = b.useRef(null), ae = br(ve, h, be.inputRef), z = b.useRef(null), K = vu(), ne = jm({
    id: g,
    implicit: !1,
    controlRef: z
  }), oe = v ? void 0 : ne, [pe, we] = Fc({
    controlled: a,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  C1(z, K, pe, void 0, !H, y), Qe(() => {
    ve.current && te(ve.current.checked);
  }, [te]), ra(pe, () => {
    I(F), j(pe !== P.initialValue), te(pe), be.change(pe);
  });
  const {
    getButtonProps: qe,
    buttonRef: Me
  } = As({
    disabled: H,
    native: v
  }), Te = CO(d, V, ve, !v, oe), it = {
    id: v ? ne : K,
    role: "switch",
    "aria-checked": pe,
    "aria-readonly": C || void 0,
    "aria-required": w || void 0,
    "aria-labelledby": Te,
    onFocus() {
      H || se(!0);
    },
    onBlur() {
      const ke = ve.current;
      !ke || H || (B(!0), se(!1), fe === "onBlur" && be.commit(ke.checked));
    },
    onClick(ke) {
      if (C || H)
        return;
      ke.preventDefault();
      const Le = ve.current;
      Le && Qc(Le, ke);
    }
  }, pt = {
    ...be.getValidationProps(H),
    checked: pe,
    disabled: H,
    form: m,
    id: oe,
    name: F,
    required: w,
    style: F ? Tm : Am,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: ae,
    onChange(ke) {
      if (ke.nativeEvent.defaultPrevented)
        return;
      if (C) {
        ke.preventDefault();
        return;
      }
      const Le = ke.currentTarget.checked, Ue = vt(Kl, ke.nativeEvent);
      S?.(Le, Ue), !Ue.isCanceled && we(Le);
    },
    onClick(ke) {
      ke.stopPropagation();
    },
    onFocus() {
      z.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...T !== void 0 ? {
      value: T
    } : bl
  }, ze = b.useMemo(() => ({
    ...q,
    checked: pe,
    disabled: H,
    readOnly: C,
    required: w
  }), [q, pe, H, C, w]), et = $l("span", o, {
    state: ze,
    ref: [r, z, Me],
    props: [it, k, qe, (ke) => be.getValidationProps(H, ke)],
    stateAttributesMapping: U1
  });
  return /* @__PURE__ */ x.jsxs(H1.Provider, {
    value: ze,
    children: [et, !pe && F && M !== void 0 && /* @__PURE__ */ x.jsx("input", {
      type: "hidden",
      form: m,
      name: F,
      value: M,
      disabled: H
    }), /* @__PURE__ */ x.jsx("input", {
      ...pt,
      suppressHydrationWarning: !0
    })]
  });
}), kO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    ...d
  } = o, m = OO();
  return $l("span", o, {
    state: m,
    ref: r,
    stateAttributesMapping: U1,
    props: d
  });
});
function B1({ className: n, type: o, ...r }) {
  return /* @__PURE__ */ x.jsx(
    "input",
    {
      type: o,
      "data-slot": "input",
      className: Je(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        n
      ),
      ...r
    }
  );
}
function zO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: Je(
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
const DO = wr(
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
function jO({
  className: n,
  align: o = "inline-start",
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": o,
      className: Je(DO({ align: o }), n),
      onClick: (a) => {
        a.target.closest("button") || a.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const LO = wr(
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
function G1({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: a = "xs",
  ...c
}) {
  return /* @__PURE__ */ x.jsx(
    ki,
    {
      type: o,
      "data-size": a,
      variant: r,
      className: Je(LO({ size: a }), n),
      ...c
    }
  );
}
function VO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    B1,
    {
      "data-slot": "input-group-control",
      className: Je(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        n
      ),
      ...o
    }
  );
}
const IO = _O;
function HO({ ...n }) {
  return /* @__PURE__ */ x.jsx(MO, { "data-slot": "combobox-value", ...n });
}
function Y1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsxs(
    qT,
    {
      "data-slot": "combobox-trigger",
      className: Je("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsx(
          u0,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function UO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    QT,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ x.jsx(G1, { variant: "ghost", size: "icon-xs" }),
      className: Je(n),
      ...o,
      children: /* @__PURE__ */ x.jsx(h0, { className: "pointer-events-none" })
    }
  );
}
function BO({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: a = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ x.jsxs(zO, { className: Je("w-auto", n), children: [
    /* @__PURE__ */ x.jsx(
      KT,
      {
        render: /* @__PURE__ */ x.jsx(VO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ x.jsxs(jO, { align: "inline-end", children: [
      a && /* @__PURE__ */ x.jsx(
        G1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ x.jsx(Y1, {})
        }
      ),
      c && /* @__PURE__ */ x.jsx(UO, { disabled: r })
    ] }),
    o
  ] });
}
function GO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: a = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...m
}) {
  return /* @__PURE__ */ x.jsx(iO, { container: d, children: /* @__PURE__ */ x.jsx(
    pO,
    {
      side: o,
      sideOffset: r,
      align: a,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ x.jsx(
        bO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: Je(
            "group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            n
          ),
          ...m
        }
      )
    }
  ) });
}
function YO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    WT,
    {
      "data-slot": "combobox-list",
      className: Je(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        n
      ),
      ...o
    }
  );
}
function qO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ x.jsxs(
    SO,
    {
      "data-slot": "combobox-item",
      className: Je(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ x.jsx(
          AO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ x.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ x.jsx(dR, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function PO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    EO,
    {
      "data-slot": "combobox-empty",
      className: Je(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        n
      ),
      ...o
    }
  );
}
function XO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    mM,
    {
      "data-slot": "label",
      className: Je(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        n
      ),
      ...o
    }
  );
}
function Lh({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: Je(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        n
      ),
      ...o
    }
  );
}
const KO = wr(
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
function So({
  className: n,
  orientation: o = "vertical",
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": o,
      className: Je(KO({ orientation: o }), n),
      ...r
    }
  );
}
function Eo({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ x.jsx(
    XO,
    {
      "data-slot": "field-label",
      className: Je(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        n
      ),
      ...o
    }
  );
}
function ml({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: Je(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        n
      ),
      ...o
    }
  );
}
function ah({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: Je("group/item-group flex flex-col", n),
      ...o
    }
  );
}
const FO = wr(
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
function QO({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? p0 : "div";
  return /* @__PURE__ */ x.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: Je(FO({ variant: o, size: r }), n),
      ...c
    }
  );
}
function ZO({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "item-content",
      className: Je(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        n
      ),
      ...o
    }
  );
}
function $O({ className: n, ...o }) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      "data-slot": "item-title",
      className: Je(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        n
      ),
      ...o
    }
  );
}
function Oi({
  className: n,
  defaultValue: o,
  value: r,
  min: a = 0,
  max: c = 100,
  ...f
}) {
  const d = o ?? [a], m = b.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(d) ? d : [a],
    [r, d, a]
  );
  return /* @__PURE__ */ x.jsxs(
    MM,
    {
      "data-slot": "slider",
      defaultValue: r == null ? d : void 0,
      value: r,
      min: a,
      max: c,
      className: Je(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        n
      ),
      ...f,
      children: [
        /* @__PURE__ */ x.jsx(
          NM,
          {
            "data-slot": "slider-track",
            className: Je(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ x.jsx(
              kM,
              {
                "data-slot": "slider-range",
                className: Je(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: m.length }, (g, h) => /* @__PURE__ */ x.jsx(
          VM,
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
function kv({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ x.jsx(
    NO,
    {
      "data-slot": "switch",
      className: Je(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80",
        o === "default" && "h-[1.15rem] w-8",
        o === "sm" && "h-3.5 w-6",
        n
      ),
      ...r,
      children: /* @__PURE__ */ x.jsx(
        kO,
        {
          "data-slot": "switch-thumb",
          className: Je(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0 dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground",
            o === "default" && "size-4",
            o === "sm" && "size-3"
          )
        }
      )
    }
  );
}
const JO = wr(
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
), q1 = b.createContext({
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
  return /* @__PURE__ */ x.jsx(
    PM,
    {
      "data-slot": "toggle-group",
      "data-variant": o,
      "data-size": r,
      "data-spacing": a,
      style: { "--gap": a },
      className: Je(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        n
      ),
      ...f,
      children: /* @__PURE__ */ x.jsx(q1.Provider, { value: { variant: o, size: r, spacing: a }, children: c })
    }
  );
}
function fr({
  className: n,
  children: o,
  variant: r,
  size: a,
  ...c
}) {
  const f = b.useContext(q1);
  return /* @__PURE__ */ x.jsx(
    ZM,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || a,
      "data-spacing": f.spacing,
      className: Je(
        JO({
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
const zv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Dv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], Ol = ["#ff0099", "#b8ff00", "#00b7ff"], WO = Ol.length, eN = ["line", "spline", "gradient"], tN = ["spline", "shape", "gradient"], nN = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, lN = ["select", "lasso"], oN = ["point", "line", "spline", "shape"];
function iN(n, o) {
  const [r, a] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(a - r), Math.abs(f - c));
}
function rN(n, o) {
  const [r, a] = n, [c, f] = o;
  return Math.hypot(Math.abs(a - r), Math.abs(f - c));
}
function ua(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function jv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const aN = {
  select: TR,
  lasso: RR,
  polygon: NR,
  rectangle: UR,
  ellipse: Dy,
  point: Dy,
  line: f0,
  spline: IR,
  shape: d0
};
function Lv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ x.jsx(
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
        const c = aN[a] ?? d0, f = nN[a] ?? a;
        return /* @__PURE__ */ x.jsx(
          fr,
          {
            value: a,
            title: f,
            "aria-label": f,
            className: "size-6 min-w-6 px-0",
            children: /* @__PURE__ */ x.jsx(c, {})
          },
          a
        );
      })
    }
  ) : null;
}
function vs({ color: n, className: o }) {
  return /* @__PURE__ */ x.jsx(
    "span",
    {
      className: Je(
        "inline-block size-2.5 shrink-0 rounded-full ring-1 ring-border",
        o
      ),
      style: { backgroundColor: n },
      "aria-hidden": !0
    }
  );
}
function P1({ active: n }) {
  return /* @__PURE__ */ x.jsx(
    "span",
    {
      className: Je(
        "inline-block size-2.5 shrink-0 rounded-full border border-foreground",
        n ? "bg-foreground" : "bg-transparent"
      ),
      "aria-hidden": !0
    }
  );
}
function sN({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: a,
  onToggleFullscreen: c
}) {
  const f = n.filter((m) => lN.includes(m)), d = n.filter((m) => oN.includes(m));
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        f.length ? /* @__PURE__ */ x.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ x.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ x.jsx(Lv, { modes: f, value: o, onChange: r })
        ] }) : null,
        f.length && d.length ? /* @__PURE__ */ x.jsx(JM, { orientation: "vertical", className: "h-5" }) : null,
        d.length ? /* @__PURE__ */ x.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ x.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ x.jsx(Lv, { modes: d, value: o, onChange: r })
        ] }) : null,
        /* @__PURE__ */ x.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ x.jsx(
          ki,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: a ? "Exit full screen" : "Full screen",
            "aria-label": a ? "Exit full screen" : "Full screen",
            "aria-pressed": a,
            onClick: c,
            children: a ? /* @__PURE__ */ x.jsx(LR, {}) : /* @__PURE__ */ x.jsx(yR, {})
          }
        ) })
      ]
    }
  );
}
function sh({
  active: n,
  color: o,
  label: r,
  hidden: a,
  shown: c,
  onSelect: f,
  onRename: d,
  onDelete: m,
  onToggleHidden: g
}) {
  const [h, y] = b.useState(!1), [v, S] = b.useState(r);
  return /* @__PURE__ */ x.jsxs(
    QO,
    {
      variant: n ? "muted" : "default",
      size: "sm",
      className: Je(
        "w-full min-w-0 cursor-pointer flex-nowrap gap-1 px-0 py-0.5",
        n && "border-ring ring-[3px] ring-ring/35",
        a && "opacity-50"
      ),
      onClick: f,
      children: [
        g ? /* @__PURE__ */ x.jsx(
          ki,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": a ? "Show landmark" : "Hide landmark",
            onClick: (C) => {
              C.stopPropagation(), g();
            },
            children: a ? /* @__PURE__ */ x.jsx(ER, {}) : /* @__PURE__ */ x.jsx(xR, {})
          }
        ) : null,
        o ? /* @__PURE__ */ x.jsx(vs, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ x.jsx(P1, { active: c }) : null,
        /* @__PURE__ */ x.jsx(ZO, { className: "min-w-0 gap-0", children: h && d ? /* @__PURE__ */ x.jsx(
          B1,
          {
            "aria-label": "Rename layer",
            value: v,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (C) => C.stopPropagation(),
            onChange: (C) => S(C.target.value),
            onBlur: () => {
              d(v), y(!1);
            },
            onKeyDown: (C) => {
              C.stopPropagation(), C.key === "Enter" ? (C.preventDefault(), d(v), y(!1)) : C.key === "Escape" && (C.preventDefault(), S(r), y(!1));
            }
          }
        ) : /* @__PURE__ */ x.jsx(
          $O,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (C) => {
              d && (C.preventDefault(), C.stopPropagation(), S(r), y(!0));
            },
            children: r
          }
        ) }),
        m ? /* @__PURE__ */ x.jsx(
          ki,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (C) => {
              C.stopPropagation(), m();
            },
            children: /* @__PURE__ */ x.jsx(h0, {})
          }
        ) : null
      ]
    }
  );
}
const ma = "px-3";
function Vv(n, o) {
  const r = n?.vmin ?? 0, a = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, a));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function cN({
  colors: n,
  labels: o,
  lo: r,
  hi: a
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${uN(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ x.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ x.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ x.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ x.jsx(vs, { color: n[d] || "#94a3b8" }),
          /* @__PURE__ */ x.jsx("span", { className: "truncate", children: f })
        ]
      },
      `${f}-${d}`
    )) }),
    /* @__PURE__ */ x.jsx(
      "div",
      {
        className: "h-2.5 w-full rounded-full border border-border",
        style: { background: c }
      }
    ),
    /* @__PURE__ */ x.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground tabular-nums", children: [
      /* @__PURE__ */ x.jsx("span", { children: jv(r) }),
      /* @__PURE__ */ x.jsx("span", { children: jv(a) })
    ] })
  ] });
}
function uN(n, o) {
  const r = n.replace("#", ""), a = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(a.slice(0, 2), 16), g = parseInt(a.slice(2, 4), 16), h = parseInt(a.slice(4, 6), 16), y = Math.min(255, c + m), v = Math.min(255, f + g), S = Math.min(255, d + h);
  return `#${[y, v, S].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function fN(n, o, r, a, c, f, d) {
  const m = [
    [n, o],
    [r, a],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [y, v] = m[(h + 2) % 3], [S, C] = m[h], [w, A] = m[(h + 1) % 3], O = Math.hypot(S - y, C - v) || 1, M = Math.hypot(w - S, A - C) || 1, T = Math.min(d, O * 0.35, M * 0.35), _ = S + (y - S) / O * T, k = C + (v - C) / O * T, I = S + (w - S) / M * T, q = C + (A - C) / M * T;
    h === 0 ? g.push(`M ${_} ${k}`) : g.push(`L ${_} ${k}`), g.push(`Q ${S} ${C} ${I} ${q}`);
  }
  return g.push("Z"), g.join(" ");
}
const pl = 80, Im = 12, ch = 4, Iv = 5, dN = pl - 2 * Im, X1 = Math.sqrt(3) / 2 * dN, K1 = (pl - X1) / 2, F1 = K1 + X1, vr = { x: pl / 2, y: K1 }, xr = { x: Im, y: F1 }, Sr = { x: pl - Im, y: F1 }, Hv = {
  x: (xr.x + vr.x + Sr.x) / 3,
  y: (xr.y + vr.y + Sr.y) / 3
};
function Hm(n) {
  const o = n.x - Hv.x, r = n.y - Hv.y, a = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / a * Iv,
    y: n.y + r / a * Iv
  };
}
const Uv = Hm(xr), Bv = Hm(vr), Gv = Hm(Sr), Yv = fN(
  xr.x,
  xr.y,
  vr.x,
  vr.y,
  Sr.x,
  Sr.y,
  8
);
function uh(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function hN() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const a = r.createImageData(o, o), c = uh(Ol[0]), f = uh(Ol[1]), d = uh(Ol[2]), m = xr.x / pl, g = xr.y / pl, h = vr.x / pl, y = vr.y / pl, v = Sr.x / pl, S = Sr.y / pl, C = (y - S) * (m - v) + (v - h) * (g - S);
  for (let w = 0; w < o; w++)
    for (let A = 0; A < o; A++) {
      const O = (A + 0.5) / o, M = (w + 0.5) / o, T = ((y - S) * (O - v) + (v - h) * (M - S)) / C, _ = ((S - g) * (O - v) + (m - v) * (M - S)) / C, k = 1 - T - _, I = (w * o + A) * 4;
      if (T < -0.02 || _ < -0.02 || k < -0.02) {
        a.data[I + 3] = 0;
        continue;
      }
      const q = Math.max(0, T), B = Math.max(0, _), j = Math.max(0, k);
      a.data[I] = Math.min(255, Math.round(c[0] * q + f[0] * B + d[0] * j)), a.data[I + 1] = Math.min(
        255,
        Math.round(c[1] * q + f[1] * B + d[1] * j)
      ), a.data[I + 2] = Math.min(
        255,
        Math.round(c[2] * q + f[2] * B + d[2] * j)
      ), a.data[I + 3] = 255;
    }
  return r.putImageData(a, 0, 0), n.toDataURL();
}
function mN() {
  const n = b.useId(), o = b.useMemo(() => hN(), []);
  return /* @__PURE__ */ x.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ x.jsxs(
    "svg",
    {
      viewBox: `0 0 ${pl} ${pl}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ x.jsx("defs", { children: /* @__PURE__ */ x.jsx("clipPath", { id: n, children: /* @__PURE__ */ x.jsx("path", { d: Yv }) }) }),
        o ? /* @__PURE__ */ x.jsx(
          "image",
          {
            href: o,
            width: pl,
            height: pl,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ x.jsx(
          "path",
          {
            d: Yv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Uv.x,
            cy: Uv.y,
            r: ch,
            fill: Ol[0]
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Bv.x,
            cy: Bv.y,
            r: ch,
            fill: Ol[1]
          }
        ),
        /* @__PURE__ */ x.jsx(
          "circle",
          {
            cx: Gv.x,
            cy: Gv.y,
            r: ch,
            fill: Ol[2]
          }
        )
      ]
    }
  ) });
}
function pN({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: a, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (a !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ x.jsx(mN, {});
  const m = d.map((y, v) => Ol[v % Ol.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const v = r.find((S) => S.name === y);
      h = Math.max(h, Vv(v, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((S) => S.name === d[0]), v = Vv(y, c);
    g = v.lo, h = v.hi;
  }
  return /* @__PURE__ */ x.jsx(
    cN,
    {
      colors: m,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function gN({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: a, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ x.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ x.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ x.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ x.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ x.jsx(
        kv,
        {
          size: "sm",
          checked: a === "shared",
          onCheckedChange: (f) => n.setGeneScaleMode(f ? "shared" : "independent")
        }
      )
    ] }),
    /* @__PURE__ */ x.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ x.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "log1p",
        /* @__PURE__ */ x.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Compress high expression" })
      ] }),
      /* @__PURE__ */ x.jsx(
        kv,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function bN() {
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
    d || (d = a.ownerDocument.createElement("div"), d.setAttribute("data-spatial-rx-portal", ""), f.appendChild(d)), d.className = Je(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      a.classList.contains("dark") && "dark"
    ), r(d);
  }, []), [n, o];
}
function yN({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, a = o.map((g) => g.name), c = r || [], f = c.length >= WO, [d, m] = bN();
  return /* @__PURE__ */ x.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ x.jsxs(
      IO,
      {
        items: a,
        multiple: !0,
        value: c,
        onValueChange: (g) => {
          const h = Array.isArray(g) ? g.map(String) : [];
          n.setActiveGenes(h);
        },
        children: [
          /* @__PURE__ */ x.jsx(
            Y1,
            {
              render: /* @__PURE__ */ x.jsx(
                ki,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ x.jsx(HO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ x.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, v) => /* @__PURE__ */ x.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ x.jsx(
                            vs,
                            {
                              color: Ol[v % Ol.length]
                            }
                          ),
                          y
                        ]
                      },
                      y
                    )) }) : /* @__PURE__ */ x.jsx("span", { className: "text-muted-foreground", children: "Select genes" });
                  } })
                }
              )
            }
          ),
          /* @__PURE__ */ x.jsxs(
            GO,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ x.jsx(
                  BO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ x.jsx(PO, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ x.jsx(YO, { children: (g) => {
                  const h = String(g), y = c.indexOf(h), v = f && y < 0;
                  return /* @__PURE__ */ x.jsxs(
                    qO,
                    {
                      value: h,
                      disabled: v,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ x.jsx(
                          vs,
                          {
                            color: y >= 0 ? Ol[y % Ol.length] : "#94a3b8"
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
    /* @__PURE__ */ x.jsx(pN, { lm: n }),
    /* @__PURE__ */ x.jsx(gN, { lm: n })
  ] });
}
function vN({ lm: n }) {
  const {
    selections: o,
    landmarks: r,
    selected_kind: a,
    selected_index: c,
    category_columns: f,
    active_category: d,
    gene_columns: m,
    active_genes: g,
    color_by: h
  } = n, y = h === "continuous" && (g?.length || 0) > 0;
  return /* @__PURE__ */ x.jsxs(fm, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ x.jsx(dm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ x.jsx(hm, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ x.jsx(mm, { className: Je("min-h-0 overflow-y-auto pb-2", ma), children: /* @__PURE__ */ x.jsxs(
      um,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ x.jsxs(_i, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ x.jsx(ah, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((v, S) => /* @__PURE__ */ x.jsx(
              sh,
              {
                active: a === "selection" && c === S,
                color: Dv[S % Dv.length],
                label: v.id,
                onSelect: () => n.select("selection", S),
                onRename: (C) => n.renameSelection(S, C),
                onDelete: () => n.deleteSelection(S)
              },
              `${v.id}-${S}`
            )) }) : /* @__PURE__ */ x.jsx(ml, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ x.jsxs(_i, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((v) => {
              const S = !y && v.name === d;
              return /* @__PURE__ */ x.jsxs(tA, { className: "group/cat", children: [
                /* @__PURE__ */ x.jsxs(
                  nA,
                  {
                    className: Je(
                      "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                      S && "text-foreground"
                    ),
                    onClick: () => {
                      v.name === d && !y || (n.setActiveCategory(v), n.select("", -1));
                    },
                    children: [
                      /* @__PURE__ */ x.jsx(pR, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                      /* @__PURE__ */ x.jsx(P1, { active: S }),
                      /* @__PURE__ */ x.jsx("span", { className: "min-w-0 flex-1 truncate", children: v.name })
                    ]
                  }
                ),
                /* @__PURE__ */ x.jsx(lA, { className: "pl-4", children: /* @__PURE__ */ x.jsx(ah, { className: "gap-0.5", children: (v.labels || []).map((C, w) => /* @__PURE__ */ x.jsx(
                  sh,
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
          m.length ? /* @__PURE__ */ x.jsxs(_i, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Genes" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx(yN, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ x.jsxs(_i, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ x.jsx(ah, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((v, S) => /* @__PURE__ */ x.jsx(
              sh,
              {
                active: a === "landmark" && c === S,
                color: zv[S % zv.length],
                label: v.id,
                hidden: !!v.hidden,
                onSelect: () => n.select("landmark", S),
                onRename: (C) => n.renameLandmark(S, C),
                onToggleHidden: () => n.toggleLandmarkHidden(S),
                onDelete: () => n.deleteLandmark(S)
              },
              `${v.id}-${S}`
            )) }) : /* @__PURE__ */ x.jsx(ml, { children: "No landmarks yet." }) })
          ] })
        ]
      }
    ) })
  ] });
}
function xN({ lm: n }) {
  const o = rN(n.x_bounds, n.y_bounds), r = Math.max(o * 0.05, n.point_size * 5, 1e-6), a = Math.min(Math.max(n.point_size, 0), r), c = `${ua(o, "0")} across`;
  return /* @__PURE__ */ x.jsxs(fm, { className: "pointer-events-auto shrink-0 gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ x.jsx(dm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ x.jsx(hm, { className: "text-sm font-semibold tracking-tight", children: "Inspect" }) }),
    /* @__PURE__ */ x.jsx(mm, { className: Je("min-h-0 overflow-hidden pb-2", ma), children: /* @__PURE__ */ x.jsxs(um, { type: "multiple", defaultValue: ["style"], children: [
      /* @__PURE__ */ x.jsxs(_i, { value: "style", className: "border-b", children: [
        /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Style" }),
        /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs(Lh, { className: "gap-2", children: [
          /* @__PURE__ */ x.jsxs(So, { children: [
            /* @__PURE__ */ x.jsx(Eo, { children: "Point radius" }),
            /* @__PURE__ */ x.jsx(
              Oi,
              {
                min: 0,
                max: r,
                step: r / 200,
                value: [a],
                onValueChange: (f) => n.setPointSize(f[0] ?? 0)
              }
            ),
            /* @__PURE__ */ x.jsx(ml, { children: ua(n.point_size, "0") })
          ] }),
          /* @__PURE__ */ x.jsxs(So, { children: [
            /* @__PURE__ */ x.jsx(Eo, { children: "Point opacity" }),
            /* @__PURE__ */ x.jsx(
              Oi,
              {
                min: 0.05,
                max: 1,
                step: 0.01,
                value: [n.point_opacity],
                onValueChange: (f) => n.setPointOpacity(f[0] ?? 0.8)
              }
            ),
            /* @__PURE__ */ x.jsx(ml, { children: n.point_opacity.toFixed(2) })
          ] }),
          /* @__PURE__ */ x.jsxs(So, { children: [
            /* @__PURE__ */ x.jsx(Eo, { children: "Landmark opacity" }),
            /* @__PURE__ */ x.jsx(
              Oi,
              {
                min: 0.05,
                max: 1,
                step: 0.01,
                value: [n.landmark_opacity],
                onValueChange: (f) => n.setLandmarkOpacity(f[0] ?? 0.28)
              }
            ),
            /* @__PURE__ */ x.jsx(ml, { children: n.landmark_opacity.toFixed(2) })
          ] }),
          /* @__PURE__ */ x.jsxs(So, { children: [
            /* @__PURE__ */ x.jsx(Eo, { children: "Stroke" }),
            /* @__PURE__ */ x.jsx(
              Oi,
              {
                min: 1,
                max: 8,
                step: 1,
                value: [n.stroke_width],
                onValueChange: (f) => n.setStrokeWidth(f[0] ?? 2)
              }
            ),
            /* @__PURE__ */ x.jsxs(ml, { children: [
              String(n.stroke_width),
              " px"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ x.jsxs(_i, { value: "stats", children: [
        /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Stats" }),
        /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs("dl", { className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs", children: [
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Points" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.n_points }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Categories" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.category_columns.length }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Genes" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.gene_columns.length }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Selections" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.selections.length }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Landmarks" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.landmarks.length }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Color" }),
          /* @__PURE__ */ x.jsx("dd", { className: "truncate text-right font-medium", children: n.color_by }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "k max" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.neighbor_k_max }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "r max" }),
          /* @__PURE__ */ x.jsx("dd", { className: "text-right font-medium tabular-nums", children: ua(n.neighbor_radius_max, "0") }),
          /* @__PURE__ */ x.jsx("dt", { className: "text-muted-foreground", children: "Extent" }),
          /* @__PURE__ */ x.jsx("dd", { className: "truncate text-right font-medium", children: c })
        ] }) })
      ] })
    ] }) })
  ] });
}
function SN({ lm: n }) {
  const {
    default_tension: o,
    neighbor_radius_max: r,
    neighbor_k_max: a,
    x_bounds: c,
    y_bounds: f
  } = n, d = n.selectedLandmark(), m = !!d && tN.includes(d.type), g = !!d && eN.includes(d.type), h = n.activeNeighborhood(), y = !!h, v = Math.max(iN(c, f), 1), S = r > 0 ? r : v, C = Math.max(1, a || 64), w = Math.min(Number(h?.neighborhood_radius || 0), S);
  return /* @__PURE__ */ x.jsxs(fm, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ x.jsx(dm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ x.jsx(hm, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ x.jsx(mm, { className: Je("min-h-0 overflow-hidden pb-2", ma), children: /* @__PURE__ */ x.jsxs(
      um,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ x.jsxs(_i, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsx(Lh, { className: "gap-2", children: y ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
              /* @__PURE__ */ x.jsx(ml, { children: h.id ? String(h.id) : "Selection" }),
              /* @__PURE__ */ x.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ x.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ x.jsx(vs, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ x.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ x.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ x.jsxs(So, { children: [
                /* @__PURE__ */ x.jsx(Eo, { children: "Neighborhood" }),
                /* @__PURE__ */ x.jsxs(
                  Vh,
                  {
                    type: "single",
                    variant: "outline",
                    size: "sm",
                    spacing: 0,
                    value: h.neighborhood || "off",
                    onValueChange: (A) => {
                      A && n.patchNeighborhood({ neighborhood: A });
                    },
                    children: [
                      /* @__PURE__ */ x.jsx(fr, { value: "off", children: "Off" }),
                      /* @__PURE__ */ x.jsx(fr, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ x.jsx(fr, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              h.neighborhood === "radius" ? /* @__PURE__ */ x.jsxs(So, { children: [
                /* @__PURE__ */ x.jsx(Eo, { children: "Radius" }),
                /* @__PURE__ */ x.jsx(
                  Oi,
                  {
                    min: 0,
                    max: S,
                    step: S / 200 || 1,
                    value: [w],
                    onValueChange: (A) => {
                      const O = Math.min(Math.max(A[0] ?? 0, 0), S);
                      n.patchNeighborhood({
                        neighborhood: "radius",
                        neighborhood_radius: O
                      });
                    }
                  }
                ),
                /* @__PURE__ */ x.jsxs(ml, { children: [
                  ua(w, "0"),
                  S > 0 ? ` / ${ua(S, "0")}` : ""
                ] })
              ] }) : null,
              h.neighborhood === "knn" ? /* @__PURE__ */ x.jsxs(So, { children: [
                /* @__PURE__ */ x.jsx(Eo, { children: "k" }),
                /* @__PURE__ */ x.jsx(
                  Oi,
                  {
                    min: 1,
                    max: C,
                    step: 1,
                    value: [
                      Math.min(Number(h.neighborhood_k || 12), C)
                    ],
                    onValueChange: (A) => n.patchNeighborhood({
                      neighborhood: "knn",
                      neighborhood_k: A[0] ?? 12
                    })
                  }
                ),
                /* @__PURE__ */ x.jsx(ml, { children: String(
                  Math.min(Number(h.neighborhood_k || 12), C)
                ) })
              ] }) : null,
              /* @__PURE__ */ x.jsx(ml, { children: "Sliders subset the precomputed k-max / radius-max graphs. Shift+wheel sizes the neighborhood." })
            ] }) : /* @__PURE__ */ x.jsx(ml, { children: "Select a type or selection to edit neighbors." }) }) })
          ] }),
          m || g ? /* @__PURE__ */ x.jsxs(_i, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ x.jsx(Mi, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ x.jsx(Ai, { className: "px-0 pb-2", children: /* @__PURE__ */ x.jsxs(Lh, { className: "gap-2", children: [
              m ? /* @__PURE__ */ x.jsxs(So, { children: [
                /* @__PURE__ */ x.jsx(Eo, { children: "Tension" }),
                /* @__PURE__ */ x.jsx(
                  Oi,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [
                      Number(d?.tension ?? o ?? 0)
                    ],
                    onValueChange: (A) => n.patchLandmark({ tension: A[0] ?? 0 })
                  }
                ),
                /* @__PURE__ */ x.jsxs(ml, { children: [
                  Number(
                    d?.tension ?? o ?? 0
                  ).toPrecision(3),
                  ". 0 = smooth, 1 = straight."
                ] })
              ] }) : null,
              g ? /* @__PURE__ */ x.jsxs(x.Fragment, { children: [
                /* @__PURE__ */ x.jsxs(So, { children: [
                  /* @__PURE__ */ x.jsx(Eo, { children: "Buffer" }),
                  /* @__PURE__ */ x.jsxs(
                    Vh,
                    {
                      type: "single",
                      variant: "outline",
                      size: "sm",
                      spacing: 0,
                      value: d?.buffer_side || "both",
                      onValueChange: (A) => {
                        A && n.patchLandmark({ buffer_side: A });
                      },
                      children: [
                        /* @__PURE__ */ x.jsx(fr, { value: "left", children: "Left" }),
                        /* @__PURE__ */ x.jsx(fr, { value: "both", children: "Both" }),
                        /* @__PURE__ */ x.jsx(fr, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ x.jsxs(So, { children: [
                  /* @__PURE__ */ x.jsx(Eo, { children: "Width" }),
                  /* @__PURE__ */ x.jsx(
                    Oi,
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
                      onValueChange: (A) => n.patchLandmark({ buffer_width: A[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ x.jsx(ml, { children: ua(Number(d?.buffer_width || 0)) })
                ] }),
                /* @__PURE__ */ x.jsx(ml, { children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
function EN({
  onZoomIn: n,
  onZoomOut: o,
  onReset: r
}) {
  return /* @__PURE__ */ x.jsx(
    "div",
    {
      className: "absolute right-5 bottom-5 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm",
      onMouseDown: (a) => a.stopPropagation(),
      onWheel: (a) => a.stopPropagation(),
      onDoubleClick: (a) => a.stopPropagation(),
      children: /* @__PURE__ */ x.jsxs(eA, { orientation: "vertical", children: [
        /* @__PURE__ */ x.jsx(
          ki,
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
            children: /* @__PURE__ */ x.jsx(zR, {})
          }
        ),
        /* @__PURE__ */ x.jsx(
          ki,
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
            children: /* @__PURE__ */ x.jsx(f0, {})
          }
        ),
        /* @__PURE__ */ x.jsx(
          ki,
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
            children: /* @__PURE__ */ x.jsx(_R, {})
          }
        )
      ] })
    }
  );
}
const xs = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, CN = 3;
function Yc(n) {
  return { ...xs, ...n };
}
function Ih(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function RN(n, o) {
  const r = n.get("gene_columns") || [], a = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!a.has(f) || c.includes(f)) && (c.push(f), c.length >= CN))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((g) => g.name === d) || f[0];
    if (m) {
      Ih(n, m);
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
function wN(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function _N(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function Q1(n, o, r, a, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...xs, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const m = a.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...xs, id: d, column: f, ...m || {} };
  }
  return null;
}
function Z1(n, o, r, a, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (S, C) => C === r ? { ...xs, ...S, ...a } : S
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], y = h.findIndex(
    (S) => S.id === g && (!S.column || S.column === m)
  ), v = {
    ...xs,
    id: g,
    column: m,
    ...y >= 0 ? h[y] : {},
    ...a
  };
  y >= 0 ? h[y] = v : h.push(v), n.set("type_neighborhoods", h), n.save_changes();
}
function $1(n, o, r, a) {
  n.set(
    "landmarks",
    a.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function Hh(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function MN(n, o) {
  n.set("mode", o), n.save_changes();
}
function J1(n, o) {
  return n.filter((r, a) => a !== o);
}
function W1(n, o, r, a) {
  return o !== n ? { kind: o, index: r } : r === a ? { kind: "", index: -1 } : r > a ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function AN(n, o, r, a, c) {
  const f = W1("selection", a, c, o);
  n.set("selections", J1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function TN(n, o, r, a, c) {
  const f = W1("landmark", a, c, o);
  n.set("landmarks", J1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function ON(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function NN(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function kN(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (a, c) => c === o ? { ...a, hidden: !a.hidden } : a
    )
  ), n.save_changes();
}
function zN(n, o) {
  const r = Number(o);
  !Number.isFinite(r) || r < 0 || (n.set("point_size", r), n.save_changes());
}
function DN(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("point_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function jN(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("landmark_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function LN(n, o) {
  const r = Math.round(Number(o));
  Number.isFinite(r) && (n.set("stroke_width", Math.min(12, Math.max(1, r))), n.save_changes());
}
const Uh = "9.1.14", VN = `https://esm.sh/@deck.gl/core@${Uh}`, IN = `https://esm.sh/@deck.gl/layers@${Uh}?deps=@deck.gl/core@${Uh}`, wi = { depthCompare: "always", depthWriteEnabled: !1 }, qv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], fh = "#00e5cc", HN = 0.3, UN = 0.9, qc = 2, dh = 1, BN = 0.55, hh = ["line", "spline", "gradient"];
function mh(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Float32Array(r.buffer);
}
function ph(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let a = 0; a < o.length; a++) r[a] = o.charCodeAt(a);
  return new Int32Array(r.buffer);
}
function GN(n) {
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
function Pv({ model: n, host: o }) {
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
  const m = document.createElement("div");
  m.className = "landmarks__legend", m.hidden = !0;
  const g = document.createElement("div");
  g.className = "landmarks__tooltip", g.hidden = !0, f.append(d, m), o.append(f, g);
  let h = () => {
  };
  const y = new MutationObserver(() => {
    h(), T && dt();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function v(R, N, D) {
    g.textContent = R, g.hidden = !1;
    const U = o.getBoundingClientRect();
    g.style.left = `${N - U.left + 12}px`, g.style.top = `${D - U.top + 12}px`;
  }
  function S() {
    g.hidden = !0;
  }
  m.addEventListener("mousedown", (R) => R.stopPropagation()), m.addEventListener("wheel", (R) => R.stopPropagation(), { passive: !0 });
  const C = n.get("modes") || [], w = ["select", "lasso"].filter(
    (R) => C.includes(R)
  ), A = ["point", "line", "spline", "shape"].filter(
    (R) => C.includes(R)
  ), O = [...w, ...A];
  let M = n.get("mode") || "select";
  O.includes(M) || (M = O[0] || "select");
  let T = null, _ = null, k = null, I = 0, q = !1, B = null, j = null, P = { key: "", data: [] }, te = null, se = !1, fe = [], le = () => {
  }, he = () => {
  }, be = null, V = null, H = null, F = null;
  function ve() {
    const R = n.get("category_codes") || "";
    be = R ? ph(R) : null;
  }
  ve();
  function ae() {
    const R = n.get("gene_values") || "";
    V = R ? mh(R) : null;
  }
  ae();
  function z() {
    H = K(
      n.get("neighbor_indptr") || "",
      n.get("neighbor_indices") || "",
      n.get("neighbor_distances") || ""
    ), F = K(
      n.get("radius_indptr") || "",
      n.get("radius_indices") || "",
      n.get("radius_distances") || ""
    );
  }
  function K(R, N, D) {
    const U = ph(R), ee = ph(N), re = mh(D);
    return U.length ? { indptr: U, indices: ee, distances: re } : null;
  }
  z();
  function ne() {
    const R = n.get("category_columns") || [], N = n.get("active_category") || "";
    return R.findIndex((D) => D.name === N);
  }
  function oe(R) {
    n.get("category_columns");
    const N = ne(), D = Ke();
    return N < 0 || !be || !D.length ? Math.round(D[R]?.valueA || 0) : be[N * D.length + R];
  }
  const pe = ["#ff0099", "#b8ff00", "#00b7ff"];
  function we(R) {
    return (n.get("gene_columns") || []).find((D) => D.name === R) || null;
  }
  function qe(R, N) {
    const U = (n.get("gene_columns") || []).findIndex((re) => re.name === N), ee = Ke();
    return U < 0 || !V || !V.length || !ee.length ? null : V[U * ee.length + R];
  }
  function Me(R, N, D) {
    const U = Number.isFinite(N) ? N : 0, ee = Number.isFinite(D) && D > U ? D : U + 1, re = Math.max(0, Math.min(1, R ?? 0)), ge = Math.max(0, U + re * (ee - U));
    return n.get("gene_log1p") ? Math.log1p(ge) : ge;
  }
  function Te(R, N) {
    const D = Number.isFinite(R) ? R : 0, U = Number.isFinite(N) && N > D ? N : D + 1, ee = Math.max(0, U), re = Math.max(0, D);
    if (n.get("gene_log1p")) {
      const ge = Math.log1p(re), Y = Math.log1p(ee);
      return Y > ge ? Y : Y + 1e-6;
    }
    return ee > re ? ee : ee + 1e-6;
  }
  function it(R, N) {
    const D = Number.isFinite(R) ? R : 0, U = Math.max(0, D);
    return n.get("gene_log1p") ? Math.log1p(U) : U;
  }
  function pt(R, N, D) {
    const U = we(N);
    if (!U) return 0;
    const ee = qe(R, N);
    if (ee == null) return 0;
    const re = U.vmin ?? 0, ge = U.vmax ?? 1, Y = Me(ee, re, ge);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Ie = D > 0 ? D : Te(re, ge);
      return Math.max(0, Math.min(1, Y / Ie));
    }
    const Se = it(re), Re = Te(re, ge);
    return Re <= Se ? 0 : Math.max(0, Math.min(1, (Y - Se) / (Re - Se)));
  }
  function ze(R) {
    let N = 0;
    for (const D of R) {
      const U = we(D);
      U && (N = Math.max(N, Te(U.vmin ?? 0, U.vmax ?? 1)));
    }
    return N;
  }
  function et(R, N) {
    const D = n.get("active_genes") || [], U = Ke();
    if (!D.length || !U.length) return null;
    const ee = (n.get("gene_scale_mode") || "independent") === "shared" ? ze(D) : 0;
    let re = 0, ge = 0, Y = 0, Z = 0;
    for (let Se = 0; Se < D.length; Se++) {
      const Re = pt(R, D[Se], ee);
      if (!(Re > 0)) continue;
      const Ie = Et(pe[Se % pe.length], 1);
      re += Ie[0] * Re, ge += Ie[1] * Re, Y += Ie[2] * Re, Z += Re;
    }
    return Z < 1e-6 ? Et("#6b7280", N * 0.35) : [
      Math.min(255, Math.round(re)),
      Math.min(255, Math.round(ge)),
      Math.min(255, Math.round(Y)),
      Math.round(Math.max(0, Math.min(1, N)) * 255)
    ];
  }
  let ke = null, Le = [], Ue = !1, _e = null, Ze = "", Oe = -1, We = !1, tt = !1, Xe = !1, ye = [], Q = !1, ce = null, He = null;
  function Ce(R, N) {
    const D = new Set((N || []).map((U) => String(U.id)));
    for (let U = 1; ; U++) {
      const ee = `${R} ${U}`;
      if (!D.has(ee)) return ee;
    }
  }
  function Ge(R) {
    return Ce("landmark", R);
  }
  function nt(R) {
    return Ce("selection", R);
  }
  function Tt() {
    Le = [], ye = [], Xe = !1, Q = !1, ce = null, He = null;
  }
  function St(R) {
    const N = d.getBoundingClientRect();
    if (!N.width || !N.height) return null;
    const D = R.clientX - N.left, U = R.clientY - N.top, ee = T?.isInitialized ? T.getViewports()[0] : null;
    if (!ee) return null;
    const [re, ge] = ee.unproject([D, U]);
    return { x: re, y: ge, px: D, py: U };
  }
  function Bt() {
    return {
      dragPan: M === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function kt() {
    const R = M === "select";
    d.style.cursor = R ? "grab" : "crosshair", T && T.setProps({ controller: Bt() });
  }
  function xt() {
    const R = Math.max(1, Math.round(c.clientWidth || 1)), N = Math.max(1, Math.round(c.clientHeight || 1));
    T && T.setProps({ width: R, height: N, useDevicePixels: !0 });
    const D = n.get("axes_pixel_bounds") || [0, 0, R, N];
    return (D[2] !== R || D[3] !== N) && (n.set("axes_pixel_bounds", [0, 0, R, N]), n.save_changes()), { w: R, h: N };
  }
  function on(R) {
    if (!Number.isFinite(R)) return "";
    const N = Math.abs(R);
    return N !== 0 && (N >= 1e3 || N < 0.01) ? R.toExponential(1) : N >= 100 ? R.toFixed(0) : N >= 10 ? R.toFixed(1) : R.toFixed(2);
  }
  function st() {
    if (!m) return;
    const R = n.get("color_by") || "categorical", N = n.get("legend_title") || "", D = n.get("point_palette") || [], U = n.get("active_genes") || [];
    if (m.innerHTML = "", N) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-title", ee.textContent = N, m.appendChild(ee);
    }
    if (R === "continuous" && U.length > 0) {
      m.hidden = !0;
      return;
    }
    if (R === "continuous" && D.length > 1) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-bar", ee.style.background = `linear-gradient(to top, ${D[0]}, ${D[Math.floor(D.length / 2)]}, ${D[D.length - 1]})`;
      const re = document.createElement("div");
      re.className = "landmarks__legend-scale";
      const ge = document.createElement("span");
      ge.textContent = on(n.get("color_vmax"));
      const Y = document.createElement("span");
      Y.textContent = on(n.get("color_vmin")), re.appendChild(ge), re.appendChild(Y);
      const Z = document.createElement("div");
      Z.className = "landmarks__legend-continuous", Z.appendChild(ee), Z.appendChild(re), m.appendChild(Z), m.hidden = !1;
      return;
    }
    if (R === "categorical") {
      m.hidden = !0;
      return;
    }
    m.hidden = !N;
  }
  function Et(R, N) {
    const D = String(R || "#60a5fa").replace("#", ""), U = D.length === 3 ? D.split("").map((re) => re + re).join("") : D.padEnd(6, "0").slice(0, 6), ee = Number.parseInt(U, 16);
    return [
      ee >> 16 & 255,
      ee >> 8 & 255,
      ee & 255,
      Math.round(Math.max(0, Math.min(1, N)) * 255)
    ];
  }
  function Jt(R) {
    const N = n.get("point_opacity") ?? 0.75, D = n.get("color_by") || "categorical";
    let U;
    if (D === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        U = et(R.i, N) || Et("#6b7280", N * 0.35);
      else {
        const ge = n.get("point_palette") || ["#60a5fa"];
        if (ge.length > 1) {
          const Z = Math.max(0, Math.min(1, R.valueA)) * (ge.length - 1), Se = Math.floor(Z), Re = Math.min(ge.length - 1, Se + 1), Ie = Z - Se, Ne = Et(ge[Se], N), Ae = Et(ge[Re], N);
          U = Ne.map((wt, Ht) => Math.round(wt + (Ae[Ht] - wt) * Ie));
        } else
          U = Et(ge[0], N);
      }
    else {
      const re = n.get("category_columns") || [], ge = ne(), Y = ge >= 0 ? re[ge] : null, Z = Y && Y.palette || n.get("point_palette") || ["#60a5fa"], Se = Y ? oe(R.i) : Math.round(R.valueA);
      U = Et(Z[(Se % Z.length + Z.length) % Z.length], N);
    }
    if (!se || !te) return U;
    const ee = te[R.i] || 0;
    return ee === qc || ee === dh ? (U[3] = 255, U) : (U[3] = Math.round((U[3] || 255) * 0.28), U);
  }
  function Rn(R) {
    const N = n.get("point_size") ?? 2;
    if (!se || !te) return N;
    const D = te[R.i] || 0;
    return D === qc || D === dh ? N : N * BN;
  }
  function Ft(R) {
    return R.map((N) => [N.x, N.y]);
  }
  function Wt(R) {
    const N = Ft(R);
    if (!N.length) return N;
    const D = N[0], U = N[N.length - 1];
    return (D[0] !== U[0] || D[1] !== U[1]) && N.push(D), N;
  }
  function ot(R, N) {
    if (M === "ellipse") {
      const D = (R.x + N.x) / 2, U = (R.y + N.y) / 2, ee = Math.abs(N.x - R.x) / 2, re = Math.abs(N.y - R.y) / 2, ge = [];
      for (let Y = 0; Y < 64; Y++) {
        const Z = Y / 64 * Math.PI * 2;
        ge.push([D + ee * Math.cos(Z), U + re * Math.sin(Z)]);
      }
      return ge;
    }
    return [
      [R.x, R.y],
      [N.x, R.y],
      [N.x, N.y],
      [R.x, N.y]
    ];
  }
  function ut(R) {
    if (R.type === "polygon" || R.type === "lasso")
      return (R.vertices || []).map(([D, U]) => [D, U]);
    const N = -(R.angle || 0);
    if (R.type === "rectangle") {
      const D = R.cx, U = R.cy, ee = R.width, re = R.height, ge = { x: D, y: U };
      return [
        { x: D - ee / 2, y: U - re / 2 },
        { x: D + ee / 2, y: U - re / 2 },
        { x: D + ee / 2, y: U + re / 2 },
        { x: D - ee / 2, y: U + re / 2 }
      ].map((Y) => {
        const Z = Ll(Y, ge, N);
        return [Z.x, Z.y];
      });
    }
    if (R.type === "ellipse") {
      const D = R.cx, U = R.cy, ee = R.rx, re = R.ry, ge = { x: D, y: U }, Y = [];
      for (let Z = 0; Z < 64; Z++) {
        const Se = Z / 64 * Math.PI * 2, Re = Ll(
          { x: D + ee * Math.cos(Se), y: U + re * Math.sin(Se) },
          ge,
          N
        );
        Y.push([Re.x, Re.y]);
      }
      return Y;
    }
    return [];
  }
  function Ke() {
    const R = n.get("points_data") || "", [N, D] = n.get("x_bounds"), [U, ee] = n.get("y_bounds"), re = `${R.length}:${N}:${D}:${U}:${ee}:${R.slice(0, 32)}:${R.slice(-32)}`;
    if (re === P.key) return P.data;
    const ge = mh(R), Y = Math.floor(ge.length / 4), Z = new Array(Y);
    for (let Se = 0; Se < Y; Se++) {
      const Re = Se * 4;
      Z[Se] = {
        i: Se,
        x: N + (ge[Re] + 1) / 2 * (D - N),
        y: U + (ge[Re + 1] + 1) / 2 * (ee - U),
        valueA: ge[Re + 2]
      };
    }
    return P = { key: re, data: Z }, Z;
  }
  function Qt(R, N = 8) {
    const D = R / Math.max(N, 1), ee = 10 ** Math.floor(Math.log10(Math.max(D, 1e-12))), re = D / ee;
    return (re <= 1 ? 1 : re <= 2 ? 2 : re <= 5 ? 5 : 10) * ee;
  }
  function wn() {
    const R = T?.isInitialized ? T.getViewports()?.[0] : null;
    if (R?.unproject && R.width > 1 && R.height > 1) {
      const [re, ge] = R.unproject([0, R.height]), [Y, Z] = R.unproject([R.width, 0]);
      return {
        xMin: Math.min(re, Y),
        xMax: Math.max(re, Y),
        yMin: Math.min(ge, Z),
        yMax: Math.max(ge, Z)
      };
    }
    const [N, D] = n.get("x_bounds"), [U, ee] = n.get("y_bounds");
    return { xMin: N, xMax: D, yMin: U, yMax: ee };
  }
  function _n() {
    const R = wn(), N = Math.max(R.xMax - R.xMin, R.yMax - R.yMin, 1e-9);
    return Qt(N, 8);
  }
  function Yt(R = !1) {
    const N = _n();
    !R && N === j || (j = N, dt());
  }
  function nl() {
    if (!_) return null;
    const { PathLayer: R } = _, N = wn(), D = j || Qt(Math.max(N.xMax - N.xMin, N.yMax - N.yMin, 1e-9), 8);
    j = D;
    const U = D * 2, ee = Math.floor((N.xMin - U) / D) * D, re = Math.floor((N.yMin - U) / D) * D, ge = [];
    for (let Ne = ee; Ne <= N.xMax + U + D * 0.5; Ne += D)
      ge.push({
        path: [
          [Ne, N.yMin - U],
          [Ne, N.yMax + U]
        ]
      });
    for (let Ne = re; Ne <= N.yMax + U + D * 0.5; Ne += D)
      ge.push({
        path: [
          [N.xMin - U, Ne],
          [N.xMax + U, Ne]
        ]
      });
    const Y = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [Z, Se, Re] = Pc(Y), Ie = [Math.round(Z * 255), Math.round(Se * 255), Math.round(Re * 255), 160];
    return new R({
      id: "landmarks-grid",
      data: ge,
      getPath: (Ne) => Ne.path,
      getColor: Ie,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function zt() {
    if (!_) return null;
    const { ScatterplotLayer: R } = _, N = Ke();
    if (!N.length) return null;
    const U = [
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
      ...U
    ];
    return [
      new R({
        id: "landmarks-points",
        data: N,
        getPosition: (re) => [re.x, re.y, 0],
        getFillColor: (re) => Jt(re),
        getRadius: (re) => Rn(re),
        radiusUnits: "common",
        radiusMinPixels: 1.5,
        stroked: !1,
        filled: !0,
        pickable: !1,
        updateTriggers: {
          getFillColor: ee,
          getRadius: U
        }
      })
    ];
  }
  function so() {
    if (!_) return [];
    const { PolygonLayer: R } = _, N = n.get("selected_kind"), D = n.get("selected_index"), U = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ee = [];
    return (n.get("selections") || []).forEach((re, ge) => {
      const Y = ut(re);
      if (Y.length < 3) return;
      const Z = N === "selection" && ge === D;
      ee.push({
        polygon: Y,
        fill: Et(U, Z ? 0.08 : 0.04),
        line: Et(U, Z ? 1 : 0.85),
        width: Z ? 2.5 : 2,
        kind: "selection",
        index: ge
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
        parameters: wi
      })
    ] : [];
  }
  function Fn() {
    if (!_) return [];
    const { PathLayer: R, PolygonLayer: N, ScatterplotLayer: D } = _, U = n.get("selected_kind"), ee = n.get("selected_index"), re = n.get("stroke_width") || 2, ge = n.get("landmark_opacity") || 0.25, Y = [], Z = [], Se = [], Re = [], Ie = co(14);
    (n.get("landmarks") || []).forEach((Ae, wt) => {
      if (Ae.hidden) return;
      const Ht = qv[wt % qv.length], tn = U === "landmark" && wt === ee, Jn = tn ? re + 1 : re, Ot = Et(Ht, 1), pn = Et(Ht, ge), Sn = { kind: "landmark", index: wt };
      if (Ae.type === "point") {
        const jn = (Ae.vertices || [])[0];
        if (!jn) return;
        Se.push({
          position: [jn[0], jn[1], 0],
          fill: Ot,
          radius: tn ? 7 : 6,
          ...Sn
        });
        return;
      }
      const Wn = ol(Ae);
      if (Ae.type === "shape" && Wn.length >= 3) {
        Y.push({
          polygon: Ft(Wn),
          fill: pn,
          line: Ot,
          width: Jn,
          ...Sn
        }), (Ae.vertices || []).forEach(([jn, Sl]) => {
          Se.push({
            position: [jn, Sl, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
        return;
      }
      const fo = Wl(Ae);
      if (fo && Y.push({
        polygon: Ft(fo),
        fill: Et(fh, HN),
        line: Et(fh, UN),
        width: 1.5,
        ...Sn
      }), Wn.length >= 2) {
        const jn = Ft(Wn);
        if (Z.push({
          path: jn,
          color: Ot,
          width: Jn,
          ...Sn
        }), ["line", "spline", "gradient"].includes(Ae.type)) {
          const Sl = jl(jn, Ie);
          Sl && Re.push({ polygon: Sl, fill: Ot, line: Ot, width: 1, ...Sn });
        }
        (Ae.vertices || []).forEach(([Sl, ho]) => {
          Se.push({
            position: [Sl, ho, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
      }
    });
    const Ne = [];
    return (Y.length || Re.length) && Ne.push(
      new N({
        id: "landmark-polygons",
        data: [...Y, ...Re],
        getPolygon: (Ae) => Ae.polygon,
        getFillColor: (Ae) => Ae.fill,
        getLineColor: (Ae) => Ae.line,
        getLineWidth: (Ae) => Ae.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: wi
      })
    ), Z.length && Ne.push(
      new R({
        id: "landmark-paths",
        data: Z,
        getPath: (Ae) => Ae.path,
        getColor: (Ae) => Ae.color,
        getWidth: (Ae) => Ae.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: wi
      })
    ), Se.length && Ne.push(
      new D({
        id: "landmark-markers",
        data: Se,
        getPosition: (Ae) => Ae.position,
        getFillColor: (Ae) => Ae.fill,
        getRadius: (Ae) => Ae.radius,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: wi
      })
    ), Ne;
  }
  function rn() {
    if (!_) return [];
    const { PathLayer: R, PolygonLayer: N, ScatterplotLayer: D } = _, U = ["lasso", "polygon", "rectangle", "ellipse"].includes(M), ee = U ? "#94a3b8" : "#00e5ff", re = Et(ee, 1), ge = Et(ee, 0.15), Y = n.get("stroke_width") || 4, Z = [];
    let Se = null, Re = null, Ie = [];
    if (Xe && ye.length >= 2)
      Se = Ft(ye);
    else if (Q && ce && He)
      Re = ot(ce, He);
    else if (Le.length) {
      const Ne = M === "spline" ? Yn(Le, n.get("default_tension") ?? 0, 20, !1) : M === "shape" ? Yn(Le, n.get("default_tension") ?? 0, 20, !0) : Le;
      M === "polygon" || M === "shape" ? (Re = Ft(Ne), Se = Wt(Ne)) : Se = Ft(Ne), Ie = Le.map((Ae) => ({ position: [Ae.x, Ae.y, 0], fill: re }));
    }
    return Re && Re.length >= 3 ? Z.push(
      new N({
        id: "draft-polygon",
        data: [{ polygon: Re, fill: ge, line: re, width: 2 }],
        getPolygon: (Ne) => Ne.polygon,
        getFillColor: (Ne) => Ne.fill,
        getLineColor: (Ne) => Ne.line,
        getLineWidth: (Ne) => Ne.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: wi
      })
    ) : Se && Se.length >= 2 && Z.push(
      new R({
        id: "draft-path",
        data: [{ path: Se, color: re, width: U ? 2 : Y }],
        getPath: (Ne) => Ne.path,
        getColor: (Ne) => Ne.color,
        getWidth: (Ne) => Ne.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: wi
      })
    ), Ie.length && Z.push(
      new D({
        id: "draft-markers",
        data: Ie,
        getPosition: (Ne) => Ne.position,
        getFillColor: (Ne) => Ne.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: wi
      })
    ), Z;
  }
  function co(R) {
    const N = T?.isInitialized ? T.getViewports()?.[0] : null;
    if (!N?.unproject) return R;
    const [D] = N.unproject([0, 0]), [U] = N.unproject([R, 0]);
    return Math.max(Math.abs(U - D), 1e-9);
  }
  function jl(R, N) {
    if (!R || R.length < 2 || !(N > 0)) return null;
    const D = R[R.length - 2], U = R[R.length - 1], ee = Math.hypot(U[0] - D[0], U[1] - D[1]) || 1, re = (U[0] - D[0]) / ee, ge = (U[1] - D[1]) / ee, Y = -ge, Z = re, Se = [U[0] + re * N * 0.15, U[1] + ge * N * 0.15], Re = [U[0] - re * N, U[1] - ge * N];
    return [
      Se,
      [Re[0] + Y * N * 0.55, Re[1] + Z * N * 0.55],
      [Re[0] - Y * N * 0.55, Re[1] - Z * N * 0.55]
    ];
  }
  function ll(R, N, D, U) {
    const ee = [], re = [];
    if (!R || !D.length) return { edges: ee, neighbors: re };
    const ge = U?.mode || "knn", Y = Math.max(0, U?.k | 0), Z = Number(U?.radius) || 0;
    if (ge === "knn" && Y <= 0) return { edges: ee, neighbors: re };
    if (ge === "radius" && !(Z > 0)) return { edges: ee, neighbors: re };
    const { indptr: Se, indices: Re, distances: Ie } = R, Ne = /* @__PURE__ */ new Set();
    for (const Ae of D) {
      const wt = Se[Ae] | 0, Ht = Se[Ae + 1] | 0, tn = N[Ae], Jn = ge === "knn" ? Math.min(Ht, wt + Y) : Ht;
      for (let Ot = wt; Ot < Jn && !(ge === "radius" && (Ie && Ie.length ? Ie[Ot] : 0) > Z); Ot++) {
        const pn = Re[Ot] | 0;
        Ne.has(pn) || (Ne.add(pn), re.push(pn)), ee.push({
          path: [
            [tn.x, tn.y],
            [N[pn].x, N[pn].y]
          ]
        });
      }
    }
    return { edges: ee, neighbors: re };
  }
  function wo() {
    if (!_) return [];
    const R = vl(), N = $o(R);
    if (!R || !N || N.neighborhood === "off") return [];
    Ke();
    const D = [], { PathLayer: U } = _, ee = { kind: R.kind, index: R.index };
    return (N.neighborhood === "radius" || N.neighborhood === "knn") && fe.length && D.push(
      new U({
        id: `neighborhood-${N.neighborhood}`,
        data: fe.map((re) => ({ ...re, ...ee })),
        getPath: (re) => re.path,
        getColor: Et(fh, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: wi
      })
    ), D;
  }
  function an() {
    return sn(), [
      nl(),
      ...wo(),
      ...zt(),
      ...so(),
      ...Fn(),
      ...rn()
    ].filter(Boolean);
  }
  function Ct(R, N) {
    const [D, U] = n.get("x_bounds"), [ee, re] = n.get("y_bounds"), ge = (D + U) / 2, Y = (ee + re) / 2, Z = Math.max(U - D, 1e-6), Se = Math.max(re - ee, 1e-6), Re = 40, Ie = Math.log2(
      Math.min((R - Re * 2) / Z, (N - Re * 2) / Se)
    );
    return {
      target: [ge, Y, 0],
      zoom: Ie,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function Rt() {
    if (!T) return;
    const R = Math.max(1, d.clientWidth || d.width), N = Math.max(1, d.clientHeight || d.height);
    R <= 1 || N <= 1 || (k = Ct(R, N), B = k.zoom, T.setProps({ viewState: k, width: R, height: N }), q = !0);
  }
  function Ye(R, { animate: N = !1, duration: D = 320 } = {}) {
    if (!T) return;
    const U = {
      ...k,
      ...R,
      transitionDuration: N ? D : 0
    };
    N && (!ke && _?.LinearInterpolator && (ke = new _.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), ke && (U.transitionInterpolator = ke), U.transitionEasing = GN), k = U, T.setProps({ viewState: U });
  }
  le = (R) => {
    if (!T || !k) return;
    const N = k.minZoom ?? -20, D = k.maxZoom ?? 20, U = Math.max(N, Math.min(D, (k.zoom ?? 0) + R));
    Ye({ zoom: U }, { animate: !0 });
  }, he = () => {
    if (!T) return;
    const R = Math.max(1, d.clientWidth || d.width), N = Math.max(1, d.clientHeight || d.height);
    if (R <= 1 || N <= 1) return;
    const D = Ct(R, N);
    B = D.zoom, q = !0, Ye(
      {
        target: D.target,
        zoom: D.zoom,
        minZoom: D.minZoom,
        maxZoom: D.maxZoom
      },
      { animate: !0, duration: 320 }
    ), dt();
  };
  function Gn() {
    const R = String(n.get("plot_background") || "").trim();
    if (R) return R;
    const N = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return N || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const R = Gn();
    f.style.background = R, d.style.background = R, T && (T.setProps({
      parameters: { clearColor: Pc(R) },
      ...k ? { viewState: k } : {}
    }), typeof T.redraw == "function" && T.redraw(!0));
  };
  function Gi(R) {
    if (!T) return;
    const N = Gn();
    T.setProps({
      parameters: { clearColor: Pc(N) },
      ...R,
      ...k ? { viewState: k } : {}
    });
  }
  function dt() {
    !T || !_ || I || (I = requestAnimationFrame(() => {
      I = 0, Gi({ layers: an() });
    }));
  }
  async function Yi() {
    if (_) return _;
    const R = await import(
      /* @vite-ignore */
      VN
    ), N = await import(
      /* @vite-ignore */
      IN
    );
    return _ = {
      Deck: R.Deck,
      OrthographicView: R.OrthographicView,
      LinearInterpolator: R.LinearInterpolator,
      ScatterplotLayer: N.ScatterplotLayer,
      PathLayer: N.PathLayer,
      PolygonLayer: N.PolygonLayer
    }, _;
  }
  async function Jl() {
    if (T) return;
    const { w: R, h: N } = xt();
    d.style.display = "block", h();
    try {
      const { Deck: D, OrthographicView: U } = await Yi(), ee = an();
      if (!ee.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const re = Ct(R, N);
      k = re, B = re.zoom;
      const ge = Gn();
      T = new D({
        canvas: d,
        width: R,
        height: N,
        useDevicePixels: !0,
        views: new U(),
        controller: Bt(),
        initialViewState: re,
        parameters: { clearColor: Pc(ge) },
        layers: ee,
        pickingRadius: 8,
        getCursor: ({ isDragging: Y, isHovering: Z }) => Y ? "grabbing" : Z ? "pointer" : M === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: Y }) => {
          k = Y, T.setProps({ viewState: Y }), Yt();
        },
        onClick: (Y) => {
          if (M !== "select") return;
          const Z = Y?.object;
          Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type" ? zn(Z.kind, Z.index) : zn("", -1);
        },
        onHover: (Y) => {
          const Z = Y?.object;
          if (Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          M === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          st(), requestAnimationFrame(() => {
            xt(), Rt(), Gi({ layers: an() }), typeof T.redraw == "function" && T.redraw(!0);
          });
        }
      }), kt();
    } catch (D) {
      console.error("landmarks deck init failed", D);
      const U = document.createElement("div");
      U.className = "landmarks__error", U.textContent = `Deck renderer failed: ${D?.message || D}`, f.appendChild(U);
    }
  }
  function uo() {
    if (!T) return;
    const { w: R, h: N } = xt();
    Gi({ width: R, height: N }), !q && R > 1 && N > 1 ? Rt() : typeof T.redraw == "function" && T.redraw(!0);
  }
  function Yn(R, N, D, U) {
    const ee = D, ge = (1 - Math.max(0, Math.min(1, N ?? 0))) / 2;
    let Y = R.slice(), Z, Se;
    if (U) {
      if (Y.length >= 2) {
        const Ne = Y[0], Ae = Y[Y.length - 1];
        Ne.x === Ae.x && Ne.y === Ae.y && (Y = Y.slice(0, -1));
      }
      if (Y.length < 3) return Y.slice();
      const Ie = Y.length;
      Se = (Ne) => Y[(Ne % Ie + Ie) % Ie], Z = Ie;
    } else {
      if (Y.length < 2 || Y.length === 2) return Y.slice();
      const Ie = [
        { x: 2 * Y[0].x - Y[1].x, y: 2 * Y[0].y - Y[1].y },
        ...Y,
        {
          x: 2 * Y[Y.length - 1].x - Y[Y.length - 2].x,
          y: 2 * Y[Y.length - 1].y - Y[Y.length - 2].y
        }
      ];
      Se = (Ne) => Ie[Ne + 1], Z = Y.length - 1;
    }
    const Re = [];
    for (let Ie = 0; Ie < Z; Ie++) {
      const Ne = Se(Ie - 1), Ae = Se(Ie), wt = Se(Ie + 1), Ht = Se(Ie + 2), tn = ge * (wt.x - Ne.x), Jn = ge * (wt.y - Ne.y), Ot = ge * (Ht.x - Ae.x), pn = ge * (Ht.y - Ae.y);
      for (let Sn = 0; Sn < ee; Sn++) {
        const Wn = Sn / ee, fo = Wn * Wn, jn = fo * Wn, Sl = 2 * jn - 3 * fo + 1, ho = jn - 2 * fo + Wn, Ki = -2 * jn + 3 * fo, xa = jn - fo;
        Re.push({
          x: Sl * Ae.x + ho * tn + Ki * wt.x + xa * Ot,
          y: Sl * Ae.y + ho * Jn + Ki * wt.y + xa * pn
        });
      }
    }
    return Re.push({ ...Se(U ? Z : Y.length - 1) }), Re;
  }
  function Ll(R, N, D) {
    const U = Math.cos(D), ee = Math.sin(D), re = R.x - N.x, ge = R.y - N.y;
    return { x: N.x + re * U - ge * ee, y: N.y + re * ee + ge * U };
  }
  function ol(R) {
    const N = (R.vertices || []).map(([D, U]) => ({ x: D, y: U }));
    return R.type === "spline" || R.type === "gradient" ? Yn(N, R.tension ?? 0, 20, !1) : R.type === "shape" ? Yn(N, R.tension ?? 0, 20, !0) : N;
  }
  function il() {
    const [R, N] = n.get("x_bounds"), [D, U] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(N - R), Math.abs(U - D));
  }
  function en() {
    return Math.max(1, n.get("neighbor_k_max") || 64);
  }
  function mn() {
    const R = Number(n.get("neighbor_radius_max") || 0);
    return R > 0 ? R : il();
  }
  function Mn(R, N) {
    return R.map((D, U) => {
      const ee = R[Math.max(0, U - 1)], re = R[Math.min(R.length - 1, U + 1)], ge = Math.hypot(re.x - ee.x, re.y - ee.y) || 1, Y = (re.x - ee.x) / ge, Z = (re.y - ee.y) / ge;
      return { x: D.x - Z * N, y: D.y + Y * N };
    });
  }
  function Wl(R) {
    const N = Number(R.buffer_width || 0);
    if (!(N > 0) || !hh.includes(R.type)) return null;
    const D = ol(R);
    if (D.length < 2) return null;
    const U = R.buffer_side || "both";
    return U === "left" ? [...D, ...Mn(D, N).reverse()] : U === "right" ? [...D, ...Mn(D, -N).reverse()] : [...Mn(D, N), ...Mn(D, -N).reverse()];
  }
  function vl() {
    const R = n.get("selected_kind"), N = n.get("selected_index");
    return R === "type" || R === "selection" ? { kind: R, index: N } : null;
  }
  function qi() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function $o(R) {
    return R ? Q1(
      R.kind,
      R.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function Jo() {
    return $o(vl());
  }
  function Mr() {
    const R = qi();
    if (!R) return null;
    const N = n.get("landmarks") || [];
    return R.index >= 0 && R.index < N.length ? N[R.index] : null;
  }
  function eo(R) {
    const N = vl();
    N && (Z1(
      n,
      N.kind,
      N.index,
      R,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), dt());
  }
  function Wo(R) {
    const N = Ke();
    if (!R) return [];
    if (R.kind === "type")
      return N.reduce((D, U, ee) => (oe(ee) === R.index && D.push(ee), D), []);
    if (R.kind === "selection") {
      const D = (n.get("selections") || [])[R.index], U = ut(D || {});
      return U.length < 3 ? [] : N.reduce((ee, re, ge) => (rl(re, U) && ee.push(ge), ee), []);
    }
    return [];
  }
  function rl(R, N) {
    let D = !1;
    for (let U = 0, ee = N.length - 1; U < N.length; ee = U++) {
      const re = N[U][0], ge = N[U][1], Y = N[ee][0], Z = N[ee][1];
      ge > R.y != Z > R.y && R.x < (Y - re) * (R.y - ge) / (Z - ge + 1e-12) + re && (D = !D);
    }
    return D;
  }
  function sn() {
    const R = Ke();
    te = new Uint8Array(R.length), se = !1, fe = [];
    const N = vl();
    if (!N) return;
    const D = Wo(N);
    if (!D.length) {
      se = !0;
      return;
    }
    se = !0;
    for (const re of D) te[re] = qc;
    const U = $o(N);
    if (!U || U.neighborhood === "off") return;
    const ee = U.neighborhood === "radius" ? F : H;
    if (U.neighborhood === "radius" || U.neighborhood === "knn") {
      const re = Math.min(Number(U.neighborhood_k) || 12, en());
      let ge = Number(U.neighborhood_radius) || 0;
      const Y = mn();
      Y > 0 && (ge = Math.min(ge, Y));
      const Z = ll(ee, R, D, {
        mode: U.neighborhood,
        k: re,
        radius: ge
      });
      fe = Z.edges;
      for (const Se of Z.neighbors)
        te[Se] !== qc && (te[Se] = dh);
    }
  }
  function Qn(R) {
    const N = qi();
    N && ($1(n, N.index, R, n.get("landmarks") || []), dt());
  }
  function Zn(R) {
    if (!T?.isInitialized || !R) return null;
    const D = T.pickObject({ x: R.px, y: R.py, radius: 8 })?.object;
    return D?.kind ? { kind: D.kind, index: D.index } : null;
  }
  function zn(R, N) {
    Hh(n, R, N), dt();
  }
  function Dn() {
    st();
  }
  function _o() {
    if (!["polygon", "line", "spline", "shape"].includes(M)) return;
    const N = M === "line" || M === "spline" ? 2 : 3;
    if (Le.length < N) {
      Le = [], dt();
      return;
    }
    if (M === "polygon") {
      const ee = [...n.get("selections") || []];
      ee.push(Yc({
        id: nt(ee),
        type: "polygon",
        vertices: Le.map((re) => [re.x, re.y])
      })), Le = [], n.set("selections", ee), n.set("selected_kind", "selection"), n.set("selected_index", ee.length - 1), n.save_changes(), Dn(), dt();
      return;
    }
    const D = [...n.get("landmarks") || []], U = {
      id: Ge(D),
      type: M,
      vertices: Le.map((ee) => [ee.x, ee.y])
    };
    (M === "spline" || M === "shape") && (U.tension = n.get("default_tension") ?? 0), hh.includes(M) && (U.buffer_width = n.get("default_buffer_width") ?? 0, U.buffer_side = n.get("default_buffer_side") || "both"), D.push(U), Le = [], n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Dn(), dt();
  }
  function va(R, N) {
    if (T?.isInitialized) {
      const D = T.getViewports()[0];
      if (D) {
        const U = D.unproject([0, 0]), ee = D.unproject([R, N]);
        return { dx: ee[0] - U[0], dy: ee[1] - U[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function An(R, N, D, U) {
    const { dx: ee, dy: re } = va(D, U);
    if (R === "landmark") {
      const ge = n.get("landmarks") || [];
      n.set(
        "landmarks",
        ge.map(
          (Y, Z) => Z !== N ? Y : { ...Y, vertices: (Y.vertices || []).map(([Se, Re]) => [Se + ee, Re + re]) }
        )
      );
    } else {
      const ge = n.get("selections") || [];
      n.set(
        "selections",
        ge.map((Y, Z) => Z !== N ? Y : Y.vertices ? { ...Y, vertices: Y.vertices.map(([Se, Re]) => [Se + ee, Re + re]) } : { ...Y, cx: Y.cx + ee, cy: Y.cy + re })
      );
    }
    n.save_changes(), dt();
  }
  function Pi(R) {
    if (M === "select") return;
    R.preventDefault(), d.focus();
    const N = St(R);
    if (!N) return;
    We = !1;
    const D = Zn(N);
    if (M === "lasso") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        Ue = !0, _e = N, Ze = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      Xe = !0, ye = [N], dt();
      return;
    }
    if (M === "rectangle" || M === "ellipse") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        Ue = !0, _e = N, Ze = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      Q = !0, ce = N, He = N, dt();
      return;
    }
    if (Le.length === 0) {
      const U = n.get("selected_kind"), ee = n.get("selected_index");
      if (D && D.kind === U && D.index === ee) {
        Ue = !0, _e = N, Ze = D.kind, Oe = D.index, d.style.cursor = "grabbing";
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      ee >= 0 && zn("", -1);
    }
  }
  function Ar(R) {
    const N = St(R);
    if (!N) return;
    if (Ue && _e && Oe >= 0) {
      const ee = N.px - _e.px, re = N.py - _e.py;
      (ee || re) && (We = !0), An(Ze, Oe, ee, re), _e = N;
      return;
    }
    if (Xe) {
      ye.push(N), dt();
      return;
    }
    if (Q) {
      He = N, dt();
      return;
    }
    if (Le.length > 0 && ["polygon", "line", "spline", "shape"].includes(M)) {
      const ee = M === "line" || M === "spline" ? 2 : 3;
      v(Le.length >= ee ? "Enter to finish" : "Click", R.clientX, R.clientY);
      return;
    }
    if (M === "select") return;
    const U = Zn(N);
    if (U && (U.kind === "landmark" || U.kind === "selection")) {
      const re = (U.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[U.index]?.id;
      if (re) {
        v(String(re), R.clientX, R.clientY);
        return;
      }
    }
    S();
  }
  function ei(R) {
    if (M === "select" && !Ue) return;
    const N = St(R);
    if (Xe) {
      if (Xe = !1, ye.length >= 3) {
        const D = [...n.get("selections") || []];
        D.push(Yc({
          id: nt(D),
          type: "lasso",
          vertices: ye.map((U) => [U.x, U.y])
        })), n.set("selections", D), n.set("selected_kind", "selection"), n.set("selected_index", D.length - 1), n.save_changes();
      }
      ye = [], Dn(), dt();
      return;
    }
    if (Q) {
      if (Q = !1, ce && He) {
        const D = ce, U = He, ee = (D.x + U.x) / 2, re = (D.y + U.y) / 2, ge = Math.abs(U.x - D.x), Y = Math.abs(U.y - D.y);
        if (ge > 1e-6 && Y > 1e-6) {
          const Z = [...n.get("selections") || []];
          M === "rectangle" ? Z.push(Yc({ id: nt(Z), type: "rectangle", cx: ee, cy: re, width: ge, height: Y, angle: 0 })) : Z.push(Yc({ id: nt(Z), type: "ellipse", cx: ee, cy: re, rx: ge / 2, ry: Y / 2, angle: 0 })), n.set("selections", Z), n.set("selected_kind", "selection"), n.set("selected_index", Z.length - 1), n.save_changes();
        }
      }
      ce = null, He = null, Dn(), dt();
      return;
    }
    if (Ue && (Ue = !1, _e = null, Ze = "", Oe = -1, d.style.cursor = "crosshair", We)) {
      tt = !0, We = !1;
      return;
    }
    if (tt) {
      tt = !1;
      return;
    }
    if (N && !(M === "select" || M === "lasso" || M === "rectangle" || M === "ellipse")) {
      if (M === "point") {
        const D = [...n.get("landmarks") || []];
        D.push({ id: Ge(D), type: "point", vertices: [[N.x, N.y]] }), n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Dn(), dt();
        return;
      }
      Le.push({ x: N.x, y: N.y }), dt();
    }
  }
  function xl() {
    S(), Ue && (Ue = !1, _e = null), Xe && (Xe = !1, ye = [], dt()), Q && (Q = !1, ce = null, He = null, dt());
  }
  function Xi(R) {
    R.preventDefault(), Le.length && Le.pop(), _o(), S();
  }
  function Mo(R) {
    R.key === "Enter" ? (R.preventDefault(), _o(), S()) : R.key === "Escape" ? (Tt(), zn("", -1), dt()) : (R.key === "Backspace" || R.key === "Delete") && Le.length && (Le.pop(), dt());
  }
  const Vl = new AbortController(), { signal: al } = Vl;
  d.addEventListener(
    "wheel",
    (R) => {
      if (!R.shiftKey) return;
      const N = Mr();
      if (N && hh.includes(N.type)) {
        R.preventDefault(), R.stopImmediatePropagation();
        const U = il(), ee = U / 40, re = Math.max(
          0,
          Math.min(U, (Number(N.buffer_width) || 0) + (R.deltaY > 0 ? -ee : ee))
        );
        Qn({ buffer_width: re });
        return;
      }
      const D = Jo();
      if (!(!D || D.neighborhood === "off")) {
        if (R.preventDefault(), R.stopImmediatePropagation(), D.neighborhood === "knn") {
          const U = en(), ee = Math.max(
            1,
            Math.min(U, (Number(D.neighborhood_k) || 12) + (R.deltaY > 0 ? -1 : 1))
          );
          eo({ neighborhood: "knn", neighborhood_k: ee });
          return;
        }
        if (D.neighborhood === "radius") {
          const U = mn(), ee = U / 40, re = Math.max(
            0,
            Math.min(U, (Number(D.neighborhood_radius) || 0) + (R.deltaY > 0 ? -ee : ee))
          );
          eo({ neighborhood: "radius", neighborhood_radius: re });
        }
      }
    },
    { capture: !0, passive: !1, signal: al }
  ), d.addEventListener("mousedown", Pi, { signal: al }), d.addEventListener("mousemove", Ar, { signal: al }), d.addEventListener("mouseup", ei, { signal: al }), d.addEventListener("mouseleave", xl, { signal: al }), d.addEventListener("dblclick", Xi, { signal: al }), d.addEventListener("keydown", Mo, { signal: al });
  const ti = [];
  function cn(R, N) {
    const D = `change:${R}`;
    n.on(D, N), ti.push(() => n.off?.(D, N));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((R) => {
    cn(R, () => {
      dt(), Dn();
    });
  }), cn("mode", () => {
    M = n.get("mode"), Tt(), kt(), dt();
  }), cn("width", () => {
    uo();
  }), cn("height", () => {
    uo();
  }), cn("points_data", () => {
    P = { key: "", data: [] }, T ? dt() : Jl(), st();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((R) => {
    cn(R, () => {
      T && dt(), st();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((R) => {
    cn(R, () => {
      dt();
    });
  }), cn("category_codes", () => {
    ve(), dt();
  }), cn("gene_values", () => {
    ae(), dt();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((R) => {
    cn(R, () => {
      z(), T && dt();
    });
  }), ["category_columns", "active_category"].forEach((R) => {
    cn(R, () => {
      Dn(), dt();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((R) => {
    cn(R, () => {
      Dn(), st(), dt();
    });
  }), cn("plot_background", () => h()), Dn();
  let sl = null, to = 0, Ao = !1;
  const no = () => {
    if (Ao) return;
    const R = c.clientWidth, N = c.clientHeight;
    if (R <= 1 || N <= 1) {
      to = requestAnimationFrame(no);
      return;
    }
    to = requestAnimationFrame(async () => {
      if (await Jl(), Ao) {
        T && typeof T.finalize == "function" && T.finalize(), T = null;
        return;
      }
      dt(), sl = new ResizeObserver(() => uo()), sl.observe(c);
    });
  };
  to = requestAnimationFrame(no);
  function $n() {
    Ao = !0, Vl.abort(), ti.forEach((R) => R()), y.disconnect(), sl?.disconnect(), to && cancelAnimationFrame(to), I && cancelAnimationFrame(I), T && typeof T.finalize == "function" && T.finalize(), T = null, o.replaceChildren();
  }
  return {
    zoomBy: (R) => le(R),
    resetZoom: () => he(),
    resize: () => uo(),
    destroy: $n
  };
}
function YN(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const a = (d) => {
    const m = r.current.map((g) => {
      const h = `change:${String(g)}`, y = () => d();
      return n.on(h, y), { event: h, handler: y };
    });
    return () => {
      for (const { event: g, handler: h } of m)
        n.off?.(g, h);
    };
  }, c = () => {
    const d = {};
    for (const m of r.current)
      d[String(m)] = n.get(String(m));
    return JSON.stringify(d);
  }, f = b.useSyncExternalStore(a, c, c);
  return JSON.parse(f);
}
const qN = [
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
  "y_bounds",
  "n_points",
  "point_size",
  "point_opacity",
  "landmark_opacity",
  "stroke_width"
];
function PN(n) {
  const o = YN(n, qN);
  return {
    ...o,
    setMode(r) {
      MN(n, r);
    },
    select(r, a) {
      Hh(n, r, a);
    },
    setActiveCategory(r) {
      Ih(n, r);
    },
    setActiveGenes(r) {
      RN(n, r);
    },
    setGeneScaleMode(r) {
      wN(n, r);
    },
    setGeneLog1p(r) {
      _N(n, r);
    },
    selectType(r, a) {
      r.name !== o.active_category && Ih(n, r), Hh(n, "type", a);
    },
    patchNeighborhood(r) {
      Z1(
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
      o.selected_kind !== "landmark" || o.selected_index < 0 || $1(n, o.selected_index, r, o.landmarks);
    },
    deleteSelection(r) {
      AN(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      TN(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, a) {
      ON(n, r, a, o.selections);
    },
    renameLandmark(r, a) {
      NN(n, r, a, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      kN(n, r, o.landmarks);
    },
    setPointSize(r) {
      zN(n, r);
    },
    setPointOpacity(r) {
      DN(n, r);
    },
    setLandmarkOpacity(r) {
      jN(n, r);
    },
    setStrokeWidth(r) {
      LN(n, r);
    },
    activeNeighborhood() {
      return Q1(
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
function XN(n, o) {
  const r = b.useRef("off"), [a, c] = b.useState("off"), f = b.useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        o();
      });
    });
  }, [o]), d = b.useCallback(() => {
    const h = n.current;
    r.current = "off", c("off"), document.body.style.overflow = "", f(), h?.scrollIntoView({ block: "nearest" });
  }, [n, f]);
  b.useEffect(() => {
    const h = () => {
      const y = n.current;
      if (!!y && document.fullscreenElement === y) {
        r.current = "native", c("native"), document.body.style.overflow = "hidden", f();
        return;
      }
      r.current === "native" && d();
    };
    return document.addEventListener("fullscreenchange", h), () => document.removeEventListener("fullscreenchange", h);
  }, [n, d, f]), b.useEffect(() => {
    if (a !== "overlay") return;
    const h = (y) => {
      y.key === "Escape" && d();
    };
    return window.addEventListener("keydown", h), () => window.removeEventListener("keydown", h);
  }, [a, d]);
  const m = b.useCallback(() => {
    const h = n.current;
    if (h) {
      if (document.fullscreenElement === h) {
        document.exitFullscreen();
        return;
      }
      r.current === "overlay" && d();
    }
  }, [n, d]), g = b.useCallback(async () => {
    const h = n.current;
    if (h) {
      if (r.current !== "off" || document.fullscreenElement === h) {
        m();
        return;
      }
      try {
        await h.requestFullscreen();
      } catch {
        r.current = "overlay", c("overlay"), document.body.style.overflow = "hidden", f();
      }
    }
  }, [n, m, f]);
  return {
    isFullscreen: a !== "off",
    overlay: a === "overlay",
    toggle: g,
    leave: m
  };
}
const KN = 700, FN = 640, QN = 400, ZN = 1400;
function $N({
  model: n,
  hostEl: o
}) {
  const r = hC(o.parentElement), a = PN(n), c = b.useRef(null), f = b.useRef(null), d = b.useRef(null), [m, g] = b.useState(null), [h, y] = b.useState(KN), v = b.useCallback(() => {
    d.current?.resize();
  }, []), { isFullscreen: S, overlay: C, toggle: w } = XN(
    f,
    v
  );
  b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const O = c.current;
    if (!O) return;
    const M = Pv({ model: n, host: O });
    return d.current = M, () => {
      M.destroy(), d.current = null;
    };
  }, [n, Pv]);
  const A = b.useCallback(
    (O) => {
      O.preventDefault(), O.stopPropagation();
      const M = f.current;
      if (!M) return;
      const T = M.getBoundingClientRect(), _ = o.parentElement?.getBoundingClientRect(), k = _ && _.width > 0 ? _.width : T.width, I = Math.min(window.innerHeight * 0.9, ZN), q = {
        x: O.clientX,
        y: O.clientY,
        w: T.width,
        h: T.height,
        maxW: k,
        maxH: I
      }, B = (P) => {
        g(
          Math.round(
            Math.min(q.maxW, Math.max(FN, q.w + (P.clientX - q.x)))
          )
        ), y(
          Math.round(
            Math.min(q.maxH, Math.max(QN, q.h + (P.clientY - q.y)))
          )
        );
      }, j = () => {
        window.removeEventListener("pointermove", B), window.removeEventListener("pointerup", j), v();
      };
      window.addEventListener("pointermove", B), window.addEventListener("pointerup", j);
    },
    [o, v]
  );
  return /* @__PURE__ */ x.jsxs(
    "div",
    {
      ref: f,
      className: Je(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        r && "dark landmarks--dark",
        !r && "landmarks--light",
        C && "landmarks--overlay-fs"
      ),
      style: S || m == null ? void 0 : { width: m },
      children: [
        /* @__PURE__ */ x.jsx(
          "div",
          {
            className: "landmarks__body",
            style: S ? void 0 : { height: h },
            children: /* @__PURE__ */ x.jsxs("div", { className: "landmarks__figure", children: [
              /* @__PURE__ */ x.jsx(
                sN,
                {
                  modes: a.modes,
                  mode: a.mode,
                  onMode: (O) => a.setMode(O),
                  fullscreen: S,
                  onToggleFullscreen: () => {
                    w();
                  }
                }
              ),
              /* @__PURE__ */ x.jsxs("div", { className: "landmarks__main landmarks__main--plot", children: [
                /* @__PURE__ */ x.jsx(
                  "div",
                  {
                    ref: c,
                    className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
                  }
                ),
                /* @__PURE__ */ x.jsx(
                  EN,
                  {
                    onZoomIn: () => d.current?.zoomBy(1),
                    onZoomOut: () => d.current?.zoomBy(-1),
                    onReset: () => d.current?.resetZoom()
                  }
                ),
                S ? null : /* @__PURE__ */ x.jsx(
                  "button",
                  {
                    type: "button",
                    className: "landmarks__resize",
                    "aria-label": "Resize widget",
                    title: "Resize",
                    onPointerDown: A
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ x.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ x.jsx(
            "div",
            {
              className: "absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: /* @__PURE__ */ x.jsx(vN, { lm: a })
            }
          ),
          /* @__PURE__ */ x.jsxs(
            "div",
            {
              className: "absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col gap-2 overflow-y-auto p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: [
                /* @__PURE__ */ x.jsx(xN, { lm: a }),
                /* @__PURE__ */ x.jsx(SN, { lm: a })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const us = /* @__PURE__ */ new WeakMap();
function JN({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = us.get(o);
  r && (r.unmount(), us.delete(o));
  const a = fC.createRoot(o);
  return us.set(o, a), a.render(/* @__PURE__ */ x.jsx($N, { model: n, hostEl: o })), () => {
    a.unmount(), us.get(o) === a && us.delete(o);
  };
}
const lk = { render: JN };
export {
  lk as default
};
