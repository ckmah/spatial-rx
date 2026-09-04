var fy = (n) => {
  throw TypeError(n);
};
var dy = (n, o, r) => o.has(n) || fy("Cannot " + r);
var qn = (n, o, r) => (dy(n, o, "read from private field"), r ? r.call(n) : o.get(n)), hy = (n, o, r) => o.has(n) ? fy("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(n) : o.set(n, r), Od = (n, o, r, i) => (dy(n, o, "write to private field"), i ? i.call(n, r) : o.set(n, r), r);
function sC(n, o) {
  for (var r = 0; r < o.length; r++) {
    const i = o[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const c in i)
        if (c !== "default" && !(c in n)) {
          const f = Object.getOwnPropertyDescriptor(i, c);
          f && Object.defineProperty(n, c, f.get ? f : {
            enumerable: !0,
            get: () => i[c]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function cC(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var kd = { exports: {} }, ns = {};
var my;
function uC() {
  if (my) return ns;
  my = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(i, c, f) {
    var d = null;
    if (f !== void 0 && (d = "" + f), c.key !== void 0 && (d = "" + c.key), "key" in c) {
      f = {};
      for (var m in c)
        m !== "key" && (f[m] = c[m]);
    } else f = c;
    return c = f.ref, {
      $$typeof: n,
      type: i,
      key: d,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return ns.Fragment = o, ns.jsx = r, ns.jsxs = r, ns;
}
var py;
function fC() {
  return py || (py = 1, kd.exports = uC()), kd.exports;
}
var S = fC(), Nd = { exports: {} }, ls = {}, zd = { exports: {} }, Dd = {};
var gy;
function dC() {
  return gy || (gy = 1, (function(n) {
    function o(V, H) {
      var F = V.length;
      V.push(H);
      e: for (; 0 < F; ) {
        var ve = F - 1 >>> 1, se = V[ve];
        if (0 < c(se, H))
          V[ve] = H, V[F] = se, F = ve;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function i(V) {
      if (V.length === 0) return null;
      var H = V[0], F = V.pop();
      if (F !== H) {
        V[0] = F;
        e: for (var ve = 0, se = V.length, D = se >>> 1; ve < D; ) {
          var K = 2 * (ve + 1) - 1, le = V[K], oe = K + 1, pe = V[oe];
          if (0 > c(le, F))
            oe < se && 0 > c(pe, le) ? (V[ve] = pe, V[oe] = F, ve = oe) : (V[ve] = le, V[K] = F, ve = K);
          else if (oe < se && 0 > c(pe, F))
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
    var g = [], h = [], y = 1, x = null, v = 3, E = !1, A = !1, T = !1, O = !1, w = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function N(V) {
      for (var H = r(h); H !== null; ) {
        if (H.callback === null) i(h);
        else if (H.startTime <= V)
          i(h), H.sortIndex = H.expirationTime, o(g, H);
        else break;
        H = r(h);
      }
    }
    function I(V) {
      if (T = !1, N(V), !A)
        if (r(g) !== null)
          A = !0, q || (q = !0, fe());
        else {
          var H = r(h);
          H !== null && be(I, H.startTime - V);
        }
    }
    var q = !1, G = -1, z = 5, P = -1;
    function te() {
      return O ? !0 : !(n.unstable_now() - P < z);
    }
    function ie() {
      if (O = !1, q) {
        var V = n.unstable_now();
        P = V;
        var H = !0;
        try {
          e: {
            A = !1, T && (T = !1, M(G), G = -1), E = !0;
            var F = v;
            try {
              t: {
                for (N(V), x = r(g); x !== null && !(x.expirationTime > V && te()); ) {
                  var ve = x.callback;
                  if (typeof ve == "function") {
                    x.callback = null, v = x.priorityLevel;
                    var se = ve(
                      x.expirationTime <= V
                    );
                    if (V = n.unstable_now(), typeof se == "function") {
                      x.callback = se, N(V), H = !0;
                      break t;
                    }
                    x === r(g) && i(g), N(V);
                  } else i(g);
                  x = r(g);
                }
                if (x !== null) H = !0;
                else {
                  var D = r(h);
                  D !== null && be(
                    I,
                    D.startTime - V
                  ), H = !1;
                }
              }
              break e;
            } finally {
              x = null, v = F, E = !1;
            }
            H = void 0;
          }
        } finally {
          H ? fe() : q = !1;
        }
      }
    }
    var fe;
    if (typeof R == "function")
      fe = function() {
        R(ie);
      };
    else if (typeof MessageChannel < "u") {
      var ne = new MessageChannel(), he = ne.port2;
      ne.port1.onmessage = ie, fe = function() {
        he.postMessage(null);
      };
    } else
      fe = function() {
        w(ie, 0);
      };
    function be(V, H) {
      G = w(function() {
        V(n.unstable_now());
      }, H);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, n.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : z = 0 < V ? Math.floor(1e3 / V) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return v;
    }, n.unstable_next = function(V) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = v;
      }
      var F = v;
      v = H;
      try {
        return V();
      } finally {
        v = F;
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
      var F = v;
      v = V;
      try {
        return H();
      } finally {
        v = F;
      }
    }, n.unstable_scheduleCallback = function(V, H, F) {
      var ve = n.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ve + F : ve) : F = ve, V) {
        case 1:
          var se = -1;
          break;
        case 2:
          se = 250;
          break;
        case 5:
          se = 1073741823;
          break;
        case 4:
          se = 1e4;
          break;
        default:
          se = 5e3;
      }
      return se = F + se, V = {
        id: y++,
        callback: H,
        priorityLevel: V,
        startTime: F,
        expirationTime: se,
        sortIndex: -1
      }, F > ve ? (V.sortIndex = F, o(h, V), r(g) === null && V === r(h) && (T ? (M(G), G = -1) : T = !0, be(I, F - ve))) : (V.sortIndex = se, o(g, V), A || E || (A = !0, q || (q = !0, fe()))), V;
    }, n.unstable_shouldYield = te, n.unstable_wrapCallback = function(V) {
      var H = v;
      return function() {
        var F = v;
        v = H;
        try {
          return V.apply(this, arguments);
        } finally {
          v = F;
        }
      };
    };
  })(Dd)), Dd;
}
var by;
function hC() {
  return by || (by = 1, zd.exports = dC()), zd.exports;
}
var jd = { exports: {} }, lt = {};
var yy;
function mC() {
  if (yy) return lt;
  yy = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), i = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), d = /* @__PURE__ */ Symbol.for("react.context"), m = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), h = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), x = /* @__PURE__ */ Symbol.for("react.activity"), v = Symbol.iterator;
  function E(D) {
    return D === null || typeof D != "object" ? null : (D = v && D[v] || D["@@iterator"], typeof D == "function" ? D : null);
  }
  var A = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, T = Object.assign, O = {};
  function w(D, K, le) {
    this.props = D, this.context = K, this.refs = O, this.updater = le || A;
  }
  w.prototype.isReactComponent = {}, w.prototype.setState = function(D, K) {
    if (typeof D != "object" && typeof D != "function" && D != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, D, K, "setState");
  }, w.prototype.forceUpdate = function(D) {
    this.updater.enqueueForceUpdate(this, D, "forceUpdate");
  };
  function M() {
  }
  M.prototype = w.prototype;
  function R(D, K, le) {
    this.props = D, this.context = K, this.refs = O, this.updater = le || A;
  }
  var N = R.prototype = new M();
  N.constructor = R, T(N, w.prototype), N.isPureReactComponent = !0;
  var I = Array.isArray;
  function q() {
  }
  var G = { H: null, A: null, T: null, S: null }, z = Object.prototype.hasOwnProperty;
  function P(D, K, le) {
    var oe = le.ref;
    return {
      $$typeof: n,
      type: D,
      key: K,
      ref: oe !== void 0 ? oe : null,
      props: le
    };
  }
  function te(D, K) {
    return P(D.type, K, D.props);
  }
  function ie(D) {
    return typeof D == "object" && D !== null && D.$$typeof === n;
  }
  function fe(D) {
    var K = { "=": "=0", ":": "=2" };
    return "$" + D.replace(/[=:]/g, function(le) {
      return K[le];
    });
  }
  var ne = /\/+/g;
  function he(D, K) {
    return typeof D == "object" && D !== null && D.key != null ? fe("" + D.key) : K.toString(36);
  }
  function be(D) {
    switch (D.status) {
      case "fulfilled":
        return D.value;
      case "rejected":
        throw D.reason;
      default:
        switch (typeof D.status == "string" ? D.then(q, q) : (D.status = "pending", D.then(
          function(K) {
            D.status === "pending" && (D.status = "fulfilled", D.value = K);
          },
          function(K) {
            D.status === "pending" && (D.status = "rejected", D.reason = K);
          }
        )), D.status) {
          case "fulfilled":
            return D.value;
          case "rejected":
            throw D.reason;
        }
    }
    throw D;
  }
  function V(D, K, le, oe, pe) {
    var _e = typeof D;
    (_e === "undefined" || _e === "boolean") && (D = null);
    var qe = !1;
    if (D === null) qe = !0;
    else
      switch (_e) {
        case "bigint":
        case "string":
        case "number":
          qe = !0;
          break;
        case "object":
          switch (D.$$typeof) {
            case n:
            case o:
              qe = !0;
              break;
            case y:
              return qe = D._init, V(
                qe(D._payload),
                K,
                le,
                oe,
                pe
              );
          }
      }
    if (qe)
      return pe = pe(D), qe = oe === "" ? "." + he(D, 0) : oe, I(pe) ? (le = "", qe != null && (le = qe.replace(ne, "$&/") + "/"), V(pe, K, le, "", function(at) {
        return at;
      })) : pe != null && (ie(pe) && (pe = te(
        pe,
        le + (pe.key == null || D && D.key === pe.key ? "" : ("" + pe.key).replace(
          ne,
          "$&/"
        ) + "/") + qe
      )), K.push(pe)), 1;
    qe = 0;
    var Ae = oe === "" ? "." : oe + ":";
    if (I(D))
      for (var Te = 0; Te < D.length; Te++)
        oe = D[Te], _e = Ae + he(oe, Te), qe += V(
          oe,
          K,
          le,
          _e,
          pe
        );
    else if (Te = E(D), typeof Te == "function")
      for (D = Te.call(D), Te = 0; !(oe = D.next()).done; )
        oe = oe.value, _e = Ae + he(oe, Te++), qe += V(
          oe,
          K,
          le,
          _e,
          pe
        );
    else if (_e === "object") {
      if (typeof D.then == "function")
        return V(
          be(D),
          K,
          le,
          oe,
          pe
        );
      throw K = String(D), Error(
        "Objects are not valid as a React child (found: " + (K === "[object Object]" ? "object with keys {" + Object.keys(D).join(", ") + "}" : K) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return qe;
  }
  function H(D, K, le) {
    if (D == null) return D;
    var oe = [], pe = 0;
    return V(D, oe, "", "", function(_e) {
      return K.call(le, _e, pe++);
    }), oe;
  }
  function F(D) {
    if (D._status === -1) {
      var K = D._result;
      K = K(), K.then(
        function(le) {
          (D._status === 0 || D._status === -1) && (D._status = 1, D._result = le);
        },
        function(le) {
          (D._status === 0 || D._status === -1) && (D._status = 2, D._result = le);
        }
      ), D._status === -1 && (D._status = 0, D._result = K);
    }
    if (D._status === 1) return D._result.default;
    throw D._result;
  }
  var ve = typeof reportError == "function" ? reportError : function(D) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var K = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof D == "object" && D !== null && typeof D.message == "string" ? String(D.message) : String(D),
        error: D
      });
      if (!window.dispatchEvent(K)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", D);
      return;
    }
    console.error(D);
  }, se = {
    map: H,
    forEach: function(D, K, le) {
      H(
        D,
        function() {
          K.apply(this, arguments);
        },
        le
      );
    },
    count: function(D) {
      var K = 0;
      return H(D, function() {
        K++;
      }), K;
    },
    toArray: function(D) {
      return H(D, function(K) {
        return K;
      }) || [];
    },
    only: function(D) {
      if (!ie(D))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return D;
    }
  };
  return lt.Activity = x, lt.Children = se, lt.Component = w, lt.Fragment = r, lt.Profiler = c, lt.PureComponent = R, lt.StrictMode = i, lt.Suspense = g, lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, lt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(D) {
      return G.H.useMemoCache(D);
    }
  }, lt.cache = function(D) {
    return function() {
      return D.apply(null, arguments);
    };
  }, lt.cacheSignal = function() {
    return null;
  }, lt.cloneElement = function(D, K, le) {
    if (D == null)
      throw Error(
        "The argument must be a React element, but you passed " + D + "."
      );
    var oe = T({}, D.props), pe = D.key;
    if (K != null)
      for (_e in K.key !== void 0 && (pe = "" + K.key), K)
        !z.call(K, _e) || _e === "key" || _e === "__self" || _e === "__source" || _e === "ref" && K.ref === void 0 || (oe[_e] = K[_e]);
    var _e = arguments.length - 2;
    if (_e === 1) oe.children = le;
    else if (1 < _e) {
      for (var qe = Array(_e), Ae = 0; Ae < _e; Ae++)
        qe[Ae] = arguments[Ae + 2];
      oe.children = qe;
    }
    return P(D.type, pe, oe);
  }, lt.createContext = function(D) {
    return D = {
      $$typeof: d,
      _currentValue: D,
      _currentValue2: D,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, D.Provider = D, D.Consumer = {
      $$typeof: f,
      _context: D
    }, D;
  }, lt.createElement = function(D, K, le) {
    var oe, pe = {}, _e = null;
    if (K != null)
      for (oe in K.key !== void 0 && (_e = "" + K.key), K)
        z.call(K, oe) && oe !== "key" && oe !== "__self" && oe !== "__source" && (pe[oe] = K[oe]);
    var qe = arguments.length - 2;
    if (qe === 1) pe.children = le;
    else if (1 < qe) {
      for (var Ae = Array(qe), Te = 0; Te < qe; Te++)
        Ae[Te] = arguments[Te + 2];
      pe.children = Ae;
    }
    if (D && D.defaultProps)
      for (oe in qe = D.defaultProps, qe)
        pe[oe] === void 0 && (pe[oe] = qe[oe]);
    return P(D, _e, pe);
  }, lt.createRef = function() {
    return { current: null };
  }, lt.forwardRef = function(D) {
    return { $$typeof: m, render: D };
  }, lt.isValidElement = ie, lt.lazy = function(D) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: D },
      _init: F
    };
  }, lt.memo = function(D, K) {
    return {
      $$typeof: h,
      type: D,
      compare: K === void 0 ? null : K
    };
  }, lt.startTransition = function(D) {
    var K = G.T, le = {};
    G.T = le;
    try {
      var oe = D(), pe = G.S;
      pe !== null && pe(le, oe), typeof oe == "object" && oe !== null && typeof oe.then == "function" && oe.then(q, ve);
    } catch (_e) {
      ve(_e);
    } finally {
      K !== null && le.types !== null && (K.types = le.types), G.T = K;
    }
  }, lt.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, lt.use = function(D) {
    return G.H.use(D);
  }, lt.useActionState = function(D, K, le) {
    return G.H.useActionState(D, K, le);
  }, lt.useCallback = function(D, K) {
    return G.H.useCallback(D, K);
  }, lt.useContext = function(D) {
    return G.H.useContext(D);
  }, lt.useDebugValue = function() {
  }, lt.useDeferredValue = function(D, K) {
    return G.H.useDeferredValue(D, K);
  }, lt.useEffect = function(D, K) {
    return G.H.useEffect(D, K);
  }, lt.useEffectEvent = function(D) {
    return G.H.useEffectEvent(D);
  }, lt.useId = function() {
    return G.H.useId();
  }, lt.useImperativeHandle = function(D, K, le) {
    return G.H.useImperativeHandle(D, K, le);
  }, lt.useInsertionEffect = function(D, K) {
    return G.H.useInsertionEffect(D, K);
  }, lt.useLayoutEffect = function(D, K) {
    return G.H.useLayoutEffect(D, K);
  }, lt.useMemo = function(D, K) {
    return G.H.useMemo(D, K);
  }, lt.useOptimistic = function(D, K) {
    return G.H.useOptimistic(D, K);
  }, lt.useReducer = function(D, K, le) {
    return G.H.useReducer(D, K, le);
  }, lt.useRef = function(D) {
    return G.H.useRef(D);
  }, lt.useState = function(D) {
    return G.H.useState(D);
  }, lt.useSyncExternalStore = function(D, K, le) {
    return G.H.useSyncExternalStore(
      D,
      K,
      le
    );
  }, lt.useTransition = function() {
    return G.H.useTransition();
  }, lt.version = "19.2.8", lt;
}
var vy;
function vs() {
  return vy || (vy = 1, jd.exports = mC()), jd.exports;
}
var Ld = { exports: {} }, Pn = {};
var xy;
function pC() {
  if (xy) return Pn;
  xy = 1;
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
  var i = {
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
    var x = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: x == null ? null : "" + x,
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
  return Pn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, Pn.createPortal = function(g, h) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return f(g, h, null, y);
  }, Pn.flushSync = function(g) {
    var h = d.T, y = i.p;
    try {
      if (d.T = null, i.p = 2, g) return g();
    } finally {
      d.T = h, i.p = y, i.d.f();
    }
  }, Pn.preconnect = function(g, h) {
    typeof g == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, i.d.C(g, h));
  }, Pn.prefetchDNS = function(g) {
    typeof g == "string" && i.d.D(g);
  }, Pn.preinit = function(g, h) {
    if (typeof g == "string" && h && typeof h.as == "string") {
      var y = h.as, x = m(y, h.crossOrigin), v = typeof h.integrity == "string" ? h.integrity : void 0, E = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      y === "style" ? i.d.S(
        g,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: x,
          integrity: v,
          fetchPriority: E
        }
      ) : y === "script" && i.d.X(g, {
        crossOrigin: x,
        integrity: v,
        fetchPriority: E,
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
          i.d.M(g, {
            crossOrigin: y,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && i.d.M(g);
  }, Pn.preload = function(g, h) {
    if (typeof g == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var y = h.as, x = m(y, h.crossOrigin);
      i.d.L(g, y, {
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
        var y = m(h.as, h.crossOrigin);
        i.d.m(g, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: y,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else i.d.m(g);
  }, Pn.requestFormReset = function(g) {
    i.d.r(g);
  }, Pn.unstable_batchedUpdates = function(g, h) {
    return g(h);
  }, Pn.useFormState = function(g, h, y) {
    return d.H.useFormState(g, h, y);
  }, Pn.useFormStatus = function() {
    return d.H.useHostTransitionStatus();
  }, Pn.version = "19.2.8", Pn;
}
var Sy;
function Xv() {
  if (Sy) return Ld.exports;
  Sy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Ld.exports = pC(), Ld.exports;
}
var Ey;
function gC() {
  if (Ey) return ls;
  Ey = 1;
  var n = hC(), o = vs(), r = Xv();
  function i(e) {
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
      throw Error(i(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = f(e), t === null) throw Error(i(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var s = l.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (a = s.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === l) return g(s), e;
          if (u === a) return g(s), t;
          u = u.sibling;
        }
        throw Error(i(188));
      }
      if (l.return !== a.return) l = s, a = u;
      else {
        for (var p = !1, C = s.child; C; ) {
          if (C === l) {
            p = !0, l = s, a = u;
            break;
          }
          if (C === a) {
            p = !0, a = s, l = u;
            break;
          }
          C = C.sibling;
        }
        if (!p) {
          for (C = u.child; C; ) {
            if (C === l) {
              p = !0, l = u, a = s;
              break;
            }
            if (C === a) {
              p = !0, a = u, l = s;
              break;
            }
            C = C.sibling;
          }
          if (!p) throw Error(i(189));
        }
      }
      if (l.alternate !== a) throw Error(i(190));
    }
    if (l.tag !== 3) throw Error(i(188));
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
  var x = Object.assign, v = /* @__PURE__ */ Symbol.for("react.element"), E = /* @__PURE__ */ Symbol.for("react.transitional.element"), A = /* @__PURE__ */ Symbol.for("react.portal"), T = /* @__PURE__ */ Symbol.for("react.fragment"), O = /* @__PURE__ */ Symbol.for("react.strict_mode"), w = /* @__PURE__ */ Symbol.for("react.profiler"), M = /* @__PURE__ */ Symbol.for("react.consumer"), R = /* @__PURE__ */ Symbol.for("react.context"), N = /* @__PURE__ */ Symbol.for("react.forward_ref"), I = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.suspense_list"), G = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), P = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), ie = Symbol.iterator;
  function fe(e) {
    return e === null || typeof e != "object" ? null : (e = ie && e[ie] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ne = /* @__PURE__ */ Symbol.for("react.client.reference");
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ne ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case w:
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
        case A:
          return "Portal";
        case R:
          return e.displayName || "Context";
        case M:
          return (e._context.displayName || "Context") + ".Consumer";
        case N:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case G:
          return t = e.displayName || null, t !== null ? t : he(e.type) || "Memo";
        case z:
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
  }, ve = [], se = -1;
  function D(e) {
    return { current: e };
  }
  function K(e) {
    0 > se || (e.current = ve[se], ve[se] = null, se--);
  }
  function le(e, t) {
    se++, ve[se] = e.current, e.current = t;
  }
  var oe = D(null), pe = D(null), _e = D(null), qe = D(null);
  function Ae(e, t) {
    switch (le(_e, t), le(pe, e), le(oe, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Db(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Db(t), e = jb(t, e);
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
    K(oe), le(oe, e);
  }
  function Te() {
    K(oe), K(pe), K(_e);
  }
  function at(e) {
    e.memoizedState !== null && le(qe, e);
    var t = oe.current, l = jb(t, e.type);
    t !== l && (le(pe, e), le(oe, l));
  }
  function pt(e) {
    pe.current === e && (K(oe), K(pe)), qe.current === e && (K(qe), Ji._currentValue = F);
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
      var a = {
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
                } catch (ae) {
                  var W = ae;
                }
                Reflect.construct(e, [], me);
              } else {
                try {
                  me.call();
                } catch (ae) {
                  W = ae;
                }
                e.call(me.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (ae) {
                W = ae;
              }
              (me = e()) && typeof me.catch == "function" && me.catch(function() {
              });
            }
          } catch (ae) {
            if (ae && W && typeof ae.stack == "string")
              return [ae.stack, W.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), p = u[0], C = u[1];
      if (p && C) {
        var L = p.split(`
`), J = C.split(`
`);
        for (s = a = 0; a < L.length && !L[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; s < J.length && !J[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (a === L.length || s === J.length)
          for (a = L.length - 1, s = J.length - 1; 1 <= a && 0 <= s && L[a] !== J[s]; )
            s--;
        for (; 1 <= a && 0 <= s; a--, s--)
          if (L[a] !== J[s]) {
            if (a !== 1 || s !== 1)
              do
                if (a--, s--, 0 > s || L[a] !== J[s]) {
                  var ue = `
` + L[a].replace(" at new ", " at ");
                  return e.displayName && ue.includes("<anonymous>") && (ue = ue.replace("<anonymous>", e.displayName)), ue;
                }
              while (1 <= a && 0 <= s);
            break;
          }
      }
    } finally {
      Le = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Ne(l) : "";
  }
  function we(e, t) {
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
        t += we(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Oe = Object.prototype.hasOwnProperty, Je = n.unstable_scheduleCallback, tt = n.unstable_cancelCallback, Xe = n.unstable_shouldYield, ye = n.unstable_requestPaint, Q = n.unstable_now, ce = n.unstable_getCurrentPriorityLevel, He = n.unstable_ImmediatePriority, Ce = n.unstable_UserBlockingPriority, Ge = n.unstable_NormalPriority, nt = n.unstable_LowPriority, Tt = n.unstable_IdlePriority, St = n.log, Bt = n.unstable_setDisableYieldValue, Nt = null, xt = null;
  function on(e) {
    if (typeof St == "function" && Bt(e), xt && typeof xt.setStrictMode == "function")
      try {
        xt.setStrictMode(Nt, e);
      } catch {
      }
  }
  var st = Math.clz32 ? Math.clz32 : _n, Et = Math.log, Jt = Math.LN2;
  function _n(e) {
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
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var s = 0, u = e.suspendedLanes, p = e.pingedLanes;
    e = e.warmLanes;
    var C = a & 134217727;
    return C !== 0 ? (a = C & ~u, a !== 0 ? s = ut(a) : (p &= C, p !== 0 ? s = ut(p) : l || (l = C & ~e, l !== 0 && (s = ut(l))))) : (C = a & ~u, C !== 0 ? s = ut(C) : p !== 0 ? s = ut(p) : l || (l = a & ~e, l !== 0 && (s = ut(l)))), s === 0 ? 0 : t !== 0 && t !== s && (t & u) === 0 && (u = s & -s, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : s;
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
  function An() {
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
  function zt(e, t, l, a, s, u) {
    var p = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var C = e.entanglements, L = e.expirationTimes, J = e.hiddenUpdates;
    for (l = p & ~l; 0 < l; ) {
      var ue = 31 - st(l), me = 1 << ue;
      C[ue] = 0, L[ue] = -1;
      var W = J[ue];
      if (W !== null)
        for (J[ue] = null, ue = 0; ue < W.length; ue++) {
          var ae = W[ue];
          ae !== null && (ae.lane &= -536870913);
        }
      l &= ~me;
    }
    a !== 0 && io(e, a, 0), u !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(p & ~t));
  }
  function io(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - st(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
  }
  function Fn(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var a = 31 - st(l), s = 1 << a;
      s & t | e[a] & t && (e[a] |= t), l &= ~s;
    }
  }
  function an(e, t) {
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
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : oy(e.type));
  }
  function Co(e, t) {
    var l = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = l;
    }
  }
  var rn = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + rn, Rt = "__reactProps$" + rn, Ye = "__reactContainer$" + rn, Gn = "__reactEvents$" + rn, Ba = "__reactListeners$" + rn, dt = "__reactHandles$" + rn, Ga = "__reactResources$" + rn, $l = "__reactMarker$" + rn;
  function co(e) {
    delete e[Ct], delete e[Rt], delete e[Gn], delete e[Ba], delete e[dt];
  }
  function Yn(e) {
    var t = e[Ct];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[Ye] || l[Ct]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Gb(e); e !== null; ) {
            if (l = e[Ct]) return l;
            e = Gb(e);
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
    throw Error(i(33));
  }
  function al(e) {
    var t = e[Ga];
    return t || (t = e[Ga] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function en(e) {
    e[$l] = !0;
  }
  var mn = /* @__PURE__ */ new Set(), Mn = {};
  function Jl(e, t) {
    yl(e, t), yl(e + "Capture", t);
  }
  function yl(e, t) {
    for (Mn[e] = t, e = 0; e < t.length; e++)
      mn.add(t[e]);
  }
  var Ya = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Qo = {}, Zo = {};
  function Rr(e) {
    return Oe.call(Zo, e) ? !0 : Oe.call(Qo, e) ? !1 : Ya.test(e) ? Zo[e] = !0 : (Qo[e] = !0, !1);
  }
  function Wl(e, t, l) {
    if (Rr(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
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
  function rl(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
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
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var s = a.get, u = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(p) {
          l = "" + p, u.call(this, p);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
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
    var l = t.getValue(), a = "";
    return e && (a = Qn(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Ro(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var bi = /[\n"\\]/g;
  function Tn(e) {
    return e.replace(
      bi,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qa(e, t, l, a, s, u, p, C) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + sn(t)) : e.value !== "" + sn(t) && (e.value = "" + sn(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? Jo(e, p, sn(t)) : l != null ? Jo(e, p, sn(l)) : a != null && e.removeAttribute("value"), s == null && u != null && (e.defaultChecked = !!u), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? e.name = "" + sn(C) : e.removeAttribute("name");
  }
  function _r(e, t, l, a, s, u, p, C) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        zn(e);
        return;
      }
      l = l != null ? "" + sn(l) : "", t = t != null ? "" + sn(t) : l, C || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? s, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = C ? e.checked : !!a, e.defaultChecked = !!a, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), zn(e);
  }
  function Jo(e, t, l) {
    t === "number" && Ro(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function vl(e, t, l, a) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < l.length; s++)
        t["$" + l[s]] = !0;
      for (l = 0; l < e.length; l++)
        s = t.hasOwnProperty("$" + e[l].value), e[l].selected !== s && (e[l].selected = s), s && a && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + sn(l), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === l) {
          e[s].selected = !0, a && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Pa(e, t, l) {
    if (t != null && (t = "" + sn(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + sn(l) : "";
  }
  function _o(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(i(92));
        if (be(a)) {
          if (1 < a.length) throw Error(i(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), t = l;
    }
    l = sn(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), zn(e);
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
  var il = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Wo(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || il.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function cn(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(i(62));
    if (e = e.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var s in t)
        a = t[s], t.hasOwnProperty(s) && l[s] !== a && Wo(e, s, a);
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
  ]), wo = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function to(e) {
    return wo.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function $n() {
  }
  var _ = null;
  function k(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var j = null, U = null;
  function ee(e) {
    var t = jl(e);
    if (t && (e = t.stateNode)) {
      var l = e[Rt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (qa(
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
              'input[name="' + Tn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var s = a[Rt] || null;
                if (!s) throw Error(i(90));
                qa(
                  a,
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
              a = l[t], a.form === e.form && Dn(a);
          }
          break e;
        case "textarea":
          Pa(e, l.value, l.defaultValue);
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
      var a = e(t);
      return a;
    } finally {
      if (re = !1, (j !== null || U !== null) && (uc(), j && (t = j, e = U, U = j = null, ee(t), e)))
        for (t = 0; t < e.length; t++) ee(e[t]);
    }
  }
  function Y(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[Rt] || null;
    if (a === null) return null;
    l = a[t];
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
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        i(231, t, typeof l)
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
  function _t() {
    if (Me) return Me;
    var e, t = ke, l = t.length, a, s = "value" in Ie ? Ie.value : Ie.textContent, u = s.length;
    for (e = 0; e < l && t[e] === s[e]; e++) ;
    var p = l - e;
    for (a = 1; a <= p && t[l - a] === s[u - a]; a++) ;
    return Me = s.slice(e, 1 < a ? 1 - a : void 0);
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
    function t(l, a, s, u, p) {
      this._reactName = l, this._targetInst = s, this.type = a, this.nativeEvent = u, this.target = p, this.currentTarget = null;
      for (var C in e)
        e.hasOwnProperty(C) && (l = e[C], this[C] = l ? l(u) : u[C]);
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
  }, Sn = Ot(pn), Wn = x({}, pn, { view: 0, detail: 0 }), uo = Ot(Wn), jn, xl, fo, Xa = x({}, Wn, {
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
      return "movementX" in e ? e.movementX : (e !== fo && (fo && e.type === "mousemove" ? (jn = e.screenX - fo.screenX, xl = e.screenY - fo.screenY) : xl = jn = 0, fo = e), jn);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xl;
    }
  }), yi = Ot(Xa), iS = x({}, Xa, { dataTransfer: 0 }), sS = Ot(iS), cS = x({}, Wn, { relatedTarget: 0 }), zu = Ot(cS), uS = x({}, pn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fS = Ot(uS), dS = x({}, pn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), hS = Ot(dS), mS = x({}, pn, { data: 0 }), Im = Ot(mS), pS = {
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
  }, gS = {
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
  }, bS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function yS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = bS[e]) ? !!t[e] : !1;
  }
  function Du() {
    return yS;
  }
  var vS = x({}, Wn, {
    key: function(e) {
      if (e.key) {
        var t = pS[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Ht(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? gS[e.keyCode] || "Unidentified" : "";
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
  }), xS = Ot(vS), SS = x({}, Xa, {
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
  }), Hm = Ot(SS), ES = x({}, Wn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Du
  }), CS = Ot(ES), RS = x({}, pn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), _S = Ot(RS), wS = x({}, Xa, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), AS = Ot(wS), MS = x({}, pn, {
    newState: 0,
    oldState: 0
  }), TS = Ot(MS), OS = [9, 13, 27, 32], ju = Z && "CompositionEvent" in window, vi = null;
  Z && "documentMode" in document && (vi = document.documentMode);
  var kS = Z && "TextEvent" in window && !vi, Um = Z && (!ju || vi && 8 < vi && 11 >= vi), Bm = " ", Gm = !1;
  function Ym(e, t) {
    switch (e) {
      case "keyup":
        return OS.indexOf(t.keyCode) !== -1;
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
  function qm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var wr = !1;
  function NS(e, t) {
    switch (e) {
      case "compositionend":
        return qm(t);
      case "keypress":
        return t.which !== 32 ? null : (Gm = !0, Bm);
      case "textInput":
        return e = t.data, e === Bm && Gm ? null : e;
      default:
        return null;
    }
  }
  function zS(e, t) {
    if (wr)
      return e === "compositionend" || !ju && Ym(e, t) ? (e = _t(), Me = ke = Ie = null, wr = !1, e) : null;
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
        return Um && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var DS = {
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
  function Pm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!DS[e.type] : t === "textarea";
  }
  function Xm(e, t, l, a) {
    j ? U ? U.push(a) : U = [a] : j = a, t = bc(t, "onChange"), 0 < t.length && (l = new Sn(
      "onChange",
      "change",
      null,
      l,
      a
    ), e.push({ event: l, listeners: t }));
  }
  var xi = null, Si = null;
  function jS(e) {
    Mb(e, 0);
  }
  function Ts(e) {
    var t = ol(e);
    if (Dn(t)) return e;
  }
  function Km(e, t) {
    if (e === "change") return t;
  }
  var Fm = !1;
  if (Z) {
    var Lu;
    if (Z) {
      var Vu = "oninput" in document;
      if (!Vu) {
        var Qm = document.createElement("div");
        Qm.setAttribute("oninput", "return;"), Vu = typeof Qm.oninput == "function";
      }
      Lu = Vu;
    } else Lu = !1;
    Fm = Lu && (!document.documentMode || 9 < document.documentMode);
  }
  function Zm() {
    xi && (xi.detachEvent("onpropertychange", $m), Si = xi = null);
  }
  function $m(e) {
    if (e.propertyName === "value" && Ts(Si)) {
      var t = [];
      Xm(
        t,
        Si,
        e,
        k(e)
      ), ge(jS, t);
    }
  }
  function LS(e, t, l) {
    e === "focusin" ? (Zm(), xi = t, Si = l, xi.attachEvent("onpropertychange", $m)) : e === "focusout" && Zm();
  }
  function VS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ts(Si);
  }
  function IS(e, t) {
    if (e === "click") return Ts(t);
  }
  function HS(e, t) {
    if (e === "input" || e === "change")
      return Ts(t);
  }
  function US(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Sl = typeof Object.is == "function" ? Object.is : US;
  function Ei(e, t) {
    if (Sl(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var s = l[a];
      if (!Oe.call(t, s) || !Sl(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Jm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Wm(e, t) {
    var l = Jm(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = e + l.textContent.length, e <= t && a >= t)
          return { node: l, offset: t - e };
        e = a;
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
      l = Jm(l);
    }
  }
  function ep(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ep(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function tp(e) {
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
  function Iu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var BS = Z && "documentMode" in document && 11 >= document.documentMode, Ar = null, Hu = null, Ci = null, Uu = !1;
  function np(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Uu || Ar == null || Ar !== Ro(a) || (a = Ar, "selectionStart" in a && Iu(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ci && Ei(Ci, a) || (Ci = a, a = bc(Hu, "onSelect"), 0 < a.length && (t = new Sn(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: a }), t.target = Ar)));
  }
  function Ka(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Mr = {
    animationend: Ka("Animation", "AnimationEnd"),
    animationiteration: Ka("Animation", "AnimationIteration"),
    animationstart: Ka("Animation", "AnimationStart"),
    transitionrun: Ka("Transition", "TransitionRun"),
    transitionstart: Ka("Transition", "TransitionStart"),
    transitioncancel: Ka("Transition", "TransitionCancel"),
    transitionend: Ka("Transition", "TransitionEnd")
  }, Bu = {}, lp = {};
  Z && (lp = document.createElement("div").style, "AnimationEvent" in window || (delete Mr.animationend.animation, delete Mr.animationiteration.animation, delete Mr.animationstart.animation), "TransitionEvent" in window || delete Mr.transitionend.transition);
  function Fa(e) {
    if (Bu[e]) return Bu[e];
    if (!Mr[e]) return e;
    var t = Mr[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in lp)
        return Bu[e] = t[l];
    return e;
  }
  var op = Fa("animationend"), ap = Fa("animationiteration"), rp = Fa("animationstart"), GS = Fa("transitionrun"), YS = Fa("transitionstart"), qS = Fa("transitioncancel"), ip = Fa("transitionend"), sp = /* @__PURE__ */ new Map(), Gu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Gu.push("scrollEnd");
  function no(e, t) {
    sp.set(e, t), Jl(t, [e]);
  }
  var Os = typeof reportError == "function" ? reportError : function(e) {
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
  }, Vl = [], Tr = 0, Yu = 0;
  function ks() {
    for (var e = Tr, t = Yu = Tr = 0; t < e; ) {
      var l = Vl[t];
      Vl[t++] = null;
      var a = Vl[t];
      Vl[t++] = null;
      var s = Vl[t];
      Vl[t++] = null;
      var u = Vl[t];
      if (Vl[t++] = null, a !== null && s !== null) {
        var p = a.pending;
        p === null ? s.next = s : (s.next = p.next, p.next = s), a.pending = s;
      }
      u !== 0 && cp(l, s, u);
    }
  }
  function Ns(e, t, l, a) {
    Vl[Tr++] = e, Vl[Tr++] = t, Vl[Tr++] = l, Vl[Tr++] = a, Yu |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function qu(e, t, l, a) {
    return Ns(e, t, l, a), zs(e);
  }
  function Qa(e, t) {
    return Ns(e, null, null, t), zs(e);
  }
  function cp(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var s = !1, u = e.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (s = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, s && t !== null && (s = 31 - st(l), e = u.hiddenUpdates, a = e[s], a === null ? e[s] = [t] : a.push(t), t.lane = l | 536870912), u) : null;
  }
  function zs(e) {
    if (50 < Pi)
      throw Pi = 0, ed = null, Error(i(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Or = {};
  function PS(e, t, l, a) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function El(e, t, l, a) {
    return new PS(e, t, l, a);
  }
  function Pu(e) {
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
  function up(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ds(e, t, l, a, s, u) {
    var p = 0;
    if (a = e, typeof e == "function") Pu(e) && (p = 1);
    else if (typeof e == "string")
      p = ZE(
        e,
        l,
        oe.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case P:
          return e = El(31, l, t, s), e.elementType = P, e.lanes = u, e;
        case T:
          return Za(l.children, s, u, t);
        case O:
          p = 8, s |= 24;
          break;
        case w:
          return e = El(12, l, t, s | 2), e.elementType = w, e.lanes = u, e;
        case I:
          return e = El(13, l, t, s), e.elementType = I, e.lanes = u, e;
        case q:
          return e = El(19, l, t, s), e.elementType = q, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
                p = 10;
                break e;
              case M:
                p = 9;
                break e;
              case N:
                p = 11;
                break e;
              case G:
                p = 14;
                break e;
              case z:
                p = 16, a = null;
                break e;
            }
          p = 29, l = Error(
            i(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = El(p, l, t, s), t.elementType = e, t.type = a, t.lanes = u, t;
  }
  function Za(e, t, l, a) {
    return e = El(7, e, a, t), e.lanes = l, e;
  }
  function Xu(e, t, l) {
    return e = El(6, e, null, t), e.lanes = l, e;
  }
  function fp(e) {
    var t = El(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ku(e, t, l) {
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
  var dp = /* @__PURE__ */ new WeakMap();
  function Il(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = dp.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: Ze(t)
      }, dp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ze(t)
    };
  }
  var kr = [], Nr = 0, js = null, Ri = 0, Hl = [], Ul = 0, ea = null, ho = 1, mo = "";
  function Mo(e, t) {
    kr[Nr++] = Ri, kr[Nr++] = js, js = e, Ri = t;
  }
  function hp(e, t, l) {
    Hl[Ul++] = ho, Hl[Ul++] = mo, Hl[Ul++] = ea, ea = e;
    var a = ho;
    e = mo;
    var s = 32 - st(a) - 1;
    a &= ~(1 << s), l += 1;
    var u = 32 - st(t) + s;
    if (30 < u) {
      var p = s - s % 5;
      u = (a & (1 << p) - 1).toString(32), a >>= p, s -= p, ho = 1 << 32 - st(t) + s | l << s | a, mo = u + e;
    } else
      ho = 1 << u | l << s | a, mo = e;
  }
  function Fu(e) {
    e.return !== null && (Mo(e, 1), hp(e, 1, 0));
  }
  function Qu(e) {
    for (; e === js; )
      js = kr[--Nr], kr[Nr] = null, Ri = kr[--Nr], kr[Nr] = null;
    for (; e === ea; )
      ea = Hl[--Ul], Hl[Ul] = null, mo = Hl[--Ul], Hl[Ul] = null, ho = Hl[--Ul], Hl[Ul] = null;
  }
  function mp(e, t) {
    Hl[Ul++] = ho, Hl[Ul++] = mo, Hl[Ul++] = ea, ho = t.id, mo = t.overflow, ea = e;
  }
  var Ln = null, qt = null, yt = !1, ta = null, Bl = !1, Zu = Error(i(519));
  function na(e) {
    var t = Error(
      i(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw _i(Il(t, e)), Zu;
  }
  function pp(e) {
    var t = e.stateNode, l = e.type, a = e.memoizedProps;
    switch (t[Ct] = e, t[Rt] = a, l) {
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
        for (l = 0; l < Ki.length; l++)
          mt(Ki[l], t);
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
        mt("invalid", t), _r(
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
        mt("invalid", t);
        break;
      case "textarea":
        mt("invalid", t), _o(t, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Nb(t.textContent, l) ? (a.popover != null && (mt("beforetoggle", t), mt("toggle", t)), a.onScroll != null && mt("scroll", t), a.onScrollEnd != null && mt("scrollend", t), a.onClick != null && (t.onclick = $n), t = !0) : t = !1, t || na(e, !0);
  }
  function gp(e) {
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
  function zr(e) {
    if (e !== Ln) return !1;
    if (!yt) return gp(e), yt = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || pd(e.type, e.memoizedProps)), l = !l), l && qt && na(e), gp(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      qt = Bb(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(317));
      qt = Bb(e);
    } else
      t === 27 ? (t = qt, ga(e.type) ? (e = xd, xd = null, qt = e) : qt = t) : qt = Ln ? Yl(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $a() {
    qt = Ln = null, yt = !1;
  }
  function $u() {
    var e = ta;
    return e !== null && (dl === null ? dl = e : dl.push.apply(
      dl,
      e
    ), ta = null), e;
  }
  function _i(e) {
    ta === null ? ta = [e] : ta.push(e);
  }
  var Ju = D(null), Ja = null, To = null;
  function la(e, t, l) {
    le(Ju, t._currentValue), t._currentValue = l;
  }
  function Oo(e) {
    e._currentValue = Ju.current, K(Ju);
  }
  function Wu(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function ef(e, t, l, a) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var p = s.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var C = u;
          u = s;
          for (var L = 0; L < t.length; L++)
            if (C.context === t[L]) {
              u.lanes |= l, C = u.alternate, C !== null && (C.lanes |= l), Wu(
                u.return,
                l,
                e
              ), a || (p = null);
              break e;
            }
          u = C.next;
        }
      } else if (s.tag === 18) {
        if (p = s.return, p === null) throw Error(i(341));
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
  function Dr(e, t, l, a) {
    e = null;
    for (var s = t, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var p = s.alternate;
        if (p === null) throw Error(i(387));
        if (p = p.memoizedProps, p !== null) {
          var C = s.type;
          Sl(s.pendingProps.value, p.value) || (e !== null ? e.push(C) : e = [C]);
        }
      } else if (s === qe.current) {
        if (p = s.alternate, p === null) throw Error(i(387));
        p.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(Ji) : e = [Ji]);
      }
      s = s.return;
    }
    e !== null && ef(
      t,
      e,
      l,
      a
    ), t.flags |= 262144;
  }
  function Ls(e) {
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
  function Wa(e) {
    Ja = e, To = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vn(e) {
    return bp(Ja, e);
  }
  function Vs(e, t) {
    return Ja === null && Wa(e), bp(e, t);
  }
  function bp(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, To === null) {
      if (e === null) throw Error(i(308));
      To = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else To = To.next = t;
    return l;
  }
  var XS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, KS = n.unstable_scheduleCallback, FS = n.unstable_NormalPriority, gn = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function tf() {
    return {
      controller: new XS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function wi(e) {
    e.refCount--, e.refCount === 0 && KS(FS, function() {
      e.controller.abort();
    });
  }
  var Ai = null, nf = 0, jr = 0, Lr = null;
  function QS(e, t) {
    if (Ai === null) {
      var l = Ai = [];
      nf = 0, jr = rd(), Lr = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return nf++, t.then(yp, yp), t;
  }
  function yp() {
    if (--nf === 0 && Ai !== null) {
      Lr !== null && (Lr.status = "fulfilled");
      var e = Ai;
      Ai = null, jr = 0, Lr = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ZS(e, t) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        l.push(s);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var s = 0; s < l.length; s++) (0, l[s])(t);
      },
      function(s) {
        for (a.status = "rejected", a.reason = s, s = 0; s < l.length; s++)
          (0, l[s])(void 0);
      }
    ), a;
  }
  var vp = V.S;
  V.S = function(e, t) {
    nb = Q(), typeof t == "object" && t !== null && typeof t.then == "function" && QS(e, t), vp !== null && vp(e, t);
  };
  var er = D(null);
  function lf() {
    var e = er.current;
    return e !== null ? e : Ut.pooledCache;
  }
  function Is(e, t) {
    t === null ? le(er, er.current) : le(er, t.pool);
  }
  function xp() {
    var e = lf();
    return e === null ? null : { parent: gn._currentValue, pool: e };
  }
  var Vr = Error(i(460)), of = Error(i(474)), Hs = Error(i(542)), Us = { then: function() {
  } };
  function Sp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ep(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then($n, $n), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Rp(e), e;
      default:
        if (typeof t.status == "string") t.then($n, $n);
        else {
          if (e = Ut, e !== null && 100 < e.shellSuspendCounter)
            throw Error(i(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Rp(e), e;
        }
        throw nr = t, Vr;
    }
  }
  function tr(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (nr = l, Vr) : l;
    }
  }
  var nr = null;
  function Cp() {
    if (nr === null) throw Error(i(459));
    var e = nr;
    return nr = null, e;
  }
  function Rp(e) {
    if (e === Vr || e === Hs)
      throw Error(i(483));
  }
  var Ir = null, Mi = 0;
  function Bs(e) {
    var t = Mi;
    return Mi += 1, Ir === null && (Ir = []), Ep(Ir, e, t);
  }
  function Ti(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Gs(e, t) {
    throw t.$$typeof === v ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(
      i(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function _p(e) {
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
    function a(X) {
      for (var B = /* @__PURE__ */ new Map(); X !== null; )
        X.key !== null ? B.set(X.key, X) : B.set(X.index, X), X = X.sibling;
      return B;
    }
    function s(X, B) {
      return X = Ao(X, B), X.index = 0, X.sibling = null, X;
    }
    function u(X, B, $) {
      return X.index = $, e ? ($ = X.alternate, $ !== null ? ($ = $.index, $ < B ? (X.flags |= 67108866, B) : $) : (X.flags |= 67108866, B)) : (X.flags |= 1048576, B);
    }
    function p(X) {
      return e && X.alternate === null && (X.flags |= 67108866), X;
    }
    function C(X, B, $, de) {
      return B === null || B.tag !== 6 ? (B = Xu($, X.mode, de), B.return = X, B) : (B = s(B, $), B.return = X, B);
    }
    function L(X, B, $, de) {
      var Pe = $.type;
      return Pe === T ? ue(
        X,
        B,
        $.props.children,
        de,
        $.key
      ) : B !== null && (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === z && tr(Pe) === B.type) ? (B = s(B, $.props), Ti(B, $), B.return = X, B) : (B = Ds(
        $.type,
        $.key,
        $.props,
        null,
        X.mode,
        de
      ), Ti(B, $), B.return = X, B);
    }
    function J(X, B, $, de) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== $.containerInfo || B.stateNode.implementation !== $.implementation ? (B = Ku($, X.mode, de), B.return = X, B) : (B = s(B, $.children || []), B.return = X, B);
    }
    function ue(X, B, $, de, Pe) {
      return B === null || B.tag !== 7 ? (B = Za(
        $,
        X.mode,
        de,
        Pe
      ), B.return = X, B) : (B = s(B, $), B.return = X, B);
    }
    function me(X, B, $) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = Xu(
          "" + B,
          X.mode,
          $
        ), B.return = X, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case E:
            return $ = Ds(
              B.type,
              B.key,
              B.props,
              null,
              X.mode,
              $
            ), Ti($, B), $.return = X, $;
          case A:
            return B = Ku(
              B,
              X.mode,
              $
            ), B.return = X, B;
          case z:
            return B = tr(B), me(X, B, $);
        }
        if (be(B) || fe(B))
          return B = Za(
            B,
            X.mode,
            $,
            null
          ), B.return = X, B;
        if (typeof B.then == "function")
          return me(X, Bs(B), $);
        if (B.$$typeof === R)
          return me(
            X,
            Vs(X, B),
            $
          );
        Gs(X, B);
      }
      return null;
    }
    function W(X, B, $, de) {
      var Pe = B !== null ? B.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return Pe !== null ? null : C(X, B, "" + $, de);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case E:
            return $.key === Pe ? L(X, B, $, de) : null;
          case A:
            return $.key === Pe ? J(X, B, $, de) : null;
          case z:
            return $ = tr($), W(X, B, $, de);
        }
        if (be($) || fe($))
          return Pe !== null ? null : ue(X, B, $, de, null);
        if (typeof $.then == "function")
          return W(
            X,
            B,
            Bs($),
            de
          );
        if ($.$$typeof === R)
          return W(
            X,
            B,
            Vs(X, $),
            de
          );
        Gs(X, $);
      }
      return null;
    }
    function ae(X, B, $, de, Pe) {
      if (typeof de == "string" && de !== "" || typeof de == "number" || typeof de == "bigint")
        return X = X.get($) || null, C(B, X, "" + de, Pe);
      if (typeof de == "object" && de !== null) {
        switch (de.$$typeof) {
          case E:
            return X = X.get(
              de.key === null ? $ : de.key
            ) || null, L(B, X, de, Pe);
          case A:
            return X = X.get(
              de.key === null ? $ : de.key
            ) || null, J(B, X, de, Pe);
          case z:
            return de = tr(de), ae(
              X,
              B,
              $,
              de,
              Pe
            );
        }
        if (be(de) || fe(de))
          return X = X.get($) || null, ue(B, X, de, Pe, null);
        if (typeof de.then == "function")
          return ae(
            X,
            B,
            $,
            Bs(de),
            Pe
          );
        if (de.$$typeof === R)
          return ae(
            X,
            B,
            $,
            Vs(B, de),
            Pe
          );
        Gs(B, de);
      }
      return null;
    }
    function Ve(X, B, $, de) {
      for (var Pe = null, wt = null, Be = B, ct = B = 0, bt = null; Be !== null && ct < $.length; ct++) {
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
        e && Be && At.alternate === null && t(X, Be), B = u(At, B, ct), wt === null ? Pe = At : wt.sibling = At, wt = At, Be = bt;
      }
      if (ct === $.length)
        return l(X, Be), yt && Mo(X, ct), Pe;
      if (Be === null) {
        for (; ct < $.length; ct++)
          Be = me(X, $[ct], de), Be !== null && (B = u(
            Be,
            B,
            ct
          ), wt === null ? Pe = Be : wt.sibling = Be, wt = Be);
        return yt && Mo(X, ct), Pe;
      }
      for (Be = a(Be); ct < $.length; ct++)
        bt = ae(
          Be,
          X,
          ct,
          $[ct],
          de
        ), bt !== null && (e && bt.alternate !== null && Be.delete(
          bt.key === null ? ct : bt.key
        ), B = u(
          bt,
          B,
          ct
        ), wt === null ? Pe = bt : wt.sibling = bt, wt = bt);
      return e && Be.forEach(function(Sa) {
        return t(X, Sa);
      }), yt && Mo(X, ct), Pe;
    }
    function $e(X, B, $, de) {
      if ($ == null) throw Error(i(151));
      for (var Pe = null, wt = null, Be = B, ct = B = 0, bt = null, At = $.next(); Be !== null && !At.done; ct++, At = $.next()) {
        Be.index > ct ? (bt = Be, Be = null) : bt = Be.sibling;
        var Sa = W(X, Be, At.value, de);
        if (Sa === null) {
          Be === null && (Be = bt);
          break;
        }
        e && Be && Sa.alternate === null && t(X, Be), B = u(Sa, B, ct), wt === null ? Pe = Sa : wt.sibling = Sa, wt = Sa, Be = bt;
      }
      if (At.done)
        return l(X, Be), yt && Mo(X, ct), Pe;
      if (Be === null) {
        for (; !At.done; ct++, At = $.next())
          At = me(X, At.value, de), At !== null && (B = u(At, B, ct), wt === null ? Pe = At : wt.sibling = At, wt = At);
        return yt && Mo(X, ct), Pe;
      }
      for (Be = a(Be); !At.done; ct++, At = $.next())
        At = ae(Be, X, ct, At.value, de), At !== null && (e && At.alternate !== null && Be.delete(At.key === null ? ct : At.key), B = u(At, B, ct), wt === null ? Pe = At : wt.sibling = At, wt = At);
      return e && Be.forEach(function(iC) {
        return t(X, iC);
      }), yt && Mo(X, ct), Pe;
    }
    function It(X, B, $, de) {
      if (typeof $ == "object" && $ !== null && $.type === T && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case E:
            e: {
              for (var Pe = $.key; B !== null; ) {
                if (B.key === Pe) {
                  if (Pe = $.type, Pe === T) {
                    if (B.tag === 7) {
                      l(
                        X,
                        B.sibling
                      ), de = s(
                        B,
                        $.props.children
                      ), de.return = X, X = de;
                      break e;
                    }
                  } else if (B.elementType === Pe || typeof Pe == "object" && Pe !== null && Pe.$$typeof === z && tr(Pe) === B.type) {
                    l(
                      X,
                      B.sibling
                    ), de = s(B, $.props), Ti(de, $), de.return = X, X = de;
                    break e;
                  }
                  l(X, B);
                  break;
                } else t(X, B);
                B = B.sibling;
              }
              $.type === T ? (de = Za(
                $.props.children,
                X.mode,
                de,
                $.key
              ), de.return = X, X = de) : (de = Ds(
                $.type,
                $.key,
                $.props,
                null,
                X.mode,
                de
              ), Ti(de, $), de.return = X, X = de);
            }
            return p(X);
          case A:
            e: {
              for (Pe = $.key; B !== null; ) {
                if (B.key === Pe)
                  if (B.tag === 4 && B.stateNode.containerInfo === $.containerInfo && B.stateNode.implementation === $.implementation) {
                    l(
                      X,
                      B.sibling
                    ), de = s(B, $.children || []), de.return = X, X = de;
                    break e;
                  } else {
                    l(X, B);
                    break;
                  }
                else t(X, B);
                B = B.sibling;
              }
              de = Ku($, X.mode, de), de.return = X, X = de;
            }
            return p(X);
          case z:
            return $ = tr($), It(
              X,
              B,
              $,
              de
            );
        }
        if (be($))
          return Ve(
            X,
            B,
            $,
            de
          );
        if (fe($)) {
          if (Pe = fe($), typeof Pe != "function") throw Error(i(150));
          return $ = Pe.call($), $e(
            X,
            B,
            $,
            de
          );
        }
        if (typeof $.then == "function")
          return It(
            X,
            B,
            Bs($),
            de
          );
        if ($.$$typeof === R)
          return It(
            X,
            B,
            Vs(X, $),
            de
          );
        Gs(X, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, B !== null && B.tag === 6 ? (l(X, B.sibling), de = s(B, $), de.return = X, X = de) : (l(X, B), de = Xu($, X.mode, de), de.return = X, X = de), p(X)) : l(X, B);
    }
    return function(X, B, $, de) {
      try {
        Mi = 0;
        var Pe = It(
          X,
          B,
          $,
          de
        );
        return Ir = null, Pe;
      } catch (Be) {
        if (Be === Vr || Be === Hs) throw Be;
        var wt = El(29, Be, null, X.mode);
        return wt.lanes = de, wt.return = X, wt;
      }
    };
  }
  var lr = _p(!0), wp = _p(!1), oa = !1;
  function af(e) {
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
  function aa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ra(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (kt & 2) !== 0) {
      var s = a.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), a.pending = t, t = zs(e), cp(e, null, l), t;
    }
    return Ns(e, a, t, l), zs(e);
  }
  function Oi(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Fn(e, l);
    }
  }
  function sf(e, t) {
    var l = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
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
        baseState: a.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var cf = !1;
  function ki() {
    if (cf) {
      var e = Lr;
      if (e !== null) throw e;
    }
  }
  function Ni(e, t, l, a) {
    cf = !1;
    var s = e.updateQueue;
    oa = !1;
    var u = s.firstBaseUpdate, p = s.lastBaseUpdate, C = s.shared.pending;
    if (C !== null) {
      s.shared.pending = null;
      var L = C, J = L.next;
      L.next = null, p === null ? u = J : p.next = J, p = L;
      var ue = e.alternate;
      ue !== null && (ue = ue.updateQueue, C = ue.lastBaseUpdate, C !== p && (C === null ? ue.firstBaseUpdate = J : C.next = J, ue.lastBaseUpdate = L));
    }
    if (u !== null) {
      var me = s.baseState;
      p = 0, ue = J = L = null, C = u;
      do {
        var W = C.lane & -536870913, ae = W !== C.lane;
        if (ae ? (gt & W) === W : (a & W) === W) {
          W !== 0 && W === jr && (cf = !0), ue !== null && (ue = ue.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          e: {
            var Ve = e, $e = C;
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
                oa = !0;
            }
          }
          W = C.callback, W !== null && (e.flags |= 64, ae && (e.flags |= 8192), ae = s.callbacks, ae === null ? s.callbacks = [W] : ae.push(W));
        } else
          ae = {
            lane: W,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, ue === null ? (J = ue = ae, L = me) : ue = ue.next = ae, p |= W;
        if (C = C.next, C === null) {
          if (C = s.shared.pending, C === null)
            break;
          ae = C, C = ae.next, ae.next = null, s.lastBaseUpdate = ae, s.shared.pending = null;
        }
      } while (!0);
      ue === null && (L = me), s.baseState = L, s.firstBaseUpdate = J, s.lastBaseUpdate = ue, u === null && (s.shared.lanes = 0), fa |= p, e.lanes = p, e.memoizedState = me;
    }
  }
  function Ap(e, t) {
    if (typeof e != "function")
      throw Error(i(191, e));
    e.call(t);
  }
  function Mp(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Ap(l[e], t);
  }
  var Hr = D(null), Ys = D(0);
  function Tp(e, t) {
    e = Ho, le(Ys, e), le(Hr, t), Ho = e | t.baseLanes;
  }
  function uf() {
    le(Ys, Ho), le(Hr, Hr.current);
  }
  function ff() {
    Ho = Ys.current, K(Hr), K(Ys);
  }
  var Cl = D(null), Gl = null;
  function ia(e) {
    var t = e.alternate;
    le(un, un.current & 1), le(Cl, e), Gl === null && (t === null || Hr.current !== null || t.memoizedState !== null) && (Gl = e);
  }
  function df(e) {
    le(un, un.current), le(Cl, e), Gl === null && (Gl = e);
  }
  function Op(e) {
    e.tag === 22 ? (le(un, un.current), le(Cl, e), Gl === null && (Gl = e)) : sa();
  }
  function sa() {
    le(un, un.current), le(Cl, Cl.current);
  }
  function Rl(e) {
    K(Cl), Gl === e && (Gl = null), K(un);
  }
  var un = D(0);
  function qs(e) {
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
  var ko = 0, rt = null, Lt = null, bn = null, Ps = !1, Ur = !1, or = !1, Xs = 0, zi = 0, Br = null, $S = 0;
  function nn() {
    throw Error(i(321));
  }
  function hf(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Sl(e[l], t[l])) return !1;
    return !0;
  }
  function mf(e, t, l, a, s, u) {
    return ko = u, rt = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, V.H = e === null || e.memoizedState === null ? hg : Tf, or = !1, u = l(a, s), or = !1, Ur && (u = Np(
      t,
      l,
      a,
      s
    )), kp(e), u;
  }
  function kp(e) {
    V.H = Li;
    var t = Lt !== null && Lt.next !== null;
    if (ko = 0, bn = Lt = rt = null, Ps = !1, zi = 0, Br = null, t) throw Error(i(300));
    e === null || yn || (e = e.dependencies, e !== null && Ls(e) && (yn = !0));
  }
  function Np(e, t, l, a) {
    rt = e;
    var s = 0;
    do {
      if (Ur && (Br = null), zi = 0, Ur = !1, 25 <= s) throw Error(i(301));
      if (s += 1, bn = Lt = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = mg, u = t(l, a);
    } while (Ur);
    return u;
  }
  function JS() {
    var e = V.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Di(t) : t, e = e.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== e && (rt.flags |= 1024), t;
  }
  function pf() {
    var e = Xs !== 0;
    return Xs = 0, e;
  }
  function gf(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function bf(e) {
    if (Ps) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ps = !1;
    }
    ko = 0, bn = Lt = rt = null, Ur = !1, zi = Xs = 0, Br = null;
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
        throw rt.alternate === null ? Error(i(467)) : Error(i(310));
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
  function Ks() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Di(e) {
    var t = zi;
    return zi += 1, Br === null && (Br = []), e = Ep(Br, e, t), t = rt, (bn === null ? t.memoizedState : bn.next) === null && (t = t.alternate, V.H = t === null || t.memoizedState === null ? hg : Tf), e;
  }
  function Fs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Di(e);
      if (e.$$typeof === R) return Vn(e);
    }
    throw Error(i(438, String(e)));
  }
  function yf(e) {
    var t = null, l = rt.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var a = rt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Ks(), rt.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++)
        l[a] = te;
    return t.index++, l;
  }
  function No(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Qs(e) {
    var t = fn();
    return vf(t, Lt, e);
  }
  function vf(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(i(311));
    a.lastRenderedReducer = l;
    var s = e.baseQueue, u = a.pending;
    if (u !== null) {
      if (s !== null) {
        var p = s.next;
        s.next = u.next, u.next = p;
      }
      t.baseQueue = s = u, a.pending = null;
    }
    if (u = e.baseState, s === null) e.memoizedState = u;
    else {
      t = s.next;
      var C = p = null, L = null, J = t, ue = !1;
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
            }), me === jr && (ue = !0);
          else if ((ko & W) === W) {
            J = J.next, W === jr && (ue = !0);
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
            }, L === null ? (C = L = me, p = u) : L = L.next = me, rt.lanes |= W, fa |= W;
          me = J.action, or && l(u, me), u = J.hasEagerState ? J.eagerState : l(u, me);
        } else
          W = {
            lane: me,
            revertLane: J.revertLane,
            gesture: J.gesture,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          }, L === null ? (C = L = W, p = u) : L = L.next = W, rt.lanes |= me, fa |= me;
        J = J.next;
      } while (J !== null && J !== t);
      if (L === null ? p = u : L.next = C, !Sl(u, e.memoizedState) && (yn = !0, ue && (l = Lr, l !== null)))
        throw l;
      e.memoizedState = u, e.baseState = p, e.baseQueue = L, a.lastRenderedState = u;
    }
    return s === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function xf(e) {
    var t = fn(), l = t.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch, s = l.pending, u = t.memoizedState;
    if (s !== null) {
      l.pending = null;
      var p = s = s.next;
      do
        u = e(u, p.action), p = p.next;
      while (p !== s);
      Sl(u, t.memoizedState) || (yn = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function zp(e, t, l) {
    var a = rt, s = fn(), u = yt;
    if (u) {
      if (l === void 0) throw Error(i(407));
      l = l();
    } else l = t();
    var p = !Sl(
      (Lt || s).memoizedState,
      l
    );
    if (p && (s.memoizedState = l, yn = !0), s = s.queue, Cf(Lp.bind(null, a, s, e), [
      e
    ]), s.getSnapshot !== t || p || bn !== null && bn.memoizedState.tag & 1) {
      if (a.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        jp.bind(
          null,
          a,
          s,
          l,
          t
        ),
        null
      ), Ut === null) throw Error(i(349));
      u || (ko & 127) !== 0 || Dp(a, t, l);
    }
    return l;
  }
  function Dp(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = rt.updateQueue, t === null ? (t = Ks(), rt.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function jp(e, t, l, a) {
    t.value = l, t.getSnapshot = a, Vp(t) && Ip(e);
  }
  function Lp(e, t, l) {
    return l(function() {
      Vp(t) && Ip(e);
    });
  }
  function Vp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Sl(e, l);
    } catch {
      return !0;
    }
  }
  function Ip(e) {
    var t = Qa(e, 2);
    t !== null && hl(t, e, 2);
  }
  function Sf(e) {
    var t = el();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), or) {
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
  function Hp(e, t, l, a) {
    return e.baseState = l, vf(
      e,
      Lt,
      typeof a == "function" ? a : No
    );
  }
  function WS(e, t, l, a, s) {
    if (Js(e)) throw Error(i(485));
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
      V.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, Up(t, u)) : (u.next = l.next, t.pending = l.next = u);
    }
  }
  function Up(e, t) {
    var l = t.action, a = t.payload, s = e.state;
    if (t.isTransition) {
      var u = V.T, p = {};
      V.T = p;
      try {
        var C = l(s, a), L = V.S;
        L !== null && L(p, C), Bp(e, t, C);
      } catch (J) {
        Ef(e, t, J);
      } finally {
        u !== null && p.types !== null && (u.types = p.types), V.T = u;
      }
    } else
      try {
        u = l(s, a), Bp(e, t, u);
      } catch (J) {
        Ef(e, t, J);
      }
  }
  function Bp(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Gp(e, t, a);
      },
      function(a) {
        return Ef(e, t, a);
      }
    ) : Gp(e, t, l);
  }
  function Gp(e, t, l) {
    t.status = "fulfilled", t.value = l, Yp(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Up(e, l)));
  }
  function Ef(e, t, l) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = l, Yp(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function Yp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function qp(e, t) {
    return t;
  }
  function Pp(e, t) {
    if (yt) {
      var l = Ut.formState;
      if (l !== null) {
        e: {
          var a = rt;
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
                ), a = s.data === "F!";
                break e;
              }
            }
            na(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return l = el(), l.memoizedState = l.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qp,
      lastRenderedState: t
    }, l.queue = a, l = ug.bind(
      null,
      rt,
      a
    ), a.dispatch = l, a = Sf(!1), u = Mf.bind(
      null,
      rt,
      !1,
      a.queue
    ), a = el(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = s, l = WS.bind(
      null,
      rt,
      s,
      u,
      l
    ), s.dispatch = l, a.memoizedState = e, [t, l, !1];
  }
  function Xp(e) {
    var t = fn();
    return Kp(t, Lt, e);
  }
  function Kp(e, t, l) {
    if (t = vf(
      e,
      t,
      qp
    )[0], e = Qs(No)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Di(t);
      } catch (p) {
        throw p === Vr ? Hs : p;
      }
    else a = t;
    t = fn();
    var s = t.queue, u = s.dispatch;
    return l !== t.memoizedState && (rt.flags |= 2048, Gr(
      9,
      { destroy: void 0 },
      eE.bind(null, s, l),
      null
    )), [a, u, e];
  }
  function eE(e, t) {
    e.action = t;
  }
  function Fp(e) {
    var t = fn(), l = Lt;
    if (l !== null)
      return Kp(t, l, e);
    fn(), t = t.memoizedState, l = fn();
    var a = l.queue.dispatch;
    return l.memoizedState = e, [t, a, !1];
  }
  function Gr(e, t, l, a) {
    return e = { tag: e, create: l, deps: a, inst: t, next: null }, t = rt.updateQueue, t === null && (t = Ks(), rt.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
  }
  function Qp() {
    return fn().memoizedState;
  }
  function Zs(e, t, l, a) {
    var s = el();
    rt.flags |= e, s.memoizedState = Gr(
      1 | t,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function $s(e, t, l, a) {
    var s = fn();
    a = a === void 0 ? null : a;
    var u = s.memoizedState.inst;
    Lt !== null && a !== null && hf(a, Lt.memoizedState.deps) ? s.memoizedState = Gr(t, u, l, a) : (rt.flags |= e, s.memoizedState = Gr(
      1 | t,
      u,
      l,
      a
    ));
  }
  function Zp(e, t) {
    Zs(8390656, 8, e, t);
  }
  function Cf(e, t) {
    $s(2048, 8, e, t);
  }
  function tE(e) {
    rt.flags |= 4;
    var t = rt.updateQueue;
    if (t === null)
      t = Ks(), rt.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function $p(e) {
    var t = fn().memoizedState;
    return tE({ ref: t, nextImpl: e }), function() {
      if ((kt & 2) !== 0) throw Error(i(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Jp(e, t) {
    return $s(4, 2, e, t);
  }
  function Wp(e, t) {
    return $s(4, 4, e, t);
  }
  function eg(e, t) {
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
  function tg(e, t, l) {
    l = l != null ? l.concat([e]) : null, $s(4, 4, eg.bind(null, t, e), l);
  }
  function Rf() {
  }
  function ng(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && hf(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e);
  }
  function lg(e, t) {
    var l = fn();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && hf(t, a[1]))
      return a[0];
    if (a = e(), or) {
      on(!0);
      try {
        e();
      } finally {
        on(!1);
      }
    }
    return l.memoizedState = [a, t], a;
  }
  function _f(e, t, l) {
    return l === void 0 || (ko & 1073741824) !== 0 && (gt & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = ob(), rt.lanes |= e, fa |= e, l);
  }
  function og(e, t, l, a) {
    return Sl(l, t) ? l : Hr.current !== null ? (e = _f(e, l, a), Sl(e, t) || (yn = !0), e) : (ko & 42) === 0 || (ko & 1073741824) !== 0 && (gt & 261930) === 0 ? (yn = !0, e.memoizedState = l) : (e = ob(), rt.lanes |= e, fa |= e, t);
  }
  function ag(e, t, l, a, s) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var p = V.T, C = {};
    V.T = C, Mf(e, !1, t, l);
    try {
      var L = s(), J = V.S;
      if (J !== null && J(C, L), L !== null && typeof L == "object" && typeof L.then == "function") {
        var ue = ZS(
          L,
          a
        );
        ji(
          e,
          t,
          ue,
          Al(e)
        );
      } else
        ji(
          e,
          t,
          a,
          Al(e)
        );
    } catch (me) {
      ji(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: me },
        Al()
      );
    } finally {
      H.p = u, p !== null && C.types !== null && (p.types = C.types), V.T = p;
    }
  }
  function nE() {
  }
  function wf(e, t, l, a) {
    if (e.tag !== 5) throw Error(i(476));
    var s = rg(e).queue;
    ag(
      e,
      s,
      t,
      F,
      l === null ? nE : function() {
        return ig(e), l(a);
      }
    );
  }
  function rg(e) {
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
  function ig(e) {
    var t = rg(e);
    t.next === null && (t = e.alternate.memoizedState), ji(
      e,
      t.next.queue,
      {},
      Al()
    );
  }
  function Af() {
    return Vn(Ji);
  }
  function sg() {
    return fn().memoizedState;
  }
  function cg() {
    return fn().memoizedState;
  }
  function lE(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Al();
          e = aa(l);
          var a = ra(t, e, l);
          a !== null && (hl(a, t, l), Oi(a, t, l)), t = { cache: tf() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function oE(e, t, l) {
    var a = Al();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Js(e) ? fg(t, l) : (l = qu(e, t, l, a), l !== null && (hl(l, e, a), dg(l, t, a)));
  }
  function ug(e, t, l) {
    var a = Al();
    ji(e, t, l, a);
  }
  function ji(e, t, l, a) {
    var s = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Js(e)) fg(t, s);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var p = t.lastRenderedState, C = u(p, l);
          if (s.hasEagerState = !0, s.eagerState = C, Sl(C, p))
            return Ns(e, t, s, 0), Ut === null && ks(), !1;
        } catch {
        }
      if (l = qu(e, t, s, a), l !== null)
        return hl(l, e, a), dg(l, t, a), !0;
    }
    return !1;
  }
  function Mf(e, t, l, a) {
    if (a = {
      lane: 2,
      revertLane: rd(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Js(e)) {
      if (t) throw Error(i(479));
    } else
      t = qu(
        e,
        l,
        a,
        2
      ), t !== null && hl(t, e, 2);
  }
  function Js(e) {
    var t = e.alternate;
    return e === rt || t !== null && t === rt;
  }
  function fg(e, t) {
    Ur = Ps = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function dg(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, l |= a, t.lanes = l, Fn(e, l);
    }
  }
  var Li = {
    readContext: Vn,
    use: Fs,
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
  Li.useEffectEvent = nn;
  var hg = {
    readContext: Vn,
    use: Fs,
    useCallback: function(e, t) {
      return el().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vn,
    useEffect: Zp,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Zs(
        4194308,
        4,
        eg.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Zs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Zs(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = el();
      t = t === void 0 ? null : t;
      var a = e();
      if (or) {
        on(!0);
        try {
          e();
        } finally {
          on(!1);
        }
      }
      return l.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, l) {
      var a = el();
      if (l !== void 0) {
        var s = l(t);
        if (or) {
          on(!0);
          try {
            l(t);
          } finally {
            on(!1);
          }
        }
      } else s = t;
      return a.memoizedState = a.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, a.queue = e, e = e.dispatch = oE.bind(
        null,
        rt,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = el();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Sf(e);
      var t = e.queue, l = ug.bind(null, rt, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = el();
      return _f(l, e, t);
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
      var a = rt, s = el();
      if (yt) {
        if (l === void 0)
          throw Error(i(407));
        l = l();
      } else {
        if (l = t(), Ut === null)
          throw Error(i(349));
        (gt & 127) !== 0 || Dp(a, t, l);
      }
      s.memoizedState = l;
      var u = { value: l, getSnapshot: t };
      return s.queue = u, Zp(Lp.bind(null, a, u, e), [
        e
      ]), a.flags |= 2048, Gr(
        9,
        { destroy: void 0 },
        jp.bind(
          null,
          a,
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
        var l = mo, a = ho;
        l = (a & ~(1 << 32 - st(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Xs++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = $S++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Af,
    useFormState: Pp,
    useActionState: Pp,
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
      return el().memoizedState = lE.bind(
        null,
        rt
      );
    },
    useEffectEvent: function(e) {
      var t = el(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((kt & 2) !== 0)
          throw Error(i(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Tf = {
    readContext: Vn,
    use: Fs,
    useCallback: ng,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: lg,
    useReducer: Qs,
    useRef: Qp,
    useState: function() {
      return Qs(No);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return og(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Qs(No)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : Di(e),
        t
      ];
    },
    useSyncExternalStore: zp,
    useId: sg,
    useHostTransitionStatus: Af,
    useFormState: Xp,
    useActionState: Xp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Hp(l, Lt, e, t);
    },
    useMemoCache: yf,
    useCacheRefresh: cg
  };
  Tf.useEffectEvent = $p;
  var mg = {
    readContext: Vn,
    use: Fs,
    useCallback: ng,
    useContext: Vn,
    useEffect: Cf,
    useImperativeHandle: tg,
    useInsertionEffect: Jp,
    useLayoutEffect: Wp,
    useMemo: lg,
    useReducer: xf,
    useRef: Qp,
    useState: function() {
      return xf(No);
    },
    useDebugValue: Rf,
    useDeferredValue: function(e, t) {
      var l = fn();
      return Lt === null ? _f(l, e, t) : og(
        l,
        Lt.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = xf(No)[0], t = fn().memoizedState;
      return [
        typeof e == "boolean" ? e : Di(e),
        t
      ];
    },
    useSyncExternalStore: zp,
    useId: sg,
    useHostTransitionStatus: Af,
    useFormState: Fp,
    useActionState: Fp,
    useOptimistic: function(e, t) {
      var l = fn();
      return Lt !== null ? Hp(l, Lt, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: yf,
    useCacheRefresh: cg
  };
  mg.useEffectEvent = $p;
  function Of(e, t, l, a) {
    t = e.memoizedState, l = l(a, t), l = l == null ? t : x({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var kf = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var a = Al(), s = aa(a);
      s.payload = t, l != null && (s.callback = l), t = ra(e, s, a), t !== null && (hl(t, e, a), Oi(t, e, a));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var a = Al(), s = aa(a);
      s.tag = 1, s.payload = t, l != null && (s.callback = l), t = ra(e, s, a), t !== null && (hl(t, e, a), Oi(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Al(), a = aa(l);
      a.tag = 2, t != null && (a.callback = t), t = ra(e, a, l), t !== null && (hl(t, e, l), Oi(t, e, l));
    }
  };
  function pg(e, t, l, a, s, u, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, p) : t.prototype && t.prototype.isPureReactComponent ? !Ei(l, a) || !Ei(s, u) : !0;
  }
  function gg(e, t, l, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && kf.enqueueReplaceState(t, t.state, null);
  }
  function ar(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t)
        a !== "ref" && (l[a] = t[a]);
    }
    if (e = e.defaultProps) {
      l === t && (l = x({}, l));
      for (var s in e)
        l[s] === void 0 && (l[s] = e[s]);
    }
    return l;
  }
  function bg(e) {
    Os(e);
  }
  function yg(e) {
    console.error(e);
  }
  function vg(e) {
    Os(e);
  }
  function Ws(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function xg(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
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
    return l = aa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Ws(e, t);
    }, l;
  }
  function Sg(e) {
    return e = aa(e), e.tag = 3, e;
  }
  function Eg(e, t, l, a) {
    var s = l.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = a.value;
      e.payload = function() {
        return s(u);
      }, e.callback = function() {
        xg(t, l, a);
      };
    }
    var p = l.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      xg(t, l, a), typeof s != "function" && (da === null ? da = /* @__PURE__ */ new Set([this]) : da.add(this));
      var C = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function aE(e, t, l, a, s) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = l.alternate, t !== null && Dr(
        t,
        l,
        s,
        !0
      ), l = Cl.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Gl === null ? fc() : l.alternate === null && ln === 0 && (ln = 3), l.flags &= -257, l.flags |= 65536, l.lanes = s, a === Us ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), ld(e, a, s)), !1;
          case 22:
            return l.flags |= 65536, a === Us ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), ld(e, a, s)), !1;
        }
        throw Error(i(435, l.tag));
      }
      return ld(e, a, s), fc(), !1;
    }
    if (yt)
      return t = Cl.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, a !== Zu && (e = Error(i(422), { cause: a }), _i(Il(e, l)))) : (a !== Zu && (t = Error(i(423), {
        cause: a
      }), _i(
        Il(t, l)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, a = Il(a, l), s = Nf(
        e.stateNode,
        a,
        s
      ), sf(e, s), ln !== 4 && (ln = 2)), !1;
    var u = Error(i(520), { cause: a });
    if (u = Il(u, l), qi === null ? qi = [u] : qi.push(u), ln !== 4 && (ln = 2), t === null) return !0;
    a = Il(a, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = s & -s, l.lanes |= e, e = Nf(l.stateNode, a, e), sf(l, e), !1;
        case 1:
          if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (da === null || !da.has(u))))
            return l.flags |= 65536, s &= -s, l.lanes |= s, s = Sg(s), Eg(
              s,
              e,
              l,
              a
            ), sf(l, s), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var zf = Error(i(461)), yn = !1;
  function In(e, t, l, a) {
    t.child = e === null ? wp(t, null, l, a) : lr(
      t,
      e.child,
      l,
      a
    );
  }
  function Cg(e, t, l, a, s) {
    l = l.render;
    var u = t.ref;
    if ("ref" in a) {
      var p = {};
      for (var C in a)
        C !== "ref" && (p[C] = a[C]);
    } else p = a;
    return Wa(t), a = mf(
      e,
      t,
      l,
      p,
      u,
      s
    ), C = pf(), e !== null && !yn ? (gf(e, t, s), zo(e, t, s)) : (yt && C && Fu(t), t.flags |= 1, In(e, t, a, s), t.child);
  }
  function Rg(e, t, l, a, s) {
    if (e === null) {
      var u = l.type;
      return typeof u == "function" && !Pu(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, _g(
        e,
        t,
        u,
        a,
        s
      )) : (e = Ds(
        l.type,
        null,
        a,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Bf(e, s)) {
      var p = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ei, l(p, a) && e.ref === t.ref)
        return zo(e, t, s);
    }
    return t.flags |= 1, e = Ao(u, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function _g(e, t, l, a, s) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (Ei(u, a) && e.ref === t.ref)
        if (yn = !1, t.pendingProps = a = u, Bf(e, s))
          (e.flags & 131072) !== 0 && (yn = !0);
        else
          return t.lanes = e.lanes, zo(e, t, s);
    }
    return Df(
      e,
      t,
      l,
      a,
      s
    );
  }
  function wg(e, t, l, a) {
    var s = a.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, e !== null) {
          for (a = t.child = e.child, s = 0; a !== null; )
            s = s | a.lanes | a.childLanes, a = a.sibling;
          a = s & ~u;
        } else a = 0, t.child = null;
        return Ag(
          e,
          t,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Is(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Tp(t, u) : uf(), Op(t);
      else
        return a = t.lanes = 536870912, Ag(
          e,
          t,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Is(t, u.cachePool), Tp(t, u), sa(), t.memoizedState = null) : (e !== null && Is(t, null), uf(), sa());
    return In(e, t, s, l), t.child;
  }
  function Vi(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ag(e, t, l, a, s) {
    var u = lf();
    return u = u === null ? null : { parent: gn._currentValue, pool: u }, t.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, e !== null && Is(t, null), uf(), Op(t), e !== null && Dr(e, t, a, !0), t.childLanes = s, null;
  }
  function ec(e, t) {
    return t = nc(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Mg(e, t, l) {
    return lr(t, e.child, null, l), e = ec(t, t.pendingProps), e.flags |= 2, Rl(t), t.memoizedState = null, e;
  }
  function rE(e, t, l) {
    var a = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (yt) {
        if (a.mode === "hidden")
          return e = ec(t, a), t.lanes = 536870912, Vi(null, e);
        if (df(t), (e = qt) ? (e = Ub(
          e,
          Bl
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ea !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw na(t);
        return t.lanes = 536870912, null;
      }
      return ec(t, a);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var p = u.dehydrated;
      if (df(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = Mg(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(i(558));
      else if (yn || Dr(e, t, l, !1), s = (l & e.childLanes) !== 0, yn || s) {
        if (a = Ut, a !== null && (p = an(a, l), p !== 0 && p !== u.retryLane))
          throw u.retryLane = p, Qa(e, p), hl(a, e, p), zf;
        fc(), t = Mg(
          e,
          t,
          l
        );
      } else
        e = u.treeContext, qt = Yl(p.nextSibling), Ln = t, yt = !0, ta = null, Bl = !1, e !== null && mp(t, e), t = ec(t, a), t.flags |= 4096;
      return t;
    }
    return e = Ao(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function tc(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(i(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Df(e, t, l, a, s) {
    return Wa(t), l = mf(
      e,
      t,
      l,
      a,
      void 0,
      s
    ), a = pf(), e !== null && !yn ? (gf(e, t, s), zo(e, t, s)) : (yt && a && Fu(t), t.flags |= 1, In(e, t, l, s), t.child);
  }
  function Tg(e, t, l, a, s, u) {
    return Wa(t), t.updateQueue = null, l = Np(
      t,
      a,
      l,
      s
    ), kp(e), a = pf(), e !== null && !yn ? (gf(e, t, u), zo(e, t, u)) : (yt && a && Fu(t), t.flags |= 1, In(e, t, l, u), t.child);
  }
  function Og(e, t, l, a, s) {
    if (Wa(t), t.stateNode === null) {
      var u = Or, p = l.contextType;
      typeof p == "object" && p !== null && (u = Vn(p)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = kf, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, af(t), p = l.contextType, u.context = typeof p == "object" && p !== null ? Vn(p) : Or, u.state = t.memoizedState, p = l.getDerivedStateFromProps, typeof p == "function" && (Of(
        t,
        l,
        p,
        a
      ), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (p = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), p !== u.state && kf.enqueueReplaceState(u, u.state, null), Ni(t, a, u, s), ki(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      u = t.stateNode;
      var C = t.memoizedProps, L = ar(l, C);
      u.props = L;
      var J = u.context, ue = l.contextType;
      p = Or, typeof ue == "object" && ue !== null && (p = Vn(ue));
      var me = l.getDerivedStateFromProps;
      ue = typeof me == "function" || typeof u.getSnapshotBeforeUpdate == "function", C = t.pendingProps !== C, ue || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (C || J !== p) && gg(
        t,
        u,
        a,
        p
      ), oa = !1;
      var W = t.memoizedState;
      u.state = W, Ni(t, a, u, s), ki(), J = t.memoizedState, C || W !== J || oa ? (typeof me == "function" && (Of(
        t,
        l,
        me,
        a
      ), J = t.memoizedState), (L = oa || pg(
        t,
        l,
        L,
        a,
        W,
        J,
        p
      )) ? (ue || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = J), u.props = a, u.state = J, u.context = p, a = L) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      u = t.stateNode, rf(e, t), p = t.memoizedProps, ue = ar(l, p), u.props = ue, me = t.pendingProps, W = u.context, J = l.contextType, L = Or, typeof J == "object" && J !== null && (L = Vn(J)), C = l.getDerivedStateFromProps, (J = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (p !== me || W !== L) && gg(
        t,
        u,
        a,
        L
      ), oa = !1, W = t.memoizedState, u.state = W, Ni(t, a, u, s), ki();
      var ae = t.memoizedState;
      p !== me || W !== ae || oa || e !== null && e.dependencies !== null && Ls(e.dependencies) ? (typeof C == "function" && (Of(
        t,
        l,
        C,
        a
      ), ae = t.memoizedState), (ue = oa || pg(
        t,
        l,
        ue,
        a,
        W,
        ae,
        L
      ) || e !== null && e.dependencies !== null && Ls(e.dependencies)) ? (J || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, ae, L), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        ae,
        L
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = ae), u.props = a, u.state = ae, u.context = L, a = ue) : (typeof u.componentDidUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && W === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return u = a, tc(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = lr(
      t,
      e.child,
      null,
      s
    ), t.child = lr(
      t,
      null,
      l,
      s
    )) : In(e, t, l, s), t.memoizedState = u.state, e = t.child) : e = zo(
      e,
      t,
      s
    ), e;
  }
  function kg(e, t, l, a) {
    return $a(), t.flags |= 256, In(e, t, l, a), t.child;
  }
  var jf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lf(e) {
    return { baseLanes: e, cachePool: xp() };
  }
  function Vf(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= wl), e;
  }
  function Ng(e, t, l) {
    var a = t.pendingProps, s = !1, u = (t.flags & 128) !== 0, p;
    if ((p = u) || (p = e !== null && e.memoizedState === null ? !1 : (un.current & 2) !== 0), p && (s = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (yt) {
        if (s ? ia(t) : sa(), (e = qt) ? (e = Ub(
          e,
          Bl
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ea !== null ? { id: ho, overflow: mo } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = fp(e), l.return = t, t.child = l, Ln = t, qt = null)) : e = null, e === null) throw na(t);
        return vd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var C = a.children;
      return a = a.fallback, s ? (sa(), s = t.mode, C = nc(
        { mode: "hidden", children: C },
        s
      ), a = Za(
        a,
        s,
        l,
        null
      ), C.return = t, a.return = t, C.sibling = a, t.child = C, a = t.child, a.memoizedState = Lf(l), a.childLanes = Vf(
        e,
        p,
        l
      ), t.memoizedState = jf, Vi(null, a)) : (ia(t), If(t, C));
    }
    var L = e.memoizedState;
    if (L !== null && (C = L.dehydrated, C !== null)) {
      if (u)
        t.flags & 256 ? (ia(t), t.flags &= -257, t = Hf(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (sa(), t.child = e.child, t.flags |= 128, t = null) : (sa(), C = a.fallback, s = t.mode, a = nc(
          { mode: "visible", children: a.children },
          s
        ), C = Za(
          C,
          s,
          l,
          null
        ), C.flags |= 2, a.return = t, C.return = t, a.sibling = C, t.child = a, lr(
          t,
          e.child,
          null,
          l
        ), a = t.child, a.memoizedState = Lf(l), a.childLanes = Vf(
          e,
          p,
          l
        ), t.memoizedState = jf, t = Vi(null, a));
      else if (ia(t), vd(C)) {
        if (p = C.nextSibling && C.nextSibling.dataset, p) var J = p.dgst;
        p = J, a = Error(i(419)), a.stack = "", a.digest = p, _i({ value: a, source: null, stack: null }), t = Hf(
          e,
          t,
          l
        );
      } else if (yn || Dr(e, t, l, !1), p = (l & e.childLanes) !== 0, yn || p) {
        if (p = Ut, p !== null && (a = an(p, l), a !== 0 && a !== L.retryLane))
          throw L.retryLane = a, Qa(e, a), hl(p, e, a), zf;
        yd(C) || fc(), t = Hf(
          e,
          t,
          l
        );
      } else
        yd(C) ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, qt = Yl(
          C.nextSibling
        ), Ln = t, yt = !0, ta = null, Bl = !1, e !== null && mp(t, e), t = If(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (sa(), C = a.fallback, s = t.mode, L = e.child, J = L.sibling, a = Ao(L, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = L.subtreeFlags & 65011712, J !== null ? C = Ao(
      J,
      C
    ) : (C = Za(
      C,
      s,
      l,
      null
    ), C.flags |= 2), C.return = t, a.return = t, a.sibling = C, t.child = a, Vi(null, a), a = t.child, C = e.child.memoizedState, C === null ? C = Lf(l) : (s = C.cachePool, s !== null ? (L = gn._currentValue, s = s.parent !== L ? { parent: L, pool: L } : s) : s = xp(), C = {
      baseLanes: C.baseLanes | l,
      cachePool: s
    }), a.memoizedState = C, a.childLanes = Vf(
      e,
      p,
      l
    ), t.memoizedState = jf, Vi(e.child, a)) : (ia(t), l = e.child, e = l.sibling, l = Ao(l, {
      mode: "visible",
      children: a.children
    }), l.return = t, l.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function If(e, t) {
    return t = nc(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function nc(e, t) {
    return e = El(22, e, null, t), e.lanes = 0, e;
  }
  function Hf(e, t, l) {
    return lr(t, e.child, null, l), e = If(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function zg(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Wu(e.return, t, l);
  }
  function Uf(e, t, l, a, s, u) {
    var p = e.memoizedState;
    p === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: s,
      treeForkCount: u
    } : (p.isBackwards = t, p.rendering = null, p.renderingStartTime = 0, p.last = a, p.tail = l, p.tailMode = s, p.treeForkCount = u);
  }
  function Dg(e, t, l) {
    var a = t.pendingProps, s = a.revealOrder, u = a.tail;
    a = a.children;
    var p = un.current, C = (p & 2) !== 0;
    if (C ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, le(un, p), In(e, t, a, l), a = yt ? Ri : 0, !C && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && zg(e, l, t);
        else if (e.tag === 19)
          zg(e, l, t);
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
          e = l.alternate, e !== null && qs(e) === null && (s = l), l = l.sibling;
        l = s, l === null ? (s = t.child, t.child = null) : (s = l.sibling, l.sibling = null), Uf(
          t,
          !1,
          s,
          l,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && qs(e) === null) {
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
          a
        );
        break;
      case "together":
        Uf(
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
  function zo(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), fa |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Dr(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(i(153));
    if (t.child !== null) {
      for (e = t.child, l = Ao(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = Ao(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Bf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ls(e)));
  }
  function iE(e, t, l) {
    switch (t.tag) {
      case 3:
        Ae(t, t.stateNode.containerInfo), la(t, gn, e.memoizedState.cache), $a();
        break;
      case 27:
      case 5:
        at(t);
        break;
      case 4:
        Ae(t, t.stateNode.containerInfo);
        break;
      case 10:
        la(
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
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ia(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Ng(e, t, l) : (ia(t), e = zo(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        ia(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (a = (l & t.childLanes) !== 0, a || (Dr(
          e,
          t,
          l,
          !1
        ), a = (l & t.childLanes) !== 0), s) {
          if (a)
            return Dg(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), le(un, un.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, wg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        la(t, gn, e.memoizedState.cache);
    }
    return zo(e, t, l);
  }
  function jg(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        yn = !0;
      else {
        if (!Bf(e, l) && (t.flags & 128) === 0)
          return yn = !1, iE(
            e,
            t,
            l
          );
        yn = (e.flags & 131072) !== 0;
      }
    else
      yn = !1, yt && (t.flags & 1048576) !== 0 && hp(t, Ri, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = tr(t.elementType), t.type = e, typeof e == "function")
            Pu(e) ? (a = ar(e, a), t.tag = 1, t = Og(
              null,
              t,
              e,
              a,
              l
            )) : (t.tag = 0, t = Df(
              null,
              t,
              e,
              a,
              l
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === N) {
                t.tag = 11, t = Cg(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              } else if (s === G) {
                t.tag = 14, t = Rg(
                  null,
                  t,
                  e,
                  a,
                  l
                );
                break e;
              }
            }
            throw t = he(e) || e, Error(i(306, t, ""));
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
        return a = t.type, s = ar(
          a,
          t.pendingProps
        ), Og(
          e,
          t,
          a,
          s,
          l
        );
      case 3:
        e: {
          if (Ae(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(i(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          s = u.element, rf(e, t), Ni(t, a, null, l);
          var p = t.memoizedState;
          if (a = p.cache, la(t, gn, a), a !== u.cache && ef(
            t,
            [gn],
            l,
            !0
          ), ki(), a = p.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = kg(
                e,
                t,
                a,
                l
              );
              break e;
            } else if (a !== s) {
              s = Il(
                Error(i(424)),
                t
              ), _i(s), t = kg(
                e,
                t,
                a,
                l
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qt = Yl(e.firstChild), Ln = t, yt = !0, ta = null, Bl = !0, l = wp(
                t,
                null,
                a,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if ($a(), a === s) {
              t = zo(
                e,
                t,
                l
              );
              break e;
            }
            In(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return tc(e, t), e === null ? (l = Xb(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : yt || (l = t.type, e = t.pendingProps, a = yc(
          _e.current
        ).createElement(l), a[Ct] = t, a[Rt] = e, Hn(a, l, e), en(a), t.stateNode = a) : t.memoizedState = Xb(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return at(t), e === null && yt && (a = t.stateNode = Yb(
          t.type,
          t.pendingProps,
          _e.current
        ), Ln = t, Bl = !0, s = qt, ga(t.type) ? (xd = s, qt = Yl(a.firstChild)) : qt = s), In(
          e,
          t,
          t.pendingProps.children,
          l
        ), tc(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && yt && ((s = a = qt) && (a = VE(
          a,
          t.type,
          t.pendingProps,
          Bl
        ), a !== null ? (t.stateNode = a, Ln = t, qt = Yl(a.firstChild), Bl = !1, s = !0) : s = !1), s || na(t)), at(t), s = t.type, u = t.pendingProps, p = e !== null ? e.memoizedProps : null, a = u.children, pd(s, u) ? a = null : p !== null && pd(s, p) && (t.flags |= 32), t.memoizedState !== null && (s = mf(
          e,
          t,
          JS,
          null,
          null,
          l
        ), Ji._currentValue = s), tc(e, t), In(e, t, a, l), t.child;
      case 6:
        return e === null && yt && ((e = l = qt) && (l = IE(
          l,
          t.pendingProps,
          Bl
        ), l !== null ? (t.stateNode = l, Ln = t, qt = null, e = !0) : e = !1), e || na(t)), null;
      case 13:
        return Ng(e, t, l);
      case 4:
        return Ae(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = lr(
          t,
          null,
          a,
          l
        ) : In(e, t, a, l), t.child;
      case 11:
        return Cg(
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
        return a = t.pendingProps, la(t, t.type, a.value), In(e, t, a.children, l), t.child;
      case 9:
        return s = t.type._context, a = t.pendingProps.children, Wa(t), s = Vn(s), a = a(s), t.flags |= 1, In(e, t, a, l), t.child;
      case 14:
        return Rg(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return _g(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Dg(e, t, l);
      case 31:
        return rE(e, t, l);
      case 22:
        return wg(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Wa(t), a = Vn(gn), e === null ? (s = lf(), s === null && (s = Ut, u = tf(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= l), s = u), t.memoizedState = { parent: a, cache: s }, af(t), la(t, gn, s)) : ((e.lanes & l) !== 0 && (rf(e, t), Ni(t, null, null, l), ki()), s = e.memoizedState, u = t.memoizedState, s.parent !== a ? (s = { parent: a, cache: a }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), la(t, gn, a)) : (a = u.cache, la(t, gn, a), a !== s.cache && ef(
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
    throw Error(i(156, t.tag));
  }
  function Do(e) {
    e.flags |= 4;
  }
  function Gf(e, t, l, a, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (sb()) e.flags |= 8192;
        else
          throw nr = Us, of;
    } else e.flags &= -16777217;
  }
  function Lg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !$b(t))
      if (sb()) e.flags |= 8192;
      else
        throw nr = Us, of;
  }
  function lc(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? An() : 536870912, e.lanes |= t, Xr |= t);
  }
  function Ii(e, t) {
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
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function Pt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
    if (t)
      for (var s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, a |= s.subtreeFlags & 65011712, a |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        l |= s.lanes | s.childLanes, a |= s.subtreeFlags, a |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= a, e.childLanes = l, t;
  }
  function sE(e, t, l) {
    var a = t.pendingProps;
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
        return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Oo(gn), Te(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (zr(t) ? Do(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, $u())), Pt(t), null;
      case 26:
        var s = t.type, u = t.memoizedState;
        return e === null ? (Do(t), u !== null ? (Pt(t), Lg(t, u)) : (Pt(t), Gf(
          t,
          s,
          null,
          a,
          l
        ))) : u ? u !== e.memoizedState ? (Do(t), Pt(t), Lg(t, u)) : (Pt(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Do(t), Pt(t), Gf(
          t,
          s,
          e,
          a,
          l
        )), null;
      case 27:
        if (pt(t), l = _e.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Do(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Pt(t), null;
          }
          e = oe.current, zr(t) ? pp(t) : (e = Yb(s, a, l), t.stateNode = e, Do(t));
        }
        return Pt(t), null;
      case 5:
        if (pt(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Do(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(i(166));
            return Pt(t), null;
          }
          if (u = oe.current, zr(t))
            pp(t);
          else {
            var p = yc(
              _e.current
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
                    u = typeof a.is == "string" ? p.createElement("select", {
                      is: a.is
                    }) : p.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? p.createElement(s, { is: a.is }) : p.createElement(s);
                }
            }
            u[Ct] = t, u[Rt] = a;
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
            e: switch (Hn(u, s, a), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Do(t);
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
          e.memoizedProps !== a && Do(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(i(166));
          if (e = _e.current, zr(t)) {
            if (e = t.stateNode, l = t.memoizedProps, a = null, s = Ln, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  a = s.memoizedProps;
              }
            e[Ct] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Nb(e.nodeValue, l)), e || na(t, !0);
          } else
            e = yc(e).createTextNode(
              a
            ), e[Ct] = t, t.stateNode = e;
        }
        return Pt(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = zr(t), l !== null) {
            if (e === null) {
              if (!a) throw Error(i(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(i(557));
              e[Ct] = t;
            } else
              $a(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), e = !1;
          } else
            l = $u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Rl(t), t) : (Rl(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(i(558));
        }
        return Pt(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = zr(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(i(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(i(317));
              s[Ct] = t;
            } else
              $a(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Pt(t), s = !1;
          } else
            s = $u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Rl(t), t) : (Rl(t), null);
        }
        return Rl(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, s = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (s = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== s && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), lc(t, t.updateQueue), Pt(t), null);
      case 4:
        return Te(), e === null && ud(t.stateNode.containerInfo), Pt(t), null;
      case 10:
        return Oo(t.type), Pt(t), null;
      case 19:
        if (K(un), a = t.memoizedState, a === null) return Pt(t), null;
        if (s = (t.flags & 128) !== 0, u = a.rendering, u === null)
          if (s) Ii(a, !1);
          else {
            if (ln !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = qs(e), u !== null) {
                  for (t.flags |= 128, Ii(a, !1), e = u.updateQueue, t.updateQueue = e, lc(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    up(l, e), l = l.sibling;
                  return le(
                    un,
                    un.current & 1 | 2
                  ), yt && Mo(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && Q() > sc && (t.flags |= 128, s = !0, Ii(a, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = qs(u), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, lc(t, e), Ii(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !yt)
                return Pt(t), null;
            } else
              2 * Q() - a.renderingStartTime > sc && l !== 536870912 && (t.flags |= 128, s = !0, Ii(a, !1), t.lanes = 4194304);
          a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = Q(), e.sibling = null, l = un.current, le(
          un,
          s ? l & 1 | 2 : l & 1
        ), yt && Mo(t, a.treeForkCount), e) : (Pt(t), null);
      case 22:
      case 23:
        return Rl(t), ff(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Pt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pt(t), l = t.updateQueue, l !== null && lc(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && K(er), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Oo(gn), Pt(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, t.tag));
  }
  function cE(e, t) {
    switch (Qu(t), t.tag) {
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
            throw Error(i(340));
          $a();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Rl(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(i(340));
          $a();
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
        return Rl(t), ff(), e !== null && K(er), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Oo(gn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Vg(e, t) {
    switch (Qu(t), t.tag) {
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
        Rl(t), ff(), e !== null && K(er);
        break;
      case 24:
        Oo(gn);
    }
  }
  function Hi(e, t) {
    try {
      var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var s = a.next;
        l = s;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var u = l.create, p = l.inst;
            a = u(), p.destroy = a;
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (C) {
      jt(t, t.return, C);
    }
  }
  function ca(e, t, l) {
    try {
      var a = t.updateQueue, s = a !== null ? a.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var p = a.inst, C = p.destroy;
            if (C !== void 0) {
              p.destroy = void 0, s = t;
              var L = l, J = C;
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
          a = a.next;
        } while (a !== u);
      }
    } catch (ue) {
      jt(t, t.return, ue);
    }
  }
  function Ig(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Mp(t, l);
      } catch (a) {
        jt(e, e.return, a);
      }
    }
  }
  function Hg(e, t, l) {
    l.props = ar(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      jt(e, t, a);
    }
  }
  function Ui(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
      }
    } catch (s) {
      jt(e, t, s);
    }
  }
  function po(e, t) {
    var l = e.ref, a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
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
  function Ug(e) {
    var t = e.type, l = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function Yf(e, t, l) {
    try {
      var a = e.stateNode;
      kE(a, e.type, l, t), a[Rt] = t;
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function Bg(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ga(e.type) || e.tag === 4;
  }
  function qf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Bg(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ga(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Pf(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = $n));
    else if (a !== 4 && (a === 27 && ga(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (Pf(e, t, l), e = e.sibling; e !== null; )
        Pf(e, t, l), e = e.sibling;
  }
  function oc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (a !== 4 && (a === 27 && ga(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (oc(e, t, l), e = e.sibling; e !== null; )
        oc(e, t, l), e = e.sibling;
  }
  function Gg(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var a = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      Hn(t, a, l), t[Ct] = e, t[Rt] = l;
    } catch (u) {
      jt(e, e.return, u);
    }
  }
  var jo = !1, vn = !1, Xf = !1, Yg = typeof WeakSet == "function" ? WeakSet : Set, On = null;
  function uE(e, t) {
    if (e = e.containerInfo, hd = _c, e = tp(e), Iu(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var s = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, u.nodeType;
            } catch {
              l = null;
              break e;
            }
            var p = 0, C = -1, L = -1, J = 0, ue = 0, me = e, W = null;
            t: for (; ; ) {
              for (var ae; me !== l || s !== 0 && me.nodeType !== 3 || (C = p + s), me !== u || a !== 0 && me.nodeType !== 3 || (L = p + a), me.nodeType === 3 && (p += me.nodeValue.length), (ae = me.firstChild) !== null; )
                W = me, me = ae;
              for (; ; ) {
                if (me === e) break t;
                if (W === l && ++J === s && (C = p), W === u && ++ue === a && (L = p), (ae = me.nextSibling) !== null) break;
                me = W, W = me.parentNode;
              }
              me = ae;
            }
            l = C === -1 || L === -1 ? null : { start: C, end: L };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (md = { focusedElem: e, selectionRange: l }, _c = !1, On = t; On !== null; )
      if (t = On, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, On = e;
      else
        for (; On !== null; ) {
          switch (t = On, u = t.alternate, e = t.flags, t.tag) {
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
                e = void 0, l = t, s = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
                try {
                  var Ve = ar(
                    l.type,
                    s
                  );
                  e = a.getSnapshotBeforeUpdate(
                    Ve,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
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
              if ((e & 1024) !== 0) throw Error(i(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, On = e;
            break;
          }
          On = t.return;
        }
  }
  function qg(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Vo(e, l), a & 4 && Hi(5, l);
        break;
      case 1:
        if (Vo(e, l), a & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              jt(l, l.return, p);
            }
          else {
            var s = ar(
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
        a & 64 && Ig(l), a & 512 && Ui(l, l.return);
        break;
      case 3:
        if (Vo(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
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
            Mp(e, t);
          } catch (p) {
            jt(l, l.return, p);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Gg(l);
      case 26:
      case 5:
        Vo(e, l), t === null && a & 4 && Ug(l), a & 512 && Ui(l, l.return);
        break;
      case 12:
        Vo(e, l);
        break;
      case 31:
        Vo(e, l), a & 4 && Kg(e, l);
        break;
      case 13:
        Vo(e, l), a & 4 && Fg(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = vE.bind(
          null,
          l
        ), HE(e, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || jo, !a) {
          t = t !== null && t.memoizedState !== null || vn, s = jo;
          var u = vn;
          jo = a, (vn = t) && !u ? Io(
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
  function Pg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && co(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Zt = null, cl = !1;
  function Lo(e, t, l) {
    for (l = l.child; l !== null; )
      Xg(e, t, l), l = l.sibling;
  }
  function Xg(e, t, l) {
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
        var a = Zt, s = cl;
        ga(l.type) && (Zt = l.stateNode, cl = !1), Lo(
          e,
          t,
          l
        ), Qi(l.stateNode), Zt = a, cl = s;
        break;
      case 5:
        vn || po(l, t);
      case 6:
        if (a = Zt, s = cl, Zt = null, Lo(
          e,
          t,
          l
        ), Zt = a, cl = s, Zt !== null)
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
        Zt !== null && (cl ? (e = Zt, Ib(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), ei(e)) : Ib(Zt, l.stateNode));
        break;
      case 4:
        a = Zt, s = cl, Zt = l.stateNode.containerInfo, cl = !0, Lo(
          e,
          t,
          l
        ), Zt = a, cl = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ca(2, l, t), vn || ca(4, l, t), Lo(
          e,
          t,
          l
        );
        break;
      case 1:
        vn || (po(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && Hg(
          l,
          t,
          a
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
        vn = (a = vn) || l.memoizedState !== null, Lo(
          e,
          t,
          l
        ), vn = a;
        break;
      default:
        Lo(
          e,
          t,
          l
        );
    }
  }
  function Kg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        ei(e);
      } catch (l) {
        jt(t, t.return, l);
      }
    }
  }
  function Fg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        ei(e);
      } catch (l) {
        jt(t, t.return, l);
      }
  }
  function fE(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Yg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Yg()), t;
      default:
        throw Error(i(435, e.tag));
    }
  }
  function ac(e, t) {
    var l = fE(e);
    t.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var s = xE.bind(null, e, a);
        a.then(s, s);
      }
    });
  }
  function ul(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var s = l[a], u = e, p = t, C = p;
        e: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (ga(C.type)) {
                Zt = C.stateNode, cl = !1;
                break e;
              }
              break;
            case 5:
              Zt = C.stateNode, cl = !1;
              break e;
            case 3:
            case 4:
              Zt = C.stateNode.containerInfo, cl = !0;
              break e;
          }
          C = C.return;
        }
        if (Zt === null) throw Error(i(160));
        Xg(u, p, s), Zt = null, cl = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Qg(t, e), t = t.sibling;
  }
  var lo = null;
  function Qg(e, t) {
    var l = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(t, e), fl(e), a & 4 && (ca(3, e, e.return), Hi(3, e), ca(5, e, e.return));
        break;
      case 1:
        ul(t, e), fl(e), a & 512 && (vn || l === null || po(l, l.return)), a & 64 && jo && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
        break;
      case 26:
        var s = lo;
        if (ul(t, e), fl(e), a & 512 && (vn || l === null || po(l, l.return)), a & 4) {
          var u = l !== null ? l.memoizedState : null;
          if (a = e.memoizedState, l === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, l = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (a) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[$l] || u[Ct] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(a), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Hn(u, a, l), u[Ct] = e, en(u), a = u;
                      break e;
                    case "link":
                      var p = Qb(
                        "link",
                        "href",
                        s
                      ).get(a + (l.href || ""));
                      if (p) {
                        for (var C = 0; C < p.length; C++)
                          if (u = p[C], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            p.splice(C, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), Hn(u, a, l), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (p = Qb(
                        "meta",
                        "content",
                        s
                      ).get(a + (l.content || ""))) {
                        for (C = 0; C < p.length; C++)
                          if (u = p[C], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            p.splice(C, 1);
                            break t;
                          }
                      }
                      u = s.createElement(a), Hn(u, a, l), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(i(468, a));
                  }
                  u[Ct] = e, en(u), a = u;
                }
                e.stateNode = a;
              } else
                Zb(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Fb(
                s,
                a,
                e.memoizedProps
              );
          else
            u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? Zb(
              s,
              e.type,
              e.stateNode
            ) : Fb(
              s,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Yf(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ul(t, e), fl(e), a & 512 && (vn || l === null || po(l, l.return)), l !== null && a & 4 && Yf(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ul(t, e), fl(e), a & 512 && (vn || l === null || po(l, l.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Ll(s, "");
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        }
        a & 4 && e.stateNode != null && (s = e.memoizedProps, Yf(
          e,
          s,
          l !== null ? l.memoizedProps : s
        )), a & 1024 && (Xf = !0);
        break;
      case 6:
        if (ul(t, e), fl(e), a & 4) {
          if (e.stateNode === null)
            throw Error(i(162));
          a = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = a;
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        }
        break;
      case 3:
        if (Sc = null, s = lo, lo = vc(t.containerInfo), ul(t, e), lo = s, fl(e), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            ei(t.containerInfo);
          } catch (Ve) {
            jt(e, e.return, Ve);
          }
        Xf && (Xf = !1, Zg(e));
        break;
      case 4:
        a = lo, lo = vc(
          e.stateNode.containerInfo
        ), ul(t, e), fl(e), lo = a;
        break;
      case 12:
        ul(t, e), fl(e);
        break;
      case 31:
        ul(t, e), fl(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ac(e, a)));
        break;
      case 13:
        ul(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ic = Q()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ac(e, a)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var L = l !== null && l.memoizedState !== null, J = jo, ue = vn;
        if (jo = J || s, vn = ue || L, ul(t, e), vn = ue, jo = J, fl(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (l === null || L || jo || vn || rr(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                L = l = t;
                try {
                  if (u = L.stateNode, s)
                    p = u.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    C = L.stateNode;
                    var me = L.memoizedProps.style, W = me != null && me.hasOwnProperty("display") ? me.display : null;
                    C.style.display = W == null || typeof W == "boolean" ? "" : ("" + W).trim();
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
                  var ae = L.stateNode;
                  s ? Hb(ae, !0) : Hb(L.stateNode, !1);
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
        a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, ac(e, l))));
        break;
      case 19:
        ul(t, e), fl(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ac(e, a)));
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
        for (var l, a = e.return; a !== null; ) {
          if (Bg(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(i(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, u = qf(e);
            oc(e, u, s);
            break;
          case 5:
            var p = l.stateNode;
            l.flags & 32 && (Ll(p, ""), l.flags &= -33);
            var C = qf(e);
            oc(e, C, p);
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
            throw Error(i(161));
        }
      } catch (ue) {
        jt(e, e.return, ue);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Zg(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Zg(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Vo(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        qg(e, t.alternate, t), t = t.sibling;
  }
  function rr(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ca(4, t, t.return), rr(t);
          break;
        case 1:
          po(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Hg(
            t,
            t.return,
            l
          ), rr(t);
          break;
        case 27:
          Qi(t.stateNode);
        case 26:
        case 5:
          po(t, t.return), rr(t);
          break;
        case 22:
          t.memoizedState === null && rr(t);
          break;
        case 30:
          rr(t);
          break;
        default:
          rr(t);
      }
      e = e.sibling;
    }
  }
  function Io(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, s = e, u = t, p = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Io(
            s,
            u,
            l
          ), Hi(4, u);
          break;
        case 1:
          if (Io(
            s,
            u,
            l
          ), a = u, s = a.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (J) {
              jt(a, a.return, J);
            }
          if (a = u, s = a.updateQueue, s !== null) {
            var C = a.stateNode;
            try {
              var L = s.shared.hiddenCallbacks;
              if (L !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < L.length; s++)
                  Ap(L[s], C);
            } catch (J) {
              jt(a, a.return, J);
            }
          }
          l && p & 64 && Ig(u), Ui(u, u.return);
          break;
        case 27:
          Gg(u);
        case 26:
        case 5:
          Io(
            s,
            u,
            l
          ), l && a === null && p & 4 && Ug(u), Ui(u, u.return);
          break;
        case 12:
          Io(
            s,
            u,
            l
          );
          break;
        case 31:
          Io(
            s,
            u,
            l
          ), l && p & 4 && Kg(s, u);
          break;
        case 13:
          Io(
            s,
            u,
            l
          ), l && p & 4 && Fg(s, u);
          break;
        case 22:
          u.memoizedState === null && Io(
            s,
            u,
            l
          ), Ui(u, u.return);
          break;
        case 30:
          break;
        default:
          Io(
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
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && wi(l));
  }
  function Ff(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wi(e));
  }
  function oo(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        $g(
          e,
          t,
          l,
          a
        ), t = t.sibling;
  }
  function $g(e, t, l, a) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        oo(
          e,
          t,
          l,
          a
        ), s & 2048 && Hi(9, t);
        break;
      case 1:
        oo(
          e,
          t,
          l,
          a
        );
        break;
      case 3:
        oo(
          e,
          t,
          l,
          a
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && wi(e)));
        break;
      case 12:
        if (s & 2048) {
          oo(
            e,
            t,
            l,
            a
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, p = u.id, C = u.onPostCommit;
            typeof C == "function" && C(
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
            a
          );
        break;
      case 31:
        oo(
          e,
          t,
          l,
          a
        );
        break;
      case 13:
        oo(
          e,
          t,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, p = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? oo(
          e,
          t,
          l,
          a
        ) : Bi(e, t) : u._visibility & 2 ? oo(
          e,
          t,
          l,
          a
        ) : (u._visibility |= 2, Yr(
          e,
          t,
          l,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Kf(p, t);
        break;
      case 24:
        oo(
          e,
          t,
          l,
          a
        ), s & 2048 && Ff(t.alternate, t);
        break;
      default:
        oo(
          e,
          t,
          l,
          a
        );
    }
  }
  function Yr(e, t, l, a, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, p = t, C = l, L = a, J = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Yr(
            u,
            p,
            C,
            L,
            s
          ), Hi(8, p);
          break;
        case 23:
          break;
        case 22:
          var ue = p.stateNode;
          p.memoizedState !== null ? ue._visibility & 2 ? Yr(
            u,
            p,
            C,
            L,
            s
          ) : Bi(
            u,
            p
          ) : (ue._visibility |= 2, Yr(
            u,
            p,
            C,
            L,
            s
          )), s && J & 2048 && Kf(
            p.alternate,
            p
          );
          break;
        case 24:
          Yr(
            u,
            p,
            C,
            L,
            s
          ), s && J & 2048 && Ff(p.alternate, p);
          break;
        default:
          Yr(
            u,
            p,
            C,
            L,
            s
          );
      }
      t = t.sibling;
    }
  }
  function Bi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, a = t, s = a.flags;
        switch (a.tag) {
          case 22:
            Bi(l, a), s & 2048 && Kf(
              a.alternate,
              a
            );
            break;
          case 24:
            Bi(l, a), s & 2048 && Ff(a.alternate, a);
            break;
          default:
            Bi(l, a);
        }
        t = t.sibling;
      }
  }
  var Gi = 8192;
  function qr(e, t, l) {
    if (e.subtreeFlags & Gi)
      for (e = e.child; e !== null; )
        Jg(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function Jg(e, t, l) {
    switch (e.tag) {
      case 26:
        qr(
          e,
          t,
          l
        ), e.flags & Gi && e.memoizedState !== null && $E(
          l,
          lo,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        qr(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var a = lo;
        lo = vc(e.stateNode.containerInfo), qr(
          e,
          t,
          l
        ), lo = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Gi, Gi = 16777216, qr(
          e,
          t,
          l
        ), Gi = a) : qr(
          e,
          t,
          l
        ));
        break;
      default:
        qr(
          e,
          t,
          l
        );
    }
  }
  function Wg(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Yi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          On = a, tb(
            a,
            e
          );
        }
      Wg(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        eb(e), e = e.sibling;
  }
  function eb(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Yi(e), e.flags & 2048 && ca(9, e, e.return);
        break;
      case 3:
        Yi(e);
        break;
      case 12:
        Yi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, rc(e)) : Yi(e);
        break;
      default:
        Yi(e);
    }
  }
  function rc(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          On = a, tb(
            a,
            e
          );
        }
      Wg(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ca(8, t, t.return), rc(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, rc(t));
          break;
        default:
          rc(t);
      }
      e = e.sibling;
    }
  }
  function tb(e, t) {
    for (; On !== null; ) {
      var l = On;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ca(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          wi(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, On = a;
      else
        e: for (l = e; On !== null; ) {
          a = On;
          var s = a.sibling, u = a.return;
          if (Pg(a), a === l) {
            On = null;
            break e;
          }
          if (s !== null) {
            s.return = u, On = s;
            break e;
          }
          On = u;
        }
    }
  }
  var dE = {
    getCacheForType: function(e) {
      var t = Vn(gn), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Vn(gn).controller.signal;
    }
  }, hE = typeof WeakMap == "function" ? WeakMap : Map, kt = 0, Ut = null, ht = null, gt = 0, Dt = 0, _l = null, ua = !1, Pr = !1, Qf = !1, Ho = 0, ln = 0, fa = 0, ir = 0, Zf = 0, wl = 0, Xr = 0, qi = null, dl = null, $f = !1, ic = 0, nb = 0, sc = 1 / 0, cc = null, da = null, En = 0, ha = null, Kr = null, Uo = 0, Jf = 0, Wf = null, lb = null, Pi = 0, ed = null;
  function Al() {
    return (kt & 2) !== 0 && gt !== 0 ? gt & -gt : V.T !== null ? rd() : ll();
  }
  function ob() {
    if (wl === 0)
      if ((gt & 536870912) === 0 || yt) {
        var e = Wt;
        Wt <<= 1, (Wt & 3932160) === 0 && (Wt = 262144), wl = e;
      } else wl = 536870912;
    return e = Cl.current, e !== null && (e.flags |= 32), wl;
  }
  function hl(e, t, l) {
    (e === Ut && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null) && (Fr(e, 0), ma(
      e,
      gt,
      wl,
      !1
    )), nl(e, l), ((kt & 2) === 0 || e !== Ut) && (e === Ut && ((kt & 2) === 0 && (ir |= l), ln === 4 && ma(
      e,
      gt,
      wl,
      !1
    )), go(e));
  }
  function ab(e, t, l) {
    if ((kt & 6) !== 0) throw Error(i(327));
    var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Qt(e, t), s = a ? gE(e, t) : nd(e, t, !0), u = a;
    do {
      if (s === 0) {
        Pr && !a && ma(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, u && !mE(l)) {
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
              var C = e;
              s = qi;
              var L = C.current.memoizedState.isDehydrated;
              if (L && (Fr(C, p).flags |= 256), p = nd(
                C,
                p,
                !1
              ), p !== 2) {
                if (Qf && !L) {
                  C.errorRecoveryDisabledLanes |= u, ir |= u, s = 4;
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
          Fr(e, 0), ma(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, u = s, u) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ma(
                a,
                t,
                wl,
                !ua
              );
              break e;
            case 2:
              dl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((t & 62914560) === t && (s = ic + 300 - Q(), 10 < s)) {
            if (ma(
              a,
              t,
              wl,
              !ua
            ), Ke(a, 0, !0) !== 0) break e;
            Uo = t, a.timeoutHandle = Lb(
              rb.bind(
                null,
                a,
                l,
                dl,
                cc,
                $f,
                t,
                wl,
                ir,
                Xr,
                ua,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          rb(
            a,
            l,
            dl,
            cc,
            $f,
            t,
            wl,
            ir,
            Xr,
            ua,
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
  function rb(e, t, l, a, s, u, p, C, L, J, ue, me, W, ae) {
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
      }, Jg(
        t,
        u,
        me
      );
      var Ve = (u & 62914560) === u ? ic - Q() : (u & 4194048) === u ? nb - Q() : 0;
      if (Ve = JE(
        me,
        Ve
      ), Ve !== null) {
        Uo = u, e.cancelPendingCommit = Ve(
          mb.bind(
            null,
            e,
            t,
            u,
            l,
            a,
            s,
            p,
            C,
            L,
            ue,
            me,
            null,
            W,
            ae
          )
        ), ma(e, u, p, !J);
        return;
      }
    }
    mb(
      e,
      t,
      u,
      l,
      a,
      s,
      p,
      C,
      L
    );
  }
  function mE(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var s = l[a], u = s.getSnapshot;
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
  function ma(e, t, l, a) {
    t &= ~Zf, t &= ~ir, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var u = 31 - st(s), p = 1 << u;
      a[u] = -1, s &= ~p;
    }
    l !== 0 && io(e, l, t);
  }
  function uc() {
    return (kt & 6) === 0 ? (Xi(0), !1) : !0;
  }
  function td() {
    if (ht !== null) {
      if (Dt === 0)
        var e = ht.return;
      else
        e = ht, To = Ja = null, bf(e), Ir = null, Mi = 0, e = ht;
      for (; e !== null; )
        Vg(e.alternate, e), e = e.return;
      ht = null;
    }
  }
  function Fr(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, DE(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), Uo = 0, td(), Ut = e, ht = l = Ao(e.current, null), gt = t, Dt = 0, _l = null, ua = !1, Pr = Qt(e, t), Qf = !1, Xr = wl = Zf = ir = fa = ln = 0, dl = qi = null, $f = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var s = 31 - st(a), u = 1 << s;
        t |= e[s], a &= ~u;
      }
    return Ho = t, ks(), l;
  }
  function ib(e, t) {
    rt = null, V.H = Li, t === Vr || t === Hs ? (t = Cp(), Dt = 3) : t === of ? (t = Cp(), Dt = 4) : Dt = t === zf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, _l = t, ht === null && (ln = 1, Ws(
      e,
      Il(t, e.current)
    ));
  }
  function sb() {
    var e = Cl.current;
    return e === null ? !0 : (gt & 4194048) === gt ? Gl === null : (gt & 62914560) === gt || (gt & 536870912) !== 0 ? e === Gl : !1;
  }
  function cb() {
    var e = V.H;
    return V.H = Li, e === null ? Li : e;
  }
  function ub() {
    var e = V.A;
    return V.A = dE, e;
  }
  function fc() {
    ln = 4, ua || (gt & 4194048) !== gt && Cl.current !== null || (Pr = !0), (fa & 134217727) === 0 && (ir & 134217727) === 0 || Ut === null || ma(
      Ut,
      gt,
      wl,
      !1
    );
  }
  function nd(e, t, l) {
    var a = kt;
    kt |= 2;
    var s = cb(), u = ub();
    (Ut !== e || gt !== t) && (cc = null, Fr(e, t)), t = !1;
    var p = ln;
    e: do
      try {
        if (Dt !== 0 && ht !== null) {
          var C = ht, L = _l;
          switch (Dt) {
            case 8:
              td(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Cl.current === null && (t = !0);
              var J = Dt;
              if (Dt = 0, _l = null, Qr(e, C, L, J), l && Pr) {
                p = 0;
                break e;
              }
              break;
            default:
              J = Dt, Dt = 0, _l = null, Qr(e, C, L, J);
          }
        }
        pE(), p = ln;
        break;
      } catch (ue) {
        ib(e, ue);
      }
    while (!0);
    return t && e.shellSuspendCounter++, To = Ja = null, kt = a, V.H = s, V.A = u, ht === null && (Ut = null, gt = 0, ks()), p;
  }
  function pE() {
    for (; ht !== null; ) fb(ht);
  }
  function gE(e, t) {
    var l = kt;
    kt |= 2;
    var a = cb(), s = ub();
    Ut !== e || gt !== t ? (cc = null, sc = Q() + 500, Fr(e, t)) : Pr = Qt(
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
              Dt = 0, _l = null, Qr(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (Sp(u)) {
                Dt = 0, _l = null, db(t);
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
              Sp(u) ? (Dt = 0, _l = null, db(t)) : (Dt = 0, _l = null, Qr(e, t, u, 7));
              break;
            case 5:
              var p = null;
              switch (ht.tag) {
                case 26:
                  p = ht.memoizedState;
                case 5:
                case 27:
                  var C = ht;
                  if (p ? $b(p) : C.stateNode.complete) {
                    Dt = 0, _l = null;
                    var L = C.sibling;
                    if (L !== null) ht = L;
                    else {
                      var J = C.return;
                      J !== null ? (ht = J, dc(J)) : ht = null;
                    }
                    break t;
                  }
              }
              Dt = 0, _l = null, Qr(e, t, u, 5);
              break;
            case 6:
              Dt = 0, _l = null, Qr(e, t, u, 6);
              break;
            case 8:
              td(), ln = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        bE();
        break;
      } catch (ue) {
        ib(e, ue);
      }
    while (!0);
    return To = Ja = null, V.H = a, V.A = s, kt = l, ht !== null ? 0 : (Ut = null, gt = 0, ks(), ln);
  }
  function bE() {
    for (; ht !== null && !Xe(); )
      fb(ht);
  }
  function fb(e) {
    var t = jg(e.alternate, e, Ho);
    e.memoizedProps = e.pendingProps, t === null ? dc(e) : ht = t;
  }
  function db(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Tg(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          gt
        );
        break;
      case 11:
        t = Tg(
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
        Vg(l, t), t = ht = up(t, Ho), t = jg(l, t, Ho);
    }
    e.memoizedProps = e.pendingProps, t === null ? dc(e) : ht = t;
  }
  function Qr(e, t, l, a) {
    To = Ja = null, bf(t), Ir = null, Mi = 0;
    var s = t.return;
    try {
      if (aE(
        e,
        s,
        t,
        l,
        gt
      )) {
        ln = 1, Ws(
          e,
          Il(l, e.current)
        ), ht = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw ht = s, u;
      ln = 1, Ws(
        e,
        Il(l, e.current)
      ), ht = null;
      return;
    }
    t.flags & 32768 ? (yt || a === 1 ? e = !0 : Pr || (gt & 536870912) !== 0 ? e = !1 : (ua = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Cl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), hb(t, e)) : dc(t);
  }
  function dc(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        hb(
          t,
          ua
        );
        return;
      }
      e = t.return;
      var l = sE(
        t.alternate,
        t,
        Ho
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
  function hb(e, t) {
    do {
      var l = cE(e.alternate, e);
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
  function mb(e, t, l, a, s, u, p, C, L) {
    e.cancelPendingCommit = null;
    do
      hc();
    while (En !== 0);
    if ((kt & 6) !== 0) throw Error(i(327));
    if (t !== null) {
      if (t === e.current) throw Error(i(177));
      if (u = t.lanes | t.childLanes, u |= Yu, zt(
        e,
        l,
        u,
        p,
        C,
        L
      ), e === Ut && (ht = Ut = null, gt = 0), Kr = t, ha = e, Uo = l, Jf = u, Wf = s, lb = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, SE(Ge, function() {
        return vb(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = V.T, V.T = null, s = H.p, H.p = 2, p = kt, kt |= 4;
        try {
          uE(e, t, l);
        } finally {
          kt = p, H.p = s, V.T = a;
        }
      }
      En = 1, pb(), gb(), bb();
    }
  }
  function pb() {
    if (En === 1) {
      En = 0;
      var e = ha, t = Kr, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = V.T, V.T = null;
        var a = H.p;
        H.p = 2;
        var s = kt;
        kt |= 4;
        try {
          Qg(t, e);
          var u = md, p = tp(e.containerInfo), C = u.focusedElem, L = u.selectionRange;
          if (p !== C && C && C.ownerDocument && ep(
            C.ownerDocument.documentElement,
            C
          )) {
            if (L !== null && Iu(C)) {
              var J = L.start, ue = L.end;
              if (ue === void 0 && (ue = J), "selectionStart" in C)
                C.selectionStart = J, C.selectionEnd = Math.min(
                  ue,
                  C.value.length
                );
              else {
                var me = C.ownerDocument || document, W = me && me.defaultView || window;
                if (W.getSelection) {
                  var ae = W.getSelection(), Ve = C.textContent.length, $e = Math.min(L.start, Ve), It = L.end === void 0 ? $e : Math.min(L.end, Ve);
                  !ae.extend && $e > It && (p = It, It = $e, $e = p);
                  var X = Wm(
                    C,
                    $e
                  ), B = Wm(
                    C,
                    It
                  );
                  if (X && B && (ae.rangeCount !== 1 || ae.anchorNode !== X.node || ae.anchorOffset !== X.offset || ae.focusNode !== B.node || ae.focusOffset !== B.offset)) {
                    var $ = me.createRange();
                    $.setStart(X.node, X.offset), ae.removeAllRanges(), $e > It ? (ae.addRange($), ae.extend(B.node, B.offset)) : ($.setEnd(B.node, B.offset), ae.addRange($));
                  }
                }
              }
            }
            for (me = [], ae = C; ae = ae.parentNode; )
              ae.nodeType === 1 && me.push({
                element: ae,
                left: ae.scrollLeft,
                top: ae.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < me.length; C++) {
              var de = me[C];
              de.element.scrollLeft = de.left, de.element.scrollTop = de.top;
            }
          }
          _c = !!hd, md = hd = null;
        } finally {
          kt = s, H.p = a, V.T = l;
        }
      }
      e.current = t, En = 2;
    }
  }
  function gb() {
    if (En === 2) {
      En = 0;
      var e = ha, t = Kr, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var a = H.p;
        H.p = 2;
        var s = kt;
        kt |= 4;
        try {
          qg(e, t.alternate, t);
        } finally {
          kt = s, H.p = a, V.T = l;
        }
      }
      En = 3;
    }
  }
  function bb() {
    if (En === 4 || En === 3) {
      En = 0, ye();
      var e = ha, t = Kr, l = Uo, a = lb;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? En = 5 : (En = 0, Kr = ha = null, yb(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (da = null), Dl(l), t = t.stateNode, xt && typeof xt.onCommitFiberRoot == "function")
        try {
          xt.onCommitFiberRoot(
            Nt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = V.T, s = H.p, H.p = 2, V.T = null;
        try {
          for (var u = e.onRecoverableError, p = 0; p < a.length; p++) {
            var C = a[p];
            u(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          V.T = t, H.p = s;
        }
      }
      (Uo & 3) !== 0 && hc(), go(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === ed ? Pi++ : (Pi = 0, ed = e) : Pi = 0, Xi(0);
    }
  }
  function yb(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, wi(t)));
  }
  function hc() {
    return pb(), gb(), bb(), vb();
  }
  function vb() {
    if (En !== 5) return !1;
    var e = ha, t = Jf;
    Jf = 0;
    var l = Dl(Uo), a = V.T, s = H.p;
    try {
      H.p = 32 > l ? 32 : l, V.T = null, l = Wf, Wf = null;
      var u = ha, p = Uo;
      if (En = 0, Kr = ha = null, Uo = 0, (kt & 6) !== 0) throw Error(i(331));
      var C = kt;
      if (kt |= 4, eb(u.current), $g(
        u,
        u.current,
        p,
        l
      ), kt = C, Xi(0, !1), xt && typeof xt.onPostCommitFiberRoot == "function")
        try {
          xt.onPostCommitFiberRoot(Nt, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = s, V.T = a, yb(e, t);
    }
  }
  function xb(e, t, l) {
    t = Il(l, t), t = Nf(e.stateNode, t, 2), e = ra(e, t, 2), e !== null && (nl(e, 2), go(e));
  }
  function jt(e, t, l) {
    if (e.tag === 3)
      xb(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          xb(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (da === null || !da.has(a))) {
            e = Il(l, e), l = Sg(2), a = ra(t, l, 2), a !== null && (Eg(
              l,
              a,
              t,
              e
            ), nl(a, 2), go(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function ld(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new hE();
      var s = /* @__PURE__ */ new Set();
      a.set(t, s);
    } else
      s = a.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), a.set(t, s));
    s.has(l) || (Qf = !0, s.add(l), e = yE.bind(null, e, t, l), t.then(e, e));
  }
  function yE(e, t, l) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ut === e && (gt & l) === l && (ln === 4 || ln === 3 && (gt & 62914560) === gt && 300 > Q() - ic ? (kt & 2) === 0 && Fr(e, 0) : Zf |= l, Xr === gt && (Xr = 0)), go(e);
  }
  function Sb(e, t) {
    t === 0 && (t = An()), e = Qa(e, t), e !== null && (nl(e, t), go(e));
  }
  function vE(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Sb(e, l);
  }
  function xE(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, s = e.memoizedState;
        s !== null && (l = s.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    a !== null && a.delete(t), Sb(e, l);
  }
  function SE(e, t) {
    return Je(e, t);
  }
  var mc = null, Zr = null, od = !1, pc = !1, ad = !1, pa = 0;
  function go(e) {
    e !== Zr && e.next === null && (Zr === null ? mc = Zr = e : Zr = Zr.next = e), pc = !0, od || (od = !0, CE());
  }
  function Xi(e, t) {
    if (!ad && pc) {
      ad = !0;
      do
        for (var l = !1, a = mc; a !== null; ) {
          if (e !== 0) {
            var s = a.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var p = a.suspendedLanes, C = a.pingedLanes;
              u = (1 << 31 - st(42 | e) + 1) - 1, u &= s & ~(p & ~C), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, _b(a, u));
          } else
            u = gt, u = Ke(
              a,
              a === Ut ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Qt(a, u) || (l = !0, _b(a, u));
          a = a.next;
        }
      while (l);
      ad = !1;
    }
  }
  function EE() {
    Eb();
  }
  function Eb() {
    pc = od = !1;
    var e = 0;
    pa !== 0 && zE() && (e = pa);
    for (var t = Q(), l = null, a = mc; a !== null; ) {
      var s = a.next, u = Cb(a, t);
      u === 0 ? (a.next = null, l === null ? mc = s : l.next = s, s === null && (Zr = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (pc = !0)), a = s;
    }
    En !== 0 && En !== 5 || Xi(e), pa !== 0 && (pa = 0);
  }
  function Cb(e, t) {
    for (var l = e.suspendedLanes, a = e.pingedLanes, s = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var p = 31 - st(u), C = 1 << p, L = s[p];
      L === -1 ? ((C & l) === 0 || (C & a) !== 0) && (s[p] = wn(C, t)) : L <= t && (e.expiredLanes |= C), u &= ~C;
    }
    if (t = Ut, l = gt, l = Ke(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, l === 0 || e === t && (Dt === 2 || Dt === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && tt(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Qt(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (a !== null && tt(a), Dl(l)) {
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
      return a = Rb.bind(null, e), l = Je(l, a), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return a !== null && a !== null && tt(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Rb(e, t) {
    if (En !== 0 && En !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (hc() && e.callbackNode !== l)
      return null;
    var a = gt;
    return a = Ke(
      e,
      e === Ut ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (ab(e, a, t), Cb(e, Q()), e.callbackNode != null && e.callbackNode === l ? Rb.bind(null, e) : null);
  }
  function _b(e, t) {
    if (hc()) return null;
    ab(e, t, !0);
  }
  function CE() {
    jE(function() {
      (kt & 6) !== 0 ? Je(
        He,
        EE
      ) : Eb();
    });
  }
  function rd() {
    if (pa === 0) {
      var e = jr;
      e === 0 && (e = Ft, Ft <<= 1, (Ft & 261888) === 0 && (Ft = 256)), pa = e;
    }
    return pa;
  }
  function wb(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : to("" + e);
  }
  function Ab(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function RE(e, t, l, a, s) {
    if (t === "submit" && l && l.stateNode === s) {
      var u = wb(
        (s[Rt] || null).action
      ), p = a.submitter;
      p && (t = (t = p[Rt] || null) ? wb(t.formAction) : p.getAttribute("formAction"), t !== null && (u = t, p = null));
      var C = new Sn(
        "action",
        "action",
        null,
        a,
        s
      );
      e.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (pa !== 0) {
                  var L = p ? Ab(s, p) : new FormData(s);
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
                typeof u == "function" && (C.preventDefault(), L = p ? Ab(s, p) : new FormData(s), wf(
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
  for (var id = 0; id < Gu.length; id++) {
    var sd = Gu[id], _E = sd.toLowerCase(), wE = sd[0].toUpperCase() + sd.slice(1);
    no(
      _E,
      "on" + wE
    );
  }
  no(op, "onAnimationEnd"), no(ap, "onAnimationIteration"), no(rp, "onAnimationStart"), no("dblclick", "onDoubleClick"), no("focusin", "onFocus"), no("focusout", "onBlur"), no(GS, "onTransitionRun"), no(YS, "onTransitionStart"), no(qS, "onTransitionCancel"), no(ip, "onTransitionEnd"), yl("onMouseEnter", ["mouseout", "mouseover"]), yl("onMouseLeave", ["mouseout", "mouseover"]), yl("onPointerEnter", ["pointerout", "pointerover"]), yl("onPointerLeave", ["pointerout", "pointerover"]), Jl(
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
  var Ki = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), AE = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ki)
  );
  function Mb(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l], s = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var p = a.length - 1; 0 <= p; p--) {
            var C = a[p], L = C.instance, J = C.currentTarget;
            if (C = C.listener, L !== u && s.isPropagationStopped())
              break e;
            u = C, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Os(ue);
            }
            s.currentTarget = null, u = L;
          }
        else
          for (p = 0; p < a.length; p++) {
            if (C = a[p], L = C.instance, J = C.currentTarget, C = C.listener, L !== u && s.isPropagationStopped())
              break e;
            u = C, s.currentTarget = J;
            try {
              u(s);
            } catch (ue) {
              Os(ue);
            }
            s.currentTarget = null, u = L;
          }
      }
    }
  }
  function mt(e, t) {
    var l = t[Gn];
    l === void 0 && (l = t[Gn] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    l.has(a) || (Tb(t, e, 2, !1), l.add(a));
  }
  function cd(e, t, l) {
    var a = 0;
    t && (a |= 4), Tb(
      l,
      e,
      a,
      t
    );
  }
  var gc = "_reactListening" + Math.random().toString(36).slice(2);
  function ud(e) {
    if (!e[gc]) {
      e[gc] = !0, mn.forEach(function(l) {
        l !== "selectionchange" && (AE.has(l) || cd(l, !1, e), cd(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gc] || (t[gc] = !0, cd("selectionchange", !1, t));
    }
  }
  function Tb(e, t, l, a) {
    switch (oy(t)) {
      case 2:
        var s = tC;
        break;
      case 8:
        s = nC;
        break;
      default:
        s = _d;
    }
    l = s.bind(
      null,
      t,
      l,
      e
    ), s = void 0, !Se || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), a ? s !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, l, !0) : s !== void 0 ? e.addEventListener(t, l, {
      passive: s
    }) : e.addEventListener(t, l, !1);
  }
  function fd(e, t, l, a, s) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var p = a.tag;
        if (p === 3 || p === 4) {
          var C = a.stateNode.containerInfo;
          if (C === s) break;
          if (p === 4)
            for (p = a.return; p !== null; ) {
              var L = p.tag;
              if ((L === 3 || L === 4) && p.stateNode.containerInfo === s)
                return;
              p = p.return;
            }
          for (; C !== null; ) {
            if (p = Yn(C), p === null) return;
            if (L = p.tag, L === 5 || L === 6 || L === 26 || L === 27) {
              a = u = p;
              continue e;
            }
            C = C.parentNode;
          }
        }
        a = a.return;
      }
    ge(function() {
      var J = u, ue = k(l), me = [];
      e: {
        var W = sp.get(e);
        if (W !== void 0) {
          var ae = Sn, Ve = e;
          switch (e) {
            case "keypress":
              if (Ht(l) === 0) break e;
            case "keydown":
            case "keyup":
              ae = xS;
              break;
            case "focusin":
              Ve = "focus", ae = zu;
              break;
            case "focusout":
              Ve = "blur", ae = zu;
              break;
            case "beforeblur":
            case "afterblur":
              ae = zu;
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
              ae = yi;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ae = sS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ae = CS;
              break;
            case op:
            case ap:
            case rp:
              ae = fS;
              break;
            case ip:
              ae = _S;
              break;
            case "scroll":
            case "scrollend":
              ae = uo;
              break;
            case "wheel":
              ae = AS;
              break;
            case "copy":
            case "cut":
            case "paste":
              ae = hS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ae = Hm;
              break;
            case "toggle":
            case "beforetoggle":
              ae = TS;
          }
          var $e = (t & 4) !== 0, It = !$e && (e === "scroll" || e === "scrollend"), X = $e ? W !== null ? W + "Capture" : null : W;
          $e = [];
          for (var B = J, $; B !== null; ) {
            var de = B;
            if ($ = de.stateNode, de = de.tag, de !== 5 && de !== 26 && de !== 27 || $ === null || X === null || (de = Y(B, X), de != null && $e.push(
              Fi(B, de, $)
            )), It) break;
            B = B.return;
          }
          0 < $e.length && (W = new ae(
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
          if (W = e === "mouseover" || e === "pointerover", ae = e === "mouseout" || e === "pointerout", W && l !== _ && (Ve = l.relatedTarget || l.fromElement) && (Yn(Ve) || Ve[Ye]))
            break e;
          if ((ae || W) && (W = ue.window === ue ? ue : (W = ue.ownerDocument) ? W.defaultView || W.parentWindow : window, ae ? (Ve = l.relatedTarget || l.toElement, ae = J, Ve = Ve ? Yn(Ve) : null, Ve !== null && (It = f(Ve), $e = Ve.tag, Ve !== It || $e !== 5 && $e !== 27 && $e !== 6) && (Ve = null)) : (ae = null, Ve = J), ae !== Ve)) {
            if ($e = yi, de = "onMouseLeave", X = "onMouseEnter", B = "mouse", (e === "pointerout" || e === "pointerover") && ($e = Hm, de = "onPointerLeave", X = "onPointerEnter", B = "pointer"), It = ae == null ? W : ol(ae), $ = Ve == null ? W : ol(Ve), W = new $e(
              de,
              B + "leave",
              ae,
              l,
              ue
            ), W.target = It, W.relatedTarget = $, de = null, Yn(ue) === J && ($e = new $e(
              X,
              B + "enter",
              Ve,
              l,
              ue
            ), $e.target = $, $e.relatedTarget = It, de = $e), It = de, ae && Ve)
              t: {
                for ($e = ME, X = ae, B = Ve, $ = 0, de = X; de; de = $e(de))
                  $++;
                de = 0;
                for (var Pe = B; Pe; Pe = $e(Pe))
                  de++;
                for (; 0 < $ - de; )
                  X = $e(X), $--;
                for (; 0 < de - $; )
                  B = $e(B), de--;
                for (; $--; ) {
                  if (X === B || B !== null && X === B.alternate) {
                    $e = X;
                    break t;
                  }
                  X = $e(X), B = $e(B);
                }
                $e = null;
              }
            else $e = null;
            ae !== null && Ob(
              me,
              W,
              ae,
              $e,
              !1
            ), Ve !== null && It !== null && Ob(
              me,
              It,
              Ve,
              $e,
              !0
            );
          }
        }
        e: {
          if (W = J ? ol(J) : window, ae = W.nodeName && W.nodeName.toLowerCase(), ae === "select" || ae === "input" && W.type === "file")
            var wt = Km;
          else if (Pm(W))
            if (Fm)
              wt = HS;
            else {
              wt = VS;
              var Be = LS;
            }
          else
            ae = W.nodeName, !ae || ae.toLowerCase() !== "input" || W.type !== "checkbox" && W.type !== "radio" ? J && sl(J.elementType) && (wt = Km) : wt = IS;
          if (wt && (wt = wt(e, J))) {
            Xm(
              me,
              wt,
              l,
              ue
            );
            break e;
          }
          Be && Be(e, W, J), e === "focusout" && J && W.type === "number" && J.memoizedProps.value != null && Jo(W, "number", W.value);
        }
        switch (Be = J ? ol(J) : window, e) {
          case "focusin":
            (Pm(Be) || Be.contentEditable === "true") && (Ar = Be, Hu = J, Ci = null);
            break;
          case "focusout":
            Ci = Hu = Ar = null;
            break;
          case "mousedown":
            Uu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uu = !1, np(me, l, ue);
            break;
          case "selectionchange":
            if (BS) break;
          case "keydown":
          case "keyup":
            np(me, l, ue);
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
          wr ? Ym(e, l) && (bt = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (bt = "onCompositionStart");
        bt && (Um && l.locale !== "ko" && (wr || bt !== "onCompositionStart" ? bt === "onCompositionEnd" && wr && (ct = _t()) : (Ie = ue, ke = "value" in Ie ? Ie.value : Ie.textContent, wr = !0)), Be = bc(J, bt), 0 < Be.length && (bt = new Im(
          bt,
          e,
          null,
          l,
          ue
        ), me.push({ event: bt, listeners: Be }), ct ? bt.data = ct : (ct = qm(l), ct !== null && (bt.data = ct)))), (ct = kS ? NS(e, l) : zS(e, l)) && (bt = bc(J, "onBeforeInput"), 0 < bt.length && (Be = new Im(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          ue
        ), me.push({
          event: Be,
          listeners: bt
        }), Be.data = ct)), RE(
          me,
          e,
          J,
          l,
          ue
        );
      }
      Mb(me, t);
    });
  }
  function Fi(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function bc(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var s = e, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Y(e, l), s != null && a.unshift(
        Fi(e, s, u)
      ), s = Y(e, t), s != null && a.push(
        Fi(e, s, u)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function ME(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ob(e, t, l, a, s) {
    for (var u = t._reactName, p = []; l !== null && l !== a; ) {
      var C = l, L = C.alternate, J = C.stateNode;
      if (C = C.tag, L !== null && L === a) break;
      C !== 5 && C !== 26 && C !== 27 || J === null || (L = J, s ? (J = Y(l, u), J != null && p.unshift(
        Fi(l, J, L)
      )) : s || (J = Y(l, u), J != null && p.push(
        Fi(l, J, L)
      ))), l = l.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var TE = /\r\n?/g, OE = /\u0000|\uFFFD/g;
  function kb(e) {
    return (typeof e == "string" ? e : "" + e).replace(TE, `
`).replace(OE, "");
  }
  function Nb(e, t) {
    return t = kb(t), kb(e) === t;
  }
  function Vt(e, t, l, a, s, u) {
    switch (l) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Ll(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Ll(e, "" + a);
        break;
      case "className":
        $o(e, "class", a);
        break;
      case "tabIndex":
        $o(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        $o(e, l, a);
        break;
      case "style":
        cn(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          $o(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = to("" + a), e.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
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
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        a = to("" + a), e.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (e.onclick = $n);
        break;
      case "onScroll":
        a != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        a != null && mt("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(i(61));
          if (l = a.__html, l != null) {
            if (s.children != null) throw Error(i(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
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
          e.removeAttribute("xlink:href");
          break;
        }
        l = to("" + a), e.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
        break;
      case "popover":
        mt("beforetoggle", e), mt("toggle", e), Wl(e, "popover", a);
        break;
      case "xlinkActuate":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        rl(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        rl(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Wl(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = eo.get(l) || l, Wl(e, l, a));
    }
  }
  function dd(e, t, l, a, s, u) {
    switch (l) {
      case "style":
        cn(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(i(61));
          if (l = a.__html, l != null) {
            if (s.children != null) throw Error(i(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Ll(e, a) : (typeof a == "number" || typeof a == "bigint") && Ll(e, "" + a);
        break;
      case "onScroll":
        a != null && mt("scroll", e);
        break;
      case "onScrollEnd":
        a != null && mt("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = $n);
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
            if (l[0] === "o" && l[1] === "n" && (s = l.endsWith("Capture"), t = l.slice(2, s ? l.length - 7 : void 0), u = e[Rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, s), typeof a == "function")) {
              typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, s);
              break e;
            }
            l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : Wl(e, l, a);
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
        var a = !1, s = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var p = l[u];
            if (p != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, t));
                default:
                  Vt(e, t, u, p, l, null);
              }
          }
        s && Vt(e, t, "srcSet", l.srcSet, l, null), a && Vt(e, t, "src", l.src, l, null);
        return;
      case "input":
        mt("invalid", e);
        var C = u = p = s = null, L = null, J = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var ue = l[a];
            if (ue != null)
              switch (a) {
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
                  C = ue;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (ue != null)
                    throw Error(i(137, t));
                  break;
                default:
                  Vt(e, t, a, ue, l, null);
              }
          }
        _r(
          e,
          u,
          C,
          L,
          J,
          p,
          s,
          !1
        );
        return;
      case "select":
        mt("invalid", e), a = p = u = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (C = l[s], C != null))
            switch (s) {
              case "value":
                u = C;
                break;
              case "defaultValue":
                p = C;
                break;
              case "multiple":
                a = C;
              default:
                Vt(e, t, s, C, l, null);
            }
        t = u, l = p, e.multiple = !!a, t != null ? vl(e, !!a, t, !1) : l != null && vl(e, !!a, l, !0);
        return;
      case "textarea":
        mt("invalid", e), u = s = a = null;
        for (p in l)
          if (l.hasOwnProperty(p) && (C = l[p], C != null))
            switch (p) {
              case "value":
                a = C;
                break;
              case "defaultValue":
                s = C;
                break;
              case "children":
                u = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(i(91));
                break;
              default:
                Vt(e, t, p, C, l, null);
            }
        _o(e, a, s, u);
        return;
      case "option":
        for (L in l)
          l.hasOwnProperty(L) && (a = l[L], a != null) && (L === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : Vt(e, t, L, a, l, null));
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
        for (a = 0; a < Ki.length; a++)
          mt(Ki[a], e);
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
          if (l.hasOwnProperty(J) && (a = l[J], a != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, t));
              default:
                Vt(e, t, J, a, l, null);
            }
        return;
      default:
        if (sl(t)) {
          for (ue in l)
            l.hasOwnProperty(ue) && (a = l[ue], a !== void 0 && dd(
              e,
              t,
              ue,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (C in l)
      l.hasOwnProperty(C) && (a = l[C], a != null && Vt(e, t, C, a, l, null));
  }
  function kE(e, t, l, a) {
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
        var s = null, u = null, p = null, C = null, L = null, J = null, ue = null;
        for (ae in l) {
          var me = l[ae];
          if (l.hasOwnProperty(ae) && me != null)
            switch (ae) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                L = me;
              default:
                a.hasOwnProperty(ae) || Vt(e, t, ae, null, a, me);
            }
        }
        for (var W in a) {
          var ae = a[W];
          if (me = l[W], a.hasOwnProperty(W) && (ae != null || me != null))
            switch (W) {
              case "type":
                u = ae;
                break;
              case "name":
                s = ae;
                break;
              case "checked":
                J = ae;
                break;
              case "defaultChecked":
                ue = ae;
                break;
              case "value":
                p = ae;
                break;
              case "defaultValue":
                C = ae;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ae != null)
                  throw Error(i(137, t));
                break;
              default:
                ae !== me && Vt(
                  e,
                  t,
                  W,
                  ae,
                  a,
                  me
                );
            }
        }
        qa(
          e,
          p,
          C,
          L,
          J,
          ue,
          u,
          s
        );
        return;
      case "select":
        ae = p = C = W = null;
        for (u in l)
          if (L = l[u], l.hasOwnProperty(u) && L != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                ae = L;
              default:
                a.hasOwnProperty(u) || Vt(
                  e,
                  t,
                  u,
                  null,
                  a,
                  L
                );
            }
        for (s in a)
          if (u = a[s], L = l[s], a.hasOwnProperty(s) && (u != null || L != null))
            switch (s) {
              case "value":
                W = u;
                break;
              case "defaultValue":
                C = u;
                break;
              case "multiple":
                p = u;
              default:
                u !== L && Vt(
                  e,
                  t,
                  s,
                  u,
                  a,
                  L
                );
            }
        t = C, l = p, a = ae, W != null ? vl(e, !!l, W, !1) : !!a != !!l && (t != null ? vl(e, !!l, t, !0) : vl(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        ae = W = null;
        for (C in l)
          if (s = l[C], l.hasOwnProperty(C) && s != null && !a.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Vt(e, t, C, null, a, s);
            }
        for (p in a)
          if (s = a[p], u = l[p], a.hasOwnProperty(p) && (s != null || u != null))
            switch (p) {
              case "value":
                W = s;
                break;
              case "defaultValue":
                ae = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(i(91));
                break;
              default:
                s !== u && Vt(e, t, p, s, a, u);
            }
        Pa(e, W, ae);
        return;
      case "option":
        for (var Ve in l)
          W = l[Ve], l.hasOwnProperty(Ve) && W != null && !a.hasOwnProperty(Ve) && (Ve === "selected" ? e.selected = !1 : Vt(
            e,
            t,
            Ve,
            null,
            a,
            W
          ));
        for (L in a)
          W = a[L], ae = l[L], a.hasOwnProperty(L) && W !== ae && (W != null || ae != null) && (L === "selected" ? e.selected = W && typeof W != "function" && typeof W != "symbol" : Vt(
            e,
            t,
            L,
            W,
            a,
            ae
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
          W = l[$e], l.hasOwnProperty($e) && W != null && !a.hasOwnProperty($e) && Vt(e, t, $e, null, a, W);
        for (J in a)
          if (W = a[J], ae = l[J], a.hasOwnProperty(J) && W !== ae && (W != null || ae != null))
            switch (J) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(i(137, t));
                break;
              default:
                Vt(
                  e,
                  t,
                  J,
                  W,
                  a,
                  ae
                );
            }
        return;
      default:
        if (sl(t)) {
          for (var It in l)
            W = l[It], l.hasOwnProperty(It) && W !== void 0 && !a.hasOwnProperty(It) && dd(
              e,
              t,
              It,
              void 0,
              a,
              W
            );
          for (ue in a)
            W = a[ue], ae = l[ue], !a.hasOwnProperty(ue) || W === ae || W === void 0 && ae === void 0 || dd(
              e,
              t,
              ue,
              W,
              a,
              ae
            );
          return;
        }
    }
    for (var X in l)
      W = l[X], l.hasOwnProperty(X) && W != null && !a.hasOwnProperty(X) && Vt(e, t, X, null, a, W);
    for (me in a)
      W = a[me], ae = l[me], !a.hasOwnProperty(me) || W === ae || W == null && ae == null || Vt(e, t, me, W, a, ae);
  }
  function zb(e) {
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
  function NE() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var s = l[a], u = s.transferSize, p = s.initiatorType, C = s.duration;
        if (u && C && zb(p)) {
          for (p = 0, C = s.responseEnd, a += 1; a < l.length; a++) {
            var L = l[a], J = L.startTime;
            if (J > C) break;
            var ue = L.transferSize, me = L.initiatorType;
            ue && zb(me) && (L = L.responseEnd, p += ue * (L < C ? 1 : (C - J) / (L - J)));
          }
          if (--a, t += 8 * (u + p) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var hd = null, md = null;
  function yc(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Db(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function jb(e, t) {
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
  function zE() {
    var e = window.event;
    return e && e.type === "popstate" ? e === gd ? !1 : (gd = e, !0) : (gd = null, !1);
  }
  var Lb = typeof setTimeout == "function" ? setTimeout : void 0, DE = typeof clearTimeout == "function" ? clearTimeout : void 0, Vb = typeof Promise == "function" ? Promise : void 0, jE = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vb < "u" ? function(e) {
    return Vb.resolve(null).then(e).catch(LE);
  } : Lb;
  function LE(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ga(e) {
    return e === "head";
  }
  function Ib(e, t) {
    var l = t, a = 0;
    do {
      var s = l.nextSibling;
      if (e.removeChild(l), s && s.nodeType === 8)
        if (l = s.data, l === "/$" || l === "/&") {
          if (a === 0) {
            e.removeChild(s), ei(t);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Qi(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Qi(l);
          for (var u = l.firstChild; u; ) {
            var p = u.nextSibling, C = u.nodeName;
            u[$l] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = p;
          }
        } else
          l === "body" && Qi(e.ownerDocument.body);
      l = s;
    } while (l);
    ei(t);
  }
  function Hb(e, t) {
    var l = e;
    e = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = a;
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
          bd(l), co(l);
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
  function VE(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var s = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
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
  function IE(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ub(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Yl(e.nextSibling), e === null)) return null;
    return e;
  }
  function yd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function vd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function HE(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
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
  var xd = null;
  function Bb(e) {
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
  function Gb(e) {
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
  function Yb(e, t, l) {
    switch (t = yc(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(i(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(i(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(i(454));
        return e;
      default:
        throw Error(i(451));
    }
  }
  function Qi(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    co(e);
  }
  var ql = /* @__PURE__ */ new Map(), qb = /* @__PURE__ */ new Set();
  function vc(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Bo = H.d;
  H.d = {
    f: UE,
    r: BE,
    D: GE,
    C: YE,
    L: qE,
    m: PE,
    X: KE,
    S: XE,
    M: FE
  };
  function UE() {
    var e = Bo.f(), t = uc();
    return e || t;
  }
  function BE(e) {
    var t = jl(e);
    t !== null && t.tag === 5 && t.type === "form" ? ig(t) : Bo.r(e);
  }
  var $r = typeof document > "u" ? null : document;
  function Pb(e, t, l) {
    var a = $r;
    if (a && typeof t == "string" && t) {
      var s = Tn(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof l == "string" && (s += '[crossorigin="' + l + '"]'), qb.has(s) || (qb.add(s), e = { rel: e, crossOrigin: l, href: t }, a.querySelector(s) === null && (t = a.createElement("link"), Hn(t, "link", e), en(t), a.head.appendChild(t)));
    }
  }
  function GE(e) {
    Bo.D(e), Pb("dns-prefetch", e, null);
  }
  function YE(e, t) {
    Bo.C(e, t), Pb("preconnect", e, t);
  }
  function qE(e, t, l) {
    Bo.L(e, t, l);
    var a = $r;
    if (a && e && t) {
      var s = 'link[rel="preload"][as="' + Tn(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (s += '[imagesrcset="' + Tn(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (s += '[imagesizes="' + Tn(
        l.imageSizes
      ) + '"]')) : s += '[href="' + Tn(e) + '"]';
      var u = s;
      switch (t) {
        case "style":
          u = Jr(e);
          break;
        case "script":
          u = Wr(e);
      }
      ql.has(u) || (e = x(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), ql.set(u, e), a.querySelector(s) !== null || t === "style" && a.querySelector(Zi(u)) || t === "script" && a.querySelector($i(u)) || (t = a.createElement("link"), Hn(t, "link", e), en(t), a.head.appendChild(t)));
    }
  }
  function PE(e, t) {
    Bo.m(e, t);
    var l = $r;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Tn(a) + '"][href="' + Tn(e) + '"]', u = s;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Wr(e);
      }
      if (!ql.has(u) && (e = x({ rel: "modulepreload", href: e }, t), ql.set(u, e), l.querySelector(s) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector($i(u)))
              return;
        }
        a = l.createElement("link"), Hn(a, "link", e), en(a), l.head.appendChild(a);
      }
    }
  }
  function XE(e, t, l) {
    Bo.S(e, t, l);
    var a = $r;
    if (a && e) {
      var s = al(a).hoistableStyles, u = Jr(e);
      t = t || "default";
      var p = s.get(u);
      if (!p) {
        var C = { loading: 0, preload: null };
        if (p = a.querySelector(
          Zi(u)
        ))
          C.loading = 5;
        else {
          e = x(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = ql.get(u)) && Sd(e, l);
          var L = p = a.createElement("link");
          en(L), Hn(L, "link", e), L._p = new Promise(function(J, ue) {
            L.onload = J, L.onerror = ue;
          }), L.addEventListener("load", function() {
            C.loading |= 1;
          }), L.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, xc(p, t, a);
        }
        p = {
          type: "stylesheet",
          instance: p,
          count: 1,
          state: C
        }, s.set(u, p);
      }
    }
  }
  function KE(e, t) {
    Bo.X(e, t);
    var l = $r;
    if (l && e) {
      var a = al(l).hoistableScripts, s = Wr(e), u = a.get(s);
      u || (u = l.querySelector($i(s)), u || (e = x({ src: e, async: !0 }, t), (t = ql.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function FE(e, t) {
    Bo.M(e, t);
    var l = $r;
    if (l && e) {
      var a = al(l).hoistableScripts, s = Wr(e), u = a.get(s);
      u || (u = l.querySelector($i(s)), u || (e = x({ src: e, async: !0, type: "module" }, t), (t = ql.get(s)) && Ed(e, t), u = l.createElement("script"), en(u), Hn(u, "link", e), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(s, u));
    }
  }
  function Xb(e, t, l, a) {
    var s = (s = _e.current) ? vc(s) : null;
    if (!s) throw Error(i(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Jr(l.href), l = al(
          s
        ).hoistableStyles, a = l.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Jr(l.href);
          var u = al(
            s
          ).hoistableStyles, p = u.get(e);
          if (p || (s = s.ownerDocument || s, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, p), (u = s.querySelector(
            Zi(e)
          )) && !u._p && (p.instance = u, p.state.loading = 5), ql.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, ql.set(e, l), u || QE(
            s,
            e,
            l,
            p.state
          ))), t && a === null)
            throw Error(i(528, ""));
          return p;
        }
        if (t && a !== null)
          throw Error(i(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Wr(l), l = al(
          s
        ).hoistableScripts, a = l.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(i(444, e));
    }
  }
  function Jr(e) {
    return 'href="' + Tn(e) + '"';
  }
  function Zi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Kb(e) {
    return x({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function QE(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), Hn(t, "link", l), en(t), e.head.appendChild(t));
  }
  function Wr(e) {
    return '[src="' + Tn(e) + '"]';
  }
  function $i(e) {
    return "script[async]" + e;
  }
  function Fb(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Tn(l.href) + '"]'
          );
          if (a)
            return t.instance = a, en(a), a;
          var s = x({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), en(a), Hn(a, "style", s), xc(a, l.precedence, e), t.instance = a;
        case "stylesheet":
          s = Jr(l.href);
          var u = e.querySelector(
            Zi(s)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, en(u), u;
          a = Kb(l), (s = ql.get(s)) && Sd(a, s), u = (e.ownerDocument || e).createElement("link"), en(u);
          var p = u;
          return p._p = new Promise(function(C, L) {
            p.onload = C, p.onerror = L;
          }), Hn(u, "link", a), t.state.loading |= 4, xc(u, l.precedence, e), t.instance = u;
        case "script":
          return u = Wr(l.src), (s = e.querySelector(
            $i(u)
          )) ? (t.instance = s, en(s), s) : (a = l, (s = ql.get(u)) && (a = x({}, l), Ed(a, s)), e = e.ownerDocument || e, s = e.createElement("script"), en(s), Hn(s, "link", a), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(i(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, xc(a, l.precedence, e));
    return t.instance;
  }
  function xc(e, t, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = a.length ? a[a.length - 1] : null, u = s, p = 0; p < a.length; p++) {
      var C = a[p];
      if (C.dataset.precedence === t) u = C;
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
  var Sc = null;
  function Qb(e, t, l) {
    if (Sc === null) {
      var a = /* @__PURE__ */ new Map(), s = Sc = /* @__PURE__ */ new Map();
      s.set(l, a);
    } else
      s = Sc, a = s.get(l), a || (a = /* @__PURE__ */ new Map(), s.set(l, a));
    if (a.has(e)) return a;
    for (a.set(e, null), l = l.getElementsByTagName(e), s = 0; s < l.length; s++) {
      var u = l[s];
      if (!(u[$l] || u[Ct] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = u.getAttribute(t) || "";
        p = e + p;
        var C = a.get(p);
        C ? C.push(u) : a.set(p, [u]);
      }
    }
    return a;
  }
  function Zb(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function ZE(e, t, l) {
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
  function $b(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function $E(e, t, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var s = Jr(a.href), u = t.querySelector(
          Zi(s)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ec.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, en(u);
          return;
        }
        u = t.ownerDocument || t, a = Kb(a), (s = ql.get(s)) && Sd(a, s), u = u.createElement("link"), en(u);
        var p = u;
        p._p = new Promise(function(C, L) {
          p.onload = C, p.onerror = L;
        }), Hn(u, "link", a), l.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = Ec.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Cd = 0;
  function JE(e, t) {
    return e.stylesheets && e.count === 0 && Rc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (e.stylesheets && Rc(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Cd === 0 && (Cd = 62500 * NE());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Rc(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Cd ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(s);
      };
    } : null;
  }
  function Ec() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Rc(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Cc = null;
  function Rc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Cc = /* @__PURE__ */ new Map(), t.forEach(WE, e), Cc = null, Ec.call(e));
  }
  function WE(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Cc.get(e);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Cc.set(e, l);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var p = s[u];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (l.set(p.dataset.precedence, p), a = p);
        }
        a && l.set(null, a);
      }
      s = t.instance, p = s.getAttribute("data-precedence"), u = l.get(p) || a, u === a && l.set(null, s), l.set(p, s), this.count++, a = Ec.bind(this), s.addEventListener("load", a), s.addEventListener("error", a), u ? u.parentNode.insertBefore(s, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Ji = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function eC(e, t, l, a, s, u, p, C, L) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yt(0), this.hiddenUpdates = Yt(null), this.identifierPrefix = a, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = L, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Jb(e, t, l, a, s, u, p, C, L, J, ue, me) {
    return e = new eC(
      e,
      t,
      l,
      p,
      L,
      J,
      ue,
      me,
      C
    ), t = 1, u === !0 && (t |= 24), u = El(3, null, null, t), e.current = u, u.stateNode = e, t = tf(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: t
    }, af(u), e;
  }
  function Wb(e) {
    return e ? (e = Or, e) : Or;
  }
  function ey(e, t, l, a, s, u) {
    s = Wb(s), a.context === null ? a.context = s : a.pendingContext = s, a = aa(t), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ra(e, a, t), l !== null && (hl(l, e, t), Oi(l, e, t));
  }
  function ty(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Rd(e, t) {
    ty(e, t), (e = e.alternate) && ty(e, t);
  }
  function ny(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Qa(e, 67108864);
      t !== null && hl(t, e, 67108864), Rd(e, 67108864);
    }
  }
  function ly(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Al();
      t = so(t);
      var l = Qa(e, t);
      l !== null && hl(l, e, t), Rd(e, t);
    }
  }
  var _c = !0;
  function tC(e, t, l, a) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 2, _d(e, t, l, a);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function nC(e, t, l, a) {
    var s = V.T;
    V.T = null;
    var u = H.p;
    try {
      H.p = 8, _d(e, t, l, a);
    } finally {
      H.p = u, V.T = s;
    }
  }
  function _d(e, t, l, a) {
    if (_c) {
      var s = wd(a);
      if (s === null)
        fd(
          e,
          t,
          a,
          wc,
          l
        ), ay(e, a);
      else if (oC(
        s,
        e,
        t,
        l,
        a
      ))
        a.stopPropagation();
      else if (ay(e, a), t & 4 && -1 < lC.indexOf(e)) {
        for (; s !== null; ) {
          var u = jl(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var p = ut(u.pendingLanes);
                  if (p !== 0) {
                    var C = u;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; p; ) {
                      var L = 1 << 31 - st(p);
                      C.entanglements[1] |= L, p &= ~L;
                    }
                    go(u), (kt & 6) === 0 && (sc = Q() + 500, Xi(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Qa(u, 2), C !== null && hl(C, u, 2), uc(), Rd(u, 2);
            }
          if (u = wd(a), u === null && fd(
            e,
            t,
            a,
            wc,
            l
          ), u === s) break;
          s = u;
        }
        s !== null && a.stopPropagation();
      } else
        fd(
          e,
          t,
          a,
          null,
          l
        );
    }
  }
  function wd(e) {
    return e = k(e), Ad(e);
  }
  var wc = null;
  function Ad(e) {
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
  function oy(e) {
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
  var Md = !1, ba = null, ya = null, va = null, Wi = /* @__PURE__ */ new Map(), es = /* @__PURE__ */ new Map(), xa = [], lC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function ay(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ba = null;
        break;
      case "dragenter":
      case "dragleave":
        ya = null;
        break;
      case "mouseover":
      case "mouseout":
        va = null;
        break;
      case "pointerover":
      case "pointerout":
        Wi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        es.delete(t.pointerId);
    }
  }
  function ts(e, t, l, a, s, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [s]
    }, t !== null && (t = jl(t), t !== null && ny(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function oC(e, t, l, a, s) {
    switch (t) {
      case "focusin":
        return ba = ts(
          ba,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "dragenter":
        return ya = ts(
          ya,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "mouseover":
        return va = ts(
          va,
          e,
          t,
          l,
          a,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return Wi.set(
          u,
          ts(
            Wi.get(u) || null,
            e,
            t,
            l,
            a,
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
            a,
            s
          )
        ), !0;
    }
    return !1;
  }
  function ry(e) {
    var t = Yn(e.target);
    if (t !== null) {
      var l = f(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = d(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              ly(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Co(e.priority, function() {
              ly(l);
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
  function Ac(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = wd(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        _ = a, l.target.dispatchEvent(a), _ = null;
      } else
        return t = jl(l), t !== null && ny(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function iy(e, t, l) {
    Ac(e) && l.delete(t);
  }
  function aC() {
    Md = !1, ba !== null && Ac(ba) && (ba = null), ya !== null && Ac(ya) && (ya = null), va !== null && Ac(va) && (va = null), Wi.forEach(iy), es.forEach(iy);
  }
  function Mc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Md || (Md = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      aC
    )));
  }
  var Tc = null;
  function sy(e) {
    Tc !== e && (Tc = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Tc === e && (Tc = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], a = e[t + 1], s = e[t + 2];
          if (typeof a != "function") {
            if (Ad(a || l) === null)
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
              action: a
            },
            a,
            s
          ));
        }
      }
    ));
  }
  function ei(e) {
    function t(L) {
      return Mc(L, e);
    }
    ba !== null && Mc(ba, e), ya !== null && Mc(ya, e), va !== null && Mc(va, e), Wi.forEach(t), es.forEach(t);
    for (var l = 0; l < xa.length; l++) {
      var a = xa[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < xa.length && (l = xa[0], l.blockedOn === null); )
      ry(l), l.blockedOn === null && xa.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var s = l[a], u = l[a + 1], p = s[Rt] || null;
        if (typeof u == "function")
          p || sy(l);
        else if (p) {
          var C = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, p = u[Rt] || null)
              C = p.formAction;
            else if (Ad(s) !== null) continue;
          } else C = p.action;
          typeof C == "function" ? l[a + 1] = C : (l.splice(a, 3), a -= 3), sy(l);
        }
      }
  }
  function cy() {
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
      s !== null && (s(), s = null), a || setTimeout(l, 20);
    }
    function l() {
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
      var a = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function Td(e) {
    this._internalRoot = e;
  }
  Oc.prototype.render = Td.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(i(409));
    var l = t.current, a = Al();
    ey(l, a, e, t, null, null);
  }, Oc.prototype.unmount = Td.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      ey(e.current, 2, null, e, null, null), uc(), t[Ye] = null;
    }
  };
  function Oc(e) {
    this._internalRoot = e;
  }
  Oc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ll();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < xa.length && t !== 0 && t < xa[l].priority; l++) ;
      xa.splice(l, 0, e), l === 0 && ry(e);
    }
  };
  var uy = o.version;
  if (uy !== "19.2.8")
    throw Error(
      i(
        527,
        uy,
        "19.2.8"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
    return e = h(t), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var rC = {
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
        Nt = kc.inject(
          rC
        ), xt = kc;
      } catch {
      }
  }
  return ls.createRoot = function(e, t) {
    if (!c(e)) throw Error(i(299));
    var l = !1, a = "", s = bg, u = yg, p = vg;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = Jb(
      e,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      s,
      u,
      p,
      cy
    ), e[Ye] = t.current, ud(e), new Td(t);
  }, ls.hydrateRoot = function(e, t, l) {
    if (!c(e)) throw Error(i(299));
    var a = !1, s = "", u = bg, p = yg, C = vg, L = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (s = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (p = l.onCaughtError), l.onRecoverableError !== void 0 && (C = l.onRecoverableError), l.formState !== void 0 && (L = l.formState)), t = Jb(
      e,
      1,
      !0,
      t,
      l ?? null,
      a,
      s,
      L,
      u,
      p,
      C,
      cy
    ), t.context = Wb(null), l = t.current, a = Al(), a = so(a), s = aa(a), s.callback = null, ra(l, s, a), l = a, t.current.lanes = l, nl(t, l), go(t), e[Ye] = t.current, ud(e), new Oc(t);
  }, ls.version = "19.2.8", ls;
}
var Cy;
function bC() {
  if (Cy) return Nd.exports;
  Cy = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (o) {
        console.error(o);
      }
  }
  return n(), Nd.exports = gC(), Nd.exports;
}
var yC = bC(), b = vs();
const vC = /* @__PURE__ */ cC(b), xr = /* @__PURE__ */ sC({
  __proto__: null,
  default: vC
}, [b]);
function Kv(n) {
  var o, r, i = "";
  if (typeof n == "string" || typeof n == "number") i += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var c = n.length;
    for (o = 0; o < c; o++) n[o] && (r = Kv(n[o])) && (i && (i += " "), i += r);
  } else for (r in n) n[r] && (i && (i += " "), i += r);
  return i;
}
function Fv() {
  for (var n, o, r = 0, i = "", c = arguments.length; r < c; r++) (n = arguments[r]) && (o = Kv(n)) && (i && (i += " "), i += o);
  return i;
}
const Ry = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n, _y = Fv, di = (n, o) => (r) => {
  var i;
  if (o?.variants == null) return _y(n, r?.class, r?.className);
  const { variants: c, defaultVariants: f } = o, d = Object.keys(c).map((h) => {
    const y = r?.[h], x = f?.[h];
    if (y === null) return null;
    const v = Ry(y) || Ry(x);
    return c[h][v];
  }), m = r && Object.entries(r).reduce((h, y) => {
    let [x, v] = y;
    return v === void 0 || (h[x] = v), h;
  }, {}), g = o == null || (i = o.compoundVariants) === null || i === void 0 ? void 0 : i.reduce((h, y) => {
    let { class: x, className: v, ...E } = y;
    return Object.entries(E).every((A) => {
      let [T, O] = A;
      return Array.isArray(O) ? O.includes({
        ...f,
        ...m
      }[T]) : {
        ...f,
        ...m
      }[T] === O;
    }) ? [
      ...h,
      x,
      v
    ] : h;
  }, []);
  return _y(n, d, g, r?.class, r?.className);
};
var hi = Xv(), xC = Object.defineProperty, qh = (n, o) => xC(n, "name", { value: o, configurable: !0 });
function vh(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
qh(vh, "setRef");
function Qv(...n) {
  return (o) => {
    let r = !1;
    const i = n.map((c) => {
      const f = vh(c, o);
      return !r && typeof f == "function" && (r = !0), f;
    });
    if (r)
      return () => {
        for (let c = 0; c < i.length; c++) {
          const f = i[c];
          typeof f == "function" ? f() : vh(n[c], null);
        }
      };
  };
}
qh(Qv, "composeRefs");
function Kn(...n) {
  return b.useCallback(Qv(...n), n);
}
qh(Kn, "useComposedRefs");
var SC = Object.defineProperty, ro = (n, o) => SC(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function hr(n) {
  const o = b.forwardRef((r, i) => {
    let { children: c, ...f } = r, d = null, m = !1;
    const g = [];
    xh(c) && typeof Nc == "function" && (c = Nc(c._payload)), b.Children.forEach(c, (v) => {
      if (e0(v)) {
        m = !0;
        const E = v;
        let A = "child" in E.props ? E.props.child : E.props.children;
        xh(A) && typeof Nc == "function" && (A = Nc(A._payload)), d = CC(E, A), g.push(d?.props?.children);
      } else
        g.push(v);
    }), d ? d = b.cloneElement(d, void 0, g) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !m && b.Children.count(c) === 1 && b.isValidElement(c) && (d = c)
    );
    const h = d ? Wv(d) : void 0, y = Kn(i, h);
    if (!d) {
      if (c || c === 0)
        throw new Error(
          m ? wC(n) : _C(n)
        );
      return c;
    }
    const x = Jv(f, d.props ?? {});
    return d.type !== b.Fragment && (x.ref = i ? y : h), b.cloneElement(d, x);
  });
  return o.displayName = `${n}.Slot`, o;
}
ro(hr, "createSlot");
var Zv = /* @__PURE__ */ hr("Slot"), $v = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function EC(n) {
  const o = /* @__PURE__ */ ro((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return o.displayName = `${n}.Slottable`, o.__radixId = $v, o;
}
ro(EC, "createSlottable");
var CC = /* @__PURE__ */ ro((n, o) => {
  if ("child" in n.props) {
    const r = n.props.child;
    return b.isValidElement(r) ? b.cloneElement(r, void 0, n.props.children(r.props.children)) : null;
  }
  return b.isValidElement(o) ? o : null;
}, "getSlottableElementFromSlottable");
function Jv(n, o) {
  const r = { ...o };
  for (const i in o) {
    const c = n[i], f = o[i];
    /^on[A-Z]/.test(i) ? c && f ? r[i] = (...m) => {
      const g = f(...m);
      return c(...m), g;
    } : c && (r[i] = c) : i === "style" ? r[i] = { ...c, ...f } : i === "className" && (r[i] = [c, f].filter(Boolean).join(" "));
  }
  return { ...n, ...r };
}
ro(Jv, "mergeProps");
function Wv(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
ro(Wv, "getElementRef");
function e0(n) {
  return b.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === $v;
}
ro(e0, "isSlottable");
var RC = /* @__PURE__ */ Symbol.for("react.lazy");
function xh(n) {
  return n != null && typeof n == "object" && "$$typeof" in n && n.$$typeof === RC && "_payload" in n && t0(n._payload);
}
ro(xh, "isLazyComponent");
function t0(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
ro(t0, "isPromiseLike");
var _C = /* @__PURE__ */ ro((n) => `${n} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), wC = /* @__PURE__ */ ro((n) => `${n} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Nc = xr[" use ".trim().toString()], AC = Object.defineProperty, MC = (n, o) => AC(n, "name", { value: o, configurable: !0 }), TC = [
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
], Un = TC.reduce((n, o) => {
  const r = /* @__PURE__ */ hr(`Primitive.${o}`), i = b.forwardRef((c, f) => {
    const { asChild: d, ...m } = c, g = d ? r : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(g, { ...m, ref: f });
  });
  return i.displayName = `Primitive.${o}`, { ...n, [o]: i };
}, {});
function OC(n, o) {
  n && hi.flushSync(() => n.dispatchEvent(o));
}
MC(OC, "dispatchDiscreteCustomEvent");
var kC = Object.defineProperty, Kl = (n, o) => kC(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function NC(n, o) {
  const r = b.createContext(o);
  r.displayName = n + "Context";
  const i = /* @__PURE__ */ Kl((f) => {
    const { children: d, ...m } = f, g = b.useMemo(() => m, Object.values(m));
    return /* @__PURE__ */ S.jsx(r.Provider, { value: g, children: d });
  }, "Provider");
  i.displayName = n + "Provider";
  function c(f, d = {}) {
    const { optional: m = !1 } = d, g = b.useContext(r);
    if (g) return g;
    if (o !== void 0) return o;
    if (!m)
      throw new Error(`\`${f}\` must be used within \`${n}\``);
  }
  return Kl(c, "useContext"), [i, c];
}
Kl(NC, "createContext");
// @__NO_SIDE_EFFECTS__
function Ia(n, o = []) {
  let r = [];
  function i(f, d) {
    const m = b.createContext(d);
    m.displayName = f + "Context";
    const g = r.length;
    r = [...r, d];
    const h = /* @__PURE__ */ Kl((x) => {
      const { scope: v, children: E, ...A } = x, T = v?.[n]?.[g] || m, O = b.useMemo(() => A, Object.values(A));
      return /* @__PURE__ */ S.jsx(T.Provider, { value: O, children: E });
    }, "Provider");
    h.displayName = f + "Provider";
    function y(x, v, E = {}) {
      const { optional: A = !1 } = E, T = v?.[n]?.[g] || m, O = b.useContext(T);
      if (O) return O;
      if (d !== void 0) return d;
      if (!A)
        throw new Error(`\`${x}\` must be used within \`${f}\``);
    }
    return Kl(y, "useContext"), [h, y];
  }
  Kl(i, "createContext");
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
  return c.scopeName = n, [i, n0(c, ...o)];
}
Kl(Ia, "createContextScope");
function n0(...n) {
  const o = n[0];
  if (n.length === 1) return o;
  const r = /* @__PURE__ */ Kl(() => {
    const i = n.map((c) => ({
      useScope: c(),
      scopeName: c.scopeName
    }));
    return /* @__PURE__ */ Kl(function(f) {
      const d = i.reduce((m, { useScope: g, scopeName: h }) => {
        const x = g(f)[`__scope${h}`];
        return { ...m, ...x };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: d }), [d]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = o.scopeName, r;
}
Kl(n0, "composeContextScopes");
var zC = Object.defineProperty, Nn = (n, o) => zC(n, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function su(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Ia(o), [c, f] = r(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), d = /* @__PURE__ */ Nn((T) => {
    const { scope: O, children: w } = T, M = b.useRef(null), R = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(c, { scope: O, itemMap: R, collectionRef: M, children: w });
  }, "CollectionProvider");
  d.displayName = o;
  const m = n + "CollectionSlot", g = /* @__PURE__ */ hr(m), h = b.forwardRef(
    (T, O) => {
      const { scope: w, children: M } = T, R = f(m, w), N = Kn(O, R.collectionRef);
      return /* @__PURE__ */ S.jsx(g, { ref: N, children: M });
    }
  );
  h.displayName = m;
  const y = n + "CollectionItemSlot", x = "data-radix-collection-item", v = /* @__PURE__ */ hr(y), E = b.forwardRef(
    (T, O) => {
      const { scope: w, children: M, ...R } = T, N = b.useRef(null), I = Kn(O, N), q = f(y, w);
      return b.useEffect(() => (q.itemMap.set(N, { ref: N, ...R }), () => {
        q.itemMap.delete(N);
      })), /* @__PURE__ */ S.jsx(v, { [x]: "", ref: I, children: M });
    }
  );
  E.displayName = y;
  function A(T) {
    const O = f(n + "CollectionConsumer", T);
    return b.useCallback(() => {
      const M = O.collectionRef.current;
      if (!M) return [];
      const R = Array.from(M.querySelectorAll(`[${x}]`));
      return Array.from(O.itemMap.values()).sort(
        (q, G) => R.indexOf(q.ref.current) - R.indexOf(G.ref.current)
      );
    }, [O.collectionRef, O.itemMap]);
  }
  return Nn(A, "useCollection"), [
    { Provider: d, Slot: h, ItemSlot: E },
    A,
    i
  ];
}
Nn(su, "createCollection");
var wy = /* @__PURE__ */ new WeakMap(), xn, Ml, Vd = (Ml = class extends Map {
  constructor(r) {
    super(r);
    hy(this, xn);
    Od(this, xn, [...super.keys()]), wy.set(this, !0);
  }
  set(r, i) {
    return wy.get(this) && (this.has(r) ? qn(this, xn)[qn(this, xn).indexOf(r)] = r : qn(this, xn).push(r)), super.set(r, i), this;
  }
  insert(r, i, c) {
    const f = this.has(i), d = qn(this, xn).length, m = Ph(r);
    let g = m >= 0 ? m : d + m;
    const h = g < 0 || g >= d ? -1 : g;
    if (h === this.size || f && h === this.size - 1 || h === -1)
      return this.set(i, c), this;
    const y = this.size + (f ? 0 : 1);
    m < 0 && g++;
    const x = [...qn(this, xn)];
    let v, E = !1;
    for (let A = g; A < y; A++)
      if (g === A) {
        let T = x[A];
        x[A] === i && (T = x[A + 1]), f && this.delete(i), v = this.get(T), this.set(i, c);
      } else {
        !E && x[A - 1] === i && (E = !0);
        const T = x[E ? A : A - 1], O = v;
        v = this.get(T), this.delete(T), this.set(T, O);
      }
    return this;
  }
  with(r, i, c) {
    const f = new Ml(this);
    return f.insert(r, i, c), f;
  }
  before(r) {
    const i = qn(this, xn).indexOf(r) - 1;
    if (!(i < 0))
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(r, i, c) {
    const f = qn(this, xn).indexOf(r);
    return f === -1 ? this : this.insert(f, i, c);
  }
  after(r) {
    let i = qn(this, xn).indexOf(r);
    if (i = i === -1 || i === this.size - 1 ? -1 : i + 1, i !== -1)
      return this.entryAt(i);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(r, i, c) {
    const f = qn(this, xn).indexOf(r);
    return f === -1 ? this : this.insert(f + 1, i, c);
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
    const i = super.delete(r);
    return i && qn(this, xn).splice(qn(this, xn).indexOf(r), 1), i;
  }
  deleteAt(r) {
    const i = this.keyAt(r);
    return i !== void 0 ? this.delete(i) : !1;
  }
  at(r) {
    const i = qc(qn(this, xn), r);
    if (i !== void 0)
      return this.get(i);
  }
  entryAt(r) {
    const i = qc(qn(this, xn), r);
    if (i !== void 0)
      return [i, this.get(i)];
  }
  indexOf(r) {
    return qn(this, xn).indexOf(r);
  }
  keyAt(r) {
    return qc(qn(this, xn), r);
  }
  from(r, i) {
    const c = this.indexOf(r);
    if (c === -1)
      return;
    let f = c + i;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.at(f);
  }
  keyFrom(r, i) {
    const c = this.indexOf(r);
    if (c === -1)
      return;
    let f = c + i;
    return f < 0 && (f = 0), f >= this.size && (f = this.size - 1), this.keyAt(f);
  }
  find(r, i) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, i, [f, c, this]))
        return f;
      c++;
    }
  }
  findIndex(r, i) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, i, [f, c, this]))
        return c;
      c++;
    }
    return -1;
  }
  filter(r, i) {
    const c = [];
    let f = 0;
    for (const d of this)
      Reflect.apply(r, i, [d, f, this]) && c.push(d), f++;
    return new Ml(c);
  }
  map(r, i) {
    const c = [];
    let f = 0;
    for (const d of this)
      c.push([d[0], Reflect.apply(r, i, [d, f, this])]), f++;
    return new Ml(c);
  }
  reduce(...r) {
    const [i, c] = r;
    let f = 0, d = c ?? this.at(0);
    for (const m of this)
      f === 0 && r.length === 1 ? d = m : d = Reflect.apply(i, this, [d, m, f, this]), f++;
    return d;
  }
  reduceRight(...r) {
    const [i, c] = r;
    let f = c ?? this.at(-1);
    for (let d = this.size - 1; d >= 0; d--) {
      const m = this.at(d);
      d === this.size - 1 && r.length === 1 ? f = m : f = Reflect.apply(i, this, [f, m, d, this]);
    }
    return f;
  }
  toSorted(r) {
    const i = [...this.entries()].sort(r);
    return new Ml(i);
  }
  toReversed() {
    const r = new Ml();
    for (let i = this.size - 1; i >= 0; i--) {
      const c = this.keyAt(i), f = this.get(c);
      r.set(c, f);
    }
    return r;
  }
  toSpliced(...r) {
    const i = [...this.entries()];
    return i.splice(...r), new Ml(i);
  }
  slice(r, i) {
    const c = new Ml();
    let f = this.size - 1;
    if (r === void 0)
      return c;
    r < 0 && (r = r + this.size), i !== void 0 && i > 0 && (f = i - 1);
    for (let d = r; d <= f; d++) {
      const m = this.keyAt(d), g = this.get(m);
      c.set(m, g);
    }
    return c;
  }
  every(r, i) {
    let c = 0;
    for (const f of this) {
      if (!Reflect.apply(r, i, [f, c, this]))
        return !1;
      c++;
    }
    return !0;
  }
  some(r, i) {
    let c = 0;
    for (const f of this) {
      if (Reflect.apply(r, i, [f, c, this]))
        return !0;
      c++;
    }
    return !1;
  }
}, xn = new WeakMap(), Nn(Ml, "OrderedDict"), Ml);
function qc(n, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(n, o);
  const r = l0(n, o);
  return r === -1 ? void 0 : n[r];
}
Nn(qc, "at");
function l0(n, o) {
  const r = n.length, i = Ph(o), c = i >= 0 ? i : r + i;
  return c < 0 || c >= r ? -1 : c;
}
Nn(l0, "toSafeIndex");
function Ph(n) {
  return n !== n || n === 0 ? 0 : Math.trunc(n);
}
Nn(Ph, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function DC(n) {
  const o = n + "CollectionProvider", [r, i] = /* @__PURE__ */ Ia(o), [c, f] = r(
    o,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new Vd(),
      setItemMap: /* @__PURE__ */ Nn(() => {
      }, "setItemMap")
    }
  ), d = /* @__PURE__ */ Nn(({ state: R, ...N }) => R ? /* @__PURE__ */ S.jsx(g, { ...N, state: R }) : /* @__PURE__ */ S.jsx(m, { ...N }), "CollectionProvider");
  d.displayName = o;
  const m = /* @__PURE__ */ Nn((R) => {
    const N = O();
    return /* @__PURE__ */ S.jsx(g, { ...R, state: N });
  }, "CollectionInit");
  m.displayName = o + "Init";
  const g = /* @__PURE__ */ Nn((R) => {
    const { scope: N, children: I, state: q } = R, G = b.useRef(null), [z, P] = b.useState(
      null
    ), te = Kn(G, P), [ie, fe] = q;
    return b.useEffect(() => {
      if (!z) return;
      const ne = r0(() => {
      });
      return ne.observe(z, {
        childList: !0,
        subtree: !0
      }), () => {
        ne.disconnect();
      };
    }, [z]), /* @__PURE__ */ S.jsx(
      c,
      {
        scope: N,
        itemMap: ie,
        setItemMap: fe,
        collectionRef: te,
        collectionRefObject: G,
        collectionElement: z,
        children: I
      }
    );
  }, "CollectionProviderImpl");
  g.displayName = o + "Impl";
  const h = n + "CollectionSlot", y = /* @__PURE__ */ hr(h), x = b.forwardRef(
    (R, N) => {
      const { scope: I, children: q } = R, G = f(h, I), z = Kn(N, G.collectionRef);
      return /* @__PURE__ */ S.jsx(y, { ref: z, children: q });
    }
  );
  x.displayName = h;
  const v = n + "CollectionItemSlot", E = "data-radix-collection-item", A = /* @__PURE__ */ hr(v), T = b.forwardRef(
    (R, N) => {
      const { scope: I, children: q, ...G } = R, z = b.useRef(null), [P, te] = b.useState(null), ie = Kn(N, z, te), fe = f(v, I), { setItemMap: ne } = fe, he = b.useRef(G);
      o0(he.current, G) || (he.current = G);
      const be = he.current;
      return b.useEffect(() => {
        const V = be;
        return ne((H) => P ? H.has(P) ? H.set(P, { ...V, element: P }).toSorted(Sh) : (H.set(P, { ...V, element: P }), H.toSorted(Sh)) : H), () => {
          ne((H) => !P || !H.has(P) ? H : (H.delete(P), new Vd(H)));
        };
      }, [P, be, ne]), /* @__PURE__ */ S.jsx(A, { [E]: "", ref: ie, children: q });
    }
  );
  T.displayName = v;
  function O() {
    return b.useState(new Vd());
  }
  Nn(O, "useInitCollection");
  function w(R) {
    const { itemMap: N } = f(n + "CollectionConsumer", R);
    return N;
  }
  return Nn(w, "useCollection"), [
    { Provider: d, Slot: x, ItemSlot: T },
    {
      createCollectionScope: i,
      useCollection: w,
      useInitCollection: O
    }
  ];
}
Nn(DC, "createCollection");
function o0(n, o) {
  if (n === o) return !0;
  if (typeof n != "object" || typeof o != "object" || n == null || o == null) return !1;
  const r = Object.keys(n), i = Object.keys(o);
  if (r.length !== i.length) return !1;
  for (const c of r)
    if (!Object.prototype.hasOwnProperty.call(o, c) || n[c] !== o[c]) return !1;
  return !0;
}
Nn(o0, "shallowEqual");
function a0(n, o) {
  return !!(o.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING);
}
Nn(a0, "isElementPreceding");
function Sh(n, o) {
  return !n[1].element || !o[1].element ? 0 : a0(n[1].element, o[1].element) ? -1 : 1;
}
Nn(Sh, "sortByDocumentPosition");
function r0(n) {
  return new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList") {
        n();
        return;
      }
  });
}
Nn(r0, "getChildListObserver");
var jC = Object.defineProperty, mi = (n, o) => jC(n, "name", { value: o, configurable: !0 }), i0 = !!(typeof window < "u" && window.document && window.document.createElement);
function Xn(n, o, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ mi(function(c) {
    if (n?.(c), r === !1 || !c || !c.defaultPrevented)
      return o?.(c);
  }, "handleEvent");
}
mi(Xn, "composeEventHandlers");
function LC(n) {
  if (!i0)
    throw new Error("Cannot access window outside of the DOM");
  return n?.ownerDocument?.defaultView ?? window;
}
mi(LC, "getOwnerWindow");
function Eh(n) {
  if (!i0)
    throw new Error("Cannot access document outside of the DOM");
  return n?.ownerDocument ?? document;
}
mi(Eh, "getOwnerDocument");
function s0(n, o = !1) {
  const { activeElement: r } = Eh(n);
  if (!r?.nodeName)
    return null;
  if (c0(r) && r.contentDocument)
    return s0(r.contentDocument.body, o);
  if (o) {
    const i = r.getAttribute("aria-activedescendant");
    if (i) {
      const c = Eh(r).getElementById(i);
      if (c)
        return c;
    }
  }
  return r;
}
mi(s0, "getActiveElement");
function c0(n) {
  return n.tagName === "IFRAME";
}
mi(c0, "isFrame");
var Na = globalThis?.document ? b.useLayoutEffect : () => {
}, VC = Object.defineProperty, IC = (n, o) => VC(n, "name", { value: o, configurable: !0 }), Ay = xr[" useEffectEvent ".trim().toString()], My = xr[" useInsertionEffect ".trim().toString()];
function u0(n) {
  if (typeof Ay == "function")
    return Ay(n);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof My == "function" ? My(() => {
    o.current = n;
  }) : Na(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
IC(u0, "useEffectEvent");
var HC = Object.defineProperty, xs = (n, o) => HC(n, "name", { value: o, configurable: !0 }), UC = xr[" useInsertionEffect ".trim().toString()] || Na;
function Ko({
  prop: n,
  defaultProp: o,
  onChange: r = /* @__PURE__ */ xs(() => {
  }, "onChange"),
  caller: i
}) {
  const [c, f, d] = f0({
    defaultProp: o,
    onChange: r
  }), m = n !== void 0, g = m ? n : c, h = b.useCallback(
    (y) => {
      if (m) {
        const x = d0(y) ? y(n) : y;
        x !== n && d.current?.(x);
      } else
        f(y);
    },
    [m, n, f, d]
  );
  return [g, h];
}
xs(Ko, "useControllableState");
function f0({
  defaultProp: n,
  onChange: o
}) {
  const [r, i] = b.useState(n), c = b.useRef(r), f = b.useRef(o);
  return UC(() => {
    f.current = o;
  }, [o]), b.useEffect(() => {
    c.current !== r && (f.current?.(r), c.current = r);
  }, [r, c]), [r, i, f];
}
xs(f0, "useUncontrolledState");
function d0(n) {
  return typeof n == "function";
}
xs(d0, "isFunction");
var Ty = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function BC(n, o, r, i) {
  const { prop: c, defaultProp: f, onChange: d, caller: m } = o, g = c !== void 0, h = u0(d), y = [{ ...r, state: f }];
  i && y.push(i);
  const [x, v] = b.useReducer(
    (O, w) => {
      if (w.type === Ty)
        return { ...O, state: w.state };
      const M = n(O, w);
      return g && !Object.is(M.state, O.state) && h(M.state), M;
    },
    ...y
  ), E = x.state, A = b.useRef(E);
  b.useEffect(() => {
    A.current !== E && (A.current = E, g || h(E));
  }, [E, A, g]);
  const T = b.useMemo(() => c !== void 0 ? { ...x, state: c } : x, [x, c]);
  return b.useEffect(() => {
    g && !Object.is(c, x.state) && v({ type: Ty, state: c });
  }, [c, x.state, g]), [T, v];
}
xs(BC, "useControllableStateReducer");
var GC = Object.defineProperty, Xo = (n, o) => GC(n, "name", { value: o, configurable: !0 });
function h0(n, o) {
  return b.useReducer((r, i) => o[r][i] ?? r, n);
}
Xo(h0, "useStateMachine");
var YC = /* @__PURE__ */ Xo((n) => {
  const { present: o, children: r } = n, i = m0(o), c = typeof r == "function" ? r({ present: i.isPresent }) : b.Children.only(r), f = p0(i.ref, g0(c));
  return typeof r == "function" || i.isPresent ? b.cloneElement(c, { ref: f }) : null;
}, "Presence");
function m0(n) {
  const [o, r] = b.useState(), i = b.useRef(null), c = b.useRef(n), f = b.useRef("none"), d = b.useRef(void 0), m = n ? "mounted" : "unmounted", [g, h] = h0(m, {
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
    g === "mounted" ? (f.current = d.current ?? ni(i.current), d.current = void 0) : f.current = "none";
  }, [g]), Na(() => {
    const y = i.current, x = c.current;
    if (x !== n) {
      const E = f.current, A = ni(y);
      n ? (d.current = A, h("MOUNT")) : A === "none" || y?.display === "none" ? h("UNMOUNT") : h(x && E !== A ? "ANIMATION_OUT" : "UNMOUNT"), c.current = n;
    }
  }, [n, h]), Na(() => {
    if (o) {
      let y;
      const x = o.ownerDocument.defaultView ?? window, v = /* @__PURE__ */ Xo((A) => {
        const O = ni(i.current).includes(CSS.escape(A.animationName));
        if (A.target === o && O && (h("ANIMATION_END"), !c.current)) {
          const w = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", y = x.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = w);
          });
        }
      }, "handleAnimationEnd"), E = /* @__PURE__ */ Xo((A) => {
        A.target === o && (f.current = ni(i.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", E), o.addEventListener("animationcancel", v), o.addEventListener("animationend", v), () => {
        x.clearTimeout(y), o.removeEventListener("animationstart", E), o.removeEventListener("animationcancel", v), o.removeEventListener("animationend", v);
      };
    } else
      h("ANIMATION_END");
  }, [o, h]), {
    isPresent: ["mounted", "unmountSuspended"].includes(g),
    ref: b.useCallback((y) => {
      if (y) {
        const x = getComputedStyle(y);
        i.current = x, d.current = ni(x);
      } else
        i.current = null;
      r(y);
    }, [])
  };
}
Xo(m0, "usePresence");
function Ch(n, o) {
  if (typeof n == "function")
    return n(o);
  n != null && (n.current = o);
}
Xo(Ch, "setRef");
function p0(...n) {
  const o = b.useRef(n);
  return o.current = n, b.useCallback((r) => {
    const i = o.current;
    let c = !1;
    const f = i.map((d) => {
      const m = Ch(d, r);
      return !c && typeof m == "function" && (c = !0), m;
    });
    if (c)
      return () => {
        for (let d = 0; d < f.length; d++) {
          const m = f[d];
          typeof m == "function" ? m() : Ch(i[d], null);
        }
      };
  }, []);
}
Xo(p0, "useStableComposedRefs");
function ni(n) {
  return n?.animationName || "none";
}
Xo(ni, "getAnimationName");
function g0(n) {
  let o = Object.getOwnPropertyDescriptor(n.props, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning;
  return r ? n.ref : (o = Object.getOwnPropertyDescriptor(n, "ref")?.get, r = o && "isReactWarning" in o && o.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
Xo(g0, "getElementRef");
var qC = Object.defineProperty, PC = (n, o) => qC(n, "name", { value: o, configurable: !0 }), XC = xr[" useId ".trim().toString()] || (() => {
}), KC = 0;
function cu(n) {
  const [o, r] = b.useState(XC());
  return Na(() => {
    n || r((i) => i ?? String(KC++));
  }, [n]), n || (o ? `radix-${o}` : "");
}
PC(cu, "useId");
var FC = Object.defineProperty, Ss = (n, o) => FC(n, "name", { value: o, configurable: !0 }), Xh = "Collapsible", [QC, b0] = /* @__PURE__ */ Ia(Xh), [ZC, Kh] = QC(Xh), $C = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ss(function(o, r) {
    const {
      __scopeCollapsible: i,
      open: c,
      defaultOpen: f,
      disabled: d,
      onOpenChange: m,
      ...g
    } = o, [h, y] = Ko({
      prop: c,
      defaultProp: f ?? !1,
      onChange: m,
      caller: Xh
    });
    return /* @__PURE__ */ S.jsx(
      ZC,
      {
        scope: i,
        disabled: d,
        contentId: cu(),
        open: h,
        onOpenToggle: b.useCallback(() => y((x) => !x), [y]),
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
), JC = "CollapsibleTrigger", y0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ss(function(o, r) {
    const { __scopeCollapsible: i, ...c } = o, f = Kh(JC, i);
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
), v0 = "CollapsibleContent", x0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ss(function(o, r) {
    const { forceMount: i, ...c } = o, f = Kh(v0, o.__scopeCollapsible);
    return /* @__PURE__ */ S.jsx(YC, { present: i || f.open, children: ({ present: d }) => /* @__PURE__ */ S.jsx(WC, { ...c, ref: r, present: d }) });
  }, "CollapsibleContent")
), WC = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ss(function(o, r) {
  const { __scopeCollapsible: i, present: c, children: f, ...d } = o, m = Kh(v0, i), [g, h] = b.useState(c), y = b.useRef(null), x = Kn(r, y), v = b.useRef(0), E = v.current, A = b.useRef(0), T = A.current, O = m.open || g, w = b.useRef(O), M = b.useRef(void 0);
  return b.useEffect(() => {
    const R = requestAnimationFrame(() => w.current = !1);
    return () => cancelAnimationFrame(R);
  }, []), Na(() => {
    const R = y.current;
    if (R) {
      M.current = M.current || {
        transitionDuration: R.style.transitionDuration,
        animationName: R.style.animationName
      }, R.style.transitionDuration = "0s", R.style.animationName = "none";
      const N = R.getBoundingClientRect();
      v.current = N.height, A.current = N.width, w.current || (R.style.transitionDuration = M.current.transitionDuration, R.style.animationName = M.current.animationName), h(c);
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
        "--radix-collapsible-content-height": E ? `${E}px` : void 0,
        "--radix-collapsible-content-width": T ? `${T}px` : void 0,
        ...o.style
      },
      children: O && f
    }
  );
}, "CollapsibleContentImpl"));
function uu(n) {
  return n ? "open" : "closed";
}
Ss(uu, "getState");
var S0 = $C, eR = y0, tR = x0, nR = Object.defineProperty, lR = (n, o) => nR(n, "name", { value: o, configurable: !0 }), oR = b.createContext(void 0);
function Es(n) {
  const o = b.useContext(oR);
  return n || o || "ltr";
}
lR(Es, "useDirection");
var aR = Object.defineProperty, Ol = (n, o) => aR(n, "name", { value: o, configurable: !0 }), So = "Accordion", rR = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Fh, iR, sR] = /* @__PURE__ */ su(So), [fu, oN] = /* @__PURE__ */ Ia(So, [
  sR,
  b0
]), Qh = b0(), cR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { type: i, ...c } = o, f = c, d = c;
    return /* @__PURE__ */ S.jsx(Fh.Provider, { scope: o.__scopeAccordion, children: i === "multiple" ? /* @__PURE__ */ S.jsx(hR, { ...d, ref: r }) : /* @__PURE__ */ S.jsx(dR, { ...f, ref: r }) });
  }, "Accordion")
), [E0, uR] = fu(So), [C0, fR] = fu(
  So,
  { collapsible: !1 }
), dR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const {
      value: i,
      defaultValue: c,
      onValueChange: f = /* @__PURE__ */ Ol(() => {
      }, "onValueChange"),
      collapsible: d = !1,
      ...m
    } = o, [g, h] = Ko({
      prop: i,
      defaultProp: c ?? "",
      onChange: f,
      caller: So
    });
    return /* @__PURE__ */ S.jsx(
      E0,
      {
        scope: o.__scopeAccordion,
        value: b.useMemo(() => g ? [g] : [], [g]),
        onItemOpen: h,
        onItemClose: b.useCallback(() => d && h(""), [d, h]),
        children: /* @__PURE__ */ S.jsx(C0, { scope: o.__scopeAccordion, collapsible: d, children: /* @__PURE__ */ S.jsx(R0, { ...m, ref: r }) })
      }
    );
  }, "AccordionImplSingle")
), hR = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Ol(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ Ol(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: So
  }), h = b.useCallback(
    (x) => g((v = []) => [...v, x]),
    [g]
  ), y = b.useCallback(
    (x) => g((v = []) => v.filter((E) => E !== x)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    E0,
    {
      scope: o.__scopeAccordion,
      value: m,
      onItemOpen: h,
      onItemClose: y,
      children: /* @__PURE__ */ S.jsx(C0, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ S.jsx(R0, { ...d, ref: r }) })
    }
  );
}, "AccordionImplMultiple")), [mR, du] = fu(So), R0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: i, disabled: c, dir: f, orientation: d = "vertical", ...m } = o, g = b.useRef(null), h = Kn(g, r), y = iR(i), v = Es(f) === "ltr", E = Xn(o.onKeyDown, (A) => {
      if (!rR.includes(A.key)) return;
      const T = A.target, O = y().filter((P) => !P.ref.current?.disabled), w = O.findIndex((P) => P.ref.current === T), M = O.length;
      if (w === -1) return;
      A.preventDefault();
      let R = w;
      const N = 0, I = M - 1, q = /* @__PURE__ */ Ol(() => {
        R = w + 1, R > I && (R = N);
      }, "moveNext"), G = /* @__PURE__ */ Ol(() => {
        R = w - 1, R < N && (R = I);
      }, "movePrev");
      switch (A.key) {
        case "Home":
          R = N;
          break;
        case "End":
          R = I;
          break;
        case "ArrowRight":
          d === "horizontal" && (v ? q() : G());
          break;
        case "ArrowDown":
          d === "vertical" && q();
          break;
        case "ArrowLeft":
          d === "horizontal" && (v ? G() : q());
          break;
        case "ArrowUp":
          d === "vertical" && G();
          break;
      }
      const z = R % M;
      O[z].ref.current?.focus();
    });
    return /* @__PURE__ */ S.jsx(
      mR,
      {
        scope: i,
        disabled: c,
        direction: f,
        orientation: d,
        children: /* @__PURE__ */ S.jsx(Fh.Slot, { scope: i, children: /* @__PURE__ */ S.jsx(
          Un.div,
          {
            ...m,
            "data-orientation": d,
            ref: h,
            onKeyDown: c ? void 0 : E
          }
        ) })
      }
    );
  }, "AccordionImpl")
), Rh = "AccordionItem", [pR, Zh] = fu(Rh), gR = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: i, value: c, ...f } = o, d = du(Rh, i), m = uR(Rh, i), g = Qh(i), h = cu(), y = c && m.value.includes(c) || !1, x = d.disabled || o.disabled;
    return /* @__PURE__ */ S.jsx(
      pR,
      {
        scope: i,
        open: y,
        disabled: x,
        triggerId: h,
        children: /* @__PURE__ */ S.jsx(
          S0,
          {
            "data-orientation": d.orientation,
            "data-state": $h(y),
            ...g,
            ...f,
            ref: r,
            disabled: x,
            open: y,
            onOpenChange: (v) => {
              v ? m.onItemOpen(c) : m.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), bR = "AccordionHeader", yR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = du(So, i), d = Zh(bR, i);
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
), Oy = "AccordionTrigger", vR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = du(So, i), d = Zh(Oy, i), m = fR(Oy, i), g = Qh(i);
    return /* @__PURE__ */ S.jsx(Fh.ItemSlot, { scope: i, children: /* @__PURE__ */ S.jsx(
      eR,
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
), xR = "AccordionContent", SR = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Ol(function(o, r) {
    const { __scopeAccordion: i, ...c } = o, f = du(So, i), d = Zh(xR, i), m = Qh(i);
    return /* @__PURE__ */ S.jsx(
      tR,
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
Ol($h, "getState");
var ER = cR, CR = gR, RR = yR, _R = vR, wR = SR, AR = Object.defineProperty, MR = (n, o) => AR(n, "name", { value: o, configurable: !0 });
function _0(n) {
  const o = b.useRef(n);
  return b.useEffect(() => {
    o.current = n;
  }), b.useMemo(() => ((...r) => o.current?.(...r)), []);
}
MR(_0, "useCallbackRef");
var TR = Object.defineProperty, OR = (n, o) => TR(n, "name", { value: o, configurable: !0 });
function w0(n) {
  const [o, r] = b.useState(void 0);
  return Na(() => {
    if (n) {
      r({ width: n.offsetWidth, height: n.offsetHeight });
      const i = new ResizeObserver((c) => {
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
      return i.observe(n, { box: "border-box" }), () => i.unobserve(n);
    } else
      r(void 0);
  }, [n]), o;
}
OR(w0, "useSize");
const ci = Math.min, qo = Math.max, Qc = Math.round, ur = Math.floor, Po = (n) => ({
  x: n,
  y: n
}), kR = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function A0(n, o, r) {
  return qo(n, ci(o, r));
}
function za(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function Ql(n) {
  return n.split("-")[0];
}
function Ha(n) {
  return n.split("-")[1];
}
function Jh(n) {
  return n === "x" ? "y" : "x";
}
function Wh(n) {
  return n === "y" ? "height" : "width";
}
function Fl(n) {
  const o = n[0];
  return o === "t" || o === "b" ? "y" : "x";
}
function em(n) {
  return Jh(Fl(n));
}
function NR(n, o, r) {
  r === void 0 && (r = !1);
  const i = Ha(n), c = em(n), f = Wh(c);
  let d = c === "x" ? i === (r ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return o.reference[f] > o.floating[f] && (d = Zc(d)), [d, Zc(d)];
}
function zR(n) {
  const o = Zc(n);
  return [_h(n), o, _h(o)];
}
function _h(n) {
  return n.includes("start") ? n.replace("start", "end") : n.replace("end", "start");
}
const ky = ["left", "right"], Ny = ["right", "left"], DR = ["top", "bottom"], jR = ["bottom", "top"];
function LR(n, o, r) {
  switch (n) {
    case "top":
    case "bottom":
      return r ? o ? Ny : ky : o ? ky : Ny;
    case "left":
    case "right":
      return o ? DR : jR;
    default:
      return [];
  }
}
function VR(n, o, r, i) {
  const c = Ha(n);
  let f = LR(Ql(n), r === "start", i);
  return c && (f = f.map((d) => d + "-" + c), o && (f = f.concat(f.map(_h)))), f;
}
function Zc(n) {
  const o = Ql(n);
  return kR[o] + n.slice(o.length);
}
function IR(n) {
  var o, r, i, c;
  return {
    top: (o = n.top) != null ? o : 0,
    right: (r = n.right) != null ? r : 0,
    bottom: (i = n.bottom) != null ? i : 0,
    left: (c = n.left) != null ? c : 0
  };
}
function M0(n) {
  return typeof n != "number" ? IR(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function $c(n) {
  const {
    x: o,
    y: r,
    width: i,
    height: c
  } = n;
  return {
    width: i,
    height: c,
    top: r,
    left: o,
    right: o + i,
    bottom: r + c,
    x: o,
    y: r
  };
}
function zy(n, o, r) {
  let {
    reference: i,
    floating: c
  } = n;
  const f = Fl(o), d = em(o), m = Wh(d), g = Ql(o), h = f === "y", y = i.x + i.width / 2 - c.width / 2, x = i.y + i.height / 2 - c.height / 2, v = i[m] / 2 - c[m] / 2;
  let E;
  switch (g) {
    case "top":
      E = {
        x: y,
        y: i.y - c.height
      };
      break;
    case "bottom":
      E = {
        x: y,
        y: i.y + i.height
      };
      break;
    case "right":
      E = {
        x: i.x + i.width,
        y: x
      };
      break;
    case "left":
      E = {
        x: i.x - c.width,
        y: x
      };
      break;
    default:
      E = {
        x: i.x,
        y: i.y
      };
  }
  const A = Ha(o);
  return A && (E[d] += v * (A === "end" ? 1 : -1) * (r && h ? -1 : 1)), E;
}
async function HR(n, o) {
  var r;
  o === void 0 && (o = {});
  const {
    x: i,
    y: c,
    platform: f,
    rects: d,
    elements: m,
    strategy: g
  } = n, {
    boundary: h = "clippingAncestors",
    rootBoundary: y = "viewport",
    elementContext: x = "floating",
    altBoundary: v = !1,
    padding: E = 0
  } = za(o, n), A = M0(E), O = m[v ? x === "floating" ? "reference" : "floating" : x], w = $c(await f.getClippingRect({
    element: (r = await (f.isElement == null ? void 0 : f.isElement(O))) == null || r ? O : O.contextElement || await (f.getDocumentElement == null ? void 0 : f.getDocumentElement(m.floating)),
    boundary: h,
    rootBoundary: y,
    strategy: g
  })), M = x === "floating" ? {
    x: i,
    y: c,
    width: d.floating.width,
    height: d.floating.height
  } : d.reference, R = await (f.getOffsetParent == null ? void 0 : f.getOffsetParent(m.floating)), N = await (f.isElement == null ? void 0 : f.isElement(R)) && await (f.getScale == null ? void 0 : f.getScale(R)) || {
    x: 1,
    y: 1
  }, I = $c(f.convertOffsetParentRelativeRectToViewportRelativeRect ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: m,
    rect: M,
    offsetParent: R,
    strategy: g
  }) : M);
  return {
    top: (w.top - I.top + A.top) / N.y,
    bottom: (I.bottom - w.bottom + A.bottom) / N.y,
    left: (w.left - I.left + A.left) / N.x,
    right: (I.right - w.right + A.right) / N.x
  };
}
const UR = 50, BR = async (n, o, r) => {
  const {
    placement: i = "bottom",
    strategy: c = "absolute",
    middleware: f = [],
    platform: d
  } = r, m = d.detectOverflow ? d : {
    ...d,
    detectOverflow: HR
  }, g = await (d.isRTL == null ? void 0 : d.isRTL(o));
  let h = await d.getElementRects({
    reference: n,
    floating: o,
    strategy: c
  }), {
    x: y,
    y: x
  } = zy(h, i, g), v = i, E = 0;
  const A = {};
  for (let T = 0; T < f.length; T++) {
    const O = f[T];
    if (!O)
      continue;
    const {
      name: w,
      fn: M
    } = O, {
      x: R,
      y: N,
      data: I,
      reset: q
    } = await M({
      x: y,
      y: x,
      initialPlacement: i,
      placement: v,
      strategy: c,
      middlewareData: A,
      rects: h,
      platform: m,
      elements: {
        reference: n,
        floating: o
      }
    });
    y = R ?? y, x = N ?? x, A[w] = {
      ...A[w],
      ...I
    }, q && E < UR && (E++, typeof q == "object" && (q.placement && (v = q.placement), q.rects && (h = q.rects === !0 ? await d.getElementRects({
      reference: n,
      floating: o,
      strategy: c
    }) : q.rects), {
      x: y,
      y: x
    } = zy(h, v, g)), T = -1);
  }
  return {
    x: y,
    y: x,
    placement: v,
    strategy: c,
    middlewareData: A
  };
}, GR = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(o) {
      var r, i;
      const {
        placement: c,
        middlewareData: f,
        rects: d,
        initialPlacement: m,
        platform: g,
        elements: h
      } = o, {
        mainAxis: y = !0,
        crossAxis: x = !0,
        fallbackPlacements: v,
        fallbackStrategy: E = "bestFit",
        fallbackAxisSideDirection: A = "none",
        flipAlignment: T = !0,
        ...O
      } = za(n, o);
      if ((r = f.arrow) != null && r.alignmentOffset)
        return {};
      const w = Ql(c), M = Fl(m), R = Ql(m) === m, N = await (g.isRTL == null ? void 0 : g.isRTL(h.floating)), I = v || (R || !T ? [Zc(m)] : zR(m)), q = A !== "none";
      !v && q && I.push(...VR(m, T, A, N));
      const G = [m, ...I], z = await g.detectOverflow(o, O), P = [];
      let te = ((i = f.flip) == null ? void 0 : i.overflows) || [];
      if (y && P.push(z[w]), x) {
        const he = NR(c, d, N);
        P.push(z[he[0]], z[he[1]]);
      }
      if (te = [...te, {
        placement: c,
        overflows: P
      }], !P.every((he) => he <= 0)) {
        var ie, fe;
        const he = (((ie = f.flip) == null ? void 0 : ie.index) || 0) + 1, be = G[he];
        if (be && (!(x === "alignment" ? M !== Fl(be) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        te.every((F) => Fl(F.placement) === M ? F.overflows[0] > 0 : !0)))
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
          switch (E) {
            case "bestFit": {
              var ne;
              const H = (ne = te.filter((F) => {
                if (q) {
                  const ve = Fl(F.placement);
                  return ve === M || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ve === "y";
                }
                return !0;
              }).map((F) => [F.placement, F.overflows.filter((ve) => ve > 0).reduce((ve, se) => ve + se, 0)]).sort((F, ve) => F[1] - ve[1])[0]) == null ? void 0 : ne[0];
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
}, T0 = /* @__PURE__ */ new Set(["left", "top"]);
async function YR(n, o) {
  const {
    placement: r,
    platform: i,
    elements: c
  } = n, f = await (i.isRTL == null ? void 0 : i.isRTL(c.floating)), d = Ql(r), m = Ha(r), g = Fl(r) === "y", h = T0.has(d) ? -1 : 1, y = f && g ? -1 : 1, x = za(o, n);
  let {
    mainAxis: v,
    crossAxis: E,
    alignmentAxis: A
  } = typeof x == "number" ? {
    mainAxis: x,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: x.mainAxis || 0,
    crossAxis: x.crossAxis || 0,
    alignmentAxis: x.alignmentAxis
  };
  return m && typeof A == "number" && (E = m === "end" ? A * -1 : A), g ? {
    x: E * y,
    y: v * h
  } : {
    x: v * h,
    y: E * y
  };
}
const qR = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(o) {
      var r, i;
      const {
        x: c,
        y: f,
        placement: d,
        middlewareData: m
      } = o, g = await YR(o, n);
      return d === ((r = m.offset) == null ? void 0 : r.placement) && (i = m.arrow) != null && i.alignmentOffset ? {} : {
        x: c + g.x,
        y: f + g.y,
        data: {
          ...g,
          placement: d
        }
      };
    }
  };
}, PR = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(o) {
      const {
        x: r,
        y: i,
        placement: c,
        platform: f
      } = o, {
        mainAxis: d = !0,
        crossAxis: m = !1,
        limiter: g = {
          fn: (M) => {
            let {
              x: R,
              y: N
            } = M;
            return {
              x: R,
              y: N
            };
          }
        },
        ...h
      } = za(n, o), y = {
        x: r,
        y: i
      }, x = await f.detectOverflow(o, h), v = Fl(c), E = Jh(v);
      let A = y[E], T = y[v];
      const O = (M, R) => A0(R + x[M === "y" ? "top" : "left"], R, R - x[M === "y" ? "bottom" : "right"]);
      d && (A = O(E, A)), m && (T = O(v, T));
      const w = g.fn({
        ...o,
        [E]: A,
        [v]: T
      });
      return {
        ...w,
        data: {
          x: w.x - r,
          y: w.y - i,
          enabled: {
            [E]: d,
            [v]: m
          }
        }
      };
    }
  };
}, XR = function(n) {
  return n === void 0 && (n = {}), {
    options: n,
    fn(o) {
      var r, i;
      const {
        x: c,
        y: f,
        placement: d,
        rects: m,
        middlewareData: g
      } = o, {
        offset: h = 0,
        mainAxis: y = !0,
        crossAxis: x = !0
      } = za(n, o), v = {
        x: c,
        y: f
      }, E = Fl(d), A = Jh(E);
      let T = v[A], O = v[E];
      const w = za(h, o), M = typeof w == "number" ? {
        mainAxis: w,
        crossAxis: 0
      } : {
        mainAxis: (r = w.mainAxis) != null ? r : 0,
        crossAxis: (i = w.crossAxis) != null ? i : 0
      };
      if (y) {
        const I = A === "y" ? "height" : "width", q = m.reference[A] - m.floating[I] + M.mainAxis, G = m.reference[A] + m.reference[I] - M.mainAxis;
        T < q ? T = q : T > G && (T = G);
      }
      if (x) {
        var R, N;
        const I = A === "y" ? "width" : "height", q = T0.has(Ql(d)), G = m.reference[E] - m.floating[I] + (q && ((R = g.offset) == null ? void 0 : R[E]) || 0) + (q ? 0 : M.crossAxis), z = m.reference[E] + m.reference[I] + (q ? 0 : ((N = g.offset) == null ? void 0 : N[E]) || 0) - (q ? M.crossAxis : 0);
        O < G ? O = G : O > z && (O = z);
      }
      return {
        [A]: T,
        [E]: O
      };
    }
  };
}, KR = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(o) {
      const {
        placement: r,
        rects: i,
        platform: c,
        elements: f
      } = o, {
        apply: d = () => {
        },
        ...m
      } = za(n, o), g = await c.detectOverflow(o, m), h = Ql(r), y = Ha(r), x = Fl(r) === "y", {
        width: v,
        height: E
      } = i.floating;
      let A, T;
      h === "top" || h === "bottom" ? (A = h, T = y === (await (c.isRTL == null ? void 0 : c.isRTL(f.floating)) ? "start" : "end") ? "left" : "right") : (T = h, A = y === "end" ? "top" : "bottom");
      const O = E - g.top - g.bottom, w = v - g.left - g.right, M = ci(E - g[A], O), R = ci(v - g[T], w), N = o.middlewareData.shift, I = !N;
      let q = M, G = R;
      N != null && N.enabled.x && (G = w), N != null && N.enabled.y && (q = O), I && !y && (x ? G = v - 2 * qo(g.left, g.right) : q = E - 2 * qo(g.top, g.bottom)), await d({
        ...o,
        availableWidth: G,
        availableHeight: q
      });
      const z = await c.getDimensions(f.floating);
      return v !== z.width || E !== z.height ? {
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
function Fo(n) {
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
function ui(n) {
  return !hu() || typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof hn(n).ShadowRoot;
}
function Cs(n) {
  const {
    overflow: o,
    overflowX: r,
    overflowY: i,
    display: c
  } = bl(n);
  return /auto|scroll|overlay|hidden|clip/.test(o + i + r) && c !== "inline" && c !== "contents";
}
function FR(n) {
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
const QR = /transform|translate|scale|rotate|perspective|filter/, ZR = /paint|layout|strict|content/, sr = (n) => !!n && n !== "none";
let Id;
function nm(n) {
  const o = dn(n) ? bl(n) : n;
  return sr(o.transform) || sr(o.translate) || sr(o.scale) || sr(o.rotate) || sr(o.perspective) || !lm() && (sr(o.backdropFilter) || sr(o.filter)) || QR.test(o.willChange || "") || ZR.test(o.contain || "");
}
function $R(n) {
  let o = Da(n);
  for (; Kt(o) && !ka(o); ) {
    if (nm(o))
      return o;
    if (mu(o))
      return null;
    o = Da(o);
  }
  return null;
}
function lm() {
  return Id == null && (Id = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Id;
}
function ka(n) {
  return /^(html|body|#document)$/.test(Bn(n));
}
function bl(n) {
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
function Da(n) {
  if (Bn(n) === "html")
    return n;
  const o = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    ui(n) && n.host || // Fallback.
    Fo(n)
  );
  return ui(o) ? o.host : o;
}
function O0(n) {
  const o = Da(n);
  return ka(o) ? (n.ownerDocument || n).body : Kt(o) && Cs(o) ? o : O0(o);
}
function fi(n, o, r) {
  var i;
  o === void 0 && (o = []), r === void 0 && (r = !0);
  const c = O0(n), f = c === ((i = n.ownerDocument) == null ? void 0 : i.body), d = hn(c);
  if (f) {
    const m = wh(d);
    return o.concat(d, d.visualViewport || [], Cs(c) ? c : [], m && r ? fi(m) : []);
  } else
    return o.concat(c, fi(c, [], r));
}
function wh(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function k0(n) {
  const o = bl(n);
  let r = parseFloat(o.width) || 0, i = parseFloat(o.height) || 0;
  const c = Kt(n), f = c ? n.offsetWidth : r, d = c ? n.offsetHeight : i, m = Qc(r) !== f || Qc(i) !== d;
  return m && (r = f, i = d), {
    width: r,
    height: i,
    $: m
  };
}
function om(n) {
  return dn(n) ? n : n.contextElement;
}
function ri(n) {
  const o = om(n);
  if (!Kt(o))
    return Po(1);
  const r = o.getBoundingClientRect(), {
    width: i,
    height: c,
    $: f
  } = k0(o);
  let d = (f ? Qc(r.width) : r.width) / i, m = (f ? Qc(r.height) : r.height) / c;
  return (!d || !Number.isFinite(d)) && (d = 1), (!m || !Number.isFinite(m)) && (m = 1), {
    x: d,
    y: m
  };
}
const JR = /* @__PURE__ */ Po(0);
function N0(n) {
  const o = hn(n);
  return !lm() || !o.visualViewport ? JR : {
    x: o.visualViewport.offsetLeft,
    y: o.visualViewport.offsetTop
  };
}
function WR(n, o, r) {
  return o === void 0 && (o = !1), !!r && o && r === hn(n);
}
function mr(n, o, r, i) {
  o === void 0 && (o = !1), r === void 0 && (r = !1);
  const c = n.getBoundingClientRect(), f = om(n);
  let d = Po(1);
  o && (i ? dn(i) && (d = ri(i)) : d = ri(n));
  const m = WR(f, r, i) ? N0(f) : Po(0);
  let g = (c.left + m.x) / d.x, h = (c.top + m.y) / d.y, y = c.width / d.x, x = c.height / d.y;
  if (f && i) {
    const v = hn(f), E = dn(i) ? hn(i) : i;
    let A = v, T = wh(A);
    for (; T && E !== A; ) {
      const O = ri(T), w = T.getBoundingClientRect(), M = bl(T), R = w.left + (T.clientLeft + parseFloat(M.paddingLeft)) * O.x, N = w.top + (T.clientTop + parseFloat(M.paddingTop)) * O.y;
      g *= O.x, h *= O.y, y *= O.x, x *= O.y, g += R, h += N, A = hn(T), T = wh(A);
    }
  }
  return $c({
    width: y,
    height: x,
    x: g,
    y: h
  });
}
function gu(n, o) {
  const r = pu(n).scrollLeft;
  return o ? o.left + r : mr(Fo(n)).left + r;
}
function z0(n, o) {
  const r = n.getBoundingClientRect(), i = r.left + o.scrollLeft - gu(n, r), c = r.top + o.scrollTop;
  return {
    x: i,
    y: c
  };
}
function e_(n) {
  let {
    elements: o,
    rect: r,
    offsetParent: i,
    strategy: c
  } = n;
  const f = c === "fixed", d = Fo(i), m = o ? mu(o.floating) : !1;
  if (i === d || m && f)
    return r;
  let g = {
    scrollLeft: 0,
    scrollTop: 0
  }, h = Po(1);
  const y = Po(0), x = Kt(i);
  if ((x || !f) && ((Bn(i) !== "body" || Cs(d)) && (g = pu(i)), x)) {
    const E = mr(i);
    h = ri(i), y.x = E.x + i.clientLeft, y.y = E.y + i.clientTop;
  }
  const v = d && !x && !f ? z0(d, g) : Po(0);
  return {
    width: r.width * h.x,
    height: r.height * h.y,
    x: r.x * h.x - g.scrollLeft * h.x + y.x + v.x,
    y: r.y * h.y - g.scrollTop * h.y + y.y + v.y
  };
}
function t_(n) {
  return n.getClientRects ? Array.from(n.getClientRects()) : [];
}
function n_(n) {
  const o = pu(n), r = n.ownerDocument.body, i = qo(n.scrollWidth, n.clientWidth, r.scrollWidth, r.clientWidth), c = qo(n.scrollHeight, n.clientHeight, r.scrollHeight, r.clientHeight);
  let f = -o.scrollLeft + gu(n);
  const d = -o.scrollTop;
  return bl(r).direction === "rtl" && (f += qo(n.clientWidth, r.clientWidth) - i), {
    width: i,
    height: c,
    x: f,
    y: d
  };
}
const l_ = 25;
function o_(n, o, r) {
  r === void 0 && (r = "viewport");
  const i = r === "layoutViewport", c = hn(n), f = Fo(n), d = c.visualViewport;
  let m = f.clientWidth, g = f.clientHeight, h = 0, y = 0;
  if (d) {
    const v = !lm() || o === "fixed";
    i ? v || (h = -d.offsetLeft, y = -d.offsetTop) : (m = d.width, g = d.height, v && (h = d.offsetLeft, y = d.offsetTop));
  }
  if (gu(f) <= 0) {
    const v = f.ownerDocument, E = v.body, A = getComputedStyle(E), T = v.compatMode === "CSS1Compat" && parseFloat(A.marginLeft) + parseFloat(A.marginRight) || 0, O = Math.abs(f.clientWidth - E.clientWidth - T), w = getComputedStyle(f).scrollbarGutter === "stable both-edges" ? O / 2 : O;
    w <= l_ && (m -= w);
  }
  return {
    width: m,
    height: g,
    x: h,
    y
  };
}
function a_(n, o) {
  const r = mr(n, !0, o === "fixed"), i = r.top + n.clientTop, c = r.left + n.clientLeft, f = ri(n), d = n.clientWidth * f.x, m = n.clientHeight * f.y, g = c * f.x, h = i * f.y;
  return {
    width: d,
    height: m,
    x: g,
    y: h
  };
}
function Dy(n, o, r) {
  let i;
  if (o === "viewport" || o === "layoutViewport")
    i = o_(n, r, o);
  else if (o === "document")
    i = n_(Fo(n));
  else if (dn(o))
    i = a_(o, r);
  else {
    const c = N0(n);
    i = {
      x: o.x - c.x,
      y: o.y - c.y,
      width: o.width,
      height: o.height
    };
  }
  return $c(i);
}
function r_(n, o) {
  const r = o.get(n);
  if (r)
    return r;
  let i = fi(n, [], !1).filter((m) => dn(m) && Bn(m) !== "body"), c = null;
  const f = bl(n).position === "fixed";
  let d = f ? Da(n) : n;
  for (; dn(d) && !ka(d); ) {
    const m = bl(d), g = nm(d), h = c ? c.position : f ? "fixed" : "";
    !g && (h === "fixed" || h === "absolute" && m.position === "static") ? i = i.filter((x) => x !== d) : c = m, d = Da(d);
  }
  return o.set(n, i), i;
}
function i_(n) {
  let {
    element: o,
    boundary: r,
    rootBoundary: i,
    strategy: c
  } = n;
  const d = [...r === "clippingAncestors" ? mu(o) ? [] : r_(o, this._c) : [].concat(r), i], m = Dy(o, d[0], c);
  let g = m.top, h = m.right, y = m.bottom, x = m.left;
  for (let v = 1; v < d.length; v++) {
    const E = Dy(o, d[v], c);
    g = qo(E.top, g), h = ci(E.right, h), y = ci(E.bottom, y), x = qo(E.left, x);
  }
  return {
    width: h - x,
    height: y - g,
    x,
    y: g
  };
}
function s_(n) {
  const {
    width: o,
    height: r
  } = k0(n);
  return {
    width: o,
    height: r
  };
}
function c_(n, o, r) {
  const i = Kt(o), c = Fo(o), f = r === "fixed", d = mr(n, !0, f, o);
  let m = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const g = Po(0);
  if ((i || !f) && ((Bn(o) !== "body" || Cs(c)) && (m = pu(o)), i)) {
    const v = mr(o, !0, f, o);
    g.x = v.x + o.clientLeft, g.y = v.y + o.clientTop;
  }
  !i && c && (g.x = gu(c));
  const h = c && !i && !f ? z0(c, m) : Po(0), y = d.left + m.scrollLeft - g.x - h.x, x = d.top + m.scrollTop - g.y - h.y;
  return {
    x: y,
    y: x,
    width: d.width,
    height: d.height
  };
}
function Hd(n) {
  return bl(n).position === "static";
}
function jy(n, o) {
  if (!Kt(n) || bl(n).position === "fixed")
    return null;
  if (o)
    return o(n);
  let r = n.offsetParent;
  return Fo(n) === r && (r = r.ownerDocument.body), r;
}
function D0(n, o) {
  const r = hn(n);
  if (mu(n))
    return r;
  if (!Kt(n)) {
    let c = Da(n);
    for (; c && !ka(c); ) {
      if (dn(c) && !Hd(c))
        return c;
      c = Da(c);
    }
    return r;
  }
  let i = jy(n, o);
  for (; i && FR(i) && Hd(i); )
    i = jy(i, o);
  return i && ka(i) && Hd(i) && !nm(i) ? r : i || $R(n) || r;
}
const u_ = async function(n) {
  const o = this.getOffsetParent || D0, r = this.getDimensions, i = await r(n.floating);
  return {
    reference: c_(n.reference, await o(n.floating), n.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function f_(n) {
  return bl(n).direction === "rtl";
}
const d_ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: e_,
  getDocumentElement: Fo,
  getClippingRect: i_,
  getOffsetParent: D0,
  getElementRects: u_,
  getClientRects: t_,
  getDimensions: s_,
  getScale: ri,
  isElement: dn,
  isRTL: f_
};
function j0(n, o) {
  return n.x === o.x && n.y === o.y && n.width === o.width && n.height === o.height;
}
function h_(n, o, r) {
  let i = null, c;
  const f = Fo(n);
  function d() {
    var y;
    clearTimeout(c), (y = i) == null || y.disconnect(), i = null;
  }
  function m(y, x) {
    y === void 0 && (y = !1), x === void 0 && (x = 1), d();
    const v = n.getBoundingClientRect(), {
      left: E,
      top: A,
      width: T,
      height: O
    } = v;
    if (y || o(), !T || !O)
      return;
    const w = ur(A), M = ur(f.clientWidth - (E + T)), R = ur(f.clientHeight - (A + O)), N = ur(E), q = {
      rootMargin: -w + "px " + -M + "px " + -R + "px " + -N + "px",
      threshold: qo(0, ci(1, x)) || 1
    };
    let G = !0;
    function z(P) {
      const te = P[0].intersectionRatio;
      if (!j0(v, n.getBoundingClientRect()))
        return m();
      if (te !== x) {
        if (!G)
          return m();
        te ? m(!1, te) : c = setTimeout(() => {
          m(!1, 1e-7);
        }, 1e3);
      }
      G = !1;
    }
    try {
      i = new IntersectionObserver(z, {
        ...q,
        // Handle <iframe>s
        root: f.ownerDocument
      });
    } catch {
      i = new IntersectionObserver(z, q);
    }
    i.observe(n);
  }
  const g = hn(n), h = () => m(r);
  return g.addEventListener("resize", h), m(!0), () => {
    g.removeEventListener("resize", h), d();
  };
}
function Ly(n, o, r, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: c = !0,
    ancestorResize: f = !0,
    elementResize: d = typeof ResizeObserver == "function",
    layoutShift: m = typeof IntersectionObserver == "function",
    animationFrame: g = !1
  } = i, h = om(n), y = c || f ? [...h ? fi(h) : [], ...o ? fi(o) : []] : [];
  y.forEach((w) => {
    c && w.addEventListener("scroll", r), f && w.addEventListener("resize", r);
  });
  const x = h && m ? h_(h, r, f) : null;
  let v = -1, E = null;
  d && (E = new ResizeObserver((w) => {
    let [M] = w;
    M && M.target === h && E && o && (E.unobserve(o), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      var R;
      (R = E) == null || R.observe(o);
    })), r();
  }), h && !g && E.observe(h), o && E.observe(o));
  let A, T = g ? mr(n) : null;
  g && O();
  function O() {
    const w = mr(n);
    T && !j0(T, w) && r(), T = w, A = requestAnimationFrame(O);
  }
  return r(), () => {
    var w;
    y.forEach((M) => {
      c && M.removeEventListener("scroll", r), f && M.removeEventListener("resize", r);
    }), x?.(), (w = E) == null || w.disconnect(), E = null, g && cancelAnimationFrame(A);
  };
}
const m_ = qR, p_ = PR, g_ = GR, b_ = KR, y_ = XR, v_ = (n, o, r) => {
  const i = /* @__PURE__ */ new Map(), c = r ?? {}, f = {
    ...d_,
    ...c.platform,
    _c: i
  };
  return BR(n, o, {
    ...c,
    platform: f
  });
};
var x_ = typeof document < "u", S_ = function() {
}, Pc = x_ ? b.useLayoutEffect : S_;
function Jc(n, o) {
  if (n === o)
    return !0;
  if (typeof n != typeof o)
    return !1;
  if (typeof n == "function" && n.toString() === o.toString())
    return !0;
  let r, i, c;
  if (n && o && typeof n == "object") {
    if (Array.isArray(n)) {
      if (r = n.length, r !== o.length) return !1;
      for (i = r; i-- !== 0; )
        if (!Jc(n[i], o[i]))
          return !1;
      return !0;
    }
    if (c = Object.keys(n), r = c.length, r !== Object.keys(o).length)
      return !1;
    for (i = r; i-- !== 0; )
      if (!{}.hasOwnProperty.call(o, c[i]))
        return !1;
    for (i = r; i-- !== 0; ) {
      const f = c[i];
      if (!(f === "_owner" && n.$$typeof) && !Jc(n[f], o[f]))
        return !1;
    }
    return !0;
  }
  return n !== n && o !== o;
}
function L0(n) {
  return typeof window > "u" ? 1 : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Vy(n, o) {
  const r = L0(n);
  return Math.round(o * r) / r;
}
function Ud(n) {
  const o = b.useRef(n);
  return Pc(() => {
    o.current = n;
  }), o;
}
function E_(n) {
  n === void 0 && (n = {});
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: c,
    elements: {
      reference: f,
      floating: d
    } = {},
    transform: m = !0,
    whileElementsMounted: g,
    open: h
  } = n, [y, x] = b.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: o,
    middlewareData: {},
    isPositioned: !1
  }), [v, E] = b.useState(i);
  Jc(v, i) || E(i);
  const [A, T] = b.useState(null), [O, w] = b.useState(null), M = b.useCallback((F) => {
    F !== q.current && (q.current = F, T(F));
  }, []), R = b.useCallback((F) => {
    F !== G.current && (G.current = F, w(F));
  }, []), N = f || A, I = d || O, q = b.useRef(null), G = b.useRef(null), z = b.useRef(y), P = g != null, te = Ud(g), ie = Ud(c), fe = Ud(h), ne = b.useCallback(() => {
    if (!q.current || !G.current)
      return;
    const F = {
      placement: o,
      strategy: r,
      middleware: v
    };
    ie.current && (F.platform = ie.current), v_(q.current, G.current, F).then((ve) => {
      const se = {
        ...ve,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: fe.current !== !1
      };
      he.current && !Jc(z.current, se) && (z.current = se, hi.flushSync(() => {
        x(se);
      }));
    });
  }, [v, o, r, ie, fe]);
  Pc(() => {
    h === !1 && z.current.isPositioned && (z.current.isPositioned = !1, x((F) => ({
      ...F,
      isPositioned: !1
    })));
  }, [h]);
  const he = b.useRef(!1);
  Pc(() => (he.current = !0, () => {
    he.current = !1;
  }), []), Pc(() => {
    if (N && (q.current = N), I && (G.current = I), N && I) {
      if (te.current)
        return te.current(N, I, ne);
      ne();
    }
  }, [N, I, ne, te, P]);
  const be = b.useMemo(() => ({
    reference: q,
    floating: G,
    setReference: M,
    setFloating: R
  }), [M, R]), V = b.useMemo(() => ({
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
    const ve = Vy(V.floating, y.x), se = Vy(V.floating, y.y);
    return m ? {
      ...F,
      transform: "translate(" + ve + "px, " + se + "px)",
      ...L0(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: ve,
      top: se
    };
  }, [r, m, V.floating, y.x, y.y]);
  return b.useMemo(() => ({
    ...y,
    update: ne,
    refs: be,
    elements: V,
    floatingStyles: H
  }), [y, ne, be, V, H]);
}
const C_ = (n, o) => {
  const r = m_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, R_ = (n, o) => {
  const r = p_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, __ = (n, o) => ({
  fn: y_(n).fn,
  options: [n, o]
}), w_ = (n, o) => {
  const r = g_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
}, A_ = (n, o) => {
  const r = b_(n);
  return {
    name: r.name,
    fn: r.fn,
    options: [n, o]
  };
};
var M_ = Object.defineProperty, am = (n, o) => M_(n, "name", { value: o, configurable: !0 }), Bd = !1;
function V0() {
  const [n, o] = b.useState(Bd);
  return b.useEffect(() => {
    Bd || (Bd = !0, o(!0));
  }, []), n;
}
am(V0, "useIsHydrated");
var I0 = xr[" useSyncExternalStore ".trim().toString()];
function H0() {
  return () => {
  };
}
am(H0, "subscribe");
function U0() {
  return I0(
    H0,
    () => !0,
    () => !1
  );
}
am(U0, "useIsHydratedModern");
var T_ = typeof I0 == "function" ? U0 : V0, O_ = Object.defineProperty, Sr = (n, o) => O_(n, "name", { value: o, configurable: !0 }), Gd = "rovingFocusGroup.onEntryFocus", k_ = { bubbles: !1, cancelable: !0 }, bu = "RovingFocusGroup", [Ah, B0, N_] = /* @__PURE__ */ su(bu), [z_, G0] = /* @__PURE__ */ Ia(
  bu,
  [N_]
), [D_, j_] = z_(bu), L_ = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Sr(function(o, r) {
    return /* @__PURE__ */ S.jsx(Ah.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(Ah.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(V_, { ...o, ref: r }) }) });
  }, "RovingFocusGroup")
), V_ = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ Sr(function(o, r) {
  const {
    __scopeRovingFocusGroup: i,
    orientation: c,
    loop: f = !1,
    dir: d,
    currentTabStopId: m,
    defaultCurrentTabStopId: g,
    onCurrentTabStopIdChange: h,
    onEntryFocus: y,
    preventScrollOnEntryFocus: x = !1,
    ...v
  } = o, E = b.useRef(null), A = Kn(r, E), T = Es(d), [O, w] = Ko({
    prop: m,
    defaultProp: g ?? null,
    onChange: h,
    caller: bu
  }), [M, R] = b.useState(!1), N = _0(y), I = B0(i), q = b.useRef(!1), [G, z] = b.useState(0);
  return b.useEffect(() => {
    const P = E.current;
    if (P)
      return P.addEventListener(Gd, N), () => P.removeEventListener(Gd, N);
  }, [N]), /* @__PURE__ */ S.jsx(
    D_,
    {
      scope: i,
      orientation: c,
      dir: T,
      loop: f,
      currentTabStopId: O,
      onItemFocus: b.useCallback(
        (P) => w(P),
        [w]
      ),
      onItemShiftTab: b.useCallback(() => R(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => z((P) => P + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => z((P) => P - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        Un.div,
        {
          tabIndex: M || G === 0 ? -1 : 0,
          "data-orientation": c,
          ...v,
          ref: A,
          style: { outline: "none", ...o.style },
          onMouseDown: Xn(o.onMouseDown, () => {
            q.current = !0;
          }),
          onFocus: Xn(o.onFocus, (P) => {
            const te = !q.current;
            if (P.target === P.currentTarget && te && !M) {
              const ie = new CustomEvent(Gd, k_);
              if (P.currentTarget.dispatchEvent(ie), !ie.defaultPrevented) {
                const fe = I().filter((H) => H.focusable), ne = fe.find((H) => H.active), he = fe.find((H) => H.id === O), V = [ne, he, ...fe].filter(
                  Boolean
                ).map((H) => H.ref.current);
                rm(V, x);
              }
            }
            q.current = !1;
          }),
          onBlur: Xn(o.onBlur, () => R(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), I_ = "RovingFocusGroupItem", H_ = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Sr(function(o, r) {
    const {
      __scopeRovingFocusGroup: i,
      focusable: c = !0,
      active: f = !1,
      tabStopId: d,
      children: m,
      ...g
    } = o, h = cu(), y = d || h, x = j_(I_, i), v = x.currentTabStopId === y, E = B0(i), { onFocusableItemAdd: A, onFocusableItemRemove: T, currentTabStopId: O } = x, w = T_();
    return Na(() => {
      if (!(!w || !c))
        return A(), () => T();
    }, [w, c, A, T]), b.useEffect(() => {
      if (!(w || !c))
        return A(), () => T();
    }, [w, c, A, T]), /* @__PURE__ */ S.jsx(
      Ah.ItemSlot,
      {
        scope: i,
        id: y,
        focusable: c,
        active: f,
        children: /* @__PURE__ */ S.jsx(
          Un.span,
          {
            tabIndex: v ? 0 : -1,
            "data-orientation": x.orientation,
            ...g,
            ref: r,
            onMouseDown: Xn(o.onMouseDown, (M) => {
              c ? x.onItemFocus(y) : M.preventDefault();
            }),
            onFocus: Xn(o.onFocus, () => x.onItemFocus(y)),
            onKeyDown: Xn(o.onKeyDown, (M) => {
              if (M.key === "Tab" && M.shiftKey) {
                x.onItemShiftTab();
                return;
              }
              if (M.target !== M.currentTarget) return;
              const R = q0(M, x.orientation, x.dir);
              if (R !== void 0) {
                if (M.metaKey || M.ctrlKey || M.altKey || M.shiftKey) return;
                M.preventDefault();
                let I = E().filter((q) => q.focusable).map((q) => q.ref.current);
                if (R === "last") I.reverse();
                else if (R === "prev" || R === "next") {
                  R === "prev" && I.reverse();
                  const q = I.indexOf(M.currentTarget);
                  I = x.loop ? P0(I, q + 1) : I.slice(q + 1);
                }
                setTimeout(() => rm(I));
              }
            }),
            children: typeof m == "function" ? m({ isCurrentTabStop: v, hasTabStop: O != null }) : m
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), U_ = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Y0(n, o) {
  return o !== "rtl" ? n : n === "ArrowLeft" ? "ArrowRight" : n === "ArrowRight" ? "ArrowLeft" : n;
}
Sr(Y0, "getDirectionAwareKey");
function q0(n, o, r) {
  const i = Y0(n.key, r);
  if (!(o === "vertical" && ["ArrowLeft", "ArrowRight"].includes(i)) && !(o === "horizontal" && ["ArrowUp", "ArrowDown"].includes(i)))
    return U_[i];
}
Sr(q0, "getFocusIntent");
function rm(n, o = !1) {
  const r = document.activeElement;
  for (const i of n)
    if (i === r || (i.focus({ preventScroll: o }), document.activeElement !== r)) return;
}
Sr(rm, "focusFirst");
function P0(n, o) {
  return n.map((r, i) => n[(o + i) % n.length]);
}
Sr(P0, "wrapArray");
var B_ = L_, G_ = H_, Y_ = Object.defineProperty, q_ = (n, o) => Y_(n, "name", { value: o, configurable: !0 }), P_ = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ q_(function(o, r) {
    return /* @__PURE__ */ S.jsx(
      Un.label,
      {
        ...o,
        ref: r,
        onMouseDown: (i) => {
          i.target.closest("button, input, select, textarea") || (o.onMouseDown?.(i), !i.defaultPrevented && i.detail > 1 && i.preventDefault());
        }
      }
    );
  }, "Label")
), X_ = P_, K_ = Object.defineProperty, F_ = (n, o) => K_(n, "name", { value: o, configurable: !0 });
function X0(n) {
  const o = b.useRef({ value: n, previous: n });
  return b.useMemo(() => (o.current.value !== n && (o.current.previous = o.current.value, o.current.value = n), o.current.previous), [n]);
}
F_(X0, "usePrevious");
var Q_ = Object.defineProperty, Z_ = (n, o) => Q_(n, "name", { value: o, configurable: !0 });
function im(n, [o, r]) {
  return Math.min(r, Math.max(o, n));
}
Z_(im, "clamp");
var $_ = Object.defineProperty, K0 = (n, o) => $_(n, "name", { value: o, configurable: !0 }), Iy = "horizontal", J_ = ["horizontal", "vertical"], W_ = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ K0(function(o, r) {
    const { decorative: i, orientation: c = Iy, ...f } = o, d = F0(c) ? c : Iy, g = i ? { role: "none" } : { "aria-orientation": d === "vertical" ? d : void 0, role: "separator" };
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
function F0(n) {
  return J_.includes(n);
}
K0(F0, "isValidOrientation");
var ew = W_, tw = Object.defineProperty, Mt = (n, o) => tw(n, "name", { value: o, configurable: !0 }), Q0 = ["PageUp", "PageDown"], Z0 = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], $0 = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, Rs = "Slider", [Mh, nw, lw] = /* @__PURE__ */ su(Rs), [sm, aN] = /* @__PURE__ */ Ia(Rs, [
  lw
]), [ow, _s] = sm(Rs), aw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      name: i,
      min: c = 0,
      max: f = 100,
      step: d = 1,
      orientation: m = "horizontal",
      disabled: g = !1,
      minStepsBetweenThumbs: h = 0,
      defaultValue: y = [c],
      value: x,
      onValueChange: v = /* @__PURE__ */ Mt(() => {
      }, "onValueChange"),
      onValueCommit: E = /* @__PURE__ */ Mt(() => {
      }, "onValueCommit"),
      inverted: A = !1,
      form: T,
      ...O
    } = o, w = b.useRef(/* @__PURE__ */ new Set()), M = b.useRef(0), R = b.useRef(!1), I = m === "horizontal" ? rw : iw, [q, G] = b.useState(null), z = Kn(r, G), [P = [], te] = Ko({
      prop: x,
      defaultProp: y,
      onChange: /* @__PURE__ */ Mt((H) => {
        [...w.current][M.current]?.focus({
          preventScroll: !0,
          focusVisible: R.current
        }), R.current = !1, v(H);
      }, "onChange")
    }), ie = b.useRef(P), fe = b.useRef(P);
    b.useEffect(() => {
      const H = T ? q?.ownerDocument.getElementById(T) : q?.closest("form");
      if (H instanceof HTMLFormElement) {
        const F = /* @__PURE__ */ Mt(() => te(fe.current), "reset");
        return H.addEventListener("reset", F), () => H.removeEventListener("reset", F);
      }
    }, [q, T, te]);
    function ne(H) {
      const F = ax(P, H);
      V(H, F);
    }
    Mt(ne, "handleSlideStart");
    function he(H) {
      V(H, M.current);
    }
    Mt(he, "handleSlideMove");
    function be() {
      String(P) !== String(ie.current) && E(P);
    }
    Mt(be, "handleSlideEnd");
    function V(H, F, { commit: ve } = { commit: !1 }) {
      const se = um(d), D = us(Math.round((H - c) / d) * d + c, se), K = im(D, [c, f]);
      te((le = []) => {
        const oe = lx(le, K, F);
        if (sx(oe, h * d)) {
          M.current = oe.indexOf(K);
          const pe = String(oe) !== String(le);
          return pe && ve && E(oe), pe ? oe : le;
        } else
          return le;
      });
    }
    return Mt(V, "updateValues"), /* @__PURE__ */ S.jsx(
      ow,
      {
        scope: o.__scopeSlider,
        name: i,
        disabled: g,
        min: c,
        max: f,
        valueIndexToChangeRef: M,
        thumbs: w.current,
        values: P,
        orientation: m,
        form: T,
        children: /* @__PURE__ */ S.jsx(Mh.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(Mh.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          I,
          {
            "aria-disabled": g,
            "data-disabled": g ? "" : void 0,
            ...O,
            ref: z,
            onPointerDown: Xn(O.onPointerDown, () => {
              g || (ie.current = P, R.current = !1);
            }),
            min: c,
            max: f,
            inverted: A,
            onSlideStart: g ? void 0 : ne,
            onSlideMove: g ? void 0 : he,
            onSlideEnd: g ? void 0 : be,
            onHomeKeyDown: () => {
              g || (R.current = !0, V(c, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              g || (R.current = !0, V(f, P.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: H, direction: F }) => {
              if (!g) {
                R.current = !0;
                const D = Q0.includes(H.key) || H.shiftKey && Z0.includes(H.key) ? 10 : 1, K = M.current, le = P[K], oe = cx(le, {
                  min: c,
                  step: d,
                  direction: F,
                  multiplier: D
                });
                V(oe, K, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [J0, W0] = sm(Rs, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), rw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      min: i,
      max: c,
      dir: f,
      inverted: d,
      onSlideStart: m,
      onSlideMove: g,
      onSlideEnd: h,
      onStepKeyDown: y,
      ...x
    } = o, [v, E] = b.useState(null), A = Kn(r, E), T = b.useRef(void 0), O = Es(f), w = O === "ltr", M = w && !d || !w && d;
    function R(N) {
      const I = T.current || v.getBoundingClientRect(), q = [0, I.width], z = yu(q, M ? [i, c] : [c, i]);
      return T.current = I, z(N - I.left);
    }
    return Mt(R, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      J0,
      {
        scope: o.__scopeSlider,
        startEdge: M ? "left" : "right",
        endEdge: M ? "right" : "left",
        direction: M ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          ex,
          {
            dir: O,
            "data-orientation": "horizontal",
            ...x,
            ref: A,
            style: {
              ...x.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (N) => {
              const I = R(N.clientX);
              m?.(I);
            },
            onSlideMove: (N) => {
              const I = R(N.clientX);
              g?.(I);
            },
            onSlideEnd: () => {
              T.current = void 0, h?.();
            },
            onStepKeyDown: (N) => {
              const q = $0[M ? "from-left" : "from-right"].includes(N.key);
              y?.({ event: N, direction: q ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), iw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      min: i,
      max: c,
      inverted: f,
      onSlideStart: d,
      onSlideMove: m,
      onSlideEnd: g,
      onStepKeyDown: h,
      ...y
    } = o, x = b.useRef(null), v = Kn(r, x), E = b.useRef(void 0), A = !f;
    function T(O) {
      const w = E.current || x.current.getBoundingClientRect(), M = [0, w.height], N = yu(M, A ? [c, i] : [i, c]);
      return E.current = w, N(O - w.top);
    }
    return Mt(T, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      J0,
      {
        scope: o.__scopeSlider,
        startEdge: A ? "bottom" : "top",
        endEdge: A ? "top" : "bottom",
        size: "height",
        direction: A ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          ex,
          {
            "data-orientation": "vertical",
            ...y,
            ref: v,
            style: {
              ...y.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (O) => {
              const w = T(O.clientY);
              d?.(w);
            },
            onSlideMove: (O) => {
              const w = T(O.clientY);
              m?.(w);
            },
            onSlideEnd: () => {
              E.current = void 0, g?.();
            },
            onStepKeyDown: (O) => {
              const M = $0[A ? "from-bottom" : "from-top"].includes(O.key);
              h?.({ event: O, direction: M ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), ex = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const {
      __scopeSlider: i,
      onSlideStart: c,
      onSlideMove: f,
      onSlideEnd: d,
      onHomeKeyDown: m,
      onEndKeyDown: g,
      onStepKeyDown: h,
      ...y
    } = o, x = _s(Rs, i);
    return /* @__PURE__ */ S.jsx(
      Un.span,
      {
        ...y,
        ref: r,
        onKeyDown: Xn(o.onKeyDown, (v) => {
          v.key === "Home" ? (m(v), v.preventDefault()) : v.key === "End" ? (g(v), v.preventDefault()) : Q0.concat(Z0).includes(v.key) && (h(v), v.preventDefault());
        }),
        onPointerDown: Xn(o.onPointerDown, (v) => {
          const E = v.target;
          E.setPointerCapture(v.pointerId), v.preventDefault(), x.thumbs.has(E) ? E.focus({ preventScroll: !0, focusVisible: !1 }) : c(v);
        }),
        onPointerMove: Xn(o.onPointerMove, (v) => {
          v.target.hasPointerCapture(v.pointerId) && f(v);
        }),
        onPointerUp: Xn(o.onPointerUp, (v) => {
          const E = v.target;
          E.hasPointerCapture(v.pointerId) && (E.releasePointerCapture(v.pointerId), d(v));
        })
      }
    );
  }, "SliderImpl")
), sw = "SliderTrack", cw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = _s(sw, i);
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
), Hy = "SliderRange", uw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = _s(Hy, i), d = W0(Hy, i), m = b.useRef(null), g = Kn(r, m), h = f.values.length, y = f.values.map(
      (E) => cm(E, f.min, f.max)
    ), x = h > 1 ? Math.min(...y) : 0, v = 100 - Math.max(...y);
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
          [d.endEdge]: v + "%"
        }
      }
    );
  }, "SliderRange")
), fw = "SliderThumb", [dw, tx] = sm(fw), hw = "SliderThumbProvider";
function nx(n) {
  const {
    __scopeSlider: o,
    name: r,
    children: i,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: c
  } = n, f = _s(hw, o), d = nw(o), [m, g] = b.useState(null), h = b.useMemo(
    () => m ? d().findIndex((O) => O.ref.current === m) : -1,
    [d, m]
  ), y = w0(m), x = m ? !!f.form || !!m.closest("form") : !0, v = f.values[h], E = r ?? (f.name ? f.name + (f.values.length > 1 ? "[]" : "") : void 0), A = v === void 0 ? 0 : cm(v, f.min, f.max);
  b.useEffect(() => {
    if (m)
      return f.thumbs.add(m), () => {
        f.thumbs.delete(m);
      };
  }, [m, f.thumbs]);
  const T = {
    value: v,
    name: E,
    form: f.form,
    isFormControl: x,
    index: h,
    thumb: m,
    onThumbChange: g,
    percent: A,
    size: y
  };
  return /* @__PURE__ */ S.jsx(dw, { scope: o, ...T, children: ux(c) ? c(T) : i });
}
Mt(nx, "SliderThumbProvider");
var Yd = "SliderThumbTrigger", mw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: i, ...c } = o, f = _s(Yd, i), d = W0(Yd, i), { index: m, value: g, percent: h, size: y, onThumbChange: x } = tx(
      Yd,
      i
    ), v = Kn(r, x), E = ox(m, f.values.length), A = y?.[d.size], T = A ? rx(A, h, d.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [d.startEdge]: `calc(${h}% + ${T}px)`
        },
        children: /* @__PURE__ */ S.jsx(Mh.ItemSlot, { scope: i, children: /* @__PURE__ */ S.jsx(
          Un.span,
          {
            role: "slider",
            "aria-label": o["aria-label"] || E,
            "aria-valuemin": f.min,
            "aria-valuenow": g,
            "aria-valuemax": f.max,
            "aria-orientation": f.orientation,
            "data-orientation": f.orientation,
            "data-disabled": f.disabled ? "" : void 0,
            tabIndex: f.disabled ? void 0 : 0,
            ...c,
            ref: v,
            style: g === void 0 ? { display: "none" } : o.style,
            onFocus: Xn(o.onFocus, () => {
              f.valueIndexToChangeRef.current = m;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), pw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ Mt(function(o, r) {
    const { __scopeSlider: i, name: c, ...f } = o;
    return /* @__PURE__ */ S.jsx(
      nx,
      {
        __scopeSlider: i,
        name: c,
        internal_do_not_use_render: ({ index: d, isFormControl: m }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            mw,
            {
              ...f,
              ref: r,
              __scopeSlider: i
            }
          ),
          m ? /* @__PURE__ */ S.jsx(
            bw,
            {
              __scopeSlider: i
            },
            d
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), gw = "SliderBubbleInput", bw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ Mt(function({ __scopeSlider: o, ...r }, i) {
    const { value: c, name: f, form: d } = tx(gw, o), m = b.useRef(null), g = Kn(m, i), h = X0(c);
    return b.useEffect(() => {
      const y = m.current;
      if (!y) return;
      const x = window.HTMLInputElement.prototype, E = Object.getOwnPropertyDescriptor(x, "value").set;
      if (h !== c && E) {
        const A = new Event("input", { bubbles: !0 });
        E.call(y, c), y.dispatchEvent(A);
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
function lx(n = [], o, r) {
  const i = [...n];
  return i[r] = o, i.sort((c, f) => c - f);
}
Mt(lx, "getNextSortedValues");
function cm(n, o, r) {
  const f = 100 / (r - o) * (n - o);
  return im(f, [0, 100]);
}
Mt(cm, "convertValueToPercentage");
function ox(n, o) {
  return o > 2 ? `Value ${n + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][n] : void 0;
}
Mt(ox, "getLabel");
function ax(n, o) {
  if (n.length === 1) return 0;
  const r = n.map((c) => Math.abs(c - o)), i = Math.min(...r);
  return r.indexOf(i);
}
Mt(ax, "getClosestValueIndex");
function rx(n, o, r) {
  const i = n / 2, f = yu([0, 50], [0, i]);
  return (i - f(o) * r) * r;
}
Mt(rx, "getThumbInBoundsOffset");
function ix(n) {
  return n.slice(0, -1).map((o, r) => n[r + 1] - o);
}
Mt(ix, "getStepsBetweenValues");
function sx(n, o) {
  if (o > 0) {
    const r = ix(n);
    return Math.min(...r) >= o;
  }
  return !0;
}
Mt(sx, "hasMinStepsBetweenValues");
function yu(n, o) {
  return (r) => {
    if (n[0] === n[1] || o[0] === o[1]) return o[0];
    const i = (o[1] - o[0]) / (n[1] - n[0]);
    return o[0] + i * (r - n[0]);
  };
}
Mt(yu, "linearScale");
function um(n) {
  if (!Number.isFinite(n)) return 0;
  const o = n.toString();
  if (o.includes("e")) {
    const [i, c] = o.split("e"), f = i.split(".")[1] || "", d = Number(c);
    return Math.max(0, f.length - d);
  }
  const r = o.split(".")[1];
  return r ? r.length : 0;
}
Mt(um, "getDecimalCount");
function us(n, o) {
  const r = Math.pow(10, o);
  return Math.round(n * r) / r;
}
Mt(us, "roundValue");
function cx(n, {
  min: o,
  step: r,
  direction: i,
  multiplier: c
}) {
  const f = um(r), d = (n - o) / r, m = Math.round(d), g = us(m * r + o, f) === us(n, f);
  let h;
  return g ? h = m + c * i : i > 0 ? h = Math.ceil(d) : h = Math.floor(d), us(h * r + o, f);
}
Mt(cx, "getNextStepValue");
function ux(n) {
  return typeof n == "function";
}
Mt(ux, "isFunction");
var yw = Object.defineProperty, vw = (n, o) => yw(n, "name", { value: o, configurable: !0 }), xw = "Toggle", Sw = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ vw(function(o, r) {
    const { pressed: i, defaultPressed: c, onPressedChange: f, ...d } = o, [m, g] = Ko({
      prop: i,
      onChange: f,
      defaultProp: c ?? !1,
      caller: xw
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
), Ew = Object.defineProperty, ja = (n, o) => Ew(n, "name", { value: o, configurable: !0 }), pi = "ToggleGroup", [fx, rN] = /* @__PURE__ */ Ia(pi, [
  G0
]), dx = G0(), Cw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ja(function(o, r) {
  const { type: i, ...c } = o;
  if (i === "single") {
    const f = c;
    return /* @__PURE__ */ S.jsx(Rw, { role: "radiogroup", ...f, ref: r });
  }
  if (i === "multiple") {
    const f = c;
    return /* @__PURE__ */ S.jsx(_w, { role: "toolbar", ...f, ref: r });
  }
  throw new Error(`Missing prop \`type\` expected on \`${pi}\``);
}, "ToggleGroup")), [hx, mx] = fx(pi), Rw = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ja(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ ja(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
    prop: i,
    defaultProp: c ?? "",
    onChange: f,
    caller: pi
  });
  return /* @__PURE__ */ S.jsx(
    hx,
    {
      scope: o.__scopeToggleGroup,
      type: "single",
      value: b.useMemo(() => m ? [m] : [], [m]),
      onItemActivate: g,
      onItemDeactivate: b.useCallback(() => g(""), [g]),
      children: /* @__PURE__ */ S.jsx(px, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), _w = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ja(function(o, r) {
  const {
    value: i,
    defaultValue: c,
    onValueChange: f = /* @__PURE__ */ ja(() => {
    }, "onValueChange"),
    ...d
  } = o, [m, g] = Ko({
    prop: i,
    defaultProp: c ?? [],
    onChange: f,
    caller: pi
  }), h = b.useCallback(
    (x) => g((v = []) => [...v, x]),
    [g]
  ), y = b.useCallback(
    (x) => g((v = []) => v.filter((E) => E !== x)),
    [g]
  );
  return /* @__PURE__ */ S.jsx(
    hx,
    {
      scope: o.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: h,
      onItemDeactivate: y,
      children: /* @__PURE__ */ S.jsx(px, { ...d, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [ww, Aw] = fx(pi), px = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ja(function(o, r) {
    const {
      __scopeToggleGroup: i,
      disabled: c = !1,
      rovingFocus: f = !0,
      orientation: d,
      dir: m,
      loop: g = !0,
      ...h
    } = o, y = dx(i), x = Es(m), v = { dir: x, ...h };
    return /* @__PURE__ */ S.jsx(ww, { scope: i, rovingFocus: f, disabled: c, children: f ? /* @__PURE__ */ S.jsx(
      B_,
      {
        asChild: !0,
        ...y,
        orientation: d,
        dir: x,
        loop: g,
        children: /* @__PURE__ */ S.jsx(Un.div, { ...v, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Un.div, { ...v, ref: r }) });
  }, "ToggleGroupImpl")
), Th = "ToggleGroupItem", Mw = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ja(function(o, r) {
    const i = mx(Th, o.__scopeToggleGroup), c = Aw(Th, o.__scopeToggleGroup), f = dx(o.__scopeToggleGroup), d = i.value.includes(o.value), m = c.disabled || o.disabled, g = { ...o, pressed: d, disabled: m }, h = b.useRef(null);
    return c.rovingFocus ? /* @__PURE__ */ S.jsx(
      G_,
      {
        asChild: !0,
        ...f,
        focusable: !m,
        active: d,
        ref: h,
        children: /* @__PURE__ */ S.jsx(Uy, { ...g, ref: r })
      }
    ) : /* @__PURE__ */ S.jsx(Uy, { ...g, ref: r });
  }, "ToggleGroupItem")
), Uy = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ja(function(o, r) {
    const { __scopeToggleGroup: i, value: c, ...f } = o, d = mx(Th, i), m = { role: "radio", "aria-checked": o.pressed, "aria-pressed": void 0 }, g = d.type === "single" ? m : void 0;
    return /* @__PURE__ */ S.jsx(
      Sw,
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
const Tw = (n, o) => {
  const r = new Array(n.length + o.length);
  for (let i = 0; i < n.length; i++)
    r[i] = n[i];
  for (let i = 0; i < o.length; i++)
    r[n.length + i] = o[i];
  return r;
}, Ow = (n, o) => ({
  classGroupId: n,
  validator: o
}), gx = (n = /* @__PURE__ */ new Map(), o = null, r) => ({
  nextPart: n,
  validators: o,
  classGroupId: r
}), Wc = "-", By = [], kw = "arbitrary..", Nw = (n) => {
  const o = Dw(n), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = n;
  return {
    getClassGroupId: (d) => {
      if (d.startsWith("[") && d.endsWith("]"))
        return zw(d);
      const m = d.split(Wc), g = m[0] === "" && m.length > 1 ? 1 : 0;
      return bx(m, g, o);
    },
    getConflictingClassGroupIds: (d, m) => {
      if (m) {
        const g = i[d], h = r[d];
        return g ? h ? Tw(h, g) : g : h || By;
      }
      return r[d] || By;
    }
  };
}, bx = (n, o, r) => {
  if (n.length - o === 0)
    return r.classGroupId;
  const c = n[o], f = r.nextPart.get(c);
  if (f) {
    const h = bx(n, o + 1, f);
    if (h) return h;
  }
  const d = r.validators;
  if (d === null)
    return;
  const m = o === 0 ? n.join(Wc) : n.slice(o).join(Wc), g = d.length;
  for (let h = 0; h < g; h++) {
    const y = d[h];
    if (y.validator(m))
      return y.classGroupId;
  }
}, zw = (n) => n.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = n.slice(1, -1), r = o.indexOf(":"), i = o.slice(0, r);
  return i ? kw + i : void 0;
})(), Dw = (n) => {
  const {
    theme: o,
    classGroups: r
  } = n;
  return jw(r, o);
}, jw = (n, o) => {
  const r = gx();
  for (const i in n) {
    const c = n[i];
    fm(c, r, i, o);
  }
  return r;
}, fm = (n, o, r, i) => {
  const c = n.length;
  for (let f = 0; f < c; f++) {
    const d = n[f];
    Lw(d, o, r, i);
  }
}, Lw = (n, o, r, i) => {
  if (typeof n == "string") {
    Vw(n, o, r);
    return;
  }
  if (typeof n == "function") {
    Iw(n, o, r, i);
    return;
  }
  Hw(n, o, r, i);
}, Vw = (n, o, r) => {
  const i = n === "" ? o : yx(o, n);
  i.classGroupId = r;
}, Iw = (n, o, r, i) => {
  if (Uw(n)) {
    fm(n(i), o, r, i);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(Ow(r, n));
}, Hw = (n, o, r, i) => {
  const c = Object.entries(n), f = c.length;
  for (let d = 0; d < f; d++) {
    const [m, g] = c[d];
    fm(g, yx(o, m), r, i);
  }
}, yx = (n, o) => {
  let r = n;
  const i = o.split(Wc), c = i.length;
  for (let f = 0; f < c; f++) {
    const d = i[f];
    let m = r.nextPart.get(d);
    m || (m = gx(), r.nextPart.set(d, m)), r = m;
  }
  return r;
}, Uw = (n) => "isThemeGetter" in n && n.isThemeGetter === !0, Bw = (n) => {
  if (n < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, r = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null);
  const c = (f, d) => {
    r[f] = d, o++, o > n && (o = 0, i = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(f) {
      let d = r[f];
      if (d !== void 0)
        return d;
      if ((d = i[f]) !== void 0)
        return c(f, d), d;
    },
    set(f, d) {
      f in r ? r[f] = d : c(f, d);
    }
  };
}, Oh = "!", Gy = ":", Gw = [], Yy = (n, o, r, i, c) => ({
  modifiers: n,
  hasImportantModifier: o,
  baseClassName: r,
  maybePostfixModifierPosition: i,
  isExternal: c
}), Yw = (n) => {
  const {
    prefix: o,
    experimentalParseClassName: r
  } = n;
  let i = (c) => {
    const f = [];
    let d = 0, m = 0, g = 0, h;
    const y = c.length;
    for (let T = 0; T < y; T++) {
      const O = c[T];
      if (d === 0 && m === 0) {
        if (O === Gy) {
          f.push(c.slice(g, T)), g = T + 1;
          continue;
        }
        if (O === "/") {
          h = T;
          continue;
        }
      }
      O === "[" ? d++ : O === "]" ? d-- : O === "(" ? m++ : O === ")" && m--;
    }
    const x = f.length === 0 ? c : c.slice(g);
    let v = x, E = !1;
    x.endsWith(Oh) ? (v = x.slice(0, -1), E = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      x.startsWith(Oh) && (v = x.slice(1), E = !0)
    );
    const A = h && h > g ? h - g : void 0;
    return Yy(f, E, v, A);
  };
  if (o) {
    const c = o + Gy, f = i;
    i = (d) => d.startsWith(c) ? f(d.slice(c.length)) : Yy(Gw, !1, d, void 0, !0);
  }
  if (r) {
    const c = i;
    i = (f) => r({
      className: f,
      parseClassName: c
    });
  }
  return i;
}, qw = (n) => {
  const o = /* @__PURE__ */ new Map();
  return n.orderSensitiveModifiers.forEach((r, i) => {
    o.set(r, 1e6 + i);
  }), (r) => {
    const i = [];
    let c = [];
    for (let f = 0; f < r.length; f++) {
      const d = r[f], m = d[0] === "[", g = o.has(d);
      m || g ? (c.length > 0 && (c.sort(), i.push(...c), c = []), i.push(d)) : c.push(d);
    }
    return c.length > 0 && (c.sort(), i.push(...c)), i;
  };
}, Pw = (n) => ({
  cache: Bw(n.cacheSize),
  parseClassName: Yw(n),
  sortModifiers: qw(n),
  postfixLookupClassGroupIds: Xw(n),
  ...Nw(n)
}), Xw = (n) => {
  const o = /* @__PURE__ */ Object.create(null), r = n.postfixLookupClassGroups;
  if (r)
    for (let i = 0; i < r.length; i++)
      o[r[i]] = !0;
  return o;
}, Kw = /\s+/, Fw = (n, o) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: c,
    sortModifiers: f,
    postfixLookupClassGroupIds: d
  } = o, m = [], g = n.trim().split(Kw);
  let h = "";
  for (let y = g.length - 1; y >= 0; y -= 1) {
    const x = g[y], {
      isExternal: v,
      modifiers: E,
      hasImportantModifier: A,
      baseClassName: T,
      maybePostfixModifierPosition: O
    } = r(x);
    if (v) {
      h = x + (h.length > 0 ? " " + h : h);
      continue;
    }
    let w = !!O, M;
    if (w) {
      const G = T.substring(0, O);
      M = i(G);
      const z = M && d[M] ? i(T) : void 0;
      z && z !== M && (M = z, w = !1);
    } else
      M = i(T);
    if (!M) {
      if (!w) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (M = i(T), !M) {
        h = x + (h.length > 0 ? " " + h : h);
        continue;
      }
      w = !1;
    }
    const R = E.length === 0 ? "" : E.length === 1 ? E[0] : f(E).join(":"), N = A ? R + Oh : R, I = N + M;
    if (m.indexOf(I) > -1)
      continue;
    m.push(I);
    const q = c(M, w);
    for (let G = 0; G < q.length; ++G) {
      const z = q[G];
      m.push(N + z);
    }
    h = x + (h.length > 0 ? " " + h : h);
  }
  return h;
}, Qw = (...n) => {
  let o = 0, r, i, c = "";
  for (; o < n.length; )
    (r = n[o++]) && (i = vx(r)) && (c && (c += " "), c += i);
  return c;
}, vx = (n) => {
  if (typeof n == "string")
    return n;
  let o, r = "";
  for (let i = 0; i < n.length; i++)
    n[i] && (o = vx(n[i])) && (r && (r += " "), r += o);
  return r;
}, Zw = (n, ...o) => {
  let r, i, c, f;
  const d = (g) => {
    const h = o.reduce((y, x) => x(y), n());
    return r = Pw(h), i = r.cache.get, c = r.cache.set, f = m, m(g);
  }, m = (g) => {
    const h = i(g);
    if (h)
      return h;
    const y = Fw(g, r);
    return c(g, y), y;
  };
  return f = d, (...g) => f(Qw(...g));
}, $w = [], Cn = (n) => {
  const o = (r) => r[n] || $w;
  return o.isThemeGetter = !0, o;
}, xx = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Sx = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Jw = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Ww = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, eA = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, tA = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, nA = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, lA = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ea = (n) => Jw.test(n), ft = (n) => !!n && !Number.isNaN(Number(n)), bo = (n) => !!n && Number.isInteger(Number(n)), qd = (n) => n.endsWith("%") && ft(n.slice(0, -1)), Go = (n) => Ww.test(n), Ex = () => !0, oA = (n) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  eA.test(n) && !tA.test(n)
), dm = () => !1, aA = (n) => nA.test(n), rA = (n) => lA.test(n), iA = (n) => !De(n) && !je(n), sA = (n) => n.startsWith("@container") && (n[10] === "/" && n[11] !== void 0 || n[11] === "s" && n[16] !== void 0 && n.startsWith("-size/", 10) || n[11] === "n" && n[18] !== void 0 && n.startsWith("-normal/", 10)), cA = (n) => Ua(n, _x, dm), De = (n) => xx.test(n), cr = (n) => Ua(n, wx, oA), qy = (n) => Ua(n, bA, ft), uA = (n) => Ua(n, Mx, Ex), fA = (n) => Ua(n, Ax, dm), Py = (n) => Ua(n, Cx, dm), dA = (n) => Ua(n, Rx, rA), zc = (n) => Ua(n, Tx, aA), je = (n) => Sx.test(n), os = (n) => Er(n, wx), hA = (n) => Er(n, Ax), Xy = (n) => Er(n, Cx), mA = (n) => Er(n, _x), pA = (n) => Er(n, Rx), Dc = (n) => Er(n, Tx, !0), gA = (n) => Er(n, Mx, !0), Ua = (n, o, r) => {
  const i = xx.exec(n);
  return i ? i[1] ? o(i[1]) : r(i[2]) : !1;
}, Er = (n, o, r = !1) => {
  const i = Sx.exec(n);
  return i ? i[1] ? o(i[1]) : r : !1;
}, Cx = (n) => n === "position" || n === "percentage", Rx = (n) => n === "image" || n === "url", _x = (n) => n === "length" || n === "size" || n === "bg-size", wx = (n) => n === "length", bA = (n) => n === "number", Ax = (n) => n === "family-name", Mx = (n) => n === "number" || n === "weight", Tx = (n) => n === "shadow", yA = () => {
  const n = Cn("color"), o = Cn("font"), r = Cn("text"), i = Cn("font-weight"), c = Cn("tracking"), f = Cn("leading"), d = Cn("breakpoint"), m = Cn("container"), g = Cn("spacing"), h = Cn("radius"), y = Cn("shadow"), x = Cn("inset-shadow"), v = Cn("text-shadow"), E = Cn("drop-shadow"), A = Cn("blur"), T = Cn("perspective"), O = Cn("aspect"), w = Cn("ease"), M = Cn("animate"), R = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], N = () => [
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
  ], I = () => [...N(), je, De], q = () => ["auto", "hidden", "clip", "visible", "scroll"], G = () => ["auto", "contain", "none"], z = () => [je, De, g], P = () => [Ea, "full", "auto", ...z()], te = () => [bo, "none", "subgrid", je, De], ie = () => ["auto", {
    span: ["full", bo, je, De]
  }, bo, je, De], fe = () => [bo, "auto", je, De], ne = () => ["auto", "min", "max", "fr", je, De], he = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], be = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], V = () => ["auto", ...z()], H = () => [Ea, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...z()], F = () => [Ea, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...z()], ve = () => [Ea, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...z()], se = () => [n, je, De], D = () => [...N(), Xy, Py, {
    position: [je, De]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], le = () => ["auto", "cover", "contain", mA, cA, {
    size: [je, De]
  }], oe = () => [qd, os, cr], pe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    je,
    De
  ], _e = () => ["", ft, os, cr], qe = () => ["solid", "dashed", "dotted", "double"], Ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Te = () => [ft, qd, Xy, Py], at = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    A,
    je,
    De
  ], pt = () => ["none", ft, je, De], ze = () => ["none", ft, je, De], et = () => [ft, je, De], Ne = () => [Ea, "full", ...z()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Go],
      breakpoint: [Go],
      color: [Ex],
      container: [Go],
      "drop-shadow": [Go],
      ease: ["in", "out", "in-out"],
      font: [iA],
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
        aspect: ["auto", "square", Ea, De, je, O]
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
      "container-named": [sA],
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
        "break-after": R()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": R()
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
        basis: [Ea, "full", "auto", m, ...z()]
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
        flex: [ft, Ea, "auto", "initial", "none", De]
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
        col: ie()
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
        row: ie()
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
        "auto-cols": ne()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ne()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: z()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": z()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": z()
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
        p: z()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: z()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: z()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: z()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: z()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: z()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: z()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: z()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: z()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: z()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: z()
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
        "space-x": z()
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
        "space-y": z()
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
        text: ["base", r, os, cr]
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
        font: [i, gA, uA]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", qd, De]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [hA, fA, o]
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
        "line-clamp": [ft, "none", je, qy]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          f,
          ...z()
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
        placeholder: se()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: se()
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
        decoration: se()
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
        indent: z()
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
        bg: D()
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
        bg: le()
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
        }, pA, dA]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: se()
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
        from: se()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: se()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: se()
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
        border: se()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": se()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": se()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": se()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": se()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": se()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": se()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": se()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": se()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": se()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": se()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: se()
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
        outline: ["", ft, os, cr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: se()
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
        shadow: se()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", x, Dc, zc]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": se()
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
        ring: se()
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
        "ring-offset": se()
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
        "inset-ring": se()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", v, Dc, zc]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": se()
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
        "mask-linear-from": se()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": se()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Te()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Te()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": se()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": se()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Te()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Te()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": se()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": se()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Te()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Te()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": se()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": se()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Te()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Te()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": se()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": se()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Te()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Te()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": se()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": se()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Te()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Te()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": se()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": se()
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
        "mask-radial-from": se()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": se()
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
        "mask-conic-from": se()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": se()
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
        mask: D()
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
        mask: le()
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
        blur: at()
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
          E,
          Dc,
          zc
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": se()
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
        "backdrop-blur": at()
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
        "border-spacing": z()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": z()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": z()
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
        ease: ["linear", "initial", w, je, De]
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
        animate: ["none", M, je, De]
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
        perspective: [T, je, De]
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
        accent: se()
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
        caret: se()
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
        "scrollbar-thumb": se()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": se()
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
        "scroll-m": z()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": z()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": z()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": z()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": z()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": z()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": z()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": z()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": z()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": z()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": z()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": z()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": z()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": z()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": z()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": z()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": z()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": z()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": z()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": z()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": z()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": z()
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
        fill: ["none", ...se()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ft, os, cr, qy]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...se()]
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
}, vA = /* @__PURE__ */ Zw(yA);
function We(...n) {
  return vA(Fv(n));
}
const xA = di(
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
function xo({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: i = !1,
  ...c
}) {
  const f = i ? Zv : "button";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": r,
      className: We(xA({ variant: o, size: r, className: n })),
      ...c
    }
  );
}
function Ky(n) {
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
function SA(n) {
  const [o, r] = b.useState(() => Ky(n));
  return b.useEffect(() => {
    if (!n) return;
    const i = () => r(Ky(n));
    i();
    const c = new MutationObserver(i);
    c.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    }), document.body && c.observe(document.body, {
      attributes: !0,
      attributeFilter: ["class", "data-theme", "data-mode"]
    });
    const f = window.matchMedia?.("(prefers-color-scheme: dark)");
    return f?.addEventListener("change", i), () => {
      c.disconnect(), f?.removeEventListener("change", i);
    };
  }, [n]), o;
}
const Ox = (...n) => n.filter((o, r, i) => !!o && o.trim() !== "" && i.indexOf(o) === r).join(" ").trim();
const EA = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const CA = (n) => n.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, r, i) => i ? i.toUpperCase() : r.toLowerCase()
);
const Fy = (n) => {
  const o = CA(n);
  return o.charAt(0).toUpperCase() + o.slice(1);
};
var Pd = {
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
const RA = (n) => {
  for (const o in n)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
  return !1;
}, _A = b.createContext({}), wA = () => b.useContext(_A), AA = b.forwardRef(
  ({ color: n, size: o, strokeWidth: r, absoluteStrokeWidth: i, className: c = "", children: f, iconNode: d, ...m }, g) => {
    const {
      size: h = 24,
      strokeWidth: y = 2,
      absoluteStrokeWidth: x = !1,
      color: v = "currentColor",
      className: E = ""
    } = wA() ?? {}, A = i ?? x ? Number(r ?? y) * 24 / Number(o ?? h) : r ?? y;
    return b.createElement(
      "svg",
      {
        ref: g,
        ...Pd,
        width: o ?? h ?? Pd.width,
        height: o ?? h ?? Pd.height,
        stroke: n ?? v,
        strokeWidth: A,
        className: Ox("lucide", E, c),
        ...!f && !RA(m) && { "aria-hidden": "true" },
        ...m
      },
      [
        ...d.map(([T, O]) => b.createElement(T, O)),
        ...Array.isArray(f) ? f : [f]
      ]
    );
  }
);
const Rn = (n, o) => {
  const r = b.forwardRef(
    ({ className: i, ...c }, f) => b.createElement(AA, {
      ref: f,
      iconNode: o,
      className: Ox(
        `lucide-${EA(Fy(n))}`,
        `lucide-${n}`,
        i
      ),
      ...c
    })
  );
  return r.displayName = Fy(n), r;
};
const MA = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], TA = Rn("check", MA);
const OA = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], kA = Rn("chevron-down", OA);
const NA = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], zA = Rn("chevron-right", NA);
const DA = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Qy = Rn("circle", DA);
const jA = [
  ["path", { d: "m15 15 6 6", key: "1s409w" }],
  ["path", { d: "m15 9 6-6", key: "ko1vev" }],
  ["path", { d: "M21 16v5h-5", key: "1ck2sf" }],
  ["path", { d: "M21 8V3h-5", key: "1qoq8a" }],
  ["path", { d: "M3 16v5h5", key: "1t08am" }],
  ["path", { d: "m3 21 6-6", key: "wwnumi" }],
  ["path", { d: "M3 8V3h5", key: "1ln10m" }],
  ["path", { d: "M9 9 3 3", key: "v551iv" }]
], LA = Rn("expand", jA);
const VA = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], IA = Rn("eye", VA);
const HA = [
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
], UA = Rn("eye-off", HA);
const BA = [
  ["path", { d: "M3.704 14.467a10 8 0 1 1 3.115 2.375", key: "wxgc5m" }],
  ["path", { d: "M7 22a5 5 0 0 1-2-3.994", key: "1xp6a4" }],
  ["circle", { cx: "5", cy: "16", r: "2", key: "18csp3" }]
], GA = Rn("lasso", BA);
const YA = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
], qA = Rn("maximize", YA);
const PA = [["path", { d: "M5 12h14", key: "1ays0h" }]], kx = Rn("minus", PA);
const XA = [
  ["path", { d: "M12 2v20", key: "t6zp3m" }],
  ["path", { d: "m15 19-3 3-3-3", key: "11eu04" }],
  ["path", { d: "m19 9 3 3-3 3", key: "1mg7y2" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "m5 9-3 3 3 3", key: "j64kie" }],
  ["path", { d: "m9 5 3-3 3 3", key: "l8vdw6" }]
], KA = Rn("move", XA);
const FA = [
  [
    "path",
    {
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
      key: "2hea0t"
    }
  ]
], QA = Rn("pentagon", FA);
const ZA = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Nx = Rn("plus", ZA);
const $A = [
  [
    "path",
    {
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
      key: "1bo67w"
    }
  ],
  ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", key: "1bkyp8" }],
  ["circle", { cx: "17.5", cy: "17.5", r: "3.5", key: "w3z12y" }]
], zx = Rn("shapes", $A);
const JA = [
  ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", key: "17vawe" }],
  ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", key: "chjx8e" }],
  ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6", key: "lav6yq" }],
  ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3", key: "1pxi2q" }]
], WA = Rn("shrink", JA);
const eM = [["path", { d: "M22 2 2 22", key: "y4kqgn" }]], tM = Rn("slash", eM);
const nM = [
  ["circle", { cx: "19", cy: "5", r: "2", key: "mhkx31" }],
  ["circle", { cx: "5", cy: "19", r: "2", key: "v8kfzx" }],
  ["path", { d: "M5 17A12 12 0 0 1 17 5", key: "1okkup" }]
], lM = Rn("spline", nM);
const oM = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], aM = Rn("square", oM);
const rM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Dx = Rn("x", rM);
function jx({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(ER, { "data-slot": "accordion", ...n });
}
function wa({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    CR,
    {
      "data-slot": "accordion-item",
      className: We("border-b last:border-b-0", n),
      ...o
    }
  );
}
function Aa({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(RR, { className: "flex", children: /* @__PURE__ */ S.jsxs(
    _R,
    {
      "data-slot": "accordion-trigger",
      className: We(
        "group/accordion-trigger flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        n
      ),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsxs("span", { className: "relative size-3.5 shrink-0", "aria-hidden": !0, children: [
          /* @__PURE__ */ S.jsx(Nx, { className: "absolute inset-0 size-3.5 text-muted-foreground transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-75 group-data-[state=open]/accordion-trigger:opacity-0" }),
          /* @__PURE__ */ S.jsx(kx, { className: "absolute inset-0 size-3.5 scale-75 text-muted-foreground opacity-0 transition-[opacity,transform] duration-150 ease-out group-data-[state=open]/accordion-trigger:scale-100 group-data-[state=open]/accordion-trigger:opacity-100" })
        ] })
      ]
    }
  ) });
}
function Ma({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    wR,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...r,
      children: /* @__PURE__ */ S.jsx("div", { className: We("pt-0 pb-4", n), children: o })
    }
  );
}
function Lx({ className: n, ...o }) {
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
function Vx({ className: n, ...o }) {
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
function Ix({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: We("leading-none font-semibold", n),
      ...o
    }
  );
}
function Hx({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: We("px-6", n),
      ...o
    }
  );
}
function iM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(S0, { "data-slot": "collapsible", ...n });
}
function sM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    y0,
    {
      "data-slot": "collapsible-trigger",
      ...n
    }
  );
}
function cM({
  ...n
}) {
  return /* @__PURE__ */ S.jsx(
    x0,
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
  state: i = "value"
}) {
  const {
    current: c
  } = b.useRef(n !== void 0), [f, d] = b.useState(o), m = c ? n : f, g = b.useCallback((h) => {
    c || d(h);
  }, []);
  return [m, g];
}
const hm = {
  ...xr
}, Zy = {};
function Nl(n, o) {
  const r = b.useRef(Zy);
  return r.current === Zy && (r.current = n(o)), r;
}
const Xd = hm.useInsertionEffect, uM = (
  // React 17 doesn't have useInsertionEffect.
  Xd && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Xd !== hm.useLayoutEffect ? Xd : (n) => n()
);
function Fe(n) {
  const o = Nl(fM).current;
  return o.next = n, uM(o.effect), o.trampoline;
}
function fM() {
  const n = {
    next: void 0,
    callback: dM,
    trampoline: (...o) => n.callback?.(...o),
    effect: () => {
      n.callback = n.next;
    }
  };
  return n;
}
function dM() {
}
const hM = () => {
}, Qe = typeof document < "u" ? b.useLayoutEffect : hM, Ux = /* @__PURE__ */ b.createContext({
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
function mM() {
  return b.useContext(Ux);
}
function pM(n) {
  const {
    children: o,
    elementsRef: r,
    labelsRef: i,
    onMapChange: c
  } = n, f = Fe(c), [, d] = b.useState(!1), m = Nl(bM).current, g = Nl(gM).current, h = b.useRef(0), y = b.useRef(!0), x = b.useRef([]), v = b.useRef(null), E = Fe(() => {
    y.current || (y.current = !0, d((I) => !I));
  }), A = Fe((I, q) => {
    g.set(I, q), E();
  }), T = Fe((I) => {
    g.delete(I), E();
  }), O = Fe((I) => {
    const q = /* @__PURE__ */ new Map();
    return r.current.length = 0, i && (i.current.length = 0), I.forEach((G) => {
      q.set(G.element, {
        ...G.registration.metadata ?? {},
        index: G.index
      }), r.current[G.index] = G.element, i && (i.current[G.index] = G.registration.label !== void 0 ? G.registration.label : G.registration.textRef?.current?.textContent ?? G.element.textContent);
    }), h.current = r.current.length, q;
  });
  function w(I) {
    if (v.current?.disconnect(), v.current = null, typeof MutationObserver != "function" || I.length < 2)
      return;
    const q = new MutationObserver((z) => {
      if (!xM(z))
        return;
      let P = null;
      for (const te of I)
        if (te.isConnected) {
          if (P && Bx(P, te) > 0) {
            q.disconnect(), E();
            return;
          }
          P = te;
        }
    });
    v.current = q;
    const G = /* @__PURE__ */ new Set();
    for (let z = 1; z < I.length; z += 1) {
      const P = vM(I[z - 1], I[z]);
      P && G.add(P);
    }
    G.forEach((z) => q.observe(z, {
      childList: !0
    }));
  }
  const M = Fe(() => {
    const [I, q] = yM(g), G = O(I);
    w(q), x.current = I, y.current = !1, m.forEach((z) => z(G)), f(G);
  });
  Qe(() => (y.current || O(x.current), () => {
    r.current = [], i && (i.current = []);
  }), [r, i, O]), Qe(() => {
    y.current && M();
  }), Qe(() => () => {
    v.current?.disconnect(), y.current = !0;
  }, []);
  const R = Fe((I) => (m.add(I), () => {
    m.delete(I);
  })), N = b.useMemo(() => ({
    register: A,
    unregister: T,
    subscribeMapChange: R,
    nextIndexRef: h
  }), [A, T, R, h]);
  return /* @__PURE__ */ S.jsx(Ux.Provider, {
    value: N,
    children: o
  });
}
function gM() {
  return /* @__PURE__ */ new Map();
}
function bM() {
  return /* @__PURE__ */ new Set();
}
function yM(n) {
  const o = /* @__PURE__ */ new Set(), r = [], i = [];
  n.forEach((f, d) => {
    if (!d.isConnected)
      return;
    const m = f.index, g = {
      index: m ?? -1,
      element: d,
      registration: f
    };
    m === null ? i.push(g) : m >= 0 && (o.add(m), r.push(g));
  });
  let c = 0;
  return i.sort((f, d) => Bx(f.element, d.element)), i.forEach((f) => {
    for (; o.has(c); )
      c += 1;
    f.index = c, r.push(f), c += 1;
  }), o.size > 0 && r.sort((f, d) => f.index - d.index), [r, i.map((f) => f.element)];
}
function vM(n, o) {
  let r = n.parentElement;
  for (; r && !r.contains(o); )
    r = r.parentElement;
  return r;
}
function xM(n) {
  for (const o of n)
    for (let r = 0; r < o.removedNodes.length; r += 1)
      if (o.removedNodes[r].isConnected)
        return !0;
  return !1;
}
function Bx(n, o) {
  return n.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}
function SM(n, o) {
  return function(i, ...c) {
    const f = new URL(n);
    return f.searchParams.set("code", i.toString()), c.forEach((d) => f.searchParams.append("args[]", d)), `${o} error #${i}; visit ${f} for the full message.`;
  };
}
const Eo = SM("https://base-ui.com/production-error", "Base UI");
function pr(n, o, r, i) {
  const c = Nl(Gx).current;
  return CM(c, n, o, r, i) && Yx(c, [n, o, r, i]), c.callback;
}
function EM(n) {
  const o = Nl(Gx).current;
  return RM(o, n) && Yx(o, n), o.callback;
}
function Gx() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function CM(n, o, r, i, c) {
  return n.refs[0] !== o || n.refs[1] !== r || n.refs[2] !== i || n.refs[3] !== c;
}
function RM(n, o) {
  return n.refs.length !== o.length || n.refs.some((r, i) => r !== o[i]);
}
function Yx(n, o) {
  if (n.refs = o, o.every((r) => r == null)) {
    n.callback = null;
    return;
  }
  n.callback = (r) => {
    if (n.cleanup && (n.cleanup(), n.cleanup = null), r != null) {
      const i = Array(o.length).fill(null);
      for (let c = 0; c < o.length; c += 1) {
        const f = o[c];
        if (f != null)
          switch (typeof f) {
            case "function": {
              const d = f(r);
              typeof d == "function" && (i[c] = d);
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
                const d = i[c];
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
const _M = parseInt(b.version, 10);
function mm(n) {
  return _M >= n;
}
function $y(n) {
  if (!/* @__PURE__ */ b.isValidElement(n))
    return null;
  const o = n, r = o.props;
  return (mm(19) ? r?.ref : o.ref) ?? null;
}
function kh(n, o) {
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
const li = Object.freeze([]), gl = Object.freeze({});
function wM(n, o) {
  const r = {};
  for (const i in n) {
    const c = n[i];
    if (o?.hasOwnProperty(i)) {
      const f = o[i](c);
      f != null && Object.assign(r, f);
      continue;
    }
    c === !0 ? r[`data-${i.toLowerCase()}`] = "" : c && (r[`data-${i.toLowerCase()}`] = c.toString());
  }
  return r;
}
function AM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
function MM(n, o) {
  return typeof n == "function" ? n(o) : n;
}
const pm = {};
function ii(n, o, r, i, c) {
  if (!r && !i && !c && !n)
    return eu(o);
  let f = eu(n);
  return o && (f = cs(f, o)), r && (f = cs(f, r)), i && (f = cs(f, i)), c && (f = cs(f, c)), f;
}
function TM(n) {
  if (n.length === 0)
    return pm;
  if (n.length === 1)
    return eu(n[0]);
  let o = eu(n[0]);
  for (let r = 1; r < n.length; r += 1)
    o = cs(o, n[r]);
  return o;
}
function eu(n) {
  return gm(n) ? {
    ...Px(n, pm)
  } : OM(n);
}
function cs(n, o) {
  return gm(o) ? Px(o, n) : kM(n, o);
}
function OM(n) {
  const o = {
    ...n
  };
  for (const r in o) {
    const i = o[r];
    qx(r, i) && (o[r] = Xx(i));
  }
  return o;
}
function kM(n, o) {
  if (!o)
    return n;
  for (const r in o) {
    const i = o[r];
    switch (r) {
      case "style": {
        n[r] = kh(n.style, i);
        break;
      }
      case "className": {
        n[r] = Kx(n.className, i);
        break;
      }
      default:
        qx(r, i) ? n[r] = NM(n[r], i) : n[r] = i;
    }
  }
  return n;
}
function qx(n, o) {
  const r = n.charCodeAt(0), i = n.charCodeAt(1), c = n.charCodeAt(2);
  return r === 111 && i === 110 && c >= 65 && c <= 90 && (typeof o == "function" || typeof o > "u");
}
function gm(n) {
  return typeof n == "function";
}
function Px(n, o) {
  return gm(n) ? n(o) : n ?? pm;
}
function NM(n, o) {
  return o ? n ? (...r) => {
    const i = r[0];
    if (Fx(i)) {
      const f = i;
      tu(f);
      const d = o(...r);
      return f.baseUIHandlerPrevented || n?.(...r), d;
    }
    const c = o(...r);
    return n?.(...r), c;
  } : Xx(o) : n;
}
function Xx(n) {
  return n && ((...o) => {
    const r = o[0];
    return Fx(r) && tu(r), n(...o);
  });
}
function tu(n) {
  return n.preventBaseUIHandler = () => {
    n.baseUIHandlerPrevented = !0;
  }, n;
}
function Kx(n, o) {
  return o ? n ? o + " " + n : o : n;
}
function Fx(n) {
  return n != null && typeof n == "object" && "nativeEvent" in n;
}
function Zl(n, o, r = {}) {
  const i = o.render, c = zM(o, r);
  if (r.enabled === !1)
    return null;
  const f = r.state ?? gl;
  return LM(n, i, c, f);
}
function zM(n, o = {}) {
  const {
    className: r,
    style: i,
    render: c
  } = n, {
    state: f = gl,
    ref: d,
    props: m,
    stateAttributesMapping: g,
    enabled: h = !0
  } = o, y = h ? AM(r, f) : void 0, x = h ? MM(i, f) : void 0, v = h ? wM(f, g) : gl, E = h && m ? DM(m) : void 0, A = h ? kh(v, E) ?? {} : gl;
  return typeof document < "u" && (h ? Array.isArray(d) ? A.ref = EM([A.ref, $y(c), ...d]) : A.ref = pr(A.ref, $y(c), d) : pr(null, null)), h ? (y !== void 0 && (A.className = Kx(A.className, y)), x !== void 0 && (A.style = kh(A.style, x)), A) : gl;
}
function DM(n) {
  return Array.isArray(n) ? TM(n) : ii(void 0, n);
}
const jM = /* @__PURE__ */ Symbol.for("react.lazy");
function LM(n, o, r, i) {
  if (o) {
    if (typeof o == "function")
      return o(r, i);
    const c = ii(r, o.props);
    c.ref = r.ref;
    let f = o;
    return f?.$$typeof === jM && (f = b.Children.toArray(o)[0]), /* @__PURE__ */ b.cloneElement(f, c);
  }
  if (n && typeof n == "string")
    return VM(n, r);
  throw new Error(Eo(8));
}
function VM(n, o) {
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
let Jy = 0;
function IM(n, o = "mui") {
  const [r, i] = b.useState(n), c = n || r;
  return b.useEffect(() => {
    r == null && (Jy += 1, i(`${o}-${Jy}`));
  }, [r, o]), c;
}
const Wy = hm.useId;
function bm(n, o) {
  if (Wy !== void 0) {
    const r = Wy();
    return n ?? (o ? `${o}-${r}` : r);
  }
  return IM(n, o);
}
function vu(n) {
  return bm(n, "base-ui");
}
const Xl = "none", Qx = "trigger-press", HM = "trigger-hover", ym = "outside-press", UM = "item-press", BM = "close-press", ev = "clear-press", fs = "input-change", yo = "input-clear", GM = "input-press", xu = "focus-out", vm = "escape-key", Nh = "list-navigation", xm = "keyboard", Sm = "pointer", YM = "cancel-open";
function vt(n, o, r, i) {
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
function qM(n, o, r) {
  const i = r ?? gl;
  return {
    reason: n,
    event: o ?? new Event("base-ui"),
    ...i
  };
}
function Zx(n) {
  b.useEffect(n, li);
}
const jc = null;
class PM {
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
    const r = this.callbacks, i = this.callbacksCount;
    if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, i > 0)
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
let Lc = new PM();
class vo {
  static create() {
    return new vo();
  }
  static request(o) {
    return Lc.request(o);
  }
  static cancel(o) {
    return Lc.cancel(o);
  }
  currentId = jc;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(o) {
    this.cancel(), this.currentId = Lc.request(() => {
      this.currentId = jc, o();
    });
  }
  cancel = () => {
    this.currentId !== jc && (Lc.cancel(this.currentId), this.currentId = jc);
  };
  disposeEffect = () => this.cancel;
}
function hs() {
  const n = Nl(vo.create).current;
  return Zx(n.disposeEffect), n;
}
function Em(n, o = !1, r = !1) {
  const [i, c] = b.useState(n && o ? "idle" : void 0), [f, d] = b.useState(n);
  return n && !f && (d(!0), c("starting")), !n && f && i !== "ending" && !r && c("ending"), !n && !f && i === "ending" && c(void 0), Qe(() => {
    if (!n && f && i !== "ending" && r) {
      const m = vo.request(() => {
        c("ending");
      });
      return () => {
        vo.cancel(m);
      };
    }
  }, [n, f, i, r]), Qe(() => {
    if (!n || o)
      return;
    const m = vo.request(() => {
      c(void 0);
    });
    return () => {
      vo.cancel(m);
    };
  }, [o, n]), Qe(() => {
    if (!n || !o)
      return;
    n && f && i !== "idle" && c("starting");
    const m = vo.request(() => {
      c("idle");
    });
    return () => {
      vo.cancel(m);
    };
  }, [o, n, f, i]), {
    mounted: f,
    setMounted: d,
    transitionStatus: i
  };
}
function XM(n = {}) {
  const {
    guess: o,
    label: r,
    metadata: i,
    textRef: c,
    index: f
  } = n, {
    register: d,
    unregister: m,
    subscribeMapChange: g,
    nextIndexRef: h
  } = mM(), y = b.useRef(-1), [x, v] = b.useState(f == null && o ? () => {
    if (y.current === -1) {
      const O = h.current;
      h.current += 1, y.current = O;
    }
    return y.current;
  } : -1), E = f ?? x, A = b.useRef(null), T = b.useCallback((O) => {
    const w = A.current;
    w && m(w), A.current = O, O && d(O, {
      metadata: i ?? null,
      index: f ?? null,
      label: r,
      textRef: c
    });
  }, [f, d, m, i, r, c]);
  return Qe(() => {
    if (f == null)
      return g((O) => {
        const w = A.current ? O.get(A.current)?.index : null;
        w != null && v(w);
      });
  }, [f, g]), {
    ref: T,
    index: E
  };
}
let tv = /* @__PURE__ */ (function(n) {
  return n.startingStyle = "data-starting-style", n.endingStyle = "data-ending-style", n;
})({});
const KM = {
  "data-starting-style": ""
}, FM = {
  "data-ending-style": ""
}, Su = {
  transitionStatus(n) {
    return n === "starting" ? KM : n === "ending" ? FM : null;
  }
}, QM = /* @__PURE__ */ b.createContext(void 0);
function ZM(n = !1) {
  const o = b.useContext(QM);
  if (o === void 0 && !n)
    throw new Error(Eo(16));
  return o;
}
function $M(n) {
  const {
    focusableWhenDisabled: o,
    disabled: r,
    composite: i = !1,
    tabIndex: c = 0,
    isNativeButton: f
  } = n, d = i && o !== !1, m = i && o === !1;
  return {
    props: b.useMemo(() => {
      const h = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(y) {
          r && o && y.key !== "Tab" && y.preventDefault();
        }
      };
      return i || (h.tabIndex = c, !f && r && (h.tabIndex = o ? c : -1)), (f && (o || d) || !f && r) && (h["aria-disabled"] = r), f && (!o || m) && (h.disabled = r), h;
    }, [i, r, o, d, m, f, c])
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
    tabIndex: i = 0,
    native: c = !0,
    composite: f
  } = n, d = b.useRef(null), m = ZM(!0), g = f ?? m !== void 0, {
    props: h
  } = $M({
    focusableWhenDisabled: r,
    disabled: o,
    composite: g,
    tabIndex: i,
    isNativeButton: c
  }), y = b.useCallback(() => {
    const E = d.current;
    Kd(E) && g && o && h.disabled === void 0 && E.disabled && (E.disabled = !1);
  }, [o, h.disabled, g]);
  Qe(y, [y]);
  const x = b.useCallback((E = {}) => {
    const {
      onClick: A,
      onMouseDown: T,
      onKeyUp: O,
      onKeyDown: w,
      onPointerDown: M,
      ...R
    } = E;
    return ii({
      onClick(N) {
        if (o) {
          N.preventDefault();
          return;
        }
        A?.(N);
      },
      onMouseDown(N) {
        o || T?.(N);
      },
      onKeyDown(N) {
        if (o || (tu(N), w?.(N), N.baseUIHandlerPrevented))
          return;
        const I = N.target === N.currentTarget, q = N.currentTarget, G = Kd(q), z = !c && JM(q), P = I && (c ? G : !z), te = N.key === "Enter", ie = N.key === " ", fe = q.getAttribute("role"), ne = fe?.startsWith("menuitem") || fe === "option" || fe === "gridcell";
        if (I && g && ie) {
          if (N.defaultPrevented && ne)
            return;
          N.preventDefault(), (!c || G) && (N.preventBaseUIHandler(), Kc(q, N));
          return;
        }
        if (!P || c || !ie && !te) {
          I && z && ie && N.preventDefault();
          return;
        }
        N.defaultPrevented || (N.preventDefault(), te && (N.preventBaseUIHandler(), Kc(q, N)));
      },
      onKeyUp(N) {
        if (!o) {
          if (tu(N), O?.(N), N.target === N.currentTarget && c && g && Kd(N.currentTarget) && N.key === " ") {
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
        M?.(N);
      }
    }, c ? {
      type: "button"
    } : {
      role: "button"
    }, h, R);
  }, [o, h, g, c]), v = Fe((E) => {
    d.current = E, y();
  });
  return {
    getButtonProps: x,
    buttonRef: v
  };
}
function Kd(n) {
  return Kt(n) && n.tagName === "BUTTON";
}
function JM(n) {
  return Kt(n) && n.tagName === "A" && !!n.href;
}
function Gt(n, o, r, i) {
  return n.addEventListener(o, r, i), () => {
    n.removeEventListener(o, r, i);
  };
}
function pl(n) {
  const o = Nl(WM, n).current;
  return o.next = n, Qe(o.effect), o;
}
function WM(n) {
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
function e2(n, o = !1) {
  const r = hs();
  return Fe((i, c = null) => {
    r.cancel();
    const f = Yo(n);
    if (f == null)
      return;
    const d = f, m = () => {
      hi.flushSync(i);
    };
    if (typeof d.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      i();
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
    ref: i,
    onComplete: c
  } = n, f = Fe(c), d = e2(i, r);
  b.useEffect(() => {
    if (!o)
      return;
    const m = new AbortController();
    return d(f, m.signal), () => {
      m.abort();
    };
  }, [o, r, f, d]);
}
function t2() {
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
  userAgent: n2,
  platform: l2,
  maxTouchPoints: o2
} = t2(), Cu = n2.toLowerCase(), ms = l2.toLowerCase(), As = /^i(os$|p)/.test(ms) || ms === "macintel" && o2 > 1, nv = "android", nu = ms === nv || Cu.includes(nv), a2 = !As && ms.startsWith("mac");
ms.startsWith("win");
const r2 = a2 || As, Cr = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), lv = !Cr && Cu.includes("firefox");
!Cr && Cu.includes("chrom");
const i2 = r2, $x = /jsdom|happydom/.test(Cu), as = 0;
class gr {
  static create() {
    return new gr();
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
function La() {
  const n = Nl(gr.create).current;
  return Zx(n.disposeEffect), n;
}
let ov = {}, av = {}, rv = "";
function Ru(n, o) {
  return Cs(n) ? n : o;
}
function iv(n, o, r) {
  return /hidden|clip/.test(n.getComputedStyle(Ru(o, r)).overflowY);
}
function s2(n) {
  if (typeof document > "u")
    return !1;
  const o = $t(n);
  return hn(o).innerWidth - o.documentElement.clientWidth > 0;
}
function c2(n) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const r = $t(n), i = r.documentElement, c = r.body, f = Ru(i, c), d = f.style.overflowY, m = i.style.scrollbarGutter;
  i.style.scrollbarGutter = "stable", f.style.overflowY = "scroll";
  const g = f.offsetWidth;
  f.style.overflowY = "hidden";
  const h = f.offsetWidth;
  return f.style.overflowY = d, i.style.scrollbarGutter = m, g === h;
}
function u2(n) {
  const o = $t(n), r = o.documentElement, i = o.body, c = Ru(r, i), f = {
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
function f2(n) {
  const o = $t(n), r = o.documentElement, i = o.body, c = hn(r);
  let f = 0, d = 0, m = !1;
  const g = vo.create();
  if (Cr && (c.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function h() {
    const E = c.getComputedStyle(r), A = c.getComputedStyle(i), w = (E.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    f = r.scrollTop, d = r.scrollLeft, ov = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    }, rv = r.style.scrollBehavior, av = {
      position: i.style.position,
      height: i.style.height,
      width: i.style.width,
      boxSizing: i.style.boxSizing,
      overflowY: i.style.overflowY,
      overflowX: i.style.overflowX,
      scrollBehavior: i.style.scrollBehavior
    };
    const M = r.scrollHeight > r.clientHeight, R = r.scrollWidth > r.clientWidth, N = E.overflowY === "scroll" || A.overflowY === "scroll", I = E.overflowX === "scroll" || A.overflowX === "scroll", q = Math.max(0, c.innerWidth - i.clientWidth), G = Math.max(0, c.innerHeight - i.clientHeight), z = parseFloat(A.marginTop) + parseFloat(A.marginBottom), P = parseFloat(A.marginLeft) + parseFloat(A.marginRight), te = Ru(r, i);
    if (m = c2(n), m) {
      r.style.scrollbarGutter = w, te.style.overflowY = "hidden", te.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: w,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (M || N) && (r.style.overflowY = "scroll"), (R || I) && (r.style.overflowX = "scroll"), Object.assign(i.style, {
      position: "relative",
      height: z || G ? `calc(100dvh - ${z + G}px)` : "100dvh",
      width: P || q ? `calc(100vw - ${P + q}px)` : "100vw",
      boxSizing: "border-box",
      // Assign the longhands that `cleanup` restores, so nothing is left behind.
      overflowY: "hidden",
      overflowX: "hidden",
      scrollBehavior: "unset"
    }), i.scrollTop = f, i.scrollLeft = d, r.setAttribute("data-base-ui-scroll-locked", ""), r.style.scrollBehavior = "unset";
  }
  function y() {
    Object.assign(r.style, ov), Object.assign(i.style, av), m || (r.scrollTop = f, r.scrollLeft = d, r.removeAttribute("data-base-ui-scroll-locked"), r.style.scrollBehavior = rv);
  }
  function x() {
    y(), g.request(h);
  }
  h();
  const v = Gt(c, "resize", x);
  return () => {
    g.cancel(), y(), typeof c.removeEventListener == "function" && v();
  };
}
class d2 {
  lockCount = 0;
  restore = null;
  timeoutLock = gr.create();
  timeoutUnlock = gr.create();
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
    const r = $t(o), i = r.documentElement, c = r.body, f = hn(i);
    if (iv(f, i, c)) {
      const m = new f.MutationObserver(() => {
        iv(f, i, c) || (m.disconnect(), this.restore = null, this.lock(o));
      }), g = {
        attributes: !0
      };
      m.observe(i, g), m.observe(c, g), this.restore = () => m.disconnect();
      return;
    }
    const d = As || !s2(o);
    this.restore = d ? u2(o) : f2(o);
  }
}
const h2 = new d2();
function m2(n = !0, o = null) {
  Qe(() => {
    if (n)
      return h2.acquire(o);
  }, [n, o]);
}
function kn(n) {
  n.preventDefault(), n.stopPropagation();
}
function p2(n) {
  return "nativeEvent" in n;
}
function Jx(n) {
  return n.pointerType === "" && n.isTrusted ? !0 : nu && n.pointerType ? n.type === "click" && n.buttons === 1 : n.detail === 0 && !n.pointerType;
}
function Cm(n) {
  return $x ? !1 : !nu && n.width === 0 && n.height === 0 || nu && n.width === 1 && n.height === 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  n.width < 1 && n.height < 1 && n.pressure === 0 && n.detail === 0 && n.pointerType === "touch";
}
function Fd(n, o) {
  return ["mouse", "pen"].includes(n);
}
function g2(n) {
  const o = n.type;
  return o === "click" || o === "mousedown" || o === "keydown" || o === "keyup";
}
const zh = "data-base-ui-focusable", b2 = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", fr = "ArrowLeft", dr = "ArrowRight", Rm = "ArrowUp", _u = "ArrowDown";
function Pl(n) {
  let o = n.activeElement;
  for (; o?.shadowRoot?.activeElement != null; )
    o = o.shadowRoot.activeElement;
  return o;
}
function it(n, o) {
  if (!n || !o)
    return !1;
  const r = o.getRootNode?.();
  if (n.contains(o))
    return !0;
  if (r && ui(r)) {
    let i = o;
    for (; i; ) {
      if (n === i)
        return !0;
      i = i.parentNode || i.host;
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
function y2(n) {
  return n.matches("html,body");
}
function _m(n) {
  return Kt(n) && n.matches(b2);
}
function Dh(n) {
  return n ? n.getAttribute("role") === "combobox" && _m(n) : !1;
}
function jh(n) {
  return n ? n.hasAttribute(zh) ? n : n.querySelector(`[${zh}]`) || n : null;
}
function si(...n) {
  return () => {
    for (let o = 0; o < n.length; o += 1) {
      const r = n[o];
      r && r();
    }
  };
}
const Wx = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, wm = {
  ...Wx,
  position: "fixed",
  top: 0,
  left: 0
}, Am = {
  ...Wx,
  position: "absolute"
}, lu = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const [i, c] = b.useState();
  Qe(() => {
    i2 && Cr && c("button");
  }, []);
  const f = {
    tabIndex: 0,
    // Role is only for VoiceOver
    role: i
  };
  return /* @__PURE__ */ S.jsx("span", {
    ...o,
    ref: r,
    style: wm,
    "aria-hidden": i ? void 0 : !0,
    ...f,
    "data-base-ui-focus-guard": ""
  });
});
function Vc(n, o, r) {
  return Math.floor(n / o) !== r;
}
function ps(n, o) {
  return o < 0 || o >= n.length;
}
function Zd(n, o) {
  return tl(n.current, {
    disabledIndices: o
  });
}
function sv(n, o) {
  return tl(n.current, {
    decrement: !0,
    startingIndex: n.current.length,
    disabledIndices: o
  });
}
function tl(n, {
  startingIndex: o = -1,
  decrement: r = !1,
  disabledIndices: i,
  amount: c = 1
} = {}) {
  let f = o;
  do
    f += r ? -c : c;
  while (f >= 0 && f <= n.length - 1 && ou(n, f, i));
  return f;
}
function v2(n, {
  event: o,
  orientation: r,
  loopFocus: i,
  onLoop: c,
  rtl: f,
  cols: d,
  disabledIndices: m,
  minIndex: g,
  maxIndex: h,
  prevIndex: y,
  stopEvent: x = !1
}) {
  let v = y, E;
  if (o.key === Rm ? E = "up" : o.key === _u && (E = "down"), E) {
    const A = [], T = [];
    let O = !1, w = 0;
    {
      let P = null, te = -1;
      n.forEach((ie, fe) => {
        if (ie == null)
          return;
        w += 1;
        const ne = ie.closest('[role="row"]');
        ne && (O = !0), (ne !== P || te === -1) && (P = ne, te += 1, A[te] = []), A[te].push(fe), T[fe] = te;
      });
    }
    let M = !1, R = 0;
    if (O)
      for (const P of A) {
        const te = P.length;
        te > R && (R = te), te !== d && (M = !0);
      }
    const N = M && w < n.length, I = R || d, q = (P) => {
      if (!M || y === -1)
        return;
      const te = T[y];
      if (te == null)
        return;
      const ie = A[te].indexOf(y), fe = P === "up" ? -1 : 1;
      for (let ne = te + fe, he = 0; he < A.length; he += 1, ne += fe) {
        if (ne < 0 || ne >= A.length) {
          if (!i || N)
            return;
          if (ne = ne < 0 ? A.length - 1 : 0, c) {
            const V = Math.min(ie, A[ne].length - 1), H = A[ne][V] ?? A[ne][0], F = c(o, y, H);
            ne = T[F] ?? ne;
          }
        }
        const be = A[ne];
        for (let V = Math.min(ie, be.length - 1); V >= 0; V -= 1) {
          const H = be[V];
          if (!ou(n, H, m))
            return H;
        }
      }
    }, G = (P) => {
      if (!N || y === -1)
        return;
      const te = y % I, ie = P === "up" ? -I : I, fe = h - h % I, ne = ur(h / I) + 1;
      for (let he = y - te + ie, be = 0; be < ne; be += 1, he += ie) {
        if (he < 0 || he > h) {
          if (!i)
            return;
          he = he < 0 ? fe : 0;
        }
        const V = Math.min(he + I - 1, h);
        for (let H = Math.min(he + te, V); H >= he; H -= 1)
          if (!ou(n, H, m))
            return H;
      }
    };
    x && kn(o);
    const z = q(E) ?? G(E);
    if (z !== void 0)
      v = z;
    else if (y === -1)
      v = E === "up" ? h : g;
    else if (v = tl(n, {
      startingIndex: y,
      amount: I,
      decrement: E === "up",
      disabledIndices: m
    }), i) {
      if (E === "up" && (y - I < g || v < 0)) {
        const P = y % I, te = h % I, ie = h - (te - P);
        te === P ? v = h : v = te > P ? ie : ie - I, c && (v = c(o, y, v));
      }
      E === "down" && y + I > h && (v = tl(n, {
        startingIndex: y % I - I,
        amount: I,
        disabledIndices: m
      }), c && (v = c(o, y, v)));
    }
    ps(n, v) && (v = y);
  }
  if (r === "both") {
    const A = ur(y / d);
    o.key === (f ? fr : dr) && (x && kn(o), y % d !== d - 1 ? (v = tl(n, {
      startingIndex: y,
      disabledIndices: m
    }), i && Vc(v, d, A) && (v = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))), Vc(v, d, A) && (v = y)), o.key === (f ? dr : fr) && (x && kn(o), y % d !== 0 ? (v = tl(n, {
      startingIndex: y,
      decrement: !0,
      disabledIndices: m
    }), i && Vc(v, d, A) && (v = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v)))) : i && (v = tl(n, {
      startingIndex: y + (d - y % d),
      decrement: !0,
      disabledIndices: m
    }), c && (v = c(o, y, v))), Vc(v, d, A) && (v = y));
    const T = ur(h / d) === A;
    ps(n, v) && (i && T ? (v = o.key === (f ? dr : fr) ? h : tl(n, {
      startingIndex: y - y % d - 1,
      disabledIndices: m
    }), c && (v = c(o, y, v))) : v = y);
  }
  return v;
}
function ou(n, o, r) {
  if (typeof r == "function" ? r(o) : r?.includes(o) ?? !1)
    return !0;
  const c = n[o];
  return c ? !wu(c) || c.matches(":disabled") ? !0 : !r && (c.hasAttribute("disabled") || c.getAttribute("aria-disabled") === "true") : !1;
}
function x2(n) {
  return n.visibility === "hidden" || n.visibility === "collapse";
}
function wu(n, o = n ? bl(n) : null) {
  return !n || !n.isConnected || !o || x2(o) ? !1 : typeof n.checkVisibility == "function" ? n.checkVisibility() : o.display !== "none" && o.display !== "contents";
}
const S2 = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function E2(n) {
  const o = n.assignedSlot;
  if (o)
    return o;
  if (n.parentElement)
    return n.parentElement;
  const r = n.getRootNode();
  return ui(r) ? r.host : null;
}
function Lh(n) {
  for (const o of Array.from(n.children))
    if (Bn(o) === "summary")
      return o;
  return null;
}
function C2(n, o) {
  const r = Lh(o);
  return !!r && (n === r || it(r, n));
}
function e1(n) {
  const o = n ? Bn(n) : "";
  return n != null && n.matches(S2) && (o !== "summary" || n.parentElement != null && Bn(n.parentElement) === "details" && Lh(n.parentElement) === n) && (o !== "details" || Lh(n) == null) && (o !== "input" || n.type !== "hidden");
}
function t1(n) {
  if (!e1(n) || !n.isConnected || n.matches(":disabled"))
    return !1;
  for (let o = n; o; o = E2(o)) {
    const r = o !== n, i = Bn(o) === "slot";
    if (o.hasAttribute("inert") || r && Bn(o) === "details" && !o.open && !C2(n, o) || o.hasAttribute("hidden") || !i && !R2(o, r))
      return !1;
  }
  return !0;
}
function R2(n, o) {
  const r = bl(n);
  return o ? r.display !== "none" : wu(n, r);
}
function n1(n) {
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
function _2(n, o) {
  const r = $d(n);
  if (!r)
    return !0;
  const i = o.find((c) => {
    const f = $d(c);
    return f?.name === r.name && f.form === r.form && f.checked;
  });
  return i ? i === r : o.find((c) => {
    const f = $d(c);
    return f?.name === r.name && f.form === r.form;
  }) === r;
}
function l1(n) {
  if (Kt(n) && Bn(n) === "slot") {
    const o = n.assignedElements({
      flatten: !0
    });
    if (o.length > 0)
      return o;
  }
  return Kt(n) && n.shadowRoot ? Array.from(n.shadowRoot.children) : Array.from(n.children);
}
function o1(n, o) {
  l1(n).forEach((r) => {
    e1(r) && o.push(r), o1(r, o);
  });
}
function a1(n, o, r) {
  l1(n).forEach((i) => {
    Kt(i) && i.matches(o) && r.push(i), a1(i, o, r);
  });
}
function Mm(n) {
  return t1(n) && n1(n) >= 0;
}
function r1(n) {
  const o = [];
  return o1(n, o), o.filter(t1);
}
function Au(n) {
  const o = r1(n);
  return o.filter((r) => n1(r) >= 0 && _2(r, o));
}
function i1(n, o) {
  const r = Au(n), i = r.length;
  if (i === 0)
    return;
  const c = Pl($t(n)), f = r.indexOf(c), d = f === -1 ? o === 1 ? 0 : i - 1 : f + o;
  return r[d];
}
function s1(n) {
  return i1($t(n).body, 1) || n;
}
function c1(n) {
  return i1($t(n).body, -1) || n;
}
function ds(n, o) {
  const r = o || n.currentTarget, i = n.relatedTarget;
  return !i || !it(r, i);
}
function w2(n) {
  Au(n).forEach((r) => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "", r.setAttribute("tabindex", "-1");
  });
}
function cv(n) {
  const o = [];
  a1(n, "[data-tabindex]", o), o.forEach((r) => {
    const i = r.dataset.tabindex;
    delete r.dataset.tabindex, i ? r.setAttribute("tabindex", i) : r.removeAttribute("tabindex");
  });
}
function gs(n, o, r = !0) {
  return n.filter((c) => c.parentId === o).flatMap((c) => [...!r || c.context?.open ? [c] : [], ...gs(n, c.id, r)]);
}
function uv(n, o) {
  let r = [], i = n.find((c) => c.id === o)?.parentId;
  for (; i; ) {
    const c = n.find((f) => f.id === i);
    i = c?.parentId, c && (r = r.concat(c));
  }
  return r;
}
function au(n) {
  return `data-base-ui-${n}`;
}
let Ic = 0;
function Fc(n, o = {}) {
  const {
    preventScroll: r = !1,
    sync: i = !1,
    shouldFocus: c
  } = o;
  cancelAnimationFrame(Ic);
  function f() {
    c && !c() || n?.focus({
      preventScroll: r
    });
  }
  if (i)
    return f(), Xt;
  const d = requestAnimationFrame(f);
  return Ic = d, () => {
    Ic === d && (cancelAnimationFrame(d), Ic = 0);
  };
}
const Jd = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, fv = "data-base-ui-inert", Vh = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let rs = /* @__PURE__ */ new WeakMap(), Wd = 0;
function A2(n) {
  return Vh[n];
}
function u1(n) {
  return n ? ui(n) ? n.host : u1(n.parentNode) : null;
}
const dv = (n, o) => o.map((r) => {
  if (n.contains(r))
    return r;
  const i = u1(r);
  return n.contains(i) ? i : null;
}).filter((r) => r != null), hv = (n) => {
  const o = /* @__PURE__ */ new Set();
  return n.forEach((r) => {
    let i = r;
    for (; i && !o.has(i); )
      o.add(i), i = i.parentNode;
  }), o;
}, mv = (n, o, r) => {
  const i = [], c = (f) => {
    !f || r.has(f) || Array.from(f.children).forEach((d) => {
      Bn(d) !== "script" && (o.has(d) ? c(d) : i.push(d));
    });
  };
  return c(n), i;
};
function M2(n, o, r, i, {
  mark: c = !0
}) {
  let f = null;
  i ? f = "inert" : r && (f = "aria-hidden");
  let d = null, m = null;
  const g = dv(o, n), h = c ? mv(o, hv(g), new Set(g)) : [], y = [], x = [];
  if (f) {
    const v = Jd[f], E = A2(f);
    m = E, d = v;
    const A = dv(o, Array.from(o.querySelectorAll("[aria-live]"))), T = g.concat(A);
    mv(o, hv(T), new Set(T)).forEach((w) => {
      const M = w.getAttribute(f), R = M !== null && M !== "false", N = (v.get(w) || 0) + 1;
      v.set(w, N), y.push(w), N === 1 && R && E.add(w), R || w.setAttribute(f, f === "inert" ? "" : "true");
    });
  }
  return c && h.forEach((v) => {
    const E = (rs.get(v) || 0) + 1;
    rs.set(v, E), x.push(v), E === 1 && v.setAttribute(fv, "");
  }), Wd += 1, () => {
    d && y.forEach((v) => {
      const A = (d.get(v) || 0) - 1;
      d.set(v, A), A || (!m?.has(v) && f && v.removeAttribute(f), m?.delete(v));
    }), c && x.forEach((v) => {
      const E = (rs.get(v) || 0) - 1;
      rs.set(v, E), E || v.removeAttribute(fv);
    }), Wd -= 1, Wd || (Jd.inert = /* @__PURE__ */ new WeakMap(), Jd["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Vh.inert = /* @__PURE__ */ new WeakSet(), Vh["aria-hidden"] = /* @__PURE__ */ new WeakSet(), rs = /* @__PURE__ */ new WeakMap());
  };
}
function pv(n, o = {}) {
  const {
    ariaHidden: r = !1,
    inert: i = !1,
    mark: c = !0
  } = o, f = $t(n[0]).body;
  return M2(n, f, r, i, {
    mark: c
  });
}
const T2 = {
  style: {
    transition: "none"
  }
}, O2 = "data-base-ui-click-trigger", k2 = {
  fallbackAxisSide: "none"
}, N2 = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, f1 = /* @__PURE__ */ b.createContext(null), d1 = () => b.useContext(f1), z2 = au("portal");
function D2(n = {}) {
  const {
    ref: o,
    container: r,
    componentProps: i = gl,
    elementProps: c
  } = n, f = bm(), m = d1()?.portalNode, [g, h] = b.useState(null), [y, x] = b.useState(null), v = Fe((O) => {
    O !== null && x(O);
  }), E = b.useRef(null);
  Qe(() => {
    if (r === null) {
      E.current && (E.current = null, x(null), h(null));
      return;
    }
    const O = (r && (tm(r) ? r : r.current)) ?? m ?? document.body;
    if (O == null) {
      E.current && (E.current = null, x(null), h(null));
      return;
    }
    E.current !== O && (E.current = O, x(null), h(O));
  }, [r, m]);
  const A = Zl("div", i, {
    ref: [o, v],
    props: [{
      id: f,
      [z2]: ""
    }, c]
  }), T = g && A ? /* @__PURE__ */ hi.createPortal(A, g) : null;
  return {
    node: y,
    // `id` and `render` props can override or remove the generated ID. Use the exact
    // rendered value so `aria-owns` never points at an ID absent from the DOM.
    nodeId: /* @__PURE__ */ b.isValidElement(A) ? A.props.id : void 0,
    subtree: T
  };
}
const j2 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    children: d,
    container: m,
    ...g
  } = o, {
    node: h,
    nodeId: y,
    subtree: x
  } = D2({
    container: m,
    ref: r,
    componentProps: o,
    elementProps: g
  }), v = b.useRef(null), E = b.useRef(null), A = b.useRef(null), T = b.useRef(null), [O, w] = b.useState(null), M = b.useRef(!1), R = O?.modal, N = O?.open, I = !!O && !O.modal && O.open && !!h;
  b.useEffect(() => {
    if (!h || R)
      return;
    function G(z) {
      h && z.relatedTarget && ds(z) && (z.type === "focusin" ? M.current && (cv(h), M.current = !1) : (w2(h), M.current = !0));
    }
    return si(Gt(h, "focusin", G, !0), Gt(h, "focusout", G, !0));
  }, [h, R]), Qe(() => {
    !h || N !== !0 || !M.current || (cv(h), M.current = !1);
  }, [N, h]);
  const q = b.useMemo(() => ({
    beforeOutsideRef: v,
    afterOutsideRef: E,
    beforeInsideRef: A,
    afterInsideRef: T,
    portalNode: h,
    setFocusManagerState: w
  }), [h]);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [x, /* @__PURE__ */ S.jsxs(f1.Provider, {
      value: q,
      children: [I && h && /* @__PURE__ */ S.jsx(lu, {
        "data-type": "outside",
        ref: v,
        onFocus: (G) => {
          if (ds(G, h))
            A.current?.focus();
          else {
            const z = O ? O.domReference : null;
            c1(z)?.focus();
          }
        }
      }), I && h && /* @__PURE__ */ S.jsx("span", {
        "aria-owns": y,
        style: N2
      }), h && /* @__PURE__ */ hi.createPortal(d, h), I && h && /* @__PURE__ */ S.jsx(lu, {
        "data-type": "outside",
        ref: E,
        onFocus: (G) => {
          if (ds(G, h))
            T.current?.focus();
          else {
            const z = O ? O.domReference : null;
            s1(z)?.focus(), O?.closeOnFocusOut && O?.onOpenChange(!1, vt(xu, G.nativeEvent));
          }
        }
      })]
    })]
  });
});
function L2() {
  const n = /* @__PURE__ */ new Map();
  return {
    emit(o, r) {
      n.get(o)?.forEach((i) => i(r));
    },
    on(o, r) {
      n.has(o) || n.set(o, /* @__PURE__ */ new Set()), n.get(o).add(r);
    },
    off(o, r) {
      n.get(o)?.delete(r);
    }
  };
}
const V2 = /* @__PURE__ */ b.createContext(null), I2 = /* @__PURE__ */ b.createContext(null), h1 = () => b.useContext(V2)?.id || null, Mu = (n) => {
  const o = b.useContext(I2);
  return n ?? o;
};
function H2(n, o) {
  const r = hn(kl(n));
  return n instanceof r.KeyboardEvent ? "keyboard" : n instanceof r.FocusEvent ? o || "keyboard" : "pointerType" in n ? n.pointerType || "keyboard" : "touches" in n ? "touch" : n instanceof r.MouseEvent ? o || (n.detail === 0 ? "keyboard" : "mouse") : "";
}
const gv = 20;
let Ta = [];
function Tm() {
  Ta = Ta.filter((n) => n.deref()?.isConnected);
}
function bv(n) {
  Tm(), n && Bn(n) !== "body" && (Ta.push(new WeakRef(n)), Ta.length > gv && (Ta = Ta.slice(-gv)));
}
function yv() {
  return Tm(), Ta[Ta.length - 1]?.deref();
}
function U2(n) {
  return n ? Mm(n) ? n : Au(n)[0] || n : null;
}
function vv(n) {
  if (n.hasAttribute("tabindex") && !n.hasAttribute("data-tabindex") || !n.getAttribute("role")?.includes("dialog"))
    return;
  const r = r1(n).filter((c) => {
    const f = c.getAttribute("data-tabindex") || "";
    return Mm(c) || c.hasAttribute("data-tabindex") && !f.startsWith("-");
  }), i = n.getAttribute("tabindex");
  r.length === 0 ? i !== "0" && (n.setAttribute("tabindex", "0"), n.setAttribute("data-tabindex", "0")) : (i !== "-1" || n.hasAttribute("data-tabindex") && n.getAttribute("data-tabindex") !== "-1") && (n.setAttribute("tabindex", "-1"), n.setAttribute("data-tabindex", "-1"));
}
function B2(n) {
  const {
    context: o,
    children: r,
    disabled: i = !1,
    initialFocus: c = !0,
    returnFocus: f = !0,
    restoreFocus: d = !1,
    modal: m = !0,
    closeOnFocusOut: g = !0,
    openInteractionType: h = "",
    nextFocusableElement: y,
    previousFocusableElement: x,
    beforeContentFocusGuardRef: v,
    externalTree: E,
    getInsideElements: A
  } = n, T = "rootStore" in o ? o.rootStore : o, O = T.useState("open"), w = T.useState("domReferenceElement"), M = T.useState("floatingElement"), {
    events: R,
    dataRef: N
  } = T.context, I = Fe(() => N.current.floatingContext?.nodeId), q = c === !1, G = Dh(w) && q, z = pl(c), P = pl(f), te = pl(h), ie = pl(O), fe = Mu(E), ne = d1(), he = b.useRef(!1), be = b.useRef(!1), V = b.useRef(!1), H = b.useRef(null), F = b.useRef(""), ve = b.useRef(""), se = b.useRef(null), D = b.useRef(null), K = pr(se, v, ne?.beforeInsideRef), le = pr(D, ne?.afterInsideRef), oe = La(), pe = La(), _e = hs(), qe = ne != null, Ae = jh(M), Te = Fe((ze = Ae) => ze ? Au(ze) : []), at = Fe(() => A?.().filter((ze) => ze != null) ?? []);
  b.useEffect(() => {
    if (i || !m)
      return;
    function ze(Ne) {
      Ne.key === "Tab" && it(Ae, Pl($t(Ae))) && Te().length === 0 && !G && kn(Ne);
    }
    const et = $t(Ae);
    return Gt(et, "keydown", ze);
  }, [i, Ae, m, G, Te]), b.useEffect(() => {
    if (i || !O)
      return;
    const ze = $t(Ae);
    function et() {
      V.current = !1;
    }
    function Ne(Ue) {
      const we = kl(Ue), Ze = at(), Oe = it(M, we) || it(w, we) || it(ne?.portalNode, we) || Ze.some((Je) => Je === we || it(Je, we));
      V.current = !Oe, ve.current = Ue.pointerType || "keyboard", we?.closest(`[${O2}]`) && (be.current = !0, pe.start(0, () => {
        be.current = !1;
      }));
    }
    function Le() {
      ve.current = "keyboard";
    }
    return si(
      Gt(ze, "pointerdown", Ne, !0),
      Gt(ze, "pointerup", et, !0),
      Gt(ze, "pointercancel", et, !0),
      Gt(ze, "keydown", Le, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      et
    );
  }, [i, M, w, Ae, O, ne, pe, at]), b.useEffect(() => {
    if (i || !g)
      return;
    const ze = $t(Ae);
    function et() {
      be.current = !0, pe.start(0, () => {
        be.current = !1;
      });
    }
    function Ne(Ze) {
      const Oe = kl(Ze);
      Mm(Oe) && (H.current = Oe);
    }
    function Le(Ze) {
      const Oe = Ze.relatedTarget, Je = Ze.currentTarget, tt = kl(Ze);
      m && Oe == null && tt != null && it(M, tt) && bv(tt), queueMicrotask(() => {
        const Xe = I(), ye = T.context.triggerElements, Q = at(), ce = Oe?.hasAttribute(au("focus-guard")) && [se.current, D.current, ne?.beforeInsideRef.current, ne?.afterInsideRef.current, ne?.beforeOutsideRef.current, ne?.afterOutsideRef.current, Yo(x), Yo(y)].includes(Oe), He = !(it(w, Oe) || it(M, Oe) || it(Oe, M) || it(ne?.portalNode, Oe) || Q.some((Ce) => Ce === Oe || it(Ce, Oe)) || ye.hasMatchingElement((Ce) => it(Ce, Oe)) || ce || fe && (gs(fe.nodesRef.current, Xe).find((Ce) => it(Ce.context?.elements.floating, Oe) || it(Ce.context?.elements.domReference, Oe)) || uv(fe.nodesRef.current, Xe).find((Ce) => [Ce.context?.elements.floating, jh(Ce.context?.elements.floating)].includes(Oe) || Ce.context?.elements.domReference === Oe)));
        if (Je === w && Ae && vv(Ae), d && Je !== w && !wu(tt) && Pl(ze) === ze.body) {
          if (Kt(Ae) && (Ae.focus(), d === "popup")) {
            _e.request(() => {
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
        (G || !m) && Oe && He && !be.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (G || Oe !== yv()) && (he.current = !0, T.setOpen(!1, vt(xu, Ze)));
      });
    }
    function Ue() {
      V.current || (N.current.insideReactTree = !0, oe.start(0, () => {
        N.current.insideReactTree = !1;
      }));
    }
    const we = Kt(w) ? w : null;
    if (!(!M && !we))
      return si(we && Gt(we, "focusout", Le), we && Gt(we, "pointerdown", et), M && Gt(M, "focusin", Ne), M && Gt(M, "focusout", Le), M && ne && Gt(M, "focusout", Ue, !0));
  }, [i, w, M, Ae, m, fe, ne, T, g, d, Te, G, I, N, oe, pe, _e, y, x, at]), b.useEffect(() => {
    if (i || !M || !O)
      return;
    const ze = Array.from(ne?.portalNode?.querySelectorAll(`[${au("portal")}]`) || []), Ne = (fe ? uv(fe.nodesRef.current, I()) : []).find((Je) => Dh(Je.context?.elements.domReference || null))?.context?.elements.domReference, Ue = [...[M, ...ze, se.current, D.current, ne?.beforeOutsideRef.current, ne?.afterOutsideRef.current, ...at()], Ne, Yo(x), Yo(y), G ? w : null].filter((Je) => Je != null), we = pv(Ue, {
      ariaHidden: m || G,
      mark: !1
    }), Ze = [M, ...ze].filter((Je) => Je != null), Oe = pv(Ze);
    return () => {
      Oe(), we();
    };
  }, [O, i, w, M, m, ne, G, fe, I, y, x, at]), Qe(() => {
    if (!O || i || !Kt(Ae))
      return;
    F.current = "", ve.current = "";
    const ze = $t(Ae), et = Pl(ze);
    queueMicrotask(() => {
      const Ne = z.current, Le = typeof Ne == "function" ? Ne(te.current || "") : Ne;
      if (Le === void 0 || Le === !1 || it(Ae, et))
        return;
      let we = null;
      const Ze = () => (we == null && (we = Te(Ae)), we[0] || Ae);
      let Oe;
      Le === !0 || Le === null ? Oe = Ze() : Oe = Yo(Le), Oe = Oe || Ze();
      const Je = it(Ae, Pl(ze));
      Fc(Oe, {
        preventScroll: Oe === Ae,
        shouldFocus() {
          if (!ie.current)
            return !1;
          if (Je)
            return !0;
          const tt = Pl(ze);
          return !(tt !== Oe && it(Ae, tt));
        }
      });
    });
  }, [i, O, Ae, Te, z, te, ie]), Qe(() => {
    if (i || !Ae)
      return;
    const ze = $t(Ae), et = Pl(ze), Ne = te.current == null;
    bv(et);
    function Le(we) {
      if (we.open || (F.current = H2(we.nativeEvent, ve.current)), we.reason === HM && we.nativeEvent.type === "mouseleave" && (he.current = !0), we.reason === ym)
        if (we.nested)
          he.current = !1;
        else if (Jx(we.nativeEvent) || Cm(we.nativeEvent))
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
    R.on("openchange", Le);
    function Ue(we) {
      const Ze = P.current;
      let Oe = typeof Ze == "function" ? Ze(we) : Ze;
      if (Oe === void 0 || Oe === !1)
        return null;
      Oe === null && (Oe = !0);
      const Je = w?.isConnected ? w : null, tt = et?.isConnected && Bn(et) !== "body" ? et : null;
      let Xe = Ne ? tt || Je : Je || tt;
      return Xe || (Xe = yv() || null), typeof Oe == "boolean" ? Xe : Yo(Oe) || Xe || null;
    }
    return () => {
      R.off("openchange", Le);
      const we = Pl(ze), Ze = at(), Oe = it(M, we) || Ze.some((ye) => ye === we || it(ye, we)) || fe && gs(fe.nodesRef.current, I(), !1).some((ye) => it(ye.context?.elements.floating, we)), Je = P.current, tt = F.current, Xe = Ue(tt);
      queueMicrotask(() => {
        const ye = U2(Xe), Q = typeof Je != "boolean";
        if (Je && !he.current && Kt(ye) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Q && ye !== we && we !== ze.body) || Oe)) {
          const ce = {
            preventScroll: !0
          };
          tt === "keyboard" && (ce.focusVisible = !0), ye.focus(ce);
        }
        he.current = !1;
      });
    };
  }, [i, M, Ae, P, te, R, fe, w, I, at]), Qe(() => {
    if (!Cr || O || !M)
      return;
    const ze = Pl($t(M));
    !Kt(ze) || !_m(ze) || it(M, ze) && ze.blur();
  }, [O, M]), Qe(() => {
    if (!(i || !ne))
      return ne.setFocusManagerState({
        modal: m,
        closeOnFocusOut: g,
        open: O,
        onOpenChange: T.setOpen,
        domReference: w
      }), () => {
        ne.setFocusManagerState(null);
      };
  }, [i, ne, m, O, T, g, w]), Qe(() => {
    if (!(i || !Ae))
      return vv(Ae), () => {
        queueMicrotask(Tm);
      };
  }, [i, Ae]);
  const pt = !i && (m ? !G : !0) && (qe || m);
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [pt && /* @__PURE__ */ S.jsx(lu, {
      "data-type": "inside",
      ref: K,
      onFocus: (ze) => {
        if (m) {
          const et = Te();
          Fc(et[et.length - 1]);
        } else ne?.portalNode && (he.current = !1, ds(ze, ne.portalNode) ? s1(w)?.focus() : Yo(x ?? ne.beforeOutsideRef)?.focus());
      }
    }), r, pt && /* @__PURE__ */ S.jsx(lu, {
      "data-type": "inside",
      ref: le,
      onFocus: (ze) => {
        m ? Fc(Te()[0]) : ne?.portalNode && (g && (he.current = !0), ds(ze, ne.portalNode) ? c1(w)?.focus() : Yo(y ?? ne.afterOutsideRef)?.focus());
      }
    })]
  });
}
function m1(n, o = {}) {
  const {
    enabled: r = !0,
    event: i = "click",
    toggle: c = !0,
    ignoreMouse: f = !1,
    stickIfOpen: d = !0,
    touchOpenDelay: m = 0,
    reason: g = Qx
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.context.dataRef, x = b.useRef(void 0), v = hs(), E = La(), A = b.useMemo(() => {
    function T(w, M, R, N) {
      const I = vt(g, M, R);
      w && N === "touch" && m > 0 ? E.start(m, () => {
        h.setOpen(!0, I);
      }) : h.setOpen(w, I);
    }
    function O(w, M, R) {
      const N = y.current.openEvent, I = h.select("domReferenceElement") !== M;
      return w && I || !w || !c ? !0 : N && d ? !R(N.type) : !1;
    }
    return {
      onPointerDown(w) {
        x.current = Fd(w.pointerType) && Cm(w.nativeEvent) ? "virtual" : w.pointerType;
      },
      onMouseDown(w) {
        const M = x.current, R = w.nativeEvent, N = h.select("open");
        if (w.button !== 0 || i === "click" || Fd(M) && f)
          return;
        const I = O(N, w.currentTarget, (z) => z === "click" || z === "mousedown"), q = kl(R);
        if (_m(q)) {
          T(I, R, q, M);
          return;
        }
        const G = w.currentTarget;
        v.request(() => {
          T(I, R, G, M);
        });
      },
      onClick(w) {
        if (i === "mousedown-only")
          return;
        const M = x.current;
        if (i === "mousedown" && M) {
          x.current = void 0;
          return;
        }
        if (Fd(M) && f)
          return;
        const R = h.select("open"), N = O(R, w.currentTarget, (I) => I === "click" || I === "mousedown" || I === "keydown" || I === "keyup");
        T(N, w.nativeEvent, w.currentTarget, M);
      },
      onKeyDown() {
        x.current = void 0;
      }
    };
  }, [y, i, f, g, h, d, c, v, E, m]);
  return b.useMemo(() => r ? {
    reference: A
  } : gl, [r, A]);
}
function G2() {
  return !1;
}
function Y2(n) {
  return {
    escapeKey: typeof n == "boolean" ? n : n?.escapeKey ?? !1,
    outsidePress: typeof n == "boolean" ? n : n?.outsidePress ?? !0
  };
}
function q2(n, o = {}) {
  const {
    enabled: r = !0,
    escapeKey: i = !0,
    outsidePress: c = !0,
    outsidePressEvent: f = "sloppy",
    referencePress: d = G2,
    bubbles: m,
    externalTree: g
  } = o, h = "rootStore" in n ? n.rootStore : n, y = h.useState("open"), x = h.useState("floatingElement"), {
    dataRef: v
  } = h.context, E = Mu(g), A = Fe(typeof c == "function" ? c : () => !1), T = typeof c == "function" ? A : c, O = T !== !1, w = Fe(() => f), {
    escapeKey: M,
    outsidePress: R
  } = Y2(m), N = b.useRef(!1), I = b.useRef(!1), q = b.useRef(!1), G = b.useRef(!1), z = b.useRef(""), P = b.useRef(null), te = La(), ie = La(), fe = Fe(() => {
    ie.clear(), v.current.insideReactTree = !1;
  }), ne = Fe((K) => {
    const le = v.current.floatingContext?.nodeId;
    return (E ? gs(E.nodesRef.current, le) : []).some((pe) => pe.context?.open && !pe.context.dataRef.current[K]);
  }), he = Fe((K) => Qd(K, h.select("floatingElement")) || Qd(K, h.select("domReferenceElement"))), be = Fe((K) => {
    d() && h.setOpen(!1, vt(Qx, K.nativeEvent));
  }), V = Fe((K) => {
    if (!y || !r || !i || K.key !== "Escape" || G.current || !M && ne("__escapeKeyBubbles"))
      return;
    const le = p2(K) ? K.nativeEvent : K, oe = vt(vm, le);
    h.setOpen(!1, oe), oe.isCanceled || K.preventDefault(), !M && !oe.isPropagationAllowed && K.stopPropagation();
  }), H = Fe(() => {
    v.current.insideReactTree = !0, ie.start(0, fe);
  }), F = Fe((K) => {
    if (!y || !r || K.button !== 0)
      return;
    const le = kl(K.nativeEvent);
    it(h.select("floatingElement"), le) && (N.current || (N.current = !0, I.current = !1));
  }), ve = Fe((K) => {
    !y || !r || (K.defaultPrevented || K.nativeEvent.defaultPrevented) && N.current && (I.current = !0);
  });
  b.useEffect(() => {
    if (!y || !r)
      return fe;
    v.current.__escapeKeyBubbles = M, v.current.__outsidePressBubbles = R;
    const K = new gr(), le = new gr();
    function oe() {
      K.clear(), G.current = !0;
    }
    function pe() {
      K.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        Cr ? 5 : 0,
        () => {
          G.current = !1;
        }
      );
    }
    function _e() {
      q.current = !0, le.start(0, () => {
        q.current = !1;
      });
    }
    function qe() {
      N.current = !1, I.current = !1;
    }
    function Ae() {
      const Q = z.current, ce = Q === "pen" || !Q ? "mouse" : Q, He = w(), Ce = typeof He == "function" ? He() : He;
      return typeof Ce == "string" ? Ce : Ce[ce];
    }
    function Te(Q) {
      const ce = Ae();
      return ce === "intentional" && Q.type !== "click" || ce === "sloppy" && Q.type === "click";
    }
    function at(Q) {
      const ce = v.current.floatingContext?.nodeId, He = E && gs(E.nodesRef.current, ce).some((Ce) => Qd(Q, Ce.context?.elements.floating));
      return he(Q) || He;
    }
    function pt(Q) {
      if (Te(Q)) {
        Q.type !== "click" && !he(Q) && (le.clear(), q.current = !1), fe();
        return;
      }
      if (v.current.insideReactTree) {
        fe();
        return;
      }
      const ce = kl(Q), He = `[${au("inert")}]`, Ce = dn(ce) ? ce.getRootNode() : null, Ge = Array.from((ui(Ce) ? Ce : $t(h.select("floatingElement"))).querySelectorAll(He)), nt = h.context.triggerElements;
      if (ce && (nt.hasElement(ce) || nt.hasMatchingElement((St) => it(St, ce))))
        return;
      let Tt = dn(ce) ? ce : null;
      for (; Tt && !ka(Tt); ) {
        const St = Da(Tt);
        if (ka(St) || !dn(St))
          break;
        Tt = St;
      }
      if (!(Ge.length && dn(ce) && !y2(ce) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !it(ce, h.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Ge.every((St) => !it(Tt, St)))) {
        if (Kt(ce) && !("touches" in Q)) {
          const St = ka(ce), Bt = bl(ce), Nt = /auto|scroll/, xt = St || Nt.test(Bt.overflowX), on = St || Nt.test(Bt.overflowY), st = xt && ce.clientWidth > 0 && ce.scrollWidth > ce.clientWidth, Et = on && ce.clientHeight > 0 && ce.scrollHeight > ce.clientHeight, Jt = Bt.direction === "rtl", _n = Et && (Jt ? Q.offsetX <= ce.offsetWidth - ce.clientWidth : Q.offsetX > ce.clientWidth), Ft = st && Q.offsetY > ce.clientHeight;
          if (_n || Ft)
            return;
        }
        if (!at(Q)) {
          if (Ae() === "intentional" && q.current) {
            le.clear(), q.current = !1;
            return;
          }
          typeof T == "function" && !T(Q) || ne("__outsidePressBubbles") || (h.setOpen(!1, vt(ym, Q)), fe());
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
      const He = kl(Q);
      if (!He)
        return;
      const Ce = Gt(He, Q.type, () => {
        ce(Q), Ce();
      });
    }
    function Le(Q) {
      z.current = "touch", Ne(Q, et);
    }
    function Ue(Q) {
      te.clear(), Q.type === "pointerdown" && (z.current = Q.pointerType), !(Q.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && Ne(Q, (ce) => {
        ce.type === "pointerdown" ? ze(ce) : pt(ce);
      });
    }
    function we(Q) {
      if (!N.current)
        return;
      const ce = I.current;
      if (qe(), Ae() === "intentional") {
        if (Q.type === "pointercancel") {
          ce && _e();
          return;
        }
        if (!at(Q)) {
          if (ce) {
            _e();
            return;
          }
          typeof T == "function" && !T(Q) || (le.clear(), q.current = !0, fe());
        }
      }
    }
    function Ze(Q) {
      if (Ae() !== "sloppy" || !P.current || he(Q))
        return;
      const ce = Q.touches[0];
      if (!ce)
        return;
      const He = Math.abs(ce.clientX - P.current.startX), Ce = Math.abs(ce.clientY - P.current.startY), Ge = Math.sqrt(He * He + Ce * Ce);
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
    const Xe = $t(x), ye = si(i && si(Gt(Xe, "keydown", V), Gt(Xe, "compositionstart", oe), Gt(Xe, "compositionend", pe)), O && si(Gt(Xe, "click", Ue, !0), Gt(Xe, "pointerdown", Ue, !0), Gt(Xe, "pointerup", we, !0), Gt(Xe, "pointercancel", we, !0), Gt(Xe, "mousedown", Ue, !0), Gt(Xe, "mouseup", we, !0), Gt(Xe, "touchstart", Le, !0), Gt(Xe, "touchmove", Oe, !0), Gt(Xe, "touchend", tt, !0)));
    return () => {
      ye(), K.clear(), le.clear(), qe(), q.current = !1, fe();
    };
  }, [v, x, i, O, T, y, r, M, R, V, fe, w, ne, he, E, h, te]);
  const se = b.useMemo(() => ({
    onKeyDown: V,
    onPointerDown: be,
    onClick: be
  }), [V, be]), D = b.useMemo(() => ({
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
    reference: se,
    floating: D,
    trigger: se
  } : {}, [r, se, D]);
}
var eh = { exports: {} }, th = {};
var xv;
function P2() {
  if (xv) return th;
  xv = 1;
  var n = vs();
  function o(x, v) {
    return x === v && (x !== 0 || 1 / x === 1 / v) || x !== x && v !== v;
  }
  var r = typeof Object.is == "function" ? Object.is : o, i = n.useState, c = n.useEffect, f = n.useLayoutEffect, d = n.useDebugValue;
  function m(x, v) {
    var E = v(), A = i({ inst: { value: E, getSnapshot: v } }), T = A[0].inst, O = A[1];
    return f(
      function() {
        T.value = E, T.getSnapshot = v, g(T) && O({ inst: T });
      },
      [x, E, v]
    ), c(
      function() {
        return g(T) && O({ inst: T }), x(function() {
          g(T) && O({ inst: T });
        });
      },
      [x]
    ), d(E), E;
  }
  function g(x) {
    var v = x.getSnapshot;
    x = x.value;
    try {
      var E = v();
      return !r(x, E);
    } catch {
      return !0;
    }
  }
  function h(x, v) {
    return v();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : m;
  return th.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, th;
}
var Sv;
function p1() {
  return Sv || (Sv = 1, eh.exports = P2()), eh.exports;
}
var X2 = p1(), nh = { exports: {} }, lh = {};
var Ev;
function K2() {
  if (Ev) return lh;
  Ev = 1;
  var n = vs(), o = p1();
  function r(h, y) {
    return h === y && (h !== 0 || 1 / h === 1 / y) || h !== h && y !== y;
  }
  var i = typeof Object.is == "function" ? Object.is : r, c = o.useSyncExternalStore, f = n.useRef, d = n.useEffect, m = n.useMemo, g = n.useDebugValue;
  return lh.useSyncExternalStoreWithSelector = function(h, y, x, v, E) {
    var A = f(null);
    if (A.current === null) {
      var T = { hasValue: !1, value: null };
      A.current = T;
    } else T = A.current;
    A = m(
      function() {
        function w(q) {
          if (!M) {
            if (M = !0, R = q, q = v(q), E !== void 0 && T.hasValue) {
              var G = T.value;
              if (E(G, q))
                return N = G;
            }
            return N = q;
          }
          if (G = N, i(R, q)) return G;
          var z = v(q);
          return E !== void 0 && E(G, z) ? (R = q, G) : (R = q, N = z);
        }
        var M = !1, R, N, I = x === void 0 ? null : x;
        return [
          function() {
            return w(y());
          },
          I === null ? void 0 : function() {
            return w(I());
          }
        ];
      },
      [y, x, v, E]
    );
    var O = c(h, A[0], A[1]);
    return d(
      function() {
        T.hasValue = !0, T.value = O;
      },
      [O]
    ), g(O), O;
  }, lh;
}
var Cv;
function F2() {
  return Cv || (Cv = 1, nh.exports = K2()), nh.exports;
}
var Q2 = F2();
const Z2 = mm(19), $2 = Z2 ? W2 : eT;
function xe(n, o, r, i, c) {
  return $2(n, o, r, i, c);
}
function J2(n, o, r, i, c) {
  const f = b.useCallback(() => o(n.getSnapshot(), r, i, c), [n, o, r, i, c]);
  return X2.useSyncExternalStore(n.subscribe, f, f);
}
function W2(n, o, r, i, c) {
  return J2(n, o, r, i, c);
}
function eT(n, o, r, i, c) {
  return Q2.useSyncExternalStoreWithSelector(n.subscribe, n.getSnapshot, n.getSnapshot, (f) => o(f, r, i, c));
}
class g1 {
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
    for (const i of this.listeners) {
      if (r !== this.updateTick)
        return;
      i(o);
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
  use(o, r, i, c) {
    return xe(this, o, r, i, c);
  }
}
class tT extends g1 {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(o, r = {}, i) {
    super(o), this.context = r, this.selectors = i;
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
    const i = this;
    Qe(() => {
      i.state[o] !== r && i.set(o, r);
    }, [i, o, r]);
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(o, r) {
    const i = this;
    Qe(() => (i.state[o] !== r && i.set(o, r), () => {
      i.set(o, void 0);
    }), [i, o, r]);
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(o) {
    const r = this, i = Object.values(o);
    Qe(() => {
      r.update(o);
    }, [r, ...i]);
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(o, r) {
    b.useDebugValue(o);
    const i = this, c = r !== void 0;
    Qe(() => {
      c && !Object.is(i.state[o], r) && i.setState({
        ...i.state,
        [o]: r
      });
    }, [i, o, r, c]);
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(o, r, i, c) {
    const f = this.selectors[o];
    return f(this.state, r, i, c);
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(o, r, i, c) {
    return b.useDebugValue(o), xe(this, this.selectors[o], r, i, c);
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
    const i = Fe(r ?? Xt);
    this.context[o] = i;
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(o) {
    const r = b.useRef(void 0);
    return r.current === void 0 && (r.current = (i) => {
      this.set(o, i);
    }), r.current;
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(o, r) {
    let i;
    typeof o == "function" ? i = o : i = this.selectors[o];
    let c = i(this.state);
    return r(c, c, this), this.subscribe((f) => {
      const d = i(f);
      if (!Object.is(c, d)) {
        const m = c;
        c = d, r(d, m, this);
      }
    });
  }
}
const nT = {
  open: (n) => n.open,
  transitionStatus: (n) => n.transitionStatus,
  domReferenceElement: (n) => n.domReferenceElement,
  referenceElement: (n) => n.positionReference ?? n.referenceElement,
  floatingElement: (n) => n.floatingElement,
  floatingId: (n) => n.floatingId
};
class lT extends tT {
  constructor(o) {
    const {
      syncOnly: r,
      nested: i,
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
      events: L2(),
      nested: i,
      triggerElements: f
    }, nT), this.syncOnly = r;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (o, r) => {
    (!o || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    r != null && g2(r)) && (this.context.dataRef.current.openEvent = o ? r : void 0);
  };
  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (o, r) => {
    this.syncOpenEvent(o, r.event);
    const i = {
      open: o,
      reason: r.reason,
      nativeEvent: r.event,
      nested: this.context.nested,
      triggerElement: r.trigger
    };
    this.context.events.emit("openchange", i);
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
const oT = {
  tabIndex: -1,
  [zh]: ""
};
class aT {
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
function rT(n) {
  const {
    open: o = !1,
    onOpenChange: r,
    elements: i = {}
  } = n, c = bm(), f = h1() != null, d = Nl(() => new lT({
    open: o,
    transitionStatus: void 0,
    onOpenChange: r,
    referenceElement: i.reference ?? null,
    floatingElement: i.floating ?? null,
    triggerElements: new aT(),
    floatingId: c,
    syncOnly: !1,
    nested: f
  })).current;
  return Qe(() => {
    const m = {
      open: o,
      floatingId: c
    };
    i.reference !== void 0 && (m.referenceElement = i.reference, m.domReferenceElement = dn(i.reference) ? i.reference : null), i.floating !== void 0 && (m.floatingElement = i.floating), d.update(m);
  }, [o, c, i.reference, i.floating, d]), d.context.onOpenChange = r, d.context.nested = f, d;
}
function iT(n) {
  return sT(n, n.rootContext);
}
function sT(n, o) {
  const {
    nodeId: r,
    externalTree: i
  } = n, c = o.useState("referenceElement"), f = o.useState("floatingElement"), d = o.useState("domReferenceElement"), m = o.useState("open"), g = o.useState("floatingId"), [h, y] = b.useState(null), [x, v] = b.useState(void 0), [E, A] = b.useState(void 0), T = b.useRef(null), O = Mu(i), w = b.useMemo(() => ({
    reference: c,
    floating: f,
    domReference: d
  }), [c, f, d]), M = E_({
    ...n,
    elements: {
      ...w,
      ...h && {
        reference: h
      }
    }
  }), R = dn(x) ? x : null, N = E === void 0 ? o.state.floatingElement : E;
  o.useSyncedValue("referenceElement", x ?? null), o.useSyncedValue("domReferenceElement", x === void 0 ? d : R), o.useSyncedValue("floatingElement", N);
  const I = b.useCallback((ie) => {
    const fe = dn(ie) ? {
      getBoundingClientRect: () => ie.getBoundingClientRect(),
      getClientRects: () => ie.getClientRects(),
      contextElement: ie
    } : ie;
    y(fe), M.refs.setReference(fe);
  }, [M.refs]), q = b.useCallback((ie) => {
    (dn(ie) || ie === null) && (T.current = ie, v(ie)), (dn(M.refs.reference.current) || M.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    ie !== null && !dn(ie)) && M.refs.setReference(ie);
  }, [M.refs, v]), G = b.useCallback((ie) => {
    A(ie), M.refs.setFloating(ie);
  }, [M.refs]), z = b.useMemo(() => ({
    ...M.refs,
    setReference: q,
    setFloating: G,
    setPositionReference: I,
    domReference: T
  }), [M.refs, q, G, I]), P = b.useMemo(() => ({
    ...M.elements,
    domReference: d
  }), [M.elements, d]), te = b.useMemo(() => ({
    ...M,
    dataRef: o.context.dataRef,
    open: m,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: g,
    refs: z,
    elements: P,
    nodeId: r,
    rootStore: o
  }), [M, z, P, r, o, m, g]);
  return Qe(() => {
    d && (T.current = d);
  }, [d]), Qe(() => {
    o.context.dataRef.current.floatingContext = te;
    const ie = O?.nodesRef.current.find((fe) => fe.id === r);
    ie && (ie.context = te);
  }), b.useMemo(() => ({
    ...M,
    context: te,
    refs: z,
    elements: P,
    rootStore: o
  }), [M, z, P, te, o]);
}
const cT = "Escape";
function Rv(n) {
  return Cr && n.movementX === 0 && n.movementY === 0;
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
function Hc(n, o) {
  return Tu(o, n === Rm || n === _u, n === fr || n === dr);
}
function oh(n, o, r) {
  return Tu(o, n === _u, r ? n === fr : n === dr) || n === "Enter" || n === " " || n === "";
}
function uT(n, o, r) {
  return Tu(o, r ? n === fr : n === dr, n === _u);
}
function fT(n, o, r, i) {
  const c = r ? n === dr : n === fr, f = n === Rm;
  return o === "both" || o === "horizontal" && i ? n === cT : Tu(o, c, f);
}
function dT(n, o) {
  const {
    listRef: r,
    activeIndex: i,
    onNavigate: c = () => {
    },
    enabled: f = !0,
    selectedIndex: d = null,
    allowEscape: m = !1,
    loopFocus: g = !1,
    nested: h = !1,
    rtl: y = !1,
    virtual: x = !1,
    focusItemOnOpen: v = "auto",
    focusItemOnHover: E = !0,
    openOnArrowKeyDown: A = !0,
    disabledIndices: T = void 0,
    orientation: O = "vertical",
    parentOrientation: w,
    id: M,
    resetOnPointerLeave: R = !0,
    externalTree: N,
    grid: I
  } = o, q = I != null, G = "rootStore" in n ? n.rootStore : n, z = G.useState("open"), P = G.useState("floatingElement"), te = G.useState("domReferenceElement"), ie = G.context.dataRef, fe = jh(P), ne = Dh(te), he = pl(fe), be = h1(), V = Mu(N), H = b.useRef(v), F = b.useRef(d ?? -1), ve = b.useRef(null), se = b.useRef(!0), D = Fe((Q) => {
    c(F.current === -1 ? null : F.current, Q);
  }), K = b.useRef(!!P), le = b.useRef(z), oe = b.useRef(!1), pe = b.useRef(!1), _e = b.useRef(null), qe = pl(T), Ae = pl(z), Te = pl(d), at = pl(R), pt = hs(), ze = hs(), et = Fe(() => {
    function Q(Ge) {
      x ? V?.events.emit("virtualfocus", Ge) : _e.current = Fc(Ge, {
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
      Oe && (He || !se.current) && Ge.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Qe(() => {
    ie.current.orientation = O;
  }, [ie, O]), Qe(() => {
    f && (z && P ? (F.current = d ?? -1, H.current && d != null && (pe.current = !0, D())) : K.current && (F.current = -1, D()));
  }, [f, z, P, d, D]), Qe(() => {
    if (f) {
      if (!z) {
        oe.current = !1;
        return;
      }
      if (P)
        if (i == null) {
          if (oe.current = !1, Te.current != null)
            return;
          if (K.current && (F.current = -1, et()), (!le.current || !K.current) && H.current && (ve.current != null || H.current === !0 && ve.current == null)) {
            let Q = 0;
            const ce = () => {
              r.current[0] == null ? (Q < 2 && (Q ? (Ce) => ze.request(Ce) : queueMicrotask)(ce), Q += 1) : (F.current = ve.current == null || oh(ve.current, O, y) || h ? Zd(r) : sv(r), ve.current = null, D());
            };
            ce();
          }
        } else ps(r.current, i) || (F.current = i, et(), pe.current = !1);
    }
  }, [f, z, P, i, Te, h, r, O, y, D, et, ze]), Qe(() => {
    if (!f || P || !V || x || !K.current)
      return;
    const Q = V.nodesRef.current, ce = Q.find((Ge) => Ge.id === be)?.context?.elements.floating, He = Pl($t(te ?? ce ?? null)), Ce = Q.some((Ge) => Ge.context && it(Ge.context.elements.floating, He));
    ce && !Ce && se.current && ce.focus({
      preventScroll: !0
    });
  }, [f, P, te, V, be, x]), Qe(() => {
    le.current = z, K.current = !!P;
  }), Qe(() => {
    z || (ve.current = null, H.current = v);
  }, [z, v]);
  const Ne = i != null, Le = Fe((Q) => {
    if (!Ae.current)
      return;
    const ce = r.current.indexOf(Q.currentTarget);
    ce !== -1 && (F.current !== ce || i !== ce) && (F.current = ce, D(Q));
  }), Ue = Fe(() => w ?? V?.nodesRef.current.find((Q) => Q.id === be)?.context?.dataRef?.current.orientation), we = Fe(() => Zd(r, qe.current)), Ze = Fe((Q) => {
    if (se.current = !1, oe.current = !0, Q.which === 229 || !Ae.current && Q.currentTarget === he.current)
      return;
    if (h && fT(Q.key, O, y, q)) {
      Hc(Q.key, Ue()) || kn(Q), G.setOpen(!1, vt(Nh, Q.nativeEvent)), Kt(te) && (x ? V?.events.emit("virtualfocus", te) : te.focus());
      return;
    }
    const ce = F.current, He = Zd(r, T), Ce = sv(r, T);
    if (ne || (Q.key === "Home" && (kn(Q), F.current = He, D(Q)), Q.key === "End" && (kn(Q), F.current = Ce, D(Q))), I != null) {
      const Ge = I(Q, F.current, r, O, g, y, T, He, Ce);
      if (Ge != null && (F.current = Ge, D(Q)), O === "both")
        return;
    }
    if (Hc(Q.key, O)) {
      if (kn(Q), z && !x && Pl(Q.currentTarget.ownerDocument) === Q.currentTarget) {
        F.current = oh(Q.key, O, y) ? He : Ce, D(Q);
        return;
      }
      oh(Q.key, O, y) ? g ? ce >= Ce ? m && ce !== r.current.length ? F.current = -1 : (oe.current = !1, F.current = He) : F.current = tl(r.current, {
        startingIndex: ce,
        disabledIndices: T
      }) : F.current = Math.min(Ce, tl(r.current, {
        startingIndex: ce,
        disabledIndices: T
      })) : g ? ce <= He ? m && ce !== -1 ? F.current = r.current.length : (oe.current = !1, F.current = Ce) : F.current = tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: T
      }) : F.current = Math.max(He, tl(r.current, {
        startingIndex: ce,
        decrement: !0,
        disabledIndices: T
      })), ps(r.current, F.current) && (F.current = -1), D(Q);
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
      Rv(ce) || (oe.current = !0, pe.current = !1, E && Le(ce));
    },
    onPointerLeave(ce) {
      if (!Ae.current || !se.current || ce.pointerType === "touch")
        return;
      oe.current = !0;
      const He = ce.relatedTarget;
      if (!(!E || r.current.includes(He)) && at.current && (_e.current?.(), _e.current = null, F.current = -1, D(ce), !x)) {
        const Ce = he.current, Ge = Pl($t(Ce));
        Ce && it(Ce, Ge) && Ce.focus({
          preventScroll: !0
        });
      }
    }
  }), [Le, Ae, he, E, r, D, at, x]), Je = b.useMemo(() => x && z && Ne && {
    "aria-activedescendant": `${M}-${i}`
  }, [x, z, Ne, M, i]), tt = b.useMemo(() => ({
    "aria-orientation": O === "both" ? void 0 : O,
    ...ne ? {} : Je,
    onKeyDown(Q) {
      if (Q.key === "Tab" && Q.shiftKey && z && !x) {
        const ce = kl(Q.nativeEvent);
        if (ce && !it(he.current, ce))
          return;
        kn(Q), G.setOpen(!1, vt(xu, Q.nativeEvent)), Kt(te) && te.focus();
        return;
      }
      Ze(Q);
    },
    onPointerMove(Q) {
      Rv(Q) || (se.current = !0);
    }
  }), [Je, Ze, he, O, ne, G, z, x, te]), Xe = b.useMemo(() => {
    function Q(Ce) {
      G.setOpen(!0, vt(Nh, Ce.nativeEvent, Ce.currentTarget));
    }
    function ce(Ce) {
      v === "auto" && Jx(Ce.nativeEvent) && (H.current = !x);
    }
    function He(Ce) {
      H.current = v, v === "auto" && Cm(Ce.nativeEvent) && (H.current = !0);
    }
    return {
      onKeyDown(Ce) {
        const Ge = G.select("open");
        se.current = !1;
        const nt = Ce.key.startsWith("Arrow"), Tt = uT(Ce.key, Ue(), y), St = Hc(Ce.key, O), Bt = (h ? Tt : St) || Ce.key === "Enter" || Ce.key.trim() === "";
        if (x && Ge)
          return Ze(Ce);
        if (!(!Ge && !A && nt)) {
          if (Bt) {
            const Nt = Hc(Ce.key, Ue());
            ve.current = h && Nt ? null : Ce.key;
          }
          if (h) {
            Tt && (kn(Ce), Ge ? (F.current = we(), D(Ce)) : Q(Ce));
            return;
          }
          St && (Te.current != null && (F.current = Te.current), kn(Ce), !Ge && A ? Q(Ce) : Ze(Ce), Ge && D(Ce));
        }
      },
      onFocus(Ce) {
        G.select("open") && !x && (F.current = -1, D(Ce));
      },
      onPointerDown: He,
      onPointerEnter: He,
      onMouseDown: ce,
      onClick: ce
    };
  }, [Ze, v, we, h, D, G, A, O, Ue, y, Te, x]), ye = b.useMemo(() => ({
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
function hT(n, o) {
  const {
    listRef: r,
    elementsRef: i,
    activeIndex: c,
    onMatch: f,
    disabledIndices: d,
    onTyping: m,
    enabled: g = !0,
    resetMs: h = 750,
    selectedIndex: y = null
  } = o, x = "rootStore" in n ? n.rootStore : n, v = x.useState("open"), E = La(), A = b.useRef(""), T = b.useRef(y ?? c ?? -1), O = b.useRef(null), w = Fe((N) => {
    function I(he) {
      return i?.current[he];
    }
    function q(he) {
      const be = I(he);
      return be && !wu(be) || be?.matches(":disabled") ? !1 : d == null || !ou(li, he, d);
    }
    function G(he, be, V = 0) {
      if (he.length === 0)
        return -1;
      const H = (V % he.length + he.length) % he.length, F = be.toLowerCase();
      for (let ve = 0; ve < he.length; ve += 1) {
        const se = (H + ve) % he.length;
        if (!(!he[se]?.toLowerCase().startsWith(F) || !q(se)))
          return se;
      }
      return -1;
    }
    const z = r.current;
    if (A.current.length > 0 && N.key === " " && (kn(N), m?.(!0)), A.current.length > 0 && A.current[0] !== " " && G(z, A.current) === -1 && N.key !== " " && m?.(!1), z == null || // Character key.
    N.key.length !== 1 || // Modifier key.
    N.ctrlKey || N.metaKey || N.altKey)
      return;
    v && N.key !== " " && (kn(N), m?.(!0));
    const P = A.current === "";
    P && (T.current = y ?? c ?? -1), z.every((he, be) => he && q(be) ? he[0]?.toLowerCase() !== he[1]?.toLowerCase() : !0) && A.current === N.key && (A.current = "", T.current = O.current), A.current += N.key, E.start(h, () => {
      A.current = "", T.current = O.current, m?.(!1);
    });
    const fe = ((P ? y ?? c ?? -1 : T.current) ?? 0) + 1, ne = G(z, A.current, fe);
    ne !== -1 ? (f?.(ne), O.current = ne) : N.key !== " " && (A.current = "", m?.(!1));
  }), M = Fe((N) => {
    const I = N.relatedTarget, q = x.select("domReferenceElement"), G = x.select("floatingElement");
    it(q, I) || it(G, I) || (E.clear(), A.current = "", T.current = O.current, m?.(!1));
  });
  Qe(() => {
    !v && y !== null || (E.clear(), O.current = null, A.current !== "" && (A.current = ""));
  }, [v, y, E]);
  const R = b.useMemo(() => ({
    onKeyDown: w,
    onBlur: M
  }), [w, M]);
  return b.useMemo(() => g ? {
    reference: R,
    floating: R
  } : {}, [g, R]);
}
(function(n) {
  return n.open = "data-open", n.closed = "data-closed", n[n.startingStyle = tv.startingStyle] = "startingStyle", n[n.endingStyle = tv.endingStyle] = "endingStyle", n.anchorHidden = "data-anchor-hidden", n.side = "data-side", n.align = "data-align", n;
})({});
const mT = {
  "data-popup-open": ""
}, pT = {
  "data-popup-open": "",
  "data-pressed": ""
}, gT = {
  "data-open": ""
}, bT = {
  "data-closed": ""
}, yT = {
  "data-anchor-hidden": ""
}, vT = {
  open(n) {
    return n ? mT : null;
  }
}, xT = {
  open(n) {
    return n ? pT : null;
  }
}, Om = {
  open(n) {
    return n ? gT : bT;
  },
  anchorHidden(n) {
    return n ? yT : null;
  }
};
({
  ...Om,
  ...Su
});
function ST(n) {
  return mm(19) ? n : n ? "true" : void 0;
}
const ET = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    cutout: i,
    ...c
  } = o;
  let f;
  if (i) {
    const d = i.getBoundingClientRect();
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
function CT(n) {
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
function oi(n, o) {
  const r = b.useRef(n), i = Fe(o);
  Qe(() => {
    r.current !== n && i(r.current), r.current = n;
  }, [n, i]);
}
function RT(n, o) {
  const r = Fe((f, d) => {
    (typeof n == "function" ? n() : n) || o(d || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (As ? "touch" : ""));
  }), {
    onClick: i,
    onPointerDown: c
  } = CT(r);
  return b.useMemo(() => ({
    onClick: i,
    onPointerDown: c
  }), [i, c]);
}
function _T(n) {
  const [o, r] = b.useState(null), i = RT(n, r);
  return oi(n, (c) => {
    c && !n && r(null);
  }), b.useMemo(() => ({
    openMethod: o,
    triggerProps: i
  }), [o, i]);
}
function wT(n) {
  const o = b.useRef(!0);
  o.current && (o.current = !1, n());
}
function AT(n, o, r, i, c, f, d, m, g, h = 2) {
  const y = v2(r.current, {
    event: n,
    orientation: i,
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
  return ps(r.current, y) ? void 0 : y;
}
const b1 = /* @__PURE__ */ b.createContext(void 0), y1 = /* @__PURE__ */ b.createContext(void 0), v1 = /* @__PURE__ */ b.createContext(void 0), x1 = /* @__PURE__ */ b.createContext(!1), S1 = /* @__PURE__ */ b.createContext("");
function zl() {
  const n = b.useContext(b1);
  if (!n)
    throw new Error(Eo(22));
  return n;
}
function Ou() {
  const n = b.useContext(y1);
  if (!n)
    throw new Error(Eo(23));
  return n;
}
function Ms() {
  const n = b.useContext(v1);
  if (!n)
    throw new Error(Eo(24));
  return n;
}
function km() {
  return b.useContext(S1);
}
function MT() {
  return b.useContext(x1);
}
const TT = (n, o) => Object.is(n, o);
function Va(n, o, r) {
  return n == null || o == null ? Object.is(n, o) : r(n, o);
}
function OT(n, o, r) {
  return !n || n.length === 0 ? !1 : n.some((i) => i === void 0 ? !1 : Va(o, i, r));
}
function E1(n, o, r) {
  return !n || n.length === 0 ? -1 : n.findIndex((i) => i === void 0 ? !1 : Va(i, o, r));
}
function ah(n, o, r, i) {
  const c = i && Array.isArray(o) ? o[o.length - 1] : o, f = E1(n, c, r);
  return f === -1 ? null : f;
}
function kT(n, o, r) {
  return n.filter((i) => !Va(o, i, r));
}
function Ih(n) {
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
function Nm(n) {
  return n != null && n.length > 0 && typeof n[0] == "object" && n[0] != null && "items" in n[0];
}
function NT(n) {
  if (!Array.isArray(n))
    return n != null && "null" in n;
  const o = n;
  if (Nm(o)) {
    for (const r of o)
      for (const i of r.items)
        if (i && i.value == null && i.label != null)
          return !0;
    return !1;
  }
  for (const r of o)
    if (r && r.value == null && r.label != null)
      return !0;
  return !1;
}
function ao(n, o) {
  if (o && n != null)
    return o(n) ?? "";
  if (n && typeof n == "object") {
    if ("label" in n && n.label != null)
      return String(n.label);
    if ("value" in n)
      return String(n.value);
  }
  return Ih(n);
}
function is(n, o) {
  return o && n != null ? o(n) ?? "" : n && typeof n == "object" && "value" in n && "label" in n ? Ih(n.value) : Ih(n);
}
function C1(n, o, r) {
  function i() {
    return ao(n, r);
  }
  if (r && n != null)
    return r(n);
  if (n && typeof n == "object" && "label" in n && n.label != null)
    return n.label;
  if (o && !Array.isArray(o))
    return o[n] ?? i();
  if (Array.isArray(o)) {
    const c = o, f = Nm(c) ? c.flatMap((d) => d.items) : c;
    if (n == null || typeof n != "object") {
      const d = f.find((m) => m.value === n);
      return d && d.label != null ? d.label : i();
    }
    if ("value" in n) {
      const d = f.find((m) => m && m.value === n.value);
      if (d && d.label != null)
        return d.label;
    }
  }
  return i();
}
function zT(n, o, r) {
  return n.reduce((i, c, f) => (f > 0 && i.push(", "), i.push(/* @__PURE__ */ S.jsx(b.Fragment, {
    children: C1(c, o, r)
  }, f)), i), []);
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
  hasNullItemLabel: (n, o) => o ? NT(n.items) : !1,
  open: (n) => n.open,
  mounted: (n) => n.mounted,
  forceMounted: (n) => n.forceMounted,
  inline: (n) => n.inline,
  activeIndex: (n) => n.activeIndex,
  selectedIndex: (n) => n.selectedIndex,
  isActive: (n, o) => n.activeIndex === o,
  isSelected: (n, o) => {
    const r = n.isItemEqualToValue, i = n.selectedValue;
    return Array.isArray(i) ? i.some((c) => Va(o, c, r)) : Va(o, i, r);
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
}, DT = {
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
}, R1 = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, jT = {
  disabled: !1,
  ...R1
}, _1 = {
  valid(n) {
    return n === null ? null : n ? {
      "data-valid": ""
    } : {
      "data-invalid": ""
    };
  }
}, w1 = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: DT,
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
  state: jT,
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
}, A1 = /* @__PURE__ */ b.createContext(w1);
function gi(n = !0) {
  const o = b.useContext(A1);
  if (o.setValidityData === Xt && !n)
    throw new Error(Eo(28));
  return o;
}
function M1(n, o, r, i, c = !0, f) {
  const {
    registerFieldControl: d
  } = gi(), m = Nl(() => /* @__PURE__ */ Symbol());
  Qe(() => {
    const g = m.current;
    if (!c) {
      d(g, void 0);
      return;
    }
    d(g, {
      controlRef: n,
      getValue: i,
      id: o,
      name: f,
      value: r
    });
  }, [n, c, i, o, f, d, m, r]), Qe(() => {
    const g = m.current;
    return () => {
      d(g, void 0);
    };
  }, [d, m]);
}
const LT = /* @__PURE__ */ b.createContext({
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
function T1() {
  return b.useContext(LT);
}
const VT = /* @__PURE__ */ b.createContext({
  controlId: void 0,
  registerControlId: Xt,
  labelId: void 0,
  setLabelId: Xt,
  messageIds: [],
  setMessageIds: Xt,
  getDescriptionProps: (n) => n
});
function ku() {
  return b.useContext(VT);
}
function zm(n = {}) {
  const {
    id: o,
    implicit: r = !1,
    controlRef: i
  } = n, {
    controlId: c,
    registerControlId: f
  } = ku(), d = vu(o), m = r ? c : void 0, g = Nl(() => /* @__PURE__ */ Symbol()), h = b.useRef(!1), y = b.useRef(o != null), x = Fe(() => {
    !h.current || f === Xt || (h.current = !1, f(g.current, void 0));
  });
  return Qe(() => {
    if (f === Xt)
      return;
    let v;
    if (r) {
      const E = i?.current;
      dn(E) && E.closest("label") != null ? v = o ?? null : v = m ?? d;
    } else if (o != null)
      y.current = !0, v = o;
    else if (y.current)
      v = d;
    else {
      x();
      return;
    }
    if (v === void 0) {
      x();
      return;
    }
    h.current = !0, f(g.current, v);
  }, [o, i, m, f, r, d, g, x]), b.useEffect(() => x, [x]), c ?? d;
}
function O1(n) {
  return n == null ? void 0 : `${n}-popup`;
}
function IT(n, o) {
  return (r, i) => r == null ? !1 : n.contains(r, i, o);
}
function k1(n) {
  return Array.isArray(n) ? n.map((o) => k1(o)).join(",") : n == null ? "" : String(n);
}
const _v = /* @__PURE__ */ new Map();
function HT(n = {}) {
  const o = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...n
  }, r = `${k1(n.locale)}|${JSON.stringify(o)}`, i = _v.get(r);
  if (i)
    return i;
  const c = new Intl.Collator(n.locale, o), f = {
    contains(d, m, g) {
      if (!m)
        return !0;
      const h = ao(d, g);
      for (let y = 0; y <= h.length - m.length; y += 1)
        if (c.compare(h.slice(y, y + m.length), m) === 0)
          return !0;
      return !1;
    },
    startsWith(d, m, g) {
      if (!m)
        return !0;
      const h = ao(d, g);
      return c.compare(h.slice(0, m.length), m) === 0;
    },
    endsWith(d, m, g) {
      if (!m)
        return !0;
      const h = ao(d, g), y = m.length;
      return h.length >= y && c.compare(h.slice(h.length - y), m) === 0;
    }
  };
  return _v.set(r, f), f;
}
const UT = HT;
function BT(n, o = !1) {
  const {
    overflowY: r
  } = bl(n);
  return r !== "auto" && r !== "scroll" ? !1 : o ? n.clientHeight > 0 : n.scrollHeight > n.clientHeight;
}
function GT(n, o, r = (i, c) => i === c) {
  return n.length === o.length && n.every((i, c) => r(i, o[c]));
}
const N1 = /* @__PURE__ */ Symbol("none"), rh = {
  value: N1,
  index: -1
}, YT = /* @__PURE__ */ b.createContext(void 0);
function Dm() {
  return b.useContext(YT)?.direction ?? "ltr";
}
function qT(n) {
  const {
    id: o,
    onOpenChangeComplete: r,
    defaultSelectedValue: i = null,
    selectedValue: c,
    onSelectedValueChange: f,
    defaultInputValue: d,
    inputValue: m,
    open: g,
    defaultOpen: h = !1,
    selectionMode: y,
    onItemHighlighted: x,
    name: v,
    form: E,
    disabled: A = !1,
    readOnly: T = !1,
    required: O = !1,
    inputRef: w,
    grid: M = !1,
    items: R,
    filteredItems: N,
    filter: I,
    openOnInputClick: q = !0,
    autoHighlight: G = !1,
    keepHighlight: z = !1,
    highlightItemOnHover: P = !0,
    loopFocus: te = !0,
    itemToStringLabel: ie,
    itemToStringValue: fe,
    isItemEqualToValue: ne = TT,
    virtualized: he = !1,
    inline: be = !1,
    fillInputOnItemPress: V = !0,
    modal: H = !1,
    limit: F = -1,
    autoComplete: ve = "list",
    formAutoComplete: se,
    locale: D,
    submitOnItemClick: K = !1
  } = n, {
    clearErrors: le
  } = T1(), {
    setDirty: oe,
    validityData: pe,
    setFilled: _e,
    name: qe,
    disabled: Ae,
    setTouched: Te,
    setFocused: at,
    validationMode: pt,
    validation: ze
  } = gi(), et = Dm(), Ne = zm({
    id: o
  }), Le = UT({
    locale: D
  }), [Ue, we] = b.useState(!1), [Ze, Oe] = b.useState(null), Je = b.useRef([]), tt = b.useRef([]), Xe = b.useRef(null), ye = b.useRef(null), Q = b.useRef(null), ce = b.useRef(null), He = b.useRef(null), Ce = b.useRef(!0), Ge = b.useRef(!1), nt = b.useRef(null), Tt = b.useRef(null), St = b.useRef(null), Bt = b.useRef(rh), Nt = b.useRef(null), xt = b.useRef([]), on = b.useRef(null), st = Ae || A, Et = qe ?? v, Jt = y === "multiple", _n = y === "single", Ft = m !== void 0 || d !== void 0, Wt = R !== void 0, ot = N !== void 0;
  let ut;
  G === "always" ? ut = "always" : ut = G ? "input-change" : !1;
  const [Ke, Qt] = Xc({
    controlled: c,
    default: Jt ? i ?? li : i,
    name: "Combobox",
    state: "selectedValue"
  }), wn = b.useMemo(() => I === null ? () => !0 : I !== void 0 ? I : IT(Le, ie), [I, Le, ie]), An = Nl(() => Ft ? d ?? "" : _n ? ao(Ke, ie) : "").current, [Yt, nl] = Xc({
    controlled: m,
    default: An,
    name: "Combobox",
    state: "inputValue"
  }), [zt, io] = Xc({
    controlled: g,
    default: h,
    name: "Combobox",
    state: "open"
  }), Fn = Nm(R), an = Ze ?? String(Yt).trim(), so = _n ? ao(Ke, ie) : "", Dl = _n && !Ue && an !== "" && so.length === an.length && Le.contains(so, an), ll = Dl ? "" : an, Co = Wt && ot && Dl, rn = b.useMemo(() => R ? Fn ? R.flatMap((Y) => Y.items) : R : li, [R, Fn]), Ct = b.useMemo(() => {
    if (N && !Co)
      return N;
    if (!R)
      return li;
    if (Fn) {
      const Z = R, Se = [];
      let Re = 0;
      for (const Ie of Z) {
        if (F > -1 && Re >= F)
          break;
        const ke = F > -1 ? F - Re : 1 / 0, Me = ll === "" ? Ie.items.slice(0, ke) : [];
        if (ll !== "")
          for (const _t of Ie.items) {
            if (Me.length >= ke)
              break;
            wn(_t, ll, ie) && Me.push(_t);
          }
        if (Me.length > 0) {
          const _t = {
            ...Ie,
            items: Me
          };
          Se.push(_t), Re += Me.length;
        }
      }
      return Se;
    }
    if (ll === "")
      return F > -1 ? rn.slice(0, F) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        rn
      );
    const Y = [];
    for (const Z of rn) {
      if (F > -1 && Y.length >= F)
        break;
      wn(Z, ll, ie) && Y.push(Z);
    }
    return Y;
  }, [N, Co, R, Fn, ll, F, wn, ie, rn]), Rt = b.useMemo(() => Fn ? Ct.flatMap((Z) => Z.items) : Ct, [Ct, Fn]), Ye = Nl(() => {
    let Y = null;
    return be && zt && Wt && y !== "none" && (Y = ah(Rt, Ke, ne, Jt)), new g1({
      id: Ne,
      labelId: void 0,
      selectedValue: Ke,
      open: zt,
      items: R,
      selectionMode: y,
      listRef: Je,
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
      form: E,
      disabled: st,
      readOnly: T,
      required: O,
      grid: M,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: ie,
      isItemEqualToValue: ne,
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
  }).current, Gn = y === "none" ? Yt : Ke, Ba = b.useMemo(() => y === "none" ? Gn : Array.isArray(Ke) ? Ke.map((Y) => is(Y, fe)) : is(Ke, fe), [Gn, fe, y, Ke]), dt = Fe(x), Ga = Fe(r), $l = xe(Ye, Ee.activeIndex), co = xe(Ye, Ee.selectedIndex), Yn = xe(Ye, Ee.positionerElement), jl = xe(Ye, Ee.listElement), ol = xe(Ye, Ee.triggerElement), al = xe(Ye, Ee.inputElement), en = xe(Ye, Ee.inputGroupElement), mn = xe(Ye, Ee.inline), Mn = xe(Ye, Ee.inputInsidePopup), Jl = xe(Ye, Ee.inputOwnsFormValue), yl = pl(ol), {
    mounted: Ya,
    setMounted: Qo,
    transitionStatus: Zo
  } = Em(zt), {
    openMethod: Rr,
    triggerProps: Wl
  } = _T(zt), $o = Fe(() => Ba);
  M1(Mn ? yl : ye, Ne, Gn, $o, !st, v);
  const rl = Fe(() => {
    R ? tt.current = Rt.map((Y) => ao(Y, ie)) : Ye.set("forceMounted", !0);
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
    dt(Y, qM(Se, void 0, {
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
      if (Z.reason === fs) {
        zt && Ze !== null && Oe(null);
        const Se = Z.event, Re = Se.inputType;
        if (Se.type === "compositionend" || Re != null && Re !== "" && Re !== "insertReplacementText") {
          const ke = Y.trim() !== "";
          ke && we(!0), Nt.current = {
            hasQuery: ke
          };
          const Me = Ye.state.listElement;
          if (!Ye.state.virtualized && Me) {
            const _t = Xe.current;
            for (const Ht of fi(Me.firstElementChild ?? Me)) {
              if (!Kt(Ht) || (_t ? !it(_t, Ht) : Ht.getAttribute("role") === "dialog"))
                break;
              if (BT(Ht)) {
                Ht.scrollTop = 0;
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
    if (zt !== Y && (Z.reason === vm && Wt && Rt.length === 0 && !He.current && Z.allowPropagation(), n.onOpenChange?.(Y, Z), !Z.isCanceled && (Y && Mn && !mn && Ze !== null && (we(!1), Oe(null), Yt !== "" && Z.reason !== fs && Zn("", vt(yo, Z.event))), !Y && Ue && (_n ? (mn || Oe(an), an === "" && we(!1)) : Jt && (mn || Oe(an), Mn && Qn({
      activeIndex: null
    }), (!Mn || mn) && Zn("", vt(yo, Z.event)))), io(Y), !Y && Mn && (Z.reason === xu || Z.reason === ym) && (Te(!0), at(!1), pt === "onBlur")))) {
      const Se = y === "none" ? Yt : Ke;
      ze.commit(Se);
    }
  }), Dn = Fe((Y, Z) => {
    if (f?.(Y, Z), Z.isCanceled)
      return;
    Qt(Y), (y === "none" && Xe.current && V || _n && !Ye.state.inputInsidePopup) && Zn(ao(Y, ie), vt(Z.reason, Z.event));
  }), Ro = Fe((Y, Z) => {
    const Se = kl(Y), Re = St.current ?? Y;
    St.current = null;
    const Ie = vt(UM, Re), ke = Se?.closest("a")?.getAttribute("href");
    if (ke) {
      ke.startsWith("#") && zn(!1, Ie);
      return;
    }
    if (Jt) {
      const Me = Array.isArray(Ke) ? Ke : [], Ht = OT(Me, Z, ne) ? kT(Me, Z, ne) : [...Me, Z];
      if (Dn(Ht, Ie), Ie.isCanceled || !(ye.current ? ye.current.value.trim() !== "" : !1))
        return;
      Ye.state.inputInsidePopup ? Zn("", vt(yo, Ie.event)) : zn(!1, Ie);
    } else {
      if (Dn(Z, Ie), Ie.isCanceled)
        return;
      zn(!1, Ie);
    }
  }), bi = Fe(() => {
    const Y = ze.inputRef.current?.form ?? Ye.state.inputElement?.form;
    Y && typeof Y.requestSubmit == "function" && Y.requestSubmit();
  }), Tn = Fe(() => {
    if (Qo(!1), Ga?.(!1), we(!1), Oe(null), Qn(y === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), Jt && ye.current && ye.current.value !== "" && !Ge.current && Zn("", vt(yo)), _n)
      if (Ye.state.inputInsidePopup)
        ye.current && ye.current.value !== "" && Zn("", vt(yo));
      else {
        const Y = ao(Ke, ie);
        ye.current && ye.current.value !== Y && Zn(Y, vt(Y === "" ? yo : Xl));
      }
  }), qa = b.useMemo(() => mn && Yn ? {
    current: Yn.closest('[role="dialog"]')
  } : Xe, [mn, Yn]);
  Eu({
    enabled: !n.actionsRef,
    open: zt,
    ref: qa,
    onComplete() {
      zt || Tn();
    }
  }), b.useImperativeHandle(n.actionsRef, () => ({
    unmount: Tn
  }), [Tn]), Qe(function() {
    if (zt || (on.current = null, y === "none"))
      return;
    const Z = Wt ? rn : xt.current;
    Qn({
      selectedIndex: ah(Z, Ke, ne, Jt)
    });
  }, [zt, Ke, y, Jt, Wt, rn, ne, Qn]), Qe(() => {
    R && (xt.current = Rt, Je.current.length = Rt.length);
  }, [R, Rt]), Qe(() => {
    const Y = Nt.current;
    if (Y) {
      const _t = zt || mn || Ye.state.positionerElement?.hidden === !1;
      if (Y.hasQuery)
        ut && _t && Ye.set("activeIndex", 0), Nt.current = null;
      else if (String(Yt).trim() === "" && (Nt.current = null, _t)) {
        const Ht = Y.selection;
        ut === "always" && !Ht && Ye.state.selectionMode === "none" && Ye.set("activeIndex", 0), queueMicrotask(() => {
          if (!Ye.state.open && !Ye.state.inline || ye.current && ye.current.value.trim() !== "")
            return;
          const tn = Ye.state.selectedValue, Jn = Ye.state.selectionMode === "multiple", Ot = Jn && Array.isArray(tn) ? tn[tn.length - 1] : tn, pn = Ye.state.selectionMode !== "none" && Ot != null;
          if (pn || Ht) {
            const Sn = Wt || ot ? Rt : xt.current;
            Ye.set("activeIndex", pn ? ah(Sn, tn, Ye.state.isItemEqualToValue, Jn) : null);
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
    const Ie = Se[Re], ke = Bt.current.value, Me = ke !== N1 && Va(Ie, ke, Ye.state.isItemEqualToValue);
    (Bt.current.index !== Re || !Me) && sn(Ie, Re, Xl);
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
      _e(String(Yt) !== "");
      return;
    }
    _e(Jt ? Array.isArray(Ke) && Ke.length > 0 : Ke != null);
  }, [_e, y, Yt, Ke, Jt]), b.useEffect(() => {
    Wt && ut && Rt.length === 0 && Qn({
      activeIndex: null
    });
  }, [Wt, ut, Rt.length, Qn]);
  function _r(Y) {
    const Z = pe.initialValue;
    return Array.isArray(Y) && Array.isArray(Z) ? !GT(Y, Z, (Se, Re) => Va(Se, Re, ne)) : Y !== Z;
  }
  oi(an, () => {
    !zt || an === "" || an === String(An) || we(!0);
  });
  function Jo() {
    const Y = ao(Ke, ie);
    Yt !== Y && Zn(Y, vt(Xl));
  }
  oi(Ke, () => {
    y !== "none" && (le(Et), oe(_r(Ke)), ze.change(Ke), _n && !Ft && !Mn && Jo());
  }), oi(Yt, () => {
    y === "none" && (le(Et), oe(Yt !== pe.initialValue), ze.change(Yt));
  }), oi(R, () => {
    !_n || Ft || Mn || Ue || Jo();
  });
  const vl = rT({
    open: mn ? !0 : zt,
    onOpenChange: zn,
    elements: {
      reference: Mn ? ol : al,
      floating: Yn
    }
  }), Pa = M ? "grid" : "listbox", _o = zt || mn, Ll = _o ? "true" : "false", il = b.useMemo(() => {
    const Y = al?.tagName === "INPUT", Z = al == null || Y, Se = Z || _o, Re = Z ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return Se && (Re.role = "combobox", Re["aria-expanded"] = Ll, Re["aria-haspopup"] = Pa, Re["aria-controls"] = _o ? jl?.id : void 0, Re["aria-autocomplete"] = ve), {
      reference: Re,
      floating: {
        role: "presentation"
      }
    };
  }, [al, _o, Ll, Pa, jl?.id, ve]), Wo = m1(vl, {
    enabled: !T && !st && q,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Mn ? 0 : 100,
    reason: GM
  }), cn = q2(vl, {
    enabled: !T && !st && !mn,
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
      return !it(ol, Z) && !it(Tt.current, Z) && !it(nt.current, Z) && !it(en, Z);
    }
  }), sl = dT(vl, {
    enabled: !T && !st,
    id: Ne,
    listRef: Je,
    activeIndex: $l,
    selectedIndex: co,
    virtual: !0,
    loopFocus: te,
    allowEscape: te && !ut,
    focusItemOnOpen: Ue || y === "none" && !ut ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !z,
    orientation: M ? "horizontal" : void 0,
    rtl: et === "rtl",
    disabledIndices: li,
    grid: M ? AT : void 0,
    onNavigate(Y, Z) {
      !Z && !zt || Zo === "ending" || Qn(Z ? {
        activeIndex: Y,
        type: Ce.current ? xm : Sm
      } : {
        activeIndex: Y
      });
    }
  }), eo = b.useMemo(() => ii(sl.reference, {
    onKeyDown(Y) {
      M && Ye.state.activeIndex == null && (Y.key === "ArrowLeft" || Y.key === "ArrowRight") && Y.preventBaseUIHandler();
    }
  }, cn.reference, Wo.reference, il.reference), [sl.reference, cn.reference, Wo.reference, il.reference, M, Ye]), wo = b.useMemo(() => ii(oT, cn.floating), [cn.floating]), to = b.useMemo(() => ii(sl.floating, il.floating), [sl.floating, il.floating]), $n = b.useMemo(() => {
    const Y = sl.item;
    return Y ? {
      ...Y,
      onFocus: void 0
    } : gl;
  }, [sl.item]);
  wT(() => {
    Ye.update({
      inline: be,
      popupProps: wo,
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
      requestSubmit: bi,
      onOpenChangeComplete: Ga
    });
  }), Qe(() => {
    Ye.update({
      id: Ne,
      selectedValue: Ke,
      open: zt,
      mounted: Ya,
      transitionStatus: Zo,
      items: R,
      inline: be,
      popupProps: wo,
      listProps: to,
      inputProps: eo,
      triggerProps: Wl,
      openMethod: Rr,
      itemProps: $n,
      selectionMode: y,
      name: Et,
      form: E,
      disabled: st,
      readOnly: T,
      required: O,
      grid: M,
      virtualized: he,
      openOnInputClick: q,
      itemToStringLabel: ie,
      modal: H,
      autoHighlight: ut,
      isItemEqualToValue: ne,
      submitOnItemClick: K,
      hasInputValue: Ft,
      inputOwnsFormValue: y === "none" && (be || !Ye.state.inputInsidePopup)
    });
  }, [Ye, Ne, Ke, zt, Ya, Zo, R, wo, to, eo, $n, Rr, Wl, y, Et, st, T, O, M, he, q, ie, H, ne, K, Ft, be, ut, E]);
  const _ = pr(w, ze.inputRef), k = b.useMemo(() => ({
    query: an,
    hasItems: Wt,
    filteredItems: Ct,
    flatFilteredItems: Rt
  }), [an, Wt, Ct, Rt]), j = b.useMemo(() => Array.isArray(Gn) ? "" : is(Gn, fe), [Gn, fe]), U = Jt && Array.isArray(Ke) && Ke.length > 0, ee = Jt || y === "none" && Jl ? void 0 : Et, re = b.useMemo(() => !Jt || !Array.isArray(Ke) || !Et ? null : Ke.map((Y) => {
    const Z = is(Y, fe);
    return /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: E,
      name: Et,
      value: Z,
      disabled: st
    }, Z);
  }), [Jt, Ke, E, Et, fe, st]), ge = /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [n.children, /* @__PURE__ */ S.jsx("input", {
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
          if (Y.nativeEvent.defaultPrevented || st || T)
            return;
          const Z = Y.currentTarget.value, Se = Z.toLowerCase(), Re = vt(Xl, Y.nativeEvent), Ie = () => xt.current.findIndex((Me) => is(Me, fe).toLowerCase() === Se || ao(Me, ie).toLowerCase() === Se);
          function ke() {
            if (Jt)
              return;
            if (y === "none") {
              Zn(Z, Re);
              return;
            }
            let Me = Ie();
            Me === -1 && (Me = xt.current.findIndex((Ht, tn) => {
              const Jn = tt.current[tn];
              return Jn != null && Jn.toLowerCase() === Se;
            }));
            const _t = Me === -1 ? void 0 : xt.current[Me];
            _t != null && Dn?.(_t, Re);
          }
          _n && (rl(), R && Ie() === -1 && Ye.set("forceMounted", !0)), queueMicrotask(ke);
        }
      }),
      id: Ne && ee == null ? `${Ne}-hidden-input` : void 0,
      form: E,
      name: ee,
      autoComplete: se,
      disabled: st,
      required: O && !U,
      readOnly: T,
      value: j,
      ref: _,
      style: ee ? Am : wm,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), re]
  });
  return /* @__PURE__ */ S.jsx(b1.Provider, {
    value: Ye,
    children: /* @__PURE__ */ S.jsx(y1.Provider, {
      value: vl,
      children: /* @__PURE__ */ S.jsx(x1.Provider, {
        value: Wt,
        children: /* @__PURE__ */ S.jsx(v1.Provider, {
          value: k,
          children: /* @__PURE__ */ S.jsx(S1.Provider, {
            value: Yt,
            children: ge
          })
        })
      })
    })
  });
}
const z1 = {
  ...xT,
  ..._1,
  popupSide: (n) => n ? {
    "data-popup-side": n
  } : null,
  listEmpty: (n) => n ? {
    "data-list-empty": ""
  } : null
}, Uc = 5;
function PT(n, o) {
  const r = XT(o);
  return n.clientX >= r.left - Uc && n.clientX <= r.right + Uc && n.clientY >= r.top - Uc && n.clientY <= r.bottom + Uc;
}
function XT(n) {
  const o = n.getBoundingClientRect(), r = hn(n);
  if ($x)
    return o;
  const i = r.getComputedStyle(n, "::before"), c = r.getComputedStyle(n, "::after");
  if (!(i.content !== "none" || c.content !== "none"))
    return o;
  const d = parseFloat(i.width) || 0, m = parseFloat(i.height) || 0, g = parseFloat(c.width) || 0, h = parseFloat(c.height) || 0, y = Math.max(o.width, d, g), x = Math.max(o.height, m, h), v = y - o.width, E = x - o.height;
  return {
    left: o.left - v / 2,
    right: o.right + v / 2,
    top: o.top - E / 2,
    bottom: o.bottom + E / 2
  };
}
function KT(n, o) {
  return n ?? o;
}
function D1(n) {
  const o = xe(n, Ee.mounted), r = xe(n, Ee.popupSide), i = xe(n, Ee.positionerElement);
  return o && i ? r : null;
}
function Nu() {
  return Ms().filteredItems.length === 0;
}
function FT(n) {
  return n === "rtl" ? ["ArrowRight", "ArrowLeft"] : ["ArrowLeft", "ArrowRight"];
}
function QT(n, o) {
  const r = n >= o - 1 ? o - 2 : n;
  return r >= 0 ? r : void 0;
}
function j1(n, o, r) {
  const i = n.state.listRef.current[o];
  i && (n.state.selectionEventRef.current = r, i.click(), n.state.selectionEventRef.current = null);
}
const ZT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    nativeButton: f = !0,
    disabled: d = !1,
    id: m,
    style: g,
    ...h
  } = o, {
    state: y,
    disabled: x,
    setTouched: v,
    setFocused: E,
    validationMode: A,
    validation: T
  } = gi(), {
    labelId: O
  } = ku(), w = zl(), M = xe(w, Ee.selectionMode), R = xe(w, Ee.disabled), N = xe(w, Ee.readOnly), I = xe(w, Ee.required), q = xe(w, Ee.positionerElement), G = xe(w, Ee.listElement), z = xe(w, Ee.popupId), P = xe(w, Ee.triggerProps), te = xe(w, Ee.inputInsidePopup), ie = xe(w, Ee.id), fe = xe(w, Ee.labelId), ne = xe(w, Ee.open), he = xe(w, Ee.selectedValue), be = xe(w, Ee.activeIndex), V = xe(w, Ee.selectedIndex), H = xe(w, Ee.hasSelectedValue), F = Ou(), ve = km(), se = La(), D = x || R || d, K = Nu(), le = D1(w);
  zm({
    id: te ? m : void 0
  });
  const oe = te ? m ?? ie : m, pe = KT(O, fe);
  let _e;
  ne && te ? _e = z ?? O1(ie) : ne && (_e = G?.id);
  const qe = b.useRef("");
  function Ae(Ue) {
    qe.current = Ue.pointerType;
  }
  const {
    reference: Te
  } = hT(F, {
    enabled: !ne && !N && !R && M === "single",
    listRef: w.state.labelsRef,
    activeIndex: be,
    selectedIndex: V,
    onMatch(Ue) {
      const we = w.state.valuesRef.current[Ue];
      we !== void 0 && w.state.setSelectedValue(we, vt(Xl));
    }
  }), {
    reference: at
  } = m1(F, {
    enabled: !N && !R,
    event: "mousedown"
  }), {
    buttonRef: pt,
    getButtonProps: ze
  } = ws({
    native: f,
    disabled: D
  }), et = {
    ...y,
    open: ne,
    disabled: D,
    popupSide: le,
    listEmpty: K,
    placeholder: M === "none" ? !1 : !H
  }, Ne = Fe((Ue) => {
    w.set("triggerElement", Ue);
  });
  return Zl("button", o, {
    ref: [r, pt, Ne],
    state: et,
    props: [P, at, Te, {
      id: oe,
      tabIndex: te ? 0 : -1,
      role: te ? "combobox" : void 0,
      "aria-expanded": ne,
      "aria-haspopup": te ? "dialog" : "listbox",
      "aria-controls": _e,
      "aria-required": te && I || void 0,
      "aria-labelledby": pe,
      onPointerDown: Ae,
      onPointerEnter: Ae,
      onFocus() {
        E(!0), !(D || N) && se.start(0, w.state.forceMount);
      },
      onBlur(Ue) {
        if (!it(q, Ue.relatedTarget) && (v(!0), E(!1), A === "onBlur")) {
          const we = M === "none" ? ve : he;
          T.commit(we);
        }
      },
      onMouseDown(Ue) {
        if (D || N || (te || F.set("domReferenceElement", Ue.currentTarget), w.state.forceMount(), qe.current !== "touch" && (w.state.inputRef.current?.focus(), te || Ue.preventDefault()), ne))
          return;
        const we = $t(Ue.currentTarget);
        function Ze(Oe) {
          const Je = w.state.triggerElement;
          if (!Je)
            return;
          const tt = kl(Oe), Xe = w.state.positionerElement, ye = w.state.listElement;
          it(Je, tt) || it(Xe, tt) || it(ye, tt) || PT(Oe, Je) || w.state.setOpen(!1, vt(YM, Oe));
        }
        te && we.addEventListener("mouseup", Ze, {
          once: !0
        });
      },
      onKeyDown(Ue) {
        N || (Ue.key === "ArrowDown" || Ue.key === "ArrowUp") && (kn(Ue), w.state.setOpen(!0, vt(Nh, Ue.nativeEvent)), w.state.inputRef.current?.focus());
      }
    }, T.getValidationProps(D, h), ze],
    stateAttributesMapping: z1
  });
}), $T = /* @__PURE__ */ b.createContext(void 0);
function JT() {
  return b.useContext($T);
}
const L1 = /* @__PURE__ */ b.createContext(void 0);
function jm(n) {
  const o = b.useContext(L1);
  if (o === void 0 && !n)
    throw new Error(Eo(21));
  return o;
}
const V1 = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = zl(), {
    buttonRef: c,
    getButtonProps: f
  } = ws({
    native: !1
  }), d = pr(r, c);
  function m(h) {
    i.state.setOpen(!1, vt(BM, h.nativeEvent, h.currentTarget));
  }
  const g = f({
    onClick: m
  });
  return /* @__PURE__ */ S.jsx("span", {
    ref: d,
    ...g,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Am
  });
}), WT = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    disabled: f = !1,
    id: d,
    style: m,
    ...g
  } = o, {
    state: h,
    disabled: y,
    setTouched: x,
    setFocused: v,
    validationMode: E,
    validation: A
  } = gi(), {
    labelId: T
  } = ku(), O = JT(), M = !!jm(!0), R = zl(), N = km(), I = Dm(), q = xe(R, Ee.required), G = xe(R, Ee.disabled), z = xe(R, Ee.readOnly), P = xe(R, Ee.name), te = xe(R, Ee.form), ie = xe(R, Ee.selectionMode), fe = xe(R, Ee.autoHighlight), ne = xe(R, Ee.inputProps), he = xe(R, Ee.triggerProps), be = xe(R, Ee.open), V = xe(R, Ee.mounted), H = xe(R, Ee.selectedValue), F = xe(R, Ee.id), ve = xe(R, Ee.inline), se = xe(R, Ee.modal), D = !!fe, K = D1(R), le = y || G || f, oe = Nu(), pe = M || ve, _e = !pe || se, qe = vu(d ?? (pe ? void 0 : F)), Ae = M ? R1 : h, [Te, at] = b.useState(null), pt = b.useRef(!1), ze = b.useRef(null), et = b.useRef(!1), Ne = ie === "none" && !M, Le = Fe((ye) => {
    const Q = M || R.state.inline;
    Q && !R.state.hasInputValue && R.state.setInputValue("", vt(Xl)), R.update({
      inputElement: ye,
      inputInsidePopup: Q,
      inputOwnsFormValue: Ne
    });
  }), Ue = M ? g : A.getValidationProps(le, g);
  function we() {
    R.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: R.state.keyboardActiveRef.current ? xm : Sm
    });
  }
  function Ze() {
    R.state.keyboardActiveRef.current = !1;
  }
  const Oe = {
    ...Ae,
    open: be,
    disabled: le,
    readOnly: z,
    popupSide: K,
    listEmpty: oe
  };
  function Je(ye) {
    if (!O)
      return;
    let Q;
    const {
      highlightedChipIndex: ce
    } = O, He = O.chipsRef.current.length, [Ce, Ge] = FT(I);
    return ce !== void 0 ? (ye.key === Ce ? (ye.preventDefault(), ce > 0 ? Q = ce - 1 : Q = void 0) : ye.key === Ge ? (ye.preventDefault(), ce < He - 1 ? Q = ce + 1 : Q = void 0) : (ye.key === "Backspace" || ye.key === "Delete") && (ye.preventDefault(), Q = QT(ce, H.length), we()), Q) : (ye.key === Ce && (ye.currentTarget.selectionStart ?? 0) === 0 && H.length > 0 && (ye.preventDefault(), Q = He > 0 ? He - 1 : void 0), Q);
  }
  const tt = Zl("input", o, {
    state: Oe,
    ref: [r, R.state.inputRef, Le],
    props: [ne, he, {
      value: Te ?? N,
      "aria-readonly": z || void 0,
      "aria-required": q || void 0,
      "aria-labelledby": T,
      disabled: le,
      readOnly: z,
      required: ie === "none" ? q : void 0,
      form: te,
      ...Ne && P && {
        name: P
      },
      id: qe,
      onFocus() {
        if (v(!0), !ve || !et.current)
          return;
        et.current = !1;
        const ye = ze.current;
        ye == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(R.state.valuesRef.current, ye) || R.state.setIndices({
          activeIndex: ye
        });
      },
      onBlur() {
        x(!0), v(!1);
        const ye = R.state.activeIndex;
        if (ve && ye !== null && fe !== "always" && (ze.current = ye, et.current = !0, R.state.setIndices({
          activeIndex: null
        })), E === "onBlur") {
          const Q = ie === "none" ? N : H;
          A.commit(Q);
        }
      },
      onCompositionStart(ye) {
        nu || (pt.current = !0, at(ye.currentTarget.value));
      },
      onCompositionEnd(ye) {
        pt.current = !1;
        const Q = ye.currentTarget.value;
        at(null), R.state.setInputValue(Q, vt(fs, ye.nativeEvent));
      },
      onChange(ye) {
        const Q = ye.nativeEvent, ce = Q.inputType, He = !ce || ce === "insertReplacementText", Ce = pt.current || !He;
        function Ge(Bt) {
          z || le || !Bt || !Ce || (R.state.setOpen(!0, vt(fs, Q)), D || we());
        }
        if (pt.current) {
          const Bt = ye.currentTarget.value;
          at(Bt), Bt === "" && !R.state.openOnInputClick && !R.state.inputInsidePopup && R.state.setOpen(!1, vt(yo, Q));
          const Nt = Bt.trim(), xt = D && Nt !== "";
          Ge(Nt), be && R.state.activeIndex !== null && !xt && we();
          return;
        }
        const nt = vt(fs, Q);
        if (R.state.setInputValue(ye.currentTarget.value, nt), nt.isCanceled)
          return;
        const Tt = ye.currentTarget.value === "", St = vt(yo, Q);
        Tt && !R.state.inputInsidePopup && (ie === "single" && R.state.setSelectedValue(null, St), R.state.openOnInputClick || R.state.setOpen(!1, St)), Ge(ye.currentTarget.value.trim()), be && R.state.activeIndex !== null && !D && we();
      },
      onKeyDown(ye) {
        if (le || z || ye.ctrlKey || ye.shiftKey || ye.altKey || ye.metaKey)
          return;
        R.state.keyboardActiveRef.current = !0;
        const Q = ye.currentTarget, ce = Q.scrollWidth - Q.clientWidth, He = I === "rtl";
        if (ye.key === "Home") {
          kn(ye);
          const nt = lv && He ? Q.value.length : 0;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = 0;
          return;
        }
        if (ye.key === "End") {
          kn(ye);
          const nt = lv && He ? 0 : Q.value.length;
          Q.setSelectionRange(nt, nt), Q.scrollLeft = He ? -ce : ce;
          return;
        }
        if (!V && ye.key === "Escape") {
          const nt = ie === "multiple" && Array.isArray(H) ? H.length === 0 : H === null, Tt = vt(vm, ye.nativeEvent), St = ie === "multiple" ? [] : null;
          R.state.setInputValue("", Tt), R.state.setSelectedValue(St, Tt), !nt && !R.state.inline && !Tt.isPropagationAllowed && ye.stopPropagation();
          return;
        }
        if (O && ye.key === "Backspace" && Q.value === "" && O.highlightedChipIndex === void 0 && Array.isArray(H) && H.length > 0) {
          const nt = O.chipsRef.current.length, Tt = nt > 0 ? nt - 1 : H.length - 1, St = H.filter((Bt, Nt) => Nt !== Tt);
          we(), R.state.setSelectedValue(St, vt(Xl, ye.nativeEvent));
          return;
        }
        const Ce = O?.highlightedChipIndex !== void 0, Ge = Je(ye);
        if (O?.setHighlightedChipIndex(Ge), Ge !== void 0 ? O?.chipsRef.current[Ge]?.focus() : Ce && R.state.inputRef.current?.focus(), ye.which !== 229 && ye.key === "Enter" && be) {
          const nt = R.state.activeIndex, Tt = ye.nativeEvent;
          if (nt === null) {
            if (ve)
              return;
            R.state.setOpen(!1, vt(Xl, Tt));
            return;
          }
          kn(ye), j1(R, nt, Tt);
        }
      },
      onPointerMove: Ze,
      onPointerDown: Ze
    }, Ue],
    stateAttributesMapping: z1
  }), Xe = M ? /* @__PURE__ */ S.jsx(A1.Provider, {
    value: w1,
    children: tt
  }) : tt;
  return /* @__PURE__ */ S.jsxs(b.Fragment, {
    children: [be && _e && /* @__PURE__ */ S.jsx(V1, {
      ref: R.state.startDismissRef
    }), Xe]
  });
}), eO = {
  ...Su,
  ...vT
}, tO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    disabled: f = !1,
    nativeButton: d = !0,
    keepMounted: m = !1,
    style: g,
    ...h
  } = o, {
    disabled: y
  } = gi(), x = zl(), v = xe(x, Ee.selectionMode), E = xe(x, Ee.disabled), A = xe(x, Ee.readOnly), T = xe(x, Ee.open), O = xe(x, Ee.selectedValue), w = xe(x, Ee.hasSelectionChips), M = km();
  let R = !1;
  v === "none" ? R = M !== "" : v === "single" ? R = O != null : R = w;
  const N = y || E || f, {
    buttonRef: I,
    getButtonProps: q
  } = ws({
    native: d,
    disabled: N
  }), {
    mounted: G,
    transitionStatus: z,
    setMounted: P
  } = Em(R), te = {
    disabled: N,
    visible: R,
    open: T,
    transitionStatus: z
  };
  Eu({
    open: R,
    ref: x.state.clearRef,
    onComplete() {
      R || P(!1);
    }
  });
  const ie = Zl("button", o, {
    state: te,
    ref: [r, I, x.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(ne) {
        ne.preventDefault();
      },
      onClick(ne) {
        if (N || A)
          return;
        const he = x.state.keyboardActiveRef.current ? xm : Sm;
        x.state.setInputValue("", vt(ev, ne.nativeEvent)), v !== "none" ? (x.state.setSelectedValue(Array.isArray(O) ? [] : null, vt(ev, ne.nativeEvent)), x.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: he
        })) : x.state.setIndices({
          activeIndex: null,
          type: he
        }), x.state.inputRef.current?.focus();
      }
    }, h, q],
    stateAttributesMapping: eO
  });
  return m || G ? ie : null;
}), nO = /* @__PURE__ */ b.createContext(null);
function lO() {
  return b.useContext(nO);
}
function oO(n) {
  const {
    children: o
  } = n, {
    filteredItems: r
  } = Ms(), i = lO(), c = i ? i.items : r;
  return /* @__PURE__ */ S.jsx(b.Fragment, {
    children: c.map(o)
  });
}
const aO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  var i;
  const {
    render: c,
    className: f,
    style: d,
    children: m,
    ...g
  } = o, h = zl(), y = Ou(), x = !!jm(!0), {
    filteredItems: v,
    hasItems: E
  } = Ms(), A = xe(h, Ee.selectionMode), T = xe(h, Ee.grid), O = xe(h, Ee.listProps), w = xe(h, Ee.virtualized), M = xe(h, Ee.forceMounted), R = A === "multiple", N = v.length === 0, I = Fe((fe) => {
    h.set("positionerElement", fe);
  }), q = Fe((fe) => {
    h.set("listElement", fe);
  }), G = b.useMemo(() => typeof m == "function" ? i || (i = /* @__PURE__ */ S.jsx(oO, {
    children: m
  })) : m, [m]), z = {
    empty: N
  }, P = y.useState("floatingId"), te = Zl("div", o, {
    state: z,
    ref: [r, q, x ? null : I],
    props: [O, {
      children: G,
      tabIndex: -1,
      id: P,
      role: T ? "grid" : "listbox",
      "aria-multiselectable": R ? "true" : void 0,
      onKeyDown(fe) {
        if (!(h.state.disabled || h.state.readOnly) && fe.key === "Enter") {
          const ne = h.state.activeIndex;
          if (ne == null)
            return;
          kn(fe), j1(h, ne, fe.nativeEvent);
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
  if (w)
    return te;
  const ie = E && !M ? void 0 : h.state.labelsRef;
  return /* @__PURE__ */ S.jsx(pM, {
    elementsRef: h.state.listRef,
    labelsRef: ie,
    children: te
  });
}), rO = "⁠", iO = 200;
function sO(n) {
  const o = n.ownerDocument.createTreeWalker(n, NodeFilter.SHOW_TEXT);
  let r = null;
  for (; o.nextNode(); ) {
    const i = o.currentNode;
    i.nodeValue !== "" && (r = i);
  }
  return r;
}
function cO() {
  const n = La(), o = b.useRef(null);
  return b.useEffect(() => {
    if (As)
      return;
    const r = o.current;
    if (r == null)
      return;
    const i = sO(r);
    if (i == null)
      return;
    const c = i.data, f = `${c}${rO}`;
    return i.nodeValue = f, n.start(iO, () => {
      i.nodeValue === f && (i.nodeValue = c);
    }), () => {
      n.clear(), i.nodeValue === f && (i.nodeValue = c);
    };
  }, [o, n]), o;
}
const I1 = /* @__PURE__ */ b.createContext(void 0);
function uO() {
  const n = b.useContext(I1);
  if (n === void 0)
    throw new Error(Eo(20));
  return n;
}
const fO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    keepMounted: i = !1,
    ...c
  } = o, f = zl(), d = xe(f, Ee.mounted), m = xe(f, Ee.forceMounted);
  return d || i || m ? /* @__PURE__ */ S.jsx(I1.Provider, {
    value: i,
    children: /* @__PURE__ */ S.jsx(j2, {
      ref: r,
      ...c
    })
  }) : null;
}), dO = (n) => ({
  name: "arrow",
  options: n,
  async fn(o) {
    const {
      x: r,
      y: i,
      placement: c,
      rects: f,
      platform: d,
      elements: m,
      middlewareData: g
    } = o, {
      element: h,
      padding: y = 0,
      offsetParent: x = "real"
    } = za(n, o) || {};
    if (h == null)
      return {};
    const v = M0(y), E = {
      x: r,
      y: i
    }, A = em(c), T = Wh(A), O = await d.getDimensions(h), w = A === "y", M = w ? "top" : "left", R = w ? "bottom" : "right", N = w ? "clientHeight" : "clientWidth", I = f.reference[T] + f.reference[A] - E[A] - f.floating[T], q = E[A] - f.reference[A], G = x === "real" ? await d.getOffsetParent?.(h) : m.floating;
    let z = m.floating[N] || f.floating[T];
    (!z || !await d.isElement?.(G)) && (z = m.floating[N] || f.floating[T]);
    const P = I / 2 - q / 2, te = z / 2 - O[T] / 2 - 1, ie = Math.min(v[M], te), fe = Math.min(v[R], te), ne = ie, he = z - O[T] - fe, be = z / 2 - O[T] / 2 + P, V = A0(ne, be, he), H = !g.arrow && Ha(c) != null && be !== V && f.reference[T] / 2 - (be < ne ? ie : fe) - O[T] / 2 < 0, F = H ? be < ne ? be - ne : be - he : 0;
    return {
      [A]: E[A] + F,
      data: {
        [A]: V,
        centerOffset: be - V - F,
        ...H && {
          alignmentOffset: F
        }
      },
      reset: H
    };
  }
}), hO = (n, o) => ({
  ...dO(n),
  options: [n, o]
}), mO = {
  name: "hide",
  async fn(n) {
    const {
      width: o,
      height: r,
      x: i,
      y: c
    } = n.rects.reference, f = o === 0 && r === 0 && i === 0 && c === 0, d = await n.platform.detectOverflow(n, {
      elementContext: "reference"
    });
    return {
      data: {
        referenceHidden: d.top - r >= 0 || d.right - o >= 0 || d.bottom - r >= 0 || d.left - o >= 0 || f
      }
    };
  }
}, pO = {
  sideX: "left",
  sideY: "top"
}, wv = "--available-width", Av = "--available-height";
function H1(n, o, r) {
  const i = n === "inline-start" || n === "inline-end";
  return {
    top: "top",
    right: i ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: i ? r ? "inline-end" : "inline-start" : "left"
  }[o];
}
function Mv(n, o, r) {
  const {
    rects: i,
    placement: c
  } = n;
  return {
    side: H1(o, Ql(c), r),
    align: Ha(c) || "center",
    anchor: {
      width: i.reference.width,
      height: i.reference.height
    },
    positioner: {
      width: i.floating.width,
      height: i.floating.height
    }
  };
}
function gO(n) {
  return bO(n, iT);
}
function bO(n, o) {
  const {
    // Public parameters
    anchor: r,
    positionMethod: i = "absolute",
    side: c = "bottom",
    sideOffset: f = 0,
    align: d = "center",
    alignOffset: m = 0,
    collisionBoundary: g,
    collisionPadding: h = 5,
    sticky: y = !1,
    arrowPadding: x = 5,
    disableAnchorTracking: v = !1,
    inline: E,
    // Private parameters
    keepMounted: A = !1,
    floatingRootContext: T,
    mounted: O,
    collisionAvoidance: w,
    shift: M,
    nodeId: R,
    adaptiveOrigin: N,
    lazyFlip: I = !1,
    externalTree: q
  } = n, [G, z] = b.useState(null);
  !O && G !== null && z(null);
  const P = w.side || "flip", te = w.align || "flip", ie = w.fallbackAxisSide || "end", fe = M?.crossAxis ?? !1, ne = M?.rootBoundary, he = typeof r == "function" ? r : void 0, be = Fe(he), V = he ? be : r, H = pl(r), F = pl(O), se = Dm() === "rtl", D = G || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": se ? "left" : "right",
    "inline-start": se ? "right" : "left"
  }[c], K = d === "center" ? D : `${D}-${d}`;
  let le = h;
  typeof le == "number" ? le = {
    top: le,
    right: le,
    bottom: le,
    left: le
  } : le && (le = {
    top: le.top || 0,
    right: le.right || 0,
    bottom: le.bottom || 0,
    left: le.left || 0
  });
  const oe = 1, pe = c === "bottom" ? oe : 0, _e = c === "top" ? oe : 0, qe = c === "right" ? oe : 0, Ae = c === "left" ? oe : 0, Te = {
    boundary: g === "clipping-ancestors" ? "clippingAncestors" : g,
    padding: le
  }, at = b.useRef(null), pt = pl(f), ze = pl(m), et = typeof f != "function" ? f : 0, Ne = typeof m != "function" ? m : 0, Le = [];
  E && Le.push(E), Le.push(C_((ot) => {
    const ut = Mv(ot, c, se), Ke = typeof pt.current == "function" ? pt.current(ut) : pt.current, Qt = typeof ze.current == "function" ? ze.current(ut) : ze.current;
    return {
      mainAxis: Ke,
      crossAxis: Qt,
      alignmentAxis: Qt
    };
  }, [et, Ne, se, c]));
  const Ue = te === "none" && P !== "shift", we = !Ue && (y || fe || P === "shift"), Ze = P === "none" ? null : w_({
    ...Te,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: le.top + oe + pe,
      right: le.right + oe + Ae,
      bottom: le.bottom + oe + _e,
      left: le.left + oe + qe
    },
    mainAxis: !fe && P === "flip",
    crossAxis: te === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: ie
  }), Oe = Ue ? null : R_({
    ...Te,
    // Use the Layout Viewport to avoid shifting around when pinch-zooming.
    rootBoundary: ne,
    mainAxis: te !== "none",
    crossAxis: we,
    limiter: y || fe ? void 0 : __((ot) => {
      if (!at.current)
        return {};
      const {
        width: ut,
        height: Ke
      } = at.current.getBoundingClientRect(), Qt = Fl(Ql(ot.placement)), wn = Qt === "y" ? ut : Ke, An = Qt === "y" ? le.left + le.right : le.top + le.bottom;
      return {
        offset: wn / 2 + An / 2
      };
    })
  }, [Te, y, fe, ne, le, te]);
  P === "shift" || te === "shift" || d === "center" ? Le.push(Oe, Ze) : Le.push(Ze, Oe), Le.push(A_({
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
      wn.setProperty(wv, `${ut}px`), wn.setProperty(Av, `${Ke}px`);
      const An = hn(ot).devicePixelRatio || 1, {
        x: Yt,
        y: nl,
        width: zt,
        height: io
      } = Qt.reference, Fn = (Math.round((Yt + zt) * An) - Math.round(Yt * An)) / An, an = (Math.round((nl + io) * An) - Math.round(nl * An)) / An;
      wn.setProperty("--anchor-width", `${Fn}px`), wn.setProperty("--anchor-height", `${an}px`);
    }
  }), hO((ot) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: at.current || $t(ot.elements.floating).createElement("div"),
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
        y: An
      } = ot, Yt = Ql(Qt), nl = Fl(Yt), zt = at.current, io = Ke.arrow?.x || 0, Fn = Ke.arrow?.y || 0, an = zt?.clientWidth || 0, so = zt?.clientHeight || 0, Dl = io + an / 2, ll = Fn + so / 2, Co = Math.abs(Ke.shift?.y || 0), rn = wn.reference.height / 2, Ct = typeof f == "function" ? f(Mv(ot, c, se)) : f, Rt = Co > Ct, Ye = {
        top: `${Dl}px calc(100% + ${Ct}px)`,
        bottom: `${Dl}px ${-Ct}px`,
        left: `calc(100% + ${Ct}px) ${ll}px`,
        right: `${-Ct}px ${ll}px`
      }[Yt], Gn = `${Dl}px ${wn.reference.y + rn - An}px`;
      return ut.floating.style.setProperty("--transform-origin", we && nl === "y" && Rt ? Gn : Ye), {};
    }
  }, mO, N), Qe(() => {
    !O && T && T.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [O, T]);
  const Je = b.useMemo(() => ({
    elementResize: !v && typeof ResizeObserver < "u",
    layoutShift: !v && typeof IntersectionObserver < "u"
  }), [v]), {
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
    rootContext: T,
    open: A ? O : void 0,
    placement: K,
    middleware: Le,
    strategy: i,
    whileElementsMounted: A ? void 0 : (...ot) => Ly(...ot, Je),
    nodeId: R,
    externalTree: q
  }), {
    sideX: St,
    sideY: Bt
  } = ce.adaptiveOrigin || pO, Nt = nt ? i : "fixed", xt = b.useMemo(() => {
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
    }, ot[wv] = "100vw", ot[Av] = "100vh", nt || (ot.opacity = 0), ot;
  }, [N, Nt, St, ye, Bt, Q, Tt, nt]), on = b.useRef(null);
  Qe(() => {
    if (!O)
      return;
    const ot = H.current, ut = typeof ot == "function" ? ot() : ot, Qt = (Tv(ut) ? ut.current : ut) || null || null;
    Qt !== on.current && (tt.setPositionReference(Qt), on.current = Qt);
  }, [O, tt, V, H]), b.useEffect(() => {
    if (!O)
      return;
    const ot = H.current;
    typeof ot != "function" && Tv(ot) && ot.current !== on.current && (tt.setPositionReference(ot.current), on.current = ot.current);
  }, [O, tt, V, H]), b.useEffect(() => {
    if (A && O && Xe.reference && Xe.floating)
      return Ly(Xe.reference, Xe.floating, He, Je);
  }, [A, O, Xe, He, Je]);
  const st = Ql(Ce), Et = H1(c, st, se), Jt = Ha(Ce) || "center", _n = !!ce.hide?.referenceHidden;
  Qe(() => {
    I && O && nt && st !== D && z(st);
  }, [I, O, nt, st, D]);
  const Ft = b.useMemo(() => ({
    position: "absolute",
    top: ce.arrow?.y,
    left: ce.arrow?.x
  }), [ce.arrow]), Wt = ce.arrow?.centerOffset !== 0;
  return b.useMemo(() => ({
    positionerStyles: xt,
    arrowStyles: Ft,
    arrowRef: at,
    arrowUncentered: Wt,
    side: Et,
    align: Jt,
    physicalSide: st,
    anchorHidden: _n,
    refs: tt,
    context: Ge,
    isPositioned: nt,
    update: He
  }), [xt, Ft, at, Wt, Et, Jt, st, _n, tt, Ge, nt, He]);
}
function Tv(n) {
  return n != null && "current" in n;
}
function U1(n) {
  return n === "starting" ? T2 : gl;
}
function yO(n, o, {
  styles: r,
  transitionStatus: i,
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
    }, U1(i), c],
    stateAttributesMapping: Om
  });
}
const vO = 20;
function xO(n, o, r, i) {
  const [c, f] = b.useState(!1);
  Qe(() => {
    if (!n || !o || r == null) {
      f(!1);
      return;
    }
    const d = $t(r).documentElement.clientWidth, m = r.offsetWidth;
    f(d > 0 && m > 0 && m >= d - vO);
  }, [n, o, r]), m2(n && (!o || c), i);
}
const SO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    anchor: f,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod: d,
    side: m,
    align: g,
    sideOffset: h,
    alignOffset: y,
    collisionBoundary: x = "clipping-ancestors",
    collisionPadding: v,
    arrowPadding: E,
    sticky: A,
    disableAnchorTracking: T = !1,
    collisionAvoidance: O = k2,
    style: w,
    ...M
  } = o, R = zl(), N = Ou(), I = uO(), q = xe(R, Ee.modal), G = xe(R, Ee.open), z = xe(R, Ee.mounted), P = xe(R, Ee.openMethod), te = xe(R, Ee.positionerElement), ie = xe(R, Ee.triggerElement), fe = xe(R, Ee.inputElement), ne = xe(R, Ee.inputGroupElement), he = xe(R, Ee.inputInsidePopup), be = xe(R, Ee.transitionStatus), V = Nu(), F = gO({
    anchor: f ?? (he ? ie : ne ?? fe),
    floatingRootContext: N,
    positionMethod: d,
    mounted: z,
    side: m,
    sideOffset: h,
    align: g,
    alignOffset: y,
    arrowPadding: E,
    collisionBoundary: x,
    collisionPadding: v,
    sticky: A,
    disableAnchorTracking: T,
    keepMounted: I,
    collisionAvoidance: O,
    lazyFlip: !0
  });
  xO(G && q, P === "touch", te, ie);
  const ve = {
    open: G,
    side: F.side,
    align: F.align,
    anchorHidden: F.anchorHidden,
    empty: V
  };
  Qe(() => {
    R.set("popupSide", F.side);
  }, [R, F.side]);
  const se = Fe((K) => {
    R.set("positionerElement", K);
  }), D = yO(o, ve, {
    styles: F.positionerStyles,
    transitionStatus: be,
    props: M,
    refs: [r, se],
    hidden: !z,
    inert: !G
  });
  return /* @__PURE__ */ S.jsxs(L1.Provider, {
    value: F,
    children: [z && q && /* @__PURE__ */ S.jsx(ET, {
      inert: ST(!G),
      cutout: ne ?? fe ?? ie
    }), D]
  });
}), EO = {
  ...Om,
  ...Su
}, CO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    initialFocus: d,
    finalFocus: m,
    ...g
  } = o, h = zl(), y = jm(), x = Ou(), v = xe(h, Ee.mounted), E = xe(h, Ee.open), A = xe(h, Ee.openMethod), T = xe(h, Ee.popupProps), O = xe(h, Ee.transitionStatus), w = xe(h, Ee.inputInsidePopup), M = xe(h, Ee.inputElement), R = xe(h, Ee.modal), N = xe(h, Ee.id), I = Nu(), q = g.id ?? (w ? O1(N) : void 0);
  Qe(() => (h.set("popupId", h.state.popupRef.current?.id || q), () => {
    h.set("popupId", void 0);
  }), [h, q]), Eu({
    open: E,
    ref: h.state.popupRef,
    onComplete() {
      E && h.state.onOpenChangeComplete(!0);
    }
  });
  const G = {
    open: E,
    side: y.side,
    align: y.align,
    anchorHidden: y.anchorHidden,
    transitionStatus: O,
    empty: I
  }, z = Zl("div", o, {
    state: G,
    ref: [r, h.state.popupRef],
    props: [T, {
      id: q,
      role: w ? "dialog" : "presentation",
      onFocus(ne) {
        const he = kl(ne.nativeEvent);
        A !== "touch" && (it(h.state.listElement, he) || he === ne.currentTarget) && h.state.inputRef.current?.focus();
      }
    }, U1(O), g],
    stateAttributesMapping: EO
  }), te = d === void 0 ? w ? (ne) => ne === "touch" ? h.state.popupRef.current : M : !1 : d;
  let ie;
  m != null ? ie = m : ie = w ? void 0 : !1;
  const fe = !w || R;
  return /* @__PURE__ */ S.jsx(B2, {
    context: x,
    disabled: !v,
    modal: fe,
    openInteractionType: A,
    initialFocus: te,
    returnFocus: ie,
    getInsideElements: () => [h.state.startDismissRef.current, h.state.endDismissRef.current],
    children: /* @__PURE__ */ S.jsxs(b.Fragment, {
      children: [z, fe && /* @__PURE__ */ S.jsx(V1, {
        ref: h.state.endDismissRef
      })]
    })
  });
}), B1 = /* @__PURE__ */ b.createContext(void 0);
function G1() {
  const n = b.useContext(B1);
  if (!n)
    throw new Error(Eo(19));
  return n;
}
const RO = /* @__PURE__ */ b.createContext(!1);
function _O() {
  return b.useContext(RO);
}
function Y1(n) {
  const {
    componentProps: o,
    forwardedRef: r,
    virtualized: i,
    indexFromFilter: c
  } = n, {
    render: f,
    className: d,
    style: m,
    value: g = null,
    index: h,
    disabled: y = !1,
    nativeButton: x = !1,
    ...v
  } = o, E = b.useRef(null), A = XM({
    guess: !0,
    index: h,
    textRef: E
  }), T = zl(), O = _O(), w = MT(), M = xe(T, Ee.selectionMode), R = xe(T, Ee.disabled), N = xe(T, Ee.readOnly), I = xe(T, Ee.isItemEqualToValue), q = R || y, G = M !== "none", z = h ?? c ?? A.index, P = z !== -1, te = xe(T, Ee.id), ie = xe(T, Ee.isActive, z), fe = xe(T, Ee.isSelected, g), ne = xe(T, Ee.itemProps), he = b.useRef(null), be = te != null && P ? `${te}-${z}` : void 0, V = fe && G;
  Qe(() => {
    if (!(P && (i || h != null)))
      return;
    const pe = T.state.listRef.current;
    return pe[z] = he.current, () => {
      delete pe[z];
    };
  }, [P, i, z, h, T]), Qe(() => {
    if (!P || w)
      return;
    const oe = T.state.valuesRef.current;
    return oe[z] = g, () => {
      delete oe[z];
    };
  }, [P, w, z, g, T]), Qe(() => {
    if (!P || w)
      return;
    const oe = T.state.selectedValue, pe = Array.isArray(oe) ? oe[oe.length - 1] : oe;
    Va(g, pe, I) && T.set("selectedIndex", z);
  }, [P, w, T, z, g, I]);
  const {
    getButtonProps: H,
    buttonRef: F
  } = ws({
    disabled: q,
    focusableWhenDisabled: !0,
    native: x,
    composite: !0
  }), ve = {
    disabled: q,
    selected: V,
    highlighted: ie
  };
  function se(oe) {
    function pe() {
      T.state.handleSelection(oe, g);
    }
    T.state.submitOnItemClick ? (hi.flushSync(pe), T.state.requestSubmit()) : pe();
  }
  const D = {
    id: be,
    role: O ? "gridcell" : "option",
    "aria-selected": G ? V : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(oe) {
      oe.isPrimary && (T.state.pointerDownItemRef.current = oe.currentTarget), oe.preventDefault();
    },
    onMouseDown(oe) {
      oe.preventDefault();
    },
    onClick(oe) {
      q || N || se(oe.nativeEvent);
    },
    onMouseUp(oe) {
      const pe = T.state.pointerDownItemRef.current === oe.currentTarget;
      T.state.pointerDownItemRef.current = null, !(q || N || oe.button !== 0 || pe || !ie) && se(oe.nativeEvent);
    }
  }, K = Zl("div", o, {
    ref: [F, r, A.ref, he],
    state: ve,
    props: [ne, D, v, H]
  }), le = b.useMemo(() => ({
    selected: V,
    textRef: E
  }), [V, E]);
  return /* @__PURE__ */ S.jsx(B1.Provider, {
    value: le,
    children: K
  });
}
function wO(n) {
  const {
    componentProps: o,
    forwardedRef: r
  } = n, i = zl(), c = xe(i, Ee.isItemEqualToValue), {
    flatFilteredItems: f
  } = Ms(), d = E1(f, o.value ?? null, c);
  return /* @__PURE__ */ S.jsx(Y1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: !0,
    indexFromFilter: d
  });
}
const AO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef(function(o, r) {
  const i = zl(), c = xe(i, Ee.virtualized);
  return c && o.index == null ? /* @__PURE__ */ S.jsx(wO, {
    componentProps: o,
    forwardedRef: r
  }) : /* @__PURE__ */ S.jsx(Y1, {
    componentProps: o,
    forwardedRef: r,
    virtualized: c,
    indexFromFilter: void 0
  });
})), MO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    children: d,
    ...m
  } = o, {
    filteredItems: g
  } = Ms(), h = zl(), y = cO(), x = g.length === 0 ? d : null;
  return Zl("div", o, {
    ref: [r, h.state.emptyRef, y],
    props: [{
      children: x,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, m]
  });
});
function TO(n, o, r, i = !0, c) {
  const [f, d] = b.useState(), m = vu(c ? `${c}-label` : void 0), g = n ?? o ?? f;
  return Qe(() => {
    const h = n || o || !i ? void 0 : OO(r.current, m);
    f !== h && d(h);
  }), g;
}
function OO(n, o) {
  const r = kO(n);
  if (r)
    return !r.id && o && (r.id = o), r.id || void 0;
}
function kO(n) {
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
  const i = n.labels;
  return i && i[0];
}
function NO(n) {
  const {
    multiple: o = !1,
    defaultValue: r,
    value: i,
    onValueChange: c,
    autoComplete: f,
    ...d
  } = n;
  return /* @__PURE__ */ S.jsx(qT, {
    ...d,
    selectionMode: o ? "multiple" : "single",
    selectedValue: i,
    defaultSelectedValue: r,
    onSelectedValueChange: c,
    formAutoComplete: f
  });
}
function zO(n) {
  const {
    children: o,
    placeholder: r
  } = n, i = zl(), c = xe(i, Ee.itemToStringLabel), f = xe(i, Ee.selectedValue), d = xe(i, Ee.items), m = xe(i, Ee.selectionMode) === "multiple", g = xe(i, Ee.hasSelectedValue), h = !g && r != null && o == null, y = xe(i, Ee.hasNullItemLabel, h);
  let x = null;
  return typeof o == "function" ? x = o(f) : o != null ? x = o : !g && r != null && !y ? x = r : m && Array.isArray(f) ? x = zT(f, d, c) : x = C1(f, d, c), /* @__PURE__ */ S.jsx(b.Fragment, {
    children: x
  });
}
const DO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    selected: i
  } = G1();
  return o.keepMounted || i ? /* @__PURE__ */ S.jsx(jO, {
    ...o,
    ref: r
  }) : null;
}), jO = /* @__PURE__ */ b.memo(/* @__PURE__ */ b.forwardRef((n, o) => {
  const {
    render: r,
    className: i,
    style: c,
    keepMounted: f,
    ...d
  } = n, {
    selected: m
  } = G1(), g = b.useRef(null), {
    transitionStatus: h,
    setMounted: y
  } = Em(m), v = Zl("span", n, {
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
  }), v;
})), q1 = /* @__PURE__ */ b.createContext(void 0);
function LO() {
  const n = b.useContext(q1);
  if (n === void 0)
    throw new Error(Eo(63));
  return n;
}
const P1 = {
  ..._1,
  checked(n) {
    return n ? {
      "data-checked": ""
    } : {
      "data-unchecked": ""
    };
  }
}, VO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    checked: i,
    className: c,
    defaultChecked: f,
    "aria-labelledby": d,
    form: m,
    id: g,
    inputRef: h,
    name: y,
    nativeButton: x = !1,
    onCheckedChange: v,
    readOnly: E = !1,
    required: A = !1,
    disabled: T = !1,
    render: O,
    uncheckedValue: w,
    value: M,
    style: R,
    ...N
  } = o, {
    clearErrors: I
  } = T1(), {
    state: q,
    setTouched: G,
    setDirty: z,
    validityData: P,
    setFilled: te,
    setFocused: ie,
    validationMode: fe,
    disabled: ne,
    name: he,
    validation: be
  } = gi(), {
    labelId: V
  } = ku(), H = ne || T, F = he ?? y, ve = b.useRef(null), se = pr(ve, h, be.inputRef), D = b.useRef(null), K = vu(), le = zm({
    id: g,
    implicit: !1,
    controlRef: D
  }), oe = x ? void 0 : le, [pe, _e] = Xc({
    controlled: i,
    default: !!f,
    name: "Switch",
    state: "checked"
  });
  M1(D, K, pe, void 0, !H, y), Qe(() => {
    ve.current && te(ve.current.checked);
  }, [te]), oi(pe, () => {
    I(F), z(pe !== P.initialValue), te(pe), be.change(pe);
  });
  const {
    getButtonProps: qe,
    buttonRef: Ae
  } = ws({
    disabled: H,
    native: x
  }), Te = TO(d, V, ve, !x, oe), at = {
    id: x ? le : K,
    role: "switch",
    "aria-checked": pe,
    "aria-readonly": E || void 0,
    "aria-required": A || void 0,
    "aria-labelledby": Te,
    onFocus() {
      H || ie(!0);
    },
    onBlur() {
      const Ne = ve.current;
      !Ne || H || (G(!0), ie(!1), fe === "onBlur" && be.commit(Ne.checked));
    },
    onClick(Ne) {
      if (E || H)
        return;
      Ne.preventDefault();
      const Le = ve.current;
      Le && Kc(Le, Ne);
    }
  }, pt = {
    ...be.getValidationProps(H),
    checked: pe,
    disabled: H,
    form: m,
    id: oe,
    name: F,
    required: A,
    style: F ? Am : wm,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": !0,
    ref: se,
    onChange(Ne) {
      if (Ne.nativeEvent.defaultPrevented)
        return;
      if (E) {
        Ne.preventDefault();
        return;
      }
      const Le = Ne.currentTarget.checked, Ue = vt(Xl, Ne.nativeEvent);
      v?.(Le, Ue), !Ue.isCanceled && _e(Le);
    },
    onClick(Ne) {
      Ne.stopPropagation();
    },
    onFocus() {
      D.current?.focus();
    },
    // React <19 sets an empty value if `undefined` is passed explicitly
    // To avoid this, we only set the value if it's defined
    ...M !== void 0 ? {
      value: M
    } : gl
  }, ze = b.useMemo(() => ({
    ...q,
    checked: pe,
    disabled: H,
    readOnly: E,
    required: A
  }), [q, pe, H, E, A]), et = Zl("span", o, {
    state: ze,
    ref: [r, D, Ae],
    props: [at, N, qe, (Ne) => be.getValidationProps(H, Ne)],
    stateAttributesMapping: P1
  });
  return /* @__PURE__ */ S.jsxs(q1.Provider, {
    value: ze,
    children: [et, !pe && F && w !== void 0 && /* @__PURE__ */ S.jsx("input", {
      type: "hidden",
      form: m,
      name: F,
      value: w,
      disabled: H
    }), /* @__PURE__ */ S.jsx("input", {
      ...pt,
      suppressHydrationWarning: !0
    })]
  });
}), IO = /* @__PURE__ */ b.forwardRef(function(o, r) {
  const {
    render: i,
    className: c,
    style: f,
    ...d
  } = o, m = LO();
  return Zl("span", o, {
    state: m,
    ref: r,
    stateAttributesMapping: P1,
    props: d
  });
});
function X1({ className: n, type: o, ...r }) {
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
function HO({ className: n, ...o }) {
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
const UO = di(
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
function BO({
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
      className: We(UO({ align: o }), n),
      onClick: (i) => {
        i.target.closest("button") || i.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...r
    }
  );
}
const GO = di(
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
function K1({
  className: n,
  type: o = "button",
  variant: r = "ghost",
  size: i = "xs",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    xo,
    {
      type: o,
      "data-size": i,
      variant: r,
      className: We(GO({ size: i }), n),
      ...c
    }
  );
}
function YO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    X1,
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
const qO = NO;
function PO({ ...n }) {
  return /* @__PURE__ */ S.jsx(zO, { "data-slot": "combobox-value", ...n });
}
function F1({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    ZT,
    {
      "data-slot": "combobox-trigger",
      className: We("[&_svg:not([class*='size-'])]:size-4", n),
      ...r,
      children: [
        o,
        /* @__PURE__ */ S.jsx(
          kA,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function XO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    tO,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ S.jsx(K1, { variant: "ghost", size: "icon-xs" }),
      className: We(n),
      ...o,
      children: /* @__PURE__ */ S.jsx(Dx, { className: "pointer-events-none" })
    }
  );
}
function KO({
  className: n,
  children: o,
  disabled: r = !1,
  showTrigger: i = !0,
  showClear: c = !1,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(HO, { className: We("w-auto", n), children: [
    /* @__PURE__ */ S.jsx(
      WT,
      {
        render: /* @__PURE__ */ S.jsx(YO, { disabled: r }),
        ...f
      }
    ),
    /* @__PURE__ */ S.jsxs(BO, { align: "inline-end", children: [
      i && /* @__PURE__ */ S.jsx(
        K1,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: r,
          children: /* @__PURE__ */ S.jsx(F1, {})
        }
      ),
      c && /* @__PURE__ */ S.jsx(XO, { disabled: r })
    ] }),
    o
  ] });
}
function FO({
  className: n,
  side: o = "bottom",
  sideOffset: r = 6,
  align: i = "start",
  alignOffset: c = 0,
  anchor: f,
  container: d,
  ...m
}) {
  return /* @__PURE__ */ S.jsx(fO, { container: d, children: /* @__PURE__ */ S.jsx(
    SO,
    {
      side: o,
      sideOffset: r,
      align: i,
      alignOffset: c,
      anchor: f,
      className: "pointer-events-auto isolate z-50",
      children: /* @__PURE__ */ S.jsx(
        CO,
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
function QO({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    aO,
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
function ZO({
  className: n,
  children: o,
  ...r
}) {
  return /* @__PURE__ */ S.jsxs(
    AO,
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
          DO,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ S.jsx("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ S.jsx(TA, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function $O({ className: n, ...o }) {
  return /* @__PURE__ */ S.jsx(
    MO,
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
function JO({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    X_,
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
function ru({
  className: n,
  orientation: o = "horizontal",
  decorative: r = !0,
  ...i
}) {
  return /* @__PURE__ */ S.jsx(
    ew,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: o,
      className: We(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        n
      ),
      ...i
    }
  );
}
function ih({ className: n, ...o }) {
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
const WO = di(
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
function Hh({
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
      className: We(WO({ orientation: o }), n),
      ...r
    }
  );
}
function Uh({
  className: n,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    JO,
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
function ai({ className: n, ...o }) {
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
const ek = di(
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
function tk({
  className: n,
  variant: o = "default",
  size: r = "default",
  asChild: i = !1,
  ...c
}) {
  const f = i ? Zv : "div";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "item",
      "data-variant": o,
      "data-size": r,
      className: We(ek({ variant: o, size: r }), n),
      ...c
    }
  );
}
function nk({ className: n, ...o }) {
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
function lk({ className: n, ...o }) {
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
function Ca({
  className: n,
  defaultValue: o,
  value: r,
  min: i = 0,
  max: c = 100,
  ...f
}) {
  const d = o ?? [i], m = b.useMemo(
    () => Array.isArray(r) ? r : Array.isArray(d) ? d : [i],
    [r, d, i]
  );
  return /* @__PURE__ */ S.jsxs(
    aw,
    {
      "data-slot": "slider",
      defaultValue: r == null ? d : void 0,
      value: r,
      min: i,
      max: c,
      className: We(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        n
      ),
      ...f,
      children: [
        /* @__PURE__ */ S.jsx(
          cw,
          {
            "data-slot": "slider-track",
            className: We(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              uw,
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
          pw,
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
function Ov({
  className: n,
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ S.jsx(
    VO,
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
        IO,
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
const ok = di(
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
), Q1 = b.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function Z1({
  className: n,
  variant: o,
  size: r,
  spacing: i = 0,
  children: c,
  ...f
}) {
  return /* @__PURE__ */ S.jsx(
    Cw,
    {
      "data-slot": "toggle-group",
      "data-variant": o,
      "data-size": r,
      "data-spacing": i,
      style: { "--gap": i },
      className: We(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        n
      ),
      ...f,
      children: /* @__PURE__ */ S.jsx(Q1.Provider, { value: { variant: o, size: r, spacing: i }, children: c })
    }
  );
}
function $1({
  className: n,
  children: o,
  variant: r,
  size: i,
  ...c
}) {
  const f = b.useContext(Q1);
  return /* @__PURE__ */ S.jsx(
    Mw,
    {
      "data-slot": "toggle-group-item",
      "data-variant": f.variant || r,
      "data-size": f.size || i,
      "data-spacing": f.spacing,
      className: We(
        ok({
          variant: f.variant || r,
          size: f.size || i
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
const kv = [
  "#00e5ff",
  "#ff2d95",
  "#b8ff00",
  "#ffb000",
  "#7c4dff",
  "#00ffa3"
], Nv = ["#94a3b8", "#64748b", "#a8a29e", "#78716c"], Tl = ["#ff0099", "#b8ff00", "#00b7ff"], ak = Tl.length, rk = ["line", "spline", "gradient"], ik = ["spline", "shape", "gradient"], sk = {
  select: "Pan/Zoom",
  lasso: "Lasso",
  polygon: "Polygon",
  rectangle: "Rectangle",
  ellipse: "Ellipse",
  point: "Point",
  line: "Line",
  spline: "Spline",
  shape: "Shape"
}, ck = ["select", "lasso"], uk = ["point", "line", "spline", "shape"];
function fk(n, o) {
  const [r, i] = n, [c, f] = o;
  return 0.25 * Math.min(Math.abs(i - r), Math.abs(f - c));
}
function dk(n, o) {
  const [r, i] = n, [c, f] = o;
  return Math.hypot(Math.abs(i - r), Math.abs(f - c));
}
function ti(n, o = "off") {
  return n ? n.toPrecision(3) : o;
}
function zv(n) {
  if (n == null || !Number.isFinite(n)) return "";
  const o = Math.abs(n);
  return o !== 0 && (o >= 1e3 || o < 0.01) ? n.toExponential(1) : o >= 100 ? n.toFixed(0) : o >= 10 ? n.toFixed(1) : n.toFixed(2);
}
const hk = {
  select: KA,
  lasso: GA,
  polygon: QA,
  rectangle: aM,
  ellipse: Qy,
  point: Qy,
  line: tM,
  spline: lM,
  shape: zx
};
function Dv({
  modes: n,
  value: o,
  onChange: r
}) {
  return n.length ? /* @__PURE__ */ S.jsx(
    Z1,
    {
      type: "single",
      variant: "default",
      size: "sm",
      spacing: 2,
      value: o,
      className: "landmarks-mode-toggle rounded-full bg-muted/45 p-0.5",
      onValueChange: (i) => {
        i && r(i);
      },
      children: n.map((i) => {
        const c = hk[i] ?? zx, f = sk[i] ?? i;
        return /* @__PURE__ */ S.jsx(
          $1,
          {
            value: i,
            title: f,
            "aria-label": f,
            className: "size-8 min-w-8 rounded-full border-0 px-0 text-muted-foreground hover:bg-muted hover:text-foreground data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none",
            children: /* @__PURE__ */ S.jsx(c, { className: "size-4" })
          },
          i
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
function J1({ active: n }) {
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
function mk({
  modes: n,
  mode: o,
  onMode: r,
  fullscreen: i,
  onToggleFullscreen: c
}) {
  const f = n.filter((g) => ck.includes(g)), d = n.filter((g) => uk.includes(g)), m = f.length > 0 && d.length > 0;
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "landmarks-float-toolbar pointer-events-auto flex items-center gap-1.5 rounded-full px-1.5 py-1 text-card-foreground",
      role: "toolbar",
      "aria-label": "Drawing tools",
      onMouseDown: (g) => g.stopPropagation(),
      onWheel: (g) => g.stopPropagation(),
      children: [
        f.length ? /* @__PURE__ */ S.jsx(Dv, { modes: f, value: o, onChange: r }) : null,
        m ? /* @__PURE__ */ S.jsx(ru, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }) : null,
        d.length ? /* @__PURE__ */ S.jsx(Dv, { modes: d, value: o, onChange: r }) : null,
        /* @__PURE__ */ S.jsx(ru, { orientation: "vertical", className: "mx-0.5 h-5 bg-border/50" }),
        /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            className: "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground",
            title: i ? "Exit full screen" : "Full screen",
            "aria-label": i ? "Exit full screen" : "Full screen",
            "aria-pressed": i,
            onClick: c,
            children: i ? /* @__PURE__ */ S.jsx(WA, { className: "size-4" }) : /* @__PURE__ */ S.jsx(LA, { className: "size-4" })
          }
        )
      ]
    }
  );
}
function ch({
  active: n,
  color: o,
  label: r,
  hidden: i,
  shown: c,
  onSelect: f,
  onRename: d,
  onDelete: m,
  onToggleHidden: g
}) {
  const [h, y] = b.useState(!1), [x, v] = b.useState(r);
  return /* @__PURE__ */ S.jsxs(
    tk,
    {
      variant: n ? "muted" : "default",
      size: "sm",
      className: We(
        "w-full min-w-0 cursor-pointer flex-nowrap gap-1 px-0 py-0.5",
        n && "rounded-md bg-accent/70 ring-2 ring-primary/25",
        i && "opacity-50"
      ),
      onClick: f,
      children: [
        g ? /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": i ? "Show landmark" : "Hide landmark",
            onClick: (E) => {
              E.stopPropagation(), g();
            },
            children: i ? /* @__PURE__ */ S.jsx(UA, {}) : /* @__PURE__ */ S.jsx(IA, {})
          }
        ) : null,
        o ? /* @__PURE__ */ S.jsx(bs, { color: o }) : null,
        c !== void 0 ? /* @__PURE__ */ S.jsx(J1, { active: c }) : null,
        /* @__PURE__ */ S.jsx(nk, { className: "min-w-0 gap-0", children: h && d ? /* @__PURE__ */ S.jsx(
          X1,
          {
            "aria-label": "Rename layer",
            value: x,
            className: "h-6 text-xs",
            autoFocus: !0,
            onClick: (E) => E.stopPropagation(),
            onChange: (E) => v(E.target.value),
            onBlur: () => {
              d(x), y(!1);
            },
            onKeyDown: (E) => {
              E.stopPropagation(), E.key === "Enter" ? (E.preventDefault(), d(x), y(!1)) : E.key === "Escape" && (E.preventDefault(), v(r), y(!1));
            }
          }
        ) : /* @__PURE__ */ S.jsx(
          lk,
          {
            className: "max-w-full truncate text-xs font-normal text-foreground",
            title: d ? "Double-click to rename" : r,
            onDoubleClick: (E) => {
              d && (E.preventDefault(), E.stopPropagation(), v(r), y(!0));
            },
            children: r
          }
        ) }),
        m ? /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": "Delete",
            onClick: (E) => {
              E.stopPropagation(), m();
            },
            children: /* @__PURE__ */ S.jsx(Dx, {})
          }
        ) : null
      ]
    }
  );
}
const iu = "px-2.5", Oa = "landmarks-section-trigger px-0 py-1.5 text-left hover:no-underline";
function Ra({
  label: n,
  valueLabel: o,
  children: r
}) {
  return /* @__PURE__ */ S.jsx(Hh, { className: "gap-0", children: /* @__PURE__ */ S.jsxs("div", { className: "landmarks-slider-row", children: [
    /* @__PURE__ */ S.jsx(Uh, { className: "landmarks-slider-label", children: n }),
    /* @__PURE__ */ S.jsxs("div", { className: "landmarks-slider-capsule", children: [
      /* @__PURE__ */ S.jsx("div", { className: "landmarks-slider-control", children: r }),
      /* @__PURE__ */ S.jsx("span", { className: "landmarks-slider-value", "aria-hidden": !0, children: o })
    ] })
  ] }) });
}
function jv({
  value: n,
  onChange: o,
  options: r
}) {
  return /* @__PURE__ */ S.jsx(
    Z1,
    {
      type: "single",
      variant: "default",
      size: "sm",
      spacing: 2,
      value: n,
      className: "w-full justify-stretch rounded-lg bg-muted/55 p-0.5",
      onValueChange: (i) => {
        i && o(i);
      },
      children: r.map((i) => /* @__PURE__ */ S.jsx(
        $1,
        {
          value: i.value,
          className: "h-7 min-w-0 flex-1 rounded-md border-0 px-2 text-[0.6875rem] text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
          children: i.label
        },
        i.value
      ))
    }
  );
}
function Lv(n, o) {
  const r = n?.vmin ?? 0, i = n?.vmax ?? 1, c = Math.max(0, r), f = Math.max(c + 1e-6, Math.max(0, i));
  return o ? { lo: Math.log1p(c), hi: Math.log1p(f) } : { lo: c, hi: f };
}
function pk({
  colors: n,
  labels: o,
  lo: r,
  hi: i
}) {
  const c = n.length === 1 ? `linear-gradient(to right, #0a0a0a, ${n[0]})` : `linear-gradient(to right, ${n[0]}, ${gk(n[0], n[1])}, ${n[1]})`;
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
      /* @__PURE__ */ S.jsx("span", { children: zv(r) }),
      /* @__PURE__ */ S.jsx("span", { children: zv(i) })
    ] })
  ] });
}
function gk(n, o) {
  const r = n.replace("#", ""), i = o.replace("#", ""), c = parseInt(r.slice(0, 2), 16), f = parseInt(r.slice(2, 4), 16), d = parseInt(r.slice(4, 6), 16), m = parseInt(i.slice(0, 2), 16), g = parseInt(i.slice(2, 4), 16), h = parseInt(i.slice(4, 6), 16), y = Math.min(255, c + m), x = Math.min(255, f + g), v = Math.min(255, d + h);
  return `#${[y, x, v].map((E) => E.toString(16).padStart(2, "0")).join("")}`;
}
function bk(n, o, r, i, c, f, d) {
  const m = [
    [n, o],
    [r, i],
    [c, f]
  ], g = [];
  for (let h = 0; h < 3; h++) {
    const [y, x] = m[(h + 2) % 3], [v, E] = m[h], [A, T] = m[(h + 1) % 3], O = Math.hypot(v - y, E - x) || 1, w = Math.hypot(A - v, T - E) || 1, M = Math.min(d, O * 0.35, w * 0.35), R = v + (y - v) / O * M, N = E + (x - E) / O * M, I = v + (A - v) / w * M, q = E + (T - E) / w * M;
    h === 0 ? g.push(`M ${R} ${N}`) : g.push(`L ${R} ${N}`), g.push(`Q ${v} ${E} ${I} ${q}`);
  }
  return g.push("Z"), g.join(" ");
}
const ml = 80, Lm = 12, uh = 4, Vv = 5, yk = ml - 2 * Lm, W1 = Math.sqrt(3) / 2 * yk, eS = (ml - W1) / 2, tS = eS + W1, br = { x: ml / 2, y: eS }, yr = { x: Lm, y: tS }, vr = { x: ml - Lm, y: tS }, Iv = {
  x: (yr.x + br.x + vr.x) / 3,
  y: (yr.y + br.y + vr.y) / 3
};
function Vm(n) {
  const o = n.x - Iv.x, r = n.y - Iv.y, i = Math.hypot(o, r) || 1;
  return {
    x: n.x + o / i * Vv,
    y: n.y + r / i * Vv
  };
}
const Hv = Vm(yr), Uv = Vm(br), Bv = Vm(vr), Gv = bk(
  yr.x,
  yr.y,
  br.x,
  br.y,
  vr.x,
  vr.y,
  8
);
function fh(n) {
  const o = n.replace("#", "");
  return [
    parseInt(o.slice(0, 2), 16),
    parseInt(o.slice(2, 4), 16),
    parseInt(o.slice(4, 6), 16)
  ];
}
function vk() {
  if (typeof document > "u") return "";
  const n = document.createElement("canvas"), o = 96;
  n.width = o, n.height = o;
  const r = n.getContext("2d");
  if (!r) return "";
  const i = r.createImageData(o, o), c = fh(Tl[0]), f = fh(Tl[1]), d = fh(Tl[2]), m = yr.x / ml, g = yr.y / ml, h = br.x / ml, y = br.y / ml, x = vr.x / ml, v = vr.y / ml, E = (y - v) * (m - x) + (x - h) * (g - v);
  for (let A = 0; A < o; A++)
    for (let T = 0; T < o; T++) {
      const O = (T + 0.5) / o, w = (A + 0.5) / o, M = ((y - v) * (O - x) + (x - h) * (w - v)) / E, R = ((v - g) * (O - x) + (m - x) * (w - v)) / E, N = 1 - M - R, I = (A * o + T) * 4;
      if (M < -0.02 || R < -0.02 || N < -0.02) {
        i.data[I + 3] = 0;
        continue;
      }
      const q = Math.max(0, M), G = Math.max(0, R), z = Math.max(0, N);
      i.data[I] = Math.min(255, Math.round(c[0] * q + f[0] * G + d[0] * z)), i.data[I + 1] = Math.min(
        255,
        Math.round(c[1] * q + f[1] * G + d[1] * z)
      ), i.data[I + 2] = Math.min(
        255,
        Math.round(c[2] * q + f[2] * G + d[2] * z)
      ), i.data[I + 3] = 255;
    }
  return r.putImageData(i, 0, 0), n.toDataURL();
}
function xk() {
  const n = b.useId(), o = b.useMemo(() => vk(), []);
  return /* @__PURE__ */ S.jsx("div", { className: "flex justify-center py-0.5", children: /* @__PURE__ */ S.jsxs(
    "svg",
    {
      viewBox: `0 0 ${ml} ${ml}`,
      className: "size-16",
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ S.jsx("defs", { children: /* @__PURE__ */ S.jsx("clipPath", { id: n, children: /* @__PURE__ */ S.jsx("path", { d: Gv }) }) }),
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
            d: Gv,
            fill: "none",
            className: "stroke-border",
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Hv.x,
            cy: Hv.y,
            r: uh,
            fill: Tl[0]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Uv.x,
            cy: Uv.y,
            r: uh,
            fill: Tl[1]
          }
        ),
        /* @__PURE__ */ S.jsx(
          "circle",
          {
            cx: Bv.x,
            cy: Bv.y,
            r: uh,
            fill: Tl[2]
          }
        )
      ]
    }
  ) });
}
function Sk({ lm: n }) {
  const { active_genes: o, gene_columns: r, color_by: i, gene_log1p: c, gene_scale_mode: f } = n, d = o || [];
  if (i !== "continuous" || !d.length) return null;
  if (d.length >= 3)
    return /* @__PURE__ */ S.jsx(xk, {});
  const m = d.map((y, x) => Tl[x % Tl.length]);
  let g = 0, h = 1;
  if (f === "shared") {
    h = 0;
    for (const y of d) {
      const x = r.find((v) => v.name === y);
      h = Math.max(h, Lv(x, c).hi);
    }
    h > 0 || (h = 1);
  } else {
    const y = r.find((v) => v.name === d[0]), x = Lv(y, c);
    g = x.lo, h = x.hi;
  }
  return /* @__PURE__ */ S.jsx(
    pk,
    {
      colors: m,
      labels: d,
      lo: g,
      hi: h
    }
  );
}
function Ek({ lm: n }) {
  const { active_genes: o, color_by: r, gene_scale_mode: i, gene_log1p: c } = n;
  return r !== "continuous" || !o?.length ? null : /* @__PURE__ */ S.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs("label", { className: "flex items-center justify-between gap-2 text-xs text-foreground", children: [
      /* @__PURE__ */ S.jsxs("span", { className: "min-w-0 leading-snug", children: [
        "Shared scale",
        /* @__PURE__ */ S.jsx("span", { className: "mt-0.5 block text-[10px] text-muted-foreground", children: "Max of selected genes" })
      ] }),
      /* @__PURE__ */ S.jsx(
        Ov,
        {
          size: "sm",
          checked: i === "shared",
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
        Ov,
        {
          size: "sm",
          checked: !!c,
          onCheckedChange: (f) => n.setGeneLog1p(f)
        }
      )
    ] })
  ] });
}
function Ck() {
  const n = b.useRef(null), [o, r] = b.useState(null);
  return b.useLayoutEffect(() => {
    const i = n.current?.closest(
      ".spatial-rx-widget"
    );
    if (!i) return;
    const c = i.getRootNode(), f = c instanceof ShadowRoot ? c : i.ownerDocument?.body || document.body;
    let d = f.querySelector(
      "[data-spatial-rx-portal]"
    );
    d || (d = i.ownerDocument.createElement("div"), d.setAttribute("data-spatial-rx-portal", ""), f.appendChild(d)), d.className = We(
      "spatial-rx-widget pointer-events-none fixed inset-0 z-50",
      i.classList.contains("dark") && "dark"
    ), r(d);
  }, []), [n, o];
}
function Rk({ lm: n }) {
  const { gene_columns: o, active_genes: r } = n, i = o.map((g) => g.name), c = r || [], f = c.length >= ak, [d, m] = Ck();
  return /* @__PURE__ */ S.jsxs("div", { ref: d, className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ S.jsxs(
      qO,
      {
        items: i,
        multiple: !0,
        value: c,
        onValueChange: (g) => {
          const h = Array.isArray(g) ? g.map(String) : [];
          n.setActiveGenes(h);
        },
        children: [
          /* @__PURE__ */ S.jsx(
            F1,
            {
              render: /* @__PURE__ */ S.jsx(
                xo,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 w-full justify-between px-2 font-normal text-xs",
                  children: /* @__PURE__ */ S.jsx(PO, { children: (g) => {
                    const h = Array.isArray(g) ? g : [];
                    return h.length ? /* @__PURE__ */ S.jsx("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: h.map((y, x) => /* @__PURE__ */ S.jsxs(
                      "span",
                      {
                        className: "inline-flex max-w-full items-center gap-1 truncate",
                        children: [
                          /* @__PURE__ */ S.jsx(
                            bs,
                            {
                              color: Tl[x % Tl.length]
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
            FO,
            {
              container: m,
              className: "w-(--anchor-width) text-xs",
              children: [
                /* @__PURE__ */ S.jsx(
                  KO,
                  {
                    showTrigger: !1,
                    showClear: !0,
                    placeholder: "Search",
                    className: "w-auto text-xs"
                  }
                ),
                /* @__PURE__ */ S.jsx($O, { className: "text-xs", children: "No genes found." }),
                /* @__PURE__ */ S.jsx(QO, { children: (g) => {
                  const h = String(g), y = c.indexOf(h), x = f && y < 0;
                  return /* @__PURE__ */ S.jsxs(
                    ZO,
                    {
                      value: h,
                      disabled: x,
                      className: "py-1 text-xs",
                      children: [
                        /* @__PURE__ */ S.jsx(
                          bs,
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
    /* @__PURE__ */ S.jsx(Sk, { lm: n }),
    /* @__PURE__ */ S.jsx(Ek, { lm: n })
  ] });
}
function _k({ lm: n }) {
  const {
    selections: o,
    landmarks: r,
    selected_kind: i,
    selected_index: c,
    category_columns: f,
    active_category: d,
    gene_columns: m,
    active_genes: g,
    color_by: h
  } = n, y = h === "continuous" && (g?.length || 0) > 0;
  return /* @__PURE__ */ S.jsxs(Lx, { className: "landmarks-float-panel pointer-events-auto max-h-full gap-1 overflow-hidden py-2", children: [
    /* @__PURE__ */ S.jsx(Vx, { className: We("shrink-0 py-0", iu), children: /* @__PURE__ */ S.jsx(Ix, { className: "text-[0.8125rem] font-semibold tracking-tight", children: "Layers" }) }),
    /* @__PURE__ */ S.jsx(Hx, { className: We("min-h-0 overflow-y-auto pb-2", iu), children: /* @__PURE__ */ S.jsxs(
      jx,
      {
        type: "multiple",
        defaultValue: ["selections", "categories", "genes", "landmarks"],
        children: [
          /* @__PURE__ */ S.jsxs(wa, { value: "selections", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Selections" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: o.length ? /* @__PURE__ */ S.jsx(sh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: o.map((x, v) => /* @__PURE__ */ S.jsx(
              ch,
              {
                active: i === "selection" && c === v,
                color: Nv[v % Nv.length],
                label: x.id,
                onSelect: () => n.select("selection", v),
                onRename: (E) => n.renameSelection(v, E),
                onDelete: () => n.deleteSelection(v)
              },
              `${x.id}-${v}`
            )) }) : /* @__PURE__ */ S.jsx(ai, { children: "No selections yet." }) })
          ] }),
          f.length ? /* @__PURE__ */ S.jsxs(wa, { value: "categories", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Categories" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx("div", { className: "flex max-h-48 flex-col gap-0.5 overflow-y-auto", children: f.map((x) => {
              const v = !y && x.name === d;
              return /* @__PURE__ */ S.jsxs(iM, { className: "group/cat", children: [
                /* @__PURE__ */ S.jsxs(
                  sM,
                  {
                    className: We(
                      "flex w-full items-center gap-1.5 py-1.5 text-left text-xs font-medium text-muted-foreground outline-none hover:text-foreground",
                      v && "text-foreground"
                    ),
                    onClick: () => {
                      x.name === d && !y || (n.setActiveCategory(x), n.select("", -1));
                    },
                    children: [
                      /* @__PURE__ */ S.jsx(zA, { className: "size-3.5 shrink-0 transition-transform group-data-[state=open]/cat:rotate-90" }),
                      /* @__PURE__ */ S.jsx(J1, { active: v }),
                      /* @__PURE__ */ S.jsx("span", { className: "min-w-0 flex-1 truncate", children: x.name })
                    ]
                  }
                ),
                /* @__PURE__ */ S.jsx(cM, { className: "pl-4", children: /* @__PURE__ */ S.jsx(sh, { className: "gap-0.5", children: (x.labels || []).map((E, A) => /* @__PURE__ */ S.jsx(
                  ch,
                  {
                    active: i === "type" && x.name === d && c === A,
                    color: (x.palette || [])[A % Math.max((x.palette || []).length, 1)] || "#888888",
                    label: E,
                    onSelect: () => n.selectType(x, A)
                  },
                  `${x.name}-${E}`
                )) }) })
              ] }, x.name);
            }) }) })
          ] }) : null,
          m.length ? /* @__PURE__ */ S.jsxs(wa, { value: "genes", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Genes" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(Rk, { lm: n }) })
          ] }) : null,
          /* @__PURE__ */ S.jsxs(wa, { value: "landmarks", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Landmarks" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: r.length ? /* @__PURE__ */ S.jsx(sh, { className: "max-h-40 gap-0.5 overflow-y-auto", children: r.map((x, v) => /* @__PURE__ */ S.jsx(
              ch,
              {
                active: i === "landmark" && c === v,
                color: kv[v % kv.length],
                label: x.id,
                hidden: !!x.hidden,
                onSelect: () => n.select("landmark", v),
                onRename: (E) => n.renameLandmark(v, E),
                onToggleHidden: () => n.toggleLandmarkHidden(v),
                onDelete: () => n.deleteLandmark(v)
              },
              `${x.id}-${v}`
            )) }) : /* @__PURE__ */ S.jsx(ai, { children: "No landmarks yet." }) })
          ] })
        ]
      }
    ) })
  ] });
}
function wk({ lm: n }) {
  const {
    default_tension: o,
    neighbor_radius_max: r,
    neighbor_k_max: i,
    x_bounds: c,
    y_bounds: f
  } = n, d = dk(n.x_bounds, n.y_bounds), m = Math.max(d * 0.05, n.point_size * 5, 1e-6), g = Math.min(Math.max(n.point_size, 0), m), h = `${ti(d, "0")} across`, y = n.selectedLandmark(), x = !!y && ik.includes(y.type), v = !!y && rk.includes(y.type), E = n.activeNeighborhood(), A = !!E, T = Math.max(fk(c, f), 1), O = r > 0 ? r : T, w = Math.max(1, i || 64), M = Math.min(Number(E?.neighborhood_radius || 0), O);
  return /* @__PURE__ */ S.jsxs(Lx, { className: "landmarks-float-panel pointer-events-auto max-h-full gap-1 overflow-hidden py-2", children: [
    /* @__PURE__ */ S.jsx(Vx, { className: We("shrink-0 py-0", iu), children: /* @__PURE__ */ S.jsx(Ix, { className: "text-[0.8125rem] font-semibold tracking-tight", children: "Controls" }) }),
    /* @__PURE__ */ S.jsx(Hx, { className: We("min-h-0 overflow-y-auto pb-2", iu), children: /* @__PURE__ */ S.jsxs(
      jx,
      {
        type: "multiple",
        defaultValue: ["style", "neighbors", "landmark"],
        children: [
          /* @__PURE__ */ S.jsxs(wa, { value: "style", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Style" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(ih, { className: "gap-2.5", children: [
              /* @__PURE__ */ S.jsx(Ra, { label: "Point radius", valueLabel: ti(n.point_size, "0"), children: /* @__PURE__ */ S.jsx(
                Ca,
                {
                  min: 0,
                  max: m,
                  step: m / 200,
                  value: [g],
                  onValueChange: (R) => n.setPointSize(R[0] ?? 0)
                }
              ) }),
              /* @__PURE__ */ S.jsx(
                Ra,
                {
                  label: "Point opacity",
                  valueLabel: n.point_opacity.toFixed(2),
                  children: /* @__PURE__ */ S.jsx(
                    Ca,
                    {
                      min: 0.05,
                      max: 1,
                      step: 0.01,
                      value: [n.point_opacity],
                      onValueChange: (R) => n.setPointOpacity(R[0] ?? 0.8)
                    }
                  )
                }
              ),
              /* @__PURE__ */ S.jsx(
                Ra,
                {
                  label: "Landmark opacity",
                  valueLabel: n.landmark_opacity.toFixed(2),
                  children: /* @__PURE__ */ S.jsx(
                    Ca,
                    {
                      min: 0.05,
                      max: 1,
                      step: 0.01,
                      value: [n.landmark_opacity],
                      onValueChange: (R) => n.setLandmarkOpacity(R[0] ?? 0.28)
                    }
                  )
                }
              ),
              /* @__PURE__ */ S.jsx(Ra, { label: "Stroke", valueLabel: `${n.stroke_width} px`, children: /* @__PURE__ */ S.jsx(
                Ca,
                {
                  min: 1,
                  max: 8,
                  step: 1,
                  value: [n.stroke_width],
                  onValueChange: (R) => n.setStrokeWidth(R[0] ?? 2)
                }
              ) })
            ] }) })
          ] }),
          /* @__PURE__ */ S.jsxs(wa, { value: "stats", className: "border-b", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Stats" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs("dl", { className: "landmarks-stat-grid", children: [
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Points" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.n_points })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Categories" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.category_columns.length })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Genes" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.gene_columns.length })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Selections" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.selections.length })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Landmarks" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.landmarks.length })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Color" }),
                /* @__PURE__ */ S.jsx("dd", { className: "truncate", children: n.color_by })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "k max" }),
                /* @__PURE__ */ S.jsx("dd", { children: n.neighbor_k_max })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "r max" }),
                /* @__PURE__ */ S.jsx("dd", { children: ti(n.neighbor_radius_max, "0") })
              ] }),
              /* @__PURE__ */ S.jsxs("div", { className: "landmarks-stat-chip col-span-2", children: [
                /* @__PURE__ */ S.jsx("dt", { children: "Extent" }),
                /* @__PURE__ */ S.jsx("dd", { className: "truncate", children: h })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ S.jsxs(
            wa,
            {
              value: "neighbors",
              className: x || v ? "border-b" : "border-b-0",
              children: [
                /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Neighbors" }),
                /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsx(ih, { className: "gap-2.5", children: A ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                  /* @__PURE__ */ S.jsx(ai, { className: "text-[0.6875rem]", children: E.id ? String(E.id) : "Selection" }),
                  /* @__PURE__ */ S.jsxs("div", { className: "flex flex-wrap gap-3 text-muted-foreground text-[0.6875rem]", children: [
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
                  /* @__PURE__ */ S.jsxs(Hh, { className: "gap-1.5", children: [
                    /* @__PURE__ */ S.jsx(Uh, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Neighborhood" }),
                    /* @__PURE__ */ S.jsx(
                      jv,
                      {
                        value: E.neighborhood || "off",
                        onChange: (R) => n.patchNeighborhood({ neighborhood: R }),
                        options: [
                          { value: "off", label: "Off" },
                          { value: "radius", label: "Radius" },
                          { value: "knn", label: "k-NN" }
                        ]
                      }
                    )
                  ] }),
                  E.neighborhood === "radius" ? /* @__PURE__ */ S.jsx(
                    Ra,
                    {
                      label: "Radius",
                      valueLabel: `${ti(M, "0")}${O > 0 ? ` / ${ti(O, "0")}` : ""}`,
                      children: /* @__PURE__ */ S.jsx(
                        Ca,
                        {
                          min: 0,
                          max: O,
                          step: O / 200 || 1,
                          value: [M],
                          onValueChange: (R) => {
                            const N = Math.min(Math.max(R[0] ?? 0, 0), O);
                            n.patchNeighborhood({
                              neighborhood: "radius",
                              neighborhood_radius: N
                            });
                          }
                        }
                      )
                    }
                  ) : null,
                  E.neighborhood === "knn" ? /* @__PURE__ */ S.jsx(
                    Ra,
                    {
                      label: "k",
                      valueLabel: String(
                        Math.min(Number(E.neighborhood_k || 12), w)
                      ),
                      children: /* @__PURE__ */ S.jsx(
                        Ca,
                        {
                          min: 1,
                          max: w,
                          step: 1,
                          value: [Math.min(Number(E.neighborhood_k || 12), w)],
                          onValueChange: (R) => n.patchNeighborhood({
                            neighborhood: "knn",
                            neighborhood_k: R[0] ?? 12
                          })
                        }
                      )
                    }
                  ) : null,
                  /* @__PURE__ */ S.jsx(ai, { className: "text-[0.6875rem]", children: "Sliders subset precomputed graphs. Shift+wheel sizes the neighborhood." })
                ] }) : /* @__PURE__ */ S.jsx(ai, { className: "text-[0.6875rem]", children: "Select a type or selection to edit neighbors." }) }) })
              ]
            }
          ),
          x || v ? /* @__PURE__ */ S.jsxs(wa, { value: "landmark", className: "border-b-0", children: [
            /* @__PURE__ */ S.jsx(Aa, { className: Oa, children: "Landmark" }),
            /* @__PURE__ */ S.jsx(Ma, { className: "px-0 pb-2", children: /* @__PURE__ */ S.jsxs(ih, { className: "gap-2.5", children: [
              x ? /* @__PURE__ */ S.jsx(
                Ra,
                {
                  label: "Tension",
                  valueLabel: Number(
                    y?.tension ?? o ?? 0
                  ).toPrecision(3),
                  children: /* @__PURE__ */ S.jsx(
                    Ca,
                    {
                      min: 0,
                      max: 1,
                      step: 0.01,
                      value: [Number(y?.tension ?? o ?? 0)],
                      onValueChange: (R) => n.patchLandmark({ tension: R[0] ?? 0 })
                    }
                  )
                }
              ) : null,
              v ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
                /* @__PURE__ */ S.jsxs(Hh, { className: "gap-1.5", children: [
                  /* @__PURE__ */ S.jsx(Uh, { className: "text-[0.6875rem] font-medium text-muted-foreground", children: "Buffer" }),
                  /* @__PURE__ */ S.jsx(
                    jv,
                    {
                      value: y?.buffer_side || "both",
                      onChange: (R) => n.patchLandmark({ buffer_side: R }),
                      options: [
                        { value: "left", label: "Left" },
                        { value: "both", label: "Both" },
                        { value: "right", label: "Right" }
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ S.jsx(
                  Ra,
                  {
                    label: "Width",
                    valueLabel: ti(Number(y?.buffer_width || 0)),
                    children: /* @__PURE__ */ S.jsx(
                      Ca,
                      {
                        min: 0,
                        max: T,
                        step: T / 200,
                        value: [
                          Math.min(Number(y?.buffer_width || 0), T)
                        ],
                        onValueChange: (R) => n.patchLandmark({ buffer_width: R[0] ?? 0 })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ S.jsx(ai, { className: "text-[0.6875rem]", children: "Shift+wheel sizes the buffer." })
              ] }) : null
            ] }) })
          ] }) : null
        ]
      }
    ) })
  ] });
}
const dh = "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground";
function Ak({
  onZoomIn: n,
  onZoomOut: o,
  onReset: r
}) {
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      className: "landmarks-float-toolbar pointer-events-auto flex flex-col items-center gap-1.5 rounded-full px-1 py-1.5 text-card-foreground",
      role: "toolbar",
      "aria-label": "View zoom",
      onMouseDown: (i) => i.stopPropagation(),
      onWheel: (i) => i.stopPropagation(),
      onDoubleClick: (i) => i.stopPropagation(),
      children: [
        /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom in",
            "aria-label": "Zoom in",
            className: dh,
            onClick: (i) => {
              i.stopPropagation(), n();
            },
            children: /* @__PURE__ */ S.jsx(Nx, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ S.jsx(ru, { orientation: "horizontal", className: "mx-auto h-px w-5 bg-border/50" }),
        /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Zoom out",
            "aria-label": "Zoom out",
            className: dh,
            onClick: (i) => {
              i.stopPropagation(), o();
            },
            children: /* @__PURE__ */ S.jsx(kx, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ S.jsx(ru, { orientation: "horizontal", className: "mx-auto h-px w-5 bg-border/50" }),
        /* @__PURE__ */ S.jsx(
          xo,
          {
            type: "button",
            variant: "ghost",
            size: "icon-sm",
            title: "Reset view",
            "aria-label": "Reset view",
            className: dh,
            onClick: (i) => {
              i.stopPropagation(), r();
            },
            children: /* @__PURE__ */ S.jsx(qA, { className: "size-4" })
          }
        )
      ]
    }
  );
}
const ys = {
  neighborhood: "off",
  neighborhood_radius: 0,
  neighborhood_k: 12
}, Mk = 3;
function Bc(n) {
  return { ...ys, ...n };
}
function Bh(n, o) {
  n.set("active_category", o.name), n.set("active_genes", []), n.set("point_palette", o.palette || []), n.set("legend_labels", o.labels || []), n.set("legend_title", o.name || ""), n.set("color_by", "categorical"), n.save_changes();
}
function Tk(n, o) {
  const r = n.get("gene_columns") || [], i = new Set(r.map((f) => f.name)), c = [];
  for (const f of o || [])
    if (!(!i.has(f) || c.includes(f)) && (c.push(f), c.length >= Mk))
      break;
  if (n.set("active_genes", c), !c.length) {
    const f = n.get("category_columns") || [], d = n.get("active_category") || "", m = f.find((g) => g.name === d) || f[0];
    if (m) {
      Bh(n, m);
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
function Ok(n, o) {
  n.set("gene_scale_mode", o === "shared" ? "shared" : "independent"), n.save_changes();
}
function kk(n, o) {
  n.set("gene_log1p", !!o), n.save_changes();
}
function nS(n, o, r, i, c, f) {
  if (n === "selection") {
    const d = r[o];
    return d ? { ...ys, ...d } : null;
  }
  if (n === "type") {
    const d = c[o];
    if (!d) return null;
    const m = i.find(
      (g) => g.id === d && (!g.column || g.column === f)
    );
    return { ...ys, id: d, column: f, ...m || {} };
  }
  return null;
}
function lS(n, o, r, i, c, f, d, m) {
  if (o === "selection") {
    n.set(
      "selections",
      c.map(
        (v, E) => E === r ? { ...ys, ...v, ...i } : v
      )
    ), n.save_changes();
    return;
  }
  if (o !== "type") return;
  const g = d[r];
  if (!g) return;
  const h = [...f], y = h.findIndex(
    (v) => v.id === g && (!v.column || v.column === m)
  ), x = {
    ...ys,
    id: g,
    column: m,
    ...y >= 0 ? h[y] : {},
    ...i
  };
  y >= 0 ? h[y] = x : h.push(x), n.set("type_neighborhoods", h), n.save_changes();
}
function oS(n, o, r, i) {
  n.set(
    "landmarks",
    i.map((c, f) => f === o ? { ...c, ...r } : c)
  ), n.save_changes();
}
function Gh(n, o, r) {
  n.set("selected_kind", o || ""), n.set("selected_index", r), n.save_changes();
}
function Nk(n, o) {
  n.set("mode", o), n.save_changes();
}
function aS(n, o) {
  return n.filter((r, i) => i !== o);
}
function rS(n, o, r, i) {
  return o !== n ? { kind: o, index: r } : r === i ? { kind: "", index: -1 } : r > i ? { kind: o, index: r - 1 } : { kind: o, index: r };
}
function zk(n, o, r, i, c) {
  const f = rS("selection", i, c, o);
  n.set("selections", aS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function Dk(n, o, r, i, c) {
  const f = rS("landmark", i, c, o);
  n.set("landmarks", aS(r, o)), n.set("selected_kind", f.kind), n.set("selected_index", f.index), n.save_changes();
}
function jk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "selections",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Lk(n, o, r, i) {
  const c = String(r || "").trim();
  c && (n.set(
    "landmarks",
    i.map((f, d) => d === o ? { ...f, id: c } : f)
  ), n.save_changes());
}
function Vk(n, o, r) {
  n.set(
    "landmarks",
    r.map(
      (i, c) => c === o ? { ...i, hidden: !i.hidden } : i
    )
  ), n.save_changes();
}
function Ik(n, o) {
  const r = Number(o);
  !Number.isFinite(r) || r < 0 || (n.set("point_size", r), n.save_changes());
}
function Hk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("point_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Uk(n, o) {
  const r = Number(o);
  Number.isFinite(r) && (n.set("landmark_opacity", Math.min(1, Math.max(0.05, r))), n.save_changes());
}
function Bk(n, o) {
  const r = Math.round(Number(o));
  Number.isFinite(r) && (n.set("stroke_width", Math.min(12, Math.max(1, r))), n.save_changes());
}
const Yh = "9.1.14", Gk = `https://esm.sh/@deck.gl/core@${Yh}`, Yk = `https://esm.sh/@deck.gl/layers@${Yh}?deps=@deck.gl/core@${Yh}`, _a = { depthCompare: "always", depthWriteEnabled: !1 }, Yv = ["#00e5ff", "#ff2d95", "#b8ff00", "#ffb000", "#7c4dff", "#00ffa3"], hh = "#00e5cc", qk = 0.3, Pk = 0.9, Gc = 2, mh = 1, Xk = 0.55, ph = ["line", "spline", "gradient"];
function gh(n) {
  if (!n) return new Float32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Float32Array(r.buffer);
}
function bh(n) {
  if (!n) return new Int32Array(0);
  const o = atob(n), r = new Uint8Array(o.length);
  for (let i = 0; i < o.length; i++) r[i] = o.charCodeAt(i);
  return new Int32Array(r.buffer);
}
function Kk(n) {
  return 1 - (1 - n) ** 4;
}
function Yc(n) {
  const o = document.createElement("canvas");
  o.width = o.height = 1;
  const r = o.getContext("2d", { willReadFrequently: !0 });
  r.fillStyle = "#000000", r.fillStyle = n, r.fillRect(0, 0, 1, 1);
  const [i, c, f, d] = r.getImageData(0, 0, 1, 1).data;
  return [i / 255, c / 255, f / 255, d / 255 || 1];
}
function qv({ model: n, host: o }) {
  if (!o) throw new Error("mountEngine: host element is required");
  const r = o.closest(".landmarks"), i = o.closest(".landmarks__body"), c = o.closest(".landmarks__main") || o.parentElement;
  if (!r || !i || !c)
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
    h(), M && dt();
  });
  y.observe(r, {
    attributes: !0,
    attributeFilter: ["class"]
  });
  function x(_, k, j) {
    g.textContent = _, g.hidden = !1;
    const U = o.getBoundingClientRect();
    g.style.left = `${k - U.left + 12}px`, g.style.top = `${j - U.top + 12}px`;
  }
  function v() {
    g.hidden = !0;
  }
  m.addEventListener("mousedown", (_) => _.stopPropagation()), m.addEventListener("wheel", (_) => _.stopPropagation(), { passive: !0 });
  const E = n.get("modes") || [], A = ["select", "lasso"].filter(
    (_) => E.includes(_)
  ), T = ["point", "line", "spline", "shape"].filter(
    (_) => E.includes(_)
  ), O = [...A, ...T];
  let w = n.get("mode") || "select";
  O.includes(w) || (w = O[0] || "select");
  let M = null, R = null, N = null, I = 0, q = !1, G = null, z = null, P = { key: "", data: [] }, te = null, ie = !1, fe = [], ne = () => {
  }, he = () => {
  }, be = null, V = null, H = null, F = null;
  function ve() {
    const _ = n.get("category_codes") || "";
    be = _ ? bh(_) : null;
  }
  ve();
  function se() {
    const _ = n.get("gene_values") || "";
    V = _ ? gh(_) : null;
  }
  se();
  function D() {
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
  function K(_, k, j) {
    const U = bh(_), ee = bh(k), re = gh(j);
    return U.length ? { indptr: U, indices: ee, distances: re } : null;
  }
  D();
  function le() {
    const _ = n.get("category_columns") || [], k = n.get("active_category") || "";
    return _.findIndex((j) => j.name === k);
  }
  function oe(_) {
    n.get("category_columns");
    const k = le(), j = Ke();
    return k < 0 || !be || !j.length ? Math.round(j[_]?.valueA || 0) : be[k * j.length + _];
  }
  const pe = ["#ff0099", "#b8ff00", "#00b7ff"];
  function _e(_) {
    return (n.get("gene_columns") || []).find((j) => j.name === _) || null;
  }
  function qe(_, k) {
    const U = (n.get("gene_columns") || []).findIndex((re) => re.name === k), ee = Ke();
    return U < 0 || !V || !V.length || !ee.length ? null : V[U * ee.length + _];
  }
  function Ae(_, k, j) {
    const U = Number.isFinite(k) ? k : 0, ee = Number.isFinite(j) && j > U ? j : U + 1, re = Math.max(0, Math.min(1, _ ?? 0)), ge = Math.max(0, U + re * (ee - U));
    return n.get("gene_log1p") ? Math.log1p(ge) : ge;
  }
  function Te(_, k) {
    const j = Number.isFinite(_) ? _ : 0, U = Number.isFinite(k) && k > j ? k : j + 1, ee = Math.max(0, U), re = Math.max(0, j);
    if (n.get("gene_log1p")) {
      const ge = Math.log1p(re), Y = Math.log1p(ee);
      return Y > ge ? Y : Y + 1e-6;
    }
    return ee > re ? ee : ee + 1e-6;
  }
  function at(_, k) {
    const j = Number.isFinite(_) ? _ : 0, U = Math.max(0, j);
    return n.get("gene_log1p") ? Math.log1p(U) : U;
  }
  function pt(_, k, j) {
    const U = _e(k);
    if (!U) return 0;
    const ee = qe(_, k);
    if (ee == null) return 0;
    const re = U.vmin ?? 0, ge = U.vmax ?? 1, Y = Ae(ee, re, ge);
    if ((n.get("gene_scale_mode") || "independent") === "shared") {
      const Ie = j > 0 ? j : Te(re, ge);
      return Math.max(0, Math.min(1, Y / Ie));
    }
    const Se = at(re), Re = Te(re, ge);
    return Re <= Se ? 0 : Math.max(0, Math.min(1, (Y - Se) / (Re - Se)));
  }
  function ze(_) {
    let k = 0;
    for (const j of _) {
      const U = _e(j);
      U && (k = Math.max(k, Te(U.vmin ?? 0, U.vmax ?? 1)));
    }
    return k;
  }
  function et(_, k) {
    const j = n.get("active_genes") || [], U = Ke();
    if (!j.length || !U.length) return null;
    const ee = (n.get("gene_scale_mode") || "independent") === "shared" ? ze(j) : 0;
    let re = 0, ge = 0, Y = 0, Z = 0;
    for (let Se = 0; Se < j.length; Se++) {
      const Re = pt(_, j[Se], ee);
      if (!(Re > 0)) continue;
      const Ie = Et(pe[Se % pe.length], 1);
      re += Ie[0] * Re, ge += Ie[1] * Re, Y += Ie[2] * Re, Z += Re;
    }
    return Z < 1e-6 ? Et("#6b7280", k * 0.35) : [
      Math.min(255, Math.round(re)),
      Math.min(255, Math.round(ge)),
      Math.min(255, Math.round(Y)),
      Math.round(Math.max(0, Math.min(1, k)) * 255)
    ];
  }
  let Ne = null, Le = [], Ue = !1, we = null, Ze = "", Oe = -1, Je = !1, tt = !1, Xe = !1, ye = [], Q = !1, ce = null, He = null;
  function Ce(_, k) {
    const j = new Set((k || []).map((U) => String(U.id)));
    for (let U = 1; ; U++) {
      const ee = `${_} ${U}`;
      if (!j.has(ee)) return ee;
    }
  }
  function Ge(_) {
    return Ce("landmark", _);
  }
  function nt(_) {
    return Ce("selection", _);
  }
  function Tt() {
    Le = [], ye = [], Xe = !1, Q = !1, ce = null, He = null;
  }
  function St(_) {
    const k = d.getBoundingClientRect();
    if (!k.width || !k.height) return null;
    const j = _.clientX - k.left, U = _.clientY - k.top, ee = M?.isInitialized ? M.getViewports()[0] : null;
    if (!ee) return null;
    const [re, ge] = ee.unproject([j, U]);
    return { x: re, y: ge, px: j, py: U };
  }
  function Bt() {
    return {
      dragPan: w === "select",
      scrollZoom: !0,
      doubleClickZoom: !1,
      touchRotate: !1
    };
  }
  function Nt() {
    const _ = w === "select";
    d.style.cursor = _ ? "grab" : "crosshair", M && M.setProps({ controller: Bt() });
  }
  function xt() {
    const _ = Math.max(1, Math.round(c.clientWidth || 1)), k = Math.max(1, Math.round(c.clientHeight || 1));
    M && M.setProps({ width: _, height: k, useDevicePixels: !0 });
    const j = n.get("axes_pixel_bounds") || [0, 0, _, k];
    return (j[2] !== _ || j[3] !== k) && (n.set("axes_pixel_bounds", [0, 0, _, k]), n.save_changes()), { w: _, h: k };
  }
  function on(_) {
    if (!Number.isFinite(_)) return "";
    const k = Math.abs(_);
    return k !== 0 && (k >= 1e3 || k < 0.01) ? _.toExponential(1) : k >= 100 ? _.toFixed(0) : k >= 10 ? _.toFixed(1) : _.toFixed(2);
  }
  function st() {
    if (!m) return;
    const _ = n.get("color_by") || "categorical", k = n.get("legend_title") || "", j = n.get("point_palette") || [], U = n.get("active_genes") || [];
    if (m.innerHTML = "", k) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-title", ee.textContent = k, m.appendChild(ee);
    }
    if (_ === "continuous" && U.length > 0) {
      m.hidden = !0;
      return;
    }
    if (_ === "continuous" && j.length > 1) {
      const ee = document.createElement("div");
      ee.className = "landmarks__legend-bar", ee.style.background = `linear-gradient(to top, ${j[0]}, ${j[Math.floor(j.length / 2)]}, ${j[j.length - 1]})`;
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
    if (_ === "categorical") {
      m.hidden = !0;
      return;
    }
    m.hidden = !k;
  }
  function Et(_, k) {
    const j = String(_ || "#60a5fa").replace("#", ""), U = j.length === 3 ? j.split("").map((re) => re + re).join("") : j.padEnd(6, "0").slice(0, 6), ee = Number.parseInt(U, 16);
    return [
      ee >> 16 & 255,
      ee >> 8 & 255,
      ee & 255,
      Math.round(Math.max(0, Math.min(1, k)) * 255)
    ];
  }
  function Jt(_) {
    const k = n.get("point_opacity") ?? 0.75, j = n.get("color_by") || "categorical";
    let U;
    if (j === "continuous")
      if ((n.get("active_genes") || []).length > 0)
        U = et(_.i, k) || Et("#6b7280", k * 0.35);
      else {
        const ge = n.get("point_palette") || ["#60a5fa"];
        if (ge.length > 1) {
          const Z = Math.max(0, Math.min(1, _.valueA)) * (ge.length - 1), Se = Math.floor(Z), Re = Math.min(ge.length - 1, Se + 1), Ie = Z - Se, ke = Et(ge[Se], k), Me = Et(ge[Re], k);
          U = ke.map((_t, Ht) => Math.round(_t + (Me[Ht] - _t) * Ie));
        } else
          U = Et(ge[0], k);
      }
    else {
      const re = n.get("category_columns") || [], ge = le(), Y = ge >= 0 ? re[ge] : null, Z = Y && Y.palette || n.get("point_palette") || ["#60a5fa"], Se = Y ? oe(_.i) : Math.round(_.valueA);
      U = Et(Z[(Se % Z.length + Z.length) % Z.length], k);
    }
    if (!ie || !te) return U;
    const ee = te[_.i] || 0;
    return ee === Gc || ee === mh ? (U[3] = 255, U) : (U[3] = Math.round((U[3] || 255) * 0.28), U);
  }
  function _n(_) {
    const k = n.get("point_size") ?? 2;
    if (!ie || !te) return k;
    const j = te[_.i] || 0;
    return j === Gc || j === mh ? k : k * Xk;
  }
  function Ft(_) {
    return _.map((k) => [k.x, k.y]);
  }
  function Wt(_) {
    const k = Ft(_);
    if (!k.length) return k;
    const j = k[0], U = k[k.length - 1];
    return (j[0] !== U[0] || j[1] !== U[1]) && k.push(j), k;
  }
  function ot(_, k) {
    if (w === "ellipse") {
      const j = (_.x + k.x) / 2, U = (_.y + k.y) / 2, ee = Math.abs(k.x - _.x) / 2, re = Math.abs(k.y - _.y) / 2, ge = [];
      for (let Y = 0; Y < 64; Y++) {
        const Z = Y / 64 * Math.PI * 2;
        ge.push([j + ee * Math.cos(Z), U + re * Math.sin(Z)]);
      }
      return ge;
    }
    return [
      [_.x, _.y],
      [k.x, _.y],
      [k.x, k.y],
      [_.x, k.y]
    ];
  }
  function ut(_) {
    if (_.type === "polygon" || _.type === "lasso")
      return (_.vertices || []).map(([j, U]) => [j, U]);
    const k = -(_.angle || 0);
    if (_.type === "rectangle") {
      const j = _.cx, U = _.cy, ee = _.width, re = _.height, ge = { x: j, y: U };
      return [
        { x: j - ee / 2, y: U - re / 2 },
        { x: j + ee / 2, y: U - re / 2 },
        { x: j + ee / 2, y: U + re / 2 },
        { x: j - ee / 2, y: U + re / 2 }
      ].map((Y) => {
        const Z = jl(Y, ge, k);
        return [Z.x, Z.y];
      });
    }
    if (_.type === "ellipse") {
      const j = _.cx, U = _.cy, ee = _.rx, re = _.ry, ge = { x: j, y: U }, Y = [];
      for (let Z = 0; Z < 64; Z++) {
        const Se = Z / 64 * Math.PI * 2, Re = jl(
          { x: j + ee * Math.cos(Se), y: U + re * Math.sin(Se) },
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
    const _ = n.get("points_data") || "", [k, j] = n.get("x_bounds"), [U, ee] = n.get("y_bounds"), re = `${_.length}:${k}:${j}:${U}:${ee}:${_.slice(0, 32)}:${_.slice(-32)}`;
    if (re === P.key) return P.data;
    const ge = gh(_), Y = Math.floor(ge.length / 4), Z = new Array(Y);
    for (let Se = 0; Se < Y; Se++) {
      const Re = Se * 4;
      Z[Se] = {
        i: Se,
        x: k + (ge[Re] + 1) / 2 * (j - k),
        y: U + (ge[Re + 1] + 1) / 2 * (ee - U),
        valueA: ge[Re + 2]
      };
    }
    return P = { key: re, data: Z }, Z;
  }
  function Qt(_, k = 8) {
    const j = _ / Math.max(k, 1), ee = 10 ** Math.floor(Math.log10(Math.max(j, 1e-12))), re = j / ee;
    return (re <= 1 ? 1 : re <= 2 ? 2 : re <= 5 ? 5 : 10) * ee;
  }
  function wn() {
    const _ = M?.isInitialized ? M.getViewports()?.[0] : null;
    if (_?.unproject && _.width > 1 && _.height > 1) {
      const [re, ge] = _.unproject([0, _.height]), [Y, Z] = _.unproject([_.width, 0]);
      return {
        xMin: Math.min(re, Y),
        xMax: Math.max(re, Y),
        yMin: Math.min(ge, Z),
        yMax: Math.max(ge, Z)
      };
    }
    const [k, j] = n.get("x_bounds"), [U, ee] = n.get("y_bounds");
    return { xMin: k, xMax: j, yMin: U, yMax: ee };
  }
  function An() {
    const _ = wn(), k = Math.max(_.xMax - _.xMin, _.yMax - _.yMin, 1e-9);
    return Qt(k, 8);
  }
  function Yt(_ = !1) {
    const k = An();
    !_ && k === z || (z = k, dt());
  }
  function nl() {
    if (!R) return null;
    const { PathLayer: _ } = R, k = wn(), j = z || Qt(Math.max(k.xMax - k.xMin, k.yMax - k.yMin, 1e-9), 8);
    z = j;
    const U = j * 2, ee = Math.floor((k.xMin - U) / j) * j, re = Math.floor((k.yMin - U) / j) * j, ge = [];
    for (let ke = ee; ke <= k.xMax + U + j * 0.5; ke += j)
      ge.push({
        path: [
          [ke, k.yMin - U],
          [ke, k.yMax + U]
        ]
      });
    for (let ke = re; ke <= k.yMax + U + j * 0.5; ke += j)
      ge.push({
        path: [
          [k.xMin - U, ke],
          [k.xMax + U, ke]
        ]
      });
    const Y = getComputedStyle(r).getPropertyValue("--lm-grid").trim() || getComputedStyle(r).getPropertyValue("--lm-border").trim() || "#94a3b8", [Z, Se, Re] = Yc(Y), Ie = [Math.round(Z * 255), Math.round(Se * 255), Math.round(Re * 255), 160];
    return new _({
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
    if (!R) return null;
    const { ScatterplotLayer: _ } = R, k = Ke();
    if (!k.length) return null;
    const U = [
      n.get("point_size") ?? 2,
      ie,
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
      new _({
        id: "landmarks-points",
        data: k,
        getPosition: (re) => [re.x, re.y, 0],
        getFillColor: (re) => Jt(re),
        getRadius: (re) => _n(re),
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
  function io() {
    if (!R) return [];
    const { PolygonLayer: _ } = R, k = n.get("selected_kind"), j = n.get("selected_index"), U = getComputedStyle(r).getPropertyValue("--lm-sel-stroke").trim() || "#64748b", ee = [];
    return (n.get("selections") || []).forEach((re, ge) => {
      const Y = ut(re);
      if (Y.length < 3) return;
      const Z = k === "selection" && ge === j;
      ee.push({
        polygon: Y,
        fill: Et(U, Z ? 0.08 : 0.04),
        line: Et(U, Z ? 1 : 0.85),
        width: Z ? 2.5 : 2,
        kind: "selection",
        index: ge
      });
    }), ee.length ? [
      new _({
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
        parameters: _a
      })
    ] : [];
  }
  function Fn() {
    if (!R) return [];
    const { PathLayer: _, PolygonLayer: k, ScatterplotLayer: j } = R, U = n.get("selected_kind"), ee = n.get("selected_index"), re = n.get("stroke_width") || 2, ge = n.get("landmark_opacity") || 0.25, Y = [], Z = [], Se = [], Re = [], Ie = so(14);
    (n.get("landmarks") || []).forEach((Me, _t) => {
      if (Me.hidden) return;
      const Ht = Yv[_t % Yv.length], tn = U === "landmark" && _t === ee, Jn = tn ? re + 1 : re, Ot = Et(Ht, 1), pn = Et(Ht, ge), Sn = { kind: "landmark", index: _t };
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
        fill: Et(hh, qk),
        line: Et(hh, Pk),
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
          const xl = Dl(jn, Ie);
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
        parameters: _a
      })
    ), Z.length && ke.push(
      new _({
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
        parameters: _a
      })
    ), Se.length && ke.push(
      new j({
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
        parameters: _a
      })
    ), ke;
  }
  function an() {
    if (!R) return [];
    const { PathLayer: _, PolygonLayer: k, ScatterplotLayer: j } = R, U = ["lasso", "polygon", "rectangle", "ellipse"].includes(w), ee = U ? "#94a3b8" : "#00e5ff", re = Et(ee, 1), ge = Et(ee, 0.15), Y = n.get("stroke_width") || 4, Z = [];
    let Se = null, Re = null, Ie = [];
    if (Xe && ye.length >= 2)
      Se = Ft(ye);
    else if (Q && ce && He)
      Re = ot(ce, He);
    else if (Le.length) {
      const ke = w === "spline" ? Yn(Le, n.get("default_tension") ?? 0, 20, !1) : w === "shape" ? Yn(Le, n.get("default_tension") ?? 0, 20, !0) : Le;
      w === "polygon" || w === "shape" ? (Re = Ft(ke), Se = Wt(ke)) : Se = Ft(ke), Ie = Le.map((Me) => ({ position: [Me.x, Me.y, 0], fill: re }));
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
        parameters: _a
      })
    ) : Se && Se.length >= 2 && Z.push(
      new _({
        id: "draft-path",
        data: [{ path: Se, color: re, width: U ? 2 : Y }],
        getPath: (ke) => ke.path,
        getColor: (ke) => ke.color,
        getWidth: (ke) => ke.width,
        widthUnits: "pixels",
        jointRounded: !0,
        capRounded: !0,
        pickable: !1,
        parameters: _a
      })
    ), Ie.length && Z.push(
      new j({
        id: "draft-markers",
        data: Ie,
        getPosition: (ke) => ke.position,
        getFillColor: (ke) => ke.fill,
        getRadius: 4,
        radiusUnits: "pixels",
        filled: !0,
        stroked: !1,
        pickable: !1,
        parameters: _a
      })
    ), Z;
  }
  function so(_) {
    const k = M?.isInitialized ? M.getViewports()?.[0] : null;
    if (!k?.unproject) return _;
    const [j] = k.unproject([0, 0]), [U] = k.unproject([_, 0]);
    return Math.max(Math.abs(U - j), 1e-9);
  }
  function Dl(_, k) {
    if (!_ || _.length < 2 || !(k > 0)) return null;
    const j = _[_.length - 2], U = _[_.length - 1], ee = Math.hypot(U[0] - j[0], U[1] - j[1]) || 1, re = (U[0] - j[0]) / ee, ge = (U[1] - j[1]) / ee, Y = -ge, Z = re, Se = [U[0] + re * k * 0.15, U[1] + ge * k * 0.15], Re = [U[0] - re * k, U[1] - ge * k];
    return [
      Se,
      [Re[0] + Y * k * 0.55, Re[1] + Z * k * 0.55],
      [Re[0] - Y * k * 0.55, Re[1] - Z * k * 0.55]
    ];
  }
  function ll(_, k, j, U) {
    const ee = [], re = [];
    if (!_ || !j.length) return { edges: ee, neighbors: re };
    const ge = U?.mode || "knn", Y = Math.max(0, U?.k | 0), Z = Number(U?.radius) || 0;
    if (ge === "knn" && Y <= 0) return { edges: ee, neighbors: re };
    if (ge === "radius" && !(Z > 0)) return { edges: ee, neighbors: re };
    const { indptr: Se, indices: Re, distances: Ie } = _, ke = /* @__PURE__ */ new Set();
    for (const Me of j) {
      const _t = Se[Me] | 0, Ht = Se[Me + 1] | 0, tn = k[Me], Jn = ge === "knn" ? Math.min(Ht, _t + Y) : Ht;
      for (let Ot = _t; Ot < Jn && !(ge === "radius" && (Ie && Ie.length ? Ie[Ot] : 0) > Z); Ot++) {
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
    if (!R) return [];
    const _ = yl(), k = Qo(_);
    if (!_ || !k || k.neighborhood === "off") return [];
    Ke();
    const j = [], { PathLayer: U } = R, ee = { kind: _.kind, index: _.index };
    return (k.neighborhood === "radius" || k.neighborhood === "knn") && fe.length && j.push(
      new U({
        id: `neighborhood-${k.neighborhood}`,
        data: fe.map((re) => ({ ...re, ...ee })),
        getPath: (re) => re.path,
        getColor: Et(hh, 0.45),
        getWidth: 1.25,
        widthUnits: "pixels",
        pickable: !0,
        parameters: _a
      })
    ), j;
  }
  function rn() {
    return sn(), [
      nl(),
      ...Co(),
      ...zt(),
      ...io(),
      ...Fn(),
      ...an()
    ].filter(Boolean);
  }
  function Ct(_, k) {
    const [j, U] = n.get("x_bounds"), [ee, re] = n.get("y_bounds"), ge = (j + U) / 2, Y = (ee + re) / 2, Z = Math.max(U - j, 1e-6), Se = Math.max(re - ee, 1e-6), Re = 40, Ie = Math.log2(
      Math.min((_ - Re * 2) / Z, (k - Re * 2) / Se)
    );
    return {
      target: [ge, Y, 0],
      zoom: Ie,
      minZoom: -20,
      maxZoom: 20
    };
  }
  function Rt() {
    if (!M) return;
    const _ = Math.max(1, d.clientWidth || d.width), k = Math.max(1, d.clientHeight || d.height);
    _ <= 1 || k <= 1 || (N = Ct(_, k), G = N.zoom, M.setProps({ viewState: N, width: _, height: k }), q = !0);
  }
  function Ye(_, { animate: k = !1, duration: j = 320 } = {}) {
    if (!M) return;
    const U = {
      ...N,
      ..._,
      transitionDuration: k ? j : 0
    };
    k && (!Ne && R?.LinearInterpolator && (Ne = new R.LinearInterpolator({
      transitionProps: ["target", "zoom"]
    })), Ne && (U.transitionInterpolator = Ne), U.transitionEasing = Kk), N = U, M.setProps({ viewState: U });
  }
  ne = (_) => {
    if (!M || !N) return;
    const k = N.minZoom ?? -20, j = N.maxZoom ?? 20, U = Math.max(k, Math.min(j, (N.zoom ?? 0) + _));
    Ye({ zoom: U }, { animate: !0 });
  }, he = () => {
    if (!M) return;
    const _ = Math.max(1, d.clientWidth || d.width), k = Math.max(1, d.clientHeight || d.height);
    if (_ <= 1 || k <= 1) return;
    const j = Ct(_, k);
    G = j.zoom, q = !0, Ye(
      {
        target: j.target,
        zoom: j.zoom,
        minZoom: j.minZoom,
        maxZoom: j.maxZoom
      },
      { animate: !0, duration: 320 }
    ), dt();
  };
  function Gn() {
    const _ = String(n.get("plot_background") || "").trim();
    if (_) return _;
    const k = getComputedStyle(r).getPropertyValue("--lm-bg").trim();
    return k || (r.classList.contains("landmarks--dark") ? "#1e1e1e" : "#ffffff");
  }
  h = () => {
    const _ = Gn();
    f.style.background = _, d.style.background = _, M && (M.setProps({
      parameters: { clearColor: Yc(_) },
      ...N ? { viewState: N } : {}
    }), typeof M.redraw == "function" && M.redraw(!0));
  };
  function Ba(_) {
    if (!M) return;
    const k = Gn();
    M.setProps({
      parameters: { clearColor: Yc(k) },
      ..._,
      ...N ? { viewState: N } : {}
    });
  }
  function dt() {
    !M || !R || I || (I = requestAnimationFrame(() => {
      I = 0, Ba({ layers: rn() });
    }));
  }
  async function Ga() {
    if (R) return R;
    const _ = await import(
      /* @vite-ignore */
      Gk
    ), k = await import(
      /* @vite-ignore */
      Yk
    );
    return R = {
      Deck: _.Deck,
      OrthographicView: _.OrthographicView,
      LinearInterpolator: _.LinearInterpolator,
      ScatterplotLayer: k.ScatterplotLayer,
      PathLayer: k.PathLayer,
      PolygonLayer: k.PolygonLayer
    }, R;
  }
  async function $l() {
    if (M) return;
    const { w: _, h: k } = xt();
    d.style.display = "block", h();
    try {
      const { Deck: j, OrthographicView: U } = await Ga(), ee = rn();
      if (!ee.length) {
        console.warn("landmarks deck: no points_data yet");
        return;
      }
      const re = Ct(_, k);
      N = re, G = re.zoom;
      const ge = Gn();
      M = new j({
        canvas: d,
        width: _,
        height: k,
        useDevicePixels: !0,
        views: new U(),
        controller: Bt(),
        initialViewState: re,
        parameters: { clearColor: Yc(ge) },
        layers: ee,
        pickingRadius: 8,
        getCursor: ({ isDragging: Y, isHovering: Z }) => Y ? "grabbing" : Z ? "pointer" : w === "select" ? "grab" : "crosshair",
        onViewStateChange: ({ viewState: Y }) => {
          N = Y, M.setProps({ viewState: Y }), Yt();
        },
        onClick: (Y) => {
          if (w !== "select") return;
          const Z = Y?.object;
          Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type" ? zn(Z.kind, Z.index) : zn("", -1);
        },
        onHover: (Y) => {
          const Z = Y?.object;
          if (Z?.kind === "landmark" || Z?.kind === "selection" || Z?.kind === "type") {
            d.style.cursor = "pointer";
            return;
          }
          w === "select" ? d.style.cursor = "grab" : d.style.cursor = "crosshair";
        },
        onLoad: () => {
          st(), requestAnimationFrame(() => {
            xt(), Rt(), Ba({ layers: rn() }), typeof M.redraw == "function" && M.redraw(!0);
          });
        }
      }), Nt();
    } catch (j) {
      console.error("landmarks deck init failed", j);
      const U = document.createElement("div");
      U.className = "landmarks__error", U.textContent = `Deck renderer failed: ${j?.message || j}`, f.appendChild(U);
    }
  }
  function co() {
    if (!M) return;
    const { w: _, h: k } = xt();
    Ba({ width: _, height: k }), !q && _ > 1 && k > 1 ? Rt() : typeof M.redraw == "function" && M.redraw(!0);
  }
  function Yn(_, k, j, U) {
    const ee = j, ge = (1 - Math.max(0, Math.min(1, k ?? 0))) / 2;
    let Y = _.slice(), Z, Se;
    if (U) {
      if (Y.length >= 2) {
        const ke = Y[0], Me = Y[Y.length - 1];
        ke.x === Me.x && ke.y === Me.y && (Y = Y.slice(0, -1));
      }
      if (Y.length < 3) return Y.slice();
      const Ie = Y.length;
      Se = (ke) => Y[(ke % Ie + Ie) % Ie], Z = Ie;
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
      Se = (ke) => Ie[ke + 1], Z = Y.length - 1;
    }
    const Re = [];
    for (let Ie = 0; Ie < Z; Ie++) {
      const ke = Se(Ie - 1), Me = Se(Ie), _t = Se(Ie + 1), Ht = Se(Ie + 2), tn = ge * (_t.x - ke.x), Jn = ge * (_t.y - ke.y), Ot = ge * (Ht.x - Me.x), pn = ge * (Ht.y - Me.y);
      for (let Sn = 0; Sn < ee; Sn++) {
        const Wn = Sn / ee, uo = Wn * Wn, jn = uo * Wn, xl = 2 * jn - 3 * uo + 1, fo = jn - 2 * uo + Wn, Xa = -2 * jn + 3 * uo, yi = jn - uo;
        Re.push({
          x: xl * Me.x + fo * tn + Xa * _t.x + yi * Ot,
          y: xl * Me.y + fo * Jn + Xa * _t.y + yi * pn
        });
      }
    }
    return Re.push({ ...Se(U ? Z : Y.length - 1) }), Re;
  }
  function jl(_, k, j) {
    const U = Math.cos(j), ee = Math.sin(j), re = _.x - k.x, ge = _.y - k.y;
    return { x: k.x + re * U - ge * ee, y: k.y + re * ee + ge * U };
  }
  function ol(_) {
    const k = (_.vertices || []).map(([j, U]) => ({ x: j, y: U }));
    return _.type === "spline" || _.type === "gradient" ? Yn(k, _.tension ?? 0, 20, !1) : _.type === "shape" ? Yn(k, _.tension ?? 0, 20, !0) : k;
  }
  function al() {
    const [_, k] = n.get("x_bounds"), [j, U] = n.get("y_bounds");
    return 0.25 * Math.min(Math.abs(k - _), Math.abs(U - j));
  }
  function en() {
    return Math.max(1, n.get("neighbor_k_max") || 64);
  }
  function mn() {
    const _ = Number(n.get("neighbor_radius_max") || 0);
    return _ > 0 ? _ : al();
  }
  function Mn(_, k) {
    return _.map((j, U) => {
      const ee = _[Math.max(0, U - 1)], re = _[Math.min(_.length - 1, U + 1)], ge = Math.hypot(re.x - ee.x, re.y - ee.y) || 1, Y = (re.x - ee.x) / ge, Z = (re.y - ee.y) / ge;
      return { x: j.x - Z * k, y: j.y + Y * k };
    });
  }
  function Jl(_) {
    const k = Number(_.buffer_width || 0);
    if (!(k > 0) || !ph.includes(_.type)) return null;
    const j = ol(_);
    if (j.length < 2) return null;
    const U = _.buffer_side || "both";
    return U === "left" ? [...j, ...Mn(j, k).reverse()] : U === "right" ? [...j, ...Mn(j, -k).reverse()] : [...Mn(j, k), ...Mn(j, -k).reverse()];
  }
  function yl() {
    const _ = n.get("selected_kind"), k = n.get("selected_index");
    return _ === "type" || _ === "selection" ? { kind: _, index: k } : null;
  }
  function Ya() {
    return n.get("selected_kind") === "landmark" ? { kind: "landmark", index: n.get("selected_index") } : null;
  }
  function Qo(_) {
    return _ ? nS(
      _.kind,
      _.index,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ) : null;
  }
  function Zo() {
    return Qo(yl());
  }
  function Rr() {
    const _ = Ya();
    if (!_) return null;
    const k = n.get("landmarks") || [];
    return _.index >= 0 && _.index < k.length ? k[_.index] : null;
  }
  function Wl(_) {
    const k = yl();
    k && (lS(
      n,
      k.kind,
      k.index,
      _,
      n.get("selections") || [],
      n.get("type_neighborhoods") || [],
      n.get("legend_labels") || [],
      n.get("active_category") || ""
    ), dt());
  }
  function $o(_) {
    const k = Ke();
    if (!_) return [];
    if (_.kind === "type")
      return k.reduce((j, U, ee) => (oe(ee) === _.index && j.push(ee), j), []);
    if (_.kind === "selection") {
      const j = (n.get("selections") || [])[_.index], U = ut(j || {});
      return U.length < 3 ? [] : k.reduce((ee, re, ge) => (rl(re, U) && ee.push(ge), ee), []);
    }
    return [];
  }
  function rl(_, k) {
    let j = !1;
    for (let U = 0, ee = k.length - 1; U < k.length; ee = U++) {
      const re = k[U][0], ge = k[U][1], Y = k[ee][0], Z = k[ee][1];
      ge > _.y != Z > _.y && _.x < (Y - re) * (_.y - ge) / (Z - ge + 1e-12) + re && (j = !j);
    }
    return j;
  }
  function sn() {
    const _ = Ke();
    te = new Uint8Array(_.length), ie = !1, fe = [];
    const k = yl();
    if (!k) return;
    const j = $o(k);
    if (!j.length) {
      ie = !0;
      return;
    }
    ie = !0;
    for (const re of j) te[re] = Gc;
    const U = Qo(k);
    if (!U || U.neighborhood === "off") return;
    const ee = U.neighborhood === "radius" ? F : H;
    if (U.neighborhood === "radius" || U.neighborhood === "knn") {
      const re = Math.min(Number(U.neighborhood_k) || 12, en());
      let ge = Number(U.neighborhood_radius) || 0;
      const Y = mn();
      Y > 0 && (ge = Math.min(ge, Y));
      const Z = ll(ee, _, j, {
        mode: U.neighborhood,
        k: re,
        radius: ge
      });
      fe = Z.edges;
      for (const Se of Z.neighbors)
        te[Se] !== Gc && (te[Se] = mh);
    }
  }
  function Qn(_) {
    const k = Ya();
    k && (oS(n, k.index, _, n.get("landmarks") || []), dt());
  }
  function Zn(_) {
    if (!M?.isInitialized || !_) return null;
    const j = M.pickObject({ x: _.px, y: _.py, radius: 8 })?.object;
    return j?.kind ? { kind: j.kind, index: j.index } : null;
  }
  function zn(_, k) {
    Gh(n, _, k), dt();
  }
  function Dn() {
    st();
  }
  function Ro() {
    if (!["polygon", "line", "spline", "shape"].includes(w)) return;
    const k = w === "line" || w === "spline" ? 2 : 3;
    if (Le.length < k) {
      Le = [], dt();
      return;
    }
    if (w === "polygon") {
      const ee = [...n.get("selections") || []];
      ee.push(Bc({
        id: nt(ee),
        type: "polygon",
        vertices: Le.map((re) => [re.x, re.y])
      })), Le = [], n.set("selections", ee), n.set("selected_kind", "selection"), n.set("selected_index", ee.length - 1), n.save_changes(), Dn(), dt();
      return;
    }
    const j = [...n.get("landmarks") || []], U = {
      id: Ge(j),
      type: w,
      vertices: Le.map((ee) => [ee.x, ee.y])
    };
    (w === "spline" || w === "shape") && (U.tension = n.get("default_tension") ?? 0), ph.includes(w) && (U.buffer_width = n.get("default_buffer_width") ?? 0, U.buffer_side = n.get("default_buffer_side") || "both"), j.push(U), Le = [], n.set("landmarks", j), n.set("selected_kind", "landmark"), n.set("selected_index", j.length - 1), n.save_changes(), Dn(), dt();
  }
  function bi(_, k) {
    if (M?.isInitialized) {
      const j = M.getViewports()[0];
      if (j) {
        const U = j.unproject([0, 0]), ee = j.unproject([_, k]);
        return { dx: ee[0] - U[0], dy: ee[1] - U[1] };
      }
    }
    return { dx: 0, dy: 0 };
  }
  function Tn(_, k, j, U) {
    const { dx: ee, dy: re } = bi(j, U);
    if (_ === "landmark") {
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
  function qa(_) {
    if (w === "select") return;
    _.preventDefault(), d.focus();
    const k = St(_);
    if (!k) return;
    Je = !1;
    const j = Zn(k);
    if (w === "lasso") {
      if (j && j.kind === n.get("selected_kind") && j.index === n.get("selected_index")) {
        Ue = !0, we = k, Ze = j.kind, Oe = j.index;
        return;
      }
      if (j) {
        zn(j.kind, j.index), tt = !0;
        return;
      }
      Xe = !0, ye = [k], dt();
      return;
    }
    if (w === "rectangle" || w === "ellipse") {
      if (j && j.kind === n.get("selected_kind") && j.index === n.get("selected_index")) {
        Ue = !0, we = k, Ze = j.kind, Oe = j.index;
        return;
      }
      if (j) {
        zn(j.kind, j.index), tt = !0;
        return;
      }
      Q = !0, ce = k, He = k, dt();
      return;
    }
    if (Le.length === 0) {
      const U = n.get("selected_kind"), ee = n.get("selected_index");
      if (j && j.kind === U && j.index === ee) {
        Ue = !0, we = k, Ze = j.kind, Oe = j.index, d.style.cursor = "grabbing";
        return;
      }
      if (j) {
        zn(j.kind, j.index), tt = !0;
        return;
      }
      ee >= 0 && zn("", -1);
    }
  }
  function _r(_) {
    const k = St(_);
    if (!k) return;
    if (Ue && we && Oe >= 0) {
      const ee = k.px - we.px, re = k.py - we.py;
      (ee || re) && (Je = !0), Tn(Ze, Oe, ee, re), we = k;
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
    if (Le.length > 0 && ["polygon", "line", "spline", "shape"].includes(w)) {
      const ee = w === "line" || w === "spline" ? 2 : 3;
      x(Le.length >= ee ? "Enter to finish" : "Click", _.clientX, _.clientY);
      return;
    }
    if (w === "select") return;
    const U = Zn(k);
    if (U && (U.kind === "landmark" || U.kind === "selection")) {
      const re = (U.kind === "landmark" ? n.get("landmarks") : n.get("selections"))?.[U.index]?.id;
      if (re) {
        x(String(re), _.clientX, _.clientY);
        return;
      }
    }
    v();
  }
  function Jo(_) {
    if (w === "select" && !Ue) return;
    const k = St(_);
    if (Xe) {
      if (Xe = !1, ye.length >= 3) {
        const j = [...n.get("selections") || []];
        j.push(Bc({
          id: nt(j),
          type: "lasso",
          vertices: ye.map((U) => [U.x, U.y])
        })), n.set("selections", j), n.set("selected_kind", "selection"), n.set("selected_index", j.length - 1), n.save_changes();
      }
      ye = [], Dn(), dt();
      return;
    }
    if (Q) {
      if (Q = !1, ce && He) {
        const j = ce, U = He, ee = (j.x + U.x) / 2, re = (j.y + U.y) / 2, ge = Math.abs(U.x - j.x), Y = Math.abs(U.y - j.y);
        if (ge > 1e-6 && Y > 1e-6) {
          const Z = [...n.get("selections") || []];
          w === "rectangle" ? Z.push(Bc({ id: nt(Z), type: "rectangle", cx: ee, cy: re, width: ge, height: Y, angle: 0 })) : Z.push(Bc({ id: nt(Z), type: "ellipse", cx: ee, cy: re, rx: ge / 2, ry: Y / 2, angle: 0 })), n.set("selections", Z), n.set("selected_kind", "selection"), n.set("selected_index", Z.length - 1), n.save_changes();
        }
      }
      ce = null, He = null, Dn(), dt();
      return;
    }
    if (Ue && (Ue = !1, we = null, Ze = "", Oe = -1, d.style.cursor = "crosshair", Je)) {
      tt = !0, Je = !1;
      return;
    }
    if (tt) {
      tt = !1;
      return;
    }
    if (k && !(w === "select" || w === "lasso" || w === "rectangle" || w === "ellipse")) {
      if (w === "point") {
        const j = [...n.get("landmarks") || []];
        j.push({ id: Ge(j), type: "point", vertices: [[k.x, k.y]] }), n.set("landmarks", j), n.set("selected_kind", "landmark"), n.set("selected_index", j.length - 1), n.save_changes(), Dn(), dt();
        return;
      }
      Le.push({ x: k.x, y: k.y }), dt();
    }
  }
  function vl() {
    v(), Ue && (Ue = !1, we = null), Xe && (Xe = !1, ye = [], dt()), Q && (Q = !1, ce = null, He = null, dt());
  }
  function Pa(_) {
    _.preventDefault(), Le.length && Le.pop(), Ro(), v();
  }
  function _o(_) {
    _.key === "Enter" ? (_.preventDefault(), Ro(), v()) : _.key === "Escape" ? (Tt(), zn("", -1), dt()) : (_.key === "Backspace" || _.key === "Delete") && Le.length && (Le.pop(), dt());
  }
  const Ll = new AbortController(), { signal: il } = Ll;
  d.addEventListener(
    "wheel",
    (_) => {
      if (!_.shiftKey) return;
      const k = Rr();
      if (k && ph.includes(k.type)) {
        _.preventDefault(), _.stopImmediatePropagation();
        const U = al(), ee = U / 40, re = Math.max(
          0,
          Math.min(U, (Number(k.buffer_width) || 0) + (_.deltaY > 0 ? -ee : ee))
        );
        Qn({ buffer_width: re });
        return;
      }
      const j = Zo();
      if (!(!j || j.neighborhood === "off")) {
        if (_.preventDefault(), _.stopImmediatePropagation(), j.neighborhood === "knn") {
          const U = en(), ee = Math.max(
            1,
            Math.min(U, (Number(j.neighborhood_k) || 12) + (_.deltaY > 0 ? -1 : 1))
          );
          Wl({ neighborhood: "knn", neighborhood_k: ee });
          return;
        }
        if (j.neighborhood === "radius") {
          const U = mn(), ee = U / 40, re = Math.max(
            0,
            Math.min(U, (Number(j.neighborhood_radius) || 0) + (_.deltaY > 0 ? -ee : ee))
          );
          Wl({ neighborhood: "radius", neighborhood_radius: re });
        }
      }
    },
    { capture: !0, passive: !1, signal: il }
  ), d.addEventListener("mousedown", qa, { signal: il }), d.addEventListener("mousemove", _r, { signal: il }), d.addEventListener("mouseup", Jo, { signal: il }), d.addEventListener("mouseleave", vl, { signal: il }), d.addEventListener("dblclick", Pa, { signal: il }), d.addEventListener("keydown", _o, { signal: il });
  const Wo = [];
  function cn(_, k) {
    const j = `change:${_}`;
    n.on(j, k), Wo.push(() => n.off?.(j, k));
  }
  ["landmarks", "selections", "type_neighborhoods", "selected_index", "selected_kind"].forEach((_) => {
    cn(_, () => {
      dt(), Dn();
    });
  }), cn("mode", () => {
    w = n.get("mode"), Tt(), Nt(), dt();
  }), cn("width", () => {
    co();
  }), cn("height", () => {
    co();
  }), cn("points_data", () => {
    P = { key: "", data: [] }, M ? dt() : $l(), st();
  }), ["point_palette", "point_size", "point_opacity", "color_by", "legend_labels", "legend_title", "color_vmin", "color_vmax"].forEach((_) => {
    cn(_, () => {
      M && dt(), st();
    });
  }), ["stroke_width", "landmark_opacity"].forEach((_) => {
    cn(_, () => {
      dt();
    });
  }), cn("category_codes", () => {
    ve(), dt();
  }), cn("gene_values", () => {
    se(), dt();
  }), ["neighbor_indptr", "neighbor_indices", "neighbor_distances", "radius_indptr", "radius_indices", "radius_distances"].forEach((_) => {
    cn(_, () => {
      D(), M && dt();
    });
  }), ["category_columns", "active_category"].forEach((_) => {
    cn(_, () => {
      Dn(), dt();
    });
  }), ["gene_columns", "active_genes", "gene_scale_mode", "gene_log1p"].forEach((_) => {
    cn(_, () => {
      Dn(), st(), dt();
    });
  }), cn("plot_background", () => h()), Dn();
  let sl = null, eo = 0, wo = !1;
  const to = () => {
    if (wo) return;
    const _ = c.clientWidth, k = c.clientHeight;
    if (_ <= 1 || k <= 1) {
      eo = requestAnimationFrame(to);
      return;
    }
    eo = requestAnimationFrame(async () => {
      if (await $l(), wo) {
        M && typeof M.finalize == "function" && M.finalize(), M = null;
        return;
      }
      dt(), sl = new ResizeObserver(() => co()), sl.observe(c);
    });
  };
  eo = requestAnimationFrame(to);
  function $n() {
    wo = !0, Ll.abort(), Wo.forEach((_) => _()), y.disconnect(), sl?.disconnect(), eo && cancelAnimationFrame(eo), I && cancelAnimationFrame(I), M && typeof M.finalize == "function" && M.finalize(), M = null, o.replaceChildren();
  }
  return {
    zoomBy: (_) => ne(_),
    resetZoom: () => he(),
    resize: () => co(),
    destroy: $n
  };
}
function Fk(n, o) {
  const r = b.useRef(o);
  r.current = o;
  const i = (d) => {
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
  }, f = b.useSyncExternalStore(i, c, c);
  return JSON.parse(f);
}
const Qk = [
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
function Zk(n) {
  const o = Fk(n, Qk);
  return {
    ...o,
    setMode(r) {
      Nk(n, r);
    },
    select(r, i) {
      Gh(n, r, i);
    },
    setActiveCategory(r) {
      Bh(n, r);
    },
    setActiveGenes(r) {
      Tk(n, r);
    },
    setGeneScaleMode(r) {
      Ok(n, r);
    },
    setGeneLog1p(r) {
      kk(n, r);
    },
    selectType(r, i) {
      r.name !== o.active_category && Bh(n, r), Gh(n, "type", i);
    },
    patchNeighborhood(r) {
      lS(
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
      o.selected_kind !== "landmark" || o.selected_index < 0 || oS(n, o.selected_index, r, o.landmarks);
    },
    deleteSelection(r) {
      zk(
        n,
        r,
        o.selections,
        o.selected_kind,
        o.selected_index
      );
    },
    deleteLandmark(r) {
      Dk(
        n,
        r,
        o.landmarks,
        o.selected_kind,
        o.selected_index
      );
    },
    renameSelection(r, i) {
      jk(n, r, i, o.selections);
    },
    renameLandmark(r, i) {
      Lk(n, r, i, o.landmarks);
    },
    toggleLandmarkHidden(r) {
      Vk(n, r, o.landmarks);
    },
    setPointSize(r) {
      Ik(n, r);
    },
    setPointOpacity(r) {
      Hk(n, r);
    },
    setLandmarkOpacity(r) {
      Uk(n, r);
    },
    setStrokeWidth(r) {
      Bk(n, r);
    },
    activeNeighborhood() {
      return nS(
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
function yh(n) {
  if (document.fullscreenElement === n) return !0;
  try {
    return n.matches(":fullscreen") || n.matches(":-webkit-full-screen");
  } catch {
    return !1;
  }
}
function $k(n, o) {
  const r = b.useRef("off"), [i, c] = b.useState("off"), f = b.useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        o();
      });
    });
  }, [o]), d = b.useCallback((v) => {
    r.current = v, c(v);
  }, []), m = b.useCallback(() => {
    if (r.current === "off") return;
    const v = n.current;
    d("off"), document.body.style.overflow = "", f(), v?.scrollIntoView({ block: "nearest" });
  }, [n, d, f]), g = b.useCallback(() => {
    const v = n.current;
    if (v) {
      if (yh(v)) {
        r.current !== "native" && (d("native"), document.body.style.overflow = "hidden", f());
        return;
      }
      r.current === "native" && m();
    }
  }, [n, m, d, f]);
  b.useEffect(() => (document.addEventListener("fullscreenchange", g), g(), () => document.removeEventListener("fullscreenchange", g)), [g]), b.useEffect(() => {
    if (i !== "overlay") return;
    const v = (E) => {
      E.key === "Escape" && m();
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }, [i, m]);
  const h = b.useCallback(() => {
    const v = n.current;
    return r.current !== "off" ? !0 : !!v && yh(v);
  }, [n]), y = b.useCallback(() => {
    const v = n.current;
    if (v) {
      if (r.current === "overlay") {
        m();
        return;
      }
      if (yh(v) || document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      r.current !== "off" && m();
    }
  }, [n, m]), x = b.useCallback(async () => {
    const v = n.current;
    if (v) {
      if (h()) {
        y();
        return;
      }
      try {
        await v.requestFullscreen(), g();
      } catch {
        d("overlay"), document.body.style.overflow = "hidden", f();
      }
    }
  }, [n, h, y, d, f, g]);
  return {
    isFullscreen: i !== "off",
    overlay: i === "overlay",
    toggle: x,
    leave: y
  };
}
const Jk = 700, Wk = 400, eN = 1400, Pv = 640;
function tN({
  model: n,
  hostEl: o,
  defaultHeight: r = Jk
}) {
  const i = SA(o.parentElement), c = Zk(n), f = b.useRef(null), d = b.useRef(null), m = b.useRef(null), [g, h] = b.useState(r), [y, x] = b.useState(!1), [v, E] = b.useState("layers"), A = b.useRef(null), T = b.useRef(!1), O = b.useCallback(() => {
    m.current?.resize();
  }, []), { isFullscreen: w, overlay: M, toggle: R } = $k(
    d,
    O
  );
  b.useEffect(() => {
    const z = d.current;
    if (!z || typeof ResizeObserver > "u") return;
    const P = new ResizeObserver((te) => {
      const ie = te[0]?.contentRect.width ?? z.clientWidth;
      x(ie < Pv);
    });
    return P.observe(z), x(z.clientWidth < Pv), () => P.disconnect();
  }, []), b.useEffect(() => {
    E(y ? (z) => z ?? "layers" : null);
  }, [y]), b.useEffect(() => {
    w && !T.current && (A.current = g), !w && T.current && A.current != null && (h(A.current), A.current = null, O()), T.current = w;
  }, [w, g, O]), b.useEffect(() => {
    o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  }, [o]), b.useEffect(() => {
    const z = f.current;
    if (!z) return;
    const P = qv({ model: n, host: z });
    return m.current = P, () => {
      P.destroy(), m.current = null;
    };
  }, [n, qv]);
  const N = b.useCallback(
    (z) => {
      z.preventDefault(), z.stopPropagation();
      const P = Math.min(window.innerHeight * 0.9, eN), te = {
        y: z.clientY,
        h: g,
        maxH: P
      }, ie = (ne) => {
        h(
          Math.round(
            Math.min(te.maxH, Math.max(Wk, te.h + (ne.clientY - te.y)))
          )
        );
      }, fe = () => {
        window.removeEventListener("pointermove", ie), window.removeEventListener("pointerup", fe), O();
      };
      window.addEventListener("pointermove", ie), window.addEventListener("pointerup", fe);
    },
    [g, O]
  ), I = b.useCallback((z) => {
    E((P) => P === z ? null : z);
  }, []), q = !y || v === "layers", G = !y || v === "controls";
  return /* @__PURE__ */ S.jsxs(
    "div",
    {
      ref: d,
      className: We(
        "spatial-rx-widget landmarks relative min-w-0 w-full",
        i && "dark landmarks--dark",
        !i && "landmarks--light",
        y && "landmarks--narrow",
        w && "landmarks--fs",
        M && "landmarks--overlay-fs"
      ),
      children: [
        /* @__PURE__ */ S.jsxs(
          "div",
          {
            className: "landmarks__body",
            style: w ? void 0 : { height: g },
            children: [
              /* @__PURE__ */ S.jsx("div", { className: "landmarks__figure", children: /* @__PURE__ */ S.jsx("div", { className: "landmarks__main landmarks__main--plot", children: /* @__PURE__ */ S.jsx(
                "div",
                {
                  ref: f,
                  className: "landmarks__plot-host relative min-h-0 flex-1 w-full h-full"
                }
              ) }) }),
              w ? null : /* @__PURE__ */ S.jsx(
                "button",
                {
                  type: "button",
                  className: "landmarks__resize",
                  "aria-label": "Resize height",
                  title: "Resize height",
                  onPointerDown: N
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S.jsxs("div", { className: "landmarks__chrome", children: [
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "landmarks__chrome-tools",
              onMouseDown: (z) => z.stopPropagation(),
              onWheel: (z) => z.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(
                mk,
                {
                  modes: c.modes,
                  mode: c.mode,
                  onMode: (z) => c.setMode(z),
                  fullscreen: w,
                  onToggleFullscreen: () => {
                    R();
                  }
                }
              )
            }
          ),
          y ? /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
            /* @__PURE__ */ S.jsx("div", { className: "landmarks__chrome-edge landmarks__chrome-edge--left", children: /* @__PURE__ */ S.jsx(
              xo,
              {
                type: "button",
                variant: v === "layers" ? "default" : "outline",
                size: "sm",
                className: "landmarks__chrome-edge-btn landmarks-float-panel",
                "aria-pressed": v === "layers",
                "aria-label": "Layers panel",
                onClick: () => I("layers"),
                children: "Layers"
              }
            ) }),
            /* @__PURE__ */ S.jsx("div", { className: "landmarks__chrome-edge landmarks__chrome-edge--right", children: /* @__PURE__ */ S.jsx(
              xo,
              {
                type: "button",
                variant: v === "controls" ? "default" : "outline",
                size: "sm",
                className: "landmarks__chrome-edge-btn landmarks-float-panel",
                "aria-pressed": v === "controls",
                "aria-label": "Controls panel",
                onClick: () => I("controls"),
                children: "Controls"
              }
            ) })
          ] }) : null,
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: We(
                "landmarks__chrome-dock landmarks__chrome-dock--left",
                q && "landmarks__chrome-dock--open"
              ),
              onMouseDown: (z) => z.stopPropagation(),
              onWheel: (z) => z.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(_k, { lm: c })
            }
          ),
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: We(
                "landmarks__chrome-dock landmarks__chrome-dock--right",
                G && "landmarks__chrome-dock--open"
              ),
              onMouseDown: (z) => z.stopPropagation(),
              onWheel: (z) => z.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(wk, { lm: c })
            }
          ),
          /* @__PURE__ */ S.jsx(
            "div",
            {
              className: "landmarks__chrome-zoom",
              onMouseDown: (z) => z.stopPropagation(),
              onWheel: (z) => z.stopPropagation(),
              children: /* @__PURE__ */ S.jsx(
                Ak,
                {
                  onZoomIn: () => m.current?.zoomBy(1),
                  onZoomOut: () => m.current?.zoomBy(-1),
                  onReset: () => m.current?.resetZoom()
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
const ss = /* @__PURE__ */ new WeakMap();
function nN({ model: n, el: o }) {
  o.style.width = "100%", o.style.maxWidth = "100%", o.style.minWidth = "0", o.style.display = "block";
  const r = ss.get(o);
  r && (r.unmount(), ss.delete(o));
  const i = yC.createRoot(o);
  return ss.set(o, i), i.render(/* @__PURE__ */ S.jsx(tN, { model: n, hostEl: o })), () => {
    i.unmount(), ss.get(o) === i && ss.delete(o);
  };
}
const iN = { render: nN };
export {
  iN as default
};
