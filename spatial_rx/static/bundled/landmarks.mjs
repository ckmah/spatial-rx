var my = (n) => {
  throw TypeError(n);
};
var py = (n, o, r) => o.has(n) || my("Cannot " + r);
var qn = (n, o, r) => (py(n, o, "read from private field"), r ? r.call(n) : o.get(n)), gy = (n, o, r) => o.has(n) ? my("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Od = (n, o, r, a) => (py(n, o, "write to private field"), a ? a.call(n, r) : o.set(n, r), r);
function nC(n, o) {
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
function lC(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var kd = { exports: {} }, os = {};
var by;
function oC() {
  if (by) return os;
  by = 1;
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
var yy;
function iC() {
  return yy || (yy = 1, kd.exports = oC()), kd.exports;
}
var S = iC(), Nd = { exports: {} }, is = {}, zd = { exports: {} }, Dd = {};
var vy;
function rC() {
  return vy || (vy = 1, (function(n) {
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
    var g = [], h = [], v = 1, x = null, y = 3, C = !1, w = !1, A = !1, O = !1, M = typeof setTimeout == "function" ? setTimeout : null, T = typeof clearTimeout == "function" ? clearTimeout : null, _ = typeof setImmediate < "u" ? setImmediate : null;
    function N(V) {
      for (var H = r(h); H !== null; ) {
        if (H.callback === null) a(h);
        else if (H.startTime <= V)
          a(h), H.sortIndex = H.expirationTime, o(g, H);
        else break;
        H = r(h);
      }
    }
    function I(V) {
      if (A = !1, N(V), !w)
        if (r(g) !== null)
          w = !0, q || (q = !0, fe());
        else {
          var H = r(h);
          H !== null && be(I, H.startTime - V);
        }
    }
    var q = !1, Y = -1, L = 5, X = -1;
    function te() {
      return O ? !0 : !(n.unstable_now() - X < L);
    }
    function se() {
      if (O = !1, q) {
        var V = n.unstable_now();
        X = V;
        var H = !0;
        try {
          e: {
            w = !1, A && (A = !1, T(Y), Y = -1), C = !0;
            var F = y;
            try {
              t: {
                for (N(V), x = r(g); x !== null && !(x.expirationTime > V && te()); ) {
                  var ve = x.callback;
                  if (typeof ve == "function") {
                    x.callback = null, y = x.priorityLevel;
                    var ae = ve(
                      x.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof ae == "function") {
                      x.callback = ae, N(V), H = !0;
                      break t;
                    }
                    x === r(g) && a(g), N(V);
                  } else a(g);
                  x = r(g);
                }
                if (x !== null) H = !0;
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
              x = null, y = F, C = !1;
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
      Y = M(function() {
        V(n.unstable_now());
      }, H);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, n.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : L = 0 < V ? Math.floor(1e3 / V) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return y;
    }, n.unstable_next = function(V) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = y;
      }
      var F = y;
      y = H;
      try {
        return V();
      } finally {
        y = F;
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
      var F = y;
      y = V;
      try {
        return H();
      } finally {
        y = F;
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
        id: v++,
        callback: H,
        priorityLevel: V,
        startTime: F,
        expirationTime: ae,
        sortIndex: -1
      }, F > ve ? (V.sortIndex = F, o(h, V), r(g) === null && V === r(h) && (A ? (T(Y), Y = -1) : A = !0, be(I, F - ve))) : (V.sortIndex = ae, o(g, V), w || C || (w = !0, q || (q = !0, fe()))), V;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(V) {
      var H = y;
      return function() {
        var F = y;
        y = H;
        try {
          return V.apply(this, arguments);
        } finally {
          y = F;
        }
      };
    };
  })(Dd)), Dd;
}
var xy;
function aC() {
  return xy || (xy = 1, zd.exports = rC()), zd.exports;
}
var jd = { exports: {} }, lt = {};
var Sy;
function sC() {
  if (Sy) return lt;
  Sy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), x = /* @__PURE__ */ Symbol.for("react.activity"), y = Symbol.iterator;
  function C(z) {
    return z === null || typeof z != "object" ? null : (z = y && z[y] || z["@@iterator"], typeof z == "function" ? z : null);
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
  var N = _.prototype = new T();
  N.constructor = _, A(N, M.prototype), N.isPureReactComponent = !0;
  var I = Array.isArray;
  function q() {
  }
  var Y = { H: null, A: null, T: null, S: null }, L = Object.prototype.hasOwnProperty;
  function X(z, K, ne) {
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
    return X(z.type, K, z.props);
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
            case v:
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
    var Ae = oe === "" ? "." : oe + ":";
    if (I(z))
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
  return lt.Activity = x, lt.Children = ae, lt.Component = M, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = _, lt.StrictMode = a, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(z) {
      return Y.H.useMemoCache(z);
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
        !L.call(K, we) || we === "key" || we === "__self" || we === "__source" || we === "ref" && K.ref === void 0 || (oe[we] = K[we]);
    var we = arguments.length - 2;
    if (we === 1) oe.children = ne;
    else if (1 < we) {
      for (var qe = Array(we), Ae = 0; Ae < we; Ae++)
        qe[Ae] = arguments[Ae + 2];
      oe.children = qe;
    }
    return X(z.type, pe, oe);
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
        L.call(K, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (pe[oe] = K[oe]);
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
    return X(z, we, pe);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(z) {
    return { $$typeof: m, render: z };
  }, lt.isValidElement = se, lt.lazy = function(z) {
    return {
      $$typeof: v,
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
    var K = Y.T, ne = {};
    Y.T = ne;
    try {
      var oe = z(), pe = Y.S;
      pe !== null && pe(ne, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(q, ve);
    } catch (we) {
      ve(we);
    } finally {
      K !== null && ne.types !== null && (K.types = ne.types), Y.T = K;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return Y.H.useCacheRefresh();
  }, lt.use = function(z) {
    return Y.H.use(z);
  }, lt.useActionState = function(z, K, ne) {
    return Y.H.useActionState(z, K, ne);
  }, lt.useCallback = function(z, K) {
    return Y.H.useCallback(z, K);
  }, lt.useContext = function(z) {
    return Y.H.useContext(z);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(z, K) {
    return Y.H.useDeferredValue(z, K);
  }, lt.useEffect = function(z, K) {
    return Y.H.useEffect(z, K);
  }, lt.useEffectEvent = function(z) {
    return Y.H.useEffectEvent(z);
  }, lt.useId = function() {
    return Y.H.useId();
  }, lt.useImperativeHandle = function(z, K, ne) {
    return Y.H.useImperativeHandle(z, K, ne);
  }, lt.useInsertionEffect = function(z, K) {
    return Y.H.useInsertionEffect(z, K);
  }, lt.useLayoutEffect = function(z, K) {
    return Y.H.useLayoutEffect(z, K);
  }, lt.useMemo = function(z, K) {
    return Y.H.useMemo(z, K);
  }, lt.useOptimistic = function(z, K) {
    return Y.H.useOptimistic(z, K);
  }, lt.useReducer = function(z, K, ne) {
    return Y.H.useReducer(z, K, ne);
  }, lt.useRef = function(z) {
    return Y.H.useRef(z);
  }, lt.useState = function(z) {
    return Y.H.useState(z);
  }, lt.useSyncExternalStore = function(z, K, ne) {
    return Y.H.useSyncExternalStore(
      z,
      K,
      ne
    );
  }, lt.useTransition = function() {
    return Y.H.useTransition();
  }, lt.version = "19.2.8", lt;
}
var Ey;
function Ss() {
  return Ey || (Ey = 1, jd.exports = sC()), jd.exports;
}
var Ld = { exports: {} }, Pn = {};
var Cy;
function cC() {
  if (Cy) return Pn;
  Cy = 1;
  var n = Ss();
  function o(g) {
    var h = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        h += "&args[]=" + encodeURIComponent(arguments[v]);
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
  function f(g, h, v) {
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
      children: g,
      containerInfo: h,
      implementation: v
    };
  }
  var d = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(g, h) {
    if (g === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Pn.createPortal = function(g, h) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(g, h, null, v);
  }, Pn.flushSync = function(g) {
    var h = d.T, v = a.p;
    try {
      if (d.T = null, a.p = 2, g) return g();
    } finally {
      d.T = h, a.p = v, a.d.f();
    }
  }, Pn.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, a.d.C(g, h));
  }, Pn.prefetchDNS = function(g) {
    typeof g == "string" && a.d.D(g);
  }, Pn.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var v = h.as, x = m(v, h.crossOrigin), y = typeof h.integrity == "string" ? h.integrity : void 0, C = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      v === "style" ? a.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: x,
          integrity: y,
          fetchPriority: C
        }
      ) : v === "script" && a.d.X(g, {
        crossOrigin: x,
        integrity: y,
        fetchPriority: C,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Pn.preinitModule = function(g, h) {
    if (typeof g == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var v = m(
            h.as,
            h.crossOrigin
          );
          a.d.M(g, {
            crossOrigin: v,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && a.d.M(g);
  }, Pn.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var v = h.as, x = m(v, h.crossOrigin);
      a.d.L(g, v, {
        crossOrigin: x,
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
        var v = m(h.as, h.crossOrigin);
        a.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: v,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else a.d.m(g);
  }, Pn.requestFormReset = function(g) {
    a.d.r(g);
  }, Pn.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Pn.useFormState = function(g, h, v) {
    return d.H.useFormState(g, h, v);
  }, Pn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Pn.version = "19.2.8", Pn;
}
var Ry;
function Kv() {
  if (Ry) return Ld.exports;
  Ry = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Ld.exports = cC(), Ld.exports;
}
var wy;
function uC() {
  if (wy) return is;
  wy = 1;
  var n = aC(), o = Ss(), r = Kv();
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
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = v(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var x = Object.assign, y = /* @__PURE__ */ Symbol.for("react.element"), C = /* @__PURE__ */ Symbol.for("react.transitional.element"), w = /* @__PURE__ */ Symbol.for("react.portal"), A = /* @__PURE__ */ Symbol.for("react.fragment"), O = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), T = /* @__PURE__ */ Symbol.for("react.consumer"), _ = /* @__PURE__ */ Symbol.for("react.context"), N = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), Y = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), X = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
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
      case X:
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
        case Y:
          return t = e.displayName || null, t !== null ? t : he(e.type) || "Memo";
        case L:
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
  function Ae(e, t) {
    switch (ne(we, t), ne(pe, e), ne(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Vb(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Vb(t), e = Ib(t, e);
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
    var t = oe.current, l = Ib(t, e.type);
    t !== l && (ne(pe, e), ne(oe, l));
  }
  function pt(e) {
    pe.current === e && (K(oe), K(pe)), qe.current === e && (K(qe), es._currentValue = F);
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
        var j = p.split(`
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
                  var ue = `
` + j[i].replace(" at new ", " at ");
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
  var Oe = Object.prototype.hasOwnProperty, We = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ye = n.unstable_requestPaint, Q = n.unstable_now, ce = n.unstable_getCurrentPriorityLevel, He = n.unstable_ImmediatePriority, Ce = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Tt = n.unstable_IdlePriority, St = n.log, Bt = n.unstable_setDisableYieldValue, Nt = null, xt = null;
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
    var E = e.entanglements, j = e.expirationTimes, J = e.hiddenUpdates;
    for (l = p & ~l; 0 < l; ) {
      var ue = 31 - st(l), me = 1 << ue;
      E[ue] = 0, j[ue] = -1;
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
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ay(e.type));
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
          for (e = Pb(e); e !== null; ) {
            if (l = e[Ct]) return l;
            e = Pb(e);
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
  var mn = /* @__PURE__ */ new Set(), An = {};
  function Wl(e, t) {
    vl(e, t), vl(e + "Capture", t);
  }
  function vl(e, t) {
    for (An[e] = t, e = 0; e < t.length; e++)
      mn.add(t[e]);
  }
  var qi = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), $o = {}, Jo = {};
  function Ar(e) {
    return Oe.call(Jo, e) ? !0 : Oe.call($o, e) ? !1 : qi.test(e) ? Jo[e] = !0 : ($o[e] = !0, !1);
  }
  function eo(e, t, l) {
    if (Ar(t))
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
  function Mn(e) {
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
  function Mr(e, t, l, i, s, u, p, E) {
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
  ]), Mo = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function no(e) {
    return Mo.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $n() {
  }
  var R = null;
  function k(e) {
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
              'input[name="' + Mn(
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
  function G(e, t) {
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
  var Ie = null, ke = null, Me = null;
  function wt() {
    if (Me) return Me;
    var e, t = ke, l = t.length, i, s = "value" in Ie ? Ie.value : Ie.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var p = l - e;
    for (i = 1; i <= p && t[l - i] === s[u - i]; i++) ;
    return Me = s.slice(e, 1 < i ? 1 - i : void 0);
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
    return x(t.prototype, {
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
  }, Sn = Ot(pn), Wn = x({}, pn, { view: 0, detail: 0 }), fo = Ot(Wn), jn, Sl, ho, Ki = x({}, Wn, {
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
  }), xa = Ot(Ki), tS = x({}, Ki, { dataTransfer: 0 }), nS = Ot(tS), lS = x({}, Wn, { relatedTarget: 0 }), zu = Ot(lS), oS = x({}, pn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iS = Ot(oS), rS = x({}, pn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), aS = Ot(rS), sS = x({}, pn, { data: 0 }), Bm = Ot(sS), cS = {
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
  }, uS = {
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
  }, fS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function dS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = fS[e]) ? !!t[e] : !1;
  }
  function Du() {
    return dS;
  }
  var hS = x({}, Wn, {
    key: function(e) {
      if (e.key) {
        var t = cS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ht(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? uS[e.keyCode] || "Unidentified" : "";
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
  }), mS = Ot(hS), pS = x({}, Ki, {
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
  }), Gm = Ot(pS), gS = x({}, Wn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), bS = Ot(gS), yS = x({}, pn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vS = Ot(yS), xS = x({}, Ki, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), SS = Ot(xS), ES = x({}, pn, {
    newState: 0,
    oldState: 0
  }), CS = Ot(ES), RS = [9, 13, 27, 32], ju = Z && "CompositionEvent" in window, Sa = null;
  Z && "documentMode" in document && (Sa = document.documentMode);
  var wS = Z && "TextEvent" in window && !Sa, Ym = Z && (!ju || Sa && 8 < Sa && 11 >= Sa), qm = " ", Pm = !1;
  function Xm(e, t) {
    switch (e) {
      case "keyup":
        return RS.indexOf(t.keyCode) !== -1;
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
  function Km(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Tr = !1;
  function _S(e, t) {
    switch (e) {
      case "compositionend":
        return Km(t);
      case "keypress":
        return t.which !== 32 ? null : (Pm = !0, qm);
      case "textInput":
        return e = t.data, e === qm && Pm ? null : e;
      default:
        return null;
    }
  }
  function AS(e, t) {
    if (Tr)
      return e === "compositionend" || !ju && Xm(e, t) ? (e = wt(), Me = ke = Ie = null, Tr = !1, e) : null;
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
        return Ym && t.locale !== "ko" ? null : t.data;
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
  function Fm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!MS[e.type] : t === "textarea";
  }
  function Qm(e, t, l, i) {
    D ? U ? U.push(i) : U = [i] : D = i, t = vc(t, "onChange"), 0 < t.length && (l = new Sn(
      "onChange",
      "change",
      null,
      l,
      i
    ), e.push({ event: l, listeners: t }));
  }
  var Ea = null, Ca = null;
  function TS(e) {
    kb(e, 0);
  }
  function ks(e) {
    var t = ol(e);
    if (Dn(t)) return e;
  }
  function Zm(e, t) {
    if (e === "change") return t;
  }
  var $m = !1;
  if (Z) {
    var Lu;
    if (Z) {
      var Vu = "oninput" in document;
      if (!Vu) {
        var Jm = document.createElement("div");
        Jm.setAttribute("oninput", "return;"), Vu = typeof Jm.oninput == "function";
      }
      Lu = Vu;
    } else Lu = !1;
    $m = Lu && (!document.documentMode || 9 < document.documentMode);
  }
  function Wm() {
    Ea && (Ea.detachEvent("onpropertychange", ep), Ca = Ea = null);
  }
  function ep(e) {
    if (e.propertyName === "value" && ks(Ca)) {
      var t = [];
      Qm(
        t,
        Ca,
        e,
        k(e)
      ), ge(TS, t);
    }
  }
  function OS(e, t, l) {
    e === "focusin" ? (Wm(), Ea = t, Ca = l, Ea.attachEvent("onpropertychange", ep)) : e === "focusout" && Wm();
  }
  function kS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ks(Ca);
  }
  function NS(e, t) {
    if (e === "click") return ks(t);
  }
  function zS(e, t) {
    if (e === "input" || e === "change")
      return ks(t);
  }
  function DS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var El = typeof Object.is == "function" ? Object.is : DS;
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
  function tp(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function np(e, t) {
    var l = tp(e);
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
      l = tp(l);
    }
  }
  function lp(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? lp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function op(e) {
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
  var jS = Z && "documentMode" in document && 11 >= document.documentMode, Or = null, Hu = null, wa = null, Uu = !1;
  function ip(e, t, l) {
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
  var kr = {
    animationend: Fi("Animation", "AnimationEnd"),
    animationiteration: Fi("Animation", "AnimationIteration"),
    animationstart: Fi("Animation", "AnimationStart"),
    transitionrun: Fi("Transition", "TransitionRun"),
    transitionstart: Fi("Transition", "TransitionStart"),
    transitioncancel: Fi("Transition", "TransitionCancel"),
    transitionend: Fi("Transition", "TransitionEnd")
  }, Bu = {}, rp = {};
  Z && (rp = document.createElement("div").style, "AnimationEvent" in window || (delete kr.animationend.animation, delete kr.animationiteration.animation, delete kr.animationstart.animation), "TransitionEvent" in window || delete kr.transitionend.transition);
  function Qi(e) {
    if (Bu[e]) return Bu[e];
    if (!kr[e]) return e;
    var t = kr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in rp)
        return Bu[e] = t[l];
    return e;
  }
  var ap = Qi("animationend"), sp = Qi("animationiteration"), cp = Qi("animationstart"), LS = Qi("transitionrun"), VS = Qi("transitionstart"), IS = Qi("transitioncancel"), up = Qi("transitionend"), fp = /* @__PURE__ */ new Map(), Gu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Gu.push("scrollEnd");
  function lo(e, t) {
    fp.set(e, t), Wl(t, [e]);
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
  }, Il = [], Nr = 0, Yu = 0;
  function zs() {
    for (var e = Nr, t = Yu = Nr = 0; t < e; ) {
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
      u !== 0 && dp(l, s, u);
    }
  }
  function Ds(e, t, l, i) {
    Il[Nr++] = e, Il[Nr++] = t, Il[Nr++] = l, Il[Nr++] = i, Yu |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function qu(e, t, l, i) {
    return Ds(e, t, l, i), js(e);
  }
  function Zi(e, t) {
    return Ds(e, null, null, t), js(e);
  }
  function dp(e, t, l) {
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
  function HS(e, t, l, i) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Cl(e, t, l, i) {
    return new HS(e, t, l, i);
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
  function hp(e, t) {
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
      p = qE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case X:
          return e = Cl(31, l, t, s), e.elementType = X, e.lanes = u, e;
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
              case N:
                p = 11;
                break e;
              case Y:
                p = 14;
                break e;
              case L:
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
  function mp(e) {
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
  var pp = /* @__PURE__ */ new WeakMap();
  function Hl(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = pp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Ze(t)
      }, pp.set(e, t), t);
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
  function gp(e, t, l) {
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
    e.return !== null && (Oo(e, 1), gp(e, 1, 0));
  }
  function Qu(e) {
    for (; e === Vs; )
      Vs = Dr[--jr], Dr[jr] = null, _a = Dr[--jr], Dr[jr] = null;
    for (; e === ni; )
      ni = Ul[--Bl], Ul[Bl] = null, po = Ul[--Bl], Ul[Bl] = null, mo = Ul[--Bl], Ul[Bl] = null;
  }
  function bp(e, t) {
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
    throw Aa(Hl(t, e)), Zu;
  }
  function yp(e) {
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
        mt("invalid", t), Mr(
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
    l = i.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || i.suppressHydrationWarning === !0 || jb(t.textContent, l) ? (i.popover != null && (mt("beforetoggle", t), mt("toggle", t)), i.onScroll != null && mt("scroll", t), i.onScrollEnd != null && mt("scrollend", t), i.onClick != null && (t.onclick = $n), t = !0) : t = !1, t || oi(e, !0);
  }
  function vp(e) {
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
    if (!yt) return vp(e), yt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || pd(e.type, e.memoizedProps)), l = !l), l && qt && oi(e), vp(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = qb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(a(317));
      qt = qb(e);
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
  function Aa(e) {
    li === null ? li = [e] : li.push(e);
  }
  var Ju = z(null), Wi = null, ko = null;
  function ii(e, t, l) {
    ne(Ju, t._currentValue), t._currentValue = l;
  }
  function No(e) {
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
          for (var j = 0; j < t.length; j++)
            if (E.context === t[j]) {
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
    Wi = e, ko = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vn(e) {
    return xp(Wi, e);
  }
  function Hs(e, t) {
    return Wi === null && er(e), xp(e, t);
  }
  function xp(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, ko === null) {
      if (e === null) throw Error(a(308));
      ko = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ko = ko.next = t;
    return l;
  }
  var US = typeof AbortController < "u" ? AbortController : function() {
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
  }, BS = n.unstable_scheduleCallback, GS = n.unstable_NormalPriority, gn = {
    $$typeof: _,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tf() {
    return {
      controller: new US(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ma(e) {
    e.refCount--, e.refCount === 0 && BS(GS, function() {
      e.controller.abort();
    });
  }
  var Ta = null, nf = 0, Ir = 0, Hr = null;
  function YS(e, t) {
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
    return nf++, t.then(Sp, Sp), t;
  }
  function Sp() {
    if (--nf === 0 && Ta !== null) {
      Hr !== null && (Hr.status = "fulfilled");
      var e = Ta;
      Ta = null, Ir = 0, Hr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function qS(e, t) {
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
  var Ep = V.S;
  V.S = function(e, t) {
    ib = Q(), typeof t == "object" && t !== null && typeof t.then == "function" && YS(e, t), Ep !== null && Ep(e, t);
  };
  var tr = z(null);
  function lf() {
    var e = tr.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function Us(e, t) {
    t === null ? ne(tr, tr.current) : ne(tr, t.pool);
  }
  function Cp() {
    var e = lf();
    return e === null ? null : { parent: gn._currentValue, pool: e };
  }
  var Ur = Error(a(460)), of = Error(a(474)), Bs = Error(a(542)), Gs = { then: function() {
  } };
  function Rp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function wp(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($n, $n), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Ap(e), e;
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
            throw e = t.reason, Ap(e), e;
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
  function _p() {
    if (lr === null) throw Error(a(459));
    var e = lr;
    return lr = null, e;
  }
  function Ap(e) {
    if (e === Ur || e === Bs)
      throw Error(a(483));
  }
  var Br = null, Oa = 0;
  function Ys(e) {
    var t = Oa;
    return Oa += 1, Br === null && (Br = []), wp(Br, e, t);
  }
  function ka(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function qs(e, t) {
    throw t.$$typeof === y ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(
      a(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Mp(e) {
    function t(P, B) {
      if (e) {
        var $ = P.deletions;
        $ === null ? (P.deletions = [B], P.flags |= 16) : $.push(B);
      }
    }
    function l(P, B) {
      if (!e) return null;
      for (; B !== null; )
        t(P, B), B = B.sibling;
      return null;
    }
    function i(P) {
      for (var B = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? B.set(P.key, P) : B.set(P.index, P), P = P.sibling;
      return B;
    }
    function s(P, B) {
      return P = To(P, B), P.index = 0, P.sibling = null, P;
    }
    function u(P, B, $) {
      return P.index = $, e ? ($ = P.alternate, $ !== null ? ($ = $.index, $ < B ? (P.flags |= 67108866, B) : $) : (P.flags |= 67108866, B)) : (P.flags |= 1048576, B);
    }
    function p(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function E(P, B, $, de) {
      return B === null || B.tag !== 6 ? (B = Xu($, P.mode, de), B.return = P, B) : (B = s(B, $), B.return = P, B);
    }
    function j(P, B, $, de) {
      var Pe = $.type;
      return Pe === A ? ue(
        P,
        B,
        $.props.children,
        de,
        $.key
      ) : B !== null && (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && nr(Pe) === B.type) ? (B = s(B, $.props), ka(B, $), B.return = P, B) : (B = Ls(
        $.type,
        $.key,
        $.props,
        null,
        P.mode,
        de
      ), ka(B, $), B.return = P, B);
    }
    function J(P, B, $, de) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== $.containerInfo || B.stateNode.implementation !== $.implementation ? (B = Ku($, P.mode, de), B.return = P, B) : (B = s(B, $.children || []), B.return = P, B);
    }
    function ue(P, B, $, de, Pe) {
      return B === null || B.tag !== 7 ? (B = $i(
        $,
        P.mode,
        de,
        Pe
      ), B.return = P, B) : (B = s(B, $), B.return = P, B);
    }
    function me(P, B, $) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = Xu(
          "" + B,
          P.mode,
          $
        ), B.return = P, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case C:
            return $ = Ls(
              B.type,
              B.key,
              B.props,
              null,
              P.mode,
              $
            ), ka($, B), $.return = P, $;
          case w:
            return B = Ku(
              B,
              P.mode,
              $
            ), B.return = P, B;
          case L:
            return B = nr(B), me(P, B, $);
        }
        if (be(B) || fe(B))
          return B = $i(
            B,
            P.mode,
            $,
            null
          ), B.return = P, B;
        if (typeof B.then == "function")
          return me(P, Ys(B), $);
        if (B.$$typeof === _)
          return me(
            P,
            Hs(P, B),
            $
          );
        qs(P, B);
      }
      return null;
    }
    function W(P, B, $, de) {
      var Pe = B !== null ? B.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return Pe !== null ? null : E(P, B, "" + $, de);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            return $.key === Pe ? j(P, B, $, de) : null;
          case w:
            return $.key === Pe ? J(P, B, $, de) : null;
          case L:
            return $ = nr($), W(P, B, $, de);
        }
        if (be($) || fe($))
          return Pe !== null ? null : ue(P, B, $, de, null);
        if (typeof $.then == "function")
          return W(
            P,
            B,
            Ys($),
            de
          );
        if ($.$$typeof === _)
          return W(
            P,
            B,
            Hs(P, $),
            de
          );
        qs(P, $);
      }
      return null;
    }
    function ie(P, B, $, de, Pe) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return P = P.get($) || null, E(B, P, "" + de, Pe);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case C:
            return P = P.get(
              de.key === null ? $ : de.key
            ) || null, j(B, P, de, Pe);
          case w:
            return P = P.get(
              de.key === null ? $ : de.key
            ) || null, J(B, P, de, Pe);
          case L:
            return de = nr(de), ie(
              P,
              B,
              $,
              de,
              Pe
            );
        }
        if (be(de) || fe(de))
          return P = P.get($) || null, ue(B, P, de, Pe, null);
        if (typeof de.then == "function")
          return ie(
            P,
            B,
            $,
            Ys(de),
            Pe
          );
        if (de.$$typeof === _)
          return ie(
            P,
            B,
            $,
            Hs(B, de),
            Pe
          );
        qs(B, de);
      }
      return null;
    }
    function Ve(P, B, $, de) {
      for (var Pe = null, _t = null, Be = B, ct = B = 0, bt = null; Be !== null && ct < $.length; ct++) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var At = W(
          P,
          Be,
          $[ct],
          de
        );
        if (At === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && At.alternate === null && t(P, Be), B = u(At, B, ct), _t === null ? Pe = At : _t.sibling = At, _t = At, Be = bt;
      }
      if (ct === $.length)
        return l(P, Be), yt && Oo(P, ct), Pe;
      if (Be === null) {
        for (; ct < $.length; ct++)
          Be = me(P, $[ct], de), Be !== null && (B = u(
            Be,
            B,
            ct
          ), _t === null ? Pe = Be : _t.sibling = Be, _t = Be);
        return yt && Oo(P, ct), Pe;
      }
      for (Be = i(Be); ct < $.length; ct++)
        bt = ie(
          Be,
          P,
          ct,
          $[ct],
          de
        ), bt !== null && (e && bt.alternate !== null && Be.delete(
          bt.key === null ? ct : bt.key
        ), B = u(
          bt,
          B,
          ct
        ), _t === null ? Pe = bt : _t.sibling = bt, _t = bt);
      return e && Be.forEach(function(Ci) {
        return t(P, Ci);
      }), yt && Oo(P, ct), Pe;
    }
    function $e(P, B, $, de) {
      if ($ == null) throw Error(a(151));
      for (var Pe = null, _t = null, Be = B, ct = B = 0, bt = null, At = $.next(); Be !== null && !At.done; ct++, At = $.next()) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var Ci = W(P, Be, At.value, de);
        if (Ci === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Ci.alternate === null && t(P, Be), B = u(Ci, B, ct), _t === null ? Pe = Ci : _t.sibling = Ci, _t = Ci, Be = bt;
      }
      if (At.done)
        return l(P, Be), yt && Oo(P, ct), Pe;
      if (Be === null) {
        for (; !At.done; ct++, At = $.next())
          At = me(P, At.value, de), At !== null && (B = u(At, B, ct), _t === null ? Pe = At : _t.sibling = At, _t = At);
        return yt && Oo(P, ct), Pe;
      }
      for (Be = i(Be); !At.done; ct++, At = $.next())
        At = ie(Be, P, ct, At.value, de), At !== null && (e && At.alternate !== null && Be.delete(At.key === null ? ct : At.key), B = u(At, B, ct), _t === null ? Pe = At : _t.sibling = At, _t = At);
      return e && Be.forEach(function(tC) {
        return t(P, tC);
      }), yt && Oo(P, ct), Pe;
    }
    function It(P, B, $, de) {
      if (typeof $ == "object" && $ !== null && $.type === A && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case C:
            e: {
              for (var Pe = $.key; B !== null; ) {
                if (B.key === Pe) {
                  if (Pe = $.type, Pe === A) {
                    if (B.tag === 7) {
                      l(
                        P,
                        B.sibling
                      ), de = s(
                        B,
                        $.props.children
                      ), de.return = P, P = de;
                      break e;
                    }
                  } else if (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === L && nr(Pe) === B.type) {
                    l(
                      P,
                      B.sibling
                    ), de = s(B, $.props), ka(de, $), de.return = P, P = de;
                    break e;
                  }
                  l(P, B);
                  break;
                } else t(P, B);
                B = B.sibling;
              }
              $.type === A ? (de = $i(
                $.props.children,
                P.mode,
                de,
                $.key
              ), de.return = P, P = de) : (de = Ls(
                $.type,
                $.key,
                $.props,
                null,
                P.mode,
                de
              ), ka(de, $), de.return = P, P = de);
            }
            return p(P);
          case w:
            e: {
              for (Pe = $.key; B !== null; ) {
                if (B.key === Pe)
                  if (B.tag === 4 && B.stateNode.containerInfo === $.containerInfo && B.stateNode.implementation === $.implementation) {
                    l(
                      P,
                      B.sibling
                    ), de = s(B, $.children || []), de.return = P, P = de;
                    break e;
                  } else {
                    l(P, B);
                    break;
                  }
                else t(P, B);
                B = B.sibling;
              }
              de = Ku($, P.mode, de), de.return = P, P = de;
            }
            return p(P);
          case L:
            return $ = nr($), It(
              P,
              B,
              $,
              de
            );
        }
        if (be($))
          return Ve(
            P,
            B,
            $,
            de
          );
        if (fe($)) {
          if (Pe = fe($), typeof Pe != "function") throw Error(a(150));
          return $ = Pe.call($), $e(
            P,
            B,
            $,
            de
          );
        }
        if (typeof $.then == "function")
          return It(
            P,
            B,
            Ys($),
            de
          );
        if ($.$$typeof === _)
          return It(
            P,
            B,
            Hs(P, $),
            de
          );
        qs(P, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, B !== null && B.tag === 6 ? (l(P, B.sibling), de = s(B, $), de.return = P, P = de) : (l(P, B), de = Xu($, P.mode, de), de.return = P, P = de), p(P)) : l(P, B);
    }
    return function(P, B, $, de) {
      try {
        Oa = 0;
        var Pe = It(
          P,
          B,
          $,
          de
        );
        return Br = null, Pe;
      } catch (Be) {
        if (Be === Ur || Be === Bs) throw Be;
        var _t = Cl(29, Be, null, P.mode);
        return _t.lanes = de, _t.return = P, _t;
      }
    };
  }
  var or = Mp(!0), Tp = Mp(!1), ri = !1;
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
    if (i = i.shared, (kt & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = js(e), dp(e, null, l), t;
    }
    return Ds(e, i, t, l), js(e);
  }
  function Na(e, t, l) {
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
      var j = E, J = j.next;
      j.next = null, p === null ? u = J : p.next = J, p = j;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, E = ue.lastBaseUpdate, E !== p && (E === null ? ue.firstBaseUpdate = J : E.next = J, ue.lastBaseUpdate = j));
    }
    if (u !== null) {
      var me = s.baseState;
      p = 0, ue = J = j = null, E = u;
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
                me = x({}, me, W);
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
          }, ue === null ? (J = ue = ie, j = me) : ue = ue.next = ie, p |= W;
        if (E = E.next, E === null) {
          if (E = s.shared.pending, E === null)
            break;
          ie = E, E = ie.next, ie.next = null, s.lastBaseUpdate = ie, s.shared.pending = null;
        }
      } while (!0);
      ue === null && (j = me), s.baseState = j, s.firstBaseUpdate = J, s.lastBaseUpdate = ue, u === null && (s.shared.lanes = 0), hi |= p, e.lanes = p, e.memoizedState = me;
    }
  }
  function Op(e, t) {
    if (typeof e != "function")
      throw Error(a(191, e));
    e.call(t);
  }
  function kp(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Op(l[e], t);
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
  function zp(e) {
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
  var zo = 0, rt = null, Lt = null, bn = null, Ks = !1, Yr = !1, ir = !1, Fs = 0, ja = 0, qr = null, PS = 0;
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
    return zo = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? gg : Tf, ir = !1, u = l(i, s), ir = !1, Yr && (u = jp(
      t,
      l,
      i,
      s
    )), Dp(e), u;
  }
  function Dp(e) {
    V.H = Ia;
    var t = Lt !== null && Lt.next !== null;
    if (zo = 0, bn = Lt = rt = null, Ks = !1, ja = 0, qr = null, t) throw Error(a(300));
    e === null || yn || (e = e.dependencies, e !== null && Is(e) && (yn = !0));
  }
  function jp(e, t, l, i) {
    rt = e;
    var s = 0;
    do {
      if (Yr && (qr = null), ja = 0, Yr = !1, 25 <= s) throw Error(a(301));
      if (s += 1, bn = Lt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = bg, u = t(l, i);
    } while (Yr);
    return u;
  }
  function XS() {
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
    return ja += 1, qr === null && (qr = []), e = wp(qr, e, t), t = rt, (bn === null ? t.memoizedState : bn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? gg : Tf), e;
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
      var E = p = null, j = null, J = t, ue = !1;
      do {
        var me = J.lane & -536870913;
        if (me !== J.lane ? (gt & me) === me : (zo & me) === me) {
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
            }, j === null ? (E = j = me, p = u) : j = j.next = me, rt.lanes |= W, hi |= W;
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
          }, j === null ? (E = j = W, p = u) : j = j.next = W, rt.lanes |= me, hi |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (j === null ? p = u : j.next = E, !El(u, e.memoizedState) && (yn = !0, ue && (l = Hr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = p, e.baseQueue = j, i.lastRenderedState = u;
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
  function Lp(e, t, l) {
    var i = rt, s = fn(), u = yt;
    if (u) {
      if (l === void 0) throw Error(a(407));
      l = l();
    } else l = t();
    var p = !El(
      (Lt || s).memoizedState,
      l
    );
    if (p && (s.memoizedState = l, yn = !0), s = s.queue, Cf(Hp.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || p || bn !== null && bn.memoizedState.tag & 1) {
      if (i.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Ip.bind(
          null,
          i,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(a(349));
      u || (zo & 127) !== 0 || Vp(i, t, l);
    }
    return l;
  }
  function Vp(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Qs(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Ip(e, t, l, i) {
    t.value = l, t.getSnapshot = i, Up(t) && Bp(e);
  }
  function Hp(e, t, l) {
    return l(function() {
      Up(t) && Bp(e);
    });
  }
  function Up(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !El(e, l);
    } catch {
      return !0;
    }
  }
  function Bp(e) {
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
  function Gp(e, t, l, i) {
    return e.baseState = l, vf(
      e,
      Lt,
      typeof i == "function" ? i : Do
    );
  }
  function KS(e, t, l, i, s) {
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
      V.T !== null ? l(!0) : u.isTransition = !1, i(u), l = t.pending, l === null ? (u.next = t.pending = u, Yp(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Yp(e, t) {
    var l = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, p = {};
      V.T = p;
      try {
        var E = l(s, i), j = V.S;
        j !== null && j(p, E), qp(e, t, E);
      } catch (J) {
        Ef(e, t, J);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), V.T = u;
      }
    } else
      try {
        u = l(s, i), qp(e, t, u);
      } catch (J) {
        Ef(e, t, J);
      }
  }
  function qp(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(i) {
        Pp(e, t, i);
      },
      function(i) {
        return Ef(e, t, i);
      }
    ) : Pp(e, t, l);
  }
  function Pp(e, t, l) {
    t.status = "fulfilled", t.value = l, Xp(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Yp(e, l)));
  }
  function Ef(e, t, l) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = l, Xp(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Xp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Kp(e, t) {
    return t;
  }
  function Fp(e, t) {
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
      lastRenderedReducer: Kp,
      lastRenderedState: t
    }, l.queue = i, l = hg.bind(
      null,
      rt,
      i
    ), i.dispatch = l, i = Sf(!1), u = Mf.bind(
      null,
      rt,
      !1,
      i.queue
    ), i = el(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = s, l = KS.bind(
      null,
      rt,
      s,
      u,
      l
    ), s.dispatch = l, i.memoizedState = e, [t, l, !1];
  }
  function Qp(e) {
    var t = fn();
    return Zp(t, Lt, e);
  }
  function Zp(e, t, l) {
    if (t = vf(
      e,
      t,
      Kp
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
      FS.bind(null, s, l),
      null
    )), [i, u, e];
  }
  function FS(e, t) {
    e.action = t;
  }
  function $p(e) {
    var t = fn(), l = Lt;
    if (l !== null)
      return Zp(t, l, e);
    fn(), t = t.memoizedState, l = fn();
    var i = l.queue.dispatch;
    return l.memoizedState = e, [t, i, !1];
  }
  function Pr(e, t, l, i) {
    return e = { tag: e, create: l, deps: i, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Qs(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (i = l.next, l.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Jp() {
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
  function Wp(e, t) {
    Js(8390656, 8, e, t);
  }
  function Cf(e, t) {
    Ws(2048, 8, e, t);
  }
  function QS(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Qs(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function eg(e) {
    var t = fn().memoizedState;
    return QS({ ref: t, nextImpl: e }), function() {
      if ((kt & 2) !== 0) throw Error(a(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function tg(e, t) {
    return Ws(4, 2, e, t);
  }
  function ng(e, t) {
    return Ws(4, 4, e, t);
  }
  function lg(e, t) {
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
  function og(e, t, l) {
    l = l != null ? l.concat([e]) : null, Ws(4, 4, lg.bind(null, t, e), l);
  }
  function Rf() {
  }
  function ig(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var i = l.memoizedState;
    return t !== null && hf(t, i[1]) ? i[0] : (l.memoizedState = [e, t], e);
  }
  function rg(e, t) {
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
    return l === void 0 || (zo & 1073741824) !== 0 && (gt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = ab(), rt.lanes |= e, hi |= e, l);
  }
  function ag(e, t, l, i) {
    return El(l, t) ? l : Gr.current !== null ? (e = wf(e, l, i), El(e, t) || (yn = !0), e) : (zo & 42) === 0 || (zo & 1073741824) !== 0 && (gt & 261930) === 0 ? (yn = !0, e.memoizedState = l) : (e = ab(), rt.lanes |= e, hi |= e, t);
  }
  function sg(e, t, l, i, s) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var p = V.T, E = {};
    V.T = E, Mf(e, !1, t, l);
    try {
      var j = s(), J = V.S;
      if (J !== null && J(E, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var ue = qS(
          j,
          i
        );
        Va(
          e,
          t,
          ue,
          Ml(e)
        );
      } else
        Va(
          e,
          t,
          i,
          Ml(e)
        );
    } catch (me) {
      Va(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Ml()
      );
    } finally {
      H.p = u, p !== null && E.types !== null && (p.types = E.types), V.T = p;
    }
  }
  function ZS() {
  }
  function _f(e, t, l, i) {
    if (e.tag !== 5) throw Error(a(476));
    var s = cg(e).queue;
    sg(
      e,
      s,
      t,
      F,
      l === null ? ZS : function() {
        return ug(e), l(i);
      }
    );
  }
  function cg(e) {
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
  function ug(e) {
    var t = cg(e);
    t.next === null && (t = e.alternate.memoizedState), Va(
      e,
      t.next.queue,
      {},
      Ml()
    );
  }
  function Af() {
    return Vn(es);
  }
  function fg() {
    return fn().memoizedState;
  }
  function dg() {
    return fn().memoizedState;
  }
  function $S(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Ml();
          e = ai(l);
          var i = si(t, e, l);
          i !== null && (hl(i, t, l), Na(i, t, l)), t = { cache: tf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function JS(e, t, l) {
    var i = Ml();
    l = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ec(e) ? mg(t, l) : (l = qu(e, t, l, i), l !== null && (hl(l, e, i), pg(l, t, i)));
  }
  function hg(e, t, l) {
    var i = Ml();
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
    if (ec(e)) mg(t, s);
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
        return hl(l, e, i), pg(l, t, i), !0;
    }
    return !1;
  }
  function Mf(e, t, l, i) {
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
  function mg(e, t) {
    Yr = Ks = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function pg(e, t, l) {
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
  var gg = {
    readContext: Vn,
    use: Zs,
    useCallback: function(e, t) {
      return el().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vn,
    useEffect: Wp,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Js(
        4194308,
        4,
        lg.bind(null, t, e),
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
      }, i.queue = e, e = e.dispatch = JS.bind(
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
      var t = e.queue, l = hg.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = el();
      return wf(l, e, t);
    },
    useTransition: function() {
      var e = Sf(!1);
      return e = sg.bind(
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
        (gt & 127) !== 0 || Vp(i, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, Wp(Hp.bind(null, i, u, e), [
        e
      ]), i.flags |= 2048, Pr(
        9,
        { destroy: void 0 },
        Ip.bind(
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
        l = PS++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Af,
    useFormState: Fp,
    useActionState: Fp,
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
      return t.queue = l, t = Mf.bind(
        null,
        rt,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: yf,
    useCacheRefresh: function() {
      return el().memoizedState = $S.bind(
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
  }, Tf = {
    readContext: Vn,
    use: Zs,
    useCallback: ig,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: og,
    useInsertionEffect: tg,
    useLayoutEffect: ng,
    useMemo: rg,
    useReducer: $s,
    useRef: Jp,
    useState: function() {
      return $s(Do);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return ag(
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
    useSyncExternalStore: Lp,
    useId: fg,
    useHostTransitionStatus: Af,
    useFormState: Qp,
    useActionState: Qp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Gp(l, Lt, e, t);
    },
    useMemoCache: yf,
    useCacheRefresh: dg
  };
  Tf.useEffectEvent = eg;
  var bg = {
    readContext: Vn,
    use: Zs,
    useCallback: ig,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: og,
    useInsertionEffect: tg,
    useLayoutEffect: ng,
    useMemo: rg,
    useReducer: xf,
    useRef: Jp,
    useState: function() {
      return xf(Do);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return Lt === null ? wf(l, e, t) : ag(
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
    useSyncExternalStore: Lp,
    useId: fg,
    useHostTransitionStatus: Af,
    useFormState: $p,
    useActionState: $p,
    useOptimistic: function(e, t) {
      var l = fn();
      return Lt !== null ? Gp(l, Lt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: yf,
    useCacheRefresh: dg
  };
  bg.useEffectEvent = eg;
  function Of(e, t, l, i) {
    t = e.memoizedState, l = l(i, t), l = l == null ? t : x({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var kf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var i = Ml(), s = ai(i);
      s.payload = t, l != null && (s.callback = l), t = si(e, s, i), t !== null && (hl(t, e, i), Na(t, e, i));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var i = Ml(), s = ai(i);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = si(e, s, i), t !== null && (hl(t, e, i), Na(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Ml(), i = ai(l);
      i.tag = 2, t != null && (i.callback = t), t = si(e, i, l), t !== null && (hl(t, e, l), Na(t, e, l));
    }
  };
  function yg(e, t, l, i, s, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Ra(l, i) || !Ra(s, u) : !0;
  }
  function vg(e, t, l, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, i), t.state !== e && kf.enqueueReplaceState(t, t.state, null);
  }
  function rr(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var i in t)
        i !== "ref" && (l[i] = t[i]);
    }
    if (e = e.defaultProps) {
      l === t && (l = x({}, l));
      for (var s in e)
        l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  function xg(e) {
    Ns(e);
  }
  function Sg(e) {
    console.error(e);
  }
  function Eg(e) {
    Ns(e);
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
  function Cg(e, t, l) {
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
  function Nf(e, t, l) {
    return l = ai(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      tc(e, t);
    }, l;
  }
  function Rg(e) {
    return e = ai(e), e.tag = 3, e;
  }
  function wg(e, t, l, i) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = i.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        Cg(t, l, i);
      };
    }
    var p = l.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      Cg(t, l, i), typeof s != "function" && (mi === null ? mi = /* @__PURE__ */ new Set([this]) : mi.add(this));
      var E = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function WS(e, t, l, i, s) {
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
      return t = Rl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== Zu && (e = Error(a(422), { cause: i }), Aa(Hl(e, l)))) : (i !== Zu && (t = Error(a(423), {
        cause: i
      }), Aa(
        Hl(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = Hl(i, l), s = Nf(
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
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = Nf(l.stateNode, i, e), sf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (mi === null || !mi.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = Rg(s), wg(
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
    t.child = e === null ? Tp(t, null, l, i) : or(
      t,
      e.child,
      l,
      i
    );
  }
  function _g(e, t, l, i, s) {
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
  function Ag(e, t, l, i, s) {
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
  function Tg(e, t, l, i) {
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
        return Og(
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
        ), u !== null ? Np(t, u) : uf(), zp(t);
      else
        return i = t.lanes = 536870912, Og(
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
  function Og(e, t, l, i, s) {
    var u = lf();
    return u = u === null ? null : { parent: gn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Us(t, null), uf(), zp(t), e !== null && Vr(e, t, i, !0), t.childLanes = s, null;
  }
  function nc(e, t) {
    return t = oc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function kg(e, t, l) {
    return or(t, e.child, null, l), e = nc(t, t.pendingProps), e.flags |= 2, wl(t), t.memoizedState = null, e;
  }
  function eE(e, t, l) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (yt) {
        if (i.mode === "hidden")
          return e = nc(t, i), t.lanes = 536870912, Ha(null, e);
        if (df(t), (e = qt) ? (e = Yb(
          e,
          Gl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ni !== null ? { id: mo, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw oi(t);
        return t.lanes = 536870912, null;
      }
      return nc(t, i);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (df(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = kg(
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
        hc(), t = kg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, qt = ql(p.nextSibling), Ln = t, yt = !0, li = null, Gl = !1, e !== null && bp(t, e), t = nc(t, i), t.flags |= 4096;
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
    return er(t), t.updateQueue = null, l = jp(
      t,
      i,
      l,
      s
    ), Dp(e), i = pf(), e !== null && !yn ? (gf(e, t, u), jo(e, t, u)) : (yt && i && Fu(t), t.flags |= 1, In(e, t, l, u), t.child);
  }
  function zg(e, t, l, i, s) {
    if (er(t), t.stateNode === null) {
      var u = zr, p = l.contextType;
      typeof p == "object" && p !== null && (u = Vn(p)), u = new l(i, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = kf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = i, u.state = t.memoizedState, u.refs = {}, rf(t), p = l.contextType, u.context = typeof p == "object" && p !== null ? Vn(p) : zr, u.state = t.memoizedState, p = l.getDerivedStateFromProps, typeof p == "function" && (Of(
        t,
        l,
        p,
        i
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && kf.enqueueReplaceState(u, u.state, null), Da(t, i, u, s), za(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      u = t.stateNode;
      var E = t.memoizedProps, j = rr(l, E);
      u.props = j;
      var J = u.context, ue = l.contextType;
      p = zr, typeof ue == "object" && ue !== null && (p = Vn(ue));
      var me = l.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", E = t.pendingProps !== E, ue || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (E || J !== p) && vg(
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
      ), J = t.memoizedState), (j = ri || yg(
        t,
        l,
        j,
        i,
        W,
        J,
        p
      )) ? (ue || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = J), u.props = i, u.state = J, u.context = p, i = j) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      u = t.stateNode, af(e, t), p = t.memoizedProps, ue = rr(l, p), u.props = ue, me = t.pendingProps, W = u.context, J = l.contextType, j = zr, typeof J == "object" && J !== null && (j = Vn(J)), E = l.getDerivedStateFromProps, (J = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== me || W !== j) && vg(
        t,
        u,
        i,
        j
      ), ri = !1, W = t.memoizedState, u.state = W, Da(t, i, u, s), za();
      var ie = t.memoizedState;
      p !== me || W !== ie || ri || e !== null && e.dependencies !== null && Is(e.dependencies) ? (typeof E == "function" && (Of(
        t,
        l,
        E,
        i
      ), ie = t.memoizedState), (ue = ri || yg(
        t,
        l,
        ue,
        i,
        W,
        ie,
        j
      ) || e !== null && e.dependencies !== null && Is(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(i, ie, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        i,
        ie,
        j
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = ie), u.props = i, u.state = ie, u.context = j, i = ue) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), i = !1);
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
  function Dg(e, t, l, i) {
    return Ji(), t.flags |= 256, In(e, t, l, i), t.child;
  }
  var jf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lf(e) {
    return { baseLanes: e, cachePool: Cp() };
  }
  function Vf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Al), e;
  }
  function jg(e, t, l) {
    var i = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (un.current & 2) !== 0), p && (s = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (yt) {
        if (s ? ci(t) : ui(), (e = qt) ? (e = Yb(
          e,
          Gl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ni !== null ? { id: mo, overflow: po } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw oi(t);
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
    var j = e.memoizedState;
    if (j !== null && (E = j.dehydrated, E !== null)) {
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
        p = J, i = Error(a(419)), i.stack = "", i.digest = p, Aa({ value: i, source: null, stack: null }), t = Hf(
          e,
          t,
          l
        );
      } else if (yn || Vr(e, t, l, !1), p = (l & e.childLanes) !== 0, yn || p) {
        if (p = Ut, p !== null && (i = rn(p, l), i !== 0 && i !== j.retryLane))
          throw j.retryLane = i, Zi(e, i), hl(p, e, i), zf;
        yd(E) || hc(), t = Hf(
          e,
          t,
          l
        );
      } else
        yd(E) ? (t.flags |= 192, t.child = e.child, t = null) : (e = j.treeContext, qt = ql(
          E.nextSibling
        ), Ln = t, yt = !0, li = null, Gl = !1, e !== null && bp(t, e), t = If(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (ui(), E = i.fallback, s = t.mode, j = e.child, J = j.sibling, i = To(j, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = j.subtreeFlags & 65011712, J !== null ? E = To(
      J,
      E
    ) : (E = $i(
      E,
      s,
      l,
      null
    ), E.flags |= 2), E.return = t, i.return = t, i.sibling = E, t.child = i, Ha(null, i), i = t.child, E = e.child.memoizedState, E === null ? E = Lf(l) : (s = E.cachePool, s !== null ? (j = gn._currentValue, s = s.parent !== j ? { parent: j, pool: j } : s) : s = Cp(), E = {
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
  function Lg(e, t, l) {
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
  function Vg(e, t, l) {
    var i = t.pendingProps, s = i.revealOrder, u = i.tail;
    i = i.children;
    var p = un.current, E = (p & 2) !== 0;
    if (E ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, ne(un, p), In(e, t, i, l), i = yt ? _a : 0, !E && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Lg(e, l, t);
        else if (e.tag === 19)
          Lg(e, l, t);
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
  function tE(e, t, l) {
    switch (t.tag) {
      case 3:
        Ae(t, t.stateNode.containerInfo), ii(t, gn, e.memoizedState.cache), Ji();
        break;
      case 27:
      case 5:
        it(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
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
          return i.dehydrated !== null ? (ci(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? jg(e, t, l) : (ci(t), e = jo(
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
            return Vg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), ne(un, un.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, Tg(
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
  function Ig(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        yn = !0;
      else {
        if (!Bf(e, l) && (t.flags & 128) === 0)
          return yn = !1, tE(
            e,
            t,
            l
          );
        yn = (e.flags & 131072) !== 0;
      }
    else
      yn = !1, yt && (t.flags & 1048576) !== 0 && gp(t, _a, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = nr(t.elementType), t.type = e, typeof e == "function")
            Pu(e) ? (i = rr(e, i), t.tag = 1, t = zg(
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
              if (s === N) {
                t.tag = 11, t = _g(
                  null,
                  t,
                  e,
                  i,
                  l
                );
                break e;
              } else if (s === Y) {
                t.tag = 14, t = Ag(
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
        ), zg(
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
              t = Dg(
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
              ), Aa(s), t = Dg(
                e,
                t,
                i,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qt = ql(e.firstChild), Ln = t, yt = !0, li = null, Gl = !0, l = Tp(
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
        return lc(e, t), e === null ? (l = Qb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : yt || (l = t.type, e = t.pendingProps, i = xc(
          we.current
        ).createElement(l), i[Ct] = t, i[Rt] = e, Hn(i, l, e), en(i), t.stateNode = i) : t.memoizedState = Qb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return it(t), e === null && yt && (i = t.stateNode = Xb(
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
        return e === null && yt && ((s = i = qt) && (i = kE(
          i,
          t.type,
          t.pendingProps,
          Gl
        ), i !== null ? (t.stateNode = i, Ln = t, qt = ql(i.firstChild), Gl = !1, s = !0) : s = !1), s || oi(t)), it(t), s = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, i = u.children, pd(s, u) ? i = null : p !== null && pd(s, p) && (t.flags |= 32), t.memoizedState !== null && (s = mf(
          e,
          t,
          XS,
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
        return jg(e, t, l);
      case 4:
        return Ae(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = or(
          t,
          null,
          i,
          l
        ) : In(e, t, i, l), t.child;
      case 11:
        return _g(
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
        return Ag(
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
        return Vg(e, t, l);
      case 31:
        return eE(e, t, l);
      case 22:
        return Tg(
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
        else if (fb()) e.flags |= 8192;
        else
          throw lr = Gs, of;
    } else e.flags &= -16777217;
  }
  function Hg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !ey(t))
      if (fb()) e.flags |= 8192;
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
  function nE(e, t, l) {
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
        return l = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), No(gn), Te(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Lr(t) ? Lo(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, $u())), Pt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Lo(t), u !== null ? (Pt(t), Hg(t, u)) : (Pt(t), Gf(
          t,
          s,
          null,
          i,
          l
        ))) : u ? u !== e.memoizedState ? (Lo(t), Pt(t), Hg(t, u)) : (Pt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Lo(t), Pt(t), Gf(
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
          e = oe.current, Lr(t) ? yp(t) : (e = Xb(s, i, l), t.stateNode = e, Lo(t));
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
            yp(t);
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
            e[Ct] = t, e = !!(e.nodeValue === l || i !== null && i.suppressHydrationWarning === !0 || jb(e.nodeValue, l)), e || oi(t, !0);
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
        return No(t.type), Pt(t), null;
      case 19:
        if (K(un), i = t.memoizedState, i === null) return Pt(t), null;
        if (s = (t.flags & 128) !== 0, u = i.rendering, u === null)
          if (s) Ua(i, !1);
          else {
            if (ln !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = Xs(e), u !== null) {
                  for (t.flags |= 128, Ua(i, !1), e = u.updateQueue, t.updateQueue = e, ic(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    hp(l, e), l = l.sibling;
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
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), No(gn), Pt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(a(156, t.tag));
  }
  function lE(e, t) {
    switch (Qu(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return No(gn), Te(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
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
        return No(t.type), null;
      case 22:
      case 23:
        return wl(t), ff(), e !== null && K(tr), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return No(gn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ug(e, t) {
    switch (Qu(t), t.tag) {
      case 3:
        No(gn), Te();
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
        No(t.type);
        break;
      case 22:
      case 23:
        wl(t), ff(), e !== null && K(tr);
        break;
      case 24:
        No(gn);
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
              var j = l, J = E;
              try {
                J();
              } catch (ue) {
                jt(
                  s,
                  j,
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
  function Bg(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        kp(t, l);
      } catch (i) {
        jt(e, e.return, i);
      }
    }
  }
  function Gg(e, t, l) {
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
  function Yg(e) {
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
      wE(i, e.type, l, t), i[Rt] = t;
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function qg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && yi(e.type) || e.tag === 4;
  }
  function qf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || qg(e.return)) return null;
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
  function Pg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Hn(t, i, l), t[Ct] = e, t[Rt] = l;
    } catch (u) {
      jt(e, e.return, u);
    }
  }
  var Vo = !1, vn = !1, Xf = !1, Xg = typeof WeakSet == "function" ? WeakSet : Set, Tn = null;
  function oE(e, t) {
    if (e = e.containerInfo, hd = Ac, e = op(e), Iu(e)) {
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
            var p = 0, E = -1, j = -1, J = 0, ue = 0, me = e, W = null;
            t: for (; ; ) {
              for (var ie; me !== l || s !== 0 && me.nodeType !== 3 || (E = p + s), me !== u || i !== 0 && me.nodeType !== 3 || (j = p + i), me.nodeType === 3 && (p += me.nodeValue.length), (ie = me.firstChild) !== null; )
                W = me, me = ie;
              for (; ; ) {
                if (me === e) break t;
                if (W === l && ++J === s && (E = p), W === u && ++ue === i && (j = p), (ie = me.nextSibling) !== null) break;
                me = W, W = me.parentNode;
              }
              me = ie;
            }
            l = E === -1 || j === -1 ? null : { start: E, end: j };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (md = { focusedElem: e, selectionRange: l }, Ac = !1, Tn = t; Tn !== null; )
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
  function Kg(e, t, l) {
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
        i & 64 && Bg(l), i & 512 && Ga(l, l.return);
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
            kp(e, t);
          } catch (p) {
            jt(l, l.return, p);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Pg(l);
      case 26:
      case 5:
        Ho(e, l), t === null && i & 4 && Yg(l), i & 512 && Ga(l, l.return);
        break;
      case 12:
        Ho(e, l);
        break;
      case 31:
        Ho(e, l), i & 4 && Zg(e, l);
        break;
      case 13:
        Ho(e, l), i & 4 && $g(e, l), i & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = hE.bind(
          null,
          l
        ), zE(e, l))));
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
  function Fg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Fg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && uo(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, cl = !1;
  function Io(e, t, l) {
    for (l = l.child; l !== null; )
      Qg(e, t, l), l = l.sibling;
  }
  function Qg(e, t, l) {
    if (xt && typeof xt.onCommitFiberUnmount == "function")
      try {
        xt.onCommitFiberUnmount(Nt, l);
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
        Zt !== null && (cl ? (e = Zt, Bb(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), la(e)) : Bb(Zt, l.stateNode));
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
        vn || (go(l, t), i = l.stateNode, typeof i.componentWillUnmount == "function" && Gg(
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
  function Zg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        la(e);
      } catch (l) {
        jt(t, t.return, l);
      }
    }
  }
  function $g(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        la(e);
      } catch (l) {
        jt(t, t.return, l);
      }
  }
  function iE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Xg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xg()), t;
      default:
        throw Error(a(435, e.tag));
    }
  }
  function ac(e, t) {
    var l = iE(e);
    t.forEach(function(i) {
      if (!l.has(i)) {
        l.add(i);
        var s = mE.bind(null, e, i);
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
        Qg(u, p, s), Zt = null, cl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Jg(t, e), t = t.sibling;
  }
  var oo = null;
  function Jg(e, t) {
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
                      var p = Jb(
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
                      if (p = Jb(
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
                Wb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = $b(
                s,
                i,
                e.memoizedProps
              );
          else
            u !== i ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, i === null ? Wb(
              s,
              e.type,
              e.stateNode
            ) : $b(
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
        Xf && (Xf = !1, Wg(e));
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
        var j = l !== null && l.memoizedState !== null, J = Vo, ue = vn;
        if (Vo = J || s, vn = ue || j, ul(t, e), vn = ue, Vo = J, fl(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || j || Vo || vn || ar(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                j = l = t;
                try {
                  if (u = j.stateNode, s)
                    p = u.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    E = j.stateNode;
                    var me = j.memoizedProps.style, W = me != null && me.hasOwnProperty("display") ? me.display : null;
                    E.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
                  }
                } catch (Ve) {
                  jt(j, j.return, Ve);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                j = t;
                try {
                  j.stateNode.nodeValue = s ? "" : j.memoizedProps;
                } catch (Ve) {
                  jt(j, j.return, Ve);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                j = t;
                try {
                  var ie = j.stateNode;
                  s ? Gb(ie, !0) : Gb(j.stateNode, !1);
                } catch (Ve) {
                  jt(j, j.return, Ve);
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
          if (qg(i)) {
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
            var j = l.stateNode.containerInfo, J = qf(e);
            Pf(
              e,
              J,
              j
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
  function Wg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Wg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Ho(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Kg(e, t.alternate, t), t = t.sibling;
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
          typeof l.componentWillUnmount == "function" && Gg(
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
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++)
                  Op(j[s], E);
            } catch (J) {
              jt(i, i.return, J);
            }
          }
          l && p & 64 && Bg(u), Ga(u, u.return);
          break;
        case 27:
          Pg(u);
        case 26:
        case 5:
          Uo(
            s,
            u,
            l
          ), l && i === null && p & 4 && Yg(u), Ga(u, u.return);
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
          ), l && p & 4 && Zg(s, u);
          break;
        case 13:
          Uo(
            s,
            u,
            l
          ), l && p & 4 && $g(s, u);
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
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Ma(l));
  }
  function Ff(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ma(e));
  }
  function io(e, t, l, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        eb(
          e,
          t,
          l,
          i
        ), t = t.sibling;
  }
  function eb(e, t, l, i) {
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
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ma(e)));
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
          } catch (j) {
            jt(t, t.return, j);
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
      var u = e, p = t, E = l, j = i, J = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Xr(
            u,
            p,
            E,
            j,
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
            j,
            s
          ) : Ya(
            u,
            p
          ) : (ue._visibility |= 2, Xr(
            u,
            p,
            E,
            j,
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
            j,
            s
          ), s && J & 2048 && Ff(p.alternate, p);
          break;
        default:
          Xr(
            u,
            p,
            E,
            j,
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
        tb(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function tb(e, t, l) {
    switch (e.tag) {
      case 26:
        Kr(
          e,
          t,
          l
        ), e.flags & qa && e.memoizedState !== null && PE(
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
  function nb(e) {
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
          Tn = i, ob(
            i,
            e
          );
        }
      nb(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        lb(e), e = e.sibling;
  }
  function lb(e) {
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
          Tn = i, ob(
            i,
            e
          );
        }
      nb(e);
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
  function ob(e, t) {
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
          Ma(l.memoizedState.cache);
      }
      if (i = l.child, i !== null) i.return = l, Tn = i;
      else
        e: for (l = e; Tn !== null; ) {
          i = Tn;
          var s = i.sibling, u = i.return;
          if (Fg(i), i === l) {
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
  var rE = {
    getCacheForType: function(e) {
      var t = Vn(gn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Vn(gn).controller.signal;
    }
  }, aE = typeof WeakMap == "function" ? WeakMap : Map, kt = 0, Ut = null, ht = null, gt = 0, Dt = 0, _l = null, di = !1, Fr = !1, Qf = !1, Bo = 0, ln = 0, hi = 0, sr = 0, Zf = 0, Al = 0, Qr = 0, Xa = null, dl = null, $f = !1, cc = 0, ib = 0, uc = 1 / 0, fc = null, mi = null, En = 0, pi = null, Zr = null, Go = 0, Jf = 0, Wf = null, rb = null, Ka = 0, ed = null;
  function Ml() {
    return (kt & 2) !== 0 && gt !== 0 ? gt & -gt : V.T !== null ? rd() : ll();
  }
  function ab() {
    if (Al === 0)
      if ((gt & 536870912) === 0 || yt) {
        var e = Wt;
        Wt <<= 1, (Wt & 3932160) === 0 && (Wt = 262144), Al = e;
      } else Al = 536870912;
    return e = Rl.current, e !== null && (e.flags |= 32), Al;
  }
  function hl(e, t, l) {
    (e === Ut && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null) && ($r(e, 0), gi(
      e,
      gt,
      Al,
      !1
    )), nl(e, l), ((kt & 2) === 0 || e !== Ut) && (e === Ut && ((kt & 2) === 0 && (sr |= l), ln === 4 && gi(
      e,
      gt,
      Al,
      !1
    )), bo(e));
  }
  function sb(e, t, l) {
    if ((kt & 6) !== 0) throw Error(a(327));
    var i = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Qt(e, t), s = i ? uE(e, t) : nd(e, t, !0), u = i;
    do {
      if (s === 0) {
        Fr && !i && gi(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !sE(l)) {
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
              var j = E.current.memoizedState.isDehydrated;
              if (j && ($r(E, p).flags |= 256), p = nd(
                E,
                p,
                !1
              ), p !== 2) {
                if (Qf && !j) {
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
                Al,
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
              Al,
              !di
            ), Ke(i, 0, !0) !== 0) break e;
            Go = t, i.timeoutHandle = Hb(
              cb.bind(
                null,
                i,
                l,
                dl,
                fc,
                $f,
                t,
                Al,
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
          cb(
            i,
            l,
            dl,
            fc,
            $f,
            t,
            Al,
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
  function cb(e, t, l, i, s, u, p, E, j, J, ue, me, W, ie) {
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
      }, tb(
        t,
        u,
        me
      );
      var Ve = (u & 62914560) === u ? cc - Q() : (u & 4194048) === u ? ib - Q() : 0;
      if (Ve = XE(
        me,
        Ve
      ), Ve !== null) {
        Go = u, e.cancelPendingCommit = Ve(
          bb.bind(
            null,
            e,
            t,
            u,
            l,
            i,
            s,
            p,
            E,
            j,
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
    bb(
      e,
      t,
      u,
      l,
      i,
      s,
      p,
      E,
      j
    );
  }
  function sE(e) {
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
    return (kt & 6) === 0 ? (Fa(0), !1) : !0;
  }
  function td() {
    if (ht !== null) {
      if (Dt === 0)
        var e = ht.return;
      else
        e = ht, ko = Wi = null, bf(e), Br = null, Oa = 0, e = ht;
      for (; e !== null; )
        Ug(e.alternate, e), e = e.return;
      ht = null;
    }
  }
  function $r(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, ME(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Go = 0, td(), Ut = e, ht = l = To(e.current, null), gt = t, Dt = 0, _l = null, di = !1, Fr = Qt(e, t), Qf = !1, Qr = Al = Zf = sr = hi = ln = 0, dl = Xa = null, $f = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - st(i), u = 1 << s;
        t |= e[s], i &= ~u;
      }
    return Bo = t, zs(), l;
  }
  function ub(e, t) {
    rt = null, V.H = Ia, t === Ur || t === Bs ? (t = _p(), Dt = 3) : t === of ? (t = _p(), Dt = 4) : Dt = t === zf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, _l = t, ht === null && (ln = 1, tc(
      e,
      Hl(t, e.current)
    ));
  }
  function fb() {
    var e = Rl.current;
    return e === null ? !0 : (gt & 4194048) === gt ? Yl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? e === Yl : !1;
  }
  function db() {
    var e = V.H;
    return V.H = Ia, e === null ? Ia : e;
  }
  function hb() {
    var e = V.A;
    return V.A = rE, e;
  }
  function hc() {
    ln = 4, di || (gt & 4194048) !== gt && Rl.current !== null || (Fr = !0), (hi & 134217727) === 0 && (sr & 134217727) === 0 || Ut === null || gi(
      Ut,
      gt,
      Al,
      !1
    );
  }
  function nd(e, t, l) {
    var i = kt;
    kt |= 2;
    var s = db(), u = hb();
    (Ut !== e || gt !== t) && (fc = null, $r(e, t)), t = !1;
    var p = ln;
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          var E = ht, j = _l;
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
              if (Dt = 0, _l = null, Jr(e, E, j, J), l && Fr) {
                p = 0;
                break e;
              }
              break;
            default:
              J = Dt, Dt = 0, _l = null, Jr(e, E, j, J);
          }
        }
        cE(), p = ln;
        break;
      } catch (ue) {
        ub(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ko = Wi = null, kt = i, V.H = s, V.A = u, ht === null && (Ut = null, gt = 0, zs()), p;
  }
  function cE() {
    for (; ht !== null; ) mb(ht);
  }
  function uE(e, t) {
    var l = kt;
    kt |= 2;
    var i = db(), s = hb();
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
              if (Rp(u)) {
                Dt = 0, _l = null, pb(t);
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
              Rp(u) ? (Dt = 0, _l = null, pb(t)) : (Dt = 0, _l = null, Jr(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (ht.tag) {
                case 26:
                  p = ht.memoizedState;
                case 5:
                case 27:
                  var E = ht;
                  if (p ? ey(p) : E.stateNode.complete) {
                    Dt = 0, _l = null;
                    var j = E.sibling;
                    if (j !== null) ht = j;
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
        fE();
        break;
      } catch (ue) {
        ub(e, ue);
      }
    while (!0);
    return ko = Wi = null, V.H = i, V.A = s, kt = l, ht !== null ? 0 : (Ut = null, gt = 0, zs(), ln);
  }
  function fE() {
    for (; ht !== null && !Xe(); )
      mb(ht);
  }
  function mb(e) {
    var t = Ig(e.alternate, e, Bo);
    e.memoizedProps = e.pendingProps, t === null ? mc(e) : ht = t;
  }
  function pb(e) {
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
        Ug(l, t), t = ht = hp(t, Bo), t = Ig(l, t, Bo);
    }
    e.memoizedProps = e.pendingProps, t === null ? mc(e) : ht = t;
  }
  function Jr(e, t, l, i) {
    ko = Wi = null, bf(t), Br = null, Oa = 0;
    var s = t.return;
    try {
      if (WS(
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
    t.flags & 32768 ? (yt || i === 1 ? e = !0 : Fr || (gt & 536870912) !== 0 ? e = !1 : (di = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Rl.current, i !== null && i.tag === 13 && (i.flags |= 16384))), gb(t, e)) : mc(t);
  }
  function mc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        gb(
          t,
          di
        );
        return;
      }
      e = t.return;
      var l = nE(
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
  function gb(e, t) {
    do {
      var l = lE(e.alternate, e);
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
  function bb(e, t, l, i, s, u, p, E, j) {
    e.cancelPendingCommit = null;
    do
      pc();
    while (En !== 0);
    if ((kt & 6) !== 0) throw Error(a(327));
    if (t !== null) {
      if (t === e.current) throw Error(a(177));
      if (u = t.lanes | t.childLanes, u |= Yu, zt(
        e,
        l,
        u,
        p,
        E,
        j
      ), e === Ut && (ht = Ut = null, gt = 0), Zr = t, pi = e, Go = l, Jf = u, Wf = s, rb = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, pE(Ge, function() {
        return Eb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null, s = H.p, H.p = 2, p = kt, kt |= 4;
        try {
          oE(e, t, l);
        } finally {
          kt = p, H.p = s, V.T = i;
        }
      }
      En = 1, yb(), vb(), xb();
    }
  }
  function yb() {
    if (En === 1) {
      En = 0;
      var e = pi, t = Zr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = kt;
        kt |= 4;
        try {
          Jg(t, e);
          var u = md, p = op(e.containerInfo), E = u.focusedElem, j = u.selectionRange;
          if (p !== E && E && E.ownerDocument && lp(
            E.ownerDocument.documentElement,
            E
          )) {
            if (j !== null && Iu(E)) {
              var J = j.start, ue = j.end;
              if (ue === void 0 && (ue = J), "selectionStart" in E)
                E.selectionStart = J, E.selectionEnd = Math.min(
                  ue,
                  E.value.length
                );
              else {
                var me = E.ownerDocument || document, W = me && me.defaultView || window;
                if (W.getSelection) {
                  var ie = W.getSelection(), Ve = E.textContent.length, $e = Math.min(j.start, Ve), It = j.end === void 0 ? $e : Math.min(j.end, Ve);
                  !ie.extend && $e > It && (p = It, It = $e, $e = p);
                  var P = np(
                    E,
                    $e
                  ), B = np(
                    E,
                    It
                  );
                  if (P && B && (ie.rangeCount !== 1 || ie.anchorNode !== P.node || ie.anchorOffset !== P.offset || ie.focusNode !== B.node || ie.focusOffset !== B.offset)) {
                    var $ = me.createRange();
                    $.setStart(P.node, P.offset), ie.removeAllRanges(), $e > It ? (ie.addRange($), ie.extend(B.node, B.offset)) : ($.setEnd(B.node, B.offset), ie.addRange($));
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
          Ac = !!hd, md = hd = null;
        } finally {
          kt = s, H.p = i, V.T = l;
        }
      }
      e.current = t, En = 2;
    }
  }
  function vb() {
    if (En === 2) {
      En = 0;
      var e = pi, t = Zr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var i = H.p;
        H.p = 2;
        var s = kt;
        kt |= 4;
        try {
          Kg(e, t.alternate, t);
        } finally {
          kt = s, H.p = i, V.T = l;
        }
      }
      En = 3;
    }
  }
  function xb() {
    if (En === 4 || En === 3) {
      En = 0, ye();
      var e = pi, t = Zr, l = Go, i = rb;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? En = 5 : (En = 0, Zr = pi = null, Sb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (mi = null), jl(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
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
  function Sb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ma(t)));
  }
  function pc() {
    return yb(), vb(), xb(), Eb();
  }
  function Eb() {
    if (En !== 5) return !1;
    var e = pi, t = Jf;
    Jf = 0;
    var l = jl(Go), i = V.T, s = H.p;
    try {
      H.p = 32 > l ? 32 : l, V.T = null, l = Wf, Wf = null;
      var u = pi, p = Go;
      if (En = 0, Zr = pi = null, Go = 0, (kt & 6) !== 0) throw Error(a(331));
      var E = kt;
      if (kt |= 4, lb(u.current), eb(
        u,
        u.current,
        p,
        l
      ), kt = E, Fa(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Nt, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = s, V.T = i, Sb(e, t);
    }
  }
  function Cb(e, t, l) {
    t = Hl(l, t), t = Nf(e.stateNode, t, 2), e = si(e, t, 2), e !== null && (nl(e, 2), bo(e));
  }
  function jt(e, t, l) {
    if (e.tag === 3)
      Cb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Cb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (mi === null || !mi.has(i))) {
            e = Hl(l, e), l = Rg(2), i = si(t, l, 2), i !== null && (wg(
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
      i = e.pingCache = new aE();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(l) || (Qf = !0, s.add(l), e = dE.bind(null, e, t, l), t.then(e, e));
  }
  function dE(e, t, l) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (gt & l) === l && (ln === 4 || ln === 3 && (gt & 62914560) === gt && 300 > Q() - cc ? (kt & 2) === 0 && $r(e, 0) : Zf |= l, Qr === gt && (Qr = 0)), bo(e);
  }
  function Rb(e, t) {
    t === 0 && (t = _n()), e = Zi(e, t), e !== null && (nl(e, t), bo(e));
  }
  function hE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Rb(e, l);
  }
  function mE(e, t) {
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
    i !== null && i.delete(t), Rb(e, l);
  }
  function pE(e, t) {
    return We(e, t);
  }
  var gc = null, Wr = null, od = !1, bc = !1, id = !1, bi = 0;
  function bo(e) {
    e !== Wr && e.next === null && (Wr === null ? gc = Wr = e : Wr = Wr.next = e), bc = !0, od || (od = !0, bE());
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
  function gE() {
    wb();
  }
  function wb() {
    bc = od = !1;
    var e = 0;
    bi !== 0 && AE() && (e = bi);
    for (var t = Q(), l = null, i = gc; i !== null; ) {
      var s = i.next, u = _b(i, t);
      u === 0 ? (i.next = null, l === null ? gc = s : l.next = s, s === null && (Wr = l)) : (l = i, (e !== 0 || (u & 3) !== 0) && (bc = !0)), i = s;
    }
    En !== 0 && En !== 5 || Fa(e), bi !== 0 && (bi = 0);
  }
  function _b(e, t) {
    for (var l = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var p = 31 - st(u), E = 1 << p, j = s[p];
      j === -1 ? ((E & l) === 0 || (E & i) !== 0) && (s[p] = wn(E, t)) : j <= t && (e.expiredLanes |= E), u &= ~E;
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
      return i = Ab.bind(null, e), l = We(l, i), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return i !== null && i !== null && tt(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ab(e, t) {
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
    ), i === 0 ? null : (sb(e, i, t), _b(e, Q()), e.callbackNode != null && e.callbackNode === l ? Ab.bind(null, e) : null);
  }
  function Mb(e, t) {
    if (pc()) return null;
    sb(e, t, !0);
  }
  function bE() {
    TE(function() {
      (kt & 6) !== 0 ? We(
        He,
        gE
      ) : wb();
    });
  }
  function rd() {
    if (bi === 0) {
      var e = Ir;
      e === 0 && (e = Ft, Ft <<= 1, (Ft & 261888) === 0 && (Ft = 256)), bi = e;
    }
    return bi;
  }
  function Tb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : no("" + e);
  }
  function Ob(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function yE(e, t, l, i, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = Tb(
        (s[Rt] || null).action
      ), p = i.submitter;
      p && (t = (t = p[Rt] || null) ? Tb(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
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
                  var j = p ? Ob(s, p) : new FormData(s);
                  _f(
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
                typeof u == "function" && (E.preventDefault(), j = p ? Ob(s, p) : new FormData(s), _f(
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
  for (var ad = 0; ad < Gu.length; ad++) {
    var sd = Gu[ad], vE = sd.toLowerCase(), xE = sd[0].toUpperCase() + sd.slice(1);
    lo(
      vE,
      "on" + xE
    );
  }
  lo(ap, "onAnimationEnd"), lo(sp, "onAnimationIteration"), lo(cp, "onAnimationStart"), lo("dblclick", "onDoubleClick"), lo("focusin", "onFocus"), lo("focusout", "onBlur"), lo(LS, "onTransitionRun"), lo(VS, "onTransitionStart"), lo(IS, "onTransitionCancel"), lo(up, "onTransitionEnd"), vl("onMouseEnter", ["mouseout", "mouseover"]), vl("onMouseLeave", ["mouseout", "mouseover"]), vl("onPointerEnter", ["pointerout", "pointerover"]), vl("onPointerLeave", ["pointerout", "pointerover"]), Wl(
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
  ), SE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qa)
  );
  function kb(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var i = e[l], s = i.event;
      i = i.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var p = i.length - 1; 0 <= p; p--) {
            var E = i[p], j = E.instance, J = E.currentTarget;
            if (E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Ns(ue);
            }
            s.currentTarget = null, u = j;
          }
        else
          for (p = 0; p < i.length; p++) {
            if (E = i[p], j = E.instance, J = E.currentTarget, E = E.listener, j !== u && s.isPropagationStopped())
              break e;
            u = E, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Ns(ue);
            }
            s.currentTarget = null, u = j;
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
        l !== "selectionchange" && (SE.has(l) || cd(l, !1, e), cd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[yc] || (t[yc] = !0, cd("selectionchange", !1, t));
    }
  }
  function Nb(e, t, l, i) {
    switch (ay(t)) {
      case 2:
        var s = QE;
        break;
      case 8:
        s = ZE;
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
              var j = p.tag;
              if ((j === 3 || j === 4) && p.stateNode.containerInfo === s)
                return;
              p = p.return;
            }
          for (; E !== null; ) {
            if (p = Yn(E), p === null) return;
            if (j = p.tag, j === 5 || j === 6 || j === 26 || j === 27) {
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
        var W = fp.get(e);
        if (W !== void 0) {
          var ie = Sn, Ve = e;
          switch (e) {
            case "keypress":
              if (Ht(l) === 0) break e;
            case "keydown":
            case "keyup":
              ie = mS;
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
              ie = nS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ie = bS;
              break;
            case ap:
            case sp:
            case cp:
              ie = iS;
              break;
            case up:
              ie = vS;
              break;
            case "scroll":
            case "scrollend":
              ie = fo;
              break;
            case "wheel":
              ie = SS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ie = aS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ie = Gm;
              break;
            case "toggle":
            case "beforetoggle":
              ie = CS;
          }
          var $e = (t & 4) !== 0, It = !$e && (e === "scroll" || e === "scrollend"), P = $e ? W !== null ? W + "Capture" : null : W;
          $e = [];
          for (var B = J, $; B !== null; ) {
            var de = B;
            if ($ = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || $ === null || P === null || (de = G(B, P), de != null && $e.push(
              Za(B, de, $)
            )), It) break;
            B = B.return;
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
            if ($e = xa, de = "onMouseLeave", P = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && ($e = Gm, de = "onPointerLeave", P = "onPointerEnter", B = "pointer"), It = ie == null ? W : ol(ie), $ = Ve == null ? W : ol(Ve), W = new $e(
              de,
              B + "leave",
              ie,
              l,
              ue
            ), W.target = It, W.relatedTarget = $, de = null, Yn(ue) === J && ($e = new $e(
              P,
              B + "enter",
              Ve,
              l,
              ue
            ), $e.target = $, $e.relatedTarget = It, de = $e), It = de, ie && Ve)
              t: {
                for ($e = EE, P = ie, B = Ve, $ = 0, de = P; de; de = $e(de))
                  $++;
                de = 0;
                for (var Pe = B; Pe; Pe = $e(Pe))
                  de++;
                for (; 0 < $ - de; )
                  P = $e(P), $--;
                for (; 0 < de - $; )
                  B = $e(B), de--;
                for (; $--; ) {
                  if (P === B || B !== null && P === B.alternate) {
                    $e = P;
                    break t;
                  }
                  P = $e(P), B = $e(B);
                }
                $e = null;
              }
            else $e = null;
            ie !== null && zb(
              me,
              W,
              ie,
              $e,
              !1
            ), Ve !== null && It !== null && zb(
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
            var _t = Zm;
          else if (Fm(W))
            if ($m)
              _t = zS;
            else {
              _t = kS;
              var Be = OS;
            }
          else
            ie = W.nodeName, !ie || ie.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && sl(J.elementType) && (_t = Zm) : _t = NS;
          if (_t && (_t = _t(e, J))) {
            Qm(
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
            (Fm(Be) || Be.contentEditable === "true") && (Or = Be, Hu = J, wa = null);
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
            Uu = !1, ip(me, l, ue);
            break;
          case "selectionchange":
            if (jS) break;
          case "keydown":
          case "keyup":
            ip(me, l, ue);
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
          Tr ? Xm(e, l) && (bt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (bt = "onCompositionStart");
        bt && (Ym && l.locale !== "ko" && (Tr || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && Tr && (ct = wt()) : (Ie = ue, ke = "value" in Ie ? Ie.value : Ie.textContent, Tr = !0)), Be = vc(J, bt), 0 < Be.length && (bt = new Bm(
          bt,
          e,
          null,
          l,
          ue
        ), me.push({ event: bt, listeners: Be }), ct ? bt.data = ct : (ct = Km(l), ct !== null && (bt.data = ct)))), (ct = wS ? _S(e, l) : AS(e, l)) && (bt = vc(J, "onBeforeInput"), 0 < bt.length && (Be = new Bm(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), me.push({
          event: Be,
          listeners: bt
        }), Be.data = ct)), yE(
          me,
          e,
          J,
          l,
          ue
        );
      }
      kb(me, t);
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
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = G(e, l), s != null && i.unshift(
        Za(e, s, u)
      ), s = G(e, t), s != null && i.push(
        Za(e, s, u)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function EE(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function zb(e, t, l, i, s) {
    for (var u = t._reactName, p = []; l !== null && l !== i; ) {
      var E = l, j = E.alternate, J = E.stateNode;
      if (E = E.tag, j !== null && j === i) break;
      E !== 5 && E !== 26 && E !== 27 || J === null || (j = J, s ? (J = G(l, u), J != null && p.unshift(
        Za(l, J, j)
      )) : s || (J = G(l, u), J != null && p.push(
        Za(l, J, j)
      ))), l = l.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var CE = /\r\n?/g, RE = /\u0000|\uFFFD/g;
  function Db(e) {
    return (typeof e == "string" ? e : "" + e).replace(CE, `
`).replace(RE, "");
  }
  function jb(e, t) {
    return t = Db(t), Db(e) === t;
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
        if (!An.hasOwnProperty(l))
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
        var E = u = p = s = null, j = null, J = null;
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
                  j = ue;
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
        Mr(
          e,
          u,
          E,
          j,
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
        Ao(e, i, s, u);
        return;
      case "option":
        for (j in l)
          l.hasOwnProperty(j) && (i = l[j], i != null) && (j === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : Vt(e, t, j, i, l, null));
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
  function wE(e, t, l, i) {
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
        var s = null, u = null, p = null, E = null, j = null, J = null, ue = null;
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
          j,
          J,
          ue,
          u,
          s
        );
        return;
      case "select":
        ie = p = E = W = null;
        for (u in l)
          if (j = l[u], l.hasOwnProperty(u) && j != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                ie = j;
              default:
                i.hasOwnProperty(u) || Vt(
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
                p = u;
              default:
                u !== j && Vt(
                  e,
                  t,
                  s,
                  u,
                  i,
                  j
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
        for (j in i)
          W = i[j], ie = l[j], i.hasOwnProperty(j) && W !== ie && (W != null || ie != null) && (j === "selected" ? e.selected = W && typeof W != "function" && typeof W != "symbol" : Vt(
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
    for (var P in l)
      W = l[P], l.hasOwnProperty(P) && W != null && !i.hasOwnProperty(P) && Vt(e, t, P, null, i, W);
    for (me in i)
      W = i[me], ie = l[me], !i.hasOwnProperty(me) || W === ie || W == null && ie == null || Vt(e, t, me, W, i, ie);
  }
  function Lb(e) {
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
  function _E() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), i = 0; i < l.length; i++) {
        var s = l[i], u = s.transferSize, p = s.initiatorType, E = s.duration;
        if (u && E && Lb(p)) {
          for (p = 0, E = s.responseEnd, i += 1; i < l.length; i++) {
            var j = l[i], J = j.startTime;
            if (J > E) break;
            var ue = j.transferSize, me = j.initiatorType;
            ue && Lb(me) && (j = j.responseEnd, p += ue * (j < E ? 1 : (E - J) / (j - J)));
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
  function Vb(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ib(e, t) {
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
  function AE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === gd ? !1 : (gd = e, !0) : (gd = null, !1);
  }
  var Hb = typeof setTimeout == "function" ? setTimeout : void 0, ME = typeof clearTimeout == "function" ? clearTimeout : void 0, Ub = typeof Promise == "function" ? Promise : void 0, TE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ub < "u" ? function(e) {
    return Ub.resolve(null).then(e).catch(OE);
  } : Hb;
  function OE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function yi(e) {
    return e === "head";
  }
  function Bb(e, t) {
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
  function Gb(e, t) {
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
  function kE(e, t, l, i) {
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
  function Yb(e, t) {
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
  function zE(e, t) {
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
  function qb(e) {
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
  function Pb(e) {
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
  function Xb(e, t, l) {
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
  var Pl = /* @__PURE__ */ new Map(), Kb = /* @__PURE__ */ new Set();
  function Sc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Yo = H.d;
  H.d = {
    f: DE,
    r: jE,
    D: LE,
    C: VE,
    L: IE,
    m: HE,
    X: BE,
    S: UE,
    M: GE
  };
  function DE() {
    var e = Yo.f(), t = dc();
    return e || t;
  }
  function jE(e) {
    var t = Ll(e);
    t !== null && t.tag === 5 && t.type === "form" ? ug(t) : Yo.r(e);
  }
  var ea = typeof document > "u" ? null : document;
  function Fb(e, t, l) {
    var i = ea;
    if (i && typeof t == "string" && t) {
      var s = Mn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), Kb.has(s) || (Kb.add(s), e = { rel: e, crossOrigin: l, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), Hn(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function LE(e) {
    Yo.D(e), Fb("dns-prefetch", e, null);
  }
  function VE(e, t) {
    Yo.C(e, t), Fb("preconnect", e, t);
  }
  function IE(e, t, l) {
    Yo.L(e, t, l);
    var i = ea;
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
          u = ta(e);
          break;
        case "script":
          u = na(e);
      }
      Pl.has(u) || (e = x(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Pl.set(u, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Ja(u)) || t === "script" && i.querySelector(Wa(u)) || (t = i.createElement("link"), Hn(t, "link", e), en(t), i.head.appendChild(t)));
    }
  }
  function HE(e, t) {
    Yo.m(e, t);
    var l = ea;
    if (l && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Mn(i) + '"][href="' + Mn(e) + '"]', u = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = na(e);
      }
      if (!Pl.has(u) && (e = x({ rel: "modulepreload", href: e }, t), Pl.set(u, e), l.querySelector(s) === null)) {
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
  function UE(e, t, l) {
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
          e = x(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Pl.get(u)) && Sd(e, l);
          var j = p = i.createElement("link");
          en(j), Hn(j, "link", e), j._p = new Promise(function(J, ue) {
            j.onload = J, j.onerror = ue;
          }), j.addEventListener("load", function() {
            E.loading |= 1;
          }), j.addEventListener("error", function() {
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
  function BE(e, t) {
    Yo.X(e, t);
    var l = ea;
    if (l && e) {
      var i = il(l).hoistableScripts, s = na(e), u = i.get(s);
      u || (u = l.querySelector(Wa(s)), u || (e = x({ src: e, async: !0 }, t), (t = Pl.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function GE(e, t) {
    Yo.M(e, t);
    var l = ea;
    if (l && e) {
      var i = il(l).hoistableScripts, s = na(e), u = i.get(s);
      u || (u = l.querySelector(Wa(s)), u || (e = x({ src: e, async: !0, type: "module" }, t), (t = Pl.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, i.set(s, u));
    }
  }
  function Qb(e, t, l, i) {
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
          }, Pl.set(e, l), u || YE(
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
    return 'href="' + Mn(e) + '"';
  }
  function Ja(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Zb(e) {
    return x({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function YE(e, t, l, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), Hn(t, "link", l), en(t), e.head.appendChild(t));
  }
  function na(e) {
    return '[src="' + Mn(e) + '"]';
  }
  function Wa(e) {
    return "script[async]" + e;
  }
  function $b(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Mn(l.href) + '"]'
          );
          if (i)
            return t.instance = i, en(i), i;
          var s = x({}, l, {
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
          i = Zb(l), (s = Pl.get(s)) && Sd(i, s), u = (e.ownerDocument || e).createElement("link"), en(u);
          var p = u;
          return p._p = new Promise(function(E, j) {
            p.onload = E, p.onerror = j;
          }), Hn(u, "link", i), t.state.loading |= 4, Ec(u, l.precedence, e), t.instance = u;
        case "script":
          return u = na(l.src), (s = e.querySelector(
            Wa(u)
          )) ? (t.instance = s, en(s), s) : (i = l, (s = Pl.get(u)) && (i = x({}, l), Ed(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), en(s), Hn(s, "link", i), e.head.appendChild(s), t.instance = s);
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
  function Jb(e, t, l) {
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
  function Wb(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function qE(e, t, l) {
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
  function ey(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function PE(e, t, l, i) {
    if (l.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = ta(i.href), u = t.querySelector(
          Ja(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Rc.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, en(u);
          return;
        }
        u = t.ownerDocument || t, i = Zb(i), (s = Pl.get(s)) && Sd(i, s), u = u.createElement("link"), en(u);
        var p = u;
        p._p = new Promise(function(E, j) {
          p.onload = E, p.onerror = j;
        }), Hn(u, "link", i), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Rc.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Cd = 0;
  function XE(e, t) {
    return e.stylesheets && e.count === 0 && _c(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var i = setTimeout(function() {
        if (e.stylesheets && _c(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Cd === 0 && (Cd = 62500 * _E());
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
    e.stylesheets = null, e.unsuspend !== null && (e.count++, wc = /* @__PURE__ */ new Map(), t.forEach(KE, e), wc = null, Rc.call(e));
  }
  function KE(e, t) {
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
  function FE(e, t, l, i, s, u, p, E, j) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yt(0), this.hiddenUpdates = Yt(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ty(e, t, l, i, s, u, p, E, j, J, ue, me) {
    return e = new FE(
      e,
      t,
      l,
      p,
      j,
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
  function ny(e) {
    return e ? (e = zr, e) : zr;
  }
  function ly(e, t, l, i, s, u) {
    s = ny(s), i.context === null ? i.context = s : i.pendingContext = s, i = ai(t), i.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (i.callback = u), l = si(e, i, t), l !== null && (hl(l, e, t), Na(l, e, t));
  }
  function oy(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rd(e, t) {
    oy(e, t), (e = e.alternate) && oy(e, t);
  }
  function iy(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Zi(e, 67108864);
      t !== null && hl(t, e, 67108864), Rd(e, 67108864);
    }
  }
  function ry(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ml();
      t = co(t);
      var l = Zi(e, t);
      l !== null && hl(l, e, t), Rd(e, t);
    }
  }
  var Ac = !0;
  function QE(e, t, l, i) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 2, wd(e, t, l, i);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function ZE(e, t, l, i) {
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
    if (Ac) {
      var s = _d(i);
      if (s === null)
        fd(
          e,
          t,
          i,
          Mc,
          l
        ), sy(e, i);
      else if (JE(
        s,
        e,
        t,
        l,
        i
      ))
        i.stopPropagation();
      else if (sy(e, i), t & 4 && -1 < $E.indexOf(e)) {
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
                      var j = 1 << 31 - st(p);
                      E.entanglements[1] |= j, p &= ~j;
                    }
                    bo(u), (kt & 6) === 0 && (uc = Q() + 500, Fa(0));
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
            Mc,
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
    return e = k(e), Ad(e);
  }
  var Mc = null;
  function Ad(e) {
    if (Mc = null, e = Yn(e), e !== null) {
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
    return Mc = e, null;
  }
  function ay(e) {
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
  var Md = !1, vi = null, xi = null, Si = null, ts = /* @__PURE__ */ new Map(), ns = /* @__PURE__ */ new Map(), Ei = [], $E = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function sy(e, t) {
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
    }, t !== null && (t = Ll(t), t !== null && iy(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function JE(e, t, l, i, s) {
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
  function cy(e) {
    var t = Yn(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, wo(e.priority, function() {
              ry(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, wo(e.priority, function() {
              ry(l);
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
        return t = Ll(l), t !== null && iy(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function uy(e, t, l) {
    Tc(e) && l.delete(t);
  }
  function WE() {
    Md = !1, vi !== null && Tc(vi) && (vi = null), xi !== null && Tc(xi) && (xi = null), Si !== null && Tc(Si) && (Si = null), ts.forEach(uy), ns.forEach(uy);
  }
  function Oc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Md || (Md = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      WE
    )));
  }
  var kc = null;
  function fy(e) {
    kc !== e && (kc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        kc === e && (kc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (Ad(i || l) === null)
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
    function t(j) {
      return Oc(j, e);
    }
    vi !== null && Oc(vi, e), xi !== null && Oc(xi, e), Si !== null && Oc(Si, e), ts.forEach(t), ns.forEach(t);
    for (var l = 0; l < Ei.length; l++) {
      var i = Ei[l];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ei.length && (l = Ei[0], l.blockedOn === null); )
      cy(l), l.blockedOn === null && Ei.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (i = 0; i < l.length; i += 3) {
        var s = l[i], u = l[i + 1], p = s[Rt] || null;
        if (typeof u == "function")
          p || fy(l);
        else if (p) {
          var E = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, p = u[Rt] || null)
              E = p.formAction;
            else if (Ad(s) !== null) continue;
          } else E = p.action;
          typeof E == "function" ? l[i + 1] = E : (l.splice(i, 3), i -= 3), fy(l);
        }
      }
  }
  function dy() {
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
  Nc.prototype.render = Td.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(a(409));
    var l = t.current, i = Ml();
    ly(l, i, e, t, null, null);
  }, Nc.prototype.unmount = Td.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ly(e.current, 2, null, e, null, null), dc(), t[Ye] = null;
    }
  };
  function Nc(e) {
    this._internalRoot = e;
  }
  Nc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ll();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < Ei.length && t !== 0 && t < Ei[l].priority; l++) ;
      Ei.splice(l, 0, e), l === 0 && cy(e);
    }
  };
  var hy = o.version;
  if (hy !== "19.2.8")
    throw Error(
      a(
        527,
        hy,
        "19.2.8"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
    return e = h(t), e = e !== null ? v(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var eC = {
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
        Nt = zc.inject(
          eC
        ), xt = zc;
      } catch {
      }
  }
  return is.createRoot = function(e, t) {
    if (!c(e)) throw Error(a(299));
    var l = !1, i = "", s = xg, u = Sg, p = Eg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = ty(
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
      dy
    ), e[Ye] = t.current, ud(e), new Td(t);
  }, is.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(a(299));
    var i = !1, s = "", u = xg, p = Sg, E = Eg, j = null;
    return l != null && (l.unstable_strictMode === !0 && (i = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (p = l.onCaughtError), l.onRecoverableError !== void 0 && (E = l.onRecoverableError), l.formState !== void 0 && (j = l.formState)), t = ty(
      e,
      1,
      !0,
      t,
      l ?? null,
      i,
      s,
      j,
      u,
      p,
      E,
      dy
    ), t.context = ny(null), l = t.current, i = Ml(), i = co(i), s = ai(i), s.callback = null, si(l, s, i), l = i, t.current.lanes = l, nl(t, l), bo(t), e[Ye] = t.current, ud(e), new Nc(t);
  }, is.version = "19.2.8", is;
}
var _y;
function fC() {
  if (_y) return Nd.exports;
  _y = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Nd.exports = uC(), Nd.exports;
}
var dC = fC(), b = Ss();
const hC = /* @__PURE__ */ lC(b), Er = /* @__PURE__ */ nC({
  __proto__: null,
  default: hC
}, [b]);
function Ay(n) {
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
function mC(n) {
  const [o, r] = b.useState(() => Ay(n));
  return b.useEffect(() => {
    if (!n) return;
    const a = () => r(Ay(n));
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
function Fv(n) {
  var o, r, a = "";
  if (typeof n == "string" || typeof n == "number") a += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Fv(n[o])) && (a && (a += " "), a += r);
  } else for (r in n) n[r] && (a && (a += " "), a += r);
  return a;
}
function Qv() {
  for (var n, o, r = 0, a = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Fv(n)) && (a && (a += " "), a += o);
  return a;
}
const pC = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let a = 0; a < n.length; a++)
    r[a] = n[a];
  for (let a = 0; a < o.length; a++)
    r[n.length + a] = o[a];
  return r;
}, gC = (n, o) => ({
  classGroupId: n,
  validator: o
}), Zv = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), $c = "-", My = [], bC = "arbitrary..", yC = (n) => {
  const o = xC(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: a
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return vC(d);
      const m = d.split($c), g = m[0] === "" && m.length > 1 ? 1 : 0;
      return $v(m, g, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const g = a[d], h = r[d];
        return g ? h ? pC(h, g) : g : h || My;
      }
      return r[d] || My;
    }
  };
}, $v = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = $v(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join($c) : n.slice(o).join($c), g = d.length;
  for (let h = 0; h < g; h++) {
    const v = d[h];
    if (v.validator(m))
      return v.classGroupId;
  }
}, vC = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = n.slice(1, -1), r = o.indexOf(":"), a = o.slice(0, r);
  return a ? bC + a : void 0;
})(), xC = (n) => {
  const {
    theme: o,
    classGroups: r
  } = n;
  return SC(r, o);
}, SC = (n, o) => {
  const r = Zv();
  for (const a in n) {
    const c = n[a];
    Gh(c, r, a, o);
  }
  return r;
}, Gh = (n, o, r, a) => {
  const c = n.length;
  for (let f = 0; f < c; f++) {
    const d = n[f];
    EC(d, o, r, a);
  }
}, EC = (n, o, r, a) => {
  if (typeof n == "string") {
    CC(n, o, r);
    return;
  }
  if (typeof n == "function") {
    RC(n, o, r, a);
    return;
  }
  wC(n, o, r, a);
}, CC = (n, o, r) => {
  const a = n === "" ? o : Jv(o, n);
  a.classGroupId = r;
}, RC = (n, o, r, a) => {
  if (_C(n)) {
    Gh(n(a), o, r, a);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(gC(r, n));
}, wC = (n, o, r, a) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, g] = c[d];
    Gh(g, Jv(o, m), r, a);
  }
}, Jv = (n, o) => {
  let r = n;
  const a = o.split($c), c = a.length;
  for (let f = 0; f < c; f++) {
    const d = a[f];
    let m = r.nextPart.get(d);
    m || (m = Zv(), r.nextPart.set(d, m)), r = m;
  }
  return r;
}, _C = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, AC = (n) => {
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
}, bh = "!", Ty = ":", MC = [], Oy = (n, o, r, a, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: a,
  isExternal: c
}), TC = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let a = (c) => {
    const f = [];
    let d = 0, m = 0, g = 0, h;
    const v = c.length;
    for (let A = 0; A < v; A++) {
      const O = c[A];
      if (d === 0 && m === 0) {
        if (O === Ty) {
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
    const x = f.length === 0 ? c : c.slice(g);
    let y = x, C = !1;
    x.endsWith(bh) ? (y = x.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      x.startsWith(bh) && (y = x.slice(1), C = !0)
    );
    const w = h && h > g ? h - g : void 0;
    return Oy(f, C, y, w);
  };
  if (o) {
    const c = o + Ty, f = a;
    a = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Oy(MC, !1, d, void 0, !0);
  }
  if (r) {
    const c = a;
    a = (f) => r({
      className: f,
      parseClassName: c
    });
  }
  return a;
}, OC = (n) => {
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
}, kC = (n) => ({
  cache: AC(n.cacheSize),
  parseClassName: TC(n),
  sortModifiers: OC(n),
  postfixLookupClassGroupIds: NC(n),
  ...yC(n)
}), NC = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let a = 0; a < r.length; a++)
      o[r[a]] = !0;
  return o;
}, zC = /\s+/, DC = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: a,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, m = [], g = n.trim().split(zC);
  let h = "";
  for (let v = g.length - 1; v >= 0; v -= 1) {
    const x = g[v], {
      isExternal: y,
      modifiers: C,
      hasImportantModifier: w,
      baseClassName: A,
      maybePostfixModifierPosition: O
    } = r(x);
    if (y) {
      h = x + (h.length > 0 ? " " + h : h);
      continue;
    }
    let M = !!O, T;
    if (M) {
      const Y = A.substring(0, O);
      T = a(Y);
      const L = T && d[T] ? a(A) : void 0;
      L && L !== T && (T = L, M = !1);
    } else
      T = a(A);
    if (!T) {
      if (!M) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (T = a(A), !T) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      M = !1;
    }
    const _ = C.length === 0 ? "" : C.length === 1 ? C[0] : f(C).join(":"), N = w ? _ + bh : _, I = N + T;
    if (m.indexOf(I) > -1)
      continue;
    m.push(I);
    const q = c(T, M);
    for (let Y = 0; Y < q.length; ++Y) {
      const L = q[Y];
      m.push(N + L);
    }
    h = x + (h.length > 0 ? " " + h : h);
  }
  return h;
}, jC = (...n) => {
  let o = 0, r, a, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (a = Wv(r)) && (c && (c += " "), c += a);
  return c;
}, Wv = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let a = 0; a < n.length; a++)
    n[a] && (o = Wv(n[a])) && (r && (r += " "), r += o);
  return r;
}, LC = (n, ...o) => {
  let r, a, c, f;
  const d = (g) => {
    const h = o.reduce((v, x) => x(v), n());
    return r = kC(h), a = r.cache.get, c = r.cache.set, f = m, m(g);
  }, m = (g) => {
    const h = a(g);
    if (h)
      return h;
    const v = DC(g, r);
    return c(g, v), v;
  };
  return f = d, (...g) => f(jC(...g));
}, VC = [], Cn = (n) => {
  const o = (r) => r[n] || VC;
  return o.isThemeGetter = !0, o;
}, e0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, t0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i, IC = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, HC = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, UC = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, BC = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, GC = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, YC = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ri = (n) => IC.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), yo = (n) => !!n && Number.isInteger(Number(n)), Vd = (n) => n.endsWith("%") && ft(n.slice(0, -1)), qo = (n) => HC.test(n), n0 = () => !0, qC = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  UC.test(n) && !BC.test(n)
), Yh = () => !1, PC = (n) => GC.test(n), XC = (n) => YC.test(n), KC = (n) => !De(n) && !je(n), FC = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), QC = (n) => Hi(n, i0, Yh), De = (n) => e0.test(n), cr = (n) => Hi(n, r0, qC), ky = (n) => Hi(n, lR, ft), ZC = (n) => Hi(n, s0, n0), $C = (n) => Hi(n, a0, Yh), Ny = (n) => Hi(n, l0, Yh), JC = (n) => Hi(n, o0, XC), Dc = (n) => Hi(n, c0, PC), je = (n) => t0.test(n), rs = (n) => Cr(n, r0), WC = (n) => Cr(n, a0), zy = (n) => Cr(n, l0), eR = (n) => Cr(n, i0), tR = (n) => Cr(n, o0), jc = (n) => Cr(n, c0, !0), nR = (n) => Cr(n, s0, !0), Hi = (n, o, r) => {
  const a = e0.exec(n);
  return a ? a[1] ? o(a[1]) : r(a[2]) : !1;
}, Cr = (n, o, r = !1) => {
  const a = t0.exec(n);
  return a ? a[1] ? o(a[1]) : r : !1;
}, l0 = (n) => n === "position" || n === "percentage", o0 = (n) => n === "image" || n === "url", i0 = (n) => n === "length" || n === "size" || n === "bg-size", r0 = (n) => n === "length", lR = (n) => n === "number", a0 = (n) => n === "family-name", s0 = (n) => n === "number" || n === "weight", c0 = (n) => n === "shadow", oR = () => {
  const n = Cn("color"), o = Cn("font"), r = Cn("text"), a = Cn("font-weight"), c = Cn("tracking"), f = Cn("leading"), d = Cn("breakpoint"), m = Cn("container"), g = Cn("spacing"), h = Cn("radius"), v = Cn("shadow"), x = Cn("inset-shadow"), y = Cn("text-shadow"), C = Cn("drop-shadow"), w = Cn("blur"), A = Cn("perspective"), O = Cn("aspect"), M = Cn("ease"), T = Cn("animate"), _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], N = () => [
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
  ], I = () => [...N(), je, De], q = () => ["auto", "hidden", "clip", "visible", "scroll"], Y = () => ["auto", "contain", "none"], L = () => [je, De, g], X = () => [Ri, "full", "auto", ...L()], te = () => [yo, "none", "subgrid", je, De], se = () => ["auto", {
    span: ["full", yo, je, De]
  }, yo, je, De], fe = () => [yo, "auto", je, De], le = () => ["auto", "min", "max", "fr", je, De], he = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...L()], H = () => [Ri, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...L()], F = () => [Ri, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...L()], ve = () => [Ri, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...L()], ae = () => [n, je, De], z = () => [...N(), zy, Ny, {
    position: [je, De]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ne = () => ["auto", "cover", "contain", eR, QC, {
    size: [je, De]
  }], oe = () => [Vd, rs, cr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    je,
    De
  ], we = () => ["", ft, rs, cr], qe = () => ["solid", "dashed", "dotted", "double"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Te = () => [ft, Vd, zy, Ny], it = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    w,
    je,
    De
  ], pt = () => ["none", ft, je, De], ze = () => ["none", ft, je, De], et = () => [ft, je, De], Ne = () => [Ri, "full", ...L()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [qo],
      breakpoint: [qo],
      color: [n0],
      container: [qo],
      "drop-shadow": [qo],
      ease: ["in", "out", "in-out"],
      font: [KC],
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
      "container-named": [FC],
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
        overscroll: Y()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Y()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Y()
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
        inset: X()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": X()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": X()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": X(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: X()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": X(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: X()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": X()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": X()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: X()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: X()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: X()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: X()
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
        basis: [Ri, "full", "auto", m, ...L()]
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
        font: [a, nR, ZC]
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
        font: [WC, $C, o]
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
        "line-clamp": [ft, "none", je, ky]
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
        indent: L()
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
        }, tR, JC]
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
          v,
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
        "inset-shadow": ["none", x, jc, Dc]
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
        "text-shadow": ["none", y, jc, Dc]
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
        stroke: [ft, rs, cr, ky]
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
}, iR = /* @__PURE__ */ LC(oR);
function Je(...n) {
  return iR(Qv(n));
}
const u0 = (...n) => n.filter((o, r, a) => !!o && o.trim() !== "" && a.indexOf(o) === r).join(" ").trim();
const rR = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const aR = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, a) => a ? a.toUpperCase() : r.toLowerCase()
);
const Dy = (n) => {
  const o = aR(n);
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
const sR = (n) => {
  for (const o in n)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
  return !1;
}, cR = b.createContext({}), uR = () => b.useContext(cR), fR = b.forwardRef(
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: a, className: c = "", children: f, iconNode: d, ...m }, g) => {
    const {
      size: h = 24,
      strokeWidth: v = 2,
      absoluteStrokeWidth: x = !1,
      color: y = "currentColor",
      className: C = ""
    } = uR() ?? {}, w = a ?? x ? Number(r ?? v) * 24 / Number(o ?? h) : r ?? v;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...Id,
        width: o ?? h ?? Id.width,
        height: o ?? h ?? Id.height,
        stroke: n ?? y,
        strokeWidth: w,
        className: u0("lucide", C, c),
        ...!f && !sR(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([A, O]) => b.createElement(A, O)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Nn = (n, o) => {
  const r = b.forwardRef(
    ({ className: a, ...c }, f) => b.createElement(fR, {
      ref: f,
      iconNode: o,
      className: u0(
        `lucide-${rR(Dy(n))}`,
        `lucide-${n}`,
        a
      ),
      ...c
    })
  );
  return r.displayName = Dy(n), r;
};
const dR = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], hR = Nn("check", dR);
const mR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], f0 = Nn("chevron-down", mR);
const pR = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], gR = Nn("chevron-right", pR);
const bR = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], jy = Nn("circle", bR);
const yR = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], vR = Nn("expand", yR);
const xR = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], SR = Nn("eye", xR);
const ER = [
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
], CR = Nn("eye-off", ER);
const RR = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], wR = Nn("lasso", RR);
const _R = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], AR = Nn("maximize", _R);
const MR = [["path", { d: "M5 12h14", key: "1ays0h" }]], d0 = Nn("minus", MR);
const TR = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], OR = Nn("move", TR);
const kR = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], NR = Nn("pentagon", kR);
const zR = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], DR = Nn("plus", zR);
const jR = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], h0 = Nn("shapes", jR);
const LR = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], VR = Nn("shrink", LR);
const IR = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], HR = Nn("spline", IR);
const UR = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], BR = Nn("square", UR);
const GR = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], m0 = Nn("x", GR);
var pa = Kv(), YR = Object.defineProperty, qh = (n, o) => YR(n, "name", { value: o, configurable: !0 });
function yh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
qh(yh, "setRef");
function p0(...n) {
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
qh(p0, "composeRefs");
function Kn(...n) {
  return b.useCallback(p0(...n), n);
}
qh(Kn, "useComposedRefs");
var qR = Object.defineProperty, ao = (n, o) => qR(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function pr(n) {
  const o = b.forwardRef((r, a) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const g = [];
    vh(c) && typeof Lc == "function" && (c = Lc(c._payload)), b.Children.forEach(c, (y) => {
      if (x0(y)) {
        m = !0;
        const C = y;
        let w = "child" in C.props ? C.props.child : C.props.children;
        vh(w) && typeof Lc == "function" && (w = Lc(w._payload)), d = XR(C, w), g.push(d?.props?.children);
      } else
        g.push(y);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? v0(d) : void 0, v = Kn(a, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? QR(n) : FR(n)
        );
      return c;
    }
    const x = y0(f, d.props ?? {});
    return d.type !== b.Fragment && (x.ref = a ? v : h), b.cloneElement(d, x);
  });
  return o.displayName = `${n}.Slot`, o;
}
ao(pr, "createSlot");
var g0 = /* @__PURE__ */ pr("Slot"), b0 = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function PR(n) {
  const o = /* @__PURE__ */ ao((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = b0, o;
}
ao(PR, "createSlottable");
var XR = /* @__PURE__ */ ao((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function y0(n, o) {
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
ao(y0, "mergeProps");
function v0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
ao(v0, "getElementRef");
function x0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === b0;
}
ao(x0, "isSlottable");
var KR = /* @__PURE__ */ Symbol.for("react.lazy");
function vh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === KR && "_payload" in n && S0(n._payload);
}
ao(vh, "isLazyComponent");
function S0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
ao(S0, "isPromiseLike");
var FR = /* @__PURE__ */ ao((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), QR = /* @__PURE__ */ ao((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Lc = Er[" use ".trim().toString()], ZR = Object.defineProperty, $R = (n, o) => ZR(n, "name", { value: o, configurable: !0 }), JR = [
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
], Un = JR.reduce((n, o) => {
  const r = /* @__PURE__ */ pr(`Primitive.${o}`), a = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(g, { ...m, ref: f });
  });
  return a.displayName = `Primitive.${o}`, { ...n, [o]: a };
}, {});
function WR(n, o) {
  n && pa.flushSync(() => n.dispatchEvent(o));
}
$R(WR, "dispatchDiscreteCustomEvent");
var ew = Object.defineProperty, Fl = (n, o) => ew(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function tw(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const a = /* @__PURE__ */ Fl((f) => {
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
  return Fl(c, "useContext"), [a, c];
}
Fl(tw, "createContext");
// @__NO_SIDE_EFFECTS__
function Ui(n, o = []) {
  let r = [];
  function a(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Fl((x) => {
      const { scope: y, children: C, ...w } = x, A = y?.[n]?.[g] || m, O = b.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ S.jsx(A.Provider, { value: O, children: C });
    }, "Provider");
    h.displayName = f + "Provider";
    function v(x, y, C = {}) {
      const { optional: w = !1 } = C, A = y?.[n]?.[g] || m, O = b.useContext(A);
      if (O) return O;
      if (d !== void 0) return d;
      if (!w)
        throw new Error(`\`${x}\` must be used within \`${f}\``);
    }
    return Fl(v, "useContext"), [h, v];
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
  return c.scopeName = n, [a, E0(c, ...o)];
}
Fl(Ui, "createContextScope");
function E0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Fl(() => {
    const a = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Fl(function(f) {
      const d = a.reduce((m, { useScope: g, scopeName: h }) => {
        const x = g(f)[`__scope${h}`];
        return { ...m, ...x };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Fl(E0, "composeContextScopes");
var nw = Object.defineProperty, kn = (n, o) => nw(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function su(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Ui(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ kn((A) => {
    const { scope: O, children: M } = A, T = b.useRef(null), _ = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: O, itemMap: _, collectionRef: T, children: M });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", g = /* @__PURE__ */ pr(m), h = b.forwardRef(
    (A, O) => {
      const { scope: M, children: T } = A, _ = f(m, M), N = Kn(O, _.collectionRef);
      return /* @__PURE__ */ S.jsx(g, { ref: N, children: T });
    }
  );
  h.displayName = m;
  const v = n + "CollectionItemSlot", x = "data-radix-collection-item", y = /* @__PURE__ */ pr(v), C = b.forwardRef(
    (A, O) => {
      const { scope: M, children: T, ..._ } = A, N = b.useRef(null), I = Kn(O, N), q = f(v, M);
      return b.useEffect(() => (q.itemMap.set(N, { ref: N, ..._ }), () => {
        q.itemMap.delete(N);
      })), /* @__PURE__ */ S.jsx(y, { [x]: "", ref: I, children: T });
    }
  );
  C.displayName = v;
  function w(A) {
    const O = f(n + "CollectionConsumer", A);
    return b.useCallback(() => {
      const T = O.collectionRef.current;
      if (!T) return [];
      const _ = Array.from(T.querySelectorAll(`[${x}]`));
      return Array.from(O.itemMap.values()).sort(
        (q, Y) => _.indexOf(q.ref.current) - _.indexOf(Y.ref.current)
      );
    }, [O.collectionRef, O.itemMap]);
  }
  return kn(w, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: C },
    w,
    a
  ];
}
kn(su, "createCollection");
var Ly = /* @__PURE__ */ new WeakMap(), xn, Tl, Hd = (Tl = class extends Map {
  constructor(r) {
    super(r);
    gy(this, xn);
    Od(this, xn, [...super.keys()]), Ly.set(this, !0);
  }
  set(r, a) {
    return Ly.get(this) && (this.has(r) ? qn(this, xn)[qn(this, xn).indexOf(r)] = r : qn(this, xn).push(r)), super.set(r, a), this;
  }
  insert(r, a, c) {
    const f = this.has(a), d = qn(this, xn).length, m = Ph(r);
    let g = m >= 0 ? m : d + m;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(a, c), this;
    const v = this.size + (f ? 0 : 1);
    m < 0 && g++;
    const x = [...qn(this, xn)];
    let y, C = !1;
    for (let w = g; w < v; w++)
      if (g === w) {
        let A = x[w];
        x[w] === a && (A = x[w + 1]), f && this.delete(a), y = this.get(A), this.set(a, c);
      } else {
        !C && x[w - 1] === a && (C = !0);
        const A = x[C ? w : w - 1], O = y;
        y = this.get(A), this.delete(A), this.set(A, O);
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
}, xn = new WeakMap(), kn(Tl, "OrderedDict"), Tl);
function Xc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = C0(n, o);
  return r === -1 ? void 0 : n[r];
}
kn(Xc, "at");
function C0(n, o) {
  const r = n.length, a = Ph(o), c = a >= 0 ? a : r + a;
  return c < 0 || c >= r ? -1 : c;
}
kn(C0, "toSafeIndex");
function Ph(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
kn(Ph, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function lw(n) {
  const o = n + "CollectionProvider", [r, a] = /* @__PURE__ */ Ui(o), [c, f] = r(
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
    const { scope: N, children: I, state: q } = _, Y = b.useRef(null), [L, X] = b.useState(
      null
    ), te = Kn(Y, X), [se, fe] = q;
    return b.useEffect(() => {
      if (!L) return;
      const le = _0(() => {
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
        scope: N,
        itemMap: se,
        setItemMap: fe,
        collectionRef: te,
        collectionRefObject: Y,
        collectionElement: L,
        children: I
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", v = /* @__PURE__ */ pr(h), x = b.forwardRef(
    (_, N) => {
      const { scope: I, children: q } = _, Y = f(h, I), L = Kn(N, Y.collectionRef);
      return /* @__PURE__ */ S.jsx(v, { ref: L, children: q });
    }
  );
  x.displayName = h;
  const y = n + "CollectionItemSlot", C = "data-radix-collection-item", w = /* @__PURE__ */ pr(y), A = b.forwardRef(
    (_, N) => {
      const { scope: I, children: q, ...Y } = _, L = b.useRef(null), [X, te] = b.useState(null), se = Kn(N, L, te), fe = f(y, I), { setItemMap: le } = fe, he = b.useRef(Y);
      R0(he.current, Y) || (he.current = Y);
      const be = he.current;
      return b.useEffect(() => {
        const V = be;
        return le((H) => X ? H.has(X) ? H.set(X, { ...V, element: X }).toSorted(xh) : (H.set(X, { ...V, element: X }), H.toSorted(xh)) : H), () => {
          le((H) => !X || !H.has(X) ? H : (H.delete(X), new Hd(H)));
        };
      }, [X, be, le]), /* @__PURE__ */ S.jsx(w, { [C]: "", ref: se, children: q });
    }
  );
  A.displayName = y;
  function O() {
    return b.useState(new Hd());
  }
  kn(O, "useInitCollection");
  function M(_) {
    const { itemMap: N } = f(n + "CollectionConsumer", _);
    return N;
  }
  return kn(M, "useCollection"), [
    { Provider: d, Slot: x, ItemSlot: A },
    {
      createCollectionScope: a,
      useCollection: M,
      useInitCollection: O
    }
  ];
}
kn(lw, "createCollection");
function R0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), a = Object.keys(o);
  if (r.length !== a.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
kn(R0, "shallowEqual");
function w0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
kn(w0, "isElementPreceding");
function xh(n, o) {
  return !n[1].element || !o[1].element ? 0 : w0(n[1].element, o[1].element) ? -1 : 1;
}
kn(xh, "sortByDocumentPosition");
function _0(n) {
  return new MutationObserver((r) => {
    for (const a of r)
      if (a.type === "childList") {
        n();
        return;
      }
  });
}
kn(_0, "getChildListObserver");
var ow = Object.defineProperty, ga = (n, o) => ow(n, "name", { value: o, configurable: !0 }), A0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Xn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ ga(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
ga(Xn, "composeEventHandlers");
function iw(n) {
  if (!A0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
ga(iw, "getOwnerWindow");
function Sh(n) {
  if (!A0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
ga(Sh, "getOwnerDocument");
function M0(n, o = !1) {
  const { activeElement: r } = Sh(n);
  if (!r?.nodeName)
    return null;
  if (T0(r) && r.contentDocument)
    return M0(r.contentDocument.body, o);
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
ga(M0, "getActiveElement");
function T0(n) {
  return n.tagName === "IFRAME";
}
ga(T0, "isFrame");
var zi = globalThis?.document ? b.useLayoutEffect : () => {
}, rw = Object.defineProperty, aw = (n, o) => rw(n, "name", { value: o, configurable: !0 }), Vy = Er[" useEffectEvent ".trim().toString()], Iy = Er[" useInsertionEffect ".trim().toString()];
function O0(n) {
  if (typeof Vy == "function")
    return Vy(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Iy == "function" ? Iy(() => {
    o.current = n;
  }) : zi(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
aw(O0, "useEffectEvent");
var sw = Object.defineProperty, Es = (n, o) => sw(n, "name", { value: o, configurable: !0 }), cw = Er[" useInsertionEffect ".trim().toString()] || zi;
function Qo({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ Es(() => {
  }, "onChange"),
  caller: a
}) {
  const [c, f, d] = k0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, g = m ? n : c, h = b.useCallback(
    (v) => {
      if (m) {
        const x = N0(v) ? v(n) : v;
        x !== n && d.current?.(x);
      } else
        f(v);
    },
    [m, n, f, d]
  );
  return [g, h];
}
Es(Qo, "useControllableState");
function k0({
  defaultProp: n,
  onChange: o
}) {
  const [r, a] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return cw(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, a, f];
}
Es(k0, "useUncontrolledState");
function N0(n) {
  return typeof n == "function";
}
Es(N0, "isFunction");
var Hy = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function uw(n, o, r, a) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, g = c !== void 0, h = O0(d), v = [{ ...r, state: f }];
  a && v.push(a);
  const [x, y] = b.useReducer(
    (O, M) => {
      if (M.type === Hy)
        return { ...O, state: M.state };
      const T = n(O, M);
      return g && !Object.is(T.state, O.state) && h(T.state), T;
    },
    ...v
  ), C = x.state, w = b.useRef(C);
  b.useEffect(() => {
    w.current !== C && (w.current = C, g || h(C));
  }, [C, w, g]);
  const A = b.useMemo(() => c !== void 0 ? { ...x, state: c } : x, [x, c]);
  return b.useEffect(() => {
    g && !Object.is(c, x.state) && y({ type: Hy, state: c });
  }, [c, x.state, g]), [A, y];
}
Es(uw, "useControllableStateReducer");
var fw = Object.defineProperty, Fo = (n, o) => fw(n, "name", { value: o, configurable: !0 });
function z0(n, o) {
  return b.useReducer((r, a) => o[r][a] ?? r, n);
}
Fo(z0, "useStateMachine");
var dw = /* @__PURE__ */ Fo((n) => {
  const { present: o, children: r } = n, a = D0(o), c = typeof r == "function" ? r({ present: a.isPresent }) : b.Children.only(r), f = j0(a.ref, L0(c));
  return typeof r == "function" || a.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function D0(n) {
  const [o, r] = b.useState(), a = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [g, h] = z0(m, {
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
    const v = a.current, x = c.current;
    if (x !== n) {
      const C = f.current, w = oa(v);
      n ? (d.current = w, h("MOUNT")) : w === "none" || v?.display === "none" ? h("UNMOUNT") : h(x && C !== w ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), zi(() => {
    if (o) {
      let v;
      const x = o.ownerDocument.defaultView ?? window, y = /* @__PURE__ */ Fo((w) => {
        const O = oa(a.current).includes(CSS.escape(w.animationName));
        if (w.target === o && O && (h("ANIMATION_END"), !c.current)) {
          const M = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", v = x.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = M);
          });
        }
      }, "handleAnimationEnd"), C = /* @__PURE__ */ Fo((w) => {
        w.target === o && (f.current = oa(a.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", C), o.addEventListener("animationcancel", y), o.addEventListener("animationend", y), () => {
        x.clearTimeout(v), o.removeEventListener("animationstart", C), o.removeEventListener("animationcancel", y), o.removeEventListener("animationend", y);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((v) => {
      if (v) {
        const x = getComputedStyle(v);
        a.current = x, d.current = oa(x);
      } else
        a.current = null;
      r(v);
    }, [])
  };
}
Fo(D0, "usePresence");
function Eh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Fo(Eh, "setRef");
function j0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const a = o.current;
    let c = !1;
    const f = a.map((d) => {
      const m = Eh(d, r);
      return !c && typeof m == "function" && (c = !0), m;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const m = f[d];
          typeof m == "function" ? m() : Eh(a[d], null);
        }
      };
  }, []);
}
Fo(j0, "useStableComposedRefs");
function oa(n) {
  return n?.animationName || "none";
}
Fo(oa, "getAnimationName");
function L0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Fo(L0, "getElementRef");
var hw = Object.defineProperty, mw = (n, o) => hw(n, "name", { value: o, configurable: !0 }), pw = Er[" useId ".trim().toString()] || (() => {
}), gw = 0;
function cu(n) {
  const [o, r] = b.useState(pw());
  return zi(() => {
    n || r((a) => a ?? String(gw++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
mw(cu, "useId");
var bw = Object.defineProperty, Cs = (n, o) => bw(n, "name", { value: o, configurable: !0 }), Xh = "Collapsible", [yw, V0] = /* @__PURE__ */ Ui(Xh), [vw, Kh] = yw(Xh), xw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Cs(function(o, r) {
    const {
      __scopeCollapsible: a,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...g
    } = o, [h, v] = Qo({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: Xh
    });
    return /* @__PURE__ */ S.jsx(
      vw,
      {
        scope: a,
        disabled: d,
        contentId: cu(),
        open: h,
        onOpenToggle: b.useCallback(() => v((x) => !x), [v]),
        children: /* @__PURE__ */ S.jsx(
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
), Sw = "CollapsibleTrigger", I0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cs(function(o, r) {
    const { __scopeCollapsible: a, ...c } = o, f = Kh(Sw, a);
    return /* @__PURE__ */ S.jsx(
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
), H0 = "CollapsibleContent", U0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Cs(function(o, r) {
    const { forceMount: a, ...c } = o, f = Kh(H0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(dw, { present: a || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(Ew, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), Ew = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Cs(function(o, r) {
  const { __scopeCollapsible: a, present: c, children: f, ...d } = o, m = Kh(H0, a), [g, h] = b.useState(c), v = b.useRef(null), x = Kn(r, v), y = b.useRef(0), C = y.current, w = b.useRef(0), A = w.current, O = m.open || g, M = b.useRef(O), T = b.useRef(void 0);
  return b.useEffect(() => {
    const _ = requestAnimationFrame(() => M.current = !1);
    return () => cancelAnimationFrame(_);
  }, []), zi(() => {
    const _ = v.current;
    if (_) {
      T.current = T.current || {
        transitionDuration: _.style.transitionDuration,
        animationName: _.style.animationName
      }, _.style.transitionDuration = "0s", _.style.animationName = "none";
      const N = _.getBoundingClientRect();
      y.current = N.height, w.current = N.width, M.current || (_.style.transitionDuration = T.current.transitionDuration, _.style.animationName = T.current.animationName), h(c);
    }
  }, [m.open, c]), /* @__PURE__ */ S.jsx(
    Un.div,
    {
      "data-state": uu(m.open),
      "data-disabled": m.disabled ? "" : void 0,
      id: m.contentId,
      hidden: !O,
      ...d,
      ref: x,
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
var B0 = xw, Cw = I0, Rw = U0, ww = Object.defineProperty, _w = (n, o) => ww(n, "name", { value: o, configurable: !0 }), Aw = b.createContext(void 0);
function Rs(n) {
  const o = b.useContext(Aw);
  return n || o || "ltr";
}
_w(Rs, "useDirection");
var Mw = Object.defineProperty, kl = (n, o) => Mw(n, "name", { value: o, configurable: !0 }), Co = "Accordion", Tw = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Fh, Ow, kw] = /* @__PURE__ */ su(Co), [fu, eN] = /* @__PURE__ */ Ui(Co, [
  kw,
  V0
]), Qh = V0(), Nw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ kl(function(o, r) {
    const { type: a, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(Fh.Provider, { scope: o.__scopeAccordion, children: a === "multiple" ? /* @__PURE__ */ S.jsx(Lw, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(jw, { ...f, ref: r }) });
  }, "Accordion")
), [G0, zw] = fu(Co), [Y0, Dw] = fu(
  Co,
  { collapsible: !1 }
), jw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ kl(function(o, r) {
    const {
      value: a,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ kl(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [g, h] = Qo({
      prop: a,
      defaultProp: c ?? "",
      onChange: f,
      caller: Co
    });
    return /* @__PURE__ */ S.jsx(
      G0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ S.jsx(Y0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(q0, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), Lw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ kl(function(o, r) {
  const {
    value: a,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ kl(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Qo({
    prop: a,
    defaultProp: c ?? [],
    onChange: f,
    caller: Co
  }), h = b.useCallback(
    (x) => g((y = []) => [...y, x]),
    [g]
  ), v = b.useCallback(
    (x) => g((y = []) => y.filter((C) => C !== x)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    G0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: v,
      children: /* @__PURE__ */ S.jsx(Y0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(q0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [Vw, du] = fu(Co), q0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ kl(function(o, r) {
    const { __scopeAccordion: a, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, g = b.useRef(null), h = Kn(g, r), v = Ow(a), y = Rs(f) === "ltr", C = Xn(o.onKeyDown, (w) => {
      if (!Tw.includes(w.key)) return;
      const A = w.target, O = v().filter((X) => !X.ref.current?.disabled), M = O.findIndex((X) => X.ref.current === A), T = O.length;
      if (M === -1) return;
      w.preventDefault();
      let _ = M;
      const N = 0, I = T - 1, q = /* @__PURE__ */ kl(() => {
        _ = M + 1, _ > I && (_ = N);
      }, "moveNext"), Y = /* @__PURE__ */ kl(() => {
        _ = M - 1, _ < N && (_ = I);
      }, "movePrev");
      switch (w.key) {
        case "Home":
          _ = N;
          break;
        case "End":
          _ = I;
          break;
        case "ArrowRight":
          d === "horizontal" && (y ? q() : Y());
          break;
        case "ArrowDown":
          d === "vertical" && q();
          break;
        case "ArrowLeft":
          d === "horizontal" && (y ? Y() : q());
          break;
        case "ArrowUp":
          d === "vertical" && Y();
          break;
      }
      const L = _ % T;
      O[L].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      Vw,
      {
        scope: a,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(Fh.Slot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
), Ch = "AccordionItem", [Iw, Zh] = fu(Ch), Hw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ kl(function(o, r) {
    const { __scopeAccordion: a, value: c, ...f } = o, d = du(Ch, a), m = zw(Ch, a), g = Qh(a), h = cu(), v = c && m.value.includes(c) || !1, x = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      Iw,
      {
        scope: a,
        open: v,
        disabled: x,
        triggerId: h,
        children: /* @__PURE__ */ S.jsx(
          B0,
          {
            "data-orientation": d.orientation,
            "data-state": $h(v),
            ...g,
            ...f,
            ref: r,
            disabled: x,
            open: v,
            onOpenChange: (y) => {
              y ? m.onItemOpen(c) : m.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), Uw = "AccordionHeader", Bw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ kl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Zh(Uw, a);
    return /* @__PURE__ */ S.jsx(
      Un.h3,
      {
        "data-orientation": f.orientation,
        "data-state": $h(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        ...c,
        ref: r
      }
    );
  }, "AccordionHeader")
), Uy = "AccordionTrigger", Gw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ kl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Zh(Uy, a), m = Dw(Uy, a), g = Qh(a);
    return /* @__PURE__ */ S.jsx(Fh.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
      Cw,
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
), Yw = "AccordionContent", qw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ kl(function(o, r) {
    const { __scopeAccordion: a, ...c } = o, f = du(Co, a), d = Zh(Yw, a), m = Qh(a);
    return /* @__PURE__ */ S.jsx(
      Rw,
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
function $h(n) {
  return n ? "open" : "closed";
}
kl($h, "getState");
var Pw = Nw, Xw = Hw, Kw = Bw, Fw = Gw, Qw = qw, Zw = Object.defineProperty, $w = (n, o) => Zw(n, "name", { value: o, configurable: !0 });
function P0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
$w(P0, "useCallbackRef");
var Jw = Object.defineProperty, Ww = (n, o) => Jw(n, "name", { value: o, configurable: !0 });
function X0(n) {
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
Ww(X0, "useSize");
const fa = Math.min, Xo = Math.max, Jc = Math.round, dr = Math.floor, Ko = (n) => ({
  x: n,
  y: n
}), e_ = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function K0(n, o, r) {
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
function Jh(n) {
  return n === "x" ? "y" : "x";
}
function Wh(n) {
  return n === "y" ? "height" : "width";
}
function Ql(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function em(n) {
  return Jh(Ql(n));
}
function t_(n, o, r) {
  r === void 0 && (r = !1);
  const a = Bi(n), c = em(n), f = Wh(c);
  let d = c === "x" ? a === (r ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = Wc(d)), [d, Wc(d)];
}
function n_(n) {
  const o = Wc(n);
  return [Rh(n), o, Rh(o)];
}
function Rh(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const By = ["left", "right"], Gy = ["right", "left"], l_ = ["top", "bottom"], o_ = ["bottom", "top"];
function i_(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? Gy : By : o ? By : Gy;
    case "left":
    case "right":
      return o ? l_ : o_;
    default:
      return [];
  }
}
function r_(n, o, r, a) {
  const c = Bi(n);
  let f = i_(Zl(n), r === "start", a);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(Rh)))), f;
}
function Wc(n) {
  const o = Zl(n);
  return e_[o] + n.slice(o.length);
}
function a_(n) {
  var o, r, a, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (a = n.bottom) != null ? a : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function F0(n) {
  return typeof n != "number" ? a_(n) : {
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
function Yy(n, o, r) {
  let {
    reference: a,
    floating: c
  } = n;
  const f = Ql(o), d = em(o), m = Wh(d), g = Zl(o), h = f === "y", v = a.x + a.width / 2 - c.width / 2, x = a.y + a.height / 2 - c.height / 2, y = a[m] / 2 - c[m] / 2;
  let C;
  switch (g) {
    case "top":
      C = {
        x: v,
        y: a.y - c.height
      };
      break;
    case "bottom":
      C = {
        x: v,
        y: a.y + a.height
      };
      break;
    case "right":
      C = {
        x: a.x + a.width,
        y: x
      };
      break;
    case "left":
      C = {
        x: a.x - c.width,
        y: x
      };
      break;
    default:
      C = {
        x: a.x,
        y: a.y
      };
  }
  const w = Bi(o);
  return w && (C[d] += y * (w === "end" ? 1 : -1) * (r && h ? -1 : 1)), C;
}
async function s_(n, o) {
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
    rootBoundary: v = "viewport",
    elementContext: x = "floating",
    altBoundary: y = !1,
    padding: C = 0
  } = Di(o, n), w = F0(C), O = m[y ? x === "floating" ? "reference" : "floating" : x], M = eu(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(O))) == null || r ? O : O.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: v,
    strategy: g
  })), T = x === "floating" ? {
    x: a,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, _ = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), N = await (f.isElement == null ? void 0 : f.isElement(_)) && await (f.getScale == null ? void 0 : f.getScale(_)) || {
    x: 1,
    y: 1
  }, I = eu(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: T,
    offsetParent: _,
    strategy: g
  }) : T);
  return {
    top: (M.top - I.top + w.top) / N.y,
    bottom: (I.bottom - M.bottom + w.bottom) / N.y,
    left: (M.left - I.left + w.left) / N.x,
    right: (I.right - M.right + w.right) / N.x
  };
}
const c_ = 50, u_ = async (n, o, r) => {
  const {
    placement: a = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, m = d.detectOverflow ? d : {
    ...d,
    detectOverflow: s_
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: v,
    y: x
  } = Yy(h, a, g), y = a, C = 0;
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
      y: N,
      data: I,
      reset: q
    } = await T({
      x: v,
      y: x,
      initialPlacement: a,
      placement: y,
      strategy: c,
      middlewareData: w,
      rects: h,
      platform: m,
      elements: {
        reference: n,
        floating: o
      }
    });
    v = _ ?? v, x = N ?? x, w[M] = {
      ...w[M],
      ...I
    }, q && C < c_ && (C++, typeof q == "object" && (q.placement && (y = q.placement), q.rects && (h = q.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : q.rects), {
      x: v,
      y: x
    } = Yy(h, y, g)), A = -1);
  }
  return {
    x: v,
    y: x,
    placement: y,
    strategy: c,
    middlewareData: w
  };
}, f_ = function(n) {
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
        mainAxis: v = !0,
        crossAxis: x = !0,
        fallbackPlacements: y,
        fallbackStrategy: C = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: A = !0,
        ...O
      } = Di(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const M = Zl(c), T = Ql(m), _ = Zl(m) === m, N = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), I = y || (_ || !A ? [Wc(m)] : n_(m)), q = w !== "none";
      !y && q && I.push(...r_(m, A, w, N));
      const Y = [m, ...I], L = await g.detectOverflow(o, O), X = [];
      let te = ((a = f.flip) == null ? void 0 : a.overflows) || [];
      if (v && X.push(L[M]), x) {
        const he = t_(c, d, N);
        X.push(L[he[0]], L[he[1]]);
      }
      if (te = [...te, {
        placement: c,
        overflows: X
      }], !X.every((he) => he <= 0)) {
        var se, fe;
        const he = (((se = f.flip) == null ? void 0 : se.index) || 0) + 1, be = Y[he];
        if (be && (!(x === "alignment" ? T !== Ql(be) : !1) || // We leave the current main axis only if every placement on that axis
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
}, Q0 = /* @__PURE__ */ new Set(["left", "top"]);
async function d_(n, o) {
  const {
    placement: r,
    platform: a,
    elements: c
  } = n, f = await (a.isRTL == null ? void 0 : a.isRTL(c.floating)), d = Zl(r), m = Bi(r), g = Ql(r) === "y", h = Q0.has(d) ? -1 : 1, v = f && g ? -1 : 1, x = Di(o, n);
  let {
    mainAxis: y,
    crossAxis: C,
    alignmentAxis: w
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return m && typeof w == "number" && (C = m === "end" ? w * -1 : w), g ? {
    x: C * v,
    y: y * h
  } : {
    x: y * h,
    y: C * v
  };
}
const h_ = function(n) {
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
      } = o, g = await d_(o, n);
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
}, m_ = function(n) {
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
      } = Di(n, o), v = {
        x: r,
        y: a
      }, x = await f.detectOverflow(o, h), y = Ql(c), C = Jh(y);
      let w = v[C], A = v[y];
      const O = (T, _) => K0(_ + x[T === "y" ? "top" : "left"], _, _ - x[T === "y" ? "bottom" : "right"]);
      d && (w = O(C, w)), m && (A = O(y, A));
      const M = g.fn({
        ...o,
        [C]: w,
        [y]: A
      });
      return {
        ...M,
        data: {
          x: M.x - r,
          y: M.y - a,
          enabled: {
            [C]: d,
            [y]: m
          }
        }
      };
    }
  };
}, p_ = function(n) {
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
        mainAxis: v = !0,
        crossAxis: x = !0
      } = Di(n, o), y = {
        x: c,
        y: f
      }, C = Ql(d), w = Jh(C);
      let A = y[w], O = y[C];
      const M = Di(h, o), T = typeof M == "number" ? {
        mainAxis: M,
        crossAxis: 0
      } : {
        mainAxis: (r = M.mainAxis) != null ? r : 0,
        crossAxis: (a = M.crossAxis) != null ? a : 0
      };
      if (v) {
        const I = w === "y" ? "height" : "width", q = m.reference[w] - m.floating[I] + T.mainAxis, Y = m.reference[w] + m.reference[I] - T.mainAxis;
        A < q ? A = q : A > Y && (A = Y);
      }
      if (x) {
        var _, N;
        const I = w === "y" ? "width" : "height", q = Q0.has(Zl(d)), Y = m.reference[C] - m.floating[I] + (q && ((_ = g.offset) == null ? void 0 : _[C]) || 0) + (q ? 0 : T.crossAxis), L = m.reference[C] + m.reference[I] + (q ? 0 : ((N = g.offset) == null ? void 0 : N[C]) || 0) - (q ? T.crossAxis : 0);
        O < Y ? O = Y : O > L && (O = L);
      }
      return {
        [w]: A,
        [C]: O
      };
    }
  };
}, g_ = function(n) {
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
      } = Di(n, o), g = await c.detectOverflow(o, m), h = Zl(r), v = Bi(r), x = Ql(r) === "y", {
        width: y,
        height: C
      } = a.floating;
      let w, A;
      h === "top" || h === "bottom" ? (w = h, A = v === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (A = h, w = v === "end" ? "top" : "bottom");
      const O = C - g.top - g.bottom, M = y - g.left - g.right, T = fa(C - g[w], O), _ = fa(y - g[A], M), N = o.middlewareData.shift, I = !N;
      let q = T, Y = _;
      N != null && N.enabled.x && (Y = M), N != null && N.enabled.y && (q = O), I && !v && (x ? Y = y - 2 * Xo(g.left, g.right) : q = C - 2 * Xo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: Y,
        availableHeight: q
      });
      const L = await c.getDimensions(f.floating);
      return y !== L.width || C !== L.height ? {
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
  return tm(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function hn(n) {
  var o;
  return (n == null || (o = n.ownerDocument) == null ? void 0 : o.defaultView) || window;
}
function Zo(n) {
  var o;
  return (o = (tm(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : o.documentElement;
}
function tm(n) {
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
function b_(n) {
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
const y_ = /transform|translate|scale|rotate|perspective|filter/, v_ = /paint|layout|strict|content/, ur = (n) => !!n && n !== "none";
let Ud;
function nm(n) {
  const o = dn(n) ? yl(n) : n;
  return ur(o.transform) || ur(o.translate) || ur(o.scale) || ur(o.rotate) || ur(o.perspective) || !lm() && (ur(o.backdropFilter) || ur(o.filter)) || y_.test(o.willChange || "") || v_.test(o.contain || "");
}
function x_(n) {
  let o = ji(n);
  for (; Kt(o) && !ki(o); ) {
    if (nm(o))
      return o;
    if (mu(o))
      return null;
    o = ji(o);
  }
  return null;
}
function lm() {
  return Ud == null && (Ud = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Ud;
}
function ki(n) {
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
function Z0(n) {
  const o = ji(n);
  return ki(o) ? (n.ownerDocument || n).body : Kt(o) && ws(o) ? o : Z0(o);
}
function ha(n, o, r) {
  var a;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = Z0(n), f = c === ((a = n.ownerDocument) == null ? void 0 : a.body), d = hn(c);
  if (f) {
    const m = wh(d);
    return o.concat(d, d.visualViewport || [], ws(c) ? c : [], m && r ? ha(m) : []);
  } else
    return o.concat(c, ha(c, [], r));
}
function wh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function $0(n) {
  const o = yl(n);
  let r = parseFloat(o.width) || 0, a = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : a, m = Jc(r) !== f || Jc(a) !== d;
  return m && (r = f, a = d), {
    width: r,
    height: a,
    $: m
  };
}
function om(n) {
  return dn(n) ? n : n.contextElement;
}
function aa(n) {
  const o = om(n);
  if (!Kt(o))
    return Ko(1);
  const r = o.getBoundingClientRect(), {
    width: a,
    height: c,
    $: f
  } = $0(o);
  let d = (f ? Jc(r.width) : r.width) / a, m = (f ? Jc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const S_ = /* @__PURE__ */ Ko(0);
function J0(n) {
  const o = hn(n);
  return !lm() || !o.visualViewport ? S_ : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function E_(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === hn(n);
}
function gr(n, o, r, a) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = om(n);
  let d = Ko(1);
  o && (a ? dn(a) && (d = aa(a)) : d = aa(n));
  const m = E_(f, r, a) ? J0(f) : Ko(0);
  let g = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, v = c.width / d.x, x = c.height / d.y;
  if (f && a) {
    const y = hn(f), C = dn(a) ? hn(a) : a;
    let w = y, A = wh(w);
    for (; A && C !== w; ) {
      const O = aa(A), M = A.getBoundingClientRect(), T = yl(A), _ = M.left + (A.clientLeft + parseFloat(T.paddingLeft)) * O.x, N = M.top + (A.clientTop + parseFloat(T.paddingTop)) * O.y;
      g *= O.x, h *= O.y, v *= O.x, x *= O.y, g += _, h += N, w = hn(A), A = wh(w);
    }
  }
  return eu({
    width: v,
    height: x,
    x: g,
    y: h
  });
}
function gu(n, o) {
  const r = pu(n).scrollLeft;
  return o ? o.left + r : gr(Zo(n)).left + r;
}
function W0(n, o) {
  const r = n.getBoundingClientRect(), a = r.left + o.scrollLeft - gu(n, r), c = r.top + o.scrollTop;
  return {
    x: a,
    y: c
  };
}
function C_(n) {
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
  const v = Ko(0), x = Kt(a);
  if ((x || !f) && ((Bn(a) !== "body" || ws(d)) && (g = pu(a)), x)) {
    const C = gr(a);
    h = aa(a), v.x = C.x + a.clientLeft, v.y = C.y + a.clientTop;
  }
  const y = d && !x && !f ? W0(d, g) : Ko(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + v.x + y.x,
    y: r.y * h.y - g.scrollTop * h.y + v.y + y.y
  };
}
function R_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function w_(n) {
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
const __ = 25;
function A_(n, o, r) {
  r === void 0 && (r = "viewport");
  const a = r === "layoutViewport", c = hn(n), f = Zo(n), d = c.visualViewport;
  let m = f.clientWidth, g = f.clientHeight, h = 0, v = 0;
  if (d) {
    const y = !lm() || o === "fixed";
    a ? y || (h = -d.offsetLeft, v = -d.offsetTop) : (m = d.width, g = d.height, y && (h = d.offsetLeft, v = d.offsetTop));
  }
  if (gu(f) <= 0) {
    const y = f.ownerDocument, C = y.body, w = getComputedStyle(C), A = y.compatMode === "CSS1Compat" && parseFloat(w.marginLeft) + parseFloat(w.marginRight) || 0, O = Math.abs(f.clientWidth - C.clientWidth - A), M = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? O / 2 : O;
    M <= __ && (m -= M);
  }
  return {
    width: m,
    height: g,
    x: h,
    y: v
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
function qy(n, o, r) {
  let a;
  if (o === "viewport" || o === "layoutViewport")
    a = A_(n, r, o);
  else if (o === "document")
    a = w_(Zo(n));
  else if (dn(o))
    a = M_(o, r);
  else {
    const c = J0(n);
    a = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return eu(a);
}
function T_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let a = ha(n, [], !1).filter((m) => dn(m) && Bn(m) !== "body"), c = null;
  const f = yl(n).position === "fixed";
  let d = f ? ji(n) : n;
  for (; dn(d) && !ki(d); ) {
    const m = yl(d), g = nm(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && m.position === "static") ? a = a.filter((x) => x !== d) : c = m, d = ji(d);
  }
  return o.set(n, a), a;
}
function O_(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: a,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? mu(o) ? [] : T_(o, this._c) : [].concat(r), a], m = qy(o, d[0], c);
  let g = m.top, h = m.right, v = m.bottom, x = m.left;
  for (let y = 1; y < d.length; y++) {
    const C = qy(o, d[y], c);
    g = Xo(C.top, g), h = fa(C.right, h), v = fa(C.bottom, v), x = Xo(C.left, x);
  }
  return {
    width: h - x,
    height: v - g,
    x,
    y: g
  };
}
function k_(n) {
  const {
    width: o,
    height: r
  } = $0(n);
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
    const y = gr(o, !0, f, o);
    g.x = y.x + o.clientLeft, g.y = y.y + o.clientTop;
  }
  !a && c && (g.x = gu(c));
  const h = c && !a && !f ? W0(c, m) : Ko(0), v = d.left + m.scrollLeft - g.x - h.x, x = d.top + m.scrollTop - g.y - h.y;
  return {
    x: v,
    y: x,
    width: d.width,
    height: d.height
  };
}
function Bd(n) {
  return yl(n).position === "static";
}
function Py(n, o) {
  if (!Kt(n) || yl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Zo(n) === r && (r = r.ownerDocument.body), r;
}
function ex(n, o) {
  const r = hn(n);
  if (mu(n))
    return r;
  if (!Kt(n)) {
    let c = ji(n);
    for (; c && !ki(c); ) {
      if (dn(c) && !Bd(c))
        return c;
      c = ji(c);
    }
    return r;
  }
  let a = Py(n, o);
  for (; a && b_(a) && Bd(a); )
    a = Py(a, o);
  return a && ki(a) && Bd(a) && !nm(a) ? r : a || x_(n) || r;
}
const z_ = async function(n) {
  const o = this.getOffsetParent || ex, r = this.getDimensions, a = await r(n.floating);
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
function D_(n) {
  return yl(n).direction === "rtl";
}
const j_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: C_,
  getDocumentElement: Zo,
  getClippingRect: O_,
  getOffsetParent: ex,
  getElementRects: z_,
  getClientRects: R_,
  getDimensions: k_,
  getScale: aa,
  isElement: dn,
  isRTL: D_
};
function tx(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function L_(n, o, r) {
  let a = null, c;
  const f = Zo(n);
  function d() {
    var v;
    clearTimeout(c), (v = a) == null || v.disconnect(), a = null;
  }
  function m(v, x) {
    v === void 0 && (v = !1), x === void 0 && (x = 1), d();
    const y = n.getBoundingClientRect(), {
      left: C,
      top: w,
      width: A,
      height: O
    } = y;
    if (v || o(), !A || !O)
      return;
    const M = dr(w), T = dr(f.clientWidth - (C + A)), _ = dr(f.clientHeight - (w + O)), N = dr(C), q = {
      rootMargin: -M + "px " + -T + "px " + -_ + "px " + -N + "px",
      threshold: Xo(0, fa(1, x)) || 1
    };
    let Y = !0;
    function L(X) {
      const te = X[0].intersectionRatio;
      if (!tx(y, n.getBoundingClientRect()))
        return m();
      if (te !== x) {
        if (!Y)
          return m();
        te ? m(!1, te) : c = setTimeout(() => {
          m(!1, 1e-7);
        }, 1e3);
      }
      Y = !1;
    }
    try {
      a = new IntersectionObserver(L, {
        ...q,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      a = new IntersectionObserver(L, q);
    }
    a.observe(n);
  }
  const g = hn(n), h = () => m(r);
  return g.addEventListener("resize", h), m(!0), () => {
    g.removeEventListener("resize", h), d();
  };
}
function Xy(n, o, r, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = a, h = om(n), v = c || f ? [...h ? ha(h) : [], ...o ? ha(o) : []] : [];
  v.forEach((M) => {
    c && M.addEventListener("scroll", r), f && M.addEventListener("resize", r);
  });
  const x = h && m ? L_(h, r, f) : null;
  let y = -1, C = null;
  d && (C = new ResizeObserver((M) => {
    let [T] = M;
    T && T.target === h && C && o && (C.unobserve(o), cancelAnimationFrame(y), y = requestAnimationFrame(() => {
      var _;
      (_ = C) == null || _.observe(o);
    })), r();
  }), h && !g && C.observe(h), o && C.observe(o));
  let w, A = g ? gr(n) : null;
  g && O();
  function O() {
    const M = gr(n);
    A && !tx(A, M) && r(), A = M, w = requestAnimationFrame(O);
  }
  return r(), () => {
    var M;
    v.forEach((T) => {
      c && T.removeEventListener("scroll", r), f && T.removeEventListener("resize", r);
    }), x?.(), (M = C) == null || M.disconnect(), C = null, g && cancelAnimationFrame(w);
  };
}
const V_ = h_, I_ = m_, H_ = f_, U_ = g_, B_ = p_, G_ = (n, o, r) => {
  const a = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...j_,
    ...c.platform,
    _c: a
  };
  return u_(n, o, {
    ...c,
    platform: f
  });
};
var Y_ = typeof document < "u", q_ = function() {
}, Kc = Y_ ? b.useLayoutEffect : q_;
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
function nx(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ky(n, o) {
  const r = nx(n);
  return Math.round(o * r) / r;
}
function Gd(n) {
  const o = b.useRef(n);
  return Kc(() => {
    o.current = n;
  }), o;
}
function P_(n) {
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
  } = n, [v, x] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [y, C] = b.useState(a);
  tu(y, a) || C(a);
  const [w, A] = b.useState(null), [O, M] = b.useState(null), T = b.useCallback((F) => {
    F !== q.current && (q.current = F, A(F));
  }, []), _ = b.useCallback((F) => {
    F !== Y.current && (Y.current = F, M(F));
  }, []), N = f || w, I = d || O, q = b.useRef(null), Y = b.useRef(null), L = b.useRef(v), X = g != null, te = Gd(g), se = Gd(c), fe = Gd(h), le = b.useCallback(() => {
    if (!q.current || !Y.current)
      return;
    const F = {
      placement: o,
      strategy: r,
      middleware: y
    };
    se.current && (F.platform = se.current), G_(q.current, Y.current, F).then((ve) => {
      const ae = {
        ...ve,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: fe.current !== !1
      };
      he.current && !tu(L.current, ae) && (L.current = ae, pa.flushSync(() => {
        x(ae);
      }));
    });
  }, [y, o, r, se, fe]);
  Kc(() => {
    h === !1 && L.current.isPositioned && (L.current.isPositioned = !1, x((F) => ({
      ...F,
      isPositioned: !1
    })));
  }, [h]);
  const he = b.useRef(!1);
  Kc(() => (he.current = !0, () => {
    he.current = !1;
  }), []), Kc(() => {
    if (N && (q.current = N), I && (Y.current = I), N && I) {
      if (te.current)
        return te.current(N, I, le);
      le();
    }
  }, [N, I, le, te, X]);
  const be = b.useMemo(() => ({
    reference: q,
    floating: Y,
    setReference: T,
    setFloating: _
  }), [T, _]), V = b.useMemo(() => ({
    reference: N,
    floating: I
  }), [N, I]), H = b.useMemo(() => {
    const F = {
      position: r,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return F;
    const ve = Ky(V.floating, v.x), ae = Ky(V.floating, v.y);
    return m ? {
      ...F,
      transform: "translate(" + ve + "px, " + ae + "px)",
      ...nx(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ve,
      top: ae
    };
  }, [r, m, V.floating, v.x, v.y]);
  return b.useMemo(() => ({
    ...v,
    update: le,
    refs: be,
    elements: V,
    floatingStyles: H
  }), [v, le, be, V, H]);
}
const X_ = (n, o) => {
  const r = V_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, K_ = (n, o) => {
  const r = I_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, F_ = (n, o) => ({
  fn: B_(n).fn,
  options: [n, o]
}), Q_ = (n, o) => {
  const r = H_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, Z_ = (n, o) => {
  const r = U_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var $_ = Object.defineProperty, im = (n, o) => $_(n, "name", { value: o, configurable: !0 }), Yd = !1;
function lx() {
  const [n, o] = b.useState(Yd);
  return b.useEffect(() => {
    Yd || (Yd = !0, o(!0));
  }, []), n;
}
im(lx, "useIsHydrated");
var ox = Er[" useSyncExternalStore ".trim().toString()];
function ix() {
  return () => {
  };
}
im(ix, "subscribe");
function rx() {
  return ox(
    ix,
    () => !0,
    () => !1
  );
}
im(rx, "useIsHydratedModern");
var J_ = typeof ox == "function" ? rx : lx, W_ = Object.defineProperty, Rr = (n, o) => W_(n, "name", { value: o, configurable: !0 }), qd = "rovingFocusGroup.onEntryFocus", eA = { bubbles: !1, cancelable: !0 }, bu = "RovingFocusGroup", [_h, ax, tA] = /* @__PURE__ */ su(bu), [nA, sx] = /* @__PURE__ */ Ui(
  bu,
  [tA]
), [lA, oA] = nA(bu), iA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rr(function(o, r) {
    return /* @__PURE__ */ S.jsx(_h.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(_h.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(rA, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), rA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Rr(function(o, r) {
  const {
    __scopeRovingFocusGroup: a,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: m,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: h,
    onEntryFocus: v,
    preventScrollOnEntryFocus: x = !1,
    ...y
  } = o, C = b.useRef(null), w = Kn(r, C), A = Rs(d), [O, M] = Qo({
    prop: m,
    defaultProp: g ?? null,
    onChange: h,
    caller: bu
  }), [T, _] = b.useState(!1), N = P0(v), I = ax(a), q = b.useRef(!1), [Y, L] = b.useState(0);
  return b.useEffect(() => {
    const X = C.current;
    if (X)
      return X.addEventListener(qd, N), () => X.removeEventListener(qd, N);
  }, [N]), /* @__PURE__ */ S.jsx(
    lA,
    {
      scope: a,
      orientation: c,
      dir: A,
      loop: f,
      currentTabStopId: O,
      onItemFocus: b.useCallback(
        (X) => M(X),
        [M]
      ),
      onItemShiftTab: b.useCallback(() => _(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => L((X) => X + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => L((X) => X - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        Un.div,
        {
          tabIndex: T || Y === 0 ? -1 : 0,
          "data-orientation": c,
          ...y,
          ref: w,
          style: { outline: "none", ...o.style },
          onMouseDown: Xn(o.onMouseDown, () => {
            q.current = !0;
          }),
          onFocus: Xn(o.onFocus, (X) => {
            const te = !q.current;
            if (X.target === X.currentTarget && te && !T) {
              const se = new CustomEvent(qd, eA);
              if (X.currentTarget.dispatchEvent(se), !se.defaultPrevented) {
                const fe = I().filter((H) => H.focusable), le = fe.find((H) => H.active), he = fe.find((H) => H.id === O), V = [le, he, ...fe].filter(
                  Boolean
                ).map((H) => H.ref.current);
                rm(V, x);
              }
            }
            q.current = !1;
          }),
          onBlur: Xn(o.onBlur, () => _(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), aA = "RovingFocusGroupItem", sA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Rr(function(o, r) {
    const {
      __scopeRovingFocusGroup: a,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...g
    } = o, h = cu(), v = d || h, x = oA(aA, a), y = x.currentTabStopId === v, C = ax(a), { onFocusableItemAdd: w, onFocusableItemRemove: A, currentTabStopId: O } = x, M = J_();
    return zi(() => {
      if (!(!M || !c))
        return w(), () => A();
    }, [M, c, w, A]), b.useEffect(() => {
      if (!(M || !c))
        return w(), () => A();
    }, [M, c, w, A]), /* @__PURE__ */ S.jsx(
      _h.ItemSlot,
      {
        scope: a,
        id: v,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ S.jsx(
          Un.span,
          {
            tabIndex: y ? 0 : -1,
            "data-orientation": x.orientation,
            ...g,
            ref: r,
            onMouseDown: Xn(o.onMouseDown, (T) => {
              c ? x.onItemFocus(v) : T.preventDefault();
            }),
            onFocus: Xn(o.onFocus, () => x.onItemFocus(v)),
            onKeyDown: Xn(o.onKeyDown, (T) => {
              if (T.key === "Tab" && T.shiftKey) {
                x.onItemShiftTab();
                return;
              }
              if (T.target !== T.currentTarget) return;
              const _ = ux(T, x.orientation, x.dir);
              if (_ !== void 0) {
                if (T.metaKey || T.ctrlKey || T.altKey || T.shiftKey) return;
                T.preventDefault();
                let I = C().filter((q) => q.focusable).map((q) => q.ref.current);
                if (_ === "last") I.reverse();
                else if (_ === "prev" || _ === "next") {
                  _ === "prev" && I.reverse();
                  const q = I.indexOf(T.currentTarget);
                  I = x.loop ? fx(I, q + 1) : I.slice(q + 1);
                }
                setTimeout(() => rm(I));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: y, hasTabStop: O != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), cA = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function cx(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
Rr(cx, "getDirectionAwareKey");
function ux(n, o, r) {
  const a = cx(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return cA[a];
}
Rr(ux, "getFocusIntent");
function rm(n, o = !1) {
  const r = document.activeElement;
  for (const a of n)
    if (a === r || (a.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
Rr(rm, "focusFirst");
function fx(n, o) {
  return n.map((r, a) => n[(o + a) % n.length]);
}
Rr(fx, "wrapArray");
var uA = iA, fA = sA, dA = Object.defineProperty, hA = (n, o) => dA(n, "name", { value: o, configurable: !0 }), mA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ hA(function(o, r) {
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
), pA = mA, gA = Object.defineProperty, bA = (n, o) => gA(n, "name", { value: o, configurable: !0 });
function dx(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
bA(dx, "usePrevious");
var yA = Object.defineProperty, vA = (n, o) => yA(n, "name", { value: o, configurable: !0 });
function am(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
vA(am, "clamp");
var xA = Object.defineProperty, hx = (n, o) => xA(n, "name", { value: o, configurable: !0 }), Fy = "horizontal", SA = ["horizontal", "vertical"], EA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ hx(function(o, r) {
    const { decorative: a, orientation: c = Fy, ...f } = o, d = mx(c) ? c : Fy, g = a ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
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
function mx(n) {
  return SA.includes(n);
}
hx(mx, "isValidOrientation");
var CA = EA, RA = Object.defineProperty, Mt = (n, o) => RA(n, "name", { value: o, configurable: !0 }), px = ["PageUp", "PageDown"], gx = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], bx = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, _s = "Slider", [Ah, wA, _A] = /* @__PURE__ */ su(_s), [sm, tN] = /* @__PURE__ */ Ui(_s, [
  _A
]), [AA, As] = sm(_s), MA = /* @__PURE__ */ b.forwardRef(
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
      defaultValue: v = [c],
      value: x,
      onValueChange: y = /* @__PURE__ */ Mt(() => {
      }, "onValueChange"),
      onValueCommit: C = /* @__PURE__ */ Mt(() => {
      }, "onValueCommit"),
      inverted: w = !1,
      form: A,
      ...O
    } = o, M = b.useRef(/* @__PURE__ */ new Set()), T = b.useRef(0), _ = b.useRef(!1), I = m === "horizontal" ? TA : OA, [q, Y] = b.useState(null), L = Kn(r, Y), [X = [], te] = Qo({
      prop: x,
      defaultProp: v,
      onChange: /* @__PURE__ */ Mt((H) => {
        [...M.current][T.current]?.focus({
          preventScroll: !0,
          focusVisible: _.current
        }), _.current = !1, y(H);
      }, "onChange")
    }), se = b.useRef(X), fe = b.useRef(X);
    b.useEffect(() => {
      const H = A ? q?.ownerDocument.getElementById(A) : q?.closest("form");
      if (H instanceof HTMLFormElement) {
        const F = /* @__PURE__ */ Mt(() => te(fe.current), "reset");
        return H.addEventListener("reset", F), () => H.removeEventListener("reset", F);
      }
    }, [q, A, te]);
    function le(H) {
      const F = wx(X, H);
      V(H, F);
    }
    Mt(le, "handleSlideStart");
    function he(H) {
      V(H, T.current);
    }
    Mt(he, "handleSlideMove");
    function be() {
      String(X) !== String(se.current) && C(X);
    }
    Mt(be, "handleSlideEnd");
    function V(H, F, { commit: ve } = { commit: !1 }) {
      const ae = um(d), z = ds(Math.round((H - c) / d) * d + c, ae), K = am(z, [c, f]);
      te((ne = []) => {
        const oe = Cx(ne, K, F);
        if (Mx(oe, h * d)) {
          T.current = oe.indexOf(K);
          const pe = String(oe) !== String(ne);
          return pe && ve && C(oe), pe ? oe : ne;
        } else
          return ne;
      });
    }
    return Mt(V, "updateValues"), /* @__PURE__ */ S.jsx(
      AA,
      {
        scope: o.__scopeSlider,
        name: a,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: T,
        thumbs: M.current,
        values: X,
        orientation: m,
        form: A,
        children: /* @__PURE__ */ S.jsx(Ah.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(Ah.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          I,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...O,
            ref: L,
            onPointerDown: Xn(O.onPointerDown, () => {
              g || (se.current = X, _.current = !1);
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
              g || (_.current = !0, V(f, X.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: H, direction: F }) => {
              if (!g) {
                _.current = !0;
                const z = px.includes(H.key) || H.shiftKey && gx.includes(H.key) ? 10 : 1, K = T.current, ne = X[K], oe = Tx(ne, {
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
), [yx, vx] = sm(_s, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), TA = /* @__PURE__ */ b.forwardRef(
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
      onStepKeyDown: v,
      ...x
    } = o, [y, C] = b.useState(null), w = Kn(r, C), A = b.useRef(void 0), O = Rs(f), M = O === "ltr", T = M && !d || !M && d;
    function _(N) {
      const I = A.current || y.getBoundingClientRect(), q = [0, I.width], L = yu(q, T ? [a, c] : [c, a]);
      return A.current = I, L(N - I.left);
    }
    return Mt(_, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      yx,
      {
        scope: o.__scopeSlider,
        startEdge: T ? "left" : "right",
        endEdge: T ? "right" : "left",
        direction: T ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          xx,
          {
            dir: O,
            "data-orientation": "horizontal",
            ...x,
            ref: w,
            style: {
              ...x.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (N) => {
              const I = _(N.clientX);
              m?.(I);
            },
            onSlideMove: (N) => {
              const I = _(N.clientX);
              g?.(I);
            },
            onSlideEnd: () => {
              A.current = void 0, h?.();
            },
            onStepKeyDown: (N) => {
              const q = bx[T ? "from-left" : "from-right"].includes(N.key);
              v?.({ event: N, direction: q ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), OA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      min: a,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...v
    } = o, x = b.useRef(null), y = Kn(r, x), C = b.useRef(void 0), w = !f;
    function A(O) {
      const M = C.current || x.current.getBoundingClientRect(), T = [0, M.height], N = yu(T, w ? [c, a] : [a, c]);
      return C.current = M, N(O - M.top);
    }
    return Mt(A, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      yx,
      {
        scope: o.__scopeSlider,
        startEdge: w ? "bottom" : "top",
        endEdge: w ? "top" : "bottom",
        size: "height",
        direction: w ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          xx,
          {
            "data-orientation": "vertical",
            ...v,
            ref: y,
            style: {
              ...v.style,
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
              const T = bx[w ? "from-bottom" : "from-top"].includes(O.key);
              h?.({ event: O, direction: T ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), xx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      __scopeSlider: a,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...v
    } = o, x = As(_s, a);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        ...v,
        ref: r,
        onKeyDown: Xn(o.onKeyDown, (y) => {
          y.key === "Home" ? (m(y), y.preventDefault()) : y.key === "End" ? (g(y), y.preventDefault()) : px.concat(gx).includes(y.key) && (h(y), y.preventDefault());
        }),
        onPointerDown: Xn(o.onPointerDown, (y) => {
          const C = y.target;
          C.setPointerCapture(y.pointerId), y.preventDefault(), x.thumbs.has(C) ? C.focus({ preventScroll: !0, focusVisible: !1 }) : c(y);
        }),
        onPointerMove: Xn(o.onPointerMove, (y) => {
          y.target.hasPointerCapture(y.pointerId) && f(y);
        }),
        onPointerUp: Xn(o.onPointerUp, (y) => {
          const C = y.target;
          C.hasPointerCapture(y.pointerId) && (C.releasePointerCapture(y.pointerId), d(y));
        })
      }
    );
  }, "SliderImpl")
), kA = "SliderTrack", NA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = As(kA, a);
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
), Qy = "SliderRange", zA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = As(Qy, a), d = vx(Qy, a), m = b.useRef(null), g = Kn(r, m), h = f.values.length, v = f.values.map(
      (C) => cm(C, f.min, f.max)
    ), x = h > 1 ? Math.min(...v) : 0, y = 100 - Math.max(...v);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        "data-orientation": f.orientation,
        "data-disabled": f.disabled ? "" : void 0,
        ...c,
        ref: g,
        style: {
          ...o.style,
          [d.startEdge]: x + "%",
          [d.endEdge]: y + "%"
        }
      }
    );
  }, "SliderRange")
), DA = "SliderThumb", [jA, Sx] = sm(DA), LA = "SliderThumbProvider";
function Ex(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: a,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = As(LA, o), d = wA(o), [m, g] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((O) => O.ref.current === m) : -1,
    [d, m]
  ), v = X0(m), x = m ? !!f.form || !!m.closest("form") : !0, y = f.values[h], C = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), w = y === void 0 ? 0 : cm(y, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const A = {
    value: y,
    name: C,
    form: f.form,
    isFormControl: x,
    index: h,
    thumb: m,
    onThumbChange: g,
    percent: w,
    size: v
  };
  return /* @__PURE__ */ S.jsx(jA, { scope: o, ...A, children: Ox(c) ? c(A) : a });
}
Mt(Ex, "SliderThumbProvider");
var Pd = "SliderThumbTrigger", VA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, ...c } = o, f = As(Pd, a), d = vx(Pd, a), { index: m, value: g, percent: h, size: v, onThumbChange: x } = Sx(
      Pd,
      a
    ), y = Kn(r, x), C = Rx(m, f.values.length), w = v?.[d.size], A = w ? _x(w, h, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${A}px)`
        },
        children: /* @__PURE__ */ S.jsx(Ah.ItemSlot, { scope: a, children: /* @__PURE__ */ S.jsx(
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
            ref: y,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: Xn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), IA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: a, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      Ex,
      {
        __scopeSlider: a,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            VA,
            {
              ...f,
              ref: r,
              __scopeSlider: a
            }
          ),
          m ? /* @__PURE__ */ S.jsx(
            UA,
            {
              __scopeSlider: a
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), HA = "SliderBubbleInput", UA = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function({ __scopeSlider: o, ...r }, a) {
    const { value: c, name: f, form: d } = Sx(HA, o), m = b.useRef(null), g = Kn(m, a), h = dx(c);
    return b.useEffect(() => {
      const v = m.current;
      if (!v) return;
      const x = window.HTMLInputElement.prototype, C = Object.getOwnPropertyDescriptor(x, "value").set;
      if (h !== c && C) {
        const w = new Event("input", { bubbles: !0 });
        C.call(v, c), v.dispatchEvent(w);
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
function Cx(n = [], o, r) {
  const a = [...n];
  return a[r] = o, a.sort((c, f) => c - f);
}
Mt(Cx, "getNextSortedValues");
function cm(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return am(f, [0, 100]);
}
Mt(cm, "convertValueToPercentage");
function Rx(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
Mt(Rx, "getLabel");
function wx(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), a = Math.min(...r);
  return r.indexOf(a);
}
Mt(wx, "getClosestValueIndex");
function _x(n, o, r) {
  const a = n / 2, f = yu([0, 50], [0, a]);
  return (a - f(o) * r) * r;
}
Mt(_x, "getThumbInBoundsOffset");
function Ax(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
Mt(Ax, "getStepsBetweenValues");
function Mx(n, o) {
  if (o > 0) {
    const r = Ax(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
Mt(Mx, "hasMinStepsBetweenValues");
function yu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const a = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + a * (r - n[0]);
  };
}
Mt(yu, "linearScale");
function um(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [a, c] = o.split("e"), f = a.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
Mt(um, "getDecimalCount");
function ds(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
Mt(ds, "roundValue");
function Tx(n, {
  min: o,
  step: r,
  direction: a,
  multiplier: c
}) {
  const f = um(r), d = (n - o) / r, m = Math.round(d), g = ds(m * r + o, f) === ds(n, f);
  let h;
  return g ? h = m + c * a : a > 0 ? h = Math.ceil(d) : h = Math.floor(d), ds(h * r + o, f);
}
Mt(Tx, "getNextStepValue");
function Ox(n) {
  return typeof n == "function";
}
Mt(Ox, "isFunction");
var BA = Object.defineProperty, GA = (n, o) => BA(n, "name", { value: o, configurable: !0 }), YA = "Toggle", qA = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ GA(function(o, r) {
    const { pressed: a, defaultPressed: c, onPressedChange: f, ...d } = o, [m, g] = Qo({
      prop: a,
      onChange: f,
      defaultProp: c ?? !1,
      caller: YA
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
), PA = Object.defineProperty, Li = (n, o) => PA(n, "name", { value: o, configurable: !0 }), ba = "ToggleGroup", [kx, nN] = /* @__PURE__ */ Ui(ba, [
  sx
]), Nx = sx(), XA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
  const { type: a, ...c } = o;
  if (a === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(KA, { role: "radiogroup", ...f, ref: r });
  }
  if (a === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(FA, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${ba}\``);
}, "ToggleGroup")), [zx, Dx] = kx(ba), KA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
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
  return /* @__PURE__ */ S.jsx(
    zx,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ S.jsx(jx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), FA = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Li(function(o, r) {
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
    (x) => g((y = []) => [...y, x]),
    [g]
  ), v = b.useCallback(
    (x) => g((y = []) => y.filter((C) => C !== x)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    zx,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: v,
      children: /* @__PURE__ */ S.jsx(jx, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [QA, ZA] = kx(ba), jx = /* @__PURE__ */ b.forwardRef(
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
    } = o, v = Nx(a), x = Rs(m), y = { dir: x, ...h };
    return /* @__PURE__ */ S.jsx(QA, { scope: a, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      uA,
      {
        asChild: !0,
        ...v,
        orientation: d,
        dir: x,
        loop: g,
        children: /* @__PURE__ */ S.jsx(Un.div, { ...y, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Un.div, { ...y, ref: r }) });
  }, "ToggleGroupImpl")
), Mh = "ToggleGroupItem", $A = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Li(function(o, r) {
    const a = Dx(Mh, o.__scopeToggleGroup), c = ZA(Mh, o.__scopeToggleGroup), f = Nx(o.__scopeToggleGroup), d = a.value.includes(o.value), m = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      fA,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ S.jsx(Zy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Zy, { ...g, ref: r });
  }, "ToggleGroupItem")
), Zy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Li(function(o, r) {
    const { __scopeToggleGroup: a, value: c, ...f } = o, d = Dx(Mh, a), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ S.jsx(
      qA,
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
function fm({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(Pw, { "data-slot": "accordion", ...n });
}
function _i({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    Xw,
    {
      "data-slot": "accordion-item",
      className: Je("border-b last:border-b-0", n),
      ...o
    }
  );
}
function Ai({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(Kw, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    Fw,
    {
      "data-slot": "accordion-trigger",
      className: Je(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(f0, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function Mi({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    Qw,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: Je("pt-0 pb-4", n), children: o })
    }
  );
}
const $y = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, Jy = Qv, wr = (n, o) => (r) => {
  var a;
  if (o?.variants == null) return Jy(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const v = r?.[h], x = f?.[h];
    if (v === null) return null;
    const y = $y(v) || $y(x);
    return c[h][y];
  }), m = r && Object.entries(r).reduce((h, v) => {
    let [x, y] = v;
    return y === void 0 || (h[x] = y), h;
  }, {}), g = o == null || (a = o.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((h, v) => {
    let { class: x, className: y, ...C } = v;
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
      x,
      y
    ] : h;
  }, []);
  return Jy(n, d, g, r?.class, r?.className);
}, JA = wr(
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
function Ni({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? g0 : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: Je(JA({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function WA({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ S.jsx(
    CA,
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
const eM = wr(
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
function tM({
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
      className: Je(eM({ orientation: o }), n),
      ...r
    }
  );
}
function dm({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
function hm({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
function mm({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: Je("leading-none font-semibold", n),
      ...o
    }
  );
}
function pm({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: Je("px-6", n),
      ...o
    }
  );
}
function nM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(B0, { "data-slot": "collapsible", ...n });
}
function lM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    I0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function oM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    U0,
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
const gm = {
  ...Er
}, Wy = {};
function zl(n, o) {
  const r = b.useRef(Wy);
  return r.current === Wy && (r.current = n(o)), r;
}
const Xd = gm.useInsertionEffect, iM = (
  // React 17 doesn't have useInsertionEffect.
  Xd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Xd !== gm.useLayoutEffect ? Xd : (n) => n()
);
function Fe(n) {
  const o = zl(rM).current;
  return o.next = n, iM(o.effect), o.trampoline;
}
function rM() {
  const n = {
    next: void 0,
    callback: aM,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function aM() {
}
const sM = () => {
}, Qe = typeof document < "u" ? b.useLayoutEffect : sM, Lx = /* @__PURE__ */ b.createContext({
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
function cM() {
  return b.useContext(Lx);
}
function uM(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: a,
    onMapChange: c
  } = n, f = Fe(c), [, d] = b.useState(!1), m = zl(dM).current, g = zl(fM).current, h = b.useRef(0), v = b.useRef(!0), x = b.useRef([]), y = b.useRef(null), C = Fe(() => {
    v.current || (v.current = !0, d((I) => !I));
  }), w = Fe((I, q) => {
    g.set(I, q), C();
  }), A = Fe((I) => {
    g.delete(I), C();
  }), O = Fe((I) => {
    const q = /* @__PURE__ */ new Map();
    return r.current.length = 0, a && (a.current.length = 0), I.forEach((Y) => {
      q.set(Y.element, {
        ...Y.registration.metadata ?? {},
        index: Y.index
      }), r.current[Y.index] = Y.element, a && (a.current[Y.index] = Y.registration.label !== void 0 ? Y.registration.label : Y.registration.textRef?.current?.textContent ?? Y.element.textContent);
    }), h.current = r.current.length, q;
  });
  function M(I) {
    if (y.current?.disconnect(), y.current = null, typeof MutationObserver != "function" || I.length < 2)
      return;
    const q = new MutationObserver((L) => {
      if (!pM(L))
        return;
      let X = null;
      for (const te of I)
        if (te.isConnected) {
          if (X && Vx(X, te) > 0) {
            q.disconnect(), C();
            return;
          }
          X = te;
        }
    });
    y.current = q;
    const Y = /* @__PURE__ */ new Set();
    for (let L = 1; L < I.length; L += 1) {
      const X = mM(I[L - 1], I[L]);
      X && Y.add(X);
    }
    Y.forEach((L) => q.observe(L, {
      childList: !0
    }));
  }
  const T = Fe(() => {
    const [I, q] = hM(g), Y = O(I);
    M(q), x.current = I, v.current = !1, m.forEach((L) => L(Y)), f(Y);
  });
  Qe(() => (v.current || O(x.current), () => {
    r.current = [], a && (a.current = []);
  }), [r, a, O]), Qe(() => {
    v.current && T();
  }), Qe(() => () => {
    y.current?.disconnect(), v.current = !0;
  }, []);
  const _ = Fe((I) => (m.add(I), () => {
    m.delete(I);
  })), N = b.useMemo(() => ({
    register: w,
    unregister: A,
    subscribeMapChange: _,
    nextIndexRef: h
  }), [w, A, _, h]);
  return /* @__PURE__ */ S.jsx(Lx.Provider, {
    value: N,
    children: o
  });
}
function fM() {
  return /* @__PURE__ */ new Map();
}
function dM() {
  return /* @__PURE__ */ new Set();
}
function hM(n) {
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
  return a.sort((f, d) => Vx(f.element, d.element)), a.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, a.map((f) => f.element)];
}
function mM(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function pM(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Vx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function gM(n, o) {
  return function(a, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", a.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${a}; visit ${f} for the full message.`;
  };
}
const Ro = gM("https://base-ui.com/production-error", "Base UI");
function br(n, o, r, a) {
  const c = zl(Ix).current;
  return yM(c, n, o, r, a) && Hx(c, [n, o, r, a]), c.callback;
}
function bM(n) {
  const o = zl(Ix).current;
  return vM(o, n) && Hx(o, n), o.callback;
}
function Ix() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function yM(n, o, r, a, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== a || n.refs[3] !== c;
}
function vM(n, o) {
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
const xM = parseInt(b.version, 10);
function bm(n) {
  return xM >= n;
}
function ev(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (bm(19) ? r?.ref : o.ref) ?? null;
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
const ia = Object.freeze([]), bl = Object.freeze({});
function SM(n, o) {
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
function EM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function CM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const ym = {};
function sa(n, o, r, a, c) {
  if (!r && !a && !c && !n)
    return nu(o);
  let f = nu(n);
  return o && (f = fs(f, o)), r && (f = fs(f, r)), a && (f = fs(f, a)), c && (f = fs(f, c)), f;
}
function RM(n) {
  if (n.length === 0)
    return ym;
  if (n.length === 1)
    return nu(n[0]);
  let o = nu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = fs(o, n[r]);
  return o;
}
function nu(n) {
  return vm(n) ? {
    ...Bx(n, ym)
  } : wM(n);
}
function fs(n, o) {
  return vm(o) ? Bx(o, n) : _M(n, o);
}
function wM(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const a = o[r];
    Ux(r, a) && (o[r] = Gx(a));
  }
  return o;
}
function _M(n, o) {
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
        Ux(r, a) ? n[r] = AM(n[r], a) : n[r] = a;
    }
  }
  return n;
}
function Ux(n, o) {
  const r = n.charCodeAt(0), a = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && a === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function vm(n) {
  return typeof n == "function";
}
function Bx(n, o) {
  return vm(n) ? n(o) : n ?? ym;
}
function AM(n, o) {
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
function $l(n, o, r = {}) {
  const a = o.render, c = MM(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? bl;
  return kM(n, a, c, f);
}
function MM(n, o = {}) {
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
  } = o, v = h ? EM(r, f) : void 0, x = h ? CM(a, f) : void 0, y = h ? SM(f, g) : bl, C = h && m ? TM(m) : void 0, w = h ? Th(y, C) ?? {} : bl;
  return typeof document < "u" && (h ? Array.isArray(d) ? w.ref = bM([w.ref, ev(c), ...d]) : w.ref = br(w.ref, ev(c), d) : br(null, null)), h ? (v !== void 0 && (w.className = Yx(w.className, v)), x !== void 0 && (w.style = Th(w.style, x)), w) : bl;
}
function TM(n) {
  return Array.isArray(n) ? RM(n) : sa(void 0, n);
}
const OM = /* @__PURE__ */ Symbol.for("react.lazy");
function kM(n, o, r, a) {
  if (o) {
    if (typeof o == "function")
      return o(r, a);
    const c = sa(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === OM && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return NM(n, r);
  throw new Error(Ro(8));
}
function NM(n, o) {
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
let tv = 0;
function zM(n, o = "mui") {
  const [r, a] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (tv += 1, a(`${o}-${tv}`));
  }, [r, o]), c;
}
const nv = gm.useId;
function xm(n, o) {
  if (nv !== void 0) {
    const r = nv();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return zM(n, o);
}
function vu(n) {
  return xm(n, "base-ui");
}
const Kl = "none", Px = "trigger-press", DM = "trigger-hover", Sm = "outside-press", jM = "item-press", LM = "close-press", lv = "clear-press", hs = "input-change", vo = "input-clear", VM = "input-press", xu = "focus-out", Em = "escape-key", Oh = "list-navigation", Cm = "keyboard", Rm = "pointer", IM = "cancel-open";
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
function HM(n, o, r) {
  const a = r ?? bl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...a
  };
}
function Xx(n) {
  b.useEffect(n, ia);
}
const Vc = null;
class UM {
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
let Ic = new UM();
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
  return Xx(n.disposeEffect), n;
}
function wm(n, o = !1, r = !1) {
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
function BM(n = {}) {
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
  } = cM(), v = b.useRef(-1), [x, y] = b.useState(f == null && o ? () => {
    if (v.current === -1) {
      const O = h.current;
      h.current += 1, v.current = O;
    }
    return v.current;
  } : -1), C = f ?? x, w = b.useRef(null), A = b.useCallback((O) => {
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
        M != null && y(M);
      });
  }, [f, g]), {
    ref: A,
    index: C
  };
}
let ov = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const GM = {
  "data-starting-style": ""
}, YM = {
  "data-ending-style": ""
}, Su = {
  transitionStatus(n) {
    return n === "starting" ? GM : n === "ending" ? YM : null;
  }
}, qM = /* @__PURE__ */ b.createContext(void 0);
function PM(n = !1) {
  const o = b.useContext(qM);
  if (o === void 0 && !n)
    throw new Error(Ro(16));
  return o;
}
function XM(n) {
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
        onKeyDown(v) {
          r && o && v.key !== "Tab" && v.preventDefault();
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
function Ms(n = {}) {
  const {
    disabled: o = !1,
    focusableWhenDisabled: r,
    tabIndex: a = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = PM(!0), g = f ?? m !== void 0, {
    props: h
  } = XM({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: a,
    isNativeButton: c
  }), v = b.useCallback(() => {
    const C = d.current;
    Kd(C) && g && o && h.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [o, h.disabled, g]);
  Qe(v, [v]);
  const x = b.useCallback((C = {}) => {
    const {
      onClick: w,
      onMouseDown: A,
      onKeyUp: O,
      onKeyDown: M,
      onPointerDown: T,
      ..._
    } = C;
    return sa({
      onClick(N) {
        if (o) {
          N.preventDefault();
          return;
        }
        w?.(N);
      },
      onMouseDown(N) {
        o || A?.(N);
      },
      onKeyDown(N) {
        if (o || (lu(N), M?.(N), N.baseUIHandlerPrevented))
          return;
        const I = N.target === N.currentTarget, q = N.currentTarget, Y = Kd(q), L = !c && KM(q), X = I && (c ? Y : !L), te = N.key === "Enter", se = N.key === " ", fe = q.getAttribute("role"), le = fe?.startsWith("menuitem") || fe === "option" || fe === "gridcell";
        if (I && g && se) {
          if (N.defaultPrevented && le)
            return;
          N.preventDefault(), (!c || Y) && (N.preventBaseUIHandler(), Qc(q, N));
          return;
        }
        if (!X || c || !se && !te) {
          I && L && se && N.preventDefault();
          return;
        }
        N.defaultPrevented || (N.preventDefault(), te && (N.preventBaseUIHandler(), Qc(q, N)));
      },
      onKeyUp(N) {
        if (!o) {
          if (lu(N), O?.(N), N.target === N.currentTarget && c && g && Kd(N.currentTarget) && N.key === " ") {
            N.preventDefault();
            return;
          }
          N.baseUIHandlerPrevented || N.target === N.currentTarget && !c && !g && !N.defaultPrevented && N.key === " " && (N.preventBaseUIHandler(), Qc(N.currentTarget, N));
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
  }, [o, h, g, c]), y = Fe((C) => {
    d.current = C, v();
  });
  return {
    getButtonProps: x,
    buttonRef: y
  };
}
function Kd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function KM(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Gt(n, o, r, a) {
  return n.addEventListener(o, r, a), () => {
    n.removeEventListener(o, r, a);
  };
}
function gl(n) {
  const o = zl(FM, n).current;
  return o.next = n, Qe(o.effect), o;
}
function FM(n) {
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
function QM(n, o = !1) {
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
        if (d.getAnimations().some((v) => v.pending || v.playState !== "finished")) {
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
      const v = new MutationObserver(() => {
        d.hasAttribute(h) || (v.disconnect(), g());
      });
      v.observe(d, {
        attributes: !0,
        attributeFilter: [h]
      }), c?.addEventListener("abort", () => v.disconnect(), {
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
  } = n, f = Fe(c), d = QM(a, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function ZM() {
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
  userAgent: $M,
  platform: JM,
  maxTouchPoints: WM
} = ZM(), Cu = $M.toLowerCase(), gs = JM.toLowerCase(), Ts = /^i(os$|p)/.test(gs) || gs === "macintel" && WM > 1, iv = "android", ou = gs === iv || Cu.includes(iv), e2 = !Ts && gs.startsWith("mac");
gs.startsWith("win");
const t2 = e2 || Ts, _r = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), rv = !_r && Cu.includes("firefox");
!_r && Cu.includes("chrom");
const n2 = t2, Kx = /jsdom|happydom/.test(Cu), as = 0;
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
  return Xx(n.disposeEffect), n;
}
let av = {}, sv = {}, cv = "";
function Ru(n, o) {
  return ws(n) ? n : o;
}
function uv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Ru(o, r)).overflowY);
}
function l2(n) {
  if (typeof document > "u")
    return !1;
  const o = $t(n);
  return hn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function o2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = $t(n), a = r.documentElement, c = r.body, f = Ru(a, c), d = f.style.overflowY, m = a.style.scrollbarGutter;
  a.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, a.style.scrollbarGutter = m, g === h;
}
function i2(n) {
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
function r2(n) {
  const o = $t(n), r = o.documentElement, a = o.body, c = hn(r);
  let f = 0, d = 0, m = !1;
  const g = xo.create();
  if (_r && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const C = c.getComputedStyle(r), w = c.getComputedStyle(a), M = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, av = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, cv = r.style.scrollBehavior, sv = {
      position: a.style.position,
      height: a.style.height,
      width: a.style.width,
      boxSizing: a.style.boxSizing,
      overflowY: a.style.overflowY,
      overflowX: a.style.overflowX,
      scrollBehavior: a.style.scrollBehavior
    };
    const T = r.scrollHeight > r.clientHeight, _ = r.scrollWidth > r.clientWidth, N = C.overflowY === "scroll" || w.overflowY === "scroll", I = C.overflowX === "scroll" || w.overflowX === "scroll", q = Math.max(0, c.innerWidth - a.clientWidth), Y = Math.max(0, c.innerHeight - a.clientHeight), L = parseFloat(w.marginTop) + parseFloat(w.marginBottom), X = parseFloat(w.marginLeft) + parseFloat(w.marginRight), te = Ru(r, a);
    if (m = o2(n), m) {
      r.style.scrollbarGutter = M, te.style.overflowY = "hidden", te.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: M,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (T || N) && (r.style.overflowY = "scroll"), (_ || I) && (r.style.overflowX = "scroll"), Object.assign(a.style, {
      position: "relative",
      height: L || Y ? `calc(100dvh - ${L + Y}px)` : "100dvh",
      width: X || q ? `calc(100vw - ${X + q}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), a.scrollTop = f, a.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function v() {
    Object.assign(r.style, av), Object.assign(a.style, sv), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = cv);
  }
  function x() {
    v(), g.request(h);
  }
  h();
  const y = Gt(c, "resize", x);
  return () => {
    g.cancel(), v(), typeof c.removeEventListener == "function" && y();
  };
}
class a2 {
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
    if (uv(f, a, c)) {
      const m = new f.MutationObserver(() => {
        uv(f, a, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      m.observe(a, g), m.observe(c, g), this.restore = () => m.disconnect();
      return;
    }
    const d = Ts || !l2(o);
    this.restore = d ? i2(o) : r2(o);
  }
}
const s2 = new a2();
function c2(n = !0, o = null) {
  Qe(() => {
    if (n)
      return s2.acquire(o);
  }, [n, o]);
}
function On(n) {
  n.preventDefault(), n.stopPropagation();
}
function u2(n) {
  return "nativeEvent" in n;
}
function Fx(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : ou && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function _m(n) {
  return Kx ? !1 : !ou && n.width === 0 && n.height === 0 || ou && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Fd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function f2(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const kh = "data-base-ui-focusable", d2 = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", hr = "ArrowLeft", mr = "ArrowRight", Am = "ArrowUp", wu = "ArrowDown";
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
function Nl(n) {
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
function h2(n) {
  return n.matches("html,body");
}
function Mm(n) {
  return Kt(n) && n.matches(d2);
}
function Nh(n) {
  return n ? n.getAttribute("role") === "combobox" && Mm(n) : !1;
}
function zh(n) {
  return n ? n.hasAttribute(kh) ? n : n.querySelector(`[${kh}]`) || n : null;
}
function ca(...n) {
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
}, Tm = {
  ...Qx,
  position: "fixed",
  top: 0,
  left: 0
}, Om = {
  ...Qx,
  position: "absolute"
}, iu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [a, c] = b.useState();
  Qe(() => {
    n2 && _r && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: a
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: Tm,
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
function fv(n, o) {
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
function m2(n, {
  event: o,
  orientation: r,
  loopFocus: a,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: m,
  minIndex: g,
  maxIndex: h,
  prevIndex: v,
  stopEvent: x = !1
}) {
  let y = v, C;
  if (o.key === Am ? C = "up" : o.key === wu && (C = "down"), C) {
    const w = [], A = [];
    let O = !1, M = 0;
    {
      let X = null, te = -1;
      n.forEach((se, fe) => {
        if (se == null)
          return;
        M += 1;
        const le = se.closest('[role="row"]');
        le && (O = !0), (le !== X || te === -1) && (X = le, te += 1, w[te] = []), w[te].push(fe), A[fe] = te;
      });
    }
    let T = !1, _ = 0;
    if (O)
      for (const X of w) {
        const te = X.length;
        te > _ && (_ = te), te !== d && (T = !0);
      }
    const N = T && M < n.length, I = _ || d, q = (X) => {
      if (!T || v === -1)
        return;
      const te = A[v];
      if (te == null)
        return;
      const se = w[te].indexOf(v), fe = X === "up" ? -1 : 1;
      for (let le = te + fe, he = 0; he < w.length; he += 1, le += fe) {
        if (le < 0 || le >= w.length) {
          if (!a || N)
            return;
          if (le = le < 0 ? w.length - 1 : 0, c) {
            const V = Math.min(se, w[le].length - 1), H = w[le][V] ?? w[le][0], F = c(o, v, H);
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
    }, Y = (X) => {
      if (!N || v === -1)
        return;
      const te = v % I, se = X === "up" ? -I : I, fe = h - h % I, le = dr(h / I) + 1;
      for (let he = v - te + se, be = 0; be < le; be += 1, he += se) {
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
    x && On(o);
    const L = q(C) ?? Y(C);
    if (L !== void 0)
      y = L;
    else if (v === -1)
      y = C === "up" ? h : g;
    else if (y = tl(n, {
      startingIndex: v,
      amount: I,
      decrement: C === "up",
      disabledIndices: m
    }), a) {
      if (C === "up" && (v - I < g || y < 0)) {
        const X = v % I, te = h % I, se = h - (te - X);
        te === X ? y = h : y = te > X ? se : se - I, c && (y = c(o, v, y));
      }
      C === "down" && v + I > h && (y = tl(n, {
        startingIndex: v % I - I,
        amount: I,
        disabledIndices: m
      }), c && (y = c(o, v, y)));
    }
    bs(n, y) && (y = v);
  }
  if (r === "both") {
    const w = dr(v / d);
    o.key === (f ? hr : mr) && (x && On(o), v % d !== d - 1 ? (y = tl(n, {
      startingIndex: v,
      disabledIndices: m
    }), a && Hc(y, d, w) && (y = tl(n, {
      startingIndex: v - v % d - 1,
      disabledIndices: m
    }), c && (y = c(o, v, y)))) : a && (y = tl(n, {
      startingIndex: v - v % d - 1,
      disabledIndices: m
    }), c && (y = c(o, v, y))), Hc(y, d, w) && (y = v)), o.key === (f ? mr : hr) && (x && On(o), v % d !== 0 ? (y = tl(n, {
      startingIndex: v,
      decrement: !0,
      disabledIndices: m
    }), a && Hc(y, d, w) && (y = tl(n, {
      startingIndex: v + (d - v % d),
      decrement: !0,
      disabledIndices: m
    }), c && (y = c(o, v, y)))) : a && (y = tl(n, {
      startingIndex: v + (d - v % d),
      decrement: !0,
      disabledIndices: m
    }), c && (y = c(o, v, y))), Hc(y, d, w) && (y = v));
    const A = dr(h / d) === w;
    bs(n, y) && (a && A ? (y = o.key === (f ? mr : hr) ? h : tl(n, {
      startingIndex: v - v % d - 1,
      disabledIndices: m
    }), c && (y = c(o, v, y))) : y = v);
  }
  return y;
}
function ru(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !_u(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function p2(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function _u(n, o = n ? yl(n) : null) {
  return !n || !n.isConnected || !o || p2(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const g2 = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function b2(n) {
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
    if (Bn(o) === "summary")
      return o;
  return null;
}
function y2(n, o) {
  const r = Dh(o);
  return !!r && (n === r || at(r, n));
}
function Zx(n) {
  const o = n ? Bn(n) : "";
  return n != null && n.matches(g2) && (o !== "summary" || n.parentElement != null && Bn(n.parentElement) === "details" && Dh(n.parentElement) === n) && (o !== "details" || Dh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function $x(n) {
  if (!Zx(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = b2(o)) {
    const r = o !== n, a = Bn(o) === "slot";
    if (o.hasAttribute("inert") || r && Bn(o) === "details" && !o.open && !y2(n, o) || o.hasAttribute("hidden") || !a && !v2(o, r))
      return !1;
  }
  return !0;
}
function v2(n, o) {
  const r = yl(n);
  return o ? r.display !== "none" : _u(n, r);
}
function Jx(n) {
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
function x2(n, o) {
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
function Wx(n) {
  if (Kt(n) && Bn(n) === "slot") {
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
function km(n) {
  return $x(n) && Jx(n) >= 0;
}
function n1(n) {
  const o = [];
  return e1(n, o), o.filter($x);
}
function Au(n) {
  const o = n1(n);
  return o.filter((r) => Jx(r) >= 0 && x2(r, o));
}
function l1(n, o) {
  const r = Au(n), a = r.length;
  if (a === 0)
    return;
  const c = Xl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : a - 1 : f + o;
  return r[d];
}
function o1(n) {
  return l1($t(n).body, 1) || n;
}
function i1(n) {
  return l1($t(n).body, -1) || n;
}
function ms(n, o) {
  const r = o || n.currentTarget, a = n.relatedTarget;
  return !a || !at(r, a);
}
function S2(n) {
  Au(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function dv(n) {
  const o = [];
  t1(n, "[data-tabindex]", o), o.forEach((r) => {
    const a = r.dataset.tabindex;
    delete r.dataset.tabindex, a ? r.setAttribute("tabindex", a) : r.removeAttribute("tabindex");
  });
}
function ys(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...ys(n, c.id, r)]);
}
function hv(n, o) {
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
}, mv = "data-base-ui-inert", jh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let ss = /* @__PURE__ */ new WeakMap(), Wd = 0;
function E2(n) {
  return jh[n];
}
function r1(n) {
  return n ? da(n) ? n.host : r1(n.parentNode) : null;
}
const pv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const a = r1(r);
  return n.contains(a) ? a : null;
}).filter((r) => r != null), gv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let a = r;
    for (; a && !o.has(a); )
      o.add(a), a = a.parentNode;
  }), o;
}, bv = (n, o, r) => {
  const a = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Bn(d) !== "script" && (o.has(d) ? c(d) : a.push(d));
    });
  };
  return c(n), a;
};
function C2(n, o, r, a, {
  mark: c = !0
}) {
  let f = null;
  a ? f = "inert" : r && (f = "aria-hidden");
  let d = null, m = null;
  const g = pv(o, n), h = c ? bv(o, gv(g), new Set(g)) : [], v = [], x = [];
  if (f) {
    const y = Jd[f], C = E2(f);
    m = C, d = y;
    const w = pv(o, Array.from(o.querySelectorAll("[aria-live]"))), A = g.concat(w);
    bv(o, gv(A), new Set(A)).forEach((M) => {
      const T = M.getAttribute(f), _ = T !== null && T !== "false", N = (y.get(M) || 0) + 1;
      y.set(M, N), v.push(M), N === 1 && _ && C.add(M), _ || M.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((y) => {
    const C = (ss.get(y) || 0) + 1;
    ss.set(y, C), x.push(y), C === 1 && y.setAttribute(mv, "");
  }), Wd += 1, () => {
    d && v.forEach((y) => {
      const w = (d.get(y) || 0) - 1;
      d.set(y, w), w || (!m?.has(y) && f && y.removeAttribute(f), m?.delete(y));
    }), c && x.forEach((y) => {
      const C = (ss.get(y) || 0) - 1;
      ss.set(y, C), C || y.removeAttribute(mv);
    }), Wd -= 1, Wd || (Jd.inert = /* @__PURE__ */ new WeakMap(), Jd["aria-hidden"] = /* @__PURE__ */ new WeakMap(), jh.inert = /* @__PURE__ */ new WeakSet(), jh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), ss = /* @__PURE__ */ new WeakMap());
  };
}
function yv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: a = !1,
    mark: c = !0
  } = o, f = $t(n[0]).body;
  return C2(n, f, r, a, {
    mark: c
  });
}
const R2 = {
  style: {
    transition: "none"
  }
}, w2 = "data-base-ui-click-trigger", _2 = {
  fallbackAxisSide: "none"
}, A2 = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, a1 = /* @__PURE__ */ b.createContext(null), s1 = () => b.useContext(a1), M2 = au("portal");
function T2(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: a = bl,
    elementProps: c
  } = n, f = xm(), m = s1()?.portalNode, [g, h] = b.useState(null), [v, x] = b.useState(null), y = Fe((O) => {
    O !== null && x(O);
  }), C = b.useRef(null);
  Qe(() => {
    if (r === null) {
      C.current && (C.current = null, x(null), h(null));
      return;
    }
    const O = (r && (tm(r) ? r : r.current)) ?? m ?? document.body;
    if (O == null) {
      C.current && (C.current = null, x(null), h(null));
      return;
    }
    C.current !== O && (C.current = O, x(null), h(O));
  }, [r, m]);
  const w = $l("div", a, {
    ref: [o, y],
    props: [{
      id: f,
      [M2]: ""
    }, c]
  }), A = g && w ? /* @__PURE__ */ pa.createPortal(w, g) : null;
  return {
    node: v,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(w) ? w.props.id : void 0,
    subtree: A
  };
}
const O2 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    container: m,
    ...g
  } = o, {
    node: h,
    nodeId: v,
    subtree: x
  } = T2({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: g
  }), y = b.useRef(null), C = b.useRef(null), w = b.useRef(null), A = b.useRef(null), [O, M] = b.useState(null), T = b.useRef(!1), _ = O?.modal, N = O?.open, I = !!O && !O.modal && O.open && !!h;
  b.useEffect(() => {
    if (!h || _)
      return;
    function Y(L) {
      h && L.relatedTarget && ms(L) && (L.type === "focusin" ? T.current && (dv(h), T.current = !1) : (S2(h), T.current = !0));
    }
    return ca(Gt(h, "focusin", Y, !0), Gt(h, "focusout", Y, !0));
  }, [h, _]), Qe(() => {
    !h || N !== !0 || !T.current || (dv(h), T.current = !1);
  }, [N, h]);
  const q = b.useMemo(() => ({
    beforeOutsideRef: y,
    afterOutsideRef: C,
    beforeInsideRef: w,
    afterInsideRef: A,
    portalNode: h,
    setFocusManagerState: M
  }), [h]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [x, /* @__PURE__ */ S.jsxs(a1.Provider, {
      value: q,
      children: [I && h && /* @__PURE__ */ S.jsx(iu, {
        "data-type": "outside",
        ref: y,
        onFocus: (Y) => {
          if (ms(Y, h))
            w.current?.focus();
          else {
            const L = O ? O.domReference : null;
            i1(L)?.focus();
          }
        }
      }), I && h && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": v,
        style: A2
      }), h && /* @__PURE__ */ pa.createPortal(d, h), I && h && /* @__PURE__ */ S.jsx(iu, {
        "data-type": "outside",
        ref: C,
        onFocus: (Y) => {
          if (ms(Y, h))
            A.current?.focus();
          else {
            const L = O ? O.domReference : null;
            o1(L)?.focus(), O?.closeOnFocusOut && O?.onOpenChange(!1, vt(xu, Y.nativeEvent));
          }
        }
      })]
    })]
  });
});
function k2() {
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
const N2 = /* @__PURE__ */ b.createContext(null), z2 = /* @__PURE__ */ b.createContext(null), c1 = () => b.useContext(N2)?.id || null, Mu = (n) => {
  const o = b.useContext(z2);
  return n ?? o;
};
function D2(n, o) {
  const r = hn(Nl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const vv = 20;
let Ti = [];
function Nm() {
  Ti = Ti.filter((n) => n.deref()?.isConnected);
}
function xv(n) {
  Nm(), n && Bn(n) !== "body" && (Ti.push(new WeakRef(n)), Ti.length > vv && (Ti = Ti.slice(-vv)));
}
function Sv() {
  return Nm(), Ti[Ti.length - 1]?.deref();
}
function j2(n) {
  return n ? km(n) ? n : Au(n)[0] || n : null;
}
function Ev(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = n1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return km(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), a = n.getAttribute("tabindex");
  r.length === 0 ? a !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (a !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function L2(n) {
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
    nextFocusableElement: v,
    previousFocusableElement: x,
    beforeContentFocusGuardRef: y,
    externalTree: C,
    getInsideElements: w
  } = n, A = "rootStore" in o ? o.rootStore : o, O = A.useState("open"), M = A.useState("domReferenceElement"), T = A.useState("floatingElement"), {
    events: _,
    dataRef: N
  } = A.context, I = Fe(() => N.current.floatingContext?.nodeId), q = c === !1, Y = Nh(M) && q, L = gl(c), X = gl(f), te = gl(h), se = gl(O), fe = Mu(C), le = s1(), he = b.useRef(!1), be = b.useRef(!1), V = b.useRef(!1), H = b.useRef(null), F = b.useRef(""), ve = b.useRef(""), ae = b.useRef(null), z = b.useRef(null), K = br(ae, y, le?.beforeInsideRef), ne = br(z, le?.afterInsideRef), oe = Vi(), pe = Vi(), we = ps(), qe = le != null, Ae = zh(T), Te = Fe((ze = Ae) => ze ? Au(ze) : []), it = Fe(() => w?.().filter((ze) => ze != null) ?? []);
  b.useEffect(() => {
    if (a || !m)
      return;
    function ze(Ne) {
      Ne.key === "Tab" && at(Ae, Xl($t(Ae))) && Te().length === 0 && !Y && On(Ne);
    }
    const et = $t(Ae);
    return Gt(et, "keydown", ze);
  }, [a, Ae, m, Y, Te]), b.useEffect(() => {
    if (a || !O)
      return;
    const ze = $t(Ae);
    function et() {
      V.current = !1;
    }
    function Ne(Ue) {
      const _e = Nl(Ue), Ze = it(), Oe = at(T, _e) || at(M, _e) || at(le?.portalNode, _e) || Ze.some((We) => We === _e || at(We, _e));
      V.current = !Oe, ve.current = Ue.pointerType || "keyboard", _e?.closest(`[${w2}]`) && (be.current = !0, pe.start(0, () => {
        be.current = !1;
      }));
    }
    function Le() {
      ve.current = "keyboard";
    }
    return ca(
      Gt(ze, "pointerdown", Ne, !0),
      Gt(ze, "pointerup", et, !0),
      Gt(ze, "pointercancel", et, !0),
      Gt(ze, "keydown", Le, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [a, T, M, Ae, O, le, pe, it]), b.useEffect(() => {
    if (a || !g)
      return;
    const ze = $t(Ae);
    function et() {
      be.current = !0, pe.start(0, () => {
        be.current = !1;
      });
    }
    function Ne(Ze) {
      const Oe = Nl(Ze);
      km(Oe) && (H.current = Oe);
    }
    function Le(Ze) {
      const Oe = Ze.relatedTarget, We = Ze.currentTarget, tt = Nl(Ze);
      m && Oe == null && tt != null && at(T, tt) && xv(tt), queueMicrotask(() => {
        const Xe = I(), ye = A.context.triggerElements, Q = it(), ce = Oe?.hasAttribute(au("focus-guard")) && [ae.current, z.current, le?.beforeInsideRef.current, le?.afterInsideRef.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, Po(x), Po(v)].includes(Oe), He = !(at(M, Oe) || at(T, Oe) || at(Oe, T) || at(le?.portalNode, Oe) || Q.some((Ce) => Ce === Oe || at(Ce, Oe)) || ye.hasMatchingElement((Ce) => at(Ce, Oe)) || ce || fe && (ys(fe.nodesRef.current, Xe).find((Ce) => at(Ce.context?.elements.floating, Oe) || at(Ce.context?.elements.domReference, Oe)) || hv(fe.nodesRef.current, Xe).find((Ce) => [Ce.context?.elements.floating, zh(Ce.context?.elements.floating)].includes(Oe) || Ce.context?.elements.domReference === Oe)));
        if (We === M && Ae && Ev(Ae), d && We !== M && !_u(tt) && Xl(ze) === ze.body) {
          if (Kt(Ae) && (Ae.focus(), d === "popup")) {
            we.request(() => {
              Ae.focus();
            });
            return;
          }
          const Ce = Te(), Ge = H.current, nt = (Ge && Ce.includes(Ge) ? Ge : null) || Ce[Ce.length - 1] || Ae;
          Kt(nt) && nt.focus();
        }
        if (N.current.insideReactTree) {
          N.current.insideReactTree = !1;
          return;
        }
        (Y || !m) && Oe && He && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (Y || Oe !== Sv()) && (he.current = !0, A.setOpen(!1, vt(xu, Ze)));
      });
    }
    function Ue() {
      V.current || (N.current.insideReactTree = !0, oe.start(0, () => {
        N.current.insideReactTree = !1;
      }));
    }
    const _e = Kt(M) ? M : null;
    if (!(!T && !_e))
      return ca(_e && Gt(_e, "focusout", Le), _e && Gt(_e, "pointerdown", et), T && Gt(T, "focusin", Ne), T && Gt(T, "focusout", Le), T && le && Gt(T, "focusout", Ue, !0));
  }, [a, M, T, Ae, m, fe, le, A, g, d, Te, Y, I, N, oe, pe, we, v, x, it]), b.useEffect(() => {
    if (a || !T || !O)
      return;
    const ze = Array.from(le?.portalNode?.querySelectorAll(`[${au("portal")}]`) || []), Ne = (fe ? hv(fe.nodesRef.current, I()) : []).find((We) => Nh(We.context?.elements.domReference || null))?.context?.elements.domReference, Ue = [...[T, ...ze, ae.current, z.current, le?.beforeOutsideRef.current, le?.afterOutsideRef.current, ...it()], Ne, Po(x), Po(v), Y ? M : null].filter((We) => We != null), _e = yv(Ue, {
      ariaHidden: m || Y,
      mark: !1
    }), Ze = [T, ...ze].filter((We) => We != null), Oe = yv(Ze);
    return () => {
      Oe(), _e();
    };
  }, [O, a, M, T, m, le, Y, fe, I, v, x, it]), Qe(() => {
    if (!O || a || !Kt(Ae))
      return;
    F.current = "", ve.current = "";
    const ze = $t(Ae), et = Xl(ze);
    queueMicrotask(() => {
      const Ne = L.current, Le = typeof Ne == "function" ? Ne(te.current || "") : Ne;
      if (Le === void 0 || Le === !1 || at(Ae, et))
        return;
      let _e = null;
      const Ze = () => (_e == null && (_e = Te(Ae)), _e[0] || Ae);
      let Oe;
      Le === !0 || Le === null ? Oe = Ze() : Oe = Po(Le), Oe = Oe || Ze();
      const We = at(Ae, Xl(ze));
      Zc(Oe, {
        preventScroll: Oe === Ae,
        shouldFocus() {
          if (!se.current)
            return !1;
          if (We)
            return !0;
          const tt = Xl(ze);
          return !(tt !== Oe && at(Ae, tt));
        }
      });
    });
  }, [a, O, Ae, Te, L, te, se]), Qe(() => {
    if (a || !Ae)
      return;
    const ze = $t(Ae), et = Xl(ze), Ne = te.current == null;
    xv(et);
    function Le(_e) {
      if (_e.open || (F.current = D2(_e.nativeEvent, ve.current)), _e.reason === DM && _e.nativeEvent.type === "mouseleave" && (he.current = !0), _e.reason === Sm)
        if (_e.nested)
          he.current = !1;
        else if (Fx(_e.nativeEvent) || _m(_e.nativeEvent))
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
      const Ze = X.current;
      let Oe = typeof Ze == "function" ? Ze(_e) : Ze;
      if (Oe === void 0 || Oe === !1)
        return null;
      Oe === null && (Oe = !0);
      const We = M?.isConnected ? M : null, tt = et?.isConnected && Bn(et) !== "body" ? et : null;
      let Xe = Ne ? tt || We : We || tt;
      return Xe || (Xe = Sv() || null), typeof Oe == "boolean" ? Xe : Po(Oe) || Xe || null;
    }
    return () => {
      _.off("openchange", Le);
      const _e = Xl(ze), Ze = it(), Oe = at(T, _e) || Ze.some((ye) => ye === _e || at(ye, _e)) || fe && ys(fe.nodesRef.current, I(), !1).some((ye) => at(ye.context?.elements.floating, _e)), We = X.current, tt = F.current, Xe = Ue(tt);
      queueMicrotask(() => {
        const ye = j2(Xe), Q = typeof We != "boolean";
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
  }, [a, T, Ae, X, te, _, fe, M, I, it]), Qe(() => {
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
    if (!(a || !Ae))
      return Ev(Ae), () => {
        queueMicrotask(Nm);
      };
  }, [a, Ae]);
  const pt = !a && (m ? !Y : !0) && (qe || m);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [pt && /* @__PURE__ */ S.jsx(iu, {
      "data-type": "inside",
      ref: K,
      onFocus: (ze) => {
        if (m) {
          const et = Te();
          Zc(et[et.length - 1]);
        } else le?.portalNode && (he.current = !1, ms(ze, le.portalNode) ? o1(M)?.focus() : Po(x ?? le.beforeOutsideRef)?.focus());
      }
    }), r, pt && /* @__PURE__ */ S.jsx(iu, {
      "data-type": "inside",
      ref: ne,
      onFocus: (ze) => {
        m ? Zc(Te()[0]) : le?.portalNode && (g && (he.current = !0), ms(ze, le.portalNode) ? i1(M)?.focus() : Po(v ?? le.afterOutsideRef)?.focus());
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
    touchOpenDelay: m = 0,
    reason: g = Px
  } = o, h = "rootStore" in n ? n.rootStore : n, v = h.context.dataRef, x = b.useRef(void 0), y = ps(), C = Vi(), w = b.useMemo(() => {
    function A(M, T, _, N) {
      const I = vt(g, T, _);
      M && N === "touch" && m > 0 ? C.start(m, () => {
        h.setOpen(!0, I);
      }) : h.setOpen(M, I);
    }
    function O(M, T, _) {
      const N = v.current.openEvent, I = h.select("domReferenceElement") !== T;
      return M && I || !M || !c ? !0 : N && d ? !_(N.type) : !1;
    }
    return {
      onPointerDown(M) {
        x.current = Fd(M.pointerType) && _m(M.nativeEvent) ? "virtual" : M.pointerType;
      },
      onMouseDown(M) {
        const T = x.current, _ = M.nativeEvent, N = h.select("open");
        if (M.button !== 0 || a === "click" || Fd(T) && f)
          return;
        const I = O(N, M.currentTarget, (L) => L === "click" || L === "mousedown"), q = Nl(_);
        if (Mm(q)) {
          A(I, _, q, T);
          return;
        }
        const Y = M.currentTarget;
        y.request(() => {
          A(I, _, Y, T);
        });
      },
      onClick(M) {
        if (a === "mousedown-only")
          return;
        const T = x.current;
        if (a === "mousedown" && T) {
          x.current = void 0;
          return;
        }
        if (Fd(T) && f)
          return;
        const _ = h.select("open"), N = O(_, M.currentTarget, (I) => I === "click" || I === "mousedown" || I === "keydown" || I === "keyup");
        A(N, M.nativeEvent, M.currentTarget, T);
      },
      onKeyDown() {
        x.current = void 0;
      }
    };
  }, [v, a, f, g, h, d, c, y, C, m]);
  return b.useMemo(() => r ? {
    reference: w
  } : bl, [r, w]);
}
function V2() {
  return !1;
}
function I2(n) {
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
    referencePress: d = V2,
    bubbles: m,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, v = h.useState("open"), x = h.useState("floatingElement"), {
    dataRef: y
  } = h.context, C = Mu(g), w = Fe(typeof c == "function" ? c : () => !1), A = typeof c == "function" ? w : c, O = A !== !1, M = Fe(() => f), {
    escapeKey: T,
    outsidePress: _
  } = I2(m), N = b.useRef(!1), I = b.useRef(!1), q = b.useRef(!1), Y = b.useRef(!1), L = b.useRef(""), X = b.useRef(null), te = Vi(), se = Vi(), fe = Fe(() => {
    se.clear(), y.current.insideReactTree = !1;
  }), le = Fe((K) => {
    const ne = y.current.floatingContext?.nodeId;
    return (C ? ys(C.nodesRef.current, ne) : []).some((pe) => pe.context?.open && !pe.context.dataRef.current[K]);
  }), he = Fe((K) => Qd(K, h.select("floatingElement")) || Qd(K, h.select("domReferenceElement"))), be = Fe((K) => {
    d() && h.setOpen(!1, vt(Px, K.nativeEvent));
  }), V = Fe((K) => {
    if (!v || !r || !a || K.key !== "Escape" || Y.current || !T && le("__escapeKeyBubbles"))
      return;
    const ne = u2(K) ? K.nativeEvent : K, oe = vt(Em, ne);
    h.setOpen(!1, oe), oe.isCanceled || K.preventDefault(), !T && !oe.isPropagationAllowed && K.stopPropagation();
  }), H = Fe(() => {
    y.current.insideReactTree = !0, se.start(0, fe);
  }), F = Fe((K) => {
    if (!v || !r || K.button !== 0)
      return;
    const ne = Nl(K.nativeEvent);
    at(h.select("floatingElement"), ne) && (N.current || (N.current = !0, I.current = !1));
  }), ve = Fe((K) => {
    !v || !r || (K.defaultPrevented || K.nativeEvent.defaultPrevented) && N.current && (I.current = !0);
  });
  b.useEffect(() => {
    if (!v || !r)
      return fe;
    y.current.__escapeKeyBubbles = T, y.current.__outsidePressBubbles = _;
    const K = new yr(), ne = new yr();
    function oe() {
      K.clear(), Y.current = !0;
    }
    function pe() {
      K.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        _r ? 5 : 0,
        () => {
          Y.current = !1;
        }
      );
    }
    function we() {
      q.current = !0, ne.start(0, () => {
        q.current = !1;
      });
    }
    function qe() {
      N.current = !1, I.current = !1;
    }
    function Ae() {
      const Q = L.current, ce = Q === "pen" || !Q ? "mouse" : Q, He = M(), Ce = typeof He == "function" ? He() : He;
      return typeof Ce == "string" ? Ce : Ce[ce];
    }
    function Te(Q) {
      const ce = Ae();
      return ce === "intentional" && Q.type !== "click" || ce === "sloppy" && Q.type === "click";
    }
    function it(Q) {
      const ce = y.current.floatingContext?.nodeId, He = C && ys(C.nodesRef.current, ce).some((Ce) => Qd(Q, Ce.context?.elements.floating));
      return he(Q) || He;
    }
    function pt(Q) {
      if (Te(Q)) {
        Q.type !== "click" && !he(Q) && (ne.clear(), q.current = !1), fe();
        return;
      }
      if (y.current.insideReactTree) {
        fe();
        return;
      }
      const ce = Nl(Q), He = `[${au("inert")}]`, Ce = dn(ce) ? ce.getRootNode() : null, Ge = Array.from((da(Ce) ? Ce : $t(h.select("floatingElement"))).querySelectorAll(He)), nt = h.context.triggerElements;
      if (ce && (nt.hasElement(ce) || nt.hasMatchingElement((St) => at(St, ce))))
        return;
      let Tt = dn(ce) ? ce : null;
      for (; Tt && !ki(Tt); ) {
        const St = ji(Tt);
        if (ki(St) || !dn(St))
          break;
        Tt = St;
      }
      if (!(Ge.length && dn(ce) && !h2(ce) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !at(ce, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((St) => !at(Tt, St)))) {
        if (Kt(ce) && !("touches" in Q)) {
          const St = ki(ce), Bt = yl(ce), Nt = /auto|scroll/, xt = St || Nt.test(Bt.overflowX), on = St || Nt.test(Bt.overflowY), st = xt && ce.clientWidth > 0 && ce.scrollWidth > ce.clientWidth, Et = on && ce.clientHeight > 0 && ce.scrollHeight > ce.clientHeight, Jt = Bt.direction === "rtl", Rn = Et && (Jt ? Q.offsetX <= ce.offsetWidth - ce.clientWidth : Q.offsetX > ce.clientWidth), Ft = st && Q.offsetY > ce.clientHeight;
          if (Rn || Ft)
            return;
        }
        if (!it(Q)) {
          if (Ae() === "intentional" && q.current) {
            ne.clear(), q.current = !1;
            return;
          }
          typeof A == "function" && !A(Q) || le("__outsidePressBubbles") || (h.setOpen(!1, vt(Sm, Q)), fe());
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
      ce && (X.current = {
        startTime: Date.now(),
        startX: ce.clientX,
        startY: ce.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, te.start(1e3, () => {
        X.current && (X.current.dismissOnTouchEnd = !1, X.current.dismissOnMouseDown = !1);
      }));
    }
    function Ne(Q, ce) {
      const He = Nl(Q);
      if (!He)
        return;
      const Ce = Gt(He, Q.type, () => {
        ce(Q), Ce();
      });
    }
    function Le(Q) {
      L.current = "touch", Ne(Q, et);
    }
    function Ue(Q) {
      te.clear(), Q.type === "pointerdown" && (L.current = Q.pointerType), !(Q.type === "mousedown" && X.current && !X.current.dismissOnMouseDown) && Ne(Q, (ce) => {
        ce.type === "pointerdown" ? ze(ce) : pt(ce);
      });
    }
    function _e(Q) {
      if (!N.current)
        return;
      const ce = I.current;
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
          typeof A == "function" && !A(Q) || (ne.clear(), q.current = !0, fe());
        }
      }
    }
    function Ze(Q) {
      if (Ae() !== "sloppy" || !X.current || he(Q))
        return;
      const ce = Q.touches[0];
      if (!ce)
        return;
      const He = Math.abs(ce.clientX - X.current.startX), Ce = Math.abs(ce.clientY - X.current.startY), Ge = Math.sqrt(He * He + Ce * Ce);
      Ge > 5 && (X.current.dismissOnTouchEnd = !0), Ge > 10 && (pt(Q), te.clear(), X.current = null);
    }
    function Oe(Q) {
      Ne(Q, Ze);
    }
    function We(Q) {
      Ae() !== "sloppy" || !X.current || he(Q) || (X.current.dismissOnTouchEnd && pt(Q), te.clear(), X.current = null);
    }
    function tt(Q) {
      Ne(Q, We);
    }
    const Xe = $t(x), ye = ca(a && ca(Gt(Xe, "keydown", V), Gt(Xe, "compositionstart", oe), Gt(Xe, "compositionend", pe)), O && ca(Gt(Xe, "click", Ue, !0), Gt(Xe, "pointerdown", Ue, !0), Gt(Xe, "pointerup", _e, !0), Gt(Xe, "pointercancel", _e, !0), Gt(Xe, "mousedown", Ue, !0), Gt(Xe, "mouseup", _e, !0), Gt(Xe, "touchstart", Le, !0), Gt(Xe, "touchmove", Oe, !0), Gt(Xe, "touchend", tt, !0)));
    return () => {
      ye(), K.clear(), ne.clear(), qe(), q.current = !1, fe();
    };
  }, [y, x, a, O, A, v, r, T, _, V, fe, M, le, he, C, h, te]);
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
var Cv;
function U2() {
  if (Cv) return th;
  Cv = 1;
  var n = Ss();
  function o(x, y) {
    return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
  }
  var r = typeof Object.is == "function" ? Object.is : o, a = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(x, y) {
    var C = y(), w = a({ inst: { value: C, getSnapshot: y } }), A = w[0].inst, O = w[1];
    return f(
      function() {
        A.value = C, A.getSnapshot = y, g(A) && O({ inst: A });
      },
      [x, C, y]
    ), c(
      function() {
        return g(A) && O({ inst: A }), x(function() {
          g(A) && O({ inst: A });
        });
      },
      [x]
    ), d(C), C;
  }
  function g(x) {
    var y = x.getSnapshot;
    x = x.value;
    try {
      var C = y();
      return !r(x, C);
    } catch {
      return !0;
    }
  }
  function h(x, y) {
    return y();
  }
  var v = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return th.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v, th;
}
var Rv;
function f1() {
  return Rv || (Rv = 1, eh.exports = U2()), eh.exports;
}
var B2 = f1(), nh = { exports: {} }, lh = {};
var wv;
function G2() {
  if (wv) return lh;
  wv = 1;
  var n = Ss(), o = f1();
  function r(h, v) {
    return h === v && (h !== 0 || 1 / h === 1 / v) || h !== h && v !== v;
  }
  var a = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, g = n.useDebugValue;
  return lh.useSyncExternalStoreWithSelector = function(h, v, x, y, C) {
    var w = f(null);
    if (w.current === null) {
      var A = { hasValue: !1, value: null };
      w.current = A;
    } else A = w.current;
    w = m(
      function() {
        function M(q) {
          if (!T) {
            if (T = !0, _ = q, q = y(q), C !== void 0 && A.hasValue) {
              var Y = A.value;
              if (C(Y, q))
                return N = Y;
            }
            return N = q;
          }
          if (Y = N, a(_, q)) return Y;
          var L = y(q);
          return C !== void 0 && C(Y, L) ? (_ = q, Y) : (_ = q, N = L);
        }
        var T = !1, _, N, I = x === void 0 ? null : x;
        return [
          function() {
            return M(v());
          },
          I === null ? void 0 : function() {
            return M(I());
          }
        ];
      },
      [v, x, y, C]
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
var _v;
function Y2() {
  return _v || (_v = 1, nh.exports = G2()), nh.exports;
}
var q2 = Y2();
const P2 = bm(19), X2 = P2 ? F2 : Q2;
function xe(n, o, r, a, c) {
  return X2(n, o, r, a, c);
}
function K2(n, o, r, a, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, a, c), [n, o, r, a, c]);
  return B2.useSyncExternalStore(n.subscribe, f, f);
}
function F2(n, o, r, a, c) {
  return K2(n, o, r, a, c);
}
function Q2(n, o, r, a, c) {
  return q2.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, a, c));
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
    return xe(this, o, r, a, c);
  }
}
class Z2 extends d1 {
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
const $2 = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class J2 extends Z2 {
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
      events: k2(),
      nested: a,
      triggerElements: f
    }, $2), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && f2(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
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
const W2 = {
  tabIndex: -1,
  [kh]: ""
};
class eT {
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
function tT(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: a = {}
  } = n, c = xm(), f = c1() != null, d = zl(() => new J2({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: a.reference ?? null,
    floatingElement: a.floating ?? null,
    triggerElements: new eT(),
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
function nT(n) {
  return lT(n, n.rootContext);
}
function lT(n, o) {
  const {
    nodeId: r,
    externalTree: a
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), g = o.useState("floatingId"), [h, v] = b.useState(null), [x, y] = b.useState(void 0), [C, w] = b.useState(void 0), A = b.useRef(null), O = Mu(a), M = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), T = P_({
    ...n,
    elements: {
      ...M,
      ...h && {
        reference: h
      }
    }
  }), _ = dn(x) ? x : null, N = C === void 0 ? o.state.floatingElement : C;
  o.useSyncedValue("referenceElement", x ?? null), o.useSyncedValue("domReferenceElement", x === void 0 ? d : _), o.useSyncedValue("floatingElement", N);
  const I = b.useCallback((se) => {
    const fe = dn(se) ? {
      getBoundingClientRect: () => se.getBoundingClientRect(),
      getClientRects: () => se.getClientRects(),
      contextElement: se
    } : se;
    v(fe), T.refs.setReference(fe);
  }, [T.refs]), q = b.useCallback((se) => {
    (dn(se) || se === null) && (A.current = se, y(se)), (dn(T.refs.reference.current) || T.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    se !== null && !dn(se)) && T.refs.setReference(se);
  }, [T.refs, y]), Y = b.useCallback((se) => {
    w(se), T.refs.setFloating(se);
  }, [T.refs]), L = b.useMemo(() => ({
    ...T.refs,
    setReference: q,
    setFloating: Y,
    setPositionReference: I,
    domReference: A
  }), [T.refs, q, Y, I]), X = b.useMemo(() => ({
    ...T.elements,
    domReference: d
  }), [T.elements, d]), te = b.useMemo(() => ({
    ...T,
    dataRef: o.context.dataRef,
    open: m,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: L,
    elements: X,
    nodeId: r,
    rootStore: o
  }), [T, L, X, r, o, m, g]);
  return Qe(() => {
    d && (A.current = d);
  }, [d]), Qe(() => {
    o.context.dataRef.current.floatingContext = te;
    const se = O?.nodesRef.current.find((fe) => fe.id === r);
    se && (se.context = te);
  }), b.useMemo(() => ({
    ...T,
    context: te,
    refs: L,
    elements: X,
    rootStore: o
  }), [T, L, X, te, o]);
}
const oT = "Escape";
function Av(n) {
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
  return Tu(o, n === Am || n === wu, n === hr || n === mr);
}
function oh(n, o, r) {
  return Tu(o, n === wu, r ? n === hr : n === mr) || n === "Enter" || n === " " || n === "";
}
function iT(n, o, r) {
  return Tu(o, r ? n === hr : n === mr, n === wu);
}
function rT(n, o, r, a) {
  const c = r ? n === mr : n === hr, f = n === Am;
  return o === "both" || o === "horizontal" && a ? n === oT : Tu(o, c, f);
}
function aT(n, o) {
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
    rtl: v = !1,
    virtual: x = !1,
    focusItemOnOpen: y = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: w = !0,
    disabledIndices: A = void 0,
    orientation: O = "vertical",
    parentOrientation: M,
    id: T,
    resetOnPointerLeave: _ = !0,
    externalTree: N,
    grid: I
  } = o, q = I != null, Y = "rootStore" in n ? n.rootStore : n, L = Y.useState("open"), X = Y.useState("floatingElement"), te = Y.useState("domReferenceElement"), se = Y.context.dataRef, fe = zh(X), le = Nh(te), he = gl(fe), be = c1(), V = Mu(N), H = b.useRef(y), F = b.useRef(d ?? -1), ve = b.useRef(null), ae = b.useRef(!0), z = Fe((Q) => {
    c(F.current === -1 ? null : F.current, Q);
  }), K = b.useRef(!!X), ne = b.useRef(L), oe = b.useRef(!1), pe = b.useRef(!1), we = b.useRef(null), qe = gl(A), Ae = gl(L), Te = gl(d), it = gl(_), pt = ps(), ze = ps(), et = Fe(() => {
    function Q(Ge) {
      x ? V?.events.emit("virtualfocus", Ge) : we.current = Zc(Ge, {
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
    f && (L && X ? (F.current = d ?? -1, H.current && d != null && (pe.current = !0, z())) : K.current && (F.current = -1, z()));
  }, [f, L, X, d, z]), Qe(() => {
    if (f) {
      if (!L) {
        oe.current = !1;
        return;
      }
      if (X)
        if (a == null) {
          if (oe.current = !1, Te.current != null)
            return;
          if (K.current && (F.current = -1, et()), (!ne.current || !K.current) && H.current && (ve.current != null || H.current === !0 && ve.current == null)) {
            let Q = 0;
            const ce = () => {
              r.current[0] == null ? (Q < 2 && (Q ? (Ce) => ze.request(Ce) : queueMicrotask)(ce), Q += 1) : (F.current = ve.current == null || oh(ve.current, O, v) || h ? Zd(r) : fv(r), ve.current = null, z());
            };
            ce();
          }
        } else bs(r.current, a) || (F.current = a, et(), pe.current = !1);
    }
  }, [f, L, X, a, Te, h, r, O, v, z, et, ze]), Qe(() => {
    if (!f || X || !V || x || !K.current)
      return;
    const Q = V.nodesRef.current, ce = Q.find((Ge) => Ge.id === be)?.context?.elements.floating, He = Xl($t(te ?? ce ?? null)), Ce = Q.some((Ge) => Ge.context && at(Ge.context.elements.floating, He));
    ce && !Ce && ae.current && ce.focus({
      preventScroll: !0
    });
  }, [f, X, te, V, be, x]), Qe(() => {
    ne.current = L, K.current = !!X;
  }), Qe(() => {
    L || (ve.current = null, H.current = y);
  }, [L, y]);
  const Ne = a != null, Le = Fe((Q) => {
    if (!Ae.current)
      return;
    const ce = r.current.indexOf(Q.currentTarget);
    ce !== -1 && (F.current !== ce || a !== ce) && (F.current = ce, z(Q));
  }), Ue = Fe(() => M ?? V?.nodesRef.current.find((Q) => Q.id === be)?.context?.dataRef?.current.orientation), _e = Fe(() => Zd(r, qe.current)), Ze = Fe((Q) => {
    if (ae.current = !1, oe.current = !0, Q.which === 229 || !Ae.current && Q.currentTarget === he.current)
      return;
    if (h && rT(Q.key, O, v, q)) {
      Bc(Q.key, Ue()) || On(Q), Y.setOpen(!1, vt(Oh, Q.nativeEvent)), Kt(te) && (x ? V?.events.emit("virtualfocus", te) : te.focus());
      return;
    }
    const ce = F.current, He = Zd(r, A), Ce = fv(r, A);
    if (le || (Q.key === "Home" && (On(Q), F.current = He, z(Q)), Q.key === "End" && (On(Q), F.current = Ce, z(Q))), I != null) {
      const Ge = I(Q, F.current, r, O, g, v, A, He, Ce);
      if (Ge != null && (F.current = Ge, z(Q)), O === "both")
        return;
    }
    if (Bc(Q.key, O)) {
      if (On(Q), L && !x && Xl(Q.currentTarget.ownerDocument) === Q.currentTarget) {
        F.current = oh(Q.key, O, v) ? He : Ce, z(Q);
        return;
      }
      oh(Q.key, O, v) ? g ? ce >= Ce ? m && ce !== r.current.length ? F.current = -1 : (oe.current = !1, F.current = He) : F.current = tl(r.current, {
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
      Av(ce) || (oe.current = !0, pe.current = !1, C && Le(ce));
    },
    onPointerLeave(ce) {
      if (!Ae.current || !ae.current || ce.pointerType === "touch")
        return;
      oe.current = !0;
      const He = ce.relatedTarget;
      if (!(!C || r.current.includes(He)) && it.current && (we.current?.(), we.current = null, F.current = -1, z(ce), !x)) {
        const Ce = he.current, Ge = Xl($t(Ce));
        Ce && at(Ce, Ge) && Ce.focus({
          preventScroll: !0
        });
      }
    }
  }), [Le, Ae, he, C, r, z, it, x]), We = b.useMemo(() => x && L && Ne && {
    "aria-activedescendant": `${T}-${a}`
  }, [x, L, Ne, T, a]), tt = b.useMemo(() => ({
    "aria-orientation": O === "both" ? void 0 : O,
    ...le ? {} : We,
    onKeyDown(Q) {
      if (Q.key === "Tab" && Q.shiftKey && L && !x) {
        const ce = Nl(Q.nativeEvent);
        if (ce && !at(he.current, ce))
          return;
        On(Q), Y.setOpen(!1, vt(xu, Q.nativeEvent)), Kt(te) && te.focus();
        return;
      }
      Ze(Q);
    },
    onPointerMove(Q) {
      Av(Q) || (ae.current = !0);
    }
  }), [We, Ze, he, O, le, Y, L, x, te]), Xe = b.useMemo(() => {
    function Q(Ce) {
      Y.setOpen(!0, vt(Oh, Ce.nativeEvent, Ce.currentTarget));
    }
    function ce(Ce) {
      y === "auto" && Fx(Ce.nativeEvent) && (H.current = !x);
    }
    function He(Ce) {
      H.current = y, y === "auto" && _m(Ce.nativeEvent) && (H.current = !0);
    }
    return {
      onKeyDown(Ce) {
        const Ge = Y.select("open");
        ae.current = !1;
        const nt = Ce.key.startsWith("Arrow"), Tt = iT(Ce.key, Ue(), v), St = Bc(Ce.key, O), Bt = (h ? Tt : St) || Ce.key === "Enter" || Ce.key.trim() === "";
        if (x && Ge)
          return Ze(Ce);
        if (!(!Ge && !w && nt)) {
          if (Bt) {
            const Nt = Bc(Ce.key, Ue());
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
        Y.select("open") && !x && (F.current = -1, z(Ce));
      },
      onPointerDown: He,
      onPointerEnter: He,
      onMouseDown: ce,
      onClick: ce
    };
  }, [Ze, y, _e, h, z, Y, w, O, Ue, v, Te, x]), ye = b.useMemo(() => ({
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
function sT(n, o) {
  const {
    listRef: r,
    elementsRef: a,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: m,
    enabled: g = !0,
    resetMs: h = 750,
    selectedIndex: v = null
  } = o, x = "rootStore" in n ? n.rootStore : n, y = x.useState("open"), C = Vi(), w = b.useRef(""), A = b.useRef(v ?? c ?? -1), O = b.useRef(null), M = Fe((N) => {
    function I(he) {
      return a?.current[he];
    }
    function q(he) {
      const be = I(he);
      return be && !_u(be) || be?.matches(":disabled") ? !1 : d == null || !ru(ia, he, d);
    }
    function Y(he, be, V = 0) {
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
    const L = r.current;
    if (w.current.length > 0 && N.key === " " && (On(N), m?.(!0)), w.current.length > 0 && w.current[0] !== " " && Y(L, w.current) === -1 && N.key !== " " && m?.(!1), L == null || // Character key.
    N.key.length !== 1 || // Modifier key.
    N.ctrlKey || N.metaKey || N.altKey)
      return;
    y && N.key !== " " && (On(N), m?.(!0));
    const X = w.current === "";
    X && (A.current = v ?? c ?? -1), L.every((he, be) => he && q(be) ? he[0]?.toLowerCase() !== he[1]?.toLowerCase() : !0) && w.current === N.key && (w.current = "", A.current = O.current), w.current += N.key, C.start(h, () => {
      w.current = "", A.current = O.current, m?.(!1);
    });
    const fe = ((X ? v ?? c ?? -1 : A.current) ?? 0) + 1, le = Y(L, w.current, fe);
    le !== -1 ? (f?.(le), O.current = le) : N.key !== " " && (w.current = "", m?.(!1));
  }), T = Fe((N) => {
    const I = N.relatedTarget, q = x.select("domReferenceElement"), Y = x.select("floatingElement");
    at(q, I) || at(Y, I) || (C.clear(), w.current = "", A.current = O.current, m?.(!1));
  });
  Qe(() => {
    !y && v !== null || (C.clear(), O.current = null, w.current !== "" && (w.current = ""));
  }, [y, v, C]);
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
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = ov.startingStyle] = "startingStyle", n[n.endingStyle = ov.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const cT = {
  "data-popup-open": ""
}, uT = {
  "data-popup-open": "",
  "data-pressed": ""
}, fT = {
  "data-open": ""
}, dT = {
  "data-closed": ""
}, hT = {
  "data-anchor-hidden": ""
}, mT = {
  open(n) {
    return n ? cT : null;
  }
}, pT = {
  open(n) {
    return n ? uT : null;
  }
}, zm = {
  open(n) {
    return n ? fT : dT;
  },
  anchorHidden(n) {
    return n ? hT : null;
  }
};
({
  ...zm,
  ...Su
});
function gT(n) {
  return bm(19) ? n : n ? "true" : void 0;
}
const bT = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
function yT(n) {
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
function vT(n, o) {
  const r = Fe((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (Ts ? "touch" : ""));
  }), {
    onClick: a,
    onPointerDown: c
  } = yT(r);
  return b.useMemo(() => ({
    onClick: a,
    onPointerDown: c
  }), [a, c]);
}
function xT(n) {
  const [o, r] = b.useState(null), a = vT(n, r);
  return ra(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: a
  }), [o, a]);
}
function ST(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function ET(n, o, r, a, c, f, d, m, g, h = 2) {
  const v = m2(r.current, {
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
  return bs(r.current, v) ? void 0 : v;
}
const h1 = /* @__PURE__ */ b.createContext(void 0), m1 = /* @__PURE__ */ b.createContext(void 0), p1 = /* @__PURE__ */ b.createContext(void 0), g1 = /* @__PURE__ */ b.createContext(!1), b1 = /* @__PURE__ */ b.createContext("");
function Dl() {
  const n = b.useContext(h1);
  if (!n)
    throw new Error(Ro(22));
  return n;
}
function Ou() {
  const n = b.useContext(m1);
  if (!n)
    throw new Error(Ro(23));
  return n;
}
function Os() {
  const n = b.useContext(p1);
  if (!n)
    throw new Error(Ro(24));
  return n;
}
function Dm() {
  return b.useContext(b1);
}
function CT() {
  return b.useContext(g1);
}
const RT = (n, o) => Object.is(n, o);
function Ii(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function wT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((a) => a === void 0 ? !1 : Ii(o, a, r));
}
function y1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((a) => a === void 0 ? !1 : Ii(a, o, r));
}
function ih(n, o, r, a) {
  const c = a && Array.isArray(o) ? o[o.length - 1] : o, f = y1(n, c, r);
  return f === -1 ? null : f;
}
function _T(n, o, r) {
  return n.filter((a) => !Ii(o, a, r));
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
function jm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function AT(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (jm(o)) {
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
  return Lh(n);
}
function cs(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? Lh(n.value) : Lh(n);
}
function v1(n, o, r) {
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
    const c = o, f = jm(c) ? c.flatMap((d) => d.items) : c;
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
  hasNullItemLabel: (n, o) => o ? AT(n.items) : !1,
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
}, TT = {
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
}, OT = {
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
    state: TT,
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
  state: OT,
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
}, C1 = /* @__PURE__ */ b.createContext(E1);
function ya(n = !0) {
  const o = b.useContext(C1);
  if (o.setValidityData === Xt && !n)
    throw new Error(Ro(28));
  return o;
}
function R1(n, o, r, a, c = !0, f) {
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
const kT = /* @__PURE__ */ b.createContext({
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
  return b.useContext(kT);
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
function ku() {
  return b.useContext(NT);
}
function Lm(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: a
  } = n, {
    controlId: c,
    registerControlId: f
  } = ku(), d = vu(o), m = r ? c : void 0, g = zl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), v = b.useRef(o != null), x = Fe(() => {
    !h.current || f === Xt || (h.current = !1, f(g.current, void 0));
  });
  return Qe(() => {
    if (f === Xt)
      return;
    let y;
    if (r) {
      const C = a?.current;
      dn(C) && C.closest("label") != null ? y = o ?? null : y = m ?? d;
    } else if (o != null)
      v.current = !0, y = o;
    else if (v.current)
      y = d;
    else {
      x();
      return;
    }
    if (y === void 0) {
      x();
      return;
    }
    h.current = !0, f(g.current, y);
  }, [o, a, m, f, r, d, g, x]), b.useEffect(() => x, [x]), c ?? d;
}
function _1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function zT(n, o) {
  return (r, a) => r == null ? !1 : n.contains(r, a, o);
}
function A1(n) {
  return Array.isArray(n) ? n.map((o) => A1(o)).join(",") : n == null ? "" : String(n);
}
const Mv = /* @__PURE__ */ new Map();
function DT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${A1(n.locale)}|${JSON.stringify(o)}`, a = Mv.get(r);
  if (a)
    return a;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, g) {
      if (!m)
        return !0;
      const h = ro(d, g);
      for (let v = 0; v <= h.length - m.length; v += 1)
        if (c.compare(h.slice(v, v + m.length), m) === 0)
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
      const h = ro(d, g), v = m.length;
      return h.length >= v && c.compare(h.slice(h.length - v), m) === 0;
    }
  };
  return Mv.set(r, f), f;
}
const jT = DT;
function LT(n, o = !1) {
  const {
    overflowY: r
  } = yl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function VT(n, o, r = (a, c) => a === c) {
  return n.length === o.length && n.every((a, c) => r(a, o[c]));
}
const M1 = /* @__PURE__ */ Symbol("none"), rh = {
  value: M1,
  index: -1
}, IT = /* @__PURE__ */ b.createContext(void 0);
function Vm() {
  return b.useContext(IT)?.direction ?? "ltr";
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
    selectionMode: v,
    onItemHighlighted: x,
    name: y,
    form: C,
    disabled: w = !1,
    readOnly: A = !1,
    required: O = !1,
    inputRef: M,
    grid: T = !1,
    items: _,
    filteredItems: N,
    filter: I,
    openOnInputClick: q = !0,
    autoHighlight: Y = !1,
    keepHighlight: L = !1,
    highlightItemOnHover: X = !0,
    loopFocus: te = !0,
    itemToStringLabel: se,
    itemToStringValue: fe,
    isItemEqualToValue: le = RT,
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
  } = w1(), {
    setDirty: oe,
    validityData: pe,
    setFilled: we,
    name: qe,
    disabled: Ae,
    setTouched: Te,
    setFocused: it,
    validationMode: pt,
    validation: ze
  } = ya(), et = Vm(), Ne = Lm({
    id: o
  }), Le = jT({
    locale: z
  }), [Ue, _e] = b.useState(!1), [Ze, Oe] = b.useState(null), We = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ye = b.useRef(null), Q = b.useRef(null), ce = b.useRef(null), He = b.useRef(null), Ce = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Tt = b.useRef(null), St = b.useRef(null), Bt = b.useRef(rh), Nt = b.useRef(null), xt = b.useRef([]), on = b.useRef(null), st = Ae || w, Et = qe ?? y, Jt = v === "multiple", Rn = v === "single", Ft = m !== void 0 || d !== void 0, Wt = _ !== void 0, ot = N !== void 0;
  let ut;
  Y === "always" ? ut = "always" : ut = Y ? "input-change" : !1;
  const [Ke, Qt] = Fc({
    controlled: c,
    default: Jt ? a ?? ia : a,
    name: "Combobox",
    state: "selectedValue"
  }), wn = b.useMemo(() => I === null ? () => !0 : I !== void 0 ? I : zT(Le, se), [I, Le, se]), _n = zl(() => Ft ? d ?? "" : Rn ? ro(Ke, se) : "").current, [Yt, nl] = Fc({
    controlled: m,
    default: _n,
    name: "Combobox",
    state: "inputValue"
  }), [zt, so] = Fc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Fn = jm(_), rn = Ze ?? String(Yt).trim(), co = Rn ? ro(Ke, se) : "", jl = Rn && !Ue && rn !== "" && co.length === rn.length && Le.contains(co, rn), ll = jl ? "" : rn, wo = Wt && ot && jl, an = b.useMemo(() => _ ? Fn ? _.flatMap((G) => G.items) : _ : ia, [_, Fn]), Ct = b.useMemo(() => {
    if (N && !wo)
      return N;
    if (!_)
      return ia;
    if (Fn) {
      const Z = _, Se = [];
      let Re = 0;
      for (const Ie of Z) {
        if (F > -1 && Re >= F)
          break;
        const ke = F > -1 ? F - Re : 1 / 0, Me = ll === "" ? Ie.items.slice(0, ke) : [];
        if (ll !== "")
          for (const wt of Ie.items) {
            if (Me.length >= ke)
              break;
            wn(wt, ll, se) && Me.push(wt);
          }
        if (Me.length > 0) {
          const wt = {
            ...Ie,
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
    const G = [];
    for (const Z of an) {
      if (F > -1 && G.length >= F)
        break;
      wn(Z, ll, se) && G.push(Z);
    }
    return G;
  }, [N, wo, _, Fn, ll, F, wn, se, an]), Rt = b.useMemo(() => Fn ? Ct.flatMap((Z) => Z.items) : Ct, [Ct, Fn]), Ye = zl(() => {
    let G = null;
    return be && zt && Wt && v !== "none" && (G = ih(Rt, Ke, le, Jt)), new d1({
      id: Ne,
      labelId: void 0,
      selectedValue: Ke,
      open: zt,
      items: _,
      selectionMode: v,
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
      selectedIndex: G,
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
      inputOwnsFormValue: v === "none",
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
  }).current, Gn = v === "none" ? Yt : Ke, Gi = b.useMemo(() => v === "none" ? Gn : Array.isArray(Ke) ? Ke.map((G) => cs(G, fe)) : cs(Ke, fe), [Gn, fe, v, Ke]), dt = Fe(x), Yi = Fe(r), Jl = xe(Ye, Ee.activeIndex), uo = xe(Ye, Ee.selectedIndex), Yn = xe(Ye, Ee.positionerElement), Ll = xe(Ye, Ee.listElement), ol = xe(Ye, Ee.triggerElement), il = xe(Ye, Ee.inputElement), en = xe(Ye, Ee.inputGroupElement), mn = xe(Ye, Ee.inline), An = xe(Ye, Ee.inputInsidePopup), Wl = xe(Ye, Ee.inputOwnsFormValue), vl = gl(ol), {
    mounted: qi,
    setMounted: $o,
    transitionStatus: Jo
  } = wm(zt), {
    openMethod: Ar,
    triggerProps: eo
  } = xT(zt), Wo = Fe(() => Gi);
  R1(An ? vl : ye, Ne, Gn, Wo, !st, y);
  const rl = Fe(() => {
    _ ? tt.current = Rt.map((G) => ro(G, se)) : Ye.set("forceMounted", !0);
  }), sn = Fe((G, Z, Se) => {
    if (Z === -1) {
      if (Bt.current === rh)
        return;
      Bt.current = rh;
    } else
      Bt.current = {
        value: G,
        index: Z
      };
    dt(G, HM(Se, void 0, {
      index: Z
    }));
  }), Qn = Fe((G) => {
    Ye.update(G);
    const Z = G.activeIndex;
    if (Z === void 0)
      return;
    const Se = G.type || Kl;
    Z === null ? sn(void 0, -1, Se) : sn(xt.current[Z], Z, Se);
  }), Zn = Fe((G, Z) => {
    if (Ge.current = Z.reason === vo, n.onInputValueChange?.(G, Z), !Z.isCanceled) {
      if (Z.reason === hs) {
        zt && Ze !== null && Oe(null);
        const Se = Z.event, Re = Se.inputType;
        if (Se.type === "compositionend" || Re != null && Re !== "" && Re !== "insertReplacementText") {
          const ke = G.trim() !== "";
          ke && _e(!0), Nt.current = {
            hasQuery: ke
          };
          const Me = Ye.state.listElement;
          if (!Ye.state.virtualized && Me) {
            const wt = Xe.current;
            for (const Ht of ha(Me.firstElementChild ?? Me)) {
              if (!Kt(Ht) || (wt ? !at(wt, Ht) : Ht.getAttribute("role") === "dialog"))
                break;
              if (LT(Ht)) {
                Ht.scrollTop = 0;
                break;
              }
            }
          }
          ke && ut && Ye.state.activeIndex == null && (zt || mn) && Ye.set("activeIndex", 0);
        }
      } else Z.reason === vo && G === "" && Ye.state.inputInsidePopup && (Nt.current = {
        hasQuery: !1,
        selection: !0
      });
      nl(G);
    }
  }), zn = Fe((G, Z) => {
    if (zt !== G && (Z.reason === Em && Wt && Rt.length === 0 && !He.current && Z.allowPropagation(), n.onOpenChange?.(G, Z), !Z.isCanceled && (G && An && !mn && Ze !== null && (_e(!1), Oe(null), Yt !== "" && Z.reason !== hs && Zn("", vt(vo, Z.event))), !G && Ue && (Rn ? (mn || Oe(rn), rn === "" && _e(!1)) : Jt && (mn || Oe(rn), An && Qn({
      activeIndex: null
    }), (!An || mn) && Zn("", vt(vo, Z.event)))), so(G), !G && An && (Z.reason === xu || Z.reason === Sm) && (Te(!0), it(!1), pt === "onBlur")))) {
      const Se = v === "none" ? Yt : Ke;
      ze.commit(Se);
    }
  }), Dn = Fe((G, Z) => {
    if (f?.(G, Z), Z.isCanceled)
      return;
    Qt(G), (v === "none" && Xe.current && V || Rn && !Ye.state.inputInsidePopup) && Zn(ro(G, se), vt(Z.reason, Z.event));
  }), _o = Fe((G, Z) => {
    const Se = Nl(G), Re = St.current ?? G;
    St.current = null;
    const Ie = vt(jM, Re), ke = Se?.closest("a")?.getAttribute("href");
    if (ke) {
      ke.startsWith("#") && zn(!1, Ie);
      return;
    }
    if (Jt) {
      const Me = Array.isArray(Ke) ? Ke : [], Ht = wT(Me, Z, le) ? _T(Me, Z, le) : [...Me, Z];
      if (Dn(Ht, Ie), Ie.isCanceled || !(ye.current ? ye.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? Zn("", vt(vo, Ie.event)) : zn(!1, Ie);
    } else {
      if (Dn(Z, Ie), Ie.isCanceled)
        return;
      zn(!1, Ie);
    }
  }), va = Fe(() => {
    const G = ze.inputRef.current?.form ?? Ye.state.inputElement?.form;
    G && typeof G.requestSubmit == "function" && G.requestSubmit();
  }), Mn = Fe(() => {
    if ($o(!1), Yi?.(!1), _e(!1), Oe(null), Qn(v === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), Jt && ye.current && ye.current.value !== "" && !Ge.current && Zn("", vt(vo)), Rn)
      if (Ye.state.inputInsidePopup)
        ye.current && ye.current.value !== "" && Zn("", vt(vo));
      else {
        const G = ro(Ke, se);
        ye.current && ye.current.value !== G && Zn(G, vt(G === "" ? vo : Kl));
      }
  }), Pi = b.useMemo(() => mn && Yn ? {
    current: Yn.closest('[role="dialog"]')
  } : Xe, [mn, Yn]);
  Eu({
    enabled: !n.actionsRef,
    open: zt,
    ref: Pi,
    onComplete() {
      zt || Mn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: Mn
  }), [Mn]), Qe(function() {
    if (zt || (on.current = null, v === "none"))
      return;
    const Z = Wt ? an : xt.current;
    Qn({
      selectedIndex: ih(Z, Ke, le, Jt)
    });
  }, [zt, Ke, v, Jt, Wt, an, le, Qn]), Qe(() => {
    _ && (xt.current = Rt, We.current.length = Rt.length);
  }, [_, Rt]), Qe(() => {
    const G = Nt.current;
    if (G) {
      const wt = zt || mn || Ye.state.positionerElement?.hidden === !1;
      if (G.hasQuery)
        ut && wt && Ye.set("activeIndex", 0), Nt.current = null;
      else if (String(Yt).trim() === "" && (Nt.current = null, wt)) {
        const Ht = G.selection;
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
    const Ie = Se[Re], ke = Bt.current.value, Me = ke !== M1 && Ii(Ie, ke, Ye.state.isItemEqualToValue);
    (Bt.current.index !== Re || !Me) && sn(Ie, Re, Kl);
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
    if (v === "none") {
      we(String(Yt) !== "");
      return;
    }
    we(Jt ? Array.isArray(Ke) && Ke.length > 0 : Ke != null);
  }, [we, v, Yt, Ke, Jt]), b.useEffect(() => {
    Wt && ut && Rt.length === 0 && Qn({
      activeIndex: null
    });
  }, [Wt, ut, Rt.length, Qn]);
  function Mr(G) {
    const Z = pe.initialValue;
    return Array.isArray(G) && Array.isArray(Z) ? !VT(G, Z, (Se, Re) => Ii(Se, Re, le)) : G !== Z;
  }
  ra(rn, () => {
    !zt || rn === "" || rn === String(_n) || _e(!0);
  });
  function ei() {
    const G = ro(Ke, se);
    Yt !== G && Zn(G, vt(Kl));
  }
  ra(Ke, () => {
    v !== "none" && (ne(Et), oe(Mr(Ke)), ze.change(Ke), Rn && !Ft && !An && ei());
  }), ra(Yt, () => {
    v === "none" && (ne(Et), oe(Yt !== pe.initialValue), ze.change(Yt));
  }), ra(_, () => {
    !Rn || Ft || An || Ue || ei();
  });
  const xl = tT({
    open: mn ? !0 : zt,
    onOpenChange: zn,
    elements: {
      reference: An ? ol : il,
      floating: Yn
    }
  }), Xi = T ? "grid" : "listbox", Ao = zt || mn, Vl = Ao ? "true" : "false", al = b.useMemo(() => {
    const G = il?.tagName === "INPUT", Z = il == null || G, Se = Z || Ao, Re = Z ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return Se && (Re.role = "combobox", Re["aria-expanded"] = Vl, Re["aria-haspopup"] = Xi, Re["aria-controls"] = Ao ? Ll?.id : void 0, Re["aria-autocomplete"] = ve), {
      reference: Re,
      floating: {
        role: "presentation"
      }
    };
  }, [il, Ao, Vl, Xi, Ll?.id, ve]), ti = u1(xl, {
    enabled: !A && !st && q,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: An ? 0 : 100,
    reason: VM
  }), cn = H2(xl, {
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
    outsidePress(G) {
      const Z = Nl(G);
      return !at(ol, Z) && !at(Tt.current, Z) && !at(nt.current, Z) && !at(en, Z);
    }
  }), sl = aT(xl, {
    enabled: !A && !st,
    id: Ne,
    listRef: We,
    activeIndex: Jl,
    selectedIndex: uo,
    virtual: !0,
    loopFocus: te,
    allowEscape: te && !ut,
    focusItemOnOpen: Ue || v === "none" && !ut ? !1 : "auto",
    focusItemOnHover: X,
    resetOnPointerLeave: !L,
    orientation: T ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: ia,
    grid: T ? ET : void 0,
    onNavigate(G, Z) {
      !Z && !zt || Jo === "ending" || Qn(Z ? {
        activeIndex: G,
        type: Ce.current ? Cm : Rm
      } : {
        activeIndex: G
      });
    }
  }), to = b.useMemo(() => sa(sl.reference, {
    onKeyDown(G) {
      T && Ye.state.activeIndex == null && (G.key === "ArrowLeft" || G.key === "ArrowRight") && G.preventBaseUIHandler();
    }
  }, cn.reference, ti.reference, al.reference), [sl.reference, cn.reference, ti.reference, al.reference, T, Ye]), Mo = b.useMemo(() => sa(W2, cn.floating), [cn.floating]), no = b.useMemo(() => sa(sl.floating, al.floating), [sl.floating, al.floating]), $n = b.useMemo(() => {
    const G = sl.item;
    return G ? {
      ...G,
      onFocus: void 0
    } : bl;
  }, [sl.item]);
  ST(() => {
    Ye.update({
      inline: be,
      popupProps: Mo,
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
      id: Ne,
      selectedValue: Ke,
      open: zt,
      mounted: qi,
      transitionStatus: Jo,
      items: _,
      inline: be,
      popupProps: Mo,
      listProps: no,
      inputProps: to,
      triggerProps: eo,
      openMethod: Ar,
      itemProps: $n,
      selectionMode: v,
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
      inputOwnsFormValue: v === "none" && (be || !Ye.state.inputInsidePopup)
    });
  }, [Ye, Ne, Ke, zt, qi, Jo, _, Mo, no, to, $n, Ar, eo, v, Et, st, A, O, T, he, q, se, H, le, K, Ft, be, ut, C]);
  const R = br(M, ze.inputRef), k = b.useMemo(() => ({
    query: rn,
    hasItems: Wt,
    filteredItems: Ct,
    flatFilteredItems: Rt
  }), [rn, Wt, Ct, Rt]), D = b.useMemo(() => Array.isArray(Gn) ? "" : cs(Gn, fe), [Gn, fe]), U = Jt && Array.isArray(Ke) && Ke.length > 0, ee = Jt || v === "none" && Wl ? void 0 : Et, re = b.useMemo(() => !Jt || !Array.isArray(Ke) || !Et ? null : Ke.map((G) => {
    const Z = cs(G, fe);
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
        onChange(G) {
          if (G.nativeEvent.defaultPrevented || st || A)
            return;
          const Z = G.currentTarget.value, Se = Z.toLowerCase(), Re = vt(Kl, G.nativeEvent), Ie = () => xt.current.findIndex((Me) => cs(Me, fe).toLowerCase() === Se || ro(Me, se).toLowerCase() === Se);
          function ke() {
            if (Jt)
              return;
            if (v === "none") {
              Zn(Z, Re);
              return;
            }
            let Me = Ie();
            Me === -1 && (Me = xt.current.findIndex((Ht, tn) => {
              const Jn = tt.current[tn];
              return Jn != null && Jn.toLowerCase() === Se;
            }));
            const wt = Me === -1 ? void 0 : xt.current[Me];
            wt != null && Dn?.(wt, Re);
          }
          Rn && (rl(), _ && Ie() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(ke);
        }
      }),
      id: Ne && ee == null ? `${Ne}-hidden-input` : void 0,
      form: C,
      name: ee,
      autoComplete: ae,
      disabled: st,
      required: O && !U,
      readOnly: A,
      value: D,
      ref: R,
      style: ee ? Om : Tm,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), re]
  });
  return /* @__PURE__ */ S.jsx(h1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(m1.Provider, {
      value: xl,
      children: /* @__PURE__ */ S.jsx(g1.Provider, {
        value: Wt,
        children: /* @__PURE__ */ S.jsx(p1.Provider, {
          value: k,
          children: /* @__PURE__ */ S.jsx(b1.Provider, {
            value: Yt,
            children: ge
          })
        })
      })
    })
  });
}
const T1 = {
  ...pT,
  ...S1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Gc = 5;
function UT(n, o) {
  const r = BT(o);
  return n.clientX >= r.left - Gc && n.clientX <= r.right + Gc && n.clientY >= r.top - Gc && n.clientY <= r.bottom + Gc;
}
function BT(n) {
  const o = n.getBoundingClientRect(), r = hn(n);
  if (Kx)
    return o;
  const a = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(a.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(a.width) || 0, m = parseFloat(a.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, v = Math.max(o.width, d, g), x = Math.max(o.height, m, h), y = v - o.width, C = x - o.height;
  return {
    left: o.left - y / 2,
    right: o.right + y / 2,
    top: o.top - C / 2,
    bottom: o.bottom + C / 2
  };
}
function GT(n, o) {
  return n ?? o;
}
function O1(n) {
  const o = xe(n, Ee.mounted), r = xe(n, Ee.popupSide), a = xe(n, Ee.positionerElement);
  return o && a ? r : null;
}
function Nu() {
  return Os().filteredItems.length === 0;
}
function YT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function qT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function k1(n, o, r) {
  const a = n.state.listRef.current[o];
  a && (n.state.selectionEventRef.current = r, a.click(), n.state.selectionEventRef.current = null);
}
const PT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: m,
    style: g,
    ...h
  } = o, {
    state: v,
    disabled: x,
    setTouched: y,
    setFocused: C,
    validationMode: w,
    validation: A
  } = ya(), {
    labelId: O
  } = ku(), M = Dl(), T = xe(M, Ee.selectionMode), _ = xe(M, Ee.disabled), N = xe(M, Ee.readOnly), I = xe(M, Ee.required), q = xe(M, Ee.positionerElement), Y = xe(M, Ee.listElement), L = xe(M, Ee.popupId), X = xe(M, Ee.triggerProps), te = xe(M, Ee.inputInsidePopup), se = xe(M, Ee.id), fe = xe(M, Ee.labelId), le = xe(M, Ee.open), he = xe(M, Ee.selectedValue), be = xe(M, Ee.activeIndex), V = xe(M, Ee.selectedIndex), H = xe(M, Ee.hasSelectedValue), F = Ou(), ve = Dm(), ae = Vi(), z = x || _ || d, K = Nu(), ne = O1(M);
  Lm({
    id: te ? m : void 0
  });
  const oe = te ? m ?? se : m, pe = GT(O, fe);
  let we;
  le && te ? we = L ?? _1(se) : le && (we = Y?.id);
  const qe = b.useRef("");
  function Ae(Ue) {
    qe.current = Ue.pointerType;
  }
  const {
    reference: Te
  } = sT(F, {
    enabled: !le && !N && !_ && T === "single",
    listRef: M.state.labelsRef,
    activeIndex: be,
    selectedIndex: V,
    onMatch(Ue) {
      const _e = M.state.valuesRef.current[Ue];
      _e !== void 0 && M.state.setSelectedValue(_e, vt(Kl));
    }
  }), {
    reference: it
  } = u1(F, {
    enabled: !N && !_,
    event: "mousedown"
  }), {
    buttonRef: pt,
    getButtonProps: ze
  } = Ms({
    native: f,
    disabled: z
  }), et = {
    ...v,
    open: le,
    disabled: z,
    popupSide: ne,
    listEmpty: K,
    placeholder: T === "none" ? !1 : !H
  }, Ne = Fe((Ue) => {
    M.set("triggerElement", Ue);
  });
  return $l("button", o, {
    ref: [r, pt, Ne],
    state: et,
    props: [X, it, Te, {
      id: oe,
      tabIndex: te ? 0 : -1,
      role: te ? "combobox" : void 0,
      "aria-expanded": le,
      "aria-haspopup": te ? "dialog" : "listbox",
      "aria-controls": we,
      "aria-required": te && I || void 0,
      "aria-labelledby": pe,
      onPointerDown: Ae,
      onPointerEnter: Ae,
      onFocus() {
        C(!0), !(z || N) && ae.start(0, M.state.forceMount);
      },
      onBlur(Ue) {
        if (!at(q, Ue.relatedTarget) && (y(!0), C(!1), w === "onBlur")) {
          const _e = T === "none" ? ve : he;
          A.commit(_e);
        }
      },
      onMouseDown(Ue) {
        if (z || N || (te || F.set("domReferenceElement", Ue.currentTarget), M.state.forceMount(), qe.current !== "touch" && (M.state.inputRef.current?.focus(), te || Ue.preventDefault()), le))
          return;
        const _e = $t(Ue.currentTarget);
        function Ze(Oe) {
          const We = M.state.triggerElement;
          if (!We)
            return;
          const tt = Nl(Oe), Xe = M.state.positionerElement, ye = M.state.listElement;
          at(We, tt) || at(Xe, tt) || at(ye, tt) || UT(Oe, We) || M.state.setOpen(!1, vt(IM, Oe));
        }
        te && _e.addEventListener("mouseup", Ze, {
          once: !0
        });
      },
      onKeyDown(Ue) {
        N || (Ue.key === "ArrowDown" || Ue.key === "ArrowUp") && (On(Ue), M.state.setOpen(!0, vt(Oh, Ue.nativeEvent)), M.state.inputRef.current?.focus());
      }
    }, A.getValidationProps(z, h), ze],
    stateAttributesMapping: T1
  });
}), XT = /* @__PURE__ */ b.createContext(void 0);
function KT() {
  return b.useContext(XT);
}
const N1 = /* @__PURE__ */ b.createContext(void 0);
function Im(n) {
  const o = b.useContext(N1);
  if (o === void 0 && !n)
    throw new Error(Ro(21));
  return o;
}
const z1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Dl(), {
    buttonRef: c,
    getButtonProps: f
  } = Ms({
    native: !1
  }), d = br(r, c);
  function m(h) {
    a.state.setOpen(!1, vt(LM, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: m
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Om
  });
}), FT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    id: d,
    style: m,
    ...g
  } = o, {
    state: h,
    disabled: v,
    setTouched: x,
    setFocused: y,
    validationMode: C,
    validation: w
  } = ya(), {
    labelId: A
  } = ku(), O = KT(), T = !!Im(!0), _ = Dl(), N = Dm(), I = Vm(), q = xe(_, Ee.required), Y = xe(_, Ee.disabled), L = xe(_, Ee.readOnly), X = xe(_, Ee.name), te = xe(_, Ee.form), se = xe(_, Ee.selectionMode), fe = xe(_, Ee.autoHighlight), le = xe(_, Ee.inputProps), he = xe(_, Ee.triggerProps), be = xe(_, Ee.open), V = xe(_, Ee.mounted), H = xe(_, Ee.selectedValue), F = xe(_, Ee.id), ve = xe(_, Ee.inline), ae = xe(_, Ee.modal), z = !!fe, K = O1(_), ne = v || Y || f, oe = Nu(), pe = T || ve, we = !pe || ae, qe = vu(d ?? (pe ? void 0 : F)), Ae = T ? x1 : h, [Te, it] = b.useState(null), pt = b.useRef(!1), ze = b.useRef(null), et = b.useRef(!1), Ne = se === "none" && !T, Le = Fe((ye) => {
    const Q = T || _.state.inline;
    Q && !_.state.hasInputValue && _.state.setInputValue("", vt(Kl)), _.update({
      inputElement: ye,
      inputInsidePopup: Q,
      inputOwnsFormValue: Ne
    });
  }), Ue = T ? g : w.getValidationProps(ne, g);
  function _e() {
    _.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: _.state.keyboardActiveRef.current ? Cm : Rm
    });
  }
  function Ze() {
    _.state.keyboardActiveRef.current = !1;
  }
  const Oe = {
    ...Ae,
    open: be,
    disabled: ne,
    readOnly: L,
    popupSide: K,
    listEmpty: oe
  };
  function We(ye) {
    if (!O)
      return;
    let Q;
    const {
      highlightedChipIndex: ce
    } = O, He = O.chipsRef.current.length, [Ce, Ge] = YT(I);
    return ce !== void 0 ? (ye.key === Ce ? (ye.preventDefault(), ce > 0 ? Q = ce - 1 : Q = void 0) : ye.key === Ge ? (ye.preventDefault(), ce < He - 1 ? Q = ce + 1 : Q = void 0) : (ye.key === "Backspace" || ye.key === "Delete") && (ye.preventDefault(), Q = qT(ce, H.length), _e()), Q) : (ye.key === Ce && (ye.currentTarget.selectionStart ?? 0) === 0 && H.length > 0 && (ye.preventDefault(), Q = He > 0 ? He - 1 : void 0), Q);
  }
  const tt = $l("input", o, {
    state: Oe,
    ref: [r, _.state.inputRef, Le],
    props: [le, he, {
      value: Te ?? N,
      "aria-readonly": L || void 0,
      "aria-required": q || void 0,
      "aria-labelledby": A,
      disabled: ne,
      readOnly: L,
      required: se === "none" ? q : void 0,
      form: te,
      ...Ne && X && {
        name: X
      },
      id: qe,
      onFocus() {
        if (y(!0), !ve || !et.current)
          return;
        et.current = !1;
        const ye = ze.current;
        ye == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(_.state.valuesRef.current, ye) || _.state.setIndices({
          activeIndex: ye
        });
      },
      onBlur() {
        x(!0), y(!1);
        const ye = _.state.activeIndex;
        if (ve && ye !== null && fe !== "always" && (ze.current = ye, et.current = !0, _.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const Q = se === "none" ? N : H;
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
          L || ne || !Bt || !Ce || (_.state.setOpen(!0, vt(hs, Q)), z || _e());
        }
        if (pt.current) {
          const Bt = ye.currentTarget.value;
          it(Bt), Bt === "" && !_.state.openOnInputClick && !_.state.inputInsidePopup && _.state.setOpen(!1, vt(vo, Q));
          const Nt = Bt.trim(), xt = z && Nt !== "";
          Ge(Nt), be && _.state.activeIndex !== null && !xt && _e();
          return;
        }
        const nt = vt(hs, Q);
        if (_.state.setInputValue(ye.currentTarget.value, nt), nt.isCanceled)
          return;
        const Tt = ye.currentTarget.value === "", St = vt(vo, Q);
        Tt && !_.state.inputInsidePopup && (se === "single" && _.state.setSelectedValue(null, St), _.state.openOnInputClick || _.state.setOpen(!1, St)), Ge(ye.currentTarget.value.trim()), be && _.state.activeIndex !== null && !z && _e();
      },
      onKeyDown(ye) {
        if (ne || L || ye.ctrlKey || ye.shiftKey || ye.altKey || ye.metaKey)
          return;
        _.state.keyboardActiveRef.current = !0;
        const Q = ye.currentTarget, ce = Q.scrollWidth - Q.clientWidth, He = I === "rtl";
        if (ye.key === "Home") {
          On(ye);
          const nt = rv && He ? Q.value.length : 0;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = 0;
          return;
        }
        if (ye.key === "End") {
          On(ye);
          const nt = rv && He ? 0 : Q.value.length;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = He ? -ce : ce;
          return;
        }
        if (!V && ye.key === "Escape") {
          const nt = se === "multiple" && Array.isArray(H) ? H.length === 0 : H === null, Tt = vt(Em, ye.nativeEvent), St = se === "multiple" ? [] : null;
          _.state.setInputValue("", Tt), _.state.setSelectedValue(St, Tt), !nt && !_.state.inline && !Tt.isPropagationAllowed && ye.stopPropagation();
          return;
        }
        if (O && ye.key === "Backspace" && Q.value === "" && O.highlightedChipIndex === void 0 && Array.isArray(H) && H.length > 0) {
          const nt = O.chipsRef.current.length, Tt = nt > 0 ? nt - 1 : H.length - 1, St = H.filter((Bt, Nt) => Nt !== Tt);
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
          On(ye), k1(_, nt, Tt);
        }
      },
      onPointerMove: Ze,
      onPointerDown: Ze
    }, Ue],
    stateAttributesMapping: T1
  }), Xe = T ? /* @__PURE__ */ S.jsx(C1.Provider, {
    value: E1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [be && we && /* @__PURE__ */ S.jsx(z1, {
      ref: _.state.startDismissRef
    }), Xe]
  });
}), QT = {
  ...Su,
  ...mT
}, ZT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: m = !1,
    style: g,
    ...h
  } = o, {
    disabled: v
  } = ya(), x = Dl(), y = xe(x, Ee.selectionMode), C = xe(x, Ee.disabled), w = xe(x, Ee.readOnly), A = xe(x, Ee.open), O = xe(x, Ee.selectedValue), M = xe(x, Ee.hasSelectionChips), T = Dm();
  let _ = !1;
  y === "none" ? _ = T !== "" : y === "single" ? _ = O != null : _ = M;
  const N = v || C || f, {
    buttonRef: I,
    getButtonProps: q
  } = Ms({
    native: d,
    disabled: N
  }), {
    mounted: Y,
    transitionStatus: L,
    setMounted: X
  } = wm(_), te = {
    disabled: N,
    visible: _,
    open: A,
    transitionStatus: L
  };
  Eu({
    open: _,
    ref: x.state.clearRef,
    onComplete() {
      _ || X(!1);
    }
  });
  const se = $l("button", o, {
    state: te,
    ref: [r, I, x.state.clearRef],
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
        const he = x.state.keyboardActiveRef.current ? Cm : Rm;
        x.state.setInputValue("", vt(lv, le.nativeEvent)), y !== "none" ? (x.state.setSelectedValue(Array.isArray(O) ? [] : null, vt(lv, le.nativeEvent)), x.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: he
        })) : x.state.setIndices({
          activeIndex: null,
          type: he
        }), x.state.inputRef.current?.focus();
      }
    }, h, q],
    stateAttributesMapping: QT
  });
  return m || Y ? se : null;
}), $T = /* @__PURE__ */ b.createContext(null);
function JT() {
  return b.useContext($T);
}
function WT(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Os(), a = JT(), c = a ? a.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const eO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var a;
  const {
    render: c,
    className: f,
    style: d,
    children: m,
    ...g
  } = o, h = Dl(), v = Ou(), x = !!Im(!0), {
    filteredItems: y,
    hasItems: C
  } = Os(), w = xe(h, Ee.selectionMode), A = xe(h, Ee.grid), O = xe(h, Ee.listProps), M = xe(h, Ee.virtualized), T = xe(h, Ee.forceMounted), _ = w === "multiple", N = y.length === 0, I = Fe((fe) => {
    h.set("positionerElement", fe);
  }), q = Fe((fe) => {
    h.set("listElement", fe);
  }), Y = b.useMemo(() => typeof m == "function" ? a || (a = /* @__PURE__ */ S.jsx(WT, {
    children: m
  })) : m, [m]), L = {
    empty: N
  }, X = v.useState("floatingId"), te = $l("div", o, {
    state: L,
    ref: [r, q, x ? null : I],
    props: [O, {
      children: Y,
      tabIndex: -1,
      id: X,
      role: A ? "grid" : "listbox",
      "aria-multiselectable": _ ? "true" : void 0,
      onKeyDown(fe) {
        if (!(h.state.disabled || h.state.readOnly) && fe.key === "Enter") {
          const le = h.state.activeIndex;
          if (le == null)
            return;
          On(fe), k1(h, le, fe.nativeEvent);
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
  return /* @__PURE__ */ S.jsx(uM, {
    elementsRef: h.state.listRef,
    labelsRef: se,
    children: te
  });
}), tO = "⁠", nO = 200;
function lO(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const a = o.currentNode;
    a.nodeValue !== "" && (r = a);
  }
  return r;
}
function oO() {
  const n = Vi(), o = b.useRef(null);
  return b.useEffect(() => {
    if (Ts)
      return;
    const r = o.current;
    if (r == null)
      return;
    const a = lO(r);
    if (a == null)
      return;
    const c = a.data, f = `${c}${tO}`;
    return a.nodeValue = f, n.start(nO, () => {
      a.nodeValue === f && (a.nodeValue = c);
    }), () => {
      n.clear(), a.nodeValue === f && (a.nodeValue = c);
    };
  }, [o, n]), o;
}
const D1 = /* @__PURE__ */ b.createContext(void 0);
function iO() {
  const n = b.useContext(D1);
  if (n === void 0)
    throw new Error(Ro(20));
  return n;
}
const rO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: a = !1,
    ...c
  } = o, f = Dl(), d = xe(f, Ee.mounted), m = xe(f, Ee.forceMounted);
  return d || a || m ? /* @__PURE__ */ S.jsx(D1.Provider, {
    value: a,
    children: /* @__PURE__ */ S.jsx(O2, {
      ref: r,
      ...c
    })
  }) : null;
}), aO = (n) => ({
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
      padding: v = 0,
      offsetParent: x = "real"
    } = Di(n, o) || {};
    if (h == null)
      return {};
    const y = F0(v), C = {
      x: r,
      y: a
    }, w = em(c), A = Wh(w), O = await d.getDimensions(h), M = w === "y", T = M ? "top" : "left", _ = M ? "bottom" : "right", N = M ? "clientHeight" : "clientWidth", I = f.reference[A] + f.reference[w] - C[w] - f.floating[A], q = C[w] - f.reference[w], Y = x === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let L = m.floating[N] || f.floating[A];
    (!L || !await d.isElement?.(Y)) && (L = m.floating[N] || f.floating[A]);
    const X = I / 2 - q / 2, te = L / 2 - O[A] / 2 - 1, se = Math.min(y[T], te), fe = Math.min(y[_], te), le = se, he = L - O[A] - fe, be = L / 2 - O[A] / 2 + X, V = K0(le, be, he), H = !g.arrow && Bi(c) != null && be !== V && f.reference[A] / 2 - (be < le ? se : fe) - O[A] / 2 < 0, F = H ? be < le ? be - le : be - he : 0;
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
}), sO = (n, o) => ({
  ...aO(n),
  options: [n, o]
}), cO = {
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
}, uO = {
  sideX: "left",
  sideY: "top"
}, Tv = "--available-width", Ov = "--available-height";
function j1(n, o, r) {
  const a = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: a ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: a ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function kv(n, o, r) {
  const {
    rects: a,
    placement: c
  } = n;
  return {
    side: j1(o, Zl(c), r),
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
function fO(n) {
  return dO(n, nT);
}
function dO(n, o) {
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
    sticky: v = !1,
    arrowPadding: x = 5,
    disableAnchorTracking: y = !1,
    inline: C,
    // Private parameters
    keepMounted: w = !1,
    floatingRootContext: A,
    mounted: O,
    collisionAvoidance: M,
    shift: T,
    nodeId: _,
    adaptiveOrigin: N,
    lazyFlip: I = !1,
    externalTree: q
  } = n, [Y, L] = b.useState(null);
  !O && Y !== null && L(null);
  const X = M.side || "flip", te = M.align || "flip", se = M.fallbackAxisSide || "end", fe = T?.crossAxis ?? !1, le = T?.rootBoundary, he = typeof r == "function" ? r : void 0, be = Fe(he), V = he ? be : r, H = gl(r), F = gl(O), ae = Vm() === "rtl", z = Y || {
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
  }, it = b.useRef(null), pt = gl(f), ze = gl(m), et = typeof f != "function" ? f : 0, Ne = typeof m != "function" ? m : 0, Le = [];
  C && Le.push(C), Le.push(X_((ot) => {
    const ut = kv(ot, c, ae), Ke = typeof pt.current == "function" ? pt.current(ut) : pt.current, Qt = typeof ze.current == "function" ? ze.current(ut) : ze.current;
    return {
      mainAxis: Ke,
      crossAxis: Qt,
      alignmentAxis: Qt
    };
  }, [et, Ne, ae, c]));
  const Ue = te === "none" && X !== "shift", _e = !Ue && (v || fe || X === "shift"), Ze = X === "none" ? null : Q_({
    ...Te,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: ne.top + oe + pe,
      right: ne.right + oe + Ae,
      bottom: ne.bottom + oe + we,
      left: ne.left + oe + qe
    },
    mainAxis: !fe && X === "flip",
    crossAxis: te === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: se
  }), Oe = Ue ? null : K_({
    ...Te,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: le,
    mainAxis: te !== "none",
    crossAxis: _e,
    limiter: v || fe ? void 0 : F_((ot) => {
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
  }, [Te, v, fe, le, ne, te]);
  X === "shift" || te === "shift" || d === "center" ? Le.push(Oe, Ze) : Le.push(Ze, Oe), Le.push(Z_({
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
      wn.setProperty(Tv, `${ut}px`), wn.setProperty(Ov, `${Ke}px`);
      const _n = hn(ot).devicePixelRatio || 1, {
        x: Yt,
        y: nl,
        width: zt,
        height: so
      } = Qt.reference, Fn = (Math.round((Yt + zt) * _n) - Math.round(Yt * _n)) / _n, rn = (Math.round((nl + so) * _n) - Math.round(nl * _n)) / _n;
      wn.setProperty("--anchor-width", `${Fn}px`), wn.setProperty("--anchor-height", `${rn}px`);
    }
  }), sO((ot) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: it.current || $t(ot.elements.floating).createElement("div"),
    padding: x,
    offsetParent: "floating"
  }), [x]), {
    name: "transformOrigin",
    fn(ot) {
      const {
        elements: ut,
        middlewareData: Ke,
        placement: Qt,
        rects: wn,
        y: _n
      } = ot, Yt = Zl(Qt), nl = Ql(Yt), zt = it.current, so = Ke.arrow?.x || 0, Fn = Ke.arrow?.y || 0, rn = zt?.clientWidth || 0, co = zt?.clientHeight || 0, jl = so + rn / 2, ll = Fn + co / 2, wo = Math.abs(Ke.shift?.y || 0), an = wn.reference.height / 2, Ct = typeof f == "function" ? f(kv(ot, c, ae)) : f, Rt = wo > Ct, Ye = {
        top: `${jl}px calc(100% + ${Ct}px)`,
        bottom: `${jl}px ${-Ct}px`,
        left: `calc(100% + ${Ct}px) ${ll}px`,
        right: `${-Ct}px ${ll}px`
      }[Yt], Gn = `${jl}px ${wn.reference.y + an - _n}px`;
      return ut.floating.style.setProperty("--transform-origin", _e && nl === "y" && Rt ? Gn : Ye), {};
    }
  }, cO, N), Qe(() => {
    !O && A && A.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [O, A]);
  const We = b.useMemo(() => ({
    elementResize: !y && typeof ResizeObserver < "u",
    layoutShift: !y && typeof IntersectionObserver < "u"
  }), [y]), {
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
    whileElementsMounted: w ? void 0 : (...ot) => Xy(...ot, We),
    nodeId: _,
    externalTree: q
  }), {
    sideX: St,
    sideY: Bt
  } = ce.adaptiveOrigin || uO, Nt = nt ? a : "fixed", xt = b.useMemo(() => {
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
    }, ot[Tv] = "100vw", ot[Ov] = "100vh", nt || (ot.opacity = 0), ot;
  }, [N, Nt, St, ye, Bt, Q, Tt, nt]), on = b.useRef(null);
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
      return Xy(Xe.reference, Xe.floating, He, We);
  }, [w, O, Xe, He, We]);
  const st = Zl(Ce), Et = j1(c, st, ae), Jt = Bi(Ce) || "center", Rn = !!ce.hide?.referenceHidden;
  Qe(() => {
    I && O && nt && st !== z && L(st);
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
function L1(n) {
  return n === "starting" ? R2 : bl;
}
function hO(n, o, {
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
    }, L1(a), c],
    stateAttributesMapping: zm
  });
}
const mO = 20;
function pO(n, o, r, a) {
  const [c, f] = b.useState(!1);
  Qe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = $t(r).documentElement.clientWidth, m = r.offsetWidth;
    f(d > 0 && m > 0 && m >= d - mO);
  }, [n, o, r]), c2(n && (!o || c), a);
}
const gO = /* @__PURE__ */ b.forwardRef(function(o, r) {
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
    alignOffset: v,
    collisionBoundary: x = "clipping-ancestors",
    collisionPadding: y,
    arrowPadding: C,
    sticky: w,
    disableAnchorTracking: A = !1,
    collisionAvoidance: O = _2,
    style: M,
    ...T
  } = o, _ = Dl(), N = Ou(), I = iO(), q = xe(_, Ee.modal), Y = xe(_, Ee.open), L = xe(_, Ee.mounted), X = xe(_, Ee.openMethod), te = xe(_, Ee.positionerElement), se = xe(_, Ee.triggerElement), fe = xe(_, Ee.inputElement), le = xe(_, Ee.inputGroupElement), he = xe(_, Ee.inputInsidePopup), be = xe(_, Ee.transitionStatus), V = Nu(), F = fO({
    anchor: f ?? (he ? se : le ?? fe),
    floatingRootContext: N,
    positionMethod: d,
    mounted: L,
    side: m,
    sideOffset: h,
    align: g,
    alignOffset: v,
    arrowPadding: C,
    collisionBoundary: x,
    collisionPadding: y,
    sticky: w,
    disableAnchorTracking: A,
    keepMounted: I,
    collisionAvoidance: O,
    lazyFlip: !0
  });
  pO(Y && q, X === "touch", te, se);
  const ve = {
    open: Y,
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
  }), z = hO(o, ve, {
    styles: F.positionerStyles,
    transitionStatus: be,
    props: T,
    refs: [r, ae],
    hidden: !L,
    inert: !Y
  });
  return /* @__PURE__ */ S.jsxs(N1.Provider, {
    value: F,
    children: [L && q && /* @__PURE__ */ S.jsx(bT, {
      inert: gT(!Y),
      cutout: le ?? fe ?? se
    }), z]
  });
}), bO = {
  ...zm,
  ...Su
}, yO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...g
  } = o, h = Dl(), v = Im(), x = Ou(), y = xe(h, Ee.mounted), C = xe(h, Ee.open), w = xe(h, Ee.openMethod), A = xe(h, Ee.popupProps), O = xe(h, Ee.transitionStatus), M = xe(h, Ee.inputInsidePopup), T = xe(h, Ee.inputElement), _ = xe(h, Ee.modal), N = xe(h, Ee.id), I = Nu(), q = g.id ?? (M ? _1(N) : void 0);
  Qe(() => (h.set("popupId", h.state.popupRef.current?.id || q), () => {
    h.set("popupId", void 0);
  }), [h, q]), Eu({
    open: C,
    ref: h.state.popupRef,
    onComplete() {
      C && h.state.onOpenChangeComplete(!0);
    }
  });
  const Y = {
    open: C,
    side: v.side,
    align: v.align,
    anchorHidden: v.anchorHidden,
    transitionStatus: O,
    empty: I
  }, L = $l("div", o, {
    state: Y,
    ref: [r, h.state.popupRef],
    props: [A, {
      id: q,
      role: M ? "dialog" : "presentation",
      onFocus(le) {
        const he = Nl(le.nativeEvent);
        w !== "touch" && (at(h.state.listElement, he) || he === le.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, L1(O), g],
    stateAttributesMapping: bO
  }), te = d === void 0 ? M ? (le) => le === "touch" ? h.state.popupRef.current : T : !1 : d;
  let se;
  m != null ? se = m : se = M ? void 0 : !1;
  const fe = !M || _;
  return /* @__PURE__ */ S.jsx(L2, {
    context: x,
    disabled: !y,
    modal: fe,
    openInteractionType: w,
    initialFocus: te,
    returnFocus: se,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [L, fe && /* @__PURE__ */ S.jsx(z1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), V1 = /* @__PURE__ */ b.createContext(void 0);
function I1() {
  const n = b.useContext(V1);
  if (!n)
    throw new Error(Ro(19));
  return n;
}
const vO = /* @__PURE__ */ b.createContext(!1);
function xO() {
  return b.useContext(vO);
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
    disabled: v = !1,
    nativeButton: x = !1,
    ...y
  } = o, C = b.useRef(null), w = BM({
    guess: !0,
    index: h,
    textRef: C
  }), A = Dl(), O = xO(), M = CT(), T = xe(A, Ee.selectionMode), _ = xe(A, Ee.disabled), N = xe(A, Ee.readOnly), I = xe(A, Ee.isItemEqualToValue), q = _ || v, Y = T !== "none", L = h ?? c ?? w.index, X = L !== -1, te = xe(A, Ee.id), se = xe(A, Ee.isActive, L), fe = xe(A, Ee.isSelected, g), le = xe(A, Ee.itemProps), he = b.useRef(null), be = te != null && X ? `${te}-${L}` : void 0, V = fe && Y;
  Qe(() => {
    if (!(X && (a || h != null)))
      return;
    const pe = A.state.listRef.current;
    return pe[L] = he.current, () => {
      delete pe[L];
    };
  }, [X, a, L, h, A]), Qe(() => {
    if (!X || M)
      return;
    const oe = A.state.valuesRef.current;
    return oe[L] = g, () => {
      delete oe[L];
    };
  }, [X, M, L, g, A]), Qe(() => {
    if (!X || M)
      return;
    const oe = A.state.selectedValue, pe = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Ii(g, pe, I) && A.set("selectedIndex", L);
  }, [X, M, A, L, g, I]);
  const {
    getButtonProps: H,
    buttonRef: F
  } = Ms({
    disabled: q,
    focusableWhenDisabled: !0,
    native: x,
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
    "aria-selected": Y ? V : void 0,
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
      q || N || ae(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const pe = A.state.pointerDownItemRef.current === oe.currentTarget;
      A.state.pointerDownItemRef.current = null, !(q || N || oe.button !== 0 || pe || !se) && ae(oe.nativeEvent);
    }
  }, K = $l("div", o, {
    ref: [F, r, w.ref, he],
    state: ve,
    props: [le, z, y, H]
  }), ne = b.useMemo(() => ({
    selected: V,
    textRef: C
  }), [V, C]);
  return /* @__PURE__ */ S.jsx(V1.Provider, {
    value: ne,
    children: K
  });
}
function SO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, a = Dl(), c = xe(a, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = Os(), d = y1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(H1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const EO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const a = Dl(), c = xe(a, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(SO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(H1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), CO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    children: d,
    ...m
  } = o, {
    filteredItems: g
  } = Os(), h = Dl(), v = oO(), x = g.length === 0 ? d : null;
  return $l("div", o, {
    ref: [r, h.state.emptyRef, v],
    props: [{
      children: x,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, m]
  });
});
function RO(n, o, r, a = !0, c) {
  const [f, d] = b.useState(), m = vu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Qe(() => {
    const h = n || o || !a ? void 0 : wO(r.current, m);
    f !== h && d(h);
  }), g;
}
function wO(n, o) {
  const r = _O(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function _O(n) {
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
function AO(n) {
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
function MO(n) {
  const {
    children: o,
    placeholder: r
  } = n, a = Dl(), c = xe(a, Ee.itemToStringLabel), f = xe(a, Ee.selectedValue), d = xe(a, Ee.items), m = xe(a, Ee.selectionMode) === "multiple", g = xe(a, Ee.hasSelectedValue), h = !g && r != null && o == null, v = xe(a, Ee.hasNullItemLabel, h);
  let x = null;
  return typeof o == "function" ? x = o(f) : o != null ? x = o : !g && r != null && !v ? x = r : m && Array.isArray(f) ? x = MT(f, d, c) : x = v1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: x
  });
}
const TO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: a
  } = I1();
  return o.keepMounted || a ? /* @__PURE__ */ S.jsx(OO, {
    ...o,
    ref: r
  }) : null;
}), OO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: a,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: m
  } = I1(), g = b.useRef(null), {
    transitionStatus: h,
    setMounted: v
  } = wm(m), y = $l("span", n, {
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
      m || v(!1);
    }
  }), y;
})), U1 = /* @__PURE__ */ b.createContext(void 0);
function kO() {
  const n = b.useContext(U1);
  if (n === void 0)
    throw new Error(Ro(63));
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
}, NO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: a,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: m,
    id: g,
    inputRef: h,
    name: v,
    nativeButton: x = !1,
    onCheckedChange: y,
    readOnly: C = !1,
    required: w = !1,
    disabled: A = !1,
    render: O,
    uncheckedValue: M,
    value: T,
    style: _,
    ...N
  } = o, {
    clearErrors: I
  } = w1(), {
    state: q,
    setTouched: Y,
    setDirty: L,
    validityData: X,
    setFilled: te,
    setFocused: se,
    validationMode: fe,
    disabled: le,
    name: he,
    validation: be
  } = ya(), {
    labelId: V
  } = ku(), H = le || A, F = he ?? v, ve = b.useRef(null), ae = br(ve, h, be.inputRef), z = b.useRef(null), K = vu(), ne = Lm({
    id: g,
    implicit: !1,
    controlRef: z
  }), oe = x ? void 0 : ne, [pe, we] = Fc({
    controlled: a,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  R1(z, K, pe, void 0, !H, v), Qe(() => {
    ve.current && te(ve.current.checked);
  }, [te]), ra(pe, () => {
    I(F), L(pe !== X.initialValue), te(pe), be.change(pe);
  });
  const {
    getButtonProps: qe,
    buttonRef: Ae
  } = Ms({
    disabled: H,
    native: x
  }), Te = RO(d, V, ve, !x, oe), it = {
    id: x ? ne : K,
    role: "switch",
    "aria-checked": pe,
    "aria-readonly": C || void 0,
    "aria-required": w || void 0,
    "aria-labelledby": Te,
    onFocus() {
      H || se(!0);
    },
    onBlur() {
      const Ne = ve.current;
      !Ne || H || (Y(!0), se(!1), fe === "onBlur" && be.commit(Ne.checked));
    },
    onClick(Ne) {
      if (C || H)
        return;
      Ne.preventDefault();
      const Le = ve.current;
      Le && Qc(Le, Ne);
    }
  }, pt = {
    ...be.getValidationProps(H),
    checked: pe,
    disabled: H,
    form: m,
    id: oe,
    name: F,
    required: w,
    style: F ? Om : Tm,
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
      const Le = Ne.currentTarget.checked, Ue = vt(Kl, Ne.nativeEvent);
      y?.(Le, Ue), !Ue.isCanceled && we(Le);
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
    } : bl
  }, ze = b.useMemo(() => ({
    ...q,
    checked: pe,
    disabled: H,
    readOnly: C,
    required: w
  }), [q, pe, H, C, w]), et = $l("span", o, {
    state: ze,
    ref: [r, z, Ae],
    props: [it, N, qe, (Ne) => be.getValidationProps(H, Ne)],
    stateAttributesMapping: B1
  });
  return /* @__PURE__ */ S.jsxs(U1.Provider, {
    value: ze,
    children: [et, !pe && F && M !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: m,
      name: F,
      value: M,
      disabled: H
    }), /* @__PURE__ */ S.jsx("input", {
      ...pt,
      suppressHydrationWarning: !0
    })]
  });
}), zO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: a,
    className: c,
    style: f,
    ...d
  } = o, m = kO();
  return $l("span", o, {
    state: m,
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
function DO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
const jO = wr(
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
function LO({
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
      className: Je(jO({ align: o }), n),
      onClick: (a) => {
        a.target.closest("button") || a.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const VO = wr(
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
    Ni,
    {
      type: o,
      "data-size": a,
      variant: r,
      className: Je(VO({ size: a }), n),
      ...c
    }
  );
}
function IO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    G1,
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
const HO = AO;
function UO({ ...n }) {
  return /* @__PURE__ */ S.jsx(MO, { "data-slot": "combobox-value", ...n });
}
function q1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    PT,
    {
      "data-slot": "combobox-trigger",
      className: Je("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          f0,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function BO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    ZT,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(Y1, { variant: "ghost", size: "icon-xs" }),
      className: Je(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(m0, { className: "pointer-events-none" })
    }
  );
}
function GO({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: a = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(DO, { className: Je("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      FT,
      {
        render: /* @__PURE__ */ S.jsx(IO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(LO, { align: "inline-end", children: [
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
      c && /* @__PURE__ */ S.jsx(BO, { disabled: r })
    ] }),
    o
  ] });
}
function YO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: a = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...m
}) {
  return /* @__PURE__ */ S.jsx(rO, { container: d, children: /* @__PURE__ */ S.jsx(
    gO,
    {
      side: o,
      sideOffset: r,
      align: a,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        yO,
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
function qO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    eO,
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
function PO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    EO,
    {
      "data-slot": "combobox-item",
      className: Je(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          TO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ S.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ S.jsx(hR, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function XO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    CO,
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
function KO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    pA,
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
function Vh({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
const FO = wr(
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
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": o,
      className: Je(FO({ orientation: o }), n),
      ...r
    }
  );
}
function Eo({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    KO,
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
  return /* @__PURE__ */ S.jsx(
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
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: Je("group/item-group flex flex-col", n),
      ...o
    }
  );
}
const QO = wr(
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
function ZO({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: a = !1,
  ...c
}) {
  const f = a ? g0 : "div";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: Je(QO({ variant: o, size: r }), n),
      ...c
    }
  );
}
function $O({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
function JO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
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
  return /* @__PURE__ */ S.jsxs(
    MA,
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
        /* @__PURE__ */ S.jsx(
          NA,
          {
            "data-slot": "slider-track",
            className: Je(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              zA,
              {
                "data-slot": "slider-range",
                className: Je(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: m.length }, (g, h) => /* @__PURE__ */ S.jsx(
          IA,
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
function zv({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
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
      children: /* @__PURE__ */ S.jsx(
        zO,
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
const WO = wr(
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
function Ih({
  className: n,
  variant: o,
  size: r,
  spacing: a = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    XA,
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
      children: /* @__PURE__ */ S.jsx(P1.Provider, { value: { variant: o, size: r, spacing: a }, children: c })
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
  const f = b.useContext(P1);
  return /* @__PURE__ */ S.jsx(
    $A,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || a,
      "data-spacing": f.spacing,
      className: Je(
        WO({
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
const Dv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], jv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], Ol = ["#ff0099", "#b8ff00", "#00b7ff"], ek = Ol.length, tk = ["line", "spline", "gradient"], nk = ["spline", "shape", "gradient"], lk = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, ok = ["select", "lasso"], ik = ["point", "line", "spline", "shape"];
function rk(n, o) {
  const [r, a] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(a - r), Math.abs(f - c));
}
function ak(n, o) {
  const [r, a] = n, [c, f] = o;
  return Math.hypot(Math.abs(a - r), Math.abs(f - c));
}
function ua(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function Lv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const sk = {
  select: OR,
  lasso: wR,
  polygon: NR,
  rectangle: BR,
  ellipse: jy,
  point: jy,
  line: d0,
  spline: HR,
  shape: h0
};
function Vv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    Ih,
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
        const c = sk[a] ?? h0, f = lk[a] ?? a;
        return /* @__PURE__ */ S.jsx(
          fr,
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
function vs({ color: n, className: o }) {
  return /* @__PURE__ */ S.jsx(
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
function X1({ active: n }) {
  return /* @__PURE__ */ S.jsx(
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
function ck({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: a,
  onToggleFullscreen: c
}) {
  const f = n.filter((m) => ok.includes(m)), d = n.filter((m) => ik.includes(m));
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "flex flex-wrap items-center gap-2 border-b border-border bg-card px-2 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      children: [
        f.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Select" }),
          /* @__PURE__ */ S.jsx(Vv, { modes: f, value: o, onChange: r })
        ] }) : null,
        f.length && d.length ? /* @__PURE__ */ S.jsx(WA, { orientation: "vertical", className: "h-5" }) : null,
        d.length ? /* @__PURE__ */ S.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground text-xs font-medium", children: "Landmarks" }),
          /* @__PURE__ */ S.jsx(Vv, { modes: d, value: o, onChange: r })
        ] }) : null,
        /* @__PURE__ */ S.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ S.jsx(
          Ni,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            title: a ? "Exit full screen" : "Full screen",
            "aria-label": a ? "Exit full screen" : "Full screen",
            "aria-pressed": a,
            onClick: c,
            children: a ? /* @__PURE__ */ S.jsx(VR, {}) : /* @__PURE__ */ S.jsx(vR, {})
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
  const [h, v] = b.useState(!1), [x, y] = b.useState(r);
  return /* @__PURE__ */ S.jsxs(
    ZO,
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
        g ? /* @__PURE__ */ S.jsx(
          Ni,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": a ? "Show landmark" : "Hide landmark",
            onClick: (C) => {
              C.stopPropagation(), g();
            },
            children: a ? /* @__PURE__ */ S.jsx(CR, {}) : /* @__PURE__ */ S.jsx(SR, {})
          }
        ) : null,
        o ? /* @__PURE__ */ S.jsx(vs, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ S.jsx(X1, { active: c }) : null,
        /* @__PURE__ */ S.jsx($O, { className: "min-w-0 gap-0", children: h && d ? /* @__PURE__ */ S.jsx(
          G1,
          {
            "aria-label": "Rename layer",
            value: x,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (C) => C.stopPropagation(),
            onChange: (C) => y(C.target.value),
            onBlur: () => {
              d(x), v(!1);
            },
            onKeyDown: (C) => {
              C.stopPropagation(), C.key === "Enter" ? (C.preventDefault(), d(x), v(!1)) : C.key === "Escape" && (C.preventDefault(), y(r), v(!1));
            }
          }
        ) : /* @__PURE__ */ S.jsx(
          JO,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (C) => {
              d && (C.preventDefault(), C.stopPropagation(), y(r), v(!0));
            },
            children: r
          }
        ) }),
        m ? /* @__PURE__ */ S.jsx(
          Ni,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (C) => {
              C.stopPropagation(), m();
            },
            children: /* @__PURE__ */ S.jsx(m0, {})
          }
        ) : null
      ]
    }
  );
}
const ma = "px-3";
function Iv(n, o) {
  const r = n?.vmin ?? 0, a = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, a));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function uk({
  colors: n,
  labels: o,
  lo: r,
  hi: a
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${fk(n[0], n[1])}, ${n[1]})`;
  return /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ S.jsx("div", { className: "flex min-w-0 items-center justify-between gap-1 text-[10px] text-muted-foreground", children: o.map((f, d) => /* @__PURE__ */ S.jsxs(
      "span",
      {
        className: "inline-flex min-w-0 items-center gap-1 truncate text-foreground",
        children: [
          /* @__PURE__ */ S.jsx(vs, { color: n[d] || "#94a3b8" }),
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
      /* @__PURE__ */ S.jsx("span", { children: Lv(r) }),
      /* @__PURE__ */ S.jsx("span", { children: Lv(a) })
    ] })
  ] });
}
function fk(n, o) {
  const r = n.replace("#", ""), a = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(a.slice(0, 2), 16), g = parseInt(a.slice(2, 4), 16), h = parseInt(a.slice(4, 6), 16), v = Math.min(255, c + m), x = Math.min(255, f + g), y = Math.min(255, d + h);
  return `#${[v, x, y].map((C) => C.toString(16).padStart(2, "0")).join("")}`;
}
function dk(n, o, r, a, c, f, d) {
  const m = [
    [n, o],
    [r, a],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [v, x] = m[(h + 2) % 3], [y, C] = m[h], [w, A] = m[(h + 1) % 3], O = Math.hypot(y - v, C - x) || 1, M = Math.hypot(w - y, A - C) || 1, T = Math.min(d, O * 0.35, M * 0.35), _ = y + (v - y) / O * T, N = C + (x - C) / O * T, I = y + (w - y) / M * T, q = C + (A - C) / M * T;
    h === 0 ? g.push(`M ${_} ${N}`) : g.push(`L ${_} ${N}`), g.push(`Q ${y} ${C} ${I} ${q}`);
  }
  return g.push("Z"), g.join(" ");
}
const pl = 80, Hm = 12, ch = 4, Hv = 5, hk = pl - 2 * Hm, K1 = Math.sqrt(3) / 2 * hk, F1 = (pl - K1) / 2, Q1 = F1 + K1, vr = { x: pl / 2, y: F1 }, xr = { x: Hm, y: Q1 }, Sr = { x: pl - Hm, y: Q1 }, Uv = {
  x: (xr.x + vr.x + Sr.x) / 3,
  y: (xr.y + vr.y + Sr.y) / 3
};
function Um(n) {
  const o = n.x - Uv.x, r = n.y - Uv.y, a = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / a * Hv,
    y: n.y + r / a * Hv
  };
}
const Bv = Um(xr), Gv = Um(vr), Yv = Um(Sr), qv = dk(
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
function mk() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const a = r.createImageData(o, o), c = uh(Ol[0]), f = uh(Ol[1]), d = uh(Ol[2]), m = xr.x / pl, g = xr.y / pl, h = vr.x / pl, v = vr.y / pl, x = Sr.x / pl, y = Sr.y / pl, C = (v - y) * (m - x) + (x - h) * (g - y);
  for (let w = 0; w < o; w++)
    for (let A = 0; A < o; A++) {
      const O = (A + 0.5) / o, M = (w + 0.5) / o, T = ((v - y) * (O - x) + (x - h) * (M - y)) / C, _ = ((y - g) * (O - x) + (m - x) * (M - y)) / C, N = 1 - T - _, I = (w * o + A) * 4;
      if (T < -0.02 || _ < -0.02 || N < -0.02) {
        a.data[I + 3] = 0;
        continue;
      }
      const q = Math.max(0, T), Y = Math.max(0, _), L = Math.max(0, N);
      a.data[I] = Math.min(255, Math.round(c[0] * q + f[0] * Y + d[0] * L)), a.data[I + 1] = Math.min(
        255,
        Math.round(c[1] * q + f[1] * Y + d[1] * L)
      ), a.data[I + 2] = Math.min(
        255,
        Math.round(c[2] * q + f[2] * Y + d[2] * L)
      ), a.data[I + 3] = 255;
    }
  return r.putImageData(a, 0, 0), n.toDataURL();
}
function pk() {
  const n = b.useId(), o = b.useMemo(() => mk(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${pl} ${pl}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: qv }) }) }),
        o ? /* @__PURE__ */ S.jsx(
          "image",
          {
            href: o,
            width: pl,
            height: pl,
            clipPath: `url(#${n})`,
            preserveAspectRatio: "none"
          }
        ) : null,
        /* @__PURE__ */ S.jsx(
          "path",
          {
            d: qv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Bv.x,
            cy: Bv.y,
            r: ch,
            fill: Ol[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Gv.x,
            cy: Gv.y,
            r: ch,
            fill: Ol[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Yv.x,
            cy: Yv.y,
            r: ch,
            fill: Ol[2]
          }
        )
      ]
    }
  ) });
}
function gk({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: a, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (a !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(pk, {});
  const m = d.map((v, x) => Ol[x % Ol.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const v of d) {
      const x = r.find((y) => y.name === v);
      h = Math.max(h, Iv(x, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const v = r.find((y) => y.name === d[0]), x = Iv(v, c);
    g = x.lo, h = x.hi;
  }
  return /* @__PURE__ */ S.jsx(
    uk,
    {
      colors: m,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function bk({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: a, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        zv,
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
        zv,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function yk() {
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
function vk({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, a = o.map((g) => g.name), c = r || [], f = c.length >= ek, [d, m] = yk();
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
            q1,
            {
              render: /* @__PURE__ */ S.jsx(
                Ni,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ S.jsx(UO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((v, x) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            vs,
                            {
                              color: Ol[x % Ol.length]
                            }
                          ),
                          v
                        ]
                      },
                      v
                    )) }) : /* @__PURE__ */ S.jsx("span", { className: "text-muted-foreground", children: "Select genes" });
                  } })
                }
              )
            }
          ),
          /* @__PURE__ */ S.jsxs(
            YO,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  GO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ S.jsx(XO, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(qO, { children: (g) => {
                  const h = String(g), v = c.indexOf(h), x = f && v < 0;
                  return /* @__PURE__ */ S.jsxs(
                    PO,
                    {
                      value: h,
                      disabled: x,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          vs,
                          {
                            color: v >= 0 ? Ol[v % Ol.length] : "#94a3b8"
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
    /* @__PURE__ */ S.jsx(gk, { lm: n }),
    /* @__PURE__ */ S.jsx(bk, { lm: n })
  ] });
}
function xk({ lm: n }) {
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
  } = n, v = h === "continuous" && (g?.length || 0) > 0;
  return /* @__PURE__ */ S.jsxs(dm, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(hm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ S.jsx(mm, { className: "text-sm font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ S.jsx(pm, { className: Je("min-h-0 overflow-y-auto pb-2", ma), children: /* @__PURE__ */ S.jsxs(
      fm,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ S.jsxs(_i, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Selections" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ S.jsx(ah, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((x, y) => /* @__PURE__ */ S.jsx(
              sh,
              {
                active: a === "selection" && c === y,
                color: jv[y % jv.length],
                label: x.id,
                onSelect: () => n.select("selection", y),
                onRename: (C) => n.renameSelection(y, C),
                onDelete: () => n.deleteSelection(y)
              },
              `${x.id}-${y}`
            )) }) : /* @__PURE__ */ S.jsx(ml, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ S.jsxs(_i, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Categories" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((x) => {
              const y = !v && x.name === d;
              return /* @__PURE__ */ S.jsxs(nM, { className: "group/cat", children: [
                /* @__PURE__ */ S.jsxs(
                  lM,
                  {
                    className: Je(
                      "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                      y && "text-foreground"
                    ),
                    onClick: () => {
                      x.name === d && !v || (n.setActiveCategory(x), n.select("", -1));
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(gR, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                      /* @__PURE__ */ S.jsx(X1, { active: y }),
                      /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: x.name })
                    ]
                  }
                ),
                /* @__PURE__ */ S.jsx(oM, { className: "pl-4", children: /* @__PURE__ */ S.jsx(ah, { className: "gap-0.5", children: (x.labels || []).map((C, w) => /* @__PURE__ */ S.jsx(
                  sh,
                  {
                    active: a === "type" && x.name === d && c === w,
                    color: (x.palette || [])[w % Math.max((x.palette || []).length, 1)] || "#888888",
                    label: C,
                    onSelect: () => n.selectType(x, w)
                  },
                  `${x.name}-${C}`
                )) }) })
              ] }, x.name);
            }) }) })
          ] }) : null,
          m.length ? /* @__PURE__ */ S.jsxs(_i, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Genes" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(vk, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ S.jsxs(_i, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmarks" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ S.jsx(ah, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((x, y) => /* @__PURE__ */ S.jsx(
              sh,
              {
                active: a === "landmark" && c === y,
                color: Dv[y % Dv.length],
                label: x.id,
                hidden: !!x.hidden,
                onSelect: () => n.select("landmark", y),
                onRename: (C) => n.renameLandmark(y, C),
                onToggleHidden: () => n.toggleLandmarkHidden(y),
                onDelete: () => n.deleteLandmark(y)
              },
              `${x.id}-${y}`
            )) }) : /* @__PURE__ */ S.jsx(ml, { children: "No landmarks yet." }) })
          ] })
        ]
      }
    ) })
  ] });
}
function Sk({ lm: n }) {
  const o = ak(n.x_bounds, n.y_bounds), r = Math.max(o * 0.05, n.point_size * 5, 1e-6), a = Math.min(Math.max(n.point_size, 0), r), c = `${ua(o, "0")} across`;
  return /* @__PURE__ */ S.jsxs(dm, { className: "pointer-events-auto shrink-0 gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(hm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ S.jsx(mm, { className: "text-sm font-semibold tracking-tight", children: "Inspect" }) }),
    /* @__PURE__ */ S.jsx(pm, { className: Je("min-h-0 overflow-hidden pb-2", ma), children: /* @__PURE__ */ S.jsxs(fm, { type: "multiple", defaultValue: ["style"], children: [
      /* @__PURE__ */ S.jsxs(_i, { value: "style", className: "border-b", children: [
        /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Style" }),
        /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Vh, { className: "gap-2", children: [
          /* @__PURE__ */ S.jsxs(So, { children: [
            /* @__PURE__ */ S.jsx(Eo, { children: "Point radius" }),
            /* @__PURE__ */ S.jsx(
              Oi,
              {
                min: 0,
                max: r,
                step: r / 200,
                value: [a],
                onValueChange: (f) => n.setPointSize(f[0] ?? 0)
              }
            ),
            /* @__PURE__ */ S.jsx(ml, { children: ua(n.point_size, "0") })
          ] }),
          /* @__PURE__ */ S.jsxs(So, { children: [
            /* @__PURE__ */ S.jsx(Eo, { children: "Point opacity" }),
            /* @__PURE__ */ S.jsx(
              Oi,
              {
                min: 0.05,
                max: 1,
                step: 0.01,
                value: [n.point_opacity],
                onValueChange: (f) => n.setPointOpacity(f[0] ?? 0.8)
              }
            ),
            /* @__PURE__ */ S.jsx(ml, { children: n.point_opacity.toFixed(2) })
          ] }),
          /* @__PURE__ */ S.jsxs(So, { children: [
            /* @__PURE__ */ S.jsx(Eo, { children: "Landmark opacity" }),
            /* @__PURE__ */ S.jsx(
              Oi,
              {
                min: 0.05,
                max: 1,
                step: 0.01,
                value: [n.landmark_opacity],
                onValueChange: (f) => n.setLandmarkOpacity(f[0] ?? 0.28)
              }
            ),
            /* @__PURE__ */ S.jsx(ml, { children: n.landmark_opacity.toFixed(2) })
          ] }),
          /* @__PURE__ */ S.jsxs(So, { children: [
            /* @__PURE__ */ S.jsx(Eo, { children: "Stroke" }),
            /* @__PURE__ */ S.jsx(
              Oi,
              {
                min: 1,
                max: 8,
                step: 1,
                value: [n.stroke_width],
                onValueChange: (f) => n.setStrokeWidth(f[0] ?? 2)
              }
            ),
            /* @__PURE__ */ S.jsxs(ml, { children: [
              String(n.stroke_width),
              " px"
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ S.jsxs(_i, { value: "stats", children: [
        /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Stats" }),
        /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs("dl", { className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs", children: [
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Points" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.n_points }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Categories" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.category_columns.length }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Genes" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.gene_columns.length }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Selections" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.selections.length }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Landmarks" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.landmarks.length }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Color" }),
          /* @__PURE__ */ S.jsx("dd", { className: "truncate text-right font-medium", children: n.color_by }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "k max" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: n.neighbor_k_max }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "r max" }),
          /* @__PURE__ */ S.jsx("dd", { className: "text-right font-medium tabular-nums", children: ua(n.neighbor_radius_max, "0") }),
          /* @__PURE__ */ S.jsx("dt", { className: "text-muted-foreground", children: "Extent" }),
          /* @__PURE__ */ S.jsx("dd", { className: "truncate text-right font-medium", children: c })
        ] }) })
      ] })
    ] }) })
  ] });
}
function Ek({ lm: n }) {
  const {
    default_tension: o,
    neighbor_radius_max: r,
    neighbor_k_max: a,
    x_bounds: c,
    y_bounds: f
  } = n, d = n.selectedLandmark(), m = !!d && nk.includes(d.type), g = !!d && tk.includes(d.type), h = n.activeNeighborhood(), v = !!h, x = Math.max(rk(c, f), 1), y = r > 0 ? r : x, C = Math.max(1, a || 64), w = Math.min(Number(h?.neighborhood_radius || 0), y);
  return /* @__PURE__ */ S.jsxs(dm, { className: "pointer-events-auto max-h-full gap-1 overflow-hidden py-2 shadow-md", children: [
    /* @__PURE__ */ S.jsx(hm, { className: Je("shrink-0 py-0", ma), children: /* @__PURE__ */ S.jsx(mm, { className: "text-sm font-semibold tracking-tight", children: "Tools" }) }),
    /* @__PURE__ */ S.jsx(pm, { className: Je("min-h-0 overflow-hidden pb-2", ma), children: /* @__PURE__ */ S.jsxs(
      fm,
      {
        type: "multiple",
        defaultValue: ["neighbors", "landmark"],
        children: [
          /* @__PURE__ */ S.jsxs(_i, { value: "neighbors", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Neighbors" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Vh, { className: "gap-2", children: v ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
              /* @__PURE__ */ S.jsx(ml, { children: h.id ? String(h.id) : "Selection" }),
              /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-xs", children: [
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-foreground ring-1 ring-border" }),
                  "seed"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx(vs, { color: "#00e5cc" }),
                  "neighborhood"
                ] }),
                /* @__PURE__ */ S.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ S.jsx("span", { className: "size-2.5 shrink-0 rounded-full bg-muted-foreground/40 ring-1 ring-border" }),
                  "other"
                ] })
              ] }),
              /* @__PURE__ */ S.jsxs(So, { children: [
                /* @__PURE__ */ S.jsx(Eo, { children: "Neighborhood" }),
                /* @__PURE__ */ S.jsxs(
                  Ih,
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
                      /* @__PURE__ */ S.jsx(fr, { value: "off", children: "Off" }),
                      /* @__PURE__ */ S.jsx(fr, { value: "radius", children: "Radius" }),
                      /* @__PURE__ */ S.jsx(fr, { value: "knn", children: "k-NN" })
                    ]
                  }
                )
              ] }),
              h.neighborhood === "radius" ? /* @__PURE__ */ S.jsxs(So, { children: [
                /* @__PURE__ */ S.jsx(Eo, { children: "Radius" }),
                /* @__PURE__ */ S.jsx(
                  Oi,
                  {
                    min: 0,
                    max: y,
                    step: y / 200 || 1,
                    value: [w],
                    onValueChange: (A) => {
                      const O = Math.min(Math.max(A[0] ?? 0, 0), y);
                      n.patchNeighborhood({
                        neighborhood: "radius",
                        neighborhood_radius: O
                      });
                    }
                  }
                ),
                /* @__PURE__ */ S.jsxs(ml, { children: [
                  ua(w, "0"),
                  y > 0 ? ` / ${ua(y, "0")}` : ""
                ] })
              ] }) : null,
              h.neighborhood === "knn" ? /* @__PURE__ */ S.jsxs(So, { children: [
                /* @__PURE__ */ S.jsx(Eo, { children: "k" }),
                /* @__PURE__ */ S.jsx(
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
                /* @__PURE__ */ S.jsx(ml, { children: String(
                  Math.min(Number(h.neighborhood_k || 12), C)
                ) })
              ] }) : null,
              /* @__PURE__ */ S.jsx(ml, { children: "Sliders subset the precomputed k-max / radius-max graphs. Shift+wheel sizes the neighborhood." })
            ] }) : /* @__PURE__ */ S.jsx(ml, { children: "Select a type or selection to edit neighbors." }) }) })
          ] }),
          m || g ? /* @__PURE__ */ S.jsxs(_i, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Ai, { className: "px-0 py-1.5 text-left text-xs font-semibold hover:no-underline", children: "Landmark" }),
            /* @__PURE__ */ S.jsx(Mi, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(Vh, { className: "gap-2", children: [
              m ? /* @__PURE__ */ S.jsxs(So, { children: [
                /* @__PURE__ */ S.jsx(Eo, { children: "Tension" }),
                /* @__PURE__ */ S.jsx(
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
                /* @__PURE__ */ S.jsxs(ml, { children: [
                  Number(
                    d?.tension ?? o ?? 0
                  ).toPrecision(3),
                  ". 0 = smooth, 1 = straight."
                ] })
              ] }) : null,
              g ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                /* @__PURE__ */ S.jsxs(So, { children: [
                  /* @__PURE__ */ S.jsx(Eo, { children: "Buffer" }),
                  /* @__PURE__ */ S.jsxs(
                    Ih,
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
                        /* @__PURE__ */ S.jsx(fr, { value: "left", children: "Left" }),
                        /* @__PURE__ */ S.jsx(fr, { value: "both", children: "Both" }),
                        /* @__PURE__ */ S.jsx(fr, { value: "right", children: "Right" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ S.jsxs(So, { children: [
                  /* @__PURE__ */ S.jsx(Eo, { children: "Width" }),
                  /* @__PURE__ */ S.jsx(
                    Oi,
                    {
                      min: 0,
                      max: x,
                      step: x / 200,
                      value: [
                        Math.min(
                          Number(d?.buffer_width || 0),
                          x
                        )
                      ],
                      onValueChange: (A) => n.patchLandmark({ buffer_width: A[0] ?? 0 })
                    }
                  ),
                  /* @__PURE__ */ S.jsx(ml, { children: ua(Number(d?.buffer_width || 0)) })
                ] }),
                /* @__PURE__ */ S.jsx(ml, { children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
function Ck({
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
      children: /* @__PURE__ */ S.jsxs(tM, { orientation: "vertical", children: [
        /* @__PURE__ */ S.jsx(
          Ni,
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
            children: /* @__PURE__ */ S.jsx(DR, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          Ni,
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
            children: /* @__PURE__ */ S.jsx(d0, {})
          }
        ),
        /* @__PURE__ */ S.jsx(
          Ni,
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
            children: /* @__PURE__ */ S.jsx(AR, {})
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
}, Rk = 3;
function Yc(n) {
  return { ...xs, ...n };
}
function Hh(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function wk(n, o) {
  const r = n.get("gene_columns") || [], a = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!a.has(f) || c.includes(f)) && (c.push(f), c.length >= Rk))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((g) => g.name === d) || f[0];
    if (m) {
      Hh(n, m);
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
function _k(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function Ak(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function Z1(n, o, r, a, c, f) {
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
function $1(n, o, r, a, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (y, C) => C === r ? { ...xs, ...y, ...a } : y
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], v = h.findIndex(
    (y) => y.id === g && (!y.column || y.column === m)
  ), x = {
    ...xs,
    id: g,
    column: m,
    ...v >= 0 ? h[v] : {},
    ...a
  };
  v >= 0 ? h[v] = x : h.push(x), n.set("type_neighborhoods", h), n.save_changes();
}
function J1(n, o, r, a) {
  n.set(
    "landmarks",
    a.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function Uh(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function Mk(n, o) {
  n.set("mode", o), n.save_changes();
}
function W1(n, o) {
  return n.filter((r, a) => a !== o);
}
function eS(n, o, r, a) {
  return o !== n ? { kind: o, index: r } : r === a ? { kind: "", index: -1 } : r > a ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function Tk(n, o, r, a, c) {
  const f = eS("selection", a, c, o);
  n.set("selections", W1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Ok(n, o, r, a, c) {
  const f = eS("landmark", a, c, o);
  n.set("landmarks", W1(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function kk(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Nk(n, o, r, a) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    a.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function zk(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (a, c) => c === o ? { ...a, hidden: !a.hidden } : a
    )
  ), n.save_changes();
}
function Dk(n, o) {
  const r = Number(o);
  !Number.isFinite(r) || r < 0 || (n.set("point_size", r), n.save_changes());
}
function jk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("point_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Lk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("landmark_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Vk(n, o) {
  const r = Math.round(Number(o));
  Number.isFinite(r) && (n.set("stroke_width", Math.min(12, Math.max(1, r))), n.save_changes());
}
const Bh = "9.1.14", Ik = `https://esm.sh/@deck.gl/core@${Bh}`, Hk = `https://esm.sh/@deck.gl/layers@${Bh}?deps=@deck.gl/core@${Bh}`, wi = { depthCompare: "always", depthWriteEnabled: !1 }, Pv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], fh = "#00e5cc", Uk = 0.3, Bk = 0.9, qc = 2, dh = 1, Gk = 0.55, hh = ["line", "spline", "gradient"];
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
function Yk(n) {
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
function Xv({ model: n, host: o }) {
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
  const v = new MutationObserver(() => {
    h(), T && dt();
  });
  v.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function x(R, k, D) {
    g.textContent = R, g.hidden = !1;
    const U = o.getBoundingClientRect();
    g.style.left = `${k - U.left + 12}px`, g.style.top = `${D - U.top + 12}px`;
  }
  function y() {
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
  let T = null, _ = null, N = null, I = 0, q = !1, Y = null, L = null, X = { key: "", data: [] }, te = null, se = !1, fe = [], le = () => {
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
      const ge = Math.log1p(re), G = Math.log1p(ee);
      return G > ge ? G : G + 1e-6;
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
    const re = U.vmin ?? 0, ge = U.vmax ?? 1, G = Ae(ee, re, ge);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Ie = D > 0 ? D : Te(re, ge);
      return Math.max(0, Math.min(1, G / Ie));
    }
    const Se = it(re), Re = Te(re, ge);
    return Re <= Se ? 0 : Math.max(0, Math.min(1, (G - Se) / (Re - Se)));
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
    let re = 0, ge = 0, G = 0, Z = 0;
    for (let Se = 0; Se < D.length; Se++) {
      const Re = pt(R, D[Se], ee);
      if (!(Re > 0)) continue;
      const Ie = Et(pe[Se % pe.length], 1);
      re += Ie[0] * Re, ge += Ie[1] * Re, G += Ie[2] * Re, Z += Re;
    }
    return Z < 1e-6 ? Et("#6b7280", k * 0.35) : [
      Math.min(255, Math.round(re)),
      Math.min(255, Math.round(ge)),
      Math.min(255, Math.round(G)),
      Math.round(Math.max(0, Math.min(1, k)) * 255)
    ];
  }
  let Ne = null, Le = [], Ue = !1, _e = null, Ze = "", Oe = -1, We = !1, tt = !1, Xe = !1, ye = [], Q = !1, ce = null, He = null;
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
    Le = [], ye = [], Xe = !1, Q = !1, ce = null, He = null;
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
      dragPan: M === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function Nt() {
    const R = M === "select";
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
      const G = document.createElement("span");
      G.textContent = on(n.get("color_vmin")), re.appendChild(ge), re.appendChild(G);
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
          const Z = Math.max(0, Math.min(1, R.valueA)) * (ge.length - 1), Se = Math.floor(Z), Re = Math.min(ge.length - 1, Se + 1), Ie = Z - Se, ke = Et(ge[Se], k), Me = Et(ge[Re], k);
          U = ke.map((wt, Ht) => Math.round(wt + (Me[Ht] - wt) * Ie));
        } else
          U = Et(ge[0], k);
      }
    else {
      const re = n.get("category_columns") || [], ge = ne(), G = ge >= 0 ? re[ge] : null, Z = G && G.palette || n.get("point_palette") || ["#60a5fa"], Se = G ? oe(R.i) : Math.round(R.valueA);
      U = Et(Z[(Se % Z.length + Z.length) % Z.length], k);
    }
    if (!se || !te) return U;
    const ee = te[R.i] || 0;
    return ee === qc || ee === dh ? (U[3] = 255, U) : (U[3] = Math.round((U[3] || 255) * 0.28), U);
  }
  function Rn(R) {
    const k = n.get("point_size") ?? 2;
    if (!se || !te) return k;
    const D = te[R.i] || 0;
    return D === qc || D === dh ? k : k * Gk;
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
    if (M === "ellipse") {
      const D = (R.x + k.x) / 2, U = (R.y + k.y) / 2, ee = Math.abs(k.x - R.x) / 2, re = Math.abs(k.y - R.y) / 2, ge = [];
      for (let G = 0; G < 64; G++) {
        const Z = G / 64 * Math.PI * 2;
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
      ].map((G) => {
        const Z = Ll(G, ge, k);
        return [Z.x, Z.y];
      });
    }
    if (R.type === "ellipse") {
      const D = R.cx, U = R.cy, ee = R.rx, re = R.ry, ge = { x: D, y: U }, G = [];
      for (let Z = 0; Z < 64; Z++) {
        const Se = Z / 64 * Math.PI * 2, Re = Ll(
          { x: D + ee * Math.cos(Se), y: U + re * Math.sin(Se) },
          ge,
          k
        );
        G.push([Re.x, Re.y]);
      }
      return G;
    }
    return [];
  }
  function Ke() {
    const R = n.get("points_data") || "", [k, D] = n.get("x_bounds"), [U, ee] = n.get("y_bounds"), re = `${R.length}:${k}:${D}:${U}:${ee}:${R.slice(0, 32)}:${R.slice(-32)}`;
    if (re === X.key) return X.data;
    const ge = mh(R), G = Math.floor(ge.length / 4), Z = new Array(G);
    for (let Se = 0; Se < G; Se++) {
      const Re = Se * 4;
      Z[Se] = {
        i: Se,
        x: k + (ge[Re] + 1) / 2 * (D - k),
        y: U + (ge[Re + 1] + 1) / 2 * (ee - U),
        valueA: ge[Re + 2]
      };
    }
    return X = { key: re, data: Z }, Z;
  }
  function Qt(R, k = 8) {
    const D = R / Math.max(k, 1), ee = 10 ** Math.floor(Math.log10(Math.max(D, 1e-12))), re = D / ee;
    return (re <= 1 ? 1 : re <= 2 ? 2 : re <= 5 ? 5 : 10) * ee;
  }
  function wn() {
    const R = T?.isInitialized ? T.getViewports()?.[0] : null;
    if (R?.unproject && R.width > 1 && R.height > 1) {
      const [re, ge] = R.unproject([0, R.height]), [G, Z] = R.unproject([R.width, 0]);
      return {
        xMin: Math.min(re, G),
        xMax: Math.max(re, G),
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
    !R && k === L || (L = k, dt());
  }
  function nl() {
    if (!_) return null;
    const { PathLayer: R } = _, k = wn(), D = L || Qt(Math.max(k.xMax - k.xMin, k.yMax - k.yMin, 1e-9), 8);
    L = D;
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
    const G = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [Z, Se, Re] = Pc(G), Ie = [Math.round(Z * 255), Math.round(Se * 255), Math.round(Re * 255), 160];
    return new R({
      id: "landmarks-grid",
      data: ge,
      getPath: (ke) => ke.path,
      getColor: Ie,
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
    const { PolygonLayer: R } = _, k = n.get("selected_kind"), D = n.get("selected_index"), U = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ee = [];
    return (n.get("selections") || []).forEach((re, ge) => {
      const G = ut(re);
      if (G.length < 3) return;
      const Z = k === "selection" && ge === D;
      ee.push({
        polygon: G,
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
    const { PathLayer: R, PolygonLayer: k, ScatterplotLayer: D } = _, U = n.get("selected_kind"), ee = n.get("selected_index"), re = n.get("stroke_width") || 2, ge = n.get("landmark_opacity") || 0.25, G = [], Z = [], Se = [], Re = [], Ie = co(14);
    (n.get("landmarks") || []).forEach((Me, wt) => {
      if (Me.hidden) return;
      const Ht = Pv[wt % Pv.length], tn = U === "landmark" && wt === ee, Jn = tn ? re + 1 : re, Ot = Et(Ht, 1), pn = Et(Ht, ge), Sn = { kind: "landmark", index: wt };
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
        G.push({
          polygon: Ft(Wn),
          fill: pn,
          line: Ot,
          width: Jn,
          ...Sn
        }), (Me.vertices || []).forEach(([jn, Sl]) => {
          Se.push({
            position: [jn, Sl, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
        return;
      }
      const fo = Wl(Me);
      if (fo && G.push({
        polygon: Ft(fo),
        fill: Et(fh, Uk),
        line: Et(fh, Bk),
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
          const Sl = jl(jn, Ie);
          Sl && Re.push({ polygon: Sl, fill: Ot, line: Ot, width: 1, ...Sn });
        }
        (Me.vertices || []).forEach(([Sl, ho]) => {
          Se.push({
            position: [Sl, ho, 0],
            fill: Ot,
            radius: tn ? 5 : 4,
            ...Sn
          });
        });
      }
    });
    const ke = [];
    return (G.length || Re.length) && ke.push(
      new k({
        id: "landmark-polygons",
        data: [...G, ...Re],
        getPolygon: (Me) => Me.polygon,
        getFillColor: (Me) => Me.fill,
        getLineColor: (Me) => Me.line,
        getLineWidth: (Me) => Me.width,
        lineWidthUnits: "pixels",
        stroked: !0,
        filled: !0,
        pickable: !0,
        parameters: wi
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
        parameters: wi
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
        parameters: wi
      })
    ), ke;
  }
  function rn() {
    if (!_) return [];
    const { PathLayer: R, PolygonLayer: k, ScatterplotLayer: D } = _, U = ["lasso", "polygon", "rectangle", "ellipse"].includes(M), ee = U ? "#94a3b8" : "#00e5ff", re = Et(ee, 1), ge = Et(ee, 0.15), G = n.get("stroke_width") || 4, Z = [];
    let Se = null, Re = null, Ie = [];
    if (Xe && ye.length >= 2)
      Se = Ft(ye);
    else if (Q && ce && He)
      Re = ot(ce, He);
    else if (Le.length) {
      const ke = M === "spline" ? Yn(Le, n.get("default_tension") ?? 0, 20, !1) : M === "shape" ? Yn(Le, n.get("default_tension") ?? 0, 20, !0) : Le;
      M === "polygon" || M === "shape" ? (Re = Ft(ke), Se = Wt(ke)) : Se = Ft(ke), Ie = Le.map((Me) => ({ position: [Me.x, Me.y, 0], fill: re }));
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
        parameters: wi
      })
    ) : Se && Se.length >= 2 && Z.push(
      new R({
        id: "draft-path",
        data: [{ path: Se, color: re, width: U ? 2 : G }],
        getPath: (ke) => ke.path,
        getColor: (ke) => ke.color,
        getWidth: (ke) => ke.width,
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
        getPosition: (ke) => ke.position,
        getFillColor: (ke) => ke.fill,
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
    const k = T?.isInitialized ? T.getViewports()?.[0] : null;
    if (!k?.unproject) return R;
    const [D] = k.unproject([0, 0]), [U] = k.unproject([R, 0]);
    return Math.max(Math.abs(U - D), 1e-9);
  }
  function jl(R, k) {
    if (!R || R.length < 2 || !(k > 0)) return null;
    const D = R[R.length - 2], U = R[R.length - 1], ee = Math.hypot(U[0] - D[0], U[1] - D[1]) || 1, re = (U[0] - D[0]) / ee, ge = (U[1] - D[1]) / ee, G = -ge, Z = re, Se = [U[0] + re * k * 0.15, U[1] + ge * k * 0.15], Re = [U[0] - re * k, U[1] - ge * k];
    return [
      Se,
      [Re[0] + G * k * 0.55, Re[1] + Z * k * 0.55],
      [Re[0] - G * k * 0.55, Re[1] - Z * k * 0.55]
    ];
  }
  function ll(R, k, D, U) {
    const ee = [], re = [];
    if (!R || !D.length) return { edges: ee, neighbors: re };
    const ge = U?.mode || "knn", G = Math.max(0, U?.k | 0), Z = Number(U?.radius) || 0;
    if (ge === "knn" && G <= 0) return { edges: ee, neighbors: re };
    if (ge === "radius" && !(Z > 0)) return { edges: ee, neighbors: re };
    const { indptr: Se, indices: Re, distances: Ie } = R, ke = /* @__PURE__ */ new Set();
    for (const Me of D) {
      const wt = Se[Me] | 0, Ht = Se[Me + 1] | 0, tn = k[Me], Jn = ge === "knn" ? Math.min(Ht, wt + G) : Ht;
      for (let Ot = wt; Ot < Jn && !(ge === "radius" && (Ie && Ie.length ? Ie[Ot] : 0) > Z); Ot++) {
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
  function wo() {
    if (!_) return [];
    const R = vl(), k = $o(R);
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
  function Ct(R, k) {
    const [D, U] = n.get("x_bounds"), [ee, re] = n.get("y_bounds"), ge = (D + U) / 2, G = (ee + re) / 2, Z = Math.max(U - D, 1e-6), Se = Math.max(re - ee, 1e-6), Re = 40, Ie = Math.log2(
      Math.min((R - Re * 2) / Z, (k - Re * 2) / Se)
    );
    return {
      target: [ge, G, 0],
      zoom: Ie,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function Rt() {
    if (!T) return;
    const R = Math.max(1, d.clientWidth || d.width), k = Math.max(1, d.clientHeight || d.height);
    R <= 1 || k <= 1 || (N = Ct(R, k), Y = N.zoom, T.setProps({ viewState: N, width: R, height: k }), q = !0);
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
    })), Ne && (U.transitionInterpolator = Ne), U.transitionEasing = Yk), N = U, T.setProps({ viewState: U });
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
    Y = D.zoom, q = !0, Ye(
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
      parameters: { clearColor: Pc(R) },
      ...N ? { viewState: N } : {}
    }), typeof T.redraw == "function" && T.redraw(!0));
  };
  function Gi(R) {
    if (!T) return;
    const k = Gn();
    T.setProps({
      parameters: { clearColor: Pc(k) },
      ...R,
      ...N ? { viewState: N } : {}
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
      Ik
    ), k = await import(
      /* @vite-ignore */
      Hk
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
  async function Jl() {
    if (T) return;
    const { w: R, h: k } = xt();
    d.style.display = "block", h();
    try {
      const { Deck: D, OrthographicView: U } = await Yi(), ee = an();
      if (!ee.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const re = Ct(R, k);
      N = re, Y = re.zoom;
      const ge = Gn();
      T = new D({
        canvas: d,
        width: R,
        height: k,
        useDevicePixels: !0,
        views: new U(),
        controller: Bt(),
        initialViewState: re,
        parameters: { clearColor: Pc(ge) },
        layers: ee,
        pickingRadius: 8,
        getCursor: ({ isDragging: G, isHovering: Z }) => G ? "grabbing" : Z ? "pointer" : M === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: G }) => {
          N = G, T.setProps({ viewState: G }), Yt();
        },
        onClick: (G) => {
          if (M !== "select") return;
          const Z = G?.object;
          Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type" ? zn(Z.kind, Z.index) : zn("", -1);
        },
        onHover: (G) => {
          const Z = G?.object;
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
      }), Nt();
    } catch (D) {
      console.error("landmarks deck init failed", D);
      const U = document.createElement("div");
      U.className = "landmarks__error", U.textContent = `Deck renderer failed: ${D?.message || D}`, f.appendChild(U);
    }
  }
  function uo() {
    if (!T) return;
    const { w: R, h: k } = xt();
    Gi({ width: R, height: k }), !q && R > 1 && k > 1 ? Rt() : typeof T.redraw == "function" && T.redraw(!0);
  }
  function Yn(R, k, D, U) {
    const ee = D, ge = (1 - Math.max(0, Math.min(1, k ?? 0))) / 2;
    let G = R.slice(), Z, Se;
    if (U) {
      if (G.length >= 2) {
        const ke = G[0], Me = G[G.length - 1];
        ke.x === Me.x && ke.y === Me.y && (G = G.slice(0, -1));
      }
      if (G.length < 3) return G.slice();
      const Ie = G.length;
      Se = (ke) => G[(ke % Ie + Ie) % Ie], Z = Ie;
    } else {
      if (G.length < 2 || G.length === 2) return G.slice();
      const Ie = [
        { x: 2 * G[0].x - G[1].x, y: 2 * G[0].y - G[1].y },
        ...G,
        {
          x: 2 * G[G.length - 1].x - G[G.length - 2].x,
          y: 2 * G[G.length - 1].y - G[G.length - 2].y
        }
      ];
      Se = (ke) => Ie[ke + 1], Z = G.length - 1;
    }
    const Re = [];
    for (let Ie = 0; Ie < Z; Ie++) {
      const ke = Se(Ie - 1), Me = Se(Ie), wt = Se(Ie + 1), Ht = Se(Ie + 2), tn = ge * (wt.x - ke.x), Jn = ge * (wt.y - ke.y), Ot = ge * (Ht.x - Me.x), pn = ge * (Ht.y - Me.y);
      for (let Sn = 0; Sn < ee; Sn++) {
        const Wn = Sn / ee, fo = Wn * Wn, jn = fo * Wn, Sl = 2 * jn - 3 * fo + 1, ho = jn - 2 * fo + Wn, Ki = -2 * jn + 3 * fo, xa = jn - fo;
        Re.push({
          x: Sl * Me.x + ho * tn + Ki * wt.x + xa * Ot,
          y: Sl * Me.y + ho * Jn + Ki * wt.y + xa * pn
        });
      }
    }
    return Re.push({ ...Se(U ? Z : G.length - 1) }), Re;
  }
  function Ll(R, k, D) {
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
      const ee = R[Math.max(0, U - 1)], re = R[Math.min(R.length - 1, U + 1)], ge = Math.hypot(re.x - ee.x, re.y - ee.y) || 1, G = (re.x - ee.x) / ge, Z = (re.y - ee.y) / ge;
      return { x: D.x - Z * k, y: D.y + G * k };
    });
  }
  function Wl(R) {
    const k = Number(R.buffer_width || 0);
    if (!(k > 0) || !hh.includes(R.type)) return null;
    const D = ol(R);
    if (D.length < 2) return null;
    const U = R.buffer_side || "both";
    return U === "left" ? [...D, ...An(D, k).reverse()] : U === "right" ? [...D, ...An(D, -k).reverse()] : [...An(D, k), ...An(D, -k).reverse()];
  }
  function vl() {
    const R = n.get("selected_kind"), k = n.get("selected_index");
    return R === "type" || R === "selection" ? { kind: R, index: k } : null;
  }
  function qi() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function $o(R) {
    return R ? Z1(
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
  function Ar() {
    const R = qi();
    if (!R) return null;
    const k = n.get("landmarks") || [];
    return R.index >= 0 && R.index < k.length ? k[R.index] : null;
  }
  function eo(R) {
    const k = vl();
    k && ($1(
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
  function Wo(R) {
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
      const re = k[U][0], ge = k[U][1], G = k[ee][0], Z = k[ee][1];
      ge > R.y != Z > R.y && R.x < (G - re) * (R.y - ge) / (Z - ge + 1e-12) + re && (D = !D);
    }
    return D;
  }
  function sn() {
    const R = Ke();
    te = new Uint8Array(R.length), se = !1, fe = [];
    const k = vl();
    if (!k) return;
    const D = Wo(k);
    if (!D.length) {
      se = !0;
      return;
    }
    se = !0;
    for (const re of D) te[re] = qc;
    const U = $o(k);
    if (!U || U.neighborhood === "off") return;
    const ee = U.neighborhood === "radius" ? F : H;
    if (U.neighborhood === "radius" || U.neighborhood === "knn") {
      const re = Math.min(Number(U.neighborhood_k) || 12, en());
      let ge = Number(U.neighborhood_radius) || 0;
      const G = mn();
      G > 0 && (ge = Math.min(ge, G));
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
    const k = qi();
    k && (J1(n, k.index, R, n.get("landmarks") || []), dt());
  }
  function Zn(R) {
    if (!T?.isInitialized || !R) return null;
    const D = T.pickObject({ x: R.px, y: R.py, radius: 8 })?.object;
    return D?.kind ? { kind: D.kind, index: D.index } : null;
  }
  function zn(R, k) {
    Uh(n, R, k), dt();
  }
  function Dn() {
    st();
  }
  function _o() {
    if (!["polygon", "line", "spline", "shape"].includes(M)) return;
    const k = M === "line" || M === "spline" ? 2 : 3;
    if (Le.length < k) {
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
  function va(R, k) {
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
    const { dx: ee, dy: re } = va(D, U);
    if (R === "landmark") {
      const ge = n.get("landmarks") || [];
      n.set(
        "landmarks",
        ge.map(
          (G, Z) => Z !== k ? G : { ...G, vertices: (G.vertices || []).map(([Se, Re]) => [Se + ee, Re + re]) }
        )
      );
    } else {
      const ge = n.get("selections") || [];
      n.set(
        "selections",
        ge.map((G, Z) => Z !== k ? G : G.vertices ? { ...G, vertices: G.vertices.map(([Se, Re]) => [Se + ee, Re + re]) } : { ...G, cx: G.cx + ee, cy: G.cy + re })
      );
    }
    n.save_changes(), dt();
  }
  function Pi(R) {
    if (M === "select") return;
    R.preventDefault(), d.focus();
    const k = St(R);
    if (!k) return;
    We = !1;
    const D = Zn(k);
    if (M === "lasso") {
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
    if (M === "rectangle" || M === "ellipse") {
      if (D && D.kind === n.get("selected_kind") && D.index === n.get("selected_index")) {
        Ue = !0, _e = k, Ze = D.kind, Oe = D.index;
        return;
      }
      if (D) {
        zn(D.kind, D.index), tt = !0;
        return;
      }
      Q = !0, ce = k, He = k, dt();
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
  function Mr(R) {
    const k = St(R);
    if (!k) return;
    if (Ue && _e && Oe >= 0) {
      const ee = k.px - _e.px, re = k.py - _e.py;
      (ee || re) && (We = !0), Mn(Ze, Oe, ee, re), _e = k;
      return;
    }
    if (Xe) {
      ye.push(k), dt();
      return;
    }
    if (Q) {
      He = k, dt();
      return;
    }
    if (Le.length > 0 && ["polygon", "line", "spline", "shape"].includes(M)) {
      const ee = M === "line" || M === "spline" ? 2 : 3;
      x(Le.length >= ee ? "Enter to finish" : "Click", R.clientX, R.clientY);
      return;
    }
    if (M === "select") return;
    const U = Zn(k);
    if (U && (U.kind === "landmark" || U.kind === "selection")) {
      const re = (U.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[U.index]?.id;
      if (re) {
        x(String(re), R.clientX, R.clientY);
        return;
      }
    }
    y();
  }
  function ei(R) {
    if (M === "select" && !Ue) return;
    const k = St(R);
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
        const D = ce, U = He, ee = (D.x + U.x) / 2, re = (D.y + U.y) / 2, ge = Math.abs(U.x - D.x), G = Math.abs(U.y - D.y);
        if (ge > 1e-6 && G > 1e-6) {
          const Z = [...n.get("selections") || []];
          M === "rectangle" ? Z.push(Yc({ id: nt(Z), type: "rectangle", cx: ee, cy: re, width: ge, height: G, angle: 0 })) : Z.push(Yc({ id: nt(Z), type: "ellipse", cx: ee, cy: re, rx: ge / 2, ry: G / 2, angle: 0 })), n.set("selections", Z), n.set("selected_kind", "selection"), n.set("selected_index", Z.length - 1), n.save_changes();
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
    if (k && !(M === "select" || M === "lasso" || M === "rectangle" || M === "ellipse")) {
      if (M === "point") {
        const D = [...n.get("landmarks") || []];
        D.push({ id: Ge(D), type: "point", vertices: [[k.x, k.y]] }), n.set("landmarks", D), n.set("selected_kind", "landmark"), n.set("selected_index", D.length - 1), n.save_changes(), Dn(), dt();
        return;
      }
      Le.push({ x: k.x, y: k.y }), dt();
    }
  }
  function xl() {
    y(), Ue && (Ue = !1, _e = null), Xe && (Xe = !1, ye = [], dt()), Q && (Q = !1, ce = null, He = null, dt());
  }
  function Xi(R) {
    R.preventDefault(), Le.length && Le.pop(), _o(), y();
  }
  function Ao(R) {
    R.key === "Enter" ? (R.preventDefault(), _o(), y()) : R.key === "Escape" ? (Tt(), zn("", -1), dt()) : (R.key === "Backspace" || R.key === "Delete") && Le.length && (Le.pop(), dt());
  }
  const Vl = new AbortController(), { signal: al } = Vl;
  d.addEventListener(
    "wheel",
    (R) => {
      if (!R.shiftKey) return;
      const k = Ar();
      if (k && hh.includes(k.type)) {
        R.preventDefault(), R.stopImmediatePropagation();
        const U = il(), ee = U / 40, re = Math.max(
          0,
          Math.min(U, (Number(k.buffer_width) || 0) + (R.deltaY > 0 ? -ee : ee))
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
  ), d.addEventListener("mousedown", Pi, { signal: al }), d.addEventListener("mousemove", Mr, { signal: al }), d.addEventListener("mouseup", ei, { signal: al }), d.addEventListener("mouseleave", xl, { signal: al }), d.addEventListener("dblclick", Xi, { signal: al }), d.addEventListener("keydown", Ao, { signal: al });
  const ti = [];
  function cn(R, k) {
    const D = `change:${R}`;
    n.on(D, k), ti.push(() => n.off?.(D, k));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((R) => {
    cn(R, () => {
      dt(), Dn();
    });
  }), cn("mode", () => {
    M = n.get("mode"), Tt(), Nt(), dt();
  }), cn("width", () => {
    uo();
  }), cn("height", () => {
    uo();
  }), cn("points_data", () => {
    X = { key: "", data: [] }, T ? dt() : Jl(), st();
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
  let sl = null, to = 0, Mo = !1;
  const no = () => {
    if (Mo) return;
    const R = c.clientWidth, k = c.clientHeight;
    if (R <= 1 || k <= 1) {
      to = requestAnimationFrame(no);
      return;
    }
    to = requestAnimationFrame(async () => {
      if (await Jl(), Mo) {
        T && typeof T.finalize == "function" && T.finalize(), T = null;
        return;
      }
      dt(), sl = new ResizeObserver(() => uo()), sl.observe(c);
    });
  };
  to = requestAnimationFrame(no);
  function $n() {
    Mo = !0, Vl.abort(), ti.forEach((R) => R()), v.disconnect(), sl?.disconnect(), to && cancelAnimationFrame(to), I && cancelAnimationFrame(I), T && typeof T.finalize == "function" && T.finalize(), T = null, o.replaceChildren();
  }
  return {
    zoomBy: (R) => le(R),
    resetZoom: () => he(),
    resize: () => uo(),
    destroy: $n
  };
}
function qk(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const a = (d) => {
    const m = r.current.map((g) => {
      const h = `change:${String(g)}`, v = () => d();
      return n.on(h, v), { event: h, handler: v };
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
const Pk = [
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
function Xk(n) {
  const o = qk(n, Pk);
  return {
    ...o,
    setMode(r) {
      Mk(n, r);
    },
    select(r, a) {
      Uh(n, r, a);
    },
    setActiveCategory(r) {
      Hh(n, r);
    },
    setActiveGenes(r) {
      wk(n, r);
    },
    setGeneScaleMode(r) {
      _k(n, r);
    },
    setGeneLog1p(r) {
      Ak(n, r);
    },
    selectType(r, a) {
      r.name !== o.active_category && Hh(n, r), Uh(n, "type", a);
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
      Tk(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      Ok(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, a) {
      kk(n, r, a, o.selections);
    },
    renameLandmark(r, a) {
      Nk(n, r, a, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      zk(n, r, o.landmarks);
    },
    setPointSize(r) {
      Dk(n, r);
    },
    setPointOpacity(r) {
      jk(n, r);
    },
    setLandmarkOpacity(r) {
      Lk(n, r);
    },
    setStrokeWidth(r) {
      Vk(n, r);
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
function gh(n) {
  if (document.fullscreenElement === n) return !0;
  try {
    return n.matches(":fullscreen") || n.matches(":-webkit-full-screen");
  } catch {
    return !1;
  }
}
function Kk(n, o) {
  const r = b.useRef("off"), [a, c] = b.useState("off"), f = b.useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        o();
      });
    });
  }, [o]), d = b.useCallback((y) => {
    r.current = y, c(y);
  }, []), m = b.useCallback(() => {
    if (r.current === "off") return;
    const y = n.current;
    d("off"), document.body.style.overflow = "", f(), y?.scrollIntoView({ block: "nearest" });
  }, [n, d, f]), g = b.useCallback(() => {
    const y = n.current;
    if (y) {
      if (gh(y)) {
        r.current !== "native" && (d("native"), document.body.style.overflow = "hidden", f());
        return;
      }
      r.current === "native" && m();
    }
  }, [n, m, d, f]);
  b.useEffect(() => (document.addEventListener("fullscreenchange", g), g(), () => document.removeEventListener("fullscreenchange", g)), [g]), b.useEffect(() => {
    if (a !== "overlay") return;
    const y = (C) => {
      C.key === "Escape" && m();
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [a, m]);
  const h = b.useCallback(() => {
    const y = n.current;
    return r.current !== "off" ? !0 : !!y && gh(y);
  }, [n]), v = b.useCallback(() => {
    const y = n.current;
    if (y) {
      if (r.current === "overlay") {
        m();
        return;
      }
      if (gh(y) || document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      r.current !== "off" && m();
    }
  }, [n, m]), x = b.useCallback(async () => {
    const y = n.current;
    if (y) {
      if (h()) {
        v();
        return;
      }
      try {
        await y.requestFullscreen(), g();
      } catch {
        d("overlay"), document.body.style.overflow = "hidden", f();
      }
    }
  }, [n, h, v, d, f, g]);
  return {
    isFullscreen: a !== "off",
    overlay: a === "overlay",
    toggle: x,
    leave: v
  };
}
const Fk = 700, Qk = 400, Zk = 1400;
function $k({
  model: n,
  hostEl: o
}) {
  const r = mC(o.parentElement), a = Xk(n), c = b.useRef(null), f = b.useRef(null), d = b.useRef(null), [m, g] = b.useState(Fk), h = b.useRef(null), v = b.useRef(!1), x = b.useCallback(() => {
    d.current?.resize();
  }, []), { isFullscreen: y, overlay: C, toggle: w } = Kk(
    f,
    x
  );
  b.useEffect(() => {
    y && !v.current && (h.current = m), !y && v.current && h.current != null && (g(h.current), h.current = null, x()), v.current = y;
  }, [y, m, x]), b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const O = c.current;
    if (!O) return;
    const M = Xv({ model: n, host: O });
    return d.current = M, () => {
      M.destroy(), d.current = null;
    };
  }, [n, Xv]);
  const A = b.useCallback(
    (O) => {
      O.preventDefault(), O.stopPropagation();
      const M = Math.min(window.innerHeight * 0.9, Zk), T = {
        y: O.clientY,
        h: m,
        maxH: M
      }, _ = (I) => {
        g(
          Math.round(
            Math.min(T.maxH, Math.max(Qk, T.h + (I.clientY - T.y)))
          )
        );
      }, N = () => {
        window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", N), x();
      };
      window.addEventListener("pointermove", _), window.addEventListener("pointerup", N);
    },
    [m, x]
  );
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      ref: f,
      className: Je(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        r && "dark landmarks--dark",
        !r && "landmarks--light",
        y && "landmarks--fs",
        C && "landmarks--overlay-fs"
      ),
      children: [
        /* @__PURE__ */ S.jsxs(
          "div",
          {
            className: "landmarks__body",
            style: y ? void 0 : { height: m },
            children: [
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks__figure", children: [
                /* @__PURE__ */ S.jsx(
                  ck,
                  {
                    modes: a.modes,
                    mode: a.mode,
                    onMode: (O) => a.setMode(O),
                    fullscreen: y,
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
                    Ck,
                    {
                      onZoomIn: () => d.current?.zoomBy(1),
                      onZoomOut: () => d.current?.zoomBy(-1),
                      onReset: () => d.current?.resetZoom()
                    }
                  )
                ] })
              ] }),
              y ? null : /* @__PURE__ */ S.jsx(
                "button",
                {
                  type: "button",
                  className: "landmarks__resize",
                  "aria-label": "Resize height",
                  title: "Resize height",
                  onPointerDown: A
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "absolute top-12 left-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(xk, { lm: a })
            }
          ),
          /* @__PURE__ */ S.jsxs(
            "div",
            {
              className: "absolute top-12 right-2.5 flex w-56 max-h-[calc(100%-3.25rem)] flex-col gap-2 overflow-y-auto p-2 -m-1",
              onMouseDown: (O) => O.stopPropagation(),
              onWheel: (O) => O.stopPropagation(),
              children: [
                /* @__PURE__ */ S.jsx(Sk, { lm: a }),
                /* @__PURE__ */ S.jsx(Ek, { lm: a })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const us = /* @__PURE__ */ new WeakMap();
function Jk({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = us.get(o);
  r && (r.unmount(), us.delete(o));
  const a = dC.createRoot(o);
  return us.set(o, a), a.render(/* @__PURE__ */ S.jsx($k, { model: n, hostEl: o })), () => {
    a.unmount(), us.get(o) === a && us.delete(o);
  };
}
const lN = { render: Jk };
export {
  lN as default
};
