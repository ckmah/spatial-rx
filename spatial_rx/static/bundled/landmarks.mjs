var ay = (n) => {
  throw TypeError(n);
};
var sy = (n, o, r) => o.has(n) || ay("Cannot " + r);
var qn = (n, o, r) => (sy(n, o, "read from private field"), r ? r.call(n) : o.get(n)), cy = (n, o, r) => o.has(n) ? ay("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Td = (n, o, r, a) => (sy(n, o, "write to private field"), a ? a.call(n, r) : o.set(n, r), r);
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
var Od = { exports: {} }, ts = {};
var uy;
function lC() {
  if (uy) return ts;
  uy = 1;
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
  return ts.Fragment = o, ts.jsx = r, ts.jsxs = r, ts;
}
var fy;
function oC() {
  return fy || (fy = 1, Od.exports = lC()), Od.exports;
}
var S = oC(), kd = { exports: {} }, ns = {}, Nd = { exports: {} }, zd = {};
var dy;
function iC() {
  return dy || (dy = 1, (function(n) {
    function o(V, I) {
      var F = V.length;
      V.push(I);
      e: for (; 0 < F; ) {
        var ve = F - 1 >>> 1, ae = V[ve];
        if (0 < c(ae, I))
          V[ve] = I, V[F] = ae, F = ve;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function a(V) {
      if (V.length === 0) return null;
      var I = V[0], F = V.pop();
      if (F !== I) {
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
      return I;
    }
    function c(V, I) {
      var F = V.sortIndex - I.sortIndex;
      return F !== 0 ? F : V.id - I.id;
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
    var g = [], h = [], y = 1, v = null, x = 3, C = !1, w = !1, M = !1, O = !1, A = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function N(V) {
      for (var I = r(h); I !== null; ) {
        if (I.callback === null) a(h);
        else if (I.startTime <= V)
          a(h), I.sortIndex = I.expirationTime, o(g, I);
        else break;
        I = r(h);
      }
    }
    function H(V) {
      if (M = !1, N(V), !w)
        if (r(g) !== null)
          w = !0, q || (q = !0, fe());
        else {
          var I = r(h);
          I !== null && be(H, I.startTime - V);
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
        var I = !0;
        try {
          e: {
            w = !1, M && (M = !1, T(B), B = -1), C = !0;
            var F = x;
            try {
              t: {
                for (N(V), v = r(g); v !== null && !(v.expirationTime > V && te()); ) {
                  var ve = v.callback;
                  if (typeof ve == "function") {
                    v.callback = null, x = v.priorityLevel;
                    var ae = ve(
                      v.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof ae == "function") {
                      v.callback = ae, N(V), I = !0;
                      break t;
                    }
                    v === r(g) && a(g), N(V);
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
              v = null, x = F, C = !1;
            }
            I = void 0;
          }
        } finally {
          I ? fe() : q = !1;
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
        A(se, 0);
      };
    function be(V, I) {
      B = A(function() {
        V(n.unstable_now());
      }, I);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, n.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : j = 0 < V ? Math.floor(1e3 / V) : 5;
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
      var F = x;
      x = I;
      try {
        return V();
      } finally {
        x = F;
      }
    }, n.unstable_requestPaint = function() {
      O = !0;
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
      var F = x;
      x = V;
      try {
        return I();
      } finally {
        x = F;
      }
    }, n.unstable_scheduleCallback = function(V, I, F) {
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
        callback: I,
        priorityLevel: V,
        startTime: F,
        expirationTime: ae,
        sortIndex: -1
      }, F > ve ? (V.sortIndex = F, o(h, V), r(g) === null && V === r(h) && (M ? (T(B), B = -1) : M = !0, be(H, F - ve))) : (V.sortIndex = ae, o(g, V), w || C || (w = !0, q || (q = !0, fe()))), V;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(V) {
      var I = x;
      return function() {
        var F = x;
        x = I;
        try {
          return V.apply(this, arguments);
        } finally {
          x = F;
        }
      };
    };
  })(zd)), zd;
}
var hy;
function rC() {
  return hy || (hy = 1, Nd.exports = iC()), Nd.exports;
}
var Dd = { exports: {} }, lt = {};
var my;
function aC() {
  if (my) return lt;
  my = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), x = Symbol.iterator;
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
  }, M = Object.assign, O = {};
  function A(z, K, ne) {
    this.props = z, this.context = K, this.refs = O, this.updater = ne || w;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(z, K) {
    if (typeof z != "object" && typeof z != "function" && z != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, z, K, "setState");
  }, A.prototype.forceUpdate = function(z) {
    this.updater.enqueueForceUpdate(this, z, "forceUpdate");
  };
  function T() {
  }
  T.prototype = A.prototype;
  function _(z, K, ne) {
    this.props = z, this.context = K, this.refs = O, this.updater = ne || w;
  }
  var N = _.prototype = new T();
  N.constructor = _, M(N, A.prototype), N.isPureReactComponent = !0;
  var H = Array.isArray;
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
      return pe = pe(z), qe = oe === "" ? "." + he(z, 0) : oe, H(pe) ? (ne = "", qe != null && (ne = qe.replace(le, "$&/") + "/"), V(pe, K, ne, "", function(it) {
        return it;
      })) : pe != null && (se(pe) && (pe = te(
        pe,
        ne + (pe.key == null || z && z.key === pe.key ? "" : ("" + pe.key).replace(
          le,
          "$&/"
        ) + "/") + qe
      )), K.push(pe)), 1;
    qe = 0;
    var Ae = oe === "" ? "." : oe + ":";
    if (H(z))
      for (var Te = 0; Te < z.length; Te++)
        oe = z[Te], we = Ae + he(oe, Te), qe += V(
          oe,
          K,
          ne,
          we,
          pe
        );
    else if (Te = C(z), typeof Te == "function")
      for (z = Te.call(z), Te = 0; !(oe = z.next()).done; )
        oe = oe.value, we = Ae + he(oe, Te++), qe += V(
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
  function I(z, K, ne) {
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
    map: I,
    forEach: function(z, K, ne) {
      I(
        z,
        function() {
          K.apply(this, arguments);
        },
        ne
      );
    },
    count: function(z) {
      var K = 0;
      return I(z, function() {
        K++;
      }), K;
    },
    toArray: function(z) {
      return I(z, function(K) {
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
  return lt.Activity = v, lt.Children = ae, lt.Component = A, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = _, lt.StrictMode = a, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, lt.__COMPILER_RUNTIME = {
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
    var oe = M({}, z.props), pe = z.key;
    if (K != null)
      for (we in K.key !== void 0 && (pe = "" + K.key), K)
        !j.call(K, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && K.ref === void 0 || (oe[we] = K[we]);
    var we = arguments.length - 2;
    if (we === 1) oe.children = ne;
    else if (1 < we) {
      for (var qe = Array(we), Ae = 0; Ae < we; Ae++)
        qe[Ae] = arguments[Ae + 2];
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
      for (var Ae = Array(qe), Te = 0; Te < qe; Te++)
        Ae[Te] = arguments[Te + 2];
      pe.children = Ae;
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
var py;
function ys() {
  return py || (py = 1, Dd.exports = aC()), Dd.exports;
}
var jd = { exports: {} }, Pn = {};
var gy;
function sC() {
  if (gy) return Pn;
  gy = 1;
  var n = ys();
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
      var y = h.as, v = m(y, h.crossOrigin), x = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
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
var by;
function Bv() {
  if (by) return jd.exports;
  by = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), jd.exports = sC(), jd.exports;
}
var yy;
function cC() {
  if (yy) return ns;
  yy = 1;
  var n = rC(), o = ys(), r = Bv();
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
  var v = Object.assign, x = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), M = /* @__PURE__ */ Symbol.for("react.fragment"), O = /* @__PURE__ */ Symbol.for("react.strict_mode"), A = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), N = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), B = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
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
      case M:
        return "Fragment";
      case A:
        return "Profiler";
      case O:
        return "StrictMode";
      case H:
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
        case N:
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
  var be = Array.isArray, V = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
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
  function Ae(e, t) {
    switch (ne(we, t), ne(pe, e), ne(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Ob(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Ob(t), e = kb(t, e);
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
    var t = oe.current, l = kb(t, e.type);
    t !== l && (ne(pe, e), ne(oe, l));
  }
  function pt(e) {
    pe.current === e && (K(oe), K(pe)), qe.current === e && (K(qe), $a._currentValue = F);
  }
  var ze, et;
  function Ne(e) {
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
    return (l = e ? e.displayName || e.name : "") ? Ne(l) : "";
  }
  function _e(e, t) {
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
        return Ue(e.type, !1);
      case 11:
        return Ue(e.type.render, !1);
      case 1:
        return Ue(e.type, !0);
      case 31:
        return Ne("Activity");
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
  var Oe = Object.prototype.hasOwnProperty, Je = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ye = n.unstable_requestPaint, Q = n.unstable_now, ce = n.unstable_getCurrentPriorityLevel, Ie = n.unstable_ImmediatePriority, Ce = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Tt = n.unstable_IdlePriority, St = n.log, Bt = n.unstable_setDisableYieldValue, Nt = null, xt = null;
  function on(e) {
    if (typeof St == "function" && Bt(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Nt, e);
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
    i !== 0 && ao(e, i, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(p & ~t));
  }
  function ao(e, t, l) {
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
    return l = (l & 42) !== 0 ? 1 : so(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function so(e) {
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
  function Dl(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ll() {
    var e = I.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ey(e.type));
  }
  function Co(e, t) {
    var l = I.p;
    try {
      return I.p = e, t();
    } finally {
      I.p = l;
    }
  }
  var an = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + an, Rt = "__reactProps$" + an, Ye = "__reactContainer$" + an, Gn = "__reactEvents$" + an, Li = "__reactListeners$" + an, dt = "__reactHandles$" + an, Vi = "__reactResources$" + an, $l = "__reactMarker$" + an;
  function co(e) {
    delete e[Ct], delete e[Rt], delete e[Gn], delete e[Li], delete e[dt];
  }
  function Yn(e) {
    var t = e[Ct];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[Ct]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Hb(e); e !== null; ) {
            if (l = e[Ct]) return l;
            e = Hb(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function jl(e) {
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
    var t = e[Vi];
    return t || (t = e[Vi] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function en(e) {
    e[$l] = !0;
  }
  var mn = /* @__PURE__ */ new Set(), An = {};
  function Jl(e, t) {
    yl(e, t), yl(e + "Capture", t);
  }
  function yl(e, t) {
    for (An[e] = t, e = 0; e < t.length; e++)
      mn.add(t[e]);
  }
  var Hi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Qo = {}, Zo = {};
  function Sr(e) {
    return Oe.call(Zo, e) ? !0 : Oe.call(Qo, e) ? !1 : Hi.test(e) ? Zo[e] = !0 : (Qo[e] = !0, !1);
  }
  function Wl(e, t, l) {
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
  function $o(e, t, l) {
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
  function Ro(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ga = /[\n"\\]/g;
  function Mn(e) {
    return e.replace(
      ga,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ii(e, t, l, i, s, u, p, E) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + sn(t)) : e.value !== "" + sn(t) && (e.value = "" + sn(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? Jo(e, p, sn(t)) : l != null ? Jo(e, p, sn(l)) : i != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + sn(E) : e.removeAttribute("name");
  }
  function Er(e, t, l, i, s, u, p, E) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        zn(e);
        return;
      }
      l = l != null ? "" + sn(l) : "", t = t != null ? "" + sn(t) : l, E || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = E ? e.checked : !!i, e.defaultChecked = !!i, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), zn(e);
  }
  function Jo(e, t, l) {
    t === "number" && Ro(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function vl(e, t, l, i) {
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
  function Ui(e, t, l) {
    if (t != null && (t = "" + sn(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + sn(l) : "";
  }
  function wo(e, t, l, i) {
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
  function Ll(e, t) {
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
  function Wo(e, t, l) {
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
        i = t[s], t.hasOwnProperty(s) && l[s] !== i && Wo(e, s, i);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Wo(e, u, t[u]);
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
  var eo = /* @__PURE__ */ new Map([
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
  ]), _o = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function to(e) {
    return _o.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $n() {
  }
  var R = null;
  function k(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var D = null, U = null;
  function ee(e) {
    var t = jl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ii(
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
              'input[name="' + Mn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var i = l[t];
              if (i !== e && i.form === e.form) {
                var s = i[Rt] || null;
                if (!s) throw Error(a(90));
                Ii(
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
          Ui(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && vl(e, !!l.multiple, t, !1);
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
      if (re = !1, (D !== null || U !== null) && (cc(), D && (t = D, e = U, U = D = null, ee(t), e)))
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
  var He = null, ke = null, Me = null;
  function wt() {
    if (Me) return Me;
    var e, t = ke, l = t.length, i, s = "value" in He ? He.value : He.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var p = l - e;
    for (i = 1; i <= p && t[l - i] === s[u - i]; i++) ;
    return Me = s.slice(e, 1 < i ? 1 - i : void 0);
  }
  function It(e) {
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
  }, Sn = Ot(pn), Wn = v({}, pn, { view: 0, detail: 0 }), uo = Ot(Wn), jn, xl, fo, Bi = v({}, Wn, {
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
    getModifierState: zu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== fo && (fo && e.type === "mousemove" ? (jn = e.screenX - fo.screenX, xl = e.screenY - fo.screenY) : xl = jn = 0, fo = e), jn);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xl;
    }
  }), ba = Ot(Bi), eS = v({}, Bi, { dataTransfer: 0 }), tS = Ot(eS), nS = v({}, Wn, { relatedTarget: 0 }), Nu = Ot(nS), lS = v({}, pn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), oS = Ot(lS), iS = v({}, pn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), rS = Ot(iS), aS = v({}, pn, { data: 0 }), Dm = Ot(aS), sS = {
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
  function zu() {
    return fS;
  }
  var dS = v({}, Wn, {
    key: function(e) {
      if (e.key) {
        var t = sS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = It(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zu,
    charCode: function(e) {
      return e.type === "keypress" ? It(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? It(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hS = Ot(dS), mS = v({}, Bi, {
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
  }), jm = Ot(mS), pS = v({}, Wn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zu
  }), gS = Ot(pS), bS = v({}, pn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yS = Ot(bS), vS = v({}, Bi, {
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
  }), ES = Ot(SS), CS = [9, 13, 27, 32], Du = Z && "CompositionEvent" in window, ya = null;
  Z && "documentMode" in document && (ya = document.documentMode);
  var RS = Z && "TextEvent" in window && !ya, Lm = Z && (!Du || ya && 8 < ya && 11 >= ya), Vm = " ", Hm = !1;
  function Im(e, t) {
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
  function Um(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Cr = !1;
  function wS(e, t) {
    switch (e) {
      case "compositionend":
        return Um(t);
      case "keypress":
        return t.which !== 32 ? null : (Hm = !0, Vm);
      case "textInput":
        return e = t.data, e === Vm && Hm ? null : e;
      default:
        return null;
    }
  }
  function _S(e, t) {
    if (Cr)
      return e === "compositionend" || !Du && Im(e, t) ? (e = wt(), Me = ke = He = null, Cr = !1, e) : null;
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
        return Lm && t.locale !== "ko" ? null : t.data;
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
  function Bm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!AS[e.type] : t === "textarea";
  }
  function Gm(e, t, l, i) {
    D ? U ? U.push(i) : U = [i] : D = i, t = gc(t, "onChange"), 0 < t.length && (l = new Sn(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var va = null, xa = null;
  function MS(e) {
    Rb(e, 0);
  }
  function Ms(e) {
    var t = ol(e);
    if (Dn(t)) return e;
  }
  function Ym(e, t) {
    if (e === "change") return t;
  }
  var qm = !1;
  if (Z) {
    var ju;
    if (Z) {
      var Lu = "oninput" in document;
      if (!Lu) {
        var Pm = document.createElement("div");
        Pm.setAttribute("oninput", "return;"), Lu = typeof Pm.oninput == "function";
      }
      ju = Lu;
    } else ju = !1;
    qm = ju && (!document.documentMode || 9 < document.documentMode);
  }
  function Xm() {
    va && (va.detachEvent("onpropertychange", Km), xa = va = null);
  }
  function Km(e) {
    if (e.propertyName === "value" && Ms(xa)) {
      var t = [];
      Gm(
        t,
        xa,
        e,
        k(e)
      ), ge(MS, t);
    }
  }
  function TS(e, t, l) {
    e === "focusin" ? (Xm(), va = t, xa = l, va.attachEvent("onpropertychange", Km)) : e === "focusout" && Xm();
  }
  function OS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ms(xa);
  }
  function kS(e, t) {
    if (e === "click") return Ms(t);
  }
  function NS(e, t) {
    if (e === "input" || e === "change")
      return Ms(t);
  }
  function zS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sl = typeof Object.is == "function" ? Object.is : zS;
  function Sa(e, t) {
    if (Sl(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), i = Object.keys(t);
    if (l.length !== i.length) return !1;
    for (i = 0; i < l.length; i++) {
      var s = l[i];
      if (!Oe.call(t, s) || !Sl(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Fm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Qm(e, t) {
    var l = Fm(e);
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
      l = Fm(l);
    }
  }
  function Zm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function $m(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Ro(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Ro(e.document);
    }
    return t;
  }
  function Vu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var DS = Z && "documentMode" in document && 11 >= document.documentMode, Rr = null, Hu = null, Ea = null, Iu = !1;
  function Jm(e, t, l) {
    var i = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Iu || Rr == null || Rr !== Ro(i) || (i = Rr, "selectionStart" in i && Vu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ea && Sa(Ea, i) || (Ea = i, i = gc(Hu, "onSelect"), 0 < i.length && (t = new Sn(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: i }), t.target = Rr)));
  }
  function Gi(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var wr = {
    animationend: Gi("Animation", "AnimationEnd"),
    animationiteration: Gi("Animation", "AnimationIteration"),
    animationstart: Gi("Animation", "AnimationStart"),
    transitionrun: Gi("Transition", "TransitionRun"),
    transitionstart: Gi("Transition", "TransitionStart"),
    transitioncancel: Gi("Transition", "TransitionCancel"),
    transitionend: Gi("Transition", "TransitionEnd")
  }, Uu = {}, Wm = {};
  Z && (Wm = document.createElement("div").style, "AnimationEvent" in window || (delete wr.animationend.animation, delete wr.animationiteration.animation, delete wr.animationstart.animation), "TransitionEvent" in window || delete wr.transitionend.transition);
  function Yi(e) {
    if (Uu[e]) return Uu[e];
    if (!wr[e]) return e;
    var t = wr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in Wm)
        return Uu[e] = t[l];
    return e;
  }
  var ep = Yi("animationend"), tp = Yi("animationiteration"), np = Yi("animationstart"), jS = Yi("transitionrun"), LS = Yi("transitionstart"), VS = Yi("transitioncancel"), lp = Yi("transitionend"), op = /* @__PURE__ */ new Map(), Bu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Bu.push("scrollEnd");
  function no(e, t) {
    op.set(e, t), Jl(t, [e]);
  }
  var Ts = typeof reportError == "function" ? reportError : function(e) {
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
  }, Vl = [], _r = 0, Gu = 0;
  function Os() {
    for (var e = _r, t = Gu = _r = 0; t < e; ) {
      var l = Vl[t];
      Vl[t++] = null;
      var i = Vl[t];
      Vl[t++] = null;
      var s = Vl[t];
      Vl[t++] = null;
      var u = Vl[t];
      if (Vl[t++] = null, i !== null && s !== null) {
        var p = i.pending;
        p === null ? s.next = s : (s.next = p.next, p.next = s), i.pending = s;
      }
      u !== 0 && ip(l, s, u);
    }
  }
  function ks(e, t, l, i) {
    Vl[_r++] = e, Vl[_r++] = t, Vl[_r++] = l, Vl[_r++] = i, Gu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Yu(e, t, l, i) {
    return ks(e, t, l, i), Ns(e);
  }
  function qi(e, t) {
    return ks(e, null, null, t), Ns(e);
  }
  function ip(e, t, l) {
    e.lanes |= l;
    var i = e.alternate;
    i !== null && (i.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, i = u.alternate, i !== null && (i.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - st(l), e = u.hiddenUpdates, i = e[s], i === null ? e[s] = [t] : i.push(t), t.lane = l | 536870912), u) : null;
  }
  function Ns(e) {
    if (50 < qa)
      throw qa = 0, Wf = null, Error(a(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ar = {};
  function HS(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function El(e, t, l, i) {
    return new HS(e, t, l, i);
  }
  function qu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ao(e, t) {
    var l = e.alternate;
    return l === null ? (l = El(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function rp(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function zs(e, t, l, i, s, u) {
    var p = 0;
    if (i = e, typeof e == "function") qu(e) && (p = 1);
    else if (typeof e == "string")
      p = YE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return e = El(31, l, t, s), e.elementType = P, e.lanes = u, e;
        case M:
          return Pi(l.children, s, u, t);
        case O:
          p = 8, s |= 24;
          break;
        case A:
          return e = El(12, l, t, s | 2), e.elementType = A, e.lanes = u, e;
        case H:
          return e = El(13, l, t, s), e.elementType = H, e.lanes = u, e;
        case q:
          return e = El(19, l, t, s), e.elementType = q, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case _:
                p = 10;
                break e;
              case T:
                p = 9;
                break e;
              case N:
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
    return t = El(p, l, t, s), t.elementType = e, t.type = i, t.lanes = u, t;
  }
  function Pi(e, t, l, i) {
    return e = El(7, e, i, t), e.lanes = l, e;
  }
  function Pu(e, t, l) {
    return e = El(6, e, null, t), e.lanes = l, e;
  }
  function ap(e) {
    var t = El(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Xu(e, t, l) {
    return t = El(
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
  var sp = /* @__PURE__ */ new WeakMap();
  function Hl(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = sp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Ze(t)
      }, sp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ze(t)
    };
  }
  var Mr = [], Tr = 0, Ds = null, Ca = 0, Il = [], Ul = 0, ei = null, ho = 1, mo = "";
  function Mo(e, t) {
    Mr[Tr++] = Ca, Mr[Tr++] = Ds, Ds = e, Ca = t;
  }
  function cp(e, t, l) {
    Il[Ul++] = ho, Il[Ul++] = mo, Il[Ul++] = ei, ei = e;
    var i = ho;
    e = mo;
    var s = 32 - st(i) - 1;
    i &= ~(1 << s), l += 1;
    var u = 32 - st(t) + s;
    if (30 < u) {
      var p = s - s % 5;
      u = (i & (1 << p) - 1).toString(32), i >>= p, s -= p, ho = 1 << 32 - st(t) + s | l << s | i, mo = u + e;
    } else
      ho = 1 << u | l << s | i, mo = e;
  }
  function Ku(e) {
    e.return !== null && (Mo(e, 1), cp(e, 1, 0));
  }
  function Fu(e) {
    for (; e === Ds; )
      Ds = Mr[--Tr], Mr[Tr] = null, Ca = Mr[--Tr], Mr[Tr] = null;
    for (; e === ei; )
      ei = Il[--Ul], Il[Ul] = null, mo = Il[--Ul], Il[Ul] = null, ho = Il[--Ul], Il[Ul] = null;
  }
  function up(e, t) {
    Il[Ul++] = ho, Il[Ul++] = mo, Il[Ul++] = ei, ho = t.id, mo = t.overflow, ei = e;
  }
  var Ln = null, qt = null, yt = !1, ti = null, Bl = !1, Qu = Error(a(519));
  function ni(e) {
    var t = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ra(Hl(t, e)), Qu;
  }
  function fp(e) {
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
        for (l = 0; l < Xa.length; l++)
          mt(Xa[l], t);
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
        mt("invalid", t), Er(
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
        mt("invalid", t), wo(t, i.value, i.defaultValue, i.children);
    }
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || Mb(t.textContent, l) ? (i.popover != null && (mt("beforetoggle", t), mt("toggle", t)), i.onScroll != null && mt("scroll", t), i.onScrollEnd != null && mt("scrollend", t), i.onClick != null && (t.onclick = $n), t = !0) : t = !1, t || ni(e, !0);
  }
  function dp(e) {
    for (Ln = e.return; Ln; )
      switch (Ln.tag) {
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
          Ln = Ln.return;
      }
  }
  function Or(e) {
    if (e !== Ln) return !1;
    if (!yt) return dp(e), yt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || md(e.type, e.memoizedProps)), l = !l), l && qt && ni(e), dp(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Vb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = Vb(e);
    } else
      t === 27 ? (t = qt, gi(e.type) ? (e = vd, vd = null, qt = e) : qt = t) : qt = Ln ? Yl(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Xi() {
    qt = Ln = null, yt = !1;
  }
  function Zu() {
    var e = ti;
    return e !== null && (dl === null ? dl = e : dl.push.apply(
      dl,
      e
    ), ti = null), e;
  }
  function Ra(e) {
    ti === null ? ti = [e] : ti.push(e);
  }
  var $u = z(null), Ki = null, To = null;
  function li(e, t, l) {
    ne($u, t._currentValue), t._currentValue = l;
  }
  function Oo(e) {
    e._currentValue = $u.current, K($u);
  }
  function Ju(e, t, l) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function Wu(e, t, l, i) {
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
              u.lanes |= l, E = u.alternate, E !== null && (E.lanes |= l), Ju(
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
        p.lanes |= l, u = p.alternate, u !== null && (u.lanes |= l), Ju(p, l, e), p = null;
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
  function kr(e, t, l, i) {
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
          Sl(s.pendingProps.value, p.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (s === qe.current) {
        if (p = s.alternate, p === null) throw Error(a(387));
        p.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push($a) : e = [$a]);
      }
      s = s.return;
    }
    e !== null && Wu(
      t,
      e,
      l,
      i
    ), t.flags |= 262144;
  }
  function js(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Sl(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Fi(e) {
    Ki = e, To = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vn(e) {
    return hp(Ki, e);
  }
  function Ls(e, t) {
    return Ki === null && Fi(e), hp(e, t);
  }
  function hp(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, To === null) {
      if (e === null) throw Error(a(308));
      To = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else To = To.next = t;
    return l;
  }
  var IS = typeof AbortController < "u" ? AbortController : function() {
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
  function ef() {
    return {
      controller: new IS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function wa(e) {
    e.refCount--, e.refCount === 0 && US(BS, function() {
      e.controller.abort();
    });
  }
  var _a = null, tf = 0, Nr = 0, zr = null;
  function GS(e, t) {
    if (_a === null) {
      var l = _a = [];
      tf = 0, Nr = id(), zr = {
        status: "pending",
        value: void 0,
        then: function(i) {
          l.push(i);
        }
      };
    }
    return tf++, t.then(mp, mp), t;
  }
  function mp() {
    if (--tf === 0 && _a !== null) {
      zr !== null && (zr.status = "fulfilled");
      var e = _a;
      _a = null, Nr = 0, zr = null;
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
  var pp = V.S;
  V.S = function(e, t) {
    Jg = Q(), typeof t == "object" && t !== null && typeof t.then == "function" && GS(e, t), pp !== null && pp(e, t);
  };
  var Qi = z(null);
  function nf() {
    var e = Qi.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function Vs(e, t) {
    t === null ? ne(Qi, Qi.current) : ne(Qi, t.pool);
  }
  function gp() {
    var e = nf();
    return e === null ? null : { parent: gn._currentValue, pool: e };
  }
  var Dr = Error(a(460)), lf = Error(a(474)), Hs = Error(a(542)), Is = { then: function() {
  } };
  function bp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function yp(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($n, $n), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, xp(e), e;
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
            throw e = t.reason, xp(e), e;
        }
        throw $i = t, Dr;
    }
  }
  function Zi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? ($i = l, Dr) : l;
    }
  }
  var $i = null;
  function vp() {
    if ($i === null) throw Error(a(459));
    var e = $i;
    return $i = null, e;
  }
  function xp(e) {
    if (e === Dr || e === Hs)
      throw Error(a(483));
  }
  var jr = null, Aa = 0;
  function Us(e) {
    var t = Aa;
    return Aa += 1, jr === null && (jr = []), yp(jr, e, t);
  }
  function Ma(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Bs(e, t) {
    throw t.$$typeof === x ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Sp(e) {
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
      return X = Ao(X, G), X.index = 0, X.sibling = null, X;
    }
    function u(X, G, $) {
      return X.index = $, e ? ($ = X.alternate, $ !== null ? ($ = $.index, $ < G ? (X.flags |= 67108866, G) : $) : (X.flags |= 67108866, G)) : (X.flags |= 1048576, G);
    }
    function p(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function E(X, G, $, de) {
      return G === null || G.tag !== 6 ? (G = Pu($, X.mode, de), G.return = X, G) : (G = s(G, $), G.return = X, G);
    }
    function L(X, G, $, de) {
      var Pe = $.type;
      return Pe === M ? ue(
        X,
        G,
        $.props.children,
        de,
        $.key
      ) : G !== null && (G.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === j && Zi(Pe) === G.type) ? (G = s(G, $.props), Ma(G, $), G.return = X, G) : (G = zs(
        $.type,
        $.key,
        $.props,
        null,
        X.mode,
        de
      ), Ma(G, $), G.return = X, G);
    }
    function J(X, G, $, de) {
      return G === null || G.tag !== 4 || G.stateNode.containerInfo !== $.containerInfo || G.stateNode.implementation !== $.implementation ? (G = Xu($, X.mode, de), G.return = X, G) : (G = s(G, $.children || []), G.return = X, G);
    }
    function ue(X, G, $, de, Pe) {
      return G === null || G.tag !== 7 ? (G = Pi(
        $,
        X.mode,
        de,
        Pe
      ), G.return = X, G) : (G = s(G, $), G.return = X, G);
    }
    function me(X, G, $) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return G = Pu(
          "" + G,
          X.mode,
          $
        ), G.return = X, G;
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case C:
            return $ = zs(
              G.type,
              G.key,
              G.props,
              null,
              X.mode,
              $
            ), Ma($, G), $.return = X, $;
          case w:
            return G = Xu(
              G,
              X.mode,
              $
            ), G.return = X, G;
          case j:
            return G = Zi(G), me(X, G, $);
        }
        if (be(G) || fe(G))
          return G = Pi(
            G,
            X.mode,
            $,
            null
          ), G.return = X, G;
        if (typeof G.then == "function")
          return me(X, Us(G), $);
        if (G.$$typeof === _)
          return me(
            X,
            Ls(X, G),
            $
          );
        Bs(X, G);
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
            return $ = Zi($), W(X, G, $, de);
        }
        if (be($) || fe($))
          return Pe !== null ? null : ue(X, G, $, de, null);
        if (typeof $.then == "function")
          return W(
            X,
            G,
            Us($),
            de
          );
        if ($.$$typeof === _)
          return W(
            X,
            G,
            Ls(X, $),
            de
          );
        Bs(X, $);
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
            return de = Zi(de), ie(
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
            Us(de),
            Pe
          );
        if (de.$$typeof === _)
          return ie(
            X,
            G,
            $,
            Ls(G, de),
            Pe
          );
        Bs(G, de);
      }
      return null;
    }
    function Ve(X, G, $, de) {
      for (var Pe = null, _t = null, Be = G, ct = G = 0, bt = null; Be !== null && ct < $.length; ct++) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var At = W(
          X,
          Be,
          $[ct],
          de
        );
        if (At === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && At.alternate === null && t(X, Be), G = u(At, G, ct), _t === null ? Pe = At : _t.sibling = At, _t = At, Be = bt;
      }
      if (ct === $.length)
        return l(X, Be), yt && Mo(X, ct), Pe;
      if (Be === null) {
        for (; ct < $.length; ct++)
          Be = me(X, $[ct], de), Be !== null && (G = u(
            Be,
            G,
            ct
          ), _t === null ? Pe = Be : _t.sibling = Be, _t = Be);
        return yt && Mo(X, ct), Pe;
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
      return e && Be.forEach(function(Si) {
        return t(X, Si);
      }), yt && Mo(X, ct), Pe;
    }
    function $e(X, G, $, de) {
      if ($ == null) throw Error(a(151));
      for (var Pe = null, _t = null, Be = G, ct = G = 0, bt = null, At = $.next(); Be !== null && !At.done; ct++, At = $.next()) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var Si = W(X, Be, At.value, de);
        if (Si === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Si.alternate === null && t(X, Be), G = u(Si, G, ct), _t === null ? Pe = Si : _t.sibling = Si, _t = Si, Be = bt;
      }
      if (At.done)
        return l(X, Be), yt && Mo(X, ct), Pe;
      if (Be === null) {
        for (; !At.done; ct++, At = $.next())
          At = me(X, At.value, de), At !== null && (G = u(At, G, ct), _t === null ? Pe = At : _t.sibling = At, _t = At);
        return yt && Mo(X, ct), Pe;
      }
      for (Be = i(Be); !At.done; ct++, At = $.next())
        At = ie(Be, X, ct, At.value, de), At !== null && (e && At.alternate !== null && Be.delete(At.key === null ? ct : At.key), G = u(At, G, ct), _t === null ? Pe = At : _t.sibling = At, _t = At);
      return e && Be.forEach(function(eC) {
        return t(X, eC);
      }), yt && Mo(X, ct), Pe;
    }
    function Ht(X, G, $, de) {
      if (typeof $ == "object" && $ !== null && $.type === M && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            e: {
              for (var Pe = $.key; G !== null; ) {
                if (G.key === Pe) {
                  if (Pe = $.type, Pe === M) {
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
                  } else if (G.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === j && Zi(Pe) === G.type) {
                    l(
                      X,
                      G.sibling
                    ), de = s(G, $.props), Ma(de, $), de.return = X, X = de;
                    break e;
                  }
                  l(X, G);
                  break;
                } else t(X, G);
                G = G.sibling;
              }
              $.type === M ? (de = Pi(
                $.props.children,
                X.mode,
                de,
                $.key
              ), de.return = X, X = de) : (de = zs(
                $.type,
                $.key,
                $.props,
                null,
                X.mode,
                de
              ), Ma(de, $), de.return = X, X = de);
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
              de = Xu($, X.mode, de), de.return = X, X = de;
            }
            return p(X);
          case j:
            return $ = Zi($), Ht(
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
          return Ht(
            X,
            G,
            Us($),
            de
          );
        if ($.$$typeof === _)
          return Ht(
            X,
            G,
            Ls(X, $),
            de
          );
        Bs(X, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, G !== null && G.tag === 6 ? (l(X, G.sibling), de = s(G, $), de.return = X, X = de) : (l(X, G), de = Pu($, X.mode, de), de.return = X, X = de), p(X)) : l(X, G);
    }
    return function(X, G, $, de) {
      try {
        Aa = 0;
        var Pe = Ht(
          X,
          G,
          $,
          de
        );
        return jr = null, Pe;
      } catch (Be) {
        if (Be === Dr || Be === Hs) throw Be;
        var _t = El(29, Be, null, X.mode);
        return _t.lanes = de, _t.return = X, _t;
      }
    };
  }
  var Ji = Sp(!0), Ep = Sp(!1), oi = !1;
  function of(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function rf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ii(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ri(e, t, l) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (kt & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = Ns(e), ip(e, null, l), t;
    }
    return ks(e, i, t, l), Ns(e);
  }
  function Ta(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Fn(e, l);
    }
  }
  function af(e, t) {
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
  var sf = !1;
  function Oa() {
    if (sf) {
      var e = zr;
      if (e !== null) throw e;
    }
  }
  function ka(e, t, l, i) {
    sf = !1;
    var s = e.updateQueue;
    oi = !1;
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
          W !== 0 && W === Nr && (sf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          e: {
            var Ve = e, $e = E;
            W = t;
            var Ht = l;
            switch ($e.tag) {
              case 1:
                if (Ve = $e.payload, typeof Ve == "function") {
                  me = Ve.call(Ht, me, W);
                  break e;
                }
                me = Ve;
                break e;
              case 3:
                Ve.flags = Ve.flags & -65537 | 128;
              case 0:
                if (Ve = $e.payload, W = typeof Ve == "function" ? Ve.call(Ht, me, W) : Ve, W == null) break e;
                me = v({}, me, W);
                break e;
              case 2:
                oi = !0;
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
      ue === null && (L = me), s.baseState = L, s.firstBaseUpdate = J, s.lastBaseUpdate = ue, u === null && (s.shared.lanes = 0), fi |= p, e.lanes = p, e.memoizedState = me;
    }
  }
  function Cp(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function Rp(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Cp(l[e], t);
  }
  var Lr = z(null), Gs = z(0);
  function wp(e, t) {
    e = Io, ne(Gs, e), ne(Lr, t), Io = e | t.baseLanes;
  }
  function cf() {
    ne(Gs, Io), ne(Lr, Lr.current);
  }
  function uf() {
    Io = Gs.current, K(Lr), K(Gs);
  }
  var Cl = z(null), Gl = null;
  function ai(e) {
    var t = e.alternate;
    ne(un, un.current & 1), ne(Cl, e), Gl === null && (t === null || Lr.current !== null || t.memoizedState !== null) && (Gl = e);
  }
  function ff(e) {
    ne(un, un.current), ne(Cl, e), Gl === null && (Gl = e);
  }
  function _p(e) {
    e.tag === 22 ? (ne(un, un.current), ne(Cl, e), Gl === null && (Gl = e)) : si();
  }
  function si() {
    ne(un, un.current), ne(Cl, Cl.current);
  }
  function Rl(e) {
    K(Cl), Gl === e && (Gl = null), K(un);
  }
  var un = z(0);
  function Ys(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || bd(l) || yd(l)))
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
  var ko = 0, rt = null, Lt = null, bn = null, qs = !1, Vr = !1, Wi = !1, Ps = 0, Na = 0, Hr = null, qS = 0;
  function nn() {
    throw Error(a(321));
  }
  function df(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Sl(e[l], t[l])) return !1;
    return !0;
  }
  function hf(e, t, l, i, s, u) {
    return ko = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? cg : Mf, Wi = !1, u = l(i, s), Wi = !1, Vr && (u = Mp(
      t,
      l,
      i,
      s
    )), Ap(e), u;
  }
  function Ap(e) {
    V.H = ja;
    var t = Lt !== null && Lt.next !== null;
    if (ko = 0, bn = Lt = rt = null, qs = !1, Na = 0, Hr = null, t) throw Error(a(300));
    e === null || yn || (e = e.dependencies, e !== null && js(e) && (yn = !0));
  }
  function Mp(e, t, l, i) {
    rt = e;
    var s = 0;
    do {
      if (Vr && (Hr = null), Na = 0, Vr = !1, 25 <= s) throw Error(a(301));
      if (s += 1, bn = Lt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = ug, u = t(l, i);
    } while (Vr);
    return u;
  }
  function PS() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? za(t) : t, e = e.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== e && (rt.flags |= 1024), t;
  }
  function mf() {
    var e = Ps !== 0;
    return Ps = 0, e;
  }
  function pf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function gf(e) {
    if (qs) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      qs = !1;
    }
    ko = 0, bn = Lt = rt = null, Vr = !1, Na = Ps = 0, Hr = null;
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
  function Xs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function za(e) {
    var t = Na;
    return Na += 1, Hr === null && (Hr = []), e = yp(Hr, e, t), t = rt, (bn === null ? t.memoizedState : bn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? cg : Mf), e;
  }
  function Ks(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return za(e);
      if (e.$$typeof === _) return Vn(e);
    }
    throw Error(a(438, String(e)));
  }
  function bf(e) {
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
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Xs(), rt.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), i = 0; i < e; i++)
        l[i] = te;
    return t.index++, l;
  }
  function No(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fs(e) {
    var t = fn();
    return yf(t, Lt, e);
  }
  function yf(e, t, l) {
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
        if (me !== J.lane ? (gt & me) === me : (ko & me) === me) {
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
            }), me === Nr && (ue = !0);
          else if ((ko & W) === W) {
            J = J.next, W === Nr && (ue = !0);
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
            }, L === null ? (E = L = me, p = u) : L = L.next = me, rt.lanes |= W, fi |= W;
          me = J.action, Wi && l(u, me), u = J.hasEagerState ? J.eagerState : l(u, me);
        } else
          W = {
            lane: me,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, L === null ? (E = L = W, p = u) : L = L.next = W, rt.lanes |= me, fi |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (L === null ? p = u : L.next = E, !Sl(u, e.memoizedState) && (yn = !0, ue && (l = zr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = p, e.baseQueue = L, i.lastRenderedState = u;
    }
    return s === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function vf(e) {
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
      Sl(u, t.memoizedState) || (yn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, i];
  }
  function Tp(e, t, l) {
    var i = rt, s = fn(), u = yt;
    if (u) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = t();
    var p = !Sl(
      (Lt || s).memoizedState,
      l
    );
    if (p && (s.memoizedState = l, yn = !0), s = s.queue, Ef(Np.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || p || bn !== null && bn.memoizedState.tag & 1) {
      if (i.flags |= 2048, Ir(
        9,
        { destroy: void 0 },
        kp.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(a(349));
      u || (ko & 127) !== 0 || Op(i, t, l);
    }
    return l;
  }
  function Op(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Xs(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function kp(e, t, l, i) {
    t.value = l, t.getSnapshot = i, zp(t) && Dp(e);
  }
  function Np(e, t, l) {
    return l(function() {
      zp(t) && Dp(e);
    });
  }
  function zp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Sl(e, l);
    } catch {
      return !0;
    }
  }
  function Dp(e) {
    var t = qi(e, 2);
    t !== null && hl(t, e, 2);
  }
  function xf(e) {
    var t = el();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Wi) {
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
      lastRenderedReducer: No,
      lastRenderedState: e
    }, t;
  }
  function jp(e, t, l, i) {
    return e.baseState = l, yf(
      e,
      Lt,
      typeof i == "function" ? i : No
    );
  }
  function XS(e, t, l, i, s) {
    if ($s(e)) throw Error(a(485));
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
      V.T !== null ? l(!0) : u.isTransition = !1, i(u), l = t.pending, l === null ? (u.next = t.pending = u, Lp(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Lp(e, t) {
    var l = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, p = {};
      V.T = p;
      try {
        var E = l(s, i), L = V.S;
        L !== null && L(p, E), Vp(e, t, E);
      } catch (J) {
        Sf(e, t, J);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), V.T = u;
      }
    } else
      try {
        u = l(s, i), Vp(e, t, u);
      } catch (J) {
        Sf(e, t, J);
      }
  }
  function Vp(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Hp(e, t, i);
      },
      function(i) {
        return Sf(e, t, i);
      }
    ) : Hp(e, t, l);
  }
  function Hp(e, t, l) {
    t.status = "fulfilled", t.value = l, Ip(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Lp(e, l)));
  }
  function Sf(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Ip(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Ip(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Up(e, t) {
    return t;
  }
  function Bp(e, t) {
    if (yt) {
      var l = Ut.formState;
      if (l !== null) {
        e: {
          var i = rt;
          if (yt) {
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
            ni(i);
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
      lastRenderedReducer: Up,
      lastRenderedState: t
    }, l.queue = i, l = rg.bind(
      null,
      rt,
      i
    ), i.dispatch = l, i = xf(!1), u = Af.bind(
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
  function Gp(e) {
    var t = fn();
    return Yp(t, Lt, e);
  }
  function Yp(e, t, l) {
    if (t = yf(
      e,
      t,
      Up
    )[0], e = Fs(No)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = za(t);
      } catch (p) {
        throw p === Dr ? Hs : p;
      }
    else i = t;
    t = fn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (rt.flags |= 2048, Ir(
      9,
      { destroy: void 0 },
      KS.bind(null, s, l),
      null
    )), [i, u, e];
  }
  function KS(e, t) {
    e.action = t;
  }
  function qp(e) {
    var t = fn(), l = Lt;
    if (l !== null)
      return Yp(t, l, e);
    fn(), t = t.memoizedState, l = fn();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Ir(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Xs(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Pp() {
    return fn().memoizedState;
  }
  function Qs(e, t, l, i) {
    var s = el();
    rt.flags |= e, s.memoizedState = Ir(
      1 | t,
      { destroy: void 0 },
      l,
      i === void 0 ? null : i
    );
  }
  function Zs(e, t, l, i) {
    var s = fn();
    i = i === void 0 ? null : i;
    var u = s.memoizedState.inst;
    Lt !== null && i !== null && df(i, Lt.memoizedState.deps) ? s.memoizedState = Ir(t, u, l, i) : (rt.flags |= e, s.memoizedState = Ir(
      1 | t,
      u,
      l,
      i
    ));
  }
  function Xp(e, t) {
    Qs(8390656, 8, e, t);
  }
  function Ef(e, t) {
    Zs(2048, 8, e, t);
  }
  function FS(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Xs(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function Kp(e) {
    var t = fn().memoizedState;
    return FS({ ref: t, nextImpl: e }), function() {
      if ((kt & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Fp(e, t) {
    return Zs(4, 2, e, t);
  }
  function Qp(e, t) {
    return Zs(4, 4, e, t);
  }
  function Zp(e, t) {
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
  function $p(e, t, l) {
    l = l != null ? l.concat([e]) : null, Zs(4, 4, Zp.bind(null, t, e), l);
  }
  function Cf() {
  }
  function Jp(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && df(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function Wp(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    if (t !== null && df(t, i[1]))
      return i[0];
    if (i = e(), Wi) {
      on(!0);
      try {
        e();
      } finally {
        on(!1);
      }
    }
    return l.memoizedState = [i, t], i;
  }
  function Rf(e, t, l) {
    return l === void 0 || (ko & 1073741824) !== 0 && (gt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = eb(), rt.lanes |= e, fi |= e, l);
  }
  function eg(e, t, l, i) {
    return Sl(l, t) ? l : Lr.current !== null ? (e = Rf(e, l, i), Sl(e, t) || (yn = !0), e) : (ko & 42) === 0 || (ko & 1073741824) !== 0 && (gt & 261930) === 0 ? (yn = !0, e.memoizedState = l) : (e = eb(), rt.lanes |= e, fi |= e, t);
  }
  function tg(e, t, l, i, s) {
    var u = I.p;
    I.p = u !== 0 && 8 > u ? u : 8;
    var p = V.T, E = {};
    V.T = E, Af(e, !1, t, l);
    try {
      var L = s(), J = V.S;
      if (J !== null && J(E, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = YS(
          L,
          i
        );
        Da(
          e,
          t,
          ue,
          Al(e)
        );
      } else
        Da(
          e,
          t,
          i,
          Al(e)
        );
    } catch (me) {
      Da(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Al()
      );
    } finally {
      I.p = u, p !== null && E.types !== null && (p.types = E.types), V.T = p;
    }
  }
  function QS() {
  }
  function wf(e, t, l, i) {
    if (e.tag !== 5) throw Error(a(476));
    var s = ng(e).queue;
    tg(
      e,
      s,
      t,
      F,
      l === null ? QS : function() {
        return lg(e), l(i);
      }
    );
  }
  function ng(e) {
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
        lastRenderedReducer: No,
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
        lastRenderedReducer: No,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function lg(e) {
    var t = ng(e);
    t.next === null && (t = e.alternate.memoizedState), Da(
      e,
      t.next.queue,
      {},
      Al()
    );
  }
  function _f() {
    return Vn($a);
  }
  function og() {
    return fn().memoizedState;
  }
  function ig() {
    return fn().memoizedState;
  }
  function ZS(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Al();
          e = ii(l);
          var i = ri(t, e, l);
          i !== null && (hl(i, t, l), Ta(i, t, l)), t = { cache: ef() }, e.payload = t;
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
    }, $s(e) ? ag(t, l) : (l = Yu(e, t, l, i), l !== null && (hl(l, e, i), sg(l, t, i)));
  }
  function rg(e, t, l) {
    var i = Al();
    Da(e, t, l, i);
  }
  function Da(e, t, l, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if ($s(e)) ag(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var p = t.lastRenderedState, E = u(p, l);
          if (s.hasEagerState = !0, s.eagerState = E, Sl(E, p))
            return ks(e, t, s, 0), Ut === null && Os(), !1;
        } catch {
        }
      if (l = Yu(e, t, s, i), l !== null)
        return hl(l, e, i), sg(l, t, i), !0;
    }
    return !1;
  }
  function Af(e, t, l, i) {
    if (i = {
      lane: 2,
      revertLane: id(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, $s(e)) {
      if (t) throw Error(a(479));
    } else
      t = Yu(
        e,
        l,
        i,
        2
      ), t !== null && hl(t, e, 2);
  }
  function $s(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
  }
  function ag(e, t) {
    Vr = qs = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function sg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, l |= i, t.lanes = l, Fn(e, l);
    }
  }
  var ja = {
    readContext: Vn,
    use: Ks,
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
  ja.useEffectEvent = nn;
  var cg = {
    readContext: Vn,
    use: Ks,
    useCallback: function(e, t) {
      return el().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vn,
    useEffect: Xp,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Qs(
        4194308,
        4,
        Zp.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Qs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Qs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = el();
      t = t === void 0 ? null : t;
      var i = e();
      if (Wi) {
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
        if (Wi) {
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
      e = xf(e);
      var t = e.queue, l = rg.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Cf,
    useDeferredValue: function(e, t) {
      var l = el();
      return Rf(l, e, t);
    },
    useTransition: function() {
      var e = xf(!1);
      return e = tg.bind(
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
        (gt & 127) !== 0 || Op(i, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, Xp(Np.bind(null, i, u, e), [
        e
      ]), i.flags |= 2048, Ir(
        9,
        { destroy: void 0 },
        kp.bind(
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
        var l = mo, i = ho;
        l = (i & ~(1 << 32 - st(i) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Ps++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = qS++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: _f,
    useFormState: Bp,
    useActionState: Bp,
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
    useMemoCache: bf,
    useCacheRefresh: function() {
      return el().memoizedState = ZS.bind(
        null,
        rt
      );
    },
    useEffectEvent: function(e) {
      var t = el(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((kt & 2) !== 0)
          throw Error(a(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Mf = {
    readContext: Vn,
    use: Ks,
    useCallback: Jp,
    useContext: Vn,
    useEffect: Ef,
    useImperativeHandle: $p,
    useInsertionEffect: Fp,
    useLayoutEffect: Qp,
    useMemo: Wp,
    useReducer: Fs,
    useRef: Pp,
    useState: function() {
      return Fs(No);
    },
    useDebugValue: Cf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return eg(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Fs(No)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : za(e),
        t
      ];
    },
    useSyncExternalStore: Tp,
    useId: og,
    useHostTransitionStatus: _f,
    useFormState: Gp,
    useActionState: Gp,
    useOptimistic: function(e, t) {
      var l = fn();
      return jp(l, Lt, e, t);
    },
    useMemoCache: bf,
    useCacheRefresh: ig
  };
  Mf.useEffectEvent = Kp;
  var ug = {
    readContext: Vn,
    use: Ks,
    useCallback: Jp,
    useContext: Vn,
    useEffect: Ef,
    useImperativeHandle: $p,
    useInsertionEffect: Fp,
    useLayoutEffect: Qp,
    useMemo: Wp,
    useReducer: vf,
    useRef: Pp,
    useState: function() {
      return vf(No);
    },
    useDebugValue: Cf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return Lt === null ? Rf(l, e, t) : eg(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = vf(No)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : za(e),
        t
      ];
    },
    useSyncExternalStore: Tp,
    useId: og,
    useHostTransitionStatus: _f,
    useFormState: qp,
    useActionState: qp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Lt !== null ? jp(l, Lt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: bf,
    useCacheRefresh: ig
  };
  ug.useEffectEvent = Kp;
  function Tf(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : v({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Of = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Al(), s = ii(i);
      s.payload = t, l != null && (s.callback = l), t = ri(e, s, i), t !== null && (hl(t, e, i), Ta(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Al(), s = ii(i);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = ri(e, s, i), t !== null && (hl(t, e, i), Ta(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Al(), i = ii(l);
      i.tag = 2, t != null && (i.callback = t), t = ri(e, i, l), t !== null && (hl(t, e, l), Ta(t, e, l));
    }
  };
  function fg(e, t, l, i, s, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Sa(l, i) || !Sa(s, u) : !0;
  }
  function dg(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && Of.enqueueReplaceState(t, t.state, null);
  }
  function er(e, t) {
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
  function hg(e) {
    Ts(e);
  }
  function mg(e) {
    console.error(e);
  }
  function pg(e) {
    Ts(e);
  }
  function Js(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function gg(e, t, l) {
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
    return l = ii(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Js(e, t);
    }, l;
  }
  function bg(e) {
    return e = ii(e), e.tag = 3, e;
  }
  function yg(e, t, l, i) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        gg(t, l, i);
      };
    }
    var p = l.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      gg(t, l, i), typeof s != "function" && (di === null ? di = /* @__PURE__ */ new Set([this]) : di.add(this));
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
      ), l = Cl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Gl === null ? uc() : l.alternate === null && ln === 0 && (ln = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, i === Is ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), nd(e, i, s)), !1;
          case 22:
            return l.flags |= 65536, i === Is ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : l.add(i)), nd(e, i, s)), !1;
        }
        throw Error(a(435, l.tag));
      }
      return nd(e, i, s), uc(), !1;
    }
    if (yt)
      return t = Cl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== Qu && (e = Error(a(422), { cause: i }), Ra(Hl(e, l)))) : (i !== Qu && (t = Error(a(423), {
        cause: i
      }), Ra(
        Hl(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = Hl(i, l), s = kf(
        e.stateNode,
        i,
        s
      ), af(e, s), ln !== 4 && (ln = 2)), !1;
    var u = Error(a(520), { cause: i });
    if (u = Hl(u, l), Ya === null ? Ya = [u] : Ya.push(u), ln !== 4 && (ln = 2), t === null) return !0;
    i = Hl(i, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = kf(l.stateNode, i, e), af(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (di === null || !di.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = bg(s), yg(
              s,
              e,
              l,
              i
            ), af(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Nf = Error(a(461)), yn = !1;
  function Hn(e, t, l, i) {
    t.child = e === null ? Ep(t, null, l, i) : Ji(
      t,
      e.child,
      l,
      i
    );
  }
  function vg(e, t, l, i, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in i) {
      var p = {};
      for (var E in i)
        E !== "ref" && (p[E] = i[E]);
    } else p = i;
    return Fi(t), i = hf(
      e,
      t,
      l,
      p,
      u,
      s
    ), E = mf(), e !== null && !yn ? (pf(e, t, s), zo(e, t, s)) : (yt && E && Ku(t), t.flags |= 1, Hn(e, t, i, s), t.child);
  }
  function xg(e, t, l, i, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !qu(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Sg(
        e,
        t,
        u,
        i,
        s
      )) : (e = zs(
        l.type,
        null,
        i,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Uf(e, s)) {
      var p = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Sa, l(p, i) && e.ref === t.ref)
        return zo(e, t, s);
    }
    return t.flags |= 1, e = Ao(u, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Sg(e, t, l, i, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Sa(u, i) && e.ref === t.ref)
        if (yn = !1, t.pendingProps = i = u, Uf(e, s))
          (e.flags & 131072) !== 0 && (yn = !0);
        else
          return t.lanes = e.lanes, zo(e, t, s);
    }
    return zf(
      e,
      t,
      l,
      i,
      s
    );
  }
  function Eg(e, t, l, i) {
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
        return Cg(
          e,
          t,
          u,
          l,
          i
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Vs(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? wp(t, u) : cf(), _p(t);
      else
        return i = t.lanes = 536870912, Cg(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          i
        );
    } else
      u !== null ? (Vs(t, u.cachePool), wp(t, u), si(), t.memoizedState = null) : (e !== null && Vs(t, null), cf(), si());
    return Hn(e, t, s, l), t.child;
  }
  function La(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Cg(e, t, l, i, s) {
    var u = nf();
    return u = u === null ? null : { parent: gn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Vs(t, null), cf(), _p(t), e !== null && kr(e, t, i, !0), t.childLanes = s, null;
  }
  function Ws(e, t) {
    return t = tc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Rg(e, t, l) {
    return Ji(t, e.child, null, l), e = Ws(t, t.pendingProps), e.flags |= 2, Rl(t), t.memoizedState = null, e;
  }
  function WS(e, t, l) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (yt) {
        if (i.mode === "hidden")
          return e = Ws(t, i), t.lanes = 536870912, La(null, e);
        if (ff(t), (e = qt) ? (e = Lb(
          e,
          Bl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ei !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = ap(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw ni(t);
        return t.lanes = 536870912, null;
      }
      return Ws(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (ff(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Rg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(a(558));
      else if (yn || kr(e, t, l, !1), s = (l & e.childLanes) !== 0, yn || s) {
        if (i = Ut, i !== null && (p = rn(i, l), p !== 0 && p !== u.retryLane))
          throw u.retryLane = p, qi(e, p), hl(i, e, p), Nf;
        uc(), t = Rg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, qt = Yl(p.nextSibling), Ln = t, yt = !0, ti = null, Bl = !1, e !== null && up(t, e), t = Ws(t, i), t.flags |= 4096;
      return t;
    }
    return e = Ao(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ec(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(a(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function zf(e, t, l, i, s) {
    return Fi(t), l = hf(
      e,
      t,
      l,
      i,
      void 0,
      s
    ), i = mf(), e !== null && !yn ? (pf(e, t, s), zo(e, t, s)) : (yt && i && Ku(t), t.flags |= 1, Hn(e, t, l, s), t.child);
  }
  function wg(e, t, l, i, s, u) {
    return Fi(t), t.updateQueue = null, l = Mp(
      t,
      i,
      l,
      s
    ), Ap(e), i = mf(), e !== null && !yn ? (pf(e, t, u), zo(e, t, u)) : (yt && i && Ku(t), t.flags |= 1, Hn(e, t, l, u), t.child);
  }
  function _g(e, t, l, i, s) {
    if (Fi(t), t.stateNode === null) {
      var u = Ar, p = l.contextType;
      typeof p == "object" && p !== null && (u = Vn(p)), u = new l(i, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Of, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = i, u.state = t.memoizedState, u.refs = {}, of(t), p = l.contextType, u.context = typeof p == "object" && p !== null ? Vn(p) : Ar, u.state = t.memoizedState, p = l.getDerivedStateFromProps, typeof p == "function" && (Tf(
        t,
        l,
        p,
        i
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && Of.enqueueReplaceState(u, u.state, null), ka(t, i, u, s), Oa(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, L = er(l, E);
      u.props = L;
      var J = u.context, ue = l.contextType;
      p = Ar, typeof ue == "object" && ue !== null && (p = Vn(ue));
      var me = l.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ue || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || J !== p) && dg(
        t,
        u,
        i,
        p
      ), oi = !1;
      var W = t.memoizedState;
      u.state = W, ka(t, i, u, s), Oa(), J = t.memoizedState, E || W !== J || oi ? (typeof me == "function" && (Tf(
        t,
        l,
        me,
        i
      ), J = t.memoizedState), (L = oi || fg(
        t,
        l,
        L,
        i,
        W,
        J,
        p
      )) ? (ue || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = J), u.props = i, u.state = J, u.context = p, i = L) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      u = t.stateNode, rf(e, t), p = t.memoizedProps, ue = er(l, p), u.props = ue, me = t.pendingProps, W = u.context, J = l.contextType, L = Ar, typeof J == "object" && J !== null && (L = Vn(J)), E = l.getDerivedStateFromProps, (J = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== me || W !== L) && dg(
        t,
        u,
        i,
        L
      ), oi = !1, W = t.memoizedState, u.state = W, ka(t, i, u, s), Oa();
      var ie = t.memoizedState;
      p !== me || W !== ie || oi || e !== null && e.dependencies !== null && js(e.dependencies) ? (typeof E == "function" && (Tf(
        t,
        l,
        E,
        i
      ), ie = t.memoizedState), (ue = oi || fg(
        t,
        l,
        ue,
        i,
        W,
        ie,
        L
      ) || e !== null && e.dependencies !== null && js(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, ie, L), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        ie,
        L
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ie), u.props = i, u.state = ie, u.context = L, i = ue) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return u = i, ec(e, t), i = (t.flags & 128) !== 0, u || i ? (u = t.stateNode, l = i && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && i ? (t.child = Ji(
      t,
      e.child,
      null,
      s
    ), t.child = Ji(
      t,
      null,
      l,
      s
    )) : Hn(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = zo(
      e,
      t,
      s
    ), e;
  }
  function Ag(e, t, l, i) {
    return Xi(), t.flags |= 256, Hn(e, t, l, i), t.child;
  }
  var Df = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jf(e) {
    return { baseLanes: e, cachePool: gp() };
  }
  function Lf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= _l), e;
  }
  function Mg(e, t, l) {
    var i = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (un.current & 2) !== 0), p && (s = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (yt) {
        if (s ? ai(t) : si(), (e = qt) ? (e = Lb(
          e,
          Bl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ei !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = ap(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw ni(t);
        return yd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var E = i.children;
      return i = i.fallback, s ? (si(), s = t.mode, E = tc(
        { mode: "hidden", children: E },
        s
      ), i = Pi(
        i,
        s,
        l,
        null
      ), E.return = t, i.return = t, E.sibling = i, t.child = E, i = t.child, i.memoizedState = jf(l), i.childLanes = Lf(
        e,
        p,
        l
      ), t.memoizedState = Df, La(null, i)) : (ai(t), Vf(t, E));
    }
    var L = e.memoizedState;
    if (L !== null && (E = L.dehydrated, E !== null)) {
      if (u)
        t.flags & 256 ? (ai(t), t.flags &= -257, t = Hf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (si(), t.child = e.child, t.flags |= 128, t = null) : (si(), E = i.fallback, s = t.mode, i = tc(
          { mode: "visible", children: i.children },
          s
        ), E = Pi(
          E,
          s,
          l,
          null
        ), E.flags |= 2, i.return = t, E.return = t, i.sibling = E, t.child = i, Ji(
          t,
          e.child,
          null,
          l
        ), i = t.child, i.memoizedState = jf(l), i.childLanes = Lf(
          e,
          p,
          l
        ), t.memoizedState = Df, t = La(null, i));
      else if (ai(t), yd(E)) {
        if (p = E.nextSibling && E.nextSibling.dataset, p) var J = p.dgst;
        p = J, i = Error(a(419)), i.stack = "", i.digest = p, Ra({ value: i, source: null, stack: null }), t = Hf(
          e,
          t,
          l
        );
      } else if (yn || kr(e, t, l, !1), p = (l & e.childLanes) !== 0, yn || p) {
        if (p = Ut, p !== null && (i = rn(p, l), i !== 0 && i !== L.retryLane))
          throw L.retryLane = i, qi(e, i), hl(p, e, i), Nf;
        bd(E) || uc(), t = Hf(
          e,
          t,
          l
        );
      } else
        bd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, qt = Yl(
          E.nextSibling
        ), Ln = t, yt = !0, ti = null, Bl = !1, e !== null && up(t, e), t = Vf(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (si(), E = i.fallback, s = t.mode, L = e.child, J = L.sibling, i = Ao(L, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = L.subtreeFlags & 65011712, J !== null ? E = Ao(
      J,
      E
    ) : (E = Pi(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, i.return = t, i.sibling = E, t.child = i, La(null, i), i = t.child, E = e.child.memoizedState, E === null ? E = jf(l) : (s = E.cachePool, s !== null ? (L = gn._currentValue, s = s.parent !== L ? { parent: L, pool: L } : s) : s = gp(), E = {
      baseLanes: E.baseLanes | l,
      cachePool: s
    }), i.memoizedState = E, i.childLanes = Lf(
      e,
      p,
      l
    ), t.memoizedState = Df, La(e.child, i)) : (ai(t), l = e.child, e = l.sibling, l = Ao(l, {
      mode: "visible",
      children: i.children
    }), l.return = t, l.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Vf(e, t) {
    return t = tc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function tc(e, t) {
    return e = El(22, e, null, t), e.lanes = 0, e;
  }
  function Hf(e, t, l) {
    return Ji(t, e.child, null, l), e = Vf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Tg(e, t, l) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), Ju(e.return, t, l);
  }
  function If(e, t, l, i, s, u) {
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
  function Og(e, t, l) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var p = un.current, E = (p & 2) !== 0;
    if (E ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, ne(un, p), Hn(e, t, i, l), i = yt ? Ca : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Tg(e, l, t);
        else if (e.tag === 19)
          Tg(e, l, t);
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
          e = l.alternate, e !== null && Ys(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), If(
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
          if (e = s.alternate, e !== null && Ys(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = l, l = s, s = e;
        }
        If(
          t,
          !0,
          l,
          null,
          u,
          i
        );
        break;
      case "together":
        If(
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
  function zo(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), fi |= t.lanes, (l & t.childLanes) === 0)
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
      for (e = t.child, l = Ao(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Ao(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Uf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && js(e)));
  }
  function eE(e, t, l) {
    switch (t.tag) {
      case 3:
        Ae(t, t.stateNode.containerInfo), li(t, gn, e.memoizedState.cache), Xi();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
        break;
      case 10:
        li(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ff(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (ai(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Mg(e, t, l) : (ai(t), e = zo(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ai(t);
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
            return Og(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), ne(un, un.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, Eg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        li(t, gn, e.memoizedState.cache);
    }
    return zo(e, t, l);
  }
  function kg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        yn = !0;
      else {
        if (!Uf(e, l) && (t.flags & 128) === 0)
          return yn = !1, eE(
            e,
            t,
            l
          );
        yn = (e.flags & 131072) !== 0;
      }
    else
      yn = !1, yt && (t.flags & 1048576) !== 0 && cp(t, Ca, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Zi(t.elementType), t.type = e, typeof e == "function")
            qu(e) ? (i = er(e, i), t.tag = 1, t = _g(
              null,
              t,
              e,
              i,
              l
            )) : (t.tag = 0, t = zf(
              null,
              t,
              e,
              i,
              l
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === N) {
                t.tag = 11, t = vg(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (s === B) {
                t.tag = 14, t = xg(
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
        return zf(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return i = t.type, s = er(
          i,
          t.pendingProps
        ), _g(
          e,
          t,
          i,
          s,
          l
        );
      case 3:
        e: {
          if (Ae(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(a(387));
          i = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, rf(e, t), ka(t, i, null, l);
          var p = t.memoizedState;
          if (i = p.cache, li(t, gn, i), i !== u.cache && Wu(
            t,
            [gn],
            l,
            !0
          ), Oa(), i = p.element, u.isDehydrated)
            if (u = {
              element: i,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Ag(
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
              ), Ra(s), t = Ag(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qt = Yl(e.firstChild), Ln = t, yt = !0, ti = null, Bl = !0, l = Ep(
                t,
                null,
                i,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Xi(), i === s) {
              t = zo(
                e,
                t,
                l
              );
              break e;
            }
            Hn(e, t, i, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ec(e, t), e === null ? (l = Gb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : yt || (l = t.type, e = t.pendingProps, i = bc(
          we.current
        ).createElement(l), i[Ct] = t, i[Rt] = e, In(i, l, e), en(i), t.stateNode = i) : t.memoizedState = Gb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && yt && (i = t.stateNode = Ib(
          t.type,
          t.pendingProps,
          we.current
        ), Ln = t, Bl = !0, s = qt, gi(t.type) ? (vd = s, qt = Yl(i.firstChild)) : qt = s), Hn(
          e,
          t,
          t.pendingProps.children,
          l
        ), ec(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && yt && ((s = i = qt) && (i = OE(
          i,
          t.type,
          t.pendingProps,
          Bl
        ), i !== null ? (t.stateNode = i, Ln = t, qt = Yl(i.firstChild), Bl = !1, s = !0) : s = !1), s || ni(t)), it(t), s = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, i = u.children, md(s, u) ? i = null : p !== null && md(s, p) && (t.flags |= 32), t.memoizedState !== null && (s = hf(
          e,
          t,
          PS,
          null,
          null,
          l
        ), $a._currentValue = s), ec(e, t), Hn(e, t, i, l), t.child;
      case 6:
        return e === null && yt && ((e = l = qt) && (l = kE(
          l,
          t.pendingProps,
          Bl
        ), l !== null ? (t.stateNode = l, Ln = t, qt = null, e = !0) : e = !1), e || ni(t)), null;
      case 13:
        return Mg(e, t, l);
      case 4:
        return Ae(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Ji(
          t,
          null,
          i,
          l
        ) : Hn(e, t, i, l), t.child;
      case 11:
        return vg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Hn(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Hn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Hn(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return i = t.pendingProps, li(t, t.type, i.value), Hn(e, t, i.children, l), t.child;
      case 9:
        return s = t.type._context, i = t.pendingProps.children, Fi(t), s = Vn(s), i = i(s), t.flags |= 1, Hn(e, t, i, l), t.child;
      case 14:
        return xg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Sg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Og(e, t, l);
      case 31:
        return WS(e, t, l);
      case 22:
        return Eg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Fi(t), i = Vn(gn), e === null ? (s = nf(), s === null && (s = Ut, u = ef(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: i, cache: s }, of(t), li(t, gn, s)) : ((e.lanes & l) !== 0 && (rf(e, t), ka(t, null, null, l), Oa()), s = e.memoizedState, u = t.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), li(t, gn, i)) : (i = u.cache, li(t, gn, i), i !== s.cache && Wu(
          t,
          [gn],
          l,
          !0
        ))), Hn(
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
  function Do(e) {
    e.flags |= 4;
  }
  function Bf(e, t, l, i, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (ob()) e.flags |= 8192;
        else
          throw $i = Is, lf;
    } else e.flags &= -16777217;
  }
  function Ng(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Kb(t))
      if (ob()) e.flags |= 8192;
      else
        throw $i = Is, lf;
  }
  function nc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? _n() : 536870912, e.lanes |= t, Yr |= t);
  }
  function Va(e, t) {
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
    switch (Fu(t), t.tag) {
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
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), Oo(gn), Te(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Or(t) ? Do(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Zu())), Pt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Do(t), u !== null ? (Pt(t), Ng(t, u)) : (Pt(t), Bf(
          t,
          s,
          null,
          i,
          l
        ))) : u ? u !== e.memoizedState ? (Do(t), Pt(t), Ng(t, u)) : (Pt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Do(t), Pt(t), Bf(
          t,
          s,
          e,
          i,
          l
        )), null;
      case 27:
        if (pt(t), l = we.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Do(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          e = oe.current, Or(t) ? fp(t) : (e = Ib(s, i, l), t.stateNode = e, Do(t));
        }
        return Pt(t), null;
      case 5:
        if (pt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Do(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(a(166));
            return Pt(t), null;
          }
          if (u = oe.current, Or(t))
            fp(t);
          else {
            var p = bc(
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
            e: switch (In(u, s, i), s) {
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
            i && Do(t);
          }
        }
        return Pt(t), Bf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Do(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(a(166));
          if (e = we.current, Or(t)) {
            if (e = t.stateNode, l = t.memoizedProps, i = null, s = Ln, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            e[Ct] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || Mb(e.nodeValue, l)), e || ni(t, !0);
          } else
            e = bc(e).createTextNode(
              i
            ), e[Ct] = t, t.stateNode = e;
        }
        return Pt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Or(t), l !== null) {
            if (e === null) {
              if (!i) throw Error(a(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(557));
              e[Ct] = t;
            } else
              Xi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), e = !1;
          } else
            l = Zu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Rl(t), t) : (Rl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Pt(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = Or(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(a(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(a(317));
              s[Ct] = t;
            } else
              Xi(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), s = !1;
          } else
            s = Zu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Rl(t), t) : (Rl(t), null);
        }
        return Rl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = i !== null, e = e !== null && e.memoizedState !== null, l && (i = t.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), u = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (u = i.memoizedState.cachePool.pool), u !== s && (i.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), nc(t, t.updateQueue), Pt(t), null);
      case 4:
        return Te(), e === null && cd(t.stateNode.containerInfo), Pt(t), null;
      case 10:
        return Oo(t.type), Pt(t), null;
      case 19:
        if (K(un), i = t.memoizedState, i === null) return Pt(t), null;
        if (s = (t.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) Va(i, !1);
          else {
            if (ln !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Ys(e), u !== null) {
                  for (t.flags |= 128, Va(i, !1), e = u.updateQueue, t.updateQueue = e, nc(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    rp(l, e), l = l.sibling;
                  return ne(
                    un,
                    un.current & 1 | 2
                  ), yt && Mo(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Q() > ac && (t.flags |= 128, s = !0, Va(i, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Ys(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, nc(t, e), Va(i, !0), i.tail === null && i.tailMode === "hidden" && !u.alternate && !yt)
                return Pt(t), null;
            } else
              2 * Q() - i.renderingStartTime > ac && l !== 536870912 && (t.flags |= 128, s = !0, Va(i, !1), t.lanes = 4194304);
          i.isBackwards ? (u.sibling = t.child, t.child = u) : (e = i.last, e !== null ? e.sibling = u : t.child = u, i.last = u);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Q(), e.sibling = null, l = un.current, ne(
          un,
          s ? l & 1 | 2 : l & 1
        ), yt && Mo(t, i.treeForkCount), e) : (Pt(t), null);
      case 22:
      case 23:
        return Rl(t), uf(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pt(t), l = t.updateQueue, l !== null && nc(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== l && (t.flags |= 2048), e !== null && K(Qi), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Oo(gn), Pt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function nE(e, t) {
    switch (Fu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Oo(gn), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return pt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Rl(t), t.alternate === null)
            throw Error(a(340));
          Xi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Rl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(a(340));
          Xi();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return K(un), null;
      case 4:
        return Te(), null;
      case 10:
        return Oo(t.type), null;
      case 22:
      case 23:
        return Rl(t), uf(), e !== null && K(Qi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Oo(gn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function zg(e, t) {
    switch (Fu(t), t.tag) {
      case 3:
        Oo(gn), Te();
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
        t.memoizedState !== null && Rl(t);
        break;
      case 13:
        Rl(t);
        break;
      case 19:
        K(un);
        break;
      case 10:
        Oo(t.type);
        break;
      case 22:
      case 23:
        Rl(t), uf(), e !== null && K(Qi);
        break;
      case 24:
        Oo(gn);
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
  function ci(e, t, l) {
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
  function Dg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Rp(t, l);
      } catch (i) {
        jt(e, e.return, i);
      }
    }
  }
  function jg(e, t, l) {
    l.props = er(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (i) {
      jt(e, t, i);
    }
  }
  function Ia(e, t) {
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
  function po(e, t) {
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
  function Lg(e) {
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
  function Gf(e, t, l) {
    try {
      var i = e.stateNode;
      RE(i, e.type, l, t), i[Rt] = t;
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function Vg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && gi(e.type) || e.tag === 4;
  }
  function Yf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Vg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && gi(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function qf(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = $n));
    else if (i !== 4 && (i === 27 && gi(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (qf(e, t, l), e = e.sibling; e !== null; )
        qf(e, t, l), e = e.sibling;
  }
  function lc(e, t, l) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (i !== 4 && (i === 27 && gi(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (lc(e, t, l), e = e.sibling; e !== null; )
        lc(e, t, l), e = e.sibling;
  }
  function Hg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      In(t, i, l), t[Ct] = e, t[Rt] = l;
    } catch (u) {
      jt(e, e.return, u);
    }
  }
  var jo = !1, vn = !1, Pf = !1, Ig = typeof WeakSet == "function" ? WeakSet : Set, Tn = null;
  function lE(e, t) {
    if (e = e.containerInfo, dd = Rc, e = $m(e), Vu(e)) {
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
    for (hd = { focusedElem: e, selectionRange: l }, Rc = !1, Tn = t; Tn !== null; )
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
                  var Ve = er(
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
                  gd(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      gd(e);
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
  function Ug(e, t, l) {
    var i = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Vo(e, l), i & 4 && Ha(5, l);
        break;
      case 1:
        if (Vo(e, l), i & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              jt(l, l.return, p);
            }
          else {
            var s = er(
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
        i & 64 && Dg(l), i & 512 && Ia(l, l.return);
        break;
      case 3:
        if (Vo(e, l), i & 64 && (e = l.updateQueue, e !== null)) {
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
            Rp(e, t);
          } catch (p) {
            jt(l, l.return, p);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Hg(l);
      case 26:
      case 5:
        Vo(e, l), t === null && i & 4 && Lg(l), i & 512 && Ia(l, l.return);
        break;
      case 12:
        Vo(e, l);
        break;
      case 31:
        Vo(e, l), i & 4 && Yg(e, l);
        break;
      case 13:
        Vo(e, l), i & 4 && qg(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = dE.bind(
          null,
          l
        ), NE(e, l))));
        break;
      case 22:
        if (i = l.memoizedState !== null || jo, !i) {
          t = t !== null && t.memoizedState !== null || vn, s = jo;
          var u = vn;
          jo = i, (vn = t) && !u ? Ho(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : Vo(e, l), jo = s, vn = u;
        }
        break;
      case 30:
        break;
      default:
        Vo(e, l);
    }
  }
  function Bg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Bg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && co(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, cl = !1;
  function Lo(e, t, l) {
    for (l = l.child; l !== null; )
      Gg(e, t, l), l = l.sibling;
  }
  function Gg(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Nt, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        vn || po(l, t), Lo(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        vn || po(l, t);
        var i = Zt, s = cl;
        gi(l.type) && (Zt = l.stateNode, cl = !1), Lo(
          e,
          t,
          l
        ), Fa(l.stateNode), Zt = i, cl = s;
        break;
      case 5:
        vn || po(l, t);
      case 6:
        if (i = Zt, s = cl, Zt = null, Lo(
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
        Zt !== null && (cl ? (e = Zt, Db(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), $r(e)) : Db(Zt, l.stateNode));
        break;
      case 4:
        i = Zt, s = cl, Zt = l.stateNode.containerInfo, cl = !0, Lo(
          e,
          t,
          l
        ), Zt = i, cl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ci(2, l, t), vn || ci(4, l, t), Lo(
          e,
          t,
          l
        );
        break;
      case 1:
        vn || (po(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && jg(
          l,
          t,
          i
        )), Lo(
          e,
          t,
          l
        );
        break;
      case 21:
        Lo(
          e,
          t,
          l
        );
        break;
      case 22:
        vn = (i = vn) || l.memoizedState !== null, Lo(
          e,
          t,
          l
        ), vn = i;
        break;
      default:
        Lo(
          e,
          t,
          l
        );
    }
  }
  function Yg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        $r(e);
      } catch (l) {
        jt(t, t.return, l);
      }
    }
  }
  function qg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        $r(e);
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
        return t === null && (t = e.stateNode = new Ig()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ig()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function oc(e, t) {
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
              if (gi(E.type)) {
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
        Gg(u, p, s), Zt = null, cl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Pg(t, e), t = t.sibling;
  }
  var lo = null;
  function Pg(e, t) {
    var l = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(t, e), fl(e), i & 4 && (ci(3, e, e.return), Ha(3, e), ci(5, e, e.return));
        break;
      case 1:
        ul(t, e), fl(e), i & 512 && (vn || l === null || po(l, l.return)), i & 64 && jo && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? i : l.concat(i))));
        break;
      case 26:
        var s = lo;
        if (ul(t, e), fl(e), i & 512 && (vn || l === null || po(l, l.return)), i & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (i = e.memoizedState, l === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (i) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[$l] || u[Ct] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(i), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), In(u, i, l), u[Ct] = e, en(u), i = u;
                      break e;
                    case "link":
                      var p = Pb(
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
                      u = s.createElement(i), In(u, i, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (p = Pb(
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
                      u = s.createElement(i), In(u, i, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(a(468, i));
                  }
                  u[Ct] = e, en(u), i = u;
                }
                e.stateNode = i;
              } else
                Xb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = qb(
                s,
                i,
                e.memoizedProps
              );
          else
            u !== i ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, i === null ? Xb(
              s,
              e.type,
              e.stateNode
            ) : qb(
              s,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Gf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ul(t, e), fl(e), i & 512 && (vn || l === null || po(l, l.return)), l !== null && i & 4 && Gf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ul(t, e), fl(e), i & 512 && (vn || l === null || po(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Ll(s, "");
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        }
        i & 4 && e.stateNode != null && (s = e.memoizedProps, Gf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), i & 1024 && (Pf = !0);
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
        if (xc = null, s = lo, lo = yc(t.containerInfo), ul(t, e), lo = s, fl(e), i & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            $r(t.containerInfo);
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        Pf && (Pf = !1, Xg(e));
        break;
      case 4:
        i = lo, lo = yc(
          e.stateNode.containerInfo
        ), ul(t, e), fl(e), lo = i;
        break;
      case 12:
        ul(t, e), fl(e);
        break;
      case 31:
        ul(t, e), fl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, oc(e, i)));
        break;
      case 13:
        ul(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (rc = Q()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, oc(e, i)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var L = l !== null && l.memoizedState !== null, J = jo, ue = vn;
        if (jo = J || s, vn = ue || L, ul(t, e), vn = ue, jo = J, fl(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || L || jo || vn || tr(e)), l = null, t = e; ; ) {
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
                  s ? jb(ie, !0) : jb(L.stateNode, !1);
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
        i & 4 && (i = e.updateQueue, i !== null && (l = i.retryQueue, l !== null && (i.retryQueue = null, oc(e, l))));
        break;
      case 19:
        ul(t, e), fl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, oc(e, i)));
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
          if (Vg(i)) {
            l = i;
            break;
          }
          i = i.return;
        }
        if (l == null) throw Error(a(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = Yf(e);
            lc(e, u, s);
            break;
          case 5:
            var p = l.stateNode;
            l.flags & 32 && (Ll(p, ""), l.flags &= -33);
            var E = Yf(e);
            lc(e, E, p);
            break;
          case 3:
          case 4:
            var L = l.stateNode.containerInfo, J = Yf(e);
            qf(
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
  function Xg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Xg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Vo(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ug(e, t.alternate, t), t = t.sibling;
  }
  function tr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ci(4, t, t.return), tr(t);
          break;
        case 1:
          po(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && jg(
            t,
            t.return,
            l
          ), tr(t);
          break;
        case 27:
          Fa(t.stateNode);
        case 26:
        case 5:
          po(t, t.return), tr(t);
          break;
        case 22:
          t.memoizedState === null && tr(t);
          break;
        case 30:
          tr(t);
          break;
        default:
          tr(t);
      }
      e = e.sibling;
    }
  }
  function Ho(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, s = e, u = t, p = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ho(
            s,
            u,
            l
          ), Ha(4, u);
          break;
        case 1:
          if (Ho(
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
                  Cp(L[s], E);
            } catch (J) {
              jt(i, i.return, J);
            }
          }
          l && p & 64 && Dg(u), Ia(u, u.return);
          break;
        case 27:
          Hg(u);
        case 26:
        case 5:
          Ho(
            s,
            u,
            l
          ), l && i === null && p & 4 && Lg(u), Ia(u, u.return);
          break;
        case 12:
          Ho(
            s,
            u,
            l
          );
          break;
        case 31:
          Ho(
            s,
            u,
            l
          ), l && p & 4 && Yg(s, u);
          break;
        case 13:
          Ho(
            s,
            u,
            l
          ), l && p & 4 && qg(s, u);
          break;
        case 22:
          u.memoizedState === null && Ho(
            s,
            u,
            l
          ), Ia(u, u.return);
          break;
        case 30:
          break;
        default:
          Ho(
            s,
            u,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Xf(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && wa(l));
  }
  function Kf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wa(e));
  }
  function oo(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Kg(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function Kg(e, t, l, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        oo(
          e,
          t,
          l,
          i
        ), s & 2048 && Ha(9, t);
        break;
      case 1:
        oo(
          e,
          t,
          l,
          i
        );
        break;
      case 3:
        oo(
          e,
          t,
          l,
          i
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wa(e)));
        break;
      case 12:
        if (s & 2048) {
          oo(
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
          oo(
            e,
            t,
            l,
            i
          );
        break;
      case 31:
        oo(
          e,
          t,
          l,
          i
        );
        break;
      case 13:
        oo(
          e,
          t,
          l,
          i
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, p = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? oo(
          e,
          t,
          l,
          i
        ) : Ua(e, t) : u._visibility & 2 ? oo(
          e,
          t,
          l,
          i
        ) : (u._visibility |= 2, Ur(
          e,
          t,
          l,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Xf(p, t);
        break;
      case 24:
        oo(
          e,
          t,
          l,
          i
        ), s & 2048 && Kf(t.alternate, t);
        break;
      default:
        oo(
          e,
          t,
          l,
          i
        );
    }
  }
  function Ur(e, t, l, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, p = t, E = l, L = i, J = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Ur(
            u,
            p,
            E,
            L,
            s
          ), Ha(8, p);
          break;
        case 23:
          break;
        case 22:
          var ue = p.stateNode;
          p.memoizedState !== null ? ue._visibility & 2 ? Ur(
            u,
            p,
            E,
            L,
            s
          ) : Ua(
            u,
            p
          ) : (ue._visibility |= 2, Ur(
            u,
            p,
            E,
            L,
            s
          )), s && J & 2048 && Xf(
            p.alternate,
            p
          );
          break;
        case 24:
          Ur(
            u,
            p,
            E,
            L,
            s
          ), s && J & 2048 && Kf(p.alternate, p);
          break;
        default:
          Ur(
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
  function Ua(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, i = t, s = i.flags;
        switch (i.tag) {
          case 22:
            Ua(l, i), s & 2048 && Xf(
              i.alternate,
              i
            );
            break;
          case 24:
            Ua(l, i), s & 2048 && Kf(i.alternate, i);
            break;
          default:
            Ua(l, i);
        }
        t = t.sibling;
      }
  }
  var Ba = 8192;
  function Br(e, t, l) {
    if (e.subtreeFlags & Ba)
      for (e = e.child; e !== null; )
        Fg(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Fg(e, t, l) {
    switch (e.tag) {
      case 26:
        Br(
          e,
          t,
          l
        ), e.flags & Ba && e.memoizedState !== null && qE(
          l,
          lo,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Br(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var i = lo;
        lo = yc(e.stateNode.containerInfo), Br(
          e,
          t,
          l
        ), lo = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = Ba, Ba = 16777216, Br(
          e,
          t,
          l
        ), Ba = i) : Br(
          e,
          t,
          l
        ));
        break;
      default:
        Br(
          e,
          t,
          l
        );
    }
  }
  function Qg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ga(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          Tn = i, $g(
            i,
            e
          );
        }
      Qg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Zg(e), e = e.sibling;
  }
  function Zg(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ga(e), e.flags & 2048 && ci(9, e, e.return);
        break;
      case 3:
        Ga(e);
        break;
      case 12:
        Ga(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ic(e)) : Ga(e);
        break;
      default:
        Ga(e);
    }
  }
  function ic(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var i = t[l];
          Tn = i, $g(
            i,
            e
          );
        }
      Qg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ci(8, t, t.return), ic(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, ic(t));
          break;
        default:
          ic(t);
      }
      e = e.sibling;
    }
  }
  function $g(e, t) {
    for (; Tn !== null; ) {
      var l = Tn;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ci(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var i = l.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          wa(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, Tn = i;
      else
        e: for (l = e; Tn !== null; ) {
          i = Tn;
          var s = i.sibling, u = i.return;
          if (Bg(i), i === l) {
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
  }, rE = typeof WeakMap == "function" ? WeakMap : Map, kt = 0, Ut = null, ht = null, gt = 0, Dt = 0, wl = null, ui = !1, Gr = !1, Ff = !1, Io = 0, ln = 0, fi = 0, nr = 0, Qf = 0, _l = 0, Yr = 0, Ya = null, dl = null, Zf = !1, rc = 0, Jg = 0, ac = 1 / 0, sc = null, di = null, En = 0, hi = null, qr = null, Uo = 0, $f = 0, Jf = null, Wg = null, qa = 0, Wf = null;
  function Al() {
    return (kt & 2) !== 0 && gt !== 0 ? gt & -gt : V.T !== null ? id() : ll();
  }
  function eb() {
    if (_l === 0)
      if ((gt & 536870912) === 0 || yt) {
        var e = Wt;
        Wt <<= 1, (Wt & 3932160) === 0 && (Wt = 262144), _l = e;
      } else _l = 536870912;
    return e = Cl.current, e !== null && (e.flags |= 32), _l;
  }
  function hl(e, t, l) {
    (e === Ut && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null) && (Pr(e, 0), mi(
      e,
      gt,
      _l,
      !1
    )), nl(e, l), ((kt & 2) === 0 || e !== Ut) && (e === Ut && ((kt & 2) === 0 && (nr |= l), ln === 4 && mi(
      e,
      gt,
      _l,
      !1
    )), go(e));
  }
  function tb(e, t, l) {
    if ((kt & 6) !== 0) throw Error(a(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Qt(e, t), s = i ? cE(e, t) : td(e, t, !0), u = i;
    do {
      if (s === 0) {
        Gr && !i && mi(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !aE(l)) {
          s = td(e, t, !1), u = !1;
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
              s = Ya;
              var L = E.current.memoizedState.isDehydrated;
              if (L && (Pr(E, p).flags |= 256), p = td(
                E,
                p,
                !1
              ), p !== 2) {
                if (Ff && !L) {
                  E.errorRecoveryDisabledLanes |= u, nr |= u, s = 4;
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
          Pr(e, 0), mi(e, t, 0, !0);
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
                _l,
                !ui
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
          if ((t & 62914560) === t && (s = rc + 300 - Q(), 10 < s)) {
            if (mi(
              i,
              t,
              _l,
              !ui
            ), Ke(i, 0, !0) !== 0) break e;
            Uo = t, i.timeoutHandle = Nb(
              nb.bind(
                null,
                i,
                l,
                dl,
                sc,
                Zf,
                t,
                _l,
                nr,
                Yr,
                ui,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          nb(
            i,
            l,
            dl,
            sc,
            Zf,
            t,
            _l,
            nr,
            Yr,
            ui,
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
  function nb(e, t, l, i, s, u, p, E, L, J, ue, me, W, ie) {
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
      }, Fg(
        t,
        u,
        me
      );
      var Ve = (u & 62914560) === u ? rc - Q() : (u & 4194048) === u ? Jg - Q() : 0;
      if (Ve = PE(
        me,
        Ve
      ), Ve !== null) {
        Uo = u, e.cancelPendingCommit = Ve(
          ub.bind(
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
        ), mi(e, u, p, !J);
        return;
      }
    }
    ub(
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
            if (!Sl(u(), s)) return !1;
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
    t &= ~Qf, t &= ~nr, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - st(s), p = 1 << u;
      i[u] = -1, s &= ~p;
    }
    l !== 0 && ao(e, l, t);
  }
  function cc() {
    return (kt & 6) === 0 ? (Pa(0), !1) : !0;
  }
  function ed() {
    if (ht !== null) {
      if (Dt === 0)
        var e = ht.return;
      else
        e = ht, To = Ki = null, gf(e), jr = null, Aa = 0, e = ht;
      for (; e !== null; )
        zg(e.alternate, e), e = e.return;
      ht = null;
    }
  }
  function Pr(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, AE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Uo = 0, ed(), Ut = e, ht = l = Ao(e.current, null), gt = t, Dt = 0, wl = null, ui = !1, Gr = Qt(e, t), Ff = !1, Yr = _l = Qf = nr = fi = ln = 0, dl = Ya = null, Zf = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - st(i), u = 1 << s;
        t |= e[s], i &= ~u;
      }
    return Io = t, Os(), l;
  }
  function lb(e, t) {
    rt = null, V.H = ja, t === Dr || t === Hs ? (t = vp(), Dt = 3) : t === lf ? (t = vp(), Dt = 4) : Dt = t === Nf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, wl = t, ht === null && (ln = 1, Js(
      e,
      Hl(t, e.current)
    ));
  }
  function ob() {
    var e = Cl.current;
    return e === null ? !0 : (gt & 4194048) === gt ? Gl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? e === Gl : !1;
  }
  function ib() {
    var e = V.H;
    return V.H = ja, e === null ? ja : e;
  }
  function rb() {
    var e = V.A;
    return V.A = iE, e;
  }
  function uc() {
    ln = 4, ui || (gt & 4194048) !== gt && Cl.current !== null || (Gr = !0), (fi & 134217727) === 0 && (nr & 134217727) === 0 || Ut === null || mi(
      Ut,
      gt,
      _l,
      !1
    );
  }
  function td(e, t, l) {
    var i = kt;
    kt |= 2;
    var s = ib(), u = rb();
    (Ut !== e || gt !== t) && (sc = null, Pr(e, t)), t = !1;
    var p = ln;
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          var E = ht, L = wl;
          switch (Dt) {
            case 8:
              ed(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Cl.current === null && (t = !0);
              var J = Dt;
              if (Dt = 0, wl = null, Xr(e, E, L, J), l && Gr) {
                p = 0;
                break e;
              }
              break;
            default:
              J = Dt, Dt = 0, wl = null, Xr(e, E, L, J);
          }
        }
        sE(), p = ln;
        break;
      } catch (ue) {
        lb(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, To = Ki = null, kt = i, V.H = s, V.A = u, ht === null && (Ut = null, gt = 0, Os()), p;
  }
  function sE() {
    for (; ht !== null; ) ab(ht);
  }
  function cE(e, t) {
    var l = kt;
    kt |= 2;
    var i = ib(), s = rb();
    Ut !== e || gt !== t ? (sc = null, ac = Q() + 500, Pr(e, t)) : Gr = Qt(
      e,
      t
    );
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          t = ht;
          var u = wl;
          t: switch (Dt) {
            case 1:
              Dt = 0, wl = null, Xr(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (bp(u)) {
                Dt = 0, wl = null, sb(t);
                break;
              }
              t = function() {
                Dt !== 2 && Dt !== 9 || Ut !== e || (Dt = 7), go(e);
              }, u.then(t, t);
              break e;
            case 3:
              Dt = 7;
              break e;
            case 4:
              Dt = 5;
              break e;
            case 7:
              bp(u) ? (Dt = 0, wl = null, sb(t)) : (Dt = 0, wl = null, Xr(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (ht.tag) {
                case 26:
                  p = ht.memoizedState;
                case 5:
                case 27:
                  var E = ht;
                  if (p ? Kb(p) : E.stateNode.complete) {
                    Dt = 0, wl = null;
                    var L = E.sibling;
                    if (L !== null) ht = L;
                    else {
                      var J = E.return;
                      J !== null ? (ht = J, fc(J)) : ht = null;
                    }
                    break t;
                  }
              }
              Dt = 0, wl = null, Xr(e, t, u, 5);
              break;
            case 6:
              Dt = 0, wl = null, Xr(e, t, u, 6);
              break;
            case 8:
              ed(), ln = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        uE();
        break;
      } catch (ue) {
        lb(e, ue);
      }
    while (!0);
    return To = Ki = null, V.H = i, V.A = s, kt = l, ht !== null ? 0 : (Ut = null, gt = 0, Os(), ln);
  }
  function uE() {
    for (; ht !== null && !Xe(); )
      ab(ht);
  }
  function ab(e) {
    var t = kg(e.alternate, e, Io);
    e.memoizedProps = e.pendingProps, t === null ? fc(e) : ht = t;
  }
  function sb(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = wg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          gt
        );
        break;
      case 11:
        t = wg(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          gt
        );
        break;
      case 5:
        gf(t);
      default:
        zg(l, t), t = ht = rp(t, Io), t = kg(l, t, Io);
    }
    e.memoizedProps = e.pendingProps, t === null ? fc(e) : ht = t;
  }
  function Xr(e, t, l, i) {
    To = Ki = null, gf(t), jr = null, Aa = 0;
    var s = t.return;
    try {
      if (JS(
        e,
        s,
        t,
        l,
        gt
      )) {
        ln = 1, Js(
          e,
          Hl(l, e.current)
        ), ht = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw ht = s, u;
      ln = 1, Js(
        e,
        Hl(l, e.current)
      ), ht = null;
      return;
    }
    t.flags & 32768 ? (yt || i === 1 ? e = !0 : Gr || (gt & 536870912) !== 0 ? e = !1 : (ui = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Cl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), cb(t, e)) : fc(t);
  }
  function fc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        cb(
          t,
          ui
        );
        return;
      }
      e = t.return;
      var l = tE(
        t.alternate,
        t,
        Io
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
  function cb(e, t) {
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
  function ub(e, t, l, i, s, u, p, E, L) {
    e.cancelPendingCommit = null;
    do
      dc();
    while (En !== 0);
    if ((kt & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (u = t.lanes | t.childLanes, u |= Gu, zt(
        e,
        l,
        u,
        p,
        E,
        L
      ), e === Ut && (ht = Ut = null, gt = 0), qr = t, hi = e, Uo = l, $f = u, Jf = s, Wg = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, mE(Ge, function() {
        return pb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null, s = I.p, I.p = 2, p = kt, kt |= 4;
        try {
          lE(e, t, l);
        } finally {
          kt = p, I.p = s, V.T = i;
        }
      }
      En = 1, fb(), db(), hb();
    }
  }
  function fb() {
    if (En === 1) {
      En = 0;
      var e = hi, t = qr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var i = I.p;
        I.p = 2;
        var s = kt;
        kt |= 4;
        try {
          Pg(t, e);
          var u = hd, p = $m(e.containerInfo), E = u.focusedElem, L = u.selectionRange;
          if (p !== E && E && E.ownerDocument && Zm(
            E.ownerDocument.documentElement,
            E
          )) {
            if (L !== null && Vu(E)) {
              var J = L.start, ue = L.end;
              if (ue === void 0 && (ue = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, W = me && me.defaultView || window;
                if (W.getSelection) {
                  var ie = W.getSelection(), Ve = E.textContent.length, $e = Math.min(L.start, Ve), Ht = L.end === void 0 ? $e : Math.min(L.end, Ve);
                  !ie.extend && $e > Ht && (p = Ht, Ht = $e, $e = p);
                  var X = Qm(
                    E,
                    $e
                  ), G = Qm(
                    E,
                    Ht
                  );
                  if (X && G && (ie.rangeCount !== 1 || ie.anchorNode !== X.node || ie.anchorOffset !== X.offset || ie.focusNode !== G.node || ie.focusOffset !== G.offset)) {
                    var $ = me.createRange();
                    $.setStart(X.node, X.offset), ie.removeAllRanges(), $e > Ht ? (ie.addRange($), ie.extend(G.node, G.offset)) : ($.setEnd(G.node, G.offset), ie.addRange($));
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
          Rc = !!dd, hd = dd = null;
        } finally {
          kt = s, I.p = i, V.T = l;
        }
      }
      e.current = t, En = 2;
    }
  }
  function db() {
    if (En === 2) {
      En = 0;
      var e = hi, t = qr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var i = I.p;
        I.p = 2;
        var s = kt;
        kt |= 4;
        try {
          Ug(e, t.alternate, t);
        } finally {
          kt = s, I.p = i, V.T = l;
        }
      }
      En = 3;
    }
  }
  function hb() {
    if (En === 4 || En === 3) {
      En = 0, ye();
      var e = hi, t = qr, l = Uo, i = Wg;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? En = 5 : (En = 0, qr = hi = null, mb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (di = null), Dl(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Nt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = V.T, s = I.p, I.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, p = 0; p < i.length; p++) {
            var E = i[p];
            u(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          V.T = t, I.p = s;
        }
      }
      (Uo & 3) !== 0 && dc(), go(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === Wf ? qa++ : (qa = 0, Wf = e) : qa = 0, Pa(0);
    }
  }
  function mb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, wa(t)));
  }
  function dc() {
    return fb(), db(), hb(), pb();
  }
  function pb() {
    if (En !== 5) return !1;
    var e = hi, t = $f;
    $f = 0;
    var l = Dl(Uo), i = V.T, s = I.p;
    try {
      I.p = 32 > l ? 32 : l, V.T = null, l = Jf, Jf = null;
      var u = hi, p = Uo;
      if (En = 0, qr = hi = null, Uo = 0, (kt & 6) !== 0) throw Error(a(331));
      var E = kt;
      if (kt |= 4, Zg(u.current), Kg(
        u,
        u.current,
        p,
        l
      ), kt = E, Pa(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Nt, u);
        } catch {
        }
      return !0;
    } finally {
      I.p = s, V.T = i, mb(e, t);
    }
  }
  function gb(e, t, l) {
    t = Hl(l, t), t = kf(e.stateNode, t, 2), e = ri(e, t, 2), e !== null && (nl(e, 2), go(e));
  }
  function jt(e, t, l) {
    if (e.tag === 3)
      gb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          gb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (di === null || !di.has(i))) {
            e = Hl(l, e), l = bg(2), i = ri(t, l, 2), i !== null && (yg(
              l,
              i,
              t,
              e
            ), nl(i, 2), go(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function nd(e, t, l) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new rE();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(l) || (Ff = !0, s.add(l), e = fE.bind(null, e, t, l), t.then(e, e));
  }
  function fE(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (gt & l) === l && (ln === 4 || ln === 3 && (gt & 62914560) === gt && 300 > Q() - rc ? (kt & 2) === 0 && Pr(e, 0) : Qf |= l, Yr === gt && (Yr = 0)), go(e);
  }
  function bb(e, t) {
    t === 0 && (t = _n()), e = qi(e, t), e !== null && (nl(e, t), go(e));
  }
  function dE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), bb(e, l);
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
    i !== null && i.delete(t), bb(e, l);
  }
  function mE(e, t) {
    return Je(e, t);
  }
  var hc = null, Kr = null, ld = !1, mc = !1, od = !1, pi = 0;
  function go(e) {
    e !== Kr && e.next === null && (Kr === null ? hc = Kr = e : Kr = Kr.next = e), mc = !0, ld || (ld = !0, gE());
  }
  function Pa(e, t) {
    if (!od && mc) {
      od = !0;
      do
        for (var l = !1, i = hc; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var p = i.suspendedLanes, E = i.pingedLanes;
              u = (1 << 31 - st(42 | e) + 1) - 1, u &= s & ~(p & ~E), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Sb(i, u));
          } else
            u = gt, u = Ke(
              i,
              i === Ut ? u : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (u & 3) === 0 || Qt(i, u) || (l = !0, Sb(i, u));
          i = i.next;
        }
      while (l);
      od = !1;
    }
  }
  function pE() {
    yb();
  }
  function yb() {
    mc = ld = !1;
    var e = 0;
    pi !== 0 && _E() && (e = pi);
    for (var t = Q(), l = null, i = hc; i !== null; ) {
      var s = i.next, u = vb(i, t);
      u === 0 ? (i.next = null, l === null ? hc = s : l.next = s, s === null && (Kr = l)) : (l = i, (e !== 0 || (u & 3) !== 0) && (mc = !0)), i = s;
    }
    En !== 0 && En !== 5 || Pa(e), pi !== 0 && (pi = 0);
  }
  function vb(e, t) {
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
      switch (i !== null && tt(i), Dl(l)) {
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
      return i = xb.bind(null, e), l = Je(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && tt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function xb(e, t) {
    if (En !== 0 && En !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (dc() && e.callbackNode !== l)
      return null;
    var i = gt;
    return i = Ke(
      e,
      e === Ut ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (tb(e, i, t), vb(e, Q()), e.callbackNode != null && e.callbackNode === l ? xb.bind(null, e) : null);
  }
  function Sb(e, t) {
    if (dc()) return null;
    tb(e, t, !0);
  }
  function gE() {
    ME(function() {
      (kt & 6) !== 0 ? Je(
        Ie,
        pE
      ) : yb();
    });
  }
  function id() {
    if (pi === 0) {
      var e = Nr;
      e === 0 && (e = Ft, Ft <<= 1, (Ft & 261888) === 0 && (Ft = 256)), pi = e;
    }
    return pi;
  }
  function Eb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : to("" + e);
  }
  function Cb(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function bE(e, t, l, i, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Eb(
        (s[Rt] || null).action
      ), p = i.submitter;
      p && (t = (t = p[Rt] || null) ? Eb(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
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
                if (pi !== 0) {
                  var L = p ? Cb(s, p) : new FormData(s);
                  wf(
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
                typeof u == "function" && (E.preventDefault(), L = p ? Cb(s, p) : new FormData(s), wf(
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
  for (var rd = 0; rd < Bu.length; rd++) {
    var ad = Bu[rd], yE = ad.toLowerCase(), vE = ad[0].toUpperCase() + ad.slice(1);
    no(
      yE,
      "on" + vE
    );
  }
  no(ep, "onAnimationEnd"), no(tp, "onAnimationIteration"), no(np, "onAnimationStart"), no("dblclick", "onDoubleClick"), no("focusin", "onFocus"), no("focusout", "onBlur"), no(jS, "onTransitionRun"), no(LS, "onTransitionStart"), no(VS, "onTransitionCancel"), no(lp, "onTransitionEnd"), yl("onMouseEnter", ["mouseout", "mouseover"]), yl("onMouseLeave", ["mouseout", "mouseover"]), yl("onPointerEnter", ["pointerout", "pointerover"]), yl("onPointerLeave", ["pointerout", "pointerover"]), Jl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Jl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Jl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Jl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Jl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Jl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Xa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xa)
  );
  function Rb(e, t) {
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
              Ts(ue);
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
              Ts(ue);
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
    l.has(i) || (wb(t, e, 2, !1), l.add(i));
  }
  function sd(e, t, l) {
    var i = 0;
    t && (i |= 4), wb(
      l,
      e,
      i,
      t
    );
  }
  var pc = "_reactListening" + Math.random().toString(36).slice(2);
  function cd(e) {
    if (!e[pc]) {
      e[pc] = !0, mn.forEach(function(l) {
        l !== "selectionchange" && (xE.has(l) || sd(l, !1, e), sd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[pc] || (t[pc] = !0, sd("selectionchange", !1, t));
    }
  }
  function wb(e, t, l, i) {
    switch (ey(t)) {
      case 2:
        var s = FE;
        break;
      case 8:
        s = QE;
        break;
      default:
        s = Rd;
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
  function ud(e, t, l, i, s) {
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
      var J = u, ue = k(l), me = [];
      e: {
        var W = op.get(e);
        if (W !== void 0) {
          var ie = Sn, Ve = e;
          switch (e) {
            case "keypress":
              if (It(l) === 0) break e;
            case "keydown":
            case "keyup":
              ie = hS;
              break;
            case "focusin":
              Ve = "focus", ie = Nu;
              break;
            case "focusout":
              Ve = "blur", ie = Nu;
              break;
            case "beforeblur":
            case "afterblur":
              ie = Nu;
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
              ie = ba;
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
            case ep:
            case tp:
            case np:
              ie = oS;
              break;
            case lp:
              ie = yS;
              break;
            case "scroll":
            case "scrollend":
              ie = uo;
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
              ie = jm;
              break;
            case "toggle":
            case "beforetoggle":
              ie = ES;
          }
          var $e = (t & 4) !== 0, Ht = !$e && (e === "scroll" || e === "scrollend"), X = $e ? W !== null ? W + "Capture" : null : W;
          $e = [];
          for (var G = J, $; G !== null; ) {
            var de = G;
            if ($ = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || $ === null || X === null || (de = Y(G, X), de != null && $e.push(
              Ka(G, de, $)
            )), Ht) break;
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
          if ((ie || W) && (W = ue.window === ue ? ue : (W = ue.ownerDocument) ? W.defaultView || W.parentWindow : window, ie ? (Ve = l.relatedTarget || l.toElement, ie = J, Ve = Ve ? Yn(Ve) : null, Ve !== null && (Ht = f(Ve), $e = Ve.tag, Ve !== Ht || $e !== 5 && $e !== 27 && $e !== 6) && (Ve = null)) : (ie = null, Ve = J), ie !== Ve)) {
            if ($e = ba, de = "onMouseLeave", X = "onMouseEnter", G = "mouse", (e === "pointerout" || e === "pointerover") && ($e = jm, de = "onPointerLeave", X = "onPointerEnter", G = "pointer"), Ht = ie == null ? W : ol(ie), $ = Ve == null ? W : ol(Ve), W = new $e(
              de,
              G + "leave",
              ie,
              l,
              ue
            ), W.target = Ht, W.relatedTarget = $, de = null, Yn(ue) === J && ($e = new $e(
              X,
              G + "enter",
              Ve,
              l,
              ue
            ), $e.target = $, $e.relatedTarget = Ht, de = $e), Ht = de, ie && Ve)
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
            ie !== null && _b(
              me,
              W,
              ie,
              $e,
              !1
            ), Ve !== null && Ht !== null && _b(
              me,
              Ht,
              Ve,
              $e,
              !0
            );
          }
        }
        e: {
          if (W = J ? ol(J) : window, ie = W.nodeName && W.nodeName.toLowerCase(), ie === "select" || ie === "input" && W.type === "file")
            var _t = Ym;
          else if (Bm(W))
            if (qm)
              _t = NS;
            else {
              _t = OS;
              var Be = TS;
            }
          else
            ie = W.nodeName, !ie || ie.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && sl(J.elementType) && (_t = Ym) : _t = kS;
          if (_t && (_t = _t(e, J))) {
            Gm(
              me,
              _t,
              l,
              ue
            );
            break e;
          }
          Be && Be(e, W, J), e === "focusout" && J && W.type === "number" && J.memoizedProps.value != null && Jo(W, "number", W.value);
        }
        switch (Be = J ? ol(J) : window, e) {
          case "focusin":
            (Bm(Be) || Be.contentEditable === "true") && (Rr = Be, Hu = J, Ea = null);
            break;
          case "focusout":
            Ea = Hu = Rr = null;
            break;
          case "mousedown":
            Iu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Iu = !1, Jm(me, l, ue);
            break;
          case "selectionchange":
            if (DS) break;
          case "keydown":
          case "keyup":
            Jm(me, l, ue);
        }
        var ct;
        if (Du)
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
          Cr ? Im(e, l) && (bt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (bt = "onCompositionStart");
        bt && (Lm && l.locale !== "ko" && (Cr || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && Cr && (ct = wt()) : (He = ue, ke = "value" in He ? He.value : He.textContent, Cr = !0)), Be = gc(J, bt), 0 < Be.length && (bt = new Dm(
          bt,
          e,
          null,
          l,
          ue
        ), me.push({ event: bt, listeners: Be }), ct ? bt.data = ct : (ct = Um(l), ct !== null && (bt.data = ct)))), (ct = RS ? wS(e, l) : _S(e, l)) && (bt = gc(J, "onBeforeInput"), 0 < bt.length && (Be = new Dm(
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
      Rb(me, t);
    });
  }
  function Ka(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function gc(e, t) {
    for (var l = t + "Capture", i = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Y(e, l), s != null && i.unshift(
        Ka(e, s, u)
      ), s = Y(e, t), s != null && i.push(
        Ka(e, s, u)
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
  function _b(e, t, l, i, s) {
    for (var u = t._reactName, p = []; l !== null && l !== i; ) {
      var E = l, L = E.alternate, J = E.stateNode;
      if (E = E.tag, L !== null && L === i) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (L = J, s ? (J = Y(l, u), J != null && p.unshift(
        Ka(l, J, L)
      )) : s || (J = Y(l, u), J != null && p.push(
        Ka(l, J, L)
      ))), l = l.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var EE = /\r\n?/g, CE = /\u0000|\uFFFD/g;
  function Ab(e) {
    return (typeof e == "string" ? e : "" + e).replace(EE, `
`).replace(CE, "");
  }
  function Mb(e, t) {
    return t = Ab(t), Ab(e) === t;
  }
  function Vt(e, t, l, i, s, u) {
    switch (l) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || Ll(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && Ll(e, "" + i);
        break;
      case "className":
        $o(e, "class", i);
        break;
      case "tabIndex":
        $o(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        $o(e, l, i);
        break;
      case "style":
        cn(e, i, u);
        break;
      case "data":
        if (t !== "object") {
          $o(e, "data", i);
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
        i = to("" + i), e.setAttribute(l, i);
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
        i = to("" + i), e.setAttribute(l, i);
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
        l = to("" + i), e.setAttributeNS(
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
        mt("beforetoggle", e), mt("toggle", e), Wl(e, "popover", i);
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
        Wl(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = eo.get(l) || l, Wl(e, l, i));
    }
  }
  function fd(e, t, l, i, s, u) {
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
        typeof i == "string" ? Ll(e, i) : (typeof i == "number" || typeof i == "bigint") && Ll(e, "" + i);
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
        if (!An.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof i == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, i, s);
              break e;
            }
            l in e ? e[l] = i : i === !0 ? e.setAttribute(l, "") : Wl(e, l, i);
          }
    }
  }
  function In(e, t, l) {
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
        Er(
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
        t = u, l = p, e.multiple = !!i, t != null ? vl(e, !!i, t, !1) : l != null && vl(e, !!i, l, !0);
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
        wo(e, i, s, u);
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
        for (i = 0; i < Xa.length; i++)
          mt(Xa[i], e);
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
            l.hasOwnProperty(ue) && (i = l[ue], i !== void 0 && fd(
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
        Ii(
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
        t = E, l = p, i = ie, W != null ? vl(e, !!l, W, !1) : !!i != !!l && (t != null ? vl(e, !!l, t, !0) : vl(e, !!l, l ? [] : "", !1));
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
        Ui(e, W, ie);
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
          for (var Ht in l)
            W = l[Ht], l.hasOwnProperty(Ht) && W !== void 0 && !i.hasOwnProperty(Ht) && fd(
              e,
              t,
              Ht,
              void 0,
              i,
              W
            );
          for (ue in i)
            W = i[ue], ie = l[ue], !i.hasOwnProperty(ue) || W === ie || W === void 0 && ie === void 0 || fd(
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
  function Tb(e) {
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
        if (u && E && Tb(p)) {
          for (p = 0, E = s.responseEnd, i += 1; i < l.length; i++) {
            var L = l[i], J = L.startTime;
            if (J > E) break;
            var ue = L.transferSize, me = L.initiatorType;
            ue && Tb(me) && (L = L.responseEnd, p += ue * (L < E ? 1 : (E - J) / (L - J)));
          }
          if (--i, t += 8 * (u + p) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var dd = null, hd = null;
  function bc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Ob(e) {
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
  function md(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var pd = null;
  function _E() {
    var e = window.event;
    return e && e.type === "popstate" ? e === pd ? !1 : (pd = e, !0) : (pd = null, !1);
  }
  var Nb = typeof setTimeout == "function" ? setTimeout : void 0, AE = typeof clearTimeout == "function" ? clearTimeout : void 0, zb = typeof Promise == "function" ? Promise : void 0, ME = typeof queueMicrotask == "function" ? queueMicrotask : typeof zb < "u" ? function(e) {
    return zb.resolve(null).then(e).catch(TE);
  } : Nb;
  function TE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function gi(e) {
    return e === "head";
  }
  function Db(e, t) {
    var l = t, i = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (i === 0) {
            e.removeChild(s), $r(t);
            return;
          }
          i--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          i++;
        else if (l === "html")
          Fa(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Fa(l);
          for (var u = l.firstChild; u; ) {
            var p = u.nextSibling, E = u.nodeName;
            u[$l] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = p;
          }
        } else
          l === "body" && Fa(e.ownerDocument.body);
      l = s;
    } while (l);
    $r(t);
  }
  function jb(e, t) {
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
  function gd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gd(l), co(l);
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
        if (!e[$l])
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
  function kE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function Lb(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function bd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function yd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function NE(e, t) {
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
  var vd = null;
  function Vb(e) {
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
  function Ib(e, t, l) {
    switch (t = bc(l), e) {
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
  function Fa(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    co(e);
  }
  var ql = /* @__PURE__ */ new Map(), Ub = /* @__PURE__ */ new Set();
  function yc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Bo = I.d;
  I.d = {
    f: zE,
    r: DE,
    D: jE,
    C: LE,
    L: VE,
    m: HE,
    X: UE,
    S: IE,
    M: BE
  };
  function zE() {
    var e = Bo.f(), t = cc();
    return e || t;
  }
  function DE(e) {
    var t = jl(e);
    t !== null && t.tag === 5 && t.type === "form" ? lg(t) : Bo.r(e);
  }
  var Fr = typeof document > "u" ? null : document;
  function Bb(e, t, l) {
    var i = Fr;
    if (i && typeof t == "string" && t) {
      var s = Mn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Ub.has(s) || (Ub.add(s), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), In(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function jE(e) {
    Bo.D(e), Bb("dns-prefetch", e, null);
  }
  function LE(e, t) {
    Bo.C(e, t), Bb("preconnect", e, t);
  }
  function VE(e, t, l) {
    Bo.L(e, t, l);
    var i = Fr;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + Mn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + Mn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + Mn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + Mn(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Qr(e);
          break;
        case "script":
          u = Zr(e);
      }
      ql.has(u) || (e = v(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), ql.set(u, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Qa(u)) || t === "script" && i.querySelector(Za(u)) || (t = i.createElement("link"), In(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function HE(e, t) {
    Bo.m(e, t);
    var l = Fr;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Mn(i) + '"][href="' + Mn(e) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Zr(e);
      }
      if (!ql.has(u) && (e = v({ rel: "modulepreload", href: e }, t), ql.set(u, e), l.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Za(u)))
              return;
        }
        i = l.createElement("link"), In(i, "link", e), en(i), l.head.appendChild(i);
      }
    }
  }
  function IE(e, t, l) {
    Bo.S(e, t, l);
    var i = Fr;
    if (i && e) {
      var s = il(i).hoistableStyles, u = Qr(e);
      t = t || "default";
      var p = s.get(u);
      if (!p) {
        var E = { loading: 0, preload: null };
        if (p = i.querySelector(
          Qa(u)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = ql.get(u)) && xd(e, l);
          var L = p = i.createElement("link");
          en(L), In(L, "link", e), L._p = new Promise(function(J, ue) {
            L.onload = J, L.onerror = ue;
          }), L.addEventListener("load", function() {
            E.loading |= 1;
          }), L.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, vc(p, t, i);
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
    Bo.X(e, t);
    var l = Fr;
    if (l && e) {
      var i = il(l).hoistableScripts, s = Zr(e), u = i.get(s);
      u || (u = l.querySelector(Za(s)), u || (e = v({ src: e, async: !0 }, t), (t = ql.get(s)) && Sd(e, t), u = l.createElement("script"), en(u), In(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function BE(e, t) {
    Bo.M(e, t);
    var l = Fr;
    if (l && e) {
      var i = il(l).hoistableScripts, s = Zr(e), u = i.get(s);
      u || (u = l.querySelector(Za(s)), u || (e = v({ src: e, async: !0, type: "module" }, t), (t = ql.get(s)) && Sd(e, t), u = l.createElement("script"), en(u), In(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function Gb(e, t, l, i) {
    var s = (s = we.current) ? yc(s) : null;
    if (!s) throw Error(a(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Qr(l.href), l = il(
          s
        ).hoistableStyles, i = l.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Qr(l.href);
          var u = il(
            s
          ).hoistableStyles, p = u.get(e);
          if (p || (s = s.ownerDocument || s, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, p), (u = s.querySelector(
            Qa(e)
          )) && !u._p && (p.instance = u, p.state.loading = 5), ql.has(e) || (l = {
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
            p.state
          ))), t && i === null)
            throw Error(a(528, ""));
          return p;
        }
        if (t && i !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Zr(l), l = il(
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
  function Qr(e) {
    return 'href="' + Mn(e) + '"';
  }
  function Qa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Yb(e) {
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
    }), In(t, "link", l), en(t), e.head.appendChild(t));
  }
  function Zr(e) {
    return '[src="' + Mn(e) + '"]';
  }
  function Za(e) {
    return "script[async]" + e;
  }
  function qb(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Mn(l.href) + '"]'
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
          ), en(i), In(i, "style", s), vc(i, l.precedence, e), t.instance = i;
        case "stylesheet":
          s = Qr(l.href);
          var u = e.querySelector(
            Qa(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, en(u), u;
          i = Yb(l), (s = ql.get(s)) && xd(i, s), u = (e.ownerDocument || e).createElement("link"), en(u);
          var p = u;
          return p._p = new Promise(function(E, L) {
            p.onload = E, p.onerror = L;
          }), In(u, "link", i), t.state.loading |= 4, vc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Zr(l.src), (s = e.querySelector(
            Za(u)
          )) ? (t.instance = s, en(s), s) : (i = l, (s = ql.get(u)) && (i = v({}, l), Sd(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), en(s), In(s, "link", i), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(a(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, vc(i, l.precedence, e));
    return t.instance;
  }
  function vc(e, t, l) {
    for (var i = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, u = s, p = 0; p < i.length; p++) {
      var E = i[p];
      if (E.dataset.precedence === t) u = E;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function xd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Sd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var xc = null;
  function Pb(e, t, l) {
    if (xc === null) {
      var i = /* @__PURE__ */ new Map(), s = xc = /* @__PURE__ */ new Map();
      s.set(l, i);
    } else
      s = xc, i = s.get(l), i || (i = /* @__PURE__ */ new Map(), s.set(l, i));
    if (i.has(e)) return i;
    for (i.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[$l] || u[Ct] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = u.getAttribute(t) || "";
        p = e + p;
        var E = i.get(p);
        E ? E.push(u) : i.set(p, [u]);
      }
    }
    return i;
  }
  function Xb(e, t, l) {
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
  function Kb(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function qE(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = Qr(i.href), u = t.querySelector(
          Qa(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Sc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, en(u);
          return;
        }
        u = t.ownerDocument || t, i = Yb(i), (s = ql.get(s)) && xd(i, s), u = u.createElement("link"), en(u);
        var p = u;
        p._p = new Promise(function(E, L) {
          p.onload = E, p.onerror = L;
        }), In(u, "link", i), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Sc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Ed = 0;
  function PE(e, t) {
    return e.stylesheets && e.count === 0 && Cc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && Cc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ed === 0 && (Ed = 62500 * wE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Cc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Ed ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function Sc() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Cc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ec = null;
  function Cc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ec = /* @__PURE__ */ new Map(), t.forEach(XE, e), Ec = null, Sc.call(e));
  }
  function XE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Ec.get(e);
      if (l) var i = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Ec.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var p = s[u];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (l.set(p.dataset.precedence, p), i = p);
        }
        i && l.set(null, i);
      }
      s = t.instance, p = s.getAttribute("data-precedence"), u = l.get(p) || i, u === i && l.set(null, s), l.set(p, s), this.count++, i = Sc.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var $a = {
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
  function Fb(e, t, l, i, s, u, p, E, L, J, ue, me) {
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
    ), t = 1, u === !0 && (t |= 24), u = El(3, null, null, t), e.current = u, u.stateNode = e, t = ef(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: i,
      isDehydrated: l,
      cache: t
    }, of(u), e;
  }
  function Qb(e) {
    return e ? (e = Ar, e) : Ar;
  }
  function Zb(e, t, l, i, s, u) {
    s = Qb(s), i.context === null ? i.context = s : i.pendingContext = s, i = ii(t), i.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (i.callback = u), l = ri(e, i, t), l !== null && (hl(l, e, t), Ta(l, e, t));
  }
  function $b(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Cd(e, t) {
    $b(e, t), (e = e.alternate) && $b(e, t);
  }
  function Jb(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = qi(e, 67108864);
      t !== null && hl(t, e, 67108864), Cd(e, 67108864);
    }
  }
  function Wb(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Al();
      t = so(t);
      var l = qi(e, t);
      l !== null && hl(l, e, t), Cd(e, t);
    }
  }
  var Rc = !0;
  function FE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = I.p;
    try {
      I.p = 2, Rd(e, t, l, i);
    } finally {
      I.p = u, V.T = s;
    }
  }
  function QE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = I.p;
    try {
      I.p = 8, Rd(e, t, l, i);
    } finally {
      I.p = u, V.T = s;
    }
  }
  function Rd(e, t, l, i) {
    if (Rc) {
      var s = wd(i);
      if (s === null)
        ud(
          e,
          t,
          i,
          wc,
          l
        ), ty(e, i);
      else if ($E(
        s,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (ty(e, i), t & 4 && -1 < ZE.indexOf(e)) {
        for (; s !== null; ) {
          var u = jl(s);
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
                    go(u), (kt & 6) === 0 && (ac = Q() + 500, Pa(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = qi(u, 2), E !== null && hl(E, u, 2), cc(), Cd(u, 2);
            }
          if (u = wd(i), u === null && ud(
            e,
            t,
            i,
            wc,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && i.stopPropagation();
      } else
        ud(
          e,
          t,
          i,
          null,
          l
        );
    }
  }
  function wd(e) {
    return e = k(e), _d(e);
  }
  var wc = null;
  function _d(e) {
    if (wc = null, e = Yn(e), e !== null) {
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
    return wc = e, null;
  }
  function ey(e) {
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
          case Ie:
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
  var Ad = !1, bi = null, yi = null, vi = null, Ja = /* @__PURE__ */ new Map(), Wa = /* @__PURE__ */ new Map(), xi = [], ZE = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ty(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        bi = null;
        break;
      case "dragenter":
      case "dragleave":
        yi = null;
        break;
      case "mouseover":
      case "mouseout":
        vi = null;
        break;
      case "pointerover":
      case "pointerout":
        Ja.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wa.delete(t.pointerId);
    }
  }
  function es(e, t, l, i, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: i,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = jl(t), t !== null && Jb(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function $E(e, t, l, i, s) {
    switch (t) {
      case "focusin":
        return bi = es(
          bi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "dragenter":
        return yi = es(
          yi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "mouseover":
        return vi = es(
          vi,
          e,
          t,
          l,
          i,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Ja.set(
          u,
          es(
            Ja.get(u) || null,
            e,
            t,
            l,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Wa.set(
          u,
          es(
            Wa.get(u) || null,
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
  function ny(e) {
    var t = Yn(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              Wb(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              Wb(l);
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
  function _c(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = wd(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var i = new l.constructor(
          l.type,
          l
        );
        R = i, l.target.dispatchEvent(i), R = null;
      } else
        return t = jl(l), t !== null && Jb(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function ly(e, t, l) {
    _c(e) && l.delete(t);
  }
  function JE() {
    Ad = !1, bi !== null && _c(bi) && (bi = null), yi !== null && _c(yi) && (yi = null), vi !== null && _c(vi) && (vi = null), Ja.forEach(ly), Wa.forEach(ly);
  }
  function Ac(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ad || (Ad = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      JE
    )));
  }
  var Mc = null;
  function oy(e) {
    Mc !== e && (Mc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Mc === e && (Mc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (_d(i || l) === null)
              continue;
            break;
          }
          var u = jl(l);
          u !== null && (e.splice(t, 3), t -= 3, wf(
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
  function $r(e) {
    function t(L) {
      return Ac(L, e);
    }
    bi !== null && Ac(bi, e), yi !== null && Ac(yi, e), vi !== null && Ac(vi, e), Ja.forEach(t), Wa.forEach(t);
    for (var l = 0; l < xi.length; l++) {
      var i = xi[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < xi.length && (l = xi[0], l.blockedOn === null); )
      ny(l), l.blockedOn === null && xi.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var s = l[i], u = l[i + 1], p = s[Rt] || null;
        if (typeof u == "function")
          p || oy(l);
        else if (p) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, p = u[Rt] || null)
              E = p.formAction;
            else if (_d(s) !== null) continue;
          } else E = p.action;
          typeof E == "function" ? l[i + 1] = E : (l.splice(i, 3), i -= 3), oy(l);
        }
      }
  }
  function iy() {
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
  function Md(e) {
    this._internalRoot = e;
  }
  Tc.prototype.render = Md.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var l = t.current, i = Al();
    Zb(l, i, e, t, null, null);
  }, Tc.prototype.unmount = Md.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Zb(e.current, 2, null, e, null, null), cc(), t[Ye] = null;
    }
  };
  function Tc(e) {
    this._internalRoot = e;
  }
  Tc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ll();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < xi.length && t !== 0 && t < xi[l].priority; l++) ;
      xi.splice(l, 0, e), l === 0 && ny(e);
    }
  };
  var ry = o.version;
  if (ry !== "19.2.8")
    throw Error(
      a(
        527,
        ry,
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
    var Oc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Oc.isDisabled && Oc.supportsFiber)
      try {
        Nt = Oc.inject(
          WE
        ), xt = Oc;
      } catch {
      }
  }
  return ns.createRoot = function(e, t) {
    if (!c(e)) throw Error(a(299));
    var l = !1, i = "", s = hg, u = mg, p = pg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = Fb(
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
      iy
    ), e[Ye] = t.current, cd(e), new Md(t);
  }, ns.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(a(299));
    var i = !1, s = "", u = hg, p = mg, E = pg, L = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (p = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (L = l.formState)), t = Fb(
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
      iy
    ), t.context = Qb(null), l = t.current, i = Al(), i = so(i), s = ii(i), s.callback = null, ri(l, s, i), l = i, t.current.lanes = l, nl(t, l), go(t), e[Ye] = t.current, cd(e), new Tc(t);
  }, ns.version = "19.2.8", ns;
}
var vy;
function uC() {
  if (vy) return kd.exports;
  vy = 1;
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
var fC = uC(), b = ys();
const dC = /* @__PURE__ */ nC(b), gr = /* @__PURE__ */ tC({
  __proto__: null,
  default: dC
}, [b]);
function xy(n) {
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
  const [o, r] = b.useState(() => xy(n));
  return b.useEffect(() => {
    if (!n) return;
    const a = () => r(xy(n));
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
function Gv(n) {
  var o, r, a = "";
  if (typeof n == "string" || typeof n == "number") a += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Gv(n[o])) && (a && (a += " "), a += r);
  } else for (r in n) n[r] && (a && (a += " "), a += r);
  return a;
}
function Yv() {
  for (var n, o, r = 0, a = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Gv(n)) && (a && (a += " "), a += o);
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
}), qv = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), Qc = "-", Sy = [], gC = "arbitrary..", bC = (n) => {
  const o = vC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: a
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return yC(d);
      const m = d.split(Qc), g = m[0] === "" && m.length > 1 ? 1 : 0;
      return Pv(m, g, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const g = a[d], h = r[d];
        return g ? h ? mC(h, g) : g : h || Sy;
      }
      return r[d] || Sy;
    }
  };
}, Pv = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = Pv(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join(Qc) : n.slice(o).join(Qc), g = d.length;
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
  const r = qv();
  for (const a in n) {
    const c = n[a];
    Uh(c, r, a, o);
  }
  return r;
}, Uh = (n, o, r, a) => {
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
  const a = n === "" ? o : Xv(o, n);
  a.classGroupId = r;
}, CC = (n, o, r, a) => {
  if (wC(n)) {
    Uh(n(a), o, r, a);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(pC(r, n));
}, RC = (n, o, r, a) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, g] = c[d];
    Uh(g, Xv(o, m), r, a);
  }
}, Xv = (n, o) => {
  let r = n;
  const a = o.split(Qc), c = a.length;
  for (let f = 0; f < c; f++) {
    const d = a[f];
    let m = r.nextPart.get(d);
    m || (m = qv(), r.nextPart.set(d, m)), r = m;
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
}, gh = "!", Ey = ":", AC = [], Cy = (n, o, r, a, c) => ({
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
    let d = 0, m = 0, g = 0, h;
    const y = c.length;
    for (let M = 0; M < y; M++) {
      const O = c[M];
      if (d === 0 && m === 0) {
        if (O === Ey) {
          f.push(c.slice(g, M)), g = M + 1;
          continue;
        }
        if (O === "/") {
          h = M;
          continue;
        }
      }
      O === "[" ? d++ : O === "]" ? d-- : O === "(" ? m++ : O === ")" && m--;
    }
    const v = f.length === 0 ? c : c.slice(g);
    let x = v, C = !1;
    v.endsWith(gh) ? (x = v.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(gh) && (x = v.slice(1), C = !0)
    );
    const w = h && h > g ? h - g : void 0;
    return Cy(f, C, x, w);
  };
  if (o) {
    const c = o + Ey, f = a;
    a = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Cy(AC, !1, d, void 0, !0);
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
  parseClassName: MC(n),
  sortModifiers: TC(n),
  postfixLookupClassGroupIds: kC(n),
  ...bC(n)
}), kC = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let a = 0; a < r.length; a++)
      o[r[a]] = !0;
  return o;
}, NC = /\s+/, zC = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: a,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, m = [], g = n.trim().split(NC);
  let h = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const v = g[y], {
      isExternal: x,
      modifiers: C,
      hasImportantModifier: w,
      baseClassName: M,
      maybePostfixModifierPosition: O
    } = r(v);
    if (x) {
      h = v + (h.length > 0 ? " " + h : h);
      continue;
    }
    let A = !!O, T;
    if (A) {
      const B = M.substring(0, O);
      T = a(B);
      const j = T && d[T] ? a(M) : void 0;
      j && j !== T && (T = j, A = !1);
    } else
      T = a(M);
    if (!T) {
      if (!A) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (T = a(M), !T) {
        h = v + (h.length > 0 ? " " + h : h);
        continue;
      }
      A = !1;
    }
    const _ = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), N = w ? _ + gh : _, H = N + T;
    if (m.indexOf(H) > -1)
      continue;
    m.push(H);
    const q = c(T, A);
    for (let B = 0; B < q.length; ++B) {
      const j = q[B];
      m.push(N + j);
    }
    h = v + (h.length > 0 ? " " + h : h);
  }
  return h;
}, DC = (...n) => {
  let o = 0, r, a, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (a = Kv(r)) && (c && (c += " "), c += a);
  return c;
}, Kv = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let a = 0; a < n.length; a++)
    n[a] && (o = Kv(n[a])) && (r && (r += " "), r += o);
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
}, Fv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Qv = /^\((?:(\w[\w-]*):)?(.+)\)$/i, VC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, HC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, IC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, UC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, BC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, GC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ei = (n) => VC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), bo = (n) => !!n && Number.isInteger(Number(n)), Ld = (n) => n.endsWith("%") && ft(n.slice(0, -1)), Go = (n) => HC.test(n), Zv = () => !0, YC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  IC.test(n) && !UC.test(n)
), Bh = () => !1, qC = (n) => BC.test(n), PC = (n) => GC.test(n), XC = (n) => !De(n) && !je(n), KC = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), FC = (n) => zi(n, Wv, Bh), De = (n) => Fv.test(n), lr = (n) => zi(n, e0, YC), Ry = (n) => zi(n, nR, ft), QC = (n) => zi(n, n0, Zv), ZC = (n) => zi(n, t0, Bh), wy = (n) => zi(n, $v, Bh), $C = (n) => zi(n, Jv, PC), kc = (n) => zi(n, l0, qC), je = (n) => Qv.test(n), ls = (n) => br(n, e0), JC = (n) => br(n, t0), _y = (n) => br(n, $v), WC = (n) => br(n, Wv), eR = (n) => br(n, Jv), Nc = (n) => br(n, l0, !0), tR = (n) => br(n, n0, !0), zi = (n, o, r) => {
  const a = Fv.exec(n);
  return a ? a[1] ? o(a[1]) : r(a[2]) : !1;
}, br = (n, o, r = !1) => {
  const a = Qv.exec(n);
  return a ? a[1] ? o(a[1]) : r : !1;
}, $v = (n) => n === "position" || n === "percentage", Jv = (n) => n === "image" || n === "url", Wv = (n) => n === "length" || n === "size" || n === "bg-size", e0 = (n) => n === "length", nR = (n) => n === "number", t0 = (n) => n === "family-name", n0 = (n) => n === "number" || n === "weight", l0 = (n) => n === "shadow", lR = () => {
  const n = Cn("color"), o = Cn("font"), r = Cn("text"), a = Cn("font-weight"), c = Cn("tracking"), f = Cn("leading"), d = Cn("breakpoint"), m = Cn("container"), g = Cn("spacing"), h = Cn("radius"), y = Cn("shadow"), v = Cn("inset-shadow"), x = Cn("text-shadow"), C = Cn("drop-shadow"), w = Cn("blur"), M = Cn("perspective"), O = Cn("aspect"), A = Cn("ease"), T = Cn("animate"), _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], N = () => [
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
  ], H = () => [...N(), je, De], q = () => ["auto", "hidden", "clip", "visible", "scroll"], B = () => ["auto", "contain", "none"], j = () => [je, De, g], P = () => [Ei, "full", "auto", ...j()], te = () => [bo, "none", "subgrid", je, De], se = () => ["auto", {
    span: ["full", bo, je, De]
  }, bo, je, De], fe = () => [bo, "auto", je, De], le = () => ["auto", "min", "max", "fr", je, De], he = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...j()], I = () => [Ei, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...j()], F = () => [Ei, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...j()], ve = () => [Ei, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...j()], ae = () => [n, je, De], z = () => [...N(), _y, wy, {
    position: [je, De]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", WC, FC, {
    size: [je, De]
  }], oe = () => [Ld, ls, lr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    je,
    De
  ], we = () => ["", ft, ls, lr], qe = () => ["solid", "dashed", "dotted", "double"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Te = () => [ft, Ld, _y, wy], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    je,
    De
  ], pt = () => ["none", ft, je, De], ze = () => ["none", ft, je, De], et = () => [ft, je, De], Ne = () => [Ei, "full", ...j()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Go],
      breakpoint: [Go],
      color: [Zv],
      container: [Go],
      "drop-shadow": [Go],
      ease: ["in", "out", "in-out"],
      font: [XC],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Go],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Go],
      shadow: [Go],
      spacing: ["px", ft],
      text: [Go],
      "text-shadow": [Go],
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
        aspect: ["auto", "square", Ei, De, je, O]
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
        object: H()
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
        z: [bo, "auto", je, De]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Ei, "full", "auto", m, ...j()]
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
        flex: [ft, Ei, "auto", "initial", "none", De]
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
        order: [bo, "first", "last", "none", je, De]
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
        size: I()
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
        w: [m, "screen", ...I()]
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
          ...I()
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
        text: ["base", r, ls, lr]
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
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Ld, De]
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
        "line-clamp": [ft, "none", je, Ry]
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
        decoration: [ft, "from-font", "auto", je, lr]
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
        tab: [bo, je, De]
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
          }, bo, je, De],
          radial: ["", je, De],
          conic: [bo, je, De]
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
        outline: ["", ft, ls, lr]
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
          Nc,
          kc
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
        "inset-shadow": ["none", v, Nc, kc]
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
        "ring-offset": [ft, lr]
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
        "text-shadow": ["none", x, Nc, kc]
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
        "mix-blend": [...Ae(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ae()
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
        "mask-radial-at": N()
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
          Nc,
          kc
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
        ease: ["linear", "initial", A, je, De]
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
        perspective: [M, je, De]
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
        zoom: [bo, je, De]
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
        stroke: [ft, ls, lr, Ry]
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
  return oR(Yv(n));
}
const o0 = (...n) => n.filter((o, r, a) => !!o && o.trim() !== "" && a.indexOf(o) === r).join(" ").trim();
const iR = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const rR = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, a) => a ? a.toUpperCase() : r.toLowerCase()
);
const Ay = (n) => {
  const o = rR(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var Vd = {
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
      color: x = "currentColor",
      className: C = ""
    } = cR() ?? {}, w = a ?? v ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...Vd,
        width: o ?? h ?? Vd.width,
        height: o ?? h ?? Vd.height,
        stroke: n ?? x,
        strokeWidth: w,
        className: o0("lucide", C, c),
        ...!f && !aR(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([M, O]) => b.createElement(M, O)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Nn = (n, o) => {
  const r = b.forwardRef(
    ({ className: a, ...c }, f) => b.createElement(uR, {
      ref: f,
      iconNode: o,
      className: o0(
        `lucide-${iR(Ay(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return r.displayName = Ay(n), r;
};
const fR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], dR = Nn("check", fR);
const hR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], i0 = Nn("chevron-down", hR);
const mR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], pR = Nn("chevron-right", mR);
const gR = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], My = Nn("circle", gR);
const bR = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], yR = Nn("expand", bR);
const vR = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], xR = Nn("eye", vR);
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
], ER = Nn("eye-off", SR);
const CR = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], RR = Nn("lasso", CR);
const wR = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], _R = Nn("maximize", wR);
const AR = [["path", { d: "M5 12h14", key: "1ays0h" }]], r0 = Nn("minus", AR);
const MR = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], TR = Nn("move", MR);
const OR = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], kR = Nn("pentagon", OR);
const NR = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], zR = Nn("plus", NR);
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
], a0 = Nn("shapes", DR);
const jR = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], LR = Nn("shrink", jR);
const VR = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], HR = Nn("spline", VR);
const IR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], UR = Nn("square", IR);
const BR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], s0 = Nn("x", BR);
var da = Bv(), GR = Object.defineProperty, Gh = (n, o) => GR(n, "name", { value: o, configurable: !0 });
function bh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Gh(bh, "setRef");
function c0(...n) {
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
Gh(c0, "composeRefs");
function Kn(...n) {
  return b.useCallback(c0(...n), n);
}
Gh(Kn, "useComposedRefs");
var YR = Object.defineProperty, ro = (n, o) => YR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function cr(n) {
  const o = b.forwardRef((r, a) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const g = [];
    yh(c) && typeof zc == "function" && (c = zc(c._payload)), b.Children.forEach(c, (x) => {
      if (m0(x)) {
        m = !0;
        const C = x;
        let w = "child" in C.props ? C.props.child : C.props.children;
        yh(w) && typeof zc == "function" && (w = zc(w._payload)), d = PR(C, w), g.push(d?.props?.children);
      } else
        g.push(x);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? h0(d) : void 0, y = Kn(a, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? FR(n) : KR(n)
        );
      return c;
    }
    const v = d0(f, d.props ?? {});
    return d.type !== b.Fragment && (v.ref = a ? y : h), b.cloneElement(d, v);
  });
  return o.displayName = `${n}.Slot`, o;
}
ro(cr, "createSlot");
var u0 = /* @__PURE__ */ cr("Slot"), f0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function qR(n) {
  const o = /* @__PURE__ */ ro((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = f0, o;
}
ro(qR, "createSlottable");
var PR = /* @__PURE__ */ ro((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function d0(n, o) {
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
ro(d0, "mergeProps");
function h0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
ro(h0, "getElementRef");
function m0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === f0;
}
ro(m0, "isSlottable");
var XR = /* @__PURE__ */ Symbol.for("react.lazy");
function yh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === XR && "_payload" in n && p0(n._payload);
}
ro(yh, "isLazyComponent");
function p0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
ro(p0, "isPromiseLike");
var KR = /* @__PURE__ */ ro((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), FR = /* @__PURE__ */ ro((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), zc = gr[" use ".trim().toString()], QR = Object.defineProperty, ZR = (n, o) => QR(n, "name", { value: o, configurable: !0 }), $R = [
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
  const r = /* @__PURE__ */ cr(`Primitive.${o}`), a = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(g, { ...m, ref: f });
  });
  return a.displayName = `Primitive.${o}`, { ...n, [o]: a };
}, {});
function JR(n, o) {
  n && da.flushSync(() => n.dispatchEvent(o));
}
ZR(JR, "dispatchDiscreteCustomEvent");
var WR = Object.defineProperty, Kl = (n, o) => WR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function ew(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const a = /* @__PURE__ */ Kl((f) => {
    const { children: d, ...m } = f, g = b.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ S.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  a.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: m = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!m)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Kl(c, "useContext"), [a, c];
}
Kl(ew, "createContext");
// @__NO_SIDE_EFFECTS__
function Di(n, o = []) {
  let r = [];
  function a(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Kl((v) => {
      const { scope: x, children: C, ...w } = v, M = x?.[n]?.[g] || m, O = b.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ S.jsx(M.Provider, { value: O, children: C });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(v, x, C = {}) {
      const { optional: w = !1 } = C, M = x?.[n]?.[g] || m, O = b.useContext(M);
      if (O) return O;
      if (d !== void 0) return d;
      if (!w)
        throw new Error(`\`${v}\` must be used within \`${f}\``);
    }
    return Kl(y, "useContext"), [h, y];
  }
  Kl(a, "createContext");
  const c = /* @__PURE__ */ Kl(() => {
    const f = r.map((d) => b.createContext(d));
    return /* @__PURE__ */ Kl(function(m) {
      const g = m?.[n] || f;
      return b.useMemo(
        () => ({ [`__scope${n}`]: { ...m, [n]: g } }),
        [m, g]
      );
    }, "useScope");
  }, "createScope");
  return c.scopeName = n, [a, g0(c, ...o)];
}
Kl(Di, "createContextScope");
function g0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Kl(() => {
    const a = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Kl(function(f) {
      const d = a.reduce((m, { useScope: g, scopeName: h }) => {
        const v = g(f)[`__scope${h}`];
        return { ...m, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Kl(g0, "composeContextScopes");
var tw = Object.defineProperty, kn = (n, o) => tw(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function au(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Di(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ kn((M) => {
    const { scope: O, children: A } = M, T = b.useRef(null), _ = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: O, itemMap: _, collectionRef: T, children: A });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", g = /* @__PURE__ */ cr(m), h = b.forwardRef(
    (M, O) => {
      const { scope: A, children: T } = M, _ = f(m, A), N = Kn(O, _.collectionRef);
      return /* @__PURE__ */ S.jsx(g, { ref: N, children: T });
    }
  );
  h.displayName = m;
  const y = n + "CollectionItemSlot", v = "data-radix-collection-item", x = /* @__PURE__ */ cr(y), C = b.forwardRef(
    (M, O) => {
      const { scope: A, children: T, ..._ } = M, N = b.useRef(null), H = Kn(O, N), q = f(y, A);
      return b.useEffect(() => (q.itemMap.set(N, { ref: N, ..._ }), () => {
        q.itemMap.delete(N);
      })), /* @__PURE__ */ S.jsx(x, { [v]: "", ref: H, children: T });
    }
  );
  C.displayName = y;
  function w(M) {
    const O = f(n + "CollectionConsumer", M);
    return b.useCallback(() => {
      const T = O.collectionRef.current;
      if (!T) return [];
      const _ = Array.from(T.querySelectorAll(`[${v}]`));
      return Array.from(O.itemMap.values()).sort(
        (q, B) => _.indexOf(q.ref.current) - _.indexOf(B.ref.current)
      );
    }, [O.collectionRef, O.itemMap]);
  }
  return kn(w, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: C },
    w,
    a
  ];
}
kn(au, "createCollection");
var Ty = /* @__PURE__ */ new WeakMap(), xn, Ml, Hd = (Ml = class extends Map {
  constructor(r) {
    super(r);
    cy(this, xn);
    Td(this, xn, [...super.keys()]), Ty.set(this, !0);
  }
  set(r, a) {
    return Ty.get(this) && (this.has(r) ? qn(this, xn)[qn(this, xn).indexOf(r)] = r : qn(this, xn).push(r)), super.set(r, a), this;
  }
  insert(r, a, c) {
    const f = this.has(a), d = qn(this, xn).length, m = Yh(r);
    let g = m >= 0 ? m : d + m;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(a, c), this;
    const y = this.size + (f ? 0 : 1);
    m < 0 && g++;
    const v = [...qn(this, xn)];
    let x, C = !1;
    for (let w = g; w < y; w++)
      if (g === w) {
        let M = v[w];
        v[w] === a && (M = v[w + 1]), f && this.delete(a), x = this.get(M), this.set(a, c);
      } else {
        !C && v[w - 1] === a && (C = !0);
        const M = v[C ? w : w - 1], O = x;
        x = this.get(M), this.delete(M), this.set(M, O);
      }
    return this;
  }
  with(r, a, c) {
    const f = new Ml(this);
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
    return Td(this, xn, []), super.clear();
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
    const a = qc(qn(this, xn), r);
    if (a !== void 0)
      return this.get(a);
  }
  entryAt(r) {
    const a = qc(qn(this, xn), r);
    if (a !== void 0)
      return [a, this.get(a)];
  }
  indexOf(r) {
    return qn(this, xn).indexOf(r);
  }
  keyAt(r) {
    return qc(qn(this, xn), r);
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
    return new Ml(c);
  }
  map(r, a) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, a, [d, f, this])]), f++;
    return new Ml(c);
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
    return new Ml(a);
  }
  toReversed() {
    const r = new Ml();
    for (let a = this.size - 1; a >= 0; a--) {
      const c = this.keyAt(a), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const a = [...this.entries()];
    return a.splice(...r), new Ml(a);
  }
  slice(r, a) {
    const c = new Ml();
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
}, xn = new WeakMap(), kn(Ml, "OrderedDict"), Ml);
function qc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = b0(n, o);
  return r === -1 ? void 0 : n[r];
}
kn(qc, "at");
function b0(n, o) {
  const r = n.length, a = Yh(o), c = a >= 0 ? a : r + a;
  return c < 0 || c >= r ? -1 : c;
}
kn(b0, "toSafeIndex");
function Yh(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
kn(Yh, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function nw(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Di(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Hd(),
      setItemMap: /* @__PURE__ */ kn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ kn(({ state: _, ...N }) => _ ? /* @__PURE__ */ S.jsx(g, { ...N, state: _ }) : /* @__PURE__ */ S.jsx(m, { ...N }), "CollectionProvider");
  d.displayName = o;
  const m = /* @__PURE__ */ kn((_) => {
    const N = O();
    return /* @__PURE__ */ S.jsx(g, { ..._, state: N });
  }, "CollectionInit");
  m.displayName = o + "Init";
  const g = /* @__PURE__ */ kn((_) => {
    const { scope: N, children: H, state: q } = _, B = b.useRef(null), [j, P] = b.useState(
      null
    ), te = Kn(B, P), [se, fe] = q;
    return b.useEffect(() => {
      if (!j) return;
      const le = x0(() => {
      });
      return le.observe(j, {
        childList: !0,
        subtree: !0
      }), () => {
        le.disconnect();
      };
    }, [j]), /* @__PURE__ */ S.jsx(
      c,
      {
        scope: N,
        itemMap: se,
        setItemMap: fe,
        collectionRef: te,
        collectionRefObject: B,
        collectionElement: j,
        children: H
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ cr(h), v = b.forwardRef(
    (_, N) => {
      const { scope: H, children: q } = _, B = f(h, H), j = Kn(N, B.collectionRef);
      return /* @__PURE__ */ S.jsx(y, { ref: j, children: q });
    }
  );
  v.displayName = h;
  const x = n + "CollectionItemSlot", C = "data-radix-collection-item", w = /* @__PURE__ */ cr(x), M = b.forwardRef(
    (_, N) => {
      const { scope: H, children: q, ...B } = _, j = b.useRef(null), [P, te] = b.useState(null), se = Kn(N, j, te), fe = f(x, H), { setItemMap: le } = fe, he = b.useRef(B);
      y0(he.current, B) || (he.current = B);
      const be = he.current;
      return b.useEffect(() => {
        const V = be;
        return le((I) => P ? I.has(P) ? I.set(P, { ...V, element: P }).toSorted(vh) : (I.set(P, { ...V, element: P }), I.toSorted(vh)) : I), () => {
          le((I) => !P || !I.has(P) ? I : (I.delete(P), new Hd(I)));
        };
      }, [P, be, le]), /* @__PURE__ */ S.jsx(w, { [C]: "", ref: se, children: q });
    }
  );
  M.displayName = x;
  function O() {
    return b.useState(new Hd());
  }
  kn(O, "useInitCollection");
  function A(_) {
    const { itemMap: N } = f(n + "CollectionConsumer", _);
    return N;
  }
  return kn(A, "useCollection"), [
    { Provider: d, Slot: v, ItemSlot: M },
    {
      createCollectionScope: a,
      useCollection: A,
      useInitCollection: O
    }
  ];
}
kn(nw, "createCollection");
function y0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), a = Object.keys(o);
  if (r.length !== a.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
kn(y0, "shallowEqual");
function v0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
kn(v0, "isElementPreceding");
function vh(n, o) {
  return !n[1].element || !o[1].element ? 0 : v0(n[1].element, o[1].element) ? -1 : 1;
}
kn(vh, "sortByDocumentPosition");
function x0(n) {
  return new MutationObserver((r) => {
    for (const a of r)
      if (a.type === "childList") {
        n();
        return;
      }
  });
}
kn(x0, "getChildListObserver");
var lw = Object.defineProperty, ha = (n, o) => lw(n, "name", { value: o, configurable: !0 }), S0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Xn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ha(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
ha(Xn, "composeEventHandlers");
function ow(n) {
  if (!S0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
ha(ow, "getOwnerWindow");
function xh(n) {
  if (!S0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
ha(xh, "getOwnerDocument");
function E0(n, o = !1) {
  const { activeElement: r } = xh(n);
  if (!r?.nodeName)
    return null;
  if (C0(r) && r.contentDocument)
    return E0(r.contentDocument.body, o);
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
ha(E0, "getActiveElement");
function C0(n) {
  return n.tagName === "IFRAME";
}
ha(C0, "isFrame");
var Ai = globalThis?.document ? b.useLayoutEffect : () => {
}, iw = Object.defineProperty, rw = (n, o) => iw(n, "name", { value: o, configurable: !0 }), Oy = gr[" useEffectEvent ".trim().toString()], ky = gr[" useInsertionEffect ".trim().toString()];
function R0(n) {
  if (typeof Oy == "function")
    return Oy(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof ky == "function" ? ky(() => {
    o.current = n;
  }) : Ai(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
rw(R0, "useEffectEvent");
var aw = Object.defineProperty, vs = (n, o) => aw(n, "name", { value: o, configurable: !0 }), sw = gr[" useInsertionEffect ".trim().toString()] || Ai;
function Ko({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ vs(() => {
  }, "onChange"),
  caller: a
}) {
  const [c, f, d] = w0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, g = m ? n : c, h = b.useCallback(
    (y) => {
      if (m) {
        const v = _0(y) ? y(n) : y;
        v !== n && d.current?.(v);
      } else
        f(y);
    },
    [m, n, f, d]
  );
  return [g, h];
}
vs(Ko, "useControllableState");
function w0({
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
vs(w0, "useUncontrolledState");
function _0(n) {
  return typeof n == "function";
}
vs(_0, "isFunction");
var Ny = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function cw(n, o, r, a) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, g = c !== void 0, h = R0(d), y = [{ ...r, state: f }];
  a && y.push(a);
  const [v, x] = b.useReducer(
    (O, A) => {
      if (A.type === Ny)
        return { ...O, state: A.state };
      const T = n(O, A);
      return g && !Object.is(T.state, O.state) && h(T.state), T;
    },
    ...y
  ), C = v.state, w = b.useRef(C);
  b.useEffect(() => {
    w.current !== C && (w.current = C, g || h(C));
  }, [C, w, g]);
  const M = b.useMemo(() => c !== void 0 ? { ...v, state: c } : v, [v, c]);
  return b.useEffect(() => {
    g && !Object.is(c, v.state) && x({ type: Ny, state: c });
  }, [c, v.state, g]), [M, x];
}
vs(cw, "useControllableStateReducer");
var uw = Object.defineProperty, Xo = (n, o) => uw(n, "name", { value: o, configurable: !0 });
function A0(n, o) {
  return b.useReducer((r, a) => o[r][a] ?? r, n);
}
Xo(A0, "useStateMachine");
var fw = /* @__PURE__ */ Xo((n) => {
  const { present: o, children: r } = n, a = M0(o), c = typeof r == "function" ? r({ present: a.isPresent }) : b.Children.only(r), f = T0(a.ref, O0(c));
  return typeof r == "function" || a.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function M0(n) {
  const [o, r] = b.useState(), a = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [g, h] = A0(m, {
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
    g === "mounted" ? (f.current = d.current ?? ea(a.current), d.current = void 0) : f.current = "none";
  }, [g]), Ai(() => {
    const y = a.current, v = c.current;
    if (v !== n) {
      const C = f.current, w = ea(y);
      n ? (d.current = w, h("MOUNT")) : w === "none" || y?.display === "none" ? h("UNMOUNT") : h(v && C !== w ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), Ai(() => {
    if (o) {
      let y;
      const v = o.ownerDocument.defaultView ?? window, x = /* @__PURE__ */ Xo((w) => {
        const O = ea(a.current).includes(CSS.escape(w.animationName));
        if (w.target === o && O && (h("ANIMATION_END"), !c.current)) {
          const A = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = v.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = A);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ Xo((w) => {
        w.target === o && (f.current = ea(a.current));
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
        a.current = v, d.current = ea(v);
      } else
        a.current = null;
      r(y);
    }, [])
  };
}
Xo(M0, "usePresence");
function Sh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Xo(Sh, "setRef");
function T0(...n) {
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
Xo(T0, "useStableComposedRefs");
function ea(n) {
  return n?.animationName || "none";
}
Xo(ea, "getAnimationName");
function O0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Xo(O0, "getElementRef");
var dw = Object.defineProperty, hw = (n, o) => dw(n, "name", { value: o, configurable: !0 }), mw = gr[" useId ".trim().toString()] || (() => {
}), pw = 0;
function su(n) {
  const [o, r] = b.useState(mw());
  return Ai(() => {
    n || r((a) => a ?? String(pw++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
hw(su, "useId");
var gw = Object.defineProperty, xs = (n, o) => gw(n, "name", { value: o, configurable: !0 }), qh = "Collapsible", [bw, k0] = /* @__PURE__ */ Di(qh), [yw, Ph] = bw(qh), vw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ xs(function(o, r) {
    const {
      __scopeCollapsible: a,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...g
    } = o, [h, y] = Ko({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: qh
    });
    return /* @__PURE__ */ S.jsx(
      yw,
      {
        scope: a,
        disabled: d,
        contentId: su(),
        open: h,
        onOpenToggle: b.useCallback(() => y((v) => !v), [y]),
        children: /* @__PURE__ */ S.jsx(
          Un.div,
          {
            "data-state": cu(h),
            "data-disabled": d ? "" : void 0,
            ...g,
            ref: r
          }
        )
      }
    );
  }, "Collapsible")
), xw = "CollapsibleTrigger", N0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ xs(function(o, r) {
    const { __scopeCollapsible: a, ...c } = o, f = Ph(xw, a);
    return /* @__PURE__ */ S.jsx(
      Un.button,
      {
        type: "button",
        "aria-controls": f.open ? f.contentId : void 0,
        "aria-expanded": f.open || !1,
        "data-state": cu(f.open),
        "data-disabled": f.disabled ? "" : void 0,
        disabled: f.disabled,
        ...c,
        ref: r,
        onClick: Xn(o.onClick, f.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), z0 = "CollapsibleContent", D0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ xs(function(o, r) {
    const { forceMount: a, ...c } = o, f = Ph(z0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(fw, { present: a || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(Sw, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), Sw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ xs(function(o, r) {
  const { __scopeCollapsible: a, present: c, children: f, ...d } = o, m = Ph(z0, a), [g, h] = b.useState(c), y = b.useRef(null), v = Kn(r, y), x = b.useRef(0), C = x.current, w = b.useRef(0), M = w.current, O = m.open || g, A = b.useRef(O), T = b.useRef(void 0);
  return b.useEffect(() => {
    const _ = requestAnimationFrame(() => A.current = !1);
    return () => cancelAnimationFrame(_);
  }, []), Ai(() => {
    const _ = y.current;
    if (_) {
      T.current = T.current || {
        transitionDuration: _.style.transitionDuration,
        animationName: _.style.animationName
      }, _.style.transitionDuration = "0s", _.style.animationName = "none";
      const N = _.getBoundingClientRect();
      x.current = N.height, w.current = N.width, A.current || (_.style.transitionDuration = T.current.transitionDuration, _.style.animationName = T.current.animationName), h(c);
    }
  }, [m.open, c]), /* @__PURE__ */ S.jsx(
    Un.div,
    {
      "data-state": cu(m.open),
      "data-disabled": m.disabled ? "" : void 0,
      id: m.contentId,
      hidden: !O,
      ...d,
      ref: v,
      style: {
        "--radix-collapsible-content-height": C ? `${C}px` : void 0,
        "--radix-collapsible-content-width": M ? `${M}px` : void 0,
        ...o.style
      },
      children: O && f
    }
  );
}, "CollapsibleContentImpl"));
function cu(n) {
  return n ? "open" : "closed";
}
xs(cu, "getState");
var j0 = vw, Ew = N0, Cw = D0, Rw = Object.defineProperty, ww = (n, o) => Rw(n, "name", { value: o, configurable: !0 }), _w = b.createContext(void 0);
function Ss(n) {
  const o = b.useContext(_w);
  return n || o || "ltr";
}
ww(Ss, "useDirection");
var Aw = Object.defineProperty, Ol = (n, o) => Aw(n, "name", { value: o, configurable: !0 }), So = "Accordion", Mw = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Xh, Tw, Ow] = /* @__PURE__ */ au(So), [uu, Fk] = /* @__PURE__ */ Di(So, [
  Ow,
  k0
]), Kh = k0(), kw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { type: a, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(Xh.Provider, { scope: o.__scopeAccordion, children: a === "multiple" ? /* @__PURE__ */ S.jsx(jw, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(Dw, { ...f, ref: r }) });
  }, "Accordion")
), [L0, Nw] = uu(So), [V0, zw] = uu(
  So,
  { collapsible: !1 }
), Dw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const {
      value: a,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Ol(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [g, h] = Ko({
      prop: a,
      defaultProp: c ?? "",
      onChange: f,
      caller: So
    });
    return /* @__PURE__ */ S.jsx(
      L0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ S.jsx(V0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(H0, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), jw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ol(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ol(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
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
    L0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ S.jsx(V0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(H0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [Lw, fu] = uu(So), H0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: a, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, g = b.useRef(null), h = Kn(g, r), y = Tw(a), x = Ss(f) === "ltr", C = Xn(o.onKeyDown, (w) => {
      if (!Mw.includes(w.key)) return;
      const M = w.target, O = y().filter((P) => !P.ref.current?.disabled), A = O.findIndex((P) => P.ref.current === M), T = O.length;
      if (A === -1) return;
      w.preventDefault();
      let _ = A;
      const N = 0, H = T - 1, q = /* @__PURE__ */ Ol(() => {
        _ = A + 1, _ > H && (_ = N);
      }, "moveNext"), B = /* @__PURE__ */ Ol(() => {
        _ = A - 1, _ < N && (_ = H);
      }, "movePrev");
      switch (w.key) {
        case "Home":
          _ = N;
          break;
        case "End":
          _ = H;
          break;
        case "ArrowRight":
          d === "horizontal" && (x ? q() : B());
          break;
        case "ArrowDown":
          d === "vertical" && q();
          break;
        case "ArrowLeft":
          d === "horizontal" && (x ? B() : q());
          break;
        case "ArrowUp":
          d === "vertical" && B();
          break;
      }
      const j = _ % T;
      O[j].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      Lw,
      {
        scope: a,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(Xh.Slot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
), Eh = "AccordionItem", [Vw, Fh] = uu(Eh), Hw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: a, value: c, ...f } = o, d = fu(Eh, a), m = Nw(Eh, a), g = Kh(a), h = su(), y = c && m.value.includes(c) || !1, v = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      Vw,
      {
        scope: a,
        open: y,
        disabled: v,
        triggerId: h,
        children: /* @__PURE__ */ S.jsx(
          j0,
          {
            "data-orientation": d.orientation,
            "data-state": Qh(y),
            ...g,
            ...f,
            ref: r,
            disabled: v,
            open: y,
            onOpenChange: (x) => {
              x ? m.onItemOpen(c) : m.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), Iw = "AccordionHeader", Uw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = fu(So, a), d = Fh(Iw, a);
    return /* @__PURE__ */ S.jsx(
      Un.h3,
      {
        "data-orientation": f.orientation,
        "data-state": Qh(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), zy = "AccordionTrigger", Bw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = fu(So, a), d = Fh(zy, a), m = zw(zy, a), g = Kh(a);
    return /* @__PURE__ */ S.jsx(Xh.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = fu(So, a), d = Fh(Gw, a), m = Kh(a);
    return /* @__PURE__ */ S.jsx(
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
function Qh(n) {
  return n ? "open" : "closed";
}
Ol(Qh, "getState");
var qw = kw, Pw = Hw, Xw = Uw, Kw = Bw, Fw = Yw, Qw = Object.defineProperty, Zw = (n, o) => Qw(n, "name", { value: o, configurable: !0 });
function I0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
Zw(I0, "useCallbackRef");
var $w = Object.defineProperty, Jw = (n, o) => $w(n, "name", { value: o, configurable: !0 });
function U0(n) {
  const [o, r] = b.useState(void 0);
  return Ai(() => {
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
Jw(U0, "useSize");
const ca = Math.min, qo = Math.max, Zc = Math.round, rr = Math.floor, Po = (n) => ({
  x: n,
  y: n
}), Ww = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function B0(n, o, r) {
  return qo(n, ca(o, r));
}
function Mi(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Ql(n) {
  return n.split("-")[0];
}
function ji(n) {
  return n.split("-")[1];
}
function Zh(n) {
  return n === "x" ? "y" : "x";
}
function $h(n) {
  return n === "y" ? "height" : "width";
}
function Fl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function Jh(n) {
  return Zh(Fl(n));
}
function e_(n, o, r) {
  r === void 0 && (r = !1);
  const a = ji(n), c = Jh(n), f = $h(c);
  let d = c === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = $c(d)), [d, $c(d)];
}
function t_(n) {
  const o = $c(n);
  return [Ch(n), o, Ch(o)];
}
function Ch(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const Dy = ["left", "right"], jy = ["right", "left"], n_ = ["top", "bottom"], l_ = ["bottom", "top"];
function o_(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? jy : Dy : o ? Dy : jy;
    case "left":
    case "right":
      return o ? n_ : l_;
    default:
      return [];
  }
}
function i_(n, o, r, a) {
  const c = ji(n);
  let f = o_(Ql(n), r === "start", a);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Ch)))), f;
}
function $c(n) {
  const o = Ql(n);
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
function G0(n) {
  return typeof n != "number" ? r_(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function Jc(n) {
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
function Ly(n, o, r) {
  let {
    reference: a,
    floating: c
  } = n;
  const f = Fl(o), d = Jh(o), m = $h(d), g = Ql(o), h = f === "y", y = a.x + a.width / 2 - c.width / 2, v = a.y + a.height / 2 - c.height / 2, x = a[m] / 2 - c[m] / 2;
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
  const w = ji(o);
  return w && (C[d] += x * (w === "end" ? 1 : -1) * (r && h ? -1 : 1)), C;
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
    altBoundary: x = !1,
    padding: C = 0
  } = Mi(o, n), w = G0(C), O = m[x ? v === "floating" ? "reference" : "floating" : v], A = Jc(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(O))) == null || r ? O : O.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: g
  })), T = v === "floating" ? {
    x: a,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, _ = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), N = await (f.isElement == null ? void 0 : f.isElement(_)) && await (f.getScale == null ? void 0 : f.getScale(_)) || {
    x: 1,
    y: 1
  }, H = Jc(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: T,
    offsetParent: _,
    strategy: g
  }) : T);
  return {
    top: (A.top - H.top + w.top) / N.y,
    bottom: (H.bottom - A.bottom + w.bottom) / N.y,
    left: (A.left - H.left + w.left) / N.x,
    right: (H.right - A.right + w.right) / N.x
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
  } = Ly(h, a, g), x = a, C = 0;
  const w = {};
  for (let M = 0; M < f.length; M++) {
    const O = f[M];
    if (!O)
      continue;
    const {
      name: A,
      fn: T
    } = O, {
      x: _,
      y: N,
      data: H,
      reset: q
    } = await T({
      x: y,
      y: v,
      initialPlacement: a,
      placement: x,
      strategy: c,
      middlewareData: w,
      rects: h,
      platform: m,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = _ ?? y, v = N ?? v, w[A] = {
      ...w[A],
      ...H
    }, q && C < s_ && (C++, typeof q == "object" && (q.placement && (x = q.placement), q.rects && (h = q.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : q.rects), {
      x: y,
      y: v
    } = Ly(h, x, g)), M = -1);
  }
  return {
    x: y,
    y: v,
    placement: x,
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
        fallbackPlacements: x,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: M = !0,
        ...O
      } = Mi(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const A = Ql(c), T = Fl(m), _ = Ql(m) === m, N = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), H = x || (_ || !M ? [$c(m)] : t_(m)), q = w !== "none";
      !x && q && H.push(...i_(m, M, w, N));
      const B = [m, ...H], j = await g.detectOverflow(o, O), P = [];
      let te = ((a = f.flip) == null ? void 0 : a.overflows) || [];
      if (y && P.push(j[A]), v) {
        const he = e_(c, d, N);
        P.push(j[he[0]], j[he[1]]);
      }
      if (te = [...te, {
        placement: c,
        overflows: P
      }], !P.every((he) => he <= 0)) {
        var se, fe;
        const he = (((se = f.flip) == null ? void 0 : se.index) || 0) + 1, be = B[he];
        if (be && (!(v === "alignment" ? T !== Fl(be) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        te.every((F) => Fl(F.placement) === T ? F.overflows[0] > 0 : !0)))
          return {
            data: {
              index: he,
              overflows: te
            },
            reset: {
              placement: be
            }
          };
        let V = (fe = te.filter((I) => I.overflows[0] <= 0).sort((I, F) => I.overflows[1] - F.overflows[1])[0]) == null ? void 0 : fe.placement;
        if (!V)
          switch (C) {
            case "bestFit": {
              var le;
              const I = (le = te.filter((F) => {
                if (q) {
                  const ve = Fl(F.placement);
                  return ve === T || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ve === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((ve) => ve > 0).reduce((ve, ae) => ve + ae, 0)]).sort((F, ve) => F[1] - ve[1])[0]) == null ? void 0 : le[0];
              I && (V = I);
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
}, Y0 = /* @__PURE__ */ new Set(["left", "top"]);
async function f_(n, o) {
  const {
    placement: r,
    platform: a,
    elements: c
  } = n, f = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = Ql(r), m = ji(r), g = Fl(r) === "y", h = Y0.has(d) ? -1 : 1, y = f && g ? -1 : 1, v = Mi(o, n);
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
  return m && typeof w == "number" && (C = m === "end" ? w * -1 : w), g ? {
    x: C * y,
    y: x * h
  } : {
    x: x * h,
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
              y: N
            } = T;
            return {
              x: _,
              y: N
            };
          }
        },
        ...h
      } = Mi(n, o), y = {
        x: r,
        y: a
      }, v = await f.detectOverflow(o, h), x = Fl(c), C = Zh(x);
      let w = y[C], M = y[x];
      const O = (T, _) => B0(_ + v[T === "y" ? "top" : "left"], _, _ - v[T === "y" ? "bottom" : "right"]);
      d && (w = O(C, w)), m && (M = O(x, M));
      const A = g.fn({
        ...o,
        [C]: w,
        [x]: M
      });
      return {
        ...A,
        data: {
          x: A.x - r,
          y: A.y - a,
          enabled: {
            [C]: d,
            [x]: m
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
      } = Mi(n, o), x = {
        x: c,
        y: f
      }, C = Fl(d), w = Zh(C);
      let M = x[w], O = x[C];
      const A = Mi(h, o), T = typeof A == "number" ? {
        mainAxis: A,
        crossAxis: 0
      } : {
        mainAxis: (r = A.mainAxis) != null ? r : 0,
        crossAxis: (a = A.crossAxis) != null ? a : 0
      };
      if (y) {
        const H = w === "y" ? "height" : "width", q = m.reference[w] - m.floating[H] + T.mainAxis, B = m.reference[w] + m.reference[H] - T.mainAxis;
        M < q ? M = q : M > B && (M = B);
      }
      if (v) {
        var _, N;
        const H = w === "y" ? "width" : "height", q = Y0.has(Ql(d)), B = m.reference[C] - m.floating[H] + (q && ((_ = g.offset) == null ? void 0 : _[C]) || 0) + (q ? 0 : T.crossAxis), j = m.reference[C] + m.reference[H] + (q ? 0 : ((N = g.offset) == null ? void 0 : N[C]) || 0) - (q ? T.crossAxis : 0);
        O < B ? O = B : O > j && (O = j);
      }
      return {
        [w]: M,
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
      } = Mi(n, o), g = await c.detectOverflow(o, m), h = Ql(r), y = ji(r), v = Fl(r) === "y", {
        width: x,
        height: C
      } = a.floating;
      let w, M;
      h === "top" || h === "bottom" ? (w = h, M = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (M = h, w = y === "end" ? "top" : "bottom");
      const O = C - g.top - g.bottom, A = x - g.left - g.right, T = ca(C - g[w], O), _ = ca(x - g[M], A), N = o.middlewareData.shift, H = !N;
      let q = T, B = _;
      N != null && N.enabled.x && (B = A), N != null && N.enabled.y && (q = O), H && !y && (v ? B = x - 2 * qo(g.left, g.right) : q = C - 2 * qo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: B,
        availableHeight: q
      });
      const j = await c.getDimensions(f.floating);
      return x !== j.width || C !== j.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function du() {
  return typeof window < "u";
}
function Bn(n) {
  return Wh(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function hn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Fo(n) {
  var o;
  return (o = (Wh(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function Wh(n) {
  return du() ? n instanceof Node || n instanceof hn(n).Node : !1;
}
function dn(n) {
  return du() ? n instanceof Element || n instanceof hn(n).Element : !1;
}
function Kt(n) {
  return du() ? n instanceof HTMLElement || n instanceof hn(n).HTMLElement : !1;
}
function ua(n) {
  return !du() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof hn(n).ShadowRoot;
}
function Es(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: a,
    display: c
  } = bl(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + a + r) && c !== "inline" && c !== "contents";
}
function g_(n) {
  return /^(table|td|th)$/.test(Bn(n));
}
function hu(n) {
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
const b_ = /transform|translate|scale|rotate|perspective|filter/, y_ = /paint|layout|strict|content/, or = (n) => !!n && n !== "none";
let Id;
function em(n) {
  const o = dn(n) ? bl(n) : n;
  return or(o.transform) || or(o.translate) || or(o.scale) || or(o.rotate) || or(o.perspective) || !tm() && (or(o.backdropFilter) || or(o.filter)) || b_.test(o.willChange || "") || y_.test(o.contain || "");
}
function v_(n) {
  let o = Ti(n);
  for (; Kt(o) && !wi(o); ) {
    if (em(o))
      return o;
    if (hu(o))
      return null;
    o = Ti(o);
  }
  return null;
}
function tm() {
  return Id == null && (Id = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Id;
}
function wi(n) {
  return /^(html|body|#document)$/.test(Bn(n));
}
function bl(n) {
  return hn(n).getComputedStyle(n);
}
function mu(n) {
  return dn(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.scrollX,
    scrollTop: n.scrollY
  };
}
function Ti(n) {
  if (Bn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    ua(n) && n.host || // Fallback.
    Fo(n)
  );
  return ua(o) ? o.host : o;
}
function q0(n) {
  const o = Ti(n);
  return wi(o) ? (n.ownerDocument || n).body : Kt(o) && Es(o) ? o : q0(o);
}
function fa(n, o, r) {
  var a;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = q0(n), f = c === ((a = n.ownerDocument) == null ? void 0 : a.body), d = hn(c);
  if (f) {
    const m = Rh(d);
    return o.concat(d, d.visualViewport || [], Es(c) ? c : [], m && r ? fa(m) : []);
  } else
    return o.concat(c, fa(c, [], r));
}
function Rh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function P0(n) {
  const o = bl(n);
  let r = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : a, m = Zc(r) !== f || Zc(a) !== d;
  return m && (r = f, a = d), {
    width: r,
    height: a,
    $: m
  };
}
function nm(n) {
  return dn(n) ? n : n.contextElement;
}
function ra(n) {
  const o = nm(n);
  if (!Kt(o))
    return Po(1);
  const r = o.getBoundingClientRect(), {
    width: a,
    height: c,
    $: f
  } = P0(o);
  let d = (f ? Zc(r.width) : r.width) / a, m = (f ? Zc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const x_ = /* @__PURE__ */ Po(0);
function X0(n) {
  const o = hn(n);
  return !tm() || !o.visualViewport ? x_ : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function S_(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === hn(n);
}
function ur(n, o, r, a) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = nm(n);
  let d = Po(1);
  o && (a ? dn(a) && (d = ra(a)) : d = ra(n));
  const m = S_(f, r, a) ? X0(f) : Po(0);
  let g = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, y = c.width / d.x, v = c.height / d.y;
  if (f && a) {
    const x = hn(f), C = dn(a) ? hn(a) : a;
    let w = x, M = Rh(w);
    for (; M && C !== w; ) {
      const O = ra(M), A = M.getBoundingClientRect(), T = bl(M), _ = A.left + (M.clientLeft + parseFloat(T.paddingLeft)) * O.x, N = A.top + (M.clientTop + parseFloat(T.paddingTop)) * O.y;
      g *= O.x, h *= O.y, y *= O.x, v *= O.y, g += _, h += N, w = hn(M), M = Rh(w);
    }
  }
  return Jc({
    width: y,
    height: v,
    x: g,
    y: h
  });
}
function pu(n, o) {
  const r = mu(n).scrollLeft;
  return o ? o.left + r : ur(Fo(n)).left + r;
}
function K0(n, o) {
  const r = n.getBoundingClientRect(), a = r.left + o.scrollLeft - pu(n, r), c = r.top + o.scrollTop;
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
  const f = c === "fixed", d = Fo(a), m = o ? hu(o.floating) : !1;
  if (a === d || m && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Po(1);
  const y = Po(0), v = Kt(a);
  if ((v || !f) && ((Bn(a) !== "body" || Es(d)) && (g = mu(a)), v)) {
    const C = ur(a);
    h = ra(a), y.x = C.x + a.clientLeft, y.y = C.y + a.clientTop;
  }
  const x = d && !v && !f ? K0(d, g) : Po(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + y.x + x.x,
    y: r.y * h.y - g.scrollTop * h.y + y.y + x.y
  };
}
function C_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function R_(n) {
  const o = mu(n), r = n.ownerDocument.body, a = qo(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = qo(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + pu(n);
  const d = -o.scrollTop;
  return bl(r).direction === "rtl" && (f += qo(n.clientWidth, r.clientWidth) - a), {
    width: a,
    height: c,
    x: f,
    y: d
  };
}
const w_ = 25;
function __(n, o, r) {
  r === void 0 && (r = "viewport");
  const a = r === "layoutViewport", c = hn(n), f = Fo(n), d = c.visualViewport;
  let m = f.clientWidth, g = f.clientHeight, h = 0, y = 0;
  if (d) {
    const x = !tm() || o === "fixed";
    a ? x || (h = -d.offsetLeft, y = -d.offsetTop) : (m = d.width, g = d.height, x && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (pu(f) <= 0) {
    const x = f.ownerDocument, C = x.body, w = getComputedStyle(C), M = x.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, O = Math.abs(f.clientWidth - C.clientWidth - M), A = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? O / 2 : O;
    A <= w_ && (m -= A);
  }
  return {
    width: m,
    height: g,
    x: h,
    y
  };
}
function A_(n, o) {
  const r = ur(n, !0, o === "fixed"), a = r.top + n.clientTop, c = r.left + n.clientLeft, f = ra(n), d = n.clientWidth * f.x, m = n.clientHeight * f.y, g = c * f.x, h = a * f.y;
  return {
    width: d,
    height: m,
    x: g,
    y: h
  };
}
function Vy(n, o, r) {
  let a;
  if (o === "viewport" || o === "layoutViewport")
    a = __(n, r, o);
  else if (o === "document")
    a = R_(Fo(n));
  else if (dn(o))
    a = A_(o, r);
  else {
    const c = X0(n);
    a = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return Jc(a);
}
function M_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let a = fa(n, [], !1).filter((m) => dn(m) && Bn(m) !== "body"), c = null;
  const f = bl(n).position === "fixed";
  let d = f ? Ti(n) : n;
  for (; dn(d) && !wi(d); ) {
    const m = bl(d), g = em(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && m.position === "static") ? a = a.filter((v) => v !== d) : c = m, d = Ti(d);
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
  const d = [...r === "clippingAncestors" ? hu(o) ? [] : M_(o, this._c) : [].concat(r), a], m = Vy(o, d[0], c);
  let g = m.top, h = m.right, y = m.bottom, v = m.left;
  for (let x = 1; x < d.length; x++) {
    const C = Vy(o, d[x], c);
    g = qo(C.top, g), h = ca(C.right, h), y = ca(C.bottom, y), v = qo(C.left, v);
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
  } = P0(n);
  return {
    width: o,
    height: r
  };
}
function k_(n, o, r) {
  const a = Kt(o), c = Fo(o), f = r === "fixed", d = ur(n, !0, f, o);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Po(0);
  if ((a || !f) && ((Bn(o) !== "body" || Es(c)) && (m = mu(o)), a)) {
    const x = ur(o, !0, f, o);
    g.x = x.x + o.clientLeft, g.y = x.y + o.clientTop;
  }
  !a && c && (g.x = pu(c));
  const h = c && !a && !f ? K0(c, m) : Po(0), y = d.left + m.scrollLeft - g.x - h.x, v = d.top + m.scrollTop - g.y - h.y;
  return {
    x: y,
    y: v,
    width: d.width,
    height: d.height
  };
}
function Ud(n) {
  return bl(n).position === "static";
}
function Hy(n, o) {
  if (!Kt(n) || bl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Fo(n) === r && (r = r.ownerDocument.body), r;
}
function F0(n, o) {
  const r = hn(n);
  if (hu(n))
    return r;
  if (!Kt(n)) {
    let c = Ti(n);
    for (; c && !wi(c); ) {
      if (dn(c) && !Ud(c))
        return c;
      c = Ti(c);
    }
    return r;
  }
  let a = Hy(n, o);
  for (; a && g_(a) && Ud(a); )
    a = Hy(a, o);
  return a && wi(a) && Ud(a) && !em(a) ? r : a || v_(n) || r;
}
const N_ = async function(n) {
  const o = this.getOffsetParent || F0, r = this.getDimensions, a = await r(n.floating);
  return {
    reference: k_(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  };
};
function z_(n) {
  return bl(n).direction === "rtl";
}
const D_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: E_,
  getDocumentElement: Fo,
  getClippingRect: T_,
  getOffsetParent: F0,
  getElementRects: N_,
  getClientRects: C_,
  getDimensions: O_,
  getScale: ra,
  isElement: dn,
  isRTL: z_
};
function Q0(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function j_(n, o, r) {
  let a = null, c;
  const f = Fo(n);
  function d() {
    var y;
    clearTimeout(c), (y = a) == null || y.disconnect(), a = null;
  }
  function m(y, v) {
    y === void 0 && (y = !1), v === void 0 && (v = 1), d();
    const x = n.getBoundingClientRect(), {
      left: C,
      top: w,
      width: M,
      height: O
    } = x;
    if (y || o(), !M || !O)
      return;
    const A = rr(w), T = rr(f.clientWidth - (C + M)), _ = rr(f.clientHeight - (w + O)), N = rr(C), q = {
      rootMargin: -A + "px " + -T + "px " + -_ + "px " + -N + "px",
      threshold: qo(0, ca(1, v)) || 1
    };
    let B = !0;
    function j(P) {
      const te = P[0].intersectionRatio;
      if (!Q0(x, n.getBoundingClientRect()))
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
function Iy(n, o, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = a, h = nm(n), y = c || f ? [...h ? fa(h) : [], ...o ? fa(o) : []] : [];
  y.forEach((A) => {
    c && A.addEventListener("scroll", r), f && A.addEventListener("resize", r);
  });
  const v = h && m ? j_(h, r, f) : null;
  let x = -1, C = null;
  d && (C = new ResizeObserver((A) => {
    let [T] = A;
    T && T.target === h && C && o && (C.unobserve(o), cancelAnimationFrame(x), x = requestAnimationFrame(() => {
      var _;
      (_ = C) == null || _.observe(o);
    })), r();
  }), h && !g && C.observe(h), o && C.observe(o));
  let w, M = g ? ur(n) : null;
  g && O();
  function O() {
    const A = ur(n);
    M && !Q0(M, A) && r(), M = A, w = requestAnimationFrame(O);
  }
  return r(), () => {
    var A;
    y.forEach((T) => {
      c && T.removeEventListener("scroll", r), f && T.removeEventListener("resize", r);
    }), v?.(), (A = C) == null || A.disconnect(), C = null, g && cancelAnimationFrame(w);
  };
}
const L_ = d_, V_ = h_, H_ = u_, I_ = p_, U_ = m_, B_ = (n, o, r) => {
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
}, Pc = G_ ? b.useLayoutEffect : Y_;
function Wc(n, o) {
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
        if (!Wc(n[a], o[a]))
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
      if (!(f === "_owner" && n.$$typeof) && !Wc(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function Z0(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Uy(n, o) {
  const r = Z0(n);
  return Math.round(o * r) / r;
}
function Bd(n) {
  const o = b.useRef(n);
  return Pc(() => {
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
  }), [x, C] = b.useState(a);
  Wc(x, a) || C(a);
  const [w, M] = b.useState(null), [O, A] = b.useState(null), T = b.useCallback((F) => {
    F !== q.current && (q.current = F, M(F));
  }, []), _ = b.useCallback((F) => {
    F !== B.current && (B.current = F, A(F));
  }, []), N = f || w, H = d || O, q = b.useRef(null), B = b.useRef(null), j = b.useRef(y), P = g != null, te = Bd(g), se = Bd(c), fe = Bd(h), le = b.useCallback(() => {
    if (!q.current || !B.current)
      return;
    const F = {
      placement: o,
      strategy: r,
      middleware: x
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
      he.current && !Wc(j.current, ae) && (j.current = ae, da.flushSync(() => {
        v(ae);
      }));
    });
  }, [x, o, r, se, fe]);
  Pc(() => {
    h === !1 && j.current.isPositioned && (j.current.isPositioned = !1, v((F) => ({
      ...F,
      isPositioned: !1
    })));
  }, [h]);
  const he = b.useRef(!1);
  Pc(() => (he.current = !0, () => {
    he.current = !1;
  }), []), Pc(() => {
    if (N && (q.current = N), H && (B.current = H), N && H) {
      if (te.current)
        return te.current(N, H, le);
      le();
    }
  }, [N, H, le, te, P]);
  const be = b.useMemo(() => ({
    reference: q,
    floating: B,
    setReference: T,
    setFloating: _
  }), [T, _]), V = b.useMemo(() => ({
    reference: N,
    floating: H
  }), [N, H]), I = b.useMemo(() => {
    const F = {
      position: r,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return F;
    const ve = Uy(V.floating, y.x), ae = Uy(V.floating, y.y);
    return m ? {
      ...F,
      transform: "translate(" + ve + "px, " + ae + "px)",
      ...Z0(V.floating) >= 1.5 && {
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
    floatingStyles: I
  }), [y, le, be, V, I]);
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
  const r = H_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, Q_ = (n, o) => {
  const r = I_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var Z_ = Object.defineProperty, lm = (n, o) => Z_(n, "name", { value: o, configurable: !0 }), Gd = !1;
function $0() {
  const [n, o] = b.useState(Gd);
  return b.useEffect(() => {
    Gd || (Gd = !0, o(!0));
  }, []), n;
}
lm($0, "useIsHydrated");
var J0 = gr[" useSyncExternalStore ".trim().toString()];
function W0() {
  return () => {
  };
}
lm(W0, "subscribe");
function ex() {
  return J0(
    W0,
    () => !0,
    () => !1
  );
}
lm(ex, "useIsHydratedModern");
var $_ = typeof J0 == "function" ? ex : $0, J_ = Object.defineProperty, yr = (n, o) => J_(n, "name", { value: o, configurable: !0 }), Yd = "rovingFocusGroup.onEntryFocus", W_ = { bubbles: !1, cancelable: !0 }, gu = "RovingFocusGroup", [wh, tx, eA] = /* @__PURE__ */ au(gu), [tA, nx] = /* @__PURE__ */ Di(
  gu,
  [eA]
), [nA, lA] = tA(gu), oA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ yr(function(o, r) {
    return /* @__PURE__ */ S.jsx(wh.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(wh.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(iA, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), iA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ yr(function(o, r) {
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
    ...x
  } = o, C = b.useRef(null), w = Kn(r, C), M = Ss(d), [O, A] = Ko({
    prop: m,
    defaultProp: g ?? null,
    onChange: h,
    caller: gu
  }), [T, _] = b.useState(!1), N = I0(y), H = tx(a), q = b.useRef(!1), [B, j] = b.useState(0);
  return b.useEffect(() => {
    const P = C.current;
    if (P)
      return P.addEventListener(Yd, N), () => P.removeEventListener(Yd, N);
  }, [N]), /* @__PURE__ */ S.jsx(
    nA,
    {
      scope: a,
      orientation: c,
      dir: M,
      loop: f,
      currentTabStopId: O,
      onItemFocus: b.useCallback(
        (P) => A(P),
        [A]
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
      children: /* @__PURE__ */ S.jsx(
        Un.div,
        {
          tabIndex: T || B === 0 ? -1 : 0,
          "data-orientation": c,
          ...x,
          ref: w,
          style: { outline: "none", ...o.style },
          onMouseDown: Xn(o.onMouseDown, () => {
            q.current = !0;
          }),
          onFocus: Xn(o.onFocus, (P) => {
            const te = !q.current;
            if (P.target === P.currentTarget && te && !T) {
              const se = new CustomEvent(Yd, W_);
              if (P.currentTarget.dispatchEvent(se), !se.defaultPrevented) {
                const fe = H().filter((I) => I.focusable), le = fe.find((I) => I.active), he = fe.find((I) => I.id === O), V = [le, he, ...fe].filter(
                  Boolean
                ).map((I) => I.ref.current);
                om(V, v);
              }
            }
            q.current = !1;
          }),
          onBlur: Xn(o.onBlur, () => _(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), rA = "RovingFocusGroupItem", aA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ yr(function(o, r) {
    const {
      __scopeRovingFocusGroup: a,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...g
    } = o, h = su(), y = d || h, v = lA(rA, a), x = v.currentTabStopId === y, C = tx(a), { onFocusableItemAdd: w, onFocusableItemRemove: M, currentTabStopId: O } = v, A = $_();
    return Ai(() => {
      if (!(!A || !c))
        return w(), () => M();
    }, [A, c, w, M]), b.useEffect(() => {
      if (!(A || !c))
        return w(), () => M();
    }, [A, c, w, M]), /* @__PURE__ */ S.jsx(
      wh.ItemSlot,
      {
        scope: a,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ S.jsx(
          Un.span,
          {
            tabIndex: x ? 0 : -1,
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
              const _ = ox(T, v.orientation, v.dir);
              if (_ !== void 0) {
                if (T.metaKey || T.ctrlKey || T.altKey || T.shiftKey) return;
                T.preventDefault();
                let H = C().filter((q) => q.focusable).map((q) => q.ref.current);
                if (_ === "last") H.reverse();
                else if (_ === "prev" || _ === "next") {
                  _ === "prev" && H.reverse();
                  const q = H.indexOf(T.currentTarget);
                  H = v.loop ? ix(H, q + 1) : H.slice(q + 1);
                }
                setTimeout(() => om(H));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: x, hasTabStop: O != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), sA = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function lx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
yr(lx, "getDirectionAwareKey");
function ox(n, o, r) {
  const a = lx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return sA[a];
}
yr(ox, "getFocusIntent");
function om(n, o = !1) {
  const r = document.activeElement;
  for (const a of n)
    if (a === r || (a.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
yr(om, "focusFirst");
function ix(n, o) {
  return n.map((r, a) => n[(o + a) % n.length]);
}
yr(ix, "wrapArray");
var cA = oA, uA = aA, fA = Object.defineProperty, dA = (n, o) => fA(n, "name", { value: o, configurable: !0 }), hA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ dA(function(o, r) {
    return /* @__PURE__ */ S.jsx(
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
), mA = hA, pA = Object.defineProperty, gA = (n, o) => pA(n, "name", { value: o, configurable: !0 });
function rx(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
gA(rx, "usePrevious");
var bA = Object.defineProperty, yA = (n, o) => bA(n, "name", { value: o, configurable: !0 });
function im(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
yA(im, "clamp");
var vA = Object.defineProperty, ax = (n, o) => vA(n, "name", { value: o, configurable: !0 }), By = "horizontal", xA = ["horizontal", "vertical"], SA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ ax(function(o, r) {
    const { decorative: a, orientation: c = By, ...f } = o, d = sx(c) ? c : By, g = a ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
    return /* @__PURE__ */ S.jsx(
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
function sx(n) {
  return xA.includes(n);
}
ax(sx, "isValidOrientation");
var EA = SA, CA = Object.defineProperty, Mt = (n, o) => CA(n, "name", { value: o, configurable: !0 }), cx = ["PageUp", "PageDown"], ux = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], fx = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, Cs = "Slider", [_h, RA, wA] = /* @__PURE__ */ au(Cs), [rm, Qk] = /* @__PURE__ */ Di(Cs, [
  wA
]), [_A, Rs] = rm(Cs), AA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
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
      onValueChange: x = /* @__PURE__ */ Mt(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ Mt(() => {
      }, "onValueCommit"),
      inverted: w = !1,
      form: M,
      ...O
    } = o, A = b.useRef(/* @__PURE__ */ new Set()), T = b.useRef(0), _ = b.useRef(!1), H = m === "horizontal" ? MA : TA, [q, B] = b.useState(null), j = Kn(r, B), [P = [], te] = Ko({
      prop: v,
      defaultProp: y,
      onChange: /* @__PURE__ */ Mt((I) => {
        [...A.current][T.current]?.focus({
          preventScroll: !0,
          focusVisible: _.current
        }), _.current = !1, x(I);
      }, "onChange")
    }), se = b.useRef(P), fe = b.useRef(P);
    b.useEffect(() => {
      const I = M ? q?.ownerDocument.getElementById(M) : q?.closest("form");
      if (I instanceof HTMLFormElement) {
        const F = /* @__PURE__ */ Mt(() => te(fe.current), "reset");
        return I.addEventListener("reset", F), () => I.removeEventListener("reset", F);
      }
    }, [q, M, te]);
    function le(I) {
      const F = vx(P, I);
      V(I, F);
    }
    Mt(le, "handleSlideStart");
    function he(I) {
      V(I, T.current);
    }
    Mt(he, "handleSlideMove");
    function be() {
      String(P) !== String(se.current) && C(P);
    }
    Mt(be, "handleSlideEnd");
    function V(I, F, { commit: ve } = { commit: !1 }) {
      const ae = sm(d), z = cs(Math.round((I - c) / d) * d + c, ae), K = im(z, [c, f]);
      te((ne = []) => {
        const oe = bx(ne, K, F);
        if (Ex(oe, h * d)) {
          T.current = oe.indexOf(K);
          const pe = String(oe) !== String(ne);
          return pe && ve && C(oe), pe ? oe : ne;
        } else
          return ne;
      });
    }
    return Mt(V, "updateValues"), /* @__PURE__ */ S.jsx(
      _A,
      {
        scope: o.__scopeSlider,
        name: a,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: T,
        thumbs: A.current,
        values: P,
        orientation: m,
        form: M,
        children: /* @__PURE__ */ S.jsx(_h.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(_h.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          H,
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
            onStepKeyDown: ({ event: I, direction: F }) => {
              if (!g) {
                _.current = !0;
                const z = cx.includes(I.key) || I.shiftKey && ux.includes(I.key) ? 10 : 1, K = T.current, ne = P[K], oe = Cx(ne, {
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
), [dx, hx] = rm(Cs, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), MA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
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
    } = o, [x, C] = b.useState(null), w = Kn(r, C), M = b.useRef(void 0), O = Ss(f), A = O === "ltr", T = A && !d || !A && d;
    function _(N) {
      const H = M.current || x.getBoundingClientRect(), q = [0, H.width], j = bu(q, T ? [a, c] : [c, a]);
      return M.current = H, j(N - H.left);
    }
    return Mt(_, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      dx,
      {
        scope: o.__scopeSlider,
        startEdge: T ? "left" : "right",
        endEdge: T ? "right" : "left",
        direction: T ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          mx,
          {
            dir: O,
            "data-orientation": "horizontal",
            ...v,
            ref: w,
            style: {
              ...v.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (N) => {
              const H = _(N.clientX);
              m?.(H);
            },
            onSlideMove: (N) => {
              const H = _(N.clientX);
              g?.(H);
            },
            onSlideEnd: () => {
              M.current = void 0, h?.();
            },
            onStepKeyDown: (N) => {
              const q = fx[T ? "from-left" : "from-right"].includes(N.key);
              y?.({ event: N, direction: q ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), TA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      min: a,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...y
    } = o, v = b.useRef(null), x = Kn(r, v), C = b.useRef(void 0), w = !f;
    function M(O) {
      const A = C.current || v.current.getBoundingClientRect(), T = [0, A.height], N = bu(T, w ? [c, a] : [a, c]);
      return C.current = A, N(O - A.top);
    }
    return Mt(M, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      dx,
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
            onSlideStart: (O) => {
              const A = M(O.clientY);
              d?.(A);
            },
            onSlideMove: (O) => {
              const A = M(O.clientY);
              m?.(A);
            },
            onSlideEnd: () => {
              C.current = void 0, g?.();
            },
            onStepKeyDown: (O) => {
              const T = fx[w ? "from-bottom" : "from-top"].includes(O.key);
              h?.({ event: O, direction: T ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), mx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      __scopeSlider: a,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...y
    } = o, v = Rs(Cs, a);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        ...y,
        ref: r,
        onKeyDown: Xn(o.onKeyDown, (x) => {
          x.key === "Home" ? (m(x), x.preventDefault()) : x.key === "End" ? (g(x), x.preventDefault()) : cx.concat(ux).includes(x.key) && (h(x), x.preventDefault());
        }),
        onPointerDown: Xn(o.onPointerDown, (x) => {
          const C = x.target;
          C.setPointerCapture(x.pointerId), x.preventDefault(), v.thumbs.has(C) ? C.focus({ preventScroll: !0, focusVisible: !1 }) : c(x);
        }),
        onPointerMove: Xn(o.onPointerMove, (x) => {
          x.target.hasPointerCapture(x.pointerId) && f(x);
        }),
        onPointerUp: Xn(o.onPointerUp, (x) => {
          const C = x.target;
          C.hasPointerCapture(x.pointerId) && (C.releasePointerCapture(x.pointerId), d(x));
        })
      }
    );
  }, "SliderImpl")
), OA = "SliderTrack", kA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Rs(OA, a);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        "data-disabled": f.disabled ? "" : void 0,
        "data-orientation": f.orientation,
        ...c,
        ref: r
      }
    );
  }, "SliderTrack")
), Gy = "SliderRange", NA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Rs(Gy, a), d = hx(Gy, a), m = b.useRef(null), g = Kn(r, m), h = f.values.length, y = f.values.map(
      (C) => am(C, f.min, f.max)
    ), v = h > 1 ? Math.min(...y) : 0, x = 100 - Math.max(...y);
    return /* @__PURE__ */ S.jsx(
      Un.span,
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
), zA = "SliderThumb", [DA, px] = rm(zA), jA = "SliderThumbProvider";
function gx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: a,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = Rs(jA, o), d = RA(o), [m, g] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((O) => O.ref.current === m) : -1,
    [d, m]
  ), y = U0(m), v = m ? !!f.form || !!m.closest("form") : !0, x = f.values[h], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), w = x === void 0 ? 0 : am(x, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const M = {
    value: x,
    name: C,
    form: f.form,
    isFormControl: v,
    index: h,
    thumb: m,
    onThumbChange: g,
    percent: w,
    size: y
  };
  return /* @__PURE__ */ S.jsx(DA, { scope: o, ...M, children: Rx(c) ? c(M) : a });
}
Mt(gx, "SliderThumbProvider");
var qd = "SliderThumbTrigger", LA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = Rs(qd, a), d = hx(qd, a), { index: m, value: g, percent: h, size: y, onThumbChange: v } = px(
      qd,
      a
    ), x = Kn(r, v), C = yx(m, f.values.length), w = y?.[d.size], M = w ? xx(w, h, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${M}px)`
        },
        children: /* @__PURE__ */ S.jsx(_h.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
            ref: x,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: Xn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), VA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      gx,
      {
        __scopeSlider: a,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            LA,
            {
              ...f,
              ref: r,
              __scopeSlider: a
            }
          ),
          m ? /* @__PURE__ */ S.jsx(
            IA,
            {
              __scopeSlider: a
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), HA = "SliderBubbleInput", IA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function({ __scopeSlider: o, ...r }, a) {
    const { value: c, name: f, form: d } = px(HA, o), m = b.useRef(null), g = Kn(m, a), h = rx(c);
    return b.useEffect(() => {
      const y = m.current;
      if (!y) return;
      const v = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(v, "value").set;
      if (h !== c && C) {
        const w = new Event("input", { bubbles: !0 });
        C.call(y, c), y.dispatchEvent(w);
      }
    }, [h, c]), /* @__PURE__ */ S.jsx(
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
function bx(n = [], o, r) {
  const a = [...n];
  return a[r] = o, a.sort((c, f) => c - f);
}
Mt(bx, "getNextSortedValues");
function am(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return im(f, [0, 100]);
}
Mt(am, "convertValueToPercentage");
function yx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
Mt(yx, "getLabel");
function vx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), a = Math.min(...r);
  return r.indexOf(a);
}
Mt(vx, "getClosestValueIndex");
function xx(n, o, r) {
  const a = n / 2, f = bu([0, 50], [0, a]);
  return (a - f(o) * r) * r;
}
Mt(xx, "getThumbInBoundsOffset");
function Sx(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
Mt(Sx, "getStepsBetweenValues");
function Ex(n, o) {
  if (o > 0) {
    const r = Sx(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
Mt(Ex, "hasMinStepsBetweenValues");
function bu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const a = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + a * (r - n[0]);
  };
}
Mt(bu, "linearScale");
function sm(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [a, c] = o.split("e"), f = a.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
Mt(sm, "getDecimalCount");
function cs(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
Mt(cs, "roundValue");
function Cx(n, {
  min: o,
  step: r,
  direction: a,
  multiplier: c
}) {
  const f = sm(r), d = (n - o) / r, m = Math.round(d), g = cs(m * r + o, f) === cs(n, f);
  let h;
  return g ? h = m + c * a : a > 0 ? h = Math.ceil(d) : h = Math.floor(d), cs(h * r + o, f);
}
Mt(Cx, "getNextStepValue");
function Rx(n) {
  return typeof n == "function";
}
Mt(Rx, "isFunction");
var UA = Object.defineProperty, BA = (n, o) => UA(n, "name", { value: o, configurable: !0 }), GA = "Toggle", YA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ BA(function(o, r) {
    const { pressed: a, defaultPressed: c, onPressedChange: f, ...d } = o, [m, g] = Ko({
      prop: a,
      onChange: f,
      defaultProp: c ?? !1,
      caller: GA
    });
    return /* @__PURE__ */ S.jsx(
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
), qA = Object.defineProperty, Oi = (n, o) => qA(n, "name", { value: o, configurable: !0 }), ma = "ToggleGroup", [wx, Zk] = /* @__PURE__ */ Di(ma, [
  nx
]), _x = nx(), PA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Oi(function(o, r) {
  const { type: a, ...c } = o;
  if (a === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(XA, { role: "radiogroup", ...f, ref: r });
  }
  if (a === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(KA, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${ma}\``);
}, "ToggleGroup")), [Ax, Mx] = wx(ma), XA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Oi(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Oi(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
    prop: a,
    defaultProp: c ?? "",
    onChange: f,
    caller: ma
  });
  return /* @__PURE__ */ S.jsx(
    Ax,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ S.jsx(Tx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), KA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Oi(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Oi(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: ma
  }), h = b.useCallback(
    (v) => g((x = []) => [...x, v]),
    [g]
  ), y = b.useCallback(
    (v) => g((x = []) => x.filter((C) => C !== v)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    Ax,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ S.jsx(Tx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [FA, QA] = wx(ma), Tx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Oi(function(o, r) {
    const {
      __scopeToggleGroup: a,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: m,
      loop: g = !0,
      ...h
    } = o, y = _x(a), v = Ss(m), x = { dir: v, ...h };
    return /* @__PURE__ */ S.jsx(FA, { scope: a, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      cA,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: v,
        loop: g,
        children: /* @__PURE__ */ S.jsx(Un.div, { ...x, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Un.div, { ...x, ref: r }) });
  }, "ToggleGroupImpl")
), Ah = "ToggleGroupItem", ZA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Oi(function(o, r) {
    const a = Mx(Ah, o.__scopeToggleGroup), c = QA(Ah, o.__scopeToggleGroup), f = _x(o.__scopeToggleGroup), d = a.value.includes(o.value), m = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      uA,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ S.jsx(Yy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Yy, { ...g, ref: r });
  }, "ToggleGroupItem")
), Yy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Oi(function(o, r) {
    const { __scopeToggleGroup: a, value: c, ...f } = o, d = Mx(Ah, a), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ S.jsx(
      YA,
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
function Ox({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(qw, { "data-slot": "accordion", ...n });
}
function ta({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    Pw,
    {
      "data-slot": "accordion-item",
      className: We("border-b last:border-b-0", n),
      ...o
    }
  );
}
function na({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(Xw, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    Kw,
    {
      "data-slot": "accordion-trigger",
      className: We(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(i0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function la({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    Fw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: We("pt-0 pb-4", n), children: o })
    }
  );
}
const qy = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Py = Yv, vr = (n, o) => (r) => {
  var a;
  if (o?.variants == null) return Py(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], v = f?.[h];
    if (y === null) return null;
    const x = qy(y) || qy(v);
    return c[h][x];
  }), m = r && Object.entries(r).reduce((h, y) => {
    let [v, x] = y;
    return x === void 0 || (h[v] = x), h;
  }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((h, y) => {
    let { class: v, className: x, ...C } = y;
    return Object.entries(C).every((w) => {
      let [M, O] = w;
      return Array.isArray(O) ? O.includes({
        ...f,
        ...m
      }[M]) : {
        ...f,
        ...m
      }[M] === O;
    }) ? [
      ...h,
      v,
      x
    ] : h;
  }, []);
  return Py(n, d, g, r?.class, r?.className);
}, $A = vr(
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
function _i({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? u0 : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: We($A({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function JA({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ S.jsx(
    EA,
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
const WA = vr(
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
function eM({
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
      className: We(WA({ orientation: o }), n),
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
function Nx({ className: n, ...o }) {
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
function zx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: We("leading-none font-semibold", n),
      ...o
    }
  );
}
function Dx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: We("px-6", n),
      ...o
    }
  );
}
function tM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(j0, { "data-slot": "collapsible", ...n });
}
function nM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    N0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function lM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    D0,
    {
      "data-slot": "collapsible-content",
      ...n
    }
  );
}
function Xc({
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
const cm = {
  ...gr
}, Xy = {};
function Nl(n, o) {
  const r = b.useRef(Xy);
  return r.current === Xy && (r.current = n(o)), r;
}
const Pd = cm.useInsertionEffect, oM = (
  // React 17 doesn't have useInsertionEffect.
  Pd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Pd !== cm.useLayoutEffect ? Pd : (n) => n()
);
function Fe(n) {
  const o = Nl(iM).current;
  return o.next = n, oM(o.effect), o.trampoline;
}
function iM() {
  const n = {
    next: void 0,
    callback: rM,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function rM() {
}
const aM = () => {
}, Qe = typeof document < "u" ? b.useLayoutEffect : aM, jx = /* @__PURE__ */ b.createContext({
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
function sM() {
  return b.useContext(jx);
}
function cM(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: a,
    onMapChange: c
  } = n, f = Fe(c), [, d] = b.useState(!1), m = Nl(fM).current, g = Nl(uM).current, h = b.useRef(0), y = b.useRef(!0), v = b.useRef([]), x = b.useRef(null), C = Fe(() => {
    y.current || (y.current = !0, d((H) => !H));
  }), w = Fe((H, q) => {
    g.set(H, q), C();
  }), M = Fe((H) => {
    g.delete(H), C();
  }), O = Fe((H) => {
    const q = /* @__PURE__ */ new Map();
    return r.current.length = 0, a && (a.current.length = 0), H.forEach((B) => {
      q.set(B.element, {
        ...B.registration.metadata ?? {},
        index: B.index
      }), r.current[B.index] = B.element, a && (a.current[B.index] = B.registration.label !== void 0 ? B.registration.label : B.registration.textRef?.current?.textContent ?? B.element.textContent);
    }), h.current = r.current.length, q;
  });
  function A(H) {
    if (x.current?.disconnect(), x.current = null, typeof MutationObserver != "function" || H.length < 2)
      return;
    const q = new MutationObserver((j) => {
      if (!mM(j))
        return;
      let P = null;
      for (const te of H)
        if (te.isConnected) {
          if (P && Lx(P, te) > 0) {
            q.disconnect(), C();
            return;
          }
          P = te;
        }
    });
    x.current = q;
    const B = /* @__PURE__ */ new Set();
    for (let j = 1; j < H.length; j += 1) {
      const P = hM(H[j - 1], H[j]);
      P && B.add(P);
    }
    B.forEach((j) => q.observe(j, {
      childList: !0
    }));
  }
  const T = Fe(() => {
    const [H, q] = dM(g), B = O(H);
    A(q), v.current = H, y.current = !1, m.forEach((j) => j(B)), f(B);
  });
  Qe(() => (y.current || O(v.current), () => {
    r.current = [], a && (a.current = []);
  }), [r, a, O]), Qe(() => {
    y.current && T();
  }), Qe(() => () => {
    x.current?.disconnect(), y.current = !0;
  }, []);
  const _ = Fe((H) => (m.add(H), () => {
    m.delete(H);
  })), N = b.useMemo(() => ({
    register: w,
    unregister: M,
    subscribeMapChange: _,
    nextIndexRef: h
  }), [w, M, _, h]);
  return /* @__PURE__ */ S.jsx(jx.Provider, {
    value: N,
    children: o
  });
}
function uM() {
  return /* @__PURE__ */ new Map();
}
function fM() {
  return /* @__PURE__ */ new Set();
}
function dM(n) {
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
function hM(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function mM(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Lx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function pM(n, o) {
  return function(a, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", a.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${a}; visit ${f} for the full message.`;
  };
}
const Eo = pM("https://base-ui.com/production-error", "Base UI");
function fr(n, o, r, a) {
  const c = Nl(Vx).current;
  return bM(c, n, o, r, a) && Hx(c, [n, o, r, a]), c.callback;
}
function gM(n) {
  const o = Nl(Vx).current;
  return yM(o, n) && Hx(o, n), o.callback;
}
function Vx() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function bM(n, o, r, a, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== a || n.refs[3] !== c;
}
function yM(n, o) {
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
const vM = parseInt(b.version, 10);
function um(n) {
  return vM >= n;
}
function Ky(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (um(19) ? r?.ref : o.ref) ?? null;
}
function Mh(n, o) {
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
const oa = Object.freeze([]), gl = Object.freeze({});
function xM(n, o) {
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
function SM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function EM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const fm = {};
function aa(n, o, r, a, c) {
  if (!r && !a && !c && !n)
    return eu(o);
  let f = eu(n);
  return o && (f = ss(f, o)), r && (f = ss(f, r)), a && (f = ss(f, a)), c && (f = ss(f, c)), f;
}
function CM(n) {
  if (n.length === 0)
    return fm;
  if (n.length === 1)
    return eu(n[0]);
  let o = eu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = ss(o, n[r]);
  return o;
}
function eu(n) {
  return dm(n) ? {
    ...Ux(n, fm)
  } : RM(n);
}
function ss(n, o) {
  return dm(o) ? Ux(o, n) : wM(n, o);
}
function RM(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const a = o[r];
    Ix(r, a) && (o[r] = Bx(a));
  }
  return o;
}
function wM(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const a = o[r];
    switch (r) {
      case "style": {
        n[r] = Mh(n.style, a);
        break;
      }
      case "className": {
        n[r] = Gx(n.className, a);
        break;
      }
      default:
        Ix(r, a) ? n[r] = _M(n[r], a) : n[r] = a;
    }
  }
  return n;
}
function Ix(n, o) {
  const r = n.charCodeAt(0), a = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && a === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function dm(n) {
  return typeof n == "function";
}
function Ux(n, o) {
  return dm(n) ? n(o) : n ?? fm;
}
function _M(n, o) {
  return o ? n ? (...r) => {
    const a = r[0];
    if (Yx(a)) {
      const f = a;
      tu(f);
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
    return Yx(r) && tu(r), n(...o);
  });
}
function tu(n) {
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
function Zl(n, o, r = {}) {
  const a = o.render, c = AM(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? gl;
  return OM(n, a, c, f);
}
function AM(n, o = {}) {
  const {
    className: r,
    style: a,
    render: c
  } = n, {
    state: f = gl,
    ref: d,
    props: m,
    stateAttributesMapping: g,
    enabled: h = !0
  } = o, y = h ? SM(r, f) : void 0, v = h ? EM(a, f) : void 0, x = h ? xM(f, g) : gl, C = h && m ? MM(m) : void 0, w = h ? Mh(x, C) ?? {} : gl;
  return typeof document < "u" && (h ? Array.isArray(d) ? w.ref = gM([w.ref, Ky(c), ...d]) : w.ref = fr(w.ref, Ky(c), d) : fr(null, null)), h ? (y !== void 0 && (w.className = Gx(w.className, y)), v !== void 0 && (w.style = Mh(w.style, v)), w) : gl;
}
function MM(n) {
  return Array.isArray(n) ? CM(n) : aa(void 0, n);
}
const TM = /* @__PURE__ */ Symbol.for("react.lazy");
function OM(n, o, r, a) {
  if (o) {
    if (typeof o == "function")
      return o(r, a);
    const c = aa(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === TM && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return kM(n, r);
  throw new Error(Eo(8));
}
function kM(n, o) {
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
let Fy = 0;
function NM(n, o = "mui") {
  const [r, a] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (Fy += 1, a(`${o}-${Fy}`));
  }, [r, o]), c;
}
const Qy = cm.useId;
function hm(n, o) {
  if (Qy !== void 0) {
    const r = Qy();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return NM(n, o);
}
function yu(n) {
  return hm(n, "base-ui");
}
const Xl = "none", qx = "trigger-press", zM = "trigger-hover", mm = "outside-press", DM = "item-press", jM = "close-press", Zy = "clear-press", us = "input-change", yo = "input-clear", LM = "input-press", vu = "focus-out", pm = "escape-key", Th = "list-navigation", gm = "keyboard", bm = "pointer", VM = "cancel-open";
function vt(n, o, r, a) {
  let c = !1, f = !1;
  const d = gl;
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
function HM(n, o, r) {
  const a = r ?? gl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...a
  };
}
function Px(n) {
  b.useEffect(n, oa);
}
const Dc = null;
class IM {
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
let jc = new IM();
class xo {
  static create() {
    return new xo();
  }
  static request(o) {
    return jc.request(o);
  }
  static cancel(o) {
    return jc.cancel(o);
  }
  currentId = Dc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = jc.request(() => {
      this.currentId = Dc, o();
    });
  }
  cancel = () => {
    this.currentId !== Dc && (jc.cancel(this.currentId), this.currentId = Dc);
  };
  disposeEffect = () => this.cancel;
}
function ds() {
  const n = Nl(xo.create).current;
  return Px(n.disposeEffect), n;
}
function ym(n, o = !1, r = !1) {
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
function UM(n = {}) {
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
  } = sM(), y = b.useRef(-1), [v, x] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const O = h.current;
      h.current += 1, y.current = O;
    }
    return y.current;
  } : -1), C = f ?? v, w = b.useRef(null), M = b.useCallback((O) => {
    const A = w.current;
    A && m(A), w.current = O, O && d(O, {
      metadata: a ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, m, a, r, c]);
  return Qe(() => {
    if (f == null)
      return g((O) => {
        const A = w.current ? O.get(w.current)?.index : null;
        A != null && x(A);
      });
  }, [f, g]), {
    ref: M,
    index: C
  };
}
let $y = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const BM = {
  "data-starting-style": ""
}, GM = {
  "data-ending-style": ""
}, xu = {
  transitionStatus(n) {
    return n === "starting" ? BM : n === "ending" ? GM : null;
  }
}, YM = /* @__PURE__ */ b.createContext(void 0);
function qM(n = !1) {
  const o = b.useContext(YM);
  if (o === void 0 && !n)
    throw new Error(Eo(16));
  return o;
}
function PM(n) {
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
function Kc(n, o, {
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
function ws(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: a = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = qM(!0), g = f ?? m !== void 0, {
    props: h
  } = PM({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: a,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const C = d.current;
    Xd(C) && g && o && h.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, h.disabled, g]);
  Qe(y, [y]);
  const v = b.useCallback((C = {}) => {
    const {
      onClick: w,
      onMouseDown: M,
      onKeyUp: O,
      onKeyDown: A,
      onPointerDown: T,
      ..._
    } = C;
    return aa({
      onClick(N) {
        if (o) {
          N.preventDefault();
          return;
        }
        w?.(N);
      },
      onMouseDown(N) {
        o || M?.(N);
      },
      onKeyDown(N) {
        if (o || (tu(N), A?.(N), N.baseUIHandlerPrevented))
          return;
        const H = N.target === N.currentTarget, q = N.currentTarget, B = Xd(q), j = !c && XM(q), P = H && (c ? B : !j), te = N.key === "Enter", se = N.key === " ", fe = q.getAttribute("role"), le = fe?.startsWith("menuitem") || fe === "option" || fe === "gridcell";
        if (H && g && se) {
          if (N.defaultPrevented && le)
            return;
          N.preventDefault(), (!c || B) && (N.preventBaseUIHandler(), Kc(q, N));
          return;
        }
        if (!P || c || !se && !te) {
          H && j && se && N.preventDefault();
          return;
        }
        N.defaultPrevented || (N.preventDefault(), te && (N.preventBaseUIHandler(), Kc(q, N)));
      },
      onKeyUp(N) {
        if (!o) {
          if (tu(N), O?.(N), N.target === N.currentTarget && c && g && Xd(N.currentTarget) && N.key === " ") {
            N.preventDefault();
            return;
          }
          N.baseUIHandlerPrevented || N.target === N.currentTarget && !c && !g && !N.defaultPrevented && N.key === " " && (N.preventBaseUIHandler(), Kc(N.currentTarget, N));
        }
      },
      onPointerDown(N) {
        if (o) {
          N.preventDefault();
          return;
        }
        T?.(N);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, _);
  }, [o, h, g, c]), x = Fe((C) => {
    d.current = C, y();
  });
  return {
    getButtonProps: v,
    buttonRef: x
  };
}
function Xd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function XM(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Gt(n, o, r, a) {
  return n.addEventListener(o, r, a), () => {
    n.removeEventListener(o, r, a);
  };
}
function pl(n) {
  const o = Nl(KM, n).current;
  return o.next = n, Qe(o.effect), o;
}
function KM(n) {
  const o = {
    current: n,
    next: n,
    effect: () => {
      o.current = o.next;
    }
  };
  return o;
}
function Yo(n) {
  return n == null ? n : "current" in n ? n.current : n;
}
function FM(n, o = !1) {
  const r = ds();
  return Fe((a, c = null) => {
    r.cancel();
    const f = Yo(n);
    if (f == null)
      return;
    const d = f, m = () => {
      da.flushSync(a);
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
function Su(n) {
  const {
    enabled: o = !0,
    open: r,
    ref: a,
    onComplete: c
  } = n, f = Fe(c), d = FM(a, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function QM() {
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
  userAgent: ZM,
  platform: $M,
  maxTouchPoints: JM
} = QM(), Eu = ZM.toLowerCase(), hs = $M.toLowerCase(), _s = /^i(os$|p)/.test(hs) || hs === "macintel" && JM > 1, Jy = "android", nu = hs === Jy || Eu.includes(Jy), WM = !_s && hs.startsWith("mac");
hs.startsWith("win");
const e2 = WM || _s, xr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), Wy = !xr && Eu.includes("firefox");
!xr && Eu.includes("chrom");
const t2 = e2, Xx = /jsdom|happydom/.test(Eu), os = 0;
class dr {
  static create() {
    return new dr();
  }
  currentId = os;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(o, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = os, r();
    }, o);
  }
  isStarted() {
    return this.currentId !== os;
  }
  clear = () => {
    this.currentId !== os && (clearTimeout(this.currentId), this.currentId = os);
  };
  disposeEffect = () => this.clear;
}
function ki() {
  const n = Nl(dr.create).current;
  return Px(n.disposeEffect), n;
}
let ev = {}, tv = {}, nv = "";
function Cu(n, o) {
  return Es(n) ? n : o;
}
function lv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Cu(o, r)).overflowY);
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
  const r = $t(n), a = r.documentElement, c = r.body, f = Cu(a, c), d = f.style.overflowY, m = a.style.scrollbarGutter;
  a.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, a.style.scrollbarGutter = m, g === h;
}
function o2(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = Cu(r, a), f = {
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
  if (xr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const C = c.getComputedStyle(r), w = c.getComputedStyle(a), A = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, ev = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, nv = r.style.scrollBehavior, tv = {
      position: a.style.position,
      height: a.style.height,
      width: a.style.width,
      boxSizing: a.style.boxSizing,
      overflowY: a.style.overflowY,
      overflowX: a.style.overflowX,
      scrollBehavior: a.style.scrollBehavior
    };
    const T = r.scrollHeight > r.clientHeight, _ = r.scrollWidth > r.clientWidth, N = C.overflowY === "scroll" || w.overflowY === "scroll", H = C.overflowX === "scroll" || w.overflowX === "scroll", q = Math.max(0, c.innerWidth - a.clientWidth), B = Math.max(0, c.innerHeight - a.clientHeight), j = parseFloat(w.marginTop) + parseFloat(w.marginBottom), P = parseFloat(w.marginLeft) + parseFloat(w.marginRight), te = Cu(r, a);
    if (m = l2(n), m) {
      r.style.scrollbarGutter = A, te.style.overflowY = "hidden", te.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: A,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (T || N) && (r.style.overflowY = "scroll"), (_ || H) && (r.style.overflowX = "scroll"), Object.assign(a.style, {
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
    Object.assign(r.style, ev), Object.assign(a.style, tv), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = nv);
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
class r2 {
  lockCount = 0;
  restore = null;
  timeoutLock = dr.create();
  timeoutUnlock = dr.create();
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
    if (lv(f, a, c)) {
      const m = new f.MutationObserver(() => {
        lv(f, a, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      m.observe(a, g), m.observe(c, g), this.restore = () => m.disconnect();
      return;
    }
    const d = _s || !n2(o);
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
  return n.pointerType === "" && n.isTrusted ? !0 : nu && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function vm(n) {
  return Xx ? !1 : !nu && n.width === 0 && n.height === 0 || nu && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Kd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function u2(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const Oh = "data-base-ui-focusable", f2 = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", ar = "ArrowLeft", sr = "ArrowRight", xm = "ArrowUp", Ru = "ArrowDown";
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
  if (r && ua(r)) {
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
function Fd(n, o) {
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
function Sm(n) {
  return Kt(n) && n.matches(f2);
}
function kh(n) {
  return n ? n.getAttribute("role") === "combobox" && Sm(n) : !1;
}
function Nh(n) {
  return n ? n.hasAttribute(Oh) ? n : n.querySelector(`[${Oh}]`) || n : null;
}
function sa(...n) {
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
}, Em = {
  ...Fx,
  position: "fixed",
  top: 0,
  left: 0
}, Cm = {
  ...Fx,
  position: "absolute"
}, lu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [a, c] = b.useState();
  Qe(() => {
    t2 && xr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: a
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: Em,
    "aria-hidden": a ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function Lc(n, o, r) {
  return Math.floor(n / o) !== r;
}
function ms(n, o) {
  return o < 0 || o >= n.length;
}
function Qd(n, o) {
  return tl(n.current, {
    disabledIndices: o
  });
}
function ov(n, o) {
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
  while (f >= 0 && f <= n.length - 1 && ou(n, f, a));
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
  let x = y, C;
  if (o.key === xm ? C = "up" : o.key === Ru && (C = "down"), C) {
    const w = [], M = [];
    let O = !1, A = 0;
    {
      let P = null, te = -1;
      n.forEach((se, fe) => {
        if (se == null)
          return;
        A += 1;
        const le = se.closest('[role="row"]');
        le && (O = !0), (le !== P || te === -1) && (P = le, te += 1, w[te] = []), w[te].push(fe), M[fe] = te;
      });
    }
    let T = !1, _ = 0;
    if (O)
      for (const P of w) {
        const te = P.length;
        te > _ && (_ = te), te !== d && (T = !0);
      }
    const N = T && A < n.length, H = _ || d, q = (P) => {
      if (!T || y === -1)
        return;
      const te = M[y];
      if (te == null)
        return;
      const se = w[te].indexOf(y), fe = P === "up" ? -1 : 1;
      for (let le = te + fe, he = 0; he < w.length; he += 1, le += fe) {
        if (le < 0 || le >= w.length) {
          if (!a || N)
            return;
          if (le = le < 0 ? w.length - 1 : 0, c) {
            const V = Math.min(se, w[le].length - 1), I = w[le][V] ?? w[le][0], F = c(o, y, I);
            le = M[F] ?? le;
          }
        }
        const be = w[le];
        for (let V = Math.min(se, be.length - 1); V >= 0; V -= 1) {
          const I = be[V];
          if (!ou(n, I, m))
            return I;
        }
      }
    }, B = (P) => {
      if (!N || y === -1)
        return;
      const te = y % H, se = P === "up" ? -H : H, fe = h - h % H, le = rr(h / H) + 1;
      for (let he = y - te + se, be = 0; be < le; be += 1, he += se) {
        if (he < 0 || he > h) {
          if (!a)
            return;
          he = he < 0 ? fe : 0;
        }
        const V = Math.min(he + H - 1, h);
        for (let I = Math.min(he + te, V); I >= he; I -= 1)
          if (!ou(n, I, m))
            return I;
      }
    };
    v && On(o);
    const j = q(C) ?? B(C);
    if (j !== void 0)
      x = j;
    else if (y === -1)
      x = C === "up" ? h : g;
    else if (x = tl(n, {
      startingIndex: y,
      amount: H,
      decrement: C === "up",
      disabledIndices: m
    }), a) {
      if (C === "up" && (y - H < g || x < 0)) {
        const P = y % H, te = h % H, se = h - (te - P);
        te === P ? x = h : x = te > P ? se : se - H, c && (x = c(o, y, x));
      }
      C === "down" && y + H > h && (x = tl(n, {
        startingIndex: y % H - H,
        amount: H,
        disabledIndices: m
      }), c && (x = c(o, y, x)));
    }
    ms(n, x) && (x = y);
  }
  if (r === "both") {
    const w = rr(y / d);
    o.key === (f ? ar : sr) && (v && On(o), y % d !== d - 1 ? (x = tl(n, {
      startingIndex: y,
      disabledIndices: m
    }), a && Lc(x, d, w) && (x = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (x = c(o, y, x)))) : a && (x = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (x = c(o, y, x))), Lc(x, d, w) && (x = y)), o.key === (f ? sr : ar) && (v && On(o), y % d !== 0 ? (x = tl(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: m
    }), a && Lc(x, d, w) && (x = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (x = c(o, y, x)))) : a && (x = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (x = c(o, y, x))), Lc(x, d, w) && (x = y));
    const M = rr(h / d) === w;
    ms(n, x) && (a && M ? (x = o.key === (f ? sr : ar) ? h : tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (x = c(o, y, x))) : x = y);
  }
  return x;
}
function ou(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !wu(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function m2(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function wu(n, o = n ? bl(n) : null) {
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
  return ua(r) ? r.host : null;
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
  const r = bl(n);
  return o ? r.display !== "none" : wu(n, r);
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
function Zd(n) {
  if (Bn(n) !== "input")
    return null;
  const o = n;
  return o.type === "radio" && o.name !== "" ? o : null;
}
function v2(n, o) {
  const r = Zd(n);
  if (!r)
    return !0;
  const a = o.find((c) => {
    const f = Zd(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return a ? a === r : o.find((c) => {
    const f = Zd(c);
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
function Rm(n) {
  return Zx(n) && $x(n) >= 0;
}
function t1(n) {
  const o = [];
  return Wx(n, o), o.filter(Zx);
}
function _u(n) {
  const o = t1(n);
  return o.filter((r) => $x(r) >= 0 && v2(r, o));
}
function n1(n, o) {
  const r = _u(n), a = r.length;
  if (a === 0)
    return;
  const c = Pl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : a - 1 : f + o;
  return r[d];
}
function l1(n) {
  return n1($t(n).body, 1) || n;
}
function o1(n) {
  return n1($t(n).body, -1) || n;
}
function fs(n, o) {
  const r = o || n.currentTarget, a = n.relatedTarget;
  return !a || !at(r, a);
}
function x2(n) {
  _u(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function iv(n) {
  const o = [];
  e1(n, "[data-tabindex]", o), o.forEach((r) => {
    const a = r.dataset.tabindex;
    delete r.dataset.tabindex, a ? r.setAttribute("tabindex", a) : r.removeAttribute("tabindex");
  });
}
function ps(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...ps(n, c.id, r)]);
}
function rv(n, o) {
  let r = [], a = n.find((c) => c.id === o)?.parentId;
  for (; a; ) {
    const c = n.find((f) => f.id === a);
    a = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function iu(n) {
  return `data-base-ui-${n}`;
}
let Vc = 0;
function Fc(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: a = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Vc);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (a)
    return f(), Xt;
  const d = requestAnimationFrame(f);
  return Vc = d, () => {
    Vc === d && (cancelAnimationFrame(d), Vc = 0);
  };
}
const $d = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, av = "data-base-ui-inert", Dh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let is = /* @__PURE__ */ new WeakMap(), Jd = 0;
function S2(n) {
  return Dh[n];
}
function i1(n) {
  return n ? ua(n) ? n.host : i1(n.parentNode) : null;
}
const sv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const a = i1(r);
  return n.contains(a) ? a : null;
}).filter((r) => r != null), cv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let a = r;
    for (; a && !o.has(a); )
      o.add(a), a = a.parentNode;
  }), o;
}, uv = (n, o, r) => {
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
  const g = sv(o, n), h = c ? uv(o, cv(g), new Set(g)) : [], y = [], v = [];
  if (f) {
    const x = $d[f], C = S2(f);
    m = C, d = x;
    const w = sv(o, Array.from(o.querySelectorAll("[aria-live]"))), M = g.concat(w);
    uv(o, cv(M), new Set(M)).forEach((A) => {
      const T = A.getAttribute(f), _ = T !== null && T !== "false", N = (x.get(A) || 0) + 1;
      x.set(A, N), y.push(A), N === 1 && _ && C.add(A), _ || A.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((x) => {
    const C = (is.get(x) || 0) + 1;
    is.set(x, C), v.push(x), C === 1 && x.setAttribute(av, "");
  }), Jd += 1, () => {
    d && y.forEach((x) => {
      const w = (d.get(x) || 0) - 1;
      d.set(x, w), w || (!m?.has(x) && f && x.removeAttribute(f), m?.delete(x));
    }), c && v.forEach((x) => {
      const C = (is.get(x) || 0) - 1;
      is.set(x, C), C || x.removeAttribute(av);
    }), Jd -= 1, Jd || ($d.inert = /* @__PURE__ */ new WeakMap(), $d["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Dh.inert = /* @__PURE__ */ new WeakSet(), Dh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), is = /* @__PURE__ */ new WeakMap());
  };
}
function fv(n, o = {}) {
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
}, r1 = /* @__PURE__ */ b.createContext(null), a1 = () => b.useContext(r1), A2 = iu("portal");
function M2(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: a = gl,
    elementProps: c
  } = n, f = hm(), m = a1()?.portalNode, [g, h] = b.useState(null), [y, v] = b.useState(null), x = Fe((O) => {
    O !== null && v(O);
  }), C = b.useRef(null);
  Qe(() => {
    if (r === null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    const O = (r && (Wh(r) ? r : r.current)) ?? m ?? document.body;
    if (O == null) {
      C.current && (C.current = null, v(null), h(null));
      return;
    }
    C.current !== O && (C.current = O, v(null), h(O));
  }, [r, m]);
  const w = Zl("div", a, {
    ref: [o, x],
    props: [{
      id: f,
      [A2]: ""
    }, c]
  }), M = g && w ? /* @__PURE__ */ da.createPortal(w, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(w) ? w.props.id : void 0,
    subtree: M
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
  } = M2({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: g
  }), x = b.useRef(null), C = b.useRef(null), w = b.useRef(null), M = b.useRef(null), [O, A] = b.useState(null), T = b.useRef(!1), _ = O?.modal, N = O?.open, H = !!O && !O.modal && O.open && !!h;
  b.useEffect(() => {
    if (!h || _)
      return;
    function B(j) {
      h && j.relatedTarget && fs(j) && (j.type === "focusin" ? T.current && (iv(h), T.current = !1) : (x2(h), T.current = !0));
    }
    return sa(Gt(h, "focusin", B, !0), Gt(h, "focusout", B, !0));
  }, [h, _]), Qe(() => {
    !h || N !== !0 || !T.current || (iv(h), T.current = !1);
  }, [N, h]);
  const q = b.useMemo(() => ({
    beforeOutsideRef: x,
    afterOutsideRef: C,
    beforeInsideRef: w,
    afterInsideRef: M,
    portalNode: h,
    setFocusManagerState: A
  }), [h]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [v, /* @__PURE__ */ S.jsxs(r1.Provider, {
      value: q,
      children: [H && h && /* @__PURE__ */ S.jsx(lu, {
        "data-type": "outside",
        ref: x,
        onFocus: (B) => {
          if (fs(B, h))
            w.current?.focus();
          else {
            const j = O ? O.domReference : null;
            o1(j)?.focus();
          }
        }
      }), H && h && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": y,
        style: _2
      }), h && /* @__PURE__ */ da.createPortal(d, h), H && h && /* @__PURE__ */ S.jsx(lu, {
        "data-type": "outside",
        ref: C,
        onFocus: (B) => {
          if (fs(B, h))
            M.current?.focus();
          else {
            const j = O ? O.domReference : null;
            l1(j)?.focus(), O?.closeOnFocusOut && O?.onOpenChange(!1, vt(vu, B.nativeEvent));
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
const k2 = /* @__PURE__ */ b.createContext(null), N2 = /* @__PURE__ */ b.createContext(null), s1 = () => b.useContext(k2)?.id || null, Au = (n) => {
  const o = b.useContext(N2);
  return n ?? o;
};
function z2(n, o) {
  const r = hn(kl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const dv = 20;
let Ri = [];
function wm() {
  Ri = Ri.filter((n) => n.deref()?.isConnected);
}
function hv(n) {
  wm(), n && Bn(n) !== "body" && (Ri.push(new WeakRef(n)), Ri.length > dv && (Ri = Ri.slice(-dv)));
}
function mv() {
  return wm(), Ri[Ri.length - 1]?.deref();
}
function D2(n) {
  return n ? Rm(n) ? n : _u(n)[0] || n : null;
}
function pv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = t1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return Rm(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
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
    beforeContentFocusGuardRef: x,
    externalTree: C,
    getInsideElements: w
  } = n, M = "rootStore" in o ? o.rootStore : o, O = M.useState("open"), A = M.useState("domReferenceElement"), T = M.useState("floatingElement"), {
    events: _,
    dataRef: N
  } = M.context, H = Fe(() => N.current.floatingContext?.nodeId), q = c === !1, B = kh(A) && q, j = pl(c), P = pl(f), te = pl(h), se = pl(O), fe = Au(C), le = a1(), he = b.useRef(!1), be = b.useRef(!1), V = b.useRef(!1), I = b.useRef(null), F = b.useRef(""), ve = b.useRef(""), ae = b.useRef(null), z = b.useRef(null), K = fr(ae, x, le?.beforeInsideRef), ne = fr(z, le?.afterInsideRef), oe = ki(), pe = ki(), we = ds(), qe = le != null, Ae = Nh(T), Te = Fe((ze = Ae) => ze ? _u(ze) : []), it = Fe(() => w?.().filter((ze) => ze != null) ?? []);
  b.useEffect(() => {
    if (a || !m)
      return;
    function ze(Ne) {
      Ne.key === "Tab" && at(Ae, Pl($t(Ae))) && Te().length === 0 && !B && On(Ne);
    }
    const et = $t(Ae);
    return Gt(et, "keydown", ze);
  }, [a, Ae, m, B, Te]), b.useEffect(() => {
    if (a || !O)
      return;
    const ze = $t(Ae);
    function et() {
      V.current = !1;
    }
    function Ne(Ue) {
      const _e = kl(Ue), Ze = it(), Oe = at(T, _e) || at(A, _e) || at(le?.portalNode, _e) || Ze.some((Je) => Je === _e || at(Je, _e));
      V.current = !Oe, ve.current = Ue.pointerType || "keyboard", _e?.closest(`[${R2}]`) && (be.current = !0, pe.start(0, () => {
        be.current = !1;
      }));
    }
    function Le() {
      ve.current = "keyboard";
    }
    return sa(
      Gt(ze, "pointerdown", Ne, !0),
      Gt(ze, "pointerup", et, !0),
      Gt(ze, "pointercancel", et, !0),
      Gt(ze, "keydown", Le, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [a, T, A, Ae, O, le, pe, it]), b.useEffect(() => {
    if (a || !g)
      return;
    const ze = $t(Ae);
    function et() {
      be.current = !0, pe.start(0, () => {
        be.current = !1;
      });
    }
    function Ne(Ze) {
      const Oe = kl(Ze);
      Rm(Oe) && (I.current = Oe);
    }
    function Le(Ze) {
      const Oe = Ze.relatedTarget, Je = Ze.currentTarget, tt = kl(Ze);
      m && Oe == null && tt != null && at(T, tt) && hv(tt), queueMicrotask(() => {
        const Xe = H(), ye = M.context.triggerElements, Q = it(), ce = Oe?.hasAttribute(iu("focus-guard")) && [ae.current, z.current, le?.beforeInsideRef.current, le?.afterInsideRef.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, Yo(v), Yo(y)].includes(Oe), Ie = !(at(A, Oe) || at(T, Oe) || at(Oe, T) || at(le?.portalNode, Oe) || Q.some((Ce) => Ce === Oe || at(Ce, Oe)) || ye.hasMatchingElement((Ce) => at(Ce, Oe)) || ce || fe && (ps(fe.nodesRef.current, Xe).find((Ce) => at(Ce.context?.elements.floating, Oe) || at(Ce.context?.elements.domReference, Oe)) || rv(fe.nodesRef.current, Xe).find((Ce) => [Ce.context?.elements.floating, Nh(Ce.context?.elements.floating)].includes(Oe) || Ce.context?.elements.domReference === Oe)));
        if (Je === A && Ae && pv(Ae), d && Je !== A && !wu(tt) && Pl(ze) === ze.body) {
          if (Kt(Ae) && (Ae.focus(), d === "popup")) {
            we.request(() => {
              Ae.focus();
            });
            return;
          }
          const Ce = Te(), Ge = I.current, nt = (Ge && Ce.includes(Ge) ? Ge : null) || Ce[Ce.length - 1] || Ae;
          Kt(nt) && nt.focus();
        }
        if (N.current.insideReactTree) {
          N.current.insideReactTree = !1;
          return;
        }
        (B || !m) && Oe && Ie && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (B || Oe !== mv()) && (he.current = !0, M.setOpen(!1, vt(vu, Ze)));
      });
    }
    function Ue() {
      V.current || (N.current.insideReactTree = !0, oe.start(0, () => {
        N.current.insideReactTree = !1;
      }));
    }
    const _e = Kt(A) ? A : null;
    if (!(!T && !_e))
      return sa(_e && Gt(_e, "focusout", Le), _e && Gt(_e, "pointerdown", et), T && Gt(T, "focusin", Ne), T && Gt(T, "focusout", Le), T && le && Gt(T, "focusout", Ue, !0));
  }, [a, A, T, Ae, m, fe, le, M, g, d, Te, B, H, N, oe, pe, we, y, v, it]), b.useEffect(() => {
    if (a || !T || !O)
      return;
    const ze = Array.from(le?.portalNode?.querySelectorAll(`[${iu("portal")}]`) || []), Ne = (fe ? rv(fe.nodesRef.current, H()) : []).find((Je) => kh(Je.context?.elements.domReference || null))?.context?.elements.domReference, Ue = [...[T, ...ze, ae.current, z.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, ...it()], Ne, Yo(v), Yo(y), B ? A : null].filter((Je) => Je != null), _e = fv(Ue, {
      ariaHidden: m || B,
      mark: !1
    }), Ze = [T, ...ze].filter((Je) => Je != null), Oe = fv(Ze);
    return () => {
      Oe(), _e();
    };
  }, [O, a, A, T, m, le, B, fe, H, y, v, it]), Qe(() => {
    if (!O || a || !Kt(Ae))
      return;
    F.current = "", ve.current = "";
    const ze = $t(Ae), et = Pl(ze);
    queueMicrotask(() => {
      const Ne = j.current, Le = typeof Ne == "function" ? Ne(te.current || "") : Ne;
      if (Le === void 0 || Le === !1 || at(Ae, et))
        return;
      let _e = null;
      const Ze = () => (_e == null && (_e = Te(Ae)), _e[0] || Ae);
      let Oe;
      Le === !0 || Le === null ? Oe = Ze() : Oe = Yo(Le), Oe = Oe || Ze();
      const Je = at(Ae, Pl(ze));
      Fc(Oe, {
        preventScroll: Oe === Ae,
        shouldFocus() {
          if (!se.current)
            return !1;
          if (Je)
            return !0;
          const tt = Pl(ze);
          return !(tt !== Oe && at(Ae, tt));
        }
      });
    });
  }, [a, O, Ae, Te, j, te, se]), Qe(() => {
    if (a || !Ae)
      return;
    const ze = $t(Ae), et = Pl(ze), Ne = te.current == null;
    hv(et);
    function Le(_e) {
      if (_e.open || (F.current = z2(_e.nativeEvent, ve.current)), _e.reason === zM && _e.nativeEvent.type === "mouseleave" && (he.current = !0), _e.reason === mm)
        if (_e.nested)
          he.current = !1;
        else if (Kx(_e.nativeEvent) || vm(_e.nativeEvent))
          he.current = !1;
        else {
          let Ze = !1;
          $t(Ae).createElement("div").focus({
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
      const Je = A?.isConnected ? A : null, tt = et?.isConnected && Bn(et) !== "body" ? et : null;
      let Xe = Ne ? tt || Je : Je || tt;
      return Xe || (Xe = mv() || null), typeof Oe == "boolean" ? Xe : Yo(Oe) || Xe || null;
    }
    return () => {
      _.off("openchange", Le);
      const _e = Pl(ze), Ze = it(), Oe = at(T, _e) || Ze.some((ye) => ye === _e || at(ye, _e)) || fe && ps(fe.nodesRef.current, H(), !1).some((ye) => at(ye.context?.elements.floating, _e)), Je = P.current, tt = F.current, Xe = Ue(tt);
      queueMicrotask(() => {
        const ye = D2(Xe), Q = typeof Je != "boolean";
        if (Je && !he.current && Kt(ye) && // If the focus moved somewhere else after mount, avoid returning focus
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
  }, [a, T, Ae, P, te, _, fe, A, H, it]), Qe(() => {
    if (!xr || O || !T)
      return;
    const ze = Pl($t(T));
    !Kt(ze) || !Sm(ze) || at(T, ze) && ze.blur();
  }, [O, T]), Qe(() => {
    if (!(a || !le))
      return le.setFocusManagerState({
        modal: m,
        closeOnFocusOut: g,
        open: O,
        onOpenChange: M.setOpen,
        domReference: A
      }), () => {
        le.setFocusManagerState(null);
      };
  }, [a, le, m, O, M, g, A]), Qe(() => {
    if (!(a || !Ae))
      return pv(Ae), () => {
        queueMicrotask(wm);
      };
  }, [a, Ae]);
  const pt = !a && (m ? !B : !0) && (qe || m);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [pt && /* @__PURE__ */ S.jsx(lu, {
      "data-type": "inside",
      ref: K,
      onFocus: (ze) => {
        if (m) {
          const et = Te();
          Fc(et[et.length - 1]);
        } else le?.portalNode && (he.current = !1, fs(ze, le.portalNode) ? l1(A)?.focus() : Yo(v ?? le.beforeOutsideRef)?.focus());
      }
    }), r, pt && /* @__PURE__ */ S.jsx(lu, {
      "data-type": "inside",
      ref: ne,
      onFocus: (ze) => {
        m ? Fc(Te()[0]) : le?.portalNode && (g && (he.current = !0), fs(ze, le.portalNode) ? o1(A)?.focus() : Yo(y ?? le.afterOutsideRef)?.focus());
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
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, v = b.useRef(void 0), x = ds(), C = ki(), w = b.useMemo(() => {
    function M(A, T, _, N) {
      const H = vt(g, T, _);
      A && N === "touch" && m > 0 ? C.start(m, () => {
        h.setOpen(!0, H);
      }) : h.setOpen(A, H);
    }
    function O(A, T, _) {
      const N = y.current.openEvent, H = h.select("domReferenceElement") !== T;
      return A && H || !A || !c ? !0 : N && d ? !_(N.type) : !1;
    }
    return {
      onPointerDown(A) {
        v.current = Kd(A.pointerType) && vm(A.nativeEvent) ? "virtual" : A.pointerType;
      },
      onMouseDown(A) {
        const T = v.current, _ = A.nativeEvent, N = h.select("open");
        if (A.button !== 0 || a === "click" || Kd(T) && f)
          return;
        const H = O(N, A.currentTarget, (j) => j === "click" || j === "mousedown"), q = kl(_);
        if (Sm(q)) {
          M(H, _, q, T);
          return;
        }
        const B = A.currentTarget;
        x.request(() => {
          M(H, _, B, T);
        });
      },
      onClick(A) {
        if (a === "mousedown-only")
          return;
        const T = v.current;
        if (a === "mousedown" && T) {
          v.current = void 0;
          return;
        }
        if (Kd(T) && f)
          return;
        const _ = h.select("open"), N = O(_, A.currentTarget, (H) => H === "click" || H === "mousedown" || H === "keydown" || H === "keyup");
        M(N, A.nativeEvent, A.currentTarget, T);
      },
      onKeyDown() {
        v.current = void 0;
      }
    };
  }, [y, a, f, g, h, d, c, x, C, m]);
  return b.useMemo(() => r ? {
    reference: w
  } : gl, [r, w]);
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
function H2(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: a = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = L2,
    bubbles: m,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), v = h.useState("floatingElement"), {
    dataRef: x
  } = h.context, C = Au(g), w = Fe(typeof c == "function" ? c : () => !1), M = typeof c == "function" ? w : c, O = M !== !1, A = Fe(() => f), {
    escapeKey: T,
    outsidePress: _
  } = V2(m), N = b.useRef(!1), H = b.useRef(!1), q = b.useRef(!1), B = b.useRef(!1), j = b.useRef(""), P = b.useRef(null), te = ki(), se = ki(), fe = Fe(() => {
    se.clear(), x.current.insideReactTree = !1;
  }), le = Fe((K) => {
    const ne = x.current.floatingContext?.nodeId;
    return (C ? ps(C.nodesRef.current, ne) : []).some((pe) => pe.context?.open && !pe.context.dataRef.current[K]);
  }), he = Fe((K) => Fd(K, h.select("floatingElement")) || Fd(K, h.select("domReferenceElement"))), be = Fe((K) => {
    d() && h.setOpen(!1, vt(qx, K.nativeEvent));
  }), V = Fe((K) => {
    if (!y || !r || !a || K.key !== "Escape" || B.current || !T && le("__escapeKeyBubbles"))
      return;
    const ne = c2(K) ? K.nativeEvent : K, oe = vt(pm, ne);
    h.setOpen(!1, oe), oe.isCanceled || K.preventDefault(), !T && !oe.isPropagationAllowed && K.stopPropagation();
  }), I = Fe(() => {
    x.current.insideReactTree = !0, se.start(0, fe);
  }), F = Fe((K) => {
    if (!y || !r || K.button !== 0)
      return;
    const ne = kl(K.nativeEvent);
    at(h.select("floatingElement"), ne) && (N.current || (N.current = !0, H.current = !1));
  }), ve = Fe((K) => {
    !y || !r || (K.defaultPrevented || K.nativeEvent.defaultPrevented) && N.current && (H.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return fe;
    x.current.__escapeKeyBubbles = T, x.current.__outsidePressBubbles = _;
    const K = new dr(), ne = new dr();
    function oe() {
      K.clear(), B.current = !0;
    }
    function pe() {
      K.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        xr ? 5 : 0,
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
      N.current = !1, H.current = !1;
    }
    function Ae() {
      const Q = j.current, ce = Q === "pen" || !Q ? "mouse" : Q, Ie = A(), Ce = typeof Ie == "function" ? Ie() : Ie;
      return typeof Ce == "string" ? Ce : Ce[ce];
    }
    function Te(Q) {
      const ce = Ae();
      return ce === "intentional" && Q.type !== "click" || ce === "sloppy" && Q.type === "click";
    }
    function it(Q) {
      const ce = x.current.floatingContext?.nodeId, Ie = C && ps(C.nodesRef.current, ce).some((Ce) => Fd(Q, Ce.context?.elements.floating));
      return he(Q) || Ie;
    }
    function pt(Q) {
      if (Te(Q)) {
        Q.type !== "click" && !he(Q) && (ne.clear(), q.current = !1), fe();
        return;
      }
      if (x.current.insideReactTree) {
        fe();
        return;
      }
      const ce = kl(Q), Ie = `[${iu("inert")}]`, Ce = dn(ce) ? ce.getRootNode() : null, Ge = Array.from((ua(Ce) ? Ce : $t(h.select("floatingElement"))).querySelectorAll(Ie)), nt = h.context.triggerElements;
      if (ce && (nt.hasElement(ce) || nt.hasMatchingElement((St) => at(St, ce))))
        return;
      let Tt = dn(ce) ? ce : null;
      for (; Tt && !wi(Tt); ) {
        const St = Ti(Tt);
        if (wi(St) || !dn(St))
          break;
        Tt = St;
      }
      if (!(Ge.length && dn(ce) && !d2(ce) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !at(ce, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((St) => !at(Tt, St)))) {
        if (Kt(ce) && !("touches" in Q)) {
          const St = wi(ce), Bt = bl(ce), Nt = /auto|scroll/, xt = St || Nt.test(Bt.overflowX), on = St || Nt.test(Bt.overflowY), st = xt && ce.clientWidth > 0 && ce.scrollWidth > ce.clientWidth, Et = on && ce.clientHeight > 0 && ce.scrollHeight > ce.clientHeight, Jt = Bt.direction === "rtl", Rn = Et && (Jt ? Q.offsetX <= ce.offsetWidth - ce.clientWidth : Q.offsetX > ce.clientWidth), Ft = st && Q.offsetY > ce.clientHeight;
          if (Rn || Ft)
            return;
        }
        if (!it(Q)) {
          if (Ae() === "intentional" && q.current) {
            ne.clear(), q.current = !1;
            return;
          }
          typeof M == "function" && !M(Q) || le("__outsidePressBubbles") || (h.setOpen(!1, vt(mm, Q)), fe());
        }
      }
    }
    function ze(Q) {
      Ae() !== "sloppy" || Q.pointerType === "touch" || !h.select("open") || !r || he(Q) || pt(Q);
    }
    function et(Q) {
      if (Ae() !== "sloppy" || !h.select("open") || !r || he(Q))
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
    function Ne(Q, ce) {
      const Ie = kl(Q);
      if (!Ie)
        return;
      const Ce = Gt(Ie, Q.type, () => {
        ce(Q), Ce();
      });
    }
    function Le(Q) {
      j.current = "touch", Ne(Q, et);
    }
    function Ue(Q) {
      te.clear(), Q.type === "pointerdown" && (j.current = Q.pointerType), !(Q.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && Ne(Q, (ce) => {
        ce.type === "pointerdown" ? ze(ce) : pt(ce);
      });
    }
    function _e(Q) {
      if (!N.current)
        return;
      const ce = H.current;
      if (qe(), Ae() === "intentional") {
        if (Q.type === "pointercancel") {
          ce && we();
          return;
        }
        if (!it(Q)) {
          if (ce) {
            we();
            return;
          }
          typeof M == "function" && !M(Q) || (ne.clear(), q.current = !0, fe());
        }
      }
    }
    function Ze(Q) {
      if (Ae() !== "sloppy" || !P.current || he(Q))
        return;
      const ce = Q.touches[0];
      if (!ce)
        return;
      const Ie = Math.abs(ce.clientX - P.current.startX), Ce = Math.abs(ce.clientY - P.current.startY), Ge = Math.sqrt(Ie * Ie + Ce * Ce);
      Ge > 5 && (P.current.dismissOnTouchEnd = !0), Ge > 10 && (pt(Q), te.clear(), P.current = null);
    }
    function Oe(Q) {
      Ne(Q, Ze);
    }
    function Je(Q) {
      Ae() !== "sloppy" || !P.current || he(Q) || (P.current.dismissOnTouchEnd && pt(Q), te.clear(), P.current = null);
    }
    function tt(Q) {
      Ne(Q, Je);
    }
    const Xe = $t(v), ye = sa(a && sa(Gt(Xe, "keydown", V), Gt(Xe, "compositionstart", oe), Gt(Xe, "compositionend", pe)), O && sa(Gt(Xe, "click", Ue, !0), Gt(Xe, "pointerdown", Ue, !0), Gt(Xe, "pointerup", _e, !0), Gt(Xe, "pointercancel", _e, !0), Gt(Xe, "mousedown", Ue, !0), Gt(Xe, "mouseup", _e, !0), Gt(Xe, "touchstart", Le, !0), Gt(Xe, "touchmove", Oe, !0), Gt(Xe, "touchend", tt, !0)));
    return () => {
      ye(), K.clear(), ne.clear(), qe(), q.current = !1, fe();
    };
  }, [x, v, a, O, M, y, r, T, _, V, fe, A, le, he, C, h, te]);
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
    onClickCapture: I,
    onMouseDownCapture(K) {
      I(), F(K);
    },
    onPointerDownCapture(K) {
      I(), F(K);
    },
    onMouseUpCapture: I,
    onTouchEndCapture: I,
    onTouchMoveCapture: I
  }), [V, I, F, ve]);
  return b.useMemo(() => r ? {
    reference: ae,
    floating: z,
    trigger: ae
  } : {}, [r, ae, z]);
}
var Wd = { exports: {} }, eh = {};
var gv;
function I2() {
  if (gv) return eh;
  gv = 1;
  var n = ys();
  function o(v, x) {
    return v === x && (v !== 0 || 1 / v === 1 / x) || v !== v && x !== x;
  }
  var r = typeof Object.is == "function" ? Object.is : o, a = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(v, x) {
    var C = x(), w = a({ inst: { value: C, getSnapshot: x } }), M = w[0].inst, O = w[1];
    return f(
      function() {
        M.value = C, M.getSnapshot = x, g(M) && O({ inst: M });
      },
      [v, C, x]
    ), c(
      function() {
        return g(M) && O({ inst: M }), v(function() {
          g(M) && O({ inst: M });
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
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return eh.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, eh;
}
var bv;
function u1() {
  return bv || (bv = 1, Wd.exports = I2()), Wd.exports;
}
var U2 = u1(), th = { exports: {} }, nh = {};
var yv;
function B2() {
  if (yv) return nh;
  yv = 1;
  var n = ys(), o = u1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, g = n.useDebugValue;
  return nh.useSyncExternalStoreWithSelector = function(h, y, v, x, C) {
    var w = f(null);
    if (w.current === null) {
      var M = { hasValue: !1, value: null };
      w.current = M;
    } else M = w.current;
    w = m(
      function() {
        function A(q) {
          if (!T) {
            if (T = !0, _ = q, q = x(q), C !== void 0 && M.hasValue) {
              var B = M.value;
              if (C(B, q))
                return N = B;
            }
            return N = q;
          }
          if (B = N, a(_, q)) return B;
          var j = x(q);
          return C !== void 0 && C(B, j) ? (_ = q, B) : (_ = q, N = j);
        }
        var T = !1, _, N, H = v === void 0 ? null : v;
        return [
          function() {
            return A(y());
          },
          H === null ? void 0 : function() {
            return A(H());
          }
        ];
      },
      [y, v, x, C]
    );
    var O = c(h, w[0], w[1]);
    return d(
      function() {
        M.hasValue = !0, M.value = O;
      },
      [O]
    ), g(O), O;
  }, nh;
}
var vv;
function G2() {
  return vv || (vv = 1, th.exports = B2()), th.exports;
}
var Y2 = G2();
const q2 = um(19), P2 = q2 ? K2 : F2;
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
  } = n, c = hm(), f = s1() != null, d = Nl(() => new $2({
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
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), g = o.useState("floatingId"), [h, y] = b.useState(null), [v, x] = b.useState(void 0), [C, w] = b.useState(void 0), M = b.useRef(null), O = Au(a), A = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), T = q_({
    ...n,
    elements: {
      ...A,
      ...h && {
        reference: h
      }
    }
  }), _ = dn(v) ? v : null, N = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", v ?? null), o.useSyncedValue("domReferenceElement", v === void 0 ? d : _), o.useSyncedValue("floatingElement", N);
  const H = b.useCallback((se) => {
    const fe = dn(se) ? {
      getBoundingClientRect: () => se.getBoundingClientRect(),
      getClientRects: () => se.getClientRects(),
      contextElement: se
    } : se;
    y(fe), T.refs.setReference(fe);
  }, [T.refs]), q = b.useCallback((se) => {
    (dn(se) || se === null) && (M.current = se, x(se)), (dn(T.refs.reference.current) || T.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    se !== null && !dn(se)) && T.refs.setReference(se);
  }, [T.refs, x]), B = b.useCallback((se) => {
    w(se), T.refs.setFloating(se);
  }, [T.refs]), j = b.useMemo(() => ({
    ...T.refs,
    setReference: q,
    setFloating: B,
    setPositionReference: H,
    domReference: M
  }), [T.refs, q, B, H]), P = b.useMemo(() => ({
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
    d && (M.current = d);
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
function xv(n) {
  return xr && n.movementX === 0 && n.movementY === 0;
}
function Mu(n, o, r) {
  switch (n) {
    case "vertical":
      return o;
    case "horizontal":
      return r;
    default:
      return o || r;
  }
}
function Hc(n, o) {
  return Mu(o, n === xm || n === Ru, n === ar || n === sr);
}
function lh(n, o, r) {
  return Mu(o, n === Ru, r ? n === ar : n === sr) || n === "Enter" || n === " " || n === "";
}
function oT(n, o, r) {
  return Mu(o, r ? n === ar : n === sr, n === Ru);
}
function iT(n, o, r, a) {
  const c = r ? n === sr : n === ar, f = n === xm;
  return o === "both" || o === "horizontal" && a ? n === lT : Mu(o, c, f);
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
    focusItemOnOpen: x = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: w = !0,
    disabledIndices: M = void 0,
    orientation: O = "vertical",
    parentOrientation: A,
    id: T,
    resetOnPointerLeave: _ = !0,
    externalTree: N,
    grid: H
  } = o, q = H != null, B = "rootStore" in n ? n.rootStore : n, j = B.useState("open"), P = B.useState("floatingElement"), te = B.useState("domReferenceElement"), se = B.context.dataRef, fe = Nh(P), le = kh(te), he = pl(fe), be = s1(), V = Au(N), I = b.useRef(x), F = b.useRef(d ?? -1), ve = b.useRef(null), ae = b.useRef(!0), z = Fe((Q) => {
    c(F.current === -1 ? null : F.current, Q);
  }), K = b.useRef(!!P), ne = b.useRef(j), oe = b.useRef(!1), pe = b.useRef(!1), we = b.useRef(null), qe = pl(M), Ae = pl(j), Te = pl(d), it = pl(_), pt = ds(), ze = ds(), et = Fe(() => {
    function Q(Ge) {
      v ? V?.events.emit("virtualfocus", Ge) : we.current = Fc(Ge, {
        sync: oe.current,
        preventScroll: !0
      });
    }
    const ce = r.current[F.current], Ie = pe.current;
    ce && Q(ce), (oe.current ? (Ge) => Ge() : (Ge) => pt.request(Ge))(() => {
      const Ge = r.current[F.current] || ce;
      if (!Ge)
        return;
      ce || Q(Ge), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      Oe && (Ie || !ae.current) && Ge.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Qe(() => {
    se.current.orientation = O;
  }, [se, O]), Qe(() => {
    f && (j && P ? (F.current = d ?? -1, I.current && d != null && (pe.current = !0, z())) : K.current && (F.current = -1, z()));
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
          if (K.current && (F.current = -1, et()), (!ne.current || !K.current) && I.current && (ve.current != null || I.current === !0 && ve.current == null)) {
            let Q = 0;
            const ce = () => {
              r.current[0] == null ? (Q < 2 && (Q ? (Ce) => ze.request(Ce) : queueMicrotask)(ce), Q += 1) : (F.current = ve.current == null || lh(ve.current, O, y) || h ? Qd(r) : ov(r), ve.current = null, z());
            };
            ce();
          }
        } else ms(r.current, a) || (F.current = a, et(), pe.current = !1);
    }
  }, [f, j, P, a, Te, h, r, O, y, z, et, ze]), Qe(() => {
    if (!f || P || !V || v || !K.current)
      return;
    const Q = V.nodesRef.current, ce = Q.find((Ge) => Ge.id === be)?.context?.elements.floating, Ie = Pl($t(te ?? ce ?? null)), Ce = Q.some((Ge) => Ge.context && at(Ge.context.elements.floating, Ie));
    ce && !Ce && ae.current && ce.focus({
      preventScroll: !0
    });
  }, [f, P, te, V, be, v]), Qe(() => {
    ne.current = j, K.current = !!P;
  }), Qe(() => {
    j || (ve.current = null, I.current = x);
  }, [j, x]);
  const Ne = a != null, Le = Fe((Q) => {
    if (!Ae.current)
      return;
    const ce = r.current.indexOf(Q.currentTarget);
    ce !== -1 && (F.current !== ce || a !== ce) && (F.current = ce, z(Q));
  }), Ue = Fe(() => A ?? V?.nodesRef.current.find((Q) => Q.id === be)?.context?.dataRef?.current.orientation), _e = Fe(() => Qd(r, qe.current)), Ze = Fe((Q) => {
    if (ae.current = !1, oe.current = !0, Q.which === 229 || !Ae.current && Q.currentTarget === he.current)
      return;
    if (h && iT(Q.key, O, y, q)) {
      Hc(Q.key, Ue()) || On(Q), B.setOpen(!1, vt(Th, Q.nativeEvent)), Kt(te) && (v ? V?.events.emit("virtualfocus", te) : te.focus());
      return;
    }
    const ce = F.current, Ie = Qd(r, M), Ce = ov(r, M);
    if (le || (Q.key === "Home" && (On(Q), F.current = Ie, z(Q)), Q.key === "End" && (On(Q), F.current = Ce, z(Q))), H != null) {
      const Ge = H(Q, F.current, r, O, g, y, M, Ie, Ce);
      if (Ge != null && (F.current = Ge, z(Q)), O === "both")
        return;
    }
    if (Hc(Q.key, O)) {
      if (On(Q), j && !v && Pl(Q.currentTarget.ownerDocument) === Q.currentTarget) {
        F.current = lh(Q.key, O, y) ? Ie : Ce, z(Q);
        return;
      }
      lh(Q.key, O, y) ? g ? ce >= Ce ? m && ce !== r.current.length ? F.current = -1 : (oe.current = !1, F.current = Ie) : F.current = tl(r.current, {
        startingIndex: ce,
        disabledIndices: M
      }) : F.current = Math.min(Ce, tl(r.current, {
        startingIndex: ce,
        disabledIndices: M
      })) : g ? ce <= Ie ? m && ce !== -1 ? F.current = r.current.length : (oe.current = !1, F.current = Ce) : F.current = tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: M
      }) : F.current = Math.max(Ie, tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: M
      })), ms(r.current, F.current) && (F.current = -1), z(Q);
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
      xv(ce) || (oe.current = !0, pe.current = !1, C && Le(ce));
    },
    onPointerLeave(ce) {
      if (!Ae.current || !ae.current || ce.pointerType === "touch")
        return;
      oe.current = !0;
      const Ie = ce.relatedTarget;
      if (!(!C || r.current.includes(Ie)) && it.current && (we.current?.(), we.current = null, F.current = -1, z(ce), !v)) {
        const Ce = he.current, Ge = Pl($t(Ce));
        Ce && at(Ce, Ge) && Ce.focus({
          preventScroll: !0
        });
      }
    }
  }), [Le, Ae, he, C, r, z, it, v]), Je = b.useMemo(() => v && j && Ne && {
    "aria-activedescendant": `${T}-${a}`
  }, [v, j, Ne, T, a]), tt = b.useMemo(() => ({
    "aria-orientation": O === "both" ? void 0 : O,
    ...le ? {} : Je,
    onKeyDown(Q) {
      if (Q.key === "Tab" && Q.shiftKey && j && !v) {
        const ce = kl(Q.nativeEvent);
        if (ce && !at(he.current, ce))
          return;
        On(Q), B.setOpen(!1, vt(vu, Q.nativeEvent)), Kt(te) && te.focus();
        return;
      }
      Ze(Q);
    },
    onPointerMove(Q) {
      xv(Q) || (ae.current = !0);
    }
  }), [Je, Ze, he, O, le, B, j, v, te]), Xe = b.useMemo(() => {
    function Q(Ce) {
      B.setOpen(!0, vt(Th, Ce.nativeEvent, Ce.currentTarget));
    }
    function ce(Ce) {
      x === "auto" && Kx(Ce.nativeEvent) && (I.current = !v);
    }
    function Ie(Ce) {
      I.current = x, x === "auto" && vm(Ce.nativeEvent) && (I.current = !0);
    }
    return {
      onKeyDown(Ce) {
        const Ge = B.select("open");
        ae.current = !1;
        const nt = Ce.key.startsWith("Arrow"), Tt = oT(Ce.key, Ue(), y), St = Hc(Ce.key, O), Bt = (h ? Tt : St) || Ce.key === "Enter" || Ce.key.trim() === "";
        if (v && Ge)
          return Ze(Ce);
        if (!(!Ge && !w && nt)) {
          if (Bt) {
            const Nt = Hc(Ce.key, Ue());
            ve.current = h && Nt ? null : Ce.key;
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
      onPointerDown: Ie,
      onPointerEnter: Ie,
      onMouseDown: ce,
      onClick: ce
    };
  }, [Ze, x, _e, h, z, B, w, O, Ue, y, Te, v]), ye = b.useMemo(() => ({
    ...Je,
    ...Xe
  }), [Je, Xe]);
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
  } = o, v = "rootStore" in n ? n.rootStore : n, x = v.useState("open"), C = ki(), w = b.useRef(""), M = b.useRef(y ?? c ?? -1), O = b.useRef(null), A = Fe((N) => {
    function H(he) {
      return a?.current[he];
    }
    function q(he) {
      const be = H(he);
      return be && !wu(be) || be?.matches(":disabled") ? !1 : d == null || !ou(oa, he, d);
    }
    function B(he, be, V = 0) {
      if (he.length === 0)
        return -1;
      const I = (V % he.length + he.length) % he.length, F = be.toLowerCase();
      for (let ve = 0; ve < he.length; ve += 1) {
        const ae = (I + ve) % he.length;
        if (!(!he[ae]?.toLowerCase().startsWith(F) || !q(ae)))
          return ae;
      }
      return -1;
    }
    const j = r.current;
    if (w.current.length > 0 && N.key === " " && (On(N), m?.(!0)), w.current.length > 0 && w.current[0] !== " " && B(j, w.current) === -1 && N.key !== " " && m?.(!1), j == null || // Character key.
    N.key.length !== 1 || // Modifier key.
    N.ctrlKey || N.metaKey || N.altKey)
      return;
    x && N.key !== " " && (On(N), m?.(!0));
    const P = w.current === "";
    P && (M.current = y ?? c ?? -1), j.every((he, be) => he && q(be) ? he[0]?.toLowerCase() !== he[1]?.toLowerCase() : !0) && w.current === N.key && (w.current = "", M.current = O.current), w.current += N.key, C.start(h, () => {
      w.current = "", M.current = O.current, m?.(!1);
    });
    const fe = ((P ? y ?? c ?? -1 : M.current) ?? 0) + 1, le = B(j, w.current, fe);
    le !== -1 ? (f?.(le), O.current = le) : N.key !== " " && (w.current = "", m?.(!1));
  }), T = Fe((N) => {
    const H = N.relatedTarget, q = v.select("domReferenceElement"), B = v.select("floatingElement");
    at(q, H) || at(B, H) || (C.clear(), w.current = "", M.current = O.current, m?.(!1));
  });
  Qe(() => {
    !x && y !== null || (C.clear(), O.current = null, w.current !== "" && (w.current = ""));
  }, [x, y, C]);
  const _ = b.useMemo(() => ({
    onKeyDown: A,
    onBlur: T
  }), [A, T]);
  return b.useMemo(() => g ? {
    reference: _,
    floating: _
  } : {}, [g, _]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = $y.startingStyle] = "startingStyle", n[n.endingStyle = $y.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
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
}, _m = {
  open(n) {
    return n ? uT : fT;
  },
  anchorHidden(n) {
    return n ? dT : null;
  }
};
({
  ..._m,
  ...xu
});
function pT(n) {
  return um(19) ? n : n ? "true" : void 0;
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
function ia(n, o) {
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
    (_s ? "touch" : ""));
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
  return ia(n, (c) => {
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
  return ms(r.current, y) ? void 0 : y;
}
const d1 = /* @__PURE__ */ b.createContext(void 0), h1 = /* @__PURE__ */ b.createContext(void 0), m1 = /* @__PURE__ */ b.createContext(void 0), p1 = /* @__PURE__ */ b.createContext(!1), g1 = /* @__PURE__ */ b.createContext("");
function zl() {
  const n = b.useContext(d1);
  if (!n)
    throw new Error(Eo(22));
  return n;
}
function Tu() {
  const n = b.useContext(h1);
  if (!n)
    throw new Error(Eo(23));
  return n;
}
function As() {
  const n = b.useContext(m1);
  if (!n)
    throw new Error(Eo(24));
  return n;
}
function Am() {
  return b.useContext(g1);
}
function ET() {
  return b.useContext(p1);
}
const CT = (n, o) => Object.is(n, o);
function Ni(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function RT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((a) => a === void 0 ? !1 : Ni(o, a, r));
}
function b1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((a) => a === void 0 ? !1 : Ni(a, o, r));
}
function oh(n, o, r, a) {
  const c = a && Array.isArray(o) ? o[o.length - 1] : o, f = b1(n, c, r);
  return f === -1 ? null : f;
}
function wT(n, o, r) {
  return n.filter((a) => !Ni(o, a, r));
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
function Mm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function _T(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Mm(o)) {
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
function io(n, o) {
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
function rs(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? jh(n.value) : jh(n);
}
function y1(n, o, r) {
  function a() {
    return io(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? a();
  if (Array.isArray(o)) {
    const c = o, f = Mm(c) ? c.flatMap((d) => d.items) : c;
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
function AT(n, o, r) {
  return n.reduce((a, c, f) => (f > 0 && a.push(", "), a.push(/* @__PURE__ */ S.jsx(b.Fragment, {
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
}, MT = {
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
    state: MT,
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
    getValidationProps: (n, o = gl) => o,
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
function pa(n = !0) {
  const o = b.useContext(E1);
  if (o.setValidityData === Xt && !n)
    throw new Error(Eo(28));
  return o;
}
function C1(n, o, r, a, c = !0, f) {
  const {
    registerFieldControl: d
  } = pa(), m = Nl(() => /* @__PURE__ */ Symbol());
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
const kT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Xt,
  labelId: void 0,
  setLabelId: Xt,
  messageIds: [],
  setMessageIds: Xt,
  getDescriptionProps: (n) => n
});
function Ou() {
  return b.useContext(kT);
}
function Tm(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: a
  } = n, {
    controlId: c,
    registerControlId: f
  } = Ou(), d = yu(o), m = r ? c : void 0, g = Nl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), v = Fe(() => {
    !h.current || f === Xt || (h.current = !1, f(g.current, void 0));
  });
  return Qe(() => {
    if (f === Xt)
      return;
    let x;
    if (r) {
      const C = a?.current;
      dn(C) && C.closest("label") != null ? x = o ?? null : x = m ?? d;
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
  }, [o, a, m, f, r, d, g, v]), b.useEffect(() => v, [v]), c ?? d;
}
function w1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function NT(n, o) {
  return (r, a) => r == null ? !1 : n.contains(r, a, o);
}
function _1(n) {
  return Array.isArray(n) ? n.map((o) => _1(o)).join(",") : n == null ? "" : String(n);
}
const Sv = /* @__PURE__ */ new Map();
function zT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${_1(n.locale)}|${JSON.stringify(o)}`, a = Sv.get(r);
  if (a)
    return a;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, g) {
      if (!m)
        return !0;
      const h = io(d, g);
      for (let y = 0; y <= h.length - m.length; y += 1)
        if (c.compare(h.slice(y, y + m.length), m) === 0)
          return !0;
      return !1;
    },
    startsWith(d, m, g) {
      if (!m)
        return !0;
      const h = io(d, g);
      return c.compare(h.slice(0, m.length), m) === 0;
    },
    endsWith(d, m, g) {
      if (!m)
        return !0;
      const h = io(d, g), y = m.length;
      return h.length >= y && c.compare(h.slice(h.length - y), m) === 0;
    }
  };
  return Sv.set(r, f), f;
}
const DT = zT;
function jT(n, o = !1) {
  const {
    overflowY: r
  } = bl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function LT(n, o, r = (a, c) => a === c) {
  return n.length === o.length && n.every((a, c) => r(a, o[c]));
}
const A1 = /* @__PURE__ */ Symbol("none"), ih = {
  value: A1,
  index: -1
}, VT = /* @__PURE__ */ b.createContext(void 0);
function Om() {
  return b.useContext(VT)?.direction ?? "ltr";
}
function HT(n) {
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
    name: x,
    form: C,
    disabled: w = !1,
    readOnly: M = !1,
    required: O = !1,
    inputRef: A,
    grid: T = !1,
    items: _,
    filteredItems: N,
    filter: H,
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
    modal: I = !1,
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
    disabled: Ae,
    setTouched: Te,
    setFocused: it,
    validationMode: pt,
    validation: ze
  } = pa(), et = Om(), Ne = Tm({
    id: o
  }), Le = DT({
    locale: z
  }), [Ue, _e] = b.useState(!1), [Ze, Oe] = b.useState(null), Je = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ye = b.useRef(null), Q = b.useRef(null), ce = b.useRef(null), Ie = b.useRef(null), Ce = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Tt = b.useRef(null), St = b.useRef(null), Bt = b.useRef(ih), Nt = b.useRef(null), xt = b.useRef([]), on = b.useRef(null), st = Ae || w, Et = qe ?? x, Jt = y === "multiple", Rn = y === "single", Ft = m !== void 0 || d !== void 0, Wt = _ !== void 0, ot = N !== void 0;
  let ut;
  B === "always" ? ut = "always" : ut = B ? "input-change" : !1;
  const [Ke, Qt] = Xc({
    controlled: c,
    default: Jt ? a ?? oa : a,
    name: "Combobox",
    state: "selectedValue"
  }), wn = b.useMemo(() => H === null ? () => !0 : H !== void 0 ? H : NT(Le, se), [H, Le, se]), _n = Nl(() => Ft ? d ?? "" : Rn ? io(Ke, se) : "").current, [Yt, nl] = Xc({
    controlled: m,
    default: _n,
    name: "Combobox",
    state: "inputValue"
  }), [zt, ao] = Xc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Fn = Mm(_), rn = Ze ?? String(Yt).trim(), so = Rn ? io(Ke, se) : "", Dl = Rn && !Ue && rn !== "" && so.length === rn.length && Le.contains(so, rn), ll = Dl ? "" : rn, Co = Wt && ot && Dl, an = b.useMemo(() => _ ? Fn ? _.flatMap((Y) => Y.items) : _ : oa, [_, Fn]), Ct = b.useMemo(() => {
    if (N && !Co)
      return N;
    if (!_)
      return oa;
    if (Fn) {
      const Z = _, Se = [];
      let Re = 0;
      for (const He of Z) {
        if (F > -1 && Re >= F)
          break;
        const ke = F > -1 ? F - Re : 1 / 0, Me = ll === "" ? He.items.slice(0, ke) : [];
        if (ll !== "")
          for (const wt of He.items) {
            if (Me.length >= ke)
              break;
            wn(wt, ll, se) && Me.push(wt);
          }
        if (Me.length > 0) {
          const wt = {
            ...He,
            items: Me
          };
          Se.push(wt), Re += Me.length;
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
  }, [N, Co, _, Fn, ll, F, wn, se, an]), Rt = b.useMemo(() => Fn ? Ct.flatMap((Z) => Z.items) : Ct, [Ct, Fn]), Ye = Nl(() => {
    let Y = null;
    return be && zt && Wt && y !== "none" && (Y = oh(Rt, Ke, le, Jt)), new f1({
      id: Ne,
      labelId: void 0,
      selectedValue: Ke,
      open: zt,
      items: _,
      selectionMode: y,
      listRef: Je,
      labelsRef: tt,
      popupRef: Xe,
      emptyRef: Ie,
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
      readOnly: M,
      required: O,
      grid: T,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: se,
      isItemEqualToValue: le,
      modal: I,
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
      itemProps: gl,
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
  }).current, Gn = y === "none" ? Yt : Ke, Li = b.useMemo(() => y === "none" ? Gn : Array.isArray(Ke) ? Ke.map((Y) => rs(Y, fe)) : rs(Ke, fe), [Gn, fe, y, Ke]), dt = Fe(v), Vi = Fe(r), $l = xe(Ye, Ee.activeIndex), co = xe(Ye, Ee.selectedIndex), Yn = xe(Ye, Ee.positionerElement), jl = xe(Ye, Ee.listElement), ol = xe(Ye, Ee.triggerElement), il = xe(Ye, Ee.inputElement), en = xe(Ye, Ee.inputGroupElement), mn = xe(Ye, Ee.inline), An = xe(Ye, Ee.inputInsidePopup), Jl = xe(Ye, Ee.inputOwnsFormValue), yl = pl(ol), {
    mounted: Hi,
    setMounted: Qo,
    transitionStatus: Zo
  } = ym(zt), {
    openMethod: Sr,
    triggerProps: Wl
  } = vT(zt), $o = Fe(() => Li);
  C1(An ? yl : ye, Ne, Gn, $o, !st, x);
  const rl = Fe(() => {
    _ ? tt.current = Rt.map((Y) => io(Y, se)) : Ye.set("forceMounted", !0);
  }), sn = Fe((Y, Z, Se) => {
    if (Z === -1) {
      if (Bt.current === ih)
        return;
      Bt.current = ih;
    } else
      Bt.current = {
        value: Y,
        index: Z
      };
    dt(Y, HM(Se, void 0, {
      index: Z
    }));
  }), Qn = Fe((Y) => {
    Ye.update(Y);
    const Z = Y.activeIndex;
    if (Z === void 0)
      return;
    const Se = Y.type || Xl;
    Z === null ? sn(void 0, -1, Se) : sn(xt.current[Z], Z, Se);
  }), Zn = Fe((Y, Z) => {
    if (Ge.current = Z.reason === yo, n.onInputValueChange?.(Y, Z), !Z.isCanceled) {
      if (Z.reason === us) {
        zt && Ze !== null && Oe(null);
        const Se = Z.event, Re = Se.inputType;
        if (Se.type === "compositionend" || Re != null && Re !== "" && Re !== "insertReplacementText") {
          const ke = Y.trim() !== "";
          ke && _e(!0), Nt.current = {
            hasQuery: ke
          };
          const Me = Ye.state.listElement;
          if (!Ye.state.virtualized && Me) {
            const wt = Xe.current;
            for (const It of fa(Me.firstElementChild ?? Me)) {
              if (!Kt(It) || (wt ? !at(wt, It) : It.getAttribute("role") === "dialog"))
                break;
              if (jT(It)) {
                It.scrollTop = 0;
                break;
              }
            }
          }
          ke && ut && Ye.state.activeIndex == null && (zt || mn) && Ye.set("activeIndex", 0);
        }
      } else Z.reason === yo && Y === "" && Ye.state.inputInsidePopup && (Nt.current = {
        hasQuery: !1,
        selection: !0
      });
      nl(Y);
    }
  }), zn = Fe((Y, Z) => {
    if (zt !== Y && (Z.reason === pm && Wt && Rt.length === 0 && !Ie.current && Z.allowPropagation(), n.onOpenChange?.(Y, Z), !Z.isCanceled && (Y && An && !mn && Ze !== null && (_e(!1), Oe(null), Yt !== "" && Z.reason !== us && Zn("", vt(yo, Z.event))), !Y && Ue && (Rn ? (mn || Oe(rn), rn === "" && _e(!1)) : Jt && (mn || Oe(rn), An && Qn({
      activeIndex: null
    }), (!An || mn) && Zn("", vt(yo, Z.event)))), ao(Y), !Y && An && (Z.reason === vu || Z.reason === mm) && (Te(!0), it(!1), pt === "onBlur")))) {
      const Se = y === "none" ? Yt : Ke;
      ze.commit(Se);
    }
  }), Dn = Fe((Y, Z) => {
    if (f?.(Y, Z), Z.isCanceled)
      return;
    Qt(Y), (y === "none" && Xe.current && V || Rn && !Ye.state.inputInsidePopup) && Zn(io(Y, se), vt(Z.reason, Z.event));
  }), Ro = Fe((Y, Z) => {
    const Se = kl(Y), Re = St.current ?? Y;
    St.current = null;
    const He = vt(DM, Re), ke = Se?.closest("a")?.getAttribute("href");
    if (ke) {
      ke.startsWith("#") && zn(!1, He);
      return;
    }
    if (Jt) {
      const Me = Array.isArray(Ke) ? Ke : [], It = RT(Me, Z, le) ? wT(Me, Z, le) : [...Me, Z];
      if (Dn(It, He), He.isCanceled || !(ye.current ? ye.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? Zn("", vt(yo, He.event)) : zn(!1, He);
    } else {
      if (Dn(Z, He), He.isCanceled)
        return;
      zn(!1, He);
    }
  }), ga = Fe(() => {
    const Y = ze.inputRef.current?.form ?? Ye.state.inputElement?.form;
    Y && typeof Y.requestSubmit == "function" && Y.requestSubmit();
  }), Mn = Fe(() => {
    if (Qo(!1), Vi?.(!1), _e(!1), Oe(null), Qn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), Jt && ye.current && ye.current.value !== "" && !Ge.current && Zn("", vt(yo)), Rn)
      if (Ye.state.inputInsidePopup)
        ye.current && ye.current.value !== "" && Zn("", vt(yo));
      else {
        const Y = io(Ke, se);
        ye.current && ye.current.value !== Y && Zn(Y, vt(Y === "" ? yo : Xl));
      }
  }), Ii = b.useMemo(() => mn && Yn ? {
    current: Yn.closest('[role="dialog"]')
  } : Xe, [mn, Yn]);
  Su({
    enabled: !n.actionsRef,
    open: zt,
    ref: Ii,
    onComplete() {
      zt || Mn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: Mn
  }), [Mn]), Qe(function() {
    if (zt || (on.current = null, y === "none"))
      return;
    const Z = Wt ? an : xt.current;
    Qn({
      selectedIndex: oh(Z, Ke, le, Jt)
    });
  }, [zt, Ke, y, Jt, Wt, an, le, Qn]), Qe(() => {
    _ && (xt.current = Rt, Je.current.length = Rt.length);
  }, [_, Rt]), Qe(() => {
    const Y = Nt.current;
    if (Y) {
      const wt = zt || mn || Ye.state.positionerElement?.hidden === !1;
      if (Y.hasQuery)
        ut && wt && Ye.set("activeIndex", 0), Nt.current = null;
      else if (String(Yt).trim() === "" && (Nt.current = null, wt)) {
        const It = Y.selection;
        ut === "always" && !It && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || ye.current && ye.current.value.trim() !== "")
            return;
          const tn = Ye.state.selectedValue, Jn = Ye.state.selectionMode === "multiple", Ot = Jn && Array.isArray(tn) ? tn[tn.length - 1] : tn, pn = Ye.state.selectionMode !== "none" && Ot != null;
          if (pn || It) {
            const Sn = Wt || ot ? Rt : xt.current;
            Ye.set("activeIndex", pn ? oh(Sn, tn, Ye.state.isItemEqualToValue, Jn) : null);
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
      sn(void 0, -1, Xl);
      return;
    }
    if (Re >= Se.length) {
      sn(void 0, -1, Xl), Ye.set("activeIndex", null);
      return;
    }
    const He = Se[Re], ke = Bt.current.value, Me = ke !== A1 && Ni(He, ke, Ye.state.isItemEqualToValue);
    (Bt.current.index !== Re || !Me) && sn(He, Re, Xl);
  }, [
    $l,
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
  function Er(Y) {
    const Z = pe.initialValue;
    return Array.isArray(Y) && Array.isArray(Z) ? !LT(Y, Z, (Se, Re) => Ni(Se, Re, le)) : Y !== Z;
  }
  ia(rn, () => {
    !zt || rn === "" || rn === String(_n) || _e(!0);
  });
  function Jo() {
    const Y = io(Ke, se);
    Yt !== Y && Zn(Y, vt(Xl));
  }
  ia(Ke, () => {
    y !== "none" && (ne(Et), oe(Er(Ke)), ze.change(Ke), Rn && !Ft && !An && Jo());
  }), ia(Yt, () => {
    y === "none" && (ne(Et), oe(Yt !== pe.initialValue), ze.change(Yt));
  }), ia(_, () => {
    !Rn || Ft || An || Ue || Jo();
  });
  const vl = eT({
    open: mn ? !0 : zt,
    onOpenChange: zn,
    elements: {
      reference: An ? ol : il,
      floating: Yn
    }
  }), Ui = T ? "grid" : "listbox", wo = zt || mn, Ll = wo ? "true" : "false", al = b.useMemo(() => {
    const Y = il?.tagName === "INPUT", Z = il == null || Y, Se = Z || wo, Re = Z ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return Se && (Re.role = "combobox", Re["aria-expanded"] = Ll, Re["aria-haspopup"] = Ui, Re["aria-controls"] = wo ? jl?.id : void 0, Re["aria-autocomplete"] = ve), {
      reference: Re,
      floating: {
        role: "presentation"
      }
    };
  }, [il, wo, Ll, Ui, jl?.id, ve]), Wo = c1(vl, {
    enabled: !M && !st && q,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: An ? 0 : 100,
    reason: LM
  }), cn = H2(vl, {
    enabled: !M && !st && !mn,
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
  }), sl = rT(vl, {
    enabled: !M && !st,
    id: Ne,
    listRef: Je,
    activeIndex: $l,
    selectedIndex: co,
    virtual: !0,
    loopFocus: te,
    allowEscape: te && !ut,
    focusItemOnOpen: Ue || y === "none" && !ut ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !j,
    orientation: T ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: oa,
    grid: T ? ST : void 0,
    onNavigate(Y, Z) {
      !Z && !zt || Zo === "ending" || Qn(Z ? {
        activeIndex: Y,
        type: Ce.current ? gm : bm
      } : {
        activeIndex: Y
      });
    }
  }), eo = b.useMemo(() => aa(sl.reference, {
    onKeyDown(Y) {
      T && Ye.state.activeIndex == null && (Y.key === "ArrowLeft" || Y.key === "ArrowRight") && Y.preventBaseUIHandler();
    }
  }, cn.reference, Wo.reference, al.reference), [sl.reference, cn.reference, Wo.reference, al.reference, T, Ye]), _o = b.useMemo(() => aa(J2, cn.floating), [cn.floating]), to = b.useMemo(() => aa(sl.floating, al.floating), [sl.floating, al.floating]), $n = b.useMemo(() => {
    const Y = sl.item;
    return Y ? {
      ...Y,
      onFocus: void 0
    } : gl;
  }, [sl.item]);
  xT(() => {
    Ye.update({
      inline: be,
      popupProps: _o,
      listProps: to,
      inputProps: eo,
      triggerProps: Wl,
      itemProps: $n,
      setOpen: zn,
      setInputValue: Zn,
      setSelectedValue: Dn,
      setIndices: Qn,
      handleSelection: Ro,
      forceMount: rl,
      requestSubmit: ga,
      onOpenChangeComplete: Vi
    });
  }), Qe(() => {
    Ye.update({
      id: Ne,
      selectedValue: Ke,
      open: zt,
      mounted: Hi,
      transitionStatus: Zo,
      items: _,
      inline: be,
      popupProps: _o,
      listProps: to,
      inputProps: eo,
      triggerProps: Wl,
      openMethod: Sr,
      itemProps: $n,
      selectionMode: y,
      name: Et,
      form: C,
      disabled: st,
      readOnly: M,
      required: O,
      grid: T,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: se,
      modal: I,
      autoHighlight: ut,
      isItemEqualToValue: le,
      submitOnItemClick: K,
      hasInputValue: Ft,
      inputOwnsFormValue: y === "none" && (be || !Ye.state.inputInsidePopup)
    });
  }, [Ye, Ne, Ke, zt, Hi, Zo, _, _o, to, eo, $n, Sr, Wl, y, Et, st, M, O, T, he, q, se, I, le, K, Ft, be, ut, C]);
  const R = fr(A, ze.inputRef), k = b.useMemo(() => ({
    query: rn,
    hasItems: Wt,
    filteredItems: Ct,
    flatFilteredItems: Rt
  }), [rn, Wt, Ct, Rt]), D = b.useMemo(() => Array.isArray(Gn) ? "" : rs(Gn, fe), [Gn, fe]), U = Jt && Array.isArray(Ke) && Ke.length > 0, ee = Jt || y === "none" && Jl ? void 0 : Et, re = b.useMemo(() => !Jt || !Array.isArray(Ke) || !Et ? null : Ke.map((Y) => {
    const Z = rs(Y, fe);
    return /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: C,
      name: Et,
      value: Z,
      disabled: st
    }, Z);
  }), [Jt, Ke, C, Et, fe, st]), ge = /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ S.jsx("input", {
      ...ze.getValidationProps(st, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (An) {
            ol?.focus();
            return;
          }
          (ye.current || ol)?.focus();
        },
        // Handle browser autofill.
        onChange(Y) {
          if (Y.nativeEvent.defaultPrevented || st || M)
            return;
          const Z = Y.currentTarget.value, Se = Z.toLowerCase(), Re = vt(Xl, Y.nativeEvent), He = () => xt.current.findIndex((Me) => rs(Me, fe).toLowerCase() === Se || io(Me, se).toLowerCase() === Se);
          function ke() {
            if (Jt)
              return;
            if (y === "none") {
              Zn(Z, Re);
              return;
            }
            let Me = He();
            Me === -1 && (Me = xt.current.findIndex((It, tn) => {
              const Jn = tt.current[tn];
              return Jn != null && Jn.toLowerCase() === Se;
            }));
            const wt = Me === -1 ? void 0 : xt.current[Me];
            wt != null && Dn?.(wt, Re);
          }
          Rn && (rl(), _ && He() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(ke);
        }
      }),
      id: Ne && ee == null ? `${Ne}-hidden-input` : void 0,
      form: C,
      name: ee,
      autoComplete: ae,
      disabled: st,
      required: O && !U,
      readOnly: M,
      value: D,
      ref: R,
      style: ee ? Cm : Em,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), re]
  });
  return /* @__PURE__ */ S.jsx(d1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(h1.Provider, {
      value: vl,
      children: /* @__PURE__ */ S.jsx(p1.Provider, {
        value: Wt,
        children: /* @__PURE__ */ S.jsx(m1.Provider, {
          value: k,
          children: /* @__PURE__ */ S.jsx(g1.Provider, {
            value: Yt,
            children: ge
          })
        })
      })
    })
  });
}
const M1 = {
  ...mT,
  ...x1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Ic = 5;
function IT(n, o) {
  const r = UT(o);
  return n.clientX >= r.left - Ic && n.clientX <= r.right + Ic && n.clientY >= r.top - Ic && n.clientY <= r.bottom + Ic;
}
function UT(n) {
  const o = n.getBoundingClientRect(), r = hn(n);
  if (Xx)
    return o;
  const a = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(a.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(a.width) || 0, m = parseFloat(a.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), v = Math.max(o.height, m, h), x = y - o.width, C = v - o.height;
  return {
    left: o.left - x / 2,
    right: o.right + x / 2,
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
  return As().filteredItems.length === 0;
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
    setTouched: x,
    setFocused: C,
    validationMode: w,
    validation: M
  } = pa(), {
    labelId: O
  } = Ou(), A = zl(), T = xe(A, Ee.selectionMode), _ = xe(A, Ee.disabled), N = xe(A, Ee.readOnly), H = xe(A, Ee.required), q = xe(A, Ee.positionerElement), B = xe(A, Ee.listElement), j = xe(A, Ee.popupId), P = xe(A, Ee.triggerProps), te = xe(A, Ee.inputInsidePopup), se = xe(A, Ee.id), fe = xe(A, Ee.labelId), le = xe(A, Ee.open), he = xe(A, Ee.selectedValue), be = xe(A, Ee.activeIndex), V = xe(A, Ee.selectedIndex), I = xe(A, Ee.hasSelectedValue), F = Tu(), ve = Am(), ae = ki(), z = v || _ || d, K = ku(), ne = T1(A);
  Tm({
    id: te ? m : void 0
  });
  const oe = te ? m ?? se : m, pe = BT(O, fe);
  let we;
  le && te ? we = j ?? w1(se) : le && (we = B?.id);
  const qe = b.useRef("");
  function Ae(Ue) {
    qe.current = Ue.pointerType;
  }
  const {
    reference: Te
  } = aT(F, {
    enabled: !le && !N && !_ && T === "single",
    listRef: A.state.labelsRef,
    activeIndex: be,
    selectedIndex: V,
    onMatch(Ue) {
      const _e = A.state.valuesRef.current[Ue];
      _e !== void 0 && A.state.setSelectedValue(_e, vt(Xl));
    }
  }), {
    reference: it
  } = c1(F, {
    enabled: !N && !_,
    event: "mousedown"
  }), {
    buttonRef: pt,
    getButtonProps: ze
  } = ws({
    native: f,
    disabled: z
  }), et = {
    ...y,
    open: le,
    disabled: z,
    popupSide: ne,
    listEmpty: K,
    placeholder: T === "none" ? !1 : !I
  }, Ne = Fe((Ue) => {
    A.set("triggerElement", Ue);
  });
  return Zl("button", o, {
    ref: [r, pt, Ne],
    state: et,
    props: [P, it, Te, {
      id: oe,
      tabIndex: te ? 0 : -1,
      role: te ? "combobox" : void 0,
      "aria-expanded": le,
      "aria-haspopup": te ? "dialog" : "listbox",
      "aria-controls": we,
      "aria-required": te && H || void 0,
      "aria-labelledby": pe,
      onPointerDown: Ae,
      onPointerEnter: Ae,
      onFocus() {
        C(!0), !(z || N) && ae.start(0, A.state.forceMount);
      },
      onBlur(Ue) {
        if (!at(q, Ue.relatedTarget) && (x(!0), C(!1), w === "onBlur")) {
          const _e = T === "none" ? ve : he;
          M.commit(_e);
        }
      },
      onMouseDown(Ue) {
        if (z || N || (te || F.set("domReferenceElement", Ue.currentTarget), A.state.forceMount(), qe.current !== "touch" && (A.state.inputRef.current?.focus(), te || Ue.preventDefault()), le))
          return;
        const _e = $t(Ue.currentTarget);
        function Ze(Oe) {
          const Je = A.state.triggerElement;
          if (!Je)
            return;
          const tt = kl(Oe), Xe = A.state.positionerElement, ye = A.state.listElement;
          at(Je, tt) || at(Xe, tt) || at(ye, tt) || IT(Oe, Je) || A.state.setOpen(!1, vt(VM, Oe));
        }
        te && _e.addEventListener("mouseup", Ze, {
          once: !0
        });
      },
      onKeyDown(Ue) {
        N || (Ue.key === "ArrowDown" || Ue.key === "ArrowUp") && (On(Ue), A.state.setOpen(!0, vt(Th, Ue.nativeEvent)), A.state.inputRef.current?.focus());
      }
    }, M.getValidationProps(z, h), ze],
    stateAttributesMapping: M1
  });
}), PT = /* @__PURE__ */ b.createContext(void 0);
function XT() {
  return b.useContext(PT);
}
const k1 = /* @__PURE__ */ b.createContext(void 0);
function km(n) {
  const o = b.useContext(k1);
  if (o === void 0 && !n)
    throw new Error(Eo(21));
  return o;
}
const N1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = zl(), {
    buttonRef: c,
    getButtonProps: f
  } = ws({
    native: !1
  }), d = fr(r, c);
  function m(h) {
    a.state.setOpen(!1, vt(jM, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: m
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Cm
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
    setFocused: x,
    validationMode: C,
    validation: w
  } = pa(), {
    labelId: M
  } = Ou(), O = XT(), T = !!km(!0), _ = zl(), N = Am(), H = Om(), q = xe(_, Ee.required), B = xe(_, Ee.disabled), j = xe(_, Ee.readOnly), P = xe(_, Ee.name), te = xe(_, Ee.form), se = xe(_, Ee.selectionMode), fe = xe(_, Ee.autoHighlight), le = xe(_, Ee.inputProps), he = xe(_, Ee.triggerProps), be = xe(_, Ee.open), V = xe(_, Ee.mounted), I = xe(_, Ee.selectedValue), F = xe(_, Ee.id), ve = xe(_, Ee.inline), ae = xe(_, Ee.modal), z = !!fe, K = T1(_), ne = y || B || f, oe = ku(), pe = T || ve, we = !pe || ae, qe = yu(d ?? (pe ? void 0 : F)), Ae = T ? v1 : h, [Te, it] = b.useState(null), pt = b.useRef(!1), ze = b.useRef(null), et = b.useRef(!1), Ne = se === "none" && !T, Le = Fe((ye) => {
    const Q = T || _.state.inline;
    Q && !_.state.hasInputValue && _.state.setInputValue("", vt(Xl)), _.update({
      inputElement: ye,
      inputInsidePopup: Q,
      inputOwnsFormValue: Ne
    });
  }), Ue = T ? g : w.getValidationProps(ne, g);
  function _e() {
    _.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: _.state.keyboardActiveRef.current ? gm : bm
    });
  }
  function Ze() {
    _.state.keyboardActiveRef.current = !1;
  }
  const Oe = {
    ...Ae,
    open: be,
    disabled: ne,
    readOnly: j,
    popupSide: K,
    listEmpty: oe
  };
  function Je(ye) {
    if (!O)
      return;
    let Q;
    const {
      highlightedChipIndex: ce
    } = O, Ie = O.chipsRef.current.length, [Ce, Ge] = GT(H);
    return ce !== void 0 ? (ye.key === Ce ? (ye.preventDefault(), ce > 0 ? Q = ce - 1 : Q = void 0) : ye.key === Ge ? (ye.preventDefault(), ce < Ie - 1 ? Q = ce + 1 : Q = void 0) : (ye.key === "Backspace" || ye.key === "Delete") && (ye.preventDefault(), Q = YT(ce, I.length), _e()), Q) : (ye.key === Ce && (ye.currentTarget.selectionStart ?? 0) === 0 && I.length > 0 && (ye.preventDefault(), Q = Ie > 0 ? Ie - 1 : void 0), Q);
  }
  const tt = Zl("input", o, {
    state: Oe,
    ref: [r, _.state.inputRef, Le],
    props: [le, he, {
      value: Te ?? N,
      "aria-readonly": j || void 0,
      "aria-required": q || void 0,
      "aria-labelledby": M,
      disabled: ne,
      readOnly: j,
      required: se === "none" ? q : void 0,
      form: te,
      ...Ne && P && {
        name: P
      },
      id: qe,
      onFocus() {
        if (x(!0), !ve || !et.current)
          return;
        et.current = !1;
        const ye = ze.current;
        ye == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(_.state.valuesRef.current, ye) || _.state.setIndices({
          activeIndex: ye
        });
      },
      onBlur() {
        v(!0), x(!1);
        const ye = _.state.activeIndex;
        if (ve && ye !== null && fe !== "always" && (ze.current = ye, et.current = !0, _.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const Q = se === "none" ? N : I;
          w.commit(Q);
        }
      },
      onCompositionStart(ye) {
        nu || (pt.current = !0, it(ye.currentTarget.value));
      },
      onCompositionEnd(ye) {
        pt.current = !1;
        const Q = ye.currentTarget.value;
        it(null), _.state.setInputValue(Q, vt(us, ye.nativeEvent));
      },
      onChange(ye) {
        const Q = ye.nativeEvent, ce = Q.inputType, Ie = !ce || ce === "insertReplacementText", Ce = pt.current || !Ie;
        function Ge(Bt) {
          j || ne || !Bt || !Ce || (_.state.setOpen(!0, vt(us, Q)), z || _e());
        }
        if (pt.current) {
          const Bt = ye.currentTarget.value;
          it(Bt), Bt === "" && !_.state.openOnInputClick && !_.state.inputInsidePopup && _.state.setOpen(!1, vt(yo, Q));
          const Nt = Bt.trim(), xt = z && Nt !== "";
          Ge(Nt), be && _.state.activeIndex !== null && !xt && _e();
          return;
        }
        const nt = vt(us, Q);
        if (_.state.setInputValue(ye.currentTarget.value, nt), nt.isCanceled)
          return;
        const Tt = ye.currentTarget.value === "", St = vt(yo, Q);
        Tt && !_.state.inputInsidePopup && (se === "single" && _.state.setSelectedValue(null, St), _.state.openOnInputClick || _.state.setOpen(!1, St)), Ge(ye.currentTarget.value.trim()), be && _.state.activeIndex !== null && !z && _e();
      },
      onKeyDown(ye) {
        if (ne || j || ye.ctrlKey || ye.shiftKey || ye.altKey || ye.metaKey)
          return;
        _.state.keyboardActiveRef.current = !0;
        const Q = ye.currentTarget, ce = Q.scrollWidth - Q.clientWidth, Ie = H === "rtl";
        if (ye.key === "Home") {
          On(ye);
          const nt = Wy && Ie ? Q.value.length : 0;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = 0;
          return;
        }
        if (ye.key === "End") {
          On(ye);
          const nt = Wy && Ie ? 0 : Q.value.length;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = Ie ? -ce : ce;
          return;
        }
        if (!V && ye.key === "Escape") {
          const nt = se === "multiple" && Array.isArray(I) ? I.length === 0 : I === null, Tt = vt(pm, ye.nativeEvent), St = se === "multiple" ? [] : null;
          _.state.setInputValue("", Tt), _.state.setSelectedValue(St, Tt), !nt && !_.state.inline && !Tt.isPropagationAllowed && ye.stopPropagation();
          return;
        }
        if (O && ye.key === "Backspace" && Q.value === "" && O.highlightedChipIndex === void 0 && Array.isArray(I) && I.length > 0) {
          const nt = O.chipsRef.current.length, Tt = nt > 0 ? nt - 1 : I.length - 1, St = I.filter((Bt, Nt) => Nt !== Tt);
          _e(), _.state.setSelectedValue(St, vt(Xl, ye.nativeEvent));
          return;
        }
        const Ce = O?.highlightedChipIndex !== void 0, Ge = Je(ye);
        if (O?.setHighlightedChipIndex(Ge), Ge !== void 0 ? O?.chipsRef.current[Ge]?.focus() : Ce && _.state.inputRef.current?.focus(), ye.which !== 229 && ye.key === "Enter" && be) {
          const nt = _.state.activeIndex, Tt = ye.nativeEvent;
          if (nt === null) {
            if (ve)
              return;
            _.state.setOpen(!1, vt(Xl, Tt));
            return;
          }
          On(ye), O1(_, nt, Tt);
        }
      },
      onPointerMove: Ze,
      onPointerDown: Ze
    }, Ue],
    stateAttributesMapping: M1
  }), Xe = T ? /* @__PURE__ */ S.jsx(E1.Provider, {
    value: S1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [be && we && /* @__PURE__ */ S.jsx(N1, {
      ref: _.state.startDismissRef
    }), Xe]
  });
}), FT = {
  ...xu,
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
  } = pa(), v = zl(), x = xe(v, Ee.selectionMode), C = xe(v, Ee.disabled), w = xe(v, Ee.readOnly), M = xe(v, Ee.open), O = xe(v, Ee.selectedValue), A = xe(v, Ee.hasSelectionChips), T = Am();
  let _ = !1;
  x === "none" ? _ = T !== "" : x === "single" ? _ = O != null : _ = A;
  const N = y || C || f, {
    buttonRef: H,
    getButtonProps: q
  } = ws({
    native: d,
    disabled: N
  }), {
    mounted: B,
    transitionStatus: j,
    setMounted: P
  } = ym(_), te = {
    disabled: N,
    visible: _,
    open: M,
    transitionStatus: j
  };
  Su({
    open: _,
    ref: v.state.clearRef,
    onComplete() {
      _ || P(!1);
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
        if (N || w)
          return;
        const he = v.state.keyboardActiveRef.current ? gm : bm;
        v.state.setInputValue("", vt(Zy, le.nativeEvent)), x !== "none" ? (v.state.setSelectedValue(Array.isArray(O) ? [] : null, vt(Zy, le.nativeEvent)), v.state.setIndices({
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
  } = As(), a = $T(), c = a ? a.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
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
  } = o, h = zl(), y = Tu(), v = !!km(!0), {
    filteredItems: x,
    hasItems: C
  } = As(), w = xe(h, Ee.selectionMode), M = xe(h, Ee.grid), O = xe(h, Ee.listProps), A = xe(h, Ee.virtualized), T = xe(h, Ee.forceMounted), _ = w === "multiple", N = x.length === 0, H = Fe((fe) => {
    h.set("positionerElement", fe);
  }), q = Fe((fe) => {
    h.set("listElement", fe);
  }), B = b.useMemo(() => typeof m == "function" ? a || (a = /* @__PURE__ */ S.jsx(JT, {
    children: m
  })) : m, [m]), j = {
    empty: N
  }, P = y.useState("floatingId"), te = Zl("div", o, {
    state: j,
    ref: [r, q, v ? null : H],
    props: [O, {
      children: B,
      tabIndex: -1,
      id: P,
      role: M ? "grid" : "listbox",
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
  if (A)
    return te;
  const se = C && !T ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ S.jsx(cM, {
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
  const n = ki(), o = b.useRef(null);
  return b.useEffect(() => {
    if (_s)
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
    throw new Error(Eo(20));
  return n;
}
const iO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: a = !1,
    ...c
  } = o, f = zl(), d = xe(f, Ee.mounted), m = xe(f, Ee.forceMounted);
  return d || a || m ? /* @__PURE__ */ S.jsx(z1.Provider, {
    value: a,
    children: /* @__PURE__ */ S.jsx(T2, {
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
    } = Mi(n, o) || {};
    if (h == null)
      return {};
    const x = G0(y), C = {
      x: r,
      y: a
    }, w = Jh(c), M = $h(w), O = await d.getDimensions(h), A = w === "y", T = A ? "top" : "left", _ = A ? "bottom" : "right", N = A ? "clientHeight" : "clientWidth", H = f.reference[M] + f.reference[w] - C[w] - f.floating[M], q = C[w] - f.reference[w], B = v === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let j = m.floating[N] || f.floating[M];
    (!j || !await d.isElement?.(B)) && (j = m.floating[N] || f.floating[M]);
    const P = H / 2 - q / 2, te = j / 2 - O[M] / 2 - 1, se = Math.min(x[T], te), fe = Math.min(x[_], te), le = se, he = j - O[M] - fe, be = j / 2 - O[M] / 2 + P, V = B0(le, be, he), I = !g.arrow && ji(c) != null && be !== V && f.reference[M] / 2 - (be < le ? se : fe) - O[M] / 2 < 0, F = I ? be < le ? be - le : be - he : 0;
    return {
      [w]: C[w] + F,
      data: {
        [w]: V,
        centerOffset: be - V - F,
        ...I && {
          alignmentOffset: F
        }
      },
      reset: I
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
}, Ev = "--available-width", Cv = "--available-height";
function D1(n, o, r) {
  const a = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: a ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: a ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Rv(n, o, r) {
  const {
    rects: a,
    placement: c
  } = n;
  return {
    side: D1(o, Ql(c), r),
    align: ji(c) || "center",
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
    disableAnchorTracking: x = !1,
    inline: C,
    // Private parameters
    keepMounted: w = !1,
    floatingRootContext: M,
    mounted: O,
    collisionAvoidance: A,
    shift: T,
    nodeId: _,
    adaptiveOrigin: N,
    lazyFlip: H = !1,
    externalTree: q
  } = n, [B, j] = b.useState(null);
  !O && B !== null && j(null);
  const P = A.side || "flip", te = A.align || "flip", se = A.fallbackAxisSide || "end", fe = T?.crossAxis ?? !1, le = T?.rootBoundary, he = typeof r == "function" ? r : void 0, be = Fe(he), V = he ? be : r, I = pl(r), F = pl(O), ae = Om() === "rtl", z = B || {
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
  const oe = 1, pe = c === "bottom" ? oe : 0, we = c === "top" ? oe : 0, qe = c === "right" ? oe : 0, Ae = c === "left" ? oe : 0, Te = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: ne
  }, it = b.useRef(null), pt = pl(f), ze = pl(m), et = typeof f != "function" ? f : 0, Ne = typeof m != "function" ? m : 0, Le = [];
  C && Le.push(C), Le.push(P_((ot) => {
    const ut = Rv(ot, c, ae), Ke = typeof pt.current == "function" ? pt.current(ut) : pt.current, Qt = typeof ze.current == "function" ? ze.current(ut) : ze.current;
    return {
      mainAxis: Ke,
      crossAxis: Qt,
      alignmentAxis: Qt
    };
  }, [et, Ne, ae, c]));
  const Ue = te === "none" && P !== "shift", _e = !Ue && (y || fe || P === "shift"), Ze = P === "none" ? null : F_({
    ...Te,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: ne.top + oe + pe,
      right: ne.right + oe + Ae,
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
      } = it.current.getBoundingClientRect(), Qt = Fl(Ql(ot.placement)), wn = Qt === "y" ? ut : Ke, _n = Qt === "y" ? ne.left + ne.right : ne.top + ne.bottom;
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
      wn.setProperty(Ev, `${ut}px`), wn.setProperty(Cv, `${Ke}px`);
      const _n = hn(ot).devicePixelRatio || 1, {
        x: Yt,
        y: nl,
        width: zt,
        height: ao
      } = Qt.reference, Fn = (Math.round((Yt + zt) * _n) - Math.round(Yt * _n)) / _n, rn = (Math.round((nl + ao) * _n) - Math.round(nl * _n)) / _n;
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
      } = ot, Yt = Ql(Qt), nl = Fl(Yt), zt = it.current, ao = Ke.arrow?.x || 0, Fn = Ke.arrow?.y || 0, rn = zt?.clientWidth || 0, so = zt?.clientHeight || 0, Dl = ao + rn / 2, ll = Fn + so / 2, Co = Math.abs(Ke.shift?.y || 0), an = wn.reference.height / 2, Ct = typeof f == "function" ? f(Rv(ot, c, ae)) : f, Rt = Co > Ct, Ye = {
        top: `${Dl}px calc(100% + ${Ct}px)`,
        bottom: `${Dl}px ${-Ct}px`,
        left: `calc(100% + ${Ct}px) ${ll}px`,
        right: `${-Ct}px ${ll}px`
      }[Yt], Gn = `${Dl}px ${wn.reference.y + an - _n}px`;
      return ut.floating.style.setProperty("--transform-origin", _e && nl === "y" && Rt ? Gn : Ye), {};
    }
  }, sO, N), Qe(() => {
    !O && M && M.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [O, M]);
  const Je = b.useMemo(() => ({
    elementResize: !x && typeof ResizeObserver < "u",
    layoutShift: !x && typeof IntersectionObserver < "u"
  }), [x]), {
    refs: tt,
    elements: Xe,
    x: ye,
    y: Q,
    middlewareData: ce,
    update: Ie,
    placement: Ce,
    context: Ge,
    isPositioned: nt,
    floatingStyles: Tt
  } = o({
    rootContext: M,
    open: w ? O : void 0,
    placement: K,
    middleware: Le,
    strategy: a,
    whileElementsMounted: w ? void 0 : (...ot) => Iy(...ot, Je),
    nodeId: _,
    externalTree: q
  }), {
    sideX: St,
    sideY: Bt
  } = ce.adaptiveOrigin || cO, Nt = nt ? a : "fixed", xt = b.useMemo(() => {
    let ot;
    return nt ? N ? ot = {
      position: Nt,
      [St]: ye,
      [Bt]: Q
    } : ot = {
      ...Tt,
      position: Nt
    } : ot = {
      position: Nt,
      top: 0,
      left: 0
    }, ot[Ev] = "100vw", ot[Cv] = "100vh", nt || (ot.opacity = 0), ot;
  }, [N, Nt, St, ye, Bt, Q, Tt, nt]), on = b.useRef(null);
  Qe(() => {
    if (!O)
      return;
    const ot = I.current, ut = typeof ot == "function" ? ot() : ot, Qt = (wv(ut) ? ut.current : ut) || null || null;
    Qt !== on.current && (tt.setPositionReference(Qt), on.current = Qt);
  }, [O, tt, V, I]), b.useEffect(() => {
    if (!O)
      return;
    const ot = I.current;
    typeof ot != "function" && wv(ot) && ot.current !== on.current && (tt.setPositionReference(ot.current), on.current = ot.current);
  }, [O, tt, V, I]), b.useEffect(() => {
    if (w && O && Xe.reference && Xe.floating)
      return Iy(Xe.reference, Xe.floating, Ie, Je);
  }, [w, O, Xe, Ie, Je]);
  const st = Ql(Ce), Et = D1(c, st, ae), Jt = ji(Ce) || "center", Rn = !!ce.hide?.referenceHidden;
  Qe(() => {
    H && O && nt && st !== z && j(st);
  }, [H, O, nt, st, z]);
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
    update: Ie
  }), [xt, Ft, it, Wt, Et, Jt, st, Rn, tt, Ge, nt, Ie]);
}
function wv(n) {
  return n != null && "current" in n;
}
function j1(n) {
  return n === "starting" ? C2 : gl;
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
  return m && (g.pointerEvents = "none"), Zl("div", n, {
    state: o,
    ref: f,
    props: [{
      role: "presentation",
      hidden: d,
      style: g
    }, j1(a), c],
    stateAttributesMapping: _m
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
    collisionPadding: x,
    arrowPadding: C,
    sticky: w,
    disableAnchorTracking: M = !1,
    collisionAvoidance: O = w2,
    style: A,
    ...T
  } = o, _ = zl(), N = Tu(), H = oO(), q = xe(_, Ee.modal), B = xe(_, Ee.open), j = xe(_, Ee.mounted), P = xe(_, Ee.openMethod), te = xe(_, Ee.positionerElement), se = xe(_, Ee.triggerElement), fe = xe(_, Ee.inputElement), le = xe(_, Ee.inputGroupElement), he = xe(_, Ee.inputInsidePopup), be = xe(_, Ee.transitionStatus), V = ku(), F = uO({
    anchor: f ?? (he ? se : le ?? fe),
    floatingRootContext: N,
    positionMethod: d,
    mounted: j,
    side: m,
    sideOffset: h,
    align: g,
    alignOffset: y,
    arrowPadding: C,
    collisionBoundary: v,
    collisionPadding: x,
    sticky: w,
    disableAnchorTracking: M,
    keepMounted: H,
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
  return /* @__PURE__ */ S.jsxs(k1.Provider, {
    value: F,
    children: [j && q && /* @__PURE__ */ S.jsx(gT, {
      inert: pT(!B),
      cutout: le ?? fe ?? se
    }), z]
  });
}), gO = {
  ..._m,
  ...xu
}, bO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...g
  } = o, h = zl(), y = km(), v = Tu(), x = xe(h, Ee.mounted), C = xe(h, Ee.open), w = xe(h, Ee.openMethod), M = xe(h, Ee.popupProps), O = xe(h, Ee.transitionStatus), A = xe(h, Ee.inputInsidePopup), T = xe(h, Ee.inputElement), _ = xe(h, Ee.modal), N = xe(h, Ee.id), H = ku(), q = g.id ?? (A ? w1(N) : void 0);
  Qe(() => (h.set("popupId", h.state.popupRef.current?.id || q), () => {
    h.set("popupId", void 0);
  }), [h, q]), Su({
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
    empty: H
  }, j = Zl("div", o, {
    state: B,
    ref: [r, h.state.popupRef],
    props: [M, {
      id: q,
      role: A ? "dialog" : "presentation",
      onFocus(le) {
        const he = kl(le.nativeEvent);
        w !== "touch" && (at(h.state.listElement, he) || he === le.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, j1(O), g],
    stateAttributesMapping: gO
  }), te = d === void 0 ? A ? (le) => le === "touch" ? h.state.popupRef.current : T : !1 : d;
  let se;
  m != null ? se = m : se = A ? void 0 : !1;
  const fe = !A || _;
  return /* @__PURE__ */ S.jsx(j2, {
    context: v,
    disabled: !x,
    modal: fe,
    openInteractionType: w,
    initialFocus: te,
    returnFocus: se,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [j, fe && /* @__PURE__ */ S.jsx(N1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), L1 = /* @__PURE__ */ b.createContext(void 0);
function V1() {
  const n = b.useContext(L1);
  if (!n)
    throw new Error(Eo(19));
  return n;
}
const yO = /* @__PURE__ */ b.createContext(!1);
function vO() {
  return b.useContext(yO);
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
    style: m,
    value: g = null,
    index: h,
    disabled: y = !1,
    nativeButton: v = !1,
    ...x
  } = o, C = b.useRef(null), w = UM({
    guess: !0,
    index: h,
    textRef: C
  }), M = zl(), O = vO(), A = ET(), T = xe(M, Ee.selectionMode), _ = xe(M, Ee.disabled), N = xe(M, Ee.readOnly), H = xe(M, Ee.isItemEqualToValue), q = _ || y, B = T !== "none", j = h ?? c ?? w.index, P = j !== -1, te = xe(M, Ee.id), se = xe(M, Ee.isActive, j), fe = xe(M, Ee.isSelected, g), le = xe(M, Ee.itemProps), he = b.useRef(null), be = te != null && P ? `${te}-${j}` : void 0, V = fe && B;
  Qe(() => {
    if (!(P && (a || h != null)))
      return;
    const pe = M.state.listRef.current;
    return pe[j] = he.current, () => {
      delete pe[j];
    };
  }, [P, a, j, h, M]), Qe(() => {
    if (!P || A)
      return;
    const oe = M.state.valuesRef.current;
    return oe[j] = g, () => {
      delete oe[j];
    };
  }, [P, A, j, g, M]), Qe(() => {
    if (!P || A)
      return;
    const oe = M.state.selectedValue, pe = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Ni(g, pe, H) && M.set("selectedIndex", j);
  }, [P, A, M, j, g, H]);
  const {
    getButtonProps: I,
    buttonRef: F
  } = ws({
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
      M.state.handleSelection(oe, g);
    }
    M.state.submitOnItemClick ? (da.flushSync(pe), M.state.requestSubmit()) : pe();
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
      oe.isPrimary && (M.state.pointerDownItemRef.current = oe.currentTarget), oe.preventDefault();
    },
    onMouseDown(oe) {
      oe.preventDefault();
    },
    onClick(oe) {
      q || N || ae(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const pe = M.state.pointerDownItemRef.current === oe.currentTarget;
      M.state.pointerDownItemRef.current = null, !(q || N || oe.button !== 0 || pe || !se) && ae(oe.nativeEvent);
    }
  }, K = Zl("div", o, {
    ref: [F, r, w.ref, he],
    state: ve,
    props: [le, z, x, I]
  }), ne = b.useMemo(() => ({
    selected: V,
    textRef: C
  }), [V, C]);
  return /* @__PURE__ */ S.jsx(L1.Provider, {
    value: ne,
    children: K
  });
}
function xO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, a = zl(), c = xe(a, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = As(), d = b1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(H1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const SO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = zl(), c = xe(a, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(xO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(H1, {
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
  } = As(), h = zl(), y = lO(), v = g.length === 0 ? d : null;
  return Zl("div", o, {
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
  const [f, d] = b.useState(), m = yu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
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
  return /* @__PURE__ */ S.jsx(HT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: a,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function AO(n) {
  const {
    children: o,
    placeholder: r
  } = n, a = zl(), c = xe(a, Ee.itemToStringLabel), f = xe(a, Ee.selectedValue), d = xe(a, Ee.items), m = xe(a, Ee.selectionMode) === "multiple", g = xe(a, Ee.hasSelectedValue), h = !g && r != null && o == null, y = xe(a, Ee.hasNullItemLabel, h);
  let v = null;
  return typeof o == "function" ? v = o(f) : o != null ? v = o : !g && r != null && !y ? v = r : m && Array.isArray(f) ? v = AT(f, d, c) : v = y1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: v
  });
}
const MO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: a
  } = V1();
  return o.keepMounted || a ? /* @__PURE__ */ S.jsx(TO, {
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
  } = ym(m), x = Zl("span", n, {
    ref: [o, g],
    state: {
      selected: m,
      transitionStatus: h
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, d],
    stateAttributesMapping: xu
  });
  return Su({
    open: m,
    ref: g,
    onComplete() {
      m || y(!1);
    }
  }), x;
})), I1 = /* @__PURE__ */ b.createContext(void 0);
function OO() {
  const n = b.useContext(I1);
  if (n === void 0)
    throw new Error(Eo(63));
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
}, kO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    onCheckedChange: x,
    readOnly: C = !1,
    required: w = !1,
    disabled: M = !1,
    render: O,
    uncheckedValue: A,
    value: T,
    style: _,
    ...N
  } = o, {
    clearErrors: H
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
  } = pa(), {
    labelId: V
  } = Ou(), I = le || M, F = he ?? y, ve = b.useRef(null), ae = fr(ve, h, be.inputRef), z = b.useRef(null), K = yu(), ne = Tm({
    id: g,
    implicit: !1,
    controlRef: z
  }), oe = v ? void 0 : ne, [pe, we] = Xc({
    controlled: a,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  C1(z, K, pe, void 0, !I, y), Qe(() => {
    ve.current && te(ve.current.checked);
  }, [te]), ia(pe, () => {
    H(F), j(pe !== P.initialValue), te(pe), be.change(pe);
  });
  const {
    getButtonProps: qe,
    buttonRef: Ae
  } = ws({
    disabled: I,
    native: v
  }), Te = CO(d, V, ve, !v, oe), it = {
    id: v ? ne : K,
    role: "switch",
    "aria-checked": pe,
    "aria-readonly": C || void 0,
    "aria-required": w || void 0,
    "aria-labelledby": Te,
    onFocus() {
      I || se(!0);
    },
    onBlur() {
      const Ne = ve.current;
      !Ne || I || (B(!0), se(!1), fe === "onBlur" && be.commit(Ne.checked));
    },
    onClick(Ne) {
      if (C || I)
        return;
      Ne.preventDefault();
      const Le = ve.current;
      Le && Kc(Le, Ne);
    }
  }, pt = {
    ...be.getValidationProps(I),
    checked: pe,
    disabled: I,
    form: m,
    id: oe,
    name: F,
    required: w,
    style: F ? Cm : Em,
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
      const Le = Ne.currentTarget.checked, Ue = vt(Xl, Ne.nativeEvent);
      x?.(Le, Ue), !Ue.isCanceled && we(Le);
    },
    onClick(Ne) {
      Ne.stopPropagation();
    },
    onFocus() {
      z.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...T !== void 0 ? {
      value: T
    } : gl
  }, ze = b.useMemo(() => ({
    ...q,
    checked: pe,
    disabled: I,
    readOnly: C,
    required: w
  }), [q, pe, I, C, w]), et = Zl("span", o, {
    state: ze,
    ref: [r, z, Ae],
    props: [it, N, qe, (Ne) => be.getValidationProps(I, Ne)],
    stateAttributesMapping: U1
  });
  return /* @__PURE__ */ S.jsxs(I1.Provider, {
    value: ze,
    children: [et, !pe && F && A !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: m,
      name: F,
      value: A,
      disabled: I
    }), /* @__PURE__ */ S.jsx("input", {
      ...pt,
      suppressHydrationWarning: !0
    })]
  });
}), NO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    ...d
  } = o, m = OO();
  return Zl("span", o, {
    state: m,
    ref: r,
    stateAttributesMapping: U1,
    props: d
  });
});
function B1({ className: n, type: o, ...r }) {
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
function zO({ className: n, ...o }) {
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
const DO = vr(
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
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": o,
      className: We(DO({ align: o }), n),
      onClick: (a) => {
        a.target.closest("button") || a.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const LO = vr(
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
  return /* @__PURE__ */ S.jsx(
    _i,
    {
      type: o,
      "data-size": a,
      variant: r,
      className: We(LO({ size: a }), n),
      ...c
    }
  );
}
function VO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    B1,
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
const HO = _O;
function IO({ ...n }) {
  return /* @__PURE__ */ S.jsx(AO, { "data-slot": "combobox-value", ...n });
}
function Y1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    qT,
    {
      "data-slot": "combobox-trigger",
      className: We("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          i0,
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
  return /* @__PURE__ */ S.jsx(
    QT,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(G1, { variant: "ghost", size: "icon-xs" }),
      className: We(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(s0, { className: "pointer-events-none" })
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
  return /* @__PURE__ */ S.jsxs(zO, { className: We("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      KT,
      {
        render: /* @__PURE__ */ S.jsx(VO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(jO, { align: "inline-end", children: [
      a && /* @__PURE__ */ S.jsx(
        G1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ S.jsx(Y1, {})
        }
      ),
      c && /* @__PURE__ */ S.jsx(UO, { disabled: r })
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
  return /* @__PURE__ */ S.jsx(iO, { container: d, children: /* @__PURE__ */ S.jsx(
    pO,
    {
      side: o,
      sideOffset: r,
      align: a,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        bO,
        {
          "data-slot": "combobox-content",
          "data-chips": !!f,
          className: We(
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
  return /* @__PURE__ */ S.jsx(
    WT,
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
function qO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    SO,
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
          MO,
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
function PO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    EO,
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
function XO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    mA,
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
function _v({ className: n, ...o }) {
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
const KO = vr(
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
function Jr({
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
      className: We(KO({ orientation: o }), n),
      ...r
    }
  );
}
function Wr({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    XO,
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
function rh({ className: n, ...o }) {
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
const FO = vr(
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
  const f = a ? u0 : "div";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: We(FO({ variant: o, size: r }), n),
      ...c
    }
  );
}
function ZO({ className: n, ...o }) {
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
function $O({ className: n, ...o }) {
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
function Uc({
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
  return /* @__PURE__ */ S.jsxs(
    AA,
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
          kA,
          {
            "data-slot": "slider-track",
            className: We(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              NA,
              {
                "data-slot": "slider-range",
                className: We(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: m.length }, (g, h) => /* @__PURE__ */ S.jsx(
          VA,
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
function Av({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    kO,
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
        NO,
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
const JO = vr(
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
function Lh({
  className: n,
  variant: o,
  size: r,
  spacing: a = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    PA,
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
      children: /* @__PURE__ */ S.jsx(q1.Provider, { value: { variant: o, size: r, spacing: a }, children: c })
    }
  );
}
function ir({
  className: n,
  children: o,
  variant: r,
  size: a,
  ...c
}) {
  const f = b.useContext(q1);
  return /* @__PURE__ */ S.jsx(
    ZA,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || a,
      "data-spacing": f.spacing,
      className: We(
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
const Mv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Tv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], Tl = ["#ff0099", "#b8ff00", "#00b7ff"], WO = Tl.length, ek = ["line", "spline", "gradient"], tk = ["spline", "shape", "gradient"], nk = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, lk = ["select", "lasso"], ok = ["point", "line", "spline", "shape"];
function ik(n, o) {
  const [r, a] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(a - r), Math.abs(f - c));
}
function ah(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Ov(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const rk = {
  select: TR,
  lasso: RR,
  polygon: kR,
  rectangle: UR,
  ellipse: My,
  point: My,
  line: r0,
  spline: HR,
  shape: a0
};
function kv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    Lh,
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
        const c = rk[a] ?? a0, f = nk[a] ?? a;
        return /* @__PURE__ */ S.jsx(
          ir,
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
function gs({ color: n, className: o }) {
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
function P1({ active: n }) {
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
function ak({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: a,
  onToggleFullscreen: c
}) {
  const f = n.filter((m) => lk.includes(m)), d = n.filter((m) => ok.includes(m));
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        f.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ S.jsx(kv, { modes: f, value: o, onChange: r })
        ] }) : null,
        f.length && d.length ? /* @__PURE__ */ S.jsx(JA, { orientation: "vertical", className: "h-5" }) : null,
        d.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ S.jsx(kv, { modes: d, value: o, onChange: r })
        ] }) : null,
        /* @__PURE__ */ S.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ S.jsx(
          _i,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: a ? "Exit full screen" : "Full screen",
            "aria-label": a ? "Exit full screen" : "Full screen",
            "aria-pressed": a,
            onClick: c,
            children: a ? /* @__PURE__ */ S.jsx(LR, {}) : /* @__PURE__ */ S.jsx(yR, {})
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
  const [h, y] = b.useState(!1), [v, x] = b.useState(r);
  return /* @__PURE__ */ S.jsxs(
    QO,
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
          _i,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": a ? "Show landmark" : "Hide landmark",
            onClick: (C) => {
              C.stopPropagation(), g();
            },
            children: a ? /* @__PURE__ */ S.jsx(ER, {}) : /* @__PURE__ */ S.jsx(xR, {})
          }
        ) : null,
        o ? /* @__PURE__ */ S.jsx(gs, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ S.jsx(P1, { active: c }) : null,
        /* @__PURE__ */ S.jsx(ZO, { className: "min-w-0 gap-0", children: h && d ? /* @__PURE__ */ S.jsx(
          B1,
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
          $O,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (C) => {
              d && (C.preventDefault(), C.stopPropagation(), x(r), y(!0));
            },
            children: r
          }
        ) }),
        m ? /* @__PURE__ */ S.jsx(
          _i,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (C) => {
              C.stopPropagation(), m();
            },
            children: /* @__PURE__ */ S.jsx(s0, {})
          }
        ) : null
      ]
    }
  );
}
const ru = "px-3";
function Nv(n, o) {
  const r = n?.vmin ?? 0, a = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, a));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function sk({
  colors: n,
  labels: o,
  lo: r,
  hi: a
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${ck(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ S.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ S.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ S.jsx(gs, { color: n[d] || "#94a3b8" }),
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
      /* @__PURE__ */ S.jsx("span", { children: Ov(r) }),
      /* @__PURE__ */ S.jsx("span", { children: Ov(a) })
    ] })
  ] });
}
function ck(n, o) {
  const r = n.replace("#", ""), a = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(a.slice(0, 2), 16), g = parseInt(a.slice(2, 4), 16), h = parseInt(a.slice(4, 6), 16), y = Math.min(255, c + m), v = Math.min(255, f + g), x = Math.min(255, d + h);
  return `#${[y, v, x].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function uk(n, o, r, a, c, f, d) {
  const m = [
    [n, o],
    [r, a],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [y, v] = m[(h + 2) % 3], [x, C] = m[h], [w, M] = m[(h + 1) % 3], O = Math.hypot(x - y, C - v) || 1, A = Math.hypot(w - x, M - C) || 1, T = Math.min(d, O * 0.35, A * 0.35), _ = x + (y - x) / O * T, N = C + (v - C) / O * T, H = x + (w - x) / A * T, q = C + (M - C) / A * T;
    h === 0 ? g.push(`M ${_} ${N}`) : g.push(`L ${_} ${N}`), g.push(`Q ${x} ${C} ${H} ${q}`);
  }
  return g.push("Z"), g.join(" ");
}
const ml = 80, Nm = 12, ch = 4, zv = 5, fk = ml - 2 * Nm, X1 = Math.sqrt(3) / 2 * fk, K1 = (ml - X1) / 2, F1 = K1 + X1, hr = { x: ml / 2, y: K1 }, mr = { x: Nm, y: F1 }, pr = { x: ml - Nm, y: F1 }, Dv = {
  x: (mr.x + hr.x + pr.x) / 3,
  y: (mr.y + hr.y + pr.y) / 3
};
function zm(n) {
  const o = n.x - Dv.x, r = n.y - Dv.y, a = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / a * zv,
    y: n.y + r / a * zv
  };
}
const jv = zm(mr), Lv = zm(hr), Vv = zm(pr), Hv = uk(
  mr.x,
  mr.y,
  hr.x,
  hr.y,
  pr.x,
  pr.y,
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
function dk() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const a = r.createImageData(o, o), c = uh(Tl[0]), f = uh(Tl[1]), d = uh(Tl[2]), m = mr.x / ml, g = mr.y / ml, h = hr.x / ml, y = hr.y / ml, v = pr.x / ml, x = pr.y / ml, C = (y - x) * (m - v) + (v - h) * (g - x);
  for (let w = 0; w < o; w++)
    for (let M = 0; M < o; M++) {
      const O = (M + 0.5) / o, A = (w + 0.5) / o, T = ((y - x) * (O - v) + (v - h) * (A - x)) / C, _ = ((x - g) * (O - v) + (m - v) * (A - x)) / C, N = 1 - T - _, H = (w * o + M) * 4;
      if (T < -0.02 || _ < -0.02 || N < -0.02) {
        a.data[H + 3] = 0;
        continue;
      }
      const q = Math.max(0, T), B = Math.max(0, _), j = Math.max(0, N);
      a.data[H] = Math.min(255, Math.round(c[0] * q + f[0] * B + d[0] * j)), a.data[H + 1] = Math.min(
        255,
        Math.round(c[1] * q + f[1] * B + d[1] * j)
      ), a.data[H + 2] = Math.min(
        255,
        Math.round(c[2] * q + f[2] * B + d[2] * j)
      ), a.data[H + 3] = 255;
    }
  return r.putImageData(a, 0, 0), n.toDataURL();
}
function hk() {
  const n = b.useId(), o = b.useMemo(() => dk(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${ml} ${ml}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: Hv }) }) }),
        o ? /* @__PURE__ */ S.jsx(
          "image",
          {
            href: o,
            width: ml,
            height: ml,
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
            cx: jv.x,
            cy: jv.y,
            r: ch,
            fill: Tl[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Lv.x,
            cy: Lv.y,
            r: ch,
            fill: Tl[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Vv.x,
            cy: Vv.y,
            r: ch,
            fill: Tl[2]
          }
        )
      ]
    }
  ) });
}
function mk({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: a, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (a !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(hk, {});
  const m = d.map((y, v) => Tl[v % Tl.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const v = r.find((x) => x.name === y);
      h = Math.max(h, Nv(v, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((x) => x.name === d[0]), v = Nv(y, c);
    g = v.lo, h = v.hi;
  }
  return /* @__PURE__ */ S.jsx(
    sk,
    {
      colors: m,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function pk({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: a, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        Av,
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
        Av,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function gk() {
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
function bk({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, a = o.map((g) => g.name), c = r || [], f = c.length >= WO, [d, m] = gk();
  return /* @__PURE__ */ S.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs(
      HO,
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
            Y1,
            {
              render: /* @__PURE__ */ S.jsx(
                _i,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ S.jsx(IO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, v) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            gs,
                            {
                              color: Tl[v % Tl.length]
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
            GO,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  BO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ S.jsx(PO, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(YO, { children: (g) => {
                  const h = String(g), y = c.indexOf(h), v = f && y < 0;
                  return /* @__PURE__ */ S.jsxs(
                    qO,
                    {
                      value: h,
                      disabled: v,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          gs,
                          {
                            color: y >= 0 ? Tl[y % Tl.length] : "#94a3b8"
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
    /* @__PURE__ */ S.jsx(mk, { lm: n }),
    /* @__PURE__ */ S.jsx(pk, { lm: n })
  ] });
}
function yk({ lm: n }) {
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
  return /* @__PURE__ */ S.jsxs(kx, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(Nx, { className: We("shrink-0 py-0", ru), children: /* @__PURE__ */ S.jsx(zx, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ S.jsx(Dx, { className: We("min-h-0 overflow-y-auto pb-2", ru), children: /* @__PURE__ */ S.jsxs(
      Ox,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ S.jsxs(ta, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ S.jsx(rh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((v, x) => /* @__PURE__ */ S.jsx(
              sh,
              {
                active: a === "selection" && c === x,
                color: Tv[x % Tv.length],
                label: v.id,
                onSelect: () => n.select("selection", x),
                onRename: (C) => n.renameSelection(x, C),
                onDelete: () => n.deleteSelection(x)
              },
              `${v.id}-${x}`
            )) }) : /* @__PURE__ */ S.jsx(vo, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ S.jsxs(ta, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((v) => {
              const x = !y && v.name === d;
              return /* @__PURE__ */ S.jsxs(tM, { className: "group/cat", children: [
                /* @__PURE__ */ S.jsxs(
                  nM,
                  {
                    className: We(
                      "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                      x && "text-foreground"
                    ),
                    onClick: () => {
                      v.name === d && !y || (n.setActiveCategory(v), n.select("", -1));
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(pR, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                      /* @__PURE__ */ S.jsx(P1, { active: x }),
                      /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: v.name })
                    ]
                  }
                ),
                /* @__PURE__ */ S.jsx(lM, { className: "pl-4", children: /* @__PURE__ */ S.jsx(rh, { className: "gap-0.5", children: (v.labels || []).map((C, w) => /* @__PURE__ */ S.jsx(
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
          m.length ? /* @__PURE__ */ S.jsxs(ta, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Genes" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(bk, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ S.jsxs(ta, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ S.jsx(rh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((v, x) => /* @__PURE__ */ S.jsx(
              sh,
              {
                active: a === "landmark" && c === x,
                color: Mv[x % Mv.length],
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
function vk({ lm: n }) {
  const {
    default_tension: o,
    neighbor_radius_max: r,
    neighbor_k_max: a,
    x_bounds: c,
    y_bounds: f
  } = n, d = n.selectedLandmark(), m = !!d && tk.includes(d.type), g = !!d && ek.includes(d.type), h = n.activeNeighborhood(), y = !!h, v = Math.max(ik(c, f), 1), x = r > 0 ? r : v, C = Math.max(1, a || 64), w = Math.min(Number(h?.neighborhood_radius || 0), x);
  return /* @__PURE__ */ S.jsxs(kx, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(Nx, { className: We("shrink-0 py-0", ru), children: /* @__PURE__ */ S.jsx(zx, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ S.jsx(Dx, { className: We("min-h-0 overflow-hidden pb-2", ru), children: /* @__PURE__ */ S.jsxs(
      Ox,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ S.jsxs(ta, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(_v, { className: "gap-2", children: y ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsx(vo, { children: h.id ? String(h.id) : "Selection" }),
              /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx(gs, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ S.jsxs(Jr, { children: [
                /* @__PURE__ */ S.jsx(Wr, { children: "Neighborhood" }),
                /* @__PURE__ */ S.jsxs(
                  Lh,
                  {
                    type: "single",
                    variant: "outline",
                    size: "sm",
                    spacing: 0,
                    value: h.neighborhood || "off",
                    onValueChange: (M) => {
                      M && n.patchNeighborhood({ neighborhood: M });
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(ir, { value: "off", children: "Off" }),
                      /* @__PURE__ */ S.jsx(ir, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ S.jsx(ir, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              h.neighborhood === "radius" ? /* @__PURE__ */ S.jsxs(Jr, { children: [
                /* @__PURE__ */ S.jsx(Wr, { children: "Radius" }),
                /* @__PURE__ */ S.jsx(
                  Uc,
                  {
                    min: 0,
                    max: x,
                    step: x / 200 || 1,
                    value: [w],
                    onValueChange: (M) => {
                      const O = Math.min(Math.max(M[0] ?? 0, 0), x);
                      n.patchNeighborhood({
                        neighborhood: "radius",
                        neighborhood_radius: O
                      });
                    }
                  }
                ),
                /* @__PURE__ */ S.jsxs(vo, { children: [
                  ah(w, "0"),
                  x > 0 ? ` / ${ah(x, "0")}` : ""
                ] })
              ] }) : null,
              h.neighborhood === "knn" ? /* @__PURE__ */ S.jsxs(Jr, { children: [
                /* @__PURE__ */ S.jsx(Wr, { children: "k" }),
                /* @__PURE__ */ S.jsx(
                  Uc,
                  {
                    min: 1,
                    max: C,
                    step: 1,
                    value: [
                      Math.min(Number(h.neighborhood_k || 12), C)
                    ],
                    onValueChange: (M) => n.patchNeighborhood({
                      neighborhood: "knn",
                      neighborhood_k: M[0] ?? 12
                    })
                  }
                ),
                /* @__PURE__ */ S.jsx(vo, { children: String(
                  Math.min(Number(h.neighborhood_k || 12), C)
                ) })
              ] }) : null,
              /* @__PURE__ */ S.jsx(vo, { children: "Sliders subset the precomputed k-max / radius-max graphs. Shift+wheel sizes the neighborhood." })
            ] }) : /* @__PURE__ */ S.jsx(vo, { children: "Select a type or selection to edit neighbors." }) }) })
          ] }),
          m || g ? /* @__PURE__ */ S.jsxs(ta, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(na, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ S.jsx(la, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(_v, { className: "gap-2", children: [
              m ? /* @__PURE__ */ S.jsxs(Jr, { children: [
                /* @__PURE__ */ S.jsx(Wr, { children: "Tension" }),
                /* @__PURE__ */ S.jsx(
                  Uc,
                  {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    value: [
                      Number(d?.tension ?? o ?? 0)
                    ],
                    onValueChange: (M) => n.patchLandmark({ tension: M[0] ?? 0 })
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
                /* @__PURE__ */ S.jsxs(Jr, { children: [
                  /* @__PURE__ */ S.jsx(Wr, { children: "Buffer" }),
                  /* @__PURE__ */ S.jsxs(
                    Lh,
                    {
                      type: "single",
                      variant: "outline",
                      size: "sm",
                      spacing: 0,
                      value: d?.buffer_side || "both",
                      onValueChange: (M) => {
                        M && n.patchLandmark({ buffer_side: M });
                      },
                      children: [
                        /* @__PURE__ */ S.jsx(ir, { value: "left", children: "Left" }),
                        /* @__PURE__ */ S.jsx(ir, { value: "both", children: "Both" }),
                        /* @__PURE__ */ S.jsx(ir, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ S.jsxs(Jr, { children: [
                  /* @__PURE__ */ S.jsx(Wr, { children: "Width" }),
                  /* @__PURE__ */ S.jsx(
                    Uc,
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
                      onValueChange: (M) => n.patchLandmark({ buffer_width: M[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ S.jsx(vo, { children: ah(Number(d?.buffer_width || 0)) })
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
function xk({
  onZoomIn: n,
  onZoomOut: o,
  onReset: r
}) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      className: "absolute right-5 bottom-5 z-10 overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-sm",
      onMouseDown: (a) => a.stopPropagation(),
      onWheel: (a) => a.stopPropagation(),
      onDoubleClick: (a) => a.stopPropagation(),
      children: /* @__PURE__ */ S.jsxs(eM, { orientation: "vertical", children: [
        /* @__PURE__ */ S.jsx(
          _i,
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
            children: /* @__PURE__ */ S.jsx(zR, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          _i,
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
            children: /* @__PURE__ */ S.jsx(r0, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          _i,
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
            children: /* @__PURE__ */ S.jsx(_R, {})
          }
        )
      ] })
    }
  );
}
const bs = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, Sk = 3;
function Bc(n) {
  return { ...bs, ...n };
}
function Vh(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function Ek(n, o) {
  const r = n.get("gene_columns") || [], a = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!a.has(f) || c.includes(f)) && (c.push(f), c.length >= Sk))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((g) => g.name === d) || f[0];
    if (m) {
      Vh(n, m);
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
function Ck(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function Rk(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function Q1(n, o, r, a, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...bs, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const m = a.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...bs, id: d, column: f, ...m || {} };
  }
  return null;
}
function Z1(n, o, r, a, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (x, C) => C === r ? { ...bs, ...x, ...a } : x
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], y = h.findIndex(
    (x) => x.id === g && (!x.column || x.column === m)
  ), v = {
    ...bs,
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
function wk(n, o) {
  n.set("mode", o), n.save_changes();
}
function J1(n, o) {
  return n.filter((r, a) => a !== o);
}
function W1(n, o, r, a) {
  return o !== n ? { kind: o, index: r } : r === a ? { kind: "", index: -1 } : r > a ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function _k(n, o, r, a, c) {
  const f = W1("selection", a, c, o);
  n.set("selections", J1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Ak(n, o, r, a, c) {
  const f = W1("landmark", a, c, o);
  n.set("landmarks", J1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Mk(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Tk(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Ok(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (a, c) => c === o ? { ...a, hidden: !a.hidden } : a
    )
  ), n.save_changes();
}
const Ih = "9.1.14", kk = `https://esm.sh/@deck.gl/core@${Ih}`, Nk = `https://esm.sh/@deck.gl/layers@${Ih}?deps=@deck.gl/core@${Ih}`, Ci = { depthCompare: "always", depthWriteEnabled: !1 }, Iv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], fh = "#00e5cc", zk = 0.3, Dk = 0.9, Gc = 2, dh = 1, jk = 0.55, hh = ["line", "spline", "gradient"];
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
function Lk(n) {
  return 1 - (1 - n) ** 4;
}
function Yc(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [a, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [a / 255, c / 255, f / 255, d / 255 || 1];
}
function Uv({ model: n, host: o }) {
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
  function v(R, k, D) {
    g.textContent = R, g.hidden = !1;
    const U = o.getBoundingClientRect();
    g.style.left = `${k - U.left + 12}px`, g.style.top = `${D - U.top + 12}px`;
  }
  function x() {
    g.hidden = !0;
  }
  m.addEventListener("mousedown", (R) => R.stopPropagation()), m.addEventListener("wheel", (R) => R.stopPropagation(), { passive: !0 });
  const C = n.get("modes") || [], w = ["select", "lasso"].filter(
    (R) => C.includes(R)
  ), M = ["point", "line", "spline", "shape"].filter(
    (R) => C.includes(R)
  ), O = [...w, ...M];
  let A = n.get("mode") || "select";
  O.includes(A) || (A = O[0] || "select");
  let T = null, _ = null, N = null, H = 0, q = !1, B = null, j = null, P = { key: "", data: [] }, te = null, se = !1, fe = [], le = () => {
  }, he = () => {
  }, be = null, V = null, I = null, F = null;
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
    I = K(
      n.get("neighbor_indptr") || "",
      n.get("neighbor_indices") || "",
      n.get("neighbor_distances") || ""
    ), F = K(
      n.get("radius_indptr") || "",
      n.get("radius_indices") || "",
      n.get("radius_distances") || ""
    );
  }
  function K(R, k, D) {
    const U = ph(R), ee = ph(k), re = mh(D);
    return U.length ? { indptr: U, indices: ee, distances: re } : null;
  }
  z();
  function ne() {
    const R = n.get("category_columns") || [], k = n.get("active_category") || "";
    return R.findIndex((D) => D.name === k);
  }
  function oe(R) {
    n.get("category_columns");
    const k = ne(), D = Ke();
    return k < 0 || !be || !D.length ? Math.round(D[R]?.valueA || 0) : be[k * D.length + R];
  }
  const pe = ["#ff0099", "#b8ff00", "#00b7ff"];
  function we(R) {
    return (n.get("gene_columns") || []).find((D) => D.name === R) || null;
  }
  function qe(R, k) {
    const U = (n.get("gene_columns") || []).findIndex((re) => re.name === k), ee = Ke();
    return U < 0 || !V || !V.length || !ee.length ? null : V[U * ee.length + R];
  }
  function Ae(R, k, D) {
    const U = Number.isFinite(k) ? k : 0, ee = Number.isFinite(D) && D > U ? D : U + 1, re = Math.max(0, Math.min(1, R ?? 0)), ge = Math.max(0, U + re * (ee - U));
    return n.get("gene_log1p") ? Math.log1p(ge) : ge;
  }
  function Te(R, k) {
    const D = Number.isFinite(R) ? R : 0, U = Number.isFinite(k) && k > D ? k : D + 1, ee = Math.max(0, U), re = Math.max(0, D);
    if (n.get("gene_log1p")) {
      const ge = Math.log1p(re), Y = Math.log1p(ee);
      return Y > ge ? Y : Y + 1e-6;
    }
    return ee > re ? ee : ee + 1e-6;
  }
  function it(R, k) {
    const D = Number.isFinite(R) ? R : 0, U = Math.max(0, D);
    return n.get("gene_log1p") ? Math.log1p(U) : U;
  }
  function pt(R, k, D) {
    const U = we(k);
    if (!U) return 0;
    const ee = qe(R, k);
    if (ee == null) return 0;
    const re = U.vmin ?? 0, ge = U.vmax ?? 1, Y = Ae(ee, re, ge);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const He = D > 0 ? D : Te(re, ge);
      return Math.max(0, Math.min(1, Y / He));
    }
    const Se = it(re), Re = Te(re, ge);
    return Re <= Se ? 0 : Math.max(0, Math.min(1, (Y - Se) / (Re - Se)));
  }
  function ze(R) {
    let k = 0;
    for (const D of R) {
      const U = we(D);
      U && (k = Math.max(k, Te(U.vmin ?? 0, U.vmax ?? 1)));
    }
    return k;
  }
  function et(R, k) {
    const D = n.get("active_genes") || [], U = Ke();
    if (!D.length || !U.length) return null;
    const ee = (n.get("gene_scale_mode") || "independent") === "shared" ? ze(D) : 0;
    let re = 0, ge = 0, Y = 0, Z = 0;
    for (let Se = 0; Se < D.length; Se++) {
      const Re = pt(R, D[Se], ee);
      if (!(Re > 0)) continue;
      const He = Et(pe[Se % pe.length], 1);
      re += He[0] * Re, ge += He[1] * Re, Y += He[2] * Re, Z += Re;
    }
    return Z < 1e-6 ? Et("#6b7280", k * 0.35) : [
      Math.min(255, Math.round(re)),
      Math.min(255, Math.round(ge)),
      Math.min(255, Math.round(Y)),
      Math.round(Math.max(0, Math.min(1, k)) * 255)
    ];
  }
  let Ne = null, Le = [], Ue = !1, _e = null, Ze = "", Oe = -1, Je = !1, tt = !1, Xe = !1, ye = [], Q = !1, ce = null, Ie = null;
  function Ce(R, k) {
    const D = new Set((k || []).map((U) => String(U.id)));
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
    Le = [], ye = [], Xe = !1, Q = !1, ce = null, Ie = null;
  }
  function St(R) {
    const k = d.getBoundingClientRect();
    if (!k.width || !k.height) return null;
    const D = R.clientX - k.left, U = R.clientY - k.top, ee = T?.isInitialized ? T.getViewports()[0] : null;
    if (!ee) return null;
    const [re, ge] = ee.unproject([D, U]);
    return { x: re, y: ge, px: D, py: U };
  }
  function Bt() {
    return {
      dragPan: A === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function Nt() {
    const R = A === "select";
    d.style.cursor = R ? "grab" : "crosshair", T && T.setProps({ controller: Bt() });
  }
  function xt() {
    const R = Math.max(1, Math.round(c.clientWidth || 1)), k = Math.max(1, Math.round(c.clientHeight || 1));
    T && T.setProps({ width: R, height: k, useDevicePixels: !0 });
    const D = n.get("axes_pixel_bounds") || [0, 0, R, k];
    return (D[2] !== R || D[3] !== k) && (n.set("axes_pixel_bounds", [0, 0, R, k]), n.save_changes()), { w: R, h: k };
  }
  function on(R) {
    if (!Number.isFinite(R)) return "";
    const k = Math.abs(R);
    return k !== 0 && (k >= 1e3 || k < 0.01) ? R.toExponential(1) : k >= 100 ? R.toFixed(0) : k >= 10 ? R.toFixed(1) : R.toFixed(2);
  }
  function st() {
    if (!m) return;
    const R = n.get("color_by") || "categorical", k = n.get("legend_title") || "", D = n.get("point_palette") || [], U = n.get("active_genes") || [];
    if (m.innerHTML = "", k) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-title", ee.textContent = k, m.appendChild(ee);
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
    m.hidden = !k;
  }
  function Et(R, k) {
    const D = String(R || "#60a5fa").replace("#", ""), U = D.length === 3 ? D.split("").map((re) => re + re).join("") : D.padEnd(6, "0").slice(0, 6), ee = Number.parseInt(U, 16);
    return [
      ee >> 16 & 255,
      ee >> 8 & 255,
      ee & 255,
      Math.round(Math.max(0, Math.min(1, k)) * 255)
    ];
  }
  function Jt(R) {
    const k = n.get("point_opacity") ?? 0.75, D = n.get("color_by") || "categorical";
    let U;
    if (D === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        U = et(R.i, k) || Et("#6b7280", k * 0.35);
      else {
        const ge = n.get("point_palette") || ["#60a5fa"];
        if (ge.length > 1) {
          const Z = Math.max(0, Math.min(1, R.valueA)) * (ge.length - 1), Se = Math.floor(Z), Re = Math.min(ge.length - 1, Se + 1), He = Z - Se, ke = Et(ge[Se], k), Me = Et(ge[Re], k);
          U = ke.map((wt, It) => Math.round(wt + (Me[It] - wt) * He));
        } else
          U = Et(ge[0], k);
      }
    else {
      const re = n.get("category_columns") || [], ge = ne(), Y = ge >= 0 ? re[ge] : null, Z = Y && Y.palette || n.get("point_palette") || ["#60a5fa"], Se = Y ? oe(R.i) : Math.round(R.valueA);
      U = Et(Z[(Se % Z.length + Z.length) % Z.length], k);
    }
    if (!se || !te) return U;
    const ee = te[R.i] || 0;
    return ee === Gc || ee === dh ? (U[3] = 255, U) : (U[3] = Math.round((U[3] || 255) * 0.28), U);
  }
  function Rn(R) {
    const k = n.get("point_size") ?? 2;
    if (!se || !te) return k;
    const D = te[R.i] || 0;
    return D === Gc || D === dh ? k : k * jk;
  }
  function Ft(R) {
    return R.map((k) => [k.x, k.y]);
  }
  function Wt(R) {
    const k = Ft(R);
    if (!k.length) return k;
    const D = k[0], U = k[k.length - 1];
    return (D[0] !== U[0] || D[1] !== U[1]) && k.push(D), k;
  }
  function ot(R, k) {
    if (A === "ellipse") {
      const D = (R.x + k.x) / 2, U = (R.y + k.y) / 2, ee = Math.abs(k.x - R.x) / 2, re = Math.abs(k.y - R.y) / 2, ge = [];
      for (let Y = 0; Y < 64; Y++) {
        const Z = Y / 64 * Math.PI * 2;
        ge.push([D + ee * Math.cos(Z), U + re * Math.sin(Z)]);
      }
      return ge;
    }
    return [
      [R.x, R.y],
      [k.x, R.y],
      [k.x, k.y],
      [R.x, k.y]
    ];
  }
  function ut(R) {
    if (R.type === "polygon" || R.type === "lasso")
      return (R.vertices || []).map(([D, U]) => [D, U]);
    const k = -(R.angle || 0);
    if (R.type === "rectangle") {
      const D = R.cx, U = R.cy, ee = R.width, re = R.height, ge = { x: D, y: U };
      return [
        { x: D - ee / 2, y: U - re / 2 },
        { x: D + ee / 2, y: U - re / 2 },
        { x: D + ee / 2, y: U + re / 2 },
        { x: D - ee / 2, y: U + re / 2 }
      ].map((Y) => {
        const Z = jl(Y, ge, k);
        return [Z.x, Z.y];
      });
    }
    if (R.type === "ellipse") {
      const D = R.cx, U = R.cy, ee = R.rx, re = R.ry, ge = { x: D, y: U }, Y = [];
      for (let Z = 0; Z < 64; Z++) {
        const Se = Z / 64 * Math.PI * 2, Re = jl(
          { x: D + ee * Math.cos(Se), y: U + re * Math.sin(Se) },
          ge,
          k
        );
        Y.push([Re.x, Re.y]);
      }
      return Y;
    }
    return [];
  }
  function Ke() {
    const R = n.get("points_data") || "", [k, D] = n.get("x_bounds"), [U, ee] = n.get("y_bounds"), re = `${R.length}:${k}:${D}:${U}:${ee}:${R.slice(0, 32)}:${R.slice(-32)}`;
    if (re === P.key) return P.data;
    const ge = mh(R), Y = Math.floor(ge.length / 4), Z = new Array(Y);
    for (let Se = 0; Se < Y; Se++) {
      const Re = Se * 4;
      Z[Se] = {
        i: Se,
        x: k + (ge[Re] + 1) / 2 * (D - k),
        y: U + (ge[Re + 1] + 1) / 2 * (ee - U),
        valueA: ge[Re + 2]
      };
    }
    return P = { key: re, data: Z }, Z;
  }
  function Qt(R, k = 8) {
    const D = R / Math.max(k, 1), ee = 10 ** Math.floor(Math.log10(Math.max(D, 1e-12))), re = D / ee;
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
    const [k, D] = n.get("x_bounds"), [U, ee] = n.get("y_bounds");
    return { xMin: k, xMax: D, yMin: U, yMax: ee };
  }
  function _n() {
    const R = wn(), k = Math.max(R.xMax - R.xMin, R.yMax - R.yMin, 1e-9);
    return Qt(k, 8);
  }
  function Yt(R = !1) {
    const k = _n();
    !R && k === j || (j = k, dt());
  }
  function nl() {
    if (!_) return null;
    const { PathLayer: R } = _, k = wn(), D = j || Qt(Math.max(k.xMax - k.xMin, k.yMax - k.yMin, 1e-9), 8);
    j = D;
    const U = D * 2, ee = Math.floor((k.xMin - U) / D) * D, re = Math.floor((k.yMin - U) / D) * D, ge = [];
    for (let ke = ee; ke <= k.xMax + U + D * 0.5; ke += D)
      ge.push({
        path: [
          [ke, k.yMin - U],
          [ke, k.yMax + U]
        ]
      });
    for (let ke = re; ke <= k.yMax + U + D * 0.5; ke += D)
      ge.push({
        path: [
          [k.xMin - U, ke],
          [k.xMax + U, ke]
        ]
      });
    const Y = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [Z, Se, Re] = Yc(Y), He = [Math.round(Z * 255), Math.round(Se * 255), Math.round(Re * 255), 160];
    return new R({
      id: "landmarks-grid",
      data: ge,
      getPath: (ke) => ke.path,
      getColor: He,
      getWidth: 1,
      widthUnits: "pixels",
      pickable: !1
    });
  }
  function zt() {
    if (!_) return null;
    const { ScatterplotLayer: R } = _, k = Ke();
    if (!k.length) return null;
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
        data: k,
        getPosition: (re) => [re.x, re.y, 0],
        getFillColor: (re) => Jt(re),
        getRadius: (re) => Rn(re),
        radiusUnits: "common",
        radiusMinPixels: 0,
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
  function ao() {
    if (!_) return [];
    const { PolygonLayer: R } = _, k = n.get("selected_kind"), D = n.get("selected_index"), U = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ee = [];
    return (n.get("selections") || []).forEach((re, ge) => {
      const Y = ut(re);
      if (Y.length < 3) return;
      const Z = k === "selection" && ge === D;
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
        parameters: Ci
      })
    ] : [];
  }
  function Fn() {
    if (!_) return [];
    const { PathLayer: R, PolygonLayer: k, ScatterplotLayer: D } = _, U = n.get("selected_kind"), ee = n.get("selected_index"), re = n.get("stroke_width") || 2, ge = n.get("landmark_opacity") || 0.25, Y = [], Z = [], Se = [], Re = [], He = so(14);
    (n.get("landmarks") || []).forEach((Me, wt) => {
      if (Me.hidden) return;
      const It = Iv[wt % Iv.length], tn = U === "landmark" && wt === ee, Jn = tn ? re + 1 : re, Ot = Et(It, 1), pn = Et(It, ge), Sn = { kind: "landmark", index: wt };
      if (Me.type === "point") {
        const jn = (Me.vertices || [])[0];
        if (!jn) return;
        Se.push({
          position: [jn[0], jn[1], 0],
          fill: Ot,
          radius: tn ? 7 : 6,
          ...Sn
        });
        return;
      }
      const Wn = ol(Me);
      if (Me.type === "shape" && Wn.length >= 3) {
        Y.push({
          polygon: Ft(Wn),
          fill: pn,
          line: Ot,
          width: Jn,
          ...Sn
        }), (Me.vertices || []).forEach(([jn, xl]) => {
          Se.push({
            position: [jn, xl, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
        return;
      }
      const uo = Jl(Me);
      if (uo && Y.push({
        polygon: Ft(uo),
        fill: Et(fh, zk),
        line: Et(fh, Dk),
        width: 1.5,
        ...Sn
      }), Wn.length >= 2) {
        const jn = Ft(Wn);
        if (Z.push({
          path: jn,
          color: Ot,
          width: Jn,
          ...Sn
        }), ["line", "spline", "gradient"].includes(Me.type)) {
          const xl = Dl(jn, He);
          xl && Re.push({ polygon: xl, fill: Ot, line: Ot, width: 1, ...Sn });
        }
        (Me.vertices || []).forEach(([xl, fo]) => {
          Se.push({
            position: [xl, fo, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
      }
    });
    const ke = [];
    return (Y.length || Re.length) && ke.push(
      new k({
        id: "landmark-polygons",
        data: [...Y, ...Re],
        getPolygon: (Me) => Me.polygon,
        getFillColor: (Me) => Me.fill,
        getLineColor: (Me) => Me.line,
        getLineWidth: (Me) => Me.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: Ci
      })
    ), Z.length && ke.push(
      new R({
        id: "landmark-paths",
        data: Z,
        getPath: (Me) => Me.path,
        getColor: (Me) => Me.color,
        getWidth: (Me) => Me.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !0,
        widthMinPixels: 1,
        parameters: Ci
      })
    ), Se.length && ke.push(
      new D({
        id: "landmark-markers",
        data: Se,
        getPosition: (Me) => Me.position,
        getFillColor: (Me) => Me.fill,
        getRadius: (Me) => Me.radius,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !0,
        radiusMinPixels: 2,
        parameters: Ci
      })
    ), ke;
  }
  function rn() {
    if (!_) return [];
    const { PathLayer: R, PolygonLayer: k, ScatterplotLayer: D } = _, U = ["lasso", "polygon", "rectangle", "ellipse"].includes(A), ee = U ? "#94a3b8" : "#00e5ff", re = Et(ee, 1), ge = Et(ee, 0.15), Y = n.get("stroke_width") || 4, Z = [];
    let Se = null, Re = null, He = [];
    if (Xe && ye.length >= 2)
      Se = Ft(ye);
    else if (Q && ce && Ie)
      Re = ot(ce, Ie);
    else if (Le.length) {
      const ke = A === "spline" ? Yn(Le, n.get("default_tension") ?? 0, 20, !1) : A === "shape" ? Yn(Le, n.get("default_tension") ?? 0, 20, !0) : Le;
      A === "polygon" || A === "shape" ? (Re = Ft(ke), Se = Wt(ke)) : Se = Ft(ke), He = Le.map((Me) => ({ position: [Me.x, Me.y, 0], fill: re }));
    }
    return Re && Re.length >= 3 ? Z.push(
      new k({
        id: "draft-polygon",
        data: [{ polygon: Re, fill: ge, line: re, width: 2 }],
        getPolygon: (ke) => ke.polygon,
        getFillColor: (ke) => ke.fill,
        getLineColor: (ke) => ke.line,
        getLineWidth: (ke) => ke.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !1,
        parameters: Ci
      })
    ) : Se && Se.length >= 2 && Z.push(
      new R({
        id: "draft-path",
        data: [{ path: Se, color: re, width: U ? 2 : Y }],
        getPath: (ke) => ke.path,
        getColor: (ke) => ke.color,
        getWidth: (ke) => ke.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: Ci
      })
    ), He.length && Z.push(
      new D({
        id: "draft-markers",
        data: He,
        getPosition: (ke) => ke.position,
        getFillColor: (ke) => ke.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: Ci
      })
    ), Z;
  }
  function so(R) {
    const k = T?.isInitialized ? T.getViewports()?.[0] : null;
    if (!k?.unproject) return R;
    const [D] = k.unproject([0, 0]), [U] = k.unproject([R, 0]);
    return Math.max(Math.abs(U - D), 1e-9);
  }
  function Dl(R, k) {
    if (!R || R.length < 2 || !(k > 0)) return null;
    const D = R[R.length - 2], U = R[R.length - 1], ee = Math.hypot(U[0] - D[0], U[1] - D[1]) || 1, re = (U[0] - D[0]) / ee, ge = (U[1] - D[1]) / ee, Y = -ge, Z = re, Se = [U[0] + re * k * 0.15, U[1] + ge * k * 0.15], Re = [U[0] - re * k, U[1] - ge * k];
    return [
      Se,
      [Re[0] + Y * k * 0.55, Re[1] + Z * k * 0.55],
      [Re[0] - Y * k * 0.55, Re[1] - Z * k * 0.55]
    ];
  }
  function ll(R, k, D, U) {
    const ee = [], re = [];
    if (!R || !D.length) return { edges: ee, neighbors: re };
    const ge = U?.mode || "knn", Y = Math.max(0, U?.k | 0), Z = Number(U?.radius) || 0;
    if (ge === "knn" && Y <= 0) return { edges: ee, neighbors: re };
    if (ge === "radius" && !(Z > 0)) return { edges: ee, neighbors: re };
    const { indptr: Se, indices: Re, distances: He } = R, ke = /* @__PURE__ */ new Set();
    for (const Me of D) {
      const wt = Se[Me] | 0, It = Se[Me + 1] | 0, tn = k[Me], Jn = ge === "knn" ? Math.min(It, wt + Y) : It;
      for (let Ot = wt; Ot < Jn && !(ge === "radius" && (He && He.length ? He[Ot] : 0) > Z); Ot++) {
        const pn = Re[Ot] | 0;
        ke.has(pn) || (ke.add(pn), re.push(pn)), ee.push({
          path: [
            [tn.x, tn.y],
            [k[pn].x, k[pn].y]
          ]
        });
      }
    }
    return { edges: ee, neighbors: re };
  }
  function Co() {
    if (!_) return [];
    const R = yl(), k = Qo(R);
    if (!R || !k || k.neighborhood === "off") return [];
    Ke();
    const D = [], { PathLayer: U } = _, ee = { kind: R.kind, index: R.index };
    return (k.neighborhood === "radius" || k.neighborhood === "knn") && fe.length && D.push(
      new U({
        id: `neighborhood-${k.neighborhood}`,
        data: fe.map((re) => ({ ...re, ...ee })),
        getPath: (re) => re.path,
        getColor: Et(fh, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: Ci
      })
    ), D;
  }
  function an() {
    return sn(), [
      nl(),
      ...Co(),
      ...zt(),
      ...ao(),
      ...Fn(),
      ...rn()
    ].filter(Boolean);
  }
  function Ct(R, k) {
    const [D, U] = n.get("x_bounds"), [ee, re] = n.get("y_bounds"), ge = (D + U) / 2, Y = (ee + re) / 2, Z = Math.max(U - D, 1e-6), Se = Math.max(re - ee, 1e-6), Re = 40, He = Math.log2(
      Math.min((R - Re * 2) / Z, (k - Re * 2) / Se)
    );
    return {
      target: [ge, Y, 0],
      zoom: He,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function Rt() {
    if (!T) return;
    const R = Math.max(1, d.clientWidth || d.width), k = Math.max(1, d.clientHeight || d.height);
    R <= 1 || k <= 1 || (N = Ct(R, k), B = N.zoom, T.setProps({ viewState: N, width: R, height: k }), q = !0);
  }
  function Ye(R, { animate: k = !1, duration: D = 320 } = {}) {
    if (!T) return;
    const U = {
      ...N,
      ...R,
      transitionDuration: k ? D : 0
    };
    k && (!Ne && _?.LinearInterpolator && (Ne = new _.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), Ne && (U.transitionInterpolator = Ne), U.transitionEasing = Lk), N = U, T.setProps({ viewState: U });
  }
  le = (R) => {
    if (!T || !N) return;
    const k = N.minZoom ?? -20, D = N.maxZoom ?? 20, U = Math.max(k, Math.min(D, (N.zoom ?? 0) + R));
    Ye({ zoom: U }, { animate: !0 });
  }, he = () => {
    if (!T) return;
    const R = Math.max(1, d.clientWidth || d.width), k = Math.max(1, d.clientHeight || d.height);
    if (R <= 1 || k <= 1) return;
    const D = Ct(R, k);
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
    const k = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return k || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const R = Gn();
    f.style.background = R, d.style.background = R, T && (T.setProps({
      parameters: { clearColor: Yc(R) },
      ...N ? { viewState: N } : {}
    }), typeof T.redraw == "function" && T.redraw(!0));
  };
  function Li(R) {
    if (!T) return;
    const k = Gn();
    T.setProps({
      parameters: { clearColor: Yc(k) },
      ...R,
      ...N ? { viewState: N } : {}
    });
  }
  function dt() {
    !T || !_ || H || (H = requestAnimationFrame(() => {
      H = 0, Li({ layers: an() });
    }));
  }
  async function Vi() {
    if (_) return _;
    const R = await import(
      /* @vite-ignore */
      kk
    ), k = await import(
      /* @vite-ignore */
      Nk
    );
    return _ = {
      Deck: R.Deck,
      OrthographicView: R.OrthographicView,
      LinearInterpolator: R.LinearInterpolator,
      ScatterplotLayer: k.ScatterplotLayer,
      PathLayer: k.PathLayer,
      PolygonLayer: k.PolygonLayer
    }, _;
  }
  async function $l() {
    if (T) return;
    const { w: R, h: k } = xt();
    d.style.display = "block", h();
    try {
      const { Deck: D, OrthographicView: U } = await Vi(), ee = an();
      if (!ee.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const re = Ct(R, k);
      N = re, B = re.zoom;
      const ge = Gn();
      T = new D({
        canvas: d,
        width: R,
        height: k,
        useDevicePixels: !0,
        views: new U(),
        controller: Bt(),
        initialViewState: re,
        parameters: { clearColor: Yc(ge) },
        layers: ee,
        pickingRadius: 8,
        getCursor: ({ isDragging: Y, isHovering: Z }) => Y ? "grabbing" : Z ? "pointer" : A === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: Y }) => {
          N = Y, T.setProps({ viewState: Y }), Yt();
        },
        onClick: (Y) => {
          if (A !== "select") return;
          const Z = Y?.object;
          Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type" ? zn(Z.kind, Z.index) : zn("", -1);
        },
        onHover: (Y) => {
          const Z = Y?.object;
          if (Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          A === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          st(), requestAnimationFrame(() => {
            xt(), Rt(), Li({ layers: an() }), typeof T.redraw == "function" && T.redraw(!0);
          });
        }
      }), Nt();
    } catch (D) {
      console.error("landmarks deck init failed", D);
      const U = document.createElement("div");
      U.className = "landmarks__error", U.textContent = `Deck renderer failed: ${D?.message || D}`, f.appendChild(U);
    }
  }
  function co() {
    if (!T) return;
    const { w: R, h: k } = xt();
    Li({ width: R, height: k }), !q && R > 1 && k > 1 ? Rt() : typeof T.redraw == "function" && T.redraw(!0);
  }
  function Yn(R, k, D, U) {
    const ee = D, ge = (1 - Math.max(0, Math.min(1, k ?? 0))) / 2;
    let Y = R.slice(), Z, Se;
    if (U) {
      if (Y.length >= 2) {
        const ke = Y[0], Me = Y[Y.length - 1];
        ke.x === Me.x && ke.y === Me.y && (Y = Y.slice(0, -1));
      }
      if (Y.length < 3) return Y.slice();
      const He = Y.length;
      Se = (ke) => Y[(ke % He + He) % He], Z = He;
    } else {
      if (Y.length < 2 || Y.length === 2) return Y.slice();
      const He = [
        { x: 2 * Y[0].x - Y[1].x, y: 2 * Y[0].y - Y[1].y },
        ...Y,
        {
          x: 2 * Y[Y.length - 1].x - Y[Y.length - 2].x,
          y: 2 * Y[Y.length - 1].y - Y[Y.length - 2].y
        }
      ];
      Se = (ke) => He[ke + 1], Z = Y.length - 1;
    }
    const Re = [];
    for (let He = 0; He < Z; He++) {
      const ke = Se(He - 1), Me = Se(He), wt = Se(He + 1), It = Se(He + 2), tn = ge * (wt.x - ke.x), Jn = ge * (wt.y - ke.y), Ot = ge * (It.x - Me.x), pn = ge * (It.y - Me.y);
      for (let Sn = 0; Sn < ee; Sn++) {
        const Wn = Sn / ee, uo = Wn * Wn, jn = uo * Wn, xl = 2 * jn - 3 * uo + 1, fo = jn - 2 * uo + Wn, Bi = -2 * jn + 3 * uo, ba = jn - uo;
        Re.push({
          x: xl * Me.x + fo * tn + Bi * wt.x + ba * Ot,
          y: xl * Me.y + fo * Jn + Bi * wt.y + ba * pn
        });
      }
    }
    return Re.push({ ...Se(U ? Z : Y.length - 1) }), Re;
  }
  function jl(R, k, D) {
    const U = Math.cos(D), ee = Math.sin(D), re = R.x - k.x, ge = R.y - k.y;
    return { x: k.x + re * U - ge * ee, y: k.y + re * ee + ge * U };
  }
  function ol(R) {
    const k = (R.vertices || []).map(([D, U]) => ({ x: D, y: U }));
    return R.type === "spline" || R.type === "gradient" ? Yn(k, R.tension ?? 0, 20, !1) : R.type === "shape" ? Yn(k, R.tension ?? 0, 20, !0) : k;
  }
  function il() {
    const [R, k] = n.get("x_bounds"), [D, U] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(k - R), Math.abs(U - D));
  }
  function en() {
    return Math.max(1, n.get("neighbor_k_max") || 64);
  }
  function mn() {
    const R = Number(n.get("neighbor_radius_max") || 0);
    return R > 0 ? R : il();
  }
  function An(R, k) {
    return R.map((D, U) => {
      const ee = R[Math.max(0, U - 1)], re = R[Math.min(R.length - 1, U + 1)], ge = Math.hypot(re.x - ee.x, re.y - ee.y) || 1, Y = (re.x - ee.x) / ge, Z = (re.y - ee.y) / ge;
      return { x: D.x - Z * k, y: D.y + Y * k };
    });
  }
  function Jl(R) {
    const k = Number(R.buffer_width || 0);
    if (!(k > 0) || !hh.includes(R.type)) return null;
    const D = ol(R);
    if (D.length < 2) return null;
    const U = R.buffer_side || "both";
    return U === "left" ? [...D, ...An(D, k).reverse()] : U === "right" ? [...D, ...An(D, -k).reverse()] : [...An(D, k), ...An(D, -k).reverse()];
  }
  function yl() {
    const R = n.get("selected_kind"), k = n.get("selected_index");
    return R === "type" || R === "selection" ? { kind: R, index: k } : null;
  }
  function Hi() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function Qo(R) {
    return R ? Q1(
      R.kind,
      R.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function Zo() {
    return Qo(yl());
  }
  function Sr() {
    const R = Hi();
    if (!R) return null;
    const k = n.get("landmarks") || [];
    return R.index >= 0 && R.index < k.length ? k[R.index] : null;
  }
  function Wl(R) {
    const k = yl();
    k && (Z1(
      n,
      k.kind,
      k.index,
      R,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), dt());
  }
  function $o(R) {
    const k = Ke();
    if (!R) return [];
    if (R.kind === "type")
      return k.reduce((D, U, ee) => (oe(ee) === R.index && D.push(ee), D), []);
    if (R.kind === "selection") {
      const D = (n.get("selections") || [])[R.index], U = ut(D || {});
      return U.length < 3 ? [] : k.reduce((ee, re, ge) => (rl(re, U) && ee.push(ge), ee), []);
    }
    return [];
  }
  function rl(R, k) {
    let D = !1;
    for (let U = 0, ee = k.length - 1; U < k.length; ee = U++) {
      const re = k[U][0], ge = k[U][1], Y = k[ee][0], Z = k[ee][1];
      ge > R.y != Z > R.y && R.x < (Y - re) * (R.y - ge) / (Z - ge + 1e-12) + re && (D = !D);
    }
    return D;
  }
  function sn() {
    const R = Ke();
    te = new Uint8Array(R.length), se = !1, fe = [];
    const k = yl();
    if (!k) return;
    const D = $o(k);
    if (!D.length) {
      se = !0;
      return;
    }
    se = !0;
    for (const re of D) te[re] = Gc;
    const U = Qo(k);
    if (!U || U.neighborhood === "off") return;
    const ee = U.neighborhood === "radius" ? F : I;
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
        te[Se] !== Gc && (te[Se] = dh);
    }
  }
  function Qn(R) {
    const k = Hi();
    k && ($1(n, k.index, R, n.get("landmarks") || []), dt());
  }
  function Zn(R) {
    if (!T?.isInitialized || !R) return null;
    const D = T.pickObject({ x: R.px, y: R.py, radius: 8 })?.object;
    return D?.kind ? { kind: D.kind, index: D.index } : null;
  }
  function zn(R, k) {
    Hh(n, R, k), dt();
  }
  function Dn() {
    st();
  }
  function Ro() {
    if (!["polygon", "line", "spline", "shape"].includes(A)) return;
    const k = A === "line" || A === "spline" ? 2 : 3;
    if (Le.length < k) {
      Le = [], dt();
      return;
    }
    if (A === "polygon") {
      const ee = [...n.get("selections") || []];
      ee.push(Bc({
        id: nt(ee),
        type: "polygon",
        vertices: Le.map((re) => [re.x, re.y])
      })), Le = [], n.set("selections", ee), n.set("selected_kind", "selection"), n.set("selected_index", ee.length - 1), n.save_changes(), Dn(), dt();
      return;
    }
    const D = [...n.get("landmarks") || []], U = {
      id: Ge(D),
      type: A,
      vertices: Le.map((ee) => [ee.x, ee.y])
    };
    (A === "spline" || A === "shape") && (U.tension = n.get("default_tension") ?? 0), hh.includes(A) && (U.buffer_width = n.get("default_buffer_width") ?? 0, U.buffer_side = n.get("default_buffer_side") || "both"), D.push(U), Le = [], n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Dn(), dt();
  }
  function ga(R, k) {
    if (T?.isInitialized) {
      const D = T.getViewports()[0];
      if (D) {
        const U = D.unproject([0, 0]), ee = D.unproject([R, k]);
        return { dx: ee[0] - U[0], dy: ee[1] - U[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function Mn(R, k, D, U) {
    const { dx: ee, dy: re } = ga(D, U);
    if (R === "landmark") {
      const ge = n.get("landmarks") || [];
      n.set(
        "landmarks",
        ge.map(
          (Y, Z) => Z !== k ? Y : { ...Y, vertices: (Y.vertices || []).map(([Se, Re]) => [Se + ee, Re + re]) }
        )
      );
    } else {
      const ge = n.get("selections") || [];
      n.set(
        "selections",
        ge.map((Y, Z) => Z !== k ? Y : Y.vertices ? { ...Y, vertices: Y.vertices.map(([Se, Re]) => [Se + ee, Re + re]) } : { ...Y, cx: Y.cx + ee, cy: Y.cy + re })
      );
    }
    n.save_changes(), dt();
  }
  function Ii(R) {
    if (A === "select") return;
    R.preventDefault(), d.focus();
    const k = St(R);
    if (!k) return;
    Je = !1;
    const D = Zn(k);
    if (A === "lasso") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        Ue = !0, _e = k, Ze = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      Xe = !0, ye = [k], dt();
      return;
    }
    if (A === "rectangle" || A === "ellipse") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        Ue = !0, _e = k, Ze = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      Q = !0, ce = k, Ie = k, dt();
      return;
    }
    if (Le.length === 0) {
      const U = n.get("selected_kind"), ee = n.get("selected_index");
      if (D && D.kind === U && D.index === ee) {
        Ue = !0, _e = k, Ze = D.kind, Oe = D.index, d.style.cursor = "grabbing";
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      ee >= 0 && zn("", -1);
    }
  }
  function Er(R) {
    const k = St(R);
    if (!k) return;
    if (Ue && _e && Oe >= 0) {
      const ee = k.px - _e.px, re = k.py - _e.py;
      (ee || re) && (Je = !0), Mn(Ze, Oe, ee, re), _e = k;
      return;
    }
    if (Xe) {
      ye.push(k), dt();
      return;
    }
    if (Q) {
      Ie = k, dt();
      return;
    }
    if (Le.length > 0 && ["polygon", "line", "spline", "shape"].includes(A)) {
      const ee = A === "line" || A === "spline" ? 2 : 3;
      v(Le.length >= ee ? "Enter to finish" : "Click", R.clientX, R.clientY);
      return;
    }
    if (A === "select") return;
    const U = Zn(k);
    if (U && (U.kind === "landmark" || U.kind === "selection")) {
      const re = (U.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[U.index]?.id;
      if (re) {
        v(String(re), R.clientX, R.clientY);
        return;
      }
    }
    x();
  }
  function Jo(R) {
    if (A === "select" && !Ue) return;
    const k = St(R);
    if (Xe) {
      if (Xe = !1, ye.length >= 3) {
        const D = [...n.get("selections") || []];
        D.push(Bc({
          id: nt(D),
          type: "lasso",
          vertices: ye.map((U) => [U.x, U.y])
        })), n.set("selections", D), n.set("selected_kind", "selection"), n.set("selected_index", D.length - 1), n.save_changes();
      }
      ye = [], Dn(), dt();
      return;
    }
    if (Q) {
      if (Q = !1, ce && Ie) {
        const D = ce, U = Ie, ee = (D.x + U.x) / 2, re = (D.y + U.y) / 2, ge = Math.abs(U.x - D.x), Y = Math.abs(U.y - D.y);
        if (ge > 1e-6 && Y > 1e-6) {
          const Z = [...n.get("selections") || []];
          A === "rectangle" ? Z.push(Bc({ id: nt(Z), type: "rectangle", cx: ee, cy: re, width: ge, height: Y, angle: 0 })) : Z.push(Bc({ id: nt(Z), type: "ellipse", cx: ee, cy: re, rx: ge / 2, ry: Y / 2, angle: 0 })), n.set("selections", Z), n.set("selected_kind", "selection"), n.set("selected_index", Z.length - 1), n.save_changes();
        }
      }
      ce = null, Ie = null, Dn(), dt();
      return;
    }
    if (Ue && (Ue = !1, _e = null, Ze = "", Oe = -1, d.style.cursor = "crosshair", Je)) {
      tt = !0, Je = !1;
      return;
    }
    if (tt) {
      tt = !1;
      return;
    }
    if (k && !(A === "select" || A === "lasso" || A === "rectangle" || A === "ellipse")) {
      if (A === "point") {
        const D = [...n.get("landmarks") || []];
        D.push({ id: Ge(D), type: "point", vertices: [[k.x, k.y]] }), n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Dn(), dt();
        return;
      }
      Le.push({ x: k.x, y: k.y }), dt();
    }
  }
  function vl() {
    x(), Ue && (Ue = !1, _e = null), Xe && (Xe = !1, ye = [], dt()), Q && (Q = !1, ce = null, Ie = null, dt());
  }
  function Ui(R) {
    R.preventDefault(), Le.length && Le.pop(), Ro(), x();
  }
  function wo(R) {
    R.key === "Enter" ? (R.preventDefault(), Ro(), x()) : R.key === "Escape" ? (Tt(), zn("", -1), dt()) : (R.key === "Backspace" || R.key === "Delete") && Le.length && (Le.pop(), dt());
  }
  const Ll = new AbortController(), { signal: al } = Ll;
  d.addEventListener(
    "wheel",
    (R) => {
      if (!R.shiftKey) return;
      const k = Sr();
      if (k && hh.includes(k.type)) {
        R.preventDefault(), R.stopImmediatePropagation();
        const U = il(), ee = U / 40, re = Math.max(
          0,
          Math.min(U, (Number(k.buffer_width) || 0) + (R.deltaY > 0 ? -ee : ee))
        );
        Qn({ buffer_width: re });
        return;
      }
      const D = Zo();
      if (!(!D || D.neighborhood === "off")) {
        if (R.preventDefault(), R.stopImmediatePropagation(), D.neighborhood === "knn") {
          const U = en(), ee = Math.max(
            1,
            Math.min(U, (Number(D.neighborhood_k) || 12) + (R.deltaY > 0 ? -1 : 1))
          );
          Wl({ neighborhood: "knn", neighborhood_k: ee });
          return;
        }
        if (D.neighborhood === "radius") {
          const U = mn(), ee = U / 40, re = Math.max(
            0,
            Math.min(U, (Number(D.neighborhood_radius) || 0) + (R.deltaY > 0 ? -ee : ee))
          );
          Wl({ neighborhood: "radius", neighborhood_radius: re });
        }
      }
    },
    { capture: !0, passive: !1, signal: al }
  ), d.addEventListener("mousedown", Ii, { signal: al }), d.addEventListener("mousemove", Er, { signal: al }), d.addEventListener("mouseup", Jo, { signal: al }), d.addEventListener("mouseleave", vl, { signal: al }), d.addEventListener("dblclick", Ui, { signal: al }), d.addEventListener("keydown", wo, { signal: al });
  const Wo = [];
  function cn(R, k) {
    const D = `change:${R}`;
    n.on(D, k), Wo.push(() => n.off?.(D, k));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((R) => {
    cn(R, () => {
      dt(), Dn();
    });
  }), cn("mode", () => {
    A = n.get("mode"), Tt(), Nt(), dt();
  }), cn("width", () => {
    co();
  }), cn("height", () => {
    co();
  }), cn("points_data", () => {
    P = { key: "", data: [] }, T ? dt() : $l(), st();
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
  let sl = null, eo = 0, _o = !1;
  const to = () => {
    if (_o) return;
    const R = c.clientWidth, k = c.clientHeight;
    if (R <= 1 || k <= 1) {
      eo = requestAnimationFrame(to);
      return;
    }
    eo = requestAnimationFrame(async () => {
      if (await $l(), _o) {
        T && typeof T.finalize == "function" && T.finalize(), T = null;
        return;
      }
      dt(), sl = new ResizeObserver(() => co()), sl.observe(c);
    });
  };
  eo = requestAnimationFrame(to);
  function $n() {
    _o = !0, Ll.abort(), Wo.forEach((R) => R()), y.disconnect(), sl?.disconnect(), eo && cancelAnimationFrame(eo), H && cancelAnimationFrame(H), T && typeof T.finalize == "function" && T.finalize(), T = null, o.replaceChildren();
  }
  return {
    zoomBy: (R) => le(R),
    resetZoom: () => he(),
    resize: () => co(),
    destroy: $n
  };
}
function Vk(n, o) {
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
const Hk = [
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
function Ik(n) {
  const o = Vk(n, Hk);
  return {
    ...o,
    setMode(r) {
      wk(n, r);
    },
    select(r, a) {
      Hh(n, r, a);
    },
    setActiveCategory(r) {
      Vh(n, r);
    },
    setActiveGenes(r) {
      Ek(n, r);
    },
    setGeneScaleMode(r) {
      Ck(n, r);
    },
    setGeneLog1p(r) {
      Rk(n, r);
    },
    selectType(r, a) {
      r.name !== o.active_category && Vh(n, r), Hh(n, "type", a);
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
      _k(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      Ak(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, a) {
      Mk(n, r, a, o.selections);
    },
    renameLandmark(r, a) {
      Tk(n, r, a, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      Ok(n, r, o.landmarks);
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
function Uk(n, o) {
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
const Bk = 700, Gk = 640, Yk = 400, qk = 1400;
function Pk({
  model: n,
  hostEl: o
}) {
  const r = hC(o.parentElement), a = Ik(n), c = b.useRef(null), f = b.useRef(null), d = b.useRef(null), [m, g] = b.useState(null), [h, y] = b.useState(Bk), v = b.useCallback(() => {
    d.current?.resize();
  }, []), { isFullscreen: x, overlay: C, toggle: w } = Uk(
    f,
    v
  );
  b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const O = c.current;
    if (!O) return;
    const A = Uv({ model: n, host: O });
    return d.current = A, () => {
      A.destroy(), d.current = null;
    };
  }, [n, Uv]);
  const M = b.useCallback(
    (O) => {
      O.preventDefault(), O.stopPropagation();
      const A = f.current;
      if (!A) return;
      const T = A.getBoundingClientRect(), _ = o.parentElement?.getBoundingClientRect(), N = _ && _.width > 0 ? _.width : T.width, H = Math.min(window.innerHeight * 0.9, qk), q = {
        x: O.clientX,
        y: O.clientY,
        w: T.width,
        h: T.height,
        maxW: N,
        maxH: H
      }, B = (P) => {
        g(
          Math.round(
            Math.min(q.maxW, Math.max(Gk, q.w + (P.clientX - q.x)))
          )
        ), y(
          Math.round(
            Math.min(q.maxH, Math.max(Yk, q.h + (P.clientY - q.y)))
          )
        );
      }, j = () => {
        window.removeEventListener("pointermove", B), window.removeEventListener("pointerup", j), v();
      };
      window.addEventListener("pointermove", B), window.addEventListener("pointerup", j);
    },
    [o, v]
  );
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      ref: f,
      className: We(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        r && "dark landmarks--dark",
        !r && "landmarks--light",
        C && "landmarks--overlay-fs"
      ),
      style: x || m == null ? void 0 : { width: m },
      children: [
        /* @__PURE__ */ S.jsx(
          "div",
          {
            className: "landmarks__body",
            style: x ? void 0 : { height: h },
            children: /* @__PURE__ */ S.jsxs("div", { className: "landmarks__figure", children: [
              /* @__PURE__ */ S.jsx(
                ak,
                {
                  modes: a.modes,
                  mode: a.mode,
                  onMode: (O) => a.setMode(O),
                  fullscreen: x,
                  onToggleFullscreen: () => {
                    w();
                  }
                }
              ),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks__main landmarks__main--plot", children: [
                /* @__PURE__ */ S.jsx(
                  "div",
                  {
                    ref: c,
                    className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
                  }
                ),
                /* @__PURE__ */ S.jsx(
                  xk,
                  {
                    onZoomIn: () => d.current?.zoomBy(1),
                    onZoomOut: () => d.current?.zoomBy(-1),
                    onReset: () => d.current?.resetZoom()
                  }
                ),
                x ? null : /* @__PURE__ */ S.jsx(
                  "button",
                  {
                    type: "button",
                    className: "landmarks__resize",
                    "aria-label": "Resize widget",
                    title: "Resize",
                    onPointerDown: M
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(yk, { lm: a })
            }
          ),
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(vk, { lm: a })
            }
          )
        ] })
      ]
    }
  );
}
const as = /* @__PURE__ */ new WeakMap();
function Xk({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = as.get(o);
  r && (r.unmount(), as.delete(o));
  const a = fC.createRoot(o);
  return as.set(o, a), a.render(/* @__PURE__ */ S.jsx(Pk, { model: n, hostEl: o })), () => {
    a.unmount(), as.get(o) === a && as.delete(o);
  };
}
const $k = { render: Xk };
export {
  $k as default
};
